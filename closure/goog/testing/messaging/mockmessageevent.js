/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A simple mock class for imitating HTML5 MessageEvents.
 */

goog.setTestOnly('goog.testing.messaging.MockMessageEvent');

import { BrowserEvent } from '../../events/browserevent.js';
import { EventType } from '../../events/eventtype.js';
import { Event } from '../events/events.js';



/**
 * Creates a new fake MessageEvent.
 *
 * @param {*} data The data of the message.
 * @param {string=} opt_origin The origin of the message, for server-sent and
 *     cross-document events.
 * @param {string=} opt_lastEventId The last event ID, for server-sent events.
 * @param {Window=} opt_source The proxy for the source window, for
 *     cross-document events.
 * @param {Array<MessagePort>=} opt_ports The Array of ports sent with the
 *     message, for cross-document and channel events.
 * @extends {Event}
 * @constructor
 * @final
 */
export function MockMessageEvent(data, opt_origin, opt_lastEventId, opt_source, opt_ports) {
 MockMessageEvent.base(
     this, 'constructor', EventType.MESSAGE);

 /**
  * The data of the message.
  * @type {*}
  */
 this.data = data;

 /**
  * The origin of the message, for server-sent and cross-document events.
  * @type {?string}
  */
 this.origin = opt_origin || null;

 /**
  * The last event ID, for server-sent events.
  * @type {?string}
  */
 this.lastEventId = opt_lastEventId || null;

 /**
  * The proxy for the source window, for cross-document events.
  * @type {Window}
  */
 this.source = opt_source || null;

 /**
  * The Array of ports sent with the message, for cross-document and channel
  * events.
  * @type {Array<!MessagePort>}
  */
 this.ports = opt_ports || null;
}
goog.inherits(
    MockMessageEvent, Event);


/**
 * Wraps a new fake MessageEvent in a BrowserEvent, like how a real MessageEvent
 * would be wrapped.
 *
 * @param {*} data The data of the message.
 * @param {string=} opt_origin The origin of the message, for server-sent and
 *     cross-document events.
 * @param {string=} opt_lastEventId The last event ID, for server-sent events.
 * @param {Window=} opt_source The proxy for the source window, for
 *     cross-document events.
 * @param {Array<MessagePort>=} opt_ports The Array of ports sent with the
 *     message, for cross-document and channel events.
 * @return {!BrowserEvent} The wrapping event.
 */
MockMessageEvent.wrap = function(
    data, opt_origin, opt_lastEventId, opt_source, opt_ports) {
 return new BrowserEvent(
     new MockMessageEvent(
         data, opt_origin, opt_lastEventId, opt_source, opt_ports));
};
