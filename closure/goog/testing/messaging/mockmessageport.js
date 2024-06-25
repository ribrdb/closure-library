/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A simple dummy class for representing message ports in tests.
 */

goog.setTestOnly('goog.testing.messaging.MockMessagePort');

import { EventTarget } from '../../events/eventtarget.js';
import { MockControl } from '../mockcontrol.js';



/**
 * Class for unit-testing code that uses MessagePorts.
 * @param {*} id An opaque identifier, used because message ports otherwise have
 *     no distinguishing characteristics.
 * @param {MockControl} mockControl The mock control used to create
 *     the method mock for #postMessage.
 * @constructor
 * @extends {EventTarget}
 * @final
 */
export function MockMessagePort(id, mockControl) {
 MockMessagePort.base(this, 'constructor');

 /**
  * An opaque identifier, used because message ports otherwise have no
  * distinguishing characteristics.
  * @type {*}
  */
 this.id = id;

 /**
  * Whether or not the port has been started.
  * @type {boolean}
  */
 this.started = false;

 /**
  * Whether or not the port has been closed.
  * @type {boolean}
  */
 this.closed = false;

 mockControl.createMethodMock(this, 'postMessage');
}
goog.inherits(MockMessagePort, EventTarget);


/**
 * A mock postMessage funciton. Actually an instance of
 * {@link goog.testing.FunctionMock}.
 * @param {*} message The message to send.
 * @param {Array<MessagePort>=} opt_ports Ports to send with the message.
 */
MockMessagePort.prototype.postMessage = function(
    message, opt_ports) {};


/**
 * Starts the port.
 */
MockMessagePort.prototype.start = function() {
 this.started = true;
};


/**
 * Closes the port.
 */
MockMessagePort.prototype.close = function() {
 this.closed = true;
};
