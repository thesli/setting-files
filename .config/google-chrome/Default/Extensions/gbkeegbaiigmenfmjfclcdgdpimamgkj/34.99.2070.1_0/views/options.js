/**
 * Copyright 2013 Google Inc. All Rights Reserved.
 *
 * @fileoverview debug options page for the extension
 * to allow switching between various build types
 *
 * @author jelte@google.com (Jelte Liebrand)
 */


(function() {

  var _features = {
    'editor': {
      edit: true,
      save: true
    },
    'viewer': {
      edit: false,
      save: true
    }
  };

  // defaults
  var _selectIds = {
    'qoBuildType': 'editor'
  };


  // save the select box state to local storage
  // and any feature overrides
  function saveOptions() {
    // save the selections themselves
    for (var id in _selectIds) {
      var select = document.getElementById(id);
      _selectIds[id] = select.children[select.selectedIndex].value;
      window.localStorage.setItem(id, _selectIds[id]);
    }

    // now save the feature overrides
    var overrides = _features[_selectIds.qoBuildType];
    if (overrides) {
      window.localStorage.setItem('featureOverrides', JSON.stringify(
          overrides));
    } else {
      window.localStorage.removeItem('featureOverrides');
    }

    // and finally give a little UI update to the developer
    updateStatus('Options Saved.');
  }


  // Restores select box state to saved value from localStorage.
  function restoreOptions() {
    for (var id in _selectIds) {
      var value = window.localStorage.getItem(id);
      if (value) {
        selectItem(id, value);
      }
    }
  }

  function selectItem(selectId, value) {
    var select = document.getElementById(selectId);
    for (var i = 0; i < select.children.length; i++) {
      var child = select.children[i];
      if (child.value === value) {
        child.selected = 'true';
        break;
      }
    }
  }

  function updateStatus(str) {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = str;
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  }

  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.querySelector('#qoBuildType').addEventListener('change',
      saveOptions);

})();
