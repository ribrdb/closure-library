/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generic keyboard shortcut handler.
 *
 * @see ../demos/keyboardshortcuts.html
 */
import * as asserts from '../asserts/asserts.js';

import { TagName } from '../dom/tagname.js';
import * as events from '../events/events.js';
import { EventTarget } from '../events/eventtarget.js';
import { EventType } from '../events/eventtype.js';
import { KeyCodes } from '../events/keycodes.js';
import { KeyNames } from '../events/keynames.js';
import { Keys } from '../events/keys.js';
import object from '../object/object.js';
import { KeyboardEventData } from './keyboardeventdata.js';
import { KeyboardShortcutEvent } from './keyboardshortcutevent.js';
import { SyntheticKeyboardEvent } from './synthetickeyboardevent.js';
import * as userAgent from '../useragent/useragent.js';
const { BrowserEvent } = goog.requireType('goog.events.browserevent');



/**
 * Component for handling keyboard shortcuts. A shortcut is registered and bound
 * to a specific identifier. Once the shortcut is triggered an event is fired
 * with the identifier for the shortcut. This allows keyboard shortcuts to be
 * customized without modifying the code that listens for them.
 *
 * Supports keyboard shortcuts triggered by a single key, a stroke stroke (key
 * plus at least one modifier) and a sequence of keys or strokes.
 *
 * @param {EventTarget|EventTarget} keyTarget Event target that the
 *     key event listener is attached to, typically the applications root
 *     container.
 * @constructor
 * @extends {EventTarget}
 */
export function KeyboardShortcutHandler(keyTarget) {
  EventTarget.call(this);

  /**
     * Registered keyboard shortcuts tree. Stored as a map with the keyCode and
     * modifier(s) as the key and either a list of further strokes or the shortcut
     * task identifier as the value.
     * @type {!KeyboardShortcutHandler.SequenceTree_}
     * @see #makeStroke_
     * @private
     */
  this.shortcuts_ = {};

  /**
     * The currently active shortcut sequence tree, which represents the position
     * in the complete shortcuts_ tree reached by recent key strokes.
     * @type {!KeyboardShortcutHandler.SequenceTree_}
     * @private
     */
  this.currentTree_ = this.shortcuts_;

  /**
   * The time (in ms, epoch time) of the last keystroke which made progress in
   * the shortcut sequence tree (i.e. the time that currentTree_ was last set).
   * Used for timing out stroke sequences.
   * @type {number}
   * @private
   */
  this.lastStrokeTime_ = 0;

  /**
   * List of numeric key codes for keys that are safe to always regarded as
   * shortcuts, even if entered in a textarea or input field.
   * @type {Object}
   * @private
   */
  this.globalKeys_ = object.createSet(
      KeyboardShortcutHandler.DEFAULT_GLOBAL_KEYS_);

  /**
   * List of input types that should only accept ENTER as a shortcut.
   * @type {Object}
   * @private
   */
  this.textInputs_ = object.createSet(
      KeyboardShortcutHandler.DEFAULT_TEXT_INPUTS_);

  /**
   * Whether to always prevent the default action if a shortcut event is fired.
   * @type {boolean}
   * @private
   */
  this.alwaysPreventDefault_ = true;

  /**
   * Whether to always stop propagation if a shortcut event is fired.
   * @type {boolean}
   * @private
   */
  this.alwaysStopPropagation_ = false;

  /**
   * Whether to treat all shortcuts as if they had been passed
   * to setGlobalKeys().
   * @type {boolean}
   * @private
   */
  this.allShortcutsAreGlobal_ = false;

  /**
   * Whether to treat shortcuts with modifiers as if they had been passed
   * to setGlobalKeys().  Ignored if allShortcutsAreGlobal_ is true.  Applies
   * only to form elements (not content-editable).
   * @type {boolean}
   * @private
   */
  this.modifierShortcutsAreGlobal_ = true;

  /**
   * Whether to treat space key as a shortcut when the focused element is a
   * checkbox, radiobutton or button.
   * @type {boolean}
   * @private
   */
  this.allowSpaceKeyOnButtons_ = false;

  /**
   * Tracks the currently pressed shortcut key, for Firefox.
   * @type {?number}
   * @private
   */
  this.activeShortcutKeyForGecko_ = null;

  this.initializeKeyListener(keyTarget);
}
goog.inherits(KeyboardShortcutHandler, EventTarget);



/**
 * A node in a keyboard shortcut sequence tree. A node is either:
 * 1. A terminal node with a non-nullable shortcut string which is the
 *    identifier for the shortcut triggered by traversing the tree to that node.
 * 2. An internal node with a null shortcut string and a
 *    `KeyboardShortcutHandler.SequenceTree_` representing the
 *    continued stroke sequences from this node.
 * For clarity, the static factory methods for creating internal and terminal
 * nodes below should be used rather than using this constructor directly.
 * @param {string=} opt_shortcut The shortcut identifier, for terminal nodes.
 * @constructor
 * @struct
 * @private
 */
KeyboardShortcutHandler.SequenceNode_ = function(opt_shortcut) {
  /** @const {?string} The shorcut action identifier, for terminal nodes. */
  this.shortcut = opt_shortcut || null;

  /** @const {KeyboardShortcutHandler.SequenceTree_} */
  this.next = opt_shortcut ? null : {};
};


/**
 * Creates a terminal shortcut sequence node for the given shortcut identifier.
 * @param {string} shortcut The shortcut identifier.
 * @return {!KeyboardShortcutHandler.SequenceNode_}
 * @private
 */
