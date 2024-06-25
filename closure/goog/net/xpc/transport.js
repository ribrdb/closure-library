/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Contains the base class for transports.
 */


goog.declareModuleId('goog.net.xpc.transport');

import { Disposable } from '../../disposable/disposable.js';
import * as dom from '../../dom/dom.js';
import { TransportNames } from './xpc.js';



/**
 * The base class for transports.
 * @param {dom.DomHelper=} opt_domHelper The dom helper to use for
 *     finding the window objects.
 * @constructor
 * @extends {Disposable};
 */
export function Transport(opt_domHelper) {
 Disposable.call(this);

 /**
   * The dom helper to use for finding the window objects to reference.
   * @type {dom.DomHelper}
   * @private
   */
 this.domHelper_ = opt_domHelper || dom.getDomHelper();
}
goog.inherits(Transport, Disposable);


/**
 * The transport type.
 * @type {number}
 * @protected
 */
Transport.prototype.transportType = 0;


/**
 * @return {number} The transport type identifier.
 */
Transport.prototype.getType = function() {
 return this.transportType;
};


/**
 * Returns the window associated with this transport instance.
 * @return {!Window} The window to use.
 */
Transport.prototype.getWindow = function() {
 return this.domHelper_.getWindow();
};


/**
 * Return the transport name.
 * @return {string} the transport name.
 */
Transport.prototype.getName = function() {
 return TransportNames[String(this.transportType)] || '';
};


/**
 * Handles transport service messages (internal signalling).
 * @param {string} payload The message content.
 */
Transport.prototype.transportServiceHandler = goog.abstractMethod;


/**
 * Connects this transport.
 * The transport implementation is expected to call
 * CrossPageChannel.prototype.notifyConnected when the channel is ready
 * to be used.
 */
Transport.prototype.connect = goog.abstractMethod;


/**
 * Sends a message.
 * @param {string} service The name off the service the message is to be
 * delivered to.
 * @param {string} payload The message content.
 */
Transport.prototype.send = goog.abstractMethod;
