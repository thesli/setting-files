/*
 * norefer.js
 *
 * Javascript for the norefer.html page which does referrer-less loads
 * 
 */
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
    var regexSite = /^https?\:\/\/(www\.stumbleupon\.com\/|[^\/]*\.stumble\.net\/)/;
    return url.match(regexSite);
}

function init() {
    var url = document.location.href;
    var regex = /.*?[\?&]url=([^&]*)(&addtokens=1)?/;
    var match = url.match(regex);
    var target = decodeURIComponent(match[1]);

    // This is only to be used for stumbleupon.com urls
    if (!isOurUrl(target))
        return;

    if(match[2]) {
        // We are adding secure tokens, we must use https for these
        target = target.replace(/^http:/, 'https:');
    }
    window.location.replace(target);
}
init();
