/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { MatcherError } from './matchererror.js';
import { assertThat } from './assertthat.js';

/** @suppress {extraRequire} */
import * as matchers from './matchers.js';

import { testSuite } from '../../testing/testsuite.js';

testSuite({
  testAnythingMatcher() {
    assertThat(true, anything(), 'anything matches true');
    assertThat(false, anything(), 'false matches anything');
  },

  testIs() {
    assertThat(5, is(greaterThan(4)), '5 is > 4');
  },

  testDescribedAs() {
    const e = assertThrows(() => {
      assertThat(4, describedAs('this is a test', greaterThan(6)));
    });
    assertTrue(e instanceof MatcherError);
    assertEquals('this is a test', e.message);
  },
});
