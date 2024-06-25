/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { testSuite } from '../testing/testsuite.js';
import fullTestCases from './full_test_cases.js';
const {TestCases} = fullTestCases;
import fullNativeImpl from './full_native_impl.js';
const {newReadableStream} = fullNativeImpl;

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
