// Background
var bp = chrome.extension.getBackgroundPage();

function save() {
  var instance;
  if ( localStorage.getItem(get_guid()) ) {
    instance = JSON.parse( localStorage.getItem(get_guid()) );
  } else {
    instance = {};
  }

  instance.place = $("#place").val();
  localStorage.nonProCity = instance.place;

  instance.unit = $("#unit").val();
  instance.hl = $("#hl").val();
  instance.style = $("#style").val();
  instance.color = $("#colorSelector").css("background-color");

  instance.last_update = Math.round(new Date().getTime() / 1000.0)-(6 * 60 * 60);

  localStorage.setItem(get_guid(), JSON.stringify(instance));

  bp.update();
  bp.moveLocalStorageToChromeStorage(true);

  $.jGrowl("You're awesome.", {header: "Saved!!1!", position: "top-right"});
}

function reset() {
  var instance = {};
  if ( localStorage.getItem(get_guid()) ) {
    instance = JSON.parse( localStorage.getItem(get_guid()) );
  }

  if ( localStorage.place )
    localStorage.setItem("default")

  $("#place").val( instance.place || "San Francisco, CA" );
  $("#unit").val( instance.unit || "F" );
  $("#hl").val( instance.hl || "EN" );
  $("#style").val( instance.style || "A" );

  $("#guid").text( get_guid() );

  var color = (instance.color || "#1CA1DC");

  $("#colorSelector").ColorPicker({
    color: color,
    onShow: function (colpkr) {
      $(colpkr).fadeIn(500);
      return false;
    },
    onHide: function (colpkr) {
      $(colpkr).fadeOut(500);
      return false;
    },
    onChange: function (hsb, hex, rgb) {
      $("#colorSelector").css("background-color", "#" + hex);
    },
    onBeforeShow: function () {
      // RGB to HEX
      var rgbString = $('#colorSelector').css('backgroundColor');
      var parts = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

      delete (parts[0]);
      for (var i = 1; i <= 3; ++i) {
          parts[i] = parseInt(parts[i]).toString(16);
          if (parts[i].length == 1) parts[i] = '0' + parts[i];
      }
      var hexString ='#'+parts.join('').toUpperCase();
      $(this).ColorPickerSetColor(hexString);
    }
  }).css("background-color", color);

  if ( instance.last_accessed ) {
    $("#last_accessed").text( dateFormat(instance.last_accessed * 1000, "mmmm dS, yyyy, h:MM TT") );
  }

}

function go2antp() {
  window.location = "chrome-extension://mgmiemnjjchgkmgbeljfocdjjnpjnmcg/ntp.html";
}

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

(function() {
  // Flattr
  // var s = document.createElement('script'), t = document.getElementsByTagName('script')[0];
  // s.type = 'text/javascript';
  // s.async = true;
  // s.src = 'https://api.flattr.com/js/0.6/load.js?mode=auto';
  // t.parentNode.insertBefore(s, t);

  // Google+
  var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
  po.src = 'https://apis.google.com/js/plusone.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();

function style_checker() {
  if($("#style").val() == "M") {
    $("#color").show();
  } else {
    $("#color").hide();
  }
}

$(document).ready(function() {
  reset();

  style_checker();

  $("#style").change(function() {
    style_checker();
  });

  $("form").submit(function(e) {
    save();
    e.preventDefault();
  });

  $("#reset").click(function(e) {
    reset();
    e.preventDefault();
  });

  $("#as").click(function(e) {
    save();
    e.preventDefault();
  });

  $("#antp").click(function(e) {
    go2antp();
    e.preventDefault();
  });
});
