/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import * as stacktrace from './stacktrace.js';


/**
 * @param {string} comment A summary for the exception.
 * @param {?string=} opt_message A description of the exception.
 * @constructor
 * @extends {Error}
 * @final
 */
export function JsUnitException(comment, opt_message) {
  this.isJsUnitException = true;
  this.message =
      JsUnitException.generateMessage(comment, opt_message);
  this.stackTrace = stacktrace.get();
  // These fields are for compatibility with jsUnitTestManager.
  this.comment = comment || null;
  this.jsUnitMessage = opt_message || '';

  // Ensure there is a stack trace.
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, JsUnitException);
  } else {
    this.stack = new Error().stack || '';
  }
}
goog.inherits(JsUnitException, Error);

/**
 * @param {string} comment A summary for the exception.
 * @param {?string=} opt_message A description of the exception.
 * @return {string} Concatenated message
 * @package
 */
JsUnitException.generateMessage = function(comment, opt_message) {
  return (comment || '') + (comment && opt_message ? '\n' : '') +
      (opt_message || '');
};


/** @override */
JsUnitException.prototype.toString = function() {
  return this.message || this.jsUnitMessage;
};
