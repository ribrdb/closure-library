/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { SliderBase } from './sliderbase.js';
import { TwoThumbSlider } from './twothumbslider.js';
import { dispose } from '../disposable/dispose.js';
import { testSuite } from '../testing/testsuite.js';

let slider;

testSuite({
  tearDown() {
    dispose(slider);
  },

  /** @suppress {visibility} suppression added to enable type checking */
  testGetCssClass() {
    slider = new TwoThumbSlider();
    assertEquals(
        'goog-twothumbslider-horizontal',
        slider.getCssClass(SliderBase.Orientation.HORIZONTAL));
    assertEquals(
        'goog-twothumbslider-vertical',
        slider.getCssClass(SliderBase.Orientation.VERTICAL));
  },
});
