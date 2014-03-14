//
// Blacklist support
//
// Simple blacklist support.  Uses an array of regular expressions to determine if the url is
// blacklisted.     If this list grows very large we should consider more performant alternatives.
//
var Blacklist = {
    // A list of regular expressions that match
    _list: [],
    // A hash table of urls that are added from the content script when it discovers urls that
    // are not supported based on their content
    _urls: {},

    isBlacklisted: function(url) {
        if(this._urls[url])
            return true;

        for(var i=0; i<this._list.length; i++) {
            // If it matches the entire URL, then it is blacklisted
            var result = this._list[i].exec(url);
            if( result )
                return true;
        }
        return false;
    },

    refresh: function() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", Strings.get("BLACKLIST_URL"), true);
        xhr.onreadystatechange = function() {
            if(this.readyState == 4)
            {
                if(!Blacklist._reload(this.responseText))
                    console.log("StumbleUpon: Invalid blacklist.  Not loaded");
            }
        };
        xhr.send();
    },

    _reload: function(listText) {
        var regexVersion = /VERSION=([^\s]*)/;
        this._list = [];
        var lines = listText.split("\n");
        if(lines.length < 1)
            return false;
        var match = lines[0].match(regexVersion);
        if(!match)
            return false;
        SU.Storage.set("blacklistVersion", match[1]);

        for(var i=1; i<lines.length; i++) {
            var entry = Utils.trim(lines[i]);
            if(entry) {
                if(!this._processEntry(entry))
                    return false;
            }
        }
        return true;
    },

    _processEntry: function(entry) {
        try {
            var regex = new RegExp(entry);
            this._list.push(regex);
            return true;
        } catch(ex) {
            console.log("Bad Blacklist Entry: " + entry);
            return false;
        }
    },

    addUrl: function(url) {
        this._urls[url] = 1;
    },

    init: function() {
        this.refresh();
    }
}
