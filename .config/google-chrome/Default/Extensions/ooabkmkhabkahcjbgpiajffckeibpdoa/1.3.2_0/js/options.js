window.onload = function(){
BackGround = chrome.extension.getBackgroundPage();
Config = BackGround.Config;
Utils = BackGround.Utils;
function L10N(){
  chrome.i18n.getAcceptLanguages(function(langs){
    if (langs.indexOf('ja') < 0 ) {
      document.querySelector('#menu_tabs > li.news').style.display = 'none';
    }
  });
  var elems = document.querySelectorAll('*[class^="MSG_"]');
  Array.prototype.forEach.call(elems, function(node){
    var key = node.className.match(/MSG_(\w+)/)[1];
    var message = chrome.i18n.getMessage(key);
    if (message) node.textContent = message;
  });
}
L10N();

var WIDTH = 800;
var HEIGHT = Math.max(window.innerHeight - 100, 500);

$X('/html/body/div/div/section/div/input[@type="checkbox"]').forEach(function(box){
  var id = box.id;
  var val = Config[id];
  if (val === true || val === false) {
    box.checked = val;
  } else {
    //return;
  }
  box.addEventListener('click',function(){
    if (box.checked) {
      Config[id] = true;
    } else {
      Config[id] = false;
    }
    Utils.update();
  },false);
});

$X('/html/body/div/div/section/div/input[@type="text"]').forEach(function(input){
  var id = input.id;
  input.value = Config[id];
  input.addEventListener('change',function(){
    Config[id] = input.value;
    Utils.update();
  },false);
});

document.getElementById('ExtensionVersion').textContent = BackGround.Manifest.version;


var sections = $X('/html/body/div/div/section[contains(@class, "content")]');
var inner_container = document.getElementById('inner_container');
var container = document.getElementById('container');
inner_container.style.width = sections.length * (WIDTH+20) + 'px';

container.style.marginTop = '-2px';
sections.forEach(function(section, _i){
  section.style.visibility = 'hidden';
  section.style.height = '100px';
});
var btns = $X('id("menu_tabs")/li/a');
var default_title = document.title;
btns.forEach(function(btn, i, btns){
  btn.addEventListener('click',function(evt){
    evt.preventDefault();
    btns.forEach(function(btn){btn.className = '';})
    btn.className = 'active';
    sections[i].style.visibility = 'visible';
    sections[i].style.height = 'auto';
    new Tween(inner_container.style, {marginLeft:{to:i * -WIDTH,tmpl:'$#px'},time:0.2,onComplete:function(){
        document.title = default_title + btn.hash;
        location.hash = btn.hash;
        window.scrollBy(0, -1000);
        sections.forEach(function(section, _i){
          if (i !== _i) {
            section.style.visibility = 'hidden';
            section.style.height = '100px';
          }
        });
      }});
  }, false);
});
if (location.hash) {
  sections.some(function(section, i){
    if ('#' + section.id === location.hash) {
      btns.forEach(function(btn){btn.className = '';})
      btns[i].className = 'active';
      inner_container.style.marginLeft = -WIDTH * i + 'px';
      section.style.visibility = 'visible';
      section.style.height = 'auto';
      document.title = default_title + location.hash;
    }
  });
} else {
  sections[0].style.height = 'auto';
  sections[0].style.visibility = 'visible';
  document.title = default_title + '#' + sections[0].id;
}
};
