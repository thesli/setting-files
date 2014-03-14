/*
  Awesome New Tab Page
  Copyright 2011-2013 Awesome HQ, LLC & Michael Hart
  All rights reserved.
  http://antp.co http://awesomehq.com
*/

var
  ajs = angular.module('antp', []);

ajs.config([
  '$compileProvider',
  function ($compileProvider) {
    $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
  }
]);

/* START :: i18n */

  // Usage: {{ "message_id" | i18n }}
  // Notes: Does NOT support HTML
  ajs.filter('i18n', function() {
    return function(messageId) {
      if (chrome.i18n)
        return chrome.i18n.getMessage(messageId);
      else if (parent.chrome.i18n)
        return parent.chrome.i18n.getMessage(messageId);
    };
  });

  // Usage: <i18n message-id="message_id" />
  // Notes: Supports HTML
  ajs.directive('i18n', function() {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        if (chrome.i18n)
          element.html( chrome.i18n.getMessage(attrs.messageId) );
        else if (parent.chrome.i18n)
          element.html( parent.chrome.i18n.getMessage(attrs.messageId) );
      }
    }
  });

  /* END :: i18n */

/* START :: Widgets/Apps/Custom Shortcuts */

  function tileCtrl($scope) {

    $scope.widgets = [];
    $scope.apps = {};
    $scope.custom_shortcuts = {};


    $scope.update = function(storage_data) {
      var tiles = storage_data.tiles;

      // Load previous settings or
      if (!tiles) {
        if (localStorage.getItem("widgets")) {
          tiles = JSON.parse(localStorage.getItem("widgets") || localStorage.getItem("old_widgets"))
        } else {
          tiles = stock_widgets;
        }

        storage.set({
          tiles: tiles
        }, function() {
          $(window).trigger("antp-widgets")
        });

        return;
      };

      $scope.widgets = [];
      $scope.apps = {};
      $scope.custom_shortcuts = {};

      angular.forEach(tiles, function(tile, id) {
        if ( tile.isApp === true )
          tile.type = "app";

        if ( tile.appLaunchUrl && tile.appLaunchUrl === "http://www.amazon.com/?tag=sntp-20" ) {
          return true;
        }


        tile.ext = tile.id = id;

        if ( tiles[tile.id].optionsUrl ) {
          tile.optionsUrl = tiles[tile.id].optionsUrl;
        }

        /* Start :: CSS */

          tile.css = {};
          tile.css.height = ( tile.size[0] * GRID_TILE_SIZE ) + ( ( tile.size[0] - 1 ) * ( GRID_TILE_PADDING * 2 ) );
          tile.css.width  = ( tile.size[1] * GRID_TILE_SIZE ) + ( ( tile.size[1] - 1 ) * ( GRID_TILE_PADDING * 2 ) );
          tile.css.top    = tile.where[0] * ( GRID_TILE_SIZE + ( GRID_TILE_PADDING * 2 ) ) + ( GRID_TILE_PADDING * 2 );
          tile.css.left   = tile.where[1] * ( GRID_TILE_SIZE + ( GRID_TILE_PADDING * 2 ) ) + ( GRID_TILE_PADDING * 2 );

          if ( parseInt(storage_data.settings.grid_height) % 1 === 0 ) {
            if ( (parseInt(tile.where[0]) + parseInt(tile.size[0])) > parseInt(storage_data.settings.grid_height) )
              return;
          }

          if ( parseInt(storage_data.settings.grid_width) % 1 === 0 ) {
            if ( (parseInt(tile.where[1]) + parseInt(tile.size[1])) > parseInt(storage_data.settings.grid_width) )
              return;
          }

          if ( tile.type === "app" || tile.type === "shortcut" ) {
            if ( tile.shortcut_background_transparent === true ) {
              tile.css.bg = "background-image: url("+tile.img+"); background-color: transparent;";
            } else {
              tile.css.bg = "background-image: url("+tile.img+"), -webkit-gradient(linear, 100% 100%, 0% 0%, to(rgba(255, 255, 255, 0.04)), from(rgba(255, 255, 255, 0.35))); background-color: "+tile.color+";";
            }
          }

          if ( tile.img && (tile.type === "app" || tile.type === "shortcut") ) {
            tile.css.bgimg = "background-image: url("+tile.img+")";
          }

          /* END :: CSS */

        // Defaults
        if ( tile.favicon_show === undefined ) {
          tile.favicon_show = true;
        }
        if ( tile.name_show === undefined ) {
          tile.name_show = true;
        }

        // Fixed list app urls with  their search urls
        var fixedSearchURLs = {
          "http://www.youtube.com/"                       : "http://www.youtube.com/results?search_query={input}",
          "http://www.facebook.com/"                      : "http://www.facebook.com/search/?q={input}",
          "http://www.twitter.com/"                       : "http://twitter.com/search?q={input}&src=typd",
          "http://plus.google.com/"                       : "http://plus.google.com/s/{input}",
          "http://www.google.com/webhp?source=search_app" : "http://www.google.com/search?source=search_app&q={input}",
          "https://chrome.google.com/webstore?utm_source=webstore-app&utm_medium=awesome-new-tab-page" : "https://chrome.google.com/webstore/search/{input}"
        };

        switch ( tile.type ) {
          case "iframe":
            if ( tile.instance_id ) {
              tile.hash = "#" + encodeURIComponent(JSON.stringify({id: tile.instance_id, pro: isPro()}));
            } else {
              tile.hash = "";
            }
            $scope.widgets.push(tile);
            break;
          case "app":
            tile.resize = true;
            if (fixedSearchURLs[tile.appLaunchUrl]) {
              tile.searchUrl = fixedSearchURLs[tile.appLaunchUrl];
              tile.searchEnabled = true;
            }

            $scope.apps[id] = tile;
            break;
          case "shortcut":
            tile.resize = true;
            if (tile.searchUrl && tile.searchUrl.indexOf("{input}") != -1) {
              tile.searchEnabled = true;
            }
            $scope.custom_shortcuts[id] = tile;
            break;
        }
      });

      setTimeout(function(){
        var tiles = $("#grid-holder > .tile");
        $("#grid-holder > .tile").addClass("empty");
        $("#widget-holder > div").each(function(ind, elem){
          var tiles = getCovered(this);
          $(tiles.tiles).each(function(ind, elem){
            $(elem).removeClass("empty");
          });
        });
      }, 250);


      $scope.$apply();
    }; // End of $scope.update()

    storage.get("tiles", $scope.update);

    // May be necessary since onChanged runs on-same-page, which could be bad for rapid-firing
    // events, like changing tile or background colors
    $(window).bind("antp-widgets", function () {
      storage.get("tiles", $scope.update);
    });
  }

  /* END :: Widgets/Apps/Custom Shortcuts */

