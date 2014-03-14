// Generated by CoffeeScript 1.6.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BH.Views.RenameTagView = (function(_super) {

    __extends(RenameTagView, _super);

    function RenameTagView() {
      return RenameTagView.__super__.constructor.apply(this, arguments);
    }

    RenameTagView.include(BH.Modules.I18n);

    RenameTagView.prototype.className = 'rename_tag_view';

    RenameTagView.prototype.template = BH.Templates['rename_tag'];

    RenameTagView.prototype.events = {
      'click .cancel': 'cancelClicked',
      'click .rename': 'renameClicked'
    };

    RenameTagView.prototype.initialize = function() {
      this.chromeAPI = chrome;
      this.tracker = this.options.tracker;
      return this.attachGeneralEvents();
    };

    RenameTagView.prototype.render = function() {
      this.$el.html(this.renderTemplate(this.getI18nValues()));
      return this;
    };

    RenameTagView.prototype.cancelClicked = function(ev) {
      ev.preventDefault();
      return this.close();
    };

    RenameTagView.prototype.renameClicked = function(ev) {
      var tag,
        _this = this;
      ev.preventDefault();
      tag = this.$('input.new_tag').val();
      tag = tag.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
      if (tag.length === 0) {
        return false;
      }
      return this.model.renameTag(this.$('input.new_tag').val(), function() {
        _this.tracker.tagRenamed();
        return _this.close();
      });
    };

    RenameTagView.prototype.getI18nValues = function() {
      var properties;
      properties = this.t(['rename_tag_button', 'prompt_cancel_button', 'new_tag_placeholder']);
      properties['i18n_rename_tag_title'] = this.t('rename_tag_title', [this.model.get('name')]);
      return properties;
    };

    return RenameTagView;

  })(BH.Views.ModalView);

}).call(this);