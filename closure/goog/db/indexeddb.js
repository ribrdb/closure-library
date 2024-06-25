/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Wrapper for an IndexedDB database.
 */


goog.declareModuleId('goog.db.indexeddb');

import { Error } from './error.js';
import { ObjectStore } from './objectstore.js';
import { Transaction } from './transaction.js';
import { Event } from '../events/event.js';
import { EventHandler } from '../events/eventhandler.js';
import { EventTarget } from '../events/eventtarget.js';



/**
 * Creates an IDBDatabase wrapper object. The database object has methods for
 * setting the version to change the structure of the database and for creating
 * transactions to get or modify the stored records. Should not be created
 * directly, call {@link goog.db.openDatabase} to set up the connection.
 *
 * @param {!IDBDatabase} db Underlying IndexedDB database object.
 * @constructor
 * @extends {EventTarget}
 * @final
 */
export function IndexedDb(db) {
 IndexedDb.base(this, 'constructor');

 /**
  * Underlying IndexedDB database object.
  *
  * @type {!IDBDatabase}
  * @private
  */
 this.db_ = db;

 /**
     * Internal event handler that listens to IDBDatabase events.
     * @type {!EventHandler<!IndexedDb>}
     * @private
     */
 this.eventHandler_ = new EventHandler(this);

 this.eventHandler_.listen(
     this.db_, IndexedDb.EventType.ABORT,
     goog.bind(this.dispatchEvent, this, IndexedDb.EventType.ABORT));
 this.eventHandler_.listen(
     this.db_, IndexedDb.EventType.ERROR, this.dispatchError_);
 this.eventHandler_.listen(
     this.db_, IndexedDb.EventType.VERSION_CHANGE,
     this.dispatchVersionChange_);
 this.eventHandler_.listen(
     this.db_, IndexedDb.EventType.CLOSE,
     goog.bind(this.dispatchEvent, this, IndexedDb.EventType.CLOSE));
}
goog.inherits(IndexedDb, EventTarget);


/**
 * True iff the database connection is open.
 *
 * @type {boolean}
 * @private
 */
IndexedDb.prototype.open_ = true;


/**
 * Dispatches a wrapped error event based on the given event.
 *
 * @param {!Event} ev The error event given to the underlying IDBDatabase.
 * @private
 */
IndexedDb.prototype.dispatchError_ = function(ev) {
 const idbRequest = /** @type {?IDBRequest} */ (ev.target);
 const domError = idbRequest && idbRequest.error;
 /** @suppress {strictMissingProperties} Added to tighten compiler checks */
 const /** ?number */ errorCode = domError && domError.severity;
 this.dispatchEvent({
   type: IndexedDb.EventType.ERROR,
   errorCode: errorCode,
 });
};


/**
 * Dispatches a wrapped version change event based on the given event.
 *
 * @param {!IDBVersionChangeEvent} ev The version change event given to the
 *     underlying IDBDatabase.
 * @private
 */
IndexedDb.prototype.dispatchVersionChange_ = function(ev) {
 this.dispatchEvent(new IndexedDb.VersionChangeEvent(
     ev.oldVersion, /** @type {number} */ (ev.newVersion)));
};


/**
 * Closes the database connection. Metadata queries can still be made after this
 * method is called, but otherwise this wrapper should not be used further.
 */
IndexedDb.prototype.close = function() {
 if (this.open_) {
   this.db_.close();
   this.open_ = false;
 }
};


/**
 * @return {boolean} Whether a connection is open and the database can be used.
 */
IndexedDb.prototype.isOpen = function() {
 return this.open_;
};


/**
 * @return {string} The name of this database.
 */
IndexedDb.prototype.getName = function() {
 return this.db_.name;
};


/**
 * @return {number} The current database version.
 */
IndexedDb.prototype.getVersion = function() {
 // TODO(bradfordcsmith): drop Number() call once closure compiler's externs
 // are updated
 return Number(this.db_.version);
};


/**
 * @return {!DOMStringList} List of object stores in this database.
 */
IndexedDb.prototype.getObjectStoreNames = function() {
 return this.db_.objectStoreNames;
};


