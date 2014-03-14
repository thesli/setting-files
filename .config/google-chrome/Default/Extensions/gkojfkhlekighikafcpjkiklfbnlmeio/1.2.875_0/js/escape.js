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
E.un = {};

var html_escape_table = {
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
E.html = function(html){
    return html.replace(/[&<>"']/g, function(m){
	return html_escape_table[m[0]]; });
};

E.sh = function(s_or_a){
    function single(s){
	if (typeof s === 'string') /* support also numbers */
	    s = s.replace(/([\\"])/g, '\\$1');
	return '"'+s+'"';
    }
    if (arguments.length===1 && !Array.isArray(s_or_a))
        return single(s_or_a);
    var s = '', a = Array.isArray(s_or_a) ? s_or_a : arguments;
    for (var i=0; i<a.length; i++)
	s += (i ? ' ' : '')+single(a[i]);
    return s;
};

E.un.sh = function(s, keep_esc)
{
    var state = { PARSE_STATE_INIT: 0, PARSE_STATE_NORMAL_ARG: 1,
        PARSE_STATE_QUOTE_ARG: 2}, cur_state = state.PARSE_STATE_INIT;
    var ret = -1, i, quote = 0, argv = [];
    var a = '';
    /*jshint -W086*/
    for (i=0; i<s.length; i++)
    {
	var esc = 0;
	a += s[i];
        if (s[i]=='\\' && s[1])
	{
	    if (!keep_esc)
		a = a.slice(0, -1);
	    esc = 1;
	    i++;
	    a += s[i];
        }
        switch (cur_state)
        {
        case state.PARSE_STATE_INIT:
            switch (s[i])
            {
	    case '\r': case '\n': case ' ': case '\t':
		if (!esc)
		{
		    a = '';
		    break;
		}
                /* else - fall through */
            case '"': case '\'':
                if (!esc)
                {
                    cur_state = state.PARSE_STATE_QUOTE_ARG;
		    if (!keep_esc)
			a = a.slice(0, -1);
                    quote = s[i];
                    break;
                }
                /* else - fall through */
            default: cur_state = state.PARSE_STATE_NORMAL_ARG;
            }
            break;
        case state.PARSE_STATE_NORMAL_ARG:
            switch (s[i])
            {
	    case '\r': case '\n': case ' ': case '\t':
		if (!esc)
		{
                    cur_state = state.PARSE_STATE_INIT;
		    a = a.slice(0, -1);
		    argv.push(a);
		    a = '';
		}
		break;
	    case '"': case '\'':
                if (!esc)
                {
		    cur_state = state.PARSE_STATE_QUOTE_ARG;
                    quote = s[i];
		    if (!keep_esc)
		        a = a.slice(0, -1);
                }
		break;
            }
            break;
        case state.PARSE_STATE_QUOTE_ARG:
            if (s[i]==quote && !esc)
            {
		cur_state = state.PARSE_STATE_NORMAL_ARG;
		if (!keep_esc)
		    a = a.slice(0, -1);
            }
            break;
        }
    }
    if (cur_state==state.PARSE_STATE_NORMAL_ARG)
    {
	cur_state = state.PARSE_STATE_INIT;
	argv.push(a);
    }
    if (cur_state!=state.PARSE_STATE_INIT)
	throw "error parsing shell";
    return argv;
};

E.regex = function(s){
    return s.replace(/[[\]{}()*+?.\\^$|\/]/g, '\\$&'); };

E.uri_comp = function(s){
    return encodeURIComponent(s).replace(/%20/g, '+'); };

var http_escape_chars = [];
(function(){
    var i;
    for (i=0; i<256; i++)
    {
	var c = String.fromCharCode(i);
	http_escape_chars[i] = /^[a-zA-Z0-9_.~,\-]$/.test(c) ? c :
	    '%'+('0'+i.toString(16)).slice(-2);
    }
}());
E.encodeURIComponent_bin = function(s_or_b){
    // IE does not have Buffer Object
    var s = Buffer && s_or_b instanceof Buffer ? s_or_b.toString('binary')
	: s_or_b;
    var esc = '';
    for (var i = 0; i < s.length; i++)
	esc += http_escape_chars[s.charCodeAt(i)];
    return esc;
};

E.qs = function(param, opt){
    opt = opt||{};
    var qs = opt.qs||'';
    var sep = qs || opt.amp ? '&' : '';
    if (!param)
        return qs;
    var uri_comp = opt.space_plus ? E.uri_comp : encodeURIComponent;
    var uri_comp_val = opt.bin ? E.encodeURIComponent_bin : uri_comp;
    for (var i in param)
    {
	var val = param[i];
	if (val===null || val===undefined)
	    continue;
        qs += sep+uri_comp(i)+'='+uri_comp_val(val);
	sep = '&';
    }
    return qs;
};

E.uri = function(uri, qs_param, opt){
    var qs = typeof qs_param==='string' ? qs_param : E.qs(qs_param, opt);
    if (!qs)
	return uri;
    if (uri.indexOf('?')<0)
	uri += '?';
    else if (uri[uri.length-1]!='?' && uri[uri.length-1]!='&')
	uri += '&';
    return uri+qs;
};

E.mailto_url = function(mail){
    return 'mailto:'+(mail.to||'')+'?'
    +E.qs({cc: mail.cc, subject: mail.subject, body: mail.body},
	{space_plus: false});
};

E.csv = function(s){
    if (!(''+s).match(/["'\n,]/))
	return s;
    return '"'+s.replace(/"/g,'""')+'"';
};

return E; }); }());
