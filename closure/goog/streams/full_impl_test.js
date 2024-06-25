/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { testSuite } from '../testing/testsuite.js';
import fullTestCases from './full_test_cases.js';
const {TestCasesWithIterator} = fullTestCases;
import fullImpl from './full_impl.js';
const {newReadableStream} = fullImpl;

testSuite(new TestCasesWithIterator(newReadableStream));
