// Copyright 2010 Google Inc. All Rights Reserved.

/**
 * @fileoverview i18n helper functions.
 *
 * Replace value/innerText of an element with translated message.
 *
 * @author finnur@google.com
 */

/**
 * Finds an element with |id| and replaces the text of it with i18n message with
 * |msg| key.
 *
 * @param {string} id Element id (we replace innerText or attribute of this
 *     element with i18n message).
 * @param {string} msg i18n message name.
 * @param {string} attribute Attribute which value we may replace with
 *     i18n message.
 */
function i18nReplaceImpl(id, msg, attribute) {
  var element = document.getElementById(id);
  if (element) {
    if (attribute)
      element.setAttribute(attribute, chrome.i18n.getMessage(msg));
    else
      element.innerText = chrome.i18n.getMessage(msg);
  }
}

/**
 * Replaces innerText/id of an element with id = msg.
 *
 * @param {string} msg Used both as an element id and i18n message key.
 */
function i18nReplace(msg) {
  i18nReplaceImpl(msg, msg, '');
}
