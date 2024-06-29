/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utilities for working with ranges comprised of multiple
 * sub-ranges.
 */


import * as array from '../array/array.js';
import * as dom from './dom.js';
import { AbstractRange } from './abstractrange.js';
import { TextRange } from './textrange.js';



/**
 * Creates a new multi range with no properties.  Do not use this
 * constructor: use one of the dom.Range.createFrom* methods instead.
 * @constructor
 * @extends {AbstractRange}
 * @abstract
 */
export function AbstractMultiRange() {}
goog.inherits(AbstractMultiRange, AbstractRange);


/** @override */
AbstractMultiRange.prototype.containsRange = function(
    otherRange, opt_allowPartial) {
  // TODO(user): This will incorrectly return false if two (or more) adjacent
  // elements are both in the control range, and are also in the text range
  // being compared to.
  var /** !Array<?TextRange> */ ranges = this.getTextRanges();
  var otherRanges = otherRange.getTextRanges();

  var fn = opt_allowPartial ? array.some : array.every;
  return fn(otherRanges, function(otherRange) {
    return array.some(ranges, function(range) {
      return range.containsRange(otherRange, opt_allowPartial);
    });
  });
};


/** @override */
AbstractMultiRange.prototype.insertNode = function(node, before) {
  if (before) {
    dom.insertSiblingBefore(node, this.getStartNode());
  } else {
    dom.insertSiblingAfter(node, this.getEndNode());
  }
  return node;
};


/** @override */
AbstractMultiRange.prototype.surroundWithNodes = function(
    startNode, endNode) {
  this.insertNode(startNode, true);
  this.insertNode(endNode, false);
};
