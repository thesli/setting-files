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
    localStorage[key] = JSON.stringify(value);
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

function appendButton(parent, name, fnClick)
{
    var input = document.createElement("input");
    input.setAttribute("type", "button");
    input.setAttribute("value", name);
    parent.appendChild(input);
    input.addEventListener("click", fnClick, false);
}

function appendContest(contest) {
    var div = document.getElementById("contestInfo");
    var name = document.createElement("span");
    name.textContent = "Name: " + contest.name;
    div.appendChild(name);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));

    if(!contest.active) {
        appendButton(div, "Activate", function() {
            contest.active = true;
            initContests();
        });
        div.appendChild(document.createElement("br"));
    } else {
        appendButton(div, "De-Activate", function() {
            contest.active = false;
            initContests();
        });
        div.appendChild(document.createElement("br"));
    }

    appendButton(div, "Reset Notifications", function() {
        backgroundPage.Contests.resetNotifications(contest.id);
        alert("done");
    });
    div.appendChild(document.createElement("br"));
    var span = document.createElement("span");
    span.textContent = "Raw Contents: " + JSON.stringify(contest);
    div.appendChild(span);
    div.appendChild(document.createElement("hr"));
}

function initContests()
{
    var contests = backgroundPage.Contests.getAll();
    var div = document.getElementById("contestInfo");

    if(!contests) {
        div.textContent = "No Contests Found";
        return;
    }

    div.innerHTML = "";
    for(var i=0; i<contests.length; i++) {
        appendContest(contests[i]);
    }
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
        { id: "disablePreFrame", event: "click", handler: disablePreFrame }
    ]);

    backgroundPage = chrome.extension.getBackgroundPage();
    var domain = backgroundPage.Strings.get("DOMAIN");
    document.getElementById("domain").value = domain;

    var disablePreFrame = backgroundPage.SU.Storage.get("disablePreFrame");
    document.getElementById("disablePreFrame").checked = !!disablePreFrame;

    initContests();
}

window.onload = init;
