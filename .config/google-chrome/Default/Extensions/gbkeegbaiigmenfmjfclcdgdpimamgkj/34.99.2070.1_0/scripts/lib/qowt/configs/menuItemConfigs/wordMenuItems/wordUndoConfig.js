/**
 * Copyright 2013 Google Inc. All Rights Reserved.
 *
 * Defines a 'Undo' menu item specifically for WORD's use, and returns a
 * button configuration. This allows us for word to handle undo/redo
 * as a browser undo/redo for now, until we implement true qowt side
 * undo/redo (at which point this file can be removed and we can start
 * using the generic undo/redo configs)
 *
 * Here 'this' is bound to the menuitem widget generated from this config.
 *
 * @param returns {object} A menuitem configuration.
 * @param returns {string} config.type The type of widget to create.
 * @param returns {string} config.stringId The string Id to use in the menu
 *                         item.
 * @param returns {string} config.action The widgets requested action.
 * @param returns {string} config.iconClass CSS class name to use to style the
 *                         menu item.
 */

 define([], function() {

  return {
    type: 'menuItem',
    stringId: 'menu_item_undo',
    action: 'undo',
    iconClass: 'undo',
    contentType: 'document',
    shortcut: {
      'OSX': 'CMD+Z',
      'DEFAULT': 'CTRL+Z'
    },
    init: function() {
      this.setEnabled(true);
    }
  };
});