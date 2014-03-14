if (window == chrome.extension.getBackgroundPage()) {

	(function(){
	
		var Media = function(){

			var self = this;

			var _onMediaForTabUpdateListeners = [];
			
			const DETECT_MODULES = ["Sniffer", "DailyMotion", "VKontakte", "SitePage"];
			
			// ===============================================================
			this.init = function(){
			
/*				console.log("Media - init ");
				
				chrome.tabs.getSelected(undefined, function(tab) {
								incognito = tab.incognito;
								url = tab.url;
								var types = ['cookies', 'images', 'javascript', 'plugins', 'popups', 'notifications']; // плагины, вспл.окна, оповещения
								
								types.forEach(function(type) {
											chrome.contentSettings[type].get({
															'primaryUrl': url,
															'incognito': incognito
														},
														function(details) {   console.log(type, details.setting);  });
													});				
							});				*/
				
				
				this.Storage.onMediaRemove.addListener(function( tabId ) {

							console.log( "REMOVE ITEM " + tabId );
					
							_onMediaForTabUpdateListeners.forEach(function(listener) {
						
										try
										{
											listener(tabId);							
										}
										catch( ex ){			}
						
									});
				
						});
				
		
				
												
				function mediaDetectListener(media){
			
					var tabId = null;
					
					fvdSingleDownloader.Utils.Async.chain ( [
							function( chainCallback ){
						
										chainCallback();
									},
					
							function() {
										if (media)
										{	
											if( media.length )
											{							
							
												media.forEach(function( item ) {
																tabId = item.tabId;
																self.Storage.addItemForTab(item.tabId, item);							
															});
											}
											else
											{							
												tabId = media.tabId;
												self.Storage.addItemForTab(media.tabId, media);
											}
				
											chrome.extension.sendMessage( {
																		subject: "mediaForTabUpdate",
																		data: tabId
																	} );
				
											_onMediaForTabUpdateListeners.forEach(function(listener){
							
															try
															{
																listener(tabId);							
															}
															catch( ex ){	}
							
														});
										}
									}] );
					
				};
				
				// --------------------------- перебираем модули Sniffer, Youtube
				DETECT_MODULES.forEach( function( module ){
				
					if( self[module] )
					{
						self[module].onMediaDetect.addListener(mediaDetectListener);						
					}
					
				} );
				
				// --------------------------- закрытие вкладки  
				chrome.tabs.onRemoved.addListener( function( tabId ){
				
							if( fvdSingleDownloader.Media.Storage.hasDataForTab( tabId ) )
							{
								fvdSingleDownloader.Media.Storage.removeTabData( tabId );
						
								_onMediaForTabUpdateListeners.forEach(function( listener ){
												listener( tabId );
											});
							}
						} );
				
				// --------------------------- изменение вкладки
				chrome.tabs.onUpdated.addListener( function( tabId, changeInfo ){
				
							if( changeInfo.url )
							{
								if( fvdSingleDownloader.Media.Storage.hasDataForTab( tabId ) )
								{
									fvdSingleDownloader.Media.Storage.removeTabData( tabId );
								
								
									_onMediaForTabUpdateListeners.forEach(function( listener ){
												listener( tabId );
											});
								}
							}
					
						} );
				
				// --------------------------- реакция на SendRequest
				chrome.extension.onRequest.addListener ( function(request, sender, sendResponse) {        
				
									if(request.command=="getVideoData")
									{
										fvdSingleDownloader.Utils.getActiveTab( function( tab ) {
													if( tab )
													{
														var media = fvdSingleDownloader.Media.Storage.getMedia( tab.id );
														media = fvdSingleDownloader.MainButton.filter_Media( media );
														media = fvdSingleDownloader.MainButton.parsed_Media( media );
														sendResponse(media);
													}
												});	
									}

								});
				
				
			}
			
			// ----------------------------------------------
			this.display_setting = function(){
				chrome.tabs.query( 	{
								url: chrome.extension.getURL( "/options.html" )
							}, function( tabs ){

									if( tabs.length > 0 )
									{
										foundTabId = tabs[0].id;
										chrome.tabs.update( foundTabId, {
																		active: true
																		} );
									}
									else
									{
										chrome.tabs.create( {	active: true,
																url: chrome.extension.getURL("/options.html")
															}, function( tab ){ }
														);
									}
						} );
			}
			// ===============================================================
			this.startDownload = function( media ){
				
				fvdSingleDownloader.Utils.Async.chain( [
				
							function( chainCallback ){
											if( fvdSingleDownloader.noYoutube == false )
											{
												fvdSingleDownloader.FvdSuite.downloadMedia( media, function( result ){
																	if( !result )
																	{
																		chainCallback();
																	}
																} );						
											}
											else
											{
												chainCallback();	
											}
										},
										
							function( chainCallback ){

											// изменение по доработке к сайту gogvo.com	
											var flag = false;
//											if( media.url.toLowerCase().indexOf( "gvovideo.com" ) != -1)  flag = true;
//											if( media.url.toLowerCase().indexOf( "divxstage.eu" ) != -1)  flag = true;
//											if( media.url.toLowerCase().indexOf( "videoweed.es" ) != -1)  flag = true;
//											if( media.url.toLowerCase().indexOf( "novamov.com" ) != -1)  flag = true;
											
											if( flag )
											{
												chrome.tabs.create({
																url: media.url,
																active: false
															});		
												return;
											}	
					
											if( chrome.downloads )
											{	
												chrome.downloads.download({
															url: media.url,
															filename: media.downloadName,
															saveAs: true
														});
											}
											else
											{
												fvdSingleDownloader.Utils.getActiveTab(function( tab ){
															fvdSingleDownloader.ContentScriptController.processMessage( tab.id, {
																		action: "startDownload",
																		media: media
																	} );
														});
											}						
										}
					
						] );
						
			}
			
			// ===============================================================
			this.onMediaForTabUpdate = {
				addListener: function(callback){
							if (_onMediaForTabUpdateListeners.indexOf(callback) == -1) 
							{
								_onMediaForTabUpdateListeners.push(callback);
							}
						}
			}
		}
		
		this.Media = new Media();
		
	}).apply(fvdSingleDownloader);
	
}
else
{
	fvdSingleDownloader.Media = chrome.extension.getBackgroundPage().fvdSingleDownloader.Media;
}
