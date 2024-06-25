/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview NetworkStatusMonitor test double.
 */

goog.setTestOnly('goog.testing.events.OnlineHandler');

import { EventTarget } from '../../events/eventtarget.js';
import { NetworkStatusMonitor } from '../../net/networkstatusmonitor.js';



/**
 * NetworkStatusMonitor test double.
 * @param {boolean} initialState The initial online state of the mock.
 * @constructor
 * @extends {EventTarget}
 * @implements {NetworkStatusMonitor}
 * @final
 */
export function OnlineHandler(initialState) {
 OnlineHandler.base(this, 'constructor');

 /**
  * Whether the mock is online.
  * @private {boolean}
  */
 this.online_ = initialState;
}
goog.inherits(OnlineHandler, EventTarget);


/** @override */
OnlineHandler.prototype.isOnline = function() {
 return this.online_;
};


/**
 * Sets the online state.
 * @param {boolean} newOnlineState The new online state.
 */
OnlineHandler.prototype.setOnline = function(
    newOnlineState) {
 if (newOnlineState != this.online_) {
   this.online_ = newOnlineState;
   this.dispatchEvent(
       newOnlineState ? NetworkStatusMonitor.EventType.ONLINE :
                        NetworkStatusMonitor.EventType.OFFLINE);
 }
};
