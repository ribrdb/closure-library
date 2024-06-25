/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Definition of NetworkTester.
 */

import { Timer } from '../timer/timer.js';

import { Uri } from '../uri/uri.js';
import * as log from '../log/log.js';



/**
 * Creates an instance of NetworkTester which can be used to test
 * for internet connectivity by seeing if an image can be loaded from
 * google.com. It can also be tested with other URLs.
 * @param {Function} callback Callback that is called when the test completes.
 *     The callback takes a single boolean parameter. True indicates the URL
 *     was reachable, false indicates it wasn't.
 * @param {Object=} opt_handler Handler object for the callback.
 * @param {Uri=} opt_uri URI to use for testing.
 * @constructor @struct
 * @final
 */
export function NetworkTester(callback, opt_handler, opt_uri) {
 /**
  * Callback that is called when the test completes.
  * The callback takes a single boolean parameter. True indicates the URL was
  * reachable, false indicates it wasn't.
  * @type {Function}
  * @private
  */
 this.callback_ = callback;

 /**
  * Handler object for the callback.
  * @type {Object|undefined}
  * @private
  */
 this.handler_ = opt_handler;

 if (!opt_uri) {
   // set the default URI to be based on the cleardot image at google.com
   // We need to add a 'rand' to make sure the response is not fulfilled
   // by browser cache. Use protocol-relative URLs to avoid insecure content
   // warnings in IE.
   opt_uri = new Uri('//www.google.com/images/cleardot.gif');
   opt_uri.makeUnique();
 }

 /**
   * Uri to use for test. Defaults to using an image off of google.com
   * @type {Uri}
   * @private
   */
 this.uri_ = opt_uri;
}


/**
 * Default timeout
 * @type {number}
 */
NetworkTester.DEFAULT_TIMEOUT_MS = 10000;


/**
 * Logger object
 * @type {log.Logger}
 * @private
 */
NetworkTester.prototype.logger_ =
    log.getLogger('goog.net.NetworkTester');


/**
 * Timeout for test
 * @type {number}
 * @private
 */
NetworkTester.prototype.timeoutMs_ =
    NetworkTester.DEFAULT_TIMEOUT_MS;


/**
 * Whether we've already started running.
 * @type {boolean}
 * @private
 */
NetworkTester.prototype.running_ = false;


/**
 * Number of retries to attempt
 * @type {number}
 * @private
 */
NetworkTester.prototype.retries_ = 0;


/**
 * Attempt number we're on
 * @type {number}
 * @private
 */
NetworkTester.prototype.attempt_ = 0;


/**
 * Pause between retries in milliseconds.
 * @type {number}
 * @private
 */
NetworkTester.prototype.pauseBetweenRetriesMs_ = 0;


/**
 * Timer for timeouts.
 * @type {?number}
 * @private
 */
NetworkTester.prototype.timeoutTimer_ = null;


/**
 * Timer for pauses between retries.
 * @type {?number}
 * @private
 */
NetworkTester.prototype.pauseTimer_ = null;


/** @private {?Image} */
NetworkTester.prototype.image_;


/**
 * Returns the timeout in milliseconds.
 * @return {number} Timeout in milliseconds.
 */
NetworkTester.prototype.getTimeout = function() {
 return this.timeoutMs_;
};


/**
 * Sets the timeout in milliseconds.
 * @param {number} timeoutMs Timeout in milliseconds.
 */
NetworkTester.prototype.setTimeout = function(timeoutMs) {
 this.timeoutMs_ = timeoutMs;
};


/**
 * Returns the numer of retries to attempt.
 * @return {number} Number of retries to attempt.
 */
NetworkTester.prototype.getNumRetries = function() {
 return this.retries_;
};


/**
 * Sets the timeout in milliseconds.
 * @param {number} retries Number of retries to attempt.
 */
NetworkTester.prototype.setNumRetries = function(retries) {
 this.retries_ = retries;
};


/**
 * Returns the pause between retries in milliseconds.
 * @return {number} Pause between retries in milliseconds.
 */
NetworkTester.prototype.getPauseBetweenRetries = function() {
 return this.pauseBetweenRetriesMs_;
};


/**
 * Sets the pause between retries in milliseconds.
 * @param {number} pauseMs Pause between retries in milliseconds.
 */
NetworkTester.prototype.setPauseBetweenRetries = function(pauseMs) {
 this.pauseBetweenRetriesMs_ = pauseMs;
};


/**
 * Returns the uri to use for the test.
 * @return {Uri} The uri for the test.
 */
NetworkTester.prototype.getUri = function() {
 return this.uri_;
};


/**
 * Returns the current attempt count.
 * @return {number} The attempt count.
 */
