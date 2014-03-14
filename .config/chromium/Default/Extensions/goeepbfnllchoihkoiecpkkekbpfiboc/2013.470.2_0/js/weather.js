/** Awesome Weather Widget (for Awesome New Tab Page)
  *   antp.co
  *   Copyright 2011-2012 Michael Hart (h4r7.me)
  * Want to make it even more awesome?
  *   github.antp.co
  *
  * Licensed under GPL v3:
  *   http://www.gnu.org/licenses/gpl-3.0.txt
  *   Further Restrictions:
  *     To make use of or modify the below code in any way:
  *     - You agree to leave this copyright and license notice intact without
  *       modification; and
  *     - You agree to mark your modified versions as modified from the original
  *       version; and
  *     - You agree not to misrepresent the origin of this material or your
  *       relationship with the authors of this project or the project itself.
***/


/* START :: Weather Controller */

  function WeatherCtrl($scope, $compile) {

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

    $scope.weather = {};
    $scope.revisionCount = 0;
    var pro = parse_hash().pro;


    $scope.forceRefresh = function() {
      if ( pro === false ) {
        localStorage.nonProCity = $scope.place;
      }
      $scope.update();
    }

    $scope.update = function() {
      var instance = JSON.parse(localStorage.getItem( get_guid() ));

      if (!instance.weather) {
        return;
      }

      if (instance.weather.error) {
        $(".widgets").hide();
        $(".error").show();
        $("#error-title").text("Who turned out the sun?");
        $("#error-message").text("Is your location valid?");
        return;
      } else {
        $(".widgets").show();
        $(".error").hide();
      }

      $scope.place = instance.place || "San Francisco, CA";
      $scope.unit = instance.unit || "F";
      $scope.config = instance.config || "show";
      $scope.weather = instance.weather;
      if ( $scope.unit === "C" ) {
        $scope.unit = "c";
        $scope.unitlong = "celsius";
      } else {
        $scope.unit = "f";
        $scope.unitlong = "fahrenheit";
      }

      // If not a pro user, limit to 1 city
      if ( pro === false ) {

        // Check for limit-1 city or create
        if (typeof localStorage.nonProCity === "undefined") {
          localStorage.nonProCity = $scope.place;
        }

        if (localStorage.nonProCity !== $scope.place) {
          $(".widgets").hide();
          $(".error").show();
          $("#error-title").text("Pro required for multiple cities/widgets");
          $("#error-message").text("Make the city \"" + $scope.place + "\" your selected non-Pro city by clicking ");
          $("#error-message").append(
            $compile(
              "<span style='cursor: pointer; font-weight: bold;' ng-click='forceRefresh()'>here.</span>"
            )($scope)
          );
          $("#error-message").append("<div>Or <a href='https://pro.antp.co/' target='_blank'>upgrade to Pro</a>.</div>");
        }

      } else if (pro === true) {
        localStorage.removeItem("nonProCity");
      }

      if ( Math.round(($scope.weather.current_observation['temp_'+$scope.unit])).toString().length > 2 ) {
        $scope.weather.three = true;
      } else {
        $scope.weather.three = false;
      }

      $scope.forecast_url = addParameter($scope.weather.current_observation.forecast_url, "apiref", "5c1723f8db3949e2");

      if ( $scope.revisionCount !== 0 ) {
        $scope.safeApply();
      }

      //theme changes (so it changes while ANTP is open, after changing settings)
      $scope.weather.style = (instance.style === "M" ? "non-android-style" : "android-style");
      if ($scope.weather.style === "non-android-style") {
        $(".widgets").css("background-color", instance.color || "#1CA1DC");
      }

      // "custom" icons
      $scope.weather.icon_url_custom = "/img/weather/" + iconReplace($scope.weather.current_observation.icon) + ".png";
      $scope.weather.icons = {};

      // because apparently forecastdays and forecastday are interchangeable object-arrays now...
      $scope.weather.days = {};
      var days = {};
      if (typeof $scope.weather.forecast.simpleforecast.forecastdays === "object") {
        days = $scope.weather.forecast.simpleforecast.forecastdays.forecastday;
      } else {
        days = $scope.weather.forecast.simpleforecast.forecastday;
      }
      var x = 0;
      $.each(days, function(key, val) {
        $scope.weather.days[x] = val;
        $scope.weather.icons[x] = "/img/weather/" + iconReplace(val.icon) + ".png";
        x++;
      });

      $scope.revisionCount++;
    };

    $scope.update();

    $(window).bind("storage", function (e) {
      if(e.originalEvent.key === get_guid()) {
        $scope.update();
        setTimeout($scope.$apply, 700);
      } else if (e.originalEvent.key === "nonProCity") {
        $scope.update();
        $scope.safeApply()
      }
    });
  }

  function iconReplace(icon) {
    var replace_array = {
      'partlycloudy':   'partly_cloudy',
      'partlysunny':    'partly_cloudy',
      'mostlycloudy':   'cloudy',
      'mostlysunny':    'partly_cloudy',
      'chancetstorms':  'tstorms',
      'chancerain':     'rain',
      'chancesleet':    'sleet',
      'flurries':       'light_snow',
      'chanceflurries': 'light_snow',
      'chancesnow':     'snow',
      'hazy':           'fog'
    };
    return replace_array[icon] || icon;
  }

  /* END :: Weather Controller */

  /* START :: Legacy Style Code */

  $(document).ready(function($) {
    var instance;
    if ( localStorage.getItem(get_guid()) ) {
      instance = JSON.parse( localStorage.getItem(get_guid()) );
    } else {
      instance = {};
    }

    // Being able to drag images just feels so tacky
    $("img").live("dragstart", function(event) { event.preventDefault(); });

    $(".edit").attr("href", "options.html" + window.location.hash);

    $(".non-android-style").css("background-color", instance.color || "#1CA1DC");

    // Handles when the widget is resized
    $(window).bind("resize", function() {
      restyle();
    });
    restyle();
  });

  function restyle() {
    if ( $(window).width() > 400 ) {
      $("body").addClass("wide");
    } else {
      $("body").removeClass("wide");
    }
  }


  /* END :: Legacy Style Code */

