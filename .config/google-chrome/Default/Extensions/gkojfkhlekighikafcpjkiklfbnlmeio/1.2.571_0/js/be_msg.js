/* XXX arik/bahaa: node:true is a hack. please check with derry how to handle
 * firefox addon js */
'use strict'; /*jshint node:true, browser:true, es5:true*/
(function(){
var define;
if (typeof window=='object')
{
    define = window.define;
    if (!define || !define.amd)
	throw new Error('RequireJS is missing');
}
else
{
    define = function(req, setup){
	module.exports = setup.apply(this, req.map(require)); };
}
define(['underscore', 'be_backbone', 'svc_util'],
    function(_, be_backbone, zutil){
var E = {transport: {}};

E.transport.chrome_message = function(chrome){
    var win = chrome.extension.getBackgroundPage();
    var src = win, dst = win;
    return {
        add_listener: function(cb){ dst.addEventListener('message', cb); },
        remove_listener: function(cb){
            dst.removeEventListener('message', cb);
        },
        send: function(msg){
            src.postMessage(msg, 'chrome-extension://'+chrome.runtime.id+'/*');
        },
        get_data: function(msg){ return msg.data; },
        is_valid: function(e){
            if (!e)
                return false;
            var ext_id = chrome.runtime.id;
            /* XXX arik: review if all tests are actually needed */
            if (!e.source || !e.target)
                return false;
            var source_loc = e.source.location, target_loc = e.target.location;
            if (!source_loc || !target_loc)
                return false;
            if (source_loc.protocol!='chrome-extension:' ||
                source_loc.host!=ext_id)
            {
                return false;
            }
            if (target_loc.protocol!='chrome-extension:' ||
                target_loc.host!=ext_id)
            {
                return false;
            }
            return true;
        },
    };
};

E.transport.firefox_message = function(addon){
    var src = addon, dst = addon;
    return {
        add_listener: function(cb){ dst.on('message', cb); },
        remove_listener: function(cb){ dst.removeListener('message', cb); },
        send: function(msg){ src.postMessage(msg); },
        get_data: function(msg){ return msg; },
        is_valid: function(msg){ return !!msg; },
    };
};

/* XXX bahaa BACKWARD: */
function firefox_bg_to_addon_1_1_629(src, dst)
{
    return {
	add_listener: function(cb){ src.addEventListener('message', cb); },
	remove_listener: function(cb){
	    src.removeEventListener('message', cb); },
	send: function(data){
            dst.postMessage({target: 'addon', data: data}, '*'); },
	get_data: function(e){ return e.data && e.data.data; },
	is_valid: function(e){
            return e && e.data && e.data.target!=='addon'; },
    };
}

/* XXX arik/bahaa: protect all with try/catch for debugging */
/* XXX arik: copy in be_bg and be_popup */
function firefox_bg_to_addon(src, dst){
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
}

E.transport.firefox_bg_to_addon = window.chrome ? null :
    zutil.version_cmp(window.zon_config.ZON_VERSION, '1.1.629')<=0 ?
    firefox_bg_to_addon_1_1_629 : firefox_bg_to_addon;

E.msg = be_backbone.model.extend({
    _defaults: function(){
	this.id = 1;
        this.unique = Math.random();
	this.queue = {};
	this.listeners = {};
	this.on('destroy', function(){
	    if (!this.inited)
	        return;
	    this.trasnport.remove_listener(this._on_msg);
        });
    },
    unique_id: function(){ return this.unique+'_'+(this.id++); },
    init: function(trasnport){
	if (this.inited)
	    return;
	this.inited = true;
	this.trasnport = trasnport;
	this._on_msg = this.on_msg.bind(this);
	this.trasnport.add_listener(this._on_msg);
    },
    /* XXX arik: normalize api usage (eg, use opt instead of arguments, review
     * api namin conventions) */
    send: function(msg, cb, ms){
	var j = {id: this.unique_id(), msg: msg, cb: cb};
	this.queue[j.id] = j;
	if (ms)
	{
	    j.timer = setTimeout(function(){
		this.cancel_send(j.id); }.bind(this), ms);
	}
	this.trasnport.send({type: 'be_msg_req', id: j.id, msg: msg});
    },
    resp: function(j, ret){
	this.trasnport.send({type: 'be_msg_resp', id: j.id, ret: ret}); },
    cancel_send: function(id){
	var j = this.queue[id];
	if (!j)
	    return;
	if (j.timer)
	    clearTimeout(j.timer);
	if (j.cb)
	    j.cb({error: 'cancel_send'});
	delete this.queue[id];
    },
    /* XXX arik: rm add_listener/del_listener/send_event/send_backbone_event
     * from be_msg */
    add_listener: function(msg, cb){
	/* XXX arik: avoid using listener id */
	if (cb.__listener_id)
	    throw new Error('listener_id '+cb.__listener_id+' already exists');
	cb.__listener_id = this.unique_id();
	var j = {id: cb.__listener_id, msg: msg, cb: cb};
	this.listeners[j.id] = j;
	this.trasnport.send({type: 'be_msg_add_listener', id: j.id, msg: msg});
    },
    del_listener: function(msg, cb){
	var id = cb.__listener_id;
	if (!id)
	    throw new Error('no listener id');
	delete this.listeners[id];
	delete cb.__listener_id;
	this.trasnport.send({type: 'be_msg_del_listener', id: id, msg: msg});
    },
    send_event: function(j, args){
	this.trasnport.send({type: 'be_msg_event', id: j.id, args: args}); },
    send_backbone_event: function(info){
	this.trasnport.send({type: 'be_msg_backbone_event', info: info}); },
    on_msg: function(msg){
	var j;
	if (!this.trasnport.is_valid(msg))
	    return;
	var data = this.trasnport.get_data(msg);
	if (!data)
	    return;
	switch (data.type){
	case 'be_msg_req':
	    if (!this.on_req)
		return;
	    return this.on_req(data);
	case 'be_msg_resp':
	    j = this.queue[data.id];
	    if (!j)
		return;
	    if (j.timer)
		clearTimeout(j.timer);
	    if (j.cb)
		j.cb(data.ret);
	    delete this.queue[data.id];
	    return;
	case 'be_msg_add_listener':
	    if (!this.on_add_listener)
		return;
	    return this.on_add_listener(data);
	case 'be_msg_del_listener':
	    if (this.on_del_listener)
		return;
	    return this.on_del_listener(data);
	case 'be_msg_event':
	    j = this.listeners[data.id];
	    if (!j)
		return;
	    j.cb.apply(null, data.args);
	    return;
	case 'be_msg_backbone_event':
	    if (!this.on_backbone_event)
		return;
	    return this.on_backbone_event(data.info);
	}
    },
});

return E; }); })();
