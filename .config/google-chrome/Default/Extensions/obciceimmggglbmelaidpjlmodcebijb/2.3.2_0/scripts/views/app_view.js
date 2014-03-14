// Generated by CoffeeScript 1.6.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BH.Views.AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.include(BH.Modules.I18n);

    AppView.prototype.className = 'app_view';

    AppView.prototype.template = BH.Templates['app'];

    AppView.prototype.initialize = function() {
      this.chromeAPI = chrome;
      this.settings = this.options.settings;
      this.collection.reload(this.settings.get('startingWeekDay'));
      this.options.state.on('change', this.onStateChanged, this);
      this.settings.on('change:startingWeekDay', this.onStartingWeekDayChanged, this);
      this.settings.on('change:weekDayOrder', this.onWeekDayOrderChanged, this);
      this.collection.on('reloaded', this.onWeeksReloaded, this);
      return this.cache = new BH.Views.Cache(this.options);
    };

    AppView.prototype.render = function() {
      var html;
      html = Mustache.to_html(this.template, this.getI18nValues());
      this.$el.html(html);
      this.renderMenu();
      return this;
    };

    AppView.prototype.renderMenu = function() {
      var menuView;
      menuView = new BH.Views.MenuView({
        el: '.menu_view',
        collection: this.collection
      });
      return menuView.render();
    };

    AppView.prototype.onStateChanged = function() {
      return this.options.state.save();
    };

    AppView.prototype.onStartingWeekDayChanged = function() {
      return this.reloadWeeks();
    };

    AppView.prototype.onWeeksReloaded = function() {
      return this.renderMenu();
    };

    AppView.prototype.onWeekDayOrderChanged = function() {
      this.reloadWeeks();
      return this.cache.expire();
    };

    AppView.prototype.reloadWeeks = function() {
      this.collection.reset();
      return this.collection.reload(this.settings.get('startingWeekDay'));
    };

    AppView.prototype.loadTags = function() {
      this.updateMenuSelection();
      this.$('.menu .tags').parent().addClass('selected');
      return this.cache.tagsView();
    };

    AppView.prototype.loadTag = function(id) {
      this.updateMenuSelection();
      this.$('.menu .tags').parent().addClass('selected');
      return this.cache.tagView(id);
    };

    AppView.prototype.loadWeek = function(id) {
      this.updateMenuSelection(id);
      return this.cache.weekView(id);
    };

    AppView.prototype.loadDay = function(id) {
      var startingWeekDay, weekId;
      startingWeekDay = this.settings.get('startingWeekDay');
      weekId = moment(id).past(startingWeekDay, 0).id();
      this.updateMenuSelection(weekId);
      return this.cache.dayView(id);
    };

    AppView.prototype.loadSettings = function() {
      this.updateMenuSelection();
      this.$('.menu .setting').parent().addClass('selected');
      return this.cache.settingsView();
    };

    AppView.prototype.loadSearch = function(options) {
      if (options == null) {
        options = {};
      }
      this.updateMenuSelection();
      return this.cache.searchView(options);
    };

    AppView.prototype.updateMenuSelection = function(id) {
      this.$('.menu > *').removeClass('selected');
      if (id != null) {
        return this.$("[data-week-id='" + id + "']").addClass('selected');
      }
    };

    AppView.prototype.getI18nValues = function() {
      return this.t(['history_title', 'settings_link', 'tags_link']);
    };

    return AppView;

  })(Backbone.View);

}).call(this);