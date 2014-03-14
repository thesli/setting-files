// LICENSE_CODE ZON
'use strict'; /*jshint browser:true, es5:true*/
define(window.hola && window.hola.no_be_ver ? [] : ['be_ver'],
    function(be_ver){
var chrome = window.chrome;
var conf = chrome ? chrome.extension.getBackgroundPage().conf : window.conf;
// XXX bahaa BACKWARD: old ext defined zon_config vars in global scope
var zconf = window.zon_config||window;
var is_local = ((!chrome && !location.href.indexOf('resource://')) ||
    (chrome && conf.new_ui)) && !window.require_is_remote;
var E = {modules: {be_ver: {name: 'be_ver'}, be_config: {name: 'be_config'}}};

function extend(a, b){
    for (var prop in b)
	a[prop] = b[prop];
}

function get_paths(cdn, base_url, ver){
    var p = is_local ? {
	jquery: 'jquery.min',
	spin: 'spin.min',
	purl: 'purl',
	underscore: 'underscore.min',
	backbone: 'backbone.min',
	bootstrap: 'bootstrap',
	typeahead: 'typeahead'
    } : {
	jquery: cdn+'/jquery/1.8.2/jquery.min',
	spin: cdn+'/spin.js/1.2.7/spin.min',
	purl: cdn+'/jquery-url-parser/2.2.1/purl',
	underscore: cdn+'/underscore.js/1.4.4/underscore-min',
	backbone: cdn+'/backbone.js/1.0.0/backbone-min',
	bootstrap: cdn+'/twitter-bootstrap/2.3.2/js/bootstrap',
	typeahead: cdn+'/typeahead.js/0.9.3/typeahead.min'
    };
    if ('{{=1}}'==='1')
    {
	extend(p, {
	    be_config: base_url+'/be_config.js?ver='+ver, // can't use MD5 here
	    array: base_url+'{{MD5 /array.js}}',
	    async: base_url+'{{MD5 /async.js}}',
	    background: base_url+'{{MD5 /background.js}}',
	    be_about: base_url+'{{MD5 /be_about.js}}',
	    be_about_main: base_url+'{{MD5 /be_about_main.js}}',
	    be_auto_rule: base_url+'{{MD5 /be_auto_rule.js}}',
	    be_backbone: base_url+'{{MD5 /be_backbone.js}}',
	    be_base: base_url+'{{MD5 /be_base.js}}',
	    be_bg: base_url+'{{MD5 /be_bg.js}}',
	    be_bg_main: base_url+'{{MD5 /be_bg_main.js}}',
	    be_browser: base_url+'{{MD5 /be_browser.js}}',
	    be_ccgi: base_url+'{{MD5 /be_ccgi.js}}',
	    be_chrome: base_url+'{{MD5 /be_chrome.js}}',
	    be_experiment: base_url+'{{MD5 /be_experiment.js}}',
	    be_ext: base_url+'{{MD5 /be_ext.js}}',
	    be_features: base_url+'{{MD5 /be_features.js}}',
	    be_firefox: base_url+'{{MD5 /be_firefox.js}}',
	    be_icon: base_url+'{{MD5 /be_icon.js}}',
	    be_info: base_url+'{{MD5 /be_info.js}}',
	    be_lib: base_url+'{{MD5 /be_lib.js}}',
	    be_locale: base_url+'{{MD5 /be_locale.js}}',
	    be_main: base_url+'{{MD5 /be_main.js}}',
	    be_msg: base_url+'{{MD5 /be_msg.js}}',
	    be_plugin: base_url+'{{MD5 /be_plugin.js}}',
	    be_popup: base_url+'{{MD5 /be_popup.js}}',
	    be_popup_lib: base_url+'{{MD5 /be_popup_lib.js}}',
	    be_popup_main: base_url+'{{MD5 /be_popup_main.js}}',
	    be_premium: base_url+'{{MD5 /be_premium.js}}',
	    be_rmt: base_url+'{{MD5 /be_rmt.js}}',
	    be_rule: base_url+'{{MD5 /be_rule.js}}',
	    be_rule_rating: base_url+'{{MD5 /be_rule_rating.js}}',
	    be_slave: base_url+'{{MD5 /be_slave.js}}',
	    be_social: base_url+'{{MD5 /be_social.js}}',
	    be_tabs: base_url+'{{MD5 /be_tabs.js}}',
	    be_tab_unblocker: base_url+'{{MD5 /be_tab_unblocker.js}}',
	    be_tpopup: base_url+'{{MD5 /be_tpopup.js}}',
	    be_ui_obj: base_url+'{{MD5 /be_ui_obj.js}}',
	    be_ui_popup: base_url+'{{MD5 /be_ui_popup.js}}',
	    be_ui_vpn: base_url+'{{MD5 /be_ui_vpn.js}}',
	    be_user_nav: base_url+'{{MD5 /be_user_nav.js}}',
	    be_util: base_url+'{{MD5 /be_util.js}}',
	    be_vpn: base_url+'{{MD5 /be_vpn.js}}',
	    be_vpn_util: base_url+'{{MD5 /be_vpn_util.js}}',
	    be_zerr: base_url+'{{MD5 /be_zerr.js}}',
	    browser: base_url+'{{MD5 /browser.js}}',
	    clients_stats: base_url+'{{MD5 /clients_stats.js}}',
	    clogs_check: base_url+'{{MD5 /clogs_check.js}}',
	    country: base_url+'{{MD5 /country.js}}',
	    cs_hola: base_url+'{{MD5 /cs_hola.js}}',
	    cs_tpopup2: base_url+'{{MD5 /cs_tpopup2.js}}',
	    cs_tpopup: base_url+'{{MD5 /cs_tpopup.js}}',
	    date: base_url+'{{MD5 /date.js}}',
	    delay: base_url+'{{MD5 /delay.js}}',
	    ensure_login: base_url+'{{MD5 /ensure_login.js}}',
	    escape: base_url+'{{MD5 /escape.js}}',
	    etask: base_url+'{{MD5 /etask.js}}',
	    ga_init: base_url+'{{MD5 /ga_init.js}}',
	    ga: base_url+'{{MD5 /ga.js}}',
	    ga_proxy: base_url+'{{MD5 /ga_proxy.js}}',
	    ga_proxy_server: base_url+'{{MD5 /ga_proxy_server.js}}',
	    hash: base_url+'{{MD5 /hash.js}}',
	    jquery_wget: base_url+'{{MD5 /jquery_wget.js}}',
	    pac_engine: base_url+'{{MD5 /pac_engine.js}}',
	    pcountries: base_url+'{{MD5 /pcountries.js}}',
	    popup: base_url+'{{MD5 /popup.js}}',
	    rand: base_url+'{{MD5 /rand.js}}',
	    rate_limit: base_url+'{{MD5 /rate_limit.js}}',
	    sample: base_url+'{{MD5 /sample.js}}',
	    search: base_url+'{{MD5 /search.js}}',
	    sharing: base_url+'{{MD5 /sharing.js}}',
	    sprintf: base_url+'{{MD5 /sprintf.js}}',
	    stats: base_url+'{{MD5 /stats.js}}',
	    string: base_url+'{{MD5 /string.js}}',
	    svc_util: base_url+'{{MD5 /svc_util.js}}',
	    url: base_url+'{{MD5 /url.js}}',
	    user_agent: base_url+'{{MD5 /user_agent.js}}',
	    version_util: base_url+'{{MD5 /version_util.js}}',
	    wbm_flags: base_url+'{{MD5 /wbm_flags.js}}',
	    zon_config: base_url+'{{MD5 /zon_config.js}}',
	    zquery: base_url+'{{MD5 /zquery.js}}',
	    'locale/be_af': base_url+'{{MD5 /locale/be_af.js}}',
	    'locale/be_ar': base_url+'{{MD5 /locale/be_ar.js}}',
	    'locale/be_az': base_url+'{{MD5 /locale/be_az.js}}',
	    'locale/be_be': base_url+'{{MD5 /locale/be_be.js}}',
	    'locale/be_bg': base_url+'{{MD5 /locale/be_bg.js}}',
	    'locale/be_bn': base_url+'{{MD5 /locale/be_bn.js}}',
	    'locale/be_bs': base_url+'{{MD5 /locale/be_bs.js}}',
	    'locale/be_ca': base_url+'{{MD5 /locale/be_ca.js}}',
	    'locale/be_cs': base_url+'{{MD5 /locale/be_cs.js}}',
	    'locale/be_cy': base_url+'{{MD5 /locale/be_cy.js}}',
	    'locale/be_da': base_url+'{{MD5 /locale/be_da.js}}',
	    'locale/be_de': base_url+'{{MD5 /locale/be_de.js}}',
	    'locale/be_el': base_url+'{{MD5 /locale/be_el.js}}',
	    'locale/be_en': base_url+'{{MD5 /locale/be_en.js}}',
	    'locale/be_es': base_url+'{{MD5 /locale/be_es.js}}',
	    'locale/be_et': base_url+'{{MD5 /locale/be_et.js}}',
	    'locale/be_eu': base_url+'{{MD5 /locale/be_eu.js}}',
	    'locale/be_fa': base_url+'{{MD5 /locale/be_fa.js}}',
	    'locale/be_fi': base_url+'{{MD5 /locale/be_fi.js}}',
	    'locale/be_fr': base_url+'{{MD5 /locale/be_fr.js}}',
	    'locale/be_ga': base_url+'{{MD5 /locale/be_ga.js}}',
	    'locale/be_gl': base_url+'{{MD5 /locale/be_gl.js}}',
	    'locale/be_gu': base_url+'{{MD5 /locale/be_gu.js}}',
	    'locale/be_he': base_url+'{{MD5 /locale/be_he.js}}',
	    'locale/be_hi': base_url+'{{MD5 /locale/be_hi.js}}',
	    'locale/be_hr': base_url+'{{MD5 /locale/be_hr.js}}',
	    'locale/be_ht': base_url+'{{MD5 /locale/be_ht.js}}',
	    'locale/be_hu': base_url+'{{MD5 /locale/be_hu.js}}',
	    'locale/be_hy': base_url+'{{MD5 /locale/be_hy.js}}',
	    'locale/be_id': base_url+'{{MD5 /locale/be_id.js}}',
	    'locale/be_is': base_url+'{{MD5 /locale/be_is.js}}',
	    'locale/be_it': base_url+'{{MD5 /locale/be_it.js}}',
	    'locale/be_ja': base_url+'{{MD5 /locale/be_ja.js}}',
	    'locale/be_ka': base_url+'{{MD5 /locale/be_ka.js}}',
	    'locale/be_km': base_url+'{{MD5 /locale/be_km.js}}',
	    'locale/be_kn': base_url+'{{MD5 /locale/be_kn.js}}',
	    'locale/be_ko': base_url+'{{MD5 /locale/be_ko.js}}',
	    'locale/be_lt': base_url+'{{MD5 /locale/be_lt.js}}',
	    'locale/be_lv': base_url+'{{MD5 /locale/be_lv.js}}',
	    'locale/be_mk': base_url+'{{MD5 /locale/be_mk.js}}',
	    'locale/be_mr': base_url+'{{MD5 /locale/be_mr.js}}',
	    'locale/be_ms': base_url+'{{MD5 /locale/be_ms.js}}',
	    'locale/be_mt': base_url+'{{MD5 /locale/be_mt.js}}',
	    'locale/be_nl': base_url+'{{MD5 /locale/be_nl.js}}',
	    'locale/be_no': base_url+'{{MD5 /locale/be_no.js}}',
	    'locale/be_pl': base_url+'{{MD5 /locale/be_pl.js}}',
	    'locale/be_pt_BR': base_url+'{{MD5 /locale/be_pt_BR.js}}',
	    'locale/be_pt': base_url+'{{MD5 /locale/be_pt.js}}',
	    'locale/be_ro': base_url+'{{MD5 /locale/be_ro.js}}',
	    'locale/be_ru': base_url+'{{MD5 /locale/be_ru.js}}',
	    'locale/be_sk': base_url+'{{MD5 /locale/be_sk.js}}',
	    'locale/be_sl': base_url+'{{MD5 /locale/be_sl.js}}',
	    'locale/be_sq': base_url+'{{MD5 /locale/be_sq.js}}',
	    'locale/be_sr': base_url+'{{MD5 /locale/be_sr.js}}',
	    'locale/be_sv': base_url+'{{MD5 /locale/be_sv.js}}',
	    'locale/be_sw': base_url+'{{MD5 /locale/be_sw.js}}',
	    'locale/be_ta': base_url+'{{MD5 /locale/be_ta.js}}',
	    'locale/be_te': base_url+'{{MD5 /locale/be_te.js}}',
	    'locale/be_th': base_url+'{{MD5 /locale/be_th.js}}',
	    'locale/be_tl': base_url+'{{MD5 /locale/be_tl.js}}',
	    'locale/be_tr': base_url+'{{MD5 /locale/be_tr.js}}',
	    'locale/be_uk': base_url+'{{MD5 /locale/be_uk.js}}',
	    'locale/be_ur': base_url+'{{MD5 /locale/be_ur.js}}',
	    'locale/be_vi': base_url+'{{MD5 /locale/be_vi.js}}',
	    'locale/be_zh_CN': base_url+'{{MD5 /locale/be_zh_CN.js}}',
	    'locale/be_zh_TW': base_url+'{{MD5 /locale/be_zh_TW.js}}',
	});
    }
    return p;
}

E.init = function(ver, country){
    if (E.inited)
        return console.error('be_config already inited');
    E.inited = true;
    require.onError = require_on_error;
    require.onResourceLoad = function(context, map, depArray){
        if (E.modules[map.name] &&
	    ['be_ver', 'be_config'].indexOf(map.name)==-1)
        {
            console.error('module %s already loaded. id: %s, url: %s',
                map.name, map.id, map.url);
        }
        E.modules[map.name] = map;
    };
    E.ver = ver;
    var cdn_prefix = 'https://cdnjs.cloudflare.com/ajax/libs';
    if (country=='CN')
	cdn_prefix = 'https://d3vxrebhmlc47q.cloudfront.net/ajax/libs';
    var base_url = zconf._RELEASE ? conf.url_bext_cdn4||conf.url_bext :
        conf.url_bext;
    E.config = {
        ver: ver,
	country: country,
	baseUrl: is_local ? '' : base_url,
	urlArgs: is_local ? 'ver='+ver : '',
	waitSeconds: 20,
	paths: get_paths(cdn_prefix, base_url, ver),
	shim: {
	    purl: {deps: ['jquery']},
	    jquery: {exports: '$'},
	    underscore: {exports: '_'},
	    backbone: {deps: ['jquery', 'underscore'], exports: 'Backbone'},
	    bootstrap: {deps: ['jquery']},
	    typeahead: {deps: ['jquery']},
	}
    };
    require.config(E.config);
};

E.no_undef = ['jquery', 'purl', 'spin', 'underscore', 'backbone', 'when',
    'conf', 'zon_config', 'be_bg_main', 'be_popup_main', 'bootstrap',
    'be_main', 'be_plugin'];
E.undef = function(){
    for (var m in E.modules)
    {
	var name = E.modules[m].name;
	if (E.no_undef.indexOf(name)!=-1)
	    continue;
	require.undef(name);
	delete E.modules[m];
    }
};

function perr(opt)
{
    if (window.be_bg_main && window.be_bg_main.err)
	return window.be_bg_main.err(opt.id, opt.info);
    if (window.be_popup_main && window.be_popup_main.be_popup_lib)
	return window.be_popup_main.be_popup_lib.perr_err(opt);
    window.hola.base.perr(opt);
}

function require_on_error(err){
    var i, modules = err.requireModules;
    require_on_error.err = require_on_error.err||{};
    if (window.hola)
    {
	window.hola.err = window.hola.err||{};
	window.hola.err.require=(window.hola.err.require||0)+1;
    }
    if (!modules)
    {
	console.error('require fatal error '+err.stack);
	if (window.hola && window.hola.base)
	    perr({id: 'be_require_err', info: ''+err});
	throw err;
    }
    for (i=0; i<modules.length; i++)
	require.undef(modules[i]);
    for (i=0; i<modules.length; i++)
    {
	var m = modules[i];
	if (require_on_error.err[m])
	{
	    console.error('require fatal error, module '+m+'\n'+err.stack);
	    if (window.hola && window.hola.base)
		perr({id: 'be_require_err', info: m});
	    throw err;
	}
	console.error('require module '+m+' failed retry in 2 sec');
	require_on_error.err[m] = {failed: 1};
	setTimeout(function(){ require([m], function(){}); }, 2000);
    }
}

if (be_ver)
    E.init(be_ver.ver);

return E; });
