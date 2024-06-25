/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import * as adobeReader from './adobereader.js';
import { testSuite } from '../testing/testsuite.js';

// For now, just test that the variables exist, the test runner will
// pick up any runtime errors.
// TODO(chrisn): Mock out each browser implementation and test the code path
// correctly detects the version for each case.

testSuite({
  testAdobeReader() {
    assertNotUndefined(adobeReader.HAS_READER);
    assertNotUndefined(adobeReader.VERSION);
    assertNotUndefined(adobeReader.SILENT_PRINT);
  },
});
