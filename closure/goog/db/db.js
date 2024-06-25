/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Wrappers for the HTML5 IndexedDB. The wrappers export nearly
 * the same interface as the standard API, but return Deferred
 * objects instead of request objects and use Closure events. The wrapper works
 * and has been tested on Chrome version 22+. It may work on older Chrome
 * versions, but they aren't explicitly supported.
 *
 * Example usage:
 *
 *  <code>
 *  openDatabase('mydb', 1, function(ev, db, tx) {
 *    db.createObjectStore('mystore');
 *  }).addCallback(function(db) {
 *    var putTx = db.createTransaction(
 *        [],
 *        Transaction.TransactionMode.READ_WRITE);
 *    var store = putTx.objectStore('mystore');
 *    store.put('value', 'key');
 *    goog.listen(putTx, Transaction.EventTypes.COMPLETE, function() {
 *      var getTx = db.createTransaction([]);
 *      var request = getTx.objectStore('mystore').get('key');
 *      request.addCallback(function(result) {
 *        ...
 *      });
 *  });
 *  </code>
 */


import * as asserts from '../asserts/asserts.js';

import { Deferred } from '../../../third_party/closure/goog/mochikit/async/deferred.js';
import { Error } from './error.js';
import { IndexedDb } from './indexeddb.js';
import { Transaction } from './transaction.js';


/**
 * The IndexedDB factory object.
 *
 * @type {!IDBFactory|undefined}
 * @private
 */
var indexedDb_;

/**
 * Lazily initializes the IndexedDB factory object.
 *
 * @return {!IDBFactory|undefined}
 * @private
 */
function getIndexedDb_() {
  if (indexedDb_ == undefined) {
    indexedDb_ = goog.global.indexedDB || goog.global.mozIndexedDB ||
        goog.global.webkitIndexedDB || goog.global.moz_indexedDB;
  }
  return indexedDb_;
}


/**
 * A callback that's called if a blocked event is received. When a database is
 * supposed to be deleted or upgraded (i.e. versionchange), and there are open
 * connections to this database, a block event will be fired to prevent the
 * operations from going through until all such open connections are closed.
 * This callback can be used to notify users that they should close other tabs
 * that have open connections, or to close the connections manually. Databases
 * can also listen for the {@link IndexedDb.EventType.VERSION_CHANGE}
 * event to automatically close themselves when they're blocking such
 * operations.
 *
 * This is passed a VersionChangeEvent that has the version of the database
 * before it was deleted, and "null" as the new version.
 *
 * @typedef {function(!IndexedDb.VersionChangeEvent)}
 */
export var BlockedCallback;


/**
 * A callback that's called when opening a database whose internal version is
 * lower than the version passed to {@link openDatabase}.
 *
 * This callback is passed three arguments: a VersionChangeEvent with both the
 * old version and the new version of the database; the database that's being
 * opened, for which you can create and delete object stores; and the version
 * change transaction, with which you can abort the version change.
 *
 * Note that the transaction is not active, which means that it can't be used to
 * make changes to the database. However, since there is a transaction running,
 * you can't create another one via {@link IndexedDb.createTransaction}.
 * This means that it's not possible to manipulate the database other than
 * creating or removing object stores in this callback.
 *
 * @typedef {function(!IndexedDb.VersionChangeEvent,
 *                    !IndexedDb,
 *                    !Transaction)}
 */
export var UpgradeNeededCallback;


/**
 * Opens a database connection and wraps it.
 *
 * @param {string} name The name of the database to open.
 * @param {number=} opt_version The expected version of the database. If this is
 *     larger than the actual version, opt_onUpgradeNeeded will be called
 *     (possibly after opt_onBlocked; see {@link BlockedCallback}). If
 *     this is passed, opt_onUpgradeNeeded must be passed as well.
 * @param {UpgradeNeededCallback=} opt_onUpgradeNeeded Called if
 *     opt_version is greater than the old version of the database. If
 *     opt_version is passed, this must be passed as well.
 * @param {BlockedCallback=} opt_onBlocked Called if there are active
 *     connections to the database.
 * @return {!Deferred} The deferred database object.
 */
export function openDatabase(name, opt_version, opt_onUpgradeNeeded, opt_onBlocked) {
  asserts.assert(
      (opt_version !== undefined) == (opt_onUpgradeNeeded !== undefined),
      'opt_version must be passed to goog.db.openDatabase if and only if ' +
          'opt_onUpgradeNeeded is also passed');

  const d = new Deferred();
  let openRequest = opt_version ?
      getIndexedDb_().open(name, opt_version) :
      getIndexedDb_().open(name);
  openRequest.onsuccess = function(ev) {
    const db = new IndexedDb(ev.target.result);
    d.callback(db);
  };
  openRequest.onerror = function(ev) {
    const msg = 'opening database ' + name;
    d.errback(Error.fromRequest(ev.target, msg));
  };
  openRequest.onupgradeneeded = function(ev) {
    if (!opt_onUpgradeNeeded) return;
    const db = new IndexedDb(ev.target.result);
    opt_onUpgradeNeeded(
        new IndexedDb.VersionChangeEvent(ev.oldVersion, ev.newVersion),
        db, new Transaction(ev.target.transaction, db));
  };
  openRequest.onblocked = function(ev) {
    if (opt_onBlocked) {
      opt_onBlocked(
          new IndexedDb.VersionChangeEvent(
              ev.oldVersion, ev.newVersion));
    }
  };
  return d;
}


/**
 * Deletes a database once all open connections have been closed.
 *
 * @param {string} name The name of the database to delete.
 * @param {BlockedCallback=} opt_onBlocked Called if there are active
 *     connections to the database.
 * @return {!Deferred} A deferred object that will fire once the
 *     database is deleted.
 */
export function deleteDatabase(name, opt_onBlocked) {
  const d = new Deferred();
  let deleteRequest = getIndexedDb_().deleteDatabase(name);
  deleteRequest.onsuccess = function(ev) {
    d.callback();
  };
  deleteRequest.onerror = function(ev) {
    const msg = 'deleting database ' + name;
    d.errback(Error.fromRequest(ev.target, msg));
  };
  deleteRequest.onblocked = function(ev) {
    if (opt_onBlocked) {
      opt_onBlocked(
          new IndexedDb.VersionChangeEvent(
              ev.oldVersion, ev.newVersion));
    }
  };
  return d;
}
