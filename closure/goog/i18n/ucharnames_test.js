/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { testSuite } from '../testing/testsuite.js';
import * as uCharNames from './ucharnames.js';

testSuite({
  testToName() {
    const result = uCharNames.toName(' ');
    assertEquals('Space', result);
  },

  testToNameForNumberKey() {
    const result = uCharNames.toName('\u2028');
    assertEquals('Line Separator', result);
  },

  testToNameForVariationSelector() {
    const result = uCharNames.toName('\ufe00');
    assertEquals('Variation Selector - 1', result);
  },

  testToNameForVariationSelectorSupp() {
    const result = uCharNames.toName('\uDB40\uDD00');
    assertEquals('Variation Selector - 17', result);
  },

  testToNameForNull() {
    const result = uCharNames.toName('a');
    assertNull(result);
  },
});