NetworkTester.prototype.getAttemptCount = function() {
 return this.attempt_;
};


/**
 * Sets the uri to use for the test.
 * @param {Uri} uri The uri for the test.
 */
NetworkTester.prototype.setUri = function(uri) {
 this.uri_ = uri;
};


/**
 * Returns whether the tester is currently running.
 * @return {boolean} True if it's running, false if it's not running.
 */
NetworkTester.prototype.isRunning = function() {
 return this.running_;
};


/**
 * Starts the process of testing the network.
 */
NetworkTester.prototype.start = function() {
 if (this.running_) {
   throw new Error('NetworkTester.start called when already running');
 }
 this.running_ = true;

 log.info(this.logger_, 'Starting');
 this.attempt_ = 0;
 this.startNextAttempt_();
};


/**
 * Stops the testing of the network. This is a noop if not running.
 */
NetworkTester.prototype.stop = function() {
 this.cleanupCallbacks_();
 this.running_ = false;
};


/**
 * Starts the next attempt to load an image.
 * @private
 */
NetworkTester.prototype.startNextAttempt_ = function() {
 this.attempt_++;

 if (NetworkTester.getNavigatorOffline_()) {
   log.info(this.logger_, 'Browser is set to work offline.');
   // Call in a timeout to make async like the rest.
   Timer.callOnce(goog.bind(this.onResult, this, false), 0);
 } else {
   log.info(
       this.logger_,
       'Loading image (attempt ' + this.attempt_ + ') at ' + this.uri_);
   this.image_ = new Image();
   this.image_.onload = goog.bind(this.onImageLoad_, this);
   this.image_.onerror = goog.bind(this.onImageError_, this);
   this.image_.onabort = goog.bind(this.onImageAbort_, this);

   this.timeoutTimer_ =
       Timer.callOnce(this.onImageTimeout_, this.timeoutMs_, this);
   this.image_.src = String(this.uri_);
 }
};


/**
 * @return {boolean} Whether navigator.onLine returns false.
 * @private
 */
NetworkTester.getNavigatorOffline_ = function() {
 return navigator !== null && 'onLine' in navigator && !navigator.onLine;
};


/**
 * Callback for the image successfully loading.
 * @private
 */
NetworkTester.prototype.onImageLoad_ = function() {
 log.info(this.logger_, 'Image loaded');
 this.onResult(true);
};


/**
 * Callback for the image failing to load.
 * @private
 */
NetworkTester.prototype.onImageError_ = function() {
 log.info(this.logger_, 'Image load error');
 this.onResult(false);
};


/**
 * Callback for the image load being aborted.
 * @private
 */
NetworkTester.prototype.onImageAbort_ = function() {
 log.info(this.logger_, 'Image load aborted');
 this.onResult(false);
};


/**
 * Callback for the image load timing out.
 * @private
 */
NetworkTester.prototype.onImageTimeout_ = function() {
 log.info(this.logger_, 'Image load timed out');
 this.onResult(false);
};


/**
 * Handles a successful or failed result.
 * @param {boolean} succeeded Whether the image load succeeded.
 */
NetworkTester.prototype.onResult = function(succeeded) {
 this.cleanupCallbacks_();

 if (succeeded) {
   this.running_ = false;
   this.callback_.call(this.handler_, true);
 } else {
   if (this.attempt_ <= this.retries_) {
     if (this.pauseBetweenRetriesMs_) {
       this.pauseTimer_ = Timer.callOnce(
           this.onPauseFinished_, this.pauseBetweenRetriesMs_, this);
     } else {
       this.startNextAttempt_();
     }
   } else {
     this.running_ = false;
     this.callback_.call(this.handler_, false);
   }
 }
};


/**
 * Callback for the pause between retry timer.
 * @private
 */
NetworkTester.prototype.onPauseFinished_ = function() {
 this.pauseTimer_ = null;
 this.startNextAttempt_();
};


/**
 * Cleans up the handlers and timer associated with the image.
 * @private
 */
NetworkTester.prototype.cleanupCallbacks_ = function() {
 // clear handlers to avoid memory leaks
 // NOTE(user): Nullified individually to avoid compiler warnings
 // (BUG 658126)
 if (this.image_) {
   this.image_.onload = null;
   this.image_.onerror = null;
   this.image_.onabort = null;
   this.image_ = null;
 }
 if (this.timeoutTimer_) {
   Timer.clear(this.timeoutTimer_);
   this.timeoutTimer_ = null;
 }
 if (this.pauseTimer_) {
   Timer.clear(this.pauseTimer_);
   this.pauseTimer_ = null;
 }
};