KeyboardShortcutHandler.createTerminalNode_ = function(shortcut) {
  return new KeyboardShortcutHandler.SequenceNode_(shortcut);
};


/**
 * Creates an internal shortcut sequence node - a non-terminal part of a
 * keyboard sequence.
 * @return {!KeyboardShortcutHandler.SequenceNode_}
 * @private
 */
KeyboardShortcutHandler.createInternalNode_ = function() {
  return new KeyboardShortcutHandler.SequenceNode_();
};


/**
 * A map of strokes (represented as strings) to the nodes reached by those
 * strokes.
 * @typedef {Object<string, KeyboardShortcutHandler.SequenceNode_>}
 * @private
 */
KeyboardShortcutHandler.SequenceTree_;


/**
 * Maximum allowed delay, in milliseconds, allowed between the first and second
 * key in a key sequence.
 * @type {number}
 */
KeyboardShortcutHandler.MAX_KEY_SEQUENCE_DELAY = 1500;  // 1.5 sec


/**
 * Bit values for modifier keys.
 * @enum {number}
 */
KeyboardShortcutHandler.Modifiers = {
  NONE: 0,
  SHIFT: 1,
  CTRL: 2,
  ALT: 4,
  META: 8
};


/**
 * Keys marked as global by default.
 * @type {Array<KeyCodes>}
 * @private
 */
KeyboardShortcutHandler.DEFAULT_GLOBAL_KEYS_ = [
  KeyCodes.ESC, KeyCodes.F1, KeyCodes.F2,
  KeyCodes.F3, KeyCodes.F4, KeyCodes.F5,
  KeyCodes.F6, KeyCodes.F7, KeyCodes.F8,
  KeyCodes.F9, KeyCodes.F10, KeyCodes.F11,
  KeyCodes.F12, KeyCodes.PAUSE
];


/**
 * Text input types to allow only ENTER shortcuts.
 * Web Forms 2.0 for HTML5: Section 4.10.7 from 29 May 2012.
 * @type {Array<string>}
 * @private
 */
KeyboardShortcutHandler.DEFAULT_TEXT_INPUTS_ = [
  'color', 'date', 'datetime', 'datetime-local', 'email', 'month', 'number',
  'password', 'search', 'tel', 'text', 'time', 'url', 'week'
];


/**
 * Events.
 * @enum {string}
 */
KeyboardShortcutHandler.EventType = {
  SHORTCUT_TRIGGERED: 'shortcut',
  SHORTCUT_PREFIX: 'shortcut_'
};


/**
 * Cache for name to key code lookup.
 * @type {Object<number>}
 * @private
 */
KeyboardShortcutHandler.nameToKeyCodeCache_;


/**
 * Target on which to listen for key events.
 * @type {EventTarget|EventTarget}
 * @private
 */
KeyboardShortcutHandler.prototype.keyTarget_;


/**
 * Whether a key event is a printable-key event. Windows uses ctrl+alt
 * (alt-graph) keys to type characters on European keyboards. For such keys, we
 * cannot identify whether these keys are used for typing characters when
 * receiving keydown events. Therefore, we set this flag when we receive their
 * respective keypress events and fire shortcut events only when we do not
 * receive them.
 * @type {boolean}
 * @private
 */
KeyboardShortcutHandler.prototype.isPrintableKey_;


/**
 * Static method for getting the key code for a given key.
 * @param {string} name Name of key.
 * @return {number} The key code.
 */
KeyboardShortcutHandler.getKeyCode = function(name) {
  // Build reverse lookup object the first time this method is called.
  if (!KeyboardShortcutHandler.nameToKeyCodeCache_) {
    var map = {};
    for (var key in KeyNames) {
      // Explicitly convert the stringified map keys to numbers and normalize.
      map[KeyNames[key]] =
          KeyCodes.normalizeKeyCode(parseInt(key, 10));
    }
    KeyboardShortcutHandler.nameToKeyCodeCache_ = map;
  }

  // Check if key is in cache.
  return KeyboardShortcutHandler.nameToKeyCodeCache_[name];
};


/**
 * Sets whether to always prevent the default action when a shortcut event is
 * fired. If false, the default action is prevented only if preventDefault is
 * called on either of the corresponding SHORTCUT_TRIGGERED or SHORTCUT_PREFIX
 * events. If true, the default action is prevented whenever a shortcut event
 * is fired. The default value is true.
 * @param {boolean} alwaysPreventDefault Whether to always call preventDefault.
 */
KeyboardShortcutHandler.prototype.setAlwaysPreventDefault = function(
    alwaysPreventDefault) {
  this.alwaysPreventDefault_ = alwaysPreventDefault;
};


/**
 * Returns whether the default action will always be prevented when a shortcut
 * event is fired. The default value is true.
 * @see #setAlwaysPreventDefault
 * @return {boolean} Whether preventDefault will always be called.
 */
KeyboardShortcutHandler.prototype.getAlwaysPreventDefault = function() {
  return this.alwaysPreventDefault_;
};


/**
 * Sets whether to always stop propagation for the event when fired. If false,
 * the propagation is stopped only if stopPropagation is called on either of the
 * corresponding SHORT_CUT_TRIGGERED or SHORTCUT_PREFIX events. If true, the
 * event is prevented from propagating beyond its target whenever it is fired.
 * The default value is false.
 * @param {boolean} alwaysStopPropagation Whether to always call
 *     stopPropagation.
 */
