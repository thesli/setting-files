
(function(){var a=null;Registry.require("crcrc",function(){var d=Registry.get("crcrc");
var i=d.cr;var g=d.crc;var j=0;var k=function(q,l,m,p,u){if(!p){p=""
}var v=g("table","curtable"+(u?" "+u:""),l,m,"table"+p);
var s=g("tr",(u?" "+u:""),l,m,"tr2"+p);var r=g("td","curtableoutertd",l,m,"td1"+p);
var o=g("td","curtableinner",l,m,"td2"+p);var n=g("td","curtableoutertd",l,m,"td3"+p);
s.appendChild(r);s.appendChild(o);s.appendChild(n);
v.appendChild(s);if(q){o.appendChild(q)}return v};var b=function(s,l,m,o,v){var n=i("div",l,m,"p"+o);
var r=g("div","curbg",l,m,"c"+o);var q=g("div","curmiddle",l,m,"d"+o);
if(!n.inserted){n.setAttribute("class","curouter hide");
n.setAttribute("style","z-index: "+(l?"10000":"20000"))
}var w=k(s,l,m,o,v);q.appendChild(w);n.appendChild(q);
n.appendChild(r);n.show=function(){n.setAttribute("class","curouter block")
};n.hide=function(){n.setAttribute("class","curouter hide")
};n.remove=function(){if(n.parentNode){n.parentNode.removeChild(n)
}};n.setText=function(p){n.text=p};n.print=function(p){if(n.text){n.text.textContent=p
}};var u=document.getElementsByTagName("body");if(!u.length){console.log("Err: Body not found!")
}else{u[0].appendChild(n)}return n};var c=function(){if(a){window.setTimeout(function(){a.hide()
},1)}};var h=function(n){if(a&&j!=0){a.remove();a=null
}if(n===undefined){n=chrome.i18n.getMessage("Please_wait___")
}if(a){if(n){a.print(n)}a.show();return}var o=function(v){var s=document.createElement("div");
s.setAttribute("class","curcontainer");var r=document.createElement("div");
r.setAttribute("class","curwaithead");var u=document.createElement("div");
u.setAttribute("class","curwaitmsg");var w=document.createElement("div");
var q=document.createElement("div");q.textContent=v;
q.setAttribute("class","curtext");var m=document.createElement("div");
m.innerHTML="<br>";var p=document.createElement("img");
p.src=chrome.extension.getURL("images/large-loading.gif");
w.appendChild(p);u.appendChild(w);u.appendChild(m);
u.appendChild(q);s.appendChild(r);s.appendChild(u);
return{all:s,text:q}};j=0;var l=o(n);a=b(l.all);a.setText(l.text);
a.show()};var e=function(p,o){if(a){a.remove();a=null
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
}});return{all:s,text:C}};j=1;var l=n(o);a=b(l.all);
a.show()};var f={wait:h,hide:c,login:e};Registry.register("curtain","3737.6",f)
})})();