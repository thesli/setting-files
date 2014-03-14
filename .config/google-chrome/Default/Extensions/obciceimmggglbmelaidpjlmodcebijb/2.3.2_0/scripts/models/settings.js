// Generated by CoffeeScript 1.6.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BH.Models.Settings = (function(_super) {

    __extends(Settings, _super);

    function Settings() {
      return Settings.__super__.constructor.apply(this, arguments);
    }

    Settings.include(BH.Modules.I18n);

    Settings.prototype.storeName = 'settings';

    Settings.prototype.defaults = function() {
      return {
        timeGrouping: 15,
        domainGrouping: true,
        searchByDomain: true,
        searchBySelection: true,
        openLocation: 'last_visit',
        startingWeekDay: 'Monday',
        weekDayOrder: 'ascending'
      };
    };

    Settings.prototype.initialize = function() {
      return this.chromeAPI = chrome;
    };

    Settings.prototype.toTemplate = function() {
      var properties,
        _this = this;
      properties = {
        startingWeekDays: [],
        openLocations: [],
        timeGroupings: [],
        weekDayOrders: [],
        searchBySelection: this.get('searchBySelection'),
        searchByDomain: this.get('searchByDomain'),
        domainGrouping: this.get('domainGrouping')
      };
      _(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']).each(function(day) {
        return properties.startingWeekDays.push({
          text: _this.t(day),
          value: day
        });
      });
      _(['last_visit', 'current_day', 'current_week']).each(function(location) {
        return properties.openLocations.push({
          text: _this.t(location),
          value: location
        });
      });
      _(['descending', 'ascending']).each(function(order) {
        return properties.weekDayOrders.push({
          text: _this.t(order),
          value: order
        });
      });
      _([15, 30, 60]).each(function(timeGrouping) {
        return properties.timeGroupings.push({
          text: _this.t("" + timeGrouping + "_minutes_option"),
          value: timeGrouping
        });
      });
      return properties;
    };

    return Settings;

  })(Backbone.Model);

}).call(this);