/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Defines the ModuleInfo class.
 */

goog.declareModuleId('goog.module.moduleinfo');

import { Disposable } from '../disposable/disposable.js';
import { throwException } from '../async/throwexception.js';
import { dispose } from '../disposable/dispose.js';
import * as functions from '../functions/functions.js';
import { TrustedResourceUrl } from '../html/trustedresourceurl.js';

import { module as googModule } from './module.js';

import { BaseModule } from './basemodule.js';
import { ModuleLoadCallback } from './moduleloadcallback.js';
const { ModuleLoadFailure } = goog.requireType('goog.module.ModuleLoadFailure');



/**
 * A ModuleInfo object is used by the ModuleManager to hold information about a
 * module of js code that may or may not yet be loaded into the environment.
 *
 * @param {!Array<string>} deps Ids of the modules that must be loaded before
 *     this one. The ids must be in dependency order (i.e. if the ith module
 *     depends on the jth module, then i > j).
 * @param {string} id The module's ID.
 * @constructor
 * @extends {Disposable}
 * @final
 */
export function ModuleInfo(deps, id) {
 Disposable.call(this);

 /**
  * A list of the ids of the modules that must be loaded before this module.
  * @type {!Array<string>}
  * @private @const
  */
 this.deps_ = deps;

 /**
  * The module's ID.
  * @type {string}
  * @private
  */
 this.id_ = id;

 /**
   * Callbacks to execute once this module is loaded.
   * @type {Array<ModuleLoadCallback>}
   * @private
   */
 this.onloadCallbacks_ = [];

 /**
   * Callbacks to execute if the module load errors.
   * @type {Array<ModuleLoadCallback>}
   * @private
   */
 this.onErrorCallbacks_ = [];

 /**
   * Early callbacks to execute once this module is loaded. Called after
   * module initialization but before regular onload callbacks.
   * @type {Array<ModuleLoadCallback>}
   * @private
   */
 this.earlyOnloadCallbacks_ = [];
}
goog.inherits(ModuleInfo, Disposable);


/**
 * The uris that can be used to retrieve this module's code.
 * @type {?Array<!TrustedResourceUrl>}
 * @private
 */
ModuleInfo.prototype.uris_ = null;


/**
 * The constructor to use to instantiate the module object after the module
 * code is loaded. This must be either BaseModule or a subclass of
 * it.
 * @type {Function}
 * @private
 */
ModuleInfo.prototype.moduleConstructor_ = BaseModule;


/**
 * The module object. This will be null until the module is loaded.
 * @type {BaseModule?}
 * @private
 */
ModuleInfo.prototype.module_ = null;


/**
 * Gets the dependencies of this module.
 * @return {!Array<string>} The ids of the modules that this module depends on.
 */
ModuleInfo.prototype.getDependencies = function() {
 return this.deps_;
};


/**
 * Gets the ID of this module.
 * @return {string} The ID.
 */
ModuleInfo.prototype.getId = function() {
 return this.id_;
};


/**
 * Sets the uris of this module.
 * @param {!Array<!TrustedResourceUrl>} uris Uris for this module's
 *     code.
 */
ModuleInfo.prototype.setTrustedUris = function(uris) {
 this.uris_ = uris;
};


/**
 * Gets the uris of this module.
 * @return {!Array<!TrustedResourceUrl>} Uris for this module's code.
 */
ModuleInfo.prototype.getUris = function() {
 if (!this.uris_) {
   this.uris_ = [];
 }
 return this.uris_;
};


/**
 * Sets the constructor to use to instantiate the module object after the
 * module code is loaded.
 * @param {Function} constructor The constructor of a BaseModule
 *     subclass.
 */
ModuleInfo.prototype.setModuleConstructor = function(constructor) {
 if (this.moduleConstructor_ === BaseModule) {
   this.moduleConstructor_ = constructor;
 } else {
   throw new Error('Cannot set module constructor more than once.');
 }
};


/**
 * Registers a function that should be called after the module is loaded. These
 * early callbacks are called after {@link Module#initialize} is called but
 * before the other callbacks are called.
 * @param {Function} fn A callback function that takes a single argument which
 *    is the module context.
 * @param {Object=} opt_handler Optional handler under whose scope to execute
 *     the callback.
 * @return {!ModuleLoadCallback} Reference to the callback
 *     object.
 */
ModuleInfo.prototype.registerEarlyCallback = function(
    fn, opt_handler) {
 return this.registerCallback_(this.earlyOnloadCallbacks_, fn, opt_handler);
};


/**
 * Registers a function that should be called after the module is loaded.
 * @param {Function} fn A callback function that takes a single argument which
 *    is the module context.
 * @param {Object=} opt_handler Optional handler under whose scope to execute
 *     the callback.
 * @return {!ModuleLoadCallback} Reference to the callback
 *     object.
 */
ModuleInfo.prototype.registerCallback = function(fn, opt_handler) {
 return this.registerCallback_(this.onloadCallbacks_, fn, opt_handler);
};


