'use strict'; /*jshint browser:true, es5:true*/
(function(){
var chrome = window.chrome, install_details;

on_load();
function on_load()
{
    /* XXX arik/bahaa: need unregister and unite with similar firefox code */
    if (!chrome)
	return;
    /* XXX arik: mv to remote and do it only for extensions. svc/plugin don't
     * need it */
    /* proxy is password protected to make it harder for port scanners.
     * this code must run asap, otherwise user may get password popup */
    chrome.webRequest.onAuthRequired.addListener(function(details){
	if (!details.isProxy || details.realm!=='Hola Unblocker')
	    return {};
	return {
	    authCredentials: {
		/* XXX arik: conf.proxy.password/username? */
		username: 'proxy',
		password: 'E4QZSecBKSz48XxqjK6H',
	    }
	};
    }, {urls: ['<all_urls>']}, ['blocking']);
    var onInstalled = chrome.runtime.onInstalled||chrome.extension.onInstalled;
    if (onInstalled)
    {
	install_details = {};
	onInstalled.addListener(function(details){
	    install_details.reason = details.reason; });
    }
}

var E = {};

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
    if (data.cmd!='init')
	return;
    m_firefox.remove_listener(firefox_on_msg);
    window.conf = data.conf;
    window.zon_config = data.zon_config;
    window.firefox_info = data.info; /* XXX arik: rm: mv to messaging */
    install_details = data.install_details;
    bg_main_init();
}

function bg_main_init()
{
    require(['be_config', 'be_ver', 'ga_init'], function(be_config, be_ver){
	be_config.init(be_ver.ver, '');
	require(['be_bg_main'], function(be_bg_main){
	    window.be_bg_main = be_bg_main; /* XXX arik: rm */
	    be_bg_main.init(install_details);
	});
    });
}

E.init = function(){
    window.hola = window.hola||{};
    window.hola.t = {l_start: Date.now()};
    /* XXX arik BACKWARD: <1.2.27 extensions required be_ver in be_config */
    window.hola.no_be_ver = true;
    require.onError = function(err){
	console.error('rmt_require_err %s %s %o', err.message,
	    err.requireModules, err);
	throw err;
    };
    try {
	if (localStorage.set_tmp_not_plugin)
	{
	    localStorage.removeItem('set_tmp_not_plugin');
	    localStorage.tmp_not_plugin = 1;
	}
	else
	    localStorage.removeItem('tmp_not_plugin');
    } catch (err){
	/* XXX arik: send perr */
	console.error('failed reading localStorage '+err.stack);
    }
    if (chrome)
    {
	require(['conf', 'zon_config'], function(conf, zon_config){
	    /* XXX arik: try to avoid using globals */
	    window.conf = conf;
	    window.zon_config = zon_config;
	    bg_main_init();
	});
	return;
    }
    m_firefox = firefox_bg_to_addon(top, top);
    m_firefox.add_listener(firefox_on_msg);
    m_firefox.send({msg: 'init'});
};

E.init();

})();
