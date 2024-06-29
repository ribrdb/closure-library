/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Definition of various formatters for logging. Please minimize
 * dependencies this file has on other closure classes as any dependency it
 * takes won't be able to use the logging infrastructure.
 */

goog.declareModuleId('goog.debug.formatter');

import * as debug from './debug.js';
import { RelativeTimeProvider } from './relativetimeprovider.js';
import { SafeHtml } from '../html/safehtml.js';
import { SafeUrl } from '../html/safeurl.js';
import * as uncheckedconversions from '../html/uncheckedconversions.js';
import * as log from '../log/log.js';
import { Const } from '../string/const.js';
const { LogRecord } = goog.requireType('goog.log.log');


/**
 * Base class for Formatters. A Formatter is used to format a LogRecord into
 * something that can be displayed to the user.
 *
 * @param {string=} opt_prefix The prefix to place before text records.
 * @constructor
 */
export function Formatter(opt_prefix) {
  this.prefix_ = opt_prefix || '';

  /**
     * A provider that returns the relative start time.
     * @type {RelativeTimeProvider}
     * @private
     */
  this.startTimeProvider_ =
      RelativeTimeProvider.getDefaultInstance();
}


/**
 * Whether to append newlines to the end of formatted log records.
 * @type {boolean}
 */
Formatter.prototype.appendNewline = true;


/**
 * Whether to show absolute time in the DebugWindow.
 * @type {boolean}
 */
Formatter.prototype.showAbsoluteTime = true;


/**
 * Whether to show relative time in the DebugWindow.
 * @type {boolean}
 */
Formatter.prototype.showRelativeTime = true;


/**
 * Whether to show the logger name in the DebugWindow.
 * @type {boolean}
 */
Formatter.prototype.showLoggerName = true;


/**
 * Whether to show the logger exception text.
 * @type {boolean}
 */
Formatter.prototype.showExceptionText = false;


/**
 * Whether to show the severity level.
 * @type {boolean}
 */
Formatter.prototype.showSeverityLevel = false;


/**
 * Formats a record.
 * @param {?LogRecord} logRecord the logRecord to format.
 * @return {string} The formatted string.
 */
Formatter.prototype.formatRecord = goog.abstractMethod;


/**
 * Formats a record as SafeHtml.
 * @param {?LogRecord} logRecord the logRecord to format.
 * @return {!SafeHtml} The formatted string as SafeHtml.
 */
Formatter.prototype.formatRecordAsHtml =
    goog.abstractMethod;


/**
 * Sets the start time provider. By default, this is the default instance
 * but can be changed.
 * @param {RelativeTimeProvider} provider The provider to use.
 */
Formatter.prototype.setStartTimeProvider = function(
    provider) {
  this.startTimeProvider_ = provider;
};


/**
 * Returns the start time provider. By default, this is the default instance
 * but can be changed.
 * @return {RelativeTimeProvider} The start time provider.
 */
Formatter.prototype.getStartTimeProvider = function() {
  return this.startTimeProvider_;
};


/**
 * Resets the start relative time.
 */
Formatter.prototype.resetRelativeTimeStart = function() {
  this.startTimeProvider_.reset();
};


/**
 * Returns a string for the time/date of the LogRecord.
 * @param {?LogRecord} logRecord The record to get a time stamp for.
 * @return {string} A string representation of the time/date of the LogRecord.
 * @private
 */
Formatter.getDateTimeStamp_ = function(logRecord) {
  var time = new Date(logRecord.getMillis());
  return Formatter.getTwoDigitString_(
             (time.getFullYear() - 2000)) +
      Formatter.getTwoDigitString_((time.getMonth() + 1)) +
      Formatter.getTwoDigitString_(time.getDate()) + ' ' +
      Formatter.getTwoDigitString_(time.getHours()) + ':' +
      Formatter.getTwoDigitString_(time.getMinutes()) +
      ':' +
      Formatter.getTwoDigitString_(time.getSeconds()) +
      '.' +
      Formatter.getTwoDigitString_(
          Math.floor(time.getMilliseconds() / 10));
};


/**
 * Returns the number as a two-digit string, meaning it prepends a 0 if the
 * number if less than 10.
 * @param {number} n The number to format.
 * @return {string} A two-digit string representation of `n`.
 * @private
 */
Formatter.getTwoDigitString_ = function(n) {
  if (n < 10) {
    return '0' + n;
  }
  return String(n);
};


