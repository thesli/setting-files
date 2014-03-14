/**
 * Copyright 2013 Google Inc. All Rights Reserved.
 *
 * @fileoverview
 * This module defines feature overrides. It is refeerenced only from the
 * experimental manifest file. At this time that manifest is only served up on
 * ChromeOS behind the about:flag to enable document editing.
 *
 * @author dskelton@google.com (Duncan Skelton)
 */

(function() {


  // NOTE : this code runs as a background page; it therefore
  // sets the overrides in the more global localStorage rather
  // than session storage

  var kId = 'featureOverrides';
  var overrides = {};
  // make sure to extend existing features set in local storage
  var overridesStr = window.localStorage.getItem(kId);
  if (overridesStr) {
    overrides = JSON.parse(overridesStr);
  }

  // add/overwrite 'edit' feature
  overrides.edit = true;
  overrides.pointEdit = false;
  window.localStorage.setItem(kId, JSON.stringify(overrides));

})();
