
var V=true;var D=true;var sendMessage=function(b,a){b.origin="action";
chrome.extension.sendMessage(b,a)};Registry.require(["layout","i18n"],function(){var h=Registry.get("curtain");
var e=Registry.get("i18n");var f=Registry.get("layout");
var g=null;var d=null;var b=function(){if(g){window.clearTimeout(g)
}g=null;if(d){d.parentNode.removeChild(d)}d=null};var a=function(){d=document.createElement("img");
d.setAttribute("src","images/large-loading.gif");document.getElementById("action").appendChild(d)
};var c=function(){b();if(confirm(e.getMessage("An_internal_error_occured_Do_you_want_to_visit_the_forum_"))){window.open("http://tampermonkey.net/bug")
}};g=window.setTimeout(a,500);f.init("action.js",{suc:b,fail:c})
});