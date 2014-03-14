// developed by Moiseev Vladimir (cdb@linkycat.com, icq: 625986105)
// revised by Denis CaliberoV


window.addEventListener( "load", function(){
	
	fvdSingleDownloader.Media.init();
	fvdSingleDownloader.MainButton.refreshMainButtonStatus();
	
/*	console.log( navigator.language.toLowerCase() );
                            var locale = navigator.browserLanguage || navigator.language;
           locale: navigator.language || navigator.userLanguage,
            var language = navigator.language ? navigator.language : navigator.userLanguage;
        if(/^ru/.test(language)) {
            lang_tld = "ru";
        }
			if( window.navigator.language ){
				
				AVAILABLE_LANGUAGES.forEach(function( lang ){
					
					if( window.navigator.language.indexOf( lang ) != -1 ){
						langAllowed = true;
						return false;
					}
					
				});
				
			}*/
	

//	chrome.tabs.create({	url: chrome.extension.getURL( "/welcome-pages/installed.html" ),		active: true		});			return;
//	chrome.tabs.create({	url: chrome.extension.getURL( "/welcome-pages/updated.html" ),		active: true		});			return;
//	fvdSingleDownloader.Prefs.set( "install_time", 0 );
//	fvdSingleDownloader.Prefs.set( "popup.display_rate", true );
	
	if( fvdSingleDownloader.Utils.isVersionChanged() && !fvdSingleDownloader.noWelcome )
	{
		var url = null;
		
		if( fvdSingleDownloader.noYoutube )
		{
			
			//url = "http://fvdconverter.com/page/welcome-fvd-downloader-chrome";
			
			//url = chrome.extension.getURL( "/welcome-pages/updated.html" );
			
			if (fvdSingleDownloader.Prefs.get("install_time") == 0) 
			{
				url = chrome.extension.getURL( "/welcome-pages/installed.html" );
			}
			
		}	
		else
		{
			
			if (fvdSingleDownloader.Prefs.get("install_time") == 0) 
			{
				url = "http://flashvideodownloader.org/fvd-suite/to/s/welcome_chrome/";
			}
			else
			{
				//url = "http://flashvideodownloader.org/fvd-suite/to/s/update_chrome/";
			}			
			
		}	
		
		if( url )
		{
			chrome.tabs.create({
						url: url,
						active: true
					});			
		}

	}
	
	if( fvdSingleDownloader.Prefs.get( "install_time" ) == 0 )
	{
		fvdSingleDownloader.Prefs.set( "install_time", new Date().getTime() )
	}
	
	fvdSingleDownloader.MainButton.check_news( true );
	
}, false );

// ------------------------------------
chrome.extension.onMessage.addListener(function( message, sender, callback ){

		if( message && message.action == "isSurfCanyonEnabled" )
		{			
			callback( _b( fvdSingleDownloader.Prefs.get("fvd.enable_surfcanyon") ) );
			return true;
		}
		else if( message && message.action == "RefinementsDisabled" )
		{			
			fvdSingleDownloader.Prefs.set("fvd.enable_surfcanyon", false);
			return true;
		}
	});

chrome.management.getAll(function(extensions){

        for (var i in extensions) 
		{
            if (extensions[i].enabled) 
			{
				if ( extensions[i].name.indexOf("Vines Compilation") != -1) 
				{
					fvdSingleDownloader.Prefs.set( "rate.display_reklama_instagram", false );
				}	
				else if ( extensions[i].name.indexOf("Instagram Video Compilation") != -1) 
				{
					fvdSingleDownloader.Prefs.set( "rate.display_reklama_twitter", false );
					fvdSingleDownloader.Prefs.set( "rate.display_reklama_vine", false );
				}	
				else if ( extensions[i].name == "Smart Pause for YouTube" ) 
				{
					fvdSingleDownloader.Prefs.set( "prefs.popup.display_reklama_youtube", false );
				}	
				else if ( extensions[i].name.indexOf("Session box - Tabs manager") != -1) 
				{
					fvdSingleDownloader.Prefs.set( "popup.display_reklama_session", false );
				}	
				else if ( extensions[i].name.indexOf("Nimbus Screenshot") != -1) 
				{
					fvdSingleDownloader.Prefs.set( "popup.display_reklama_nimbus", false );
				}	
				else if ( extensions[i].name == "Nimbus Note" )  
				{
					fvdSingleDownloader.Prefs.set( "popup.display_reklama_notes", false );
				}	
            }
        }

	});
// ------------------------------------


