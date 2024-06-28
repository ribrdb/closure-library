/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides the built-in string matchers like containsString,
 *     startsWith, endsWith, etc.
 */

import * as asserts from '../../asserts/asserts.js';

import { Matcher } from './matcher.js';
import * as googString from '../../string/string.js';



/**
 * Matches any string value.
 *
 * @constructor @struct @implements {Matcher} @final
 */
export function AnyStringMatcher() {}


/** @override */
AnyStringMatcher.prototype.matches = function(
    actualValue) {
 return typeof actualValue === 'string';
};


/** @override */
AnyStringMatcher.prototype.describe = function(
    actualValue) {
 return '<' + actualValue + '> is not a string';
};



/**
 * The ContainsString matcher.
 *
 * @param {string} value The expected string.
 *
 * @constructor
 * @struct
 * @implements {Matcher}
 * @final
 */
export function ContainsStringMatcher(value) {
 /**
  * @type {string}
  * @private
  */
 this.value_ = value;
}


/**
 * Determines if input string contains the expected string.
 *
 * @override
 */
ContainsStringMatcher.prototype.matches =
    function(actualValue) {
     asserts.assertString(actualValue);
     return googString.contains(actualValue, this.value_);
    };


/**
 * @override
 */
ContainsStringMatcher.prototype.describe =
    function(actualValue) {
     return actualValue + ' does not contain ' + this.value_;
    };


/**
 * @return {string}
 * @override
 */
ContainsStringMatcher.prototype.toString =
    function() {
     return 'ContainsStringMatcher[' + this.value_ + ']';
    };



/**
 * The EndsWith matcher.
 *
 * @param {string} value The expected string.
 *
 * @constructor
 * @struct
 * @implements {Matcher}
 * @final
 */
export function EndsWithMatcher(value) {
 /**
  * @type {string}
  * @private
  */
 this.value_ = value;
}


/**
 * Determines if input string ends with the expected string.
 *
 * @override
 */
EndsWithMatcher.prototype.matches = function(
    actualValue) {
 asserts.assertString(actualValue);
 return googString.endsWith(actualValue, this.value_);
};


/**
 * @override
 */
EndsWithMatcher.prototype.describe = function(
    actualValue) {
 return actualValue + ' does not end with ' + this.value_;
};


/**
 * @return {string}
 * @override
 */
EndsWithMatcher.prototype.toString =
    function() {
     return 'EndsWithMatcher[' + this.value_ + ']';
    };



/**
 * The EqualToIgnoringWhitespace matcher.  Collapses all whitespace down to a
 * single space before comparing the strings.  It is also case-insensitive.
 *
 * @param {string} value The expected string.
 *
 * @constructor
 * @struct
 * @implements {Matcher}
 * @final
 */
export function EqualToIgnoringWhitespaceMatcher(value) {
 /**
  * @type {string}
  * @private
  */
 this.value_ = value;
}


/**
 * Determines if input string is the expected string when all whitespace in both
 * has been collapsed down into a single space.  Does a case-insensitive match.
 *
 * @override
 * @param {*} actualValue
 * @return {boolean}
 */
EqualToIgnoringWhitespaceMatcher.prototype
    .matches = function(actualValue) {
 asserts.assertString(actualValue);
 const collapsedActualValue = googString.collapseWhitespace(actualValue);
 const collapsedExpectedValue = googString.collapseWhitespace(this.value_);

 return googString.caseInsensitiveCompare(
            collapsedActualValue, collapsedExpectedValue) === 0;
};


/**
 * @override
 * @param {*} actualValue
 * @return {string}
 */
EqualToIgnoringWhitespaceMatcher.prototype
    .describe = function(actualValue) {
 asserts.assertString(actualValue);
 const collapsedSuppliedValue = googString.collapseWhitespace(actualValue);
 const collapsedExpectedString = googString.collapseWhitespace(this.value_);
 return `"${actualValue}" collapses to "${
     collapsedSuppliedValue}" which is not equal(ignoring whitespace and case) to "${
     this.value_}" which collapses to "${collapsedExpectedString}"`;
};


/**
 * @return {string}
 * @override
 */
EqualToIgnoringWhitespaceMatcher.prototype
    .toString = function() {
 return 'EqualToIgnoringWhitespaceMatcher[' + this.value_ + ']';
};



/**
 * The Equals matcher.
 *
 * @param {string} value The expected string.
 *
 * @constructor
 * @struct
 * @implements {Matcher}
 * @final
 */
export function EqualsMatcher(value) {
 /**
  * @type {string}
  * @private
  */
 this.value_ = value;
}


/**
 * Determines if input string is equal to the expected string.
 *
 * @override
 */
EqualsMatcher.prototype.matches = function(
    actualValue) {
 asserts.assertString(actualValue);
 return this.value_ === actualValue;
};


/**
 * @override
 */
EqualsMatcher.prototype.describe = function(
    actualValue) {
 return actualValue + ' is not equal to ' + this.value_;
};


/**
 * @return {string}
 * @override
 */
EqualsMatcher.prototype.toString = function() {
 return 'EqualsMatcher[' + this.value_ + ']';
};



/**
 * The MatchesRegex matcher.
 *
 * @param {!RegExp} regex The expected regex.
 *
 * @constructor
 * @struct
 * @implements {Matcher}
 * @final
 */
