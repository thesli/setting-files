// taplio primary control
if(typeof(TaplioContext) == "undefined") {
	var TaplioContext = {
		// --------------------------
		// INITIALIZATION
		// --------------------------
		bootstrap: function() {
			// sanity check
			if(window != window.top) return;

			this.init_vars();
			this.debug('bootstrap complete');
			this.sendToBackground('announce_page_');
		},
		init: function(id_selector, bar_html) {
			var self = this;
			this.injectBar(bar_html);
			$(window).resize(function(event) { self.setTabVisibility(); });
			this.identifyPage(id_selector);
		},
		init_vars: function() {
			var self = this;
			this.debug_en = false;
			this._getAdapterAssetPath_(function(p) { self.adapter_asset_path = p });
			
			this.page_id = null; this.page_state_string = null; this.page_state_time = null; this.page_state_check = null; this.tab_click = false;
			this.tab_bar = null; this.tabs = {}; this.tabs_rank = []; this.visible_tabs_count = 0; this.traveler_position = 0; this.session_id = null;
			this.ts = (new Date).valueOf();
		},
		reload: function() {
			$('#taplio_tab_bar').remove();
			$(document.body).css({'margin-top':'0px'});

			$(window).unbind('unload');
			$(window).unbind('resize');
			window.clearInterval(this.page_state_check);
			this.init_vars();
			
			this.sendToBackground('announce_page_');
		},
		// messaging [send]
		sendToBackground: function(method, payload) {
			try { var host = window.location.hostname.match(/([a-zA-Z0-9]+\.)((com)|(co.uk)|(io))(\/)?$/)[0] }
			catch(err) { host = null }

			message = { method: method, host: host, page_id: this.page_id, location: window.location, referrer: document.referrer, traveler_position: this.traveler_position, session_id: this.session_id, payload: payload };
			this._sendToBackground_(message);
		},
		// --------------------------
		// MESSAGING [receive]
		// --------------------------
		_init: function(message, sender) {
			this.init(message.payload.id_selector, message.payload.bar_html);
		},
		_identify_location: function(message, sender) {
			this.page_id = message.payload.page_id;
			this.identifyLocation(message.payload.selectors, message.payload.page_state_selector);
		},
		_unsupported_page: function(message, sender) {
			this.hideBar();
		},
		_tab_gen: function(message, sender) {
			this.traveler_position = message.payload.traveler_position;
			this.session_id = message.payload.session_id;
			this.buildTabs(message.payload.tethers);
		},
		_reload: function(message, sender) {
			this.reload();
		},
		_welcome_home: function(message, sender) {
			document.addEventListener('DOMContentLoaded', function() {
				var frame = document.getElementById('ref_target');
				if (frame != null && typeof($(frame).attr('src')) != 'undefined') {
					$(document.body).empty()
					window.location = $(frame).attr('src');
				}
			});
		},
		_get_tethers: function(message, sender) {
			$('#taplio_tethers').attr('src', message.payload.request);
		},
		// --------------------------
		// IDENTIFY PAGE
		// --------------------------
		identifyPage: function(selector) {
			var self = this;
			if (document.readyState == 'loading') return document.addEventListener('DOMContentLoaded', function() { self.identifyPage(selector) });
			this.sendToBackground('identify_page_', this.runSelector(selector));
		},
		check_page: function(selector) {
			if (this.tabs_rank.length < 2 && ((new Date).valueOf() - this.page_state_time) > 5000) this.hideBar();
			if (selector != null && this.runSelector(selector) != this.page_state_string) this.reload();
		},
		// --------------------------
		// IDENTIFY LOCATION
		// --------------------------
		identifyLocation: function(selectors, page_state_selector) {
			var self = this;
			if (document.readyState == 'loading') return document.addEventListener('DOMContentLoaded', function() { self.identifyLocation(selectors, page_state_selector) });
			
			// og selectors and host selectors
			var attributes = {}
			var open_graph_tags = $('meta[property^="og:"]');
			for(var i=0; i<open_graph_tags.length; i++) {
				var prop = $(open_graph_tags[i]).attr('property').substr(3);
				if($.inArray(prop, this.id_og) != -1) attributes[prop] = $(open_graph_tags[i]).attr('content');
			}
			for (var s in selectors) { attributes[s] = this.runSelector(selectors[s]) }
			
			// page constants
			this.page_state_string = this.runSelector(page_state_selector);
			this.page_state_time = (new Date).valueOf();
			this.page_state_check = window.setInterval( function() { self.check_page(page_state_selector); }, 2000);
			this.sendToBackground('identify_location_', attributes)
			
			// set nav event
			$(window).unload(function() { self.sendToBackground('nav_event_', {dt: self.dt(), nav: self.tab_click }) });
		},
		// --------------------------
		// TAPLIO SELECTOR
		// --------------------------
		id_ss: { '$hostname': window.location.hostname, '$pathname': window.location.pathname, '$href': window.location.href },
		id_og: ['title', 'phone_number', 'latitude', 'longitude', 'street-address', 'locality', 'region', 'postal-code', 'country-name', 'type'],
		runSelector: function(selector) {
			if (selector == null) return null;

			try {
				if (typeof selector == 'string' && selector[0] != '$') var str = $(selector).text();												// basic jquery selector
				else if (typeof selector == 'string' && selector[0] == '$') var str = this.id_ss[selector]; 								// basic special selector
				else {
					if (selector[0][0] == '$') var str = this.id_ss[selector[0]];																							// complex special selector
					else var str = (selector[1] == 'text') ? $(selector[0]).text() : $(selector[0]).attr(selector[1]);				// complex jquery selector
					// run regex matches on string
					for (var i=0; i<selector[2].length; i++) { str = str.match(new RegExp(selector[2][i].rgx))[selector[2][i].pos] }
				}
			}
			catch(err) { var str = null; }
			return str;
		},
		// --------------------------
		// TAB BAR GENERATOR
		// --------------------------
		injectBar: function(html) {
			var self = this;
			if (document.body == null) return window.setTimeout(function() { self.injectBar(html); }, 20)

			this.tab_bar = document.createElement("div");													// build receiver for tab bar
			this.tab_bar.id = 'taplio_tab_bar';
			this.tab_bar.innerHTML = html;

			document.body.insertBefore(this.tab_bar, document.body.firstChild);
			document.body.style.marginTop = (this.tab_bar.offsetHeight)+"px";

			this.tabs_window = document.getElementById('taplio_tabs');						// capture tab holder elements
			this.traveler = document.getElementById('taplio_tabs_traveler');
			this.tab_nav = document.getElementById('taplio_tab_nav');							// capture tab nav elements
			this.left_nav = document.getElementById('taplio_nav_left');
			this.right_nav = document.getElementById('taplio_nav_right');
			this.tab_ptype = document.getElementById('taplio_tab_ptype'); 				// capture tab prototype

			this.initTabBar();
			this.setVisibleTabsCount();
		},
		// --------------------------
		// TAB BAR CONTROL
		// --------------------------
		initTabBar: function() {
			var self = this;
			$(this.left_nav).click(function(event) { self.shiftRight() });
			$(this.left_nav).mousemove(function(event) { event.preventDefault() });
			$(this.right_nav).click(function(event) { self.shiftLeft() });
			$(this.right_nav).mousemove(function(event) { event.preventDefault() });
		},
		hideBar: function() {
			var self = this;
			if (document.readyState == 'loading') { return document.addEventListener('DOMContentLoaded', function() { self.hideBar() }); }

			$(this.tab_bar).animate({'top':-(this.tab_bar.offsetHeight)+'px'});
			$(document.body).animate({'margin-top':'0px'});
		},
		// --------------------------
		// TAB GENERATOR
		// --------------------------
		buildTabs: function(tethers) {
			var self = this;
			if (document.getElementById('taplio_tab_bar') == null) return window.setTimeout(function() { self.buildTabs(tethers); }, 10)

			// build new tabs, update tabs_rank
			for(var i=0; i<tethers.length; i++) {
				this.tabs_rank[i] = tethers[i].service;
				if(typeof(this.tabs[tethers[i].service]) == 'undefined') this.buildTab(tethers[i]);
				this.tabs[tethers[i].service].style.setProperty('left', (145*i)+'px');
				if(!tethers[i].active) this.tabs[tethers[i].service].style.setProperty('z-index', 99 - i);
			}
			
			// set traveler position and visibility
			$(this.traveler).css({'left': -145*this.traveler_position});
			this.setTabVisibility();
		},
		buildTab: function(tether) {
			var svc = tether.service;

			this.tabs[svc] = this.tab_ptype.cloneNode(true);
			this.tabs[svc].id = "taplio_"+svc+"_tab";
			
			$(this.tabs[svc]).find('span').text(tether.title);
			$(this.tabs[svc]).find('img').attr('src', tether.favicon);

			if(tether.active) {
				this.tabs[svc].style.setProperty('z-index', '101');
				$(this.tabs[svc]).find('div.taplio-tab-hldr').css({'background':'url('+this.adapter_asset_path+'tab_ft.png)'});
				this.initActiveTab(this.tabs[svc]);
			}
			else this.initInactiveTab(this.tabs[svc], svc, tether.uri);
			
			// append to traveler
			this.traveler.appendChild(this.tabs[svc]);
		},
		// --------------------------
		// TAB CONTROL
		// --------------------------
		initActiveTab: function(element) {
			$(element).click(function(event) { event.preventDefault() });
			$(element).mousemove(function(event) { event.preventDefault() });
		},
		initInactiveTab: function(element, svc, link_url) {
			var self = this;
			$(element).click(function(event) {
				event.preventDefault();
				self.tab_click = svc;
				window.location = link_url;
			});
			$(element).mousemove(function(event) { event.preventDefault() });
		},
		setTabVisibility: function() {
			this.setVisibleTabsCount();
			var hidden_tabs = this.tabs_rank.slice();
			var visible_tabs = hidden_tabs.splice(this.traveler_position, this.visible_tabs_count);
			for(var i=0; i<hidden_tabs.length; i++) { this.tabs[hidden_tabs[i]].style.setProperty('display', 'none'); }
			for(var i=0; i<visible_tabs.length; i++) { this.tabs[visible_tabs[i]].style.setProperty('display', 'block'); }
			this.setTabNavVisibility();
		},
		setVisibleTabsCount: function() {
			this.visible_tabs_count = Math.round((this.tab_bar.offsetWidth-10) / 145) - 2;
			if(this.visible_tabs_count > this.tabs_rank.length) this.visible_tabs_count = this.tabs_rank.length;
			this.tabs_window.style.setProperty('width', ((this.visible_tabs_count * 145) + 20)+'px');
			this.tab_nav.style.setProperty('left', (this.visible_tabs_count * 145 + 97)+'px');
		},
		setTabNavVisibility: function() {
			var left = this.tabs[this.tabs_rank[0]].style.display == 'none';
			var right = this.tabs[this.tabs_rank[this.tabs_rank.length-1]].style.display == 'none';

			if (left) $(this.left_nav).attr('src', $(this.left_nav).attr('src').replace('_off.png', '_on.png'));
			else $(this.left_nav).attr('src', $(this.left_nav).attr('src').replace('_on.png', '_off.png'));
			if (right) $(this.right_nav).attr('src', $(this.right_nav).attr('src').replace('_off.png', '_on.png'));
			else $(this.right_nav).attr('src', $(this.right_nav).attr('src').replace('_on.png', '_off.png'));
			
			if (!left && !right) $(this.tab_nav).hide();
			else $(this.tab_nav).show();
		},
		shiftLeft: function() {
			if (this.traveler_position == (this.tabs_rank.length - this.visible_tabs_count)) return false;
			this.traveler_position += this.visible_tabs_count;
			if (this.traveler_position + this.visible_tabs_count > this.tabs_rank.length) this.traveler_position = this.tabs_rank.length - this.visible_tabs_count;
			this.doShift()
		},
		shiftRight: function() {
			if (this.traveler_position == 0) return false;
			this.traveler_position = (this.traveler_position - this.visible_tabs_count);
			if (this.traveler_position < 0) this.traveler_position = 0;
			this.doShift()
		},
		doShift: function() {
			var self = this;
			for(var svc in this.tabs) { this.tabs[svc].style.setProperty('display', 'block'); }
			$(this.traveler).animate({'left': -145*this.traveler_position}, 400, function() { self.setTabVisibility() });
		},
		// --------------------------
		// UTILITIES
		// --------------------------
		dt: function() {
			return (new Date).valueOf() - this.ts;
		},
		debug: function(msg, obj){
		  if (this.debug_en == true && window.console) {
				obj ? console.debug('TDBG: '+msg, obj) : console.debug('TDBG: '+msg);
		  }
		}
	}
}

