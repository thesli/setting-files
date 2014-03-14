//@ sourceMappingURL=track.map
// Generated by CoffeeScript 1.6.1
(function() {

  BH.Lib.Track = (function() {

    function Track(analytics) {
      this.analytics = analytics;
    }

    Track.prototype.pageView = function(url) {
      if (url.match(/search/)) {
        url = 'search';
      }
      return this.analytics.push(['_trackPageview', "/" + url]);
    };

    Track.prototype.weekView = function(date, distanceFromCurrentWeek) {
      return this.trackEvent(['Weeks', 'Click', date, distanceFromCurrentWeek]);
    };

    Track.prototype.visitDeletion = function() {
      return this.trackEvent(['Visit', 'Delete']);
    };

    Track.prototype.groupedVisitsDeletion = function() {
      return this.trackEvent(['Grouped visits', 'Delete']);
    };

    Track.prototype.timeIntervalDeletion = function() {
      return this.trackEvent(['Time interval', 'Delete']);
    };

    Track.prototype.dayVisitsDeletion = function() {
      return this.trackEvent(['Day visits', 'Delete']);
    };

    Track.prototype.weekVisitsDeletion = function() {
      return this.trackEvent(['Week visits', 'Delete']);
    };

    Track.prototype.searchResultsDeletion = function() {
      return this.trackEvent(['Search results', 'Delete']);
    };

    Track.prototype.paginationClick = function() {
      return this.trackEvent(['Pagination', 'Click']);
    };

    Track.prototype.omniboxSearch = function() {
      return this.trackEvent(['Omnibox', 'Search']);
    };

    Track.prototype.browserActionClick = function() {
      return this.trackEvent(['Browser action', 'Click']);
    };

    Track.prototype.contextMenuClick = function() {
      return this.trackEvent(['Context menu', 'Click']);
    };

    Track.prototype.selectionContextMenuClick = function() {
      return this.trackEvent(['Selection context menu', 'Click']);
    };

    Track.prototype.error = function(msg, url, lineNumber) {
      return this.trackEvent(['Error', msg, url, lineNumber]);
    };

    Track.prototype.trackEvent = function(params) {
      params.unshift('_trackEvent');
      return this.analytics.push(params);
    };

    return Track;

  })();

}).call(this);
