// Generated by CoffeeScript 1.6.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BH.Models.Site = (function(_super) {

    __extends(Site, _super);

    function Site() {
      return Site.__super__.constructor.apply(this, arguments);
    }

    Site.prototype.fetch = function(callback) {
      var _this = this;
      if (callback == null) {
        callback = function() {};
      }
      return persistence.tag().fetchSiteTags(this.get('url'), function(tags) {
        _this.set({
          tags: tags
        });
        _this.trigger('reset:tags');
        return callback();
      });
    };

    Site.prototype.tags = function() {
      return this.get('tags');
    };

    Site.prototype.addTag = function(tag, callback) {
      var newTags, site,
        _this = this;
      if (callback == null) {
        callback = function() {};
      }
      tag = tag.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
      if (tag.length === 0 || tag.match(/[\"\'\~\,\.\|\(\)\{\}\[\]\;\:\<\>\^\*\%\^]/) || this.get('tags').indexOf(tag) !== -1) {
        callback(false, null);
        return;
      }
      newTags = _.clone(this.get('tags'));
      newTags.push(tag);
      this.set({
        tags: newTags,
        datetime: new Date().getTime()
      });
      site = {
        url: this.get('url'),
        title: this.get('title'),
        datetime: this.get('datetime')
      };
      return persistence.tag().addSiteToTag(site, tag, function(operations) {
        chrome.runtime.sendMessage({
          action: 'calculate hash'
        });
        _this.sync();
        return callback(true, operations);
      });
    };

    Site.prototype.sync = function() {
      var _this = this;
      if (user.isLoggedIn()) {
        return BH.Lib.ImageData.base64("chrome://favicon/" + (this.get('url')), function(data) {
          return persistence.remote().updateSite({
            url: _this.get('url'),
            title: _this.get('title'),
            datetime: _this.get('datetime'),
            tags: _this.get('tags'),
            image: data
          });
        });
      }
    };

    Site.prototype.removeTag = function(tag) {
      var newTags,
        _this = this;
      if (this.get('tags').indexOf(tag) === -1) {
        return false;
      }
      newTags = _.clone(this.get('tags'));
      this.set({
        tags: _.without(newTags, tag),
        datetime: new Date().getTime()
      });
      return persistence.tag().removeSiteFromTag(this.get('url'), tag, function() {
        chrome.runtime.sendMessage({
          action: 'calculate hash'
        });
        return _this.sync();
      });
    };

    return Site;

  })(Backbone.Model);

}).call(this);
