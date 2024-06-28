/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Defines the base class for a module. This is used to allow the
 * code to be modularized, giving the benefits of lazy loading and loading on
 * demand.
 */

goog.declareModuleId('goog.module.basemodule');

import { Disposable } from '../disposable/disposable.js';

import { module } from './module.js';



/**
 * A basic module object that represents a module of JavaScript code that can
 * be dynamically loaded.
 *
 * @constructor
 * @extends {Disposable}
 */
export function BaseModule() {
 Disposable.call(this);
}
goog.inherits(BaseModule, Disposable);


/**
 * Performs any load-time initialization that the module requires.
 * @param {Object} context The module context.
 */
BaseModule.prototype.initialize = function(context) {};
