/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Wrapper for an IndexedDB transaction.
 */


import { Deferred } from '../../../third_party/closure/goog/mochikit/async/deferred.js';

import { Error } from './error.js';
import { ObjectStore } from './objectstore.js';
import * as events from '../events/events.js';
import { EventHandler } from '../events/eventhandler.js';
import { EventTarget as GoogEventTarget } from '../events/eventtarget.js';
const {IndexedDb} = goog.requireType('goog.db.indexeddb');



/**
 * Creates a new transaction. Transactions contain methods for accessing object
 * stores and are created from the database object. Should not be created
 * directly, open a database and call createTransaction on it.
 * @see IndexedDb#createTransaction
 *
 * @param {!IDBTransaction} tx IndexedDB transaction to back this wrapper.
 * @param {!IndexedDb} db The database that this transaction modifies.
 * @constructor
 * @extends {GoogEventTarget}
 * @final
 */
export function Transaction(tx, db) {
  Transaction.base(this, 'constructor');

  /**
   * Underlying IndexedDB transaction object.
   *
   * @type {!IDBTransaction}
   * @private
   */
  this.tx_ = tx;

  /**
   * The database that this transaction modifies.
   *
   * @type {!IndexedDb}
   * @private
   */
  this.db_ = db;

  /**
       * Event handler for this transaction.
       *
       * @type {!EventHandler<!Transaction>}
       * @private
       */
  this.eventHandler_ = new EventHandler(this);

  // TODO(user): remove these casts once the externs file is updated to
  // correctly reflect that IDBTransaction extends EventTarget
  this.eventHandler_.listen(
      /** @type {!EventTarget} */ (this.tx_), 'complete',
      goog.bind(
          this.dispatchEvent, this, Transaction.EventTypes.COMPLETE));
  this.eventHandler_.listen(
      /** @type {!EventTarget} */ (this.tx_), 'abort',
      goog.bind(
          this.dispatchEvent, this, Transaction.EventTypes.ABORT));
  this.eventHandler_.listen(
      /** @type {!EventTarget} */ (this.tx_), 'error', this.dispatchError_);
}
goog.inherits(Transaction, GoogEventTarget);


/**
 * Dispatches an error event based on the given event, wrapping the error
 * if necessary.
 *
 * @param {Event} ev The error event given to the underlying IDBTransaction.
 * @private
 */
Transaction.prototype.dispatchError_ = function(ev) {
  if (ev.target instanceof Error) {
    this.dispatchEvent(
        {type: Transaction.EventTypes.ERROR, target: ev.target});
  } else {
    this.dispatchEvent({
      type: Transaction.EventTypes.ERROR,
      target: Error.fromRequest(
          /** @type {!IDBRequest} */ (ev.target), 'in transaction')
    });
  }
};


/**
 * Event types the Transaction can dispatch. COMPLETE events are dispatched
 * when the transaction is committed. If a transaction is aborted it dispatches
 * both an ABORT event and an ERROR event with the ABORT_ERR code. Error events
 * are dispatched on any error.
 *
 * @enum {string}
 */
Transaction.EventTypes = {
  COMPLETE: 'complete',
  ABORT: 'abort',
  ERROR: 'error'
};


/**
 * @return {Transaction.TransactionMode} The transaction's mode.
 */
Transaction.prototype.getMode = function() {
  return /** @type {Transaction.TransactionMode} */ (this.tx_.mode);
};


/**
 * @return {!IndexedDb} The database that this transaction modifies.
 */
Transaction.prototype.getDatabase = function() {
  return this.db_;
};


/**
 * Opens an object store to do operations on in this transaction. The requested
 * object store must be one that is in this transaction's scope.
 * @see IndexedDb#createTransaction
 *
 * @param {string} name The name of the requested object store.
 * @return {!ObjectStore} The wrapped object store.
 * @throws {Error} In case of error getting the object store.
 */
Transaction.prototype.objectStore = function(name) {
  try {
    return new ObjectStore(this.tx_.objectStore(name));
  } catch (ex) {
    throw Error.fromException(ex, 'getting object store ' + name);
  }
};

/**
 * @param {boolean} allowNoopWhenUnsupported Whether it's fine for the method to
 *     act like no-op if native method is not supported by the browser.
 * @throws {!Error} In case of error executing the commit.
 */
Transaction.prototype.commit = function(allowNoopWhenUnsupported) {
  if (!this.tx_.commit && allowNoopWhenUnsupported) {
    // Method doesn't exist, and caller is ok with a no-op.
    return;
  }
  try {
    this.tx_.commit();
  } catch (ex) {
    throw Error.fromException(ex, 'cannot commit the transaction');
  }
};


/**
 * @return {!Deferred} A deferred that will fire once the
 *     transaction is complete. It fires the errback chain if an error occurs
 *     in the transaction, or if it is aborted.
 */
Transaction.prototype.wait = function() {
  const d = new Deferred();
  events.listenOnce(
      this, Transaction.EventTypes.COMPLETE, goog.bind(d.callback, d));
  let errorKey;
  const abortKey = events.listenOnce(
      this, Transaction.EventTypes.ABORT, function() {
    events.unlistenByKey(errorKey);
    d.errback(
        new Error(
            Error.ErrorCode.ABORT_ERR,
            'waiting for transaction to complete'));
  });
  errorKey = events.listenOnce(
      this, Transaction.EventTypes.ERROR, function(e) {
    events.unlistenByKey(abortKey);
    d.errback(e.target);
  });

  const db = this.getDatabase();
  return d.addCallback(function() {
    return db;
  });
};


/**
 * Aborts this transaction. No pending operations will be applied to the
 * database. Dispatches an ABORT event.
 */
Transaction.prototype.abort = function() {
  this.tx_.abort();
};


/** @override */
Transaction.prototype.disposeInternal = function() {
  Transaction.base(this, 'disposeInternal');
  this.eventHandler_.dispose();
};


/**
 * The three possible transaction modes.
 * @see http://www.w3.org/TR/IndexedDB/#idl-def-IDBTransaction
 *
 * @enum {string}
 */
Transaction.TransactionMode = {
  READ_ONLY: 'readonly',
  READ_WRITE: 'readwrite',
  VERSION_CHANGE: 'versionchange'
};
