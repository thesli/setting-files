function Clickberry () {

    Clickberry.active      =   true;
    
    Clickberry.tagButtonValue   =   "Select";
    
    Clickberry.tooltipHTML    =   '<style>#clickberry_tt_main{position:absolute;z-index:10000;width:450px;height:200px;left:inherit;top:inherit;color:#ffffff;font-size:20px;font-family:open-sans, Arial, Helvetica, sans-serif;line-height:35px;}#clickberry_tt_main a{color:#ffffff;}#clickberry_tt_container{width:100%;height:153px;background:url(https://az411958.vo.msecnd.net/addon/std/tooltip/tt_back.png);}#clickberry_tt_triangle{width:63px;height:47px;background:url(https://az411958.vo.msecnd.net/addon/std/tooltip/tt_triangle.png) no-repeat;margin:auto;}#clickberry_tt_close{background: url(https://az411958.vo.msecnd.net/addon/std/tooltip/tt_close.png) no-repeat;width: 28px;height: 28px;right: -14px;margin-top: -14px;position: absolute;cursor:pointer;box-shadow: 0 0 15px #ffffff;border-radius: 14px;}#clickberry_tt_text{width:100%;height:103px;padding:25px;}#clickberry_tt_tag_button{background:url(https://az411958.vo.msecnd.net/addon/std/tooltip/share_button.png);width:74px;height:28px;margin-bottom:-7px;display:inline-block;}#clickberry_tt_learn{margin-left:-50px;margin-top:15px;text-align:center;font-style:italic;}</style><div id="clickberry_tt_main"><div id="clickberry_tt_container"><div id="clickberry_tt_close"></div><div id="clickberry_tt_text"> You can now comment inside this video! <br/> Click <span id="clickberry_tt_tag_button"></span> button at your favorite moment <div id="clickberry_tt_learn">(<a href="http://get.clickberry.com/welcome-to-clickberry-1/" target="_blank">Learn more about it...</a>)</div></div></div><div id="clickberry_tt_triangle"></div></div>';
    
    Clickberry.CBYTPlayer  =   {

        player              :   null,
        container           :   null,
        html5               :   false,
        tagVideo            :   null,
        
        cwidth              :   1,
        cheight             :   1,
        

        init                :   function (container, player) {
    
            
    
            if (player.className.indexOf('html5-video-player') > -1) {
                
                try {
                    
                    var player                          =   document.getElementById("movie_player");
                    Clickberry.CBYTPlayer.tagVideo      =   document.getElementsByClassName("html5-main-video")[0];
                    Clickberry.CBYTPlayer.html5         =   true;
                    player.style.position               =   "relative";
//                    player.style.width                  =   "100%";
//                    player.style.height                 =   "100%";
                    player.style['z-index']             =   "1";
                    
                    window.onunload     =   function () {
                        try {
                            Clickberry.CBYTPlayer.tagVideo.pause();
                        } catch (e) {
                            
                        }
                    };
                    
                } catch (e) {
                    console.log('Invalid player');
                }
                
            } else {
                
                if ( Clickberry.CBYTPlayer.html5 ) {
                    location.reload();
                }
                
            }
    
    
            Clickberry.CBYTPlayer.player       =   player;
            Clickberry.CBYTPlayer.container    =   container;
            
            
            Clickberry.CBYTPlayer.player.addEventListener('onStateChange', "Clickberry.playerOnStateChangeListener");
            Clickberry.CBYTPlayer.player.addEventListener('onPlaybackQualityChange', "Clickberry.playerOnPlaybackQualityChangeListener");
            Clickberry.CBYTPlayer.player.addEventListener('onError', "Clickberry.playerOnErrorListener");
            
            setInterval(function () {
                
                try {
                
                    var state       =   Clickberry.CBYTPlayer.player.getPlayerState();
                    var duration    =   Clickberry.CBYTPlayer.player.getDuration();

                    if (state === 1 || (state === 2 && duration > 1 ) ) {

                        if (Clickberry.active) {
                            ClickBerryTagger.showButton();
                            Clickberry.Tagger.Element.showTooltip();
                        } else {
                            ClickBerryTagger.close();
                            ClickBerryTagger.hideButton();
                            Clickberry.Tagger.Element.hideTooltip(false);
                        }
                    } else {
                        ClickBerryTagger.hideButton();
                        Clickberry.Tagger.Element.hideTooltip(false);
                    }
                
                } catch (e) {
                    
                    console.log("Error");
                    
                }
                
            }, 1000);
            
            
            if (Clickberry.CBYTPlayer.html5) {
                Clickberry.CBYTPlayer.tagVideo.pause();
                Clickberry.CBYTPlayer.tagVideo.play();
            }
            
            
        },

        setSize             :   function (data) {
    
            var width = data.width, height  =   data.height;
    
            container.width                         =   width;
            container.height                        =   height;
            container.style.width                   =   width;
            container.style.height                  =   height;
            Clickberry.CBYTPlayer.cwidth            =   width;
            Clickberry.CBYTPlayer.cheight           =   height;
            
        },

        seekTo              :   function (data) {
    
            
        
            var paused      =   (Clickberry.CBYTPlayer.html5)?Clickberry.CBYTPlayer.tagVideo.paused:false;
            
            var seconds     =   data.seconds, allowSeekAhead   =   data.allowSeekAhead;
    
            var duration    =   Clickberry.CBYTPlayer.player.getDuration();
            
            if (seconds >= duration) {
                seconds     =   duration-1;
            }
    
            Clickberry.CBYTPlayer.player.seekTo(seconds, allowSeekAhead);
            
            if (Clickberry.CBYTPlayer.html5) {
            
                Clickberry.CBYTPlayer.tagVideo.currentTime     =   seconds;
            
                if (paused) {
                    Clickberry.CBYTPlayer.tagVideo.pause();
                }
            
            }
            
        },

        getCurrentTime      :   function () {
    
            if (Clickberry.CBYTPlayer.html5) {
                return Clickberry.CBYTPlayer.tagVideo.currentTime;
            }
    
            return Clickberry.CBYTPlayer.player.getCurrentTime();
        },

        pauseVideo          :   function () {
            Clickberry.CBYTPlayer.player.pauseVideo();
        },

        playVideo           :   function () {
            Clickberry.CBYTPlayer.player.playVideo();
        },  

        stopVideo           :   function () {
            Clickberry.CBYTPlayer.player.stopVideo();
        },

        getVideoUrl         :   function () {
            return Clickberry.CBYTPlayer.player.getVideoUrl();
        },

        loadVideoById       :   function (data) {
    
            var videoId =   data.videoId, startSeconds =   data.startSeconds, suggestedQuality =   data.suggestedQuality;
    
            Clickberry.CBYTPlayer.player.loadVideoById(videoId, startSeconds, suggestedQuality);
        },  

        getPlaybackQuality  :   function () {
            return Clickberry.CBYTPlayer.player.getPlaybackQuality();
        },
                
        setPlaybackQuality  :   function (data) {
            
            var suggestedQuality    =   data.suggestedQuality;
    
            Clickberry.CBYTPlayer.player.setPlaybackQuality(suggestedQuality);
        },

        getDuration         :   function () {
            if (Clickberry.CBYTPlayer.html5) {
                return Clickberry.CBYTPlayer.tagVideo.duration;
            }
            return Clickberry.CBYTPlayer.player.getDuration();
        },

        addEventListener    :   function (event, source, request_id) {
    
//            console.log("set Event ", event);
    
            if (!Clickberry.eventsListeners[event]) {
                Clickberry.eventsListeners[event]   =   [];
            }
            
            Clickberry.eventsListeners[event][request_id]   =   source;
    
        },  
        
        showTagger          :   function (time) {
            
            if (!time) { time = 0 ; }
            
            if (ClickBerryTagger.ready) {  // READY
            
                ClickBerryTagger.show();

                var iframes = document.getElementsByTagName('iframe');

                for (var ifr_n in iframes) {

                    if ( iframes[ifr_n].getAttribute && iframes[ifr_n].getAttribute("wndID") ) {

                        iframes[ifr_n].contentWindow.postMessage({type:"startTagging"},"*");

                    } 

                }
                
            } else {
                
                time ++;
                
                console.log("Start tagging try: ", time);
                
                if (time < 6) {
                    
                    setTimeout(function () {
                        Clickberry.CBYTPlayer.showTagger(time);
                    }, 1000);
                    
                }
                
            }
            
        },  
                
        closeTagger          :   function () {
//            console.log("closeTagger");
            
            ClickBerryTagger.close();
        }, 
        
        showTagButton       :   function () {
            ClickBerryTagger.showButton();
        },
                
        hideTagButton       :   function () {
            ClickBerryTagger.hideButton();
        }

    };


    

    var ClickBerryTagger  =   {
    
        playerLink          :   "",
        taggerContainer     :   null,
        player              :   null,
        playerContainer     :   null,
        tagButton           :   null,
        ready               :   false,

        show                :   function () {
            
            ClickBerryTagger.taggerContainer.style['z-index']    =   "-1000000";
            ClickBerryTagger.taggerContainer.style.width        =   "inherit";
            ClickBerryTagger.taggerContainer.style.height       =   "inherit";
            ClickBerryTagger.taggerContainer.style['z-index']    =   "1000000";
//            var btn  =   document.getElementById("clickberry_tag_button");
//            btn.style.display    =   "none";
        },
                
        close               :   function () {
            ClickBerryTagger.taggerContainer.style['z-index']    =   "-1000000";
//            ClickBerryTagger.taggerContainer.style.width    =   "1px";
//            ClickBerryTagger.taggerContainer.style.height   =   "1px";
//            var btn  =   document.getElementById("clickberry_tag_button");
//            btn.style.display    =   "block";
        },
                
        showButton          :   function () {
            if (Clickberry.active) {
                ClickBerryTagger.tagButton.style.display      =   "block";
            } else {
                Clickberry.CBYTPlayer.hideTagButton();
                Clickberry.CBYTPlayer.closeTagger();
            }
        },
                
        hideButton          :   function  () {
            ClickBerryTagger.tagButton.style.display      =   "none";
        },

        onResize            :   function  () {
    
            ClickBerryTagger.taggerContainer.style["margin-top"]    =   "-"+ClickBerryTagger.playerContainer.clientHeight+"px";
//            ClickBerryTagger.taggerContainer.style["margin-top"]    =   (Clickberry.CBYTPlayer.html5)?"0px":("-"+ClickBerryTagger.playerContainer.clientHeight+"px");
            ClickBerryTagger.tagButton.style["margin-left"]         =   (ClickBerryTagger.playerContainer.clientWidth/2)-(45/2)+"px";
            
            var zoomLevel = window.document.width / window.document.body.clientWidth;
            
            ClickBerryTagger.tagButton.style.width                  =   45/zoomLevel+"px";
            ClickBerryTagger.tagButton.style.height                 =   17/zoomLevel+"px";
//            ClickBerryTagger.tagButton.style["margin-top"]          =   (Clickberry.CBYTPlayer.html5)?(ClickBerryTagger.playerContainer.clientHeight-22)+"px":(-22/zoomLevel+"px");
            ClickBerryTagger.tagButton.style["margin-top"]          =   (-22/zoomLevel+"px");
            ClickBerryTagger.tagButton.style["margin-left"]         =   ((ClickBerryTagger.playerContainer.clientWidth)/2)-((45/zoomLevel)/2)+"px";
            
            
        },

        updatePlayer        :   function (playerContainer, player, src) {

            var tb      =   document.getElementById("clickberry_tag_button");
            var tp      =   document.getElementById("tagger-container_");

            if (player && !(tb && tp)) {
                
                
                Clickberry.CBYTPlayer.init(playerContainer, player);

                ClickBerryTagger.ready              =   false;
                ClickBerryTagger.player             =   player;
                ClickBerryTagger.playerContainer    =   playerContainer;

                ClickBerryTagger.playerLink         =   src;

                ClickBerryTagger.Element.TagButton();
                ClickBerryTagger.Element.Extension();
                
            }

        },


        controlPlayer   : function (request, params, source) {
            
            if (Clickberry.CBYTPlayer[request]) {
                var res     =   null;
                
                if (request !== "addEventListener") {
                    res     =   Clickberry.CBYTPlayer[request](params);
                } else {
                    Clickberry.CBYTPlayer[request](params['event'], source, params['request_id']);
                }
                
                if (res) {
                    source.postMessage({type:"returnControlParams", request_id:params['request_id'], result: res},"*");
                }
                
            }
            
        },


        Element         :   {

            Extension       :   function () {

                        ClickBerryTagger.taggerContainer                        =   document.createElement('div');
                        ClickBerryTagger.taggerContainer.id                     =   "tagger-container";
                        ClickBerryTagger.taggerContainer.style.width            =   "inherit";
                        ClickBerryTagger.taggerContainer.style.height           =   "inherit";
                        ClickBerryTagger.taggerContainer.style.position         =   "absolute";
                        ClickBerryTagger.taggerContainer.style.top              =   "inherit";
                        ClickBerryTagger.taggerContainer.style.left             =   "inherit";
                        ClickBerryTagger.taggerContainer.style.overflow         =   "hidden";
                        ClickBerryTagger.taggerContainer.style["z-index"]       =   "-1000000";
                        ClickBerryTagger.taggerContainer.style["margin-top"]    =   "-"+ClickBerryTagger.playerContainer.clientHeight+"px";
//                        ClickBerryTagger.taggerContainer.style["margin-top"]    =   (Clickberry.CBYTPlayer.html5)?"0px":"-"+ClickBerryTagger.playerContainer.clientHeight+"px";

                        var taggerContainerInner                =   document.createElement('div');
                        taggerContainerInner.style.width        =   "100%";
                        taggerContainerInner.style.height       =   "100%";
                        taggerContainerInner.id                 =   "tagger-container-inner";
                        
                        
                        
                        Clickberry.CBYTPlayer.cwidth           =   ClickBerryTagger.playerContainer.clientWidth;
                        Clickberry.CBYTPlayer.cheight          =   ClickBerryTagger.playerContainer.clientHeight;
                        
                        
                        setInterval(function () {
                                ClickBerryTagger.onResize();
                        }, 500);
                        
                        
                        ClickBerryTagger.taggerContainer.appendChild(taggerContainerInner);


                        ClickBerryTagger.playerContainer.appendChild(ClickBerryTagger.taggerContainer);

                        replaceContainer(ClickBerryTagger.taggerContainer, ClickBerryTagger.playerLink, 0, true);


            },
                    
            TagButton   :   function () {
        
                var tagButton  =   document.createElement('button');
                
                var pos     =   getPosition(ClickBerryTagger.player);
                
                tagButton.value                     =   Clickberry.tagButtonValue;
                tagButton.id                        =   "clickberry_tag_button";
                tagButton.innerHTML                 =   Clickberry.tagButtonValue;
                tagButton.style.margin              =   "auto";
                tagButton.style.display             =   "none";
                tagButton.style.height              =   "17px";
                tagButton.style.width               =   "45px";
                tagButton.style.position            =   "absolute";
                tagButton.style.cursor              =   "pointer";
                tagButton.style["margin-left"]      =   ((ClickBerryTagger.playerContainer.clientWidth/2)-(45/2))+"px";
                tagButton.style["margin-top"]       =   "-22px";
//                tagButton.style["margin-top"]       =   (Clickberry.CBYTPlayer.html5)?(ClickBerryTagger.playerContainer.clientHeight-22)+"px":"-22px";
                tagButton.style["z-index"]          =   "100000";
                tagButton.style["background-color"] =   "#757575";
                tagButton.style["color"]            =   "#1b1b1b";
                tagButton.style["text-align"]       =   "center";
                tagButton.style["border-radius"]    =   "3px";
                tagButton.style["box-shadow"]       =   "1px 1px 1px black";
                tagButton.style["font-size"]        =   "12px";
                tagButton.style["font-weight"]      =   "bold";

                tagButton.addEventListener('click',function () {
                    ClickBerryTagger.Element.taggerEmbed();
                    ClickBerryTagger.Element.hideTooltip(true);
                });
             
                ClickBerryTagger.tagButton      =   tagButton;
             
                ClickBerryTagger.playerContainer.appendChild(tagButton);
                
                ClickBerryTagger.Element.Tooltip();
                
            },
            
            Tooltip         :   function () {
                
                this.timer      =   null;
                
                if (!localStorage['clickberryTooltipClosed']) {
                
                    var tagTooltip  =   document.createElement('div');

                    tagTooltip.innerHTML +=  Clickberry.tooltipHTML;
                    tagTooltip.id                       =   "clickberry-tt-main-box";
                    tagTooltip.style["margin"]          =   "auto";
                    tagTooltip.style["margin-top"]      =   "-222px";
                    tagTooltip.style["width"]           =   "450px";
                    tagTooltip.style["height"]          =   "200px";
                    tagTooltip.style["display"]         =   "none";
                    tagTooltip.style["zoom"]          =   "0.7";

                    ClickBerryTagger.playerContainer.appendChild(tagTooltip);


                    var tooltipCloseBtn     =   document.getElementById("clickberry_tt_close");

                    tooltipCloseBtn.addEventListener('click',function () {
                        ClickBerryTagger.Element.hideTooltip(true);
                    });
                    
                
                }
                
            },
             
            ttClosedByTimer   :   false,
             
            showTooltip     :   function () {
                
                
                if (!localStorage['clickberryTooltipClosed'] && !Clickberry.Tagger.ttClosedByTimer) {
                    
//                    clearTimeout(Clickberry.Tagger.Element.Tooltip.timer);
                    
                    var tt      =   document.getElementById("clickberry-tt-main-box");

                    if (tt) {
                        tt.style.display        =   "block";
                    }
                }
                
                Clickberry.Tagger.Element.Tooltip.timer  =   setTimeout(function  () {
                    Clickberry.Tagger.ttClosedByTimer   =   true;
                    ClickBerryTagger.Element.hideTooltip(false);
                }, 20000);
            },
            
            hideTooltip     :   function (forever) {
                
                clearTimeout(Clickberry.Tagger.Element.Tooltip.timer);
                
                var tt      =   document.getElementById("clickberry-tt-main-box");
                
                if (tt) {
                    tt.style.display        =   "none";
                }
                
                if (forever) {
                    localStorage['clickberryTooltipClosed'] = true;
                }
                
            },
             

            taggerEmbed     :   function () {
                Clickberry.CBYTPlayer.showTagger(0);
            }

        }

    };
    
    Clickberry.Tagger   =   ClickBerryTagger;

    var v           =   "PROD";
    var addonType   =   'standalone';

    var CurrentLocation     =   location.href;

    function getParams(selector) {

        try {

            var script = document.getElementById(selector);

            var src = script.src.toString().split('?');

            var args = src[src.length - 1]; // выбираем последнюю часть src после ?
            args = args.split("&"); // разбиваем параметры &
            var parameters = {};
            for (var i = args.length - 1; i >= 0; i--) // заносим параметры в результирующий объект
            {
                var parameter = args[i].split("=");
                parameters[parameter[0]] = parameter[1];
            }

        } catch (e) {

        }
        return parameters;
    }

    var print_r = function(obj, t) {

        // define tab spacing
        var tab = t || '';

        // check if it's array
        var isArr = Object.prototype.toString.call(obj) === '[object Array]' ? true : false;

        // use {} for object, [] for array
        var str = isArr ? ('Array\n' + tab + '[\n') : ('Object\n' + tab + '{\n');

        // walk through it's properties
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                var val1 = obj[prop];
                var val2 = '';
                var type = Object.prototype.toString.call(val1);
                switch (type) {

                    // recursive if object/array
                    case '[object Array]':
                    case '[object Object]':
                        val2 = print_r(val1, (tab + '\t'));
                        break;

                    case '[object String]':
                        val2 = '\'' + val1 + '\'';
                        break;

                    default:
                        val2 = val1;
                }
                str += tab + '\t' + prop + ' => ' + val2 + ',\n';
            }
        }

        // remove extra comma for last property
        str = str.substring(0, str.length - 2) + '\n' + tab;

        return isArr ? (str + ']') : (str + '}');
    };

    function getURLParameters(paramName)
    {
        
        var sURL = window.document.URL.toString();
        if (sURL.indexOf("?") > 0)
        {
            var arrParams = sURL.split("?");
            var arrURLParams = arrParams[1].split("&");
            var arrParamNames = new Array(arrURLParams.length);
            var arrParamValues = new Array(arrURLParams.length);
            var i = 0;
            for (i = 0; i < arrURLParams.length; i++)
            {
                var sParam = arrURLParams[i].split("=");
                arrParamNames[i] = sParam[0];
                if (sParam[1] !== "")
                    arrParamValues[i] = unescape(sParam[1]);
                else
                    arrParamValues[i] = null;
            }

            for (i = 0; i < arrURLParams.length; i++)
            {
                if (arrParamNames[i] === paramName) {
                    //alert("Param:"+arrParamValues[i]);
                    return arrParamValues[i];
                }
            }
            return false;
        }

    }

    var clearElement = function(el) {

        while (child = el.firstChild) {
            el.removeChild(child);
        }

    };

    var getPosition = function(who) {
        var T = 0, L = 0;
        while (who) {
            L += who.offsetLeft;
            T += who.offsetTop;
            who = who.offsetParent;
        }
        return [L, T];
    };


    var sendChanges = function(type, wndIDParam) {

        if (!type) {
            type = "windowChanges";
        }

        var scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        var scrollY = window.pageYOffset || document.documentElement.scrollTop;

        var iframes = document.getElementsByTagName('iframe');

        for (var ifr_n in iframes) {

            if (iframes[ifr_n].getAttribute && (iframes[ifr_n].getAttribute("wndID") || (iframes[ifr_n].getAttribute("name") && iframes[ifr_n].getAttribute("name").toString().indexOf("cbplayer") >= 0))) {

                var pos = getPosition(iframes[ifr_n]);

                var wndID = iframes[ifr_n].getAttribute("wndID");
                var wnd = iframes[ifr_n].contentWindow;

                var width = iframes[ifr_n].width;
                var height = iframes[ifr_n].height;
                
                if ((wndIDParam && wndIDParam === wndID) || (!wndIDParam)) {
                    wnd.postMessage({type: type, scrollX: scrollX, scrollY: scrollY, left: pos[0], top: pos[1], width: width, height: height, wndID: wndID}, "*");
                }
            }
        }

    };

    var replaceOnYoutube = function(second_try) {

        var container = document.getElementById('player-api');
        
        if (container) {
            
            var player  =   document.getElementById('movie_player');
            
            var src     =   location.href;
            if (ytplayer.config.args.allow_embed) {
                
                if (player) {
                    
                    player.addEventListener('onReady', function (event) {
                        console.log("Youtube player ready!");
                    });
                    
                    if (player.getPlayerState) {
                    
                        ClickBerryTagger.updatePlayer(container, player, src);
                    
                    } else {
                        
                        
                            if (!second_try) {
                        
                                setTimeout(function () {
                                    console.log('Once more try');
                                    replaceOnYoutube(true);
                                }, 2000);

                            } else {
//                                ClickBerryTagger.updatePlayer(container, player, src);
//                                replaceContainer(container, src, 1);
                            }
                        
//                        player.addEventListener('onReady', function (event) {
//                            
//                            console.log("Youtube player ready!");
//                            
//                            ClickBerryTagger.updatePlayer(container, player, src);
//                        });
                        
                    }
                    
                } else {
                    
                    console.log('Can\'t find Youtube player');
                    
                    if (!second_try) {
                        
                        setTimeout(function () {
                            console.log('Once more try');
                            replaceOnYoutube(true);
                        }, 2000);
                        
                    } else {
//                        replaceContainer(container, src, 1);
                    }
                    
                }
                
            }
            
        }
        


    };


    var getVideoId      =   function (url) {
        var spl         =   url.toString().split("?");
        var splited     =   spl[0].toString().split("/");
        return splited[(splited.length-1)];
    };



    var replaceEmbededPlayers = function() {
            var iframes = document.getElementsByTagName('iframe');

            for (var i_n in iframes) {
                
                var src = iframes[i_n].src;

                if (src && (
                        (src.indexOf('youtube.com/embed') > 0 && src.indexOf('youtube.com/embed') < 20)
                        || (src.indexOf('youtube-nocookie.com/embed') > 0 && src.indexOf('youtube.com/embed') < 20))
                        ) {
                
                            var wndID = getVideoId(src);
                            iframes[i_n].setAttribute("wndID",wndID);
                
                        }
            }
    };
    

    var replaceContainer = function(container, videoLink, autoPlay, overlay) {


        var embed       =   "1";
        
        if (overlay) {
            embed       =   "0";
        }


        container.id        =   container.id+'_';

        var width           = container.offsetWidth;
        var height          = container.offsetHeight;

        var pos             = getPosition(container);

        var wndLeft         = pos[0];
        var wndTop          = pos[1];
        

        var wndID = "clickberry_tagger_" + Math.round(Math.random() * 1000);

        var src = 'https://clickberry.tv/extension/?productName=ClickBerry%20YouTube%20Extension&externalVideoLink=' + encodeURIComponent(videoLink) + '&width=' + width + '&height=' + height + '&left=' + wndLeft + '&top=' + wndTop + '&wndID=' + wndID + '&autoPlay=' + autoPlay + '&acsNamespace=clickberry&addonType='+addonType+'&embed='+embed;

        if (v === "QA") {
            src = 'https://qa.clickberry.tv/extension/?productName=ClickBerry%20YouTube%20Extension&externalVideoLink=' + encodeURIComponent(videoLink) + '&width=' + width + '&height=' + height + '&left=' + wndLeft + '&top=' + wndTop + '&wndID=' + wndID + '&autoPlay=' + autoPlay + '&acsNamespace=clickqa&addonType='+addonType+'&embed='+embed;
        }
        
        
        if (v === "local") {
            src = 'https://local.clickberry.tv:444/extension/?productName=ClickBerry%20YouTube%20Extension&externalVideoLink=' + encodeURIComponent(videoLink) + '&width=' + width + '&height=' + height + '&left=' + wndLeft + '&top=' + wndTop + '&wndID=' + wndID + '&autoPlay=' + autoPlay + '&acsNamespace=clicklocal&addonType='+addonType+'&embed='+embed;
        }
        
        if (v === "auto") {
            src = 'https://auto.clickberry.tv/extension/?productName=ClickBerry%20YouTube%20Extension&externalVideoLink=' + encodeURIComponent(videoLink) + '&width=' + width + '&height=' + height + '&left=' + wndLeft + '&top=' + wndTop + '&wndID=' + wndID + '&autoPlay=' + autoPlay + '&acsNamespace=clickauto&addonType='+addonType+'&embed='+embed;
        }

        if (v === "PL") {
            src = 'https://pl.clickberry.tv/extension/?productName=ClickBerry%20YouTube%20Extension&externalVideoLink=' + encodeURIComponent(videoLink) + '&width=' + width + '&height=' + height + '&left=' + wndLeft + '&top=' + wndTop + '&wndID=' + wndID + '&autoPlay=' + autoPlay + '&acsNamespace=clickplsus&addonType='+addonType+'&embed='+embed;
        }


        var clickberry = '<iframe src="' + src + '" width="' + width + '" height="' + height + '" wndID="' + wndID + '" id="' + wndID + '" name="' + wndID + '" frameborder="0" allowfullscreen></iframe>';

        var urlNow = location.href;

        if (urlNow.toString().indexOf("youtube.com") > 0 || urlNow.toString().indexOf("youtu.be") > 0) {

            clickberry = '<iframe src="' + src + '" width="100%" height="100%" wndID="' + wndID + '" id="' + wndID + '" name="' + wndID + '" frameborder="0" allowfullscreen></iframe>';

        }

        var player = document.getElementById('movie_player');

        if (player) {

        }


        clearElement(container);

        container.innerHTML = clickberry;

        window.onscroll = function() {

            sendChanges();

        };

        window.onresize = function(event) {

            sendChanges();

        };

        setTimeout(function() {
            var myContainer = document.getElementById(wndID);

            if (!myContainer) {
                replaceContainer(container, videoLink, autoPlay);
            } else {
            }

        }, "2000");

    };

    var replaceAll = function() {

        var p = getParams("clickberry-standalone-script");

        if (p['v'] && p['v'] === "QA") {
            v = "QA";
        }

        if (p['v'] && p['v'] === "local") {
            v = "local";
        }

        if (p['v'] && p['v'] === "auto") {
            v = "auto";
        }
        
        if (p['v'] && p['v'] === "PL") {
            v = "PL";
        }


        
        if (p['addonType'] && p['addonType'] === "imageshack") {
            addonType   =   "imageshack";
        } else if (p['addonType'] && p['addonType'] === "fvd") {
            addonType   =   "fvd";
        } {
            addonType   =   "standalone";
        }



        window.addEventListener('message', function(event) {
            if (event.data.type === 'checkExtension') {
                window.postMessage({type: "checkExtensionResult"}, "*");
            }
    
        });

        replaceOnYoutube();
        replaceEmbededPlayers();

    };




    window.addEventListener("message", function(event) {
        
        if (event.data.type && event.data.type === "getPageParams") {
            sendChanges('returnPageParams', event.data.wndID);
        }


        if (event.data.type === "returnClickberryState") {

            Clickberry.active       =   (event.data.state === "true")?true:false;

            if (event.data.state === "true") {
                replaceAll();
            }

        }
        
        
        if (event.data.type === "sendControlParams") {

            if (event.data.request) {
                ClickBerryTagger.controlPlayer(event.data.request, event.data, event.source);
            }

        }
        
        if (event.data.type === "onTaggerReady") {
            
            console.log("TaggerReady");
            ClickBerryTagger.ready    =   true;

        }
        
    });

    setInterval(function () {
        
        window.postMessage({type: "getClickberryState"}, "*");
        
    }, 1000);


    var AjaxChangeDetect    =   function () {
    
        var s_ajaxListener = new Object();

        s_ajaxListener.tempOpen = XMLHttpRequest.prototype.open;
        s_ajaxListener.tempSend = XMLHttpRequest.prototype.send;
        s_ajaxListener.callback = function () {

          var i = 0;

          var timer     =   setInterval(function () {
                
                i++;
                
                if (CurrentLocation !== location.href) {

                    clearInterval(timer); 

                    if (location.href.toString().indexOf("youtube.com") > -1) {
                        
//                        var btn     =   document.getElementById("clickberry_tag_button");
//                        if (!btn) {
//                            replaceAll();
//                            
                            window.postMessage({type: "getClickberryState"}, "*");
//                            
//                        } else {
//                            btn.style.display   =   "none";
//                        }
                        
                    }

                    CurrentLocation   =   location.href;

                    var iframes = document.getElementsByTagName('iframe');

                    for (var ifr_n in iframes) {

                        if ( iframes[ifr_n].getAttribute && iframes[ifr_n].getAttribute("wndID") ) {

                            iframes[ifr_n].contentWindow.postMessage({type:"VideoChanged",url:CurrentLocation},"*");

                        } 

                    }
                    
                    

                }
                    
                if (i>=10) {
                    clearInterval(timer); 
                }
                
          },500);

        };

        XMLHttpRequest.prototype.open = function(a,b) {
            
            try {
            
                if (!a) var a   =   '';
                if (!b) var b   =   '';
                s_ajaxListener.tempOpen.apply(this, arguments);
                s_ajaxListener.method   = a;  
                s_ajaxListener.url      = b;
                s_ajaxListener.obj      = this;
                
                if (a.toLowerCase() === 'get') {
                    s_ajaxListener.data = b.split('?');
                    s_ajaxListener.data = s_ajaxListener.data[1];
                }
          
            } catch (e) {
                
            }
          
        };

        XMLHttpRequest.prototype.send = function(a,b) {
          if (!a) var a='';
          if (!b) var b='';
          s_ajaxListener.tempSend.apply(this, arguments);
          if(s_ajaxListener.method.toLowerCase() === 'post')s_ajaxListener.data = a;
          s_ajaxListener.callback();
        };

    };

    AjaxChangeDetect();

}

