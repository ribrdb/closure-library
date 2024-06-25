/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { MenuSeparator } from './menuseparator.js';
import { MenuSeparatorRenderer } from './menuseparatorrenderer.js';
import * as dom from '../dom/dom.js';
import { testSuite } from '../testing/testsuite.js';

let sandbox;
let originalSandbox;

testSuite({
  setUp() {
    sandbox = dom.getElement('sandbox');
    originalSandbox = sandbox.cloneNode(true);
  },

  tearDown() {
    sandbox.parentNode.replaceChild(originalSandbox, sandbox);
  },

  testDecorate() {
    const separator = new MenuSeparator();
    const dummyId = 'foo';
    separator.setId(dummyId);
    assertEquals(dummyId, separator.getId());
    const renderer = new MenuSeparatorRenderer();
    renderer.decorate(separator, dom.getElement('separator'));
    assertEquals('separator', separator.getId());
  },
});
