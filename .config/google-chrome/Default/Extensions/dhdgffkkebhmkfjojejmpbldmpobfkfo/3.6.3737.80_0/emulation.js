
Registry.registerRaw("emulation.js","3737.80",function(){if(!window.console&&!console){console={log:function(c){tmCE.log((_background?"BG: ":"")+c)
},warn:function(c){tmCE.log((_background?"BG: ":"")+c)
},error:function(c){tmCE.log((_background?"BG: ":"")+c)
}}}if(!Converter){Converter={decode:function(c){return atob(c)
},encode:function(c){return btoa(data)}}}var a=function(c){if(c==undefined){return undefined
}else{if(c==null){return null}else{return String(c)
}}};var b={key:"##REPLACE_KEY##",responses:{},clean:function(){b.responses=null;
b.extension.requestHandlers=null;b.tabs.updateListeners=null;
b=null},runUpdateListeners:function(f,g,h){if(EMV){console.log("emu: runUpdateListeners "+f+" URL: "+h.url)
}for(var d=0;d<b.tabs.updateListeners.length;d++){var c=b.tabs.updateListeners[d];
try{c(f,g,h)}catch(i){console.log("emu: Error (runUpdateListeners):"+i+"\n"+c.toString())
}}},runRequestHandlers:function(i,h,d,m){if(EMV){console.log("emu: runRequestHandlers "+d)
}for(var g=0;g<b.extension.requestHandlers.length;g++){var c=b.extension.requestHandlers[g];
try{var f=function(e){tmCE.onResponse(b.key,m,d,JSON.stringify(e))
};c(i,h,f)}catch(j){console.log("emu: Error (runRequestHandlers):"+j+"\n"+c.toString())
}}},runContentRequestHandlers:function(i,h,d,m){if(EMV){console.log("emu: runRequestHandlers "+d)
}for(var g=0;g<b.extension.requestHandlers.length;g++){var c=b.extension.requestHandlers[g];
try{var f=function(e){tmCE.onContentResponse(b.key,m,d,JSON.stringify(e))
};c(i,h,f)}catch(j){console.log("emu: Error (runContentRequestHandlers):"+j+"\n"+c.toString())
}}},runRequest:function(c,d,h){try{if(EMV){console.log("emu: runRequest "+c+" -> "+Converter.decode(request))
}var f=JSON.parse(Converter.decode(d));b.runRequestHandlers(f.request,f.sender,c,h);
f=""}catch(g){console.log("emu: Json parse error (runRequest):"+g+"\n"+d)
}},runContentRequest:function(c,d,h){try{if(EMV){console.log("runContentRequest "+c+" -> "+Converter.decode(d))
}var f=JSON.parse(Converter.decode(d));b.runContentRequestHandlers(f.request,f.sender,c,h);
f=""}catch(g){console.log("emu: Json parse error (runContentRequest):"+g+"\n"+d)
}},runResponse:function(c,f){try{for(var d in b.responses){if(d==c){if(EMV){console.log("emu: runResponse "+c+" -> "+Converter.decode(f))
}var h="";try{h=JSON.parse(Converter.decode(f));b.responses[d](h)
}catch(g){console.log("emu: Json parse error (runResponse):"+g+"\n"+f)
}h="";delete b.responses[d];return}}}catch(g){console.log("emu: Json parse error (runResponse):"+g+"\n"+f)
}console.log("WARN: emu: responseId "+c+" not found!")
},runConnectResponse:function(c,g){try{for(var f in b.responses){if(f==c){if(EMV){console.log("emu: runConnectResponse "+c+" -> "+Converter.decode(g))
}var i="";var d=false;try{i=JSON.parse(Converter.decode(g));
b.responses[f](i);d=i.onDisconnect}catch(h){console.log("emu: Json parse error (runConnectResponse):"+h+"\n"+g)
}i="";if(d){b.responses[f]=null}return}}}catch(h){console.log("emu: Json parse error (runConnectResponse):"+h+"\n"+g)
}console.log("WARN: emu: responseId "+c+" not found!")
},getResponseId:function(d){var c=0;if(d){while(c==0||b.responses[c]!=undefined){c=((new Date()).getTime()+Math.floor(Math.random()*6121983+1)).toString()
}b.responses[c]=d;if(EMV){console.log("emu: registerResponseId "+c)
}}return c},extension:{requestHandlers:[],getURL:function(c){return a(tmCE.getUrl(b.key,c))
},connect:function(d){var c={oMlisteners:[],oDlisteners:[],notifyListeners:function(h,g){for(var j=0;
j<h.length;j++){h[j](g)}},postMessage:function(g){tmCE.sendExtensionPortMessage(b.key,JSON.stringify(g),f)
},onMessage:{addListener:function(g){c.oMlisteners.push(g)
}},onDisconnect:{addListener:function(g){c.oDlisteners.push(g)
}},disconnect:function(){c.oMlisteners=null;c.oDlisteners=null;
c=null}};var e=function(g){if(g.onMessage){if(c){c.notifyListeners(c.oMlisteners,g.msg)
}}else{if(g.onDisconnect){if(c){c.notifyListeners(c.oDlisteners);
c=null}}}};var f=b.getResponseId(e);tmCE.sendExtensionConnect(b.key,JSON.stringify(d),f);
return c},sendMessage:function(d,c){var e=b.getResponseId(c);
if(EMV){console.log("emu: extension.sendMessage "+e+" # "+JSON.stringify(d))
}tmCE.sendExtensionMessage(b.key,JSON.stringify(d),e)
},onMessage:{addListener:function(c){b.extension.requestHandlers.push(c)
}}},i18n:{getMessage:function(){var d=[];for(var e=0;
e<arguments.length;e++){d.push(arguments[e])}var c=tmCE.getMessage(b.key,JSON.stringify(d));
return a(c)}},tabs:{updateListeners:[],sendMessage:function(d,e,c){var f=b.getResponseId(c);
if(EMV){console.log("emu: tabs.sendMessage "+f)}tmCE.sendTabsRequest(b.key,d,JSON.stringify(e),f)
},create:function(c){if(EMV){console.log("emu: tabs.create "+c)
}tmCE.createTab(b.key,JSON.stringify(c))},query:function(c,e){var d=b.getResponseId(e);
tmCE.queryTab(b.key,JSON.stringify(c),d)},update:function(c,d){tmCE.updateTab(b.key,c,d)
},onUpdated:{addListener:function(c){b.tabs.updateListeners.push(c)
}}}};if(EMV){console.log("emu: Started ("+window.location.origin+window.location.pathname+")")
}if(!TMwin.chromeEmu){Object.defineProperties(TMwin,{chromeEmu:{value:b,enumerable:false,writable:false,configurable:false,},})
}});