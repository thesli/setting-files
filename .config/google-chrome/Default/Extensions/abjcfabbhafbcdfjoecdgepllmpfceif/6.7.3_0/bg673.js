// Extension for Chrome Browser - Magic Actions for YouTube™ - CHROMEACTIONS.COM - Copyright 2014 Vlad and Serge Strukoff - All Rights Reserved
(function(){function l(e){var d={ver:"6.7.3",nv:0,uid:"",mwvc:!0,color:"yellow",mwvct:0,mwvci:2,gap:10,hq:!0,hqi:"large",pause:!1,plist:!1,buf:!1,buf1:!1,loop:!1,hide:!1,ha:!1,anns:!0,cin:!0,cina:!1,cini:1,cinf:!1,cinc:1,cins:"",pt:!1,pti:0,align:!1,wide:!1,h0:!1,h1:!1,h2:!1,h3:!1,h4:!1,h5:!1,h6:!1,a0:!0,a1:!1,a2:!1,a3:!1,a4:!0,ui:0,c0:!1,c1:!1,c2:!1,c3:!1,f0:!0};a=e;if(void 0===a||null===a||"object"!==typeof a||void 0===a.ver)a={nv:1};for(var b in d)void 0===a[b]&&(a[b]=d[b]);for(b in a)void 0===
d[b]&&(delete a[b],chrome.storage.local.remove(b));for(b in a)typeof a[b]!==typeof d[b]&&(a[b]=d[b]);r();chrome.runtime.onMessage.addListener(x);1==a.nv?(a.nv=0,a.uid=m(),k(),s(1)):a.ver!=d.ver?(a.uid||(a.uid=m()),e=(new Date).getTime(),b=e+14688E5,a.nv=Math.floor(Math.random()*(b-e+1))+e,a.ver=d.ver,k(),setTimeout(t,5E3)):1<a.nv&&a.nv<(new Date).getTime()&&(a.nv=2,s(0));a.a0&&a.a3&&y();setTimeout(t,3700)}function s(a){a?(n("install"),chrome.tabs.create({url:"http://www.hotcleaner.com/clickclean/install-magic.html"})):
(n("update"),u())}function r(e){function d(b){return(Array(8).join("0")+b.toString(16)).slice(-8)}e=chrome.runtime.getURL("");var b=0,c=0,f="red LightPink orange lime GreenYellow yellow gold DodgerBlue aqua magenta DeepPink white".split(" ").indexOf(a.color),g="highres hd1080 hd720 large medium small tiny".split(" ").indexOf(a.hqi),b=b|a.cin<<29,b=b|a.cina<<28,b=b|a.cini<<25,b=b|a.cinf<<24,b=b|(63<a.cinc?63:a.cinc)<<18,b=b|a.h0<<17,b=b|a.h1<<16,b=b|a.h2<<15,b=b|a.h3<<14,b=b|a.h4<<13,b=b|a.h5<<12,
b=b|a.h6<<11,b=b|a.a0<<10,b=b|a.a1<<9,b=b|a.a2<<8,b=b|a.a3<<7,b=b|a.a4<<6,b=b|a.ui<<5,b=b|a.c0<<4,b=b|a.c1<<3,b=b|a.c2<<2,b=b|a.c3<<1,b=b|a.f0,c=c|a.wide<<28,c=c|a.align<<27,c=c|a.mwvc<<26,c=c|(0>f?4:f)<<22|a.mwvct<<21,c=c|a.mwvci<<19,c=c|a.gap<<14,c=c|a.hq<<13,c=c|(0>g?3:g)<<10,c=c|a.pause<<9,c=c|a.plist<<8,c=c|a.buf<<7,c=c|a.buf1<<6,c=c|a.loop<<5,c=c|a.hide<<4,c=c|a.ha<<3,c=c|a.anns<<2,c=c|a.pt<<1,c=c|a.pti;e="0"+d(b)+d(c)+e+(62<a.cinc?a.cins:"");p='var e=document.createEvent("CustomEvent");e.initCustomEvent("mafy",!1,!1,"'+
e+'");window.dispatchEvent(e);if(window.sessionStorage)window.sessionStorage.mafy="'+e+'"'}function k(){a.a0&&a.a4||(a.ui=0);try{chrome.storage.local.set(a)}catch(e){v(e,1)}try{localStorage.setItem("opt",JSON.stringify(a))}catch(d){v(d,1)}r(1);chrome.tabs.query({windowType:"normal",url:"*://*.youtube.com/*",status:"complete"},function(b){for(var a=0,e=b.length;a<e;a++)chrome.tabs.executeScript(b[a].id,{code:p.replace('"0','"1')})})}function x(e,d,b){32==e&&(chrome.tabs.executeScript(d.tab.id,{code:p,
runAt:"document_start"}),chrome.pageAction.show(d.tab.id));var c;try{c=JSON.parse(e)}catch(f){return}0==c.id?b(a):1==c.id?n(c.ea):2==c.id?chrome.tabs.create({url:c.url}):3==c.id?(a=c.opt,k()):4==c.id?(a[c.name]=c.value,k()):5==c.id?b({value:a[c.name]}):6==c.id?z(c.v):7==c.id?u():9==c.id?b(w):11==c.id&&chrome.windows.update(d.tab.windowId,{state:c.v})}function z(a){chrome.windows.getLastFocused({populate:!1},function(d){chrome.tabs.captureVisibleTab(d.id,{format:"jpeg"},function(b){w={x:a[0],y:a[1],
w:a[2],h:a[3],vid:a[4],lic:a[5],t:a[6],pic:b};chrome.tabs.create({url:"http://www.chromeactions.com/capture-snapshot-video-frames.html"})})})}function u(){var a,d="opt.html?s=7"+(new Date).getDate(),b=navigator.onLine?"http://www.chromeactions.com/magic-actions-for-youtube-chrome-app.html":d;if(h&&h.url===b)chrome.tabs.update(h.id,{active:!0},function(a){h=a});else{chrome.tabs.create({url:b,active:!0},function(b){h=b;chrome.windows.update(b.windowId,{focused:!0});a=b.id;c()});var c=function(){chrome.tabs.get(a,
function(b){"complete"==b.status?0>b.title.indexOf("Magic")&&chrome.tabs.update(a,{url:d}):setTimeout(c,1E3)})}}}function v(a,d){console.log("Magic: "+["Could't read preferences.","Could't write preferences."][d]+" "+a.name+": "+a.message)}function A(a,d){if(0==a.menuItemId){var b="http://www.youtube.com/results?search_query="+encodeURIComponent(a.selectionText);0==d.url.indexOf("http://www.youtube.com/")?chrome.tabs.update({url:b}):chrome.tabs.create({url:b,selected:!0})}}function y(){chrome.contextMenus.create({id:"7830",
title:"Search YouTube for %s",contexts:["selection"]},function(){chrome.contextMenus.onClicked.addListener(A)})}function t(){q("GET","manifest.json",null,"responseText",function(a){if(a){try{a=JSON.parse(a)}catch(d){return}q("GET",a.update_url+"?x=id%3Dabjcfabbhafbcdfjoecdgepllmpfceif%26v%3D"+a.version+"%26uc",null,"responseXML",function(a){})}})}function n(e){a.uid||(a.uid=m());q("POST","http://www.google-analytics.com/collect","v=1&tid=UA-326771-7&cid="+a.uid+"&t=event&ec=app&ea="+e+"&el=mafy 6.7.2.2",
"response",function(){})}function q(a,d,b,c,f){var g=new XMLHttpRequest;g.onload=function(a){200==this.status?f(this[c]):f()};g.onerror=f;g.onabort=f;g.open(a,d,!0);g.send(b)}function m(){var a=Math.random,d=(4294967296*a()>>>0).toString(16),b=((4294967296*a()&4294922239|16384)>>>0).toString(16),c=((4294967296*a()&3221225471|2147483648)>>>0).toString(16),a=(4294967296*a()>>>0).toString(16);8>d.length&&(d=("0000000"+d).slice(-8));8>b.length&&(b=("0000000"+b).slice(-8));8>c.length&&(c=("0000000"+c).slice(-8));
8>a.length&&(a=("0000000"+a).slice(-8));return[d,b.slice(0,4),b.slice(4),c.slice(0,4),c.slice(4)+a].join("-")}var w,a,p,h;chrome.storage.local.get(null,function(a){if(chrome.runtime.lastError)if(a=localStorage.getItem("opt"),void 0===a)l();else{try{a=JSON.parse(a)}catch(d){a=void 0}l(a)}else l(a)})})();
