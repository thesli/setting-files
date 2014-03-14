// Generated by CoffeeScript 1.6.1
(function() {
  var analyticsTracker, errorTracker, load;

  window.apiHost = 'api.better-history.com';

  window.siteHost = 'www.better-history.com';

  window.env = 'prod';

  errorTracker = new BH.Trackers.ErrorTracker(Honeybadger);

  analyticsTracker = new BH.Trackers.AnalyticsTracker();

  load = function() {
    var omnibox, tagFeature,
      _this = this;
    window.syncStore = new BH.Lib.SyncStore({
      chrome: chrome,
      tracker: analyticsTracker
    });
    window.persistence = new BH.Init.Persistence({
      localStore: new BH.Lib.LocalStore({
        chrome: chrome,
        tracker: analyticsTracker
      }),
      syncStore: new BH.Lib.SyncStore({
        chrome: chrome,
        tracker: analyticsTracker
      })
    });
    chrome.runtime.onInstalled.addListener(function() {
      var ensureDatetimeOnTaggedSites;
      ensureDatetimeOnTaggedSites = new BH.Migrations.EnsureDatetimeOnTaggedSites({
        analyticsTracker: analyticsTracker
      });
      return ensureDatetimeOnTaggedSites.run();
    });
    omnibox = new BH.Lib.Omnibox({
      chrome: chrome,
      tracker: analyticsTracker
    });
    omnibox.listen();
    window.selectionContextMenu = new BH.Lib.SelectionContextMenu({
      chrome: chrome,
      tracker: analyticsTracker
    });
    window.pageContextMenu = new BH.Lib.PageContextMenu({
      chrome: chrome,
      tracker: analyticsTracker
    });
    pageContextMenu.listenToTabs();
    syncStore.get('settings', function(data) {
      var settings;
      settings = data.settings || {};
      if (settings.searchBySelection !== false) {
        selectionContextMenu.create();
      }
      if (settings.searchByDomain !== false) {
        return pageContextMenu.create();
      }
    });
    tagFeature = new BH.Init.TagFeature({
      syncStore: syncStore
    });
    tagFeature.prepopulate(function() {
      var exampleTags;
      exampleTags = new BH.Lib.ExampleTags();
      return exampleTags.load();
    });
    return chrome.runtime.onMessage.addListener(function(message) {
      var _this = this;
      if (message.action === 'calculate hash') {
        return persistence.tag().fetchTags(function(tags, compiledTags) {
          var syncingTranslator;
          if (tags.length > 0) {
            syncingTranslator = new BH.Lib.SyncingTranslator();
            return syncingTranslator.forServer(compiledTags, function(sites) {
              var sitesHash, sitesHasher;
              sitesHasher = new BH.Lib.SitesHasher(CryptoJS.SHA1);
              sitesHash = sitesHasher.generate(sites).toString();
              return persistence.tag().setSitesHash(sitesHash);
            }, {
              skipImages: true
            });
          } else {
            return persistence.tag().setSitesHash('');
          }
        });
      }
    });
  };

  if (env === 'prod') {
    try {
      load();
    } catch (e) {
      errorTracker.report(e);
    }
  } else {
    load();
  }

}).call(this);
