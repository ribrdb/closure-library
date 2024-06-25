/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/** @fileoverview Tests for {@link goog.html.sanitizer.ElementWeakMap} */

goog.setTestOnly();

import { ElementWeakMap } from './elementweakmap.js';
import { testSuite } from '../../testing/testsuite.js';
import * as userAgent from '../../useragent/useragent.js';

/** @const {boolean} */
const ELEMENTWEAKMAP_SUPPORTED = !userAgent.IE || document.documentMode >= 10;

testSuite({
  testBasic() {
    if (!ELEMENTWEAKMAP_SUPPORTED) {
      return;
    }
    const el1 = document.createElement('a');
    const el2 = document.createElement('b');
    const el3 = document.createElement('a');
    const weakMap = ElementWeakMap.newWeakMap();
    weakMap.set(el1, 1);
    weakMap.set(el2, 2);

    assertEquals(1, weakMap.get(el1));
    assertEquals(2, weakMap.get(el2));
    assertUndefined(weakMap.get(el3));
  },

  testDuplicates() {
    if (!ELEMENTWEAKMAP_SUPPORTED) {
      return;
    }
    const el1 = document.createElement('a');
    const el2 = document.createElement('a');
    const weakMap = ElementWeakMap.newWeakMap();
    weakMap.set(el1, 1);
    weakMap.set(el1, 2);

    assertEquals(2, weakMap.get(el1));
    assertUndefined(weakMap.get(el2));
  },

  testClear() {
    if (!ELEMENTWEAKMAP_SUPPORTED) {
      return;
    }
    const el = document.createElement('a');
    const weakMap = ElementWeakMap.newWeakMap();
    weakMap.set(el, 1);
    weakMap.set(el, 2);

    if (weakMap.clear) {
      weakMap.clear();
    }
  }
});
