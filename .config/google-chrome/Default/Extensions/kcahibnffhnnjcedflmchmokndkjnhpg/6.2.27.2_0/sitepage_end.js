//
// SitePage
//
// This content script is run on every stumbleupon.com or x.stumble.net page
//
var SitePage = {
    //
    // checkLoginReload
    //
    // The background page may be able to restore the auth cookie (or may have restored it after this
    // page loaded).  If this is a site login page, then let the background page determine whether
    // it should be reloaded with the auth cookie
    //
    checkLoginReload: function() {
        if(window != window.top)
            return;

        if(document.body && document.body.className && (document.body.className  == "login")) {
            chrome.extension.sendMessage({ type: "CHECKLOGINRELOAD" });
        }
    },

    init: function() {
        this.checkLoginReload();
    }
}

SitePage.init();

