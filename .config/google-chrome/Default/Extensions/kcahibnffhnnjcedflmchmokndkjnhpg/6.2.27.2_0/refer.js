/*
** The javascript for the /refer page that is used to perform navigations with
** the referer header set correctly
*/
var ReferPage =
{
    // Set on initialization
    referInfoKey: null,

    onNewReferInfo: function(referInfo) {
        var stumbleUrl = '',
            prerenderUrl = '',
            link = null;

        // Stash and remove the current values
        stumbleUrl = referInfo.stumbleUrl;
        preRenderUrl = referInfo.preRenderUrl;
        chrome.storage.local.remove(this.referInfoKey);

        if (stumbleUrl) {
            window.top.location = stumbleUrl;
            return;
        }
        else if (preRenderUrl) {
            link = document.createElement("link");
            link.setAttribute("href", preRenderUrl);
            link.setAttribute("rel", "prerender");
            document.head.appendChild(link);
        }
    },

    init: function() {
        chrome.runtime.sendMessage({ type: 'GET_TABID' }, (function(tabId) {
            var key = null;
            this.referInfoKey = 'referInfo' + tabId;

            // Listen for new referInfo
            chrome.storage.onChanged.addListener((function(changes) {
                var newValue;
                for (key in changes) {
                    if (key == this.referInfoKey) {
                        newValue = changes[key].newValue;
                        if (newValue) {
                            this.onNewReferInfo(newValue);
                        }
                    }
                }
            }).bind(this));

            // Check for existing referInfo
            chrome.storage.local.get(this.referInfoKey, (function(result) {
                if (result && result[this.referInfoKey]) {
                    this.onNewReferInfo(result[this.referInfoKey]);
                }
            }).bind(this));
        }).bind(this));
    }
}

ReferPage.init();
