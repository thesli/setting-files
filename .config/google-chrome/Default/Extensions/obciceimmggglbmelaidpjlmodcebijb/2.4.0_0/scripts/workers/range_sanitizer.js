// Generated by CoffeeScript 1.6.1
(function() {
  var _ref;

  this.BH = typeof BH !== "undefined" && BH !== null ? BH : {};

  BH.Workers = (_ref = BH.Workers) != null ? _ref : {};

  BH.Workers.RangeSanitizer = (function() {

    function RangeSanitizer() {}

    RangeSanitizer.prototype.run = function(results, options) {
      var prunedResults, result, _i, _len;
      this.options = options;
      prunedResults = [];
      for (_i = 0, _len = results.length; _i < _len; _i++) {
        result = results[_i];
        if (this.verifyDateRange(result)) {
          result.location = result.url;
          this.removeScriptTags(result);
          prunedResults.push(result);
        }
      }
      prunedResults.sort(this.sortByTime);
      return prunedResults;
    };

    RangeSanitizer.prototype.verifyDateRange = function(result) {
      return result.lastVisitTime > this.options.startTime && result.lastVisitTime < this.options.endTime;
    };

    RangeSanitizer.prototype.removeScriptTags = function(result) {
      var property, regex, _i, _len, _ref1, _results;
      regex = /<(.|\n)*?>/ig;
      _ref1 = ['title', 'url', 'location'];
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        property = _ref1[_i];
        _results.push(result[property] = result[property].replace(regex, ""));
      }
      return _results;
    };

    RangeSanitizer.prototype.setAdditionalProperties = function(result) {
      return result.location = result.url;
    };

    RangeSanitizer.prototype.sortByTime = function(a, b) {
      if (a.lastVisitTime > b.lastVisitTime) {
        return -1;
      }
      if (a.lastVisitTime < b.lastVisitTime) {
        return 1;
      }
      return 0;
    };

    return RangeSanitizer;

  })();

  if (typeof onServer === "undefined" || onServer === null) {
    self.addEventListener('message', function(e) {
      var sanitizer;
      sanitizer = new BH.Workers.RangeSanitizer();
      return postMessage(sanitizer.run(e.data.results, e.data.options));
    });
  }

}).call(this);
