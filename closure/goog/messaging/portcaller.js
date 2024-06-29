/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview The leaf node of a {@link PortNetwork}. Callers
 * connect to the operator, and request connections with other contexts from it.
 */

import { Disposable } from '../disposable/disposable.js';

import { Deferred } from '../../../third_party/closure/goog/mochikit/async/deferred.js';
import { dispose } from '../disposable/dispose.js';
import { DeferredChannel } from './deferredchannel.js';
import { PortChannel } from './portchannel.js';
import { PortNetwork } from './portnetwork.js';  // interface
import object from '../object/object.js';
const { MessageChannel } = goog.requireType('goog.messaging.messagechannel');



/**
 * The leaf node of a network.
 *
 * @param {!MessageChannel} operatorPort The channel for
 *     communicating with the operator. The other side of this channel should be
 *     passed to {@link goog.messaging.PortOperator#addPort}. Must be either a
 *     {@link PortChannel} or a decorator wrapping a PortChannel;
 *     in particular, it must be able to send and receive {@link MessagePort}s.
 * @constructor
 * @extends {Disposable}
 * @implements {PortNetwork}
 * @final
 */
export function PortCaller(operatorPort) {
  PortCaller.base(this, 'constructor');

  /**
   * The channel to the {@link goog.messaging.PortOperator} for this network.
   *
   * @type {!MessageChannel}
   * @private
   */
  this.operatorPort_ = operatorPort;

  /**
     * The collection of channels for communicating with other contexts in the
     * network. Each value can contain a {@link goog.aync.Deferred} and/or a
     * {@link MessageChannel}.
     *
     * If the value contains a Deferred, then the channel is a
     * {@link DeferredChannel} wrapping that Deferred. The Deferred
     * will be resolved with a {@link PortChannel} once we receive
     * the appropriate port from the operator. This is the situation when this
     * caller requests a connection to another context; the DeferredChannel is
     * used to queue up messages until we receive the port from the operator.
     *
     * If the value does not contain a Deferred, then the channel is simply a
     * {@link PortChannel} communicating with the given context.
     * This is the situation when this context received a port for the other
     * context before it was requested.
     *
     * If a value exists for a given key, it must contain a channel, but it
     * doesn't necessarily contain a Deferred.
     *
     * @type {!Object<{deferred: Deferred,
     *                  channel: !MessageChannel}>}
     * @private
     */
  this.connections_ = {};

  this.operatorPort_.registerService(
      PortNetwork.GRANT_CONNECTION_SERVICE,
      goog.bind(this.connectionGranted_, this), true /* opt_json */);
}
goog.inherits(PortCaller, Disposable);


/** @override */
PortCaller.prototype.dial = function(name) {
  if (name in this.connections_) {
    return this.connections_[name].channel;
  }

  this.operatorPort_.send(
      PortNetwork.REQUEST_CONNECTION_SERVICE, name);
  const deferred = new Deferred();
  const channel = new DeferredChannel(deferred);
  this.connections_[name] = {deferred: deferred, channel: channel};
  return channel;
};


/**
 * Registers a connection to another context in the network. This is called when
 * the operator sends us one end of a {@link MessageChannel}, either because
 * this caller requested a connection with another context, or because that
 * context requested a connection with this caller.
 *
 * It's possible that the remote context and this one request each other roughly
 * concurrently. The operator doesn't keep track of which contexts have been
 * connected, so it will create two separate {@link MessageChannel}s in this
 * case. However, the first channel created will reach both contexts first, so
 * we simply ignore all connections with a given context after the first.
 *
 * @param {!Object|string} message The name of the context
 *     being connected and the port connecting the context.
 * @private
 */
PortCaller.prototype.connectionGranted_ = function(message) {
  const args = /** @type {{name: string, port: MessagePort}} */ (message);
  const port = args['port'];
  const entry = this.connections_[args['name']];
  if (entry && (!entry.deferred || entry.deferred.hasFired())) {
    // If two PortCallers request one another at the same time, the operator may
    // send out a channel for connecting them multiple times. Since both callers
    // will receive the first channel's ports first, we can safely ignore and
    // close any future ports.
    port.close();
  } else if (!args['success']) {
    throw new Error(args['message']);
  } else {
    port.start();
    const channel = new PortChannel(port);
    if (entry) {
      entry.deferred.callback(channel);
    } else {
      this.connections_[args['name']] = {channel: channel, deferred: null};
    }
  }
};


/** @override */
PortCaller.prototype.disposeInternal = function() {
  dispose(this.operatorPort_);
  object.forEach(this.connections_, dispose);
  delete this.operatorPort_;
  delete this.connections_;
  PortCaller.base(this, 'disposeInternal');
};
