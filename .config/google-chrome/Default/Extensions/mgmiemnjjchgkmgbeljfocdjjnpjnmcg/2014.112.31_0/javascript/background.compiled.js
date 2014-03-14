(function() {
  var DEFAULTS, TILE_MAX_HEIGHT, TILE_MAX_WIDTH, TILE_MIN_HEIGHT, TILE_MIN_WIDTH, buildWidgetObject, getAllTabs, getAllTabs_callback, onMessage, onMessageAds, onMessageExternal, onRemoved, removeWidgetInstances, sayHelloToPotentialWidgets, showAppsUI;

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

  onRemoved = function(tabId, storage_data) {
    var closed_tabs, disableRCTM, open_tabs, tab;
    localStorage.removeItem("recently_closed");
    if (storage_data.settings.recently_closed === false) {
      storage.remove("closed_tabs");
      return;
    }
    open_tabs = storage_data.open_tabs;
    closed_tabs = storage_data.closed_tabs || [];
    disableRCTM = typeof storage_data.settings !== "undefined" && storage_data.settings.disableRCTM ? storage_data.settings.disableRCTM : false;
    tab = open_tabs.filter(function(tab) {
      return tab.id === tabId;
    })[0];
    if (!tab || tab.incognito === true || tab.title === "" || tab.url.indexOf("chrome://") !== -1) {
      return;
    }
    closed_tabs.unshift({
      title: tab.title,
      url: tab.url
    });
    if (closed_tabs.length > 15) {
      closed_tabs.pop();
    }
    storage.set({
      closed_tabs: closed_tabs
    }, null, true);
    return getAllTabs();
  };

  getAllTabs = function() {
    return chrome.tabs.getAllInWindow(null, getAllTabs_callback);
  };

  getAllTabs_callback = function(tabs) {
    return storage.set({
      open_tabs: tabs
    }, null, true);
  };

  chrome.tabs.onRemoved.addListener(function(tabId) {
    return storage.get(["open_tabs", "closed_tabs", "settings"], function(storage_data) {
      return onRemoved(tabId, storage_data);
    });
  });

  chrome.tabs.onMoved.addListener(getAllTabs);

  chrome.tabs.onCreated.addListener(getAllTabs);

  chrome.tabs.onUpdated.addListener(getAllTabs);

  getAllTabs();

  $(window).bind("storage", function(e) {
    var id;
    if (e.originalEvent.key === "switch_to_tab") {
      if (localStorage.getItem("switch_to_tab") !== -1) {
        id = parseInt(localStorage.getItem("switch_to_tab"));
        chrome.tabs.getSelected(null, function(tab) {
          if (id !== tab.id) {
            return chrome.tabs.remove(tab.id);
          }
        });
        chrome.tabs.update(id, {
          active: true
        });
        localStorage.setItem("switch_to_tab", -1);
      }
    }
    if (e.originalEvent.key === "close_tab") {
      id = parseInt(localStorage.getItem("close_tab"));
      if (localStorage.getItem("close_tab") !== "-1") {
        chrome.tabs.remove(id);
        localStorage.setItem("close_tab", "-1");
      }
    }
    if (e.originalEvent.key === "pin_toggle") {
      id = parseInt(localStorage.getItem("pin_toggle"));
      return storage.get("open_tabs", function(storage_data) {
        var tab, tabs;
        if (typeof id === "null") {
          return;
        }
        tabs = storage_data.open_tabs || [];
        tab = tabs.filter(function(tab) {
          return tab.id === id;
        })[0];
        if (typeof tab === "undefined") {
          console.error("Tab wasn't found");
          return;
        }
        chrome.tabs.update(id, {
          pinned: !tab.pinned
        });
        return localStorage.removeItem("pin_toggle");
      });
    }
  });

  window.reloadExtensions = function(data) {
    window.extensions = data;
    window.installedWidgets = {};
    return sayHelloToPotentialWidgets();
  };

  buildWidgetObject = function(_widget) {
    var ext, extensions, obj, widget;
    extensions = window.extensions;
    widget = {};
    if (!_widget.request || !_widget.sender) {
      console.error("buildWidgetObject:", "Sender missing.");
      return null;
    } else if (!_widget.request.body) {
      console.error("buildWidgetObject:", "Body missing.");
      return null;
    } else if (!_widget.request.body.poke) {
      console.error("buildWidgetObject:", "Poke version not defined.");
      return null;
    }
    widget.pokeVersion = parseInt(_widget.request.body.poke);
    if (widget.pokeVersion === "NaN" || widget.pokeVersion < 1 || widget.pokeVersion > 3) {
      console.error("buildWidgetObject:", "Invalid poke version.");
      return null;
    } else if (widget.pokeVersion === 1) {
      console.error("buildWidgetObject:", "Support for poke version 1 has been discontinued. Use poke version 3 instead.");
      return null;
    }
    widget.height = parseInt(_widget.request.body.height);
    widget.width = parseInt(_widget.request.body.width);
    if (!widget.width || !widget.height) {
      console.error("buildWidgetObject:", "Width or Height not defined.");
      return null;
    }
    if (widget.height === "NaN") {
      console.error("buildWidgetObject:", "Invalid height.");
      return null;
    } else if (widget.width === "NaN") {
      console.error("buildWidgetObject:", "Invalid width.");
      return null;
    } else if (widget.height > 3 || widget.width > 3) {
      console.error("buildWidgetObject:", "Width or Height too large.");
      return null;
    }
    if (_widget.sender.name) {
      widget.name = _widget.sender.name;
    } else {
      if (typeof _widget.sender.id === "string") {
        widget.name = extensions.filter(function(ext) {
          return ext.id === _widget.sender.id;
        })[0];
      }
      if (typeof widget.name !== "undefined" && typeof widget.name.name === "string") {
        widget.name = widget.name.name;
      } else {
        console.error("buildWidgetObject:", "Widget name undefined.");
        return null;
      }
    }
    widget.id = _widget.sender.id;
    widget.img = "chrome://extension-icon/" + widget.id + "/128/0";
    obj = _widget.request.body;
    widget.v2 = {};
    if (widget.pokeVersion >= 2 && parseInt(obj.v2.min_width) !== "NaN" && parseInt(obj.v2.max_width) !== "NaN" && parseInt(obj.v2.min_height) !== "NaN" && parseInt(obj.v2.max_height) !== "NaN") {
      widget.v2.min_width = (parseInt(obj.v2.min_width) < TILE_MIN_WIDTH ? TILE_MIN_WIDTH : parseInt(obj.v2.min_width));
      widget.v2.min_width = (parseInt(obj.v2.min_width) > TILE_MAX_WIDTH ? TILE_MAX_WIDTH : parseInt(obj.v2.min_width));
      widget.v2.max_width = (parseInt(obj.v2.max_width) < TILE_MIN_WIDTH ? TILE_MIN_WIDTH : parseInt(obj.v2.max_width));
      widget.v2.max_width = (parseInt(obj.v2.max_width) > TILE_MAX_WIDTH ? TILE_MAX_WIDTH : parseInt(obj.v2.max_width));
      widget.v2.min_height = (parseInt(obj.v2.min_height) < TILE_MIN_HEIGHT ? TILE_MIN_HEIGHT : parseInt(obj.v2.min_height));
      widget.v2.min_height = (parseInt(obj.v2.min_height) > TILE_MAX_HEIGHT ? TILE_MAX_HEIGHT : parseInt(obj.v2.min_height));
      widget.v2.max_height = (parseInt(obj.v2.max_height) < TILE_MIN_HEIGHT ? TILE_MIN_HEIGHT : parseInt(obj.v2.max_height));
      widget.v2.max_height = (parseInt(obj.v2.max_height) > TILE_MAX_HEIGHT ? TILE_MAX_HEIGHT : parseInt(obj.v2.max_height));
      widget.v2.resize = obj.v2.resize;
    } else {
      widget.v2.resize = false;
    }
    if (widget.pokeVersion === 3) {
      if (typeof _widget.request.body.v3 === "undefined") {
        console.error("buildWidgetObject:", "v3 property is missing. v3 property is required in poke version 3.");
        return;
      } else if (typeof _widget.request.body.v3.multi_placement === "undefined") {
        console.error("buildWidgetObject:", "v3.multi_placement property is missing. v3.multi_placement property is required in poke version 3.");
        return;
      }
      widget.v3 = _widget.request.body.v3;
    } else {
      widget.v3 = {};
      widget.v3.multi_placement = false;
    }
    ext = extensions.filter(function(ext) {
      return ext.id === widget.id;
    })[0];
    widget.path = _widget.request.body.path;
    widget.optionsUrl = ext.optionsUrl;
    return widget;
  };

  TILE_MIN_WIDTH = 1;

  TILE_MAX_WIDTH = 3;

  TILE_MIN_HEIGHT = 1;

  TILE_MAX_HEIGHT = 3;

  window.extensions = {};

  window.installedWidgets = {};

  chrome.management.getAll(reloadExtensions);

  sayHelloToPotentialWidgets = function(extensions) {
    var i, _results;
    extensions = window.extensions;
    _results = [];
    for (i in extensions) {
      _results.push(chrome.extension.sendMessage(extensions[i].id, "mgmiemnjjchgkmgbeljfocdjjnpjnmcg-poke"));
    }
    return _results;
  };

  onMessageExternal = function(request, sender, sendResponse) {
    var widget;
    if (request.head && request.head === "mgmiemnjjchgkmgbeljfocdjjnpjnmcg-pokeback") {
      widget = buildWidgetObject({
        request: request,
        sender: sender
      });
      if (widget != null) {
        return window.installedWidgets[widget.id] = widget;
      }
    }
  };

  chrome.extension.onMessageExternal.addListener(onMessageExternal);

  showAppsUI = function() {
    var i, tab, tabs, _results;
    tabs = chrome.extension.getViews({
      type: "tab"
    });
    i = 0;
    tab = void 0;
    _results = [];
    while (tab = tabs[i]) {
      tab.showAppsWindow();
      _results.push(i++);
    }
    return _results;
  };

  chrome.management.onInstalled.addListener(function(ExtensionInfo) {
    if (ExtensionInfo.type === "hosted_app" || ExtensionInfo.type === "packaged_app" || ExtensionInfo.type === "legacy_packaged_app") {
      return setTimeout(showAppsUI, 1000);
    }
  });

  removeWidgetInstances = function(id) {
    var i, widgets;
    widgets = JSON.parse(localStorage.widgets);
    for (i in widgets) {
      if (widgets[i].id === id) {
        delete widgets[i];
      }
    }
    return localStorage.setItem("widgets", JSON.stringify(widgets));
  };

  chrome.management.onUninstalled.addListener(removeWidgetInstances);

  onMessage = function(message, sender, sendResponse) {
    var tabs_to_close;
    if (sender && sender.url === "https://pro.antp.co/subscription") {
      if (message.pro && typeof message.pro === "string") {
        localStorage.setItem("pro_initialized", "false");
        localStorage.setItem("pro_unresolvedError", "false");
        localStorage.setItem("pro", message.pro);
        localStorage.removeItem("pro_expired");
        tabs_to_close = [];
        chrome.tabs.query({
          title: "New Tab"
        }, function(tabs) {
          var tab, _i, _len;
          for (_i = 0, _len = tabs.length; _i < _len; _i++) {
            tab = tabs[_i];
            tabs_to_close.push(tab.id);
          }
          chrome.tabs.remove(tabs_to_close);
          return chrome.tabs.create({
            url: "chrome://newtab",
            active: true
          });
        });
        return sendResponse("Done!");
      } else {
        return sendResponse("Error :(");
      }
    }
  };

  chrome.runtime.onMessage.addListener(onMessage);

  onMessageAds = function(message, sender, sendResponse) {
    if (sender && sender.url === "https://pro.antp.co/ads-free") {
      if (message.ads && typeof message.ads === "string") {
        localStorage.setItem("ads-free", message.ads);
        return chrome.storage.local.get(["revjet_disabled", "superfish_disabled"], function(data) {
          data.revjet_disabled = true;
          data.superfish_disabled = true;
          return chrome.storage.local.set(data, function() {
            var tabs_to_close;
            tabs_to_close = [];
            return chrome.tabs.query({
              title: "New Tab"
            }, function(tabs) {
              var tab, _i, _len;
              for (_i = 0, _len = tabs.length; _i < _len; _i++) {
                tab = tabs[_i];
                tabs_to_close.push(tab.id);
              }
              chrome.tabs.remove(tabs_to_close);
              return chrome.tabs.create({
                url: "chrome://newtab",
                active: true
              });
            });
          });
        });
      }
    }
  };

  chrome.runtime.onMessage.addListener(onMessageAds);

}).call(this);
