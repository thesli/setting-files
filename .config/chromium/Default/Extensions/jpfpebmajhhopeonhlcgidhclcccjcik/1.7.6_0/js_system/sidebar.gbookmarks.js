function googleBookmarks(){var i=this;i.req=new XMLHttpRequest();i.bookmarks=new Array();i.labels=new Array();i.qLabels=new Array();i.noLoggedIn=false;i.docXML;i.initial=true;var b=document.getElementById("googlebookmarks");var f=document.getElementById("googlebookmarks-title");var c=document.getElementById("googlebookmarks-query");var a=document.getElementById("googlebookmarks-labels");var e=document.getElementById("googlebookmarks-bookmarks");var g=document.getElementById("googlebookmarks-tags");var h=document.getElementById("googlebookmarks-clear");i.labelSort=function(l,p,o){for(var m=o-1;m>=p;m--){for(var k=p;k<=m;k++){if(l[k+1].name<l[k].name){var n=l[k];l[k]=l[k+1];l[k+1]=n}}}return l};i.login=function(){e.innerHTML="Not Logged to Google Bookmarks<br/><a href=\"javascript:showUrl('https://www.google.com/bookmarks')\">Click here to sign in</a>";c.style.display="none";h.style.display="none"};i.fill=function(){if(req.readyState!=4){return}if(req.responseXML!=null){docXML=req.responseXML.documentElement;var j=docXML.getElementsByTagName("bookmark");if(!j||j==null||j.length==0){}else{for(var k=0;k<j.length;k++){bookmarks[k]=i.getInfo(k,j[k])}labels=i.labelSort(labels,0,labels.length-1)}}else{noLoggedIn=true;i.login();return}i.showLabels();i.showBookmarks(localStorage.lastQuery)};i.getBookmarks=function(){var j="https://www.google.com/bookmarks/?output=xml&num=10000";bookmarks=new Array();labels=new Array();req.open("GET",j,true);req.onreadystatechange=i.fill;req.send(null)};i.addLabel=function(k,j){var m=0;for(var l=0;l<labels.length;l++){if(labels[l].name==k){m=1;labels[l].bidx.push(j);labels[l].n++;break}}if(!m){_label=new Object();_label.name=k;_label.bidx=new Array();_label.bidx.push(j);_label.n=1;labels.push(_label)}};i.getBooksFromLabel=function(){var q=new Array();var r=qLabels.length;for(var o=0;o<bookmarks.length;o++){var p=0;for(var l=0;l<r;l++){for(var m=0;m<bookmarks[o].labels.length;m++){if(bookmarks[o].labels[m].toLowerCase()==qLabels[l].toLowerCase()){p++;break}}if(p==r){break}}if(p==r){q.push(o)}}return q};i.getBooksFromString=function(m){var l=new Array();var j=m.toLowerCase();for(var k=0;k<bookmarks.length;k++){if(bookmarks[k].title.toLowerCase().indexOf(j)!=-1||bookmarks[k].url.toLowerCase().indexOf(j)!=-1){l.push(k)}}return l};i.getInfo=function(k,o){var j=new Object();j.url=o.getElementsByTagName("url")[0].firstChild.nodeValue;j.domain=j.url.split(/\/+/g)[1];j.title=(o.getElementsByTagName("title")[0]!=null)?(o.getElementsByTagName("title")[0].firstChild.nodeValue):j.url;j.timestamp=o.getElementsByTagName("timestamp")[0].firstChild.nodeValue;j.id=o.getElementsByTagName("id")[0].firstChild.nodeValue;var l=o.getElementsByTagName("label");var n=(!l||l==null||l.length==0)?0:l.length;j.labels=new Array(n);for(var m=0;m<n;m++){j.labels[m]=l[m].firstChild.nodeValue}j.labels=j.labels.sort();for(var m=0;m<j.labels.length;m++){addLabel(j.labels[m],k)}return j};i.setBadge=function(k){if(k!=-1&&localStorage.badge==1){var j=k+""}else{}};i.showUrl=function(j){chrome.tabs.update(null,{url:j})};i.fCallback=function(l){var k=window,j=document,m=encodeURIComponent;d=k.open("https://www.google.com/bookmarks/mark?op=edit&output=popup&bkmk="+m(l.url)+"&title="+m(l.title),"bkmk_popup","left="+((k.screenX||k.screenLeft)+10)+",top="+((k.screenY||k.screenTop)+10)+",height=420px,width=550px,resizable=1,alwaysRaised=1");k.setTimeout(function(){d.focus()},300)};i.addToList=function(){chrome.tabs.getSelected(null,fCallback2)};i.fCallback2=function(l){var k=window,j=document,n=encodeURIComponent,m=encodeURI;d=k.open("https://www.google.com/bookmarks/api/bookmarklet?output=popup&srcUrl="+n(l.url)+"&snippet="+n(des(j))+"&title="+n(l.title),"bkmk_popup","left="+((k.screenX||k.screenLeft)+10)+",top="+((k.screenY||k.screenTop)+10)+",height=320px,width=550px,resizable=1,alwaysRaised=1");k.setTimeout(function(){d.focus()},300)};i.des=function(m){var j=m.getElementsByTagName("meta");for(var k=0,l;l=j[k];k++){mea=l.getAttribute("name");if(mea&&mea.toUpperCase()=="DESCRIPTION"){return l.getAttribute("content")}}return""};i.changeClass=function(j,l,k){j.className=(j.className=="")?k:l};i.setLabels=function(j){var l=document.getElementById("googlebookmarks-tags");var m=l.getElementsByTagName("li");for(var k=1;k<m.length;k++){m[k].firstChild.className=j}};i.findLabel=function(j,n){if(n){document.getElementById("googlebookmarks-query").value=""}var l=document.getElementById("googlebookmarks-tags");var m=l.getElementsByTagName("li");for(var k=1;k<m.length;k++){if(m[k].firstChild.firstChild.nodeValue==j){changeClass(m[k].firstChild,"","sel")}}};i.showLabels=function(){if(noLoggedIn){content=$("<div />").html("Not Logged to Google Bookmarks<br/><a href=\"javascript:showUrl('https://www.google.com/bookmarks')\">Click here to sign in</a>")}else{content=$("<ul />").attr("id","googlebookmarks-tags").addClass("tag-chain");for(var j=0;j<labels.length;j++){li=$("<li />");span=$("<span />").text(labels[j].name);$(span).click(function(){i.changeClass(this,"","sel");i.showBookmarks("");i.setLabelSearch()});span.appendTo(li);li.appendTo(content)}}$(content).appendTo($("#googlebookmarks-labels"));var k=document.getElementById("googlebookmarks-labels").offsetHeight;k+=10;document.getElementById("googlebookmarks-labels").style.minHeight=k+"px"};i.setTitle=function(k){var j;if(k<0){j="&nbsp;"}else{if(k==0){j="not found"}else{if(k<2){j=k+" bookmark"}else{j=k+" bookmarks"}}}document.getElementById("googlebookmarks-title").innerHTML=j};i.showBookmarks=function(s){if(noLoggedIn){setTitle(-1);return}if(s!=""){var k=document.getElementById("googlebookmarks-query").value.toLowerCase();localStorage.lastQuery=k;var q=/l:(.+)$/i;var r=k.match(q);if(r==null){_books=getBooksFromString(k)}else{qLabels.splice(0,qLabels.length);var v=r[1].split(",");for(var o=0;o<v.length;o++){qLabels.push(v[o].trim());findLabel(v[o].trim(),false)}_books=getBooksFromLabel()}}else{qLabels.splice(0,qLabels.length);var p=document.getElementById("googlebookmarks-tags");var l=p.getElementsByTagName("li");for(var o=0;o<l.length;o++){if(l[o].firstChild.className=="sel"){qLabels.push(l[o].firstChild.firstChild.nodeValue)}}_books=getBooksFromLabel()}content="";if(s==""&&qLabels==""){max=_books.length>10?10:_books.length}else{max=_books.length}content=$("<ul />");for(var o=0;o<max;o++){idx=_books[o];var w=$("<li />").attr("style","background-image:url(chrome://favicon/"+bookmarks[idx].url+")");var t=$("<a />").attr("href",bookmarks[idx].url).text(bookmarks[idx].title);var n=$("<span />").addClass("domain").text(bookmarks[idx].domain);t.appendTo(w);n.appendTo(w);for(var m=0;m<bookmarks[idx].labels.length;m++){var u=$("<a />").addClass("tagspan").text(bookmarks[idx].labels[m]).attr("data-find",bookmarks[idx].labels[m]);u.appendTo(w)}w.appendTo(content)}$("#googlebookmarks-bookmarks").html(content.html());$(".tagspan").click(function(){i.findLabel($(this).data("find"),true);i.showBookmarks("");i.setLabelSearch()});setTitle(_books.length)};i.clearSearch=function(j){if(j){var l=/l:.+$/i;var k=c.value.match(l);if(k!=null){setLabels("")}showBookmarks("")}c.value="";localStorage.lastQuery=""};i.setLabelSearch=function(){var j=(qLabels.length>0)?"l:":"";j+=qLabels.join(",");c.value=j};i.init=function(){if(!localStorage.lastQuery){localStorage.lastQuery=""}getBookmarks()};i.init()}$(function(){$("#googlebookmarks-query").keyup(function(a){setLabels("");showBookmarks("query")})});window.onload=googleBookmarks;