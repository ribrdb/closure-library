/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import * as tags from './tags.js';
import { testSuite } from '../testing/testsuite.js';

testSuite({
  testIsVoidTag() {
    assertTrue(tags.isVoidTag('br'));
    assertFalse(tags.isVoidTag('a'));
    assertFalse(tags.isVoidTag('constructor'));
  },
});
