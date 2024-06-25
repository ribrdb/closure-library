/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Mock matchers for event related arguments.
 */

goog.setTestOnly('goog.testing.events.EventMatcher');

import { Event } from '../../events/event.js';
import { ArgumentMatcher } from '../mockmatchers.js';



/**
 * A matcher that verifies that an argument is a `Event` of a
 * particular type.
 * @param {string} type The single type the event argument must be of.
 * @constructor
 * @extends {ArgumentMatcher}
 * @final
 */
export function EventMatcher(type) {
 ArgumentMatcher.call(this, function(obj) {
  return obj instanceof Event && obj.type == type;
 }, 'isEventOfType(' + type + ')');
}
goog.inherits(
    EventMatcher,
    ArgumentMatcher);
