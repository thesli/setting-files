if (window == chrome.extension.getBackgroundPage()) {

	(function(){
	
		var MainButton = function(){
		
			var self = this;

			const TRIGGER_VIDEO_SIZE = 1048576;
			const MIN_FILESIZE_TO_CHECK = 100 * 1024;
			
			const YOUTUBE_URL_SIGNS = [
				"//youtube.com",
				"//www.youtube.com",
				"//soloset.net",
				"//www.soloset.net",
				"//solosing.com",
				"//www.solosing.com"
			];
			
			const DAILYMOTION_URL_SIGNS = [
				"//dailymotion.com",
				"//www.dailymotion.com",
				"//dmcdn.net"
			];
			
			// ----------------------------------------------
			function getActiveTab(callback){
				fvdSingleDownloader.Utils.getActiveTab(callback);
			}
			
			// -------------------------------------------- состояние кнопки в панели
			function setMainButtonStatus(can, tabId){
				
				var img = chrome.extension.getURL('images/' + (can ? 'fvd.single.can_download.png' : 'fvd.single.cant_download.png'));
				chrome.browserAction.setIcon({
										path: img,
										tabId: tabId
									});
			}
			
			// -----------------------------------------  window.addEventListener( "load"
			function refreshMainButtonStatus(){
			
				getActiveTab(function(tab){
				
								var flag_YT = true;
				
								if (fvdSingleDownloader.noYoutube) 
								{
					
									if (self.isYoutubeUrl(tab.url)) 
									{
										chrome.browserAction.setTitle({
														title: _("noyoutube_message"),
														tabId: tab.id
													});
													
										flag_YT = false;			
									}
						
								}
					
								if (!tab) 
								{
									setMainButtonStatus(false);
									return;
								}
					
								if (fvdSingleDownloader.Media.Storage.hasDataForTab(tab.id) && flag_YT) 
								{

									var items = fvdSingleDownloader.Media.Storage.getMedia( tab.id );
									var items = self.filter_Media( items );

									var flag = false;
									if (items.length > 0) flag = true;
						
									setMainButtonStatus(flag, tab.id);
								}
								else 
								{
									setMainButtonStatus(false, tab.id);
								}
							});
			}
			this.refreshMainButtonStatus = function(){
				refreshMainButtonStatus();
			}

			// -------------------------------------------------------------------------------
			this.filter_Media = function( media )  {

				var rezult = [];

				var x = fvdSingleDownloader.Prefs.get( "fvd.trigger_video_more" );
				var min_filesize = MIN_FILESIZE_TO_CHECK;
				if ( x == 'video_100kb')  min_filesize = 102400;
				else if (x == 'video_1mb') min_filesize = 1048576;
				
				media.forEach(function( item ){

											if (self.checkExtByContentType( item.ext ))
											{
												var size = item.size;
												if (size && size < min_filesize )  return;
            
												rezult.push( item );
												
											}
										});
										
				return rezult;						
			}	
			
			// -------------------------------------------------------------------------------
			this.parsed_Media = function( media )  {

				var rezult = [];

				media.forEach(function( item ){

											if ( item.priority > 0 )
											{
												rezult.push( item );
											}
										});
										
				return rezult;						
			}	
			
			// -------------------------------------------------------------------------------
			this.checkExtByContentType = function( contentType )
			{
				var name = "fvd.enable_" + contentType;
				var x = fvdSingleDownloader.Prefs.get( name );
				if( x == 'false' )  return false;
				return true;
			}
			
			// -------------------------------------------------------------------------------
			this.isYoutubeUrl = function(url) {
			
				var url = url.toLowerCase();
				
				for( var i = 0; i != YOUTUBE_URL_SIGNS.length; i++ )
				{
					if( url.indexOf( YOUTUBE_URL_SIGNS[i] ) != -1 )		return true;
				}
				
				return false;
			}
			
			// ----------------------------------------
			function read_news_url( url, callback ){

				var ajax = new XMLHttpRequest();
				
				ajax.open('GET', url);
				ajax.setRequestHeader('Cache-Control', 'no-cache');
				
				ajax.onreadystatechange = function()  {
							try
							{
								if  ( (this.readyState == 4) && (this.status == 200))
								{
									var text = ajax.responseText;
									if (text)
									{
										callback(text);
										return text;
									}	
									else
									{
										callback( null );
										return null;
									}	
								}
							}
							catch (e) {}
						};
				ajax.onerror = function(){
							callback( null );
							return null;
						};
				
				ajax.send(null);
			}
			// ---------------------------------------------- News ---------------------------
			this.check_news = function( flag ){		

				// -- news
				var last_check_news_time = fvdSingleDownloader.Prefs.get("last_check_news_time");
				var current_time = new Date().getTime();
				const interval_check_news = 12 * 3600 * 1000; // 12 hour
			
				if ( ((current_time - interval_check_news) > last_check_news_time) || flag )
				{
					fvdSingleDownloader.Prefs.set( "last_check_news_time", current_time );
		
					var url = "https://s3.amazonaws.com/fvd-special/chrome-downloader/news.txt";

					read_news_url( url, function( t ){  

									if (t)
									{
										var last_check_news_url = fvdSingleDownloader.Prefs.get("last_check_news_url");
										
										if (last_check_news_url != t)
										{
											fvdSingleDownloader.Prefs.set( "last_check_news_url", t );
											
											if ( t.indexOf("http") == 0 )
											{
												url_news = t;
											}
											else
											{
												url_news = "http://flashvideodownloader.org/fvd-suite/to/s/"+t;
											}	

											if( url_news )
											{
												chrome.tabs.create({
																url: url_news,
																active: true
															});			
											}
	
										}
									}	
					
								} ); 	 
				}
			}
			// -------------------------------------------------------------------------------
			
			
			
			chrome.tabs.onUpdated.addListener(function(tabId, info){
			
				getActiveTab(function(tab){
				
					if (!info.status) {
						return;
					}
					
					if (tab.id == tabId) {
						refreshMainButtonStatus();
					}
					
				});
				
				
				
			});
			
			chrome.tabs.onActivated.addListener(function(info){
			
				refreshMainButtonStatus();
				
			});
			
			fvdSingleDownloader.Media.onMediaForTabUpdate.addListener(function(tabId){
			
				getActiveTab(function(tab){
				
					if (!tab) {
						return;
					}
					
					if (tabId == tab.id) {
						refreshMainButtonStatus();
					}
					
				});
				
			});
			
		}
		
		this.MainButton = new MainButton();
		
	}).apply(fvdSingleDownloader);
}
else{
	fvdSingleDownloader.MainButton = chrome.extension.getBackgroundPage().fvdSingleDownloader.MainButton;
}
