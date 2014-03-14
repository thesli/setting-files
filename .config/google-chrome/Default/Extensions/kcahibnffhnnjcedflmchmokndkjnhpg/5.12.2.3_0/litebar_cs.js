//
// If this is the litebar frame, then initialize extconnect appropriately, and inject the
// API into the frame.
//
var litebar_cs =
{
// @todo:  Why do we need this exactly?  Additional security layer?  All it does is forward messages.
    onWPRequest: function(request, fnResponse)
    {
        switch(request.type)
        {
        case "OPENTAB":
        case "GETWINDOWDIMENSIONS":
        case "GETDOMAIN":
        case "GETHEIGHT":
        case "GETVALUE":
        case "SETHEIGHT":
        case "GETADDRESS":
        case "GETCONTENTLOCATION":
        case "SETCONTENTFOCUS":
        case "SETVALUE":
        case "CLOSETOOLBAR":
        case "HIDETOOLBAR":
        case "OPENTOOLBAR":
        case "RELOADTOOLBAR":
        case "LBBROADCAST":
        case "LITEBARLOADED":
        case "LBWINDOWLOADED":
        case "OVERLAY_CREATE":
        case "OVERLAY_REMOVE":
        case "OVERLAY_SETPOSITION":
        case "OVERLAY_GETPOSITION":
        case "OVERLAY_GETOPTIONS":
        case "OVERLAY_UPDATE":
        case "OVERLAY_SHOWWITHURL":
        case "EXTAPIBROADCAST":
        case "EXTAPIPOSTMESSAGE":
        case "ISTOOLBARON":
        case "SET_STUMBLEMODE":
        case "STUMBLE":
        case "GET_OAUTH_INFO":
        case "PRERENDER":
            // Forward these requests on to the background page.
            this.safeSendRequest(request, fnResponse);
            break;
        default:
            console.log("SU: Unknown Request: " + JSON.stringify(request));
            break;
        }
    },

    onBPRequest: function(request, fnResponse)
    {
        switch(request.type)
        {
        case "LOGOUT":
            extconnect_is.sendWPRequest({ type: "LOGOUT" });
            break;
        case "NEXTSTUMBLE":
            extconnect_is.sendWPRequest({ type: "NEXTSTUMBLE" });
            break;
        case "LBBROADCAST":
            if(request.msg && (request.msg.type == "RELOADTOOLBAR"))
            {
                // Just reload it directly.
                if(everyPageCode.pageType == everyPageCode.PAGE_TOOLBAR)
                    document.location.reload();
            }
            else
            {
                // Send the broadcast on to the page.
                extconnect_is.sendWPRequest({ type: "RAISEEVENT", eventName: "message", eventData: request.msg });
            }
            break;
        case "EXTAPIBROADCAST":
            if(!extconnect_is.sendWPRequest)
                debugger;
            extconnect_is.sendWPRequest({ type: "EXTAPIBROADCAST", data: request.data });
            break;
        case "EXTAPIPOSTMESSAGE":
            extconnect_is.sendWPRequest({ type: "EXTAPIPOSTMESSAGE", data: request.data });
            break;
        }
    },

    // For some reason, chrome.extension.sendRequest doesn't like having an undefined
    // param pased as the response argument.
    safeSendRequest: function(request, fnResponse) {
        if(fnResponse) {
            request._responseRequested = true;
            chrome.extension.sendMessage(request, fnResponse);
        }
        else
            chrome.extension.sendMessage(request);
    },

    init: function() {
        // If this isn't a page that should get the extension API, then just exit.
        if((everyPageCode.pageType != everyPageCode.PAGE_TOOLBAR) &&
            (everyPageCode.pageType != everyPageCode.PAGE_SITE) &&
            (everyPageCode.pageType != everyPageCode.PAGE_SINGLETON))
            return;

        // Initialize extconnect support for the web page
        var me = this;
        extconnect_is.addListener(function(request, sender, fnResponse) {
                me.onWPRequest(request, fnResponse);
        });

        // Listen for messages from the background page.
        chrome.extension.onMessage.addListener(function(request, sender, fnResponse) {
                me.onBPRequest(request, fnResponse);
                return true; // Matches sendRequest semantics
        });

        // Add the extension api to the web page
        var scriptUrl = chrome.extension.getURL("extensionapi.js");
        var script = document.createElement("script");
        script.setAttribute("src", scriptUrl);
        document.body.appendChild(script);
    }
}

litebar_cs.init();
