/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { ControlRenderer } from '../../ui/controlrenderer.js';
import * as asserts from '../asserts.js';
import rendererasserts from './rendererasserts.js';
import { testSuite } from '../testsuite.js';

testSuite({
  testSuccess() {
    function GoodRenderer() {}

    rendererasserts.assertNoGetCssClassCallsInConstructor(GoodRenderer);
  },

  testFailure() {
    function BadRenderer() {
      ControlRenderer.call(this);
      this.myClass = this.getCssClass();
    }
    goog.inherits(BadRenderer, ControlRenderer);

    // Expected assertNoGetCssClassCallsInConstructor to fail.
    const ex = assertThrowsJsUnitException(() => {
      rendererasserts.assertNoGetCssClassCallsInConstructor(BadRenderer);
    });
    assertTrue(
        'Expected assertNoGetCssClassCallsInConstructor to throw a' +
            ' jsunit exception',
        ex.isJsUnitException);
    assertContains('getCssClass', ex.message);
  },
});
