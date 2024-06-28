/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Simple logger that logs to the window console if available.
 *
 * Has an autoInstall option which can be put into initialization code, which
 * will start logging if "Debug=true" is in document.location.href
 */

import * as formatter from './formatter.js';

import * as log from '../log/log.js';


/**
 * Create and install a log handler that logs to window.console if available
 * @constructor
 */
export function Console() {
  this.publishHandler_ = goog.bind(this.addLogRecord, this);

  /**
     * Formatter for formatted output.
     * @type {!formatter.TextFormatter}
     * @private
     */
  this.formatter_ = new formatter.TextFormatter();
  this.formatter_.showAbsoluteTime = false;
  this.formatter_.showExceptionText = false;
  // The console logging methods automatically append a newline.
  this.formatter_.appendNewline = false;

  this.isCapturing_ = false;
  this.logBuffer_ = '';

  /**
   * Loggers that we shouldn't output.
   * @type {!Object<boolean>}
   * @private
   */
  this.filteredLoggers_ = {};
}


/**
 * Returns the text formatter used by this console
 * @return {!formatter.TextFormatter} The text formatter.
 */
Console.prototype.getFormatter = function() {
  return this.formatter_;
};


/**
 * Sets whether we are currently capturing logger output.
 * @param {boolean} capturing Whether to capture logger output.
 */
Console.prototype.setCapturing = function(capturing) {
  if (capturing == this.isCapturing_) {
    return;
  }

  // attach or detach handler from the root logger
  var rootLogger = log.getRootLogger();
  if (capturing) {
    log.addHandler(rootLogger, this.publishHandler_);
  } else {
    log.removeHandler(rootLogger, this.publishHandler_);
  }
  this.isCapturing_ = capturing;
};


/**
 * Adds a log record.
 * @param {?log.LogRecord} logRecord The log entry.
 */
Console.prototype.addLogRecord = function(logRecord) {
  // Check to see if the log record is filtered or not.
  if (this.filteredLoggers_[logRecord.getLoggerName()]) {
    return;
  }

  /**
     * @param {?log.Level} level
     * @return {string}
     */
  function getConsoleMethodName_(level) {
    if (level) {
      if (level.value >= log.Level.SEVERE.value) {
        // SEVERE == 1000, SHOUT == 1200
        return 'error';
      }
      if (level.value >= log.Level.WARNING.value) {
        return 'warn';
      }
      // NOTE(martone): there's a goog.log.Level.INFO - that we should
      // presumably map to console.info. However, the current mapping is INFO ->
      // console.log. Let's keep the status quo for now, but we should
      // reevaluate if we tweak the goog.log API.
      if (level.value >= log.Level.CONFIG.value) {
        return 'log';
      }
    }
    return 'debug';
  }

  var record = this.formatter_.formatRecord(logRecord);
  var console = Console.console_;
  if (console) {
    // TODO(user): Make getLevel() non-null and update
    // getConsoleMethodName_ parameters.
    var logMethod = getConsoleMethodName_(logRecord.getLevel());
    Console.logToConsole_(
        console, logMethod, record, logRecord.getException());
  } else {
    this.logBuffer_ += record;
  }
};


/**
 * Adds a logger name to be filtered.
 * @param {string} loggerName the logger name to add.
 */
Console.prototype.addFilter = function(loggerName) {
  this.filteredLoggers_[loggerName] = true;
};


/**
 * Removes a logger name to be filtered.
 * @param {string} loggerName the logger name to remove.
 */
Console.prototype.removeFilter = function(loggerName) {
  delete this.filteredLoggers_[loggerName];
};


/**
 * Global console logger instance
 * @type {?Console}
 */
Console.instance = null;


/**
 * The console to which to log.  This is a property so it can be mocked out in
 * this unit test for Console. Using goog.global, as console might be
 * used in window-less contexts.
 * @type {{log:!Function}}
 * @private
 */
Console.console_ = goog.global['console'];


/**
 * Sets the console to which to log.
 * @param {!Object} console The console to which to log.
 */
Console.setConsole = function(console) {
  Console.console_ = /** @type {{log:!Function}} */ (console);
};


/**
 * Install the console and start capturing if "Debug=true" is in the page URL
 */
Console.autoInstall = function() {
  if (!Console.instance) {
    Console.instance = new Console();
  }

  if (goog.global.location &&
      goog.global.location.href.indexOf('Debug=true') != -1) {
    Console.instance.setCapturing(true);
  }
};


/**
 * Show an alert with all of the captured debug information.
 * Information is only captured if console is not available
 */
Console.show = function() {
  alert(Console.instance.logBuffer_);
};


/**
 * Logs the record to the console using the given function.  If the function is
 * not available on the console object, the log function is used instead.
 * @param {{log:!Function}} console The console object.
 * @param {string} fnName The name of the function to use.
 * @param {string} record The record to log.
 * @param {*} exception An additional exception to log.
 * @private
 */
Console.logToConsole_ = function(
    console, fnName, record, exception) {
  if (console[fnName]) {
    console[fnName](record, exception === undefined ? '' : exception);
  } else {
    console.log(record, exception === undefined ? '' : exception);
  }
};
