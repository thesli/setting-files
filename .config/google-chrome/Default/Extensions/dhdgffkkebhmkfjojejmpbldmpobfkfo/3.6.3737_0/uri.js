
(function(){var d=false;var h="*";var g="://*";var f="^https?://.*";
var l=".*/";var a=".tld";var i="museum|travel|aero|arpa|coop|info|jobs|name|nvus|biz|com|edu|gov|int|mil|net|org|pro|xxx|ac|ad|ae|af|ag|ai|ak|al|al|am|an|ao|aq|ar|ar|as|at|au|aw|ax|az|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|co|cr|cs|ct|cu|cv|cx|cy|cz|dc|de|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fl|fm|fo|fr|ga|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gu|gw|gy|hi|hk|hm|hn|hr|ht|hu|ia|id|id|ie|il|il|im|in|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|ks|kw|ky|ky|kz|la|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|ma|mc|md|md|me|mg|mh|mi|mk|ml|mm|mn|mn|mo|mo|mp|mq|mr|ms|ms|mt|mt|mu|mv|mw|mx|my|mz|na|nc|nc|nd|ne|ne|nf|ng|nh|ni|nj|nl|nm|no|np|nr|nu|ny|nz|oh|ok|om|or|pa|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|pr|ps|pt|pw|py|qa|re|ri|ro|ru|rw|sa|sb|sc|sc|sd|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|tn|to|tp|tr|tt|tv|tw|tx|tz|ua|ug|uk|um|us|ut|uy|uz|va|va|vc|ve|vg|vi|vi|vn|vt|vu|wa|wf|wi|ws|wv|wy|ye|yt|yu|za|zm|zw";
var b="de.net|gb.net|uk.net|dk.org|eu.org|asn.au|com.au|conf.au|csiro.au|edu.au|gov.au|id.au|info.au|net.au|org.au|otc.au|oz.au|telememo.au|ac.cn|ah.cn|bj.cn|com.cn|cq.cn|edu.cn|gd.cn|gov.cn|gs.cn|gx.cn|gz.cn|hb.cn|he.cn|hi.cn|hk.cn|hl.cn|hn.cn|jl.cn|js.cn|ln.cn|mo.cn|net.cn|nm.cn|nx.cn|org.cn|qh.cn|sc.cn|sh.cn|sn.cn|sx.cn|tj.cn|tw.cn|xj.cn|xz.cn|yn.cn|zj.cn|ac.jp|ad.jp|aichi.jp|akita.jp|aomori.jp|chiba.jp|co.jp|ed.jp|ehime.jp|fukui.jp|fukuoka.jp|fukushima.jp|gifu.jp|go.jp|gov.jp|gr.jp|gunma.jp|hiroshima.jp|hokkaido.jp|hyogo.jp|ibaraki.jp|ishikawa.jp|iwate.jp|kagawa.jp|kagoshima.jp|kanagawa.jp|kanazawa.jp|kawasaki.jp|kitakyushu.jp|kobe.jp|kochi.jp|kumamoto.jp|kyoto.jp|lg.jp|matsuyama.jp|mie.jp|miyagi.jp|miyazaki.jp|nagano.jp|nagasaki.jp|nagoya.jp|nara.jp|ne.jp|net.jp|niigata.jp|oita.jp|okayama.jp|okinawa.jp|or.jp|org.jp|osaka.jp|saga.jp|saitama.jp|sapporo.jp|sendai.jp|shiga.jp|shimane.jp|shizuoka.jp|takamatsu.jp|tochigi.jp|tokushima.jp|tokyo.jp|tottori.jp|toyama.jp|utsunomiya.jp|wakayama.jp|yamagata.jp|yamaguchi.jp|yamanashi.jp|yokohama.jp|ac.uk|co.uk|edu.uk|gov.uk|ltd.uk|me.uk|mod.uk|net.uk|nhs.uk|nic.uk|org.uk|plc.uk|police.uk|sch.uk|co.tv";
var k=("("+[i,b].join("|")+")").replace(/\./gi,"\\.");
Registry.require("cache");Registry.require("helper");
var j=Registry.get("cache");var e=Registry.get("helper");
j.create("uris").setOptions({timeout:3*60,check_interval:2*60,retimeout_on_get:true}).init();
j.create("regexps").setOptions({timeout:10*60,check_interval:5*60,retimeout_on_get:true}).init();
var c=(function(){var o=function(s,r){if(r===undefined){r={}
}var t="i"+s+!!r.safe+!!r.safeUrls+!!r.tryToFixUrl;
var q=j.items.regexps.get(t);if(!q){var p;if((r.tryToFixUrl||r.safe)&&s==h){p=f
}else{if((r.safeUrls||r.safe)&&s!=f&&s.search(e.escapeForRegExpURL(l))!=-1){p=s.replace(e.escapeForRegExpURL(l),a+"/")
}else{p=s}p="^"+e.escapeForRegExpURL(p);p=p.replace(/\*/gi,".*");
p=p.replace(e.escapeForRegExpURL(a+"/"),"."+k+"/");
p=p.replace(/(\^|:\/\/)\.\*/,"$1([^\\?#])*");p=p.replace(/<1>/g,"([^\\/#\\?]*\\.)?");
p=p.replace(/<2>/g,"[^#\\?]*");p=p.replace(/<3>/g,"([^\\?#]*\\.)*")
}q="("+p+")";j.items.regexps.set(t,q)}return q};var n=function(y){var v=j.items.regexps.get(y);
if(!v){var s,p,t,q,z,B;var x="://";var A="/";s=y.replace(/\$$/,"").split(x);
if(s.length<2){p="";t=y}else{p=s[0].replace(/^\^/,"");
t=s.slice(1).join(x)}q=t.split(A);if(q.length<2){B="/"
}else{B=A+q.slice(1).join(A)}z=q[0];if(p==="http*"){p="https<1>"
}else{if(!p.match(/\*|http|https|file|ftp/)){console.warn('uri: override scheme "'+p+'" with "*"');
p="*"}}if(p==="file"){z=""}else{var r=z;var w=z.match(/\*$|(\*\.)?[^\/\*]+/);
z=w?w[0]:"";if(z!==r){console.warn('uri: override host "'+r+'" with "'+z+'"')
}}if(!B||B.substr(0,1)!==A){console.warn('uri: prefix path "'+B+'" with "/"');
B=A+B}if(d){console.debug(p,e.escapeForRegExpURL(x),z,B)
}p=e.escapeForRegExpURL(p).replace(/\*/gi,"[^:\\/#\\?]*");
z=e.escapeForRegExpURL(z).replace(/\*\\\./gi,"(*\\.)?").replace(/\*/gi,"[^#\\?\\/]*");
B=e.escapeForRegExpURL(B).replace(/\*/gi,".*");p=p.replace(/<1>/g,"?");
z=z.replace(new RegExp(e.escapeForRegExpURL(a)+"$"),"."+k);
if(d){console.debug(p,e.escapeForRegExpURL(x),z,B)}v="(^"+p+e.escapeForRegExpURL(x)+z+B+"$)";
j.items.regexps.set(y,v)}return v};var m={parse:function(r){var q=j.items.uris.get(r);
if(!q){q={};var p=document.createElement("a");p.href=r;
var t=["protocol","hostname","pathname","port","search","hash","origin"];
document.body.appendChild(p);for(var s=0;s<t.length;
s++){q[t[s]]=p[t[s]]}document.body.removeChild(p);j.items.uris.set(r,q)
}return q},woHash:function(q){var p=typeof q==="string"?m.parse(q):q;
return p.protocol+"//"+p.hostname+(p.port?":"+p.port:"")+p.pathname+p.search
},getRegExpFromInclude:o,getRegExpFromMatch:n,staticVars:{urlAllHttp_:f}};
return m})();Registry.register("uri","3737.6",c)
})();