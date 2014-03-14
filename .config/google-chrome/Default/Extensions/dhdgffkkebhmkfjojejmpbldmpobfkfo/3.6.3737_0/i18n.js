
(function(){Registry.require(["helper"],function(){var c={};
var i=null;var d=Registry.get("helper");var e=function(n){var l=n;
var k=Array.prototype.slice.call(arguments,1);if(k.length==1&&d.toType(k[0])==="Array"){k=k[0]
}var o=new RegExp("_0[a-zA-Z].*0");for(var m=0;m<k.length;
k++){if(l.search(o)==-1){console.log("getMessage(): wrong argument count!!!");
break}l=l.replace(o," "+k[m])}return l.replace(/_/g," ")
};var g=function(t,p){var l=t.message;var q=false;if(p.length==1&&d.toType(p[0])==="Array"){p=p[0];
q=true}for(var n in t.placeholders){try{var u=Number(t.placeholders[n].content.replace(/^\$/,""))-1;
var s;if(u<p.length){s=q?p:p[u];l=l.replace("$"+n+"$",s)
}else{console.log("i18n: invalid argument count on processing '"+l+"' with args "+JSON.stringify(p))
}}catch(r){console.log("i18n: error processing '"+l+"' with args "+JSON.stringify(p))
}}return l};var j=function(k){var l=chrome.i18n.getMessage.apply(this,arguments);
if(l){return l}else{return e.apply(this,arguments)}};
var h=function(k){return a.apply(this,arguments)};var a=function(k){if(!i){return j.apply(this,arguments)
}else{var l=c[k];if(l){return g(l,Array.prototype.slice.call(arguments,1))
}else{return e.apply(this,arguments)}}};var b=function(){return i
};var f=function(l){if(l==="null"){l=null}if(i==l){return true
}if(l){var k="_locales/"+l+"/messages.json";var n=Registry.getRaw(k);
if(n){try{c=JSON.parse(n);i=l;return true}catch(m){console.log("i18n: parsing locale "+l+" failed!")
}}else{console.log("i18n: retrieving locale "+l+" failed!")
}return false}else{c={};i=null;return true}};Registry.register("i18n","3737.6",{getMessage:h,getOriginalMessage:j,getLocale:b,setLocale:f})
})})();