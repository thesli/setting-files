/*
 * popup.js
 *
 * The script code for popup.html
 *
 */

// NOTE:  Some of this could be handled in CSS, but the current builds of Chrome aren't properly handling
//        attribute selectors for dynamic attribute changes (ugh!)
//
var BUTTONS = {
    "stumble": {
        title: "",
        disabledTitle: "",
        image: "stumble.png",
        handler: onStumble
    },

    "like": {
        title: "Thumb up the pages you like to get even more personalized recommendations.",
        disabledTitle: "Sorry, this page can't be thumbed up.",
        image: "thumbup.png",
        disabledImage: "thumbup_d.png",
        handler: onLike
    },

    "notLike": {
        title: "Thumb down the pages you don't like, so StumbleUpon knows not to recommend other pages like them.",
        disabledTitle: "Sorry, you can only thumb down pages that you stumble.",
        image: "thumbdown.png",
        disabledImage: "thumbdown_d.png",
        handler: onNotLike
    },

    "add-to-list": {
        title: "Add this page to one of your lists.",
        disabledTitle: "Sorry, this page can't be added to a list.",
        image: "add_to_list.png",
        disabledImage: "add_to_list_d.png",
        handler: onAddToList
    },

    "share": {
        title: "Share with other Stumblers.",
        disabledTitle: "Sorry, this page can't be shared.",
        image: "share.png",
        disabledImage: "share_d.png",
        handler: onShare
    },

    "logout": {
        title: "Sign out of StumbleUpon.",
        disabledTitle: "Not signed in.",
        handler: onLogout
    },

    "login": {
        title: "Sign in to StumbleUpon.",
        handler: onSignin
    },

    "home": {
        title: "Go to the StumbleUpon web site.",
        image: "",
        handler: onHome
    },

    "turnoff": {
        title: "Turn the toolbar off.",
        disabledTitle: "Toolbar is not on.",
        image: "",
        handler: onTurnOff
    },

    "profile": {
        title: "Go to your profile.",
        disabledTitle: "Not signed in.",
        image: "",
        handler: onProfile
    },

    "help": {
        title: "Get help with using StumbleUpon.",
        image: "",
        handler: onHelpPage
    },

    "settings": {
        title: "Change your settings.",
        disabledTitle: "Not signed in.",
        image: "",
        handler: onSettings
    },

    "advanced-options": {
        title: "Change extension's advanced options.",
        image: "",
        handler: onAdvancedOptions
    }
}

var gClientApi = null;
var gScriptVersion = "20120302";
var gBackgroundPage = chrome.extension.getBackgroundPage();

function log(text)
{
    var el = document.getElementById("debug");
    el.innerHTML = el.innerHTML + text + "<br/>";
}

function showFinalMessage(msg) {
    var el = document.getElementById("messageContent");
    el.textContent = msg;
    el.style.display = "block";

    el = document.getElementById("popupContent");
    el.style.display = "none";

    window.setTimeout(function() {
        window.close();
    }, 4000);
}

function onStumble() {
    var globals = gBackgroundPage.theBP.getExtApiValue("globals");

    if (globals && globals.user && globals.user.loggedIn)
    {
        gBackgroundPage.theBP.stumble();
    }
    else
    {
        var url = gBackgroundPage.Strings.get("LOGIN_URL");
        gBackgroundPage.Utils.navigate(url);
    }
    window.close();
}

function onLike() {
    chrome.tabs.getSelected(null, function(currentTab) {
        gClientApi.getUrlInfo(currentTab.url, function(result) {
            if (!result._success || !result.urlinfo) {
                showFinalMessage("Failed to retrieve information for the current page, there may be a server problem.");
                return; // Technically not necessary, just for clarity
            }
            var info = result.urlinfo;
            if( !info.known ) {
                var encUrl = encodeURIComponent(currentTab.url);
                var submitUrl = gBackgroundPage.Strings.get("SUBMIT_URL", { "theUrl": encUrl });
                gBackgroundPage.Utils.navigate(submitUrl, true);
                return;
            }

            gClientApi.rate(info.publicid, 1, function(result) {
                if(!result.success) {
                    showFinalMessage("Failed to record your positive rating, there may be a server problem.");
                }
                else {
                    gBackgroundPage.theBP.sendUpdateRating(1);
                    showFinalMessage("Your thumbup was recorded.");
                }
            });
        });
    });
}

function onNotLike() {
    chrome.tabs.getSelected(null, function(currentTab) {
        gClientApi.getUrlInfo(currentTab.url, function(result) {
            if(!result._success || !result.urlinfo ) {
                showFinalMessage("Failed to retrieve information for the current page, there may be a server problem.");
                return; // Technically not necessary, just for clarity
            }

            var info = result.urlinfo;
            if( !info.known || !info.publicid ) {
                showFinalMessage("Nobody has discovered this page yet, so it cannot be thumbed down.");
                return;
            }

            // We have our URL info, perform the rating
            gClientApi.rate(info.publicid, 0, function(result) {
                if(!result.success) {
                    showFinalMessage("Failed to record your negative rating, there may be a server problem.");
                }
                else {
                    gBackgroundPage.theBP.sendUpdateRating(0);
                    showFinalMessage("Your thumbdown was recorded.  Thanks for letting us know, we'll avoid sending you sites like this in the future.");
                }
            });
        });
    });
}

function onShare() {
    gBackgroundPage.theBP.share();
    window.close();
}

function onAddToList() {
    gBackgroundPage.theBP.addToList();
    window.close();
}

