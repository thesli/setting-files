function Copywriter_SEO(processor)
{
	var self = this;
	this.proc_params = null;
	this.history = new SEO_History(SERVICE_TYPE_COPYWRITER_HELPER, processor.user_id);

	this.localization = function()
	{
		var title = chrome.i18n.getMessage('seo_page_title');
		document.title = title;

		localization_simple_load({'page_title':'seo_page_header', 'page_title_seo': 'seo_page_seo'});

		localization_simple_load({'txt_copywriter_query_title': 'seo_label_query', 'txt_copywriter_process_title': 'seo_label_process', 'txt_copywriter_provider_title': 'seo_label_provider', 'seo_copywriter_query_submit': 'seo_label_start'});
		localization_simple_load({'seo_copywriter_progress_text': 'seo_label_progress', 'seo_copywriter_log_text': 'seo_label_log', 'seo_copywriter_query_stop': 'seo_label_stop'});
		localization_simple_load({'seo_copywriter_query_back': 'seo_label_back', 'seo_copywriter_query_results_link' : 'seo_results_link'});

		if (processor.auth_state != YA_AUTH_AUTHORIZED)
		{
			switch (processor.auth_state)
			{
				case YA_AUTH_NOT_AUTHORIZED:
				case YA_AUTH_ERROR:
				{
					localization_simple_load({'porvider_copywriter_yandex_unavaible':'seo_yandex_not_authorized'});
					break;
				}

				case YA_AUTH_LICENSY:
				{
					localization_simple_load({'porvider_copywriter_yandex_unavaible':'seo_account_auth_licensy'});
					break;
				}
			}

			var as = document.getElementById('porvider_copywriter_yandex_unavaible');
			if (as != null) as.style.display = 'block';

			var ya_label = (document.evaluate('./label[@for="provider_copywriter_yandex"]', document.getElementById('seo_copywriter_query_provider'), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)).singleNodeValue;
			if (ya_label != null) ya_label.setAttribute('class', 'error');
		}
	};

	this.init = function()
	{
		var sts = document.getElementById('seo_copywriter_query_submit');
		if (sts != null) sts.addEventListener('click', function(event){ self.seo_tools_process.call(self, event)}, false);

		var stsp = document.getElementById('seo_copywriter_query_stop');
		if (stsp != null) stsp.addEventListener('click', function(event) {self.seo_tools_stop.call(self, event)}, false);

		var stbk = document.getElementById('seo_copywriter_query_back');
		if (stbk != null) stbk.addEventListener('click', function(event){self.seo_tools_ready.call(self, event)}, false);

		this.history.get_form_data = function()
		{
			if (self.proc_params == null)
			{
				var result = {'search_system' : '', 'count' : 0, 'query' : ''};

				var rd = document.getElementById('seo_copywriter_query_results_count');
				var radios = document.evaluate('./input[@type="radio" and @name="seo_copywriter_results_count"]', rd, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				if (radios.snapshotLength != 0)
				{
					for (var i = 0, j = radios.snapshotLength; i<j; i++)
					{
						var it = radios.snapshotItem(i);
						if (it.checked)
						{
							result['count'] = parseInt(it.getAttribute('value'));
							break;
						}
					}
				}

				var pvd = document.getElementById('seo_copywriter_query_provider');
				var radios = document.evaluate('./input[@type="radio" and @name="seo_copywriter_provider"]', pvd, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				if (radios.snapshotLength != 0)
				{
					for (var i = 0, j = radios.snapshotLength; i<j; i++)
					{
						var it = radios.snapshotItem(i);
						if (it.checked)
						{
							result['search_system'] = it.getAttribute('value');
							break;
						}
					}
				}


				var tx = document.getElementById('seo_copywriter_query_text');
				if (tx != null) result['query'] = tx.value;
				return result;
			} else
			{
				return self.proc_params;
			}
		};

		this.history.set_form_data = function(data)
		{
			processor.stop(true);
			if (('count' in data) && (!isNaN(data['count'])))
			{
				var rd = document.getElementById('seo_copywriter_query_results_count');
				var radio = (document.evaluate('./input[@type="radio" and @name="seo_copywriter_results_count" and @value="' + data['count'] + '"]', rd, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)).singleNodeValue;
				if (radio != null) radio.checked = true;
			}

			if ('search_system' in data)
			{
				if (!processor.query_url) data['search_system'] = 'google'; // if yandex not authorized
				var pvd = document.getElementById('seo_copywriter_query_provider');
				var radio = (document.evaluate('./input[@type="radio" and @name="seo_copywriter_provider" and @value="' + data['search_system'] + '"]', pvd, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)).singleNodeValue;
				if (radio != null) radio.checked = true;
			}

			if ('query' in data)
			{
				var tx = document.getElementById('seo_copywriter_query_text');
				if (tx != null) tx.value = data['query'];
			}

			self.tab_switch.call(self, 'seo_copywriter_query');
		};
		
		processor.results_callback = function(html, link)
		{
			var res = document.getElementById('seo_copywriter_query_results_html');
			res.innerHTML = html;
					
			var url = document.getElementById('seo_copywriter_query_results_link');
			url.setAttribute('href', link);

			self.tab_switch.call(self, 'seo_copywriter_query_results');
			self.history.refresh_log();
		};

		processor.progress_callback = function(step, of)
		{
			var progress = 0;
			if (of != step)
			{
				progress = Math.floor(step * 100 / of);
			} else
			{
				progress = 100;
			}
			var pb = document.getElementById('seo_copywriter_query_progress_bar');
			if (pb != null) pb.style.width = progress + '%';
		};

		processor.log_callback = function(msg)
		{
			var tx = document.getElementById('seo_copywriter_query_log');
			if (tx != null)
			{
				tx.innerHTML = msg + '<br />' + tx.innerHTML;
			}
		};

		processor.after_error_callback = function()
		{
			processor.stop(false);
			var stsp = document.getElementById('seo_copywriter_query_stop');
			if (stsp != null)
			{
				stsp.setAttribute('back', 'true');
				stsp.setAttribute('value', chrome.i18n.getMessage('seo_label_back'));
			}
		};

		this.history.run();
		this.seo_tools_ready();
	};

	this.seo_tools_ready = function()
	{
		if (!processor.query_url)
		{
			var yad = document.getElementById('provider_copywriter_yandex');
			if (yad != null) yad.disabled = true;
		}
		var rd = document.getElementById('seo_copywriter_query_results_count');
		var radio = (document.evaluate('./input[@type="radio" and @name="seo_copywriter_results_count"][2]', rd, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)).singleNodeValue;
		if (radio) radio.checked = true;

		var pvd = document.getElementById('seo_copywriter_query_provider');
		var radio = (document.evaluate('./input[@type="radio" and @name="seo_copywriter_provider"][' + ((!processor.query_url) ? '2' : '1') + ']', pvd, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)).singleNodeValue;
		if (radio) radio.checked = true;

		var tx = document.getElementById('seo_copywriter_query_text');
		if (tx != null) tx.value = '';

		this.proc_params = null;
		this.tab_switch('seo_copywriter_query');
	};

	this.tab_switch = function(tab_id)
	{
		var tabs = document.getElementById('seo_copywriter');
		if (tabs)
		{
			var tabs_res = document.evaluate('./div', tabs, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (tabs_res.snapshotLength != 0)
			{
				for (var i = 0, j = tabs_res.snapshotLength; i<j; i++)
				{
					var it = tabs_res.snapshotItem(i);
					if (it.hasAttribute('id') && (it.getAttribute('id') == tab_id))
					{
						it.style.display = 'block';
					} else
					{
						it.style.display = 'none';
					}
				}
			}
		}
	};

	this.seo_tools_process = function(event)
	{
		var count = 0;
		var provider = '';

		var rd = document.getElementById('seo_copywriter_query_results_count');
		if (rd != null)
		{
			var radios = document.evaluate('./input[@type="radio" and @name="seo_copywriter_results_count"]', rd, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (radios.snapshotLength != 0)
			{
				for (var i = 0, j = radios.snapshotLength; i<j; i++)
				{
					var it = radios.snapshotItem(i);
					if (it.checked)
					{
						count = it.getAttribute('value');
						break;
					}
				}
			}
		}

		var pvd = document.getElementById('seo_copywriter_query_provider');
		if (pvd != null)
		{
			var radios = document.evaluate('./input[@type="radio" and @name="seo_copywriter_provider"]', pvd, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (radios.snapshotLength != 0)
			{
				for (var i = 0, j = radios.snapshotLength; i<j; i++)
				{
					var it = radios.snapshotItem(i);
					if (it.checked)
					{
						provider = it.getAttribute('value');
						break;
					}
				}
			}
		}

		var tx = document.getElementById('seo_copywriter_query_text');
		if (tx != null)
		{
			this.proc_params = {'search_system': provider, 'count':count, 'query' : tx.value};

			/* page prepare */
			var stsp = document.getElementById('seo_copywriter_query_stop');
			if (stsp != null)
			{
				stsp.setAttribute('value', chrome.i18n.getMessage('seo_label_stop'));
				stsp.removeAttribute('back');
			}

			var tx = document.getElementById('seo_copywriter_query_log');
			if (tx != null) tx.innerHTML = '';


			processor.progress_callback(0,1);

			/* run */
			this.tab_switch('seo_copywriter_query_process');
			processor.run(this.proc_params['query'], {'type': 'seo1', 'count': this.proc_params['count'], 'search_system': this.proc_params['search_system']});
		}
	};

	this.seo_tools_stop = function(event)
	{
		if (event.target.hasAttribute('back'))
		{
			this.proc_params = null;
			this.tab_switch('seo_copywriter_query');
		} else
		{
			processor.stop(true);
			event.target.setAttribute('back', 'true');
			event.target.setAttribute('value', 'Back');
		}
	};


	this.localization();
	this.init();
};