/* START :: Apps/Widgets Window */

  function windowAppsWidgetsCtrl($scope) {

    $scope.stock_apps = []
    $scope.stock_widgets = {};

    $scope.apps = [];
    $scope.widgets = {};

    var timeoutId = null;

    $scope.update = function() {
      clearTimeout(timeoutId);  // to prevent multiple running of $scope.update function

      $scope.isPro = isPro;

      // Refresh widgets
      chrome.runtime.getBackgroundPage(function(bp) {
        chrome.management.getAll( bp.reloadExtensions );

        // Refresh apps
        chrome.management.getAll(function(all){
          $scope.apps = [];
          angular.forEach(all, function(extension, id){
            if ( extension.isApp === true && extension.enabled === true ) {
              extension.img = "chrome://extension-icon/"+extension.id+"/128/0";
              $scope.apps.push(extension);
            }
          });
        });

        setTimeout(function() {
          $scope.apps.sort(function(a, b){
            var
              nameA=a.name.toLowerCase(),
              nameB=b.name.toLowerCase();
            if (nameA < nameB)
              return -1;
            if (nameA > nameB)
              return 1;
            return 0
          });
          $scope.apps = $scope.apps.concat($scope.stock_apps);
          $scope.widgets = Object.merge(bp.installedWidgets, $scope.stock_widgets);

          // $scope.appsCount = $scope.apps.length;
          // $scope.widgetsCount = Object.keys( bp.installedWidgets ).length;

          // Update every 30 seconds
          timeoutId = setTimeout($scope.update, 30000);

          $scope.$apply();
          disableUrls();

        }, 1000);
      });
    };

    $(document).on("click", "#app-drawer-button,#widget-drawer-button", function() {
      timeoutId = setTimeout($scope.update, 1);
    });

    $scope.updateBuffer = function() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout($scope.update, 1000);
    };

    chrome.management.onEnabled.addListener( $scope.updateBuffer );
    chrome.management.onInstalled.addListener( $scope.updateBuffer );
    chrome.management.onDisabled.addListener( $scope.updateBuffer );
    chrome.management.onUninstalled.addListener( $scope.updateBuffer );

    // Save $scope.stock_widgets and $scope.stock_apps
    setTimeout(function() {
      var stockWidgets = {};
      angular.forEach(stock_widgets, function(widget, id) {
        if ( widget.type !== "shortcut" && widget.type !== "app" ) {
          widget.height = widget.size[0];
          widget.width = widget.size[1];
          if ( !widget.poke ) {
            widget.poke = 1;
            widget.v2 = {};
            widget.v2.resize = false;

            widget.v3 = {};
            widget.v3.multi_placement = false;
          } else if ( widget.poke === 2 ) {
            widget.v3 = {};
            widget.v3.multi_placement = false;
          }
          widget.pokeVersion = widget.poke;

          widget.img = "icon128.png";
          widget.id = chrome.extension.getURL("").substr(19, 32);

          widget.stock = true;

          // Starts with z so that they're always displayed last
          stockWidgets["zStock_" + id] = widget;
        } else if ( widget.isApp === true
          && widget.type === "app" ) {
          widget.mayDisable = false;
          $scope.stock_apps.push(widget);
        }
        $scope.stock_widgets = stockWidgets;
      });
    }, 900);

  }

  /* END :: Apps/Widgets Window */

