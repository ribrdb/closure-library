/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview An XhrIo pool that uses a single mock XHR object for testing.
 */

// TODO(user): We're trying to migrate all ES5 subclasses of Closure
// Library to ES6. In ES6 this cannot be referenced before super is called. This
// file has at least one this before a super call (in ES5) and cannot be
// automatically upgraded to ES6 as a result. Please fix this if you have a
// chance. Note: This can sometimes be caused by not calling the super
// constructor at all. You can run the conversion tool yourself to see what it
// does on this file: blaze run //javascript/refactoring/es6_classes:convert.

goog.setTestOnly('goog.testing.net.XhrIoPool');

import { XhrIoPool as netXhrIoPool } from '../../net/xhriopool.js';
import { XhrIo } from './xhrio.js';
const { XhrIo: netXhrIo } = goog.requireType('goog.net.xhrio');



/**
 * A pool containing a single mock XhrIo object.
 *
 * @param {XhrIo=} opt_xhr The mock XhrIo object.
 * @constructor
 * @extends {netXhrIoPool}
 * @final
 */
export function XhrIoPool(opt_xhr) {
 /**
   * The mock XhrIo object.
   * @type {!XhrIo}
   * @private
   */
 this.xhr_ = opt_xhr || new XhrIo();

 // Run this after setting xhr_ because xhr_ is used to initialize the pool.
 XhrIoPool.base(this, 'constructor', undefined, 1, 1);
}
goog.inherits(XhrIoPool, netXhrIoPool);


/**
 * @override
 * @suppress {invalidCasts}
 */
XhrIoPool.prototype.createObject = function() {
 return (/** @type {!netXhrIo} */ (this.xhr_));
};


/**
 * Override adjustForMinMax to not call handleRequests because that causes
 * problems.  See b/31041087.
 *
 * @override
 */
XhrIoPool.prototype.adjustForMinMax = function() {};


/**
 * Get the mock XhrIo used by this pool.
 *
 * @return {!XhrIo} The mock XhrIo.
 */
XhrIoPool.prototype.getXhr = function() {
 return this.xhr_;
};
