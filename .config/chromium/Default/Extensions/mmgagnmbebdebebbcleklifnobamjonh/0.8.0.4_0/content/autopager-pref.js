/**
 * Copyright (c) 2009, 2010,2011 Yong Li. All rights reserved.
 */
var autopagerPrefServer =
{
    ids:"",
    prefix:"autopager.",
    init : function()
    {
    },
    loadUTF8Pref : function(name) {
            var str = this.loadPref(name);
        try{
            return str;
        }catch(e) {
            return str;
        }
    },
    saveUTF8Pref : function(name,value) {
        try{
            this.savePref(value);
        }catch(e) {
            savePref(name,value);
        }	  	
    },
    loadPref : function(name,defaultValue) {
        var v = "";
        try{
            var prefValue=this.doLoadPref(this.prefix + name)
            if (typeof  prefValue == "undefined")
            {
                if(typeof this[name] != "undefined")
                    v = this[name]
                else
                    v = this.doLoadPref("autopager.default-of-" + name)
            }
            else
                v = prefValue;
            if (typeof v == "undefined" && typeof defaultValue != "undefined")
                v = defaultValue;
            if (name=='ids' && v==null && this.ids!=null)
                v = this.ids;
        }catch(e) {
            autopagerBwUtil.consoleError("Unable to load pref:" + name + ":" + e)
        }
        return v;
    },
    getDatePrefs : function(name){
        var date = new Date();
        try{        
            var timestamp = this.loadPref(name); // get a pref
            date.setTime(timestamp);
        }catch(e) {
        //autopagerMain.alertErr(e);
        }     
        return date;
    },
    setDatePrefs : function(name,date){
        try{
            if (this.loadPref(name)!=date.getTime())
                this.savePref( name,date.getTime()); // get a pref
        }catch(e) {
        //autopagerMain.alertErr(e);
        }     
    },

    loadBoolPref : function(name,defaultValue) {
        try{
            var v = this.loadPref(name,defaultValue);
            return (typeof v != "undefined") && (v=="true" || v=="1"); // get a pref
        }catch(e) {
            autopagerBwUtil.consoleError("Unable to load pref:" + name)
        //autopagerMain.alertErr(e);
        }
        return false;
    },
    savePref : function(name,value) {
        var changed = false;
        try{
            changed = (this.loadPref(name)!=value);
            if (typeof value == "undefined")
                value=""
            if(this[name]==value)
                this.doDeletePref(this.prefix + name);
            else if (changed)
                this.doSavePref(this.prefix + name , value); // set a pref
            if (name=='ids' && value && value!=this.ids)
            {
                this.ids = value;
                AutoPagerNS.UpdateSites.updateRepositoryOnline("autopagerLite.xml",true);
            }
        }catch(e) {
            autopagerBwUtil.consoleError(e);
        }
    
        if (changed && autopagerPref.shouldBroadcast(this.prefix + name))
        {
            var prefs = {}
            prefs[name]=value
            AutoPagerNS.message.broadcastMessage("autopager_set_prefs",{
                prefs:prefs
            })        
        }
        
        if (changed && autopagerPref.triggerEvents)
        {
            autopagerPref.triggerEvents("change",name);
        }
        return changed;
    },
    saveBoolPref : function(name,value) {
        var changed = false
        try{
            changed = this.savePref(name,value); // get a pref
        }catch(e) {
        //autopagerMain.alertErr(e);
        }
        return changed;
    },
    resetPref : function(name,value) {
        try{
            this.savePref(name,this[name]);
            this.doDeletePref("autopager.default-of-" + name)
        }catch(e) {
        //autopagerMain.alertErr(e);
        }
    },
    clearPref : function(name,value) {
        try{
            delete this[name];
            this.doDeletePref(name)
            this.doDeletePref("autopager.default-of-" + name)
        }catch(e) {
            autopagerBwUtil.consoleError(e);
        }
    },
    userPrefKeys : function ()
    {
        var keys={}
        for(var k in this.getLocalStorage())
        {
            if (this.shouldBroadcast(k))
            {
                var p = k.substr(k.indexOf(this.prefix)+10);
                keys[p]=p
            }
        }
    
        return keys;
    },
    userPrefValues : function ()
    {
        var values={}
        for(var k in this.getLocalStorage())
        {
            if (this.shouldBroadcast(k))
            {
                var p = k.substr(k.indexOf(this.prefix)+10);
                values[p]=this.loadPref(p);
            }
        }
    
        return values;
    },
    shouldBroadcast : function(k)
    {
        if (k.indexOf(this.prefix)==0)
            k = k.substr(this.prefix.length);
        return (k.indexOf("default-of-")==-1 && k.indexOf("config.")==-1 && k.indexOf("host.")==-1)
    }
    ,
    saveMyName : function(myname) {
        this.saveUTF8Pref("myname", myname); // set a pref
    },
    loadMyName : function() {
        try{
        
            return this.loadUTF8Pref("myname"); // get a pref
        }catch(e) {
        //autopagerMain.alertErr(e);
        }
        return "";
    },
    changeMyName : function() {
        var name = prompt(autopagerUtils.autopagerGetString("inputname"),this.loadMyName());
        if (name!=null && name.length>0) {
            this.saveMyName(name);
        }
        return name;
    }
    , doLoadPref : function(name){
        return this.getLocalStorage()[name];
    }
    , doSavePref : function(name,value){
        return this.getLocalStorage()[name] = value;
    }
    , doDeletePref : function(name){
        delete this.getLocalStorage()[name];
    }    
    , 
    getLocalStorage : function ()
    {
        return localStorage; //this;//AutoPagerNS.window.
    }
    ,
    post_init :function()
    {
        this.init();        
    }
}

var autopagerPref =autopagerPrefServer
