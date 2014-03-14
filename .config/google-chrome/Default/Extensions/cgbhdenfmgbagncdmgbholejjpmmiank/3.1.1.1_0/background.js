/*
YouTube(TM) Ratings Preview
Copyright (C) 2013 Cristian Perez <http://www.cpr.name>
All rights reserved.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL CRISTIAN PEREZ BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// Manual settings
var SHOW_UPDATE_NOTICE = false;

// Settings keys
var YTRP_VERSION_KEY = "YTRP_VERSION";
var YTRP_COUNT_KEY = "YTRP_COUNT";
var YTRP_BAR_STYLE_KEY = "YTRP_BAR_STYLE";
var YTRP_BAR_THICKNESS_KEY = "YTRP_BAR_THICKNESS";
var YTRP_HIGHLIGHTED_VIDEOS_KEY = "YTRP_HIGHLIGHTED_VIDEOS";
var YTRP_BAR_OPACITY_KEY = "YTRP_BAR_OPACITY";
var YTRP_CACHING_KEY = "YTRP_CACHING";
var YTRP_SHOW_PAGE_ICON_KEY = "YTRP_SHOW_PAGE_ICON";
var YTRP_ENABLE_TRACKING_KEY = "YTRP_ENABLE_TRACKING";

//DEBUG: Clear settings
//localStorage.removeItem(YTRP_VERSION_KEY);
//localStorage.removeItem(YTRP_COUNT_KEY);
//localStorage.removeItem(YTRP_BAR_STYLE_KEY);
//localStorage.removeItem(YTRP_BAR_THICKNESS_KEY);
//localStorage.removeItem(YTRP_HIGHLIGHTED_VIDEOS_KEY);
//localStorage.removeItem(YTRP_BAR_OPACITY_KEY);
//localStorage.removeItem(YTRP_CACHING_KEY);
//localStorage.removeItem(YTRP_SHOW_PAGE_ICON_KEY);
//localStorage.removeItem(YTRP_ENABLE_TRACKING_KEY);

// Default settings
var YTRP_DEFAULT_BAR_STYLE = 1 // Default is 1 (modern) [classic, modern]
var YTRP_DEFAULT_BAR_THICKNESS = 4; // Default is 4
var YTRP_DEFAULT_HIGHLIGHTED_VIDEOS = 0; // Default is 0
var YTRP_DEFAULT_BAR_OPACITY = 8; // Default is 8 (opaque) [invisible, 20%, 40%, 50%, 60%, 70%, 80%, 90%, opaque]
var YTRP_DEFAULT_CACHING = 3; // Default is 3 (1h) [disabled, 5m, 30m, 1h, 2h, 6h, 12h, 24h]
var YTRP_DEFAULT_SHOW_PAGE_ICON = true; // Default is true
var YTRP_DEFAULT_ENABLE_TRACKING = true; // Default is true

// YouTube API configuration
var YOUTUBE_API_MAX_OPERATIONS_PER_REQUEST = 50; // API v2 limit was 50, no info about API v3 limit
var YOUTUBE_API_DEVELOPER_KEYS = ["AIzaSyDoiR5NdqashvUshG9v1gPZY4jchtQJquc", "AIzaSyCU8hHRxRNxBMkNcRPFXBTNw5kxjH1GEp0", "AIzaSyAXIuwBmYTZ-k_wLzJbQNjz8ZHPdyzXa6M", "AIzaSyCa1HYX_YugEmrXIPI0isqQH_d2wB85IDA", "AIzaSyBFmYsMrdK-GA20Nd84U-rx5E1pIjTtFKE", "AIzaSyBiRmK5itjVy77cnvbqoQWmk6uiGnu0ELc", "AIzaSyDTB222Y-kRiH-a1GWtXxeBUtUPd854P6I", "AIzaSyD9C1rq9RJmw4S0op8OXZgA_uH49eM0We4", "AIzaSyBF12NFA9ROYe1f6n7NhYh7NvD046zmuLQ", "AIzaSyDbn-uYA4sIa-aiYBppq6lAZLcJQvECA6s"];
var YOUTUBE_API_DEVELOPER_KEY = YOUTUBE_API_DEVELOPER_KEYS[Math.floor(Math.random()*YOUTUBE_API_DEVELOPER_KEYS.length)]; // "YTRP Chrome [0-9]" key

// Configure basic settings
if (localStorage[YTRP_BAR_STYLE_KEY] == undefined)
{
	localStorage[YTRP_BAR_STYLE_KEY] = YTRP_DEFAULT_BAR_STYLE;
}
if (localStorage[YTRP_BAR_THICKNESS_KEY] == undefined)
{
	localStorage[YTRP_BAR_THICKNESS_KEY] = YTRP_DEFAULT_BAR_THICKNESS;
}
if (localStorage[YTRP_HIGHLIGHTED_VIDEOS_KEY] == undefined)
{
	localStorage[YTRP_HIGHLIGHTED_VIDEOS_KEY] = YTRP_DEFAULT_HIGHLIGHTED_VIDEOS;
}
if (localStorage[YTRP_BAR_OPACITY_KEY] == undefined)
{
	localStorage[YTRP_BAR_OPACITY_KEY] = YTRP_DEFAULT_BAR_OPACITY;
}
if (localStorage[YTRP_ENABLE_TRACKING_KEY] == undefined)
{
	localStorage[YTRP_ENABLE_TRACKING_KEY] = YTRP_DEFAULT_ENABLE_TRACKING;
}

// Configure cache
var YTRP_CACHE_ENABLE; // True or false
var YTRP_CACHE_EXPIRATION; // In milliseconds
if (localStorage[YTRP_CACHING_KEY] == undefined)
{
	localStorage[YTRP_CACHING_KEY] = YTRP_DEFAULT_CACHING;
}
configureCache();

// Configure page icon
var YTRP_SHOW_PAGE_ICON; // True or false
if (localStorage[YTRP_SHOW_PAGE_ICON_KEY] == undefined)
{
	localStorage[YTRP_SHOW_PAGE_ICON_KEY] = YTRP_DEFAULT_SHOW_PAGE_ICON;
}
configurePageIcon();

// Set up context menus
chrome.contextMenus.create(
{
	title: "YouTube™ Ratings Preview configuration",
	onclick: function (info, tabs)
	{
		chrome.tabs.create({url:chrome.extension.getURL("popup.html")});
	},
	documentUrlPatterns: [ "*://*.youtube.com/*" ]
});
chrome.contextMenus.create(
{
	type: "checkbox",
	id: YTRP_ENABLE_TRACKING_KEY,
	title: "Track anonymous data",
	checked: localStorage[YTRP_ENABLE_TRACKING_KEY] == "true",
	onclick: function (info, tabs)
	{
		localStorage[YTRP_ENABLE_TRACKING_KEY] = info.checked;
	},
	documentUrlPatterns: [ chrome.extension.getURL("popup.html") ]
});

// Check count and new version
var version = chrome.app.getDetails().version;
if (localStorage[YTRP_COUNT_KEY] == undefined)
{
	localStorage[YTRP_COUNT_KEY] = 0;
}
if (localStorage[YTRP_VERSION_KEY] == undefined)
{
	// First install, don't bother the user
	localStorage[YTRP_VERSION_KEY] = version;
}
else if (localStorage[YTRP_VERSION_KEY] != version)
{
	// Update, show update successful page
	localStorage[YTRP_VERSION_KEY] = version;
	if (SHOW_UPDATE_NOTICE)
	{
		chrome.tabs.create({url:chrome.extension.getURL("donate.html") + "?mode=update&count=" + localStorage[YTRP_COUNT_KEY]});
	}
}

// Hashtable holding for every video id, an array of: views [0], likes [1], dislikes [2], and retrieval time [3]
var cacheVideoHashtable = {};

// Wire up the listener of the messages so that we can receive them from the scripts
chrome.extension.onMessage.addListener(onMessage);

// Handles data sent via chrome.extension.sendMessage()
function onMessage(messageEvent, sender, callback)
{
	switch (messageEvent.name)
	{
	case "injectionDone":
	{
		if (YTRP_SHOW_PAGE_ICON)
		{
			chrome.pageAction.setIcon({tabId:sender.tab.id, path:{"19":"favicon19gray.png", "38":"favicon38gray.png"}});
			chrome.pageAction.show(sender.tab.id);
		}
		else
		{
			chrome.pageAction.hide(sender.tab.id);
		}
		break;
	}
	case "getStylesheet":
	{
		var stylesheet = chrome.extension.getURL("style.css");
		callback(stylesheet);
		break;
	}
	case "getVideosData":
	{
		fetchVideosData(messageEvent.message, callback);
		return true; // Keep async callback valid (see docs: http://developer.chrome.com/extensions/extension.html#event-onMessage)
		break;
	}
	case "wasSuccessful":
	{
		if (YTRP_SHOW_PAGE_ICON)
		{
			chrome.pageAction.setIcon({tabId:sender.tab.id, path:{"19":"favicon19.png", "38":"favicon38.png"}});
			chrome.pageAction.show(sender.tab.id);
		}
		else
		{
			chrome.pageAction.hide(sender.tab.id);
		}
		break;
	}
	case "clickedSupportLink":
	{
		chrome.tabs.create({url:chrome.extension.getURL("donate.html") + "?mode=support&count=" + localStorage[YTRP_COUNT_KEY]});
		break;
	}
	case "storage_set_style":
	{
		localStorage[YTRP_BAR_STYLE_KEY] = messageEvent.message;
		break;
	}
	case "storage_set_thickness":
	{
		localStorage[YTRP_BAR_THICKNESS_KEY] = messageEvent.message;
		break;
	}
	case "storage_set_highlighted":
	{
		localStorage[YTRP_HIGHLIGHTED_VIDEOS_KEY] = messageEvent.message;
		break;
	}
	case "storage_set_opacity":
	{
		localStorage[YTRP_BAR_OPACITY_KEY] = messageEvent.message;
		break;
	}
	case "storage_set_caching":
	{
		localStorage[YTRP_CACHING_KEY] = messageEvent.message;
		configureCache();
		break;
	}
	case "storage_set_showpageicon":
	{
		localStorage[YTRP_SHOW_PAGE_ICON_KEY] = messageEvent.message;
		configurePageIcon();
		break;
	}
	case "storage_get_style":
	{
		callback(localStorage[YTRP_BAR_STYLE_KEY]);
		break;
	}
	case "storage_get_thickness":
	{
		callback(localStorage[YTRP_BAR_THICKNESS_KEY]);
		break;
	}
	case "storage_get_highlighted":
	{
		callback(localStorage[YTRP_HIGHLIGHTED_VIDEOS_KEY]);
		break;
	}
	case "storage_get_opacity":
	{
		callback(localStorage[YTRP_BAR_OPACITY_KEY]);
		break;
	}
	case "storage_get_caching":
	{
		callback(localStorage[YTRP_CACHING_KEY]);
		break;
	}
	case "storage_get_showpageicon":
	{
		callback(localStorage[YTRP_SHOW_PAGE_ICON_KEY]);
		break;
	}
	case "storage_get_tracking":
	{
		callback(localStorage[YTRP_ENABLE_TRACKING_KEY]);
		break;
	}
	}
}

// Sets YTRP_CACHE_ENABLE and YTRP_CACHE_EXPIRATION value according to localStorage[YTRP_CACHING_KEY]
function configureCache()
{
	YTRP_CACHE_ENABLE = localStorage[YTRP_CACHING_KEY] > 0;
	YTRP_CACHE_EXPIRATION = 0;
	if (localStorage[YTRP_CACHING_KEY] == 1)
	{
		YTRP_CACHE_EXPIRATION = 5 * 60 * 1000;
	}
	else if (localStorage[YTRP_CACHING_KEY] == 2)
	{
		YTRP_CACHE_EXPIRATION = 30 * 60 * 1000;
	}
	else if (localStorage[YTRP_CACHING_KEY] == 3)
	{
		YTRP_CACHE_EXPIRATION = 60 * 60 * 1000;
	}
	else if (localStorage[YTRP_CACHING_KEY] == 4)
	{
		YTRP_CACHE_EXPIRATION = 2 * 60 * 60 * 1000;
	}
	else if (localStorage[YTRP_CACHING_KEY] == 5)
	{
		YTRP_CACHE_EXPIRATION = 6 * 60 * 60 * 1000;
	}
	else if (localStorage[YTRP_CACHING_KEY] == 6)
	{
		YTRP_CACHE_EXPIRATION = 12 * 60 * 60 * 1000;
	}
	else if (localStorage[YTRP_CACHING_KEY] == 7)
	{
		YTRP_CACHE_EXPIRATION = 24 * 60 * 60 * 1000;
	}
}

// Sets YTRP_SHOW_PAGE_ICON value according to localStorage[YTRP_SHOW_PAGE_ICON_KEY]
function configurePageIcon()
{
	if (localStorage[YTRP_SHOW_PAGE_ICON_KEY] == "false")
	{
		YTRP_SHOW_PAGE_ICON = false;
	}
	else
	{
		YTRP_SHOW_PAGE_ICON = true;
	}
}

// Fetches the data of the videos in the videoIds array
function fetchVideosData(videoIds, callback)
{
	// Return hashtable holding for every video id, an array of: views [0], likes [1], and dislikes [2]
	var videoHashtable = {};
	
	// If the cache is enabled
	if (YTRP_CACHE_ENABLE)
	{
		// Clear the expired cache
		var time = (new Date()).getTime();
		for (var id in cacheVideoHashtable)
		{
			if (time - cacheVideoHashtable[id][3] > YTRP_CACHE_EXPIRATION)
			{
				delete cacheVideoHashtable[id];
			}
		}
		
		// Check if the videos are already cached and in that case move them to the result hashtable directly
		for (var i = videoIds.length - 1; i >= 0; i--)
		{
			if (videoIds[i] in cacheVideoHashtable)
			{
				videoHashtable[videoIds[i]] = [cacheVideoHashtable[videoIds[i]][0], cacheVideoHashtable[videoIds[i]][1], cacheVideoHashtable[videoIds[i]][2]];
				videoIds.splice(i, 1);
			}
		}
	}
	
	// Check how many requests we have to do depending of YouTube API maximum
	var requestCount = Math.ceil(videoIds.length / YOUTUBE_API_MAX_OPERATIONS_PER_REQUEST);
	var responseCount = 0;
	
	// If there are no videos to be requested (can happen if all of them are cached), count and callback
	if (videoIds.length == 0)
	{
		localStorage[YTRP_COUNT_KEY] = parseInt(localStorage[YTRP_COUNT_KEY]) + Object.keys(videoHashtable).length;
		callback(videoHashtable);
	}
	
	// While there are remaining videos to request
	while (videoIds.length > 0)
	{
		// Divide requests in blocks of YouTube API maximum
		var videoIdsBlock = videoIds.splice(0, YOUTUBE_API_MAX_OPERATIONS_PER_REQUEST);
		
		//DEBUG
		//console.log(videoIdsBlock);
		
		// Compose GET request
		var url = "https://www.googleapis.com/youtube/v3/videos?id=";
		for (var i = 0; i < videoIdsBlock.length; i++)
		{
			url += videoIdsBlock[i];
			if (i + 1 < videoIdsBlock.length)
			{
				url += ",";
			}
		}
		url += "&part=statistics&key=" + YOUTUBE_API_DEVELOPER_KEY;
		
		// Prepare GET request
		var req = new XMLHttpRequest();
		req.open("GET", url); // Async request
		
		// Register GET request callback
		req.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				//DEBUG
				//console.log(this.responseText.length);
				
				// Response succesfully received, count and add videos info to the hashtable
				responseCount++;
				composeResultVideoHashtable(this.responseText, videoHashtable);
				
				//DEBUG
				//console.log(JSON.stringify(videoHashtable));
				
				// If it is the last expected response, count and callback
				if (responseCount == requestCount)
				{
					localStorage[YTRP_COUNT_KEY] = parseInt(localStorage[YTRP_COUNT_KEY]) + Object.keys(videoHashtable).length;
					callback(videoHashtable);
				}
			}
		};
		
		// Send GET request
		req.send();	
	}
}

// Adds the videos info in jsonString to the given video hashtable
function composeResultVideoHashtable(jsonString, hashtable)
{
	// Current time used for caching
	var time = (new Date()).getTime();
	
	// Get all items (1 per video)
	var items = JSON.parse(jsonString).items;
	
	// For each item, get the views, likes and dislikes
	var id;
	var views;
	var likes;
	var dislikes;
	for (var i = 0; i < items.length; i++)
	{
		id = items[i].id;
		views = parseInt(items[i].statistics.viewCount);
		likes = parseInt(items[i].statistics.likeCount);
		dislikes = parseInt(items[i].statistics.dislikeCount);
		hashtable[id] = [views, likes, dislikes];
		
		// If the cache is enabled
		if (YTRP_CACHE_ENABLE)
		{
			cacheVideoHashtable[id] = [views, likes, dislikes, time]; 
		}
	}
	
	//DEBUG
	//var textContent = jsonString;
	//console.log(Object.keys(hashtable).length + " items: " + textContent);
	//if (textContent.indexOf("Quota exceeded") != -1 && textContent.indexOf("too_many_recent_calls") != -1)
	//{
		//console.log("quota exceeded");
	//}
	
	//DEBUG
	//console.log(Object.keys(cacheVideoHashtable).length + "---" + JSON.stringify(cacheVideoHashtable));
}
