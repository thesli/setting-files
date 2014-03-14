document.title = chrome.i18n.getMessage("name") + ": " + chrome.i18n.getMessage("status_title");
$("body")
  .append($('<h1 id="optionstitle"><img src="im/icon48.png"/> ' + chrome.i18n.getMessage("name") + ": " + chrome.i18n.getMessage("status_title") + "</h1>"))
  .append('<div id=optionslink><a href="options.html">' + chrome.i18n.getMessage("status_link_options") + "</a></div>")
  .append('<div id=legend><input class="reloadall" type="button" value="' + chrome.i18n.getMessage("status_button_reloadall") + '"><div id="lred">' + chrome.i18n.getMessage("status_legend_broken") + '</div><div id="lgray">' + chrome.i18n.getMessage("status_legend_blocked") + '</div><div id="lyellow">' + chrome.i18n.getMessage("status_legend_loading") + '</div><div id="lgreen">' + chrome.i18n.getMessage("status_legend_working") + "</div><span class=clearall></span></div>")
  .append("<div id=tabstates>");

var states = null
, getStates = function () {
  chrome.extension.sendMessage({
    getstates: !0
  }, function (a) {
    a = JSON.parse(a);
    if (a.states) 
      states = a.states, chrome.windows.getCurrent(function (a) {
        $("#tabstates").empty();
        generateSet(states[a.id], chrome.i18n.getMessage("status_window_this"));
        for (id in states) 
          id != a.id && id != "extra" && generateSet(states[id], chrome.i18n.getMessage("status_window_other"));
        states.extra.length > 0 && generateSet(states.extra, "EXTRA (LEAKING)");
      });
  });
}, reloadTab = function (a) {
  chrome.extension.sendMessage({
    reloadtab: a
  });
};

getStates();
setInterval(getStates, 2E3);

var generateSet = function (a, b) {
  $("#tabstates").append($("<div class=title>").text(b));
  for (i = 0; i < a.length; i++) 
    generateTab(a[i]);
}, generateTab = function (a) {
  var b = $("<div class=tabstatus>");
  b.text((a.frames > 0 ? "[" + a.frames + "] " : "") + (a.title ? a.title : "..."));
  a.root ? b.css({
    "background-color": "#aaeeaa"
  }) : a.tabStatus == "loading" ? b.text("...").css({
    "background-color": "#eeeeaa"
  }) : a.goodurl ? b.css({
    "background-color": "#eeaaaa"
  }).prepend($("<input type='button' value='" + chrome.i18n.getMessage("status_button_reloadone") + "' class='reloadone'>").click(function () {
    reloadTab(a.tabId);
    $(this).css({
      display: "none"
    });
    b.css({
      "background-color": "#eeeeaa"
    });
  })) : b.css({
    "background-color": "#cccccc"
  });
  $("#tabstates").append(b);
}, reloadall = function () {
  for (id in states) 
    for (i = 0; i < states[id].length; i++) 
      states[id][i].title && !states[id][i].root && states[id][i].goodurl && reloadTab(states[id][i].tabId);
  setTimeout(getStates, 100);
};
$(".reloadall").click(reloadall);