function init(){if(0!==location.search.indexOf("?"))close;else{var a=JSON.parse(decodeURIComponent(location.search.substr(1))),c=document.getElementById("message");c.innerHTML="";window.addEventListener("click",function(){window.close()},!1);document.getElementById("force");var b=document.getElementById("icon"),d=document.getElementById("home");document.getElementById("tdhome");document.getElementById("tdforce");d.style.visibility="hidden";d.style.display="none";b.src="icons/logo-32.png";a&&(a.title&&
(c.innerHTML="<b>"+a.title+"</b><br>"),a.message&&(c.innerHTML+=a.message),a.icon&&(b.src=a.icon),a.extInfo&&(a.extInfo.homepageUrl&&a.homepage&&($id("home").setAttribute("style","visibility:visible; display:block;"),$id("home").addEventListener("click",openHome,!1)),b.src=getUnitKind(a.extInfo.id)===unitKind.theme?a.extInfo.webstore.icon:getIconUrl(a.extInfo.icons,48),b.addEventListener("error",bind(function(a,b){a.src=b?b:"icons/empty.png"},this,b,a.extInfo.icon),!1)))}}
function openHome(){var a=JSON.parse(decodeURIComponent(location.search.substr(1)));a&&chrome.tabs.create({url:a.extInfo.homepageUrl,selected:!0});window.close()}function openUpdate(){var a=JSON.parse(decodeURIComponent(location.search.substr(1)));a&&chrome.tabs.create({url:chrome.extension.getURL("update.html")+"?"+a.extInfo.id,selected:!0});window.close()}$ready(init);