/*
  Awesome New Tab Page
  Copyright 2011-2013 Awesome HQ, LLC & Michael Hart
  All rights reserved.
  http://antp.co http://awesomehq.com
*/

$("#run-import-btn").hide(); // hide Apply button instantly. (won't work properly if done from CSS)

// select export-textarea's text on focus
$("#export-textarea").bind("focus mousedown mouseup", function(e) {
  e.preventDefault();
  $(this).select();
});

// upon click on import button
$("#import-btn").bind("click", function() {
  $("#export-textarea").hide();
  $importTextarea = $("#import-textarea");
  $importTextarea.show();
  $importTextarea.focus();
  $("#run-import-btn").show();
});

// upon click on restore button
$("#restore-btn").bind("click", function() {
  qTipConfirm(chrome.i18n.getMessage('ui_import_export_confirm_restore_title'), chrome.i18n.getMessage('ui_import_export_confirm_restore'), chrome.i18n.getMessage("ui_button_ok"), chrome.i18n.getMessage("ui_button_cancel"), restore);
});

function restore(callbackReturned) {
  if (callbackReturned === false)
    return;

  var restoreString = localStorage.backupBeforeImport;
  if (restoreString) {
    importLocalStorage(restoreString);
  } else {
    $.jGrowl(chrome.i18n.getMessage("ui_import_export_no_restore_msg"), { header: chrome.i18n.getMessage("ui_import_export_msg_header") });
  }
}

// upon click on export button
$("#export-btn").bind("click", function() {
  $("#import-textarea").hide();
  $("#run-import-btn").hide();
  $textArea = $("#export-textarea");
  $textArea.show();

  buildExportString(function(export_string){
    $textArea.val(export_string);
    $textArea.select();
  });
});

// upon click on Save Backup online
$("#save-backup-btn").bind("click", function() {

});

function buildExportString(callback) {
  storage.get(["tiles", "settings"], function(storage_data) {
    var exportDataObj = {};

    if (storage_data.tiles)
      exportDataObj.tiles = storage_data.tiles;
    if (storage_data.settings_raw)
      exportDataObj.settings = storage_data.settings_raw;

    var base64str = Base64.encode(JSON.stringify(exportDataObj));
    var dateObj = new Date();
    var fullYearVal = dateObj.getFullYear();
    var monthVal = dateObj.getMonth()+1;
    var dateVal = dateObj.getDate();
    if (dateVal<10) {dateVal='0'+dateVal;}
    if (monthVal<10) {monthVal='0'+monthVal;}

    var exportString = '[ANTP_EXPORT|' + fullYearVal + '-' + monthVal + '-' + dateVal + '|' + chrome.app.getDetails().version + '|' + base64str + ']';
    callback(exportString);
  });
}


// upon click on run import button
$("#import-export-contents #run-import-btn").bind("click", function() {
  var $textArea = $("#import-textarea");
  var inputStr = $textArea.val().trim();
  if (validateImportString(inputStr)) {
    importLocalStorage(inputStr);
  }
});

function validateImportString(importString) {
  if (importString.length == 0) {
    $.jGrowl(chrome.i18n.getMessage("ui_import_export_empty_string_msg"), { header: chrome.i18n.getMessage("ui_import_export_msg_header") });
    return false;
  } else {
    var stringParts = importString.split('|');
    if (stringParts.length != 4 || stringParts[0] != "[ANTP_EXPORT" || (new Date(stringParts[1])).toString() == "Invalid Date" || stringParts[3].length < 1) {
      $.jGrowl(chrome.i18n.getMessage("ui_import_export_invalid_string_msg"), { header: chrome.i18n.getMessage("ui_import_export_msg_header") });
      return false;
    } else {
      var antpVersion = stringParts[2].split('.');
      if (antpVersion.length < 3) {
        $.jGrowl(chrome.i18n.getMessage("ui_import_export_invalid_string_msg"), { header: chrome.i18n.getMessage("ui_import_export_msg_header") });
        return false;
      }
    }
  }
  return true;
}

function importLocalStorage(importString) {
  buildExportString(function(export_string) {
    localStorage.backupBeforeImport = export_string;
    localStorage.msg = JSON.stringify({
      title: chrome.i18n.getMessage("ui_online_backup_backup_imported_title"),
      message: chrome.i18n.getMessage("ui_online_backup_backup_imported")
    });

    importString = importString.substring(0, importString.length-1);
    var tArr = importString.split('|');
    var base64str = tArr[tArr.length-1];
    var exportDataObj = JSON.parse(Base64.decode(base64str));

    if (exportDataObj.tiles) {
      storage.set({tiles: exportDataObj.tiles});
      if (exportDataObj.settings) {
        storage.set({settings: exportDataObj.settings});
      }
    } else if (exportDataObj.widgets) {
      storage.set({tiles: JSON.parse(exportDataObj.widgets)});
    }

    window.location.reload();
  });
}
