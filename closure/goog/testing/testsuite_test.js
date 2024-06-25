/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { TestCase } from './testcase.js';
import * as asserts from './asserts.js';
import { testSuite } from './testsuite.js';

let calls;

testSuite({
  setUp() {
    calls = 0;
    TestCase.initializeTestRunner = () => {
      calls++;
    };
    testSuite.resetForTesting();
  },

  testTestSuiteInitializesRunner() {
    testSuite({testOne: function() {}});
    assert(calls == 1);
  },

  testTestSuiteInitializesRunnerThrowsOnSecondCall() {
    testSuite({testOne: function() {}});
    assertThrows(() => {
      testSuite({testTwo: function() {}});
    });
  },
});
