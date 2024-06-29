/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Default factory for <code>WebChannelTransport</code> to
 * avoid exposing concrete classes to clients.
 */

import { WebChannelBaseTransport } from './webchannel/webchannelbasetransport.js';

const { WebChannelTransport } = goog.requireType('goog.labs.net.webchanneltransport');


/**
 * Create a new WebChannelTransport instance using the default implementation.
 * Throws an error message if no default transport available in the current
 * environment.
 *
 * @return {!WebChannelTransport} the newly created transport instance.
 */
export function createWebChannelTransport() {
 return new WebChannelBaseTransport();
}