Clickberry.eventsListeners      =      [];

Clickberry.playerOnStateChangeListener              =   function (evt) {
   
   var btn  =   document.getElementById("clickberry_tag_button");
   
//   console.log("stateChanged: ",evt);  
   
   if (evt === -1 || ( evt === 2 && Clickberry.CBYTPlayer.getCurrentTime() < 1) || evt === 0) {
//       console.log("stateChanged no button: ",evt);
//       btn.style.display    =   "none";
       Clickberry.CBYTPlayer.hideTagButton();
       Clickberry.Tagger.Element.hideTooltip(false);
        
       
   } else {
//       btn.style.display    =   "block";
       Clickberry.CBYTPlayer.showTagButton();
       Clickberry.Tagger.Element.showTooltip();
   }
   
    if (Clickberry.eventsListeners["onStateChange"]) {
        for (var request_id in Clickberry.eventsListeners["onStateChange"]) {
            
            var source      =   Clickberry.eventsListeners["onStateChange"][request_id];
            
            source.postMessage({type:"returnControlParams", request_id:request_id, result: evt}, "*");
        
        }
    }
    
};
Clickberry.playerOnPlaybackQualityChangeListener    =   function (evt) {
    if (Clickberry.eventsListeners["onPlaybackQualityChange"]) {
        for (var request_id in Clickberry.eventsListeners["onPlaybackQualityChange"]) {
            
            var source      =   Clickberry.eventsListeners["onPlaybackQualityChange"][request_id];
            
            source.postMessage({type:"returnControlParams", request_id:request_id, result: evt}, "*");
        
        }
    }
};
Clickberry.playerOnErrorListener                    =   function (evt) {
    if (Clickberry.eventsListeners["onError"]) {
        for (var request_id in Clickberry.eventsListeners["onError"]) {
            
            var source      =   Clickberry.eventsListeners["onError"][request_id];
            
            source.postMessage({type:"returnControlParams", request_id:request_id, result: evt}, "*");
        
        }
    }
};

//setTimeout(function () {
    Clickberry();
//}, 1000);