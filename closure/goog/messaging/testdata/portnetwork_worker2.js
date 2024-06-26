/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

// Use of this source code is governed by the Apache License, Version 2.0.
// See the COPYING file for details.

/**
 * @fileoverview A web worker for integration testing the PortPool class.
 *
 * @nocompile
 */

self.CLOSURE_BASE_PATH =
self.CLOSURE_BASE_PATH = '../../';
importScripts('../../bootstrap/webworkers.js');
self.CLOSURE_DEFINES = self.CLOSURE_DEFINES || {};
self.CLOSURE_DEFINES['goog.ENABLE_DEBUG_LOADER'] = true;
importScripts('../../base.js');

// The provide is necessary to stop the jscompiler from thinking this is an
// entry point and adding it into the manifest incorrectly.
goog.provide('goog.messaging.testdata.portnetwork_worker2');

Promise.all([import('../portchannel.js'), import('../portcaller.js')]).then(([{PortChannel}, {PortCaller}]) => {
function startListening() {
  console.log('worker2 startListening');
  const caller =
      new PortCaller(new PortChannel(self));

  caller.dial('main').registerService('sendToFrame', function(msg) {
    console.log('worker2 sendToFrame');
    'use strict';
    msg.push('worker2');
    caller.dial('frame').send('sendToWorker1', msg);
  }, true);
}

startListening();
});