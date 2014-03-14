
(function(){Registry.require(["prepare","icon"]);var d=Registry.get("icon");
var b=Registry.prepare();var f=false;var e=null;var a=function(g){f=g
};var c={notify:function(l,k,i,g,h,n){var m=false;if(!n){m=true;
n=function(){}}var j=function(p){var o=null;var s=false;
var u=null;var v=function(){if(u){window.clearTimeout(u)
}if(!s){n({})}};var w=function(){s=true;var A={clicked:s};
var z=function(){if(n){n(A)}};if(h){var x=function(B){A.granted=B;
z()};var y={permissions:[h]};chrome.permissions.request(y,x)
}else{z(A)}if(o){o.cancel()}};try{o=e.createNotification(p,l||"",k||"")
}catch(r){console.warn("notify: Notification creation failed with: "+r.message);
var q=function(){var x=confirm((l?l+"\n\n":"")+k);if(x){w()
}else{v()}};if(!m){window.setTimeout(q,1)}return}o.onclose=v;
o.onclick=w;var t=function(){u=null;o.cancel()};u=window.setTimeout(t,g?g:10*60*1000);
if(f){console.debug("notify:",l,k,i,g,h)}o.show()};
d.getDataUriFromUrl(i||chrome.extension.getURL("images/icon128.png"),j)
},getPermission:function(k,j,i,g,h,l){c.notify(k,j,i,g,h,l)
},showUpdate:function(i,h,g,j){c.notify(i,h,g,300000,null,j)
},show:function(j,i,h,g,k){c.notify(j,i,h,g,null,k)
},debug:a};Registry.register("notify","3737.80",function(){e=b.HTML5.WEBKITNOTIFICATIONS;
return c})})();