
var D=true;(function(){Registry.require("pingpong");
Registry.require("crcrc");Registry.require("htmlutil");
Registry.require("i18n");var h=Registry.get("prepare").FEATURES;
var e=Registry.get("crcrc").cr;var m=Registry.get("crcrc").crc;
var q=Registry.get("htmlutil");var o=Registry.get("pingpong");
var j=Registry.get("i18n");var d=function(t,s){t.origin="actions";
chrome.extension.sendMessage(t,s)};var b=function(B,J){var s=document.getElementById("action");
var S=s.parentNode;S.removeChild(s);s=e("span");s.setAttribute("id","action");
S.appendChild(s);var F=m("table","actionlayout","actionlayout");
s.appendChild(F);var T=m("tr","actionpostr","hor");
var N=m("td","actionpostd","hor_west");var I;T.appendChild(N);
F.appendChild(T);if(h.ACTIONMENU.COLUMNS===2&&J.enabled){I=m("td","actionpostd","hor_east");
T.appendChild(I)}else{I=N}var u=m("div","actionregion","top");
var E=m("div","actionregion","right");var v=m("div","actionregion","left");
var ab=m("div","actionregion","bottom");N.appendChild(u);
I.appendChild(E);N.appendChild(v);N.appendChild(ab);
var A={top:u,left:v,right:E,bottom:ab};var ac=0;for(var U in B){var W=B[U];
var ad=m("tr","actiontr",U.toString());var H;if(W.section){F=m("table","actiontable","actiontable-"+W.name);
if(!A[W.pos]){console.warn("Warn(cAm): unknown pos "+W.pos);
return}A[W.pos].appendChild(F)}else{var G=m("td","imagetd actionimagetd",W.name,W.id);
var C=m("td","actiontd",W.name,W.id);var ag=m("div","actionitem",W.name,W.id,"ai",true);
C.appendChild(ag);if(W.image){image=q.createImage(W.image,W.name,W.id,null,"");
G.appendChild(image)}if(W.checkbox){var t=document.createElement("input");
t.type="checkbox";t.name=W.name;t.id="enabled";t.checked=W.enabled;
var Q=function(){f(this.name,this.id,this.checked)};
t.addEventListener("click",Q);H=document.createElement("span");
H.textContent=W.name;ag.appendChild(t);ag.appendChild(H)
}else{if(W.url||W.urls){var L=W.urls||[W];C.setAttribute("colspan","2");
for(var Z=0;Z<L.length;Z++){var V=L[Z];H=document.createElement("span");
H.textContent=V.name;var M=W.urls?H:C;M.url=V.url;M.newtab=V.newtab;
var z=function(){k(this.url,this.newtab)};M.addEventListener("click",z);
M.setAttribute("class",M.getAttribute("class")+" clickable");
ag.appendChild(H);if(Z<L.length-1){var K=document.createElement("span");
K.textContent=" | ";ag.appendChild(K)}}}else{if(W.menucmd){var af=document.createElement("span");
C.id=W.id;var Q=function(){p(this.id)};C.addEventListener("click",Q);
C.setAttribute("class",C.getAttribute("class")+" clickable");
af.textContent=W.name;if(W.accessKey){var P=W.accessKey[0].toUpperCase();
if(c(P,Q,C)){var R=new RegExp(P,"i");var S=af.textContent.search(R);
var U=[];if(S==-1){af.textContent+=" ("+P+")";S=af.textContent.search(R)
}U.push(af.textContent.substr(0,S));U.push('<span class="underlined">');
U.push(af.textContent.substr(S,1));U.push("</span>");
U.push(af.textContent.substr(S+1));af.innerHTML=U.join("")
}else{console.warn("Registering keyboard shortcut for '"+W.name+"' failed")
}}C.setAttribute("colspan","2");ag.appendChild(af)}else{if(W.button){var O=function(){var y=true;
if(this.warning){y=i(this.warning)}if(y){n(this.key,{reload:this.reload})
}};var ae=m("span",(W.display||""),name,W.id,"bu",true);
ae.textContent=W.name;C.key=W.id;C.warning=W.warning;
C.reload=W.reload;C.addEventListener("click",O);C.setAttribute("class",C.getAttribute("class")+" clickable");
C.setAttribute("colspan","2");ag.appendChild(ae)}else{if(W.userscript||W.user_agent){if(W.id){var w=W.enabled?chrome.extension.getURL("images/greenled.png"):chrome.extension.getURL("images/redled.png");
var X=function(y){if(y&&y.button&2||y.button&1||y.ctrlKey){window.open(chrome.extension.getURL("options.html")+"?open="+this.key);
y.stopPropagation()}else{f(this.name,"enabled",!this.oldvalue)
}};var x=(W.position>0)?((W.position<10)?" "+W.position:W.position):null;
var Y=q.createImageText(w,W.name,"enabled","enabled",W.enabled?j.getMessage("Enabled"):j.getMessage("Disabled"),X,x);
Y.oldvalue=W.enabled;G.appendChild(Y);ag.name=W.name;
ag.oldvalue=W.enabled;ag.key=W.id;ag.addEventListener("click",X);
C.setAttribute("class",C.getAttribute("class")+" clickable")
}H=document.createElement("span");H.textContent=W.name;
C.setAttribute("colspan","2");ag.appendChild(H)}else{H=document.createElement("span");
H.textContent=W.name;C.setAttribute("colspan","2");
ag.appendChild(H)}}}}}if(W.tamperfire){var aa=function(){var ai=H;
var ah=image;var aj=W.doneImage;var y=function(ak,al){if(ai){if(al){ai.textContent=al
}else{ai.textContent=ai.textContent.replace("?",Number(ak))
}}if(ah){ah.setAttribute("src",aj)}};if(W.tabid){a(W.tabid,y)
}else{G=null;C=null}};aa()}if(G){ad.appendChild(G)}if(C){ad.appendChild(C)
}}F.appendChild(ad)}};var k=function(t,s){try{var v=function(w){chrome.tabs.sendMessage(w.id,{method:"loadUrl",url:t,newtab:s},function(x){})
};if(s){d({method:"openInTab",url:t},function(w){})
}else{chrome.tabs.getSelected(null,v)}}catch(u){console.warn("Error(lU):",u)
}};var i=function(t){var u=confirm(t.msg);var s={};
if(u&&t.ok){s=t.ok}else{if(!u&&t.cancel){s=t.cancel
}}if(t.ok||t.cancel){u=true}if(s.url){d({method:"openInTab",url:s.url},function(v){})
}return u};var n=function(t,s){try{d({method:"buttonPress",name:t},function(v){if(s.reload){window.location.reload()
}})}catch(u){console.warn("Error(rSU):",u)}};var r={};
var l=function(u,s,v){var t=function(x){if(D){console.log("MenuCmdKeyListener: check event",x)
}if(!(x.altKey||x.ctrlKey||x.shiftKey)){for(var y in r){if(!r.hasOwnProperty(y)){continue
}var w=r[y];if(w&&x.keyCode==w.key){if(D){console.log("MenuCmdKeyListener: ... found",x.keyCode,String.fromCharCode(x.keyCode))
}w.cb.apply(w.elem||window,[])}}}};document.body.addEventListener("keydown",t,false)
};var c=function(u,s,v){if(D){console.log("MenuCmdKeyListener: register accessKey "+u)
}var t=u.charCodeAt(0);if(r[t]){if(D){console.log("MenuCmdKeyListener: ...failed!")
}return false}r[t]={key:t,cb:s,elem:v};return true};
var p=function(t){try{d({method:"execMenuCmd",id:t},function(u){})
}catch(s){console.warn("Error(eMC):",s)}};var a=function(t,s){try{var v=function(x){var z=null;
if(x.progress){var w=x.progress.action+"... ";if(!w||w==""){w=""
}var y="";if(x.progress.state&&x.progress.state.of){y=" "+Math.round(x.progress.state.n*100/x.progress.state.of)+"%"
}z=(w!=""||y!="")?w+y:null}s(x.cnt,z)};d({method:"getFireItems",countonly:true,tabid:t},v)
}catch(u){console.warn("Error(gFI):",u)}};var f=function(t,x,v){try{var u={method:"modifyScriptOptions",name:t};
if(x&&x!=""){u[x]=v}d(u,function(s){if(s){if(s.i18n){j.setLocale(s.i18n)
}if(s.items){b(s.items,s.options)}}});document.getElementById("action").innerHTML=j.getMessage("Please_wait___")
}catch(w){console.warn("Error(mSo): "+w.message)}};
chrome.extension.onMessage.addListener(function(u,t,s){if(D){console.log("onMessage: method "+u.method)
}if(false&&u.method=="updateActions"){b(u.items,response.options);
s({})}else{if(D){console.log("onMessage: Unknown method '"+u.method+"'")
}}});var g=function(){window.removeEventListener("DOMContentLoaded",g,false);
window.removeEventListener("load",g,false);var x=null;
var v=null;var t=function(){if(x){window.clearTimeout(x)
}x=null;if(v){v.parentNode.removeChild(v)}v=null};var s=function(){v=document.createElement("img");
v.setAttribute("src","images/large-loading.gif");document.getElementById("action").appendChild(v)
};var w=function(){t();f(null,false)};var u=function(){t();
if(confirm(j.getMessage("An_internal_error_occured_Do_you_want_to_visit_the_forum_"))){window.open("http://tampermonkey.net/bug")
}};x=window.setTimeout(s,500);o.ping(w,u);l()};window.addEventListener("DOMContentLoaded",g,false);
window.addEventListener("load",g,false)})();