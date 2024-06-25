/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Wraps an iterable storage mechanism and creates artificial
 * namespaces using a prefix in the global namespace.
 */

import * as iter from '../../iter/iter.js';

import { Iterator } from '../../iter/iter.js';
import { IterableMechanism } from './iterablemechanism.js';



/**
 * Wraps an iterable storage mechanism and creates artificial namespaces.
 *
 * @param {!IterableMechanism} mechanism Underlying
 *     iterable storage mechanism.
 * @param {string} prefix Prefix for creating an artificial namespace.
 * @constructor
 * @struct
 * @extends {IterableMechanism}
 * @final
 */
export function PrefixedMechanism(mechanism, prefix) {
  PrefixedMechanism.base(this, 'constructor');
  /**
     * The mechanism to be prefixed.
     *
     * @private {IterableMechanism}
     */
  this.mechanism_ = mechanism;

  /**
   * The prefix for creating artificial namespaces.
   *
   * @private {string}
   */
  this.prefix_ = prefix + '::';
}
goog.inherits(
    PrefixedMechanism,
    IterableMechanism);


/** @override */
PrefixedMechanism.prototype.set = function(key, value) {
  this.mechanism_.set(this.prefix_ + key, value);
};


/** @override */
PrefixedMechanism.prototype.get = function(key) {
  return this.mechanism_.get(this.prefix_ + key);
};


/** @override */
PrefixedMechanism.prototype.remove = function(key) {
  this.mechanism_.remove(this.prefix_ + key);
};


/** @override */
PrefixedMechanism.prototype.__iterator__ = function(
    opt_keys) {
  const subIter = this.mechanism_[Symbol.iterator]();
  const selfObj = this;
  const newIter = new Iterator();
  /**
   * @return {!IIterableResult<string>}
   * @override
   */
  newIter.next = function() {
    let key;
    let it = subIter.next();
    if (it.done) return it;
    key = it.value;
    while (key.slice(0, selfObj.prefix_.length) != selfObj.prefix_) {
      it = subIter.next();
      if (it.done) return it;
      key = it.value;
    }
    return iter.createEs6IteratorYield(
        /** @type {string} */ (
            opt_keys ? key.slice(selfObj.prefix_.length) :
                       selfObj.mechanism_.get(key)));
  };

  return newIter;
};
