/**
 * Request keychain. Holds auth for requests to API
 *   - tokens are for HTTP request security / CSRF protection
 */
var SU_ClientRequestKeychain = function() {
    this.tokens = {
        stumble: '',
        request: ''
    }

    this.OAuth = {};
}

/**
 * SU Client API. Makes authenticated requests
 * stateless, except auth string and device/source ids (for convenience)
 */
var SU_Client = function(connectorClass) {
    //constructor logic here
    this.keychain = new SU_ClientRequestKeychain();
    this.connectorClass = connectorClass ? connectorClass : SU_ClientApiConnector;
    return true;
}

SU_Client.prototype = {
    AUTH_RETRY_WAIT: 15000,
    version: 1.0,
    device: '',
    source: '',
    clientVersion: '',
    scriptVersion: '',
    consumerKey: '',
    keychain: null,
    successFilter: null,
    errorFilter: null,

    /** api calls to server **/
    rate: function(publicid, rating, callback, noFacebookAutoshare, callbackError) {
        this.makeRequest({action: 'simple-rate', pid: publicid, rating: rating, noFacebookAutoshare: noFacebookAutoshare}, callback, callbackError);
    },

    subrate: function(publicid, subrating, callback) {
        this.makeRequest({action: 'simple-subrate', pid: publicid, subrating: subrating}, callback);
    },

    blocksite: function(publicid, blocksite, callback) {
        this.makeRequest({action: 'blocksite', pid: publicid, blocksite: blocksite}, callback);
    },

    askAutoShareFacebook: function(callback) {
        this.makeRequest({action: 'askAutoShareFacebook'}, callback);
    },

    autoShareFacebook: function(publicid, url, callback) {
        this.makeRequest({action: 'autoShareFacebook', pid: publicid, url:url}, callback);
    },

    saveTimers: function(publicid, timers, callback) {
        this.makeRequest({action: 'timers', pid: publicid, timers: timers}, callback);
    },

    getStumbles: function(mode, callback) {
        var params = {};
        for (var i in mode)
        {
            if (i == 'extra')
            {
                for (var j in mode[i])
                    params[j] = mode[i][j];
            }
            else
            {
                params[i] = mode[i];
            }
        }
        params.action = 'getstumbles';

        this.makeRequest(params, callback);
    },

    getShare: function(callback) {
        var params = {};
        params.action = 'referral';

        this.makeRequest(params, callback);
    },

    getUserData: function(callback) {
        this.makeRequest({action: "userdata"}, callback);
    },

    getUrlInfo: function(url, callback) {
        this.makeRequest({
            action: 'geturlinfo',
            url: url
        }, callback);
    },

    getUserTopics: function() {
        this.makeRequest({action: "getTopics"}, callback);
    },

    checkForShares: function(callback) {
        this.makeRequest({action: "getFriendShares"}, callback);
    },

    getRequestToken: function(callback) {
        this.makeRequest({action: 'getState'}, callback);
    },

    getState: function(fnSuccess, fnFailure) {
        this.makeRequest({action: 'getState'}, fnSuccess, fnFailure);
    },

    getOAuthToken: function(callback) {
        this.makeRequest({action: 'getOAuthToken'}, callback);
    },

    logoutWebsite: function(callback) {
        this.makeRequest({action: 'logoutWebsite', logout: 1}, callback);
    },

    trk: function(metric) {
        this.makeRequest({action:'rec', metric: metric}, function() {});
    },

    sendShare: function(shareInfo, callback) {
        this.makeRequest({
            action:'send',
            in_reply_to:shareInfo.referralId,
            msg: shareInfo.text,
            url: shareInfo.url
        }, callback);
    },

    sendEmailShare: function(shareInfo, callback) {
        throw "Not yet implemented";
    },

    /** book-keeping functions **/
    setDevice: function(device) {
        this.device = device;
    },

    setSource: function(source) {
        this.source = source;
    },

    setClientVersion: function(version) {
        this.clientVersion = version;
    },

    setScriptVersion: function(version) {
        this.scriptVersion = version;
    },

    setKeychain: function(keychain) {
        this.keychain = keychain;
    },

    setConsumerKey: function (key) {
        this.consumerKey = key;
    },

    setParam: function(param, value) {
        this.params[param] = value;
    },

    setErrorFilter: function(callback) {
        this.errorFilter = callback;
    },

    setSuccessFilter: function(callback) {
        this.successFilter = callback;
    },

    setupRequestParams: function() {
        var params = {
            type: 'POST',
            async: true,
            src: this.source,
            device: this.device,
            v: this.clientVersion,
            sv: this.scriptVersion,
            x_su_consumer_key: this.consumerKey
        };

        return params;
    },

    /** request-related **/
    makeRequest: function(params, callbackSuccess, callbackError) {
        var connector = new this.connectorClass();
        var request   = {};

        request.params = this.setupRequestParams();
        for (var key in params) {
            request.params[key] = params[key];
        }

        var instance = this;
        var fnSuccess = callbackSuccess;
        if(this.successFilter)
        {
            fnSuccess = function(response) {
                if(!instance.successFilter(response, params, callbackSuccess, callbackError) && callbackSuccess)
                    callbackSuccess(response);
            }
        }

        var fnInternalErrorHandler = function(response) {
            // Our own error handler
            if (instance.handleErrorResponse(response, params, callbackSuccess, callbackError))
                return;

            var fnError = callbackError;
            if (this.errorFilter)
            {
                fnError = function(response) {
                    if(!instance.errorFilter(response, params, callbackSuccess, callbackError) && callbackError)
                        callbackError(response);
                }
            }
            if (fnError)
                fnError(response);
        }

        return connector.getResponse(request, this.keychain, fnSuccess, fnInternalErrorHandler);
    },

    handleErrorResponse: function(response, params, fnSuccess, fnError) {
        if(this.inAuthRetry || (response.status != 401) || (params.action == 'getOAuthToken'))
        {
            // No retry, just let them handle the error
            return false;
        }

        var instance = this;
        this.inAuthRetry = true;
        var fnDoneAuthRetry = function(fnCallback) {
            // Don't hammer us, cool your jets
            window.setTimeout(function() {
                instance.inAuthRetry = false;
            }, instance.AUTH_RETRY_WAIT);
        }
        var fnRetrySuccess = function(response2) {
            fnDoneAuthRetry();
            if(fnSuccess)
                fnSuccess(response2);
        }
        var fnRetryFailure = function(response2) {
            fnDoneAuthRetry();
            if(fnError)
                fnError(response2);
        }
        var fnStateSuccess = function() {
            // We were able to refresh the state, try the original call again
            instance.makeRequest(params, fnRetrySuccess, fnRetryFailure);
        }
        // If we can't refresh our state then report the _original_ failure
        var fnStateFailed = function() {
            fnDoneAuthRetry();
            if(fnError)
                fnError(response);
        }
        // Kick off the retry by refreshing our state. If state refreshing failed, try getting an oauth token
        if (params.action == 'getState')
            this.getOAuthToken(fnStateSuccess, fnStateFailed);
        else
            this.getState(fnStateSuccess, fnStateFailed);

        // true == we handled it
        return true;
    }
}

