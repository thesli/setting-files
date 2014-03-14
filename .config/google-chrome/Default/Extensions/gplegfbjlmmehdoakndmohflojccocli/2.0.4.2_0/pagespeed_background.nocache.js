function pagespeed_background(){
  var $wnd_0 = window, $doc_0 = document, gwtOnLoad, bodyDone, base = '', metaProps = {}, values = [], providers = [], answers = [], softPermutationId = 0, onLoadErrorFunc, propertyErrorFunc;
  if (!$wnd_0.__gwt_stylesLoaded) {
    $wnd_0.__gwt_stylesLoaded = {};
  }
  if (!$wnd_0.__gwt_scriptsLoaded) {
    $wnd_0.__gwt_scriptsLoaded = {};
  }
  function isHostedMode(){
    var result = false;
    try {
      var query = $wnd_0.location.search;
      return (query.indexOf('gwt.codesvr=') != -1 || (query.indexOf('gwt.hosted=') != -1 || $wnd_0.external && $wnd_0.external.gwtOnLoad)) && query.indexOf('gwt.hybrid') == -1;
    }
     catch (e) {
    }
    isHostedMode = function(){
      return result;
    }
    ;
    return result;
  }

  function maybeStartModule(){
    if (gwtOnLoad && bodyDone) {
      gwtOnLoad(onLoadErrorFunc, 'pagespeed_background', base, softPermutationId);
    }
  }

  function computeScriptBase(){
    var thisScript, markerId = '__gwt_marker_pagespeed_background', markerScript;
    $doc_0.write('<script id="' + markerId + '"><\/script>');
    markerScript = $doc_0.getElementById(markerId);
    thisScript = markerScript && markerScript.previousSibling;
    while (thisScript && thisScript.tagName != 'SCRIPT') {
      thisScript = thisScript.previousSibling;
    }
    function getDirectoryOfFile(path){
      var hashIndex = path.lastIndexOf('#');
      if (hashIndex == -1) {
        hashIndex = path.length;
      }
      var queryIndex = path.indexOf('?');
      if (queryIndex == -1) {
        queryIndex = path.length;
      }
      var slashIndex = path.lastIndexOf('/', Math.min(queryIndex, hashIndex));
      return slashIndex >= 0?path.substring(0, slashIndex + 1):'';
    }

    ;
    if (thisScript && thisScript.src) {
      base = getDirectoryOfFile(thisScript.src);
    }
    if (base == '') {
      var baseElements = $doc_0.getElementsByTagName('base');
      if (baseElements.length > 0) {
        base = baseElements[baseElements.length - 1].href;
      }
       else {
        base = getDirectoryOfFile($doc_0.location.href);
      }
    }
     else if (base.match(/^\w+:\/\//)) {
    }
     else {
      var img = $doc_0.createElement('img');
      img.src = base + 'clear.cache.gif';
      base = getDirectoryOfFile(img.src);
    }
    if (markerScript) {
      markerScript.parentNode.removeChild(markerScript);
    }
  }

  function processMetas(){
    var metas = document.getElementsByTagName('meta');
    for (var i = 0, n = metas.length; i < n; ++i) {
      var meta = metas[i], name_0 = meta.getAttribute('name'), content_0;
      if (name_0) {
        if (name_0 == 'gwt:property') {
          content_0 = meta.getAttribute('content');
          if (content_0) {
            var value_0, eq = content_0.indexOf('=');
            if (eq >= 0) {
              name_0 = content_0.substring(0, eq);
              value_0 = content_0.substring(eq + 1);
            }
             else {
              name_0 = content_0;
              value_0 = '';
            }
            metaProps[name_0] = value_0;
          }
        }
         else if (name_0 == 'gwt:onPropertyErrorFn') {
          content_0 = meta.getAttribute('content');
          if (content_0) {
            try {
              propertyErrorFunc = eval(content_0);
            }
             catch (e) {
              alert('Bad handler "' + content_0 + '" for "gwt:onPropertyErrorFn"');
            }
          }
        }
         else if (name_0 == 'gwt:onLoadErrorFn') {
          content_0 = meta.getAttribute('content');
          if (content_0) {
            try {
              onLoadErrorFunc = eval(content_0);
            }
             catch (e) {
              alert('Bad handler "' + content_0 + '" for "gwt:onLoadErrorFn"');
            }
          }
        }
      }
    }
  }

  function __gwt_isKnownPropertyValue(propName, propValue){
    return propValue in values[propName];
  }

  function __gwt_getMetaProperty(name_0){
    var value_0 = metaProps[name_0];
    return value_0 == null?null:value_0;
  }

  function unflattenKeylistIntoAnswers(propValArray, value_0){
    var answer = answers;
    for (var i = 0, n = propValArray.length - 1; i < n; ++i) {
      answer = answer[propValArray[i]] || (answer[propValArray[i]] = []);
    }
    answer[propValArray[n]] = value_0;
  }

  function computePropValue(propName){
    var value_0 = providers[propName](), allowedValuesMap = values[propName];
    if (value_0 in allowedValuesMap) {
      return value_0;
    }
    var allowedValuesList = [];
    for (var k in allowedValuesMap) {
      allowedValuesList[allowedValuesMap[k]] = k;
    }
    if (propertyErrorFunc) {
      propertyErrorFunc(propName, allowedValuesList, value_0);
    }
    throw null;
  }

  providers['locale'] = function(){
    var locale = null;
    var rtlocale = 'default';
    try {
      if (!locale) {
        var queryParam = location.search;
        var qpStart = queryParam.indexOf('locale=');
        if (qpStart >= 0) {
          var value_0 = queryParam.substring(qpStart + 7);
          var end = queryParam.indexOf('&', qpStart);
          if (end < 0) {
            end = queryParam.length;
          }
          locale = queryParam.substring(qpStart + 7, end);
        }
      }
      if (!locale) {
        locale = __gwt_getMetaProperty('locale');
      }
      if (!locale) {
        locale = $wnd_0['__gwt_Locale'];
      }
      if (locale) {
        rtlocale = locale;
      }
      while (locale && !__gwt_isKnownPropertyValue('locale', locale)) {
        var lastIndex = locale.lastIndexOf('_');
        if (lastIndex < 0) {
          locale = null;
          break;
        }
        locale = locale.substring(0, lastIndex);
      }
    }
     catch (e) {
      alert('Unexpected exception in locale detection, using default: ' + e);
    }
    $wnd_0['__gwt_Locale'] = rtlocale;
    return locale || 'default';
  }
  ;
  values['locale'] = {'default':0, en_US:1};
  pagespeed_background.onScriptLoad = function(gwtOnLoadFunc){
    pagespeed_background = null;
    gwtOnLoad = gwtOnLoadFunc;
    maybeStartModule();
  }
  ;
  if (isHostedMode()) {
    alert('Single-script hosted mode not yet implemented. See issue ' + 'http://code.google.com/p/google-web-toolkit/issues/detail?id=2079');
    return;
  }
  computeScriptBase();
  processMetas();
  try {
    var strongName;
    unflattenKeylistIntoAnswers(['default'], '83C32E19862420210D22EF163F5F73DB');
    unflattenKeylistIntoAnswers(['en_US'], '83C32E19862420210D22EF163F5F73DB' + ':1');
    strongName = answers[computePropValue('locale')];
    var idx = strongName.indexOf(':');
    if (idx != -1) {
      softPermutationId = Number(strongName.substring(idx + 1));
    }
  }
   catch (e) {
    return;
  }
  var onBodyDoneTimerId;
  function onBodyDone(){
    if (!bodyDone) {
      bodyDone = true;
      maybeStartModule();
      if ($doc_0.removeEventListener) {
        $doc_0.removeEventListener('DOMContentLoaded', onBodyDone, false);
      }
      if (onBodyDoneTimerId) {
        clearInterval(onBodyDoneTimerId);
      }
    }
  }

  if ($doc_0.addEventListener) {
    $doc_0.addEventListener('DOMContentLoaded', function(){
      onBodyDone();
    }
    , false);
  }
  var onBodyDoneTimerId = setInterval(function(){
    if (/loaded|complete/.test($doc_0.readyState)) {
      onBodyDone();
    }
  }
  , 50);
}

pagespeed_background();
(function () {var $gwt_version = "0.0.999";var $wnd = window;var $doc = $wnd.document;var $moduleName, $moduleBase;var $stats = $wnd.__gwtStatsEvent ? function(a) {$wnd.__gwtStatsEvent(a)} : null;var $strongName = '83C32E19862420210D22EF163F5F73DB';var _, seedTable = {}, Q$Object = 0, Q$String = 1, Q$Callback = 2, Q$JavaScriptException = 3, Q$LongLibBase$LongEmul = 4, Q$DocumentModeAsserter$Severity = 5, Q$Promise$State = 6, Q$OperationCancelledException$WidgetMessages = 7, Q$Serializable = 8, Q$CharSequence = 9, Q$Comparable = 10, Q$Enum = 11, Q$StackTraceElement = 12, Q$Throwable = 13, CM$ = {};
function newSeed(id_0){
  return new seedTable[id_0];
}

function defineSeed(id_0, superSeed, castableTypeMap){
  var seed = seedTable[id_0];
  if (seed && !seed.___clazz$) {
    _ = seed.prototype;
  }
   else {
    if (!seed) {
      seed = seedTable[id_0] = function(){
      }
      ;
    }
    _ = seed.prototype = superSeed < 0?{}:newSeed(superSeed);
    _.castableTypeMap$ = castableTypeMap;
  }
  for (var i = 3; i < arguments.length; ++i) {
    arguments[i].prototype = _;
  }
  if (seed.___clazz$) {
    _.___clazz$ = seed.___clazz$;
    seed.___clazz$ = null;
  }
}

function $$init_23(){
}

function $clinit_SeedUtil(){
}

function makeCastMap(a){
  var result = {};
  for (var i = 0, c = a.length; i < c; ++i) {
    result[a[i]] = 1;
  }
  return result;
}

function nullMethod(){
}

function $$init(){
}

function $hashCode(this$static){
  return getHashCode(this$static);
}

function Object_1(){
  $$init();
}

defineSeed(1, -1, CM$, Object_1);
_.getClass$ = function getClass_0(){
  return this.___clazz$;
}
;
_.hashCode$ = function hashCode_0(){
  return $hashCode(this);
}
;
_.toString$ = function toString_0(){
  return $getName(this.___clazz$) + '@' + toHexString(this.hashCode$());
}
;
_.toString = function(){
  return this.toString$();
}
;
_.typeMarker$ = nullMethod;
function checkNotNull(reference){
  if (jsEquals(reference, null)) {
    throw new NullPointerException_0;
  }
  return reference;
}

function checkState(expression){
  if (!expression) {
    throw new IllegalStateException_0;
  }
}

function currentTimeMillis(){
  return (new Date).getTime();
}

function getUncaughtExceptionHandler(){
  return null;
}

function isScript(){
  return true;
}

function log_0(){
  log_2();
}

function log_1(){
  log_3();
}

function maybeReportUncaughtException(){
  maybeReportUncaughtException_0(null);
}

function $$init_0(){
}

function $fillInStackTrace(this$static){
  fillInStackTrace(this$static);
  return this$static;
}

function $setStackTrace(this$static, stackTrace){
  var c, copy, i;
  copy = initDim(_3Ljava_lang_StackTraceElement_2_classLit, makeCastMap([Q$Serializable]), Q$StackTraceElement, stackTrace.length, 0);
  for (i = 0 , c = stackTrace.length; i < c; ++i) {
    if (isNull(stackTrace[i])) {
      throw new NullPointerException_0;
    }
    copy[i] = stackTrace[i];
  }
  this$static , copy;
}

function Throwable_0(){
  Object_1.call(this);
  $$init_0();
  $fillInStackTrace(this);
}

function Throwable_1(message){
  Object_1.call(this);
  $$init_0();
  this.detailMessage = message;
  $fillInStackTrace(this);
}

defineSeed(9, 1, makeCastMap([Q$Serializable, Q$Throwable]));
_.getMessage = function getMessage(){
  return this.detailMessage;
}
;
_.toString$ = function toString_1(){
  var className, msg;
  className = $getName(this.___clazz$);
  msg = this.getMessage();
  return jsNotEquals(msg, null)?className + ': ' + msg:className;
}
;
function $$init_1(){
}

function Exception_0(){
  Throwable_0.call(this);
  $$init_1();
}

function Exception_1(message){
  Throwable_1.call(this, message);
  $$init_1();
}

defineSeed(8, 9, makeCastMap([Q$Serializable, Q$Throwable]));
function $$init_2(){
}

function RuntimeException_0(){
  Exception_0.call(this);
  $$init_2();
}

function RuntimeException_1(message){
  Exception_1.call(this, message);
  $$init_2();
}

defineSeed(7, 8, makeCastMap([Q$Serializable, Q$Throwable]), RuntimeException_1);
function $clinit_JavaScriptException(){
  $clinit_JavaScriptException = nullMethod;
  NOT_SET = new Object_1;
}

function $$init_3(this$static){
  this$static.description = '';
}

function $ensureInit(this$static){
  var exception;
  if (jsEquals(this$static.message_0, null)) {
    exception = $getThrown(this$static);
    this$static.name_0 = getExceptionName(exception);
    this$static.description = this$static.description + ': ' + getExceptionDescription(exception);
    this$static.message_0 = '(' + this$static.name_0 + ') ' + getExceptionProperties(exception) + this$static.description;
  }
}

function $getThrown(this$static){
  return maskUndefined(this$static.e) === maskUndefined(NOT_SET)?null:this$static.e;
}

function $isThrownSet(this$static){
  return maskUndefined(this$static.e) !== maskUndefined(NOT_SET);
}

function JavaScriptException_0(e){
  $clinit_JavaScriptException();
  JavaScriptException_1.call(this, e, '');
}

function JavaScriptException_1(e, description){
  RuntimeException_0.call(this);
  $$init_3(this);
  this.e = e;
  this.description = description;
  createStackTrace_0(this);
}

function getExceptionDescription(e){
  return instanceOfJso(e)?getExceptionDescription0(dynamicCastJso(e)):e + '';
}

function getExceptionDescription0(e){
  return e == null?null:e.message;
}

function getExceptionName(e){
  return jsEquals(e, null)?'null':instanceOfJso(e)?getExceptionName0(dynamicCastJso(e)):instanceOf(e, Q$String)?'String':$getName(getClass__devirtual$(e));
}

function getExceptionName0(e){
  return e == null?null:e.name;
}

function getExceptionProperties(e){
  return instanceOfJso(e)?getProperties(dynamicCastJso(e)):'';
}

defineSeed(6, 7, makeCastMap([Q$JavaScriptException, Q$Serializable, Q$Throwable]), JavaScriptException_0);
_.getMessage = function getMessage_0(){
  $ensureInit(this);
  return this.message_0;
}
;
var NOT_SET;
function $cast(this$static){
  return this$static;
}

function $getClass(){
  return Lcom_google_gwt_core_client_JavaScriptObject_2_classLit;
}

function $hashCode_0(this$static){
  return getHashCode(this$static);
}

function createArray(){
  return [];
}

function createObject(){
  return {};
}

function getClass__devirtual$(this$static){
  var maybeJsoInvocation;
  return maybeJsoInvocation = this$static , isJavaObject(maybeJsoInvocation)?maybeJsoInvocation.___clazz$:$getClass();
}

function hashCode__devirtual$(this$static){
  var maybeJsoInvocation;
  return maybeJsoInvocation = this$static , isJavaObject(maybeJsoInvocation)?maybeJsoInvocation.hashCode$():$hashCode_0(maybeJsoInvocation);
}

function toStringSimple(obj){
  return obj.toString?obj.toString():'[JavaScriptObject]';
}

function toStringVerbose(obj){
  var defined = function(m){
    return typeof m != 'undefined';
  }
  ;
  var strip = function(s){
    return s.replace(/\r\n/g, '');
  }
  ;
  if (defined(obj.outerHTML))
    return strip(obj.outerHTML);
  if (defined(obj.innerHTML) && obj.cloneNode) {
    $doc.createElement('div').appendChild(obj.cloneNode(true)).innerHTML;
  }
  if (defined(obj.nodeType) && obj.nodeType == 3) {
    return "'" + obj.data.replace(/ /g, '\u25AB').replace(/\u00A0/, '\u25AA') + "'";
  }
  if (typeof defined(obj.htmlText) && obj.collapse) {
    var html = obj.htmlText;
    if (html) {
      return 'IETextRange [' + strip(html) + ']';
    }
     else {
      var dup = obj.duplicate();
      dup.pasteHTML('|');
      var out = 'IETextRange ' + strip(obj.parentElement().outerHTML);
      dup.moveStart('character', -1);
      dup.pasteHTML('');
      return out;
    }
  }
  return obj.toString?obj.toString():'[JavaScriptObject]';
}

function $get(this$static, index_0){
  return this$static[index_0];
}

function $length(this$static){
  return this$static.length;
}

function $push(this$static, value_0){
  this$static[this$static.length] = value_0;
}

function $shift(this$static){
  return this$static.shift();
}

function $get_0(this$static, index_0){
  return this$static[index_0];
}

function $length_0(this$static){
  return this$static.length;
}

function $set(this$static, index_0, value_0){
  this$static[index_0] = value_0;
}

function $clinit_JsonUtils(){
  $clinit_JsonUtils = nullMethod;
  escapeTable = initEscapeTable();
  hasJsonParse();
}

function escapeChar(c){
  var lookedUp = escapeTable[c.charCodeAt(0)];
  return lookedUp == null?c:lookedUp;
}

function escapeValue(toEscape){
  $clinit_JsonUtils();
  var s = toEscape.replace(/[\x00-\x1f\xad\u0600-\u0603\u06dd\u070f\u17b4\u17b5\u200b-\u200f\u2028-\u202e\u2060-\u2064\u206a-\u206f\ufeff\ufff9-\ufffb"\\]/g, function(x_0){
    return escapeChar(x_0);
  }
  );
  return '"' + s + '"';
}

function hasJsonParse(){
  return typeof JSON == 'object' && typeof JSON.parse == 'function';
}

function initEscapeTable(){
  var out = ['\\u0000', '\\u0001', '\\u0002', '\\u0003', '\\u0004', '\\u0005', '\\u0006', '\\u0007', '\\b', '\\t', '\\n', '\\u000B', '\\f', '\\r', '\\u000E', '\\u000F', '\\u0010', '\\u0011', '\\u0012', '\\u0013', '\\u0014', '\\u0015', '\\u0016', '\\u0017', '\\u0018', '\\u0019', '\\u001A', '\\u001B', '\\u001C', '\\u001D', '\\u001E', '\\u001F'];
  out[34] = '\\"';
  out[92] = '\\\\';
  out[173] = '\\u00ad';
  out[1536] = '\\u0600';
  out[1537] = '\\u0601';
  out[1538] = '\\u0602';
  out[1539] = '\\u0603';
  out[1757] = '\\u06dd';
  out[1807] = '\\u070f';
  out[6068] = '\\u17b4';
  out[6069] = '\\u17b5';
  out[8203] = '\\u200b';
  out[8204] = '\\u200c';
  out[8205] = '\\u200d';
  out[8206] = '\\u200e';
  out[8207] = '\\u200f';
  out[8232] = '\\u2028';
  out[8233] = '\\u2029';
  out[8234] = '\\u202a';
  out[8235] = '\\u202b';
  out[8236] = '\\u202c';
  out[8237] = '\\u202d';
  out[8238] = '\\u202e';
  out[8288] = '\\u2060';
  out[8289] = '\\u2061';
  out[8290] = '\\u2062';
  out[8291] = '\\u2063';
  out[8292] = '\\u2064';
  out[8298] = '\\u206a';
  out[8299] = '\\u206b';
  out[8300] = '\\u206c';
  out[8301] = '\\u206d';
  out[8302] = '\\u206e';
  out[8303] = '\\u206f';
  out[65279] = '\\ufeff';
  out[65529] = '\\ufff9';
  out[65530] = '\\ufffa';
  out[65531] = '\\ufffb';
  return out;
}

var escapeTable;
function $$init_4(){
}

function Scheduler_0(){
  Object_1.call(this);
  $$init_4();
}

defineSeed(14, 1, {});
function $clinit_Impl(){
  $clinit_Impl = nullMethod;
  false;
  2000;
  new UnloadSupport_0;
  exportUnloadModule();
}

function apply_0(jsFunction, thisObj, args){
  if (isScript()) {
    return jsFunction.apply(thisObj, args);
  }
   else {
    var __0 = jsFunction.apply(thisObj, args);
    if (__0 != null) {
      __0 = Object(__0);
    }
    return __0;
  }
}

function clearTimeout_0(timerId){
  $clearTimeout(timerId);
}

function dispose(d){
  $clinit_Impl();
  $dispose(d);
}

function enter(){
  var now_0;
  if (entryDepth != 0) {
    now_0 = currentTimeMillis();
    if (now_0 - watchdogEntryDepthLastScheduled > 2000) {
      watchdogEntryDepthLastScheduled = now_0;
      watchdogEntryDepthTimerId = watchdogEntryDepthSchedule();
    }
  }
  if (entryDepth++ == 0) {
    $flushEntryCommands(($clinit_SchedulerImpl() , INSTANCE));
    return true;
  }
  return false;
}

function entry(jsFunction){
  return function(){
    try {
      return entry0(jsFunction, this, arguments);
    }
     catch (e) {
      throw e;
    }
  }
  ;
}

function entry0(jsFunction, thisObj, args){
  var initialEntry;
  if ($isUnloadSupported() && isModuleUnloaded()) {
    return null;
  }
  initialEntry = enter();
  try {
    if (jsNotEquals(getUncaughtExceptionHandler(), null)) {
      try {
        return apply_0(jsFunction, thisObj, args);
      }
       catch ($e0) {
        $e0 = wrap($e0);
        if (instanceOf($e0, Q$Throwable)) {
          $e0;
          maybeReportUncaughtException();
          return undefined_0();
        }
         else 
          throw unwrap($e0);
      }
    }
     else {
      return apply_0(jsFunction, thisObj, args);
    }
  }
   finally {
    exit(initialEntry);
  }
}

function exit(initialEntry){
  initialEntry && $flushFinallyCommands(($clinit_SchedulerImpl() , INSTANCE));
  --entryDepth;
  if (initialEntry) {
    if (watchdogEntryDepthTimerId != -1) {
      watchdogEntryDepthCancel(watchdogEntryDepthTimerId);
      watchdogEntryDepthTimerId = -1;
    }
  }
}

function exportUnloadModule(){
  $exportUnloadModule();
}

function getHashCode(o){
  $clinit_Impl();
  return o.$H || (o.$H = getNextHashId());
}

function getNextHashId(){
  return ++sNextHashId;
}

function isModuleUnloaded(){
  return false;
}

function maybeReportUncaughtException_0(handler){
  $clinit_Impl();
  isNotNull(uncaughtExceptionHandlerForTest) && null.nullMethod();
  isNotNull(handler) && jsNotEquals(handler, uncaughtExceptionHandlerForTest) && null.nullMethod();
}

function registerEntry(){
  $clinit_Impl();
  if (isScript()) {
    return entry;
  }
   else {
    return $entry = entry;
  }
}

function setTimeout_0(func, time){
  return $setTimeout(func, time);
}

function undefined_0(){
  return;
}

function watchdogEntryDepthCancel(timerId){
  clearTimeout_0(timerId);
}

function watchdogEntryDepthRun(){
  entryDepth != 0 && (entryDepth = 0);
  watchdogEntryDepthTimerId = -1;
}

function watchdogEntryDepthSchedule(){
  return setTimeout_0(function(){
    watchdogEntryDepthRun();
  }
  , 10);
}

var entryDepth = 0, sNextHashId = 0, uncaughtExceptionHandlerForTest, watchdogEntryDepthLastScheduled = 0, watchdogEntryDepthTimerId = -1;
function $clinit_SchedulerImpl(){
  $clinit_SchedulerImpl = nullMethod;
  INSTANCE = new SchedulerImpl_0;
  1;
  50;
  100;
}

function $$init_5(this$static){
  this$static , false;
  this$static , false;
}

function $flushEntryCommands(this$static){
  var oldQueue, rescheduled;
  if (isNotNull(this$static.entryCommands)) {
    rescheduled = null;
    do {
      oldQueue = this$static.entryCommands;
      this$static.entryCommands = null;
      rescheduled = runScheduledTasks(oldQueue, rescheduled);
    }
     while (isNotNull(this$static.entryCommands));
    this$static.entryCommands = rescheduled;
  }
}

function $flushFinallyCommands(this$static){
  var oldQueue, rescheduled;
  if (isNotNull(this$static.finallyCommands)) {
    rescheduled = null;
    do {
      oldQueue = this$static.finallyCommands;
      this$static.finallyCommands = null;
      rescheduled = runScheduledTasks(oldQueue, rescheduled);
    }
     while (isNotNull(this$static.finallyCommands));
    this$static.finallyCommands = rescheduled;
  }
}

function SchedulerImpl_0(){
  Scheduler_0.call(this);
  $$init_5(this);
}

function createQueue(){
  return $cast(createArray());
}

function push_0(queue, task){
  isNull(queue) && (queue = createQueue());
  $push(queue, task);
  return queue;
}

function runScheduledTasks(tasks, rescheduled){
  var i, j, t;
  for (i = 0 , j = $length(tasks); i < j; i++) {
    t = $get(tasks, i);
    try {
      $isRepeating(t)?$executeRepeating(t) && (rescheduled = push_0(rescheduled, t)):$executeScheduled(t);
    }
     catch ($e0) {
      $e0 = wrap($e0);
      if (instanceOf($e0, Q$Throwable)) {
        $e0;
        maybeReportUncaughtException();
      }
       else 
        throw unwrap($e0);
    }
  }
  return rescheduled;
}

defineSeed(16, 14, {}, SchedulerImpl_0);
var INSTANCE;
function $executeRepeating(this$static){
  return $getRepeating(this$static).nullMethod();
}

function $executeScheduled(this$static){
  $getScheduled(this$static).nullMethod();
}

function $getRepeating(this$static){
  return this$static[0];
}

function $getScheduled(this$static){
  return this$static[0];
}

function $isRepeating(this$static){
  return this$static[1];
}

function createStackTrace(){
  return (new StackTraceCreator$CollectorChromeNoSourceMap_0).collect();
}

function createStackTrace_0(e){
  (new StackTraceCreator$CollectorChromeNoSourceMap_0).createStackTrace(e);
}

function extractNameFromToString(fnToString){
  var index_0, start_0, toReturn;
  toReturn = '';
  fnToString = $trim(fnToString);
  index_0 = $indexOf_0(fnToString, '(');
  start_0 = $startsWith(fnToString, 'function')?8:0;
  if (index_0 == -1) {
    index_0 = $indexOf(fnToString, 64);
    start_0 = $startsWith(fnToString, 'function ')?9:0;
  }
  index_0 != -1 && (toReturn = $trim($substring_0(fnToString, start_0, index_0)));
  return $length_1(toReturn) > 0?toReturn:'anonymous';
}

function fillInStackTrace(t){
  (new StackTraceCreator$CollectorChromeNoSourceMap_0).fillInStackTrace(t);
}

function getProperties(e){
  return $getProperties((new StackTraceCreator$CollectorChromeNoSourceMap_0 , e));
}

function parseInt_0(number){
  return parseInt(number) || -1;
}

function splice(arr, length_0){
  arr.length >= length_0 && arr.splice(0, length_0);
  return arr;
}

function $$init_6(){
}

function $getProperties(e){
  var result = '';
  try {
    for (var prop in e) {
      if (prop != 'name' && (prop != 'message' && prop != 'toString')) {
        try {
          var propValue = prop != '__gwt$exception'?e[prop]:'<skipped>';
          result += '\n ' + prop + ': ' + propValue;
        }
         catch (ignored) {
        }
      }
    }
  }
   catch (ignored) {
  }
  return result;
}

function $makeException(){
  try {
    null.a();
  }
   catch (e) {
    return e;
  }
}

function StackTraceCreator$Collector_0(){
  Object_1.call(this);
  $$init_6();
}

defineSeed(19, 1, {}, StackTraceCreator$Collector_0);
_.collect = function collect(){
  var seen = {};
  var toReturn = [];
  var callee = arguments.callee.caller.caller;
  while (callee) {
    var name_0 = this.extractName(callee.toString());
    toReturn.push(name_0);
    var keyName = ':' + name_0;
    var withThisName = seen[keyName];
    if (withThisName) {
      var i, j;
      for (i = 0 , j = withThisName.length; i < j; i++) {
        if (withThisName[i] === callee) {
          return toReturn;
        }
      }
    }
    (withThisName || (seen[keyName] = [])).push(callee);
    callee = callee.caller;
  }
  return toReturn;
}
;
_.createStackTrace = function createStackTrace_1(e){
  var i, j, stack_0, stackTrace;
  stack_0 = this.inferFrom($getThrown(e));
  stackTrace = initDim(_3Ljava_lang_StackTraceElement_2_classLit, makeCastMap([Q$Serializable]), Q$StackTraceElement, $length_0(stack_0), 0);
  for (i = 0 , j = stackTrace.length; i < j; i++) {
    stackTrace[i] = new StackTraceElement_0('Unknown', $get_0(stack_0, i), null, -1);
  }
  $setStackTrace(e, stackTrace);
}
;
_.extractName = function extractName(fnToString){
  return extractNameFromToString(fnToString);
}
;
_.fillInStackTrace = function fillInStackTrace_0(t){
  var i, j, stack_0, stackTrace;
  stack_0 = createStackTrace();
  stackTrace = initDim(_3Ljava_lang_StackTraceElement_2_classLit, makeCastMap([Q$Serializable]), Q$StackTraceElement, $length_0(stack_0), 0);
  for (i = 0 , j = stackTrace.length; i < j; i++) {
    stackTrace[i] = new StackTraceElement_0('Unknown', $get_0(stack_0, i), null, -1);
  }
  $setStackTrace(t, stackTrace);
}
;
_.inferFrom = function inferFrom(e){
  return $cast(createArray());
}
;
function $$init_7(){
}

function $collect(this$static){
  return splice(this$static.inferFrom($makeException()), this$static.toSplice());
}

function $getStack(e){
  return e && e.stack?e.stack.split('\n'):[];
}

function $inferFrom(this$static, e){
  var i, j, jso, stack_0;
  jso = instanceOfJso(e)?dynamicCastJso(e):null;
  stack_0 = $getStack(jso);
  for (i = 0 , j = $length_0(stack_0); i < j; i++) {
    $set(stack_0, i, this$static.extractName($get_0(stack_0, i)));
  }
  return stack_0;
}

function StackTraceCreator$CollectorMoz_0(){
  StackTraceCreator$Collector_0.call(this);
  $$init_7();
}

defineSeed(21, 19, {});
_.collect = function collect_0(){
  return $collect(this);
}
;
_.inferFrom = function inferFrom_0(e){
  return $inferFrom(this, e);
}
;
_.toSplice = function toSplice(){
  return 2;
}
;
function $clinit_StackTraceCreator$CollectorChrome(){
  $clinit_StackTraceCreator$CollectorChrome = nullMethod;
  increaseChromeStackTraceLimit();
}

function $$init_8(){
}

function $inferFrom_0(this$static, e){
  var stack_0;
  stack_0 = $inferFrom(this$static, e);
  if ($length_0(stack_0) == 0) {
    return (new StackTraceCreator$Collector_0).inferFrom(e);
  }
   else {
    $startsWith($get_0(stack_0, 0), 'anonymous@@') && (stack_0 = splice(stack_0, 1));
    return stack_0;
  }
}

function $parseStackTrace(this$static, e, stack_0){
  var col, endFileUrl, fileName, i, j, lastColon, line, location_0, stackElements, stackTrace;
  stackTrace = initDim(_3Ljava_lang_StackTraceElement_2_classLit, makeCastMap([Q$Serializable]), Q$StackTraceElement, $length_0(stack_0), 0);
  for (i = 0 , j = stackTrace.length; i < j; i++) {
    stackElements = $split($get_0(stack_0, i), '@@');
    line = -1;
    col = -1;
    fileName = 'Unknown';
    if (stackElements.length == 2 && jsNotEquals(stackElements[1], null)) {
      location_0 = stackElements[1];
      lastColon = $lastIndexOf(location_0, 58);
      endFileUrl = $lastIndexOf_0(location_0, 58, lastColon - 1);
      fileName = $substring_0(location_0, 0, endFileUrl);
      if (lastColon != -1 && endFileUrl != -1) {
        line = parseInt_0($substring_0(location_0, endFileUrl + 1, lastColon));
        col = parseInt_0($substring(location_0, lastColon + 1));
      }
    }
    stackTrace[i] = new StackTraceElement_0('Unknown', stackElements[0], fileName + '@' + col, this$static.replaceIfNoSourceMap(line < 0?-1:line));
  }
  $setStackTrace(e, stackTrace);
}

function StackTraceCreator$CollectorChrome_0(){
  StackTraceCreator$CollectorMoz_0.call(this);
  $$init_8();
}

function increaseChromeStackTraceLimit(){
  Error.stackTraceLimit = 128;
}

defineSeed(20, 21, {});
_.collect = function collect_1(){
  var res;
  res = $collect(this);
  $length_0(res) == 0 && (res = splice((new StackTraceCreator$Collector_0).collect(), 1));
  return res;
}
;
_.createStackTrace = function createStackTrace_2(e){
  var stack_0;
  stack_0 = $inferFrom_0(this, $getThrown(e));
  $parseStackTrace(this, e, stack_0);
}
;
_.extractName = function extractName_0(fnToString){
  var closeParen, index_0, location_0, toReturn;
  'anonymous';
  location_0 = '';
  if ($length_1(fnToString) == 0) {
    return 'anonymous';
  }
  toReturn = $trim(fnToString);
  $startsWith(toReturn, 'at ') && (toReturn = $substring(toReturn, 3));
  index_0 = $indexOf_0(toReturn, '[');
  index_0 != -1 && (toReturn = $trim($substring_0(toReturn, 0, index_0)) + $trim($substring(toReturn, $indexOf_1(toReturn, ']', index_0) + 1)));
  index_0 = $indexOf_0(toReturn, '(');
  if (index_0 == -1) {
    index_0 = $indexOf_0(toReturn, '@');
    if (index_0 == -1) {
      location_0 = toReturn;
      toReturn = '';
    }
     else {
      location_0 = $trim($substring(toReturn, index_0 + 1));
      toReturn = $trim($substring_0(toReturn, 0, index_0));
    }
  }
   else {
    closeParen = $indexOf_1(toReturn, ')', index_0);
    location_0 = $substring_0(toReturn, index_0 + 1, closeParen);
    toReturn = $trim($substring_0(toReturn, 0, index_0));
  }
  index_0 = $indexOf(toReturn, 46);
  index_0 != -1 && (toReturn = $substring(toReturn, index_0 + 1));
  return ($length_1(toReturn) > 0?toReturn:'anonymous') + '@@' + location_0;
}
;
_.fillInStackTrace = function fillInStackTrace_1(t){
  var stack_0;
  stack_0 = createStackTrace();
  $parseStackTrace(this, t, stack_0);
}
;
_.inferFrom = function inferFrom_1(e){
  return $inferFrom_0(this, e);
}
;
_.replaceIfNoSourceMap = function replaceIfNoSourceMap(line){
  return line;
}
;
_.toSplice = function toSplice_0(){
  return 3;
}
;
function $$init_9(){
}

function StackTraceCreator$CollectorChromeNoSourceMap_0(){
  $clinit_StackTraceCreator$CollectorChrome();
  StackTraceCreator$CollectorChrome_0.call(this);
  $$init_9();
}

defineSeed(22, 20, {}, StackTraceCreator$CollectorChromeNoSourceMap_0);
_.replaceIfNoSourceMap = function replaceIfNoSourceMap_0(line){
  return -1;
}
;
function $$init_10(){
}

function StringBufferImpl_0(){
  Object_1.call(this);
  $$init_10();
}

defineSeed(23, 1, {});
function $$init_11(this$static){
}

function StringBufferImplAppend_0(){
  StringBufferImpl_0.call(this);
  $$init_11(this);
}

defineSeed(24, 23, {}, StringBufferImplAppend_0);
_.append_0 = function append(data_0, x_0){
  this.string += x_0;
}
;
_.append_1 = function append_0(data_0, x_0){
  this.string += x_0;
}
;
_.createData = function createData(){
  return null;
}
;
_.toString_0 = function toString_2(data_0){
  return this.string;
}
;
_.string = '';
function $$init_12(){
}

function $clearTimeout(timerId){
  clearTimeout0(timerId);
}

function $dispose(d){
  isNotNull(d) && null.nullMethod();
}

function $exportUnloadModule(){
}

function $isUnloadSupported(){
  return false;
}

function $setTimeout(func, time){
  return setTimeout0(func, time, null);
}

function UnloadSupport_0(){
  Object_1.call(this);
  $$init_12();
}

function clearTimeout0(timerId){
  $wnd.clearTimeout(timerId);
}

function setTimeout0(func, time, disposeable){
  var timerId = $wnd.setTimeout(function(){
    func();
    if (disposeable != null) {
      dispose(disposeable);
    }
  }
  , time);
  return timerId;
}

defineSeed(25, 1, {}, UnloadSupport_0);
function $clinit_GWT(){
  $clinit_GWT = nullMethod;
  null;
  isScript_0()?(logger = new JsLogger_0):(logger = null);
}

function isScript_0(){
  return true;
}

function log_2(){
  $clinit_GWT();
  log_3();
}

function log_3(){
  $clinit_GWT();
  isNotNull(logger) && $log();
}

var logger;
function $$init_13(){
}

function $log(){
}

function JsLogger_0(){
  Object_1.call(this);
  $$init_13();
}

defineSeed(27, 1, {}, JsLogger_0);
function $getCompatMode(this$static){
  return this$static.compatMode;
}

function get_0(){
  return nativeGet();
}

function nativeGet(){
  return $doc;
}

function $$init_14(){
}

function JSONValue_0(){
  Object_1.call(this);
  $$init_14();
}

defineSeed(31, 1, {});
function $$init_15(){
}

function $get_1(this$static, index_0){
  var v = this$static.jsArray[index_0];
  var func = ($clinit_JSONParser() , typeMap)[typeof v];
  return func?func(v):throwUnknownTypeException(typeof v);
}

function $size(this$static){
  return this$static.jsArray.length;
}

function JSONArray_0(arr){
  JSONValue_0.call(this);
  $$init_15();
  this.jsArray = arr;
}

defineSeed(30, 31, {}, JSONArray_0);
_.hashCode$ = function hashCode_1(){
  return $hashCode_0(this.jsArray);
}
;
_.toString$ = function toString_3(){
  var c, i, sb;
  sb = new StringBuffer_0;
  $append_1(sb, '[');
  for (i = 0 , c = $size(this); i < c; i++) {
    i > 0 && $append_1(sb, ',');
    $append_0(sb, $get_1(this, i));
  }
  $append_1(sb, ']');
  return $toString_0(sb);
}
;
function $clinit_JSONBoolean(){
  $clinit_JSONBoolean = nullMethod;
  FALSE = new JSONBoolean_0(false);
  TRUE = new JSONBoolean_0(true);
}

function $$init_16(){
}

function JSONBoolean_0(value_0){
  JSONValue_0.call(this);
  $$init_16();
  this.value_0 = value_0;
}

function getInstance(b){
  $clinit_JSONBoolean();
  return b?TRUE:FALSE;
}

defineSeed(32, 31, {}, JSONBoolean_0);
_.toString$ = function toString_4(){
  return toString_11(this.value_0);
}
;
_.value_0 = false;
var FALSE, TRUE;
function $$init_17(){
}

function JSONException_0(message){
  RuntimeException_1.call(this, message);
  $$init_17();
}

defineSeed(33, 7, makeCastMap([Q$Serializable, Q$Throwable]), JSONException_0);
function $clinit_JSONNull(){
  $clinit_JSONNull = nullMethod;
  instance = new JSONNull_0;
}

function $$init_18(){
}

function JSONNull_0(){
  JSONValue_0.call(this);
  $$init_18();
}

function getInstance_0(){
  $clinit_JSONNull();
  return instance;
}

defineSeed(34, 31, {}, JSONNull_0);
_.toString$ = function toString_5(){
  return 'null';
}
;
var instance;
function $$init_19(){
}

function JSONNumber_0(value_0){
  JSONValue_0.call(this);
  $$init_19();
  this.value_0 = value_0;
}

defineSeed(35, 31, {}, JSONNumber_0);
_.hashCode$ = function hashCode_2(){
  return $hashCode_1(valueOf_2(this.value_0));
}
;
_.toString$ = function toString_6(){
  return this.value_0 + '';
}
;
_.value_0 = 0;
function $$init_20(){
}

function $computeKeys(this$static){
  return $computeKeys0(this$static, initDim(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable]), Q$String, 0, 0));
}

function $computeKeys0(this$static, result){
  var jsObject = this$static.jsObject;
  var i = 0;
  for (var key in jsObject) {
    if (jsObject.hasOwnProperty(key)) {
      result[i++] = key;
    }
  }
  return result;
}

function $get_2(this$static, key){
  if (jsEquals(key, null)) {
    throw new NullPointerException_0;
  }
  return $get0(this$static, key);
}

function $get0(this$static, key){
  var jsObject = this$static.jsObject;
  var v;
  key = String(key);
  if (jsObject.hasOwnProperty(key)) {
    v = jsObject[key];
  }
  var func = ($clinit_JSONParser() , typeMap)[typeof v];
  var ret = func?func(v):throwUnknownTypeException(typeof v);
  return ret;
}

function $toString(this$static){
  var first, key, key$array, key$index, key$max, keys_0, sb;
  sb = new StringBuffer_0;
  $append_1(sb, '{');
  first = true;
  keys_0 = $computeKeys(this$static);
  for (key$array = keys_0 , key$index = 0 , key$max = key$array.length; key$index < key$max; ++key$index) {
    key = key$array[key$index];
    first?(first = false):$append_1(sb, ', ');
    $append_1(sb, escapeValue(key));
    $append_1(sb, ':');
    $append_0(sb, $get_2(this$static, key));
  }
  $append_1(sb, '}');
  return $toString_0(sb);
}

function JSONObject_0(jsValue){
  JSONValue_0.call(this);
  $$init_20();
  this.jsObject = jsValue;
}

defineSeed(36, 31, {}, JSONObject_0);
_.hashCode$ = function hashCode_3(){
  return $hashCode_0(this.jsObject);
}
;
_.toString$ = function toString_7(){
  return $toString(this);
}
;
function $clinit_JSONParser(){
  $clinit_JSONParser = nullMethod;
  typeMap = initTypeMap();
}

function createBoolean(v){
  return getInstance(v);
}

function createNumber(v){
  return new JSONNumber_0(v);
}

function createObject_0(o){
  if (!o) {
    return getInstance_0();
  }
  var v = o.valueOf?o.valueOf():o;
  if (v !== o) {
    var func = typeMap[typeof v];
    return func?func(v):throwUnknownTypeException(typeof v);
  }
   else if (o instanceof Array || o instanceof $wnd.Array) {
    return new JSONArray_0(o);
  }
   else {
    return new JSONObject_0(o);
  }
}

function createString(v){
  return new JSONString_0(v);
}

function createUndefined(){
  return null;
}

function initTypeMap(){
  return {'boolean':createBoolean, number:createNumber, string:createString, object:createObject_0, 'function':createObject_0, undefined:createUndefined};
}

function throwUnknownTypeException(typeString){
  $clinit_JSONParser();
  throw new JSONException_0("Unexpected typeof result '" + typeString + "'; please report this bug to the GWT team");
}

var typeMap;
function $$init_21(){
}

function JSONString_0(value_0){
  JSONValue_0.call(this);
  $$init_21();
  if (jsEquals(value_0, null)) {
    throw new NullPointerException_0;
  }
  this.value_0 = value_0;
}

defineSeed(38, 31, {}, JSONString_0);
_.hashCode$ = function hashCode_4(){
  return $hashCode_2(this.value_0);
}
;
_.toString$ = function toString_8(){
  return escapeValue(this.value_0);
}
;
function $$init_22(this$static){
}

function Array_0(){
  Object_1.call(this);
  $$init_22(this);
}

function createFromSeed(seedType, length_0){
  var array = new Array(length_0);
  if (seedType == 3) {
    for (var i = 0; i < length_0; ++i) {
      array[i] = {l:0, m:0, h:0};
    }
  }
   else if (seedType > 0 && seedType < 3) {
    var value_0 = seedType == 1?0:false;
    for (var i = 0; i < length_0; ++i) {
      array[i] = value_0;
    }
  }
  return array;
}

function initDim(arrayClass, castableTypeMap, queryId, length_0, seedType){
  var result;
  result = createFromSeed(seedType, length_0);
  initValues(arrayClass, castableTypeMap, queryId, result);
  return result;
}

function initValues(arrayClass, castableTypeMap, queryId, array){
  wrapArray(array);
  setClass(array, arrayClass);
  setCastableTypeMap(array, castableTypeMap);
  array.queryId$ = queryId;
  return array;
}

function set_0(array, index_0, value_0){
  return array[index_0] = value_0;
}

function setCheck(array, index_0, value_0){
  if (jsNotEquals(value_0, null)) {
    if (array.queryId$ > 0 && !canCastUnsafe(value_0, array.queryId$)) {
      throw new ArrayStoreException_0;
    }
     else if (array.queryId$ == -1 && isJavaObject(value_0)) {
      throw new ArrayStoreException_0;
    }
     else if (array.queryId$ < -1 && !isJavaScriptObject(value_0) && !canCastUnsafe(value_0, -array.queryId$)) {
      throw new ArrayStoreException_0;
    }
  }
  return set_0(array, index_0, value_0);
}

function setClass(o, clazz){
  o.___clazz$ = clazz;
}

defineSeed(39, 1, {}, Array_0);
_.queryId$ = 0;
function $clinit_Array$ExpandoWrapper(){
  $clinit_Array$ExpandoWrapper = nullMethod;
  expandoNames_0 = makeEmptyJsArray();
  expandoValues_0 = makeEmptyJsArray();
  initExpandos(new Array_0, expandoNames_0, expandoValues_0);
}

function initExpandos(protoType, expandoNames, expandoValues){
  var i = 0, value_0;
  for (var name_0 in protoType) {
    if (value_0 = protoType[name_0]) {
      expandoNames[i] = name_0;
      expandoValues[i] = value_0;
      ++i;
    }
  }
}

function makeEmptyJsArray(){
  return [];
}

function wrapArray(array){
  $clinit_Array$ExpandoWrapper();
  wrapArray_0(array, expandoNames_0, expandoValues_0);
}

function wrapArray_0(array, expandoNames, expandoValues){
  for (var i = 0, c = expandoNames.length; i < c; ++i) {
    array[expandoNames[i]] = expandoValues[i];
  }
}

var expandoNames_0, expandoValues_0;
function canCast(src_0, dstId){
  return src_0.castableTypeMap$ && !!src_0.castableTypeMap$[dstId];
}

function canCastUnsafe(src_0, dstId){
  return src_0.castableTypeMap$ && src_0.castableTypeMap$[dstId];
}

function dynamicCast(src_0, dstId){
  if (jsNotEquals(src_0, null) && !canCastUnsafe(src_0, dstId)) {
    throw new ClassCastException_0;
  }
  return src_0;
}

function dynamicCastJso(src_0){
  if (jsNotEquals(src_0, null) && isJavaObject(src_0)) {
    throw new ClassCastException_0;
  }
  return src_0;
}

function getNullMethod(){
  return nullMethod;
}

function instanceOf(src_0, dstId){
  return jsNotEquals(src_0, null) && canCast(src_0, dstId);
}

function instanceOfJso(src_0){
  return jsNotEquals(src_0, null) && isJavaScriptObject(src_0);
}

function isJavaObject(src_0){
  return isNonStringJavaObject(src_0) || isJavaString(src_0);
}

function isJavaScriptObject(src_0){
  return !isNonStringJavaObject(src_0) && !isJavaString(src_0);
}

function isJavaString(src_0){
  return canCast(src_0, 1);
}

function isNonStringJavaObject(src_0){
  return jsEquals(getTypeMarker(src_0), getNullMethod());
}

function isNotNull(src_0){
  return !!src_0;
}

function isNull(src_0){
  return !src_0;
}

function jsEquals(a, b){
  return a == b;
}

function jsNotEquals(a, b){
  return a != b;
}

function maskUndefined(src_0){
  return src_0 == null?null:src_0;
}

function narrow_char(x_0){
  return x_0 & 65535;
}

function narrow_int(x_0){
  return ~~x_0;
}

function round_int(x_0){
  return ~~Math.max(Math.min(x_0, 2147483647), -2147483648);
}

function com_google_sitespeed_pagespeed_common_client_util_OperationCancelledException_WidgetMessages(){
  if (getPermutationId() == 1) {
    return new OperationCancelledException_WidgetMessages_en_0;
  }
  return new OperationCancelledException_WidgetMessages__0;
}

function getPermutationId(){
  return permutationId;
}

var permutationId = -1;
function init(){
  isStatsAvailable() && onModuleStart('com.google.gwt.useragent.client.UserAgentAsserter');
  $onModuleLoad_0(new UserAgentAsserter_0);
  isStatsAvailable() && onModuleStart('com.google.gwt.user.client.DocumentModeAsserter');
  $onModuleLoad(new DocumentModeAsserter_0);
  isStatsAvailable() && onModuleStart('com.google.sitespeed.pagespeed.chromium.background.BackgroundPage');
  $onModuleLoad_1(new BackgroundPage_0);
}

function getCachableJavaScriptException(e){
  var jse = e.__gwt$exception;
  if (!jse) {
    jse = new JavaScriptException_0(e);
    e.__gwt$exception = jse;
  }
  return jse;
}

function unwrap(e){
  var jse;
  if (instanceOf(e, Q$JavaScriptException)) {
    jse = dynamicCast(e, Q$JavaScriptException);
    if ($isThrownSet(jse)) {
      return $getThrown(jse);
    }
  }
  return e;
}

function wrap(e){
  if (instanceOf(e, Q$Throwable)) {
    return e;
  }
  return jsEquals(e, null)?new JavaScriptException_0(null):getCachableJavaScriptException(e);
}

function isStatsAvailable(){
  return !!$stats;
}

function onModuleStart(mainClassName){
  return $stats({moduleName:$moduleName, sessionId:$sessionId, subSystem:'startup', evtGroup:'moduleStartup', millis:(new Date).getTime(), type:'onModuleLoadStart', className:mainClassName});
}

function getTypeMarker(o){
  return o.typeMarker$;
}

function setCastableTypeMap(o, castableTypeMap){
  o.castableTypeMap$ = castableTypeMap;
}

function $$init_24(){
}

function $onModuleLoad(){
  var allowedModes, currentMode, i, impl, message, severity;
  impl = new DocumentModeAsserter_DocumentModeProperty_0;
  severity = impl.getDocumentModeSeverity();
  if (jsEquals(severity, ($clinit_DocumentModeAsserter$Severity() , IGNORE))) {
    return;
  }
  currentMode = $getCompatMode(get_0());
  allowedModes = impl.getAllowedDocumentModes();
  for (i = 0; i < allowedModes.length; i++) {
    if ($equals_0(allowedModes[i], currentMode)) {
      return;
    }
  }
  allowedModes.length == 1 && $equals_0('CSS1Compat', allowedModes[0]) && $equals_0('BackCompat', currentMode)?(message = "GWT no longer supports Quirks Mode (document.compatMode=' BackCompat').<br>Make sure your application's host HTML page has a Standards Mode (document.compatMode=' CSS1Compat') doctype,<br>e.g. by using &lt;!doctype html&gt; at the start of your application's HTML page.<br><br>To continue using this unsupported rendering mode and risk layout problems, suppress this message by adding<br>the following line to your*.gwt.xml module file:<br>&nbsp;&nbsp;&lt;extend-configuration-property name=\"document.compatMode\" value=\"" + currentMode + '"/&gt;'):(message = "Your *.gwt.xml module configuration prohibits the use of the current doucment rendering mode (document.compatMode=' " + currentMode + "').<br>Modify your application's host HTML page doctype, or update your custom " + "'document.compatMode' configuration property settings.");
  if (jsEquals(severity, ($clinit_DocumentModeAsserter$Severity() , ERROR))) {
    throw new RuntimeException_1(message);
  }
  log_0();
}

function DocumentModeAsserter_0(){
  Object_1.call(this);
  $$init_24();
}

defineSeed(49, 1, {}, DocumentModeAsserter_0);
function $$init_25(){
}

function $equals(this$static, other){
  return this$static === other;
}

function $name(this$static){
  return this$static.name_0;
}

function Enum_0(name_0, ordinal){
  Object_1.call(this);
  $$init_25();
  this.name_0 = name_0;
  this , ordinal;
}

function createValueOfMap(enumConstants){
  var result, value_0, value$array, value$index, value$max;
  result = createObject();
  for (value$array = enumConstants , value$index = 0 , value$max = value$array.length; value$index < value$max; ++value$index) {
    value_0 = value$array[value$index];
    put0(result, ':' + $name(value_0), value_0);
  }
  return result;
}

function get0(map_0, name_0){
  return map_0[name_0];
}

function put0(map_0, name_0, value_0){
  map_0[name_0] = value_0;
}

function valueOf(map_0, name_0){
  var result;
  result = get0(map_0, ':' + name_0);
  if (isNotNull(result)) {
    return result;
  }
  if (jsEquals(name_0, null)) {
    throw new NullPointerException_0;
  }
  throw new IllegalArgumentException_0('Enum constant undefined: ' + name_0);
}

defineSeed(51, 1, makeCastMap([Q$Serializable, Q$Comparable, Q$Enum]));
_.hashCode$ = function hashCode_5(){
  return $hashCode(this);
}
;
_.toString$ = function toString_9(){
  return $name(this);
}
;
function $clinit_DocumentModeAsserter$Severity(){
  $clinit_DocumentModeAsserter$Severity = nullMethod;
  ERROR = new DocumentModeAsserter$Severity_0('ERROR', 0);
  IGNORE = new DocumentModeAsserter$Severity_0('IGNORE', 1);
  WARN = new DocumentModeAsserter$Severity_0('WARN', 2);
  $VALUES = initValues(_3Lcom_google_gwt_user_client_DocumentModeAsserter$Severity_2_classLit, makeCastMap([Q$Serializable]), Q$DocumentModeAsserter$Severity, [ERROR, IGNORE, WARN]);
}

function $$init_26(){
}

function DocumentModeAsserter$Severity_0(enum$name, enum$ordinal){
  Enum_0.call(this, enum$name, enum$ordinal);
  $$init_26();
}

function valueOf_0(name_0){
  $clinit_DocumentModeAsserter$Severity();
  return valueOf(($clinit_DocumentModeAsserter$Severity$Map() , $MAP), name_0);
}

function values(){
  $clinit_DocumentModeAsserter$Severity();
  return $VALUES;
}

defineSeed(50, 51, makeCastMap([Q$DocumentModeAsserter$Severity, Q$Serializable, Q$Comparable, Q$Enum]), DocumentModeAsserter$Severity_0);
var $VALUES, ERROR, IGNORE, WARN;
function $clinit_DocumentModeAsserter$Severity$Map(){
  $clinit_DocumentModeAsserter$Severity$Map = nullMethod;
  $MAP = createValueOfMap(($clinit_DocumentModeAsserter$Severity() , $VALUES));
}

var $MAP;
function $$init_27(){
}

function DocumentModeAsserter_DocumentModeProperty_0(){
  Object_1.call(this);
  $$init_27();
}

defineSeed(53, 1, {}, DocumentModeAsserter_DocumentModeProperty_0);
_.getAllowedDocumentModes = function getAllowedDocumentModes(){
  return initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable]), Q$String, ['CSS1Compat']);
}
;
_.getDocumentModeSeverity = function getDocumentModeSeverity(){
  return $clinit_DocumentModeAsserter$Severity() , WARN;
}
;
function $$init_28(){
}