KeyboardShortcutHandler.prototype.setAlwaysStopPropagation = function(
    alwaysStopPropagation) {
  this.alwaysStopPropagation_ = alwaysStopPropagation;
};


/**
 * Returns whether the event will always be stopped from propagating beyond its
 * target when a shortcut event is fired. The default value is false.
 * @see #setAlwaysStopPropagation
 * @return {boolean} Whether stopPropagation will always be called.
 */
KeyboardShortcutHandler.prototype.getAlwaysStopPropagation =
    function() {
      return this.alwaysStopPropagation_;
    };


/**
 * Sets whether to treat all shortcuts (including modifier shortcuts) as if the
 * keys had been passed to the setGlobalKeys function.
 * @param {boolean} allShortcutsGlobal Whether to treat all shortcuts as global.
 */
KeyboardShortcutHandler.prototype.setAllShortcutsAreGlobal = function(
    allShortcutsGlobal) {
  this.allShortcutsAreGlobal_ = allShortcutsGlobal;
};


/**
 * Returns whether all shortcuts (including modifier shortcuts) are treated as
 * if the keys had been passed to the setGlobalKeys function.
 * @see #setAllShortcutsAreGlobal
 * @return {boolean} Whether all shortcuts are treated as globals.
 */
KeyboardShortcutHandler.prototype.getAllShortcutsAreGlobal =
    function() {
      return this.allShortcutsAreGlobal_;
    };


/**
 * Sets whether to treat shortcuts with modifiers as if the keys had been
 * passed to the setGlobalKeys function.  Ignored if you have called
 * setAllShortcutsAreGlobal(true).  Applies only to form elements (not
 * content-editable).
 * @param {boolean} modifierShortcutsGlobal Whether to treat shortcuts with
 *     modifiers as global.
 */
KeyboardShortcutHandler.prototype.setModifierShortcutsAreGlobal =
    function(modifierShortcutsGlobal) {
      this.modifierShortcutsAreGlobal_ = modifierShortcutsGlobal;
    };


/**
 * Returns whether shortcuts with modifiers are treated as if the keys had been
 * passed to the setGlobalKeys function.  Ignored if you have called
 * setAllShortcutsAreGlobal(true).  Applies only to form elements (not
 * content-editable).
 * @see #setModifierShortcutsAreGlobal
 * @return {boolean} Whether shortcuts with modifiers are treated as globals.
 */
KeyboardShortcutHandler.prototype.getModifierShortcutsAreGlobal =
    function() {
      return this.modifierShortcutsAreGlobal_;
    };


/**
 * Sets whether to treat space key as a shortcut when the focused element is a
 * checkbox, radiobutton or button.
 * @param {boolean} allowSpaceKeyOnButtons Whether to treat space key as a
 *     shortcut when the focused element is a checkbox, radiobutton or button.
 */
KeyboardShortcutHandler.prototype.setAllowSpaceKeyOnButtons = function(
    allowSpaceKeyOnButtons) {
  this.allowSpaceKeyOnButtons_ = allowSpaceKeyOnButtons;
};


/**
 * Registers a keyboard shortcut.
 * @param {string} identifier Identifier for the task performed by the keyboard
 *                 combination. Multiple shortcuts can be provided for the same
 *                 task by specifying the same identifier.
 * @param {...(number|string|Array<number>)} var_args See below.
 *
 * param {number} keyCode Numeric code for key
 * param {number=} opt_modifiers Bitmap indicating required modifier keys.
 *                KeyboardShortcutHandler.Modifiers.SHIFT, CTRL, ALT,
 *                or META.
 *
 * The last two parameters can be repeated any number of times to create a
 * shortcut using a sequence of strokes. Instead of varargs the second parameter
 * could also be an array where each element would be regarded as a parameter.
 *
 * A string representation of the shortcut can be supplied instead of the last
 * two parameters. In that case the method only takes two arguments, the
 * identifier and the string.
 *
 * Examples:
 *   up              registerShortcut(str, KeyCodes.UP)
 *   Ctrl+g          registerShortcut(str, G_KEYCODE, CTRL)
 *   Ctrl+Shift+g    registerShortcut(str, G_KEYCODE, CTRL | SHIFT)
 *   Ctrl+g a        registerShortcut(str, G_KEYCODE, CTRL, A_KEYCODE)
 *   Ctrl+g Shift+a  registerShortcut(str, G_KEYCODE, CTRL, A_KEYCODE, SHIFT)
 *
 * Examples using string representation for shortcuts:
 *   up              registerShortcut(str, 'up')
 *   Ctrl+g          registerShortcut(str, 'ctrl+g')
 *   Ctrl+Shift+g    registerShortcut(str, 'ctrl+shift+g')
 *   Ctrl+g a        registerShortcut(str, 'ctrl+g a')
 *   Ctrl+g Shift+a  registerShortcut(str, 'ctrl+g shift+a')
 */
KeyboardShortcutHandler.prototype.registerShortcut = function(
    identifier, var_args) {
  // Add shortcut to shortcuts_ tree
  KeyboardShortcutHandler.setShortcut_(
      this.shortcuts_, this.interpretStrokes_(1, arguments), identifier);
};


