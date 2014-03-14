'use strict'; /*jshint browser:true, es5:true, -W064*/
define(['be_config', 'jquery', 'underscore', 'be_backbone', 'etask',
    'be_browser', 'be_zerr', 'be_ui_obj', 'be_popup_lib', 'purl', 'be_util',
    'be_locale', 'escape', 'svc_util', 'be_user_nav'],
    function(be_config, $, _, be_backbone, etask, B, zerr, be_ui_obj,
    be_popup_lib, purl, be_util, T, zescape, zutil, be_user_nav){
B.assert_popup('be_popup_main');
be_popup_lib.set_TypeError_handler();
var chrome = window.chrome, conf = window.conf, zconf = window.zon_config;
var E = new (be_backbone.model.extend({
    _defaults: function(){ this.on('destroy', function(){ E.uninit(); }); },
}))();
E.be_popup_lib = be_popup_lib;
E.zerr = window.hola.zerr = zerr;

function set_on(on)
{
    var $checkbox = $('#g_switch');
    if (on)
    {
        $checkbox.addClass('enabled');
	$checkbox.attr('title', T('Stop Hola'));
    }
    else
    {
        $checkbox.removeClass('enabled');
	$checkbox.attr('title', T('Start Hola'));
    }
}

function switch_cb()
{
    var $checkbox = $('#g_switch');
    if (E.be_bg_main.get('exe.is_svc'))
	$checkbox.css('visibility', 'hidden');
    else
	$checkbox.css('visibility', 'visible');
    if (E.be_bg_main.get('enabled') || E.be_bg_main.get('exe.is_svc'))
	return set_on(true);
    set_on(false);
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
    /* XXX arik/bahaa: send perr on error */
    $.post(comp_url(comp), {on: +!!enable})
    .always(function(){ E.be_bg_main.fcall('check_svc', []); });
}

function is_enabled(mod){ return E.be_bg_main.get('status.'+mod+'.enabled'); }

function is_connected(mod)
{
    return is_enabled(mod) && E.be_bg_main.get('status.'+mod+'.connected');
}

function enabled_change(mod){ return 'change:status.'+mod+'.enabled'; }

function connected_change(mod)
{
    return enabled_change(mod)+' change:status.'+mod+'.connected';
}

function exe_connected_cb()
{
    var $content = $('#content');
    if (E.ui_vpn)
	E.ui_vpn.destroy();
    if (E.ui_accel)
	E.ui_accel.destroy();
    delete E.ui_vpn;
    delete E.ui_accel;
    if (!E.be_bg_main.get('exe.connected'))
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
    var label = function(txt, opt){
        txt = txt||'';
        return $('<span>', _.extend({class: 'label label-warning'}, opt))
        .append(txt);
    };
    var $div = $('<div>')
    .append(label('', {id: 'znet_conflict', class: 'label label-important'}));
    // XXX bahaa: $('#znet_conflict').text(bla bla) when svc/plugin znetwork
    // doesn't match extension's
    try {
        var a = [];
        if (chrome && chrome.runtime && chrome.runtime.getManifest &&
            !chrome.runtime.getManifest().update_url)
        {
            label('no update').appendTo($div);
        }
        if (chrome && !be_util.ext_type(chrome.runtime.id))
            label('unknown id').appendTo($div);
        if (zconf._RELEASE_LEVEL!=2)
        {
            label(zconf._RELEASE ? 'rel1' : zconf.BUILDTYPE_DEBUG ? 'debug' :
                'dev').appendTo($div);
        }
        if (conf.arch)
            label(conf.arch).appendTo($div);
    } catch(ex){ zerr('dev_info %s', ex.stack||ex); }
    return $div;
}

function user_nav()
{
    var user_status =
        new be_user_nav.be_user_status({be_premium: E.be_premium});
    var $nav = new be_user_nav.be_user_links({
        model: user_status,
        bext: true,
        settings_handler: E.open_ccgi,
        lang_select: true,
    });
    var $div = $('<div class="l_user_nav_container"></div>').append($nav.$el);
    return $div;
}

function create_ui()
{
    $('body').addClass(be_util.browser());
    if (be_util.browser()=='torch')
    {
	$('#header a').attr('href', 'http://torchbrowser.com/hola-for-torch');
	$('.l_logo').text('for Torch');
    }
    $('#header, #content, #footer').hide();
    var $checkbox = $('<div>', {id: 'g_switch', class: 'switch'});
    $('<ul>', {class: 'nav pull-right'}).appendTo('#header')
    .append($('<li>').append(user_nav()))
    .append($('<li>').append($checkbox));
    if (0) // XXX bahaa: fix
        $('#dev_info').append(dev_info());
    /* XXX arik: show loading... + reload link after timeout +
     * animation for on/off + show arrow to enable when disabled */
    /* XXX arik: need backbone checkbox_view */
    $checkbox.click(function(){
	var on = !$checkbox.hasClass('enabled');
        set_on(on);
        /* XXX arik: need to handle error */
	E.be_bg_main.fcall('set_enabled', [on]);
    });
    E.listen_to(E.be_bg_main, 'change:enabled change:exe.is_svc', switch_cb);
    E.listen_to(E.be_bg_main, 'change:exe.connected', exe_connected_cb);
    $('#header, #content, #footer').show();
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
    } catch(err){ E.set_err('be_popup_main_init_err', err); }
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
    } catch(e){ console.error('set_err error %s %s', err, e.stack||e); }
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

    } catch(e){
	console.error('render error %s', e.stack||e);
	E.be_bg_main.fcall('err', ['be_popup_main_render_error_err', '', e]);
    }
};

var resize_timer, mut_observer, default_timeout = 500;
E.resize = function(t){
    var b = document.body, w = b.scrollWidth, h = b.scrollHeight;
    clearTimeout(resize_timer);
    resize_timer = setTimeout(E.resize, t||default_timeout);
    if (E.resize.width==w && E.resize.height==h)
	return;
    E.resize.width = w;
    E.resize.height = h;
    if ($.url(top.location.href).param('p'))
	top.$('iframe').width(w).height(h);
    else
	B.firefox.panel.resize(w, h);
};

E.resize_handler_init = function(){
    if (window.chrome || resize_timer)
	return;
    E.resize();
    if (!window.MutationObserver)
        return;
    default_timeout = 1000;
    mut_observer = new window.MutationObserver(_.debounce(E.resize));
    mut_observer.observe(document.documentElement, {attributes: true,
        childList: true, characterData: true, subtree: true,
        attributeOldValue: false, characterDataOldValue: false});
};

E.resize_handler_uninit = function(){
    if (window.chrome)
	return;
    if (resize_timer)
        resize_timer = clearTimeout(resize_timer);
    if (mut_observer)
        mut_observer.disconnect();
    mut_observer = null;
};

return E; });
