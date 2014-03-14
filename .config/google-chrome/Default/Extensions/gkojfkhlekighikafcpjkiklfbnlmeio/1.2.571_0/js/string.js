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
define([typeof window=='object' ? 'array' : './array.js'], function(array){
var E = {};

E.rm_empty_last = function(a){
    if (a[a.length-1]==='')
	a.pop();
    return a;
};
E.split_trim = function(s, sep, limit){
    return array.compact_self(s.split(sep, limit)); };
E.split_crlf = function(s){
    return E.rm_empty_last(s.split(/\r?\n/)); };
E.split_nl = function(s){
    return E.rm_empty_last(s.split(/\n/)); };
E.startsWith = String.prototype.startsWith ?
    function(s, head){ return s.startsWith(head); } :
    function(s, head){
	return s.length>=head.length && s.slice(0, head.length)===head; };
E.endsWith = String.prototype.endsWith ?
    function(s, tail){ return s.endsWith(tail); } :
    function(s, tail){
	return s.length>=tail.length && s.slice(-tail.length)===tail; };
E.contains = String.prototype.contains ?
    function(s, sub){ return s.contains(sub); } :
    function(s, sub){ return s.indexOf(sub)>=0; };
return E; }); }());
