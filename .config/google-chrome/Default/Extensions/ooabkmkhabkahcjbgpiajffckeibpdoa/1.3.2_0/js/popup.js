var BG = chrome.extension.getBackgroundPage();
var config = BG.Config;
var Word;
//var wordByTab = BG.WordByTab;
var EventCode = '(' + (function(type,options){
  var evt = document.createEvent('Event');
  evt.initEvent(type, true, false);
  if (options) {
    Object.keys(options).forEach(function(key){
      evt[key] = options[key];
    });
  }
  document.dispatchEvent(evt);
}).toString() + ')';
chrome.extension.onRequest.addListener(popup_init);

chrome.tabs.executeScript(null,{code:'word_highlight.push_state_for_popup();'});
function popup_init(request, sender, sendResponse){
  if (!request.state) {
    return;
  }
  var tab = sender.tab;
  if (Word){
    Word.parentNode.removeChild(Word);
  }
  var state = request.state || [];
  var highlighted = state.highlighted;
  var keyword = state.keyword || '';
  var words = state.words.map(function(s){return s.text;}) || [];
  var word_lists = [];
  var positions = [];
  var PRE = 'word', ID_PRE = PRE + '_id';
  var STYLE_COLOR = ['#FFFF80','#99ccff','#ff99cc','#66cc66','#cc99ff','#ffcc66','#669999','#cc9966','#999999','#cc6699'];

  var div = Word = document.createElement('div');
  div.id = PRE;
  div.className = 'fixed';
  var section = document.createElement('section');
  var editor = document.createElement('form');
  editor.className = PRE + '_editor';
  var text_input = document.createElement('input');
  text_input.type = 'text';
  text_input.placeholder = 'input keywords';
  text_input.className = 'edit-box';
  editor.appendChild(text_input);
  var ctrl = document.createElement('form');
  ctrl.className = PRE + '_ctrl';
  var edit = document.createElement('input');
  edit.type = 'button';
  edit.value = 'edit';
  edit.className = 'edit_ctrl';
  ctrl.appendChild(edit);
  editor.onsubmit  = function(e){
    edit.onclick();
    return false;
  };
  edit.onclick = function(){
    if (div.className == 'edit') {
      edit.value = 'edit';
      div.className = '';
      var _key = text_input.value.trim();
      if (_key !== keyword){
        keyword = _key;
        var code = EventCode+'("word_highlight.resetup",{keyword:"' + keyword + '"})';
        chrome.tabs.executeScript(tab.id,{code:code});
      }
    } else {
      text_input.style.width = Math.max(Math.min(keyword.length * 10, 270), 50) + 'px';
      div.className = 'edit';
      edit.value = 'ok';
      text_input.value = keyword;
      text_input.focus();
    }
  };
  var restore = document.createElement('input');
  restore.type = 'button';
  if (state.highlighted) {
    restore.value = 'unhighlight';
  } else {
    restore.value = 'highlight';
  }
  ctrl.appendChild(restore);
  restore.addEventListener('click',function(){
    if (restore.value === 'unhighlight') {
      restore.value = 'highlight';
      chrome.tabs.executeScript(tab.id,{code:EventCode+'("word_highlight.reset")'});
    } else {
      restore.value = 'unhighlight';
      chrome.tabs.executeScript(tab.id,{code:EventCode+'("word_highlight.highlight")'});
    }
  },false);
  var fieldset = document.createElement('fieldset');
  fieldset.className = 'off_ctrl';
  var off = document.createElement('input');
  off.type = 'checkbox';
  off.checked = config.auto_highlight;
  off.id = 'auto_highlight';
  var alabel = document.createElement('label');
  alabel.textContent = 'auto highlight';
  alabel.htmlFor = 'auto_highlight';
  fieldset.appendChild(off);
  fieldset.appendChild(alabel);
  ctrl.appendChild(fieldset);
  off.addEventListener('click',function(){
    config.auto_highlight = off.checked;
    BG.Utils.update();
  },false);
  word_inputs_list = document.createElement('ul');
  word_inputs_list.id = PRE + '_inputs_list';
  word_inputs_list.className = PRE + '_inputs';
  section.appendChild(ctrl);
  section.appendChild(editor);
  section.appendChild(word_inputs_list);
  word_lists = create_inputlist(state.words);
  div.appendChild(section);
  document.body.appendChild(div);

  var canvas, cw, c2context;
  var CanvasWidth = 150;
  var ratio = 1;
  var nav = document.createElement('nav');
  canvas = document.createElement('canvas');
  nav.appendChild(canvas);
  var c2 = c2context = canvas.getContext('2d');
  div.insertBefore(nav,div.firstChild);
  canvas.addEventListener('click',function(evt){
    var x = (evt.offsetX || evt.layerX)/ratio - root.clientWidth/2;
    var y = (evt.offsetY || evt.layerY)/ratio - root.clientHeight/2;
    window.scrollTo(x, y);
  },false);
  cw = document.createElement('canvas');
  canvas.className='backport';
  cw.className='viewport';
  window.addEventListener('scroll',function(){
    var x = window.pageXOffset * ratio;
    var y = window.pageYOffset * ratio;
    cw.style.bottom = (canvas.height - cw.height - y) + 'px';
    cw.style.right = (-x + 6) + 'px';
  },false);
  nav.appendChild(cw);

  function create_inputlist(words, start) {
    return words.map(function(_w, i){
      var w = _w.text;
      var _i = i + (start||0);
      var li = document.createElement('li');
      li.className = PRE + '_item' + _i%10;
      var _next = document.createElement('input');
      var _prev = document.createElement('input');
      var next_label = document.createElement('label');
      var prev_label = document.createElement('label');
      _next.type = _prev.type = 'image';
      _next.src = 'images/down.png';
      _prev.src = 'images/up.png';
      _next.id = next_label.htmlFor = PRE + '_next_button' + _i;
      _prev.id = prev_label.htmlFor = PRE + '_prev_button' + _i;
      prev_label.className = next_label.className = PRE + '_movelabel';
      prev_label.className += ' prev';
      next_label.className += ' next';
      positions[i+1] || (positions[i+1]=-1);
      _next.addEventListener('click',function(){
        chrome.tabs.executeScript(tab.id,{code:EventCode+'("word_highlight.next",{index:' + i + '})'});
      },false);
      _prev.addEventListener('click',function(){
        chrome.tabs.executeScript(tab.id,{code:EventCode+'("word_highlight.prev",{index:' + i + '})'});
      },false);
      prev_label.appendChild(_prev);
      li.appendChild(prev_label);
      var label = document.createElement('label');
      label.textContent = w + '(' + _w.count + ')';
      var check = document.createElement('input');
      check.type = 'checkbox';
      check.checked = _w.lighted;
      var _id = check.id = ID_PRE + '_check' + _i;
      label.htmlFor = _id;
      label.className = PRE + '_label' + _i % 10;
      li.appendChild(check);
      li.appendChild(label);
      next_label.appendChild(_next);
      li.appendChild(next_label);
      word_inputs_list.appendChild(li);
      var list = {item:li,word:w,label:label,disabled:false};
      check.addEventListener('change', function(){
        list.disabled = !list.disabled;
        if (check.checked) {
          chrome.tabs.executeScript(tab.id,{code:EventCode+'("word_highlight.word.on",{word:"' + w + '"})'});
        } else {
          chrome.tabs.executeScript(tab.id,{code:EventCode+'("word_highlight.word.off",{word:"' + w + '"})'});
        }
      },false);
      return list;
    });
  }
}
