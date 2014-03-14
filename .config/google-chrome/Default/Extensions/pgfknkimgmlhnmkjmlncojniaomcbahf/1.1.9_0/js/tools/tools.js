function localization_simple_load(fields)
{
	if (typeof(fields) == 'object')
	{
		for (var i in fields)
		{
			var el = document.getElementById(i);
			if (el != null)
			{
				var txt = chrome.i18n.getMessage(fields[i]);
				if ((txt) && (txt != undefined))
				{
					switch (el.nodeName.toLowerCase())
					{
						case 'input':
						{
							el.setAttribute('value', txt);
							break;
						}
						case 'img':
						{
							el.setAttribute('title', txt);
							break;
						}

						default:
						{
							el.innerHTML = txt;
							break;
						}
					}
				}
			}
		}
	}
}


function registry(baranch)
{
	var self = this;

	this.listeners = [];
	this.branch = (baranch != undefined) ? baranch : '';
	this.defaults = registry_defaults;

	this.getValue = function(key)
	{
		var bk = this.branch + key;
		if (bk in localStorage)
		{
			return localStorage[bk];
		} else
		{
			if (bk in this.defaults)
			{
				return this.defaults[bk];
			} else
			{
				throw 'Key ' + bk + ' is not exists';
			}
		}
	};

	this.setValue = function(key, value)
	{
		var bk = this.branch + key;

		var oldval = localStorage[bk];
		localStorage[bk] = value;

		// fire for current window (other windows fired automaticaliy)
		var event = document.createEvent('HTMLEvents');
		event.initEvent('storage', false, false);
		event.key = bk;
		event.oldValue = (oldval != null) ? oldval.toString() : null;
		event.newValue = (value != null) ? value.toString() : null;
		window.dispatchEvent(event);
	};

	this.getCharPref = function(key)
	{
		return this.getValue(key);
	};

	this.getIntPref = function(key)
	{
		var v = parseInt(this.getValue(key));
		if (!isNaN(v))
		{
			return v;
		} else
		{
			throw 'Key ' + this.branch + key + ' is not integer';
		}
	};

	this.getBoolPref = function(key)
	{
		var v = this.getValue(key);
		switch (typeof(v))
		{
			case 'boolean':
			{
				return v;
			}

			case 'number':
			{
				return (v != 0);
			}

			case 'string':
			{
				return (v.toLowerCase() != 'false');
			}

			default:
			{
				throw 'Key ' + this.branch + key + ' is not bool';
			}
		}
	};


	this.setCharPref = function(key, value)
	{
		return this.setValue(key, value);
	};

	this.setIntPref = function(key, value)
	{
		var v = parseInt(value);
		if (!isNaN(v))
		{
			this.setValue(key, v);
		} else
		{
			throw 'Value is not integer';
		}
	};

	this.setBoolPref = function(key, value)
	{
		if (typeof(value) != 'boolean')
		{
			return this.setValue(key, ((value.toLowerCase() != 'false') && (value != '0') && (value != 0)) ? true : false);
		} else
		{
			return this.setValue(key, value);
		}
	};

	this.getBranch = function(branch)
	{
		return new registry(this.baranch + baranch);
	};

	this.addObserver = function(domain, callback, capture)
	{
		if (typeof (callback) == 'function')
		{
			var ei = {domain:domain, callback:callback, event_callback: function(e)
			{
				return self.changeEvent.call(self, arguments.callee, e);
			}};

			this.listeners.push(ei);
			window.addEventListener('storage', ei.event_callback, capture);

			return true;
		} else
		{
			return false;
		}
	};

	this.removeObserver = function(domain, struct, capture)
	{
		var result = false;
		var stop = {};

		try
		{
			this.listeners.forEach(function(e,i,a)
			{
				if ((e != null) && (e.event_callback == struct) && (e.domain == domain))
				{
					window.removeEventListener('storage', el.event_callback, capture);
					self.listeners[i].callback = null;
					self.listeners[i].event_callback = null;
					self.listeners[i] = null;
					result = true;
					throw stop;
				}
			});

		} catch(err)
		{
			if (err !== stop) throw err;
		}
		return result;
	};

	this.changeEvent = function(event_callback, event)
	{
		var result = event.returnValue;
		var stop = {};
		try
		{
			this.listeners.forEach(function(e,i,a)
			{
				if ((e != null) && (e.event_callback === event_callback))
				{
					var key = event.key;
					var bl = self.branch.length + self.listeners[i].domain.length;
					if (bl != 0)
					{
						var a = self.branch + self.listeners[i].domain;
						if (key.indexOf(self.branch + self.listeners[i].domain) == 0) result = e.callback(key.substr(bl), event.oldValue, event.newValue); 
					} else
					{
						result = e.callback(key, event.oldValue, event.newValue); 
					}
					throw stop;
				}
			});

		} catch(err)
		{
			if (err !== stop) throw err;
		}
		return result;
	};
}


