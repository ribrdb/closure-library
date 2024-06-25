/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Helper class to allow for expected unit test failures.
 */

goog.setTestOnly('goog.testing.ExpectedFailures');

import * as asserts from '../asserts/asserts.js';
import { DivConsole } from '../debug/divconsole.js';
import * as dom from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import * as events from '../events/events.js';
import { EventType } from '../events/eventtype.js';
import * as log from '../log/log.js';
import * as style from '../style/style.js';
import { JsUnitException } from './jsunitexception.js';
import { TestCase } from './testcase.js';
import * as testingAsserts from './asserts.js';



/**
 * Helper class for allowing some unit tests to fail, particularly designed to
 * mark tests that should be fixed on a given browser.
 *
 * <pre>
 * var expectedFailures = new ExpectedFailures();
 *
 * function tearDown() {
 *   expectedFailures.handleTearDown();
 * }
 *
 * function testSomethingThatBreaksInWebKit() {
 *   expectedFailures.expectFailureFor(goog.userAgent.WEBKIT);
 *
 *   try {
 *     ...
 *     assert(somethingThatFailsInWebKit);
 *     ...
 *   } catch (e) {
 *     expectedFailures.handleException(e);
 *   }
 * }
 * </pre>
 *
 * @constructor
 * @final
 */
export function ExpectedFailures() {
  ExpectedFailures.setUpConsole_();
  this.reset_();
}


/**
 * The lazily created debugging console.
 * @type {DivConsole?}
 * @private
 */
ExpectedFailures.console_ = null;


/**
 * Logger for the expected failures.
 * @type {log.Logger}
 * @private
 */
ExpectedFailures.prototype.logger_ =
    log.getLogger('goog.testing.ExpectedFailures');


/**
 * Whether or not we are expecting failure.
 * @type {boolean}
 * @private
 */
ExpectedFailures.prototype.expectingFailure_;


/**
 * The string to emit upon an expected failure.
 * @type {string}
 * @private
 */
ExpectedFailures.prototype.failureMessage_;


/**
 * An array of suppressed failures.
 * @type {Array<!Error>}
 * @private
 */
ExpectedFailures.prototype.suppressedFailures_;


/**
 * Sets up the debug console, if it isn't already set up.
 * @private
 */
ExpectedFailures.setUpConsole_ = function() {
  if (!ExpectedFailures.console_) {
    var xButton = dom.createDom(
        TagName.DIV, {
          'style': 'position: absolute; border-left:1px solid #333;' +
              'border-bottom:1px solid #333; right: 0; top: 0; width: 1em;' +
              'height: 1em; cursor: pointer; background-color: #cde;' +
              'text-align: center; color: black'
        },
        'X');
    var div = dom.createDom(
        TagName.DIV, {
          'style': 'position: absolute; border: 1px solid #333; right: 10px;' +
              'top : 10px; width: 400px; display: none'
        },
        xButton);
    document.body.appendChild(div);
    events.listen(xButton, EventType.CLICK, function() {
      style.setElementShown(div, false);
    });

    ExpectedFailures.console_ = new DivConsole(div);
    log.addHandler(
        ExpectedFailures.prototype.logger_,
        goog.bind(style.setElementShown, null, div, true));
    log.addHandler(
        ExpectedFailures.prototype.logger_,
        goog.bind(
            ExpectedFailures.console_.addLogRecord,
            ExpectedFailures.console_));
  }
};


/**
 * Register to expect failure for the given condition.  Multiple calls to this
 * function act as a boolean OR.  The first applicable message will be used.
 * @param {boolean} condition Whether to expect failure.
 * @param {string=} opt_message Descriptive message of this expected failure.
 */
ExpectedFailures.prototype.expectFailureFor = function(
    condition, opt_message) {
  this.expectingFailure_ = this.expectingFailure_ || condition;
  if (condition) {
    this.failureMessage_ = this.failureMessage_ || opt_message || '';
  }
};


/**
 * Determines if the given exception was expected.
 * @param {Object} ex The exception to check.
 * @return {boolean} Whether the exception was expected.
 */
ExpectedFailures.prototype.isExceptionExpected = function(ex) {
  return this.expectingFailure_ && ex instanceof JsUnitException;
};


/**
 * Handle an exception, suppressing it if it is a unit test failure that we
 * expected.
 * @param {Error} ex The exception to handle.
 */
ExpectedFailures.prototype.handleException = function(ex) {
  if (this.isExceptionExpected(ex)) {
    asserts.assertInstanceof(ex, JsUnitException);
    log.info(
        this.logger_, 'Suppressing test failure in ' +
            TestCase.currentTestName + ':' +
            (this.failureMessage_ ? '\n(' + this.failureMessage_ + ')' : ''),
        ex);
    this.suppressedFailures_.push(ex);
    TestCase.invalidateAssertionException(ex);
    return;
  }

  // Rethrow the exception if we weren't expecting it or if it is a normal
  // exception.
  throw ex;
};


/**
 * Run the given function, catching any expected failures.
 * @param {Function} func The function to run.
 * @param {boolean=} opt_lenient Whether to ignore if the expected failures
 *     didn't occur.  In this case a warning will be logged in handleTearDown.
 */
ExpectedFailures.prototype.run = function(func, opt_lenient) {
  try {
    func();
  } catch (ex) {
    this.handleException(ex);
  }

  if (!opt_lenient && this.expectingFailure_ &&
      !this.suppressedFailures_.length) {
    fail(this.getExpectationMessage_());
  }
};


/**
 * @return {string} A warning describing an expected failure that didn't occur.
 * @private
 */
ExpectedFailures.prototype.getExpectationMessage_ = function() {
  return 'Expected a test failure in \'' +
      TestCase.currentTestName + '\' but the test passed.';
};


/**
 * Handle the tearDown phase of a test, alerting the user if an expected test
 * was not suppressed.
 */
ExpectedFailures.prototype.handleTearDown = function() {
  if (this.expectingFailure_ && !this.suppressedFailures_.length) {
    log.warning(this.logger_, this.getExpectationMessage_());
  }
  this.reset_();
};


/**
 * Reset internal state.
 * @private
 */
ExpectedFailures.prototype.reset_ = function() {
  this.expectingFailure_ = false;
  this.failureMessage_ = '';
  this.suppressedFailures_ = [];
};
