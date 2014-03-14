//@ sourceMappingURL=initial_syncing_view.map
// Generated by CoffeeScript 1.6.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BH.Views.InitialSyncingView = (function(_super) {

    __extends(InitialSyncingView, _super);

    function InitialSyncingView() {
      return InitialSyncingView.__super__.constructor.apply(this, arguments);
    }

    InitialSyncingView.include(BH.Modules.I18n);

    InitialSyncingView.prototype.className = 'initial_syncing_view';

    InitialSyncingView.prototype.template = BH.Templates['initial_syncing'];

    InitialSyncingView.prototype.events = {
      'click .continue': 'continueClicked'
    };

    InitialSyncingView.prototype.initialize = function() {
      this.chromeAPI = chrome;
      this.tracker = analyticsTracker;
      return this.attachGeneralEvents();
    };

    InitialSyncingView.prototype.render = function() {
      this.$el.html(this.renderTemplate(this.getI18nValues()));
      this.tracker.syncAutomaticModalSeen();
      return this;
    };

    InitialSyncingView.prototype.continueClicked = function(ev) {
      ev.preventDefault();
      this.close();
      return window.location.reload();
    };

    InitialSyncingView.prototype.doneSyncing = function() {
      this.$('.continue').removeAttr('disabled');
      this.$('.syncing').hide();
      this.$('.done_syncing').show();
      this.$('.website_plug').show();
      this.$('.title').remove();
      this.$('.content-area').css({
        marginTop: 26
      });
      return this.trigger('syncingComplete');
    };

    InitialSyncingView.prototype.getI18nValues = function() {
      var properties;
      properties = this.t(['initial_syncing_title', 'continue_button', 'initial_syncing_description']);
      properties.i18n_initial_syncing_done = this.t('initial_syncing_done', ['<a href="http://www.better-history.com/me">', '</a>']);
      return properties;
    };

    return InitialSyncingView;

  })(BH.Views.ModalView);

}).call(this);
