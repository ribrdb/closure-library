/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Tests for BufferedViewportSizeMonitor.
 */

/** @suppress {extraProvide} */
goog.setTestOnly();

import { BufferedViewportSizeMonitor } from './bufferedviewportsizemonitor.js';
import { EventType } from '../events/eventtype.js';
import * as testingEvents from '../testing/events/events.js';
import { Event as GoogTestingEvent } from '../testing/events/events.js';
import { MockClock } from '../testing/mockclock.js';
import { Size } from '../math/size.js';
import { ViewportSizeMonitor } from './viewportsizemonitor.js';
import * as events from '../events/events.js';
import { testSuite } from '../testing/testsuite.js';

/** @suppress {visibility} suppression added to enable type checking */
const RESIZE_DELAY = BufferedViewportSizeMonitor.RESIZE_EVENT_DELAY_MS_;
const INITIAL_SIZE = new Size(111, 111);

let mockControl;
let viewportSizeMonitor;
let bufferedVsm;
const timer = new MockClock();
let resizeEventCount = 0;
let size;

const resizeCallback = () => {
  resizeEventCount++;
};

function resize(width, height) {
  size = new Size(width, height);
  testingEvents.fireBrowserEvent(
      new GoogTestingEvent(EventType.RESIZE, viewportSizeMonitor));
}
testSuite({
  setUp() {
    timer.install();

    size = INITIAL_SIZE;
    viewportSizeMonitor = new ViewportSizeMonitor();
    viewportSizeMonitor.getSize = () => size;
    bufferedVsm = new BufferedViewportSizeMonitor(viewportSizeMonitor);

    events.listen(bufferedVsm, EventType.RESIZE, resizeCallback);
  },

  tearDown() {
    events.unlisten(bufferedVsm, EventType.RESIZE, resizeCallback);
    resizeEventCount = 0;
    timer.uninstall();
  },

  testInitialSizes() {
    assertTrue(Size.equals(INITIAL_SIZE, bufferedVsm.getSize()));
  },

  testWindowResize() {
    assertEquals(0, resizeEventCount);
    resize(100, 100);
    timer.tick(RESIZE_DELAY - 1);
    assertEquals(
        'No resize expected before the delay is fired', 0, resizeEventCount);
    timer.tick(1);
    assertEquals('Expected resize after delay', 1, resizeEventCount);
    assertTrue(Size.equals(new Size(100, 100), bufferedVsm.getSize()));
  },

  testWindowResize_eventBatching() {
    assertEquals(
        'No resize calls expected before resize events', 0, resizeEventCount);
    resize(100, 100);
    timer.tick(RESIZE_DELAY - 1);
    resize(200, 200);
    assertEquals(
        'No resize expected before the delay is fired', 0, resizeEventCount);
    timer.tick(1);
    assertEquals(
        'No resize expected when delay is restarted', 0, resizeEventCount);
    timer.tick(RESIZE_DELAY);
    assertEquals('Expected resize after delay', 1, resizeEventCount);
  },

  testWindowResize_noChange() {
    resize(100, 100);
    timer.tick(RESIZE_DELAY);
    assertEquals(1, resizeEventCount);
    resize(100, 100);
    timer.tick(RESIZE_DELAY);
    assertEquals(
        'No resize expected when size doesn\'t change', 1, resizeEventCount);
    assertTrue(Size.equals(new Size(100, 100), bufferedVsm.getSize()));
  },

  testWindowResize_previousSize() {
    resize(100, 100);
    timer.tick(RESIZE_DELAY);
    assertEquals(1, resizeEventCount);
    assertTrue(Size.equals(new Size(100, 100), bufferedVsm.getSize()));

    resize(200, 200);
    timer.tick(RESIZE_DELAY);
    assertEquals(2, resizeEventCount);
    assertTrue(Size.equals(new Size(200, 200), bufferedVsm.getSize()));
  },
});
