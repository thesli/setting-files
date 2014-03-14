// Generated by CoffeeScript 1.6.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BH.Collections.Tags = (function(_super) {

    __extends(Tags, _super);

    function Tags() {
      return Tags.__super__.constructor.apply(this, arguments);
    }

    Tags.prototype.model = BH.Models.Tag;

    Tags.prototype.initialize = function() {
      if (user.isLoggedIn()) {
        return this.on('sync', this.sync);
      }
    };

    Tags.prototype.fetch = function(callback) {
      var _this = this;
      if (callback == null) {
        callback = function() {};
      }
      return persistence.tag().fetchTags(function(tags, compiledTags) {
        _this.tagOrder = tags;
        _this.reset(compiledTags);
        return callback();
      });
    };

    Tags.prototype.destroy = function(callback) {
      var _this = this;
      if (callback == null) {
        callback = function() {};
      }
      return persistence.tag().removeAllTags(function() {
        chrome.runtime.sendMessage({
          action: 'calculate hash'
        });
        callback();
        return _this.trigger('sync', {
          operation: 'destroy'
        });
      });
    };

    Tags.prototype.sync = function(options) {
      switch (options.operations) {
        case 'destroy':
          return persistence.remote().deleteSites();
      }
    };

    return Tags;

  })(Backbone.Collection);

}).call(this);