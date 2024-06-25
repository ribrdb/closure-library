/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { TagName } from './tagname.js';
import * as googDom from './dom.js';
import { testSuite } from '../testing/testsuite.js';

testSuite({
  /** Checks types with TagName. */
  testDomTagNameTypes() {
    /** @type {!HTMLAnchorElement} */
    const a = googDom.createDom(TagName.A);

    /** @type {!HTMLAnchorElement} */
    const el = googDom.createElement(TagName.A);

    /** @type {!IArrayLike<!HTMLAnchorElement>} */
    const anchors = googDom.getElementsByTagNameAndClass(TagName.A);

    // Check that goog.dom.HtmlElement is assignable to HTMLElement.
    /** @type {!HTMLElement} */
    const b = googDom.createElement(TagName.B);

    /** @type {?HTMLAnchorElement} */
    const anchor = googDom.getElementByTagNameAndClass(TagName.A);
  },

  /** Checks types with TagName. */
  testDomHelperTagNameTypes() {
    const dom = googDom.getDomHelper();

    /** @type {!HTMLAnchorElement} */
    const a = dom.createDom(TagName.A);

    /** @type {!HTMLAnchorElement} */
    const el = dom.createElement(TagName.A);

    /** @type {!IArrayLike<!HTMLAnchorElement>} */
    const anchors = dom.getElementsByTagNameAndClass(TagName.A);

    /** @type {?HTMLAnchorElement} */
    const anchor = dom.getElementByTagNameAndClass(TagName.A);
  },
});
