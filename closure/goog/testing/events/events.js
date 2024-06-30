/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Event Simulation.
 *
 * Utility functions for simulating events at the Closure level. All functions
 * in this package generate events by calling events.fireListeners,
 * rather than interfacing with the browser directly. This is intended for
 * testing purposes, and should not be used in production code.
 *
 * The decision to use Closure events and dispatchers instead of the browser's
 * native events and dispatchers was conscious and deliberate. Native event
 * dispatchers have their own set of quirks and edge cases. Pure JS dispatchers
 * are more robust and transparent.
 *
 * If you think you need a testing mechanism that uses native Event objects,
 * please, please email closure-tech first to explain your use case before you
 * sink time into this.
 *
 * TODO(user): Migrate to explicitly non-nullable types. At present, many
 *     functions in this file expect non-null inputs but do not explicitly
 *     indicate this.
 */

goog.setTestOnly('goog.testing.events');

import { Disposable } from '../../disposable/disposable.js';
import * as asserts from '../../asserts/asserts.js';
import { NodeType } from '../../dom/nodetype.js';
import * as events from '../../events/events.js';
import { BrowserEvent } from '../../events/browserevent.js';
import { EventTarget as GEventTarget } from '../../events/eventtarget.js';
import { EventType } from '../../events/eventtype.js';
import { KeyCodes } from '../../events/keycodes.js';
import object from '../../object/object.js';
import * as style from '../../style/style.js';
import * as userAgent from '../../useragent/useragent.js';
const { Coordinate } = goog.requireType('goog.math.coordinate');



/**
 * BrowserEvent expects an Event so we provide one for JSCompiler.
 *
 * This clones a lot of the functionality of events.Event. This used to
 * use a mixin, but the mixin results in confusing the two types when compiled.
 *
 * @param {string} type Event Type.
 * @param {Object=} opt_target Reference to the object that is the target of
 *     this event.
 * @constructor
 * @extends {Event}
 */
function TestingEvent(type, opt_target) {
  this.type = type;

  this.target = /** @type {EventTarget} */ (opt_target || null);

  this.currentTarget = this.target;
}
export { TestingEvent as Event };


/**
 * Whether to cancel the event in internal capture/bubble processing for IE.
 * @type {boolean}
 * @public
 * @suppress {underscore|visibility} Technically public, but referencing this
 *     outside this package is strongly discouraged.
 */
TestingEvent.prototype.propagationStopped_ = false;


/** @override */
TestingEvent.prototype.defaultPrevented = false;


/**
 * Return value for in internal capture/bubble processing for IE.
 * @type {boolean}
 * @public
 * @suppress {underscore|visibility} Technically public, but referencing this
 *     outside this package is strongly discouraged.
 */
TestingEvent.prototype.returnValue_ = true;


/** @override */
TestingEvent.prototype.stopPropagation = function() {
  this.propagationStopped_ = true;
};


/** @override */
TestingEvent.prototype.preventDefault = function() {
  this.defaultPrevented = true;
  this.returnValue_ = false;
};

/**
 * Asserts an event target exists.  This will fail if target is not defined.
 *
 * TODO(nnaze): Gradually add this to the methods in this file, and eventually
 *     update the method signatures to not take nullables.  See
 * http://b/8961907
 *
 * @param {EventTarget} target A target to assert.
 * @return {!EventTarget} The target, guaranteed to exist.
 * @private
 */
function assertEventTarget_(target) {
  return asserts.assert(target, 'EventTarget should be defined.');
}


/**
 * A static helper function that sets the mouse position to the event.
 * @param {Event} event A simulated native event.
 * @param {Coordinate=} opt_coords Mouse position. Defaults to event's
 *     target's position (if available), otherwise (0, 0).
 * @private
 */
