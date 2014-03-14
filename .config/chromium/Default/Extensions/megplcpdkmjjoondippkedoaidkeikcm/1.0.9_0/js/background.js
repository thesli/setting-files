// Copyright: Mingyi Liu (http://mingyi.org), 2010-3.
var wins = {}, closedTabs = [], setting = DCCT_Setting.init(), exclude;
var current_version = '1.0.7';

if(localStorage.version != current_version)
{
  if(!setting.noWhatsNew)
    chrome.tabs.create({url:'whatsnew.html', selected:true});
  localStorage.version = current_version;
}

refresh(rerunScript, true);

chrome.extension.onMessage.addListener(function (request, sender, callback) {
  if (request.action == "getOptions")
    callback(setting);
  else if(request.action == 'refresh')
  {
    setting = DCCT_Setting.load();
    exclude = sender.tab.id;
    refresh(rerunCode, true);
  }
  else if(request.action == "closeTab" && sender.tab)
    chrome.tabs.remove(sender.tab.id);
  else if(request.action == "linkcurrent" && sender.tab)
    chrome.tabs.update(sender.tab.id, {url:request.option});
  else if(request.action == "linknewback")
    chrome.tabs.create({url:request.option, selected:false});
  else if(request.action == 'reopenTab')
  {
    if(closedTabs.length) reopenTab(closedTabs.pop());
    else { alert(chrome.i18n.getMessage('noMoreTabs')); }
  }
});

chrome.tabs.onUpdated.addListener(function(tid, info, tab) {
  updateTab(tab);
});
chrome.tabs.onRemoved.addListener(function(tid) {
  if(closedTabs.length >= 100) closedTabs.shift();
  var wid = findWid(tid);
  closedTabs.push(wins[wid][tid]);
  delete wins[wid][tid];
  if(setting.lastTabApp && winLast(wid) && winEmpty(wid))
    chrome.windows.create({});
  if(winEmpty(wid)) delete wins[wid];
});
chrome.pageAction.onClicked.addListener(function(tab) {
  if(setting.iconDupTab) chrome.tabs.create({url:tab.url, index:tab.index+1, selected:true});
  else chrome.tabs.remove(tab.id);
});

function rerunScript(id)
{
  chrome.tabs.executeScript(id, {file:'js/closetab.js', allFrames:true});
}
function rerunCode(id)
{
  chrome.tabs.executeScript(id, {code:'DCCT_Util.initVal()', allFrames:true});
}
function winLast(wid)
{
  for(var i in wins)
    if(i != wid)
      return false;
  return true;
}
function winEmpty(wid)
{
  for(var i in wins[wid])
    if(wins[wid][i])
      return false;
  return true;
}
function findWid(tid)
{
  for(var wid in wins)
    for(var t in wins[wid])
      if(t == tid) return wid;
}
function reopenTab(t)
{
  if(!wins[t.wid])
    chrome.windows.create({url:t.url}, function(win) {
      for(var i = 0; i < closedTabs.length; i++)
        if(closedTabs[i].wid == t.wid)
          closedTabs[i].wid = win.id;
    });
  else
    chrome.tabs.create({url:t.url, index:t.idx, windowId:t.wid, selected:true});
}
function refresh(callback, strict) // strict = no file:///
{
  chrome.windows.getAll({populate:true}, function(win) {
    for(var i = 0; i < win.length; i++)
      for(var j = 0; j < win[i].tabs.length; j++)
      {
        var tab = win[i].tabs[j];
        saveTab(tab);
        if(isGoodURL(tab.url, strict))
        {
          setPA(tab.id, true);
          if(callback) callback(tab.id);
        }
        else setPA(tab.id, false, isGoodURL(tab.url));
      }
  });
}
function setPA(tid, ok, needRefresh)
{
  if(exclude && exclude == tid)
  {
    exclude = null;
    return;
  }
  setTimeout(function() {
    pa(tid, ok, needRefresh);
  },200);//Chrome bug:http://groups.google.com/group/chromium-extensions/browse_thread/thread/a2714f96a259f564?pli=1
}
function pa(tid, ok, needRefresh)
{
  chrome.pageAction.setIcon({tabId:tid, path:ok?'../icons/ok.png':'../icons/no.png'});
  var o = DCCT_Setting.load();
  var t = chrome.i18n.getMessage((o.iconDupTab)? 'extDupTab':'extCloseTab');
  chrome.pageAction.setTitle({tabId:tid, title:chrome.i18n.getMessage(ok? 'extOK' : needRefresh? 'extNoNeedRefresh' : 'extNo', [t])});
  if(setting.noIcon) chrome.pageAction.hide(tid);
  else chrome.pageAction.show(tid);
}
function isGoodURL(url, strict)
{
  return strict? url.match(/^(http|ftp):|^https:(?!\/\/chrome.google.com)/) :
                 url.match(/^[^/]*(http|ftp):|^[^/]*https:(?!\/\/chrome.google.com)|^chrome-extension:\/\/(megplcpdkmjjoondippkedoaidkeikcm|dglnjdiikmepbkkkaeelkknomohljdlp)/);
}
function updateTab(tab)
{
  saveTab(tab);
  if(isGoodURL(tab.url)) setPA(tab.id,true);
  else setPA(tab.id);
}
function saveTab(tab)
{
  if(!wins[tab.windowId]) wins[tab.windowId] = {};
  wins[tab.windowId][tab.id] = { url: tab.url, idx: tab.index, wid: tab.windowId };
}
