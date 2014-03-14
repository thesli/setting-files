// Becareful because this common.js file is loaded on websites for content_scripts and we don't want errors here

var ONE_MINUTE = 60000;
var ONE_HOUR = ONE_MINUTE * 60;
var ONE_DAY = ONE_HOUR * 24;
var origConsoleLog = null;
var origConsoleWarn = null;
var origConsoleDebug = null;
Calendar = function () {};

if (typeof(jQuery) != "undefined") {
	jQuery.fn.exists = function(){return jQuery(this).length>0;}
}

function analytics() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = '/js/analytics.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	$(document).ready(function() {
		$("a, input, button").live("click", function() {
			var id = $(this).attr("ga");
			var label = null;
			if (id != "IGNORE") {
				if (!id) {
					id = $(this).attr("id");
				}
				if (!id) {
					id = $(this).attr("snoozeInMinutes");
					if (id) {
						label = "in minutes: " + id; 
						id = "snooze";
					}
					if (!id) {
						id = $(this).attr("snoozeInDays");
						if (id) {
							label = "in days: " + id; 
							id = "snooze";
						}
					}
					if (!id) {
						id = $(this).attr("msg");
					}
					if (!id) {
						id = $(this).attr("msgTitle");
					}
					if (!id) {
						id = $(this).attr("href");
						// don't log # so dismiss it
						if (id == "#") {
							id = null;
						}
					}
					if (id) {
						id = id.replace(/javascript\:/, "");
						// only semicolon so remove it and keep finding other ids
						if (id == ";") {
							id = "";
						}
					}
					if (!id) {
						id = $(this).parent().attr("id");
					}		
				}
				if ($(this).attr("type") != "text") {
					if ($(this).attr("type") == "checkbox") {
						if (this.checked) {
							label = id + "_on";
						} else {
							label = id + "_off";
						}
					}
					var category = $(this).parents("*[gaCategory]");
					var action = null;
					// if gaCategory specified
					if (category.length != 0) {
						category = category.attr("gaCategory");
						action = id;
					} else {
						category = id;
						action = "click";
					}
					
					if (label != null) {
						sendGA(['_trackEvent', category, action, label]);
					} else {
						sendGA(['_trackEvent', category, action]);
					}
				}
			}
		});
	});
}

function sendGA(o, ls) {
	var gaSendingOffName = "ga_sending_off";
	var gaSendingOff = false;
	if (ls) {
		gaSendingOff = ls[gaSendingOffName];
	} else if (localStorage) {
		gaSendingOff = localStorage[gaSendingOffName];
	}
	chrome.extension.getBackgroundPage().console.log(o);
	if (!gaSendingOff) {
		// macbook users apparently getting _gaq undefined
		if (typeof _gaq != "undefined") {
			_gaq.push(o);
		}
	}		
}

function getPaypalLC() {
	var locale = window.navigator.language;
	var lang = null;
	if (locale) {
		if (locale.match(/zh/i)) {
			lang = "CN"; 
		} else if (locale.match(/_GB/i)) {
			lang = "GB";
		} else if (locale.match(/ja/i)) {
			lang = "JP";
		} else {
			lang = locale.substring(0,2);
		}
		return lang;
	}
}

function loadCalendarJS(lang) {
	document.write(unescape("%3Cscript src='js/calendar/calendar-" + lang + ".js' type='text/javascript'%3E%3C/script%3E"));
}

if (document.location.href.indexOf("chrome-extension://") != -1) {
	// Console...
	origConsoleLog = console.log;
	origConsoleWarn = console.warn;
	origConsoleDebug = console.debug;
	initConsole();
	
	var lang = "en";			
	if (window.navigator.language) {
		lang = window.navigator.language.substring(0, 2);
	}
	
	//document.write(unescape("%3Cscript src='js/calendar/calendar-" + lang + ".js' type='text/javascript'%3E%3C/script%3E"));

	if (typeof($) != "undefined") {
		$(document).ready(function() {
			if (document.location.href.indexOf("gcal.html") == -1) {
				// For some reason including scripts for popup window slows down popup window reaction time, so only found that settimeout would work
				if (document.location.href.indexOf("popup.html") != -1) {
					setTimeout(function() {
						analytics();
					}, 1);
				} else {
					analytics();
				}				
				//initCalendarNames();
				initMessages();
				initPrefAttributes();
				initOptions();
				
				/*
				$("#donate").click(function() {
					localStorage["donationClicked"] = "true";
				});
				*/
			}
		});
	}
}

