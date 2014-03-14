/*
  Awesome New Tab Page
  Copyright 2011-2013 Awesome HQ, LLC & Michael Hart
  All rights reserved.
  http://antp.co http://awesomehq.com
*/


/* START :: Windows */

  $(document).ready(function($) {
    $(".ui-2.container").center();

    $(window).bind('resize scroll', function() {
      $(".ui-2.container").center();
    });
  });

  $(document).on("click", ".close, .ui-2.x", closeButton);

  function closeButton(exclude) {

    if ( exclude && typeof(exclude) === "string" ) {
      $("body > .ui-2, .ui-2#apps, .ui-2#widgets, #recently-closed-tabs-menu")
        .not(exclude)
        .hide();
    } else {
      $("body > .ui-2, .ui-2#apps, .ui-2#widgets, #recently-closed-tabs-menu").hide();
    }

    window.location.hash = "";
    hscroll = true;
  }

  var optionsInit = false;
  $(document).on("click", "#config-button, .ui-2.config", function(){
    if ( !optionsInit ) {
      $(window).trigger("antp-config-first-open");
      optionsInit = true;
    }

    closeButton(".ui-2#config");
    $(".ui-2#config").toggle();
    requiredColorPicker();
    required('/javascript/import-export.js?nocache=12');
  });

  $(document).on("click", "#app-drawer-button", function() {
    closeButton(".ui-2#apps");
    $(".ui-2#apps").toggle();
  });

  $(document).on("click", "#widget-drawer-button", function() {
    closeButton(".ui-2#widgets");
    $(".ui-2#widgets").toggle();
  });

  $(document).on("mouseleave", "#recently-closed-tabs-menu", function() {
    $(this).css("display", "none");
  });

  $(document).on("click", "#recently-closed-tabs", function() {
    closeButton("#recently-closed-tabs-menu");
    $("#recently-closed-tabs-menu").toggle();
  });

  var aboutInit = false;
  $(document).on("click", "#logo-button,.ui-2.logo", function() {
    closeButton(".ui-2#about");
    $(".ui-2#about").toggle();

    if ( !aboutInit ) {
      aboutInit = true;

      (function() {
        var twitterScriptTag = document.createElement('script');
        twitterScriptTag.type = 'text/javascript';
        twitterScriptTag.async = true;
        twitterScriptTag.src = 'https://platform.twitter.com/widgets.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(twitterScriptTag, s);
      })();

      (function(){
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/plusone.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
      })();

      (function() {
        var s = document.createElement('script'), t = document.getElementsByTagName('script')[0];
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://chrome.google.com/webstore/widget/developer/scripts/widget.js';
        t.parentNode.insertBefore(s, t);
      })();
    }
  });

  $(document).on("click", ".ui-2 .drawer-app-uninstall", function(e) {
    var to_delete = null;
    var to_delete_name = null;
    to_delete = $(this).parent();
    to_delete_name = $(to_delete).find(".drawer-app-name").html();

    function uninstall(callbackReturned) {
      if ( callbackReturned === false )
        return;
      chrome.management.uninstall($(to_delete).attr("id"));
    }

    qTipConfirm(chrome.i18n.getMessage("ui_uninstall_title"), chrome.i18n.getMessage("ui_confirm_uninstall", to_delete_name), chrome.i18n.getMessage("ui_button_ok"), chrome.i18n.getMessage("ui_button_cancel"), uninstall);

    return false;
  });

  /* END :: Windows */

/* START :: Top Left Buttons */

  $(window).bind("antp-config-first-open", function() {
    storage.get("settings", function(storage_data) {
      $("#hideLeftButtons").prop("checked", storage_data.settings.buttons);
      $(document).on("change", "#hideLeftButtons", moveLeftButtons);
    });
  });

  function moveLeftButtons(e) {
    storage.get("settings", function(storage_data) {
      if ( e ) {
        settings.set({"buttons": $("#hideLeftButtons").is(":checked")});
        storage_data.settings.buttons = $("#hideLeftButtons").is(":checked");
      }

      if ( !storage_data.settings.buttons && storage_data.settings.lock ) {
        $("#top-buttons > div").css("left", "-50px");
        $("#widget-holder,#grid-holder").css("left", "0px");
      }

      if ( storage_data.settings.buttons ) {
        $("#top-buttons > div").css("left", "0px");
        $("#widget-holder,#grid-holder").css("left", "32px");
      }
    });
  }

  $(document).ready(function($) {
    moveLeftButtons();
  });

  $(document).on({
    mouseenter: function() {
      storage.get("settings", function(storage_data) {
        if ( !storage_data.settings.buttons ) {
          $("#top-buttons > div").css("left", "0px");
          $("#widget-holder,#grid-holder").css("left", "32px");
        }
      });
    },
    mouseleave: function() {
      storage.get("settings", function(storage_data) {
        if ( !storage_data.settings.buttons && storage_data.settings.lock ) {
          $("#top-buttons > div").css("left", "-50px");
          $("#widget-holder,#grid-holder").css("left", "0px");
        }
      });
    }
  }, "#top-buttons");

  /* END :: Top Left Buttons */

