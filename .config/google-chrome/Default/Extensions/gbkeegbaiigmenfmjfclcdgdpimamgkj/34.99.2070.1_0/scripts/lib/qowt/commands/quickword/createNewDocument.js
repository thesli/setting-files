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
 * @fileoverview Defines a command to create a new document of the
 * specified format
 * @return {Object} A createNewDocument command
 * @author Duncan
 */
define([
    'qowtRoot/pubsub/pubsub',
    'qowtRoot/commands/commandBase',
    'qowtRoot/events/errors/createNewDocument'],
  function(
    PubSub,
    CommandBase,
    CreateNewDocumentError) {


  var _factory = {

    create: function(documentFormat) {

      // use module pattern for instance object
      var module = function() {

          // extend default command (optimistic==false, callsService==true)
          var _api = CommandBase.create('createNewDocument', false, true);


          /**
           * Return an object with the data to be used as the payload of
           * the request.
           * Request manager will add the unique ID to this payload to
           * track and match client-server request-response
           * The name property is mandatory.
           *
           * @return  {Object} The JSON Payload to send to the dcp service
           */
          _api.dcpData = function() {
            var data = {
              name: "createNewDocument"
            };
            data.fmt = documentFormat || "word2007";

            return data;
          };


          /**
           * Hook for any command-specific behaviour you may have.
           * Invoked after the framework has processed any DCP response
           * Only called for after successful responses
           * CommandBase provides a try block to catch exceptions
           * generated herein.
           *
           * @param   response {DCPresponse}  The newly handled response object
           * @override
           * @see     src/commands/qowtCommand.js
           */

          // Not implemented. We simply use the framework-generated signals.
          /**
           * @override
           * @see     src/commands/qowtCommand.js
           * @param response {DCP Response | undefined} The failing
           * DCP response from service call or undefined if optimistic
           * handling failure.
           * @param errorPolicy {object} A policy object used to determine
           * what behaviour to use in handling the response.
           */
          _api.onFailure = function(response, errorPolicy) {
            var rsp = CreateNewDocumentError.create();
            if (errorPolicy) {
              errorPolicy.eventDispatched = true;
            }
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
