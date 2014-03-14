/* LICENSE_CODE ZON */
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

var html_escape_table = {
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
E.html_escape = function(html){
    return html.replace(/[&<>"']/g, function(m){
	return html_escape_table[m[0]]; });
};

E.escape_sh = function(s_or_a){
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

E.unescape_sh = function(s, keep_esc)
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

E.regex_escape = function(s){
    return s.replace(/[[\]{}()*+?.\\^$|\/]/g, '\\$&'); };

E.to_uri_comp = function(s){
    return encodeURIComponent(s).replace(/%20/g, '+'); };

E.to_uri = function(param, opt){
    var uri = '';
    if (!param)
        return uri;
    opt = opt||{};
    var to_uri_comp = opt.space_plus ? E.to_uri_comp : encodeURIComponent;
    for (var i in param)
    {
	var val = param[i];
	if (val===null || val===undefined)
	    continue;
        uri += (!uri ? '' : '&')+to_uri_comp(i)+'='+to_uri_comp(val);
    }
    return uri;
};

E.mailto_url = function(mail){
    return 'mailto:'+(mail.to||'')+'?'
    +E.to_uri({cc: mail.cc, subject: mail.subject, body: mail.body},
	{space_plus: false});
};

E.csv_escape = function(s){
    if (!(''+s).match(/["'\n,]/))
	return s;
    return '"'+s.replace(/"/g,'""')+'"';
};

return E; }); }());
