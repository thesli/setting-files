// Copyright 2010 Google Inc. All Rights Reserved.

/**
 * @fileoverview Google analytics code.
 *
 * Defines google analytics dependencies.
 *
 * @author cira@google.com (Nebojsa Ciric)
 */

/**
 * gaq is a global request queue for Google analytics requests.
 */
var gaq = gaq || [];
var notificationShow = false;
// UA-17452991-1 is our tracking code.
gaq.push(['_setAccount', 'UA-17452991-1']);

// Always track page views.
gaq.push(['_trackPageview']);

/**
 * Injects google analytics script into every page that includes analytics.js.
 */
(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  (document.getElementsByTagName('head')[0] ||
   document.getElementsByTagName('body')[0]).appendChild(ga);
})();


//Copyright 2010 Google Inc. All Rights Reserved.

/**
 * @fileoverview Isolates access to the localStorage so we can test locally.
 *
 * New webkit change throws DOM Exception 18 if one tries to access localStorage
 * from a test (using file:// scheme).
 *
 * @author cira@google.com (Nebojsa Ciric)
 */

/**
 * Stores a key/value pair into localStorage.
 *
 * @param {string} key Storage key.
 * @param {string} value Value associated with the key.
 */
function setLocalStorageItem(key, value) {
  if (localStorage)
    localStorage[key] = value;
}

/**
 * Gets a value for a given key from localStorage, or null.
 *
 * @param {string} key Storage key.
 * @return {string} value Value associated with the key.
 */
function getLocalStorageItem(key) {
  if (localStorage)
    return localStorage.getItem(key);

  return ;
}

/**
 * Removes key/value pair from localStorage.
 *
 * @param {string} key Storage key.
 */
function removeLocalStorageItem(key) {
  if (localStorage)
    localStorage.removeItem(key);
}



// Copyright 2010 Google Inc. All Rights Reserved.

/**
 * @fileoverview Background page implementation.
 *
 * It serves as a hub between content script, option and popup pages.
 * It accesses extension files on behalf of content script.
 * It accesses and sets up localStorage for the extension.
 *
 * @author cira@google.com (Nebojsa Ciric)
 */

/**
 * Sends message to current tab/content script to show/hide the keyboard.
 *
 * @param {!Object} tab Current tab.
 */
function showKeyboard(tab) {
  // Sends show command to the keyboard. It will decide what to do
  // depending on its previous state.
  // change_state is a command description, not used in the code.
  chrome.tabs.sendRequest(tab.id, { 'show': 'change_state' });

  // Google analytics.
  gaq.push(['_trackEvent', 'pageAction button', 'clicked']);
}

/**
 * Notifies all tabs (in all windows) that prefs have changed.
 */
function updatePrefsForAllTabs() {
  // Sends update command to all tabs. Each tab will re-read user prefs,
  // and change keyboard state (visible, layouts...).
  // update value is a command description, not used in the code.
  sendMessageToAllTabs({ 'update': 'update' });
}

/**
 * Sends a message to all tabs (in all windows).
 *
 * @param {!Object} message Message content script know how to handle:
 *     - update - Create new keyboard object.
 *     - set_layout - Switch to given layout.
 *     - set_visible - Show/hide keyboards.
 */
function sendMessageToAllTabs(message) {
  chrome.windows.getAll({ 'populate': true }, function(windows) {
    for (var w = 0; w < windows.length; w++) {
      var window = windows[w];
      for (var t = 0; t < window.tabs.length; t++) {
        chrome.tabs.sendRequest(window.tabs[t].id, message);
      }
    }
  });
}

function showTips() {
  if (!notificationShow && getLocalStorageItem('show_by_default') == 'show') {
    notificationShow = true;
    var notification = window.webkitNotifications.createHTMLNotification(
      'notification.html'
    );
    notification.show(); 
  }
}

/**
 * Gets all user preferences from local storage.
 *
 * @return {Object} User preferences as object:
 *  - show: inital state of the onscreen keyboard (show/hide).
 *  - layouts: user selected layouts (an array of strings).
 */
