/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { MockRange } from './mockrange.js';
import { testSuite } from './testsuite.js';

testSuite({
  /**
   * Tests that a MockRange can be created successfully, a call to a mock
   * method can be recorded, and the correct behavior replayed and verified.
   * @suppress {missingProperties} suppression added to enable type checking
   */
  testMockMethod() {
    const mockRange = new MockRange();
    mockRange.getStartOffset().$returns(42);
    mockRange.$replay();

    assertEquals(
        'Mock method should return recorded value', 42,
        mockRange.getStartOffset());
    mockRange.$verify();
  },
});