function setEventClientXY_(event, opt_coords) {
  if (!opt_coords && event.target &&
      /** @type {!Node} */ (event.target).nodeType ==
          NodeType.ELEMENT) {
    try {
      opt_coords = style.getClientPosition(
          /** @type {!Element} **/ (event.target));
    } catch (ex) {
      // IE sometimes throws if it can't get the position.
    }
  }
  event.clientX = opt_coords ? opt_coords.x : 0;
  event.clientY = opt_coords ? opt_coords.y : 0;

  // Pretend the browser window is at (0, 0) of the screen.
  event.screenX = event.clientX;
  event.screenY = event.clientY;

  // Assume that there was no page scroll.
  event.pageX = event.clientX;
  event.pageY = event.clientY;
}


/**
 * Simulates a mousedown, mouseup, and then click on the given event target,
 * with the left mouse button.
 * @param {EventTarget} target The target for the event.
 * @param {BrowserEvent.MouseButton=} opt_button Mouse button;
 *     defaults to `BrowserEvent.MouseButton.LEFT`.
 * @param {Coordinate=} opt_coords Mouse position. Defaults to event's
 *     target's position (if available), otherwise (0, 0).
 * @param {Object=} opt_eventProperties Event properties to be mixed into the
 *     BrowserEvent.
 * @return {boolean} The returnValue of the sequence: false if preventDefault()
 *     was called on any of the events, true otherwise.
 */
export function fireClickSequence(target, opt_button, opt_coords, opt_eventProperties) {
  // Fire mousedown, mouseup, and click. Then return the bitwise AND of the 3.
  return eagerAnd_(
      fireMouseDownEvent(
          target, opt_button, opt_coords, opt_eventProperties),
      fireMouseUpEvent(
          target, opt_button, opt_coords, opt_eventProperties),
      fireClickEvent(
          target, opt_button, opt_coords, opt_eventProperties));
}


/**
 * Simulates the sequence of events fired by the browser when the user double-
 * clicks the given target.
 * @param {EventTarget} target The target for the event.
 * @param {Coordinate=} opt_coords Mouse position. Defaults to event's
 *     target's position (if available), otherwise (0, 0).
 * @param {Object=} opt_eventProperties Event properties to be mixed into the
 *     BrowserEvent.
 * @return {boolean} The returnValue of the sequence: false if preventDefault()
 *     was called on any of the events, true otherwise.
 */
export function fireDoubleClickSequence(target, opt_coords, opt_eventProperties) {
  // Fire mousedown, mouseup, click, mousedown, mouseup, click, dblclick.
  // Then return the bitwise AND of the 7.
  const btn = BrowserEvent.MouseButton.LEFT;
  return eagerAnd_(
      fireMouseDownEvent(
          target, btn, opt_coords, opt_eventProperties),
      fireMouseUpEvent(
          target, btn, opt_coords, opt_eventProperties),
      fireClickEvent(
          target, btn, opt_coords, opt_eventProperties),
      // IE fires a selectstart instead of the second mousedown in a
      // dblclick, but we don't care about selectstart.
      (userAgent.IE ||
       fireMouseDownEvent(
           target, btn, opt_coords, opt_eventProperties)),
      fireMouseUpEvent(
          target, btn, opt_coords, opt_eventProperties),
      // IE doesn't fire the second click in a dblclick.
      (userAgent.IE ||
       fireClickEvent(
           target, btn, opt_coords, opt_eventProperties)),
      fireDoubleClickEvent(
          target, opt_coords, opt_eventProperties));
}


/**
 * A non-exhaustive mapping of keys to keyCode. These are not localized and
 * are specific to QWERTY keyboards, but are used to augment our testing key
 * events as much as possible in order to simulate real browser events. This
 * will be used to fill out the `keyCode` field for key events when the `key`
 * value is present in this map.
 * @private {!Object<number>}
 * @final
 */
