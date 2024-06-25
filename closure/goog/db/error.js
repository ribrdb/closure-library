/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Error classes for the IndexedDB wrapper.
 */


// TODO(user): We're trying to migrate all ES5 subclasses of Closure
// Library to ES6. In ES6 this cannot be referenced before super is called. This
// file has at least one this before a super call (in ES5) and cannot be
// automatically upgraded to ES6 as a result. Please fix this if you have a
// chance. Note: This can sometimes be caused by not calling the super
// constructor at all. You can run the conversion tool yourself to see what it
// does on this file: blaze run //javascript/refactoring/es6_classes:convert.

import * as asserts from '../asserts/asserts.js';

import {DebugError} from '../debug/error.js';

/**
 * A database error. Since the stack trace can be unhelpful in an asynchronous
 * context, the error provides a message about where it was produced.
 *
 * @param {number|!DOMError|!Error.DOMErrorLike} error The DOMError
 *     instance returned by the browser for Chrome22+, or an error code for
 *     previous versions.
 * @param {string} context A description of where the error occurred.
 * @param {string=} opt_message Additional message.
 * @constructor
 * @extends {DebugError}
 * @final
 */
export function Error(error, context, opt_message) {
  var errorCode = null;
  var internalError = null;
  if (typeof error === 'number') {
    errorCode = error;
    internalError = {name: Error.getName(errorCode)};
  } else {
    internalError = error;
    errorCode = Error.getCode(error.name);
  }

  /**
   * The code for this error.
   *
   * @type {number}
   */
  this.code = errorCode;

  /**
     * The DOMException as returned by the browser.
     *
     * @type {!Error.DOMErrorLike}
     * @private
     */
  this.error_ = internalError;

  var msg = 'Error ' + context + ': ' + this.getName();
  if (opt_message) {
    msg += ', ' + opt_message;
  }
  Error.base(this, 'constructor', msg);
}
goog.inherits(Error, DebugError);


/**
 * @return {string} The name of the error.
 */
Error.prototype.getName = function() {
  return this.error_.name || '';
};



/**
 * A specific kind of database error. If a Version Change is unable to proceed
 * due to other open database connections, it will block and this error will be
 * thrown.
 *
 * @constructor
 * @extends {DebugError}
 * @final
 */
Error.VersionChangeBlockedError = function() {
  Error.VersionChangeBlockedError.base(
      this, 'constructor', 'Version change blocked');
};
goog.inherits(Error.VersionChangeBlockedError, DebugError);


/**
 * Synthetic error codes for database errors, for use when IndexedDB
 * support is not available. This numbering differs in practice
 * from the browser implementations, but it is not meant to be reliable:
 * this object merely ensures that Error is loadable on platforms
 * that do not support IndexedDB.
 *
 * @enum {number}
 * @private
 */
Error.DatabaseErrorCode_ = {
  UNKNOWN_ERR: 1,
  NON_TRANSIENT_ERR: 2,
  NOT_FOUND_ERR: 3,
  CONSTRAINT_ERR: 4,
  DATA_ERR: 5,
  NOT_ALLOWED_ERR: 6,
  TRANSACTION_INACTIVE_ERR: 7,
  ABORT_ERR: 8,
  READ_ONLY_ERR: 9,
  TRANSIENT_ERR: 10,
  TIMEOUT_ERR: 11,
  QUOTA_ERR: 12,
  INVALID_ACCESS_ERR: 13,
  INVALID_STATE_ERR: 14
};


/**
 * Error codes for database errors.
 * @see http://www.w3.org/TR/IndexedDB/#idl-def-IDBDatabaseException
 *
 * @enum {number}
 * @suppress {missingProperties} Obsolete IndexDb exception objects
 */
