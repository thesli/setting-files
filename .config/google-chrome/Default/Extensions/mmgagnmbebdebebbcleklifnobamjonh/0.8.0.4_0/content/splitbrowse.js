AutoPagerNS.apSplitbrowse = {
    autopagerPrefix : "autopager",
    getSplitKey :function ()
    {
        return "is" + this.autopagerPrefix + "_subwin";
    },
    getBrowserNode : function(doc)
    {
        return null;
    },
    switchToCollapsed : function(collapsed)
    {
    }    
}
