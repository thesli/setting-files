		function seo_tools_start()
		{
			chrome.windows.getCurrent(function(wnd)
			{
				chrome.tabs.create({windowId:wnd.id, url:chrome.extension.getURL('seo.html'), selected:true}, function(tab) {close();});
			});
		}

                function tab_switch(tab_id)
		{
			var tabs = document.getElementById('displayer');
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
		}

		function toolbar_statistics()
		{
			var self = this;

			this.SITE_DONE = 0;
			this.SITE_UNREGISTRED = 1;
			this.SITE_LOADING = 2;
			this.SITE_LOADING_ERROR = 3;

			this.ajax = null;
			this.blogs_caterories = [0];

			this.url = '';
			this.domain = '';

			this.info = {'sites': 0, 'rating': 0, 'stat': 0, 'man': 0, 'woman': 0, 'kernel': 0, 'url': '', 'site-type': 0};

			this.init = function(url)
			{
				this.url = url;
				var domain = url.match(/^https?:\/\/(?:www\.)?([0-9a-z-\.]+)/i);
				if (domain == null) domain = url.match(/^(?:www\.)?([0-9a-z-\.]+)/i);
				if (domain != null) this.domain = domain[1];


				var c_info = cache.rating.get_info(this.url);
				if (c_info != null)
				{
					// load success
					var s = c_info.state;
					this.info = c_info;
					delete this.info.state;
					this.display_info(s);
				} else
				{
					// start loading from network
					this.info = {'sites': 0, 'rating': 0, 'stat': 0, 'man': 0, 'woman': 0, 'kernel': 0, 'url': '', 'site-type': 0};
					this.display_info(this.SITE_LOADING);
					this.load_info(this.url);
				}
			};

			this.save_to_cache = function(state)
			{
				var c = this.info;
				c['state'] = state;
				cache.rating.put_info(this.url, c);
				return true;
			};


			this.display_info = function(state)
			{
				var label = document.getElementById('ts_info_label');
				if ((state != this.SITE_LOADING) && (state != this.SITE_LOADING_ERROR)) this.save_to_cache(state);
				switch(state)
				{
					case this.SITE_DONE:
					{
						var place = document.getElementById('ts_place');
						if (place)
						{
							place.textContent = this.info.rating;
							var div = place.parentNode.parentNode;
							if (this.blogs_caterories.indexOf(this.info['site-type']) != -1)
							{
								div.setAttribute('type', 'blog');
							} else
							{
								div.removeAttribute('type');
							}
						}

						var place_div = document.getElementById('rating_right');
						if ((place_div != null) && ('url' in this.info))
						{
							if (this.info['site-type'] == null) this.info['site-type'] = 1; // HACK

							var cat_title = chrome.i18n.getMessage('pll_cat_' + this.info['site-type']);
							var text = chrome.i18n.getMessage('ts_place_in_rating', [this.info.url, cat_title]); 
							place_div.innerHTML = text;
						}

						var auditory_percent = document.getElementById('ts_auditory_value');
						if ((auditory_percent != null) && ('stat' in this.info)) auditory_percent.textContent = ((this.info['stat'] == null) ? unescape('\u2013') : this.info['stat'] + '%');

						if (this.info['site-type'] != 4)
						{
							var kernel_percent = document.getElementById('ts_kernel_value');
							if ((kernel_percent != null) && ('kernel' in this.info)) kernel_percent.textContent = ((this.info['kernel'] == null) ? unescape('\u2013') : this.info['kernel'] + '%');

							var search_percent = document.getElementById('ts_search_value');
							if ((search_percent != null) && ('search' in this.info)) search_percent.textContent = ((this.info['search'] == null) ? unescape('\u2013') : this.info['search'] + '%');


							var dm = document.getElementById('ts_dm_lmale');
							if ((dm != null) && ('man' in this.info)) dm.innerHTML = ((this.info['man'] == null) ? unescape('\u2013') : this.info['man'] + '%');

							var df = document.getElementById('ts_dm_lfemale');
							if ((df != null) && ('woman' in this.info)) df.innerHTML = ((this.info['woman'] == null) ? unescape('\u2013') : this.info['woman'] + '%');


							// hide friends
							var ft = document.getElementById('ts_friends_me_title');
							if (ft != null) ft.parentNode.style.display = 'none';

							ft = document.getElementById('ts_friends_my_title');
							if (ft != null) ft.parentNode.style.display = 'none';


							// show stat
							ft = document.getElementById('ts_kernel_title');
							if (ft != null) ft.parentNode.style.display = 'table-row';

							ft = document.getElementById('ts_search_title');
							if (ft != null) ft.parentNode.style.display = 'table-row';

							ft = document.getElementById('ts_demography_title');
							if (ft != null) ft.parentNode.style.display = 'table-row';

						} else
						{

							var friends_me = document.getElementById('ts_friends_me_value');
							if ((friends_me != null) && ('friend_me' in this.info)) friends_me.textContent = ((this.info['friend_me'] == null) ? unescape('\u2013') : this.info['friend_me']);

							var friends_my = document.getElementById('ts_friends_my_value');
							if ((friends_my != null) && ('friend_my' in this.info)) friends_my.textContent = ((this.info['friend_my'] == null) ? unescape('\u2013') : this.info['friend_my']);


							// hide friends
							var ft = document.getElementById('ts_kernel_title');
							if (ft != null) ft.parentNode.style.display = 'none';

							ft = document.getElementById('ts_search_title');
							if (ft != null) ft.parentNode.style.display = 'none';

							ft = document.getElementById('ts_demography_title');
							if (ft != null) ft.parentNode.style.display = 'none';


							ft = document.getElementById('ts_friends_me_title');
							if (ft != null) ft.parentNode.style.display = 'table-row';

							ft = document.getElementById('ts_friends_my_title');
							if (ft != null) ft.parentNode.style.display = 'table-row';
						}

						var all_statistics = document.getElementById('ts_all_panel_statistics');
						if (all_statistics != null)
						{
							var url = 'http://webomer.ru/cgi-bin/wr.fcgi?action=site&site=' + this.domain;
							all_statistics.setAttribute('href', url);
						}

						document.getElementById('ts_info').style.display = 'none';
						document.getElementById('ts_display').style.display = 'block';

						return true;
					}

					case this.SITE_UNREGISTRED:
					{
						label.textContent = chrome.i18n.getMessage('ts_unregistred');
						break;
					}

					case this.SITE_LOADING:
					{
						label.textContent = chrome.i18n.getMessage('ts_loading', this.domain);
						break;
					}

					case this.SITE_LOADING_ERROR:
					{
						label.textContent = chrome.i18n.getMessage('ts_loading_error', this.domain);
						break;
					}
				}

				document.getElementById('ts_info').style.display = 'block';
				document.getElementById('ts_display').style.display = 'none';
        		};

			this.parse_info = function(txt)
			{
				var lines = txt.split("\n");
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
								self.info[params[1]] = parseFloat(params[2]);
								if (isNaN(self.info[params[1]])) self.info[params[1]] = null;
								break;
							}

							case 'sites':
							case 'rating':
							case 'site-type':
							case 'friend_me':
							case 'friend_my':
							{
								self.info[params[1]] = parseInt(params[2]);
								if (isNaN(self.info[params[1]])) self.info[params[1]] = null;
								break;
							}

							default:
							{
								self.info[params[1]] = params[2];
							}
						}
					}
				});

				this.display_info(this.SITE_DONE);
			};

			this.load_info = function(url)
			{
			        if (this.ajax != null) this.stop_ajax();
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
										self.load_info.call(self, url.replace(/^https:\/\//, 'http://'));
									} else
									{
										self.display_info.call(self, self.SITE_UNREGISTRED);
									}
								} else
								{
									self.parse_info.call(self, this.responseText);
								}
							} else
							{
								self.display_info.call(self, self.SITE_LOADING_ERROR);
							}
						}
					} catch (e){}
				};
				ajax.send(null);
				this.ajax = ajax;
			};

			this.stop_ajax = function()
			{
			        if (this.ajax != null)
				{
					try
					{
						if (this.ajax.readyState != 4)
						{
							this.ajax.onreadystatechange = null;
							this.ajax.abort();
						}
					} catch (e) {}
					this.ajax = null;
				}
			};
		}


		function counter_statistics()
		{	
			var self = this;

			this.SITE_DONE = 0;
			this.SITE_UNREGISTRED = 1;
			this.SITE_FORBIDDEN = 2;
			this.SITE_LOADING = 3;
			this.SITE_LOADING_ERROR = 4;

			this.ajax = null;
			this.is_blog = false;
			this.domain = '';
			this.counter = {};

			this.init = function(domain)
			{
				this.domain = domain;
				this.is_blog = (domain.match(/^dnevnik_[0-9]+$/) != null);

				var c_info = cache.counters.get_info(this.domain);
				if (c_info != null)
				{
					// load success
					var s = c_info.state;
					this.counter = c_info;
					delete this.counter.state;
					this.display_info(s);
				} else
				{
					// start loading from network
					this.counter = {};
					this.display_info(this.SITE_LOADING);
					this.load_counters();
				}
			};

			this.save_to_cache = function(state)
			{
				var c = this.counter;
				c['state'] = state;
				cache.counters.put_info(this.domain, c);
				return true;
			};

			this.normalize = function(text)
			{
				var str = text.toString();
				var res = '';
				for (var i = k = str.length - 1, j = 0; i>=j; i--)
				{
					res = str[i] + res;
					if (((k - i + 1) % 3) == 0) res = ' ' + res;
				}
				return res;
			};

			this.display_info = function(state)
			{
				var label = document.getElementById('cs_info_label');
				if ((state != this.SITE_LOADING) && (state != this.SITE_LOADING_ERROR)) this.save_to_cache(state);
				switch(state)
				{
					case this.SITE_DONE:
					{
						for (var i in this.counter)
						{
							var e = document.getElementById(i);
							if (e) e.textContent = this.normalize(this.counter[i]);
						}
						document.getElementById('cs_info').style.display = 'none';
						document.getElementById('cs_display').style.display = 'block';
						return true;
					}

					case this.SITE_UNREGISTRED:
					{
						label.innerHTML = chrome.i18n.getMessage('cs_unregistred', this.domain);
						break;
					}

					case this.SITE_FORBIDDEN:
					{
						label.textContent = chrome.i18n.getMessage('cs_forbidden', this.domain);
						break;
					}

					case this.SITE_LOADING:
					{

						if (this.is_blog)
						{
							label.textContent = chrome.i18n.getMessage('cs_loading_blog');
						} else
						{
							label.textContent = chrome.i18n.getMessage('cs_loading', this.domain);
						}
						break;
					}

					case this.SITE_LOADING_ERROR:
					{
						label.textContent = chrome.i18n.getMessage('cs_loading_error', this.domain);
						break;
					}
				}

				document.getElementById('cs_info').style.display = 'block';
				document.getElementById('cs_display').style.display = 'none';
				return false;
			};

			this.display_unregistred = function(domain)
			{
				var label = document.getElementById('cs_info_label');
				label.innerHTML = chrome.i18n.getMessage('cs_unregistred', domain);
				document.getElementById('cs_info').style.display = 'block';
				document.getElementById('cs_display').style.display = 'none';
			};

			this.display_loading = function(domain, blog)
			{
				var label = document.getElementById('cs_info_label');
				if (blog == true)
				{
        				label.textContent = chrome.i18n.getMessage('cs_loading_blog');
				} else
				{
        				label.textContent = chrome.i18n.getMessage('cs_loading', domain);
				}
				document.getElementById('cs_info').style.display = 'block';
				document.getElementById('cs_display').style.display = 'none';
			}

			this.parse_counters = function(text)
			{
				var matches = text.match(/^LI_error\s*?=\s*?'(.*?)';/i);
				if (matches != null)
				{
					var err = matches[1];
					if (err.match(/^Unregistered\ssite/i))
					{
						return this.display_info(this.SITE_UNREGISTRED);

					} else if (err.match(/^access\sdenied/i))
					{
						return this.display_info(this.SITE_FORBIDDEN);
					}
				} else
				{
					var counters = text.match(/LI_[0-9a-z\_\-]+\s?=\s?[^\;]*?;/gi);
					if (counters != null)
					{
						counters.forEach(function(element, index, array)
						{
							var m = element.match(/^LI_([0-9a-z\_\-]+)\s?=\s?([^\;]*?);$/i);
							self.counter[m[1]] = m[2];
						});
						return this.display_info(this.SITE_DONE);
					}
				}
				return this.display_info(this.SITE_LOADING_ERROR);
			};

			this.load_counters = function()
			{
			        if (this.ajax != null) this.stop_ajax();
				var ajax = new XMLHttpRequest();
				ajax.open('GET', 'http://counter.yadro.ru/values?site=' + this.domain, true);
				ajax.onreadystatechange = function()
				{
					try
					{
						if (this.readyState == 4)
						{
							if (this.status == 200)
							{
								var info = this.responseText;
								self.parse_counters.call(self, info);
							} else
							{
								self.display_info.call(self, self.SITE_LOADING_ERROR);
							}
						}
					} catch (e){}
				};
				ajax.send(null);
				this.ajax = ajax;
			};

			this.stop_ajax = function()
			{
			        if (this.ajax != null)
				{
					try
					{
						if (this.ajax.readyState != 4)
						{
							this.ajax.onreadystatechange = null;
							this.ajax.abort();
						}
					} catch (e) {}
					this.ajax = null;
				}
			};
		}

		function catalog_informer()
		{	
			var self = this;

			this.SITE_DONE = 0;
			this.SITE_UNREGISTRED = 1;
			this.SITE_LOADING = 2;
			this.SITE_LOADING_ERROR = 3;

			this.ajax = null;
			this.is_blog = false;
			this.li_langs = ['ar', 'be', 'de', 'en', 'es', 'fr', 'he', 'it', 'ja', 'lt', 'lv', 'pl', 'pt', 'ru', 'tr', 'uz', 'zh'];

			this.domain = '';
			this.info = {registred: false, protected:true};
			this.init = function(domain)
			{
				this.domain = domain;
				this.is_blog = (domain.match(/^dnevnik_[0-9]+$/) != null);

				var c_info = cache.catalog.get_info(domain);
				if (c_info != null)
				{
					// load success
					var s = c_info.state;
					this.info = c_info;
					delete this.info.state;
					this.display_catalog_info(s);

				} else
				{
					// start loading from network
					this.info = {registred: false, protected:true};
					this.display_catalog_info(this.SITE_LOADING);
					this.load_catalog_info();
				}
			};

			this.save_to_cache = function(state)
			{
				var c = this.info;
				c['state'] = state;
				cache.catalog.put_info(this.domain, c);
				return true;
			};

			this.display_catalog_info = function(state)
			{
				var label = document.getElementById('as_info_label');
				if ((state != this.SITE_LOADING) && (state != this.SITE_LOADING_ERROR)) this.save_to_cache(state);

				switch (state)
				{
					case this.SITE_DONE:
					{
						var cat_div = document.getElementById('as_category_info');
						if (cat_div)
						{
							if (this.info.place)
							{
								cat_div.innerHTML = chrome.i18n.getMessage('as_registred_category', ['http://www.liveinternet.ru' + this.info.place_url, this.info.place, 'http://www.liveinternet.ru' + this.info.cat_url, this.info.cat_title]);
								cat_div.style.display = 'block';
							} else
							{
								cat_div.style.display = 'none';
							}
						}

						var stat_div = document.getElementById('as_statistics_info');
						if (stat_div)
						{
							if (this.info.protected)
							{
								stat_div.innerHTML = chrome.i18n.getMessage('as_statistics_by_password', 'http://www.liveinternet.ru/stat/' + this.domain + '/');
							} else
							{
								stat_div.innerHTML = chrome.i18n.getMessage('as_statistic_public', 'http://www.liveinternet.ru/stat/' + this.domain + '/');
							}
						}
					
						document.getElementById('as_info').style.display = 'none';
						document.getElementById('as_display').style.display = 'block';
						return true;
					}
					case this.SITE_UNREGISTRED:
					{
						label.textContent = chrome.i18n.getMessage('as_unregistred', this.domain);
						break;
					}
					case this.SITE_LOADING:
					{

						if (this.is_blog)
						{
							label.textContent = chrome.i18n.getMessage('as_loading_blog');
						} else
						{
							label.textContent = chrome.i18n.getMessage('as_loading', this.domain);
						}
						break;
					}

					case this.SITE_LOADING_ERROR:
					{
						label.textContent = chrome.i18n.getMessage('as_loading_error', this.domain);
						break;
					}
				}

				document.getElementById('as_info').style.display = 'block';
				document.getElementById('as_display').style.display = 'none';

			};

			this.display_unregistred = function(domain)
			{
				var label = document.getElementById('as_info_label');
				label.textContent = chrome.i18n.getMessage('as_unregistred', domain);
				document.getElementById('as_info').style.display = 'block';
				document.getElementById('as_display').style.display = 'none';
			};

			this.display_loading = function(domain, blog)
			{
				var label = document.getElementById('as_info_label');
				if (blog == true)
				{
					label.textContent = chrome.i18n.getMessage('as_loading_blog');
				} else
				{
					label.textContent = chrome.i18n.getMessage('as_loading', domain);
				}
				document.getElementById('as_info').style.display = 'block';
				document.getElementById('as_display').style.display = 'none';
			};

			this.parse_catalog_info = function(text)
			{
				if (text != '')
				{
					if (text.match(/The\ssite.*?is\snot\sregistered/i) == null)
					{
						this.info['registred'] = true;
						var st = text.match(/Statistics.*?(public|accessible\sonly\sby\spassword)/i);
						if ((st != null) && (st[1] == 'public')) this.info['protected'] = false;
						var pt = text.match(/take\s<a\s+href\s?=\s?"([^\"]+)"[^\>]*?>([0-9\,]+).*?<a\s+href\s?=\s?"(\/rating\/[^\"]+)"[^\>]*?>.*?<b>(.*?)<\/b>/i);
						if (pt != null)
						{
							this.info['place_url'] = pt[1];
							this.info['place'] = pt[2].replace(/\,/g, '');
							this.info['cat_url'] = pt[3];
							this.info['cat_title'] = pt[4];

							var lang = chrome.i18n.getMessage('this_translation');
							if ((lang != 'en') && (this.li_langs.indexOf(lang) != -1)) return this.load_catalog_title(lang);
						}
					
						this.display_catalog_info(this.SITE_DONE);
					} else
					{
						this.display_catalog_info(this.SITE_UNREGISTRED);
					}
				} else
				{
					this.display_catalog_info(this.SITE_LOADING_ERROR);
				}
			};

			this.load_catalog_info = function()
			{
			        if (this.ajax != null) this.stop_ajax();
				var ajax = new XMLHttpRequest();
				ajax.open('GET', 'http://www.liveinternet.ru/rating/en/?url=' + this.domain + ';lang=en', true);
				ajax.onreadystatechange = function()
				{
					try
					{
						if (this.readyState == 4)
						{
							if (this.status == 200)
							{
								var text = this.responseText.replace(/\r\n|\n/g, ' ');
								self.parse_catalog_info.call(self, text);
							} else
							{
								self.display_catalog_info.call(self, self.SITE_LOADING_ERROR);
							}
						}
					} catch (e){}
				};
				ajax.send(null);

				this.ajax = ajax;
			};

			this.load_catalog_title = function(lang)
			{
			        if (this.ajax != null) this.stop_ajax();
				var ajax = new XMLHttpRequest();
				ajax.open('GET', 'http://www.liveinternet.ru/rating/en/?url=' + this.domain + ';lang=' + lang, true);
				ajax.onreadystatechange = function()
				{
					try
					{
						if (this.readyState == 4)
						{
							if (this.status == 200)
							{
								var text = this.responseText.replace(/\r\n|\n/g, ' ');
								if (text != null)
								{
									var ct = text.match(/&laquo;\s*?<a\s+href\s?=\s?"[^\>]+"[^\>]*?>.*?<b>(.*?)<\/b>.*?<\/\s?a>\s?&raquo;/i);
									if (ct != null) self.info['cat_title'] = ct[1];
									
								}
							}
							self.display_catalog_info.call(self, self.SITE_DONE);
						}
					} catch (e){}
				};
				ajax.send(null);
				this.ajax = ajax;
			};

			this.stop_ajax = function()
			{
			        if (this.ajax != null)
				{
					try
					{
						if (this.ajax.readyState != 4)
						{
							this.ajax.onreadystatechange = null;
							this.ajax.abort();
						}
					} catch (e) {}
					this.ajax = null;
				}
			};
		}


		var s, t, c, url, domain, ajax, cache;


		function load_init()
		{
			// stop ajax, if already started
			if (ajax != null)
			{
				try
				{
					if (ajax.readyState != 4)
					{
						ajax.onreadystatechange = null;
						ajax.abort();
					}
				} catch (e) {}
				ajax = null;
			}

			var m = url.match(/^http:\/\/www\.liveinternet\.ru\/(?:users|community)\/([a-z0-9\_\-]+)\//i);
			if (m != null)
			{
				// liveinternet blog
				var b_info = cache.page2blog.get_info(m[0]);
				if (b_info != null)
				{
					// cached
					s.init('dnevnik_' + b_info);
					c.init('dnevnik_' + b_info);

				} else
				{
					// non cached
					s.display_loading(domain, true);
					c.display_loading(domain, true);

					ajax = new XMLHttpRequest();
					ajax.open('GET', 'http://www.liveinternet.ru/misc.php?action=get_id_from_url&url=' + m[0], true);
					ajax.onreadystatechange = function()
					{
						try
						{
							if (this.readyState == 4)
							{
								if (this.status == 200)
								{
									var bid = this.responseText.match(/^([0-9]+)/);
									if (bid != null)
									{
										cache.page2blog.put_info(m[0], bid[1]);
										s.init('dnevnik_' + bid[1]);
										c.init('dnevnik_' + bid[1]);
										return;
									}
								}

								// error 8-)
								s.display_unregistred(domain);
								c.display_unregistred(domain);
							}

						} catch (e){}
					};
					ajax.send(null);
				}

			} else
			{
				// other domain
				var c_info = cache.pages.get_info(url);
				if (c_info != null)
				{
					// check counter from cache
					if (c_info == true)
					{
						// need check
						s.init(domain);
						c.init(domain);
					} else
					{
						// unregistred
						s.display_unregistred(domain);
						c.display_unregistred(domain);
					}
					return;
				}

				var m = url.match(/^http:\/\/[a-z0-9\-\.]+\//i);
				if (m == null)
				{
					s.display_unregistred(domain);
					c.display_unregistred(domain);
					return;
				}

				var b_info = cache.page2blog.get_info(m[0]);
				if (b_info != null)
				{
					// cached
					s.init('dnevnik_' + b_info);
					c.init('dnevnik_' + b_info);
					return;
				}

				// check for single domain liveinternet blog
				s.display_loading(domain);
				c.display_loading(domain);

				ajax = new XMLHttpRequest();
				ajax.open('GET', 'http://www.liveinternet.ru/misc.php?action=get_id_from_url&url=' + m[0], true);
				ajax.onreadystatechange = function()
				{
					try
					{
						if (this.readyState == 4)
						{
							if (this.status == 200)
							{
								var bid = this.responseText.match(/^([0-9]+)/);
								if (bid != null)
								{
									cache.page2blog.put_info(m[0], bid[1]);
									s.init('dnevnik_' + bid[1]);
									c.init('dnevnik_' + bid[1]);
									return;
								}
							}

							// check counter from internet
							ajax = new XMLHttpRequest();
							ajax.open('GET', url, true);
							ajax.onreadystatechange = function()
							{
								try
								{
									if (this.readyState == 4)
									{
										if (this.status == 200)
										{
											if (this.responseText.indexOf('counter.yadro.ru/hit') != -1)
											{
												// need check
												cache.pages.put_info(url, true);
												s.init(domain);
												c.init(domain);
											} else
											{
												// unregistred
												cache.pages.put_info(url, false);
												s.display_unregistred(domain);
												c.display_unregistred(domain);
							
											}
										} else
										{
											// unregistred
											s.display_unregistred(domain);
											c.display_unregistred(domain);
										}
									}
								} catch (e){}
							};
							ajax.send(null);

						}
                        		} catch (e){}
				};
				ajax.send(null);

			}
		}

		function search_start(event)
		{
			url = document.getElementById('domain_field').value;
			domain = url.match(/^https?:\/\/(?:www\.)?([0-9a-z-\.]+)/i);
			if (domain == null)
			{
				domain = url.match(/^(?:www\.)?([0-9a-z-\.]+)/i);
				if (domain != null)
				{
					url = 'http://' + url + '/';
					domain = domain[1];
				}
			} else
			{
				domain = domain[1];
			}

			if (domain != null)
			{
				document.getElementById('cs_info').style.display = 'block';
				document.getElementById('cs_display').style.display = 'none';

				document.getElementById('ts_info').style.display = 'block';
				document.getElementById('ts_display').style.display = 'none';

				document.getElementById('as_info').style.display = 'block';
				document.getElementById('as_display').style.display = 'none';

				tab_switch('supported_domain');

				chrome.runtime.getBackgroundPage(function(bg)
				{
					chrome.browserAction.setBadgeText({text:''});
					cache = bg.bs.cache;
					bg.bs.init(url);
					
					t.init(url);
					load_init();
				});
			} else
			{
				tab_switch('unsupported_domain');
			}
		}


		window.addEventListener('DOMContentLoaded', function ()
		{
			window.alert = function(msg)
			{
				var e = document.getElementById('alert');
				e.textContent = msg;
			};

			// setup localized text
			var locale_places = {'cs_title':'cs_title', 'cs_views_title':'cs_views_title', 'cs_visiters_title':'cs_visiters_title', 'cs_month_title':'cs_month_title', 'cs_week_title':'cs_week_title', 'cs_day_title':'cs_day_title', 'cs_today_title':'cs_today_title', 'cs_online_title':'cs_online_title', 'ts_all_panel_statistics':'ts_all_panel_statistics', 'ts_auditory_title':'ts_auditory_title', 'ts_kernel_title':'ts_kernel_title', 'ts_search_title':'ts_search_title', 'ts_demography_title':'ts_demography_title', 'unsupported_page':'unsupported_page', 'ts_dm_imale':'ts_dm_imale', 'ts_dm_ifemale': 'ts_dm_ifemale', 'start_seo_tools': 'seo_feature'};
			localization_simple_load(locale_places);

			document.getElementById('start_search').addEventListener('click',search_start ,false);
			document.getElementById('domain_field').addEventListener('keypress', function(event) {
	
				if (event.charCode == 13) search_start(event);

			}, false);

			document.getElementById('start_seo_tools').addEventListener('click', seo_tools_start, false);

			// get cache
			chrome.runtime.getBackgroundPage(function(bg)
			{
				cache = bg.bs.cache;

				// our workers
				t = new toolbar_statistics();
				s = new counter_statistics();
				c = new catalog_informer();

				ajax = null;

				// start job
				chrome.tabs.query({active:true}, function(tabs)
				{
					if (tabs.length)
					{
						url = tabs[0].url;
						domain = url.match(/^https?:\/\/(?:www\.)?([0-9a-z-\.]+)/i);
						if (domain != null)
						{
							domain = domain[1];

							document.getElementById('domain_field').value = url;
							tab_switch('supported_domain');

							t.init(url);
							load_init();
						}
					}
				});
			});

		}, false);
