
// init may be defined later
window.onload = function(){ init(); };

// uniqueTabInc   - auto increment index for ClosedTab
// minimumTabInc  - minimum index number for ClosedTab (items below that were deleted)
// closedTabCount - number of ClosedTabs stored currently

var settings = {};

// show thank you page upon first install 
// check for event & setting cause only one of these is not sufficient
chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == 'install' && localStorage.thank_you_shown != 'true') {
    localStorage.thank_you_shown = 'true';
    chrome.tabs.create({
        url: chrome.extension.getURL('thank_you.html'),
        selected: true
     });
  }
});


// Replace HTML tags < >
function quote(s) {
  var s1=s;
  s1 = s1.replace(new RegExp("<", "g"), "&lt;");
  s1 = s1.replace(new RegExp(">", "g"), "&gt;");
  return s1;
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if (request == "isCtrlZEnabled") {
		sendResponse(settings.ctrlZ);
	} else if (request == "ctrlZ") {
    if (settings.ctrlZ) {
			getLastTab();
    }
  }
});

function getLastTab() {
	var min_limit = localStorage["minimumTabInc"];
	for (var i = localStorage["uniqueTabInc"] - 1; i >= min_limit; i--) {
		if (localStorage["ClosedTab-"+i]){
			showUrl(i, false);
			return;
		}
	}
}

function addNewHistoryEntry(tabId, url) {
	if (!localStorage["HistoryBackward-"+tabId])
		localStorage["HistoryBackward-"+tabId] = url;
	else 
		localStorage["HistoryBackward-"+tabId] += "%%" + url;
	// new url, drop old forward history
	localStorage["HistoryForward-"+tabId] = "";
}

function registerHistoryNavigation(tabId, url) { /// TODO MAKE SURE THEY EXISTS
	var backward = (localStorage["HistoryBackward-"+tabId]||'').split("%%");
	var forward  = (localStorage["HistoryForward-"+tabId]||'').split("%%");
	// backwards array last url is the curent one
	if (url == backward.slice(-2, -1)) {
		// remove us from back history
		// add old url to forward history
		forward.unshift(backward.pop());
	} else if (url == forward[0]) {
		// remove us from forward list
		// add old url to back history
		backward.push(forward.shift())
	}

	// limit history to 10 entries
	backward = backward.slice(-10);
	forward = forward.slice(0, 10);

	localStorage["HistoryBackward-"+tabId] = backward.join('%%');
	localStorage["HistoryForward-"+tabId]  = forward.join('%%');
}

function isHistoryButtonUsed(details) {
	return details.transitionQualifiers.indexOf('forward_back') > -1;
}




function addNewTab(tabId, changeInfo, tab) {

  var insertThis = tab.url+"%%"+tab.index;
  insertThis += "%%";

  if(tab.title != null)
    insertThis += quote(tab.title);
  else
    insertThis += tab.url;

  if (tab.incognito==true)
		insertThis += "%%1";
  else
		insertThis += "%%0";
  
  localStorage["TabList-"+tabId] = insertThis;
  storeOpenTabId(tabId);
}

function onRemoved(tabId, info)  {
	forgetOpenTabId(tabId);
	var tab = localStorage["TabList-"+tabId];
	if (!tab) {
		console.log('ERROR: tab doesn\'t exist: ' + tabId)
		return;
	}
  // Should we record this tab?
  var splitValue = tab.split("%%");
  var url = splitValue[0];
  var re = /^(http:|https:|ftp:|file:)/;
  if (url && re.test(url)) {
		var exists = -1;
		for (i = localStorage["uniqueTabInc"] - 1; i>=0; i--){
			var closedTab = localStorage["ClosedTab-"+i];
			if (closedTab) {
				var split = closedTab.split("%%");
				if (split[2] === url){
					exists = i;
				}
				break;
			}
		}
		var serialized = tabId + "%%" + Date.now() + "%%" + tab;
		if (exists != -1) {
			localStorage["ClosedTab-"+exists] = serialized;
		} else {
			localStorage["ClosedTab-"+localStorage["uniqueTabInc"]] = serialized;
			var uniqueTabInc = localStorage["uniqueTabInc"] ++;
			//localStorage["closedTabCount"];

			// Code for deleting last TAB
			if (localStorage["closedTabCount"] >= settings.numLimit){
				for (i = localStorage["minimumTabInc"]; i < uniqueTabInc; i++){
					var closedTab=localStorage["ClosedTab-"+i];
					if (closedTab){
						localStorage["minimumTabInc"]=i;
						delete localStorage["ClosedTab-"+i];
						break;
					}
				}
			} else {
				localStorage["closedTabCount"] ++;
			}
			setBadgeText();
		}
  }
  delete localStorage["TabList-"+tabId];
}

