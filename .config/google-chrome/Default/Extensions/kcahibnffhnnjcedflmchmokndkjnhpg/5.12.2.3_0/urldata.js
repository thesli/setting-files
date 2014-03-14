/*
 * Class for managing local url data storage
 *
 * Compatibility:  Chrome and Safari
 *
*/
var UrlData = {
    _bp: null,
    MAX_LOCAL_URLS: 120,

    update: function(url, newData) {
        // Make a local copy of the data before changing it
        newData = JSON.parse(JSON.stringify(newData));
        url = this._canonicalizeUrl(url);
        var globals = this._bp.getExtApiValue("globals");
        if(!globals || !globals.user || !globals.user.userid)
            return; // Can't have url info without a user, urlinfo is user-specific

        if(!globals.localUserData)
            globals.localUserData = { userid: globals.user.userid };
        if(!globals.localUserData.urls)
            globals.localUserData.urls = {};

        var urls = globals.localUserData.urls;

        // Look up any existing one
        var theUrlData = this.lookup(url);
        if (!theUrlData)
            theUrlData = { };

        // Store and index the canonicalized url
        newData.url = url;

        // Extend the url properties with the new properties and add it to the dictionary
        theUrlData = jQuery.extend(theUrlData, newData);
        theUrlData.lastUpdate = (new Date()).getTime();
        urls[theUrlData.url] = theUrlData;
        // Trim excess entries
        this._trimDictionary(urls);

        // Go through the extension api setvalue path so all endpoints get notified of the change
        globals.localUserData.urls = urls;
        this._bp.onExtApiSetValue('globals', globals);
    },

    lookup: function(url) {
        if (!url)
            return null;
        url = this._canonicalizeUrl(url);
        var globals = this._bp.getExtApiValue("globals");
        if(!globals || !globals.localUserData || !globals.localUserData.urls)
            return null;

        return globals.localUserData.urls[url];
    },

    _canonicalizeUrl: function(url) {
        // Safari adds a trailing slash, remove it before storing or lookup up urls
        return url.replace(/\/$/, "");
    },

    _trimDictionary: function(urls) {
        // Convert the dictionary to an array
        var arrUrls = [];
        for (var key in urls)
            arrUrls.push(urls[key]);

        // If we aren't over the max, then we're good
        if (arrUrls.length <= this.MAX_LOCAL_URLS)
            return;

        // Sort descending by last update in preparation to whack the oldest entries
        arrUrls.sort(function(a, b) {
            return b.lastUpdate - a.lastUpdate;
        });

        // Delete the extras
        var arrRemoveUrls = arrUrls.splice(this.MAX_LOCAL_URLS);
        for(var i=0; i<arrRemoveUrls.length; i++) {
            delete urls[arrRemoveUrls[i].url];
        }
        return;
    },

    _convertUrlsFormat: function() {
        // Keep it simple:  If they had the old array-based format (which only stored
        // 8 URLs anyway) then just purge it and convert to a dictionary
        var globals = this._bp.getExtApiValue("globals");
        if(!globals || !globals.localUserData || !globals.localUserData.urls)
            return;

        if (typeof(globals.localUserData.urls.length) == "undefined")
            return;

        // It was an array, set it to a new, empty object for our dictionary
        globals.localUserData.urls = {};
        this._bp.onExtApiSetValue('globals', globals);
    },

    /*
     *  Removes all local URL data.  Useful for testing
     */
    _purge: function() {
        var globals = this._bp.getExtApiValue("globals");
        if(!globals || !globals.user || !globals.user.userid)
            return; // Can't have url info without a user, urlinfo is user-specific

        if(!globals.localUserData)
            globals.localUserData = { userid: globals.user.userid };
        globals.localUserData.urls = {};

        this._bp.onExtApiSetValue('globals', globals);
    },

    init: function(theBP) {
        this._bp = theBP;
        this._convertUrlsFormat();
    }
}
