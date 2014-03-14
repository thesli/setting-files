
(function(){Registry.require("helper");var e=Registry.get("helper");
var a={};var c=function(h){var g=e.isLocalImage(h);
return(h&&h.length>4&&h.substr(0,4)=="http")||g};var f={"user-agent":true,referer:true,origin:true,host:true,"proxy-connection":true,"accept-encoding":true,"accept-charset":true};
var b=function(t,x,j){if(x===undefined){x={}}if(j===undefined){j={}
}if(window.chrome!=undefined&&window.chrome.xmlHttpRequest!=undefined){window.chrome.xmlHttpRequest(t,x,j);
return}var s=function(z,p){if(x[z]){x[z](typeof p=="function"?p():p)
}};var v=function(z,p){if(x[z]){s(z,p);x[z]=null}};
var m=!(x.onload||x.onreadychange||x.onprogress||x.onerr||x.ondone||x.ontimeout);
var y=new XMLHttpRequest();var q=function(){var p="";
var A=t.url;if(y.readyState>2){p=y.getAllResponseHeaders();
if(y.readyState==4){if(p){p=p.replace(/TM-finalURL\: .*[\r\n]{1,2}/,"")
}var B=y.getResponseHeader("TM-finalURL");if(B){A=B
}}}var z={readyState:y.readyState,responseHeaders:p,finalUrl:A,status:(y.readyState==4?y.status:0),statusText:(y.readyState==4?y.statusText:"")};
if(y.readyState==4){if(!y.responseType||y.responseType==""){z.responseXML=(y.responseXML?escape(y.responseXML):null);
z.responseText=y.responseText;z.response=y.response
}else{z.responseXML=null;z.responseText=null;z.response=y.response
}}else{z.responseXML=null;z.responseText="";z.response=null
}return z};var w=function(){var p=q();if(p.readyState==4&&p.status!=200&&p.status!=0&&t.retries>0){t.retries--;
b(t,x,j);return}s("onload",p);if(p.readyState==4){v("ondone")
}};var g=function(){var p=q();if(p.readyState==4&&p.status!=200&&p.status!=0&&t.retries>0){t.retries--;
b(t,x,j);return}v("onerr",p);v("onload",p);v("ondone");
delete y};var k=function(F,C,E){if(E===undefined){E={}
}try{var z=null;var B=null;if(F.lengthComputable||F.totalSize>0){z=F.position||F.loaded;
B=F.totalSize||F.total}else{var A=Number(e.getStringBetweenTags(C.responseHeaders.toLowerCase(),"content-length:","\n").trim());
var p=y.responseText?y.responseText.length:0;if(A==0){A=-1
}z=F.position||F.loaded||p;B=F.totalSize||F.total||A
}E.lengthComputable=F.lengthComputable;E.loaded=z;E.done=z;
E.total=B;E.totalSize=B}catch(D){}return E};var n=function(p){s("onreadychange",function(){var z=q();
z.progress=k(p,z);return z})};var h=function(p){s("onprogress",function(){var z=q();
return k(p,z,z)})};var l=function(p){v("ontimeout");
v("ondone")};if(!m){y.onload=w;y.onerror=g;y.ontimeout=l;
y.onprogress=h;y.onreadystatechange=n}try{if(!j.internal&&!c(t.url)){throw new Error("Invalid scheme of url: "+t.url)
}y.open(t.method,t.url,!m,t.user,t.password);if(t.headers){for(var i in t.headers){var r=i;
if(a.use&&f[i.toLowerCase()]){r=a.prefix+i}y.setRequestHeader(r,t.headers[i])
}}if(typeof(t.overrideMimeType)!=="undefined"){y.overrideMimeType(t.overrideMimeType)
}if(typeof(t.responseType)!=="undefined"){y.responseType=t.responseType
}if(typeof(t.timeout)!=="undefined"){y.timeout=t.timeout
}if(typeof(t.data)!=="undefined"){y.send(t.data)}else{y.send()
}}catch(u){console.log("xhr: error: "+u.message);var o={responseXML:"",responseText:"",response:null,readyState:4,responseHeaders:"",status:403,statusText:"Forbidden"};
v("onerr",o);v("onload",o);v("ondone");if(m){return o
}}if(m){return q()}};var d=function(g){a=g};Registry.register("xmlhttprequest","3737.6",{run:b,setWebRequest:d})
})();