/* START :: Tile Editor */

  function windowTileEditorCtrl($scope) {

    $scope.safeApply = function(fn) {
      var phase = this.$root.$$phase;
      if(phase == '$apply' || phase == '$digest') {
        if(fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };

    $scope.widgets = {};

    $scope.update = function (a, b) {
      // save all the things, put all the things into the tile.
      var id = $(".ui-2#editor").attr("active-edit-id");
      $scope[a] = $scope.widgets[id][a] = b;

      if (a == "shortcut_pin" && b == true)
        $scope.shortcut_newtab = false;
      if (a == "shortcut_newtab" && b == true)
        $scope.shortcut_pin = false;

      switch (a) {
        case "appLaunchUrl":
          $scope.favicon = "chrome://favicon/" + $scope.widgets[id].appLaunchUrl;
          $scope.widgets[id].url = $scope.widgets[id].appLaunchUrl;
          $("#widget-holder #"+id+" a").attr("data-url", $scope.appLaunchUrl).attr("href", $scope.appLaunchUrl);
          $("#widget-holder #"+id+" .app-favicon").attr("src", $scope.favicon);
          break;
        case "shortcut_pin": case "shortcut_newtab":
          $scope.widgets[id].onleftclick = "";
          if ( $scope.shortcut_pin === true ) {
            $scope.widgets[id].onleftclick = "pin";
          }
          if ( $scope.shortcut_newtab === true ) {
            $scope.widgets[id].onleftclick = "newtab";
          }
          $scope.onleftclick = $scope.widgets[id].onleftclick;
          $("#widget-holder #"+id+" .url").attr("onleftclick", $scope.widgets[id].onleftclick);
          break;
        case "searchUrl":
          $scope.widgets[id].searchEnabled = ($scope.shortcut_search_url !== "");
          $("#widget-holder #"+id+" .search-box").attr("data-search", $scope.shortcut_search_url);
          break;
        case "shortcut_background_transparent":
        case "backgroundimage":
        case "backgroundcolor":
        case "img":
          if ($scope.shortcut_background_transparent === true) {
            $scope.backgroundimage = "url("+$scope.widgets[id].img+")";
            $scope.backgroundcolor = "transparent";
            $scope.widgets[id].shortcut_background_transparent = true;
          } else {
            $scope.backgroundimage = "url("+$scope.widgets[id].img+")" + gradient;
            $scope.widgets[id].color = $scope.color;
            $scope.backgroundcolor = $scope.widgets[id].color;
            $scope.widgets[id].shortcut_background_transparent = false;
          }
          $(".ui-2#editor #invisible-tile-img").attr("src", $scope.widgets[id].img);
          $("#widget-holder #"+id + ", #preview-tile").css("background-image", $scope.backgroundimage).css("background-color", $scope.backgroundcolor);
          IconResizing.previewTileUpdated();
          break;
        case "name":
        case "name_show":
          $("#widget-holder #"+id+" .app-name").html($scope.name).css("opacity", +$scope.name_show);
          break;
        case "favicon_show":
          $("#widget-holder #"+id+" .app-favicon").css("opacity", +$scope.favicon_show);
          break;
      }

      storage.set({tiles: $scope.widgets});
      $scope.safeApply();
    };

    $scope.edit = function(id, storage_data) {

      var widgets = storage_data.tiles;
      $scope.widgets = storage_data.tiles;

      var tile = widgets[id];

      var this_extension = extensions.filter(function (ext) { return ext.id === id })[0];
      var is_app = (typeof(this_extension) !== "undefined" && typeof(this_extension.isApp) === "boolean");
      var is_shortcut = (tile.type && tile.type === "shortcut");


      var editor_type;
      if ( is_shortcut ) {
        editor_type = "shortcut";
        $(".ui-2#editor").addClass("type-shortcut").removeClass("type-app");
      } else {
        editor_type = "app";
        $(".ui-2#editor").addClass("type-app").removeClass("type-shortcut");
      }

      $("body > .ui-2").hide();

      $(".ui-2#editor")
        .show()
        .attr("active-edit-id", id)
        .attr("active-edit-type", editor_type);

      var stock_app = false;
      if ( $.inArray(id, ["webstore", "facebook", "twitter"]) !== -1 ) {
        tile.img = stock_widgets[id].simg;
        stock_app = true;
      }

      if ( is_shortcut ) {
        $scope.favicon = "chrome://favicon/" + tile.appLaunchUrl;
        if ( tile.favicon_show !== false ) {
          $scope.favicon_show = true;
        } else {
          $scope.favicon_show = false;
        }
        $scope.searchUrl = tile.searchUrl;
      } else {
        $scope.searchUrl = "";
        $scope.favicon_show = false;
      }

      if ( tile.name_show === undefined ) {
        tile.name_show = true;
      }

      $scope.name = tile.name;
      $scope.name_show = tile.name_show;
      $scope.shortcut_pin = (tile.onleftclick === "pin");
      $scope.shortcut_newtab = (tile.onleftclick === "newtab");
      $scope.onleftclick = tile.onleftclick;
      $scope.url = tile.appLaunchUrl;
      $scope.appLaunchUrl = tile.appLaunchUrl;
      $scope.searchUrl = tile.searchUrl;
      $scope.shortcut_background_transparent = tile.shortcut_background_transparent;
      $scope.img = tile.img;
      $scope.color = tile.color; // to preserve the actual color
      $scope.backgroundcolor = tile.color; // to hold color/transparent

      if($scope.shortcut_background_transparent === true) {
        $scope.backgroundimage = "url("+tile.img+")";
        $scope.backgroundcolor = "transparent";
      } else {
        $scope.backgroundimage = "url("+tile.img+")" + gradient;
        $scope.backgroundcolor = tile.color;
        $scope.color = tile.color;
      }

      $scope.safeApply();

      requiredColorPicker(function() {
        var rgb = [];
        rgb = (widgets[$(".ui-2#editor").attr("active-edit-id")].color).match(/(rgba?)|(\d+(\.\d+)?%?)|(\.\d+)/g);

        $(".ui-2#editor #shortcut_colorpicker").ColorPicker({
          color: ( ({ r: rgb[1], g: rgb[2], b: rgb[3] }) || "#309492") ,
          onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            rgb = (widgets[$(".ui-2#editor").attr("active-edit-id")].color).match(/(rgba?)|(\d+(\.\d+)?%?)|(\.\d+)/g);
            color: ( ({ r: rgb[1], g: rgb[2], b: rgb[3] }) || "#309492")
            return false;
          },
          onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
          },
          onChange: function (hsb, hex, rgb) {
            $scope.backgroundcolor = "rgba("+rgb.r+","+rgb.g+","+rgb.b+", 1)";
            $scope.shortcut_background_transparent = false;
            $scope.color = $scope.backgroundcolor;
            $scope.update("backgroundcolor", $scope.color);
          }
        });
        $(".ui-2#editor #shortcut_colorpicker").ColorPickerSetColor( ({ r: rgb[1], g: rgb[2], b: rgb[3] }) );
      });

      $("#swatches").html("").hide();
      if ( is_app === true && stock_app === false ) {
        var image = tile.img,
          medianPalette = createPalette(
          $("<img />").attr({
            "src": image,
            "id" : "temporary-element-to-delete"
          }).css({
            "display": "none"
          }).appendTo("body")
        , 5);
        $.each(medianPalette, function(index, value) {
          var swatchEl = $('<div>')
          .css("background-color","rgba(" +value[0]+ "," +value[1]+  "," +value[2]+ ", 1)")
          .data({
            "r": value[0],
            "g": value[1],
            "b": value[2]
          }).addClass("swatch");
          $("#swatches").append(swatchEl).show();
        });

        $("#temporary-element-to-delete").remove();
      }
      $(".ui-2#editor #invisible-tile-img").attr("src", tile.img);
      if (tile.backgroundSize) {
        $("#widget-holder #"+id + ", #preview-tile").css("background-size", tile.backgroundSize);
        IconResizing.previewTileUpdated(IconResizing.updateSlider);
      }
      IconResizing.previewTileUpdated();
    };

    $scope.setswatch = function(e) {
      var $target = $(e.target.outerHTML);
      storage.get("tiles", function(storage_data) {
        var id = $(".ui-2#editor").attr("active-edit-id");
        var widgets = storage_data.tiles;

        var rgb = $target.css("background-color").match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        var r = rgb[1];
        var g = rgb[2];
        var b = rgb[3];
        $scope.backgroundcolor = "rgb(" + r + ", " + g + ", " + b + ")";
        $scope.color = $scope.backgroundcolor;
        $scope.shortcut_background_transparent = false;
        $scope.update("backgroundcolor", $scope.color);
      });
    }

    $(document).on("click", "#shortcut-edit", function() {
      var id = $(this).parent().parent().attr("id");
      storage.get("tiles", function(storage_data) {
        $scope.edit(id, storage_data);
      });
    });
  }

  ajs.directive('ngTileEditor', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function($scope, elm, attr, ngModelCtrl) {

        var bind_method;
        if (attr.type === 'radio' || attr.type === 'checkbox') {
          bind_method = "click";
        } else {
          bind_method = "change keyup keydown keypress";
        }
        elm.bind(bind_method, function(event) {
          var value = elm.val();
          $scope.$apply(function() {
            // i have to set up special cases, because some checkboxes use values AND checked booleans
            // if checked, use value.
            if (attr.name === "shortcut_pin" || attr.name === "shortcut_newtab") {
              value = $("#" + attr.name).is(':checked');

              // uncheck the other box (if checked)
              $("#" + (attr.name == "shortcut_pin" ? "shortcut_newtab" : "shortcut_pin")).removeAttr("checked");
            }

            // checked = true, unchecked = false
            // rather than unchecked = undefined
            if (attr.name === "name_show" || attr.name === "favicon_show" || attr.name === "shortcut_background_transparent") {
              value = $("#" + attr.name).is(':checked');
            }

            ngModelCtrl.$setViewValue(value);
          });
          if ($scope.update) {
            $scope.$parent.update(attr.ngModel.split(".")[2], value);
          } else {
            $scope.$parent.update(attr.ngModel.split(".")[2], value);
          }
        });
      }
    };
  });

  /* END :: Tile Editor */