var KEY_TO_KEYCODE_MAPPING_ = {
  '0': KeyCodes.ZERO,
  '1': KeyCodes.ONE,
  '2': KeyCodes.TWO,
  '3': KeyCodes.THREE,
  '4': KeyCodes.FOUR,
  '5': KeyCodes.FIVE,
  '6': KeyCodes.SIX,
  '7': KeyCodes.SEVEN,
  '8': KeyCodes.EIGHT,
  '9': KeyCodes.NINE,
  'a': KeyCodes.A,
  'b': KeyCodes.B,
  'c': KeyCodes.C,
  'd': KeyCodes.D,
  'e': KeyCodes.E,
  'f': KeyCodes.F,
  'g': KeyCodes.G,
  'h': KeyCodes.H,
  'i': KeyCodes.I,
  'j': KeyCodes.J,
  'k': KeyCodes.K,
  'l': KeyCodes.L,
  'm': KeyCodes.M,
  'n': KeyCodes.N,
  'o': KeyCodes.O,
  'p': KeyCodes.P,
  'q': KeyCodes.Q,
  'r': KeyCodes.R,
  's': KeyCodes.S,
  't': KeyCodes.T,
  'u': KeyCodes.U,
  'v': KeyCodes.V,
  'w': KeyCodes.W,
  'x': KeyCodes.X,
  'y': KeyCodes.Y,
  'z': KeyCodes.Z
};


/**
 * Simulates a complete keystroke (keydown, keypress, and keyup). Note that
 * if preventDefault is called on the keydown, the keypress will not fire.
 *
 * @param {EventTarget} target The target for the event.
 * @param {string|number} keyOrKeyCode The key value or keycode of the key
 *     pressed.
 * @param {Object=} opt_eventProperties Event properties to be mixed into the
 *     BrowserEvent.
 * @return {boolean} The returnValue of the sequence: false if preventDefault()
 *     was called on any of the events, true otherwise.
 */
export function fireKeySequence(target, keyOrKeyCode, opt_eventProperties) {
  return fireNonAsciiKeySequence(
      target, keyOrKeyCode, keyOrKeyCode, opt_eventProperties);
}


/**
 * Simulates a complete keystroke (keydown, keypress, and keyup) when typing
 * a non-ASCII character. Same as fireKeySequence, the keypress will not fire
 * if preventDefault is called on the keydown.
 *
 * @param {EventTarget} target The target for the event.
 * @param {string|number} keyOrKeyCode The key value or keycode of the keydown
 *     and keyup events.
 * @param {string|number} keyPressKeyOrKeyCode The key value or keycode of the
 *     keypress event.
 * @param {Object=} opt_eventProperties Event properties to be mixed into the
 *     BrowserEvent.
 * @return {boolean} The returnValue of the sequence: false if preventDefault()
 *     was called on any of the events, true otherwise.
 */
export function fireNonAsciiKeySequence(target, keyOrKeyCode, keyPressKeyOrKeyCode, opt_eventProperties) {
  const keydown =
      /** @type {!KeyboardEvent} */ (
          /** @type {!Event} */ (new TestingEvent(
              EventType.KEYDOWN, target)));
  const keyup =  //
      /** @type {!KeyboardEvent} */ (
          /** @type {!Event} */ (new TestingEvent(
              EventType.KEYUP, target)));
  const keypress =
      /** @type {!KeyboardEvent} */ (
          /** @type {!Event} */ (new TestingEvent(
              EventType.KEYPRESS, target)));

  if (typeof keyOrKeyCode === 'string') {
    keydown.key = keyup.key = /** @type {string} */ (keyOrKeyCode);
    keypress.key = /** @type {string} */ (keyPressKeyOrKeyCode);

    // Try to fill the keyCode field for the key events if we have a known key.
    // This is to try and make these mock simulated event as close to real
    // browser events as possible.
    const mappedKeyCode =
        KEY_TO_KEYCODE_MAPPING_[/** @type {string} */ (keyOrKeyCode)
                                         .toLowerCase()];
    if (mappedKeyCode) {
      keydown.keyCode = keyup.keyCode = mappedKeyCode;
    }

    const mappedKeyPressKeyCode =
        KEY_TO_KEYCODE_MAPPING_[/** @type {string} */ (
                                                        keyPressKeyOrKeyCode)
                                                        .toLowerCase()];
    if (mappedKeyPressKeyCode) {
      keypress.keyCode = mappedKeyPressKeyCode;
    }
  } else {
    keydown.keyCode = keyup.keyCode = /** @type {number} */ (keyOrKeyCode);
    keypress.keyCode = /** @type {number} */ (keyPressKeyOrKeyCode);
  }

  if (opt_eventProperties) {
    object.extend(keydown, opt_eventProperties);
    object.extend(keyup, opt_eventProperties);
    object.extend(keypress, opt_eventProperties);
  }

  // Fire keydown, keypress, and keyup. Note that if the keydown is
  // prevent-defaulted, then the keypress will not fire.
  let result = fireBrowserEvent(keydown);
  if (typeof keyOrKeyCode === 'string') {
    if (/** @type {string} */ (keyPressKeyOrKeyCode) != '' && result) {
      result = eagerAnd_(
          result, fireBrowserEvent(keypress));
    }
  } else {
    if (KeyCodes.firesKeyPressEvent(
            /** @type {number} */ (keyOrKeyCode), undefined, keydown.shiftKey,
            keydown.ctrlKey, keydown.altKey, keydown.metaKey) &&
        result) {
      result = eagerAnd_(
          result, fireBrowserEvent(keypress));
    }
  }
  return eagerAnd_(
      result, fireBrowserEvent(keyup));
}


