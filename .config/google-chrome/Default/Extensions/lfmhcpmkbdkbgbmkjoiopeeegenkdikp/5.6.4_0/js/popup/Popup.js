(function(){
	
	var Popup = function(){
		
		var self = this;
		
		const ALLOWED_EXT_IMAGES = [
			"flv",
			"mp3",
			"mp4",
			"pdf",
			"swf",
			"webm",
			"3gp"
		];

		var REKLAMA = {			"session": {	label: "New Update - Session Manager",	
												url: "https://chrome.google.com/webstore/detail/session-box-tabs-manager/pljdghaomjmmleolekcgcamfpbhekbmc?hl=en-US",
												icon: "/images/session_box.png",	
												flag: true,
												set: "popup.display_reklama_session",
												pref: true,
											},
								"nimbus":  {	label: "New Update - Nimbus Screen Capture  - Screenshot, edit, download, upload!",		
												url: "https://chrome.google.com/webstore/detail/nimbus-screen-capture/bpconcjcammlapcogcnnelfmaeghhagj?utm_source=chrome-ntp-icon",	  		  
												icon: "/images/capture.png",	
												flag: true,
												set: "popup.display_reklama_nimbus",
												pref: true,
											},
								"youtube": {	label: "New Update - Youtube Smart Pause",		
												url: "https://chrome.google.com/webstore/detail/youtube-smart-pause/dcflkimagfnicklojfonbbcppnikogih?hl=en-US",			  
												icon: "/images/iitube.png",	
												flag: true,
												set: "popup.display_reklama_youtube",
												pref: true,
											},
								"notes":   {	label: "Nimbus Note - The easiest way to create notes",		
												url: "https://chrome.google.com/webstore/detail/nimbus-notes/haafigbapbpbpnmgcknnmilaaaimggpk",			  
												icon: "/images/NimbusNotes.png",	
												flag: true,
												set: "popup.display_reklama_notes",
												pref: true,
											},
								"quick":   {	label: "Navigate Faster with Quick Map",		
												url: "https://chrome.google.com/webstore/detail/quick-site-map/fndioafilhhbpoafjbjplflmenmlohdp?hl=en-US",			  
												icon: "/images/QuickSite.png",	
												flag: true,
												set: "popup.display_reklama_quick",
												pref: true,
											},
							}
		
		var reklama_pref = null;
		
		const INTERVAL_TO_DISPLAY_WRITE_REVIEW = 2 * 24 * 3600 * 1000; // 2 days
		
		// ----------------------------------------------------------------------
		function getExtImage( ext ){
		
			ext = ext.toLowerCase();
			
			if( ALLOWED_EXT_IMAGES.indexOf(ext) == -1 )		return;
		
			return "images/formats/"+ext+".png";
		}
		
		function str_download_size( size ) {
		
			if (size<1073741824)    return fvdSingleDownloader.Utils.bytesToMb(size) + "MB";
			        else return fvdSingleDownloader.Utils.bytesToGb(size) + "GB";
		
		}
		
		// ----------------------------------------------------- построение строки
		function buildThreadItem( media ){

			function fbc( className ){
				return item.getElementsByClassName(className)[0];
			}

			var item = document.getElementById("download_item_template").cloneNode( true );
			
			item.removeAttribute( "id" );
			
			fbc("download_button").setAttribute( "href", "#" );			
				
			var displayName = media.title; 	
				
			fbc("download_url").textContent = displayName;
			fbc("download_url").setAttribute( "href", media.url );
			fbc("download_url").setAttribute( "title", media.url );
			
			if( media.size )
			{
				fbc("size").textContent = str_download_size(media.size);
			}
			else
			{
				fbc("size").setAttribute( "loading", 1 );
				fvdSingleDownloader.Utils.getSizeByUrl( media.url, function( size ){
					
								fbc("size").removeAttribute( "loading" );
								if( size )
								{
									fvdSingleDownloader.Utils.getActiveTab( function( tab ){		fvdSingleDownloader.Media.Storage.setData_Attribute( tab.id, media.id, "size", size );		});
									fbc("size").textContent = str_download_size( size );
								}
					
							} );				
			}
			
			function onClick( event ) {
							console.log('fvdSingleDownloader.Media.startDownload',media);
			
							fvdSingleDownloader.Media.startDownload( media );
				
							fbc("download_button").setAttribute( "loading", 1 );
				
							setTimeout( function(){
												fbc("download_button").removeAttribute( "loading" );					
											}, 5000 );

							event.stopPropagation();												
						}
									
			fbc("download_button").addEventListener("click", onClick, false);
			
			fbc("copyLink").addEventListener( "click", function( event ){
				
							fvdSingleDownloader.Utils.copyToClipboard( media.url );
				
							event.stopPropagation();
								
						}, false );
			
			fbc("removeLink").addEventListener( "click", function( event ){
				
							fvdSingleDownloader.Media.Storage.removeItem( media.id );
				
							item.parentNode.removeChild( item );
				
							event.stopPropagation();
				
						}, false );
			
			var topOfImageText = "";
			if( media.quality )		topOfImageText = media.quality;
			if( topOfImageText )
			{
				fbc("media_quality").textContent = topOfImageText;
			}
			
			var extImage = getExtImage( media.ext );
			
			if( extImage )
			{
				fbc("media_format").getElementsByTagName("img")[0].setAttribute( "src", extImage );
			}
			
			return item;
			
		}
		
		// ---------------------------------------------- INIT ---------------------------
		this.init = function(){		
		
			fvdSingleDownloader.MainButton.check_news( false );
			
			self.rebuildThreadsList();
									
			self.refreshTopHints();

			if( !chrome.webRequest )
			{
				var x = document.getElementById("updateChromeNotice");
				if (x) x.removeAttribute("hidden");
				x = document.getElementById("multiple_download_block_title");
				if (x) x.setAttribute("hidden", true);
			}
			
			if( fvdSingleDownloader.noYoutube )
			{
				var elem = document.getElementById("help_link_converter");
				if (elem) elem.style.display = "none";	
				var elem = document.getElementById("help_link_help");
				if (elem) elem.setAttribute("href", "https://fvdmedia.userecho.com/list/21579-chrome-extensions/?category=4918");
			}
			else
			{
				var x = document.getElementById("help_link_convert_video");
				if (x) x.style.display = "none";				
			}
			
			chrome.extension.onMessage.addListener( function( request ) {
								if( request.subject == "mediaForTabUpdate" )
								{
									fvdSingleDownloader.Utils.getActiveTab( function( tab ){
						
													if( tab.id == request.data )
													{
														self.rebuildThreadsList();
													}
						
												});
								}
							} );
						
			// ----	реклама		
			var elem = document.getElementById("captureDownloadHint_close");
			if (elem) elem.addEventListener( "click", function(){
								fvdSingleDownloader.Prefs.set( reklama_pref, false );
								var k = 0;
								for(var i in REKLAMA) 
								{
									var p = _b(fvdSingleDownloader.Prefs.get( REKLAMA[i].set ));
									if (p)  k++;
								}	
								if (k == 0)
								{	
									fvdSingleDownloader.Prefs.set( "popup.display_slow_download_hint", true );
								}
									
								self.refreshTopHints();
							}, false );
						
			var elem = document.getElementById("help_link_options");
			if (elem) elem.addEventListener( "click", function(){
								self.display_setting();
							}, false );
			
			var elem = document.getElementById("returnToThreads");
			if (elem) elem.addEventListener( "click", function(){
								displayDownloads();
							}, false );
			
			var elem = document.getElementById("help_link_donate");
			if (elem) elem.addEventListener( "click", function(){
								displayDonate();
							}, false );
			
			var elem = document.getElementById("slowDownloadHint_close");
			if (elem) elem.addEventListener( "click", function(){
								fvdSingleDownloader.Prefs.set( "popup.display_slow_download_hint", false );
								self.refreshTopHints();
							}, false );
			
			var e = document.getElementById("help_link_clear");
			if (e) e.addEventListener( "click", function(){
										self.clearList();
									}, false );
									
			var e = document.getElementById("help_link_android");
			if (e) e.addEventListener( "click", function(){
										self.navigate_url("http://flashvideodownloader.org/fvd-suite/to/s/andr_getthemall/");
									}, false );
			var e = document.getElementById("help_link_speeddial");
			if (e) e.addEventListener( "click", function(){
										self.navigate_url("https://chrome.google.com/webstore/detail/llaficoajjainaijghjlofdfmbjpebpa");
									}, false );
									
			
			// --- Rate
			var now = new Date().getTime();
			var elem = document.getElementById("help_link_rate");
			var elem1 = document.getElementById("label_link_rate");
			if (elem)
			{
				if( now - fvdSingleDownloader.Prefs.get( "install_time" ) < INTERVAL_TO_DISPLAY_WRITE_REVIEW )
				{
					elem.style.display = "none";
					elem1.style.display = "none";
				}
				if( !_b(fvdSingleDownloader.Prefs.get( "popup.display_rate" )) )
				{
					elem.style.display = "none";
					elem1.style.display = "none";
				}
				if ( !fvdSingleDownloader.noYoutube )
				{
					elem.style.display = "none";
					elem1.style.display = "none";
				}
				
				menu = document.createElement( "div" );
				menu.setAttribute( "id", "help_link_rate_review" );
				menu.style.display = "none";
				elem.appendChild(menu);
				
				span = document.createElement( "span" );
				span.setAttribute( "class", "help_link_rate_title" );
				span.textContent = "What do you think?";
				menu.appendChild(span);

				var buttonContent2 = '<span style="margin-right:5px;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI2Q0ExOUU2Q0U5MzExRTJCRUI5QTUwMkI5OEY0M0ZFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI2Q0ExOUU3Q0U5MzExRTJCRUI5QTUwMkI5OEY0M0ZFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjZDQTE5RTRDRTkzMTFFMkJFQjlBNTAyQjk4RjQzRkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjZDQTE5RTVDRTkzMTFFMkJFQjlBNTAyQjk4RjQzRkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5y/i71AAACYklEQVR42qRUS2sTURT+7kzM5NFJ0pQk0or2kYRAi1I34qpoFy5UBEFxJxR/QcGdIoiudFHBhQuFIG5LEZetLoJpfZWWFmkxpY4So/ZhzWsmk8nc60mjRTvueuBwX+d85zvfvTNMCIG9mIQ9mmtndo21RhtJtOMB1NhRWBurqNhzqCIDBVmksYLTFNNOflPsAmiaQCdUjKP77ACiXgLjg7ClQejlEazNfsLw2nMCGgPHopNBa3UV8VMD2FwGZGKkBGmvDVADQPjMISRqI8hlLqCQf0jRo/9qIHAQ0dA5FEuAvwZ4VNqjY94A6mXA+AIwDhw+ryKEi04RZeqdH+gBikAgRInUI2vqwloja4LVCYjO63jlbEGQNJH9VJkC5XVaU5Ik/a4htivATawMC9Cx5GQg4TVWp55tB/uSwL5mCzSX3bTuJI9RIjHQsiYsTDsZSPhMyJfwZvIK+lK30HNEhV2hqhGgQKIXZnMwMIEGnsKHmf+10GSpU8ubCEb8cBFlTuovpN//mMdtbVoel07YdYtIlLaAYQeAsQ0SQhe7gVhSAjeBuSfa/ax6+dH3noV5OeBKvPXLuW8fbeQ/QOzW4PjMEN5tIIVIKgEf3f/iRPX6VPjuaK7f9bOqHEspegLY6urwszZFcTOHiDbd+Vi+X6svL00ic6+cfoE7j7/2ad2K1ethvF0IppL7O7w+bzwe38ljf77Gk0NDeCl7WK++EQialei6pDafkUouuQQzG4xXdcMob9ZqZVPTTM658ymrshArlrcY1HnR5WfhkCR03ipjNQTM0vqaYXm8jb9/Ab8EGAAOWeW36rTgEQAAAABJRU5ErkJggg==" align="left"></span>Bad';
				var button2 = document.createElement("button");
				button2.setAttribute("class", "help_link_rate_button");
				button2.setAttribute("type", "button");
				button2.setAttribute("id", "help_link_rate_bad");
				button2.innerHTML = buttonContent2;
				menu.appendChild(button2);
				button2.addEventListener( "click", function(){
								self.set_no_rating();
								var m = document.getElementById("help_link_rate_review");
								setTimeout( function() {   m.style.display = "none";		}, 500);
							}, false );
				
				var buttonContent1 = '<span style="margin-right:5px;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdCRkM1QTIyQ0U5MzExRTJCNDlEOTdEQjg5QkY1MzVEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdCRkM1QTIzQ0U5MzExRTJCNDlEOTdEQjg5QkY1MzVEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0JGQzVBMjBDRTkzMTFFMkI0OUQ5N0RCODlCRjUzNUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0JGQzVBMjFDRTkzMTFFMkI0OUQ5N0RCODlCRjUzNUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5nMHf4AAACmUlEQVR42qRSTU8TURQ9M1PaOqVFSmkhgJgmQCoYCEElxpiImpi4MXHpkq1xReLKxJWJ7mTtj9AYNFEXLDGoNIALgVCpWApi25nOTGfa+fC0hUBcyMJ5ufPeu+/d88499wqe5+F/Pl/j/1AA6jgSutCK+xAQh4XX0Gj79CdoYZpGE2kumvefeY1tc+M2VjGExFFEIlcRwAh9Ik4geBxA5MsJdIymkLw2hK6Bu/Tc5Enrv0DEY2uX4xfMnSxkGeg7P45ucYb+YTiEPpFBC01ABkv5OWQ3MgiHBQzeuIKR2BOE8AA6gWqQ/wbzHcwCh0S4foKdhmlKqBkULhLEuYkpFLJJFNcuw7C/UNxVmEiTbZFxhtAo44wQZfggIphG1/gtxBO98FcBpwLIcfJsBWyqrO7XkFvcQL44S6CPeOot+Q6yTyGI64gP3UMi5keLzgCaFwQqCstrAafaWaOeeqIp6O8myZToWGpqEGBm/oYWfqiqhIreFEbgseeQCQFsmsj3omeA9v5h9sWFIxGDFE9iXsb6J+hmFSaDHWol8VgiiwC7yM9ZYFouGcEKMbLtSEQTu3wwzTw/sOoDLEm0rit8ZCyQmiTXAT2ov3X8XC8in19ElfcPAZ6v98BwxO247LydblmZQmxsErGzrAyZVExAyQK5vZ2VzcL7+W/2m0sRLAyFUWo7BNi2ZLgeXLXsLs+mO2cnSqWdvvhaqua4mla2iht5Zyu9J6aXCx2fF3LO1xdjinax/VgfhCQbEhkbDrS5XORVtVbKRr8ryfm9tqphueUtzbe9WQn+KNSgQK14L7NB7Ooma84M633w+E4SIgEsCp7RJNzuVZDRw+Kj1W4/RNffGYQUcHS7rJQstVSy4TguBAFuuYw/AgwAs58ROceXw74AAAAASUVORK5CYII=" align="left"></span>Good';
				var button1 = document.createElement("button");
				button1.setAttribute("class", "help_link_rate_button");
				button1.setAttribute("type", "button");
				button1.setAttribute("id", "help_link_rate_good");
				button1.innerHTML = buttonContent1;
				menu.appendChild(button1);
				button1.addEventListener( "click", function(){
								self.set_no_rating();
								self.give_us_rating();
							}, false );
			
				elem.addEventListener( "click", function(){
								self.clickMenu = true;
								var m = document.getElementById("help_link_rate_review");
								if (m.style.display == "none")  m.style.display = "block";
													else m.style.display = "none";
							}, false );
				elem1.addEventListener( "click", function(){
								self.clickMenu = true;
								var m = document.getElementById("help_link_rate_review");
								if (m.style.display == "none")  m.style.display = "block";
													else m.style.display = "none";
							}, false );
				
				document.addEventListener( "click", function(){
								if (self.clickMenu == true)
								{
									self.clickMenu = false;
								}
								else
								{	
									var m = document.getElementById("help_link_rate_review");
									m.style.display = "none";
								};
							}, false );
			}
			
			fvdSingleDownloader.Utils.getActiveTab(function( tab ){
				
									if( fvdSingleDownloader.noYoutube )
									{
										if (fvdSingleDownloader.MainButton.isYoutubeUrl(tab.url)) 
										{
											var x = document.getElementById("noYoutubeMessage");
											if (x) x.removeAttribute( "hidden" );
											var y = document.getElementById("download_item_container");
											if (y) y.setAttribute( "hidden", true );
										}
									}
									else
									{
										var x = document.getElementById("noYoutubeMessage");
										if (x) x.setAttribute( "hidden" );
										var y = document.getElementById("download_item_container");
										if (y) y.removeAttribute( "hidden" );
									}
				
								});
			
			fvdSingleDownloader.AD.rotateOnPage();
			
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
		// ----------------------------------------------
		this.navigate_url = function( url ){
			chrome.tabs.query( 	{
							url:  url 
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
																url: url
															}, function( tab ){ }
														);
									}
					} );
		}
		
		// ----------------------------------------------
		this.clearList = function(){
			
			var container = document.getElementById("download_item_container");
			while( container.firstChild )
			{
				container.removeChild( container.firstChild );
			}
			
			fvdSingleDownloader.Utils.getActiveTab( function( tab ){
				
				if( tab )
				{
					fvdSingleDownloader.Media.Storage.removeTabData( tab.id );
				}
				
			} );
		}

		// ----------------------------------------------
		this.refreshTopHints = function(){
		
			var elem1 = document.getElementById("slowDownloadHint");
			if (elem1) elem1.setAttribute("hidden", true);
			var elem2 = document.getElementById("captureDownloadHint");
			if (elem2) elem2.setAttribute("hidden", true);

			var k = 0;
			var e = [];
			for(var i in REKLAMA) 
			{
				REKLAMA[i].pref = _b(fvdSingleDownloader.Prefs.get( REKLAMA[i].set ));
				if (REKLAMA[i].pref)
				{
					e[k] = i;
					k++;
				}
			}
			var rnum = 0;
			if( k > 0 )
			{
				rnum = Math.floor(Math.random() * k	);
				
				var item = REKLAMA[e[rnum]];
				
				var elem = document.getElementById("captureDownloadHint");
				if (elem)
				{
					elem.removeAttribute("hidden");
					var a = elem.getElementsByTagName("a")[0];
					a.textContent = item.label;
					a.setAttribute("href", item.url);
					a.style.background="url("+item.icon+") 6px center no-repeat"; 
					
					reklama_pref = item.set;
				}	
				return;
			}
			
			if( _b(fvdSingleDownloader.Prefs.get( "popup.display_slow_download_hint" )) )
			{
				var elem = document.getElementById("slowDownloadHint");
				if (elem) elem.removeAttribute("hidden");
				return;
			}			
			
		}

		// ----------------------------------------------  запрос к данным
		function threadsOfActiveTab( callback ){
			
			fvdSingleDownloader.Utils.getActiveTab( function( tab ){
console.log(tab);				
								if( !tab )
								{
									callback( null );
								}
								else
								{
									if ( fvdSingleDownloader.noYoutube && fvdSingleDownloader.MainButton.isYoutubeUrl(tab.url))  
									{
										// youtube	
									}
									else
									{
										var media = fvdSingleDownloader.Media.Storage.getMedia( tab.id );
										var media = fvdSingleDownloader.MainButton.filter_Media( media );
									
										media.sort( function( item1, item2 )  {	  
														return (item1.priority < item2.priority ? 1 : (item1.priority == item2.priority ? (item1.id < item2.id ? 1 : -1) : -1));  
													} );
									
										callback( media );
									}	
								}
				
							} );
		}
		
		// ------------------------------------------------- перестроить дерево
		this.rebuildThreadsList = function(){

			threadsOfActiveTab( function( threads ) {
			
						if( threads )
						{
						
							var container = document.getElementById("download_item_container");
							while( container.firstChild )
							{
								container.removeChild( container.firstChild );
							}
					
							var currentGroup = null;
					
							threads.forEach(function( thread )  {
											try
											{
												var item = buildThreadItem( thread );	
												container.appendChild( item );				
								
											}	
											catch( ex )
											{
												console.log( ex );				
											}
										});
						}
					} );
		}	

		// ----------------------------------------------
		this.give_us_rating = function(){

			var url;
			if( fvdSingleDownloader.noYoutube )
			{
				url = "https://chrome.google.com/webstore/detail/fvd-video-downloader/lfmhcpmkbdkbgbmkjoiopeeegenkdikp/reviews";
			}	
			else
			{
				url = "http://flashvideodownloader.org/fvd-suite/to/s/rate_ch_cn";
			}	

			chrome.tabs.create( {	active: true,
									url: url
								}, function( tab ){ }
							);
		}
		// ----------------------------------------------
		this.set_no_rating = function(){
			fvdSingleDownloader.Prefs.set( "popup.display_rate", false );
		}

		
	}
	
	this.Popup = new Popup();
	
}).apply( fvdSingleDownloader );
