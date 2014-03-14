
Registry.require(["helper","convert","compat"],function(){var b=false;
var a=false;var e=Registry.get("convert");var f=Registry.get("helper");
var h=Registry.get("compat");var g=function(k){var m=null;
var k=encodeURI(k);var l=k.match(/[a-zA-Z0-9]/g);if(l){m=l.join("")
}else{m=f.filter(e.Base64.encode(k),/[a-zA-Z0-9]/g)
}return m};var j=function(){this.observers=[];this.icon=null;
this.icon64=null;this.fileURL=null;this.downloadURL=null;
this.updateURL=null;this.name=null;this.namespace=null;
this.homepage=null;this.description=null;this.system=false;
this.enabled=true;this.position=0;this.grant=[];this.requires=[];
this.includes=[];this.matches=[];this.excludes=[];this.resources=[];
this.lastUpdated=0;this.lastModified=0;this.sync={imported:false},this.options={comment:null,compatopts_for_requires:true,compat_wrappedjsobject:false,compat_metadata:false,compat_foreach:false,compat_arrayleft:false,compat_prototypes:false,compat_uW_gmonkey:false,compat_forvarin:false,noframes:null,awareOfChrome:false,run_at:"",user_agent:"",override:{includes:false,merge_includes:true,use_includes:[],orig_includes:[],matches:false,merge_matches:true,use_matches:[],orig_matches:[],excludes:false,merge_excludes:true,use_excludes:[],orig_excludes:[]}}
};var i="==UserScript==";var d="==/UserScript==";var c={Script:j,getScriptId:g,processMetaHeader:function(n){var m={};
var k=["uso:hash","version","name"];n=n.replace(/\'/gi,"").replace(/\"/gi,"");
n=n.replace(/\t/gi,"    ");n=n.replace(/\r/gi,"");for(var l in k){m[k[l]]=f.getStringBetweenTags(n,"@"+k[l],"\n").trim()
}if(b||UV){console.log("parser: processMetaHeader -> "+JSON.stringify(m))
}return m},processHeader:function(v){var x=new j();
var C=["name","namespace","version","author","copyright","description"];
var q=["iconURL","defaulticon","icon"];var n=["icon64URL","icon64"];
var y=["homepageURL","homepage","website","source"];
v=v.replace(/\'/g,"").replace(/\"/g,"");v=v.replace(/\t/g,"    ");
v=v.replace(/\r/g,"\n");v=v.replace(/\n\n+/g,"\n");
v=v.replace(/[^|\n][ \t]+\/\//g,"//");var B,z,u,p,w,m,A=v.split("\n");
for(u in A){p=A[u].replace(/^[\t\s]*\/\//gi,"").replace(/^[\t\s]*/gi,"").replace(/\s\s+/gi," ");
w=false;for(var z in C){var k=new RegExp("^@"+C[z]+"[\\t\\s]");
if(p.search(k)!=-1){x[C[z]]=x[C[z]]||f.getStringBetweenTags(p,"@"+C[z]).trim();
continue}}for(z in n){B=f.getStringBetweenTags(p,"@"+n[z]).trim();
if(B!=""){x.icon64=x.icon64||B;w=true;break}}if(w){continue
}for(z in q){B=f.getStringBetweenTags(p,"@"+q[z]).trim();
if(B!=""){x.icon=x.icon||B;w=true;break}}if(w){continue
}for(z in y){B=f.getStringBetweenTags(p,"@"+y[z]).trim();
if(B!=""){x.homepage=x.homepage||B;w=true;break}}if(w){continue
}if(p.search(/^@include[\t\s]/)!=-1){w=p.replace(/^@include/gi,"").trim().replace(/ /gi,"%20").replace(/[\b\r\n]/gi,"");
if(b){console.log("c "+w)}if(w.trim()!=""){x.includes.push(w)
}}if(p.search(/^@match[\t\s]/)!=-1){w=p.replace(/^@match/gi,"").trim().replace(/ /gi,"%20").replace(/[ \b\r\n]/gi,"");
if(b){console.log("c "+w)}if(w.trim()!=""){x.matches.push(w)
}x.options.awareOfChrome=true}if(p.search(/^@exclude[\t\s]/)!=-1){w=p.replace(/^@exclude/gi,"").trim().replace(/ /gi,"%20").replace(/[ \b\r\n]/gi,"");
if(b){console.log("c "+w)}if(w.trim()!=""){x.excludes.push(w)
}}if(p.search(/^@require[\t\s]/)!=-1){w=p.replace(/^@require/gi,"").trim().replace(/ /gi,"%20").replace(/[ \b\r\n]/gi,"");
if(b){console.log("c "+w)}m={url:w,loaded:false,textContent:""};
if(w.trim()!=""){x.requires.push(m)}}if(p.search(/^@resource[\t\s]/)!=-1){w=p.replace(/^@resource/gi,"").replace(/[\r\n]/gi,"");
B=w.trim().split(" ");if(b){console.log("c "+w)}if(b){console.log("s "+B)
}if(B.length>=2){x.resources.push({name:B[0],url:B[1],loaded:false})
}}if(p.search(/^@run-at[\t\s]/)!=-1){w=p.replace(/^@run-at/gi,"").replace(/[ \b\r\n]/gi,"");
if(b){console.log("c "+w)}if(w.trim()!=""){x.options.run_at=x.options.run_at||w.trim()
}}if(p.search(/^@user-agent[\t\s]/)!=-1){w=p.replace(/^@user-agent/gi,"").trim().replace(/[\r\n]/gi,"");
if(b){console.log("c "+w)}if(w.trim()!=""){x.options.user_agent=x.options.user_agent||w.trim()
}}if(p.search(/^@noframes[\t\s\r\n]?/)!=-1){x.options.noframes=true
}if(p.search(/^@nocompat[\t\s\r\n]?/)!=-1){x.options.awareOfChrome=true
}if(p.search(/^@updateURL[\t\s]/)!=-1){w=p.replace(/^@updateURL/gi,"").trim().replace(/[ \b\r\n]/gi,"");
if(w.trim()!=""){x.updateURL=x.updateURL||w}}if(p.search(/^@downloadURL[\t\s]/)!=-1){w=p.replace(/^@downloadURL/gi,"").trim().replace(/[ \b\r\n]/gi,"");
if(w.trim()!=""){x.downloadURL=x.downloadURL||w}}if(p.search(/^@grant[\t\s]/)!=-1){w=p.replace(/^@grant/gi,"").trim().replace(/[\b\r\n]/gi,"");
if(b){console.log("c "+w)}if(w.trim()!=""){x.grant.push(w)
}}}if(x.name){x.id=g(x.name);if(a){console.log("parser: script "+x.name+" got id "+x.id)
}}if(!x.version){x.version="0.0"}return x},getHeaderTags:function(){return{start:i,stop:d}
},getHeader:function(o){var q=f.getStringBetweenTags(o,i,d);
if(!q||q==""){return null}var l="<html>";var k="<body>";
var p=o.search(i);var n=o.search(l);var m=o.search(k);
if((n>0&&n<p)||(m>0&&m<p)){return null}return q},createScriptFromSrc:function(l){l=l.replace(/(\r\n|\n|\r)/gm,"\n");
var m=c.getHeader(l);if(!m){return{}}var k=c.processHeader(m);
k.textContent=l;k.header=m;if(!k.options.awareOfChrome){k.options.compat_wrappedjsobject=(l!=h.unWrappedJsObjectify(l));
k.options.compat_metadata=(l!=h.unMetaDataify(l));k.options.compat_foreach=(l!=h.unEachify(l));
k.options.compat_arrayleft=(l!=h.unArrayOnLeftSideify(l));
k.options.compat_prototypes=h.findPrototypes(l)}if(l.search("unsafeWindow.gmonkey")!=-1){k.options.compat_uW_gmonkey=true
}return k}};Registry.register("parser","3737.80",c)
});