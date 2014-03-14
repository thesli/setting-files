// Copyright 2010 Google Inc. All Rights Reserved.

/**
 * @fileoverview Options page script.
 *
 * It talks to the background page to notify content script of changes in
 * keyboard state.
 *
 * @author cira@google.com (Nebojsa Ciric)
 */


/**
 * Moves selected option item between selection elements.
 */
function moveOption(sourceElementId) {
  var lbox = document.getElementById('layouts');
  var rbox = document.getElementById('selected');

  if (sourceElementId == 'layouts') {
    moveSelected(lbox, rbox);
  } else if (sourceElementId == 'selected') {
    moveSelected(rbox, lbox);
  } else {
    console.log('Incorrect source element id: ' + sourceElementId);
  }
}

/**
 * Common code that moves selection from fromBox to the toBox.
 *
 * @param {Node} fromBox Options element from which to move selected items.
 * @param {Node} toBox Options element to which to move selected items.
 */
function moveSelected(fromBox, toBox) {
  // Last item cannot be transfered from select box.
  if (fromBox.id == 'selected' && fromBox.children.length == 1)
    return;

  for (var i = fromBox.children.length - 1; i >= 0; i--) {
    if (!fromBox.children[i].selected)
      continue;
    appendToOptions(toBox, fromBox.children[i].text, fromBox.children[i].value);
    fromBox.remove(i);
    break;
  }
  changeSaveButtonState('enable');
}

/**
 * Inserts layout id and title to proper sort position.
 * List is sorted by values/ids.
 *
 * @param {Node} element Options element to insert item into.
 * @param {string} text Visible text of the item (layout title).
 * @param {string} value Content of the value attribute of the item.
 */
function appendToOptions(element, text, value) {
  // Let us be nice and keep elements sorted by value.
  var newOption = new Option(text, value);
//  newOption.setAttribute('onclick', 'moveOption("' + element.id + '")');
  newOption.addEventListener('click', function(e){
    moveOption(element.id);
  });

  if (element.children.length == 0) {
    element.add(newOption, null)
    return;
  }

  var index = -1;
  for (var i = 0; i < element.children.length; i++) {
    if (text.toLowerCase() < element.children[i].text.toLowerCase()) {
      element.add(newOption, element.children[i]);
      index = 0;
      break;
    }
  }
  // Index could be -1 (should be sorted to the end of the list), in which
  // case we use null as a second argument to add.
  if (index == -1)
    element.add(newOption, null);
}

/**
 *  Enables/disables the Save button.
 *
 * @param {string} state It's either enable or disable.
 */
function changeSaveButtonState(state) {
  var saveButton = document.getElementById('vkbd_save_options');
  if (state == 'disable') {
    saveButton.setAttribute('disabled', 'disabled');
  } else {
    saveButton.removeAttribute('disabled');
  }
}

/**
 * Saves user preferences to localStorage.
 */
function savePrefs() {
  // Save selected keyboard layouts.
  var select = document.getElementById('selected');

  var array = [];
  for (var i = 0; i < select.children.length; i++) {
    array[i] = select.children[i].value;
  }
  setLocalStorageItem('keyboards', array.join());

  // Disable the Save button.
  changeSaveButtonState('disable');

  // Update all tabs with new prefs.
  chrome.extension.getBackgroundPage().updatePrefsForAllTabs();

  // Google analytics.
  gaq.push(['_trackEvent', 'Save button', 'clicked']);
}

/**
 * Returns true if the layout is already in local storage.
 *
 * @param {string} layout Layout we are checking.
 * @param {Array.<string>} layouts Array of already selected layout ids.
 */
function isSaved(layout, layouts) {
  for (var i = 0; i < layouts.length; i++)
    if (layout == layouts[i])
      return true;

  return false;
}

/**
 * Puts all available layouts to the left selection box.
 * Skips layouts user already moved to the right selection box.
 */
function populateLeftSelect() {
  var lbox = document.getElementById('layouts');
  lbox.length = 0;
  var layouts = [];
  if (getLocalStorageItem('keyboards')) {
    layouts = getLocalStorageItem('keyboards').split(',');
  }
  for (var i = 0; i < keyboards.length; i++) {
    if (keyboards[i].title == '')
      continue;
    if (isSaved(keyboards[i].id, layouts))
      continue;
    appendToOptions(lbox, keyboards[i].title, keyboards[i].id);
  }
}

/**
 * Puts all layouts already in local storage to the right selection box.
 */
function populateRightSelect() {
  var rbox = document.getElementById('selected');
  rbox.length = 0;
  var layouts = [];
  if (getLocalStorageItem('keyboards')) {
    layouts = getLocalStorageItem('keyboards').split(',');
  }
  for (var i = 0; i < keyboards.length; i++) {
    if (isSaved(keyboards[i].id, layouts))
      appendToOptions(rbox, keyboards[i].title, keyboards[i].id);
  }
}

/**
 * Localizes messages, and populates the controls.
 */
function init() {
  document.title = chrome.i18n.getMessage('vkbd_options_title');
  i18nReplace('vkbd_pick_keyboard_layout');
  i18nReplaceImpl('vkbd_save_options', 'vkbd_save_options', 'value');

  populateLeftSelect();
  populateRightSelect();

  changeSaveButtonState('disable');
  document.getElementById('vkbd_save_options').addEventListener(
    'click',
    savePrefs);
}

(function() {
  window.addEventListener('load', init);
})();