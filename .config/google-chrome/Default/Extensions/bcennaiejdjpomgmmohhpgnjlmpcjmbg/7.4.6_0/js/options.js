
var allLoaded=false;
var settings = {};

window.addEventListener('load', init, false);


function init() {

	document.body.onselectstart = function(){ return false; };
  document.getElementById("saveButton").onclick  = save;
  document.getElementById("clearMemory").onclick = clearMemory;

  settings = chrome.extension.getBackgroundPage().settings;

	var limitValue = document.getElementById('numLimit-value');
	document.getElementById('numLimit').value = NaN;
	limitValue.textContent = settings.numLimit;
	document.getElementById('numLimit').addEventListener('change', function(event) {limitValue.textContent = 5+  parseInt((Math.pow(event.target.value,5)/Math.pow(600,5)) * 99994);}, false);
	
	var widthValue = document.getElementById('numItems-value');
	document.getElementById('numItems').value = widthValue.textContent = settings.numItems;
	document.getElementById('numItems').addEventListener('change', function(event) {widthValue.textContent = event.target.value;}, false);
	
	var lines = document.getElementById('numLines');
	var linesValue = document.getElementById('numLines-value');
	lines.value = linesValue.textContent = parseInt(settings.numLines);

	if (lines.value==0) linesValue.textContent="No Limit";
	lines.addEventListener('change', function(event) { if (event.target.value==0) linesValue.textContent="No Limit"; else linesValue.textContent = event.target.value;}, false);


	
	document.getElementById("showClear").checked = settings.showClear;
	document.getElementById("showBadge").checked = settings.showBadge;
	document.getElementById("showTime").checked = settings.showTime;
	document.getElementById("showSearch").checked = settings.showSearch;
	
	document.getElementById("saveHistory").checked = settings.saveHistory;
	document.getElementById("appendTab").checked = settings.appendTab;
	document.getElementById("bold").checked = settings.boldFont;
	document.getElementById("ctrlZ").checked = settings.ctrlZ;
	document.getElementById("menuTop").checked = settings.menuTop;
	document.getElementById("disableDClick").checked = settings.disableDClick;
	
	document.getElementById("dontsupport").checked = (localStorage.support == "false");///
	allLoaded=true;
}

function save() {
	if (allLoaded==false) return;

	settings.showClear = document.getElementById("showClear").checked;
	settings.showBadge = document.getElementById("showBadge").checked;	
	settings.showTime = document.getElementById("showTime").checked;
	settings.showSearch = document.getElementById("showSearch").checked;
	
	settings.boldFont = document.getElementById("bold").checked;
	settings.saveHistory = document.getElementById("saveHistory").checked;
	settings.ctrlZ = document.getElementById("ctrlZ").checked;
	settings.menuTop = document.getElementById("menuTop").checked;
	settings.appendTab = document.getElementById("appendTab").checked;
	settings.disableDClick = document.getElementById("disableDClick").checked;

	settings.numLimit = parseInt(document.getElementById('numLimit-value').textContent);
	settings.numItems = document.getElementById("numItems").value;
	settings.numLines = parseInt(document.getElementById("numLines").value);


	if (settings.badgeHide == true) chrome.browserAction.setBadgeText({text:""});

	if (document.getElementById("saveButton").innerHTML=="Save"){
		document.getElementById("saveButton").innerHTML="SAVED FOR SURE";
	}else if (document.getElementById("saveButton").innerHTML=="SAVED FOR SURE"){
		document.getElementById("saveButton").innerHTML="SAVED AGAIN";
	}else{
		if (document.getElementById("saveButton").innerHTML.length<100){
			document.getElementById("saveButton").innerHTML+=" AND AGAIN";
		}else{
			document.getElementById("saveButton").disabled=true;
			document.getElementById("saveButton").innerHTML='<object width="425" height="344"><param name="movie" value="http://www.youtube.com/v/iPrnduGtgmc?fs=1&amp;hl=en_US&amp;color1=0x3a3a3a&amp;color2=0x999999&autoplay=1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/iPrnduGtgmc?fs=1&amp;hl=en_US&amp;color1=0x3a3a3a&amp;color2=0x999999&autoplay=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="344"></embed></object>';
		}
	}

	localStorage.support = !(document.getElementById("dontsupport").checked);///

	localStorage["settings"] = JSON.stringify(settings);
	localStorage["minimumTabInc"] = 0; //reset this shit, or else some bad stuff can happen
	chrome.extension.getBackgroundPage().settings = settings;
}

function clearMemory(){
	resetData();  
	alert("Cleared!");
}