
var sendMessage=function(b,a){b.origin="options";chrome.extension.sendMessage(b,a)
};Registry.require(["layout","curtain","i18n"],function(){var e=Registry.get("curtain");
var b=Registry.get("i18n");var d=Registry.get("layout");
var a=function(){if(confirm(b.getOriginalMessage("An_internal_error_occured_Do_you_want_to_visit_the_forum_"))){window.location.href="http://tampermonkey.net/bug"
}};var c=function(){e.wait(b.getMessage("Please_wait___"))
};d.init("options.js",{suc:c,fail:a})});