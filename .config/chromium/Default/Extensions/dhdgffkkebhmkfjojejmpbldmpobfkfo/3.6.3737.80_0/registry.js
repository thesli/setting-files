
(function(){var b=false;var a=false;var d=false;var c=(function(){var g=[];
var f=function(){var h=g;g=[];while(h.length){h.pop()()
}};var e={objects:{},versions:{},raw_objects:{},loading:0,init:function(){},verify:function(j){var h=[];
for(var i in e.versions){if(!e.versions.hasOwnProperty(i)){continue
}if(e.versions[i].length>3&&e.versions[i].substr(0,3)==="###"){console.debug("self.verify: development version detected @ "+i)
}else{if(e.versions[i]!==j){console.warn("self.verify: expected version "+j+" and detected "+e.versions[i]+" @ "+i);
h.push({name:i,version:e.versions[i],expected:j})}}}return h
},register:function(j,h,k,i){if(d||a||b){console.log("self.register "+j+" overwrite: "+i)
}if(!e.objects[j]||i){e.versions[j]=h;e.objects[j]=k;
f()}},registerRaw:function(j,h,k,i){if(d||a||b){console.log("self.registerRaw "+j+" overwrite: "+i)
}if(!e.raw_objects[j]||i){e.versions[j]=h;e.raw_objects[j]=k
}},require:function(m,h){if(d||a||b){console.log("self.require ",m)
}m=(typeof m==="string")?[m]:m;var k=1;var j=function(){return m.every(function(n){return !!e.objects[n]
})};var l=function(){if(a||b){console.log("self.require, deferred callback ",m,name,e.objects)
}g.push(function(){if(j()){h()}else{l()}})};var i=function(n){if(--k==0&&h){if(j()){h()
}else{l()}}};m.forEach(function(o){var n=function(){i(o)
};if(e.objects[o]===undefined){if(d||a||b){console.log("load "+o+".js")
}e.objects[o]=null;e.loadFile(o+".js",n);k++}});i()
},getRaw:function(i){if(d||a||b){console.log("self.getRaw "+i)
}var j=null;if(e.raw_objects[i]!==undefined){j=e.raw_objects[i]
}else{var h=chrome.extension.getURL(i);try{var l=new XMLHttpRequest();
l.open("GET",h,false);l.send(null);j=l.responseText;
if(!j){console.log("WARN: content of "+i+" is null!")
}}catch(k){console.log("getRawContent "+k)}}return j
},loadFile:function(i,h){if(a||b){console.log("self.loadFile "+i)
}try{var j=document.createElement("script");j.setAttribute("src",i);
j.onload=function(){if(h){h(i)}};(document.head||document.body||document.documentElement||document).appendChild(j)
}catch(k){console.log("Error: self.load "+i+" failed! "+k.message)
}},prepare:function(h){var i=e.get("prepare");if(h){i=i.PREPARED_FOR_BACKGROUND()
}return i},get:function(i){if(a||b){console.log("self.get "+i)
}var k,j=e.objects[i];if(typeof j==="function"){var h=Array.prototype.slice.call(arguments,1);
k=j.apply(this,h)}else{if(j){k=j}else{if(a||b){console.log("Error: self.get "+i+" wasn't required or found!")
}}}return k}};return e})();window.setTimeout(c.init,1);
window.Registry=c})();