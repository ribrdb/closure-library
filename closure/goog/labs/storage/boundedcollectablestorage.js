/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides a convenient API for data persistence with data
 * expiration and number of items limit.
 *
 * Setting and removing values keeps a max number of items invariant.
 * Collecting values can be user initiated. If oversize, first removes
 * expired items, if still oversize than removes the oldest items until a size
 * constraint is fulfilled.
 *
 */

import * as array from '../../array/array.js';

import * as asserts from '../../asserts/asserts.js';
import * as iter from '../../iter/iter.js';
import { CollectableStorage } from '../../storage/collectablestorage.js';
import { ErrorCode } from '../../storage/errorcode.js';
import { ExpiringStorage } from '../../storage/expiringstorage.js';
const { IterableMechanism } = goog.requireType('goog.storage.mechanism.IterableMechanism');



/**
 * Provides a storage with bounded number of elements, expiring keys and
 * a collection method.
 *
 * @param {!IterableMechanism} mechanism The underlying
 *     storage mechanism.
 * @param {number} maxItems Maximum number of items in storage.
 * @constructor
 * @struct
 * @extends {CollectableStorage}
 * @final
 */
export function BoundedCollectableStorage(mechanism, maxItems) {
  BoundedCollectableStorage.base(
      this, 'constructor', mechanism);

  /**
   * A maximum number of items that should be stored.
   * @private {number}
   */
  this.maxItems_ = maxItems;
}
goog.inherits(
    BoundedCollectableStorage,
    CollectableStorage);


/**
 * An item key used to store a list of keys.
 * @const
 * @private
 */
BoundedCollectableStorage.KEY_LIST_KEY_ =
    'bounded-collectable-storage';


/**
 * Recreates a list of keys in order of creation.
 *
 * @return {!Array<string>} a list of unexpired keys.
 * @private
 */
BoundedCollectableStorage.prototype.rebuildIndex_ =
    function() {
      const keys = [];
      iter.forEach(
          /** @type {IterableMechanism} */ (this.mechanism)
              .__iterator__(true),
          function(key) {
            if (BoundedCollectableStorage.KEY_LIST_KEY_ == key) {
              return;
            }

            let wrapper;

            try {
              wrapper = this.getWrapper(key, true);
            } catch (ex) {
              if (ex == ErrorCode.INVALID_VALUE) {
                // Skip over bad wrappers and continue.
                return;
              }
              // Unknown error, escalate.
              throw ex;
            }
            asserts.assert(wrapper);

            const creationTime =
                ExpiringStorage.getCreationTime(wrapper);
            keys.push({key: key, created: creationTime});
          },
          this);

      keys.sort(function(a, b) {
        return a.created - b.created;
      });

      return keys.map(function(v) {
        return v.key;
      });
    };


/**
 * Gets key list from a local storage. If an item does not exist,
 * may recreate it.
 *
 * @param {boolean} rebuild Whether to rebuild a index if no index item exists.
 * @return {!Array<string>} a list of keys if index exist, otherwise undefined.
 * @private
 */
BoundedCollectableStorage.prototype.getKeys_ = function(
    rebuild) {
  let keys =
      BoundedCollectableStorage.superClass_.get.call(
          this, BoundedCollectableStorage.KEY_LIST_KEY_) ||
      null;
  if (!keys || !Array.isArray(keys)) {
    if (rebuild) {
      keys = this.rebuildIndex_();
    } else {
      keys = [];
    }
  }
  return /** @type {!Array<string>} */ (keys);
};


/**
 * Saves a list of keys in a local storage.
 *
 * @param {Array<string>} keys a list of keys to save.
 * @private
 */
BoundedCollectableStorage.prototype.setKeys_ = function(
    keys) {
  BoundedCollectableStorage.superClass_.set.call(
      this, BoundedCollectableStorage.KEY_LIST_KEY_, keys);
};


/**
 * Remove subsequence from a sequence.
 *
 * @param {!Array<string>} keys is a sequence.
 * @param {!Array<string>} keysToRemove subsequence of keys, the order must
 *     be kept.
 * @return {!Array<string>} a keys sequence after removing keysToRemove.
 * @private
 */
