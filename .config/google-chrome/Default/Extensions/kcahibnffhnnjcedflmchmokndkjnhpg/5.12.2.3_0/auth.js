/*
 * Custom authentication sync mechanisms for chromebar.
 * We should consider deprecating this to match the safaribar approach if it is deemed acceptable.
 *
 * Compatibility: Chrome
 */
var Auth = {
    reloadedTabs: [],
    tokenName: "SU_REMEMBER",

    logout: function(fromLitebarLogout) {
        // Remove the token from storage
        SU.Storage.set(this.tokenName, null);

        // Legacy (pre- 2.6.2.1), be sure this is cleared
        SU.Storage.set("extapi.keychain", null);

        // Remove the actual cookie
        var url = Strings.get("DOMAIN_HTTP");
        var wwwUrl = Strings.get("SERVER_HTTP");
        chrome.cookies.remove({
            url: url,
            name: this.tokenName
        });
        chrome.cookies.remove({
            url: wwwUrl,
            name: this.tokenName
        });

        // Remove the recent stumbles
        SU.Storage.set("recentStumbles", null);

        if(!fromLitebarLogout) {
            // If it didn't originate from us, then notify the other litebars
            theBP.broadcastMessage("litebarLogout");
        }
    },

    // Get the authentication cookie
    getCookie: function(callback) {
        var url = Strings.get("DOMAIN_HTTP");

        chrome.cookies.get({ url: url, name: this.tokenName }, callback);
    },

    // Set the authentication cookie
    setCookie: function(value) {
        var url = Strings.get("DOMAIN_HTTP");
        var domain = "." + Strings.get("DOMAIN");
        httpOnly = true;
        expires = 4108150994;  // 2100

        chrome.cookies.set({
                                url: url,
                                expirationDate: expires,
                                domain: domain,
                                httpOnly: httpOnly,
                                name: this.tokenName,
                                value: value,
                                path: "/"
        });
    },

    //
    // updateCookie
    //
    // If we have an auth token, then update the authentication cookie with it
    //
    updateCookie: function() {
        var currentToken = SU.Storage.get(this.tokenName);
        if(!currentToken)
        {
            // See if we have a legacy (pre- 2.6.2.1) token
            keychain = SU.Storage.get("extapi.keychain");
            if(keychain && keychain.authString)
            {
                // See if it's the one we are expecting
                var parts = keychain.authString.split("|");
                if(parts[3])
                {
                    // Put it in our new storage location
                    SU.Storage.set(this.tokenName, keychain.authString);
                    currentToken = keychain.authString;
                }
            }
        }

        // Update the cookie
        if(currentToken)
            Auth.setCookie(currentToken);
    },

    //
    // checkLoginReload
    //
    // If a cookie deletion gets by us and a sign-in page gets loaded, then we will check whether we
    // should reload that page after restoring the authentication cookie.  This most often happens
    // on start-up because a tab might get loaded before we have a chance to restore the auth cookie.
    //
    checkLoginReload: function(tabid) {
        if(this.reloadedTabs[tabid])
        {
            // Avoid repeated attempts to reload a tab
            return;
        }

        var token = SU.Storage.get(this.tokenName);
        if(token)
        {
            Auth.updateCookie();
            this.reloadedTabs[tabid] = true;

            // Refresh the tab
            chrome.tabs.executeScript(tabid, { code: "window.location.reload();" });

            // Free up the reload indicator after 5 minutes
            window.setTimeout(function() {
                delete Auth.reloadedTabs[tabid];
            }, 5 * 60 * 1000);
        }
    },

    _handleTokenCookieChanged: function(changeInfo) {
        var domain = Strings.get("DOMAIN");
        if(!Utils.stringEndsWith(changeInfo.cookie.domain, "." + domain))
            return;

        if(!changeInfo.removed)
        {
            // The cookie has changed, store the new value
            SU.Storage.set(Auth.tokenName, changeInfo.cookie.value);
        }
        else
        {
            // The cookie was removed
            if( changeInfo.cause == "expired_overwrite" ) {
                // The server itself has removed the cookie, so log out
                Auth.logout();
            } else if( changeInfo.cause != "overwrite") {
                // The cookie was removed by some other source, so restore it.

                // We are defensive about this and do it asynchronously to avoid an infinite loop
                // that used to happen in older versions of Chrome, wherein setting the cookie would
                // first cause it to be removed, then set again, ...
                window.setTimeout(function() {
                        Auth.getCookie(function(cookie) {
                            if(!cookie)
                                Auth.updateCookie();
                        }, 200);
                });
            }
        }
    },

    init: function() {
        // Restore the auth cookie
        Auth.updateCookie();

        // Additional cookie functionality depends on changeInfo.cause which is only available in
        // 12.0.707.0 and greater
        if(Utils.chromeGreaterThan("12.0.707.0")) {
            // Listen for cookie changes
            chrome.cookies.onChanged.addListener(function(changeInfo) {
                if( !changeInfo.cookie )
                    return;

                if( changeInfo.cookie.name == Auth.tokenName ) {
                    Auth._handleTokenCookieChanged(changeInfo);
                }
            });
        }
    }
}
