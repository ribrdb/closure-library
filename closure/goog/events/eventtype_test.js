/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import BrowserFeature from './browserfeature.js';
import { EventType } from './eventtype.js';
import { PointerFallbackEventType } from './pointerfallbackeventtype.js';
import { PointerTouchFallbackEventType } from './pointertouchfallbackeventtype.js';
import { testSuite } from '../testing/testsuite.js';

testSuite({
  testPointerFallbackEventType() {
    if (BrowserFeature.POINTER_EVENTS) {
      // Pointer events are supported; use W3C PointerEvent
      assertEquals(EventType.POINTERDOWN, PointerFallbackEventType.POINTERDOWN);
    } else if (BrowserFeature.MSPOINTER_EVENTS) {
      // Only IE10 should support MSPointerEvent
      assertTrue(false);
    } else {
      // Pointer events not supported; fall back to MouseEvent
      assertEquals(EventType.MOUSEDOWN, PointerFallbackEventType.POINTERDOWN);
    }
  },

  testPointerTouchFallbackEventType() {
    if (BrowserFeature.POINTER_EVENTS) {
      // Pointer events are supported; use W3C PointerEvent
      assertEquals(
          EventType.POINTERDOWN, PointerTouchFallbackEventType.POINTERDOWN);
    } else if (BrowserFeature.MSPOINTER_EVENTS) {
      // Only IE10 should support MSPointerEvent
      assertTrue(false);
      // W3C PointerEvent not supported; fall back to MSPointerEvent
      assertEquals(
          EventType.MSPOINTERDOWN, PointerTouchFallbackEventType.POINTERDOWN);
    } else {
      // Pointer events not supported; fall back to TouchEvent
      assertEquals(
          EventType.TOUCHSTART, PointerTouchFallbackEventType.POINTERDOWN);
    }
  },
});