/* START :: Configure */

  $(document).ready(function($) {
    if( window.location.hash ) {
      switch(window.location.hash) {
        case "#options":
          $("#config-button").trigger("click");
          break;
      }
    }

    if(localStorage.getItem("bg-img-css") && localStorage.getItem("bg-img-css") !== "") {
      $("body").css("background", localStorage.getItem("bg-img-css") );
      $("#bg-img-css").val( localStorage.getItem("bg-img-css") );
    }
  });

  $(".bg-color").css("background-color", "#" + (localStorage.getItem("color-bg") || "221f20"));

  $(document).ready(function($) {
    $(".bg-color").css("background-color", "#" + (localStorage.getItem("color-bg") || "221f20"));
  });

  $(document).on("keyup change", "#bg-img-css", function() {
    $("body").css("background", "" );
    $("body").css("background", $(this).val() );
    $(".bg-color").css("background-color", '#' + (localStorage.getItem("color-bg") || "221f20") );

    if($(this).val() === "") {
      $(".bg-color").css("background-color", "#" + (localStorage.getItem("color-bg") || "221f20"));
    }

    localStorage.setItem("bg-img-css", $(this).val() );
  });

  $(document).on("click", "#reset-button", function() {
    function reset(callbackReturned) {
      if (callbackReturned === false) {
        $.jGrowl("Whew! Crisis averted!", { header: "Reset Cancelled" });
        return;
      }

      deleteShortcuts();
      deleteRoot();
      localStorage.clear();
      storage.clear()

      setTimeout(function() {
        reload();
      }, 250);
    }

    qTipConfirm(chrome.i18n.getMessage("ui_config_reset"), chrome.i18n.getMessage("ui_confirm_reset"), chrome.i18n.getMessage("ui_button_ok"), chrome.i18n.getMessage("ui_button_cancel"), reset);
  });

  $(window).bind("antp-config-first-open", function() {
    storage.get("settings", function(storage_data) {
      $("#grid_width").val(storage_data.settings.grid_width);
      $("#grid_height").val(storage_data.settings.grid_height);
      $(document).on("change keyup", "#grid_width, #grid_height", updateGridSize);
    });
  });

  function updateGridSize(e) {
    if ( e ) {
      var value = $(this).val();
      console.log($(this).attr("id"), value, typeof value)

      if ( value === "" ) {
        var toSet = {};
        toSet[$(this).attr("id")] = null;
        settings.set(toSet, function() {
          storage.get(["tiles", "settings"], placeGrid);
          $(window).trigger("antp-widgets");
        });
        return;
      }

      if ($(this).attr("id") === "grid_width") {
        value  = (value < 4) ? 4 : value;
        value  = (value > 50) ? 50 : value;
        $(this).val(value);
      }

      if ($(this).attr("id") === "grid_height") {
        value  = (value < 3) ? 3 : value;
        value  = (value > 25) ? 25 : value;
        $(this).val(value);
      }

      var toSet = {};
      toSet[$(this).attr("id")] = $(this).val();
      settings.set(toSet, function() {
        storage.get(["tiles", "settings"], placeGrid);
        $(window).trigger("antp-widgets");
      });
    }
  }

  /* END :: Configure */

// Supported Window
var SUPPORTED_VERSION = "1";

// chrome.storage.local.get(["supported_window"], function(data) {
//   if (data.supported_window !== SUPPORTED_VERSION) {
//     $(".ui-2#supported").toggle();
//   }
// });

$(document).on("click", "#supported-confirm-configure", function() {
  $(".ui-2#supported").hide();
  $(".ui-2#config").show();
  chrome.storage.local.set({
    supported_window: SUPPORTED_VERSION
  });
});

$(document).on("click", ".supported-confirm", function() {
  $(".ui-2#supported").hide();
  chrome.storage.local.set({
    supported_window: SUPPORTED_VERSION
  });
});

$(document).on("click", ".supported-window", function() {
  closeButton(".ui-2#supported");
  $(".ui-2#supported").toggle();
});

