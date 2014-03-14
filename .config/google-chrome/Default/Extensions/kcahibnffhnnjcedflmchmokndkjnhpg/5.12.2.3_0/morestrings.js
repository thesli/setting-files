/*
 * morestrings.js
 *
 * Additions to the background page's set of strings (which are found in webkit/extension/strings.js)
 *
 * Compatibility:  Chrome
 *
*/
var MoreStrings = {
    newStrings: {
        INTRO_URL: "@@SERVER_HTTP@@/downloads/tour/chrome-new"
    },

    init: function() {
        for (var newString in this.newStrings) {
            Strings[newString] = this.newStrings[newString];
        }
    }
}

MoreStrings.init();
