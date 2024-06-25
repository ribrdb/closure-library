/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { EventTarget as GoogEventTarget } from '../events/eventtarget.js';
import { MockControl } from '../testing/mockcontrol.js';
import { MockMessageChannel } from '../testing/messaging/mockmessagechannel.js';
import { PortCaller } from './portcaller.js';
import { PortNetwork } from './portnetwork.js';
import { dispose } from '../disposable/dispose.js';
import { testSuite } from '../testing/testsuite.js';

let mockControl;
let mockChannel;
let caller;

class MockMessagePort extends GoogEventTarget {
  constructor(index, port) {
    super();
    this.index = index;
    this.port = port;
    this.started = false;
  }

  start() {
    this.started = true;
  }
}

testSuite({
  setUp() {
    mockControl = new MockControl();
    mockChannel = new MockMessageChannel(mockControl);
    caller = new PortCaller(mockChannel);
  },

  tearDown() {
    dispose(caller);
    mockControl.$verifyAll();
  },

  testGetPort() {
    mockChannel.send(PortNetwork.REQUEST_CONNECTION_SERVICE, 'foo');
    mockControl.$replayAll();
    caller.dial('foo');
  },
});
