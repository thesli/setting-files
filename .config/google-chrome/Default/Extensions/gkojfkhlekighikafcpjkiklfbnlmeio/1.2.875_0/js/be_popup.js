'use strict'; /*jshint browser:true, es5:true*/
define(function(){
var chrome = window.chrome;
var E = {ui: {}};

/* XXX arik: copy from be_msg */
var firefox_bg_to_addon = function(src, dst){
    return {
	add_listener: function(cb){ src.addEventListener('message', cb); },
	remove_listener: function(cb){
	    src.removeEventListener('message', cb); },
	send: function(data){ dst.postMessage({target: 'addon',
            data: JSON.stringify(data)}, '*'); },
	get_data: function(e){
            return e.data && e.data.data && JSON.parse(e.data.data); },
	is_valid: function(e){
            return e && e.data && e.data.target!=='addon'; },
    };
};

var m_firefox;
function firefox_on_msg(e)
{
    if (!m_firefox.is_valid(e))
	return;
    var data = m_firefox.get_data(e);
    switch (data.cmd)
    {
    case 'init':
	window.conf = data.conf;
	window.zon_config = data.zon_config;
	window.is_popup = true; /* XXX arik: review */
	console.log('firefox popup init, got conf');
	popup_main_init();
        break;
    }
}

function popup_main_init()
{
    require(['be_config', 'be_ver', 'ga_init'], function(be_config, be_ver){
	be_config.init(be_ver.ver, '');
	require(['be_popup_main'], function(be_popup_main){
	    be_popup_main.init();
	    window.be_popup_main = be_popup_main;
	});
    });
}

E.init = function(){
    window.hola = window.hola||{};
    window.hola.t = {l_start: Date.now()};
    /* XXX arik BACKWARD: <1.1.895 old extensions required be_ver in
     * be_config */
    window.hola.no_be_ver = true;
    require.onError = function(err){
	console.error('require_err '+err.message+' '+
	    JSON.stringify(err.requireModules)+' '+err);
	throw err;
    };
    if (chrome)
    {
	require(['conf', 'zon_config'], function(conf, zon_config){
	    /* XXX arik: try to avoid using globals */
	    window.conf = conf;
	    window.zon_config = zon_config;
	    popup_main_init();
	});
	return;
    }
    console.log('firefox popup init');
    m_firefox = firefox_bg_to_addon(top, top);
    m_firefox.add_listener(firefox_on_msg);
    m_firefox.send({msg: 'init'});
};

E.init();

return E; });
