/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Class to create objects which want to handle multiple events
 * and have their listeners easily cleaned up via a dispose method.
 *
 * Example:
 * <pre>
 * function Something() {
 *   Something.base(this);
 *
 *   ... set up object ...
 *
 *   // Add event listeners
 *   this.listen(this.starEl, events.EventType.CLICK, this.handleStar);
 *   this.listen(this.headerEl, events.EventType.CLICK, this.expand);
 *   this.listen(this.collapseEl, events.EventType.CLICK, this.collapse);
 *   this.listen(this.infoEl, events.EventType.MOUSEOVER, this.showHover);
 *   this.listen(this.infoEl, events.EventType.MOUSEOUT, this.hideHover);
 * }
 * goog.inherits(Something, EventHandler);
 *
 * Something.prototype.disposeInternal = function() {
 *   Something.base(this, 'disposeInternal');
 *   goog.dom.removeNode(this.container);
 * };
 *
 *
 * // Then elsewhere:
 *
 * var activeSomething = null;
 * function openSomething() {
 *   activeSomething = new Something();
 * }
 *
 * function closeSomething() {
 *   if (activeSomething) {
 *     activeSomething.dispose();  // Remove event listeners
 *     activeSomething = null;
 *   }
 * }
 * </pre>
 */

goog.declareModuleId('goog.events.eventhandler');

import { Disposable } from '../disposable/disposable.js';
import * as events from './events.js';
import object from '../object/object.js';
const { Event } = goog.requireType('goog.events.event');
const { EventId } = goog.requireType('goog.events.eventid');
const eventtarget = goog.requireType('goog.events.eventtarget');
const { EventWrapper } = goog.requireType('goog.events.eventwrapper');



/**
 * Super class for objects that want to easily manage a number of event
 * listeners.  It allows a short cut to listen and also provides a quick way
 * to remove all events listeners belonging to this object.
 * @param {SCOPE=} opt_scope Object in whose scope to call the listeners.
 * @constructor
 * @extends {Disposable}
 * @template SCOPE
 */
export function EventHandler(opt_scope) {
  Disposable.call(this);
  // TODO(mknichel): Rename this to this.scope_ and fix the classes in google3
  // that access this private variable. :(
  this.handler_ = opt_scope;

  /**
     * Keys for events that are being listened to.
     * @type {!Object<!events.Key>}
     * @private
     */
  this.keys_ = {};
}
goog.inherits(EventHandler, Disposable);


/**
 * Utility array used to unify the cases of listening for an array of types
 * and listening for a single event, without using recursion or allocating
 * an array each time.
 * @type {!Array<string>}
 * @const
 * @private
 */
EventHandler.typeArray_ = [];


/**
 * Listen to an event on a Listenable.  If the function is omitted then the
 * EventHandler's handleEvent method will be used.
 * @param {events.ListenableType} src Event source.
 * @param {string|Array<string>|
 *     !EventId<EVENTOBJ>|!Array<!EventId<EVENTOBJ>>}
 *     type Event type to listen for or array of event types.
 * @param {function(this:SCOPE, EVENTOBJ):?|{handleEvent:function(?):?}|null=}
 *     opt_fn Optional callback function to be used as the listener or an object
 *     with handleEvent function.
 * @param {(boolean|!AddEventListenerOptions)=} opt_options
 * @return {THIS} This object, allowing for chaining of calls.
 * @this {THIS}
 * @template EVENTOBJ, THIS
 */
EventHandler.prototype.listen = function(
    src, type, opt_fn, opt_options) {
  var self = /** @type {!EventHandler} */ (this);
  return self.listen_(src, type, opt_fn, opt_options);
};


/**
 * Listen to an event on a Listenable.  If the function is omitted then the
 * EventHandler's handleEvent method will be used.
 * @param {events.ListenableType} src Event source.
 * @param {string|Array<string>|
 *     !EventId<EVENTOBJ>|!Array<!EventId<EVENTOBJ>>}
 *     type Event type to listen for or array of event types.
 * @param {function(this:T, EVENTOBJ):?|{handleEvent:function(this:T, ?):?}|
 *     null|undefined} fn Optional callback function to be used as the
 *     listener or an object with handleEvent function.
 * @param {boolean|!AddEventListenerOptions|undefined} options
 * @param {T} scope Object in whose scope to call the listener.
 * @return {THIS} This object, allowing for chaining of calls.
 * @this {THIS}
 * @template T, EVENTOBJ, THIS
 */
