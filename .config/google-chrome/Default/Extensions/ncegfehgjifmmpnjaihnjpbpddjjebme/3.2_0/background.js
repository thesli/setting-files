//    var tabhistory = {};
chrome.tabs.onCreated.addListener(handleTabCreated);
// chrome.tabs.onRemoved.addListener(handleTabRemoved);
chrome.tabs.onUpdated.addListener(handleTabUpdated);
chrome.pageAction.onClicked.addListener(handlePageAction);

chrome.runtime.onConnect.addListener(function(port) {
	if (port.name == "chromeTouch.shiftTouchMode") {
		handleShiftTouchMode(port);
	} else if (port.name == "chromeTouch.loadSetting") {
		handleLoadSetting(port);
	} else if (port.name == "chromeTouch.updateSetting") {
		handleUpdateSetting(port);
		// } else if (port.name == "chromeTouch.captureTab") {
		// handleCaptureTab(port);
	}
});

function handleShiftTouchMode(port) {
	port.onMessage.addListener(function(data) {
		shiftTouchMode(data.touchMode);
	});
}

function shiftTouchMode(touchMode) {
	// update PageAction icon.
	updatePageActionIcon(touchMode);
	// save setting.
	localStorage.setItem("touchMode", touchMode);
	// notify new setting to all tabs.
	notifyNewSetting({
		"touchMode" : touchMode
	});
}

function updatePageActionIcon(touchMode, tab_id) {
	var ico = "icon_32.png";
	if (touchMode == 1) {
		ico = "image/ico_auto.png";
	} else if (touchMode == 2) {
		ico = "image/ico_full.png";
	} else if (touchMode == 3) {
		ico = "image/ico_off.png";
	}
	notifyNewIcon(ico, tab_id);

	// reflect to setting page.
	var port = chrome.runtime.connect({
		name : "chromeTouch.updateSettingForm"
	});
	port.postMessage({
		key : "touchMode",
		value : touchMode
	});
}

function handleUpdateSetting(port) {
	port.onMessage.addListener(function(data) {
		// save setting.
		localStorage.setItem(data.key, data.value);
		// notify new setting to all tabs.
		var setting = {};
		setting[data.key] = data.value;
		notifyNewSetting(setting);
		if (data.key === "touchMode" || data.key === "hideIcon") {
			// update toolstrips image.
			updatePageActionIcon(localStorage.getItem("touchMode"));
		}
	});
}

function handleLoadSetting(port) {
	port.onMessage.addListener(function(data) {
		// load setting.
		var settings = {};
		for ( var key in data) {
			var value = localStorage.getItem(key);
			if (value !== null) {
				settings[key] = value;
			} else if (data[key]) {
				localStorage.setItem(key, data[key]);
			}
		}

		// notify current setting to tab.
		var tabport = chrome.tabs.connect(port.sender.tab.id, {
			name : "chromeTouch.refleshSetting"
		});
		tabport.postMessage(settings);
		updatePageActionIcon(settings.touchMode, port.sender.tab.id);
	});
}

/*
 * function handleCaptureTab(port) { port.onMessage.addListener(function(url) { //
 * capture tab. chrome.windows.getCurrent(function(window){
 * chrome.tabs.captureVisibleTab(window.id, function(dataUrl){
 * chrome.tabs.getSelected(window.id, function(tab){ tabCapture(tab.id, url,
 * dataUrl, tab); }); }); }); }); }
 */

function notifyNewSetting(settings) {
	chrome.windows.getAll({
		populate : true
	}, function(windows) {
		for ( var i = 0; i < windows.length; i++) {
			for ( var j = 0; j < windows[i].tabs.length; j++) {
				var port = chrome.tabs.connect(windows[i].tabs[j].id, {
					name : "chromeTouch.refleshSetting"
				});
				port.postMessage(settings);
			}
		}
	});
}