function $displayMismatchWarning(runtimeValue, compileTimeValue){
  $wnd.alert('ERROR: Possible problem with your *.gwt.xml module file.' + '\nThe compile time user.agent value (' + compileTimeValue + ') does not match the runtime user.agent value (' + runtimeValue + '). Expect more errors.\n');
}

function $onModuleLoad_0(){
  var compileTimeValue, impl, runtimeValue;
  impl = new UserAgentImplSafari_0;
  compileTimeValue = impl.getCompileTimeValue();
  runtimeValue = impl.getRuntimeValue();
  $equals_0(compileTimeValue, runtimeValue) || $displayMismatchWarning(runtimeValue, compileTimeValue);
}

function UserAgentAsserter_0(){
  Object_1.call(this);
  $$init_28();
}

defineSeed(54, 1, {}, UserAgentAsserter_0);
function $$init_29(){
}

function UserAgentImplSafari_0(){
  Object_1.call(this);
  $$init_29();
}

defineSeed(55, 1, {}, UserAgentImplSafari_0);
_.getCompileTimeValue = function getCompileTimeValue(){
  return 'safari';
}
;
_.getRuntimeValue = function getRuntimeValue(){
  var ua = navigator.userAgent.toLowerCase();
  var makeVersion = function(result){
    return parseInt(result[1]) * 1000 + parseInt(result[2]);
  }
  ;
  if (function(){
    return ua.indexOf('opera') != -1;
  }
  ())
    return 'opera';
  if (function(){
    return ua.indexOf('webkit') != -1;
  }
  ())
    return 'safari';
  if (function(){
    return ua.indexOf('msie') != -1 && $doc.documentMode >= 9;
  }
  ())
    return 'ie9';
  if (function(){
    return ua.indexOf('msie') != -1 && $doc.documentMode >= 8;
  }
  ())
    return 'ie8';
  if (function(){
    return ua.indexOf('gecko') != -1;
  }
  ())
    return 'gecko1_8';
  return 'unknown';
}
;
function $$init_30(){
}

