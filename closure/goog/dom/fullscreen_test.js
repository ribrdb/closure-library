/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { DomHelper } from './dom.js';
import { PropertyReplacer } from '../testing/propertyreplacer.js';
import * as asserts from '../testing/asserts.js';
import * as fullscreen from './fullscreen.js';
import { testSuite } from '../testing/testsuite.js';

let domHelper;
let mockDoc;
let stubs;

testSuite({
  setUp() {
    mockDoc = {};
    domHelper = new DomHelper();
    stubs = new PropertyReplacer();
    stubs.replace(domHelper, 'getDocument', () => mockDoc);
  },

  testGetFullScreenElement() {
    const element = document.createElement('div');
    /**
     * @suppress {strictMissingProperties} suppression added to enable type
     * checking
     */
    mockDoc.fullscreenElement = element;
    assertEquals(element, fullscreen.getFullScreenElement(domHelper));
  },

  testGetFullScreenElementNotFullScreen() {
    assertNull(fullscreen.getFullScreenElement(domHelper));
  },
});
