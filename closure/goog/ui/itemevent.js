/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Definition of the ItemEvent class.
 */

import { Event } from '../events/event.js';



/**
 * Generic ui event class for events that take a single item like a menu click
 * event.
 *
 * @constructor
 * @extends {Event}
 * @param {string} type Event Type.
 * @param {Object} target Reference to the object that is the target
 *                        of this event.
 * @param {Object} item The item that was clicked.
 * @final
 */
export function ItemEvent(type, target, item) {
 Event.call(this, type, target);

 /**
  * Item for the event. The type of this object is specific to the type
  * of event. For a menu, it would be the menu item that was clicked. For a
  * listbox selection, it would be the listitem that was selected.
  *
  * @type {Object}
  */
 this.item = item;
}
goog.inherits(ItemEvent, Event);
