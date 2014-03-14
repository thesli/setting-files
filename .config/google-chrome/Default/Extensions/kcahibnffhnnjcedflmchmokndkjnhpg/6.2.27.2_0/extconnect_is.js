/*
 *
 * extconnect_is.js
 * Provides messaging primitives for a web page to communicate with a content script.
 * Initialize this from the content script and it will take care of loading the
 * same necessary code in the web page (i.e. extconnect_wp.js)
 *
 * Compatibility:  Chrome and Safari
*/
// Make sure only the first version gets injected
if(typeof(extconnect_is) == "undefined") {

var extconnect_is =
{
    addListener: function(fnListener) {
        this.correlator.addListener(fnListener);
    },

    removeListener: function(fnListener) {
        this.correlator.removeListener(fnListener);
    },

    // Send a request to the web page
    sendWPRequest: function(request, fnResponse)
    {
        var msg = this.correlator.wrapRequest(request, fnResponse);
        this._sendWPRequest(null, msg);
    },


    _sendWPRequest: function(target, msg)
    {
        // Ignore the target, we only send to the web page
        // Post a message to ourselves, it'll get picked up by the web page script code
        var msg2 = {
            src: "SU_CS",
            msg: msg
        }
        window.postMessage(JSON.stringify(msg2), "*");
    },

    _onWPMessage: function(msg) {
        this.correlator.handleIncoming(msg, "wp");
    },

    isReady: function() {
        return !!this._initialized;
    },

    _getBaseUri: function() {
        if(typeof(safari) != "undefined" && safari.self) {
            return safari.extension.baseURI;
        }
        else
            return chrome.extension.getURL("");
    },

    _initPageSupport: function()
    {
        // Inject the message correlator and the wp extconnect into the page
        var scriptUrl = this._getBaseUri() + "messaging_correlator.js";
        var script = document.createElement("script");
        script.setAttribute("src", scriptUrl);
        // Important!  extconnect depends on this
        script.async = false;
        document.documentElement.appendChild(script);

        scriptUrl = this._getBaseUri() + "extconnect_wp.js";
        script = document.createElement("script");
        script.setAttribute("src", scriptUrl);
        // Important!  This script depends on messaging_correlator
        script.async = false;
        document.documentElement.appendChild(script);

    },

    init: function()
    {
        // We only add this support for site pages
        var url = document.location.href;
        var regexUs = /^https?:\/\/[^\/]*?(\.stumbleupon\.com|\.stumble\.net)\//;
        if(!url.match(regexUs))
            return;
        var self = this;
        this.correlator = new MessageCorrelator(function(target, msg) {
            self._sendWPRequest(target, msg);
        });

        // Add the corresponding support to the web page
        this._initPageSupport();

        // Listen for message events from the web page
        var me = this;
        window.addEventListener("message", function(event) {
            // Only accept messages from our own window
            if(event.source != window)
                return;

            if(!event.data)
                return;

            var data = null;
            try {
                data = JSON.parse(event.data);
            } catch(ex) {
            }

            // Don't handle our own messages
            if(!data || (data.src != "SU_WP"))
                return;

            me._onWPMessage(data.msg);
        }, false);

        //
        // Raise the script ready event so anyone who is waiting for us to be
        // ready can find us.
        var scriptReadyEvent = document.createEvent("Event");
        scriptReadyEvent.initEvent("suScriptReadyExtconnectCS", false, false);
        window.dispatchEvent(scriptReadyEvent);

        this._initialized = true;
    }
}

extconnect_is.init();

} // if(typeof(extconnect_is) == "undefined") {
