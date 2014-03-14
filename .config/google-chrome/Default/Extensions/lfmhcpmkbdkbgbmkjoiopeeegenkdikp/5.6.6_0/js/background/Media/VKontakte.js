(function(){
	
	var VKontakte = function(){		
	
		const TITLE_MAX_LENGTH  = 96;
	
		var mediaDetectCallbacks = [];

		
		// --------------------------------------------------------------------------------
		const VIDEO2EXT = {		
			'mpeg' : 'mp4',
			'm4v': 'mp4',
			'3gpp' : '3gp',
			'flv' : 'flv',
			'x-flv' : 'flv',
			'quicktime' : 'mov',
			'msvideo' : 'avi',
			'ms-wmv' : 'wmv',
			'ms-asf' : 'asf',
			'web' : 'webm'
		};
		
		const AUDIO2EXT = {		
			'realaudio' : 'ra',
			'pn-realaudio' : 'rm',
			'midi' : 'mid',
			'mpeg' : 'mp3',
			'mpeg3' : 'mp3',
			'wav' : 'wav',
			'aiff' : 'aif'
		};
		
		const TRANSLATE_EXT = {
			"m4v" : "mp4"
		};
			
		

		// --------------------------------------------------------------------------------
        function getHeaderValue(name, data){
            name = name.toLowerCase();
            for (var i = 0; i != data.responseHeaders.length; i++) {
                if (data.responseHeaders[i].name.toLowerCase() == name) {
                    return data.responseHeaders[i].value;
                }
            }
            return null;
        }
        
		
		// --------------------------------------------------------------------------------
		function getExtByContentType( contentType ){
			if( !contentType ){
				return null;
			}
			var tmp = contentType.split("/");
			
			if( tmp.length == 2 ){
				switch( tmp[0] ){
					case "audio":
						if( AUDIO2EXT[tmp[1]] ){
							return AUDIO2EXT[tmp[1]];
						}
					break;
					case "video":
						if( VIDEO2EXT[tmp[1]] ){
							return VIDEO2EXT[tmp[1]];
						}						
					break;					
				}
			}			
			
			return null;
		}
		
		// --------------------------------------------------------------------------------
		function getFileName( data ){
			// check disposition name

			var url = data.url;
			var tmp = url.split( "?" );
			url = tmp[0];
			tmp = url.split( "/" );
			tmp = tmp[ tmp.length - 1 ];
			
			if( tmp.indexOf( "." ) != -1 ){
				var replaceExt = getExtByContentType( getHeaderValue( "content-type", data ) );
				if( replaceExt ){
					tmp = tmp.split( "." );
					tmp.pop();
					tmp.push( replaceExt );
					tmp = tmp.join(".");
				}
				
				try{
					return decodeURIComponent(tmp);					
				}
				catch( ex ){
					if( window.unescape ){
						return unescape(tmp);										
					}
					else{
						return tmp;
					}
				}

			}
			
			return  null;		
		};
		
		
		
		// --------------------------------------------------------------------------------
		function checkVKontakteAudio( media, callback ){

			ext = getExtByContentType( getHeaderValue( "content-type", media ) );
			
			if( !ext )
			{
				ext = fvdSingleDownloader.Utils.extractExtension( media.url );
			}
			
			ext = ext.toLowerCase();
			
			if(TRANSLATE_EXT[ext])
			{
				ext = TRANSLATE_EXT[ext];
			}
			
			var size = getHeaderValue( "Content-Length", media );
			
			var fileName = getFileName( media );	
			
			var title = fileName;
			downloadName = title;			
			var frmt = "no name";
			if (title)
			{
				frmt = title;
				if ( frmt.length > 10) frmt = frmt.substr(0,10)+"...";
			}
			
			var result = {				
				url: media.url,
				tabId: media.tabId,
				frameId: media.frameId,
				ext: ext,
				
				title: title,
				format: frmt,
				
				downloadName: downloadName ? downloadName : "media." + ext,
				priority: 0,
				vubor:  0,
				size: size,
				type: "video",
				groupId: 0,
				orderField: 0
			};

			callback( result );		
		
		}
		
		
		
		
		// -----------------------------------------------------------
		function storeMedia( media, data ){
			
			if (media)
			{	
				if( media.length )
				{							
					media.forEach(function( item ){
											item.tabId = data.tabId;
											item.priority = 1;
											item.source = "VKontakte";
										});
				}
				else
				{							
					media.tabId = data.tabId;
					media.priority = 1;
					media.source = "VKontakte";
				}						
			
				mediaDetectCallbacks.forEach( function( callback ){
									callback( media );
								} );
			
				// �������
				fvdSingleDownloader.ContentScriptController.processMessage( data.tabId, {
										action: "insertVK_AudioButton",
										media: media
									} );				
			}
		}
		
		this.onMediaDetect = {
			addListener: function( callback ){
				if( mediaDetectCallbacks.indexOf( callback ) == -1 )
				{
					mediaDetectCallbacks.push( callback );
				}
			}
		};
		
		this.isEqualItems = function( item1, item2 )		{
		
			if( item1.url == item2.url )
			{
				return true;
			}
			return false;
		};

		// --------------------------------------------------------------------------------
		chrome.extension.onRequest.addListener ( function(request, sender, sendResponse) {        

						if(request.akce=="set_VK_Audio_Media_title")
						{
							tabId = request.tabId;
							url = request.url;
							ext = request.ext;
							title = request.title;
							
							fvdSingleDownloader.Media.Storage.setData_AttributeUrl(tabId, url, "title", title);		
							frmt = title;
							if ( frmt.length > 10) frmt = frmt.substr(0,10)+"...";
							fvdSingleDownloader.Media.Storage.setData_AttributeUrl(tabId, url, "format", frmt);		
							downloadName = title + "." + ext;
							fvdSingleDownloader.Media.Storage.setData_AttributeUrl(tabId, url, "downloadName", downloadName);		
						}
						
					});
		
		
		// ------------------------------------------------------------------------
        chrome.webRequest.onResponseStarted.addListener(function(data){
			
			// ignore VK 
			return;
			
					if ( /vk.me\/([^.]*).mp3/i.test(data.url.toLowerCase()) )
					{
			
						fvdSingleDownloader.Utils.Async.chain([
					
									function( chainCallback ){
						
												checkVKontakteAudio( data, function( mediaToSave )  {
												
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
					types: ["object"]
				}, ["responseHeaders"]);
				
	};
	
	this.VKontakte = new VKontakte();
	
}).apply( fvdSingleDownloader.Media );
