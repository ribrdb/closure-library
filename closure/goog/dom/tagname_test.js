/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { TagName } from './tagname.js';
import { testSuite } from '../testing/testsuite.js';

testSuite({
  testCorrectNumberOfTagNames() {
    assertEquals(
        130,
        Object.entries(TagName)
            .filter(([k, v]) => typeof v === 'string')
            .length);
  },

  testPropertyNamesEqualValues() {
    Object.entries(TagName)
        .filter(([k, v]) => typeof v === 'string')
        .forEach(([k, v]) => {
          assertEquals(k, v);
        });
  },
});
