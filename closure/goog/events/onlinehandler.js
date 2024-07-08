/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview This event handler will dispatch events when
 * `navigator.onLine` changes.  HTML5 defines two events, online and
 * offline that is fired on the window.  We listen to the 'online'
 * and 'offline' events on the current window object.
 *
 * Note that this class only reflects what the browser tells us and this usually
 * only reflects whether the browser is connected to the local network.
 *
 * @see ../demos/onlinehandler.html
 */

import { EventHandler } from './eventhandler.js';

import { EventTarget } from './eventtarget.js';
import { EventType } from './eventtype.js';
import { NetworkStatusMonitor } from '../net/networkstatusmonitor.js';



/**
 * Basic object for detecting whether the online state changes.
 * @constructor
 * @extends {EventTarget}
 * @implements {NetworkStatusMonitor}
 */
export function OnlineHandler() {
 OnlineHandler.base(this, 'constructor');

 /**
     * @private {EventHandler<!OnlineHandler>}
     */
 this.eventHandler_ = new EventHandler(this);

 // Note: On workers, these events are not supported on all browsers. See
 // https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/online_event#browser_compatibility
 this.eventHandler_.listen(
     goog.global,
     [EventType.ONLINE, EventType.OFFLINE],
     this.handleChange_);
}
goog.inherits(OnlineHandler, EventTarget);


/** @override */
OnlineHandler.prototype.isOnline = function() {
 return navigator.onLine;
};


/**
 * Called when the online state changes.  This dispatches the
 * `ONLINE` and `OFFLINE` events respectively.
 * @private
 */
OnlineHandler.prototype.handleChange_ = function() {
 var type = this.isOnline() ? NetworkStatusMonitor.EventType.ONLINE :
                              NetworkStatusMonitor.EventType.OFFLINE;
 this.dispatchEvent(type);
};


/** @override */
OnlineHandler.prototype.disposeInternal = function() {
 OnlineHandler.base(this, 'disposeInternal');
 this.eventHandler_.dispose();
 this.eventHandler_ = null;
};
