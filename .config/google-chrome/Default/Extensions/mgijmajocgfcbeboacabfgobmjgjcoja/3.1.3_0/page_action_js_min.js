/* Copyright 2011 Google Inc. All Rights Reserved. */ (function(){var b=0,c=null,d=null,f=null,g=null,h=null,k=null,l=null,m=function(a){a.target="_blank";a.addEventListener("click",function(){window.close()},!1)},p=function(){var a;if(a=d.value.replace(/^\s+|\s+$/g,""))g.innerHTML="Searching...",f.style.display="block",h.style.display="none",k.style.display="none",l.style.display="none",c.disabled=!0,b++,chrome.runtime.sendMessage({type:"fetch_html",eventKey:b,query:a},n)},n=function(a){if(a.eventKey==b){if(a.html){l.innerHTML=a.html;var e=l.querySelectorAll(".nym-link");
for(a=0;a<e.length;a++)e[a].addEventListener("click",function(){d.value=this.title?this.title:this.innerHTML;p();return!1},!1);e=l.querySelectorAll('a:not([class="nym-link"])');for(a=0;a<e.length;a++)m(e[a]);f.style.display="none";l.style.display="block"}else g.innerHTML="No definition found.",f.style.display="block",h.href="http://www.google.com/search?q="+a.sanitizedQuery,h.innerHTML='Search the web for "'+a.sanitizedQuery+'" &raquo;',h.style.display="block";c.disabled=!1}},c=document.getElementById("button"),
d=document.getElementById("query-field"),f=document.getElementById("status-box"),g=document.getElementById("status-msg"),h=document.getElementById("status-search-link"),k=document.getElementById("usage-tip"),l=document.getElementById("meaning");k.display="block";k.innerText="Tip: Select text on any webpage, then click the Google Dictionary button to view the definition of your selection.";document.getElementById("year").innerText=(new Date).getFullYear();m(h);m(document.getElementById("options-link"));
d.focus();c.addEventListener("click",p,!1);d.addEventListener("keydown",function(a){13==a.keyCode&&p()},!1);chrome.tabs.getSelected(null,function(a){chrome.tabs.sendMessage(a.id,{type:"get_selection"},function(a){a&&a.selection&&(d.value=a.selection,p())})});})();