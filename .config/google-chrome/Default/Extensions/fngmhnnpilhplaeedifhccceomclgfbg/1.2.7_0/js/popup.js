var url;var currentTabID;var isTabIncognito=false;var cookieList=new Array();var newCookie=false;var pasteCookie=false;var isSeparateWindow=false;var createAccordionCallback,createAccordionCallbackArguments;var scrollsave;jQuery(document).ready(function(){++data.nPopupClicked;start()});function start(){setLoaderVisible(true);resizeCommandsFontSize();var b=getUrlVars();if(b.url==undefined){chrome.tabs.getSelected(null,function(d){url=d.url;currentTabID=d.id;var c=new Filter();c.setUrl(url);createList(c.getFilter());document.title=document.title+"-"+url})}else{isSeparateWindow=true;url=decodeURI(b.url);currentTabID=parseInt(decodeURI(b.id));isTabIncognito=decodeURI(b.incognito)=="true";var a=new Filter();a.setUrl(url);createList(a.getFilter());document.title=document.title+"-"+url}}function submit(a){if(newCookie){submitNew(a)}else{if(pasteCookie){importCookies()}else{submitAll(a)}}}function submitAll(a){var c=$(".cookie","#cookiesList");var b=0;c.each(function(){var j=$(".index",$(this)).val();var e=$(".name",$(this)).val();var m=$(".value",$(this)).val();var h=$(".domain",$(this)).val();var f=$(".hostOnly",$(this)).prop("checked");var p=$(".path",$(this)).val();var d=$(".secure",$(this)).prop("checked");var i=$(".httpOnly",$(this)).prop("checked");var l=$(".session",$(this)).prop("checked");var n=$(".storeId",$(this)).val();var o=$(".expiration",$(this)).scroller("getDate");var k=(o!=null)?o.getTime()/1000:(new Date().getTime())/1000;newCookie={};newCookie.url=url;newCookie.name=e.replace(";","").replace(",","");m=m.replace(";","");newCookie.value=m;newCookie.path=p;newCookie.storeId=n;if(!f){newCookie.domain=h}if(!l){newCookie.expirationDate=k}newCookie.secure=d;newCookie.httpOnly=i;var g=cookieList[j];if(!compareCookies(newCookie,g)){b++}deleteCookie(newCookie.url,newCookie.name,newCookie.storeId);chrome.cookies.set(newCookie)});data.nCookiesChanged+=b;if(preferences.refreshAfterSubmit){chrome.tabs.reload(a,{bypassCache:preferences.skipCacheRefresh})}location.reload(true)}function submitNew(){var d=$("#newCookie");var b=$(".name",d).val();var e=$(".domain",d).val();var c=$(".hostOnly",d).prop("checked");var i=$(".value",d).val();var a=$(".secure",d).prop("checked");var f=$(".httpOnly",d).prop("checked");var h=$(".session",d).prop("checked");var j=$(".expiration",d).scroller("getDate");var g=(j!=null)?j.getTime()/1000:(new Date().getTime())/1000;d={};d.url=url;d.name=b.replace(";","").replace(",","");i=i.replace(";","");d.value=i;d.path="/";if(!c){d.domain=e}if(!h){d.expirationDate=g}d.secure=a;d.httpOnly=f;deleteCookie(d.url,d.name,d.storeId);chrome.cookies.set(d);++data.nCookiesCreated;location.reload(true)}function createList(c){var a=[];if(c==null){c={}}var b={};if(c.url!=undefined){b.url=c.url}if(c.domain!=undefined){b.domain=c.domain}chrome.cookies.getAll(b,function(k){for(var h=0;h<k.length;h++){var f=k[h];if(c.name!=undefined&&f.name.toLowerCase().indexOf(c.name.toLowerCase())==-1){continue}if(c.domain!=undefined&&f.domain.toLowerCase().indexOf(c.domain.toLowerCase())==-1){continue}if(c.secure!=undefined&&f.secure.toLowerCase().indexOf(c.secure.toLowerCase())==-1){continue}if(c.session!=undefined&&f.session.toLowerCase().indexOf(c.session.toLowerCase())==-1){continue}for(var d=0;d<data.readOnly.length;d++){try{var g=data.readOnly[d];if(g.name==f.name&&g.domain==f.domain){f.isProtected=true;break}}catch(j){console.error(j.message);delete data.readOnly[d]}}a.push(f)}cookieList=a;if(cookieList.length==0){$("#noCookies").show();setEvents();setLoaderVisible(false);return}$("#noCookies").hide();cookieList.sort(function(l,i){if(preferences.sortCookiesType=="domain_alpha"){var e=l.domain.toLowerCase().localeCompare(i.domain.toLowerCase());if(e){return e}}return l.name.toLowerCase().localeCompare(i.name.toLowerCase())});createAccordionList(cookieList,function(){if(!isSeparateWindow){$("#submitDiv").css({bottom:0})}else{$("#submitDiv").addClass("submitDivSepWindow")}setEvents();$("input:checkbox").uniform();setLoaderVisible(false)})})}function createAccordionList(d,l,j){createAccordionCallback=l;createAccordionCallbackArguments=j;try{$("#cookiesList").accordion("destroy")}catch(k){console.warn(k.message)}$("#cookiesList").empty();if(d==null){d=cookieList}for(var g=0;g<d.length;g++){currentC=d[g];var a="";if(preferences.showDomain){a=currentC.domain;if(preferences.showDomainBeforeName){a=a+" | "}else{a=" | "+a}}var m;if(preferences.showDomainBeforeName){m=$("<p/>").text(a).append($("<b/>").text(currentC.name))}else{m=$("<p/>").append($("<b/>").text(currentC.name)).append($("<span/>").text(a))}var f=$("<h3/>").addClass(currentC.name).append($("<a/>").html(m.html()).attr("href","#"));var c=$(".cookie_details_template").clone().removeClass("cookie_details_template");c.addClass(currentC.name);$(".index",c).val(g);$(".name",c).val(currentC.name);$(".value",c).val(currentC.value);$(".domain",c).val(currentC.domain);$(".path",c).val(currentC.path);$(".storeId",c).val(currentC.storeId);if(currentC.isProtected){$(".unprotected",c).hide()}else{$(".protected",c).hide()}if(currentC.hostOnly){$(".domain",c).attr("disabled","disabled");$(".hostOnly",c).prop("checked",true)}if(currentC.secure){$(".secure",c).prop("checked",true)}if(currentC.httpOnly){$(".httpOnly",c).prop("checked",true)}if(currentC.session){$(".expiration",c).attr("disabled","disabled");$(".session",c).prop("checked",true)}var b=new Date();var h;if(currentC.session){h=new Date();h.setFullYear(h.getFullYear()+1)}else{h=new Date(currentC.expirationDate*1000)}$(".expiration",c).val(h);$("#cookiesList").append(f);$("#cookiesList").append(c)}$("#cookiesList").accordion({autoHeight:false,collapsible:true,active:d.length-1,create:function(e,i){if(createAccordionCallback!=undefined){createAccordionCallback(createAccordionCallbackArguments)}}})}function importCookies(){var f=0;var j=$(".value","#pasteCookie").val();var b=$(".error","#pasteCookie");b.hide();b.text("For format reference export cookies in JSON");b.html(b.html()+"<br> Also check&nbsp;<a href='http://developer.chrome.com/extensions/cookies.html#type-Cookie' target='_blank'>Developer Chrome Cookie</a><br>Error:");try{var a=$.parseJSON(j);if(Object.prototype.toString.apply(a)==="[object Object]"){a=[a]}for(var d=0;d<a.length;d++){try{var h=a[d];var c=cookieForCreationFromFullCookie(h);chrome.cookies.set(c);f++}catch(g){b.html(b.html()+"<br>"+$("<div/>").text("Cookie number "+d).html()+"<br>"+$("<div/>").text(g.message).html());console.error(g.message);b.fadeIn();return}}}catch(g){b.html(b.html()+"<br>"+$("<div/>").text(g.message).html());console.error(g.message);b.fadeIn();return}data.nCookiesImported+=f;location.reload(true);return}function setEvents(){$("#submitButton").button().unbind().click(function(){submit(currentTabID)});if(cookieList.length>0){$("#submitDiv").show()}$("#submitFiltersButton").button();$("#submitFiltersDiv").unbind().click(function(){var k=$(".filterDomain:checked",$(this).parent()).val()!=null;var e=$("#filterByDomain",$(this).parent()).text();var h=$(".filterName:checked",$(this).parent()).val()!=null;var a=$("#filterByName",$(this).parent()).text();var d=$(".filterValue:checked",$(this).parent()).val()!=null;var l=$("#filterByValue",$(this).parent()).text();var c={};if(k){c.domain=e}if(h){c.name=a}if(d){c.value=l}var b=0;for(var g=0;g<cookieList.length;g++){var f=cookieList[g];if(f.isProtected){continue}if(!filterMatchesCookie(c,f.name,f.domain,f.value)){continue}deleteCookie(url,f.name,f.storeId);b++;cookieList.splice(g,1);g--}data.nCookiesFlagged+=b;var j=addBlockRule(c);location.reload(true);return});$("#deleteAllButton").unbind().click(function(){if(cookieList.length==0){return false}var a=function(){nCookiesDeletedThisTime=cookieList.length;deleteAll(cookieList,url);data.nCookiesDeleted+=nCookiesDeletedThisTime;location.reload(true)};startAlertDialog(_getMessage("Alert_deleteAll"),a,function(){})});if(preferences.showFlagAndDeleteAll){$("#flagAllButton").show();$("#flagAllButton").unbind().click(function(){if(cookieList.length==0){return false}var a=function(){nCookiesFlaggedThisTime=cookieList.length;for(var c=0;c<cookieList.length;c++){var b=cookieList[c];if(b.isProtected){continue}var d={};d.domain=b.domain;d.name=b.name;addBlockRule(d);deleteCookie(url,b.name,b.storeId)}data.nCookiesFlagged+=nCookiesFlaggedThisTime;location.reload(true);return};startAlertDialog(_getMessage("flagAll"),a,function(){})})}else{$("#flagAllButton").hide()}$("#copyButton").attr("title",preferences.copyCookiesType);$("#refreshButton").unbind().click(function(){location.reload(true)});$("#addCookieButton").unbind().click(function(){$("#addCookieButton").fadeOut("fast",function(){$("#backToList").fadeIn("fast")});$("#cookieFilter").slideUp();$("#submitFiltersButton").slideUp();$("#cookiesList").slideUp("fast");$("#pasteCookie").slideUp("fast");$("#newCookie").slideDown("fast");$("#submitDiv").show();$("#newCookie input.name").focus();newCookie=true;pasteCookie=false});$("#backToList").unbind().click(function(){$("#backToList").fadeOut("fast",function(){$("#addCookieButton").fadeIn("fast")});$("#cookieFilter").slideUp();$("#submitFiltersButton").slideUp();$("#newCookie").slideUp("fast");$("#pasteCookie").slideUp("fast");$("#cookiesList").slideDown("fast");if(cookieList.length==0){$("#submitDiv").hide()}else{$("#submitDiv").show()}newCookie=false;pasteCookie=false});$("#clearNew").unbind().click(function(){clearNewCookieData()});$("#optionsButton").unbind().click(function(){chrome.tabs.getAllInWindow(null,function a(c){var e=chrome.extension.getURL("options_pages/support.html");var e=chrome.extension.getURL("options_main_page.html");for(var b=0;b<c.length;b++){var d=c[b];if(d.url.indexOf(e)==0){chrome.tabs.update(d.id,{selected:true});return}}chrome.tabs.create({url:e})})});$("#copyButton").unbind().click(function(){copyToClipboard(cookiesToString.get(cookieList,url));data.nCookiesExported+=cookieList.length;$("#copiedToast").fadeIn(function(){setTimeout(function(){$("#copiedToast").fadeOut()},2500)});$(this).animate({backgroundColor:"#B3FFBD"},300,function(){$(this).animate({backgroundColor:"#EDEDED"},500)})});$("#pasteButton").unbind().click(function(){$("#addCookieButton").fadeOut("fast",function(){$("#backToList").fadeIn("fast")});$("#cookieFilter").slideUp();$("#submitFiltersButton").slideUp();$("#cookiesList").slideUp("fast");$("#newCookie").slideUp("fast");$("#pasteCookie").slideDown("fast");$(".value","#pasteCookie").focus();$("#submitDiv").show();newCookie=false;pasteCookie=true});$("#searchButton").unbind().click(function(){$("#searchField").focus();$("#searchField").fadeIn("normal",function(){$("#searchField").focus()});$("#searchField").focus()});$("#searchBox").unbind().focusout(function(){$("#searchField").fadeOut()});$("#searchField").unbind().keyup(function(){find($(this).val())});clearNewCookieData();$(".toast").each(function(){$(this).css("margin-top","-"+($(this).height()/2)+"px");$(this).css("margin-left","-"+($(this).width()/2)+"px")});setCookieEvents()}function setCookieEvents(){$(".hostOnly").click(function(){var b=$(this).closest(".cookie");var c=$(this).prop("checked");if(!!c){$(".domain",b).attr("disabled","disabled")}else{$(".domain",b).removeAttr("disabled")}});$(".session").click(function(){var b=$(this).closest(".cookie");var c=$(this).prop("checked");if(!!c){$(".expiration",b).attr("disabled","disabled")}else{$(".expiration",b).removeAttr("disabled")}});$(".deleteOne").click(function(){var d=$(this).closest(".cookie");var c=$(".name",d).val();var b=$(".storeId",d).val();var e=function(){deleteCookie(url,c,b);++data.nCookiesDeleted;location.reload(true)};startAlertDialog(_getMessage("Alert_deleteCookie")+': "'+c+'"?',e,function(){})});$(".flagOne").click(function(){var c=$(this).closest(".cookie");var e=$(".domain",c).val();var b=$(".name",c).val();var d=$(".value",c).val();$("#filterByDomain","#cookieFilter").text(e);$("#filterByName","#cookieFilter").text(b);$("#filterByValue","#cookieFilter").text(d);$("#addCookieButton").fadeOut("fast",function(){$("#backToList").fadeIn("fast")});$("#newCookie").hide();$("#submitDiv").hide();$("#pasteCookie").hide();$("#cookiesList").slideUp("fast");$("#cookieFilter").slideDown("fast");$("#submitFiltersButton").slideDown("fast")});$(".protectOne").click(function(){var c=$(this).closest(".cookie");var b=$(".index",c).val();isProtected=switchReadOnlyRule(cookieList[b]);cookieList[b].isProtected=isProtected;if(isProtected){$(".unprotected",c).fadeOut("fast",function(){$(".protected",c).fadeIn("fast")})}else{$(".protected",c).fadeOut("fast",function(){$(".unprotected",c).fadeIn("fast")})}});var a=new Date();$(".expiration").scroller({preset:"datetime",minDate:new Date(a.getFullYear(),a.getMonth(),a.getDate()),maxDate:new Date(2050,a.getMonth(),a.getDate()),dateFormat:"dd/mm/yy",timeFormat:"hh:ii A",theme:"android-ics light",display:"modal",mode:"clickpick"});$(".expiration").each(function(){$(this).scroller("setDate",new Date($(this).val()),true)});$("#show").click(function(){var b=$(this).closest(".cookie");scrollsave=$("body").scrollTop();$("html").scrollTop(0);$(".expiration",b).scroller("show");return false});$("#clear").click(function(){var b=$(this).closest(".cookie");$(".expiration",b).val("");$("body").scrollTop(scrollsave);return false});$(".domain",$("#newCookie")).val(getHost(url))}function startAlertDialog(c,b,a){if(b!=undefined){if(!preferences.showAlerts){b();return}$("#alert_ok").unbind().click(function(){$("#alert_wrapper").hide();b()})}else{return}if(a!=undefined){$("#alert_cancel").show();$("#alert_cancel").unbind().click(function(){$("#alert_wrapper").hide();a()})}else{$("#alert_cancel").hide()}$("#alert_title_p").empty().text(c);$("#alert_wrapper").show(100,function(){})}function clearNewCookieData(){var a=new Date();a.setFullYear(a.getFullYear()+1);$(".expiration","#newCookie").attr("value",a)}var lastInput="";function find(b){if(b==lastInput){return}lastInput=b;var a=0;$($(".cookie","#cookiesList").get().reverse()).each(function(){var d=$(".name",$(this)).val();var e=$(this);var c=$(this).prev();if(b!=""&&d.toLowerCase().indexOf(b.toLowerCase())!=-1){c.addClass("searchResult");e.detach();c.detach();$("#cookiesList").prepend(e);$("#cookiesList").prepend(c)}else{c.removeClass("searchResult")}});$("#cookiesList").accordion("option","collapsible","true");$("#cookiesList").accordion("option","active",cookieList.length)}function resizeCommandsFontSize(){var d=0;var a=0;var c=parseInt($("body").width(),10)+1;var b=0;var e=null;$(".commands-table").each(function(){if(e==null||$(this).width()>d){d=$(this).width();e=$(this)}});b=$(e).height();e=$(e).clone();$(e).attr("id","hidden-commands-resizer").hide().appendTo(document.body);a=parseInt(e.css("font-size"),10);while(e.width()<c&&e.height()<=b&&a<15){e.css("font-size",++a)}if(e.height()>b){--a}$(".commands-table").css("font-size",a);$(e).detach()};