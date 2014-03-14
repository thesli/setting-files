// Generated by CoffeeScript 1.6.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BH.Models.DayHistory = (function(_super) {

    __extends(DayHistory, _super);

    function DayHistory() {
      return DayHistory.__super__.constructor.apply(this, arguments);
    }

    DayHistory.include(BH.Modules.I18n);

    DayHistory.include(BH.Modules.Worker);

    DayHistory.prototype.initialize = function(attrs, options) {
      this.chromeAPI = chrome;
      this.settings = options.settings;
      return this.historyQuery = new BH.Lib.HistoryQuery(this.chromeAPI);
    };

    DayHistory.prototype.sync = function(method, model, options) {
      var _this = this;
      switch (method) {
        case 'read':
          this.set({
            history: [],
            silent: true
          });
          return this.historyQuery.run(this.toChrome(), function(history) {
            return _this.preparse(history, options.success);
          });
        case 'delete':
          return this.chromeAPI.history.deleteRange(this.toChrome(false), function() {
            return _this.set({
              history: _this.defaults.history
            });
          });
      }
    };

    DayHistory.prototype.toChrome = function(reading) {
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

    DayHistory.prototype.toTemplate = function() {
      return {
        history: this.get('history').map(function(interval) {
          return interval.toTemplate();
        })
      };
    };

    DayHistory.prototype.sod = function() {
      return new Date(this.get('date').sod()).getTime();
    };

    DayHistory.prototype.eod = function() {
      return new Date(this.get('date').eod()).getTime();
    };

    DayHistory.prototype.preparse = function(results, callback) {
      var options,
        _this = this;
      options = {
        visits: results,
        interval: this.settings.get('timeGrouping')
      };
      return this.worker('timeGrouper', options, function(history) {
        if (_this.settings.get('domainGrouping')) {
          options = {
            intervals: history
          };
          return _this.worker('domainGrouper', options, function(history) {
            return callback(history);
          });
        } else {
          return callback(history);
        }
      });
    };

    DayHistory.prototype.parse = function(data) {
      var interval, intervals, visit, visits, _i, _j, _len, _len1, _ref;
      intervals = new BH.Collections.Intervals();
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        interval = data[_i];
        visits = new BH.Collections.Visits();
        _ref = interval.visits;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          visit = _ref[_j];
          if (_.isArray(visit)) {
            visits.add(new BH.Models.GroupedVisit(visit));
          } else {
            visits.add(new BH.Models.Visit(visit));
          }
        }
        intervals.add({
          id: interval.id,
          datetime: interval.datetime,
          visits: visits
        }, {
          settings: this.settings
        });
      }
      return {
        history: intervals
      };
    };

    return DayHistory;

  })(BH.Models.History);

}).call(this);
