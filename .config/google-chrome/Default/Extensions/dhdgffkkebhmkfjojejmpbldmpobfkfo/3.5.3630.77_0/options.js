
Registry.require("prepare");Registry.require("xmlhttprequest");
Registry.require("pingpong");Registry.require("crcrc");
Registry.require("curtain");Registry.require("tabview");
Registry.require("htmlutil");Registry.require("helper");
Registry.require("statistics");Registry.require("convert");
Registry.require("i18n");Registry.require("syncinfo");
(function(){var e=false;if(!window.requestFileSystem){window.requestFileSystem=window.webkitRequestFileSystem
}var t=Registry.get("prepare").FEATURES;var M=Registry.get("crcrc").cr;
var x=Registry.get("crcrc").crc;var B=Registry.get("curtain");
var H=Registry.get("tabview");var W=Registry.get("htmlutil");
var aa=Registry.get("helper");var q=Registry.get("statistics");
var al=Registry.get("convert");var w=Registry.get("pingpong");
var r=Registry.get("i18n");var u=Registry.get("syncinfo");
var v=false;var ab=null;var K={};var R=[];var ai="0.0.0";
var p={};var L=aa.getUrlArgs();var a={};var ak={};var l=function(aq,V){if(ak[aq]&&ak[aq][V]){return ak[aq][V].apply(this,Array.prototype.slice.call(arguments,2))
}else{console.log("option: WARN: unable to find callback '"+V+"' for id '"+aq+"'")
}};var c=function(aq,V){aq.origin="options";chrome.extension.sendMessage(aq,V)
};var ad=function(){var V=function(){if(K.statistics_enabled){q.init(t.SELF.ID);
window.onerror=function(at,ar,aq){q.tE(at,ai+" "+ar,aq)
}}};R.push(V)};ad();var an=function(){while(R.length){var V=R.pop();
V()}};var P=function(aH,aQ){var aR=null;var aW=null;
var at=[];var aw=function(bj){var bd,aY,bl,bn,bm,bk;
var be=[],bc=[];bn=M("tbody",bj.name,bj.id,"body");
bm=M("tfoot",bj.name,bj.id,"foot");bk=M("thead",bj.name,bj.id,"head");
if(bj.scriptTab){var bg=ao(bj);bd=x("table","scripttable",bj.name,bj.id,"main");
var bb=x("th","",bj.name,bj.id,"thead_sel");bb.appendChild(bg.selAll);
var bi=x("td","",bj.name,bj.id,"tfoot_sel");var ba=x("th","",bj.name,bj.id,"thead_en");
var bh=x("td","",bj.name,bj.id,"tfoot_en");bh.setAttribute("colspan","9");
bh.appendChild(bg.actionBox);var a9=x("th","settingsth",bj.name,bj.id,"thead_name");
a9.textContent=r.getMessage("Name");var a0=x("th","settingsth",bj.name,bj.id,"thead_ver");
a0.textContent=r.getMessage("Version");var aZ=x("th","settingsth",bj.name,bj.id,"thead_type");
aZ.textContent=r.getMessage("Type");var aX=x("th","settingsth",bj.name,bj.id,"thead_sync");
aX.textContent="";var a8=x("th","settingsth",bj.name,bj.id,"thead_sites");
a8.width="25%";a8.textContent=r.getMessage("Sites");
var a7=x("th","settingsth",bj.name,bj.id,"thead_features");
a7.textContent=r.getMessage("Features");var a6=x("th","settingsth",bj.name,bj.id,"thead_edit");
a6.textContent=r.getMessage("Homepage");var a4=x("th","settingsth",bj.name,bj.id,"thead_updated");
a4.textContent=r.getMessage("Last_Updated");var a3=x("th","settingsth",bj.name,bj.id,"thead_sort");
a3.textContent=r.getMessage("Sort");var a2=x("th","settingsth",bj.name,bj.id,"thead_del");
a2.textContent=r.getMessage("Actions");var a1=function(){if(K.sync_enabled){aX.textContent=r.getMessage("Imported")
}};R.push(a1);be=be.concat([bb,ba,a9,a0,aZ,aX,a8,a7,a6,a4,a3,a2]);
aY=x("tr","settingstr filler",bj.name,bj.id,"filler");
for(var bf=0;bf<be.length;bf++){aY.appendChild(be[bf])
}bc=bc.concat([bi,bh]);bl=x("tr","settingstr filler",bj.name,bj.id,"footer");
for(var bf=0;bf<bc.length;bf++){bl.appendChild(bc[bf])
}var a5=x("td","settingstd filler",bj.name,bj.id,"filler_td"+bj.id);
aY.appendChild(a5);bk.appendChild(aY);bm.appendChild(bl)
}else{bd=x("table","settingstable",bj.name,bj.id,"main");
aY=x("tr","settingstr filler",bj.name,bj.id,"filler");
bn.appendChild(aY)}bd.appendChild(bk);bd.appendChild(bn);
bd.appendChild(bm);return{table:bd,head:bk,body:bn,foot:bm}
};var ay=function(aY){if(aY.once){if(a[aY.msg]){return true
}else{a[aY.msg]=true}}var aZ=confirm(aY.msg);var aX={};
if(aZ&&aY.ok){aX=aY.ok}else{if(!aZ&&aY.cancel){aX=aY.cancel
}}if(aY.ok||aY.cancel){aZ=true}if(aX.url){c({method:"openInTab",url:aX.url},function(a0){})
}return aZ};var ax=null;var aE=null;var aB=false;for(var aK in aH){var aO=aH[aK];
if(e){console.log("options: process Item "+aO.name)
}var V=x("tr","settingstr",aO.name,aO.id,"outer");if(aO.divider){V=null
}else{var aV=M("td",aO.name,aO.id,"0");V.appendChild(aV);
var au=M("td",aO.name,aO.id,"1");if(aO.image){au.setAttribute("class","imagetd");
au.appendChild(W.createImage(aO.image,aO.name,aO.id))
}var ar=x("td","settingstd",aO.name,aO.id,"2");if(aO.option){K[aO.id]=aO.checkbox?aO.enabled:aO.value
}if(aO.checkbox){var aI=function(){enableScript(this.key,this.checked)
};var aL=function(){var aX=true;if(this.warning){aX=ay(this.warning);
if(!aX){this.checked=!this.checked}}if(aX){E(this.key,this.checked,this.reload);
if(this.reload){window.location.reload()}}};if(ax&&aB){aI=null;
aL=null}var aA=W.createCheckbox(aO.name,aO,aO.option?aL:aI);
if(aO.validation){o(aO,aA.elem)}if(ax){ax.appendChild(aA.elem);
V=null}else{ar.appendChild(aA.elem)}aA.elem.setAttribute("style",(aO.level>K.configMode)?aa.staticVars.invisible:aa.staticVars.visible)
}else{if(aO.button){var aL=function(){var aX=true;if(this.warning){aX=ay(this.warning)
}if(aX){i(this.key,true,this.ignore,this.reload)}};
var aA=W.createButton(aO.name,aO,aL);if(ax){ax.appendChild(aA);
V=null}else{ar.appendChild(aA)}aA.setAttribute("style",(aO.level>K.configMode)?aa.staticVars.invisible:aa.staticVars.visible)
}else{if(aO.input){var aA=W.createTextarea(aO.name,aO);
if(aO.validation){o(aO,aA.elem)}if(ax){ax.appendChild(aA.elem);
if(aO.hint){var aP=M("span",aO.name,aO.id,"hint");aP.textContent=aO.hint;
aA.elem.appendChild(aP)}V=null;aB=true}else{ar.appendChild(aA.elem)
}aA.elem.setAttribute("style",(aO.level>K.configMode)?aa.staticVars.invisible:aa.staticVars.visible)
}else{if(aO.text){var aA=W.createInput(aO.name,aO);
if(aO.width){aA.input.setAttribute("style","width: "+(aO.width*172)+"px;")
}if(aO.validation){o(aO,aA.elem)}if(ax){ax.appendChild(aA.elem);
if(aO.hint){var aP=x("span","hint",aO.name,aO.id,"hint");
aP.textContent=aO.hint;aA.elem.appendChild(aP)}V=null;
aB=true}else{ar.appendChild(aA.elem)}aA.elem.setAttribute("style",(aO.level>K.configMode)?aa.staticVars.invisible:aa.staticVars.visible)
}else{if(aO.password){var aA=W.createPassword(aO.name,aO);
if(ax){ax.appendChild(aA.elem);V=null;aB=true}else{ar.appendChild(aA.elem)
}aA.elem.setAttribute("style",(aO.level>K.configMode)?aa.staticVars.invisible:aa.staticVars.visible)
}else{if(aO.select){var aI=function(){var aX=true;if(this.warning){aX=ay(this.warning);
if(!aX){this.value=this.oldvalue}}if(aX){E(this.key,this.value,this.reload);
if(this.reload){window.location.reload()}}};if(ax&&aB){aI=null;
if(aO.enabler){aI=function(){var aZ=document.getElementsByName("enabled_by_"+this.key);
var aX=(this.selectedIndex<this.options.length)?this.options[this.selectedIndex]:this.options[0];
var aY=aX.getAttribute("enables");var a0=aY?JSON.parse(aY):{};
aa.forEach(aZ,function(a1){if(a0[a1.key]===undefined||a0[a1.key]==1){a1.setAttribute("style",aa.staticVars.visible)
}else{a1.setAttribute("style",aa.staticVars.invisible)
}})}}}var aA=W.createDropDown(aO.name,aO,aO.select,aI);
if(aO.validation){o(aO,aA.elem)}if(ax){ax.appendChild(aA.elem);
V=null}else{ar.appendChild(aA.elem)}aA.elem.setAttribute("style",(aO.level>K.configMode)?aa.staticVars.invisible:aa.staticVars.visible);
if(ax&&aO.enabler){var az=function(){var aX=aI;var aY=aA;
R.push(function(){aX.apply(aY.select,[])})};az()}}else{if(aO.url){var aU=M("a",aO.name,aO.id);
aU.href="javascript://nop/";aU.url=aO.url;aU.newtab=aO.newtab;
if(!aU.inserted){var aI=function(){ah(this.url,this.newtab)
};aU.addEventListener("click",aI)}aU.textContent=aO.name;
if(ax){ax.appendChild(aU);V=null}else{ar.setAttribute("colspan","2");
ar.appendChild(aU)}}else{if(aO.heading){var aP=M("span",aO.name,aO.id);
aP.textContent=aO.name;aR=aw(aO);aW=M("div",aO.name,aO.id,"tab_content");
aW.appendChild(aR.table);V=null;var aq=aQ.appendTab(aO.id||aa.createUniqueId(aO.name,""),aP,aW);
if(!v&&aO.selected_default){aq.select()}}else{if(aO.section){if(ax&&aB){var aT=M("input",ax.name,ax.id,"Save");
if(!aT.inserted){aT.type="button";aT.section=ax;aT.value=r.getMessage("Save");
var aG=function(){var aX=Array.prototype.slice.call(this.section.getElementsByTagName("textarea"));
var a1=function(a7){aa.forEach(a7,function(a8){aX.push(a8)
})};a1(document.evaluate('//div[@id="'+this.section.id+'"]//input',this.section,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null));
a1(document.evaluate('//div[@id="'+this.section.id+'"]//select',this.section,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null));
for(var aY=0;aY<aX.length;aY++){var aZ=null;var a2=aX[aY];
var a5=a2.key;if(a2.tagName.toLowerCase()=="textarea"){if(a2.array){var a4=a2.value.split("\n");
var a0=[];for(var a6=0;a6<a4.length;a6++){if(a4[a6]&&a4[a6].trim()!=""){a0.push(a4[a6])
}}aZ=a0}else{aZ=a2.value}}else{if(a2.getAttribute("type")=="checkbox"){aZ=a2.checked
}else{if(a2.getAttribute("type")=="select"){var a3=0;
if(a2.selectedIndex>=0&&a2.selectedIndex<a2.options.length){a3=a2.selectedIndex
}aZ=a2[a3]?a2[a3].value:a2.options[0].value}else{if(a2.getAttribute("type")=="button"){}else{aZ=a2.value
}}}}if(a5){E(a5,aZ)}}};aT.addEventListener("click",aG,false)
}ax.appendChild(aT);V=null}if(aO.endsection){continue
}var aG=x("div","section",aO.name,aO.id);var aP=x("div","section_head",aO.name,aO.id,"head");
var aS=x("div","section_content",aO.name,aO.id,"content");
aP.textContent=aO.name;aG.appendChild(aP);aG.appendChild(aS);
if(aE==null){aE=x("div","section_table","","");ar.appendChild(aE);
ar.setAttribute("class","section_td")}else{V=null;ar=null
}aB=false;aE.appendChild(aG);aG.setAttribute("style",(aO.level>K.configMode)?aa.staticVars.invisible:aa.staticVars.visible);
ax=aS;if(aO.needsave){aB=true}au=null}else{if(aO.menucmd){var aN=M("span",aO.name,aO.id,false,true);
aN.textContent=aO.name;ar.setAttribute("colspan","2");
ar.appendChild(aN)}else{if(aO.userscript||aO.nativeScript||aO.user_agent){ar.setAttribute("colspan","2");
var aM=s(aO,V,aQ);V.setAttribute("class","scripttr");
if(aO.nnew){V.setAttribute("style","display: none;")
}for(var aC=0;aC<aM.length;aC++){V.appendChild(aM[aC])
}if(aO.userscript||aO.user_agent){at.push({script:V,pos:aO.position,posof:aO.positionof})
}au=null}else{if(aO.version){ai=aO.value;V=null;var av=x("div","version","version","version");
av.textContent="v"+ai+" by Jan Biniok"}else{if(aO.globalhint){var aF=x("span","global_hint","globalhint","globalhint");
var aJ=M("span","globalhintt","globalhintt");var aD=M("span","globalhintt","globalhintt");
aD.textContent=aO.value;if(aO.icon){aJ.appendChild(W.createImage(aO.icon,"globalhint","icon"))
}aJ.appendChild(aD);aF.appendChild(aJ);document.body.appendChild(aF);
V=null}else{var aN=M("span",aO.name,aO.id);aN.textContent=aO.name;
ar.setAttribute("colspan","2");ar.appendChild(aN)}}}}}}}}}}}}}if(V){if(au){V.insertBefore(au,aV)
}if(ar){V.appendChild(ar,aV)}V.removeChild(aV);var aS=V.getAttribute("class");
var aP=" hide";if(aO.visible===false){aS+=aP}else{aS=aS.replace(aP,"")
}V.setAttribute("class",aS)}}if(aR&&V){aR.body.appendChild(V)
}}d(at);R.push(ak.multiselect["single_click"])};var o=function(ar,at){var V;
if(ar.validation&&ar.validation.url){V=function(){ah(this.url,true)
}}var aq=W.createValidation(ar,V);if(aq){aq.url=ar.validation.url;
at.appendChild(aq)}};var T=function(aQ){var aP={name:"utils",id:"utils"};
var aR=M("div",aP.name,aP.id,"tab_util_h");aR.textContent=r.getMessage("Utilities");
var au=M("div",aP.name,aP.id,"tab_util");var aw=aQ.appendTab(aa.createUniqueId(aP.name,aP.id),aR,au);
aw.show();var ax=x("div","tv_util",aP.name,aP.id,"tab_util_cont");
var aA=function(){var aX={created_by:"Tampermonkey",version:"1",scripts:[]};
for(var aW in ab){var aY=ab[aW];if((aY.userscript||aP.user_agent)&&aY.id&&!aY.system){var aV={name:aY.name,options:aY.options,enabled:aY.enabled,position:aY.position};
if(aY.file_url&&aY.file_url.trim()!=""){aV.file_url=aY.file_url
}if(aY.code&&aY.code.trim()!=""){aV.source=al.Base64.encode(al.UTF8.encode(aY.code));
aX.scripts.push(aV)}else{console.log("options: Strange script: "+aY.name)
}}}return JSON.stringify(aX)};var aM=function(aV){var a0=false;
var aY=0;if(aV.trim()!=""){var aZ=null;try{aZ=JSON.parse(aV)
}catch(a4){var a3="<body>";var a2="</body>";if(aV.search(a3)!=-1){var a6=aV.indexOf(a3);
var a5=aV.lastIndexOf(a2);if(a6!=-1&&a5!=-1){aV=aV.substr(a6+a3.length,a5-(a6+a3.length));
aM(aV)}}else{aa.alert(r.getMessage("Unable_to_parse_this_"))
}return}var a1=function(a8){try{var a7=a8.name;var ba=al.UTF8.decode(al.Base64.decode(a8.source));
var a9=a8.file_url||a8.update_url;if(ba&&ba.trim()!=""){var bc=function(bd){if(bd.installed){var be=(a8.enable==undefined)?a8.enabled:a8.enable;
var bf=a8.options;bf.enabled=be;bf.position=a8.position;
m(a8.name,bf,false)}if(--aY==0){D(null,false,null,true,true)
}};aY++;c({method:"saveScript",name:a7,code:ba,reload:false,file_url:a9},bc)
}}catch(bb){a0=true;console.log("options: Error while importing script "+aX.name)
}};var aW=aZ.scripts;for(var aX=aW.length-1;aX>=0;aX--){a1(aW[aX])
}if(a0){aa.alert(r.getMessage("An_error_occured_during_import_"))
}}};var aC=function(aV){var aW="";switch(aV.code){case FileError.QUOTA_EXCEEDED_ERR:aW="QUOTA_EXCEEDED_ERR";
break;case FileError.NOT_FOUND_ERR:aW="NOT_FOUND_ERR";
break;case FileError.SECURITY_ERR:aW="SECURITY_ERR";
break;case FileError.INVALID_MODIFICATION_ERR:aW="INVALID_MODIFICATION_ERR";
break;case FileError.INVALID_STATE_ERR:aW="INVALID_STATE_ERR";
break;default:aW="Unknown Error";break}aa.alert("Error: "+aW)
};var aF=function(){aM(aD.value)};var aJ=function(){function aV(aW){aW.root.getFile("scripts.tmx",{},function(aX){aX.file(function(aZ){var aY=new FileReader();
aY.onloadend=function(a0){aM(this.result)};aY.readAsText(aZ)
},aC)},aC)}window.requestFileSystem(window.PERSISTENT,1024*1024,aV,aC)
};var aN=function(){var aV=aA();function aW(aX){aX.root.getFile("scripts.tmx",{create:true},function(aY){aY.createWriter(function(aZ){aZ.onwriteend=function(a1){console.log("Write completed.")
};aZ.onerror=function(a1){console.log("Write failed: "+a1.toString())
};var a0=new Blob([aV],{type:"text/plain"});aZ.write(a0)
},aC)},aC)}window.requestFileSystem(window.PERSISTENT,1024*1024,aW,aC)
};var aG=function(){var aV=aA();var aW=new Blob([aV],{type:"text/plain"});
saveAs(aW,"tmScripts.txt")};var aI=function(){aD.value=aA()
};var aO=W.createButton(aP.name,aP.id+"_i_ta",r.getMessage("Import_from_Textarea"),aF);
var aK=W.createButton(aP.name,aP.id+"_i_ls",r.getMessage("Import_from_SandboxFS"),aJ);
var ay=M("input",aP.name,aP.id+"_i_file","file");var at=function(aX){var aZ=aX.target.files;
var a1=[];var aW=function(){aM(a1.pop())};for(var aY=0,a0;
a0=aZ[aY];aY++){var aV=new FileReader();aV.onload=(function(a2){return function(a3){a1.push(a3.target.result);
window.setTimeout(aW,10)}})(a0);aV.readAsText(a0)}};
if(!ay.inserted){ay.type="file";ay.addEventListener("change",at,false)
}var ar=W.createButton(aP.name,aP.id+"_e_ta",r.getMessage("Export_to_Textarea"),aI);
var aE=W.createButton(aP.name,aP.id+"_e_doc",r.getMessage("Export_to_file"),aG);
var aT=W.createButton(aP.name,aP.id+"_e_ls",r.getMessage("Export_to_SandboxFS"),aN);
var aD=x("textarea","importta",aP.name,aP.id,"ta");
var aq=x("div","section",aP.name,aP.id,"ta");var aU=x("div","section_head",aP.name,aP.id,"head_ta");
var az=x("div","section_content",aP.name,aP.id,"content_ta");
aU.textContent=r.getMessage("TextArea");az.appendChild(ar);
az.appendChild(aO);az.appendChild(aD);aq.appendChild(aU);
aq.appendChild(az);var aL=x("div","section",aP.name,aP.id,"sb");
var aH=x("div","section_head",aP.name,aP.id,"head_sb");
var aS=x("div","section_content",aP.name,aP.id,"content_sb");
aH.textContent=r.getMessage("SandboxFS");aL.appendChild(aH);
aL.appendChild(aS);aS.appendChild(aT);aS.appendChild(aK);
var av=x("div","section",aP.name,aP.id,"fi");var V=x("div","section_head",aP.name,aP.id,"head_fi");
var aB=x("div","section_content",aP.name,aP.id,"content_fi");
V.textContent=r.getMessage("File");av.appendChild(V);
av.appendChild(aB);aB.appendChild(aE);aB.appendChild(ay);
ax.appendChild(av);ax.appendChild(aL);ax.appendChild(aq);
aa.forEach([aL,aq],function(aV){var aW=" hide";var aX=aV.getAttribute("class");
if(K.configMode<50){aX+=aW}else{aX=aX.replace(aW,"")
}aV.setAttribute("class",aX)});au.appendChild(ax)};
var S=function(ax){if(!ax){console.log("options: items is empty!");
return}ab=ax;var aq=document.getElementById("options");
var at=x("div","main_container p100100","options","main");
if(aq){var V=aq.parentNode;V.removeChild(aq);V.appendChild(at);
document.body.setAttribute("class","main")}if(e){console.log("options: head")
}var aA=x("div","head_container","opt","head_container");
var au=x("div","tv_container","opt","tv_container");
var ay=M("a","head_link","fire","head_link");ay.href="http://tampermonkey.net";
ay.target="_blank";var aB=x("div","float margin4","fire","head1");
var ar=x("img","banner","fire");ar.src=chrome.extension.getURL("images/icon128.png");
var az=x("div","float head margin4","fire","head2");
var aE=M("div","fire");var av=x("div","version","version","version");
av.textContent=" by Jan Biniok";var aD=M("div","search","box","");
aE.textContent="Tampermonkey";aB.appendChild(ar);az.appendChild(aE);
az.appendChild(av);ay.appendChild(aB);ay.appendChild(az);
aA.appendChild(ay);aA.appendChild(aD);at.appendChild(aA);
at.appendChild(au);if(e){console.log("options: tabView")
}var aw=H.create("_main",au);if(e){console.log("options: itemsToMenu")
}P(ax,aw);if(e){console.log("options: utilTab")}T(aw);
if(L.selected){if(!v){var aC=aw.getTabById(L.selected);
if(aC){aC.select()}}}v=true;B.hide();an()};var af=function(aQ,ar,au){var aJ=ar.item;
var aB=aJ.id+ar.id;var aP=(au?"orig_":"use_")+ar.id;
var ay=function(aR){return"select_"+aa.createUniqueId(aR,aJ.id)+"_sel1"
};var az=x("div","cludes",aQ,aB,"cb1");if(document.getElementById(ay(aP))){return{elem:az}
}var aI=M("span",aJ.name,aB,"cb2");if(au){var av=function(){if(this.type=="checkbox"){D(this.name,this.key,!this.oldvalue)
}};var aq="merge_"+ar.id;var aC=(aJ.options&&aJ.options.override&&aJ.options.override[aq])?true:false;
var aF=W.createCheckbox(aQ,{id:aq,name:aJ.name,enabled:aC},av);
aI.appendChild(aF.elem)}else{aI.textContent=aQ}az.title=aJ.desc?aJ.desc:"";
var V=(aJ.options&&aJ.options.override&&aJ.options.override[aP])?aJ.options.override[aP]:[];
var aG=x("select","cludes",aP,aJ.id,"sel1");aG.setAttribute("size","6");
for(var aD=0;aD<V.length;aD++){var ax=document.createElement("option");
ax.value=ax.text=V[aD];aG.appendChild(ax)}az.appendChild(aI);
az.appendChild(aG);var aL=function(){var aR=ay("use_"+(ar.id=="excludes"?"includes":"excludes"));
var aS=document.getElementById(aR);var aT=aG.options[aG.selectedIndex];
if(aT&&!aS.querySelector('option[value="'+aT.value+'"]')){aS.appendChild(aT.cloneNode(true));
aM()}};var at=function(){var aR=prompt(r.getMessage("Enter_the_new_rule"));
if(aR){var aS=document.createElement("option");aS.value=aS.text=aR.trim();
aG.appendChild(aS);aM()}};var aN=function(){var aS=aG.options[aG.selectedIndex];
if(!aS){return}var aR=prompt(r.getMessage("Enter_the_new_rule"),aS.value);
if(aR){aS.value=aS.text=aR.trim();aM()}};var aA=function(){var aR=aG.options[aG.selectedIndex];
if(!aR){return}aR.parentNode.removeChild(aR);aM()};
var aE=function(aS){var aR=[];for(var aT=0;aT<aS.options.length;
aT++){aR.push(aS.options[aT].value)}return aR};var aM=function(){var aR={includes:aE(document.getElementById(ay("use_includes"))),matches:aE(document.getElementById(ay("use_matches"))),excludes:aE(document.getElementById(ay("use_excludes")))};
m(aJ.name,aR);return true};if(au){var aw=M("button",aJ.name,aB,"btn1");
aw.innerHTML=r.getMessage("Add_as_0clude0",au);aw.addEventListener("click",aL,false);
az.appendChild(aw)}else{var aO=M("button",aJ.name,aB,"btn2");
aO.innerHTML=r.getMessage("Add")+"...";aO.addEventListener("click",at,false);
az.appendChild(aO);var aH=M("button",aJ.name,aB,"btn3");
aH.innerHTML=r.getMessage("Edit")+"...";aH.addEventListener("click",aN,false);
az.appendChild(aH);var aK=M("button",aJ.name,aB,"btn4");
aK.innerHTML=r.getMessage("Remove");aK.addEventListener("click",aA,false);
az.appendChild(aK)}return{elem:az}};var d=function(ar){var av=function(aB,aA){if(aB.tagName==aA){return aB
}else{return(aB.parentNode?av(aB.parentNode,aA):null)
}};var aq=function(aA){var aB=function(aD,aC){return aD.position-aC.position
};aA.sort(aB);return aA};var az=null;var at=[];var aw=0;
for(var au=0;au<ar.length;au++){var ax=ar[au].script;
var ay=av(ax,"TR");if(ay){var V=av(ay,"TBODY");if(!az){az=V
}else{if(az!=V){console.log("options: different parents?!?!")
}}aw++;at.push({tr:ay,position:ax.pos?ax.pos:(1000+aw)});
ay.inserted=false;ay.parentNode.removeChild(ay)}else{console.log("options: unable to sort script at pos "+ax.pos)
}}at=aq(at);for(var au=0;au<aw;au++){az.appendChild(at[au].tr)
}};var ae=function(au,aJ,at,aB,aC){var aE=x("div","",aJ.name,aJ.id,"script_tab_head");
var ar=aE.inserted;var az=x("div","heading",aJ.name,"heading");
var aG=x("img","nameNicon64",aJ.name,"heading_icon");
var V=aJ.icon64?aJ.icon64:aJ.icon;aG.src=V;var aI=x("div","nameNname64",aJ.name,"heading_name");
aI.textContent=aJ.name;if(V){az.appendChild(aG)}az.appendChild(aI);
var aD=x("div","author",aJ.name,"author");if(aJ.author){aD.textContent="by "+aJ.author
}else{if(aJ.copyright){aD.innerHTML="&copy; ";aD.textContent+=aJ.copyright
}}var aN=x("table","noborder p100100",aJ.name,"table");
var aQ=x("tr","script_tab_head",aJ.name,"tr1");var aP=x("tr","details",aJ.name,"tr2");
var ay=x("td","",aJ.name,"td1");var aL=x("td","",aJ.name,"td2");
az.appendChild(aD);aE.appendChild(az);ay.appendChild(aE);
aQ.appendChild(ay);aP.appendChild(aL);aN.appendChild(aQ);
aN.appendChild(aP);aB.appendChild(aN);var aK={tv:"tv tv_alt",tv_table:"tv_table tv_table_alt",tr_tabs:"tr_tabs tr_tabs_alt",tr_content:"tr_content tr_content_alt",td_content:"td_content td_content_alt",td_tabs:"td_tabs td_tabs_alt",tv_tabs_align:"tv_tabs_align tv_tabs_align_alt",tv_tabs_fill:"tv_tabs_fill tv_tabs_fill_alt",tv_tabs_table:"tv_tabs_table tv_tabs_table_alt",tv_contents:"tv_contents tv_contents_alt",tv_tab_selected:"tv_tab tv_selected tv_tab_alt tv_selected_alt",tv_tab_close:"",tv_tab:"tv_tab tv_tab_alt",tv_content:"tv_content tv_content_alt"};
var ax=H.create("_details"+aa.createUniqueId(aJ.name,aJ.id),aL,aK);
var aF=ag(aJ,ax,aC);var aA=!aJ.id||aJ.system?{}:A(aJ,ax);
if(ar){return p["tab"+aJ.name]}var aw=function(aS){var aR=false;
if(aS.type!="keydown"){return}if(aS.keyCode==27){if(K.editor_keyMap=="windows"){if(au.isSelected()){window.setTimeout(aC,1)
}aR=true}}if(aR){aS.stopPropagation();aS.preventDefault();
return false}};var aq=function(aS){var aR=false;if(aA.beforeClose){aR|=aA.beforeClose(aS)
}if(aF.beforeClose){aR|=aF.beforeClose(aS)}return aR&&!aJ.nnew
};var aH=function(){if(aA.onShow){aA.onShow()}if(aF.onShow){aF.onShow()
}window.addEventListener("keydown",aw,true)};var av=function(aR){if(aA.onClose){if(aA.onClose(aR)){return true
}}if(aF.onClose){if(aF.onClose(aR)){return true}}window.removeEventListener("keydown",aw,true)
};var aO=function(){if(aA.onSelect){if(aA.onSelect()){return true
}}if(aF.onClose){if(aF.onSelect()){return true}}};var aM={onShow:aH,onClose:av,onSelect:aO,beforeClose:aq};
p["tab"+aJ.name]=aM;return aM};var A=function(a7,aI){var aH=M("div",a7.name,a7.id,"script_setting_h");
var a1=aH.inserted;aH.textContent=r.getMessage("Settings");
var aJ=M("div",a7.name,a7.id,"script_settings_c");var aR=function(){if(this.type=="checkbox"||this.type=="button"){D(this.name,this.key,!this.oldvalue)
}else{if(this.type=="text"||this.type=="textarea"||this.type=="select-one"){var bd=this.value;
if(this.valtype==="native"){if(bd==="undefined"){bd=undefined
}else{try{bd=JSON.parse(bd)}catch(bc){}}}D(this.name,this.key,bd)
}}};var a2=W.createPosition(r.getMessage("Position_")+": ",{id:"position",name:a7.name,pos:a7.position,posof:a7.positionof},aR);
var a6=W.createScriptStartDropDown(r.getMessage("Run_at")+": ",{id:"run_at",name:a7.name,value:a7.run_at},aR);
var au=W.createDropDown(r.getMessage("No_frames"),{id:"noframes",name:a7.name,value:a7.noframes},[{name:r.getMessage("Yes"),value:true},{name:r.getMessage("No"),value:false},{name:r.getMessage("Default"),value:null}],aR);
var av=af(r.getMessage("Original_includes"),{id:"includes",item:a7},r.getMessage("User_excludes"));
var aq=af(r.getMessage("Original_matches"),{id:"matches",item:a7},r.getMessage("User_excludes"));
var ay=af(r.getMessage("Original_excludes"),{id:"excludes",item:a7},r.getMessage("User_includes"));
var aW=x("div","clear",a7.name,a7.id,"clear");var az=af(r.getMessage("User_includes"),{id:"includes",item:a7});
var aw=af(r.getMessage("User_matches"),{id:"matches",item:a7});
var aB=af(r.getMessage("User_excludes"),{id:"excludes",item:a7});
var a0=W.createCheckbox(r.getMessage("Apply_compatibility_options_to_required_script_too"),{id:"compatopts_for_requires",name:a7.name,enabled:a7.compatopts_for_requires},aR);
var ar=W.createCheckbox(r.getMessage("Fix_wrappedJSObject_property_access"),{id:"compat_wrappedjsobject",name:a7.name,enabled:a7.compat_wrappedjsobject},aR);
var aN=W.createCheckbox(r.getMessage("Convert_CDATA_sections_into_a_chrome_compatible_format"),{id:"compat_metadata",name:a7.name,enabled:a7.compat_metadata},aR);
var aU=W.createCheckbox(r.getMessage("Replace_for_each_statements"),{id:"compat_foreach",name:a7.name,enabled:a7.compat_foreach},aR);
var aO=W.createCheckbox(r.getMessage("Fix_for_var_in_statements"),{id:"compat_forvarin",name:a7.name,enabled:a7.compat_forvarin},aR);
var aG=W.createCheckbox(r.getMessage("Convert_Array_Assignements"),{id:"compat_arrayleft",name:a7.name,enabled:a7.compat_arrayleft},aR);
var V=W.createCheckbox(r.getMessage("Add_toSource_function_to_Object_Prototype"),{id:"compat_prototypes",name:a7.name,enabled:a7.compat_prototypes},aR);
var aS=[a0,ar,aN,aU,aO,aG,V];var aF=x("div","section",a7.name,a7.id,"ta_opt");
var aE=x("div","section_head",a7.name,a7.id,"head_ta_opt");
var aK=x("div","section_content",a7.name,a7.id,"content_ta_opt");
aE.textContent=r.getMessage("Settings");aF.appendChild(aE);
aF.appendChild(aK);var aL=x("div","section",a7.name,a7.id,"ta_cludes");
var aZ=x("div","section_head",a7.name,a7.id,"head_ta_cludes");
var aQ=x("div","section_content",a7.name,a7.id,"content_ta_cludes");
aZ.textContent=r.getMessage("Includes_Excludes");aL.appendChild(aZ);
aL.appendChild(aQ);var aA=x("div","section",a7.name,a7.id,"ta_compat");
var aM=x("div","section_head",a7.name,a7.id,"head_ta_compat");
var ax=x("div","section_content",a7.name,a7.id,"content_ta_compat");
aM.textContent=r.getMessage("GM_compat_options_");aA.appendChild(aM);
aA.appendChild(ax);aK.appendChild(a2);if(!a7.user_agent){aK.appendChild(a6)
}aK.appendChild(au.elem);aQ.appendChild(av.elem);aQ.appendChild(aq.elem);
aQ.appendChild(ay.elem);aQ.appendChild(aW);aQ.appendChild(az.elem);
aQ.appendChild(aw.elem);aQ.appendChild(aB.elem);var a8=M("span",a7.name,a7.id);
a8.textContent=r.getMessage("Settings");var aC=M("div",a7.name,a7.id,"tab_content_settings");
aC.appendChild(aF);aC.appendChild(aL);if(!a7.user_agent){for(var aV=0;
aV<aS.length;aV++){ax.appendChild(aS[aV].elem)}if(a7.awareOfChrome){for(var a3 in aS){aS[a3].input.setAttribute("disabled","disabled");
aS[a3].elem.setAttribute("title",r.getMessage("This_script_runs_in_Chrome_mode"))
}}aC.appendChild(aA)}var aX={name:a7.name,id:"comment",value:a7.options.comment};
var aY=W.createTextarea(null,aX);aY.elem.setAttribute("class","script_setting_wrapper");
var ba=function(){aR.apply(aY.textarea,[])};var aP=M("div",a7.name,a7.id,"save");
var aD=W.createButton(a7.name,a7.id,r.getMessage("Save"),ba);
aP.appendChild(aD);var aT=x("div","section",a7.name,a7.id,"ta_comment");
var at=x("div","section_head",a7.name,a7.id,"head_ta_comment");
var a9=x("div","section_content",a7.name,a7.id,"content_ta_comment");
at.textContent=r.getMessage("Comment");aT.appendChild(at);
aT.appendChild(a9);a9.appendChild(aY.elem);a9.appendChild(aP);
aC.appendChild(aT);aJ.appendChild(aC);var a5=aI.appendTab("script_settings_tab"+aa.createUniqueId(a7.name,a7.id),aH,aJ);
if(a1){return p["settings"+a7.name]}var a4=function(){var bc=false;
if(av.beforeClose){bc|=av.beforeClose()}if(aq.beforeClose){bc|=aq.beforeClose()
}if(ay.beforeClose){bc|=ay.beforeClose()}if(az.beforeClose){bc|=az.beforeClose()
}if(aw.beforeClose){bc|=aw.beforeClose()}if(aB.beforeClose){bc|=aB.beforeClose()
}return bc};var bb={beforeClose:a4};p["settings"+a7.name]=bb;
return bb};var ag=function(aP,aw,aB){var aK=x("tr","editor_container p100100",aP.name,aP.id,"container");
if(!aP.nnew&&l(aP.id,"lastI")){return[]}if(aP.nnew){aP.code=aP.code.replace("<$URL$>",L.url||"http://*/*")
}var at=M("div",aP.name,aP.id,"script_editor_h");var aq=at.inserted;
at.textContent=r.getMessage("Editor");var ax=M("div",aP.name,aP.id,"script_editor_c");
var az=x("tr","editormenubar",aP.name,aP.id,"container_menu");
var aS=x("table","editor_container_o p100100 noborder",aP.name,aP.id,"container_o");
aS.appendChild(az);aS.appendChild(aK);ax.appendChild(aS);
var aT=function(aW){var aX=aK.editor&&K.editor_enabled?aK.editor.mirror.getValue():aJ.value;
var aY=new Blob([aX],{type:"text/plain"});saveAs(aY,aP.name+".tamper.js")
};var aA=function(aW,aX){l(aP.id,"saveEm",aX)};var aC=function(aW,aX){if(aB){aB(aX)
}};var aG=function(){var aW=null;aW=function(a0){if(a0.cleaned){aC()
}};var aZ=aL.input?aL.input.oldvalue:"";var aY=aL.input?aL.input.value:"";
var aX={old_url:aZ,new_url:aY,clean:true,reload:true};
y(aP.name,null,aX,aW)};var aD=function(){var aW=confirm(r.getMessage("Really_reset_all_changes_"));
if(aW){if(aK.editor&&K.editor_enabled){aK.editor.mirror.setValue(aP.code)
}else{aJ.textContent=aP.code}}};var aV=function(){B.wait();
var aW=function(){O.run(aK.editor);B.hide()};window.setTimeout(aW,1)
};var aO=W.createImageButton(aP.name,"save_to_disk",r.getMessage("Save_to_disk"),chrome.extension.getURL("images/harddrive2.png"),aT);
var V=W.createImageButton(aP.name,"save",r.getMessage("Save"),chrome.extension.getURL("images/filesave.png"),aA);
var aE=W.createImageButton(aP.name,"cancel",r.getMessage("Editor_reset"),chrome.extension.getURL("images/editor_cancel.png"),aD);
var ay=W.createImageButton(aP.name,"reset",r.getMessage("Full_reset"),chrome.extension.getURL("images/script_cancel.png"),aG);
var aR=W.createImageButton(aP.name,"close_script",r.getMessage("Close"),chrome.extension.getURL("images/exit.png"),aC);
var aF=W.createImageButton(aP.name,"lint_script",r.getMessage("Run_syntax_check"),chrome.extension.getURL("images/check.png"),aV);
var aL=W.createInput(r.getMessage("Update_URL_"),{id:"file_url",name:aP.name,value:aP.file_url});
aL.input.setAttribute("class","updateurl_input");aL.elem.setAttribute("class","updateurl");
var aJ=x("textarea","editorta",aP.name,aP.id);aJ.setAttribute("wrap","off");
var aI=x("td","editor_outer",aP.name,aP.id,"edit");
var aN=x("div","editor",aP.name,aP.id,"edit");var ar=x("div","editormenu",aP.name,aP.id,"editormenu");
aI.appendChild(aN);az.appendChild(ar);az.appendChild(aL.elem);
if(!aK.inserted){aN.appendChild(aJ);aK.appendChild(aI)
}if(!aP.system){ak[aP.id]["saveEm"]=function(a2){var aX=true;
if(K.showFixedSrc&&!aP.user_agent){aX=confirm(r.getMessage("Do_you_really_want_to_store_fixed_code_",r.getMessage("Show_fixed_source")))
}var a1=aK.editor&&K.editor_enabled?aK.editor.mirror.getValue():aJ.value;
if(aX){var aW=function(a3){if(a3.installed){if(aP.nnew||a3.renamed){aC(null,true)
}else{aK.editor.changed=false;if(a3.lastModified){aP.lastModified=a3.lastModified
}}}};var a0=aL.input?aL.input.oldvalue:"";var aZ=aL.input?aL.input.value:"";
var aY={old_url:a0,new_url:aZ,clean:false,reload:true,force:a2,lastModified:aP.lastModified===undefined?null:aP.lastModified};
y(aP.name,a1,aY,aW)}return aX};ar.appendChild(aO);ar.appendChild(V);
ar.appendChild(aE)}if(!aP.nnew){ar.appendChild(ay)}ar.appendChild(aR);
if(!aP.system&&K.editor_enabled){ar.appendChild(aF)
}var au=aw.appendTab("script_editor_tab"+aa.createUniqueId(aP.name,aP.id),at,ax);
if(aq){return p["editor"+aP.name]}var aU=function(){if(aK.editor){aK.editor.mirror.refresh()
}};var aM=function(){var aW=ax.getElementsByTagName("textarea");
ak[aP.id]["lastI"]=function(){return aP};if(aW.length){var aX=aW[0];
if(!aK.editor){var aY=function(){if(aK.editor){aK.editor.changed=true
}};if(K.editor_enabled){var aZ=aX.parentNode;var a0={search:r.getMessage("Search"),replace:r.getMessage("Replace"),jump:r.getMessage("Jump_to_line"),macro:r.getMessage("Insert_constructor"),reindentall:r.getMessage("Auto_Indent_all")};
aZ.removeChild(aX);aK.editor=new MirrorFrame(aZ,{value:aP.code,indentUnit:Number(K.editor_indentUnit),indentWithTabs:K.editor_indentWithTabs=="tabs",smartIndent:K.editor_tabMode!="classic",enterMode:K.editor_enterMode,electricChars:K.editor_electricChars.toString()=="true",lineNumbers:true,extraKeys:{Enter:"newlineAndIndentContinueComment"},keyMap:K.editor_keyMap,gutters:["gutter","CodeMirror-linenumbers"],matchBrackets:true},{save:aA,close:aC,find:function(a1){aK.editor.searchText=aK.editor.search()
},findNext:function(a1){aK.editor.searchText=aK.editor.search(aK.editor.searchText)
},},{change:aY,blur:aH},a0)}else{aX.value=aP.code}}}};
var av=function(){var aW=false;if(K.editor_enabled){if(aK.editor){aW|=(aK.editor.changed&&aK.editor.mirror.historySize().undo)
}}else{aW=(aJ.value!=aP.code)}return aW};var aH=function(){if(K.editor_autoSave&&av()){l(aP.id,"saveEm",K.editor_easySave)
}};var aQ={onSelect:aU,onShow:aM,onClose:function(aX){var aW=function(){aK.editor=null;
delete ak[aP.id]["lastI"]};if(av()&&!aX){var aY=confirm(r.getMessage("There_are_unsaved_changed_"));
if(aY){aW()}return !aY}else{aW();return false}}};p["editor"+aP.name]=aQ;
return aQ};var s=function(a2,a5,az){if(!ak[a2.id]){ak[a2.id]={}
}var a0;var ay;var aX=a2.icon&&!a2.nativeScript;var aW=x("span","script_name"+(a2.nativeScript?"":" clickable"),a2.name,a2.id,"sname");
var aN=x("img","nameNicon16 icon16",a2.name,a2.id,"sname_img");
var aq=x("span",aX?"nameNname16":"",a2.name,a2.id,"sname_name");
var a1=a2.homepage?a2.homepage:(a2.namespace&&a2.namespace.search("http://")==0?a2.namespace:null);
aq.textContent=(a2.name.length>35?a2.name.substr(0,35)+"...":a2.name);
var a3=M("span",a2.name,a2.id,"sversion");a3.textContent=a2.version?a2.version:"";
if(aX){aN.src=a2.icon;aW.appendChild(aN)}var aM=[];
var aR=function(a6,ba,a9,a8){if(!a8){a8="scripttd"}var a7=x("td",a8,a6.name,a6.id,a9);
if(ba){if(aa.toType(ba)==="Array"){aa.forEach(ba,function(bc,bb){a7.appendChild(bc)
})}else{a7.appendChild(ba)}}return a7};var aF=function(){if(a0){a0.remove();
a0=null}};var aI=function(){aW.parentNode.removeChild(aW)
};var aO=function(){var a6=function(){for(var a7 in ab){var a8=ab[a7];
if(a8.id==a2.id&&a8.name==a2.name){s(a8,a5,az);break
}}};window.setTimeout(a6,1)};var at=function(a7){var a6=true;
if(ay.beforeClose){a6=!ay.beforeClose(a7)}if(ay.onClose&&ay.onClose(a7)){return
}aF();aI();if(a6){aO()}};var aC=function(){if(ay.onSelect&&ay.onSelect()){return
}};var aS=function(){var a6=null;if(a2.nnew){a6=x("div","head_icon",a2.name,a2.id,"details_h");
a6.appendChild(W.createImage(a2.image,a2.name,a2.id,"new_script_head"))
}else{a6=x("div","",a2.name,a2.id,"details_h");a6.textContent=r.getMessage("Edit")+" - "+(a2.name.length>25?a2.name.substr(0,25)+"...":a2.name)
}var a7=M("div",a2.name,a2.id,"details_c");a0=az.insertTab(null,"details_"+aa.createUniqueId(a2.name,a2.id),a6,a7,aC,a2.nnew?null:at);
ay=ae(a0,a2,a5,a7,at)};var au=function(a7,a6){if(!a0){aS()
}if(ay.onShow){ay.onShow()}a0.show();if((!a7||a7.button!=1)&&!a6){a0.select()
}aq.setAttribute("open","true")};if(aq.getAttribute("open")=="true"){au(null,true)
}var aJ=M("span",a2.name,a2.id,"hp");if(a1){var aG=M("a",a2.name,a2.id,"hp");
aG.setAttribute("href",a1);aG.setAttribute("target","_blank");
var aA=W.createImage(chrome.extension.getURL("images/home.png"),a2.name,a2.id,"hp","");
aG.appendChild(aA);aJ.appendChild(aG)}var aw=function(bg,be){var bc=1000*60;
var a9=1000*60*60;var a7=1000*60*60*24;var ba=bg.getTime();
var a6=be.getTime();var bf=Math.abs(ba-a6);var a8=Math.round(bf/bc);
var bb=Math.round(bf/a9);var bd=Math.round(bf/a7);if(a8<=60){return a8+" min"
}else{if(bb<=48){return bb+" h"}else{return bd+" d"
}}};var aH=M("span",a2.name,a2.id,"last_updated");var aL="";
if(a2.nativeScript||!a2.id||a2.system){aL=""}else{var aV=function(){var a7=aH.textContent;
aH.textContent="";aH.appendChild(W.createImage("/images/download.gif",a2.name+"_down",a2.id));
var a6=function(a8){aH.textContent=a7;if(a8){aH.style.color="green";
aH.title=r.getMessage("There_is_an_update_for_0name0_avaiable_",a2.name);
aF();aI();D(null,false)}else{aH.style.color="red";aH.title=r.getMessage("No_update_found__sry_")
}};f(a2.id,a6)};if(!aq.inserted){aH.addEventListener("click",function(){l(a2.id,"scriptUpdate")
});aH.setAttribute("class","clickable");aH.title=r.getMessage("Check_for_Updates")
}ak[a2.id]["scriptUpdate"]=aV;if(a2.lastUpdated){try{aL=aw(new Date(),new Date(a2.lastUpdated))
}catch(a4){console.log("o: error calculating time "+a4.message)
}}else{aL="?"}}aH.textContent=aL;var aD=M("div",a2.name,a2.id,"imported");
var aK="";var aP=function(){if(K.sync_enabled){if(a2.nativeScript||!a2.id||a2.system){aK=""
}else{if(a2.sync&&a2.sync.imported){if(a2.sync.imported===true||a2.sync.imported==u.types.ePASTEBIN){aK='<img src="http://pastebin.com/favicon.ico" class="icon16" title="pastebin.com"/>'
}else{if(a2.sync.imported==u.types.eCHROMESYNC){aK='<img src="http://www.google.com/images/icons/product/chrome-16.png" class="icon16" title="Google Sync"/>'
}else{aK='<img src="images/update.png" class="icon16" />'
}}}else{aK='<img src="images/no.png" class="icon16" />'
}}aD.innerHTML=aK;aD=null}};R.push(aP);if(a2.file_url&&a2.file_url.trim()!=""){var V=a2.file_url.match(new RegExp("htt[ps]{1,2}://userscripts.org/scripts/source/([0-9]{1,9}).user.js"));
if(V&&V.length==2){var aG=M("a",a2.name,a2.id,"hp");
aG.setAttribute("href","http://userscripts.org/scripts/show/"+V[1]);
aG.setAttribute("target","_blank");var aT=W.createImage(aa.staticVars.USOicon,a2.name,a2.id,"uso","");
aG.appendChild(aT);aJ.appendChild(aG)}}ak[a2.id]["deleteScript"]=function(a7,a9){if(a2.nativeScript){var a8=a9||confirm(r.getMessage("Really_delete_0name0__",a2.name));
if(a8==true){X(a2.id,"installed","false");a5.parentNode.removeChild(a5)
}}else{var a8=a9||confirm(r.getMessage("Really_delete_0name0__",a2.name));
if(a8==true){var a6={reload:!a9};y(a2.name,null,a6);
a5.parentNode.removeChild(a5)}}};var aE=[];if(a2.nativeScript){ak[a2.id]["importNativeScript"]=function(a6,a8){var a7=a8||confirm(r.getMessage("Really_import_0name0__",a2.name));
if(a7==true){X(a2.id,"imported","true");a5.parentNode.removeChild(a5)
}};var aU=W.createImage(chrome.extension.getURL("images/import.png"),a2.nativeScript?a2.id:a2.name,"import","import",r.getMessage("Import"),function(){l(a2.id,"importNativeScript")
});W.addClass(aU,"hidden");aE.push(aU);var aZ=function(){if(!K.native_import){return
}W.toggleClass(aU,"hidden")};R.push(aZ)}if(a2.id&&!a2.system){var aB=W.createImage(chrome.extension.getURL("images/delete.png"),a2.nativeScript?a2.id:a2.name,"delete","delete",r.getMessage("Delete"),function(){l(a2.id,"deleteScript")
});aE.push(aB)}var av=function(){var a6=a2.enabled?chrome.extension.getURL("images/greenled.png"):chrome.extension.getURL("images/redled.png");
var a8=aR(a2,aW,"script_td05","scripttd_enable");a8.setAttribute("class","imagetd");
var a7=function(){l(a2.id,a2.nativeScript?"switchNativeEnabled":"switchEnabled")
};var ba=(a2.position>0)?((a2.position<10)?" "+a2.position:a2.position):null;
var a9=W.createImageText(a6,a2.nativeScript?a2.id:a2.name,"enabled","enabled",a2.enabled?r.getMessage("Enabled"):r.getMessage("Disabled"),a7,a2.nativeScript?"":ba);
ak[a2.id]["switchEnabled"]=function(bc,bd,bb){if(bd===undefined){bd=!a2.enabled
}D(a2.name,"enabled",bd,bb)};ak[a2.id]["switchNativeEnabled"]=function(bc,bd,bb){if(bd===undefined){bd=!a2.enabled
}X(a2.id,"enabled",bd,bb)};a8.appendChild(a9);a9=null;
return a8};if(!aW.inserted&&!a2.nativeScript){aW.addEventListener("click",au)
}aW.appendChild(aq);var ar=aR(a2,aW,"script_td1","scripttd_name");
ar.title=a2.description?a2.name+"\n\n"+a2.description:a2.name;
var ax=aR(a2,aW,"script_td0","scripttd_sel");if(a2.id&&!a2.system){ax.appendChild(am(a2))
}aM.push(ax);aM.push(av());aM.push(ar);aM.push(aR(a2,a3,"script_td24","scripttd"));
aM.push(aR(a2,G(a2),"script_td25","scripttd"));aM.push(aR(a2,aD,"script_td26","scripttd"));
aM.push(aR(a2,F(a2),"script_td3"));aM.push(aR(a2,I(a2),"script_td4"));
aM.push(aR(a2,aJ,"script_td5"));aM.push(aR(a2,aH,"script_td6"));
aM.push(aR(a2,U(a2),"script_td7"));aM.push(aR(a2,aE,"script_td8"));
for(var aY=aM.length;aY<10;aY++){aM.push(M("td",a2.name,a2.id,"script_filler_"+aY))
}if(a2.nnew){var aQ=function(){au(null,true)};window.setTimeout(aQ,100);
if(!v&&L.open==="0"){window.setTimeout(au,1000)}}else{if(L.open){if(!v&&a2.id===L.open){window.setTimeout(au,1000)
}}}return aM};var G=function(aq){var ar=M("span",aq.name,aq.id,"pos_type",true);
if(!aq.id){return ar}if(aq.user_agent){var V=W.createImage("images/user_agent.png",aq.name,aq.id,"user_agent",r.getMessage("This_only_changes_the_user_agent_string"));
ar.appendChild(V)}else{if(aq.nativeScript){var V=W.createImage(aq.icon,aq.name,aq.id,"chrome_ext",r.getMessage("This_is_a_chrome_extension"));
ar.appendChild(V)}else{if(aq.userscript){var V=W.createImage("images/txt.png",aq.name,aq.id,"user_agent",r.getMessage("This_is_a_userscript"));
ar.appendChild(V)}}}return ar};var I=function(at){var au=M("span",at.name,at.id,"pos_features",true);
if(!at.id){return au}if(at.system){var V=W.createImage(chrome.extension.getURL("images/lock.png"),at.name,at.id,"lock",r.getMessage("This_is_a_system_script"));
au.appendChild(V)}if(at.awareOfChrome||at.nativeScript){var V=W.createImage("http://www.google.com/images/icons/product/chrome-16.png",at.name,at.id,"chrome_mode",r.getMessage("This_script_runs_in_Chrome_mode"));
au.appendChild(V)}if(at.nativeScript){return au}var av=false;
var ar={includes:true,matches:true};for(var aq in ar){if(!at[aq]){continue
}for(var aw=0;aw<at[aq].length;aw++){if(at[aq][aw]&&(at[aq][aw].search("https")!=-1||at[aq][aw].search(/^\*:\/\//)!=-1)){var V=W.createImage(chrome.extension.getURL("images/halfencrypted.png"),at.name,at.id,"encrypt",r.getMessage("This_script_has_access_to_https_pages"));
au.appendChild(V);av=true;break}}if(av){break}}if(at.user_agent){return au
}if(at.code.search("GM_xmlhttpRequest")!=-1){var V=W.createImage(chrome.extension.getURL("images/web.png"),at.name,at.id,"web",r.getMessage("This_script_has_full_web_access"));
au.appendChild(V)}if(at.code.search("GM_setValue")!=-1){var V=W.createImage(chrome.extension.getURL("images/db.png"),at.name,at.id,"db",r.getMessage("This_script_stores_data"));
au.appendChild(V)}if(at.code.search("unsafeWindow")!=-1){var V=W.createImage(chrome.extension.getURL("images/resources.png"),at.name,at.id,"resource",r.getMessage("This_script_has_access_to_webpage_scripts"));
au.appendChild(V)}for(var aq in at.options){if(aq.search("compat_")!=-1&&at.options[aq]){var V=W.createImage(chrome.extension.getURL("images/critical.png"),at.name,at.id,"crit",r.getMessage("One_or_more_compatibility_options_are_set"));
au.appendChild(V);break}}return au};var Z=null;var ac=null;
var C=null;var Y=0;var aj=0;var z=function(V){var aq={x:C.x+V.pageX,y:C.y+V.pageY};
Z.style.top=aq.y+"px";Z.style.left=aq.x+"px"};var n=function(at){if(Z){z(at);
var ar=ac.previousSibling,aq=ac.nextSibling,V=ac.parentNode,au=ap(ac);
if(at.pageY>au.y+Y&&aq){V.removeChild(aq);V.insertBefore(aq,ac);
aj++}else{if(at.pageY<au.y&&aj>1){V.removeChild(ar);
if(aq){V.insertBefore(ar,aq)}else{V.appendChild(ar)
}aj--}}}};document.addEventListener("mousemove",n);
var ap=function(aq){var V=aq.offsetLeft;var ar=aq.offsetTop;
while(aq=aq.offsetParent){V+=aq.offsetLeft;ar+=aq.offsetTop
}return{x:V,y:ar}};var h=function(V,aq){Z=V;ac=Z.parentNode.parentNode.parentNode;
Y=ac.offsetHeight;C=ap(ac.parentNode.parentNode);C.x=-C.x-Z.offsetWidth/2;
C.y=-C.y-Z.offsetHeight/2;Z.style.position="absolute";
z(aq)};var J=function(){Z.style.position="static";D(Z.name,Z.key,aj);
Z=ac=C=null};var U=function(aq){var ar=M("span",aq.name,aq.id,"pos_images",true);
if(!aq.id||aq.nativeScript){return ar}if(aq.position>1||aq.position<aq.positionof){var V=x("span","clickable movable","position",aq.id,true);
V.innerHTML="&#9776;";V.title=r.getMessage("Click_here_to_move_this_script");
V.name=aq.name;V.key="position";V.addEventListener("click",function(at){if(Z){J()
}else{h(this,at);aj=aq.position}});ar.appendChild(V)
}return ar};var F=function(aE){var aD=M("span",aE.name,aE.id,"site_images");
var aA=null;if(aD.inserted){aA=aD;aA.setAttribute("id",aA.id+"foo");
aD=M("span",aE.name,aE.id,"site_images")}var aw=function(aO){if(aO.search(/\//)==0){aO=aO.replace(/^\/|\/$|\^|\$|\?|\(|\)|\+|\\|\[.*\]|\.\*|[\-\.a-zA-Z0-9]+\/$|/g,"").replace(/\/\/$/g,"")
}aO=aO.replace(/^\*:\/\//,"http://");if(aO.search("http")!=0){aO="http://"+aO
}var aK=aO.split("/");if(aK.length<3){return null}var aQ=aK[2].split(".");
if(aQ.length<2){return null}var aL=aQ[aQ.length-1];
var aP=aQ[aQ.length-2];var aN=[];for(var aM=aQ.length-3;
aM>=0;aM--){if(aQ[aM].search("\\*")!=-1){break}aN.push(aQ[aM])
}return{tld:aL,dom:aP,predom:aN.reverse()}};if(aE.includes||aE.matches){var aG=0;
var aH=aE.includes.length?aE.includes:aE.matches;for(var aC=0;
aC<aH.length;aC++){var az=aH[aC];if(!az){console.log("o: Warn: script '"+aE.name+"' has invalid include (index: "+aC+")");
continue}if(az.search(/htt(ps|p):\/\/(\*\/\*|\*)*$/)!=-1||az.search(/\*:\/\/(\*\/\*|\*)*$/)!=-1||az=="*"){var aJ=W.createImage(chrome.extension.getURL("images/web.png"),aE.name,aE.id,az,az);
aD.appendChild(aJ,true);break;continue}var av=aw(az);
if(av==null){var aJ=W.createFavicon("?",aE.name,aE.id,az,az);
aD.appendChild(aJ,true);continue}var au=false;for(var aB=0;
aB<aC;aB++){var aq=aH[aB];if(aq){var V=aw(aq);if(V==null){continue
}if(V.dom==av.dom){au=true;break}}}if(!au){var aF="com";
var aI="";if(av.tld!="*"&&av.tld!="tld"){aF=av.tld}if(av.predom.length){aI=av.predom.join(".")+"."
}var ar=("chrome://favicon/http://"+aI+av.dom+"."+aF+"/").replace(/\*/g,"");
var at=("http://"+aI+av.dom+"."+aF+"/favicon.ico").replace(/\*/g,"");
var ay=[at,ar];if(at.search("http://userscripts.org/")==0||at.search("http://userscripts.com/")==0){ay=aa.staticVars.USOicon
}var aJ=W.createFavicon(ay,aE.name,aE.id,az,az);aD.appendChild(aJ,true);
aG++}if(aG>7){var ax=x("span",aE.name,aE.id,"tbc");
ax.textContent="...";aD.appendChild(ax,true);break}}}if(aA){aA.parentNode.removeChild(aA)
}return aD};var g=function(){var aq=document.getElementsByName("scriptselectors");
var ar=0;for(var V=0;V<aq.length;V++){if(aq[V].checked){ar++
}}};var j=function(){var V=0;ak.multiselect={};ak.multiselect["single_click"]=function(){var au=0;
var ay=document.getElementsByName("scriptselectors");
var ar=true;var aw=false;var az=false;var at=true;var aA=false;
var av=false;for(var ax=0;ax<ay.length;ax++){if(ay[ax].s_type=="n"){az=true;
ar=ar&&ay[ax].checked;aw=aw||ay[ax].checked}else{if(ay[ax].s_type=="s"){av=true;
at=at&&ay[ax].checked;aA=aA||ay[ax].checked}}}if(az){if(ar&&!aA){au=1
}else{if(at&&!aw&&aA){au=2}}}else{if(av&&at){au=3}}if(au!=V){V=au;
var aq=M("input","sms","all");aq.checked=(au!=0)}};
ak.multiselect["un_selectAll"]=function(){if(++V>3){V=0
}var at=false;var ar=document.getElementsByName("scriptselectors");
for(var aq=0;aq<ar.length;aq++){if(aq==0&&(V==1||V==3)&&ar[aq].s_type=="s"){if(++V>3){V=0
}}at|=(ar[aq].s_type=="s");ar[aq].checked=(V==3||V==1&&ar[aq].s_type=="n"||V==2&&ar[aq].s_type=="s")
}if(V>1&&!at){V=0}this.checked=(V!=0)}};var am=function(aq){var V=M("input",aq.name,aq.id,"sel");
V.type="checkbox";V.s_id=aq.id;V.name="scriptselectors";
V.s_type=aq.nativeScript?"n":"s";if(!V.inserted){V.addEventListener("click",function(){ak.multiselect["single_click"]()
})}return V};var ao=function(ar){var av=M("input","sms","all",null,true);
av.type="checkbox";av.mode=0;av.addEventListener("click",ak.multiselect["un_selectAll"]);
var ay=0;var aw=[{name:r.getMessage("__Please_choose__"),value:0},{name:r.getMessage("Enable"),value:1},{name:r.getMessage("Disable"),value:2},{name:r.getMessage("Trigger_Update"),value:5},{name:r.getMessage("Remove"),value:6}];
var au={value:0,id:"sms",name:"select"};var at=function(){if(this.value==0){ax.setAttribute("disabled","true")
}else{ax.removeAttribute("disabled")}ay=this.value};
var az=W.createDropDown(r.getMessage("Apply_this_action_to_the_selected_scripts"),au,aw,at);
az.elem.setAttribute("class","float");var V=function(){if(ay==0){console.log("option: ?!?!");
return}if(ay==6){if(!confirm(r.getMessage("Really_delete_the_selected_items_"))){return
}}var aF=document.getElementsByName("scriptselectors");
var aD=[];for(var aA=0;aA<aF.length;aA++){aD.push(aF[aA])
}var aC,aE=false,aB=100;for(var aA=0;aA<aD.length;aA++){if(!aD[aA].checked){continue
}if(ay==1||ay==2){aC=(aD[aA].s_type=="n")?"switchNativeEnabled":"switchEnabled";
l(aD[aA].s_id,aC,null,(ay==1),false);aE=true}else{if(ay==5){aC="scriptUpdate";
l(aD[aA].s_id,aC)}else{if(ay==6){aC="deleteScript";
l(aD[aA].s_id,aC,null,true);aE=true;aB=1500}}}}if(aE){B.wait(r.getMessage("Please_wait___"));
window.setTimeout(function(){D(null,false,null,true)
},aB)}};var ax=W.createButton("MultiSelectButton","button",r.getMessage("Start"),V);
ax.setAttribute("disabled","true");ax.setAttribute("style","height: 19px; top: 2px; position: relative; padding-top: -1px;");
var aq=M("div",ar.name,ar.id,"actions");aq.appendChild(az.elem);
aq.appendChild(ax);return{selAll:av,actionBox:aq}};
j();var O={options:{maxerr:999,newcap:true,es5:true,sloppy:true,browser:true,white:true,plusplus:true,nomen:true,"continue":true,todo:true,eqeq:true,passfail:false,unparam:true,devel:true},JSLINT_GLOBALS:["CDATA","XPathResult","xpath","uneval","escape","unescape","console","JSON","TM_info","GM_info","TM_addStyle","TM_deleteValue","TM_listValues","TM_getValue","TM_log","TM_registerMenuCommand","TM_openInTab","TM_setValue","TM_addValueChangeListener","TM_removeValueChangeListener","TM_xmlhttpRequest","TM_getTab","TM_saveTab","TM_getTabs","TM_installScript","TM_runNative","TM_execUnsafe","TM_notification","TM_getResourceText","TM_getResourceURL","GM_addStyle","GM_deleteValue","GM_listValues","GM_getValue","GM_log","GM_registerMenuCommand","GM_openInTab","GM_setValue","GM_addValueChangeListener","GM_removeValueChangeListener","GM_xmlhttpRequest","GM_getTab","GM_saveTab","GM_getTabs","GM_installScript","GM_runNative","GM_setClipboard","GM_execUnsafe","GM_notification","GM_getResourceText","GM_getResourceURL"],cleanGutters:function(aq,V){aq.clearGutter("gutter")
},setGutters:function(ay,az){for(var aw in az){if(!az.hasOwnProperty(aw)){continue
}var av=az[aw];var V=0;var ax=null;var aA=[];av.marks=[];
for(var at=0;at<av.length;at++){var aB="";var ar=av[at];
if(ar.stop){ax="no";V=3}else{if(ar.warn){if(V<1){ax="critical";
V=1}aB=r.getMessage("Warning")+": "}else{if(ar.info){if(V==0){ax="info"
}aB=r.getMessage("Info")+": "}else{if(V<2){ax="error";
V=2;aB=r.getMessage("Error")+": "}}}}aA.push(((av.length>1)?aB:"")+ar.text.replace(/\"/g,'\\"'));
if(!ar.stop){av.marks.push(ay.markText({line:ar.line-1,ch:ar.character-1},{line:ar.line-1,ch:ar.character-1+ar.evle},{className:"CodeMirror-highlight-"+ax}))
}}var au='<span class="editor_gutter" title="'+aA.join("\n\n")+'"><span width="15px"><img class="editor_gutter_img" src="images/'+ax+'.png"/></span></span>';
var aq=document.createElement("span");aq.innerHTML=au;
ay.setGutterMarker(Number(aw)-1,"gutter",aq)}return az
},run:function(av){if(av.oldGutters){O.cleanGutters(av.mirror,av.oldGutters)
}var V=av.mirror.getValue();var ay=null;try{ay=JSLINT
}catch(aL){}var aq="/*global "+O.JSLINT_GLOBALS.join(": true, ")+"*/\n";
var az=ay?ay(aq+V,O.options):true;if(az){return}else{var au={};
for(var aG in JSLINT.errors){var aF=JSLINT.errors[aG];
if(aF&&aF.line>1){var aE=aF.line-1;var at=aF.character;
var aJ=0;var ar=(aF.reason.search("Mixed spaces and tabs")!=-1);
var aH=0;try{var ax=!!aF.evidence&&!ar;if(ax){for(var aB=0,aw=0;
aB<at&&aw<at;aB++,aw++){if(aF.evidence.charCodeAt(aB)==9){aw+=K.editor_indentUnit-1;
aJ+=1}}}var aM=aJ*(K.editor_indentUnit-1);at-=aM;if(ax||ar){var aA=aF.evidence.length>at?aF.evidence.substr(at-1):"";
var aD=ar?aA.match(/([ \t])*/):aA.match(/([a-zA-Z0-9_])*/);
aH=aD&&aD.length?aD[0].length:0}}catch(aI){console.log("jslint: error parsing source "+aI.message)
}var aK=aH||1;var aC={line:aE,stop:aF.reason.search("Stopping")==0,info:ar||aF.reason.search("Combine this with the previous 'var'")!=-1||aF.reason.search("Expected '{' and instead saw")!=-1||aF.reason.search("Move 'var' declarations to the top")!=-1,warn:aF.id!="(error)"||aF.reason.search("used before it was defined")!=-1,character:at,evle:aK,text:aF.reason.replace(/.$/,"")};
if(aC.stop){aE++}if(!au[aE]){au[aE]=[]}au[aE].push(aC)
}}av.oldGutters=O.setGutters(av.mirror,au)}}};var k=null;
var b=null;var N=function(V){if(k!=null){window.clearTimeout(k);
k=null;N(V?V:b.items)}else{b={items:V};k=window.setTimeout(function(){k=null;
S(b.items);b=null},50)}};var ah=function(aq,V){try{var at=function(au){chrome.tabs.sendMessage(au.id,{method:"loadUrl",url:aq,newtab:V},function(av){})
};if(V){c({method:"openInTab",url:aq},function(au){})
}else{chrome.tabs.getSelected(null,at)}}catch(ar){console.log("lU: "+ar.message)
}};var y=function(at,au,ar,V){if(ar.reload===undefined){ar.reload=true
}try{var aq=(ar.new_url&&ar.new_url!=ar.old_url)?ar.new_url:"";
c({method:"saveScript",name:at,code:au,clean:ar.clean,force:ar.force,force_url:aq,lastModified:ar.lastModified,reload:ar.reload},function(aw){if(aw.items){N(aw.items)
}if(!au&&ar.reload){B.hide()}if(V){V(aw)}});B.wait(r.getMessage("Please_wait___"))
}catch(av){console.log("sS: "+av.message)}};var E=function(V,aq,at){try{c({method:"setOption",name:V,value:aq},function(au){if(!at){N(au.items)
}});B.wait(r.getMessage("Please_wait___"))}catch(ar){console.log("sO: "+ar.message)
}};var i=function(V,ar,au,aq){try{c({method:"buttonPress",name:V},function(av){if(aq){window.location.reload()
}else{if(!au){N(av.items)}else{B.hide()}}});B.wait(r.getMessage("Please_wait___"))
}catch(at){console.log("sO: "+at.message)}};var m=function(at,ar,av,aq){if(e){console.log("run modifyScriptOptions")
}if(av==undefined){av=true}try{var au={method:"modifyScriptOptions",name:at,reload:av,reorder:aq};
for(var V in ar){if(!ar.hasOwnProperty(V)){continue
}au[V]=ar[V]}if(e){console.log("modifyScriptOptions sendReq")
}c(au,function(ax){if(ax.items){N(ax.items)}});B.wait(r.getMessage("Please_wait___"))
}catch(aw){console.log("mSo: "+aw.message)}};var D=function(aq,aw,au,at,V){if(e){console.log("run modifyScriptOption")
}if(at===undefined){at=true}try{var ar={method:"modifyScriptOptions",name:aq,reload:at,reorder:V};
if(aw&&aw!=""){ar[aw]=au}if(e){console.log("modifyScriptOption sendReq")
}c(ar,function(ax){if(ax){if(ax.i18n){r.setLocale(ax.i18n)
}if(ax.items){N(ax.items)}}});B.wait(r.getMessage("Please_wait___"))
}catch(av){console.log("mSo: "+av.message)}};var X=function(av,au,ar,aq){if(e){console.log("run modifyNativeScriptOption")
}if(aq===undefined){aq=true}try{var V={method:"modifyNativeScript",nid:av,actionid:au,value:ar,reload:aq};
if(e){console.log("modifyNativeScriptOption sendReq")
}c(V,function(aw){if(aw.items){N(aw.items)}});B.wait(r.getMessage("Please_wait___"))
}catch(at){console.log("mSo: "+at.message)}};var f=function(at,V){try{var aq=function(au){if(V){V(au.updatable)
}};c({method:"buttonPress",name:"run_script_updates",scriptid:at},aq)
}catch(ar){console.log("rSu: "+ar.message)}};chrome.extension.onMessage.addListener(function(ar,aq,V){if(e){console.log("o: method "+ar.method)
}if(ar.method=="updateOptions"){N(ar.items);V({})}else{if(ar.method=="confirm"){var at=function(au){V({confirm:au})
};aa.confirm(ar.msg,at)}else{if(ar.method=="showMsg"){aa.alert(ar.msg);
V({})}else{if(e){console.log("o: "+r.getMessage("Unknown_method_0name0",ar.method))
}return false}}}return true});if(e){console.log("Register request listener (options)")
}var Q=function(){window.removeEventListener("DOMContentLoaded",Q,false);
window.removeEventListener("load",Q,false);var aq=function(){D(null,false,null,true)
};var V=function(){if(confirm(r.getOriginalMessage("An_internal_error_occured_Do_you_want_to_visit_the_forum_"))){window.location.href="http://tampermonkey.net/bug"
}};w.ping(aq,V);B.wait(r.getMessage("Please_wait___"))
};window.addEventListener("DOMContentLoaded",Q,false);
window.addEventListener("load",Q,false)})();