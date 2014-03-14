
if(!window.requestFileSystem){window.requestFileSystem=window.webkitRequestFileSystem
}if(!window.BlobBuilder){window.BlobBuilder=window.WebKitBlobBuilder
}Registry.require(["layout","xmlhttprequest","convert","crcrc","curtain","tabview","helper","i18n","parser"],function(){var f=Registry.get("crcrc").cr;
var d=Registry.get("crcrc").crc;var b=Registry.get("convert");
var a=Registry.get("parser");var g=Registry.get("i18n");
var e=Registry.get("curtain");var c=Registry.get("helper");
var j=Registry.get("tabview");var i=Registry.get("xmlhttprequest").run;
var h=Registry.get("layout");h.render(function(){var s=function(){var y=document.createElement("style");
y.innerHTML=Registry.getRaw("/layout/default/style.css");
(document.head||document.body||document.documentElement||document).appendChild(y)
};s();var q=false;var l=false;var x=false;var p=false;
var v=null;var u="0.0.0";var m=false;var k=null;var w="???";
var o=function(){var F;var z=document.getElementById("ask");
var B=d("div","main_container p100100","ask","main");
if(z){var y=z.parentNode;y.removeChild(z);y.appendChild(B);
document.body.setAttribute("class","main")}if(q){console.log("ask: head")
}var I=d("div","head_container","ask","head_container");
var C=d("div","tv_container","ask","tv_container");
var G=f("a","head_link","ask","head_link");G.href="http://tampermonkey.net";
G.target="_blank";var J=d("div","float margin4","ask","head1");
var A=d("img","banner","ask");A.src=chrome.extension.getURL("images/icon128.png");
var H=d("div","float head margin4","ask","head2");var L=f("div","fire");
var D=d("div","version","version","version");D.textContent=" by Jan Biniok";
var K=f("div","search","box","");L.textContent="Tampermonkey";
J.appendChild(A);H.appendChild(L);H.appendChild(D);
G.appendChild(J);G.appendChild(H);I.appendChild(G);
I.appendChild(K);B.appendChild(I);B.appendChild(C);
var E=j.create("_main",C);F=n(E);p=true;e.hide();return F
};var n=function(z){var A={name:"main",id:"main"};var C=f("div",A.name,A.id,"tab_content_h");
C.textContent=w;var y=f("div",A.name,A.id,"tab_content");
var B=z.appendTab(c.createUniqueId(A.name,A.id),C,y);
return y};var r=function(){if(!window.location.search&&!window.location.hash){window.onhashchange=function(){r()
};return}k=c.getUrlArgs();var y=function(E){window.location=E+"#bypass=true"
};if(k.i18n){g.setLocale(k.i18n)}if(k.script){k.script=b.Base64.decode(k.script);
w=g.getMessage("Install");var A=k.script;var D;e.wait(g.getMessage("Please_wait___"));
var C=function(J){var K=d("div","heading","indzsll","heading");
var E=d("div","nameNname64","install","heading_name");
E.textContent=k.script;K.appendChild(E);D.appendChild(K);
var G=d("div","editor_outer","","");var H=d("div","editor","","");
var F=d("textarea","editorta","","");F.setAttribute("wrap","off");
F.value=J.responseText;D.appendChild(G);G.appendChild(H);
H.appendChild(F);if(!k.nocm){var I=F.parentNode;I.removeChild(F);
D.editor=new MirrorFrame(I,{value:J.responseText,noButtons:true,matchBrackets:true})
}};var z=function(F){if(F.readyState==4){e.hide();if(F.status==200||F.status==0){var E=a.createScriptFromSrc(F.responseText);
if(!E.name||E.name==""||(E.version==undefined)){console.warn("ask: unable to parse source from "+A);
y(A);return}D=o();C(F);var G=function(){var I={file_url:A};
var H=function(J){if(!J.installed){y(A)}};t(E.name,E.textContent,I,H)
};window.setTimeout(G,500)}else{console.warn("ask: unable to load source from "+A);
y(A)}}};var B={method:"GET",url:A,retries:3};i(B,{onload:z},{internal:true})
}else{o()}};var t=function(A,B,z,y){try{sendMessage({method:"installScript",name:A,code:B,file_url:z.file_url},function(D){e.hide();
if(y){y(D)}});e.wait(g.getMessage("Please_wait___"))
}catch(C){console.log("sS: "+C.message)}};chrome.extension.onMessage.addListener(function(A,z,y){if(q){console.log("a: method "+A.method)
}if(A.method=="confirm"){var B=function(C){y({confirm:C})
};c.confirm(A.msg,B)}else{if(A.method=="showMsg"){c.alert(A.msg);
y({})}else{if(q){console.log("a: "+g.getMessage("Unknown_method_0name0",A.method))
}return false}}return true});if(q){console.log("Register request listener (ask)")
}r()})});