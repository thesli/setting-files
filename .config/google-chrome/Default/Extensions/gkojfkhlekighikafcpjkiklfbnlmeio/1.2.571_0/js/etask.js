// LICENSE_CODE ZON
'use strict'; /*jslint node:true, browser:true*/
(function(){
var define, _nodefn, array, D, process, zutil, zerr, events;
if (typeof window=='object')
{
    define = window.define;
    if (!define || !define.amd)
	throw new Error('RequireJS is missing');
    process = {
	nextTick: function(fn){ setTimeout(fn, 0); },
	env: {}
    };
    zutil = {
	extend: function(obj){
	    for (var i=1; i<arguments.length; i++)
	    {
		var source = arguments[i];
		if (!source)
		    continue;
		for (var prop in source)
		    obj[prop] = source[prop];
	    }
	    return obj;
	}
    };
    /* XXX arik: need to use zerr.js */
    zerr = function(){ console.log.apply(console, arguments); };
    zerr.debug = function(){
        (console.debug||console.log).apply(console, arguments); };
}
else
{
    require('./libpatch.js');
    process = global.process;
    _nodefn = require('when/node/function');
    D = require('./d.js');
    zutil = require('./util.js');
    zerr = require('./zerr.js');
    events = require('events');
    define = function(req, setup){
	module.exports = setup.apply(this, req.map(require)); };
}
/* XXX arik hack: rm typeof window */
define(['when', typeof window=='object' ? 'array' : './array.js'],
    function(when, array){

function stack_get()
{
    if (!Etask.use_bt)
        return;
    var prev = Error.stackTraceLimit, err;
    Error.stackTraceLimit = 3;
    err = new Error();
    Error.stackTraceLimit = prev;
    return err;
}

function Etask(opt, states, stack)
{
    if (Array.isArray(opt))
    {
	stack = states;
	states = opt;
	opt = undefined;
    }
    /* new Error(): 200K per second
     * http://jsperf.com/error-generation
     * Function.caller (same as arguments.callee.caller): 2M per second
     * http://jsperf.com/does-function-caller-affect-preformance
     * http://jsperf.com/the-arguments-object-s-effect-on-speed/2 */
    if (!(this instanceof Etask))
	return new Etask(opt, states, stack_get());
    opt = (typeof opt==='string' && {name: opt})||opt||{};
    var _this = this;
    this.cur_state = this.states = this.deferred = undefined;
    this.ensure = this.ensure_run = this.error = this.at_ereturn = undefined;
    this.next_state = this.use_retval = this.running = undefined;
    this.at_econtinue = this.at_retval = this.cancel = undefined;
    this.timeout = this.timer = this.retval = this.run_state = undefined;
    this.stack = this.down = this.up = this.child = undefined;
    this.tm_create = this.alarm_ms = this.alarm_id = undefined;
    this.tm_completed = this.info = undefined;
    this.tm_create_s = this.tm_completed_s = undefined;
    this.name = opt.name;
    this.cancelable = opt.cancel;
    this.child = [];
    Etask.root.push(this);
    this.cur_state = 0;
    this.states = states;
    this.stack = stack;
    this.deferred = Etask.p();
    this.deferred.promise.context = this;
    this.tm_create = Date.now();
    this.tm_create_s = ''+(new Date());
    this.info = {};
    if (events)
        zutil.extend(this, events.EventEmitter.prototype);
    var idx = states.idx = {}, init;
    for (var i=0; i<states.length; i++)
    {
	var state = states[i];
	if (state instanceof Function)
	{
	    state = states[i] = {f: state, label: undefined,
		try_catch: undefined, 'catch': undefined, ensure: undefined,
	        cancel: undefined, sig: undefined, init: undefined};
	}
	if (typeof state !== 'object' || !state.f)
	    throw new Error('invalid state type or missing func'+state);
	var t = this._get_func_type(state.f);
	if (t.label && !state.label)
	    state.label = t.label;
	if (t.try_catch)
	    state.try_catch = t.try_catch;
	if (t['catch'])
	    state['catch'] = t['catch'];
	if (t.ensure)
	    state.ensure = t.ensure;
	if (t.cancel)
	    state.cancel = t.cancel;
	if (state.label)
	    idx[state.label] = i;
	if (state['catch'])
	    state.sig = true;
	if (state.ensure)
	{
	    if (this.ensure)
		throw "2 'ensure' states in one state machine";
	    state.sig = true;
	    this.ensure = i;
	}
	if (state.cancel)
	{
	    if (this.cancel)
		throw "2 'cancel' states in one state machine";
	    state.sig = true;
	    this.cancel = i;
	}
	if (!i && state.init)
	    init = state.init;
    }
    this.retval = init;
    this.run_state = this.states[this.cur_state];
    Etask.prototype._run.call(_this);
    return this.deferred.promise;
}

var E = Etask;
var etask = Etask;
var wait_obj = {};
E.use_bt = 0;
E.root = [];

function et_root_remove(et)
{
    if (et._parent)
	return;
    var root = E.root;
    for (var i=root.length-1; i>=0 && et!==root[i]; i--);
    /* XXX yoni: add assert */
    if (i<0)
	return;
    if (i==root.length-1)
	root.pop();
    else
	root.splice(i, 1);
}

function et_parent_remove(et, push_root)
{
    var i;
    if (!et._parent && !et.up)
	return et_root_remove(et);
    if (et.up)
	return et.up = et.up.down = undefined;
    var p_child = et._parent.child;
    for (i=p_child.length-1; i>=0 && et!==p_child[i]; i--);
    /* XXX yoni: add assert */
    if (i<0)
        return;
    p_child.splice(i, 1);
    et._parent.check_free();
    et._parent = undefined;
    if (push_root)
	E.root.push(et);
}

E.prototype.check_free = function(){
    if (!this.down && !this.child.length)
	et_parent_remove(this);
};

E.prototype._next = function(ret, err){
    var state;
    if (this.cur_state==this.ensure)
    {
	state = this.states.length;
	/* if 'ensure' state returned an error - use it */
	if (err!==undefined)
	{
	    this.retval = undefined;
	    this.error = err;
	}
	else if (this.run_state['catch'])
	{
	    this.retval = ret;
	    this.error = undefined;
	}
    }
    else if (err!==undefined)
    {
	this.retval = undefined;
	this.error = err;
	if (this.at_ereturn)
	    state = this.ensure || this.states.length;
	else if (this.run_state.try_catch)
	{
	    this.use_retval = true;
	    if (this.next_state!==undefined)
		state = this.next_state;
	    else
	    {
		for (state=this.cur_state+1; state<this.states.length &&
		    this.states[state].sig; state++);
	    }
	}
	else
	{
	    for (state=this.cur_state+1; state<this.states.length
		&& !this.states[state]['catch']; state++);
	}
    }
    else
    {
	this.error = undefined;
	this.retval = ret;
	if (this.at_ereturn)
	    state = this.ensure || this.states.length;
	else if (this.next_state!==undefined)
	    state = this.next_state;
	else
	{
	    for (state=this.cur_state+1; state<this.states.length &&
		this.states[state].sig; state++);
	}
    }
    this.cur_state = state;
    this.run_state = this.states[state];
    this.next_state = undefined;
    if (this.cur_state<this.states.length)
    {
	if (state==this.ensure)
	    this.ensure_run = true;
	return false;
    }
    if (!this.ensure_run && this.ensure)
    {
	this.cur_state = this.ensure;
	this.run_state = this.states[this.ensure];
	this.ensure_run = true;
	return false;
    }
    this.tm_completed = Date.now();
    this.tm_completed_s = ''+(new Date());
    this.check_free();
    this.del_alarm();
    if (this.name)
	zerr.debug(this.name+':close');
    if (this.error!==undefined)
    {
	if (E.on_reject)
        {
	    try { E.on_reject(this.error); }
            catch (ex){}
        }
	this.deferred.reject(this.error);
    }
    else
	this.deferred.resolve(this.retval);
    return true;
};

function run_after_promise(_this, ret, err){
    if (_this.timer)
    {
	clearTimeout(_this.timer);
	_this.timer = undefined;
    }
    if (_this._next(ret, err))
	return;
    _this._run();
}

function is_d(promise)
{
    return !!promise.getStatus;
}

E.prototype._run = function(){
    while (1)
    {
	var err = undefined, ret = undefined, cb_start, cb_end, _this = this;
	var arg = this.error!==undefined && !this.use_retval ? this.error :
	    this.retval;
	this.use_retval = false;
	this.running = true;
	if (E.longcb)
	    cb_start = Date.now();
	try {
	    if (this.name)
		zerr.debug(this.name+':S'+this.cur_state+': running');
	    /* do not pass arguments to ensure */
	    if (this.cur_state==this.ensure && !this.run_state['catch'])
		ret = this.run_state.f.call(this);
	    else
		ret = this.run_state.f.call(this, arg);
	} catch (e){ err = e; }
	if (E.longcb)
	{
	    cb_end = Date.now();
	    var ms = cb_end-cb_start;
	    if (ms>E.longcb)
	    {
		zerr('long cb '+ms+'ms: '
		    +this.run_state.f.toString().slice(0, 128));
	    }
	}
	this.running = false;
	if (ret===wait_obj)
	{
	    if (this.at_econtinue)
		ret = this.at_retval;
	    else
	    {
		this.wait_defer = E.p();
		if (this.timeout)
		{
		    this.timer = setTimeout(function(){
			run_after_promise(_this, undefined, 'timeout');
		    }, this.timeout);
		}
		ret = this.wait_defer.promise;
	    }
	}
	this.at_econtinue = false;
	this.at_retval = undefined;
	this.timeout = undefined;
	if (E.p.is_promise(ret))
	{
	    if (is_d(ret) && ret.getStatus())
	    {
		/* fast-path for resolved D promises */
	        if (ret.getStatus()==-1)
	        {
	            err = ret.getValue();
	            ret = undefined;
	        }
	        else
	            ret = ret.getValue();
	    }
	    else
	    {
		/* slow-path for D promises, and all cases for when */
		if (ret.context && ret.context instanceof Etask)
		{
		    et_parent_remove(ret.context);
		    this.down = ret.context;
		    ret.context.up = this;
		}
		ret.then(function(ret){ run_after_promise(_this, ret);
		}, function(err){ run_after_promise(_this, undefined, err); });
		return;
	    }
	}
	if (this._next(ret, err))
	    return;
    }
};

function func_name(func)
{
    if (func.name!==undefined)
	return func.name;
    var n = func.toString().match(/^function ([^\s]+)\s?\(/);
    return (n && n[1]) || '';
}

var func_type_cache = {};
E.prototype._get_func_type = function(func){
    var name = func_name(func);
    var type = func_type_cache[name];
    if (type)
	return type;
    type = func_type_cache[name] = {name: undefined, label: undefined,
        try_catch: undefined, 'catch': undefined, ensure: undefined,
        cancel: undefined};
    if (!name)
	return type;
    type.name = name;
    var n = name.split('$');
    if (n.length==1)
    {
	type.label = n[0];
	return type;
    }
    if (n.length>2)
	return type;
    if (n[1].length)
	type.label = n[1];
    var f = n[0].split('_');
    for (var j=0; j<f.length; j++)
    {
	if (f[j]=='try')
	{
	    type.try_catch = true;
	    if (f[j+1]=='catch')
		j++;
	}
	else if (f[j]=='catch')
	    type['catch'] = true;
	else if (f[j]=='ensure')
	    type.ensure = true;
	else if (f[j]=='cancel')
	    type.cancel = true;
	else
	    throw('unknown func name '+name);
    }
    return type;
};

E.set_spawn = function(child, _parent){
    var root = E.root, p_child, i;
    if (!(child instanceof Etask))
	child = child.context;
    if (!(_parent instanceof Etask))
	_parent = _parent.context;
    et_parent_remove(child, true);
    if (_parent)
    {
	et_root_remove(child);
	_parent.child = _parent.child||[];
	_parent.child.push(child);
	child._parent = _parent;
    }
    return child;
};

E.prototype.set_state = function(name){
    if (this.states.idx[name]!==undefined)
	return (this.next_state = this.states.idx[name]);
    throw('named func "'+name+'" not found');
};

E.prototype.egoto = function(name, promise){
    E.prototype.set_state.call(this, name);
    return this.econtinue(promise);
};

E.prototype.egoto_fn = function(label){
    return function(promise){ this.egoto(label, promise); }.bind(this); };

E.prototype.eloop = function(promise){
    this.next_state = this.cur_state;
    return promise;
};

E.prototype.econtinue = function(promise){
    if (!this.running)
    {
	if (this.wait_defer)
	    this.wait_defer.resolve(promise);
    }
    else
    {
	this.at_retval = promise;
	this.at_econtinue = true;
    }
    return promise;
};

E.prototype.econtinue_fn = function(){
    return this.econtinue.bind(this); };

E.prototype.ecancel = function(){
    if (this.cancel)
	return this.states[this.cancel].f.call(this);
    if (this.cancelable)
	return this.ereturn(-1);
};

E.prototype.ereturn = function(promise){
    this.at_ereturn = true;
    this.next_state = undefined;
    if (this.down)
	this.down.ecancel();
    return this.econtinue(promise);
};

E.prototype.ereturn_fn = function(){
    return this.ereturn.bind(this); };

E.prototype.del_alarm = function(){
    if (!this.alarm_id)
	return;
    clearTimeout(this.alarm_id);
    this.alarm_id = this.alarm_ms = undefined;
};

E.prototype.alarm_left = function(){
    if (!this.alarm_id)
	return 0;
    return this.alarm_id._idleStart + this.alarm_id._idleTimeout - Date.now();
};

E.prototype.alarm = function(ms, cb){
    if (!events)
        throw new Error('etask.alarm() unimplemented');
    var _this = this;
    this.del_alarm();
    this.alarm_ms = ms;
    this.alarm_id = setTimeout(function(){
	_this.alarm_id = _this.alarm_ms = undefined;
	_this.emit('sig_alarm');
    }, this.alarm_ms);
    this.once('sig_alarm', cb);
};

E.prototype.wait = function(timeout){
    this.timeout = timeout;
    return wait_obj;
};

E.prototype.ethrow = function(err){
    return this.econtinue(E.err(err));
};

E.prototype.get_name = function(){
    /* anon: Context.<anonymous> (/home/yoni/zon1/pkg/util/test.js:1740:7)
     * with name: Etask.etask1_1 (/home/yoni/zon1/pkg/util/test.js:1741:11) */
    var stack = this.stack instanceof Error ? this.stack.stack.split('\n') :
	undefined;
    var caller;
    if (stack)
    {
	caller = /^    at (.*)$/.exec(stack[3]);
	caller = caller ? caller[1] : undefined;
    }
    return (this.name||'')+((this.name && caller ? ' ' : '')+(caller||''))||
	'noname';
};

E.prototype.state_str = function(){
    return this.cur_state+(this.next_state ? '->'+this.next_state : ''); };

E.prototype.get_depth = function(){
    var i=0, et = this;
    for (; et; et = et.up, i++);
    return i;
};

E.prototype.get_time_passed = function(){
    return (Date.now()-this.tm_create)+"ms"; };
E.prototype.get_time_completed = function(){
    return (Date.now()-this.tm_completed)+"ms"; };
E.prototype.get_info = function(){
    var info = this.info, s = '', _i;
    if (!info)
	return '';
    for (var i in info)
    {
	_i = info[i];
	if (!_i)
	    continue;
	if (s!=='')
	    s += ' ';
	if (typeof _i==='function')
	    s += _i();
	else
	    s += _i;
    }
    if (s!=='')
	s += ' ';
    return s;
};

var in_etask_run;
function _ps(et, pre_first, pre_next, show_sp, flags){
    var i, s = '', task_trail;
    function cat(_s){ s += _s||''; }
    function trim_cat(cat){
	if (s.length && s[s.length-1]==' ')
	    s = s.slice(0, -1);
	s += cat;
    }
    if (++flags.limit_n>=flags.LIMIT)
        return flags.limit_n==flags.LIMIT ? '\nLIMIT '+flags.LIMIT+'\n': '';
    cat(pre_first);
    if (!flags.STACK && show_sp && show_sp===et && !flags.SUBTREE)
	cat('*** ');
    if (!flags.STACK && in_etask_run==et)
	cat('RUNNING ');
    cat(et.get_name());
    if (et.tm_completed)
    {
	cat(' COMPLETED'
	    +(flags.TIME ? ' '+et.get_time_completed() : ''));
    }
    if (!flags.STACK)
    {
	cat("#"+et.get_depth()+":"+et.get_name());
	cat("."+et.state_str());
    }
    trim_cat(" ");
    if (flags.TIME)
	cat(et.get_time_passed()+' ');
    if (et.info)
	cat(et.get_info());
    trim_cat("\n");
    /* get top-most et */
    for (; et.up; et = et.up);
    /* print the sp frames */
    var first = 1; /* skip first frame (already printed) */
    for (; et; et = et.down)
    {
	if (flags.STACK && !first)
	{
	    cat(pre_next);
	    if (show_sp && show_sp==et && !flags.SUBTREE)
		cat('*** ');
	    if (in_etask_run && et==in_etask_run)
		cat('RUNNING ');
	    cat(et.get_name());
	    if (et.tm_completed)
	    {
		cat(' COMPLETED'
		    +(flags.TIME ? ' '+et.get_time_completed() : ''));
	    }
	    cat('.'+et.state_str()+' ');
	    if (flags.TIME)
		cat(et.get_time_passed()+' ');
	    if (et.info)
		cat(et.get_info());
	    trim_cat("\n");
	}
	first = 0;
	if (flags.RECURSIVE)
	{
	    var stack_trail = flags.STACK && et.down ? "." : " ";
	    var child = et.child;
	    for (i = 0; i<child.length; i++)
	    {
		task_trail = i<child.length-1 ? "|" : stack_trail;
		cat(_ps(child[i], pre_next+task_trail+"\\_ ",
		    pre_next+task_trail+"   ", show_sp, flags));
	    }
	}
    }
    return s;
}

E.ps = function(et, flags){
    var i, s = '', task_trail;
    if (flags===undefined && et && !(et instanceof Etask) &&
	!(et.context && et.context instanceof Etask))
    {
	flags = et;
	et = undefined;
    }
    flags = zutil.extend({STACK: 1, RECURSIVE: 1, LIMIT: 10000000, TIME: 1},
	flags, {limit_n: 0});
    function cat(_s){ s += _s ? _s : ''; }
    if (et===undefined)
    {
	cat((zerr.prefix ? zerr.prefix+'pid '+process.pid+' ' : '')+'root\n');
	for (i in E.root)
	{
	    task_trail = i<E.root.length-1 ? "|" : " ";
	    cat(_ps(E.root[i], task_trail+"\\_ ", task_trail+"   ", undefined,
		flags));
	}
	return s;
    }
    if (et instanceof Etask);
    else if (et.context && et.context instanceof Etask)
	et = et.context;
    else
	throw 'called etask.ps on a non etask promise';
    return _ps(et, '', '', undefined, flags);
};

E.sleep_ms = function(ms){
    var timer;
    return etask('sleep_ms', [function(){
	this.info.ms = ms+'ms';
	timer = setTimeout(this.econtinue_fn(), ms);
	return this.wait();
    }, function cancel$(){
	clearTimeout(timer);
    }]);
};

/* Like nodefn, but capturing multiple arguments into object */
E.nodefn_multi = function(fn, arg_names, ret_name)
{
    return function(){
        var ret;
        var args = array.args(arguments);
        return etask([function(){
            var _this = this;
            args.push(function(err){
                _this.econtinue({err: err, args: array.slice(arguments, 1)});
            });
            ret = fn.apply(null, args);
            return this.wait();
        }, function(res){
            if (res.err)
                this.ethrow(res.err);
            var o = {};
            for (var i in arg_names)
                o[arg_names[i]] = res.args[i];
            if (ret_name)
                o[ret_name] = ret;
            return o;
        }]);
    };
};

if (D)
{
    D.alwaysAsync = false;
    E.D = function Etask_when(){
	var p = D.defer.apply(null, arguments);
        p.promise.context = undefined;
	return p;
    };
    zutil.extend(E.D, {
	promisify: D.promisify,
	nodefn: D._nodeCapsule,
	is_promise: D.isPromise,
	resolve: D.promisify,
	reject: D.rejected,
	_all: D.all,
	settle: D.resolveAll,
	join: function(){
	    return D.all(array.slice(arguments)); },
	_nodefn_apply: function(func, _this, args){
	    return D.nodeCapsule(_this, func).apply(null, args); }
    });
}
E.when = function Etask_when(){
    var p = when.defer.apply(null, arguments);
    p.promise.context = undefined;
    return p;
};
zutil.extend(E.when, {
    promisify: when.resolve,
    nodefn: when.lift,
    is_promise: when.isPromise,
    resolve: when.resolve,
    reject: function(reason){ return when.defer().reject(reason); },
    _all: when.all,
    settle: when.settle,
    join: when.join,
    _nodefn_apply: function(func, _this, args){
	var d = when.defer();
	func.apply(_this, array.slice(args)
	    .concat(_nodefn.createCallback(d.resolver)));
	return d.promise;
    }
});

E.p = process.env.ETASK_P=='D' ? E.D :
    process.env.ETASK_P=='when' ? E.when :
    E.D ? E.D : E.when;

var v = {'pending': 0, 'fulfilled': 1, 'rejected': -1};
E.p.get_status = function(promise){
    return is_d(promise) ? promise.getStatus() : v[promise.inspect().state]; };
E.p.get_value = function(promise){
    if (is_d(promise))
	return promise.getValue();
    return promise.state==='fulfilled' ? promise.value :
	promise.state==='rejected' ? promise.reason : undefined;
};

E.all = function(a_or_o, ao2){
    var i, opt = {};
    if (ao2)
    {
        opt = a_or_o;
        a_or_o = ao2;
    }
    if (a_or_o instanceof Array)
    {
	var a = array.copy(a_or_o);
	i = 0;
	return etask('all', [function loop(){
	    if (i<a.length)
	    {
		this.info.at = 'at '+i+'/'+a.length;
		return a[i];
	    }
	    return this.ereturn(a);
	}, function(res){
	    a[i] = res;
	    i++;
	    return this.egoto('loop');
	}, function catch$(err){
	    if (!opt.allow_fail)
		return this.ethrow(err);
	    a[i] = etask.err(err);
	    i++;
	    return this.egoto('loop');
	}]);
    }
    else if (a_or_o instanceof Object)
    {
	var keys = Object.keys(a_or_o), o = {};
	i = 0;
	return etask('all', [function loop(){
	    if (i<keys.length)
	    {
		this.info.at = 'at '+keys[i]+' '+i+'/'+keys.length;
		return a_or_o[keys[i]];
	    }
	    return this.ereturn(o);
	}, function(res){
	    o[keys[i]] = res;
	    i++;
	    return this.egoto('loop');
	}, function catch$(err){
	    if (!opt.allow_fail)
		return this.ethrow(err);
	    o[keys[i]] = etask.err(err);
	    i++;
	    return this.egoto('loop');
	}]);
    }
    else
	throw 'invalid type';
};

E._nodefn_apply = function(func, _this, args){
    return etask(func.name||{}, [function(){
        args = array.args(args);
	args.push(this.econtinue_nodefn_multi());
	func.apply(_this, args);
	return this.wait();
    }]);
};

E.nodefn_apply = function(func, args){
    return E._nodefn_apply(func, null, args); };

/* same like when.nodefn but allows passing 'this' */
E._nodefn_call = function(func, _this /*, args */){
    return E._nodefn_apply(func, _this, array.slice(arguments, 2)); };

/* same like when.nodefn but faster, since we dont resolve every single
 * argument */
E.nodefn_call = function(func /*, args */){
    return E._nodefn_apply(func, null, array.slice(arguments, 1)); };

E.err = function(err){
    return E.p.reject(err); };

E.is_err = function(v){
    return E.p.is_promise(v) && E.p.get_status(v)===-1; };

E.err_res = function(err, res){
    return err ? E.err(err) : res; };

E.prototype.econtinue_nodefn = function(){
    return function(err, res){
        this.econtinue(E.err_res(err, res)); }
    .bind(this);
};

E.prototype.econtinue_nodefn_multi = function(){
    return function(err, res){
	res = arguments.length > 2 ? array.slice(arguments, 1) : res;
        this.econtinue(E.err_res(err, res));
    }.bind(this);
};

E.longcb = +process.env.LONGCB;
E.use_bt = +process.env.ETASK_BT;

return Etask; }); }());
