
//chrome global routers
AutoPagerNS.message = AutoPagerNS.extend (AutoPagerNS.namespace("message"),
{
    call_function_on_object : function(fn,options,callback,messager)
    {
//        autopagerBwUtil.consoleLog("call_function_on_object:" + fn)
        options = this.prepareOptions(fn,options,callback,messager);
        var msg = {
            fn:fn,
            options:options
        }
        try{
            this.do_call_function_on_object(messager,AutoPagerNS.message.msgname,msg,callback)
        }catch(e){
            autopagerBwUtil.consoleError("error call_function_on_object:" + fn + ":" + messager + ":" + e) 
        }
    },
    do_call_function_on_object : function(messager,msgname,msg,callback)
    {
        if (typeof callback!="undefined")
        {
            msg.options.callback=true
        }
        try{
            if (typeof messager != "undefined")
            {
                if (typeof messager.callback=='function')
                {
                    messager.callback(msg.options);
                }
                else if (messager.id)//messager is a tab here
                {
                    chrome.tabs.sendRequest(messager.id,msg,callback);
                }
            }
        }catch(e){
            autopagerBwUtil.consoleError("error call_function_on_object:" + msg.fn + ":" + messager + ":" + e) 
        }
    }
//    ,
//    request_handler : function(request, sender,callback){
//        if (request==null)
//            return;
//        if (AutoPagerNS.message_handlers[request.fn])
//        {
//            AutoPagerNS.message_handlers[request.fn](request, sender,callback);
//        }            
//    }
}
);


AutoPagerNS = AutoPagerNS.extend(AutoPagerNS,{
    get_browser_name : function ()
    {
        return "chrome";
    },
    walk_windows : function (callback) //walk through browser windows
    {
        //can be override in each browser implementation
        if (!callback)
            return;
        chrome.windows.getAll({}, function(ws){
            for(var k in ws)
            {
                callback(ws[k])
            }
        })
    }
    ,
    walk_tabs : function (win,callback) //walk through browser window tabs
    {
        //can be override in each browser implementation
        if (!callback)
            return;
        chrome.tabs.getAllInWindow(win.id, function (tabs){
            for(var k in tabs)
            {
                callback(win,tabs[k])
            }            
        })
    }
    ,
    get_current_window : function (callback) //get current browser window
    {
        if (callback)
        {
            chrome.windows.getCurrent(callback)
        }
    }
    ,
    get_current_tab : function (callback) //get current browser tb
    {
        if (callback)
        {
            chrome.tabs.getSelected(undefined,callback)
        }
    }
    ,
    get_messager : function (tab) //get messager
    {
        if (tab)
            return tab;
        return null;
    }
    ,
    get_tab_content : function (tab) //get messager
    {
        if (tab)
            return tab;
        return null;
    },
    get_tab_url : function (tab) //get tab_url
    {
        if (tab)
            return tab.url;
        return null;
    }
    ,
    close_tab : function (tab) //get tab_url
    {
        if (tab)
            chrome.tabs.remove(tab.id);
        return null;
    }
    ,
    get_accept_languages : function(callback)
    {
        if (callback)
            chrome.i18n.getAcceptLanguages(callback)
    }
    ,
    get_url : function (relative)
    {
        if (relative.indexOf("/")==0)
            relative = relative.substr(1);
        return chrome.extension.getURL(relative);
    }
});

function autopager_request_handler(request, sender, callback){
    if (request==null)
        return;
//    autopagerBwUtil.consoleLog("messageManager APInternalMessage")
    if (request && request.fn)
    {
        if (request.options && !request.options.tabid && sender && sender.tab && sender.tab.id)
        {
            request.options.tabid = sender.tab.id;
        }
        AutoPagerNS.message.request_handler(request,{
            sender:sender,
            callback:callback
        })
    }
}

chrome.extension.onRequest.addListener(autopager_request_handler);
//chrome.extension.onRequestExternal.addListener(autopager_request_handler);

