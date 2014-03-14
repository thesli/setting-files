/*
 *
 * extconnect_wp.js
 * Provides messaging primitives for a web page to communicate with a content script.
 * This script is loaded by the corresponding content script (extconnect_is.js)
 *
 * Compatibility:  Chrome and Safari
*/

// Make sure only the first version gets injected
if(typeof(extconnect_wp) == "undefined") {

var extconnect_wp =
{
    addListener: function(fnListener) {
        this.correlator.addListener(fnListener);
    },

    removeListener: function(fnListener) {
        this.correlator.removeListener(fnListener);
    },

    // Send a request to the content script
    sendCSRequest: function(request, fnResponse)
    {
        var msg = this.correlator.wrapRequest(request, fnResponse);
        this._sendCSRequest(null, msg);
    },

    _sendCSRequest: function(target, msg)
    {
        // Ignore the target, we only send to the content script
        // Post a message to ourselves, it'll get picked up by the content script
        var msg2 = {
            src: "SU_WP",
            msg: msg
        }
        // There is a chrome bug where we can end up here with window = null (even console == null, so debug logging
        // is not possible, and breakpoints don't work either).  We check for this as a workaround to BZ1235
        if (window)
            window.postMessage(JSON.stringify(msg2), "*");
    },

    _onCSMessage: function(msg) {
        this.correlator.handleIncoming(msg, "cs");
    },

    isReady: function() {
        return !!this._initialized;
    },

    init: function()
    {
        var self = this;
        this.correlator = new MessageCorrelator(function(target, msg) {
            self._sendCSRequest(target, msg);
        });

        // Listen for message events from the content script
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
            if(!data || (data.src != "SU_CS"))
                return;

            me._onCSMessage(data.msg);
        }, false);

        this._initialized = true;

        // Raise the script ready event so anyone who is waiting for us to be
        // ready can find us.
        var scriptReadyEvent = document.createEvent("Event");
        scriptReadyEvent.initEvent("suScriptReadyExtconnectWP", false, false);
        window.dispatchEvent(scriptReadyEvent);
    }
}

extconnect_wp.init();

}