/**
 * Simulates a mouseenter event on the given target.
 * @param {!EventTarget} target The target for the event.
 * @param {?EventTarget} relatedTarget The related target for the event (e.g.,
 *     the node that the mouse is being moved out of).
 * @param {!Coordinate=} opt_coords Mouse position. Defaults to
 *     event's target's position (if available), otherwise (0, 0).
 * @return {boolean} The returnValue of the event: false if preventDefault() was
 *     called on it, true otherwise.
 */
export function fireMouseEnterEvent(target, relatedTarget, opt_coords) {
  const mouseenter =
      new TestingEvent(EventType.MOUSEENTER, target);
  mouseenter.relatedTarget = relatedTarget;
  setEventClientXY_(mouseenter, opt_coords);
  return fireBrowserEvent(mouseenter);
}


/**
 * Simulates a mouseleave event on the given target.
 * @param {!EventTarget} target The target for the event.
 * @param {?EventTarget} relatedTarget The related target for the event (e.g.,
 *     the node that the mouse is being moved into).
 * @param {!Coordinate=} opt_coords Mouse position. Defaults to
 *     event's target's position (if available), otherwise (0, 0).
 * @return {boolean} The returnValue of the event: false if preventDefault() was
 *     called on it, true otherwise.
 */
export function fireMouseLeaveEvent(target, relatedTarget, opt_coords) {
  const mouseleave =
      new TestingEvent(EventType.MOUSELEAVE, target);
  mouseleave.relatedTarget = relatedTarget;
  setEventClientXY_(mouseleave, opt_coords);
  return fireBrowserEvent(mouseleave);
}


/**
 * Simulates a mouseover event on the given target.
 * @param {EventTarget} target The target for the event.
 * @param {EventTarget} relatedTarget The related target for the event (e.g.,
 *     the node that the mouse is being moved out of).
 * @param {Coordinate=} opt_coords Mouse position. Defaults to event's
 *     target's position (if available), otherwise (0, 0).
 * @return {boolean} The returnValue of the event: false if preventDefault() was
 *     called on it, true otherwise.
 */
export function fireMouseOverEvent(target, relatedTarget, opt_coords) {
  const mouseover =
      new TestingEvent(EventType.MOUSEOVER, target);
  mouseover.relatedTarget = relatedTarget;
  setEventClientXY_(mouseover, opt_coords);
  return fireBrowserEvent(mouseover);
}


/**
 * Simulates a mousemove event on the given target.
 * @param {EventTarget} target The target for the event.
 * @param {Coordinate=} opt_coords Mouse position. Defaults to event's
 *     target's position (if available), otherwise (0, 0).
 * @return {boolean} The returnValue of the event: false if preventDefault() was
 *     called on it, true otherwise.
 */
