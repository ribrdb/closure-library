/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview This file contains a class to provide a unified mechanism for
 * CLICK and enter KEYDOWN events. This provides better accessibility by
 * providing the given functionality to a keyboard user which is otherwise
 * would be available only via a mouse click.
 *
 * If there is an existing CLICK listener or planning to be added as below -
 *
 * <code>this.eventHandler_.listen(el, CLICK, this.onClick_);<code>
 *
 * it can be replaced with an ACTION listener as follows:
 *
 * <code>this.eventHandler_.listen(
 *    new ActionHandler(el),
 *    ACTION,
 *    this.onAction_);<code>
 */

import * as events from './events.js';

import { BrowserEvent } from './browserevent.js';
import { EventTarget } from './eventtarget.js';
import { EventType } from './eventtype.js';
import { KeyCodes } from './keycodes.js';
import * as userAgent from '../useragent/useragent.js';



/**
 * A wrapper around an element that you want to listen to ACTION events on.
 * @param {Element|Document} element The element or document to listen on.
 * @constructor
 * @extends {EventTarget}
 * @final
 */
export function ActionHandler(element) {
  EventTarget.call(this);

  /**
   * This is the element that we will listen to events on.
   * @type {Element|Document}
   * @private
   */
  this.element_ = element;

  events.listen(
      element, EventType.KEYDOWN, this.handleKeyDown_, false, this);
  events.listen(
      element, EventType.CLICK, this.handleClick_, false, this);
}
goog.inherits(ActionHandler, EventTarget);


/**
 * Enum type for the events fired by the action handler
 * @enum {string}
 */
ActionHandler.EventType = {
  ACTION: 'action',
  BEFOREACTION: 'beforeaction'
};


/**
 * Handles key press events.
 * @param {!BrowserEvent} e The key press event.
 * @private
 */
ActionHandler.prototype.handleKeyDown_ = function(e) {
  if (e.keyCode == KeyCodes.ENTER ||
      userAgent.WEBKIT && e.keyCode == KeyCodes.MAC_ENTER) {
    this.dispatchEvents_(e);
  }
};


/**
 * Handles mouse events.
 * @param {!BrowserEvent} e The click event.
 * @private
 */
ActionHandler.prototype.handleClick_ = function(e) {
  this.dispatchEvents_(e);
};


/**
 * Dispatches BeforeAction and Action events to the element
 * @param {!BrowserEvent} e The event causing dispatches.
 * @private
 */
ActionHandler.prototype.dispatchEvents_ = function(e) {
  var beforeActionEvent = new BeforeActionEvent(e);

  // Allow application specific logic here before the ACTION event.
  // For example, Gmail uses this event to restore keyboard focus
  if (!this.dispatchEvent(beforeActionEvent)) {
    // If the listener swallowed the BEFOREACTION event, don't dispatch the
    // ACTION event.
    return;
  }


  // Wrap up original event and send it off
  var actionEvent = new ActionEvent(e);
  try {
    this.dispatchEvent(actionEvent);
  } finally {
    // Stop propagating the event
    e.stopPropagation();
  }
};


/** @override */
ActionHandler.prototype.disposeInternal = function() {
  ActionHandler.superClass_.disposeInternal.call(this);
  events.unlisten(
      this.element_, EventType.KEYDOWN, this.handleKeyDown_, false,
      this);
  events.unlisten(
      this.element_, EventType.CLICK, this.handleClick_, false,
      this);
  delete this.element_;
};



/**
 * This class is used for the ActionHandler.EventType.ACTION event.
 * @param {!BrowserEvent} browserEvent Browser event object.
 * @constructor
 * @extends {BrowserEvent}
 * @final
 */
export function ActionEvent(browserEvent) {
  BrowserEvent.call(this, browserEvent.getBrowserEvent());
  this.type = ActionHandler.EventType.ACTION;
}
goog.inherits(ActionEvent, BrowserEvent);



/**
 * This class is used for the ActionHandler.EventType.BEFOREACTION
 * event. BEFOREACTION gives a chance to the application so the keyboard focus
 * can be restored back, if required.
 * @param {!BrowserEvent} browserEvent Browser event object.
 * @constructor
 * @extends {BrowserEvent}
 * @final
 */
export function BeforeActionEvent(browserEvent) {
  BrowserEvent.call(this, browserEvent.getBrowserEvent());
  this.type = ActionHandler.EventType.BEFOREACTION;
}
goog.inherits(BeforeActionEvent, BrowserEvent);
