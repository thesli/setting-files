
(function(){Registry.require("helper");Registry.require("convert");
Registry.require("compat");var f=Registry.get("convert");
var e=Registry.get("helper");var b=Registry.get("compat");
var d=function(i){var k=null;var i=encodeURI(i);var j=i.match(/[a-zA-Z0-9]/g);
if(j){k=j.join("")}else{k=e.filter(f.Base64.encode(i),/[a-zA-Z0-9]/g)
}return k};var c=function(){this.observers=[];this.icon=null;
this.icon64=null;this.fileURL=null;this.downloadURL=null;
this.updateURL=null;this.name=null;this.namespace=null;
this.homepage=null;this.description=null;this.system=false;
this.enabled=true;this.position=0;this.grant=[];this.requires=[];
this.includes=[];this.matches=[];this.excludes=[];this.resources=[];
this.lastUpdated=0;this.lastModified=0;this.sync={imported:false},this.options={comment:null,compatopts_for_requires:true,compat_wrappedjsobject:false,compat_metadata:false,compat_foreach:false,compat_arrayleft:false,compat_prototypes:false,compat_uW_gmonkey:false,compat_forvarin:false,noframes:null,awareOfChrome:false,run_at:"",user_agent:"",override:{includes:false,merge_includes:true,use_includes:[],orig_includes:[],matches:false,merge_matches:true,use_matches:[],orig_matches:[],excludes:false,merge_excludes:true,use_excludes:[],orig_excludes:[]}}
};var h="==UserScript==";var a="==/UserScript==";var g={Script:c,getScriptId:d,processMetaHeader:function(l){var k={};
var i=["uso:hash","version","name"];l=l.replace(/\'/gi,"").replace(/\"/gi,"");
l=l.replace(/\t/gi,"    ");l=l.replace(/\r/gi,"");for(var j in i){k[i[j]]=e.getStringBetweenTags(l,"@"+i[j],"\n").trim()
}if(V||UV){console.log("parser: processMetaHeader -> "+JSON.stringify(k))
}return k},processHeader:function(u){var w=new c();
var B=["name","namespace","version","author","copyright","description"];
var p=["iconURL","defaulticon","icon"];var m=["icon64URL","icon64"];
var x=["homepageURL","homepage","website","source"];
u=u.replace(/\'/g,"").replace(/\"/g,"");u=u.replace(/\t/g,"    ");
u=u.replace(/\r/g,"\n");u=u.replace(/\n\n+/g,"\n");
u=u.replace(/[^|\n][ \t]+\/\//g,"//");var A,y,q,n,v,k,z=u.split("\n");
for(q in z){n=z[q].replace(/^[\t\s]*\/\//gi,"").replace(/^[\t\s]*/gi,"").replace(/\s\s+/gi," ");
v=false;for(var y in B){var j=new RegExp("^@"+B[y]+"[\\t\\s]");
if(n.search(j)!=-1){w[B[y]]=w[B[y]]||e.getStringBetweenTags(n,"@"+B[y]).trim();
continue}}for(y in m){A=e.getStringBetweenTags(n,"@"+m[y]).trim();
if(A!=""){w.icon64=w.icon64||A;v=true;break}}if(v){continue
}for(y in p){A=e.getStringBetweenTags(n,"@"+p[y]).trim();
if(A!=""){w.icon=w.icon||A;v=true;break}}if(v){continue
}for(y in x){A=e.getStringBetweenTags(n,"@"+x[y]).trim();
if(A!=""){w.homepage=w.homepage||A;v=true;break}}if(v){continue
}if(n.search(/^@include[\t\s]/)!=-1){v=n.replace(/^@include/gi,"").trim().replace(/ /gi,"%20").replace(/[\b\r\n]/gi,"");
if(V){console.log("c "+v)}if(v.trim()!=""){w.includes.push(v)
}}if(n.search(/^@match[\t\s]/)!=-1){v=n.replace(/^@match/gi,"").trim().replace(/ /gi,"%20").replace(/[ \b\r\n]/gi,"");
if(V){console.log("c "+v)}if(v.trim()!=""){w.matches.push(v)
}w.options.awareOfChrome=true}if(n.search(/^@exclude[\t\s]/)!=-1){v=n.replace(/^@exclude/gi,"").trim().replace(/ /gi,"%20").replace(/[ \b\r\n]/gi,"");
if(V){console.log("c "+v)}if(v.trim()!=""){w.excludes.push(v)
}}if(n.search(/^@require[\t\s]/)!=-1){v=n.replace(/^@require/gi,"").trim().replace(/ /gi,"%20").replace(/[ \b\r\n]/gi,"");
if(V){console.log("c "+v)}k={url:v,loaded:false,textContent:""};
if(v.trim()!=""){w.requires.push(k)}}if(n.search(/^@resource[\t\s]/)!=-1){v=n.replace(/^@resource/gi,"").replace(/[\r\n]/gi,"");
A=v.trim().split(" ");if(V){console.log("c "+v)}if(V){console.log("s "+A)
}if(A.length>=2){w.resources.push({name:A[0],url:A[1],loaded:false})
}}if(n.search(/^@run-at[\t\s]/)!=-1){v=n.replace(/^@run-at/gi,"").replace(/[ \b\r\n]/gi,"");
if(V){console.log("c "+v)}if(v.trim()!=""){w.options.run_at=w.options.run_at||v.trim()
}}if(n.search(/^@user-agent[\t\s]/)!=-1){v=n.replace(/^@user-agent/gi,"").trim().replace(/[\r\n]/gi,"");
if(V){console.log("c "+v)}if(v.trim()!=""){w.options.user_agent=w.options.user_agent||v.trim()
}}if(n.search(/^@noframes[\t\s\r\n]?/)!=-1){w.options.noframes=true
}if(n.search(/^@nocompat[\t\s\r\n]?/)!=-1){w.options.awareOfChrome=true
}if(n.search(/^@updateURL[\t\s]/)!=-1){v=n.replace(/^@updateURL/gi,"").trim().replace(/[ \b\r\n]/gi,"");
if(v.trim()!=""){w.updateURL=w.updateURL||v}}if(n.search(/^@downloadURL[\t\s]/)!=-1){v=n.replace(/^@downloadURL/gi,"").trim().replace(/[ \b\r\n]/gi,"");
if(v.trim()!=""){w.downloadURL=w.downloadURL||v}}if(n.search(/^@grant[\t\s]/)!=-1){v=n.replace(/^@grant/gi,"").trim().replace(/[\b\r\n]/gi,"");
if(V){console.log("c "+v)}if(v.trim()!=""){w.grant.push(v)
}}}if(w.name){w.id=d(w.name);if(D){console.log("parser: script "+w.name+" got id "+w.id)
}}if(!w.version){w.version="0.0"}return w},getHeaderTags:function(){return{start:h,stop:a}
},getHeader:function(m){var o=e.getStringBetweenTags(m,h,a);
if(!o||o==""){return null}var j="<html>";var i="<body>";
var n=m.search(h);var l=m.search(j);var k=m.search(i);
if((l>0&&l<n)||(k>0&&k<n)){return null}return o},createScriptFromSrc:function(j){j=j.replace(/(\r\n|\n|\r)/gm,"\n");
var k=g.getHeader(j);if(!k){return{}}var i=g.processHeader(k);
i.textContent=j;i.header=k;if(!i.options.awareOfChrome){i.options.compat_wrappedjsobject=(j!=b.unWrappedJsObjectify(j));
i.options.compat_metadata=(j!=b.unMetaDataify(j));i.options.compat_foreach=(j!=b.unEachify(j));
i.options.compat_arrayleft=(j!=b.unArrayOnLeftSideify(j));
i.options.compat_prototypes=b.findPrototypes(j)}if(j.search("unsafeWindow.gmonkey")!=-1){i.options.compat_uW_gmonkey=true
}return i}};Registry.register("parser","3630.77",g)
})();