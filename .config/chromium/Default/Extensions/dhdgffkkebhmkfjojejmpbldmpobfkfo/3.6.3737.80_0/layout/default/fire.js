
if(!window.requestFileSystem){window.requestFileSystem=window.webkitRequestFileSystem
}if(!window.BlobBuilder){window.BlobBuilder=window.WebKitBlobBuilder
}Registry.require(["layout","pingpong","crcrc","curtain","tabview","htmlutil","helper","convert","i18n"],function(){var f=Registry.get("crcrc").cr;
var d=Registry.get("crcrc").crc;var e=Registry.get("curtain");
var b=Registry.get("helper");var j=Registry.get("tabview");
var c=Registry.get("convert");var i=Registry.get("htmlutil");
var a=Registry.get("pingpong");var g=Registry.get("i18n");
var h=Registry.get("layout");h.render(function(L){var E=function(){var P=document.createElement("style");
P.innerHTML=Registry.getRaw("/layout/default/style.css");
(document.head||document.body||document.documentElement||document).appendChild(P)
};E();var s=(function(){return{get:function(P){return chrome.extension.getURL("/layout/default/"+({download:"images/download.gif",fire:"images/fire.png",info:"images/info.png",script_download:"images/script_download.png",script_add:"images/script_add.png",bug:"images/bug.png",donation:"images/amor.png",critical:"images/critical.png",update:"images/update.png",utilities:"images/agt_utilities.png",edit_add:"images/edit_add.png",button_ok:"images/button_ok.png",menu_cmd:"images/package_utilities.png"}[P]))
}}})();var n=false;var o=false;var y=null;var C=null;
var O=null;var w=true;var K="rank";var p={};var B=0;
var k="http://...";var r=new Date();var N=b.getUrlArgs();
var I=function(P,Q){if(Q){P.setAttribute("style",b.staticVars.visible);
P.vis=true}else{P.setAttribute("style",b.staticVars.invisible);
P.vis=false}};var l=function(P){return N.tab?N.tab:P
};var G=function(P){return N.url?N.url:P};var x=function(V){var T=0;
var Z=0;var ab=0;var U=0;var Q=(new Date()).getTime();
var X=24*60*60*1000;var aa=7*X;var R=30*X;if(V["uso:timestamp"]){var ac=V["uso:timestamp"];
if(Q-aa<ac){T=1}else{if(Q-R<ac){T=0.96}else{if(Q-6*R<ac){T=0.9
}else{if(Q-24*R<ac){T=0.7}else{T=0}}}}}var ad=V["uso:installs"];
if(ad>500000){Z=1}else{if(ad>100000){Z=0.95}else{if(ad>50000){Z=0.9
}else{if(ad>10000){Z=0.88}else{if(ad>1000){Z=0.8}else{Z=0.5*(ad/1000)
}}}}}var S=V["uso:fans"];if(S>5&&ad>333){var W=ad/S;
if(W<333){ab=1}else{if(W<1000){ab=0.9}else{if(W<3000){ab=0.85
}else{if(W<10000){ab=0.8}else{ab=0.5*(10000/W)}}}}}var Y=Number(V["uso:rating"]);
U=Y>4?1:Y/5;var P=0.25*T+0.35*Z+0.15*ab+0.25*U;return P
};var M=function(R,Q){R=parseFloat(R);if(!isNaN(R)){if(!Q){var Q=0
}var P=Math.pow(10,Q);return Math.floor(R*P+((R*P*10)%10>=5?1:0))/P
}else{return R}};var v=function(P){if(P==undefined){P=""
}var ae={id:"new",name:P};var ac=[];var R=function(al,ah,av,ar,an){var aw=d("div","settingsth",al.name,al.id,ah);
var ap=function(aA,ax,az){var ay=document.getElementsByName("settingsth_a_up"+al.name);
var aD=document.getElementsByName("settingsth_a_down"+al.name);
var aC;var aB;for(var aE=0;aE<ay.length;aE++){ay[aE].style.display="none"
}for(var aE=0;aE<aD.length;aE++){aD[aE].style.display="none"
}if(w){ax.style.display=""}else{az.style.display=""
}};var au=d("a","settingsth_a",al.name,al.id,ah+"_a");
au.setAttribute("name","settingsth_a"+al.name);var at=d("a","settingsth_a_up",al.name,al.id,ah+"_a_up");
at.setAttribute("name","settingsth_a_up"+al.name);var aj=d("a","settingsth_a_down",al.name,al.id,ah+"_a_down");
aj.setAttribute("name","settingsth_a_down"+al.name);
at.style.display="none";aj.style.display="none";var am=function(){ap(au,at,aj)
};var ai=function(){am();e.hide()};var ak=function(){var ax=function(){K=ar;
t(C,K,w,ai)};e.wait(g.getMessage("Please_wait___"));
window.setTimeout(ax,1)};var aq=function(){var ax=function(){w=false;
K=ar;t(C,K,w,ai)};e.wait(g.getMessage("Please_wait___"));
window.setTimeout(ax,1)};var ao=function(){var ax=function(){w=true;
K=ar;t(C,K,w,ai)};e.wait(g.getMessage("Please_wait___"));
window.setTimeout(ax,1)};if(!aw.inserted){aw.appendChild(au);
aw.appendChild(aj);aw.appendChild(at);au.addEventListener("click",ak);
at.addEventListener("click",aq);aj.addEventListener("click",ao);
au.textContent=av+" ";au.href="javascript://nop/";at.innerHTML="&#x25BE;";
at.href="javascript://nop/";aj.innerHTML="&#x25B4;";
aj.href="javascript://nop/"}if(an&&!K||ar==K){window.setTimeout(am,1)
}return aw};var ab=d("div","scripttable",ae.name,ae.id,"main");
var aa=d("div","settingsth_fill",ae.name,ae.id,"thead_en");
var ag=d("div","settingsth_fill",ae.name,ae.id,"thead_fill1");
var Z=R(ae,"thead_name",g.getMessage("Name"),"name");
var af=d("div","settingsth_fill",ae.name,ae.id,"thead_fill");
var Y=R(ae,"thead_score",g.getMessage("Rank"),"rank",true);
var X=d("div","settingsth",ae.name,ae.id,"thead_sites");
X.width="25%";X.textContent=g.getMessage("Sites");var W=R(ae,"thead_installs",g.getMessage("Installs"),"installs");
var V=R(ae,"thead_rating",g.getMessage("Rating"),"rating");
var U=R(ae,"thead_fans",g.getMessage("Fans"),"fans");
var T=R(ae,"thead_timestamp",g.getMessage("Last_Changed"),"timestamp");
var S=d("div","settingsth",ae.name,ae.id,"thead_homepage");
S.textContent=g.getMessage("Homepage");if(!ab.inserted){ac=ac.concat([aa,ag,af,Z,Y,X,W,V,U,T]);
var Q=d("div","settingstr filler",ae.name,ae.id,"filler");
for(var ad=0;ad<ac.length;ad++){Q.appendChild(ac[ad])
}ab.appendChild(Q)}return ab};var D=function(ad,al,ae){var ao=null;
var at=null;var R=[];var U=function(av){var au=null;
if(av.scriptTab){au=v();O=au}else{au=d("table","settingstable",av.name,av.id,"main");
var aw=d("tr","settingstr filler",av.name,av.id,"filler");
au.appendChild(aw)}return au};var V=null;var aa=null;
for(var ah in ad){var aj=ad[ah];if(aj.id===undefined){aj.id="item"+ah
}if(n){console.log("fire: process Item "+aj.name)}var P=d("tr","settingstr",aj.name,aj.id,"outer");
if(aj.divider){P=null}else{var ar=f("td",aj.name,aj.id,"0");
P.appendChild(ar);var S=f("td",aj.name,aj.id,"1");var af=aj.icon||aj.icon64||aj.image;
if(af){S.setAttribute("class","imagetd");if(aj.id&&aj.userscript){var am=i.createImage(af,aj.name,aj.id);
am.oldvalue=aj.enabled;S.appendChild(am)}else{S.appendChild(i.createImage(af,aj.name,aj.id))
}}if(aj.option){p[aj.id]=aj.checkbox?aj.enabled:aj.value
}var Q=d("td","settingstd",aj.name,aj.id,"2");P.appendChild(Q);
if(aj.heading){var ak=f("span",aj.name,aj.id,"heading");
if(!ak.inserted){ak.textContent=aj.name;var Z=U(aj);
ao=d("tbody","settingstbody",aj.name,aj.id,"tbody");
Z.appendChild(ao);at=f("div",aj.name,aj.id,"tab_content");
at.appendChild(Z);al.appendTab(b.createUniqueId(aj.name,aj.id),ak,at)
}P=null}else{if(aj.section){if(aj.endsection){continue
}var ac=d("div","section"+(aj.width?" section_width"+aj.width:""),aj.name,aj.id);
var ak=d("b","section_head",aj.name,aj.id,"head");var ap=d("div","section_content",aj.name,aj.id,"content");
ak.textContent=aj.name;ac.appendChild(ak);ac.appendChild(ap);
if(aa==null){aa=d("div","section_table","","");Q.appendChild(aa);
Q.setAttribute("class","section_td")}aa.appendChild(ac);
V=ap;S=null}else{if(aj.userscript){R.push({item:aj,tabv:al});
P=null}else{if(aj.fireInfo){var an=d("span",aj.name,aj.id);
an.innerHTML=aj.value;r=new Date(aj.versionDB);if(V){V.appendChild(an);
P=null}else{Q.appendChild(an)}}else{if(aj.fireUpdate){var ag=function(){F(false)
};var aq=function(){F(true)};var Y=i.createButton(aj.name,aj.id,aj.name,ag);
var X=i.createButton(aj.fname,aj.id,aj.fname,aq);if(V){V.appendChild(Y);
V.appendChild(X);P=null}else{Q.appendChild(Y);Q.appendChild(X)
}}else{if(aj.search){k=aj.value;var W=f("div","search","box","");
W.appendChild(i.createSearchBox(k));P=null}else{if(aj.version){version=aj.value;
P=null;var T=d("div","version","version","version");
T.textContent="v"+version+" by Jan Biniok"}else{var ai=f("span",aj.name,aj.id);
ai.textContent=aj.name;Q.setAttribute("colspan","2");
Q.appendChild(ai)}}}}}}}if(P){if(S){P.insertBefore(S,ar)
}if(Q){P.appendChild(Q,ar)}P.removeChild(ar)}}if(ao&&P){ao.appendChild(P)
}}C=R;var ab=function(){t(C,null,null,ae)};window.setTimeout(ab,1);
if(n){console.log("sort done!")}};var J=function(Y,W){if(!Y){console.log("fire: items is empty!");
return}y=Y;var Q=document.getElementById("fire");var T=d("div","","fire","main");
if(Q){var P=Q.parentNode;P.removeChild(Q);P.appendChild(T);
document.body.setAttribute("class","main")}if(n){console.log("fire: head")
}var ab=d("div","head_container","fire","head_container");
var U=d("div","tv_container","fire","tv_container");
var Z=f("a","head_link","fire","head_link");Z.href="http://tampermonkey.net";
Z.target="_blank";var ac=d("div","float margin4","fire","head1");
var S=d("img","banner","fire");S.src=chrome.extension.getURL("images/icon128.png");
var aa=d("div","float head margin4","fire","head2");
var ae=f("div","fire");var V=d("div","version","version","version");
V.textContent=" by Jan Biniok";var ad=f("div","search","box","");
ae.textContent="TamperFire";ac.appendChild(S);aa.appendChild(ae);
aa.appendChild(V);Z.appendChild(ac);Z.appendChild(aa);
ab.appendChild(Z);ab.appendChild(ad);T.appendChild(ab);
T.appendChild(U);if(n){console.log("fire: tabView")
}var X=j.create("_main",U);if(n){console.log("fire: itemsToMenu")
}var R=function(){var af=function(){if(W){console.log("fire: done! :)");
e.hide()}o=true};D(Y,X,af)};window.setTimeout(R,10)
};var q={name:function(Q,P){return Q},rank:function(Q,P){return Q.rank-P.rank
},installs:function(Q,P){return Q.installs-P.installs
},fans:function(Q,P){return Q.fans-P.fans},timestamp:function(P,Q){return Q.timestamp-P.timestamp
},rating:function(Q,P){return Q.rating-P.rating}};var t=function(R,aa,Y,ab){if(n){console.log("sortScripts: start")
}if(aa===undefined||aa===null){aa="rank"}if(Y===undefined||Y===null){Y=true
}var ac=p.fire_sort_cache_enabled?K+"_"+w.toString():"";
var ai=[];var T=0;var ae=p.fire_sort_cache_enabled?v(ac):null;
var Z=p.fire_sort_cache_enabled?ae.inserted:false;var P,ag,S,Q,ad,ah;
var X,W,U;var af=O;if(p.fire_sort_cache_enabled){if(Z&&n){console.log("use cached table "+ac)
}O.setAttribute("style",b.staticVars.invisible_move)
}if(p.fire_sort_cache_enabled){O.parentNode.insertBefore(ae,O);
O=ae;O.setAttribute("style",b.staticVars.visible_move)
}var V=null;if(!Z){V=d("div","scripttbody","new",ac,"tbody");
if(O){O.appendChild(V)}}X=function(){if(n){console.log("sortScripts: delay 0")
}for(var aj=0;aj<R.length;aj++){ah=R[aj].tabv;ag=R[aj].item;
ag.id=ag.id+ac;P=d("div","scripttr",ag.name,ag.id,"outer");
if(p.fire_sort_cache_enabled||!P.inserted){S=d("div","scripttd",ag.name,ag.id,"1");
Q=d("div","scripttd",ag.name,ag.id,"2");ad=ag.icon||ag.icon64||ag.image;
if(ad){S.setAttribute("class","scripttd imagetd");S.appendChild(i.createImage(ad,ag.name,ag.id))
}P.appendChild(S);P.appendChild(Q);H(ah,ag,P)}T++;ai.push({tr:P,installs:ag["uso:installs"],fans:ag["uso:fans"],timestamp:ag["uso:timestamp"],rating:ag["uso:rating"],rank:ag.rank})
}if(n){console.log("sortScripts: delay 0.1")}ai=ai.sort(q[aa]);
if(n){console.log("sortScripts: delay 0.2")}if(Y){ai=ai.reverse()
}window.setTimeout(W,100)};W=function(){if(n){console.log("sortScripts: delay 1")
}if(p.fire_sort_cache_enabled){for(var aj=0;aj<T;aj++){V.__appendChild(ai[aj].tr)
}window.setTimeout(U,100)}else{var am=d("div","","dummy","dummy");
V.appendChild(am);var ak=0;var al=function(){var ao=0;
var an=(new Date()).getTime()+15000;while((new Date()).getTime()<an&&(ao<T)){for(ao=ak;
(ao<T)&&(ak+100>ao);ao++){V.__insertBefore(ai[ao].tr,am)
}ak=ao}if(ao<T){console.log("puhhhhh: sorting is hard work...");
window.setTimeout(al,1)}else{V.removeChild(am);window.setTimeout(U,100)
}};al()}};U=function(){if(n){console.log("sortScripts: end")
}ai=[];var aj=function(){if(ab){ab()}};window.setTimeout(aj,100)
};window.setTimeout(Z||R.length==0?U:X,100)};var A=function(aa,X,V){var U=f("div",aa.name,aa.id,"script_editor_h");
U.textContent="USO";var Z=f("div",aa.name,aa.id,"script_editor_c");
var P=d("tr","editor_container p100100",aa.name,aa.id,"container");
var ac=d("tr","",aa.name,aa.id,"container_menu");var Y=d("table","editor_container_o p100100",aa.name,aa.id,"container_o");
var ab=d("td","editor_outer",aa.name,aa.id,"script_info");
var T=d("td","editor",aa.name,aa.id,"script_info");
var S;Y.appendChild(ac);Y.appendChild(P);Z.appendChild(Y);
var R=d("td","editormenu",aa.name,aa.id,"editormenu");
ab.appendChild(T);P.appendChild(ab);ac.appendChild(R);
var W=i.createButton(aa.name,"close_script",g.getMessage("Close"),V);
var Q=function(){var ae=function(af){if(af.found){}else{alert(g.getMessage("Unable_to_get_UserScript__Sry_"))
}};sendMessage({method:"installScript",url:"http://userscripts.org/scripts/source/"+aa["uso:script"]+".user.js"},ae)
};var ad=i.createButton(aa.name,"save",g.getMessage("Install"),Q);
R.appendChild(ad);R.appendChild(W);S=X.appendTab("script_editor_tab"+b.createUniqueId(aa.name,aa.id),U,Z);
return{onShow:function(){var ae=document.createElement("iframe");
ae.setAttribute("class","script_iframe");ae.setAttribute("src","http://greasefire.userscripts.org/scripts/show/"+aa["uso:script"]);
T.innerHTML="";T.appendChild(ae)},onClose:function(){}}
};var z=function(R,ae,Q,X,Y){var aa=d("div","",ae.name,ae.id,"script_tab_head");
var W=b.decodeHtml(ae.name);var V=d("div","heading",ae.name,"heading");
var ac=d("img","nameNicon64",ae.name,"heading_icon");
var P=ae.icon64?ae.icon64:ae.icon;ac.src=P;var ad=d("div","nameNname64",ae.name,"heading_name");
ad.textContent=W;if(P){V.appendChild(ac)}V.appendChild(ad);
var Z=d("div","author",ae.name,"author");if(ae.author){Z.textContent="by "+b.decodeHtml(ae.author)
}else{if(ae.copyright){Z.innerHTML="&copy; ";Z.textContent+=b.decodeHtml(ae.copyright)
}}var ah=d("table","noborder p100100",ae.name,"table");
var aj=d("tr","script_tab_head",ae.name,"tr1");var ai=d("tr","details",ae.name,"tr2");
var U=d("td","",ae.name,"td1");var ag=d("td","",ae.name,"td2");
V.appendChild(Z);aa.appendChild(V);U.appendChild(aa);
aj.appendChild(U);ai.appendChild(ag);ah.appendChild(aj);
ah.appendChild(ai);X.appendChild(ah);var af={tv:"tv tv_alt",tv_table:"tv_table tv_table_alt",tr_tabs:"tr_tabs tr_tabs_alt",tr_content:"tr_content tr_content_alt",td_content:"td_content td_content_alt",td_tabs:"td_tabs td_tabs_alt",tv_tabs_align:"tv_tabs_align tv_tabs_align_alt",tv_tabs_fill:"tv_tabs_fill tv_tabs_fill_alt",tv_tabs_table:"tv_tabs_table tv_tabs_table_alt",tv_contents:"tv_contents tv_contents_alt",tv_tab_selected:"tv_tab tv_selected tv_tab_alt tv_selected_alt",tv_tab_close:"",tv_tab:"tv_tab tv_tab_alt",tv_content:"tv_content tv_content_alt"};
var T=j.create("_details"+b.createUniqueId(ae.name,ae.id),ag,af);
var ab=A(ae,T,Y);var S=function(al){var ak=false;if(al.type!="keydown"){return
}if(al.keyCode==27){if(R.isSelected()){window.setTimeout(Y,100)
}ak=true}if(ak){al.stopPropagation()}};return{onShow:function(){if(ab.onShow){ab.onShow()
}window.addEventListener("keydown",S,false)},onClose:function(){if(ab.onClose){if(ab.onClose()){return true
}}window.removeEventListener("keydown",S,false)}}};
var H=function(ai,af,S){var T;var am;var ap=d("span","clickable",af.name,af.id,"sname");
var V=d("span","",af.name,af.id,"sname_name");var U;
var Q=af.homepage?af.homepage:(af.namespace&&af.namespace.search("http://")==0?af.namespace:null);
var Z="http://userscripts.org/scripts/show/"+af["uso:script"]+"/";
U=f("a",af.name,af.id,"sname_name_a");if(!U.inserted){U.setAttribute("target","_blank");
V.appendChild(U)}var X=b.decodeHtml(af.name);U.textContent=((X.length>35)?X.substr(0,35)+"...":X);
ap.appendChild(V);var aq=[];var ao=function(ar,aw,av,au){if(!au){au="scripttd"
}var at=d("div",au,ar.name,ar.id,av);if(aw){at.appendChild(aw)
}return at};var ab=function(){if(am.onClose&&am.onClose()){return
}if(T){T.hide()}};var al=function(){var ar=d("div","",af.name,af.id,"details_h");
ar.textContent=((X.length>25)?X.substr(0,25)+"...":X);
var at=f("div",af.name,af.id,"details_c");T=ai.insertTab(null,"details_"+b.createUniqueId(af.name,af.id),ar,at,null,ab);
am=z(T,af,S,at,ab)};var ah=function(ar){if(!T){al()
}if(am.onShow){am.onShow()}T.show();if(ar.button!=1){T.select()
}};var ag=f("span",af.name,af.id,"srank");var ak=f("span",af.name,af.id,"sinstalls");
var P=f("span",af.name,af.id,"srating");var aj=f("span",af.name,af.id,"sfans");
var ae=f("span",af.name,af.id,"stimestamp");var R=f("span",af.name,af.id,"shomepage");
var Y=f("a",af.name,af.id,"shomepage_a");af.rank=x(af);
ag.textContent=M(af.rank*100,1);ak.textContent=af["uso:installs"];
P.textContent=af["uso:rating"];aj.textContent=af["uso:fans"];
var ac=function(ar){var at="0"+ar;return at.substr(at.length-2,2)
};var an=function(aA,ay){var au=1000*60*60;var at=1000*60*60*24;
var av=aA.getTime();var ar=ay.getTime();var az=Math.abs(av-ar);
var aw=Math.round(az/au);var ax=Math.round(az/at);if(aw<=48){return aw+" h"
}else{return ax+" d"}};if(af["uso:timestamp"]!=0){ae.textContent=an(r,new Date(af["uso:timestamp"]))
}R.appendChild(Y);if(!Y.inserted){Y.setAttribute("href",Q);
Y.setAttribute("target","_blank");R.appendChild(U)}var W=ao(af,ap,"script_td2","scripttd scripttd_name clickable");
W.addEventListener("click",ah);W.title=af.description?X+"\n\n"+b.decodeHtml(af.description):X;
aq.push(W);aq.push(ao(af,ag,"script_td3"));aq.push(ao(af,u(af),"script_td4"));
aq.push(ao(af,ak,"script_td5"));aq.push(ao(af,P,"script_td6"));
aq.push(ao(af,aj,"script_td7"));aq.push(ao(af,ae,"script_td8"));
aq.push(ao(af,R,"script_td9"));for(var ad=aq.length;
ad<10;ad++){aq.push(d("div","scripttd",af.name,af.id,"script_filler_"+ad))
}S.appendChild(d("div","scripttd",af.name,af.id,"script_prefiller_2"));
for(var aa=0;aa<aq.length;aa++){S.appendChild(aq[aa])
}return aq};var u=function(X){var ad=f("span",X.name,X.id,"site_images",true);
var T=function(aj){if(aj.search("http")!=0){aj="http://"+aj
}var af=aj.split("/");if(af.length<3){return null}var al=af[2].split(".");
if(al.length<2){return null}var ag=al[al.length-1];
var ak=al[al.length-2];var ai=[];for(var ah=al.length-3;
ah>=0;ah--){if(al[ah].search("\\*")!=-1){break}ai.push(al[ah])
}return{tld:ag,dom:ak,predom:ai.reverse()}};if(X.includes){var ab=0;
for(var S=0;S<X.includes.length;S++){var U=X.includes[S];
if(U.search(/htt(ps|p):\/\/(\*\/\*|\*)*$/)!=-1||U=="*"){var Y=i.createImage(chrome.extension.getURL("images/web.png"),X.name,X.id,X.includes[S],X.includes[S]);
ad.appendChild(Y);break;continue}var R=T(U);if(R==null){continue
}var W=false;for(var Q=0;Q<S;Q++){var P=X.includes[Q];
var ae=T(P);if(ae==null){continue}if(ae.dom==R.dom){W=true;
break}}if(!W){var V="com";var Z="";if(R.tld!="*"&&R.tld!="tld"){V=R.tld
}if(R.predom.length){Z=R.predom.join(".")+"."}var aa=("http://"+Z+R.dom+"."+V+"/favicon.ico").replace(/\*/g,"");
if(aa.search("http://userscripts.org/")==0||aa.search("http://userscripts.com/")==0){aa="http://userscripts.org/images/script_icon.png"
}var Y=i.createImage(aa,X.name,X.id,X.includes[S],X.includes[S]);
ad.appendChild(Y);ab++}if(ab>7){var ac=d("span",X.name,X.id,"tbc");
ac.textContent="...";ad.appendChild(ac);break}}}return ad
};var m=function(R,P){if(n){console.log("run getFireItems")
}try{var Q={method:"getFireItems",tabid:R,url:P};if(n){console.log("getFireItems sendReq")
}var S=function(W){try{var aa=true;if(W.progress){var V=W.progress.action+"... ";
if(!V||V==""){V=""}var Z="";if(W.progress.state&&W.progress.state.of){Z=" "+Math.round(W.progress.state.n*100/W.progress.state.of)+"%"
}var ab=(V!=""||Z!="")?V+Z:g.getMessage("Please_wait___");
e.wait(ab);var U=function(){m(R,P)};window.setTimeout(U,2000);
aa=false}if(W.scripts){J(W.scripts,aa);if(n){console.log("createFireMenu done!")
}}if(W.image){var Y=d("img","banner","fire");Y.src=W.image
}W=null}catch(X){console.log(X);throw X}};sendMessage(Q,S);
e.wait(null)}catch(T){console.log("mSo: "+T.message)
}};var F=function(S,P){if(n){console.log("run startFireUpdate")
}try{var R={method:"startFireUpdate",force:S};var Q=function(){m(B,k)
};sendMessage(R,function(U){if(U.suc===false){e.hide();
alert(g.getMessage("TamperFire_is_up_to_date_"))}else{window.setTimeout(Q,1000)
}});e.wait(g.getMessage("Please_wait___"))}catch(T){console.log("mSo: "+T.message)
}};chrome.extension.onMessage.addListener(function(R,Q,P){if(n){console.log("f: method "+R.method)
}if(R.method=="confirm"){var S=function(T){P({confirm:T})
};b.confirm(R.msg,S)}else{if(R.method=="showMsg"){alert(R.msg);
P({})}else{if(n){console.log("f: "+g.getMessage("Unknown_method_0name0",R.method))
}return false}}return true});B=l();k=decodeURIComponent(G(encodeURI(k)));
m(B,k)})});