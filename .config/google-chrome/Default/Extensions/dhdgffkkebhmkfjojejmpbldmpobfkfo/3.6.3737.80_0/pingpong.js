
(function(){Registry.require("prepare");var a=false;
var e=true;var b=Registry.prepare();var d=1000;var c=null;
var g;var f=function(k,i){var h=function(){if(c!=null){window.clearTimeout(c)
}c=null};var l=function(){h();if(g-->0){if(a){console.log("pp: ping timed out! retries: "+g)
}f(k,i);return}if(i){i()}};var j=function(o){if(!o){if(e||a){console.log("pp: Warn: got pseudo response!")
}return}if(a){console.log("pp: ping succed! @"+o.instanceID)
}h();k(o)};var m={method:"ping"};try{chrome.extension.sendMessage(m,j)
}catch(n){}c=window.setTimeout(l,d)};Registry.register("pingpong","3737.80",function(){g=b.PINGPONG.RETRIES;
return{ping:f}})})();