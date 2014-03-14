var c=function(b){var a=new XMLHttpRequest;a.open("GET","http://www.google.com/ncr",!1);a.onreadystatechange=function(){4==a.readyState&&200==a.status&&b(a.responseText)};try{a.send()}catch(d){}};/*
 Copyright 2009 Google Inc.  All Rights Reserved.
 Your use of this software is subject to the Terms of Service located
 at https://chrome.google.com/extensions/intl/en/gallery_tos.html.
*/
function _writeMessage(b,a){document.write(chrome.i18n.getMessage(b,a))}
window.addEventListener("load",function(){var b=window.localStorage.request_domain;if(b){var a=document.getElementById("domain_select_block");a.innerHTML=chrome.i18n.getMessage("sp_domain_message",b.replace("http://","").replace("/",""));"http://www.google.com/"!=b&&(a.innerHTML+=chrome.i18n.getMessage("sp_domain_change_message"));a.innerHTML+="<p>"}(b=document.getElementById("over"))&&b.addEventListener("click",function(){window.localStorage.request_domain="http://www.google.com/";c(function(){var a=
document.getElementById("domain_select_block");a.innerHTML=chrome.i18n.getMessage("sp_domain_clicked_message");a.innerHTML+="<p>"})},!1)},!1);
