
(function(){Registry.require("helper");var b=Registry.get("helper");
var a={mkCompat:function(e,c,d,f){if(c){if(c.options.compat_wrappedjsobject||f){e=a.unWrappedJsObjectify(e)
}if(c.options.compat_metadata||f){e=a.unMetaDataify(e)
}if(c.options.compat_foreach||f){e=a.unEachify(e)}if(c.options.compat_arrayleft||f){e=a.unArrayOnLeftSideify(e)
}if(c.options.compat_forvarin){e=a.fixForVarXStatements(e)
}}if(!d){e=e.replace(/([\'\"]{1,1})use strict([\'\"]{1,1})/g,"$1use\u00A0strict$2")
}return e},findPrototypes:function(e){if(e.search(b.escapeForRegExp(".toSource("))!=-1){return true
}var d=["indexOf","lastIndexOf","filter","forEach","every","map","some","slice"];
for(var c in d){if(e.search(b.escapeForRegExp("Array."+d[c]+"("))!=-1){return true
}}},fixForVarXStatements:function(d){d=d.replace(/for[ \t.]*\([ \t.]*var/gi,"for (var");
var m="for (";var j=")";var l=d.split(m);for(var k=1;
k<l.length;k++){var t=l[k];var o=t.search(b.escapeForRegExp(j));
if(o==-1){continue}var n=t.substr(0,o);if(n.search(/[ \r\n]*in[ \r\n]/)==-1){continue
}var g=n.match(/^[ \r\n]*(?:var[ \r\n\t]*)*(.*?)[ \r\n]* in [ \r\n]*(.*?)$/);
if(g==null||g.length<3){continue}var c=g[1];var s="in";
var r=g[2];if(!c||!r||s!="in"||o>t.length){continue
}var h=t.search(/\)[\n\r\t ]*\{/);if(h!=o){continue
}var q="";q+="{     if (!"+r+".hasOwnProperty("+c+")) continue;";
l[k]=l[k].replace("{",q)}return l.join(m)},unArrayOnLeftSideify:function(d){var t=d.split("\n");
for(var j in t){var u=t[j];var i=u.replace(/[\t ]/g,"");
var h=i.search("]=");var g=i.search("]==");var p=i.search("\\[");
if(p!=-1){var m=i.substr(0,p);if(m!=""){h=-1}}if(h!=-1&&h!=g){var c="";
var f=u.search("=");var q=u.substr(f+1,u.length-f-1);
var s="__narf"+j.toString();c+="var "+s+" = "+q+";\n";
var o=b.getStringBetweenTags(i,"[","]=");var l=o.split(",");
for(var n in l){var r=l[n];if(r.trim()!=""){c+=r+" = "+s+"["+n+"];\n"
}}t[j]=c}}return t.join("\n")},unEachify:function(d){d=d.replace(/for each[ \t]*\(/gi,"for each(");
var p="for each";var l="(";var j=")";var o=d.split(p);
for(var k=1;k<o.length;k++){var v=o[k];if(v.substr(0,1)!="("){o[k]=" each"+o[k];
continue}var q=b.getStringBetweenTags(v,l,j);var h=q.split(" ");
var c=null;var u=null;var t=null;for(var r in h){if(h[r]!=""&&h[r]!="var"){if(!c){c=h[r]
}else{if(!u){u=h[r]}else{if(!t){t=h[r]}}}}}if(!c||!t){o[k]=" each"+o[k];
continue}var g="var __kk in "+t;var s="";s+="{\n    if (!"+t+".hasOwnProperty(__kk)) continue;";
s+=" \n    var "+c+" = "+t+"[__kk];";o[k]=o[k].replace(b.escapeForRegExp(q),g).replace("{",s)
}return o.join("for")},unMetaDataify:function(c){var r=c;
var q=c;var l="<><![CDATA[";var j="]]></>";var n=r.search(b.escapeForRegExp(l));
while(n!=-1){var d=r.substr(0,n);var e=d.lastIndexOf("\n");
var f="";if(e!=-1){f=d.substr(e,d.length-e)}r=r.substr(n,r.length-n);
var i=f.search("\\/\\*");var h=f.search("\\/\\/");if(i==-1&&h==-1){var m=b.getStringBetweenTags(r,l,j);
var o;o=m.replace(/\"/g,'\\"').replace(/\n/g,'\\n" + \n"');
o=o.replace(/^\n/g,"").replace(/\n$/g,"");o=o.replace(/\r/g,"");
var k=l+m+j;q=q.replace(k,'(new CDATA("'+o+'"))')}r=r.substr(1,r.length-1);
n=r.search(b.escapeForRegExp(l))}return q},unWrappedJsObjectify:function(g){var e=g.split("\n");
for(var f in e){var d=e[f].search(".wrappedJSObject");
if(d==-1){continue}var h=e[f].search("\\/\\/");if(h!=-1&&h<d){continue
}e[f]=e[f].replace(/\.wrappedJSObject/g,"")}return e.join("\n")
}};Registry.register("compat","3737.6",function(){return a
})})();