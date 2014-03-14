
(function(){Registry.require(["prepare","pingpong","helper"],function(){var a=false;
var c=Registry.get("pingpong");var d=Registry.get("helper");
var b=null;var g=[];var f=null;var e=function(i){if(f){window.clearTimeout(f);
f=null}i(b);b=null};var h=function(k,j){if(a){console.log("Layout: init")
}var l=function(){if(g.length){var m=g.pop();console.log("Try to load layout",m);
Registry.loadFile(["layout",m,k].join("/"));f=window.setTimeout(function(){f=null;
l()},1000)}else{console.warn("Layout: Unable to load file",k)
}};var i=function(m){g=["default",d.getUrlArgs()["layout"]||(m&&m.config?m.config.layout:null)||"default"];
l();if(j.suc){j.suc()}};c.ping(i,j.fail)};Registry.register("layout","3737.6",{init:h,render:e})
})})();