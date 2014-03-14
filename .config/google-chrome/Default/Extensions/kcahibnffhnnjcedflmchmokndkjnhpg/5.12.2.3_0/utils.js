/*
 * General utility functions
 *
 * Compatibility:  Chrome and Safari
 *
*/
var Utils = {
    trim: function(str) {
        return str.replace(/^\s+|\s+$/gm,"");
    },

    stringEndsWith: function(str, strCheck) {
        var i = str.indexOf(strCheck);
        if(i == -1)
            return false;

        return ( (i + strCheck.length) == str.length );
    },

    /*
    **    dotVersionCompare
    **
    **    ver1 >    ver2 : +1
    **    ver1 == ver2 :    0
    **    ver1 <    ver2 : -1
    */
    dotVersionCompare: function(ver1, ver2) {
        var parts1 = ver1.split(".");
        var parts2 = ver2.split(".");

        for(var i=0; i < parts1.length; i++) {
            // If we were equal so far and ver1 is longer, then ver1 is bigger
            if(parts2.length <= i) return 1;

            // Compare the current integers
            var n1 = parseInt(parts1[i]);
            var n2 = parseInt(parts2[i]);
            if(n1 < n2) return -1;
            else if(n1 > n2) return 1;
        }
        // If we reached the end of both versions, then they are equal, otherwise
        // if we didn't reach the end, then ver2 is longer, therefore greater
        if(i == parts2.length) return 0;
        else return -1;
    },

    chromeGreaterThan: function(minVersion) {
        var regex = /Chrome\/([^ ]*)/;
        var match = navigator.userAgent.match(regex);
        if( !match )
            return false;

        return ( this.dotVersionCompare(match[1], minVersion) >= 0 );
    },

    obCompare: function(ob1, ob2) {
        return JSON.stringify(ob1) == JSON.stringify(ob2);
    },

    navigate: function(url, newTab)
    {
        if(inSafari)
            this.safariNavigate(url, newTab);
        else
            this.chromeNavigate(url, newTab);
    },

    safariNavigate: function(url, newTab) {
        var tab = null;
        if(newTab)
            tab = safari.application.activeBrowserWindow.openTab("foreground");
        else
            tab = safari.application.activeBrowserWindow.activeTab;
        tab.url = url;
    },

    chromeNavigate: function(url, newTab) {
        if(newTab)
        {

            chrome.tabs.create({ url: url });
        }
        else
        {
            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.update(tab.id, { url: url });
            });
        }
    },

    parseUrl: function(url) {
        var el = document.createElement('a');
        el.href = url;

        return {
            protocol: el.protocol,
            hostname: el.hostname,
            port: el.port,
            host: el.host,
            pathname: el.pathname,
            search: el.search,
            hash: el.hash
        }
    },

    parseHttpUrl: function(url) {
        if (!url.match(/^https?:/)) {
            return null;
        }

        return this.parseUrl(url);
    }
}
