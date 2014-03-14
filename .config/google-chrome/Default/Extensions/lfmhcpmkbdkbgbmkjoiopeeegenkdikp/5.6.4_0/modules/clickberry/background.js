var config      =   {
//    name    :   "PL",
//    server  :   "pl.clickberry.tv",
//    acs     :   "clickplsus"
    
    name    :   "prod",
    server  :   "clickberry.tv"  ,
    acs     :   "clickberry" 
    
//    name    :   "QA",
//    server  :   "qa.clickberry.tv",
//    acs     :   "clickqa"   
    
//    name    :   "dev",
//    server  :   "dev.clickberry.tv",
//    acs     :   "clickdev" 
    
    
//    name    :   "auto",
//    server  :   "auto.clickberry.tv",
//    acs     :   "clickauto"        
};

var conflicts   =   [
    "Magic Actions for YouTube™",
    "YouTube Options",
    "Auto Replay for YouTube",
    "Auto HD For YouTube",
    "EmbedPlus for YouTube™",
    "Imageshack-Clickberry Browser Extension"
];


var conflictsIds = [
    
    "abjcfabbhafbcdfjoecdgepllmpfceif",
    "bdokagampppgbnjfdlkfpphniapiiifn",
    
    "kanbnempkjnhadplbfgdaagijdbdbjeb",
    "koiaokdomkpjdgniimnkhgbilbjgpeak",
    
    "nalagllbblcejhhmeffeiofclifnpbeo",
    "lpoheopifiepihlmifonnknocnlfapgc"
    
];


var addonsIdsStateCache = {};

function addonIsEnabled( addonId, callback ){
    
    if( addonsIdsStateCache[addonId] ){
        return callback(addonsIdsStateCache[addonId]);
    }
    
    chrome.management.get( addonId, function( ext ){
        
        var state = false;
        
        if( ext && ext.enabled ){
            state = true;   
        }
        
        addonsIdsStateCache[ addonId ] = state;
        
        callback( state );
        
    } );
    
}

function canInsert( callback ){
    
    var countProcessed = 0;
    var can = true;
    
    conflictsIds.forEach(function( addonId ){
        
        addonIsEnabled( addonId, function( enabled ){
            if( enabled ){
                can = false;    
            }           
            countProcessed++;
            
            if( countProcessed == conflictsIds.length ){
                callback( can );
            }
        } );
        
    });
    
}


function in_array(needle, haystack) {   // Checks if a value exists in an array

    var found = false, key;

    for (key in haystack) {
        if (haystack[key] === needle) {
            found = true;
            break;
        }
    }
    return found;
}



function base64_encode( data ) {    // Encodes data with MIME base64

    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    var o1, o2, o3, h1, h2, h3, h4, bits, i=0, enc='';

    do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1<<16 | o2<<8 | o3;
        h1 = bits>>18 & 0x3f;
        h2 = bits>>12 & 0x3f;
        h3 = bits>>6 & 0x3f;
        h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string

        enc += b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);

    } while (i < data.length);



    switch( data.length % 3 ){

        case 1:
            enc = enc.slice(0, -2) + '==';
        break;

        case 2:
            enc = enc.slice(0, -1) + '=';
        break;

    }
    return enc;

}
    


function insertYoutubeExtension(tabId) {
    
    canInsert( function( can ){
    
        if( !can ){
            return;
        }           
        
	    var onClickberryState   =   true;
	
	    if (!localStorage['onClickberryState']) {
	        onClickberryState   =   true;
	    } else {
	        onClickberryState   =   (localStorage['onClickberryState'] === true || localStorage['onClickberryState'] === "true") ? true : false;
	    }
	
	    localStorage['onClickberryState']   =   onClickberryState;
	
	    if (onClickberryState) {
	
	        var url     =   chrome.extension.getURL("modules/clickberry/ChromeStdInjector.js")+"?v="+config.name+"&addonType=fvd";
	         
	        chrome.tabs.executeScript(tabId, {code: "try { var dCStdS = document.getElementById('clickberry-standalone-script'); if (!dCStdS) { var s = document.createElement('script'); s.id = 'clickberry-standalone-script'; s.src = '"+url+"'; document.getElementsByTagName('head')[0].appendChild(s); } } catch (e) { console.log('Failed to load script. ',e); }"});                
	        
	    }
	      
	    return;
    
    });
}


