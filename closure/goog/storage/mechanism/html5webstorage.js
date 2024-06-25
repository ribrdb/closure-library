/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Base class that implements functionality common
 * across both session and local web storage mechanisms.
 */

import * as asserts from '../../asserts/asserts.js';

import * as iter from '../../iter/iter.js';
import { Iterator } from '../../iter/iter.js';
import { ErrorCode } from './errorcode.js';
import { IterableMechanism } from './iterablemechanism.js';



/**
 * Provides a storage mechanism that uses HTML5 Web storage.
 *
 * @param {Storage} storage The Web storage object.
 * @constructor
 * @struct
 * @extends {IterableMechanism}
 */
export function HTML5WebStorage(storage) {
  HTML5WebStorage.base(this, 'constructor');

  /**
   * The web storage object (window.localStorage or window.sessionStorage).
   * @private {Storage}
   */
  this.storage_ = storage;
}
goog.inherits(
    HTML5WebStorage,
    IterableMechanism);


/**
 * The key used to check if the storage instance is available.
 * @private {string}
 * @const
 */
HTML5WebStorage.STORAGE_AVAILABLE_KEY_ = '__sak';


/**
 * Determines whether or not the mechanism is available.
 * It works only if the provided web storage object exists and is enabled.
 *
 * @return {boolean} True if the mechanism is available.
 */
HTML5WebStorage.prototype.isAvailable = function() {
  if (!this.storage_) {
    return false;
  }

  try {
    // setItem will throw an exception if we cannot access WebStorage (e.g.,
    // Safari in private mode).
    this.storage_.setItem(
        HTML5WebStorage.STORAGE_AVAILABLE_KEY_, '1');
    this.storage_.removeItem(
        HTML5WebStorage.STORAGE_AVAILABLE_KEY_);
    return true;
  } catch (e) {
    return false;
  }
};


/** @override */
HTML5WebStorage.prototype.set = function(key, value) {
  try {
    // May throw an exception if storage quota is exceeded.
    this.storage_.setItem(key, value);
  } catch (e) {
    // In Safari Private mode, conforming to the W3C spec, invoking
    // Storage.prototype.setItem will allways throw a QUOTA_EXCEEDED_ERR
    // exception.  Since it's impossible to verify if we're in private browsing
    // mode, we throw a different exception if the storage is empty.
    if (this.storage_.length == 0) {
      throw ErrorCode.STORAGE_DISABLED;
    } else {
      throw ErrorCode.QUOTA_EXCEEDED;
    }
  }
};


/** @override */
HTML5WebStorage.prototype.get = function(key) {
  // According to W3C specs, values can be of any type. Since we only save
  // strings, any other type is a storage error. If we returned nulls for
  // such keys, i.e., treated them as non-existent, this would lead to a
  // paradox where a key exists, but it does not when it is retrieved.
  // http://www.w3.org/TR/2009/WD-webstorage-20091029/#the-storage-interface
  var value = this.storage_.getItem(key);
  if (typeof value !== 'string' && value !== null) {
    throw ErrorCode.INVALID_VALUE;
  }
  return value;
};


/** @override */
HTML5WebStorage.prototype.remove = function(key) {
  this.storage_.removeItem(key);
};


/** @override */
HTML5WebStorage.prototype.getCount = function() {
  return this.storage_.length;
};


/** @override */
HTML5WebStorage.prototype.__iterator__ = function(
    opt_keys) {
  var i = 0;
  var storage = this.storage_;
  var newIter = new Iterator();
  /**
   * @return {!IIterableResult<string>}
   * @override
   */
  newIter.next = function() {
    if (i >= storage.length) {
      return iter.ES6_ITERATOR_DONE;
    }
    var key = asserts.assertString(storage.key(i++));
    if (opt_keys) {
      return iter.createEs6IteratorYield(key);
    }
    var value = storage.getItem(key);
    // The value must exist and be a string, otherwise it is a storage error.
    if (typeof value !== 'string') {
      throw ErrorCode.INVALID_VALUE;
    }
    return iter.createEs6IteratorYield(value);
  };

  return newIter;
};


/** @override */
HTML5WebStorage.prototype.clear = function() {
  this.storage_.clear();
};


/**
 * Gets the key for a given key index. If an index outside of
 * [0..this.getCount()) is specified, this function returns null.
 * @param {number} index A key index.
 * @return {?string} A storage key, or null if the specified index is out of
 *     range.
 */
HTML5WebStorage.prototype.key = function(index) {
  return this.storage_.key(index);
};