export function fireMouseMoveEvent(target, opt_coords) {
  const mousemove =
      new TestingEvent(EventType.MOUSEMOVE, target);

  setEventClientXY_(mousemove, opt_coords);
  return fireBrowserEvent(mousemove);
}


/**
 * Simulates a mouseout event on the given target.
 * @param {EventTarget} target The target for the event.
 * @param {EventTarget} relatedTarget The related target for the event (e.g.,
 *     the node that the mouse is being moved into).
 * @param {Coordinate=} opt_coords Mouse position. Defaults to event's
 *     target's position (if available), otherwise (0, 0).
 * @return {boolean} The returnValue of the event: false if preventDefault() was
 *     called on it, true otherwise.
 */
export function fireMouseOutEvent(target, relatedTarget, opt_coords) {
  const mouseout =
      new TestingEvent(EventType.MOUSEOUT, target);
  mouseout.relatedTarget = relatedTarget;
  setEventClientXY_(mouseout, opt_coords);
  return fireBrowserEvent(mouseout);
}


/**
 * Simulates a mousedown event on the given target.
 * @param {EventTarget} target The target for the event.
 * @param {BrowserEvent.MouseButton=} opt_button Mouse button;
 *     defaults to `BrowserEvent.MouseButton.LEFT`.
 * @param {Coordinate=} opt_coords Mouse position. Defaults to event's
 *     target's position (if available), otherwise (0, 0).
 * @param {Object=} opt_eventProperties Event properties to be mixed into the
 *     BrowserEvent.
 * @return {boolean} The returnValue of the event: false if preventDefault() was
 *     called on it, true otherwise.
 */
export function fireMouseDownEvent(target, opt_button, opt_coords, opt_eventProperties) {
  let button = opt_button || BrowserEvent.MouseButton.LEFT;
  return fireMouseButtonEvent_(
      EventType.MOUSEDOWN, target, button, opt_coords,
      opt_eventProperties);
}


/**
 * Simulates a mouseup event on the given target.
 * @param {EventTarget} target The target for the event.
 * @param {BrowserEvent.MouseButton=} opt_button Mouse button;
 *     defaults to `BrowserEvent.MouseButton.LEFT`.
 * @param {Coordinate=} opt_coords Mouse position. Defaults to event's
 *     target's position (if available), otherwise (0, 0).
 * @param {Object=} opt_eventProperties Event properties to be mixed into the
 *     BrowserEvent.
 * @return {boolean} The returnValue of the event: false if preventDefault() was
 *     called on it, true otherwise.
 */
export function fireMouseUpEvent(target, opt_button, opt_coords, opt_eventProperties) {
  let button = opt_button || BrowserEvent.MouseButton.LEFT;
  return fireMouseButtonEvent_(
      EventType.MOUSEUP, target, button, opt_coords,
      opt_eventProperties);
}


/**
 * Simulates a click event on the given target. IE only supports click with
 * the left mouse button.
 * @param {EventTarget} target The target for the event.
 * @param {BrowserEvent.MouseButton=} opt_button Mouse button;
 *     defaults to `BrowserEvent.MouseButton.LEFT`.
 * @param {Coordinate=} opt_coords Mouse position. Defaults to event's
 *     target's position (if available), otherwise (0, 0).
 * @param {Object=} opt_eventProperties Event properties to be mixed into the
 *     BrowserEvent.
 * @return {boolean} The returnValue of the event: false if preventDefault() was
 *     called on it, true otherwise.
 */
export function fireClickEvent(target, opt_button, opt_coords, opt_eventProperties) {
  return fireMouseButtonEvent_(
      EventType.CLICK, target, opt_button, opt_coords,
      opt_eventProperties);
}


