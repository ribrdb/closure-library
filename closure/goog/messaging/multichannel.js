/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Definition of MultiChannel, which uses a
 * single underlying MessageChannel to carry several independent virtual message
 * channels.
 */


import { Disposable } from '../disposable/disposable.js';

import { dispose } from '../disposable/dispose.js';
import * as log from '../log/log.js';
import { MessageChannel } from './messagechannel.js';  // interface
import object from '../object/object.js';



/**
 * Creates a new MultiChannel wrapping a single MessageChannel. The
 * underlying channel shouldn't have any other listeners registered, but it
 * should be connected.
 *
 * Note that the other side of the channel should also be connected to a
 * MultiChannel with the same number of virtual channels.
 *
 * @param {MessageChannel} underlyingChannel The underlying
 *     channel to use as transport for the virtual channels.
 * @constructor
 * @extends {Disposable}
 * @final
 */
export function MultiChannel(underlyingChannel) {
  MultiChannel.base(this, 'constructor');

  /**
     * The underlying channel across which all requests are sent.
     * @type {MessageChannel}
     * @private
     */
  this.underlyingChannel_ = underlyingChannel;

  /**
     * All the virtual channels that are registered for this MultiChannel.
     * These are null if they've been disposed.
     * @type {Object<?MultiChannel.VirtualChannel>}
     * @private
     */
  this.virtualChannels_ = {};

  this.underlyingChannel_.registerDefaultService(
      goog.bind(this.handleDefault_, this));
}
goog.inherits(MultiChannel, Disposable);


/**
 * Logger object for MultiChannel.
 * @type {log.Logger}
 * @private
 */
MultiChannel.prototype.logger_ =
    log.getLogger('goog.messaging.MultiChannel');


/**
 * Creates a new virtual channel that will communicate across the underlying
 * channel.
 * @param {string} name The name of the virtual channel. Must be unique for this
 *     MultiChannel. Cannot contain colons.
 * @return {!MultiChannel.VirtualChannel} The new virtual
 *     channel.
 */
MultiChannel.prototype.createVirtualChannel = function(name) {
  if (name.indexOf(':') != -1) {
    throw new Error(
        'Virtual channel name "' + name + '" should not contain colons');
  }

  if (name in this.virtualChannels_) {
    throw new Error(
        'Virtual channel "' + name + '" was already created for ' +
        'this multichannel.');
  }

  const channel = new MultiChannel.VirtualChannel(this, name);
  this.virtualChannels_[name] = channel;
  return channel;
};


/**
 * Handles the default service for the underlying channel. This dispatches any
 * unrecognized services to the appropriate virtual channel.
 *
 * @param {string} serviceName The name of the service being called.
 * @param {string|!Object} payload The message payload.
 * @private
 */
MultiChannel.prototype.handleDefault_ = function(
    serviceName, payload) {
  const match = serviceName.match(/^([^:]*):(.*)/);
  if (!match) {
    log.warning(
        this.logger_, 'Invalid service name "' + serviceName + '": no ' +
            'virtual channel specified');
    return;
  }

  const channelName = match[1];
  serviceName = match[2];
  if (!(channelName in this.virtualChannels_)) {
    log.warning(
        this.logger_, 'Virtual channel "' + channelName + ' does not ' +
            'exist, but a message was received for it: "' + serviceName + '"');
    return;
  }

  const virtualChannel = this.virtualChannels_[channelName];
  if (!virtualChannel) {
    log.warning(
        this.logger_, 'Virtual channel "' + channelName + ' has been ' +
            'disposed, but a message was received for it: "' + serviceName +
            '"');
    return;
  }

  if (!virtualChannel.defaultService_) {
    log.warning(
        this.logger_, 'Service "' + serviceName + '" is not registered ' +
            'on virtual channel "' + channelName + '"');
    return;
  }

  virtualChannel.defaultService_(serviceName, payload);
};


/** @override */
MultiChannel.prototype.disposeInternal = function() {
  object.forEach(this.virtualChannels_, function(channel) {
    dispose(channel);
  });
  dispose(this.underlyingChannel_);
  delete this.virtualChannels_;
  delete this.underlyingChannel_;
};



/**
 * A message channel that proxies its messages over another underlying channel.
 *
 * @param {MultiChannel} parent The MultiChannel
 *     which created this channel, and which contains the underlying
 *     MessageChannel that's used as the transport.
 * @param {string} name The name of this virtual channel. Unique among the
 *     virtual channels in parent.
 * @constructor
 * @implements {MessageChannel}
 * @extends {Disposable}
 * @final
 */
MultiChannel.VirtualChannel = function(parent, name) {
  MultiChannel.VirtualChannel.base(this, 'constructor');

  /**
     * The MultiChannel containing the underlying transport channel.
     * @type {MultiChannel}
     * @private
     */
  this.parent_ = parent;

  /**
   * The name of this virtual channel.
   * @type {string}
   * @private
   */
  this.name_ = name;
};
goog.inherits(MultiChannel.VirtualChannel, Disposable);


/**
 * The default service to run if no other services match.
 * @type {?function(string, (string|!Object))}
 * @private
 */
MultiChannel.VirtualChannel.prototype.defaultService_;


/**
 * Logger object for MultiChannel.VirtualChannel.
 * @type {log.Logger}
 * @private
 */
MultiChannel.VirtualChannel.prototype.logger_ =
    log.getLogger('goog.messaging.MultiChannel.VirtualChannel');


/**
 * This is a no-op, since the underlying channel is expected to already be
 * initialized when it's passed in.
 *
 * @override
 */
MultiChannel.VirtualChannel.prototype.connect = function(
    opt_connectCb) {
  if (opt_connectCb) {
    opt_connectCb();
  }
};


/**
 * This always returns true, since the underlying channel is expected to already
 * be initialized when it's passed in.
 *
 * @override
 */
MultiChannel.VirtualChannel.prototype.isConnected = function() {
  return true;
};


/**
 * @override
 */
MultiChannel.VirtualChannel.prototype.registerService = function(
    serviceName, callback, opt_objectPayload) {
  this.parent_.underlyingChannel_.registerService(
      this.name_ + ':' + serviceName,
      goog.bind(this.doCallback_, this, callback), opt_objectPayload);
};


/**
 * @override
 */
MultiChannel.VirtualChannel.prototype.registerDefaultService =
    function(callback) {
      this.defaultService_ = goog.bind(this.doCallback_, this, callback);
    };


/**
 * @override
 */
MultiChannel.VirtualChannel.prototype.send = function(
    serviceName, payload) {
  if (this.isDisposed()) {
    throw new Error('#send called for disposed VirtualChannel.');
  }

  this.parent_.underlyingChannel_.send(this.name_ + ':' + serviceName, payload);
};


/**
 * Wraps a callback with a function that will log a warning and abort if it's
 * called when this channel is disposed.
 *
 * @param {!Function} callback The callback to wrap.
 * @param {...*} var_args Other arguments, passed to the callback.
 * @private
 */
MultiChannel.VirtualChannel.prototype.doCallback_ = function(
    callback, var_args) {
  if (this.isDisposed()) {
    log.warning(
        this.logger_, 'Virtual channel "' + this.name_ + '" received ' +
            ' a message after being disposed.');
    return;
  }

  callback.apply({}, Array.prototype.slice.call(arguments, 1));
};


/** @override */
MultiChannel.VirtualChannel.prototype.disposeInternal =
    function() {
      this.parent_.virtualChannels_[this.name_] = null;
      this.parent_ = null;
    };
