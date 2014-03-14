/*
 *  messaging_is.js
 *
 *  Implements the core messaging API for content scripts and injected scripts
 *
 *  The core messaging API provides a layer that will enable us to
 *  use the same messaging primitives in both Safari and Chrome
 *
 * Compatibility:  Chrome and Safari
 */
var inSafari = (typeof(safari) != "undefined");
Messaging = {
    sendBPRequest: function(request, fnResponse) {
        this.sendRequest({ bp: true }, request, fnResponse);
    },

    sendRequest: function(target, request, fnResponse) {
        if(!target || !target.bp) {
            console.log("ERROR: Invalid messaging target in injected script");
            return;
        }

        if(!inSafari) {
            this._sendChromeRequest(target, request, fnResponse);
            // That's it for Chrome, it handles message correlation
            return;
        } else {
            var msg = this.correlator.wrapRequest(request, fnResponse);
            this._sendRequest(target, msg);
        }
    },

    addListener: function(fnListener) {
        if(!inSafari) {
            chrome.extension.onMessage.addListener(function(request, sender, fnResponse) {
                // Chrome always gives us a fnResponse object even if the sender didn't request one.
                // But if you call it back it will generate a noisy error.  We use responseRequested to only
                // supply a fnResponse if one was actually supplied by the caller
                if (request._responseRequested) {
                    // In addition, only return true if the response callback wasn't called synchronously
                    var didRespond = false;
                    function responseHandler() {
                        didRespond = true;
                        // Convert arguments to an array to apply
                        var theArgs = Array.prototype.slice.call(arguments);
                        fnResponse.apply(this, theArgs);
                    }
                    fnListener(request, sender, responseHandler);
                    return !didRespond;
                } else  {
                    // Otherwise, call without the fnResponse
                    fnListener(request, sender);
                    return false;
                }
            });
        }
        else
            this.correlator.addListener(fnListener);
    },

    removeListener: function(fnListener) {
        this.correlator.removeListener(fnListener);
    },

    // Called by the correlator to actually perform the send
    _sendRequest: function(target, msg) {
        // We only get messages from the background page, so it's always the target
        safari.self.tab.dispatchMessage("SUMESSAGE", msg);
    },

    _sendChromeRequest: function(target, request, fnResponse) {
        if (fnResponse)
            request._responseRequested = true;
        if (fnResponse)
            chrome.extension.sendMessage(request, fnResponse);
        else
            chrome.extension.sendMessage(request);
    },

    _handleIncoming: function(message, sender) {
        // Let the correlator handle the message
        this.correlator.handleIncoming(message, sender);
    },

    _init: function() {
        if(!inSafari)
            return;
        var self = this;
        this.correlator = new MessageCorrelator(function(target, msg) {
            self._sendRequest(target, msg);
        });

        safari.self.addEventListener("message", function(event) {
            if(event.name != "SUMESSAGE")
                return;
            self._handleIncoming(event.message, { bp: true });
        }, false);
    }
}

Messaging._init();
