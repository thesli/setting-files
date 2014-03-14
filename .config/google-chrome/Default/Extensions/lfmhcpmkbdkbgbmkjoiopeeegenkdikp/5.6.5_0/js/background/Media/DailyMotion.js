(function(){
	
	var DailyMotion = function(){		
	
		const TITLE_MAX_LENGTH  = 96;
	
		var mediaDetectCallbacks = [];

		// --------------------------------------------------------------------------------
		function checkDailyMotionPage( data, callback ){
			
			var url = data.url;
			if( url.toLowerCase().indexOf( "dailymotion.com/video/" ) != -1 )
			{
				getContentFromDailyMotionPage( url, callback );   			
			}
			else if( url.toLowerCase().indexOf( "dailymotion.com/playlist/" ) != -1 )
			{
			
			}
			else
			{	
			 	callback( null ); 
			}
		}
		
		// --------------------------------------------------------------------------------
		function getContentFromDailyMotionPage( url, callback ){
			
			// send request to DailyMotion
			var ajax = new XMLHttpRequest();
			ajax.open('GET', url, true);
			ajax.setRequestHeader('Cache-Control', 'no-cache');
			
			ajax.onload = function(){
						var content = this.responseText;

						parseDailyMotionEmbed( content, function( media )  {
						
										callback( media );
									} );
			}
			
			ajax.onerror = function(){
				callback( null );
			}
			
			ajax.send( null );
		
		}
		
		// ----------------------------------------------------------
		function get_JSON_param( name, val ){			
		
			var x = '"' + name + '"\s*:\s*"([^\"]+?)"';
			var rxe = new RegExp( x, 'i');
			var m  = rxe.exec(val);
			if (m)	return m[1];
			return null;
		}

		// ----------------------------------------------------------
		function getDailyMotionVideo( videoId, icon, baseFileName, callback ){

			// send request to DailyMotion
			var ajax = new XMLHttpRequest();
			ajax.open('GET', videoId, true);
			ajax.setRequestHeader('Cache-Control', 'no-cache');
			
			ajax.onload = function(){
						var content = this.responseText;
						
						var m=/var *info *= *(.*),/.exec(content);
						var mediaFound = false;
						var parsedMediaList = [];
						
						if(m) 
						{
							var info=JSON.parse(m[1]);
							var tags={	"h264": 		{  	label: "MEDIUM",		},
										"h264_hd1080": 	{	label: "HD1080",		},
										"h264_hd720": 	{	label: "HD720",			},
										"h264_hq": 		{	label: "HQ",			},
										"h264_hd": 		{	label: "HD",			},
										"h264_sd": 		{	label: "SD",			},
										"h264_ld": 		{	label: "LD",			},
									}
									
							for(var tag in tags) 
							{
								var url=info['stream_'+tag+'_url'];
								if(url) 
								{
									var title = info['title'];
									if (title) baseFileName = title;		
									var label=tags[tag].label;
									var extension="flv";
									var mExt=/\.([0-9a-zA-Z]+)(?:$|\?)/.exec(url);
									if(mExt)  extension=mExt[1];

									var media =  {
												url: url,
												title: title,
												downloadName: "["+label+"] "+baseFileName+"."+extension,
												displayName: baseFileName + "." + extension,
												quality: label,
												ext: extension,
												format: label,
												type: "video",
												size: null,
												groupId: 0,
												orderField: 0
											};
                   
									parsedMediaList.push(media);
					                mediaFound = true;
								}
							}

							if ( mediaFound )	callback( parsedMediaList );
						} 
						
			}
			
			ajax.onerror = function(){
				callback( null );
			}
			
			ajax.send( null );

		}
		
		// ----------------------------------------------------------
		function parseDailyMotionEmbed( content, callback ){			
		
            var meta = content.match(/<meta\s*name\s*=\s*"twitter:player"\s*value\s*=\s*"(.+?)"/i);
			if ( !meta )  return;
			var videoId = meta[1];

			var icon="";
			var baseFileName="video";
            var match = content.match(/<link\s*rel\s*=\s*"shortcut\sicon"\s*type="image\/x\-icon"\s*href\s*=\s*"(.+?)"/i);
			if (match)   icon = match[1];
			
            var match = content.match(/<link\s*rel\s*=\s*"canonical"\s*href\s*=\s*"(.+?)"/i);
			if (match)   baseFileName = decodeURIComponent(match[1]);

			getDailyMotionVideo( videoId, icon, baseFileName, callback );
			
		}
		
		// -----------------------------------------------------------
		function storeMedia( media, data ){
			
			media.forEach(function( item ){
				item.tabId = data.tabId;
				item.priority = 1;
				item.source = "DailyMotion";
			});
			
			mediaDetectCallbacks.forEach( function( callback ){
						callback( media );
					} );
			
			// событие
			fvdSingleDownloader.AD.getRotationItem( function( item ){

						fvdSingleDownloader.ContentScriptController.processMessage( data.tabId, {
										action: "insertDMButton",
										media: media,
										ad: item
									} );				
				
					} );

		}
		
		this.onMediaDetect = {
			addListener: function( callback ){
				if( mediaDetectCallbacks.indexOf( callback ) == -1 )
				{
					mediaDetectCallbacks.push( callback );
				}
			}
		}
		
		this.isEqualItems = function( item1, item2 )		{
			if( item1.type == item2.type && item1.displayName == item2.displayName  && item1.url == item2.url )
			{
				return true;
			}
			return false;
		}
		
		
		// ------------------------------------------------------------------------
        chrome.webRequest.onResponseStarted.addListener(function(data){
		
					if ( data.url.match( /http:\/\/(www\.)?dailymotion(\.co)?\.([^\.\/]+)\//i ) )		
					{
			
						fvdSingleDownloader.Utils.Async.chain([
					
									function( chainCallback ){
						
												checkDailyMotionPage( data, function( mediaToSave )  {
												
															if( mediaToSave )
															{
																storeMedia( mediaToSave, data );
															}
															else
															{
																chainCallback();	
															}						
														} );
						
											},
				
									function(){
					
											}				
				
								]);   // fvdSingleDownloader.Utils.Async.chain
			
					}

		
				}, {
					urls: ["<all_urls>"],
					types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "other"]
				}, ["responseHeaders"]);
				
	}
	
	this.DailyMotion = new DailyMotion();
	
}).apply( fvdSingleDownloader.Media );
