'use strict'; /*jshint browser:true, es5:true, -W064*/
define(['jquery', 'be_backbone', 'be_browser', 'be_zerr', 'be_popup_lib',
    'be_util', 'be_locale', 'escape', 'etask'],
    function($, be_backbone, B, zerr, be_popup_lib, be_util, T, zescape,
    etask){
var chrome = window.chrome, conf = window.conf, zconf = window.zon_config;
var bg = chrome ? chrome.extension.getBackgroundPage() : window.is_popup ?
    null : window;
var E = new (be_backbone.model.extend())();

function ver_info()
{
    var s = '';
    var $mailto;
    var build = be_util.build_info();
    var $info = $('<div>'), $el = $('<div>').append($info);
    s += add_line(T('Version')+': ', be_util.version());
    if (build.server_version)
	s += add_line(T('Server')+': ', build.server_version);
    if (build.svc_version)
	s += add_line(T('Service')+': ', build.svc_version);
    if (build.product_type)
	s += add_line(T('Product')+': ', build.product_type);
    if (build.browser)
	s += add_line(T('Browser')+': ', build.browser);
    if (build.platform)
	s += add_line(T('Platform')+': ', build.platform);
    if (E.be_bg_main)
    {
	if (E.be_bg_main.get('cid'))
	    s += add_line(T('CID')+': ', E.be_bg_main.get('cid'));
	s += add_line(T('UUID')+': ', E.be_bg_main.get('uuid'));
    }
    $('<div>').append($('<span>').text(T('Report a problem')+': '),
        $mailto = $('<a>', {href: zescape.mailto_url({
	to: 'help_be@hola.org',
        subject: 'Problem with Hola extension',
	body: '(Please include a brief explanation of the problem and '
	+'a screenshot if possible)\n\n'
	+'Information automatically generated about my problem:\n'+s})})
	.text('help_be@hola.org')
	.click(function(e){
            be_popup_lib.perr_err({id: 'be_report_problem',
                rate_limit: {count: 1}});
            if (chrome)
                return;
            e.preventDefault();
            var link = $(e.target).attr('href');
            /* for firefox open in new window which will offer to send with
             * gmail, yahoo, etc.. if no mail client present */
            window.open(link, '_blank', 'resizable');
        }))
    .appendTo($info);
    if (chrome)
    {
        /* workaround mailto links not working in chrome about */
        $mailto.attr('target', 'report_mailto_frame');
        $info.append($('<iframe>', {id: 'report_mailto_frame'}).hide());
    }
    return $el;

    function add_line(s, val){
	$('<div>').append($('<span>').text(s), $('<span>').text(val))
	.appendTo($info);
	return s+val+'\n';
    }
}

function post_init()
{
    window.RMT = E.R; // XXX amir: fix nicely
    zerr.notice('l.about inited');
    $('.content').append(ver_info());
}

E.init = function(){
    if (E.inited)
        return;
    E.inited = true;
    $(window).unload(function(){ E.uninit(); });
    B.init();
    etask([function bg_ping(){
        E.et = this;
        if (!B.use_msg)
            return this.egoto('got_bg');
        B.backbone.client.ping('be_bg_main', 500, this.econtinue_fn());
        return this.wait();
    }, function(ret){
        if (!ret.error)
            return this.econtinue();
        zerr('l.popup ping bg failed %s', zerr.json(ret));
        return this.egoto('bg_ping');
    }, function got_bg(){
	zerr.notice('l.about got bg');
	E.be_bg_main = B.backbone.client.start('be_bg_main');
        if (B.use_msg)
            return wait_for(E.be_bg_main, '_backbone_client_started', true);
    }, function(){
        return wait_for(E.be_bg_main, 'inited', true);
    }, function(){
        if (!B.use_msg)
            return E.R = bg && bg.RMT;
        E.R = B.backbone.client.start('RMT');
        return wait_for(E.R, '_backbone_client_started', true, 500);
    }, function catch$(err){
        if (E.R && err=='timeout')
            return;
        throw err;
    }, function(){
        setTimeout(post_init);
    }, function catch$(err){
        zerr('be_about_main_init_err', err);
    }, function ensure$(){
        E.et = null;
    }]);
};

E.uninit = function(){
    if (!E.inited)
	return;
    E.inited = false;
    if (E.et)
        E.et.ereturn();
    B.backbone.client.stop('be_bg_main');
    B.backbone.client.stop('RMT');
    B._destroy();
    E.off();
    E.stopListening();
};

// XXX bahaa/arik: add to be_backbone?
function wait_for(obj, key, val, timeout)
{
    var l;
    return etask([function(){
        var _this = this;
        E.listen_to(obj, 'change:'+key, l = function(){
            if (obj.get(key)===val)
                _this.econtinue();
        });
        return this.wait(timeout);
    }, function ensure$(){
        E.stopListening(obj, 'change:'+key, l);
    }]);
}

return E; });