export function RegexMatcher(regex) {
 /**
  * @type {!RegExp}
  * @private
  */
 this.regex_ = regex;
}


/**
 * Determines if input string is equal to the expected string.
 *
 * @override
 */
RegexMatcher.prototype.matches = function(
    actualValue) {
 asserts.assertString(actualValue);
 return this.regex_.test(actualValue);
};


/**
 * @override
 */
RegexMatcher.prototype.describe = function(
    actualValue) {
 return actualValue + ' does not match ' + this.regex_;
};


/**
 * @return {string}
 * @override
 */
RegexMatcher.prototype.toString = function() {
 return 'RegexMatcher[' + this.regex_ + ']';
};



/**
 * The StartsWith matcher.
 *
 * @param {string} value The expected string.
 *
 * @constructor
 * @struct
 * @implements {Matcher}
 * @final
 */
export function StartsWithMatcher(value) {
 /**
  * @type {string}
  * @private
  */
 this.value_ = value;
}


/**
 * Determines if input string starts with the expected string.
 *
 * @override
 */
StartsWithMatcher.prototype.matches = function(
    actualValue) {
 asserts.assertString(actualValue);
 return googString.startsWith(actualValue, this.value_);
};


/**
 * @override
 */
StartsWithMatcher.prototype.describe = function(
    actualValue) {
 return actualValue + ' does not start with ' + this.value_;
};


/**
 * @return {string}
 * @override
 */
StartsWithMatcher.prototype.toString =
    function() {
     return 'StartsWithMatcher[' + this.value_ + ']';
    };



/**
 * The StringContainsInOrdermatcher.
 *
 * @param {Array<string>} values The expected string values.
 *
 * @constructor
 * @struct
 * @implements {Matcher}
 * @final
 */
export function StringContainsInOrderMatcher(values) {
 /**
  * @type {Array<string>}
  * @private
  */
 this.values_ = values;
}


/**
 * Determines if input string contains, in order, the expected array of strings.
 * @override
 * @suppress {strictPrimitiveOperators} Part of the go/strict_warnings_migration
 */
StringContainsInOrderMatcher.prototype.matches =
    function(actualValue) {
     asserts.assertString(actualValue);
     var currentIndex, previousIndex = 0;
     for (var i = 0; i < this.values_.length; i++) {
       currentIndex = googString.contains(actualValue, this.values_[i]);
       if (currentIndex < 0 || currentIndex < previousIndex) {
         return false;
       }
       previousIndex = currentIndex;
     }
     return true;
    };


/**
 * @override
 */
StringContainsInOrderMatcher.prototype
    .describe = function(actualValue) {
 return actualValue + ' does not contain the expected values in order.';
};


/**
 * @return {string}
 * @override
 */
StringContainsInOrderMatcher.prototype
    .toString = function() {
 return 'StringContainsInOrderMatcher[' + this.values_ + ']';
};



/** @return {!AnyStringMatcher} */
AnyStringMatcher.anyString = function() {
 return new AnyStringMatcher();
};


/**
 * Matches a string containing the given string.
 *
 * @param {string} value The expected value.
 *
 * @return {!ContainsStringMatcher} A
 *     ContainsStringMatcher.
 */
ContainsStringMatcher.containsString = function(
    value) {
 return new ContainsStringMatcher(value);
};


/**
 * Matches a string that ends with the given string.
 *
 * @param {string} value The expected value.
 *
 * @return {!EndsWithMatcher} A
 *     EndsWithMatcher.
 */
EndsWithMatcher.endsWith = function(value) {
 return new EndsWithMatcher(value);
};


/**
 * Matches a string that equals (ignoring whitespace) the given string.
 *
 * @param {string} value The expected value.
 *
 * @return {!EqualToIgnoringWhitespaceMatcher} A
 *     EqualToIgnoringWhitespaceMatcher.
 */
EqualToIgnoringWhitespaceMatcher
    .equalToIgnoringWhitespace = function(value) {
 return new EqualToIgnoringWhitespaceMatcher(
     value);
};


/**
 * Matches a string that equals the given string.
 *
 * @param {string} value The expected value.
 *
 * @return {!EqualsMatcher} A EqualsMatcher.
 */
EqualsMatcher.equals = function(value) {
 return new EqualsMatcher(value);
};


/**
 * Matches a string against a regular expression.
 *
 * @param {!RegExp} regex The expected regex.
 *
 * @return {!RegexMatcher} A RegexMatcher.
 */
RegexMatcher.matchesRegex = function(regex) {
 return new RegexMatcher(regex);
};


/**
 * Matches a string that starts with the given string.
 *
 * @param {string} value The expected value.
 *
 * @return {!StartsWithMatcher} A
 *     StartsWithMatcher.
 */
StartsWithMatcher.startsWith = function(value) {
 return new StartsWithMatcher(value);
};


/**
 * Matches a string that contains the given strings in order.
 *
 * @param {Array<string>} values The expected value.
 *
 * @return {!StringContainsInOrderMatcher} A
 *     StringContainsInOrderMatcher.
 */
StringContainsInOrderMatcher
    .stringContainsInOrder = function(values) {
 return new StringContainsInOrderMatcher(
     values);
};
