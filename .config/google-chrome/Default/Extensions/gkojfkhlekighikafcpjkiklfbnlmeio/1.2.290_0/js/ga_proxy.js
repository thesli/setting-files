'use strict'; /*jshint browser:true, es5:true*/ /*global $*/
/* frame_url appears to REQUIRE a subdomain... or else window.history will
 * not be available, and GA will die in the iframe. Some sort of weird bug in
 * the addon SDK. */
window.GaProxy = function(frame_url, ga_path, frame_id, wait_timeout) {
    this.loading = false;
    this.loaded = false;
    this.iframe = null;
    this.queue = [];
    if (frame_url.indexOf('//')<=0)
    {
	if (frame_url[0]=='/')
	    frame_url = window.location.origin;
	else
	{
	    var path = window.location.pathname.split('/');
	    path.pop();
	    frame_url = window.location.origin+path.join('/')+'/'+frame_url;
	}
    }
    /* XXX dmitry: we encode the path twice since a bug in firefox that does
     * not opens the frame when ':' is a part of encoded uri */
    this.frame_url = frame_url+(ga_path ?
	'?ga_path='+encodeURIComponent(encodeURIComponent(ga_path)) : '');
    this.make_frame =  function(){
	if (this.loading || this.loaded)
	    return false;
	this.frame_id = frame_id||'xdcom_frame';
	this.loading = true;
	this.iframe = document.createElement('iframe');
	this.iframe.name = this.frame_id;
	this.iframe.style.cssText = 'position: absolute; top: 0; left: 0; '+
	    'width: 1px; height: 1px; visibility: hidden; background: #fff;';
	this.iframe.src = this.frame_url;
	document.body.appendChild(this.iframe);
	this.onloaded = function(e){
	    this.loaded = true;
	    this.loading = false;
	    this.process_queue();
	}.bind(this);
	var self = this;
	this.iframe.addEventListener('load', function(){
	    setTimeout(self.onloaded, wait_timeout||0); });
    };
    this.push = function() {
	this.make_frame();
	var a = [];
	a.push.apply(a, arguments);
	this.queue.push(a);
	this.process_queue();
    };
    this.process_queue = function() {
	if (this.loaded)
	{
	    var data = JSON.stringify({ga_proxy: true, queue: this.queue});
	    window.frames[this.frame_id].postMessage(data, this.frame_url);
	    this.queue = [];
	}
    };
};
