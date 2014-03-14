// console.time("highlight");
var keyword = '', PRE = 'wordhighlight';
var id_index = 0;

var $ = function(selector, doc) {
  return Array.prototype.slice.call((doc||document).querySelectorAll(selector));
};
var clean = function clean(str) {
  return str.replace(/(?:(?:\s?(?:site|(?:all)?in(?:url|title|anchor|text)):|(?:\s|^)-|[()])\S*|(\s)OR\s)/g,'$1');
}

var searchEngines = {
  google: {
    checkLocation: function(){
      return /google\./.test(location.host) && /^((\/news)?\/search|\/webhp$)/.test(location.pathname);
    },
    checkReferrer: function() {
      return /google/.test(document.referrer);
    },
    searchWord: function() {
      var _q = $('input[name="q"]')[0];
      return clean(_q.value);
    },
    fromSearch: function() {
      var _a = document.createElement('a');
      _a.href = document.referrer;
      if (/google\./.test(_a.host) && /^(\/news)?\/(search|url)/.test(_a.pathname) && /[&?]q=([^&]+)/.test(_a.search)) {
        var keyword = clean(decodeURIComponent(/[&?]q=([^&]+)/i.exec(_a.search)[1]));
        keyword = keyword.split(/\+/).filter(function(s){return !!s.trim();}).join(' ');
        return keyword;
      }
    }
  },
  yahoo: {
    checkLocation: function(){
      return /search\.yahoo\.co(\.jp|m)/.test(location.host) && /^\/search/.test(location.pathname);
    },
    checkReferrer: function() {
      return /yahoo/.test(document.referrer);
    },
    searchWord: function() {
      var _q = $('input[name="p"]')[0];
      return clean(_q.value);
    },
    fromSearch: function() {
      var _a = document.createElement('a');
      _a.href = document.referrer;
      if (/search\.yahoo\.co(\.jp|m)/.test(_a.host) && /^\/search/.test(_a.pathname) && /[&?]p=([^&]+)/.test(_a.search)) {
        var keyword = clean(decodeURIComponent(/[&?]p=([^&]+)/i.exec(_a.search)[1]));
        keyword = keyword.split(/\+/).filter(function(s){return !!s.trim();}).join(' ');
        return keyword;
      }
    }
  },
  bing: {
    checkLocation: function(){
      return /www\.bing\.com/.test(location.host) && /^\/search/.test(location.pathname);
    },
    checkReferrer: function() {
      return /bing/.test(document.referrer);
    },
    searchWord: function() {
      var _q = $('input[name="q"]')[0];
      return clean(_q.value);
    },
    fromSearch: function(referrer) {
      var _a = document.createElement('a');
      _a.href = referrer;
      if (/www\.bing\.com/.test(_a.host) && /^\/search/.test(_a.pathname) && /[&?]q=([^&]+)/.test(_a.search)) {
        var keyword = clean(decodeURIComponent(/[&?]q=([^&]+)/i.exec(_a.search)[1]));
        keyword = keyword.split(/\+/).filter(function(s){return !!s.trim();}).join(' ');
        return keyword;
      }
    }
  },
  baidu: {
    checkLocation: function(){
      return /www\.baidu\.\w+/.test(location.host) && /^\/s$/.test(location.pathname);
    },
    checkReferrer: function() {
      return /baidu/.test(document.referrer);
    },
    searchWord: function() {
      var _q = $('input[name="wd"]')[0];
      return clean(_q.value);
    },
    fromSearch: function() {
      var _a = document.createElement('a');
      _a.href = document.referrer;
      if (/www\.baidu\.\w+/.test(_a.host) && /^\/s$/.test(_a.pathname) && /[&?]wd=([^&]+)/.test(_a.search)) {
        var keyword = clean(decodeURIComponent(/[&?]wd=([^&]+)/i.exec(_a.search)[1]));
        keyword = keyword.split(/\+/).filter(function(s){return !!s.trim();}).join(' ');
        return keyword;
      }
    }
  },
  windowName: {
    checkReferrer: function() {
      return window.name.indexOf(PRE) === 0;
    },
    fromSearch: function() {
      return  new RegExp(PRE + '\\d*::(.+)').exec(decodeURIComponent(window.name))[1]
    }
  }
};

var state = {
  highlighted:true,
  words:[]
};

var checkKeyword = function() {
  var word = '';
  Object.keys(searchEngines).some(function(site) {
    var e = searchEngines[site];
    if (e.checkLocation && e.checkLocation()) {
      word = e.searchWord();
    } else if (e.checkReferrer && e.checkReferrer()) {
      word = e.fromSearch();
    }
    if (word) return true;
  });
  return word;
};

var keyword = checkKeyword();