function parseURL(url) {
    var a =  document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':',''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function(){
            var ret = {},
                seg = a.search.replace(/^\?/,'').split('&'),
                len = seg.length, i = 0, s;
            for (;i<len;i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
        hash: a.hash.replace('#',''),
        path: a.pathname.replace(/^([^\/])/,'/$1'),
        relative: (a.href.match(/tp:\/\/[^\/]+(.+)/) || [,''])[1],
        segments: a.pathname.replace(/^\//,'').split('/')
    };
}

function log(str, prefName) {
	if (pref(prefName)) {
		console.log(str);
	}
}

function getProtocol() {
	return pref("ssl2", true) ? "https" : "http";
}

function initOptions() {
	$("*[opensOptions]").each(function(index) {
		var optionsID = $(this).attr("opensOptions");
		// Show or hide options at startup
		var options = $("#" + optionsID);
		options.toggle(this.checked);
		// Bind function to show/hide options
		$(this).change(function() {
			options.slideToggle(this.checked);
		});
	});
}

function initPrefAttributes() {
	$("select[pref], input[pref]").each(function(index) {
		var prefValue;
		if ($(this).attr("default")) {
			if ($(this).attr("default") == "true") {
				prefValue = pref($(this).attr("pref"), true);
			} else {
				prefValue = pref($(this).attr("pref"), $(this).attr("default"));
			}
		} else {
			prefValue = pref($(this).attr("pref"));
		}
		if (this.tagName == "INPUT") {
			if ($(this).attr("type") == "checkbox") {
				$(this).attr("checked", prefValue);
				$(this).change(function(event) {
					changePref(this, this.checked, event);
				});
			} else if ($(this).attr("type") == "radio") {
				if ($(this).val() == prefValue) {
					$(this).attr("checked", "true");
				}				
				$(this).change(function(event) {
					changePref(this, $(this).val(), event);
				});
			} else if ($(this).attr("type") == "text") {
				$(this).keyup(function() {
					changePref(this, $(this).val(), event);
				});
			}
		} else if (this.tagName == "SELECT") {
			$(this).val(prefValue);
			$(this).change(function() {
				changePref(this, $(this).val(), event);
			});
		}
		$(this).click(function(event) {
			if ($(this).attr("mustDonate") && !pref("donationClicked")) {
				event.preventDefault();
			}
		});
	});
}

function changePref(node, value, event) {
	if (!$(node).attr("mustDonate") || ($(node).attr("mustDonate") && donationClicked($(node).attr("pref")))) {
		localStorage[$(node).attr("pref")] = value;
		return true;
	} else {
		// preventDefault() does not work on the "change" event, only the "click" event so revert checkbox state instead
		//event.preventDefault();		
		/*
		if (node.tagName == "INPUT") {
			node.checked = !node.checked;
		}
		*/
		return false;
	}	
}

function initConsole() {
	// Legacy
	if (false && getBrowserVersion() && getBrowserVersion() < 4.2) {
		console.error = console.warn = console.info = console.log = function(msg){alert(msg);};
	}
	if (pref("console_messages")) {
		console.log = origConsoleLog;
		console.warn = origConsoleWarn;
		console.debug = origConsoleDebug;
	} else {
		chrome.extension.getBackgroundPage().console.log = chrome.extension.getBackgroundPage().console.warn = chrome.extension.getBackgroundPage().console.debug = console.warn = console.info = console.log = function(msg){};
	}
}

function initCalendarNames() {
	/*
	var s = document.createElement('script');
	s.setAttribute('type', 'text/javascript');
	s.setAttribute('src', "js/calendar/calendar-" + lang + ".js");
	(document.getElementsByTagName('head')[0] || document.documentElement).appendChild(s);
	*/
	if (Calendar._DN) {
		for (var a=0; a<7; a++) {
			dateFormat.i18n.dayNames[a] = Calendar._DN[a];
			var SDNLen = Calendar._SDN_len;
			if (Calendar._SDN) {
				dateFormat.i18n.dayNamesShort[a] = Calendar._SDN[a];
			} else {
				if (!SDNLen) {
					SDNLen = 3;
				}
				dateFormat.i18n.dayNamesShort[a] = Calendar._DN[a].substring(0, SDNLen);
			}
		}
		for (var a=0; a<12; a++) {
			if (Calendar._MN) {
				dateFormat.i18n.monthNames[a] = Calendar._MN[a];
				var SMNLen = Calendar._SMN_len;
				if (Calendar._SMN) {
					dateFormat.i18n.monthNamesShort[a] = Calendar._SMN[a];
				} else {
					if (!SMNLen) {
						SMNLen = 3;
					}
					dateFormat.i18n.monthNamesShort[a] = Calendar._MN[a].substring(0, SMNLen);
				}
			}
		}
	}
}

function initMessages(node) {
	var selector;
	if (node) {
		selector = node;
	} else {
		selector = "*";
	}
	$(selector).each(function() {
		//var parentMsg = $(this);
		var attr = $(this).attr("msg");
		if (attr) {
			var msgArg1 = $(this).attr("msgArg1");
			if (msgArg1) {
				$(this).text(chrome.i18n.getMessage( $(this).attr("msg"), msgArg1 ));
			} else {
				// look for inner msg nodes to replace before...
				var innerMsg = $(this).find("*[msg]");
				if (innerMsg.exists()) {
					initMessages(innerMsg);
					var msgArgs = new Array();
					innerMsg.each(function(index, element) {
						msgArgs.push( $(this).get(0).outerHTML );
					});
					$(this).html(chrome.i18n.getMessage(attr, msgArgs));
				} else {
					$(this).text(chrome.i18n.getMessage(attr));
				}
			}
		}
		attr = $(this).attr("msgTitle");
		if (attr) {
			$(this).attr("title", chrome.i18n.getMessage(attr));
		}
		attr = $(this).attr("msgSrc");
		if (attr) {
			$(this).attr("src", chrome.i18n.getMessage(attr));
		}
		attr = $(this).attr("msgValue");
		if (attr) {
			$(this).attr("value", chrome.i18n.getMessage(attr));
		}
	});
	/*
	$("*[msg]").each(function() {
		var msgArg1 = $(this).attr("msgArg1");
		if (msgArg1) {
			$(this).text(chrome.i18n.getMessage( $(this).attr("msg"), msgArg1 ));
		} else {
			var node1 = $(this).find("msgNode1");
			if (node1.exists()) {
				
			} else {
				$(this).text(chrome.i18n.getMessage( $(this).attr("msg") ));
			}
		}
	});
	$("*[msgTitle]").each(function() {
		$(this).attr("title", chrome.i18n.getMessage( $(this).attr("msgTitle") ));
	});
	$("*[msgSrc]").each(function() {
		$(this).attr("src", chrome.i18n.getMessage( $(this).attr("msgSrc") ));
	});
	$("*[msgValue]").each(function() {
		$(this).attr("value", chrome.i18n.getMessage( $(this).attr("msgValue") ));
	});
	*/
}

function donationClicked(action, ls) {
	if (pref("donationClicked", null, ls)) {
		return true;
	} else {
		var url = "donate.html?action=" + action;
		try {
			chrome.tabs.create({url:url});
		} catch (e) {
			// Must be in a content_script or somewhere chrome.tabs.create cannot be called so send call to background.js
			chrome.extension.sendMessage({name: "openTab", url:url}, function(response) {
				}
			);
		}
		return false;
	}
}

function parseTime(timeString, date) {    
    if (!timeString) return null;
	timeString = timeString.toLowerCase();
    var time = timeString.match(/(\d+)(:(\d\d))?\s*(a?p?)/i); 
    if (time == null) return null;
    var hours = parseInt(time[1],10);    
    if (hours == 12) {
		// Assume noon not midnight if no existant AM/PM
		if (!time[4] || time[4] == "p") {
			hours = 12;
		} else {
			hours = 0;
		}
    } else {
        hours += (hours < 12 && time[4] == "p") ? 12 : 0;
    }
    var d = new Date();
    if (date) {
    	d = date;
    }
    d.setHours(hours);
    d.setMinutes(parseInt(time[3],10) || 0);
    d.setSeconds(0, 0);  
    return d;
}

function findElementByAttribute(array, attributeName, attributeValue) {
	for (a in array) {
		if (array[a][attributeName] == attributeValue) {
			return array[a];
		}
	}
}

function selectOrCreateTab(findUrlStr, urlToOpen, callback) {
	chrome.windows.getAll({populate:true}, function (windows) {
		for(var a=0; a<windows.length; a++) {
			var tabs = windows[a].tabs;
			for(var b=0; b<tabs.length; b++) {
				if (tabs[b].url.indexOf(findUrlStr) != -1) {
					// Uncomment this once the Chrome maximize bug is resolved: https://code.google.com/p/chromium/issues/detail?id=65371
					chrome.windows.update(windows[a].id, {focused:true}, function() {
						chrome.tabs.update(tabs[b].id, { selected: true });
						callback({found:true, tab:tabs[b]});
					});
					return true;
				}
			}
		}
		chrome.tabs.create({url: urlToOpen}, function(tab) {
			chrome.windows.update(tab.windowId, {focused:true}, function() {
				callback({found:false, tab:tab});
			});						
		});
		return false;
	});
}

function removeNode(id) {
	var o = document.getElementById(id);
	if (o) {
		o.parentNode.removeChild(o);
	}
}

function addCSS(id, css) {
	removeNode(id);
	var s = document.createElement('style');
	s.setAttribute('id', id);
	s.setAttribute('type', 'text/css');
	s.appendChild(document.createTextNode(css));
	(document.getElementsByTagName('head')[0] || document.documentElement).appendChild(s);
}

function pad(str, times, character) { 
	var s = str.toString();
	var pd = '';
	var ch = character ? character : ' ';
	if (times > s.length) { 
		for (var i=0; i < (times-s.length); i++) { 
			pd += ch; 
		}
	}
	return pd + str.toString();
}

function getBrowserVersion() {
	// Browser name = Chrome, Full version = 4.1.249.1064, Major version = 4, navigator.appName = Netscape, navigator.userAgent = Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/532.5 (KHTML, like Gecko) Chrome/4.1.249.1064 Safari/532.5
	//																															  Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/533.4 (KHTML, like Gecko) Chrome/5.0.375.38 Safari/533.4
	var agent = navigator.userAgent;
	var offset = agent.indexOf("Chrome");
	var version = null;
	if (offset != -1) {
		version = agent.substring(offset+7);
		offset = version.indexOf(";");
		if (offset != -1) {
			version = version.substring(0, offset);
		}
		offset = version.indexOf(" ");
		if (offset != -1) {
			version = version.substring(0, offset);
		}
	}
	if (version) {
		return parseFloat(version);
	}
}

function toBool(str) {
	if ("false" === str || str == undefined) {
		return false;
	} else if ("true" === str) {
		return true;
	} else {
		return str;
	}
}

// This pref function is different*** we pass either just the param to localStorage[param] or the value of localStorage["example"]
function pref(param, defaultValue, ls) {
	var value;
	if (ls) {
		value = ls[param];
	} else {
		value = localStorage[param];
	}
	if (defaultValue == undefined) {
		defaultValue = false;
	}
	return value == null ? defaultValue : toBool(value);
}

function getUrlValue(url, name, unescapeFlag) {
    var hash;
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for(var i=0; i<hashes.length; i++) {
        hash = hashes[i].split('=');
		if (hash[0] == name) {
			if (unescapeFlag) {
				return unescape(hash[1]);
			} else {
				return hash[1];
			}
		}
    }
    return null;
}

function addUrlParam(url, name, value) {
	if (url) {
		var urlStart = url;
		if (url.indexOf("?") != -1) {
			urlStart += "&";
		} else {
			urlStart += "?";
		}
		return urlStart + name + "=" + value;
	}
	return null;
}

function getCookie(c_name) {
	if (document.cookie.length>0) {
	  c_start=document.cookie.indexOf(c_name + "=");
	  if (c_start!=-1) {
	    c_start=c_start + c_name.length+1;
	    c_end=document.cookie.indexOf(";",c_start);
	    if (c_end==-1) c_end=document.cookie.length;
	    return unescape(document.cookie.substring(c_start,c_end));
	    }
	  }
	return "";
}

// Usage: getManifest(function(manifest) { display(manifest.version) });
function getManifest(callback) {
	var xhr = new XMLHttpRequest();
	xhr.onload = function() {
		callback(JSON.parse(xhr.responseText));
	};
	xhr.open('GET', './manifest.json', true);
	xhr.send(null);
}

function getExtensionIDFromURL(url) {
	//"chrome-extension://dlkpjianaefoochoggnjdmapfddblocd/options.html"
	return url.split("/")[2]; 
}

function getStatus(request, textStatus) {
	var status; // status/textStatus combos are: 201/success, 401/error, undefined/timeout
	try {
		status = request.status;
	} catch (e) {
		status = textStatus;
	}
	return status;
}

function now() {
	return today().getTime();
}

function today() {
	var offsetToday = localStorage["today"];
	if (offsetToday) {
		return new Date(offsetToday);
	} else {
		return new Date();
	}
}

function setTodayOffsetInDays(days) {
	var offset = today();
	offset.setDate(offset.getDate()+parseInt(days));
	localStorage["today"] = offset;
}

function clearTodayOffset() {
	localStorage.removeItem("today");
}

function isToday(date) {
	return date.getFullYear() == today().getFullYear() && date.getMonth() == today().getMonth() && date.getDate() == today().getDate();
}

function isTomorrow(date) {
	var tomorrow = today();
	tomorrow.setDate(tomorrow.getDate()+1);
	return date.getFullYear() == tomorrow.getFullYear() && date.getMonth() == tomorrow.getMonth() && date.getDate() == tomorrow.getDate();
}

function isYesterday(date) {
	var tomorrow = today();
	tomorrow.setDate(tomorrow.getDate()-1);
	return date.getFullYear() == tomorrow.getFullYear() && date.getMonth() == tomorrow.getMonth() && date.getDate() == tomorrow.getDate();
}

Date.prototype.isToday = function () {
	return isToday(this);
};

Date.prototype.isTomorrow = function () {
	return isTomorrow(this);
};

Date.prototype.isYesterday = function () {
	return isYesterday(this);
};

function diffInDays(date1, date2) {
	var d1 = new Date(date1);
	d1.setHours(1);
	d1.setMinutes(1);
	var d2 = new Date(date2);
	d2.setHours(1);
	d2.setMinutes(1);
	return Math.round(Math.ceil(d2.getTime() - d1.getTime()) / ONE_MINUTE / 60 / 24);
}

function addToArray(str, ary) {
	for (a in ary) {
		if (ary[a] == str) {
			return false;
		}
	}
	ary.push(str);
	return true;
}

function removeFromArray(str, ary) {
	for (var a=0; a<ary.length; a++) {
		if (ary[a] == str) {
			ary.splice(a, 1);
			return true;
		}
	}
	return false;
}

function isInArray(str, ary) {
	for (a in ary) {
		if (ary[a] == str) {
			return true;
		}
	}
	return false;
}

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNamesShort[D],
				dddd: dF.i18n.dayNames[D],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNamesShort[m],
				mmmm: dF.i18n.monthNames[m],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};

dateFormat.i18nEnglish = dateFormat.i18n;  

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};