/**
 * Returns a string for the number of seconds relative to the start time.
 * Prepads with spaces so that anything less than 1000 seconds takes up the
 * same number of characters for better formatting.
 * @param {?LogRecord} logRecord The log to compare time to.
 * @param {number} relativeTimeStart The start time to compare to.
 * @return {string} The number of seconds of the LogRecord relative to the
 *     start time.
 * @private
 */
Formatter.getRelativeTime_ = function(
    logRecord, relativeTimeStart) {
  var ms = logRecord.getMillis() - relativeTimeStart;
  var sec = ms / 1000;
  var str = sec.toFixed(3);

  var spacesToPrepend = 0;
  if (sec < 1) {
    spacesToPrepend = 2;
  } else {
    while (sec < 100) {
      spacesToPrepend++;
      sec *= 10;
    }
  }
  while (spacesToPrepend-- > 0) {
    str = ' ' + str;
  }
  return str;
};



/**
 * Formatter that returns formatted html. See formatRecord for the classes
 * it uses for various types of formatted output.
 *
 * @param {string=} opt_prefix The prefix to place before text records.
 * @constructor
 * @extends {Formatter}
 */
export function HtmlFormatter(opt_prefix) {
  Formatter.call(this, opt_prefix);
}
goog.inherits(
    HtmlFormatter, Formatter);


/**
 * Exposes an exception that has been caught by a try...catch and outputs the
 * error as HTML with a stack trace.
 *
 * @param {*} err Error object or string.
 * @param {?Function=} fn If provided, when collecting the stack trace all
 *     frames above the topmost call to this function, including that call,
 *     will be left out of the stack trace.
 * @return {string} Details of exception, as HTML.
 */
HtmlFormatter.exposeException = function(err, fn) {
  var html = HtmlFormatter.exposeExceptionAsHtml(err, fn);
  return SafeHtml.unwrap(html);
};


/**
 * Exposes an exception that has been caught by a try...catch and outputs the
 * error with a stack trace.
 *
 * @param {*} err Error object or string.
 * @param {?Function=} fn If provided, when collecting the stack trace all
 *     frames above the topmost call to this function, including that call,
 *     will be left out of the stack trace.
 * @return {!SafeHtml} Details of exception.
 */
HtmlFormatter.exposeExceptionAsHtml = function(err, fn) {
  try {
    var e = debug.normalizeErrorObject(err);
    // Create the error message
    var viewSourceUrl =
        HtmlFormatter.createViewSourceUrl_(e.fileName);
    var error = SafeHtml.concat(
        SafeHtml.htmlEscapePreservingNewlinesAndSpaces(
            'Message: ' + e.message + '\nUrl: '),
        SafeHtml.create(
            'a', {href: viewSourceUrl, target: '_new'}, e.fileName),
        SafeHtml.htmlEscapePreservingNewlinesAndSpaces(
            '\nLine: ' + e.lineNumber + '\n\nBrowser stack:\n' + e.stack +
            '-> ' +
            '[end]\n\nJS stack traversal:\n' + debug.getStacktrace(fn) +
            '-> '));
    return error;
  } catch (e2) {
    return SafeHtml.htmlEscapePreservingNewlinesAndSpaces(
        'Exception trying to expose exception! You win, we lose. ' + e2);
  }
};


/**
 * @param {?string=} fileName
 * @return {!SafeUrl} SafeUrl with view-source scheme, pointing at
 *     fileName.
 * @private
 */
HtmlFormatter.createViewSourceUrl_ = function(fileName) {
  if (fileName == null) {
    fileName = '';
  }
  if (!/^https?:\/\//i.test(fileName)) {
    return SafeUrl.sanitize('sanitizedviewsrc');
  }
  var sanitizedFileName = SafeUrl.sanitize(fileName);
  return uncheckedconversions
      .safeUrlFromStringKnownToSatisfyTypeContract(
          Const.from('view-source scheme plus HTTP/HTTPS URL'),
          'view-source:' + SafeUrl.unwrap(sanitizedFileName));
};



/**
 * Whether to show the logger exception text
 * @type {boolean}
 * @override
 */
HtmlFormatter.prototype.showExceptionText = true;


/**
 * Formats a record
 * @param {?LogRecord} logRecord the logRecord to format.
 * @return {string} The formatted string as html.
 * @override
 */
HtmlFormatter.prototype.formatRecord = function(
    logRecord) {
  if (!logRecord) {
    return '';
  }
  // OK not to use goog.html.SafeHtml.unwrap() here.
  return this.formatRecordAsHtml(logRecord).getTypedStringValue();
};


