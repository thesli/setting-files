
(function(){Registry.require("helper",function(){var a=Registry.get("helper");
var b=function(e,f,h,d,g){return c(e,null,f,h,d,g)};
var c=function(q,o,d,h,j,i){try{var m=q+"_"+a.createUniqueId(d,h);
if(j!=undefined){m+="_"+j}var n=document.getElementById(m);
if(n&&i){var l=document.createElement(q);l.setAttribute("id",m);
var g=n.parentNode;g.insertBefore(l,n);g.removeChild(n);
n=l}else{if(n){n.inserted=true}else{n=document.createElement(q);
n.setAttribute("id",m)}}if(o){n.setAttribute("class",o)
}if(!n.__removeChild){n.__removeChild=n.removeChild;
n.removeChild=function(e){delete e.inserted;n.__removeChild(e)
}}if(!n.__appendChild){n.__appendChild=n.appendChild;
n.appendChild=function(e,f){if(!e.parentNode&&!e.inserted||f){n.__appendChild(e)
}}}if(!n.__insertBefore){n.__insertBefore=n.insertBefore;
n.insertBefore=function(f,e){if(!f.parentNode&&!f.inserted){n.__insertBefore(f,e)
}}}}catch(k){console.log("options: Error:"+k.message)
}return n};Registry.register("crcrc","3737.6",{cr:b,crc:c})
})})();