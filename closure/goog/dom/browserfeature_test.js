/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import * as BrowserFeature from './browserfeature.js';
import * as dom from './dom.js';
import { testSuite } from '../testing/testsuite.js';

let context2d = null;
let contextwebgl = null;

testSuite({
  setUp() {
    try {
      const canvas = new window.OffscreenCanvas(0, 0);
      context2d = canvas.getContext('2d');
    } catch (ex) {
    }
  },

  testOffscreenCanvasSupport() {
    assertEquals(Boolean(context2d), BrowserFeature.OFFSCREEN_CANVAS_2D);
  },

  testOffscreenCanvas2DUsage() {
    if (!BrowserFeature.OFFSCREEN_CANVAS_2D) {
      return;
    }

    assertNotNullNorUndefined(window.OffscreenCanvas);
    const canvas = new window.OffscreenCanvas(1, 1);
    assertNotNullNorUndefined(canvas);

    const ctx = canvas.getContext('2d');
    assertNotNullNorUndefined(ctx);
  },
});