function $onModuleLoad_1(){
  exposeSaveOptimizedContentInterface();
}

function BackgroundPage_0(){
  Object_1.call(this);
  $$init_30();
}

function exposeSaveOptimizedContentInterface(){
  function save(result, callback){
    saveOptimizedContent(result, callback);
  }

  $wnd.pagespeed_bg.gwt.saveOptimizedContents = $entry(save);
}

function saveOptimizedContent(result, callback){
  var contentLocalStorage, optimizedContents;
  optimizedContents = $getOptimizedContentMap(result);
  contentLocalStorage = new StoreOptimizedContentPromise_0(optimizedContents, new NullProgressMonitor_0);
  $onCompletion(contentLocalStorage, new BackgroundPage$1_0(callback));
}

defineSeed(56, 1, {}, BackgroundPage_0);
function $$init_31(){
}

function $alwaysBefore(){
}

function $onError(this$static){
  this$static.ignoreUnhandledError || log_1();
}

function $onFailure(this$static, reason){
  try {
    $alwaysBefore();
  }
   finally {
    try {
      $onError(this$static);
    }
     finally {
      this$static.alwaysAfter();
    }
  }
}

function $withResult(){
}

function PromiseCompletion_0(){
  PromiseCompletion_1.call(this, false);
}

function PromiseCompletion_1(ignoreUnhandledError){
  Object_1.call(this);
  $$init_31();
  this.ignoreUnhandledError = ignoreUnhandledError;
}