/**
 * Simulates a double-click event on the given target. Always double-clicks
 * with the left mouse button since no browser supports double-clicking with
 * any other buttons.
 * @param {EventTarget} target The target for the event.
 * @param {Coordinate=} opt_coords Mouse position. Defaults to event's
 *     target's position (if available), otherwise (0, 0).
 * @param {Object=} opt_eventProperties Event properties to be mixed into the
 *     BrowserEvent.
 * @return {boolean} The returnValue of the event: false if preventDefault() was
 *     called on it, true otherwise.
 */
export function fireDoubleClickEvent(target, opt_coords, opt_eventProperties) {
  return fireMouseButtonEvent_(
      EventType.DBLCLICK, target,
      BrowserEvent.MouseButton.LEFT, opt_coords,
      opt_eventProperties);
}


/**
 * Helper function to fire a mouse event.
 * with the left mouse button since no browser supports double-clicking with
 * any other buttons.
 * @param {string} type The event type.
 * @param {EventTarget} target The target for the event.
 * @param {number=} opt_button Mouse button; defaults to
 *     `BrowserEvent.MouseButton.LEFT`.
 * @param {Coordinate=} opt_coords Mouse position. Defaults to event's
 *     target's position (if available), otherwise (0, 0).
 * @param {Object=} opt_eventProperties Event properties to be mixed into the
 *     BrowserEvent.
 * @return {boolean} The returnValue of the event: false if preventDefault() was
 *     called on it, true otherwise.
 * @private
 */
function fireMouseButtonEvent_(type, target, opt_button, opt_coords, opt_eventProperties) {
  const e = new TestingEvent(type, target);
  e.button = opt_button || BrowserEvent.MouseButton.LEFT;
  setEventClientXY_(e, opt_coords);
  if (opt_eventProperties) {
    object.extend(e, opt_eventProperties);
  }
  return fireBrowserEvent(e);
}


/**
 * Simulates a contextmenu event on the given target.
 * @param {EventTarget} target The target for the event.
 * @param {Coordinate=} opt_coords Mouse position. Defaults to event's
 *     target's position (if available), otherwise (0, 0).
 * @return {boolean} The returnValue of the event: false if preventDefault() was
 *     called on it, true otherwise.
 */
export function fireContextMenuEvent(target, opt_coords) {
  const button = (userAgent.MAC && userAgent.WEBKIT) ?
      BrowserEvent.MouseButton.LEFT :
      BrowserEvent.MouseButton.RIGHT;
  const contextmenu =
      new TestingEvent(EventType.CONTEXTMENU, target);
  contextmenu.button = button;
  contextmenu.ctrlKey = userAgent.MAC;
  setEventClientXY_(contextmenu, opt_coords);
  return fireBrowserEvent(contextmenu);
}


/**
 * Simulates a mousedown, contextmenu, and the mouseup on the given event
 * target, with the right mouse button.
 * @param {EventTarget} target The target for the event.
 * @param {Coordinate=} opt_coords Mouse position. Defaults to event's
 *     target's position (if available), otherwise (0, 0).
 * @return {boolean} The returnValue of the sequence: false if preventDefault()
 *     was called on any of the events, true otherwise.
 */
export function fireContextMenuSequence(target, opt_coords) {
  const props = userAgent.MAC ? {ctrlKey: true} : {};
  const button = (userAgent.MAC && userAgent.WEBKIT) ?
      BrowserEvent.MouseButton.LEFT :
      BrowserEvent.MouseButton.RIGHT;

  let result =
      fireMouseDownEvent(target, button, opt_coords, props);
  if (userAgent.WINDOWS) {
    // All browsers are consistent on Windows.
    result = eagerAnd_(
        result,
        fireMouseUpEvent(target, button, opt_coords),
        fireContextMenuEvent(target, opt_coords));
  } else {
    result = eagerAnd_(
        result, fireContextMenuEvent(target, opt_coords));

    // GECKO on Mac and Linux always fires the mouseup after the contextmenu.

    // WEBKIT is really weird.
    //
    // On Linux, it sometimes fires mouseup, but most of the time doesn't.
    // It's really hard to reproduce consistently. I think there's some
    // internal race condition. If contextmenu is preventDefaulted, then
    // mouseup always fires.
    //
    // On Mac, it always fires mouseup and then fires a click.
    result = eagerAnd_(
        result,
        fireMouseUpEvent(
            target, button, opt_coords, props));

    if (userAgent.WEBKIT && userAgent.MAC) {
      result = eagerAnd_(
          result,
          fireClickEvent(
              target, button, opt_coords, props));
    }
  }
  return result;
}


