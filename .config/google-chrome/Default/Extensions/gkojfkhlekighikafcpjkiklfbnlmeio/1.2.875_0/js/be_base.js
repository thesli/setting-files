// LICENSE_CODE ZON
'use strict'; /*jshint browser:true, es5:true*/
(function(){
var chrome = window.chrome;
var hola = window.hola = window.hola||{};
var E = hola.base = {};

E.get_conf = function get_conf(){
    return chrome ? chrome.extension.getBackgroundPage().conf : window.conf;
};

var uri_comp = function(s){
    return encodeURIComponent(s).replace(/%20/g, '+'); };

var qs = function(param, opt){
    var uri = '';
    if (!param)
        return uri;
    opt = opt||{};
    var _uri_comp = opt.space_plus ? uri_comp : encodeURIComponent;
    for (var i in param)
    {
	var val = param[i];
	if (val===null || val===undefined)
	    continue;
        uri += (!uri ? '' : '&')+_uri_comp(i)+'='+_uri_comp(val);
    }
    return uri;
};

E.raw_perr = function raw_perr(opt){
    var conf = E.get_conf();
    var url = (conf ? conf.url_ccgi : 'https://client.hola.org/client_cgi')+
	'/perr';
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url+'?'+E.to_qs(opt, {space_plus: true}));
    xhr.send(null);
};

E.perr = function perr(opt){
    var conf = E.get_conf();
    var build = E.build_info();
    /* XXX arik: better to do deep copy of opt before changing it */
    try { opt.uuid = opt.uuid||localStorage.uuid; }
    catch(err){ console.error('perr failed '+err.stack); }
    opt.rmt_ver = build.server_version;
    opt.ver = build.version;
    opt.browser = opt.browser||E.browser();
    opt.build = opt.build||E.build();
    return E.raw_perr(opt);
};

/* XXX arik: sync be_base.js <-> be_util.js (need to rm code duplication) */
E.browser = function(){
    var conf = E.get_conf();
    return conf.browser.firefox ? 'firefox' :
	conf.browser.torch ? 'torch' : 'chrome';
};

/* XXX arik: sync be_base.js <-> be_util.js (need to rm code duplication) */
E.build_info = function(){
    var rmt, ext, $ = window.$;
    var conf = E.get_conf();
    var zconf = window.zon_config;
    if (window.RMT)
	rmt = window.RMT;
    else if (window.ui_popup)
	rmt = window.ui_popup.R;
    ext = rmt && rmt.be_ext;
    var info = {version: zconf.ZON_VERSION};
    if (rmt)
    {
	info.server_version = rmt.get('ver')+
	    (!rmt.get('inited') ? ' Not initialized' : '');
    }
    if (ext && ext.get('exe.is_svc'))
        info.svc_version = ext.get('svc.version');
    info.makeflags = zconf.CONFIG_MAKEFLAGS;
    if (chrome)
	info.product_type = conf.type;
    info.id = chrome ? chrome.runtime&&chrome.runtime.id :
        'jid1-4P0kohSJxU1qGg@jetpack';
    if ($)
	info.browser = E.browser()+' '+$.browser.version;
    info.platform = navigator.platform;
    info.user_agent = navigator.userAgent;
    return info;
};

/* XXX arik: sync be_base.js <-> be_util.js (need to rm code duplication) */
E.build = function(){
    var info = E.build_info(), s = '';
    for (var f in info)
	s += (s ? '\n' : '')+f+': '+info[f];
    return s;
};

})();
