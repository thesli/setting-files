
Registry.registerRaw("environment.js","3630.77",function(){var p="DOMContentLoaded";
var x="load";var L="DOMNodeInserted";var A=0;var E=1;
var d="TM_internal";TMwin.domContentLoaded=false;TMwin.loadHappened=false;
TMwin.domNodeInserted=false;TMwin.props={};TMwin.adjustLogLevel=function(T){if(T!==undefined){logLevel=T
}D|=(logLevel>=60);EV|=(logLevel>=80);V|=(logLevel>=100);
EMV|=(logLevel>=100)};var y={objs:{},push:function(T,W){if(W!==0&&W!==1){W=0
}var U=Math.floor(Math.random()*6121983+1);y.objs[U]={fn:T,prio:W};
return U},remove:function(T){delete y.objs[T]},get:function(){var U=[];
for(var W=0;W<=1;W++){for(var T in y.objs){if(!y.objs.hasOwnProperty(T)){continue
}if(y.objs[T].prio===W){U.push(y.objs[T].fn)}}}return U
}};TMwin.adjustLogLevel();var C=TMwin.chromeEmu;var s=function(T){return({}).toString.apply(T).match(/\s([a-z|A-Z]+)/)[1]
};var g=function(T){var U=document.createElement("div");
U.appendChild(T.cloneNode(true));return U.innerHTML
};var I=function(U,T){if(T==undefined){T=100}return(T&&U&&(U==document||(I(U.parentNode,T-1))))
};var t=function(){var T=function(){};T.prototype={};
return new T()};var N=function(){var Z=V;var Y=t();
var aa={setTimeout:{enhance:function(){var af=arguments;
var ag=af[0];if(typeof ag==="string"){af[0]=new Function(ag)
}else{af[0]=function(){return ag.apply(Y,arguments)
}}return window.setTimeout.apply(window,af)}},setInterval:{enhance:function(){var af=arguments;
var ag=af[0];if(typeof ag==="string"){af[0]=new Function(ag)
}else{af[0]=function(){return ag.apply(Y,arguments)
}}return window.setInterval.apply(window,af)}},clearInterval:{wrap:true},clearTimeout:{wrap:true},addEventListener:{wrap:true,that:Y},removeEventListener:{wrap:true,that:Y}};
var ab=function(af){return af==window?Y:af};var U=function(aj,ah,ag,ai){if(!ag){ag=aj
}var af=function(){var ak=aj[ah].apply(ag,arguments);
if(ai){ak=ai(ak)}return ak};af.__proto__=aj[ah];af.prototype=aj[ah].prototype;
return af};for(var X in aa){if(!aa.hasOwnProperty(X)){continue
}TMwin.windowProps[X]=TMwin.windowProps[X]||(aa[X]!==false)
}var ae;for(var X in TMwin.windowProps){if(!TMwin.windowProps.hasOwnProperty(X)||aa[X]===false){continue
}ae={};try{try{var T=window[X];if(aa[X]){if(aa[X].wrap){ae.wrap=true;
ae.that=aa[X].that}else{if(aa[X].direct){ae.direct=true
}else{if(aa[X].enhance){ae.enhance=aa[X].enhance}else{if(aa[X].get){ae.get=aa[X].get
}}}}}else{if(typeof window[X]==="function"){if(TMwin.windowProps[X].proto){ae.wrap=true
}else{ae.direct=true}}else{if(typeof window[X]==="number"||typeof window[X]==="string"){ae.get=true
}else{if(TMwin.windowProps[X].event&&TMwin.windowProps[X].proto){ae.event=true
}else{ae.direct=true}}}}}catch(ac){ae.get=true}if(ae.direct){if(Z){console.debug("sandbox: window["+X+"] -> direct reference")
}Y[X]=ab(window[X])}else{if(ae.enhance){if(Z){console.debug("sandbox: window["+X+"] -> enhanced reference")
}Y[X]=ae.enhance}else{if(ae.event){if(Z){console.debug("sandbox: window["+X+"] -> event reference")
}(function W(){var ag=X;var ah=undefined;var aj=undefined;
var af=null;var ai=null;ai=function(ak){ah=ak;aj=function(){return ak.apply(Y,arguments)
};window[ag]=aj};af=function(){return ah===undefined||aj!==window[ag]?window[ag]:ah
};Y.__defineGetter__(ag,af);Y.__defineSetter__(ag,ai)
})()}else{if(ae.get||ae.set){if(Z){console.debug("sandbox: window["+X+"] -> "+(typeof ae.get==="function"||typeof ae.set==="function"?"enhanced ":"")+"getter/setter reference")
}(function W(){var ag=X;var ah=undefined;var af=null;
var ai=null;if(typeof ae.get==="function"){af=ae.get
}else{af=function(){return ah===undefined?ab(window[ag]):ah
}}if(typeof ae.set==="function"){ai=ae.set}else{if(!ae.get){ai=function(aj){return ah=aj
}}}if(af){Y.__defineGetter__(ag,af)}if(ai){Y.__defineSetter__(ag,ai)
}})()}else{if(ae.wrap){if(Z){console.debug("sandbox: window["+X+"] -> wrapped reference ")
}(function W(){var af=X;Y[af]=U(window,af,ae.that,ab)
})()}}}}}}catch(ad){console.warn("env: error while creating a new sandbox: "+ad.message)
}}return Y};var M=function(aw,ac,X,W,al){var Y=null;
try{var ao=W.sandboxes[aw.id];if(!ao.__TMbackref){ao.__TMbackref={}
}var af="";var ap='arguments.callee.__tmid = { id: "'+aw.id+'", run_at: "'+aw.options.run_at+'", ns: "'+aw.namespace+'" };\n';
var Z=["context"];var at=[undefined];for(var aj in W.elements[aw.id]){if(!W.elements[aw.id].hasOwnProperty(aj)){continue
}var ag=W.elements[aw.id][aj];if(ag.name){if(ag.overwrite){Z.push(ag.name);
at.push(ag.value)}else{if(ag.scriptid){ao.__TMbackref[ag.name+"_"+ag.scriptid]=ag.value;
Z.push(ag.name);at.push('context.__TMbackref["'+ag.name+"_"+ag.scriptid+'"]')
}else{ao[ag.name]=ag.value;Z.push(ag.name);at.push("context."+ag.name)
}}}else{if(D){console.warn("env: WARN: unexpected item in props elem: "+JSON.stringify(ag))
}}}var aa=[];aa.push(ap);if(!al&&TMwin.use.proxy==="sandbox"){aa.push("with (context) {\n")
}aa.push("(function(");aa.push(Z.join(","));aa.push(") {");
aa.push("try {\n");aa.push(X);aa.push(ac);aa.push("\n} catch (e) {    if (e.message && e.stack) {        console.error(\"ERROR: Execution of script '"+aw.name+'\' failed! " + e.message);        console.log(e.stack.replace(/\\(eval at <anonymous> /g, "").replace(/<anonymous>:/g, "").replace(/chrome-extension:\\/\\/[\\w]{32}\\/content\\.js:\\d*:\\d*\\)*, /g, ""));    } else {        console.error(e);    }};\n');
aa.push("}).apply(context, [");aa.push(at.join(","));
aa.push("]);");if(!al&&TMwin.use.proxy==="sandbox"){aa.push("}\n")
}Y=aa.join("");var ai=function(az,ax){var ay=new Function("context",Y);
ay.apply(ax,[ax])};if(al){al(ai,[Y,ao])}else{ai(Y,ao)
}}catch(ar){var ah={maxerr:999,newcap:true,es5:true,sloppy:true,browser:true,white:true,plusplus:true,nomen:true,"continue":true,todo:true,eqeq:true,passfail:false,unparam:true,devel:true};
var ad=null;try{ad=JSLINT}catch(av){}var ae=ad?ad(Y,ah):true;
var aq="";if(ae){aq=af+ac}else{var U=(ap+af).split("\n").length+2;
var T=X.split("\n").length;var au="";for(var an in JSLINT.errors){var am=JSLINT.errors[an];
if(am&&am.line>=U){var ak=am.line-U+1;au+=ak>T?"script: ":"require: ";
au+=am.reason.replace(/.$/,"")+" on line: "+ak+" at character: "+am.character+"\n"
}}aq="JSLINT output:\n"+au}if(D||ae){console.error("env: ERROR: Syntax error @ '"+aw.name+"'!\n##########################\n"+aq+"##########################\nERROR: "+ar.message+"\n");
console.error(ar.stack)}else{console.error("env: ERROR: Syntax error @ '"+aw.name+"'!\n"+ar.message+"\n",ar.stack)
}var ab=function(){if(D){C.extension.sendMessage({method:"copyToClipboard",data:{content:ac,type:"test"},id:"42"},function(){})
}throw ar};window.setTimeout(ab,1);return}};var G=[];
var k={events:[],done:{},running:null};var v=[];var b=function(ab,Z,W,aa){var Y={attrChange:0,attrName:null,bubbles:true,cancelBubble:false,cancelable:false,clipboardData:undefined,currentTarget:null,defaultPrevented:false,eventPhase:0,newValue:null,prevValue:null,relatedNode:null,returnValue:true,srcElement:null,target:null,timeStamp:(new Date()).getTime()};
var X=(typeof W==="string")?new Function(W):W;var U=new Event();
for(var T in Y){U[T]=Y[T]}for(var T in Z){U[T]=Z[T]
}U.type=ab;X.apply(aa,[U])};var m=function(T,U){if(V||EV){console.log("env: postLoadEvent!")
}var W={attrName:"null",newValue:"null",prevValue:"null",eventPhase:window.Event.AT_TARGET,attrChange:MutationEvent.ADDITION,target:document,relatedNode:document,srcElement:document};
b(x,W,T,U)};var K=function(T,U){if(V||EV){console.log("env: postDomEventListener!")
}var W={attrName:"null",newValue:"null",prevValue:"null",eventPhase:window.Event.AT_TARGET,attrChange:MutationEvent.ADDITION,target:document,relatedNode:document,srcElement:document};
b(p,W,T,U)};var S=function(X,Y,T,aa){if(!k){return}if(V||EV){console.log("env: refireAllNodeInserts!")
}var U=k.events.length;for(var W=0;W<U;W++){if(!aa||k.events[W].domContentLoaded){var Z={attrName:"",newValue:"",prevValue:"",eventPhase:window.Event.AT_TARGET,target:k.events[W].event.target,relatedNode:k.events[W].event.relatedNode,srcElement:k.events[W].event.srcElement};
b(L,Z,X,Y)}if(!k.running){return}}};var l=function(T){TMwin.loadHappened=true;
TMwin.domContentLoaded=true;if(V||EV||D){console.log("env: DOMContentLoaded Event!")
}u()};var Q=function(T){if(!TMwin.domNodeInserted&&(V||EV||D)){console.log("env: first DOMNodeInserted Event!")
}TMwin.loadHappened=true;TMwin.domNodeInserted=true;
if(k){k.events.push({event:T,domContentLoaded:TMwin.domContentLoaded})
}};var J=function(T){TMwin.loadHappened=true;if(V||EV||D){console.log("env: load Event!")
}};var a=function(){document.removeEventListener(L,Q,false);
document.removeEventListener(p,l,false);document.removeEventListener(x,J,false);
window.removeEventListener("unload",a,false);if(y!=null){var U=y.get();
for(var T=0;T<U.length;T++){U[T]()}y=null}if(C.clean){C.clean()
}};var u=function(){if(!TMwin.domContentLoaded){if(V||EV||D){console.log("env: Content not loaded, schedule loadListeners run!")
}return -1}var T=G.length;while(G.length>0){var U=function(){var W=G.shift();
try{window.setTimeout(W.fn,1)}catch(X){console.log("ERROR: Execution (loadListener) of script env "+W.name+" failed!"+X.message)
}};U()}return T};var i=function(U,T){U()};var z=function(U,T){if(!document.body){var W=function(){document.removeEventListener("load",W,false);
document.removeEventListener("DOMNodeInserted",W,false);
document.removeEventListener("DOMContentLoaded",W,false);
z(U,T)};document.addEventListener("load",W,false);document.addEventListener("DOMNodeInserted",W,false);
document.addEventListener("DOMContentLoaded",W,false)
}else{var X=function(){U()};window.setTimeout(X,1)}};
var B=function(X,U,W){var T=function(){X()};G.push({fn:T,name:W});
if(!TMwin.domNodeInserted&&!TMwin.domContentLoaded){if(V||EV||D){console.log("env: schedule for node Insert Event!")
}}else{u()}};function h(){var U=[window.HTMLDocument.prototype,window.__proto__];
var T=[];for(var X=0;X<U.length;X++){var W=function(){var Y=U[X];
if(!Y.__addEventListener){Y.__addEventListener=Y.addEventListener;
Y.__removeEventListener=Y.removeEventListener;Y.removeEventListener=function(ab,aa,Z){if(ab==L){if(k&&k.running==aa){if(EV){console.log("env: detected removeEventListener while refireAllNodeInserts")
}k.running=null}}this.__removeEventListener(ab,aa,Z)
};Y.addEventListener=function(Z,ag,ad){if(V||EV){console.log("env: addEventListener "+Z)
}var ah=true;if(Z==x||Z==p||Z==L){var aa=null;var ae=this;
try{aa=f(arguments.callee)}catch(af){if(D){console.error("env: Error: event "+Z,af)
}}if(V||EV){console.log("env: sid done "+Z)}if(aa){var ac=null;
if(Z==x){if(TMwin.loadHappened){ac=function(){m(ag,ae)
};ah=false;T.splice(1,0,ac)}}else{if(Z==p){if(TMwin.domContentLoaded){ac=function(){K(ag,ae)
};ah=false;T.push(ac)}}else{if(Z==L){if(k&&!k.done[aa]){k.done[aa]=true;
ac=function(){var ai=aa.run_at!="document-start"&&aa.run_at!="document-body";
k.running=ag;S(ag,ae,aa,ai);if(k.running){ae.__addEventListener(Z,ag,ad)
}k.running=null};T.push(ac)}}}}if(ac){var ab=function(){if(T.length){var ai=T[0];
T=T.slice(1);ai()}};window.setTimeout(ab,1);ah=false
}}}if(ah){this.__addEventListener(Z,ag,ad)}};y.push(function(){Y.removeEventListener=Y.__removeEventListener;
Y.addEventListener=Y.__addEventListener})}};W()}TMwin.windowProps.__addEventListener={proto:true};
TMwin.windowProps.__removeEventListener={proto:true}
}var f=function(U,T){if(T===undefined){T=20}if(T==0){return null
}if(!U.__tmid&&U.caller){var W=f(U.caller,T-1);return W
}return U.__tmid};function P(){var T="HTMLDocument";
if(!window[T].prototype.__evaluate){window[T].prototype.__evaluate=window[T].prototype.evaluate;
window[T].prototype.evaluate=function(ad,W,aa,Z,Y){if(V){console.log("env: document.evaluate "+ad)
}if(!W){W=this}var ac;if(typeof XPathResult!="undefined"){var U=null;
var ae=ad;try{ac=this.__evaluate(ae,W,aa,Z,Y)}catch(ab){if(V){console.log("env: Error: document.evaluate "+JSON.stringify(ab))
}}var X=true;try{X&=!ac.snapshotLength}catch(ab){}try{X&=!ac.singleNodeValue
}catch(ab){}if(X&&ad.charAt(0)!="."&&!I(W)){if(V){console.log("env: query added elem for "+ae)
}ae=(ad.charAt(0)=="/"?".":"./")+ad;ac=this.__evaluate(ae,W,aa,Z,Y)
}else{if(V){console.log("env: queried document for "+ae)
}}if(V){console.log("env: query returned ");console.log(ac)
}}else{if(V){console.log("env: XPathResult == undefined, but selectNodes via "+xpathExpr)
}ac=W.selectNodes(xpathExpr)}return ac};y.push(function(){window[T].prototype.evaluate=window[T].prototype.__evaluate
})}}function O(){if(TMwin.use.safeContext){if(Object.getOwnPropertyDescriptor(window,"content")){return
}Object.defineProperties(window,{content:{get:function(){return window.top
},enumerable:true,configurable:false}})}}function q(){if(TMwin.use.safeContext){window.open=function(U){var X="__o__"+TM_context_id;
var W="window."+X+' = window.open(decodeURI("'+encodeURI(U)+'"));';
TM_do(W);var T=unsafeWindow[X];delete unsafeWindow[X];
return T};y.push(function(){window.open=null})}}function e(){if(!TMwin.use.safeContext||window.__setTimeout){return
}window.__setTimeout=window.setTimeout;window.__setInterval=window.setInterval;
window.setTimeout=function(){var T=arguments;var U=T[0];
if(typeof U==="string"){T[0]=function(){TM_do(U)}}return __setTimeout.apply(this,T)
};window.setInterval=function(){var T=arguments;var U=T[0];
if(typeof U==="string"){T[0]=function(){TM_do(U)}}return __setInterval.apply(this,T)
};y.push(function(){window.setTimeout=window.__setTimeout;
window.setInterval=window.__setInterval})}var o=function(T,X,W){var aa=TM_context_id+"#"+T;
var Y=null;var U=function(){if(V){console.log("env: unRegisterMenuCMD due to unload "+X.toString())
}C.extension.sendMessage({method:"unRegisterMenuCmd",name:T,id:aa},function(ab){})
};var Z=function(ab){if(Y!==null){y.remove(Y);Y=null
}if(ab.run){if(V){console.log("env: execMenuCmd "+X.toString())
}window.setTimeout(function(){X()},1);o(T,X,W)}};Y=y.push(U,1);
if(V){console.log("env: registerMenuCmd "+X.toString())
}C.extension.sendMessage({method:"registerMenuCmd",name:T,id:TM_context_id,menuId:aa,accessKey:W},Z)
};var w=function(W,U){var T=null;var Y=function(){if(T===null){window.setTimeout(Y,500)
}else{if(T>0){C.extension.sendMessage({method:"closeTab",tabId:T,id:TM_context_id},X);
T=undefined}else{if(D){console.debug("env: attempt to close already closed tab!")
}}}};var X=function(Z){T=Z.tabId};if(W&&W.search(/^\/\//)==0){W=location.protocol+W
}C.extension.sendMessage({method:"openInTab",url:W,id:TM_context_id,options:U},X);
return{close:Y}};var c=function(T){var U=false;if(T.url&&T.url.substr(0,1)==="/"){T.url=window.location.origin+T.url
}var aa=(function(){var af={};Object.getOwnPropertyNames(XMLHttpRequest.__proto__).forEach(function(ag){af[ag]=true
});var ae=function(){};Object.getOwnPropertyNames(XMLHttpRequest).forEach(function(ag){if(!af[ag]){ae[ag]=XMLHttpRequest[ag]
}});return ae})();var ab=function(af,ae){ae=ae||{};
var ag=function(){ae.__proto__=aa;af.apply(ae,[ae])
};if(af&&!U){window.setTimeout(ag,1)}};var Z=!T.responseType;
if(Z){var W=C.extension.connect("xhr_"+TM_context_id);
W.postMessage({method:"xhr",details:T,id:TM_context_id});
var ad=function(ae){try{if(ae.success){if(T.onload){if(ae.data.responseXML){ae.data.responseXML=unescape(ae.data.responseXML)
}ab(T.onload,ae.data)}}else{if(ae.change){if(T.onreadystatechange){ab(T.onreadystatechange,ae.data)
}}else{if(ae.progress){if(T.onprogress){ab(T.onprogress,ae.data)
}}else{if(ae.timeout){if(T.ontimeout){ab(T.ontimeout,ae.data)
}}else{if(T.onerror){ab(T.onerror,ae.data)}}}}}}catch(af){console.log("env: Error: TM_xmlhttpRequest - "+af.message+"\n"+JSON.stringify(T))
}};W.onMessage.addListener(ad);var X=function(ae){console.log("env: onDisconnect! :)")
};if(V){W.onDisconnect.addListener(X)}}else{var Y,ac=new XMLHttpRequest();
if(T.async===undefined){T.async=true}ac.open(T.method,T.url,T.async,T.user,T.password);
if(T.headers){for(Y in T.headers){ac.setRequestHeader(Y,T.headers[Y])
}}if(T.overrideMimeType){ac.overrideMimeType(T.overrideMimeType)
}if(T.responseType){ac.responseType=T.responseType}["abort","error","load","progress","readystatechange","timeout"].forEach(function(ae){ac["on"+ae]=function(){var af="";
var ah=T.url;if(ac.readyState>2){af=ac.getAllResponseHeaders();
if(ac.readyState==4){if(af){af=af.replace(/TM-finalURL\: .*[\r\n]{1,2}/,"")
}var ai=ac.getResponseHeader("TM-finalURL");if(ai){ah=ai
}}}var ag={readyState:ac.readyState,status:"",statusText:"",responseHeaders:af,finalUrl:ah,};
if(ac.readyState==4){if(!ac.responseType||ac.responseType==""){ag.responseText=ac.responseText;
ag.responseXML=ac.responseXML}else{ag.response=ac.response
}ag.status=ac.status;ag.statusText=ac.statusText}ab(T["on"+ae],ag)
}});ac.send(T.data)}return{abort:function(){U=true}}
};var F=function(T){C.extension.sendMessage({method:"getTab",id:TM_context_id},function(U){if(T){T(U.data)
}})};var H=function(T){C.extension.sendMessage({method:"saveTab",id:TM_context_id,tab:T},function(U){})
};var r=function(T){C.extension.sendMessage({method:"getTabs",id:TM_context_id},function(U){if(T){T(U.data)
}})};var R=function(U,T){C.extension.sendMessage({method:"installScript",url:U,id:TM_context_id},function(W){if(T){T(W)
}})};var j=function(){var T="";T+=((new Date()).getTime().toString());
T+=Math.floor(Math.random()*6121983+1);return T};var n=function(Z){var aK=[];
var ak=Z.storage;var av=Z.script.name;var Y=Z.script;
var aE=function(aL){};var aC=null;var at=function(){var aN={observers:1,id:1,enabled:1,hash:1,fileURL:1};
var aM={script:{}};for(var aL in Y){if(!Y.hasOwnProperty(aL)||aN[aL]){continue
}aM.script[aL]=Y[aL]}aM.script["run-at"]=Y.options.override.run_at||Y.options.run_at;
aM.script.excludes=Y.options.override.orig_excludes;
aM.script.includes=Y.options.override.orig_includes;
aM.script.matches=Y.options.override.orig_includes;
aM.script.grant=Y.grant;aM.script.unwrap=false;aM.scriptMetaStr=Z.header;
aM.scriptSource=Z.code;aM.scriptWillUpdate=!!(Y.options.fileURL&&Y.options.fileURL!="");
aM.scriptUpdateURL=Y.options.fileURL;aM.version=Z.version;
aM.scriptHandler="Tampermonkey";aM.isIncognito=TMwin.isIncognito;
return aM};var az=function(){var aM=function(aO){if(aO.storage){for(var aN in aO.storage.data){if(!aO.storage.data.hasOwnProperty(aN)){continue
}var aP=function(){var aQ=aN;var aR=ak.data[aN];ak.data[aN]=aO.storage.data[aN];
var aS=ak.data[aN];if(V){console.log("env: storageListener - config key "+aQ+": "+aR+" -> "+aS)
}aw(aQ,aR,aS,true)};aP()}}if(aO.removed){ak[aO.removed]=ae
}if(aO.error){console.log("env: Error: storage listener... :(")
}};aC=C.extension.connect("storageListener_"+TM_context_id);
aC.onMessage.addListener(aM);var aL=function(aN){console.log("env: storageListener onDisconnect! :)")
};if(V){aC.onDisconnect.addListener(aL)}aC.postMessage({method:"addStorageListener",name:av,id:TM_context_id})
};az();var U=function(){aC.postMessage({method:"removeStorageListener",name:av,storage:ak,id:TM_context_id})
};var aj=function(aL){aC.postMessage({method:"saveStorageKey",name:av,key:aL,value:ak.data[aL],id:TM_context_id,ts:ak.ts});
if(V){console.log("env: saveStorageKey - config key "+aL+": "+ak.data[aL])
}};var ai=function(aL,aR,aQ){if(aQ===ae){aQ=function(aS){return aS
}}var aO=[];var aP=null;if(aL&&aL.length){aP={GM_info:true};
for(var aN in aL){if(!aL.hasOwnProperty(aN)){continue
}var aM=aL[aN];aP[aM]=true}}for(var aN in aR){if(!aR.hasOwnProperty(aN)){continue
}var aM=aR[aN];if(!aP||aP[aQ(aM.name)]){aO.push(aM)
}}return aO};var aH=function(aL){aj(aL)};var aw=function(aN,aL,aM,aP){if(aL==aM){return
}for(var aO in aK){if(!aK.hasOwnProperty(aO)){continue
}var aR=aK[aO];if(aR&&aR.key==aN){if(aR.cb){try{aR.cb(aN,am(aL),am(aM),aP)
}catch(aQ){if(D){console.warn("env: value change listener of '"+aN+"' failed with: "+aQ.message)
}}}}}};var ay=function(aM,aL){var aQ=0;for(var aP in aK){if(!aK.hasOwnProperty(aP)){continue
}var aN=aK[aP];if(aP.id>aQ){aQ=aP.id}}aQ++;var aO={id:aQ,key:aM,cb:aL};
aK.push(aO);return aQ};var ap=function(aN){for(var aM in aK){if(!aK.hasOwnProperty(aM)){continue
}var aL=aK[aM];if(aM.id==aN){delete aK[aM];return true
}}};var aI=function(aM){var aL=ak.data[aM];ak.ts=(new Date()).getTime();
delete ak.data[aM];aH(aM);aw(aM,aL,ak.data[aM],false)
};var aA=function(){var aL=new Array();for(var aM in ak.data){if(!ak.data.hasOwnProperty(aM)){continue
}aL.push(aM)}return aL};var am=function(aN,aL){var aM=aN[0];
aN=aN.substring(1);switch(aM){case"b":return aN=="true";
case"n":return Number(aN);case"o":try{return JSON.parse(aN)
}catch(aO){console.log("env: parseValueFromStorage: "+aO);
return aL}default:return aN}};var aD=function(aM,aL){var aN=ak.data[aM];
if(!aN){return aL}return am(aN,aL)};var aB=function(aM,aO){var aL=ak.data[aM];
var aN=(typeof aO)[0];switch(aN){case"o":try{aO=aN+JSON.stringify(aO)
}catch(aP){console.log(aP);return}break;default:aO=aN+aO
}ak.ts=(new Date()).getTime();ak.data[aM]=aO;aH(aM);
aw(aM,aL,ak.data[aM],false)};var aq=function(aM){for(var aL in Y.resources){var aN=Y.resources[aL];
if(aN.name==aM){return aN.resText}}return null};var af=function(aM){for(var aL in Y.resources){var aN=Y.resources[aL];
if(aN.name==aM){return aN.resURL}}return null};var an=function(aL){if(window.console){window.console.log(aL)
}else{console.log(aL)}};var aa=function(aL){try{var aM=document.createElement("style");
aM.textContent=aL;(document.head||document.body||document.documentElement||document).appendChild(aM)
}catch(aN){console.log("Error: env: adding style "+aN)
}};var au=function(aM,aR,aN,aO,aL){var aP,aS=null;if(!aR){aR=av
}if(aL){var aT=(typeof aL);if(aT==="number"){aP=aL}else{if(aT==="object"){aS=aL.onclose;
aP=aL.timeout}}}if(aN==ae){aN=Z.script.icon?Z.script.icon:Z.script.icon64
}var aQ=function(aU){if(aU.clicked){if(aO){aO()}}if(aS){aS(aU.clicked===true)
}};C.extension.sendMessage({method:"notification",delay:aP,msg:aM,image:aN,title:aR,id:TM_context_id},aQ)
};var ax=function(aP,aR,aL){var aN=(typeof aR);var aO="text";
var aQ="text/plain";if(aN==="object"){if(aR.type){aO=aR.type
}if(aR.mimetype){aQ=aR.mimetype}}else{if(aN==="string"){aO=aR
}}var aM=function(aS){if(aL){aL()}};C.extension.sendMessage({method:"copyToClipboard",data:{content:aP,type:aO,mimetype:aQ},id:TM_context_id},aM)
};var ab=function(aM,aL){return ao(aM,aL)};var ao=function(aQ,aP){var aR=window;
var aM="window";var aU=function(aW,aV){aR[aV]=aW};var aO=function(aV){delete aR[aV]
};var aT="__u__"+Math.floor(Math.random()*6121983+1);
var aS=aT+"_";var aN=TM_do;if(TMwin.use.safeContext){if(window!==unsafeWindow){aR=unsafeWindow
}else{aN=function(aV){var aW=new Function(aV);aW()}
}}aT=aU(aQ,aT)||aT;aS=aU(aP,aS)||aS;var aL=aN(aM+'["'+aT+'"].apply(this, '+aM+'["'+aS+'"])');
aO(aT);aO(aS);return aL};var ar=function(){this.GM_addStyle=function(aL){return aa(aL)
};this.GM_deleteValue=function(aL){return aI(aL)};this.GM_listValues=function(){return aA()
};this.GM_getValue=function(aM,aL){return aD(aM,aL)
};this.GM_addValueChangeListener=function(aM,aL){return ay(aM,aL)
};this.GM_removeValueChangeListener=function(aL){return ap(aL)
};this.GM_log=function(aL){return an(aL)};this.GM_registerMenuCommand=function(aL,aN,aM){return o(aL,aN,aM)
};this.GM_openInTab=function(aM,aL){return w(aM,aL)
};this.GM_setValue=function(aL,aM){return aB(aL,aM)
};this.GM_xmlhttpRequest=function(aL){return c(aL)};
this.GM_getResourceText=function(aL){return aq(aL)};
this.GM_getResourceURL=function(aL){return af(aL)};
this.GM_notification=function(aO,aN,aL,aP,aM){return au(aO,aN,aL,aP,aM)
};this.GM_installScript=function(aL,aM){return R(aL,aM)
};this.GM_getTab=function(aL){return F(aL)};this.GM_saveTab=function(aL){return H(aL)
};this.GM_getTabs=function(aL){return r(aL)};this.GM_setClipboard=function(aM,aL,aN){return ax(aM,aL,aN)
};Object.defineProperties(this,{GM_info:{get:function(){return at()
},enumerable:true,configurable:true},})};var ae=TMwin.undefined;
var X=[];var ah=null;for(var aF in Y.grant){if(!Y.grant.hasOwnProperty(aF)){continue
}if(Y.grant[aF]==="none"){ah=ao;break}}var ag=Y.namespace+"_"+!!ah;
if(TMwin.props[ag]===ae){TMwin.props[ag]={sandboxes:{},elements:{}};
y.push(function(){TMwin.props[ag]=null})}if(!ah){if(TMwin.use.proxy==="sandbox"){X.push({name:"window",value:"context",overwrite:true})
}if(!TMwin.use.safeContext){var aG={window:window};
for(var aF in aG){if(!aG.hasOwnProperty(aF)){continue
}var al=function(){var aL=aF.replace(/^(.)/g,function(aM){return aM.toUpperCase()
});X.push({name:"unsafe"+aL,value:aG[aF]})};al()}}}X.push({name:"CDATA",value:function(aL){this.src=aL;
this.toString=function(){return this.src};this.toXMLString=this.toString
}});X.push({name:"uneval",value:function(aL){try{return"$1 = "+JSON.stringify(aL)+";"
}catch(aM){console.log(aM)}}});if(TMwin.use.proxy!=="sandbox"){X.push({name:"console",value:console,type:E});
X.push({name:"JSON",value:JSON,type:E});X.push({name:"top",value:"window.unsafeTop",overwrite:true});
X.push({name:"location",value:window.location,type:E});
X.push({name:"document",value:window.document,type:E})
}X.push({name:"undefined",value:ae,type:E});var ad=[];
ad.push({name:"TM_addStyle",value:aa});ad.push({name:"TM_deleteValue",value:aI});
ad.push({name:"TM_listValues",value:aA});ad.push({name:"TM_getValue",value:aD});
ad.push({name:"TM_log",value:an});ad.push({name:"TM_registerMenuCommand",value:o});
ad.push({name:"TM_openInTab",value:w});ad.push({name:"TM_setValue",value:aB});
ad.push({name:"TM_addValueChangeListener",value:ay});
ad.push({name:"TM_removeValueChangeListener",value:ap});
ad.push({name:"TM_xmlhttpRequest",value:c});ad.push({name:"TM_setClipboard",value:ax});
ad.push({name:"TM_getTab",value:F});ad.push({name:"TM_saveTab",value:H});
ad.push({name:"TM_getTabs",value:r});ad.push({name:"TM_installScript",value:R});
ad.push({name:"TM_runNative",value:ab});ad.push({name:"TM_execUnsafe",value:ao});
ad.push({name:"TM_notification",value:au});ad.push({name:"TM_getResourceText",value:aq,scriptid:Y.id});
ad.push({name:"TM_getResourceURL",value:af,scriptid:Y.id});
var ac=[];var aJ=new ar();var T=[];for(var aF in aJ){T.push({name:aF,value:aJ[aF]})
}ac=ac.concat(ai(Y.grant,ad,function(aL){return aL.replace(/^TM_/,"GM_")
}));ac=ac.concat(ai(Y.grant,T));X=X.concat(ac);if(Y.options.compat_prototypes){if(V||D){console.log("env: option: add toSource")
}if(!Object.prototype.toSource){Object.defineProperties(Object.prototype,{toSource:{value:function(){var aN=s(this);
if(aN==="String"){return"(String('"+this.replace(/\'/g,"\\'")+"'))"
}else{if(aN==="Number"){return"(Number('"+Number(this)+"'))"
}else{if(aN==="Array"){var aL="(new Array(";for(var aM=0;
aM<this.length;aM++){var aO=this[aM];var aN=s(aO);if(aN==="Null"){aL+="null"
}else{if(aN==="Undefined"){aL+="undefined"}else{aL+=this[aM].toSource()
}}if(aM+1<this.length){aL+=","}}aL+="))";return aL}}}return"JSON.parse(unescape('"+escape(JSON.stringify(this))+"'))"
},enumerable:false,writable:true,configurable:true,},})
}if(V||D){console.log("env: option: add some array generics")
}var W=["indexOf","lastIndexOf","filter","forEach","every","map","some","slice"];
W.forEach(function(aM){if(typeof Array[aM]!=="function"){var aL={};
aL[aM]={value:function(aN){return Array.prototype[aM].apply(aN,Array.prototype.slice.call(arguments,1))
},enumerable:false,writable:true,configurable:true,};
Object.defineProperties(Array,aL)}})}TMwin.props[ag].sandboxes[Z.script.id]=TMwin.use.proxy==="sandbox"?N():t();
TMwin.props[ag].elements[Z.script.id]=X;if(V||D){console.debug("env: execute script "+Y.name+" @ the "+(!!ah?"un":(TMwin.use.safeContext?"":"pseudo-"))+"safe context now!")
}M(Y,Z.code,Z.requires,TMwin.props[ag],ah);y.push(function(){U();
try{aC.disconnect();aC=null}catch(aL){}aK=null;Z=null
})};C.extension.onMessage.addListener(function(Y,W,T){if(V||EV){console.log("env: request.method "+Y.method+" id: "+Y.id)
}if(Y.id&&Y.id!=TM_context_id){console.warn("env: Not for me! "+TM_context_id+"!="+Y.id);
return}var U=window.self==window.top;if(Y.method=="executeScript"){var X=function(){n(Y);
T({})};if(Y.script.options.run_at=="document-start"){if(D){console.debug("env: run '"+Y.script.name+"' ASAP -> document-start")
}i(X,Y.script.id)}else{if(Y.script.options.run_at=="document-body"){if(D){console.debug("env: schedule '"+Y.script.name+"' for document-body")
}z(X,Y.script.id)}else{if(D){console.debug("env: schedule '"+Y.script.name+"' for document-end")
}B(X,Y.script.id,Y.script.name)}}}else{if(Y.method=="onLoad"){TMwin.domContentLoaded=true;
u();T({});var ab=null;var Z=function(){if(V||EV){console.log("env: disable nodeInserts magic!")
}ab=null;k=null};y.push(function(){if(ab){if(V||EV){console.log("env: cancel nodeInserts timeout!")
}window.clearTimeout(ab)}Z()});ab=window.setTimeout(Z,2000)
}else{if(U){if(Y.method=="loadUrl"){window.location=Y.url;
T({})}else{if(Y.method=="reload"){window.location.reload();
T({})}else{if(Y.method=="confirm"){var aa=function(){var ac=confirm(Y.msg);
T({confirm:ac})};window.setTimeout(aa,100)}else{if(Y.method=="showMsg"){var aa=function(){var ac=function(){alert(Y.msg)
};window.setTimeout(ac,1);T({})};window.setTimeout(aa,100)
}else{if(Y.method=="getSrc"){T({src:Helper.getSource(document)})
}else{console.log("env: unknown method "+Y.method)}}}}}}}}});
P();h();O();q();e();document.addEventListener(L,Q,false);
document.addEventListener(p,l,false);document.addEventListener(x,J,false);
window.addEventListener("unload",a,false);if(V||D){console.debug("env: initialized (content, id:"+TM_context_id+", "+window.location.origin+window.location.pathname+") ")
}});