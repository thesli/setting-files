
//chrome content routers
AutoPagerNS.message = AutoPagerNS.extend (AutoPagerNS.namespace("message"),
    {
        call_function_on_object : function(fn,options,callback,messager)
        {
//            autopagerBwUtil.consoleLog("call_function_on_object:" + fn)
            options = this.prepareOptions(fn,options,callback,messager);
            var msg = {
                fn:fn,
                options:options
            }
            try{
                this.do_call_function_on_object(messager,AutoPagerNS.message.msgname,msg,callback)
            }catch(e){
                autopagerBwUtil.consoleError("error call_function_on_object:" + fn + ":"  + e) 
            }
        },
        do_call_function_on_object : function(messager,msgname,msg,callback)
        {
            if (typeof callback!="undefined")
            {
                msg.options.callback=true
            }else
                callback = function(){}
            try{
                if (typeof messager != "undefined")
                {
                    if (typeof messager.callback=='function')
                    {
                        messager.callback(msg.options);
                    }
                }
                else
                    chrome.extension.sendRequest(msg,callback);
            }catch(e){
                autopagerBwUtil.consoleError("error call_function_on_object:" + msg.fn + ":" + messager + ":" + e) 
            }            
        }
    }
);
    
AutoPagerNS.browser = AutoPagerNS.extend (AutoPagerNS.namespace("browser"),
{
    open_alert : function (title,message,link,callback,options)
    {
        AutoPagerNS.message.call_function("autopager_open_alert",{
                    title: title,
                    message:message,
                    link:link,
                    hasCallback : (typeof callback != "undefined")
                },function(options){
                if (callback)
                    callback(options)
            })   
    }
});
AutoPagerNS = AutoPagerNS.extend(AutoPagerNS,{
  get_browser_name : function ()
  {
      return "chrome";
  },
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
        AutoPagerNS.message.request_handler(request,{sender:sender,callback:callback})
    }
}

chrome.extension.onRequest.addListener(autopager_request_handler);
