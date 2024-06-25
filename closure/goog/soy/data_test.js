/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { SafeHtml } from '../html/safehtml.js';
import { SafeStyle } from '../html/safestyle.js';
import { SafeStyleSheet } from '../html/safestylesheet.js';
import { SafeUrl } from '../html/safeurl.js';
import { TrustedResourceUrl } from '../html/trustedresourceurl.js';

/** @suppress {extraRequire} */
import * as testHelper from './soy_testhelper.js';

import { testSuite } from '../testing/testsuite.js';

testSuite({
  testToSafeHtml() {
    let html;

    /** @suppress {checkTypes} suppression added to enable type checking */
    html = example.sanitizedHtmlTemplate().toSafeHtml();
    assertEquals('Hello <b>World</b>', SafeHtml.unwrap(html));
  },

  testToSafeUrl() {
    let url;

    /** @suppress {checkTypes} suppression added to enable type checking */
    url = example.sanitizedSmsUrlTemplate().toSafeUrl();
    assertEquals('sms:123456789', SafeUrl.unwrap(url));

    /** @suppress {checkTypes} suppression added to enable type checking */
    url = example.sanitizedHttpUrlTemplate().toSafeUrl();
    assertEquals('https://google.com/foo?n=917', SafeUrl.unwrap(url));
  },

  testToSafeStyleSheet() {
    const styleSheet = example.sanitizedCssTemplate({}).toSafeStyleSheet();
    assertEquals('html{display:none}', SafeStyleSheet.unwrap(styleSheet));
  },

  testToSafeStyle() {
    const style = example.sanitizedStyleTemplate({}).toSafeStyle();
    assertEquals('display:none;', SafeStyle.unwrap(style));
  },

  testToTrustedResourceUrl() {
    let url;

    /** @suppress {checkTypes} suppression added to enable type checking */
    url =
        example.sanitizedTrustedResourceUriTemplate({}).toTrustedResourceUrl();
    assertEquals('https://google.com/a.js', TrustedResourceUrl.unwrap(url));
  },
});
