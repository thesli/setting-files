// Copyright 2013 Google Inc. All Rights Reserved.

/**
 * @fileoverview A Word interaction test toolbar helper module to provide
 * commonly used functions. This module should be kept as small and as minimal
 * as possible.
 * For every method that is listed here we should question whether there are
 * existing QOWT APIs that can be used, or if those APIs should be created.
 *
 * @author upasana.kumari@synerzip.com (Upasana Kumari)
 */

define([
    'qowtRoot/unittests/utils/fakeEvents',
    'qowtRoot/unittests/utils/fakeKeyboard',
    'qowtRoot/widgets/ui/mainToolbar',
    'qowtRoot/interactiontests/waitHelper'
  ], function(
    FakeEvents,
    FakeKeyboard,
    MainToolbar,
    WaitFor
  ) {

  'use strict';

  var _api = {

    /**
     * Simulates menu item selection by using toolbar dropdown button (e.g.
     * selects a color from text-color or highlight-color picker dropdown, or
     * selects a font-family in fontface or a font-size from fontSize picker
     * dropdown list and simulates a click event on the selected menu item and
     * then perform the subsequent actions on it.)
     *
     * @param menuItem - selected menu item div from dropdown list
     */
    waitForMenuItemClicked: function(menuItem) {
      runs(function() {
          FakeEvents.simulate(menuItem, 'click');
      });
      WaitFor.eventsHandled();
    },

    /**
     * Simulates the main toolbar buttons click(e.g. bold,italic,underline
     * buttons)
     * @param buttonId - Id of clicked button
     */
    waitForButtonClicked: function(buttonId) {
      runs(function() {
        var button = MainToolbar.getItem(buttonId);
        FakeEvents.simulate(button.getWidgetElement(), 'click');
      });
      WaitFor.eventsHandled();
    }
  };

  return _api;
});