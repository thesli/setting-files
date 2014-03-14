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
var E = rate_limit;

function rate_limit(rl, ms, n)
{
    var now = Date.now();
    if (!rl.count || rl.ts+ms < now)
    {
        rl.count = 1;
        rl.ts = now;
        return true;
    }
    rl.count++;
    return rl.count <= n;
}

return E; }); }());
