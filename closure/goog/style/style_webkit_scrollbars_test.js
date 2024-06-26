/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { ExpectedFailures } from '../testing/expectedfailures.js';
import * as asserts from '../asserts/asserts.js';
import * as style from './style.js';

/** @suppress {extraRequire} */
import * as styleScrollbarTester from './stylescrollbartester.js';

import { testSuite } from '../testing/testsuite.js';
import * as userAgent from '../useragent/useragent.js';

let expectedFailures;

testSuite({
  setUpPage() {
    expectedFailures = new ExpectedFailures();
  },

  tearDown() {
    expectedFailures.handleTearDown();

    // Assert that the test loaded.
    asserts.assert(styleScrollbarTester.testScrollbarWidth);
  },

  testScrollbarWidth: styleScrollbarTester.testScrollbarWidth,

  testScrollBarWidth_webkitScrollbar() {
    expectedFailures.expectFailureFor(!userAgent.WEBKIT);

    try {
      const width = style.getScrollbarWidth();
      assertEquals('Scrollbar width should be 16', 16, width);
    } catch (e) {
      expectedFailures.handleException(e);
    }
  },

  testScrollBarWidth_webkitScrollbarWithCustomClass() {
    expectedFailures.expectFailureFor(!userAgent.WEBKIT);

    try {
      const customWidth = style.getScrollbarWidth('otherScrollBar');
      assertEquals('Custom width should be 10', 10, customWidth);
    } catch (e) {
      expectedFailures.handleException(e);
    }
  },
});
