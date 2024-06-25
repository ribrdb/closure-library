/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { ActivityMonitor } from './activitymonitor.js';
import { MockActivityMonitor } from './mockactivitymonitor.js';
import { dispose } from '../disposable/dispose.js';
import * as events from '../events/events.js';
import * as functions from '../functions/functions.js';
import { recordFunction } from '../testing/recordfunction.js';
import { testSuite } from '../testing/testsuite.js';

const googNow = Date.now;
let monitor;
let recordedFunction;
let replacer;

testSuite({
  setUp() {
    monitor = new MockActivityMonitor();
    recordedFunction = recordFunction();

    events.listen(monitor, ActivityMonitor.Event.ACTIVITY, recordedFunction);
  },

  tearDown() {
    dispose(monitor);
    Date.now = googNow;
  },

  testEventFireSameTime() {
    Date.now = functions.constant(1000);

    monitor.simulateEvent();
    assertEquals(1, recordedFunction.getCallCount());

    monitor.simulateEvent();
    assertEquals(2, recordedFunction.getCallCount());
  },

  testEventFireDifferingTime() {
    Date.now = functions.constant(1000);
    monitor.simulateEvent();
    assertEquals(1, recordedFunction.getCallCount());

    Date.now = functions.constant(1001);
    monitor.simulateEvent();
    assertEquals(2, recordedFunction.getCallCount());
  },

  testDispatchEventReturnValue() {
    assertTrue(monitor.dispatchEvent(ActivityMonitor.Event.ACTIVITY));
    assertEquals(1, recordedFunction.getCallCount());
  },

  testDispatchEventPreventDefault() {
    // Undo the listen call in setUp.
    events.unlisten(monitor, ActivityMonitor.Event.ACTIVITY, recordedFunction);

    // Listen with a function that cancels the event.
    events.listen(monitor, ActivityMonitor.Event.ACTIVITY, (e) => {
      e.preventDefault();
    });

    assertFalse(monitor.dispatchEvent(ActivityMonitor.Event.ACTIVITY));
  },
});
