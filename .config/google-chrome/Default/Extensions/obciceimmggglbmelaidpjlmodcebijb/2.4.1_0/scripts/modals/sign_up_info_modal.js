// Generated by CoffeeScript 1.6.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BH.Modals.SignUpInfoModal = (function(_super) {

    __extends(SignUpInfoModal, _super);

    function SignUpInfoModal() {
      return SignUpInfoModal.__super__.constructor.apply(this, arguments);
    }

    SignUpInfoModal.include(BH.Modules.I18n);

    SignUpInfoModal.prototype.className = 'sign_up_info_view';

    SignUpInfoModal.prototype.template = BH.Templates['sign_up_info'];

    SignUpInfoModal.prototype.events = {
      'click .continue': 'continueClicked',
      'click .cancel': 'cancelClicked'
    };

    SignUpInfoModal.prototype.initialize = function() {
      this.chromeAPI = chrome;
      this.tracker = analyticsTracker;
      return this.attachGeneralEvents();
    };

    SignUpInfoModal.prototype.render = function() {
      var _this = this;
      this.$el.html(this.renderTemplate(this.getI18nValues()));
      $.ajax({
        url: "http://" + apiHost + "/purchase",
        contentType: 'application/json',
        dataType: 'json',
        success: function(data) {
          if (data.open) {

          } else {
            return _this.closeRegistration();
          }
        },
        error: function() {
          return _this.closeRegistration();
        }
      });
      this.tracker.getStartedSyncingModalSeen();
      return this;
    };

    SignUpInfoModal.prototype.closeRegistration = function() {
      this.$('.continue').remove();
      this.$('.cancel').remove();
      this.$('.action-area').text(this.t('sign_up_temporarily_closed'));
      return this.$('.action-area').css({
        color: 'red'
      });
    };

    SignUpInfoModal.prototype.cancelClicked = function(ev) {
      ev.preventDefault();
      this.close();
      return this.tracker.getStartedSyncingCancelClicked();
    };

    SignUpInfoModal.prototype.continueClicked = function(ev) {
      var userProcessor;
      ev.preventDefault();
      this.close();
      this.tracker.getStartedSyncingContinueClicked();
      userProcessor = new BH.Lib.UserProcessor();
      userProcessor.start();
      return $('.login_spinner').show();
    };

    SignUpInfoModal.prototype.getI18nValues = function() {
      var properties;
      properties = this.t(['prompt_cancel_button', 'continue_button', 'sign_up_info_title', 'sign_up_info_description', 'sign_up_info_price', 'sign_up_info_question']);
      properties.i18n_sign_up_info_bullets = this.t('sign_up_info_bullets', ['<li>', '</li>', '<a href="http://better-history.com">', '</a>']);
      return properties;
    };

    return SignUpInfoModal;

  })(BH.Modals.Base);

}).call(this);