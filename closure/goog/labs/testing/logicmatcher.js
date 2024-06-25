/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides the built-in logic matchers: anyOf, allOf, and isNot.
 */

import * as array from '../../array/array.js';

import { Matcher } from './matcher.js';



/**
 * The AllOf matcher.
 *
 * @param {!Array<!Matcher>} matchers Input matchers.
 *
 * @constructor
 * @struct
 * @implements {Matcher}
 * @final
 */
export function AllOfMatcher(matchers) {
  /**
     * @type {!Array<!Matcher>}
     * @private
     */
  this.matchers_ = matchers;
}


/**
 * Determines if all of the matchers match the input value.
 *
 * @override
 */
AllOfMatcher.prototype.matches = function(
    actualValue) {
  return this.matchers_.every(function(matcher) {
    return matcher.matches(actualValue);
  });
};


/**
 * Describes why the matcher failed. The returned string is a concatenation of
 * all the failed matchers' error strings.
 *
 * @override
 */
AllOfMatcher.prototype.describe = function(
    actualValue) {
  // TODO(vbhasin) : Optimize this to remove duplication with matches ?
  var errorString = '';
  this.matchers_.forEach(function(matcher) {
    if (!matcher.matches(actualValue)) {
      errorString += matcher.describe(actualValue) + '\n';
    }
  });
  return errorString;
};



/**
 * The AnyOf matcher.
 *
 * @param {!Array<!Matcher>} matchers Input matchers.
 *
 * @constructor
 * @struct
 * @implements {Matcher}
 * @final
 */
export function AnyOfMatcher(matchers) {
  /**
     * @type {!Array<!Matcher>}
     * @private
     */
  this.matchers_ = matchers;
}


/**
 * Determines if any of the matchers matches the input value.
 *
 * @override
 */
AnyOfMatcher.prototype.matches = function(
    actualValue) {
  return array.some(this.matchers_, function(matcher) {
    return matcher.matches(actualValue);
  });
};


/**
 * Describes why the matcher failed.
 *
 * @override
 */
AnyOfMatcher.prototype.describe = function(
    actualValue) {
  // TODO(vbhasin) : Optimize this to remove duplication with matches ?
  var errorString = '';
  this.matchers_.forEach(function(matcher) {
    if (!matcher.matches(actualValue)) {
      errorString += matcher.describe(actualValue) + '\n';
    }
  });
  return errorString;
};



/**
 * The IsNot matcher.
 *
 * @param {!Matcher} matcher The matcher to negate.
 *
 * @constructor
 * @struct
 * @implements {Matcher}
 * @final
 */
export function IsNotMatcher(matcher) {
  /**
     * @type {!Matcher}
     * @private
     */
  this.matcher_ = matcher;
}


/**
 * Determines if the input value doesn't satisfy a matcher.
 *
 * @override
 */
IsNotMatcher.prototype.matches = function(
    actualValue) {
  return !this.matcher_.matches(actualValue);
};


/**
 * Describes why the matcher failed.
 *
 * @override
 */
IsNotMatcher.prototype.describe = function(
    actualValue) {
  return 'The following is false: ' + this.matcher_.describe(actualValue);
};


/**
 * Creates a matcher that will succeed only if all of the given matchers
 * succeed.
 *
 * @param {...Matcher} var_args The matchers to test
 *     against.
 *
 * @return {!AllOfMatcher} The AllOf matcher.
 */
AllOfMatcher.allOf = function(var_args) {
  var matchers = Array.prototype.slice.call(arguments);
  return new AllOfMatcher(matchers);
};


/**
 * Accepts a set of matchers and returns a matcher which matches
 * values which satisfy the constraints of any of the given matchers.
 *
 * @param {...Matcher} var_args The matchers to test
 *     against.
 *
 * @return {!AnyOfMatcher} The AnyOf matcher.
 */
AnyOfMatcher.anyOf = function(var_args) {
  var matchers = Array.prototype.slice.call(arguments);
  return new AnyOfMatcher(matchers);
};


/**
 * Returns a matcher that negates the input matcher. The returned
 * matcher matches the values not matched by the input matcher and vice-versa.
 *
 * @param {!Matcher} matcher The matcher to test against.
 *
 * @return {!IsNotMatcher} The IsNot matcher.
 */
IsNotMatcher.isNot = function(matcher) {
  return new IsNotMatcher(matcher);
};
