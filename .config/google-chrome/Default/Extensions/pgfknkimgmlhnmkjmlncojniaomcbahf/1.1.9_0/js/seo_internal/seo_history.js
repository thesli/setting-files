function SEO_History(type, uid)
{
	const HTU_LIST = 'list';
	const HTU_PUT = 'put';
	const HTU_GET = 'get';
	const HTU_DEL = 'del';

	const HTU_HISTORY = 'history';

	const ERR_SERVER_DOWN = 1;
	const ERR_SERVER_ERROR = 2;
	const ERR_SERVER_RESPONSE = 3;

	var self = this;
	this.type = type;
	this.uid = uid;

	this.history = {};


	this.localization = function()
	{
		localization_simple_load({'history_header':'history_header', 'history_log_header': 'history_log_header','history_title_label': 'history_title_label', 'history_form_save' : 'history_form_save', 'history_item_delete' : 'history_item_delete', 'all_history_link':'history_link_all'});
	};

	this.error_callback = function(type, txt)
	{
		switch (type)
		{
			case ERR_SERVER_DOWN:
			{
				break;
			}

			case ERR_SERVER_ERROR:
			{
				break;
			}

			case ERR_SERVER_RESPONSE:
			{
				break;
			}
		}
	};

	this.error_server_log = function(message)
	{
		// server log - stub
	};

	this.display_list = function()
	{
		var ls = document.getElementById('history_list_div');
		if (ls)
		{
			while (ls.firstChild != null)
			{
				ls.removeChild(ls.firstChild);
			}

			var tmp = document.getElementById('history_teplate_item');

			var history_arr = [];
			for (var i in self.history)
			{
				var it = self.history[i];
				it['id'] = i;
				it['sort_time'] = (new Date(it['time'])).getTime();
				history_arr.push(it);
			}

			history_arr = history_arr.sort(function(a,b){

				return (b['sort_time'] - a['sort_time']);
			});


			history_arr.forEach(function(el,i,a)
			{
				var it = tmp.cloneNode(true);
				it.removeAttribute('id');
				it.setAttribute('hid', el['id']);

				var data = (document.evaluate('./span[@class="history_data"]', it, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)).singleNodeValue;
				if (data != null)
				{
					var d = new Date(el['time']);
					var dt = '';

					dt += d.getHours() + ':';
					var m = d.getMinutes();
					if (m < 10) m = '0' + m;
					dt += m + ' ' + d.getDate() + '.';
					var mm = (d.getMonth() + 1);
					if (mm < 10) mm = '0' + mm;
					dt += mm + '.' + d.getFullYear();
					
					data.textContent = dt;
				}

				var title = (document.evaluate('./a[1]', it, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)).singleNodeValue;
				if (title != null) title.textContent = el['name'];

				ls.appendChild(it);
			});
		}
	};

	this.get_form_data = function()
	{
		// build data from form - stub
		return {};
	};

	this.set_form_data = function(data)
	{
		// set data to fields - stub
		return true;
	};

	this.make_url = function(url_type)
	{
		return 'http://' + SERVICE_DOMAIN + '/history.php?action=' + encodeURIComponent(url_type) + '&uid=' + encodeURIComponent(this.uid) + '&type=' + encodeURIComponent(this.type) + '&r=' + Math.random(0, 100000);
	};

	this.refresh_list = function()
	{
		var ajax = new XMLHttpRequest();
		ajax.open('GET', this.make_url(HTU_LIST), true);
		ajax.overrideMimeType('text/plain');
		ajax.onreadystatechange = function()
		{
			try
			{
				if (this.readyState == 4)
				{
					ajax = null;
					if (this.status == 200)
					{
						try
						{
							var json = JSON.parse(this.responseText);
							if ((!('errors' in json)) && ('list' in json))
							{
								self.history = json.list;
								self.display_list.call(self);
							} else
							{
								self.log_callback.call(self, json.errors);
								return self.error_callback.call(self, ERR_SERVER_ERROR);
							}

                        			} catch (e)
						{
							return self.error_callback.call(self, ERR_SERVER_RESPONSE, this.responseText);
						}
					}
				}
			} catch (e) {}
        	};
		ajax.send(null);
	};

	this.add_entry = function(name, on_err, on_ok)
	{
		var data = this.get_form_data();
		var ajax = new XMLHttpRequest();
		ajax.open('POST', this.make_url(HTU_PUT), true);
		ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		ajax.overrideMimeType('text/plain');
		ajax.onreadystatechange = function()
		{
			try
			{
				if (this.readyState == 4)
				{
					ajax = null;
					if (this.status == 200)
					{
						try
						{
							var json = JSON.parse(this.responseText);
							if (!('errors' in json))
							{
								if (typeof(on_ok) == 'function') on_ok();
								return self.refresh_list.call(self);
							} else
							{
								if (typeof(on_err) == 'function') on_err();
								self.log_callback.call(self, json.errors);
								return self.error_callback.call(self, ERR_SERVER_ERROR);
							}

                        			} catch (e)
						{
							if (typeof(on_err) == 'function') on_err();
							return self.error_callback.call(self, ERR_SERVER_RESPONSE, this.responseText);
						}
					} else
					{
						if (typeof(on_err) == 'function') on_err();
						return self.error_callback.call(self, ERR_SERVER_DOWN);
					}
				}
			} catch (e) {}
		};

		var str = 'name=' + encodeURIComponent(name);
		for (var i in data)
		{
			if (str != '') str += '&';
			str += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]);
		}
		ajax.send(str);
	};

	this.remove_entry = function(id, on_err)
	{
		var ajax = new XMLHttpRequest();
		ajax.open('POST', this.make_url(HTU_DEL), true);
		ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		ajax.overrideMimeType('text/plain');
		ajax.onreadystatechange = function()
		{
			try
			{
				if (this.readyState == 4)
				{
					ajax = null;
					if (this.status == 200)
					{
						try
						{
							var json = JSON.parse(this.responseText);
							if (!('errors' in json))
							{
								return self.refresh_list.call(self);
							} else
							{
								if (typeof(on_err) == 'function') on_err();
								self.log_callback.call(self, json.errors);
								return self.error_callback.call(self, ERR_SERVER_ERROR);
							}

                        			} catch (e)
						{
							if (typeof(on_err) == 'function') on_err();
							return self.error_callback.call(self, ERR_SERVER_RESPONSE, this.responseText);
						}
					} else
					{
						if (typeof(on_err) == 'function') on_err();
						return self.error_callback.call(self, ERR_SERVER_DOWN);
					}
				}
			} catch (e) {}
		};
		var data = encodeURIComponent('id') + '=' + encodeURIComponent(id);
		ajax.send(data);
	};

	this.open_entry = function(id, on_err)
	{
		var ajax = new XMLHttpRequest();
		ajax.open('GET', this.make_url(HTU_GET) + '&id=' + encodeURIComponent(id), true);
		ajax.overrideMimeType('text/plain');
		ajax.onreadystatechange = function()
		{
			try
			{
				if (this.readyState == 4)
				{
					ajax = null;
					if (this.status == 200)
					{
						try
						{
							var json = JSON.parse(this.responseText);
							if (!('errors' in json))
							{
								if (id in self.history) self.history[id]['time'] = (new Date()).toGMTString();
								self.display_list.call(self);

								return self.set_form_data.call(self, json['entity']);
							} else
							{
								if (typeof(on_err) == 'function') on_err();
								self.log_callback.call(self, json.errors);
								return self.error_callback.call(self, ERR_SERVER_ERROR);
							}

                        			} catch (e)
						{
							if (typeof(on_err) == 'function') on_err();
							return self.error_callback.call(self, ERR_SERVER_RESPONSE, this.responseText);
						}
					} else
					{
						if (typeof(on_err) == 'function') on_err();
					}
				}
			} catch (e) {}
        	};
		ajax.send(null);
	};

	this.display_log = function(history)
	{
		var ls = document.getElementById('history_log_list_div');
		if (ls)
		{
			while (ls.firstChild != null)
			{
				ls.removeChild(ls.firstChild);
			}

			var tmp = document.getElementById('history_log_teplate_item');

			var history_arr = [];
			for (var i in history)
			{
				var it = history[i];
				it['id'] = i;
				it['sort_time'] = (new Date(it['time'])).getTime();
				history_arr.push(it);
			}

			history_arr = history_arr.sort(function(a,b){

				return (b['sort_time'] - a['sort_time']);
			});


			history_arr.forEach(function(el,i,a)
			{
				var it = tmp.cloneNode(true);
				it.removeAttribute('id');
				it.setAttribute('hid', el['id']);

				var data = (document.evaluate('./span[@class="history_log_data"]', it, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)).singleNodeValue;
				if (data != null)
				{
					var d = new Date(el['time']);
					var dt = '';

					dt += d.getHours() + ':';
					var m = d.getMinutes();
					if (m < 10) m = '0' + m;
					dt += m + ' ' + d.getDate() + '.';
					var mm = (d.getMonth() + 1);
					if (mm < 10) mm = '0' + mm;
					dt += mm + '.' + d.getFullYear();
					
					data.textContent = dt;
				}

				var title = (document.evaluate('./a[1]', it, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)).singleNodeValue;
				if (title != null) title.textContent = el['name'];

				var url = 'http://' + SERVICE_DOMAIN + '/r.php?s=' + el['id'] + '&uid=' + self.uid;
				title.setAttribute('href', url);
				ls.appendChild(it);
			});
		}
	};

	this.refresh_log = function()
	{
		var ajax = new XMLHttpRequest();
		ajax.open('GET', this.make_url(HTU_HISTORY), true);
		ajax.overrideMimeType('text/plain');
		ajax.onreadystatechange = function()
		{
			try
			{
				if (this.readyState == 4)
				{
					ajax = null;
					if (this.status == 200)
					{
						try
						{
							var json = JSON.parse(this.responseText);
							if ((!('errors' in json)) && ('history' in json))
							{
								self.display_log.call(self, json.history);
							} else
							{
								self.log_callback.call(self, json.errors);
								return self.error_callback.call(self, ERR_SERVER_ERROR);
							}

                        			} catch (e)
						{
							return self.error_callback.call(self, ERR_SERVER_RESPONSE, this.responseText);
						}
					}
				}
			} catch (e) {}
        	};
		ajax.send(null);
	};

	this.run = function()
	{
		this.localization();

		var all_history = document.getElementById('all_history_link');
		if (all_history != null) all_history.setAttribute('href', ('http://' + SERVICE_DOMAIN + '/userlog.php?type=' + encodeURIComponent(this.type) + '&uid=' + encodeURIComponent(this.uid) + '&r=' + Math.random(0, 100000)));

		var ls = document.getElementById('history_list_div');
		if (ls != null) ls.addEventListener('click', function (event) {

			var item = event.target;
			var hid = 0;

			var li = document.evaluate('./ancestor::div[@class="history_item"]', event.target, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			if (li != null) hid = parseInt(li.getAttribute('hid'));

			var status = document.evaluate('./span[2]', li, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			if (item.nodeName.toLowerCase() == 'a')
			{
				if (status != null)
				{
					status.innerHTML = chrome.i18n.getMessage('history_status_opening');
					status.setAttribute('class', 'history_status_ok');
				}

				self.open_entry.call(self, hid, function() {

					if (status != null)
					{
						status.innerHTML = chrome.i18n.getMessage('history_status_error');
						status.setAttribute('class', 'history_status_err');
					}
				});

			} else if (item.nodeName.toLowerCase() == 'img')
			{
				if (status != null)
				{
					status.innerHTML = chrome.i18n.getMessage('history_status_deleting');
					status.setAttribute('class', 'history_status_ok');
				}

				self.remove_entry.call(self, hid, function() {

					if (status != null)
					{
						status.innerHTML = chrome.i18n.getMessage('history_status_error');
						status.setAttribute('class', 'history_status_err');
					}
				});
			}

		}, false);

		var sv = document.getElementById('history_form_save');
		if (sv != null) sv.addEventListener('click', function (event) {

			var title_tb = document.getElementById('history_title');
			if (title_tb != null)
			{
				var title = title_tb.value.replace(/^\s/g, '').replace(/\s$/g, '');
				if (title != '')
				{
					var id_to_remove = 0;
					for (var i in self.history)
					{
						if (self.history[i]['name'] == title)
						{
							id_to_remove = i;
							break;
						}
					}

					var del = false;
					var save = false;
					if (id_to_remove)
					{
						var txt = chrome.i18n.getMessage('history_item_overwrite');
						if (confirm(txt))
						{
							del = true;
							save = true;
						}
					} else
					{
						save = true;
					}


					var save_status = document.getElementById('history_saving_status');
					if (del || save)
					{
						sv.disabled = true; 
						save_status.innerHTML = chrome.i18n.getMessage('history_status_saving');
						save_status.setAttribute('class', 'history_status_ok');
					}

					if (del) self.remove_entry.call(self, id_to_remove);
					if (save)
					{
						self.add_entry.call(self, title, function() {

							// err
							save_status.innerHTML = chrome.i18n.getMessage('history_status_error');
							save_status.setAttribute('class', 'history_status_err');
							sv.disabled = false;

						}, function() {

							// ok
							save_status.setAttribute('class', 'history_status');
							sv.disabled = false;
						});
					}

				} else
				{
					var txt = chrome.i18n.getMessage('history_item_notitle');
					alert(txt);
				}
			}
			
		}, false);

		this.refresh_list();
		this.refresh_log();
	};
};

