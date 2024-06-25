/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Interface for storing, retrieving and scanning data using some
 * persistence mechanism.
 */

goog.declareModuleId('goog.storage.mechanism.IterableMechanism');

import { Mechanism } from './mechanism.js';
import { Iterator as GoogIterator } from '../../iter/iter.js';
import es6 from '../../iter/es6.js';
const {ShimIterable} = es6;
import { assertString } from '../../asserts/asserts.js';



/**
 * Interface for all iterable storage mechanisms.
 *
 * @constructor
 * @struct
 * @extends {Mechanism}
 * @implements {Iterable<!string>}
 * @abstract
 */
const IterableMechanism = function() {
  IterableMechanism.base(this, 'constructor');
};
goog.inherits(IterableMechanism, Mechanism);


/**
 * Get the number of stored key-value pairs.
 *
 * Could be overridden in a subclass, as the default implementation is not very
 * efficient - it iterates over all keys.
 *
 * @return {number} Number of stored elements.
 */
IterableMechanism.prototype.getCount = function() {
  let count = 0;
  for (const key of this) {
    assertString(key);
    count++;
  }
  return count;
};


/**
 * Returns an iterator that iterates over the elements in the storage. Will
 * throw goog.iter.StopIteration after the last element.
 *
 * @param {boolean=} opt_keys True to iterate over the keys. False to iterate
 *     over the values.  The default value is false.
 * @return {!GoogIterator} The iterator.
 * @deprecated Use ES6 iteration protocols instead.
 */
IterableMechanism.prototype.__iterator__ = goog.abstractMethod;


/**
 * Returns an interator that iterates over all the keys for elements in storage.
 *
 * @return {!IteratorIterable<string>}
 */
IterableMechanism.prototype[Symbol.iterator] = function() {
  return ShimIterable.of(this.__iterator__(true)).toEs6();
};


/**
 * Remove all key-value pairs.
 *
 * Could be overridden in a subclass, as the default implementation is not
 * very efficient - it iterates over all keys.
 */
IterableMechanism.prototype.clear = function() {
  // This converts the keys to an array first because otherwise
  // removing while iterating results in unstable ordering of keys and
  // can skip keys or terminate early.
  const keys = Array.from(this);
  for (const key of keys) {
    this.remove(key);
  }
};

export { IterableMechanism };
