/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides the built-in dictionary matcher methods like
 *     hasEntry, hasEntries, hasKey, hasValue, etc.
 */

import * as asserts from '../../asserts/asserts.js';

import { Matcher } from './matcher.js';
import googObject from '../../object/object.js';



/**
 * The HasEntries matcher.
 *
 * @param {!Object} entries The entries to check in the object.
 *
 * @constructor
 * @struct
 * @implements {Matcher}
 * @final
 */
export function HasEntriesMatcher(entries) {
 /**
  * @type {Object}
  * @private
  */
 this.entries_ = entries;
}


/**
 * Determines if an object has particular entries.
 *
 * @override
 */
HasEntriesMatcher.prototype.matches =
    function(actualObject) {
     asserts.assertObject(actualObject, 'Expected an Object');
     var object = /** @type {!Object} */ (actualObject);
     return googObject.every(this.entries_, function(value, key) {
      return googObject.containsKey(object, key) && object[key] === value;
     });
    };


/**
 * @override
 */
HasEntriesMatcher.prototype.describe =
    function(actualObject) {
     asserts.assertObject(actualObject, 'Expected an Object');
     var object = /** @type {!Object} */ (actualObject);
     var errorString = 'Input object did not contain the following entries:\n';
     googObject.forEach(this.entries_, function(value, key) {
      if (!googObject.containsKey(object, key) || object[key] !== value) {
        errorString += key + ': ' + value + '\n';
      }
     });
     return errorString;
    };



/**
 * The HasEntry matcher.
 *
 * @param {string} key The key for the entry.
 * @param {*} value The value for the key.
 *
 * @constructor
 * @struct
 * @implements {Matcher}
 * @final
 */
export function HasEntryMatcher(key, value) {
 /**
  * @type {string}
  * @private
  */
 this.key_ = key;
 /**
  * @type {*}
  * @private
  */
 this.value_ = value;
}


/**
 * Determines if an object has a particular entry.
 *
 * @override
 */
HasEntryMatcher.prototype.matches =
    function(actualObject) {
     asserts.assertObject(actualObject);
     return googObject.containsKey(actualObject, this.key_) &&
         actualObject[this.key_] === this.value_;
    };


/**
 * @override
 */
HasEntryMatcher.prototype.describe =
    function(actualObject) {
     asserts.assertObject(actualObject);
     var errorMsg;
     if (googObject.containsKey(actualObject, this.key_)) {
       errorMsg = 'Input object did not contain key: ' + this.key_;
     } else {
       errorMsg = 'Value for key did not match value: ' + this.value_;
     }
     return errorMsg;
    };



/**
 * The HasKey matcher.
 *
 * @param {string} key The key to check in the object.
 *
 * @constructor
 * @struct
 * @implements {Matcher}
 * @final
 */
export function HasKeyMatcher(key) {
 /**
  * @type {string}
  * @private
  */
 this.key_ = key;
}


/**
 * Determines if an object has a key.
 *
 * @override
 */
HasKeyMatcher.prototype.matches = function(
    actualObject) {
 asserts.assertObject(actualObject);
 return googObject.containsKey(actualObject, this.key_);
};


/**
 * @override
 */
HasKeyMatcher.prototype.describe = function(
    actualObject) {
 asserts.assertObject(actualObject);
 return 'Input object did not contain the key: ' + this.key_;
};



/**
 * The HasValue matcher.
 *
 * @param {*} value The value to check in the object.
 *
 * @constructor
 * @struct
 * @implements {Matcher}
 * @final
 */
export function HasValueMatcher(value) {
 /**
  * @type {*}
  * @private
  */
 this.value_ = value;
}


/**
 * Determines if an object contains a value
 *
 * @override
 */
HasValueMatcher.prototype.matches =
    function(actualObject) {
     asserts.assertObject(actualObject, 'Expected an Object');
     var object = /** @type {!Object} */ (actualObject);
     return googObject.containsValue(object, this.value_);
    };


/**
 * @override
 */
HasValueMatcher.prototype.describe =
    function(actualObject) {
     return 'Input object did not contain the value: ' + this.value_;
    };


/**
 * Gives a matcher that asserts an object contains all the given key-value pairs
 * in the input object.
 *
 * @param {!Object} entries The entries to check for presence in the object.
 * @return {!HasEntriesMatcher} A
 *     HasEntriesMatcher.
 */
HasEntriesMatcher.hasEntries = function(
    entries) {
 return new HasEntriesMatcher(entries);
};


/**
 * Gives a matcher that asserts an object contains the given key-value pair.
 *
 * @param {string} key The key to check for presence in the object.
 * @param {*} value The value to check for presence in the object.
 * @return {!HasEntryMatcher} A
 *     HasEntryMatcher.
 */
HasEntryMatcher.hasEntry = function(
    key, value) {
 return new HasEntryMatcher(key, value);
};


/**
 * Gives a matcher that asserts an object contains the given key.
 *
 * @param {string} key The key to check for presence in the object.
 * @return {!HasKeyMatcher} A HasKeyMatcher.
 */
HasKeyMatcher.hasKey = function(key) {
 return new HasKeyMatcher(key);
};


/**
 * Gives a matcher that asserts an object contains the given value.
 *
 * @param {*} value The value to check for presence in the object.
 * @return {!HasValueMatcher} A
 *     HasValueMatcher.
 */
HasValueMatcher.hasValue = function(value) {
 return new HasValueMatcher(value);
};
