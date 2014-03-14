var autopagerBwUtil=
{
    getConfigFile : function(fileName) {
        var file = this.getConfigDir();
        file = file + "." + fileName;
        return file;
    },
    getConfigDir : function() {
        var file = "config";
        return file;

    },
    getConfigFileContents : function(filename, charset,warn){
        var file = this.getConfigFile(filename);
        return autopagerPref.loadPref(file)
    },
    saveContentToConfigFile: function(str,filename)
    {
        var file = this.getConfigFile(filename);
        this.saveContentToFile(str,file)
    },
    saveContentToFile: function(str,file)
    {
        return autopagerPref.savePref(file,str)
    },
    autopagerOpenIntab : function(url,obj)
    {
        if ((typeof chrome == "object"))
        {
            try{
                var p = {
                    "url":url,
                    "selected":true
                };
                var t = chrome.tabs.create(p,null);
                return true
            }catch(e)
            {
            }
        }
        else
        {
            return window.open(url, "_blank")!=null;
        }
        return false;
    },
    isMobileVersion : function()
    {
        return false;
    }
    ,
    consoleLog: function(message) {
        console.log(message)
    },
    consoleError: function(message) {
        console.log(message)
    //alert(message)
    //autopagerUtils.printStackTrace();
    }
    ,
    newDOMParser : function ()
    {
        return new window.DOMParser()

    }
    ,
    decodeJSON : function (str)
    {
        if (typeof str == "undefined")
            str=""
        var info = null;
        try{
            info = JSON.parse(str);
        }catch(e)
        {
            info = autopagerJSON.parse(str);
        }
        return info;
    }
    ,
    encodeJSON : function (obj)
    {
        var str = "";
        try{
            str = JSON.stringify(obj);
        }catch(e)
        {
            str = autopagerJSON.stringify(obj);
        }

        return str;
    }
    ,
    supportHiddenBrowser : function ()
    {
        return false;
    }
    ,
    createHTMLDocumentFromStr : function(str,urlStr) {
        return null;
    }
    ,
    processXPath : function (xpath)
    {
        xpath = xpath.replace(/translate\(([a-zA-Z0-9@ ()]*),'([0-9a-zA-Z !@#$%^&*()]*)',''\)[ ]*=[ ]*''([\]| ])/g,"string-length(translate($1,'$2',''))=0$3");
        return xpath;
    }
    ,
    openAlert : function(title,message,link,callback,openTimeout)
    {
        if (AutoPagerNS.is_global())
        {
            AutoPagerNS.browser.open_alertGlobal(title,message,link,callback,openTimeout);
        }
        else
        {
            AutoPagerNS.message.call_function("autopager_open_alert",{
                    title: title,
                    message:message,
                    link:link,
                    hasCallback : (typeof callback != "undefined"),
                    openTimeout: openTimeout
                },function(options){
                if (callback)
                    callback(options)
            })            
        }        
    },
    openAlertGlobal : function(title,message,link,callback,openTimeout)
    {
        window.arguments = []
        window.arguments.push(title);
        window.arguments.push(message);
        window.arguments.push(link);
        window.arguments.push(callback);
        if (typeof openTimeout != "undefined")
            window.arguments.push(openTimeout);
        
        return window.open(chrome.extension.getURL("/content/alert.html"),
            "alert:alert",
            "chrome,dialog=yes,titlebar=no,width=300px,popup=yes",
            title,message,link,callback);
    }
    ,
    isInPrivateMode : function()
    {
        return false;
    }
    ,
    apBrowserId : function()
    {
        //AutoPager supported browser id
        //Firefox 0, Fennec 1, MicroB 2, Chrome 3
        return 3;
    }
    ,
    allowModifyHeader : function()
    {
        return false;
    }
    ,
    notification : function (id,message,buttons)
    {
        if (AutoPagerNS.browser.open_notification)
        {
            var options = {id: id, message: message, buttons: buttons};
            AutoPagerNS.browser.open_notification(options.id, options.message, options.buttons, function(options) {
                try {
                    var btn = buttons[options.button];
                    btn.callback(btn);
                } catch (e) {
                }
            }, options);
        }   
//        AutoPagerNS.message.call_function("autopager_open_notification",{
//            id: id,
//            message:message,
//            buttons:buttons
//        },function(options){
//            try{
//                var btn = buttons[options.button];
//                btn.callback(btn);
//            }catch(e){}
//        });
    }
    ,
    handleDocLoad : function(doc,safe)
    {
        autopagerMain.workingAllSites = [];
        //doc.documentElement.autopagerContentHandled = true;
        var tmpSites = autopagerMain.loadTempConfig();

        tmpSites.updateSite = new AutoPagerNS.AutoPagerUpdateSite("Wind Li","all",
            "","text/html; charset=utf-8",
            "smart paging configurations",
            "smartpaging.xml","//site",true,"autopager-xml",0);
        autopagerMain.workingAllSites[tmpSites.updateSite.filename] = tmpSites;
        return autopagerMain.onInitDoc(doc,safe);
    }
    ,
    isValidLink : function (node)
    {
        return typeof node!='undefined' && (
            node.constructor == String || node.tagName == 'A');
    }
    ,frameSafe : function()
    {
        return true;
    }
    ,
    updateStatus : function(enabled,siteenabeld,discoveredRules,options) {
        AutoPagerNS.buttons.setPageIcon(enabled,siteenabeld,discoveredRules,options)
//        if (options.tabid)
//            autopagerBwUtil.setPageIcon(options.tabid,enabled,siteenabeld);
//        else
//            AutoPagerNS.get_current_tab(function(tab) {
//                if (tab && tab.id)
//                    autopagerBwUtil.setPageIcon(tab.id,enabled,siteenabeld);
//            })
    }
    ,getContentImage : function(name)
    {
        return AutoPagerNS.get_url("content/images/" + name);
    }
}