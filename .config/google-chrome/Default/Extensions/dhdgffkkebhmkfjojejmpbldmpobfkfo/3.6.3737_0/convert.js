
(function(){var c={encode:function(e){return unescape(encodeURIComponent(e))
},decode:function(e){return decodeURIComponent(escape(e))
}};var b={encode:function(e){var g="";for(var f=0;f<e.length;
f++){g+=String.fromCharCode(e.charCodeAt(f)&255)}return window.btoa(g)
},decode:function(e){return atob(e)}};var d=32687;var a=function(h,k){try{var f=new Uint8Array(h);
var j="";for(var g=0;g<f.length;g+=d){j+=String.fromCharCode.apply(null,f.subarray(g,g+d))
}if(k=="UTF-8"){j=c.decode(j)}return j}catch(l){}return null
};Registry.register("convert","3737.6",{UTF8:c,Base64:b,encode:function(e){return escape(e)
},decode:function(e){return unescape(e)},encodeR:function(e){return e
},decodeR:function(e){return e},arrbuf2str:a})})();