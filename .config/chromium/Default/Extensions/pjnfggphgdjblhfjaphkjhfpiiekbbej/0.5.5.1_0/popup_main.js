var g=!1,i=function(a,b){function c(){}c.prototype=b.prototype;a.e=b.prototype;a.prototype=new c};/*
 Copyright 2009 Google Inc.  All Rights Reserved.
 Your use of this software is subject to the Terms of Service located
 at https://chrome.google.com/extensions/intl/en/gallery_tos.html.
*/
var j=function(){this.d=this.c=this.url=this.b=this.title=""},k=function(){this.a=[];this.parseError=g},l=function(a){j.call(this);if(a.getElementsByTagName("CT_URL").length)this.b=a.getElementsByTagName("CT_URL")[0].textContent;if(a.getElementsByTagName("U").length)this.url=a.getElementsByTagName("U")[0].textContent;if(a.getElementsByTagName("T").length)this.title=a.getElementsByTagName("T")[0].textContent;if(a.getElementsByTagName("PREVIEW_IMG").length)this.c=a.getElementsByTagName("PREVIEW_IMG")[0].textContent;
if(a.getElementsByTagName("S").length)this.d=a.getElementsByTagName("S")[0].textContent.replace(/<br>/g,"")};i(l,j);var m=function(a){k.call(this);if(a.firstChild&&a.getElementsByTagName("GSP").length){if(a=a.getElementsByTagName("GSP")[0],a.getElementsByTagName("RES").length)for(var a=a.getElementsByTagName("RES")[0].getElementsByTagName("R"),b=0;b<a.length;b++){var c=new l(a[b]);""!=c.b&&""!=c.url&&this.a.push(c)}}else this.parseError=!0};i(m,k);/*
 Copyright 2009 Google Inc.  All Rights Reserved.
 Your use of this software is subject to the Terms of Service located
 at https://chrome.google.com/extensions/intl/en/gallery_tos.html.
*/
var o=function(){var a=document.createElement("div"),b=document.createElement("img");b.id="sp_logo";b.src="http://www.google.com/images/logos/similar_pages_logo_sm.gif";a.appendChild(b);a.appendChild(n());return a},n=function(){var a=document.createElement("img");a.id="sp_close_button";a.src=chrome.extension.getURL("images/button_x.png");a.addEventListener("click",function(){window.close()},g);return a},p=function(){var a=document.createElement("div");a.className="SP_ZeroResultsContainer";a.appendChild(n());
var b=document.createElement("span");b.innerHTML=chrome.i18n.getMessage("sp_zero_results");a.appendChild(b);document.body.appendChild(a)},q=function(a){var b=document.createElement("div");b.className="SP_SpecialCaseContainer";var c=o();b.appendChild(c);c=document.createElement("span");c.innerHTML=a;b.appendChild(c);document.body.appendChild(b)},s=function(a,b){var c=document.createElement("div");c.id="page_"+b;c.className=" SP_PageEntry ";var d=chrome.i18n.getMessage("sp_redirect_host")+a.b,e=document.createElement("a");
e.className="SP_ImageAnchor";e.href=d;e.target="_blank";e.addEventListener("click",function(){window.close()},g);var h=document.createElement("div");h.className="SP_ImageWrapper";var f=document.createElement("img");f.id="thumb_"+b;f.className="SP_ImageThumb";r(f);f.src=a.c;h.appendChild(f);e.appendChild(h);c.appendChild(e);e=document.createElement("div");e.className="SP_PageEntryText";h=document.createElement("div");h.style.width="800px";f=document.createElement("a");f.addEventListener("click",function(){window.close()},
g);f.target="_blank";f.innerHTML=a.title;f.href=d;f.title=a.title.replace("<b>","").replace("</b>","");h.appendChild(f);e.appendChild(h);d=document.createElement("span");d.innerHTML=a.d;e.appendChild(d);d=document.createElement("div");d.style.width="800px";d.style.color="green";d.innerHTML=a.url;e.appendChild(d);c.appendChild(e);return c},r=function(a){var b=a.id;a.addEventListener("error",function(){var a=document.getElementById(b),d=a.parentNode;d.className+=" SP_ImageNotFound ";d.removeChild(a);
a=document.createElement("span");a.innerHTML=chrome.i18n.getMessage("sp_preview_not_available");d.appendChild(a)},g)};var u=function(a){var b=t,c=new XMLHttpRequest;c.open("GET",a,g);c.onreadystatechange=function(){4==c.readyState&&200==c.status&&b(c.responseXML)};try{c.send()}catch(d){}},v=function(a,b){var c=a.id;chrome.tabs.getAllInWindow(null,function(d){for(var e=1;e<d.length;++e)if(d[e].id==c){b(d[e-1]);return}b(a)})};/*
 Copyright 2009 Google Inc.  All Rights Reserved.
 Your use of this software is subject to the Terms of Service located
 at https://chrome.google.com/extensions/intl/en/gallery_tos.html.
*/
var w=/(chrome|http?:\/\/chrome\.google\.com\/extensions)/,x=/^chrome-extension:\/\/[a-z]+\/popup\.html$/,t=function(a){var b=new m(a);if(b.parseError)a=document.createElement("div"),a.className="SP_ZeroResultsContainer",a.appendChild(n()),b=document.createElement("span"),b.innerHTML=chrome.i18n.getMessage("sp_error"),a.appendChild(b),document.body.appendChild(a);else if(b.a.length){a=document.createElement("div");a.className="SP_MainContainer";var c=o();a.appendChild(c);c=document.createElement("div");
c.id="sp_results";a.appendChild(c);document.body.appendChild(a);document.addEventListener("keydown",y,g);if(b.a.length)for(var a=document.getElementById("sp_results"),b=b.a,c=Math.min(b.length,4),d=0;d<c;d++){var e=s(b[d],d);a.appendChild(e)}}else p()},y=function(a){27==a.keyCode&&window.close()},z=function(a,b){0==a.search(w)?q(chrome.i18n.getMessage("sp_chrome_special_case_text")):0==a.indexOf("https")?q(chrome.i18n.getMessage("sp_chrome_https_case_text")):b?"http://www.google.cn/"==b?q(chrome.i18n.getMessage("sp_tld_special_case_text")):
b&&u(b+"search?output=br&q=related:"+encodeURIComponent(a)):p()};chrome&&chrome.tabs.getSelected(null,function(a){var b=a.url,c=window.localStorage.request_domain;-1==b.search(x)?z(b,c):v(a,function(a){z(a.url,c)})});