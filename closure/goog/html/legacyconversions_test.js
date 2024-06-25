/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/** @fileoverview Unit tests for legacyconversions. */

goog.setTestOnly();

import { SafeHtml } from './safehtml.js';
import { SafeScript } from './safescript.js';
import { SafeStyle } from './safestyle.js';
import { SafeStyleSheet } from './safestylesheet.js';
import { SafeUrl } from './safeurl.js';
import { TrustedResourceUrl } from './trustedresourceurl.js';
import * as legacyconversions from './legacyconversions.js';
import { testSuite } from '../testing/testsuite.js';

/**
 * Asserts that conversionFunction calls the report callback.
 * @param {function(string) : *} conversionFunction
 */
function assertFunctionReports(conversionFunction) {
  let reported = false;
  try {
    legacyconversions.setReportCallback(() => {
      reported = true;
    });
    conversionFunction('irrelevant');
    assertTrue('Expected legacy conversion to be reported.', reported);
  } finally {
    legacyconversions.setReportCallback(() => {});
  }
}
testSuite({
  testSafeHtmlFromString() {
    const html = '<div>irrelevant</div>';
    const safeHtml = legacyconversions.safeHtmlFromString(html);
    assertEquals(html, SafeHtml.unwrap(safeHtml));

    assertFunctionReports(legacyconversions.safeHtmlFromString);
  },

  testSafeScriptFromString() {
    const script = 'alert(1);';
    const safeScript = legacyconversions.safeScriptFromString(script);
    assertEquals(script, SafeScript.unwrap(safeScript));

    assertFunctionReports(legacyconversions.safeScriptFromString);
  },

  testSafeStyleFromString() {
    const style = 'color: red; width: 1em;';
    const safeStyle = legacyconversions.safeStyleFromString(style);
    assertEquals(style, SafeStyle.unwrap(safeStyle));

    assertFunctionReports(legacyconversions.safeStyleFromString);
  },

  testSafeStyleSheetFromString() {
    const styleSheet =
        'P.special { color: red; background: url(http://test); }';
    const safeStyleSheet =
        legacyconversions.safeStyleSheetFromString(styleSheet);
    assertEquals(styleSheet, SafeStyleSheet.unwrap(safeStyleSheet));

    assertFunctionReports(legacyconversions.safeStyleSheetFromString);
  },

  testSafeUrlFromString() {
    const url = 'https://www.google.com';
    const safeUrl = legacyconversions.safeUrlFromString(url);
    assertEquals(url, SafeUrl.unwrap(safeUrl));

    assertFunctionReports(legacyconversions.safeUrlFromString);
  },

  testTrustedResourceUrlFromString() {
    const url = 'https://www.google.com/script.js';
    const trustedResourceUrl =
        legacyconversions.trustedResourceUrlFromString(url);
    assertEquals(url, TrustedResourceUrl.unwrap(trustedResourceUrl));

    assertFunctionReports(legacyconversions.trustedResourceUrlFromString);
  },
});
