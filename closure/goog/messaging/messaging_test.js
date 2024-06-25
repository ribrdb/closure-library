/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { MockControl } from '../testing/mockcontrol.js';
import { MockMessageChannel } from '../testing/messaging/mockmessagechannel.js';
import * as messaging from './messaging.js';
import { testSuite } from '../testing/testsuite.js';

testSuite({
  testPipe() {
    const mockControl = new MockControl();
    const ch1 = new MockMessageChannel(mockControl);
    const ch2 = new MockMessageChannel(mockControl);
    ch1.send('ping', 'HELLO');
    ch2.send('pong', {key: 'value'});
    messaging.pipe(ch1, ch2);

    mockControl.$replayAll();
    ch2.receive('ping', 'HELLO');
    ch1.receive('pong', {key: 'value'});
    mockControl.$verifyAll();
  },
});
