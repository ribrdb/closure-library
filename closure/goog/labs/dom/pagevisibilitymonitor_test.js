/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import * as testingEvents from '../../testing/events/events.js';
import { Event as GoogTestingEvent } from '../../testing/events/events.js';
import { PageVisibilityMonitor } from './pagevisibilitymonitor.js';
import { PropertyReplacer } from '../../testing/propertyreplacer.js';
import { dispose } from '../../disposable/dispose.js';
import * as events from '../../events/events.js';
import * as functions from '../../functions/functions.js';
import { recordFunction } from '../../testing/recordfunction.js';
import { testSuite } from '../../testing/testsuite.js';

const stubs = new PropertyReplacer();
let vh;

testSuite({
  tearDown() {
    dispose(vh);
    vh = null;
    stubs.reset();
  },

  testConstructor() {
    vh = new PageVisibilityMonitor();
  },

  /** @suppress {const} See go/const-js-library-faq */
  testNoVisibilitySupport() {
    stubs.set(
        PageVisibilityMonitor.prototype, 'getBrowserEventType_',
        functions.NULL);

    const listener = recordFunction();
    vh = new PageVisibilityMonitor();

    events.listen(vh, 'visibilitychange', listener);

    const e = new GoogTestingEvent('visibilitychange');
    e.target = window.document;
    testingEvents.fireBrowserEvent(e);
    assertEquals(0, listener.getCallCount());
  },

  testListener() {
    stubs.set(
        PageVisibilityMonitor.prototype, 'getBrowserEventType_',
        functions.constant('visibilitychange'));

    const listener = recordFunction();
    vh = new PageVisibilityMonitor();

    events.listen(vh, 'visibilitychange', listener);

    const e = new GoogTestingEvent('visibilitychange');
    /**
     * @suppress {constantProperty} suppression added to enable type checking
     */
    e.target = window.document;
    testingEvents.fireBrowserEvent(e);

    assertEquals(1, listener.getCallCount());
  },

  testListenerForWebKit() {
    stubs.set(
        PageVisibilityMonitor.prototype, 'getBrowserEventType_',
        functions.constant('webkitvisibilitychange'));

    const listener = recordFunction();
    vh = new PageVisibilityMonitor();

    events.listen(vh, 'visibilitychange', listener);

    const e = new GoogTestingEvent('webkitvisibilitychange');
    /**
     * @suppress {constantProperty} suppression added to enable type checking
     */
    e.target = window.document;
    testingEvents.fireBrowserEvent(e);

    assertEquals(1, listener.getCallCount());
  },
});
