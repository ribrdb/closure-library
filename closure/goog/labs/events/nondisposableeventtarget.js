/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview An implementation of {@link Listenable} that does
 * not need to be disposed.
 */

import * as array from '../../array/array.js';

import * as asserts from '../../asserts/asserts.js';
import { Event } from '../../events/event.js';
import { Listenable } from '../../events/listenable.js';
import { ListenerMap } from '../../events/listenermap.js';
import object from '../../object/object.js';



/**
 * An implementation of `Listenable` with full W3C
 * EventTarget-like support (capture/bubble mechanism, stopping event
 * propagation, preventing default actions).
 *
 * You may subclass this class to turn your class into a Listenable.
 *
 * Unlike {@link EventTarget}, this class does not implement
 * {@link goog.disposable.IDisposable}. Instances of this class that have had
 * It is not necessary to call {@link goog.dispose}
 * or {@link #removeAllListeners} in order for an instance of this class
 * to be garbage collected.
 *
 * Unless propagation is stopped, an event dispatched by an
 * EventTarget will bubble to the parent returned by
 * `getParentEventTarget`. To set the parent, call
 * `setParentEventTarget`. Subclasses that don't support
 * changing the parent can override the setter to throw an error.
 *
 * Example usage:
 * <pre>
 *   var source = new NonDisposableEventTarget();
 *   function handleEvent(e) {
 *     alert('Type: ' + e.type + '; Target: ' + e.target);
 *   }
 *   source.listen('foo', handleEvent);
 *   source.dispatchEvent('foo'); // will call handleEvent
 * </pre>
 *
 * TODO(user): Consider a more modern, less viral
 * (not based on inheritance) replacement of goog.Disposable, which will allow
 * EventTarget to not be disposable.
 *
 * @constructor
 * @implements {Listenable}
 * @final
 */
export function NonDisposableEventTarget() {
  /**
     * Maps of event type to an array of listeners.
     * @private {!ListenerMap}
     */
  this.eventTargetListeners_ = new ListenerMap(this);
}
Listenable.addImplementation(
    NonDisposableEventTarget);


/**
 * An artificial cap on the number of ancestors you can have. This is mainly
 * for loop detection.
 * @const {number}
 * @private
 */
NonDisposableEventTarget.MAX_ANCESTORS_ = 1000;


/**
 * Parent event target, used during event bubbling.
 * @private {?Listenable}
 */
NonDisposableEventTarget.prototype.parentEventTarget_ = null;


/** @override */
NonDisposableEventTarget.prototype.getParentEventTarget =
    function() {
      return this.parentEventTarget_;
    };


/**
 * Sets the parent of this event target to use for capture/bubble
 * mechanism.
 * @param {Listenable} parent Parent listenable (null if none).
 */
NonDisposableEventTarget.prototype.setParentEventTarget =
    function(parent) {
      this.parentEventTarget_ = parent;
    };


/** @override */
NonDisposableEventTarget.prototype.dispatchEvent = function(
    e) {
  this.assertInitialized_();
  let ancestor = this.getParentEventTarget();
  let ancestorsTree;

  if (ancestor) {
    ancestorsTree = [];
    let ancestorCount = 1;
    for (; ancestor; ancestor = ancestor.getParentEventTarget()) {
      ancestorsTree.push(ancestor);
      asserts.assert(
          (++ancestorCount <
           NonDisposableEventTarget.MAX_ANCESTORS_),
          'infinite loop');
    }
  }

  return NonDisposableEventTarget.dispatchEventInternal_(
      this, e, ancestorsTree);
};


/** @override */
NonDisposableEventTarget.prototype.listen = function(
    type, listener, opt_useCapture, opt_listenerScope) {
  this.assertInitialized_();
  return this.eventTargetListeners_.add(
      String(type), listener, false /* callOnce */, opt_useCapture,
      opt_listenerScope);
};


/** @override */
NonDisposableEventTarget.prototype.listenOnce = function(
    type, listener, opt_useCapture, opt_listenerScope) {
  return this.eventTargetListeners_.add(
      String(type), listener, true /* callOnce */, opt_useCapture,
      opt_listenerScope);
};


/** @override */
NonDisposableEventTarget.prototype.unlisten = function(
    type, listener, opt_useCapture, opt_listenerScope) {
  return this.eventTargetListeners_.remove(
      String(type), listener, opt_useCapture, opt_listenerScope);
};


/** @override */
NonDisposableEventTarget.prototype.unlistenByKey = function(
    key) {
  return this.eventTargetListeners_.removeByKey(key);
};