/**
 * Unregisters a keyboard shortcut by keyCode and modifiers or string
 * representation of sequence.
 *
 * param {number} keyCode Numeric code for key
 * param {number=} opt_modifiers Bitmap indicating required modifier keys.
 *                 KeyboardShortcutHandler.Modifiers.SHIFT, CTRL, ALT,
 *                 or META.
 *
 * The two parameters can be repeated any number of times to create a shortcut
 * using a sequence of strokes.
 *
 * A string representation of the shortcut can be supplied instead see
 * {@link #registerShortcut} for syntax. In that case the method only takes one
 * argument.
 *
 * @param {...(number|string|Array<number>)} var_args String representation, or
 *     array or list of alternating key codes and modifiers.
 */
KeyboardShortcutHandler.prototype.unregisterShortcut = function(
    var_args) {
  // Remove shortcut from tree.
  KeyboardShortcutHandler.unsetShortcut_(
      this.shortcuts_, this.interpretStrokes_(0, arguments));
};


/**
 * Verifies if a particular keyboard shortcut is registered already. It has
 * the same interface as the unregistering of shortcuts.
 *
 * param {number} keyCode Numeric code for key
 * param {number=} opt_modifiers Bitmap indicating required modifier keys.
 *                 KeyboardShortcutHandler.Modifiers.SHIFT, CTRL, ALT,
 *                 or META.
 *
 * The two parameters can be repeated any number of times to create a shortcut
 * using a sequence of strokes.
 *
 * A string representation of the shortcut can be supplied instead see
 * {@link #registerShortcut} for syntax. In that case the method only takes one
 * argument.
 *
 * @param {...(number|string|Array<number>)} var_args String representation, or
 *     array or list of alternating key codes and modifiers.
 * @return {boolean} Whether the specified keyboard shortcut is registered.
 */
KeyboardShortcutHandler.prototype.isShortcutRegistered = function(
    var_args) {
  return this.checkShortcut_(
      this.shortcuts_, this.interpretStrokes_(0, arguments));
};


/**
 * Parses the variable arguments for registerShortcut and unregisterShortcut.
 * @param {number} initialIndex The first index of "args" to treat as
 *     variable arguments.
 * @param {Object} args The "arguments" array passed
 *     to registerShortcut or unregisterShortcut.  Please see the comments in
 *     registerShortcut for list of allowed forms.
 * @return {!Array<Array<string>>} The sequence of strokes,
 *     represented as arrays of strings.
 * @private
 */
KeyboardShortcutHandler.prototype.interpretStrokes_ = function(
    initialIndex, args) {
  var strokes;

  // Build strokes array from string.
  if (typeof (args[initialIndex]) === 'string') {
    strokes =
        KeyboardShortcutHandler.parseStringShortcut(args[initialIndex])
            .map(function(stroke) {
          asserts.assertNumber(
              stroke.keyCode,
              'A non-modifier key is needed in each stroke.');
          return KeyboardShortcutHandler.makeStroke_(
              stroke.key || '', stroke.keyCode, stroke.modifiers);
        });

    // Build strokes array from arguments list or from array.
  } else {
    var strokesArgs = args, i = initialIndex;
    if (Array.isArray(args[initialIndex])) {
      strokesArgs = args[initialIndex];
      i = 0;
    }

    strokes = [];
    for (; i < strokesArgs.length; i += 2) {
      // keyName == '' because this branch is only run on numbers
      // (corresponding to keyCodes).
      strokes.push(KeyboardShortcutHandler.makeStroke_(
          '', strokesArgs[i], strokesArgs[i + 1]));
    }
  }

  return strokes;
};


/**
 * Unregisters all keyboard shortcuts.
 */
KeyboardShortcutHandler.prototype.unregisterAll = function() {
  this.shortcuts_ = {};
};


/**
 * Sets the global keys; keys that are safe to always regarded as shortcuts,
 * even if entered in a textarea or input field.
 * @param {Array<number>} keys List of keys.
 */
KeyboardShortcutHandler.prototype.setGlobalKeys = function(keys) {
  this.globalKeys_ = object.createSet(keys);
};


/**
 * @return {!Array<string>} The global keys, i.e. keys that are safe to always
 *     regard as shortcuts, even if entered in a textarea or input field.
 */
KeyboardShortcutHandler.prototype.getGlobalKeys = function() {
  return object.getKeys(this.globalKeys_);
};


/** @override */
KeyboardShortcutHandler.prototype.disposeInternal = function() {
  KeyboardShortcutHandler.superClass_.disposeInternal.call(this);
  this.unregisterAll();
  this.clearKeyListener();
};


/**
 * Returns event type for a specific shortcut.
 * @param {string} identifier Identifier for the shortcut task.
 * @return {string} The event type.
 */
KeyboardShortcutHandler.prototype.getEventType = function(identifier) {
  return KeyboardShortcutHandler.EventType.SHORTCUT_PREFIX + identifier;
};


/**
 * Builds stroke array from string representation of shortcut.
 * @param {string} s String representation of shortcut.
 * @return {!Array<{key: ?string, keyCode: ?number, modifiers: number}>} The
 *     stroke array.  A null keyCode means no non-modifier key was part of the
 *     stroke.
 */
