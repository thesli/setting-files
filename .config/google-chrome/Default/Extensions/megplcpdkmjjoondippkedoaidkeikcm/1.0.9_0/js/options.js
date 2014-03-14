// Copyright: Mingyi Liu (http://mingyi.org), 2010-3.
document.addEventListener('DOMContentLoaded', init, false);
document.title = a('optDocTitle');
var setting = DCCT_Setting.load();
function $(e) { return document.getElementById(e) }
function a(n) { return chrome.i18n.getMessage(n) }
function h(n, v) { $(n).innerHTML = a(v) }
function process(obj, item)
{
  if(item == 'useDblClick')
  {
    setting[item] = obj.value == 2;
    setting.useDblRightClick = obj.value == 4;
    $('tripleTime').style.display = setting.useDblClick || setting.useDblRightClick? 'none' : '';
  }
  else if(item == 'reopenKey') setting[item] = obj.value + 'Key';
  else if(item == 'totalTime') setting[item] = obj.value - 0;
  else if(item == 'noIcon' || item == 'noWhatsNew' || item == 'revertClick' ||
          item == 'lastTabApp' || item == 'iconDupTab')
    setting[item] = obj.checked;
  else setting[item] = obj.value;
  DCCT_Setting.save(setting);
}
function init()
{
  if(setting.useDblClick || setting.useDblClick == null)
    $('double').selected = true;
  else if(setting.useDblRightClick || setting.useDblRightClick == null)
    $('doubleright').selected = true;
  else
  {
    $('triple').selected = true;
    $('tripleTime').style.display = '';
  }
  if(!setting.reopenKey) $('shift').selected = true;
  else if(setting.reopenKey.match(/^(.+)Key/))
    $(RegExp.$1).selected = true;
  $('time').value = setting.totalTime;
  $('iconcheck').checked = setting.noIcon == null || setting.noIcon == true;
  $('newcheck').checked = setting.noWhatsNew == null || setting.noWhatsNew == true;
  $('revertclickcheck').checked = setting.revertClick;
  $('lasttabappcheck').checked = setting.lastTabApp;
  $('icondupcheck').checked = setting.iconDupTab;

  h('lasttabapp', 'lastTabApp');
  h('revertclick', 'revertClick');
  h('noicon', 'optNoIcon');
  h('icondup', 'iconDupTab');
  h('nowhatsnew', 'optNoWhatsNew');
  h('name', 'optDocTitle');
  h('closetab', 'optCloseTab');

  h('double', 'optCloseTabDouble');
  h('doubleright', 'optCloseTabDoubleRight');
  h('triple', 'optCloseTabTriple');
  h('key', 'optReopenKey');
  h('shift', 'optShiftKey');
  h('alt', 'optAltKey');
  h('ctrl', 'optCtrlKey');
  h('meta', 'optCommandKey');
  
//   $('alterclick').checked = setting.alterClick == true;
//   if(setting.alterClick) $('clicks').style.display = '';
//   h('clicklink', 'optClickLink');
//   h('key1', 'optClickModKey');
//   h('shift1', 'optShiftKey');
//   h('alt1', 'optAltKey');
//   h('ctrl1', 'optCtrlKey');
//   h('meta1', 'optCommandKey');

  h('timein', 'optDocTime');
  h('timeu', 'optDocTimeUnit');
  h('close', 'optDocClose');
  $('donate').title = a('optDocDonate');
  $('donate1').title = a('optDocDonate');
  $('authpage').title = a('optDocAuthPage');
  h('authpage', 'optDocAuth');
  setListeners();
};
function setListeners() {
  $('clicks').addEventListener('change', function() { process($('clicks'), 'useDblClick') }, false);
  $('time').addEventListener('change', function() { process($('time'), 'totalTime') }, false);
  $('keys').addEventListener('change', function() { process($('keys'), 'reopenKey') }, false);
  $('revertclickcheck').addEventListener('click', function() { process($('revertclickcheck'), 'revertClick') }, false);
  $('lasttabappcheck').addEventListener('click', function() { process($('lasttabappcheck'), 'lastTabApp') }, false);
  $('iconcheck').addEventListener('click', function() { process($('iconcheck'), 'noIcon') }, false);
  $('icondupcheck').addEventListener('click', function() { process($('icondupcheck'), 'iconDupTab') }, false);
  $('newcheck').addEventListener('click', function() { process($('newcheck'), 'noWhatsNew') }, false);
  var btn = $('closebtn');
  btn.addEventListener('click', function() { DCCT_Util.request('refresh');window.close(); }, false);
  btn.addEventListener('mouseout', function() { btn.className = 'btn' }, false);
  btn.addEventListener('mouseover', function() { btn.className = 'btn hover' }, false);
}