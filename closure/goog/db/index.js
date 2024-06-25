/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Wrapper for an IndexedDB index.
 */


import { Deferred } from '../../../third_party/closure/goog/mochikit/async/deferred.js';

import { Cursor } from './cursor.js';
import { Error } from './error.js';
import { KeyRange } from './keyrange.js';
import * as debug from '../debug/debug.js';



/**
 * Creates an IDBIndex wrapper object. Indexes are associated with object
 * stores and provide methods for looking up objects based on their non-key
 * properties. Should not be created directly, access through the object store
 * it belongs to.
 * @see goog.db.ObjectStore#getIndex
 *
 * @param {!IDBIndex} index Underlying IDBIndex object.
 * @constructor
 * @final
 */
export function Index(index) {
  /**
   * Underlying IndexedDB index object.
   *
   * @type {!IDBIndex}
   * @private
   */
  this.index_ = index;
}


/**
 * @return {string} Name of the index.
 */
Index.prototype.getName = function() {
  return this.index_.name;
};


/**
 * @return {*} Key path of the index.
 */
Index.prototype.getKeyPath = function() {
  return this.index_.keyPath;
};


/**
 * @return {boolean} True if the index enforces that there is only one object
 *     for each unique value it indexes on.
 */
Index.prototype.isUnique = function() {
  return this.index_.unique;
};


/**
 * Helper function for get and getKey.
 *
 * @param {string} fn Function name to call on the index to get the request.
 * @param {string} msg Message to give to the error.
 * @param {!IDBKeyType} key The key to look up in the index.
 * @return {!Deferred} The resulting deferred object.
 * @private
 */
Index.prototype.get_ = function(fn, msg, key) {
  const d = new Deferred();
  let request;
  try {
    request = this.index_[fn](key);
  } catch (err) {
    msg += ' with key ' + debug.deepExpose(key);
    d.errback(Error.fromException(err, msg));
    return d;
  }
  request.onsuccess = function(ev) {
    d.callback(ev.target.result);
  };
  request.onerror = function(ev) {
    msg += ' with key ' + debug.deepExpose(key);
    d.errback(Error.fromRequest(ev.target, msg));
  };
  return d;
};


/**
 * Fetches a single object from the object store. Even if there are multiple
 * objects that match the given key, this method will get only one of them.
 *
 * @param {!IDBKeyType} key Key to look up in the index.
 * @return {!Deferred} The deferred object for the given record.
 */
Index.prototype.get = function(key) {
  return this.get_('get', 'getting from index ' + this.getName(), key);
};


/**
 * Looks up a single object from the object store and gives back the key that
 * it's listed under in the object store. Even if there are multiple records
 * that match the given key, this method returns the first.
 *
 * @param {!IDBKeyType} key Key to look up in the index.
 * @return {!Deferred} The deferred key for the record that matches
 *     the key.
 */
Index.prototype.getKey = function(key) {
  return this.get_('getKey', 'getting key from index ' + this.getName(), key);
};


/**
 * Returns the values matching `opt_key` up to `opt_count`.
 *
 * If `obt_key` is a `KeyRange`, returns all keys in that range. If it is
 * `undefined`, returns all known keys.
 *
 * @param {!IDBKeyType|!KeyRange=} opt_key Key or KeyRange to look up in
 *     the index.
 * @param {number=} opt_count The number records to return
 * @return {!Deferred} A deferred array of objects that match the
 *     key.
 */
Index.prototype.getAll = function(opt_key, opt_count) {
  return this.getAll_(
      'getAll', 'getting all from index ' + this.getName(), opt_key, opt_count);
};


/**
 * Returns the keys matching `opt_key` up to `opt_count`.
 *
 * If `obt_key` is a `KeyRange`, returns all keys in that range. If it is
 * `undefined`, returns all known keys.
 *
 * @param {!IDBKeyType|!KeyRange=} opt_key Key or KeyRange to look up in
 *     the index.
 * @param {number=} opt_count The number records to return
 * @return {!Deferred} A deferred array of keys for objects that
 *     match the key.
 */
Index.prototype.getAllKeys = function(opt_key, opt_count) {
  return this.getAll_(
      'getAllKeys', 'getting all keys index ' + this.getName(), opt_key,
      opt_count);
};


/**
 * Helper function for native `getAll` and `getAllKeys` on `IDBObjectStore` that
 * takes in `IDBKeyRange` as params.
 *
 * Returns the result of the native method in a `Deferred` object.
 *
 * @param {string} fn Function name to call on the index to get the request.
 * @param {string} msg Message to give to the error.
 * @param {!IDBKeyType|!KeyRange|undefined} keyOrRange
 *     Key or KeyRange to look up in the index.
 * @param {number|undefined} count The number records to return
 * @return {!Deferred} The resulting deferred array of objects.
 * @private
 */
Index.prototype.getAll_ = function(fn, msg, keyOrRange, count) {
  let nativeRange;
  if (keyOrRange === undefined) {
    nativeRange = undefined;
  } else if (keyOrRange instanceof KeyRange) {
    nativeRange = keyOrRange.range();
  } else {
    nativeRange = KeyRange.only(keyOrRange).range();
  }

  const d = new Deferred();
  let request;
  try {
    request = this.index_[fn](nativeRange, count);
  } catch (err) {
    msg += ' for range ' +
        (nativeRange ? debug.deepExpose(nativeRange) : '<all>');
    d.errback(Error.fromException(err, msg));
    return d;
  }
  request.onsuccess = function() {
    d.callback(request.result);
  };
  request.onerror = function(ev) {
    msg += ' for range ' +
        (nativeRange ? debug.deepExpose(nativeRange) : '<all>');
    d.errback(Error.fromRequest(ev.target, msg));
  };
  return d;
};


/**
 * Opens a cursor over the specified key range. Returns a cursor object which is
 * able to iterate over the given range.
 *
 * Example usage:
 *
 * <code>
 *  var cursor = index.openCursor(KeyRange.bound('a', 'c'));
 *
 *  var key = goog.events.listen(
 *      cursor, Cursor.EventType.NEW_DATA,
 *      function() {
 *        // Do something with data.
 *        cursor.next();
 *      });
 *
 *  goog.events.listenOnce(
 *      cursor, Cursor.EventType.COMPLETE,
 *      function() {
 *        // Clean up listener, and perform a finishing operation on the data.
 *        goog.events.unlistenByKey(key);
 *      });
 * </code>
 *
 * @param {!KeyRange=} opt_range The key range. If undefined iterates
 *     over the whole object store.
 * @param {!Cursor.Direction=} opt_direction The direction. If undefined
 *     moves in a forward direction with duplicates.
 * @return {!Cursor} The cursor.
 * @throws {!Error} If there was a problem opening the cursor.
 */
Index.prototype.openCursor = function(opt_range, opt_direction) {
  return Cursor.openCursor(this.index_, opt_range, opt_direction);
};
