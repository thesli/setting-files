
Registry.require(["crcrc","helper"],function(){var e=Registry.get("crcrc").cr;
var h=Registry.get("crcrc").crc;var t=Registry.get("helper");
var n=function(w,x,z,B,E,y,G){var A=h("div","clickable enabler",x,z,B,"wrap",true);
var C=e("img",x,z,B,true);var D;C.setAttribute("src",w);
if(E){A.title=E}A.key=z;A.name=x;A.alt=" ?";A.appendChild(C);
D=h("span","scriptpos",x,z,"spos");D.textContent=G;
A.appendChild(D);if(y&&!A.inserted){var F=function(H){y.apply(A,[H])
};A.addEventListener("click",F)}C.href="javascript://nop/";
return A};var i=function(z,w,C,B){var A=h("img","icon16",w,C,t.filter(B,/[a-zA-Z0-9]/g));
if(A.inserted){return A}var x=t.toType(z);if(x!=="Array"){z=[z]
}var y=function(){if(z.length==0){return}var D=z.splice(0,1);
A.setAttribute("src",D)};A.addEventListener("error",y);
y();if(B){A.title=B}A.alt=" ?";return A};var u=function(C,z,D,w,B,y){var A=h("img","icon16",z,D,w,true);
A.setAttribute("src",C);if(y){var x=A.getAttribute("class")||"";
A.setAttribute("class",x+" clickable")}if(B){A.title=B
}A.key=D;A.name=z;A.alt=" ?";if(y&&!A.inserted){A.addEventListener("click",y);
A.href="javascript://nop/"}return A};var g=function(y,z,w){var x=h("input","import","file",null,null,true);
if(!x.inserted){x.type="file";if(w){x.addEventListener("change",w)
}}return x};var c=function(B,z,w){var A=e("div",z.name,z.id,"textarea");
A.key=z.id;var x=h("textarea","settingsta",z.name,z.id,"textarea",true);
x.name=z.name;x.key=z.id;x.array=z.array;x.oldvalue=z.value;
x.value=(z.value!=undefined)?(z.array?z.value.join("\n"):z.value):"";
if(w&&!x.inserted){x.addEventListener("change",w)}var y=e("span",z.name,z.id,"s1");
if(B){y.textContent=B+":"}A.appendChild(y);A.appendChild(x);
return{elem:A,textarea:x}};var o=function(x,y,w){var z=r(x,y,w);
z.input.setAttribute("type","password");return z};var r=function(z,B,w){var C=e("div",B.name,B.id,"input");
C.key=B.id;var x=e("input",B.name,B.id,"input",true);
var D=z.split("##");x.name=B.name;x.key=B.id;x.oldvalue=B.value;
x.value=(B.value!=undefined)?B.value:"";x.type="text";
if(w&&!x.inserted){x.addEventListener("change",w)}var A=h("span","optiondesc",B.name,B.id,"s1");
var y=e("span",B.name,B.id,"s2");A.textContent=D[0]+":";
if(D.length>1){y.textContent=D[1]}C.appendChild(A);
C.appendChild(x);C.appendChild(y);if(B.enabledBy){C.setAttribute("name","enabled_by_"+B.enabledBy)
}return{elem:C,input:x}};var m=function(y,z,w){var B=h("div","checkbox",z.name,z.id,"cb1");
B.key=z.id;var x=e("input",z.name,z.id,"cb",true);x.title=z.desc?z.desc:"";
x.name=z.name;x.key=z.id;x.reload=z.reload;x.warning=z.warning;
x.oldvalue=z.enabled;x.checked=z.enabled;x.type="checkbox";
x.valtype="boolean";if(w&&!x.inserted){x.addEventListener("click",w)
}var A=h("span","checkbox_desc",z.name,z.id,"cb2");
A.textContent=y;B.title=z.desc?z.desc:"";B.appendChild(x);
B.appendChild(A);return{elem:B,input:x}};var b=function(w,A,D,x){var F=e("div",A.name,A.id,"outer_dd");
F.key=A.id;var B=e("select",A.name,A.id,"dd",true);
var E="native";for(var z in D){if(typeof D[z].value==="string"){E=undefined
}var y=e("option",D[z].name,D[z].name,"dd"+w);y.textContent=t.decodeHtml(D[z].name);
y.value=D[z].value;if(D[z].enabledBy){y.setAttribute("name","enabled_by_"+D[z].enabledBy)
}if(A.enabler&&D[z].enable){y.setAttribute("enables",JSON.stringify(D[z].enable))
}if(D[z].value==A.value){y.selected=true}B.appendChild(y)
}B.key=A.id;B.name=A.name;B.reload=A.reload;B.warning=A.warning;
B.oldvalue=A.value;B.valtype=E;if(x&&!B.inserted){B.addEventListener("change",x)
}var C=h("span","optiondesc",A.name,A.id,"inner_dd");
C.textContent=w+": ";F.appendChild(C);F.appendChild(B);
F.title=A.desc?A.desc:"";if(A.enabledBy){F.setAttribute("name","enabled_by_"+A.enabledBy)
}return{elem:F,select:B}};var v=function(w,E,x){var H=e("div",E.name,E.id,"outer_dd");
var F=e("select",E.name,E.id,"dd",true);var B=e("option",E.name,E.id,"dd1");
var D="document-start";B.textContent=D;if(D==E.value){B.selected=true
}var z=e("option",E.name,E.id,"dd2");var C="document-body";
z.textContent=C;if(C==E.value){z.selected=true}var y=e("option",E.name,E.id,"dd3");
var A="document-end";y.textContent=A;if(A==E.value||(!B.selected&&!z.selected)){y.selected=true
}F.appendChild(B);F.appendChild(z);F.appendChild(y);
F.key=E.id;F.name=E.name;if(x&&!F.inserted){F.addEventListener("change",x)
}var G=h("span","optiondesc",E.name,E.id,"inner_dd");
G.textContent=w;H.appendChild(G);H.appendChild(F);return H
};var s=function(z,D,B,y,x){var w=null;var C=null;var A=null;
w=h("input","imgbutton button",z,D,"bu",true);C=h("div","imgbutton_container",z,D,"bu_container");
C.appendChild(w);w.name=z;w.key=D;w.type="button";A=h("img","imgbutton_image",z,D,"bu_img",true);
A.src=y;C.appendChild(A);w.setAttribute("title",B);
A.setAttribute("title",B);if(!w.inserted&&x){w.addEventListener("click",x);
A.addEventListener("click",x)}return C};var d=function(y,z,x){var w=null;
w=h("input","button",y,z.id,"bu",true);w.name=z.name;
w.key=z.id;w.type="button";w.value=z.name;w.reload=z.reload;
w.ignore=z.ignore||z.reload;w.warning=z.warning;if(z.enabledBy){w.setAttribute("name","enabled_by_"+z.enabledBy)
}if(!w.inserted&&x){w.addEventListener("click",x)}return w
};var f=function(y,B,A,x){var w=null;var z=null;w=h("input","button",y,B,"bu",true);
w.name=y;w.key=B;w.type="button";w.value=A;if(!w.inserted&&x){w.addEventListener("click",x)
}return w};var p=function(x,z,y,w){if(t.toType(z)==="Object"){return d.apply(this,arguments)
}else{return f.apply(this,arguments)}};var l=function(y,C,x){var B=e("div",C.name,C.id,"pos1");
var w=e("select",C.name,C.id,"pos",true);for(var z=1;
z<=C.posof;z++){var D=e("option",C.name,C.id,"opt"+z);
D.textContent=z;if(z==C.pos){D.selected=true}w.appendChild(D)
}w.key=C.id;w.name=C.name;if(x&&!w.inserted){w.addEventListener("change",x)
}var A=h("span","optiondesc",C.name,C.id,"pos2");A.textContent=y;
B.appendChild(A);B.appendChild(w);return B};var a=function(C){var y=h("div","searchbox","search_inner");
var x=h("div","searchbox_mv","search_inner_mv");var B=h("input","searchbox_input","search_input");
var w=h("input","searchbox_button","search_button");
B.type="text";B.value=C;w.type="button";w.value="Go";
var z=function(){var D=B.value;window.location=window.location.origin+window.location.pathname+"?url="+encodeURIComponent(D)
};var A=function(D){if(D&&D.keyCode==13){z()}};w.addEventListener("click",z);
B.addEventListener("keyup",A);x.appendChild(B);x.appendChild(w);
y.appendChild(x);return y};var k=function(y,w){if(y.validation){var x=y.validation;
var z=e("span",y.name,y.id,"validation",true);if(x.imageURL){z.setAttribute("style",'background-image: url("'+x.imageURL+'"); background-size: 16px auto; height: 20px; width: 20px; background-repeat:no-repeat; display: inline-block; margin-left: 10px; vertical-align: middle;')
}if(z){if(w){z.addEventListener("click",w)}if(x.msg){z.setAttribute("title",x.msg)
}}}return z};var j=function(y,w){var z=y.getAttribute("class")||"";
var x=new RegExp("[ \t]*"+w+"[ \t]*");if(z.search(x)==-1){z=(z?z+" ":"")+w
}y.setAttribute("class",z)};var q=function(y,w){var z=y.getAttribute("class")||"";
var x=new RegExp("[ \t]*"+w+"[ \t]*");if(z.search(x)!=-1){z=z.replace(x,"")
}else{z=(z?z+" ":"")+w}y.setAttribute("class",z)};Registry.register("htmlutil","3737.80",{addClass:j,toggleClass:q,createValidation:k,createImageText:n,createImage:u,createFavicon:i,createFileInput:g,createTextarea:c,createInput:r,createPassword:o,createCheckbox:m,createDropDown:b,createScriptStartDropDown:v,createImageButton:s,createButton:p,createPosition:l,createSearchBox:a})
});