Error.ErrorCode = {
  UNKNOWN_ERR: (goog.global.IDBDatabaseException ||
                goog.global.webkitIDBDatabaseException ||
                Error.DatabaseErrorCode_)
                   .UNKNOWN_ERR,
  NON_TRANSIENT_ERR: (goog.global.IDBDatabaseException ||
                      goog.global.webkitIDBDatabaseException ||
                      Error.DatabaseErrorCode_)
                         .NON_TRANSIENT_ERR,
  NOT_FOUND_ERR: (goog.global.IDBDatabaseException ||
                  goog.global.webkitIDBDatabaseException ||
                  Error.DatabaseErrorCode_)
                     .NOT_FOUND_ERR,
  CONSTRAINT_ERR: (goog.global.IDBDatabaseException ||
                   goog.global.webkitIDBDatabaseException ||
                   Error.DatabaseErrorCode_)
                      .CONSTRAINT_ERR,
  DATA_ERR: (goog.global.IDBDatabaseException ||
             goog.global.webkitIDBDatabaseException ||
             Error.DatabaseErrorCode_)
                .DATA_ERR,
  NOT_ALLOWED_ERR: (goog.global.IDBDatabaseException ||
                    goog.global.webkitIDBDatabaseException ||
                    Error.DatabaseErrorCode_)
                       .NOT_ALLOWED_ERR,
  TRANSACTION_INACTIVE_ERR: (goog.global.IDBDatabaseException ||
                             goog.global.webkitIDBDatabaseException ||
                             Error.DatabaseErrorCode_)
                                .TRANSACTION_INACTIVE_ERR,
  ABORT_ERR: (goog.global.IDBDatabaseException ||
              goog.global.webkitIDBDatabaseException ||
              Error.DatabaseErrorCode_)
                 .ABORT_ERR,
  READ_ONLY_ERR: (goog.global.IDBDatabaseException ||
                  goog.global.webkitIDBDatabaseException ||
                  Error.DatabaseErrorCode_)
                     .READ_ONLY_ERR,
  TIMEOUT_ERR: (goog.global.IDBDatabaseException ||
                goog.global.webkitIDBDatabaseException ||
                Error.DatabaseErrorCode_)
                   .TIMEOUT_ERR,
  QUOTA_ERR: (goog.global.IDBDatabaseException ||
              goog.global.webkitIDBDatabaseException ||
              Error.DatabaseErrorCode_)
                 .QUOTA_ERR,
  INVALID_ACCESS_ERR:
      (goog.global.DOMException || Error.DatabaseErrorCode_)
          .INVALID_ACCESS_ERR,
  INVALID_STATE_ERR:
      (goog.global.DOMException || Error.DatabaseErrorCode_)
          .INVALID_STATE_ERR
};


/**
 * Translates an error code into a more useful message.
 *
 * @param {number} code Error code.
 * @return {string} A debug message.
 */
Error.getMessage = function(code) {
  switch (code) {
    case Error.ErrorCode.UNKNOWN_ERR:
      return 'Unknown error';
    case Error.ErrorCode.NON_TRANSIENT_ERR:
      return 'Invalid operation';
    case Error.ErrorCode.NOT_FOUND_ERR:
      return 'Required database object not found';
    case Error.ErrorCode.CONSTRAINT_ERR:
      return 'Constraint unsatisfied';
    case Error.ErrorCode.DATA_ERR:
      return 'Invalid data';
    case Error.ErrorCode.NOT_ALLOWED_ERR:
      return 'Operation disallowed';
    case Error.ErrorCode.TRANSACTION_INACTIVE_ERR:
      return 'Transaction not active';
    case Error.ErrorCode.ABORT_ERR:
      return 'Request aborted';
    case Error.ErrorCode.READ_ONLY_ERR:
      return 'Modifying operation not allowed in a read-only transaction';
    case Error.ErrorCode.TIMEOUT_ERR:
      return 'Transaction timed out';
    case Error.ErrorCode.QUOTA_ERR:
      return 'Database storage space quota exceeded';
    case Error.ErrorCode.INVALID_ACCESS_ERR:
      return 'Invalid operation';
    case Error.ErrorCode.INVALID_STATE_ERR:
      return 'Invalid state';
    default:
      return 'Unrecognized exception with code ' + code;
  }
};


/** @record */
Error.DOMErrorLike = function() {};

/** @type {string|undefined} */
Error.DOMErrorLike.prototype.name;


/**
 * Names of all possible errors as returned from the browser.
 * @see http://www.w3.org/TR/IndexedDB/#exceptions
 * @enum {string}
 */
Error.ErrorName = {
  ABORT_ERR: 'AbortError',
  CONSTRAINT_ERR: 'ConstraintError',
  DATA_CLONE_ERR: 'DataCloneError',
  DATA_ERR: 'DataError',
  INVALID_ACCESS_ERR: 'InvalidAccessError',
  INVALID_STATE_ERR: 'InvalidStateError',
  NOT_FOUND_ERR: 'NotFoundError',
  QUOTA_EXCEEDED_ERR: 'QuotaExceededError',
  READ_ONLY_ERR: 'ReadOnlyError',
  SYNTAX_ERROR: 'SyntaxError',
  TIMEOUT_ERR: 'TimeoutError',
  TRANSACTION_INACTIVE_ERR: 'TransactionInactiveError',
  UNKNOWN_ERR: 'UnknownError',
  VERSION_ERR: 'VersionError'
};


/**
 * Translates an error name to an error code. This is purely kept for backwards
 * compatibility with Chrome21.
 *
 * @param {string|undefined} name The name of the erorr.
 * @return {number} The error code corresponding to the error.
 */
