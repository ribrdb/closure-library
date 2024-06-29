/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Datastructure: Set.
 *
 *
 * This class implements a set data structure. Adding and removing is O(1). It
 * supports both object and primitive values. Be careful because you can add
 * both 1 and new Number(1), because these are not the same. You can even add
 * multiple new Number(1) because these are not equal.
 */


import * as structs from './structs.js';

import { Collection } from './collection.js';
import { Map } from './map.js';
const { Iterator } = goog.requireType('goog.iter.iter');

/**
 * A set that can contain both primitives and objects.  Adding and removing
 * elements is O(1).  Primitives are treated as identical if they have the same
 * type and convert to the same string.  Objects are treated as identical only
 * if they are references to the same object.  WARNING: A Set can
 * contain both 1 and (new Number(1)), because they are not the same.  WARNING:
 * Adding (new Number(1)) twice will yield two distinct elements, because they
 * are two different objects.  WARNING: Any object that is added to a
 * Set will be modified!  Because goog.getUid() is used to
 * identify objects, every object in the set will be mutated.
 * @param {Array<T>|Object<?,T>=} opt_values Initial values to start with.
 * @constructor
 * @implements {Collection<T>}
 * @implements {Iterable<T>}
 * @final
 * @template T
 * @deprecated This type is misleading: use ES6 Set instead.
 */
export function Set(opt_values) {
  this.map_ = new Map();


  /**
   * The number of items in this set.
   * @const {number}
   */
  this.size = 0;

  if (opt_values) {
    this.addAll(opt_values);
  }
}

/**
 * A function that returns a unique id.
 * @private @const {function(?Object): number}
 */
Set.getUid_ = goog.getUid;


/**
 * Obtains a unique key for an element of the set.  Primitives will yield the
 * same key if they have the same type and convert to the same string.  Object
 * references will yield the same key only if they refer to the same object.
 * @param {*} val Object or primitive value to get a key for.
 * @return {string} A unique key for this value/object.
 * @private
 */
Set.getKey_ = function(val) {
  var type = typeof val;
  if (type == 'object' && val || type == 'function') {
    return 'o' + Set.getUid_(/** @type {Object} */ (val));
  } else {
    return type.slice(0, 1) + val;
  }
};


/**
 * @return {number} The number of elements in the set.
 * @override
 * @deprecated Use the `size` property instead, for alignment with ES6 Set.
 */
Set.prototype.getCount = function() {
  return this.map_.size;
};


/**
 * Add a primitive or an object to the set.
 * @param {T} element The primitive or object to add.
 * @override
 */
Set.prototype.add = function(element) {
  this.map_.set(Set.getKey_(element), element);
  this.setSizeInternal_(this.map_.size);
};


/**
 * Adds all the values in the given collection to this set.
 * @param {Array<T>|Collection<T>|Object<?,T>} col A collection
 *     containing the elements to add.
 * @deprecated Use `goog.collections.sets.addAll(thisSet, col)` instead,
 *     converting Objects to their values using `Object.values`, for alignment
 *     with ES6 Set.
 */
Set.prototype.addAll = function(col) {
  var values = structs.getValues(col);
  var l = values.length;
  for (var i = 0; i < l; i++) {
    this.add(values[i]);
  }
  this.setSizeInternal_(this.map_.size);
};


/**
 * Removes all values in the given collection from this set.
 * @param {Array<T>|Collection<T>|Object<?,T>} col A collection
 *     containing the elements to remove.
 * @deprecated Use `goog.collections.sets.removeAll(thisSet, col)` instead,
 *     converting Objects to their values using `Object.values`, for alignment
 *     with ES6 Set.
 */
Set.prototype.removeAll = function(col) {
  var values = structs.getValues(col);
  var l = values.length;
  for (var i = 0; i < l; i++) {
    this.remove(values[i]);
  }
  this.setSizeInternal_(this.map_.size);
};


/**
 * Removes the given element from this set.
 * @param {T} element The primitive or object to remove.
 * @return {boolean} Whether the element was found and removed.
 */
Set.prototype.delete = function(element) {
  const rv = this.map_.remove(Set.getKey_(element));
  this.setSizeInternal_(this.map_.size);
  return rv;
};

/**
 * Removes the given element from this set.
 * @param {T} element The primitive or object to remove.
 * @return {boolean} Whether the element was found and removed.
 * @override
 * @deprecated Use `delete`, for alignment with ES6 Set.
 */
Set.prototype.remove = function(element) {
  return this.delete(element);
};


/**
 * Removes all elements from this set.
 */
Set.prototype.clear = function() {
  this.map_.clear();
  this.setSizeInternal_(0);
};


/**
 * Tests whether this set is empty.
 * @return {boolean} True if there are no elements in this set.
 * @deprecated Use the size property and compare against 0, for alignment with
 *     ES6 Set.
 */
Set.prototype.isEmpty = function() {
  return this.map_.size === 0;
};


/**
 * Tests whether this set contains the given element.
 * @param {T} element The primitive or object to test for.
 * @return {boolean} True if this set contains the given element.
 */
Set.prototype.has = function(element) {
  return this.map_.containsKey(Set.getKey_(element));
};

