
(function(){Registry.require("helper");var a=Registry.get("helper");
var b={items:{},remove:function(c){delete b.items[c]
},create:function(f){var d={};var e={retimeout_on_get:false,timeout:300,check_interval:120};
var g=undefined;var c={init:function(){if(!g){c.schedule()
}},schedule:function(){c.unschedule();g=window.setInterval(c.clean,e.check_interval*1000)
},unschedule:function(){if(g){window.clearInterval(g)
}g=null},setOptions:function(i){for(var h in i){if(!i.hasOwnProperty(h)){continue
}e[h]=i[h];if(h=="check_interval"&&g){c.schedule()}}return c
},set:function(h,i){if(V||CV){console.log("cache("+f+"): set "+h)
}d[h]={value:i,ts:(new Date()).getTime()}},setj:function(h,i){return c.set(h,i?JSON.stringify(i):i)
},get:function(i,j){if(V||CV){console.log("cache("+f+"): get "+i)
}var h=j;if(d[i]){if(e.retimeout_on_get){d[i].ts=(new Date()).getTime()
}h=d[i].value}return h},getj:function(){var h=c.get.apply(this,arguments);
return h?JSON.parse(h):h},remove:function(h){if(V||CV){console.log("cache("+f+"): remove "+h)
}delete d[h]},clean:function(){if(V||CV){console.log("cache("+f+"): clean")
}var h=(new Date()).getTime()-e.timeout*1000;var i=function(l,j){if(l.ts<h){window.setTimeout(function(){c.remove(j)
},1)}};a.forEach(d,i)},removeAll:function(){if(V){console.log("cache("+f+"): removeAll")
}d={}},finalize:function(){c.unschedule();d={}}};b.items[f]=c;
return c}};Registry.register("cache","3737.80",b)
})();