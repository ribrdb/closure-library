/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Definition the RelativeTimeProvider class.
 */

RelativeTimeProvider = function() {
 /**
  * The start time.
  * @type {number}
  * @private
  */
 this.relativeTimeStart_ = goog.now();
};


/**
 * Default instance.
 * @type {?RelativeTimeProvider}
 * @private
 */
RelativeTimeProvider.defaultInstance_ = null;


/**
 * Sets the start time to the specified time.
 * @param {number} timeStamp The start time.
 */
RelativeTimeProvider.prototype.set = function(timeStamp) {
 this.relativeTimeStart_ = timeStamp;
};


/**
 * Resets the start time to now.
 */
RelativeTimeProvider.prototype.reset = function() {
 this.set(goog.now());
};


/**
 * @return {number} The start time.
 */
RelativeTimeProvider.prototype.get = function() {
 return this.relativeTimeStart_;
};


/**
 * @return {!RelativeTimeProvider} The default instance.
 */
RelativeTimeProvider.getDefaultInstance = function() {
 if (!RelativeTimeProvider.defaultInstance_) {
   RelativeTimeProvider.defaultInstance_ =
       new RelativeTimeProvider();
 }
 return RelativeTimeProvider.defaultInstance_;
};
export var RelativeTimeProvider;
