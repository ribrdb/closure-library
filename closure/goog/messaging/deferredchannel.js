/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A MessageChannel decorator that wraps a deferred MessageChannel
 * and enqueues messages and service registrations until that channel exists.
 */

import { Disposable } from '../disposable/disposable.js';

import { MessageChannel } from './messagechannel.js';
const { Deferred } = goog.requireType('goog.mochikit.async.deferred');


/**
 * Creates a new DeferredChannel, which wraps a deferred MessageChannel and
 * enqueues messages to be sent once the wrapped channel is resolved.
 *
 * @param {!Deferred<!MessageChannel>} deferredChannel
 *     The underlying deferred MessageChannel.
 * @constructor
 * @extends {Disposable}
 * @implements {MessageChannel}
 * @final
 */
export function DeferredChannel(deferredChannel) {
  DeferredChannel.base(this, 'constructor');

  /** @private {!Deferred<!MessageChannel>} */
  this.deferred_ = deferredChannel;
}
goog.inherits(DeferredChannel, Disposable);


/**
 * Cancels the wrapped Deferred.
 */
DeferredChannel.prototype.cancel = function() {
  this.deferred_.cancel();
};


/** @override */
DeferredChannel.prototype.connect = function(opt_connectCb) {
  if (opt_connectCb) {
    opt_connectCb();
  }
};


/** @override */
DeferredChannel.prototype.isConnected = function() {
  return true;
};


/** @override */
DeferredChannel.prototype.registerService = function(
    serviceName, callback, opt_objectPayload) {
  this.deferred_.addCallback(function(resolved) {
    resolved.registerService(serviceName, callback, opt_objectPayload);
  });
};


/** @override */
DeferredChannel.prototype.registerDefaultService = function(
    callback) {
  this.deferred_.addCallback(function(resolved) {
    resolved.registerDefaultService(callback);
  });
};


/** @override */
DeferredChannel.prototype.send = function(serviceName, payload) {
  this.deferred_.addCallback(function(resolved) {
    resolved.send(serviceName, payload);
  });
};


/** @override */
DeferredChannel.prototype.disposeInternal = function() {
  this.cancel();
  DeferredChannel.base(this, 'disposeInternal');
};
