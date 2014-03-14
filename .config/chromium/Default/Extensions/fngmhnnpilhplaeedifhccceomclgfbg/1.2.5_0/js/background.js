var PAUSED = false;
var showContextMenu = undefined;
var showChristmasIcon = undefined;
updateCallback = function () {
    if (showContextMenu != preferences.showContextMenu) {
        showContextMenu = preferences.showContextMenu;
        setContextMenu(showContextMenu)
    }
    setChristmasIcon();
};
ls.set("option_panel", null);
var currentVersion = chrome.app.getDetails().version;
if (data.lastVersionRun != currentVersion) {
    if (data.lastVersionRun == undefined) {
        chrome.tabs.create({
            url: chrome.extension.getURL("options_pages/support.html")
        })
    }
    data.lastVersionRun = currentVersion
}

setChristmasIcon();
setInterval(setChristmasIcon, 60 * 60 * 1000); //Every hour

setContextMenu(preferences.showContextMenu);
chrome.cookies.onChanged.addListener(function (h) {
    var j = h.removed;
    var c = h.cookie;
    var b = h.cause;
    var a = c.name;
    var e = c.domain;
    var l = c.value;
    if (b == "expired" || b == "evicted") {
        return
    }
    if (!PAUSED) {
        for (var g = 0; g < data.readOnly.length; g++) {
            var k = data.readOnly[g];
            if (compareCookies(c, k)) {
                if (j) {
                    chrome.cookies.get({
                        url: "http" + ((k.secure) ? "s" : "") + "://" + k.domain + k.path,
                        name: k.name,
                        storeId: k.storeId
                    }, function (i) {
                        if (compareCookies(i, k)) {
                            return
                        }
                        var n = cookieForCreationFromFullCookie(k);
                        chrome.cookies.set(n);
                        console.log("Cookie Protected! Name:" + a + " / Url:" + n.url + " / Value: " + n.value);
                        ++data.nCookiesProtected;
                        return
                    })
                }
                return
            }
        }
        if (!j) {
            for (var g = 0; g < data.filters.length; g++) {
                var f = data.filters[g];
                if (filterMatchesCookie(f, a, e, l)) {
                    chrome.tabs.getSelected(null, function (n) {
                        var i = {};
                        i.url = n.url;
                        i.url = "http" + ((c.secure) ? "s" : "") + "://" + c.domain + c.path;
                        i.name = a;
                        chrome.cookies.remove(i);
                        console.log("Cookie Blocked! Name:" + a + " / Url:" + i.url);
                        ++data.nCookiesFlagged;
                        return
                    })
                }
            }
        }
    }
    if (!j && preferences.useMaxCookieAge && preferences.maxCookieAgeType > 0) {
        var m = Math.round((new Date).getTime() / 1000) + (preferences.maxCookieAge * preferences.maxCookieAgeType);
        if (c.expirationDate != undefined && c.expirationDate > m + 60) {
            var d = cookieForCreationFromFullCookie(c);
            if (!c.session) {
                d.expirationDate = m
            }
            chrome.cookies.set(d);
            console.log("Cookie Shortened! Name:'" + c.name + "' from '" + c.expirationDate + "' to '" + m + "'");
            ++data.nCookiesShortened;
            return
        }
    }
});
chrome.extension.onRequestExternal.addListener(function (c, b, a) {
    console.assert(b.id == editThisCookieID || b.id == swapMyCookiesID || b.id == forgetMeID);
    if (c.action != undefined && c.action == "ping") {
        a({})
    }
});
chrome.extension.onConnectExternal.addListener(function (a) {
    console.log("Connection coming!");
    console.assert(a.sender.id == editThisCookieID || a.sender.id == swapMyCookiesID || a.sender.id == forgetMeID);
    a.onMessage.addListener(function (b) {
        if (b.action != undefined) {
            if (b.action == "pause") {
                console.log("Protection paused");
                PAUSED = true;
                a.postMessage({
                    pause: true
                })
            } else {
                if (b.action == "resume") {
                    console.log("Protection resumed");
                    PAUSED = false;
                    a.postMessage({
                        resume: true
                    })
                }
            }
        }
    })
});

function setContextMenu(a) {
    chrome.contextMenus.removeAll();
    if (a) {
        chrome.contextMenus.create({
            title: _getMessage("ContextMenu"),
            contexts: ["all"],
            onclick: function (c, b) {
                showPopup(c, b)
            }
        })
    }
}

function setChristmasIcon() {
	if (isChristmasDate && preferences.showChristmasIcon) {
		chrome.browserAction.setIcon({"path":"/img/cookie_xmas_19x19.png"});
	} else {
		chrome.browserAction.setIcon({"path":"/img/icon_19x19.png"});
	}
}
