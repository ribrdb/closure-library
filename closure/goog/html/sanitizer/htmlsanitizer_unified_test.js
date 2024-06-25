/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { SafeHtml } from '../safehtml.js';
import { HtmlSanitizer } from './htmlsanitizer.js';
const SanitizerBuilder = HtmlSanitizer.Builder;
import { testSuite } from '../../testing/testsuite.js';
import * as testVectors from './html_test_vectors.js';

const sanitizer = new SanitizerBuilder().build();

const suite = {};
for (const v of /** @type {?} */ (testVectors.HTML_TEST_VECTORS)) {
  /** @suppress {missingProperties} suppression added to enable type checking */
  suite[`testVector[${v.name}]`] = function() {
    const sanitized = SafeHtml.unwrap(sanitizer.sanitize(v.input));
    assertContains(sanitized, v.acceptable);
  };
}

testSuite(suite);
