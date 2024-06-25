/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview An abstract superclass for message channels that handles the
 * repetitive details of registering and dispatching to services. This is more
 * useful for full-fledged channels than for decorators, since decorators
 * generally delegate service registering anyway.
 */


import { Disposable } from '../disposable/disposable.js';

import * as json from '../json/json.js';
import * as log from '../log/log.js';
import { MessageChannel } from './messagechannel.js';  // interface



/**
 * Creates an abstract message channel.
 *
 * @constructor
 * @extends {Disposable}
 * @implements {MessageChannel}
 */
export function AbstractChannel() {
  AbstractChannel.base(this, 'constructor');

  /**
   * The services registered for this channel.
   * @type {Object<string, {callback: function((string|!Object)),
                             objectPayload: boolean}>}
   * @private
   */
  this.services_ = {};
}
goog.inherits(AbstractChannel, Disposable);


/**
 * The default service to be run when no other services match.
 *
 * @type {?function(string, (string|!Object))}
 * @private
 */
AbstractChannel.prototype.defaultService_;


/**
 * Logger for this class.
 * @type {log.Logger}
 * @protected
 */
AbstractChannel.prototype.logger =
    log.getLogger('goog.messaging.AbstractChannel');


/**
 * Immediately calls opt_connectCb if given, and is otherwise a no-op. If
 * subclasses have configuration that needs to happen before the channel is
 * connected, they should override this and {@link #isConnected}.
 * @override
 */
AbstractChannel.prototype.connect = function(opt_connectCb) {
  if (opt_connectCb) {
    opt_connectCb();
  }
};


/**
 * Always returns true. If subclasses have configuration that needs to happen
 * before the channel is connected, they should override this and
 * {@link #connect}.
 * @override
 */
AbstractChannel.prototype.isConnected = function() {
  return true;
};


/** @override */
AbstractChannel.prototype.registerService = function(
    serviceName, callback, opt_objectPayload) {
  this.services_[serviceName] = {
    callback: callback,
    objectPayload: !!opt_objectPayload
  };
};


/** @override */
AbstractChannel.prototype.registerDefaultService = function(
    callback) {
  this.defaultService_ = callback;
};


/** @override */
AbstractChannel.prototype.send = goog.abstractMethod;


/**
 * Delivers a message to the appropriate service. This is meant to be called by
 * subclasses when they receive messages.
 *
 * This method takes into account both explicitly-registered and default
 * services, as well as making sure that JSON payloads are decoded when
 * necessary. If the subclass is capable of passing objects as payloads, those
 * objects can be passed in to this method directly. Otherwise, the (potentially
 * JSON-encoded) strings should be passed in.
 *
 * @param {string} serviceName The name of the service receiving the message.
 * @param {string|!Object} payload The contents of the message.
 * @protected
 */
AbstractChannel.prototype.deliver = function(
    serviceName, payload) {
  const service = this.getService(serviceName, payload);
  if (!service) {
    return;
  }

  const decodedPayload =
      this.decodePayload(serviceName, payload, service.objectPayload);
  if (decodedPayload != null) {
    service.callback(decodedPayload);
  }
};


/**
 * Find the service object for a given service name. If there's no service
 * explicitly registered, but there is a default service, a service object is
 * constructed for it.
 *
 * @param {string} serviceName The name of the service receiving the message.
 * @param {string|!Object} payload The contents of the message.
 * @return {?{callback: function((string|!Object)), objectPayload: boolean}} The
 *     service object for the given service, or null if none was found.
 * @protected
 */
AbstractChannel.prototype.getService = function(
    serviceName, payload) {
  const service = this.services_[serviceName];
  if (service) {
    return service;
  } else if (this.defaultService_) {
    const callback = goog.partial(this.defaultService_, serviceName);
    const objectPayload = goog.isObject(payload);
    return {callback: callback, objectPayload: objectPayload};
  }

  log.warning(this.logger, 'Unknown service name "' + serviceName + '"');
  return null;
};


/**
 * Converts the message payload into the format expected by the registered
 * service (either JSON or string).
 *
 * @param {string} serviceName The name of the service receiving the message.
 * @param {string|!Object} payload The contents of the message.
 * @param {boolean} objectPayload Whether the service expects an object or a
 *     plain string.
 * @return {string|Object} The payload in the format expected by the service, or
 *     null if something went wrong.
 * @protected
 */
AbstractChannel.prototype.decodePayload = function(
    serviceName, payload, objectPayload) {
  if (objectPayload && typeof payload === 'string') {
    try {
      return /** @type {!Object} */ (JSON.parse(payload));
    } catch (err) {
      log.warning(
          this.logger, 'Expected JSON payload for ' + serviceName + ', was "' +
              payload + '"');
      return null;
    }
  } else if (!objectPayload && typeof payload !== 'string') {
    return json.serialize(payload);
  }
  return payload;
};


/** @override */
AbstractChannel.prototype.disposeInternal = function() {
  AbstractChannel.base(this, 'disposeInternal');
  delete this.services_;
  delete this.defaultService_;
};
