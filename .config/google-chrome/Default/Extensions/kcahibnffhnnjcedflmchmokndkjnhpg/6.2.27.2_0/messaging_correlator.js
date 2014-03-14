/*
 * MessageCorrelator
 *
 * A message helper for supporting request/response semantics and listener invocation.
 * Request/response correlation is needed in Safari which natively only supports
 * "send and forget", whereas Chrome has sendRequest which takes a fnResponse
 *
 * Compatibility:  Chrome and Safari
 */

MessageCorrelator = function(fnSendRequest) {
    this._callNumber       = 0;
    this._resultCallbacks  = [];
    this._listeners        = [];
    this._fnSendRequest    = fnSendRequest;
    this._CALLBACK_TIMEOUT = 120000;  // 2 minutes

    this._msgTypes = {
        REQUEST: 0,
        RESPONSE: 1
    }

    // Cleanup callbacks
    var self = this;
    window.setInterval(function() {
        self._cleanupCallbacks();
    }, this._CALLBACK_TIMEOUT + 1);
}

MessageCorrelator.prototype = {
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

    wrapRequest: function(request, fnResponse) {
        var msg = {
            type: this._msgTypes.REQUEST,
            request: request
        }
        this._callNumber++;
        if(fnResponse)
        {
            msg.callNumber = this._callNumber;
            this._resultCallbacks[this._callNumber] = {
                time: (new Date()).getTime(),
                fnResponse: fnResponse
            }
        }

        return msg;
    },

    handleIncoming: function(msg, sender) {
        if(msg.type == this._msgTypes.REQUEST)
            this._onIncomingRequest(msg.request, msg.callNumber, sender);
        else
            this._onIncomingResponse(msg.callNumber, msg.theArgs);
    },

    _onIncomingRequest: function(request, callNumber, sender)    {
        var fnResponse = null;
        if(callNumber)
        {
            // They supplied a callnumber, so they've asked for a response.
            // Build a callback function wrapper so the client can just call
            // the callback and we will take care of sending the response
            var self = this;
            fnResponse = function() {
                // 'arguments' is coming in as an object in Safari 5.1,
                // not an array, and we want an array, so convert it.  Also in
                // 5.0.3, JSON is not able to enumerate arguments so
                // we copy it to a new array that exposes them to enumeration
                var newArgs = [];
                if(arguments.length) {
                    for(var i=0; i<arguments.length; i++)
                        newArgs.push(arguments[i]);
                } else {
                    for(key in arguments) newArgs.push(arguments[key]);
                }
                var responseMsg = {
                    type: self._msgTypes.RESPONSE,
                    callNumber: callNumber,
                    theArgs: newArgs
                }

                // Send the response, using the sender as the target
                self._fnSendRequest(sender, responseMsg);
            }
        }

        for(var i=0; i<this._listeners.length; i++)
        {
            // Notify the listener, passing the response function if it exists
            this._listeners[i](request, sender, fnResponse);
        }
    },

    _onIncomingResponse: function(callNumber, theArgs) {
        var callbackEntry = this._resultCallbacks[callNumber];
        if(callbackEntry && callbackEntry.fnResponse)
        {
            callbackEntry.fnResponse.apply(window, theArgs);
            delete this._resultCallbacks[callNumber];
        }
    },

    _cleanupCallbacks: function() {
        var now = (new Date()).getTime();
        for(var key in this._resultCallbacks) {
            if(now - this._resultCallbacks[key].time > this._CALLBACK_TIMEOUT)
                delete this._resultCallbacks[key];
        }
    }
}
