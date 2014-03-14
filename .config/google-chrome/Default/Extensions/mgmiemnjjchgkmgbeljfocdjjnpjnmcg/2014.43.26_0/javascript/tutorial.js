/*
  Awesome New Tab Page
  Copyright 2011-2013 Awesome HQ, LLC & Michael Hart
  All rights reserved.
  http://antp.co http://awesomehq.com
*/

function startTutorial() {
  var next = "<a href='#' class='tutorial-next bubble'>" + chrome.i18n.getMessage("ui_tutorial2_next") + "</a>";
  var steps = [
    { target: $("#app-drawer-button"), title: chrome.i18n.getMessage("ui_tutorial2_app_window_title"), content: chrome.i18n.getMessage("ui_tutorial2_app_drawer") + next },
    { target: $("#widget-drawer-button"), title: chrome.i18n.getMessage("ui_tutorial2_widgets_window_title"), content: chrome.i18n.getMessage("ui_tutorial2_widget_drawer") + next },
    { target: $("#unlock-button"), title: chrome.i18n.getMessage("ui_tutorial2_lock_title"), content: chrome.i18n.getMessage("ui_tutorial2_lock_grid") },
    { target: $("#tutorial #delete"), title: chrome.i18n.getMessage("ui_tutorial2_delete_widget"), content: chrome.i18n.getMessage("ui_tutorial2_delete_widget_string") },
    { target: $(".tile#0x0"), title: chrome.i18n.getMessage("ui_tutorial2_empty_grid_title"), content: chrome.i18n.getMessage("ui_tutorial2_empty_grid_string") }
  ];

  $(document.body).qtip({
    id: "tutorial-tip",
    content: {
      text: steps[0].content,
      title: {
        text: "<b>" + steps[0].title + "</b>",
        button: true
      }
    },
    position: {
      my: "left center",
      at: "right center",
      target: steps[0].target,
      viewport: $(window)
    },
    show: {
      event: false,
      ready: true
    },
    style: {
      classes: "qtip-light qtip-bootstrap qtip-shadow"
    },
    hide: false,
    events: {
      render: function(event, api) {
        var tooltip = api.elements.tooltip;
        api.step = 0;

        $(document).unbind("tutorial-next").bind('tutorial-next', function(event) {
          api.step++;
          var current = steps[api.step];
          if (current) {
            api.set('content.text', current.content);
            api.set('content.title', "<b>" + current.title + "</b>");
            api.set('position.target', current.target);
          }

          if ( current === undefined ) {
            api.destroy();
            qTipAlert(chrome.i18n.getMessage("ui_tutorial2_completed_title"), chrome.i18n.getMessage("ui_tutorial2_completed_string"), chrome.i18n.getMessage("ui_tutorial2_finish_string"));
          }

          switch(api.step) {
            case 2:
              api.set('position.target', current.target.addClass("tutorial-next"));
              break;
            case 3:
              $("#unlock-button").removeClass("tutorial-next");
              setTimeout(function(){
                api.set('position.target', current.target.show().addClass("tutorial-next"));
              }, 0);
              break;
            case 4:
              $(".tile#0x0").removeClass("tutorial-next");
              api.set('position.target', current.target.addClass("tutorial-next"));
              break;
          }
        });
      },
      hide: function(event, api) { api.destroy(); }
    }
  });
}

$(document).on("click", ".tutorial-next", function(event) {
  $(document).trigger("tutorial-next");
});
