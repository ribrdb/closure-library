/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A RangeSet is a structure that manages a list of ranges.
 * Numeric ranges may be added and removed from the RangeSet, and the set may
 * be queried for the presence or absence of individual values or ranges of
 * values.
 *
 * This may be used, for example, to track the availability of sparse elements
 * in an array without iterating over the entire array.
 */

import * as array from '../array/array.js';

import * as iter from '../iter/iter.js';
import { Iterator } from '../iter/iter.js';
import { Range } from './range.js';



/**
 * Constructs a new RangeSet, which can store numeric ranges.
 *
 * Ranges are treated as half-closed: that is, they are exclusive of their end
 * value [start, end).
 *
 * New ranges added to the set which overlap the values in one or more existing
 * ranges will be merged.
 *
 * @implements {Iterable<!Range>}
 * @struct
 * @constructor
 * @final
 */
export function RangeSet() {
  /**
     * A sorted list of ranges that represent the values in the set.
     * @type {!Array<!Range>}
     * @private
     */
  this.ranges_ = [];
}


if (goog.DEBUG) {
  /**
   * @return {string} A debug string in the form [[1, 5], [8, 9], [15, 30]].
   * @override
   */
  RangeSet.prototype.toString = function() {
    return '[' + this.ranges_.join(', ') + ']';
  };
}


/**
 * Compares two sets for equality.
 *
 * @param {RangeSet} a A range set.
 * @param {RangeSet} b A range set.
 * @return {boolean} Whether both sets contain the same values.
 */
RangeSet.equals = function(a, b) {
  // Fast check for object equality. Also succeeds if a and b are both null.
  return a == b ||
      !!(a && b &&
         array.equals(a.ranges_, b.ranges_, Range.equals));
};


/**
 * @return {!RangeSet} A new RangeSet containing the same values as
 *      this one.
 */
RangeSet.prototype.clone = function() {
  var set = new RangeSet();

  for (var i = this.ranges_.length; i--;) {
    set.ranges_[i] = this.ranges_[i].clone();
  }

  return set;
};


/**
 * Adds a range to the set. If the new range overlaps existing values, those
 * ranges will be merged.
 *
 * @param {Range} a The range to add.
 */
RangeSet.prototype.add = function(a) {
  if (a.end <= a.start) {
    // Empty ranges are ignored.
    return;
  }

  a = a.clone();

  // Find the insertion point.
  for (var i = 0, b; b = this.ranges_[i]; i++) {
    if (a.start <= b.end) {
      a.start = Math.min(a.start, b.start);
      break;
    }
  }

  var insertionPoint = i;

  for (; b = this.ranges_[i]; i++) {
    if (a.end < b.start) {
      break;
    }
    a.end = Math.max(a.end, b.end);
  }

  this.ranges_.splice(insertionPoint, i - insertionPoint, a);
};


/**
 * Removes a range of values from the set.
 *
 * @param {Range} a The range to remove.
 */
RangeSet.prototype.remove = function(a) {
  if (a.end <= a.start) {
    // Empty ranges are ignored.
    return;
  }

  // Find the insertion point.
  for (var i = 0, b; b = this.ranges_[i]; i++) {
    if (a.start < b.end) {
      break;
    }
  }

  if (!b || a.end < b.start) {
    // The range being removed doesn't overlap any existing range. Exit early.
    return;
  }

  var insertionPoint = i;

  if (a.start > b.start) {
    // There is an overlap with the nearest range. Modify it accordingly.
    insertionPoint++;

    if (a.end < b.end) {
      array.insertAt(
          this.ranges_, new Range(a.end, b.end), insertionPoint);
    }
    b.end = a.start;
  }

  for (i = insertionPoint; b = this.ranges_[i]; i++) {
    b.start = Math.max(a.end, b.start);
    if (a.end < b.end) {
      break;
    }
  }

  this.ranges_.splice(insertionPoint, i - insertionPoint);
};


/**
 * Determines whether a given range is in the set. Only succeeds if the entire
 * range is available.
 *
 * @param {Range} a The query range.
 * @return {boolean} Whether the entire requested range is set.
 */
RangeSet.prototype.contains = function(a) {
  if (a.end <= a.start) {
    return false;
  }

  for (var i = 0, b; b = this.ranges_[i]; i++) {
    if (a.start < b.end) {
      if (a.end >= b.start) {
        return Range.contains(b, a);
      }
      break;
    }
  }
  return false;
};


/**
 * Determines whether a given value is set in the RangeSet.
 *
 * @param {number} value The value to test.
 * @return {boolean} Whether the given value is in the set.
 */
