//@ sourceMappingURL=week_history.map
// Generated by CoffeeScript 1.6.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BH.Chrome.WeekHistory = (function(_super) {

    __extends(WeekHistory, _super);

    function WeekHistory(date) {
      date.setHours(0, 0, 0, 0);
      this.startTime = date.getTime();
      date = new Date(date.getTime() + (6 * 86400000));
      date.setHours(23, 59, 59, 999);
      this.endTime = date.getTime();
      this.chromeAPI = chrome;
      this.worker = BH.Modules.Worker.worker;
    }

    WeekHistory.prototype.fetch = function() {
      var options,
        _this = this;
      options = {
        startTime: this.startTime,
        endTime: this.endTime,
        text: '',
        maxResults: 5000
      };
      return this.chromeAPI.history.search(options, function(results) {
        options = {
          options: options,
          results: results
        };
        return _this.worker('rangeSanitizer', options, function(sanitizedResults) {
          return _this.worker('dayGrouper', {
            visits: sanitizedResults
          }, function(history) {
            return _this.trigger('query:complete', [history]);
          });
        });
      });
    };

    WeekHistory.prototype.destroy = function() {
      var options,
        _this = this;
      options = {
        startTime: this.startTime,
        endTime: this.endTime
      };
      return this.chromeAPI.history.deleteRange(options, function() {
        return _this.trigger('destroy:complete');
      });
    };

    return WeekHistory;

  })(EventEmitter);

}).call(this);
