// Generated by CoffeeScript 1.6.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BH.Views.AvailableTagsView = (function(_super) {

    __extends(AvailableTagsView, _super);

    function AvailableTagsView() {
      return AvailableTagsView.__super__.constructor.apply(this, arguments);
    }

    AvailableTagsView.include(BH.Modules.I18n);

    AvailableTagsView.prototype.template = BH.Templates['available_tags'];

    AvailableTagsView.prototype.initialize = function() {
      this.tracker = analyticsTracker;
      this.draggedSites = this.options.draggedSites;
      return this.collection.on('reset', this.render, this);
    };

    AvailableTagsView.prototype.render = function() {
      var html, presenter, tags,
        _this = this;
      presenter = new BH.Presenters.TagsPresenter(this.collection);
      tags = presenter.selectedAndUnselectedTagsforSites(this.draggedSites);
      html = Mustache.to_html(this.template, {
        tags: tags
      });
      this.$el.html(html);
      $('.available_tags li').each(function(i, tag) {
        tag.addEventListener('dragenter', function(ev) {
          return $(ev.currentTarget).addClass('over');
        }, false);
        tag.addEventListener('dragleave', function(ev) {
          return $(ev.currentTarget).removeClass('over');
        }, false);
        tag.addEventListener('dragover', function(ev) {
          ev.preventDefault();
          return ev.dataTransfer.effect = 'move';
        }, false);
        return tag.addEventListener('drop', function(ev) {
          var $el, collection, draggedData;
          $el = $(ev.currentTarget);
          ev.stopPropagation();
          _this.tracker.siteTagDrop();
          draggedData = ev.dataTransfer.getData('application/json');
          collection = _this.inflateDraggedData(draggedData);
          collection.fetch();
          collection.on('reset:allTags', function() {
            var tagName;
            if ($el.hasClass('new_tag')) {
              _this.renderNewTagView(collection);
            } else {
              tagName = $el.data('tag');
            }
            if ($el.hasClass('tagged')) {
              return _this.untagSites(tagName, collection);
            } else {
              return _this.tagSites(tagName, collection);
            }
          });
          return false;
        }, false);
      });
      return this;
    };

    AvailableTagsView.prototype.renderNewTagView = function(collection) {
      var newTagModal,
        _this = this;
      newTagModal = new BH.Modals.NewTagModal({
        model: new BH.Models.Tag(),
        tracker: this.tracker
      });
      $('body').append(newTagModal.render().el);
      newTagModal.open();
      $('.new_tag').focus();
      return newTagModal.model.on('change:name', function() {
        return _this.tagSites(newTagModal.model.get('name'), collection);
      });
    };

    AvailableTagsView.prototype.untagSites = function(tag, collection) {
      var _this = this;
      return collection.removeTag(tag, function() {
        var site, _i, _len, _ref;
        _ref = collection.toJSON();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          site = _ref[_i];
          _this.tracker.siteUntagged();
          _this.trigger('site:untagged', site);
        }
        if (collection.length > 1 || collection.at(0).get('partOfGroup')) {
          return _this.trigger('sites:untagged', {
            domain: collection.at(0).get('url').match(/\w+:\/\/(.*?)\//)[0],
            tags: _.intersection.apply(_, collection.pluck('tags'))
          });
        }
      });
    };

    AvailableTagsView.prototype.tagSites = function(tag, collection) {
      var _this = this;
      return collection.addTag(tag, function(result, operations) {
        var site, _i, _len, _ref;
        _ref = collection.toJSON();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          site = _ref[_i];
          _this.tracker.siteTagged();
          _this.trigger('site:tagged', site);
        }
        if (collection.length > 1 || collection.at(0).get('partOfGroup')) {
          _this.trigger('sites:tagged', {
            domain: collection.at(0).get('url').match(/\w+:\/\/(.*?)\//)[0],
            tags: _.intersection.apply(_, collection.pluck('tags'))
          });
        }
        if (operations.tagCreated) {
          return _this.tracker.tagAdded();
        }
      });
    };

    AvailableTagsView.prototype.inflateDraggedData = function(data) {
      var sites;
      sites = JSON.parse(data).sites;
      return new BH.Collections.Sites(sites, {
        chrome: chrome
      });
    };

    return AvailableTagsView;

  })(Backbone.View);

}).call(this);