Date.prototype.formattedTime = function () {
	if (pref("24hourMode")) {
		return dateFormat(this, "HH:MM");
	} else {
		return dateFormat(this, "h:MMtt");
	}
};

function findTag(str, name) {
	if (str) {
		var index = str.indexOf("<" + name + " ");
		if (index == -1) {
			index = str.indexOf("<" + name + ">");
		}
		if (index == -1) {
			return null;
		}
		var closingTag = "</" + name + ">";
		var index2 = str.indexOf(closingTag);
		return str.substring(index, index2 + closingTag.length);
	}
}

function tweet(url, msg, via) {	
	var langParam = window.navigator.language.substring(0, 2);
	var popupUrl = "http://twitter.com/intent/tweet?url=" + encodeURIComponent(url) + "&lang=" + langParam;
	if (msg) {
		popupUrl += "&text=" + escape(msg);
	}	
	if (via) {
		popupUrl += "&via=" + via;
	}
	if (!window.open(popupUrl, 'tweet', 'toolbar=0,status=0,resizable=1,width=626,height=256')) {
		chrome.tabs.create({url:popupUrl});
	}
}

function facebookShare(url, msg) {	
	var popupUrl = "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(url);
	if (msg) {
		popupUrl += "&t=" + escape(msg);
	}	
	if (!window.open(popupUrl, 'facebookShare', 'toolbar=0,status=0,resizable=1,width=626,height=356')) {
		chrome.tabs.create({url:popupUrl});
	}
}