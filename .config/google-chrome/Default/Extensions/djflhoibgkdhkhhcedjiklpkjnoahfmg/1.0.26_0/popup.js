function refreshView(){buildTables(getOptionsByGroup())}$(window).load(refreshView);function refreshSelected(){chrome.extension.sendRequest({action:"hotlist_index"},function(a){$("td").removeClass("popup_selected");if(a&&a.ua_index){$("td#ua_row_"+a.ua_index).addClass("popup_selected");var b=getOptions();$("td#ua_row_"+getUserAgentGroup(b[a.ua_index])).addClass("popup_selected")}})}function setCurrent(a){chrome.extension.sendRequest({action:"set",user_agent_index:a},function(b){});refreshSelected()}function addPermanentSpoof(){chrome.extension.sendRequest({action:"add_preset"},function(a){});refreshSelected()}function _newRow(h,g,c,e){var i=document.createElement("td");var b=document.createElement("a");i.setAttribute("class","popup_item");b.appendChild(document.createTextNode(h));i.setAttribute("id","ua_row_"+e);i.appendChild(b);var f=document.createElement("tr");f.appendChild(i);if(c){i=document.createElement("td");var d=document.createElement("img");d.setAttribute("src",c);i.appendChild(d);f.appendChild(i)}return f}function showSubTable(b){var a=$("#sub_table_"+b);a.addClass("visible");a.removeClass("invisible");var c=$("#group_table");c.addClass("invisible");c.removeClass("visible")}function buildTables(e){var a=$("#options_table");a.empty();var g=document.createElement("table");g.setAttribute("id","group_table");a.append(g);g=$("#group_table");g.addClass("popup_group_table");var d=0;for(var h in e){g.append(_newRow((h==""?"Default":h),h,"Chevron-right.png",d));var b=document.createElement("table");b.setAttribute("id","sub_table_"+d);a.append(b);$("#ua_row_"+d).click((function(i){return function(){showSubTable(i)}})(d));b=$("#sub_table_"+d);b.addClass("popup_sub_table");var c=e[h];for(var f=0;f<c.length;f++){b.append(_newRow(c[f].title,c[f].index,null,""+d+"_"+f));b.addClass("invisible");$("#ua_row_"+d+"_"+f).click((function(i){return function(){setCurrent(i)}})(c[f].index))}d++}if(d==1){showSubTable(0)}chrome.extension.sendRequest({action:"show_permanent_option"},function(i){if(i&&i.show&&i.show=="true"){$("#group_table").append(getAddOptionRow());$("#add_spoof").click(function(){addPermanentSpoof();refreshSelected()})}$("#group_table").append(getShowOptionsRow())});refreshSelected()}function getAddOptionRow(){var d=document.createElement("td");d.setAttribute("class","popup_item");var b=document.createElement("a");b.appendChild(document.createTextNode("Add Permanent Spoof"));b.setAttribute("id","add_spoof");b.setAttribute("href","#");d.appendChild(b);var c=document.createElement("tr");c.appendChild(d);return c}function getShowOptionsRow(){var d=document.createElement("td");d.setAttribute("class","popup_item");var b=document.createElement("a");b.appendChild(document.createTextNode("Settings"));b.setAttribute("href","options.html");b.setAttribute("target","_new");d.appendChild(b);var c=document.createElement("tr");c.appendChild(d);return c};