function makeScreenShot() {
        
    chrome.windows.getCurrent({}, function (window) {
        chrome.tabs.captureVisibleTab(window, {}, function (datUrl) {
            chrome.windows.create({url:datUrl});
        });
    });
    
}


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) { 
    
    if (tab.status === "complete") {
    
        // ====== PROMO ========
        if (tab.url === "http://clickberry.com/promo/addon/") {
            newTabOpened(tab);
        }
        // ---------------------
        
    }
    
    if (tab.url.toString().indexOf("facebook.com") === -1) {
        insertYoutubeExtension(tabId); 
    }
    
    
});


var newTabOpened    =   function (newTab) {

    var i   =   0;

    var timer   =   setInterval(function () {
        i++;

        if (newTab.status === "complete") {

            clearInterval(timer);
            chrome.tabs.executeScript(newTab.id, {file: "modules/clickberry/popupInjector.js"});


        } else {
            if (i > 4) {

                clearInterval(timer);
                chrome.tabs.executeScript(newTab.id, {file: "modules/clickberry/popupInjector.js", runAt:"document_idle"});

            }
        }

    }, 500);

};

/*

chrome.browserAction.onClicked.addListener(function(tab) {

    chrome.storage.sync.set({"clbrExtensionVersion":config.acs}, function () {
        
        
        var params          =   tab.url.toString().split("://");

        

        if (!params[0] || !(params[0] === "https" || params[0] === "http") 
                || tab.url.indexOf("://chrome.google.com/webstore") > 0 
                || tab.url.indexOf(".jpg") > 0 
                || tab.url.indexOf(".gif") > 0 
                || tab.url.indexOf(".jpeg") > 0 
                || tab.url.indexOf(".png") > 0 
                || tab.url.indexOf(".mp3") > 0 
                || tab.url.indexOf(".mp4") > 0) {
            if (tab.url.indexOf("://chrome.google.com/webstore") > 0) {
                chrome.tabs.create({url:"http://www.youtube.com/watch?v=wq4YCwd3LCI", active:true}, newTabOpened);
            } else {
                chrome.tabs.update(tab.id, {url:"http://www.youtube.com/watch?v=wq4YCwd3LCI"}, newTabOpened);
            }
        } else {
            chrome.tabs.executeScript(null, {file: "popupInjector.js"});
        }
        
        
    });


});

*/

var getVideoId      =   function (url) {
    var spl         =   url.toString().split("?");
    var splited     =   spl[0].toString().split("/");
    return splited[(splited.length-1)];
};




// =========== GET CLICKBERRY STATE =========
var state           =   true;
chrome.storage.sync.get("ClickberryState", function (obj) {
    state   =   ((obj.ClickberryState === "false")?false:true);
});
setInterval(function () {
    chrome.storage.sync.get("ClickberryState", function (obj) {
        state   =   ((obj.ClickberryState === "false")?false:true);
    });
}, 500);
// -------------------------------------------





chrome.webRequest.onBeforeRequest.addListener(
    function(details) { 

        if (state && details.url.toString().indexOf("list=") === -1 && details.url.toString().indexOf("enablejsapi=1") === -1) {
            
            var videoId     =   getVideoId(details.url);

            var addonType   =   'standalone';
            var wndID       =   videoId;
            var autoPlay    =   '0';
            var videoLink   =   'http://www.youtube.com/watch?v='+videoId;

            var url = 'https://'+config.server+'/extension/?productName=ClickBerry%20YouTube%20Extension&externalVideoLink=' + encodeURIComponent(videoLink) + '&wndID=' + wndID + '&autoPlay=' + autoPlay + '&acsNamespace='+config.acs+'&addonType='+addonType+'&embed=1';


            return {redirectUrl: url};
            
        }
    },
    {
        urls: ["*://*.youtube.com/embed/*","*://youtube.com/embed/*"]
    },
    ["blocking"]
);



function  sendACSData (data) {
    
    if (!data) {
        data    =   false;
    }
    chrome.tabs.query({}, function (tabs) {
        for (var i in tabs) {
            chrome.tabs.sendMessage(tabs[i].id, {type:"onACSData", acsData:data}, function () {
                
            });
        }
    });

    
    
}



chrome.webRequest.onBeforeRequest.addListener(
    function(details) { 

        var data    =   details.requestBody.formData.wresult[0];
        
        var res     =   getACSAttributes(data);
        
        if (res && res.length > 0) {
            
            chrome.storage.sync.set({'ACSData': res}, function() {
                sendACSData(res);
            });
            
        }
        
    },
    {
        urls: ["*://*.clickberry.tv/extension/login","*://clickberry.tv/extension/login"]
    },["requestBody"]
);



chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    
    if (request.type === "makeScreenShotExt")
	{
            
            chrome.windows.getCurrent({}, function (window) {
                chrome.tabs.captureVisibleTab(window.id, {}, function (dataUrl) {
                    sendResponse({type:"returnScreenShot", imageUrl: dataUrl});
                });
            });
	}
        
     if (request.type === "setClickberryState") {  
         
        chrome.storage.sync.set({"ClickberryState": ((request.state === "false")?"false":"true")}, function() {
            sendResponse({type:"returnClickberryState", state: ((request.state === "false")?"false":"true")});
        });
     }
     
     
     if (request.type === "getClickberryState") {   
         chrome.storage.sync.get("ClickberryState", function (obj) {
             sendResponse({type:"returnClickberryState", state: ((obj.ClickberryState === "false")?"false":"true")});
         });
         
     }
     
     
     
     if (request.type === "getAddonType") {   
             sendResponse({type:"returnAddonType", addonType:"standalone"});
     }
     
     
//     if (request.type === "closeImageshackWindow") {  
//         chrome.tabs.executeScript(null, {file: "modules/clickberry/clickberryInjector.js"});
//     }
     
     
     
     if (request.type === "getACSData") { 
         
         chrome.storage.sync.get("ACSData", function (acsData) {
             sendResponse({type:"onACSData", acsData:acsData.ACSData});
         });
     }
     
     
     if (request.type === "updateYoutubePlayer") {  
         chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            insertYoutubeExtension(tabs[0].id);
          });
             

     }
        
     return true;
  });


chrome.management.onUninstalled.addListener(function(id) {    
    addonsIdsStateCache[ id ] = false;  
});
  
chrome.management.onDisabled.addListener(function(ExtensionInfo) {    
    addonsIdsStateCache[ ExtensionInfo.id ] = false;  
});  

chrome.management.onEnabled.addListener(function(ExtensionInfo) {
    
    addonsIdsStateCache[ ExtensionInfo.id ] = true;
    
    if (in_array(ExtensionInfo.name, conflicts)) {
        // alert("This extension conflicts with ClickBerry.");
    }
    
    
});



chrome.runtime.onSuspend.addListener(function () {
    chrome.storage.sync.set({'ACSData': null}, function() {
    });
});



chrome.runtime.onInstalled.addListener(function(details) {
    
     chrome.management.getAll(function (extensions) {
        
        var list    =   "";
        
        for (var i in extensions) {
            if (extensions[i].enabled && in_array(extensions[i].name, conflicts)) {
                list    +=  "\n"+extensions[i].name;
            }
        }
        
        if (list) {
            list += "\n";
            //alert("Oops! Your new Clickberry extension has a conflict with the "+list+" You can deactivate the "+list+" from the settings section of the browser in order to use Clickberry (recommended). Or, you can switch off Clickberry by clicking on the icon in the top right of your browser, then switch it off. ");
        }
        
    });
    
     
    var data    =   {
        "event": "Enable addon",
        "properties": {
            "token"     : "a9983fe3a7e720ded068c5e56c2cabc7",
            'Type'    : 'Clickberry',
            'Version' : chrome.app.getDetails().version,
            'Browser' : 'Chrome'
        }
    };
    
    var url     =   'http://api.mixpanel.com/track/?data='+base64_encode(JSON.stringify(data));
   
		
    var elem = document.getElementById('stat');
	if (elem) elem.src =   url;

});



var getACSAttributes    =   function (string) {
    
    
    var ACSAttributes           =   [];
    
    var getAttributes           =   function (string) {
        
        var re      =  /\<Attribute (.+?)\<\/Attribute\>/g;
        var result  = string.match(re);
        
        return result;
        
    };
    
    var getAttributeParams      =   function (attribute) {
        
        var name    =   "";
        var value   =   "";
        
        var getAttributeName    =   function (attribute) {
            var re      =  /Name="(.+?)"/g;
            var result  = attribute.match(re);
            
            if (result[0]) {
                result  =   result[0].toString().replace("Name=\"","").replace('"',"");
            }
            
            return result;
        };
        
        var getAttributeValue   =   function (attribute) {
            var re      =  /\<AttributeValue\>(.+?)\<\/AttributeValue\>/g;
            var result  = attribute.match(re);

            if (result[0]) {
                result  =   result[0].toString().replace("<AttributeValue>","").replace('</AttributeValue>',"");
            }
            
            return result;
        };
        
        
        name    =   getAttributeName(attribute);
        value   =   getAttributeValue(attribute);
        
        return {name:name, value:value};
        
    };
    
    var attributes  =   getAttributes(string);
    
    for (var i in attributes) {
        var attr    =   getAttributeParams(attributes[i]);
        ACSAttributes.push(attr);
    }
    
    
    return ACSAttributes;
    
};