RangeSet.prototype.containsValue = function(value) {
  for (var i = 0, b; b = this.ranges_[i]; i++) {
    if (value < b.end) {
      if (value >= b.start) {
        return true;
      }
      break;
    }
  }
  return false;
};


/**
 * Returns the union of this RangeSet with another.
 *
 * @param {RangeSet} set Another RangeSet.
 * @return {!RangeSet} A new RangeSet containing all values from
 *     either set.
 */
RangeSet.prototype.union = function(set) {
  // TODO(brenneman): A linear-time merge would be preferable if it is ever a
  // bottleneck.
  set = set.clone();

  for (var i = 0, a; a = this.ranges_[i]; i++) {
    set.add(a);
  }

  return set;
};


/**
 * Subtracts the ranges of another set from this one, returning the result
 * as a new RangeSet.
 *
 * @param {!RangeSet} set The RangeSet to subtract.
 * @return {!RangeSet} A new RangeSet containing all values in this
 *     set minus the values of the input set.
 */
RangeSet.prototype.difference = function(set) {
  var ret = this.clone();

  for (var i = 0, a; a = set.ranges_[i]; i++) {
    ret.remove(a);
  }

  return ret;
};


/**
 * Intersects this RangeSet with another.
 *
 * @param {RangeSet} set The RangeSet to intersect with.
 * @return {!RangeSet} A new RangeSet containing all values set in
 *     both this and the input set.
 */
RangeSet.prototype.intersection = function(set) {
  if (this.isEmpty() || set.isEmpty()) {
    return new RangeSet();
  }

  return this.difference(set.inverse(this.getBounds()));
};


/**
 * Creates a subset of this set over the input range.
 *
 * @param {Range} range The range to copy into the slice.
 * @return {!RangeSet} A new RangeSet with a copy of the values in the
 *     input range.
 */
RangeSet.prototype.slice = function(range) {
  var set = new RangeSet();
  if (range.start >= range.end) {
    return set;
  }

  for (var i = 0, b; b = this.ranges_[i]; i++) {
    if (b.end <= range.start) {
      continue;
    }
    if (b.start > range.end) {
      break;
    }

    set.add(
        new Range(
            Math.max(range.start, b.start), Math.min(range.end, b.end)));
  }

  return set;
};


/**
 * Creates an inverted slice of this set over the input range.
 *
 * @param {Range} range The range to copy into the slice.
 * @return {!RangeSet} A new RangeSet containing inverted values from
 *     the original over the input range.
 */
RangeSet.prototype.inverse = function(range) {
  var set = new RangeSet();

  set.add(range);
  for (var i = 0, b; b = this.ranges_[i]; i++) {
    if (range.start >= b.end) {
      continue;
    }
    if (range.end < b.start) {
      break;
    }

    set.remove(b);
  }

  return set;
};


/**
 * @return {number} The sum of the lengths of ranges covered in the set.
 */
RangeSet.prototype.coveredLength = function() {
  return /** @type {number} */ (this.ranges_.reduce(function(res, range) {
      return res + range.end - range.start;
    }, 0));
};


/**
 * @return {Range} The total range this set covers, ignoring any
 *     gaps between ranges.
 */
RangeSet.prototype.getBounds = function() {
  if (this.ranges_.length) {
    return new Range(
        this.ranges_[0].start, array.peek(this.ranges_).end);
  }

  return null;
};


/**
 * @return {boolean} Whether any ranges are currently in the set.
 */
RangeSet.prototype.isEmpty = function() {
  return this.ranges_.length == 0;
};


/**
 * Removes all values in the set.
 */
RangeSet.prototype.clear = function() {
  this.ranges_.length = 0;
};


/**
 * Returns an iterator that iterates over the ranges in the RangeSet.
 *
 * @param {boolean=} opt_keys Ignored for RangeSets.
 * @return {!Iterator} An iterator over the values in the set.
 */
RangeSet.prototype.__iterator__ = function(opt_keys) {
  var i = 0;
  var list = this.ranges_;

  var iterator = new Iterator();
  /**
     * @return {!IIterableResult<!Range>}
     * @override
     */
  iterator.next = function() {
    if (i >= list.length) {
      return iter.ES6_ITERATOR_DONE;
    }
    return iter.createEs6IteratorYield(list[i++].clone());
  };

  return iterator;
};


/**
 * Returns an iterator that iterates over the ranges in the RangeSet.
 * @return {!Iterator<!Range>} An iterator over the values in the set.
 */
RangeSet.prototype[Symbol.iterator] = function() {
  // These are now identical!
  return RangeSet.prototype.__iterator__.call(this);
};
