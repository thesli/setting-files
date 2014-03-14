(function(){

    var MediaSniffer = function(){
    
        const VIDEO_EXTENSIONS = ["flv", "ram", "mpg", "mpeg", "avi", "rm", "wmv", "mov", "asf", "rbs", "movie", "divx", "mp4", "ogg", "mpeg4", "m4v", "webm"];
        
        const AUDIO_EXTENSIONS = [/*"mp3"*/];
        
        const GAME_EXTENSION = ["swf"];
        
        const CONTENT_TYPE_RE = /^(video)/i;
        
        const IGNORE_EXTENSIONS = ["jpg", "jpeg", "gif", "png", "bmp", "tiff", "mp3"];
        const CONTENT_TYPE_IGNORE_RE = /^(audio)/i;
        
        const TRIGGER_VIDEO_SIZE = 1048576;
        const MIN_FILESIZE_TO_CHECK = 100 * 1024;
        
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

		const NO_YOUTUBE_SIGNS = [
			"://s.ytimg.com",
			"://o-o.preferred.",
			"youtube.com",
			"soloset.net",
			"solosing.com",
			"static.doubleclick.net",
			"googlevideo"
		];
		
		const NO_SNIFFER_SIGNS = [
			"youtube.com",
			"dmcdn.net",
			"soloset.net",
			"solosing.com",
			"static.doubleclick.net"
		];
		
		const TRANSLATE_EXT = {
			"m4v" : "mp4"
		};
			
        var self = this;
        
        var mediaDetectCallbacks = [];
		
		
		function isAllowedExt( extension ){
            if (VIDEO_EXTENSIONS.indexOf(extension) != -1) {
                return true;
            }
            
            if (AUDIO_EXTENSIONS.indexOf(extension) != -1) {
                return true;
            }
            
            if (GAME_EXTENSION.indexOf(extension) != -1) {
                return true;
            }
			
			return true;
		}
		
		function prepareMedia( media ){

			var ext = null;

			if (media.url.indexOf("#") != -1)  media.url = media.url.substring(0,media.url.indexOf("#"));
			// ни в коем случае не отбрасывать после (?) - приводит к отваливанию множества сайтов
			
			if ( (media.url.indexOf("tumblr.com") != -1) && (media.url.indexOf("#_=_") != -1) ) media.url = media.url.replace("#_=_", "");			//thumblr.com

			if( media.url.toLowerCase().indexOf( "dailymotion.com/video/" ) != -1 )  return null;
			if( media.url.toLowerCase().indexOf( "youtube.com" ) != -1 )  return null;
			if( media.url.toLowerCase().indexOf( "googlevideo.com" ) != -1 )  return null;
			
			var disposName = dispositionName( media );
			
			if( disposName )
			{
				ext = fvdSingleDownloader.Utils.extractExtension( disposName );
			}
			
			if( !ext )
			{
				ext = getExtByContentType( getHeaderValue( "content-type", media ) );
			}
			
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
			
			if( media.tab.title )
			{
				
				var downloadName = media.tab.title;					
				
				if( ext )
				{
					downloadName += "." + ext;
				}	
				
			}
			else
			{
				var downloadName = getFileName( media );						
			}
			
			
			var orderField = 0;
			
			if( VIDEO_EXTENSIONS.indexOf( ext ) != -1 )
			{
				orderField = 1;
			}
			else if( AUDIO_EXTENSIONS.indexOf( ext ) != -1 )
			{
				orderField = 1;
			}
			orderField = new Date().getTime()

			var title = fileName ? fileName : media.url;
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
				source: "Sniffer",
				groupId: 0,
				orderField: orderField
			};
			
/*			if ( /vk.me\/([^.]*).mp3/i.test(media.url.toLowerCase()) )
			{
				fvdSingleDownloader.ContentScriptController.processMessage( media.tabId, {
									action: "insertVKIcon",
									media: result
								} );				
			}*/
			
			return result;
			
		}
		
		function getFileName( data ){
			// check disposition name

			var dn = dispositionName( data );
			if( dn ){
				return dn;
			}
			
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
		
		function getHeadersAll( data ){
			var result = [];
            for (var i = 0; i != data.responseHeaders.length; i++) {
            	result.push( data.responseHeaders[i].name + ": " + data.responseHeaders[i].value );
            }
			return result;
		}
		
        function getHeaderValue(name, data){
            name = name.toLowerCase();
            for (var i = 0; i != data.responseHeaders.length; i++) {
                if (data.responseHeaders[i].name.toLowerCase() == name) {
                    return data.responseHeaders[i].value;
                }
            }
            return null;
        }
        
        function dispositionName(data){
            try {
                var cd = getHeaderValue('Content-Disposition', data);
                var at = cd.match(/^(inline|attachment);/i);
                
                if ((at != null) && (at[1].toLowerCase() == 'attachment')) {
                    cd = cd.substr(at[0].length);
                    if (cd.charAt(cd.length - 1) != ';') 
                        cd += ';';
                    
                    var fnm = cd.match(/filename="(.*?)"\s*?(?:;|$)/i);
                    if (fnm == null) 
                        fnm = cd.match(/filename=(.*?)\s*?(?:;|$)/i);
                    if (fnm != null) 
                        return fnm[1];
                }
                
            } 
            catch (e) {
            }
			
            return null;
        }
		
        function isMedia(data){

			if( !data.tabId )		return false;
			
			//if ( /vk.me\/([^.]*).mp3/i.test(data.url.toLowerCase()) ) return false;
/*			for( var i = 0; i != NO_SNIFFER_SIGNS.length; i++ )
			{
				var sign = NO_SNIFFER_SIGNS[i];
				if( data.url.toLowerCase().indexOf(sign) != -1 )	return false;
			}*/
			
            var size = getHeaderValue("content-length", data);
            if (!size)                return false;
            
			var x = fvdSingleDownloader.Prefs.get( "fvd.trigger_video_more" );
			var min_filesize = MIN_FILESIZE_TO_CHECK;
			if ( x == 'video_100kb')  min_filesize = 102400;
			else if (x == 'video_1mb') min_filesize = 1048576;
			
            if ( size < min_filesize )             return false;
            
            var extension = fvdSingleDownloader.Utils.extractExtension(data.url);
 
            if (extension && IGNORE_EXTENSIONS.indexOf(extension) != -1) {
            	console.log( extension, "is ignored" );
                return false;
            }
            
            var contentType = getHeaderValue("content-type", data);
            if (contentType) {
                var tmp = contentType.split("/");
                if (CONTENT_TYPE_RE.test(contentType)) {
                    return true;
                }
                else if( CONTENT_TYPE_IGNORE_RE.test(contentType) ){
                	console.log( "Content type ", contentType, " is ignored" );
                	
                	return false;
                }
            }
            
			if( isAllowedExt( extension ) ){
				return true;
			}
			
			var disposName = dispositionName( data );
			
			if( disposName ){
				var disposExt = fvdSingleDownloader.Utils.extractExtension( disposName );
				if( isAllowedExt( disposExt ) ){
					return true;
				}
			}
			
			if( size >= TRIGGER_VIDEO_SIZE ){
				return true;
			}
            
            return false;
            
        }
        
		this.onMediaDetect = {
			addListener: function( callback ){
				if( mediaDetectCallbacks.indexOf( callback ) == -1 )	mediaDetectCallbacks.push( callback );   
			},
			removeListener: function(  ){
				mediaDetectCallbacks.length=0;   
			}
		};
		
		this.isEqualItems = function( item1, item2 ){
			
			return item1.url == item2.url;
			
		};
		
        chrome.webRequest.onResponseStarted.addListener(function(data){

        	if( isMedia( data ) )
			{				
				
				if( fvdSingleDownloader.noYoutube )
				{
					for( var i = 0; i != NO_YOUTUBE_SIGNS.length; i++ )
					{
						var sign = NO_YOUTUBE_SIGNS[i];
						if( data.url.indexOf(sign) != -1 )				return;
					}
				}
				
				chrome.tabs.get( data.tabId, function( tab ){
					
									data.tab = tab;
					
									// calling callbacks
									mediaDetectCallbacks.forEach(function( callback ){
					
															callback( prepareMedia( data ) );
															
														});			
						
								} );
			}
            
            /*
             if( data.url.indexOf( ".flv" ) != -1 ){
             console.log( data );
             }
             */
        }, {
            urls: ["<all_urls>"],
            types: ["object", "other"]
        }, ["responseHeaders"]);
        
    };
    
    this.Sniffer = new MediaSniffer();
    
}).apply(fvdSingleDownloader.Media);