/* Criteo */

  var adcode = "<iframe src='https://cas.criteo.com/delivery/afr.php?zoneid=130832' framespacing='0' frameborder='no' scrolling='no' width='160' height='600'><a href='http://cas.criteo.com/delivery/ck.php?cb="+Math.floor(Math.random()*99999999999)+"' target='_blank'><img src='http://cas.criteo.com/delivery/avw.php?zoneid=130832' border='0' alt='' /></a></iframe>";

  function addCriteo() {
    $("#oetirc-unit").html(adcode);

    $("#oetirc").show().center({
      horizontal: false,
      position: "fixed"
    });
    $(window).bind("resize", function() {
      $("#oetirc").center({
        horizontal: false,
        position: "fixed"
      });
    });
  }

  getDaysSinceEpoch = function() {
    var now = new Date();
    var fullDaysSinceEpoch = Math.floor(now/8.64e7);
    return fullDaysSinceEpoch;
  }

  // If a user has AdBlock installed, they probably wont be re-targeted anyway.
  // For optimal user experience, don't show any ads for them.
  checkForAdBlock = function(callback) {
    var list = [
      "gighmmpiobklfepjocnamgkkbiglidom" // AdBlock
    , "cfhdojbkjhnklbpkdaibdccddilifddb" // AdBlock Plus
    , "ocifcklkibdehekfnmflempfgjhbedch" // Adblock Pro
    ];
    chrome.management.getAll(function(extensions) {
      var extIds = [], i = extensions.length;
      while(i--){
        if ( extensions[i].enabled === true && list.indexOf(extensions[i].id) !== -1 ) {
          return;
        }
      }

      callback();
    });
  }


  $(document).ready(function($) {
    if ( localStorage.getItem("ads-free") ) {
      return $("#oetirc").remove();
    }

    if ( localStorage.getItem("criteoDisabled") == getDaysSinceEpoch() ) {
      $("#oetirc").remove();

    } else if (isPro() === true) {
      $("#oetirc").remove();

    } else {
      checkForAdBlock(addCriteo);
    }
  });

  $(document).on("click", ".oetirc-disable", function(){
    // disable ads for today
    localStorage.setItem("criteoDisabled", getDaysSinceEpoch());

    // remove the ads
    $("#oetirc").remove();
  });




/* START :: RevJet */
  $(window).bind("antp-config-first-open", function() {
    var $rj_checkbox = $("#toggle-revjet")
    var enabled = true

    chrome.storage.local.get(["revjet_disabled"], function(data) {
      if (data && data.revjet_disabled === true) {
        enabled = false
        $sf_checkbox.prop("checked", enabled);
      } else {
        enabled = true
        $rj_checkbox.prop("checked", enabled);
      }
    });

    $rj_checkbox.bind("change", function() {
      enabled = !enabled
      $rj_checkbox.prop("checked", enabled);
      chrome.storage.local.set({
        revjet_disabled: !enabled
      })
    })
  });

  /* END :: Superfish */

/* START :: Superfish */
  $(window).bind("antp-config-first-open", function() {
    var $sf_checkbox = $("#toggle-superfish")
    var enabled = true

    if (isPro() === true) {
      $(".hide-if-pro").hide()
    }

    chrome.storage.local.get(["superfish_disabled"], function(data) {
      if (data && data.superfish_disabled === true) {
        enabled = false
        $sf_checkbox.prop("checked", enabled);
      } else {
        enabled = true
        $sf_checkbox.prop("checked", enabled);
      }
    });

    $sf_checkbox.bind("change", function() {
      enabled = !enabled
      $sf_checkbox.prop("checked", enabled);
      chrome.storage.local.set({
        superfish_disabled: !enabled
      })
    })
  });

  /* END :: Superfish */

/* START :: Hide Scrollbar */

  $(window).bind("antp-config-first-open", function() {
    storage.get("settings", function(storage_data) {
      $("#hide-scrollbar").prop("checked", storage_data.settings.scrollbar_bottom);
      $(document).on("change", "#hide-scrollbar", updateScrollBarVisibility);
    });
  });

  function updateScrollBarVisibility(e) {
    storage.get("settings", function(storage_data) {
      if ( e ) {
        settings.set({"scrollbar_bottom": $("#hide-scrollbar").is(":checked")});
        storage_data.settings.scrollbar_bottom = $("#hide-scrollbar").is(":checked");
      }

      if ( storage_data.settings.scrollbar_bottom ) {
        $("body").css("overflow-x", "");
      } else {
        $("body").css("overflow-x", "hidden");
      }
    });
  }
  updateScrollBarVisibility();

  /* END :: Hide Scrollbar */

