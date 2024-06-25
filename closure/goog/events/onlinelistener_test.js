/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { Event as GoogEvent } from './event.js';
import { MockClock } from '../testing/mockclock.js';
import { NetworkStatusMonitor } from '../net/networkstatusmonitor.js';
import { OnlineHandler } from './onlinehandler.js';
import { PropertyReplacer } from '../testing/propertyreplacer.js';
import * as events from './events.js';
import { testSuite } from '../testing/testsuite.js';

const stubs = new PropertyReplacer();
const clock = new MockClock();
let online = true;
let onlineCount;
let offlineCount;

function listenToEvents(oh) {
  onlineCount = 0;
  offlineCount = 0;

  events.listen(oh, NetworkStatusMonitor.EventType.ONLINE, (e) => {
    assertTrue(oh.isOnline());
    onlineCount++;
  });
  events.listen(oh, NetworkStatusMonitor.EventType.OFFLINE, (e) => {
    assertFalse(oh.isOnline());
    offlineCount++;
  });
}

testSuite({
  setUp() {
    stubs.set(OnlineHandler.prototype, 'isOnline', () => online);
  },

  tearDown() {
    stubs.reset();
    clock.uninstall();
  },

  testConstructAndDispose() {
    const oh = new OnlineHandler();
    oh.dispose();
  },


  testHtml5() {
    // Test for browsers that fire network events on window.

    let oh = new OnlineHandler();
    listenToEvents(oh);

    online = false;
    let e = new GoogEvent('offline');
    events.fireListeners(window, e.type, false, e);

    assertEquals(0, onlineCount);
    assertEquals(1, offlineCount);

    online = true;
    e = new GoogEvent('online');
    events.fireListeners(window, e.type, false, e);

    assertEquals(1, onlineCount);
    assertEquals(1, offlineCount);

    oh.dispose();
  },
});