chrome.tabs.onUpdated.addListener(addNewTab);

chrome.tabs.onRemoved.addListener(onRemoved);


chrome.webNavigation.onTabReplaced.addListener(function (details) {
	// register new tab data
	chrome.tabs.get(details.tabId, function (tab) {
		addNewTab(details.tabId, null, tab);
		delete localStorage["TabList-" + details.replacedTabId];
		forgetOpenTabId(details.replacedTabId);
	});
});


/// TEMPORARY CODE
/// clean up tablist remainder of old crashes and replaced tabs
/*
if (localStorage.tablist_cleanup_done != 'true') {
  localStorage.tablist_cleanup_done = 'true';
	// remove old cruft
	for (var i = 0; i < 10*1000; i++) {
		delete localStorage['TabList-' + i];
	}
}
*/


// This persistent data structure is supposed 
// to help remember tab ids for crash recovery
var openTabIds = JSON.parse(localStorage.openTabIds || "{}");
function storeOpenTabId(tabId) {
	openTabIds[tabId] = 1;
	localStorage.openTabIds = JSON.stringify(openTabIds);
}
function forgetOpenTabId(tabId) {
	delete openTabIds[tabId];
	localStorage.openTabIds = JSON.stringify(openTabIds);
}


// Crash recovery
// Add all tabs to the ClosedTabs list from localStorage 
// that were open before crash (but currently are not)
Object.keys(openTabIds).forEach(onRemoved);
 

// Add already opened tabs on start
chrome.tabs.query({}, function (tabs) {
	for (var i = tabs.length; i--;) {
		addNewTab(tabs[i].id, null, tabs[i]);
	}
});


////////////////////////////////////////

/*
chrome.webNavigation.onTabReplaced.addListener(function (details) {
	console.log('onTabReplaced')
	console.log(details);

	if (localStorage['HistoryBackward-'+details.replacedTabId]) {
		// copy old history
		localStorage['HistoryBackward-'+details.tabId] = localStorage['HistoryBackward-'+details.replacedTabId];
		localStorage['HistoryForward-'+details.tabId] = localStorage['HistoryForward-'+details.replacedTabId];

		// delete old history
		delete localStorage['HistoryBackward-'+details.replacedTabId];
		delete localStorage['HistoryForward-'+details.replacedTabId];
	}

	// delete replaced tab from list of open tabs
	delete localStorage["TabList-"+details.replacedTabId];

	// register new tab data
	chrome.tabs.get(details.tabId, function (tab) {
		addNewTab(details.tabId, null, tab);
	});
});


chrome.webNavigation.onCommitted.addListener(function (details) {
	if (details.frameId != 0) return; // only continue if it's top frame

	console.log('onCommitted')
	console.log(details)

	if (isHistoryButtonUsed(details))
		RegisterHistoryNavigation(details.tabId, details.url);
	else
		AddNewHistoryEntry(details.tabId, details.url);
});

chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
	if (details.frameId != 0) return; // only continue if it's top frame
	//console.log('history')
	//console.log(details)
});

chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
	if (details.frameId != 0) return; // only continue if it's top frame
	chrome.tabs.get(details.tabId, function (tab) {
		///localStorage['TabUrlBeforeNavigate-'+tab.id] = tab.url;
	});
});



var history_temp = [];

chrome.webNavigation.onCommitted.addListener(function (details) {
	if (details.frameId != 0) return; // only continue if it's top frame

	if (window['restoringTab_'+details.tabId]) {
		if (history_temp.length) {
			chrome.tabs.update(details.tabId, {url: history_temp.shift()});
		}
	}
	
});
*/



//////////////////////////////////////////////

/*

// DEBUG

chrome.webNavigation.onTabReplaced.addListener(function(details) {
	console.log("onTabReplaced: " + details.replacedTabId   + " | " + details.tabId)
});

chrome.tabs.onCreated.addListener(function(tab) {
	console.log("created: " + tab.id + " | " + tab.index + " | " + tab.url + " | " + tab.status)
});

chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
	console.log("updated: " + tab.id + " | " + tab.index + " | " + info.url)
});

chrome.tabs.onRemoved.addListener(function(tabId) {
	console.log("removed: " + tabId)
});

chrome.tabs.onAttached.addListener(function(tabId, info) {
	console.log("attached: " + tabId)
});

chrome.tabs.onDetached.addListener(function(tabId, info) {
	console.log("detached: " + tabId)
});

chrome.tabs.onMoved.addListener(function(tabId, info) {
	console.log("moved: " + tabId)
});

*/