Error.getCode = function(name) {
  switch (name) {
    case Error.ErrorName.UNKNOWN_ERR:
      return Error.ErrorCode.UNKNOWN_ERR;
    case Error.ErrorName.NOT_FOUND_ERR:
      return Error.ErrorCode.NOT_FOUND_ERR;
    case Error.ErrorName.CONSTRAINT_ERR:
      return Error.ErrorCode.CONSTRAINT_ERR;
    case Error.ErrorName.DATA_ERR:
      return Error.ErrorCode.DATA_ERR;
    case Error.ErrorName.TRANSACTION_INACTIVE_ERR:
      return Error.ErrorCode.TRANSACTION_INACTIVE_ERR;
    case Error.ErrorName.ABORT_ERR:
      return Error.ErrorCode.ABORT_ERR;
    case Error.ErrorName.READ_ONLY_ERR:
      return Error.ErrorCode.READ_ONLY_ERR;
    case Error.ErrorName.TIMEOUT_ERR:
      return Error.ErrorCode.TIMEOUT_ERR;
    case Error.ErrorName.QUOTA_EXCEEDED_ERR:
      return Error.ErrorCode.QUOTA_ERR;
    case Error.ErrorName.INVALID_ACCESS_ERR:
      return Error.ErrorCode.INVALID_ACCESS_ERR;
    case Error.ErrorName.INVALID_STATE_ERR:
      return Error.ErrorCode.INVALID_STATE_ERR;
    default:
      return Error.ErrorCode.UNKNOWN_ERR;
  }
};


/**
 * Converts an error code used by the old spec, to an error name used by the
 * latest spec.
 * @see http://www.w3.org/TR/IndexedDB/#exceptions
 *
 * @param {!Error.ErrorCode|number} code The error code to convert.
 * @return {!Error.ErrorName} The corresponding name of the error.
 */
Error.getName = function(code) {
  switch (code) {
    case Error.ErrorCode.UNKNOWN_ERR:
      return Error.ErrorName.UNKNOWN_ERR;
    case Error.ErrorCode.NOT_FOUND_ERR:
      return Error.ErrorName.NOT_FOUND_ERR;
    case Error.ErrorCode.CONSTRAINT_ERR:
      return Error.ErrorName.CONSTRAINT_ERR;
    case Error.ErrorCode.DATA_ERR:
      return Error.ErrorName.DATA_ERR;
    case Error.ErrorCode.TRANSACTION_INACTIVE_ERR:
      return Error.ErrorName.TRANSACTION_INACTIVE_ERR;
    case Error.ErrorCode.ABORT_ERR:
      return Error.ErrorName.ABORT_ERR;
    case Error.ErrorCode.READ_ONLY_ERR:
      return Error.ErrorName.READ_ONLY_ERR;
    case Error.ErrorCode.TIMEOUT_ERR:
      return Error.ErrorName.TIMEOUT_ERR;
    case Error.ErrorCode.QUOTA_ERR:
      return Error.ErrorName.QUOTA_EXCEEDED_ERR;
    case Error.ErrorCode.INVALID_ACCESS_ERR:
      return Error.ErrorName.INVALID_ACCESS_ERR;
    case Error.ErrorCode.INVALID_STATE_ERR:
      return Error.ErrorName.INVALID_STATE_ERR;
    default:
      return Error.ErrorName.UNKNOWN_ERR;
  }
};


/**
 * Constructs an Error instance from an IDBRequest. This abstraction is
 * necessary to provide backwards compatibility with Chrome21.
 *
 * @param {!IDBRequest} request The request that failed.
 * @param {string} message The error message to add to err if it's wrapped.
 * @return {!Error} The error that caused the failure.
 */
Error.fromRequest = function(request, message) {
  if ('error' in request) {
    // Chrome 22+
    return new Error(asserts.assert(request.error), message);
  } else {
    return new Error(
        {name: Error.ErrorName.UNKNOWN_ERR}, message);
  }
};


/**
 * Constructs an Error instance from an DOMException. This abstraction
 * is necessary to provide backwards compatibility with Chrome21.
 *
 * @param {!DOMError|!DOMException} ex The exception that was thrown.
 * @param {string} message The error message to add to err if it's wrapped.
 * @return {!Error} The error that caused the failure.
 */
Error.fromException = function(ex, message) {
  if ('name' in ex) {
    let errorMessage = message + ': ' + ex.message;
    return new Error(ex, errorMessage);
  } else {
    // TODO(sdh): Is this branch unreachable?
    return new Error(
        {name: Error.ErrorName.UNKNOWN_ERR}, message);
  }
};