defineSeed(58, 1, makeCastMap([Q$Callback]));
_.alwaysAfter = function alwaysAfter(){
}
;
_.onFailure = function onFailure_0(reason){
  $onFailure(this, dynamicCast(reason, Q$Throwable));
}
;
_.onSuccess = function onSuccess_0(result){
  try {
    $alwaysBefore();
  }
   finally {
    try {
      $withResult();
    }
     finally {
      this.alwaysAfter();
    }
  }
}
;
_.ignoreUnhandledError = false;
function $$init_32(){
}

function BackgroundPage$1_0(val$callback){
  this.val$callback = val$callback;
  PromiseCompletion_0.call(this);
  $$init_32();
}

defineSeed(57, 58, makeCastMap([Q$Callback]), BackgroundPage$1_0);
_.alwaysAfter = function alwaysAfter_0(){
  $run(this.val$callback);
}
;
function $run(this$static){
  this$static();
}

function $getOptimizedContentMap(this$static){
  return this$static.optimizedContent;
}

function $$init_33(this$static){
  this$static.state = ($clinit_Promise$State() , PENDING);
}

function $addListener(this$static, onValue){
  if ($equals(($clinit_Promise$State() , PENDING), this$static.state)) {
    isNull(this$static.callbacks) && (this$static.callbacks = new ArrayList_0);
    this$static.callbacks.add_1(onValue);
  }
   else 
    $equals(($clinit_Promise$State() , SUCCESS), this$static.state)?onValue.onSuccess(this$static.value_0):$equals(($clinit_Promise$State() , ERROR_0), this$static.state) && onValue.onFailure(this$static.error);
}