function preferences()
{
	var self = this;
	this.preferences = {};

	this.get_preferences_items = function()
	{
		var prefs = {};

		var prs = document.evaluate('//preferences/preference[@id]', document.documentElement, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (prs.snapshotLength != 0)
		{
			for (var i = 0, j = prs.snapshotLength; i<j; i++)
			{
				var it = prs.snapshotItem(i);
				if (it) prefs[it.getAttribute('id')] = it;
			}
		}

		return prefs;
	};

	this.init_values = function()
	{
		var is = document.evaluate('//*[@preference]', document.documentElement, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (is.snapshotLength != 0)
		{
			for (var i = 0, j = is.snapshotLength; i<j; i++)
			{
				var it = is.snapshotItem(i);
				if (it.getAttribute('preference') in this.preferences) this.load_item_value(it);
			}
		}
	};

	this.load_item_value = function(i)
	{
		var preference = this.preferences[i.getAttribute('preference')];

		var value = undefined;
		var key = preference.getAttribute('name');
		try
		{
			switch (preference.getAttribute('type').toLowerCase())
			{
				case 'int':
				{
					value = this.registry.getIntPref(key);
					break;
				}
	
				case 'bool':
				{
					value = (preference.hasAttribute('inverted') && (preference.getAttribute('inverted').toLowerCase() == 'true')) ? !this.registry.getBoolPref(key) : this.registry.getBoolPref(key);
					break;
				}
	
				case 'string':
				{
					value = this.registry.getCharPref(key);
					break;
				}
			}

		} catch (e) {}

		if (value != undefined)
		{
			switch (i.nodeName.toLowerCase())
			{
				case 'input':
				{
					switch(i.getAttribute('type').toLowerCase())
					{
						case 'button':
						case 'hidden':
						case 'text':
						{
							i.value = value;
							break;
						}

						case 'radio':
						{
							if (i.getAttribute('value') == value.toString())
							{
								i.setAttribute('checked', 'checked');

							} else if (i.hasAttribute('checked')) i.removeAttribute('checked');
							break;
						}

						case 'checkbox':
						{
							if (value)
							{
								i.setAttribute('checked', 'checked');

							} else
							{
								i.removeAttribute('checked');
							}
							break;
						}
	
					}
					break;
				}

				case 'select':
				{
					i.value = value;
					break;
				}

				case 'textarea':
				{
					i.textContent = value;
					break;
				}
			}
		}
	};

	this.registry = new registry();
	this.preferences = this.get_preferences_items();

	try
	{
		this.init_values();

	} catch (e) {};

	var bodies = document.getElementsByTagName('body');
	if (bodies.length)
	{
		bodies[0].addEventListener('change', function(event)
		{
			var it = event.target;
			if (it.hasAttribute('preference') && (it.getAttribute('preference') in self.preferences))
			{
				var new_value = undefined;
				switch (it.nodeName.toLowerCase())
				{
					case 'textarea':
					{
						new_value = it.value;
						break;
					}

					case 'select':
					{
						new_value = it.value;
						break;
					}

					case 'input':
					default:
					{
						switch (it.getAttribute('type').toLowerCase())
						{
							case 'checkbox':
							{
								new_value = it.checked;
								break;
							}

							default:
							{
								new_value = it.value;
								break;
							}
						}
						break;
					}
				}

				var pref = self.preferences[it.getAttribute('preference')];
				var key = pref.getAttribute('name');
				switch (pref.getAttribute('type').toString().toLowerCase())
				{
					case 'int':
					{
						self.registry.setIntPref(key, new_value);
						break;
					}

					case 'bool':
					{
						self.registry.setBoolPref(key, ((pref.hasAttribute('inverted') && (pref.getAttribute('inverted').toLowerCase() == 'true')) ? !new_value : new_value));
						break;
					}

					case 'string':
					{
						self.registry.setCharPref(key, new_value);
						break;
					}
				}
			}

		}, false);
	}

	this.registry.addObserver('', function(key, old_val, new_val)
	{
		for (var i in self.preferences)
		{
			if (self.preferences[i].getAttribute('name') == key)
			{
				var is = document.evaluate('//*[@preference="' + i + '"]', document.documentElement, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				if (is.snapshotLength != 0)
				{
					for (var ii = 0, j = is.snapshotLength; ii<j; ii++)
					{
						self.load_item_value.call(self, is.snapshotItem(ii));
					}
				}
				break;
			}
		}

	}, false);
}
