/*
 * Helper functions for working with the client api
 */

// The client API connector
var SU_ClientApiConnector_CB = function() {
    var serverUrl = Strings.get("SERVER_HTTPS");
    this.endpoints = {
        stumble: serverUrl + "/su/api/nextstumble",
        referral: serverUrl +  "/su/api/nextstumble",
        send: serverUrl + "/toolbar/shareservices.php",
        def: serverUrl + "/su/api/action",
        getState: serverUrl + "/su/api/getState",
        getOAuthToken: serverUrl + "/su/api/getOAuthToken"
    }
}
SU_ClientApiConnector_CB.prototype = new SU_ClientApiConnector();

function getApiKeychain()
{
    var globals = theBP.getExtApiValue("globals");
    if(!globals)
        return null;
    var keychain            = new SU_ClientRequestKeychain();
    keychain.tokens.stumble = globals.token ? globals.token.stumble : null;
    keychain.tokens.request = globals.token ? globals.token.ajax : null;
    keychain.OAuth          = globals.oAuth;
    return keychain;
}

function getClientApi() {
    var api      = new SU_Client(SU_ClientApiConnector_CB);
    var version  = Strings.get("VERSION");
    var keychain = getApiKeychain();
    if(keychain)
        api.setKeychain(keychain);
    api.setDevice(Strings.get("DEVICE"));
    api.setSource("litebar");
    api.setConsumerKey(Strings.get('CONSUMER_KEY'));
    api.setClientVersion(version);

    api.setSuccessFilter(function(response, params, fnSuccess, fnError) {
        if(params.action == 'getState')
        {
            theBP.onNewState(response);
            keychain = getApiKeychain();
            api.setKeychain(keychain);
        }
        return false;
    });
    return api;
}

