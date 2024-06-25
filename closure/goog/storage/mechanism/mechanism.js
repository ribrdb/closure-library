/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Abstract interface for storing and retrieving data using
 * some persistence mechanism.
 */

goog.declareModuleId('goog.storage.mechanism.mechanism');



/**
 * Basic interface for all storage mechanisms.
 *
 * @constructor
 * @struct
 * @abstract
 */
export function Mechanism() {}


/**
 * Set a value for a key.
 *
 * @param {string} key The key to set.
 * @param {string} value The string to save.
 * @abstract
 */
Mechanism.prototype.set = function(key, value) {};


/**
 * Get the value stored under a key.
 *
 * @param {string} key The key to get.
 * @return {?string} The corresponding value, null if not found.
 * @abstract
 */
Mechanism.prototype.get = function(key) {};


/**
 * Remove a key and its value.
 *
 * @param {string} key The key to remove.
 * @abstract
 */
Mechanism.prototype.remove = function(key) {};