/**
 * Formats a record.
 * @param {?LogRecord} logRecord the logRecord to format.
 * @return {!SafeHtml} The formatted string as SafeHtml.
 * @override
 */
HtmlFormatter.prototype.formatRecordAsHtml = function(
    logRecord) {
  if (!logRecord) {
    return SafeHtml.EMPTY;
  }

  var className;
  switch (logRecord.getLevel().value) {
    case log.Level.SHOUT.value:
      className = 'dbg-sh';
      break;
    case log.Level.SEVERE.value:
      className = 'dbg-sev';
      break;
    case log.Level.WARNING.value:
      className = 'dbg-w';
      break;
    case log.Level.INFO.value:
      className = 'dbg-i';
      break;
    case log.Level.FINE.value:
    default:
      className = 'dbg-f';
      break;
  }

  // HTML for user defined prefix, time, logger name, and severity.
  var sb = [];
  sb.push(this.prefix_, ' ');
  if (this.showAbsoluteTime) {
    sb.push(
        '[', Formatter.getDateTimeStamp_(logRecord), '] ');
  }
  if (this.showRelativeTime) {
    sb.push(
        '[',
        Formatter.getRelativeTime_(
            logRecord, this.startTimeProvider_.get()),
        's] ');
  }
  if (this.showLoggerName) {
    sb.push('[', logRecord.getLoggerName(), '] ');
  }
  if (this.showSeverityLevel) {
    sb.push('[', logRecord.getLevel().name, '] ');
  }
  var fullPrefixHtml =
      SafeHtml.htmlEscapePreservingNewlinesAndSpaces(sb.join(''));

  // HTML for exception text and log record.
  var exceptionHtml = SafeHtml.EMPTY;
  if (this.showExceptionText && logRecord.getException()) {
    exceptionHtml = SafeHtml.concat(
        SafeHtml.BR,
        HtmlFormatter.exposeExceptionAsHtml(
            logRecord.getException()));
  }
  var logRecordHtml = SafeHtml.htmlEscapePreservingNewlinesAndSpaces(
      logRecord.getMessage());
  var recordAndExceptionHtml = SafeHtml.create(
      'span', {'class': className},
      SafeHtml.concat(logRecordHtml, exceptionHtml));


  // Combine both pieces of HTML and, if needed, append a final newline.
  var html;
  if (this.appendNewline) {
    html = SafeHtml.concat(
        fullPrefixHtml, recordAndExceptionHtml, SafeHtml.BR);
  } else {
    html = SafeHtml.concat(fullPrefixHtml, recordAndExceptionHtml);
  }
  return html;
};



/**
 * Formatter that returns formatted plain text
 *
 * @param {string=} opt_prefix The prefix to place before text records.
 * @constructor
 * @extends {Formatter}
 * @final
 */
export function TextFormatter(opt_prefix) {
  Formatter.call(this, opt_prefix);
}
goog.inherits(
    TextFormatter, Formatter);


/**
 * Formats a record as text
 * @param {?LogRecord} logRecord the logRecord to format.
 * @return {string} The formatted string.
 * @override
 */
TextFormatter.prototype.formatRecord = function(
    logRecord) {
  var sb = [];
  sb.push(this.prefix_, ' ');
  if (this.showAbsoluteTime) {
    sb.push(
        '[', Formatter.getDateTimeStamp_(logRecord), '] ');
  }
  if (this.showRelativeTime) {
    sb.push(
        '[',
        Formatter.getRelativeTime_(
            logRecord, this.startTimeProvider_.get()),
        's] ');
  }

  if (this.showLoggerName) {
    sb.push('[', logRecord.getLoggerName(), '] ');
  }
  if (this.showSeverityLevel) {
    sb.push('[', logRecord.getLevel().name, '] ');
  }
  sb.push(logRecord.getMessage());
  if (this.showExceptionText) {
    var exception = logRecord.getException();
    if (exception !== undefined) {
      var exceptionText =
          exception instanceof Error ? exception.message : String(exception);
      sb.push('\n', exceptionText);
    }
  }
  if (this.appendNewline) {
    sb.push('\n');
  }
  return sb.join('');
};


/**
 * Formats a record as text
 * @param {?LogRecord} logRecord the logRecord to format.
 * @return {!SafeHtml} The formatted string as SafeHtml. This is
 *     just an HTML-escaped version of the text obtained from formatRecord().
 * @override
 */
TextFormatter.prototype.formatRecordAsHtml = function(
    logRecord) {
  return SafeHtml.htmlEscapePreservingNewlinesAndSpaces(
      TextFormatter.prototype.formatRecord(logRecord));
};

