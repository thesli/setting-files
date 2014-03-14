// ----------------------------------
// CHROME CONTEXT ADAPTER
// ----------------------------------

chromeContextAdapter = {
	_init_MessageDispatch_: function() {
		chrome.extension.onRequest.addListener( function(message, sender, sendResponse) {
			if (typeof(TaplioContext[message.method]) == 'function') TaplioContext[message.method](message, sender);
			sendResponse(true);
		});
	},
	_fn_sendToBackground_: function(message) {
		chrome.extension.sendRequest(message);
	},
	_fn_getAdapterAssetPath_: function(callback) {
		callback(chrome.extension.getURL('chrome_assets/'));
	}
}

// copy in dependencies / run adapter init
if ((window.top === window)) {
	for(var x in chromeContextAdapter) {
		if (x.slice(0,4) == '_fn_') TaplioContext[x.slice(3,x.length)] = chromeContextAdapter[x];
		else if (x.slice(0,6) == '_init_') chromeContextAdapter[x]();
	}
	TaplioContext.bootstrap();
}
else if (typeof(TaplioContextiFrame) != "undefined") {
	for(var x in chromeContextAdapter) {
		if (x.slice(0,4) == '_fn_') TaplioContextiFrame[x.slice(3,x.length)] = chromeContextAdapter[x];
		else if (x.slice(0,6) == '_init_') chromeContextAdapter[x]();
	}
	TaplioContextiFrame.bootstrap();
}
