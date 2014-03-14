(function() {
  $("#pro-button").html('<button class="btn btn-large">Connect to the extension</button> <span class="response"></span>');

  $("#pro-button button").click(function() {
    return chrome.runtime.sendMessage({
      pro: $("div[data-pro-config]").attr("data-pro-config")
    }, function(response) {
      return $(".response").html(' <span class="label label-inverse">' + String(response) + '</span>').show().delay(5000).fadeOut();
    });
  });

}).call(this);
