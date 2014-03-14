var ChromeBackgroundPage = BackgroundPage.extend({
    _version: null,
    _toolbarHeight: 40,

    getVersion: function() {
        if (this._version)
            return this._version;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", chrome.extension.getURL('manifest.json'), false);
        xhr.send();

        // We use synchronous XHR so the response will be available immediately
        var manifest = JSON.parse(xhr.responseText);
        this._version = manifest.version;
        return manifest.version;
    },

    hitFirstRun: function() {
        this._super();

        this.turnToolbarOn();
    },

    addTabActivationListeners: function() {
        var self = this;

        function onRemoved(tabId) {
            if(self.activeTabs[tabId]) {
                delete self.activeTabs[tabId];
                self.updateActiveUrls();
            }
            if(self.readyTabs[tabId]) {
                delete self.readyTabs[tabId];
            }
        }

        function onAdded(tab) {
            if(self.isToolbarOn()) {
                self.activateTab(tab);
            }
        }

        // Clean up any tab-related storage when the tab is removed.
        chrome.tabs.onRemoved.addListener(onRemoved);

        // If the toolbar is on, then activate all new tabs.
        chrome.tabs.onCreated.addListener(onAdded);

        // When a prerender tab is activated, we get onReplaced instead of onCreated.
        chrome.tabs.onReplaced.addListener(function(addedTabId, removedTabId) {
            chrome.tabs.get(addedTabId, function(tab) {
                onAdded(tab);
            });
            onRemoved(removedTabId);
        });
    },

    cleanupStrandedStorage: function() {
        // We use chrome.storage for stumble and pre-render URLs.  This usage is temporary
        // and short-lived, but there is a slight chance that the sequence could be interrupted
        // and we could end up with stumble or pre-render URLs that did not get picked up and
        // removed.  So we clean them up periodically (on re-start should be good enough).
        chrome.storage.local.get(null, function(results) {
            var key;
            if (!results) {
                return;
            }
            for (key in results) {
                if (key.indexOf('referInfo') == 0) {
                    chrome.storage.local.remove(key);
                }
            }
        });
    },

    init: function() {
        // Make sure theBP is available immediately
        window.theBP = this;

        // Call the base class first
        this._super();

        var canvas = document.createElement("canvas");
        canvas.id = "snapshotCanvas";
        // @todo:  Why?
        canvas.style.border = "solid";
        document.documentElement.appendChild(canvas);

        // Initialize authentication functionality
        Auth.init();

        Cookies.setPersistentCookie('CHROMEBAR_COOKIE_NAME', '1');
        Cookies.setPersistentCookie('V5_COOKIE_NAME', '2dff5c01');

        this.initialized = true;

        Blacklist.init();

        Cookies.updateClientIdCookie();
        Cookies.maintainPersistentCookie('CHROMEBAR_COOKIE_NAME', '1');
        Cookies.maintainPersistentCookie('V5_COOKIE_NAME', '2dff5c01');

        // Activate any tabs that were active on shutdown.    We detect them by URL since tab identity / id
        // is not maintained across restarts.
        var self = this;
        chrome.windows.getAll({ populate: true }, function(arrWindows) {
            this.activeUrlsLocked = false;
            var activeUrls = SU.Storage.get("activeUrls");
            if(!activeUrls)
                return;

            for(var i=0; i<arrWindows.length; i++)
            {
                var tabs = arrWindows[i].tabs;
                for(var iTab=0; iTab < tabs.length; iTab++)
                {
                    var tab = tabs[iTab];
                    if(self.isToolbarOn() && activeUrls[tab.url])
                    {
                        self.activateTab(tab, false);
                        self.updateBadgeIcon(tab);
                    }
                }
            }
        });

        // Show the chrome-based advanced options page when the corresponding URL is selected.
        chrome.tabs.onUpdated.addListener(function(tabid, changeInfo, tab) {
                if( changeInfo.url &&
                    (changeInfo.url == "about:" + Constants.ADVANCED_OPTIONS_PAGE) ||
                    (changeInfo.url == "chrome://" + Constants.ADVANCED_OPTIONS_PAGE + "/"))
                {
                    window.setTimeout(function() {
                        var url = chrome.extension.getURL("advancedoptions.html");
                        Utils.navigate(url);
                    }, 200);
                } else if (changeInfo.status == "complete") {
                    self.updateBadgeIcon(tab);
                }
                self.updateActiveUrls();
        });

        this.addTabActivationListeners();

        // Get the currently selected tab.
        chrome.tabs.getSelected(null, function(tabSelected) {
            self.lastSelectedTabId = tabSelected.id;
        });

        // Track selectionchanges.
        chrome.tabs.onSelectionChanged.addListener(function(tabid) {
            self.lastSelectedTabId = tabid;
        });

        this.updateReferralDisplay();
        this.cleanupStrandedStorage();
    },

    getBaseUrl: function() {
        return chrome.extension.getURL("");
    },

    //
    // Toolbar Display / Activation Logic
    //
    // The toolbar is only displayed on "active" tabs.    When the toolbar is "on", any new tabs
    // become active tabs.    When the toolbar is turned off, all tabs are de-activated.
    //
    // When the browser action button is clicked, the toolbar is turned on AND the current tab
    // is activated.  If the current tab is already active, then the pop-up is displayed to allow
    // the user to either stumble again, or to close the toolbar.
    //
    // So a new tab can be activated by several means:
    //     1. The current tab is activated when the user clicks on the browser action button (which turns the
    //        toolbar on).
    //     2. Any newly opened tab is activated if the toolbar is "on".
    //     3. The webbar can activate the toolbar for the current tab, without turning the toolbar on.
    //

    isToolbarOn: function()
    {
        return SU.Storage.get("toolbarEnabled");
    },

    doesTabHaveToolbar: function(tab)
    {
        // If it's active, it's ready, and it's supported, and not blacklisted, then it should have the toolbar.
        return this.readyTabs[tab.id] && this.activeTabs[tab.id] && this.isTabSupported(tab) && !Blacklist.isBlacklisted(tab.url);
    },

    onBrowserActionClicked: function(fnResponse)
    {
        var loggedIn = false;
        var globals = SU.Storage.get('extapi.globals');
        if (globals != null && globals.user != undefined && globals.user.loggedIn) {
            loggedIn = true;
        }
        var self = this;
        chrome.tabs.getSelected(null, function(tabSelected) {
            if(!self.doesTabHaveToolbar(tabSelected))
            {
                // It isn't currently active, so turn on the global state,
                // activate, and display the toolbar.
                self.turnToolbarOn();

                // Activate this tab
                self.activateTab(tabSelected, true);

                // Show the popup only if this URL is blacklisted, otherwise we expect
                // The activation would have displayed the toolbar.
                var blacklisted = Blacklist.isBlacklisted(tabSelected.url);

                fnResponse(blacklisted, loggedIn);
            }
            else
            {
                // It's an active tab already, show the popup to let the user decide
                // whether to Stumble or Close.
               fnResponse(true, loggedIn);
            }
        });
    },

    overlayWithUrl: function(request, sender, fnResponse) {
        // overlayWithUrl uses toolbar-relative positions (which was the original design for all overlay functions)
        if (request.overlay.options &&
            request.overlay.options.position &&
            typeof(request.overlay.options.position.top) != "undefined") {
            request.overlay.options.position.top += this._toolbarHeight;
        }
        this._super(request, sender, fnResponse);
    },

    onNewPage: function(request, tab, fnResponse)
    {
        this.readyTabs[tab.id] = true;

        // Update the badge icon (but not for prerendered tabs, they will get updated when the
        // page is displayed, at which point onCreated is called)
        if(!request.isPreRender)
            this.updateBadgeIcon(tab);

        if(Blacklist.isBlacklisted(tab.url))
            return;

        if(request.isPreRender && this.isToolbarOn()) {
            // For pre-rendered tabs, we get onNewPage before tab.onCreated, so we actually
            // go ahead and activate the tab from here
            this.activeTabs[tab.id] = 1;
            if(fnResponse) {
                var frameUrl = Strings.get("TBFRAME_URL");
                fnResponse({ frameUrl: frameUrl, preFrameImage: this.getPreFrameImage() });
            }
        }
        else if(this.activeTabs[tab.id] && this.isTabSupported(tab)) {
            this.displayToolbar(tab, fnResponse);
        }

        // Call the default implementation
        this._super(request, tab, fnResponse);
    },

    onLitebarWindowLoaded: function(sender)
    {
        var self = this;
        window.setTimeout(function() {
            self.stateAtCapture = self.getStumbleState();
            self.captureToolbarImage(sender.tab);
        }, 200);
    },

    onLitebarWindowLoading: function(sender) {
        this.sendTabRequest(sender.tab, { type: "LITEBAR_LOADING" });
    },

    onLitebarWindowResized: function(tab)
    {
        chrome.windows.get(tab.windowId, function(window) {
            if(window.width != this.lastResizeWidth)
            {
                this.lastResizeWidth = window.width;
                // captureToolbarImage(tab);
            }
        });
    },

    onRequest: function(request, sender, fnResponse)
    {
        switch(request.type)
        {
            case "LBWINDOWLOADING":
                this.onLitebarWindowLoading(sender);
                break;
            case "LBWINDOWLOADED":
                this.onLitebarWindowLoaded(sender);
                break;
            case "LBWINDOWRESIZED":
                this.onLitebarWindowResized(sender.tab);
                break;
        }
        // Call the default implementation
        this._super(request, sender, fnResponse);
    },

    popupStumble: function()
    {
        var self = this;
        chrome.tabs.getSelected(null, function(tabSelected) {
            if(!isTabSupported(tabSelected))
                this.stumble(tabSelected);
            else
            {
                // We are already active on this tab, ask it to show the next stumble.
                this.sendTabRequest(tabSelected, { type: "NEXTSTUMBLE" });
            }
        });
    },

    popupClose: function()
    {
        // Remove it from all the tabs
        this.turnToolbarOff();
    },

    popupLogout: function()
    {
        this.logout(true);
    }
});

var theBP = new ChromeBackgroundPage();
