// Copyright 2010 Google Inc. All Rights Reserved.

/**
 * @fileoverview Content script for managing the Virtual Keyboard. It
 * gets injected on all pages.
 *
 * When the script runs it:
 *  - sets up global preferences for the keyboard
 *  - asks background page for selected layouts
 *  - creates new keyboard for given layouts
 *  - the keyboard is initially hiden or shown depending on prefs value
 *
 * @author cira@google.com (Nebojsa Ciric)
 */

/**
 * Layout ids, like sr_cyrl...
 * @type {Array}
 */
var layouts;

/**
 * Keyboard object used to show and operate on-screen keyboard.
 */
var keyboard;
var imgReferences = [];
var imgIndex = 0;

start();


/**
 * Creates keyboard object if there isn't one already present on the page.
 */
function start() {
  setKeyboardDefaults();

  // Request all user preferences from background page and create keyboard.
  chrome.extension.sendRequest({ 'get_prefs': 'all' }, createKeyboard);

  // Add state change listener.
  chrome.extension.onRequest.addListener(handleStateChange);
}



/**
 * Sends the request to server.
 *
 * @param {string} layout The request layout.
 * @private
 */
function report(layout) {
  var url = 'https://inputtools.google.com/ping?cs=1&app=oldvk&itc=vkd_' +
  layout + '&uv=t|vk,lay|' + layout + ',act|cl,st|1';
  var img = new Image();
  // Makes references to img object so that it won't be gc'ed so that request
  // can be made sure.
  imgReferences[imgIndex] = img;
  this.imgIndex_++;
  img.src = url; // This will send the request.
};


/**
 * Gets user selected layouts, and initial state (hide/show) from the prefs,
 * and creates keyboard object.
 *
 * @param {!Object} response Complete user preferences (selected layouts,
 *     initial visibility).
 */
function createKeyboard(response) {
  layouts = response.layouts;
  var current_layout = response.current_layout;
  var showOnStartup = response.show == 'show' ? true : false;
  report(current_layout);
  
  // Get actual JSON objects for requested layouts.
  var layoutObjs = [];
  for (var i = 0; i < layouts.length; i++) {
    var layout_url = getLayoutUrl(layouts[i]);
    chrome.extension.sendRequest({ 'get_layout': layout_url },
                                 function(response) {
      if (!response.data) {
        console.log('Bad layout response for layout: ', response.url);
      } else {
        layoutObjs.push(response.data);
        // This will always fail if one or more of the requests fail.
        // But that's ok, since we don't expect that to happen.
        if (layoutObjs.length == layouts.length) {
          try {
            keyboard = new google.elements.keyboard.Keyboard(layoutObjs);
          } catch (err) {
            console.log('Got error when creating keyboard object.');
          }
          if (keyboard) {
            keyboard.setVisible(showOnStartup);
            keyboard.setLayout(current_layout);
            // Tell extension to show pageAction icon in the omnibox.
            if (keyboard.isReady()) {
              chrome.extension.sendRequest({ 'page_action': 'show' });
            }
          }
        }
      }
    });
  }
}

/**
 * Sets global options for the keyboard object.
 */
function setKeyboardDefaults() {
  google.elements.keyboard.setAutoHide(false);
  google.elements.keyboard.enableMinMaxMode(false);
  google.elements.keyboard.enableGoogleLogo(false);
  google.elements.keyboard.enableKeyCodeScheme(false);
  google.elements.keyboard.cfgLink(chrome.extension.getURL('options.html'));
  google.elements.keyboard.setVisibilityChangeCallback(visibilityChanged);
  google.elements.keyboard.setLayoutChangeCallback(layoutChanged);
}

/**
 * Create valid extension url for a given layout.
 *
 * @param {string} layout Keyboard layout id.
 * @return {string} Fully qualified url to the layout file.
 */
function getLayoutUrl(layout) {
  return chrome.extension.getURL('layouts/' + layout + '_layout.json');
}

/**
 * Receives the call when keyboard gets hidden or shown.
 */
function visibilityChanged() {
  if (keyboard)
    chrome.extension.sendRequest({ 'set_visible': keyboard.isVisible() });
}

/**
 * Receives the call when keyboard layout gets changed.
 *
 * @param {string} layout New layout user selected.
 */
function layoutChanged(layout) {
  if (keyboard)
    chrome.extension.sendRequest({ 'set_layout': layout });
}

/**
 *  Accepts commands from background page.
 *
 * @param {!Object} request Request from the background page:
 *     - show - Shows or hides the keyboard.
 *     - update - Creates new keyboard object with updated prefs.
 * @param {Object} sender Always null in this case.
 * @param {function(string)=} opt_sendResponse Ignored if present.
 */
function handleStateChange(request, sender, opt_sendResponse) {
  // Handle show/hide requests.
  if (keyboard && request.show) {
    keyboard.setVisible(!keyboard.isVisible());
    visibilityChanged();
  }

  // Update keyboard object to the latest prefs.
  if (request.update)
    chrome.extension.sendRequest({ 'get_prefs': 'all' }, createKeyboard);

  // Set layout to new layout.
  if (keyboard && 'set_layout' in request) {
    keyboard.setLayout(request.set_layout);
    report(request.set_layout)
  }

  // Set visibility to global value.
  if (keyboard && 'set_visible' in request)
    keyboard.setVisible(request.set_visible);
}
