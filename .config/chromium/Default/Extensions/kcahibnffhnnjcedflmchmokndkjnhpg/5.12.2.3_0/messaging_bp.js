/*
 *  messaging_core_bp.js
 *
 *  Implements the core messaging API for the background page (and "global" page on safari)
 *
 *  The core messaging API provides a layer that will enable us to
 *  use the same messaging primitives in both Safari and Chrome
 *
 *  Compatibility:  Safari and Chrome
 */
var inSafari = (typeof(safari) != "undefined")
Messaging = {
    sendRequest: function(target, request, fnResponse) {
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
        if(!target.tab && !target.toolbar) {
            console.log("ERROR: Invalid messaging target");
            return;
        }

        // In safari, the toolbar window can be accessed directly, so we just call the function
        if(target.toolbar)
            target.toolbar.Messaging._handleIncoming(msg, { bp: true });
        else if(target.tab.page) {
            // target.tab.page is undefined for unsupported tabs like the new tab (i.e. Top Sites)
            target.tab.page.dispatchMessage("SUMESSAGE", msg);
        }
    },

    _sendChromeRequest: function(target, request, fnResponse) {
        var msg = {
            type: "SUMESSAGE",
            request: request
        }
        // All frames receive the message, so we have to distinguish between
        // messages intended for the tb and messages intended for the tab
        if(target.toolbar)
            msg._target = "tb";
        else
            msg._target = "tab";
        if (fnResponse) {
            request._responseRequested = true;
        }
        chrome.tabs.sendMessage(target.tab.id, msg, fnResponse);
    },

    _handleIncoming: function(message, sender) {
        // Let the correlator handle the message
        this.correlator.handleIncoming(message, sender);
    },

    _init: function() {
        var self = this;
        this.correlator = new MessageCorrelator(function(target, msg) {
            self._sendRequest(target, msg);
        });

        if(inSafari) {
            safari.application.addEventListener("message", function(event) {
                if(event.name != "SUMESSAGE")
                    return;
                var sender = {
                    tab: event.target
                }
                self._handleIncoming(event.message, sender);
            }, false);
        } else {
            chrome.extension.onMessage.addListener(function(msg, sender, fnResponse) {
                if(!msg || (msg.type != "SUMESSAGE"))
                    return false;
                self._handleIncoming(msg, sender);
                return true;  // Matches sendRequest semantics
            });
        }
    }
}

Messaging._init();
