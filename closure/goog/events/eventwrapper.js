/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Definition of the EventWrapper interface.
 */

goog.declareModuleId('goog.events.eventwrapper');

const {EventHandler} = goog.requireType('goog.events.eventhandler');
const {ListenableType} = goog.requireType('goog.events.events');



/**
 * Interface for event wrappers.
 * @interface
 */
export function EventWrapper() {}


/**
 * Adds an event listener using the wrapper on a DOM Node or an object that has
 * implemented {@link EventTarget}. A listener can only be added
 * once to an object.
 *
 * @param {ListenableType} src The node to listen to events on.
 * @param {function(?):?|{handleEvent:function(?):?}|null} listener Callback
 *     method, or an object with a handleEvent function.
 * @param {boolean=} opt_capt Whether to fire in capture phase (defaults to
 *     false).
 * @param {Object=} opt_scope Element in whose scope to call the listener.
 * @param {EventHandler=} opt_eventHandler Event handler to add
 *     listener to.
 */
EventWrapper.prototype.listen = function(
    src, listener, opt_capt, opt_scope, opt_eventHandler) {};


/**
 * Removes an event listener added using EventWrapper.listen.
 *
 * @param {ListenableType} src The node to remove listener from.
 * @param {function(?):?|{handleEvent:function(?):?}|null} listener Callback
 *     method, or an object with a handleEvent function.
 * @param {boolean=} opt_capt Whether to fire in capture phase (defaults to
 *     false).
 * @param {Object=} opt_scope Element in whose scope to call the listener.
 * @param {EventHandler=} opt_eventHandler Event handler to remove
 *     listener from.
 */
EventWrapper.prototype.unlisten = function(
    src, listener, opt_capt, opt_scope, opt_eventHandler) {};
