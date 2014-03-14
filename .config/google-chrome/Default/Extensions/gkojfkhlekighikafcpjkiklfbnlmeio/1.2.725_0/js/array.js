// LICENSE_CODE ZON
'use strict'; /*jslint node:true, browser:true*/
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
define([], function(){
var E = {};

E.push = function(a){
    for (var i=1; i<arguments.length; i++)
	a.push.apply(a, arguments[i]);
    return a.length;
};
E.unshift = function(a){
    for (var i=arguments.length-1; i>0; i--)
	a.unshift.apply(a, arguments[i]);
    return a.length;
};

/* converting arguments to array using slice is slow.
 * http://jsperf.com/arguments-to-array/7 */
function args_slice(args, from, to){
    var _to = to>=0 ? to : args.length+to;
    var ret = new Array(Math.max(0, _to-from));
    for (var i = from; i < _to; i++)
	ret[i-from] = args[i];
    return ret;
}

/* a can also be arguments. avoid doing slow manipulations on arguments.
 * faster than Array.prototype.slice.call(a, from, to) */
E.slice = function(a, from, to){
    if (from===undefined && to===undefined)
	return E.copy(a);
    return args_slice(a, from, to!==undefined ? to : a.length);
};

// can use new Array() constructor for coping only with 2 args or more
// http://jsperf.com/arguments-to-array/12
E.copy = function(a){
    return !a.length ? [] : a.length==1 ? [a[0]] : Array.apply(null, a); };
E.args = E.copy;
// faster: dup only if needed
E._args = function(a){
    return a instanceof Array ? a :
	!a.length ? [] : a.length==1 ? [a[0]] : Array.apply(null, a);
};

// a.slice() is slow for arguments, but fast for arrays
// http://jsperf.com/array-clone-slice-vs-for-loop/5
E.compact = function(a){
    return E.compact_self(a.slice()); };
E.compact_self = function(a){
    var i, j, n = a.length;
    for (i=0; i<n && a[i]; i++);
    if (i==n)
	return a;
    for (j=i; i<n; i++)
    {
	if (!a[i])
	    continue;
	a[j++] = a[i];
    }
    a.length = j;
    return a;
};

// same as _.flatten(a, true)
E.flatten_shallow = function(a){
    return Array.prototype.concat.apply([], a); };

E.to_nl = function(a, sep){
    if (!a || !a.length)
	return '';
    if (sep===undefined)
	sep = '\n';
    return a.join(sep)+sep;
};
E.sed = function(a, regex, replace){
    var _a = new Array(a.length), i;
    for (i=0; i<a.length; i++)
	_a[i] = a[i].replace(regex, replace);
    return _a;
};
E.grep = function(a, regex, replace){
    var _a = [], i;
    for (i=0; i<a.length; i++)
    {
	// dont use regex.test() since with //g sticky tag it does not reset
	if (a[i].search(regex)<0)
	    continue;
	if (replace!==undefined)
	    _a.push(a[i].replace(regex, replace));
	else
	    _a.push(a[i]);
    }
    return _a;
};

E.is_array = function(a){
    return Object.prototype.toString.call(a)==='[object Array]'; };

return E; }); }());
