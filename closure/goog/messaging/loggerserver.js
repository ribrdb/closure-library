/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview This class listens on a message channel for logger commands and
 * logs them on the local page. This is useful when dealing with message
 * channels to contexts that don't have access to their own logging facilities.
 */

import { Disposable } from '../disposable/disposable.js';

import * as googLog from '../log/log.js';
import * as log from '../log/log.js';
const Level = googLog.Level;
const {MessageChannel} = goog.requireType('goog.messaging.messagechannel');

/**
 * A logger server that logs messages on behalf of the remote end of a
 * message channel. The remote end of the channel should use a
 * {LoggerClient} with the same service name.
 * @final
 */
class LoggerServer extends Disposable {
  /**
   * Creates a LoggerServer instance.
   *
   * @param {!MessageChannel} channel The channel that is sending
   *     the log messages.
   * @param {string} serviceName The name of the logging service to listen for.
   * @param {string=} channelName The name of this channel. Used to help
   *     distinguish this client's messages.
   */
  constructor(channel, serviceName, channelName) {
    super();

    /**
     * The channel that is sending the log messages.
     * @type {!MessageChannel}
     * @private
     */
    this.channel_ = channel;

    /**
     * The name of the logging service to listen for.
     * @type {string}
     * @private
     */
    this.serviceName_ = serviceName;

    /**
     * The name of the channel.
     * @type {string}
     * @private
     */
    this.channelName_ = channelName || 'remote logger';

    this.channel_.registerService(
        this.serviceName_, this.log_.bind(this), true /* opt_json */);
  }

  /**
   * Handles logging messages from the client.
   * @param {!Object|string} message
   *     The logging information from the client.
   * @private
   */
  log_(message) {
    const args =
        /**
         * @type {{level: number, message: string,
         *           name: string, exception: Object}}
         */
        (message);
    const level = Level.getPredefinedLevelByValue(args['level']);
    if (level) {
      const msg = '[' + this.channelName_ + '] ' + args['message'];
      log.log(log.getLogger(args['name']), level, msg, args['exception']);
    }
  }

  /** @override */
  disposeInternal() {
    super.disposeInternal();
    this.channel_.registerService(this.serviceName_, () => {}, true);
    delete this.channel_;
  }
}
export { LoggerServer };
