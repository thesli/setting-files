/* LICENSE_CODE ZON */
'use strict'; /*jshint browser:true, es5:true*/
define(window.hola && window.hola.no_be_ver ? [] : ['be_ver'],
    function(be_ver){
var chrome = window.chrome;
var conf = chrome ? chrome.extension.getBackgroundPage().conf : window.conf;
var is_local = ((!chrome && !location.href.indexOf('resource://')) ||
    (chrome && conf.new_ui)) && !window.require_is_remote;
var E = {modules: {be_ver: {name: 'be_ver'}, be_config: {name: 'be_config'}}};
var base_url = chrome ? chrome.runtime.getURL('').slice(0, -1) :
    conf.be_base_url||'';

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
    E.config = {
        ver: ver,
	country: country,
	baseUrl: is_local ? '' : conf.url_bext,
	urlArgs: 'ver='+ver,
	waitSeconds: 20,
	paths: {
	    jquery: is_local ? 'jquery.min' :
		cdn_prefix+'/jquery/1.8.2/jquery.min',
	    spin: is_local ? 'spin.min' :
		cdn_prefix+'/spin.js/1.2.7/spin.min',
	    purl: is_local ? 'purl' :
		cdn_prefix +'/jquery-url-parser/2.2.1/purl',
	    underscore: is_local ? 'underscore.min' :
		cdn_prefix+'/underscore.js/1.4.4/underscore-min',
	    backbone: is_local ? 'backbone.min' :
		cdn_prefix+'/backbone.js/1.0.0/backbone-min',
	    bootstrap: is_local ? 'bootstrap' :
		cdn_prefix+'/twitter-bootstrap/2.3.2/js/bootstrap',
	}, shim: {
	    purl: {deps: ['jquery']},
	    jquery: {exports: '$'},
	    underscore: {exports: '_'},
	    backbone: {deps: ['jquery', 'underscore'], exports: 'Backbone'},
	    bootstrap: {deps: ['jquery']},
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