KeyboardShortcutHandler.parseStringShortcut = function(s) {
  // Normalize whitespace and force to lower case.
  s = s.replace(/[ +]*\+[ +]*/g, '+').replace(/[ ]+/g, ' ').toLowerCase();

  // Build strokes array from string, space separates strokes, plus separates
  // individual keys.
  var groups = s.split(' ');
  var strokes = [];
  for (var group, i = 0; group = groups[i]; i++) {
    var keys = group.split('+');
    // Explicitly re-initialize key data (JS does not have block scoping).
    var keyName = null;
    var keyCode = null;
    var modifiers = KeyboardShortcutHandler.Modifiers.NONE;
    for (var key, j = 0; key = keys[j]; j++) {
      switch (key) {
        case 'shift':
          modifiers |= KeyboardShortcutHandler.Modifiers.SHIFT;
          continue;
        case 'ctrl':
          modifiers |= KeyboardShortcutHandler.Modifiers.CTRL;
          continue;
        case 'alt':
          modifiers |= KeyboardShortcutHandler.Modifiers.ALT;
          continue;
        case 'meta':
          modifiers |= KeyboardShortcutHandler.Modifiers.META;
          continue;
      }
      if (keyCode !== null) {
        asserts.fail('At most one non-modifier key can be in a stroke.');
      }
      keyCode = KeyboardShortcutHandler.getKeyCode(key);
      asserts.assertNumber(
          keyCode, 'Key name not found in goog.events.KeyNames: ' + key);
      keyName = key;
      break;
    }
    strokes.push({key: keyName, keyCode: keyCode, modifiers: modifiers});
  }

  return strokes;
};


/**
 * Adds a key event listener that triggers {@link #handleKeyDown_} when keys
 * are pressed.
 * @param {EventTarget|EventTarget} keyTarget Event target that the
 *     event listener should be attached to.
 * @protected
 */
KeyboardShortcutHandler.prototype.initializeKeyListener = function(
    keyTarget) {
  this.keyTarget_ = keyTarget;

  events.listen(
      this.keyTarget_, EventType.KEYDOWN,
      this.handleBrowserKeyDown_, undefined /* opt_capture */, this);
  events.listen(
      this.keyTarget_, SyntheticKeyboardEvent.Type.KEYDOWN,
      this.handleSyntheticKeyDown_, undefined /* opt_capture */, this);

  // Windows uses ctrl+alt keys (a.k.a. alt-graph keys) for typing characters
  // on European keyboards (e.g. ctrl+alt+e for an an euro sign.) Unfortunately,
  // Windows browsers do not have any methods except listening to keypress and
  // keyup events to identify if ctrl+alt keys are really used for inputting
  // characters. Therefore, we listen to these events and prevent firing
  // shortcut-key events if ctrl+alt keys are used for typing characters.
  if (userAgent.WINDOWS) {
    events.listen(
        this.keyTarget_, EventType.KEYPRESS,
        this.handleWindowsBrowserKeyPress_, undefined /* opt_capture */, this);
    events.listen(
        this.keyTarget_, SyntheticKeyboardEvent.Type.KEYPRESS,
        this.handleWindowsSyntheticKeyPress_, undefined /* opt_capture */,
        this);
  }

  events.listen(
      this.keyTarget_, EventType.KEYUP, this.handleBrowserKeyUp_,
      undefined /* opt_capture */, this);
  events.listen(
      this.keyTarget_, SyntheticKeyboardEvent.Type.KEYUP,
      this.handleSyntheticKeyUp_, undefined /* opt_capture */, this);
};


/**
 * Keyup handler for events initiated from the browser.
 * @param {!BrowserEvent} e The key event.
 * @private
 */
KeyboardShortcutHandler.prototype.handleBrowserKeyUp_ = function(e) {
  this.handleKeyUp_(KeyboardEventData.fromBrowserEvent(e));
};


/**
 * Keyup handler for synthetic events.
 * @param {!SyntheticKeyboardEvent} e
 * @private
 */
KeyboardShortcutHandler.prototype.handleSyntheticKeyUp_ = function(e) {
  this.handleKeyUp_(e.getData());
};


/**
 * Handler for when a keyup event is fired. Currently only handled on Windows
 * (all browsers) or Gecko (all platforms).
 * @param {!KeyboardEventData} data
 * @private
 */
KeyboardShortcutHandler.prototype.handleKeyUp_ = function(data) {
  if (userAgent.GECKO) {
    this.handleGeckoKeyUp_(data);
  }

  if (userAgent.WINDOWS) {
    this.handleWindowsKeyUp_(data);
  }
};


/**
 * Handler for when a keyup event is fired in Firefox (Gecko).
 * @param {!KeyboardEventData} data
 * @private
 */
KeyboardShortcutHandler.prototype.handleGeckoKeyUp_ = function(data) {
  // Firefox triggers buttons on space keyUp instead of keyDown.  So if space
  // keyDown activated a shortcut, do NOT also trigger the focused button.
  if (KeyCodes.SPACE == this.activeShortcutKeyForGecko_ &&
      KeyCodes.SPACE == data.getKeyCode()) {
    data.getPreventDefaultFn()();
  }
  this.activeShortcutKeyForGecko_ = null;
};


/**
 * Returns whether this event is possibly used for typing a printable character.
 * Windows uses ctrl+alt (a.k.a. alt-graph) keys for typing characters on
 * European keyboards. Since only Firefox provides a method that can identify
 * whether ctrl+alt keys are used for typing characters, we need to check
 * whether Windows sends a keypress event to prevent firing shortcut event if
 * this event is used for typing characters.
 * @param {!KeyboardEventData} data
 * @return {boolean} Whether this event is a possible printable-key event.
 * @private
 */
KeyboardShortcutHandler.prototype.isPossiblePrintableKey_ = function(
    data) {
  return userAgent.WINDOWS && data.getCtrlKey() && data.getAltKey();
};


/**
 * Handler for when a keypress event is fired on Windows.
 * @param {!BrowserEvent} e The key event.
 * @private
 */
