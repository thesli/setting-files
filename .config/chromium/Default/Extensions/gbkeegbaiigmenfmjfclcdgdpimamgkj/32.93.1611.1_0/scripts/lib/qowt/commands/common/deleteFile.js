/*!
 * Copyright Quickoffice, Inc, 2005-2011
 *
 * NOTICE:   The intellectual and technical concepts contained
 * herein are proprietary to Quickoffice, Inc. and is protected by
 * trade secret and copyright law. Dissemination of any of this
 * information or reproduction of this material is strictly forbidden
 * unless prior written permission is obtained from Quickoffice, Inc.
 */


/**
 * @fileoverview Defines command to delete local files
 * @return {Object} A deleteFile command
 */
define([
    'qowtRoot/pubsub/pubsub',
    'qowtRoot/commands/commandBase',
    'qowtRoot/events/errors/fileDeleteError'],
  function(
    PubSub,
    CommandBase,
    FileDeleteError) {


  var _factory = {

    create: function(path, index) {

      // use module pattern for instance object
      var module = function() {

          // extend default command (optimistic==false, callsService==true)
          var _api = CommandBase.create("deleteFile", false, true);


          /**
           * Return an object with the data to be used as the payload of the
           * request.Request manager will add the unique ID to this payload to
           * track and match client-server request-response
           * The name property is mandatory.
           *
           * @return  {Object} The JSON Payload to send to the dcp service
           */
          _api.dcpData = function() {
            var data = {
              name: "deleteFile",
              path: path
            };
            return data;
          };


          /**
           * Hook for any command-specific behaviour you may have.
           * Invoked after the framework has processed any DCP response
           * Only called for after successful responses
           *
           * @param   response {DCPresponse}  The newly handled response object
           * @override
           * @see     src/commands/qowtCommand.js
           */
          _api.onSuccess = function(response) {
            // console.log("deleteFile command - success");
            PubSub.publish('qowt:fileDeleted', {
              success: true,
              src: response.src,
              dst: response.dst,
              e: response.e,
              fileIndex: index
            });
          };


          /**
           * @override
           * @see     src/commands/qowtCommand.js
           * @param   response {DCP Response} The received failure response
           */
          _api.onFailure = function(response) {
            console.error("deleteFile command - failed: " + response.e);
            var rsp = FileDeleteError.create();
            rsp.msg = response.e;
            PubSub.publish('qowt:error', rsp);
          };


          return _api;
        };

      // We create a new instance of the object by invoking
      // the module constructor function.
      var instance = module();
      return instance;
    }
  };

  return _factory;
});
