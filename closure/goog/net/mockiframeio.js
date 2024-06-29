/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Mock of IframeIo for unit testing.
 */

import { EventTarget } from '../events/eventtarget.js';

import { ErrorCode } from './errorcode.js';
import { EventType } from './eventtype.js';
import { IframeIo } from './iframeio.js';
const { Uri } = goog.requireType('goog.uri.uri');
const { Map } = goog.requireType('goog.structs.map');
const { TestQueue } = goog.requireType('goog.testing.testqueue');



/**
 * Mock implementation of IframeIo. This doesn't provide a mock
 * implementation for all cases, but it's not too hard to add them as needed.
 * @param {TestQueue} testQueue Test queue for inserting test
 *     events.
 * @constructor
 * @extends {EventTarget}
 * @final
 * @deprecated Use goog.testing.net.MockIFrameIo instead.
 */
export function MockIFrameIo(testQueue) {
 EventTarget.call(this);

 /**
  * Queue of events write to
  * @type {TestQueue}
  * @private
  */
 this.testQueue_ = testQueue;
}
goog.inherits(MockIFrameIo, EventTarget);


/**
 * Whether MockIFrameIo is active.
 * @type {boolean}
 * @private
 */
MockIFrameIo.prototype.active_ = false;


/**
 * Last content.
 * @type {string}
 * @private
 */
MockIFrameIo.prototype.lastContent_ = '';


/**
 * Last error code.
 * @type {ErrorCode}
 * @private
 */
MockIFrameIo.prototype.lastErrorCode_ = ErrorCode.NO_ERROR;


/**
 * Last error message.
 * @type {string}
 * @private
 */
MockIFrameIo.prototype.lastError_ = '';


/**
 * Last custom error.
 * @type {?Object}
 * @private
 */
MockIFrameIo.prototype.lastCustomError_ = null;


/**
 * Last URI.
 * @type {?Uri}
 * @private
 */
MockIFrameIo.prototype.lastUri_ = null;


/** @private {Function} */
MockIFrameIo.prototype.errorChecker_;


/** @private {boolean} */
MockIFrameIo.prototype.success_;


/** @private {boolean} */
MockIFrameIo.prototype.complete_;


/**
 * Simulates the iframe send.
 *
 * @param {Uri|string} uri Uri of the request.
 * @param {string=} opt_method Default is GET, POST uses a form to submit the
 *     request.
 * @param {boolean=} opt_noCache Append a timestamp to the request to avoid
 *     caching.
 * @param {Object|Map=} opt_data Map of key-value pairs.
 */
MockIFrameIo.prototype.send = function(
    uri, opt_method, opt_noCache, opt_data) {
 if (this.active_) {
   throw new Error('[goog.net.IframeIo] Unable to send, already active.');
 }

 this.testQueue_.enqueue(['s', uri, opt_method, opt_noCache, opt_data]);
 this.complete_ = false;
 this.active_ = true;
};


/**
 * Simulates the iframe send from a form.
 * @param {Element} form Form element used to send the request to the server.
 * @param {string=} opt_uri Uri to set for the destination of the request, by
 *     default the uri will come from the form.
 * @param {boolean=} opt_noCache Append a timestamp to the request to avoid
 *     caching.
 */
MockIFrameIo.prototype.sendFromForm = function(
    form, opt_uri, opt_noCache) {
 if (this.active_) {
   throw new Error('[goog.net.IframeIo] Unable to send, already active.');
 }

 this.testQueue_.enqueue(['s', form, opt_uri, opt_noCache]);
 this.complete_ = false;
 this.active_ = true;
};


/**
 * Simulates aborting the current Iframe request.
 * @param {ErrorCode=} opt_failureCode Optional error code to use -
 *     defaults to ABORT.
 */
MockIFrameIo.prototype.abort = function(opt_failureCode) {
 if (this.active_) {
   this.testQueue_.enqueue(['a', opt_failureCode]);
   this.complete_ = false;
   this.active_ = false;
   this.success_ = false;
   this.lastErrorCode_ = opt_failureCode || ErrorCode.ABORT;
   this.dispatchEvent(EventType.ABORT);
   this.simulateReady();
 }
};


/**
 * Simulates receive of incremental data.
 * @param {Object} data Data.
 */
MockIFrameIo.prototype.simulateIncrementalData = function(data) {
 this.dispatchEvent(new IframeIo.IncrementalDataEvent(data));
};


/**
 * Simulates the iframe is done.
 * @param {ErrorCode} errorCode The error code for any error that
 *     should be simulated.
 */
MockIFrameIo.prototype.simulateDone = function(errorCode) {
 if (errorCode) {
   this.success_ = false;
   this.lastErrorCode_ = ErrorCode.HTTP_ERROR;
   this.lastError_ = this.getLastError();
   this.dispatchEvent(EventType.ERROR);
 } else {
   this.success_ = true;
   this.lastErrorCode_ = ErrorCode.NO_ERROR;
   this.dispatchEvent(EventType.SUCCESS);
 }
 this.complete_ = true;
 this.dispatchEvent(EventType.COMPLETE);
};


/**
 * Simulates the IFrame is ready for the next request.
 */
MockIFrameIo.prototype.simulateReady = function() {
 this.dispatchEvent(EventType.READY);
};


/**
 * @return {boolean} True if transfer is complete.
 */
MockIFrameIo.prototype.isComplete = function() {
 return this.complete_;
};


/**
 * @return {boolean} True if transfer was successful.
 */
MockIFrameIo.prototype.isSuccess = function() {
 return this.success_;
};


/**
 * @return {boolean} True if a transfer is in progress.
 */
MockIFrameIo.prototype.isActive = function() {
 return this.active_;
};


/**
 * Returns the last response text (i.e. the text content of the iframe).
 * Assumes plain text!
 * @return {string} Result from the server.
 */
MockIFrameIo.prototype.getResponseText = function() {
 return this.lastContent_;
};


/**
 * Parses the content as JSON. This is a safe parse and may throw an error
 * if the response is malformed.
 * @return {!Object} The parsed content.
 */
MockIFrameIo.prototype.getResponseJson = function() {
 return /** @type {!Object} */ (JSON.parse(this.lastContent_));
};


/**
 * Get the uri of the last request.
 * @return {Uri} Uri of last request.
 */
MockIFrameIo.prototype.getLastUri = function() {
 return this.lastUri_;
};


/**
 * Gets the last error code.
 * @return {ErrorCode} Last error code.
 */
MockIFrameIo.prototype.getLastErrorCode = function() {
 return this.lastErrorCode_;
};


/**
 * Gets the last error message.
 * @return {string} Last error message.
 */
MockIFrameIo.prototype.getLastError = function() {
 return ErrorCode.getDebugMessage(this.lastErrorCode_);
};


/**
 * Gets the last custom error.
 * @return {Object} Last custom error.
 */
MockIFrameIo.prototype.getLastCustomError = function() {
 return this.lastCustomError_;
};


/**
 * Sets the callback function used to check if a loaded IFrame is in an error
 * state.
 * @param {Function} fn Callback that expects a document object as it's single
 *     argument.
 */
MockIFrameIo.prototype.setErrorChecker = function(fn) {
 this.errorChecker_ = fn;
};


/**
 * Gets the callback function used to check if a loaded IFrame is in an error
 * state.
 * @return {Function} A callback that expects a document object as it's single
 *     argument.
 */
MockIFrameIo.prototype.getErrorChecker = function() {
 return this.errorChecker_;
};
