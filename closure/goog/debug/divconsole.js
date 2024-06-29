/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Simple logger that logs a Div Element.
 */

import * as debugFormatter from './formatter.js';

import { DomHelper } from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import * as safe from '../dom/safe.js';
import { SafeHtml } from '../html/safehtml.js';
import { SafeStyleSheet } from '../html/safestylesheet.js';
import * as log from '../log/log.js';
import { Const } from '../string/const.js';
import * as style from '../style/style.js';
goog.requireType('goog.debug.formatter');
const { LogRecord } = goog.requireType('goog.log.log');


/**
 * A class for visualising logger calls in a div element.
 * @param {Element} element The element to append to.
 * @constructor
 */
export function DivConsole(element) {
  this.publishHandler_ = goog.bind(this.addLogRecord, this);
  this.formatter_ = new debugFormatter.HtmlFormatter();
  this.formatter_.showAbsoluteTime = false;
  this.isCapturing_ = false;
  this.element_ = element;
  this.elementOwnerDocument_ =
      this.element_.ownerDocument || this.element_.document;
  this.domHelper_ = new DomHelper(this.elementOwnerDocument_);

  this.installStyles();
}


/**
 * Installs styles for the log messages and its div
 */
DivConsole.prototype.installStyles = function() {
  style.installSafeStyleSheet(
      SafeStyleSheet.fromConstant(Const.from(
          '.dbg-sev{color:#F00}' +
          '.dbg-w{color:#C40}' +
          '.dbg-sh{font-weight:bold;color:#000}' +
          '.dbg-i{color:#444}' +
          '.dbg-f{color:#999}' +
          '.dbg-ev{color:#0A0}' +
          '.dbg-m{color:#990}' +
          '.logmsg{border-bottom:1px solid #CCC;padding:2px}' +
          '.logsep{background-color: #8C8;}' +
          '.logdiv{border:1px solid #CCC;background-color:#FCFCFC;' +
          'font:medium monospace}')),
      this.element_);
  this.element_.className += ' logdiv';
};


/**
 * Sets whether we are currently capturing logger output.
 * @param {boolean} capturing Whether to capture logger output.
 */
DivConsole.prototype.setCapturing = function(capturing) {
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
 * @param {?LogRecord} logRecord The log entry.
 */
DivConsole.prototype.addLogRecord = function(logRecord) {
  if (!logRecord) {
    return;
  }
  var scroll = this.element_.scrollHeight - this.element_.scrollTop -
          this.element_.clientHeight <=
      100;

  var div = this.domHelper_.createElement(TagName.DIV);
  div.className = 'logmsg';
  safe.setInnerHtml(
      div, this.formatter_.formatRecordAsHtml(logRecord));
  this.element_.appendChild(div);

  if (scroll) {
    this.element_.scrollTop = this.element_.scrollHeight;
  }
};


/**
 * Gets the formatter for outputting to the console. The default formatter
 * is an instance of debugFormatter.HtmlFormatter
 * @return {!debugFormatter.Formatter} The formatter in use.
 */
DivConsole.prototype.getFormatter = function() {
  return this.formatter_;
};


/**
 * Sets the formatter for outputting to the console.
 * @param {debugFormatter.HtmlFormatter} formatter The formatter to use.
 */
DivConsole.prototype.setFormatter = function(formatter) {
  this.formatter_ = formatter;
};


/**
 * Adds a separator to the debug window.
 */
DivConsole.prototype.addSeparator = function() {
  var div = this.domHelper_.createElement(TagName.DIV);
  div.className = 'logmsg logsep';
  this.element_.appendChild(div);
};


/**
 * Clears the console.
 */
DivConsole.prototype.clear = function() {
  if (this.element_) {
    safe.setInnerHtml(this.element_, SafeHtml.EMPTY);
  }
};
