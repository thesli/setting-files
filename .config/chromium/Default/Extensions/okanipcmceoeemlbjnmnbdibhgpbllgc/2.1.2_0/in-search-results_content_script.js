(function(){ /*
 Copyright 2010 Google Inc.  All Rights Reserved.
 Your use of this software is subject to the Terms of Service located
 at https://chrome.google.com/extensions/intl/en/gallery_tos.html.
*/
var isrcs_a=function(a,c,b){return a.call.apply(a.bind,arguments)},isrcs_b=function(a,c,b){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var b=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(b,d);return a.apply(c,b)}}return function(){return a.apply(c,arguments)}},isrcs_=function(a,c,b){isrcs_=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?isrcs_a:isrcs_b;return isrcs_.apply(null,
arguments)},isrcs_c=function(a,c){function b(){}b.prototype=c.prototype;a.superClass_=c.prototype;a.prototype=new b;a.prototype.constructor=a};Function.prototype.bind=Function.prototype.bind||function(a,c){if(1<arguments.length){var b=Array.prototype.slice.call(arguments,1);b.unshift(this,a);return isrcs_.apply(null,b)}return isrcs_(this,a)};Function.prototype.partial=function(a){var c=Array.prototype.slice.call(arguments);c.unshift(this,null);return isrcs_.apply(null,c)};
Function.prototype.inherits=function(a){isrcs_c(this,a)};Function.prototype.mixin=function(a){var c=this.prototype,b;for(b in a)c[b]=a[b]};var isrcs_d=RegExp("https?://(?:.+\\.)?google\\.[a-z]{2,3}(?:\\.[a-z]{2})?(?:\\:[0-9]+)?/(?:advanced_)?search.*(([?&]q=)([^&]+))"),isrcs_e=RegExp("https?://(?:.+\\.)?google\\.[a-z]{2,3}(?:\\.[a-z]{2})?(?:\\:[0-9]+)?/(?:webhp[^#]*)?(#((?:.+&)?q=)([^&]+)(.*)&fp=[^&]+)");Array.prototype.peek=function(){return this[this.length-1]};var isrcs_f=function(a,c,b){this.searchUrl=a;this.query=c;this.ei=b;this.tidbits=[];this.htmlTidbits=[];this.hasEbmTidbits=!0;this.ved=this.href=null;this.seen=this.minimized=!1;this.debug=null;this.fromVisualSnippet=!1;this.vsClickedTidbitIndex=-1};isrcs_f.prototype.setClickedTidbitIndex=function(a){this.vsClickedTidbitIndex=a};isrcs_f.prototype.toString=function(){return"{"+this.href+" ["+this.tidbits.length+" tidbits]}"};var isrcs_g=function(a){return(a=a.match(isrcs_d)||a.match(isrcs_e))?decodeURIComponent(a[3].replace(/\+/g," ")):null},isrcs_h=/kEI\:"([^"]+)"/;var isrcs_k=function(a){var c=document,b=document.location.href,d=jQuery(c).find("#res");if(0==d.length)return[];var f=isrcs_i(c,b),e=[];d.find("li.g").each(function(c,d){e.push(isrcs_j(d,b,f,a))});return e},isrcs_i=function(a,c){var b=jQuery(a).find("#sflas").get(0);return b?isrcs_g(b.href):isrcs_g(c)},isrcs_j=function(a,c,b,d){c=new isrcs_f(c,b,d);b=jQuery(a).find("h3.r > a");if(0<b.length){d=b.get(0).href;var f=d.match(isrcs_l)||d.match(isrcs_m);c.href=f?decodeURIComponent(f[1]):d;b=b.get(0);var e;
b=b.getAttribute("onmousedown")&&(e=b.getAttribute("onmousedown").match(isrcs_n))?e[1]:(e=b.href.match(isrcs_o))?e[1]:null;c.ved=b}isrcs_p(a,c);return c},isrcs_l=/https?:\/\/(?:.+\.)?google\.[a-z]{2,3}(?:\.[a-z]{2})?(?:\:[0-9]+)?\/url.*[?&]url=([^&]+)/,isrcs_m=/https?:\/\/(?:.+\.)?google\.[a-z]{2,3}(?:\.[a-z]{2})?(?:\:[0-9]+)?\/url.*[?&]q=([^&]+)/,isrcs_n=/clk\(this.href,'.*','.*','.*','.*','.*','([^']+)'\)/,isrcs_o=/https?:\/\/(?:.+\.)?google\.[a-z]{2,3}(?:\.[a-z]{2})?(?:\:[0-9]+)?\/url\?(?:q|url)=.+&ved=([^&]+)/,
isrcs_p=function(a,c){var b=jQuery(a).find(".s").first().find(".ft");0==b.length&&(c.hasEbmTidbits=!1,b=jQuery(a).find(".s").first().find(".nft"));b.each(function(a,b){var e;e=b.textContent.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").replace(/\s+/g," ");var g=b.innerHTML;5<=e.length&&(0<c.tidbits.length||!(13>=e.length&&/\d{4}/.test(e)))&&(c.tidbits.push(e),c.htmlTidbits.push(g))})};var _gqs_processResults,isrcs_q=function(){var a;if(!(a=window.google?window.google.kEI:null))t:{var c=document;try{for(var b=c.getElementsByTagName("head")[0].getElementsByTagName("script"),c=0;c<b.length;c++){var d=b[c].text.match(isrcs_h);if(d){a=d[1];break t}}}catch(f){}a=null}(b=isrcs_k(a))&&0<b.length&&chrome.extension.connect({name:"search-results"}).postMessage({results:b});a={ei:a,ved:null};chrome.extension.connect({name:"log-event"}).postMessage({result:a,action:"query"})};isrcs_q();
jQuery(document.body).bind("DOMNodeInserted",function(a){(a=a.target)&&("DIV"==a.tagName&&"med"==a.className||"search"==a.id||"xjsd"==a.id)&&window.setTimeout(isrcs_q,0)});if(/https?:\/\/(?:.+\.)?google\.[a-z]{2,3}(?:\.[a-z]{2})?(?:\:[0-9]+)?\/(?:webhp.*)?$/.test(document.location.href)){var isrcs_r=jQuery('form[action="/search"]');1==isrcs_r.length&&isrcs_r.append('<input type="hidden" name="qscrl" value="1"/>')}; })();