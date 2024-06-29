/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Transport support for WebChannel.
 *
 * The <code>WebChannelTransport</code> implementation serves as the factory
 * for <code>WebChannel</code>, which offers an abstraction for
 * point-to-point socket-like communication similar to what BrowserChannel
 * or HTML5 WebSocket offers.
 */

goog.declareModuleId('goog.labs.net.webchanneltransport');

const { WebChannel } = goog.requireType('goog.labs.net.webchannel');



/**
 * A WebChannelTransport instance represents a shared context of logical
 * connectivity between a browser client and a remote origin.
 *
 * Over a single WebChannelTransport instance, multiple WebChannels may be
 * created against different URLs, which may all share the same
 * underlying connectivity (i.e. TCP connection) whenever possible.
 *
 * When multi-domains are supported, such as CORS, multiple origins may be
 * supported over a single WebChannelTransport instance at the same time.
 *
 * Sharing between different window contexts such as tabs is not addressed
 * by WebChannelTransport. Applications may choose HTML5 shared workers
 * or other techniques to access the same transport instance
 * across different window contexts.
 *
 * @interface
 */
export function WebChannelTransport() {}


/**
 * The client version. This integer value will be passed to the server
 * when a channel is opened to inform the server the client "capabilities".
 *
 * Wire protocol version is a different concept and is internal to the
 * transport implementation.
 *
 * @const
 * @type {number}
 */
WebChannelTransport.CLIENT_VERSION = 22;


/**
 * Create a new WebChannel instance.
 *
 * The new WebChannel is to be opened against the server-side resource
 * as specified by the given URL. See {@link WebChannel} for detailed
 * semantics.
 *
 * @param {string} url The URL path for the new WebChannel instance.
 * @param {!WebChannel.Options=} opt_options Configuration for the
 *     new WebChannel instance. The configuration object is reusable after
 *     the new channel instance is created.
 * @return {!WebChannel} the newly created WebChannel instance.
 */
WebChannelTransport.prototype.createWebChannel = goog.abstractMethod;