/* START :: Hide RCTM */

  $(window).bind("antp-config-first-open", function() {
    storage.get("settings", function(storage_data) {
      $("#hideRCTM").prop("checked", storage_data.settings.recently_closed);
      $(document).on("change", "#hideRCTM", updateRCTMVisibility);
    });
  });

  function updateRCTMVisibility(e) {
    storage.get("settings", function(storage_data) {
      if ( e ) {
        settings.set({"recently_closed": $("#hideRCTM").is(":checked")});
        storage_data.settings.recently_closed = $("#hideRCTM").is(":checked");
      }

      if ( storage_data.settings.recently_closed ) {
        $("#recently-closed-tabs").show();
      } else {
        $("#recently-closed-tabs").hide();
      }
    });
  }
  updateRCTMVisibility();

  /* END :: Hide RCTM */

function colorPickerLoaded() {
  // background color picker
  $("#colorselector-bg").ColorPicker({
    color: '#' + ( localStorage.getItem("color-bg") || "221f20") ,
    onShow: function (colpkr) {
      $(colpkr).fadeIn(500);
      return false;
    },
    onHide: function (colpkr) {
      $(colpkr).fadeOut(500);
      return false;
    },
    onChange: function (hsb, hex, rgb) {
      $(".bg-color").css('background-color', '#' + hex);
      localStorage.setItem("color-bg", hex);
    }
  });
}

// drag/drop bookmarks to empty tiles
$(".tile").bind({
  "dragover": function(e) {
    var srcElement = $(e.srcElement);
    if (srcElement.filter(".tile.empty.tile-grid").length == 1) {
      srcElement.addClass("filesystem-drop-area");
    }
    return false;
  },
  "dragleave": function(e) {
    var srcElement = $(e.srcElement);
    srcElement.removeClass("filesystem-drop-area");
    return false;
  },
  "drop": function(e) {
    var srcElement = $(e.srcElement);
    srcElement.removeClass("filesystem-drop-area");
    if (srcElement.filter(".tile.empty.tile-grid").length == 1) {
      if (e.originalEvent.dataTransfer.items.length > 0) {
        var url = e.originalEvent.dataTransfer.getData("URL");
        if (url !== null && url !== "") {
          createShortcut(srcElement);
          $("[ng-model='$parent.$parent.appLaunchUrl']").val(url).change();
          $("[ng-model='$parent.$parent.name']").val("").change();
          $("[ng-model='$parent.$parent.name']").focus();
        }
      }
    }
    return false;
  }
});

// upon new app installed
function showAppsWindow () {
  $(".ui-2#apps").show();

  $(document).ready(function() {
    $(document.body).qtip({
      id: 'app-tip',
      content: {
        text: chrome.i18n.getMessage("ui_apps_tip_message"),
        title: {
          text: "<b>" + chrome.i18n.getMessage("ui_apps_tip_message_title") + "</b>",
          button: true
        }
      },
      position: {
        my: 'left center',
        at: 'right center',
        target: $('#app-drawer-button'),
        viewport: $(window)
      },
      show: {
        event: false,
        ready: true
      },
      hide: {
        event: 'unfocus'
      },
      style: {
        classes: 'qtip-light qtip-bootstrap qtip-shadow'
      }
    });

    $('#qtip-app-tip').triggerHandler(this.id);
  });
}

$(document).ready(function() {
  $('div[title]').qtip({
    style: {
      classes: 'qtip-light qtip-shadow qtip-bootstrap'
    }
  });
});

function qTipAlert(title, message, buttonText) {
  var message = $('<span />', { text: message }),
    ok = $('<button />', { text: buttonText, 'class': 'bubble' }).css("width", "100%");

  dialogue( message.add(ok), title );
}

function qTipConfirm(title, message, buttonTextOk, buttonTextCancel, callback) {
  var bool = undefined;
  var message = $('<span />', { text: message }),
    ok = $('<button />', {
      text: buttonTextOk,
      click: function() { callback(true); },
      class: 'bubble ilb'
    }).css({"width": "45%", "float": "left"}),
    cancel = $('<button />', {
      text: buttonTextCancel,
      click: function() { callback(false); },
      class: 'bubble ilb'
    }).css({"width": "45%", "float": "right"});

  dialogue( message.add(ok).add(cancel), title );
}

function dialogue(content, title) {
  $('<div />').qtip({
    content: {
      text: content,
      title: {
        text: "<b>" + title + "</b>",
        button: false
      }
    },
    position: {
      my: 'center',
      at: 'center',
      target: $(window)
    },
    show: {
      ready: true,
      modal: {
        on: true,
        blur: false
      }
    },
    hide: false,
    style: 'qtip-light qtip-rounded qtip-bootstrap qtip-dialogue',
    events: {
      render: function(event, api) {
        $('button', api.elements.content).click(function(){api.destroy();});
      }
    }
  });
}