function $getProgressMonitor(this$static){
  return this$static.monitor;
}

function $grabCallbacks(this$static){
  var result;
  result = this$static.callbacks;
  this$static.callbacks = null;
  return result;
}

function $onCompletion(this$static, onCompletion){
  $addListener(this$static, onCompletion);
}

function $setError(this$static, error){
  var callback, callback$iterator, callbacks;
  checkState(jsEquals(this$static.state, ($clinit_Promise$State() , PENDING)));
  checkState(isNull(this$static.error));
  this$static.state = ($clinit_Promise$State() , ERROR_0);
  this$static.error = error;
  this$static.monitor.setDone();
  callbacks = $grabCallbacks(this$static);
  if (isNotNull(callbacks)) {
    for (callback$iterator = callbacks.iterator(); callback$iterator.hasNext();) {
      callback = dynamicCast(callback$iterator.next(), Q$Callback);
      callback.onFailure(error);
    }
  }
}

function $setValue(this$static, value_0){
  var callback, callback$iterator, callbacks;
  checkState(jsEquals(this$static.state, ($clinit_Promise$State() , PENDING)));
  checkState(jsEquals(this$static.value_0, null));
  this$static.state = ($clinit_Promise$State() , SUCCESS);
  this$static.value_0 = value_0;
  this$static.monitor.setDone();
  callbacks = $grabCallbacks(this$static);
  if (isNotNull(callbacks)) {
    for (callback$iterator = callbacks.iterator(); callback$iterator.hasNext();) {
      callback = dynamicCast(callback$iterator.next(), Q$Callback);
      callback.onSuccess(value_0);
    }
  }
}

function Promise_0(monitor){
  Object_1.call(this);
  $$init_33(this);
  checkNotNull(monitor);
  this.monitor = monitor;
}

defineSeed(62, 1, {});
function $$init_34(this$static){
  this$static.optimizedContents = null;
}

function $createArrayBufferBlob(buffer, mime){
  if (!Blob) {
    return null;
  }
  return new Blob([buffer], {type:mime});
}

function $createBlobBuilder(){
  if (!window.BlobBuilder && !window.WebKitBlobBuilder) {
    return null;
  }
  return new (window.BlobBuilder || window.WebKitBlobBuilder);
}

function $getFileSystem(storageSize, req){
  function onSuccess(fs){
    req.onSuccess_0(fs);
  }

  function onFailure(error){
    req.onFailure_0(error);
  }

  var requestFS = window.requestFileSystem || window.webkitRequestFileSystem;
  requestFS(window.TEMPORARY, storageSize, onSuccess, onFailure);
}

function $openFileAndWriteRecursively(this$static){
  var monitor, optimizedContent;
  monitor = $getProgressMonitor(this$static);
  if (monitor.isCancelled()) {
    $setError(this$static, new OperationCancelledException_0);
    return;
  }
  monitor.worked(1);
  if ($length(this$static.optimizedContents) == 0) {
    $setValue(this$static, null);
    return;
  }
  optimizedContent = $shift(this$static.optimizedContents);
  $getFile($getRoot(this$static.fileSystem), $getFilename(optimizedContent), new StoreOptimizedContentPromise$2_0(this$static, optimizedContent));
}

function $save(this$static, contents){
  var monitor;
  if ($empty(contents)) {
    $setValue(this$static, null);
    return;
  }
  this$static.optimizedContents = $getContents(contents);
  monitor = $getProgressMonitor(this$static);
  monitor.setTotalTicks($length(this$static.optimizedContents));
  $getFileSystem(10485760, new StoreOptimizedContentPromise$1_0(this$static));
}

function $toArrayBuffer(content_0){
  var decoded = atob(content_0);
  var size_0 = decoded.length;
  var array = new Uint8Array(size_0);
  for (var index_0 = 0; index_0 < size_0; ++index_0) {
    array[index_0] = decoded.charCodeAt(index_0);
  }
  return array.buffer;
}

function $writeFileAndCallNext(this$static, optimizedContent, file){
  var arrayBuffer;
  arrayBuffer = $toArrayBuffer($getContent(optimizedContent));
  if ($byteLength(arrayBuffer) <= 0) {
    $setURL(optimizedContent, $toURL(file, $getMimeType(optimizedContent)));
    $openFileAndWriteRecursively(this$static);
    return;
  }
  $createWriter(file, new StoreOptimizedContentPromise$3_0(this$static, optimizedContent, arrayBuffer, file));
}

function StoreOptimizedContentPromise_0(contents, monitor){
  Promise_0.call(this, monitor);
  $$init_34(this);
  $save(this, contents);
}

defineSeed(61, 62, {}, StoreOptimizedContentPromise_0);
function $$init_35(){
}

function StoreOptimizedContentPromise$1_0(this$0){
  this.this$0 = this$0;
  Object_1.call(this);
  $$init_35();
}

defineSeed(63, 1, {}, StoreOptimizedContentPromise$1_0);
_.onFailure_0 = function onFailure_1(error){
  $setError(this.this$0, new StoreOptimizedContentPromise$StoreOptimizedContentException_0('Failed to get file system while trying to save optimized contents.', error));
}
;
_.onSuccess_0 = function onSuccess_1(obj){
  this.this$0.fileSystem = $cast(obj);
  $openFileAndWriteRecursively(this.this$0);
}
;
function $$init_36(){
}

function StoreOptimizedContentPromise$2_0(this$0, val$optimizedContent){
  this.this$0 = this$0;
  this.val$optimizedContent = val$optimizedContent;
  Object_1.call(this);
  $$init_36();
}

defineSeed(64, 1, {}, StoreOptimizedContentPromise$2_0);
_.onFailure_0 = function onFailure_2(error){
  $setError(this.this$0, new StoreOptimizedContentPromise$StoreOptimizedContentException_0('Failed to open file while trying to save optimized contents.', error));
}
;
_.onSuccess_0 = function onSuccess_2(obj){
  var file;
  file = $cast(obj);
  $writeFileAndCallNext(this.this$0, this.val$optimizedContent, file);
}
;
function $$init_37(){
}

function StoreOptimizedContentPromise$3_0(this$0, val$optimizedContent, val$arrayBuffer, val$file){
  this.this$0 = this$0;
  this.val$optimizedContent = val$optimizedContent;
  this.val$arrayBuffer = val$arrayBuffer;
  this.val$file = val$file;
  Object_1.call(this);
  $$init_37();
}

defineSeed(65, 1, {}, StoreOptimizedContentPromise$3_0);
_.onFailure_0 = function onFailure_3(error){
  $setError(this.this$0, new StoreOptimizedContentPromise$StoreOptimizedContentException_0('Failed to create a writer while trying to save optimized contents.', error));
}
;
_.onSuccess_0 = function onSuccess_3(obj){
  var bb, blob, writer;
  writer = $cast(obj);
  $setCallback(writer, new StoreOptimizedContentPromise$3$1_0(this, this.val$file, this.val$optimizedContent));
  checkNotNull($getFilename(this.val$optimizedContent));
  blob = $createArrayBufferBlob(this.val$arrayBuffer, $getMimeType(this.val$optimizedContent));
  if (isNull(blob)) {
    bb = $createBlobBuilder();
    checkNotNull(bb);
    $append(bb, this.val$arrayBuffer);
    blob = $getBlob(bb, $getMimeType(this.val$optimizedContent));
  }
  checkNotNull(blob);
  $write(writer, blob);
}
;
function $$init_38(){
}

function StoreOptimizedContentPromise$3$1_0(this$1, val$file, val$optimizedContent){
  this.this$1 = this$1;
  this.val$file = val$file;
  this.val$optimizedContent = val$optimizedContent;
  Object_1.call(this);
  $$init_38();
}

