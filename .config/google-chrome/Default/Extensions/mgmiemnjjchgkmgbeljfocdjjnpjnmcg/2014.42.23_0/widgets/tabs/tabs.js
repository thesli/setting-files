function tabCtrl($scope) {

  $scope.tabs = {};
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

  $scope.update = function(storage_data) {
    var query = $("input#query").val();
    $scope.tabs = storage_data.open_tabs || [];

    var tab_names = $.map($scope.tabs, function (tab) {
      return {
        "title" : tab.title,
        "id"    : tab.id,
        "pinned": tab.pinned
      }
    });

    var filtered = $.map(tab_names, function (tab) {
      var score = (tab.title).score(query);
      if ( score > 0 ) {
        return {
          "title" : tab.title,
          "id"    : tab.id ,
          "score" : score,
          "pinned": tab.pinned
        }
      }
    });

    if ( typeof(query) === "string" && query !== "" ) {
      filtered.sort(function(a, b) {
        return b.score - a.score
      });
      $scope.tabs = filtered;
    }

    $scope.safeApply();
    $scope.restyle();
  };

  var body = $("body");
  $scope.restyle = function() {
    $scope.width = $(window).width();
    $scope.height = $(window).height();

    body.css({
      "width" : $scope.width,
      "height": $scope.height
    });

    $(".tab-link").css({
      "width" : $scope.width - 85
    });
  };
  $(window).bind("resize", function() {
    $scope.restyle();
  });

  $scope.switchToTab = function(id) {
    localStorage.setItem("switch_to_tab", id);
  };

  $scope.closeTab = function(id) {
    localStorage.setItem("close_tab", id);
  };

  $scope.pinUnpin = function(id) {
    localStorage.setItem("pin_toggle", id);
  };

  $(document).on("keyup", "input#query", function() {
    chrome.storage.local.get("open_tabs", $scope.update);
  });

  $(document).on("dragstart", "img", function(event) { event.preventDefault(); });

  chrome.storage.onChanged.addListener(function (changes, areaName) {
    if (changes.open_tabs && areaName === "local") {
      chrome.storage.local.get("open_tabs", $scope.update);
    }
  });

  chrome.storage.local.get("open_tabs", $scope.update);
}
