/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides a convenient API for data persistence using a selected
 * data storage mechanism.
 */

import * as googJson from '../json/json.js';

import { ErrorCode } from './errorcode.js';
const { Mechanism } = goog.requireType('goog.storage.mechanism.mechanism');



/**
 * The base implementation for all storage APIs.
 *
 * @param {!Mechanism} mechanism The underlying
 *     storage mechanism.
 * @constructor
 * @struct
 */
export function Storage(mechanism) {
  /**
   * The mechanism used to persist key-value pairs.
   *
   * @protected {Mechanism}
   */
  this.mechanism = mechanism;
}


/**
 * Sets an item in the data storage.
 *
 * @param {string} key The key to set.
 * @param {*} value The value to serialize to a string and save.
 */
Storage.prototype.set = function(key, value) {
  if (value === undefined) {
    this.mechanism.remove(key);
    return;
  }
  this.mechanism.set(key, googJson.serialize(value));
};


/**
 * Gets an item from the data storage.
 *
 * @param {string} key The key to get.
 * @return {*} Deserialized value or undefined if not found.
 */
Storage.prototype.get = function(key) {
  let json;
  try {
    json = this.mechanism.get(key);
  } catch (e) {
    // If, for any reason, the value returned by a mechanism's get method is not
    // a string, an exception is thrown.  In this case, we must fail gracefully
    // instead of propagating the exception to clients.  See b/8095488 for
    // details.
    return undefined;
  }
  if (json === null) {
    return undefined;
  }

  try {
    return JSON.parse(json);
  } catch (e) {
    throw ErrorCode.INVALID_VALUE;
  }
};


/**
 * Removes an item from the data storage.
 *
 * @param {string} key The key to remove.
 */
Storage.prototype.remove = function(key) {
  this.mechanism.remove(key);
};
