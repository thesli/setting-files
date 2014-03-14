
(function(){var d=null;Registry.require("crcrc");var c=Registry.get("crcrc");
var i=c.cr;var h=c.crc;var j=0;var k=function(q,l,m,p,u){if(!p){p=""
}var v=h("table","curtable"+(u?" "+u:""),l,m,"table"+p);
var s=h("tr",(u?" "+u:""),l,m,"tr2"+p);var r=h("td","curtableoutertd",l,m,"td1"+p);
var o=h("td","curtableinner",l,m,"td2"+p);var n=h("td","curtableoutertd",l,m,"td3"+p);
s.appendChild(r);s.appendChild(o);s.appendChild(n);
v.appendChild(s);if(q){o.appendChild(q)}return v};var a=function(s,l,m,o,v){var n=i("div",l,m,"p"+o);
var r=h("div","curbg",l,m,"c"+o);var q=h("div","curmiddle",l,m,"d"+o);
if(!n.inserted){n.setAttribute("class","curouter hide");
n.setAttribute("style","z-index: "+(l?"10000":"20000"))
}var w=k(s,l,m,o,v);q.appendChild(w);n.appendChild(q);
n.appendChild(r);n.show=function(){n.setAttribute("class","curouter block")
};n.hide=function(){n.setAttribute("class","curouter hide")
};n.remove=function(){if(n.parentNode){n.parentNode.removeChild(n)
}};n.setText=function(p){n.text=p};n.print=function(p){if(n.text){n.text.textContent=p
}};var u=document.getElementsByTagName("body");if(!u.length){console.log("Err: Body not found!")
}else{u[0].appendChild(n)}return n};var b=function(){if(d){window.setTimeout(function(){d.hide()
},1)}};var g=function(n){if(d&&j!=0){d.remove();d=null
}if(n===undefined){n=chrome.i18n.getMessage("Please_wait___")
}if(d){if(n){d.print(n)}d.show();return}var o=function(v){var s=document.createElement("div");
s.setAttribute("class","curcontainer");var r=document.createElement("div");
r.setAttribute("class","curwaithead");var u=document.createElement("div");
u.setAttribute("class","curwaitmsg");var w=document.createElement("div");
var q=document.createElement("div");q.textContent=v;
q.setAttribute("class","curtext");var m=document.createElement("div");
m.innerHTML="<br>";var p=document.createElement("img");
p.src=chrome.extension.getURL("images/large-loading.gif");
w.appendChild(p);u.appendChild(w);u.appendChild(m);
u.appendChild(q);s.appendChild(r);s.appendChild(u);
return{all:s,text:q}};j=0;var l=o(n);d=a(l.all);d.setText(l.text);
d.show()};var e=function(p,o){if(d){d.remove();d=null
}var n=function(H){var s=document.createElement("div");
s.setAttribute("class","curcontainer");var A=document.createElement("div");
A.setAttribute("class","curwaithead");var B=document.createElement("div");
B.setAttribute("class","curwaitmsg");var G=document.createElement("form");
G.setAttribute("action","#login");var C=document.createElement("table");
var L=document.createElement("tr");var K=document.createElement("tr");
var J=document.createElement("tr");var I=document.createElement("tr");
var v=document.createElement("td");v.setAttribute("colspan","2");
v.setAttribute("class","login_hint");var z=document.createElement("td");
var x=document.createElement("td");var F=document.createElement("td");
var E=document.createElement("td");var u=document.createElement("td");
u.setAttribute("colspan","2");var y=document.createElement("span");
var r=document.createElement("span");var w=document.createElement("span");
var D=document.createElement("input");var q=document.createElement("input");
var m=document.createElement("input");if(H){C.appendChild(L)
}C.appendChild(K);C.appendChild(J);C.appendChild(I);
L.appendChild(v);K.appendChild(z);K.appendChild(x);
J.appendChild(F);J.appendChild(E);I.appendChild(u);
z.appendChild(r);x.appendChild(D);F.appendChild(w);
E.appendChild(q);u.appendChild(m);G.appendChild(C);
B.appendChild(G);s.appendChild(A);s.appendChild(B);
if(H){v.textContent=H}r.textContent=chrome.i18n.getMessage("Username");
w.textContent=chrome.i18n.getMessage("Password");m.value=chrome.i18n.getMessage("Login");
D.setAttribute("type","text");D.setAttribute("label","username");
q.setAttribute("type","password");q.setAttribute("label","password");
m.setAttribute("type","submit");m.addEventListener("click",function(){if(p){p(D.value,q.value)
}});return{all:s,text:C}};j=1;var l=n(o);d=a(l.all);
d.show()};var f={wait:g,hide:b,login:e};Registry.register("curtain","3630.77",f)
})();