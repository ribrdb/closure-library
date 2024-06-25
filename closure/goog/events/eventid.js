/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.declareModuleId('goog.events.eventid');



/**
 * A templated class that is used when registering for events. Typical usage:
 *
 *    /** @type {EventId<MyEventObj>} *\
 *    var myEventId = new EventId(
 *        goog.events.getUniqueId(('someEvent'));
 *
 *    // No need to cast or declare here since the compiler knows the
 *    // correct type of 'evt' (MyEventObj).
 *    something.listen(myEventId, function(evt) {});
 *
 * @param {string} eventId
 * @template T
 * @constructor
 * @struct
 * @final
 */
export function EventId(eventId) {
 /** @const */ this.id = eventId;
}


/**
 * @override
 * @return {string}
 */
EventId.prototype.toString = function() {
 return this.id;
};