/**
 * Simulates a popstate event on the given target.
 * @param {EventTarget} target The target for the event.
 * @param {Object} state History state object.
 * @return {boolean} The returnValue of the event: false if preventDefault() was
 *     called on it, true otherwise.
 */
export function firePopStateEvent(target, state) {
  const e = /** @type {!PopStateEvent} */ (/** @type {!Event} */ (
      new TestingEvent(EventType.POPSTATE, target)));
  e.state = state;
  return fireBrowserEvent(e);
}


/**
 * Simulate a blur event on the given target.
 * @param {EventTarget} target The target for the event.
 * @return {boolean} The value returned by firing the blur browser event,
 *      which returns false iff 'preventDefault' was invoked.
 */
export function fireBlurEvent(target) {
  const e = new TestingEvent(EventType.BLUR, target);
  return fireBrowserEvent(e);
}


/**
 * Simulate a focus event on the given target.
 * @param {EventTarget} target The target for the event.
 * @return {boolean} The value returned by firing the focus browser event,
 *     which returns false iff 'preventDefault' was invoked.
 */
export function fireFocusEvent(target) {
  const e = new TestingEvent(EventType.FOCUS, target);
  return fireBrowserEvent(e);
}


/**
 * Simulate a focus-in event on the given target.
 * @param {!EventTarget} target The target for the event.
 * @return {boolean} The value returned by firing the focus-in browser event,
 *     which returns false iff 'preventDefault' was invoked.
 */
export function fireFocusInEvent(target) {
  const e =
      new TestingEvent(EventType.FOCUSIN, target);
  return fireBrowserEvent(e);
}


/**
 * Simulates an event's capturing and bubbling phases.
 * @param {Event} event A simulated native event. It will be wrapped in a
 *     normalized BrowserEvent and dispatched to Closure listeners on all
 *     ancestors of its target (inclusive).
 * @return {boolean} The returnValue of the event: false if preventDefault() was
 *     called on it, true otherwise.
 */
export function fireBrowserEvent(event) {
  event = /** @type {!Event} */ (event);

  event.returnValue_ = true;

  // generate a list of ancestors
  const ancestors = [];
  for (let current = event.target; current; current = current.parentNode) {
    ancestors.push(current);
  }

  // dispatch capturing listeners
  for (let j = ancestors.length - 1; j >= 0 && !event.propagationStopped_;
       j--) {
    events.fireListeners(
        ancestors[j], event.type, true,
        new BrowserEvent(event, ancestors[j]));
  }

  // dispatch bubbling listeners
  for (let j = 0; j < ancestors.length && !event.propagationStopped_; j++) {
    events.fireListeners(
        ancestors[j], event.type, false,
        new BrowserEvent(event, ancestors[j]));
  }

  return event.returnValue_;
}


/**
 * Simulates a touchstart event on the given target.
 * @param {EventTarget} target The target for the event.
 * @param {Coordinate=} opt_coords Touch position. Defaults to event's
 *     target's position (if available), otherwise (0, 0).
 * @param {Object=} opt_eventProperties Event properties to be mixed into the
 *     BrowserEvent.
 * @return {boolean} The returnValue of the event: false if preventDefault() was
 *     called on it, true otherwise.
 */
export function fireTouchStartEvent(target, opt_coords, opt_eventProperties) {
  // TODO: Support multi-touch events with array of coordinates.
  const touchstart =
      new TestingEvent(EventType.TOUCHSTART, target);
  setEventClientXY_(touchstart, opt_coords);
  if (opt_eventProperties) {
    object.extend(touchstart, opt_eventProperties);
  }
  return fireBrowserEvent(touchstart);
}


