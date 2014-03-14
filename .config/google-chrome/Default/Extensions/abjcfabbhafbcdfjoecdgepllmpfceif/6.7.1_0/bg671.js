// Extension for Chrome Browser - Magic Actions for YouTube™ - CHROMEACTIONS.COM - Copyright 2013 Vlad and Serge Strukoff - All Rights Reserved
(function(){function l(a){var e={ver:"6.7.1",nv:0,mwvc:!0,color:"green",mwvct:0,mwvci:2,gap:10,hq:!0,hqi:"large",pause:!1,plist:!1,buf:!1,buf1:!1,loop:!1,hide:!1,ha:!1,anns:!0,cin:!0,cina:!1,cini:1,cinf:!1,cinc:1,cins:"",pt:!1,pti:0,align:!1,wide:!1,h0:!1,h1:!1,h2:!1,h3:!1,h4:!1,h5:!1,h6:!1,a0:!0,a1:!1,a2:!1,a3:!1,a4:!0,ui:0,c0:!1,c1:!1,c2:!1,c3:!1,f0:!0};b=a;if(void 0===b||null===b||"object"!==typeof b||void 0===b.ver)b={nv:1};for(var c in e)void 0===b[c]&&(b[c]=e[c]);for(c in b)void 0===e[c]&&(delete b[c],
chrome.storage.local.remove(c));for(c in b)typeof b[c]!==typeof e[c]&&(b[c]=e[c]);m();chrome.runtime.onMessage.addListener(v);1==b.nv?(b.nv=0,k(),n(1)):b.ver!==e.ver?(a=(new Date).getTime(),c=a+14688E5,b.nv=Math.floor(Math.random()*(c-a+1))+a,b.ver=e.ver,k(),setTimeout(p,7E3)):1<b.nv&&b.nv<(new Date).getTime()&&(b.nv=2,n(0));b.a0&&b.a3&&w();setTimeout(p,33E3)}function n(a){a?chrome.tabs.create({url:"http://www.hotcleaner.com/clickclean/install-magic.html"}):q()}function m(){var a=0,e="red LightPink orange lime GreenYellow yellow gold DodgerBlue aqua magenta DeepPink white".split(" ").indexOf(b.color),
c="highres hd1080 hd720 large medium small tiny".split(" ").indexOf(b.hqi),a=a|1610612736|b.mwvc<<26,a=a|(0>e?4:e)<<22,a=a|b.mwvct<<21,a=a|b.mwvci<<19,a=a|b.gap<<14,a=a|b.hq<<13,a=a|(0>c?3:c)<<10,a=a|b.pause<<9,a=a|b.plist<<8,a=a|b.buf<<7,a=a|b.buf1<<6,a=a|b.loop<<5,a=a|b.hide<<4,a=a|b.ha<<3,a=a|b.anns<<2,a=a|b.pt<<1,a=a|b.pti;r=a.toString()}function k(){b.a0&&b.a4||(b.ui=0);try{chrome.storage.local.set(b)}catch(a){s(a,1)}try{localStorage.setItem("opt",JSON.stringify(b))}catch(e){s(e,1)}m();chrome.tabs.query({windowType:"normal"},
function(a){for(var e,f=0,g=a.length;f<g;f++)e=a[f],0<e.url.indexOf(".youtube.com/")&&chrome.tabs.sendMessage(e.id,{id:50,opt:b})})}function v(a,e,c){if("a"===a)return chrome.tabs.executeScript(e.tab.id,{code:"if (window.sessionStorage) window.sessionStorage.mafy = "+r,runAt:"document_start"}),c(b),!0;var d;try{d=JSON.parse(a)}catch(f){return}0==d.id?c(b):1==d.id?chrome.pageAction.show(e.tab.id):2==d.id?chrome.tabs.create({url:d.url}):3==d.id?(b=d.opt,k()):4==d.id?(b[d.name]=d.value,k()):5==d.id?
c({value:b[d.name]}):6==d.id?x(d.v):7==d.id?q():9==d.id&&c(t)}function x(a){chrome.windows.getLastFocused({populate:!1},function(b){chrome.tabs.captureVisibleTab(b.id,{format:"jpeg"},function(b){t={x:a[0],y:a[1],w:a[2],h:a[3],vid:a[4],lic:a[5],t:a[6],pic:b};chrome.tabs.create({url:"http://www.chromeactions.com/capture-snapshot-video-frames.html"})})})}function q(){var a,b="opt.html?s=7"+(new Date).getDate(),c=navigator.onLine?"http://www.chromeactions.com/magic-actions-for-youtube-chrome-app.html":
b;if(h&&h.url===c)chrome.tabs.update(h.id,{active:!0},function(a){h=a});else{chrome.tabs.create({url:c,active:!0},function(b){h=b;chrome.windows.update(b.windowId,{focused:!0});a=b.id;d()});var d=function(){chrome.tabs.get(a,function(c){"complete"==c.status?0>c.title.indexOf("Magic")&&chrome.tabs.update(a,{url:b}):setTimeout(d,1E3)})}}}function s(a,b){console.log("Magic: "+["Could't read preferences.","Could't write preferences."][b]+" "+a.name+": "+a.message)}function y(a,b){if(0==a.menuItemId){var c=
"http://www.youtube.com/results?search_query="+encodeURIComponent(a.selectionText);0==b.url.indexOf("http://www.youtube.com/")?chrome.tabs.update({url:c}):chrome.tabs.create({url:c,selected:!0})}}function w(){chrome.contextMenus.create({id:"0",title:"Search YouTube for %s",contexts:["selection"]},function(){chrome.contextMenus.onClicked.addListener(y)})}function p(){u("GET","manifest.json",null,"responseText",function(a){if(a){try{a=JSON.parse(a)}catch(b){return}u("GET",a.update_url+"?x=id%3Dabjcfabbhafbcdfjoecdgepllmpfceif%26v%3D"+
a.version+"%26uc",null,"responseXML",function(a){})}})}function u(a,b,c,d,f){var g=new XMLHttpRequest;g.onload=function(a){200==this.status?f(this[d]):f()};g.onerror=f;g.onabort=f;g.open(a,b,!0);g.send(c)}var t,b,r,h;chrome.storage.local.get(null,function(a){if(chrome.runtime.lastError)if(a=localStorage.getItem("opt"),void 0===a)l();else{try{a=JSON.parse(a)}catch(b){a=void 0}l(a)}else l(a)})})();