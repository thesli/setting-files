// Copyright 2013 Google Inc. All Rights Reserved.
/**
 * @fileoverview General utility module to reduce code duplication and improve
 * readability of interaction test modules.
 *
 * @author dskelton@google.com (Duncan Skelton)
 */
define([
  'qowtRoot/third_party/hooker/hooker',
  'qowtRoot/commands/commandManager',
  'qowtRoot/controls/document/paginator',
  'qowtRoot/tools/text/textTool',
  'qowtRoot/unittests/utils/fakeEvents',
  'qowtRoot/unittests/utils/fakeKeyboard',
  'qowtRoot/pubsub/pubsub',
  'qowtRoot/utils/typeUtils',
  'qowtRoot/widgets/ui/mainToolbar',
  'qowtRoot/tools/sheet/sheetCellTool',
  'qowtRoot/tools/sheet/sheetTextTool',
  'qowtRoot/tools/sheet/sheetTabTool'], function(
  Hooker,
  CommandManager,
  Paginator,
  TextTool,
  FakeEvents,
  FakeKeyboard,
  PubSub,
  TypeUtils,
  MainToolbar,
  SheetCellTool,
  SheetTextTool,
  SheetTabTool) {

  'use strict';

  /**
   * Hook in to the command manager in order to know
   * when it gets started. This is reset on every test
   * and works in conjunction with the eventsHandled function
   * below
   */
  window.beforeEach(function() {
    Hooker.hook(CommandManager, 'addCommand', {
      post: function() {
        window.__cmdMgrStarted = true;
      }
    });
  });
  window.afterEach(function() {
    Hooker.unhook(CommandManager);
    delete window.__cmdMgrStarted;
  });

  var _api = {

    /**
     * For just about any E2E test we do something in the UI, which
     * preferably mimics end user behaviour (eg click a button or
     * type some text). We should then wait for QOWT and Core to be
     * done dealing with those events.
     * Some events however (eg click) are asynchronous. So we can not
     * simply wait for commandManager to be idle, because DIRECTLY
     * after the click, the commandManager IS still idle; it hasn't
     * even started yet!
     * This eventsHandled is slightly 'smarter'. It works in conjunction
     * with a hook in the globalBeforeEach (see above), which ensures a flag is
     * set once the command manager STARTs doing something. We first
     * wait for that flag to have been set, and THEN we wait for
     * the command manager to be idle. Once it is, we reset the original
     * flag, so that further calls to eventsHandled can be used.
     */
    eventsHandled: function() {
      function cmdMgrStarted() {
        return window.__cmdMgrStarted;
      }
      function cmdMgrDone() {
        if (CommandManager.isEmpty()) {
          // reset the started flag, and return true (we are done)
          delete window.__cmdMgrStarted;
          return true;
        }
        return false;
      }
      waitsFor(FakeKeyboard.isIdleOrNotStarted, 'fake keyboard', 7000);
      waitsFor(cmdMgrStarted, 'command manager to start', 30000);
      waitsFor(cmdMgrDone, 'command manager to be done', 30000);
    },

    // Make sure these timeouts are long enough, so that when you run
    // a number of tests in parallel and they get slower, we dont blow up
    commandManagerIdle: function() {
      waitsFor(CommandManager.isEmpty, 'command manager idle', 7000);
    },

    fakeKeyboardIdle: function() {
      waitsFor(FakeKeyboard.isIdle, 'fake keyboard', 7000);
    },

    textToolActive: function() {
      waitsFor(TextTool.isActive, 'text tool', 7000);
    },

    // TODO dtilley: Find E2E tests that still use this and change
    // to use the toolbarInitialized and actionAndSignal functions.
    toolbarModelUpdate: function() {
      console.warn('! toolbarModelUpdate function is deprecated');
      waits(500);
    },

    /**
     * Execute a function supplied in a runs block, and wait for a specific
     * signal that the action caused. Eg. apply Bold and wait for the toolbar
     * to update itself.
     * @param {Function} editFunc The edit encased in a function.
     * @param {String} signalName The signal to wait for after the action.
     */
    runsAndSignal: function(editFunc, signalName) {
      var waiter = _api.createWaiter(signalName);
      runs(editFunc);
      _api.waiterDone(waiter);
    },

    sheetCellToolActive: function() {
      waitsFor(SheetCellTool.isActive, 'sheet cell tool activation', 7000);
    },

    sheetTextToolActive: function() {
      waitsFor(SheetTextTool.isActive, 'sheet text tool activation', 7000);
    },

    sheetTabToolActive: function() {
      waitsFor(SheetTabTool.isActive, 'sheet tab tool activation', 7000);
    },

    paginatorIdle: function() {
      waitsFor(Paginator.isIdle, 'paginator idle', 10000);
    },

    gaStatesToMatch: function(states) {
      var expectedString = states.join(', ');
      function statesToMatch() {
        var actual = window.parent.__gaMock.appViews;
        var actualString = actual.join(', ');
        return actualString === expectedString;
      }
      waitsFor(statesToMatch, 'ga states to match', 2000);
    },


    /**
     * Create a waiter object for a specific signal from the PubSub.
     * @param {String} signal The event name.
     * @param {Function} opt_filterFunc An optional filter function that
     *                                  receives the signal and signalData.
     *
     * var EventWaiter = WaitFor.createWaiter(
     *         'qowt:event',
     *         function(signal, signalData) {
     *           return !!((signal === 'qowt:event') &&
     *                     (signalData.type === 'text'));
     *         });
     * waitsFor(EventWaiter.isDone, 'event to complete', 10000);
     *
     * @return {Object}
     */
    createWaiter: function(signal, opt_filterFunc) {
      return new WaiterModule(signal, opt_filterFunc);
    },

    waiterDone: function(waiterObj) {
      if (waiterObj && TypeUtils.isFunction(waiterObj.isDone)) {
        waitsFor(
            // Note: The Jasmine function waitsFor applies the function
            // to the current spec, so we have to bind it to its own object.
            waiterObj.isDone.bind(waiterObj),
            'waiter.' + waiterObj.signal + ' object to be done',
            10000);
      }
    },

    /**
     * Simulates the click on the menu-button of the Toolbar and waits till the
     * toolbar model gets updated in case the Core is not modified by user
     * click action
     *
     * @param menuButton - Menu-button DOM element
     */
    TransientModelUpdateOnMenuClick: function (menuButton) {
      _simulateClickOnToolbar(menuButton,
          'qowt:transientModelUpdate:toolbarDone');
    },

    /**
     * Simulates the click on the menu-button of the Toolbar and waits till the
     * toolbar model gets updated in case the Core is modified by user click
     * action
     *
     * @param menuButton - Menu-button DOM element
     */
    ToolbarModelUpdateOnMenuClick: function (menuButton) {
      _simulateClickOnToolbar(menuButton, 'qowt:modelUpdate:toolbarDone');
    }
  };

  // PRIVATE ===================================================================

  function WaiterModule(signal, filter) {
    this.signal = signal;
    this.filter = TypeUtils.isFunction(filter) ? filter : undefined;
    this.received = false;
    this.token = PubSub.after(this.signal, function(signal, signalData) {
      if (this.filter === undefined ||
         (this.filter && this.filter(signal, signalData))) {
        this.received = true;
        PubSub.unsubscribe(this.token);
      }
    }.bind(this));
  }

  WaiterModule.prototype = {
    __proto__: Object.prototype,
    isDone: function() {
      return this.received;
    },
    reset: function() {
      this.received = false;
    }
  };

  /**
   * Simulates the click on the menu-button of the Toolbar and waits till the
   * toolbar model gets updated.
   *
   * @param menuItem - menu-button DOM element
   * @param signal   - signal indicating toolbar model is updated completely
   */
  function _simulateClickOnToolbar(menuButton, signal) {
    _api.runsAndSignal(
        function () {
          FakeEvents.simulate(menuButton, 'click');
        },
        signal
    );
  }

  return _api;

});
