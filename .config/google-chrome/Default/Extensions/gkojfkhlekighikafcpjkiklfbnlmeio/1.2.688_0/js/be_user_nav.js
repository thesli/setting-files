// LICENSE_CODE ZON
'use strict'; /*jslint browser:true, -W064*/
var is_be = /^(chrome-extension|resource):\/\//.test(location.href) ||
    /\/be_test.html$/.test(top.location.pathname);
var is_wbm = /^http:\/\/zserver-wbm/.test(location.href);
var requires = ['backbone', 'underscore', 'jquery', 'etask'];
if (is_be)
{
    requires = requires.concat(['be_locale', 'be_util', 'svc_util',
        'be_ui_obj']);
}
else if (!is_wbm)
    requires = requires.concat(['localize']);
define(requires, function(Backbone, _, $, etask, T, be_util, zutil, be_ui_obj){
if (is_wbm)
    T = function(s){ return s; };
var E = {};
var get_premium_html =
    '<li class="hidden-xs"><a href="https://hola.org/referral.html?ref=home" '
    +'class="navbar-link upgrade_to_premium user_link">'+T('Get Free Premium')
    +'</a></li>';
var sign_up_html =
    '<li><button type="button" class="btn btn-signup navbar-btn" '
    +'id="sign_up">'+T('Sign up')+'</button></li>';

E.user_status = Backbone.Model.extend({
    initialize: function(){
        if ($.cookie('user'))
        {
            this.update_from_cookie();
            return;
        }
        $.get('/users/get_user').done(_.bind(function(res){
            this.update_from_cookie(); }, this));
    },
    update_from_cookie: function(){
        var cookie = JSON.parse($.cookie('user'));
        this.set('display_name', cookie.display_name);
        this.set('is_member', cookie.is_member);
        this.set('verified', cookie.verified);
        this.set('is_paid', cookie.is_paid);
    }
});

// Extension handles user status differently because it can't read hola.org
// cookies
E.be_user_status = Backbone.Model.extend({
    initialize: function(options){
        this.options = options||{};
        this.refresh();
    },
    refresh: function(){
        return $.ajax({url: 'https://hola.org/users/get_user',
            xhrFields: {withCredentials: true}})
       .done(_.bind(function(res){ this.update(res.user); }, this));
    },
    update: function(user){
        var _this = this, is_member, be_premium = _this.options.be_premium;
        return etask([function(){
            if (!user)
            {
                _this.clear();
                return this.ereturn();
            }
            return be_premium ? be_premium.ecall('membership_valid') : null;
        }, function(_is_member){
            is_member = _is_member;
            return be_premium ? be_premium.ecall('is_paid') : null;
        }, function(is_paid){
            _this.set('display_name', user.displayName);
            _this.set('verified', user.verified);
            _this.set('is_member', is_member);
            _this.set('is_paid', is_paid);
        }]);
    }
});

E.user_links = Backbone.View.extend({
    tagName: 'ul',
    className: 'user-status nav navbar-nav navbar-right'
});

/* XXX amir: create base object and move common www and be code to it */
E.www_user_links = E.user_links.extend({
    initialize: function(options){
        this.options = options||{};
        _.bindAll(this, 'logout');
        this.listenTo(this.model, 'change', this.render);
        this.prot = options.bext ? 'https:' : '';
        if (this.options.bext &&
            zutil.version_cmp(be_util.version(), '1.2.672')>=0)
        {
            this.$el.addClass('pull-right');
        }
        this.render();
    },
    logout: function(event){
        var _this = this;
        event.preventDefault();
        return $.ajax({url: this.prot+'//hola.org/users/logout/inline',
            type: 'POST', xhrFields: {withCredentials: true}}).done(function(){
            if (_this.options.bext)
                _this.model.refresh();
            else
                location.href = "/";
        });
    },
    login_link: function(event){
        return $('<a class="user_link" id="sign_in"></a>')
            .text(T('Log in'))
            .attr('href', this.prot+'//hola.org/signin.html');
    },
    add_lang: function($ul){
        var lang_list, $a, $li;
        if (!this.options.lang_select ||
            zutil.version_cmp(be_util.version(), '1.2.672')<0)
        {
            return;
        }
        $li = $('<li>');
        $a = $('<a href="#">Language</a>').click(function(e){
            e.preventDefault();
            $('.lang_dropdown_toggle').dropdown('toggle');
            e.stopPropagation();
        }).appendTo($li);
        $ul.append($li);
        lang_list = new be_ui_obj.lang_list({label: $a});
        $('.l_ui_obj_lang_list').remove();
        $('body').append(lang_list.$el);
    },
    render: function(){
        var display_name = this.model.get('display_name');
        var is_member = this.model.get('is_member');
        var is_paid = this.model.get('is_paid');
        var $li, $ul, $dropdown, _this = this;
        this.$el.empty();
        if (!this.options.bext)
            this.$el.empty().append(get_premium_html);
        if (!display_name && !this.options.bext)
        {
            $('<li>').append(this.login_link().addClass('navbar-link'))
            .appendTo(this.$el);
            this.$el.append(sign_up_html);
        }
        else
        {
            var name = display_name ? display_name : T('Account');
            /* XXX amir: find a better way to link to https pages */
            $dropdown = $('<li>'
                +'<a '+(display_name ? 'title="'+name+'" ' : "")
                +'class="dropdown-toggle navbar-link" '
                +'data-toggle="dropdown" href="#">'+name
                +' <span class="caret"></span></li>');
            $ul = $('<ul class="dropdown-menu pull-right" role="menu">')
            .appendTo($dropdown);
            if (display_name)
            {
                $ul.append('<li class="disabled"><a role="menuitem" '
                    +'tabindex="-1" '
                    +'href="#" style="cursor: context-menu;">Account type: '
                    +(is_member ? 'Premium' : 'Free')+'</li>');
                $ul.append('<li><a class="user_link" '
                    +'href="https://hola.org/my_account.html">My Account</a>'
                    +'</li>');
            }
            else if (this.options.login)
                $('<li>').append(this.login_link()).appendTo($ul);
            $li = $('<li><a class="user_link">My Settings</a></li>')
            .appendTo($ul);
            if (this.options.bext)
            {
                $li.find('a').click(function(e){
                    e.preventDefault();
                    _this.options.settings_handler();
                }).attr('href', '#');
            }
            else
                $li.find('a').attr('href', '//hola.org/unblock/my/settings');
            if (this.options.version_tooltip)
                this.options.version_tooltip.append_to($li.find('a'));
            if (this.options.upgrade)
            {
                $ul.append(!is_member ? '<li><a class="user_link" '
                    +'href="https://hola.org/premium.html?'
                    +'ref='+(this.options.bext ? 'be_' : '')+'user_nav">'
                    +'Upgrade</a></li>' : '');
            }
            this.add_lang($ul);
            if (this.options.bext &&
                zutil.version_cmp(be_util.version(), '1.2.661')>=0)
            {
                $('<li><a class="user_link" '
                    +'href="#">About Hola</a></li>').click(function(e){
                    e.preventDefault();
                    be_util.open_be_tab({url: 'be_about.html'});
                }).appendTo($ul);
            }
            if (display_name)
            {
                $ul.append('<li class="divider"></li>');
                $('<li><a href="?" class="user_link" id=logout_lnk>'
                    +T('Log out')+'</a></li>').click(this.logout)
                .appendTo($ul);
            }
	    this.$el.append($dropdown);
            this.$('.upgrade_to_premium').css('visibility',
                is_member&&is_paid ? 'hidden' : 'visible');
        }
        if (this.options.bext)
            this.$('.user_link').attr('target', '_blank');
    }
});

E.be_user_links = E.user_links.extend({
    initialize: function(options){
        this.options = options||{};
        _.bindAll(this, 'logout');
        this.listenTo(this.model, 'change', this.render);
        this.prot = options.bext ? 'https:' : '';
        if (this.options.bext &&
            zutil.version_cmp(be_util.version(), '1.2.672')>=0)
        {
            this.$el.addClass('pull-right');
        }
        this.render();
    },
    logout: function(event){
        var _this = this;
        event.preventDefault();
        return $.ajax({url: this.prot+'//hola.org/users/logout/inline',
            type: 'POST', xhrFields: {withCredentials: true}}).done(function(){
            if (_this.options.bext)
                _this.model.refresh();
            else
                location.href = "/";
        });
    },
    login_link: function(event){
        return $('<a class="user_link" id="sign_in"></a>')
            .text(T('Log in'))
            .attr('href', this.prot+'//hola.org/signin.html');
    },
    add_lang: function($ul){
        var lang_list, $a, $li;
        if (!this.options.lang_select ||
            zutil.version_cmp(be_util.version(), '1.2.672')<0)
        {
            return;
        }
        $li = $('<li>');
        $a = $('<a href="#">Language</a>').click(function(e){
            e.preventDefault();
            $('.lang_dropdown_toggle').dropdown('toggle');
            e.stopPropagation();
        }).appendTo($li);
        $ul.append($li);
        lang_list = new be_ui_obj.lang_list({label: $a});
        $('.l_ui_obj_lang_list').remove();
        $('body').append(lang_list.$el);
    },
    render: function(){
        var display_name = this.model.get('display_name');
        var is_member = this.model.get('is_member');
        var is_paid = this.model.get('is_paid');
        var $li, $ul, $dropdown, _this = this;
        this.$el.empty();
        if (!this.options.bext)
            this.$el.empty().append(get_premium_html);
        if (!display_name && !this.options.bext)
        {
            $('<li>').append(this.login_link().addClass('navbar-link'))
            .appendTo(this.$el);
            this.$el.append(sign_up_html);
        }
        else
        {
            /* XXX amir: find a better way to link to https pages */
            $dropdown = $('<li>'
                +'<a '+(display_name ? 'title="'+T('Account')+'" ' : "")
                +'class="dropdown-toggle navbar-link" '
                +'data-toggle="dropdown" href="#">'+T('Account')
                +' <span class="caret"></span></li>');
            $ul = $('<ul class="dropdown-menu pull-right" role="menu">')
            .appendTo($dropdown);
            if (display_name)
            {
                $ul.append('<li class="disabled"><a role="menuitem" '
                    +'tabindex="-1" '
                    +'href="#" style="cursor: context-menu;">'+display_name
                    +'</li>');
                $ul.append('<li><a class="user_link" '
                    +'href="https://hola.org/my_account.html">My Account: '
                    +(is_member ? 'Premium' : 'Free')+'</li>');
            }
            else if (this.options.login)
                $('<li>').append(this.login_link()).appendTo($ul);
            $li = $('<li><a class="user_link">My Settings</a></li>')
            .appendTo($ul);
            if (this.options.bext)
            {
                $li.find('a').click(function(e){
                    e.preventDefault();
                    _this.options.settings_handler();
                }).attr('href', '#');
            }
            else
                $li.find('a').attr('href', '//hola.org/unblock/my/settings');
            if (this.options.version_tooltip)
                this.options.version_tooltip.append_to($li.find('a'));
            if (this.options.upgrade)
            {
                $ul.append(!is_member ? '<li><a class="user_link" '
                    +'href="https://hola.org/premium.html?'
                    +'ref='+(this.options.bext ? 'be_' : '')+'user_nav">'
                    +'Upgrade</a></li>' : '');
            }
            this.add_lang($ul);
            if (this.options.bext &&
                zutil.version_cmp(be_util.version(), '1.2.661')>=0)
            {
                $('<li><a class="user_link" '
                    +'href="#">About Hola</a></li>').click(function(e){
                    e.preventDefault();
                    be_util.open_be_tab({url: 'be_about.html'});
                }).appendTo($ul);
            }
            if (display_name)
            {
                $ul.append('<li class="divider"></li>');
                $('<li><a href="?" class="user_link" id=logout_lnk>'
                    +T('Log out')+'</a></li>').click(this.logout)
                .appendTo($ul);
            }
	    this.$el.append($dropdown);
            this.$('.upgrade_to_premium').css('visibility',
                is_member&&is_paid ? 'hidden' : 'visible');
        }
        if (this.options.bext)
            this.$('.user_link').attr('target', '_blank');
    }
});

return E; });
