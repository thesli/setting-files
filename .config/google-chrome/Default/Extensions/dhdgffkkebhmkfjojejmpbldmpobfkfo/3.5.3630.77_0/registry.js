
(function(){var b;var a=false;var d=false;var c={objects:{},versions:{},raw_objects:{},callbacks:[],loading:0,init:function(){},onLoad:function(){var e=c.callbacks.pop();
if(e){e()}},checkLoading:function(){var e=false;for(var f in c.objects){if(!c.objects.hasOwnProperty(f)){continue
}if(c.objects[f]===null){e=true;break}}if(!e){c.onLoad()
}},verify:function(g){var e=[];for(var f in c.versions){if(!c.versions.hasOwnProperty(f)){continue
}if(c.versions[f].length>3&&c.versions[f].substr(0,3)==="###"){console.debug("Registry.verify: development version detected @ "+f)
}else{if(c.versions[f]!==g){console.warn("Registry.verify: expected version "+g+" and detected "+c.versions[f]+" @ "+f);
e.push({name:f,version:c.versions[f],expected:g})}}}return e
},register:function(g,e,h,f){if(d||a||b){console.log("Registry.register "+g+" overwrite: "+f)
}if(!c.objects[g]||f){c.versions[g]=e;c.objects[g]=h;
c.checkLoading()}},registerRaw:function(g,e,h,f){if(d||a||b){console.log("Registry.registerRaw "+g+" overwrite: "+f)
}if(!c.raw_objects[g]||f){c.versions[g]=e;c.raw_objects[g]=h
}},require:function(e){if(d||a||b){console.log("Registry.require "+e)
}if(c.objects[e]===undefined){console.log("Error: need "+e+".js");
c.objects[e]=null;c.loadFile(e+".js")}},getRaw:function(g){if(d||a||b){console.log("Registry.getRaw "+g)
}var h=null;if(c.raw_objects[g]!==undefined){h=c.raw_objects[g]
}else{var f=chrome.extension.getURL(g);try{var j=new XMLHttpRequest();
j.open("GET",f,false);j.send(null);h=j.responseText;
if(!h){console.log("WARN: content of "+g+" is null!")
}}catch(i){console.log("getRawContent "+i)}}return h
},loadFile:function(f,i){if(a||b){console.log("Registry.loadFile "+f)
}try{if(i){var h=c.getRaw(f);i(h)}else{var g=document.createElement("script");
g.setAttribute("src",chrome.extension.getURL(f));(document.head||document.body||document.documentElement||document).appendChild(g)
}}catch(j){console.log("Error: Registry.load "+f+" failed! "+j.message)
}},get:function(e){if(a||b){console.log("Registry.get "+e)
}var f=c.objects[e];if(f===undefined){if(a||b){console.log("Error: Registry.get "+e+" wasn't required or found!")
}}return f},addLoadHandler:function(e){c.callbacks.push(e)
}};window.setTimeout(c.init,1);window.Registry=c})();