/**
 * everypage.js
 *
 * This content script gets injected into every page, enabling us to inject the StumbleUpon lite toolbar
 * into the DOM of the page.
 *
 * Compatibility:  Chrome and Safari
 */

var everypage = {
    tabId: null, // Retrieved from BP
    inSafari: ((typeof(safari) != "undefined") && safari.self),
    toolbarExists: false,
    scriptId: "__su__scriptcont",
    eventsId: "__su__events",
    eventName: "__su__message",
    frameId: "__su__toolbar",
    preFrameDivId: "__su__preframediv",
    preFrameImgId: "__su__preframeimage",
    overlayPrefix: "tb-overlay-container-",
    loaderPrefix:  "tb-overlay-loader-",
    validToolbarHosts:  /^https?:\/\/([^\/]*\.stumble\.net|www\.stumbleupon\.com)($|\/)/,
    webbarRegex: /^https?:\/\/([^\/]*\.stumble\.net|www\.stumbleupon\.com)\/s\//i,
    lastHeight: "0px",
    toolbarHeight: 40,
    toolbarBackground: "#2F2F2f",
    overlayBaseZIndex: 10000200,
    loaderBaseZIndex:  10000400,
    zIndexFrame:       10000100,
    zIndexPreFrame:    10000000,
    zIndexArrow:       10000300,
    activeOverlays: {},
    startLoad: 0,
    overlayHolderCloseDelay: 1000,
    earlyStyle: null,
    disableStumbleId: 'tb-stumble-disable',
    regexLitebar: /^https?\:\/\/(www\.stumbleupon\.com|[^\/]*\.stumble\.net)\/su\/toolbar\/(chromebar|safaribar).*/i,
    regexSite: /^https?\:\/\/(www\.stumbleupon\.com|[^\/]*\.stumble\.net)(\/|$)/,
    regexOurOrigin: /^https?\:\/\/(www\.stumbleupon\.com$|[^\/]*\.stumble\.net$)/,
    regexOverlayHolder: /^https?:\/\/(www\.stumbleupon\.com|[^\/]*\.stumble\.net)\/su\/toolbar\/chromebar\/referral/,
    regexSingleton: /^http\:\/\/(www\.stumbleupon\.com\/toolbar\/lbsingleton\.php\.*)|([^\.]*\.stumble\.net\/[^&?]*(lbsingleton\.php|lbsingletontest\.*))/i,
    regexLitebarSrc: /suclient_framesrc = \'([^\']*)\'/i,

    PAGE_OTHER: 0,
    PAGE_SITE: 1,
    PAGE_TOOLBAR: 2,
    PAGE_SINGLETON: 3,
    PAGE_FRAMESET: 4,

    pageType: this.PAGE_OTHER,

    getExtensionBaseUri: function() {
        if(!this.inSafari)
            return chrome.extension.getURL("");
        else
            return safari.extension.baseURI;
    },

    createToolbar: function(frameUrl, preFrameImage, timeoutWait) {
        var me = this;

        // If we already have it, we're done
        if(this.toolbarExists)
            return;

        // We only create the toolbar on the top-level window.
        if(window != window.top)
            return;

        // And we only create the toolbar on Windows with "chrome" on them.
        if(!window.locationbar.visible || !window.menubar.visible)
            return;

        if(typeof(this.didInsertStyle) == "undefined")
        {
            this.didInsertStyle = true;

            // Create the pre-frame elements that will be shown
            // until the iframe is loaded -- this avoids flicker.
            this.createPreFrameElements(document, preFrameImage);

            // Add a style element to reserve space above the body.
            this.earlyStyle = document.createElement('style');
            var text = "body { position:relative; top:0px; margin-top: " + this.toolbarHeight + "px; }";
            text += "\n#tb-stumble-disable { background-color: #000000; opacity: 0.3; position: fixed; display: none; top: 0px; left: 0px; width: 100%; height: 0px; z-index: 200;}"
            var styleText = document.createTextNode(text);
            this.earlyStyle.appendChild(styleText);
            document.documentElement.appendChild(this.earlyStyle);
        }

        if(document.body)
        {
            // See if this is actually an unsupported file
            if(!this.isBodySupported()) {
                if(this.earlyStyle)
                    this.earlyStyle.parentNode.removeChild(this.earlyStyle);
                chrome.extension.sendMessage({ type: "BLACKLIST_URL", url: document.location.href });
                return;
            }

            // Keep track of whether we have the toolbar or not
            this.toolbarExists = true;

            if(document.body.tagName.toLowerCase() != "frameset")
            {
                // Directly position the body to make room for our toolbar.  This may seem redundant
                // with the code above that appends a <style> element to do the same thing, but this
                // takes care of overriding other potentially conflicting style settings directly.
                document.body.style.position = "relative";
                document.body.style.top = "0px";
                document.body.style.cssText = document.body.style.cssText + ";margin-top: " + this.toolbarHeight + "px !important";

                this.createToolbarFrame(frameUrl);

                var disable_stumble = document.createElement("div");
                disable_stumble.setAttribute('id', this.disableStumbleId);
                disable_stumble.onclick = function() {
                    chrome.extension.sendMessage({ type: "CLOSE_OTHER_OVERLAYS", overlayid: null, others: ['floating'] });
                }
                document.body.appendChild(disable_stumble);

                // Move the fixed elements down.
                me.moveFixedElements();
                window.addEventListener("load", function() {
                    me.moveFixedElements();
                }, false);
                // Workaround for jQuery tipsy tooltips which are incorrectly position due to
                // this bug:  http://plugins.jquery.com/node/13807
                // Workaround is needed for Twitter because the tooltip ends up covering buttons and
                // thus breaking them.
                document.body.addEventListener("DOMNodeInserted", everyPageCode.onDOMNodeInserted, false);

            }
            else
            {
                // @todo:  FRAMESETs should just be blacklisted / non-supported

                this.pageType = this.PAGE_FRAMESET;

                this.destroyPreFrameElements();

                // Can't move framesets.  So if this is a supported frameset layout where
                // it has no columns at the top (very common), then make room for ourselves
                // by creating a new frame at the top.
                var cols = document.body.getAttribute("cols");
                if(cols && (cols != "*"))
                {
                    // TODO:  We KNOW we aren't visible, do something to give them some options.
                    return;
                }

                var rows = document.body.getAttribute("rows");
                if(!rows)
                    return;

                rows = this.toolbarHeight + "px" + (rows != "" ? "," : "") + rows;
                var newFrame = document.createElement("frame");
                var t = (new Date()).getTime();

                newFrame.src = frameUrl;
                var first = document.body.firstChild;
                document.body.setAttribute("rows", rows);
                document.body.insertBefore(newFrame, first);
            }
        }
        else
        {
            if (!timeoutWait)
                timeoutWait = 5;

            // The body hasn't been created yet, wait for it.
            window.setTimeout(function() {
                me.createToolbar(frameUrl, preFrameImage, timeoutWait * 2)
            }, timeoutWait);
        }
    },

    createToolbarFrame: function(frameUrl) {
        var frame = document.createElement("iframe");
        frame.setAttribute("src", frameUrl);
        frame.setAttribute('id', this.frameId);
        frame.setAttribute('width','100%');
        frame.style.height = this.toolbarHeight + "px";
        frame.style.border = "none";
        frame.style.display = "block";
        frame.style.visibility = "visible";
        frame.style.position = "fixed";
        frame.style.top = "0px";
        frame.style.left = "0px";
        frame.style.margin = "0px";
        frame.style.zIndex = this.zIndexFrame;
        frame.style.backgroundColor = this.toolbarBackground;
        frame.style.width  = '100%';
        frame.style.opacity = "0.0";
        frame.style.padding = "0px";

        // Derek fanciness:  Groovy Fade-in effect.  Only use if we don't have a pre-frame image
        if(!document.getElementById(this.preFrameImgId))
            frame.style['-webkit-transition'] = 'all 0.15s linear';

        document.body.insertBefore(frame, document.body.firstChild);

        // Create the referral frame to expedite stumbles
        window.setTimeout((function() {
            this.checkCreateReferralFrame();
        }).bind(this), 500);
    },

    isBodySupported: function() {
        // Best hack we know to determine if this is an XML file
        if(document.getElementById("webkit-xml-viewer-source-xml"))
            return false;
        return true;
    },

    createPreFrameElements: function(doc, image) {
        // Create a div first.  It appears that even an img element with a data url is not necessarily rendered
        // very quickly, so this helps remove flicker
        var div = doc.createElement("div");
        div.id = this.preFrameDivId;
        div.src = image;
        div.style.backgroundColor = this.toolbarBackground;
        div.style.position = "fixed";
        div.style.top = "0px";
        div.style.left = "0px";
        div.style.margin = "0px";
        div.style.clip = "rect(0px, 10000px, " + this.toolbarHeight + "px, 0px)";
        div.style.zIndex = this.zIndexPreFrame;
        div.style.display = "block";
        div.style.visibility = "visible";
        div.style.overflow = "hidden";
        div.style.height = "" + this.toolbarHeight + "px";
        div.style.width = "100%";
        document.documentElement.appendChild(div);

        if(!image)
            return;

        // Create the image element that displays the toolbar image
        var img = doc.createElement("img");
        img.id = this.preFrameImgId;
        img.src = image;
        img.style.backgroundColor = this.toolbarBackground;
        img.style.position = "fixed";
        img.style.top = "0px";
        img.style.left = "0px";
        img.style.margin = "0px";
        img.style.clip = "rect(0px, 10000px, " + this.toolbarHeight + "px, 0px)";
        img.style.display = "block";
        img.style.visibility = "visible";
        img.style.overflow = "hidden";
        div.appendChild(img);
    },

    destroyElementById: function(id) {
        var el = document.getElementById(id);
        if(el)
            el.parentNode.removeChild(el);
    },

    destroyPreFrameElements: function() {
        this.destroyElementById(this.preFrameDivId);
    },

    onDOMNodeInserted: function(event) {
        var el = event.target;
        var name = el.className;
        if(name && name.match(/( |^)tipsy( |$)/))
        {
            window.setTimeout(function() {
                el.style.top = parseInt(el.style.top) - everyPageCode.toolbarHeight + "px";
            }, 0);
        }
    },


    getElements: function(arrTagNames) {
        var all = [];
        for(var nTagName=0; nTagName<arrTagNames.length; nTagName++) {
            var els = document.getElementsByTagName(arrTagNames[nTagName]);
            for(var nElement=0; nElement<els.length; nElement++)
                all.push(els[nElement]);
        }
        return all;
    },

    moveFixedElements: function() {
        var els = this.getElements(["div", "header"]);
        for(var i=0; i<els.length; i++)
        {
            var div = els[i];
            if(!div.suMoved)
            {
                var style = window.getComputedStyle(div);
                if(style.position == "fixed")
                {
                    if(div.getAttribute("id") != this.preFrameDivId)
                    {
                        var top = style.top;
                        var nOldSpot = top ? parseInt(top) : 0;
                        var nNewSpot = nOldSpot + this.toolbarHeight;
                        div.style.top = nNewSpot + "px";
                        div.suMoved = true;
                    }
                }
            }
        }
    },

    removeActiveToolbarListeners: function() {
        try {
            document.body.removeEventListener("DOMNodeInserted", everyPageCode.onDOMNodeInserted, false);
        } catch(ex) {};
    },

    restoreFixedElements: function() {
        var els = this.getElements(["div", "header"]);
        for(var i=0; i<els.length; i++)
        {
            var div = els[i];
            var style = window.getComputedStyle(div);
            if(style.position == "fixed")
            {
                if(els[i].getAttribute("id") != "__su__tbcont")
                {
                    var top = style.top;
                    var nOldSpot = top ? parseInt(top) : 0;
                    var nNewSpot = nOldSpot - this.toolbarHeight;
                    els[i].style.top = nNewSpot + "px";
                    els[i].suMoved = false;
                }
            }
        }
    },

    destroyToolbar: function() {
        var cssText;
        this.toolbarExists = false;

        // Destroy any pre-frame elements
        this.destroyPreFrameElements();

        for (var o in this.activeOverlays) {
            this.removeOverlay(o);
        }
        if(this.pageType != this.PAGE_FRAMESET)
        {
            // Remove the frame
            this.destroyElementById(this.frameId);

            // Restore the body.  First remove the !important margin setting
            cssText = document.body.style.cssText;
            cssText = cssText.replace("margin-top: " + this.toolbarHeight + "px !important", "margin-top: 0px");
            document.body.style.cssText = cssText;

            // Restore fixed elements
            this.restoreFixedElements();
            this.removeActiveToolbarListeners();
        }
        else
        {
            // @todo:  Will likely remove FRAMESET support

            // FRAMESET
            var rows = document.body.getAttribute("rows");
            if(rows)
            {
                var firstComma = rows.indexOf(",");
                if(firstComma != -1)
                {
                    rows = rows.slice(firstComma + 1);
                    document.body.setAttribute("rows", rows);
                    document.body.removeChild(document.body.firstChild);
                }
            }
        }
    },

    setHeight: function(height) {
        this.lastHeight = height;
        if(this.pageType != this.PAGE_FRAMESET)
        {
            var frame = document.getElementById(this.frameId);
            frame.style.height = newHeight;
            document.body.style.marginTop = newHeight;
        }
        else
        {
            // @todo:  We may just remove FRAMESET support, or at least we need to blacklist
            //         non-supported framesets
            // Our frame is the first child, find ourselves and set our height.
            var rows = document.body.getAttribute("rows");
            if(rows)
            {
                var firstComma = rows.indexOf(",");
                if(firstComma == -1)
                    rows = height;
                else
                {
                    rows = height + "," + rows.slice(firstComma + 1);
                    document.body.setAttribute("rows", rows);
                }
                var ourFrame = document.body.firstChild;
                ourFrame.style.height = height;
            }
        }
    },

    addOverlayArrow: function(frame, options) {
        // Fix the position so the entire arrow fits on the screen
        var arrowWidth = 10;
        var left = options.arrow.left;
        if(left + arrowWidth > document.documentElement.offsetWidth) {
            // It is going off the edge of the screen, move it in, with some buffer
            left = document.documentElement.offsetWidth - arrowWidth - 3;
        }

        var span = document.createElement("span");
        span.style.zIndex = this.overlayBaseZIndex;
        span.style.bottom = "100%";
        span.style.border = "solid transparent";
        span.style.top = "0px";
        span.style.height = "0";
        span.style.width = "0";
        span.style.position = "fixed";
        span.style.borderBottomColor = "#cfcfcf";
        span.style.borderWidth = arrowWidth + "px";
        span.style.marginLeft = span.style.marginTop = "-" + arrowWidth + "px";
        span.style.left = left + "px";
        span.id = frame.id + "_arrow";

        document.documentElement.appendChild(span);
    },

    adjustOverlayPosition: function(options) {
        // Ensure that an overlay with an arrow is positioned so the arrow is fully over the overlay and
        // not hanging off the edge
        if(options.arrow && options.position) {
            if(options.arrow.left - options.position.left < 20)
                options.position.left = options.arrow.left - 20;
        }
    },

    createOverlay: function(request)
    {
        // Only do this on the top-level frame in this tab
        if(window != window.top)
            return;

        // Make any necessary position adjustments
        this.adjustOverlayPosition(request.options);

        // First, see if it already exists
        var elId = this.overlayPrefix + request.id;
        var el = document.getElementById(elId);
        if(el)
        {
            // It already exists, no need to create it.
            // Update the position if they supplied a new position.
            if(request.options.position)
            {
                this.updateOverlay(request.id, request.options);
            }
            // All done here
            return;
        }

        if(request.options.url)
        {
            var frame = document.createElement("iframe");
            frame.id = elId;
            frame.overlayId = request.id;
            frame.style.zIndex = this.overlayBaseZIndex;
            frame.style.position = "fixed";
            frame.style.display = "block";
            frame.style.visibility = "visible";
            frame.style.left = "0px";
            frame.style.top = "0px";
            frame.style.width = "0px";
            frame.style.height = "0px";
            frame.style.borderStyle = "none";
            frame.style.overflow = "hidden";

            if(request.options.css)
            {
                for(var name in request.options.css)
                    frame.style[name] = request.options.css[name];
            }
            if(request.options.arrow) {
                this.addOverlayArrow(frame, request.options);
            }
            // Store the options on the element
            frame.options = request.options;

            // Create a frame loader if we need one
            this.createFrameLoader(frame);

            var src = request.options.url;
            var hash = "overlayid=" + request.id + "&openerid=" + request.openerId;
            src += "#" + escape(hash);

            // Use norefer.html so the parent frame's URL is not sent to our server in the header.
            var noreferUrl = this.getExtensionBaseUri() + "norefer.html";
            noreferUrl += "?url=" + encodeURIComponent(src);
            noreferUrl += "&addtokens=1";
            frame.src = noreferUrl;
        }
        document.documentElement.appendChild(frame);

        if(request.options && request.options.position)
        {
            this.updateOverlay(request.id, request.options);
        }
        return request.id;
    },

    createFrameLoader: function(frame) {
        if (!frame.options.useLoaderGif)
            return;

        var elId = this.loaderPrefix + frame.overlayId;
        var img = document.getElementById(elId);
        if (!img) {
            img = document.createElement("img");
            img.id = elId;
            img.overlayId = frame.overlayId;
            img.style.zIndex = this.loaderBaseZIndex;
            img.style.position = "fixed";
            img.style.display = "block";
            img.style.visibility = "visible";
            img.style.left = "0px";
            img.style.top = "0px";
            img.style.width = "0px";
            img.style.height = "0px";
            img.style.borderStyle = "none";
            img.style.overflow = "hidden";

            // We use naturalWidth and naturalHeight, so don't update the loader until the image
            // is loaded
            var self = this;
            img.addEventListener("load", function() {
                img.loaded = true;
                self.updateFrameLoader(frame);
            }, false);

            img.src = this.getExtensionBaseUri() + "overlay_loader.gif";
            document.documentElement.appendChild(img);
        }
    },

    updateFrameLoader: function(frame) {
        var elId = this.loaderPrefix + frame.overlayId;
        var img = document.getElementById(elId);
        if (!img || !img.loaded)
            return;

        var top = frame.style.top ? parseInt(frame.style.top) : 0;
        var left = frame.style.left ? parseInt(frame.style.left) : 0;
        var width = frame.style.width ? parseInt(frame.style.width) : 0;
        var height = frame.style.height ? parseInt(frame.style.height) : 0;

        if (width && frame.style.borderWidth)
            width += parseInt(frame.style.borderWidth);
        if (height && frame.style.borderHeight)
            height += parseInt(frame.style.borderHeight);

        if (!top || !left || !width || !height) {
            return;
        }

        left   = left + (width - img.naturalWidth)/2;
        top    = top  + (height - img.naturalHeight)/2;
        width  = img.naturalWidth;
        height = img.naturalHeight;

        img.style.left   = left + "px";
        img.style.top    = top + "px";
        img.style.width  = width + "px";
        img.style.height = height + "px";
    },

    toggleOverlay: function(request)
    {
        // If it exists, remove it
        var elId = this.overlayPrefix + request.id;
        var el = document.getElementById(elId);
        if(el) {
            this.removeOverlay(request.id);
            return;
        }
        // Doesn't exist, create it
        this.createOverlay(request);
    },

    getOverlayOptions: function(request) {
        var el = document.getElementById(this.overlayPrefix + request.id);
        if(!el) {
            // Only overlay should be asking for options, so they should exist
            console.log('Error: Request made for non-existent overlay options');
            return null;
        }

        return el.options;
    },

    isOverlayHolder: function() {
        var url = document.location.href;
        return !!url.match(this.regexOverlayHolder);
    },

    checkCloseOverlayHolder: function() {
        if(!this.inSafari)
            return;

        var self = this;
        window.setTimeout(function() {
            if(!self.isOverlayHolder())
                return;
            // We are in safari and this is an overlay holder, check whether there
            // are any overlays left
            var foundOne = false;
            var frames = document.getElementsByTagName("iframe");
            for(var i=0; i<frames.length; i++) {
                var frame = frames[i];
                if(frame.id && frame.id.indexOf(this.overlayPrefix) != 0) {
                    foundOne = true;
                    break;
                }
            }
            // If no overlays are found, then close this window
            if(!foundOne)
                Messaging.sendBPRequest({ type: "CLOSETAB" });
        }, this.overlayHolderCloseDelay);
    },

    removeOverlayArrow: function(id) {
        var elId = this.overlayPrefix + id + "_arrow";
        var el = document.getElementById(elId);
        if(el)
            el.parentNode.removeChild(el);
    },

    removeOverlayLoader: function(id) {
        var elId = this.loaderPrefix + id;
        var el = document.getElementById(elId);
        if(el)
            el.parentNode.removeChild(el);
    },

    removeOverlay: function(id) {
        var elId = this.overlayPrefix + id;
        var el = document.getElementById(elId);
        if(el)
            el.parentNode.removeChild(el);

        this.removeOverlayArrow(id);
        this.removeOverlayLoader(id);
        this.checkCloseOverlayHolder();
    },

    destroyAllOverlays: function(filter) {
        // Normalize option property filter values to an associative array
        if(filter && (filter.type == "optionProperty") && filter.values.length) {
            var newValues = {};
            for(var index in filter.values)
                newValues[filter.values[index]] = 1;
            filter.values = newValues;
        }

        // Enumerate all frames
        var frames = document.getElementsByTagName("iframe");
        for(var iFrame=0; iFrame<frames.length; iFrame++) {
            var frame = frames[iFrame];
            if(!frame.id || frame.id.indexOf(this.overlayPrefix) != 0)
                continue;

            // We have an overlay frame, if no filter then just destroy it
            if(!filter) {
                this.removeOverlay(frame.overlayId);
                continue;
            }

            // Check the filter
            var overlayId = frame.id.slice(this.overlayPrefix.length);
            switch(filter.type) {
                case "optionProperty":
                    // Check for a property match
                    var options = frame.options;
                    if(options[filter.propertyName] in filter.values) {
                        if(!filter.exceptionId || (filter.exceptionId != overlayId)) {
                            this.removeOverlay(frame.overlayId);
                        }
                    }
                    break;
                case "exception":
                    if(filter.exceptionId != overlayId)
                        this.removeOverlay(frame.overlayId);
                    break;
            }
        }
    },

    updateOverlay: function(id, options) {
        var elId = this.overlayPrefix + id;
        var el = document.getElementById(elId);
        var nAdjustTop = 0;
        if(options.arrow)
            nAdjustTop += 9;

        if(!el)
            return;
        var position = options.position;
        if(!position)
            return;
        if(position.left && position.width) {
            if(position.left + position.width > document.documentElement.offsetWidth)
                position.left = document.documentElement.offsetWidth - position.width;
        }
        if(typeof(position.left) != "undefined")
            el.style.left = position.left + "px";
        if(typeof(position.top) != "undefined")
            el.style.top = position.top + nAdjustTop + "px";
        if(typeof(position.width) != "undefined")
            el.style.width = position.width + "px";
        if(typeof(position.height) != "undefined")
            el.style.height = position.height + "px";
        if(typeof(position.zIndex) != "undefined")
            el.style.zIndex = this.overlayBaseZIndex + position.zIndex;

        // Update the additional css
        if(options.css)
        {
            for(var name in options.css)
                el.style[name] = options.css[name];
        }
        this.updateFrameLoader(el);
    },

    getOverlayPosition: function(id) {
        var el = document.getElementById("suoverlay_" + id);
        if(!el) return null;

        var position = {
            left: parseInt(el.style.left),
            top: parseInt(el.style.top),
            width: parseInt(el.style.width),
            height: parseInt(el.style.height)
        }
        return position;
    },

    /*
    ** getGAInfo
    **
    ** Executed in the page script context, it gathers information about the GA state
    ** in preparation for sending the page exit event
    */
    getGAInfo: function()
    {
        try
        {
            // Attempt to get the UA account name
            var account = window._gat._getTrackerByName()._getAccount();
            if(account.indexOf("UA-XXXX") == 0)
                account = window.pageTracker._getAccount();

            // Set up the params the params
            var params = {};
            params['utmn'] = (new Date()).getTime();  // Cache-buster
            params['utmhn'] = document.location.hostname;
            params['utmt'] = 'event';
            params['utmr'] = "http://www.stumbleupon.com/refer.php";
            params['utmp'] = document.location.pathname;
            params['utmac'] = account;

            var msg = {
                type: "GASTATS",
                params: params
            }

            window.postMessage(JSON.stringify(msg), "*");
        } catch(ex) {
            // Exceptions are normal if the page doesn't support GA
        }
    },

    getGAStats: function(request, fnResponse)
    {
        // Only respond from the top window
        if(window != window.top)
            return null;

        // If we haven't tried this before (ignore subsequent attempts)
        if(this.gotGaStats)
            return;

        // And only if the toolbar exists
        if(!this.toolbarExists || !this.startLoad)
            return;

        // Listen for the response from the injected client code
        var me = this;
        this.gotGaStats = true;
        window.addEventListener("message", function(event) {
            // We only accept messages from ourselves
            if(event.source != window)
                return;

            try {
                var msg = JSON.parse(event.data);
                if(!msg || (msg.type != "GASTATS"))
                    return;

                var elapsed = (new Date()).getTime() - me.startLoad;
                msg.params['utme'] = "5(StumbleUpon Page Exit*Time On Site*First Load)(" + elapsed + ")";

                // Get the cookies for the utmcc param
                var utmcc = "";
                var ga_cookies = ['__utma', '__utmb', '__utmc', '__utmz'];
                for(var i=0; i < ga_cookies.length; i++)
                {
                    var cookie_name = ga_cookies[i];
                    var value = me.readCookie(cookie_name);
                    if(value)
                    {
                        utmcc += (utmcc ? ";" : "") + cookie_name + "=" + value;
                    }
                }
                msg.params['utmcc'] = utmcc;

                // That's it, send the stats to the background page
                fnResponse(msg.params);
            } catch(ex) {
            }
        });

        // Now inject the code that will gather this info
        this.injectFn(this.getGAInfo);
    },

    postLoadMessage: function() {
        window.top.postMessage({ type: "LBWINDOWLOADING" }, "*");
    },

    onToolbarLoading: function() {
        // Make the frame visible only after it has started loading
        document.getElementById(this.frameId).style.opacity = "1.0";
        this.destroyPreFrameElements();
    },

    getContentLocation: function() {
        // If we are visible within a webbar URL, then use the location of the frame
        // which contains the actual stumbled content.
        var elFrame = document.getElementById('tb-stumble-frame');
        if (elFrame && elFrame.src) {
            return elFrame.src;
        }
        return window.top.location.href;
    },

    checkCreateReferralFrame: function() {
        if (this.referralFrame) {
            return;
        }

        this.referralFrame = document.createElement("iframe");
        this.referralFrame.style.display = "none";
        this.referralFrame.src = document.location.protocol + "//www.stumbleupon.com/refer?new=1";
        document.documentElement.appendChild(this.referralFrame);
    },

    getTabId: function(fnCallback) {
        if (this.tabId) {
            if (fnCallback) {
                fnCallback(this.tabId);
            }
        } else {
            chrome.runtime.sendMessage({ type: 'GET_TABID' }, (function(tabId) {
                this.tabId = tabId;
                if (fnCallback) {
                    fnCallback(this.tabId);
                }
            }).bind(this));
        }
    },

    getReferInfoKey: function(fnCallback) {
        this.getTabId(function(tabId) {
            fnCallback('referInfo' + tabId);
        });
    },

    onDoStumble: function(url) {
        // Make sure the referral frame has been created
        this.checkCreateReferralFrame();

        // And set the referInfo that the referral frame will pick up automatically
        this.getReferInfoKey(function(referInfoKey) {
            var storageInfo = {};
            storageInfo[referInfoKey] = { stumbleUrl: url };
            chrome.storage.local.set(storageInfo);
        });
    },

    onDoPrerender: function(url) {
        // Make sure the referral frame has been created
        this.checkCreateReferralFrame();

        // And set the referInfo that the referral frame will pick up automatically
        this.getReferInfoKey(function(referInfoKey) {
            var storageInfo = {};
            storageInfo[referInfoKey] = { preRenderUrl: url };
            chrome.storage.local.set(storageInfo);
        });
    },

    onBPRequest: function(request, fnResponse)
    {
        var result = null;
        switch(request.type)
        {
            case "GETWINDOWDIMENSIONS":
                result = { height: window.innerHeight, width: window.innerWidth };
                break;
            case "SHOWTOOLBAR":
                this.createToolbar(request.frameUrl, request.preFrameImage);
                break;
            case "DESTROYTOOLBAR":
                this.destroyToolbar();
                break;
            case "SETHEIGHT":
                this.setHeight(request.height);
                break;
            case "GETHEIGHT":
                result = this.lastHeight;
                break;
            case "GETADDRESS":
                if (window === window.top)
                    result = window.top.location.href;
                break;
            case "GETCONTENTLOCATION":
                if (window === window.top)
                    result = this.getContentLocation();
                break;
            case "SETCONTENTFOCUS":
                document.body.focus();
                break;
            case "OVERLAY_CREATE":
                result = this.createOverlay(request);
                this.activeOverlays[result] = result;
                break;
            case "OVERLAY_GETOPTIONS":
                result = this.getOverlayOptions(request);
                break;
            case "OVERLAY_REMOVE":
                this.removeOverlay(request.id);
                break;
            case "OVERLAY_GETPOSITION":
                result = this.getOverlayPosition(request.id);
                break;
            case "OVERLAY_UPDATE":
                result = this.updateOverlay(request.id, request.options);
                break;
            case "OVERLAY_TOGGLE":
                result = this.toggleOverlay(request);
                break;
            case "OVERLAY_DESTROYALL":
                this.destroyAllOverlays(request.filter);
                break;
            case "GETGASTATS":
                result = this.getGAStats(request, fnResponse);
                // Let getGAStats handle the response
                fnResponse = null;
                break;
            case "LITEBAR_LOADING":
                this.onToolbarLoading();
                break;
            case "DO_STUMBLE":
                this.onDoStumble(request.url);
                break;
            case "DO_PRERENDER":
                this.onDoPrerender(request.url);
                break;
            case "disableStumble":
                    var div = document.getElementById(this.disableStumbleId);
                    div.style.height = window.innerHeight + "px";
                    div.style.display = "block";
                    break;
            case "enableStumble":
                    var div = document.getElementById(this.disableStumbleId);
                    div.style.display = "none";
                    break;
        }
        if(fnResponse)
        {
            fnResponse(result);
        }
    },

    sendTimingEvent: function(eventName) {
        // DISABLED FOR NOW UNTIL WE DEAL WITH THE PRE-RENDER MODEL AND SCENARIOS
        return;

        var now = (new Date()).getTime();
        var url = window.location.href;
        chrome.extension.sendMessage({
                type: "TIMINGEVENT",
                event: eventName,
                time: now,
                url: url });
    },

    // A simple cookie parser
    readCookie: function(name)
    {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    },

    /*
    ** injectFn
    **
    ** Injects (and executes) a function in the page javascript context (as opposed to the
    ** content script context)
    */
    injectFn: function(fn) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.textContent = "(" + fn + ")();";
        document.documentElement.appendChild(script);
    },


    saveJSON: function() {
        this.injectFn(function() {
            window.__orig__JSON = window.JSON;
        })
    },

    initGA: function() {
        this.startLoad = (new Date()).getTime();
    },

    overlayInit: function() {
        // Do overlay initialization
        // First, detect whether this is an overlay
        var regexOverlay = /#overlayid=([^&]*)&openerid=([^&\/]*)/;
        var test = unescape(window.location.href);
        var match = test.match(regexOverlay);
        if(!match) {
            // Not an overlay.  If it's a top-most window, then listen for overlay events
            if (window != window.top)
                return;

            // Listen for the OVERLAY_LOADED message which tells us when to remove the overlay loader image
            var self = this;
            window.addEventListener("message", function(event) {
                if (!event.origin.match(self.regexOurOrigin))
                    return;

                var msg = null;
                try {
                    msg = JSON.parse(event.data);
                } catch(ex) {}
                if (msg && (msg.type == "OVERLAY_LOADED"))
                    self.removeOverlayLoader(msg.id);
            }, false);

            // This is not an overlay, so we are done with initialization
            return;
        }

        // Do overlay-specific initialization
        var overlayId = match[1];

        // Otherwise, hide the content and show the loader until the overlay is fully loaded
        if(this.inSafari) {
            var self = this;
            window.addEventListener('load', function() {
                document.documentElement.style['-webkit-transition'] = 'opacity 0.12s linear';
                document.documentElement.style.opacity = "1.0";
                // Tell the parent frame to remove the overlay loader
                var msg = { type: "OVERLAY_LOADED", id: overlayId };
                window.parent.postMessage(JSON.stringify(msg), "*");
            }, false);
            document.documentElement.style.opacity = "0";
        }
    },

    copyEnhancement: function(link) {
        var sel = document.getSelection();
        if (!sel || !sel.rangeCount) {
            return;
        }

        var range = sel.getRangeAt(0);

        // Create an off-screen div that has all the elements of the selection
        var tempDiv = document.createElement("div");
        tempDiv.style.overflow = "";
        tempDiv.style.color = "#000000";
        tempDiv.style.backgroundColor = "#FFFFFF";
        tempDiv.style.textAlign = "left";
        tempDiv.style.textDecoration = "none";
        tempDiv.style.border = "none";
        tempDiv.style.width = 0.1;
        tempDiv.style.height = 0.1;
        tempDiv.style.position = "absolute";
        tempDiv.style.top = "-1000px";
        tempDiv.style.left = "-1001px";
        tempDiv.appendChild(range.cloneContents());

        // Add our content to that off-screen div
        var extra = document.createElement("span");
        extra.innerHTML = '<a href="' + link + '">See this page on StumbleUpon</a>';
        extra.innerHTML = "<br/><br/>" + extra.innerHTML;
        tempDiv.appendChild(extra);
        tempDiv.appendChild(document.createElement("br"));

        // Insert and select that div
        document.body.insertBefore(tempDiv, document.body.firstChild);
        sel.selectAllChildren(tempDiv);

        // Restore the previous selection
        window.setTimeout(function() {
            tempDiv.parentNode.removeChild(tempDiv);
            sel.removeAllRanges();
            sel.addRange(range);
        }, 0);
        return true;
    },

    initCopySupport: function() {
        Messaging.sendBPRequest({ type: "GET_URLDATA", url: document.location.href }, (function(data) {
            if (!data || !data.publicid) {
                return;
            }

            document.addEventListener('copy', (function() {
                return this.copyEnhancement('http://www.stumbleupon.com/su/' + data.publicid);
            }).bind(this), false);
        }).bind(this));

    },

    init: function() {
        var me = this;

        if(window.location.href.match(this.regexLitebar))
            this.pageType = this.PAGE_TOOLBAR;
        else if(window.location.href.match(this.regexSingleton))
            this.pageType = this.PAGE_SINGLETON;
        else if(window.location.href.match(this.regexSite))
            this.pageType = this.PAGE_SITE;
        else
            this.pageType = this.PAGE_OTHER;

        this.overlayInit();

        if (this.pageType == this.PAGE_TOOLBAR) {
            // Notify the background page about litebar loading events so it can do things like
            // hide the current pre-render div and take a pre-render snapshot of the page.

            // Note:  Chrome has a strange bug in that window.top is undefined from a content script
            //        so we do this posting using an injected anonymous function (that does the same thing)
            this.injectFn(this.postLoadMessage);

            if (document.readyState === "complete") {
                window.setTimeout(function() {
                    Messaging.sendBPRequest({type: "LBWINDOWLOADED"});
                }, 0);
            } else {
                window.addEventListener("load", function() {
                    Messaging.sendBPRequest({ type: "LBWINDOWLOADED" });
                }, false);
            }
        }

        // We only need toolbar injection functionality in top-level pages.
        if((window != window.top) || (this.pageType == this.PAGE_TOOLBAR))
            return;

        // SU used to have a conflicting JSON object, so save the original in case they replace it
        if( (this.pageType == this.PAGE_TOOLBAR) ||
            (this.pageType == this.PAGE_SITE) ||
            (this.pageType == this.PAGE_SINGLETON) ) {
            // Save the JSON object in case the page script replaces it
            this.saveJSON();
        }

        // Listen for background page messages.
        Messaging.addListener(function(request, sender, fnResponse) {
            me.onBPRequest(request, fnResponse);
        });

        this.initGA();

        // this.initCopySupport();

        if(window == window.top) {
            // Send load timing events
            me.sendTimingEvent("startLoad");
            window.addEventListener("load", function() {
                me.sendTimingEvent("load");
            }, false);

            window.addEventListener("DOMContentLoaded", function() {
                me.sendTimingEvent("DOMContentLoaded");
            }, false);
        }

        if(this.inSafari)
            this.safari_init();
        else
            this.chrome_init();
    },

    chrome_init: function() {
        // Announce ourselves to the background page.
        var isPreRender = (document.webkitVisibilityState == "prerender");
        var self = this;
        Messaging.sendBPRequest({ type: "NEWPAGELOADED", isPreRender: isPreRender }, function(response) {
            // The BP is asking us to create the toolbar immediately
            self.createToolbar(response.frameUrl, response.preFrameImage);
        });

        // Listen for toolbar loading messages so we know when to make the toolbar visible
        window.addEventListener("message", function(event) {
            // We only accept messages from our site pages
            if (!event.origin.match(self.regexSite))
                return;

            // Catch exceptions to avoid noise from unrelated messages
            try {
                if (event.data.type == "LBWINDOWLOADING")
                    self.onToolbarLoading();
            } catch(ex) {}
        }, false);

        // Get & cache the tab id from the Background Page
        this.getTabId();
    },

    safari_init: function() {
        // Notify the background page of new top-level tabs
        if(window == window.top) {
            Messaging.sendBPRequest({type: "NEWPAGELOADING"});
            window.addEventListener("load", function() {
                Messaging.sendBPRequest({type: "NEWPAGELOADED"});
            }, false);
        }
    }
}

// Chromebar initializes from everypage_early or everypage_end, safaribar uses everypage
if(everypage.inSafari)
    everypage.init();
