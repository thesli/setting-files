'use strict'; /*jshint browser:true, es5:true*/
define(['jquery', 'etask', 'be_zerr', 'be_msg', 'be_backbone',
    window.chrome ? 'be_chrome' : 'be_firefox', 'underscore', 'string'],
    function($, etask, zerr, be_msg, be_backbone, be_chrome, _,
    string){
var chrome = window.chrome, firefox = !chrome;
var bg = chrome ? chrome.extension.getBackgroundPage() : window.is_popup ?
    null : window;
var conf = chrome ? bg.conf : window.conf;
var is_local_ext = !window.set; /* XXX arik hack: rm */
var is_popup = chrome ? window!==bg : window.is_popup;
/* XXX arik: rm is_local_ext */
var use_msg = (false && (!is_local_ext||is_popup))||firefox;
var use_backbone_over_msg = use_msg || firefox;
var E = new (be_backbone.model.extend({
    _defaults: function(){
        this.is_rmt = window.require_is_remote;
	this.use_msg = use_msg;
	this.bg = bg;
	this.msg = new be_msg.msg();
	this.on('destroy', function(){
	    if (!E.inited)
                return;
            E.inited = false;
            be_chrome._destroy();
	    this.msg._destroy();
	});
    },
}))();

E.init = function(){
    if (E.inited)
	return;
    E.inited = true;
    var rpc = firefox ? E.rpc_types.firefox_msg : use_msg ?
        E.rpc_types.chrome_msg : E.rpc_types.chrome_native;
    E.msg.init(chrome ? be_msg.transport.chrome_message(chrome) :
        be_msg.transport.firefox_bg_to_addon(top, top));
    E.rpc = rpc;
    E.rpc.init();
};

E.get_bg = function(){ return bg; };
E.is_popup = function(){ return is_popup; };
E.assert_popup = function(){
    zerr.assert(E.is_popup(), 'file can only be included in popup'); };
E.assert_bg = function(){
    zerr.assert(!E.is_popup(), 'file can only be included in background'); };

/* XXX arik: normalize api usage (eg, use opt instead of arguments, review
 * api namin conventions, handle errors) */
E.rpc_types = {
    chrome_native: {
        init: function(){
	    if (this.inited)
		return;
	    this.inited = true;
	    be_chrome.impl.init();
	    E.runtime.id = be_chrome.impl.id;
	    E.runtime.manifest = be_chrome.impl.manifest;
            E.msg.init();
	},
	call_api: function(obj, sub, func, args, cb, ms, error_cb){
	    /* XXX arik: implment ms/error_cb */
	    var _this = this, _cb = !cb ? null : function(){
	        E.runtime.last_error = _this.last_error =
		    chrome.runtime.lastError;
		return cb.apply(null, arguments);
	    };
	    return be_chrome.impl.call_api(obj, sub, func, args, _cb);
	},
	add_listener: function(obj, sub, cb){
	    be_chrome.impl.add_listener(obj, sub, cb); },
	del_listener: function(obj, sub, cb){
	    be_chrome.impl.del_listener(obj, sub, cb); },
    },
    chrome_msg: {
	init: function(){ /* XXX arik: init should get cb for done init */
	    if (this.inited)
		return;
	    this.inited = true;
            if (!is_popup)
                be_chrome.init(E.msg);
            E.msg.init();
	    E.rpc.call_api('impl', '', 'init', [], function(o){
	        E.runtime.id = o.id;
	        E.runtime.manifest = o.manifest;
	    });
        },
	call_api: function(obj, sub, func, args, cb, ms, error_cb){
	    var _this = this;
	    return E.msg.send({msg: 'call_api', obj: obj, sub: sub,
		func: func, args: args, has_cb: !!cb}, function(ret){
		if (!cb)
		    return;
	        /* XXX arik hack: rm from here */
		E.runtime.last_error = _this.last_error = ret.last_error;
		if (ret.error)
		{
		    if (error_cb)
		        error_cb(ret);
		    return;
		}
	        cb.apply(null, ret.args);
	    }, ms);
	},
	add_listener: function(obj, sub, cb){
	    E.msg.add_listener({obj: obj, sub: sub}, cb);
	},
	del_listener: function(obj, sub, cb){
	    E.msg.del_listener({obj: obj, sub: sub}, cb);
	},
    },
};
E.rpc_types.firefox_msg = E.rpc_types.chrome_msg;

E.browser_action = {
    set_icon: function(details, cb){
	E.rpc.call_api('browserAction', '', 'setIcon', [details], cb); },
    set_badge_text: function(details){ E.rpc.call_api('browserAction',
	'', 'setBadgeText', [details]); },
    set_badge_background_color: function(details){ E.rpc.call_api(
	'browserAction', '', 'setBadgeBackgroundColor', [details]); },
    enable: function(id){
	E.rpc.call_api('browserAction', '', 'enable', [id]); },
    disable: function(id){
	E.rpc.call_api('browserAction', '', 'disable', [id]); },
    set_popup: function(details){
	E.rpc.call_api('browserAction', '', 'setPopup', [details]); },
    set_title: function(details){
	E.rpc.call_api('browserAction', '', 'setTitle', [details]); },
};
E.tabs = {
    get: function(tab_id, cb){
	E.rpc.call_api('tabs', '', 'get', [tab_id], cb); },
    remove: function(tab_id, cb){
	E.rpc.call_api('tabs', '', 'remove', [tab_id], cb); },
    query: function(details, cb){
	E.rpc.call_api('tabs', '', 'query', [details], cb); },
    create: function(details, cb){
	E.rpc.call_api('tabs', '', 'create', [details], cb); },
    update: function(tab_id, details, cb){
	E.rpc.call_api('tabs', '', 'update', [tab_id, details], cb); },
    reload: function(tab_id, details, cb){
	E.rpc.call_api('tabs', '', 'reload', [tab_id, details], cb); },
    execute_script: function(tab_id, details, cb){ E.rpc.call_api('tabs',
	'', 'executeScript', [tab_id, details], cb); },
    on_created: {
	add_listener: function(cb){
	    E.rpc.add_listener('tabs', 'onCreated', cb); },
	del_listener: function(cb){
	    E.rpc.del_listener('tabs', 'onCreated', cb); },
    },
    on_updated: {
	add_listener: function(cb){
	    E.rpc.add_listener('tabs', 'onUpdated', cb); },
	del_listener: function(cb){
	    E.rpc.del_listener('tabs', 'onUpdated', cb); },
    },
    on_activated: {
	add_listener: function(cb){
	    E.rpc.add_listener('tabs', 'onActivated', cb); },
	del_listener: function(cb){
	    E.rpc.del_listener('tabs', 'onActivated', cb); },
    },
    on_removed: {
	add_listener: function(cb){
	    E.rpc.add_listener('tabs', 'onRemoved', cb); },
	del_listener: function(cb){
	    E.rpc.del_listener('tabs', 'onRemoved', cb); },
    },
    on_replaced: {
	add_listener: function(cb){
	    E.rpc.add_listener('tabs', 'on_replaced', cb); },
	del_listener: function(cb){
	    E.rpc.del_listener('tabs', 'on_replaced', cb); },
    },
};
E.windows = {
    get_last_focused: function(details, cb){ E.rpc.call_api('windows',
	'', 'getLastFocused', [details], cb); },
    on_focus_changed: {
	add_listener: function(cb){
	    E.rpc.add_listener('windows', 'onFocusChanged', cb); },
	del_listener: function(cb){
	    E.rpc.del_listener('windows', 'onFocusChanged', cb); },
    },
};
E.storage = {
    local: {
	get: function(keys, cb){ E.rpc.call_api('storage',
	    'local', 'get', [keys], cb); },
	set: function(items, cb){ E.rpc.call_api('storage',
	    'local', 'set', [items], cb); },
    },
    sync: {
	get: function(keys, cb){ E.rpc.call_api('storage',
	    'sync', 'get', [keys], cb); },
	set: function(items, cb){ E.rpc.call_api('storage',
	    'sync', 'set', [items], cb); },
    },
};
E.extension = {
    is_allowed_incognito_access: function(cb){ E.rpc.call_api('extension',
        '', 'isAllowedIncognitoAccess', [], cb); },
};
E.proxy = {
    settings: {
	get: function(opt, cb){
            E.rpc.call_api('proxy', 'settings', 'get', [opt], cb); },
	set: function(opt, cb){
            E.rpc.call_api('proxy', 'settings', 'set', [opt], cb); },
	clear: function(opt, cb){
            E.rpc.call_api('proxy', 'settings', 'clear', [opt], cb); },
	on_change: {
	    add_listener: function(cb){
		E.rpc.add_listener('proxy.settings.onChange', '', cb); },
	    del_listener: function(cb){
		E.rpc.del_listener('proxy.settings.onChange', '', cb); },
	},
    }
};
E.runtime = {
    set_uninstall_url: chrome && !chrome.runtime.setUninstallUrl ? undefined :
	function(url, cb){
	E.rpc.call_api('runtime', '', 'setUninstallUrl', [url], cb); },
    request_update_check: function(cb){
	E.rpc.call_api('runtime', '', 'requestUpdateCheck', [], cb); },
};
E.be = {
    proxy: {
        refresh: function(cb){ /* XXX bahaa BACKWARD: v<=1.1.678 */
            E.rpc.call_api('be', 'proxy', 'refresh', [], cb); },
        add_tab: function(tabid, details, cb){
            E.rpc.call_api('be', 'proxy', 'add_tab', [tabid, details], cb); },
        del_tab: function(tabid, cb){
            E.rpc.call_api('be', 'proxy', 'del_tab', [tabid], cb); },
        /* XXX bahaa BACKWARD: v<1.1.626 */
	set_pac_options: function(opt, cb){
	    E.rpc.call_api('be', 'proxy', 'set_pac_options', [opt], cb); },
        /* XXX bahaa BACKWARD: v<1.1.762 */
	set_rules: function(rules, opt, cb){
	    E.rpc.call_api('be', 'proxy', 'set_rules', [rules, opt], cb); },
        on_before_request: {
            set_listener: function(cb_name, cb){
                E.rpc.call_api('be.proxy.on_before_request', '',
                    'set_listener', [cb_name], cb);
            },
            clear_listener: function(cb){
                E.rpc.call_api('be.proxy.on_before_request', '',
                    'clear_listener', [], cb);
            },
        },
        on_completed: {
            set_listener: function(cb_name, cb){
                E.rpc.call_api('be.proxy.on_completed', '',
                    'set_listener', [cb_name], cb);
            },
            clear_listener: function(cb){
                E.rpc.call_api('be.proxy.on_completed', '',
                    'clear_listener', [], cb);
            },
        },
        on_find_proxy_for_url: {
            set_listener: function(cb_name, cb){
                E.rpc.call_api('be.proxy.on_find_proxy_for_url', '',
                    'set_listener', [cb_name], cb);
            },
            clear_listener: function(cb){
                E.rpc.call_api('be.proxy.on_find_proxy_for_url', '',
                    'clear_listener', [], cb);
            },
        },
    },
    plugin: {
        start: function(cb){
            E.rpc.call_api('be', 'plugin', 'start', [], cb); },
        stop: function(cb){
            E.rpc.call_api('be', 'plugin', 'stop', [], cb); },
        is_running: function(cb){
            E.rpc.call_api('be', 'plugin', 'is_running', [], cb); },
	add_listener: function(cb){ E.rpc.add_listener('be', 'plugin', cb); },
	del_listener: function(cb){ E.rpc.del_listener('be', 'plugin', cb); },
    },
    reload_ext: function(){ E.rpc.call_api('be', '', 'reload_ext', []); },
    ccgi: {
	add_listener: function(cb){ E.rpc.add_listener('be', 'ccgi', cb); },
	del_listener: function(cb){ E.rpc.del_listener('be', 'ccgi', cb); },
        send: function(msg, target, cb){
            E.rpc.call_api('be', 'ccgi', 'send', [msg, target], cb); },
    },
    mem_info: function(opt, cb){
        E.rpc.call_api('be', '', 'mem_info', [opt], cb); },
};
E.firefox = {
    panel: {
        resize: function(w, h, cb){
            E.rpc.call_api('firefox', 'panel', 'resize', [w, h], cb);
        },
    },
};

/* XXX arik: add generic api */
function get_backbone_obj(id)
{
    /* XXX arik: need better way */
    var main = E.is_rmt ? bg.RMT : bg.be_bg_main;
    return main && main.be_browser.backbone.server.obj[id];
}

E.backbone = {client: {obj: {}},
    server: {obj: {}, cb: {}}};
E.backbone.client.ping = function(id, ms, cb){
    if (!use_backbone_over_msg)
    {
	if (get_backbone_obj(id))
	    return setTimeout(function(){ cb({}); });
	setTimeout(function(){
	    var o = get_backbone_obj(id);
	    cb(o ? {} : {error: 'no_object'});
	}, ms);
	return;
    }
    var rpc = firefox ? E.rpc_types.firefox_msg : E.rpc_types.chrome_msg;
    rpc.call_api('backbone', 'server', 'ping', [id], cb, ms, cb);
};
E.backbone.client.start = function(id){
    zerr.debug('backbone.client.start '+id);
    if (!use_backbone_over_msg)
	return get_backbone_obj(id);
    var o = this.obj[id], _this = this;
    zerr.assert(!o, 'client '+id+' already started');
    /* XXX arik: overload set api so we throw exception on local change */
    o = this.obj[id] = new be_backbone.model();
    var rpc = firefox ? E.rpc_types.firefox_msg : E.rpc_types.chrome_msg;
    rpc.init(); /* XXX arik: rm from here */
    E.msg.on_backbone_event = function(info){ /* XXX arik: rm from here */
	var _o = _this.obj[info.id];
        if (!_o)
	    return;
	var ename = info.ename;
        if (string.contains(ename, 'change:'))
	{
	    var attr = ename.replace('change:', ''), val = info.args[0];
            _o.set(attr, val);
	}
	else
            _o.trigger(ename);
    };
    o.fcall = function(){
        rpc.call_api('backbone.server.obj.'+id, 'fcall', arguments[0],
	    arguments[1], null);
    };
    o.ecall = function(){
        var args = arguments;
	return etask([function(){
	    rpc.call_api('backbone.server.obj.'+id, 'ecall', args[0], args[1],
		function(ret){ this.econtinue(ret); }.bind(this));
	    return this.wait();
	}]);
    };
    rpc.call_api('backbone', 'server', 'connect', [id], function(){
        if (!o)
	    return zerr('client %s got connected after stop', id);
        o.set(arguments[0].attributes);
        o.set('_backbone_client_started', true);
    });
    return o;
};
E.backbone.client.stop = function(id){
    zerr.debug('backbone.client.stop '+id);
    /* XXX arik: handle cases where client.stop is not called */
    if (!use_backbone_over_msg)
	return;
    zerr.assert(this.obj[id], 'client '+id+' not started');
    this.obj[id]._destroy();
    delete this.obj[id];
    var rpc = firefox ? E.rpc_types.firefox_msg : E.rpc_types.chrome_msg;
    rpc.call_api('backbone', 'server', 'disconnect', [id]);
};
E.backbone.server.start = function(obj, id){
    zerr.debug('backbone.server.start '+id+' cid '+obj.cid);
    zerr.assert(!this.obj[id], 'server '+id+' already started');
    this.obj[id] = obj;
    if (!use_backbone_over_msg)
	return;
    this.cb[id] = function(ename){
	/* XXX arik: don't send if there are no client listeners */
	var args = [];
        if (string.contains(ename, 'change:'))
	    args = [obj.get(ename.replace('change:', ''))];
	E.msg.send_backbone_event({id: id, ename: ename, args: args});
    };
    obj.on('all', this.cb[id]);
};
E.backbone.server.stop = function(id){
    zerr.debug('backbone.server.stop '+id);
    zerr.assert(this.obj[id], 'server '+id+' not started');
    if (!use_backbone_over_msg)
	return;
    this.obj[id].off('all', this.cb[id]);
    delete this.obj[id];
    delete this.cb[id];
};

return E; });
