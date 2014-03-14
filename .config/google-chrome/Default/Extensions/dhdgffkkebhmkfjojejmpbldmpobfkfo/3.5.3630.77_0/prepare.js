
(function(){var b=20;var a=537.33;var f=false;try{f=(navigator.userAgent.search("OPR/")!=-1)
}catch(g){}try{a=Number(navigator.userAgent.match(/AppleWebKit\/([0-9]+\.[0-9]+)/)[1])
}catch(g){}try{b=parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2])
}catch(g){}var d={createNotification:function(e){},createHTMLNotification:function(e){}};
var c={RUNTIME:{CHROME:!f,OPERA:f,BROWSER_VERSION:b,WEBKIT_VERSION:a,ALLOWS_SAFE_CONTEXT:true,ALLOWS_FAST_DOCUMENT_START:true,NEED_UNSAFEWINDOW_PROXY:(a>=537.35),ALLOWS_FILE_SCHEME_ACCESS:null},ACTIONMENU:{COLUMNS:2},SELF:{ID:(function(){var h=chrome.extension.getURL("/");
var e=h.replace(/\//gi,"").split(":");return(e.length<2)?"":e[1]
})()},DB:{USE_SQL:false,USE_STORAGE:true},XMLHTTPREQUEST:{RETRIES:5},PINGPONG:{RETRIES:5},MISC:{TIMEOUT:1,UNLOAD_TIMEOUT:10},WEBREQUEST:{use:true,headers:true,verified:false,verifyCnt:20,id:0,prefix:"TM_",testprefix:"foobar"},HTML5:{LOCALSTORAGE:null,WEBKITNOTIFICATIONS:d},REQUESTS:{HAS_SENDER_ID:true,INTERNAL_PAGE_URL:"chrome-extension://",GET_INTERNAL_PAGE_REGEXP:function(){return new RegExp(c.REQUESTS.INTERNAL_PAGE_URL+c.SELF.ID+"/([a-zA-Z]*).html")
}},OPTIONS:{HAS_CSP:true,HAS_TESLA:!f,HAS_TAMPERFIRE:true},PREPARED_FOR_BACKGROUND:function(h){try{c.HTML5.LOCALSTORAGE=window.localStorage
}catch(i){console.warn("prep: window.localStorage will be unavailable")
}try{c.HTML5.WEBKITNOTIFICATIONS=window.webkitNotifications
}catch(i){console.warn("prep: window.webkitNotifications will be unavailable")
}try{if(c.HTML5.LOCALSTORAGE){c.DB.NO_WARNING=(c.HTML5.LOCALSTORAGE.getItem("#brokenprofile")==="nowarning");
if(c.HTML5.LOCALSTORAGE.getItem("#storage")==="sql"){console.warn("Prepare to use the webSQL storage although using a different than the default storage is not recommended!");
c.DB.USE_STORAGE=false;c.DB.USE_SQL=true}}}catch(i){}chrome.extension.isAllowedFileSchemeAccess(function(e){c.RUNTIME.ALLOWS_FILE_SCHEME_ACCESS=e;
if(h){h()}});return c}};Registry.register("prepare","3630.77",{FEATURES:c})
})();