EventHandler.prototype.listenWithScope = function(
    src, type, fn, options, scope) {
  var self = /** @type {!EventHandler} */ (this);
  // TODO(mknichel): Deprecate this function.
  return self.listen_(src, type, fn, options, scope);
};


/**
 * Listen to an event on a Listenable.  If the function is omitted then the
 * EventHandler's handleEvent method will be used.
 * @param {events.ListenableType} src Event source.
 * @param {string|Array<string>|
 *     !EventId<EVENTOBJ>|!Array<!EventId<EVENTOBJ>>}
 *     type Event type to listen for or array of event types.
 * @param {function(EVENTOBJ):?|{handleEvent:function(?):?}|null=} opt_fn
 *     Optional callback function to be used as the listener or an object with
 *     handleEvent function.
 * @param {(boolean|!AddEventListenerOptions)=} opt_options
 * @param {Object=} opt_scope Object in whose scope to call the listener.
 * @return {THIS} This object, allowing for chaining of calls.
 * @this {THIS}
 * @template EVENTOBJ, THIS
 * @private
 */
EventHandler.prototype.listen_ = function(
    src, type, opt_fn, opt_options, opt_scope) {
  var self = /** @type {!EventHandler} */ (this);
  if (!Array.isArray(type)) {
    if (type) {
      EventHandler.typeArray_[0] = type.toString();
    }
    type = EventHandler.typeArray_;
  }
  for (var i = 0; i < type.length; i++) {
    var listenerObj = events.listen(
        src, type[i], opt_fn || self.handleEvent, opt_options || false,
        opt_scope || self.handler_ || self);

    if (!listenerObj) {
      // When goog.events.listen run on OFF_AND_FAIL or OFF_AND_SILENT
      // (goog.events.CaptureSimulationMode) in IE8-, it will return null
      // value.
      return self;
    }

    /** @suppress {strictMissingProperties} Added to tighten compiler checks */
    var key = listenerObj.key;
    self.keys_[key] = listenerObj;
  }

  return self;
};


/**
 * Listen to an event on a Listenable.  If the function is omitted, then the
 * EventHandler's handleEvent method will be used. After the event has fired the
 * event listener is removed from the target. If an array of event types is
 * provided, each event type will be listened to once.
 * @param {events.ListenableType} src Event source.
 * @param {string|Array<string>|
 *     !EventId<EVENTOBJ>|!Array<!EventId<EVENTOBJ>>}
 *     type Event type to listen for or array of event types.
 * @param {function(this:SCOPE, EVENTOBJ):?|{handleEvent:function(?):?}|null=}
 * opt_fn
 *    Optional callback function to be used as the listener or an object with
 *    handleEvent function.
 * @param {(boolean|!AddEventListenerOptions)=} opt_options
 * @return {THIS} This object, allowing for chaining of calls.
 * @this {THIS}
 * @template EVENTOBJ, THIS
 */
EventHandler.prototype.listenOnce = function(
    src, type, opt_fn, opt_options) {
  var self = /** @type {!EventHandler} */ (this);
  return self.listenOnce_(src, type, opt_fn, opt_options);
};


/**
 * Listen to an event on a Listenable.  If the function is omitted, then the
 * EventHandler's handleEvent method will be used. After the event has fired the
 * event listener is removed from the target. If an array of event types is
 * provided, each event type will be listened to once.
 * @param {events.ListenableType} src Event source.
 * @param {string|Array<string>|
 *     !EventId<EVENTOBJ>|!Array<!EventId<EVENTOBJ>>}
 *     type Event type to listen for or array of event types.
 * @param {function(this:T, EVENTOBJ):?|{handleEvent:function(this:T, ?):?}|
 *     null|undefined} fn Optional callback function to be used as the
 *     listener or an object with handleEvent function.
 * @param {boolean|undefined} capture Optional whether to use capture phase.
 * @param {T} scope Object in whose scope to call the listener.
 * @return {THIS} This object, allowing for chaining of calls.
 * @this {THIS}
 * @template T, EVENTOBJ, THIS
 */
EventHandler.prototype.listenOnceWithScope = function(
    src, type, fn, capture, scope) {
  var self = /** @type {!EventHandler} */ (this);
  // TODO(mknichel): Deprecate this function.
  return self.listenOnce_(src, type, fn, capture, scope);
};


