/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { BrowserFeature } from './browserfeature.js';
import * as focus from './focus.js';
import * as selection from '../dom/selection.js';
import { testSuite } from '../testing/testsuite.js';

testSuite({
  setUp() {
    // Make sure focus is not in the input to begin with.
    const dummy = document.getElementById('dummyLink');
    dummy.focus();
  },

  /**
   * Tests that focusInputField() puts focus in the input field and sets the
   * cursor to the end of the text cointained inside.
   * @suppress {strictMissingProperties} suppression added to enable type
   * checking
   */
  testFocusInputField() {
    const input = document.getElementById('myInput');
    assertNotEquals(
        'Input should not be focused initially', input, document.activeElement);

    focus.focusInputField(input);
    if (BrowserFeature.HAS_ACTIVE_ELEMENT) {
      assertEquals(
          'Input should be focused after call to focusInputField', input,
          document.activeElement);
    }
    assertEquals(
        'Selection should start at the end of the input text',
        input.value.length, selection.getStart(input));
    assertEquals(
        'Selection should end at the end of the input text', input.value.length,
        selection.getEnd(input));
  },
});
