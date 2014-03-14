var DEBUG = false;

var facebookTabSelected = false;
var facebookTabId;
var notificationDisplayed = false;
var selectedTabId;

var canvas;
var canvasContext;
var gfx;
var rotation = 1;
var factor = 1;
var animTimer;
var loopTimer;
var animDelay = 10;
var message;
var notification;

function createNotification(message) {
	notification = webkitNotifications.createNotification(chrome.extension.getURL("images/icon32.png"), message, "");
	notification.onclick = function() {
		selectFacebookTab();
		this.cancel();
	}
	notification.show();
}

function startAnimate() {
	stopAnimateLoop();
	if (pref(localStorage["notification"]) && checkUserPermission()) {
		displayNotification();
		if (DEBUG == false) {
			setTimeout(function() {
				notification.cancel();
			}, 6000);
		}
	}
	animTimer = setInterval("doAnimate()", animDelay);
	setTimeout("stopAnimate()", 2000);
	loopTimer = setTimeout("startAnimate()", 60000);
}

function stopAnimate() {
	if(animTimer != null) {
		clearTimeout(animTimer);       
	}
	chrome.browserAction.setIcon({path:"images/icon19.png"});
	rotation = 1;
	factor = 1;
}

function stopAnimateLoop() {
	if(loopTimer != null) {
		clearTimeout(loopTimer);
	}    
	stopAnimate();
}

function doAnimate() {
  canvasContext.save();
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  //canvasContext.translate(2, 2);
  canvasContext.rotate(rotation*2*Math.PI);
  canvasContext.drawImage(gfx, 0, 0);
  canvasContext.restore();
  
  rotation += 0.018 * factor;
  
  if(rotation <= 0.9 && factor < 0)
    factor = 1;
  else if(rotation >= 1.1 && factor > 0)
    factor = -1;
    
  chrome.browserAction.setIcon({imageData:canvasContext.getImageData(0, 0, canvas.width,canvas.height)});
}

function checkUserPermission() {
    try {
	    return (webkitNotifications.checkPermission() == 0);
    } catch(e) { return false; }
}

function resetNotificationDisplay() {
	facebookTabSelected = true;
	notificationDisplayed = false;
	stopAnimateLoop();
	if (notification) {
		notification.cancel()
	}
	chrome.browserAction.setTitle({title: "Facebook Chat Notification"});
	chrome.browserAction.setBadgeText({text:""});
}

chrome.windows.onFocusChanged.addListener(function(windowId) {
	if (windowId == -1) {
		console.log("windowid: -1");
	} else {
		chrome.tabs.query({'windowId':windowId, 'active':true}, function (tabs) {
			if (tabs && tabs[0].url.match("https?://www.facebook.com")) {
				resetNotificationDisplay();
			}
		});
	}
});

chrome.tabs.onSelectionChanged.addListener(function(tabId, selectInfo) {
	selectedTabId = tabId;
	chrome.tabs.get(tabId, function(tab) {
		if (tab.url.match("https?://www.facebook.com")) {
			resetNotificationDisplay();
		} else {
			facebookTabSelected = false;
		}
	});
});

function init() {
	getManifest(function(manifest) {
		if (localStorage["version"]) {
			if (localStorage["version"] != manifest.version) {
				/* Jason: uncomment if important update */
				//chrome.tabs.create({url:"options.html?update=true"});
			}
		} else {
			if (webkitNotifications && webkitNotifications.checkPermission() == 1) { // default: user never answered
				//chrome.tabs.create({url: "options.html?installOrUpdate=true"});
			}			
		}
		localStorage["version"] = manifest.version;	
	});
	canvas = document.getElementById('canvas');
	canvasContext = canvas.getContext('2d');
	gfx = document.getElementById('gfx');
	setInterval( timer , 1000);
}

function displayNotification() {
	if (pref("displayNotification", true)) {
		if (webkitNotifications.createHTMLNotification) {
			notification = webkitNotifications.createHTMLNotification(chrome.extension.getURL("notification.html") + "?message=" + escape(message));
			notification.onerror = function() {
				notification = createNotification(message);
				notification.show();
			}
			notification.show();
		} else {
			notification = createNotification(message);
			notification.show();
		}
	}
}

function timer() {
	chrome.windows.getCurrent(function (currentWindow) {
		if ((!currentWindow.focused || !facebookTabSelected) && !notificationDisplayed) {
			chrome.windows.getAll({populate:true}, function (windows) {
				for(var a=0; a<windows.length; a++) {
					var tabs = windows[a].tabs;
					for(var b=0; b<tabs.length; b++) {						
						if (tabs[b].url.match("https?://www.facebook.com")) {
							console.log("in facebook");
							facebookTabId = tabs[b].id;
							if (tabs[b].title.match(/la poruku|heeft je een bericht gestuurd|napisał do Ciebie|mengirimi anda pesan|ha enviat un missatge|píše|vous a envoyé un message|傳了訊息給你|Nouveau message de|님이 메시지를 보냈습니다|đã nhắn tin cho bạn|ti je poslao|parašė jums|üzent neked|さんからメッセージがありました|Cообщение от|sendi þér skilaboð|lähetti sinulle viestin|sendte dig en besked|har skickat ett meddelande till dig|nachricht geschickt|ti je pisa| posiela |uma mensagem|har sendt deg en melding|inviato un messaggio|sana mesaj gönderdi|给你发了消息。|傳了訊息給你|發了訊息給你！|σάς έστειλε μήνυμα|Имате съобщение от|رسالة|vám napsal zprávu|nuevo mensaje|un mensaje|messaged you|enviado un mensaje|new message|neue nachricht|nouveau message|nuovo messaggio|nowa wiadomo|nova mensagem|nytt meddelande/gi)) {
								console.log("matched");
								notificationDisplayed = true;
								chrome.browserAction.setTitle({title: tabs[b].title});
								chrome.browserAction.setBadgeBackgroundColor({color:[0, 255, 0, 255]});
								chrome.browserAction.setBadgeText({text:"chat"});
								message = tabs[b].title;
								displayNotification();
								startAnimate();
								return;
							}
						}
					}
				}
			});
		}
	});
}

function selectFacebookTab() {
	selectOrCreateTab("://www.facebook.com", "http://www.facebook.com", function(response) {
		chrome.tabs.sendMessage(response.tab.id, {setFocus:true}, function() {
			//alert('callback from setfocus');
		});
	});
}

chrome.browserAction.onClicked.addListener( function(tab) {
	resetNotificationDisplay();
	selectFacebookTab();
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.name == "openFacebook") {
		selectFacebookTab();
	} else if (request.name == "openTab") {
		selectOrCreateTab(request.url, request.url, function(response) {
			chrome.tabs.sendMessage(response.tab.id, {setFocus:true}, function() {
				//alert('callback from setfocus');
			});
		});
	}
});

document.addEventListener('DOMContentLoaded', function () {
	init();
});