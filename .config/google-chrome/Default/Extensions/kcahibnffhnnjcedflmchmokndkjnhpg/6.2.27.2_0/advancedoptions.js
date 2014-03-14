var backgroundPage = null;

function getStorage(key)
{
    var result = localStorage[key];
    if(typeof(result) == "undefined")
        return false;

    return JSON.parse(result);
}

function setStorage(key, value)
{
    // null or undefined will delete the value, but we do support
    // explicit setting of false
    if (!value && (typeof(value) !== 'boolean')) {
        delete localStorage[key];
    } else {
        localStorage[key] = JSON.stringify(value);
    }
}

function changeDomain()
{
    var domain = document.getElementById("domain").value;
    if(domain.indexOf("www.") == 0)
        domain = server.substring(4);
    backgroundPage.theBP.changeDomain(domain);

    alert("done!");
}


function removeCookie(cookie)
{
    var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path;
    chrome.cookies.remove({"url": url, "name": cookie.name});
}

function removeCookiesForDomain(domain)
{
    chrome.cookies.getAll({ domain: domain }, function(cookies) {
            cookies.forEach(function(cookie) {
                removeCookie(cookie);
            });
    });
}

function clearSiteCookies()
{
    var domain = backgroundPage.Strings.get("DOMAIN");

    removeCookiesForDomain(domain);
    removeCookiesForDomain("www.domain");
    alert('done!');
}

function clearStorage()
{
    if(window.confirm("Are you sure you want to delete all of your StumbleUpon data?\r\n\r\nNote that this will not delete the 'domain' setting."))
    {
        doClearStorage();
    }
}

function doClearStorage()
{
    var results = document.getElementById("clearStorageResults");
    results.innerHTML = "";
    for(var key in localStorage)
    {
        if(key == 'domain')
            continue;
        var value = localStorage[key];

        var p = document.createElement("p");
        p.textContent = "deleting " + key + "...";
        results.appendChild(p);
        delete localStorage[key];
    }
    results.innerHTML += "Done!";
}

function dumpStorage()
{
    var results = document.getElementById("dumpStorageResults");
    results.innerHTML = "";
    for(var key in localStorage)
    {
        var value = localStorage[key];
        var div = document.createElement("div");
        div.className = "storageDump";
        results.appendChild(div);

        var p = document.createElement("p");
        p.textContent = "key: " + key;
        div.appendChild(p);

        p = document.createElement("p");
        p.textContent = value;
        div.appendChild(p);

    }
    results.innerHTML += '<br/>Done!</br/>';
}

function toggleGlobalMode()
{
    setStorage("globalModeEnabled", !getStorage("globalModeEnabled"));
}

function togglePreFrame()
{
    setStorage("disablePreFrame", !getStorage("disablePreFrame"));
}

function toggleXDebugCookie() {
    setStorage("enableXDebugCookie", !getStorage("enableXDebugCookie"));
    backgroundPage.XDebug.updateListeners();
}

function appendButton(parent, name, fnClick)
{
    var input = document.createElement("input");
    input.setAttribute("type", "button");
    input.setAttribute("value", name);
    parent.appendChild(input);
    input.addEventListener("click", fnClick, false);
}

function addEventHandlers(arrHandlers) {
    for (var i=0; i<arrHandlers.length; i++) {
        var el = document.getElementById(arrHandlers[i].id);
        el.addEventListener(arrHandlers[i].event, arrHandlers[i].handler, false);
    }
}

function init()
{
    addEventHandlers([
        { id: "changeDomain", event: "click", handler: changeDomain },
        { id: "dumpStorage", event: "click", handler: dumpStorage },
        { id: "clearCookies", event: "click", handler: clearSiteCookies },
        { id: "clearStorage", event: "click", handler: clearStorage },
        { id: "disablePreFrame", event: "click", handler: togglePreFrame },
        { id: "enableXDebugCookie", event: "click", handler: toggleXDebugCookie }
    ]);

    backgroundPage = chrome.extension.getBackgroundPage();
    var domain = backgroundPage.Strings.get("DOMAIN");
    document.getElementById("domain").value = domain;

    document.getElementById("disablePreFrame").checked = getStorage('disablePreFrame');
    document.getElementById('enableXDebugCookie').checked = getStorage('enableXDebugCookie');
}

window.onload = init;
