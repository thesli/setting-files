'use strict'; /*jshint browser:true, es5:true*/
define(['underscore', 'backbone'], function(_, Backbone){
var chrome = window.chrome, zconf = window.zon_config||{_RELEASE: true};
var E = {};

/* XXX arik/mark: review, backbone destroy is doing many things and may
 * fail (and also destroy handlers) */
function _destroy(o)
{
    var bg = chrome && chrome.extension.getBackgroundPage();
    try { o.destroy(); }
    catch (err){
	try {
	    console.error('error in destroy %s', err.stack||err);
            if (!chrome)
                return;
	    if (bg!==window)
		bg.console.error('error in destroy %s', err.stack||err);
	} catch (_err){ }
	throw err;
    }
}

E.model = Backbone.Model.extend({
    defaults: function(){
	if (this._defaults) /* XXX arik/mark REVIEW: use initilize */
	    this._defaults.call(this);
	this.on('destroy', function(){
	    this.off();
	    this.stopListening();
	    this.destroyed = true;
	});
    },
    _destroy: function(){ _destroy(this); },
    sync: function(){},
    assert_inited: function(){
	if (!this.get('inited'))
	    throw new Error('not inited');
    },
    on_init: function(events, cb){
	this.on(events, cb);
	cb.call(this); /* XXX arik/mark REVIEW: need better way */
    },
    listen_to: function(other, events, cb){
	this.listenTo(other, events, cb);
	cb.call(this); /* XXX arik/mark REVIEW: need better way */
    },
    fcall: function(a0, a1){ return this[a0].apply(this, a1); },
    ecall: function(a0, a1){ return this[a0].apply(this, a1); },
});

if (!zconf._RELEASE)
{
    E.model.prototype.on = function(events, cb){
        leak_warn(this, events);
        return Backbone.Model.prototype.on.apply(this, arguments);
    };
    E.model.prototype.listenTo = function(other, events, cb){
        leak_warn(other, events);
        return Backbone.Model.prototype.listenTo.apply(this, arguments);
    };
}

function leak_warn(obj, events)
{
    if (!obj._events)
        return;
    var es = events.split(/\s+/);
    for (var i=0, l=es.length; i<l; i++)
    {
        var a = obj._events[es[i]];
        if (a && a.length>7)
            console.error('too many event listeners');
    }
}

/* XXX arik: can be simplified/removed once etask supports external signals */
E.task_model = E.model.extend({
    defaults: function(){
	if (this._defaults) /* XXX arik/mark REVIEW: use initilize */
	    this._defaults.call(this);
	this.queue = [];
	this.on('destroy', function(){
            clearTimeout(this.queue_timer);
	    delete this.queue;
	    this.off();
	    this.stopListening();
	    this.destroyed = true;
	});
    },
    _destroy: function(){ _destroy(this); },
    sync: function(){},
    fcall: function(a0, a1){ return this[a0].apply(this, a1); },
    ecall: function(a0, a1){ return this[a0].apply(this, a1); },
    assert_inited: function(){
	if (!this.get('inited'))
	    throw new Error('not inited');
	if (!this.queue) /* in/after destroy */
	    throw new Error('in destroy');
    },
    set_busy: function(){
	this.assert_inited();
	if (this.get('status')=='error')
	    throw new Error('set_busy in error');
	if (this.get('status')=='ready' || !this.get('status') ||
	    this.in_clr_busy)
	{
	    this.in_clr_busy = false;
	    this.set('status', 'busy');
	    return true;
	}
	return false;
    },
    clr_busy: function(){
	this.assert_inited();
	if (this.get('status')=='error')
	    throw new Error('clr_busy in error');
	if (!this.queue.length)
	    return this.set('status', 'ready');
	this.queue_timer = setTimeout(function(){
	    this.in_clr_busy = true;
	    this.trigger.apply(this, this.queue.shift());
	}.bind(this), 0);
    },
    clr_task: function(task){
	this.assert_inited();
        this.queue = _.filter(this.queue, function(o){
	    return !_.isEqual(o, task); });
    },
    set_err: function(){
	this.assert_inited();
	if (this.get('status')!='busy')
	    throw new Error('set_err but not busy');
	clearTimeout(this.queue_timer);
	this.queue = [];
	this.in_clr_busy = 0;
	return this.set('status', 'error');
    },
    schedule: function(task){
	this.assert_inited();
	if (this.get('status')!='busy')
	    throw new Error('schedule but not busy');
	this.queue.push(task);
    },
    schedule_clr: function(task){
	this.clr_task(task);
	return this.schedule(task);
    },
    recover: function()
    {
	this.assert_inited();
	if (this.get('status')!='error')
	    throw new Error('recover but not in error');
	this.set('status', '', {silent: true});
	return this.trigger('recover');
    },
});

return E; });
