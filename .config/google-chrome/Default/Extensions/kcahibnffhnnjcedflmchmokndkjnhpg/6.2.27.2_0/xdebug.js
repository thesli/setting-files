/*
 *  xdebug.js
 *
 *  Debugging support for using xdebug when 3rd party cookies are disabled.
 *
 *  Chromebar is in an iframe so no cookies are sent when 3rd party cookies are disabled.
 *  As such, it is not possible to initiate an XDebug session.
 *
 *  So we provide support in chromebar for adding the XDEBUG_SESSION parameter
 *  to every stumbleupon.com request.
 *
 *  This is debug-only functionality on the advanced options page, not normally visible to
 *  regular users.
 *
 */
var XDebug = {
    _fnOnBeforeSendHeadersListener: null,

    _onBeforeSendHeaders: function(details) {
        for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'Cookie') {
                details.requestHeaders[i].value = details.requestHeaders[i].value + ';XDEBUG_SESSION=PHPSTORM';
                break;
            }
        }
        if (i == details.requestHeaders.length) {
            details.requestHeaders.push({ name: 'Cookie', value: 'XDEBUG_SESSION=PHPSTORM' });
        }
        return { requestHeaders: details.requestHeaders};
    },

    updateListeners: function() {
        // XDebug Cookie listener
        if (SU.Storage.get('enableXDebugCookie')) {
            if (!this._fnOnBeforeSendHeadersListener) {
                this._fnOnBeforeSendHeadersListener = (function(details) {
                    return this._onBeforeSendHeaders(details);
                }).bind(this);

                chrome.webRequest.onBeforeSendHeaders.addListener(
                    this._fnOnBeforeSendHeadersListener,
                    {
                        urls: [ '*://*.stumble.net/*' ],
                        types: [ 'main_frame', 'sub_frame', 'xmlhttprequest' ]
                    },
                    [ 'blocking', 'requestHeaders' ]
                );
            }
        } else {
            if (this._fnOnBeforeSendHeadersListener) {
                chrome.webRequest.onBeforeSendHeaders.removeListener(this._fnOnBeforeSendHeadersListener);
                this._fnOnBeforeSendHeadersListener = null;
            }
        }
    },

    init: function() {
        this.updateListeners();
    }
}

XDebug.init();