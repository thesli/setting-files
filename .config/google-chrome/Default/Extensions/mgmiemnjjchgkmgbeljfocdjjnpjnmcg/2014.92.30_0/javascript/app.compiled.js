(function() {
  var DEFAULTS, msg, url_handler, _e;

  window.util = {};

  window.util.toArray = function(list) {
    return Array.prototype.slice.call(list || [], 0);
  };

  window.stock_widgets = {
    webstore: {
      where: [2, 1],
      size: [1, 1],
      type: "app",
      isApp: true,
      name: "Chrome Web Store",
      color: "rgba(0, 16, 186, 1)",
      id: "webstore",
      stock: true,
      img: "app.webstore.png",
      simg: "app.webstore.png",
      appLaunchUrl: "https://chrome.google.com/webstore?utm_source=webstore-app&utm_medium=awesome-new-tab-page"
    },
    getwidgets: {
      where: [2, 0],
      size: [1, 1],
      type: "app",
      isApp: true,
      name: "Get Widgets",
      color: "rgba(0, 160, 60, 1)",
      id: "getwidgets",
      stock: true,
      img: "/images/antp-flat-128.png",
      simg: "/images/antp-flat-128.png",
      appLaunchUrl: "http://dev.antp.co/widgets"
    },
    tutorial: {
      where: [0, 0],
      size: [2, 2],
      type: "iframe",
      isApp: false,
      stock: true,
      name: "Tutorial",
      id: "tutorial",
      path: "widgets/tutorial/widget.tutorial.html"
    },
    clock: {
      where: [1, 3],
      size: [1, 1],
      type: "iframe",
      isApp: false,
      stock: true,
      name: "Clock",
      id: "clock",
      path: "widgets/clock/widget.clock.html"
    },
    google: {
      where: [0, 2],
      size: [1, 2],
      type: "iframe",
      isApp: false,
      stock: true,
      name: "Google",
      id: "google",
      path: "widgets/google/widget.google.html"
    },
    facebook: {
      where: [2, 3],
      size: [1, 1],
      type: "app",
      isApp: true,
      stock: true,
      name: "Facebook",
      name_show: false,
      color: "rgba(19, 54, 131,  1)",
      img: "/widgets/facebook/widget.facebook.png",
      simg: "/widgets/facebook/widget.facebook.png",
      appLaunchUrl: "http://www.facebook.com/",
      id: "facebook"
    },
    twitter: {
      where: [2, 2],
      size: [1, 1],
      type: "app",
      isApp: true,
      stock: true,
      name: "Twitter",
      name_show: false,
      color: "rgba(51, 204, 255,  1)",
      img: "/widgets/twitter/widget.twitter.png",
      simg: "/widgets/twitter/widget.twitter.png",
      appLaunchUrl: "http://www.twitter.com/",
      id: "twitter"
    }
  };

  window.palette = ["rgba(51,   153,  51,    1)", "rgba(229,  20,   0,     1)", "rgba(27,   161,  226,   1)", "rgba(240,  150,  9,     1)", "rgba(230,  113,  184,   1)", "rgba(153,  102,  0,     1)", "rgba(139,  207,  38,    1)", "rgba(255,  0,    151,   1)", "rgba(162,  0,    225,   1)", "rgba(0,    171,  169,   1)"];

  window.gradient = ", -webkit-gradient( linear, right bottom, left top, color-stop(1, rgba(255, 255, 255, .04)), color-stop(0, rgba(255, 255, 255, 0.35)) )";

  if (localStorage.msg) {
    msg = JSON.parse(localStorage.msg);
    setTimeout((function() {
      return $.jGrowl(msg.message, {
        header: msg.title
      });
    }), 500);
    localStorage.removeItem("msg");
  }

  window.reload = function() {
    return window.location.reload(true);
  };

  window.new_guid = function() {
    var S4;
    S4 = function() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
  };

  if (typeof Object.merge !== "function") {
    Object.merge = function(o1, o2) {
      var i;
      for (i in o2) {
        o1[i] = o2[i];
      }
      return o1;
    };
  }

  _e = function(_eNum) {
    return console.error("Error #" + _eNum);
  };

  url_handler = false;

  $(document).on("mousedown", ".url", function(e) {
    var url;
    url = $(this).attr("data-url");
    if (url && typeof url === "string" && url !== "") {
      url_handler = url;
    } else {
      url_handler = false;
    }
    $(this).attr("href", url);
    if ((e.which === 2) || (e.ctrlKey === true && e.which !== 3)) {
      return $(this).attr("href", null);
    }
  });

  $(document).on("mouseup", document, function(e) {
    return url_handler = false;
  });

  $(document).on("mouseup", ".url", function(e) {
    var app, url;
    if (e.which !== 3) {
      if (e.ctrlKey === true) {
        e.which = 2;
      }
      if (e.metaKey === true) {
        e.which = 3;
      }
    }
    url = $(this).attr("data-url");
    if (url && typeof url === "string" && url !== "" && url_handler && url_handler === url) {
      if (e.shiftKey !== true) {
        if (e.which === 1) {
          if ($(this).attr("onleftclick") === "pin") {
            chrome.tabs.getCurrent(function(tab) {
              return chrome.tabs.update(tab.id, {
                url: String(url),
                pinned: true
              });
            });
          } else if ($(this).attr("onleftclick") === "newtab") {
            $(this).attr("href", "#");
            chrome.tabs.create({
              url: url,
              active: false
            });
          } else if (url.match(/^(http:|https:)/)) {
            window.location = url;
          } else {
            chrome.tabs.getCurrent(function(tab) {
              return chrome.tabs.update(tab.id, {
                url: String(url),
                active: true
              });
            });
          }
        } else if (e.which === 2) {
          chrome.tabs.create({
            url: url,
            active: false
          });
        }
      }
    } else if ((!url || url === "") && ($(this).closest(".app").attr("type") === "app" || $(this).closest(".app").attr("type") === "packaged_app")) {
      if (e.which === 1 || e.which === 2) {
        app = $(this).closest(".app");
        if (app.length > 0) {
          chrome.management.launchApp(app.attr("id"));
        }
        if (e.which === 1) {
          chrome.tabs.getCurrent(function(tab) {
            return chrome.tabs.remove([tab.id]);
          });
        }
      }
    }
    $(this).delay(100).queue(function() {
      return $(this).attr("href", url);
    });
    return url_handler = false;
  });

  window.storage = {
    get: function(keys, callback) {
      if (typeof keys === "string") {
        keys = [keys];
      }
      if (keys) {
        keys.push("settings");
      }
      return chrome.storage.local.get(keys, function(items) {
        items.settings_raw = items.settings;
        items.settings = settings.getAll(items.settings);
        if (callback) {
          return callback(items);
        } else {
          return console.debug(items);
        }
      });
    },
    set: function(items, callback) {
      return chrome.storage.local.set(items, callback);
    },
    remove: function(keys, callback) {
      return chrome.storage.local.remove(keys, callback);
    },
    clear: function(callback) {
      console.log("storage.clear");
      return chrome.storage.local.clear(callback);
    }
  };

  chrome.management.getAll(function(data) {
    return window.extensions = data;
  });

  DEFAULTS = {
    lock: true,
    buttons: true,
    grid: false,
    recently_closed: true,
    hscroll: true,
    scrollbar_bottom: true,
    grid_height: null,
    grid_width: null
  };

  window.settings = {
    set: function(obj, callback) {
      return storage.get("settings", function(callback_data) {
        var key, storedSettings;
        storedSettings = callback_data.settings;
        for (key in obj) {
          if (typeof DEFAULTS[key] === "undefined") {
            if (callback) {
              callback(false);
            } else {
              return;
            }
          }
          if (obj[key] === DEFAULTS[key]) {
            delete storedSettings[key];
          } else {
            storedSettings[key] = obj[key];
          }
        }
        return storage.set({
          settings: storedSettings
        }, callback);
      });
    },
    reset: function() {
      return storage.remove("settings");
    },
    getAll: function(storedSettings) {
      var key, userSettings;
      userSettings = {};
      if (!storedSettings) {
        storedSettings = {};
      }
      for (key in DEFAULTS) {
        if (typeof storedSettings[key] !== "undefined") {
          userSettings[key] = storedSettings[key];
        } else {
          userSettings[key] = DEFAULTS[key];
        }
      }
      return userSettings;
    }
  };

  $("#pro-button").css("opacity", .77);

  window.ProCtrl = function($scope) {
    var handle_changes, init, pro_prompt, pro_theme, save, update, updateStorage, update_success;
    $scope.pro = null;
    $scope.expired = null;
    $scope.pro_storage = {};
    $scope.unresolvedError = localStorage.getItem("pro_unresolvedError") === "true" ? true : false;
    update = function() {
      if (localStorage.getItem("pro")) {
        $scope.pro = localStorage.getItem("pro");
      } else {
        $scope.pro = null;
        $scope.expired = null;
        return;
      }
      if (localStorage.getItem("pro_expired") === "true") {
        $scope.expired = true;
        $("#pro-button").addClass("error");
        return;
      } else {
        $scope.expired = false;
        $("#pro-button").removeClass("error");
      }
      return $.ajax("https://pro.antp.co/pro_storage", {
        data: JSON.stringify({
          pro: $scope.pro
        }),
        contentType: "application/json",
        type: "POST",
        success: function(response) {
          if (response.isPro === false) {
            localStorage.setItem("pro_expired", "true");
            $scope.expired = true;
            $("#pro-button").addClass("error");
          }
          if (response.success) {
            init(response);
            $scope.pro_storage = response;
          } else {
            $.jGrowl(response.error, {
              header: "Pro Error"
            });
          }
          $scope.$apply();
          return updateStorage();
        },
        error: function(xhr, status, error) {
          $("#pro-button").addClass("error");
          $.jGrowl("There was an error (Error: " + error + ") loading your Pro account. If the problem persists, contact us.", {
            header: "Pro Error"
          });
          throw new Error(error);
        }
      });
    };
    update();
    window.isPro = function() {
      if ($scope.pro && !$scope.expired) {
        return true;
      } else {
        return false;
      }
    };
    updateStorage = function() {
      return chrome.storage.local.get(["pro"], function(data) {
        if (data.pro !== isPro()) {
          return chrome.storage.local.set({
            pro: isPro()
          });
        }
      });
    };
    $(document).on("click", "#pro-button", function() {
      localStorage.setItem("pro_prompt", "true");
      if ($scope.pro) {
        closeButton(".ui-2#pro-window");
        return $(".ui-2#pro-window").toggle();
      } else {
        return window.top.location.href = "https://pro.antp.co/";
      }
    });
    pro_prompt = function() {
      if ($scope.pro === null && localStorage.getItem("pro_prompt") !== "true") {
        return $(document.body).qtip({
          id: "pro_prompt",
          content: {
            text: "Sometimes <i>awesome</i> isn't enough. Get automatic synchronization, beautiful themes, and exclusive widgets. Be a Pro.",
            title: {
              text: "<b>Awesome New Tab Page&trade; Pro</b>",
              button: true
            }
          },
          position: {
            my: "left center",
            at: "right center",
            target: $("#pro-button"),
            viewport: $(window)
          },
          show: {
            event: false,
            ready: true
          },
          style: {
            classes: "qtip-light qtip-bootstrap qtip-shadow"
          },
          hide: true,
          events: {
            hide: function(event, api) {
              localStorage.setItem("pro_prompt", "true");
              return console.log(event);
            }
          }
        });
      }
    };
    init = function(response) {
      var conflicts, unresolvedError;
      if (localStorage.getItem("pro_initialized") === "false") {
        if (response.data === "") {
          $("#pro-window").show();
          qTipAlert("You're a Pro.", "You have successfully connected the extension to your Pro account. Thanks for supporting the extension! You're awesome.", "Let's get started!");
          localStorage.setItem("pro_initialized", "true");
          return save();
        } else {
          $("#pro-window").show();
          return qTipConfirm("You're a Pro. Thanks for supporting the extension! You're awesome.", "You have successfully connected the extension to your Pro account. However, your account already contains some data. " + " Do you want to keep your local settings or your remote settings?", "Keep Local, Replace Remote", "Keep Remote, Replace Local", function(selection) {
            localStorage.setItem("pro_initialized", "true");
            if (selection === true) {
              return save();
            } else {
              return update_success(response);
            }
          });
        }
      } else {
        unresolvedError = localStorage.getItem("pro_unresolvedError") === "true" ? true : false;
        conflicts = localStorage.getItem("pro_lastUpdated") !== response.updated ? true : false;
        if (unresolvedError && conflicts) {
          return qTipConfirm("Pro Error", "Your previous changes failed to synchronize, and there are now conflicts between your computer and the server." + " Do you want to keep your local settings or your remote settings?", "Keep Local, Replace Remote", "Keep Remote, Replace Local", function(selection) {
            localStorage.setItem("pro_unresolvedError", "false");
            $scope.unresolvedError = false;
            if (selection === true) {
              return save();
            } else {
              return update_success(response);
            }
          });
        } else {
          return update_success(response);
        }
      }
    };
    update_success = function(response) {
      var conflicts;
      conflicts = localStorage.getItem("pro_lastUpdated") !== response.updated ? true : false;
      if (conflicts) {
        return storage.set(JSON.parse(Base64.decode(response.data)), function() {
          return $(window).trigger("antp-widgets");
        });
      }
    };
    save = function() {
      return storage.get(["tiles", "settings"], function(storage_data) {
        var data;
        data = {
          tiles: storage_data.tiles,
          settings: storage_data.settings_raw,
          sync_version: 1
        };
        data = Base64.encode(JSON.stringify(data));
        return $.ajax("https://pro.antp.co/pro_storage", {
          data: JSON.stringify({
            pro: $scope.pro,
            data: data
          }),
          contentType: "application/json",
          type: "POST",
          success: function(response) {
            if (response.isPro === false) {
              localStorage.setItem("pro_expired", "true");
              $scope.expired = true;
              $("#pro-button").addClass("error");
            }
            if (response.success) {
              localStorage.setItem("pro_unresolvedError", "false");
              $scope.unresolvedError = false;
              $scope.pro_storage = data;
              localStorage.setItem("pro_lastUpdated", response.updated);
            } else {
              $("#pro-button").addClass("error");
              localStorage.setItem("pro_unresolvedError", "true");
              $scope.unresolvedError = true;
              $.jGrowl(response.error, {
                header: "Pro Error"
              });
            }
            return $scope.$apply();
          },
          error: function(xhr, status, error) {
            $("#pro-button").addClass("error");
            localStorage.setItem("pro_unresolvedError", "true");
            $scope.unresolvedError = true;
            localStorage.setItem("pro_lastUpdated", Date.now());
            $.jGrowl("There was an error (Error: " + error + ") saving your changes. You can retry synchronizing by clicking the star in the top left.", {
              header: "Pro Error"
            });
            throw new Error(error);
          }
        });
      });
    };
    $scope.save = save;
    handle_changes = function(changes, areaName) {
      if (areaName === "local") {
        if (!(changes.tiles || changes.settings)) {
          return;
        }
        if ($scope.pro && !$scope.expired) {
          return save();
        }
      }
    };
    chrome.storage.onChanged.addListener(handle_changes);
    $(window).bind("storage", function(e) {
      if (e.originalEvent.key === "pro" || e.originalEvent.key === "pro_expired") {
        return update();
      }
    });
    pro_theme = function(e) {
      if ($scope.pro && !$scope.expired) {
        if (e) {
          if (localStorage.getItem("pro_theme") !== "glass") {
            localStorage.setItem("pro_theme", "glass");
          } else {
            localStorage.setItem("pro_theme", "");
          }
        }
        if (localStorage.getItem("pro_theme") === "glass") {
          $("#proGlass").prop("checked", true);
          return $("body").addClass("pro-glass");
        } else {
          return $("body").removeClass("pro-glass");
        }
      }
    };
    $(document).on("change", "#proGlass", pro_theme);
    $(window).bind("storage", function(e) {
      if (e.originalEvent.key === "pro_theme") {
        return pro_theme();
      }
    });
    $(function() {
      return pro_theme();
    });
    $scope.clear_expired = function() {
      localStorage.removeItem("pro_expired");
      return update();
    };
    return $scope.unlink = function() {
      localStorage.removeItem("pro");
      localStorage.removeItem("pro_expired");
      update();
      return updateStorage();
    };
  };

  window._gaq = window._gaq || [];

  window._gaq.push(["_setAccount", "UA-26076327-1"]);

  window._gaq.push(["_trackPageview"]);

  window._gaq.push(['_trackEvent', 'Version', chrome.app.getDetails().version]);

  (function() {
    var ga, s;
    ga = document.createElement("script");
    ga.type = "text/javascript";
    ga.async = true;
    ga.src = "https://ssl.google-analytics.com/ga.js";
    s = document.getElementsByTagName("script")[0];
    return s.parentNode.insertBefore(ga, s);
  })();

}).call(this);