defineSeed(66, 1, {}, StoreOptimizedContentPromise$3$1_0);
_.onFailure_0 = function onFailure_4(error){
  $setError(this.this$1.this$0, new StoreOptimizedContentPromise$StoreOptimizedContentException_0('Failed to write file while trying to save optimized contents.', error));
}
;
_.onSuccess_0 = function onSuccess_4(obj){
  var url;
  url = $toURL(this.val$file, $getMimeType(this.val$optimizedContent));
  $setURL(this.val$optimizedContent, url);
  $openFileAndWriteRecursively(this.this$1.this$0);
}
;
function $byteLength(this$static){
  return this$static.byteLength;
}

function $append(this$static, buffer){
  this$static.append(buffer);
}

function $getBlob(this$static, mimetype){
  return this$static.getBlob(mimetype);
}

function $getRoot(this$static){
  return this$static.root;
}

function $createWriter(this$static, callback){
  function onSuccess(writer){
    callback.onSuccess_0(writer);
  }

  function onFailure(error){
    callback.onFailure_0(error);
  }

  this$static.createWriter(onSuccess, onFailure);
}

function $toURL(this$static, mimetype){
  return this$static.toURL(mimetype);
}

function $getFile(this$static, filename, callback){
  function onSuccess(file){
    callback.onSuccess_0(file);
  }

  function onFailure(error){
    callback.onFailure_0(error);
  }

  this$static.getFile(filename, {create:true}, onSuccess, onFailure);
}

function $setCallback(this$static, callback){
  function onSuccess(){
    callback.onSuccess_0({});
  }

  function onFailure(error){
    callback.onFailure_0(error);
  }

  this$static.onwriteend = onSuccess;
  this$static.onerror = onFailure;
}

function $write(this$static, blob){
  this$static.write(blob);
}

function $$init_39(){
}

function StoreOptimizedContentPromise$StoreOptimizedContentException_0(message, error){
  Exception_1.call(this, message + ': ' + $toString(new JSONObject_0(error)));
  $$init_39();
}

defineSeed(74, 8, makeCastMap([Q$Serializable, Q$Throwable]), StoreOptimizedContentPromise$StoreOptimizedContentException_0);
function $getContent(this$static){
  return this$static.content;
}

function $getFilename(this$static){
  return this$static.filename;
}

function $getMimeType(this$static){
  return this$static.mimetype;
}

function $setURL(this$static, url){
  this$static['url'] = url;
}

