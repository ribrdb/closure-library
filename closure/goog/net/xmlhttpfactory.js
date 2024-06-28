/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Interface for a factory for creating XMLHttpRequest objects
 * and metadata about them.
 */

goog.declareModuleId('goog.net.xmlhttpfactory');

import { XhrLike } from './xhrlike.js';



/**
 * Abstract base class for an XmlHttpRequest factory.
 * @constructor
 */
export function XmlHttpFactory() {}


/**
 * Cache of options - we only actually call internalGetOptions once.
 * @type {?Object}
 * @private
 */
XmlHttpFactory.prototype.cachedOptions_ = null;


/**
 * @return {!XhrLike.OrNative} A new XhrLike instance.
 */
XmlHttpFactory.prototype.createInstance = goog.abstractMethod;


/**
 * @return {Object} Options describing how xhr objects obtained from this
 *     factory should be used.
 */
XmlHttpFactory.prototype.getOptions = function() {
 return this.cachedOptions_ ||
     (this.cachedOptions_ = this.internalGetOptions());
};


/**
 * Override this method in subclasses to preserve the caching offered by
 * getOptions().
 * @return {Object} Options describing how xhr objects obtained from this
 *     factory should be used.
 * @protected
 */
XmlHttpFactory.prototype.internalGetOptions = goog.abstractMethod;
