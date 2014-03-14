$(document).ready(function() {
	var url = document.location.href;
	var extensionIDStart = url.indexOf("//")+2;
	var extensionID = url.substring(extensionIDStart, url.indexOf("/", extensionIDStart));
	var message = unescape(getUrlValue(url, "message"));
	//var message = "New message from <span style='font-weight:bold'>Jason!</span>";
	$("#msg").text(message);
	$("#wrapper").click(function() {
		chrome.extension.sendMessage(extensionID, {name: "openFacebook"});
		//sendGA(['_trackEvent', "message", "click"]);
		setTimeout(function() {
			window.close();
		}, 100)
	});
	$("#wrapper").mousemove(function(event) {
		var x = event.pageX
		var y = event.pageY;
		var xPerc = x / $(window).width() * 100;
		var yPerc = y / $(window).height() * 100;
		$(this).css("background", "-webkit-gradient(radial, " + xPerc + "% " + yPerc + "%, 0, 50% 50%, 720, from(#fff), to(blue))");
	});
	$("#ad").click(function() {
		chrome.extension.sendMessage(extensionID, {name: "openTab", url: "http://jasonsavard.com?ref=fbChat"});
		//chrome.extension.sendMessage(extensionID, {name: "openTab", url: "https://chrome.google.com/webstore/detail/hkhggnncdpfibdhinjiegagmopldibha?ref=fbChat"});
		//sendGA(['_trackEvent', "ad", "CheckerPlus"]);
		setTimeout(function() {
			window.close();
		}, 100)
		/*
		//chrome.tabs.create({url:"http://jasonsavard.com?ref=fbChat"});
		var myWebsite = "http://jasonsavard.com?ref=fbChat";
		selectOrCreateTab(myWebsite, myWebsite, function(response) {
			chrome.tabs.sendMessage(response.tab.id, {setFocus:true}, function() {
				//alert('callback from setfocus');
				window.close();
			});				
		});
		*/
	});
	
	$("#close").click(function() {
		$("#wrapper, #otherExtensions").fadeOut("fast", function() {
			$("#shareMessage").fadeIn();
		});
	});	
	
	$(".share").click(function() {
		localStorage["shared"] = "true";
		var f='http://www.facebook.com/share',e=encodeURIComponent,p='.php?u='+e("https://chrome.google.com/webstore/detail/ggekjaligipajhljkbemifjgmlpcfkao")+'&t='+e("Facebook Chat Notification");
		selectOrCreateTab(f+p, f+p, function(response) {
			chrome.tabs.sendMessage(response.tab.id, {setFocus:true});
			setTimeout(function() {
				window.close();
			}, 100)
		});
	});
	
	if (localStorage.shared) {
		$("#otherExtensions").hide();
	}
});