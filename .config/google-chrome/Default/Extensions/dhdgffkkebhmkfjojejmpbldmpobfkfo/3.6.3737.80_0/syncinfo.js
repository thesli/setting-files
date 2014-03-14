
(function(){Registry.require("xmlhttprequest");var b=Registry.get("xmlhttprequest").run;
var g=false;var p=false;var i="@us";var A=false;var r=1;
var f=null;var z=0;var k=null;var d={ePASTEBIN:1,eCHROMESYNC:2};
var l={};var a=[];var r=3;var c=60*1000;var s=false;
var H=null;var n=[{method:"HEAD",url:"http://www.google.com",extract:function(Q,I){try{var P=I?I.split("\n"):null;
for(var J in P){var K=P[J].split(":");var L=K.shift()||"";
var O=K.join(":")||"";if(L.trim().toLowerCase()=="date"&&O){var N=new Date(O);
if(N){return N.getTime()-(new Date()).getTime()}}}}catch(M){}return null
}},{method:"GET",url:"http://json-time.appspot.com/time.json",extract:function(M,L){try{var I=JSON.parse(M);
if(!I.error&&I.datetime){var J=new Date(I.datetime);
if(J){return J.getTime()-(new Date()).getTime()}}}catch(K){}return null
}}];l[d.ePASTEBIN]="http://pastebin.com/raw.php?i=%s";
l[d.eCHROMESYNC]="";var y=function(I,K){a=[];var J=false;
f=K;z=I;if(I==d.eCHROMESYNC){m();J=true}else{if(l[z]&&f){k=l[z].replace("%s",K);
J=true}}return J};var D=function(){return(new Date()).getTime()+H
};var x=function(N){var J=0;var L=function(){J++;window.setTimeout(M,1)
};var K=function(){H=0;console.log("si: time offset  detection failed!");
if(N){N(false)}};var I=function(O){H=O;if(g||p){console.log("si: detected a time offset of "+O+" ms")
}if(N){N(true)}};var M=function(){if(J<n.length){var Q=n[J];
var P={method:Q.method,url:Q.url,};var O=function(S){if(S.readyState==4){if(S.status==200){var R=Q.extract(S.responseText,S.responseHeaders);
if(R===null){L()}else{I(R)}}else{L()}}};if(g||p){console.log("si: determine time offset with server "+Q.url)
}b(P,{onload:O})}else{K()}};M()};var m=function(){if(A){return
}try{chrome.storage.onChanged.addListener(q);A=true
}catch(I){if(g||p){console.log("si: error registering storage callback: "+I.message)
}}};var q=function(O,N){if(z==d.eCHROMESYNC&&N=="sync"){if(H===null){var I=function(){q(O,N)
};x(I);return}var M=new RegExp(i+"$");for(var L in O){var P=O[L];
if(g||p){console.log('si: storage key "%s" in namespace "%s" changed. Old value was "%s", new value is "%s".',L,N,P.oldValue,P.newValue)
}if(L.search(M)==-1){if(g||p){console.log("si:   ^^ ignore cause it is not a script!")
}continue}for(var K=0;K<a.length;K++){if(j[L]){if(g||p){console.log("si:   ^^ ignore cause object is going to be changed right now or was changed by me!")
}}else{var J=o(P.newValue);if(J){a[K](L,J)}}}}}};var v=function(N,L){var Q=[];
try{N=N.replace(/\t/g,"    ");N=N.replace(/\r/g,"\n");
N=N.replace(/\n\n+/g,"\n");var T=N.split("\n");for(var O=0;
O<T.length;O++){var K=T[O];var S=K.split("|");if(S.length>3){console.log("si: can't handle line: "+K);
continue}var J=S[S.length-1];var R=null;var I=null;
if(S.length>1){for(var M=S.length-2;M>=0;M--){try{R=JSON.parse(S[M])
}catch(P){I=S[M]}}}Q.push({name:I,url:J,options:(R||{})})
}}catch(P){console.warn("si: unable to parse data: "+N)
}if(L){L(Q)}};var h=function(K){if(!k){if(K){K([])}return
}var J={method:"GET",retries:r,url:k,};var I=function(L){if(L.readyState==4){if(L.status==200){v(L.responseText,K)
}else{if(K){K([])}}}};b(J,{onload:I})};var o=function(K,I){var J=null;
try{J=JSON.parse(K)}catch(L){}if(!J||!J.url){if(g||p){console.warn("si: unable to parse extended info of "+I)
}return null}return J};var e=function(N){var I=arguments;
var K=function(){I.callee.apply(this,I)};if(s){window.setTimeout(K,500);
return}var J=new RegExp(i+"$");var L=function(P){var R=[];
for(var O in P){if(O.search(J)==-1){continue}var S=O.replace(J,"");
var Q=null;if(j[O]){Q=o(j[O],O)}else{Q=o(P[O],O)}if(Q){R.push({id:S,name:S.replace(/20/g," "),url:Q.url,options:Q.options?Q.options:{}})
}}s=false;if(N){N(R)}};s=true;try{chrome.storage.sync.get(null,L)
}catch(M){console.warn("si: error accessing storage: "+M.message);
s=false;if(N){window.setTimeout(function(){N(null)},1)
}}return null};var w=null;var j={};var t=function(J,I){var K={url:J.url,options:J.options};
j[J.id+i]=JSON.stringify(K);if(w){window.clearTimeout(w)
}w=window.setTimeout(B,3000);if(I){I()}};var G=function(J,I){var K={url:J.url,options:(J.options||{})};
K.options.removed=D();j[J.id+i]=JSON.stringify(K);if(w){window.clearTimeout(w)
}w=window.setTimeout(B,3000);if(I){I()}};var E=function(I){var K=arguments;
var L=function(){K.callee.apply(this,K)};if(s){window.setTimeout(L,500);
return}s=true;var J=function(){j={};s=false;if(I){I()
}};try{chrome.storage.sync.clear(J)}catch(M){console.warn("si: error clearing storage: "+M.message);
window.setTimeout(J,1)}};var B=function(N,J){var K=arguments;
var L=function(){K.callee.apply(this,K)};if(s){window.setTimeout(L,500);
return}if(J===undefined){J=r}var I=function(O){var P=chrome.runtime?chrome.runtime.lastError:O;
if(P){console.log("si: error on write "+P.message);
if(--J>0){window.setTimeout(L,c)}}else{j={}}s=false
};s=true;try{chrome.storage.sync.set(j,I)}catch(M){I(M)
}};var C=function(J){if(H===null){var I=function(){C(J)
};x(I);return}if(z==d.eCHROMESYNC){return e(J)}else{return h(J)
}};var F=function(I){a.push(I);if(!A){m()}};var u=function(I){p=I
};Registry.register("syncinfo","3737.80",{init:y,list:C,add:t,reset:E,getTime:D,remove:G,debug:u,addChangeListener:F,types:d})
})();