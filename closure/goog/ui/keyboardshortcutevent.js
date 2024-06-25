/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview The event type emitted by the KeyboardShortcutHandler.
 */
import { Event } from '../events/event.js';

import { EventTarget } from '../events/eventtarget.js';

/**
 * Object representing a keyboard shortcut event.
 * @param {string} type Event type.
 * @param {string} identifier Task identifier for the triggered shortcut.
 * @param {Node|EventTarget} target Target the original key press
 *     event originated from.
 * @extends {Event}
 * @constructor
 * @final
 */
export function KeyboardShortcutEvent(type, identifier, target) {
 Event.call(this, type, target);

 /**
  * Task identifier for the triggered shortcut
  * @type {string}
  */
 this.identifier = identifier;
}
goog.inherits(KeyboardShortcutEvent, Event);
