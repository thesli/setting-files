//@ sourceMappingURL=search.map
// Generated by CoffeeScript 1.6.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BH.Models.Search = (function(_super) {

    __extends(Search, _super);

    function Search() {
      return Search.__super__.constructor.apply(this, arguments);
    }

    Search.prototype.defaults = function() {
      return {
        query: ''
      };
    };

    Search.prototype.validQuery = function() {
      return this.get('query') !== '';
    };

    Search.prototype.parseAndSet = function(data) {
      var visit, visits, _i, _len;
      visits = new BH.Collections.Visits();
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        visit = data[_i];
        visits.add(new BH.Models.Visit(visit));
      }
      return this.set({
        history: visits
      });
    };

    return Search;

  })(Backbone.Model);

}).call(this);