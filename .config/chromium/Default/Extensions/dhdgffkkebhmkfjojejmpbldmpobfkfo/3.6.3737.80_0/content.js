
(function(){if(window._background!==undefined){console.warn(["content: Stop here, cause a second Tampermonkey instance was detected!",'This can be caused by using "document.write" at Userscripts.',"See https://code.google.com/p/chromium/issues/detail?id=253388 for more information"].join("\n"));
return}var f={_background:true,_webRequest:{},Converter:null,Eventing:null,V:false,D:false,EV:false,EMV:false,ENV:false,TS:false,CV:false,USV:false};
var d=function(){var M=[];for(var N in f){if(!f.hasOwnProperty(N)){continue
}window[N]=f[N]}};d();var I=function(){var M={};var R={webkitStorageInfo:true,JSLINT:true};
var Q=Object.getOwnPropertyNames(window);var N=(function(T,S){while(T=Object.getPrototypeOf(T)){S=S.concat(Object.getOwnPropertyNames(T))
}return S})(window,[]);for(var O=0,P=null;P=N[O];O++){if(R[P]||f[P]){continue
}if(P.length>2&&P.substr(0,2)==="on"){M[P]={proto:true,event:true}
}else{M[P]={proto:true}}}for(var O=0,P=null;P=Q[O];
O++){if(R[P]||f[P]||M[P]){continue}M[P]={window:true}
}return M};Registry.require("prepare");Registry.require("xmlhttprequest");
Registry.require("convert");Registry.require("helper");
var j=Registry.prepare();var t=Registry.get("xmlhttprequest");
var C=t.run;var A=Registry.get("helper");var r=A.clean;
Converter=Registry.get("convert");var y="DOMAttrModified";
var F=window.XMLHttpRequest;var s=null;var g=null;var l="";
var G={safeContext:j.RUNTIME.ALLOWS_SAFE_CONTEXT,scriptBlocker:false,proxy:false};
var B=null;var p=false;var h=false;var x=false;var u=false;
var w=function(){D|=(B>=60);EV|=(B>=80);V|=(B>=100);
ENV|=(B>=100);EMV|=(B>=100);TS|=(B>=100)};var n=function(){if(V||EV||D){console.log("content: detected DOMContentLoaded "+Eventing.contextId)
}x=true;if(p){c.sendMessage("domContentLoaded = true; if (typeof runAllLoadListeners !== 'undefined') runAllLoadListeners();")
}};var J=function(M){if(!u){if(V||EV||D){console.log("content: first DOMNodeInserted "+Eventing.contextId)
}u=true}};var c={responses:{},initstate:0,sendMessage:function(O){var N="";
if(this.initstate==0){this.initstate=1}else{if(this.initstate==1){N+="var V = "+(V?"true":"false")+";\n";
N+="var D = "+(D?"true":"false")+";\n";N+="var ENV = "+(ENV?"true":"false")+";\n";
N+="var TS = "+(TS?"true":"false")+";\n";N+="var Converter = "+A.serialize(Converter)+";\n";
N+="var TMwin = { backup: {}, use: "+JSON.stringify(G)+", windowProps: "+JSON.stringify(I())+", isIncognito: "+chrome.extension.inIncognitoContext+" };\n";
N+="var TMJSON = JSON;\n";N+="var _background = false;\n";
N+="var console = window['console'];\n";N+="var JSON = window['JSON'];\n";
N+="function JSONcheck() {\n";N+="        if (!JSON.parse || JSON.parse != 'function parse() { [native code] }') {\n";
N+="              if (TMJSON && TMJSON.parse == 'function parse() { [native code] }') {\n";
N+="                  JSON = TMJSON;\n";N+="                  console.log('page: use JSON backup');\n";
N+="              } else {\n";N+="                  JSON = window.JSON;\n";
N+="                  console.log('page: use JSON fallback');\n";
N+="              }\n";N+="        } else if (ENV) { \n";
N+="            console.log('page: JSON is fine');\n";
N+="        }\n";N+="};\n";N+="JSONcheck();\n";N+="var Eventing = "+A.serialize(Eventing).replace("___eval___","eval")+";\n";
N+="var TM_do = "+E.toString().replace("___eval___","eval")+";\n";
N+="Eventing.init();\n";N+="function cleanup(evt) {\n";
N+="    Eventing.cleanup();\n";N+="    window.removeEventListener('unload', cleanup, false);\n";
N+="    delete Eventing;\n";N+="    delete TMJSON;\n";
N+="    delete TMwin;\n";N+="    delete Converter;\n";
N+="    delete TS;\n";N+="    delete ENV;\n";N+="};\n";
N+="window.addEventListener('unload', cleanup, false);\n";
N+="if (ENV) console.log('page: env initialized ("+Eventing.contextId+")');\n";
if(!G.safeContext){var M=document.createElement("script");
M.textContent="(function TM_mother() { "+N+"\n"+O+"})();";
M.setAttribute("name","TM_internal");(document.head||document.body||document.documentElement||document).appendChild(M);
M.parentNode.removeChild(M)}else{window["eval"]("(function TM_mother() { "+N+"\n"+O+"})();")
}this.initstate=2}else{if(this.initstate==2){Eventing.fireEvent(O)
}}}},getResponseId:function(N){var M=0;if(N){while(M==0||c.responses[M]!=undefined){M=(new Date()).getTime()+Math.floor(Math.random()*6121983+1)
}c.responses[M]=N;if(V){console.log("content: registerResponseId "+M)
}}return M},runResponse:function(M,O){if(V){console.log("content: runResponse "+M+" -> "+Converter.decode(O))
}for(var N in c.responses){if(N==M){var Q="";try{Q=JSON.parse(Converter.decode(O));
if(!c.responses[N]){console.log("Warn: content: responseId "+N+" is undefined!!!")
}else{c.responses[N](Q)}}catch(P){console.log("content: Json parse error (runResponse):"+P+"\n"+O)
}c.responses[N]=null;return}}console.log("WARN: responseId "+M+" not found!")
}};var o={ports:{},log:function(M){if(_background){console.log("content: "+M)
}else{Eventing.fireEvent({fn:"log",args:"page: "+M})
}},onContentResponse:function(Q,O,N,P){if(_background){if(V){this.log("onContentResponse "+this.id+" "+N+" "+P)
}c.runResponse(N,Converter.encode(P))}else{var M=arguments;
Eventing.fireEvent({fn:"onContentResponse",args:M})
}},onResponse:function(S,Q,O,R){if(_background){try{if(V){this.log("onResponse "+this.id+" "+O+" "+R)
}var P=Converter.encode(R);var N="if (TMwin.chromeEmu) TMwin.chromeEmu.runResponse("+O+', "'+P+'")';
c.sendMessage(N);P="";N=""}catch(T){console.log("Error: processing onResponse")
}}else{var M=arguments;Eventing.fireEvent({fn:"onResponse",args:M})
}},onConnectResponse:function(S,Q,O,R){if(_background){try{if(V){this.log("onConnectResponse "+this.id+" "+O+" "+R)
}var P=Converter.encode(R);var N="if (TMwin.chromeEmu) TMwin.chromeEmu.runConnectResponse("+O+', "'+P+'")';
c.sendMessage(N);P="";N=""}catch(T){console.log("Error: processing onConnectResponse")
}}else{var M=arguments;Eventing.fireEvent({fn:"onConnectResponse",args:M})
}},onContentRequest:function(Q,P,N){if(_background){if(V){this.log("onContentRequest "+this.id+" "+N+" "+JSON.stringify(Q))
}if(Q.id&&this.id&&Q.id!=this.id){if(V){this.log("filter: "+Q.id+"!="+this.id)
}return}var O=Converter.encode(JSON.stringify({sender:P,request:Q}));
var M="if (TMwin.chromeEmu) TMwin.chromeEmu.runContentRequest("+N+', "'+O+'", 0);';
c.sendMessage(M);O="";M=""}else{console.log("Warn: onContentRequest from non BG not supported")
}},onMessage:function(Q,P,N){if(_background){if(V){this.log("onMessage "+this.id+" "+N+" "+JSON.stringify(Q))
}if(Q.id&&this.id&&Q.id!=this.id){if(V){this.log("filter: "+Q.id+"!="+this.id)
}return}var O=Converter.encode(JSON.stringify({sender:P,request:Q}));
var M="if (TMwin.chromeEmu) TMwin.chromeEmu.runRequest("+N+', "'+O+'", 0)';
c.sendMessage(M);O="";M=""}else{console.log("Warn: onMessage from non BG not supported")
}},runUpdateListener:function(){console.log("WARN: not supported!")
},getUrl:function(){console.log("WARN: not supported!")
},sendExtensionMessage:function(Q,P,N){if(_background){if(V){this.log("sendExtensionMessage "+this.id+" "+N+" "+P)
}var O=function(S){o.onResponse(Q,0,N,JSON.stringify(S))
};var R=JSON.parse(P);R.responseId=N;chrome.extension.sendMessage(R,O);
R=null}else{var M=arguments;Eventing.fireEvent({fn:"sendExtensionMessage",args:M})
}},sendExtensionConnect:function(R,Q,N){if(_background){var T=JSON.parse(Q);
T.responseId=N;if(V){this.log("sendExtensionConnect "+this.id+" "+N+" "+Q)
}var S=function(U){o.onConnectResponse(R,0,N,JSON.stringify({onMessage:true,msg:U}))
};var P=function(U){o.onConnectResponse(R,0,N,JSON.stringify({onDisconnect:true}));
T=null};var O=chrome.extension.connect({name:T});O.onMessage.addListener(S);
O.onDisconnect.addListener(P);o.ports[N]=O}else{var M=arguments;
Eventing.fireEvent({fn:"sendExtensionConnect",args:M})
}},sendExtensionPortMessage:function(Q,P,N){if(_background){if(V){this.log("sendExtensionPortMessage "+this.id+" "+N+" "+P)
}var O=o.ports[N];if(!O){this.log("Error: sendExtensionPortMessage unable to find port "+N)
}else{var R=JSON.parse(P);R.responseId=N;O.postMessage(R);
R=null}}else{var M=arguments;Eventing.fireEvent({fn:"sendExtensionPortMessage",args:M})
}},sendTabsRequest:function(){console.log("WARN: not supported!")
},createTab:function(){console.log("WARN: not supported!")
},queryTab:function(){console.log("WARN: not supported!")
},updateTab:function(){console.log("WARN: not supported!")
},onUpdated:function(){console.log("WARN: not supported!")
},getMessage:function(){console.log("WARN: not supported!")
},storageKey:function(){console.log("WARN: not supported!")
},storageRemoveItem:function(){console.log("WARN: not supported!")
},storageSetItem:function(){console.log("WARN: not supported!")
},storageGetItem:function(){console.log("WARN: not supported!")
},storageLength:function(){console.log("WARN: not supported!")
}};var E=function(P){var M={};if(_background){M=G}else{M=TMwin.use
}if(M.safeContext){var O=null;if(typeof P==="object"){O=JSON.stringify(P)
}else{O=JSON.stringify({method:"eval",arg:P})}var N=document.createEvent("MutationEvent");
N.initMutationEvent(Eventing.eventId+"#"+Eventing.contextId,false,false,null,null,null,O,N.ADDITION);
document.dispatchEvent(N);return N.returnValue}else{if(!_background){___eval___(P)
}else{console.log("ERROR: assert(use.safeContext)")
}}};var a=function(M){var N=function(aa){var T=null,Y;
try{T=JSON.parse(aa.attrName);Y=window["passenger_"+aa.type.replace(/[^#]*#/,"")];
if(T.method=="get"){var S=T.path.split(".");var W=window;
for(var X=0;X<S.length;X++){W=W[S[X]]}var U=W[T.name];
var R={};R.value=U;Y["_"+T.id]=R}else{if(T.method=="set"){var S=T.path.split(".");
var W=window;for(var X=0;X<S.length;X++){W=W[S[X]]}var ab=Y[T.id];
W[T.name]=ab.value;Y["_"+T.id]={}}else{if(T.method=="delete"){var S=T.path.split(".");
var W=window;for(var X=0;X<S.length;X++){W=W[S[X]]}delete W[T.name];
Y["_"+T.id]={}}else{if(T.method=="eval"){___eval___(T.arg)
}}}}if(T.id){delete Y[T.id]}}catch(Z){}aa=null};var P="document.addEventListener('"+Eventing.eventId+"#"+Eventing.contextId+"', "+N.toString().replace("___eval___","eval")+", false);\n";
var O=M.document.createElement("script");O.setAttribute("name","TM_internal");
O.innerHTML=P;var Q=M.document;(Q.documentElement||Q).appendChild(O);
O.parentNode.removeChild(O)};var K=function(){G.scriptBlocker=true;
var N=function(R){if(R.alert){alert(R.alert)}};var O=!!document.getElementById("xml-viewer-style");
var M=!!document.getElementsByTagName("catalog").length;
var Q=(O||M);if(Q){console.info("content: XML file detected, unsafeWindow retrieval failed!")
}else{console.warn("content: unsafeWindow retrieval failed! Do you use a script blocker like 'ScriptSafe'?")
}var P={method:"scriptBlockerDetected",id:Eventing.contextId,url:window.location.origin+window.location.pathname,xml_style_detected:Q,params:window.location.search+window.location.hash};
chrome.extension.sendMessage(P,N)};var v=function(){if(G.proxy==="unsafe"){console.warn("content: Chrome >= 27 detected! You've set the unsafeWindow retrieval method to 'unsafe'. This can cause problems because of incomplete environment separation between userscript and the page's scripts!")
}else{if(G.safeContext){var M=Eventing.contextId;a(window);
if(G.proxy==="native"){window.unsafeWindow=window;if(j.RUNTIME.NEED_UNSAFEWINDOW_PROXY){console.warn("content: Chrome >= 27 detected! Tampermonkey needs a special Chrome option to be set. Visit http://tampermonkey.net/faq#Q404 for more infos.")
}}}}};function i(){var M=[window.HTMLElement.prototype,document.__proto__];
for(var O=0;O<M.length;O++){var N=function(){var P=M[O];
var Q=Object.getOwnPropertyDescriptor(P,"wrappedJSObject");
if(!Q){var R={wrappedJSObject:{get:function(){return this
},enumerable:false,configurable:true},};Object.defineProperties(P,R);
r.push(function(){if(CV){console.log("clean: "+A.toType(P)+"[wrappedJSObject]")
}delete P.wrappedJSObject})}};N()}}function b(){var O=false;
var R=true;var P=function(){var T=document.createElement("p");
var S=false;T.addEventListener("DOMAttrModified",function(){S=true
},false);T.setAttribute("class","trigger");return S
};if(P()){return}var M=[window.HTMLElement.prototype,document.__proto__];
for(var Q=0;Q<M.length;Q++){var N=M[Q];if(!N.___addEventListener){N.___addEventListener=N.addEventListener;
N.___removeEventListener=N.removeEventListener;N.removeEventListener=function(U,T,S){this.___removeEventListener(U,T,S)
};N.addEventListener=function(S,ad,Y){if(S==y){if(this.outerHTML){var U=this.outerHTML.split(">")[0]+" />";
var Z=this;var W;if(this.parentNode){W=this.parentNode
}else{W=this}var ae=function(ai,ah,aj,ag){var af=document.createEvent("MutationEvent");
af.initMutationEvent("DOMAttrModified",true,false,ai,aj||"",ag||"",ah,(aj==null)?af.ADDITION:(ag==null)?af.REMOVAL:af.MODIFICATION);
ai.dispatchEvent(af)};try{var T=function(ag){for(var ai in ag){if(!ag.hasOwnProperty(ai)){continue
}var af=ag[ai];if(af.attributeName!=""&&af.target){var aj=af.oldValue;
var ah=af.target.getAttribute(af.attributeName);if(aj!=ah){ae(Z,af.attributeName,aj,ah)
}}}};var ac=new WebKitMutationObserver(T);ac.observe(Z,{childList:false,subtree:false,attributeOldValue:true,attributes:true})
}catch(ab){var X=function(ai,ah){if(ah==undefined){ah={}
}var af=ai.replace(/\\\"/g,"").replace(/".*?"/g,"").replace(/^<[a-zA-b0-9]* |>$/g,"").split(" ");
for(var ag in af){if(!af.hasOwnProperty(ag)){continue
}var aj=af[ag];if(aj.substr(aj.length-1,1)=="="){ah[aj.substr(0,aj.length-1)]=null
}}return ah};var aa=function(am){if(am.target==Z){var ag=am.target.outerHTML.split(">")[0]+" />";
if(U!=ag){var af=document.createElement("div");af.innerHTML=U;
var ao=af.childNodes[0];var ak=document.createElement("div");
ak.innerHTML=ag;var ai=ak.childNodes[0];var an=X(U,X(ag));
for(var aj in an){if(!an.hasOwnProperty(aj)){continue
}var ah=ao.getAttribute(aj);var al=ai.getAttribute(aj);
if(ah!=al){ae(Z,aj,ah,al)}}U=ag}}};R=false;if(!O){console.log("content: WARN unable to use MutationObserver -> fallback to DOMSubtreeModified event")
}O=true;W.addEventListener("DOMSubtreeModified",aa,true)
}}}this.___addEventListener(S,ad,Y)};r.push(function(){N.removeEventListener=N.___removeEventListener;
N.addEventListener=N.___addEventListener})}}}Eventing={topframe:(window.self===window.top),eventId:"TM_do",contextId:null,rEventId:null,sEventId:null,eventSource:null,generateScriptId:function(){var M="";
M+=Math.floor(Math.random()*6121983+1);M+=((new Date()).getTime().toString()).substr(10,7);
return M},log:function(M){console.log((_background?"content":"page")+": "+M)
},alternativeEventSource:{element:{dispatchEvent:function(M){if(!window.Registry._altEventing){window.Registry._altEventing={}
}if(window.Registry._altEventing[M.type]){window.Registry._altEventing[M.type](M)
}},addEventListener:function(N,M){if(!window.Registry._altEventing){window.Registry._altEventing={}
}window.Registry._altEventing[N]=M},removeEventListener:function(M){if(!window.Registry._altEventing){window.Registry._altEventing={}
}delete window.Registry._altEventing[M]}},event:{encode:function(M,N){return{type:M,data:N}
},decode:function(M){return M.data}}},standardEventSource:{element:{dispatchEvent:function(){return document.dispatchEvent.apply(document,arguments)
},addEventListener:function(){return document.addEventListener.apply(document,arguments)
},removeEventListener:function(){return document.removeEventListener.apply(document,arguments)
}},event:{encode:function(N,O){var M=document.createEvent("MutationEvent");
M.initMutationEvent(N,false,false,null,null,null,Converter.encodeR(JSON.stringify(O)),M.ADDITION);
return M},decode:function(M){return JSON.parse(Converter.decodeR(M.attrName))
}}},init:function(){if(!Eventing.contextId){Eventing.log("Eventing.init() failed!!!");
return}var N="TM_toPage";var O="TM_toContent";var M={};
if(_background){M=G;Eventing.rEventId=O;Eventing.sEventId=N;
Eventing.eventHandler=Eventing.eventHandlerContent}else{M=TMwin.use;
Eventing.rEventId=N;Eventing.sEventId=O;Eventing.eventHandler=Eventing.eventHandlerPage
}if(M.safeContext){Eventing.eventSource=Eventing.alternativeEventSource
}else{Eventing.eventSource=Eventing.standardEventSource
}if(V){Eventing.log("Eventing initialized ("+Eventing.contextId+")")
}Eventing.registerListener()},fireEvent:function(O,M){if(M==undefined){M=Eventing.sEventId+Eventing.contextId
}if(ENV){Eventing.log("fireEvent "+M+" -> "+JSON.stringify(O))
}try{var N=Eventing.eventSource.event.encode(M,O);Eventing.eventSource.element.dispatchEvent(N)
}catch(P){Eventing.log("Error: fire event "+M+" -> "+JSON.stringify(O)+" "+P)
}},registerListener:function(){if(ENV){Eventing.log("registerListener "+Eventing.rEventId+Eventing.contextId)
}Eventing.eventSource.element.addEventListener(Eventing.rEventId+Eventing.contextId,Eventing.eventHandler,false)
},eventHandlerPage:function(M){try{if(ENV){Eventing.log("Event received "+Eventing.rEventId+Eventing.contextId+" "+M.attrName)
}var N=Eventing.eventSource.event.decode(M);try{___eval___(N);
if(TS){Eventing.log("it took "+((new Date()).getTime()-M.timeStamp)+" ms to process this event ->"+N.fn)
}}catch(O){console.log("page: Error: processing event! "+O.message+" -> ("+N+")")
}N=""}catch(O){Eventing.log("Error: retrieving event! "+O.message);
Eventing.log(M)}M=null},eventHandlerContent:function(M){try{if(V){Eventing.log("Event received "+Eventing.rEventId+Eventing.contextId+" "+M.attrName)
}var N=Eventing.eventSource.event.decode(M);try{o[N.fn](N.args[0],N.args[1],N.args[2],N.args[3],N.args[4],N.args[5],N.args[6],N.args[7]);
if(TS){Eventing.log("it took "+((new Date()).getTime()-M.timeStamp)+" ms to process this event ->"+N.fn)
}}catch(O){Eventing.log("Error: processing event ("+N.fn+")! "+O.message)
}N=""}catch(O){Eventing.log("Error: retrieving event! "+O.message);
Eventing.log(M)}M=null},cleanup:function(){if(Eventing.eventSource){Eventing.eventSource.element.removeEventListener(Eventing.rEventId+Eventing.contextId,Eventing.eventHandler,false)
}}};var L={init:function(){window.addEventListener("load",L.runHlp,false);
window.addEventListener("DOMNodeInserted",L.runHlp,false);
window.addEventListener("DOMContentLoaded",L.runHlp,false)
},runHlp:function(M){if(!p){if(!document.head&&!document.body){if(M==undefined){window.setTimeout(L.runHlp,100)
}return}else{L.cleanupHlp();L.run()}}},run:function(){if(!p&&g&&s){var N="var V = "+(V?"true":"false")+";\n";
N+="var EV = "+(EV?"true":"false")+";\n";N+="var ENV = "+(ENV?"true":"false")+";\n";
N+="var EMV = "+(EMV?"true":"false")+";\n";N+="var logLevel = "+B+";\n";
var M="var tmCE = "+A.serialize(o)+";\nvar Event = function() {};\n";
var O="var TM_context_id = '"+Eventing.contextId+"';\n";
var P="";c.sendMessage("console.log('Tampermonkey started');");
if(x){P+="TMwin.loadHappened = true;\n";P+="TMwin.domContentLoaded = true;\n";
if(V||EV||D){console.log("content: Start ENV with DOMContentLoaded "+Eventing.contextId)
}}else{if(u){P="TMwin.loadHappened = true;\n";if(V||EV||D){console.log("content: Start ENV with loadHappened "+Eventing.contextId)
}}}if(P!=""&&(V||EV)){console.log("content: Start ENV normally "+Eventing.contextId)
}var Q="(function () { "+N+O+l+M+s+g+P+"})();";c.sendMessage(Q);
g=null;s=null;M=null;p=true}},cleanupHlp:function(){if(!p){window.removeEventListener("load",L.runHlp,false);
window.removeEventListener("DOMNodeInserted",L.runHlp,false);
window.removeEventListener("DOMContentLoaded",L.runHlp,false)
}}};function e(){if(V){console.log("content: cleanup!")
}var M={method:"unLoad",id:Eventing.contextId,topframe:Eventing.topframe,url:window.location.origin+window.location.pathname,params:window.location.search+window.location.hash};
chrome.extension.sendMessage(M,function(O){});try{Eventing.cleanup();
L.cleanupHlp()}catch(N){console.log("cleanup: Error: "+N.message)
}window.removeEventListener("DOMContentLoaded",n,false);
window.removeEventListener("DOMNodeInserted",J,false);
window.removeEventListener("unload",e,false);if(r!=null){r.finalize();
r=null}else{console.log("content: Warning: multiple unload events detected!!!")
}}function k(O,N,M){if(!p){window.setTimeout(function(){k(O,N,M)
},10);return true}if(h){var Q=c.getResponseId(M);o.onContentRequest(O,N,Q)
}else{if(O.method=="getSrc"){M({src:A.getSource(document)})
}else{if(O.method=="confirm"){var P=function(){var R=confirm(O.msg);
M({confirm:R})};window.setTimeout(P,100)}else{if(O.method=="showMsg"){var P=function(){var R=function(){alert(O.msg)
};window.setTimeout(R,1);M({})};window.setTimeout(P,100)
}}}}return true}var z=2;var m=function(){if(D){console.debug("content: create test XHR to check whether webRequest API is working")
}var O={method:"GET",url:"http://tampermonkey.net/empty.html",headers:{Referer:"http://doesnt.matter.com"},};
var N=function(P){if(P.webRequest){_webRequest=P.webRequest;
t.setWebRequest(_webRequest)}if(V){console.log("content: updated webRequest info")
}};var M=function(){var P={method:"getWebRequestInfo",id:Eventing.contextId};
chrome.extension.sendMessage(P,N)};C(O,{ondone:M})};
var q=1;var H=function(){var O="emulation.js";var P="environment.js";
var M=function(T){if(T===undefined){if(D){console.debug("content: _early_ execution, connection to bg failed -> retry!")
}window.setTimeout(H,q);q*=2;return}B=T.logLevel;w();
if(T.enabledScriptsCount){G.proxy=T.unsafeWindow;if(G.proxy==="auto"){G.proxy="sandbox"
}G.safeContext&=(G.proxy!=="unsafe"&&G.proxy!=="sandbox");
R();Eventing.init();if(V||D){console.log("content: Started ("+Eventing.contextId+", "+window.location.origin+window.location.pathname+")")
}if(p){c.sendMessage("TMwin.adjustLogLevel("+B+");\n")
}if(V||D){console.log("content: start event processing for "+Eventing.contextId+" ("+T.enabledScriptsCount+" to run)")
}h=true;if(T.webRequest){_webRequest=T.webRequest;t.setWebRequest(_webRequest);
if(_webRequest.headers&&!_webRequest.verified&&z-->0){m()
}}L.runHlp()}else{if(V||D){console.log("content: disable event processing for "+Eventing.contextId)
}L.cleanupHlp();e();h=false;p=true}};var N=[];try{s="("+Registry.getRaw(O)+")();\n";
g="("+Registry.getRaw(P)+")();\n"}catch(S){}var R=function(){v();
b();i();c.sendMessage()};Eventing.contextId=Eventing.generateScriptId();
o.id=Eventing.contextId;window.addEventListener("unload",e,false);
window.addEventListener("DOMContentLoaded",n,false);
window.addEventListener("DOMNodeInserted",J,false);
chrome.extension.onMessage.addListener(k);var Q={method:"prepare",id:Eventing.contextId,raw:N,topframe:Eventing.topframe,url:window.location.origin+window.location.pathname,params:window.location.search+window.location.hash};
chrome.extension.sendMessage(Q,M)};H()})();