function notifyNewIcon(ico, tab_id) {
	var hideIcon = parseInt(localStorage.getItem("hideIcon"));
	if (tab_id) {
		if (hideIcon === 1) {
			chrome.pageAction.hide(tab_id);
		} else {
			chrome.pageAction.show(tab_id);
		}
		chrome.pageAction.setIcon({
			tabId : tab_id,
			path : ico
		});
	} else {
		chrome.windows.getAll({
			populate : true
		}, function(windows) {
			for ( var i = 0; i < windows.length; i++) {
				for ( var j = 0; j < windows[i].tabs.length; j++) {
					if (hideIcon) {
						chrome.pageAction.hide(windows[i].tabs[j].id);
					} else {
						chrome.pageAction.show(windows[i].tabs[j].id);
					}
					chrome.pageAction.setIcon({
						tabId : windows[i].tabs[j].id,
						path : ico
					});
				}
			}
		});
	}
}

function checkSettingWindow(callback) {
	// close old setting tabs.
	chrome.windows.getAll({
		populate : true
	}, function(windows) {
		var setting_url = chrome.runtime.getURL("setting.html");
		var setting_tab = null;
		var setting_tabs = [];
		for ( var i = 0; i < windows.length; i++) {
			for ( var j = 0; j < windows[i].tabs.length; j++) {
				if (setting_url === windows[i].tabs[j].url) {
					setting_tabs.push(windows[i].tabs[j]);
				}
			}
		}
		if (setting_tabs.length > 0) {
			setting_tab = setting_tabs[setting_tabs.length - 1];
		}
		if (setting_tabs.length > 1) {
			for ( var i = 0; i < setting_tabs.length - 1; i++) {
				chrome.tabs.remove(setting_tabs[i].id);
			}
		}
		if (setting_tab && callback) {
			callback(setting_tab);
		}
	});
}

function handleTabCreated(tab) {
	forceloadChromeTouch(tab.id, tab.url);
	/*
	 * tabhistory[tab.id] = {tab: tab, pos: -1}; tabhistory[tab.id].history =
	 * []; tabhistory[tab.id].capture = [];
	 */
}

/*
 * function handleTabRemoved(tabId) { console.log("delete tabId=" + tabId);
 * delete tabhistory[tabId]; }
 */

function handleTabUpdated(tabId, changeInfo, tab) {
	forceloadChromeTouch(tabId, changeInfo.url);
	/*
	 * if (changeInfo.status === 'loading') { if (changeInfo.url) { //
	 * history.back or next page tabCapture(tabId, changeInfo.url, null, tab); }
	 * else { // reload var url =
	 * tabhistory[tabId].history[tabhistory[tabId].pos]; tabCapture(tabId, url,
	 * null, tab); } }
	 */
}

/*
 * function tabCapture(tabId, url, dataUrl, tab) { if (!tabhistory[tabId]) {
 * handleTabCreated(tab); } var his = tabhistory[tabId].history; if (his.length >
 * 0 && his[tabhistory[tabId].pos -1] === url) { // previous page(history.back)
 * tabhistory[tabId].pos--; } else if (his.length > 0 &&
 * his[tabhistory[tabId].pos] === url) { // same page(reload) } else if (url &&
 * dataUrl) { // next page tabhistory[tabId].pos++;
 * tabhistory[tabId].history[tabhistory[tabId].pos] = url;
 * tabhistory[tabId].capture[tabhistory[tabId].pos] = dataUrl; }
 *  // send previous page's capture to tab. if (tabhistory[tabId].pos >= 1) {
 * var prevDataUrl = tabhistory[tabId].capture[tabhistory[tabId].pos - 1]; var
 * tabport = chrome.tabs.connect(tabId, {name: "chromeTouch.captureTab"});
 * tabport.postMessage({dataUrl: prevDataUrl}); } }
 */

function handlePageAction(tab) {
	var touchMode = localStorage.getItem("touchMode");
	touchMode++;
	if (touchMode > 3) {
		touchMode = 1;
	}
	shiftTouchMode(touchMode);
}

function forceloadChromeTouch(tabId, url) {
	if (url && url.substring(0, 4) === 'http') {
		// for image pages or text-plain pages.
		chrome.tabs.executeScript(tabId, {
			file : 'chromeTouch.js'
		});
	}
}

var initialTouchMode = localStorage.getItem("touchMode");
if (initialTouchMode !== null) {
	updatePageActionIcon(initialTouchMode);
} else {
	updatePageActionIcon(1);
}