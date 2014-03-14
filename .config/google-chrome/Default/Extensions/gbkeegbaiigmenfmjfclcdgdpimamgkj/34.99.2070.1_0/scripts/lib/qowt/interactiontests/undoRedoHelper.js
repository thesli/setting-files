
// Copyright 2013 Google Inc. All Rights Reserved.

/**
 * @fileoverview Module that exposes the undo/redo toolbar buttons and menu
 * shortcut keys.
 *
 * @author dskelton@google.com (Duncan Skelton)
 */

define([
    'qowtRoot/pubsub/pubsub',
  ], function(
    PubSub
  ) {

  'use strict';

  var _api = {

    /**
     * Triggers undo in a runs clause and waits for it. This should only be
     * called by tests, and should be called outside of runs and wait clauses.
     */
    runUndoAndWait: function() {
      _runAndWait('undo');
    },

    /**
     * Triggers redo in a runs clause and waits for it.This should only be
     * called by tests, and should be called outside of runs and wait clauses.
     */
    runRedoAndWait: function() {
      _runAndWait('redo');
    },
  };

  /**
   * Publishes a common action, and waits for a qowt:unlockScreen event and
   * a command sequence end. See _isCommandSequenceEnd for an understanding of
   * command sequence ends. This should only be called by tests, and should be
   * called outside of runs and wait clauses.
   */
  var _runAndWait = function(action) {
    var _commandEnd = false, _screenUnlocked = false;
    var _commandEndToken;

    runs(function() {
      _commandEndToken = PubSub.subscribe(
          'qowt:doAction', function(event, eventData) {
        if (_isCommandSequenceEnd(eventData)) {
          PubSub.unsubscribe(_commandEndToken);
          _commandEnd = true;
        }
      });

      PubSub.subscribeOnce('qowt:unlockScreen', function(event, eventData) {
        _screenUnlocked = true;
      });

      _publishCommonAction(action);
    });

    waitsFor(function() {
      return _commandEnd && _screenUnlocked;
    }, 'command sequence end', 30000);
  };

  /**
   * Checks whether or not the specified event data corresponds to the end of
   * a DCP command sequence.
   *
   * @param {Object} eventData data associated to the event.
   * @return {Boolean} true if the event data corresponds to the end of a DCP
   *                   command sequence, false otherwise.
   */
  var _isCommandSequenceEnd = function(eventData) {
    return eventData.context &&
           eventData.context.contentType === 'common' &&
           eventData.action === 'commandSequenceEnd';
  };

  /**
   * Publishes a doAction event with contentType 'common' and specified action.
   * It just so happens that, currently, action='undo' triggers an undo, and
   * action='redo' triggers a redo.
   *
   * @param {String} action the value of the action field of the doAction event.
   */
  var _publishCommonAction = function(action) {
    PubSub.publish('qowt:doAction', {
      action: action,
      context: {
        contentType: 'common'
      }
    });
  };

  return _api;
});
