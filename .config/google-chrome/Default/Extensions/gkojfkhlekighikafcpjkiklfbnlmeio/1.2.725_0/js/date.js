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

function pad(num, size){ return ('000'+num).slice(-size); }
function _to_sql(d)
{
    if (isNaN(d))
        return '0000-00-00 00:00:00';
    return pad(d.getUTCFullYear(), 4)+'-'+pad(d.getUTCMonth()+1, 2)
    +'-'+pad(d.getUTCDate(), 2)
    +' '+pad(d.getUTCHours(), 2)+':'+pad(d.getUTCMinutes(), 2)
    +':'+pad(d.getUTCSeconds(), 2);
}

E.ms_to_dur = function(ms){
    var s = '';
    var sec = Math.floor(ms/1000);
    if (sec < 0)
    {
	s += '-';
	sec = -sec;
    }
    var days = Math.floor(sec/(60*60*24));
    sec -= days*60*60*24;
    var hours = Math.floor(sec/(60*60));
    sec -= hours*60*60;
    var mins = Math.floor(sec/60);
    sec -= mins*60;
    if (days)
	s += days + ' ' + (days>1 ? 'Days' : 'Day') + ' ';
    return s+pad(hours, 2)+':'+pad(mins, 2)+':'+pad(sec, 2);
};

E.to_sql = function(d){
    return _to_sql(d||new Date()).replace(/ 00:00:00$/, ''); };
E.to_sql_ms = function(d){
    d = d||new Date();
    if (isNaN(d))
	return '0000-00-00 00:00:00.000';
    return _to_sql(d)+'.'+pad(d.getUTCMilliseconds(), 3);
};
E.from_sql = function(d){ return new Date(d+' UTC'); };
var months_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'];
E.to_month_short = function(d){
    return months_short[d.getUTCMonth()]; };
/* timestamp format (used by tickets, etc). dates before 2000 not supported */
E.to_jdate = function(d){
    return (pad(d.getUTCDate(), 2)+'-'+months_short[d.getUTCMonth()]
	+'-'+pad(d.getUTCFullYear()%100, 2)+' '+pad(d.getUTCHours(), 2)+
	':'+pad(d.getUTCMinutes(), 2)+':'+pad(d.getUTCSeconds(), 2))
    .replace(/( 00:00)?:00$/, '');
};
// used in log file names
E.to_log_file = function(d){
    d = d||new Date();
    return d.getUTCFullYear()+pad(d.getUTCMonth()+1, 2)+pad(d.getUTCDate(), 2)
    +'_'+pad(d.getUTCHours(), 2)+pad(d.getUTCMinutes(), 2)
    +pad(d.getUTCSeconds(),2);
};
E.ms = {
    SEC: 1000,
    MIN: 60*1000,
    HOUR: 60*60*1000,
    DAY: 24*60*60*1000,
    WEEK: 7*24*60*60*1000,
    MONTH: 30*24*60*60*1000,
    YEAR: 365*24*60*60*1000
};
E.sec = {
    SEC: 1,
    MIN: 60,
    HOUR: 60*60,
    DAY: 24*60*60,
    WEEK: 7*24*60*60,
    MONTH: 30*24*60*60,
    YEAR: 365*24*60*60
};

E.to_day = function(d){
    d = new Date(+d);
    d.setUTCHours(0, 0, 0, 0);
    return d;
};

return E; }); }());
