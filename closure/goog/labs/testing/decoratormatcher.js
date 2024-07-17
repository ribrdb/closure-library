/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides the built-in decorators: is, describedAs, anything.
 */

import { Matcher } from './matcher.js';


/**
 * The Anything matcher. Matches all possible inputs.
 *
 * @constructor
 * @implements {Matcher}
 * @final
 */
export function AnythingMatcher() {}


/**
 * Matches anything. Useful if one doesn't care what the object under test is.
 *
 * @override
 */
AnythingMatcher.prototype.matches = function(
    actualObject) {
 return true;
};


/**
 * This method is never called but is needed so AnythingMatcher implements the
 * Matcher interface.
 *
 * @override
 */
AnythingMatcher.prototype.describe =
    function(actualObject) {
     throw new Error('AnythingMatcher should never fail!');
    };


/**
 * Returns a matcher that matches anything.
 *
 * @return {!AnythingMatcher} A
 *     AnythingMatcher.
 */
AnythingMatcher.anything = function() {
 return new AnythingMatcher();
};


/**
 * Returns any matcher that is passed to it (aids readability).
 *
 * @param {!Matcher} matcher A matcher.
 * @return {!Matcher} The wrapped matcher.
 */
AnythingMatcher.is = function(matcher) {
 return matcher;
};


/**
 * Returns a matcher with a customized description for the given matcher.
 *
 * @param {string} description The custom description for the matcher.
 * @param {!Matcher} matcher The matcher.
 * @return {!Matcher} The matcher with custom description.
 */
AnythingMatcher.describedAs = function(
    description, matcher) {
 return /** @type {!Matcher} */ ({
   matches: function(value) {
    return matcher.matches(value);
   },

   describe: function() {
    return description;
   }
  });
};
