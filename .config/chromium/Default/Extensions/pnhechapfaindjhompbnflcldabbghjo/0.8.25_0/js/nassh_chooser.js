// Copyright (c) 2013 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

nassh.Chooser = function(app, execMsg) {
  this.app = app;
  this.execMsg = execMsg;
  this.argv = execMsg.arg.argv;

};

nassh.Chooser.main = function(app, execMsg) {
  if (!(execMsg.arg instanceof Object)) {
    execMsg.closeError(lib.wa.error.INVALID_PARAM, 'arg: Expected object');
    return;
  }

  if (execMsg.arg.argv && !(execMsg.arg.argv instanceof Object)) {
    execMsg.closeError(lib.wa.error.INVALID_PARAM, 'arg.argv: Expected object');
    return;
  }

  var chooser = new nassh.Chooser(app, execMsg);
  chooser.
};
