'use strict'; /*jshint browser:true, es5:true, -W064*/
define(['be_config', 'jquery', 'underscore', 'be_backbone', 'etask',
    'be_browser', 'be_zerr', 'be_ui_obj', 'be_popup_lib', 'purl', 'be_util',
    'be_locale', 'escape', 'svc_util'],
    function(be_config, $, _, be_backbone, etask, B, zerr, be_ui_obj,
    be_popup_lib, purl, be_util, T, zescape, zutil){
B.assert_popup('be_popup_main');
var chrome = window.chrome, conf = window.conf, zconf = window.zon_config;
var E = new (be_backbone.model.extend({
    _defaults: function(){ this.on('destroy', function(){ E.uninit(); }); },
}))();
E.be_popup_lib = be_popup_lib;

if (0)
{
    /* XXX arik/bahaa: check with yoni behavior and decide if to remove */
    var prev_etask_on_reject = etask.on_reject;
    etask.on_reject = function(err){
	zerr('etask.on_reject %s', err.stack||err);
	be_popup_lib.err('be_etask_on_reject', ''+err, err);
	if (prev_etask_on_reject)
	    prev_etask_on_reject(err);
    };
}

function message_cb()
{
    $('#message').empty();
    var $checkbox = $('#g_switch');
    if (E.be_bg_main.get('svc.running'))
	$checkbox.hide();
    else
        $checkbox.show();
    if (E.be_bg_main.get('enabled'))
	$checkbox.addClass('enabled');
    else
    {
	$checkbox.removeClass('enabled');
	/* XXX arik: need backbone view + nice arrow like in old chrome */
	$('#message').append(
	    $('<div>').text(T('Unblocker is disabled')),
	    $('<div>', {class: 'l_ui_obj_reload'}).text(T('Enable'))
	    .click(function(){ $checkbox.click(); }));
    }
}

E.open_ccgi = function(opt){
    /* XXX bahaa: handle case of no be_bg_main */
    E.be_bg_main.fcall('open_ccgi', [opt]);
};

function comp_url(comp)
{
    return {unblocker: conf.ipc+'unblocker_enable.json',
	protocol: conf.ipc+'accel_enable.json'}[comp];
}

/* XXX arik: mv logic to be_bg_main? */
function set_enabled(comp, enable)
{
    zerr.notice('set_enabled %s %s', comp, enable);
    if (be_util.is_plugin() && !E.be_bg_main.get('enabled'))
	return $('#g_switch').click();
    /* XXX arik/bahaa: send perr on error */
    $.post(comp_url(comp), {on: enable ? 1 : 0})
    .always(function(){ E.be_bg_main.fcall('check_svc', []); });
}

function is_enabled(mod)
{
    return (!be_util.is_plugin || E.be_bg_main.get('enabled')) &&
	E.be_bg_main.get('status.'+mod+'.enabled');
}

function is_connected(mod)
{
    return is_enabled(mod) && E.be_bg_main.get('status.'+mod+'.connected');
}

function enabled_change(mod)
{
    return 'change:enabled change:status.'+mod+'.enabled';
}

function connected_change(mod)
{
    return enabled_change(mod)+' change:status.'+mod+'.connected';
}

function svc_running_cb()
{
    var $content = $('#content');
    if (E.ui_vpn)
	E.ui_vpn.destroy();
    if (E.ui_accel)
	E.ui_accel.destroy();
    delete E.ui_vpn;
    delete E.ui_accel;
    if (!be_util.is_plugin() && !E.be_bg_main.get('svc.running'))
	return;
    var uec = enabled_change('unblocker'), ucc = connected_change('unblocker');
    E.ui_vpn = new (be_ui_obj.feature_switch.extend({
	init: function(){
	    this.inited = true;
	    this.enabled_cb = function(){
                this.set_enabled(is_enabled('unblocker')); }.bind(this);
	    this.connected_cb = function(){
                this.set_connected(is_connected('unblocker')); }.bind(this);
	    E.be_bg_main.on_init(uec, this.enabled_cb);
	    E.be_bg_main.on_init(ucc, this.connected_cb);
	},
	destroy: function(){
	    this.remove();
	    if (!this.inited)
		return;
	    this.inited = false;
	    E.be_bg_main.off(uec, this.enabled_cb);
	    E.be_bg_main.off(ucc, this.connected_cb);
	},
    }))({className: 'l_ui_feature_switch', type: 'vpn', label: T('Unblocker'),
	link_cb: function(){ E.open_ccgi({hash: 'select/unblock'}); },
	toggle_cb: function(){ set_enabled('unblocker', !this.enabled); },
    });
    var pec = enabled_change('protocol'), pcc = connected_change('protocol');
    E.ui_accel = new (be_ui_obj.feature_switch.extend({
	init: function(){
	    this.inited = true;
	    this.enabled_cb = function(){
                this.set_enabled(is_enabled('protocol')); }.bind(this);
	    this.connected_cb = function(){
                this.set_connected(is_connected('protocol')); }.bind(this);
	    E.be_bg_main.on_init(pec, this.enabled_cb);
	    E.be_bg_main.on_init(pcc, this.connected_cb);
	},
	destroy: function(){
	    this.remove();
	    if (!this.inited)
		return;
	    this.inited = false;
	    E.be_bg_main.off(pec, this.enabled_cb);
	    E.be_bg_main.off(pcc, this.connected_cb);
	},
    }))({className: 'l_ui_feature_switch', type: 'accel',
	label: T('Accelerator'),
	link_cb: function(){ E.open_ccgi({hash: 'select/accel'}); },
	toggle_cb: function(){ set_enabled('protocol', !this.enabled); },
    });
    $content.append(E.ui_vpn.$el).append(E.ui_accel.$el);
}

function dev_info()
{
    try {
        var a = [];
        if (chrome && chrome.runtime && chrome.runtime.getManifest &&
            !chrome.runtime.getManifest().update_url)
        {
            a.push('no update');
        }
        if (chrome && !be_util.ext_type(chrome.runtime.id))
            a.push('unknown id');
        if (zconf._RELEASE_LEVEL!=2)
        {
            a.push(zconf._RELEASE ? 'rel1' : zconf.BUILDTYPE_DEBUG ? 'debug' :
                'dev');
        }
        if (conf.arch)
            a.push(conf.arch);
        if (!a.length)
            return;
        $('#dev_info').html(a.join(','));
    } catch (ex){ zerr('dev_info %s', ex.stack||ex); }
}

function ver_info(tt)
{
    var s = '';
    var $el = tt.$el, $mailto;
    var build = be_util.build_info();
    var $info = $('<div>', {class: 'l_ui_settings_ver_info'});
    $el.empty().append($info);
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
        /* workaround mailto links not working in chrome popup */
        $mailto.attr('target', 'report_mailto_frame');
        $info.append($('<iframe>', {id: 'report_mailto_frame'}).hide());
    }

    function add_line(s, val){
	$('<div>').append($('<span>').text(s), $('<span>').text(val))
	.appendTo($info);
	return s+val+'\n';
    }
}

function create_ui()
{
    if (be_util.browser()=='torch')
    {
	$('#header a').attr('href', 'http://torchbrowser.com/hola-for-torch');
	$('.l_logo').text('for Torch');
    }
    $('#header, #message, #content, #footer').hide();

    var $table = $('<table>', {class: 'l_ui_header'}).appendTo('#header');
    var $tr = $('<tr>').appendTo($table), $td;
    $td = $('<td>').appendTo($tr);
    (new be_ui_obj.lang_list()).$el.appendTo($td);
    $td = $('<td>').appendTo($tr);
    var $s = $('<div>', {id: 'settings', text: T('Settings')})
    .click(function(){ E.open_ccgi(); }).prependTo($td);
    var tt = new be_ui_obj.tooltip({className:'l_ui_obj_tooltip',
	$parent: $s});
    tt.on('show', function(){ return ver_info(tt); });
    /* XXX arik: show loading... + reload link after timeout +
     * animation for on/off + show arrow to enable when disabled */
    /* XXX arik: need backbone checkbox_view */
    $td = $('<td>').appendTo($tr);
    var $checkbox = $('<div>', {id: 'g_switch', class:'switch'});
    $checkbox.appendTo($td).click(function(){
	var on = !$checkbox.hasClass('enabled');
	if (on)
	    $checkbox.addClass('enabled');
	else
	    $checkbox.removeClass('enabled');
        /* XXX arik: need to handle error */
	E.be_bg_main.fcall('set_enabled', [on]);
    });
    dev_info();
    E.listen_to(E.be_bg_main, 'change:enabled change:svc.running',
	message_cb);
    E.listen_to(E.be_bg_main, 'change:svc.running', svc_running_cb);
    $('#header, #message, #content, #footer').show();
    window.hola.t.l_ui = Date.now();
}

E.init = function(){
    try {
	window.popup_main = E;
	E.inited = true;
	if (E.be_bg_main)
            return;
        if (!B.inited)
        {
            B.init();
            $(window).unload(function(){ E.uninit(); });
        }
	if (!E.$el)
	{
	    E.$el = $('<div>', {class: 'be_popup_main'});
	    $('#popup').empty().append(E.$el);
	}
	if (!E.start)
	{
	    E.start = new Date();
	    E.resize_handler_init();
	    E.render_init();
	}
	if (B.use_msg && !E.bg_main_ping)
	{
	    B.backbone.client.ping('be_bg_main', 500, function(ret){
		if (!ret.error)
		    E.bg_main_ping = true;
		else
		    zerr('l.popup ping bg failed %s', zerr.json(ret));
		return E.init();
	    });
	    return;
	}
	E.be_bg_main = B.backbone.client.start('be_bg_main');
	zerr.notice('l.popup got bg');
	if (B.use_msg)
        {
	    E.listenTo(E.be_bg_main, 'change:_backbone_client_started',
                inited_cb);
        }
	E.listen_to(E.be_bg_main, 'change:inited', inited_cb);
    } catch (err){ E.set_err('be_popup_main_init_err', err); }
};

/* XXX arik: todo */
E.uninit = function(){
    if (!E.inited)
	return;
    zerr.notice('l.popup uninit');
    E.resize_handler_uninit();
    if (E.be_bg_main)
    {
	if (E.ui_vpn)
	    E.ui_vpn.destroy();
	if (E.ui_accel)
	    E.ui_accel.destroy();
	B.backbone.client.stop('be_bg_main');
    }
    B._destroy();
    E.off();
    E.stopListening();
    E.inited = false;
};

E.set_err = function(err, _err){
    try {
	zerr('be_ui_set_err %s %s', err, _err.stack||_err);
	if (E.rmt)
	    E.be_bg_main.fcall('err', [err, '', _err]);
    } catch (e){ console.error('set_err error %s %s', err, e.stack||e); }
    E.render_error();
};

function inited_cb()
{
    if (B.use_msg && !E.be_bg_main.get('_backbone_client_started'))
	return;
    if (!E.be_bg_main.get('inited'))
        return zerr.notice('l.popup_main bg_main not inited');
    E.stopListening(E.be_bg_main, 'change:_backbone_client_started',
        inited_cb);
    zerr.notice('l.popup inited');
    E.be_bg_main.fcall('check_svc', []);
    create_ui();
    E.set('inited', true);
    load_rmt_popup();
}

function pre_load_rmt_popup()
{
    require(['be_ui_popup', 'be_backbone', 'etask', 'purl', 'be_zerr',
	'be_browser', 'be_ui_vpn', 'be_ui_obj', 'svc_util', 'be_popup_lib',
	'be_util', 'be_experiment', 'be_locale', 'be_popup_main',
	'jquery', 'be_backbone', 'underscore', 'be_zerr', 'svc_util',
	'etask', 'rate_limit', 'date', 'escape', 'sprintf', 'url',
	'be_social', 'country', 'be_vpn_util', 'string', 'array',
	'be_msg', 'locale/be_en', (chrome ? 'be_chrome' : 'be_firefox'),
	'be_rule_rating'],
	function(){});
}

function load_rmt_popup()
{
    zerr.notice('l.popup loading rmt');
    be_config.undef();
    window.require_is_remote = true; /* XXX arik hack: find better way */
    return etask([function(){
        return E.be_bg_main.ecall('get_rmt_config', []);
    }, function(config){
	if (!config)
	    return this.ereturn(load_rmt_popup_slow());
	require.config(config);
        _load_rmt_popup(config.ver, config.country);
    }, function catch$(err){
	zerr('load_rmt_popup error %s', err.stack);
	load_rmt_popup_slow();
    }]);
}

function _load_rmt_popup(ver, country)
{
    require(['be_config'], function(be_config){
	/* XXX vladimir BACKWARD: country must be '' in old versions */
	if (zutil.version_cmp(be_util.version(), '1.2.166')<=0)
	    country = '';
        be_config.init(ver, country);
        pre_load_rmt_popup();
        require(['be_ui_popup'], function(be_ui_popup){ be_ui_popup.init(); });
    });
}

function load_rmt_popup_slow()
{
    /* XXX arik hack: rm Math.random */
    zerr('load_rmt_popup_slow (no rmt config)');
    require.config({baseUrl: conf.url_bext, waitSeconds: 20,
	urlArgs: 'rand='+Math.random()});
    require(['be_ver'], function(be_ver){
	require.config({baseUrl: conf.url_bext, waitSeconds: 20,
	    urlArgs: 'ver='+be_ver.ver});
        _load_rmt_popup(be_ver.ver, be_ver.country);
    });
}

E.render_init = function(){
    E.$el.empty().append((new be_ui_obj.init_view({
	className: 'l_ui_obj_init', text: T('Starting...'), show_after: 2000,
        err: function(){
	if (!E.be_bg_main) /* XXX arik: need raw level api for perr */
	    return;
        E.be_bg_main.fcall('err', _.toArray(arguments));
    }})).$el);
};

E.render_error = function(){
    try {
	if (!this.ui_error)
	{
	    this.ui_error = new be_ui_obj.error_view({className:
		'l_ui_obj_error'});
	}
	E.$el.empty().append(this.ui_error.$el);

    } catch (e){
	console.error('render error %s', e.stack||e);
	E.be_bg_main.fcall('err', ['be_popup_main_render_error_err', '', e]);
    }
};

/* XXX arik hack: check with mark better way to do it (listen to DOM
 * change events?) */
E.resize = function(t){
    var $body = $('body');
    var w = $body.width(), h = $body.height(), $open;
    /* XXX arik hack: force resize of popup so all dropdowns are displayed */
    if (!chrome && ($open = $('.btn-group.open')).length)
    {
	for (var i=0; i<$open.length; i++)
	{
	    var $o = $($open[0]).find('ul');
	    if (!$o)
		continue;
	    var _h = $o.height()+$o.offset().top;
	    if (h < _h)
		h = _h+5;
	}
    }
    clearTimeout(E.resize_handler_init.timer);
    E.resize_handler_init.timer = setTimeout(E.resize, t || 500);
    if (E.resize.width==w && E.resize.height==h)
	return;
    E.resize.width = w;
    E.resize.height = h;
    /* XXX arik hack: rm extra 40/15 pixels (without it, popup is cut in
     * firefox) */
    if ($.url(top.location.href).param('p'))
	top.$('iframe').width(w+40).height(h+15);
    else
	B.firefox.panel.resize(w+40, h+15);
};

E.resize_handler_init = function(){
    if (window.chrome || E.resize_handler_init.timer)
	return;
    E.resize();
};

E.resize_handler_uninit = function(){
    if (window.chrome || !E.resize_handler_init.timer)
	return;
    E.resize_handler_init.timer = clearTimeout(E.resize_handler_init.timer);
};

return E; });
