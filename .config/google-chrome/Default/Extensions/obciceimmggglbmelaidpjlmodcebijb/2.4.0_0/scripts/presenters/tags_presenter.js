// Generated by CoffeeScript 1.6.1
(function() {

  BH.Presenters.TagsPresenter = (function() {

    function TagsPresenter(collection) {
      this.collection = collection;
    }

    TagsPresenter.prototype.tagsSummary = function() {
      var model, orderedSites, out, tag, _i, _len, _ref;
      out = [];
      _ref = this.collection.tagOrder;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tag = _ref[_i];
        model = this.collection.findWhere({
          name: tag
        });
        if (model != null) {
          orderedSites = model.get('sites').sort(function(a, b) {
            return b.datetime - a.datetime;
          });
          out.push({
            name: model.get('name'),
            count: model.get('sites').length,
            sites: orderedSites.slice(0, 10)
          });
        }
      }
      return out;
    };

    TagsPresenter.prototype.selectedAndUnselectedTagsforSites = function(sites) {
      var commonTags, model, result, site, tag, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _results;
      _ref = this.collection.tagOrder;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tag = _ref[_i];
        model = this.collection.findWhere({
          name: tag
        });
        for (_j = 0, _len1 = sites.length; _j < _len1; _j++) {
          site = sites[_j];
          result = _.find(model.get('sites'), function(taggedSite) {
            return taggedSite.url === site.url;
          });
          if (result != null) {
            if (!site.tags) {
              site.tags = [];
            }
            site.tags.push(model.get('name'));
          }
        }
      }
      commonTags = _.intersection.apply(_, _.pluck(sites, 'tags'));
      _ref1 = this.collection.tagOrder;
      _results = [];
      for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
        tag = _ref1[_k];
        model = this.collection.findWhere({
          name: tag
        });
        _results.push({
          name: model.get('name'),
          tagged: commonTags.indexOf(model.get('name')) !== -1
        });
      }
      return _results;
    };

    return TagsPresenter;

  })();

}).call(this);
