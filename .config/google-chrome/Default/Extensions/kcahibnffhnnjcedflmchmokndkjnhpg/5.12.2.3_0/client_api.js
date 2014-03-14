/**
 * Request keychain. Holds auth for requests to API
 *   - tokens are for HTTP request security / anti-forgery
 *   - authString and OAuth are competing solutions to the same issue: user authentication
 */
var SU_ClientRequestKeychain = function() {
    this.tokens = {
        stumble: '',
        request: ''
    }

    this.authString = '';
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
        if (!callback) {
            callback = function(response) {
            }
        }
        this.makeRequest({action: 'simple-rate', pid: publicid, rating: rating, noFacebookAutoshare: noFacebookAutoshare}, callback, callbackError);
    },

    subrate: function(publicid, subrating, callback) {
        if (!callback) {
            callback = function(response) {
            }
        }
        this.makeRequest({action: 'simple-subrate', pid: publicid, subrating: subrating}, callback);
    },

    blocksite: function(publicid, blocksite, callback) {
        if (!callback) {
            callback = function(response) {
            }
        }
        this.makeRequest({action: 'blocksite', pid: publicid, blocksite: blocksite}, callback);
    },

    askAutoShareFacebook: function(callback) {
        if (!callback) return;
        this.makeRequest({action: 'askAutoShareFacebook'}, callback);
    },

    autoShareFacebook: function(publicid, url, callback) {
        if (!callback)  {
            callback = function(response) {
            }
        }
        this.makeRequest({action: 'autoShareFacebook', pid: publicid, url:url}, callback);
    },

    saveTimers: function(publicid, timers, callback) {
        if (!callback) {
            callback = function(response) {
            }
        }
        this.makeRequest({action: 'timers', pid: publicid, timers: timers}, callback);
    },

    getStumble: function(mode, callback) {
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
        params.action = 'stumble';

        return this.makeRequest(params, callback);
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

        return this.makeRequest(params, callback);
    },

    getShare: function(callback) {
        var params = {};
        params.action = 'referral';

        return this.makeRequest(params, callback);
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

    getAuthString: function(callback) {
        this.makeRequest({action: 'getAuth'}, fnSuccess, fnFailure);
    },

    logoutWebsite: function(callback) {
        this.makeRequest({action: 'logoutWebsite', logout: 1}, callback);
    },

    getStartSessionUrl: function(url) {
        // If you don't pass a callback to makeRequest it returns a GET-formatted URL
        return this.makeRequest({action: 'startSession', url:url });
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
            src: this.source,
            device: this.device,
            v: this.clientVersion,
            sv: this.scriptVersion,
            x_su_consumer_key: this.consumerKey
        };

        return params;
    },

    setAuth: function(authString) {
        this.keychain.authString = authString;
    },

    /** request-related **/
    makeRequest: function(params, callbackSuccess, callbackError) {
        var connector = new this.connectorClass();
        var request   = new SU_ClientRequest();
        if (params.action && params.action == 'getState') {
//            request.async = false;
        }
        var postActions = { 'logoutWebsite': true,
                'send': true,
                'timers': true
                };
        if (params.action && (params.action in postActions)) {
            request.type = 'POST';
        }

        request.params = this.setupRequestParams();
        for (var key in params) {
            request.params[key] = params[key];
        }

        // Note:  There is a special-case where if a callback isn't supplied, the caller gets a direct
        //        response of a url to navigate to (yuck! @todo: change this).  So we don't filter these types of
        //        direct navigation approaches (thus the check on callbackSuccess)
        var instance = this;
        var fnSuccess = callbackSuccess;
        if(fnSuccess && this.successFilter)
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
        getOAuthToken: "/su/api/getOAuthToken",
        startSession: "/su/api/startSession"
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

        if (keychain.authString) {
            request.params.auth = keychain.authString;
        }

        if (keychain.OAuth != undefined && keychain.OAuth != null && keychain.OAuth.key != undefined) {
            request.params.x_su_access_token_key = keychain.OAuth.key;
        }

        if (typeof request.params.action != "undefined" && request.params.action == "stumble") {
            request.params._token = keychain.tokens.stumble;
        }
        else {
            request.params._token = keychain.tokens.request;
        }

        if (callback)
        {
            if  (!callbackError)
                callbackError = function() {}
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
        else
        {
            var query_string = [];
            for (var i in request.params)
            {
                query_string.push(i + '=' + request.params[i]);
            }
            var url = endpoint + '?' + query_string.join("&");
            return url;
        }
    }
}

/**
 * REST API Connector
 *   - will replace deprecated API connector in near future
 *   - will be slightly less naive than deprecated one, since RESTful (one endpoint per call type)
 */
var SU_ClientApiConnector_REST = function() {
    this.endpoints = {
        stumble: '',
        rate: '',
        getTopics: ''
    }
}
SU_ClientApiConnector_REST.prototype = new SU_ClientApiConnector();

/**
 * Request convenience class
 */
var SU_ClientRequest = function() {

    this.type = "GET";
    this.params = {};
    this.async = true;

    this.defaultParams = {
        src : 'litebar'
    }
};