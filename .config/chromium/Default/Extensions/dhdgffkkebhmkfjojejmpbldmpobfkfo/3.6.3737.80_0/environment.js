
Registry.registerRaw("environment.js","3737.80",function(){var q="DOMContentLoaded";
var x="load";var J="DOMNodeInserted";var A=0;var E=1;
var d="TM_internal";TMwin.domContentLoaded=false;TMwin.loadHappened=false;
TMwin.domNodeInserted=false;TMwin.props={};TMwin.adjustLogLevel=function(R){if(R!==undefined){logLevel=R
}D|=(logLevel>=60);EV|=(logLevel>=80);V|=(logLevel>=100);
EMV|=(logLevel>=100)};var y=(function(){var R={objs:{},push:function(S,U){if(U!==0&&U!==1){U=0
}var T=Math.floor(Math.random()*6121983+1);R.objs[T]={fn:S,prio:U};
return T},remove:function(S){delete R.objs[S]},get:function(){var T=[];
for(var U=0;U<=1;U++){for(var S in R.objs){if(!R.objs.hasOwnProperty(S)){continue
}if(R.objs[S].prio===U){T.push(R.objs[S].fn)}}}return T
},finalize:function(W){if(W===undefined){var U=R.get();
for(var S=0;S<U.length;S++){U[S]()}}else{var T;if(R.objs[W]){T=R.objs[W].fn();
delete R.objs[W]}return T}}};return R})();TMwin.adjustLogLevel();
var C=TMwin.chromeEmu;var s=function(R){return({}).toString.apply(R).match(/\s([a-z|A-Z]+)/)[1]
};var g=function(R){var S=document.createElement("div");
S.appendChild(R.cloneNode(true));return S.innerHTML
};var G=function(S,R){if(R==undefined){R=100}return(R&&S&&(S==document||(G(S.parentNode,R-1))))
};var t=function(){var R=function(){};R.prototype={};
return new R()};var L=function(){var X=V;var W=t();
var Y={setTimeout:{enhance:function(){var ad=arguments;
var ae=ad[0];if(typeof ae==="string"){ad[0]=new Function(ae)
}else{ad[0]=function(){return ae.apply(W,arguments)
}}return window.setTimeout.apply(window,ad)}},setInterval:{enhance:function(){var ad=arguments;
var ae=ad[0];if(typeof ae==="string"){ad[0]=new Function(ae)
}else{ad[0]=function(){return ae.apply(W,arguments)
}}return window.setInterval.apply(window,ad)}},clearInterval:{wrap:true},clearTimeout:{wrap:true},addEventListener:{wrap:true,that:W},removeEventListener:{wrap:true,that:W}};
var Z=function(ad){return ad==window?W:ad};var S=function(ah,af,ae,ag){if(!ae){ae=ah
}var ad=function(){var ai=ah[af].apply(ae,arguments);
if(ag){ai=ag(ai)}return ai};ad.__proto__=ah[af];ad.prototype=ah[af].prototype;
return ad};for(var U in Y){if(!Y.hasOwnProperty(U)){continue
}TMwin.windowProps[U]=TMwin.windowProps[U]||(Y[U]!==false)
}var ac;for(var U in TMwin.windowProps){if(!TMwin.windowProps.hasOwnProperty(U)||Y[U]===false){continue
}ac={};try{try{var R=window[U];if(Y[U]){if(Y[U].wrap){ac.wrap=true;
ac.that=Y[U].that}else{if(Y[U].direct){ac.direct=true
}else{if(Y[U].enhance){ac.enhance=Y[U].enhance}else{if(Y[U].get){ac.get=Y[U].get
}}}}}else{if(typeof window[U]==="function"){if(TMwin.windowProps[U].proto){ac.wrap=true
}else{ac.direct=true}}else{if(typeof window[U]==="number"||typeof window[U]==="string"){ac.get=true
}else{if(TMwin.windowProps[U].event&&TMwin.windowProps[U].proto){ac.event=true
}else{ac.direct=true}}}}}catch(aa){ac.get=true}if(ac.direct){if(X){console.debug("sandbox: window["+U+"] -> direct reference")
}W[U]=Z(window[U])}else{if(ac.enhance){if(X){console.debug("sandbox: window["+U+"] -> enhanced reference")
}W[U]=ac.enhance}else{if(ac.event){if(X){console.debug("sandbox: window["+U+"] -> event reference")
}(function T(){var ae=U;var af=undefined;var ah=undefined;
var ad=null;var ag=null;ag=function(ai){af=ai;ah=function(){return ai.apply(W,arguments)
};window[ae]=ah};ad=function(){return af===undefined||ah!==window[ae]?window[ae]:af
};W.__defineGetter__(ae,ad);W.__defineSetter__(ae,ag)
})()}else{if(ac.get||ac.set){if(X){console.debug("sandbox: window["+U+"] -> "+(typeof ac.get==="function"||typeof ac.set==="function"?"enhanced ":"")+"getter/setter reference")
}(function T(){var ae=U;var af=undefined;var ad=null;
var ag=null;if(typeof ac.get==="function"){ad=ac.get
}else{ad=function(){return af===undefined?Z(window[ae]):af
}}if(typeof ac.set==="function"){ag=ac.set}else{if(!ac.get){ag=function(ah){return af=ah
}}}if(ad){W.__defineGetter__(ae,ad)}if(ag){W.__defineSetter__(ae,ag)
}})()}else{if(ac.wrap){if(X){console.debug("sandbox: window["+U+"] -> wrapped reference ")
}(function T(){var ad=U;W[ad]=S(window,ad,ac.that,Z)
})()}}}}}}catch(ab){console.warn("env: error while creating a new sandbox: "+ab.message)
}}return W};var K=function(au,aa,U,T,aj){var W=null;
try{var am=T.sandboxes[au.id];if(!am.__TMbackref){am.__TMbackref={}
}var ad="";var an='arguments.callee.__tmid = { id: "'+au.id+'", run_at: "'+au.options.run_at+'", ns: "'+au.namespace+'" };\n';
var X=["context"];var aq=[undefined];for(var ah in T.elements[au.id]){if(!T.elements[au.id].hasOwnProperty(ah)){continue
}var ae=T.elements[au.id][ah];if(ae.name){if(ae.overwrite){X.push(ae.name);
aq.push(ae.value)}else{if(ae.scriptid){am.__TMbackref[ae.name+"_"+ae.scriptid]=ae.value;
X.push(ae.name);aq.push('context.__TMbackref["'+ae.name+"_"+ae.scriptid+'"]')
}else{am[ae.name]=ae.value;X.push(ae.name);aq.push("context."+ae.name)
}}}else{if(D){console.warn("env: WARN: unexpected item in props elem: "+JSON.stringify(ae))
}}}var Y=[];Y.push(an);if(!aj&&TMwin.use.proxy==="sandbox"){Y.push("with (context) {\n")
}Y.push("(function(");Y.push(X.join(","));Y.push(") {");
Y.push("try {\n");Y.push(U);Y.push(aa);Y.push("\n} catch (e) {    if (e.message && e.stack) {        console.error(\"ERROR: Execution of script '"+au.name+'\' failed! " + e.message);        console.log(e.stack.replace(/\\(eval at <anonymous> /g, "").replace(/<anonymous>:/g, "").replace(/chrome-extension:\\/\\/[\\w]{32}\\/content\\.js:\\d*:\\d*\\)*, /g, ""));    } else {        console.error(e);    }};\n');
Y.push("}).apply(context, [");Y.push(aq.join(","));
Y.push("]);");if(!aj&&TMwin.use.proxy==="sandbox"){Y.push("}\n")
}W=Y.join("");var ag=function(ax,av){var aw=new Function("context",W);
aw.apply(av,[av])};if(aj){aj(ag,[W,am])}else{ag(W,am)
}}catch(ap){var af={maxerr:999,newcap:true,es5:true,sloppy:true,browser:true,white:true,plusplus:true,nomen:true,"continue":true,todo:true,eqeq:true,passfail:false,unparam:true,devel:true};
var ab=null;try{ab=JSLINT}catch(at){}var ac=ab?ab(W,af):true;
var ao="";if(ac){ao=ad+aa}else{var S=(an+ad).split("\n").length+2;
var R=U.split("\n").length;var ar="";for(var al in JSLINT.errors){var ak=JSLINT.errors[al];
if(ak&&ak.line>=S){var ai=ak.line-S+1;ar+=ai>R?"script: ":"require: ";
ar+=ak.reason.replace(/.$/,"")+" on line: "+ai+" at character: "+ak.character+"\n"
}}ao="JSLINT output:\n"+ar}if(D||ac){console.error("env: ERROR: Syntax error @ '"+au.name+"'!\n##########################\n"+ao+"##########################\nERROR: "+ap.message+"\n");
console.error(ap.stack)}else{console.error("env: ERROR: Syntax error @ '"+au.name+"'!\n"+ap.message+"\n",ap.stack)
}var Z=function(){if(D){C.extension.sendMessage({method:"copyToClipboard",data:{content:aa,type:"test"},id:"42"},function(){})
}throw ap};window.setTimeout(Z,1);return}};var F=[];
var l={events:[],done:{},running:null};var v=[];var b=function(Z,X,T,Y){var W={attrChange:0,attrName:null,bubbles:true,cancelBubble:false,cancelable:false,clipboardData:undefined,currentTarget:null,defaultPrevented:false,eventPhase:0,newValue:null,prevValue:null,relatedNode:null,returnValue:true,srcElement:null,target:null,timeStamp:(new Date()).getTime()};
var U=(typeof T==="string")?new Function(T):T;var S=new Event();
for(var R in W){S[R]=W[R]}for(var R in X){S[R]=X[R]
}S.type=Z;U.apply(Y,[S])};var n=function(R,S){if(V||EV){console.log("env: postLoadEvent!")
}var T={attrName:"null",newValue:"null",prevValue:"null",eventPhase:window.Event.AT_TARGET,attrChange:MutationEvent.ADDITION,target:document,relatedNode:document,srcElement:document};
b(x,T,R,S)};var I=function(R,S){if(V||EV){console.log("env: postDomEventListener!")
}var T={attrName:"null",newValue:"null",prevValue:"null",eventPhase:window.Event.AT_TARGET,attrChange:MutationEvent.ADDITION,target:document,relatedNode:document,srcElement:document};
b(q,T,R,S)};var Q=function(U,W,R,Y){if(!l){return}if(V||EV){console.log("env: refireAllNodeInserts!")
}var S=l.events.length;for(var T=0;T<S;T++){if(!Y||l.events[T].domContentLoaded){var X={attrName:"",newValue:"",prevValue:"",eventPhase:window.Event.AT_TARGET,target:l.events[T].event.target,relatedNode:l.events[T].event.relatedNode,srcElement:l.events[T].event.srcElement};
b(J,X,U,W)}if(!l.running){return}}};var m=function(R){TMwin.loadHappened=true;
TMwin.domContentLoaded=true;if(V||EV||D){console.log("env: DOMContentLoaded Event!")
}u()};var O=function(R){if(!TMwin.domNodeInserted&&(V||EV||D)){console.log("env: first DOMNodeInserted Event!")
}TMwin.loadHappened=true;TMwin.domNodeInserted=true;
if(l){l.events.push({event:R,domContentLoaded:TMwin.domContentLoaded})
}};var H=function(R){TMwin.loadHappened=true;if(V||EV||D){console.log("env: load Event!")
}};var a=function(){document.removeEventListener(J,O,false);
document.removeEventListener(q,m,false);document.removeEventListener(x,H,false);
window.removeEventListener("unload",a,false);if(y!=null){var S=y.get();
for(var R=0;R<S.length;R++){S[R]()}y=null}if(C.clean){C.clean()
}};var u=function(){if(!TMwin.domContentLoaded){if(V||EV||D){console.log("env: Content not loaded, schedule loadListeners run!")
}return -1}var R=F.length;while(F.length>0){var S=function(){var T=F.shift();
try{window.setTimeout(T.fn,1)}catch(U){console.log("ERROR: Execution (loadListener) of script env "+T.name+" failed!"+U.message)
}};S()}return R};var j=function(S,R){S()};var z=function(S,R){if(!document.body){var T=function(){document.removeEventListener("load",T,false);
document.removeEventListener("DOMNodeInserted",T,false);
document.removeEventListener("DOMContentLoaded",T,false);
z(S,R)};document.addEventListener("load",T,false);document.addEventListener("DOMNodeInserted",T,false);
document.addEventListener("DOMContentLoaded",T,false)
}else{var U=function(){S()};window.setTimeout(U,1)}};
var B=function(U,S,T){var R=function(){U()};F.push({fn:R,name:T});
if(!TMwin.domNodeInserted&&!TMwin.domContentLoaded){if(V||EV||D){console.log("env: schedule for node Insert Event!")
}}else{u()}};function h(){var S=[window.HTMLDocument.prototype,window.__proto__];
var R=[];for(var U=0;U<S.length;U++){var T=function(){var W=S[U];
if(!W.__addEventListener){W.__addEventListener=W.addEventListener;
W.__removeEventListener=W.removeEventListener;W.removeEventListener=function(Z,Y,X){if(Z==J){if(l&&l.running==Y){if(EV){console.log("env: detected removeEventListener while refireAllNodeInserts")
}l.running=null}}this.__removeEventListener(Z,Y,X)};
W.addEventListener=function(X,ae,ab){if(V||EV){console.log("env: addEventListener "+X)
}var af=true;if(X==x||X==q||X==J){var Y=null;var ac=this;
try{Y=f(arguments.callee)}catch(ad){if(D){console.error("env: Error: event "+X,ad)
}}if(V||EV){console.log("env: sid done "+X)}if(Y){var aa=null;
if(X==x){if(TMwin.loadHappened){aa=function(){n(ae,ac)
};af=false;R.splice(1,0,aa)}}else{if(X==q){if(TMwin.domContentLoaded){aa=function(){I(ae,ac)
};af=false;R.push(aa)}}else{if(X==J){if(l&&!l.done[Y]){l.done[Y]=true;
aa=function(){var ag=Y.run_at!="document-start"&&Y.run_at!="document-body";
l.running=ae;Q(ae,ac,Y,ag);if(l.running){ac.__addEventListener(X,ae,ab)
}l.running=null};R.push(aa)}}}}if(aa){var Z=function(){if(R.length){var ag=R[0];
R=R.slice(1);ag()}};window.setTimeout(Z,1);af=false
}}}if(af){this.__addEventListener(X,ae,ab)}};y.push(function(){W.removeEventListener=W.__removeEventListener;
W.addEventListener=W.__addEventListener})}};T()}TMwin.windowProps.__addEventListener={proto:true};
TMwin.windowProps.__removeEventListener={proto:true}
}var f=function(S,R){if(R===undefined){R=20}if(R==0){return null
}if(!S.__tmid&&S.caller){var T=f(S.caller,R-1);return T
}return S.__tmid};function N(){var R="HTMLDocument";
if(!window[R].prototype.__evaluate){window[R].prototype.__evaluate=window[R].prototype.evaluate;
window[R].prototype.evaluate=function(ab,T,Y,X,W){if(V){console.log("env: document.evaluate "+ab)
}if(!T){T=this}var aa;if(typeof XPathResult!="undefined"){var S=null;
var ac=ab;try{aa=this.__evaluate(ac,T,Y,X,W)}catch(Z){if(V){console.log("env: Error: document.evaluate "+JSON.stringify(Z))
}}var U=true;try{U&=!aa.snapshotLength}catch(Z){}try{U&=!aa.singleNodeValue
}catch(Z){}if(U&&ab.charAt(0)!="."&&!G(T)){if(V){console.log("env: query added elem for "+ac)
}ac=(ab.charAt(0)=="/"?".":"./")+ab;aa=this.__evaluate(ac,T,Y,X,W)
}else{if(V){console.log("env: queried document for "+ac)
}}if(V){console.log("env: query returned ");console.log(aa)
}}else{if(V){console.log("env: XPathResult == undefined, but selectNodes via "+xpathExpr)
}aa=T.selectNodes(xpathExpr)}return aa};y.push(function(){window[R].prototype.evaluate=window[R].prototype.__evaluate
})}}function M(){if(TMwin.use.safeContext){if(Object.getOwnPropertyDescriptor(window,"content")){return
}Object.defineProperties(window,{content:{get:function(){return window.top
},enumerable:true,configurable:false}})}}function r(){if(TMwin.use.safeContext){window.open=function(S){var U="__o__"+TM_context_id;
var T="window."+U+' = window.open(decodeURI("'+encodeURI(S)+'"));';
TM_do(T);var R=unsafeWindow[U];delete unsafeWindow[U];
return R};y.push(function(){window.open=null})}}function e(){if(!TMwin.use.safeContext||window.__setTimeout){return
}window.__setTimeout=window.setTimeout;window.__setInterval=window.setInterval;
window.setTimeout=function(){var R=arguments;var S=R[0];
if(typeof S==="string"){R[0]=function(){TM_do(S)}}return __setTimeout.apply(this,R)
};window.setInterval=function(){var R=arguments;var S=R[0];
if(typeof S==="string"){R[0]=function(){TM_do(S)}}return __setInterval.apply(this,R)
};y.push(function(){window.setTimeout=window.__setTimeout;
window.setInterval=window.__setInterval})}var i=function(R){y.finalize(R)
};var p=function(R,U,T){var Y=TM_context_id+"#"+R;var W=null;
var S=function(){if(V){console.log("env: unRegisterMenuCMD "+U.toString())
}C.extension.sendMessage({method:"unRegisterMenuCmd",name:R,id:Y},function(Z){})
};var X=function(Z){if(W!==null){y.remove(W);W=null
}if(Z.run){if(V){console.log("env: execMenuCmd "+U.toString())
}window.setTimeout(function(){U()},1);p(R,U,T)}};W=y.push(S,1);
if(V){console.log("env: registerMenuCmd "+U.toString())
}C.extension.sendMessage({method:"registerMenuCmd",name:R,id:TM_context_id,menuId:Y,accessKey:T},X);
return W};var w=function(T,S){var R=null;var W=function(){if(R===null){window.setTimeout(W,500)
}else{if(R>0){C.extension.sendMessage({method:"closeTab",tabId:R,id:TM_context_id},U);
R=undefined}else{if(D){console.debug("env: attempt to close already closed tab!")
}}}};var U=function(X){R=X.tabId};if(T&&T.search(/^\/\//)==0){T=location.protocol+T
}C.extension.sendMessage({method:"openInTab",url:T,id:TM_context_id,options:S},U);
return{close:W}};var c=function(R){var S=false;if(R.url&&R.url.substr(0,1)==="/"){R.url=window.location.origin+R.url
}var Y=(function(){var ad={};Object.getOwnPropertyNames(XMLHttpRequest.__proto__).forEach(function(ae){ad[ae]=true
});var ac=function(){};Object.getOwnPropertyNames(XMLHttpRequest).forEach(function(ae){if(!ad[ae]){ac[ae]=XMLHttpRequest[ae]
}});return ac})();var Z=function(ad,ac){ac=ac||{};var ae=function(){ac.__proto__=Y;
ad.apply(ac,[ac])};if(ad&&!S){window.setTimeout(ae,1)
}};var X=!R.responseType&&s(R.data)!=="FormData";if(X){var T=C.extension.connect("xhr_"+TM_context_id);
T.postMessage({method:"xhr",details:R,id:TM_context_id});
var ab=function(ac){try{if(ac.success){if(R.onload){if(ac.data.responseXML){ac.data.responseXML=unescape(ac.data.responseXML)
}Z(R.onload,ac.data)}}else{if(ac.change){if(R.onreadystatechange){Z(R.onreadystatechange,ac.data)
}}else{if(ac.progress){if(R.onprogress){Z(R.onprogress,ac.data)
}}else{if(ac.timeout){if(R.ontimeout){Z(R.ontimeout,ac.data)
}}else{if(R.onerror){Z(R.onerror,ac.data)}}}}}}catch(ad){console.log("env: Error: TM_xmlhttpRequest - "+ad.message+"\n"+JSON.stringify(R))
}};T.onMessage.addListener(ab);var U=function(ac){console.log("env: onDisconnect! :)")
};if(V){T.onDisconnect.addListener(U)}}else{var W,aa=new XMLHttpRequest();
if(R.async===undefined){R.async=true}aa.open(R.method,R.url,R.async,R.user,R.password);
if(R.headers){for(W in R.headers){aa.setRequestHeader(W,R.headers[W])
}}if(R.overrideMimeType){aa.overrideMimeType(R.overrideMimeType)
}if(R.responseType){aa.responseType=R.responseType}["abort","error","load","progress","readystatechange","timeout"].forEach(function(ac){aa["on"+ac]=function(){var ad="";
var af=R.url;if(aa.readyState>2){ad=aa.getAllResponseHeaders();
if(aa.readyState==4){if(ad){ad=ad.replace(/TM-finalURL\: .*[\r\n]{1,2}/,"")
}var ag=aa.getResponseHeader("TM-finalURL");if(ag){af=ag
}}}var ae={readyState:aa.readyState,status:"",statusText:"",responseHeaders:ad,finalUrl:af,};
if(aa.readyState==4){if(!aa.responseType||aa.responseType==""){ae.responseText=aa.responseText;
ae.responseXML=aa.responseXML}else{ae.response=aa.response
}ae.status=aa.status;ae.statusText=aa.statusText}Z(R["on"+ac],ae)
}});aa.send(R.data)}return{abort:function(){S=true}}
};var P=function(S,R){C.extension.sendMessage({method:"installScript",url:S,id:TM_context_id},function(T){if(R){R(T)
}})};var k=function(){var R="";R+=((new Date()).getTime().toString());
R+=Math.floor(Math.random()*6121983+1);return R};var o=function(X){var aL=[];
var aj=X.storage;var au=X.script.name;var W=X.script;
var aE=function(aM){};var aC=null;var ar=function(){var aO={observers:1,id:1,enabled:1,hash:1,fileURL:1};
var aN={script:{}};for(var aM in W){if(!W.hasOwnProperty(aM)||aO[aM]){continue
}aN.script[aM]=W[aM]}aN.script["run-at"]=W.options.override.run_at||W.options.run_at;
aN.script.excludes=W.options.override.orig_excludes;
aN.script.includes=W.options.override.orig_includes;
aN.script.matches=W.options.override.orig_includes;
aN.script.grant=W.grant;aN.script.unwrap=false;aN.scriptMetaStr=X.header;
aN.scriptSource=X.code;aN.scriptWillUpdate=!!(W.options.fileURL&&W.options.fileURL!="");
aN.scriptUpdateURL=W.options.fileURL;aN.version=X.version;
aN.scriptHandler="Tampermonkey";aN.isIncognito=TMwin.isIncognito;
return aN};var ay=function(){var aN=function(aP){if(aP.storage){for(var aO in aP.storage.data){if(!aP.storage.data.hasOwnProperty(aO)){continue
}var aQ=function(){var aR=aO;var aS=aj.data[aO];aj.data[aO]=aP.storage.data[aO];
var aT=aj.data[aO];if(V){console.log("env: storageListener - config key "+aR+": "+aS+" -> "+aT)
}av(aR,aS,aT,true)};aQ()}}if(aP.removed){aj[aP.removed]=ac
}if(aP.error){console.log("env: Error: storage listener... :(")
}};aC=C.extension.connect("storageListener_"+TM_context_id);
aC.onMessage.addListener(aN);var aM=function(aO){console.log("env: storageListener onDisconnect! :)")
};if(V){aC.onDisconnect.addListener(aM)}aC.postMessage({method:"addStorageListener",name:au,id:TM_context_id})
};ay();var S=function(){aC.postMessage({method:"removeStorageListener",name:au,storage:aj,id:TM_context_id})
};var ai=function(aM){aC.postMessage({method:"saveStorageKey",name:au,key:aM,value:aj.data[aM],id:TM_context_id,ts:aj.ts});
if(V){console.log("env: saveStorageKey - config key "+aM+": "+aj.data[aM])
}};var ah=function(aM,aS,aR){if(aR===ac){aR=function(aT){return aT
}}var aP=[];var aQ=null;if(aM&&aM.length){aQ={GM_info:true};
for(var aO in aM){if(!aM.hasOwnProperty(aO)){continue
}var aN=aM[aO];aQ[aN]=true}}for(var aO in aS){if(!aS.hasOwnProperty(aO)){continue
}var aN=aS[aO];if(!aQ||aQ[aR(aN.name)]){aP.push(aN)
}}return aP};var aH=function(aM){ai(aM)};var av=function(aO,aM,aN,aQ){if(aM==aN){return
}for(var aP in aL){if(!aL.hasOwnProperty(aP)){continue
}var aS=aL[aP];if(aS&&aS.key==aO){if(aS.cb){try{aS.cb(aO,al(aM),al(aN),aQ)
}catch(aR){if(D){console.warn("env: value change listener of '"+aO+"' failed with: "+aR.message)
}}}}}};var ax=function(aN,aM){var aR=0;for(var aQ in aL){if(!aL.hasOwnProperty(aQ)){continue
}var aO=aL[aQ];if(aQ.id>aR){aR=aQ.id}}aR++;var aP={id:aR,key:aN,cb:aM};
aL.push(aP);return aR};var ao=function(aO){for(var aN in aL){if(!aL.hasOwnProperty(aN)){continue
}var aM=aL[aN];if(aN.id==aO){delete aL[aN];return true
}}};var aI=function(aN){var aM=aj.data[aN];aj.ts=(new Date()).getTime();
delete aj.data[aN];aH(aN);av(aN,aM,aj.data[aN],false)
};var az=function(){var aM=new Array();for(var aN in aj.data){if(!aj.data.hasOwnProperty(aN)){continue
}aM.push(aN)}return aM};var al=function(aO,aM){var aN=aO[0];
aO=aO.substring(1);switch(aN){case"b":return aO=="true";
case"n":return Number(aO);case"o":try{return JSON.parse(aO)
}catch(aP){console.log("env: parseValueFromStorage: "+aP);
return aM}default:return aO}};var aD=function(aN,aM){var aO=aj.data[aN];
if(!aO){return aM}return al(aO,aM)};var aB=function(aN,aP){var aM=aj.data[aN];
var aO=(typeof aP)[0];switch(aO){case"o":try{aP=aO+JSON.stringify(aP)
}catch(aQ){console.log(aQ);return}break;default:aP=aO+aP
}aj.ts=(new Date()).getTime();aj.data[aN]=aP;aH(aN);
av(aN,aM,aj.data[aN],false)};var ap=function(aN){for(var aM in W.resources){var aO=W.resources[aM];
if(aO.name==aN){return aO.resText}}return null};var ad=function(aN){for(var aM in W.resources){var aO=W.resources[aM];
if(aO.name==aN){return aO.resURL}}return null};var am=function(aM){if(window.console){window.console.log(aM)
}else{console.log(aM)}};var Y=function(aM){try{var aN=document.createElement("style");
aN.textContent=aM;(document.head||document.body||document.documentElement||document).appendChild(aN)
}catch(aO){console.log("Error: env: adding style "+aO)
}};var at=function(aN,aS,aO,aP,aM){var aQ,aT=null;if(!aS){aS=au
}if(aM){var aU=(typeof aM);if(aU==="number"){aQ=aM}else{if(aU==="object"){aT=aM.onclose;
aQ=aM.timeout}}}if(aO==ac){aO=X.script.icon?X.script.icon:X.script.icon64
}var aR=function(aV){if(aV.clicked){if(aP){aP()}}if(aT){aT(aV.clicked===true)
}};C.extension.sendMessage({method:"notification",delay:aQ,msg:aN,image:aO,title:aS,id:TM_context_id},aR)
};var aw=function(aQ,aS,aM){var aO=(typeof aS);var aP="text";
var aR="text/plain";if(aO==="object"){if(aS.type){aP=aS.type
}if(aS.mimetype){aR=aS.mimetype}}else{if(aO==="string"){aP=aS
}}var aN=function(aT){if(aM){aM()}};C.extension.sendMessage({method:"copyToClipboard",data:{content:aQ,type:aP,mimetype:aR},id:TM_context_id},aN)
};var aA=function(aM){C.extension.sendMessage({method:"getTab",id:TM_context_id,uid:W.uuid},function(aN){if(aM){aM(aN.data)
}})};var aK=function(aN,aM){C.extension.sendMessage({method:"setTab",id:TM_context_id,tab:aN,uid:W.uuid},function(aO){if(aM){aM()
}})};var ag=function(aM){C.extension.sendMessage({method:"getTabs",id:TM_context_id,uid:W.uuid},function(aN){if(aM){aM(aN.data)
}})};var Z=function(aN,aM){return an(aN,aM)};var an=function(aR,aQ){var aS=window;
var aN="window";var aV=function(aX,aW){aS[aW]=aX};var aP=function(aW){delete aS[aW]
};var aU="__u__"+Math.floor(Math.random()*6121983+1);
var aT=aU+"_";var aO=TM_do;if(TMwin.use.safeContext){if(window!==unsafeWindow){aS=unsafeWindow
}else{aO=function(aW){var aX=new Function(aW);aX()}
}}aU=aV(aR,aU)||aU;aT=aV(aQ,aT)||aT;var aM=aO(aN+'["'+aU+'"].apply(this, '+aN+'["'+aT+'"])');
aP(aU);aP(aT);return aM};var aq=function(){this.GM_addStyle=function(aM){return Y(aM)
};this.GM_deleteValue=function(aM){return aI(aM)};this.GM_listValues=function(){return az()
};this.GM_getValue=function(aN,aM){return aD(aN,aM)
};this.GM_addValueChangeListener=function(aN,aM){return ax(aN,aM)
};this.GM_removeValueChangeListener=function(aM){return ao(aM)
};this.GM_log=function(aM){return am(aM)};this.GM_registerMenuCommand=function(aM,aO,aN){return p(aM,aO,aN)
};this.GM_unregisterMenuCommand=function(aM){return i(aM)
};this.GM_openInTab=function(aN,aM){return w(aN,aM)
};this.GM_setValue=function(aM,aN){return aB(aM,aN)
};this.GM_xmlhttpRequest=function(aM){return c(aM)};
this.GM_getResourceText=function(aM){return ap(aM)};
this.GM_getResourceURL=function(aM){return ad(aM)};
this.GM_notification=function(aP,aO,aM,aQ,aN){return at(aP,aO,aM,aQ,aN)
};this.GM_installScript=function(aM,aN){return P(aM,aN)
};this.GM_getTab=function(aM){return aA(aM)};this.GM_setTab=function(aM,aN){return aK(aM,aN)
};this.GM_saveTab=function(aM){return aK(aM)};this.GM_getTabs=function(aM){return ag(aM)
};this.GM_setClipboard=function(aN,aM,aO){return aw(aN,aM,aO)
};Object.defineProperties(this,{GM_info:{get:function(){return ar()
},enumerable:true,configurable:true},})};var ac=TMwin.undefined;
var U=[];var af=null;for(var aF in W.grant){if(!W.grant.hasOwnProperty(aF)){continue
}if(W.grant[aF]==="none"){af=an;break}}var ae=W.namespace+"_"+!!af;
if(TMwin.props[ae]===ac){TMwin.props[ae]={sandboxes:{},elements:{}};
y.push(function(){TMwin.props[ae]=null})}if(!af){if(TMwin.use.proxy==="sandbox"){U.push({name:"window",value:"context",overwrite:true})
}if(!TMwin.use.safeContext){var aG={window:window};
for(var aF in aG){if(!aG.hasOwnProperty(aF)){continue
}var ak=function(){var aM=aF.replace(/^(.)/g,function(aN){return aN.toUpperCase()
});U.push({name:"unsafe"+aM,value:aG[aF]})};ak()}}}U.push({name:"CDATA",value:function(aM){this.src=aM;
this.toString=function(){return this.src};this.toXMLString=this.toString
}});U.push({name:"uneval",value:function(aM){try{return"$1 = "+JSON.stringify(aM)+";"
}catch(aN){console.log(aN)}}});if(TMwin.use.proxy!=="sandbox"){U.push({name:"console",value:console,type:E});
U.push({name:"JSON",value:JSON,type:E});U.push({name:"top",value:"window.unsafeTop",overwrite:true});
U.push({name:"location",value:window.location,type:E});
U.push({name:"document",value:window.document,type:E})
}U.push({name:"undefined",value:ac,type:E});var ab=[];
ab.push({name:"TM_addStyle",value:Y});ab.push({name:"TM_deleteValue",value:aI});
ab.push({name:"TM_listValues",value:az});ab.push({name:"TM_getValue",value:aD});
ab.push({name:"TM_log",value:am});ab.push({name:"TM_registerMenuCommand",value:p});
ab.push({name:"TM_unregisterMenuCommand",value:i});
ab.push({name:"TM_openInTab",value:w});ab.push({name:"TM_setValue",value:aB});
ab.push({name:"TM_addValueChangeListener",value:ax});
ab.push({name:"TM_removeValueChangeListener",value:ao});
ab.push({name:"TM_xmlhttpRequest",value:c});ab.push({name:"TM_setClipboard",value:aw});
ab.push({name:"TM_getTab",value:aA});ab.push({name:"TM_setTab",value:aK});
ab.push({name:"TM_saveTab",value:aK});ab.push({name:"TM_getTabs",value:ag});
ab.push({name:"TM_installScript",value:P});ab.push({name:"TM_runNative",value:Z});
ab.push({name:"TM_execUnsafe",value:an});ab.push({name:"TM_notification",value:at});
ab.push({name:"TM_getResourceText",value:ap,scriptid:W.id});
ab.push({name:"TM_getResourceURL",value:ad,scriptid:W.id});
var aa=[];var aJ=new aq();var R=[];for(var aF in aJ){R.push({name:aF,value:aJ[aF]})
}aa=aa.concat(ah(W.grant,ab,function(aM){return aM.replace(/^TM_/,"GM_")
}));aa=aa.concat(ah(W.grant,R));U=U.concat(aa);if(W.options.compat_prototypes){if(V||D){console.log("env: option: add toSource")
}if(!Object.prototype.toSource){Object.defineProperties(Object.prototype,{toSource:{value:function(){var aO=s(this);
if(aO==="String"){return"(String('"+this.replace(/\'/g,"\\'")+"'))"
}else{if(aO==="Number"){return"(Number('"+Number(this)+"'))"
}else{if(aO==="Array"){var aM="(new Array(";for(var aN=0;
aN<this.length;aN++){var aP=this[aN];var aO=s(aP);if(aO==="Null"){aM+="null"
}else{if(aO==="Undefined"){aM+="undefined"}else{aM+=this[aN].toSource()
}}if(aN+1<this.length){aM+=","}}aM+="))";return aM}}}return"JSON.parse(unescape('"+escape(JSON.stringify(this))+"'))"
},enumerable:false,writable:true,configurable:true,},})
}if(V||D){console.log("env: option: add some array generics")
}var T=["indexOf","lastIndexOf","filter","forEach","every","map","some","slice"];
T.forEach(function(aN){if(typeof Array[aN]!=="function"){var aM={};
aM[aN]={value:function(aO){return Array.prototype[aN].apply(aO,Array.prototype.slice.call(arguments,1))
},enumerable:false,writable:true,configurable:true,};
Object.defineProperties(Array,aM)}})}TMwin.props[ae].sandboxes[X.script.id]=TMwin.use.proxy==="sandbox"?L():t();
TMwin.props[ae].elements[X.script.id]=U;if(V||D){console.debug("env: execute script "+W.name+" @ the "+(!!af?"un":(TMwin.use.safeContext?"":"pseudo-"))+"safe context now!")
}K(W,X.code,X.requires,TMwin.props[ae],af);y.push(function(){S();
try{aC.disconnect();aC=null}catch(aM){}aL=null;X=null
})};C.extension.onMessage.addListener(function(W,T,R){if(V||EV){console.log("env: request.method "+W.method+" id: "+W.id)
}if(W.id&&W.id!=TM_context_id){console.warn("env: Not for me! "+TM_context_id+"!="+W.id);
return}var S=window.self==window.top;if(W.method=="executeScript"){var U=function(){o(W);
R({})};if(W.script.options.run_at=="document-start"){if(D){console.debug("env: run '"+W.script.name+"' ASAP -> document-start")
}j(U,W.script.id)}else{if(W.script.options.run_at=="document-body"){if(D){console.debug("env: schedule '"+W.script.name+"' for document-body")
}z(U,W.script.id)}else{if(D){console.debug("env: schedule '"+W.script.name+"' for document-end")
}B(U,W.script.id,W.script.name)}}}else{if(W.method=="onLoad"){TMwin.domContentLoaded=true;
u();R({});var Z=null;var X=function(){if(V||EV){console.log("env: disable nodeInserts magic!")
}Z=null;l=null};y.push(function(){if(Z){if(V||EV){console.log("env: cancel nodeInserts timeout!")
}window.clearTimeout(Z)}X()});Z=window.setTimeout(X,2000)
}else{if(S){if(W.method=="loadUrl"){window.location=W.url;
R({})}else{if(W.method=="reload"){window.location.reload();
R({})}else{if(W.method=="confirm"){var Y=function(){var aa=confirm(W.msg);
R({confirm:aa})};window.setTimeout(Y,100)}else{if(W.method=="showMsg"){var Y=function(){var aa=function(){alert(W.msg)
};window.setTimeout(aa,1);R({})};window.setTimeout(Y,100)
}else{if(W.method=="getSrc"){R({src:Helper.getSource(document)})
}else{console.log("env: unknown method "+W.method)}}}}}}}}});
N();h();M();r();e();document.addEventListener(J,O,false);
document.addEventListener(q,m,false);document.addEventListener(x,H,false);
window.addEventListener("unload",a,false);if(V||D){console.debug("env: initialized (content, id:"+TM_context_id+", "+window.location.origin+window.location.pathname+") ")
}});