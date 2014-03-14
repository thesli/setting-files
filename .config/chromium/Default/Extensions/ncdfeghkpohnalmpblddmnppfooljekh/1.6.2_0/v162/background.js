var rootBmId,MAJOR_VERSION=1.6,tabList={},rcTabs=[],contextMenuId=-1;try{rcTabs=JSON.parse(localStorage.recentlyClosedTabs||"[]")}catch(e$$5){console.error(e$$5)}
try{chrome.tabs.onUpdated.addListener(function(c,a,b){tabList[c]=b}),chrome.tabs.onAttached.addListener(function(c){chrome.tabs.get(c,function(a){tabList[c]=a})}),chrome.tabs.onRemoved.addListener(function(c,a){if(!a.isWindowClosing){var b=tabList[c];if(b){if(b.incognito||b.url=="chrome://newtab/"){delete tabList[c];return}rcTabs.push({URL:b.url,title:b.title,favIconURL:b.favIconUrl,pinned:b.pinned})}rcTabs.length>(localStorage.maxRecentlyClosed||30)&&rcTabs.shift();delete tabList[c];localStorage.recentlyClosedTabs=
JSON.stringify(rcTabs)}})}catch(e$$6){console.error("add listener fail",e$$6)}
function init(){contextMenuId=-1;try{chrome.permissions.contains({permissions:["topSites"],origins:["chrome://favicon/"]},function(a){localStorage.hasNewPermission=a})}catch(c){localStorage.hasNewPermission=!1}try{localStorage.maxRecentlyClosed&&(MAX_RECENTLY_CLOSED=localStorage.maxRecentlyClosed);var a,b=localStorage.wpData;a=b?JSON.parse(b):migrateImageData();if(a.source=="local"&&a.url)localStorage["local-file"]=a.url,delete a.url,delete localStorage["wpData-last"],localStorage.wpData=JSON.stringify(a)}catch(d){console.error("init fail 2",
d)}try{var e;if(!localStorage.updateread)localStorage.updateread=MAJOR_VERSION,e=!0;chrome.bookmarks.getTree(function(a){var b=a[0].children[1].id;chrome.bookmarks.getChildren(b,function(a){for(var c,d=chrome.extension.getURL("options.html"),f=0;f<a.length;++f)if(a[f].title=="Extension Settings"){rootBmId=a[f].id;setUpSyncBookmark();break}rootBmId?chrome.bookmarks.getChildren(rootBmId,function(a){for(var b=0;b<a.length;++b)if(a[b].url==d){c=a[b].id;break}c||(chrome.bookmarks.create({parentId:rootBmId,
title:"Incredible StartPage Settings",url:d}),e&&chrome.tabs.create({url:"http://blog.visibotech.com/2010/04/thank-you-for-installing-incredible.html"}))}):(chrome.bookmarks.create({parentId:b,title:"Extension Settings"},function(a){chrome.bookmarks.create({parentId:a.id,title:"Incredible StartPage Settings",url:d});rootBmId=a.id;setUpSyncBookmark()}),e&&chrome.tabs.create({url:"http://blog.visibotech.com/2010/04/thank-you-for-installing-incredible.html"}))});if(!localStorage.bookmarkBarId||localStorage.bookmarkBarId==
"0")localStorage.bookmarkBarId=a[0].children[0].id;toggleMenu()})}catch(f){console.error("init fail 3",f)}}
function migrateImageData(){console.log("migrateImageData");var c=localStorage.backgroundImgURL;c?c=="/img/default_background.jpg"?wpData={source:"default",url:"/img/default_background.jpg"}:localStorage.backgroundImgId!="000000"?wpData={source:"customURL",url:localStorage.backgroundImgURL}:localStorage.showWallpaperInGradient=="true"?(wpData={source:"gradient",from:localStorage.wallpaperColor1,to:localStorage.wallpaperColor2},delete localStorage.showWallpaperInGradient,delete localStorage.wallpaperColor1,
delete localStorage.wallpaperColor2):wpData={source:"customURL",url:localStorage.backgroundImgURL}:wpData={source:"default",url:"/img/default_background.jpg"};delete localStorage.backgroundImgURL;delete localStorage.backgroundImgId;delete localStorage.photoTheme;delete localStorage.imageIndex;localStorage.wpData=JSON.stringify(wpData);return wpData}var bookmarkNotepadContent,syncNotepadtitle="Incredible Startpage Notepad";
function onNoteChanged(){console.log("Notepad is changed");var c=localStorage.multiNotes;bookmarkNotepadContent!=c&&chrome.bookmarks.getChildren(rootBmId,function(a){chrome.bookmarks.create({url:"javascript:"+c,title:syncNotepadtitle,parentId:rootBmId},function(b){if(b)for(var c=0;c<a.length;c++)a[c].title==syncNotepadtitle&&b.id!=a[c].id&&(console.log("remove",a[c]),chrome.bookmarks.remove(a[c].id,function(){}))})})}
function hasBookmark(c){chrome.bookmarks.getChildren(rootBmId,function(a){for(var b=0;b<a.length;b++)if(a[b].title==syncNotepadtitle){c(a[b]);return}c(null)})}
function setUpSyncBookmark(c,a){var b;chrome.bookmarks.onCreated.removeListener(onCreatedHandler);localStorage.syncNotepad=="true"&&(chrome.bookmarks.onCreated.addListener(onCreatedHandler),chrome.bookmarks.getChildren(rootBmId,function(d){for(var e=0;e<d.length;e++)if(d[e].title==syncNotepadtitle&&(!b||b.dateAdded<d[e].dateAdded))b=d[e];!b||c&&!a?onNoteChanged():chrome.bookmarks.get(b.id,function(a){a&&onCreatedHandler(a[0].id,a[0])})}))}
function onCreatedHandler(c,a){console.log("onCreatedHandler",c,a);if(localStorage.syncNotepad=="true"&&a.parentId==rootBmId&&a.title==syncNotepadtitle){var b=decodeURIComponent(a.url.replace("javascript:",""));if(localStorage.multiNotes!=b){bookmarkNotepadContent=localStorage.multiNotes=b;try{var d=chrome.extension.getViews({type:"tab"});d.length>0&&d.forEach(function(a){console.log("refreshNote");a.renderSelectedNote()})}catch(e){console.error("updateAllViews",e)}}}}
function toggleMenu(){localStorage.enableAddLink=="true"&&contextMenuId==-1?contextMenuId=chrome.contextMenus.create({title:chrome.i18n.getMessage("addLink")||"Send tab/link to Startpage",contexts:["page","link"],onclick:function(c,a){var b=localStorage.bookmarkBarId;if(!(b<=0)){var d={};if(c.linkUrl){if(d={url:c.linkUrl,title:c.selectionText||c.linkUrl},c.favIconURL)d.favIconURL=c.favIconURL}else if(d={url:a.url,title:a.title},a.favIconURL)d.favIconURL=a.favIconURL;chrome.bookmarks.create({parentId:b,
title:d.title,url:d.url})}}}):contextMenuId>0&&(chrome.contextMenus.remove(contextMenuId),contextMenuId=-1)}init();