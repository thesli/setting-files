(function(){
	
	var ContentScriptController = function(){

		const EXTENSION_NAME = fvdSingleDownloader;
	
		this.processMessage = function( tabId, message ){

			var file = "/js/contentScripts/contentScript.js";//chrome.extension.getURL("/js/contentScripts/contentScript.js");
			chrome.tabs.executeScript( tabId, {
								file: file
								}, function(){

											var port = chrome.tabs.connect( tabId );
											port.postMessage( message );
											port.onMessage.addListener(function( message ){
					
															switch( message.action )
															{
						
																case "download":	fvdSingleDownloader.Media.startDownload( message.media );
																					break;
						
																case "incrementAdCounter":		fvdSingleDownloader.AD.incrementRotateCounter();
																								break;
																								
															}
														});
										});
										
										
			chrome.tabs.insertCSS( tabId, {	 file: "/js/contentScripts/contentScript.css" } );
								
		}
		
	}
	
	this.ContentScriptController = new ContentScriptController();
	
}).apply( fvdSingleDownloader );


