/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Unit tests for goog.history.History.
 */

/** @suppress {extraProvide} */
goog.setTestOnly();

import { Const } from '../string/const.js';
import { History as GoogHistory } from './history.js';
import { TrustedResourceUrl } from '../html/trustedresourceurl.js';
import { dispose } from '../disposable/dispose.js';
import * as dom from '../dom/dom.js';
import { testSuite } from '../testing/testsuite.js';
import * as userAgent from '../useragent/useragent.js';

// Mimimal function to exercise construction.

// TODO(nnaze): Test additional behavior.
testSuite({
  testCreation() {
    const input = dom.getElement('hidden-input');
    const iframe = dom.getElement('hidden-iframe');

    try {
      /** @suppress {checkTypes} suppression added to enable type checking */
      const history = new GoogHistory(undefined, undefined, input, iframe);
    } finally {
      dispose(history);
    }

    // Test that SafeHtml.create() calls in constructor succeed.
    try {
      // Undefined opt_input and opt_iframe will result in use document.write(),
      // which in some browsers overrides the current page and causes the
      // test to fail.
      /** @suppress {checkTypes} suppression added to enable type checking */
      const history = new GoogHistory(
          true,
          TrustedResourceUrl.fromConstant(Const.from('blank_test_helper.html')),
          input, iframe);
    } finally {
      dispose(history);
    }
  },

  testIsHashChangeSupported() {
    // This is the policy currently implemented.
    const supportsOnHashChange =
        (userAgent.IE ? document.documentMode >= 8 : 'onhashchange' in window);

    assertEquals(supportsOnHashChange, GoogHistory.isOnHashChangeSupported());
  },
});