KeyboardShortcutHandler.prototype.handleWindowsBrowserKeyPress_ =
    function(e) {
      this.handleWindowsKeyPress_(KeyboardEventData.fromBrowserEvent(e));
    };


/**
 * Handler for when a synthetic keypress event is fired on Windows.
 * @param {!SyntheticKeyboardEvent} e
 * @private
 */
KeyboardShortcutHandler.prototype.handleWindowsSyntheticKeyPress_ =
    function(e) {
      this.handleWindowsKeyPress_(e.getData());
    };


/**
 * Handler for when a keypress event is fired on Windows.
 * @param {!KeyboardEventData} data
 * @private
 */
KeyboardShortcutHandler.prototype.handleWindowsKeyPress_ = function(
    data) {
  // When this keypress event consists of a printable character, set the flag to
  // prevent firing shortcut key events when we receive the succeeding keyup
  // event. We accept all Unicode characters except control ones since this
  // keyCode may be a non-ASCII character.
  if (data.getKeyCode() > 0x20 && this.isPossiblePrintableKey_(data)) {
    this.isPrintableKey_ = true;
  }
};


/**
 * Handler for when a keyup event is fired on Windows.
 * @param {!KeyboardEventData} data
 * @private
 */
KeyboardShortcutHandler.prototype.handleWindowsKeyUp_ = function(data) {
  // For possible printable-key events, try firing a shortcut-key event only
  // when this event is not used for typing a character.
  if (!this.isPrintableKey_ && this.isPossiblePrintableKey_(data)) {
    // handleKeyDown should handle possible printable keys since we initially
    // don't handle them in key down for windows, and instead wait until
    // key up.
    this.handleKeyDown_(data, true /* opt_handlePossiblePrintableKeys */);
  }
};


/**
 * Removes the listener that was added by link {@link #initializeKeyListener}.
 * @protected
 */
KeyboardShortcutHandler.prototype.clearKeyListener = function() {
  events.unlisten(
      this.keyTarget_, EventType.KEYDOWN,
      this.handleBrowserKeyDown_, false, this);
  events.unlisten(
      this.keyTarget_, SyntheticKeyboardEvent.Type.KEYDOWN,
      this.handleSyntheticKeyDown_, false, this);
  if (userAgent.WINDOWS) {
    events.unlisten(
        this.keyTarget_, EventType.KEYPRESS,
        this.handleWindowsBrowserKeyPress_, false, this);
    events.unlisten(
        this.keyTarget_, SyntheticKeyboardEvent.Type.KEYPRESS,
        this.handleWindowsSyntheticKeyPress_, false, this);
  }
  events.unlisten(
      this.keyTarget_, EventType.KEYUP, this.handleBrowserKeyUp_,
      false, this);
  events.unlisten(
      this.keyTarget_, SyntheticKeyboardEvent.Type.KEYUP,
      this.handleSyntheticKeyUp_, false, this);
  this.keyTarget_ = null;
};


/**
 * Adds a shortcut stroke sequence to the given sequence tree. Recursive.
 * @param {!KeyboardShortcutHandler.SequenceTree_} tree The stroke
 *     sequence tree to add to.
 * @param {Array<Array<string>>} strokes Array of strokes for shortcut.
 * @param {string} identifier Identifier for the task performed by shortcut.
 * @private
 */
KeyboardShortcutHandler.setShortcut_ = function(
    tree, strokes, identifier) {
  var stroke = strokes.shift();
  stroke.forEach(function(s) {
    var node = tree[s];
    if (node && (strokes.length == 0 || node.shortcut)) {
      // This new shortcut would override an existing shortcut or shortcut
      // prefix (since the new strokes end at an existing node), or an existing
      // shortcut would be triggered by the prefix to this new shortcut (since
      // there is already a terminal node on the path we are trying to create).
      throw new Error(
          'Keyboard shortcut conflicts with existing shortcut: ' +
          node.shortcut);
    }
  });

  if (strokes.length) {
    stroke.forEach(function(s) {
      var node = object.setIfUndefined(
          tree, s.toString(),
          KeyboardShortcutHandler.createInternalNode_());
      // setShortcut_ modifies strokes
      var strokesCopy = strokes.slice(0);
      KeyboardShortcutHandler.setShortcut_(
          asserts.assert(
              node.next, 'An internal node must have a next map'),
          strokesCopy, identifier);
    });
  } else {
    stroke.forEach(function(s) {
      // Add a terminal node.
      tree[s] = KeyboardShortcutHandler.createTerminalNode_(identifier);
    });
  }
};


/**
 * Removes a shortcut stroke sequence from the given sequence tree, pruning any
 * dead branches of the tree. Recursive.
 * @param {!KeyboardShortcutHandler.SequenceTree_} tree The stroke
 *     sequence tree to remove from.
 * @param {Array<Array<string>>} strokes Array of strokes for shortcut to
 *     remove.
 * @private
 */
KeyboardShortcutHandler.unsetShortcut_ = function(tree, strokes) {
  var stroke = strokes.shift();
  stroke.forEach(function(s) {
    var node = tree[s];
    if (!node) {
      // The given stroke sequence is not in the tree.
      return;
    }
    if (strokes.length == 0) {
      // Base case - the end of the stroke sequence.
      if (!node.shortcut) {
        // The given stroke sequence does not end at a terminal node.
        return;
      }
      delete tree[s];
    } else {
      if (!node.next) {
        // The given stroke sequence is not in the tree.
        return;
      }
      // Recursively remove the rest of the shortcut sequence from the node.next
      // subtree.
      // unsetShortcut_ modifies strokes
      var strokesCopy = strokes.slice(0);
      KeyboardShortcutHandler.unsetShortcut_(node.next, strokesCopy);
      if (object.isEmpty(node.next)) {
        // The node.next subtree is now empty (the last stroke in it was just
        // removed), so prune this dead branch of the tree.
        delete tree[s];
      }
    }
  });
};


