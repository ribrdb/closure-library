/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Matchers to be used with the mock utilities.  They allow for
 * flexible matching by type.  Custom matchers can be created by passing a
 * matcher function into an ArgumentMatcher instance.
 *
 * For examples, please see the unit test.
 */


goog.setTestOnly('goog.testing.mockmatchers');

import * as array from '../array/array.js';
import * as dom from '../dom/dom.js';
import * as asserts from './asserts.js';
const { MockExpectation } = goog.requireType('goog.testing.mock');



/**
 * A simple interface for executing argument matching.  A match in this case is
 * testing to see if a supplied object fits a given criteria.  True is returned
 * if the given criteria is met.
 * @param {Function=} opt_matchFn A function that evaluates a given argument
 *     and returns true if it meets a given criteria.
 * @param {?string=} opt_matchName The name expressing intent as part of
 *      an error message for when a match fails.
 * @constructor
 */
export function ArgumentMatcher(opt_matchFn, opt_matchName) {
  /**
   * A function that evaluates a given argument and returns true if it meets a
   * given criteria.
   * @type {Function}
   * @private
   */
  this.matchFn_ = opt_matchFn || null;

  /**
   * A string indicating the match intent (e.g. isBoolean or isString).
   * @type {?string}
   * @private
   */
  this.matchName_ = opt_matchName || null;
}


/**
 * A function that takes a match argument and an optional MockExpectation
 * which (if provided) will get error information and returns whether or
 * not it matches.
 * @param {*} toVerify The argument that should be verified.
 * @param {?MockExpectation=} opt_expectation The expectation
 *     for this match.
 * @return {boolean} Whether or not a given argument passes verification.
 */
ArgumentMatcher.prototype.matches = function(
    toVerify, opt_expectation) {
  if (this.matchFn_) {
    var isamatch = this.matchFn_(toVerify);
    if (!isamatch && opt_expectation) {
      if (this.matchName_) {
        opt_expectation.addErrorMessage(
            'Expected: ' + this.matchName_ + ' but was: ' +
            _displayStringForValue(toVerify));
      } else {
        opt_expectation.addErrorMessage(
            'Expected: missing mockmatcher' +
            ' description but was: ' + _displayStringForValue(toVerify));
      }
    }
    return isamatch;
  } else {
    throw new Error('No match function defined for this mock matcher');
  }
};



/**
 * A matcher that verifies that an argument is an instance of a given class.
 * @param {Function} ctor The class that will be used for verification.
 * @constructor
 * @extends {ArgumentMatcher}
 * @final
 */
export function InstanceOf(ctor) {
  ArgumentMatcher.call(this, function(obj) {
    return obj instanceof ctor;
    // NOTE: Browser differences on ctor.toString() output
    // make using that here problematic. So for now, just let
    // people know the instanceOf() failed without providing
    // browser specific details...
  }, 'instanceOf()');
}
goog.inherits(
    InstanceOf,
    ArgumentMatcher);



/**
 * A matcher that verifies that an argument is of a given type (e.g. "object").
 * @param {string} type The type that a given argument must have.
 * @constructor
 * @extends {ArgumentMatcher}
 * @final
 */
export function TypeOf(type) {
  ArgumentMatcher.call(this, function(obj) {
    return goog.typeOf(obj) == type;
  }, 'typeOf(' + type + ')');
}
goog.inherits(
    TypeOf,
    ArgumentMatcher);



/**
 * A matcher that verifies that an argument matches a given RegExp.
 * @param {RegExp} regexp The regular expression that the argument must match.
 * @constructor
 * @extends {ArgumentMatcher}
 * @final
 */
export function RegexpMatch(regexp) {
  ArgumentMatcher.call(this, function(str) {
    return regexp.test(str);
  }, 'match(' + regexp + ')');
}
goog.inherits(
    RegexpMatch,
    ArgumentMatcher);



/**
 * A matcher that always returns true. It is useful when the user does not care
 * for some arguments.
 * For example: mockFunction('username', 'password', new IgnoreArgument());
 * @constructor
 * @extends {ArgumentMatcher}
 * @final
 */
export function IgnoreArgument() {
  ArgumentMatcher.call(this, function() {
    return true;
  }, 'true');
}
goog.inherits(
    IgnoreArgument,
    ArgumentMatcher);



/**
 * A matcher that verifies that the argument is an object that equals the given
 * expected object, using a deep comparison.
 * @param {Object} expectedObject An object to match against when
 *     verifying the argument.
 * @constructor
 * @extends {ArgumentMatcher}
 */
export function ObjectEquals(expectedObject) {
  /** @private */
  this.expectedObject_ = expectedObject;
}
goog.inherits(
    ObjectEquals,
    ArgumentMatcher);


/** @override */
ObjectEquals.prototype.matches = function(
    toVerify, opt_expectation) {
  // Override the default matches implementation to provide a custom error
  // message to opt_expectation if it exists.
  var differences =
      asserts.findDifferences(this.expectedObject_, toVerify);
  if (differences) {
    if (opt_expectation) {
      opt_expectation.addErrorMessage('Expected equal objects\n' + differences);
    }
    return false;
  }
  return true;
};



