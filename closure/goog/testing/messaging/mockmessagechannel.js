/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Mock MessageChannel implementation that can receive fake
 * messages and test that the right messages are sent.
 */


goog.setTestOnly('goog.testing.messaging.MockMessageChannel');

import { AbstractChannel } from '../../messaging/abstractchannel.js';
import { MockControl } from '../mockcontrol.js';
import * as asserts from '../asserts.js';



/**
 * Class for unit-testing code that communicates over a MessageChannel.
 * @param {MockControl} mockControl The mock control used to create
 *   the method mock for #send.
 * @extends {AbstractChannel}
 * @constructor
 * @final
 */
export function MockMessageChannel(mockControl) {
 MockMessageChannel.base(this, 'constructor');

 /**
  * Whether the channel has been disposed.
  * @type {boolean}
  */
 this.disposed = false;

 mockControl.createMethodMock(this, 'send');
}
goog.inherits(
    MockMessageChannel, AbstractChannel);


/**
 * A mock send function. Actually an instance of
 * {@link goog.testing.FunctionMock}.
 * @param {string} serviceName The name of the remote service to run.
 * @param {string|!Object} payload The payload to send to the remote page.
 * @override
 */
MockMessageChannel.prototype.send = function(
    serviceName, payload) {};


/**
 * Sets a flag indicating that this is disposed.
 * @override
 */
MockMessageChannel.prototype.dispose = function() {
 this.disposed = true;
};


/**
 * Mocks the receipt of a message. Passes the payload the appropriate service.
 * @param {string} serviceName The service to run.
 * @param {string|!Object} payload The argument to pass to the service.
 */
MockMessageChannel.prototype.receive = function(
    serviceName, payload) {
 this.deliver(serviceName, payload);
};
