function setValue(a,b){localStorage.removeItem(a);localStorage.setItem(a,b)}function getValue(a){return localStorage.getItem(a)}function clearValue(a){return localStorage.removeItem(a)}function toggleValue(a){if(getValue(a)==1||getValue(a)==0){localStorage.setItem(a,((-1)*parseInt(getValue(a)))+1)}else{localStorage.setItem(a,1)}}function show_message(c,a,b){$("#message").stop();$("#message").html(c).fadeIn(50).animate({opacity:"1"},1000,function(){if(a!==true){$("#message").fadeOut(500)}else{if(!b){b=5000}setTimeout(function(){$("#message").hide(100)},b)}})}function i18n(a){return chrome.i18n.getMessage(a)}function hide_message(a){if(!a){a=200}$("#message").stop().fadeOut(a)}if(localStorage.firstTime!="false"){setValue("options.fontstyle","font-weight:normal;font-style:normal;");setValue("options.sidebar.showApps","1");setValue("options.fontsize","11");setValue("options.colors.bg","FFFFFF");setValue("options.colors.dialbg","FFFFFF");setValue("options.colors.dialbgover","FFFFFF");setValue("options.colors.dialbginner","FFFFFF");setValue("options.colors.dialbginnerover","FFFFFF");setValue("options.colors.border","CCCCCC");setValue("options.colors.borderover","999999");setValue("options.colors.title","8C7E7E");setValue("options.colors.titleover","333333");setValue("options.padding","4");setValue("options.dialstyle.corners","4");setValue("options.dialstyle.shadow","glow");setValue("options.dialstyle.titleposition","bottom");setValue("options.background","images/themes/light/background_top.jpg");setValue("options.backgroundPattern","images/themes/light/background_strip.jpg");setValue("options.backgroundPosition","right top");setValue("options.backgroundSize","original");setValue("options.repeatbackground","repeat-x");setValue("options.showOptionsButton","1")}var defaults={"options.fontface":'Helvetica,"Helvetica Nueue";arial,sans-serif',"options.colors.dialbginner":"FFFFFF","options.colors.dialbginnerover":"FFFFFF","options.defaultGroupName":"Home","options.defaultGroupColor":"#FFF","options.refreshThumbnails":"0","options.dialstyle.shadow":"paper","options.dialstyle.titleposition":"bottom","options.dialSpace":"90","options.dialspacing":"24","options.sidebar.showApps":"0","options.apps.show":"0","options.apps.position":"bottom","options.apps.theme":"dark","options.apps.align":"center","options.apps.iconsize":"medium","options.columns":"4","options.order":"position","options.showVisits":"1","options.highlight":"0","options.sidebar":"1","options.sidebaractivation":"position","options.showTitle":"1","options.backgroundPosition":"left top","options.useDeliciousShortcut":0,"options.centerThumbnailsVertically":1,"options.centerVertically":1,"options.sidebar.showHistory":1,"options.sidebar.showBookmarks":0,"options.sidebar.showBookmarksURL":0,"options.sidebar.showDelicious":0,"options.thumbnailQuality":"medium","options.showAddButton":1,"options.showContextMenu":1,"options.titleAlign":"center","options.alwaysNewTab":0,"options.dialstyle.corners":"4","options.scrollLayout":"1","options.backgroundSize":"original","options.padding":"4","push.read":0,"push.last":Math.round(new Date().getTime()/1000)};for(value in defaults){if(!getValue(value)||getValue(value)=="undefined"){setValue(value,defaults[value])}}localStorage.removeItem("_TMP_opened_tabs");localStorage.removeItem("ClosedTabs");localStorage.removeItem("options.showFavicon");localStorage.removeItem("addPageFromContextMenu");localStorage.removeItem("lastdeleted");localStorage.removeItem("v152");localStorage.removeItem("v153");localStorage.removeItem("v1550");localStorage.removeItem("v1565");localStorage.removeItem("v1570");localStorage.removeItem("v1573");localStorage.removeItem("v1573a");localStorage.removeItem("v1590");if(getValue("options.background")=="themes/light/background_top.jpg"){setValue("options.background","images/themes/light/background_top.jpg")}if(getValue("options.backgroundPattern")=="themes/light/background_strip.jpg"){setValue("options.backgroundPattern","images/themes/light/background_strip.jpg")};