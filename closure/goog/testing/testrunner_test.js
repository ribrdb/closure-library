/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { TestCase } from './testcase.js';
import { TestRunner } from './testrunner.js';
import * as asserts from './asserts.js';
import { testSuite } from './testsuite.js';

let testRunner;
let testCase;

testSuite({
  setUp() {
    testRunner = new TestRunner();
    testCase = new TestCase();
  },

  testInitialize() {
    assert(!testRunner.isInitialized());
    testRunner.initialize(testCase);
    assert(testRunner.isInitialized());
  },

  testIsFinished() {
    testRunner.initialize(testCase);
    assert(!testRunner.isFinished());
    testRunner.logError('oops');
    assert(testRunner.isFinished());
  },

  testGetUniqueId() {
    // We only really care that this string is unique to instances.
    const anotherRunner = new TestRunner();
    assert(anotherRunner.getUniqueId() != testRunner.getUniqueId());
  },
});
