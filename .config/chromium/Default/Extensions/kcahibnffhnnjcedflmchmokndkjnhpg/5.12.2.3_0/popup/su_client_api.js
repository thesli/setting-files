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

    version: 1.0,
    device: '',
    source: '',
    clientVersion: '',
    scriptVersion: '',
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

    getAuthString: function(callback) {
        this.makeRequest({action: 'getAuth'}, callback);
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
            sv: this.scriptVersion
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

        var instance = this;
        var fnSuccess = callbackSuccess;
        if(this.successFilter)
        {
            fnSuccess = function(response) {
                if(!instance.successFilter(response, params, callbackSuccess, callbackError) && callbackSuccess)
                    callbackSuccess(response);
            }
        }

        var fnError = callbackError;
        if(this.errorFilter)
        {
            fnError = function(response) {
                if(!instance.errorFilter(response, params, callbackSuccess, callbackError) && callbackError)
                    callbackError(response);
            }
        }

        return connector.getResponse(request, this.keychain, fnSuccess, fnError);
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
        getState: "/su/api/getState"
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