/**
 * Checks tree for a node matching one of stroke.
 * @param {!KeyboardShortcutHandler.SequenceTree_} tree The
 *     stroke sequence tree to find the node in.
 * @param {Array<string>} stroke Stroke to find.
 * @return {!KeyboardShortcutHandler.SequenceNode_|undefined} Node matching stroke.
 * @private
 */
KeyboardShortcutHandler.prototype.getNode_ = function(tree, stroke) {
  for (var i = 0; i < stroke.length; i++) {
    var node = tree[stroke[i]];
    if (!node) {
      continue;
    }
    return node;
  }
  return undefined;
};

/**
 * Checks if a particular keyboard shortcut is registered.
 * @param {KeyboardShortcutHandler.SequenceTree_|null} tree The
 *     stroke sequence tree to find the keyboard shortcut in.
 * @param {Array<Array<string>>} strokes Strokes array.
 * @return {boolean} True iff the keyboard shortcut is registred.
 * @private
 */
KeyboardShortcutHandler.prototype.checkShortcut_ = function(
    tree, strokes) {
  while (strokes.length > 0 && tree) {
    var stroke = strokes.shift();
    var node = this.getNode_(tree, stroke);
    if (!node) {
      continue;
    }
    if (strokes.length == 0 && node.shortcut) {
      return true;
    }
    // checkShortcut_ modifies strokes
    var strokesCopy = strokes.slice(0);
    if (this.checkShortcut_(node.next, strokesCopy)) {
      return true;
    }
  }
  return false;
};


/**
 * Constructs key identification string from key name, key code and modifiers.
 *
 * @param {string} keyName Key name.
 * @param {number} keyCode Numeric key code.
 * @param {number} modifiers Required modifiers.
 * @return {!Array<string>} An array of strings identifying the key/modifier
 *     combinations.
 * @private
 */
KeyboardShortcutHandler.makeStroke_ = function(
    keyName, keyCode, modifiers) {
  var mods = modifiers || 0;
  // entries must be usable as key in a map
  var strokes = ['c_' + keyCode + '_' + mods];

  if (keyName != '') {
    strokes.push('n_' + keyName + '_' + mods);
  }

  return strokes;
};


/**
 * Keydown handler for events initiated from the browser.
 * @param {!BrowserEvent} event Keypress event.
 * @private
 */
KeyboardShortcutHandler.prototype.handleBrowserKeyDown_ = function(
    event) {
  this.handleKeyDown_(KeyboardEventData.fromBrowserEvent(event));
};


/**
 * Keydown handler for synthetic events.
 * @param {!SyntheticKeyboardEvent} event
 * @private
 */
KeyboardShortcutHandler.prototype.handleSyntheticKeyDown_ = function(
    event) {
  this.handleKeyDown_(event.getData());
};


/**
 * Keydown handler.
 * @param {!KeyboardEventData} data
 * @param {boolean=} opt_handlePossiblePrintableKeys Whether possible printable
 *     keys should be handled. By default, they are ignored, but when the data
 *     comes from keyup they should be handled.
 * @private
 * @suppress {strictPrimitiveOperators} Part of the go/strict_warnings_migration
 */
