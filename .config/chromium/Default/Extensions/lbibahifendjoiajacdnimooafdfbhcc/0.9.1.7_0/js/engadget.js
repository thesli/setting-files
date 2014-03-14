// Simulates PHP's date function
Date.prototype.format = function(format) {
  var returnStr = '';
  var replace = Date.replaceChars;
  for(var i = 0; i < format.length; i++) {
    var curChar = format.charAt(i);
    if(i - 1 >= 0 && format.charAt(i - 1) == "\\") {
      returnStr += curChar;
    } else if(replace[curChar]) {
      returnStr += replace[curChar].call(this);
    } else if(curChar != "\\") {
      returnStr += curChar;
    }
  }
  return returnStr;
};

Date.replaceChars = {
  shortMonths : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  longMonths : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  shortDays : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  longDays : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

  // Day
  d : function() {
    return (this.getDate() < 10 ? '0' : '') + this.getDate();
  },
  D : function() {
    return Date.replaceChars.shortDays[this.getDay()];
  },
  j : function() {
    return this.getDate();
  },
  l : function() {
    return Date.replaceChars.longDays[this.getDay()];
  },
  N : function() {
    return this.getDay() + 1;
  },
  S : function() {
    return (this.getDate() % 10 == 1 && this.getDate() != 11 ? 'st' : (this.getDate() % 10 == 2 && this.getDate() != 12 ? 'nd' : (this.getDate() % 10 == 3 && this.getDate() != 13 ? 'rd' : 'th')));
  },
  w : function() {
    return this.getDay();
  },
  z : function() {
    var d = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((this - d) / 86400000);
  }, // Fixed now
  // Week
  W : function() {
    var d = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - d) / 86400000) + d.getDay() + 1) / 7);
  }, // Fixed now
  // Month
  F : function() {
    return Date.replaceChars.longMonths[this.getMonth()];
  },
  m : function() {
    return (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1);
  },
  M : function() {
    return Date.replaceChars.shortMonths[this.getMonth()];
  },
  n : function() {
    return this.getMonth() + 1;
  },
  t : function() {
    var d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 0).getDate()
  }, // Fixed now, gets #days of date
  // Year
  L : function() {
    var year = this.getFullYear();
    return (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0));
  }, // Fixed now
  o : function() {
    var d = new Date(this.valueOf());
    d.setDate(d.getDate() - ((this.getDay() + 6) % 7) + 3);
    return d.getFullYear();
  }, //Fixed now
  Y : function() {
    return this.getFullYear();
  },
  y : function() {
    return ('' + this.getFullYear()).substr(2);
  },
  // Time
  a : function() {
    return this.getHours() < 12 ? 'am' : 'pm';
  },
  A : function() {
    return this.getHours() < 12 ? 'AM' : 'PM';
  },
  B : function() {
    return Math.floor((((this.getUTCHours() + 1) % 24) + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600) * 1000 / 24);
  }, // Fixed now
  g : function() {
    return this.getHours() % 12 || 12;
  },
  G : function() {
    return this.getHours();
  },
  h : function() {
    return ((this.getHours() % 12 || 12) < 10 ? '0' : '') + (this.getHours() % 12 || 12);
  },
  H : function() {
    return (this.getHours() < 10 ? '0' : '') + this.getHours();
  },
  i : function() {
    return (this.getMinutes() < 10 ? '0' : '') + this.getMinutes();
  },
  s : function() {
    return (this.getSeconds() < 10 ? '0' : '') + this.getSeconds();
  },
  u : function() {
    var m = this.getMilliseconds();
    return (m < 10 ? '00' : (m < 100 ? '0' : '')) + m;
  },
  // Timezone
  e : function() {
    return "Not Yet Supported";
  },
  I : function() {
    return "Not Yet Supported";
  },
  O : function() {
    return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + '00';
  },
  P : function() {
    return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + ':00';
  }, // Fixed now
  T : function() {
    var m = this.getMonth();
    this.setMonth(0);
    var result = this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1');
    this.setMonth(m);
    return result;
  },
  Z : function() {
    return -this.getTimezoneOffset() * 60;
  },
  // Full Date/Time
  c : function() {
    return this.format("Y-m-d\\TH:i:sP");
  }, // Fixed now
  r : function() {
    return this.toString();
  },
  U : function() {
    return this.getTime() / 1000;
  }
};

