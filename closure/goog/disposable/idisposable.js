/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Definition of the disposable interface.  A disposable object
 * has a dispose method to to clean up references and resources.
 */


IDisposable = function() {};


/**
 * Disposes of the object and its resources.
 * @return {void} Nothing.
 */
IDisposable.prototype.dispose = goog.abstractMethod;


/**
 * @return {boolean} Whether the object has been disposed of.
 */
IDisposable.prototype.isDisposed = goog.abstractMethod;
export var IDisposable;
