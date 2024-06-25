/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { JsonFuzzing } from './json_fuzzing.js';
import * as asserts from '../../testing/asserts.js';
import * as googJson from '../../json/json.js';
import { testSuite } from '../../testing/testsuite.js';

testSuite({
  testValidJson() {
    const fuzzing = new JsonFuzzing();  // seeded with now()

    for (let i = 0; i < 10; i++) {
      const data = fuzzing.newArray();
      assertTrue(Array.isArray(data));
      // JSON compatible
      assertNotThrows(() => {
        googJson.serialize(data);
      });
    }
  },
});
