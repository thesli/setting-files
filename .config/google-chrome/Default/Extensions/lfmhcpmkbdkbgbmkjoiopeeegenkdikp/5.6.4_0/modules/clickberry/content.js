var clickberryPageListener    =   function (event) {
    
    var wndID       =   "";
    
    if (event.data.type && (event.data.type === "makeScreenShot")) {
        
        wndID   =   event.data.text;
      
	chrome.extension.sendMessage(
		{type: "makeScreenShotExt"}, 
                function(response) {
                    window.postMessage({ type: "returnScreenShot", image: response.imageUrl, wndID: wndID}, "*");
		});
    }
    
    if (event.data.type && (event.data.type === "setClickberryState")) {
	chrome.extension.sendMessage({type: "setClickberryState", state:event.data.state}, function(response) {
            window.postMessage({ type: "returnClickberryState", state: response.state}, "*");
        });
        
    }
    
    if (event.data.type && (event.data.type === "getAddonType")) {
        
	chrome.extension.sendMessage({type: "getAddonType"}, function(response) {
            
            var ifrms       =   document.getElementsByTagName('iframe');
            for (var i in ifrms) {
                try {
                    ifrms[i].contentWindow.postMessage({ type: "returnAddonType", addonType: response.addonType}, "*");
                } catch (e) {
                    
                }
            }
            
        });
        
    }
    
    
    if (event.data.type && (event.data.type === "closeImageshackWindow")) {
	chrome.extension.sendMessage({type: "closeImageshackWindow"}, function(response) {
        });
        
    }
    
    if (event.data.type && (event.data.type === "getClickberryState")) {
        
	chrome.extension.sendMessage({type: "getClickberryState"}, function(response) {
            window.postMessage({ type: "returnClickberryState", state: response.state}, "*");
        });
        
    }
    
    
    if (event.data.type && (event.data.type === "getACSData")) {
        
	chrome.extension.sendMessage({type: "getACSData"}, function(response) {
            
            window.postMessage({ type: "onACSData", acsData: response.acsData}, "*");
            var ifrms       =   document.getElementsByTagName('iframe');
            for (var i in ifrms) {
                try {
                    ifrms[i].contentWindow.postMessage({ type: "onACSData", acsData: response.acsData}, "*");
                } catch (e) {

                }
            }

        });
        
    }
    
    
    
    
    
    
};

chrome.extension.onMessage.addListener(function (request, sender, send_response) {
    if (request.type === "onACSData") {
        window.postMessage({ type: "onACSData", acsData: request.acsData}, "*");
        var ifrms       =   document.getElementsByTagName('iframe');
        for (var i in ifrms) {
            try {
                ifrms[i].contentWindow.postMessage({ type: "onACSData", acsData: request.acsData}, "*");
            } catch (e) {

            }
        }
    }
});

window.onload   =   function () {
    chrome.extension.sendMessage({type: "updateYoutubePlayer"}, function(response) {});
};

window.removeEventListener("message",clickberryPageListener);
window.addEventListener("message", clickberryPageListener , true);
