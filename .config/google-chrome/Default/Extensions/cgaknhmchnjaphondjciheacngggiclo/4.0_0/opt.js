// Facepad - Extension for Google Chrome, Copyright (c) 2012 Mixesoft. All Rights Reserved
(function(){function j(){"complete"==document.readyState?(chrome.extension.sendRequest(JSON.stringify({id:3}),function(a){c("w7").style.display="none";if(document.domain===l)for(var b=0;15>b;b++){var m=c("w"+b);m&&(m.textContent=f("w"+b))}c("m1").textContent=chrome.i18n.getMessage("m1",a.opt.v);if("?v=n"==location.search||"?v=u"==location.search)c("m0").textContent=chrome.i18n.getMessage("m0",a.opt.v),c("m0").style.display="block";k("notify",f("m2"),a.opt.notify);k("nd",f("m3"),a.opt.nd,1,!c("notify").checked);
k("ns",f("m4"),a.opt.ns,1,!c("notify").checked);k("auto",f("m5"),a.opt.auto);e=a.opt.i;a=document.createElement("li");b=document.createElement("span");a.id="autoi";a.className="sub";a.setAttribute("disabled",!c("auto").checked);b.textContent=f("m6");b.style.marginRight="10px";a.appendChild(b);c("opt").appendChild(a);d("ai300000","5");d("ai600000","10");d("ai900000","15");d("ai1200000","20");d("ai1800000","30");d("ai2700000","45");d("ai3600000","60");b=document.createElement("span");b.textContent=
f("m7");a.appendChild(b);(a=c("ai"+e))||(e=3E5);c("ai"+e).checked=!0}),document.documentElement.style.webkitTransition="opacity .5s",document.documentElement.style.opacity=1):500==n?document.location.href="chrome-extension://"+l+"/opt.html"+location.search:setTimeout(j,250);n++}function p(a,b){chrome.extension.sendRequest(JSON.stringify({id:4,name:a,value:b}))}function q(){p(this.id,this.checked);var a=this.parentElement;if("sub"!=a.className)for(a=a.nextElementSibling;a&&"sub"==a.className;)a.setAttribute("disabled",
!this.checked),a=a.nextElementSibling}function k(a,b,f,e,d){var h=document.createElement("li"),g=document.createElement("label"),i=document.createElement("input");g.textContent=b;g.setAttribute("for",a);i.type="checkbox";i.id=a;i.checked=f;h.appendChild(i);h.appendChild(g);e?(h.className="sub",h.setAttribute("disabled",d)):h.className="opt";c("opt").appendChild(h);i.addEventListener("click",q,!1)}function r(){c("ai"+e).checked=!1;e=parseInt(this.id.slice(2));this.checked=!0;p("i",e)}function d(a,
b){var f=c("autoi"),e=document.createElement("label"),d=document.createElement("input");d.type="radio";d.id=a;f.appendChild(d);e.textContent=b;e.setAttribute("for",a);f.appendChild(e);d.addEventListener("click",r,!1)}function c(a){return document.getElementById(a)}function f(a){return chrome.i18n.getMessage(a)}var n=0,e,l="cgaknhmchnjaphondjciheacngggiclo";if("mixesoft.com"===document.domain)j();else try{var g=new XMLHttpRequest;g.onreadystatechange=function(){4==g.readyState&&(g.responseText?document.location.href=
"http://mixesoft.com/facepad/webopt.html"+location.search:j())};g.open("GET","http://mixesoft.com/facepad/i.json?t="+(new Date).getTime(),!0);g.send()}catch(s){j()}})();