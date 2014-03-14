
(function(){var a=false;var g=false;var j=null;var e=[];
var c=function(o,n){g=n;a=o};var m=function(n){return n
};var h=function(n){e.push(n)};var l=function(q,o,s){var n=e;
e=[];for(var p in n){var t=n[p];try{if(q&&t.name==q){if(g){console.log("storage: notify "+q)
}if(s){s(t.response)}e.push(t)}else{if(o!==null&&t.tabid==o){if(g){console.log("storage: refresh/remove listeners of tab "+o)
}if(s){s(t.response)}}else{e.push(t)}}}catch(r){console.log("storage: listener notification for script "+q+" failed! Page reload?!")
}}};var k=function(p,t,r){if(r===undefined){r=true}var n=e;
e=[];for(var o in n){var s=n[o];try{if(s.name==p&&s.id==t){if(g){console.log("storage: send empty response "+p+" "+t)
}if(r){s.response({})}}else{e.push(s)}}catch(q){if(a){console.debug("storage: listener clear for script "+p+" failed! Page reload?!")
}}}};var b=function(p,n){if(!p){return n}var o=p[0];
p=p.substring(1);switch(o){case"b":return p=="true";
case"n":return Number(p);case"o":try{return JSON.parse(p)
}catch(q){console.error("storage: getValue ERROR: "+q.message);
return n}default:return p}};var i=function(o){var n=(typeof o)[0];
switch(n){case"o":try{o=n+JSON.stringify(o)}catch(p){console.error("storage: setValue ERROR: "+p.message);
return}break;default:o=n+o}return o};var f=true;var d={cacheDB:null,localDB:null,migrate:{fromSqlToStorage:function(n,p){if(j.DB.USE_STORAGE){j.DB.USE_STORAGE=false;
j.DB.USE_SQL=true;var o=function(){d.localDB=null;var t=d.cacheDB;
d.cacheDB={};j.DB.USE_STORAGE=true;j.DB.USE_SQL=false;
var r=1;var q=function(){if(--r==0){d.init(function(){if(n){n(b(t.TM_version))
}})}};for(var s in t){if(!t.hasOwnProperty(s)){continue
}if(s!="TM_config"&&p){continue}r++;if(g){console.log("Copy from SQL: "+name+" -> "+value)
}d.setValue(s,b(t[s]),q)}window.setTimeout(q,1)};d.init(o)
}else{if(n){window.setTimeout(n,200)}}}},markTemporary:function(){if(j.DB.USE_SQL){d.localDB.db={transaction:function(o){var n=function(){var p={executeSql:function(t,s,r,q){if(r){r(p,null)
}}};o(p)};if(o){window.setTimeout(n,1)}}}}f=false},initCache:function(n){var o;
if(j.DB.USE_STORAGE){if(g){console.log("storage: init cache")
}o=function(q){d.cacheDB={};for(var p in q){d.cacheDB[p]=q[p]
}if(n){n()}};chrome.storage.local.get(null,o)}else{if(j.DB.USE_SQL){if(g){console.log("storage: init cache")
}o=function(p,r){d.cacheDB={};if(r){for(var q=0;q<r.rows.length;
q++){d.cacheDB[r.rows.item(q).name]=r.rows.item(q).value
}}if(n){n()}};d.localDB.db.transaction(function(p){p.executeSql("SELECT * FROM config",[],o,d.localDB.onError)
})}else{if(n){n()}}}},init:function(n){if(g){console.log("storage: init "+j.DB.USE_SQL)
}if(j.DB.USE_STORAGE){d.initCache(n)}else{if(j.DB.USE_SQL){d.localDB={db:openDatabase("tmStorage","1.0","TM Storage",30*1024*1024),onSuccess:function(p,o){if(g){console.log("bg: storage: localDB Success ")
}},onError:function(o,p){console.error("storage: localDB Error "+JSON.stringify(p))
},createTable:function(o){d.localDB.db.transaction(function(p){p.executeSql("CREATE TABLE IF NOT EXISTS config(ID INTEGER PRIMARY KEY ASC, name TEXT, value TEXT)",[],o,d.localDB.onError)
})}};d.localDB.createTable(function(){d.initCache(n)
})}else{if(n){n()}}}},setVersion:function(n){if(f){localStorage.setItem("TM_version",n);
d.setValue("TM_version",n)}},getVersion:function(n){return localStorage.getItem("TM_version")||d.getValue("TM_version")||n
},setValue:function(t,r,n){if(g){console.log("storage: setValue -> "+t)
}var o=m(t);if(j.DB.USE_STORAGE){d.cacheDB[o]=r;if(f){var q={};
q[o]=r;chrome.storage.local.set(q,n);return}}else{var p=i(r);
if(j.DB.USE_SQL){if(d.getValue(o,null)){d.localDB.db.transaction(function(s){s.executeSql("UPDATE config SET value=? WHERE name=?",[p,o],n?n:d.localDB.onSuccess,d.localDB.onError)
})}else{d.localDB.db.transaction(function(s){s.executeSql("INSERT INTO config(name, value) VALUES (?,?)",[o,p],n?n:d.localDB.onSuccess,d.localDB.onError)
})}d.cacheDB[o]=p;return}else{if(f){localStorage.setItem(o,p)
}}}if(n){n()}},getValue:function(p,n){if(g){console.log("storage: getValue -> "+p)
}var o=m(p);if(j.DB.USE_STORAGE){return d.cacheDB[o]===undefined?n:d.cacheDB[o]
}else{if(j.DB.USE_SQL){return b(d.cacheDB[o],n)}else{return b(localStorage.getItem(o,n),n)
}}},deleteAll:function(n){if(g){console.log("storage: deleteAll()")
}if(j.DB.USE_STORAGE){if(f){chrome.storage.local.clear(n);
return}}else{if(j.DB.USE_SQL){d.cacheDB={};d.localDB.db.transaction(function(q){q.executeSql("DROP TABLE config",[],n,d.localDB.onError)
});return}else{if(f){var p=d.listValues();for(var o=0;
o<p.length;o++){localStorage.removeItem(p[o])}}}}if(n){n()
}},deleteValue:function(p,n){if(g){console.log("storage: deleteValue -> "+p)
}var o=m(p);if(j.DB.USE_STORAGE){d.cacheDB[o]=null;
delete d.cacheDB[o];if(f){chrome.storage.local.remove(o,n);
return}}else{if(j.DB.USE_SQL){d.cacheDB[o]=null;delete d.cacheDB[o];
d.localDB.db.transaction(function(q){q.executeSql("DELETE FROM config WHERE name=?",[o],n,d.localDB.onError)
});return}else{if(f){localStorage.removeItem(o)}}}if(n){n()
}},listValues:function(){if(g){console.log("storage: listValues")
}var n=[];if(j.DB.USE_STORAGE||j.DB.USE_SQL){for(var o in d.cacheDB){if(!d.cacheDB.hasOwnProperty(o)){continue
}n.push(o)}}else{for(var o=0;o<localStorage.length;
o++){n.push(localStorage.key(o))}}return n},debug:c,addListener:h,removeListeners:k,notifyListeners:l};
Registry.register("storage","3630.77",{create:function(n){j=n;
return d}})})();