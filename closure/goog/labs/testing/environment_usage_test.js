/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { Environment } from './environment.js';
import { testSuite } from '../../testing/testsuite.js';

let testing = false;
const env = new Environment();

testSuite({
  setUpPage() {
    assertFalse(testing);
  },

  setUp() {
    testing = true;
  },

  testOne() {
    assertTrue(testing);
  },

  testTwo() {
    assertTrue(testing);
  },

  tearDown() {
    testing = false;
  },

  tearDownPage() {
    assertFalse(testing);
  },
});