var settings = [{
  categorie : 'Classic',
  rss : 'http://www.engadget.com/rss-full.xml',
  notifications : true
}
// , {
//   categorie : 'Mobile',
//   rss : 'http://mobile.engadget.com/rss-full.xml',
//   notifications : false
// }, {
//   categorie : 'HD',
//   rss : 'http://hd.engadget.com/rss-full.xml',
//   notifications : false
// }, {
//   categorie : 'ALT',
//   rss : 'http://www.engadget.com/alt-full.xml',
//   notifications : false
// }
], offlineStorage = {};

var itemCount = 30;
var refreshInterval = 60000;
var documentHeight = 0;
var lists = [];

function Init(layout) {

  //includes
  //
  // include("https://www.google.com/jsapi?key=ABQIAAAA8J_10aN_RkME26pJGlhogxQicEM9cB9lRhOjcL-bnbJu0nPfNBS-50GKfTmxNWniwpNpSZErANqiOQ");
  // include("js/jquery-ui-1.8.11.custom.min.js");
  // include("js/jquery.easyAccordion.js");
  // include("js/jQuery.lionbars.0.2.1.min.js");

  //

  if (navigator.appVersion.indexOf("Win")!=-1) initScrollBars();
  documentHeight = $(document).height();
  documentHeight = (documentHeight / 1.1) - 20;
  creatCategoryHeaders("#accordion dl");

  $('#accordion').easyAccordion({
    autoStart : false,
    slideNum : false

  });

  $("#accordion").hide().delay(200).fadeIn(500);
  $("body").hide().delay(200).fadeIn(500);

  for(var i = 0; i < settings.length; i++) {

    var populate = new populateList(i);
    populate.Init();
    lists.push(populate);

  }

  if(window.navigator.onLine) {
    //Automatische refresh
    setInterval(Refresh, refreshInterval);
  }else
  {
    offline();
  }

}


function initScrollBars()
{
  $("body").append("<style>::-webkit-scrollbar { width: 8px;} ::-webkit-scrollbar-track {-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.0); border-radius: 6px;} ::-webkit-scrollbar-thumb { border-radius: 8px; background: rgba(0,0,0,0.5); -webkit-box-shadow: inset 0 0 4px rgba(0,0,0,0.2)} ::-webkit-scrollbar-thumb:window-inactive { background: rgba(61,61,61,0.0); ::-webkit-scrollbar-button:horizontal:decrement:hover {background: rgba(0,0,0,0.8);} <style>");
}

function creatCategoryHeaders(element) {

  for(var i = 0; i < settings.length; i++) {

    var Category = settings[i].categorie;

    $(element).append("<dt class=\"" + Category + " blackGradient\">" + Category + "</dt><dd ><div id=\"" + Category + "_container\"><div class=\"listItems lightGradient\" style=\"height:" + documentHeight + "px !important;\"> </div><div class=\"itemContainer\" style=\"height:" + documentHeight + "px !important;\"> </div><div style=\"clear:both;\"></div></div></dd>");

  }

}

