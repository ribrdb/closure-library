/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview This class sends logging messages over a message channel to a
 * server on the main page that prints them using standard logging mechanisms.
 */

import { Disposable } from '../disposable/disposable.js';

import * as debug from '../debug/debug.js';
import * as log from '../log/log.js';
const { MessageChannel } = goog.requireType('goog.messaging.messagechannel');


/**
 * Creates a logger client that sends messages along a message channel for the
 * remote end to log. The remote end of the channel should use a
 * {goog.messaging.LoggerServer} with the same service name.
 *
 * @param {!MessageChannel} channel The channel that on which to
 *     send the log messages.
 * @param {string} serviceName The name of the logging service to use.
 * @constructor
 * @extends {Disposable}
 * @final
 */
export function LoggerClient(channel, serviceName) {
  if (LoggerClient.instance_) {
    return LoggerClient.instance_;
  }

  LoggerClient.base(this, 'constructor');

  /**
   * The channel on which to send the log messages.
   * @type {!MessageChannel}
   * @private
   */
  this.channel_ = channel;

  /**
   * The name of the logging service to use.
   * @type {string}
   * @private
   */
  this.serviceName_ = serviceName;

  /**
   * The bound handler function for handling log messages. This is kept in a
   * variable so that it can be deregistered when the logger client is disposed.
   * @type {!Function}
   * @private
   */
  this.publishHandler_ = goog.bind(this.sendLog_, this);
  log.addHandler(log.getRootLogger(), this.publishHandler_);

  LoggerClient.instance_ = this;
}
goog.inherits(LoggerClient, Disposable);


/**
 * The singleton instance, if any.
 * @type {?LoggerClient}
 * @private
 */
LoggerClient.instance_ = null;


/**
 * Sends a log message through the channel.
 * @param {!log.LogRecord} logRecord The log message.
 * @private
 */
LoggerClient.prototype.sendLog_ = function(logRecord) {
  var name = logRecord.getLoggerName();
  var level = logRecord.getLevel();
  var msg = logRecord.getMessage();
  var originalException = logRecord.getException();

  var exception;
  if (originalException !== undefined) {
    var normalizedException =
        debug.normalizeErrorObject(originalException);
    /** @suppress {strictMissingProperties} Added to tighten compiler checks */
    exception = {
      'name': normalizedException.name,
      'message': normalizedException.message,
      'lineNumber': normalizedException.lineNumber,
      'fileName': normalizedException.fileName,
      // Normalized exceptions without a stack have 'stack' set to 'Not
      // available', so we check for the existence of 'stack' on the original
      // exception instead.
      'stack': originalException.stack || debug.getStacktrace(log.log)
    };

    if (goog.isObject(originalException)) {
      // Add messageN to the exception in case it was added using
      // goog.debug.enhanceError.
      for (var i = 0; 'message' + i in originalException; i++) {
        exception['message' + i] = String(originalException['message' + i]);
      }
    }
  }
  this.channel_.send(this.serviceName_, {
    'name': name,
    'level': level.value,
    'message': msg,
    'exception': exception
  });
};


/** @override */
LoggerClient.prototype.disposeInternal = function() {
  LoggerClient.base(this, 'disposeInternal');
  log.removeHandler(log.getRootLogger(), this.publishHandler_);
  delete this.channel_;
  LoggerClient.instance_ = null;
};
