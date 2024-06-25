/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { DimensionPicker } from './dimensionpicker.js';
import { DimensionPickerRenderer } from './dimensionpickerrenderer.js';
import { LivePriority } from '../a11y/aria/attributes.js';
import * as googArray from '../array/array.js';
import { recordFunction } from '../testing/recordfunction.js';
import { testSuite } from '../testing/testsuite.js';

let renderer;
let picker;

testSuite({
  setUp() {
    renderer = new DimensionPickerRenderer();
    picker = new DimensionPicker(renderer);
  },

  tearDown() {
    picker.dispose();
  },

  /**
   * Tests that the right aria label is added when the highlighted
   * size changes.
   */
  testSetHighlightedSizeUpdatesLiveRegion() {
    picker.render();

    const sayFunction = recordFunction();
    /** @suppress {visibility} suppression added to enable type checking */
    renderer.announcer_.say = sayFunction;
    renderer.setHighlightedSize(picker, 3, 7);

    assertEquals(1, sayFunction.getCallCount());

    assertTrue(googArray.equals(
        ['3 by 7', LivePriority.ASSERTIVE],
        sayFunction.getLastCall().getArguments()));
  },
});