/**
 * API Connector
 *   - handles connecting client API and SU server API via ajax requests
 *   - intended to be highly naive and light
 *   - intended to be swapped out for REST API connector soon
 */
var SU_ClientApiConnector = function() {

    //define endpoints for each action.
    //RESTful Connector will specify many more and more verbosely
    this.endpoints = {
        stumble: "/su/api/nextstumble",
        referral: "/su/api/nextstumble",
        send: "/toolbar/shareservices.php",
        def: "/su/api/action",
        getState: "/su/api/getState",
        getOAuthToken: "/su/api/getOAuthToken"
    }

    this.getResponse = function(request, keychain, callback, callbackError) {
        if (!keychain) {
            throw "Must provide credentials for request";
        }

        var endpoint = this.endpoints.def;
        if (typeof request.params.action != "undefined")
        {
            if (typeof this.endpoints[request.params.action] != "undefined") {
                endpoint = this.endpoints[request.params.action];
            }
        }

        if (typeof request.params.action != "undefined" && request.params.action == "stumble") {
            request.params._token = keychain.tokens.stumble;
        }
        else {
            request.params._token = keychain.tokens.request;
        }

        request.params.output = 'json';
        $.ajax({
            url: endpoint,
            type: request.type,
            data: request.params,
            dataType: 'json',
            async: request.async,
            success: callback,
            error: callbackError
        });
    }
}
