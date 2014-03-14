var RPATH = {};

// Set some variables
RPATH.DEBUG = true;

RPATH.tabs = {};
RPATH.REQUEST_FILTER = {'urls' : ['<all_urls>'], 'types' : ['main_frame']};
RPATH.EXTRA_INFO = ['responseHeaders'];

RPATH.init = function()
{
	// Bind our Chrome events.
	try
	{
		// This is in a try/catch because Chrome 21 (dev) causes errors when debugging (chrome.webRequest can be undefined)
		chrome.webRequest.onBeforeRedirect.addListener(this.webRequestListener, this.REQUEST_FILTER, this.EXTRA_INFO);
		chrome.webRequest.onCompleted.addListener(this.webRequestListener, this.REQUEST_FILTER, this.EXTRA_INFO);


		chrome.tabs.onUpdated.addListener(this.tabUpdated);
		chrome.tabs.onCreated.addListener(this.tabUpdate);


		chrome.tabs.onRemoved.addListener(this.tabRemoved);



		chrome.webRequest.onCompleted.addListener(function(details)
		{
			if (this.DEBUG)
			{
				if (details.tabId > 0)
				{
					if (typeof(RPATH.tabs[details.tabId]) != 'undefined')
					{
						RPATH.log('The following data was recorded and stored', RPATH.tabs[details.tabId]);
					}
				}
			}
		}, this.REQUEST_FILTER, this.EXTRA_INFO);

		// Check if the version has changed.
		var currVersion = RPATH.getVersion();
		var prevVersion = localStorage['version'];

		if (currVersion != prevVersion)
		{
			// Check if we just installed this extension.
			if (typeof prevVersion == 'undefined')
			{
				RPATH.onInstall();
			}
			else
			{
				RPATH.onUpdate();
			}

			localStorage['version'] = currVersion;
		}

		RPATH.log('Current version is: '+localStorage['version']);

	}
	catch(e) { RPATH.error(e); }
};

RPATH.webRequestListener = function(details)
{
	if (details.tabId > 0)
	{

		// Have we seen this tab before?
		if (typeof(RPATH.tabs[details.tabId]) == 'undefined')
		{
			// Not seen this tab, init it.
			RPATH.tabs[details.tabId] = {};
			RPATH.tabs[details.tabId].isRedirect = false;
		}

		RPATH.tabs[details.tabId].lastactive = new Date().getTime();
		RPATH.record(details);


		// Perform GC 30 out of every 100 requests.
		if (RPATH.rand(1,100) <= 30)
		{
			RPATH.log('RANDOM GC STARTED');
			RPATH.garbageCollect();
		}

		return;
	}
};

RPATH.tabUpdated = function(tabId, changeInfo, tab)
{
	RPATH.tabUpdate(tab);
};

RPATH.tabUpdate = function(tab)
{
	// Look at all the status codes in the path,
	// decide which is the most important and make a
	// badge out of it.

	var tabId = tab.id;

	if (typeof( RPATH.tabs[tabId]) != 'undefined')
	{

		chrome.browserAction.setIcon({path: "assets/images/rpath19.png", tabId: tabId});

		var currentPath = RPATH.tabs[tabId].path;

		var mostImportantStatus = '';
		var mostImportantStatusCode = 0;
		var actualStatusCode = 0;

		for(var i = 0; i < currentPath.length; i++)
		{
			var pathItem = currentPath[i];


			// 500 > 400 > 300 > 200
			if (pathItem.statusCode >= 200  && pathItem.statusCode < 300 && mostImportantStatusCode < 300)
			{
				mostImportantStatus = 'normal';
				mostImportantStatusCode = 200;
				actualStatusCode = pathItem.statusCode.toString();

			}
			else if (pathItem.statusCode == 301 && mostImportantStatusCode < 400)
			{

				mostImportantStatus = 'redirect';
				mostImportantStatusCode = 301;
				actualStatusCode = pathItem.statusCode.toString();

			}
			else if (pathItem.statusCode == 302 && mostImportantStatusCode < 400)
			{

				mostImportantStatus = 'redirect';
				mostImportantStatusCode = 302;
				actualStatusCode = pathItem.statusCode.toString();

			}
			else if (pathItem.statusCode >= 300  && pathItem.statusCode < 400  && mostImportantStatusCode < 400)
			{

				mostImportantStatus = 'redirect';
				mostImportantStatusCode = 300;

				actualStatusCode = pathItem.statusCode.toString();
			}
			else if (pathItem.statusCode >= 400  && pathItem.statusCode < 500  && mostImportantStatusCode < 500)
			{
				mostImportantStatus = 'notfound';
				mostImportantStatusCode = 400;
				actualStatusCode = pathItem.statusCode.toString();
			}
			else if (pathItem.statusCode >= 500)
			{
				mostImportantStatus = 'error';
				mostImportantStatusCode = 500;
				actualStatusCode = pathItem.statusCode.toString();
			}
		}

		if (mostImportantStatus == 'redirect')
		{
			// BADGE
			chrome.browserAction.setBadgeText({text: actualStatusCode, tabId: tabId});
			chrome.browserAction.setBadgeBackgroundColor({color:"#1455b6", tabId: tabId});
		}
		if (mostImportantStatus == 'notfound')
		{
			// BADGE
			chrome.browserAction.setBadgeText({text: actualStatusCode, tabId: tabId});
			chrome.browserAction.setBadgeBackgroundColor({color:"#bb1414", tabId: tabId});
		}
		if (mostImportantStatus == 'error')
		{
			// BADGE
			chrome.browserAction.setBadgeText({text: actualStatusCode, tabId: tabId});
			chrome.browserAction.setBadgeBackgroundColor({color:"#ba7815", tabId: tabId});
		}

		// We can get in to a state where there is a redirect from the last
		// tab that for some reasond doesn't clear. This should address that.
		//
		if (mostImportantStatus == 'normal')
		{
			// BADGE
			chrome.browserAction.setBadgeText({text:"", tabId: tabId});
		}
	}
};

