
var g = this;
this.Config = {
  name:'word highlight',
  version:'',
  sticky_off:false,
  always_icon:false,
  auto_highlight:true
};
this.defaultConfig = JSON.parse(JSON.stringify(Config));
get_manifest(function(manifest){
  this.Manifest = manifest;
  Config.version = defaultConfig.version = manifest.version;
  Utils.update();
});
if (localStorage.Config) {
  Config = JSON.parse(localStorage.Config);
} else {
  localStorage.Config = JSON.stringify(Config);
}
if (!('auto_highlight' in Config)){
  Config.auto_highlight = true;
  localStorage.Config = JSON.stringify(Config);
}
this.Utils = {
  update:function() {
    localStorage.Config = JSON.stringify(Config);
  }
}
g.chrome && (window.onload = function(){
  setTimeout(function(){
    var CHROME_GESTURES = 'jpkfjicglakibpenojifdiepckckakgk';
    var CHROME_KEYCONFIG = 'okneonigbfnolfkmfgjmaeniipdjkgkl';
    var action = {
      group:'word highlight',
      actions:[
        {name:'word_highlight.next'},
        {name:'word_highlight.prev'},
        {name:'word_highlight.toggle'},
        {name:'word_highlight.reset'}
      ]
    };
    //chrome.extension.sendRequest(CHROME_GESTURES, action);
    //chrome.extension.sendRequest(CHROME_KEYCONFIG, action);
  },1000);
});
if(g.chrome){
chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
  var tabid = sender.tab.id;
  if (request.action === 'init') {
    if (!request.keyword) {
      if (!Config.always_icon || request.isframe) {
        return;
      }
      chrome.pageAction.setIcon({tabId:tabid, path:'wg.png'});
      chrome.pageAction.setPopup({tabId:tabid, popup:'popup.html'});
      chrome.tabs.executeScript(tabid,{code:'word_highlight({option:'+JSON.stringify(Config)+',keyword:""})'});
    } else if (Config.auto_highlight){
      sendResponse({option:Config});
      chrome.pageAction.setIcon({tabId:tabid, path:'w.png'});
      chrome.pageAction.setPopup({tabId:tabid, popup:'popup.html'});
    } else {
      chrome.pageAction.setIcon({tabId:tabid, path:'wg.png'});
    }
    chrome.pageAction.show(tabid);
  }
  if (request.action === 'setuped') {
    chrome.pageAction.setIcon({tabId:tabid, path:'w.png'});
  }
});
chrome.pageAction.onClicked.addListener(function(tab){
  chrome.pageAction.setIcon({tabId:tab.id, path:'w.png'});
  chrome.pageAction.setTitle({tabId:tab.id, title:'word highlight / off'});
  chrome.tabs.executeScript(tab.id,{code:'word_highlight({option:'+JSON.stringify(Config)+'})'});
  chrome.pageAction.setPopup({tabId:tab.id, popup:'popup.html'});
});
} else if (g.safari) {

}
function get_manifest(callback){
  var url = './manifest.json';
  var xhr = new XMLHttpRequest();
  xhr.onload = function(){
    callback(JSON.parse(xhr.responseText));
  };
  xhr.open('GET',url,true);
  xhr.send(null);
}
function get_js(callback){
  var url = 'words_highlight.js';
  var xhr = new XMLHttpRequest();
  xhr.open('GET',url,false);
  xhr.send(null);
  return xhr.responseText;
}
