/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Action event wrapper implementation.
 */

import * as aria from '../a11y/aria/aria.js';

import { Role } from '../a11y/aria/roles.js';
import * as dom from '../dom/dom.js';
import * as events from './events.js';
import { EventHandler } from './eventhandler.js';
import { EventType } from './eventtype.js';
import { EventWrapper } from './eventwrapper.js';
import { KeyCodes } from './keycodes.js';



/**
 * Event wrapper for action handling. Fires when an element is activated either
 * by clicking it or by focusing it and pressing Enter.
 *
 * @constructor
 * @implements {EventWrapper}
 * @private
 */
export function ActionEventWrapper_() {};

/**
 * @interface
 * @private
 */
ActionEventWrapper_.FunctionExtension_ = function() {};

/** @private {!Object|undefined} */
ActionEventWrapper_.FunctionExtension_.prototype.scope_;

/** @private {function(?):?|{handleEvent:function(?):?}|null} */
ActionEventWrapper_.FunctionExtension_.prototype.listener_;


/**
 * Singleton instance of ActionEventWrapper_.
 * @type {ActionEventWrapper_}
 */
export var actionEventWrapper = new ActionEventWrapper_();


/**
 * Event types used by the wrapper.
 *
 * @type {Array<EventType>}
 * @private
 */
ActionEventWrapper_.EVENT_TYPES_ = [
  EventType.CLICK, EventType.KEYDOWN,
  EventType.KEYUP
];


/**
 * Adds an event listener using the wrapper on a DOM Node or an object that has
 * implemented {@link events.EventTarget}. A listener can only be added
 * once to an object.
 *
 * @param {events.ListenableType} target The target to listen to events on.
 * @param {function(?):?|{handleEvent:function(?):?}|null} listener Callback
 *     method, or an object with a handleEvent function.
 * @param {boolean=} opt_capt Whether to fire in capture phase (defaults to
 *     false).
 * @param {Object=} opt_scope Element in whose scope to call the listener.
 * @param {EventHandler=} opt_eventHandler Event handler to add
 *     listener to.
 * @override
 */
ActionEventWrapper_.prototype.listen = function(
    target, listener, opt_capt, opt_scope, opt_eventHandler) {
  var callback = function(e) {
    var listenerFn = events.wrapListener(listener);
    var role = dom.isElement(e.target) ?
        aria.getRole(/** @type {!Element} */ (e.target)) :
        null;
    if (e.type == EventType.CLICK && e.isMouseActionButton()) {
      listenerFn.call(opt_scope, e);
    } else if (
        (e.keyCode == KeyCodes.ENTER ||
         e.keyCode == KeyCodes.MAC_ENTER) &&
        e.type != EventType.KEYUP) {
      // convert keydown to keypress for backward compatibility.
      e.type = EventType.KEYPRESS;
      listenerFn.call(opt_scope, e);
    } else if (
        e.keyCode == KeyCodes.SPACE &&
        (role == Role.BUTTON ||
         role == Role.TAB ||
         role == Role.RADIO)) {
      if (e.type == EventType.KEYUP) {
        listenerFn.call(opt_scope, e);
      }
      // prevent the browser from scrolling the page down when space is pressed
      // on an interactive element.
      e.preventDefault();
    }
  };
  callback.listener_ = listener;
  callback.scope_ = opt_scope;

  if (opt_eventHandler) {
    opt_eventHandler.listen(
        target, ActionEventWrapper_.EVENT_TYPES_, callback,
        opt_capt);
  } else {
    events.listen(
        target, ActionEventWrapper_.EVENT_TYPES_, callback,
        opt_capt);
  }
};


/**
 * Removes an event listener added using EventWrapper.listen.
 *
 * @param {events.ListenableType} target The node to remove listener from.
 * @param {function(?):?|{handleEvent:function(?):?}|null} listener Callback
 *     method, or an object with a handleEvent function.
 * @param {boolean=} opt_capt Whether to fire in capture phase (defaults to
 *     false).
 * @param {Object=} opt_scope Element in whose scope to call the listener.
 * @param {EventHandler=} opt_eventHandler Event handler to remove
 *     listener from.
 * @override
 */
ActionEventWrapper_.prototype.unlisten = function(
    target, listener, opt_capt, opt_scope, opt_eventHandler) {
  for (var type, j = 0; type = ActionEventWrapper_.EVENT_TYPES_[j];
       j++) {
    var listeners = events.getListeners(target, type, !!opt_capt);
    for (var obj, i = 0; obj = listeners[i]; i++) {
      var objListener =
          /** @type {!ActionEventWrapper_.FunctionExtension_} */ (
              obj.listener);
      if (objListener.listener_ == listener &&
          objListener.scope_ == opt_scope) {
        if (opt_eventHandler) {
          opt_eventHandler.unlisten(
              target, type, obj.listener, opt_capt, opt_scope);
        } else {
          events.unlisten(target, type, obj.listener, opt_capt, opt_scope);
        }
        break;
      }
    }
  }
};