/**
 * Creates an object store in this database. Can only be called inside a
 * {@link goog.db.UpgradeNeededCallback}.
 *
 * @param {string} name Name for the new object store.
 * @param {!IDBObjectStoreParameters=} opt_params Options object.
 *     The available options are:
 *     keyPath, which is a string and determines what object attribute
 *     to use as the key when storing objects in this object store; and
 *     autoIncrement, which is a boolean, which defaults to false and determines
 *     whether the object store should automatically generate keys for stored
 *     objects. If keyPath is not provided and autoIncrement is false, then all
 *     insert operations must provide a key as a parameter.
 * @return {!ObjectStore} The newly created object store.
 * @throws {Error} If there's a problem creating the object store.
 */
IndexedDb.prototype.createObjectStore = function(name, opt_params) {
 try {
   return new ObjectStore(
       this.db_.createObjectStore(name, opt_params));
 } catch (ex) {
   throw Error.fromException(ex, 'creating object store ' + name);
 }
};


/**
 * Deletes an object store. Can only be called inside a
 * {@link goog.db.UpgradeNeededCallback}.
 *
 * @param {string} name Name of the object store to delete.
 * @throws {Error} If there's a problem deleting the object store.
 */
IndexedDb.prototype.deleteObjectStore = function(name) {
 try {
   this.db_.deleteObjectStore(name);
 } catch (ex) {
   throw Error.fromException(ex, 'deleting object store ' + name);
 }
};


/**
 * Creates a new transaction.
 *
 * @param {!Array<string>} storeNames A list of strings that contains the
 *     transaction's scope, the object stores that this transaction can operate
 *     on.
 * @param {Transaction.TransactionMode=} opt_mode The mode of the
 *     transaction. If not present, the default is READ_ONLY.
 * @return {!Transaction} The wrapper for the newly created transaction.
 * @throws {Error} If there's a problem creating the transaction.
 */
IndexedDb.prototype.createTransaction = function(storeNames, opt_mode) {
 try {
   // IndexedDB on Chrome 22+ requires that opt_mode not be passed rather than
   // be explicitly passed as undefined.
   const transaction = opt_mode ? this.db_.transaction(storeNames, opt_mode) :
                                  this.db_.transaction(storeNames);
   return new Transaction(transaction, this);
 } catch (ex) {
   throw Error.fromException(ex, 'creating transaction');
 }
};


/** @override */
IndexedDb.prototype.disposeInternal = function() {
 IndexedDb.base(this, 'disposeInternal');
 this.eventHandler_.dispose();
};


/**
 * Event types fired by a database.
 *
 * @enum {string} The event types for the web socket.
 */
IndexedDb.EventType = {

  /**
   * Fired when a transaction is aborted and the event bubbles to its database.
   */
  ABORT: 'abort',

  /**
   * Fired when the database connection is forcibly closed by the browser,
   * without an explicit call to IDBDatabase#close. This behavior is not in the
   * spec yet but will be added since it is necessary, see
   * https://www.w3.org/Bugs/Public/show_bug.cgi?id=22540.
   */
  CLOSE: 'close',

  /**
   * Fired when a transaction has an error.
   */
  ERROR: 'error',

  /**
   * Fired when someone (possibly in another window) is attempting to modify the
   * structure of the database. Since a change can only be made when there are
   * no active database connections, this usually means that the database should
   * be closed so that the other client can make its changes.
   */
  VERSION_CHANGE: 'versionchange'
};



/**
 * Event representing a (possibly attempted) change in the database structure.
 *
 * At time of writing, no Chrome versions support oldVersion or newVersion. See
 * http://crbug.com/153122.
 *
 * @param {number} oldVersion The previous version of the database.
 * @param {number} newVersion The version the database is being or has been
 *     updated to.
 * @constructor
 * @extends {Event}
 * @final
 */
IndexedDb.VersionChangeEvent = function(oldVersion, newVersion) {
 IndexedDb.VersionChangeEvent.base(
     this, 'constructor', IndexedDb.EventType.VERSION_CHANGE);

 /**
  * The previous version of the database.
  * @type {number}
  */
 this.oldVersion = oldVersion;

 /**
  * The version the database is being or has been updated to.
  * @type {number}
  */
 this.newVersion = newVersion;
};
goog.inherits(IndexedDb.VersionChangeEvent, Event);
