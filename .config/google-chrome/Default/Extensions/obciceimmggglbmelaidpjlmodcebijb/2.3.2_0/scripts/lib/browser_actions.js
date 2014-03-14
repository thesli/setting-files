//@ sourceMappingURL=browser_actions.map
// Generated by CoffeeScript 1.6.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BH.Lib.BrowserActions = (function(_super) {

    __extends(BrowserActions, _super);

    BrowserActions.include(BH.Modules.I18n);

    BrowserActions.include(BH.Modules.Url);

    function BrowserActions(options) {
      if (options == null) {
        options = {};
      }
      if (options.chrome == null) {
        throw "Chrome API not set";
      }
      if (!options.tracker) {
        throw "Tracker not set";
      }
      this.chromeAPI = options.chrome;
      this.tracker = options.tracker;
    }

    BrowserActions.prototype.listen = function() {
      var _ref,
        _this = this;
      return (_ref = this.chromeAPI.browserAction) != null ? _ref.onClicked.addListener(function() {
        return _this.openHistory();
      }) : void 0;
    };

    BrowserActions.prototype.openHistory = function() {
      this.tracker.browserActionClick();
      return this.chromeAPI.tabs.create({
        url: this.urlFor()
      });
    };

    return BrowserActions;

  })(BH.Base);

}).call(this);