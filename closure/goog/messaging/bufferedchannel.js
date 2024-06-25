/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A wrapper for asynchronous message-passing channels that buffer
 * their output until both ends of the channel are connected.
 */

import { Disposable } from '../disposable/disposable.js';

import { Timer } from '../timer/timer.js';
import { dispose } from '../disposable/dispose.js';
import * as events from '../events/events.js';
import * as log from '../log/log.js';
import { MessageChannel } from './messagechannel.js';
import { MultiChannel } from './multichannel.js';



/**
 * Creates a new BufferedChannel, which operates like its underlying channel
 * except that it buffers calls to send until it receives a message from its
 * peer claiming that the peer is ready to receive.  The peer is also expected
 * to be a BufferedChannel, though this is not enforced.
 *
 * @param {!MessageChannel} messageChannel The MessageChannel
 *     we're wrapping.
 * @param {number=} opt_interval Polling interval for sending ready
 *     notifications to peer, in ms.  Default is 50.
 * @constructor
 * @extends {Disposable}
 * @implements {MessageChannel};
 * @final
 */
export function BufferedChannel(messageChannel, opt_interval) {
  Disposable.call(this);

  /**
   * Buffer of messages to be sent when the channel's peer is ready.
   *
   * @type {Array<Object>}
   * @private
   */
  this.buffer_ = [];

  /**
     * Channel dispatcher wrapping the underlying delegate channel.
     *
     * @type {!MultiChannel}
     * @private
     */
  this.multiChannel_ = new MultiChannel(messageChannel);

  /**
     * Virtual channel for carrying the user's messages.
     *
     * @type {!MessageChannel}
     * @private
     */
  this.userChannel_ = this.multiChannel_.createVirtualChannel(
      BufferedChannel.USER_CHANNEL_NAME_);

  /**
     * Virtual channel for carrying control messages for BufferedChannel.
     *
     * @type {!MessageChannel}
     * @private
     */
  this.controlChannel_ = this.multiChannel_.createVirtualChannel(
      BufferedChannel.CONTROL_CHANNEL_NAME_);

  /**
     * Timer for the peer ready ping loop.
     *
     * @type {Timer}
     * @private
     */
  this.timer_ = new Timer(
      opt_interval || BufferedChannel.DEFAULT_INTERVAL_MILLIS_);

  this.timer_.start();
  events.listen(
      this.timer_, Timer.TICK, this.sendReadyPing_, false, this);

  this.controlChannel_.registerService(
      BufferedChannel.PEER_READY_SERVICE_NAME_,
      goog.bind(this.setPeerReady_, this));
}
goog.inherits(BufferedChannel, Disposable);


/**
 * Default polling interval (in ms) for setPeerReady_ notifications.
 *
 * @type {number}
 * @const
 * @private
 */
BufferedChannel.DEFAULT_INTERVAL_MILLIS_ = 50;


/**
 * The name of the private service which handles peer ready pings.  The
 * service registered with this name is bound to this.setPeerReady_, an internal
 * part of BufferedChannel's implementation that clients should not send to
 * directly.
 *
 * @type {string}
 * @const
 * @private
 */
BufferedChannel.PEER_READY_SERVICE_NAME_ = 'setPeerReady_';


/**
 * The name of the virtual channel along which user messages are sent.
 *
 * @type {string}
 * @const
 * @private
 */
BufferedChannel.USER_CHANNEL_NAME_ = 'user';


/**
 * The name of the virtual channel along which internal control messages are
 * sent.
 *
 * @type {string}
 * @const
 * @private
 */
BufferedChannel.CONTROL_CHANNEL_NAME_ = 'control';


/** @override */
BufferedChannel.prototype.connect = function(opt_connectCb) {
  if (opt_connectCb) {
    opt_connectCb();
  }
};


/** @override */
BufferedChannel.prototype.isConnected = function() {
  return true;
};


/**
 * @return {boolean} Whether the channel's peer is ready.
 */
BufferedChannel.prototype.isPeerReady = function() {
  return this.peerReady_;
};


/**
 * Logger.
 *
 * @type {log.Logger}
 * @const
 * @private
 */
BufferedChannel.prototype.logger_ =
    log.getLogger('goog.messaging.bufferedchannel');


/**
 * Handles one tick of our peer ready notification loop.  This entails sending a
 * ready ping to the peer and shutting down the loop if we've received a ping
 * ourselves.
 *
 * @private
 */
BufferedChannel.prototype.sendReadyPing_ = function() {
  try {
    this.controlChannel_.send(
        BufferedChannel.PEER_READY_SERVICE_NAME_,
        /* payload */ this.isPeerReady() ? '1' : '');
  } catch (e) {
    this.timer_.stop();  // So we don't keep calling send and re-throwing.
    throw e;
  }
};


/**
  * Whether or not the peer channel is ready to receive messages.
  *
  * @type {boolean}
  * @private
  */
BufferedChannel.prototype.peerReady_;


/** @override */
BufferedChannel.prototype.registerService = function(
    serviceName, callback, opt_objectPayload) {
  this.userChannel_.registerService(serviceName, callback, opt_objectPayload);
};


/** @override */
BufferedChannel.prototype.registerDefaultService = function(
    callback) {
  this.userChannel_.registerDefaultService(callback);
};


/**
 * Send a message over the channel.  If the peer is not ready, the message will
 * be buffered and sent once we've received a ready message from our peer.
 *
 * @param {string} serviceName The name of the service this message should be
 *     delivered to.
 * @param {string|!Object} payload The value of the message. If this is an
 *     Object, it is serialized to JSON before sending.  It's the responsibility
 *     of implementors of this class to perform the serialization.
 * @see goog.net.xpc.BufferedChannel.send
 * @override
 */
BufferedChannel.prototype.send = function(serviceName, payload) {
  if (this.isPeerReady()) {
    this.userChannel_.send(serviceName, payload);
  } else {
    log.fine(
        BufferedChannel.prototype.logger_,
        'buffering message ' + serviceName);
    this.buffer_.push({serviceName: serviceName, payload: payload});
  }
};


/**
 * Marks the channel's peer as ready, then sends buffered messages and nulls the
 * buffer.  Subsequent calls to setPeerReady_ have no effect.
 *
 * @param {(!Object|string)} peerKnowsWeKnowItsReady Passed by the peer to
 *     indicate whether it knows that we've received its ping and that it's
 *     ready.  Non-empty if true, empty if false.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
BufferedChannel.prototype.setPeerReady_ = function(
    peerKnowsWeKnowItsReady) {
  if (peerKnowsWeKnowItsReady) {
    this.timer_.stop();
  } else {
    // Our peer doesn't know we're ready, so restart (or continue) pinging.
    // Restarting may be needed if the peer iframe was reloaded after the
    // connection was first established.
    this.timer_.start();
  }

  if (this.peerReady_) {
    return;
  }
  this.peerReady_ = true;
  // Send one last ping so that the peer knows we know it's ready.
  this.sendReadyPing_();
  for (let i = 0; i < this.buffer_.length; i++) {
    const message = this.buffer_[i];
    log.fine(
        BufferedChannel.prototype.logger_,
        'sending buffered message ' + message.serviceName);
    this.userChannel_.send(message.serviceName, message.payload);
  }
  this.buffer_ = null;
};


/** @override */
BufferedChannel.prototype.disposeInternal = function() {
  dispose(this.multiChannel_);
  dispose(this.timer_);
  BufferedChannel.base(this, 'disposeInternal');
};
