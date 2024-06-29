/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides a convenient API for data persistence with expiration.
 */

import { RichStorage } from './richstorage.js';

const { Mechanism } = goog.requireType('goog.storage.mechanism.mechanism');



/**
 * Provides a storage with expiring keys.
 *
 * @param {!Mechanism} mechanism The underlying
 *     storage mechanism.
 * @constructor
 * @struct
 * @extends {RichStorage}
 */
export function ExpiringStorage(mechanism) {
 ExpiringStorage.base(this, 'constructor', mechanism);
}
goog.inherits(ExpiringStorage, RichStorage);


/**
 * Metadata key under which the expiration time is stored.
 *
 * @type {string}
 * @protected
 */
ExpiringStorage.EXPIRATION_TIME_KEY = 'expiration';


/**
 * Metadata key under which the creation time is stored.
 *
 * @type {string}
 * @protected
 */
ExpiringStorage.CREATION_TIME_KEY = 'creation';


/**
 * Returns the wrapper creation time.
 *
 * @param {!Object} wrapper The wrapper.
 * @return {number|undefined} Wrapper creation time.
 */
ExpiringStorage.getCreationTime = function(wrapper) {
 return wrapper[ExpiringStorage.CREATION_TIME_KEY];
};


/**
 * Returns the wrapper expiration time.
 *
 * @param {!Object} wrapper The wrapper.
 * @return {number|undefined} Wrapper expiration time.
 */
ExpiringStorage.getExpirationTime = function(wrapper) {
 return wrapper[ExpiringStorage.EXPIRATION_TIME_KEY];
};


/**
 * Checks if the data item has expired.
 *
 * @param {!Object} wrapper The wrapper.
 * @return {boolean} True if the item has expired.
 */
ExpiringStorage.isExpired = function(wrapper) {
 const creation = ExpiringStorage.getCreationTime(wrapper);
 const expiration = ExpiringStorage.getExpirationTime(wrapper);
 return !!expiration && expiration < goog.now() ||
     !!creation && creation > goog.now();
};


/**
 * Set an item in the storage.
 *
 * @param {string} key The key to set.
 * @param {*} value The value to serialize to a string and save.
 * @param {number=} opt_expiration The number of miliseconds since epoch
 *     (as in goog.now()) when the value is to expire. If the expiration
 *     time is not provided, the value will persist as long as possible.
 * @override
 */
ExpiringStorage.prototype.set = function(
    key, value, opt_expiration) {
 const wrapper = RichStorage.Wrapper.wrapIfNecessary(value);
 if (wrapper) {
   if (opt_expiration) {
     if (opt_expiration < goog.now()) {
       ExpiringStorage.prototype.remove.call(this, key);
       return;
     }
     wrapper[ExpiringStorage.EXPIRATION_TIME_KEY] =
         opt_expiration;
   }
   wrapper[ExpiringStorage.CREATION_TIME_KEY] = goog.now();
 }
 ExpiringStorage.base(this, 'set', key, wrapper);
};


/**
 * Get an item wrapper (the item and its metadata) from the storage.
 *
 * @param {string} key The key to get.
 * @param {boolean=} opt_expired If true, return expired wrappers as well.
 * @return {(!Object|undefined)} The wrapper, or undefined if not found.
 * @override
 */
ExpiringStorage.prototype.getWrapper = function(key, opt_expired) {
 const wrapper = ExpiringStorage.base(this, 'getWrapper', key);
 if (!wrapper) {
   return undefined;
 }
 if (!opt_expired && ExpiringStorage.isExpired(wrapper)) {
   ExpiringStorage.prototype.remove.call(this, key);
   return undefined;
 }
 return wrapper;
};
