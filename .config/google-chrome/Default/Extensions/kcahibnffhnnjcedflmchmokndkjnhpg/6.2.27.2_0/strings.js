//
// Strings
//
// Constants with a helper for parameterizing strings to avoid duplication
//

var Strings = {
    _bp: null,

    // String constants
    SERVER: "www.@@DOMAIN@@",
    SERVER_HTTP_YESIKNOW_INSECURE: "http://@@SERVER@@",
    CHROMEBAR_COOKIE_NAME: "chromebar_stumble",
    CLIENTID_COOKIE_NAME: "clientid",
    V5_COOKIE_NAME: "qxa42",
    DOMAIN_HTTP: "http://@@DOMAIN@@",
    LOGOUT_URL: "@@SERVER_HTTP@@/logout",
    LOGGED_OUT_URL: "@@SERVER_HTTP@@/logged-out",
    LOGIN_URL: "@@SERVER_HTTP@@/login",
    FIRST_RUN: "@@API20_HTTPS@@/client/firstrun?x_su_version=@@ENC_XSUVERSION@@&client_type=@@DEVICE@@&clientid=@@CLIENTID@@&prev_version=@@PREV_VERSION@@",
    SIGNIN_URL: "@@SERVER_HTTP@@/login",
    REFRESH_OAUTH_URL: "@@SERVER_HTTP@@/su/api/getOAuthToken?src=litebar&device=@@DEVICE@@&version=@@VERSION@@&clientid=@@CLIENTID@@&x_su_consumer_key=@@CONSUMER_KEY@@",
    STUMBLE_URL: "@@SERVER_HTTPS@@/to/stumble/go/" + "?device=@@DEVICE@@&version=@@VERSION@@&clientid=@@CLIENTID@@",
    SUBMIT_URL: "@@SERVER_HTTP@@/submit/?url=@@theUrl@@",
    VIDEO_URL: "@@SERVER_HTTP_YESIKNOW_INSECURE@@/su/video/",
    PHOTO_URL: "@@SERVER_HTTP_YESIKNOW_INSECURE@@/su/image/",
    XSUVERSION: "@@DEVICE@@ @@VERSION@@",
    BLACKLIST_URL: "@@SERVER_HTTP@@/su/toolbar/lbblacklist.txt",
    INJECTOR_VERSION: "@@DEVICE@@ @@VERSION@@",
    TBFRAME_RAW_URL: "@@SERVER_HTTP@@/su/toolbar/@@DEVICE@@?device=@@DEVICE@@&version=@@ENC_INJECTOR_VERSION@@&cv=@@TB_VERSION@@",
    TBFRAME_URL: "@@NOREFER_URL@@?url=@@ENC_TBFRAME_RAW_URL@@&addtokens=1",
    UPGRADE_URL: "@@SERVER_HTTP@@/downloads/tour/chrome-upgrade",
    API_ENDPOINT: "@@SERVER_HTTPS@@/su/api",
    OVERLAY_HOLDER_URL: "@@SERVER_HTTP@@/su/toolbar/chromebar/referral",
    BAR_SETTINGS_URL: "http://www.stumbleupon.com/safaribar/settings",

    get: function(name, params) {
        var str = "";
        switch(name) {
            case "ACCESS_TOKEN":
                var globals = this._bp.getExtApiValue("globals");
                if (globals != null && globals.oAuth != undefined && globals.oAuth !== null && globals.oAuth.key != undefined)
                    str = globals.oAuth.key;
                break;
            case "DEVICE":
                str = G_DEVICE;
                break;
            case "DOMAIN":
                str = SU.Storage.get("domain");
                if(!str)
                    str = Constants.DEFAULT_DOMAIN;
                break;
            case "CLIENTID":
                str = SU.Storage.get("clientid");
                if(!str) str = "";
                break;
            case "XSUVERSION":
                str = "@@DEVICE@@ @@VERSION@@";
                break;
            case "VERSION":
                str = this._bp.getVersion();
                break;
            case "NOREFER_URL":
                str = chrome.extension.getURL("norefer.html");
                break;
            case "TOOLBAR_INJECTOR":
                str = chrome.extension.getURL("injector.js");
                break;
            case "NOW":
                str = (new Date()).getTime().toString();
                break;
            case "TB_VERSION":
                var globals = this._bp.getExtApiValue("globals");
                if(globals && globals.clientVersion)
                    str = globals.clientVersion;
                break;
            case "USERNAME":
                var globals = this._bp.getExtApiValue("globals");
                if(globals && globals.user && globals.user.username)
                    str = globals.user.username;
                break;
            case "CONSUMER_KEY":
                if(typeof(G_CONSUMER_KEY) != 'undefined')
                    str = G_CONSUMER_KEY;
                else {
                    if (Strings.get('DOMAIN').indexOf('stumble.net') != -1)
                        str = G_CONSUMER_KEY_DEV;
                    else
                        str = G_CONSUMER_KEY_PRD;
                }
                break;
            case "SERVER_HTTP":
            case "SERVER_HTTPS":
                // We want all of our re1uests to be authenticated with tokens, so always use HTTPS for requests
                // we initiate
                str = "https://@@SERVER@@";
                break;
            case "API20_HTTPS":
                str = "https://api.@@DOMAIN@@/api/v2_0";
                break;
            default:
                if(Strings[name])
                    str = Strings[name];
                else if(params && params[name])
                    str = params[name];
                else
                    str = "";
        }

        return this.expand(str, params);
    },

    expand: function(str, params) {
        var start = str.indexOf("@@");
        while(start != -1)
        {
            var end = str.indexOf("@@", start+2);
            if(end == -1)
                break;

            var fullKey = str.substr(start, end - start + 2);
            var key = fullKey.substr(2, fullKey.length - 4);
            var encoded = false;
            if(key.indexOf("ENC_") == 0)
            {
                encoded = true;
                key = key.substr(4);
            }
            // Expand recursively
            var value = Strings.get(key, params);
            if(encoded)
                value = encodeURIComponent(value);

            // Replace the key with the value
            str = str.replace(fullKey, value);

            start = str.indexOf("@@");
        }
        return str;
    },

    isDevDomain: function() {
        var str = Strings.get("DOMAIN");
        return str.match(/.*?\.stumble\.net/);
    },

    init: function(bp) {
        this._bp = bp;
    }
}
