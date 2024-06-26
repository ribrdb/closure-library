/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A utility class for making layout assertions. This is a port
 * of http://go/layoutbot.java
 * See {@link http://go/layouttesting}.
 */

goog.setTestOnly('goog.testing.style.layoutasserts');

import * as style from '../../style/style.js';
import * as asserts from '../asserts.js';
import * as testingStyle from './style.js';


/**
 * Asserts that an element has:
 *   1 - a CSS rendering the makes the element visible.
 *   2 - a non-zero width and height.
 * @param {Element|string} a The element or optionally the comment string.
 * @param {Element=} opt_b The element when a comment string is present.
 */
globalThis.assertIsVisible = function(a, opt_b) {
 _validateArguments(1, arguments);
 const element = nonCommentArg(1, 1, arguments);

 _assert(
     commentArg(1, arguments), testingStyle.isVisible(element) &&
         testingStyle.hasVisibleDimensions(element),
     'Specified element should be visible.');
};


/**
 * The counter assertion of assertIsVisible().
 * @param {Element|string} a The element or optionally the comment string.
 * @param {Element=} opt_b The element when a comment string is present.
 */
globalThis.assertNotVisible = function(a, opt_b) {
 _validateArguments(1, arguments);
 const element = nonCommentArg(1, 1, arguments);
 if (!element) {
   return;
 }

 _assert(
     commentArg(1, arguments), !testingStyle.isVisible(element) ||
         !testingStyle.hasVisibleDimensions(element),
     'Specified element should not be visible.');
};


/**
 * Asserts that the two specified elements intersect.
 * @param {Element|string} a The first element or optionally the comment string.
 * @param {Element} b The second element or the first element if comment string
 *     is present.
 * @param {Element=} opt_c The second element if comment string is present.
 */
globalThis.assertIntersect = function(a, b, opt_c) {
 _validateArguments(2, arguments);
 const element = nonCommentArg(1, 2, arguments);
 const otherElement = nonCommentArg(2, 2, arguments);

 _assert(
     commentArg(1, arguments),
     testingStyle.intersects(element, otherElement),
     'Elements should intersect.');
};


/**
 * Asserts that the two specified elements do not intersect.
 * @param {Element|string} a The first element or optionally the comment string.
 * @param {Element} b The second element or the first element if comment string
 *     is present.
 * @param {Element=} opt_c The second element if comment string is present.
 */
globalThis.assertNoIntersect = function(a, b, opt_c) {
 _validateArguments(2, arguments);
 const element = nonCommentArg(1, 2, arguments);
 const otherElement = nonCommentArg(2, 2, arguments);

 _assert(
     commentArg(1, arguments),
     !testingStyle.intersects(element, otherElement),
     'Elements should not intersect.');
};


/**
 * Asserts that the element must have the specified width.
 * @param {Element|string} a The first element or optionally the comment string.
 * @param {Element|number} b The second element or the first element if comment string
 *     is present.
 * @param {(Element|number)=} opt_c The second element if comment string is present.
 */
globalThis.assertWidth = function(a, b, opt_c) {
 _validateArguments(2, arguments);
 const element = nonCommentArg(1, 2, arguments);
 const width = nonCommentArg(2, 2, arguments);
 const size = style.getSize(element);
 const elementWidth = size.width;

 _assert(
     commentArg(1, arguments),
     isWithinThreshold_(
         width, elementWidth, 0 /* tolerance */),
     'Element should have width ' + width + ' but was ' + elementWidth + '.');
};


/**
 * Asserts that the element must have the specified width within the specified
 * tolerance.
 * @param {Element|string} a The element or optionally the comment string.
 * @param {number|Element} b The height or the element if comment string is
 *     present.
 * @param {number} c The tolerance or the height if comment string is
 *     present.
 * @param {number=} opt_d The tolerance if comment string is present.
 */
globalThis.assertWidthWithinTolerance = function(a, b, c, opt_d) {
 _validateArguments(3, arguments);
 const element = nonCommentArg(1, 3, arguments);
 const width = nonCommentArg(2, 3, arguments);
 const tolerance = nonCommentArg(3, 3, arguments);
 const size = style.getSize(element);
 const elementWidth = size.width;

 _assert(
     commentArg(1, arguments),
     isWithinThreshold_(
         width, elementWidth, tolerance),
     'Element width(' + elementWidth + ') should be within given width(' +
         width + ') with tolerance value of ' + tolerance + '.');
};


/**
 * Asserts that the element must have the specified height.
 * @param {Element|string} a The first element or optionally the comment string.
 * @param {Element|number} b The second element or the first element if comment string
 *     is present.
 * @param {(Element|number)=} opt_c The second element if comment string is present.
 */
globalThis.assertHeight = function(a, b, opt_c) {
 _validateArguments(2, arguments);
 const element = nonCommentArg(1, 2, arguments);
 const height = nonCommentArg(2, 2, arguments);
 const size = style.getSize(element);
 const elementHeight = size.height;

 _assert(
     commentArg(1, arguments),
     isWithinThreshold_(
         height, elementHeight, 0 /* tolerance */),
     'Element should have height ' + height + '.');
};


/**
 * Asserts that the element must have the specified height within the specified
 * tolerance.
 * @param {Element|string} a The element or optionally the comment string.
 * @param {number|Element} b The height or the element if comment string is
 *     present.
 * @param {number} c The tolerance or the height if comment string is
 *     present.
 * @param {number=} opt_d The tolerance if comment string is present.
 */
globalThis.assertHeightWithinTolerance = function(a, b, c, opt_d) {
 _validateArguments(3, arguments);
 const element = nonCommentArg(1, 3, arguments);
 const height = nonCommentArg(2, 3, arguments);
 const tolerance = nonCommentArg(3, 3, arguments);
 const size = style.getSize(element);
 const elementHeight = size.height;

 _assert(
     commentArg(1, arguments),
     isWithinThreshold_(
         height, elementHeight, tolerance),
     'Element width(' + elementHeight + ') should be within given height(' +
         height + ') with tolerance value of ' + tolerance + '.');
};


/**
 * Asserts that the first element is to the left of the second element.
 * @param {Element|string} a The first element or optionally the comment string.
 * @param {Element} b The second element or the first element if comment string
 *     is present.
 * @param {Element=} opt_c The second element if comment string is present.
 */
globalThis.assertIsLeftOf = function(a, b, opt_c) {
 _validateArguments(2, arguments);
 const element = nonCommentArg(1, 2, arguments);
 const otherElement = nonCommentArg(2, 2, arguments);
 const elementRect = style.getBounds(element);
 const otherElementRect = style.getBounds(otherElement);

 _assert(
     commentArg(1, arguments), elementRect.left < otherElementRect.left,
     'Elements should be left to right.');
};


/**
 * Asserts that the first element is strictly left of the second element.
 * @param {Element|string} a The first element or optionally the comment string.
 * @param {Element} b The second element or the first element if comment string
 *     is present.
 * @param {Element=} opt_c The second element if comment string is present.
 */
globalThis.assertIsStrictlyLeftOf = function(a, b, opt_c) {
 _validateArguments(2, arguments);
 const element = nonCommentArg(1, 2, arguments);
 const otherElement = nonCommentArg(2, 2, arguments);
 const elementRect = style.getBounds(element);
 const otherElementRect = style.getBounds(otherElement);

 _assert(
     commentArg(1, arguments),
     elementRect.left + elementRect.width < otherElementRect.left,
     'Elements should be strictly left to right.');
};


/**
 * Asserts that the first element is higher than the second element.
 * @param {Element|string} a The first element or optionally the comment string.
 * @param {Element} b The second element or the first element if comment string
 *     is present.
 * @param {Element=} opt_c The second element if comment string is present.
 */
globalThis.assertIsAbove = function(a, b, opt_c) {
 _validateArguments(2, arguments);
 const element = nonCommentArg(1, 2, arguments);
 const otherElement = nonCommentArg(2, 2, arguments);
 const elementRect = style.getBounds(element);
 const otherElementRect = style.getBounds(otherElement);

 _assert(
     commentArg(1, arguments), elementRect.top < otherElementRect.top,
     'Elements should be top to bottom.');
};


/**
 * Asserts that the first element is strictly higher than the second element.
 * @param {Element|string} a The first element or optionally the comment string.
 * @param {Element} b The second element or the first element if comment string
 *     is present.
 * @param {Element=} opt_c The second element if comment string is present.
 */
globalThis.assertIsStrictlyAbove = function(a, b, opt_c) {
 _validateArguments(2, arguments);
 const element = nonCommentArg(1, 2, arguments);
 const otherElement = nonCommentArg(2, 2, arguments);
 const elementRect = style.getBounds(element);
 const otherElementRect = style.getBounds(otherElement);

 _assert(
     commentArg(1, arguments),
     elementRect.top + elementRect.height < otherElementRect.top,
     'Elements should be strictly top to bottom.');
};


/**
 * Asserts that the first element's bounds contain the bounds of the second
 * element.
 * @param {Element|string} a The first element or optionally the comment string.
 * @param {Element} b The second element or the first element if comment string
 *     is present.
 * @param {Element=} opt_c The second element if comment string is present.
 */
globalThis.assertContained = function(a, b, opt_c) {
 _validateArguments(2, arguments);
 const element = nonCommentArg(1, 2, arguments);
 const otherElement = nonCommentArg(2, 2, arguments);
 const elementRect = style.getBounds(element);
 const otherElementRect = style.getBounds(otherElement);

 _assert(
     commentArg(1, arguments), elementRect.contains(otherElementRect),
     'Element should be contained within the other element.');
};


/**
 * Returns true if the difference between val1 and val2 is less than or equal to
 * the threashold.
 * @param {number} val1 The first value.
 * @param {number} val2 The second value.
 * @param {number} threshold The threshold value.
 * @return {boolean} Whether or not the values are within the threshold.
 * @private
 */
function isWithinThreshold_(val1, val2, threshold) {
 return Math.abs(val1 - val2) <= threshold;
}