BoundedCollectableStorage.removeSubsequence_ = function(
    keys, keysToRemove) {
  if (keysToRemove.length == 0) {
    return array.clone(keys);
  }
  const keysToKeep = [];
  let keysIdx = 0;
  let keysToRemoveIdx = 0;

  while (keysToRemoveIdx < keysToRemove.length && keysIdx < keys.length) {
    const key = keysToRemove[keysToRemoveIdx];
    while (keysIdx < keys.length && keys[keysIdx] != key) {
      keysToKeep.push(keys[keysIdx]);
      ++keysIdx;
    }
    ++keysToRemoveIdx;
  }

  asserts.assert(keysToRemoveIdx == keysToRemove.length);
  asserts.assert(keysIdx < keys.length);
  return [...keysToKeep, ...keys.slice(keysIdx + 1)];
};


/**
 * Keeps the number of items in storage under maxItems. Removes elements in the
 * order of creation.
 *
 * @param {!Array<string>} keys a list of keys in order of creation.
 * @param {number} maxSize a number of items to keep.
 * @return {!Array<string>} keys left after removing oversize data.
 * @private
 */
BoundedCollectableStorage.prototype.collectOversize_ =
    function(keys, maxSize) {
      if (keys.length <= maxSize) {
        return array.clone(keys);
      }
      const keysToRemove = keys.slice(0, keys.length - maxSize);
      keysToRemove.forEach(function(key) {
        BoundedCollectableStorage.superClass_.remove.call(
            this, key);
      }, this);
      return BoundedCollectableStorage.removeSubsequence_(
          keys, keysToRemove);
    };


/**
 * Cleans up the storage by removing expired keys.
 *
 * @param {boolean=} opt_strict Also remove invalid keys.
 * @override
 */
BoundedCollectableStorage.prototype.collect = function(
    opt_strict) {
  let keys = this.getKeys_(true);
  const keysToRemove = this.collectInternal(keys, opt_strict);
  keys = BoundedCollectableStorage.removeSubsequence_(
      keys, keysToRemove);
  this.setKeys_(keys);
};


/**
 * Ensures that we keep only maxItems number of items in a local storage.
 * @param {boolean=} opt_skipExpired skip removing expired items first.
 * @param {boolean=} opt_strict Also remove invalid keys.
 */
BoundedCollectableStorage.prototype.collectOversize =
    function(opt_skipExpired, opt_strict) {
      let keys = this.getKeys_(true);
      if (!opt_skipExpired) {
        const keysToRemove = this.collectInternal(keys, opt_strict);
        keys = BoundedCollectableStorage.removeSubsequence_(
            keys, keysToRemove);
      }
      keys = this.collectOversize_(keys, this.maxItems_);
      this.setKeys_(keys);
    };


/**
 * Set an item in the storage.
 *
 * @param {string} key The key to set.
 * @param {*} value The value to serialize to a string and save.
 * @param {number=} opt_expiration The number of miliseconds since epoch
 *     (as in Date.now()) when the value is to expire. If the expiration
 *     time is not provided, the value will persist as long as possible.
 * @override
 */
BoundedCollectableStorage.prototype.set = function(
    key, value, opt_expiration) {
  BoundedCollectableStorage.base(
      this, 'set', key, value, opt_expiration);
  let keys = this.getKeys_(true);
  array.remove(keys, key);

  if (value !== undefined) {
    keys.push(key);
    if (keys.length >= this.maxItems_) {
      const keysToRemove = this.collectInternal(keys);
      keys = BoundedCollectableStorage.removeSubsequence_(
          keys, keysToRemove);
      keys = this.collectOversize_(keys, this.maxItems_);
    }
  }
  this.setKeys_(keys);
};


/**
 * Remove an item from the data storage.
 *
 * @param {string} key The key to remove.
 * @override
 */
BoundedCollectableStorage.prototype.remove = function(key) {
  BoundedCollectableStorage.base(this, 'remove', key);

  const keys = this.getKeys_(false);
  if (keys !== undefined) {
    array.remove(keys, key);
    this.setKeys_(keys);
  }
};
