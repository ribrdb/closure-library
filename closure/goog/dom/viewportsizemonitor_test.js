/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { EventType } from '../events/eventtype.js';
import { Event as GoogEvent } from '../events/event.js';
import { EventTarget as GoogEventTarget } from '../events/eventtarget.js';
import { MockClock } from '../testing/mockclock.js';
import { PropertyReplacer } from '../testing/propertyreplacer.js';
import { Size } from '../math/size.js';
import { ViewportSizeMonitor } from './viewportsizemonitor.js';
import * as dom from './dom.js';
import * as events from '../events/events.js';
import { testSuite } from '../testing/testsuite.js';

let propertyReplacer;
let /** ? */ fakeWindow;
let viewportSizeMonitor;
let mockClock;
let viewportSize;

class FakeWindow extends GoogEventTarget {
  /** @suppress {checkTypes} suppression added to enable type checking */
  fireResize() {
    return this.dispatchEvent(new FakeResizeEvent());
  }
}

class FakeResizeEvent extends GoogEvent {
  /** @suppress {checkTypes} suppression added to enable type checking */
  constructor(obj) {
    super();
    this.type = EventType.RESIZE;
  }
}

function getViewportSize() {
  return viewportSize;
}

function setViewportSize(w, h, fireEvent) {
  viewportSize = new Size(w, h);
  if (fireEvent) {
    fakeWindow.fireResize();
  }
}

const eventWasFired = {};
function getListenerFn(id) {
  return () => {
    propertyReplacer.set(eventWasFired, id, true);
  };
}

function listenerWasCalled(id) {
  return !!eventWasFired[id];
}

testSuite({
  /** @suppress {checkTypes} suppression added to enable type checking */
  setUp() {
    propertyReplacer = new PropertyReplacer();
    propertyReplacer.set(dom, 'getViewportSize', getViewportSize);
    mockClock = new MockClock();
    mockClock.install();
    fakeWindow = new FakeWindow();
    setViewportSize(300, 300);
    /** @suppress {checkTypes} suppression added to enable type checking */
    viewportSizeMonitor = new ViewportSizeMonitor(fakeWindow);
  },

  tearDown() {
    propertyReplacer.reset();
    mockClock.uninstall();
  },

  testResizeEvent() {
    events.listen(viewportSizeMonitor, EventType.RESIZE, getListenerFn(1));
    assertFalse(
        'Listener should not be called if window was not resized',
        listenerWasCalled(1));
    setViewportSize(300, 300, true);
    assertFalse(
        'Listener should not be called for bogus resize event',
        listenerWasCalled(1));
    setViewportSize(301, 301, true);
    assertTrue(
        'Listener should be called for valid resize event',
        listenerWasCalled(1));
  },

  testInstanceGetter() {
    const fakeWindow1 = new FakeWindow();
    /** @suppress {checkTypes} suppression added to enable type checking */
    const monitor1 = ViewportSizeMonitor.getInstanceForWindow(fakeWindow1);
    /** @suppress {checkTypes} suppression added to enable type checking */
    const monitor2 = ViewportSizeMonitor.getInstanceForWindow(fakeWindow1);
    assertEquals(
        'The same window should give us the same instance monitor', monitor1,
        monitor2);

    const fakeWindow2 = new FakeWindow();
    /** @suppress {checkTypes} suppression added to enable type checking */
    const monitor3 = ViewportSizeMonitor.getInstanceForWindow(fakeWindow2);
    assertNotEquals(
        'Different windows should give different instances', monitor1,
        monitor3);

    assertEquals(
        'Monitors should match if opt_window is not provided',
        ViewportSizeMonitor.getInstanceForWindow(),
        ViewportSizeMonitor.getInstanceForWindow());
  },

  /** @suppress {checkTypes} suppression added to enable type checking */
  testRemoveInstanceForWindow() {
    const fakeWindow1 = new FakeWindow();
    /** @suppress {checkTypes} suppression added to enable type checking */
    const monitor1 = ViewportSizeMonitor.getInstanceForWindow(fakeWindow1);

    ViewportSizeMonitor.removeInstanceForWindow(fakeWindow1);
    assertTrue(monitor1.isDisposed());

    /** @suppress {checkTypes} suppression added to enable type checking */
    const monitor2 = ViewportSizeMonitor.getInstanceForWindow(fakeWindow1);
    assertNotEquals(monitor1, monitor2);
  },
});
