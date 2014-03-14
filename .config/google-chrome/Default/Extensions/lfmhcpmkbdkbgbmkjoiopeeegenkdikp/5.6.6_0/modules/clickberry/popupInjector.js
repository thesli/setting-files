function injectClickberry(clbrACSNamespace) {

    var w               =   document.getElementById('clickberryInjectedWindow');
    if (w) {

        w.parentNode.removeChild(w);

    } else {
        
        var urlAppendix  =    "";
        
        
        if (clbrACSNamespace) {
            urlAppendix     =   "?acsNamespace="+clbrACSNamespace;
        } else {
            clbrACSNamespace    =   "prod";
        }
        
        var wnd_i                   =   document.createElement('iframe');
        wnd_i.src                   =   "https://az411958.vo.msecnd.net/addon/std/v2.3.2.2/popup.html"+urlAppendix;
        wnd_i.width                 =   '280';
        wnd_i.height                =   '330';
        wnd_i.style['border']       =   "none";

        var wnd                     =   document.createElement('div');
        wnd.id                      =   'clickberryInjectedWindow';
        var corner                  =   document.createElement('div');
        corner.id                   =   'clickberryInjectedWindowCorner';
        
        wnd.appendChild(corner);
        wnd.appendChild(wnd_i);
        
        
        var style     =     document.createElement('link');
        style.type  = "text/css";
        style.rel   = "stylesheet";
        style.href  = chrome.extension.getURL("/modules/clickberry/clickberry.css");

        document.getElementsByTagName('head')[0].appendChild(style);
        document.getElementsByTagName('body')[0].appendChild(wnd);
        
    }

}

chrome.storage.sync.get("clbrExtensionVersion", function (data) {
    
    console.log("clbrACSNamespace: ",data);
    
    var clbrExtensionVersion    =   "clickberry";
    
    if (data["clbrExtensionVersion"]) {
        clbrExtensionVersion    =   data["clbrExtensionVersion"];
    }
    
    injectClickberry(clbrExtensionVersion);
});
