// Generated by CoffeeScript 1.6.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BH.Views.ServerErrorView = (function(_super) {

    __extends(ServerErrorView, _super);

    function ServerErrorView() {
      return ServerErrorView.__super__.constructor.apply(this, arguments);
    }

    ServerErrorView.include(BH.Modules.I18n);

    ServerErrorView.prototype.className = 'server_error_view';

    ServerErrorView.prototype.template = BH.Templates['server_error'];

    ServerErrorView.prototype.events = {
      'click .okay': 'okayClicked'
    };

    ServerErrorView.prototype.initialize = function() {
      this.chromeAPI = chrome;
      this.tracker = this.options.tracker;
      return this.attachGeneralEvents();
    };

    ServerErrorView.prototype.render = function() {
      this.$el.html(this.renderTemplate(this.getI18nValues()));
      return this;
    };

    ServerErrorView.prototype.okayClicked = function(ev) {
      ev.preventDefault();
      return this.close();
    };

    ServerErrorView.prototype.getI18nValues = function() {
      return this.t(['prompt_okay_button', 'server_error_title', 'server_error_description']);
    };

    return ServerErrorView;

  })(BH.Views.ModalView);

}).call(this);