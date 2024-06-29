/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generic immutable node object to be used in collections.
 */


/**
 * A generic immutable node. This can be used in various collections that
 * require a node object for its item (such as a heap).
 * @param {K} key Key.
 * @param {V} value Value.
 * @constructor
 * @template K, V
 */
export function Node(key, value) {
 /**
  * The key.
  * @private {K}
  */
 this.key_ = key;

 /**
  * The value.
  * @private {V}
  */
 this.value_ = value;
};


/**
 * Gets the key.
 * @return {K} The key.
 */
Node.prototype.getKey = function() {
 return this.key_;
};


/**
 * Gets the value.
 * @return {V} The value.
 */
Node.prototype.getValue = function() {
 return this.value_;
};


/**
 * Clones a node and returns a new node.
 * @return {!Node<K, V>} A new Node with the same
 *     key value pair.
 */
Node.prototype.clone = function() {
 return new Node(this.key_, this.value_);
};
