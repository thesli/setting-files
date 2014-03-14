
(function(){Registry.require(["prepare"],function(){var i=Registry.prepare();
var a=false;var f=false;var l=[];var d=true;var c=30*1024*1024;
var h=(function(){var p=[i.CONSTANTS.STORAGE.VERSION,i.CONSTANTS.STORAGE.SCHEMA,i.CONSTANTS.STORAGE.TYPE];
var q={};p.forEach(function(r){q[r]=true});return{keys:p,has:function(r){return !!q[r]
}}})();var o=function(p){return p};var k=function(p){return p
};var b=function(r,p){if(!r){return p}var q=r[0];r=r.substring(1);
switch(q){case"b":return r=="true";case"n":return Number(r);
case"o":try{return JSON.parse(r)}catch(s){console.error("Storage: getValue ERROR: "+s.message);
return p}default:return r}};var g=function(q){var p=(typeof q)[0];
switch(p){case"o":try{q=p+JSON.stringify(q)}catch(r){console.error("Storage: setValue ERROR: "+r.message);
return}break;default:q=p+q}return q};var n=function(s,t){var r;
var q=Array.prototype.slice.call(arguments,2);var p=q.length?q[q.length-1]:null;
if(typeof s=="string"){if(s==i.DB.USE&&t=="clean"){return p()
}r=m.implementations[s][t]}else{r=s[t]}return r?r.apply(this,q):(typeof p==="function"?p():false)
};var e=function(t,s,p){var r=1;var q=function(){if(--r==0){if(p){p()
}}};Object.getOwnPropertyNames(s).forEach(function(u){r++;
n(t,"setValue",u,s[u],q)});q()};var j=function(s,q){var p={};
q.forEach(function(r){p[r]=n(s,"getValue",r)});return p
};var m={implementations:{localStorage:(function(){var p={setValue:function(u,t,q){if(f){console.log("localStorage: setValue -> "+u)
}var r=o(u);var s=g(t);if(d){localStorage.setItem(r,s)
}if(q){q()}},getValue:function(s,q){if(f){console.log("Storage: getValue -> "+s)
}var r=o(s);return b(localStorage.getItem(r,q),q)},deleteAll:function(q){if(f){console.log("localStorage: deleteAll()")
}if(d){p.listValues().forEach(function(s){if(h.has(s)){return
}localStorage.removeItem(o(s))})}if(q){q()}},deleteValue:function(s,q){if(f){console.log("localStorage: deleteValue -> "+s)
}var r=o(s);if(d){localStorage.removeItem(r)}if(q){q()
}},listValues:function(){if(f){console.log("localStorage: listValues")
}var q=[];for(var r=0;r<localStorage.length;r++){q.push(k(localStorage.key(r)))
}return q}};return{options:{},methods:p}})(),sql:(function(){var p=null;
var q=null;var s=function(u){q.db.transaction(function(v){v.executeSql("CREATE TABLE IF NOT EXISTS config(ID INTEGER PRIMARY KEY ASC, name TEXT, value TEXT)",[],function(){u()
},q.onError)})};var r=function(u){q={db:openDatabase("tmStorage","1.0","TM Storage",c),onSuccess:function(w,v){if(f){console.log("webSQL: localDB Success ")
}},onError:function(v,w){console.error("webSQL: localDB Error "+JSON.stringify(w))
}};s(u)};var t={setValue:function(y,x,u){if(f){console.log("Storage: setValue -> "+y)
}var v=o(y);var w=g(x);p[v]=w;if(d){if(t.getValue(v,null)){q.db.transaction(function(z){z.executeSql("UPDATE config SET value=? WHERE name=?",[w,v],u?u:q.onSuccess,q.onError)
})}else{q.db.transaction(function(z){z.executeSql("INSERT INTO config(name, value) VALUES (?,?)",[v,w],u?u:q.onSuccess,q.onError)
})}}else{if(u){u()}}},getValue:function(w,u){if(f){console.log("webSQL: getValue -> "+w)
}var v=o(w);return b(p[v],u)},deleteAll:function(u){if(f){console.log("webSQL: deleteAll()")
}var v=j(t,h.keys);p=v;if(d){q.db.transaction(function(w){w.executeSql("DROP TABLE config",[],function(){s(function(){e(t,v,u)
})},q.onError)})}else{if(u){u()}}},deleteValue:function(w,u){if(f){console.log("webSQL: deleteValue -> "+w)
}var v=o(w);delete p[v];if(d){q.db.transaction(function(x){x.executeSql("DELETE FROM config WHERE name=?",[v],u,q.onError)
})}else{if(u){u()}}},listValues:function(){if(f){console.log("webSQL: listValues")
}var u=[];Object.getOwnPropertyNames(p).forEach(function(v){u.push(k(v))
});return u}};return{init:function(v){var u=function(x,z){p={};
if(z){for(var y=0;y<z.rows.length;y++){p[z.rows.item(y).name]=z.rows.item(y).value
}}if(v){v()}};var w=function(){if(!p){q.db.transaction(function(x){x.executeSql("SELECT * FROM config",[],u,q.onError)
})}else{if(v){v()}}};return q?w():r(w)},clean:function(u){p=null;
if(u){u()}},options:{},methods:t}})(),chromeStorage:(function(){var p=null;
var t=false;var r=false;var q=function(w,v){if(d&&r&&v=="local"){for(var u in w){var x=w[u];
if(x.newValue){p[u]=x.newValue}else{delete p[u]}if(f){console.log("si: local storage key ",u," changed. Old value was ",x.oldValue,", new value is ",x.newValue,".",u,v)
}}}};var s={setValue:function(y,x,u){if(f){console.log("chromeStorage: setValue -> "+y)
}var v=o(y);p[v]=x;if(d){var w={};w[v]=x;chrome.storage.local.set(w,u)
}else{if(u){u()}}},getValue:function(w,u){if(f){console.log("chromeStorage: getValue -> "+w)
}var v=o(w);return p[v]===undefined?u:p[v]},deleteAll:function(u){if(f){console.log("chromeStorage: deleteAll()")
}var v=j(s,h.keys);p=v;if(d){chrome.storage.local.clear(function(){e(s,v,u)
})}else{if(u){u()}}},deleteValue:function(w,u){if(f){console.log("chromeStorage: deleteValue -> "+w)
}var v=o(w);delete p[v];if(d){chrome.storage.local.remove(v,u)
}else{if(u){u()}}},listValues:function(){if(f){console.log("chromeStorage: listValues")
}var u=[];Object.getOwnPropertyNames(p).forEach(function(v){u.push(k(v))
});return u},setTemporary:function(u){d=!u;r=true},isWorking:function(v){var u="bar";
var y="foo";var z={};z[y]=u;var x=function(){console.warn("storage:",chrome.runtime.lastError?chrome.runtime.lastError.message:"storage set/get test failed!");
var B=!chrome.runtime.lastError;v(B)};var A=window.setTimeout(function(){A=null;
x()},60000);var w=function(){chrome.storage.local.get(y,function(B){window.clearTimeout(A);
A=null;if(!B||B[y]!==u){return x()}chrome.storage.local.remove(y,function(){v(true)
})})};chrome.storage.local.set(z,w)}};return{isSupported:function(u){u(true)
},init:function(v){if(!p){var u=function(x){p={};for(var w in x){p[w]=x[w]
}if(!t){chrome.storage.onChanged.addListener(q);t=true
}if(v){v()}};chrome.storage.local.get(null,u)}else{if(v){v()
}}},clean:function(u){p=null;if(u){u()}},options:{},methods:s}
})(),file:(function(){var r=null;var t=null;var A=function(B){return B
};var w=function(B){return B};var v=function(B){var C=function(D){console.warn("fileStorage: listFiles() error:",D);
if(B){B([])}};t.root.getDirectory("data",{create:true},function(F){var G=F.createReader();
var D=[];var E=function(){G.readEntries(function(H){if(!H.length){B(D)
}else{D=D.concat(H);E()}},C)};E()},C)};var x=function(D,E,B){var C=function(F){console.warn("fileStorage: writeFileData(",D,") error:",F);
if(B){B()}};t.root.getDirectory("data",{create:true},function(F){F.getFile(D,{create:true},function(G){G.createWriter(function(I){I.onwriteend=function(J){if(B){B(true)
}};I.onerror=C;var H=new Blob([E],{type:"text/plain"});
I.write(H)},C)},C)},C)};var q=function(D,B){var C=function(F){console.warn("fileStorage: getFileData(",D,") error:",F);
if(B){B()}};var E=function(G){var F=new FileReader();
F.onloadend=function(){B(this.result)};F.onerror=C;
F.onabort=C;F.readAsText(G)};t.root.getDirectory("data",{create:true},function(F){F.getFile(D,{},function(G){G.file(function(H){E(H)
},C)},C)},C)};var s=function(D,B){var C=function(E){console.warn("fileStorage: getFileData(",D,") error:",E);
if(B){B()}};t.root.getDirectory("data",{create:true},function(E){E.getFile(D,{create:false},function(F){F.remove(function(){if(B){B()
}},C)},C)},C)};var p=function(B){var C=function(D){console.warn("fileStorage: getFileData(",filename,") error:",D);
if(B){B()}};t.root.getDirectory("data",{create:true},function(D){D.removeRecursively(function(){if(B){B()
}},C)},C)};var z=function(B){r={};var D=1;var C=function(){if(--D==0){if(B){B()
}}};v(function(E){E.forEach(function(F){if(typeof F!=="string"){F=F.name
}D++;q(F,function(G){r[F]=G;C()})});C()})};var y=function(B){if(!r){var D=function(E){if(E){console.warn("fileStorage: ",E)
}B(false)};var C=function(E){t=E;z(B)};window.requestFileSystem=window.requestFileSystem||window.webkitRequestFileSystem;
window.requestFileSystem(window.PERSISTENT,c,C,D)}else{if(B){B()
}}};var u={isSupported:function(B){B(window.File&&window.FileReader&&window.FileList&&window.Blob)
},isWorking:function(B){B(true)},setValue:function(F,E,B){if(f){console.log("fileStorage: setValue -> "+F)
}var C=A(F);var D=g(E);r[C]=D;if(d){x(C,D,B)}else{if(B){B()
}}},getValue:function(D,B){if(f){console.log("fileStorage: getValue -> "+D)
}var C=A(D);return b(r[C],B)},deleteAll:function(B){if(f){console.log("fileStorage: deleteAll()")
}var C=j(u,h.keys);r=C;if(d){p(function(){e(u,C,B)})
}else{if(B){B()}}},deleteValue:function(D,B){if(f){console.log("fileStorage: deleteValue -> "+D)
}var C=A(D);delete r[C];if(d){s(C,B)}else{if(B){B()
}}},listValues:function(){if(f){console.log("fileStorage: listValues")
}var B=[];Object.getOwnPropertyNames(r).forEach(function(C){B.push(w(C))
});return B}};return{init:y,clean:function(B){r=null;
if(B){B()}},options:{},methods:u}})()},migrate:function(u,t,y,z){var w=m.implementations[u];
var x=m.implementations[t];z=z||{};if(!w||!x){console.error("Migration: unknown storage implementation(s) ",u,t);
if(cb){cb(false)}return true}if(f){console.log("Migration: from",u,"to",t)
}var s=function(){if(y){y()}};var r=function(){return n(u,"clean",s)
};var p=function(C){var B=1;var A=function(){if(--B==0){return n(t,"clean",r)
}};var D;C.forEach(function(E){D=w.methods.getValue(E);
if(z.drop){w.methods.deleteValue(E)}if(f){console.log("Migration: copy value of "+E)
}B++;x.methods.setValue(E,D,A)});window.setTimeout(A,1)
};var v=function(){p(w.methods.listValues())};var q=function(){return n(t,"init",v)
};return n(u,"init",q)},isSupported:function(p){p(true)
},isWorking:function(p){p(true)},setTemporary:function(p){d=!p
},init:function(p){if(f){console.log("Storage: use "+i.DB.USE)
}Object.getOwnPropertyNames(m.implementations[i.DB.USE].methods).forEach(function(r){var q=function(){return m.implementations[i.DB.USE].methods[r]
};m.__defineGetter__(r,q)});return m.implementations[i.DB.USE].init?m.implementations[i.DB.USE].init(p):p()
},setVersion:function(p){if(d){localStorage.setItem("TM_version",p);
m.setValue(i.CONSTANTS.STORAGE.VERSION,p);m.setValue(i.CONSTANTS.STORAGE.SCHEMA,p)
}},getVersion:function(u,p){var t=localStorage.getItem("TM_version")||m.getValue(i.CONSTANTS.STORAGE.VERSION);
if(t||!p){t=t||u;if(p){p(t)}return t}else{var v="sql";
var s=function(){p(t)};var q=function(){t=m.implementations.sql.methods.getValue("TM_version")||u;
n(v,"clean",s)};n(v,"init",q)}},getDbVersion:function(){return m.getValue(i.CONSTANTS.STORAGE.SCHEMA,"3.5")
},debug:function(q,p){f|=p;a|=q},addClientListener:function(p){l.push(p)
},removeClientListeners:function(r,v,t){if(t===undefined){t=true
}var p=l;l=[];for(var q in p){var u=p[q];try{if(u.name==r&&u.id==v){if(f){console.log("Storage: send empty response "+r+" "+v)
}if(t){u.response({})}}else{l.push(u)}}catch(s){if(a){console.debug("Storage: listener clear for script "+r+" failed! Page reload?!")
}}}},notifyClientListeners:function(s,q,u){var p=l;
l=[];for(var r in p){var v=p[r];try{if(s&&v.name==s){if(f){console.log("Storage: notify "+s)
}if(u){u(v.response)}l.push(v)}else{if(q!==null&&v.tabid==q){if(f){console.log("Storage: refresh/remove listeners of tab "+q)
}if(u){u(v.response)}}else{l.push(v)}}}catch(t){console.log("Storage: listener notification for script "+s+" failed! Page reload?!")
}}}};Registry.register("storage","3737.80",function(){return m
})})})();