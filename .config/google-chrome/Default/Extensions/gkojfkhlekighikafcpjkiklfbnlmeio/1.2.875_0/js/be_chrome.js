'use strict'; /*jshint browser:true, es5:true*/
define(['jquery', 'underscore', 'etask', 'be_backbone', 'be_zerr', 'string',
    'svc_util'], function($, _, etask, be_backbone, zerr, string, zutil){
var chrome = window.chrome, bg = chrome.extension.getBackgroundPage();
var conf = bg.conf;
var E = new (be_backbone.model.extend({
    _defaults: function(){
        this.is_rmt = window.require_is_remote;
	this.on('destroy', function(){
	    if (!E.inited)
		return;
	    delete E.msg.on_req;
            delete E.msg.on_add_listener;
            delete E.msg.on_del_listener;
	});
    },
}))();

/* XXX arik: rm generic code and unite with chrome code */
E.init = function(msg){
    if (E.inited)
        return;
    E.inited = true;
    E.listeners = {};
    E.msg = msg;
    E.msg.on_req = on_req;
    E.msg.on_add_listener = on_add_listener;
    E.msg.on_del_listener = on_del_listener;
};

function on_req(j)
{
    var req = j.msg;
    switch(req.msg){
    case 'call_api':
	var cb = !req.has_cb ? null : function(){
	    E.msg.resp(j, {args: _.toArray(arguments),
		last_error: chrome.runtime.lastError});
	};
	E.impl.call_api(req.obj, req.sub, req.func, req.args, cb);
	if (!req.has_cb)
	    E.msg.resp(j, {args: []});
	break;
    }
}

function on_add_listener(j)
{
    var req = j.msg, id = j.id;
    var cb = function(){ E.msg.send_event(j, _.toArray(arguments)); };
    zerr.assert(!E.listeners[id], 'listener '+id+' already exists');
    E.listeners[id] = cb;
    E.impl.add_listener(req.obj, req.sub, cb);
}

function on_del_listener(j)
{
    var req = j.msg, id = j.id, cb = E.listeners[id];
    zerr.assert(E.listeners[id], 'listener '+id+' not found');
    E.impl.del_listener(req.obj, req.sub, cb);
    delete E.listeners[id];
}

function onReplaced()
{
    if (chrome.tabs.onReplaced)
	return chrome.tabs.onReplaced;
    if (chrome.webNavigation.onTabReplaced)
	return chrome.webNavigation.onTabReplaced;
    return null;
}

function get_chrome_obj(obj, sub)
{
    var a = obj.split('.'), o = chrome;
    for (var i=0; i<a.length; i++)
	o = o[a[i]];
    return sub ? o[sub] : o;
}

function get_backbone_obj(id)
{
    /* XXX arik: need better way */
    var main = E.is_rmt ? window.RMT : window.be_bg_main;
    return main && main.be_browser.backbone.server.obj[id];
}

E.impl = {};
E.impl.init = function(){
    if (this.inited)
        return;
    this.inited = true;
    this.v22 = zutil.version_cmp($.browser.version, '23')<0;
    this.id = chrome.runtime.id;
    this.manifest = chrome.runtime.getManifest();
};
E.impl.call_api = function(obj, sub, func, args, cb){
    try {
	var id, o;
	/* XXX arik/bahaa: need hash table of objects instead of ifs */
	if (obj=='backbone' && sub=='server')
	{
	    id = args[0];
	    if (func=='connect')
		zerr.notice('backbone.server.connect %s', id);
	    else if (func=='disconnect')
		zerr.notice('backbone.server.disconnect %s', id);
	    else if (func=='ping')
		zerr.notice('backbone.server.ping %s', id);
	    else
		throw new Error('invalid backbone cmd '+func);
	    o = get_backbone_obj(id);
	    if (!cb || !o)
		return;
	    zerr.notice('id '+id+' found');
	    if (func=='ping')
		cb(o ? {} : {error: 'no_object'});
	    else
		cb({attributes: o.attributes});
	    return;
	}
	if (string.startsWith(obj, 'backbone.server.obj.'))
	{
	    id = obj.replace('backbone.server.obj.', '');
	    o = get_backbone_obj(id);
	    if (!o)
		return;
	    if (sub=='ecall')
	    {
		return etask([function(){ return o.ecall(func, args);
		}, function(){
		    if (cb)
			cb.apply(null, arguments);
		}]);
	    }
	    o[sub].call(o, func, args);
	    if (cb)
		cb({});
	    return;
	}
	if (obj=='zerr' && !sub && func=='_zerr')
	{
	    if (bg.RMT||bg.be_bg_main)
	    {
		o = (bg.RMT||bg.be_bg_main).zerr;
		return o._zerr.apply(o, cb ? args.concat(cb) : args);
	    }
	    else
	    {
		return console.error.apply(console,
		    cb ? args.concat(cb) : args);
	    }
	}
	if (obj=='impl' && !sub && func=='init')
	{
	    this.init(); /* XXX arik: need uninit */
	    if (cb)
		cb({id: this.id, manifest: this.manifest});
	    return;
	}
	if (obj=='be' && sub=='proxy' && func=='refresh')
	{
            window.main.refresh();
	    if (cb)
		cb({});
	    return;
	}
	if (obj=='be' && !sub && func=='reload_ext')
	{
	    console.log('reload_ext');
	    /* XXX arik/bahaa: runtime.reload() will hide the popup icon so we
	     * use bg.location.reload() for pure extensions which doesn't
	     * hide the popup. When it is a plugin, we use runtime reload
	     * because location.reload doesn't always reload the dll */
	    var zconf = window.zon_config;
	    if ((!zconf || zconf.BEXT_PLUGIN) && chrome.runtime.reload)
		return chrome.runtime.reload();
	    bg.location.reload();
	    /* XXX arik: need to keep track of all opened popups and close
	     * them all */
	    if (window!=bg)
		window.close();
	    if (cb)
		cb({});
	    return;
	}
        if (obj=='be' && sub=='ccgi' && func=='send')
        {
            args[1](args[0]);
            if (cb)
                cb({});
            return;
        }
        if (this.v22 && obj=='browserAction' && func=='setIcon' && args[0] &&
            args[0].path && args[0].path['19'])
        {
            /* use the small icon for chrome<23 */
            args[0].path = args[0].path['19'];
        }
	o = sub ? chrome[obj][sub] : chrome[obj];
	return o[func].apply(o, cb ? args.concat(cb) : args);
    } catch(err){
	zerr('error in call_api '+obj+' '+sub+' '+func+'\n'+
	    err.message+' '+err+'\n'+err.stack);
	throw err;
    }
};
E.impl.add_listener = function(obj, sub, cb){
    if (obj=='tabs' && sub=='on_replaced')
    {
	var on_replaced = function(){
	    cb.apply(null, arguments.length==2 ? arguments :
		[arguments[0].tabId, arguments[0].replacedTabId]);
	};
	cb.__be_on_replaced = on_replaced; /* XXX arik: hack, rm */
	if (onReplaced())
	    onReplaced().addListener(on_replaced);
	return;
    }
    if (obj=='be' && sub=='ccgi')
    {
        cb.__be_ccgi_ipc_cb = function(msg, sender, resp_cb){
            return cb(msg, resp_cb); };
        chrome.extension.onMessage.addListener(cb.__be_ccgi_ipc_cb);
        return;
    }
    var o = get_chrome_obj(obj, sub);
    o.addListener(cb);
};
E.impl.del_listener =function(obj, sub, cb){
    if (obj=='tabs' && sub=='on_replaced')
    {
	if (onReplaced())
	    onReplaced().removeListener(cb.__be_on_replaced);
	return;
    }
    if (obj=='be' && sub=='ccgi')
        return chrome.extension.onMessage.removeListener(cb.__be_ccgi_ipc_cb);
    var o = get_chrome_obj(obj, sub);
    o.removeListener(cb);
};

return E; });
