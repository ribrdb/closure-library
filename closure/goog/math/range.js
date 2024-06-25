/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A utility class for representing a numeric range.
 */


import * as asserts from '../asserts/asserts.js';



/**
 * A number range.
 * @param {number} a One end of the range.
 * @param {number} b The other end of the range.
 * @struct
 * @constructor
 */
export function Range(a, b) {
 /**
  * The lowest value in the range.
  * @type {number}
  */
 this.start = a < b ? a : b;

 /**
  * The highest value in the range.
  * @type {number}
  */
 this.end = a < b ? b : a;
}


/**
 * Creates a Range from an array of two numbers.
 * @param {!Array<number>} pair
 * @return {!Range}
 */
Range.fromPair = function(pair) {
 asserts.assert(pair.length == 2);
 return new Range(pair[0], pair[1]);
};


/**
 * @return {!Range} A clone of this Range.
 */
Range.prototype.clone = function() {
 return new Range(this.start, this.end);
};


/**
 * @return {number} Length of the range.
 */
Range.prototype.getLength = function() {
 return this.end - this.start;
};


/**
 * Extends this range to include the given point.
 * @param {number} point
 */
Range.prototype.includePoint = function(point) {
 this.start = Math.min(this.start, point);
 this.end = Math.max(this.end, point);
};


/**
 * Extends this range to include the given range.
 * @param {!Range} range
 */
Range.prototype.includeRange = function(range) {
 this.start = Math.min(this.start, range.start);
 this.end = Math.max(this.end, range.end);
};


if (goog.DEBUG) {
  /**
   * Returns a string representing the range.
   * @return {string} In the form [-3.5, 8.13].
   * @override
   */
  Range.prototype.toString = function() {
   return '[' + this.start + ', ' + this.end + ']';
  };
}


/**
 * Compares ranges for equality.
 * @param {Range} a A Range.
 * @param {Range} b A Range.
 * @return {boolean} True iff both the starts and the ends of the ranges are
 *     equal, or if both ranges are null.
 */
Range.equals = function(a, b) {
 if (a == b) {
   return true;
 }
 if (!a || !b) {
   return false;
 }
 return a.start == b.start && a.end == b.end;
};


/**
 * Given two ranges on the same dimension, this method returns the intersection
 * of those ranges.
 * @param {Range} a A Range.
 * @param {Range} b A Range.
 * @return {Range} A new Range representing the intersection of two
 *     ranges, or null if there is no intersection. Ranges are assumed to
 *     include their end points, and the intersection can be a point.
 */
Range.intersection = function(a, b) {
 var c0 = Math.max(a.start, b.start);
 var c1 = Math.min(a.end, b.end);
 return (c0 <= c1) ? new Range(c0, c1) : null;
};


/**
 * Given two ranges on the same dimension, determines whether they intersect.
 * @param {Range} a A Range.
 * @param {Range} b A Range.
 * @return {boolean} Whether they intersect.
 */
Range.hasIntersection = function(a, b) {
 return Math.max(a.start, b.start) <= Math.min(a.end, b.end);
};


/**
 * Given two ranges on the same dimension, this returns a range that covers
 * both ranges.
 * @param {Range} a A Range.
 * @param {Range} b A Range.
 * @return {!Range} A new Range representing the bounding
 *     range.
 */
Range.boundingRange = function(a, b) {
 return new Range(
     Math.min(a.start, b.start), Math.max(a.end, b.end));
};


/**
 * Given two ranges, returns true if the first range completely overlaps the
 * second.
 * @param {Range} a The first Range.
 * @param {Range} b The second Range.
 * @return {boolean} True if b is contained inside a, false otherwise.
 */
Range.contains = function(a, b) {
 return a.start <= b.start && a.end >= b.end;
};


/**
 * Given a range and a point, returns true if the range contains the point.
 * @param {Range} range The range.
 * @param {number} p The point.
 * @return {boolean} True if p is contained inside range, false otherwise.
 */
Range.containsPoint = function(range, p) {
 return range.start <= p && range.end >= p;
};
