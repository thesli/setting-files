
(function(){Registry.require("prepare");var b=Registry.get("prepare").FEATURES;
var a=false;var e=true;var d=1000;var c=null;var g=b.PINGPONG.RETRIES;
var f=function(k,i){var h=function(){if(c!=null){window.clearTimeout(c)
}c=null};var l=function(){h();if(g-->0){if(a){console.log("pp: ping timed out! retries: "+g)
}f(k,i);return}if(i){i()}};var j=function(o){if(!o){if(e||a){console.log("pp: Warn: got pseudo response!")
}return}if(a){console.log("pp: ping succed! @"+o.instanceID)
}h();k()};var m={method:"ping"};try{chrome.extension.sendMessage(m,j)
}catch(n){}c=window.setTimeout(l,d)};Registry.register("pingpong","3630.77",{ping:f})
})();