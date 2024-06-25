/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import * as product from '../useragent/product.js';
import { testSuite } from '../testing/testsuite.js';
import * as uri from './uri.js';

testSuite({
  testNormalizeUri() {
    const baseUri = uri.normalizeUri('/');
    assertEquals(baseUri + 'foo', uri.normalizeUri('/foo'));
    assertEquals(baseUri + 'foo', uri.normalizeUri('/bar/../foo'));
    assertEquals('javascript:test', uri.normalizeUri('javascript:test'));
    assertEquals(
        'https://google.com/test', uri.normalizeUri('https://google.com/test'));
  },

  /** @suppress {checkTypes} suppression added to enable type checking */
  testGetHref_withoutCredentials() {
    const div = document.createElement('div');
    div.innerHTML = '<a href="http://domain.com/">foo</a>';
    assertEquals(uri.getHref(div.children[0]), 'http://domain.com/');
  },

  /** @suppress {checkTypes} suppression added to enable type checking */
  testGetHref_withCredentials() {
    const div = document.createElement('div');
    div.innerHTML = '<a href="http://user:pass@domain.com/">foo</a>';
    assertEquals(
        uri.getHref(div.children[0]),
        (product.EDGE || product.IE) ? null : 'http://user:pass@domain.com/');
  }
});
