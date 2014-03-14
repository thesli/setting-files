/**
 * Copyright 2013 Google Inc. All Rights Reserved.
 *
 * @fileoverview background page script to register
 * for the various callbacks to ensure we get notified
 * of files/streams which need to be opened by us
 *
 * @author jelte@google.com (Jelte Liebrand)
 *         dtilley@google.com (Dan Tilley)
 */

var _filesToOpen = [],
    _streamsCache = [];

/**
 * Query the file entry of the next file to open from the collection of files
 * the user has requested to open.
 * @return {FileEntry} Return the next file entry from the collection
 *                     of files that the user has requested to open.
 */
// Disabling jshint warnings since it treats these two functions as unused
// though they are being used in entryPoint.js but in a slightly different
// manner
/*jshint unused:false */
function getFileToOpen() {
  if (_filesToOpen.length > 0) {
    var _fileToOpen = _filesToOpen.pop();
    return _fileToOpen;
  }
  return undefined;
}
/*jshint unused:false */
function getStreamDetails() {
  if (_streamsCache.length > 0) {
    var streamDetails = _streamsCache.pop();
    return streamDetails;
  }
}

/**
 * callback for when we receive a stream
 *
 * @param mime_type {string} the mime type of the incoming stream
 * @param original_url {string} the full URL to the file
 * @param stream_url {string} the url pointing to the open stream
 * @param tabId {number} the ID of the tab in which the stream has been opened
 */
function handleStream(mime_type, original_url, stream_url, tabId) {
  var streamDetails = {
    mimeType: mime_type,
    originalURL: original_url,
    streamURL: stream_url
  };
  _streamsCache.push(streamDetails);
  if (tabId) {
    chrome.tabs.update(tabId, {
      url: '../views/app.html'
    });
  } else {
    // note: older implementations of chrome didn't send the tabId, so
    // handling that case here.
    chrome.tabs.create({
      url: '../views/app.html'
    });
  }
}

/**
 * Create a new window.
 * @param {Array} remainingFiles Any other files that need to be opened.
 */
function createNewWindow(remainingFiles) {
  chrome.windows.create(
    {type: 'normal', focused: true},
    function(newWin) {
      // Update the first tab to the app
      makeTabQuickoffice(newWin.tabs[0].id);
      // Now that the window exists we can open the remaining files
      if (remainingFiles && remainingFiles.length) {
        for (var i = 0; i < remainingFiles.length; i++) {
          _filesToOpen.push(remainingFiles[i]);
          createQuickofficeTab(newWin.id);
        }
      }
    }
  );
}

/**
 * Try to create a new tab for the QO app.
 * @param {Integer} targetWindow The window to create the tab in.
 */
function createQuickofficeTab(targetWindow) {
  chrome.tabs.create({
    windowId: targetWindow,
    active: true,
    url: '../views/app.html'
  });
}

/**
 * Update an existing tab to the QO app.
 * New windows are created with one tab, so for new windows
 * we need to update the existing tab rather than create a new tab.
 * @param {Integer} targetTab The tab ID to update.
 */
function makeTabQuickoffice(targetTab) {
  chrome.tabs.update(targetTab, {
    active: true,
    url: '../views/app.html'
  });
}

if (chrome.streamsPrivate && chrome.streamsPrivate.onExecuteMimeTypeHandler) {
  chrome.streamsPrivate.onExecuteMimeTypeHandler.addListener(handleStream);
}

if (chrome.fileBrowserHandler) {
  chrome.fileBrowserHandler.onExecute.addListener(function(id, details) {
    if (id === 'qoview') {
      // We only need to check for a valid window for the first file
      _filesToOpen.push(details.entries[0]);
      // Once we have dealt with the first file the
      // remaining files can be opened asynchronously
      var remainingFiles = details.entries.slice(1);
      chrome.windows.getAll(
        {populate: false},
        function(windows) {
          if (!windows || windows.length < 1) {
            // Create a valid window and pass the remaining files to open
            createNewWindow(remainingFiles);
          } else {
            var win, wins = windows.length, thisWin, availableWin;
            for (win = 0; win < wins; win++) {
              thisWin = windows[win];
              // Make sure we do not open the app in an incognito window
              if (thisWin.incognito === false) {
                availableWin = thisWin;
                // Found a valid window, exit loop
                break;
              }
            }
            if (availableWin && availableWin.id) {
              // Open the first file
              createQuickofficeTab(availableWin.id);
              // Since the window already existed open the remaining files
              for (var i = 0; i < remainingFiles.length; i++) {
                _filesToOpen.push(remainingFiles[i]);
                createQuickofficeTab(availableWin.id);
              }
            } else {
              // No valid window, create one and pass the remaining files
              createNewWindow(remainingFiles);
            }
          }
        });
    }
  });
}
