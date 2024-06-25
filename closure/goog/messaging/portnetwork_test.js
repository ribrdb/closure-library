/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { Promise as GoogPromise } from '../promise/promise.js';
import { PortChannel } from './portchannel.js';
import { PortOperator } from './portoperator.js';
import { TestCase } from '../testing/testcase.js';
import { Timer } from '../timer/timer.js';
import * as browser from '../labs/useragent/browser.js';
import { dispose } from '../disposable/dispose.js';
import { testSuite } from '../testing/testsuite.js';

let timer;

function shouldRunTests() {
  // TODO(user): This test fails when run in a suite immediately after
  // portchannel_test. The workers take dozens of seconds to start up for some
  // reason.
  return !browser.isEdge();
}

testSuite({
  setUpPage() {
    // Use a relatively long timeout because workers can take a while to start
    // up.
    TestCase.getActiveTestCase().promiseTimeout = 60 * 1000;
  },

  setUp() {
    timer = new Timer(50);
  },

  tearDown() {
    dispose(timer);
  },

  testRouteMessageThroughWorkers() {
    if (!('MessageChannel' in globalThis)) {
      return;
    }

    const master = new PortOperator('main');
    master.addPort(
        'worker1',
        new PortChannel(new Worker('testdata/portnetwork_worker1.js')));
    master.addPort(
        'worker2',
        new PortChannel(new Worker('testdata/portnetwork_worker2.js')));
    const peerOrigin = window.location.protocol + '//' + window.location.host;
    master.addPort(
        'frame',
        PortChannel.forEmbeddedWindow(
            window.frames['inner'], peerOrigin, timer));

    const promise = new GoogPromise((resolve, reject) => {
      master.dial('worker1').registerService('result', resolve, true);
    });
    master.dial('worker2').send('sendToFrame', ['main']);

    return promise
        .then((msg) => {
          assertArrayEquals(['main', 'worker2', 'frame', 'worker1'], msg);
        })
        .thenAlways(() => {
          master.dispose();
        });
  },
});
