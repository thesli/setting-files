
(function(){Registry.require("prepare",function(){var e=Registry.prepare();
var i=null;var a=null;var d="manifest.json";var c="script.js";
var b=function(k){try{var l=new XMLHttpRequest();l.open("GET",k,false);
l.send(null);return l.responseText||null}catch(j){}return
};var f=function(m,j,l,k){if(k===undefined){k=d}return[i,m,"/",j,"_",l,"/",k].join("")
};var g=function(o,j){for(var m,k=0;k<4;k++){m=f(o,j,k);
try{var n=b(m);if(n&&JSON.parse(n)){return k}}catch(l){}}console.log("import: unable to load ",i);
return -1};var h={setPath:function(j){if(j){a=null;
i=["file://",j.replace(/^file:\/\//,"").split(e.SELF.ID)[0].replace(/[\\\/]$/,""),"/"].join("")
}else{a=false;i=null}},isPathValid:function(){if(a!==null){return a
}a=(-1!=g(e.SELF.ID,chrome.extension.getVersion()));
return a},getAll:function(j){try{chrome.management.getAll(j)
}catch(k){j([])}},getAllUserscripts:function(j){var k=function(o){var m=[];
for(var l in o){if(!o.hasOwnProperty(l)){continue}var n=o[l];
if(n.homepageUrl==""&&n.hostPermissions.length==0&&n.permissions.length==0&&!n.icons&&!n.updateUrl&&n.isApp==false&&n.optionsUrl==""&&n.mayDisable==true){n.icon="chrome://extension-icon/"+n.id+"/48/1";
m.push(n)}}if(j){j(m)}};chrome.management.getAll(k)
},getUserscriptByName:function(k,j){var l=function(o){for(var m=0;
m<o.length;m++){var n=o[m];if(n.name==k){j(n);return
}}j(null)};this.getAllUserscripts(l)},getUserscriptById:function(l,j){var k=function(o){for(var m=0;
m<o.length;m++){var n=o[m];if(n.id==l){j(n);return}}j(null)
};this.getAllUserscripts(k)},setEnabled:function(l,k,j){try{chrome.management.setEnabled(l.id,k,j);
return}catch(m){}if(j){window.setTimeout(j,1)}},getUserscriptSource:function(n){if(!a){return null
}var k=g(n.id,n.version);if(k==-1){return false}var j=null;
try{j=JSON.parse(b(f(n.id,n.version,k)))}catch(o){}if(!j){return false
}if(!j.converted_from_user_script){console.warn("import: ",j,'is not "converted_from_user_script"!');
return false}if(!j.content_scripts||!j.content_scripts.length||!j.content_scripts[0].js||!j.content_scripts[0].js.length){console.warn("import: ",j,"is a strange manifest!");
return false}var l=b(f(n.id,n.version,k,j.content_scripts[0].js[0]));
if(!l){console.warn("import: ",j.content_scripts.js[0],"is empty!?");
return false}return l},uninstall:function(k,j){try{chrome.management.uninstall(k.id,j);
return}catch(l){}if(j){window.setTimeout(j,1)}}};Registry.register("native","3737.80",function(){return h
})})})();