
(function(){var g=undefined;var a="display: none;";
var n=undefined;var d="position:absolute; left: -20000px; top: -200000px; width: 1px; height: 1px;";
var c="http://userscripts.org/images/script_icon.png";
var l=function(w,y){var x=(w!=undefined)?w.replace(/ /g,"_"):"null";
return x+"_"+y};var i=function(z,y,x){var w=z.search(p(y));
if(w==-1){return""}if(!x){return z.substr(w+y.length)
}var A=z.substr(w+y.length).search(p(x));if(A==-1){return""
}return z.substr(w+y.length,A)};var j=function(y,w){if(w==undefined){w=[]
}var x=new RegExp("(\\"+["/",".","+","?","|","(",")","[","]","{","}","\\"].concat(w).join("|\\")+")","g");
return y.replace(x,"\\$1")};var p=function(x,w){return j(x,["*"])
};var s=function(x){var y="background.js";var w=chrome.extension.getURL(y);
w=w.replace(y,"")+"images/";return(x.length>=w.length&&w==x.substr(0,w.length))
};var e=function(){var C={};var z=window.location.search.replace(/^\?/,"");
if(!z){z=window.location.hash.replace(/^#/,"")}var w=z.split("&");
var B;for(var x=0;x<w.length;x++){B=w[x].split("=");
if(B.length!=2){var A=B[0];var y=B.slice(1).join("=");
B=[A,y]}C[B[0]]=decodeURIComponent(B[1])}return C};
var b=function(x){var w=function(){alert(x)};window.setTimeout(w,1)
};var u=function(y,w){var x=function(){var z=confirm(y);
w(z)};window.setTimeout(x,1)};var f=function(w){return({}).toString.apply(w).match(/\s([a-z|A-Z]+)/)[1]
};var r=function(w,A){var z=f(w);if(z==="Array"||z==="NodeList"){for(var B=0;
B<w.length;B++){if(A(w[B],B)===false){return}}}else{if(z==="XPathResult"){var y=w.iterateNext();
while(y){if(A(y)===false){return}y=w.iterateNext()}}else{for(var x in w){if(!w.hasOwnProperty(x)){continue
}if(A(w[x],x)===false){return}}}}};var o=function(y){var x="";
for(var w in y){if(!y.hasOwnProperty(w)){continue}if(x!=""){x+=","
}if(f(y[w])=="Object"){x+=w+":"+o(y[w])}else{if(y[w]===undefined){x+=w+":undefined"
}else{if(y[w]===null){x+=w+":null"}else{if(f(y[w])=="Function"){x+=w+":"+y[w].toString()
}else{x+=w+':"'+y[w].toString()+'"'}}}}}return"{"+x+"}"
};var v=function(w){return w.replace(/(?:&#x([a-fA-F0-9]+);|&#([0-9]+);)/g,function(z,y,x){if(y){return String.fromCharCode(parseInt(y,16))
}else{return String.fromCharCode(parseInt(x,10))}})
};var h=function(w){return w.replace(/[\u00A0-\u2666]/g,function(x){return"&#"+x.charCodeAt(0)+";"
})};var m=function(w){if(document.body){return document.body.innerText
}else{if(w.childNodes.length>0){return m(w.childNodes[w.childNodes.length-1])
}else{return w.innerText}}};var t=function(x){var y=(new Date()).getTime();
while((new Date()).getTime()-y<x){for(var w=0;w<100;
w++){}}};var k=function(x,w){return(!x||!w)?"":(x.match(w)||[]).join("")
};var q={objs:{},push:function(w,y){if(y!==0&&y!==1){y=0
}var x=Math.floor(Math.random()*6121983+1);q.objs[x]={fn:w,prio:y};
return x},remove:function(w){delete q.objs[w]},get:function(){var x=[];
for(var y=0;y<=1;y++){for(var w in q.objs){if(!q.objs.hasOwnProperty(w)){continue
}if(q.objs[w].prio===y){x.push(q.objs[w].fn)}}}return x
},finalize:function(){var x=q.get();for(var w=0;w<x.length;
w++){x[w]()}}};Registry.register("helper","3630.77",{createUniqueId:l,getStringBetweenTags:i,escapeForRegExpURL:j,escapeForRegExp:p,isLocalImage:s,getUrlArgs:e,getSource:m,alert:b,confirm:u,serialize:o,filter:k,toType:f,forEach:r,clean:q,sleep:t,decodeHtml:v,encodeHtml:h,staticVars:{visible:g,invisible:a,visible_move:n,invisible_move:d,USOicon:c}})
})();