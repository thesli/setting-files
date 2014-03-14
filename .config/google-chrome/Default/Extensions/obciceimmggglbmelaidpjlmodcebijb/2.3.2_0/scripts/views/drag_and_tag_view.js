// Generated by CoffeeScript 1.6.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BH.Views.DragAndTagView = (function(_super) {

    __extends(DragAndTagView, _super);

    function DragAndTagView() {
      return DragAndTagView.__super__.constructor.apply(this, arguments);
    }

    DragAndTagView.include(BH.Modules.I18n);

    DragAndTagView.prototype.initialize = function() {
      this.tracker = analyticsTracker;
      this.chromeAPI = chrome;
      return this.excludeTag = this.options.excludeTag;
    };

    DragAndTagView.prototype.render = function() {
      var handleDragEnd, handleDragStart,
        _this = this;
      handleDragStart = function(ev) {
        var $el, availableTagsView, collection, count, data, history, interval, intervalId, sites, summaryEl, visit;
        ev.stopPropagation();
        $el = $(ev.currentTarget);
        $el.addClass('dragging');
        $('.navigation').addClass('dropzone');
        data = {
          sites: []
        };
        if ($el.hasClass('searched')) {
          count = 1;
          history = _this.model.get('history');
          visit = history.get($el.data('id'));
          data.sites.push({
            url: visit.get('url'),
            title: visit.get('title'),
            id: visit.get('id'),
            datetime: new Date().getTime()
          });
        } else if ($el.hasClass('tagged')) {
          count = 1;
          sites = _this.model.get('sites');
          visit = _.where(sites, {
            url: $el.data('id')
          });
          data.sites.push({
            url: visit[0].url,
            title: visit[0].title,
            id: visit[0].url,
            datetime: new Date().getTime()
          });
        } else {
          intervalId = $el.parents('.interval').data('id');
          interval = _this.model.get('history').get(intervalId);
          if ($el.find('ol.visits').length > 0) {
            count = $el.find('.visits .visit').length;
            $el.find('ol.visits .visit').each(function() {
              visit = interval.findVisitById($(this).data('id'));
              return data.sites.push({
                url: visit.get('url'),
                title: visit.get('title'),
                id: visit.get('id'),
                datetime: new Date().getTime()
              });
            });
          } else {
            visit = interval.findVisitById($el.data('id'));
            count = 1;
            data.sites.push({
              url: visit.get('url'),
              title: visit.get('title'),
              id: visit.get('id'),
              datetime: new Date().getTime()
            });
          }
        }
        _this.tracker.siteTagDrag();
        if (!(summaryEl = document.getElementsByClassName('drag_ghost')[0])) {
          summaryEl = document.createElement('div');
          summaryEl.className = 'drag_ghost';
          $('body').append(summaryEl);
        }
        summaryEl.innerHTML = _this.t('number_of_visits', [count]);
        ev.dataTransfer.setDragImage(summaryEl, -15, -10);
        ev.dataTransfer.setData('application/json', JSON.stringify(data));
        collection = new BH.Collections.Tags([]);
        availableTagsView = new BH.Views.AvailableTagsView({
          collection: collection,
          draggedSites: data.sites,
          el: '.available_tags',
          excludedTag: (_this.excludeTag ? _this.model.get('name') : void 0)
        });
        return collection.fetch();
      };
      handleDragEnd = function(ev) {
        var $el;
        $el = $(ev.currentTarget);
        $el.removeClass('dragging');
        return $('.navigation').removeClass('dropzone');
      };
      return $('.visit').each(function(i, visit) {
        visit.addEventListener('dragstart', handleDragStart, false);
        return visit.addEventListener('dragend', handleDragEnd, false);
      });
    };

    return DragAndTagView;

  })(Backbone.View);

}).call(this);