function getPrefs() {
  var layouts = getLocalStorageItem('keyboards').split(',');
  return { 'show': getLocalStorageItem('show_by_default'),
           'current_layout': getLocalStorageItem('current_layout'),
           'layouts': layouts };
}

/**
 * Resets all user preferences to default values.
 */
function resetPrefs() {
  setLocalStorageItem('keyboards', 'en');
  setLocalStorageItem('current_layout', 'en');
  setLocalStorageItem('show_by_default', 'show');
}

/**
 * Fetches the layout as JSON from given url (in our case
 * it's in local extension file).
 *
 * @param {string} url Full url to the layout resource.
 * @param {function(Object)} callback Content script callback that receives
 *     keyboard layout as a JSON object.
 */
function fetchLayout(url, callback) {
  var xhr = new XMLHttpRequest();

  var data = { 'url': url, 'data': null };

  xhr.onload = function() {
    data.data = JSON.parse(xhr.responseText);
    callback(data);
  }

  xhr.onerror = function() {
    callback(data);
  }

  xhr.open('GET', url, true);
  xhr.send(null);
}

/**
 * Processes incoming requests from content script.
 *
 * @param {!Object} request Request from content script.
 *     - get_prefs - return current user prefs through callback.
 *     - get_layout - return JSON representation of the layout through callback.
 *     - page_action - show page action icon on given tab.
 *     - set_layout - sets current_layout to layout, and it's sent to all tabs.
 *     - set_visible - sets visibility to show/hide on all tabs.
 * @param {Object} sender Sender info.
 * @param {function} sendResponse Callback to content script.
 */
function processRequest(request, sender, sendResponse) {
  showTips();
  // Return current user prefs to vkbd_driver script.
  if (request.get_prefs) {
    sendResponse(getPrefs());
  }

  // Fetch actual JSON object for a given layout name.
  if (request.get_layout) {
    fetchLayout(request.get_layout, sendResponse);
  }

  // Show page action icon for a given tab.
  if (request.page_action && sender.tab) {
    chrome.pageAction.show(sender.tab.id);
  }

  // Sends new layout name to all tabs.
  if ('set_layout' in request) {
    sendMessageToAllTabs({ 'set_layout': request.set_layout });
    // Makes it sticky for new tabs.
    setLocalStorageItem('current_layout', request.set_layout);
    // Google analytics.
    gaq.push(['_trackEvent', request.set_layout, 'layout']);
  }

  // Sends show/hide message to all tabs.
  if ('set_visible' in request) {
    sendMessageToAllTabs({ 'set_visible': request.set_visible });
    // Makes it sticky for new tabs.
    if (request.set_visible) {
      setLocalStorageItem('show_by_default', 'show');
      // Google analytics.
      gaq.push(['_trackEvent', 'visibility', 'visible']);
    } else {
      setLocalStorageItem('show_by_default', 'noshow');
      // Google analytics.
      gaq.push(['_trackEvent', 'visibility', 'hidden']);
    }
  }
}

/**
 * Initializes user preferences on startup
 */
function init() {
  /**
   * localStorage.keyboards holds list of keyboard layouts user selected in the
   * options page. List is comma separated.
   */
  if (!getLocalStorageItem('keyboards'))
    setLocalStorageItem('keyboards', 'en');

  /**
   * localStorage.show_by_default holds the initial value for new tabs.
   * If value is "show", keyboard UI is displayed on a new tab.
   * If value is "noshow", keyboard UI is not displayed.
   */
  if (!getLocalStorageItem('show_by_default'))
    setLocalStorageItem('show_by_default', 'show');

  /**
   * localStorage.current_layout holds the initial layout for a new tab.
   */
  if (!getLocalStorageItem('current_layout'))
    setLocalStorageItem('current_layout', 'en');

  // Sets up a listener which talks to the content script.
  chrome.extension.onRequest.addListener(processRequest);

  // Sets up a listener for pageAction icon click. On each click it changes
  // the visibility of the keyboard UI on a selected tab.
  chrome.pageAction.onClicked.addListener(showKeyboard);
}

(function() {
  init();
})();