/* START :: Recently Closed Tabs Menu */

  function RCTMCtrl($scope) {

    $scope.recently_closed = [];

    $scope.clear = function() {
      $scope.recently_closed = [];
      storage.set({open_tabs: []});

      $scope.$apply();
    };

    $scope.removeTab = function(tabToRemove) {
      var index = this.recently_closed.indexOf(tabToRemove);
      this.recently_closed.splice(index, 1);
      storage.set({closed_tabs: this.recently_closed});
    };

    $scope.update = function(storage_data) {
      $scope.recently_closed = storage_data.closed_tabs;
      $scope.$apply();
    };

    $(document).on("click", "#recently-closed-tabs", function() {
      storage.get("closed_tabs", $scope.update);
    });

  }

  /* END :: Recently Closed Tabs Menu */

/* START :: Tabs & Panes Directives */

  ajs.directive('tabs', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function($scope, $element) {
        var panes = $scope.panes = [];

        $scope.select = function(pane) {
          angular.forEach(panes, function(pane) {
            pane.selected = false;
          });
          pane.selected = true;

          if(pane.selected === true && pane.name === chrome.i18n.getMessage("ui_config_bg")) {
            $("#icon-resize-scale-controls").show();
          } else {
            $("#icon-resize-scale-controls").hide();
          }
        }

        this.addPane = function(pane) {
          if (panes.length == 0) $scope.select(pane);
          panes.push(pane);
        }
      },
      template:
        '<div class="tabbable">' +
          '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" class="{{pane.class}}" ng-class="{active:pane.selected}">'+
              '<a href="" ng-click="select(pane)">{{pane.name}}</a>' +
            '</li>' +
          '</ul>' +
          '<div class="tab-content" ng-transclude></div>' +
        '</div>',
      replace: true
    };
  }).
  directive('pane', function() {
    return {
      require: '^tabs',
      restrict: 'E',
      transclude: true,
      scope: { name: '@', class: '@' },
      link: function(scope, element, attrs, tabsCtrl) {
        tabsCtrl.addPane(scope);
      },
      template:
        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
        '</div>',
      replace: true
    };
  });

  /* END :: Tabs & Panes Directives */

