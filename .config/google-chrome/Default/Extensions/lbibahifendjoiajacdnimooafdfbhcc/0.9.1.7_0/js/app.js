      //      google.setOnLoadCallback(function() { Init(true);
      //      });
      if(navigator.onLine)
        google.load('feeds', '1');

      $(document).ready(function() {
        console.log("ready")
        Init(true);
      })

      // Google analytics
      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-22567372-2']);
      _gaq.push(['_trackPageview']);
      (function() {
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = 'https://ssl.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
      })();