/**
 * Simulates a touchmove event on the given target.
 * @param {EventTarget} target The target for the event.
 * @param {Coordinate=} opt_coords Touch position. Defaults to event's
 *     target's position (if available), otherwise (0, 0).
 * @param {Object=} opt_eventProperties Event properties to be mixed into the
 *     BrowserEvent.
 * @return {boolean} The returnValue of the event: false if preventDefault() was
 *     called on it, true otherwise.
 */
export function fireTouchMoveEvent(target, opt_coords, opt_eventProperties) {
  // TODO: Support multi-touch events with array of coordinates.
  const touchmove =
      new TestingEvent(EventType.TOUCHMOVE, target);
  setEventClientXY_(touchmove, opt_coords);
  if (opt_eventProperties) {
    object.extend(touchmove, opt_eventProperties);
  }
  return fireBrowserEvent(touchmove);
}


/**
 * Simulates a touchend event on the given target.
 * @param {EventTarget} target The target for the event.
 * @param {Coordinate=} opt_coords Touch position. Defaults to event's
 *     target's position (if available), otherwise (0, 0).
 * @param {Object=} opt_eventProperties Event properties to be mixed into the
 *     BrowserEvent.
 * @return {boolean} The returnValue of the event: false if preventDefault() was
 *     called on it, true otherwise.
 */
export function fireTouchEndEvent(target, opt_coords, opt_eventProperties) {
  // TODO: Support multi-touch events with array of coordinates.
  const touchend =
      new TestingEvent(EventType.TOUCHEND, target);
  setEventClientXY_(touchend, opt_coords);
  if (opt_eventProperties) {
    object.extend(touchend, opt_eventProperties);
  }
  return fireBrowserEvent(touchend);
}


/**
 * Simulates a simple touch sequence on the given target.
 * @param {EventTarget} target The target for the event.
 * @param {Coordinate=} opt_coords Touch position. Defaults to event
 *     target's position (if available), otherwise (0, 0).
 * @param {Object=} opt_eventProperties Event properties to be mixed into the
 *     BrowserEvent.
 * @return {boolean} The returnValue of the sequence: false if preventDefault()
 *     was called on any of the events, true otherwise.
 */
export function fireTouchSequence(target, opt_coords, opt_eventProperties) {
  // TODO: Support multi-touch events with array of coordinates.
  // Fire touchstart, touchmove, touchend then return the AND of the 2.
  return eagerAnd_(
      fireTouchStartEvent(
          target, opt_coords, opt_eventProperties),
      fireTouchEndEvent(
          target, opt_coords, opt_eventProperties));
}


/**
 * Mixins a listenable into the given object. This turns the object
 * into a events.Listenable. This is useful, for example, when
 * you need to mock a implementation of listenable and still want it
 * to work with events.
 * @param {!Object} obj The object to mixin into.
 */
export function mixinListenable(obj) {
  const listenable = new GEventTarget();

  listenable.setTargetForTesting(obj);

  const listenablePrototype = GEventTarget.prototype;
  const disposablePrototype = Disposable.prototype;
  for (let key in listenablePrototype) {
    if (listenablePrototype.hasOwnProperty(key) ||
        disposablePrototype.hasOwnProperty(key)) {
      const member = listenablePrototype[key];
      if (typeof member === 'function') {
        obj[key] = goog.bind(member, listenable);
      } else {
        obj[key] = member;
      }
    }
  }
}

/**
 * Returns the boolean AND of all parameters.
 *
 * Unlike directly using `&&`, using this function cannot employ
 * short-circuiting; all side effects of resolving parameters will occur before
 * entering the function body.
 *
 * @param {boolean} first
 * @param {...boolean} rest
 * @return {boolean}
 * @private
 */
function eagerAnd_(first, rest) {
  for (let i = 1; i < arguments.length; i++) {
    first = first && arguments[i];
  }
  return first;
}
