
if(!window.requestFileSystem){window.requestFileSystem=window.webkitRequestFileSystem
}Registry.require(["layout","xmlhttprequest","crcrc","curtain","tabview","htmlutil","helper","statistics","convert","i18n","syncinfo"],function(){var b=false;
var h=Registry.prepare();var i=Registry.get("crcrc").cr;
var g=Registry.get("crcrc").crc;var m=Registry.get("tabview");
var l=Registry.get("htmlutil");var a=Registry.get("statistics");
var e=Registry.get("convert");var c=Registry.get("syncinfo");
var f=Registry.get("curtain");var j=Registry.get("i18n");
var d=Registry.get("helper");var k=Registry.get("layout");
k.render(function(){var p=function(){var ap=document.createElement("style");
ap.innerHTML=Registry.getRaw("/layout/default/style.css");
(document.head||document.body||document.documentElement||document).appendChild(ap)
};p();var T=(function(){return{get:function(ap){return chrome.extension.getURL("/layout/default/"+({download:"images/download.gif",fire:"images/fire.png",info:"images/info.png",script_download:"images/script_download.png",script_add:"images/script_add.png",bug:"images/bug.png",donation:"images/amor.png",critical:"images/critical.png",update:"images/update.png",utilities:"images/agt_utilities.png",edit_add:"images/edit_add.png",button_ok:"images/button_ok.png",menu_cmd:"images/package_utilities.png"}[ap]))
}}})();var D=false;var ab=null;var O={};var U=[];var ai="0.0.0";
var A={};var P=d.getUrlArgs();var n={};var ak={};var x=function(aq,ap){if(ak[aq]&&ak[aq][ap]){return ak[aq][ap].apply(this,Array.prototype.slice.call(arguments,2))
}else{console.log("option: WARN: unable to find callback '"+ap+"' for id '"+aq+"'")
}};var ad=function(){var ap=function(){if(O.statistics_enabled){a.init(h.SELF.ID);
window.onerror=function(at,ar,aq){a.tE(at,ai+" "+ar,aq)
}}};U.push(ap)};ad();var am=function(){while(U.length){var ap=U.pop();
ap()}};var S=function(aH,aQ){var aR=null;var aW=null;
var at=[];var aw=function(bj){var bd,aY,bl,bn,bm,bk;
var be=[],bc=[];bn=i("tbody",bj.name,bj.id,"body");
bm=i("tfoot",bj.name,bj.id,"foot");bk=i("thead",bj.name,bj.id,"head");
if(bj.scriptTab){var bg=an(bj);bd=g("table","scripttable",bj.name,bj.id,"main");
var bb=g("th","",bj.name,bj.id,"thead_sel");bb.appendChild(bg.selAll);
var bi=g("td","",bj.name,bj.id,"tfoot_sel");var ba=g("th","",bj.name,bj.id,"thead_en");
var bh=g("td","",bj.name,bj.id,"tfoot_en");bh.setAttribute("colspan","9");
bh.appendChild(bg.actionBox);var a9=g("th","settingsth",bj.name,bj.id,"thead_name");
a9.textContent=j.getMessage("Name");var a0=g("th","settingsth",bj.name,bj.id,"thead_ver");
a0.textContent=j.getMessage("Version");var aZ=g("th","settingsth",bj.name,bj.id,"thead_type");
aZ.textContent=j.getMessage("Type");var aX=g("th","settingsth",bj.name,bj.id,"thead_sync");
aX.textContent="";var a8=g("th","settingsth",bj.name,bj.id,"thead_sites");
a8.width="25%";a8.textContent=j.getMessage("Sites");
var a7=g("th","settingsth",bj.name,bj.id,"thead_features");
a7.textContent=j.getMessage("Features");var a6=g("th","settingsth",bj.name,bj.id,"thead_edit");
a6.textContent=j.getMessage("Homepage");var a4=g("th","settingsth",bj.name,bj.id,"thead_updated");
a4.textContent=j.getMessage("Last_Updated");var a3=g("th","settingsth",bj.name,bj.id,"thead_sort");
a3.textContent=j.getMessage("Sort");var a2=g("th","settingsth",bj.name,bj.id,"thead_del");
a2.textContent=j.getMessage("Actions");var a1=function(){if(O.sync_enabled){aX.textContent=j.getMessage("Imported")
}};U.push(a1);be=be.concat([bb,ba,a9,a0,aZ,aX,a8,a7,a6,a4,a3,a2]);
aY=g("tr","settingstr filler",bj.name,bj.id,"filler");
for(var bf=0;bf<be.length;bf++){aY.appendChild(be[bf])
}bc=bc.concat([bi,bh]);bl=g("tr","settingstr filler",bj.name,bj.id,"footer");
for(var bf=0;bf<bc.length;bf++){bl.appendChild(bc[bf])
}var a5=g("td","settingstd filler",bj.name,bj.id,"filler_td"+bj.id);
aY.appendChild(a5);bk.appendChild(aY);bm.appendChild(bl)
}else{bd=g("table","settingstable",bj.name,bj.id,"main");
aY=g("tr","settingstr filler",bj.name,bj.id,"filler");
bn.appendChild(aY)}bd.appendChild(bk);bd.appendChild(bn);
bd.appendChild(bm);return{table:bd,head:bk,body:bn,foot:bm}
};var ay=function(aY){if(aY.once){if(n[aY.msg]){return true
}else{n[aY.msg]=true}}var aZ=confirm(aY.msg);var aX={};
if(aZ&&aY.ok){aX=aY.ok}else{if(!aZ&&aY.cancel){aX=aY.cancel
}}if(aY.ok||aY.cancel){aZ=true}if(aX.url){sendMessage({method:"openInTab",url:aX.url},function(a0){})
}return aZ};var ax=null;var aE=null;var aB=false;for(var aK in aH){var aO=aH[aK];
if(b){console.log("options: process Item "+aO.name)
}var ap=g("tr","settingstr",aO.name,aO.id,"outer");
if(aO.divider){ap=null}else{var aV=i("td",aO.name,aO.id,"0");
ap.appendChild(aV);var au=i("td",aO.name,aO.id,"1");
if(aO.image){aO.imageURL=T.get(aO.image);au.setAttribute("class","imagetd");
au.appendChild(l.createImage(aO.imageURL,aO.name,aO.id))
}var ar=g("td","settingstd",aO.name,aO.id,"2");if(aO.checkbox){var aI=function(){enableScript(this.key,this.checked)
};var aL=function(){var aX=true;if(this.warning){aX=ay(this.warning);
if(!aX){this.checked=!this.checked}}if(aX){J(this.key,this.checked,this.reload);
if(this.reload){window.location.reload()}}};if(ax&&aB){aI=null;
aL=null}var aA=l.createCheckbox(aO.name,aO,aO.option?aL:aI);
if(aO.validation){z(aO,aA.elem)}if(ax){ax.appendChild(aA.elem);
ap=null}else{ar.appendChild(aA.elem)}aA.elem.setAttribute("style",(aO.level>O.configMode)?d.staticVars.invisible:d.staticVars.visible)
}else{if(aO.button){var aL=function(){var aX=true;if(this.warning){aX=ay(this.warning)
}if(aX){u(this.key,true,this.ignore,this.reload)}};
var aA=l.createButton(aO.name,aO,aL);if(ax){ax.appendChild(aA);
ap=null}else{ar.appendChild(aA)}aA.setAttribute("style",(aO.level>O.configMode)?d.staticVars.invisible:d.staticVars.visible)
}else{if(aO.input){var aA=l.createTextarea(aO.name,aO);
if(aO.validation){z(aO,aA.elem)}if(ax){ax.appendChild(aA.elem);
if(aO.hint){var aP=i("span",aO.name,aO.id,"hint");aP.textContent=aO.hint;
aA.elem.appendChild(aP)}ap=null;aB=true}else{ar.appendChild(aA.elem)
}aA.elem.setAttribute("style",(aO.level>O.configMode)?d.staticVars.invisible:d.staticVars.visible)
}else{if(aO.text){var aA=l.createInput(aO.name,aO);
if(aO.width){aA.input.setAttribute("style","width: "+(aO.width*172)+"px;")
}if(aO.validation){z(aO,aA.elem)}if(ax){ax.appendChild(aA.elem);
if(aO.hint){var aP=g("span","hint",aO.name,aO.id,"hint");
aP.textContent=aO.hint;aA.elem.appendChild(aP)}ap=null;
aB=true}else{ar.appendChild(aA.elem)}aA.elem.setAttribute("style",(aO.level>O.configMode)?d.staticVars.invisible:d.staticVars.visible)
}else{if(aO.password){var aA=l.createPassword(aO.name,aO);
if(ax){ax.appendChild(aA.elem);ap=null;aB=true}else{ar.appendChild(aA.elem)
}aA.elem.setAttribute("style",(aO.level>O.configMode)?d.staticVars.invisible:d.staticVars.visible)
}else{if(aO.select){var aI=function(){var aX=true;if(this.warning){aX=ay(this.warning);
if(!aX){this.value=this.oldvalue}}if(aX){J(this.key,this.value,this.reload);
if(this.reload){window.location.reload()}}};if(ax&&aB){aI=null;
if(aO.enabler){aI=function(){var aZ=document.getElementsByName("enabled_by_"+this.key);
var aX=(this.selectedIndex<this.options.length)?this.options[this.selectedIndex]:this.options[0];
var aY=aX.getAttribute("enables");var a0=aY?JSON.parse(aY):{};
d.forEach(aZ,function(a1){if(a0[a1.key]===undefined||a0[a1.key]==1){a1.setAttribute("style",d.staticVars.visible)
}else{a1.setAttribute("style",d.staticVars.invisible)
}})}}}var aA=l.createDropDown(aO.name,aO,aO.select,aI);
if(aO.validation){z(aO,aA.elem)}if(ax){ax.appendChild(aA.elem);
ap=null}else{ar.appendChild(aA.elem)}aA.elem.setAttribute("style",(aO.level>O.configMode)?d.staticVars.invisible:d.staticVars.visible);
if(ax&&aO.enabler){var az=function(){var aX=aI;var aY=aA;
U.push(function(){aX.apply(aY.select,[])})};az()}}else{if(aO.url){var aU=i("a",aO.name,aO.id);
aU.href="javascript://nop/";aU.url=aO.url;aU.newtab=aO.newtab;
if(!aU.inserted){var aI=function(){ah(this.url,this.newtab)
};aU.addEventListener("click",aI)}aU.textContent=aO.name;
if(ax){ax.appendChild(aU);ap=null}else{ar.setAttribute("colspan","2");
ar.appendChild(aU)}}else{if(aO.heading){var aP=i("span",aO.name,aO.id);
aP.textContent=aO.name;aR=aw(aO);aW=i("div",aO.name,aO.id,"tab_content");
aW.appendChild(aR.table);ap=null;var aq=aQ.appendTab(aO.id||d.createUniqueId(aO.name,""),aP,aW);
if(!D&&aO.selected_default){aq.select()}}else{if(aO.section){if(ax&&aB){var aT=i("input",ax.name,ax.id,"Save");
if(!aT.inserted){aT.type="button";aT.section=ax;aT.value=j.getMessage("Save");
var aG=function(){var aX=Array.prototype.slice.call(this.section.getElementsByTagName("textarea"));
var a1=function(a7){d.forEach(a7,function(a8){aX.push(a8)
})};a1(document.evaluate('//div[@id="'+this.section.id+'"]//input',this.section,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null));
a1(document.evaluate('//div[@id="'+this.section.id+'"]//select',this.section,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null));
for(var aY=0;aY<aX.length;aY++){var aZ=null;var a2=aX[aY];
var a5=a2.key;if(a2.tagName.toLowerCase()=="textarea"){if(a2.array){var a4=a2.value.split("\n");
var a0=[];for(var a6=0;a6<a4.length;a6++){if(a4[a6]&&a4[a6].trim()!=""){a0.push(a4[a6])
}}aZ=a0}else{aZ=a2.value}}else{if(a2.getAttribute("type")=="checkbox"){aZ=a2.checked
}else{if(a2.getAttribute("type")=="select"){var a3=0;
if(a2.selectedIndex>=0&&a2.selectedIndex<a2.options.length){a3=a2.selectedIndex
}aZ=a2[a3]?a2[a3].value:a2.options[0].value}else{if(a2.getAttribute("type")=="button"){}else{aZ=a2.value
}}}}if(a5){J(a5,aZ)}}};aT.addEventListener("click",aG,false)
}ax.appendChild(aT);ap=null}if(aO.endsection){continue
}var aG=g("div","section",aO.name,aO.id);var aP=g("div","section_head",aO.name,aO.id,"head");
var aS=g("div","section_content",aO.name,aO.id,"content");
aP.textContent=aO.name;aG.appendChild(aP);aG.appendChild(aS);
if(aE==null){aE=g("div","section_table","","");ar.appendChild(aE);
ar.setAttribute("class","section_td")}else{ap=null;
ar=null}aB=false;aE.appendChild(aG);aG.setAttribute("style",(aO.level>O.configMode)?d.staticVars.invisible:d.staticVars.visible);
ax=aS;if(aO.needsave){aB=true}au=null}else{if(aO.menucmd){var aN=i("span",aO.name,aO.id,false,true);
aN.textContent=aO.name;ar.setAttribute("colspan","2");
ar.appendChild(aN)}else{if(aO.userscript||aO.nativeScript||aO.user_agent){ar.setAttribute("colspan","2");
var aM=C(aO,ap,aQ);ap.setAttribute("class","scripttr");
if(aO.nnew){ap.setAttribute("style","display: none;")
}for(var aC=0;aC<aM.length;aC++){ap.appendChild(aM[aC])
}if(aO.userscript||aO.user_agent){at.push({script:ap,pos:aO.position,posof:aO.positionof})
}au=null}else{if(aO.version){ai=aO.value;ap=null;var av=g("div","version","version","version");
av.textContent="v"+ai+" by Jan Biniok"}else{if(aO.globalhint){var aF=g("span","global_hint","globalhint","globalhint");
var aJ=i("span","globalhintt","globalhintt");var aD=i("span","globalhintt","globalhintt");
aD.textContent=aO.value;if(aO.image){aJ.appendChild(l.createImage(aO.imageURL,"globalhint","icon"))
}aJ.appendChild(aD);aF.appendChild(aJ);document.body.appendChild(aF);
ap=null}else{var aN=i("span",aO.name,aO.id);aN.textContent=aO.name;
ar.setAttribute("colspan","2");ar.appendChild(aN)}}}}}}}}}}}}}if(ap){if(au){ap.insertBefore(au,aV)
}if(ar){ap.appendChild(ar,aV)}ap.removeChild(aV);var aS=ap.getAttribute("class");
var aP=" hide";if(aO.visible===false){aS+=aP}else{aS=aS.replace(aP,"")
}ap.setAttribute("class",aS)}}if(aR&&ap){aR.body.appendChild(ap)
}}q(at);U.push(ak.multiselect["single_click"])};var z=function(ar,at){var ap;
if(ar.validation){if(ar.validation.url){ap=function(){ah(this.url,true)
}}if(ar.validation.image){ar.validation.imageURL=T.get(ar.validation.image)
}}var aq=l.createValidation(ar,ap);if(aq){aq.url=ar.validation?ar.validation.url:undefined;
at.appendChild(aq)}};var W=function(aQ){var aP={name:"utils",id:"utils"};
var aR=i("div",aP.name,aP.id,"tab_util_h");aR.textContent=j.getMessage("Utilities");
var au=i("div",aP.name,aP.id,"tab_util");var aw=aQ.appendTab(d.createUniqueId(aP.name,aP.id),aR,au);
aw.show();var ax=g("div","tv_util",aP.name,aP.id,"tab_util_cont");
var aA=function(){var aX={created_by:"Tampermonkey",version:"1",scripts:[]};
for(var aW in ab){var aY=ab[aW];if((aY.userscript||aP.user_agent)&&aY.id&&!aY.system){var aV={name:aY.name,options:aY.options,enabled:aY.enabled,position:aY.position};
if(aY.file_url&&aY.file_url.trim()!=""){aV.file_url=aY.file_url
}if(aY.code&&aY.code.trim()!=""){aV.source=e.Base64.encode(e.UTF8.encode(aY.code));
aX.scripts.push(aV)}else{console.log("options: Strange script: "+aY.name)
}}}return JSON.stringify(aX)};var aM=function(aV){var a0=false;
var aY=0;if(aV.trim()!=""){var aZ=null;try{aZ=JSON.parse(aV)
}catch(a4){var a3="<body>";var a2="</body>";if(aV.search(a3)!=-1){var a6=aV.indexOf(a3);
var a5=aV.lastIndexOf(a2);if(a6!=-1&&a5!=-1){aV=aV.substr(a6+a3.length,a5-(a6+a3.length));
aM(aV)}}else{d.alert(j.getMessage("Unable_to_parse_this_"))
}return}var a1=function(a8){try{var a7=a8.name;var ba=e.UTF8.decode(e.Base64.decode(a8.source));
var a9=a8.file_url||a8.update_url;if(ba&&ba.trim()!=""){var bc=function(bd){if(bd.installed){var be=(a8.enable==undefined)?a8.enabled:a8.enable;
var bf=a8.options;bf.enabled=be;bf.position=a8.position;
y(a8.name,bf,false)}if(--aY==0){I(null,false,null,true,true)
}};aY++;sendMessage({method:"saveScript",name:a7,code:ba,reload:false,file_url:a9},bc)
}}catch(bb){a0=true;console.log("options: Error while importing script "+aX.name)
}};var aW=aZ.scripts;for(var aX=aW.length-1;aX>=0;aX--){a1(aW[aX])
}if(a0){d.alert(j.getMessage("An_error_occured_during_import_"))
}}};var aC=function(aV){var aW="";switch(aV.code){case FileError.QUOTA_EXCEEDED_ERR:aW="QUOTA_EXCEEDED_ERR";
break;case FileError.NOT_FOUND_ERR:aW="NOT_FOUND_ERR";
break;case FileError.SECURITY_ERR:aW="SECURITY_ERR";
break;case FileError.INVALID_MODIFICATION_ERR:aW="INVALID_MODIFICATION_ERR";
break;case FileError.INVALID_STATE_ERR:aW="INVALID_STATE_ERR";
break;default:aW="Unknown Error";break}d.alert("Error: "+aW)
};var aF=function(){aM(aD.value)};var aJ=function(){function aV(aW){aW.root.getFile("scripts.tmx",{},function(aX){aX.file(function(aZ){var aY=new FileReader();
aY.onloadend=function(a0){aM(this.result)};aY.readAsText(aZ)
},aC)},aC)}window.requestFileSystem(window.PERSISTENT,1024*1024,aV,aC)
};var aN=function(){var aV=aA();function aW(aX){aX.root.getFile("scripts.tmx",{create:true},function(aY){aY.createWriter(function(aZ){aZ.onwriteend=function(a1){console.log("Write completed.")
};aZ.onerror=function(a1){console.log("Write failed: "+a1.toString())
};var a0=new Blob([aV],{type:"text/plain"});aZ.write(a0)
},aC)},aC)}window.requestFileSystem(window.PERSISTENT,1024*1024,aW,aC)
};var aG=function(){var aV=aA();var aW=new Blob([aV],{type:"text/plain"});
saveAs(aW,"tmScripts.txt")};var aI=function(){aD.value=aA()
};var aO=l.createButton(aP.name,aP.id+"_i_ta",j.getMessage("Import_from_Textarea"),aF);
var aK=l.createButton(aP.name,aP.id+"_i_ls",j.getMessage("Import_from_SandboxFS"),aJ);
var ay=i("input",aP.name,aP.id+"_i_file","file");var at=function(aX){var aZ=aX.target.files;
var a1=[];var aW=function(){aM(a1.pop())};for(var aY=0,a0;
a0=aZ[aY];aY++){var aV=new FileReader();aV.onload=(function(a2){return function(a3){a1.push(a3.target.result);
window.setTimeout(aW,10)}})(a0);aV.readAsText(a0)}};
if(!ay.inserted){ay.type="file";ay.addEventListener("change",at,false)
}var ar=l.createButton(aP.name,aP.id+"_e_ta",j.getMessage("Export_to_Textarea"),aI);
var aE=l.createButton(aP.name,aP.id+"_e_doc",j.getMessage("Export_to_file"),aG);
var aT=l.createButton(aP.name,aP.id+"_e_ls",j.getMessage("Export_to_SandboxFS"),aN);
var aD=g("textarea","importta",aP.name,aP.id,"ta");
var aq=g("div","section",aP.name,aP.id,"ta");var aU=g("div","section_head",aP.name,aP.id,"head_ta");
var az=g("div","section_content",aP.name,aP.id,"content_ta");
aU.textContent=j.getMessage("TextArea");az.appendChild(ar);
az.appendChild(aO);az.appendChild(aD);aq.appendChild(aU);
aq.appendChild(az);var aL=g("div","section",aP.name,aP.id,"sb");
var aH=g("div","section_head",aP.name,aP.id,"head_sb");
var aS=g("div","section_content",aP.name,aP.id,"content_sb");
aH.textContent=j.getMessage("SandboxFS");aL.appendChild(aH);
aL.appendChild(aS);aS.appendChild(aT);aS.appendChild(aK);
var av=g("div","section",aP.name,aP.id,"fi");var ap=g("div","section_head",aP.name,aP.id,"head_fi");
var aB=g("div","section_content",aP.name,aP.id,"content_fi");
ap.textContent=j.getMessage("File");av.appendChild(ap);
av.appendChild(aB);aB.appendChild(aE);aB.appendChild(ay);
ax.appendChild(av);ax.appendChild(aL);ax.appendChild(aq);
d.forEach([aL,aq],function(aV){var aW=" hide";var aX=aV.getAttribute("class");
if(O.configMode<50){aX+=aW}else{aX=aX.replace(aW,"")
}aV.setAttribute("class",aX)});au.appendChild(ax)};
var V=function(ax){if(!ax){console.log("options: items is empty!");
return}ab=ax;var aq=document.getElementById("options");
var at=g("div","main_container p100100","options","main");
if(aq){var ap=aq.parentNode;ap.removeChild(aq);ap.appendChild(at);
document.body.setAttribute("class","main")}if(b){console.log("options: head")
}var aA=g("div","head_container","opt","head_container");
var au=g("div","tv_container","opt","tv_container");
var ay=i("a","head_link","fire","head_link");ay.href="http://tampermonkey.net";
ay.target="_blank";var aB=g("div","float margin4","fire","head1");
var ar=g("img","banner","fire");ar.src=chrome.extension.getURL("images/icon128.png");
var az=g("div","float head margin4","fire","head2");
var aE=i("div","fire");var av=g("div","version","version","version");
av.textContent=" by Jan Biniok";var aD=i("div","search","box","");
aE.textContent="Tampermonkey";aB.appendChild(ar);az.appendChild(aE);
az.appendChild(av);ay.appendChild(aB);ay.appendChild(az);
aA.appendChild(ay);aA.appendChild(aD);at.appendChild(aA);
at.appendChild(au);if(b){console.log("options: tabView")
}var aw=m.create("_main",au);if(b){console.log("options: itemsToMenu")
}S(ax,aw);if(b){console.log("options: utilTab")}W(aw);
if(P.selected){if(!D){var aC=aw.getTabById(P.selected);
if(aC){aC.select()}}}D=true;f.hide();am()};var af=function(aQ,ar,au){var aJ=ar.item;
var aB=aJ.id+ar.id;var aP=(au?"orig_":"use_")+ar.id;
var ay=function(aR){return"select_"+d.createUniqueId(aR,aJ.id)+"_sel1"
};var az=g("div","cludes",aQ,aB,"cb1");if(document.getElementById(ay(aP))){return{elem:az}
}var aI=i("span",aJ.name,aB,"cb2");if(au){var av=function(){if(this.type=="checkbox"){I(this.name,this.key,!this.oldvalue)
}};var aq="merge_"+ar.id;var aC=(aJ.options&&aJ.options.override&&aJ.options.override[aq])?true:false;
var aF=l.createCheckbox(aQ,{id:aq,name:aJ.name,enabled:aC},av);
aI.appendChild(aF.elem)}else{aI.textContent=aQ}az.title=aJ.desc?aJ.desc:"";
var ap=(aJ.options&&aJ.options.override&&aJ.options.override[aP])?aJ.options.override[aP]:[];
var aG=g("select","cludes",aP,aJ.id,"sel1");aG.setAttribute("size","6");
for(var aD=0;aD<ap.length;aD++){var ax=document.createElement("option");
ax.value=ax.text=ap[aD];aG.appendChild(ax)}az.appendChild(aI);
az.appendChild(aG);var aL=function(){var aR=ay("use_"+(ar.id=="excludes"?"includes":"excludes"));
var aS=document.getElementById(aR);var aT=aG.options[aG.selectedIndex];
if(aT&&!aS.querySelector('option[value="'+aT.value+'"]')){aS.appendChild(aT.cloneNode(true));
aM()}};var at=function(){var aR=prompt(j.getMessage("Enter_the_new_rule"));
if(aR){var aS=document.createElement("option");aS.value=aS.text=aR.trim();
aG.appendChild(aS);aM()}};var aN=function(){var aS=aG.options[aG.selectedIndex];
if(!aS){return}var aR=prompt(j.getMessage("Enter_the_new_rule"),aS.value);
if(aR){aS.value=aS.text=aR.trim();aM()}};var aA=function(){var aR=aG.options[aG.selectedIndex];
if(!aR){return}aR.parentNode.removeChild(aR);aM()};
var aE=function(aS){var aR=[];for(var aT=0;aT<aS.options.length;
aT++){aR.push(aS.options[aT].value)}return aR};var aM=function(){var aR={includes:aE(document.getElementById(ay("use_includes"))),matches:aE(document.getElementById(ay("use_matches"))),excludes:aE(document.getElementById(ay("use_excludes")))};
y(aJ.name,aR);return true};if(au){var aw=i("button",aJ.name,aB,"btn1");
aw.innerHTML=j.getMessage("Add_as_0clude0",au);aw.addEventListener("click",aL,false);
az.appendChild(aw)}else{var aO=i("button",aJ.name,aB,"btn2");
aO.innerHTML=j.getMessage("Add")+"...";aO.addEventListener("click",at,false);
az.appendChild(aO);var aH=i("button",aJ.name,aB,"btn3");
aH.innerHTML=j.getMessage("Edit")+"...";aH.addEventListener("click",aN,false);
az.appendChild(aH);var aK=i("button",aJ.name,aB,"btn4");
aK.innerHTML=j.getMessage("Remove");aK.addEventListener("click",aA,false);
az.appendChild(aK)}return{elem:az}};var q=function(ar){var av=function(aB,aA){if(aB.tagName==aA){return aB
}else{return(aB.parentNode?av(aB.parentNode,aA):null)
}};var aq=function(aA){var aB=function(aD,aC){return aD.position-aC.position
};aA.sort(aB);return aA};var az=null;var at=[];var aw=0;
for(var au=0;au<ar.length;au++){var ax=ar[au].script;
var ay=av(ax,"TR");if(ay){var ap=av(ay,"TBODY");if(!az){az=ap
}else{if(ap&&az!=ap){console.log("options: different parents?!?!")
}}aw++;at.push({tr:ay,position:ax.pos?ax.pos:(1000+aw)});
ay.inserted=false;if(ay.parentNode){ay.parentNode.removeChild(ay)
}}else{console.log("options: unable to sort script at pos "+ax.pos)
}}at=aq(at);for(var au=0;au<aw;au++){az.appendChild(at[au].tr)
}};var ae=function(au,aJ,at,aB,aC){var aE=g("div","",aJ.name,aJ.id,"script_tab_head");
var ar=aE.inserted;var az=g("div","heading",aJ.name,"heading");
var aG=g("img","nameNicon64",aJ.name,"heading_icon");
var ap=aJ.icon64?aJ.icon64:aJ.icon;aG.src=ap;var aI=g("div","nameNname64",aJ.name,"heading_name");
aI.textContent=aJ.name;if(ap){az.appendChild(aG)}az.appendChild(aI);
var aD=g("div","author",aJ.name,"author");if(aJ.author){aD.textContent="by "+aJ.author
}else{if(aJ.copyright){aD.innerHTML="&copy; ";aD.textContent+=aJ.copyright
}}var aN=g("table","noborder p100100",aJ.name,"table");
var aQ=g("tr","script_tab_head",aJ.name,"tr1");var aP=g("tr","details",aJ.name,"tr2");
var ay=g("td","",aJ.name,"td1");var aL=g("td","",aJ.name,"td2");
az.appendChild(aD);aE.appendChild(az);ay.appendChild(aE);
aQ.appendChild(ay);aP.appendChild(aL);aN.appendChild(aQ);
aN.appendChild(aP);aB.appendChild(aN);var aK={tv:"tv tv_alt",tv_table:"tv_table tv_table_alt",tr_tabs:"tr_tabs tr_tabs_alt",tr_content:"tr_content tr_content_alt",td_content:"td_content td_content_alt",td_tabs:"td_tabs td_tabs_alt",tv_tabs_align:"tv_tabs_align tv_tabs_align_alt",tv_tabs_fill:"tv_tabs_fill tv_tabs_fill_alt",tv_tabs_table:"tv_tabs_table tv_tabs_table_alt",tv_contents:"tv_contents tv_contents_alt",tv_tab_selected:"tv_tab tv_selected tv_tab_alt tv_selected_alt",tv_tab_close:"",tv_tab:"tv_tab tv_tab_alt",tv_content:"tv_content tv_content_alt"};
var ax=m.create("_details"+d.createUniqueId(aJ.name,aJ.id),aL,aK);
var aF=ag(aJ,ax,aC);var aA=!aJ.id||aJ.system?{}:G(aJ,ax);
if(ar){return A["tab"+aJ.name]}var aw=function(aS){var aR=false;
if(aS.type!="keydown"){return}if(aS.keyCode==27){if(O.editor_keyMap=="windows"){if(au.isSelected()){window.setTimeout(aC,1)
}aR=true}}if(aR){aS.stopPropagation();aS.preventDefault();
return false}};var aq=function(aS){var aR=false;if(aA.beforeClose){aR|=aA.beforeClose(aS)
}if(aF.beforeClose){aR|=aF.beforeClose(aS)}return aR&&!aJ.nnew
};var aH=function(){if(aA.onShow){aA.onShow()}if(aF.onShow){aF.onShow()
}window.addEventListener("keydown",aw,true)};var av=function(aR){if(aA.onClose){if(aA.onClose(aR)){return true
}}if(aF.onClose){if(aF.onClose(aR)){return true}}window.removeEventListener("keydown",aw,true)
};var aO=function(){if(aA.onSelect){if(aA.onSelect()){return true
}}if(aF.onClose){if(aF.onSelect()){return true}}};var aM={onShow:aH,onClose:av,onSelect:aO,beforeClose:aq};
A["tab"+aJ.name]=aM;return aM};var G=function(a7,aI){var aH=i("div",a7.name,a7.id,"script_setting_h");
var a1=aH.inserted;aH.textContent=j.getMessage("Settings");
var aJ=i("div",a7.name,a7.id,"script_settings_c");var aR=function(){if(this.type=="checkbox"||this.type=="button"){I(this.name,this.key,!this.oldvalue)
}else{if(this.type=="text"||this.type=="textarea"||this.type=="select-one"){var bd=this.value;
if(this.valtype==="native"){if(bd==="undefined"){bd=undefined
}else{try{bd=JSON.parse(bd)}catch(bc){}}}I(this.name,this.key,bd)
}}};var a2=l.createPosition(j.getMessage("Position_")+": ",{id:"position",name:a7.name,pos:a7.position,posof:a7.positionof},aR);
var a6=l.createScriptStartDropDown(j.getMessage("Run_at")+": ",{id:"run_at",name:a7.name,value:a7.run_at},aR);
var au=l.createDropDown(j.getMessage("No_frames"),{id:"noframes",name:a7.name,value:a7.noframes},[{name:j.getMessage("Yes"),value:true},{name:j.getMessage("No"),value:false},{name:j.getMessage("Default"),value:null}],aR);
var av=af(j.getMessage("Original_includes"),{id:"includes",item:a7},j.getMessage("User_excludes"));
var aq=af(j.getMessage("Original_matches"),{id:"matches",item:a7},j.getMessage("User_excludes"));
var ay=af(j.getMessage("Original_excludes"),{id:"excludes",item:a7},j.getMessage("User_includes"));
var aW=g("div","clear",a7.name,a7.id,"clear");var az=af(j.getMessage("User_includes"),{id:"includes",item:a7});
var aw=af(j.getMessage("User_matches"),{id:"matches",item:a7});
var aB=af(j.getMessage("User_excludes"),{id:"excludes",item:a7});
var a0=l.createCheckbox(j.getMessage("Apply_compatibility_options_to_required_script_too"),{id:"compatopts_for_requires",name:a7.name,enabled:a7.compatopts_for_requires},aR);
var ar=l.createCheckbox(j.getMessage("Fix_wrappedJSObject_property_access"),{id:"compat_wrappedjsobject",name:a7.name,enabled:a7.compat_wrappedjsobject},aR);
var aN=l.createCheckbox(j.getMessage("Convert_CDATA_sections_into_a_chrome_compatible_format"),{id:"compat_metadata",name:a7.name,enabled:a7.compat_metadata},aR);
var aU=l.createCheckbox(j.getMessage("Replace_for_each_statements"),{id:"compat_foreach",name:a7.name,enabled:a7.compat_foreach},aR);
var aO=l.createCheckbox(j.getMessage("Fix_for_var_in_statements"),{id:"compat_forvarin",name:a7.name,enabled:a7.compat_forvarin},aR);
var aG=l.createCheckbox(j.getMessage("Convert_Array_Assignements"),{id:"compat_arrayleft",name:a7.name,enabled:a7.compat_arrayleft},aR);
var ap=l.createCheckbox(j.getMessage("Add_toSource_function_to_Object_Prototype"),{id:"compat_prototypes",name:a7.name,enabled:a7.compat_prototypes},aR);
var aS=[a0,ar,aN,aU,aO,aG,ap];var aF=g("div","section",a7.name,a7.id,"ta_opt");
var aE=g("div","section_head",a7.name,a7.id,"head_ta_opt");
var aK=g("div","section_content",a7.name,a7.id,"content_ta_opt");
aE.textContent=j.getMessage("Settings");aF.appendChild(aE);
aF.appendChild(aK);var aL=g("div","section",a7.name,a7.id,"ta_cludes");
var aZ=g("div","section_head",a7.name,a7.id,"head_ta_cludes");
var aQ=g("div","section_content",a7.name,a7.id,"content_ta_cludes");
aZ.textContent=j.getMessage("Includes_Excludes");aL.appendChild(aZ);
aL.appendChild(aQ);var aA=g("div","section",a7.name,a7.id,"ta_compat");
var aM=g("div","section_head",a7.name,a7.id,"head_ta_compat");
var ax=g("div","section_content",a7.name,a7.id,"content_ta_compat");
aM.textContent=j.getMessage("GM_compat_options_");aA.appendChild(aM);
aA.appendChild(ax);aK.appendChild(a2);if(!a7.user_agent){aK.appendChild(a6)
}aK.appendChild(au.elem);aQ.appendChild(av.elem);aQ.appendChild(aq.elem);
aQ.appendChild(ay.elem);aQ.appendChild(aW);aQ.appendChild(az.elem);
aQ.appendChild(aw.elem);aQ.appendChild(aB.elem);var a8=i("span",a7.name,a7.id);
a8.textContent=j.getMessage("Settings");var aC=i("div",a7.name,a7.id,"tab_content_settings");
aC.appendChild(aF);aC.appendChild(aL);if(!a7.user_agent){for(var aV=0;
aV<aS.length;aV++){ax.appendChild(aS[aV].elem)}if(a7.awareOfChrome){for(var a3 in aS){aS[a3].input.setAttribute("disabled","disabled");
aS[a3].elem.setAttribute("title",j.getMessage("This_script_runs_in_Chrome_mode"))
}}aC.appendChild(aA)}var aX={name:a7.name,id:"comment",value:a7.options.comment};
var aY=l.createTextarea(null,aX);aY.elem.setAttribute("class","script_setting_wrapper");
var ba=function(){aR.apply(aY.textarea,[])};var aP=i("div",a7.name,a7.id,"save");
var aD=l.createButton(a7.name,a7.id,j.getMessage("Save"),ba);
aP.appendChild(aD);var aT=g("div","section",a7.name,a7.id,"ta_comment");
var at=g("div","section_head",a7.name,a7.id,"head_ta_comment");
var a9=g("div","section_content",a7.name,a7.id,"content_ta_comment");
at.textContent=j.getMessage("Comment");aT.appendChild(at);
aT.appendChild(a9);a9.appendChild(aY.elem);a9.appendChild(aP);
aC.appendChild(aT);aJ.appendChild(aC);var a5=aI.appendTab("script_settings_tab"+d.createUniqueId(a7.name,a7.id),aH,aJ);
if(a1){return A["settings"+a7.name]}var a4=function(){var bc=false;
if(av.beforeClose){bc|=av.beforeClose()}if(aq.beforeClose){bc|=aq.beforeClose()
}if(ay.beforeClose){bc|=ay.beforeClose()}if(az.beforeClose){bc|=az.beforeClose()
}if(aw.beforeClose){bc|=aw.beforeClose()}if(aB.beforeClose){bc|=aB.beforeClose()
}return bc};var bb={beforeClose:a4};A["settings"+a7.name]=bb;
return bb};var ag=function(aP,aw,aB){var aK=g("tr","editor_container p100100",aP.name,aP.id,"container");
if(!aP.nnew&&x(aP.id,"lastI")){return[]}if(aP.nnew){aP.code=aP.code.replace("<$URL$>",P.url||"http://*/*")
}var at=i("div",aP.name,aP.id,"script_editor_h");var aq=at.inserted;
at.textContent=j.getMessage("Editor");var ax=i("div",aP.name,aP.id,"script_editor_c");
var az=g("tr","editormenubar",aP.name,aP.id,"container_menu");
var aS=g("table","editor_container_o p100100 noborder",aP.name,aP.id,"container_o");
aS.appendChild(az);aS.appendChild(aK);ax.appendChild(aS);
var aT=function(aW){var aX=aK.editor&&O.editor_enabled?aK.editor.mirror.getValue():aJ.value;
var aY=new Blob([aX],{type:"text/plain"});saveAs(aY,aP.name+".tamper.js")
};var aA=function(aW,aX){x(aP.id,"saveEm",aX)};var aC=function(aW,aX){if(aB){aB(aX)
}};var aG=function(){var aW=null;aW=function(a0){if(a0.cleaned){aC()
}};var aZ=aL.input?aL.input.oldvalue:"";var aY=aL.input?aL.input.value:"";
var aX={old_url:aZ,new_url:aY,clean:true,reload:true};
E(aP.name,null,aX,aW)};var aD=function(){var aW=confirm(j.getMessage("Really_reset_all_changes_"));
if(aW){if(aK.editor&&O.editor_enabled){aK.editor.mirror.setValue(aP.code)
}else{aJ.textContent=aP.code}}};var aV=function(){f.wait();
var aW=function(){R.run(aK.editor);f.hide()};window.setTimeout(aW,1)
};var aO=l.createImageButton(aP.name,"save_to_disk",j.getMessage("Save_to_disk"),chrome.extension.getURL("/layout/default/images/harddrive2.png"),aT);
var ap=l.createImageButton(aP.name,"save",j.getMessage("Save"),chrome.extension.getURL("/layout/default/images/filesave.png"),aA);
var aE=l.createImageButton(aP.name,"cancel",j.getMessage("Editor_reset"),chrome.extension.getURL("/layout/default/images/editor_cancel.png"),aD);
var ay=l.createImageButton(aP.name,"reset",j.getMessage("Full_reset"),chrome.extension.getURL("/layout/default/images/script_cancel.png"),aG);
var aR=l.createImageButton(aP.name,"close_script",j.getMessage("Close"),chrome.extension.getURL("/layout/default/images/exit.png"),aC);
var aF=l.createImageButton(aP.name,"lint_script",j.getMessage("Run_syntax_check"),chrome.extension.getURL("/layout/default/images/check.png"),aV);
var aL=l.createInput(j.getMessage("Update_URL_"),{id:"file_url",name:aP.name,value:aP.file_url});
aL.input.setAttribute("class","updateurl_input");aL.elem.setAttribute("class","updateurl");
var aJ=g("textarea","editorta",aP.name,aP.id);aJ.setAttribute("wrap","off");
var aI=g("td","editor_outer",aP.name,aP.id,"edit");
var aN=g("div","editor",aP.name,aP.id,"edit");var ar=g("div","editormenu",aP.name,aP.id,"editormenu");
aI.appendChild(aN);az.appendChild(ar);az.appendChild(aL.elem);
if(!aK.inserted){aN.appendChild(aJ);aK.appendChild(aI)
}if(!aP.system){ak[aP.id]["saveEm"]=function(a2){var aX=true;
if(O.showFixedSrc&&!aP.user_agent){aX=confirm(j.getMessage("Do_you_really_want_to_store_fixed_code_",j.getMessage("Show_fixed_source")))
}var a1=aK.editor&&O.editor_enabled?aK.editor.mirror.getValue():aJ.value;
if(aX){var aW=function(a3){if(a3.installed){if(aP.nnew||a3.renamed){aC(null,true)
}else{aK.editor.changed=false;if(a3.lastModified){aP.lastModified=a3.lastModified
}}}};var a0=aL.input?aL.input.oldvalue:"";var aZ=aL.input?aL.input.value:"";
var aY={old_url:a0,new_url:aZ,clean:false,reload:true,force:a2,lastModified:aP.lastModified===undefined?null:aP.lastModified};
E(aP.name,a1,aY,aW)}return aX};ar.appendChild(aO);ar.appendChild(ap);
ar.appendChild(aE)}if(!aP.nnew){ar.appendChild(ay)}ar.appendChild(aR);
if(!aP.system&&O.editor_enabled){ar.appendChild(aF)
}var au=aw.appendTab("script_editor_tab"+d.createUniqueId(aP.name,aP.id),at,ax);
if(aq){return A["editor"+aP.name]}var aU=function(){if(aK.editor){aK.editor.mirror.refresh()
}};var aM=function(){var aW=ax.getElementsByTagName("textarea");
ak[aP.id]["lastI"]=function(){return aP};if(aW.length){var aX=aW[0];
if(!aK.editor){var aY=function(){if(aK.editor){aK.editor.changed=true
}};if(O.editor_enabled){var aZ=aX.parentNode;var a0={search:j.getMessage("Search"),replace:j.getMessage("Replace"),jump:j.getMessage("Jump_to_line"),macro:j.getMessage("Insert_constructor"),reindentall:j.getMessage("Auto_Indent_all")};
aZ.removeChild(aX);aK.editor=new MirrorFrame(aZ,{value:aP.code,indentUnit:Number(O.editor_indentUnit),indentWithTabs:O.editor_indentWithTabs=="tabs",smartIndent:O.editor_tabMode!="classic",enterMode:O.editor_enterMode,electricChars:O.editor_electricChars.toString()=="true",lineNumbers:true,extraKeys:{Enter:"newlineAndIndentContinueComment"},keyMap:O.editor_keyMap,gutters:["gutter","CodeMirror-linenumbers"],matchBrackets:true},{save:aA,close:aC,find:function(a1){aK.editor.searchText=aK.editor.search()
},findNext:function(a1){aK.editor.searchText=aK.editor.search(aK.editor.searchText)
},},{change:aY,blur:aH},a0)}else{aX.value=aP.code}}}};
var av=function(){var aW=false;if(O.editor_enabled){if(aK.editor){aW|=(aK.editor.changed&&aK.editor.mirror.historySize().undo)
}}else{aW=(aJ.value!=aP.code)}return aW};var aH=function(){if(O.editor_autoSave&&av()){x(aP.id,"saveEm",O.editor_easySave)
}};var aQ={onSelect:aU,onShow:aM,onClose:function(aX){var aW=function(){aK.editor=null;
delete ak[aP.id]["lastI"]};if(av()&&!aX){var aY=confirm(j.getMessage("There_are_unsaved_changed_"));
if(aY){aW()}return !aY}else{aW();return false}}};A["editor"+aP.name]=aQ;
return aQ};var C=function(a2,a5,az){if(!ak[a2.id]){ak[a2.id]={}
}var a0;var ay;var aX=a2.icon&&!a2.nativeScript;var aW=g("span","script_name"+(a2.nativeScript?"":" clickable"),a2.name,a2.id,"sname");
var aN=g("img","nameNicon16 icon16",a2.name,a2.id,"sname_img");
var aq=g("span",aX?"nameNname16":"",a2.name,a2.id,"sname_name");
var a1=a2.homepage?a2.homepage:(a2.namespace&&a2.namespace.search("http://")==0?a2.namespace:null);
aq.textContent=(a2.name.length>35?a2.name.substr(0,35)+"...":a2.name);
var a3=i("span",a2.name,a2.id,"sversion");a3.textContent=a2.version?a2.version:"";
if(aX){aN.src=a2.icon;aW.appendChild(aN)}var aM=[];
var aR=function(a6,ba,a9,a8){if(!a8){a8="scripttd"}var a7=g("td",a8,a6.name,a6.id,a9);
if(ba){if(d.toType(ba)==="Array"){d.forEach(ba,function(bc,bb){a7.appendChild(bc)
})}else{a7.appendChild(ba)}}return a7};var aF=function(){if(a0){a0.remove();
a0=null}};var aI=function(){aW.parentNode.removeChild(aW)
};var aO=function(){var a6=function(){for(var a7 in ab){var a8=ab[a7];
if(a8.id==a2.id&&a8.name==a2.name){C(a8,a5,az);break
}}};window.setTimeout(a6,1)};var at=function(a7){var a6=true;
if(ay.beforeClose){a6=!ay.beforeClose(a7)}if(ay.onClose&&ay.onClose(a7)){return
}aF();aI();if(a6){aO()}};var aC=function(){if(ay.onSelect&&ay.onSelect()){return
}};var aS=function(){var a6=null;if(a2.nnew){a6=g("div","head_icon",a2.name,a2.id,"details_h");
a6.appendChild(l.createImage(a2.imageURL,a2.name,a2.id,"new_script_head"))
}else{a6=g("div","",a2.name,a2.id,"details_h");a6.textContent=j.getMessage("Edit")+" - "+(a2.name.length>25?a2.name.substr(0,25)+"...":a2.name)
}var a7=i("div",a2.name,a2.id,"details_c");a0=az.insertTab(null,"details_"+d.createUniqueId(a2.name,a2.id),a6,a7,aC,a2.nnew?null:at);
ay=ae(a0,a2,a5,a7,at)};var au=function(a7,a6){if(!a0){aS()
}if(ay.onShow){ay.onShow()}a0.show();if((!a7||a7.button!=1)&&!a6){a0.select()
}aq.setAttribute("open","true")};if(aq.getAttribute("open")=="true"){au(null,true)
}var aJ=i("span",a2.name,a2.id,"hp");if(a1){var aG=i("a",a2.name,a2.id,"hp");
aG.setAttribute("href",a1);aG.setAttribute("target","_blank");
var aA=l.createImage(chrome.extension.getURL("/layout/default/images/home.png"),a2.name,a2.id,"hp","");
aG.appendChild(aA);aJ.appendChild(aG)}var aw=function(bg,be){var bc=1000*60;
var a9=1000*60*60;var a7=1000*60*60*24;var ba=bg.getTime();
var a6=be.getTime();var bf=Math.abs(ba-a6);var a8=Math.round(bf/bc);
var bb=Math.round(bf/a9);var bd=Math.round(bf/a7);if(a8<=60){return a8+" min"
}else{if(bb<=48){return bb+" h"}else{return bd+" d"
}}};var aH=i("span",a2.name,a2.id,"last_updated");var aL="";
if(a2.nativeScript||!a2.id||a2.system){aL=""}else{var aV=function(){var a7=aH.textContent;
aH.textContent="";aH.appendChild(l.createImage("/layout/default/images/download.gif",a2.name+"_down",a2.id));
var a6=function(a8){aH.textContent=a7;if(a8){aH.style.color="green";
aH.title=j.getMessage("There_is_an_update_for_0name0_avaiable_",a2.name);
aF();aI();I(null,false)}else{aH.style.color="red";aH.title=j.getMessage("No_update_found__sry_")
}};r(a2.id,a6)};if(!aq.inserted){aH.addEventListener("click",function(){x(a2.id,"scriptUpdate")
});aH.setAttribute("class","clickable");aH.title=j.getMessage("Check_for_Updates")
}ak[a2.id]["scriptUpdate"]=aV;if(a2.lastUpdated){try{aL=aw(new Date(),new Date(a2.lastUpdated))
}catch(a4){console.log("o: error calculating time "+a4.message)
}}else{aL="?"}}aH.textContent=aL;var aD=i("div",a2.name,a2.id,"imported");
var aK="";var aP=function(){if(O.sync_enabled){if(a2.nativeScript||!a2.id||a2.system){aK=""
}else{if(a2.sync&&a2.sync.imported){if(a2.sync.imported===true||a2.sync.imported==c.types.ePASTEBIN){aK='<img src="http://pastebin.com/favicon.ico" class="icon16" title="pastebin.com"/>'
}else{if(a2.sync.imported==c.types.eCHROMESYNC){aK='<img src="http://www.google.com/images/icons/product/chrome-16.png" class="icon16" title="Google Sync"/>'
}else{aK='<img src="/layout/default/images/update.png" class="icon16" />'
}}}else{aK='<img src="/layout/default/images/no.png" class="icon16" />'
}}aD.innerHTML=aK;aD=null}};U.push(aP);if(a2.file_url&&a2.file_url.trim()!=""){var ap=a2.file_url.match(new RegExp("htt[ps]{1,2}://userscripts.org/scripts/source/([0-9]{1,9}).user.js"));
if(ap&&ap.length==2){var aG=i("a",a2.name,a2.id,"hp");
aG.setAttribute("href","http://userscripts.org/scripts/show/"+ap[1]);
aG.setAttribute("target","_blank");var aT=l.createImage(d.staticVars.USOicon,a2.name,a2.id,"uso","");
aG.appendChild(aT);aJ.appendChild(aG)}}ak[a2.id]["deleteScript"]=function(a7,a9){if(a2.nativeScript){var a8=a9||confirm(j.getMessage("Really_delete_0name0__",a2.name));
if(a8==true){Y(a2.id,"installed","false");a5.parentNode.removeChild(a5)
}}else{var a8=a9||confirm(j.getMessage("Really_delete_0name0__",a2.name));
if(a8==true){var a6={reload:!a9};E(a2.name,null,a6);
a5.parentNode.removeChild(a5)}}};var aE=[];if(a2.nativeScript){ak[a2.id]["importNativeScript"]=function(a6,a8){var a7=a8||confirm(j.getMessage("Really_import_0name0__",a2.name));
if(a7==true){Y(a2.id,"imported","true");a5.parentNode.removeChild(a5)
}};var aU=l.createImage(chrome.extension.getURL("/layout/default/images/import.png"),a2.nativeScript?a2.id:a2.name,"import","import",j.getMessage("Import"),function(){x(a2.id,"importNativeScript")
});l.addClass(aU,"hidden");aE.push(aU);var aZ=function(){if(!O.native_import){return
}l.toggleClass(aU,"hidden")};U.push(aZ)}if(a2.id&&!a2.system){var aB=l.createImage(chrome.extension.getURL("/layout/default/images/delete.png"),a2.nativeScript?a2.id:a2.name,"delete","delete",j.getMessage("Delete"),function(){x(a2.id,"deleteScript")
});aE.push(aB)}var av=function(){var a6=a2.enabled?chrome.extension.getURL("/layout/default/images/greenled.png"):chrome.extension.getURL("/layout/default/images/redled.png");
var a8=aR(a2,aW,"script_td05","scripttd_enable");a8.setAttribute("class","imagetd");
var a7=function(){x(a2.id,a2.nativeScript?"switchNativeEnabled":"switchEnabled")
};var ba=(a2.position>0)?((a2.position<10)?" "+a2.position:a2.position):null;
var a9=l.createImageText(a6,a2.nativeScript?a2.id:a2.name,"enabled","enabled",a2.enabled?j.getMessage("Enabled"):j.getMessage("Disabled"),a7,a2.nativeScript?"":ba);
ak[a2.id]["switchEnabled"]=function(bc,bd,bb){if(bd===undefined){bd=!a2.enabled
}I(a2.name,"enabled",bd,bb)};ak[a2.id]["switchNativeEnabled"]=function(bc,bd,bb){if(bd===undefined){bd=!a2.enabled
}Y(a2.id,"enabled",bd,bb)};a8.appendChild(a9);a9=null;
return a8};if(!aW.inserted&&!a2.nativeScript){aW.addEventListener("click",au)
}aW.appendChild(aq);var ar=aR(a2,aW,"script_td1","scripttd_name");
ar.title=a2.description?a2.name+"\n\n"+a2.description:a2.name;
var ax=aR(a2,aW,"script_td0","scripttd_sel");if(a2.id&&!a2.system){ax.appendChild(al(a2))
}aM.push(ax);aM.push(av());aM.push(ar);aM.push(aR(a2,a3,"script_td24","scripttd"));
aM.push(aR(a2,L(a2),"script_td25","scripttd"));aM.push(aR(a2,aD,"script_td26","scripttd"));
aM.push(aR(a2,K(a2),"script_td3"));aM.push(aR(a2,M(a2),"script_td4"));
aM.push(aR(a2,aJ,"script_td5"));aM.push(aR(a2,aH,"script_td6"));
aM.push(aR(a2,X(a2),"script_td7"));aM.push(aR(a2,aE,"script_td8"));
for(var aY=aM.length;aY<10;aY++){aM.push(i("td",a2.name,a2.id,"script_filler_"+aY))
}if(a2.nnew){var aQ=function(){au(null,true)};window.setTimeout(aQ,100);
if(!D&&P.open==="0"){window.setTimeout(au,1000)}}else{if(P.open){if(!D&&a2.id===P.open){window.setTimeout(au,1000)
}}}return aM};var L=function(aq){var ar=i("span",aq.name,aq.id,"pos_type",true);
if(!aq.id){return ar}if(aq.user_agent){var ap=l.createImage("images/user_agent.png",aq.name,aq.id,"user_agent",j.getMessage("This_only_changes_the_user_agent_string"));
ar.appendChild(ap)}else{if(aq.nativeScript){var ap=l.createImage(aq.icon,aq.name,aq.id,"chrome_ext",j.getMessage("This_is_a_chrome_extension"));
ar.appendChild(ap)}else{if(aq.userscript){var ap=l.createImage("images/txt.png",aq.name,aq.id,"user_agent",j.getMessage("This_is_a_userscript"));
ar.appendChild(ap)}}}return ar};var M=function(at){var au=i("span",at.name,at.id,"pos_features",true);
if(!at.id){return au}if(at.system){var ap=l.createImage(chrome.extension.getURL("/layout/default/images/lock.png"),at.name,at.id,"lock",j.getMessage("This_is_a_system_script"));
au.appendChild(ap)}if(at.awareOfChrome||at.nativeScript){var ap=l.createImage("http://www.google.com/images/icons/product/chrome-16.png",at.name,at.id,"chrome_mode",j.getMessage("This_script_runs_in_Chrome_mode"));
au.appendChild(ap)}if(at.nativeScript){return au}var av=false;
var ar={includes:true,matches:true};for(var aq in ar){if(!at[aq]){continue
}for(var aw=0;aw<at[aq].length;aw++){if(at[aq][aw]&&(at[aq][aw].search("https")!=-1||at[aq][aw].search(/^\*:\/\//)!=-1)){var ap=l.createImage(chrome.extension.getURL("/layout/default/images/halfencrypted.png"),at.name,at.id,"encrypt",j.getMessage("This_script_has_access_to_https_pages"));
au.appendChild(ap);av=true;break}}if(av){break}}if(at.user_agent){return au
}if(at.code.search("GM_xmlhttpRequest")!=-1){var ap=l.createImage(chrome.extension.getURL("/layout/default/images/web.png"),at.name,at.id,"web",j.getMessage("This_script_has_full_web_access"));
au.appendChild(ap)}if(at.code.search("GM_setValue")!=-1){var ap=l.createImage(chrome.extension.getURL("/layout/default/images/db.png"),at.name,at.id,"db",j.getMessage("This_script_stores_data"));
au.appendChild(ap)}if(at.code.search("unsafeWindow")!=-1){var ap=l.createImage(chrome.extension.getURL("/layout/default/images/resources.png"),at.name,at.id,"resource",j.getMessage("This_script_has_access_to_webpage_scripts"));
au.appendChild(ap)}for(var aq in at.options){if(aq.search("compat_")!=-1&&at.options[aq]){var ap=l.createImage(chrome.extension.getURL("/layout/default/images/critical.png"),at.name,at.id,"crit",j.getMessage("One_or_more_compatibility_options_are_set"));
au.appendChild(ap);break}}return au};var Z=null;var ac=null;
var H=null;var aa=0;var aj=0;var F=function(ap){var aq={x:H.x+ap.pageX,y:H.y+ap.pageY};
Z.style.top=aq.y+"px";Z.style.left=aq.x+"px"};var B=function(at){if(Z){F(at);
var ar=ac.previousSibling,aq=ac.nextSibling,ap=ac.parentNode,au=ao(ac);
if(at.pageY>au.y+aa&&aq){ap.removeChild(aq);ap.insertBefore(aq,ac);
aj++}else{if(at.pageY<au.y&&aj>1){ap.removeChild(ar);
if(aq){ap.insertBefore(ar,aq)}else{ap.appendChild(ar)
}aj--}}}};document.addEventListener("mousemove",B);
var ao=function(aq){var ap=aq.offsetLeft;var ar=aq.offsetTop;
while(aq=aq.offsetParent){ap+=aq.offsetLeft;ar+=aq.offsetTop
}return{x:ap,y:ar}};var t=function(ap,aq){Z=ap;ac=Z.parentNode.parentNode.parentNode;
aa=ac.offsetHeight;H=ao(ac.parentNode.parentNode);H.x=-H.x-Z.offsetWidth/2;
H.y=-H.y-Z.offsetHeight/2;Z.style.position="absolute";
F(aq)};var N=function(){Z.style.position="static";I(Z.name,Z.key,aj);
Z=ac=H=null};var X=function(aq){var ar=i("span",aq.name,aq.id,"pos_images",true);
if(!aq.id||aq.nativeScript){return ar}if(aq.position>1||aq.position<aq.positionof){var ap=g("span","clickable movable","position",aq.id,true);
ap.innerHTML="&#9776;";ap.title=j.getMessage("Click_here_to_move_this_script");
ap.name=aq.name;ap.key="position";ap.addEventListener("click",function(at){if(Z){N()
}else{t(this,at);aj=aq.position}});ar.appendChild(ap)
}return ar};var K=function(aE){var aD=i("span",aE.name,aE.id,"site_images");
var aA=null;if(aD.inserted){aA=aD;aA.setAttribute("id",aA.id+"foo");
aD=i("span",aE.name,aE.id,"site_images")}var aw=function(aO){if(aO.search(/\//)==0){aO=aO.replace(/^\/|\/$|\^|\$|\?|\(|\)|\+|\\|\[.*\]|\.\*|[\-\.a-zA-Z0-9]+\/$|/g,"").replace(/\/\/$/g,"")
}aO=aO.replace(/^\*:\/\//,"http://");if(aO.search("http")!=0){aO="http://"+aO
}var aK=aO.split("/");if(aK.length<3){return null}var aQ=aK[2].split(".");
if(aQ.length<2){return null}var aL=aQ[aQ.length-1];
var aP=aQ[aQ.length-2];var aN=[];for(var aM=aQ.length-3;
aM>=0;aM--){if(aQ[aM].search("\\*")!=-1){break}aN.push(aQ[aM])
}return{tld:aL,dom:aP,predom:aN.reverse()}};if(aE.includes||aE.matches){var aG=0;
var aH=aE.includes.length?aE.includes:aE.matches;for(var aC=0;
aC<aH.length;aC++){var az=aH[aC];if(!az){console.log("o: Warn: script '"+aE.name+"' has invalid include (index: "+aC+")");
continue}if(az.search(/htt(ps|p):\/\/(\*\/\*|\*)*$/)!=-1||az.search(/\*:\/\/(\*\/\*|\*)*$/)!=-1||az=="*"){var aJ=l.createImage(chrome.extension.getURL("/layout/default/images/web.png"),aE.name,aE.id,az,az);
aD.appendChild(aJ,true);break;continue}var av=aw(az);
if(av==null){var aJ=l.createFavicon("?",aE.name,aE.id,az,az);
aD.appendChild(aJ,true);continue}var au=false;for(var aB=0;
aB<aC;aB++){var aq=aH[aB];if(aq){var ap=aw(aq);if(ap==null){continue
}if(ap.dom==av.dom){au=true;break}}}if(!au){var aF="com";
var aI="";if(av.tld!="*"&&av.tld!="tld"){aF=av.tld}if(av.predom.length){aI=av.predom.join(".")+"."
}var ar=("chrome://favicon/http://"+aI+av.dom+"."+aF+"/").replace(/\*/g,"");
var at=("http://"+aI+av.dom+"."+aF+"/favicon.ico").replace(/\*/g,"");
var ay=[at,ar];if(at.search("http://userscripts.org/")==0||at.search("http://userscripts.com/")==0){ay=d.staticVars.USOicon
}var aJ=l.createFavicon(ay,aE.name,aE.id,az,az);aD.appendChild(aJ,true);
aG++}if(aG>7){var ax=g("span",aE.name,aE.id,"tbc");
ax.textContent="...";aD.appendChild(ax,true);break}}}if(aA){aA.parentNode.removeChild(aA)
}return aD};var s=function(){var aq=document.getElementsByName("scriptselectors");
var ar=0;for(var ap=0;ap<aq.length;ap++){if(aq[ap].checked){ar++
}}};var v=function(){var ap=0;ak.multiselect={};ak.multiselect["single_click"]=function(){var au=0;
var ay=document.getElementsByName("scriptselectors");
var ar=true;var aw=false;var az=false;var at=true;var aA=false;
var av=false;for(var ax=0;ax<ay.length;ax++){if(ay[ax].s_type=="n"){az=true;
ar=ar&&ay[ax].checked;aw=aw||ay[ax].checked}else{if(ay[ax].s_type=="s"){av=true;
at=at&&ay[ax].checked;aA=aA||ay[ax].checked}}}if(az){if(ar&&!aA){au=1
}else{if(at&&!aw&&aA){au=2}}}else{if(av&&at){au=3}}if(au!=ap){ap=au;
var aq=i("input","sms","all");aq.checked=(au!=0)}};
ak.multiselect["un_selectAll"]=function(){if(++ap>3){ap=0
}var at=false;var ar=document.getElementsByName("scriptselectors");
for(var aq=0;aq<ar.length;aq++){if(aq==0&&(ap==1||ap==3)&&ar[aq].s_type=="s"){if(++ap>3){ap=0
}}at|=(ar[aq].s_type=="s");ar[aq].checked=(ap==3||ap==1&&ar[aq].s_type=="n"||ap==2&&ar[aq].s_type=="s")
}if(ap>1&&!at){ap=0}this.checked=(ap!=0)}};var al=function(aq){var ap=i("input",aq.name,aq.id,"sel");
ap.type="checkbox";ap.s_id=aq.id;ap.name="scriptselectors";
ap.s_type=aq.nativeScript?"n":"s";if(!ap.inserted){ap.addEventListener("click",function(){ak.multiselect["single_click"]()
})}return ap};var an=function(ar){var av=i("input","sms","all",null,true);
av.type="checkbox";av.mode=0;av.addEventListener("click",ak.multiselect["un_selectAll"]);
var ay=0;var aw=[{name:j.getMessage("__Please_choose__"),value:0},{name:j.getMessage("Enable"),value:1},{name:j.getMessage("Disable"),value:2},{name:j.getMessage("Trigger_Update"),value:5},{name:j.getMessage("Remove"),value:6}];
var au={value:0,id:"sms",name:"select"};var at=function(){if(this.value==0){ax.setAttribute("disabled","true")
}else{ax.removeAttribute("disabled")}ay=this.value};
var az=l.createDropDown(j.getMessage("Apply_this_action_to_the_selected_scripts"),au,aw,at);
az.elem.setAttribute("class","float");var ap=function(){if(ay==0){console.log("option: ?!?!");
return}if(ay==6){if(!confirm(j.getMessage("Really_delete_the_selected_items_"))){return
}}var aF=document.getElementsByName("scriptselectors");
var aD=[];for(var aA=0;aA<aF.length;aA++){aD.push(aF[aA])
}var aC,aE=false,aB=100;for(var aA=0;aA<aD.length;aA++){if(!aD[aA].checked){continue
}if(ay==1||ay==2){aC=(aD[aA].s_type=="n")?"switchNativeEnabled":"switchEnabled";
x(aD[aA].s_id,aC,null,(ay==1),false);aE=true}else{if(ay==5){aC="scriptUpdate";
x(aD[aA].s_id,aC)}else{if(ay==6){aC="deleteScript";
x(aD[aA].s_id,aC,null,true);aE=true;aB=1500}}}}if(aE){f.wait(j.getMessage("Please_wait___"));
window.setTimeout(function(){I(null,false,null,true)
},aB)}};var ax=l.createButton("MultiSelectButton","button",j.getMessage("Start"),ap);
ax.setAttribute("disabled","true");ax.setAttribute("style","height: 19px; top: 2px; position: relative; padding-top: -1px;");
var aq=i("div",ar.name,ar.id,"actions");aq.appendChild(az.elem);
aq.appendChild(ax);return{selAll:av,actionBox:aq}};
v();var R={options:{maxerr:999,newcap:true,es5:true,sloppy:true,browser:true,white:true,plusplus:true,nomen:true,"continue":true,todo:true,eqeq:true,passfail:false,unparam:true,devel:true},JSLINT_GLOBALS:["CDATA","XPathResult","xpath","uneval","escape","unescape","console","JSON","TM_info","GM_info","TM_addStyle","TM_deleteValue","TM_listValues","TM_getValue","TM_log","TM_registerMenuCommand","TM_openInTab","TM_setValue","TM_addValueChangeListener","TM_removeValueChangeListener","TM_xmlhttpRequest","TM_getTab","TM_saveTab","TM_getTabs","TM_installScript","TM_runNative","TM_execUnsafe","TM_notification","TM_getResourceText","TM_getResourceURL","GM_addStyle","GM_deleteValue","GM_listValues","GM_getValue","GM_log","GM_registerMenuCommand","GM_openInTab","GM_setValue","GM_addValueChangeListener","GM_removeValueChangeListener","GM_xmlhttpRequest","GM_getTab","GM_saveTab","GM_getTabs","GM_installScript","GM_runNative","GM_setClipboard","GM_execUnsafe","GM_notification","GM_getResourceText","GM_getResourceURL"],cleanGutters:function(aq,ap){aq.clearGutter("gutter")
},setGutters:function(ay,az){for(var aw in az){if(!az.hasOwnProperty(aw)){continue
}var av=az[aw];var ap=0;var ax=null;var aA=[];av.marks=[];
for(var at=0;at<av.length;at++){var aB="";var ar=av[at];
if(ar.stop){ax="no";ap=3}else{if(ar.warn){if(ap<1){ax="critical";
ap=1}aB=j.getMessage("Warning")+": "}else{if(ar.info){if(ap==0){ax="info"
}aB=j.getMessage("Info")+": "}else{if(ap<2){ax="error";
ap=2;aB=j.getMessage("Error")+": "}}}}aA.push(((av.length>1)?aB:"")+ar.text.replace(/\"/g,'\\"'));
if(!ar.stop){av.marks.push(ay.markText({line:ar.line-1,ch:ar.character-1},{line:ar.line-1,ch:ar.character-1+ar.evle},{className:"CodeMirror-highlight-"+ax}))
}}var au='<span class="editor_gutter" title="'+aA.join("\n\n")+'"><span width="15px"><img class="editor_gutter_img" src="/layout/default/images/'+ax+'.png"/></span></span>';
var aq=document.createElement("span");aq.innerHTML=au;
ay.setGutterMarker(Number(aw)-1,"gutter",aq)}return az
},run:function(av){if(av.oldGutters){R.cleanGutters(av.mirror,av.oldGutters)
}var ap=av.mirror.getValue();var ay=null;try{ay=JSLINT
}catch(aL){}var aq="/*global "+R.JSLINT_GLOBALS.join(": true, ")+"*/\n";
var az=ay?ay(aq+ap,R.options):true;if(az){return}else{var au={};
for(var aG in JSLINT.errors){var aF=JSLINT.errors[aG];
if(aF&&aF.line>1){var aE=aF.line-1;var at=aF.character;
var aJ=0;var ar=(aF.reason.search("Mixed spaces and tabs")!=-1);
var aH=0;try{var ax=!!aF.evidence&&!ar;if(ax){for(var aB=0,aw=0;
aB<at&&aw<at;aB++,aw++){if(aF.evidence.charCodeAt(aB)==9){aw+=O.editor_indentUnit-1;
aJ+=1}}}var aM=aJ*(O.editor_indentUnit-1);at-=aM;if(ax||ar){var aA=aF.evidence.length>at?aF.evidence.substr(at-1):"";
var aD=ar?aA.match(/([ \t])*/):aA.match(/([a-zA-Z0-9_])*/);
aH=aD&&aD.length?aD[0].length:0}}catch(aI){console.log("jslint: error parsing source "+aI.message)
}var aK=aH||1;var aC={line:aE,stop:aF.reason.search("Stopping")==0,info:ar||aF.reason.search("Combine this with the previous 'var'")!=-1||aF.reason.search("Expected '{' and instead saw")!=-1||aF.reason.search("Move 'var' declarations to the top")!=-1,warn:aF.id!="(error)"||aF.reason.search("used before it was defined")!=-1,character:at,evle:aK,text:aF.reason.replace(/.$/,"")};
if(aC.stop){aE++}if(!au[aE]){au[aE]=[]}au[aE].push(aC)
}}av.oldGutters=R.setGutters(av.mirror,au)}}};var w=null;
var o=null;var Q=function(ap){if(w!=null){window.clearTimeout(w);
w=null;Q(ap?ap:o.items)}else{o={items:ap};w=window.setTimeout(function(){w=null;
V(o.items);o=null},50)}};var ah=function(aq,ap){try{var at=function(au){chrome.tabs.sendMessage(au.id,{method:"loadUrl",url:aq,newtab:ap},function(av){})
};if(ap){sendMessage({method:"openInTab",url:aq},function(au){})
}else{chrome.tabs.getSelected(null,at)}}catch(ar){console.log("lU: "+ar.message)
}};var E=function(at,au,ar,ap){if(ar.reload===undefined){ar.reload=true
}try{var aq=(ar.new_url&&ar.new_url!=ar.old_url)?ar.new_url:"";
sendMessage({method:"saveScript",name:at,code:au,clean:ar.clean,force:ar.force,force_url:aq,lastModified:ar.lastModified,reload:ar.reload},function(aw){if(aw.items){Q(aw.items)
}if(!au&&ar.reload){f.hide()}if(ap){ap(aw)}});f.wait(j.getMessage("Please_wait___"))
}catch(av){console.log("sS: "+av.message)}};var J=function(ap,aq,at){try{sendMessage({method:"setOption",name:ap,value:aq},function(au){O=au.options||O;
if(!at){Q(au.items)}});f.wait(j.getMessage("Please_wait___"))
}catch(ar){console.log("sO: "+ar.message)}};var u=function(ap,ar,au,aq){try{sendMessage({method:"buttonPress",name:ap},function(av){if(aq){window.location.reload()
}else{if(!au){Q(av.items)}else{f.hide()}}});f.wait(j.getMessage("Please_wait___"))
}catch(at){console.log("sO: "+at.message)}};var y=function(at,ar,av,aq){if(b){console.log("run modifyScriptOptions")
}if(av==undefined){av=true}try{var au={method:"modifyScriptOptions",name:at,reload:av,reorder:aq};
for(var ap in ar){if(!ar.hasOwnProperty(ap)){continue
}au[ap]=ar[ap]}if(b){console.log("modifyScriptOptions sendReq")
}sendMessage(au,function(ax){O=ax.options||O;if(ax.items){Q(ax.items)
}});f.wait(j.getMessage("Please_wait___"))}catch(aw){console.log("mSo: "+aw.message)
}};var I=function(aq,aw,au,at,ap){if(b){console.log("run modifyScriptOption")
}if(at===undefined){at=true}try{var ar={method:"modifyScriptOptions",name:aq,reload:at,reorder:ap};
if(aw&&aw!=""){ar[aw]=au}if(b){console.log("modifyScriptOption sendReq")
}sendMessage(ar,function(ax){O=ax.options||O;if(ax.i18n){j.setLocale(ax.i18n)
}if(ax.items){Q(ax.items)}});f.wait(j.getMessage("Please_wait___"))
}catch(av){console.log("mSo: "+av.message)}};var Y=function(av,au,ar,aq){if(b){console.log("run modifyNativeScriptOption")
}if(aq===undefined){aq=true}try{var ap={method:"modifyNativeScript",nid:av,actionid:au,value:ar,reload:aq};
if(b){console.log("modifyNativeScriptOption sendReq")
}sendMessage(ap,function(aw){if(aw.items){Q(aw.items)
}});f.wait(j.getMessage("Please_wait___"))}catch(at){console.log("mSo: "+at.message)
}};var r=function(at,ap){try{var aq=function(au){if(ap){ap(au.updatable)
}};sendMessage({method:"buttonPress",name:"run_script_updates",scriptid:at},aq)
}catch(ar){console.log("rSu: "+ar.message)}};chrome.extension.onMessage.addListener(function(ar,aq,ap){if(b){console.log("o: method "+ar.method)
}if(ar.method=="updateOptions"){O=ar.options||O;Q(ar.items);
ap({})}else{if(ar.method=="confirm"){var at=function(au){ap({confirm:au})
};d.confirm(ar.msg,at)}else{if(ar.method=="showMsg"){d.alert(ar.msg);
ap({})}else{if(b){console.log("o: "+j.getMessage("Unknown_method_0name0",ar.method))
}return false}}}return true});sendMessage({method:"modifyScriptOptions"},function(ap){if(b){console.log("Init layout default")
}O=ap.options||O;if(ap.i18n){j.setLocale(ap.i18n)}if(ap.items){Q(ap.items)
}})})});