function onHome() {
    var url = gBackgroundPage.Strings.get("SERVER_HTTP");
    gBackgroundPage.Utils.navigate(url);
    window.close();
}

function onSignin() {
    var url = gBackgroundPage.Strings.get("SIGNIN_URL");
    gBackgroundPage.Utils.navigate(url);
    window.close();
}

function onTurnOff() {
    gBackgroundPage.theBP.popupClose();
    window.close();
}

function onLogout() {
    gBackgroundPage.theBP.popupLogout();
    window.close();
}

function onAdvancedOptions() {
    var url = chrome.extension.getURL("advancedoptions.html");
    gBackgroundPage.Utils.navigate(url, true);
    window.close();
}

function onProfile() {
    url = gBackgroundPage.Strings.get("SERVER_HTTP") + '/stumbler/' + gBackgroundPage.Strings.get("USERNAME");
    gBackgroundPage.Utils.navigate(url, true);
    window.close();
}

function onHelpPage() {
    url = gBackgroundPage.Strings.get("SERVER_HTTP") + '/help';
    gBackgroundPage.Utils.navigate(url, true);
    window.close();
}

function onSettings() {
    url = gBackgroundPage.Strings.get("SERVER_HTTP") + '/settings/profile';
    gBackgroundPage.Utils.navigate(url, true);
    window.close();
}

function initializeApi() {
    gClientApi = gBackgroundPage.getClientApi();
    gClientApi.setSource("popup");
    gClientApi.setScriptVersion(gScriptVersion);
}

function disableButton(id) {
    var el = document.getElementById(id);
    var anchor = el.getElementsByTagName("a")[0];
    var button = BUTTONS[id];

    el.className = "btn btnDisabled";
    el.setAttribute("enabled", "false");
    el.removeEventListener("click", button.handler);
    if(button.disabledTitle)
        anchor.setAttribute("title", button.disabledTitle);
    else
        anchor.setAttribute("title", button.title);

    var image = button.disabledImage ? button.disabledImage : button.image;
    var background = "transparent url(" + image + ") left center no-repeat";
    anchor.style.background = background;
}

function enableButton(id) {
    var el = document.getElementById(id),
        anchor = el.getElementsByTagName("a")[0],
        button = BUTTONS[id],
        background;

    el.className = "btn";
    el.addEventListener("click", button.handler);
    anchor.setAttribute("title", button.title);
    if (button.image) {
        background = "transparent url(" + button.image + ") left center no-repeat";
        anchor.style.background = background;
    }
    if(button.color)
        anchor.style.color = button.color;
}

function hideButton(id) {
    var el = document.getElementById(id);
    el.style.display = "none";
}

function showButton(id) {
    var el = document.getElementById(id);
    el.style.display = "list-item";
}

function onMacOSXMavericks()
{
    return (window.navigator.appVersion.indexOf("Mac OS X 10_9") != -1);
}

function init(loggedIn) {
    // Use the same "BackgroundPage" namespace qualifer that exists in the actual background page
    // so shared scripts can use the same namespace.
    window.BackgroundPage = gBackgroundPage.theBP;

    initializeApi();

    // Show our content now (remember that we started off invisible in case the background page
    // stumbled instead of showing this popup
    document.body.style.display = "block";

    enableButton("help");

    if(loggedIn)
    {
        enableButton("logout");
        enableButton("profile");
        enableButton("settings");
        enableButton("add-to-list");
    }
    else
    {
        hideButton("logout");
        showButton("login");
        enableButton("login");
        disableButton("profile");
        disableButton("settings");
        disableButton("add-to-list");
    }

    var globals = gBackgroundPage.theBP.getExtApiValue("globals");

    disableButton("advanced-options");
    if (globals != null && globals.user != undefined && globals.user.on_su_team){
        document.getElementById("advanced-options").style.display = "block";
        enableButton("advanced-options");
    }

    // Button states depend on the currently active tab
    chrome.tabs.getSelected(null, function(currentTab) {
        // If it's blacklisted, then display the blacklist message
        if (gBackgroundPage.Blacklist.isBlacklisted(currentTab.url)) {
            document.getElementById("disabledMessage").style.display = "block";
            disableButton("share");
        }
        if (gBackgroundPage.theBP.doesTabHaveToolbar(currentTab))
            enableButton("turnoff");
        else
            disableButton("turnoff");

        // Not like is most likely disabled
        disableButton("notLike");
        if (loggedIn) {
            // Only show the thumbdown button if they are currently logged in AND
            // the current URL is a recently stumbled url
            if(gBackgroundPage.theBP.isRecentStumble(currentTab.url))
                enableButton("notLike");
        }

        // Stumble and home are always enabled
        enableButton("stumble");
        enableButton("home");

        // Like and Share depend on whether this is a supported URL
        if(gBackgroundPage.theBP.isTabSupported(currentTab) && loggedIn)
        {
            enableButton("like");
            enableButton("share");
        }
        else
        {
            disableButton("like");
            disableButton("share");
        }
    });
}

gBackgroundPage.theBP.onBrowserActionClicked(function(showPopup, loggedIn) {
    // This is a workaround for a bug in OSX 10.9 with self-closing pop-up windows.
    // If you close them while they are loading / sizing, it will result in the Chrome
    // window being closed and will sometimes leave artifacts.
    var delay = onMacOSXMavericks() ? 250 : 0;
    if(showPopup) {
        init(loggedIn);
    }
    else {
        window.setTimeout(function() {
            window.close();
        }, delay);
    }
});
