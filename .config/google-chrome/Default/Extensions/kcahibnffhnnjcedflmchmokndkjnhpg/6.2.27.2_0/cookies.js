//
// Cookies
//
// Code for handling cookie-related functionality
//
var Cookies = {
    updateClientIdCookie: function() {
        var clientid = Strings.get("CLIENTID");
        if(!clientid)
            return;
        this.setPersistentCookie("CLIENTID_COOKIE_NAME", clientid);
    },

    setPersistentCookie: function(name, value) {
        var url = Strings.get("DOMAIN_HTTP");
        var cookieName = Strings.get(name);
        var domain = "." + Strings.get("DOMAIN");

        // Expires in the year 2100 (4108150994)
        chrome.cookies.set({
            url: url,
            expirationDate: 4108150994,
            domain: domain,
            name: cookieName,
            value: value,
            path: '/'
        });
    },

    maintainPersistentCookie: function(name, value) {
        // Set the cookie on start-up
        this.setPersistentCookie(name, value);

        // And listen for cookie changes
        var self = this;
        var cookieName = Strings.get(name);
        chrome.cookies.onChanged.addListener(function(changeInfo) {
            if(!changeInfo.cookie)
                return;

            if( (changeInfo.cookie.name == cookieName) && (changeInfo.removed || changeInfo.cookie.value != value) ) {
                // We are defensive about this and asynchronously check for existence to avoid an infinite loop
                // that used to happen in older versions of Chrome, wherein setting the cookie would
                // first cause it to be removed (and not necessarily with the right indicator), then set again, ...
                var url = Strings.get("DOMAIN_HTTP");

                window.setTimeout(function() {
                    chrome.cookies.get({ url: url, name: cookieName }, function(cookie) {
                        // If the cookie still does not exist then restore it
                        if(!cookie || changeInfo.cookie.value != value)
                            self.setPersistentCookie(name, value);
                    });
                }, 200);
            }
        });
    }
}
