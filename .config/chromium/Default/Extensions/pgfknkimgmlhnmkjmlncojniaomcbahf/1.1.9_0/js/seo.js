var SERVICE_DOMAIN = '';

const SERVICE_TYPE_COPYWRITER_HELPER = 'seo1';
const SERVICE_TYPE_PAGES_ANALYSER = 'seo2';
const SERVICE_TYPE_SITES_ANALYSER = 'seo3';
const SERVICE_TYPE_ANTIPLAGIAT = 'seo4';


const YA_AUTH_NOT_AUTHORIZED = 0;
const YA_AUTH_AUTHORIZED = 1;
const YA_AUTH_ERROR = 2;
const YA_AUTH_LICENSY = 3;

function SEO()
{
	var self = this;

	this.registry = new registry('seo.');
	SERVICE_DOMAIN = this.registry.getCharPref('domain');

	this.ya_auth_state = YA_AUTH_NOT_AUTHORIZED;
	this.ya_request_url = '';
	this.account_title = '';
	this.region_title = '';
	this.region_id = 0;

	this.queries_processed = 0;
	this.queries_limit = 0;
	this.confirm_phone = false;

	this.email = '';
	this.uid = '';

	this.feature = null;

	this.init = function()
	{
		localization_simple_load({'copywriter':'seo_copywriter_menu', 'sp_analyser': 'seo_sp_analyser_menu', 'sr_analyser': 'seo_sr_analyser_menu', 'antiplagiat': 'seo_antiplagiat_menu'});

		var type = 'copywriter';

		var url = document.location.href;
		if (url.indexOf('?') != -1)
		{
			var s = url.substr(url.indexOf('?') + 1);
			var params = s.split('&');
			for (var i =0, j = params.length; i < j; i++)
			{
				var pn = params[i].split('=');
				if (pn.length)
				{
					if (pn[0] == 'type')
					{
						type = pn[1];
						break;
					}
				}
			}
		}


		var i = document.getElementById(type);
		if (i != null)
		{
			i.style.fontWeight = 'bold';
			i.style.color = 'black';
		}

		this.yandex_login_check(function(state)
		{
			this.ya_auth_state = state;
			if (state == YA_AUTH_AUTHORIZED)
			{
				this.statistics_check(function() {

					this.setup_account_info();
				});
			}

			this.region_check(function()
			{
				this.setup_account_info();
				this.service_login_check(function(auth)
				{
					this.setup_account_info();
					if (!auth)
					{
						var auth = new Login_or_Register(function(email, uid)
						{
							self.email = email;
							self.uid = uid;

							self.setup_account_info.call(self);
							self.after_login.call(self, type);
						});

						this.tab_switch('seo_login');
					} else
					{
						this.after_login(type);
					}
				});
			});
		});
	};

	this.after_login = function(type)
	{
		var dd = document.getElementById('description');
		if (dd != null) dd.innerHTML = '';

		var proc = new SEO_Processor(this.region_id, this.region_title, this.ya_request_url, this.ya_auth_state, this.uid);
		proc.yandex_query_callback = function()
		{
			self.processed_yandex_query();
		};

		switch (type)
		{
			default:
			case 'copywriter':
			{
				this.feature = new Copywriter_SEO(proc);
				if (dd != null) dd.innerHTML = chrome.i18n.getMessage('seo_tool_copywriter_description');
				this.tab_switch('seo_copywriter');
				break;
			}

			case 'sp_analyser':
			{
				this.feature = new SitePagesAnalyser_SEO(proc);
				this.tab_switch('seo_sp_analyser');
				break;
			}

			case 'sr_analyser':
			{
				this.feature = new SiteRangeAnalyser_SEO(proc);
				this.tab_switch('seo_sr_analyser');
				break;
			}

			case 'antiplagiat':
			{
				this.feature = new SiteAntiplagiat_SEO(proc);
				this.tab_switch('seo_antiplagiat');
				break;
			}
		}

		var rp = document.getElementById('right_panel');
		if (rp != null) rp.style.display = 'block';
	};

	this.logout = function()
	{
		var ajax = new XMLHttpRequest();
		ajax.open('GET', 'http://' + SERVICE_DOMAIN + '/ul.php?r=' + Math.random(0, 100000), true);
		ajax.overrideMimeType('text/plain');
		ajax.onreadystatechange = function()
		{
			try
			{
				if (this.readyState == 4)
				{
					document.location.reload();
				}
			} catch (e){}
		};
		ajax.send(null);
	};

	this.tab_switch = function(tab_id)
	{
		var tabs = document.getElementById('content');
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

	this.setup_account_info = function()
	{
		var account_title = document.getElementById('seo_site_account_title');
		var logged_in = document.getElementById('seo_account_title');
		var used_queries = document.getElementById('seo_account_queries_count');

		if (logged_in != null)
		{
			if (this.account_title)
			{
				logged_in.innerHTML = chrome.i18n.getMessage('seo_account_logged_in', ['<a href="http://passport.yandex.ru/passport?mode=services">' + this.account_title + '</a>']);
				logged_in.style.display = 'block';
			} else
			{
				logged_in.style.display = 'none';
			}
		}

		if (used_queries != null)
		{
			if (this.account_title)
			{
				var cpt = (this.confirm_phone ? 'seo_account_queries' : 'seo_account_confirmed_queries');
				var help_url = chrome.extension.getURL('help.html') + '?title=help_yandex_confirm_title&content=help_yandex_confirm_desc';
				used_queries.innerHTML = chrome.i18n.getMessage(cpt, [this.queries_processed, this.queries_limit, help_url]);
				used_queries.style.display = 'block';
			} else
			{
				used_queries.style.display = 'none';
			}
		}

		var used_region = document.getElementById('seo_account_region');
		if (used_region != null)
		{
			if (this.region_title)
			{
				used_region.innerHTML = chrome.i18n.getMessage('seo_account_region', ['<a href="http://tune.yandex.ru/region/">' + this.region_title + '</a>']);
				used_region.style.display = 'block';
			} else
			{
				used_region.style.display = 'none';
			}
		}

		var erm = document.getElementById('seo_account_error');
		switch (this.ya_auth_state)
		{
			case YA_AUTH_NOT_AUTHORIZED:
			{
				var help_url = chrome.extension.getURL('help.html') + '?title=help_yandex_auth_title&content=help_yandex_auth_desc';
				erm.innerHTML = chrome.i18n.getMessage('seo_account_auth_no', [help_url]);
				erm.style.display = 'block';
				break;
			}

			case YA_AUTH_AUTHORIZED:
			{
				erm.style.display = 'none';
				break;
			}

			case YA_AUTH_ERROR:
			{
				erm.innerHTML = chrome.i18n.getMessage('seo_account_auth_error');
				erm.style.display = 'block';
				break;
			}

			case YA_AUTH_LICENSY:
			{
				var help_url = chrome.extension.getURL('help.html') + '?title=help_yandex_lic_title&content=help_yandex_lic_desc';
				erm.innerHTML = chrome.i18n.getMessage('seo_account_auth_licensy', [help_url]);
				erm.style.display = 'block';
				break;
			}
		}

		
		if ((this.uid != '') && (this.email != ''))
		{
			if (account_title != null)
			{
				account_title.innerHTML = chrome.i18n.getMessage('seo_site_account_logged_in', [this.email]);
				var logout_link = (document.evaluate('./a[@type="logout"][1]', account_title, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)).singleNodeValue;
				if (logout_link != null) logout_link.addEventListener('click', function(event){ self.logout.call(self, event)}, false);
				account_title.style.display = 'block';
			}
		} else
		{
			if (account_title != null)
			{
				account_title.innerHTML = '';
				account_title.style.display = 'none';
			}
		}

		var ai = document.getElementById('seo_account');
		if (ai != null) ai.style.display = 'block';
	};

	this.service_login_check = function(done_callback)
	{
		var ajax = new XMLHttpRequest();
		var url = 'http://' + SERVICE_DOMAIN + '/check.php?region_id=' + this.region_id + '&region_title=' + encodeURIComponent(this.region_title);
		if (this.ya_auth_state == YA_AUTH_AUTHORIZED) url += '&yandexuid=' + encodeURIComponent(this.account_title);
		url += '&r=' + Math.random(0, 100000);

		ajax.open('GET', url, true);
		ajax.overrideMimeType('text/plain');
		ajax.onreadystatechange = function()
		{
			try
			{
				if (this.readyState == 4)
				{
					if (this.status == 200)
					{
						try
						{
							var json = JSON.parse(this.responseText);

							if ('email' in json) self.email = json['email'];
							if ('uid' in json) self.uid = json['uid'];

						} catch (e) {}

						if (typeof(done_callback) == 'function') done_callback.call(self, ((self.email && self.uid) ? true : false));
					} else
					{
						if (typeof(done_callback) == 'function') done_callback.call(self, false);
					}
				}
			} catch (e){}
		};
		ajax.send(null);
	};

	this.yandex_login_check = function(done_callback)
	{
		this.tab_switch('seo_login_check');
			
		var seo_logincheck = document.getElementById('seo_login_check');
		if (seo_logincheck != null)
		{
			seo_logincheck.innerHTML = chrome.i18n.getMessage('seo_login_txt_checking');

			var ajax = new XMLHttpRequest();
			ajax.open('GET', 'http://xml.yandex.ru/settings.xml', true);
			ajax.setRequestHeader('Accept', 'application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5');
			ajax.overrideMimeType('text/plain');
			ajax.onreadystatechange = function()
			{
				try
				{
					if (this.readyState == 4)
					{
						if (this.status == 200)
						{
							var text = this.responseText.replace(/\r\n|\n/g, ' ');
							var info = text.match(/<title>Яндекс\.XML\s+.*?Настройки<\/title>/i);
							if (info != null)
							{
								var login_arr = text.match(/Lego\.init\({login:\s?'(.*?)',/i);
								if (login_arr != null) self.account_title = login_arr[1].replace(/\\/g, '');

								var rqurl_arr = text.match(/Ваш\sадрес\sдля\sсовершения\sзапроса.*?<input\sclass="text[^\>]*?value="([^\"]+)"\s.*?>/i);
								if (rqurl_arr != null) self.ya_request_url = rqurl_arr[1].replace('&amp;', '&');

								if (typeof(done_callback) == 'function') done_callback.call(self, YA_AUTH_AUTHORIZED);
							} else
							{
								var lic = text.match(/<title>Яндекс\.XML\s+.*?Лицензия\sсервиса\sЯндекс\.XML<\/title>/i);
								if (lic != null)
								{
									if (typeof(done_callback) == 'function') done_callback.call(self, YA_AUTH_LICENSY);
								} else
								{
									if (typeof(done_callback) == 'function') done_callback.call(self, YA_AUTH_NOT_AUTHORIZED);
								}
							}
						} else
						{
							if (typeof(done_callback) == 'function') done_callback.call(self, YA_AUTH_ERROR);
						}
					}
				} catch (e){}
			};
			ajax.send(null);
		}
	};


	this.statistics_check = function(done_callback)
	{
		var ajax = new XMLHttpRequest();
		ajax.open('GET', 'http://xml.yandex.ru/stat.xml', true);
		ajax.overrideMimeType('text/plain');
		ajax.onreadystatechange = function()
		{
			try
			{
				if (this.readyState == 4)
				{
					if (this.status == 200)
					{
						var text = this.responseText.replace(/\r\n|\n/g, ' ');
						var lim_arr = text.match(/<tr><td[^\>]*?><b[^\>]*?>Лимит\sзапросов\sв\sсутки<\/b><\/td><td[^\>]*?><b[^\>]*?>(.*?)<\/b><\/td><\/tr>/i);
						if (lim_arr != null)
						{
							self.queries_limit = parseInt(lim_arr[1]);
							if (isNaN(self.queries_limit)) self.queries_limit = 1000;
						}

						var today_arr = text.match(/<tr><td[^\>]*?><b[^\>]*?>Количество\sзапросов\sсегодня<\/b><\/td><td[^\>]*?><b[^\>]*?>(.*?)<\/b><\/td><\/tr>/i);
						if (today_arr != null)
						{
							self.queries_processed = parseInt(today_arr[1]);
							if (isNaN(self.queries_processed)) self.queries_processed = 0;
						}

						var cpn = text.match(/<a\s+href="http:\/\/phone-passport\.yandex\.ru">подтвердить\sтелефонный\sномер<\/a>/i);
						self.confirm_phone = (cpn != null);
					}

					if (typeof(done_callback) == 'function') done_callback.call(self);
				}
			} catch (e) {}
        	};
		ajax.send(null);
	};


	this.region_check = function(done_callback)
	{
		var ajax = new XMLHttpRequest();
		ajax.open('GET', 'http://tune.yandex.ru/region/', true);
		ajax.overrideMimeType('text/plain');
		ajax.onreadystatechange = function()
		{
			try
			{
				if (this.readyState == 4)
				{
					if (this.status == 200)
					{
						var ct_tx_cb = this.responseText.match(/<input\s[^\>]*?name="region"\s?[^\>]*?>/i);
						if (ct_tx_cb != null)
						{
							var ct_tx = ct_tx_cb[0].match(/value="([^\"]+)"/i);
							if (ct_tx != null) self.region_title = ct_tx[1];
						}

						var ct_id_cb = this.responseText.match(/<input\s[^\>]*?name="region_id"\s?[^\>]*?>/i);
						if (ct_id_cb != null)
						{
							var ct_id = ct_id_cb[0].match(/value="([^\"]+)"/i);
							if (ct_id != null) self.region_id = parseInt(ct_id[1]);
						}
					}

					if (typeof(done_callback) == 'function') done_callback.call(self);
				}
			} catch (e) {}
        	};
		ajax.send(null);
	};

	this.processed_yandex_query = function()
	{
		self.queries_processed ++;
		self.setup_account_info.call(self);
	};
};



window.addEventListener('DOMContentLoaded', function()
{
	var body = document.querySelector('body');
	if (body)
	{
		var i = document.createElement('img');
		i.setAttribute('src', "http://counter.yadro.ru/hit?r" + escape(document.referrer) + ((typeof(screen)=="undefined")?"" : ";s"+screen.width+"*"+screen.height+"*" + (screen.colorDepth?screen.colorDepth:screen.pixelDepth)) + ";u"+escape(document.URL) + ";h"+escape(document.title.substring(0,80)) + ";" +Math.random());
		body.appendChild(i);
	}

	var seo = new SEO();
	seo.init();

}, false);


