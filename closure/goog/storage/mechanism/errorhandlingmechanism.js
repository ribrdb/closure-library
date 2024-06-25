/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Wraps a storage mechanism with a custom error handler.
 */

import { Mechanism } from './mechanism.js';



/**
 * Wraps a storage mechanism with a custom error handler.
 *
 * @param {!Mechanism} mechanism Underlying storage
 *     mechanism.
 * @param {ErrorHandlingMechanism.ErrorHandler}
 *     errorHandler An error handler.
 * @constructor
 * @struct
 * @extends {Mechanism}
 * @final
 */
export function ErrorHandlingMechanism(mechanism, errorHandler) {
  ErrorHandlingMechanism.base(this, 'constructor');

  /**
     * The mechanism to be wrapped.
     * @type {!Mechanism}
     * @private
     */
  this.mechanism_ = mechanism;

  /**
     * The error handler.
     * @type {ErrorHandlingMechanism.ErrorHandler}
     * @private
     */
  this.errorHandler_ = errorHandler;
}
goog.inherits(
    ErrorHandlingMechanism,
    Mechanism);


/**
 * Valid storage mechanism operations.
 * @enum {string}
 */
ErrorHandlingMechanism.Operation = {
  SET: 'set',
  GET: 'get',
  REMOVE: 'remove'
};


/**
 * A function that handles errors raised in goog.storage.  Since some places in
 * the goog.storage codebase throw strings instead of Error objects, we accept
 * these as a valid parameter type.  It supports the following arguments:
 *
 * 1) The raised error (either in Error or string form);
 * 2) The operation name which triggered the error, as defined per the
 *    ErrorHandlingMechanism.Operation enum;
 * 3) The key that is passed to a storage method;
 * 4) An optional value that is passed to a storage method (only used in set
 *    operations).
 *
 * @typedef {function(
 *   (!Error|string),
 *   ErrorHandlingMechanism.Operation,
 *   string,
 *   *=)}
 */
ErrorHandlingMechanism.ErrorHandler;


/** @override */
ErrorHandlingMechanism.prototype.set = function(
    key, value) {
  try {
    this.mechanism_.set(key, value);
  } catch (e) {
    this.errorHandler_(
        e, ErrorHandlingMechanism.Operation.SET, key,
        value);
  }
};


/** @override */
ErrorHandlingMechanism.prototype.get = function(key) {
  try {
    return this.mechanism_.get(key);
  } catch (e) {
    this.errorHandler_(
        e, ErrorHandlingMechanism.Operation.GET, key);
    return null;
  }
};


/** @override */
ErrorHandlingMechanism.prototype.remove = function(key) {
  try {
    this.mechanism_.remove(key);
  } catch (e) {
    this.errorHandler_(
        e, ErrorHandlingMechanism.Operation.REMOVE, key);
  }
};