if (['rs1.tapl.io','rs2.tapl.io','rs3.tapl.io','rs4.tapl.io'].indexOf(window.location.host) != -1) {
	// taplio iFrame control
	if(typeof(TaplioContextiFrame) == "undefined") {
		var TaplioContextiFrame = {
			debug_en: false,
			session: null, tethers: [],
			session_id: null, root_service: null,
			// --------------------------
			// INITIALIZATION
			// --------------------------
			bootstrap: function() {
				var self = this;

				// sanity check
				if(window == window.top);

				// setup check interval
				this.interval = setInterval(function() { self.parseIncompleteResponse() }, 150);			
				$(document).ready(function() { clearInterval(self.interval) });

				this.debug('iframe bootstrap complete');
			},
			sendToBackground: function(method, payload) {
				try { var host = window.location.hostname.match(/([a-zA-Z0-9]+\.)((com)|(co.uk)|(io))(\/)?$/)[0] }
				catch(err) { host = null }

				message = { method: method, location: window.location, referrer: document.referrer, session_id: this.session_id, root_service: this.root_service, payload: payload };
				this._sendToBackground_(message);
			},
			parseIncompleteResponse: function() {
				json_string = document.body.innerText.replace(/ /g,'');

				// grab session object if it hasn't been parsed already
				if (this.session == null) {
					try {
						session_str = json_string.match(/"session":({["a-zA-Z0-9_\-:,\[\]\{\}\/\.]+}),"tethers"/)[1];
						this.session = JSON.parse(session_str);
						if (this.session != null) {
							this.session_id = this.session.session_id;
							this.root_service = this.session.parsed_params.svc;
							this.reportSession(this.session);
						}
					}
					catch(err) { this.debug('error - session parse', err) }		
				}
								
				// parse tethers object
				try {
					parsed_tethers = [];
					tethers_strings = json_string.match(/"tethers":\[({.*})?(?:\]\})?/)[1]
					tethers_strings = (typeof(tethers_strings) != 'undefined') ? tethers_strings.replace(/\}\,\{/g, '}###{').split('###') : []
					for(i=0; i<tethers_strings.length; i++) {
						parsed_tethers.push(JSON.parse(tethers_strings[i]));
					}
				}
				catch(err) {
					this.debug('error - tether parse', err)
					this.debug('json string: ', { string: json_string} )
				}

				if (this.tethers.length < parsed_tethers.length) {
					new_tethers = parsed_tethers.slice(this.tethers.length)
					this.reportNewTethers(new_tethers)
					this.tethers = parsed_tethers
				}				
			},
			reportNewTethers: function(tethers) {
				this.sendToBackground('report_new_tethers_', tethers);
			},
			reportSession: function(session) {
				this.sendToBackground('report_session_', session);
			},
			debug: function(msg, obj){
			  if (this.debug_en == true && window.console) {
					obj ? console.debug('TDBG: '+msg, obj) : console.debug('TDBG: '+msg);
			  }
			}
		}
	}
}