function populateList(i) {
  this.feed = {};
  this.items = [];
  this.isLoaded = false;
  this.Category = settings[i].categorie;
  this.notifications = settings[i].notifications;
  this.rss = settings[i].rss;
  this.column = "#" + this.Category + "_container div.listItems"
  this.articleField = "#" + this.Category + "_container div.itemContainer"
  this.listId = i;

  this.active = "";

  this.Init = function() {
    //$(this.column).append(this.Category);
    this.load();
  }

  this.refresh = function() {
    this.load();
  }

  this.load = function() {
    if(window.navigator.onLine) {
      //online browsing
      this.feed = new google.feeds.Feed(this.rss);
      this.feed.setNumEntries(itemCount);
      this.feed.load(this.callback(this));
    } else {
      //offline browsing
      if(JSON.parse(localStorage.getItem('offlineRss_' + this.listId)))
        this.offlineCallback(JSON.parse(localStorage.getItem('offlineRss_' + this.listId)));
    }

  }

  this.offlineCallback = function(data) {
    self = this;
    jQuery.each(data.feed.entries, function(index, itemData) {
      if(index == data.feed.entries.length - 1 && $(self.articleField).html() == " ") {
        self.addItem(itemData, "selected");
        self.loadItem(index);
      } else {
        self.addItem(itemData, "lightGradient");
      }
    });
  }

  this.callback = function(context) {
    return function(result) {
      //localstorage
      if(navigator.onLine)
        localStorage.setItem('offlineRss_' + context.listId, JSON.stringify(result));

      for(var i = 0; i < result.feed.entries.length; i++) {
        var itemId = result.feed.entries.length - i - 1;

        if(i == result.feed.entries.length - 1 && $(context.articleField).html() == " ") {
          context.addItem(result.feed.entries[itemId], "selected");

          context.loadItem(i);
        } else {
          context.addItem(result.feed.entries[itemId], "lightGradient");
        }

      }
      context.isLoaded = true;

      //$(".listItems").lionbars();

    }
  }

  this.addItem = function(item, state) {
    var show = true;

    for(var i = 0; i < this.items.length; i++)
    if(this.items[i].link == item.link)
      show = false;

    if(show) {
      this.items.push(item);
      var image = item.content.match('src="(.*?)"');
      console.log(image)
      if(image !== null){
        image = image[1]
      }

      $(this.column).prepend("<div id=" + this.listId + "-" + (this.items.length - 1) +" class=\"listItem " + state + " " + this.Category + "item_" + (this.items.length - 1) + "\" ><a href=\"#\"><div class=\"itemThumb\" ></div><h4>" + item.title + "</h4><div style=\"clear:both;\"></div</a></div>");

      $("#" + this.listId + "-" + (this.items.length - 1)).live('click', function(e){
        console.log('click')
        var article = $(this).attr('id').split("-");
        loadArticle(article[0], article[1])
      })

      var collumWidth = ($("." + this.Category + "item_" + (this.items.length - 1)).parent().parent().parent().width() / 100) * 25;
      collumWidth = collumWidth / 100 * 75;

      $("." + this.Category + "item_" + (this.items.length - 1) + " h4").css({
        'width' : collumWidth - 15
      });

      ///THUMB PRELOAD

      this.loadImage(image, "." + this.Category + "item_" + (this.items.length - 1));

      //notifications
      if(this.isLoaded && this.notifications) {

        var thumbIcon = "icons/Noti_thumb.png"

        var text = item.contentSnippet.substring(0, 80) + '...';
        var notification = window.webkitNotifications.createNotification(thumbIcon, item.title, this.Category);
        notification.show();
        setTimeout(function() {
          notification.cancel();
        }, 10000);
      }
    }
  }

  this.loadImage = function(image, where) {
    var img = new Image();
    $(img).load(function() {
      $(where).find(".itemThumb").append(this);

      var imgW = this.width;
      var imgH = this.height;

      var ratio = imgH / imgW;
      imgW = $(where).find(".itemThumb").width();
      imgH = $(where).find(".itemThumb").width() * ratio;

      if(imgH < $(where).find(".itemThumb").height()) {
        imgH = $(where).find(".itemThumb").height();
        imgW = imgH / ratio;
      }

      var marginLeft = $(where).find(".itemThumb").width() - imgW;
      var marginTop = $(where).find(".itemThumb").height() - imgH;

      $(this).css({
        "marginLeft" : (marginLeft / 2),
        "marginTop" : marginTop / 2
      })

      $(this).width(imgW).height(imgH)

    }).error(function() {
      // notify the user that the image could not be loaded
    }).attr({
      'src' : image,
      'class' : 'itemThumbImg'
    });
  }

  this.loadItem = function(id) {
    var item = this.items[id];
    //alert(item.title);
    $(this.articleField).append("<div class=\"inner\"><h2>" + item.title + "</h2>" + item.content + "</div>");
    $(this.articleField).find("a").attr("target", "_blank");

    var source = getSource(this.articleField);
    removeExtras(this.articleField);

    $(this.articleField + " .inner").append("<br><br><small style=\"float:right; margin-right:10px;\">Author: " + item.author + "</small><small>Date of publication: " + new Date(item.publishedDate).format("d-m-Y h:i A") + "<br>Source: " + source + "</small>");

  }
}

