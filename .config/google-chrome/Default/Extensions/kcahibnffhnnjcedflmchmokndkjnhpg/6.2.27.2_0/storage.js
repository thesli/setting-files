/*
 * Local storage functionality
 *
 * Compatibility:  Chrome and Safari
 *
*/
if(typeof(SU) == "undefined")
    SU = {};

SU.Storage = {
    get: function(key) {
        var res = localStorage[key];
        if(typeof(res) == "undefined")
            return null;
        else {
            return JSON.parse(res);
        }
    },

    set: function(key, value) {
        if(value === null)
            delete localStorage[key];
        else
            localStorage[key] = JSON.stringify(value);
    }
}