/**
 * Listen to an event on a Listenable.  If the function is omitted, then the
 * EventHandler's handleEvent method will be used. After the event has fired
 * the event listener is removed from the target. If an array of event types is
 * provided, each event type will be listened to once.
 * @param {events.ListenableType} src Event source.
 * @param {string|Array<string>|
 *     !EventId<EVENTOBJ>|!Array<!EventId<EVENTOBJ>>}
 *     type Event type to listen for or array of event types.
 * @param {function(EVENTOBJ):?|{handleEvent:function(?):?}|null=} opt_fn
 *    Optional callback function to be used as the listener or an object with
 *    handleEvent function.
 * @param {(boolean|!AddEventListenerOptions)=} opt_options
 * @param {Object=} opt_scope Object in whose scope to call the listener.
 * @return {THIS} This object, allowing for chaining of calls.
 * @this {THIS}
 * @template EVENTOBJ, THIS
 * @private
 */
EventHandler.prototype.listenOnce_ = function(
    src, type, opt_fn, opt_options, opt_scope) {
  var self = /** @type {!EventHandler} */ (this);
  if (Array.isArray(type)) {
    for (var i = 0; i < type.length; i++) {
      self.listenOnce_(src, type[i], opt_fn, opt_options, opt_scope);
    }
  } else {
    var listenerObj = events.listenOnce(
        src, type, opt_fn || self.handleEvent, opt_options,
        opt_scope || self.handler_ || self);
    if (!listenerObj) {
      // When goog.events.listen run on OFF_AND_FAIL or OFF_AND_SILENT
      // (goog.events.CaptureSimulationMode) in IE8-, it will return null
      // value.
      return self;
    }

    /** @suppress {strictMissingProperties} Added to tighten compiler checks */
    var key = listenerObj.key;
    self.keys_[key] = listenerObj;
  }

  return self;
};


/**
 * Adds an event listener with a specific event wrapper on a DOM Node or an
 * object that has implemented {@link eventtarget.EventTarget}. A listener can
 * only be added once to an object.
 *
 * @param {EventTarget|eventtarget.EventTarget} src The node to listen to
 *     events on.
 * @param {EventWrapper} wrapper Event wrapper to use.
 * @param {function(this:SCOPE, ?):?|{handleEvent:function(?):?}|null} listener
 *     Callback method, or an object with a handleEvent function.
 * @param {boolean=} opt_capt Whether to fire in capture phase (defaults to
 *     false).
 * @return {THIS} This object, allowing for chaining of calls.
 * @this {THIS}
 * @template THIS
 */
EventHandler.prototype.listenWithWrapper = function(
    src, wrapper, listener, opt_capt) {
  var self = /** @type {!EventHandler} */ (this);
  // TODO(mknichel): Remove the opt_scope from this function and then
  // templatize it.
  return self.listenWithWrapper_(src, wrapper, listener, opt_capt);
};


/**
 * Adds an event listener with a specific event wrapper on a DOM Node or an
 * object that has implemented {@link eventtarget.EventTarget}. A listener can
 * only be added once to an object.
 *
 * @param {EventTarget|eventtarget.EventTarget} src The node to listen to
 *     events on.
 * @param {EventWrapper} wrapper Event wrapper to use.
 * @param {function(this:T, ?):?|{handleEvent:function(this:T, ?):?}|null}
 *     listener Optional callback function to be used as the
 *     listener or an object with handleEvent function.
 * @param {boolean|undefined} capture Optional whether to use capture phase.
 * @param {T} scope Object in whose scope to call the listener.
 * @return {THIS} This object, allowing for chaining of calls.
 * @this {THIS}
 * @template T, THIS
 */
EventHandler.prototype.listenWithWrapperAndScope = function(
    src, wrapper, listener, capture, scope) {
  var self = /** @type {!EventHandler} */ (this);
  // TODO(mknichel): Deprecate this function.
  return self.listenWithWrapper_(src, wrapper, listener, capture, scope);
};


