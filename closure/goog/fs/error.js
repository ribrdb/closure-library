/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A wrapper for the HTML5 FileError object.
 */


// TODO(user): We're trying to migrate all ES5 subclasses of Closure
// Library to ES6. In ES6 this cannot be referenced before super is called. This
// file has at least one this before a super call (in ES5) and cannot be
// automatically upgraded to ES6 as a result. Please fix this if you have a
// chance. Note: This can sometimes be caused by not calling the super
// constructor at all. You can run the conversion tool yourself to see what it
// does on this file: blaze run //javascript/refactoring/es6_classes:convert.

import * as asserts from '../asserts/asserts.js';

import { DebugError } from '../debug/error.js';
import object from '../object/object.js';
import * as googString from '../string/string.js';

/** @record */
export function DOMErrorLike() {}

/** @type {string|undefined} */
DOMErrorLike.prototype.name;

/** @type {!Error_.ErrorCode|undefined} */
DOMErrorLike.prototype.code;



/**
 * A filesystem error. Since the filesystem API is asynchronous, stack traces
 * are less useful for identifying where errors come from, so this includes a
 * large amount of metadata in the message.
 *
 * @param {!DOMError|!DOMErrorLike} error
 * @param {string} action The action being undertaken when the error was raised.
 * @constructor
 * @extends {DebugError}
 * @final
 */
function Error_(error, action) {
  /** @type {string} */
  this.name;

  /**
     * @type {!Error_.ErrorCode}
     * @deprecated Use the 'name' or 'message' field instead.
     */
  this.code;

  if (error.name !== undefined) {
    this.name = error.name;
    // TODO(user): Remove warning suppression after JSCompiler stops
    // firing a spurious warning here.
    /** @suppress {deprecated} */
    this.code = Error_.getCodeFromName_(error.name);
  } else {
    const code =
        /** @type {!Error_.ErrorCode} */ (asserts.assertNumber(
            /** @type {!DOMErrorLike} */ (error).code));
    this.code = code;
    this.name = Error_.getNameFromCode_(code);
  }
  Error_.base(
      this, 'constructor', googString.subs('%s %s', this.name, action));
}
export { Error_ as Error };
goog.inherits(Error_, DebugError);


/**
 * Names of errors that may be thrown by the File API, the File System API, or
 * the File Writer API.
 *
 * @see http://dev.w3.org/2006/webapi/FileAPI/#ErrorAndException
 * @see http://www.w3.org/TR/file-system-api/#definitions
 * @see http://dev.w3.org/2009/dap/file-system/file-writer.html#definitions
 * @enum {string}
 */
Error_.ErrorName = {
  ABORT: 'AbortError',
  ENCODING: 'EncodingError',
  INVALID_MODIFICATION: 'InvalidModificationError',
  INVALID_STATE: 'InvalidStateError',
  NOT_FOUND: 'NotFoundError',
  NOT_READABLE: 'NotReadableError',
  NO_MODIFICATION_ALLOWED: 'NoModificationAllowedError',
  PATH_EXISTS: 'PathExistsError',
  QUOTA_EXCEEDED: 'QuotaExceededError',
  SECURITY: 'SecurityError',
  SYNTAX: 'SyntaxError',
  TYPE_MISMATCH: 'TypeMismatchError'
};


/**
 * Error codes for file errors.
 * @see http://www.w3.org/TR/file-system-api/#idl-def-FileException
 *
 * @enum {number}
 * @deprecated Use the 'name' or 'message' attribute instead.
 */
Error_.ErrorCode = {
  NOT_FOUND: 1,
  SECURITY: 2,
  ABORT: 3,
  NOT_READABLE: 4,
  ENCODING: 5,
  NO_MODIFICATION_ALLOWED: 6,
  INVALID_STATE: 7,
  SYNTAX: 8,
  INVALID_MODIFICATION: 9,
  QUOTA_EXCEEDED: 10,
  TYPE_MISMATCH: 11,
  PATH_EXISTS: 12
};


/**
 * @param {Error_.ErrorCode|undefined} code
 * @return {string} name
 * @private
 */
Error_.getNameFromCode_ = function(code) {
  const name = object.findKey(Error_.NameToCodeMap_, function(c) {
    return code == c;
  });
  if (name === undefined) {
    throw new Error('Invalid code: ' + code);
  }
  return name;
};


/**
 * Returns the code that corresponds to the given name.
 * @param {string} name
 * @return {Error_.ErrorCode} code
 * @private
 */
Error_.getCodeFromName_ = function(name) {
  return Error_.NameToCodeMap_[name];
};


/**
 * Mapping from error names to values from the ErrorCode enum.
 * @see http://www.w3.org/TR/file-system-api/#definitions.
 * @private {!Object<string, Error_.ErrorCode>}
 */
Error_.NameToCodeMap_ = {
  [Error_.ErrorName.ABORT]: Error_.ErrorCode.ABORT,
  [Error_.ErrorName.ENCODING]: Error_.ErrorCode.ENCODING,
  [Error_.ErrorName.INVALID_MODIFICATION]:
      Error_.ErrorCode.INVALID_MODIFICATION,
  [Error_.ErrorName.INVALID_STATE]:
      Error_.ErrorCode.INVALID_STATE,
  [Error_.ErrorName.NOT_FOUND]: Error_.ErrorCode.NOT_FOUND,
  [Error_.ErrorName.NOT_READABLE]: Error_.ErrorCode.NOT_READABLE,
  [Error_.ErrorName.NO_MODIFICATION_ALLOWED]:
      Error_.ErrorCode.NO_MODIFICATION_ALLOWED,
  [Error_.ErrorName.PATH_EXISTS]: Error_.ErrorCode.PATH_EXISTS,
  [Error_.ErrorName.QUOTA_EXCEEDED]:
      Error_.ErrorCode.QUOTA_EXCEEDED,
  [Error_.ErrorName.SECURITY]: Error_.ErrorCode.SECURITY,
  [Error_.ErrorName.SYNTAX]: Error_.ErrorCode.SYNTAX,
  [Error_.ErrorName.TYPE_MISMATCH]: Error_.ErrorCode.TYPE_MISMATCH
};
