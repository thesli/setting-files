// LICENSE_CODE ZON
'use strict'; /*jslint browser:true, -W064*/
var is_be = /^(chrome-extension|resource):\/\//.test(location.href);
define(['backbone', 'underscore', 'jquery', 'etask']
    .concat(is_be ? ['be_locale', 'be_util', 'svc_util'] : ['localize']),
    function(Backbone, _, $, etask, T, be_util, zutil){
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
        var _this = this, is_member;
        return etask([function(){
            if (!user)
            {
                _this.clear();
                return this.ereturn();
            }
            return _this.options.be_premium.ecall('membership_valid');
        }, function(_is_member){
            is_member = _is_member;
            return _this.options.be_premium.ecall('is_paid');
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
    className: 'user-status nav navbar-nav navbar-right',
    initialize: function(options){
        this.options = options||{};
        _.bindAll(this, 'logout');
        this.listenTo(this.model, 'change', this.render);
        this.prot = options.bext ? 'https:' : '';
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
        return $('<a class="navbar-link user_link" id="sign_in"></a>')
            .text(T('Log in'))
            .attr('href', this.prot+'//hola.org/signin.html');
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
            $('<li>').append(this.login_link()).appendTo(this.$el);
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
                +' <span class="caret"></span></button></li>');
            $ul = $('<ul class="dropdown-menu pull-right" role="menu">')
            .appendTo($dropdown);
            if (display_name)
            {
                $ul.append('<li class="disabled"><a role="menuitem" '
                    +'tabindex="-1" '
                    +'href="#" style="cursor: context-menu;">Account type: '
                    +(is_member ? 'Premium' : 'Free')+'</p></li>');
                $ul.append('<li><a class="user_link" '
                    +'href="https://hola.org/my_account.html">Account</a>'
                    +'</li>');
            }
            else if (this.options.login)
                $('<li>').append(this.login_link()).appendTo($ul);
            $li = $('<li><a class="user_link">Settings</a></li>')
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
