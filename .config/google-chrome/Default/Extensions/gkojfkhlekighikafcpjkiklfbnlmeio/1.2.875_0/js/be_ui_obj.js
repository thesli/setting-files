'use strict'; /*jshint browser:true, es5:true, -W064*/
define(['jquery', 'underscore', 'backbone', 'spin', 'be_popup_lib', 'be_util',
    'be_locale', 'bootstrap', 'be_browser', 'be_zerr'],
    function($, _, Backbone, spin, be_popup_lib, be_util, T, bootstrap, B,
    zerr){
B.assert_popup('be_ui_obj');
var chrome = window.chrome;
var E = {};

/* XXX arik: need be_view that will auto-destroy view when removed from dom
 * and clear timers */
/* XXX arik: fix all css/id styles */

E.toggle_switch = Backbone.View.extend({
    className: 'l_ui_obj_toggle_switch',
    initialize: function(){
	/* XXX arik: change class to this.className+'_switch' */
	this.$switch = $('<div>', {class: 'switch'});
	this.$el.append(this.$switch);
	this.set_enabled(false);
    },
    set_enabled: function(enabled){
	this.enabled = !!enabled;
	if (enabled)
        {
	    this.$el.addClass('enabled');
	    this.$switch.addClass('enabled');
	}
	else
        {
	    this.$el.removeClass('enabled');
	    this.$switch.removeClass('enabled');
	}
    },
});

E.spin_view = Backbone.View.extend({
    className: 'ui_obj_spin',
    initialize: function(options){
	options = options||{};
	var _this = this;
	var length = options.length===undefined ? 3 : options.length;
	var width = options.width===undefined ? 3 :  options.width;
	var radius = options.radius===undefined ? 4 : options.radius;
        var corners = options.corners===undefined ? 1 : options.corners;
	var opts = {
	    className: _this.className+'_spinner',
	    lines: 8, /* the number of lines to draw */
	    length: length, /* the length of each line */
	    width: width, /* the line thickness */
	    radius: radius, /* the radius of the inner circle */
	    corners: corners, /* corner roundness (0..1) */
	    rotate: 0, /* the rotation offset */
	    color: '#777', /* #rgb or #rrggbb */
	    speed: 2, /* rounds per second */
	    trail: 60, /* afterglow percentage */
	    shadow: false, /* whether to render a shadow */
	    hwaccel: false, /* whether to use hardware acceleration */
	    zIndex: 2e9, /* the z-index (defaults to 2000000000) */
	    top: 'auto', /* top position relative to parent in px */
	    left: 'auto' /* left position relative to parent in px */
	};
	new spin(opts).spin(_this.el);
    },
});

/* XXX arik: rm _class (and simplify css) */
function $err_msg(_class){
    var $div = $('<div>', {class: _class+'_err_div'});
    $div.append($('<div>').text(T('There seems to be an error')));
    var $list = $('<ul>').appendTo($div);
    $list.append($('<li>').append(
	$('<div>', {class: _class+'_reload_icon'})
	.click(function(e){ be_popup_lib.reload_ext({info: 'error'}); }),
	$('<span>', {class: _class+'_reload'}).text(T('Reload Hola'))
	.click(function(e){ be_popup_lib.reload_ext({info: 'error'}); })));
    $list.append($('<li>').text(T('Check your Internet connection')));
    $list.append($('<li>').append(T('Get help from engineer over skype:')
	+' hola_help'));
    setTimeout(function(){
	if (!$div.parents('body')[0])
	    return;
	be_popup_lib.reload_ext({info: 'auto_reload'});
    }, 10000);
    if (B.have['runtime.request_update_check'])
    {
        B.runtime.request_update_check(function(status){
            zerr.notice('update check: '+status); });
    }
    return $div;
}

/* XXX arik: need something similar for manual reload perr and send
 * perr on success if there was popup error before.
 * delete info on update and send perr on first success */
function init_err_info()
{
    var s ='';
    be_util.storage_set('ui_popup_init_err',
	be_util.storage_get_int('ui_popup_init_err')+1);
    if (!be_util.storage_get_int('ui_popup_inited'))
	s += ' never';
    if (be_util.storage_get_int('ui_popup_init_err')>1)
	s += ' errors '+be_util.storage_get_int('ui_popup_init_err');
    if (be_util.storage_get_int('ajax_timeout'))
	s += ' timeout '+be_util.storage_get_int('ajax_timeout');
    return s ? 'popup'+s : '';
}

E.init_view = Backbone.View.extend({
    className: 'ui_obj_init',
    initialize: function(){
	var _this = this;
	this.$spin = $('<span>', {style: 'position: relative; display: '
	+'inline-block; width: 20px; height: 20px; top: 13px; left: 5px;'});
	this.$msg = $('<span>').text(this.options.text||T('Initializing...'));
	this.$el.append(this.$spin, this.$msg);
        this.$spin.append((new E.spin_view()).$el);
	/* XXX arik: fine-tune timers (dll may need more time vs non-dll) */
	setTimeout(function(){
	    if (!this.$el.parents('body')[0])
	        return;
	    this.$error = $err_msg(this.className);
	    this.$el.append(this.$error);
	    be_popup_lib.err('be_ui_obj_init_err', init_err_info());
	}.bind(this), 10000);
	if (this.options.show_after)
	{
	    this.$el.hide();
	    setTimeout(function(){ this.$el.fadeIn(1000); }.bind(this),
		this.options.show_after);
	}
    },
});

E.error_view = Backbone.View.extend({
    className: 'ui_obj_error',
    initialize: function(){
	var _this = this;
	this.$error = $err_msg(this.className);
	this.$el.append(this.$error);
    },
});

E.changing_view = Backbone.View.extend({
    className: 'ui_obj_busy',
    initialize: function(){
	var $el = this.$el;
	var changing = this.options.changing || {src: '', dst: ''};
	/* XXX arik: normalize country usage (default should be all capital) */
	var src = changing ? changing.src.toUpperCase() : '';
	var dst = changing ? changing.dst.toUpperCase() : '';
	var $spinner = $('<div>', {class: 'r_ui_spinner'});
	var $div = $('<div>', {class: 'r_ui_in_progress'}).appendTo($el)
	.append($spinner)
	.append($('<span>').text(src && dst ? T('changing...') :
	    T('Initializing...')));
        $spinner.append((new E.spin_view()).$el);
	if (src && dst)
	{
            var rtl = T.is_rtl(), arrow = rtl ? ' &larr; ' : ' &rarr; ';
	    var $countries = $('<div>', {class: 'r_ui_in_progress f32'})
            .appendTo($el)
	    .append($('<span>', {class: 'flag '+src.toLowerCase()}),
		$('<span>').text(' '+T(src)),
		$('<span>', {class: 'arrow'}).html(arrow),
		$('<span>', {class: 'flag '+dst.toLowerCase()}),
		$('<span>').text(' '+T(dst)));
            if (rtl)
                $countries.addClass('rtl');
	}
	if (this.options.reload)
	{
            this.timer = setTimeout(function(){
		var $reload = $('<div>', {class: 'r_ui_obj_reload'})
		.text(T('Reload'))
		.click(function(e){ be_popup_lib.reload_ext({
		    info: 'changing'}); });
		$el.append($reload);
	    }, this.options.reload);
	}
    },
});

E.feature_switch = Backbone.View.extend({
    className: 'ui_obj_feature_switch',
    initialize: function(){
	var opt = this.options, cname = this.className;
        $('<hr>', {class: 'fade-line'}).append(this.$el);
	var $div = $('<div>', {class: cname+'_'+opt.type}).appendTo(this.$el);
	this.$icon = $('<div>', {class: cname+'_icon_'+opt.type})
        .click(opt.link_cb.bind(this)).appendTo($div);
	this.$label = $('<span>', {class: cname+'_label_'+opt.type})
	.text(opt.label).click(opt.link_cb.bind(this)).appendTo($div);
	this.toggle_switch = new E.toggle_switch();
	this.toggle_switch.$el.click(opt.toggle_cb.bind(this)).appendTo($div);
	this.set_enabled(false);
	this.set_connected(false);
	if (this.init) /* XXX arik: need be_view and mv init/destroy to it */
            this.init();
    },
    set_enabled: function(enabled){
	this.enabled = !!enabled;
	this.toggle_switch.set_enabled(this.enabled);
	if (enabled)
        {
	    this.$el.addClass('enabled');
	    this.$icon.addClass('enabled');
	    this.$label.addClass('enabled');
	}
	else
	{
	    this.$el.removeClass('enabled');
	    this.$icon.removeClass('enabled');
	    this.$label.removeClass('enabled');
	}
	return this;
    },
    set_connected: function(connected){
	this.connected = !!connected;
	if (connected)
	    this.$icon.addClass('connected');
	else
	    this.$icon.removeClass('connected');
	return this;
    },
});

E.error_message = Backbone.View.extend({
    className: 'ui_obj_error_message',
    set_msg: function($msg){
	this.$el.empty().append($msg);
	return this;
    },
});

/* XXX arik/mark: need to use bootstrap popup */
E.tooltip = Backbone.View.extend({
    className: 'ui_obj_tooltip',
    initialize: function(){
	var opt = this.options||{};
	this.hide();
	this.delay = opt.delay||250;
	this.$el.click(function(e){ e.stopPropagation(); });
	if (opt.$parent)
            this.append_to(opt.$parent);
        if (opt.$content)
            this.$el.append(opt.$content);
    },
    append_to: function($parent){
	$parent.append(this.$el);
	$parent.mouseenter(function(){ this.mouseenter(); }.bind(this))
	.mouseleave(function(){ this.mouseleave(); }.bind(this));
    },
    mouseenter: function(){
	clearTimeout(this.timer);
        this.timer = setTimeout(function(){ this.show(); }.bind(this),
	    this.delay);
    },
    mouseleave: function(){
	clearTimeout(this.timer);
        this.timer = setTimeout(function(){ this.hide(); }.bind(this));
    },
    hide: function(){
	this.timer = clearTimeout(this.timer);
	this.trigger('hide');
	this.$el.hide(); },
    show: function(){
	this.timer = clearTimeout(this.timer);
	this.trigger('show');
	this.$el.show();
    },
});

E.select = Backbone.View.extend({
    className: 'ui_obj_select',
    initialize: function(){
	var $el = this.$el;
	var lr = this.options.local_css ? 'l_' : 'r_';
	$el.addClass('btn-group '+lr+'btn-group');
	if (this.options.dropup)
            $el.addClass('dropup');
	this.$btn = $('<div>', {class: 'btn '+lr+'btn-trans dropdown-toggle',
	    'data-toggle': 'dropdown'}).appendTo($el);
	this.$val = $('<span>').appendTo(this.$btn);
	$('<span>', {class: 'caret'}).appendTo(this.$btn);
	this.$ul = $('<ul>', {class: 'dropdown-menu'}).appendTo($el);
	if (this.options.pull_right)
	    this.$ul.addClass('pull-right');
        if (!chrome) // XXX arik BACKWARD: force resize of popup on firefox
	    $el.click(function(){ window.popup_main.resize(100); });
    },
    add_item: function($item, val){
	$('<li>').appendTo(this.$ul).append($item).prop('val', val)
	.click(function(){
	    this.curr_val = val;
	    this.redraw();
	    this.trigger('select:change', val);
	}.bind(this));
    },
    redraw: function(){
	var $items = this.$ul.children('li');
	for (var i=0; i<$items.length; i++)
	{
	    var $i = $($items[i]);
	    if ($i.prop('val')!=this.curr_val)
		continue;
	    this.set_label($i.children().clone());
	    break;
	}
    },
    set_label: function($l){ this.$val.empty().append($l); },
    val: function(val){
	if (val===undefined)
            return this.curr_val;
        this.curr_val = val;
	this.redraw();
    },
});

E.modal_select = Backbone.View.extend({
    className: 'ui_obj_modal_select dropdown',
    template: '\
<button class="dropdown-toggle lang_dropdown_toggle" data-toggle="dropdown" style="display: none;"></button>\
<ul class="dropdown-menu l_lang_dropdown_menu" role="menu" aria-labelledby="dLabel"></ul>',
    initialize: function(options){
        this.$el.html(this.template);
	this.$ul = this.$('.dropdown-menu');
        this.options = options;
    },
    add_item: function($item, val){
	$('<li>').appendTo(this.$ul).append($item).prop('val', val)
	.click(function(){
	    this.curr_val = val;
	    this.redraw();
	    this.trigger('select:change', val);
	}.bind(this));
    },
    redraw: function(){
	var $items = this.$ul.children('li'), i;
	for (i = 0; i<$items.length; i++)
	{
	    var $i = $($items[i]);
	    if ($i.prop('val')!=this.curr_val)
		continue;
	    this.set_label($i.children().clone());
	    break;
	}
    },
    set_label: function($l){
        this.options.label.empty().append(T('Language:')+' '+$l.text()); },
    val: function(val){
	if (val===undefined)
            return this.curr_val;
        this.curr_val = val;
	this.redraw();
    },
});

E.lang_list = Backbone.View.extend({
    className: 'l_ui_obj_lang_list',
    initialize: function(options){
	var $el = this.$el, _this = this;
	if (T.locales.length==1)
	    return;
	var select = new E.modal_select(_.extend({local_css: true}, options));
	select.$el.appendTo($el);
        select.add_item($('<a>', {text: T('locale_en_en')+' '}), 'en');
	for (var i=0; i<T.locales.length; i++)
	{
	    var l = T.locales[i];
	    select.add_item($('<a>', {text: T('locale_en_'+l)+' '}), l);
	}
	/* XXX vladimir: check if .capital and _locale='en' are required */
	select.add_item($('<a>', {text: T.capital('more...', null, 'en')}),
	    'more');
	select.val(T.locale);
	select.on('select:change', function(){
	    this.lang_timer = clearTimeout(this.lang_timer);
	    if (select.val()==T.locale)
		return;
	    if (select.val()=='more')
	    {
		select.val(T.locale);
		B.tabs.create({url: 'https://hola.org/translate.html#more'});
		return;
	    }
	    var new_locale = select.val();
	    be_popup_lib.perr_ok({id: 'be_popup_lang', info: new_locale,
		rate_limit: {count: 20}});
	    this.lang_timer = setTimeout(function(){
		localStorage.locale = new_locale;
		window.location.reload();
	    }, 50);
	}.bind(this));
	/* XXX arik hack: need good tooltip framework */
        var $a = $('<a>', {text: T.locale!='en' ? T('Improve translation') :
            T('Translate to your language'),
            target: '_blank', class: this.className+'_improve',
            href: 'https://hola.org/translate.html#improve='+T.locale});
        var $div = $('<div>').append($a);
        options.label.tooltip({
            html: true,
            title: $div.html(),
            placement: 'left',
            delay: {show: 500, hide: 2000}
        });
    },
});

return E; });
