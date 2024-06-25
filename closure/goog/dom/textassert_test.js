/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { testSuite } from '../testing/testsuite.js';
import * as textAssert from './textassert.js';

testSuite({
  testAssertIsTextThrowsWithHtmlTags: function() {
    const e = assertThrows(() => textAssert.assertHtmlFree('<b>a<\\b>'));
    assertEquals(
        'Assertion failed: String has HTML original: ' +
            '<b>a<\\b>, escaped: &lt;b&gt;a&lt;\\b&gt;',
        e.message);
  },

  testAssertIsTextThrowsWithHtmlEntities: function() {
    const e = assertThrows(() => {
      textAssert.assertHtmlFree('a&amp;b');
    });
    assertEquals(
        'Assertion failed: String has HTML original: ' +
            'a&amp;b, escaped: a&amp;amp;b',
        e.message);
  },

  testAssertIsTextDoesNotChangeText: function() {
    const plain = 'text';
    assertEquals(plain, textAssert.assertHtmlFree(plain));
  },
});