AutoPagerNS.browser = AutoPagerNS.extend (AutoPagerNS.namespace("browser"),
{
    post_init : function()
    {
        window.addEventListener("load",function(){
            window.addEventListener("unload", function(){
                autopagerPrefServer.savePref('last_version',autopagerUtils.version);
            }, true);
        },false);
        
        var lastTabId = 0;
        function refreshIcon(tab) {
            lastTabId = tab.id;
            lazyRefreshIcon(tab.id);
        }
        chrome.tabs.onSelectionChanged.addListener(refreshIcon);
        chrome.tabs.getSelected(null, refreshIcon);
        chrome.tabs.onCreated.addListener(refreshIcon);
        chrome.tabs.onUpdated.addListener(refreshIcon);
            
        function lazyRefreshIcon (tabId)
        {
            window.setTimeout(function(){
                AutoPagerNS.message.call_function("autopager_get_status",{});
            }, 1000);
        }
    }
    ,open_alert1 : function (title,message,link,callback,options)
    {
        //TODO: user webkitNotifications
        window.arguments = []
        window.arguments.push(title);
        window.arguments.push(message);
        window.arguments.push(link);
        window.arguments.push(callback);
        if (options && options.openTimeout)
            window.arguments.push(options.openTimeout);
        var width = (title.length + message.length)*10+40;
        var height = 60;
        var left = (screen.availLeft + screen.availWidth - window.outerWidth) - 10;
        var top = screen.availTop + screen.availHeight;
        var win = AutoPagerNS.createWindow(AutoPagerNS.get_url("/content/alert.html"),
            "alert:alert",
            "chrome,dialog=yes,titlebar=no,width=" + width + "px,height=" + height + "px,left=" + left + "px,top=10000px,popup=yes",
            title,message,link,callback);
        if (win)
            win.focus();
        return win;
    }
    ,open_notification1 : function (id,message,buttons,callback,options)
    {
        //TODO: user webkitNotifications
            if (id && message)
            {
                var width=300;
                var height=150;
                var left= (window.screen.width - width)/2
                var top = (window.screen.height - height)/3
                var w =   window.open('about:blank',id,
                    'location=no,links=no,scrollbars=no,toolbar=no,left=' + left
                    +',top=' + top
                    +',width=' + width
                    + ',height=' + height);
                var doc = w.document
                doc.title = message
                
                var img = doc.createElement('img');
                img.setAttribute('src',AutoPagerNS.get_url('/skin/classic/autopager32.png'));
                doc.body.appendChild(img);
                var msgbox = doc.createElement('b');
                msgbox.textContent = message;
                doc.body.appendChild(msgbox);
                doc.body.appendChild(doc.createElement('br'));

                for(var i=0;i<buttons.length;i++)
                {
                    //not support popup yet
                    if (buttons[i].popup)
                        continue;
                    var button = doc.createElement('input');
                    button.setAttribute('type','button');
                    button.setAttribute('value',buttons[i].label);
                    button.setAttribute('id',i);
                    button = doc.body.appendChild(button)
                    doc.body.appendChild(doc.createTextNode(' '))
                    button.addEventListener('click',function(event){
                        callback({
                            "notification_id":id,
                            "button":event.target.id
                            });
                        w.close();
                    },false)
                }
                
                try{
                    w.setTimeout(function(){
                        w.focus();
                    },10)
                }catch(e)
                {}
                
            //con.postMessage({"button":"enabled","value":autopagerPref.loadBoolPref("enabled")});
            }
        
    }
});
AutoPagerNS.buttons = AutoPagerNS.extend (AutoPagerNS.namespace("buttons"),
{
    getIcon : function(enabled,siteenabeld,discoveredRules,options)
    {
        return this.draw(enabled,siteenabeld,discoveredRules,options);
    }
    ,
    showPageIcon : function (show)
    {
        AutoPagerNS.get_current_tab(function(tab) {
                if (tab && tab.id)
                {
                    if (show)
                        chrome.pageAction.show(tab.id);
                    else
                        chrome.pageAction.hide(tab.id);

                }
            })
    }
    ,
    addButton : function(icon)
    {
        this.showPageIcon(true)
    }
    ,
    getButton : function()
    {        
        return this;
    }
    ,removeButton : function()
    {
        this.showPageIcon(false)
    }
    ,setButtonIcon : function(button,icon)
    {
        this.showPageIcon(true);
        AutoPagerNS.get_current_tab(function(tab) {
            if (tab && tab.id)
            {
                if (typeof icon=="string")
                    chrome.pageAction.setIcon({path: icon, tabId: tab.id});
                else
                    chrome.pageAction.setIcon({imageData: icon, tabId: tab.id});
            }
        });
    }
});
autopagerPref = AutoPagerNS.extend (autopagerPref,{
    lzwenc : "lzw-enc-",
    doLoadPref : function(name){
        var v = this.getLocalStorage()[name];
        if (v && v.substring(0, this.lzwenc.length) == this.lzwenc){
            var t = (new Date()).getTime();
            var length = v.length - this.lzwenc.length;
            v = lzw_decode(v.substring(this.lzwenc.length));
            //autopagerBwUtil.consoleLog("lzw_decode:" + v.length + " from " + length + " in " + ((new Date()).getTime()-t));
        }
        return v;
    }
    , doSavePref : function(name,value){
        if (value && value.length>1024){
            var t = (new Date()).getTime();
            var v = lzw_encode(value);
            //autopagerBwUtil.consoleLog("lzw_encode:" + value.length + " to " + v.length + " in " + ((new Date()).getTime()-t));
            this.getLocalStorage()[name] =  this.lzwenc+ v;
            
            var v2 = lzw_decode(v);
            
            for(var i=0;i<value.length&&i<v2.length;i++){
                if (value[i]!=v2[i]){
                    autopagerBwUtil.consoleError("lzw_encode/decode error at:" + i + "  " + value.substring(i-10,i+1) + " ==>> " + v2.substring(i-10,i+1));
                    break;
                }
            }
        }else
            this.getLocalStorage()[name] = value;
    }
}
);

