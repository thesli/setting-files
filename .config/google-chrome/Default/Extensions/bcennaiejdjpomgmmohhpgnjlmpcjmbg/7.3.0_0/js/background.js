
// init may be defined later
window.onload = function(){ init(); };


function getCurrentTab(callback) {
    chrome.tabs.query(
        { currentWindow: true, active: true },
        function (array) { callback(array[0]); }
    );
}

var settings = {};

// show thank you page upon first install
chrome.runtime.onInstalled.addListener(function (details) {
	if (details.reason == 'install') {
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
  if (request == "ctrlZ") {
    if (chrome.extension.getBackgroundPage().settings.ctrlZ) {
  	  for (i = localStorage["uniqueTabInc"] - 1; i>=0; i--){
  			if (localStorage["ClosedTab-"+i]){
  				showUrl(i,false);
  				return;
  			}
  	  }
    }
  }
});

function AddNewTab(tabId, changeInfo, tab) {

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
}

chrome.tabs.onUpdated.addListener(AddNewTab);

chrome.tabs.onRemoved.addListener(function(tabId, info)  {
  // Should we record this tab?
  var splitValue = localStorage["TabList-"+tabId].split("%%");
  var url = splitValue[0];
  var re = /^(http:|https:|ftp:|file:)/;
  if (url && re.test(url)) {
		var exists = -1;
		for (i = localStorage["uniqueTabInc"] - 1; i>=0; i--){
			var closedTab=localStorage["ClosedTab-"+i];
			if (closedTab){
				var split = closedTab.split("%%");
				if (split[2]===url){
					exists=i;
				}
				break;
			}
		}
		var digital = new Date();
		if (exists!=-1){
			localStorage["ClosedTab-"+exists] = tabId + "%%" + digital.getTime() + "%%" + localStorage["TabList-"+tabId];
		}else{
			localStorage["ClosedTab-"+localStorage["uniqueTabInc"]] = tabId + "%%" + digital.getTime() + "%%" + localStorage["TabList-"+tabId];
			var uniqueTabInc = localStorage["uniqueTabInc"] ++;
			//localStorage["closedTabCount"];

			// Code for deleting last TAB
			if (localStorage["closedTabCount"]>=chrome.extension.getBackgroundPage().settings.numLimit){
				for (i = localStorage["minimumTabInc"]; i<uniqueTabInc; i++){
					var closedTab=localStorage["ClosedTab-"+i];
					if (closedTab){
						localStorage["minimumTabInc"]=i;
						delete localStorage["ClosedTab-"+i];
						break;
					}
				}
			}else{
				localStorage["closedTabCount"] ++;
			}
			setBadgeText();
		}
  }
  delete localStorage["TabList-"+tabId];
});

chrome.webNavigation.onTabReplaced.addListener(function (details) {
	chrome.tabs.get(details.tabId, function (tab) {
		AddNewTab(details.tabId, null, tab);
	});
});


/*
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