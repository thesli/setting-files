// "Photo Zoom for Facebook" v1.1312.1.2
// Everything is (c) Copyright by Regis Gaughan, III <regis.gaughan@gmail.com>.
// All rights reserved.

!function(a){var b={},c=+new Date;b.uniqueID=function(){return(c++).toString(36)};var d,e=[];b.onLoad=function(a){if("complete"===document.readyState)a();else{e.push(a),d&&clearTimeout(d);var b=function(){if("complete"===document.readyState)for(var a=0,c=e.length;c>a;a++)e[a]();else d=setTimeout(b,10)};d=setTimeout(b,10)}},b.createElement=function(b,c,d){d=d||a.document;var e=d.createElement(b);return c&&this.setProperties(e,c),e},b.setProperties=function(a,c){for(var d in c)b.setProperty(a,d,c[d])},b.setProperty=function(a,c,d){return"style"!=c&&"styles"!=c||"object"!=typeof d?("html"==c?c="innerHTML":"text"==c&&(c="textContent"),a["class"==c?"className":c]=d,a):b.setStyles(a,d)},b.addClass=function(a,c){b.removeClass(a,c),a.className+=" "+c},b.removeClass=function(a,b){a.className=a.className.replace(new RegExp("(^|\\s)"+b+"(?:\\s|$)"),"$1")},b.camelCase=function(a){return a.replace(/-\D/g,function(a){return a.charAt(1).toUpperCase()})},b.setStyles=function(a,b){for(var c in b)this.setStyle(a,c,b[c]);return a},b.setStyle=function(a,b,c){if("opacity"==b)void 0!==a.style.opacity?a.style.opacity=c:void 0!==a.style.MozOpacity?a.style.MozOpacity=c:void 0!==a.style.msFilter?a.style.msFilter="progid:DXImageTransform.Microsoft.Alpha(Opacity="+100*c+")":void 0!==a.style.filter&&(a.style.filter="alpha(opacity="+100*c+")");else{if("box-shadow"==b)return this.setStyle(a,"-moz-box-shadow",c),this.setStyle(a,"-webkit-box-shadow",c),a.style[this.camelCase(b)]=c,a;"float"==b&&(b="cssFloat"),a.style[this.camelCase(b)]=c}return a},b.getEvent=function(b){return b?b:b=a.event},b.preventEventDefault=function(a){return a=this.getEvent(a),a&&(a.preventDefault?a.preventDefault():a.returnValue=!1),!1},b.getEventTarget=function(b){var c;return b=b||a.event,b.target?c=b.target:b.srcElement&&(c=b.srcElement),3==c.nodeType&&(c=c.parentNode),c},b.merge=function(a){var b,c,d,e;for(b=1,c=arguments.length;c>b;b++){d=arguments[b];for(e in d)d.hasOwnProperty(e)&&(a[e]=d[e])}return a},b.setOptions=function(a,b){var c={};b=b||{};for(var d in a)a.hasOwnProperty(d)&&(c[d]="undefined"!=typeof b[d]?b[d]:a[d]);return c},b.toQueryString=function(a){a=a||{};var b="?";for(var c in a)b+=c+"="+a[c]+"&";return b.replace(/\&$/,"")},a.util=b}(this),function(a){var b,c;c=chrome.storage.local,b=a.proxy={getExtDetails:function(a){chrome.extension.sendRequest({name:"getExtDetails"},a)},setEnabled:function(a){c.set({enabled:!!a})},log:function(){},openImage:function(){}},b.storage={get:function(){c.get.apply(c,arguments)},set:function(){c.set.apply(c,arguments)},addListener:function(a){chrome.storage.onChanged.addListener(a)}}}(this),function(a){"use strict";function b(){var a={delay:i('input[name="delay"]').value>5e3?5e3:i('input[name="delay"]').value<0?0:i('input[name="delay"]').value,fadeInDuration:i('input[name="fadeInDuration"]').value>1e3?1e3:i('input[name="fadeInDuration"]').value<0?0:i('input[name="fadeInDuration"]').value,fadeOutDuration:i('input[name="fadeOutDuration"]').value>1e3?1e3:i('input[name="fadeOutDuration"]').value<0?0:i('input[name="fadeOutDuration"]').value,enableShortcut:i('select[name="enable_shortcut"]').value,forceZoomKey:i('select[name="force_zoom_key"]').value,forceHideKey:i('select[name="force_hide_key"]').value};g.storage.set(a,function(){c()})}function c(){g.storage.get(["enabled","showCaptions","disableTheater","enableShortcut","forceZoomKey","forceHideKey","opacity","delay","fadeInDuration","fadeOutDuration","debug"],function(a){i('select[name="enable_shortcut"]').value=a.enableShortcut||90,i('select[name="force_zoom_key"]').value=a.forceZoomKey||-1,i('select[name="force_hide_key"]').value=a.forceHideKey||-1,i('input[name="delay"]').value=a.delay||50,i('input[name="fadeInDuration"]').value=a.fadeInDuration?a.fadeInDuration:150,i('input[name="fadeOutDuration"]').value=a.fadeOutDuration?a.fadeOutDuration:150})}function d(){g.storage.set({exposedSettings:!1}),i(".settings-overlay").style.display="block",i('select[name="enable_shortcut"]').value=90,i('select[name="force_zoom_key"]').value=-1,i('select[name="force_hide_key"]').value=-1,i('input[name="delay"]').value=50,i('input[name="fadeInDuration"]').value=150,i('input[name="fadeOutDuration"]').value=150,b()}function e(){g.storage.set({exposedSettings:!0}),i(".settings-overlay").style.display="none"}function f(a){var b,c,d=j("body > section > nav > *"),e=j("body > section > section");for(b=0,c=d.length;c>b;b++)d[b].className=d[b].className.replace(/\s?selected/,""),e[b].className=e[b].className.replace(/\s?selected/,"");i("#"+a).className=i("#"+a).className+" selected",i("#"+a+"_nav").className=i("#"+a+"_nav").className+" selected"}var g=a.proxy,h=a.util,i=function(a,b){return(b||document).querySelector(a)},j=function(a,b){return(b||document).querySelectorAll(a)};a.addEventListener("hashchange",function(){f(location.hash.replace(/^\#/,""))}),h.onLoad(function(){var a=navigator.userAgent;/firefox\//i.test(a)?document.body.className+=" browser-firefox":/chrome\//i.test(a)&&(document.body.className+=" browser-chrome"),c(),g.storage.get(["exposedSettings"],function(a){a.exposedSettings&&e()});var h,k,l=j("body > section > nav > a"),m=j("body > section > section");l[0].className=l[0].className+" selected",m[0].className=m[0].className+" selected",location.hash&&f(location.hash.replace(/^\#/,""));var n=j("#settings fieldset label + span"),o=function(a){var b=a.target,c=i('input[type="range"] + span',a.target.parentNode);c.innerHTML=b.value};for(h=0,k=n.length;k>h;h++){var p=n[h],q=i('input[type="range"]',p);if(q){var r=document.createElement("span");r.innerHTML=q.value,q.addEventListener("change",o),p.appendChild(r)}}document.getElementById("viewdebug")&&document.getElementById("viewdebug").addEventListener("click",function(){chrome.extension.getBackgroundPage().openDebugLog()}),i("#advanced_cancel")&&i("#advanced_cancel").addEventListener("click",d),i("#advanced_save")&&i("#advanced_save").addEventListener("click",b),i("#advanced_expose")&&i("#advanced_expose").addEventListener("click",e),g.getExtDetails(function(a){if(a&&a.analyticsId){var b=b||[];b.push(["_setAccount",a.analyticsId]),b.push(["_trackPageview"]),b.push(["_setSampleRate","1"]),function(){var a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://ssl.google-analytics.com/ga.js";var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)}()}})})}(this);