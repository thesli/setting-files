// Generated by CoffeeScript 1.6.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BH.Views.SearchPaginationView = (function(_super) {

    __extends(SearchPaginationView, _super);

    function SearchPaginationView() {
      return SearchPaginationView.__super__.constructor.apply(this, arguments);
    }

    SearchPaginationView.include(BH.Modules.I18n);

    SearchPaginationView.include(BH.Modules.Url);

    SearchPaginationView.prototype.className = 'search_pagination_view';

    SearchPaginationView.prototype.template = BH.Templates['search_pagination'];

    SearchPaginationView.prototype.initialize = function() {
      this.chromeAPI = chrome;
      this.results = this.options.results;
      this.query = this.options.query;
      this.pages = BH.Lib.Pagination.calculatePages(this.results);
      if (this.model.get('page') > this.pages) {
        return this.model.set({
          page: 1
        });
      }
    };

    SearchPaginationView.prototype.events = {
      'click .pagination a': 'onPageClicked'
    };

    SearchPaginationView.prototype.render = function() {
      var html, i, properties;
      properties = {
        paginationClass: this.pages === 1 ? 'hidden' : ''
      };
      properties.pages = (function() {
        var _i, _ref, _results;
        _results = [];
        for (i = _i = 1, _ref = this.pages; _i <= _ref; i = _i += 1) {
          _results.push({
            url: "" + (this.urlFor('search', this.query)) + "/p" + i,
            className: i === this.model.get('page') ? 'selected' : '',
            number: i
          });
        }
        return _results;
      }).call(this);
      properties = _.extend(this.getI18nValues(), properties);
      html = Mustache.to_html(this.template, properties);
      return this.$el.html(html);
    };

    SearchPaginationView.prototype.onPageClicked = function(ev) {
      var $el;
      $el = $(ev.currentTarget);
      analyticsTracker.paginationClick();
      router.navigate($el.attr('href'));
      this.$('a').removeClass('selected');
      $el.addClass('selected');
      return this.model.set({
        page: $el.data('page')
      });
    };

    SearchPaginationView.prototype.getI18nValues = function() {
      var properties;
      properties = [];
      properties['i18n_number_of_visits'] = this.t('number_of_visits', [this.results]);
      return properties;
    };

    return SearchPaginationView;

  })(BH.Views.MainView);

}).call(this);
