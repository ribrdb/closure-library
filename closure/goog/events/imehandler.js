/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Input Method Editors (IMEs) are OS-level widgets that make
 * it easier to type non-ascii characters on ascii keyboards (in particular,
 * characters that require more than one keystroke).
 *
 * When the user wants to type such a character, a modal menu pops up and
 * suggests possible "next" characters in the IME character sequence. After
 * typing N characters, the user hits "enter" to commit the IME to the field.
 * N differs from language to language.
 *
 * This class offers high-level events for how the user is interacting with the
 * IME in editable regions.
 *
 * Known Issues:
 *
 * Firefox always fires an extra pair of compositionstart/compositionend events.
 * We do not normalize for this.
 *
 * Opera does not fire any IME events.
 *
 * Spurious UPDATE events are common on all browsers.
 *
 * We currently do a bad job detecting when the IME closes on IE, and
 * make a "best effort" guess on when we know it's closed.
 */

import { Event } from './event.js';

import { EventHandler } from './eventhandler.js';
import { EventTarget } from './eventtarget.js';
import { EventType } from './eventtype.js';
import { KeyCodes } from './keycodes.js';
import * as userAgent from '../useragent/useragent.js';
const { BrowserEvent } = goog.requireType('goog.events.browserevent');



/**
 * Dispatches high-level events for IMEs.
 * @param {Element} el The element to listen on.
 * @extends {EventTarget}
 * @constructor
 * @final
 */
export function ImeHandler(el) {
  ImeHandler.base(this, 'constructor');

  /**
   * The element to listen on.
   * @type {Element}
   * @private
   */
  this.el_ = el;

  /**
       * Tracks the keyup event only, because it has a different life-cycle from
       * other events.
       * @type {EventHandler<!ImeHandler>}
       * @private
       */
  this.keyUpHandler_ = new EventHandler(this);

  /**
       * Tracks all the browser events.
       * @type {EventHandler<!ImeHandler>}
       * @private
       */
  this.handler_ = new EventHandler(this);

  if (ImeHandler.USES_COMPOSITION_EVENTS) {
    this.handler_
        .listen(
            el, EventType.COMPOSITIONSTART,
            this.handleCompositionStart_)
        .listen(
            el, EventType.COMPOSITIONEND,
            this.handleCompositionEnd_)
        .listen(
            el, EventType.COMPOSITIONUPDATE,
            this.handleTextModifyingInput_);
  }

  this.handler_
      .listen(el, EventType.TEXTINPUT, this.handleTextInput_)
      .listen(el, EventType.TEXT, this.handleTextModifyingInput_)
      .listen(el, EventType.KEYDOWN, this.handleKeyDown_);
}
goog.inherits(ImeHandler, EventTarget);


/**
 * Event types fired by ImeHandler. These events do not make any guarantees
 * about whether they were fired before or after the event in question.
 * @enum {string}
 */
ImeHandler.EventType = {
  // After the IME opens.
  START: 'startIme',

  // An update to the state of the IME. An 'update' does not necessarily mean
  // that the text contents of the field were modified in any way.
  UPDATE: 'updateIme',

  // After the IME closes.
  END: 'endIme'
};



/**
 * An event fired by ImeHandler.
 * @param {ImeHandler.EventType} type The type.
 * @param {BrowserEvent} reason The trigger for this event.
 * @constructor
 * @extends {Event}
 * @final
 */
ImeHandler.Event = function(type, reason) {
  ImeHandler.Event.base(this, 'constructor', type);

  /**
   * The event that triggered this.
   * @type {BrowserEvent}
   */
  this.reason = reason;
};
goog.inherits(ImeHandler.Event, Event);


/**
 * Whether to use the composition events.
 * @type {boolean}
 */
ImeHandler.USES_COMPOSITION_EVENTS = userAgent.GECKO ||
    (userAgent.WEBKIT && userAgent.isVersionOrHigher(532));


/**
 * Stores whether IME mode is active.
 * @type {boolean}
 * @private
 */
ImeHandler.prototype.imeMode_ = false;


/**
 * The keyCode value of the last keyDown event. This value is used for
 * identiying whether or not a textInput event is sent by an IME.
 * @type {number}
 * @private
 */
ImeHandler.prototype.lastKeyCode_ = 0;


/**
 * @return {boolean} Whether an IME is active.
 */
ImeHandler.prototype.isImeMode = function() {
  return this.imeMode_;
};


/**
 * Handles the compositionstart event.
 * @param {BrowserEvent} e The event.
 * @private
 */
ImeHandler.prototype.handleCompositionStart_ = function(e) {
  this.handleImeActivate_(e);
};


/**
 * Handles the compositionend event.
 * @param {BrowserEvent} e The event.
 * @private
 */
ImeHandler.prototype.handleCompositionEnd_ = function(e) {
  this.handleImeDeactivate_(e);
};


/**
 * Handles the compositionupdate and text events.
 * @param {BrowserEvent} e The event.
 * @private
 */
ImeHandler.prototype.handleTextModifyingInput_ = function(e) {
  if (this.isImeMode()) {
    this.processImeComposition_(e);
  }
};


