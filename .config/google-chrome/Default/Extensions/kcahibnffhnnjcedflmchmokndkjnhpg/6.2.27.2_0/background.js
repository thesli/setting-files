/*
 * Base background page code
 *
 * Compatibility:  Chrome and Safari
 *
*/

var inSafari = (typeof(safari) != "undefined");

var BackgroundPage = Class.extend({
    SESS_PAUSE_REFRESH: 5 * 60 * 1000,
    REDIRECT_LISTENER_TIMEOUT: 60 * 1000,

    activeTabs: {},
    readyTabs: {},
    loadingTabs: {},
    pendingBroadcasts: {},
    lastSelectedTabId: null,
    lastToolbarCapture: null,
    stateAtCapture: null,
    lastResizeWidth: null,
    initialized: false,
    // Do not update activeUrls until we have restored tabs on restart.
    activeUrlsLocked: true,
    loggingOut: false,

    //
    // updateActiveUrls
    //
    updateActiveUrls: function(url)
    {
        if(this.activeUrlsLocked)
            return;

        // Keep track of all active URLs so we can restore them on restart.
        var self = this;
        chrome.windows.getAll({ populate: true }, function(arrWindows) {
            var activeUrls = {};
            for(var i=0; i<arrWindows.length; i++)
            {
                var tabs = arrWindows[i].tabs;
                for(var iTab=0; iTab < tabs.length; iTab++)
                {
                    var tab = tabs[iTab];
                    if(self.activeTabs[tab.id])
                        activeUrls[tab.url] = 1;
                }
            }
            SU.Storage.set("activeUrls", activeUrls);
        });
    },

    clearActiveUrls: function()
    {
        SU.Storage.set("activeUrls", {});
    },

    isRecentStumble: function(url)
    {
        return UrlData.lookup(url);
    },

    reloadResources: function()
    {
        // Refresh domain-dependent resources
        Blacklist.refresh();
    },

    changeDomain: function(newDomain)
    {
        SU.Storage.set("domain", newDomain);
        this.reloadResources();
    },

    getStumbleState: function()
    {
        var globals = this.getExtApiValue("globals");
        if(!globals)
            return null;
        return globals.state;
    },
    //
    // getPreFrameImage
    //
    // The pre frame image is used to pre-render the toolbar.  It should look as close as possible
    // to what the final toolbar.  It will be rendered directly in the page, and it's purpose is to
    // avoid the inevitable flicker that you will get when using an iframe (caused by additional delay
    // before the frame is displayed).
    //
    getPreFrameImage: function()
    {
        var state = this.getStumbleState();
        if(JSON.stringify(state) != JSON.stringify(this.stateAtCapture))
            return null;

        if(SU.Storage.get("disablePreFrame"))
            return null;
        else
            return this.lastToolbarCapture;
    },

    displayToolbar: function(tab, fnResponse)
    {
        this.updateActiveUrls();

        if(tab)
            this.loadingTabs[tab.id] = true;

        var frameUrl = Strings.get("TBFRAME_URL");

        this.sendTabRequest(tab, { type: "SHOWTOOLBAR", frameUrl: frameUrl, preFrameImage: this.getPreFrameImage() });
    },

    removeToolbar: function(tab)
    {
        if(this.activeTabs[tab.id])
        {
            delete this.activeTabs[tab.id];
        }

        // Tell the content script to destroy the toolbar.
        this.sendTabRequest(tab, { type: "DESTROYTOOLBAR" });
    },

    /*
    ** A supported tab is a tab that we would _expect_ to be able to display the toolbar on
    ** and be able to do normal operations on, so mostly normal web URLs.  Some exceptions are
    ** the Google extension and webstore pages where extensions aren't supported.
    **
    ** This is a different concept than the blacklist which is tabs that would otherwise be
    ** supported but we are blacklisting them because of compatibility issues.
    */
    isTabSupported: function(tab)
    {
        var url = tab.url.toString();
        if(!url.match(Constants.REGEX_SUPPORTED_URLS))
            return false;

        return true;
    },

    isNewTab: function(tab)
    {
        return tab.url == "chrome://newtab/";
    },

    //
    // activateTab
    //
    // activate the current tab and display the toolbar on it.    If the tab is on a URL that cannot display the
    // toolbar, then if the caller specified "forceDisplay", then force it to be displayed on a new tab.
    //
    activateTab: function(tab, forceDisplay)
    {
        this.activeTabs[tab.id] = true;

        // If this tab is on a URL that does not support our toolbar, then stumble directly.
        if(!this.isTabSupported(tab))
        {
            if(forceDisplay)
            {
                // This tab is not supported, so stumble to a new, supported URL.
                this.stumble(tab);
            }
        }
        else if(!this.readyTabs[tab.id])
        {
            if(forceDisplay && !Blacklist.isBlacklisted(tab.url))
            {
                // We need to refresh this tab because it existed before our extension was loaded, which will automatically
                // display the toolbar because the tab has already been marked as active.
                chrome.tabs.reload(tab.id);
            }
        }
        else if(!Blacklist.isBlacklisted(tab.url))
            this.displayToolbar(tab);
    },

    showDefaultIntroPage: function() {
        var url = Strings.get("INTRO_URL");
        Utils.navigate(url, true);
    },

    hitFirstRun: function(oldVersion)
    {
        // Hit firstrun to find the intro URL
        var params = oldVersion ? { PREV_VERSION: oldVersion } : null;
        var url = Strings.get("FIRST_RUN", params);
        var self = this;
        var x = new XMLHttpRequest;
        x.open("GET", url, true);
        this.addStumbleUponHeadersToXHR(x);

        x.onreadystatechange = function() {
            if ((x.readyState == 4) && (x.status == 200))
            {
                try {
                    var result = JSON.parse(x.responseText);
                    if (result.client && result.client.id) {
                        SU.Storage.set("clientid", result.client.id);
                        Cookies.updateClientIdCookie();
                    }
                    if (result.showUrl)
                        Utils.navigate(result.showUrl, true);
                    else if (result.showUrl !== false)
                        self.showDefaultIntroPage();
                } catch(ex) {
                    // We catch exceptions because first-run failures are not critical and should
                    // not prevent the rest of the extension initialization
                    console.log("firstRun error: " + JSON.stringify(ex));
                    console.log("firstRun error message: " + ex.message);
                }
            }
        };

        x.send();
    },

    getTabIdFromTarget: function(target) {
        var tabid = (typeof(target) == "number") ? target : null;

        if(!tabid && (typeof(target.id) == "number")) {
            tabid = target.id;
        }
        if(!tabid && target.tab && target.tab.id) {
            tabid = target.tab.id;
        }

        return tabid;
    },

    sendTabRequest: function(target, request, fnResponse)
    {
        var tabid = this.getTabIdFromTarget(target);

        if(tabid) {
            if(fnResponse) {
                request._responseRequested = true;
                chrome.tabs.sendMessage(tabid, request, fnResponse);
            }
            else
                chrome.tabs.sendMessage(tabid, request);
        } else if(target.toolbar) {
            // Send it to the toolbar
            Messaging.sendRequest(target, request, fnResponse);

            // Also send it to the active tab for that toolbar
            var tab = target.toolbar.safari.self.browserWindow.activeTab;
            target = { tab: tab };
            Messaging.sendRequest(target, request, fnResponse);
        } else if(target.tab) {
            // Send it to the tab
            Messaging.sendRequest(target, request, fnResponse);

            // Also, find the toolbar and send it to the toolbar
            for(var iBar=0; iBar < safari.extension.bars.length; iBar++) {
                var bar = safari.extension.bars[iBar];
                if(bar.browserWindow == target.tab.browserWindow) {
                    var frameWindow = bar.contentWindow.document.getElementById("the-frame").contentWindow;
                    Messaging.sendRequest({ toolbar: frameWindow }, request, fnResponse);
                }
            }
        }
    },

    // Send the request to all tabs.
    sendRequestToToolbars: function(request, fnResponse)
    {
        var id;
        for(id in this.activeTabs)
        {
            id = parseInt(id);
            try {
                this.sendTabRequest(id, request, fnResponse);
            } catch(ex) {
                console.log("Failed broadcast to: " + id);
            }
        }
    },

    onBroadcast: function(msg)
    {
        // Send the broadcast message to all the toolbars.
        var request = { type: "LBBROADCAST", msg: msg };
        this.sendRequestToToolbars(request);
        for(var tabid in this.loadingTabs)
        {
            tabid = parseInt(tabid);
            // Save the broadcast to make sure it gets delivered to
            // any tabs that were already loading.
            if(!this.pendingBroadcasts[tabid])
                this.pendingBroadcasts[tabid] = [];
            this.pendingBroadcasts[tabid].push(request);
        }
    },

    onStumbleStarted: function(tab)
    {
        // If they are stumbling _from_ a stumble, then get the GA stats
        if(!this.isRecentStumble(tab.url))
            return;

        this.sendTabRequest(tab, { type: "GETGASTATS" }, function(gaStats) {
            if(!gaStats)
                return;

            // Build the request
            var url = 'http://www.google-analytics.com/__utm.gif';
            var request = url + "?";
            var first = true;
            for(var param in gaStats)
            {
                request += (first ? "" : "&") + param + "=" + encodeURIComponent(gaStats[param]);
                first = false;
            }

            // Send the request asynchronously
            var xhr = new XMLHttpRequest;
            xhr.open("GET", request, true);
            xhr.send(null);
        });
    },

    logout: function(showLoggedOutPage) {
        var self = this;
        var api = getClientApi();
        api.logoutWebsite(function() {
            // Clear the oAuth token and show the logged out page
            self.updateGlobals({ oAuth: null });
            if (showLoggedOutPage)
                Utils.navigate(Strings.get("LOGGED_OUT_URL"));
        });
    },

    handleApiMessage: function(msg, sender)
    {
        var handled = true;
        switch(msg.messageId)
        {
        case "msgNewReferralCount":
            SU.Storage.set("referralCount", msg.data);
            this.updateReferralDisplay();
            break;
        case "litebarLogout":
            // Litebars are notifying us of logout, clear our logout state
            Auth.logout(true);

            // Let others know about this
            handled = false;
            break;
        case "msgRefreshBlacklist":
            if(!msg.data)
                Blacklist.refresh();
            else {
                var current = SU.Storage.get("blacklistVersion");
                if(!current || (current != msg.data))
                    Blacklist.refresh();
            }
            break;
        case "disableStumble":
        case "enableStumble":
            // sendTabRequest(tabid, { type: msg.messageId });
            break;
        case "msgRefreshState":
            this.onRefreshState();
            handled = true;
            break;
        case "msgUpdateUrlData":
            var data = msg.data;
            UrlData.update(data.url, data);
            // If we have a canonical url, then index off of that also
            if (data.canonicalUrl)
                UrlData.update(data.canonicalUrl, data);
            break;
        case "msgLogout":
            this.logout();
            break;
        default:
            handled = false;
        }

        return handled;
    },

    //
    // broadcastMessage
    //
    // broadcasts an extension API message to all of the end points (except this one)
    //
    broadcastMessage: function(messageId, data)
    {
        var sender = { id: 1 };
        this.sendRequestToAll({
                type: "EXTAPIBROADCAST",
                data: {
                    messageId: messageId,
                    data: data
                }
        });
    },

    //
    // sendApiMessage
    //
    // Sends an extension API message directoy to a tab
    //
    sendApiMessage: function(target, messageId, data)
    {
        var sender = { id: 1 };
        var request = {
            type: "EXTAPIBROADCAST",
            data: {
                messageId: messageId,
                data: data
            }
        };
        this.sendTabRequest(target, request);
    },

    onExtApiBroadcast: function(request, sender)
    {
        if(!this.handleApiMessage(request.data, sender))
            this.sendRequestToAll(request);
    },

    onExtApiPostMessage: function(request, sender)
    {
        // Add the sender tab or toolbar to the API message
        if(sender.tab) {
            if(inSafari)
                request.data.sender.tabId = SafariTabHelper.getId(sender.tab);
            else
                request.data.sender.tabId = sender.tab.id;
        }
        if(sender.toolbar)
            request.data.sender.toolbar = sender.toolbar;

        if(!this.handleApiMessage(request.data, sender))
        {
            if (request.data.target == "current-bar") {
                if (inSafari) {
                    var toolbar = SafariTabHelper.getToolbarForTab(sender.tab);
                    if (toolbar) {
                        // Set the toolbar extension api as the target
                        var target = { id : toolbar.suExtensionApi.id };
                        request.data.target = target;
                        this.sendTabRequest({ toolbar: toolbar }, request);
                    }
                    return;
                }
                else {
                    // In Chrome, send the request back to the current-bar endpoint in the sender's tab
                    request.data.target = {
                        id: "current-bar"
                    }
                    this.sendTabRequest(sender.tab, request);
                    return;
                }
            }

            if(request.data.target &&
                request.data.target.tabId)
            {
                if(inSafari) {
                    var tab = SafariTabHelper.getTab(request.data.target.tabId);
                    if(tab)
                        this.sendTabRequest(tab, request);
                } else {
                    // Only post the message to the target tab
                    chrome.tabs.get(request.data.target.tabId, function(tab) {
                        if (tab)
                            this.sendTabRequest(tab, request);
                    });
                }
            }
            else
            {
                // We only have the endpoint id, not the tab id, send it to
                // everyone
                this.sendRequestToAll(request);
            }
        }
    },

    // Send the request to all tabs.
    sendRequestToAll: function(request, fnResponse)
    {
        if(!inSafari) {
            var self = this;
            // Send it to all tabs, which will include both toolbars and site pages
            chrome.windows.getAll({ populate: true }, function(arrWindows) {
                for(var i=0; i<arrWindows.length; i++)
                {
                    var tabs = arrWindows[i].tabs;
                    for(var iTab=0; iTab < tabs.length; iTab++)
                    {
                        var tab = tabs[iTab];
                        self.sendTabRequest(tab, request, fnResponse);
                    }
                }
            });
        } else {
            // Now we need to send it to all of the toolbars
            for(var iBar=0; iBar < safari.extension.bars.length; iBar++) {
                var bar = safari.extension.bars[iBar];
                var frameWindow = bar.contentWindow.document.getElementById("the-frame").contentWindow;
                try {
                    Messaging.sendRequest({ toolbar: frameWindow }, request, fnResponse);
                } catch(ex) {
                    console.log("Send to toolbar " + iBar + " failed");
                }
            }

            // Send it to all tabs
            for(var iWin = 0; iWin < safari.application.browserWindows.length; iWin++) {
                var win = safari.application.browserWindows[iWin];
                for(var iTab = 0; iTab < win.tabs.length; iTab++) {
                    var tab = win.tabs[iTab];
                    try {
                        Messaging.sendRequest({ tab: tab }, request, fnResponse);
                    } catch(ex) {
                        console.log("Send to tab with url '" + tab.url + "' failed");
                    }
                }
            }
        }
    },

    captureToolbarImage: function(tab, fnCallback)
    {
        if(!tab || SU.Storage.get("disablePreFrame")) {
            if(fnCallback)
                fnCallback();
            return;
        }
        // Only perform a capture on the currently selected tab. This avoids unnecessary work when background
        // tabs reload, for example during tab restoration on start-up.
        if(!tab.selected) {
            if(fnCallback)
                fnCallback();
            return;
        }

        var self = this;
        chrome.tabs.captureVisibleTab(tab.windowId, function(dataUrl) {
            // We only need the top 40px, so crop this using a canvas.
            // We do this because the full page may be large and complex, and it may take
            // a while to load as our preframe image, causing a visual delay in rendering.
            var canvas = document.getElementById("snapshotCanvas");
            var ctx = canvas.getContext("2d");

            var img = new Image();
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = 40;
                ctx.drawImage(img, 0, 0, img.width, 40, 0, 0, img.width, 40);
                self.lastToolbarCapture = canvas.toDataURL();
            }
            img.src =  dataUrl;
            if(fnCallback)
                fnCallback();
        });
    },

    updateReferralDisplay: function()
    {
        var referralCount = SU.Storage.get("referralCount");
        var strCount = "";
        if(referralCount)
            strCount = referralCount.toString();
        chrome.browserAction.setBadgeText({ text: strCount });
    },

    normalizeKey: function(key)
    {
        if(key.indexOf("@@") == 0)
            return key.slice(2);
        else
            return "extapi." + key;
    },

    onCheckLoginReload: function(request, sender)
    {
        if(!sender || !sender.tab || !sender.tab.id)
            return;

        Auth.checkLoginReload(sender.tab.id);
    },

    onExtApiSetValue: function(key, value)
    {
        var oldValue = this.getExtApiValue(key);
        var nKey = this.normalizeKey(key);
        if( (typeof(value) == "undefined") || (value === null))
        {
            delete window.localStorage[nKey];
        }
        else
        {
            window.localStorage[nKey] = JSON.stringify(value);
        }

        if(typeof(oldValue) == "undefined")
            oldValue = null;
        if(typeof(value) == "undefined")
            value = null;

        if(JSON.stringify(oldValue) != JSON.stringify(value))
        {
            this.broadcastMessage("dataChanged", { key: key, oldValue: oldValue, newValue: value });
        }
    },

    onSetStumbleMode: function(request, sender)
    {
        var globals = this.getExtApiValue("globals");
        if(!globals)
            globals = {};
        globals['state'] = request.mode;

        // Go through the extension api setvalue path so all endpoints get notified of the change
        this.onExtApiSetValue('globals', globals);
    },

    // tabid is optional
    checkShowUpgradePage: function(tabid)
    {
        if(!SU.Storage.get("showUpgrade"))
            return false;

        SU.Storage.set("showUpgrade", null);
        var url = Strings.get("UPGRADE_URL");
        chrome.tabs.update(tabid, { url: url });
        return true;
    },

    /*
     * We listen for redirects so we can attach URL data to redirected URLs
    */
    listenForRedirects: function(url) {
        var filter, urlInfo,
            fnRedirectListener = null,
            fnCompletedListener = null,
            timeoutListener = null,
            self = this;

        urlInfo = Utils.parseHttpUrl(url);
        if (!urlInfo) {
            return;
        }

        filter = urlInfo.protocol + '//' + urlInfo.host + "/*";

        fnRedirectListener = function(details) {
            var currentData, srcUrlInfo, redirectUrlInfo;

            // Only do redirect work if we have data for the URL being redirected
            currentData = UrlData.lookup(details.url);
            if (!currentData) {
                return;
            }

            // Parse the URL (and only handle http(s) urls)
            srcUrlInfo = Utils.parseHttpUrl(details.url);
            redirectUrlInfo = Utils.parseHttpUrl(details.redirectUrl);
            if (!srcUrlInfo || !redirectUrlInfo) {
                return;
            }

            UrlData.update(details.redirectUrl, currentData);

            // If they redirected to a different protocol or host then we have to listen for
            // redirects on the new host
            if ( (srcUrlInfo.protocol != redirectUrlInfo.protocol) ||
                 (srcUrlInfo.host != redirectUrlInfo.host) ) {
                 self.listenForRedirects(details.redirectUrl);
            }
        }

        fnCompletedListener = function(details) {
            // We only listen to exactly one request for one tabid, so remove all listeners
            // when the request is complete
            if (!fnCompletedListener) {
                // If the listeners were already removed by the timeout, then we're done
                return;
            }

            window.clearTimeout(timeoutListener);
            chrome.webRequest.onBeforeRedirect.removeListener(fnRedirectListener);
            chrome.webRequest.onErrorOccurred.removeListener(fnCompletedListener);
            chrome.webRequest.onCompleted.removeListener(fnCompletedListener);

            fnCompletedListener = null;
        }

        // A request might not happen so make sure to remove the listeners after a timeout period
        timeoutListener = window.setTimeout(function() {
            if (fnCompletedListener) {
                // Same logic as the standard error or completed listeners
                fnCompletedListener();
            }
        }, this.REDIRECT_LISTENER_TIMEOUT);

        chrome.webRequest.onBeforeRedirect.addListener(fnRedirectListener, { urls: [ filter ], types: [ 'main_frame' ] });
        chrome.webRequest.onErrorOccurred.addListener(fnCompletedListener, { urls: [ filter ], types: [ 'main_frame' ] });
        chrome.webRequest.onCompleted.addListener(fnCompletedListener,     { urls: [ filter ], types: [ 'main_frame' ] });
    },

    onStumble: function(request, sender, fnResponse)
    {
        if(!inSafari && this.checkShowUpgradePage(sender.tab.id))
            return;

        var globals = this.getExtApiValue('globals');
        var state = { mode: "all" };
        if(globals && globals.state)
            state = globals.state;

        var target = sender;
        if (inSafari && sender.tab) {
            // Get the toolbar for the tab, and use that as the target for the stumble.  This allows the stumble
            // to proceed even if the tab is closed after the stumble request was sent.  This happens when
            // a stumble is initiated by an overlay in an overlay-holder page (e.g. the interests overlay).
            var toolbar = SafariTabHelper.getToolbarForTab(sender.tab);
            if (toolbar) {
                // Set the toolbar extension api as the target
                target = { toolbar: toolbar };
            }
        }
        this.sendApiMessage(target, "stumbleStarted");
        this.onStumbleStarted(sender.tab);

        var api = getClientApi();
        var self = this;
        api.getStumbles(state, function(result) {
            if(!result._success)
                return;

            // Add the guess to the url result
            if (result.guess)
                result.url.guess = result.guess;

            // Add the url data to our dictionary
            UrlData.update(result.url.url, result.url);
            if (result.url.guess) {
                UrlData.update(result.url.guess.url, result.url.guess);
            }
            var targetUrl = result.url.url;

            if (result.url.is_video == true)
                targetUrl = Strings.get('VIDEO_URL') + result.url.publicid;
            else if (result.url.is_raw_image)
                targetUrl = Strings.get('PHOTO_URL') + result.url.publicid;
            if(fnResponse)
                fnResponse();

            self.listenForRedirects(targetUrl);
            if (result.url.guess) {
                self.listenForRedirects(result.url.guess.url);
            }

            // Tell the toolbar to do the stumble so it uses the proper referrer
            self.sendTabRequest(sender.tab, { type: 'DO_STUMBLE', url: targetUrl });
        });
    },

    getExtApiValue: function(key)
    {
        var result = window.localStorage[this.normalizeKey(key)];
        if(typeof(result) == "undefined") {
            result = null;
        }
        else {
            try {
                result = JSON.parse(result);
            }
            catch (e) {
                result = null;
            }
        }
        return result;
    },

    onRefreshState: function() {
        // Do not refresh state while we are logging out, wait until it is completed
        function _doRefresh() {
            var api = getClientApi();
            api.getState(function() {});
        }

        if (this.loggingOut) {
            this.postLogoutCallback = _doRefresh;
            return;
        }

        _doRefresh();
    },

    onPageLoading: function(request, sender) {
        // Let the toolbar know the tab has been navigated
        this.sendApiMessage(sender, "activeTabNavigated");
    },

    findTabIndex: function(tab) {
        var browserWindow = tab.browserWindow;
        for(var i=0; i<browserWindow.tabs.length; i++) {
            if(tab == browserWindow.tabs[i]) {
                return i;
            }
        }
        return -1;
    },

    overlayCreateOrToggle: function(request, sender, fnResponse) {
        if(!inSafari) {
            this.sendTabRequest(sender, request, fnResponse);
            return;
        }

        // In Safari, find out if we have to create a new tab to display the UI in
        var theTab = null;
        var browserWindow = null;
        if(sender.tab) {
            browserWindow = sender.tab.browserWindow;
            theTab = sender.tab;
        } else if(sender.toolbar) {
            // Also send it to the active tab for that toolbar
            browserWindow = sender.toolbar.safari.self.browserWindow;
            theTab = browserWindow.activeTab;
        }

        var forceNew = (!theTab.url || !theTab.url.match(/^https?:\/\//))
        if(!forceNew) {
            this.sendTabRequest(sender, request, fnResponse);
        }
        else {
            // Insert the overlay holder tab directly after the new tab
            var index = this.findTabIndex(theTab);
            var newTab = null;
            if(index != -1)
                newTab = browserWindow.openTab('foreground', index);
            else
                newTab = browserWindow.openTab('foreground');

            // Create a new tab to display the overlay in
            newTab.url = Strings.get("OVERLAY_HOLDER_URL");
            newTab.overlay = {
                request: request,
                sender: sender,
                fnResponse: fnResponse
            }
        }
    },

    overlayWithUrl: function(request, sender, fnResponse) {
        // Add the overlay to our URL data store
        UrlData.update(request.url, { overlay: request.overlay });

        // And display the URL
        Utils.navigate(request.url, request.newTab);
        if (fnResponse)
            fnResponse();
    },

    // Show any overlays associated with this url
    checkShowUrlOverlay: function(tab) {
        var urlData = UrlData.lookup(tab.url);
        if (!urlData ||  !urlData.overlay)
            return;

        // Only show the overlay once
        UrlData.update(tab.url, { overlay: null });

        // Use the tab's associated bar as the opener.  It's not technically accurate, but there's a lot
        // of overlay code that assumes it's that way, so we make it so.
        var openerId = urlData.overlay.openerId;
        if (inSafari) {
            // Use the toolbar opener id
            var toolbar = SafariTabHelper.getToolbarForTab(tab);
            if (toolbar)
                openerId = toolbar.suExtensionApi.getId();
        }

        // Emulate the overlay creation message
        this.overlayCreateOrToggle({
            type: "OVERLAY_CREATE",
            id: urlData.overlay.id,
            options: urlData.overlay.options,
            openerId: openerId,
            openerSrc: urlData.overlay.openerSrc
        }, { tab: tab });
    },

    onNewPage: function(request, tab, fnResponse)
    {
        this.checkShowUrlOverlay(tab);
    },

    // onDirectRequest are Chrome-specific messages not sent through the messaging wrapper
    // Return true if you expect to send an asynchronous response, else return false
    onDirectRequest: function(request, sender, fnResponse) {
        switch(request.type) {
            case "GET_TABID":
                fnResponse(sender.tab.id);
                break;
        }
        return false;
    },

    onRequest: function(request, sender, fnResponse)
    {
        var result = null;
        switch(request.type)
        {
            case "BLACKLIST_URL":
                Blacklist.addUrl(request.url);
                this.updateBadgeIcon(sender.tab);
                break;
            case "GETWINDOWDIMENSIONS":
                this.sendTabRequest(sender.tab, { type: "GETWINDOWDIMENSIONS" }, fnResponse);
                break;
            case "SETHEIGHT":
                this.sendTabRequest(sender.tab, { type: "SETHEIGHT", height: request.height }, fnResponse);
                break;
            case "GETHEIGHT":
                this.sendTabRequest(sender.tab, { type: "GETHEIGHT" }, fnResponse);
                break;
            case "GETADDRESS":
                this.sendTabRequest(sender.tab, { type: "GETADDRESS" }, fnResponse);
                break;
            case "GETCONTENTLOCATION":
                this.sendTabRequest(sender.tab, { type: "GETCONTENTLOCATION" }, fnResponse);
                break;
            case "SETCONTENTFOCUS":
                this.sendTabRequest(sender.tab, { type: "SETCONTENTFOCUS" }, fnResponse);
                break;
            case "GETDOMAIN":
                // Legacy name was a bad choice, but so be it
                fnResponse(Strings.get("SERVER"));
                break;
            case "GETVALUE":
                result = this.getExtApiValue(request.key);
                if(typeof(fnResponse) != "undefined")
                    fnResponse(result);
                break;
            case "SETVALUE":
                this.onExtApiSetValue(request.key, request.value);
                if(fnResponse)
                    fnResponse();
                break;
            case "CLOSETOOLBAR":
                this.turnToolbarOff();
                if(typeof(fnResponse) != "undefined")
                    fnResponse(result);
                break;
            case "HIDETOOLBAR":
                this.removeToolbar(sender.tab);
                break;
            case "OVERLAY_CREATE":
            case "OVERLAY_TOGGLE":
                this.overlayCreateOrToggle(request, sender, fnResponse);
                break;
            case "OVERLAY_SETPOSITION":
            case "OVERLAY_GETPOSITION":
            case "OVERLAY_UPDATE":
            case "OVERLAY_GETOPTIONS":
            case "OVERLAY_REMOVE":
            case "OVERLAY_DESTROYALL":
                this.sendTabRequest(sender, request, fnResponse);
                break;
            case "OVERLAY_SHOWWITHURL":
                this.overlayWithUrl(request, sender, fnResponse);
                break;
            case "CLOSETAB":
                sender.tab.close();
                break;
            case "NEWPAGELOADING":
                this.onPageLoading(request, sender);
                break;
            case "NEWPAGELOADED":
                this.onNewPage(request, sender.tab, fnResponse);
                break;
            case "OPENTOOLBAR":
                // Activate the toolbar for this tab, and if we have a url, then
                // show it.
                this.activeTabs[sender.tab.id] = true;
                if(typeof(request.displayNow) != "undefined")
                    this.activateTab(sender.tab);
                if(fnResponse)
                    fnResponse(result);
                break;
            case "RELOADTOOLBAR":
                // And tell every toolbar to reload.
                this.onBroadcast({ type: "RELOADTOOLBAR" });
                break;
            case "LBBROADCAST":
                this.onBroadcast(request.msg);
                if(typeof(fnResponse) != "undefined")
                    fnResponse();
                break;
            case "EXTAPIBROADCAST":
                this.onExtApiBroadcast(request, sender);
                break;
            case "EXTAPIPOSTMESSAGE":
                this.onExtApiPostMessage(request, sender);
                break;
            case "ISTOOLBARON":
                if(typeof(fnResponse) != "undefined")
                    fnResponse(!!this.activeTabs[tab.id]);
                break;
            case "CHECKLOGINRELOAD":
                this.onCheckLoginReload(request, sender);
                break;
            case "SET_STUMBLEMODE":
                this.onSetStumbleMode(request, sender);
                if(typeof(fnResponse) != "undefined")
                    fnResponse();
                break;
            case "STUMBLE":
                this.onStumble(request, sender, fnResponse);
                break;
            case "CLOSE_OTHER_OVERLAYS":
                this.sendApiMessage(sender.tab.id, 'closeOtherOverlays', request);
                break;
            case "OPENTAB":
                Utils.navigate(request.url, true)
                break;
            case "GET_OAUTH_INFO":
                var info = {
                    consumer_key: Strings.get('CONSUMER_KEY')
                }
                var globals = this.getExtApiValue('globals');
                if (globals && globals.oAuth && globals.oAuth.key)
                    info.token = globals.oAuth.key;
                fnResponse(info);
                break;
            case "GETSTRING":
                var str = Strings.get(request.key);
                fnResponse(str);
                break;
            case "UPDATE_GLOBALS":
                this.updateGlobals(request.newValues);
                break;
            case "REFRESH_STATE":
                this.onRefreshState();
                break;
            case "GET_URLDATA":
                fnResponse(UrlData.lookup(request.url));
                break;
            case "PRERENDER":
                this.sendTabRequest(sender.tab, { type: 'DO_PRERENDER', url: request.url });
                break;
        }
    },

    stumble: function(tab)
    {
        if(this.checkShowUpgradePage())
            return;

        if(tab) {
            this.activeTabs[tab.id] = true;
            this.sendApiMessage(tab.id, 'stumbleStarted');
            var globals = this.getExtApiValue("globals");
            var token   = '';
            if (globals != null && globals.oAuth != undefined && globals.oAuth !== null && globals.oAuth.key != undefined)
                token = globals.oAuth.key;
            var url = Strings.get("STUMBLE_URL", { tokenKey: token });
            chrome.tabs.update(tab.id, { url: url });
        }
        else {
            // Stumble the currently selected tab
            var self = this;
            chrome.tabs.getSelected(null, function(tabSelected) {
                self.stumble(tabSelected);
            });
        }
    },

    share: function(tab)
    {
        if(tab)
        {
            this.activeTabs[tab.id] = true;
            this.sendApiMessage(tab.id, 'showSharePanel', {url: tab.url});
        }
        else
        {
            // Open share panel on the currently selected tab
            var self = this;
            chrome.tabs.getSelected(null, function(tabSelected) {
                    self.share(tabSelected);
            });
        }
    },

    addToList: function(tab)
    {
        var self = this;
        if(tab)
        {
            this.activeTabs[tab.id] = true;
            this.sendApiMessage(tab.id, 'showAddToList', {url: tab.url});
        }
        else
        {
            // Open share panel on the currently selected tab
            chrome.tabs.getSelected(null, function(tabSelected) {
                    self.addToList(tabSelected);
            });
        }
    },

    sendUpdateRating: function(rating, tab)
    {
        if(tab)
        {
            this.activeTabs[tab.id] = true;
            this.sendApiMessage(tab.id, 'updateRating', {rating: rating});
        }
        else
        {
            // Open url info for the currently selected tab
            var self = this;
            chrome.tabs.getSelected(null, function(tabSelected) {
                self.sendUpdateRating(rating, tabSelected);
            });
        }

    },

    turnToolbarOn: function()
    {
        SU.Storage.set("toolbarEnabled", true);
    },

    turnToolbarOff: function()
    {
        SU.Storage.set("toolbarEnabled", false);

        // Remove the toolbar from all open tabs.
        var self = this;
        chrome.windows.getAll({ populate: true }, function(arrWindows) {
            for(var i=0; i<arrWindows.length; i++)
            {
                var tabs = arrWindows[i].tabs;
                for(var iTab=0; iTab < tabs.length; iTab++)
                {
                    self.removeToolbar(tabs[iTab]);
                }
            }
        });
        this.clearActiveUrls();
    },

    updateBadgeIcon: function(tab) {
        if(!tab.url)
            return;

        var blacklisted = Blacklist.isBlacklisted(tab.url);
        if(blacklisted)
        {
            chrome.browserAction.setIcon({ tabId: tab.id, path: "browseractionwarning.png" });
        }
    },

    addScript: function(src, onload) {
        var script = document.createElement("script");
        var src = this.getBaseUrl() + src;
        script.setAttribute("src", src);
        script.onload = onload;
        document.documentElement.appendChild(script);
    },

    /*
     * User state information.  It's called 'globals' for legacy reasons, this is
     * the name that webbar has used for global user state information
     */
    onNewState: function(newState)
    {
        this.updateGlobals({
            token: newState.token,
            user: newState.user,
            clientVersion: newState.clientVersion
        });
    },

    onLoggedOut: function() {
        /* Implement in derived class, if necessary */
    },

    isLoggedIn: function() {
        var globals = this.getExtApiValue("globals");
        return (globals && globals.user && globals.user.loggedIn);
    },

    //
    //
    // @todo:  We need a data access layer for all of our client data
    //         so we can share logic between the litebar and the client
    updateGlobals: function(newValues) {
        // Start with the current globals
        var oldGlobals = this.getExtApiValue("globals");
        var globals = jQuery.extend({}, oldGlobals);
        var newUser = false;

        // If the token expires we will be able to getState, but there won't be a loggedIn user, so we delete
        // the token in this case.
        if(newValues.user && (!newValues.user.loggedIn && !newValues.oAuth))
            newValues.oAuth = null;

        if ( (typeof(newValues.oAuth) != "undefined") && !Utils.obCompare(newValues.oAuth, oldGlobals.oAuth))
            newUser = true;

        if(newUser)
        {
            // Clear out any existing per-user data
            globals.user = null;
            globals.token = null;
            globals.localUserData = {};
            globals.state = null;
        }

        // Merge the new values
        globals = jQuery.extend({}, globals, newValues);

        // Call logout notification if the user state changed to logged out
        var loggedOut = (!globals.user || !globals.user.loggedIn) && (oldGlobals.user && oldGlobals.user.loggedIn);
        if (loggedOut)
            this.onLoggedOut();

        this.onGlobalsUpdated(globals, false);
    },

    onGlobalsUpdated: function(newGlobals)
    {
        // Notify all endpoints of the new state
        this.onExtApiSetValue('globals', newGlobals);
    },

    checkVersion: function() {
        var prevVersion = SU.Storage.get("version");
        if (!prevVersion) {
            // We used to use "currentVersion"
            prevVersion = SU.Storage.get("currentVersion");
        }
        // Delete "currentVersion" if it exists
        SU.Storage.set("currentVersion", null);

        var currentVersion = this.getVersion();
        SU.Storage.set("version", currentVersion);

        // We no longer hit firstRun on upgrades
        if (!prevVersion) {
            this.hitFirstRun();
        }
    },

    // addStumbleUponHeadersToXHR
    //
    // webRequest does not work on requests from our own extension page, so we have to explicitly
    // add these headers to our own XHR calls.
    //
    addStumbleUponHeadersToXHR: function(xhr) {
        xhr.setRequestHeader('X-Su-Version', Strings.get('XSUVERSION'));
        xhr.setRequestHeader('X-Su-ClientID', Strings.get('CLIENTID'));
        xhr.setRequestHeader('X-Su-ConsumerKey', Strings.get('CONSUMER_KEY'));
        xhr.setRequestHeader('X-Su-IdentityToken', Strings.get('ACCESS_TOKEN'));
    },

    initStumbleUponHeaderHandling: function()
    {
        var fnBeforeSendHeaders = (function(details) {
            details.requestHeaders.push({ name: 'X-Su-Version',  value: Strings.get('XSUVERSION') });
            details.requestHeaders.push({ name: 'X-Su-ClientID', value: Strings.get('CLIENTID') });
            details.requestHeaders.push({ name: 'X-Su-ConsumerKey', value: Strings.get('CONSUMER_KEY') });
            details.requestHeaders.push({ name: 'X-Su-IdentityToken', value: Strings.get('ACCESS_TOKEN') });
            return { requestHeaders: details.requestHeaders };
        }).bind(this);

        chrome.webRequest.onBeforeSendHeaders.addListener(
            fnBeforeSendHeaders,
            {
                urls: [ 'https://www.stumbleupon.com/*', 'https://*.stumble.net/*' ],
                types: [ 'main_frame', 'sub_frame', 'xmlhttprequest' ]
            },
            [ 'blocking', 'requestHeaders' ]
        );
    },

    init: function()
    {
        var self = this;

        Strings.init(this);
        UrlData.init(this);

        this.checkVersion();

        // Listen for messages from the toolbar or content scripts
        Messaging.addListener(function(request, sender, fnResponse) {
            self.onRequest(request, sender, fnResponse);
        });

        chrome.runtime.onMessage.addListener(function(request, sender, fnResponse) {
            return self.onDirectRequest(request, sender, fnResponse);
        });

        // stumbleupon.com header functionality
        this.initStumbleUponHeaderHandling();

        window.BPReady = true;
    }
});
