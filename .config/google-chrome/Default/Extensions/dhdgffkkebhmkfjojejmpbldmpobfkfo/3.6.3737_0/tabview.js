
Registry.require(["crcrc","helper"],function(){var b=Registry.get("helper");
var d=Registry.get("crcrc").cr;var e=Registry.get("crcrc").crc;
var a={};var c=function(k,n,w){var u=b.filter(k,/[0-9a-zA-Z]/g);
var p=false;if(w==undefined){w={tv:"tv",tv_table:"tv_table",tr_tabs:"tr_tabs",tr_content:"tr_content",td_content:"td_content",td_tabs:"td_tabs",tv_tabs_fill:"tv_tabs_fill",tv_tabs_table:"tv_tabs_table",tv_tabs_align:"tv_tabs_align",tv_contents:"tv_contents",tv_tab_selected:"tv_tab tv_selected",tv_tab_close:"tv_tab_close",tv_tab:"tv_tab",tv_content:"tv_content"}
}var q=e("div",w.tv,"main"+u);var z=e("table",w.tv_table+" noborder","main_table"+u);
if(z.inserted){p=true}else{a[u]={};a[u].g_entries={};
a[u].g_selectedId=null}var f=e("tr",w.tr_tabs,"tabs"+n.id+u);
var m=e("td",w.td_tabs,"pages"+u);var C=e("div",w.tv_tabs_fill,"tv_tabs_fill"+u);
var g=e("div",w.tv_tabs_table,"tv_tabs_table"+u);var A=e("div",w.tv_tabs_align,"tv_tabs_align"+u);
var y=e("tr",w.tr_content,"content"+n.id+u);var l=e("td",w.td_content,"content"+u);
var t=e("div",w.tv_contents,"tv_content"+u);g.appendChild(A);
C.appendChild(g);m.appendChild(C);f.appendChild(m);
z.appendChild(f);l.appendChild(t);y.appendChild(l);
z.appendChild(y);q.appendChild(z);n.appendChild(q);
var r=function(G,H,F){if(H){G.setAttribute("style",F?b.staticVars.visible_move:b.staticVars.visible)
}else{G.setAttribute("style",F?b.staticVars.invisible_move:b.staticVars.invisible)
}G.setAttribute("vis",H.toString())};var i=function(F,G){var H=F.getId();
if(a[u].g_entries[H]){if(G==a[u].g_entries[H].visible){return
}a[u].g_entries[H].visible=G;r(a[u].g_entries[H].tab,G)
}};var D=function(G,F){r(G.content,F,true)};var s=function(G){for(var F in a[u].g_entries){var H=a[u].g_entries[F];
if(H.tab.id==G.id){return H}}return null};var h=function(G){for(var F in a[u].g_entries){var H=a[u].g_entries[F];
if(H.tab.id==G.id){return F}}return null};var x=function(H){for(var F in a[u].g_entries){var G=a[u].g_entries[F];
if(G.entry.getId()==H){return G.entry}}return null};
var B=function(G){if(G.getId()==a[u].g_selectedId){return
}var I=G.getId();if(a[u].g_selectedId){D(a[u].g_entries[a[u].g_selectedId],false)
}for(var F in a[u].g_entries){var H=a[u].g_entries[F];
if(H.entry.getId()==I){if(!H.visible){console.log("tv: WARN: tab selected but not visible!")
}else{if(!H.selected){H.tab.setAttribute("class",w.tv_tab_selected);
D(H,true);H.selected=true}}}else{if(H.selected){H.tab.setAttribute("class",w.tv_tab);
D(H,false);H.selected=false}}}a[u].g_selectedId=I};
var v=function(H){var K=H.getId();var J=(K==a[u].g_selectedId);
if(a[u].g_entries[K]){i(H,false)}else{console.log("tv: WARN: tab not part of tabview!")
}if(J){var I=null;var G=null;for(var F in a[u].g_entries){if(a[u].g_entries[F].visible){I=a[u].g_entries[F];
if(!G&&!I.closable){G=I}}}if(!I.closable){I=G}if(I){I.entry.select()
}else{a[u].g_selectedId=null;console.log("tv: WARN: selected tab set, but entry collection empty!")
}}};var o=function(F){var G=F.getId();if(a[u].g_entries[G]){i(F,true)
}else{console.log("tv: WARN: tab not part of tabview!")
}};var j=function(F){F.hide();var I=F.getId();var G=a[u].g_entries[I];
if(G){G.tab.parentNode.removeChild(G.tab);G.content.parentNode.removeChild(G.content);
var H=h(G.tab);if(H){delete a[u].g_entries[H]}}else{console.log("tv: WARN: tab not part of tabview!")
}};var E=null;if(!p){E={getTabById:x,removeTab:j,appendTab:function(J,G,F,I,H){return this.insertTab(undefined,J,G,F,I,H)
},insertTab:function(P,H,O,R,K,N){if(P===null){P=A.firstChild
}var I=e("div","",H,"content"+u);var J=(I.inserted!==undefined&&I.inserted==true);
if(N){var G=e("div",w.tv_tab_close,H,"tv_close"+u,"tab_close");
if(!G.inserted){G.addEventListener("click",function(){N()
})}G.innerHTML="&#215;";O.appendChild(G)}if(J){var M=s(I);
if(M){return M.entry}console.log("tv: WARN: old tab, but not in tabs collection!")
}var Q;var L=H;var F=function(S){if(S.target.className!=""&&S.target.className==w.tv_tab_close){return
}Q.select()};I.setAttribute("tv_id"+u,H);I.addEventListener("click",F);
O.setAttribute("tv_id"+u,H);O.addEventListener("click",F);
I.setAttribute("name","tabview_tab"+u);I.setAttribute("class",w.tv_tab);
I.appendChild(O);if(P){A.insertBefore(I,P)}else{A.appendChild(I)
}R.setAttribute("name","tabview_content"+u);R.setAttribute("tv_id"+u,H);
R.setAttribute("class",w.tv_content);t.appendChild(R);
Q={getId:function(){return L},isVisible:function(){return I.getAttribute("vis")=="true"
},isSelected:function(){return(a[u].g_selectedId==this.getId())
},remove:function(){j(this)},hide:function(){v(this)
},show:function(){o(this)},select:function(){if(K){K()
}B(this)}};a[u].g_entries[L]={entry:Q,tab:I,content:R,closable:N!=null};
D(a[u].g_entries[L],false);Q.show();if(!a[u].g_selectedId){Q.select()
}return Q}};a[u].tv=E}else{E=a[u].tv}return E};Registry.register("tabview","3737.6",{create:c})
});