/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/** @fileoverview testcases for createInertDocument. */

goog.setTestOnly();

import { testSuite } from '../../testing/testsuite.js';
import inertDocument from './inertdocument.js';
const {createInertDocument} = inertDocument;

testSuite({
  testInertDocument() {
    if (!document.implementation.createHTMLDocument) {
      return;  // skip test
    }

    /**
     * @suppress {strictMissingProperties} suppression added to enable type
     * checking
     */
    window.xssFiredInertDocument = false;
    const doc = createInertDocument();
    const script = doc.createElement('script');
    script.text = 'window.xssFiredInertDocument = true';
    doc.body.appendChild(script);
    assertFalse(window.xssFiredInertDocument);
  },
});
