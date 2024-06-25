/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generic immutable node object to be used in collections.
 */


Node = function(key, value) {
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
export var Node;