function $empty(this$static){
  for (var key in this$static) {
    if (this$static.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

function $getContents(this$static){
  var contents = [];
  for (var key in this$static) {
    if (this$static.hasOwnProperty(key)) {
      contents.push(this$static[key]);
    }
  }
  return contents;
}

function $$init_40(this$static){
  this$static , false;
}

function NullProgressMonitor_0(){
  Object_1.call(this);
  $$init_40(this);
}

defineSeed(77, 1, {}, NullProgressMonitor_0);
_.isCancelled = function isCancelled(){
  return false;
}
;
_.setDone = function setDone(){
}
;
_.setTotalTicks = function setTotalTicks(totalTicks){
}
;
_.worked = function worked(ticks){
}
;
function $clinit_Promise$State(){
  $clinit_Promise$State = nullMethod;
  PENDING = new Promise$State_0('PENDING', 0);
  SUCCESS = new Promise$State_0('SUCCESS', 1);
  ERROR_0 = new Promise$State_0('ERROR', 2);
  $VALUES_0 = initValues(_3Lcom_google_sitespeed_pagespeed_common_client_promise_Promise$State_2_classLit, makeCastMap([Q$Serializable]), Q$Promise$State, [PENDING, SUCCESS, ERROR_0]);
}

function $$init_41(){
}

function Promise$State_0(enum$name, enum$ordinal){
  Enum_0.call(this, enum$name, enum$ordinal);
  $$init_41();
}

function valueOf_1(name_0){
  $clinit_Promise$State();
  return valueOf(($clinit_Promise$State$Map() , $MAP_0), name_0);
}

function values_0(){
  $clinit_Promise$State();
  return $VALUES_0;
}

defineSeed(78, 51, makeCastMap([Q$Promise$State, Q$Serializable, Q$Comparable, Q$Enum]), Promise$State_0);
var $VALUES_0, ERROR_0, PENDING, SUCCESS;
function $clinit_Promise$State$Map(){
  $clinit_Promise$State$Map = nullMethod;
  $MAP_0 = createValueOfMap(($clinit_Promise$State() , $VALUES_0));
}

var $MAP_0;
function $clinit_OperationCancelledException(){
  $clinit_OperationCancelledException = nullMethod;
  MESSAGES = dynamicCast(com_google_sitespeed_pagespeed_common_client_util_OperationCancelledException_WidgetMessages(), Q$OperationCancelledException$WidgetMessages);
}

function $$init_42(){
}

function OperationCancelledException_0(){
  $clinit_OperationCancelledException();
  Exception_1.call(this, MESSAGES.errorMessage());
  $$init_42();
}

defineSeed(80, 8, makeCastMap([Q$Serializable, Q$Throwable]), OperationCancelledException_0);
var MESSAGES;
function $$init_43(){
}

function OperationCancelledException_WidgetMessages__0(){
  Object_1.call(this);
  $$init_43();
}

defineSeed(81, 1, makeCastMap([Q$OperationCancelledException$WidgetMessages]), OperationCancelledException_WidgetMessages__0);
_.errorMessage = function errorMessage(){
  return 'Operation cancelled';
}
;
function $$init_44(){
}

function OperationCancelledException_WidgetMessages_en_0(){
  Object_1.call(this);
  $$init_44();
}

defineSeed(82, 1, makeCastMap([Q$OperationCancelledException$WidgetMessages]), OperationCancelledException_WidgetMessages_en_0);
_.errorMessage = function errorMessage_0(){
  return 'Operation cancelled';
}
;
function $$init_45(){
}

function ArrayStoreException_0(){
  RuntimeException_0.call(this);
  $$init_45();
}

defineSeed(83, 7, makeCastMap([Q$Serializable, Q$Throwable]), ArrayStoreException_0);
function $clinit_Boolean(){
  $clinit_Boolean = nullMethod;
  new Boolean_1(false);
  new Boolean_1(true);
  Z_classLit;
}

function $$init_46(){
}

function Boolean_1(value_0){
  Object_1.call(this);
  $$init_46();
  this.value_0 = value_0;
}

function toString_11(x_0){
  $clinit_Boolean();
  return valueOf_5(x_0);
}

defineSeed(84, 1, makeCastMap([Q$Serializable, Q$Comparable]), Boolean_1);
_.hashCode$ = function hashCode_6(){
  return this.value_0?1231:1237;
}
;
_.toString$ = function toString_10(){
  return this.value_0?'true':'false';
}
;
_.value_0 = false;
function $clinit_Character(){
  $clinit_Character = nullMethod;
  Ljava_lang_Character_2_classLit;
  2;
  36;
  0;
  65535;
  55296;
  57343;
  56320;
  57343;
  55296;
  56319;
  65536;
  0;
  1114111;
  16;
}

function getHighSurrogate(codePoint){
  $clinit_Character();
  return narrow_char(55296 + (~~(codePoint - 65536) >> 10 & 1023));
}

function getLowSurrogate(codePoint){
  $clinit_Character();
  return narrow_char(56320 + (codePoint - 65536 & 1023));
}

function $$init_47(){
}

function $desiredAssertionStatus(){
  return false;
}

function $getName(this$static){
  return this$static.typeName;
}

function $isInterface(this$static){
  return (this$static.modifiers & 2) != 0;
}

function $isPrimitive(this$static){
  return (this$static.modifiers & 1) != 0;
}

function Class_0(){
  Object_1.call(this);
  $$init_47();
}

function asString(number){
  return typeof number == 'number'?'S' + (number < 0?-number:number):number;
}

function createForArray(packageName, className, seedId, componentType){
  var clazz;
  clazz = new Class_0;
  setName(clazz, packageName, className, seedId != 0?-seedId:0);
  clazz.modifiers = 4;
  clazz , Ljava_lang_Object_2_classLit;
  clazz , componentType;
  return clazz;
}

function createForClass(packageName, className, seedId, superclass){
  var clazz;
  clazz = new Class_0;
  setName(clazz, packageName, className, seedId);
  clazz , superclass;
  return clazz;
}

function createForEnum(packageName, className, seedId, superclass, enumConstantsFunc, enumValueOfFunc){
  var clazz;
  clazz = new Class_0;
  setName(clazz, packageName, className, seedId);
  clazz.modifiers = isNotNull(enumConstantsFunc)?8:0;
  clazz , (clazz , superclass);
  clazz , enumConstantsFunc;
  clazz , enumValueOfFunc;
  return clazz;
}

function createForPrimitive(packageName, className, seedId){
  var clazz;
  clazz = new Class_0;
  setName(clazz, packageName, className, seedId);
  clazz.modifiers = 1;
  return clazz;
}

function getSeedFunction(clazz){
  var func = ($clinit_SeedUtil() , seedTable)[clazz.seedId];
  clazz = null;
  return func;
}

function isClassMetadataEnabled(){
  return true;
}

function isInstantiable(seedId){
  return typeof seedId == 'number' && seedId > 0;
}

function isInstantiableOrPrimitive(seedId){
  return seedId != null && seedId != 0;
}

function setClassLiteral(seedId, clazz){
  var proto;
  clazz.seedId = seedId;
  if (seedId == 2) {
    proto = String.prototype;
  }
   else {
    if (seedId > 0) {
      var seed = getSeedFunction(clazz);
      if (seed) {
        proto = seed.prototype;
      }
       else {
        seed = ($clinit_SeedUtil() , seedTable)[seedId] = function(){
        }
        ;
        seed.___clazz$ = clazz;
        return;
      }
    }
     else {
      return;
    }
  }
  proto.___clazz$ = clazz;
}

function setName(clazz, packageName, className, seedId){
  if (clazz , isClassMetadataEnabled()) {
    clazz.typeName = packageName + className;
    clazz , className;
  }
   else {
    clazz.typeName = 'Class$' + (isInstantiableOrPrimitive(seedId)?asString(seedId):'' + clazz.hashCode$());
    clazz , clazz.typeName;
  }
  isInstantiable(seedId) && setClassLiteral(seedId, clazz);
}

defineSeed(86, 1, {}, Class_0);
_.toString$ = function toString_12(){
  return ($isInterface(this)?'interface ':$isPrimitive(this)?'':'class ') + $getName(this);
}
;
_.modifiers = 0;
_.seedId = 0;
function $$init_48(){
}

function ClassCastException_0(){
  RuntimeException_0.call(this);
  $$init_48();
}

defineSeed(87, 7, makeCastMap([Q$Serializable, Q$Throwable]), ClassCastException_0);
function $$init_49(){
}

function Number_1(){
  Object_1.call(this);
  $$init_49();
}

defineSeed(89, 1, makeCastMap([Q$Serializable]));
function $clinit_Double(){
  $clinit_Double = nullMethod;
  1.7976931348623157E308;
  4.9E-324;
  2.2250738585072014E-308;
  1023;
  -1022;
  NaN;
  -Infinity;
  Infinity;
  64;
  D_classLit;
  1.3407807929942597E154;
  7.458340731200207E-155;
  1.157920892373162E77;
  8.636168555094445E-78;
  3.4028236692093846E38;
  2.9387358770557188E-39;
  1.8446744073709552E19;
  5.421010862427522E-20;
  4503599627370496;
  2.220446049250313E-16;
  4294967296;
  2.3283064365386963E-10;
  2147483648;
  1048576;
  9.5367431640625E-7;
  65536;
  1.52587890625E-5;
  256;
  0.00390625;
  16;
  0.0625;
  4;
  0.25;
  2;
  0.5;
  2.2250738585072014E-308;
  initValues(_3D_classLit, makeCastMap([Q$Serializable]), -1, [1.3407807929942597E154, 1.157920892373162E77, 3.4028236692093846E38, 1.8446744073709552E19, 4294967296, 65536, 256, 16, 4, 2]);
  initValues(_3D_classLit, makeCastMap([Q$Serializable]), -1, [7.458340731200207E-155, 8.636168555094445E-78, 2.9387358770557188E-39, 5.421010862427522E-20, 2.3283064365386963E-10, 1.52587890625E-5, 0.00390625, 0.0625, 0.25, 0.5]);
}

function $$init_50(){
}

function $hashCode_1(this$static){
  return hashCode_8(this$static.value_0);
}

function Double_0(value_0){
  Number_1.call(this);
  $$init_50();
  this.value_0 = value_0;
}

function hashCode_8(d){
  return round_int(d);
}

function toString_14(b){
  return valueOf_3(b);
}

function valueOf_2(d){
  $clinit_Double();
  return new Double_0(d);
}

defineSeed(88, 89, makeCastMap([Q$Serializable, Q$Comparable]), Double_0);
_.hashCode$ = function hashCode_7(){
  return $hashCode_1(this);
}
;
_.toString$ = function toString_13(){
  return toString_14(this.value_0);
}
;
_.value_0 = 0;
function $$init_51(){
}

function IllegalArgumentException_0(message){
  RuntimeException_1.call(this, message);
  $$init_51();
}

defineSeed(90, 7, makeCastMap([Q$Serializable, Q$Throwable]), IllegalArgumentException_0);
function $$init_52(){
}

function IllegalStateException_0(){
  RuntimeException_0.call(this);
  $$init_52();
}

defineSeed(91, 7, makeCastMap([Q$Serializable, Q$Throwable]), IllegalStateException_0);
function $$init_53(){
}

function IndexOutOfBoundsException_0(message){
  RuntimeException_1.call(this, message);
  $$init_53();
}

defineSeed(92, 7, makeCastMap([Q$Serializable, Q$Throwable]), IndexOutOfBoundsException_0);
function $clinit_Integer(){
  $clinit_Integer = nullMethod;
  2147483647;
  -2147483648;
  32;
  I_classLit;
}

function toHexString(value_0){
  $clinit_Integer();
  return toPowerOfTwoString(value_0, 4);
}

function toPowerOfTwoString(value_0, shift_0){
  var bitMask, buf, bufSize, digits, pos;
  bufSize = narrow_int(32 / shift_0);
  bitMask = (1 << shift_0) - 1;
  buf = initDim(_3C_classLit, makeCastMap([Q$Serializable]), -1, bufSize, 1);
  digits = ($clinit_Number$__Digits() , digits_0);
  pos = bufSize - 1;
  if (value_0 >= 0) {
    while (value_0 > bitMask) {
      buf[pos--] = digits[value_0 & bitMask];
      value_0 >>= shift_0;
    }
  }
   else {
    while (pos > 0) {
      buf[pos--] = digits[value_0 & bitMask];
      value_0 >>= shift_0;
    }
  }
  buf[pos] = digits[value_0 & bitMask];
  return __valueOf(buf, pos, bufSize);
}

function $$init_54(){
}

function NullPointerException_0(){
  RuntimeException_0.call(this);
  $$init_54();
}

defineSeed(94, 7, makeCastMap([Q$Serializable, Q$Throwable]), NullPointerException_0);
function $clinit_Number$__Digits(){
  $clinit_Number$__Digits = nullMethod;
  digits_0 = initValues(_3C_classLit, makeCastMap([Q$Serializable]), -1, [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122]);
}

var digits_0;
function $$init_55(){
}

function StackTraceElement_0(className, methodName, fileName, lineNumber){
  Object_1.call(this);
  $$init_55();
  this.className = className;
  this.methodName = methodName;
  this.fileName = fileName;
  this.lineNumber = lineNumber;
}

defineSeed(96, 1, makeCastMap([Q$Serializable, Q$StackTraceElement]), StackTraceElement_0);
_.toString$ = function toString_15(){
  return this.className + '.' + this.methodName + '(' + (jsNotEquals(this.fileName, null)?this.fileName:'Unknown Source') + (this.lineNumber >= 0?':' + this.lineNumber:'') + ')';
}
;
_.lineNumber = 0;
function $clinit_String(){
  $clinit_String = nullMethod;
  new String$1_0;
  'ISO-8859-1';
  'ISO-LATIN-1';
  'UTF-8';
}

function $charAt(this$static, index_0){
  return this$static.charCodeAt(index_0);
}

function $equals_0(this$static, other){
  if (!instanceOf(other, Q$String)) {
    return false;
  }
  return __equals(this$static, other);
}

function $hashCode_2(this$static){
  return getHashCode_0(this$static);
}

function $indexOf(this$static, codePoint){
  return $indexOf_0(this$static, fromCodePoint(codePoint));
}

function $indexOf_0(this$static, str){
  return this$static.indexOf(str);
}

function $indexOf_1(this$static, str, startIndex){
  return this$static.indexOf(str, startIndex);
}

function $lastIndexOf(this$static, codePoint){
  return $lastIndexOf_1(this$static, fromCodePoint(codePoint));
}

function $lastIndexOf_0(this$static, codePoint, startIndex){
  return $lastIndexOf_2(this$static, fromCodePoint(codePoint), startIndex);
}

function $lastIndexOf_1(this$static, str){
  return this$static.lastIndexOf(str);
}

function $lastIndexOf_2(this$static, str, start_0){
  return this$static.lastIndexOf(str, start_0);
}

function $length_1(this$static){
  return this$static.length;
}

function $split(this$static, regex){
  return $split_0(this$static, regex, 0);
}

function $split_0(this$static, regex, maxMatch){
  var compiled = new RegExp(regex, 'g');
  var out = [];
  var count = 0;
  var trail = this$static;
  var lastTrail = null;
  while (true) {
    var matchObj = compiled.exec(trail);
    if (matchObj == null || (trail == '' || count == maxMatch - 1 && maxMatch > 0)) {
      out[count] = trail;
      break;
    }
     else {
      out[count] = trail.substring(0, matchObj.index);
      trail = trail.substring(matchObj.index + matchObj[0].length, trail.length);
      compiled.lastIndex = 0;
      if (lastTrail == trail) {
        out[count] = trail.substring(0, 1);
        trail = trail.substring(1);
      }
      lastTrail = trail;
      count++;
    }
  }
  if (maxMatch == 0 && this$static.length > 0) {
    var lastNonEmpty = out.length;
    while (lastNonEmpty > 0 && out[lastNonEmpty - 1] == '') {
      --lastNonEmpty;
    }
    if (lastNonEmpty < out.length) {
      out.splice(lastNonEmpty, out.length - lastNonEmpty);
    }
  }
  var jr = __createArray(out.length);
  for (var i = 0; i < out.length; ++i) {
    jr[i] = out[i];
  }
  return jr;
}

function $startsWith(this$static, prefix){
  return $indexOf_0(this$static, prefix) == 0;
}

function $substring(this$static, beginIndex){
  return this$static.substr(beginIndex, this$static.length - beginIndex);
}

function $substring_0(this$static, beginIndex, endIndex){
  return this$static.substr(beginIndex, endIndex - beginIndex);
}

function $trim(this$static){
  if (this$static.length == 0 || this$static[0] > ' ' && this$static[this$static.length - 1] > ' ') {
    return this$static;
  }
  var r1 = this$static.replace(/^(\s*)/, '');
  var r2 = r1.replace(/\s*$/, '');
  return r2;
}

function __createArray(numElements){
  return initDim(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable]), Q$String, numElements, 0);
}

function __equals(me, other){
  return String(me) == other;
}

function __valueOf(x_0, start_0, end){
  $clinit_String();
  x_0 = x_0.slice(start_0, end);
  return String.fromCharCode.apply(null, x_0);
}

function fromCharCode(ch_0){
  return String.fromCharCode(ch_0);
}

function fromCodePoint(codePoint){
  var hiSurrogate, loSurrogate;
  if (codePoint >= 65536) {
    hiSurrogate = getHighSurrogate(codePoint);
    loSurrogate = getLowSurrogate(codePoint);
    return fromCharCode(hiSurrogate) + fromCharCode(loSurrogate);
  }
   else {
    return fromCharCode(narrow_char(codePoint));
  }
}

function valueOf_3(x_0){
  $clinit_String();
  return '' + x_0;
}

function valueOf_4(x_0){
  $clinit_String();
  return '' + x_0;
}

function valueOf_5(x_0){
  $clinit_String();
  return '' + x_0;
}

_ = String.prototype;
_.castableTypeMap$ = makeCastMap([Q$String, Q$Serializable, Q$CharSequence, Q$Comparable]);
_.hashCode$ = function hashCode_9(){
  return $hashCode_2(this);
}
;
_.toString$ = _.toString;
function $$init_56(){
}

function String$1_0(){
  Object_1.call(this);
  $$init_56();
}

defineSeed(97, 1, {}, String$1_0);
function $clinit_String$HashCache(){
  $clinit_String$HashCache = nullMethod;
  back_0 = createObject();
  front = createObject();
  256;
}

function compute(str){
  var hashCode, i, n, nBatch;
  hashCode = 0;
  n = $length_1(str);
  nBatch = n - 4;
  i = 0;
  while (i < nBatch) {
    hashCode = $charAt(str, i + 3) + 31 * ($charAt(str, i + 2) + 31 * ($charAt(str, i + 1) + 31 * ($charAt(str, i) + 31 * hashCode))) | 0;
    i += 4;
  }
  while (i < n) {
    hashCode = hashCode * 31 + $charAt(str, i++);
  }
  return hashCode | 0;
}

function getHashCode_0(str){
  $clinit_String$HashCache();
  var key = ':' + str;
  var result = front[key];
  if (result != null) {
    return result;
  }
  result = back_0[key];
  if (result == null) {
    result = compute(str);
  }
  increment();
  return front[key] = result;
}

function increment(){
  if (count_0 == 256) {
    back_0 = front;
    front = createObject();
    count_0 = 0;
  }
  ++count_0;
}

var back_0, count_0 = 0, front;
function $$init_57(this$static){
  this$static.impl = new StringBufferImplAppend_0;
  this$static.data_0 = this$static.impl.createData();
}

function $append_0(this$static, x_0){
  this$static.impl.append_0(this$static.data_0, x_0);
  return this$static;
}

function $append_1(this$static, x_0){
  this$static.impl.append_1(this$static.data_0, x_0);
  return this$static;
}

function $toString_0(this$static){
  return this$static.impl.toString_0(this$static.data_0);
}

function StringBuffer_0(){
  Object_1.call(this);
  $$init_57(this);
}

defineSeed(99, 1, makeCastMap([Q$CharSequence]), StringBuffer_0);
_.toString$ = function toString_16(){
  return $toString_0(this);
}
;
function $$init_58(){
}

function UnsupportedOperationException_0(message){
  RuntimeException_1.call(this, message);
  $$init_58();
}

defineSeed(100, 7, makeCastMap([Q$Serializable, Q$Throwable]), UnsupportedOperationException_0);
function $$init_59(){
}

function AbstractCollection_0(){
  Object_1.call(this);
  $$init_59();
}

defineSeed(101, 1, {});
_.toString$ = function toString_17(){
  var comma, iter, sb, value_0;
  sb = new StringBuffer_0;
  comma = null;
  $append_1(sb, '[');
  iter = this.iterator();
  while (iter.hasNext()) {
    jsNotEquals(comma, null)?$append_1(sb, comma):(comma = ', ');
    value_0 = iter.next();
    $append_1(sb, value_0 === this?'(this Collection)':valueOf_4(value_0));
  }
  $append_1(sb, ']');
  return $toString_0(sb);
}
;
function $$init_60(this$static){
  this$static , 0;
}

function $iterator(this$static){
  return new AbstractList$IteratorImpl_0(this$static);
}

function AbstractList_0(){
  AbstractCollection_0.call(this);
  $$init_60(this);
}

function checkIndex(index_0, size_0){
  (index_0 < 0 || index_0 >= size_0) && indexOutOfBounds(index_0, size_0);
}

function indexOutOfBounds(index_0, size_0){
  throw new IndexOutOfBoundsException_0('Index: ' + index_0 + ', Size: ' + size_0);
}

defineSeed(102, 101, {});
_.add_0 = function add_0(index_0, element){
  throw new UnsupportedOperationException_0('Add not supported on this list');
}
;
_.add_1 = function add_1(obj){
  this.add_0(this.size_1(), obj);
  return true;
}
;
_.hashCode$ = function hashCode_10(){
  var iter, k, obj;
  k = 1;
  31;
  iter = $iterator(this);
  while (iter.hasNext()) {
    obj = iter.next();
    k = 31 * k + (jsEquals(obj, null)?0:hashCode__devirtual$(obj));
    k = ~~k;
  }
  return k;
}
;
_.iterator = function iterator(){
  return $iterator(this);
}
;
function $$init_61(this$static){
  this$static , -1;
}

function $hasNext(this$static){
  return this$static.i < this$static.this$0.size_1();
}

function AbstractList$IteratorImpl_0(this$0){
  this.this$0 = this$0;
  Object_1.call(this);
  $$init_61(this);
}

defineSeed(103, 1, {}, AbstractList$IteratorImpl_0);
_.hasNext = function hasNext(){
  return $hasNext(this);
}
;
_.next = function next(){
  if (!$hasNext(this)) {
    throw new NoSuchElementException_0;
  }
  return this.this$0.get_0((this , this.i++));
}
;
_.i = 0;
function $$init_62(this$static){
  this$static.array = initDim(_3Ljava_lang_Object_2_classLit, makeCastMap([Q$Serializable]), Q$Object, 0, 0);
}

function $get_3(this$static, index_0){
  checkIndex(index_0, this$static.size_0);
  return this$static.array[index_0];
}

function ArrayList_0(){
  AbstractList_0.call(this);
  $$init_62(this);
}

function splice_0(array, index_0, deleteCount, value_0){
  array.splice(index_0, deleteCount, value_0);
}

defineSeed(104, 102, makeCastMap([Q$Serializable]), ArrayList_0);
_.add_0 = function add_2(index_0, o){
  (index_0 < 0 || index_0 > this.size_0) && indexOutOfBounds(index_0, this.size_0);
  splice_0(this.array, index_0, 0, o);
  ++this.size_0;
}
;
_.add_1 = function add_3(o){
  setCheck(this.array, this.size_0++, o);
  return true;
}
;
_.get_0 = function get_1(index_0){
  return $get_3(this, index_0);
}
;
_.size_1 = function size_1(){
  return this.size_0;
}
;
_.size_0 = 0;
function $$init_63(){
}

function NoSuchElementException_0(){
  RuntimeException_0.call(this);
  $$init_63();
}

defineSeed(105, 7, makeCastMap([Q$Serializable, Q$Throwable]), NoSuchElementException_0);
var $entry = registerEntry();
function gwtOnLoad(errFn, modName, modBase, softPermutationId){
  $moduleName = modName;
  $moduleBase = modBase;
  permutationId = softPermutationId;
  if (errFn)
    try {
      $entry(init)();
    }
     catch (e) {
      errFn(modName);
    }
   else {
    $entry(init)();
  }
}

var Ljava_lang_Object_2_classLit = createForClass('java.lang.', 'Object', 1, null), Lcom_google_gwt_core_client_Scheduler_2_classLit = createForClass('com.google.gwt.core.client.', 'Scheduler', 14, Ljava_lang_Object_2_classLit), Lcom_google_gwt_core_client_JavaScriptObject_2_classLit = createForClass('com.google.gwt.core.client.', 'JavaScriptObject$', 10, Ljava_lang_Object_2_classLit), I_classLit = createForPrimitive('', 'int', ' I'), _3Ljava_lang_Object_2_classLit = createForArray('[Ljava.lang.', 'Object;', 109, Ljava_lang_Object_2_classLit), Z_classLit = createForPrimitive('', 'boolean', ' Z'), Ljava_lang_Throwable_2_classLit = createForClass('java.lang.', 'Throwable', 9, Ljava_lang_Object_2_classLit), Ljava_lang_Exception_2_classLit = createForClass('java.lang.', 'Exception', 8, Ljava_lang_Throwable_2_classLit), Ljava_lang_RuntimeException_2_classLit = createForClass('java.lang.', 'RuntimeException', 7, Ljava_lang_Exception_2_classLit), Ljava_lang_StackTraceElement_2_classLit = createForClass('java.lang.', 'StackTraceElement', 96, Ljava_lang_Object_2_classLit), _3Ljava_lang_StackTraceElement_2_classLit = createForArray('[Ljava.lang.', 'StackTraceElement;', 111, Ljava_lang_StackTraceElement_2_classLit), Lcom_google_gwt_lang_SeedUtil_2_classLit = createForClass('com.google.gwt.lang.', 'SeedUtil', 46, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_DocumentModeAsserter_2_classLit = createForClass('com.google.gwt.user.client.', 'DocumentModeAsserter', 49, Ljava_lang_Object_2_classLit), Ljava_lang_Enum_2_classLit = createForClass('java.lang.', 'Enum', 51, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_DocumentModeAsserter$Severity_2_classLit = createForEnum('com.google.gwt.user.client.', 'DocumentModeAsserter$Severity', 50, Ljava_lang_Enum_2_classLit, values, valueOf_0), _3Lcom_google_gwt_user_client_DocumentModeAsserter$Severity_2_classLit = createForArray('[Lcom.google.gwt.user.client.', 'DocumentModeAsserter$Severity;', 112, Lcom_google_gwt_user_client_DocumentModeAsserter$Severity_2_classLit), Lcom_google_gwt_useragent_client_UserAgentAsserter_2_classLit = createForClass('com.google.gwt.useragent.client.', 'UserAgentAsserter', 54, Ljava_lang_Object_2_classLit), Lcom_google_sitespeed_pagespeed_chromium_background_BackgroundPage_2_classLit = createForClass('com.google.sitespeed.pagespeed.chromium.background.', 'BackgroundPage', 56, Ljava_lang_Object_2_classLit), Lcom_google_sitespeed_pagespeed_common_client_promise_PromiseCompletion_2_classLit = createForClass('com.google.sitespeed.pagespeed.common.client.promise.', 'PromiseCompletion', 58, Ljava_lang_Object_2_classLit), Lcom_google_sitespeed_pagespeed_chromium_background_BackgroundPage$1_2_classLit = createForClass('com.google.sitespeed.pagespeed.chromium.background.', 'BackgroundPage$1', 57, Lcom_google_sitespeed_pagespeed_common_client_promise_PromiseCompletion_2_classLit), Ljava_lang_Boolean_2_classLit = createForClass('java.lang.', 'Boolean', 84, Ljava_lang_Object_2_classLit), Ljava_lang_Number_2_classLit = createForClass('java.lang.', 'Number', 89, Ljava_lang_Object_2_classLit), C_classLit = createForPrimitive('', 'char', ' C'), _3C_classLit = createForArray('', '[C', 113, C_classLit), Ljava_lang_Character_2_classLit = createForClass('java.lang.', 'Character', null, Ljava_lang_Object_2_classLit), Ljava_lang_Class_2_classLit = createForClass('java.lang.', 'Class', 86, Ljava_lang_Object_2_classLit), D_classLit = createForPrimitive('', 'double', ' D'), _3D_classLit = createForArray('', '[D', 114, D_classLit), Ljava_lang_Double_2_classLit = createForClass('java.lang.', 'Double', 88, Ljava_lang_Number_2_classLit), Ljava_lang_String_2_classLit = createForClass('java.lang.', 'String', 2, Ljava_lang_Object_2_classLit), _3Ljava_lang_String_2_classLit = createForArray('[Ljava.lang.', 'String;', 110, Ljava_lang_String_2_classLit), Ljava_lang_String$1_2_classLit = createForClass('java.lang.', 'String$1', 97, Ljava_lang_Object_2_classLit), Ljava_lang_ClassCastException_2_classLit = createForClass('java.lang.', 'ClassCastException', 87, Ljava_lang_RuntimeException_2_classLit), Lcom_google_gwt_core_client_JavaScriptException_2_classLit = createForClass('com.google.gwt.core.client.', 'JavaScriptException', 6, Ljava_lang_RuntimeException_2_classLit), Lcom_google_gwt_core_client_impl_UnloadSupport_2_classLit = createForClass('com.google.gwt.core.client.impl.', 'UnloadSupport', 25, Ljava_lang_Object_2_classLit), Ljava_lang_ArrayStoreException_2_classLit = createForClass('java.lang.', 'ArrayStoreException', 83, Ljava_lang_RuntimeException_2_classLit), Lcom_google_gwt_useragent_client_UserAgentImplSafari_2_classLit = createForClass('com.google.gwt.useragent.client.', 'UserAgentImplSafari', 55, Ljava_lang_Object_2_classLit), Lcom_google_gwt_user_client_DocumentModeAsserter_1DocumentModeProperty_2_classLit = createForClass('com.google.gwt.user.client.', 'DocumentModeAsserter_DocumentModeProperty', 53, Ljava_lang_Object_2_classLit), Ljava_lang_NullPointerException_2_classLit = createForClass('java.lang.', 'NullPointerException', 94, Ljava_lang_RuntimeException_2_classLit), Ljava_lang_IllegalArgumentException_2_classLit = createForClass('java.lang.', 'IllegalArgumentException', 90, Ljava_lang_RuntimeException_2_classLit), Lcom_google_gwt_core_client_impl_StringBufferImpl_2_classLit = createForClass('com.google.gwt.core.client.impl.', 'StringBufferImpl', 23, Ljava_lang_Object_2_classLit), Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2_classLit = createForClass('com.google.gwt.core.client.impl.', 'StackTraceCreator$Collector', 19, Ljava_lang_Object_2_classLit), Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorMoz_2_classLit = createForClass('com.google.gwt.core.client.impl.', 'StackTraceCreator$CollectorMoz', 21, Lcom_google_gwt_core_client_impl_StackTraceCreator$Collector_2_classLit), Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome_2_classLit = createForClass('com.google.gwt.core.client.impl.', 'StackTraceCreator$CollectorChrome', 20, Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorMoz_2_classLit), Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorChromeNoSourceMap_2_classLit = createForClass('com.google.gwt.core.client.impl.', 'StackTraceCreator$CollectorChromeNoSourceMap', 22, Lcom_google_gwt_core_client_impl_StackTraceCreator$CollectorChrome_2_classLit), Lcom_google_gwt_core_client_impl_StringBufferImplAppend_2_classLit = createForClass('com.google.gwt.core.client.impl.', 'StringBufferImplAppend', 24, Lcom_google_gwt_core_client_impl_StringBufferImpl_2_classLit), Lcom_google_gwt_core_client_impl_SchedulerImpl_2_classLit = createForClass('com.google.gwt.core.client.impl.', 'SchedulerImpl', 16, Lcom_google_gwt_core_client_Scheduler_2_classLit), Lcom_google_gwt_core_shared_impl_JsLogger_2_classLit = createForClass('com.google.gwt.core.shared.impl.', 'JsLogger', 27, Ljava_lang_Object_2_classLit), Lcom_google_sitespeed_pagespeed_common_client_promise_Promise_2_classLit = createForClass('com.google.sitespeed.pagespeed.common.client.promise.', 'Promise', 62, Ljava_lang_Object_2_classLit), Lcom_google_sitespeed_pagespeed_chromium_background_StoreOptimizedContentPromise_2_classLit = createForClass('com.google.sitespeed.pagespeed.chromium.background.', 'StoreOptimizedContentPromise', 61, Lcom_google_sitespeed_pagespeed_common_client_promise_Promise_2_classLit), Lcom_google_sitespeed_pagespeed_chromium_background_StoreOptimizedContentPromise$StoreOptimizedContentException_2_classLit = createForClass('com.google.sitespeed.pagespeed.chromium.background.', 'StoreOptimizedContentPromise$StoreOptimizedContentException', 74, Ljava_lang_Exception_2_classLit), Lcom_google_sitespeed_pagespeed_chromium_background_StoreOptimizedContentPromise$1_2_classLit = createForClass('com.google.sitespeed.pagespeed.chromium.background.', 'StoreOptimizedContentPromise$1', 63, Ljava_lang_Object_2_classLit), Lcom_google_sitespeed_pagespeed_chromium_background_StoreOptimizedContentPromise$2_2_classLit = createForClass('com.google.sitespeed.pagespeed.chromium.background.', 'StoreOptimizedContentPromise$2', 64, Ljava_lang_Object_2_classLit), Lcom_google_sitespeed_pagespeed_chromium_background_StoreOptimizedContentPromise$3_2_classLit = createForClass('com.google.sitespeed.pagespeed.chromium.background.', 'StoreOptimizedContentPromise$3', 65, Ljava_lang_Object_2_classLit), Lcom_google_sitespeed_pagespeed_chromium_background_StoreOptimizedContentPromise$3$1_2_classLit = createForClass('com.google.sitespeed.pagespeed.chromium.background.', 'StoreOptimizedContentPromise$3$1', 66, Ljava_lang_Object_2_classLit), Lcom_google_sitespeed_pagespeed_common_client_promise_Promise$State_2_classLit = createForEnum('com.google.sitespeed.pagespeed.common.client.promise.', 'Promise$State', 78, Ljava_lang_Enum_2_classLit, values_0, valueOf_1), _3Lcom_google_sitespeed_pagespeed_common_client_promise_Promise$State_2_classLit = createForArray('[Lcom.google.sitespeed.pagespeed.common.client.promise.', 'Promise$State;', 115, Lcom_google_sitespeed_pagespeed_common_client_promise_Promise$State_2_classLit), Lcom_google_sitespeed_pagespeed_common_client_progress_NullProgressMonitor_2_classLit = createForClass('com.google.sitespeed.pagespeed.common.client.progress.', 'NullProgressMonitor', 77, Ljava_lang_Object_2_classLit), Ljava_util_AbstractCollection_2_classLit = createForClass('java.util.', 'AbstractCollection', 101, Ljava_lang_Object_2_classLit), Ljava_util_AbstractList_2_classLit = createForClass('java.util.', 'AbstractList', 102, Ljava_util_AbstractCollection_2_classLit), Ljava_util_ArrayList_2_classLit = createForClass('java.util.', 'ArrayList', 104, Ljava_util_AbstractList_2_classLit), Ljava_util_AbstractList$IteratorImpl_2_classLit = createForClass('java.util.', 'AbstractList$IteratorImpl', 103, Ljava_lang_Object_2_classLit), Ljava_lang_IllegalStateException_2_classLit = createForClass('java.lang.', 'IllegalStateException', 91, Ljava_lang_RuntimeException_2_classLit), Ljava_lang_UnsupportedOperationException_2_classLit = createForClass('java.lang.', 'UnsupportedOperationException', 100, Ljava_lang_RuntimeException_2_classLit), Ljava_lang_StringBuffer_2_classLit = createForClass('java.lang.', 'StringBuffer', 99, Ljava_lang_Object_2_classLit), Lcom_google_sitespeed_pagespeed_common_client_util_OperationCancelledException_2_classLit = createForClass('com.google.sitespeed.pagespeed.common.client.util.', 'OperationCancelledException', 80, Ljava_lang_Exception_2_classLit), Lcom_google_gwt_json_client_JSONValue_2_classLit = createForClass('com.google.gwt.json.client.', 'JSONValue', 31, Ljava_lang_Object_2_classLit), Lcom_google_gwt_json_client_JSONObject_2_classLit = createForClass('com.google.gwt.json.client.', 'JSONObject', 36, Lcom_google_gwt_json_client_JSONValue_2_classLit), Ljava_lang_IndexOutOfBoundsException_2_classLit = createForClass('java.lang.', 'IndexOutOfBoundsException', 92, Ljava_lang_RuntimeException_2_classLit), Ljava_util_NoSuchElementException_2_classLit = createForClass('java.util.', 'NoSuchElementException', 105, Ljava_lang_RuntimeException_2_classLit), Lcom_google_sitespeed_pagespeed_common_client_util_OperationCancelledException_1WidgetMessages_1en_2_classLit = createForClass('com.google.sitespeed.pagespeed.common.client.util.', 'OperationCancelledException_WidgetMessages_en', 82, Ljava_lang_Object_2_classLit), Lcom_google_sitespeed_pagespeed_common_client_util_OperationCancelledException_1WidgetMessages_1_2_classLit = createForClass('com.google.sitespeed.pagespeed.common.client.util.', 'OperationCancelledException_WidgetMessages_', 81, Ljava_lang_Object_2_classLit), Lcom_google_gwt_json_client_JSONException_2_classLit = createForClass('com.google.gwt.json.client.', 'JSONException', 33, Ljava_lang_RuntimeException_2_classLit), Lcom_google_gwt_json_client_JSONBoolean_2_classLit = createForClass('com.google.gwt.json.client.', 'JSONBoolean', 32, Lcom_google_gwt_json_client_JSONValue_2_classLit), Lcom_google_gwt_json_client_JSONNumber_2_classLit = createForClass('com.google.gwt.json.client.', 'JSONNumber', 35, Lcom_google_gwt_json_client_JSONValue_2_classLit), Lcom_google_gwt_json_client_JSONString_2_classLit = createForClass('com.google.gwt.json.client.', 'JSONString', 38, Lcom_google_gwt_json_client_JSONValue_2_classLit), Lcom_google_gwt_json_client_JSONNull_2_classLit = createForClass('com.google.gwt.json.client.', 'JSONNull', 34, Lcom_google_gwt_json_client_JSONValue_2_classLit), Lcom_google_gwt_json_client_JSONArray_2_classLit = createForClass('com.google.gwt.json.client.', 'JSONArray', 30, Lcom_google_gwt_json_client_JSONValue_2_classLit);
if (pagespeed_background) pagespeed_background.onScriptLoad(gwtOnLoad);})();