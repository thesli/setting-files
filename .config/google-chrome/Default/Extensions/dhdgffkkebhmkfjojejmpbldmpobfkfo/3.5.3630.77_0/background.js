
var trup=null;var rase=null;var rsse=null;var init=null;
var fire=null;var lfgs=null;var sycl=null;var cfgo=null;
var uris=null;var clip=null;var D=false;var V=false;
var T=false;var EV=false;var MV=false;var UV=false;
var SV=false;var YV=false;var CV=false;var NV=false;
var RV=false;var TV=false;Registry.require("statistics");
Registry.require("convert");Registry.require("xmlhttprequest");
Registry.require("cache");Registry.require("storage");
Registry.require("uri");Registry.require("compat");
Registry.require("parser");Registry.require("helper");
Registry.require("syncinfo");Registry.require("notify");
Registry.require("i18n");Registry.require("native");
(function(){var K=function(a0){D|=(a0>=60);YV|=(a0>=60);
TV|=(a0>=60);RV|=(a0>=80);EV|=(a0>=80);NV|=(a0>=80);
CV|=(a0>=100);UV|=(a0>=100);MV|=(a0>=100);V|=(a0>=100);
SV|=(a0>=100);a.debug(!!YV);n.debug(D,SV);aH.debug(D)
};const k=-2;const m=-1;const C=0;const ac=1;const r="uso:hash";
const g="uso:timestamp";const ao="uso:script";var aw=Registry.get("prepare").FEATURES.PREPARED_FOR_BACKGROUND();
var aG=function(){var a0=true;var a5=function(a6,ba,a7){var a8={title:a6.join("\n\n")};
console.warn(a6.join("\n"));chrome.browserAction.setIcon(ba);
chrome.browserAction.setTitle(a8);var a9=function(be,bd,bb){var bc=[];
bc.push({name:"1",section:true,pos:"left"});bc.push({name:a6[0],image:chrome.extension.getURL("images/info.png")});
bc.push({name:a6[1],});bb({items:bc,options:{enabled:false}})
};if(!a7){chrome.extension.onMessage.addListener(a9)
}};try{var a2=Registry.verify("3630.77");
if(a2.length){var a1=["Tampermonkey detected that Chrome is caching some outdated code parts.","In order to avoid unexpected behavior TM will be kept paused until Chrome was restarted."];
var a3={path:chrome.extension.getURL("images/icon_grey_paused.png")};
a0=false;a5(a1,a3)}else{if(chrome.extension.inIncognitoContext&&aw.RUNTIME.CHROME&&aw.RUNTIME.BROWSER_VERSION<28){var a1=["Tampermonkey detected that it can not work in incognito mode with your browser version.","Please update your browser to version 28 or higher."];
var a3={path:chrome.extension.getURL("images/icon_grey_paused.png")};
a0=false;a5(a1,a3)}}}catch(a4){a0=false;console.error(a4.message)
}if(aw.DB.USE_STORAGE&&!aw.DB.NO_WARNING){chrome.storage.local.get(null,function(){var a7=!chrome.runtime||!chrome.runtime.lastError;
if(!a7){if(chrome.runtime.lastError){console.warn("storage:",chrome.runtime.lastError.message)
}if(confirm("Tampermonkey detected that your Chrome profile is broken!\n\nUnfortunately all extension data including your settings and userscripts is stored at the profile.\n\nDo you want to visit the FAQ entry that explains how to recover from that?")){var a9={url:"http://tampermonkey.net/faq#Q206"};
chrome.tabs.create(a9,function(){})}var a6=["Tampermonkey detected that your Chrome profile is broken!"];
var a8={path:chrome.extension.getURL("images/icon_grey_paused.png")};
a5(a6,a8,true)}})}return a0};if(!aG()){return}var aW=aw.WEBREQUEST;
var aU=aw.HTML5.LOCALSTORAGE;var I=(new Date()).getTime()+Math.floor(Math.random()*61283+1);
var at={};var aX={};var aL=null;var M="@re";var ap="@st";
var aB="@source";var aC="@header";if(D||V){console.debug("Starting background fred @"+I)
}var aa=Registry.get("helper");var O=Registry.get("cache");
var av=Registry.get("statistics");var n=Registry.get("storage").create(aw);
var aH=Registry.get("notify").create(aw);var aS=Registry.get("native").create(aw);
var Z=Registry.get("icon");O.create("requires").setOptions({timeout:30*60,check_interval:5*60}).init();
O.create("resources").setOptions({timeout:30*60,check_interval:5*60}).init();
O.create("rundata").setOptions({timeout:3*60,check_interval:2*60,retimeout_on_get:true}).init();
var Q=function(a7,a6){if(V){console.log("versionCmp: "+a7+" : "+a6)
}var a3=function(a1){return aa.filter(a1.replace(/-/g,"."),/[\.0-9]/g)
};var ba=a3(a7);var a9=a3(a6);var a4=ba.split(".");
var a0=a9.split(".");var a8=a4.length<a0.length?a4.length:a0.length;
for(var a5=0;a5<a8;a5++){if(a4.length<a8){a4[a5]=0}if(a0.length<a8){a0[a5]=0
}if(Number(a4[a5])>Number(a0[a5])){return ac}else{if(Number(a4[a5])<Number(a0[a5])){return m
}}}if(a0.length<a4.length){return ac}return C};chrome.extension.manifest=(function(){var a0=chrome.extension.getURL("manifest.json");
var a1;try{if(a0&&a0.search("{")!=-1){a1=JSON.parse(a0)
}else{var a3=new XMLHttpRequest();a3.open("GET",a0,false);
a3.send(null);a1=JSON.parse(a3.responseText)}}catch(a2){console.log("getVersion"+a2.message);
a1={version:"0.0.0.0",name:"Tampermonkey"}}return a1
})();chrome.extension.getVersion=function(){return chrome.extension.manifest.version
};chrome.extension.getName=function(){return chrome.extension.manifest.name
};var aD=function(a1){var a0="0.0.0.0";var ba=chrome.extension.getVersion();
var a8=n.getVersion(a0);var a9=function(bi,bb){var bh=new A.Script();
var bg=R();var be=1;var bc=function(){if(--be==0&&bb){window.setTimeout(bb,1)
}};for(var bd in bg){var bf=function(){var bn=bg[bd];
var bj=E(bn);if(!bj.script||!bj.cond){console.error(aP.getMessage("fatal_error")+" ("+bn+")!!!");
return}for(var bk in bh.options){if(!bh.options.hasOwnProperty(bk)){continue
}if(bj.script.options[bk]===undefined){console.log("set option "+bk+" to "+JSON.stringify(bh.options[bk]));
bj.script.options[bk]=bh.options[bk]}}for(var bm in bh.options.override){if(bj.script.options.override[bm]===undefined){console.log("set option.override."+bm+" to "+JSON.stringify(bh.options.override[bm]));
bj.script.options.override[bm]=bh.options.override[bm]
}}var bl=function(){bj.script=c(bj.script);if(bi){var bo={url:bj.script.fileURL,src:bj.script.textContent,ask:false,cb:function(bp){},hash:bj.script.hash};
Y(bo)}else{bj.script.id=A.getScriptId(bj.script.name);
q(bj.script.name,bj.script,false)}bc()};if(bb){be++;
window.setTimeout(bl,10)}else{bl()}};bf()}bc()};var a6=function(){a9(true)
};var a4=Q(ba,a8)==ac;var a3=[];var a2=0;var a7=false;
var a5=function(){if(a2<a3.length){var bb=function(){window.setTimeout(a5,aw.MISC.TIMEOUT)
};if(a3[a2].cond()){a3[a2].fn(bb)}else{bb()}a2++}};
a3=[{cond:function(){return a4&&aw.DB.USE_STORAGE&&Q("3.5.3603",a8)==ac
},fn:function(bb){console.log("Update config...");n.migrate.fromSqlToStorage(function(bc){if(bc){a8=bc
}console.log("Migrated config to use chrome.storage");
window.setTimeout(bb,aw.MISC.TIMEOUT)})}},{cond:function(){return a4&&Q("3.5.3630.41",a8)==ac&&aw.RUNTIME.BROWSER_VERSION<30
},fn:function(bb){console.log("Update config from "+a8+" to 3.5.3630.41");
n.migrate.fromSqlToStorage(function(){window.setTimeout(bb,aw.MISC.TIMEOUT)
},true)}},{cond:function(){return a4&&Q("2.12.3033",a8)==ac
},fn:function(bb){console.log("Update config from "+a8+" to 2.12.3033");
var be=R();for(var bc in be){var bf=be[bc];var bd=E(bf);
if(!bd.script||!bd.cond){console.error(aP.getMessage("fatal_error")+" ("+bf+")!!!");
continue}bd.script.options.override.orig_noframes=bd.script.options.noframes;
if(bd.script.options.noframes===false){bd.script.options.noframes=null
}q(bd.script.name,bd.script,false)}window.setTimeout(bb,aw.MISC.TIMEOUT)
}},{cond:function(){return a4&&Q("3.0.3224",a8)==ac
},fn:function(bb){console.log("Update config from "+a8+" to 3.0.3224");
var bd=n.getValue("TM_config",null);if(bd){for(var bc in bd){if(!bd.hasOwnProperty(bc)){continue
}if(bc=="scriptblocker_overwrite"){bd[bc]="no"}else{if(bc=="notification_showUpdate"){bd[bc]="changelog"
}}}n.setValue("TM_config",bd)}window.setTimeout(bb,aw.MISC.TIMEOUT)
}},{cond:function(){return a4},fn:function(bb){console.log("First run of version "+ba+"!");
var bc=aw.MISC.UNLOAD_TIMEOUT,bd=aU.getItem("TM_unload_ts",null);
try{if(bd!==null){bc=Math.floor(((new Date()).getTime()-Number(bd))/1000)
}}catch(be){}aL={newV:ba,oldV:a8,first_run:(a8==a0),active:(bc>=aw.MISC.UNLOAD_TIMEOUT)};
n.setVersion(ba);window.setTimeout(bb,aw.MISC.TIMEOUT)
}},{cond:function(){return true},fn:function(bb){if(a1){a1()
}window.setTimeout(bb,aw.MISC.TIMEOUT)}}];a5();rase=a9;
rsse=a6};var ab=(function(){var a0={get:function(a7,a1){var a2=(a7==0)+"#"+a1;
var a8=O.items.rundata.getj(a2);if(a8){a8.oldret.user_agent[a7]=a8.oldret.user_agent[a8.frameId];
a8=a8.oldret}else{var a5=aZ(a1);var ba=[];var a6=0;
var a3={};var bb={};for(var a4=0;a4<a5.length;a4++){var a9=a5[a4];
if(V){console.log("check "+a9.name+" for enabled:"+a9.enabled)
}if(!a9.enabled){a6++;continue}if(a7!=0&&(a9.options.noframes===true||(a9.options.noframes===null&&a9.options.override.orig_noframes===true))){continue
}if(a9.options.user_agent&&a9.options.user_agent!=""){bb[a7]=a9.options.user_agent
}a3[a9.name]=true;ba.push(a9)}a8={runners:ba,disabled:a6,script_map:a3,user_agent:bb};
if(TV){console.log("tv: getScriptRunInfo("+a7+") run:"+a8.runners.length+" disabled:"+a8.disabled+" au:"+JSON.stringify(a8.user_agent))
}O.items.rundata.setj(a2,{frameId:a7,oldret:a8})}return a8
},getUserAgent:function(a2,a1){return a0.get(a2,a1).user_agent
}};return a0})();var au=(function(){var a3={};var a9=1;
var a4=a9++;var bc=a9++;var bb=a9++;var a0=a9++;var ba=a9++;
var a5=a9++;var bd=a9++;var a8=a9++;var a1=a9++;var a6=a9++;
var a2=function(){var bf={frames:{0:{state:a4}},tabs:{reset_ts:(new Date()).getTime()},scripts:{},urls:{},maps:{},contexts:{onUnload:{}},stats:{running:0,disabled:0,},extra:{}};
var bg={length:{value:0,enumerable:false,writable:true,configurable:true}};
Object.defineProperties(bf.urls,bg);return bf};var a7=function(bf){delete a3[bf]
};var be={_info:function(){return a3},listeners:{_onReset:[],_onCommited:[],_onCompleted:[],add:{onReset:function(bf){be.listeners._onReset.push(bf);
return be.listeners._onReset.length-1},onCommited:function(bf){be.listeners._onCommited.push(bf);
return be.listeners._onCommited.length-1},onCompleted:function(bf){be.listeners._onCompleted.push(bf);
return be.listeners._onCompleted.length-1}},remove:{onReset:function(bf){be.listeners._onReset[bf]=null
},onCommited:function(bf){be.listeners._onCommited[bf]=null
},onCompleted:function(bf){be.listeners._onCompleted[bf]=null
}}},events:{reset:function(bf,bg){if(TV){console.log("tv: events.reset("+bf+", "+bg+")")
}a3[bf]=a2();a3[bf].frames[0].state=a4;aa.forEach(be.listeners._onReset,function(bi,bh){if(bi){bi(bf,bg)
}})},request:function(bg,bj,bi){if(TV){console.log("tv: events.request("+bg+", "+bj+", "+bi+")")
}if(!aA.values.enabled){return}a3[bg]=a3[bg]||a2();
a3[bg].frames[bj]=a3[bg].frames[bj]||{};a3[bg].frames[bj].state=bc;
var bf=G.woHash(bi);var bh=ab.getUserAgent(bj,bf);if(bh[bj]){be.set.extra(bg,bj,"user_agent",bh[bj])
}},response:function(bg,bi,bh){if(TV){console.log("tv: events.response("+bg+", "+bi+", "+bh+")")
}if(!aA.values.enabled){return}a3[bg]=a3[bg]||a2();
a3[bg].frames[bi]=a3[bg].frames[bi]||{};var bj=a3[bg].frames[bi].state||a4;
a3[bg].frames[bi].state=bb;if(bi===0){a3[bg].tabs.response_ts=(new Date()).getTime()
}if(bj<bb){var bf=G.woHash(bh);be.scripts.determine(bg,bi,bf)
}},commited:function(bh,bj,bi){if(!aA.values.enabled){return
}var bf=G.parse(bi);if(bf.protocol!=="http:"&&bf.protocol!=="https:"&&bf.protocol!=="file:"){return
}if(TV){console.log("tv: events.commited("+bh+", "+bj+", "+bi+")")
}a3[bh]=a3[bh]||a2();a3[bh].frames[bj]=a3[bh].frames[bj]||{};
var bk=a3[bh].frames[bj].state||a4;a3[bh].frames[bj].state=a0;
if(bk<bb){var bg=G.woHash(bi);be.scripts.determine(bh,bj,bg)
}aa.forEach(be.listeners._onCommited,function(bm,bl){if(bm){bm(bh)
}})},loading:function(bh,bj,bi){if(!aA.values.enabled){return
}var bf=G.parse(bi);if(bf.protocol!=="http:"&&bf.protocol!=="https:"&&bf.protocol!=="file:"){return
}if(bj===0&&bf.protocol==="file:"){if(TV){console.log("tv: events.loading("+bh+", "+bj+", "+bi+")")
}a3[bh]=a3[bh]||a2();a3[bh].frames[bj]=a3[bh].frames[bj]||{};
var bk=a3[bh].frames[bj].state||a4;a3[bh].frames[bj].state=ba;
if(bk<bb){var bg=G.woHash(bi);be.scripts.determine(bh,bj,bg)
}}},prepare:function(bj,bl,bf,bk){if(TV){console.log("tv: events.prepare("+bj+", "+bl+", "+bf+", "+bk+")")
}if(!aA.values.enabled){return}var bm=bl===0?bl:bf;
a3[bj]=a3[bj]||a2();a3[bj].frames[bm]=a3[bj].frames[bm]||{};
var bi=G.woHash(bk);a3[bj].frames[bm].state=a5;var bh,bg=a3[bj].scripts[bi];
if(!bg){if(TV){console.warn("tv: lazy init @ events.prepare("+bj+", "+bl+", "+bf+", "+bk+")")
}be.scripts.determine(bj,bl,bi);bg=a3[bj].scripts[bi]
}bh=bg.runners.length;be.scripts.updateMaps(bj,bf,bg.script_map);
be.scripts.updateUrls(bj,bf,bi);return bh},run:function(bh,bm,bl,bi,bj){if(TV){console.log("tv: events.run("+bh+", "+bm+", "+bl+", "+bi+")")
}if(!aA.values.enabled){return}var bg=bm===0?bm:bl;
a3[bh]=a3[bh]||a2();a3[bh].frames[bg]=a3[bh].frames[bg]||{};
a3[bh].frames[bg].state=bd;var bf=G.woHash(bi);var bo=a3[bh].scripts[bf];
if(!bo){var bn;if(D){bn=a3[bh].scripts}console.warn("tv: no script run info for tab "+bh+" @ "+bf,bn);
return}var bk=function(){delete a3[bh].scripts[bf];
if(bj){bj()}};be.scripts.updateStats(bh,bl,bo.runners.length,bo.disabled);
be.scripts.run(bh,bm,bl,bf,bo.runners,bk)},complete:function(bg,bi,bh){var bf=G.parse(bh);
if(!aA.values.enabled){return}if(bf.protocol!=="http:"&&bf.protocol!=="https:"&&bf.protocol!=="file:"){return
}if(TV){console.log("tv: events.complete("+bg+", "+bi+", "+bh+")")
}if(bi===0){a3[bg]=a3[bg]||a2();a3[bg].frames[bi]=a3[bg].frames[bi]||{};
var bk=a3[bg].frames[bi].state||a4;a3[bg].frames[bi].state=a8;
if(!au.get.empty(bg)&&au.get.stats(bg).running){if(bk<bd){console.warn("tv: no script run info!");
return}if(bf.protocol==="file:"){var bj=function(){chrome.tabs.sendMessage(bg,{method:"onLoad",frameId:bi},function(bl){})
};window.setTimeout(bj,500)}else{chrome.tabs.sendMessage(bg,{method:"onLoad",frameId:bi},function(bl){});
if(ah.runCheck){if(V||EV||UV){console.log("contentSettings: ("+(new Date()).getTime()+") javascript.clear({})")
}chrome.contentSettings.javascript.clear({})}}}}aa.forEach(be.listeners._onCompleted,function(bm,bl){if(bm){bm(bg)
}})},unload:function(bg,bi,bf){if(TV){console.log("tv: events.unload("+bg+", "+bi+", "+bf+")")
}var bj=bi===0?bi:bf;a3[bg]=a3[bg]||a2();a3[bg].frames[bj]=a3[bg].frames[bj]||{};
a3[bg].frames[bj].state=a1;if(a3[bg]){if(a3[bg].contexts.onUnload[bf]){for(var bh=0;
bh<a3[bg].contexts.onUnload[bf].length;bh++){a3[bg].contexts.onUnload[bf][bh]()
}a3[bg].contexts.onUnload[bf]=[]}}},remove:function(bf){if(TV){console.log("tv: events.remove("+bf+")")
}a7(bf)}},scripts:{updateStats:function(bg,bf,bh,bi){a3[bg].stats.running+=bh;
a3[bg].stats.disabled+=bi;a3[bg].contexts.onUnload[bf]=a3[bg].contexts.onUnload[bf]||[];
a3[bg].contexts.onUnload[bf].push(function(){a3[bg].stats.running-=bh;
a3[bg].stats.disabled-=bi});a3[bg].tabs.ts=(new Date()).getTime()
},updateMaps:function(bg,bf,bi){var bj=1;var bh=function(bl,bk){if(a3[bg].maps[bk]===undefined){if(bj===1){a3[bg].maps[bk]=0
}}a3[bg].maps[bk]+=bj};aa.forEach(bi,bh);a3[bg].contexts.onUnload[bf]=a3[bg].contexts.onUnload[bf]||[];
a3[bg].contexts.onUnload[bf].push(function(){if(!a3[bg]){return
}bj=-1;aa.forEach(bi,bh)})},updateUrls:function(bh,bf,bg){var bj=1;
var bi=function(){if(a3[bh].urls[bg]===undefined){if(bj===1){a3[bh].urls[bg]=0
}}a3[bh].urls[bg]+=bj;a3[bh].urls.length=-1};bi();a3[bh].contexts.onUnload[bf]=a3[bh].contexts.onUnload[bf]||[];
a3[bh].contexts.onUnload[bf].push(function(){if(!a3[bh]){return
}bj=-1;bi()})},determine:function(bh,bi,bg){var bf=ab.get(bi,bg);
a3[bh].scripts[bg]=bf;return bf.runners.length},run:function(bj,br,bp,bg,bu,bl){var bs=[];
var bq=1;var bh=function(){if(--bq===0&&bl){bl()}};
var bv=aw.RUNTIME.ALLOWS_FAST_DOCUMENT_START&&aA.values.runtime_fastDocumentStart;
for(var bm=0;bm<bu.length;bm++){var bt=bu[bm];if(!bt.options.user_agent){var bo=bv&&bt.options.run_at=="document-start";
var bk=new an(bo);bq++;var bf=bk.contentLoad({tabId:bj,frameId:br,contextId:bp,url:bg},bt,bh);
if(bf){bs.push(bf)}}}for(var bn=0,bi=null;bi=bs[bn];
bn++){chrome.tabs.sendMessage(bj,bi,function(){})}bh()
}},set:{extra:function(bf,bi,bg,bh){a3[bf]=a3[bf]||a2();
if(bi===null){a3[bf].extra[bg]=bh}else{a3[bf].extra[bg]=a3[bf].extra[bg]||{};
a3[bf].extra[bg][bi]=bh}},blocker:function(bg,bf){be.set.extra(bg,null,"blocker",true)
},forbidden:function(bg,bh,bf){if(bh===0){be.set.extra(bg,null,"forbidden",true)
}},fire:{count:function(bf,bg){be.set.extra(bf,null,"fire_count",bg)
}}},get:{extra:function(bf,bj,bg,bi){if(bi===undefined){bi=null
}var bh=null;bh=(a3[bf]?a3[bf].extra:{})[bg];if(bj!==null&&bh){bh=bh[bj]
}return bh||bi},empty:function(bg){var bf=true;if(a3[bg]){if(a3[bg].urls.length==0){}else{if(a3[bg].urls.length==-1){a3[bg].urls.length=0;
var bh=function(bj,bi){if(bi!=="length"&&bj>0){a3[bg].urls.length++
}};aa.forEach(a3[bg].urls,bh);return be.get.empty(bg)
}else{bf=false}}}return bf},fire:{count:function(bf){return be.get.extra(bf,null,"fire_count")
}},urls:function(bf){return a3[bf]?a3[bf].urls:{}},stats:function(bh,bi){var bg={};
if(a3[bh]){bg.running=a3[bh].stats.running;bg.disabled=a3[bh].stats.disabled;
if(bi){bg.unique=0;for(var bf in a3[bh].maps){if(!a3[bh].maps.hasOwnProperty(bf)){continue
}if(a3[bh].maps[bf]>0){bg.unique++}}}}return bg},tabs:function(){var bf={};
var bg=function(bh,bi){bf[bi]={ts:bh.response_ts}};
aa.forEach(a3,bg);return bf},blocker:function(bf){return be.get.extra(bf,null,"blocker")
},forbidden:function(bg,bh,bf){return be.get.extra(bg,null,"forbidden")
},user_agent:function(bf,bg){return be.get.extra(bf,bg,"user_agent")
}}};return be})();var ay={useNewTab:function(){return aA.values.script_link_open_method=="new_tab"||(aA.values.script_link_open_method=="default"&&(aw.RUNTIME.BROWSER_VERSION==31||aw.RUNTIME.BROWSER_VERSION==32))
},isScriptUrl:function(a1){if(!a1){return false}var a0=a1.split(/[\?#$]/)[0];
var a2=a0.search(/\.user\.(js\#|js\?|js$)/)!=-1||a0.search(/\.tamper\.(js\#|js\?|js$)/)!=-1;
if(!a2){return a2}var a3=(a0.search(/^htt[ps]{1,2}:\/\/code\.google\.com/)!=-1)||(a0.search(/^htt[ps]{1,2}:\/\/github\.com/)!=-1&&a0.search(/^htt[ps]{1,2}:\/\/github\.com\/[a-zA-Z0-9%-]\/[a-zA-Z0-9%-]\/raw\//)==-1);
return !a3}};var b={id:0,useXmlHttpReq:true,useIframeMessage:false,callbacks:{},listener:function(a0,a4){a4=a0?a0.data:a4;
try{var a1=JSON.parse(a4);var a3=b.callbacks[a1.id];
if(a3){if(V){console.log("localFile: retrieval of '"+a3.url+"' took "+((new Date()).getTime()-a3.ts)+"ms")
}if(a3.cb){a3.cb(a1.content)}if(a3.iframe){a3.iframe.parentNode.removeChild(a3.iframe)
}delete b.callbacks[a1.id]}else{console.warn("localFile: Warn: getSource callback "+a1.id+" not found!")
}}catch(a2){console.error("localFile: Error: getSource processing of "+a4+" failed!")
}},initialize:function(){if(b.useIframeMessage){window.addEventListener("message",b.listener,false);
window.addEventListener("unload",b.clean,false)}},clean:function(){if(b.useIframeMessage){window.removeEventListener("message",b.listener,false);
window.removeEventListener("unload",b.clean,false)}b.callbacks={}
},getSource:function(a0){if(typeof a0==="string"){a0={url:a0}
}if(b.useXmlHttpReq){return b.getSourceXmlHttp(a0)}else{return b.getSourceIframe(a0)
}},getSourceXmlHttp:function(a4){var a2=(new Date()).getTime();
a4.url+=(a4.url.search("\\?")!=-1)?"&":"?";a4.url+="ts="+a2;
var a3=function(a5){a4.cb(J.arrbuf2str(a5.response,a4.encoding)||"")
};var a0={method:"GET",retries:0,url:a4.url,responseType:"arraybuffer"};
if(a4.cb){ak(a0,{onload:a3})}else{var a1=ak(a0,{});
return a1.readyState==4&&(a1.status==200||a1.status==0)?J.arrbuf2str(a1.response,a4.encoding):null
}},getSourceIframe:function(a3){if(b.id==0){b.initialize()
}var a0=document.createElement("iframe");a0.src=a3.url+"?gimmeSource=1";
document.getElementsByTagName("body")[0].appendChild(a0);
var a2=JSON.stringify({id:b.id});b.callbacks[b.id]={cb:a3.cb,ts:(new Date()).getTime(),iframe:a0,url:a3.url};
var a1=function(){var a5=b.id;var a4=function(){if(a5==null){return
}if(b.callbacks[a5]){b.listener(null,JSON.stringify({id:a5,content:null}))
}a5=null};var a6=function(){if(a5==null){return}try{a0.contentWindow.postMessage(a2,a0.src);
a5=null}catch(a7){if(D){console.error("localFile: ERROR:"+a7.message)
}}};a0.onload=a6;window.setTimeout(a4,3000)};a1();b.id++
}};lfgs=b;var aY=function(){var a2={db_version:0,last:0,entries:0};
var a1={scripts:0,fire:a2};var a0=n.getValue("TM_update_check",a1);
if(!a0){a0=a1}if(a0.fire==undefined){a0.fire=a2}if(a0.scripts==undefined){a0.scripts=0
}return a0};var j=function(a0){if(a0){n.setValue("TM_update_check",a0)
}};var af={fireDB:null,status:{initialized:false,action:"Initializing"},resetStatus:function(a0){if(a0===undefined){a0=!!af.fireDB
}af.status={initialized:a0,update:false,download:false,action:"",error:"",progress:{n:0,of:0}}
},isReady:function(){return af.status.initialized&&!af.status.update&&!af.status.download
},checkUpdate:function(a4,a7,bb,a5){var a1=a4||a7;if(!a1&&(aA.values.fire_updatePeriod==0||!aA.values.fire_enabled)){return
}var a8=aY();var a6=function(){if(a5){a5(af.status.error=="")
}};if(af.status.update||af.status.download){if(bb){bb(true)
}var ba=function(){if(af.isReady()){a6()}else{window.setTimeout(ba,1000)
}};if(a5){ba()}return}if(a1||((new Date()).getTime()-a8.fire.last)>aA.values.fire_updatePeriod){var a9=0;
var a2=function(){var bc=function(bd){if(af.status.error==""){a8.fire.last=(new Date()).getTime();
a8.fire.db_version=a9;a8.fire.entries=bd;j(a8)}a6()
};af.update(a4,bc)};var a3=function(bc){if(bc.readyState==4){if(bc.status=200){try{var bf=JSON.parse(bc.responseText);
a9=bf.db_version}catch(be){console.log("bg: fire: unable to parse DB version response! "+bc.responseText)
}console.log("bg: fire: local DB version: "+a8.fire.db_version+" remote: "+a9);
var bd=a9>a8.fire.db_version||a7;if(bb){bb(bd)}if(bd){a2();
return}}a6()}};var a0={method:"GET",url:af.updateURL()+"&db_version=get",retries:aw.XMLHTTPREQUEST.RETRIES,overrideMimeType:"text/plain; charset=x-user-defined"};
ak(a0,{onload:a3})}else{a6()}},updateURL:function(){return aA.values.fire_getURL+"?ts=0"
},update:function(a8,a3){var bf=10;var bc=2;var a1=null;
var be=bc;var bd=null;var a2=1;var a7=null;var a6=0;
var a4={};var ba=function(){if(a1){window.clearTimeout(a1)
}a1=null};var a9=function(){ba();a1=window.setTimeout(bd,2*60*1000)
};var bg=function(bh){return{method:"GET",url:af.updateURL()+"&part="+bh,retries:aw.XMLHTTPREQUEST.RETRIES,overrideMimeType:"text/plain; charset=x-user-defined"}
};var bb=function(bh){ba();af.resetStatus();af.status.error=bh;
if(a3){a3()}console.log(aP.getMessage("TamperFire_update_failed___")+" Error: "+bh+" @ file:"+bg(a2).url);
aH.show("TamperFire",aP.getMessage("TamperFire_update_failed___"),chrome.extension.getURL("images/icon128.png"),30000)
};var a0=function(bi){a9();if(bi.progress&&bi.progress.totalSize!=-1){if(a7==null){a7=bi.progress.totalSize
}var bh=a7*6*bf;var bj=bi.progress.done+a7*6*(a2-1);
if(bj>bh){bj=bh}af.status.progress={n:bj,of:bh};if(D&&(++a6%50)==0){console.log("bg: fire download: "+bi.progress.done+" bytes "+bj+"/"+bh)
}}};var a5=function(bm){a9();if(bm.readyState==4){if(bm.status=200){ba();
var bp={};var bq=bm.responseText;try{bp=JSON.parse(bq)
}catch(bl){var bk="<body>";var bj="</body>";if(bq.search(bk)!=-1){var bo=bq.indexOf(bk);
var bn=bq.lastIndexOf(bj);if(bo!=-1&&bn!=-1){bq=bq.substr(bo+bk.length,bn-(bo+bk.length))
}}try{bp=JSON.parse(bq)}catch(bl){bb("Parse Error! Update URL: "+af.updateURL());
return}}bq=null;if(!bp.scripts){bb("Invalid Content! Update URL: "+af.updateURL());
return}for(var bi in bp.scripts){a4[bi]=bp.scripts[bi]
}bp=null;if(a2<bf){if(D){console.log("bg: fire: download of file "+a2+" succced")
}a2++;be=bc;bd()}else{af.resetStatus();af.status.update=true;
af.status.action=aP.getMessage("Update_in_progress");
var br=function(bt){var bu=bt!==false;if(!bu){af.resetStatus(false);
return}af.status.update=true;var bs=function(bv){af.resetStatus();
console.log(aP.getMessage("TamperFire_is_up_to_date"));
aH.show("TamperFire",aP.getMessage("TamperFire_is_up_to_date"),chrome.extension.getURL("images/icon128.png"),30000);
if(a3){a3(bv)}};af.insertValuesFromJSON({scripts:a4},bs);
a4=null};var bh=function(){af.initTables(br)};af.clean(bh)
}}else{bb("Update URL: "+bm.status);return}}else{console.log(bm)
}};bd=function(){if(be>0){af.status.action=aP.getMessage("Downloading");
af.status.download=true;a9();ak(bg(a2),{onload:a5,onreadychange:a0});
be--}else{bb("Download failed!")}};console.log(aP.getMessage("TamperFire_update_started"));
aH.show("TamperFire",aP.getMessage("TamperFire_update_started"),chrome.extension.getURL("images/icon128.png"),30000);
if(!a8){chrome.tabs.create({url:chrome.extension.getURL("fire.html")},function(){})
}bd()},init:function(a0){var a1=function(a2){var a3=a2!==false;
if(a0){a0(a3)}if(a3){window.setTimeout(af.checkUpdate,20000)
}};af.resetStatus(false);af.initTables(a1)},clean:function(a1){var a3=function(){if(a1){a1()
}};var a6=function(){af.fireDB.db.transaction(function(a7){a7.executeSql("DROP TABLE scripts",[],a3,a3)
})};var a0=function(){af.fireDB.db.transaction(function(a7){a7.executeSql("DROP TABLE excludes",[],a6,a6)
})};var a2=function(){af.fireDB.db.transaction(function(a7){a7.executeSql("DROP TABLE includes",[],a0,a0)
})};var a4=function(){af.fireDB.db.transaction(function(a7){a7.executeSql("DROP TABLE scriptexcludes",[],a2,a2)
})};var a5=function(){af.fireDB.db.transaction(function(a7){a7.executeSql("DROP TABLE scriptincludes",[],a4,a4)
})};a5()},initTables:function(a0){var a3=function(){af.status.initialized=true;
if(a0){a0()}};var a8=null;try{a8=openDatabase("tmFire","1.0","TamperFire",40*1024*1024)
}catch(a7){console.warn("Unable to open TamperFire database! ",a7.message);
if(a0){a0(false)}return}af.fireDB={db:a8,onSuccess:function(ba,a9){if(V){console.log("fireDB Success ")
}},onError:function(a9,bc,ba,bb){console.error("fireDB Error "+JSON.stringify(bc));
if(ba){console.warn(" @ statement "+ba)}if(bb){console.warn("        with "+JSON.stringify(bb))
}},createScriptTable:function(ba){var a9=function(bb,bc){af.fireDB.onError(bb,bc);
if(a0){a0(false)}};af.fireDB.db.transaction(function(bb){bb.executeSql("CREATE TABLE IF NOT EXISTS scripts(sid INTEGER PRIMARY KEY ASC, value TEXT)",[],ba,a9)
})},createScriptIncludesTable:function(ba){var a9=function(bb,bc){af.fireDB.onError(bb,bc);
if(a0){a0(false)}};af.fireDB.db.transaction(function(bb){bb.executeSql("CREATE TABLE IF NOT EXISTS scriptincludes(iid INTEGER, sid INTEGER, FOREIGN KEY(sid) REFERENCES scripts(sid),FOREIGN KEY(iid) REFERENCES includes(iid))",[],ba,a9)
})},createIncludesTable:function(ba){var a9=function(bb,bc){af.fireDB.onError(bb,bc);
if(a0){a0(false)}};af.fireDB.db.transaction(function(bb){bb.executeSql("CREATE TABLE IF NOT EXISTS includes(iid INTEGER PRIMARY KEY ASC, generic BOOLEAN, regex TEXT)",[],ba,a9)
})},createScriptExcludesTable:function(ba){var a9=function(bb,bc){af.fireDB.onError(bb,bc);
if(a0){a0(false)}};af.fireDB.db.transaction(function(bb){bb.executeSql("CREATE TABLE IF NOT EXISTS scriptexcludes(eid INTEGER, sid INTEGER, FOREIGN KEY(sid) REFERENCES scripts(sid),FOREIGN KEY(eid) REFERENCES excludes(eid))",[],ba,a9)
})},createExcludesTable:function(ba){var a9=function(bb,bc){af.fireDB.onError(bb,bc);
if(a0){a0(false)}};af.fireDB.db.transaction(function(bb){bb.executeSql("CREATE TABLE IF NOT EXISTS excludes(eid INTEGER PRIMARY KEY ASC, regex TEXT)",[],ba,a9)
})}};var a1=function(){af.fireDB.createScriptExcludesTable(a3)
};var a2=function(){af.fireDB.createScriptIncludesTable(a1)
};var a4=function(){af.fireDB.createExcludesTable(a2)
};var a5=function(){af.fireDB.createIncludesTable(a4)
};var a6=function(){af.fireDB.createScriptTable(a5)
};a6()},insertValuesFromJSON:function(bj,ba){var a5=[];
var bh=10000;var a4=[];var bb={};var a1={};var be=[];
var bn=[];var a7=[];var bd=[];var a2=0;var bk=0;console.log(aP.getMessage("TamperFire_import_started"));
for(var bc in bj.scripts){if(!bj.scripts.hasOwnProperty(bc)){continue
}a5.push(bc)}af.status.action=aP.getMessage("Processing_scripts");
af.status.progress={n:0,of:a5.length};var bg=0;var bf;
var bm=0;var a0=function(){for(var bo in bb){var bp=a2++;
be.push([bo,bb[bo].generic,bp]);for(var bq in bb[bo].sids){a7.push([bp,bb[bo].sids[bq]])
}}};var bl=function(){for(var bp in a1){var bo=bk++;
bn.push([bp,bo]);for(var bq in a1[bp].sids){bd.push([bo,a1[bp].sids[bq]])
}}};var bi=function(br,bt,bu,bo){if(bu.length){af.resetStatus();
af.status.update=true;af.status.action=aP.getMessage("Writing_scripts");
af.status.progress={n:br,of:be.length+bn.length+a7.length+bd.length}
}else{if(bo){bo()}return}var bs=function(){bi(br,bt,bu,bo)
};var bq=function(){if(bf>=bu.length-1){if(bo){bo()
}}else{window.setTimeout(bs,0)}};var bp=bu.length-1;
if((bp-bf)>bh){bp=bf+bh}if(D){console.log("bg: write TF "+bp)
}bt(bu.slice(bf,bp),bq);bf=bp;af.status.progress.n=br+bf
};var a9=function(bo){if(a4.length){af.scripts.setValues(a4,bo);
a4=[]}else{if(bo){bo()}}};var a8=function(){var bq=function(){if(ba){ba(a5.length)
}};var br=function(){bf=0;bi(bm,af.scriptExcludes.setValues,bd,bq);
bm+=bd.length};var bs=function(){bf=0;bi(bm,af.scriptIncludes.setValues,a7,br);
bm+=a7.length};var bo=function(){bf=0;bi(bm,af.excludes.setValues,bn,bs);
bm+=bn.length};var bp=function(){bf=0;bi(bm,af.includes.setValues,be,bo);
bm+=be.length};a0();bl();a9(bp)};var a3=function(){if(a4.length>bh){a9(a3);
return}bg++;if(bg%96==0){window.setTimeout(a6,0)}else{a6()
}};var a6=function(){if(D&&bg%2048==0){console.log("bg: import TF script "+a5[bg])
}af.status.progress.n=bg;if(bg<a5.length){var bs=bj.scripts[a5[bg]];
a4.push([a5[bg],JSON.stringify(bs)]);for(var bp=0;bp<bs.excludes.length;
bp++){var bo=G.getRegExpFromInclude(bs.excludes[bp],{safe:true,tryToFixUrl:aA.values.tryToFixUrl,safeUrls:aA.values.safeUrls});
if(!a1[bo]){a1[bo]={sids:[]}}a1[bo].sids.push(a5[bg])
}for(var bp=0;bp<bs.includes.length;bp++){var br=bs.includes[bp].trim();
var bo=G.getRegExpFromInclude(br,{safe:true,tryToFixUrl:aA.values.tryToFixUrl,safeUrls:aA.values.safeUrls});
if(!bb[bo]){var bq=0;if(br.search("^[https*]]{1,}[://]{0,}[w.]{0,4}[*|.]{1,}[$|/]")!=-1||br.search("^[.*/]{1,}$")!=-1||br.search("^[https*]{1,}[://]{0,}[w.]{0,4}[.|*|/]{1,}$")!=-1||br.search("^"+aa.escapeForRegExp("*://*[$|/]"))!=-1||br.replace(new RegExp("(https|http|\\*).://\\*"),"")==""||br=="*"){bq=1
}bb[bo]={sids:[],generic:bq.toString()}}bb[bo].sids.push(a5[bg])
}a3()}else{a8()}};a6()},count:function(a3,a4,a2,a0){var a1=function(a5){a0(a5.length)
};af.getValues(a3,a4,[a2],a1)},setValue:function(a3,a5,a2,a1,a4,a0){af.setValues(a3,[a5,a1],[a1,a4],a0)
},setValues:function(a8,a9,a2,a4){if(V){console.log("TM_fire.setValues")
}var a6=0;var a5=function(){if(a4){a4()}};var a1=[];
var a7=[];for(var a0=0;a0<a9.length;a0++){a1.push(a9[a0]);
a7.push("?")}var a3=function(ba){if(a6<a2.length){var bb="INSERT INTO "+a8+"("+a1.join(", ")+") VALUES ("+a7.join(", ")+");";
ba.executeSql(bb,a2[a6],a3,function(bc,bd){af.fireDB.onError(bc,bd,bb,a2[a6]);
a3(bc)});a6++}else{a5()}};af.fireDB.db.transaction(a3)
},getValues:function(a9,a4,a7,a1){if(V){console.log("TM_fire.getValues")
}var a2=0;var a3=null;var a5=[];var a6=20;var a8=function(ba,bc){if(bc.rows){for(var bb=0;
bb<bc.rows.length;bb++){a5.push(bc.rows.item(bb))}}if(a2<a7.length){a0()
}else{a1(a5)}};var a0=function(bb){if(!a3){a3=bb}var ba=[];
var bb=[];for(var bc=a2;bc<a7.length&&bc-a2<a6;bc++){bb.push(a4+"=?");
ba.push(a7[bc])}a3.executeSql("SELECT * FROM "+a9+" WHERE "+bb.join(" OR "),ba,a8,af.fireDB.onError);
a2+=a6};af.fireDB.db.transaction(a0)},getMax:function(a2,a1,a0){var a5='MAX("'+a1+'")';
var a4=function(a6,a8){var a7=0;if(a8.rows&&a8.rows.length){a7=a8.rows.item(0)[a5]
}a0(a7)};var a3=function(a6){a6.executeSql("SELECT "+a5+' FROM "'+a2+'"',[],a4,af.fireDB.onError)
};af.fireDB.db.transaction(a3)},tab:{getItems:function(a1,a3){var a2=0;
var a0={};var a7=[];var a6=1;var a4=function(){for(var a9 in a0){if(!a0.hasOwnProperty(a9)){continue
}a7.push(a0[a9])}if(a6==0&&a3){window.setTimeout(function(){a3(a7)
},1)}};var a8=function(ba){for(var a9=0;a9<ba.length;
a9++){a0[ba[a9][ao]]=ba[a9]}if(--a6==0){a4()}};if(!au.get.empty(a1)){var a5=function(ba,a9){a6++;
af.url.getItems(a9,a8)};aa.forEach(au.get.urls(a1),a5)
}a6--;a4()},getCountCallbacks:{},resetFireCnt:function(a0){af.tab.getCountCallbacks[a0]=[];
au.set.fire.count(a0,null)},getCount:function(a4,a0){var a3=au.get.fire.count(a4);
if(a3){a0(a3)}else{var a2=function(a6){if(!af.tab.getCountCallbacks[a4]){return
}while(af.tab.getCountCallbacks[a4].length>0){var a5=af.tab.getCountCallbacks[a4].pop();
if(a5){a5(a6)}}};var a1=function(a5){au.set.fire.count(a4,a5.length);
a2(a5.length)};if(!af.tab.getCountCallbacks[a4]){af.tab.getCountCallbacks[a4]=[]
}if(af.tab.getCountCallbacks[a4].length==0){af.tab.getItems(a4,a1)
}af.tab.getCountCallbacks[a4].push(a0)}}},url:{getCount:function(a1,a0){if(D){console.log("bg: TF: get count for URL "+a1)
}var a4="count(*)";var a3=function(a5,a7){var a6=0;
if(a7.rows&&a7.rows.length){a6=a7.rows.item(0)[a4]}a0(a6)
};var a2="";a2+="SELECT "+a4+" FROM scripts WHERE sid IN ";
a2+="    (SELECT sid FROM scriptincludes WHERE iid IN (SELECT iid FROM includes WHERE generic=0 AND ? REGEXP regex)) ";
a2+="AND NOT sid IN ";a2+="    (SELECT sid FROM scriptexcludes WHERE eid IN (SELECT eid FROM excludes WHERE ? REGEXP regex)) ";
af.fireDB.db.transaction(function(a5){a5.executeSql(a2,[a1,a1],a3,af.fireDB.onError)
})},getItems:function(a1,a4){if(D){console.log("bg: TF: get scripts for URL "+a1)
}var a8=[];var a3="";var ba=1,a7=0,a6=0;if(ba==0){a3+="SELECT DISTINCT t1.* FROM scripts T1 JOIN scriptincludes T2 ON T1.sid=T2.sid WHERE T2.iid IN ";
a3+="    (SELECT iid FROM includes WHERE generic=0 AND ? REGEXP regex) ";
a3+="AND NOT T1.sid IN ";a3+="    (SELECT T4.sid FROM excludes T3 JOIN scriptexcludes T4 ON T3.eid=T4.eid WHERE T3.eid IN (SELECT eid FROM excludes WHERE ? REGEXP regex))"
}else{if(ba==1){a3+="SELECT * FROM scripts T1 WHERE T1.sid IN ";
a3+="    (SELECT sid FROM scriptincludes WHERE iid IN (SELECT iid FROM includes WHERE generic=0 AND ? REGEXP regex)) ";
a3+="AND NOT T1.sid IN ";a3+="    (SELECT sid FROM scriptexcludes WHERE eid IN (SELECT eid FROM excludes WHERE ? REGEXP regex)) "
}else{if(ba==2){a3+="SELECT DISTINCT t1.* FROM scripts T1 JOIN scriptincludes T2 ON T1.sid=T2.sid WHERE EXISTS";
a3+="    (SELECT iid FROM includes I1 WHERE T2.iid=I1.iid AND generic=0 AND ? REGEXP regex) ";
a3+="AND NOT T1.sid IN ";a3+="    (SELECT T4.sid FROM excludes T3 JOIN scriptexcludes T4 ON T3.eid=T4.eid WHERE T3.eid IN (SELECT eid FROM excludes WHERE ? REGEXP regex))"
}else{if(ba==3){a3+="SELECT DISTINCT t1.* FROM scripts T1 JOIN scriptincludes T2 ON T1.sid=T2.sid JOIN includes I1 ON I1.iid=T2.iid WHERE I1.generic=0 AND ? REGEXP I1.regex ";
a3+="AND NOT T1.sid IN ";a3+="    (SELECT T4.sid FROM excludes T3 JOIN scriptexcludes T4 ON T3.eid=T4.eid WHERE T3.eid IN (SELECT eid FROM excludes WHERE ? REGEXP regex))"
}}}}var a0="SELECT DISTINCT t1.value, t1.sid FROM scripts T1 JOIN scriptincludes T2 ON T1.sid=T2.sid WHERE T2.iid IN (SELECT iid FROM includes WHERE generic=0)";
var a9=(a1=="*");var a2=(a9?a0:a3);var a5=function(bb,be){a6=(new Date()).getTime();
if(D){console.log("bg: TF db access: "+ba+" -> "+(a6-a7)+"ms")
}if(be.rows&&be.rows.length){for(var bc=0;bc<be.rows.length;
bc++){try{var bf=be.rows.item(bc).value;a8.push(JSON.parse(bf))
}catch(bd){console.error("bg: error parsing TamperFire entry "+item[bc])
}}a4(a8)}else{console.warn("bg: warn: no scripts entry");
a4(a8)}};af.fireDB.db.transaction(function(bb){a7=(new Date()).getTime();
bb.executeSql(a2,a9?[]:[a1,a1],a5,af.fireDB.onError)
})}},ids:{getItems:function(a3,a0){var a2=[];var a1=function(a5){if(a5&&a5.length){for(var a4=0;
a4<a5.length;a4++){try{a2.push(JSON.parse(a5[a4]))}catch(a6){console.error("bg: error parsing TamperFire entry "+a5)
}}a0(a2)}else{console.warn("bg: warn: no scripts entry");
a0(a2)}};if(a3.length){af.scripts.getValues(a3,null,a1)
}else{a0(a2)}}},includes:{setValues:function(a1,a0){af.setValues("includes",["regex","generic","iid"],a1,a0)
}},scriptIncludes:{setValues:function(a1,a0){af.setValues("scriptincludes",["iid","sid"],a1,a0)
}},excludes:{setValues:function(a1,a0){af.setValues("excludes",["regex","eid"],a1,a0)
}},scriptExcludes:{setValues:function(a1,a0){af.setValues("scriptexcludes",["eid","sid"],a1,a0)
}},scripts:{getValues:function(a3,a2,a0){var a1=function(a4){var a5=[];
for(var a6=0;a6<a4.length;a6++){a5.push(a4[a6]["value"])
}a0(a5)};af.getValues("scripts","sid",a3,a1)},setValue:function(a1,a2,a0){af.setValue("scripts","sid",a1,"value",a2,a0)
},setValues:function(a1,a0){af.setValues("scripts",["sid","value"],a1,a0)
}}};fire=af;var N=function(){var a0=[];var a2=[];for(var a3=0;
a3<a0.length;a3++){var a1="system/"+a0[a3]+".tamper.js";
var a4=Registry.getRaw(a1);if(a4){a2.push(a4)}}return a2
};var ai={initialized:false,listenerRegistered:false,enabled:false,syncing:0,period:null,syncDoneListener:[],scheduled:{to:null,force:null,t:0},SYNCED:{comment:true},createTeslaData:function(a1){var a3=[];
var a4=ai.getLocalScriptList();for(var a2=0;a2<a4.length;
a2++){if(a4[a2].url){var a0=JSON.stringify(a4[a2].options);
var a5=a4[a2].name.replace(/\|/g,"!")+"|"+a0+"|"+a4[a2].url.replace(/\|/g,"%7C");
a3.push(a5)}}if(a1){a1(a3)}},enable:function(a0){if(ai.enabled){if(D&&ai.initialized&&ai.listenerRegistered){console.log("sync: reenable?")
}}else{if(aA.values.sync_type=="0"){ai.enabled=false
}else{ai.enabled=a.init(aA.values.sync_type,aA.values.sync_id)
}}if(!ai.listenerRegistered){a.addChangeListener(ai.remoteChangeCb);
ai.listenerRegistered=true}if(!ai.initialized){ai.initialized=true
}if(a0){a0(ai.enabled)}},finalize:function(){},reset:function(a0){a.reset(a0)
},addSyncDoneListener:function(a0){ai.syncDoneListener.push(a0);
if(V){console.log("sync: addSyncDoneListener() -> "+ai.syncDoneListener.length)
}},runAllSyncDoneListeners:function(a1){if(V){console.log("sync: runAllSyncDoneListeners() -> "+ai.syncDoneListener.length)
}while(ai.syncDoneListener.length){var a0=ai.syncDoneListener.splice(0,1);
a0[0](a1)}},scheduleSync:function(a1,a2){var a5=(new Date()).getTime();
a2=ai.scheduled.force||a2;if(ai.scheduled.to){window.clearTimeout(ai.scheduled.to);
if(ai.scheduled.ts<(a5+a1)){a1=ai.scheduled.ts-a5;if(a1<1){a1=1
}if(V){console.log("sync: re-schedule sync for run in "+a1+" ms")
}}}else{if(D){console.debug("sync: schedule sync for run in "+a1+" ms")
}}var a3=function(){ai.sync(ai.scheduled.force);ai.scheduled.to=null;
ai.scheduled.force=null};var a4=function(){ai.scheduled.to=null;
ai.scheduled.force=null;ai.runAllSyncDoneListeners(false)
};var a0=function(){if(aA.values.sync_type==a.types.eCHROMESYNC){if(!ai.listenerRegistered){ai.enable(a3)
}else{a3()}}else{a3()}};ai.scheduled.to=window.setTimeout(a0,a1);
ai.scheduled.force=a2;ai.scheduled.ts=a5+a1},schedulePeriodicalCheck:function(){if(ai.period){return
}var a0=18000000;if(D){console.debug("sync: schedule sync for periodical run every "+a0+" ms")
}ai.period=window.setInterval(ai.sync,a0)},disablePeriodicalCheck:function(){if(ai.period){if(D){console.debug("sync: disable periodical sync")
}window.clearInterval(ai.period);ai.period=null}},getLocalObjFromScript:function(a2){var a6=(a2.id||A.getScriptId(a2.name));
var a0=a2.downloadURL?a2.downloadURL.split("#")[0]:null;
var a5=a2.fileURL?a2.fileURL.split("#")[0]:null;var a4=a5||a0;
var a3={id:a6,name:a2.name,options:{},durl:a0,furl:a5,url:a4};
for(var a1 in ai.SYNCED){if(ai.SYNCED[a1]===true&&a2.options[a1]!==null){a3.options[a1]=a2.options[a1]
}}return a3},getLocalScriptList:function(){var a1=[];
var a3=R();for(var a0 in a3){var a4=a3[a0];var a2=E(a4);
if(!a2.script||!a2.cond){continue}a1.push(ai.getLocalObjFromScript(a2.script))
}return a1},getRemoteScriptList:function(a0){a.list(a0)
},checkSyncAccount:function(a2,a0,a1){var a4=null;var a3=function(a5){if(a4==null){var a6=function(){ai.enable(function(){aN();
ai.scheduleSync(3000,a5)});a4=null};a4=window.setTimeout(a6,200)
}};if(a2=="sync_enabled"){if(a1){if(aA.values.sync_type==a.types.ePASTEBIN){ai.schedulePeriodicalCheck()
}a3()}else{ai.enabled=false;ai.disablePeriodicalCheck()
}}else{if(a2=="sync_type"){if(a1==a.types.ePASTEBIN){ai.schedulePeriodicalCheck()
}else{if(a1==a.types.eCHROMESYNC){ai.disablePeriodicalCheck()
}}a3()}else{if(a2=="sync_id"){if(aA.values.sync_type==a.types.ePASTEBIN){a3()
}}}}},sync:function(a0){if(ai.syncing>0){if(a0){var a5=function(bh){if(bh){ai.scheduleSync(50,a0)
}};ai.addSyncDoneListener(a5)}return}if(!ai.enabled){return
}ai.syncing++;if(V){console.log("sync: start syncing = "+ai.syncing)
}var bd=null;var a1=null;var a4=[];var bc=false;var bf=true;
var be={};var a7=function(){if(a4.length>0){var bh=a4.splice(0,1);
window.setTimeout(bh[0],1)}};var a9=function(){bf=false;
a6()};var a3=function(){ai.getRemoteScriptList(bb);
bd=ai.getLocalScriptList()};var bb=function(bh){a1=bh;
if(a1){a7()}else{if(D){console.error("sync: unable to get remotelist!")
}a9()}};a4.push(a3);var a2=function(bi){if(bi){bi=bi.split("#")[0];
if(bi){bi=bi.toLowerCase()}for(var bh=0;bh<bd.length;
bh++){var bj=bd[bh].furl?bd[bh].furl.toLowerCase():null;
var bk=bd[bh].durl?bd[bh].durl.toLowerCase():null;if(bj==bi||bk==bi){return bd[bh]
}}}return null};var ba=function(bi){if(bi){bi=bi.split("#")[0];
for(var bh=0;bh<a1.length;bh++){if(a1[bh].url==bi){return a1[bh]
}}}return null};var a8=function(){var bo=1;var bi=function(){if(--bo==0){a7()
}};for(var bp=0;bp<a1.length;bp++){var bj=a1[bp];var bn=false;
var bm=false;var bk=a2(bj.url);if(bk){bn=true;be[bj.url]=true;
for(var bl in ai.SYNCED){if(ai.SYNCED[bl]===true&&bk.options[bl]!=bj.options[bl]){bm=true;
break}}}if(bn){if(bj.options.removed){bc=true;if(D){console.debug("sync: remove local script "+(bj.name||bj.url))
}q(bk.name,null,false)}else{if(bm){bc=true;if(D){console.debug("sync: update local script "+(bj.name||bj.url))
}var bh=E(bk.name);if(bh.script&&bh.cond){for(var bl in ai.SYNCED){if(ai.SYNCED[bl]===true){bh.script.options[bl]=bj.options[bl]
}}q(bh.script.name,bh.script,false)}else{console.log(aP.getMessage("fatal_error")+"("+bk.name+")!!!")
}}}}if(!bn&&!bj.options.removed){bo++;bc=true;ai.importScript(bj,bi)
}}bi()};a4.push(a8);var bg=function(){var bj=1;var bi=function(){if(--bj==0){a7()
}};for(var bk=0;bk<bd.length;bk++){var bh=false;var bn=bd[bk];
var bl=bn.url;if(!bl||be[bl]){continue}var bm=ba(bl);
if(bm){bh=true}if(!bh){bj++;bc=true;ai.exportScript(bn,bi)
}}bi()};if(aA.values.sync_type!=a.types.ePASTEBIN){a4.push(bg)
}var a6=function(){if(D){console.debug("sync: finished")
}if(--ai.syncing==0){ai.runAllSyncDoneListeners(bf)
}if(bc){aN()}};a4.push(a6);a7()},importScript:function(a5,a0){if(D){console.debug("sync: import "+(a5.name||a5.url))
}var a4={imported:aA.values.sync_type};var a2={};for(var a1 in ai.SYNCED){if(ai.SYNCED[a1]===true){a2[a1]=a5.options[a1]
}}var a3={ask:false,sync:a4,save:true,force_options:a2};
d(a5.url,a3,a0)},exportScript:function(a1,a0){if(D){console.debug("sync: export "+(a1.name||a1.url))
}a.add(a1,a0)},removeScript:function(a1,a0){if(D){console.debug("sync: remove "+(a1.name||a1.url))
}a.remove(a1,a0)},remoteChangeCb:function(a1,a0){if(!ai.enabled||aA.values.sync_type!=a.types.eCHROMESYNC){return
}if(V){console.log("sync: remoteChangeCb()")}ai.scheduleSync(500,true)
},scriptAddedCb:function(a1,a0){if(!ai.enabled){return
}if(V){console.log("sync: scriptAddedCb()")}var a2=ai.getLocalObjFromScript(a0);
if(!a2.url){return}ai.exportScript(a2)},scriptChangedCb:function(a2,a1,a4){if(!ai.enabled){return
}if(V){console.log("sync: scriptChangedCb()")}var a3=ai.getLocalObjFromScript(a1);
if(!a3.url){return}for(var a0 in ai.SYNCED){if(ai.SYNCED[a0]===true&&a1.options[a0]!=a4.options[a0]){ai.exportScript(a3);
break}}},scriptRemovedCb:function(a1,a0){if(!ai.enabled){return
}if(V){console.log("sync: scriptRemovedCb()")}var a2=ai.getLocalObjFromScript(a0);
if(!a2.url){return}ai.removeScript(a2)}};sycl=ai;var z=function(a0){aA.addChangeListener("scriptblocker_overwrite",ah.init);
aA.addChangeListener("sync_enabled",ai.checkSyncAccount);
aA.addChangeListener("sync_type",ai.checkSyncAccount);
aA.addChangeListener("sync_id",ai.checkSyncAccount);
aA.addChangeListener("fire_enabled",function(a3,a2,a1){if(a1&&!af.status.initialized){af.init()
}});aA.addChangeListener("logLevel",function(){K(aA.values.logLevel)
});aA.addChangeListener("i18n",function(){aP.setLocale(aA.values.i18n)
});aA.addChangeListener("native_import_path",function(){aS.setPath(aA.values.native_import_path)
})};var x=function(a2){var a4=this;var a3="";a3+="// ==UserScript==\n";
a3+="// @name       My Fancy New Userscript\n";a3+="// @namespace  http://use.i.E.your.homepage/\n";
a3+="// @version    0.1\n";a3+="// @description  enter something useful\n";
a3+="// @match      <$URL$>\n";a3+="// @copyright  2012+, You\n";
a3+="// ==/UserScript==\n\n";this.changeListeners={};
var a1={};var a6={enabled:true,configMode:0,safeUrls:true,tryToFixUrl:true,debug:false,logLevel:0,showFixedSrc:false,firstRun:true,webrequest_modHeaders:"yes",webrequest_fixCSP:"yes",scriptblocker_overwrite:"no",notification_showUpdate:"changelog",notification_silentScriptUpdate:true,scriptTemplate:a3,scriptUpdateCheckPeriod:12*60*60*1000,scriptUpdateHideNotificationAfter:15*1000,scriptUpdateCheckDisabled:false,script_link_open_method:"default",runtime_fastDocumentStart:true,runtime_unsafeWindow:"auto",autoReload:false,appearance_badges:"running",fire_enabled:false,fire_sort_cache_enabled:true,fire_getURL:"http://fire.tampermonkey.net/get.php",fire_updatePeriod:14*24*60*60*1000,fire_topOnly:true,editor_enabled:true,editor_keyMap:"windows",editor_indentUnit:4,editor_indentWithTabs:false,editor_tabMode:"smart",editor_enterMode:"indent",editor_electricChars:true,editor_autoSave:false,editor_easySave:false,native_import:true,native_import_path:null,native_import_post_action:"disable",i18n:null,sync_enabled:false,sync_type:0,sync_id:"",statistics_enabled:true,require_timeout:10000,require_blacklist:["/^https?:\\/\\/example.com\\/.*/"],forbiddenPages:["*.paypal.tld/*","https://*deutsche-bank-24.tld/*","https://*bankamerica.tld/*","*://plusone.google.com/*/fastbutton*","*://www.facebook.com/plugins/*","*://platform.twitter.com/widgets/*"]};
this.addChangeListener=function(a9,a8){if(!a4.changeListeners[a9]){a4.changeListeners[a9]=[]
}a4.changeListeners[a9].push(a8)};this.load=function(a8){var bd=N();
for(var a9 in bd){var bb=bd[a9];window.setTimeout(function(){Y({tabid:null,url:null,src:bb,ask:false,defaultscript:true})
},1)}a4.defaults=a6;a4.values={};for(var bc in a6){if(!a6.hasOwnProperty(bc)){continue
}(function ba(){var bg=bc;var bf=function(){return a1[bg]
};var bh=function(bi){a7(bg,bi)};a4.values.__defineGetter__(bg,bf);
a4.values.__defineSetter__(bg,bh)})();a1[bc]=a6[bc]
}var be=n.getValue("TM_config",a4.defaults);for(var bc in be){if(!be.hasOwnProperty(bc)){continue
}a4.values[bc]=be[bc]}a8()};var a7=function(a8,bb){if(a4.changeListeners[a8]&&(a1[a8])!=bb){for(var a9=0;
a9<a4.changeListeners[a8].length;a9++){(function ba(){var bg=a8;
var bf=a4.values[bg];var be=bb;if(bf!=be){var bd=a4.changeListeners[bg][a9];
var bc=function(){bd(bg,bf,be)};window.setTimeout(bc,1)
}})()}}a1[a8]=bb};this.save=function(a8){if(a8===undefined){a8=true
}var a9=a1;a9.firstRun=false;n.setValue("TM_config",a9)
};var a0=function(){if(a4.values.firstRun){a4.save(false)
}a4.images={};a4.images.icon="images/icon.png";a4.initialized=true;
if(aL){var a9="version="+aL.newV+"&ext="+aw.SELF.ID.substr(0,4)+"&updated=true";
var a8;if(aL.first_run){a8="http://tampermonkey.net/installed.php?"+a9
}else{a9+="&old="+aL.oldV;a8="http://tampermonkey.net/changelog.php?"+a9
}if(a4.values.notification_showUpdate=="off"){}else{if(a4.values.notification_showUpdate=="notification"){aH.showUpdate(aP.getMessage("Updated_to__0version0",aL.newV),aP.getMessage("Click_here_to_see_the_recent_changes"),chrome.extension.getURL("images/icon128.png"),function(bb){if(bb.clicked){var bc={url:a8};
chrome.tabs.create(bc,function(){})}})}else{if(a4.values.notification_showUpdate=="changelog"){var ba={url:a8,active:aL.active};
chrome.tabs.create(ba,function(){})}}}}if(a2){a2()}};
var a5=function(a8){var a9=function(){a4.load(a8)};
aD(a9)};a5(a0);return this};var ak=function(a0,a1){return s(a0,a1,{internal:true})
};var an=function(a1){var a0=this;this.getResources=function(bf,ba){var a5=function(bn,bm){bm.loaded=true;
bm.resURL="";bm.resText="";if(bn.readyState==4&&(bn.status==200||bn.status==0)){var bh=null;
var bp=bn.responseHeaders?bn.responseHeaders.split("\n"):null;
for(var bi in bp){var bj=bp[bi].split(":");var bk=bj.shift()||"";
var bo=bj.join(":")||"";if(V){console.log("ri: Header: "+bp[bi])
}if(bk.trim().toLowerCase()=="content-type"&&bo.search("image")!=-1){bh=bo.trim();
break}}try{bm.resText=J.UTF8.decode(bn.response)}catch(bl){bm.resText=""
}if(!bh){if(bm.url.search(".ico$")!=-1||bm.url.search(".jpg$")!=-1){bh="image/x-icon"
}else{if(bm.url.search(".gif$")!=-1){bh="image/gif"
}else{if(bm.url.search(".png$")!=-1){bh="image/png"
}else{if(aa.isLocalImage(bm.url)){bh="image/x-icon"
}}}}}if(bn.status!=0){O.items.resources.set(bm.url,{content:bn.response,headers:bn.responseHeaders})
}try{if(!bh){bm.resURL=J.Base64.encode(bn.response)
}else{bm.resURL="data:"+bh+";base64,"+J.Base64.encode(bn.response)
}}catch(bl){bm.resURL=bm.url}if(V){console.log("ri: resURL: "+bm.resURL)
}}else{if(D||V){console.debug("ri: Failed to load: '"+bm.url+"' "+bn.status+" "+bn.statusText)
}}};var a3,bd;for(var bc in bf.resources){a3=bf.resources[bc];
bd=false;if(!a3.loaded){var a7=G.parse(a3.url);if(a7.protocol=="tampermonkey:"){if(a7.pathname.search("\\.\\.")==-1){a3.url=chrome.extension.getURL(a3.url.replace(/^tampermonkey:\/\//,""))
}else{bd=true}}else{if(a7.protocol=="chrome-extension:"){if(bf.fileURL){var a8=G.parse(bf.fileURL);
var a9=a8.pathname.split("/");a9.pop();var a4=a9.join("/")+a7.pathname;
a3.url=a8.protocol+"//"+a8.hostname+(a8.port?":"+a8.port:"")+a4+a7.search
}else{bd=true}}}var bb=null;if(bd){bb={readyState:4,status:404,response:"",responseHeaders:""}
}else{var bg=O.items.resources.get(a3.url);if(bg){bb={readyState:4,status:200,response:bg.content,responseHeaders:bg.headers}
}}if(bb){a5(bb,a3);if(!a1){a0.getResources(bf,ba)}}else{if(V){console.log("resources "+a3.url)
}var a6=function(bh){a5(bh,a3);if(!a1){a0.getResources(bf,ba)
}};if(a1){if(D){console.warn("ri: uncached @require detected -> fast script start disabled")
}a1=false}if(a7.protocol=="file:"){var be=function(bh){a6({readyState:4,status:bh?0:404,response:bh})
};if(a1){be(b.getSource(a3.url))}else{b.getSource({url:a3.url,cb:be})
}}else{var be=function(bh){bh.response=J.arrbuf2str(bh.response)||"";
a6(bh)};var a2={method:"GET",url:a3.url,retries:aw.XMLHTTPREQUEST.RETRIES,responseType:"arraybuffer"};
if(V){console.log("resources request "+a3.url)}if(a1){be(ak(a2,{}))
}else{a2.timeout=aA.values.require_timeout;ak(a2,{onload:be,onerror:be,ontimeout:function(){be({readyState:4,status:504,response:null})
}})}}}if(!a1){return}}}if(a1){return true}else{ba(true)
}};this.isBlacklisted=function(a3){var a4=false;var a2=function(a6){var a5=false;
if(!a6.length){return}if(a6.substr(0,1)=="/"){a5=aV(a3,a6)
}else{a5=(a3.search(a6)!=-1)}if(D&&a5){console.log('bg: require blacklist entry "'+a6+'" matched')
}a4|=a5};aa.forEach(aA.values.require_blacklist,a2);
return a4};this.getRequires=function(be,a9){var bf=function(bi,bh){bh.loaded=true;
bh.textContent="";if(bi.readyState==4&&(bi.status==200||bi.status==0)){bh.textContent=bi.responseText;
if(bi.status!=0){O.items.requires.set(bh.url,{content:bi.responseText,headers:bi.responseHeaders})
}}};var a3,bc;for(var bb in be.requires){var a3=be.requires[bb];
bc=false;if(!a3.loaded&&a3.url){var a6=G.parse(a3.url);
if(a6.protocol=="tampermonkey:"){if(a6.pathname.search("\\.\\.")==-1){a3.url=chrome.extension.getURL(a3.url.replace(/^tampermonkey:\/\//,""))
}else{bc=true}}else{if(a6.protocol=="chrome-extension:"){if(be.fileURL){var a7=G.parse(be.fileURL);
var a8=a7.pathname.split("/");a8.pop();var a4=a8.join("/")+a6.pathname;
a3.url=a7.protocol+"//"+a7.hostname+(a7.port?":"+a7.port:"")+a4+a6.search
}else{bc=true}}}var ba=null;if(bc){ba={readyState:4,status:404,responseText:""}
}else{var bg=null;if(a0.isBlacklisted(a3.url)){bg={content:'// this @require ("'+encodeURIComponent(a3.url)+'") is blacklisted!\n'}
}else{bg=O.items.requires.get(a3.url)}if(bg){ba={readyState:4,status:200,responseText:bg.content}
}}if(ba){bf(ba,a3);if(!a1){a0.getRequires(be,a9)}}else{if(V){console.log("requires "+a3.url)
}var a5=function(bh){bf(bh,a3);if(!a1){a0.getRequires(be,a9)
}};if(a6.protocol=="file:"){var bd=function(bh){a5({readyState:4,status:bh?0:404,responseText:bh})
};if(a1){bd(b.getSource({url:a3.url,encoding:"UTF-8"}))
}else{b.getSource({url:a3.url,encoding:"UTF-8",cb:bd})
}}else{var bd=function(bh){a5(bh)};var a2={method:"GET",retries:aw.XMLHTTPREQUEST.RETRIES,url:a3.url};
if(V){console.log("requires request "+a3.url)}if(a1){bd(ak(a2,{}))
}else{a2.timeout=aA.values.require_timeout;ak(a2,{onload:bd,onerror:bd,ontimeout:function(){bd({readyState:4,status:504,response:null})
}})}}}if(!a1){return}}}if(a1){return true}else{a9(true)
}};this.contentLoad=function(a8,a4,a3){var a5=function(){a4.requires.forEach(function(a9){delete a9.textContent;
delete a9.loaded});a4.resources.forEach(function(a9){delete a9.resURL;
delete a9.resText;delete a9.loaded});if(a3){a3()}};
var a7=function(a9){if(!a9){return}console.log("run script "+a4.name+" @ "+a8.url);
return a0.injectScript(a4,a5)};var a2=function(a9){if(!a9){return
}a0.info=a8;if(typeof at[a8.tabId]=="undefined"){at[a8.tabId]={storage:{}}
}return a7(a0.getRequires(a4,a7))};var a6=a2(a0.getResources(a4,a2));
return a1?a6:undefined};this.getUrlContents=function(a2){var a3="";
var a4=new XMLHttpRequest();a4.open("GET","/"+a2,false);
a4.send(null);a3=a4.responseText;return a3};this.createEnv=function(a3,a2){a3=aR.mkCompat(a3,a2);
if(aA.values.debug){console.log(aP.getMessage("env_option__debug_scripts"));
a3="debugger;\n"+a3}return a3};this.injectScript=function(a7,a3){var a9=[];
a7.requires.forEach(function(bc){var bb=bc.textContent;
bb=aR.mkCompat(bb,a7.options.compatopts_for_requires?a7:null);
a9.push(bb)});var a8="\n"+a9.join("\n")+"\n";var a5=aE(a7.name);
var a6=a0.createEnv(a7.textContent,a7);var ba={};for(var a4 in a7){if(a4=="includes"||a4=="matches"||a4=="requires"||a4=="excludes"||a4=="textContent"){continue
}ba[a4]=a7[a4]}var a2={method:"executeScript",header:a7.header,code:a6,requires:a8,version:chrome.extension.getVersion(),storage:a5,script:ba,id:a0.info.contextId};
if(a1){a3();return a2}else{window.setTimeout(function(){chrome.tabs.sendMessage(a0.info.tabId,a2,a3)
},1)}}};var t=function(a0){q(a0,null);aq(a0,null)};
var W=function(a0){if(a0){a0+=(a0.search("\\?")==-1?"?":"&")+"ts="+(new Date()).getTime()
}return a0};var aT=function(a2,a1){if(!a2){return null
}var a0=null;if(a2.fileURL&&a2.fileURL.search("^file://"==-1)){a0=a2.fileURL
}if(a2.downloadURL&&a2.downloadURL.search("^file://"==-1)){a0=a2.downloadURL
}if(a0&&a1){a0=W(a0)}return a0};var h=function(a4,a3){if(!a4){return null
}var a2=null,a0=null;if(a4.fileURL&&a4.fileURL.search("^file://"==-1)){a2=a4.fileURL
}if(a4.downloadURL&&a4.downloadURL.search("^file://"==-1)){a2=a4.downloadURL
}if(a4.updateURL&&a4.updateURL.search("^file://"==-1)){a0=a4.updateURL
}if(a0){return a3?W(a0):a0}if(a2){var a1=null;a1=a2.replace(".user.js",".meta.js");
if(a1==a2){a1=a2.replace(".tamper.js",".meta.js")}if(a1==a2){a1=null
}return a3?W(a1):a1}return null};var am=function(a3,a4){var a2=h(a3,true);
if(a2){var a1={method:"GET",retries:0,url:a2,};var a0=function(a5){a3.meta=null;
if(a5.readyState==4&&a5.status==200){var a6=A.processMetaHeader(a5.responseText);
a3.meta=a6;a3.metasrc=a5.responseText}else{console.log("bg: unable to find meta data @ "+a2+" req.status = "+a5.status)
}a4(a3)};s(a1,{onload:a0});return}a3.meta=null;a4(a3)
};var c=function(a1){var a3,a2=a1.options.override;
a1.includes=a2.merge_includes&&a2.orig_includes?a2.orig_includes.slice():[];
a1.excludes=a2.merge_excludes&&a2.orig_excludes?a2.orig_excludes.slice():[];
a1.matches=a2.merge_matches&&a2.orig_matches?a2.orig_matches.slice():[];
for(a3=0;a3<a2.use_includes.length;a3++){var a0=a1.excludes.indexOf(a2.use_includes[a3]);
if(a0>=0){a1.excludes.splice(a0,1)}a1.includes.push(a2.use_includes[a3])
}if(typeof a2.use_matches!=="undefined"){for(a3=0;a3<a2.use_matches.length;
a3++){a0=a1.excludes.indexOf(a2.use_matches[a3]);if(a0>=0){a1.excludes.splice(a0,1)
}a1.matches.push(a2.use_matches[a3])}}for(a3=0;a3<a2.use_excludes.length;
a3++){a1.excludes.push(a2.use_excludes[a3])}return a1
};var aN=function(){if(D){console.debug("bg: notifyOptionsTab() -> may fail...")
}aj();var a0=function(a1){chrome.extension.sendMessage({method:"updateOptions",items:a1,options:{enabled:aA.values.enabled}},function(a2){})
};f(a0)};var Y=function(bd){var br=false;var bq=false;
var a3=false;var bn=false;var bp={};if(bd.name===undefined){bd.name=null
}if(bd.clean===undefined){bd.clean=false}if(bd.defaultscript===undefined){bd.defaultscript=false
}if(bd.ask===undefined){bd.ask=true}if(bd.url===undefined||bd.url==null){bd.url=""
}if(bd.save===undefined){bd.save=false}if(bd.hash===undefined){bd.hash=""
}if(bd.force_url===""){bd.force_url=null}if(bd.ask&&!bd.tabid){console.warn("anus: no tabId was given!")
}var bs=A.createScriptFromSrc(bd.src);if(!bs.name||bs.name==""||(bs.version==undefined)){var bf=aP.getMessage("Invalid_UserScript__Sry_")+"\n\n";
if(bd.name){bf+=aP.getMessage("Script_name_0url0",bd.name)+"\n\n"
}if(bd.url){bf+=aP.getMessage("Downloaded_from_0url0",bd.url)
}if(bd.tabid){chrome.tabs.sendMessage(bd.tabid,{method:"showMsg",msg:bf,frameId:0},function(bt){})
}else{console.warn("anus: "+bf)}return false}var a7=n.getValue(bs.name,null);
var a5="";if(!bd.clean&&a7&&a7.system&&!bd.defaultscript){return false
}if(bd.name&&bd.name!=bs.name){if(bd.clean){console.warn("anus: names do not match!");
return false}else{bp.renamed=true}}var bg=null;if(a7&&bp.renamed){bg=aP.getMessage("A_script_with_that_name_already_exists_")
}else{if(bs.options.compat_uW_gmonkey){bg=aP.getMessage("This_script_uses_uW_gm_api_")
}}if(bg){if(bd.tabid){chrome.tabs.sendMessage(bd.tabid,{method:"showMsg",msg:bg,frameId:0},function(bt){})
}else{console.warn("anus: "+bf)}return false}if(a7){if(a7.lastModified&&bd.lastModified!==undefined&&a7.lastModified!==bd.lastModified){var ba=aP.getMessage("some_secs");
try{var a9=Math.max(1,Math.floor(((new Date()).getTime()-a7.lastModified)/1000));
if(!isNaN(a9)){ba=a9}}catch(bo){}a5+=aP.getMessage("CONFLICT__This_script_was_modified_0t0_seconds_ago_",ba)+"     \n\n";
a3=true}bn=(bd.hash&&a7.hash!=bd.hash);bs.fileURL=a7.fileURL
}bs.hash=bd.hash?bd.hash:(a7?a7.hash:null);bs.lastUpdated=(new Date()).getTime();
bs.system=bd.defaultscript;if(bd.url){bs.fileURL=bd.url
}if(!bd.clean&&bd.force_url){bs.updateURL=null;bs.downloadURL=bd.force_url
}bs.position=a7?a7.position:y()+1;if(bs.name.search("\n")!=-1){var bf=aP.getMessage("Invalid_UserScript_name__Sry_");
if(bd.tabid){chrome.tabs.sendMessage(bd.tabid,{method:"showMsg",msg:bf,frameId:0},function(bt){})
}else{console.warn("anus: "+bf)}return false}else{if(!bd.clean&&a7&&bs.version==a7.version&&!bn){if(bd.defaultscript||bd.noreinstall){return null
}if(bd.save){a5+=aP.getMessage("You_are_about_to_modify_a_UserScript_")+"     \n"
}else{a5+=aP.getMessage("You_are_about_to_reinstall_a_UserScript_")+"     \n";
br=true;a5+="\n"+aP.getMessage("All_script_settings_will_be_reset_")+"!!\n"
}a5+="\n"+aP.getMessage("Name_")+"\n";a5+="    "+bs.name+((bs.version!="")?" v"+bs.version:"")+"\n";
a5+="\n"+aP.getMessage("Installed_Version_")+"\n";a5+="    v"+bs.version+"\n"
}else{if(!bd.clean&&a7&&Q(bs.version,a7.version)==m){a5+=aP.getMessage("You_are_about_to_downgrade_a_UserScript")+"     \n";
a5+="\n"+aP.getMessage("Name_")+"\n";a5+="    "+bs.name+((bs.version!="")?" v"+bs.version:"")+"\n";
a5+="\n"+aP.getMessage("Installed_Version_")+"\n";a5+="    v"+a7.version+"\n"
}else{if(!bd.clean&&a7){a5+=aP.getMessage("You_are_about_to_update_a_UserScript_")+"     \n";
a5+="\n"+aP.getMessage("Name_")+"\n";a5+="    "+bs.name+((bs.version!="")?" v"+bs.version:"")+"\n";
a5+="\n"+aP.getMessage("Installed_Version_")+"\n";a5+="    v"+a7.version+"\n";
bq=true}else{a5+=aP.getMessage("You_are_about_to_install_a_UserScript_")+"     \n";
a5+="\n"+aP.getMessage("Name_")+"\n";a5+="    "+bs.name+((bs.version!="")?" v"+bs.version:"")+"\n"
}}}}if(!bd.clean&&a7){bs.options.override=a7.options.override;
bs.options.comment=a7.options.comment}bs.options.override.orig_includes=bs.includes;
bs.options.override.orig_excludes=bs.excludes;bs.options.override.orig_matches=bs.matches;
bs=c(bs);bs.options.override.orig_noframes=bs.options.noframes;
if(a7){if(a7.sync){bs.sync=a7.sync}}if(!br&&!bd.clean&&a7){bs.enabled=a7.enabled;
bs.options.noframes=a7.options.noframes;if(!bs.options.awareOfChrome){bs.options.compat_forvarin=a7.options.compat_forvarin;
if(bs.options.run_at==""){bs.options.run_at=a7.options.run_at
}}var bi=h(a7);var a2=h(bs);if(bi!=a2){a5+="\n"+aP.getMessage("The_update_url_has_changed_from_0oldurl0_to__0newurl0",[bi,a2]);
bq=false}}if(!bd.clean&&bd.sync){bs.sync=bd.sync}if(!bs.includes.length&&!bs.matches.length){var a0="/"+G.staticVars.urlAllHttp_+"/";
a5+="\n"+aP.getMessage("Note_")+"\n";a5+="    "+aP.getMessage("This_script_does_not_provide_any__include_information_")+"\n";
a5+="    "+aP.getMessage("Tampermonkey_assumes_0urlAllHttp0_in_order_to_continue_",a0)+"    \n";
bs.includes.push(a0)}if(bs.options.run_at==""){bs.options.run_at="document-end"
}if(bd.force_options){for(var bl in bs.options){if(bd.force_options[bl]!==undefined){bs.options[bl]=bd.force_options[bl]
}}}var bb=[],a8="",be=2,bh=8,a1=12;var bm=(bs.excludes.length>bh?bh:bs.excludes.length)+(bs.includes.length>bh?bh:bs.includes.length)+(bs.matches.length>bh?bh:bs.matches.length);
if(bm<a1){be=1}var a4="\n"+aP.getMessage("Include_s__");
if(bs.options.override.includes||bs.options.override.matches){a4+=" ("+aP.getMessage("overwritten_by_user")+")"
}a4+="\n";var bk=function(bu,bx){if(!bu||!bu.length){return
}var bw=[],bv="";if(bu.length>bh){bu=bu.slice(0,bh);
bv="\n"+bx}for(var bt=0;(bt*be)<bu.length;bt++){bw.push(bu.slice(bt*be,((bt+1)*be)).join("; "))
}return"    "+bw.join("\n    ")+bv};a4+=bs.includes.length?bk(bs.includes,aP.getMessage("Attention_Can_not_display_all_includes_"))+"\n":"";
a4+=bs.matches.length?bk(bs.matches,aP.getMessage("Attention_Can_not_display_all_includes_"))+"\n":"";
var a6;if(bs.excludes.length){a6="";a6+="\n"+aP.getMessage("Exclude_s__");
if(bs.options.override.excludes){a6+=" ("+aP.getMessage("overwritten_by_user")+")"
}a6+="\n";a6+=bk(bs.excludes,aP.getMessage("Attention_Can_not_display_all_excludes_"))+"\n"
}a5+=a4?a4:"";a5+=a6?a6:"";var bj=false;for(var bl in bs.options){if(bl.search("compat_")!=-1&&bs.options[bl]===true){bj=true;
break}}if(bj){a5+="\n"+aP.getMessage("Note__A_recheck_of_the_GreaseMonkey_FF_compatibility_options_may_be_required_in_order_to_run_this_script_")+"\n"
}if(bd.clean){a5+="\n"+aP.getMessage("Do_you_really_want_to_factory_reset_this_script_")+"    "
}else{a5+="\n"+aP.getMessage("Do_you_want_to_continue_")
}var bc=function(){var bt=q(bs.name,bs)||{};if(!a7||bd.clean){aq(bs.name,{ts:(new Date()).getTime()})
}if(!bd.cb){aN()}if(false){var bu=function(bv){if(!bv){return
}console.log("anus: disable extension "+bv.name);aS.setEnabled(bv,false)
};aS.getUserscriptByName(bs.name,bu)}bp.installed=true;
bp.lastModified=bt.lastModified};if(!a3&&(!bd.ask||(bq&&aA.values.notification_silentScriptUpdate))){bc();
if(bd.cb){bd.cb(bp)}}else{chrome.tabs.sendMessage(bd.tabid,{method:"confirm",msg:a5,frameId:0},function(bt){var bu=bt&&bt.confirm;
if(bu){bc()}if(bd.cb){bd.cb(bp)}})}return true};var d=function(a1,a3,a0){var a2={method:"GET",retries:aw.XMLHTTPREQUEST.RETRIES,url:a1,};
var a4=function(a6){if(a6.readyState==4){if(a6.status==200){var a8=function(a9){if(a0){a0(true,a9.installed)
}};var a7={url:a1,src:a6.responseText,ask:true,cb:a8};
if(a3){for(var a5 in a3){if(!a3.hasOwnProperty(a5)){continue
}a7[a5]=a3[a5]}}if(!Y(a7)){if(a0){a0(false,false)}}}else{if(V){console.log("scriptClick: "+a1+" req.status = "+a6.status)
}if(a0){a0(false,false)}}}};s(a2,{onload:a4})};var l=function(a4,a0){var a1=function(a6){if(!a4){return false
}for(var a5=0;a5<a4.length;a5++){if(a4[a5]==a6){return true
}}return false};var a3=function(a5){return !a1(a5)&&!au.get.empty(a5)&&au.get.stats(a5).running
};var a2=function(a7){if(D){console.log("getValidTabId: getActive",a7)
}var a6=0;var be=a7&&a7.id;var a5=be&&!au.get.empty(a7.id);
var ba=a7?a7.index:undefined;if(!be||!a5){var a9=0;
var bb=0;var a8=function(bf,bg){if(bb==0||bf.ts<bb){if(a3(bg)){bb=bf.ts;
a9=bg}}};aa.forEach(au.get.tabs(),a8);a6=Number(a9)
}else{if(a3(a7.id)){a6=a7.id}}if(D){console.log("getValidTabId: id ",a6,"index ",ba)
}if(a6==0){var bd=3;var bc=function(){var bf=function(bg){if(!bg){if(bd-->0){console.warn("chrome.tabs.create failed -> retry!");
window.setTimeout(bc,500)}else{console.error("chrome.tabs.create failed -> giving up now!")
}return}a6=bg.id;var bi=function(){chrome.tabs.remove(a6)
};var bh=function(){a0(a6,bi)};window.setTimeout(bh,100)
};chrome.tabs.create({url:chrome.extension.getURL("ask.html")+"?i18n="+aA.values.i18n,index:ba},bf)
};bc()}else{a0(a6,null)}};chrome.tabs.getSelected(null,a2)
};var ad={check:function(a2,a3,a5,a4){if(!a2&&aA.values.scriptUpdateCheckPeriod==0){return
}var a0=function(a7){if(a3){var a8=aP.getMessage("Script_Update");
var a9=aP.getMessage("Check_for_userscripts_updates")+"...";
aH.show(a8,a9,chrome.extension.getURL("images/icon128.png"),10000)
}console.log("bg: check for script updates "+(a5?" for "+a5:""));
var a6=function(bb,be){if(bb){try{var bc=function(bg){if(bg.clicked){var bh=function(bk,bj){var bi={tabid:bk,url:be.url,src:be.code,ask:true,cb:bj,hash:be.newhash!==undefined?be.newhash:null};
Y(bi)};l(null,bh)}};var bf=aP.getMessage("There_is_an_update_for_0name0_avaiable_",be.name)+"\n"+aP.getMessage("Click_here_to_install_it_");
var ba=aP.getMessage("Just_another_service_provided_by_your_friendly_script_updater_");
if(aA.values.notification_silentScriptUpdate){bc({clicked:true})
}else{aH.show(ba,bf,chrome.extension.getURL("images/icon128.png"),aA.values.scriptUpdateHideNotificationAfter,bc)
}}catch(bd){console.error("bg: notification error "+bd.message)
}}if(a4){a4(bb)}};ad.updateUserscripts(0,a3,a5,a6)};
var a1=function(){var a7=aY();if(a2||((new Date()).getTime()-a7.scripts)>aA.values.scriptUpdateCheckPeriod){var a6=function(){a0();
a7.scripts=(new Date()).getTime();j(a7)};if(ai.enabled){ai.addSyncDoneListener(a6);
ai.scheduleSync(50,false)}else{a6()}}else{if(a4){console.log("bg: WARN ScriptUpdater.check -> no force but callback");
window.setTimeout(a4,1)}}};a1();window.setTimeout(ad.check,5*60*1000)
},srcCmp:function(a2){var a0=A.createScriptFromSrc(a2);
if(!a0.name||a0.name==""||(a0.version===undefined)){return k
}var a1=n.getValue(a0.name,null);if(a1&&a1.system){return null
}if(a0.options.compat_uW_gmonkey){return k}if(a0.name.search("@")!=-1){return k
}else{if(a1&&a0.version==a1.version){return C}else{if(a1&&Q(a0.version,a1.version)==m){return m
}else{if(a1){return ac}else{return ac}}}}return ac},updateUserscripts:function(a1,a2,be,bd){var ba=R();
var a8=1;var bf=0;var a6=function(){if(a8==0&&bf==0){if(a2){if(D||V||UV){console.debug("No update found")
}aH.show("Narf!",aP.getMessage("No_update_found__sry_"),chrome.extension.getURL("images/icon128.png"),10000)
}if(bd){window.setTimeout(bd,1)}}};var bc=function(bh){var bg={method:"GET",retries:aw.XMLHTTPREQUEST.RETRIES,url:aT(bh.script,true),};
a8++;(function(){var bk={tabid:a1,r:bh};var bj=aT(bk.r.script);
var bi=function(bn){a8--;if(bn.readyState==4&&bn.status==200){if(V){console.log(bj)
}var bm=function(){if(bk.r.meta){if(V||UV){console.log("bg: update hash of script "+bh.script.name+" to "+bk.r.meta[r])
}bk.r.script.hash=bk.r.meta[r];q(bk.r.script.name,bk.r.script,false)
}};var bl=ad.srcCmp(bn.responseText);if(bl==ac||bh.hash_different){bf++;
if(bd){bd(true,{name:bk.r.script.name,url:bj,code:bn.responseText,newhash:bk.r.meta?bk.r.meta[r]:null})
}return}else{if(bl==C){if(V||UV){console.log("bg: found same version @ "+bj)
}bm()}}}else{console.log(aP.getMessage("UpdateCheck_of_0name0_Url_0url0_failed_",[bk.r.script.name,bj]))
}a6()};s(bg,{onload:bi})})()};var a9=function(bh){a8++;
var bg=function(bl){var bm=!!bl.meta;var bi=bm&&!!bl.meta.version;
var bk=bi&&(!bh.script.version||Q(bl.meta.version,bh.script.version)==ac);
var bj=bm&&(bh.script.hash||!bi)&&!!bl.meta[r]&&bl.meta[r]!=bh.script.hash;
if(!bm||bj||!bi||bk){if(V||UV){console.log("bg: hash of script "+bh.script.name+" has changed or does not exist! running version check!")
}bh.meta=bl.meta;bh.metasrc=bl.metasrc;bh.hash_different=bj;
bc(bh)}else{if(V||UV){console.log("bg: hash of script "+bh.script.name+" has NOT changed.")
}}a8--;a6()};am(bh.script,bg)};var a7=false;for(var a5 in ba){var a4=ba[a5];
var a0=E(a4);if(!a0.script||!a0.cond){console.log(aP.getMessage("fatal_error")+"("+a4+")!!!");
continue}var bb=be&&a0.script.id!=be;var a3=!aA.values.scriptUpdateCheckDisabled&&!a0.script.enabled&&!be;
if(bb||a3||!(h(a0.script)||aT(a0.script))){continue
}a7=true;a9(a0)}if(!a7&&be&&bd){window.setTimeout(bd,1)
}a8--}};trup=ad;var y=function(){var a3=R();var a5=0;
for(var a0 in a3){var a4=a3[a0];var a2=E(a4);if(!a2.script||!a2.cond){console.error("fatal error ("+a4+")!!!");
continue}if(a2.script.position&&a2.script.position>a5){a5=a2.script.position
}}var a1=new A.Script();if(a1.position>a5){a5=a1.position
}return a5};var aV=function(a0,a4,a1){var a2=function(a7){return a7.replace(/\/$/,"")
};var a5,a3;try{if(!a1&&a4.length>1&&a4.substr(0,1)=="/"){a5=new RegExp(".*"+a4.replace(/^\//g,"").replace(/\/$/g,"")+".*","i")
}else{if(a1){a3=G.getRegExpFromMatch(a4);a5=new RegExp(a3)
}else{a3=G.getRegExpFromInclude(a4,{tryToFixUrl:aA.values.tryToFixUrl,safeUrls:aA.values.safeUrls});
a5=new RegExp(a3,"i")}}}catch(a6){console.warn("bg: invalid regexp ",a4);
av.tE('Invalid Regexp "'+a4+'" -> "'+a3+'" '+a6.message,chrome.extension.manifest.version);
return false}return a0.replace(a5,"")===""};var az=function(a0,a2,a4){var a1,a3=false;
if(a2.inc||a2.match){for(a1 in a2.inc){if(typeof a2.inc[a1]!=="string"){console.warn("bg: WARN: include["+a1+"] '"+a2.inc[a1]+"' "+(a4?"@"+a4+" ":"")+"can't be compared to '"+a0+"'")
}else{if(aV(a0,a2.inc[a1])){if(D){console.log("bg: @include '"+a2.inc[a1]+"' matched"+(a4?" ("+a4+")":""))
}a3=true;break}}}if(a2.match){for(a1 in a2.match){if(typeof a2.match[a1]!=="string"){console.warn("bg: WARN: match["+a1+"] '"+a2.match[a1]+"' "+(a4?"@"+a4+" ":"")+"can't be compared to '"+a0+"'")
}else{if(aV(a0,a2.match[a1],true)){if(D){console.log("bg: @match '"+a2.match[a1]+"' matched"+(a4?" ("+a4+")":""))
}a3=true;break}}}}if(!a3){return a3}}else{a3=true}for(a1 in a2.exc){if(aV(a0,a2.exc[a1])){if(D){console.log("bg: @exclude '"+a2.exc[a1]+"' matched"+(a4?" ("+a4+")":""))
}a3=false;break}}return a3};var R=function(){var a2=n.listValues();
var a3=[];for(var a1 in a2){var a0=a2[a1];if(a0.search(/@re$/)==-1){continue
}var a4=a0.replace(/@re$/,"");a3.push(a4)}return a3
};var aj=function(a1,a6){var a0=aZ();for(var a2=0;a2<a0.length;
a2++){var a3=a0[a2];if(a3.name==a1){var a4=(a3.position<a6)?0.5:-0.5;
a3.position=(Number(a6)+a4)}}a0=ar(a0);var a5=1;for(var a2=0;
a2<a0.length;a2++){var a3=a0[a2];a3.position=a5++;q(a3.name,a3,false)
}};var ar=function(a0){var a1=function(a3,a2){return a3.position-a2.position
};a0.sort(a1);return a0};var aZ=function(a1){var a5=R();
var a2=[];if(D||V){console.log("determineScriptsToRun @"+a1)
}for(var a0 in a5){var a6=a5[a0];if(a1){var a3=n.getValue(a6+M,null);
if(!a3){continue}if(!az(a1,a3,a6)){continue}}var a4=E(a6);
if(!a4.script||!a4.cond){console.error("fatal error ("+a6+")!!!");
continue}if(V){console.log("bg: determineScriptsToRun: found script "+a6)
}a2.push(a4.script)}return ar(a2)};var aE=function(a0){var a1=n.getValue(a0+ap,{ts:0,data:{}});
if(typeof a1.ts==="undefined"){a1.ts=0}if(typeof a1.data==="undefined"){a1.data={}
}return a1};var aq=function(a0,a1){if(a1){n.setValue(a0+ap,a1)
}else{n.deleteValue(a0+ap)}};var E=function(a0){var a1=n.getValue(a0,null);
if(a1){var a2=function(a3){if(!a3){return}for(var a4=0,a5=null;
a5=a3[a4];a4++){delete a5.loaded;delete a5.textContent;
delete a5.resURL;delete a5.resText}};a1.textContent=n.getValue(a0+aB,a1.textContent);
a2(a1.requires);a2(a1.resources);if(!a1.textContent){a1=null
}}return{script:a1,cond:n.getValue(a0+M,null)}};var q=function(a1,a8,a3){if(a3===undefined){a3=true
}var a6={};if(a8){var a4=n.getValue(a1);var a7=!a4;
n.setValue(a1+M,{inc:a8.includes,match:a8.matches,exc:a8.excludes});
n.setValue(a1+aB,a8.textContent);var ba=a8;ba.textContent=null;
if(a3){a6.lastModified=(new Date()).getTime();ba.lastModified=a6.lastModified
}n.setValue(a1,ba);if(a3){if(a7){ai.scriptAddedCb(a1,a8)
}else{ai.scriptChangedCb(a1,a8,a4)}if(!aA.values||aA.values.statistics_enabled){var a9=null;
if(a7&&a8.fileURL){var a2=G.parse(a8.fileURL);var a5=a2.hostname&&a2.hostname.length>5?a2.hostname.substr(0,1)+"***"+a2.hostname.substr(a2.hostname.length-3,3):"*";
a9=a2.protocol+"//"+a5+(a2.port?":"+a2.port:"")+a2.pathname+(a2.search?"?***":"")
}av.tS(a1,a9,a7?true:null)}}}else{var a0=E(a1);n.deleteValue(a1+M);
n.deleteValue(a1+aB);n.deleteValue(a1);if(a3){if(a0.script&&a0.cond){ai.scriptRemovedCb(a1,a0.script)
}if(!aA.values||aA.values.statistics_enabled){av.tS(a1,null,false)
}}}O.items.rundata.removeAll();return a6};var aQ=(function(){var a0=function(a4,a6){var ba=null;
var a8=a4.sender;if(V||EV||MV){console.log("back: connect.method "+a6.method+" contextId "+a6.id+" tabId: "+(a8.tab?a8.tab.id:"unknown!!!"))
}var a3=function(be){try{a4.postMessage(be)}catch(bd){console.error("bg: Error sending port ("+a4.name+") message: "+JSON.stringify(be))
}};if(a6.method=="xhr"){var a7=function(){a4.disconnect()
};var a1=function(bd){a3({error:true,data:bd})};var a9=function(bd){a3({success:true,data:bd})
};var a2=function(bd){a3({change:true,data:bd})};var bb=function(bd){a3({progress:true,data:bd})
};var a5=function(bd){a3({timeout:true,data:bd})};s(a6.details,{onload:a9,onreadychange:a2,onprogress:bb,onerr:a1,ontimeout:a5,ondone:a7})
}else{if(a6.method=="addStorageListener"){if(typeof a8.tab!="undefined"){if(V||SV){console.log("storage add listener "+a6.name+" "+a6.id)
}n.addListener({tabid:a8.tab.id,id:a6.id,name:a6.name,time:(new Date()).getTime(),response:a3});
ba=function(){n.removeListeners(a6.name,a6.id,false)
}}else{console.log(aP.getMessage("Unable_to_load_storage_due_to_empty_tabID_"));
a3({error:true})}}else{if(a6.method=="removeStorageListener"){if(typeof a8.tab!="undefined"){if(V){console.log("storage remove listener "+a6.name+" "+a6.id)
}n.removeListeners(a6.name,a6.id);a3({error:false})
}else{console.warn("Unable to remove storage listener due to empty tabID!");
a3({error:true})}}else{if(a6.method=="saveStorageKey"){if(typeof a8.tab!="undefined"){if(a6.name){var bc=aE(a6.name);
if(V||SV){console.log("storage ("+a6.name+"): set key "+a6.key+" to '"+a6.value+"'")
}bc.data[a6.key]=a6.value;bc.ts=a6.ts;aq(a6.name,bc);
n.notifyListeners(a6.name,null,function(bd){var be={data:{},ts:0};
var bf=aE(a6.name);be.data[a6.key]=bf.data[a6.key];
be.ts=bf.ts;var bg={storage:be};if(bf.data[a6.key]===undefined){bg.removed=a6.key
}bd(bg)})}}else{console.log(aP.getMessage("Unable_to_save_storage_due_to_empty_tabID_"))
}a3({})}}}}if(ba){a4.onDisconnect.addListener(ba)}if(V){console.log("back: connect.method "+a6.method+" end!")
}};return function(a1){if(!ag.late){ag.registerLateCallback(function(){aQ(a1)
});return}var a2=function(a3){a0(a1,a3)};a1.onMessage.addListener(a2)
}})();var aM={ping:{allow:{insecure:true},exec:function(a2,a1,a0){a0({pong:true,instanceID:I})
}},openInTab:{allow:{script:true,extpage:true},exec:function(a4,a2,a0){var a1=function(a7){aX[a7.id]=true;
a0({tabId:a7.id})};var a3=["active"];var a5={url:a4.url};
if(a4.options){for(var a6=0;a6<a3.length;a6++){if(a4.options[a3[a6]]!==undefined){a5[a3[a6]]=a4.options[a3[a6]]
}}if(a4.options.insert){a5.index=a2.tab.index+1}}chrome.tabs.create(a5,a1)
}},closeTab:{allow:{script:true,extpage:true},exec:function(a2,a1,a0){if(a2.tabId&&aX[a2.tabId]){chrome.tabs.remove(a2.tabId)
}a0({})}},getTab:{allow:{script:true},exec:function(a3,a1,a0){if(typeof a1.tab!="undefined"){if(typeof at[a1.tab.id]=="undefined"){at[a1.tab.id]={storage:{}}
}var a2=at[a1.tab.id];a0({data:a2})}else{console.log(aP.getMessage("Unable_to_deliver_tab_due_to_empty_tabID_"));
a0({data:null})}}},getTabs:{allow:{script:true},exec:function(a2,a1,a0){a0({data:at})
}},saveTab:{allow:{script:true},exec:function(a4,a2,a0){if(typeof a2.tab!="undefined"){var a3={};
for(var a1 in a4.tab){a3[a1]=a4.tab[a1]}at[a2.tab.id]=a3
}else{console.log(aP.getMessage("Unable_to_save_tab_due_to_empty_tabID_"))
}a0({})}},copyToClipboard:{allow:{script:true,extpage:true},exec:function(a2,a1,a0){if(typeof a1.tab!="undefined"){aO.copy(a2.data)
}else{console.log("bg: unable to process request!")
}a0({})}},setOption:{allow:{extpage:true},exec:function(a4,a2,a0){var a3=(a2.extpage=="options"||a4.origin=="options");
aA.values[a4.name]=a4.value;aA.save();var a1=function(a5){if(a3){a0({items:a5,options:{enabled:aA.values.enabled}})
}else{aN();a0({})}};f(a1)}},buttonPress:{allow:{extpage:true},exec:function(a5,a3,a1){var a2=function(){a1({})
};if(a5.name=="reset_simple"){al.reset(a2)}else{if(a5.name=="reset_factory"){al.factoryReset(a2)
}else{if(a5.name=="create_tesla_data"){var a0=function(a6){aO.copy({content:J.UTF8.encode(a6.join("<br>")),type:"html"});
a2()};ai.createTeslaData(a0)}else{if(a5.name=="reset_chrome_sync"){ai.reset(a2)
}else{if(a5.name=="install_tests"){var a4=aF.framework.prepare(Y,a2);
if(a4){console.error(a4)}}else{if(a5.name=="enabled"){aA.values[a5.name]=!aA.values[a5.name];
aA.save();a1({})}else{if(a5.name=="run_script_updates"){if(a5.scriptid){var a2=function(a6){a1({scriptid:a5.scriptid,updatable:a6})
};ad.check(true,false,a5.scriptid,a2)}else{ad.check(true,true);
a1({})}}else{console.log("bg: Warning: unknown button "+a5.name);
a1({})}}}}}}}}},modifyScriptOptions:{allow:{extpage:true},exec:function(a7,a8,a2){var ba=(a8.extpage=="options"||a7.origin=="options");
var a0=(a7.reload==undefined||a7.reload==true);var a4=function(){if(a7.reorder){aj()
}if(V){console.log("modifyScriptOptions "+ba)}if(a0){if(ba){var bb=function(bd){a2({items:bd,i18n:aA.values.i18n,options:{enabled:aA.values.enabled}})
};f(bb)}else{if(a7.name){window.setTimeout(aN,100)}var bc=function(be){var bd=e(be);
a2({items:bd,i18n:aA.values.i18n,options:{enabled:aA.values.enabled}});
if(a7.name&&aA.values.autoReload){chrome.tabs.sendMessage(be.id,{method:"reload",frameId:0},function(bf){})
}};chrome.tabs.getSelected(null,bc)}}else{a2({})}};
if(a7.name&&a7.method=="modifyScriptOptions"){var a1=E(a7.name);
if(a1.script&&a1.cond){var a3=false;var a9=new A.Script();
for(var a5 in a9.options){if(!a9.options.hasOwnProperty(a5)){continue
}if(typeof a7[a5]!=="undefined"){a1.script.options[a5]=a7[a5]
}}for(var a5 in a9.options.override){if(!a9.options.override.hasOwnProperty(a5)||a5.search("merge_")==-1){continue
}if(typeof a7[a5]!=="undefined"){a1.script.options.override[a5]=a7[a5];
a3=true}}if(typeof a7.enabled!=="undefined"){a1.script.enabled=a7.enabled
}if(typeof a7.includes!=="undefined"){a1.script.options.override.use_includes=a7.includes;
a1.script.options.override.use_excludes=a7.excludes;
a1.script.options.override.use_matches=a7.matches;a3=true
}if(a3){a1.script=c(a1.script)}q(a1.script.name,a1.script);
if(typeof a7.position!=="undefined"&&a0){aj(a7.name,a7.position)
}}}else{if(a7.nid&&a7.method=="modifyNativeScript"){var a6=function(be){if(be){if(a7.actionid=="installed"){if(a7.value=="false"){aS.uninstall(be,a4);
return true}}else{if(a7.actionid=="enabled"){aS.setEnabled(be,a7.value,a4);
return true}else{if(a7.actionid=="imported"){if(a7.value=="true"){var bc=aS.getUserscriptSource(be,a4);
if(bc){var bb=function(bf){if(bf.installed){if(aA.values.native_import_post_action=="disable"){aS.setEnabled(be,false,a4);
return}else{if(aA.values.native_import_post_action=="uninstall"){aS.uninstall(be,a4);
return}}}a4()};var bd={tabid:a8.tab.id,src:bc,ask:true,cb:bb};
if(Y(bd)){return true}}else{chrome.tabs.sendMessage(a8.tab.id,{method:"showMsg",msg:aP.getMessage("Please_double_check_the_native_script_import_settings__")},function(bf){})
}}}}}a4()}else{a2({})}};aS.getUserscriptById(a7.nid,a6);
return true}}a4()}},modifyNativeScript:{allow:{extpage:true},exec:function(a2,a1,a0){return aM.modifyScriptOptions.exec(a2,a1,a0)
}},saveScript:{allow:{extpage:true},exec:function(a6,a3,a1){var a5=(a6.reload==undefined||a6.reload==true);
var a0=function(a9){if(a5){var a8=function(ba){a9.items=ba;
a1(a9)};f(a8)}else{a1({})}};if(a6.clean){var a7=function(a9){var a8=function(ba){a1({cleaned:a9.installed,items:ba,options:{enabled:aA.values.enabled}});
if(a9.installed){n.notifyListeners(a6.name,null,function(bb){bb({storage:aE(a6.name)})
})}};f(a8)};if(D){console.debug("bg: clean userscript "+a6.name)
}var a4=E(a6.name);if(!a4.script||!a4.cond){console.error(aP.getMessage("fatal_error")+" ("+a6.name+")!!!");
a7({installed:false})}else{if(!Y({name:a6.name,tabid:a3.tab.id,force_url:null,url:a6.file_url,src:a4.script.textContent,clean:true,ask:true,save:true,cb:a7})){if(a7){a7({installed:false})
}}}}else{if(a6.code){var a7=a1;if(a6.reload===undefined||a6.reload===true){a7=function(a8){aj();
a0(a8)}}var a2={name:a6.name,tabid:a3.tab.id,force_url:a6.force_url,url:a6.file_url,src:a6.code,lastModified:a6.lastModified,ask:!aA.values.editor_easySave&&!a6.force,save:true,cb:a7};
if(!Y(a2)){a7({installed:false})}}else{t(a6.name);aj();
a0({})}}}},installScript:{allow:{insecure:true},exec:function(a4,a3,a1){if(typeof a3.tab!="undefined"){if(a3.extpage&&a4.code){var a2={name:a4.name,tabid:a3.tab.id,url:a4.file_url,src:a4.code,ask:true,cb:a1};
if(!Y(a2)){a1({installed:false})}}else{var a0=function(a6,a5){a1({data:null,found:a6,installed:a5});
if(a6){if(a5){aN()}}else{chrome.tabs.sendMessage(a3.tab.id,{method:"showMsg",msg:aP.getMessage("Unable_to_get_UserScript__Sry_"),id:a4.id},function(a7){})
}};d(a4.url,{tabid:a3.tab.id},a0)}}else{console.log(aP.getMessage("Unable_to_install_script_due_to_empty_tabID_"))
}}},registerMenuCmd:{allow:{script:true},exec:function(a2,a1,a0){if(typeof a1.tab!="undefined"){if(V||MV){console.log("MC add "+a2.id)
}p.add({tabId:a1.tab.id,url:a1.tab.url,name:a2.name,accessKey:a2.accessKey,id:a2.menuId,response:a0})
}else{console.log("Unable to register menu cmd due to empty tabID!");
a0({run:false})}}},unRegisterMenuCmd:{allow:{script:true},exec:function(a2,a1,a0){if(V||MV){console.log("MC unreg "+a2.id)
}p.clearById(a2.id);a0({})}},execMenuCmd:{allow:{extpage:true},exec:function(a2,a1,a0){var a3=p.getById(a2.id);
if(a3){if(V||MV){console.log("MC exec "+a3.id)}a3.response({run:true,menuId:a3.id})
}else{console.error("bg: Error: unable to find MC id "+a3.id)
}a0({})}},getWebRequestInfo:{allow:{script:true},exec:function(a3,a1,a0){if(typeof a1.tab!="undefined"){var a2={webRequest:aW};
a0(a2)}else{console.log("Unable to run scripts due to empty tab id");
a0({})}}},unLoad:{allow:{script:true},exec:function(a2,a1,a0){if(!a2.topframe){if(V||UV){console.log("unload check "+a2.id+" url: "+a2.url)
}if(a2.id){au.events.unload(a1.tab.id,a1.tab.frameId,a2.id)
}}}},prepare:{allow:{script:true},exec:function(a6,a7,a2){if(typeof a7.tab!="undefined"&&a7.tab.index>=0){var a8=a6.topframe?0:null;
var a1=a6.url+a6.params;var a9=aA.values.forbiddenPages.length==0||az(a1,{exc:aA.values.forbiddenPages});
var a4=au.events.prepare(a7.tab.id,a8,a6.id,a1);if(a9){var a5=function(){o.setIcon(a7.tab.id);
o.setBadge(a7.tab.id)};if(a4){var a0={enabledScriptsCount:a4,raw:{},webRequest:aW,logLevel:aA.values.logLevel,unsafeWindow:aA.values.runtime_unsafeWindow};
if(a6.raw){for(var a3=0;a3<a6.raw.length;a3++){a0.raw[a6.raw[a3]]=Registry.getRaw(a6.raw[a3])
}}a2(a0)}else{a2({logLevel:aA.values.logLevel})}au.events.run(a7.tab.id,a8,a6.id,a1,a5);
af.tab.resetFireCnt(a7.tab.id)}else{console.log("Forbidden page: '"+a1+"' -> Do nothing!");
if(a6.id){au.set.forbidden(a7.tab.id,a8,a6.id)}a2({})
}}else{a2({})}return false}},scriptBlockerDetected:{allow:{script:true},exec:function(a3,a2,a0){if(a3.xml_style_detected||a3.url.search(".xml$")!=-1){console.warn("blocker: unable to get unsafeWindow...")
}else{var a1=function(a5,a6){var a4=(a5&&a6)?aP.getMessage("Please_reload_this_page_in_order_to_run_your_userscripts_"):null;
a0({alert:a4})};ah.requestPermissionEx(a1)}au.set.blocker(a2.tab.id);
o.setIcon(a2.tab.id)}},startFireUpdate:{allow:{extpage:true},exec:function(a3,a2,a0){var a1=function(a4){a0({suc:a4})
};af.checkUpdate(true,a3.force,a1)}},getFireItems:{allow:{extpage:true},exec:function(a4,a3,a1){var a2=function(a9,a7,a8){if(a7==undefined){a7=null
}var a6=function(bb){try{var ba={image:bb,cnt:a9,scripts:a7,progress:a8};
a1(ba);a7=[]}catch(bc){console.warn("bg: warn: action menu closed? "+JSON.stringify(bc))
}};if(a4.countonly){a6(null)}else{Z.createIconEx(a9,a6)
}};if(!af.isReady()){a2(0,[],{action:af.status.action,state:af.status.progress});
return true}var a5=function(a6){var a7=aI(a4,a6);a2(a6.length,a7)
};if(a4.tabid){if(a4.countonly){af.tab.getCount(a4.tabid,a2)
}else{af.tab.getItems(a4.tabid,a5)}}else{if(a4.url){if(a4.url=="*"){var a0=function(a8){var a7=[];
for(var a6=0;a6<1000;a6++){a7.push(Math.floor(Math.random()*a8+1).toString())
}af.ids.getItems(a7,a5)};af.getMax("scripts","sid",a0)
}else{if(a4.countonly){af.url.getCount(a4.url,a2)}else{af.url.getItems(a4.url,a5)
}}}else{a2([],[])}}}},notification:{allow:{script:true,extpage:true},exec:function(a3,a2,a1){var a4=(a3.image&&a3.image!="")?a3.image:chrome.extension.getURL("images/icon128.png");
var a0=function(a5){a1({clicked:a5.clicked})};aH.show(a3.title,a3.msg,a4,a3.delay,a0)
}},localFileCB:{allow:{script:true},exec:function(a2,a1,a0){if(!b.useIframeMessage){b.listener(null,a2.data)
}a0({})}},handler:function(a5,a7,a1){if(!ag.late){ag.registerLateCallback(function(){aM.handler(a5,a7,a1)
});return true}if(V||EV||MV){console.log("back: request ",a5," sender: ",a7)
}var bd=aM[a5.method];if(bd){if(bd.allow&&bd.exec){var a6=aw.SELF.ID;
var a9=(!aw.REQUESTS.HAS_SENDER_ID&&a7.tab)||a7.id===a6;
var bb=null;var a3=aw.REQUESTS.INTERNAL_PAGE_URL;var a4=aw.REQUESTS.GET_INTERNAL_PAGE_REGEXP();
var a2=a9&&(!a7.tab||(a7.tab.url.search(a3)==0));if(a9&&a2){if(a7.tab){var a8=a7.tab.url.match(a4);
if(a8&&a8.length==2){bb=a8[1]}}else{bb="*"}a7.extpage=bb
}if(V||EV||MV){console.log("back: request page:",bb,"extpage:",a2)
}var be=(bb=="options");var a0=(bb=="background");var bc=a9&&!a2;
if(a0||(bd.allow.insecure)||(bd.allow.extpage&&a2)||(bd.allow.options&&be)||(bd.allow.script&&bc)){var ba=bd.exec(a5,a7,a1);
if(ba!==undefined){return ba}}else{if(D){console.warn("back: this context doesn't have the permission to call '"+a5.method+"' ")
}return false}}else{console.log("b: invalid implementation of "+a5.method);
return false}}else{console.log("back: unknown method "+a5.method);
return false}if(V){console.log("back: request.method "+a5.method+" end!")
}return true}};var p={commands:[],add:function(a0){p.commands.push(a0)
},list:function(){var a1=[];for(var a0 in p.commands){if(!p.commands.hasOwnProperty(a0)){continue
}var a2=p.commands[a0];a1.push(a2)}return a1},listByTabId:function(a3){var a2=[];
for(var a0 in p.commands){if(!p.commands.hasOwnProperty(a0)){continue
}var a5=p.commands[a0];if(a5.tabId==a3){var a1=false;
for(var a4=0;a4<a2.length;a4++){if(a2[a4].name==a5.name){a1=true;
break}}if(!a1){a2.push(a5)}}}return a2},clearByTabId:function(a0){p.getByTabId(a0)
},getByTabId:function(a3){var a2=[];var a0=p.commands;
p.commands=[];for(var a1 in a0){if(!a0.hasOwnProperty(a1)){continue
}var a4=a0[a1];if(a4.tabId!=a3){p.commands.push(a4)
}else{a2.push(a4);if(V||MV){console.log("MC remove "+a4.id)
}}}return a2},clearById:function(a0){p.getById(a0)},getById:function(a4){var a2=null;
var a0=p.commands;p.commands=[];for(var a1 in a0){if(!a0.hasOwnProperty(a1)){continue
}var a3=a0[a1];if(a3.id!=a4){p.commands.push(a3)}else{a2=a3
}}if(V||MV){console.log("MC remove "+a2.id)}return a2
}};var aI=function(a2,a6){var a4=[];var a9="http://...";
if(a2.tabid&&!au.get.empty(a2.tabid)){var a3=function(bb,ba){a9=ba;
return true};aa.forEach(au.get.urls(a2.tabid),a3)}else{if(a2.url){a9=a2.url
}}a4.push({name:aP.getMessage("Enable_Sort_Cache"),id:"fire_sort_cache_enabled",checkbox:true,option:true,enabled:aA.values.fire_sort_cache_enabled,desc:""});
var a7=a6.length?" ("+a6.length+")":"";a4.push({name:aP.getMessage("Available_Userscripts")+a7,heading:true,scriptTab:true});
a4=a4.concat(X(a6,false,true));a4.push({name:aP.getMessage("Settings"),heading:true});
a4.push({name:aP.getMessage("General"),section:true});
var a8="",a5="";var a1=aY();if(a1.fire.db_version==0){a5="?"
}else{var a0=a1.fire.db_version*1000;a5=new Date(a0).toString()
}a8+=aP.getMessage("Current_Index_")+"<br><br>";a8+=aP.getMessage("Date_")+" "+a5+"<br>";
a8+=aP.getMessage("Entries_")+" "+((a1.fire.entries)?a1.fire.entries:"?")+"<br><br><br>";
a4.push({name:"TamperFire DB",fire:true,fireInfo:true,value:a8,versionDB:a0});
a4.push({name:aP.getMessage("Check_for_Updates"),fname:aP.getMessage("Force_Update"),fire:true,fireUpdate:true});
a4.push({name:"Search by URL",id:"searchByURL",search:true,value:a9,desc:""});
return a4};var e=function(a5){var a1=a5?a5.url:null;
var a4=a1&&a1.length>4&&a1.substr(0,4).replace(/file|http/,"")==""?a1:"";
if(V){console.log("createActionMenuItems "+a1)}var a0=[];
var a3=[];a3.push({name:"enabled",section:true,pos:"top"});
a3.push({name:aP.getMessage("Enabled"),display:aA.values.enabled?null:"greyed",id:"enabled",button:true,reload:true,image:chrome.extension.getURL(aA.values.enabled?"images/button_ok.png":"images/cancel.png")});
if(aA.values.fire_enabled){a3.push({name:"fire",section:true,pos:"top"});
var a2=null;if(aA.values.fire_topOnly){a2=chrome.extension.getURL("fire.html?url="+encodeURIComponent(a1))
}else{a2=chrome.extension.getURL("fire.html?tab="+a5.id)
}a3.push({name:aP.getMessage("_0_scripts_found"),image:chrome.extension.getURL("images/download.gif"),doneImage:chrome.extension.getURL("images/fire.png"),tabid:a5.id,tamperfire:true,url:a2,newtab:true})
}a3.push({name:"scripts",section:true,pos:"right"});
var a6=u(a5);a3=a3.concat(a6);if(aA.values.enabled&&!a6.length){if(aA.values.forbiddenPages.length==0||az(a1,{exc:aA.values.forbiddenPages})){a3.push({name:aP.getMessage("No_script_is_running"),image:chrome.extension.getURL("images/info.png")})
}else{a3.push({name:aP.getMessage("This_page_is_blacklisted_at_the_security_settings"),image:chrome.extension.getURL("images/critical.png")})
}}if(aA.values.enabled&&(aA.values.configMode<100||!a6.length)){a3.push({name:aP.getMessage("Get_new_scripts___"),image:chrome.extension.getURL("images/script_download.png"),url:"http://userscripts.org",newtab:true});
a3.push({name:aP.getMessage("Add_new_script___"),image:chrome.extension.getURL("images/script_add.png"),url:chrome.extension.getURL("options.html")+"?open=0&url="+encodeURIComponent(a4),newtab:true})
}a0=a0.concat(a3);a0.push({name:"commands",section:true,pos:"left"});
var a7=v(a5.id);if(a7.length){a7.push({name:"commands2",section:true,pos:"left"})
}a7.push({name:aP.getMessage("Check_for_userscripts_updates"),id:"run_script_updates",button:true,image:chrome.extension.getURL("images/update.png")});
a7.push({name:aP.getMessage("Report_a_bug"),image:chrome.extension.getURL("images/bug.png"),url:"http://tampermonkey.net/bug",newtab:true});
a7.push({name:aP.getMessage("Please_consider_a_donation"),image:chrome.extension.getURL("images/amor.png"),url:"http://tampermonkey.net/donate.html",newtab:true});
a7.push({name:"about",section:true,pos:"bottom"});a7.push({name:aP.getMessage("Dashboard"),image:chrome.extension.getURL("images/agt_utilities.png"),url:chrome.extension.getURL("options.html")+"?"+["url="+encodeURIComponent(a4),"selected=dashboard"].join("&"),newtab:true});
a7.push(ax());a0=a0.concat(a7);return a0};var f=function(a1){var a3=[];
var a5=[];var a0;a3.push({name:aP.getMessage("Installed_userscripts"),heading:true,scriptTab:true,id:"dashboard"});
var a4=u(null,true);a0=a4.length;a4.push({name:aP.getMessage("No_script_is_installed"),image:chrome.extension.getURL("images/info.png"),visible:!a0});
a4.push({name:aP.getMessage("Get_some_scripts___"),image:chrome.extension.getURL("images/edit_add.png"),url:"http://userscripts.org",newtab:true,visible:!a0});
var a2=function(be){for(var bg=0;bg<be.length;bg++){var bc=be[bg];
var bf={name:bc.name,id:bc.id,icon:bc.icon,code:null,position:0,positionof:a0,enabled:bc.enabled,version:bc.version,description:bc.description,nativeScript:true};
a3.push(bf)}a3.push({name:"Version",id:null,version:true,value:chrome.extension.getVersion()});
if(chrome.extension.inIncognitoContext){a3.push({globalhint:true,icon:chrome.extension.getURL("images/critical.png"),value:aP.getMessage("All_modifications_are_only_kept_until_this_incognito_session_is_closed_")})
}a3.push({name:aP.getMessage("New_userscript"),id:null,image:chrome.extension.getURL("images/script_add.png"),icon:chrome.extension.getURL("images/txt.png"),code:aA.values.scriptTemplate,nnew:true,position:-1,positionof:a0,enabled:true,userscript:true});
a3=a3.concat(a4);a3.push({name:aP.getMessage("Settings"),heading:true,id:"settings",selected_default:true});
var bk=[];var bj=[];var bl=[];var ba=[];var a8=[];var bb=[];
var bi=[];var bh=[];var a7=[];var a6=[];var bd=[];var a9=null;
bk.push({name:aP.getMessage("General"),section:true});
bk.push({name:aP.getMessage("Config_Mode"),id:"configMode",level:0,option:true,select:[{name:aP.getMessage("Novice"),value:0},{name:aP.getMessage("Beginner"),value:50},{name:aP.getMessage("Advanced"),value:100}],value:aA.values.configMode,desc:aP.getMessage("Changes_the_number_of_visible_config_options")});
bk.push({name:aP.getMessage("Language"),id:"i18n",level:0,option:true,reload:true,warning:{msg:aP.getMessage("A_reload_is_required")},select:[{name:"Browser Default",value:null},{name:aP.getOriginalMessage("English"),value:"en"},{name:aP.getOriginalMessage("German"),value:"de"},{name:aP.getOriginalMessage("French"),value:"fr"},{name:aP.getOriginalMessage("Russian"),value:"ru"},{name:aP.getOriginalMessage("Spanish"),value:"es"},{name:aP.getOriginalMessage("Polish"),value:"pl"},{name:aP.getOriginalMessage("Chinese__Simplified_"),value:"zh_CN"},{name:aP.getOriginalMessage("Chinese__Traditional_"),value:"zh_TW"},{name:aP.getOriginalMessage("Japanese"),value:"ja"}],value:aA.values.i18n});
bk.push({name:aP.getMessage("Make_includes_more_safe"),id:"safeUrls",level:60,option:true,checkbox:true,enabled:aA.values.safeUrls,desc:aP.getMessage("Includes_more_safe_example")});
bk.push({name:aP.getMessage("Fix_includes"),id:"tryToFixUrl",level:60,option:true,checkbox:true,enabled:aA.values.tryToFixUrl,desc:aP.getMessage("Fix_includes_example")});
bk.push({name:aP.getMessage("Auto_reload_on_script_enabled"),level:20,id:"autoReload",option:true,checkbox:true,enabled:aA.values.autoReload,desc:aP.getMessage("Auto_reload_on_script_enabled_desc")});
bk.push({name:aP.getMessage("Anonymous_statistics"),level:0,id:"statistics_enabled",option:true,checkbox:true,enabled:aA.values.statistics_enabled,desc:aP.getMessage("Allow_Tampermonkey_to_collect_anonymous_statistics_via_Google_Analytics")});
bk.push({name:aP.getMessage("Debug_scripts"),level:100,id:"debug",option:true,checkbox:true,enabled:aA.values.debug,desc:""});
bk.push({name:aP.getMessage("Show_fixed_source"),level:100,id:"showFixedSrc",option:true,checkbox:true,enabled:aA.values.showFixedSrc,desc:""});
bk.push({name:aP.getMessage("Open_script_links_in"),id:"script_link_open_method",level:20,option:true,select:[{name:aP.getMessage("Default"),value:"default"},{name:aP.getMessage("Current_Tab"),value:"current_tab"},{name:aP.getMessage("New_Tab"),value:"new_tab"}],value:aA.values.script_link_open_method,desc:""});
bk.push({name:aP.getMessage("LogLevel"),id:"logLevel",level:0,option:true,select:[{name:aP.getMessage("Trace"),value:100},{name:aP.getMessage("Verbose"),value:80},{name:aP.getMessage("Debug"),value:60},{name:aP.getMessage("Error"),value:0}],value:aA.values.logLevel,desc:""});
bj.push({name:aP.getMessage("Native_Script_Import"),section:true,needsave:true});
a9={};if(aA.values.native_import){a9=aw.RUNTIME.ALLOWS_FILE_SCHEME_ACCESS===true?{image:chrome.extension.getURL("images/button_ok.png"),msg:aP.getMessage("TM_has_access_to_file_URIs")}:{image:chrome.extension.getURL("images/critical.png"),msg:aP.getMessage("Tampermonkey_needs_access_to_file_URIs__Visit_the_FAQ_"),url:"http://tampermonkey.net/faq.php#Q204"}
}bj.push({name:aP.getMessage("Enable_Native_Script_Import"),id:"native_import",level:0,option:true,checkbox:true,enabled:aA.values.native_import,validation:a9});
bj.push({name:aP.getMessage("Post_Import_Action"),id:"native_import_post_action",level:0,option:true,select:[{name:aP.getMessage("None"),value:"none"},{name:aP.getMessage("Disable_Extension"),value:"disable"},{name:aP.getMessage("Uninstall_Extension"),value:"uninstall"}],value:aA.values.native_import_post_action,desc:aP.getMessage("What_action_should_be_done_after_a_native_userscript_was_imported_sucessfully_")});
a9={};if(aA.values.native_import){a9=aS.isPathValid()?{image:chrome.extension.getURL("images/button_ok.png"),msg:aP.getMessage("Everything_is_setup_correctly_")}:{image:chrome.extension.getURL("images/critical.png"),msg:aP.getMessage("Tampermonkey_needs_to_know_the_absolute_path_to_your_browser_profile_folder_Visit_the_FAQ_"),url:"http://tampermonkey.net/faq.php#Q205"}
}bj.push({name:aP.getMessage("Browser_Profile_Path"),id:"native_import_path",level:0,option:true,text:true,width:2,value:aA.values.native_import_path,validation:a9});
if(aw.OPTIONS.HAS_TESLA){a6.push({name:aP.getMessage("TESLA")+" BETA",section:true,level:50,needsave:true});
a6.push({name:aP.getMessage("Enable_TESLA"),id:"sync_enabled",level:50,option:true,checkbox:true,enabled:aA.values.sync_enabled,desc:aP.getMessage("Tampermonkey_External_Script_List_Access")});
a6.push({name:aP.getMessage("Sync_Type"),id:"sync_type",enabler:true,level:50,option:true,select:[{name:"pastebin.com",value:a.types.ePASTEBIN},{name:"Chrome Sync (Beta)",value:a.types.eCHROMESYNC,enable:{sync_id:0,create_tesla_data:0}}],value:aA.values.sync_type});
a6.push({name:aP.getMessage("Sync_Id"),id:"sync_id",enabledBy:"sync_type",level:50,text:true,value:aA.values.sync_id,option:true});
a6.push({name:aP.getMessage("Create_Exportable_Data"),id:"create_tesla_data",enabledBy:"sync_type",button:true,ignore:true,level:60,warning:{msg:aP.getMessage("Copy_exportable_data_to_clipboard_Ok_")}})
}a8.push({name:aP.getMessage("Appearance"),section:true,level:20});
a9={};if(aA.values.notification_showUpdate=="off"){a9={image:chrome.extension.getURL("images/critical.png"),msg:aP.getMessage("Are_you_sure_that_you_don_t_want_to_be_notified_of_updates_")}
}a8.push({name:aP.getMessage("Update_Notification"),id:"notification_showUpdate",level:50,option:true,select:[{name:aP.getMessage("Off"),value:"off"},{name:aP.getMessage("Show_notification"),value:"notification"},{name:aP.getMessage("Open_changelog"),value:"changelog"}],value:aA.values.notification_showUpdate,validation:a9});
a8.push({name:aP.getMessage("Icon_badge_info"),id:"appearance_badges",level:50,option:true,select:[{name:aP.getMessage("Off"),value:"off"},{name:aP.getMessage("Running_scripts"),value:"running"},{name:aP.getMessage("Unique_running_scripts"),value:"running_unique"},{name:aP.getMessage("Disabled_scripts"),value:"disabled"},{name:"TamperFire",value:"tamperfire"}],value:aA.values.appearance_badges,desc:""});
if(aw.OPTIONS.HAS_TAMPERFIRE){bh.push({name:aP.getMessage("TamperFire"),section:true});
bh.push({name:aP.getMessage("Enable_TamperFire"),id:"fire_enabled",level:0,option:true,checkbox:true,enabled:aA.values.fire_enabled,desc:""});
bh.push({name:aP.getMessage("Use_top_frame_URL_only"),id:"fire_topOnly",level:0,option:true,checkbox:true,enabled:aA.values.fire_topOnly,desc:""});
bh.push({name:aP.getMessage("Enable_Sort_Cache"),id:"fire_sort_cache_enabled",level:100,checkbox:true,option:true,enabled:aA.values.fire_sort_cache_enabled,desc:""});
bh.push({name:aP.getMessage("Update_interval"),id:"fire_updatePeriod",level:50,option:true,select:[{name:aP.getMessage("Never"),value:0},{name:aP.getMessage("Every_Day"),value:24*60*60*1000},{name:aP.getMessage("Every_Week"),value:7*24*60*60*1000},{name:aP.getMessage("Every_2_Weeks"),value:14*24*60*60*1000},{name:aP.getMessage("Every_Month"),value:30*24*60*60*1000}],value:aA.values.fire_updatePeriod,desc:""})
}bl.push({name:aP.getMessage("Editor"),section:true,level:20});
bl.push({name:aP.getMessage("Enable_Editor"),id:"editor_enabled",level:100,option:true,checkbox:true,enabled:aA.values.editor_enabled,reload:true,warning:{msg:aP.getMessage("A_reload_is_required")},desc:""});
bl.push({name:aP.getMessage("Key_Mapping"),id:"editor_keyMap",level:50,option:true,reload:true,warning:{msg:aP.getMessage("A_reload_is_required")},select:[{name:aP.getMessage("Windows"),value:"windows"},{name:aP.getMessage("Emacs"),value:"emacs"},{name:aP.getMessage("Vim"),value:"vim"}],value:aA.values.editor_keyMap});
bl.push({name:aP.getMessage("Indentation_Width"),id:"editor_indentUnit",level:50,option:true,select:[{name:aP.getMessage("1"),value:1},{name:aP.getMessage("2"),value:2},{name:aP.getMessage("3"),value:3},{name:aP.getMessage("4"),value:4},{name:aP.getMessage("5"),value:5},{name:aP.getMessage("6"),value:6},{name:aP.getMessage("7"),value:7},{name:aP.getMessage("8"),value:8},{name:aP.getMessage("9"),value:9},{name:aP.getMessage("10"),value:10},{name:aP.getMessage("11"),value:11}],value:aA.values.editor_indentUnit,desc:""});
bl.push({name:aP.getMessage("Indent_with"),id:"editor_indentWithTabs",level:50,option:true,select:[{name:aP.getMessage("Tabs"),value:"tabs"},{name:aP.getMessage("Spaces"),value:"spaces"}],value:aA.values.editor_indentWithTabs,desc:""});
bl.push({name:aP.getMessage("TabMode"),id:"editor_tabMode",level:50,option:true,select:[{name:aP.getMessage("Classic"),value:"classic"},{name:aP.getMessage("Smart"),value:"smart"}],value:aA.values.editor_tabMode,desc:""});
bl.push({name:aP.getMessage("Reindent_on_typing"),id:"editor_electricChars",level:50,option:true,checkbox:true,enabled:aA.values.editor_electricChars,desc:""});
bl.push({name:aP.getMessage("Enable_autoSave"),id:"editor_autoSave",level:20,option:true,checkbox:true,enabled:aA.values.editor_autoSave,desc:""});
bl.push({name:aP.getMessage("Enable_easySave"),id:"editor_easySave",level:20,option:true,checkbox:true,enabled:aA.values.editor_easySave,desc:""});
ba.push({name:aP.getMessage("Script_Update"),section:true,level:0});
ba.push({name:aP.getMessage("Check_disabled_scripts"),id:"scriptUpdateCheckDisabled",level:0,option:true,checkbox:true,enabled:aA.values.scriptUpdateCheckDisabled,desc:""});
ba.push({name:aP.getMessage("Check_interval"),id:"scriptUpdateCheckPeriod",level:0,option:true,select:[{name:aP.getMessage("Never"),value:0},{name:aP.getMessage("Every_Hour"),value:1*60*60*1000},{name:aP.getMessage("Every_6_Hours"),value:6*60*60*1000},{name:aP.getMessage("Every_12_Hour"),value:12*60*60*1000},{name:aP.getMessage("Every_Day"),value:24*60*60*1000},{name:aP.getMessage("Every_Week"),value:7*24*60*60*1000}],value:aA.values.scriptUpdateCheckPeriod,desc:""});
ba.push({name:aP.getMessage("Dont_ask_me_for_simple_script_updates"),id:"notification_silentScriptUpdate",level:80,option:true,checkbox:true,enabled:aA.values.notification_silentScriptUpdate,desc:""});
ba.push({name:aP.getMessage("Hide_notification_after"),id:"scriptUpdateHideNotificationAfter",level:50,option:true,select:[{name:aP.getMessage("Never"),value:0},{name:aP.getMessage("15_Seconds"),value:15*1000},{name:aP.getMessage("30_Seconds"),value:30*1000},{name:aP.getMessage("1_Minute"),value:60*1000},{name:aP.getMessage("5_Minutes"),value:5*60*1000},{name:aP.getMessage("1_Hour"),value:60*60*1000}],value:aA.values.scriptUpdateHideNotificationAfter,desc:""});
if(aw.RUNTIME.NEED_UNSAFEWINDOW_PROXY){a9=aA.values.runtime_unsafeWindow=="auto"?{}:{image:chrome.extension.getURL("images/critical.png"),msg:aP.getMessage("This_option_is_essential_for_many_userscripts_to_work__Visit_the_FAQ_"),url:"http://tampermonkey.net/faq.php#Q404"};
bi.push({name:aP.getMessage("Runtime"),section:true,level:50});
bi.push({name:aP.getMessage("UnsafeWindow_retrieval_method"),id:"runtime_unsafeWindow",level:50,option:true,select:[{name:aP.getMessage("Auto"),value:"auto"},{name:aP.getMessage("Native"),value:"native"},{name:aP.getMessage("Unsafe"),value:"unsafe"},{name:aP.getMessage("Sandbox"),value:"sandbox"}],value:aA.values.runtime_unsafeWindow,desc:aP.getMessage("A_lot_of_userscripts_require_the_unsafeWindow_object_to_interact_with_the_pages_javascript_"),validation:a9})
}bb.push({name:aP.getMessage("Security"),section:true,level:50});
if(aw.OPTIONS.HAS_CSP){bb.push({name:aP.getMessage("Allow_overwrite_javascript_settings"),id:"scriptblocker_overwrite",level:50,option:true,select:[{name:aP.getMessage("Yes"),value:"yes"},{name:aP.getMessage("No"),value:"no"}],value:aA.values.scriptblocker_overwrite,desc:aP.getMessage("Tampermonkey_can_not_work_when_javascript_is_disabled")});
bb.push({name:aP.getMessage("Add_TM_to_CSP"),id:"webrequest_fixCSP",level:50,option:true,select:[{name:aP.getMessage("Yes"),value:"yes"},{name:aP.getMessage("No"),value:"no"}],value:aA.values.webrequest_fixCSP,desc:aP.getMessage("Tampermonkey_might_not_be_able_to_provide_access_to_the_unsafe_context_when_this_is_disabled")});
bb.push({name:aP.getMessage("Allow_headers_to_be_modified_by_scripts"),id:"webrequest_modHeaders",level:50,option:true,select:[{name:aP.getMessage("Yes"),value:"yes"},{name:aP.getMessage("Auto"),value:"auto"},{name:aP.getMessage("No"),value:"no"}],value:aA.values.webrequest_modHeaders,desc:""})
}bb.push({name:aP.getMessage("Forbidden_Pages"),id:"forbiddenPages",level:50,option:true,input:true,array:true,value:aA.values.forbiddenPages,desc:""});
bb.push({name:aP.getMessage("_require_blacklist"),id:"require_blacklist",level:80,option:true,input:true,array:true,value:aA.values.require_blacklist,desc:""});
a7.push({name:aP.getMessage("Userscripts"),section:true,level:80});
a7.push({name:aP.getMessage("New_script_template_"),id:"scriptTemplate",level:80,option:true,input:true,value:aA.values.scriptTemplate});
bd.push({name:aP.getMessage("Reset_Section"),section:true,level:50});
bd.push({name:aP.getMessage("Restart_Tampermonkey"),id:"reset_simple",level:50,button:true,reload:true,value:0,warning:{msg:aP.getMessage("This_will_restart_Tampermonkey_Ok_")}});
bd.push({name:aP.getMessage("Factory_Reset"),id:"reset_factory",level:80,button:true,reload:true,value:0,warning:{msg:aP.getMessage("This_will_remove_all_scripts_and_reset_all_settings_Ok_")}});
bd.push({name:aP.getMessage("Chrome_Sync_Reset"),id:"reset_chrome_sync",level:80,button:true,reload:false,value:0,warning:{msg:aP.getMessage("This_will_remove_all_stored_data_from_google_sync_Ok_")}});
if(aF){bd.push({name:aP.getMessage("Install_Tests"),id:"install_tests",level:80,button:true,reload:false,ignore:true,value:0,warning:{msg:aP.getMessage("This_will_install_a_lot_of_test_scripts_")}})
}a3=a3.concat(bk).concat(a8).concat(ba).concat(bi).concat(a6).concat(bj).concat(bh).concat(bl).concat(bb).concat(a7).concat(bd);
a3.push({name:"EOS",section:true,endsection:true});
if(false){a3.push({name:aP.getMessage("Registered_menu_cmds"),heading:true});
a5=v()}a3=a3.concat(a5);if(a1){a1(a3)}};aS.getAllUserscripts(a2)
};var ax=function(){var a0="version="+chrome.extension.getVersion()+"&ext="+aw.SELF.ID.substr(0,4);
return{image:chrome.extension.getURL("images/info.png"),urls:[{name:" "+aP.getMessage("Help"),url:"http://tampermonkey.net/faq.php?"+a0,newtab:true},{name:" "+aP.getMessage("Changelog"),url:"http://tampermonkey.net/changelog.php?"+a0,newtab:true}]}
};var v=function(a3){var a2=[];var a0=(a3==null||a3==undefined)?p.list():p.listByTabId(a3);
for(var a1 in a0){if(!a0.hasOwnProperty(a1)){continue
}var a5=a0[a1];var a4={name:a5.name,id:a5.id,accessKey:a5.accessKey,image:chrome.extension.getURL("images/package_utilities.png"),menucmd:true};
a2.push(a4)}return a2};var X=function(a2,a8,a3){var a5=[];
for(var a1 in a2){var a6=a2[a1];var a7;if(a8||a3){a7=a6
}else{a7={name:a6.name,id:a6.id,system:a6.system,enabled:a6.enabled,position:a6.position}
}a7.file_url=a6.downloadURL||a6.fileURL;a7.positionof=a2.length;
a7.userscript=a6.options.user_agent?false:true;a7.user_agent=a6.options.user_agent;
if(!a6.icon64&&!a6.icon){a7.icon64=chrome.extension.getURL(a7.user_agent?"images/user_agent.png":"images/txt.png")
}if(a6.options){var a4=new A.Script();for(var a0 in a4.options){if(!a4.options.hasOwnProperty(a0)){continue
}a7[a0]=a6.options[a0]}}if(a8||a3){a7.code=a6.textContent;
a7.sync=a6.sync;if(a8&&aA.values.showFixedSrc){a7.code=aR.mkCompat(a6.textContent,a6)
}}a5.push(a7)}return a5};var u=function(a4,a2){if(a2==undefined){a2=false
}var a1=a4?a4.url:null;var a0=[];if(a4){if(!au.get.empty(a4.id)){var a3=function(a6,a9){if(V||UV){console.log("Found at Tabs.get.urls["+a4.id+"] -> "+a9)
}var ba=aZ(a9);for(var a8=0;a8<ba.length;a8++){var a7=false;
for(var a5=0;a5<a0.length;a5++){if(a0[a5].name==ba[a8].name){a7=true;
break}}if(!a7){a0.push(ba[a8])}}};aa.forEach(au.get.urls(a4.id),a3)
}else{console.warn("bg: WARN: Tabs.get.urls["+a4.id+"] is empty!")
}}else{a0=aZ(a1)}return X(a0,a2)};var aO={copy:function(a1){var a0=document.createElement("iframe");
document.body.appendChild(a0);try{a0.contentDocument.designMode="on";
if(a1.type=="html"){a0.setAttribute("sandbox","allow-same-origin");
a0.contentDocument.documentElement.innerHTML=a1.content;
a0.contentDocument.execCommand("selectAll",false,null)
}else{a0.contentDocument.oncopy=function(a3){a3.clipboardData.setData(a1.mimetype||"text/plain",a1.content);
a3.preventDefault()}}a0.contentDocument.execCommand("copy",false,null);
a0.contentDocument.designMode="off"}catch(a2){console.error("bg: clipboard Error: "+a2.message)
}a0.parentNode.removeChild(a0);a0=null}};clip=aO;var w={permContentSettings:"contentSettings",permStorage:"storage",permissions:null,lock:false,clear:function(){if(w.lock){console.log("perm: clear, but locked")
}w.permissions=null},get:function(a0){var a1=function(a2){aa.forEach(a2.permissions,function(a4,a3){w.permissions[a4]=true
});w.lock=false;if(a0){a0()}};w.lock=true;w.permissions={};
chrome.permissions.getAll(a1)},has:function(a2,a0){if(w.lock){var a3=function(){w.has(a2,a0)
};window.setTimeout(a3,50);return}if(!w.permissions){var a1=function(){w.has(a2,a0)
};w.get(a1);return}if(a0){a0(!!w.permissions[a2])}},ask:function(a3,a6,a5,a0){var a4=chrome.extension.getURL("images/icon128.png");
var a2=function(a7){if(a0){a0(a7)}};var a1=function(a7){if(a7.granted){if(!w.permissions){w.permissions={}
}w.permissions[a3]=true;a2(a7.granted);return}a2(false)
};aH.getPermission(a6,a5,a4,60000,a3,a1)},remove:function(a2,a0){var a1=function(a3){if(w.permissions){w.permissions[a2]=false
}if(a0){a0(a3)}};chrome.permissions.remove({permissions:[a2]},a1)
}};var ah={asked:false,runCheck:false,hasPermission:false,init:function(){var a0=function(a1){ah.hasPermission=a1;
ah.runCheck=ah.hasPermission&&(aA.values.scriptblocker_overwrite=="yes");
if(D){console.log("bg: contentSettings: runCheck = "+ah.runCheck+" hasPerm = "+ah.hasPermission)
}};w.has(w.permContentSettings,a0)},askForPermission:function(a0){w.ask(w.permContentSettings,aP.getMessage("A_script_blocker_was_detected_"),aP.getMessage("Click_here_to_allow_TM_to_override_the_script_blocker"),a0)
},requestPermissionEx:function(a0){if(aA.values.scriptblocker_overwrite!="yes"){if(a0){a0()
}return}var a1=function(a3){if(a0){a0(a3,true)}if(a3&&!ah.runCheck){ah.runCheck=true;
al.reset()}};var a2=function(a3){if(ah.asked){if(a0){a0(a3,false)
}}else{if(a3){a0(a3,false)}else{ah.askForPermission(a1)
}}ah.asked=true};w.has(w.permContentSettings,a2)},remove:function(a0){w.remove(w.permContentSettings,a0)
}};var al={run:function(a7,a0){var a5=1;var a6=function(){if(a0){a0()
}window.location.reload()};var a1=function(){if(--a5==0){a6()
}};if(a7=="config"){var a4=n.listValues();for(var a3 in a4){var a2=a4[a3];
if(a2.search(aB)==-1){continue}if(a2.search(M)==-1){continue
}if(a2.search(ap)==-1){continue}n.deleteValue(a2)}}else{if(a7=="factory"){if(af.isReady()){a5++;
af.clean(a1)}if(ah.hasPermission){a5++;ah.remove(a1)
}a5++;n.deleteAll(a1)}}a1()},reset:function(a0){al.run(null,a0)
},factoryReset:function(a0){al.run("factory",a0)},configReset:function(a0){al.run("config",a0)
}};var i=function(){chrome.browserAction.setIcon({path:chrome.extension.getURL("images/icon_grey.png")});
chrome.browserAction.setPopup({popup:"action.html"});
chrome.browserAction.setTitle({title:"Tampermonkey"})
};var o={t:500,tob:{},toi:{},setIcon:function(a1,a2){if(o.toi[a1]){window.clearTimeout(o.toi[a1])
}var a0=function(){o.setIconInternal(a1,a2);delete o.toi[a1]
};o.toi[a1]=window.setTimeout(a0,o.t)},setIconInternal:function(a0,a1){if(a1==undefined){a1=aA
}var a8,a7,a6=null;var a5=false;var a2=false;var a4=false;
if(a0&&!au.get.empty(a0)){a5=au.get.blocker(a0);a2=au.get.stats(a0).running;
a4=au.get.forbidden(a0)}if(a4){a1.images.icon="images/icon_grey_forbidden.png";
a6=aP.getMessage("At_least_one_part_of_this_page_is_listed_at_the_forbidden_pages_setting_")
}else{if(a5){a1.images.icon="images/icon_grey_blocker.png";
a6=aP.getMessage("Some_scripts_might_be_blocked_by_the_javascript_settings_for_this_page_or_a_script_blocker_")
}else{if(a2){a1.images.icon="images/icon.png"}else{a1.images.icon="images/icon_grey.png"
}}}a8={path:chrome.extension.getURL(a1.images.icon)};
a7={title:a6?a6:chrome.extension.manifest.name};if(a0!=null){a8.tabId=a0;
a7.tabId=a0}try{chrome.browserAction.setIcon(a8);chrome.browserAction.setTitle(a7)
}catch(a3){console.warn("bg: ERROR while setIcon! "+a3.message)
}},setBadge:function(a1){if(o.tob[a1]){window.clearTimeout(o.tob[a1])
}var a0=function(){o.setBadgeInternal(a1);delete o.tob[a1]
};o.tob[a1]=window.setTimeout(a0,o.t)},setBadgeInternal:function(a1){var a3=0;
var a2=function(){if(D){console.log("badge: set "+a3)
}if(a3==0){chrome.browserAction.setBadgeText({text:"",tabId:a1})
}else{chrome.browserAction.setBadgeText({text:a3.toString(),tabId:a1})
}};if(aA.values.appearance_badges=="off"){a3=0}else{if(aA.values.appearance_badges=="running"){if(a1&&!au.get.empty(a1)){a3=au.get.stats(a1).running
}}else{if(aA.values.appearance_badges=="running_unique"){if(a1&&!au.get.empty(a1)){a3=au.get.stats(a1,true).unique
}}else{if(aA.values.appearance_badges=="disabled"){if(a1&&!au.get.empty(a1)){a3=au.get.stats(a1).disabled
}}else{if(aA.values.appearance_badges=="tamperfire"){var a0=function(a4){a3=a4;
a2()};af.tab.getCount(a1,a0);return}}}}}a2()}};var ae={infoChanged:[],redirects:{},addInfoChangedListener:function(a0){ae.infoChanged.push(a0)
},runInfoChangedListener:function(){for(var a0=0;a0<ae.infoChanged.length;
a0++){ae.infoChanged[a0](aW)}},headerCheck:function(a2){if(a2.tabId>=0&&aW.verified==false){if(D||UV){console.log("bg: verify that webRequest is working at "+a2.type+" to "+a2.url)
}var a5=false;var a4=new RegExp("^"+aW.testprefix);
for(var a1=0;a1<a2.requestHeaders.length;a1++){var a3=a2.requestHeaders[a1];
if(UV){console.log(" #: "+a3.name+" -> "+a3.value)}if(a3.name.search(a4)==0){if(D){console.log("bg: found "+a3.name+" @webRequest :)")
}a5=true}}if(!a5&&aW.verifyCnt-->0){return}aW.headers=a5;
aW.verified=true;ae.runInfoChangedListener();if(D){console.debug("bg: verified webRequest "+(aW.headers?"":"not ")+"being working")
}try{chrome.webRequest.onSendHeaders.removeListener(ae.headerCheck)
}catch(a0){aW.headers=false;aW.verified=true;ae.runInfoChangedListener()
}}},detectRedirectToCache:function(a0){ag.registerLateCallback(function(){ae.detectRedirect(a0)
})},detectRedirect:function(a0){var bb=a0.responseHeaders;
var a2=a0.requestId;var a9=false;var bc=false;var ba=false;
var bd=a0.type=="xmlhttprequest";var a5=a0.type=="main_frame";
var a3=a5||a0.type=="sub_frame";if(!bd&&!aA.values.webrequest_fixCSP&&!a3){return{}
}if(bd&&ae.redirects[a2]){a9=true}for(var a7=0;a7<bb.length;
a7++){var be=bb[a7];var a6=be.name.toLowerCase();if(a6=="location"){if(a3){bc=true
}else{if(bd){var a1=function(){var bf=a2;if(a9){window.clearTimeout(ae.redirects[a2].to)
}var bg=function(){delete (ae.redirects[bf])};ae.redirects[bf]={url:be.value,to:window.setTimeout(bg,10000)}
};a1();break}}}else{if(aA.values.webrequest_fixCSP&&(a6=="x-webkit-csp"||a6=="x-content-security-policy"||a6=="content-security-policy")){var a4=be.value.replace(/script-src /,"script-src "+aw.REQUESTS.INTERNAL_PAGE_URL+aw.SELF.ID+" 'unsafe-inline' 'unsafe-eval' ");
if(D){console.log('csp: replace "'+be.value+'" with "'+a4+'"')
}be.value=a4;bb[a7]=be;ba=true}}}if(!bc&&a3){var a8={tabId:a0.tabId,frameId:a0.frameId,url:a0.url};
au.events.response(a0.tabId,a0.frameId,a0.url)}if(bd&&a9){bb.push({name:"TM-finalURL",value:ae.redirects[a2].url});
ba=true}if(ba){return{responseHeaders:bb}}return{}},headerFix:function(bd){if(V||UV){console.log(bd.type)
}var bh=!au.get.empty(bd.tabId);var a2=bd.type=="main_frame";
var bi=ah.runCheck;var a7=a2||bd.type=="sub_frame";
if(a7&&bi){var be=G.parse(bd.url);var a5=be.origin+"/*";
chrome.contentSettings.javascript.set({primaryPattern:a5,setting:"allow"});
if(V||UV||EV){var a1=function(){var bj=function(bk){console.log("contentSettings: ("+(new Date()).getTime()+") state: "+JSON.stringify(bk))
};chrome.contentSettings.javascript.get({primaryUrl:bd.url},bj)
};console.log("contentSettings: ("+(new Date()).getTime()+") allow URL "+a5);
a1();window.setTimeout(a1,20)}}var a4=a2&&au.get.user_agent(bd.tabId,bd.frameId);
var a0=aW.headers&&bd.type=="xmlhttprequest";if(!a4&&!a0){return{}
}var a9=false;var bc={};var a6=[];var a8=new RegExp("^"+aW.prefix);
var a3;if(a4){a3=au.get.user_agent(bd.tabId,bd.frameId);
if(V||UV){console.log("bg: userscript user-agent spoof enabled! ("+a3+")")
}}if(V||UV){console.log("bg: process request to "+bd.url);
console.log(bd.requestHeaders)}for(var bb=0;bb<bd.requestHeaders.length;
bb++){var bg=bd.requestHeaders[bb];if(a0&&bg.name.search(a8)==0){a6.push(bg)
}else{if(a4&&bg.name.toLowerCase()=="user-agent"){a9=true;
bc[bg.name]=a3}else{bc[bg.name]=bg.value}}}if(a0){for(var bb=0;
bb<a6.length;bb++){var bg=a6[bb];a9=true;bc[bg.name.replace(a8,"")]=bg.value
}if(!aW.verified){a9=true;bc[aW.testprefix]="true"}}if(a9){var bf=[];
for(var ba in bc){if(!bc.hasOwnProperty(ba)){continue
}if(ba!=""){bf.push({name:ba,value:bc[ba]})}}if(V||UV){console.log(bf)
}return{requestHeaders:bf}}return{}},sucRequest:function(a0){if(a0.tabId>0){console.log("bg: "+a0.requestId+" print "+a0.type+" request of tabId "+a0.tabId+" to "+a0.url)
}},checkRequestForUserscript:function(a2){var a0=a2.type=="main_frame";
var a4=a2.type=="xmlhttprequest";var a3=a0||a2.type=="sub_frame";
if(a0&&a2.tabId>0&&a2.method!="POST"&&a2.url.search(/^file:\/\//)==-1&&a2.url.search(/\#bypass=true/)==-1&&ay.isScriptUrl(a2.url)){var a1=chrome.extension.getURL("ask.html")+"?script="+J.Base64.encode(a2.url)+"&i18n="+aA.values.i18n;
if(RV){console.log("bg: user script detected @ "+a2.url+" -> open tab with "+a1)
}if(ay.useNewTab()){chrome.tabs.create({url:a1},function(){});
return{redirectUrl:"javascript:history.back()"}}return{redirectUrl:a1}
}if(a0){au.events.reset(a2.tabId,true);au.events.request(a2.tabId,a2.frameId,a2.url)
}return{}},removeWebRequestListeners:function(){if(aW.use){try{ae.preCleanup();
chrome.webRequest.onBeforeRequest.removeListener(ae.checkRequestForUserscript);
chrome.webRequest.onBeforeSendHeaders.removeListener(ae.headerFix);
chrome.webRequest.onHeadersReceived.removeListener(ae.detectRedirect);
if(aW.headers){if(aW.verified==false){chrome.webRequest.onSendHeaders.removeListener(ae.headerCheck)
}if(V||UV){chrome.webRequest.onCompleted.removeListener(ae.sucRequest)
}}}catch(a0){}}aW.headers=false;aW.verified=true;ae.runInfoChangedListener()
},preInit:function(){if(aW.use){ae.tmp_cache=true;var a0={urls:["http://*/*","https://*/*"]};
chrome.webRequest.onHeadersReceived.addListener(ae.detectRedirectToCache,a0,["responseHeaders","blocking"]);
chrome.webRequest.handlerBehaviorChanged()}},preCleanup:function(){if(aW.use&&ae.tmp_cache){chrome.webRequest.onHeadersReceived.removeListener(ae.detectRedirectToCache);
delete ae.tmp_cache}},init:function(a1,a5){if(aW.use){try{ae.preCleanup();
var a4={urls:["http://*/*","https://*/*"],types:["xmlhttprequest"]};
var a0={urls:["http://*/*","https://*/*","file://*/*"]};
var a2={urls:["http://*/*","https://*/*"]};chrome.webRequest.onBeforeRequest.addListener(ae.checkRequestForUserscript,a0,["blocking"]);
chrome.webRequest.onBeforeSendHeaders.addListener(ae.headerFix,a0,["requestHeaders","blocking"]);
chrome.webRequest.onHeadersReceived.addListener(ae.detectRedirect,a2,["responseHeaders","blocking"]);
if(a5){if(!a1){chrome.webRequest.onSendHeaders.addListener(ae.headerCheck,a4,["requestHeaders"])
}if(V||UV){chrome.webRequest.onCompleted.addListener(ae.sucRequest,a4,[])
}}chrome.webRequest.handlerBehaviorChanged();aW.verified=a1;
aW.headers=a5;aW.id=((new Date()).getTime()+Math.floor(Math.random()*6121983+1)).toString();
aW.testprefix=aW.prefix+(Math.floor(Math.random()*6121983+1)).toString();
aW.prefix=aW.prefix+aW.id+"_";ae.runInfoChangedListener()
}catch(a3){if(D){console.error("bg: error initializing webRequests "+a3.message)
}ae.removeWebRequestListeners()}}},finalize:function(){ae.removeWebRequestListeners()
}};var H={retries:5,onCommitedListener:function(a0){au.events.commited(a0.tabId,a0.frameId,a0.url)
},wait:function(){if(!chrome.webNavigation||!chrome.webNavigation.onCommitted){if(aw.RUNTIME.OPERA||H.retries--==0){return
}if(D||V){console.log("bg: waitForWebNav()")}window.setTimeout(H.wait,300);
return}chrome.webNavigation.onCommitted.addListener(H.onCommitedListener)
}};var ag={late:false,callbacks:[],init:function(){},registerLateCallback:function(a0){if(D||V){console.log("toea: register callback")
}ag.callbacks.push(a0)},setReady:function(){if(D||V){console.debug("toea: run "+ag.callbacks.length+" callbacks")
}ag.late=true;for(var a0=0;a0<ag.callbacks.length;a0++){ag.callbacks[a0]()
}ag.callbacks=[]}};var S=(function(){var a3=false;var a2=null;
var a1={init:function(a5){a2=a5;window.addEventListener("beforeunload",a4,false);
window.setInterval(a0,Math.floor(aw.MISC.UNLOAD_TIMEOUT/2)*1000)
}};var a4=function(){if(a3){return}if(D){console.debug("Unloader.onbeforeunload()")
}if(a2){a2()}a0();a3=true};var a0=function(){aU.setItem("TM_unload_ts",(new Date()).getTime())
};return a1})();var aK=null;var aJ=function(a2,a3,a5){if(!ag.late){window.setTimeout(function(){aJ(a2,a3,a5)
},100);return}if(V){console.log("loadListener "+a5.url+" "+a3.status)
}var a1=(!a5||!a5.url||a5.url.length<4)?null:a5.url.substr(0,4);
var a0=function(a7){if(!a7){if(D){console.warn("getSrc: returned no response")
}}else{if(V){console.log("add script from "+a5.url)
}Y({tabid:a5.id,url:a5.url,src:a7.src})}};var a4=function(){aK=null;
if(a1=="file"){a0({src:b.getSource(a5.url)})}else{chrome.tabs.sendMessage(a2,{method:"getSrc",frameId:0},a0)
}};if(ay.isScriptUrl(a5.url)){if(V){console.log("found script @ "+a5.url)
}if(a3.status=="complete"){if(aK!=null){window.clearTimeout(aK);
aK=null}a4()}else{aK=window.setTimeout(a4,5000)}}var a6=0;
if(a3.status=="loading"){au.events.loading(a5.id,a6,a5.url)
}else{if(a3.status=="complete"){au.events.complete(a5.id,a6,a5.url)
}}};var P=function(a0,a1){};var F=function(a1,a0){au.events.remove(a1)
};var B=function(){if(chrome.extension.inIncognitoContext){n.markTemporary();
aA.values.native_import=false;aA.values.sync_enabled=false;
aA.values.fire_updatePeriod=0;aA.values.scriptUpdateCheckPeriod=0;
aA.values.sync_type=0;aA.values.statistics_enabled=false
}};var L=function(){K(aA.values.logLevel);aP.setLocale(aA.values.i18n);
aS.setPath(aA.values.native_import_path);if(aA.values.statistics_enabled){av.init(aw.SELF.ID);
window.onerror=function(a4,a3,a2){av.tE(a4,chrome.extension.manifest.version+" "+a3,a2)
}}ah.init();au.listeners.add.onReset(function(a2,a3){p.clearByTabId(a2);
n.notifyListeners(null,a2);if(!a3){o.setIcon(a2)}});
var a1=function(a2){o.setIcon(a2);o.setBadge(a2)};au.listeners.add.onCommited(a1);
au.listeners.add.onCompleted(a1);if(aA.values.sync_enabled&&aA.values.sync_type){ai.enable();
ai.scheduleSync(1000,true);ai.schedulePeriodicalCheck()
}if(aA.values.fire_enabled){af.init()}var a0=function(a2){if(V){console.log("bg: webRequest changed "+JSON.stringify(a2))
}if(U){U.setWebRequest(a2)}};ae.addInfoChangedListener(a0);
ae.init(aA.values.webrequest_modHeaders!="auto",aA.values.webrequest_modHeaders!="no")
};var G=Registry.get("uri");uris=G;var aA;var J;var s;
var U;var aR;var A;var a;var aP;var aF;init=function(){if(V){console.log("bg: init extension, detected id: "+aw.SELF.ID)
}ag.init();ae.preInit();chrome.tabs.onUpdated.addListener(aJ);
chrome.tabs.onRemoved.addListener(F);chrome.extension.onMessage.addListener(aM.handler);
chrome.extension.onConnect.addListener(aQ);chrome.extension.onConnectExternal.addListener(function(a3){a3.disconnect()
});S.init(function(){ae.finalize();ai.finalize()});
J=Registry.get("convert");aP=Registry.get("i18n");U=Registry.get("xmlhttprequest");
s=U.run;aR=Registry.get("compat");A=Registry.get("parser");
a=Registry.get("syncinfo");aF=Registry.get("test");
i();var a2=function(){B();L();z();o.setIcon();a0();
if(aF&&("3630.77".substr(0,3)==="###")){var a3=aF.framework.prepare(Y);
if(a3){console.error(a3)}}};var a1=function(){aA=new x(a2);
cfgo=aA};n.init(a1);var a0=function(){window.setTimeout(ad.check,10000);
H.wait();if(D||V){console.debug("Listeners registered!")
}window.setTimeout(ag.setReady,1)}};init()})();