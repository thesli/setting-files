// Extension for Chrome Browser - Magic Actions for YouTube™ - CHROMEACTIONS.COM - Copyright 2013 Vlad and Serge Strukoff - All Rights Reserved
(function(){function k(a){var e={ver:"6.7.0",nv:0,mwvc:!0,color:"yellow",mwvct:0,mwvci:2,gap:10,hq:!0,hqi:"large",pause:!1,plist:!1,buf:!1,buf1:!1,loop:!1,hide:!1,ha:!1,anns:!0,cin:!0,cina:!1,cini:1,cinf:!1,cinc:0,cins:"",pt:!1,pti:0,align:!1,wide:!1,h0:!1,h1:!1,h2:!1,h3:!1,h4:!1,h5:!1,h6:!1,a0:!0,a1:!1,a2:!1,a3:!1,a4:!0,ui:0,c0:!1,c2:!1,c3:!1,f0:!0,gp:0};b=a;if(void 0===b||null===b||"object"!==typeof b||void 0===b.ver)b={nv:1};for(var c in e)void 0===b[c]&&(b[c]=e[c]);for(c in b)void 0===e[c]&&(delete b[c],
chrome.storage.local.remove(c));for(c in b)typeof b[c]!==typeof e[c]&&(b[c]=e[c]);chrome.runtime.onMessage.addListener(s);1==b.nv?(b.nv=0,h(),l(1)):b.ver!==e.ver?(a=(new Date).getTime(),c=a+1728E6,b.nv=Math.floor(Math.random()*(c-a+1))+a,b.ver=e.ver,h(),setTimeout(m,3E3)):1<b.nv&&b.nv<(new Date).getTime()&&(b.nv=2,l(0));b.a0&&b.a3&&t();setTimeout(m,6E4)}function l(a){a?chrome.tabs.create({url:"http://www.hotcleaner.com/clickclean/install-magic.html"}):n()}function h(){b.a0&&b.a4||(b.ui=0);try{chrome.storage.local.set(b)}catch(a){p(a,
1)}try{localStorage.setItem("opt",JSON.stringify(b))}catch(e){p(e,1)}chrome.tabs.query({windowType:"normal"},function(a){for(var d,e=0,g=a.length;e<g;e++)d=a[e],0<d.url.indexOf(".youtube.com/")&&chrome.tabs.sendMessage(d.id,{id:50,opt:b})})}function s(a,e,c){var d;try{d=JSON.parse(a)}catch(w){return}0==d.id?c(b):1==d.id?chrome.pageAction.show(e.tab.id):2==d.id?chrome.tabs.create({url:d.url}):3==d.id?(b=d.opt,h()):4==d.id?(b[d.name]=d.value,h()):5==d.id?c({value:b[d.name]}):6==d.id?u(d.v):7==d.id?
n():9==d.id&&c(q)}function u(a){chrome.windows.getLastFocused({populate:!1},function(b){chrome.tabs.captureVisibleTab(b.id,{format:"jpeg"},function(b){q={x:a[0],y:a[1],w:a[2],h:a[3],vid:a[4],lic:a[5],t:a[6],pic:b};chrome.tabs.create({url:"http://www.chromeactions.com/capture-snapshot-video-frames.html"})})})}function n(){var a,b="opt.html?s=7"+(new Date).getDate(),c=navigator.onLine?"http://www.chromeactions.com/magic-actions-for-youtube-chrome-app.html":b;if(f&&f.url===c)chrome.tabs.update(f.id,
{active:!0},function(a){f=a});else{chrome.tabs.create({url:c,active:!0},function(b){f=b;chrome.windows.update(b.windowId,{focused:!0});a=b.id;d()});var d=function(){chrome.tabs.get(a,function(c){"complete"==c.status?0>c.title.indexOf("Magic")&&chrome.tabs.update(a,{url:b}):setTimeout(d,1E3)})}}}function p(a,b){console.log("Magic: "+["Could't read preferences.","Could't write preferences."][b]+" "+a.name+": "+a.message)}function v(a,b){if(0==a.menuItemId){var c="http://www.youtube.com/results?search_query="+
encodeURIComponent(a.selectionText);0==b.url.indexOf("http://www.youtube.com/")?chrome.tabs.update({url:c}):chrome.tabs.create({url:c,selected:!0})}}function t(){chrome.contextMenus.create({id:"0",title:"Search YouTube for %s",contexts:["selection"]},function(){chrome.contextMenus.onClicked.addListener(v)})}function m(){r("GET","manifest.json",null,"responseText",function(a){if(a){try{a=JSON.parse(a)}catch(b){return}r("GET",a.update_url+"?x=id%3Dabjcfabbhafbcdfjoecdgepllmpfceif%26v%3D"+a.version+
"%26uc",null,"responseXML",function(a){})}})}function r(a,b,c,d,f){var g=new XMLHttpRequest;g.onload=function(a){200==this.status?f(this[d]):f()};g.onerror=f;g.onabort=f;g.open(a,b,!0);g.send(c)}var q,b,f;chrome.storage.local.get(null,function(a){if(chrome.runtime.lastError)if(a=localStorage.getItem("opt"),void 0===a)k();else{try{a=JSON.parse(a)}catch(b){a=void 0}k(a)}else k(a)})})();