/** @override */
NonDisposableEventTarget.prototype.removeAllListeners =
    function(opt_type) {
      return this.eventTargetListeners_.removeAll(opt_type);
    };


/** @override */
NonDisposableEventTarget.prototype.fireListeners = function(
    type, capture, eventObject) {
  // TODO(chrishenry): Original code avoids array creation when there
  // is no listener, so we do the same. If this optimization turns
  // out to be not required, we can replace this with
  // getListeners(type, capture) instead, which is simpler.
  let listenerArray = this.eventTargetListeners_.listeners[String(type)];
  if (!listenerArray) {
    return true;
  }
  listenerArray = array.clone(listenerArray);

  let rv = true;
  for (let i = 0; i < listenerArray.length; ++i) {
    const listener = listenerArray[i];
    // We might not have a listener if the listener was removed.
    if (listener && !listener.removed && listener.capture == capture) {
      const listenerFn = listener.listener;
      const listenerHandler = listener.handler || listener.src;

      if (listener.callOnce) {
        this.unlistenByKey(listener);
      }
      /** @suppress {missingProperties} */
      rv = listenerFn.call(listenerHandler, eventObject) !== false && rv;
    }
  }

  return rv && !eventObject.defaultPrevented;
};


/** @override */
NonDisposableEventTarget.prototype.getListeners = function(
    type, capture) {
  return this.eventTargetListeners_.getListeners(String(type), capture);
};


/** @override */
NonDisposableEventTarget.prototype.getListener = function(
    type, listener, capture, opt_listenerScope) {
  return this.eventTargetListeners_.getListener(
      String(type), listener, capture, opt_listenerScope);
};


/** @override */
NonDisposableEventTarget.prototype.hasListener = function(
    opt_type, opt_capture) {
  const id = (opt_type !== undefined) ? String(opt_type) : undefined;
  return this.eventTargetListeners_.hasListener(id, opt_capture);
};


/**
 * Asserts that the event target instance is initialized properly.
 * @private
 */
NonDisposableEventTarget.prototype.assertInitialized_ =
    function() {
      asserts.assert(
          this.eventTargetListeners_,
          'Event target is not initialized. Did you call the superclass ' +
              '(goog.labs.events.NonDisposableEventTarget) constructor?');
    };


/**
 * Dispatches the given event on the ancestorsTree.
 *
 * TODO(chrishenry): Look for a way to reuse this logic in
 * goog.events, if possible.
 * @param {!Object} target The target to dispatch on.
 * @param {Event|Object|string} e The event object.
 * @param {Array<Listenable>=} opt_ancestorsTree The ancestors
 *     tree of the target, in reverse order from the closest ancestor
 *     to the root event target. May be null if the target has no ancestor.
 * @return {boolean} If anyone called preventDefault on the event object (or
 *     if any of the listeners returns false) this will also return false.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
NonDisposableEventTarget.dispatchEventInternal_ = function(
    target, e, opt_ancestorsTree) {
  const type = e.type || /** @type {string} */ (e);

  // If accepting a string or object, create a custom event object so that
  // preventDefault and stopPropagation work with the event.
  if (typeof e === 'string') {
    e = new Event(e, target);
  } else if (!(e instanceof Event)) {
    const oldEvent = e;
    e = new Event(type, target);
    object.extend(e, oldEvent);
  } else {
    e.target = e.target || target;
  }

  let currentTarget;
  let rv = true;


  // Executes all capture listeners on the ancestors, if any.
  if (opt_ancestorsTree) {
    for (let i = opt_ancestorsTree.length - 1;
         !e.hasPropagationStopped() && i >= 0; i--) {
      currentTarget = e.currentTarget = opt_ancestorsTree[i];
      rv = currentTarget.fireListeners(type, true, e) && rv;
    }
  }

  // Executes capture and bubble listeners on the target.
  if (!e.hasPropagationStopped()) {
    currentTarget = e.currentTarget = target;
    rv = currentTarget.fireListeners(type, true, e) && rv;
    if (!e.hasPropagationStopped()) {
      rv = currentTarget.fireListeners(type, false, e) && rv;
    }
  }

  // Executes all bubble listeners on the ancestors, if any.
  if (opt_ancestorsTree) {
    for (let i = 0; !e.hasPropagationStopped() && i < opt_ancestorsTree.length;
         i++) {
      currentTarget = e.currentTarget = opt_ancestorsTree[i];
      rv = currentTarget.fireListeners(type, false, e) && rv;
    }
  }

  return rv;
};