/**
 * Registers a function that should be called if the module load fails.
 * @param {Function} fn A callback function that takes a single argument which
 *    is the failure type.
 * @param {Object=} opt_handler Optional handler under whose scope to execute
 *     the callback.
 * @return {!ModuleLoadCallback} Reference to the callback
 *     object.
 */
ModuleInfo.prototype.registerErrback = function(fn, opt_handler) {
 return this.registerCallback_(this.onErrorCallbacks_, fn, opt_handler);
};


/**
 * Registers a function that should be called after the module is loaded.
 * @param {Array<ModuleLoadCallback>} callbacks The array to
 *     add the callback to.
 * @param {Function} fn A callback function that takes a single argument which
 *     is the module context.
 * @param {Object=} opt_handler Optional handler under whose scope to execute
 *     the callback.
 * @return {!ModuleLoadCallback} Reference to the callback
 *     object.
 * @private
 */
ModuleInfo.prototype.registerCallback_ = function(
    callbacks, fn, opt_handler) {
 var callback = new ModuleLoadCallback(fn, opt_handler);
 callbacks.push(callback);
 return callback;
};


/**
 * Determines whether the module has been loaded.
 * @return {boolean} Whether the module has been loaded.
 */
ModuleInfo.prototype.isLoaded = function() {
 return !!this.module_;
};


/**
 * Marks the current module as loaded. This is useful for subtractive module
 * loading, where occasionally we need to fallback to normal module loading,
 * and re-fetch the module graph. In this case, we need a way to tell the module
 * manager to mark all modules that are already loaded.
 */
ModuleInfo.prototype.setLoaded = function() {
 this.module_ = new BaseModule();
};


/**
 * Gets the module.
 * @return {BaseModule?} The module if it has been loaded.
 *     Otherwise, null.
 */
ModuleInfo.prototype.getModule = function() {
 return this.module_;
};


/**
 * Sets this module as loaded.
 * @param {function() : Object} contextProvider A function that provides the
 *     module context.
 * @return {boolean} Whether any errors occurred while executing the onload
 *     callbacks.
 */
ModuleInfo.prototype.onLoad = function(contextProvider) {
 // Instantiate and initialize the module object.
 var module = new this.moduleConstructor_;
 module.initialize(contextProvider());

 // Keep an internal reference to the module.
 this.module_ = module;

 // Fire any early callbacks that were waiting for the module to be loaded.
 var errors =
     !!this.callCallbacks_(this.earlyOnloadCallbacks_, contextProvider());

 // Fire any callbacks that were waiting for the module to be loaded.
 errors =
     errors || !!this.callCallbacks_(this.onloadCallbacks_, contextProvider());

 if (!errors) {
   // Clear the errbacks.
   this.onErrorCallbacks_.length = 0;
 }

 return errors;
};


/**
 * Calls the error callbacks for the module.
 * @param {!ModuleLoadFailure} cause What caused the
 *     error.
 */
ModuleInfo.prototype.onError = function(cause) {
 var result = this.callCallbacks_(this.onErrorCallbacks_, cause);
 if (result) {
   // Throw an exception asynchronously. Do not let the exception leak
   // up to the caller, or it will blow up the module loading framework.

   // Call setTimeout on global object so that it can be called from within
   // webworkers.
   goog.global.setTimeout(
       functions.error('Module errback failures: ' + result), 0);
 }
 this.earlyOnloadCallbacks_.length = 0;
 this.onloadCallbacks_.length = 0;
};


/**
 * Helper to call the callbacks after module load.
 * @param {Array<ModuleLoadCallback>} callbacks The callbacks
 *     to call and then clear.
 * @param {*} context The module context.
 * @return {Array<*>} Any errors encountered while calling the callbacks,
 *     or null if there were no errors.
 * @private
 */
ModuleInfo.prototype.callCallbacks_ = function(callbacks, context) {
 // NOTE(nicksantos):
 // In practice, there are two error-handling scenarios:
 // 1) The callback does some mandatory initialization of the module.
 // 2) The callback is for completion of some optional UI event.
 // There's no good way to handle both scenarios.
 //
 // Our strategy here is to protect module manager from exceptions, so that
 // the failure of one module doesn't affect the loading of other modules.
 // Errors are thrown outside of the current stack frame, so they still
 // get reported but don't interrupt execution.

 // Call each callback in the order they were registered
 var errors = [];
 for (var i = 0; i < callbacks.length; i++) {
   try {
     callbacks[i].execute(context);
   } catch (e) {
     throwException(e);
     errors.push(e);
   }
 }

 // Clear the list of callbacks.
 callbacks.length = 0;
 return errors.length ? errors : null;
};


/** @override */
ModuleInfo.prototype.disposeInternal = function() {
 ModuleInfo.superClass_.disposeInternal.call(this);
 dispose(this.module_);
};