function get_guid() {
  try {
    if ( window.location.hash ) {
      return JSON.parse( decodeURIComponent(window.location.hash).substring(1) ).id;
    } else {
      return "default";
    }
  } catch(e) {
    return "default";
  }
}

var parse_hash = function() {
  var e;
  try {
    if (window.location.hash) {
      return JSON.parse(decodeURIComponent(window.location.hash).substring(1));
    } else {
      return "default";
    }
  } catch (_error) {
    e = _error;
    return "default";
  }
};

function update_last_accessed() {
  var
    guid = get_guid(),
    instance = JSON.parse( localStorage.getItem(guid) );

  if ( !instance || instance === "" || localStorage.getItem(guid) === undefined ) {
    instance = {};
  }

  instance.last_accessed = Math.round(new Date().getTime()/1000.0);

  localStorage.setItem(guid, JSON.stringify(instance) );
}
update_last_accessed();

function addParameter(url, parameterName, parameterValue) {
  replaceDuplicates = true;

  if (url.indexOf('#') > 0) {
    var cl = url.indexOf('#');
    urlhash = url.substring(url.indexOf('#'), url.length);
  } else {
    urlhash = '';
    cl = url.length;
  }

  sourceUrl = url.substring(0,cl);

  var urlParts = sourceUrl.split("?");
  var newQueryString = "";

  if (urlParts.length > 1) {
    var parameters = urlParts[1].split("&");
    for (var i=0; (i < parameters.length); i++) {
      var parameterParts = parameters[i].split("=");
      if (!(replaceDuplicates && parameterParts[0] == parameterName)) {
        if (newQueryString == "") {
          newQueryString = "?";
        } else {
          newQueryString += "&";
        }
        newQueryString += parameterParts[0] + "=" + parameterParts[1];
      }
    }
  }
  if (newQueryString == "") {
    newQueryString = "?";
  } else {
    newQueryString += "&";
  }
  newQueryString += parameterName + "=" + parameterValue;

  return urlParts[0] + newQueryString + urlhash;
}
