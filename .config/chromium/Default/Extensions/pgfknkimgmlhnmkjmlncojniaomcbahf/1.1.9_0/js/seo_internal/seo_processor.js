function SEO_Processor(region_id, region_title, yaq_url, yaq_auth_state, user_id)
{
	const ERR_QUERY_ERROR = 1;

	const ERR_YANDEX_DOWN = 2;
	const ERR_YANDEX_ERROR = 3;
	const ERR_YANDEX_RESPONSE = 4;

	const ERR_GOOGLE_DOWN = 5;
	const ERR_GOOGLE_ERROR = 6;
	const ERR_GOOGLE_RESPONSE = 7;

	const ERR_SERVER_DOWN = 8;
	const ERR_SERVER_ERROR = 9;
	const ERR_SERVER_RESPONSE = 10;

	var self = this;

	this.region_id = region_id;
	this.region_title = region_title;
	this.query_url = yaq_url;
	this.user_id = user_id;
	this.auth_state = yaq_auth_state;

	this.session = '';
	this.tasks = {};
	this.process = {};
	this.ajax = null;

	this.ip_setup_timer = 0;

	this.yandex_query_callback = function()
	{
		// query event stub
	};

	this.google_query_callback = function()
	{
		// query event stub
	};

	this.results_callback = function(html, link)
	{
		// results stub
	};

	this.progress_callback = function(step, of)
	{
		// progress stub
	};

	this.log_callback = function(msg)
	{
		// log stub
	};

	this.after_error_callback = function()
	{
		// autostop stub
	};

	this.error_callback = function(type, txt, step)
	{
		switch (type)
		{
			case ERR_QUERY_ERROR:
			{
				this.log_callback(chrome.i18n.getMessage('seo_work_txt_invalid_query'));
				break;
			}

			case ERR_YANDEX_DOWN:
			{
				this.log_callback(chrome.i18n.getMessage('seo_work_txt_down_ya'));
				break;
			}

			case ERR_YANDEX_ERROR:
			{
				this.log_callback(chrome.i18n.getMessage('seo_work_txt_error_ya', [txt]));
				break;
			}

			case ERR_YANDEX_RESPONSE:
			{
				this.log_callback(chrome.i18n.getMessage('seo_work_txt_invalid_ya'));
				break;
			}

			case ERR_GOOGLE_DOWN:
			{
				this.log_callback(chrome.i18n.getMessage('seo_work_txt_down_gl'));
				break;
			}

			case ERR_GOOGLE_ERROR:
			{
				this.log_callback(chrome.i18n.getMessage('seo_work_txt_error_gl', [txt]));
				break;
			}

			case ERR_GOOGLE_RESPONSE:
			{
				this.log_callback(chrome.i18n.getMessage('seo_work_txt_invalid_gl'));
				break;
			}

			case ERR_SERVER_DOWN:
			{
				this.log_callback(chrome.i18n.getMessage('seo_work_txt_down_tw'));
				break;
			}

			case ERR_SERVER_ERROR:
			{
				this.log_callback(chrome.i18n.getMessage('seo_work_txt_error_tw'));
				break;
			}

			case ERR_SERVER_RESPONSE:
			{
				this.error_server_log(txt, step);
				this.log_callback(chrome.i18n.getMessage('seo_work_txt_invalid_tw'));
				break;
			}
		}
		this.after_error_callback();
	};

	this.error_server_log = function(message, step)
	{
	/*	this.ajax = new XMLHttpRequest();
		this.ajax.open('POST', 'http://' + SERVICE_DOMAIN + '/?work=' + this.work_id + '&error=1', true);
		this.ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		this.ajax.send('step=' + encodeURIComponent(step) + '&message=' + encodeURIComponent(message) + '&type=' + encodeURIComponent(SERVICE_TYPE_COPYWRITER_HELPER));*/
	};

	this.stop = function(user)
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

		this.reset_tasks();
		this.session = '';

		if (user)
		{
			this.log_callback(chrome.i18n.getMessage('seo_work_txt_user_stop'));
			if (this.ip_setup_timer)
			{
				clearTimeout(this.ip_setup_timer);
				this.ip_setup_timer = 0;
			}
		}

		// fuck!
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
/*
		this.yandex_ip_remove(function()
		{
			if (user) this.log_callback(chrome.i18n.getMessage('seo_work_txt_user_stop'));

		}, function()
		{
			// fuck!
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
		}); */
	};

	this.yandex_settings_form = function(text)
	{
		var fields = {};

		text = text.replace(/\r\n|\n/g, ' ');
		var form = text.match(/<form[^\>]*?>(.*?)<\/form>/i);
		if (form != null)
		{
			var inputs = form[1].match(/<input[^\>]*?>/ig);
			if (inputs != null)
			{
				inputs.forEach(function(element, index, array)
				{
					var type = null;
					var value = null;
					var name = null;

					var m = element.match(/^<input[^\>]+type="([^\"]+)"/i);
					if (m != null) type = m[1].toLowerCase();

					m = element.match(/^<input[^\>]+name="([^\"]+)"/i);
					if (m != null) name = m[1];

					m = element.match(/^<input[^\>]+value="([^\"]+)"/i);
					if (m != null) value = m[1].replace('&amp;','&');

					switch (type)
					{
						default:
						case 'text':
						case 'hidden':
						{
							if (name != null)
							{
								if (value != null)
								{
									fields[name] = value;
								} else
								{
									fields[name] = '';
								}
							}
							break;
						}

						case 'checkbox':
						{
							m = element.match(/^<input[^\>]+checked/i);
							if ((m != null) && (name != null))
							{
								if (value != null)
								{
									fields[name] = value;
								} else
								{
									fields[name] = 'on';
								}
							}
							break;
						}
					}
				});
			}

			var selects = form[1].match(/<select[^\>]*?>.*?<\/select>/ig);
			if (selects != null)
			{
				selects.forEach(function(element, index, array)
				{
					var value = null;
					var name = null;

					var m = element.match(/^<select[^\>]*?name="([^\"]+)"[^\>]*?>/i);
					if (m != null) name = m[1];

					m = element.match(/<option[^\>]*?selected>/i);
					if (m != null)
					{
						m = m[0].match(/^<option[^\>]+value="([^\"]+)"/i);
						if (m != null) value=m[1];
					}
	
					if (name != null) fields[name] = value;
				});
			}

		}

		return fields;
	};

	this.yandex_ip_setup = function(done_callback, error_callback)
	{
		if (!this.query_url)
		{
			if (typeof(done_callback) == 'function')
			{
				return done_callback.call(self);
			} else
			{
				return false;
			}
		}

		this.log_callback(chrome.i18n.getMessage('seo_login_txt_apply_ip'));
		this.ajax = new XMLHttpRequest();
		this.ajax.open('GET', 'http://xml.yandex.ru/settings.xml', true);
		this.ajax.overrideMimeType('text/plain');
		this.ajax.onreadystatechange = function()
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
							var f = self.yandex_settings_form.call(self, this.responseText);

							var current_ip = '';
							var registred_ip = ('ip' in f ) ? f['ip'] : '';

							self.ajax.open('GET', 'http://internet.yandex.ru/', true);
							self.ajax.overrideMimeType('text/plain');
							self.ajax.onreadystatechange = function()
							{
								try
								{
									if (this.readyState == 4)
									{
										if (this.status == 200)
										{
											var m = this.responseText.replace(/\r\n|\n/g, ' ').match(/Мой IPv4:\s*?([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/i);
											if (m != null) current_ip = m[1];

											if (current_ip)
											{
												if (current_ip != registred_ip)
												{
													f['ip'] = current_ip;
													var surl = '';
													for (var i in f)
													{
														if (surl) surl+= '&';
														surl+=i+'='+f[i];
													}

													self.ajax.open('GET', 'http://xml.yandex.ru/settings.xml?'+surl, true);
													self.ajax.overrideMimeType('text/plain');
													self.ajax.onreadystatechange = function()
													{
														try
														{
															if (this.readyState == 4)
															{
																if (this.status == 200)
																{
																	var text = this.responseText.replace(/\r\n|\n/g, ' ');
																	if (text.match(/<span\sclass="error-message">Данный\sIP-адрес\sуже\sиспользуется\sдругим\sпользователем\.<\/span>/))
																	{
																		self.log_callback.call(self, chrome.i18n.getMessage('seo_login_txt_apply_ip_error'));
																		if (typeof(error_callback) == 'function') error_callback.call(self);
																	} else
																	{
																		if (typeof(done_callback) == 'function') done_callback.call(self, true);
																	}
																} else
																{
																	self.log_callback.call(self, chrome.i18n.getMessage('seo_login_txt_apply_ip_error'));
																	if (typeof(error_callback) == 'function') error_callback.call(self);
																}
															}
														} catch (e) {}
													};
													self.ajax.send(f);
												} else
												{
													if (typeof(done_callback) == 'function') done_callback.call(self, false);
												}
											} else
											{
												self.log_callback.call(self, chrome.i18n.getMessage('seo_login_txt_apply_ip_error'));
												if (typeof(error_callback) == 'function') error_callback.call(self);
											} 

										} else
										{
											self.log_callback.call(self, chrome.i18n.getMessage('seo_login_txt_apply_ip_error'));
											if (typeof(error_callback) == 'function') error_callback.call(self);
										}
									}

								} catch (e) {}
							}
                                                        self.ajax.send(null);
						}
					} else
					{
						self.log_callback.call(self, chrome.i18n.getMessage('seo_login_txt_apply_ip_error'));
						if (typeof(error_callback) == 'function') error_callback.call(self);
					}
				}

			} catch (e){}
		};
		this.ajax.send(null);
	};


	this.yandex_ip_remove = function(done_callback, error_callback)
	{
		if (!this.query_url)
		{
			if (typeof(done_callback) == 'function')
			{
				return done_callback.call(self);
			} else
			{
				return false;
			}
		}

		this.log_callback(chrome.i18n.getMessage('seo_login_txt_reset_ip'));

		this.ajax = new XMLHttpRequest();
		this.ajax.open('GET', 'http://xml.yandex.ru/settings.xml', true);
		this.ajax.overrideMimeType('text/plain');
		this.ajax.onreadystatechange = function()
		{
			try
			{
				if (this.readyState == 4)
				{
					if (this.status == 200)
					{
						var reset_arr = this.responseText.match(/<a\shref="([^\"]+)"[^\>]*?>Сбросить<\/a>/i);
						if (reset_arr != null)
						{
							self.ajax.open('GET', 'http://xml.yandex.ru/settings.xml' + reset_arr[1].replace('&amp;', '&'), true);
							self.ajax.overrideMimeType('text/plain');
							self.ajax.onreadystatechange = function()
							{
								try
								{
									if (this.readyState == 4)
									{
										if (this.status == 200)
										{
	
											if (typeof(done_callback) == 'function') done_callback.call(self);
										} else
										{
											self.log_callback.call(self, chrome.i18n.getMessage('seo_login_txt_reset_ip_error'));
											if (typeof(error_callback) == 'function') error_callback.call(self);
										}
									}

								} catch (e){}
							};
							self.ajax.send(null);
						} else
						{
							// err
							self.log_callback.call(self, chrome.i18n.getMessage('seo_login_txt_reset_ip_error'));
							if (typeof(error_callback) == 'function') error_callback.call(self);
						}
					} else
					{
						self.log_callback.call(self, chrome.i18n.getMessage('seo_login_txt_reset_ip_error'));
						if (typeof(error_callback) == 'function') error_callback.call(self);
					}
				}

			} catch (e){}
		};
		this.ajax.send(null);
	};

	this.reset_tasks = function()
	{
		for (var i in this.process)
		{
			if (this.process[i]['in_progress'])
			{

				if (('ajax' in this.process[i]) && (this.process[i]['ajax'] != null))
				{
					try
					{
						if (this.process[i]['ajax'].readyState != 4)
						{
							this.process[i]['ajax'].onreadystatechange = null;
							this.process[i]['ajax'].abort();
						}
					} catch (e) {}
	
					delete this.process[i]['ajax'];
					
				}

				if ('wait' in this.process[i]) // may be two fields
				{
					clearTimeout(this.process[i]['wait']);
					delete this.process[i]['wait'];
				}

				this.process[i]['in_progress'] = false;
			}
		}

		this.tasks = {};
		this.process = {};
	};

	this.post_task_results = function(thread, result)
	{
		var task = this.process[thread];
		var ajax = new XMLHttpRequest();
		ajax.open('POST', 'http://' + SERVICE_DOMAIN + '/result.php?session=' + encodeURIComponent(this.session) + '&work=' + task['work'] + '&r=' + Math.random(0, 100000), true);
		ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		ajax.onreadystatechange = function()
		{
			try
			{
				if (this.readyState == 4)
				{
					if (this.status == 200)
					{
						delete self.process[thread]['ajax'];
						delete self.process[thread];

						var json = JSON.parse(this.responseText);
						if (!('error' in json))
						{
							self.tasks[task['work']]['in_progress'] = false;
							self.tasks[task['work']]['done'] = true;

							var completed = 0, total = 0;
		
							for (var i in self.tasks)
							{
								if (('done' in self.tasks[i]) && (self.tasks[i]['done'])) completed ++;
								total++;
							}
							self.progress_callback.call(self, completed, total);

							if (('status' in json) && (json['status'] == 'reset')) this.reset_tasks();
							return self.task_executor.call(self, thread);
						} else
						{
							self.log_callback.call(self, json.error);
							return self.error_callback.call(self, ERR_SERVER_ERROR);
						}
					} else
					{
						if (this.status == 504)
						{
							return self.post_task_results.call(self, thread, result);
						} else
						{
							self.tasks[task['work']]['in_progress'] = false;
							self.tasks[task['work']]['done'] = false;
							return self.error_callback.call(self, ERR_SERVER_ERROR);
						}
					}
        			}
                	} catch (e) {}
		};

		this.process[thread]['ajax'] = ajax;
		ajax.send('result=' + encodeURIComponent(result));
	};


	this.start_task = function(thread)
	{
		// task not prepeared ?
		if (!(thread in this.process)) return false;

		var task = this.process[thread];
		if ('message' in task) this.log_callback(task['message']);

		switch (task['provider'])
		{
			case 'wait':
			{
				// wait for thread
				this.process[thread]['wait'] = setTimeout(function()
				{
					delete self.process[thread]['wait'];
					self.post_task_results.call(self, thread, ''); // notify server after wait

				}, 1000 * task['time']);
				break;
			}

			case 'yandex':
			{
				if (this.query_url != '')
				{
					var ajax = new XMLHttpRequest();
					ajax.open('POST', this.query_url, true);
					ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
					ajax.onreadystatechange = function()
					{
						try
						{
							if (this.readyState == 4)
							{
								delete self.process[thread]['ajax'];
								if (this.status == 200)
								{
									try
									{
										var err_tag = (this.responseXML.evaluate('/yandexsearch/response[1]/error[1]', this.responseXML.documentElement, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)).singleNodeValue;
										if ((err_tag != null) && err_tag.hasAttribute('code') && (err_tag.getAttribute('code') != '0'))
										{
											return self.error_callback.call(self, ERR_YANDEX_ERROR, task['query']);
										}
				
										var resp = new XMLSerializer().serializeToString(this.responseXML);
										self.post_task_results.call(self, thread, resp);

									} catch (e)
									{
										return self.error_callback.call(self, ERR_YANDEX_RESPONSE);
									}
								} else
								{
									return self.error_callback.call(self, ERR_YANDEX_DOWN);
								}
							}
						} catch (e) {}
					};

					this.process[thread]['ajax'] = ajax;
					var xml = '<?xml version="1.0" encoding="UTF-8"?><request><query>' + task['query'] + '</query><page>' + task['page'] + '</page><groupings><groupby attr="d" mode="deep" groups-on-page="100"  docs-in-group="1" /></groupings></request>';
					ajax.send('text=' + encodeURIComponent(xml));
					this.yandex_query_callback();
				} else
				{
					this.error_callback(ERR_YANDEX_DOWN);
				}
				break;
			}

			case 'google_api':
			{
				var start = task['page'] * 8;
				var url = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&hl=ru&q=' + encodeURIComponent(task['query']) + '&rsz=large&filter=0' + ((start != 0) ? '&start=' + start : '');

				var ajax = new XMLHttpRequest();
				ajax.open('GET', url, true);
				ajax.overrideMimeType('text/plain');
				ajax.onreadystatechange = function()
				{
					try
					{
						if (this.readyState == 4)
						{
							delete self.process[thread]['ajax'];
							if (this.status == 200)
							{
								self.post_task_results.call(self, thread, this.responseText);
							} else
							{
								return self.error_callback.call(self, ERR_GOOGLE_DOWN);
							}
						}
					} catch (e) {}
				};

				this.process[thread]['ajax'] = ajax;
				ajax.send(null);

				this.google_query_callback();
				break;
			}

			case 'google_html':
			{
				var start = task['page'] * 100;
				var url = 'https://www.google.ru/search?as_q=' + encodeURIComponent(task['query']) + '&hl=ru&num=100&ie=utf-8&oe=utf-8&as_qdr=all&as_occt=any&filter=0' + ((start != 0) ? '&start=' + start : '');

				var ajax = new XMLHttpRequest();
				ajax.open('GET', url, true);
				ajax.overrideMimeType('text/plain');
				ajax.onreadystatechange = function()
				{
					try
					{
						if (this.readyState == 4)
						{
							delete self.process[thread]['ajax'];
							if (this.status == 200)
							{
								self.post_task_results.call(self, thread, this.responseText);
							} else
							{
								return self.error_callback.call(self, ERR_GOOGLE_DOWN);
							}
						}
					} catch (e) {}
				};

				this.process[thread]['ajax'] = ajax;
				ajax.send(null);

				this.google_query_callback();
				break;
			}

			default:
			{
				return false;
			}
		}
		return true;
	};

	this.task_executor = function(thread)
	{
		var new_task = false;

		for (var i in this.tasks)
		{
			if ((this.tasks[i]['in_progress'] != true) && (this.tasks[i]['done'] != true))
			{
				var t = this.tasks[i]['thread'];
				if (!(t in this.process))
				{
					this.tasks[i]['in_progress'] = true;
					this.tasks[i]['done'] = false;
					this.process[t] = this.tasks[i];
					this.start_task(t);
					new_task = true;
				}
			}
		}

		if (!new_task)
		{
			var url = 'http://' + SERVICE_DOMAIN + '/task.php?session=' + encodeURIComponent(this.session);
			if (thread != null) url += '&thread=' + encodeURIComponent(thread);
			url += '&r=' + Math.random(0, 100000);

			var ajax = new XMLHttpRequest();
			ajax.open('GET', url, true);
			ajax.overrideMimeType('text/plain');
			ajax.onreadystatechange = function()
			{
				try
				{
					if (this.readyState == 4)
					{
						if (thread != null) 
						{
							self.process[thread]['ajax'] = null;
							delete self.process[thread];
						} else
						{
							self.ajax = null;
						}

						if (this.status == 200)
						{
							try
							{
								var json = JSON.parse(this.responseText);
								if ((!('error' in json)) && ('status' in json))
								{
									switch (json['status'])
									{
										// finish thread (only for thread)
										case 'done':
										{
											// thread already removed, do nothing loop

											var has_tasks = false;
											for (var i in self.tasks)
											{
												if ((self.tasks[i]['in_progress'] != true) && (self.tasks[i]['done'] != true))
												{
													has_tasks = true;
													break;
												}
											}

											if (!has_tasks)
											{
												var has_processes = false;
												for (var i in self.process)
												{
													has_processes = true;
													break;
												}

												if (!has_processes)
												{
													var ajax = new XMLHttpRequest();
													ajax.open('GET', 'http://' + SERVICE_DOMAIN + '/show.php?session=' + encodeURIComponent(self.session) + '&r=' + Math.random(0, 100000), true);
													ajax.overrideMimeType('text/plain');
													ajax.onreadystatechange = function()
													{
														try
														{
															if (this.readyState == 4)
															{
																self.ajax = null;
																if (this.status == 200)
																{
																	try
																	{
																		var json = JSON.parse(this.responseText);
																		if (!('error' in json))
																		{
																			if (('content' in json) && ('link' in json))
																			{
																			//	var dis_res = function()
																			//	{
																				return self.results_callback.call(self, json['content'], json['link'] + '&uid=' + this.user_id);
																			//	};
																				// self.yandex_ip_remove.call(self, dis_res, dis_res);
																			} else
																			{
																				return self.error_callback.call(self, ERR_SERVER_RESPONSE, this.responseText);
																			}
																		} else
																		{
																			self.log_callback.call(self, json.error);
																			return self.error_callback.call(self, ERR_SERVER_RESPONSE, 'Server report error');
																		}

																	} catch (e)
																	{
																		return self.error_callback.call(self, ERR_SERVER_RESPONSE, this.responseText, 0);
																	}
																} else
																{
																	return self.error_callback.call(self, ERR_SERVER_DOWN);
																}
															}
														} catch (e) {}
													};

													self.ajax = ajax;
													ajax.send(null);
												}
											}
											break;
										}

										// new tasks for thread or all threads
										case 'tasks':
										{
											if ('tasks' in json)
											{
												for (var i in json['tasks'])
												{
													if (!(i in self.tasks))
													{
														var task = json['tasks'][i];
														task['in_progress'] = false;
														task['done'] = false;
														self.tasks[i] = task;
													} else
													{
														if (self.tasks[i]['done'])
														{
															self.tasks[i]['in_progress'] = false;
															self.tasks[i]['done'] = false;
														}
													}
												}
												self.task_executor.call(self, thread);
											}
											break;
										}

										default:
										{
											return self.error_callback.call(self, ERR_SERVER_RESPONSE, 'Unknown tasks status - ' + json['type']);
										}
									}
								} else
								{
									self.log_callback.call(self, json.error);
									return self.error_callback.call(self, ERR_SERVER_RESPONSE, 'Server report error');
								}
	
							} catch (e)
							{
								return self.error_callback.call(self, ERR_SERVER_RESPONSE, this.responseText, 0);
							}
						} else
						{
							return self.error_callback.call(self, ERR_SERVER_DOWN);
						}
					}
				} catch (e) {}
			};

			// started by thread ?
			if (thread != null) 
			{
				this.process[thread] = {'ajax': ajax, 'in_progress': true, 'done' : false};
			} else
			{
				this.ajax = ajax;
			}

			ajax.send(null); // start download tasks
		}
	};

	this.run = function(query, params)
	{
		this.progress_callback(0, 1);
		this.session = '';
		this.tasks = {};
		this.process = {};

		this.yandex_ip_setup(function(need_wait)
		{
			if (need_wait)
			{
				self.log_callback.call(self, chrome.i18n.getMessage('seo_login_txt_apply_ip_wait'));
				self.ip_setup_timer = setTimeout(function()
				{
					self.ip_setup_timer = 0;
					self.run_internal.call(self, query, params);
	
				}, 120000);
			} else
			{
				self.run_internal.call(self, query, params);
			}

		}, function()
		{
			this.stop(false);
		});
	};

	this.run_internal = function(query, params)
	{
		this.ajax = new XMLHttpRequest();
		this.ajax.open('POST', 'http://' + SERVICE_DOMAIN + '/new.php?region_id=' + self.region_id + '&region_title=' + encodeURIComponent(self.region_title) + '&r=' + Math.random(0, 100000), true);
		this.ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		this.ajax.overrideMimeType('text/plain');
		this.ajax.onreadystatechange = function()
		{
			try
			{
				if (this.readyState == 4)
				{
					self.ajax = null;
					if (this.status == 200)
					{
						try
						{
							var json = JSON.parse(this.responseText);
							if ((!('error' in json)) && ('session' in json))
							{
								self.session = json.session;
								self.task_executor.call(self, null);
							} else
							{
								self.log_callback.call(self, json.error);
								return self.error_callback.call(self, ERR_QUERY_ERROR);
							}
	        				} catch (e)
						{
							return self.error_callback.call(self, ERR_SERVER_RESPONSE, this.responseText, 0);
						}
					} else
					{
						return self.error_callback.call(self, ERR_SERVER_DOWN);
					}
				}
			} catch (e) {}
		};

		data = 'uid=' + encodeURIComponent(this.user_id) + '&query=' + encodeURIComponent(query);
		if ((params != undefined) && (params != null) && (typeof(params) == 'object'))
		{
			for (var i in params)
			{
				if (data != '') data += '&';
				data+= encodeURIComponent(i) + '=' + encodeURIComponent(params[i]);
			}
		}

		this.ajax.send(data);
	};

};
