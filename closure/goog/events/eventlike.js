/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A typedef for event like objects that are dispatchable via the
 * goog.events.dispatchEvent function.
 */
goog.declareModuleId('goog.events.eventlike');

goog.requireType('goog.events.event');
goog.requireType('goog.events.eventid');

/**
 * A typedef for event like objects that are dispatchable via the
 * goog.events.dispatchEvent function. strings are treated as the type for a
 * goog.events.Event. Objects are treated as an extension of a new
 * goog.events.Event with the type property of the object being used as the type
 * of the Event.
 * @typedef {string|Object|goog.events.Event|goog.events.EventId}
 */
export var EventLike;