/**
 * Adds an event listener with a specific event wrapper on a DOM Node or an
 * object that has implemented {@link eventtarget.EventTarget}. A listener can
 * only be added once to an object.
 *
 * @param {EventTarget|eventtarget.EventTarget} src The node to listen to
 *     events on.
 * @param {EventWrapper} wrapper Event wrapper to use.
 * @param {function(?):?|{handleEvent:function(?):?}|null} listener Callback
 *     method, or an object with a handleEvent function.
 * @param {boolean=} opt_capt Whether to fire in capture phase (defaults to
 *     false).
 * @param {Object=} opt_scope Element in whose scope to call the listener.
 * @return {THIS} This object, allowing for chaining of calls.
 * @this {THIS}
 * @template THIS
 * @private
 */
EventHandler.prototype.listenWithWrapper_ = function(
    src, wrapper, listener, opt_capt, opt_scope) {
  var self = /** @type {!EventHandler} */ (this);
  wrapper.listen(
      src, listener, opt_capt, opt_scope || self.handler_ || self, self);
  return self;
};


/**
 * @return {number} Number of listeners registered by this handler.
 */
EventHandler.prototype.getListenerCount = function() {
  var count = 0;
  for (var key in this.keys_) {
    if (Object.prototype.hasOwnProperty.call(this.keys_, key)) {
      count++;
    }
  }
  return count;
};


/**
 * Unlistens on an event.
 * @param {events.ListenableType} src Event source.
 * @param {string|Array<string>|
 *     !EventId<EVENTOBJ>|!Array<!EventId<EVENTOBJ>>}
 *     type Event type or array of event types to unlisten to.
 * @param {function(this:?, EVENTOBJ):?|{handleEvent:function(?):?}|null=}
 *     opt_fn Optional callback function to be used as the listener or an object
 *     with handleEvent function.
 * @param {(boolean|!EventListenerOptions)=} opt_options
 * @param {Object=} opt_scope Object in whose scope to call the listener.
 * @return {THIS} This object, allowing for chaining of calls.
 * @this {THIS}
 * @template EVENTOBJ, THIS
 */
EventHandler.prototype.unlisten = function(
    src, type, opt_fn, opt_options, opt_scope) {
  var self = /** @type {!EventHandler} */ (this);
  if (Array.isArray(type)) {
    for (var i = 0; i < type.length; i++) {
      self.unlisten(src, type[i], opt_fn, opt_options, opt_scope);
    }
  } else {
    var capture =
        goog.isObject(opt_options) ? !!opt_options.capture : !!opt_options;
    var listener = events.getListener(
        src, type, opt_fn || self.handleEvent, capture,
        opt_scope || self.handler_ || self);

    if (listener) {
      events.unlistenByKey(listener);
      delete self.keys_[listener.key];
    }
  }

  return self;
};


/**
 * Removes an event listener which was added with listenWithWrapper().
 *
 * @param {EventTarget|eventtarget.EventTarget} src The target to stop
 *     listening to events on.
 * @param {EventWrapper} wrapper Event wrapper to use.
 * @param {function(?):?|{handleEvent:function(?):?}|null} listener The
 *     listener function to remove.
 * @param {boolean=} opt_capt In DOM-compliant browsers, this determines
 *     whether the listener is fired during the capture or bubble phase of the
 *     event.
 * @param {Object=} opt_scope Element in whose scope to call the listener.
 * @return {THIS} This object, allowing for chaining of calls.
 * @this {THIS}
 * @template THIS
 */
EventHandler.prototype.unlistenWithWrapper = function(
    src, wrapper, listener, opt_capt, opt_scope) {
  var self = /** @type {!EventHandler} */ (this);
  wrapper.unlisten(
      src, listener, opt_capt, opt_scope || self.handler_ || self, self);
  return self;
};


/**
 * Unlistens to all events.
 */
EventHandler.prototype.removeAll = function() {
  object.forEach(this.keys_, function(listenerObj, key) {
    if (this.keys_.hasOwnProperty(key)) {
      events.unlistenByKey(listenerObj);
    }
  }, this);

  this.keys_ = {};
};


/**
 * Disposes of this EventHandler and removes all listeners that it registered.
 * @override
 * @protected
 */
EventHandler.prototype.disposeInternal = function() {
  EventHandler.superClass_.disposeInternal.call(this);
  this.removeAll();
};


/**
 * Default event handler
 * @param {Event} e Event object.
 */
EventHandler.prototype.handleEvent = function(e) {
  throw new Error('EventHandler.handleEvent not implemented');
};
