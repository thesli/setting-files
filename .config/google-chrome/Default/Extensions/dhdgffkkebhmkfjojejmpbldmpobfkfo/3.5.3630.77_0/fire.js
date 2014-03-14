
(function(){var e=false;var l=false;var E=null;var I=null;
var K=null;var G=true;var f="rank";var v={};var h=0;
var g="http://...";var a=new Date();if(!window.requestFileSystem){window.requestFileSystem=window.webkitRequestFileSystem
}if(!window.BlobBuilder){window.BlobBuilder=window.WebKitBlobBuilder
}Registry.require("pingpong");Registry.require("crcrc");
Registry.require("curtain");Registry.require("helper");
Registry.require("tabview");Registry.require("convert");
Registry.require("htmlutil");Registry.require("i18n");
var x=Registry.get("crcrc").cr;var o=Registry.get("crcrc").crc;
var s=Registry.get("curtain");var C=Registry.get("helper");
var u=Registry.get("tabview");var L=Registry.get("convert");
var B=Registry.get("htmlutil");var m=Registry.get("pingpong");
var i=Registry.get("i18n");var c=function(O,N){O.origin="fire";
chrome.extension.sendMessage(O,N)};var w=C.getUrlArgs();
var r=function(N,O){if(O){N.setAttribute("style",C.staticVars.visible);
N.vis=true}else{N.setAttribute("style",C.staticVars.invisible);
N.vis=false}};var b=function(N){return w.tab?w.tab:N
};var k=function(N){return w.url?w.url:N};var p=function(T){var R=0;
var X=0;var Z=0;var S=0;var O=(new Date()).getTime();
var V=24*60*60*1000;var Y=7*V;var P=30*V;if(T["uso:timestamp"]){var aa=T["uso:timestamp"];
if(O-Y<aa){R=1}else{if(O-P<aa){R=0.96}else{if(O-6*P<aa){R=0.9
}else{if(O-24*P<aa){R=0.7}else{R=0}}}}}var ab=T["uso:installs"];
if(ab>500000){X=1}else{if(ab>100000){X=0.95}else{if(ab>50000){X=0.9
}else{if(ab>10000){X=0.88}else{if(ab>1000){X=0.8}else{X=0.5*(ab/1000)
}}}}}var Q=T["uso:fans"];if(Q>5&&ab>333){var U=ab/Q;
if(U<333){Z=1}else{if(U<1000){Z=0.9}else{if(U<3000){Z=0.85
}else{if(U<10000){Z=0.8}else{Z=0.5*(10000/U)}}}}}var W=Number(T["uso:rating"]);
S=W>4?1:W/5;var N=0.25*R+0.35*X+0.15*Z+0.25*S;return N
};var H=function(P,O){P=parseFloat(P);if(!isNaN(P)){if(!O){var O=0
}var N=Math.pow(10,O);return Math.floor(P*N+((P*N*10)%10>=5?1:0))/N
}else{return P}};var F=function(N){if(N==undefined){N=""
}var ac={id:"new",name:N};var aa=[];var P=function(aj,af,at,ap,al){var au=o("div","settingsth",aj.name,aj.id,af);
var an=function(ay,av,ax){var aw=document.getElementsByName("settingsth_a_up"+aj.name);
var aB=document.getElementsByName("settingsth_a_down"+aj.name);
var aA;var az;for(var aC=0;aC<aw.length;aC++){aw[aC].style.display="none"
}for(var aC=0;aC<aB.length;aC++){aB[aC].style.display="none"
}if(G){av.style.display=""}else{ax.style.display=""
}};var ar=o("a","settingsth_a",aj.name,aj.id,af+"_a");
ar.setAttribute("name","settingsth_a"+aj.name);var aq=o("a","settingsth_a_up",aj.name,aj.id,af+"_a_up");
aq.setAttribute("name","settingsth_a_up"+aj.name);var ah=o("a","settingsth_a_down",aj.name,aj.id,af+"_a_down");
ah.setAttribute("name","settingsth_a_down"+aj.name);
aq.style.display="none";ah.style.display="none";var ak=function(){an(ar,aq,ah)
};var ag=function(){ak();s.hide()};var ai=function(){var av=function(){f=ap;
d(I,f,G,ag)};s.wait(i.getMessage("Please_wait___"));
window.setTimeout(av,1)};var ao=function(){var av=function(){G=false;
f=ap;d(I,f,G,ag)};s.wait(i.getMessage("Please_wait___"));
window.setTimeout(av,1)};var am=function(){var av=function(){G=true;
f=ap;d(I,f,G,ag)};s.wait(i.getMessage("Please_wait___"));
window.setTimeout(av,1)};if(!au.inserted){au.appendChild(ar);
au.appendChild(ah);au.appendChild(aq);ar.addEventListener("click",ai);
aq.addEventListener("click",ao);ah.addEventListener("click",am);
ar.textContent=at+" ";ar.href="javascript://nop/";aq.innerHTML="&#x25BE;";
aq.href="javascript://nop/";ah.innerHTML="&#x25B4;";
ah.href="javascript://nop/"}if(al&&!f||ap==f){window.setTimeout(ak,1)
}return au};var Z=o("div","scripttable",ac.name,ac.id,"main");
var Y=o("div","settingsth_fill",ac.name,ac.id,"thead_en");
var ae=o("div","settingsth_fill",ac.name,ac.id,"thead_fill1");
var X=P(ac,"thead_name",i.getMessage("Name"),"name");
var ad=o("div","settingsth_fill",ac.name,ac.id,"thead_fill");
var W=P(ac,"thead_score",i.getMessage("Rank"),"rank",true);
var V=o("div","settingsth",ac.name,ac.id,"thead_sites");
V.width="25%";V.textContent=i.getMessage("Sites");var U=P(ac,"thead_installs",i.getMessage("Installs"),"installs");
var T=P(ac,"thead_rating",i.getMessage("Rating"),"rating");
var S=P(ac,"thead_fans",i.getMessage("Fans"),"fans");
var R=P(ac,"thead_timestamp",i.getMessage("Last_Changed"),"timestamp");
var Q=o("div","settingsth",ac.name,ac.id,"thead_homepage");
Q.textContent=i.getMessage("Homepage");if(!Z.inserted){aa=aa.concat([Y,ae,ad,X,W,V,U,T,S,R]);
var O=o("div","settingstr filler",ac.name,ac.id,"filler");
for(var ab=0;ab<aa.length;ab++){O.appendChild(aa[ab])
}Z.appendChild(O)}return Z};var y=function(ab,aj,ac){var am=null;
var aq=null;var P=[];var S=function(at){var ar=null;
if(at.scriptTab){ar=F();K=ar}else{ar=o("table","settingstable",at.name,at.id,"main");
var au=o("tr","settingstr filler",at.name,at.id,"filler");
ar.appendChild(au)}return ar};var T=null;var Y=null;
for(var af in ab){var ah=ab[af];if(ah.id===undefined){ah.id="item"+af
}if(e){console.log("fire: process Item "+ah.name)}var N=o("tr","settingstr",ah.name,ah.id,"outer");
if(ah.divider){N=null}else{var ap=x("td",ah.name,ah.id,"0");
N.appendChild(ap);var Q=x("td",ah.name,ah.id,"1");var ad=ah.icon||ah.icon64||ah.image;
if(ad){Q.setAttribute("class","imagetd");if(ah.id&&ah.userscript){var ak=B.createImage(ad,ah.name,ah.id);
ak.oldvalue=ah.enabled;Q.appendChild(ak)}else{Q.appendChild(B.createImage(ad,ah.name,ah.id))
}}if(ah.option){v[ah.id]=ah.checkbox?ah.enabled:ah.value
}var O=o("td","settingstd",ah.name,ah.id,"2");N.appendChild(O);
if(ah.heading){var ai=x("span",ah.name,ah.id,"heading");
if(!ai.inserted){ai.textContent=ah.name;var X=S(ah);
am=o("tbody","settingstbody",ah.name,ah.id,"tbody");
X.appendChild(am);aq=x("div",ah.name,ah.id,"tab_content");
aq.appendChild(X);aj.appendTab(C.createUniqueId(ah.name,ah.id),ai,aq)
}N=null}else{if(ah.section){if(ah.endsection){continue
}var aa=o("div","section"+(ah.width?" section_width"+ah.width:""),ah.name,ah.id);
var ai=o("b","section_head",ah.name,ah.id,"head");var an=o("div","section_content",ah.name,ah.id,"content");
ai.textContent=ah.name;aa.appendChild(ai);aa.appendChild(an);
if(Y==null){Y=o("div","section_table","","");O.appendChild(Y);
O.setAttribute("class","section_td")}Y.appendChild(aa);
T=an;Q=null}else{if(ah.userscript){P.push({item:ah,tabv:aj});
N=null}else{if(ah.fireInfo){var al=o("span",ah.name,ah.id);
al.innerHTML=ah.value;a=new Date(ah.versionDB);if(T){T.appendChild(al);
N=null}else{O.appendChild(al)}}else{if(ah.fireUpdate){var ae=function(){A(false)
};var ao=function(){A(true)};var W=B.createButton(ah.name,ah.id,ah.name,ae);
var V=B.createButton(ah.fname,ah.id,ah.fname,ao);if(T){T.appendChild(W);
T.appendChild(V);N=null}else{O.appendChild(W);O.appendChild(V)
}}else{if(ah.search){g=ah.value;var U=x("div","search","box","");
U.appendChild(B.createSearchBox(g));N=null}else{if(ah.version){version=ah.value;
N=null;var R=o("div","version","version","version");
R.textContent="v"+version+" by Jan Biniok"}else{var ag=x("span",ah.name,ah.id);
ag.textContent=ah.name;O.setAttribute("colspan","2");
O.appendChild(ag)}}}}}}}if(N){if(Q){N.insertBefore(Q,ap)
}if(O){N.appendChild(O,ap)}N.removeChild(ap)}}if(am&&N){am.appendChild(N)
}}I=P;var Z=function(){d(I,null,null,ac)};window.setTimeout(Z,1);
if(e){console.log("sort done!")}};var D=function(W,U){if(!W){console.log("fire: items is empty!");
return}E=W;var O=document.getElementById("fire");var R=o("div","","fire","main");
if(O){var N=O.parentNode;N.removeChild(O);N.appendChild(R);
document.body.setAttribute("class","main")}if(e){console.log("fire: head")
}var Z=o("div","head_container","fire","head_container");
var S=o("div","tv_container","fire","tv_container");
var X=x("a","head_link","fire","head_link");X.href="http://tampermonkey.net";
X.target="_blank";var aa=o("div","float margin4","fire","head1");
var Q=o("img","banner","fire");Q.src=chrome.extension.getURL("images/icon128.png");
var Y=o("div","float head margin4","fire","head2");
var ac=x("div","fire");var T=o("div","version","version","version");
T.textContent=" by Jan Biniok";var ab=x("div","search","box","");
ac.textContent="TamperFire";aa.appendChild(Q);Y.appendChild(ac);
Y.appendChild(T);X.appendChild(aa);X.appendChild(Y);
Z.appendChild(X);Z.appendChild(ab);R.appendChild(Z);
R.appendChild(S);if(e){console.log("fire: tabView")
}var V=u.create("_main",S);if(e){console.log("fire: itemsToMenu")
}var P=function(){var ad=function(){if(U){console.log("fire: done! :)");
s.hide()}l=true};y(W,V,ad)};window.setTimeout(P,10)
};var q={name:function(O,N){return O},rank:function(O,N){return O.rank-N.rank
},installs:function(O,N){return O.installs-N.installs
},fans:function(O,N){return O.fans-N.fans},timestamp:function(N,O){return O.timestamp-N.timestamp
},rating:function(O,N){return O.rating-N.rating}};var d=function(P,Y,W,Z){if(e){console.log("sortScripts: start")
}if(Y===undefined||Y===null){Y="rank"}if(W===undefined||W===null){W=true
}var aa=v.fire_sort_cache_enabled?f+"_"+G.toString():"";
var ag=[];var R=0;var ac=v.fire_sort_cache_enabled?F(aa):null;
var X=v.fire_sort_cache_enabled?ac.inserted:false;var N,ae,Q,O,ab,af;
var V,U,S;var ad=K;if(v.fire_sort_cache_enabled){if(X&&e){console.log("use cached table "+aa)
}K.setAttribute("style",C.staticVars.invisible_move)
}if(v.fire_sort_cache_enabled){K.parentNode.insertBefore(ac,K);
K=ac;K.setAttribute("style",C.staticVars.visible_move)
}var T=null;if(!X){T=o("div","scripttbody","new",aa,"tbody");
if(K){K.appendChild(T)}}V=function(){if(e){console.log("sortScripts: delay 0")
}for(var ah=0;ah<P.length;ah++){af=P[ah].tabv;ae=P[ah].item;
ae.id=ae.id+aa;N=o("div","scripttr",ae.name,ae.id,"outer");
if(v.fire_sort_cache_enabled||!N.inserted){Q=o("div","scripttd",ae.name,ae.id,"1");
O=o("div","scripttd",ae.name,ae.id,"2");ab=ae.icon||ae.icon64||ae.image;
if(ab){Q.setAttribute("class","scripttd imagetd");Q.appendChild(B.createImage(ab,ae.name,ae.id))
}N.appendChild(Q);N.appendChild(O);j(af,ae,N)}R++;ag.push({tr:N,installs:ae["uso:installs"],fans:ae["uso:fans"],timestamp:ae["uso:timestamp"],rating:ae["uso:rating"],rank:ae.rank})
}if(e){console.log("sortScripts: delay 0.1")}ag=ag.sort(q[Y]);
if(e){console.log("sortScripts: delay 0.2")}if(W){ag=ag.reverse()
}window.setTimeout(U,100)};U=function(){if(e){console.log("sortScripts: delay 1")
}if(v.fire_sort_cache_enabled){for(var ah=0;ah<R;ah++){T.__appendChild(ag[ah].tr)
}window.setTimeout(S,100)}else{var ak=o("div","","dummy","dummy");
T.appendChild(ak);var ai=0;var aj=function(){var am=0;
var al=(new Date()).getTime()+15000;while((new Date()).getTime()<al&&(am<R)){for(am=ai;
(am<R)&&(ai+100>am);am++){T.__insertBefore(ag[am].tr,ak)
}ai=am}if(am<R){console.log("puhhhhh: sorting is hard work...");
window.setTimeout(aj,1)}else{T.removeChild(ak);window.setTimeout(S,100)
}};aj()}};S=function(){if(e){console.log("sortScripts: end")
}ag=[];var ah=function(){if(Z){Z()}};window.setTimeout(ah,100)
};window.setTimeout(X||P.length==0?S:V,100)};var M=function(Y,V,T){var S=x("div",Y.name,Y.id,"script_editor_h");
S.textContent="USO";var X=x("div",Y.name,Y.id,"script_editor_c");
var N=o("tr","editor_container p100100",Y.name,Y.id,"container");
var aa=o("tr","",Y.name,Y.id,"container_menu");var W=o("table","editor_container_o p100100",Y.name,Y.id,"container_o");
var Z=o("td","editor_outer",Y.name,Y.id,"script_info");
var R=o("td","editor",Y.name,Y.id,"script_info");var Q;
W.appendChild(aa);W.appendChild(N);X.appendChild(W);
var P=o("td","editormenu",Y.name,Y.id,"editormenu");
Z.appendChild(R);N.appendChild(Z);aa.appendChild(P);
var U=B.createButton(Y.name,"close_script",i.getMessage("Close"),T);
var O=function(){var ac=function(ad){if(ad.found){}else{alert(i.getMessage("Unable_to_get_UserScript__Sry_"))
}};c({method:"installScript",url:"http://userscripts.org/scripts/source/"+Y["uso:script"]+".user.js"},ac)
};var ab=B.createButton(Y.name,"save",i.getMessage("Install"),O);
P.appendChild(ab);P.appendChild(U);Q=V.appendTab("script_editor_tab"+C.createUniqueId(Y.name,Y.id),S,X);
return{onShow:function(){var ac=document.createElement("iframe");
ac.setAttribute("class","script_iframe");ac.setAttribute("src","http://greasefire.userscripts.org/scripts/show/"+Y["uso:script"]);
R.innerHTML="";R.appendChild(ac)},onClose:function(){}}
};var J=function(P,ac,O,V,W){var Y=o("div","",ac.name,ac.id,"script_tab_head");
var U=C.decodeHtml(ac.name);var T=o("div","heading",ac.name,"heading");
var aa=o("img","nameNicon64",ac.name,"heading_icon");
var N=ac.icon64?ac.icon64:ac.icon;aa.src=N;var ab=o("div","nameNname64",ac.name,"heading_name");
ab.textContent=U;if(N){T.appendChild(aa)}T.appendChild(ab);
var X=o("div","author",ac.name,"author");if(ac.author){X.textContent="by "+C.decodeHtml(ac.author)
}else{if(ac.copyright){X.innerHTML="&copy; ";X.textContent+=C.decodeHtml(ac.copyright)
}}var af=o("table","noborder p100100",ac.name,"table");
var ah=o("tr","script_tab_head",ac.name,"tr1");var ag=o("tr","details",ac.name,"tr2");
var S=o("td","",ac.name,"td1");var ae=o("td","",ac.name,"td2");
T.appendChild(X);Y.appendChild(T);S.appendChild(Y);
ah.appendChild(S);ag.appendChild(ae);af.appendChild(ah);
af.appendChild(ag);V.appendChild(af);var ad={tv:"tv tv_alt",tv_table:"tv_table tv_table_alt",tr_tabs:"tr_tabs tr_tabs_alt",tr_content:"tr_content tr_content_alt",td_content:"td_content td_content_alt",td_tabs:"td_tabs td_tabs_alt",tv_tabs_align:"tv_tabs_align tv_tabs_align_alt",tv_tabs_fill:"tv_tabs_fill tv_tabs_fill_alt",tv_tabs_table:"tv_tabs_table tv_tabs_table_alt",tv_contents:"tv_contents tv_contents_alt",tv_tab_selected:"tv_tab tv_selected tv_tab_alt tv_selected_alt",tv_tab_close:"",tv_tab:"tv_tab tv_tab_alt",tv_content:"tv_content tv_content_alt"};
var R=u.create("_details"+C.createUniqueId(ac.name,ac.id),ae,ad);
var Z=M(ac,R,W);var Q=function(aj){var ai=false;if(aj.type!="keydown"){return
}if(aj.keyCode==27){if(P.isSelected()){window.setTimeout(W,100)
}ai=true}if(ai){aj.stopPropagation()}};return{onShow:function(){if(Z.onShow){Z.onShow()
}window.addEventListener("keydown",Q,false)},onClose:function(){if(Z.onClose){if(Z.onClose()){return true
}}window.removeEventListener("keydown",Q,false)}}};
var j=function(ag,ad,Q){var R;var ak;var an=o("span","clickable",ad.name,ad.id,"sname");
var T=o("span","",ad.name,ad.id,"sname_name");var S;
var O=ad.homepage?ad.homepage:(ad.namespace&&ad.namespace.search("http://")==0?ad.namespace:null);
var X="http://userscripts.org/scripts/show/"+ad["uso:script"]+"/";
S=x("a",ad.name,ad.id,"sname_name_a");if(!S.inserted){S.setAttribute("target","_blank");
T.appendChild(S)}var V=C.decodeHtml(ad.name);S.textContent=((V.length>35)?V.substr(0,35)+"...":V);
an.appendChild(T);var ao=[];var am=function(ap,au,at,ar){if(!ar){ar="scripttd"
}var aq=o("div",ar,ap.name,ap.id,at);if(au){aq.appendChild(au)
}return aq};var Z=function(){if(ak.onClose&&ak.onClose()){return
}if(R){R.hide()}};var aj=function(){var ap=o("div","",ad.name,ad.id,"details_h");
ap.textContent=((V.length>25)?V.substr(0,25)+"...":V);
var aq=x("div",ad.name,ad.id,"details_c");R=ag.insertTab(null,"details_"+C.createUniqueId(ad.name,ad.id),ap,aq,null,Z);
ak=J(R,ad,Q,aq,Z)};var af=function(ap){if(!R){aj()}if(ak.onShow){ak.onShow()
}R.show();if(ap.button!=1){R.select()}};var ae=x("span",ad.name,ad.id,"srank");
var ai=x("span",ad.name,ad.id,"sinstalls");var N=x("span",ad.name,ad.id,"srating");
var ah=x("span",ad.name,ad.id,"sfans");var ac=x("span",ad.name,ad.id,"stimestamp");
var P=x("span",ad.name,ad.id,"shomepage");var W=x("a",ad.name,ad.id,"shomepage_a");
ad.rank=p(ad);ae.textContent=H(ad.rank*100,1);ai.textContent=ad["uso:installs"];
N.textContent=ad["uso:rating"];ah.textContent=ad["uso:fans"];
var aa=function(ap){var aq="0"+ap;return aq.substr(aq.length-2,2)
};var al=function(ay,aw){var ar=1000*60*60;var aq=1000*60*60*24;
var at=ay.getTime();var ap=aw.getTime();var ax=Math.abs(at-ap);
var au=Math.round(ax/ar);var av=Math.round(ax/aq);if(au<=48){return au+" h"
}else{return av+" d"}};if(ad["uso:timestamp"]!=0){ac.textContent=al(a,new Date(ad["uso:timestamp"]))
}P.appendChild(W);if(!W.inserted){W.setAttribute("href",O);
W.setAttribute("target","_blank");P.appendChild(S)}var U=am(ad,an,"script_td2","scripttd scripttd_name clickable");
U.addEventListener("click",af);U.title=ad.description?V+"\n\n"+C.decodeHtml(ad.description):V;
ao.push(U);ao.push(am(ad,ae,"script_td3"));ao.push(am(ad,t(ad),"script_td4"));
ao.push(am(ad,ai,"script_td5"));ao.push(am(ad,N,"script_td6"));
ao.push(am(ad,ah,"script_td7"));ao.push(am(ad,ac,"script_td8"));
ao.push(am(ad,P,"script_td9"));for(var ab=ao.length;
ab<10;ab++){ao.push(o("div","scripttd",ad.name,ad.id,"script_filler_"+ab))
}Q.appendChild(o("div","scripttd",ad.name,ad.id,"script_prefiller_2"));
for(var Y=0;Y<ao.length;Y++){Q.appendChild(ao[Y])}return ao
};var t=function(V){var ab=x("span",V.name,V.id,"site_images",true);
var R=function(ah){if(ah.search("http")!=0){ah="http://"+ah
}var ad=ah.split("/");if(ad.length<3){return null}var aj=ad[2].split(".");
if(aj.length<2){return null}var ae=aj[aj.length-1];
var ai=aj[aj.length-2];var ag=[];for(var af=aj.length-3;
af>=0;af--){if(aj[af].search("\\*")!=-1){break}ag.push(aj[af])
}return{tld:ae,dom:ai,predom:ag.reverse()}};if(V.includes){var Z=0;
for(var Q=0;Q<V.includes.length;Q++){var S=V.includes[Q];
if(S.search(/htt(ps|p):\/\/(\*\/\*|\*)*$/)!=-1||S=="*"){var W=B.createImage(chrome.extension.getURL("images/web.png"),V.name,V.id,V.includes[Q],V.includes[Q]);
ab.appendChild(W);break;continue}var P=R(S);if(P==null){continue
}var U=false;for(var O=0;O<Q;O++){var N=V.includes[O];
var ac=R(N);if(ac==null){continue}if(ac.dom==P.dom){U=true;
break}}if(!U){var T="com";var X="";if(P.tld!="*"&&P.tld!="tld"){T=P.tld
}if(P.predom.length){X=P.predom.join(".")+"."}var Y=("http://"+X+P.dom+"."+T+"/favicon.ico").replace(/\*/g,"");
if(Y.search("http://userscripts.org/")==0||Y.search("http://userscripts.com/")==0){Y="http://userscripts.org/images/script_icon.png"
}var W=B.createImage(Y,V.name,V.id,V.includes[Q],V.includes[Q]);
ab.appendChild(W);Z++}if(Z>7){var aa=o("span",V.name,V.id,"tbc");
aa.textContent="...";ab.appendChild(aa);break}}}return ab
};var n=function(P,N){if(e){console.log("run getFireItems")
}try{var O={method:"getFireItems",tabid:P,url:N};if(e){console.log("getFireItems sendReq")
}var Q=function(U){try{var Y=true;if(U.progress){var T=U.progress.action+"... ";
if(!T||T==""){T=""}var X="";if(U.progress.state&&U.progress.state.of){X=" "+Math.round(U.progress.state.n*100/U.progress.state.of)+"%"
}var Z=(T!=""||X!="")?T+X:i.getMessage("Please_wait___");
s.wait(Z);var S=function(){n(P,N)};window.setTimeout(S,2000);
Y=false}if(U.scripts){D(U.scripts,Y);if(e){console.log("createFireMenu done!")
}}if(U.image){var W=o("img","banner","fire");W.src=U.image
}U=null}catch(V){console.log(V);throw V}};c(O,Q);s.wait(null)
}catch(R){console.log("mSo: "+R.message)}};var A=function(Q,N){if(e){console.log("run startFireUpdate")
}try{var P={method:"startFireUpdate",force:Q};var O=function(){n(h,g)
};c(P,function(S){if(S.suc===false){s.hide();alert(i.getMessage("TamperFire_is_up_to_date_"))
}else{window.setTimeout(O,1000)}});s.wait(i.getMessage("Please_wait___"))
}catch(R){console.log("mSo: "+R.message)}};chrome.extension.onMessage.addListener(function(P,O,N){if(e){console.log("f: method "+P.method)
}if(P.method=="confirm"){var Q=function(R){N({confirm:R})
};C.confirm(P.msg,Q)}else{if(P.method=="showMsg"){alert(P.msg);
N({})}else{if(e){console.log("f: "+i.getMessage("Unknown_method_0name0",P.method))
}return false}}return true});var z=function(){window.removeEventListener("DOMContentLoaded",z,false);
window.removeEventListener("load",z,false);var O=function(){n(h,g)
};var N=function(){if(confirm(i.getMessage("An_internal_error_occured_Do_you_want_to_visit_the_forum_"))){window.location.href="http://tampermonkey.net/bug"
}};m.ping(O,N);s.wait(i.getMessage("Please_wait___"))
};window.addEventListener("DOMContentLoaded",z,false);
window.addEventListener("load",z,false);h=b();g=decodeURIComponent(k(encodeURI(g)))
})();