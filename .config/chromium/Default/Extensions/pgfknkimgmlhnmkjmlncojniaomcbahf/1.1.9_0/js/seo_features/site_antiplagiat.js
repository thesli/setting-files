function SiteAntiplagiat_SEO(processor)
{
	var self = this;
	this.proc_params = null;
	this.history = new SEO_History(SERVICE_TYPE_ANTIPLAGIAT, processor.user_id);
	
	this.localization = function()
	{
		var title = chrome.i18n.getMessage('seo_page_title');
		document.title = title;

		localization_simple_load({'page_title':'seo_page_header', 'page_title_seo': 'seo_antiplagiat_header'});

		localization_simple_load({'txt_antiplagiat_query_queries': 'seo_antiplagiat_queries', 'txt_antiplagiat_process_title': 'seo_label_process', 'txt_antiplagiat_process_of_title': 'seo_label_process_of', 'seo_antiplagiat_submit': 'seo_antiplagiat_start'});
		localization_simple_load({'seo_antiplagiat_progress_text': 'seo_label_progress', 'seo_antiplagiat_log_text': 'seo_label_log', 'seo_antiplagiat_stop': 'seo_label_stop'});
		localization_simple_load({'seo_antiplagiat_back': 'seo_label_back', 'seo_antiplagiat_results_link' : 'seo_results_link'});
	};

	this.init = function()
	{
		var sts = document.getElementById('seo_antiplagiat_submit');
		if (sts != null) sts.addEventListener('click', function(event) {self.seo_tools_process.call(self, event)}, false);

		var stsp = document.getElementById('seo_antiplagiat_stop');
		if (stsp != null) stsp.addEventListener('click', function(event) {self.seo_tools_stop.call(self, event)}, false);

		var stbk = document.getElementById('seo_antiplagiat_back');
		if (stbk != null) stbk.addEventListener('click', function(event){self.seo_tools_ready.call(self, event)}, false);

		this.history.get_form_data = function()
		{
			if (self.proc_params == null)
			{
				var result = {'query' : ''};

				var qt = document.getElementById('seo_antiplagiat_query_text');
				if (qt != null)  result['query'] = qt.value;

				return result;
			} else
			{
				return self.proc_params;
			}
		};

		this.history.set_form_data = function(data)
		{
			processor.stop(true);

			if ('query' in data)
			{
				var tx = document.getElementById('seo_antiplagiat_query_text');
				if (tx != null) tx.value = data['query'];
			}

			self.tab_switch.call(self, 'seo_antiplagiat_query');
		};
	

		processor.results_callback = function(html, link)
		{
			var res = document.getElementById('seo_antiplagiat_results_html');
			res.innerHTML = html;
					
			var url = document.getElementById('seo_antiplagiat_results_link');
			url.setAttribute('href', link);

			self.tab_switch.call(self, 'seo_antiplagiat_results');
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
			var pb = document.getElementById('seo_antiplagiat_progress_bar');
			if (pb != null) pb.style.width = progress + '%';
		};

		processor.log_callback = function(msg)
		{
			var tx = document.getElementById('seo_antiplagiat_log');
			if (tx != null)
			{
				tx.innerHTML = msg + '<br />' + tx.innerHTML;
			}
		};

		processor.after_error_callback = function()
		{
			processor.stop(false);
			var stsp = document.getElementById('seo_antiplagiat_stop');
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
		var tx = document.getElementById('seo_antiplagiat_query_text');
		if (tx != null) tx.value = '';

		this.proc_params = null;
		this.tab_switch('seo_antiplagiat_query');
	};

	this.tab_switch = function(tab_id)
	{
		var tabs = document.getElementById('seo_antiplagiat');
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
		var text = '';
		var qt = document.getElementById('seo_antiplagiat_query_text');
		if (qt != null)  text = qt.value;

		this.proc_params = {'query':text};

		/* page prepare */
		var stsp = document.getElementById('seo_antiplagiat_stop');
		if (stsp != null)
		{
			stsp.setAttribute('value', chrome.i18n.getMessage('seo_label_stop'));
			stsp.removeAttribute('back');
		}

		var tx = document.getElementById('seo_antiplagiat_log');
		if (tx != null) tx.innerHTML = '';

		processor.progress_callback(0,1);

		/* run */
		this.tab_switch('seo_antiplagiat_process');
		processor.run(this.proc_params['query'], {'type': 'seo4'});
	};

	this.seo_tools_stop = function(event)
	{
		if (event.target.hasAttribute('back'))
		{
			this.proc_params = null;
			this.tab_switch('seo_antiplagiat_query');
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