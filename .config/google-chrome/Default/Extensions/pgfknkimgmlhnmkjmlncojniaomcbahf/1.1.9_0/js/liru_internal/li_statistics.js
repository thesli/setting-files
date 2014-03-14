	function button_statistics()
	{
		var self = this;

		this.SITE_DONE = 0;
		this.SITE_UNREGISTRED = 1;
		this.SITE_LOADING = 2;
		this.SITE_LOADING_ERROR = 3;


		this.registry = new registry('info.');
		this.auto_rating = this.registry.getBoolPref('auto_rating');

		this.cache = {
			counters: new SimplyCache(this.registry.getIntPref('cache_ttl')),
			catalog: new SimplyCache(this.registry.getIntPref('cache_ttl')),
			rating: new SimplyCache(this.registry.getIntPref('cache_ttl')),
			pages: new SimplyCache(this.registry.getIntPref('cache_ttl')),
			page2blog: new SimplyCache(this.registry.getIntPref('cache_ttl'))
		};

		this.registry.addObserver('', function(key, old_val, new_val)
		{
			if (old_val != new_val)
			{
				switch (key)
				{
					case 'cache_ttl':
					{
						for (var i in self.cache)
						{
							self.cache[i].ttl = new_val;
							self.cache[i].cache_purge();
						}
						break;
					}

					case 'auto_rating':
					{
						self.auto_rating = self.registry.getBoolPref('auto_rating');
						if (!new_val) chrome.browserAction.setBadgeText({text:''});
						break;
					}
				}
			}
		});

		this.init = function(url)
		{
			if (url.match(/^https?:\/\//i) != null)
			{
				var info = this.cache.rating.get_info(url);
				if (info == null)
				{
					this.load(url, url);
				} else
				{
					switch(info.state)
					{
						case this.SITE_DONE:
						{
							this.display(url, info['rating'], info['site-type']);
							break;
						}

						case this.SITE_UNREGISTRED:
						{
							this.display(url, 0, 0);
							break;
						}	
					}
				}
			} else
			{
				this.display(url, 0, 0);
			}
		};
	

		this.load = function(url, original_url)
		{
			var ajax = new XMLHttpRequest();
			ajax.open('GET', 'http://webomer.ru/cgi-bin/wp.fcgi?url=' + url, true);
			ajax.onreadystatechange = function()
			{
				try
				{
					if (this.readyState == 4)
					{
						if (this.status == 200)
						{
							var info = this.responseText.match(/^null/i);
							if (info != null)
							{
								if (url.match(/^https:\/\//i) != null)
								{
									self.load.call(self, url.replace(/^https:\/\//, 'http://'), original_url);
								} else
								{
									self.cache.rating.put_info(original_url, {'sites': 0, 'rating': 0, 'stat': '0', 'man': '0', 'woman': '0', 'kernel': '0', 'url': '', 'site-type': 0, 'state' : self.SITE_UNREGISTRED});
									self.display.call(self, original_url, 0, 0);
								}
							} else
							{
								var info = {'sites': 0, 'rating': 0, 'stat': '0', 'man': '0', 'woman': '0', 'kernel': '0', 'url': '', 'site-type': 0};
								var lines = this.responseText.split("\n");
								lines.forEach(function(el,i,a)
								{
									var params = el.match(/^([^\=\s]*?)=(.*?)$/i);
									if (params != null)
									{
										switch (params[1])
										{
											case 'stat':
											case 'man':
											case 'woman':
											case 'kernel':
											case 'search':
											{
												info[params[1]] = parseFloat(params[2]);
												if (isNaN(info[params[1]])) info[params[1]] = null;
												break;
											}

											case 'sites':
											case 'rating':
											case 'site-type':
											case 'friend_me':
											case 'friend_my':
											{
												info[params[1]] = parseInt(params[2]);
												if (isNaN(info[params[1]])) info[params[1]] = null;
												break;
											}

											default:
											{
												info[params[1]] = params[2];
											}
										}
									}
								});

								info['state'] = self.SITE_DONE;
                                                                self.cache.rating.put_info(original_url, info);
								self.display.call(self, original_url, info['rating'], info['site-type']);
							}
						} else
						{
							self.display_info.call(self, original_url, -1, -1);
						}
					}
				} catch (e){}
			};
			ajax.send(null);
		};

		this.display = function(url, place, category)
		{
			chrome.windows.getCurrent(function(wnd)
			{
				chrome.tabs.query({active:true, windowId:wnd.id}, function(tabs)
				{
					if (tabs.length && (tabs[0].url == url))
					{
						switch (category)
						{
							case 0:
							{
								// unregistred
								chrome.browserAction.setBadgeText({text:"-"});
								chrome.browserAction.setBadgeBackgroundColor({color:[190, 190, 190, 230]});
								break;
							}

							case -1:
							{
								// error loading
								chrome.browserAction.setBadgeText({text:"?"});
								chrome.browserAction.setBadgeBackgroundColor({color:[190, 190, 190, 230]});
								break;
							}

							default:
							{
								var bcats = [0];
								if (bcats.indexOf(category) != -1)
								{
									chrome.browserAction.setBadgeBackgroundColor({color:[190, 0, 0, 230]});
								} else
								{
									chrome.browserAction.setBadgeBackgroundColor({color:[0, 0, 190, 230]});
								}

								chrome.browserAction.setBadgeText({text: self.format_place(place)});
								break;
							}
						}

						var img = 'icons/16.png';
						switch (category)
						{
							case 4: //google+
							{
								img = 'icons/services/googleplus.png';
								break;
							}

							default: // other
							{
								img = 'icons/16.png';
								break;
							}
						}

						chrome.browserAction.setIcon({path: chrome.extension.getURL(img)});

					}
				});
			});
		};

		this.format_place = function(place)
		{
			if (place < 10000) return (place).toString();
			if ((place > 9999) && (place < 100000)) return (Math.floor(place / 1000)).toString() + 'K';
			if ((place > 99999) && (place < 1000000)) return ((place / 1000000)).toString().substr(0, 3) + 'M';
			if ((place > 999999) && (place < 100000000)) return ((place / 1000000)).toString().substr(0, 2) + 'M';
			return '';
		};


		this.tab_updated = function(tabId, changeInfo, tab)
		{
			if (self.auto_rating === true)
			{
				try
				{
					if ((tab.active) && (changeInfo.status == 'loading') && (tab.url.match(/^https?:\/\//i) != null)) self.init.call(self, tab.url);
	
				} catch (e) {}
			}
		};

		this.tab_activated = function(activeInfo)
		{
			if (self.auto_rating === true)
			{
				chrome.tabs.get(activeInfo.tabId, function(tab)
				{
					self.init.call(self, tab.url);
				});
			}
		};

		this.winwow_activated = function(windowId)
		{
			if (self.auto_rating === true)
			{
				chrome.windows.getCurrent(function(wnd)
				{
					chrome.tabs.query({active:true, windowId:wnd.id}, function(tabs)
					{
						self.init.call(self, tabs[0].url);
					});
				});
			}
		};

		chrome.tabs.onUpdated.addListener(this.tab_updated);
		chrome.tabs.onActivated.addListener(this.tab_activated);
		chrome.windows.onFocusChanged.addListener(this.winwow_activated);
	};
