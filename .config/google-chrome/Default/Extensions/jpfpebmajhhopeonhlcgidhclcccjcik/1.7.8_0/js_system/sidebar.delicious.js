$(function(){var c=getValue("options.sidebar.deliciousUsername");$(document).on("click",".delicious_tag",function(){a($(this).attr("rel"))});var e=[];function b(f){$.each(f,function(g,h){e.push(g)})}$.getJSON("http://feeds.delicious.com/v2/json/tags/"+c,b);function a(f){$("#delicious h1:nth(0)").addClass("loading");if(f=="last25bookmarks"){d_url="http://feeds.delicious.com/v2/json/"+c+"?count=25"}else{d_url="http://feeds.delicious.com/v2/json/"+c+"/"+f+"?count=100"}$.getJSON(d_url,function(n){var g=[];var j=new Array;var l=new Array;$.each(n,function(r,s){var p=(String(s.t)).split(",");for(var q=0;q<p.length;q++){if(f.indexOf(p[q])<0){j.push(p[q])}}g.push('<li style="background-image:url(chrome://favicon/'+s.u+')" class="openurl" rel="'+s.u+'"><a href="'+s.u+'">'+s.d+" <span>#"+s.t+"</span></a></li>")});j=$.unique(j);var o="<hr />";if(j.length>0&&f!="last25bookmarks"){for(var h=0;h<j.length;h++){l.push('<a class="delicious_tag delicious_combine_with" rel="'+f+"+"+j[h]+'">'+j[h]+"</a>&nbsp;&nbsp;")}o="<hr /><b>+</b> "+l.join(" ")+"<hr />"}$("#d_bookmarks").html(o+g.join(""));if(panels==1){$("#sidebars").css("width",281+281);if($("#sidebars >div").length==1){$("#sidebars").append('<div style="height:100%">')}}var m=f.split("+");var k=[];for(var h=0;h<m.length;h++){if(m.length>1){if(h>0){removetag=f.replace("+"+m[h],"")}else{removetag=f.replace(m[h]+"+","")}k.push('<div><h1 class="delicious_tag" rel="'+m[h]+'">#'+m[h]+'</h1><a class="delicious_tag delicious_closetag" rel="'+removetag+'"></a></div>')}else{k.push('<h1 class="delicious_tag" rel="'+m[h]+'">#'+m[h]+"</h1>")}}$("#d_bookmarks").prepend('<a id="delicious_close">close</a>'+k.join(""));$("#d_bookmarks").prependTo("#sidebars>div:nth-child(2)").show();$("#delicious h1").removeClass("loading")})}function d(j){var g=[];var f=[];for(var h=0;h<e.length;h++){if(e[h].indexOf(j)==0){g.push('<li class="delicious_tag" rel="'+e[h]+'"><a>'+e[h]+"</a></span></li>");f.push(e[h])}}$("#delicious ul#d_tags").html(g.join(""));if(f.length==1){a(f[0])}else{$("#delicious ul#d_bookmarks").hide()}$("#delicious h1").removeClass("loading")}$("#delicious-search").keyup(function(f){query=$(this).val();if(query.length<1){return false}$("#delicious h1").addClass("loading");d(query);if(f.which==13){a(query)}});$.getJSON("http://feeds.delicious.com/v2/json/tags/"+c+"?count=100",function(k){var f=[];if(localStorage["options.sidebar.delicious.favoriteTags"]){var g=localStorage["options.sidebar.delicious.favoriteTags"].split(",");for(var h=0;h<g.length;h++){f.push('<li class="delicious_tag sticky" rel="'+g[h]+'"><a>'+g[h]+"</a></span></li>")}}tagArray=[];$.each(k,function(i,l){tagArray.push({tag:i,count:l})});var j=function(l,i){return i.count-l.count};tagArray.sort(j);$.each(tagArray,function(l,i){f.push('<li class="delicious_tag" rel="'+i.tag+'"><a>'+i.tag+" <span>"+i.count+"</a></span></li>")});$("#delicious ul#d_tags").prepend(f.join(""))})});