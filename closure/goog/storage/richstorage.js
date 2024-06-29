/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides a convenient API for data with attached metadata
 * persistence. You probably don't want to use this class directly as it
 * does not save any metadata by itself. It only provides the necessary
 * infrastructure for subclasses that need to save metadata along with
 * values stored.
 */

import { ErrorCode } from './errorcode.js';

import { Storage } from './storage.js';
const { Mechanism } = goog.requireType('goog.storage.mechanism.mechanism');



/**
 * Provides a storage for data with attached metadata.
 *
 * @param {!Mechanism} mechanism The underlying
 *     storage mechanism.
 * @constructor
 * @struct
 * @extends {Storage}
 */
export function RichStorage(mechanism) {
  RichStorage.base(this, 'constructor', mechanism);
}
goog.inherits(RichStorage, Storage);


/**
 * Metadata key under which the actual data is stored.
 *
 * @type {string}
 * @protected
 */
RichStorage.DATA_KEY = 'data';



/**
 * Wraps a value so metadata can be associated with it. You probably want
 * to use RichStorage.Wrapper.wrapIfNecessary to avoid multiple
 * embeddings.
 *
 * @param {*} value The value to wrap.
 * @constructor
 * @final
 */
RichStorage.Wrapper = function(value) {
  this[RichStorage.DATA_KEY] = value;
};


/**
 * Convenience method for wrapping a value so metadata can be associated with
 * it. No-op if the value is already wrapped or is undefined.
 *
 * @param {*} value The value to wrap.
 * @return {(!RichStorage.Wrapper|undefined)} The wrapper.
 */
RichStorage.Wrapper.wrapIfNecessary = function(value) {
  if (value === undefined ||
      value instanceof RichStorage.Wrapper) {
    return /** @type {(!RichStorage.Wrapper|undefined)} */ (value);
  }
  return new RichStorage.Wrapper(value);
};


/**
 * Unwraps a value, any metadata is discarded (not returned). You might want to
 * use RichStorage.Wrapper.unwrapIfPossible to handle cases where
 * the wrapper is missing.
 *
 * @param {!Object} wrapper The wrapper.
 * @return {*} The wrapped value.
 */
RichStorage.Wrapper.unwrap = function(wrapper) {
  const value = wrapper[RichStorage.DATA_KEY];
  if (value === undefined) {
    throw ErrorCode.INVALID_VALUE;
  }
  return value;
};


/**
 * Convenience method for unwrapping a value. Returns undefined if the
 * wrapper is missing.
 *
 * @param {(!Object|undefined)} wrapper The wrapper.
 * @return {*} The wrapped value or undefined.
 */
RichStorage.Wrapper.unwrapIfPossible = function(wrapper) {
  if (!wrapper) {
    return undefined;
  }
  return RichStorage.Wrapper.unwrap(wrapper);
};


/** @override */
RichStorage.prototype.set = function(key, value) {
  RichStorage.base(
      this, 'set', key,
      RichStorage.Wrapper.wrapIfNecessary(value));
};


/**
 * Get an item wrapper (the item and its metadata) from the storage.
 *
 * WARNING: This returns an Object, which once used to be
 * RichStorage.Wrapper. This is due to the fact
 * that deserialized objects lose type information and it
 * is hard to do proper typecasting in JavaScript. Be sure
 * you know what you are doing when using the returned value.
 *
 * @param {string} key The key to get.
 * @return {(!Object|undefined)} The wrapper, or undefined if not found.
 */
RichStorage.prototype.getWrapper = function(key) {
  const wrapper = RichStorage.superClass_.get.call(this, key);
  if (wrapper === undefined || wrapper instanceof Object) {
    return /** @type {(!Object|undefined)} */ (wrapper);
  }
  throw ErrorCode.INVALID_VALUE;
};


/** @override */
RichStorage.prototype.get = function(key) {
  return RichStorage.Wrapper.unwrapIfPossible(
      this.getWrapper(key));
};
