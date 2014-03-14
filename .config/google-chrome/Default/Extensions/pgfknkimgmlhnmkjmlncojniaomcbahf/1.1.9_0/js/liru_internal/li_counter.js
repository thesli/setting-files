	function li_counter()
	{
		var self = this;

		this.load_pages = {};
		this.registry = new registry();

		this.notify_toolbar_statistics = function()
		{
			var current_dt = new Date();
			var current_time = current_dt.getTime();
			var last_time = 0;
			try
			{
				last_time = Date.parse(this.registry.getCharPref('toolbar.last_notify'));
				if (isNaN(last_time)) last_time = 0;

			} catch (e) {}

			if (Math.abs(current_time - last_time) > this.registry.getIntPref('toolbar.notify_interval')) 
			{
				this.registry.setCharPref('toolbar.last_notify', current_dt.toUTCString());

				var ajax = new XMLHttpRequest();
				ajax.open('GET', 'http://toolbar.li.ru/tversion.php?tid=' + encodeURIComponent(this.registry.getCharPref('toolbar_id')) + '&version=' + encodeURIComponent(chrome.runtime.getManifest().version) + '&browser=3', true);
				ajax.send(null);

			}
			setTimeout(function(){self.notify_toolbar_statistics.call(self)}, this.registry.getIntPref('toolbar.notify_wait'));
		};

		this.notify_counters = function(title, url, referrer, size, time)
		{
			var sc = (typeof(screen) == 'undefined') ? '' : 's' + screen.width + '*' + screen.height + '*' + (screen.colorDepth ? screen.colorDepth : screen.pixelDepth);

			var ajax = new XMLHttpRequest();
			ajax.open('GET', 'http://counter.yadro.ru/hit;toolbar?r' + encodeURIComponent(referrer) + ';' + sc + ';u' + encodeURIComponent(url) + ';hm=2&s=' + size + '&t=' + time + ';' + Math.random(), true);
			ajax.send(null);
		};

		this.tab_updated = function(tabId, changeInfo, tab)
		{
			try
			{
				if ((changeInfo.status == 'loading') && (tab.url.match(/^https?:\/\//i) != null)) self.load_pages[tabId] = (new Date()).getTime();

			} catch (e) {}
		};

		this.tab_removed = function(tabId, removeInfo)
		{
			try
			{
				if (tabId in self.load_pages) delete self.load_pages[tabId];

			} catch (e) {}
		};

		this.request_recived = function(request, sender, sendResponse)
		{
			if ('command' in request)
			{
				switch (request.command)
				{
					case 'page_loaded':
					{
						if (sender.tab)
						{
							var tab_id = sender.tab.id;
							if (tab_id in self.load_pages)
							{
								var time = (new Date()).getTime() - self.load_pages[tab_id];
								self.notify_counters.call(self, sender.tab.title, sender.tab.url, request.page_referrer, request.page_size, time);
								delete self.load_pages[tab_id];

								if (bs) bs.cache.pages.put_info(sender.tab.url, request.counter);
							}
						}
						break;
					}
				}
			}
			sendResponse({});
		};

		this.external_request_recived = function(request, sender, sendResponse)
		{
			if ('command' in request)
			{
				switch (request.command)
				{
					case 'liveinternet':
					{
						return sendResponse({liveinternet:true});
					}
				}
			}
			return sendResponse({});
		};

		if (this.registry.getCharPref('toolbar_id') == '')
		{
			var toolbar_id = '';
			for (var i = 0; i < 32; i++)
			{
				var id = 0;
				if (Math.round(Math.random()))
				{
					id = Math.round(Math.random() * 9) + 48;
				} else
				{
					id = Math.round(Math.random() * 5) + 97;
				}
				toolbar_id+= String.fromCharCode(id);
			}
			this.registry.setCharPref('toolbar_id', toolbar_id);
		}

		chrome.tabs.onUpdated.addListener(this.tab_updated);
		chrome.tabs.onRemoved.addListener(this.tab_removed);
		chrome.runtime.onMessage.addListener(this.request_recived);
		chrome.extension.onMessageExternal.addListener(this.external_request_recived);

		this.notify_toolbar_statistics();
	}