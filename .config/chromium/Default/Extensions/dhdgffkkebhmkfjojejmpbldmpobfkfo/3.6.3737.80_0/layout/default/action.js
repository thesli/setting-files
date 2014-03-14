
var D=true;Registry.require(["pingpong","crcrc","htmlutil","i18n"],function(){var d=Registry.prepare();
var f=Registry.get("crcrc").cr;var g=Registry.get("crcrc").crc;
var c=Registry.get("htmlutil");var a=Registry.get("pingpong");
var b=Registry.get("i18n");var e=Registry.get("layout");
e.render(function(){var n=function(){var t=document.createElement("style");
t.innerHTML=Registry.getRaw("/layout/default/style.css");
(document.head||document.body||document.documentElement||document).appendChild(t)
};n();var r=(function(){return{get:function(t){return chrome.extension.getURL("/layout/default/"+({download:"images/download.gif",fire:"images/fire.png",info:"images/info.png",script_download:"images/script_download.png",script_add:"images/script_add.png",bug:"images/bug.png",donation:"images/amor.png",critical:"images/critical.png",update:"images/update.png",utilities:"images/agt_utilities.png",edit_add:"images/edit_add.png",button_ok:"images/button_ok.png",menu_cmd:"images/package_utilities.png"}[t]))
}}})();var j=function(E,L){var t=document.getElementById("action");
var U=t.parentNode;U.removeChild(t);t=f("span");t.setAttribute("id","action");
U.appendChild(t);var H=g("table","actionlayout","actionlayout");
t.appendChild(H);var V=g("tr","actionpostr","hor");
var P=g("td","actionpostd","hor_west");var K;V.appendChild(P);
H.appendChild(V);if(d.ACTIONMENU.COLUMNS===2&&L.enabled){K=g("td","actionpostd","hor_east");
V.appendChild(K)}else{K=P}var w=g("div","actionregion","top");
var G=g("div","actionregion","right");var x=g("div","actionregion","left");
var ad=g("div","actionregion","bottom");P.appendChild(w);
K.appendChild(G);P.appendChild(x);P.appendChild(ad);
var C={top:w,left:x,right:G,bottom:ad};var ae=0;for(var W in E){var Y=E[W];
var af=g("tr","actiontr",W.toString());var J;if(Y.section){H=g("table","actiontable","actiontable-"+Y.name);
if(!C[Y.pos]){console.warn("Warn(cAm): unknown pos "+Y.pos);
return}C[Y.pos].appendChild(H)}else{var I=g("td","imagetd actionimagetd",Y.name,Y.id);
var F=g("td","actiontd",Y.name,Y.id);var ai=g("div","actionitem",Y.name,Y.id,"ai",true);
F.appendChild(ai);var v;if(Y.image){v=c.createImage(r.get(Y.image),Y.name,Y.id,null,"");
I.appendChild(v)}else{if(Y.enabler){v=c.createImage(chrome.extension.getURL(L.enabled?"/layout/default/images/button_ok.png":"/layout/default/images/cancel.png"),Y.name,Y.id,null,"");
I.appendChild(v)}}if(Y.checkbox){var u=document.createElement("input");
u.type="checkbox";u.name=Y.name;u.id="enabled";u.checked=Y.enabled;
var S=function(){q(this.name,this.id,this.checked)};
u.addEventListener("click",S);J=document.createElement("span");
J.textContent=Y.name;ai.appendChild(u);ai.appendChild(J)
}else{if(Y.url||Y.urls){var N=Y.urls||[Y];F.setAttribute("colspan","2");
for(var ab=0;ab<N.length;ab++){var X=N[ab];J=document.createElement("span");
J.textContent=X.name;var O=Y.urls?J:F;O.url=X.url;O.newtab=X.newtab;
var B=function(){m(this.url,this.newtab)};O.addEventListener("click",B);
O.setAttribute("class",O.getAttribute("class")+" clickable");
ai.appendChild(J);if(ab<N.length-1){var M=document.createElement("span");
M.textContent=" | ";ai.appendChild(M)}}}else{if(Y.menucmd){var ah=document.createElement("span");
F.id=Y.id;var S=function(){p(this.id)};F.addEventListener("click",S);
F.setAttribute("class",F.getAttribute("class")+" clickable");
ah.textContent=Y.name;if(Y.accessKey){var R=Y.accessKey[0].toUpperCase();
if(l(R,S,F)){var T=new RegExp(R,"i");var U=ah.textContent.search(T);
var W=[];if(U==-1){ah.textContent+=" ("+R+")";U=ah.textContent.search(T)
}W.push(ah.textContent.substr(0,U));W.push('<span class="underlined">');
W.push(ah.textContent.substr(U,1));W.push("</span>");
W.push(ah.textContent.substr(U+1));ah.innerHTML=W.join("")
}else{console.warn("Registering keyboard shortcut for '"+Y.name+"' failed")
}}F.setAttribute("colspan","2");ai.appendChild(ah)}else{if(Y.button){var Q=function(){var y=true;
if(this.warning){y=k(this.warning)}if(y){i(this.key,{reload:this.reload})
}};var ag=g("span",(Y.display||""),name,Y.id,"bu",true);
ag.textContent=Y.name;F.key=Y.id;F.warning=Y.warning;
F.reload=Y.reload;F.addEventListener("click",Q);F.setAttribute("class",F.getAttribute("class")+" clickable");
F.setAttribute("colspan","2");ai.appendChild(ag)}else{if(Y.userscript||Y.user_agent){if(Y.id){var z=Y.enabled?chrome.extension.getURL("/layout/default/images/greenled.png"):chrome.extension.getURL("/layout/default/images/redled.png");
var Z=function(y){if(y&&y.button&2||y.button&1||y.ctrlKey){window.open(chrome.extension.getURL("options.html")+"?open="+this.key);
y.stopPropagation()}else{q(this.name,"enabled",!this.oldvalue)
}};var A=(Y.position>0)?((Y.position<10)?" "+Y.position:Y.position):null;
var aa=c.createImageText(z,Y.name,"enabled","enabled",Y.enabled?b.getMessage("Enabled"):b.getMessage("Disabled"),Z,A);
aa.oldvalue=Y.enabled;I.appendChild(aa);ai.name=Y.name;
ai.oldvalue=Y.enabled;ai.key=Y.id;ai.addEventListener("click",Z);
F.setAttribute("class",F.getAttribute("class")+" clickable")
}J=document.createElement("span");J.textContent=Y.name;
F.setAttribute("colspan","2");ai.appendChild(J)}else{J=document.createElement("span");
J.textContent=Y.name;F.setAttribute("colspan","2");
ai.appendChild(J)}}}}}if(Y.tamperfire){var ac=function(){var ak=J;
var aj=v;var al=r.get(Y.doneImage);var y=function(am,an){if(ak){if(an){ak.textContent=an
}else{ak.textContent=ak.textContent.replace("?",Number(am))
}}if(aj){aj.setAttribute("src",al)}};if(Y.tabid){s(Y.tabid,y)
}else{I=null;F=null}};ac()}if(I){af.appendChild(I)}if(F){af.appendChild(F)
}}H.appendChild(af)}};var m=function(u,t){try{var w=function(x){chrome.tabs.sendMessage(x.id,{method:"loadUrl",url:u,newtab:t},function(y){})
};if(t){sendMessage({method:"openInTab",url:u},function(x){})
}else{chrome.tabs.getSelected(null,w)}}catch(v){console.warn("Error(lU):",v)
}};var k=function(u){var v=confirm(u.msg);var t={};
if(v&&u.ok){t=u.ok}else{if(!v&&u.cancel){t=u.cancel
}}if(u.ok||u.cancel){v=true}if(t.url){sendMessage({method:"openInTab",url:t.url},function(w){})
}return v};var i=function(u,t){try{sendMessage({method:"buttonPress",name:u},function(w){if(t.reload){window.location.reload()
}})}catch(v){console.warn("Error(rSU):",v)}};var o={};
var h=function(v,t,w){var u=function(y){if(D){console.log("MenuCmdKeyListener: check event",y)
}if(!(y.altKey||y.ctrlKey||y.shiftKey)){for(var z in o){if(!o.hasOwnProperty(z)){continue
}var x=o[z];if(x&&y.keyCode==x.key){if(D){console.log("MenuCmdKeyListener: ... found",y.keyCode,String.fromCharCode(y.keyCode))
}x.cb.apply(x.elem||window,[])}}}};document.body.addEventListener("keydown",u,false)
};var l=function(v,t,w){if(D){console.log("MenuCmdKeyListener: register accessKey "+v)
}var u=v.charCodeAt(0);if(o[u]){if(D){console.log("MenuCmdKeyListener: ...failed!")
}return false}o[u]={key:u,cb:t,elem:w};return true};
var p=function(u){try{sendMessage({method:"execMenuCmd",id:u},function(v){})
}catch(t){console.warn("Error(eMC):",t)}};var s=function(u,t){try{var w=function(y){var A=null;
if(y.progress){var x=y.progress.action+"... ";if(!x||x==""){x=""
}var z="";if(y.progress.state&&y.progress.state.of){z=" "+Math.round(y.progress.state.n*100/y.progress.state.of)+"%"
}A=(x!=""||z!="")?x+z:null}t(y.cnt,A)};sendMessage({method:"getFireItems",countonly:true,tabid:u},w)
}catch(v){console.warn("Error(gFI):",v)}};var q=function(t,x,v){try{var u={method:"modifyScriptOptions",name:t};
if(x&&x!=""){u[x]=v}sendMessage(u,function(y){if(y){if(y.i18n){b.setLocale(y.i18n)
}if(y.items){j(y.items,y.options)}}});document.getElementById("action").innerHTML=b.getMessage("Please_wait___")
}catch(w){console.warn("Error(mSo): "+w.message)}};
chrome.extension.onMessage.addListener(function(v,u,t){if(D){console.log("onMessage: method "+v.method)
}if(false&&v.method=="updateActions"){j(v.items,response.options);
t({})}else{if(D){console.log("onMessage: Unknown method '"+v.method+"'")
}}});sendMessage({method:"modifyScriptOptions"},function(t){h();
if(t){if(t.i18n){b.setLocale(t.i18n)}if(t.items){j(t.items,t.options)
}}})})});