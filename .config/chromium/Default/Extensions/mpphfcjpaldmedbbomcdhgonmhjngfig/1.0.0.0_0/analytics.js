// Copyright 2010 Google Inc. All Rights Reserved.

/**
 * @fileoverview Google analytics code.
 *
 * Defines google analytics dependencies.
 *
 * @author cira@google.com (Nebojsa Ciric)
 */

/**
 * gaq is a global request queue for Google analytics requests.
 */
var gaq = gaq || [];

// UA-17452991-1 is our tracking code.
gaq.push(['_setAccount', 'UA-17452991-1']);

// Always track page views.
gaq.push(['_trackPageview']);

/**
 * Injects google analytics script into every page that includes analytics.js.
 */
(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  (document.getElementsByTagName('head')[0] ||
   document.getElementsByTagName('body')[0]).appendChild(ga);
})();
