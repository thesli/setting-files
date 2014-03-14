/*
 * This code provides the SU Extension API implementation to the
 * stumbleupon.com web pages.
 *
 * Note:  It relies on extconnect being included in the document.
 *
 * Compatibility:  Chrome and Safari
*/
var suExtensionApi = {
    // Note:  providerVersion is filled in by the build process.
    // DO NOT BREAK UP THE FOLLOWING LINE
    _info: { apiVersion: "1.0", provider: "chromebar", _providerVersion: "6.2.27.2" },
    _inSafari: (navigator.userAgent.indexOf("Chrome") == -1),
    _inSafaribar: (typeof(safari) != "undefined" && safari.extension && safari.extension.globalPage),
    _isToolbar: false,
    _regexToolbar: /^https?\:\/\/(www\.stumbleupon\.com|[^\/]*\.stumble\.net)\/su\/toolbar\/(chromebar|safaribar).*/i,
    _STUMBLE_TIMEOUT: 15000,

    id: null,

    // -------------------------------------------------------------------
    // Core functionality
    // -------------------------------------------------------------------
    getProviderInfo: function(callback) {
        callback(this._info);
    },

    getDomain: function(callback) {
        extconnect_wp.sendCSRequest({ type: "GETDOMAIN" }, callback);
    },

    getId: function() {
        return suExtensionApi.id;
    },

    // -------------------------------------------------------------------
    // Message functionality
    // -------------------------------------------------------------------
    message: {
        // The array of message listeners
        _listeners : [],

        _handleIncoming: function(msg) {
            // Send the message to the listeners.
            for(var i=0; i<this._listeners.length; i++)
            {
                this._listeners[i](msg.messageId, msg.data, msg.sender);
            }
        },

        addListener: function(fnListener) {
            this.removeListener(fnListener);
            this._listeners.push(fnListener);
        },

        removeListener: function(fnListener) {
            for(var i=0; i<this._listeners.length; i++)
            {
                if(this._listeners[i] === fnListener)
                {
                    this._listeners.splice(i, 1);
                    return;
                }
            }
        },

        broadcastMessage: function(messageId, data) {
            var sender = { id: suExtensionApi.id };
            extconnect_wp.sendCSRequest({ type: "EXTAPIBROADCAST", data: { sender: sender, messageId: messageId, data: data } });
        },

        postMessage: function(target, messageId, data) {
            var sender = { id: suExtensionApi.id };
            extconnect_wp.sendCSRequest({
                    type: "EXTAPIPOSTMESSAGE",
                    data: { sender: sender,
                            target: target,
                            messageId: messageId,
                            data: data }
            });
        },

        postToCurrentBar: function(messageId, data) {
            this.postMessage("current-bar", messageId, data);
        }
    },

    // -------------------------------------------------------------------
    // Data functionality
    // -------------------------------------------------------------------
    data: {
        getValue: function(key, callback) {
            extconnect_wp.sendCSRequest({ type: "GETVALUE", key: key }, callback);
        },

        setValue: function(key, value, callback) {
            extconnect_wp.sendCSRequest({ type: "SETVALUE", key: key, value: value }, callback);
        }
    },

    // -------------------------------------------------------------------
    // Toolbar functionality -- when the extension is a toolbar extension
    // -------------------------------------------------------------------
    toolbar: {
        isToolbarOpen: function(callback) {
            extconnect_wp.sendCSRequest({ type: "ISTOOLBARON" }, callback);
        },

        openToolbar: function(url, callback) {
            var fnResponse = callback;
            var displayNow = false;
            if(url)
            {
                fnResponse = function() {
                    suExtensionApi.litebar.setContentLocation(url);
                    if(callback) callback();
                };
            }
            else
            {
                displayNow = true;
            }
            extconnect_wp.sendCSRequest({ type: "OPENTOOLBAR", displayNow: displayNow }, fnResponse);
        },

        closeToolbar: function() {
            extconnect_wp.sendCSRequest({ type: "CLOSETOOLBAR" });
        },

        hideToolbar: function() {
            extconnect_wp.sendCSRequest({ type: "HIDETOOLBAR" });
        }
    },

    // -------------------------------------------------------------------
    // Stumble functionality
    // -------------------------------------------------------------------
    stumble: {
        setMode: function(mode, fnCallback) {
            // Just update the stumble state global value, it will take care of notifying the clients
            extconnect_wp.sendCSRequest({ type: "SET_STUMBLEMODE", mode: mode }, fnCallback);
        },

        stumble: function(newTab, replaceHistory, fnCallback) {
            // Implement a timeout so they always get a response
            var finished = false;
            var timedOut = false;
            window.setTimeout(function() {
                if(finished)
                    return;
                timedOut = true;
                if(fnCallback)
                    fnCallback(false);
            }, suExtensionApi._STUMBLE_TIMEOUT);

            // We push this request back to the background page so it can store information about this stumble
            extconnect_wp.sendCSRequest({ type: "STUMBLE", newTab: newTab, replaceHistory: replaceHistory }, function(url) {
                // If we already timed out then ignore the response
                if(timedOut)
                    return;
                finished = true;
                if(fnCallback)
                    fnCallback(url);
            });
        }
    },

    // -------------------------------------------------------------------
    // Litebar functionality  -- functionality used by the litebar page
    // -------------------------------------------------------------------
    litebar: {
        getBrowserLocation: function(callback) {
            extconnect_wp.sendCSRequest({ type: "GETADDRESS" }, callback);
        },

        getContentLocation: function(callback) {
            extconnect_wp.sendCSRequest({ type: "GETCONTENTLOCATION" }, callback);
        },

        getHeight: function(callback) {
            extconnect_wp.sendCSRequest({ type: "GETHEIGHT" }, callback);
        },

        prerender: function(url) {
            extconnect_wp.sendCSRequest({ type: "PRERENDER", url: url });
        },

        setBrowserLocation: function(uri) {
            window.top.location = uri;
            // Don't have to bother witn the callback, we are changing the whole frame!=.
        },

        setContentFocus: function() {
            extconnect_wp.sendCSRequest({ type: "SETCONTENTFOCUS" });
        },

        setContentLocation: function(url) {
            if(suExtensionApi._inSafaribar)
                safari.self.browserWindow.activeTab.url = url;
            else
                window.top.location.href = url;
        },

        setHeight: function(height) {
            extconnect_wp.sendCSRequest({ type: "SETHEIGHT", height: height });
        },

        getWindowDimensions: function(callback) {
            extconnect_wp.sendCSRequest({ type: "GETWINDOWDIMENSIONS"  }, callback);
        },

        openTab: function(url) {
            extconnect_wp.sendCSRequest({ type: "OPENTAB", url: url  });
        },

        getOAuthInfo: function(callback) {
            extconnect_wp.sendCSRequest({ type: "GET_OAUTH_INFO"  }, callback);
        }
    },

    // -------------------------------------------------------------------
    // Overlay support
    // -------------------------------------------------------------------
    overlay: {
        create: function(id, options) {
            // If they supplied an id then use it, otherwise generate one
            // This is mostly for backwards compatibility -- clients should almost always specify an identifier
            if(!options)
                options = {};

            extconnect_wp.sendCSRequest({
                    type: "OVERLAY_CREATE",
                    id: id,
                    options: options,
                    openerId: suExtensionApi.id,
                    openerSrc: window.location.href
            });
        },

        // These methods can be called with an id to specify the overlay to manipulate.
        // The other use is for these methods to be called by an overlay itself to manipulate
        // its own properties (no id required).
        destroy: function(id) {
            if(!id)
                id = suExtensionApi.id;
            extconnect_wp.sendCSRequest({ type: "OVERLAY_REMOVE", id: id });
        },

        // getOptions is only available from within an overlay itself
        getOptions: function(id, fnResponse) {
            if(!id)
                id = suExtensionApi.id;
            extconnect_wp.sendCSRequest({ type: "OVERLAY_GETOPTIONS", id: suExtensionApi.id }, fnResponse);
        },

        toggle: function(id, options) {
            extconnect_wp.sendCSRequest({
                    type: "OVERLAY_TOGGLE",
                    id: id,
                    options: options,
                    openerId: suExtensionApi.id,
                    openerSrc: window.location.href
            });
        },

        destroyAll: function(filter) {
            extconnect_wp.sendCSRequest({ type: "OVERLAY_DESTROYALL", filter: filter });
        },

        update: function(id, options) {
            if(!id)
                id = suExtensionApi.id;
            extconnect_wp.sendCSRequest({ type: "OVERLAY_UPDATE", id: id, options: options });
        },

        showUrlWithOverlay: function(url, overlayId, overlayOptions, newTab) {
            extconnect_wp.sendCSRequest({ type: "OVERLAY_SHOWWITHURL",
                                          url: url,
                                          overlay: {
                                              id: overlayId,
                                              options: overlayOptions,
                                              openerId: suExtensionApi.id,
                                              openerSrc: window.location.href
                                          },
                                          newTab: newTab });
        }
    },

    // -------------------------------------------------------------------
    // Private implementation methods
    // -------------------------------------------------------------------

    // _onCSRequest - Handles Content Script requests
    _onCSRequest: function(request, fnResponse) {
        switch(request.type)
        {
        case "EXTAPIBROADCAST":
            this.message._handleIncoming(request.data);
            break;
        case "EXTAPIPOSTMESSAGE":
            // Process it only if it's being sent to us
            if( (request.data.target.id == this.id) ||
                (this._isToolbar && (request.data.target.id == 'current-bar')) ) {
                this.message._handleIncoming(request.data);
            }
            break;
        case "NEXTSTUMBLE":
            this.message._handleIncoming({ messageId: "msgNextStumble" });
            break;
        case "LOGOUT":
            this.message._handleIncoming({ messageId: "msgLogout" });
            break;
        }
    },

    isReady: function() {
        return this._initialized;
    },

    _generateEndpointId: function() {
        return Math.floor(Math.random() * 100000000);
    },

    // -------------------------------------------------------------------
    // Private initialization
    // -------------------------------------------------------------------
    _init: function() {
        // Wait until extconnect is loaded
        if(this._initialized)
            return;

        this._isToolbar = this._regexToolbar.test(document.location.href);

        // We need extconnect to be loaded before we can initialize
        if((typeof(extconnect_wp) == "undefined") || !extconnect_wp.isReady())
        {
            // Wait for the script ready event from extconnect
            window.addEventListener("suScriptReadyExtconnectWP", function() {
                // Try again
                suExtensionApi._init();
            }, false);
            return;
        }

        // We can't currently initialize in the pre-rendered state due to this issue:
        // http://groups.google.com/a/chromium.org/group/chromium-extensions/browse_thread/thread/867fd29466e42e29?hl=en#
        // TODO:  Enter a bug and get this fixed
        var isPreRender = (document.webkitVisibilityState == "prerender");
        if(isPreRender) {
            var handleVisibilityChange = function() {
                // Only do it on the first visibility change
                if (!isPreRender)
                    return;
                isPreRender = false;
                // Try to initialize again
                suExtensionApi._init();
            }
            // Listen for the page to come out of the prerender state
            document.addEventListener("webkitvisibilitychange", handleVisibilityChange, false);
            return;
        }

        // If it's an overlay, then pick up the id from the URL
        var regexOverlay = /#overlayid=([^&]*)&openerid=([^&\/]*)/;
        var test = unescape(window.location.href);
        var match = test.match(regexOverlay);
        if(match)
        {
            // Yup, this is an overlay
            this.id = match[1];
            this.overlay.opener = { id: match[2] };

            // Add a classname to the <html> element of overlays
            document.documentElement.className += this._inSafari ? " safari-overlay" : " chromebar-overlay";
        }
        else
        {
            // Nope, not an overlay, just generate a new endpoint id
            this.id = this._generateEndpointId();
        }

        extconnect_wp.addListener(function(request, sender, fnResponse) {
            suExtensionApi._onCSRequest(request, fnResponse);
        });

        this._initialized = true;

        // Notify anyone who has been waiting for us to be ready.
        var scriptReadyEvent = document.createEvent("Event");
        scriptReadyEvent.initEvent("suScriptReadyExtensionApi", false, false);
        window.dispatchEvent(scriptReadyEvent);
    }
}

suExtensionApi._init();