RPATH.tabRemoved = function(tabId, removeInfo)
{
	RPATH.log('Tab '+tabId+' is being removed');

	if (typeof(RPATH.tabs[tabId]) != 'undefined')
	{
		RPATH.log('We had data for '+tabId+', freeing now', RPATH.tabs);

		delete RPATH.tabs[tabId];
	}
	else
	{
		RPATH.log('We had no data for tab '+tabId, RPATH.tabs);
	}

	RPATH.garbageCollect();
};


RPATH.record = function(details)
{
	details.type = 'normal';
	var url = details.url;

	if (typeof(details.redirectUrl) != 'undefined')
	{
		details.type = 'redirect';
		RPATH.tabs[details.tabId].isRedirect = true;
	}


	if (typeof(RPATH.tabs[details.tabId].lastrequest) == 'undefined' || RPATH.tabs[details.tabId].lastrequest != details.requestId)
	{
		RPATH.tabs[details.tabId].lastrequest = details.requestId;

		RPATH.tabs[details.tabId].path = []; // init or reset.
	}

	RPATH.tabs[details.tabId].path.push(details);


	RPATH.log(details.type+' request recorded, tab '+details.tabId, details);
};

RPATH.getTab = function(tabId)
{
	if (typeof(RPATH.tabs[tabId]) != 'undefined')
	{
		return RPATH.tabs[tabId];
	}

	return false;
};

RPATH.copyTabPath = function(tabId)
{
	//RPATH.log('wat');
	if (typeof(RPATH.tabs[tabId]) != 'undefined')
	{
		var tab = RPATH.tabs[tabId];
		//RPATH.log(tab);
		tab.path.forEach(function(item)
		{
		//	RPATH.log(item);
		});

		return str;
	}
};


/******
UTILITY
******/
RPATH.log = function(msg)
{
	if (this.DEBUG)
	{
		if (arguments.length == 1)
		{
			console.log(msg);
		}
		else
		{
			console.log(arguments);
		}
	}
};

RPATH.error = function(msg)
{
	if (this.DEBUG)
	{
		if (typeof(msg) == 'object' && msg.stack)
		{
			console.error(msg.stack);
		}
		else if (arguments.length == 1)
		{
			console.error(msg);
		}
		else
		{
			console.error(arguments);
		}
	}
};

// Look at all active tabs and remove data we have for any
// tabs that arent visible & more than 30 seconds old.
RPATH.garbageCollect = function()
{
	chrome.windows.getAll({populate:true}, function (windows)
	{
		var visibleTabs = [];

		for(var i = 0; i < windows.length; i++)
		{
			var windowscan = windows[i];

			for(var ii = 0; ii < windowscan.tabs.length; ii++)
			{
				var tab = windowscan.tabs[ii];
				visibleTabs.push(tab.id.toString());
			}
		}

		var stamp = new Date().getTime();

		for (var tabId in RPATH.tabs)
		{
			var age = (stamp - RPATH.tabs[tabId].lastactive);

			if (visibleTabs.indexOf(tabId) == -1 && age > 30000) // 30 seconds
			{
				delete RPATH.tabs[tabId];

				RPATH.log('GC: tab '+tabId+' wasnt visible and is stale, so was freed', RPATH.tabs);
			}

		}
	});
};

RPATH.rand = function (min, max) {
    return Math.random() * (max - min) + min;
};

RPATH.onInstall = function()
{
    RPATH.log("Extension Installed");
};

RPATH.onUpdate = function()
{
	RPATH.log("Extension Updated");
};

RPATH.getVersion = function()
{
	var details = chrome.app.getDetails();
	return details.version;
};

RPATH.init();