KeyboardShortcutHandler.prototype.handleKeyDown_ = function(
    data, opt_handlePossiblePrintableKeys) {
  if (!this.isValidShortcut_(data)) {
    return;
  }
  // For possible printable-key events, we cannot identify whether the events
  // are used for typing characters until we receive respective keyup events.
  // Therefore, we handle this event when we receive a succeeding keyup event
  // to verify this event is not used for typing characters. preventDefault is
  // not called on the event to avoid disrupting a character input.
  if (!opt_handlePossiblePrintableKeys && this.isPossiblePrintableKey_(data)) {
    this.isPrintableKey_ = false;
    return;
  }

  var keyCode = KeyCodes.normalizeKeyCode(data.getKeyCode());
  var keyName = data.getKey();

  var modifiers =
      (data.getShiftKey() ? KeyboardShortcutHandler.Modifiers.SHIFT :
                            0) |
      (data.getCtrlKey() ? KeyboardShortcutHandler.Modifiers.CTRL : 0) |
      (data.getAltKey() ? KeyboardShortcutHandler.Modifiers.ALT : 0) |
      (data.getMetaKey() ? KeyboardShortcutHandler.Modifiers.META : 0);
  var stroke =
      KeyboardShortcutHandler.makeStroke_(keyName, keyCode, modifiers);
  var node = this.getNode_(this.currentTree_, stroke);

  if (!node || this.hasSequenceTimedOut_()) {
    // Either this stroke does not continue any active sequence, or the
    // currently active sequence has timed out. Reset shortcut tree progress.
    this.setCurrentTree_(this.shortcuts_);
  }

  node = this.getNode_(this.currentTree_, stroke);

  if (node && node.next) {
    // This stroke does not trigger a shortcut, but entered stroke(s) are a part
    // of a sequence. Progress in the sequence tree and record time to allow the
    // following stroke(s) to trigger the shortcut.
    this.setCurrentTree_(node.next);
  }

  if (!node) {
    // This stroke does not correspond to a shortcut or continued sequence.
    return;
  } else if (node.next) {
    // Prevent default action so that the rest of the stroke sequence can be
    // completed.
    data.getPreventDefaultFn()();
    return;
  }

  // This stroke triggers a shortcut. Any active sequence has been completed, so
  // reset the sequence tree.
  this.setCurrentTree_(this.shortcuts_);

  // Dispatch the triggered keyboard shortcut event. In addition to the generic
  // keyboard shortcut event a more specific fine grained one, specific for the
  // shortcut identifier, is fired.
  if (this.alwaysPreventDefault_) {
    data.getPreventDefaultFn()();
  }

  if (this.alwaysStopPropagation_) {
    data.getStopPropagationFn()();
  }

  var shortcut = asserts.assertString(
      node.shortcut, 'A terminal node must have a string shortcut identifier.');
  // Dispatch SHORTCUT_TRIGGERED event
  var triggerEvent = new KeyboardShortcutEvent(
      KeyboardShortcutHandler.EventType.SHORTCUT_TRIGGERED, shortcut,
      data.getTarget());
  var retVal = this.dispatchEvent(triggerEvent);

  // Dispatch SHORTCUT_PREFIX_<identifier> event
  var prefixEvent = new KeyboardShortcutEvent(
      KeyboardShortcutHandler.EventType.SHORTCUT_PREFIX + shortcut,
      shortcut, data.getTarget());
  retVal &= this.dispatchEvent(prefixEvent);

  // The default action is prevented if 'preventDefault' was
  // called on either event, or if a listener returned false.
  if (!retVal) {
    data.getPreventDefaultFn()();
  }

  // For Firefox, track which shortcut key was pushed.
  if (userAgent.GECKO) {
    this.activeShortcutKeyForGecko_ = keyCode;
  }
};


/**
 * Checks if a given keypress event may be treated as a shortcut.
 * @param {!KeyboardEventData} data
 * @return {boolean} Whether to attempt to process the event as a shortcut.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
KeyboardShortcutHandler.prototype.isValidShortcut_ = function(data) {
  // Ignore Ctrl, Shift and ALT
  var keyCode = data.getKeyCode();
  if (data.getKey() != '') {
    var keyName = data.getKey();
    if (keyName == Keys.CTRL || keyName == Keys.SHIFT ||
        keyName == Keys.ALT ||
        keyName == Keys.ALTGRAPH) {
      return false;
    }
  } else {
    if (keyCode == KeyCodes.SHIFT ||
        keyCode == KeyCodes.CTRL ||
        keyCode == KeyCodes.ALT) {
      return false;
    }
  }

  // RootTarget is used specifically to handle the case of shadow dom.
  // Note, the type of shadow dom root is limited, and could never be
  // INPUT, TEXTAREA, BUTTON, SELECT, etc.
  var el = /** @type {!Element} */ (data.getRootTarget());
  var isFormElement = el.tagName == TagName.TEXTAREA ||
      el.tagName == TagName.INPUT ||
      el.tagName == TagName.BUTTON ||
      el.tagName == TagName.SELECT;

  var isContentEditable = !isFormElement &&
      (el.isContentEditable ||
       (el.ownerDocument && el.ownerDocument.designMode == 'on'));

  if (!isFormElement && !isContentEditable) {
    return true;
  }
  // Always allow keys registered as global to be used (typically Esc, the
  // F-keys and other keys that are not typically used to manipulate text).
  if (this.globalKeys_[keyCode] || this.allShortcutsAreGlobal_) {
    return true;
  }
  if (isContentEditable) {
    // For events originating from an element in editing mode we only let
    // global key codes through.
    return false;
  }
  // Event target is one of (TEXTAREA, INPUT, BUTTON, SELECT).
  // Allow modifier shortcuts, unless we shouldn't.
  if (this.modifierShortcutsAreGlobal_ &&
      (data.getAltKey() || data.getCtrlKey() || data.getMetaKey())) {
    return true;
  }
  // Allow ENTER to be used as shortcut for text inputs.
  if (el.tagName == TagName.INPUT && this.textInputs_[el.type]) {
    return keyCode == KeyCodes.ENTER;
  }
  // Checkboxes, radiobuttons and buttons. Allow all but SPACE as shortcut.
  if (el.tagName == TagName.INPUT ||
      el.tagName == TagName.BUTTON) {
    // TODO(gboyer): If more flexibility is needed, create protected helper
    // methods for each case (e.g. button, input, etc).
    if (this.allowSpaceKeyOnButtons_) {
      return true;
    } else {
      return keyCode != KeyCodes.SPACE;
    }
  }
  // Don't allow any additional shortcut keys for textareas or selects.
  return false;
};


/**
 * @return {boolean} True iff the current stroke sequence has timed out.
 * @private
 */
KeyboardShortcutHandler.prototype.hasSequenceTimedOut_ = function() {
  return Date.now() - this.lastStrokeTime_ >=
      KeyboardShortcutHandler.MAX_KEY_SEQUENCE_DELAY;
};


/**
 * Sets the current keyboard shortcut sequence tree and updates the last stroke
 * time.
 * @param {!KeyboardShortcutHandler.SequenceTree_} tree
 * @private
 */
KeyboardShortcutHandler.prototype.setCurrentTree_ = function(tree) {
  this.currentTree_ = tree;
  this.lastStrokeTime_ = Date.now();
};
