/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Definition of the browser range namespace and interface, as
 * well as several useful utility functions.
 *
 * DO NOT USE THIS FILE DIRECTLY.  Use dom.Range instead.
 */


import * as dom from '../dom.js';

import { NodeType } from '../nodetype.js';
import { GeckoRange } from './geckorange.js';
import { W3cRange } from './w3crange.js';
import { WebKitRange } from './webkitrange.js';
import * as userAgent from '../../useragent/useragent.js';
const { AbstractRange } = goog.requireType('goog.dom.browserrange.abstractrange');


/**
 * Common error constants.
 * @enum {string}
 */
export var Error = {
  NOT_IMPLEMENTED: 'Not Implemented'
};


// NOTE(robbyw): While it would be nice to eliminate the duplicate switches
//               below, doing so uncovers bugs in the JsCompiler in which
//               necessary code is stripped out.


/**
 * Static method that returns the proper type of browser range.
 * @param {Range|TextRange} range A browser range object.
 * @return {!AbstractRange} A wrapper object.
 */
export function createRange(range) {
  if (userAgent.WEBKIT) {
    return new WebKitRange(
        /** @type {Range} */ (range));
  } else if (userAgent.GECKO) {
    return new GeckoRange(
        /** @type {Range} */ (range));
  } else {
    // Default other browsers, including Opera, to W3c ranges.
    return new W3cRange(
        /** @type {Range} */ (range));
  }
}


/**
 * Static method that returns the proper type of browser range.
 * @param {Node} node The node to select.
 * @return {!AbstractRange} A wrapper object.
 */
export function createRangeFromNodeContents(node) {
  if (userAgent.WEBKIT) {
    return WebKitRange.createFromNodeContents(node);
  } else if (userAgent.GECKO) {
    return GeckoRange.createFromNodeContents(node);
  } else {
    // Default other browsers to W3c ranges.
    return W3cRange.createFromNodeContents(node);
  }
}


/**
 * Static method that returns the proper type of browser range.
 * @param {Node} startNode The node to start with.
 * @param {number} startOffset The offset within the node to start.  This is
 *     either the index into the childNodes array for element startNodes or
 *     the index into the character array for text startNodes.
 * @param {Node} endNode The node to end with.
 * @param {number} endOffset The offset within the node to end.  This is
 *     either the index into the childNodes array for element endNodes or
 *     the index into the character array for text endNodes.
 * @return {!AbstractRange} A wrapper object.
 */
export function createRangeFromNodes(startNode, startOffset, endNode, endOffset) {
  if (userAgent.WEBKIT) {
    return WebKitRange.createFromNodes(
        startNode, startOffset, endNode, endOffset);
  } else if (userAgent.GECKO) {
    return GeckoRange.createFromNodes(
        startNode, startOffset, endNode, endOffset);
  } else {
    // Default other browsers to W3c ranges.
    return W3cRange.createFromNodes(
        startNode, startOffset, endNode, endOffset);
  }
}


/**
 * Tests whether the given node can contain a range end point.
 * @param {Node} node The node to check.
 * @return {boolean} Whether the given node can contain a range end point.
 */
export function canContainRangeEndpoint(node) {
  // NOTE(user): This is not complete, as divs with style -
  // 'display:inline-block' or 'position:absolute' can also not contain range
  // endpoints. A more complete check is to see if that element can be partially
  // selected (can be container) or not.
  return dom.canHaveChildren(node) ||
      node.nodeType == NodeType.TEXT;
}