/**
 * Handles IME activation.
 * @param {BrowserEvent} e The event.
 * @private
 */
ImeHandler.prototype.handleImeActivate_ = function(e) {
  if (this.imeMode_) {
    return;
  }

  // Listens for keyup events to handle unexpected IME keydown events on older
  // versions of webkit.
  //
  // In those versions, we currently use textInput events deactivate IME
  // (see handleTextInput_() for the reason). However,
  // Safari fires a keydown event (as a result of pressing keys to commit IME
  // text) with keyCode == WIN_IME after textInput event. This activates IME
  // mode again unnecessarily. To prevent this problem, listens keyup events
  // which can use to determine whether IME text has been committed.
  if (userAgent.WEBKIT &&
      !ImeHandler.USES_COMPOSITION_EVENTS) {
    this.keyUpHandler_.listen(
        this.el_, EventType.KEYUP, this.handleKeyUpSafari4_);
  }

  this.imeMode_ = true;
  this.dispatchEvent(
      new ImeHandler.Event(
          ImeHandler.EventType.START, e));
};


/**
 * Handles the IME compose changes.
 * @param {BrowserEvent} e The event.
 * @private
 */
ImeHandler.prototype.processImeComposition_ = function(e) {
  this.dispatchEvent(new ImeHandler.Event(
      ImeHandler.EventType.UPDATE, e));
};


/**
 * Handles IME deactivation.
 * @param {BrowserEvent} e The event.
 * @private
 */
ImeHandler.prototype.handleImeDeactivate_ = function(e) {
  this.imeMode_ = false;
  this.keyUpHandler_.removeAll();
  this.dispatchEvent(
      new ImeHandler.Event(
          ImeHandler.EventType.END, e));
};


/**
 * Handles a key down event.
 * @param {!BrowserEvent} e The event.
 * @private
 */
ImeHandler.prototype.handleKeyDown_ = function(e) {
  // Firefox and Chrome have a separate event for IME composition ('text'
  // and 'compositionupdate', respectively), other browsers do not.
  if (!ImeHandler.USES_COMPOSITION_EVENTS) {
    var imeMode = this.isImeMode();
    // If we're in IE and we detect an IME input on keyDown then activate
    // the IME, otherwise if the imeMode was previously active, deactivate.
    if (!imeMode && e.keyCode == KeyCodes.WIN_IME) {
      this.handleImeActivate_(e);
    } else if (imeMode && e.keyCode != KeyCodes.WIN_IME) {
      if (ImeHandler.isImeDeactivateKeyEvent_(e)) {
        this.handleImeDeactivate_(e);
      }
    } else if (imeMode) {
      this.processImeComposition_(e);
    }
  }

  // Safari on Mac doesn't send IME events in the right order so that we must
  // ignore some modifier key events to insert IME text correctly.
  if (ImeHandler.isImeDeactivateKeyEvent_(e)) {
    this.lastKeyCode_ = e.keyCode;
  }
};


/**
 * Handles a textInput event.
 * @param {!BrowserEvent} e The event.
 * @private
 */
ImeHandler.prototype.handleTextInput_ = function(e) {
  // Some WebKit-based browsers including Safari 4 don't send composition
  // events. So, we turn down IME mode when it's still there.
  if (!ImeHandler.USES_COMPOSITION_EVENTS &&
      userAgent.WEBKIT &&
      this.lastKeyCode_ == KeyCodes.WIN_IME && this.isImeMode()) {
    this.handleImeDeactivate_(e);
  }
};


/**
 * Handles the key up event for any IME activity. This handler is just used to
 * prevent activating IME unnecessary in Safari at this time.
 * @param {!BrowserEvent} e The event.
 * @private
 */
ImeHandler.prototype.handleKeyUpSafari4_ = function(e) {
  if (this.isImeMode()) {
    switch (e.keyCode) {
      // These keyup events indicates that IME text has been committed or
      // cancelled. We should turn off IME mode when these keyup events
      // received.
      case KeyCodes.ENTER:
      case KeyCodes.TAB:
      case KeyCodes.ESC:
        this.handleImeDeactivate_(e);
        break;
    }
  }
};


/**
 * Returns whether the given event should be treated as an IME
 * deactivation trigger.
 * @param {!Event} e The event.
 * @return {boolean} Whether the given event is an IME deactivate trigger.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
ImeHandler.isImeDeactivateKeyEvent_ = function(e) {
  // Which key events involve IME deactivation depends on the user's
  // environment (i.e. browsers, platforms, and IMEs). Usually Shift key
  // and Ctrl key does not involve IME deactivation, so we currently assume
  // that these keys are not IME deactivation trigger.
  switch (e.keyCode) {
    case KeyCodes.SHIFT:
    case KeyCodes.CTRL:
      return false;
    default:
      return true;
  }
};


/** @override */
ImeHandler.prototype.disposeInternal = function() {
  this.handler_.dispose();
  this.keyUpHandler_.dispose();
  this.el_ = null;
  ImeHandler.base(this, 'disposeInternal');
};
