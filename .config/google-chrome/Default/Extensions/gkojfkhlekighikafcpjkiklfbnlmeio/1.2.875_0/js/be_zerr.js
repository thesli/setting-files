'use strict'; /*jshint browser:true*/
/* XXX arik/mark hack: need to be able to use require for underscore in ccgi */
define(window.conf ? ['underscore'] : [], function(underscore){
var _ = window.conf ? underscore : window._;
var chrome = window.chrome;
var E = zerr;
E.log = [];
var L = E.L = {
    EMERG: 0,
    ALERT: 1,
    CRIT: 2,
    ERR: 3,
    WARN: 4,
    NOTICE: 5,
    INFO: 6,
    DEBUG: 7
};
var L_STR = E.L_STR = ['EMERGENCY', 'ALERT', 'CRITICAL', 'ERROR', 'WARNING',
    'NOTICE', 'INFO', 'DEBUG'];
E.log.level = window.conf && window.conf.zerr_level ?
    L[window.conf.zerr_level] : L.WARN;
E.log.max_size = 200;
E._zerr = _zerr;

/* XXX arik/bahaa HACK: copy from pkg/util/date.js */
function to_sql(date)
{
    // "2013-04-28T18:15:31.531Z" -> "2013-04-28 18:15:31"
    return date.toISOString().replace(/^(.*)T(.*)\..*Z/, '$1 $2')
    .replace(/ 00:00:00$/, '');
}

function console_method(l)
{
    return l<=L.ERR ? 'error' : !chrome ? 'log' : l===L.WARN ? 'warn' :
        l<=L.INFO ? 'info' : 'debug';
}

function zerr(){ return zerr.err.apply(null, arguments); }
function _zerr()
{
    var s, l;
    try {
	var args = _.toArray(arguments, 2), fmt = ''+args[1];
	l = args[0];
	var fmt_args = Array.prototype.slice.call(args, 2);
	/* XXX arik/bahaa HACK: use sprintf (note, console % options are
	 * differnt than sprintf % options) */
	s = (fmt+(fmt_args.length ? ' '+E.json(fmt_args) : ''))
	.substr(0, 1024);
	var prefix = to_sql(new Date())+' '+L_STR[l]+': ';
	E.log.push(prefix+s);
	if (l<=E.log.level)
	{
	    console[console_method(l)].apply(console,
		[prefix+fmt].concat(fmt_args));
	}
	if (E.log.length>E.log.max_size)
	    E.log.splice(0, E.log.length - E.log.max_size/2);
    } catch(err){
	try {
	    /* XXX arik: console may fail (or be null) during loading of new
	     * version */
	    console.error('ERROR in zerr '+(err.stack||err)+' '+
		E.json(arguments));
	} catch(_err){}
    }
    if (l<=L.CRIT)
	throw new Error(s);
}
E.debug = function(){
    return E._zerr.apply(null, [L.DEBUG].concat(_.toArray(arguments))); };
E.info = function(){
    return E._zerr.apply(null, [L.INFO].concat(_.toArray(arguments))); };
E.notice = function(){
    return E._zerr.apply(null, [L.NOTICE].concat(_.toArray(arguments))); };
E.warn = function(){
    return E._zerr.apply(null, [L.WARN].concat(_.toArray(arguments))); };
E.err = function(){
    return E._zerr.apply(null, [L.ERR].concat(_.toArray(arguments))); };
E.crit = function(){
    return E._zerr.apply(null, [L.CRIT].concat(_.toArray(arguments))); };
E.assert = function(exp, msg){
    if (!exp)
	zerr.crit(msg);
};

E.json = function(o, replacer, space){
    try { return JSON.stringify(o, replacer, space)||''; }
    catch(err){ return '[circular]'; }
};

/* from https://github.com/joyent/node/blob/master/lib/util.js */
var formatRegExp = /%[sdj%]/g;
E.format = function(f){
    function inspect(x){ return ''+x; }
    function isString(x){ _.isString(x); }
    function isNull(x){ _.isNull(x); }
    function isObject(x){ _.isObject(x); }
    var i;
    if (!isString(f))
    {
	var objects = [];
	for (i = 0; i<arguments.length; i++)
	    objects.push(inspect(arguments[i]));
	return objects.join(' ');
    }
    i = 1;
    var args = arguments;
    var len = args.length;
    var str = String(f).replace(formatRegExp, function(x){
	if (x === '%%') return '%';
	if (i >= len) return x;
	switch (x)
	{
	    case '%s': return String(args[i++]);
	    case '%d': return Number(args[i++]);
	    case '%j': return E.json(args[i++]);
	    default: return x;
	}
    });
    for (var x = args[i]; i < len; x = args[++i])
    {
	if (isNull(x) || !isObject(x))
	    str += ' ' + x;
	else
	    str += ' ' + inspect(x);
    }
    return str;
};

return E; });
