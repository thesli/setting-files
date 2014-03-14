//@ sourceMappingURL=tracker.map
// Generated by CoffeeScript 1.6.1
(function() {

  BH.Lib.Tracker = (function() {

    function Tracker(analytics, page) {
      if (analytics == null) {
        throw "Analytics not set";
      }
      if (page == null) {
        throw "Window not set";
      }
      this.analytics = analytics;
    }

    Tracker.prototype.pageView = function(url) {
      if (url.match(/search/)) {
        url = 'search';
      }
      return this.analytics.push(['_trackPageview', "/" + url]);
    };

    Tracker.prototype.weekView = function(date, distanceFromCurrentWeek) {
      return this.trackEvent(['Weeks', 'Click', date, distanceFromCurrentWeek]);
    };

    Tracker.prototype.visitDeletion = function() {
      return this.trackEvent(['Visit', 'Delete']);
    };

    Tracker.prototype.groupedVisitsDeletion = function() {
      return this.trackEvent(['Grouped visits', 'Delete']);
    };

    Tracker.prototype.timeIntervalDeletion = function() {
      return this.trackEvent(['Time interval', 'Delete']);
    };

    Tracker.prototype.dayVisitsDeletion = function() {
      return this.trackEvent(['Day visits', 'Delete']);
    };

    Tracker.prototype.weekVisitsDeletion = function() {
      return this.trackEvent(['Week visits', 'Delete']);
    };

    Tracker.prototype.searchResultsDeletion = function() {
      return this.trackEvent(['Search results', 'Delete']);
    };

    Tracker.prototype.paginationClick = function() {
      return this.trackEvent(['Pagination', 'Click']);
    };

    Tracker.prototype.omniboxSearch = function() {
      return this.trackEvent(['Omnibox', 'Search']);
    };

    Tracker.prototype.browserActionClick = function() {
      return this.trackEvent(['Browser action', 'Click']);
    };

    Tracker.prototype.contextMenuClick = function() {
      return this.trackEvent(['Context menu', 'Click']);
    };

    Tracker.prototype.selectionContextMenuClick = function() {
      return this.trackEvent(['Selection context menu', 'Click']);
    };

    Tracker.prototype.error = function(msg, url, lineNumber) {
      return this.trackEvent(['Error', msg, url, lineNumber]);
    };

    Tracker.prototype.syncStorageError = function(operation, msg) {
      return this.trackEvent(['Storage Error', operation, 'Sync', msg]);
    };

    Tracker.prototype.syncStorageAccess = function(operation) {
      return this.trackEvent(['Storage Access', operation, 'Sync']);
    };

    Tracker.prototype.mailingListPrompt = function() {
      return this.trackEvent(['Mailing List Prompt', 'Seen']);
    };

    Tracker.prototype.trackEvent = function(params) {
      params.unshift('_trackEvent');
      return this.analytics.push(params);
    };

    return Tracker;

  })();

}).call(this);
