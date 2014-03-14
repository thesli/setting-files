
var V=false;var D=false;var UV=false;(function(){var g=false;
var n=null;var f="0.0.0";var j=false;var p=null;var b="???";
if(!window.requestFileSystem){window.requestFileSystem=window.webkitRequestFileSystem
}if(!window.BlobBuilder){window.BlobBuilder=window.WebKitBlobBuilder
}Registry.require("convert");Registry.require("xmlhttprequest");
Registry.require("compat");Registry.require("parser");
Registry.require("crcrc");Registry.require("helper");
Registry.require("i18n");Registry.require("curtain");
Registry.require("tabview");var h=Registry.get("crcrc").cr;
var m=Registry.get("crcrc").crc;var t=Registry.get("convert");
var k=Registry.get("i18n");var s=Registry.get("curtain");
var r=Registry.get("helper");var c=Registry.get("tabview");
var a=Registry.get("xmlhttprequest").run;var e=function(v,u){v.origin="ask";
chrome.extension.sendMessage(v,u)};var o=function(){var B;
var v=document.getElementById("ask");var x=m("div","main_container p100100","ask","main");
if(v){var u=v.parentNode;u.removeChild(v);u.appendChild(x);
document.body.setAttribute("class","main")}if(V){console.log("ask: head")
}var F=m("div","head_container","ask","head_container");
var y=m("div","tv_container","ask","tv_container");
var C=h("a","head_link","ask","head_link");C.href="http://tampermonkey.net";
C.target="_blank";var G=m("div","float margin4","ask","head1");
var w=m("img","banner","ask");w.src=chrome.extension.getURL("images/icon128.png");
var E=m("div","float head margin4","ask","head2");var I=h("div","fire");
var z=m("div","version","version","version");z.textContent=" by Jan Biniok";
var H=h("div","search","box","");I.textContent="Tampermonkey";
G.appendChild(w);E.appendChild(I);E.appendChild(z);
C.appendChild(G);C.appendChild(E);F.appendChild(C);
F.appendChild(H);x.appendChild(F);x.appendChild(y);
var A=c.create("_main",y);B=l(A);g=true;s.hide();return B
};var l=function(v){var w={name:"main",id:"main"};var y=h("div",w.name,w.id,"tab_content_h");
y.textContent=b;var u=h("div",w.name,w.id,"tab_content");
var x=v.appendTab(r.createUniqueId(w.name,w.id),y,u);
return u};var i=function(){if(!window.location.search&&!window.location.hash){window.onhashchange=function(){i()
};return}p=r.getUrlArgs();var u=function(A){window.location=A+"#bypass=true"
};if(p.i18n){k.setLocale(p.i18n)}if(p.script){p.script=t.Base64.decode(p.script);
b=k.getMessage("Install");var w=p.script;var z;s.wait(k.getMessage("Please_wait___"));
var y=function(G){var H=m("div","heading","indzsll","heading");
var A=m("div","nameNname64","install","heading_name");
A.textContent=p.script;H.appendChild(A);z.appendChild(H);
var C=m("div","editor_outer","","");var E=m("div","editor","","");
var B=m("textarea","editorta","","");B.setAttribute("wrap","off");
B.value=G.responseText;z.appendChild(C);C.appendChild(E);
E.appendChild(B);if(!p.nocm){var F=B.parentNode;F.removeChild(B);
z.editor=new MirrorFrame(F,{value:G.responseText,noButtons:true,matchBrackets:true})
}};var v=function(B){if(B.readyState==4){s.hide();if(B.status==200||B.status==0){var A=Registry.get("parser").createScriptFromSrc(B.responseText);
if(!A.name||A.name==""||(A.version==undefined)){console.warn("ask: unable to parse source from "+w);
u(w);return}z=o();y(B);var C=function(){var F={file_url:w};
var E=function(G){if(!G.installed){u(w)}};q(A.name,A.textContent,F,E)
};window.setTimeout(C,500)}else{console.warn("ask: unable to load source from "+w);
u(w)}}};var x={method:"GET",url:w,retries:3};a(x,{onload:v})
}else{o()}};var q=function(w,x,v,u){try{e({method:"installScript",name:w,code:x,file_url:v.file_url},function(z){s.hide();
if(u){u(z)}});s.wait(k.getMessage("Please_wait___"))
}catch(y){console.log("sS: "+y.message)}};chrome.extension.onMessage.addListener(function(w,v,u){if(V){console.log("a: method "+w.method)
}if(w.method=="confirm"){var x=function(y){u({confirm:y})
};r.confirm(w.msg,x)}else{if(w.method=="showMsg"){r.alert(w.msg);
u({})}else{if(V){console.log("a: "+k.getMessage("Unknown_method_0name0",w.method))
}return false}}return true});if(V){console.log("Register request listener (ask)")
}var d=function(){window.removeEventListener("DOMContentLoaded",d,false);
window.removeEventListener("load",d,false);i()};window.addEventListener("DOMContentLoaded",d,false);
window.addEventListener("load",d,false)})();