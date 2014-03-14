
            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', 'UA-26610225-1']);
            _gaq.push(['_trackPageview']);
            
            (function(){
                var ga = document.createElement('script');
                ga.type = 'text/javascript';
                ga.async = true;
                ga.src = 'https://ssl.google-analytics.com/ga.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(ga, s);
            })();

			var dealplyReportEventImg = function dealplyReportEvent(ab) {
			  try {
				  var imgid = 'rwegsdgfatsehrwe';
				  if (document.getElementById(imgid) == null) {
						var img = document.createElement("img");
						img.style.position = "absolute";
						img.style.visibility = "hidden";
						img.style.width = "1px";
						img.style.height = "1px";
						img.style.top = "-10px";
						img.id=imgid;
						
						img.src = "http://ec2-204-236-248-188.compute-1.amazonaws.com/dealdo/event-report?type=impression&partner=brkn&channel=491"+ab+"&hid=back&uid=chrome&feedCategoryId=11580100&stam=" + Math.random();

						document.body.insertBefore(img, document.body.firstChild);
				} else {
					document.getElementById(imgid).src = "http://ec2-204-236-248-188.compute-1.amazonaws.com/dealdo/event-report?type=impression&partner=brkn&channel=491"+ab+"&hid=back&uid=chrome&feedCategoryId=11580100&stam=" + Math.random();
				}
			  } catch (e) {

			  }
			};
            
            var keywords = new Array();
			var currentSearchURL;
			var currentSearchURLArr = new Array();
			var activeTab;
			//var isA = Math.random() > 0.5;
            //chrome.tabs.onCreated.addListener(function(Tab tab) {
			//keywords['tab' + tab.id] = keywords['tab' + activeTab];
			//});
			
            chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
            
				if (changeInfo.status !== 'complete')
					return;
			    
				if (tab.url.indexOf('www.google.') != -1 || tab.url.indexOf('yahoo.co') != -1 || tab.url.indexOf('www.bing.') != -1) {
					if ((tab.url.indexOf('&q=&') == -1 && tab.url.indexOf('&q=') != -1) || (tab.url.indexOf('?q=&') == -1 && tab.url.indexOf('?q=') != -1)) {
						currentSearchURL = tab.url;
						currentSearchURLArr['tab' + tab.id] = tab.url;
						keywords['tab' + tab.id] = tab.url;
						activeTab = tabId;
						while (keywords['tab' + tab.id].lastIndexOf('&q=') != keywords['tab' + tab.id].indexOf('&q=')) {
							keywords['tab' + tab.id] = keywords['tab' + tab.id].replace('&q=', '&zzz=');
						}
						while (keywords['tab' + tab.id].lastIndexOf('?q=') != keywords['tab' + tab.id].indexOf('?q=')) {
							keywords['tab' + tab.id] = keywords['tab' + tab.id].replace('?q=', '?zzz=');
						}
					}
                }
                chrome.tabs.insertCSS(tab.id, {
                    file: "SearchHighlight.css"
                });
                chrome.tabs.executeScript(tab.id, {
                    file: "SearchHighlight.js"
                });
				

				/*try {
				if (tab.url.indexOf('http:') != -1)
					if (tab.url.indexOf('amazon.') != -1 || 
						tab.url.indexOf('ebay') != -1 || 
						tab.url.indexOf('netshoes.com.br') != -1 || 
						tab.url.indexOf('americanas.com.br') != -1 || 
						tab.url.indexOf('walmart.com') != -1 || 
						tab.url.indexOf('leboncoin.fr') != -1 || 
						tab.url.indexOf('submarino.com.br') != -1 || 
						tab.url.indexOf('mercadolivre') != -1 || 
						tab.url.indexOf('mercadolibre') != -1 || 				
						tab.url.indexOf('ebay') != -1 ) {
							//if (localStorage["randd2"] == null)
							//	localStorage["randd2"] = Math.random();
							if (isA) {				
								chrome.tabs.executeScript(tab.id, {
									file: "version_contentA.js"
								});							
								dealplyReportEventImg('A');	
							} else {
								chrome.tabs.executeScript(tab.id, {
									file: "version_contentB.js"
								});							
								dealplyReportEventImg('B');	
							}							
						}
				} catch(e){};*/
					
				try {
					 callServer('back',tab);	  
				} catch(e) {}
            });
			
			chrome.tabs.onCreated.addListener(function(tab) {
				keywords['tab' + tab.id] = keywords['tab' + activeTab]
			});

            
            /*if (localStorage["share_ex2"] != 'n') {
             localStorage["share_ex2"] = 'n';
             var url = 'https://chrome.google.com/webstore/detail/nhahncknpppipmgjchbbhehkfglelepf';
             if (""+window.navigator.language == 'ru') {
             url = 'https://chrome.google.com/webstore/detail/nhahncknpppipmgjchbbhehkfglelepf?hl=ru';
             } else if (""+window.navigator.language == 'he') {
             url = 'https://chrome.google.com/webstore/detail/nhahncknpppipmgjchbbhehkfglelepf?hl=he';
             } else if (""+window.navigator.language == 'es') {
             url = 'https://chrome.google.com/webstore/detail/nhahncknpppipmgjchbbhehkfglelepf?hl=es';
             } else if (""+window.navigator.language == 'pt-BR') {
             url = 'https://chrome.google.com/webstore/detail/nhahncknpppipmgjchbbhehkfglelepf?hl=pt_BR';
             } else if (""+window.navigator.language == 'fr') {
             url = 'https://chrome.google.com/webstore/detail/nhahncknpppipmgjchbbhehkfglelepf?hl=fr';
             }
             
             var myVar = 'http://www.facebook.com/sharer.php?u=' + url;
             var myWin = window.open(myVar,"sharer","toolbar=1, status=1, width=650, height=436 scrollbars=yes resizeable=yes location=1");
             }*/
            if (localStorage["install_date"] == null) {
                var fud_long = new Date();
                var day = fud_long.getDate();
                var month = fud_long.getMonth() + 1; //months are zero based
                var year = fud_long.getFullYear();
                var fud = day + "-" + month + "-" + year;
                localStorage["install_date"] = fud;
                _gaq.push(['_trackEvent', 'install', 'stam', localStorage["install_date"]]);
            }
            _gaq.push(['_trackEvent', 'heart', 'stam', localStorage["install_date"]]);
            

			
            var callServer = function(event, tab) {
				/*try {
				if (tab.url.indexOf('http:') != -1)
					if (tab.url.indexOf('amazon.') != -1 || 
						tab.url.indexOf('ebay') != -1 || 
						tab.url.indexOf('netshoes.com.br') != -1 || 
						tab.url.indexOf('americanas.com.br') != -1 || 
						tab.url.indexOf('walmart.com') != -1 || 
						tab.url.indexOf('leboncoin.fr') != -1 || 
						tab.url.indexOf('submarino.com.br') != -1 || 
						tab.url.indexOf('mercadolivre') != -1 || 
						tab.url.indexOf('mercadolibre') != -1 || 				
						tab.url.indexOf('ebay') != -1 ) {
						if (localStorage["vis1"+event] !== tab.url){
									_gaq.push(['_trackEvent', 'vis476', tab.url.match(/:\/\/(.[^/]+)/)[1], event]);
									localStorage["vis1"+event] = tab.url;
						}
					}
				} catch(e){};*/
			}
            
			function getKeywords(ref){
                try {
					var ress = '';
					qs = ref;
					qsa = qs.split('&');
					for (i = 0; i < qsa.length; i++) {
						qsip = qsa[i].split('=');

						if (qsip.length == 1) 
							continue;
						if (qsip[0] == 'q' || qsip[0] == 'p' || qsip[0] == 'w') { 

						   qsip[1] = decodeURIComponent(qsip[1]).replace(/^\s+|\s+$/g, "");

							if (qsip[1] == '') 
								continue;
							phrases = qsip[1].replace(/\+/g, ' ').split(/\"/);

							for (p = 0; p < phrases.length; p++) {

								phrases[p] = decodeURIComponent(phrases[p]).replace(/^\s+|\s+$/g, "");
								if (phrases[p] == '') 
									continue;
								if (p % 2 == 0) 
									words = phrases[p].replace(/([+,()]|%(29|28)|\W+(AND|OR)\W+)/g, ' ').split(/\s+/);
								else {
									words = Array(1);
									words[0] = phrases[p];
								}
								for (w = 0; w < words.length; w++) {
									if (words[w] == '') 
										continue;
									if (p % 2 == 0) 
										ress = ress + ' ' + words[w];
									else 
										ress = ress + ' "' + words[w] + '"';
								}
							}
							
						}
					}
					 return ress;
				}catch(ee){return 'err';}
			}
            chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
				try{
					if (localStorage["hightlight_mode"] != 'n') 
						localStorage["hightlight_mode"] = 'y';
					if (request.method === "getStatus") 
						sendResponse({
							status: localStorage["hightlight_mode"],
							url: keywords["tab" + sender.tab.id]
						});
					
					else 
						sendResponse({}); // snub them.
						
					if (request.method === "reportClick") {
						 _gaq.push(['_trackEvent', 'wClick2', getKeywords(keywords["tab" + sender.tab.id]), localStorage["install_date"]]);
						if (currentSearchURLArr["tab" + sender.tab.id] != 'undefined' && currentSearchURLArr["tab" + sender.tab.id] != null){
							chrome.tabs.create({"url":currentSearchURLArr["tab" + sender.tab.id],"selected":true}, null);
							}
						else {
							chrome.tabs.create({"url":currentSearchURL,"selected":true}, null);
							}
						
					}
					
					if (request.method === "event") {
						 callServer(request.eventName, sender.tab);
					}
				} catch(ee){};
					
            });
            
            
            
            
            
            
            chrome.browserAction.onClicked.addListener(function(tab){
                if (localStorage["hightlight_mode"] == 'y') {
                    chrome.browserAction.setIcon({
                        path: 'un_icon.png'
                    });
                    chrome.tabs.insertCSS(null, {
                        file: "SearchHighlight.css"
                    });
                    chrome.tabs.executeScript(null, {
                        file: "SearchHighlight.js"
                    });
                    localStorage["hightlight_mode"] = 'n';
                    _gaq.push(['_trackEvent', 'click', 'No', localStorage["install_date"]]);
                    
                    
                }
                else {
                    chrome.browserAction.setIcon({
                        path: 'icon.png'
                    });
                    chrome.tabs.insertCSS(null, {
                        file: "SearchHighlight.css"
                    });
                    chrome.tabs.executeScript(null, {
                        file: "SearchHighlight.js"
                    });
                    localStorage["hightlight_mode"] = 'y';
                    
                    _gaq.push(['_trackEvent', 'click', 'Yes', localStorage["install_date"]]);
                    
                    
                }
                
                /*chrome.tabs.executeScript(alert(title));
                 chrome.tabs.executeScript(SearchHighlight(document));*/
            });
			

            
       
            
      
