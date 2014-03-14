AutoPagerNS.strings = AutoPagerNS.extend (AutoPagerNS.namespace("strings"),{
init : function(){    
}
,
initClient : function(callback){    
}
,
getString : function (name)
{
    try{
        var key = name.replace(/\./g,"_").replace(/-/g, "_");
        var str = chrome.i18n.getMessage(key);
        if (typeof str != "undefined" && str!="")
            return str;
    }catch(e)
    {
        console.log(e)
    }
    return name;
}
,
getFormattedString : function(name,params)
{
    try{
        var str = this.getString(name)
        return this.formatString(str,params);
    }catch(e)
    {
    }
    return this.getString(name);
}
,
formatString : function(format,params)
{
    var strs = format.split("%S");
    var str = "";
    for(var i=0;i<strs.length;i++)
    {
        str += strs[i]
        if (i<params.length)
        {
            str += params[i]
        }
    }
    return str;
}
}
);