function Refresh() {
  for(var i = 0; i < lists.length; i++) {
    lists[i].refresh();
  }
}

function loadArticle(listID, articleID) {
  console.log('load article '+ articleID)
  var list = lists[listID];
  var item = lists[listID].items[articleID];

  $(list.column).find(".selected").removeClass("selected").addClass("lightGradient");
  //alert($(list.column).find(".selected").html());

  $(list.column).find("." + list.Category + "item_" + articleID).removeClass("lightGradient").addClass("selected");

  $(list.articleField).fadeOut(300, function() {
    $(this).empty();
    $(this).append("<div class=\"inner\"><h2>" + item.title + "</h2>" + item.content + "</div>").fadeIn(300);
    $(this).find("a").attr("target", "_blank");

    var source = getSource(list.articleField);
    removeExtras(list.articleField);

    $(list.articleField + " .inner").append("<br><br><small style=\"float:right; margin-right:10px;\">Author: " + item.author + "</small><small>Date of publication: " + new Date(item.publishedDate).format("d-m-Y h:i A") + "<br>Source: " + source + "</small>");

  });
}

function getSource(item) {

  var source = "Engadget";
  $(item).find("img").each(function() {
    if($(this).attr("alt") == "source" || $(this).attr("src") == "http://www.blogsmithmedia.com/www.engadget.com/media/post_label_VIA.gif") {
      source = $(this).next().text();
    }
  });
  return source;

}

function removeExtras(item) {
  //DELETE EXTRA's

  var test = $(item).html().split("<h6 style=\"clear:both;padding:8px 0 0 0;height:2px;font-size:1px;border:0;margin:0;padding:0\"");
  $(item).empty().append(test[0])

  ///BACKUP

  $("p").each(function() {
    if($(this).attr("style") == "padding:5px;background:#ddd;border:1px solid #ccc;clear:both") {
      $(this).remove();
    }
  });

  $(item).find("a").each(function() {
    if($(this).attr("rel") == "bookmark" || $(this).attr("title") == "Send this entry to a friend via email" || $(this).attr("title") == "View reader comments on this entry") {
      $(this).remove();
      //$(this).after().hide();

    }
  });

  $(item).find("img").each(function() {
    if($(this).attr("alt") == "source" || $(this).attr("src") == "http://www.blogsmithmedia.com/www.engadget.com/media/post_label_VIA.gif") {
      $(this).remove();
      //$(this).after().hide();

    }
  });

  $(item).find("span a").each(function() {
    $(this).remove();
  });
  //FIX IFRAMES

  $("iframe").each(function() {
    var src = $(this).attr('src');
    src = src.split("/embed/");

    $(this).parent().append("<object width=\"695\" height=\"380\"><param name=\"movie\" value=\"http://www.youtube.com/v/" + src[1] + "\"></param><param name=\"allowFullScreen\" value=\"true\"></param><param name=\"allowscriptaccess\" value=\"always\"></param><embed src=\"http://www.youtube.com/v/" + src[1] + "\" type=\"application/x-shockwave-flash\" allowscriptaccess=\"always\" allowfullscreen=\"true\" width=\"695\" height=\"380\"></embed></object>");
    $(this).remove();

  });
}

function about() {

  $("#about").toggle("fade", {}, 200);
}

function offline() {

  $("#offline").toggle("fade", {}, 200);
}

function include(arquivo) {
  var novo = document.createElement('script');
  novo.setAttribute('type', 'text/javascript');
  novo.setAttribute('src', arquivo);
  document.getElementsByTagName('head')[0].appendChild(novo);
}

