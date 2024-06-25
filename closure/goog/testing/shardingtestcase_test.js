/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { ShardingTestCase } from './shardingtestcase.js';
import { TestCase } from './testcase.js';
import * as asserts from './asserts.js';

/** @suppress {extraRequire} */
import * as jsunit from './jsunit.js';

const testCase = new ShardingTestCase(1, 2);
testCase.setTestObj({
  testA() {},

  testB() {
    fail('testB should not be in this shard');
  },
});
TestCase.initializeTestRunner(testCase);