var initExt = function() {
  if (!keyword) {
    if (window.chrome) {
      word_highlight.push_state_for_popup = function(){
        chrome.extension.sendRequest({state: state});
      };
    }
  }
  if (this.chrome) {
    chrome.extension.sendRequest({
      action:'init',
      keyword: keyword,
      isframe: window!==window.top
    }, word_highlight);
  } else if(this.safari) {
    safari.self.tab.dispatchMessage('init',{action:'init',keyword:keyword});
    safari.self.addEventListener('message',function(evt){
      word_highlight(evt.message);
    },false);
  }
};

initExt();

window.addEventListener('hashchange', function(e) {
  keyword = checkKeyword();
  initExt();
}, false);

function word_highlight(message){
  if (!message) {
    return;
  }

  if ('keyword' in message){
    keyword = message.keyword;
  }

  if (document.contentType && !/html/i.test(document.contentType)) {
    return;
  }

  var option = message.option;
  var ID_PRE = PRE + '_id';
  var STYLE_CLASS = '0123456789'.split('').map(function(a,i){return PRE + '_ext ' + PRE + '_word'+i;});
  var STYLE_COLOR = [[255,255,128],[153,204,255],[255,153,204],[102,204,102],[204,153,255],[255,204,102],[102,153,153],[204,153,102],[153,153,153],[204,102,153]];
  var setuped = false;
  var words = [], layers, positions = [], exprs = [];
  var xp_all = new $XE('descendant::font[starts-with(@name,"' + PRE + '_word")]', document.body);
  var highlight_reset = function(){};
  var root = /BackCompat/i.test(document.compatMode) ? document.body : document.documentElement;
  word_highlight.push_state_for_popup = function(){
    state.words.forEach(function(w,i){
      w.count = $X('count(descendant::font[@name="' + PRE + '_word' + i +'"])', document.body,null,XPathResult.NUMBER_TYPE).numberValue;
    });
    chrome.extension.sendRequest({state: state});
  };
  if (keyword) {
    setup();
  }
  init();
  if (option.popup) {
    word_highlight.push_state_for_popup();
  }

  function highlight(doc, ext_word) {
    var _words = ext_word || state.words;
    if (_words.length <= 0) {
      return;
    }
    var exd_words, xw;
    if (_words.length === 1 && _words[0].exp) {
      exd_words = _words.map(function(e){return e.exp;});
      xw = '';
    } else {
      exd_words = _words.map(function(w,i){
        if (w.test){
          return {regexp:w,index:i};
        } else if (w.lighted) {
          return {regexp:new RegExp('(' + w.text.replace(/\W/g,'\\$&') + ')(?!##)', 'ig'),index:w.index};
        } else {
          return null;
        }
      });
      xw = ' and (' + _words.map(function(w){return ' contains(translate(self::text(),"abcdefghijklmnopqrstuvwxyz","ABCDEFGHIJKLMNOPQRSTUVWXYZ"),'+escapeXPathExpr(w.text.toUpperCase())+') ';}).join(' or ') + ') ';
    }
    var not_element = ['ancestor::textarea', 'ancestor::script' ,'ancestor::style' ,'ancestor::aside' ,'ancestor::font[contains(@class,"'+PRE+'")]'];
    var bpre = $X('//pre[contains(@class,"brush:")]');
    if (bpre.length){
      var not_element_cp = not_element.slice();
      not_element.push('ancestor::pre[contains(@class,"brush:")]');
      window.addEventListener('load',function(){
        setTimeout(function(){
          $X('descendant::text()[string-length(normalize-space(self::text())) > 3 ' + xw +' and not(' + not_element.join(' or ') + ')]', doc).forEach(_highlight);
        },100);
      },false);
    }
    if (/^\/search/.test(location.pathname)) {
      not_element.push('ancestor::form');
    }
    $X('descendant::text()[string-length(normalize-space(self::text())) > 3 ' + xw +' and not(' + not_element.join(' or ') + ')]', doc).forEach(_highlight);
    function _highlight(node) {
      exd_words.forEach(function(ew, _i){
        if (node.nodeValue.search(ew.regexp) >= 0) {
          var text = node.nodeValue, index;
          var parent = node.parentNode;
          while (text && (index = text.search(ew.regexp)) >= 0) {
            var _end = RegExp.$1.length;
            var _txt = node.splitText(index);
            var __txt = _txt.splitText(_end);
            var ft = document.createElement('font');
            ft.id =  ID_PRE + id_index++;
            ft.className = STYLE_CLASS[_i%10];
            ft.setAttribute('name', PRE + '_word' + _i);
            ft.appendChild(_txt);
            parent.insertBefore(ft, __txt);
            text = __txt.nodeValue;
            node = __txt;
          }
        }
      });
    }
  }

  function setup(){
    init_words();
    highlight(document.body);
    layers = xp_all.get();
    exprs = words.map(function(w, _i){
      return new $XE('descendant::font[@name="' + PRE + '_word' + _i +'"]', document.body);
    });
    chrome.extension.sendRequest({action: 'setuped'});
    if (keyword) {
      window.name = PRE + '::' + encodeURIComponent(keyword);
    }
  }

  function init(){
    var PAGERATE = Math.ceil(root.scrollHeight / 10000) + 2;
    var sheet = addCSS(STYLE_COLOR.map(function(rgb, i){
      var hits = exprs[i] && exprs[i].get().length;
      var alpha = hits >= 1 ? (Math.max((1 - Math.log(hits)*Math.LOG10E / PAGERATE) , 0.25)).toFixed(2) : 1;
      return 'font.' + PRE + '_word'+i+'{display:inline;background:rgba('+rgb.join(',')+','+alpha+');color:black;}';
    }).join('\n'),'word_highlight_style');
    init_autopager();
    document.addEventListener('word_highlight.reset',function(e){
      restore_words();
      state.highlighted = false;
    },false);
    document.addEventListener('word_highlight.resetup',function(e){
      if (e.keyword) {
        resetup(e.keyword);
      }
      state.highlighted = true;
    },false);
    document.addEventListener('word_highlight.highlight',function(e){
      highlight(document.body);
      state.highlighted = true;
    },false);
    /*
    document.addEventListener('word_highlight.add_word',function(e){
      if (e.word) {
        add_word(e.word);
      }
    },false);
    */
    document.addEventListener('word_highlight.word.off',function(e){
      var index = words.indexOf(e.word);
      if (e.word && index >= 0) {
        var nodes = $X('descendant::font[@name="' + PRE + '_word' + index +'"]', document.body);
        restore_words(nodes);
        state.words[index].lighted = false;
      }
    },false);
    document.addEventListener('word_highlight.word.on',function(e){
      var index = words.indexOf(e.word);
      if (e.word && index >= 0) {
        state.words[index].lighted = true;
        highlight(document.body,[state.words[index]]);
      }
    },false);
    document.addEventListener('word_highlight.next',function(e){
      if (e.index >= 0) {
        next(e.index);
      } else if (e) {
        next();
      }
    },false);
    document.addEventListener('word_highlight.prev',function(e){
      if (e.index >= 0) {
        prev(e.index);
      } else if (e) {
        prev();
      }
    },false);
  }

  function restore_words(words) {
    (words||xp_all.get()).forEach(function(layer,i){
      var parent = layer.parentNode;
      while (layer.firstChild){
        parent.insertBefore(layer.firstChild, layer);
      }
      parent.removeChild(layer);
      parent.normalize();
    });
  }


  function add_word(word) {
    highlight(document.body,{words:[word],index:words.length});
    layers = xp_all.get();
  }

  function resetup(_keyword) {
    keyword = _keyword;
    restore_words();
    setup();
    word_highlight.push_state_for_popup();
  }

  function move(node) {
    if (!node) return;
    node.style.outline = node.style.WebkitOutline = '4px solid #33ccff';
    if (node.getBoundingClientRect) {
      var pos = node.getBoundingClientRect();
      document.documentElement.scrollTop = document.body.scrollTop =
        pos.top + window.pageYOffset - window.innerHeight/2 + (pos.bottom - pos.top);
    } else {
      node.scrollIntoView();
    }
    setTimeout(function(){
      node.style.outline = node.style.WebkitOutline = 'none';
    },2000);
  }


  function init_words(){
    var erg = keyword.match(new RegExp("^ ?/(.+)/([gim]+)?$"));
    if (erg) {
      var ew = erg[1], flag = erg[2] || '';
      words = [{exp:new RegExp('(' + ew + ')(?!##)', flag), text:ew, toString:function(){return ew;}}];
    } else if (keyword) {
      var ret=[], eword = keyword.replace(/"([^"]+)"/g,function($0,$1){$1 && ret.push($1);return '';});
      words = eword.split(/[\+\s\.:\|#]/).filter(function(w){return !!w;}).concat(ret);
    }
    state.keyword = keyword;
    state.words = words.map(function(w, i){return {text:w, lighted:true, index:i};});
  }
  function next(index, num) {
    var _layers;
    if (index >= 0){
      _layers = exprs[index].get();
    } else {
      _layers = layers;
    }
    num || (num = 0);
    move(_layers[positions[num]++] || (positions[num]=1, _layers[0]));
  }
  function prev(index, num) {
    var _layers;
    if (index >= 0){
      _layers = exprs[index].get();
    } else {
      _layers = layers;
    }
    num || (num = 0);
    move(_layers[positions[num]--] || (positions[num]=_layers.length-1,_layers[positions[num]--]));
  }
  function init_autopager(e){
    var inserted_highlight = function(e){
      if (state.highlighted){
        highlight(e.target);
      }
    };
    var after_load = function(e){
      layers = xp_all.get();
    };
    window.addEventListener('AutoPatchWork.DOMNodeInserted', inserted_highlight,false);
    window.addEventListener('AutoPatchWork.pageloaded', after_load,false);
    window.addEventListener('AutoPagerize_DOMNodeInserted', inserted_highlight,false);
    window.addEventListener('GM_AutoPagerizeNextPageLoaded', after_load,false);
    highlight_reset = function(){
      window.removeEventListener('AutoPatchWork.DOMNodeInserted', inserted_highlight,false);
      window.removeEventListener('AutoPatchWork.pageloaded', after_load,false);
      window.removeEventListener('AutoPagerize_DOMNodeInserted', inserted_highlight,false);
      window.removeEventListener('GM_AutoPagerizeNextPageLoaded', after_load,false);
    }
  }

  function $XE(exp, context) {
    var xe = new XPathEvaluator();
    var resolver = xe.createNSResolver(document.documentElement);
    var defaultNS = (document.documentElement.nodeName !== 'HTML') ? context.namespaceURI : null;
    if (defaultNS) {
      var defaultPrefix = '__default__';
      exp = addDefaultPrefix(exp, defaultPrefix);
      var defaultResolver = resolver;
      resolver = function (prefix) {
        return (prefix == defaultPrefix) ? defaultNS : defaultResolver.lookupNamespaceURI(prefix);
      };
    }
    var ex = xe.createExpression(exp, resolver);
    this.get = function(param) {
      param || (param={});
      var result = this.result = 
        ex.evaluate(param.context||context, param.result_type||XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,this.result);
      if (param.result_type) return result;
      for (var i = 0, len = result.snapshotLength, res = new Array(len); i < len; i++) {
        res[i] = result.snapshotItem(i);
      }
      return res;
    };
  }

  // via AutoPagerize Thx! nanto_vi
  function addDefaultPrefix(xpath, prefix) {
    var tokenPattern = /([A-Za-z_\u00c0-\ufffd][\w\-.\u00b7-\ufffd]*|\*)\s*(::?|\()?|(".*?"|'.*?'|\d+(?:\.\d*)?|\.(?:\.|\d+)?|[\)\]])|(\/\/?|!=|[<>]=?|[\(\[|,=+-])|([@$])/g;
    var TERM = 1, OPERATOR = 2, MODIFIER = 3;
    var tokenType = OPERATOR;
    prefix += ':';
    function replacer(token, identifier, suffix, term, operator, modifier) {
      if (suffix) {
        tokenType =
          (suffix == ':' || (suffix == '::' && (identifier == 'attribute' || identifier == 'namespace')))
          ? MODIFIER : OPERATOR;
      } else if (identifier) {
        if (tokenType == OPERATOR && identifier != '*') {
          token = prefix + token;
        }
        tokenType = (tokenType == TERM) ? OPERATOR : TERM;
      } else {
        tokenType = term ? TERM : operator ? OPERATOR : MODIFIER;
      }
      return token;
    }
    return xpath.replace(tokenPattern, replacer);
  }

  // http://d.hatena.ne.jp/amachang/20090917/1253179486
  function escapeXPathExpr(text) {
    var matches = text.match(/[^"]+|"/g);
    function esc(t) {
      return t == '"' ? ('\'' + t + '\'') : ('"' + t + '"');
    }
    if (matches) {
      if (matches.length == 1) {
        return esc(matches[0]);
      } else {
        var results = [];
        for (var i = 0, len = matches.length; i < len; i ++) {
          results.push(esc(matches[i]));
        }
        return 'concat(' + results.join(', ') + ')';
      }
    } else {
      return '""';
    }
  }

  function $X(exp, context, resolver, result_type) {
    context || (context = document);
    var Doc = context.ownerDocument || context;
    var result = Doc.evaluate(exp, context, resolver, result_type || XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (result_type) return result;
    for (var i = 0, len = result.snapshotLength, res = new Array(len); i < len; i++) {
      res[i] = result.snapshotItem(i);
    }
    return res;
  }

  function error(e){
    console.error(e);
  }

  function addCSS(css,id){
    var sheet = document.createElement('style');
    sheet.textContent = css;
    sheet.id = id;
    return document.head.appendChild(sheet).sheet;
  }
}
//console.timeEnd("highlight");

// Bench: http://www.google.com/search?hl=en&q=HTML+5+Markup+Language
