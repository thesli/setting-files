/* LICENSE_CODE ZON */
'use strict'; /*jslint browser:true, node:true*/
(function(){
var define, mods;
if (typeof window=='object')
{
    mods = ['sprintf'];
    define = window.define;
    if (!define || !define.amd)
	throw new Error('RequireJS is missing');
}
else if (module.uri && !module.uri.indexOf('resource://')) /* firefox addon */
{
    mods = null;
    /* in firefox require() argument cannot be a variable */
    var sprintf = require('sprintf');
    define = function(req, setup){
	module.exports = setup.call(this, sprintf); };
}
else
{
    mods = ['../util/sprintf.js'];
    define = function(req, setup){
	module.exports = setup.apply(this, req.map(require)); };
}
define(mods, function(sprintf){
var E = {};
/* XXX mark: move to util/version_util.js */
var ver_regexp = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
E.version_expand = function(ver){
    var v;
    if (!ver)
	return '';
    if (!(v = ver_regexp.exec(ver)))
	return;
    return sprintf('%03d.%03d.%03d', +v[1], +v[2], +v[3]);
};

E.version_trim = function(ver){
    var v;
    if (!ver)
	return '';
    if (!(v = ver_regexp.exec(ver)))
	return;
    return ''+(+v[1])+'.'+(+v[2])+'.'+(+v[3]);
};

E.version_cmp = function(v1, v2){
    if (!v1 || !v2)
	return +!!v1 - +!!v2;
    var _v1 = v1.split('.'), _v2 = v2.split('.'), i;
    for (i = 0; i<_v1.length && i<_v2.length && +_v1[i] == +_v2[i]; i++);
    if (_v1.length==i || _v2.length==i)
	return _v1.length - _v2.length;
    return +_v1[i] - +_v2[i];
};

/* XXX arik: why convert v to string? */
E.version_valid = function(v){ return !!(''+v).match(ver_regexp); };

E.top_level_domains = ['com', 'biz', 'net', 'org', 'xxx', 'edu', 'gov', 'ac',
    'co', 'or', 'ne', 'kr', 'jp', 'jpn', 'cn'];

E.get_root_domain = function(domain){
    var s = domain.split('.'), root = s, len = s.length;
    if (len>2) /* www.abc.com abc.com.tw www.abc.com.tw,... */
    {
	var hd = 0;
	if (s[len-1]=='hola')
	{
	    hd = 2; /* domain.us.hola */
	    if (s[len-2].match(/^\d+$/))
		hd = 3; /* domain.us.23456.hola */
	}
	if (E.top_level_domains.indexOf(s[len-2-hd])==-1)
	    root = s.slice(-2-hd, len-hd); // abc.com
	else
	    root = s.slice(-3-hd, len-hd); // abc.com.tw
    }
    return root.join('.');
};

E.domain_valid = function(domain){
    return /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}$/.test(domain); };

/* taken from http://www.caslon.com.au/cctldnote.htm where 2LDs is '--' */
var cctld_2ld_commercial = {};
(function(){
    var a = ('af dz as ao an am aw ac az bh bd '+
	'bj bm bt bo ba bw bv io bn bg bi cm '+
	'ca cv cf td cl km cc km cg cd ci cz '+
	'dk dj dm ie gq er et fo fi fr fx gf '+
	'pf tf ga de gi gl gp gt gw gy ht hm '+
	'hn is iq it ki kp ls li lt lu mk mw '+
	'mv ml mh mq mr mu yt fm md mc mn ms '+
	'mz np nl nc ne mp pw pe pt re ru rw '+
	'sh vc sm st sn sl sk si so gs es sd '+
	'sr ch tj tg tk to tt tm tc tv us uz '+
	'va vn vg wf eh ye').split(' ');
    for (var i in a)
	cctld_2ld_commercial[a[i]] = true;
}());
E.get_root_domain_any = function(domain){
    var s = domain.split('.'), len = s.length, specific = -1, s0;
    if (len<=1)
	return domain;
    s0 = s[len-1];
    if (s0.length>=3) /* abc.com www.abc.info */
	specific = 1;
    else if (s0.length==2) /* abc.fr abc.co.il */
	specific = cctld_2ld_commercial[s0] ? 1 : 2;
    if (specific>0)
	s = s.slice(len-specific-1);
    return s.join('.');
};

E.get_root_url = function(url){
    var n = (url||'').match(/^https?:\/\/([^\/]+)\/.*$/);
    if (!n)
	return null;
    return E.get_root_domain(n[1]);
};

return E; }); }());
