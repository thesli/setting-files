'use strict'; /*jshint browser:true, es5:true*/
(function(){
var locale, locales = ['af', 'ar', 'az', 'be', 'bg', 'bn', 'bs', 'ca', 'cs',
    'cy', 'da', 'de', 'el', 'en', 'es', 'et', 'eu', 'fa', 'fi', 'fr', 'ga',
    'gl', 'gu', 'he', 'hi', 'hr', 'ht', 'hu', 'hy', 'id', 'is', 'it', 'ja',
    'ka', 'km', 'kn', 'ko', 'lt', 'lv', 'mk', 'mr', 'ms', 'mt', 'nl', 'no',
    'pl', 'pt_BR', 'pt', 'ro', 'ru', 'sk', 'sl', 'sq', 'sr', 'sv', 'sw', 'ta',
    'te', 'th', 'tl', 'tr', 'uk', 'ur', 'vi', 'zh_CN', 'zh_TW'];
try { locale = localStorage.locale; }
catch (err){ console.error('failed to read locale '+(err.stack||err)); }

if (locales.indexOf(locale)==-1)
{
    var navlang = (navigator.language||'').replace('-', '_');
    var choices = [navlang, navlang.substr(0, navlang.indexOf('_')), 'en'];
    for (var i=0; i<choices.length; i++)
    {
	if (locales.indexOf(choices[i])!=-1)
	{
	    locale = choices[i];
	    break;
	}
    }
}
require(['locale/be_en', 'locale/be_'+locale], function(){}, function(err){
    try { localStorage.locale = 'en'; }
    catch (cerr){ console.error('failed set localStorage.locale '+
	cerr.stack); }
    if (window.hola && window.hola.base)
    {
	window.hola.base.perr({id: 'be_lang_err', info: ''+locale,
	    bt: err.stack, filehead: 'userAgent: '+navigator.userAgent});
    }
    setTimeout(function(){ window.location.reload(); }, 200);
});
define(['locale/be_en', 'locale/be_'+locale], function(locale_en, locale_curr){
var E = get_message;
E.locale = locale;
E.locales = locales;
E.locale_curr = locale_curr;
E.locale_en = locale_en;

E.is_rtl = function(){ return /^(ar|he|fa|ur)$/.test(E.locale); };

function get_message(id, vals, _locale)
{
    var s, o = locale_curr[id]||locale_en[id];
    if (_locale)
        o = (locale==_locale&&locale_curr[id])||locale_en[id];
    if (!o)
    {
	/* XXX arik: send perr/zerr */
	console.error('no string for '+id);
	s = id;
    }
    else
	s = o.message;
    if (!vals)
        return s;
    /* XXX arik: check chrome code for better implementation/regex */
    for (var i=0; i<vals.length; i++)
        s = s.replace('$'+(i+1), vals[i]);
    return s;
}

/* XXX arik: check for a better way to make first char capital */
E.capital = function(id, vals, _locale){
    var s = get_message(id, vals, _locale);
    return s ? s[0].toUpperCase()+s.substr(1) : s;
};

return E; });
})();
