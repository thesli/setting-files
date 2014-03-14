/*
 * norefer.js
 *
 * Javascript for the norefer.html page which does referrer-less loads
 * 
 */
var inSafari = ((typeof(safari) != "undefined") && safari.self);
function getTokens(url, fnCallback) {
    Messaging.sendBPRequest({ type: "GET_OAUTH_INFO" }, function(data) {
        var tokens = '';
        if(data && data.consumer_key)
            tokens = 'x_su_consumer_key=' + data.consumer_key + '&x_su_access_token_key=' + data.token;
        fnCallback(tokens);
    });
}

function appendParams(url, params) {
    if(!params)
        return url;

    // We need to add the params before the hash
    // then re-add the hash parts
    var beforeHash = url;
    var trailing = '';

    var regex = /(.*?)(\#.*)/;
    var match = url.match(regex);
    if(match) {
        beforeHash = match[1];
        trailing = match[2];
    }
    if(beforeHash.indexOf("?") == -1)
        beforeHash += '?';
    else
        beforeHash += '&';
    beforeHash += params;
    return beforeHash + trailing;
}

function isOurUrl(url) {
    var regexSite = /^https?\:\/\/(www\.stumbleupon.com\/|[^\/]*\.stumble\.net\/)/;
    return url.match(regexSite);
}

function init() {
    var url = document.location.href;
    var regex = /.*?[\?&]url=([^&]*)(&addtokens=1)?/;
    var match = url.match(regex);
    var target = decodeURIComponent(match[1]);
    var isDev = (target.indexOf('stumbleupon.com') == -1);

    // This is only to be used for stumbleupon.com urls
    if (!isOurUrl(target))
        return;

    if(match[2]) {
        // We are adding secure tokens, we must use https for these
        if(!isDev)
            target = target.replace(/^http:/, 'https:');

            getTokens(target, function(tokens) {
                // Note: Using document.location = from this context will add the current top-level
                // page to the history.  Seems broken to me, but so be it.
                window.location.replace(appendParams(target, tokens));
            });
    }
    else
        window.location.replace(target);
}
init();
