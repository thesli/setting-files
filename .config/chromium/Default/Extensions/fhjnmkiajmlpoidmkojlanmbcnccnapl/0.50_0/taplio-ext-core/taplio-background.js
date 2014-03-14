Taplio = {
	// adapter dependencies:
	dependencies: ['_getVersion_', '_getHTML_', '_getCoreAssetPath_', '_sendToTab_', '_sendToTabs_', '_tabClosed_', '_setGlobalIcon_'],
	sid: null, version: null, debug_en: false, bar_html: null, share_html: null, core_asset_path: null,
	// ajax config
	rs: null, follow_max: 10,
	// extension state
	global_enable: true,
	// extension assets
	taplio_about_page: 'http://www.tapl.io', action_icon_active: 'taplio_on.png', action_icon_inactive: 'taplio_off.png',
	// service defaults
	default_service_order: ['yelp', 'facebook', 'menupages', 'opentable', 'hunch', 'googlemaps', 'googleplaces', 'foursquare', 'foodspotting', 'citysearch', 'nymag', 'tripadvisor'],
	// servers
	servers: ['rs3.tapl.io', 'rs4.tapl.io'],
	// session object
	s: {}, t: [],
	
	// ----------------------------------
	// LOAD SETTINGS
	//	-> check dependencies
	//  -> init version
	//  -> init any new services
	//  -> init SID
	//	-> init AJAX interface
	//	-> init global enable
	// ----------------------------------
	init: function() {
		var self = this;
		// check that dependencies are satisfied
		for (var n=0; n<this.dependencies.length; n++) {
			if (typeof(this[this.dependencies[n]]) != 'function') {
				this.debug('init error: unsatisfied dependency: '+this.dependencies[n]);
				return false;	
			}
		}

		this._getVersion_(function(v) { Taplio.version = v } )
		this._getCoreAssetPath_(function(p) { Taplio.core_asset_path = p } )
		this.initServiceOrder();

		this.sid = Taplio.fetch('TaplioExt_SID', this.initSID());
		this.global_enable = Taplio.fetch('TaplioExt_Master_Enable', true);

		// init html chunks
		this._getHTML_(function(bar_html, share_html) { 
			Taplio.bar_html = bar_html;
			Taplio.share_html = share_html;
		});
		
		// init garbage collect for sessions
		setInterval( function() { self.garbageCollect(self) }, 120000); // 2min intervals

		// extension init
		this.global_enable ? this._setGlobalIcon_(this.action_icon_active) : this._setGlobalIcon_(this.action_icon_inactive);
		this.debug('taplio init complete')
	},
	initSID: function() {
		var S4 = function() { return (((1+Math.random())*0x10000)|0).toString(16).substring(1); };
		return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	},
	initServiceOrder: function() {
		var avg_rank = 0;
		var svc_count = 0;
		
		user_svc_ranking = this.user_service_ranking();
		
		// calculate avg service rank
		for(var s in user_svc_ranking) {
			avg_rank += user_svc_ranking[s];
			svc_count++;
		}
		if (avg_rank > 0 && svc_count > 0) avg_rank = avg_rank/svc_count;
		
		// add any new services and init to average rank
		for(var i=0; i < this.default_service_order.length; i++) {
			if (typeof(user_svc_ranking[this.default_service_order[i]]) == 'undefined') user_svc_ranking[this.default_service_order[i]] = avg_rank;
		}
		
		// save new service ranking
		Taplio.store('TaplioExt_User_Service_Ranking', user_svc_ranking);
	},
	// ----------------------------------
	// MESSAGING
	// ----------------------------------
	sendToTab: function(tab_id, method, payload) {
		var message = { method: method, payload: payload };
		this._sendToTab_(tab_id, message);
	},
	sendToTabs: function(method, payload) {
		this._sendToTabs_(method, payload);
	},
	// ----------------------------------
	// PAGE/LOCATION IDENTIFICATION
	// -> receive and process messages from context
	// ----------------------------------
	announce_page_: function(message, sender) {
		if (this.global_enable) {																																																							// if globally enabled
			if (message.host == 'tapl.io') {
				this.sendToTab(sender, '_welcome_home');
			}
			else if (typeof Taplio.HostDefs[message.host] != 'undefined' && Taplio.HostDefs[message.host].valid_location(message.location)) {		// if page served by a known host
				this.sendToTab(sender, '_init', {id_selector: Taplio.HostDefs[message.host].page_id_selector, bar_html: this.bar_html});
			}
		}
	},
	identify_page_: function(message, sender) {
		page_id = Taplio.HostDefs[message.host].identify_page(message.payload)
		this.debug('#identify_page_  host:'+message.host+' page:'+page_id)

		if (page_id == null) this.sendToTab(sender, '_unsupported_page');
		else {
			this.sendToTab(sender, '_identify_location', { selectors: Taplio.HostDefs[message.host][page_id].selectors, page_id: page_id, page_state_selector: Taplio.HostDefs[message.host][page_id].page_state_selector });
		}
	},
	identify_location_: function(message, sender) {
		this.debug('#identify_location_ '+message.payload.title, message);

		// print out captured attributes
		this.debug('------------------------- captured attributes -------------------------')
		for (var attr in message.payload) { this.debug(attr+': '+message.payload[attr]); }
		this.debug('-----------------------------------------------------------------------')		

		var svc = Taplio.HostDefs[message.host][message.page_id].service;
		var svc_id = message.payload[Taplio.HostDefs[message.host][message.page_id].service_id];
		var host_code = Taplio.HostDefs[message.host][message.page_id].id;
		var attributes = message.payload;
		var href = message.location.href
		
		this.tetherLookup(svc, svc_id, host_code, attributes, href, sender);
	},
	report_new_tethers_: function(message, sender) {
		this.debug('report new tethers', message.payload)

		var new_tethers = false;
		var tethers = message.payload;
		var session_id = message.session_id;
		var root_service = message.root_service;

		for(var i=0; i<tethers.length; i++) {
			var svc 			= tethers[i].service;
			var svc_name 	= tethers[i].service_formatted;
			var svc_host 	= tethers[i].host;
			var svc_id		= tethers[i].service_id;
			var svc_uri		= tethers[i].uri;

			var new_tether = this.addTether(session_id, 'blank title', svc, svc_name, svc_host, svc_id, svc_uri);
			new_tethers = new_tethers || new_tether;
		}
		if (new_tethers) this.sendToTab(sender, '_tab_gen', this.export_tethers(session_id, root_service));
	},
	report_session_: function(message, sender) {
		this.debug('report session', message.payload)
	},
	// ----------------------------------
	// SESSIONS
	// -> cache recently used tethers in memory
	// -> purge unused tethers at interval
	// -> perform lookups on cached tethers
	// ----------------------------------
	addTether: function(session_id, title, svc, svc_name, svc_host, svc_id, uri) {
		this.s[session_id] = this.s[session_id] || { title: title, time_stamp: (new Date).valueOf(), traveler_position: 0 };
		var new_tether = this.s[session_id][svc] ? true : false
		this.s[session_id][svc] = this.s[session_id][svc] || { service_ids: {}, service: svc, service_name: svc_name, service_host: svc_host, uri: uri };
		this.s[session_id][svc].service_ids[svc_id] = uri;

		if (this.s[session_id][svc].uri == null) this.s[session_id][svc].uri = uri;
		return new_tether;
	},
	addTaplioId: function(session_id, taplio_id) {
		if(!this.s[session_id].taplio_id) this.s[session_id].taplio_id = taplio_id;
	},
	search: function(service, service_id) {
		for(var session_id in this.s) {
			if(this.s[session_id][service]) {
				var svc_ids = this.s[session_id][service].service_ids;
				for(var id in svc_ids) {
					if(id == service_id) return session_id;
				}
			}
		}
		return false;
	},
	garbageCollect: function(self) {
		self.debug('taplio garbage collect')
		var time_now = (new Date).valueOf();
		// check for old sessions
		for(var session_id in self.s) {
			if ((time_now - self.s[session_id].time_stamp) > 300000) delete self.s[session_id]; // 5 min expire
		}
		for(var i=self.t.length-1; i > -1; i--) {
			if (self.t[i].mark || (time_now - self.t[i].ts) > 900000) self.t.splice(i,1);							// 15 min expire
			else self._tabClosed_(self.t[i].tab, function(closed) { if(closed) self.t[i].mark = true; }); 		// mark for deletion
		}
	},
	export_tethers: function(session_id, active_service) {
		var set = [];
		var service_order = Taplio.service_order();
		for(var i=0; i<service_order.length; i++) {
			var service = service_order[i];
			var state = (active_service == service) ? true : false;
			if (typeof(this.s[session_id][service]) != 'undefined') {
				var tether = this.s[session_id][service];
				var favicon = (typeof Taplio.HostDefs[tether.service_host] != 'undefined') ? this.core_asset_path+Taplio.HostDefs[tether.service_host].favicon : '';
				if (tether.uri != null) set.push({ service: service, uri: tether.uri, title: tether.service_name, favicon: favicon, active: state });
			}
		}
		
		return {tethers: set, session_id: session_id, traveler_position: this.s[session_id].traveler_position};
	},
	// ----------------------------------
	// TETHER LOOKUP
	// -> determine if a session is on hand or if a request needs to be made
	// ----------------------------------	
	tetherLookup: function(svc, svc_id, host_code, attributes, href, sender) {
		var session_id = this.search(svc, svc_id);
		if (session_id) {
			this.debug('#tetherLookup - session found:'+session_id)
			this.sendToTab(sender, '_tab_gen', this.export_tethers(session_id, svc));
		}
		else {
			this.debug('#tetherLookup - no session')
			this.initTetherRequest(sender, svc, svc_id, host_code, attributes, href);
		}
	},
	// ----------------------------------
	// -> request data from researcher
	// ----------------------------------
	normalized_attributes: { 'phone_number':'phone', 'latitude':'lat', 'longitude':'lng', 'street-address':'st_address', 'postal-code':'zip' },
	initTetherRequest: function(tab_id, svc, svc_id, host_code, attributes, href) {	
		var self = this;
		params = { service:svc, service_id:svc_id };

		for (var attr in attributes) {
			if (attributes[attr] != '') {
				if (typeof this.normalized_attributes[attr] != 'undefined') params[this.normalized_attributes[attr]] = attributes[attr];
				else params[attr] = attributes[attr];
			}
		}
		
		// encode params
		encoded_params = []
		for (var param in params) { encoded_params.push(param+'='+encodeURIComponent(params[param])) }	
		encoded_params = encoded_params.join('&')
		
		// request
		// select random server
		server = this.servers[Math.floor(Math.random()*this.servers.length)]
		request = 'http://'+server+'/v2/tethers?'+encoded_params;
		
		// load in iframe
		this.sendToTab(tab_id, '_get_tethers', {request: request, host_code: host_code});
	},
	// ----------------------------------
	// NAV EVENTS
	// -> watch navigation events
	// ----------------------------------
	nav_event_: function(message, sender) {
		this.debug('#nav_event_ - SENDER:'+sender+' TAB CLICK:'+message.payload.nav, message);

		if (message.payload.nav != false) {
			if (typeof this.s[message.session_id] != 'undefined') this.s[message.session_id].traveler_position = message.traveler_position;
			this.upvote_service(message.payload.nav);
		}
	},
	// ----------------------------------
	// USER PREFERANCES
	// -> determine order or services based on usage
	// -> maintian a running count of tab usage
	// ----------------------------------
	service_order: function() {
		user_svc_ranking = this.user_service_ranking();
		
		// sort ranks
		var ranks = [];
		for(var s in user_svc_ranking) {
			ranks.push(user_svc_ranking[s]);
		}
		ranks.sort(function(a,b) {return b-a}); // sort descending
		
		// build array
		var service_order = [];
		for(var i=0; i<this.default_service_order.length; i++) {
			var pos = ranks.indexOf(user_svc_ranking[this.default_service_order[i]]);
			if (pos > service_order.length) { service_order[pos] = this.default_service_order[i]; }
			else {
				while (typeof service_order[pos] != 'undefined') { pos++; }
				service_order[pos] = this.default_service_order[i];
			}
		}
		
		return service_order;
	},
	user_service_ranking: function() {
		return Taplio.fetch('TaplioExt_User_Service_Ranking', {});
	},
	upvote_service: function(service) {
		var user_svc_ranking = this.user_service_ranking();
		if (typeof user_svc_ranking[service] == 'undefined') return false;
		user_svc_ranking[service]++;
		Taplio.store('TaplioExt_User_Service_Ranking', user_svc_ranking);
	},
	// ----------------------------------
	// EXTENSION STATE
	// ----------------------------------
	extGlobalEnable: function() {
		this._setGlobalIcon_(this.action_icon_active)
		Taplio.store('TaplioExt_Master_Enable', true);
		this.global_enable = true;
		this.sendToTabs('_reload');
	},
	extGlobalDisable: function() {
		this._setGlobalIcon_(this.action_icon_inactive)
		Taplio.store('TaplioExt_Master_Enable', false);
		this.global_enable = false;
		this.sendToTabs('_reload');
	},
	// ----------------------------------
	// LOCAL STORAGE WRAPPER
	// ----------------------------------
	store: function(key, val) {
		return localStorage[key] = JSON.stringify(val)
	},
	fetch: function(key, default_val) {
		var current_val = localStorage[key];
		if (!current_val && default_val) {
			this.store(key, default_val);
			return default_val;
		}

		try { return JSON.parse(current_val); }
		catch(err) { return current_val; }
	},
	// ----------------------------------
	// DEBUG WRAPPER
	// ----------------------------------
	debug: function(msg, obj) {
	  if (this.debug_en == true && window.console) {
			obj ? console.debug('TDBG: '+msg, obj) : console.debug('TDBG: '+msg);
	  }
	}
}
