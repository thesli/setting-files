var b=!0,e=null,h=!1;var l=l||{};window.crx=l;l.i18n=l.i18n||{};l.i18n.s=function(a){a=a||{};for(var c=document.querySelectorAll("[i18n-content]"),d,f=0;d=c[f];f++){var k=d.getAttribute("i18n-content");if(k)var g=chrome.i18n.getMessage.apply(e,[k].concat(a[k]||[]));g&&(d.innerHTML=g)}};l.i18n.m=function(a){l.i18n.s(a);document.dir=chrome.i18n.getMessage("@@bidi_dir")};l.i18n=l.i18n;l.i18n.translateDom=l.i18n.s;l.i18n.updateDom=l.i18n.m;var n=n||{};var p=p||{};p.global=this;p.da=function(a,c){p.h(a,c)};p.g=b;p.Y="en";p.O=b;p.wa=function(a){p.h(a)};p.Aa=function(a){if(!p.g)throw a=a||"",Error("Importing test-only code into non-debug environment"+a?": "+a:".");};p.h=function(a,c,d){a=a.split(".");d=d||p.global;!(a[0]in d)&&d.execScript&&d.execScript("var "+a[0]);for(var f;a.length&&(f=a.shift());)!a.length&&p.Q(c)?d[f]=c:d=d[f]?d[f]:d[f]={}};p.ka=function(a){a=a.split(".");for(var c=p.global,d;d=a.shift();)if(p.R(c[d]))c=c[d];else return e;return c};
p.ma=function(a,c){var d=c||p.global,f;for(f in a)d[f]=a[f]};p.$=function(){};p.Ba=h;p.X=b;p.ya=function(){};p.ca="";p.va=function(){};p.na=function(a){return a};p.Z=function(){throw Error("unimplemented abstract method");};p.aa=function(a){a.W=function(){if(a.n)return a.n;p.g&&(p.o[p.o.length]=a);return a.n=new a}};p.o=[];
p.c=function(a){var c=typeof a;if("object"==c)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return c;var d=Object.prototype.toString.call(a);if("[object Window]"==d)return"object";if("[object Array]"==d||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==d||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==c&&"undefined"==typeof a.call)return"object";return c};p.Q=function(a){return void 0!==a};p.sa=function(a){return a===e};p.R=function(a){return a!=e};p.isArray=function(a){return"array"==p.c(a)};p.oa=function(a){var c=p.c(a);return"array"==c||"object"==c&&"number"==typeof a.length};p.qa=function(a){return p.S(a)&&"function"==typeof a.getFullYear};p.ua=function(a){return"string"==typeof a};p.pa=function(a){return"boolean"==typeof a};p.ta=function(a){return"number"==typeof a};
p.ra=function(a){return"function"==p.c(a)};p.S=function(a){var c=typeof a;return"object"==c&&a!=e||"function"==c};p.P=function(a){return a[p.e]||(a[p.e]=++p.J)};p.V=function(a){"removeAttribute"in a&&a.removeAttribute(p.e);try{delete a[p.e]}catch(c){}};p.e="closure_uid_"+(1E9*Math.random()>>>0);p.J=0;p.ha=p.P;p.xa=p.V;p.I=function(a){var c=p.c(a);if("object"==c||"array"==c){if(a.H)return a.H();var c="array"==c?[]:{},d;for(d in a)c[d]=p.I(a[d]);return c}return a};
p.M=function(a,c,d){return a.call.apply(a.bind,arguments)};p.L=function(a,c,d){if(!a)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var d=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(d,f);return a.apply(c,d)}}return function(){return a.apply(c,arguments)}};p.bind=function(a,c,d){p.bind=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?p.M:p.L;return p.bind.apply(e,arguments)};
p.U=function(a,c){var d=Array.prototype.slice.call(arguments,1);return function(){var c=Array.prototype.slice.call(arguments);c.unshift.apply(c,d);return a.apply(this,c)}};p.r=function(a,c){for(var d in c)a[d]=c[d]};p.now=p.O&&Date.now||function(){return+new Date};
p.la=function(a){if(p.global.execScript)p.global.execScript(a,"JavaScript");else if(p.global.eval)if(p.f==e&&(p.global.eval("var _et_ = 1;"),"undefined"!=typeof p.global._et_?(delete p.global._et_,p.f=b):p.f=h),p.f)p.global.eval(a);else{var c=p.global.document,d=c.createElement("script");d.type="text/javascript";d.defer=h;d.appendChild(c.createTextNode(a));c.body.appendChild(d);c.body.removeChild(d)}else throw Error("goog.globalEval not available");};p.f=e;
p.ga=function(a,c){var d=function(a){return p.p[a]||a},f=function(a){a=a.split("-");for(var c=[],f=0;f<a.length;f++)c.push(d(a[f]));return c.join("-")},f=p.p?"BY_WHOLE"==p.K?d:f:function(a){return a};return c?a+"-"+f(c):f(a)};p.za=function(a,c){p.p=a;p.K=c};p.ia=function(a,c){var d=c||{},f;for(f in d){var k=(""+d[f]).replace(/\$/g,"$$$$");a=a.replace(RegExp("\\{\\$"+f+"\\}","gi"),k)}return a};p.ja=function(a){return a};p.fa=function(a,c,d){p.h(a,c,d)};p.ea=function(a,c,d){a[c]=d};
p.q=function(a,c){function d(){}d.prototype=c.prototype;a.d=c.prototype;a.prototype=new d;a.prototype.constructor=a};
p.ba=function(a,c,d){var f=arguments.callee.caller;if(p.g&&!f)throw Error("arguments.caller not defined.  goog.base() expects not to be running in strict mode. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");if(f.d)return f.d.constructor.apply(a,Array.prototype.slice.call(arguments,1));for(var k=Array.prototype.slice.call(arguments,2),g=h,m=a.constructor;m;m=m.d&&m.d.constructor)if(m.prototype[c]===f)g=b;else if(g)return m.prototype[c].apply(a,k);if(a[c]===f)return a.constructor.prototype[c].apply(a,
k);throw Error("goog.base called from a method of one name to a method of a different name");};p.scope=function(a){a.call(p.global)};p.N=b;
p.N&&(Function.prototype.bind=Function.prototype.bind||function(a,c){if(1<arguments.length){var d=Array.prototype.slice.call(arguments,1);d.unshift(this,a);return p.bind.apply(e,d)}return p.bind(this,a)},Function.prototype.U=function(a){var c=Array.prototype.slice.call(arguments);c.unshift(this,e);return p.bind.apply(e,c)},Function.prototype.q=function(a){p.q(this,a)},Function.prototype.r=function(a){p.r(this.prototype,a)});n.a=n.a||{};n.a.u=750;n.a.t=7E3;n.a.close=function(){window.open("","_self","");window.close()};n.a.k=function(a){chrome.tabs.create({url:a});n.a.close()};n.a.A=function(){var a=document.getElementById("loading");document.getElementById("message").style.display="none";a.className="displayed";a.style.display="inline-block"};n.a.B=function(a){a.innerText=a.innerText};
n.a.toggle=function(a,c,d){var f=setTimeout(n.a.A,n.a.u),k=setTimeout(n.a.w,n.a.t),g=h;chrome.extension.onRequest.addListener(function(a){if(a.preloadSharebox&&(a=a.preloadSharebox,("off"==a.state||"dis"==a.state)&&!g)){var c=document.getElementById("gadgetContainer");c&&(c.className="sharebox-prefetching");n.a.i(a.url);g=b}});chrome.extension.sendRequest({toggle:"current",uri:a,tab:c,user:d},function(a){clearTimeout(f);clearTimeout(k);var c=e,d=document.getElementById("message"),q=document.getElementById("gadgetContainer"),
s=document.getElementById("loading"),r=document.getElementById("container");a.action&&"add"==a.action?(c=n.a.j(a,"add_plusone_success"),r.className="",q.className="",g||(n.a.i(a.url),g=b),d&&(d.className="message-suppress")):a.action&&"remove"==a.action?(c=n.a.j(a,"remove_plusone_success"),r.className="remove"):a.action&&"signup"==a.action?c=n.a.v():(c=n.a.b(a),r.className="error",q.className="sharebox-error");!a.action||"add"!=a.action?(d.innerHTML="",d.appendChild(c),d.style.display="inline-block"):
(d.style.display="none",q.style.display="inline-block");s.style.display="none"})};
n.a.D=function(){document.getElementById("close_x").addEventListener("click",n.a.close,h);chrome.extension.sendRequest({query:"toggle"},function(a){if(a.uri&&a.tab&&a.user)n.a.toggle(a.uri,a.tab,a.user);else{var c=document.getElementById("container"),d=document.getElementById("gadgetContainer"),f=document.getElementById("message"),k=document.getElementById("loading");a.action&&"signin"==a.action?a=n.a.C():(a=n.a.b(a),c.className="error",d.className="sharebox-error");f.innerHTML="";f.appendChild(a);
f.style.display="inline-block";k.style.display="none"}})};n.a.F=function(){return"https://support.google.com/plus/bin/answer.py?hl="+chrome.i18n.getMessage("@@ui_locale")+"&p=plusone_button_error&answer=1199142"};
n.a.b=function(a){console.error(a);var c=document.createElement("a");c.href="#";c.addEventListener("click",function(){n.a.k(n.a.F())},h);var d=document.createElement("p");d.className="error";d.appendChild(c);c.textContent=a.error&&"invalidEntity"==a.error.code?chrome.i18n.getMessage("cannot_plusone_message"):a.error&&a.error.message?a.error.message:chrome.i18n.getMessage("error_message");return d};
n.a.C=function(){var a=document.createElement("p");a.className="info";a.textContent=chrome.i18n.getMessage("sign_in_message");return a};n.a.v=function(){var a=document.createElement("p");a.className="info";a.textContent=chrome.i18n.getMessage("sign_up_message");return a};
n.a.j=function(a,c){var d=document.createElement("p");d.className="success";if(a.entity&&a.user){var f=chrome.extension.getBackgroundPage().plusone.button.PROFILE_URI,k=a.user.display_name+" <"+a.user.email+">",g=document.createElement("span");g.innerHTML=chrome.i18n.getMessage(c);if(0<g.getElementsByTagName("a").length){var m=g.getElementsByTagName("a")[0];m.className="user-link";m.title=k;m.href="#";m.addEventListener("click",function(){n.a.k(f)},h)}d.appendChild(g)}else if(a.entity)g=document.createElement("span"),
g.innerHTML=chrome.i18n.getMessage(c),n.a.B(g),d.appendChild(g);else return n.a.b(a);return d};n.a.w=function(){var a=n.a.b({error:{code:"invalidEntity"}}),c=document.getElementById("message"),d=document.getElementById("loading"),f=document.getElementById("container");c.innerHTML="";c.appendChild(a);c.style.display="inline-block";d.style.display="none";f.className="error"};n.a.G=function(){n.a.close()};n.a.l=function(){n.a.close()};
n.a.i=function(a){var c=chrome.extension.getBackgroundPage().plusone.button.GADGET_CONFIRM_URI,d=document.getElementById("gadgetContainer");d&&(iframes.setHandler("plusoneSharebox",{onOpen:function(a){d.style.minWidth="400px";return a.openInto(d)},onReady:function(){},onClose:function(){n.a.l()},onResize:function(a){a.getIframeEl().height=a.height}}),a={url:a,hl:chrome.i18n.getMessage("@@ui_locale"),source:"poext",inlineRecipientSuggestions:"true"},iframes.open(c,{style:"plusoneSharebox",container:"gadgetContainer",
id:"sharebox",inline:b},a,{onShare:n.a.G},n.a.l))};n.a.T=function(){document.addEventListener("DOMContentLoaded",l.i18n.m,h);document.addEventListener("DOMContentLoaded",n.a.D,h)};n.a.T();
