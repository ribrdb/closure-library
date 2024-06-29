/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A fake PortNetwork implementation that simply produces
 * MockMessageChannels for all ports.
 */

goog.setTestOnly('goog.testing.messaging.MockPortNetwork');

import { PortNetwork } from '../../messaging/portnetwork.js';

// interface
import { MockMessageChannel } from './mockmessagechannel.js';

const { MockControl } = goog.requireType('goog.testing.mockcontrol');



/**
 * The fake PortNetwork.
 *
 * @param {!MockControl} mockControl The mock control for creating
 *     the mock message channels.
 * @constructor
 * @implements {PortNetwork}
 * @final
 */
export function MockPortNetwork(mockControl) {
 /**
  * The mock control for creating mock message channels.
  * @type {!MockControl}
  * @private
  */
 this.mockControl_ = mockControl;

 /**
   * The mock ports that have been created.
   * @type {!Object<!MockMessageChannel>}
   * @private
   */
 this.ports_ = {};
}


/**
 * Get the mock port with the given name.
 * @param {string} name The name of the port to get.
 * @return {!MockMessageChannel} The mock port.
 * @override
 */
MockPortNetwork.prototype.dial = function(name) {
 if (!(name in this.ports_)) {
   this.ports_[name] =
       new MockMessageChannel(this.mockControl_);
 }
 return this.ports_[name];
};
