function Login_or_Register(success_callback)
{
	var self = this;

	this.localization = function()
	{
		var title = chrome.i18n.getMessage('seo_page_title');
		document.title = title;
		localization_simple_load({'page_title':'seo_page_header', 'page_title_seo': 'seo_page_login'});
		localization_simple_load({'txt_seo_login_email':'seo_page_login_email', 'txt_seo_login_password': 'seo_page_login_password', 'seo_login_submit' : 'seo_page_login_submit'});
		localization_simple_load({'seo_login_try' : 'seo_page_login_try'});
		localization_simple_load({'seo_login_error_title' : 'seo_page_login_error', 'seo_login_back': 'seo_page_login_back', 'seo_login_forgot' : 'seo_page_forgot_password_button'});
		localization_simple_load({'txt_seo_login_confirm' : 'seo_page_login_confirm_code', 'seo_login_confirm_submit': 'seo_page_login_confirm_button'});
		localization_simple_load({'seo_confirm_try' : 'seo_page_login_confirm_try'});
		localization_simple_load({'seo_confirm_error_title' : 'seo_page_login_confirm_error', 'seo_confirm_back' : 'seo_page_login_confirm_back', 'seo_login_confirm_back' : 'seo_page_login_back2form'});
		localization_simple_load({'txt_seo_password_forgot_email' : 'seo_page_forgot_password_email', 'seo_password_forgot_submit': 'seo_page_forgot_password_submit'});
		localization_simple_load({'seo_password_forgot_try_email' : 'seo_page_forgot_verify_email'});
		localization_simple_load({'txt_seo_password_change_code' : 'seo_page_change_password_confirm', 'txt_seo_password_change_new_pass' : 'seo_page_change_password_new', 'seo_password_change_submit' : 'seo_page_change_password_submit'});
		localization_simple_load({'seo_password_change_try' : 'seo_page_change_password_try'});
	};

	this.init = function()
	{
		var sls = document.getElementById('seo_login_submit');
		if (sls != null) sls.addEventListener('click', function(event)
		{
			self.tab_switch.call(self, 'seo_login_try');
			self.submit_registration_data.call(self, event)

		}, false);

		var slb = document.getElementById('seo_login_back');
		if (slb != null) slb.addEventListener('click', function(event)
		{
			self.seo_login_module_ready.call(self);

		}, false);

		var slf = document.getElementById('seo_login_forgot');
		if (slf != null) slf.addEventListener('click', function(event)
		{
			localization_simple_load({'page_title_seo': 'seo_page_change_password'});
			self.tab_switch.call(self, 'seo_password_forgot_form');

		}, false);

		var slcs = document.getElementById('seo_login_confirm_submit');
		if (slcs != null) slcs.addEventListener('click', function(event)
		{
			self.tab_switch.call(self, 'seo_confirm_try');
			self.submit_registration_confirm.call(self);

		}, false);

		var scb = document.getElementById('seo_confirm_back');
		if (scb != null) scb.addEventListener('click', function(event)
		{
			var confirm = document.getElementById('seo_login_confirm');
			if (confirm != null) confirm.value = '';
			self.tab_switch.call(self, 'seo_register_confirm');

		}, false);

		var slcb = document.getElementById('seo_login_confirm_back');
		if (slcb != null) slcb.addEventListener('click', function(event)
		{
			self.seo_login_module_ready.call(self);
		}, false);

		var spfs = document.getElementById('seo_password_forgot_submit');
		if (spfs != null) spfs.addEventListener('click', function(event)
		{
			self.tab_switch.call(self, 'seo_password_forgot_try_email');
			self.submit_forgot_form.call(self);
		}, false);

		var spcs = document.getElementById('seo_password_change_submit');
		if (spcs != null) spcs.addEventListener('click', function(event)
		{
			self.tab_switch.call(self, 'seo_password_change_try');
			self.submit_change_form.call(self);
		}, false);


		this.seo_login_module_ready();
	};

	this.seo_login_module_ready = function()
	{
		localization_simple_load({'page_title_seo': 'seo_page_login'});
		var login = document.getElementById('seo_login_email');
		if (login != null) login.value = '';

		var password = document.getElementById('seo_login_password');
		if (password != null) password.value = '';

		var confirm = document.getElementById('seo_login_confirm');
		if (confirm != null) confirm.value = '';


		this.tab_switch('seo_login_form');
	};

	this.tab_switch = function(tab_id)
	{
		var tabs = document.getElementById('seo_login');
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

	this.submit_registration_data = function()
	{
		var login = document.getElementById('seo_login_email');
		var password = document.getElementById('seo_login_password');

		var login_txt = (login != null) ? login.value : '';
		var password_txt = (password != null) ? password.value : '';

		var ajax = new XMLHttpRequest();
		ajax.open('POST', 'http://' + SERVICE_DOMAIN + '/plogin.php?r=' + Math.random(0, 100000), true);
		ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
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

							if (('email' in json) && ('uid' in json))
							{
								if (typeof(success_callback) == 'function') return success_callback(json['email'], json['uid']);
							} else
							{
								if ('error' in json)
								{
									var ed = document.getElementById('seo_login_error_msg');
									if (ed != null) ed.innerHTML = json['error'];
        								self.tab_switch.call(self, 'seo_login_error');
									return false;
								}

								if ('msg' in json)
								{       
									var rm = document.getElementById('seo_login_confirm_msg');
									if (rm != null) rm.innerHTML = json['msg'];
									self.tab_switch.call(self, 'seo_register_confirm');
									return false;
								}
							}

						} catch (e) {}
					}
					self.tab_switch.call(self, 'seo_login_error');
				}
			} catch (e){}
		
		};
		ajax.send('login=' + encodeURIComponent(login_txt) + '&pass=' + encodeURIComponent(password_txt));
	};

	this.submit_registration_confirm = function()
	{
		var confirm = document.getElementById('seo_login_confirm');
		var confirm_txt = (confirm != null) ? confirm.value : '';

		var ajax = new XMLHttpRequest();
		ajax.open('POST', 'http://' + SERVICE_DOMAIN + '/confirm.php?r=' + Math.random(0, 100000), true);
		ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
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

							if (('email' in json) && ('uid' in json))
							{
								if (typeof(success_callback) == 'function') return success_callback(json['email'], json['uid']);
							} else
							{
								if ('error' in json)
								{
									var ed = document.getElementById('seo_confirm_error_msg');
									if (ed != null) ed.innerHTML = json['error'];
        								self.tab_switch.call(self, 'seo_confirm_error');
									return false;
								}
							}

						} catch (e) {}
					}
					self.tab_switch.call(self, 'seo_confirm_error');
				}
			} catch (e){}
		
		};
		ajax.send('c=' + encodeURIComponent(confirm_txt));
	};

	this.submit_forgot_form = function()
	{
		var email = document.getElementById('seo_password_forgot_email');
		var email_txt = (email != null) ? email.value : '';

		var ajax = new XMLHttpRequest();
		ajax.open('POST', 'http://' + SERVICE_DOMAIN + '/pr.php?r=' + Math.random(0, 100000), true);
		ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
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

							if ('error' in json)
							{
								var ed = document.getElementById('seo_password_forgot_form_error');
								if (ed != null) ed.innerHTML = json['error'];
       								self.tab_switch.call(self, 'seo_password_forgot_form');
								return false;
							}

							if ('msg' in json)
							{       
								var rm = document.getElementById('seo_password_change_form_error');
								if (rm != null) rm.innerHTML = json['msg'];
								self.tab_switch.call(self, 'seo_password_change_form');
								return false;
							}

						} catch (e) {}
					}

					var ed = document.getElementById('seo_password_forgot_form_error');
					if (ed != null) ed.innerHTML = 'Unknown error';
					self.tab_switch.call(self, 'seo_password_forgot_form');

				}
			} catch (e){}
		
		};
		ajax.send('a=remind&email=' + encodeURIComponent(email_txt));
	};

	this.submit_change_form = function()
	{
		var confirm = document.getElementById('seo_password_change_code');
		var confirm_txt = (confirm != null) ? confirm.value : '';

		var pass = document.getElementById('seo_password_change_new_pass');
		var pass_txt = (pass != null) ? pass.value : '';


		var ajax = new XMLHttpRequest();
		ajax.open('POST', 'http://' + SERVICE_DOMAIN + '/pr.php?r=' + Math.random(0, 100000), true);
		ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
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

							if (('email' in json) && ('uid' in json))
							{
								if (typeof(success_callback) == 'function') return success_callback(json['email'], json['uid']);
							} else
							{
								if ('error' in json)
								{
									var ed = document.getElementById('seo_password_change_form_error');
									if (ed != null) ed.innerHTML = json['error'];
        								self.tab_switch.call(self, 'seo_password_change_form');
									return false;
								}
							}

						} catch (e) {}
					}

					var ed = document.getElementById('seo_password_change_form_error');
					if (ed != null) ed.innerHTML = 'Unknown error';
					self.tab_switch.call(self, 'seo_password_change_form');
				}
			} catch (e){}
		
		};
		ajax.send('a=change&c=' + encodeURIComponent(confirm_txt) + '&password=' + encodeURIComponent(pass_txt));
	};

	this.localization();
	this.init();
};