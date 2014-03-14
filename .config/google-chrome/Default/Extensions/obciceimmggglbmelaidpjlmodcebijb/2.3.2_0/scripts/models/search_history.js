// Generated by CoffeeScript 1.6.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BH.Models.SearchHistory = (function(_super) {

    __extends(SearchHistory, _super);

    function SearchHistory() {
      return SearchHistory.__super__.constructor.apply(this, arguments);
    }

    SearchHistory.include(BH.Modules.I18n);

    SearchHistory.prototype.initialize = function() {
      return this.historyQuery = new BH.Lib.HistoryQuery(this.chromeAPI);
    };

    SearchHistory.prototype.sync = function(method, model, options) {
      if (method === 'read') {
        return this.historyQuery.run(this.toChrome(), function(history) {
          return options.success(history);
        });
      }
    };

    SearchHistory.prototype.toTemplate = function(start, end) {
      return this.get('history').toTemplate(start, end);
    };

    SearchHistory.prototype.toChrome = function() {
      return {
        text: this.get('query'),
        searching: true
      };
    };

    SearchHistory.prototype.parse = function(data) {
      var visit, visits, _i, _len;
      visits = new BH.Collections.Visits();
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        visit = data[_i];
        visits.add(new BH.Models.Visit(visit));
      }
      return {
        history: visits
      };
    };

    return SearchHistory;

  })(BH.Models.History);

}).call(this);