var max_dict=65534;
// LZW-compress a string
function lzw_encode(s) {
    var data = getUTF8Bytes(s);// (s + "").split("");
    return lzw_encode_bytes(data);
}
function lzw_encode_bytes(data,pos) {
    if (typeof pos=="undefined"){
        pos=0;
    }
    var dict = {};
    var out = [];
    var currChar;
    var phrase = String.fromCharCode(data[pos]);
    var code = 256;
    for (pos=pos+1; pos<data.length && code<max_dict; pos++) {
        currChar=String.fromCharCode(data[pos]);
        if (dict[phrase + currChar] != null) {
            phrase += currChar;
        }
        else {
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            dict[phrase + currChar] = code;
            code++;
            phrase=currChar;
        }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    var notFinished = pos<data.length;
    if (notFinished){
        out.push(max_dict);
    }
    for (var i=0; i<out.length; i++) {
        out[i] = String.fromCharCode(out[i]);
    }
    if (notFinished)
        return out.join("") + lzw_encode_bytes(data,pos);
    else
        return out.join("");
}

// Decompress an LZW-encoded string
function lzw_decode(s) {
    var data = (s + "").split("");
    return  readUTF8String(lzw_decode_bytes(data).split(""));
}
function lzw_decode_bytes(data,pos) {
    if (typeof pos=="undefined"){
        pos=0;
    }
    var dict = {};
    var currChar = data[pos];
    var oldPhrase = currChar;
    var out = [currChar];
    var code = 256;
    var phrase;
    for (pos=pos+1; pos<data.length; pos++) {
        var currCode = data[pos].charCodeAt(0);
        if (currCode>=max_dict){
            break;
        }
        else if (currCode < 256) {
            phrase = data[pos];
        }
        else {
            phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
        }
        out.push(phrase);
        currChar = phrase.charAt(0);
        dict[code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
    }
    var notFinished = pos<data.length;
    if (notFinished){
        return  out.join("") + lzw_decode_bytes(data,pos+1);
    }else
        return  out.join("");
}


function getUTF8Bytes(data) {
    var utf8bytesArray=[]
    for(var i=0; i<data.length; i++){
        var c = data.charCodeAt(i);
        var bs = new Array();
        if (c > 0x10000){
            // 4 bytes
            bs[0] = 0xF0 | ((c & 0x1C0000) >>> 18);
            bs[1] = 0x80 | ((c & 0x3F000) >>> 12);
            bs[2] = 0x80 | ((c & 0xFC0) >>> 6);
            bs[3] = 0x80 | (c & 0x3F);
        }else if (c > 0x800){
            // 3 bytes
            bs[0] = 0xE0 | ((c & 0xF000) >>> 12);
            bs[1] = 0x80 | ((c & 0xFC0) >>> 6);
            bs[2] = 0x80 | (c & 0x3F);
        }else if (c > 0x80){
            // 2 bytes
            bs[0] = 0xC0 | ((c & 0x7C0) >>> 6);
            bs[1] = 0x80 | (c & 0x3F);
        }else{
            // 1 byte
            bs[0] = c;
        }
        for(var j=0; j<bs.length; j++){
            utf8bytesArray.push(bs[j]);
        }
    }
    return utf8bytesArray;
}


function readUTF8String(utf8bytesArray) {
    var ix = 0;
     
    //    if( utf8bytesArray.slice(0,3) == "\xEF\xBB\xBF") {
    //    ix = 3;
    //    }
     
    var string = "";
    for( ; ix < utf8bytesArray.length; ix++ ) {
        var byte1 = utf8bytesArray[ix].charCodeAt(0);
        if( byte1 < 0x80 ) {
            string += String.fromCharCode(byte1);
        } else if( byte1 >= 0xC2 && byte1 < 0xE0 ) {
            var byte2 = utf8bytesArray[++ix].charCodeAt(0);
            string += String.fromCharCode(((byte1&0x1F)<<6) + (byte2&0x3F));
        } else if( byte1 >= 0xE0 && byte1 < 0xF0 ) {
            var byte2 = utf8bytesArray[++ix].charCodeAt(0);
            var byte3 = utf8bytesArray[++ix].charCodeAt(0);
            string += String.fromCharCode(((byte1&0xFF)<<12) + ((byte2&0x3F)<<6) + (byte3&0x3F));
        } else if( byte1 >= 0xF0 && byte1 < 0xF5) {
            var byte2 = utf8bytesArray[++ix].charCodeAt(0);
            var byte3 = utf8bytesArray[++ix].charCodeAt(0);
            var byte4 = utf8bytesArray[++ix].charCodeAt(0);
            var codepoint = ((byte1&0x07)<<18) + ((byte2&0x3F)<<12)+ ((byte3&0x3F)<<6) + (byte4&0x3F);
            codepoint -= 0x10000;
            string += String.fromCharCode(
                (codepoint>>10) + 0xD800,
                (codepoint&0x3FF) + 0xDC00
                );
        }
    }
     
    return string;
}
