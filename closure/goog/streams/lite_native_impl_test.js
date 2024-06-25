/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { testSuite } from '../testing/testsuite.js';
import liteTestCases from './lite_test_cases.js';
const {TestCases} = liteTestCases;
import liteNativeImpl from './lite_native_impl.js';
const {newReadableStream} = liteNativeImpl;

let nativeImplementation = false;

try {
  new ReadableStream();
  nativeImplementation = true;
} catch (e) {
}

if (nativeImplementation) {
  testSuite(new TestCases(newReadableStream));
} else {
  testSuite({
    testNotEnabledForNonNativeReadableStreamBrowsers() {},
  });
}