/**
 * A matcher that saves the argument that it is verifying so that your unit test
 * can perform extra tests with this argument later.  For example, if the
 * argument is a callback method, the unit test can then later call this
 * callback to test the asynchronous portion of the call.
 * @param {ArgumentMatcher|Function=} opt_matcher
 *     Argument matcher or matching function that will be used to validate the
 *     argument.  By default, argument will always be valid.
 * @param {?string=} opt_matchName The name expressing intent as part of
 *      an error message for when a match fails.
 * @constructor
 * @extends {ArgumentMatcher}
 * @final
 */
export function SaveArgument(opt_matcher, opt_matchName) {
  ArgumentMatcher.call(
      this, /** @type {Function} */ (opt_matcher), opt_matchName);

  /**
   * All saved arguments that were verified.
   * @const {!Array<*>}
   */
  this.allArgs = [];

  if (opt_matcher instanceof ArgumentMatcher) {
    /**
         * Delegate match requests to this matcher.
         * @type {ArgumentMatcher}
         * @private
         */
    this.delegateMatcher_ = opt_matcher;
  } else if (!opt_matcher) {
    this.delegateMatcher_ = ignoreArgument;
  }
}
goog.inherits(
    SaveArgument,
    ArgumentMatcher);


/** @override */
SaveArgument.prototype.matches = function(
    toVerify, opt_expectation) {
  this.arg = toVerify;
  this.allArgs.push(toVerify);
  if (this.delegateMatcher_) {
    return this.delegateMatcher_.matches(toVerify, opt_expectation);
  }
  return SaveArgument.superClass_.matches.call(
      this, toVerify, opt_expectation);
};


/**
 * The last (or only) saved argument that was verified.
 * @type {*}
 */
SaveArgument.prototype.arg;


/**
 * An instance of the IgnoreArgument matcher. Returns true for all matches.
 * @type {!IgnoreArgument}
 */
export var ignoreArgument = new IgnoreArgument();


/**
 * A matcher that verifies that an argument is an array.
 * @type {!ArgumentMatcher}
 */
export var isArray = new ArgumentMatcher(Array.isArray, 'isArray');


/**
 * A matcher that verifies that an argument is a array-like.  A NodeList is an
 * example of a collection that is very close to an array.
 * @type {!ArgumentMatcher}
 */
export var isArrayLike = new ArgumentMatcher(
    goog.isArrayLike, 'isArrayLike');


/**
 * A matcher that verifies that an argument is a date-like.
 * @type {!ArgumentMatcher}
 */
export var isDateLike = new ArgumentMatcher(
    goog.isDateLike, 'isDateLike');


/**
 * A matcher that verifies that an argument is a string.
 * @type {!ArgumentMatcher}
 */
export var isString = new ArgumentMatcher(
    x => typeof x === 'string', 'isString');


/**
 * A matcher that verifies that an argument is a boolean.
 * @type {!ArgumentMatcher}
 */
export var isBoolean = new ArgumentMatcher(
    x => typeof x === 'boolean', 'isBoolean');


/**
 * A matcher that verifies that an argument is a number.
 * @type {!ArgumentMatcher}
 */
export var isNumber = new ArgumentMatcher(
    x => typeof x === 'number', 'isNumber');


/**
 * A matcher that verifies that an argument is a function.
 * @type {!ArgumentMatcher}
 */
export var isFunction = new ArgumentMatcher(
    x => typeof x === 'function', 'isFunction');


/**
 * A matcher that verifies that an argument is an object.
 * @type {!ArgumentMatcher}
 */
export var isObject = new ArgumentMatcher(goog.isObject, 'isObject');


/**
 * A matcher that verifies that an argument is like a DOM node.
 * @type {!ArgumentMatcher}
 */
export var isNodeLike = new ArgumentMatcher(
    dom.isNodeLike, 'isNodeLike');


/**
 * A function that checks to see if an array matches a given set of
 * expectations.  The expectations array can be a mix of ArgumentMatcher
 * implementations and values.  True will be returned if values are identical or
 * if a matcher returns a positive result.
 * @param {Array<?>} expectedArr An array of expectations which can be either
 *     values to check for equality or ArgumentMatchers.
 * @param {Array<?>} arr The array to match.
 * @param {MockExpectation?=} opt_expectation The expectation
 *     for this match.
 * @return {boolean} Whether or not the given array matches the expectations.
 */
export function flexibleArrayMatcher(expectedArr, arr, opt_expectation) {
  return array.equals(expectedArr, arr, function(a, b) {
    var errCount = 0;
    if (opt_expectation) {
      errCount = opt_expectation.getErrorMessageCount();
    }
    var isamatch = a === b ||
        a instanceof ArgumentMatcher &&
            a.matches(b, opt_expectation);
    var failureMessage = null;
    if (!isamatch) {
      failureMessage = asserts.findDifferences(a, b);
      isamatch = !failureMessage;
    }
    if (!isamatch && opt_expectation) {
      // If the error count changed, the match sent out an error
      // message. If the error count has not changed, then
      // we need to send out an error message...
      if (errCount == opt_expectation.getErrorMessageCount()) {
        // Use the _displayStringForValue() from assert.js
        // for consistency...
        if (!failureMessage) {
          failureMessage = 'Expected: ' + _displayStringForValue(a) +
              ' but was: ' + _displayStringForValue(b);
        }
        opt_expectation.addErrorMessage(failureMessage);
      }
    }
    return isamatch;
  });
}
