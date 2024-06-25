/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview This class manages the network connectivity state.
 *
 */


goog.declareModuleId('goog.labs.net.webchannel.connectionstate');



/**
 * The connectivity state of the channel.
 *
 * To be used for the new buffering-proxy detection algorithm.
 *
 * @constructor
 * @struct
 */
export function ConnectionState() {
 /**
  * Handshake result.
  * @type {?Array<string>}
  */
 this.handshakeResult = null;

 /**
  * The result of checking if there is a buffering proxy in the network.
  * True means the connection is buffered, False means unbuffered,
  * null means that the result is not available.
  * @type {?boolean}
  */
 this.bufferingProxyResult = null;
}
