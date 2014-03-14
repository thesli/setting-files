
(function(){var g="*";var f="://*";var e="^https?://.*";
var k=".*/";var a=".tld";var h="museum|travel|aero|arpa|coop|info|jobs|name|nvus|biz|com|edu|gov|int|mil|net|org|pro|xxx|ac|ad|ae|af|ag|ai|ak|al|al|am|an|ao|aq|ar|ar|as|at|au|aw|ax|az|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|co|cr|cs|ct|cu|cv|cx|cy|cz|dc|de|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fl|fm|fo|fr|ga|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gu|gw|gy|hi|hk|hm|hn|hr|ht|hu|ia|id|id|ie|il|il|im|in|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|ks|kw|ky|ky|kz|la|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|ma|mc|md|md|me|mg|mh|mi|mk|ml|mm|mn|mn|mo|mo|mp|mq|mr|ms|ms|mt|mt|mu|mv|mw|mx|my|mz|na|nc|nc|nd|ne|ne|nf|ng|nh|ni|nj|nl|nm|no|np|nr|nu|ny|nz|oh|ok|om|or|pa|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|pr|ps|pt|pw|py|qa|re|ri|ro|ru|rw|sa|sb|sc|sc|sd|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|tn|to|tp|tr|tt|tv|tw|tx|tz|ua|ug|uk|um|us|ut|uy|uz|va|va|vc|ve|vg|vi|vi|vn|vt|vu|wa|wf|wi|ws|wv|wy|ye|yt|yu|za|zm|zw";
var b="de.net|gb.net|uk.net|dk.org|eu.org|asn.au|com.au|conf.au|csiro.au|edu.au|gov.au|id.au|info.au|net.au|org.au|otc.au|oz.au|telememo.au|ac.cn|ah.cn|bj.cn|com.cn|cq.cn|edu.cn|gd.cn|gov.cn|gs.cn|gx.cn|gz.cn|hb.cn|he.cn|hi.cn|hk.cn|hl.cn|hn.cn|jl.cn|js.cn|ln.cn|mo.cn|net.cn|nm.cn|nx.cn|org.cn|qh.cn|sc.cn|sh.cn|sn.cn|sx.cn|tj.cn|tw.cn|xj.cn|xz.cn|yn.cn|zj.cn|ac.jp|ad.jp|aichi.jp|akita.jp|aomori.jp|chiba.jp|co.jp|ed.jp|ehime.jp|fukui.jp|fukuoka.jp|fukushima.jp|gifu.jp|go.jp|gov.jp|gr.jp|gunma.jp|hiroshima.jp|hokkaido.jp|hyogo.jp|ibaraki.jp|ishikawa.jp|iwate.jp|kagawa.jp|kagoshima.jp|kanagawa.jp|kanazawa.jp|kawasaki.jp|kitakyushu.jp|kobe.jp|kochi.jp|kumamoto.jp|kyoto.jp|lg.jp|matsuyama.jp|mie.jp|miyagi.jp|miyazaki.jp|nagano.jp|nagasaki.jp|nagoya.jp|nara.jp|ne.jp|net.jp|niigata.jp|oita.jp|okayama.jp|okinawa.jp|or.jp|org.jp|osaka.jp|saga.jp|saitama.jp|sapporo.jp|sendai.jp|shiga.jp|shimane.jp|shizuoka.jp|takamatsu.jp|tochigi.jp|tokushima.jp|tokyo.jp|tottori.jp|toyama.jp|utsunomiya.jp|wakayama.jp|yamagata.jp|yamaguchi.jp|yamanashi.jp|yokohama.jp|ac.uk|co.uk|edu.uk|gov.uk|ltd.uk|me.uk|mod.uk|net.uk|nhs.uk|nic.uk|org.uk|plc.uk|police.uk|sch.uk|co.tv";
var j=("("+[h,b].join("|")+")").replace(/\./gi,"\\.");
Registry.require("cache");Registry.require("helper");
var i=Registry.get("cache");var d=Registry.get("helper");
i.create("uris").setOptions({timeout:3*60,check_interval:2*60,retimeout_on_get:true}).init();
i.create("regexps").setOptions({timeout:10*60,check_interval:5*60,retimeout_on_get:true}).init();
var c=(function(){var n=function(r,q){if(q===undefined){q={}
}var s="i"+r+!!q.safe+!!q.safeUrls+!!q.tryToFixUrl;
var p=i.items.regexps.get(s);if(!p){var o;if((q.tryToFixUrl||q.safe)&&r==g){o=e
}else{if((q.safeUrls||q.safe)&&r!=e&&r.search(d.escapeForRegExpURL(k))!=-1){o=r.replace(d.escapeForRegExpURL(k),a+"/")
}else{o=r}o="^"+d.escapeForRegExpURL(o);o=o.replace(/\*/gi,".*");
o=o.replace(d.escapeForRegExpURL(a+"/"),"."+j+"/");
o=o.replace(/(\^|:\/\/)\.\*/,"$1([^\\?#])*");o=o.replace(/<1>/g,"([^\\/#\\?]*\\.)?");
o=o.replace(/<2>/g,"[^#\\?]*");o=o.replace(/<3>/g,"([^\\?#]*\\.)*")
}p="("+o+")";i.items.regexps.set(s,p)}return p};var m=function(x){var t=i.items.regexps.get(x);
if(!t){var r,o,s,p,y,A;var w="://";var z="/";r=x.replace(/\$$/,"").split(w);
if(r.length<2){o="";s=x}else{o=r[0].replace(/^\^/,"");
s=r.slice(1).join(w)}p=s.split(z);if(p.length<2){A="/"
}else{A=z+p.slice(1).join(z)}y=p[0];if(o==="http*"){o="https<1>"
}else{if(!o.match(/\*|http|https|file|ftp/)){console.warn('uri: override scheme "'+o+'" with "*"');
o="*"}}if(o==="file"){y=""}else{var q=y;var v=y.match(/\*$|(\*\.)?[^\/\*]+/);
y=v?v[0]:"";if(y!==q){console.warn('uri: override host "'+q+'" with "'+y+'"')
}}if(!A||A.substr(0,1)!==z){console.warn('uri: prefix path "'+A+'" with "/"');
A=z+A}console.debug(o,d.escapeForRegExpURL(w),y,A);
o=d.escapeForRegExpURL(o).replace(/\*/gi,"[^:\\/#\\?]*");
y=d.escapeForRegExpURL(y).replace(/\*\\\./gi,"(*\\.)?").replace(/\*/gi,"[^#\\?\\/]*");
A=d.escapeForRegExpURL(A).replace(/\*/gi,".*");o=o.replace(/<1>/g,"?");
y=y.replace(new RegExp(d.escapeForRegExpURL(a)+"$"),"."+j);
console.debug(o,d.escapeForRegExpURL(w),y,A);t="(^"+o+d.escapeForRegExpURL(w)+y+A+"$)";
i.items.regexps.set(x,t)}return t};var l={parse:function(q){var p=i.items.uris.get(q);
if(!p){p={};var o=document.createElement("a");o.href=q;
var s=["protocol","hostname","pathname","port","search","hash","origin"];
document.body.appendChild(o);for(var r=0;r<s.length;
r++){p[s[r]]=o[s[r]]}document.body.removeChild(o);i.items.uris.set(q,p)
}return p},woHash:function(p){var o=l.parse(p);return o.protocol+"//"+o.hostname+(o.port?":"+o.port:"")+o.pathname+o.search
},getRegExpFromInclude:n,getRegExpFromMatch:m,staticVars:{urlAllHttp_:e}};
return l})();Registry.register("uri","3630.77",c)
})();