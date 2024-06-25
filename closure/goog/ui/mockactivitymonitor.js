/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Definition of MockActivityMonitor.
 */

import { EventType } from '../events/eventtype.js';

import { ActivityMonitor } from './activitymonitor.js';



/**
 * A mock implementation of ActivityMonitor for unit testing. Clients
 * of this class should override Date.now to return a synthetic time from
 * the unit test.
 * @constructor
 * @extends {ActivityMonitor}
 * @final
 */
export function MockActivityMonitor() {
 MockActivityMonitor.base(this, 'constructor');

 /**
  * Tracks whether an event has been fired. Used by simulateEvent.
  * @type {boolean}
  * @private
  */
 this.eventFired_ = false;
}
goog.inherits(MockActivityMonitor, ActivityMonitor);


/**
 * Simulates an event that updates the user to being non-idle.
 * @param {EventType=} opt_type The type of event that made the user
 *     not idle. If not specified, defaults to MOUSEMOVE.
 */
MockActivityMonitor.prototype.simulateEvent = function(opt_type) {
 var eventTime = Date.now();
 var eventType = opt_type || EventType.MOUSEMOVE;

 this.eventFired_ = false;
 this.updateIdleTime(eventTime, eventType);

 if (!this.eventFired_) {
   this.dispatchEvent(ActivityMonitor.Event.ACTIVITY);
 }
};


/**
 * @override
 */
MockActivityMonitor.prototype.dispatchEvent = function(e) {
 var rv = MockActivityMonitor.base(this, 'dispatchEvent', e);
 this.eventFired_ = true;
 return rv;
};