/**
 * Tests whether this set contains the given element.
 * @param {T} element The primitive or object to test for.
 * @return {boolean} True if this set contains the given element.
 * @override
 * @deprecated Use `has` instead, for alignment with ES6 Set.
 */
Set.prototype.contains = function(element) {
  return this.map_.containsKey(Set.getKey_(element));
};


/**
 * Tests whether this set contains all the values in a given collection.
 * Repeated elements in the collection are ignored, e.g.  (new
 * Set([1, 2])).containsAll([1, 1]) is True.
 * @param {Collection<T>|Object} col A collection-like object.
 * @return {boolean} True if the set contains all elements.
 * @deprecated Use `goog.collections.sets.hasAll(thisSet, col)`, converting
 *     Objects to arrays using Object.values, for alignment with ES6 Set.
 */
Set.prototype.containsAll = function(col) {
  return structs.every(col, this.contains, this);
};


/**
 * Finds all values that are present in both this set and the given collection.
 * @param {Array<S>|Object<?,S>} col A collection.
 * @return {!Set<T|S>} A new set containing all the values
 *     (primitives or objects) present in both this set and the given
 *     collection.
 * @template S
 * @deprecated Use `goog.collections.sets.intersection(thisSet, col)`,
 *     converting Objects to arrays using Object.values, instead for alignment
 *     with ES6 Set.
 */
Set.prototype.intersection = function(col) {
  var result = new Set();

  var values = structs.getValues(col);
  for (var i = 0; i < values.length; i++) {
    var value = values[i];
    if (this.contains(value)) {
      result.add(value);
    }
  }

  return result;
};


/**
 * Finds all values that are present in this set and not in the given
 * collection.
 * @param {Array<T>|Collection<T>|Object<?,T>} col A collection.
 * @return {!Set} A new set containing all the values
 *     (primitives or objects) present in this set but not in the given
 *     collection.
 */
Set.prototype.difference = function(col) {
  var result = this.clone();
  result.removeAll(col);
  return result;
};


/**
 * Returns an array containing all the elements in this set.
 * @return {!Array<T>} An array containing all the elements in this set.
 * @deprecated Use `Array.from(set.values())` instead, for alignment with ES6
 *     Set.
 */
Set.prototype.getValues = function() {
  return this.map_.getValues();
};

/**
 * @returns {!IteratorIterable<T>} An ES6 Iterator that iterates over the values
 *     in the set.
 */
Set.prototype.values = function() {
  return this.map_.values();
};

/**
 * Creates a shallow clone of this set.
 * @return {!Set<T>} A new set containing all the same elements as
 *     this set.
 * @deprecated Use `new Set(thisSet.values())` for alignment with ES6 Set.
 */
Set.prototype.clone = function() {
  return new Set(this);
};


/**
 * Tests whether the given collection consists of the same elements as this set,
 * regardless of order, without repetition.  Primitives are treated as equal if
 * they have the same type and convert to the same string; objects are treated
 * as equal if they are references to the same object.  This operation is O(n).
 * @param {Collection<T>|Object} col A collection.
 * @return {boolean} True if the given collection consists of the same elements
 *     as this set, regardless of order, without repetition.
 * @deprecated Use `goog.collections.equals(thisSet, col)`, converting Objects
 *     to arrays using Object.values,  instead for alignment with ES6 Set.
 */
Set.prototype.equals = function(col) {
  return this.getCount() == structs.getCount(col) && this.isSubsetOf(col);
};


/**
 * Tests whether the given collection contains all the elements in this set.
 * Primitives are treated as equal if they have the same type and convert to the
 * same string; objects are treated as equal if they are references to the same
 * object.  This operation is O(n).
 * @param {Collection<T>|Object} col A collection.
 * @return {boolean} True if this set is a subset of the given collection.
 * @deprecated Use `goog.collections.isSubsetOf(thisSet, col)`, converting
 *     Objects to arrays using Object.values, instead for alignment with ES6
 *     Set.
 */
Set.prototype.isSubsetOf = function(col) {
  var colCount = structs.getCount(col);
  if (this.getCount() > colCount) {
    return false;
  }
  if (!(col instanceof Set) && colCount > 5) {
    /* Convert to a Set so that structs.contains runs in*/
    // O(1) time instead of O(n) time.
    col = new Set(col);
  }
  return structs.every(this, function(value) {
    return structs.contains(col, value);
  });
};


/**
 * Returns an iterator that iterates over the elements in this set.
 * @param {boolean=} opt_keys This argument is ignored.
 * @return {!Iterator} An iterator over the elements in this set.
 * @deprecated Call `values` and use native iteration, for alignment with ES6
 *     Set.
 */
Set.prototype.__iterator__ = function(opt_keys) {
  return this.map_.__iterator__(false);
};

/**
 * @return {!IteratorIterable<T>} An ES6 Iterator that iterates over the values
 *     in the set.
 */
Set.prototype[Symbol.iterator] = function() {
  return this.values();
};

/**
 * Assigns to the size property to isolate supressions of const assignment
 * to only where they are needed.
 * @param {number} newSize The size to update to.
 * @private
 */
Set.prototype.setSizeInternal_ = function(newSize) {
  /** @suppress {const} */
  this.size = newSize;
};
