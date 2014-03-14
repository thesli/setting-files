
(function(){var h=undefined;var a="display: none;";
var o=undefined;var d="position:absolute; left: -20000px; top: -200000px; width: 1px; height: 1px;";
var c="http://userscripts.org/images/script_icon.png";
var m=function(x,z){var y=(x!=undefined)?x.replace(/ /g,"_"):"null";
return y+"_"+z};var j=function(A,z,y){var x=A.search(q(z));
if(x==-1){return""}if(!y){return A.substr(x+z.length)
}var B=A.substr(x+z.length).search(q(y));if(B==-1){return""
}return A.substr(x+z.length,B)};var k=function(z,x){if(x==undefined){x=[]
}var y=new RegExp("(\\"+["/",".","+","?","|","(",")","[","]","{","}","\\"].concat(x).join("|\\")+")","g");
return z.replace(y,"\\$1")};var q=function(y,x){return k(y,["*"])
};var t=function(y){var z="background.js";var x=chrome.extension.getURL(z);
x=x.replace(z,"")+"images/";return(y.length>=x.length&&x==y.substr(0,x.length))
};var e=function(){var D={};var A=window.location.search.replace(/^\?/,"");
if(!A){A=window.location.hash.replace(/^#/,"")}var x=A.split("&");
var C;for(var y=0;y<x.length;y++){C=x[y].split("=");
if(C.length!=2){var B=C[0];var z=C.slice(1).join("=");
C=[B,z]}D[C[0]]=decodeURIComponent(C[1])}return D};
var b=function(y){var x=function(){alert(y)};window.setTimeout(x,1)
};var v=function(z,x){var y=function(){var A=confirm(z);
x(A)};window.setTimeout(y,1)};var g=function(x){return({}).toString.apply(x).match(/\s([a-z|A-Z]+)/)[1]
};var s=function(x,B){var A=g(x);if(A==="Array"||A==="NodeList"){for(var C=0;
C<x.length;C++){if(B(x[C],C)===false){return}}}else{if(A==="XPathResult"){var z=x.iterateNext();
while(z){if(B(z)===false){return}z=x.iterateNext()}}else{for(var y in x){if(!x.hasOwnProperty(y)){continue
}if(B(x[y],y)===false){return}}}}};var p=function(z){var y="";
for(var x in z){if(!z.hasOwnProperty(x)){continue}if(y!=""){y+=","
}if(g(z[x])=="Object"){y+=x+":"+p(z[x])}else{if(z[x]===undefined){y+=x+":undefined"
}else{if(z[x]===null){y+=x+":null"}else{if(g(z[x])=="Function"){y+=x+":"+z[x].toString()
}else{y+=x+':"'+z[x].toString()+'"'}}}}}return"{"+y+"}"
};var w=function(x){return x.replace(/(?:&#x([a-fA-F0-9]+);|&#([0-9]+);)/g,function(A,z,y){if(z){return String.fromCharCode(parseInt(z,16))
}else{return String.fromCharCode(parseInt(y,10))}})
};var i=function(x){return x.replace(/[\u00A0-\u2666]/g,function(y){return"&#"+y.charCodeAt(0)+";"
})};var n=function(x){if(document.body){return document.body.innerText
}else{if(x.childNodes.length>0){return n(x.childNodes[x.childNodes.length-1])
}else{return x.innerText}}};var u=function(y){var z=(new Date()).getTime();
while((new Date()).getTime()-z<y){for(var x=0;x<100;
x++){}}};var l=function(y,x){return(!y||!x)?"":(y.match(x)||[]).join("")
};var r=(function(){var x={objs:{},push:function(y,A){if(A!==0&&A!==1){A=0
}var z=Math.floor(Math.random()*6121983+1);x.objs[z]={fn:y,prio:A};
return z},remove:function(y){delete x.objs[y]},get:function(){var z=[];
for(var A=0;A<=1;A++){for(var y in x.objs){if(!x.objs.hasOwnProperty(y)){continue
}if(x.objs[y].prio===A){z.push(x.objs[y].fn)}}}return z
},finalize:function(B){if(B===undefined){var A=x.get();
for(var y=0;y<A.length;y++){A[y]()}}else{var z;if(x.objs[B]){z=x.objs[B].fn();
delete x.objs[B]}return z}}};return x})();var f=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(z){var y=Math.random()*16|0,x=z=="x"?y:(y&3|8);
return x.toString(16)})};Registry.register("helper","3737.6",{createUniqueId:m,getStringBetweenTags:j,escapeForRegExpURL:k,escapeForRegExp:q,isLocalImage:t,getUrlArgs:e,getSource:n,alert:b,confirm:v,serialize:p,filter:l,toType:g,forEach:s,clean:r,sleep:u,createUUID:f,decodeHtml:w,encodeHtml:i,staticVars:{visible:h,invisible:a,visible_move:o,invisible_move:d,USOicon:c}})
})();