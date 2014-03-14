//@ sourceMappingURL=weeks_history.map
// Generated by CoffeeScript 1.6.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BH.Models.WeeksHistory = (function(_super) {

    __extends(WeeksHistory, _super);

    function WeeksHistory() {
      return WeeksHistory.__super__.constructor.apply(this, arguments);
    }

    WeeksHistory.include(BH.Modules.I18n);

    WeeksHistory.include(BH.Modules.Worker);

    WeeksHistory.prototype.initialize = function() {
      this.chromeAPI = chrome;
      return this.historyQuery = new BH.Lib.HistoryQuery(this.chromeAPI);
    };

    WeeksHistory.prototype.sync = function(method, model, options) {
      var _this = this;
      switch (method) {
        case 'read':
          return this.historyQuery.run(this.toChrome(), function(results) {
            return _this.preparse(results, options.success);
          });
        case 'delete':
          return this.chromeAPI.history.deleteRange(this.toChrome(false), function() {
            return _this.set({
              history: {}
            });
          });
      }
    };

    WeeksHistory.prototype.toChrome = function(reading) {
      var properties;
      if (reading == null) {
        reading = true;
      }
      properties = {
        startTime: this.sod(),
        endTime: this.eod()
      };
      if (reading) {
        properties.text = '';
      }
      return properties;
    };

    WeeksHistory.prototype.sod = function() {
      return new Date(this.get('startDate').sod()).getTime();
    };

    WeeksHistory.prototype.eod = function() {
      return new Date(this.get('endDate').eod()).getTime();
    };

    WeeksHistory.prototype.preparse = function(results, callback) {
      return this.worker('dayGrouper', {
        visits: results
      }, function(history) {
        return callback(history);
      });
    };

    WeeksHistory.prototype.parse = function(data) {
      return {
        history: data
      };
    };

    return WeeksHistory;

  })(BH.Models.History);

}).call(this);
