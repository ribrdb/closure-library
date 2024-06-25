/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utilities for inspecting page layout. This is a port of
 *     http://go/layoutbot.java
 *     See {@link http://go/layouttesting}.
 */

goog.setTestOnly('goog.testing.style');

import * as dom from '../../dom/dom.js';
import { Rect } from '../../math/rect.js';
import * as googStyle from '../../style/style.js';


/**
 * Determines whether the bounding rectangles of the given elements intersect.
 * @param {Element} element The first element.
 * @param {Element} otherElement The second element.
 * @return {boolean} Whether the bounding rectangles of the given elements
 *     intersect.
 */
export function intersects(element, otherElement) {
 const elementRect = googStyle.getBounds(element);
 const otherElementRect = googStyle.getBounds(otherElement);
 return Rect.intersects(elementRect, otherElementRect);
}


/**
 * Determines whether the element has visible dimensions, i.e. x > 0 && y > 0.
 * @param {Element} element The element to check.
 * @return {boolean} Whether the element has visible dimensions.
 */
export function hasVisibleDimensions(element) {
 const elSize = googStyle.getSize(element);
 const shortest = elSize.getShortest();
 if (shortest <= 0) {
   return false;
 }

 return true;
}


/**
 * Determines whether the CSS style of the element renders it visible.
 * Elements detached from the document are considered invisible.
 * @param {!Element} element The element to check.
 * @return {boolean} Whether the CSS style of the element renders it visible.
 */
export function isVisible(element) {
 if (!dom.isInDocument(element)) {
   return false;
 }
 const style = getComputedStyle(element);
 return style.visibility != 'hidden' && style.display != 'none';
}


/**
 * Test whether the given element is on screen.
 * @param {!Element} el The element to test.
 * @return {boolean} Whether the element is on the screen.
 */
export function isOnScreen(el) {
 const doc = dom.getDomHelper(el).getDocument();
 const viewport = googStyle.getVisibleRectForElement(doc.body);
 const viewportRect = Rect.createFromBox(viewport);
 return dom.contains(doc, el) &&
     googStyle.getBounds(el).intersects(viewportRect);
}
