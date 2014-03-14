var default_settings = {
	showClear:true,
	showBadge:true, 
	showTime:true, 
	showSearch:true,
	boldFont:false,
	saveHistory:true,
	ctrlZ:false,
	menuTop:false,
	disableDClick:false,
	appendTab:false,
	numLimit:99999,
	numItems:20,
	numLines:0
};


// Show |url| in a new tab.
function showUrl(id,closewindow) { 
	var splitValue = localStorage["ClosedTab-"+id].split("%%");
	var url = splitValue[2];
	var index = parseInt(splitValue[3]);
	delete localStorage["ClosedTab-"+id];
	localStorage["closedTabCount"] --;
	setBadgeText();

	if (chrome.extension.getBackgroundPage().settings.appendTab == true) index=999999;

	if (closewindow==true){
		chrome.tabs.create({"url": url, "index": index,"selected":true});  
		window.close();
	}else{
		chrome.tabs.create({"url": url, "index": index,"selected":false});  
	}
}

function setBadgeText() {
	var n = localStorage["closedTabCount"];
	if (parseInt(n) > 0 && settings.showBadge){
		//chrome.browserAction.setBadgeBackgroundColor({color:[225, 234, 250, 255]})
		chrome.browserAction.setBadgeText({text:n});
	}else{
		chrome.browserAction.setBadgeText({text:""});
	}
}

function init(){
	var allowClearing = true;
	if (localStorage["settings"]==undefined){ //frist time install?
		localStorage["settings"]=JSON.stringify(default_settings); 
		localStorage["minimumTabInc"] = 0;
		localStorage["uniqueTabInc"] = 0;
		localStorage["closedTabCount"] = 0;
		allowClearing=false;
	}
	settings = JSON.parse(localStorage["settings"]);
	chrome.extension.getBackgroundPage().settings = settings;

	if (allowClearing && !settings.saveHistory) resetData(); else setBadgeText();
}

function resetData()
{	

  /// !IMPORTANT
  /// have to save all settings we need before clearing localStorage!
  var support         = localStorage.support;
  var thank_you_shown = localStorage.thank_you_shown;
  var install_date    = localStorage.install_date;

	localStorage.clear();

  localStorage.support = (support == "true");
  localStorage.thank_you_shown = (thank_you_shown == "true");
  localStorage.install_date = install_date || +new Date;
	
	localStorage["minimumTabInc"] = 0;
	localStorage["uniqueTabInc"] = 0;
	localStorage["closedTabCount"] = 0;
	localStorage["settings"] = JSON.stringify(chrome.extension.getBackgroundPage().settings);

	setBadgeText();
	
	/*chrome.tabs.getAllInWindow(null, function(tabsInWindow) {
		for (var i=0; i<tabsInWindow.length; i++) {
			addNewTab(tabsInWindow[i].id,null, tabsInWindow[i]);
		}
	});*/
}
