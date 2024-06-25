/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Base class for objects monitoring and exposing runtime
 * network status information.
 */

import { Listenable } from '../events/listenable.js';



/**
 * Base class for network status information providers.
 * @interface
 * @extends {Listenable}
 */
export function NetworkStatusMonitor() {}


/**
 * Enum for the events dispatched by the OnlineHandler.
 * @enum {string}
 */
NetworkStatusMonitor.EventType = {
  ONLINE: 'online',
  OFFLINE: 'offline',
};


/**
 * @return {boolean} Whether the system is online or otherwise.
 */
NetworkStatusMonitor.prototype.isOnline;