/* START :: Checkbox Directive */

  ajs.directive('onoff', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: { name: '@', state: '=', onChange: '&' },
      require: 'state',
      template:
        '<div>' +
          '<div class="onoffswitch">' +
            '<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="{{name}}" ng-model="state" ng-change="onChange({checked:state})">' +
            '<label class="onoffswitch-label" for="{{name}}">' +
              '<div class="onoffswitch-inner">' +
                '<div class="onoffswitch-active"><div class="onoffswitch-switch">' + chrome.i18n.getMessage("ui_config_onoff_on") + '</div></div>' +
                '<div class="onoffswitch-inactive"><div class="onoffswitch-switch">' + chrome.i18n.getMessage("ui_config_onoff_off") + '</div></div>' +
              '</div>' +
            '</label>' +
          '</div>' +
        '</div>',
      replace: true
    };
  });

  /* END :: Checkbox Directive */

/* START :: Backup directive */
  function backupsCtrl($scope) {

    $scope.backups = [];
    $scope.width = null;
    $scope.height = null;

    $scope.safeApply = function(fn) {
      var phase = this.$root.$$phase;
      if(phase == '$apply' || phase == '$digest') {
        if(fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };

    $scope.update = function() {
      var self = this;
      $scope.backups = [];

      function addBackupToList(backup) {
        var keys = backup.keys;
        chrome.storage.sync.getBytesInUse(keys, function(bytesInUse) {
          if (!chrome.runtime.lastError) {
            backup.size = bytesInUse;
            backup.size /= 1024; // convert to KB
            backup.size = backup.size.toFixed(1);
            $scope.backups.push(backup);
          }
        });
      };

      chrome.storage.sync.get(null, function(items) {
        for (var key in items)
        {
          if (key.indexOf("backup_") == 0) {
            var backup = items[key];
            addBackupToList(backup);
          }
        }
        setTimeout(function() {
          $scope.backups.sort(function(a, b) {
            return new Date(a.time) < new Date(b.time);
          });

          chrome.storage.sync.getBytesInUse(null, function(bytes) {
            if (!checkForErrors(chrome.runtime.lastError)) {
              var spaceStr = (bytes / 1024).toFixed(2) + "KB of " + (chrome.storage.sync.QUOTA_BYTES / 1024).toFixed(2) + "KB used";
              $(".list-wrapper .space-stats").text(spaceStr);
            }
          });

          $scope.safeApply.call(self);
        }, 1500);
      });
    };

    function checkForErrors(error) {
      if (error) {
        if (error.message.indexOf("MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE") != -1 || error.message.indexOf("MAX_WRITE_OPERATIONS_PER_HOUR") != -1) {
          qTipAlert(chrome.i18n.getMessage('ui_online_backup_sync_writes_exceeded_title'), chrome.i18n.getMessage('ui_online_backup_sync_writes_exceeded'), chrome.i18n.getMessage("ui_button_ok"));
        } else if (error.message.indexOf("QUOTA_BYTES") != -1 || error.message.indexOf("MAX_ITEMS") != -1) {
          qTipAlert(chrome.i18n.getMessage('ui_online_backup_sync_size_exceeded_title'), chrome.i18n.getMessage('ui_online_backup_sync_size_exceeded'), chrome.i18n.getMessage("ui_button_ok"));
        }
        return true;
      } else {
        return false;
      }
    };

    // break up string into chunks of specified size
    function makeChunks(key, str, chunkSize) {
      var chunkNo = 0,
          currIndex = 0;
          chunks = {};

      chunkSize -= key.length + 10;

      do {
        chunk = str.substr(currIndex, chunkSize);
        if (chunk.length > 0)
          chunks[key+"_chunk"+chunkNo] = chunk;

        currIndex += chunkSize;
        chunkNo++;
      } while(chunk.length > 0);

      return chunks;
    }

    // returns arrray of keys in an object
    function getKeys(obj) {
      var keys = [];
      for(var k in obj)
        keys.push(k);
      return keys;
    }

    function validateBackupName(backupName, callback) {
      if (!backupName || backupName.length <= 0) {
        qTipAlert(chrome.i18n.getMessage('ui_online_backup_invalid_backup_name_title'), chrome.i18n.getMessage('ui_online_backup_invalid_backup_name'), chrome.i18n.getMessage("ui_button_ok"));
        callback(false);
      } else {
        backupName = "backup_" + backupName;
        chrome.storage.sync.get(backupName, function(data) {
          if (!checkForErrors(chrome.runtime.lastError)) {
            if (data && data[backupName]) {
              qTipAlert(chrome.i18n.getMessage('ui_online_backup_backup_already_exist_title'), chrome.i18n.getMessage('ui_online_backup_backup_already_exist'), chrome.i18n.getMessage("ui_button_ok"));
              callback(false);
            } else {
              callback(true);
            }
          }
        });
      }
    }

    $scope.saveBackup = function(backupName) {
      validateBackupName(backupName, function(valid) {
        if (valid) {
          buildExportString(function(exportString) {
            var chunks = makeChunks(backupName, exportString, chrome.storage.sync.QUOTA_BYTES_PER_ITEM);
            var keys = getKeys(chunks); // array of chunk keys

            var backupKey = "backup_" + backupName;
            chunks[backupKey] = {
              "name": backupName,
              "keys": keys,
              "time": (new Date()).toJSON()
            };

            chrome.storage.sync.set(chunks, function() {
              checkForErrors(chrome.runtime.lastError);
            });
          });
        }
      });
    };

    $scope.removeBackup = function(name) {
      name = "backup_" + name;
      qTipConfirm(chrome.i18n.getMessage('ui_online_backup_confirm_delete_backup_title'), chrome.i18n.getMessage('ui_online_backup_confirm_delete_backup'), chrome.i18n.getMessage("ui_button_yes"), chrome.i18n.getMessage("ui_button_no"),
       function(yes) {
        if (yes) {
          chrome.storage.sync.get(name, function(backup) {
            if (!checkForErrors(chrome.runtime.lastError)) {
              var keys = backup[name].keys;
              keys.push(name);
              chrome.storage.sync.remove(keys);
            }
          });
        }
       });
    };

    function combineChunks(chunks) {
      var backupString = "";
      for (var chunk in chunks)
        backupString += chunks[chunk];
      return backupString;
    }

    $scope.loadBackup = function(name) {
      name = "backup_" + name;
      qTipConfirm(chrome.i18n.getMessage('ui_online_backup_confirm_load_backup_title'), chrome.i18n.getMessage('ui_online_backup_confirm_load_backup'), chrome.i18n.getMessage("ui_button_yes"), chrome.i18n.getMessage("ui_button_no"),
        function(yes) {
          if (yes) {
            chrome.storage.sync.get(name, function(backup) {
              if (!checkForErrors(chrome.runtime.lastError)) {
                var keys = backup[name].keys;
                chrome.storage.sync.get(keys, function(chunks) {
                  if (!checkForErrors(chrome.runtime.lastError)) {
                    var importString = combineChunks(chunks);
                    if (validateImportString(importString)) {
                      importLocalStorage(importString)
                    }
                  }
                });
              }
            });
          }
        });
    };

    function storageItemChanged(changes, areaName) {
      if (areaName == "sync") {
        for (var change in changes) {
          if (change.indexOf("backup_") == 0) {
            $scope.update();
            return;
          }
        }
      }
    }

    chrome.storage.onChanged.addListener(storageItemChanged);

    $(document).on("dragstart", "img", function(event) { event.preventDefault(); });

    $scope.update();
  }
