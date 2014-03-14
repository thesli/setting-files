/* LICENSE_CODE ZON */
'use strict'; /*jshint browser:true, es5:true*/
/*global PLUGIN_EXE, _RELEASE*/
define(['jquery', 'underscore', 'be_backbone', 'etask', 'be_util', 'be_zerr',
    'be_browser', 'be_tabs', 'be_lib', 'escape', 'svc_util', 'string',
    'be_config', 'bootstrap'],
    function($, _, be_backbone, etask, be_util, zerr, B, be_tabs, be_lib,
    zescape, zutil, string, be_config, bootstrap){
B.assert_bg();
var chrome = window.chrome, conf = window.conf, zconf = window.zon_config;

if (0)
{
    /* XXX arik/bahaa: check with yoni behavior and decide if to remove */
    var prev_etask_on_reject = etask.on_reject;
    etask.on_reject = function(err){
	zerr('etask.on_reject %s', err.stack||err);
	be_lib.err('be_etask_on_reject', ''+err, err, true);
	if (prev_etask_on_reject)
	    prev_etask_on_reject(err);
    };
}

/* XXX arik/bahaa: if a plugin crashed we set tmp_not_plugin. this should
 * apply only one time. implement the code below in a nicer way */
var tmp_not_plugin = be_util.storage_get('tmp_not_plugin');

var E = new (be_backbone.model.extend({
    _defaults: function(){
	this.on('install', on_install);
	this.on('update', on_update);
	this.on('up', on_up);
	this.on('destroy', function(){ E.uninit(); });
    },
}))();

E.be_util = be_util;
E.zerr = zerr;
E.be_browser = B;
E.be_lib = be_lib;

function on_install(){ be_lib.ok('install'); }
function on_update(prev){
    /* XXX arik BACKWARD: < 1.2.346 used storage_local api to save
     * enabled/disabled state */
    if (zutil.version_valid(prev) && zutil.version_cmp(prev, '1.2.346')<0)
    {
	etask([function(){ return be_lib.storage_local_get({enabled: true});
	}, function(e){ return E.set_enabled(!!e.enabled); }]);
    }
    be_lib.ok('update', prev+' > '+be_util.version());
}
function on_up(tmp)
{
    be_lib.ok('up', tmp ? 'tmp_uuid' : null);
    if (window.firefox_info && window.firefox_info.be_disabled)
    {
	be_lib.ok(be_util.is_plugin() ? 'be_plugin_enable' : 'be_ext_enable');
        delete window.firefox_info.be_disabled;
    }
}

E.on_ccgi_tab_change = function(){
    var id = be_tabs.get('ccgi');
    if (!id)
        return;
    B.tabs.get(id, function(tab){
        if (!(tab && tab.url && tab.url.match(conf.ccgi_re)))
            return;
        /* XXX arik/bahaa: need to fix chrome api so it will work
         * with url_re and rm the usage of ccgi_match (do it for all
         * api where we use ccgi_match) */
        B.tabs.query(chrome ? {url: conf.ccgi_match,
            windowId: tab.windowId} : {url_re: conf.ccgi_re,
            windowId: tab.windowId}, function(tabs){
            if (!tabs || !tabs.length || id!==be_tabs.get('ccgi'))
                return;
            B.tabs.remove(_.without(_.pluck(tabs, 'id'), tab.id));
        });
    });
};

function ccgi_resp(msg, sender)
{
    _.defer(B.be.ccgi.send, msg, sender);
    return true;
}

function ccgi_ipc_handler(msg, sender)
{
    if (msg.id!='ping')
	return;
    msg.data = {
	uuid: E.get('uuid'),
	session_key: E.get('session_key')||0,
	ver: be_util.version(),
	type: conf.type,
	cid: E.get('cid'),
	browser: E.get('browser'),
    };
    return ccgi_resp(msg, sender);
}

function new_uuid_raw(tmp)
{
    if (E.get('uuid'))
	return E.get('uuid');
    var uuid = '';
    if (window.crypto && window.crypto.getRandomValues)
    {
        var buf = new Uint8Array(tmp ? 15 : 16);
        window.crypto.getRandomValues(buf);
        for (var i=0; i<buf.length; i++)
            uuid += (buf[i]<=0xf ? '0' : '')+buf[i].toString(16);
    }
    else /* FF v<21 missing this function, we use uuid generated by addon */
        uuid = window.firefox_info.tmp_uuid.substr(tmp ? 2 : 0);
    if (tmp)
        uuid = 't.'+uuid;
    E.set('uuid', uuid);
    E.set('ext.first_run', true); /* XXX arik/bahaa: needed? */
    return uuid;
}

function new_uuid()
{
    var uuid = new_uuid_raw();
    be_util.storage_set('uuid', uuid);
    return be_lib.storage_sync_set({uuid: uuid});
}

E.on_ccgi_url_change = function(){
    var svc = E.get('svc.running'), plugin = be_util.is_plugin();
    var qs = {browser: E.get('browser'), ver: be_util.version(),
        plugin: +(plugin && !svc)||undefined};
    if (svc || plugin)
	qs.cid = E.get('cid');
    else
	qs.uuid = E.get('uuid');
    var proto = be_util.get_proto();
    var ccgi_url_new = proto+'://hola.org/unblock/my/settings?'+
	zescape.to_uri(qs);
    E.set('ccgi_url', ccgi_url_new);
};

E.uninit = function(){
    if (!E.inited)
	return;
    B.backbone.server.stop('be_bg_main');
    E.svc_monitor.uninit();
    B.be.ccgi.del_listener(ccgi_ipc_handler);
    be_tabs._destroy();
    B._destroy();
    E.inited = false;
};

var fallback_to_tmp;
function do_init()
{
    return etask([function(){
	if (fallback_to_tmp)
        {
	    var ls_uuid = be_util.storage_get('uuid');
	    var ls_ver = be_util.storage_get('ver');
	    if (ls_ver && ls_uuid)
		return {uuid: {uuid: ls_uuid}, ver: {ver: ls_ver}};
            if (!ls_uuid)
            {
		ls_uuid = new_uuid_raw(true);
		be_util.storage_set('uuid', ls_uuid);
		be_lib.err('init_tmp_uuid');
	    }
	    be_util.storage_set('ver', be_util.version());
	    return {uuid: {uuid: ls_uuid}, ver: {ver: be_util.version()}};
	}
	return etask.all({ver: be_lib.storage_local_get('ver'),
	    uuid: be_lib.storage_sync_get('uuid')});
    }, function(e){
	var uuid = e.uuid.uuid, ver = e.ver.ver;
	zerr.notice('be_bg_main uuid '+uuid+' ver '+ver);
	E.set('ver', ver);
	/* XXX bahaa BACKWARD: there was an extension that had uuid '0' */
	if (!uuid || uuid==='0')
	    return new_uuid();
	E.set('uuid', uuid);
        if (be_util.storage_get('uuid')!=uuid)
	    be_util.storage_set('uuid', uuid);
    }, function(e){
	var install, update;
	if (E.install_details)
	{
	    install = E.install_details.reason=='install';
	    update = E.install_details.reason=='update';
	}
	else
	{
	    install = e;
	    update = be_util.version()!=E.get('ver');
	}
	if (install || update)
        {
	    zerr.notice('be_bg_main '+(install ? 'install' : 'update'));
	    E.set('ver', be_util.version());
	    if (!E.get('install_details'))
	    {
		E.set('install_details', install ? 'install' : 'update');
		E.trigger(install ? 'install' : 'update',
		    be_util.storage_get('ver'));
	    }
	    if (!fallback_to_tmp)
	    {
		be_util.storage_set('ver', be_util.version());
		return be_lib.storage_local_set({ver: be_util.version()});
	    }
	}
    }, function(e){
	E.trigger('up', fallback_to_tmp);
	if (tmp_not_plugin)
	    be_lib.ok('init_tmp_not_plugin');
	E.set('inited', true);
    }, function catch$(err){
        if (fallback_to_tmp)
	{
	    be_lib.err('init_fallback_fatal_err', null, err);
	    return;
	}
        be_lib.err('init_err', null, err);
        fallback_to_tmp = true;
        setTimeout(do_init, 0);
    }]);
}

E.uninstall_url_cb = function(){
    if (!B.runtime.set_uninstall_url)
	return;
    var url = conf.url_ccgi+'/uninstall?'+zescape.to_uri({perr: 1,
	uuid: E.get('uuid'), cid: E.get('cid'), browser: E.get('browser'),
        version: be_util.version(), plugin: be_util.is_plugin() ? 1 : 0});
    url = url.substr(0, 255); /* max uninstall url is 255 chars */
    B.runtime.set_uninstall_url(url);
};

var icon = {
    gray: {'19': 'img/icon19_gray.png', '38': 'img/icon38_gray.png'},
    blank: {'19': 'img/icon19_blank.png', '38': 'img/icon38_blank.png'},
};

E.init = function(install_details){
    if (E.inited)
	return;
    E.install_details = install_details;
    zerr.notice('be_bg_main.init install_details %s',
        zerr.json(install_details));
    E.inited = true;
    /* XXX arik: rm all unload from the code, instead listen to
     * change:reload */
    $(window).unload(function(){ E._destroy(); });
    B.init();
    be_tabs.init();
    B.be.ccgi.add_listener(ccgi_ipc_handler);
    if (chrome)
    {
        /* attach to existing hola tabs */
        B.tabs.query({url: conf.hola_match}, function(tabs){
            _.each(tabs, function(tab){
                B.tabs.execute_script(tab.id, {file: 'js/cs_hola.js',
                    runAt: 'document_start'});
            });
        });
    }
    B.backbone.server.start(E, 'be_bg_main');
    E.svc_monitor.init();
    be_util.storage_clr('ajax_timeout');
    if (be_util.storage_get('ext_slave'))
    {
	E.set('ext.slave', true);
        be_util.storage_clr('ext_slave');
    }
    zerr.notice('be_bg_main_init'+(tmp_not_plugin ?
	' tmp_not_plugin' : ''));
    E.on('change:inited', inited_cb);
    E.on_init('change:ext.slave', E.on_slave_change);
    /* XXX arik/bahaa: browser is no the right name it should be ext */
    E.set('browser', be_util.browser());
    E.on_init('change:browser change:cid change:ccgi_url_base change:uuid '+
        'change:svc.running change:use_http', E.on_ccgi_url_change);
    E.on_init('change:uuid change:cid change:browser', E.uninstall_url_cb);
    do_init();
};

E.on_slave_change = function(){
    try {
        var slave = E.get('ext.slave');
        B.browser_action[slave ? 'disable' : 'enable']();
        B.browser_action.set_popup(
            {popup: slave ? '' : conf.default_popup});
        if (slave || !E.get('popup.disable_icon'))
        {
            B.browser_action.set_icon(
                {path: icon[slave ? 'blank' : 'gray']});
            if (slave)
                B.browser_action.set_title({title: ''});
        }
    } catch (e){
        be_lib.perr_err({id: 'set_icon_err', rate_limit: {count: 1}}, e); }
};

function inited_cb()
{
    if (!E.get('inited'))
	return;
    E.off('change:inited', inited_cb);
    E.listen_to(be_tabs, 'change:ccgi', E.on_ccgi_tab_change);
    etask([function(){ return be_util.storage_get('ext_state');
    }, function(state){
	var enabled = state=='enabled' ? true : state=='disabled' ? false :
	    true;
	E.set('enabled', enabled);
    }, function(){ return E.load_rmt();
    }, function catch$(err){ be_lib.err('be_bg_main_init_err', '', err); }]);
}

E.ok = function(id, info){ return be_lib.ok(id, info); };
E.err = function(id, info, err){ return be_lib.err(id, info, err); };

E.set_enabled = function(on){
    if (!!E.get('enabled')==!!on)
	return;
    return etask([function(){
	E.set('enabled', !!on);
        return be_util.storage_set('ext_state', on ? 'enabled' : 'disabled');
    }, function catch$(err){
	be_lib.err('be_bg_main_set_enable_err', null, err);
    }]);
};

E.load_rmt = function(){
    if (!E.get('inited') || E.get('rmt_loaded'))
	return;
    be_config.undef();
    require.config({baseUrl: conf.url_bext, waitSeconds: 20,
	urlArgs: 'ext_ver='+be_util.version()+'&rand='+Math.random()});
    window.require_is_remote = true; /* XXX arik hack: find better way */
    require(['be_ver', 'be_config'], function(be_ver, _be_config){
	var country = be_ver.country;
	/* XXX vladimir BACKWARD: country must be '' in old versions */
	if (zutil.version_cmp(be_util.version(), '1.2.166')<=0)
	    country = '';
	_be_config.init(be_ver.ver, country);
	pre_load_rmt();
	require(['be_rmt'], function(be_rmt){
	    if (E.get('rmt_loaded'))
		return;
	    E.set('rmt_loaded', true);
	    window.RMT = be_rmt;
	    window.RMT.init();
	});
    });
};

function pre_load_rmt()
{
    require(['be_backbone', 'etask', 'be_ext', 'be_util', 'be_tabs',
	'be_browser', 'be_zerr', 'svc_util', 'be_rule', 'be_auto_rule',
	'be_icon', 'be_vpn', 'be_info', 'wbm_flags', 'be_lib', 'be_main',
	'be_slave', 'be_ccgi', 'string', 'be_vpn_util', 'be_rule_rating',
        'svc_util', 'be_tab_unblocker', 'url', 'be_plugin', 'date',
	'sprintf', 'rate_limit', 'escape', 'array', 'be_rmt',
	'pac_engine', 'be_tpopup', 'be_msg', 'locale/be_en',
	(chrome ? 'be_chrome' : 'be_firefox')], function(){});
}

E.get_rmt_config = function(){
    return window.RMT && window.RMT.be_config && window.RMT.be_config.config;
};

E.open_ccgi = function(opt){
    return be_lib.open_ccgi(_.extend({ccgi_url: E.get('ccgi_url')}, opt)); };

function safe_set(change) /* XXX bahaa: add to be_backbone? */
{
    var diff = E.changedAttributes(change);
    E.set(diff, {silent: true});
    _.each(diff, function(val, key){
        try { E.trigger('change:'+key);
        } catch (e){
            zerr('error in change listener %s', e.stack||e); }
    });
}

E.check_svc = function(){
    return etask([function(){ return be_util.svc_callback();
    }, function(r){
        if (_.isEqual(r, E.get('svc.info')))
            return r;
        var change = {};
        change['svc.info'] = r;
        change.ws_port = r.ws_port;
        if (r.status && r.status.protocol)
        {
            change['status.protocol.enabled'] = r.status.protocol.enabled;
            change['status.protocol.connected'] = r.status.protocol.connected;
        }
        if (r.status && r.status.unblocker)
        {
            change['status.unblocker.enabled'] = r.status.unblocker.enabled;
            change['status.unblocker.connected'] =
                r.status.unblocker.connected;
            change['status.unblocker.pac_url'] = r.status.unblocker.pac_url;
        }
        change.ccgi_url_base = r.ccgi_url_base;
        change.cid = r.cid;
        var exe = r.svc ? 'svc' : 'plugin';
        change[exe+'.version'] = r[exe].version;
        change[exe+'.cid'] = r[exe].cid;
	/* XXX bahaa: need to rm status.* once svc is not found anymore */
        change['svc.running'] = !!r.svc;
        change.session_key_cid = r.session_key;
        safe_set(change);
        return r;
    }, function(r){
        E.svc_monitor.econtinue({svc_result: r});
        return r;
    }, function catch$(){ safe_set({'svc.info': null, 'svc.running': false});
    }]);
};

E.svc_monitor = (function(){
var EE = {}, inited = false, monitor, ipc, i, waiting;
var cmd = 'set_notify_multi /svc/ram/protocol/connected '
+'/svc/ram/protocol/unblocker/rules/set /svc/ram/protocol/pac_url '
+'/svc/conf/protocol/unblocker/disable /svc/conf/protocol/disable '
+'/svc/conf/protocol/network /svc/conf/protocol/auth/md5 '
+'/svc/conf/protocol/cid';
EE.interval = 60*1000;
EE.start_interval = 1000;
EE.start_tries = 15;
EE.init = function(){
    if (inited)
        return;
    waiting = false;
    ipc = null;
    i = 0;
    etask([function wait(r){
        monitor = this;
        var exe = r && (r.svc||r.plugin);
        if (!(r && r.ws_port && zutil.version_cmp(exe.version,
            !chrome ? '1.1.727' : zconf._RELEASE && conf.type==='cws_plugin' ?
            '1.2.78' : '1.1.583')>0))
        {
            return this.egoto('no_ipc');
        }
        if (!ipc)
            ipc = new be_util.ipc_cmd(r.ws_port, cmd, {qlen: 1});
        return this.egoto('req', ipc.recv());
    }, function catch$(err){
        i = 0;
        if (!ipc)
            return;
        ipc.destroy();
        ipc = null;
    }, function no_ipc(){
        i++;
        waiting = true;
        return this.wait(i>EE.start_tries ? EE.interval : EE.start_interval);
    }, function catch$(){
    }, function req(r){
        waiting = false;
        return this.egoto('wait', r && r.svc_result ? r.svc_result :
            E.check_svc());
    }]);
    inited = true;
};

EE.econtinue = function(r){
    if (waiting)
        monitor.econtinue(r);
};

EE.uninit = function(){
    if (!inited)
        return;
    if (monitor)
    {
        monitor.ereturn();
        monitor = null;
    }
    ipc = null;
    inited = false;
};

return EE; })();

var F = E.flags = {
    DEV: 0x40,
    REL1: 0x80,
    NO_UPDATE: 0x200,
    TMP_UUID: 0x400,
    PLUGIN: 0x8000,
    TORCH: 0x20000,
};
function lset(bits, logic){ return logic ? bits : 0; }

E.get_flags = function(){
    return lset(F.PLUGIN, be_util.is_plugin())|
	lset(F.TMP_UUID, string.startsWith(E.get('uuid')||'', 't.'))|
        lset(F.TORCH, E.get('browser')=='torch')|lset(F.DEV, !zconf._RELEASE)|
        lset(F.REL1, zconf._RELEASE_LEVEL===1)|
        lset(F.NO_UPDATE, chrome && !chrome.runtime.getManifest().update_url);
};

return E; });