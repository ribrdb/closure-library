/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides the built-in number matchers like lessThan,
 * greaterThan, etc.
 */

import * as asserts from '../../asserts/asserts.js';

import { Matcher } from './matcher.js';


/**
 * Matches any number value.
 *
 * @constructor @struct @implements {Matcher} @final
 */
export function AnyNumberMatcher() {}


/** @override */
AnyNumberMatcher.prototype.matches = function(
    actualValue) {
 return typeof actualValue === 'number';
};


/** @override */
AnyNumberMatcher.prototype.describe = function(
    actualValue) {
 return '<' + actualValue + '> is not a number';
};



/**
 * The GreaterThan matcher.
 *
 * @param {number} value The value to compare.
 *
 * @constructor
 * @struct
 * @implements {Matcher}
 * @final
 */
export function GreaterThanMatcher(value) {
 /**
  * @type {number}
  * @private
  */
 this.value_ = value;
}


/**
 * Determines if input value is greater than the expected value.
 *
 * @override
 */
GreaterThanMatcher.prototype.matches = function(
    actualValue) {
 asserts.assertNumber(actualValue);
 return actualValue > this.value_;
};


/**
 * @override
 */
GreaterThanMatcher.prototype.describe =
    function(actualValue) {
     asserts.assertNumber(actualValue);
     return actualValue + ' is not greater than ' + this.value_;
    };



/**
 * The lessThan matcher.
 *
 * @param {number} value The value to compare.
 *
 * @constructor
 * @struct
 * @implements {Matcher}
 * @final
 */
export function LessThanMatcher(value) {
 /**
  * @type {number}
  * @private
  */
 this.value_ = value;
}


/**
 * Determines if the input value is less than the expected value.
 *
 * @override
 */
LessThanMatcher.prototype.matches = function(
    actualValue) {
 asserts.assertNumber(actualValue);
 return actualValue < this.value_;
};


/**
 * @override
 */
LessThanMatcher.prototype.describe = function(
    actualValue) {
 asserts.assertNumber(actualValue);
 return actualValue + ' is not less than ' + this.value_;
};



/**
 * The GreaterThanEqualTo matcher.
 *
 * @param {number} value The value to compare.
 *
 * @constructor
 * @struct
 * @implements {Matcher}
 * @final
 */
export function GreaterThanEqualToMatcher(value) {
 /**
  * @type {number}
  * @private
  */
 this.value_ = value;
}


/**
 * Determines if the input value is greater than equal to the expected value.
 *
 * @override
 */
GreaterThanEqualToMatcher.prototype.matches =
    function(actualValue) {
     asserts.assertNumber(actualValue);
     return actualValue >= this.value_;
    };


/**
 * @override
 */
GreaterThanEqualToMatcher.prototype.describe =
    function(actualValue) {
     asserts.assertNumber(actualValue);
     return actualValue + ' is not greater than equal to ' + this.value_;
    };



/**
 * The LessThanEqualTo matcher.
 *
 * @param {number} value The value to compare.
 *
 * @constructor
 * @struct
 * @implements {Matcher}
 * @final
 */
export function LessThanEqualToMatcher(value) {
 /**
  * @type {number}
  * @private
  */
 this.value_ = value;
}


/**
 * Determines if the input value is less than or equal to the expected value.
 *
 * @override
 */
LessThanEqualToMatcher.prototype.matches =
    function(actualValue) {
     asserts.assertNumber(actualValue);
     return actualValue <= this.value_;
    };


/**
 * @override
 */
LessThanEqualToMatcher.prototype.describe =
    function(actualValue) {
     asserts.assertNumber(actualValue);
     return actualValue + ' is not less than equal to ' + this.value_;
    };



/**
 * The EqualTo matcher.
 *
 * @param {number} value The value to compare.
 *
 * @constructor
 * @struct
 * @implements {Matcher}
 * @final
 */
export function EqualToMatcher(value) {
 /**
  * @type {number}
  * @private
  */
 this.value_ = value;
}


/**
 * Determines if the input value is equal to the expected value.
 *
 * @override
 */
EqualToMatcher.prototype.matches = function(
    actualValue) {
 asserts.assertNumber(actualValue);
 return actualValue === this.value_;
};


/**
 * @override
 */
EqualToMatcher.prototype.describe = function(
    actualValue) {
 asserts.assertNumber(actualValue);
 return actualValue + ' is not equal to ' + this.value_;
};



/**
 * The CloseTo matcher.
 *
 * @param {number} value The value to compare.
 * @param {number} range The range to check within.
 *
 * @constructor
 * @struct
 * @implements {Matcher}
 * @final
 */
export function CloseToMatcher(value, range) {
 /**
  * @type {number}
  * @private
  */
 this.value_ = value;
 /**
  * @type {number}
  * @private
  */
 this.range_ = range;
}


/**
 * Determines if input value is within a certain range of the expected value.
 *
 * @override
 */
CloseToMatcher.prototype.matches = function(
    actualValue) {
 asserts.assertNumber(actualValue);
 return Math.abs(this.value_ - actualValue) < this.range_;
};


/**
 * @override
 */
CloseToMatcher.prototype.describe = function(
    actualValue) {
 asserts.assertNumber(actualValue);
 return actualValue + ' is not close to(' + this.range_ + ') ' + this.value_;
};


/** @return {!AnyNumberMatcher} */
AnyNumberMatcher.anyNumber = function() {
 return new AnyNumberMatcher();
};


/**
 * @param {number} value The expected value.
 *
 * @return {!GreaterThanMatcher} A
 *     GreaterThanMatcher.
 */
GreaterThanMatcher.greaterThan = function(
    value) {
 return new GreaterThanMatcher(value);
};


/**
 * @param {number} value The expected value.
 *
 * @return {!GreaterThanEqualToMatcher} A
 *     GreaterThanEqualToMatcher.
 */
GreaterThanEqualToMatcher.greaterThanEqualTo =
    function(value) {
     return new GreaterThanEqualToMatcher(value);
    };


/**
 * @param {number} value The expected value.
 *
 * @return {!LessThanMatcher} A LessThanMatcher.
 */
LessThanMatcher.lessThan = function(value) {
 return new LessThanMatcher(value);
};


/**
 * @param {number} value The expected value.
 *
 * @return {!LessThanEqualToMatcher} A
 *     LessThanEqualToMatcher.
 */
LessThanEqualToMatcher.lessThanEqualTo =
    function(value) {
     return new LessThanEqualToMatcher(value);
    };


/**
 * @param {number} value The expected value.
 *
 * @return {!EqualToMatcher} An EqualToMatcher.
 */
EqualToMatcher.equalTo = function(value) {
 return new EqualToMatcher(value);
};


/**
 * @param {number} value The expected value.
 * @param {number} range The maximum allowed difference from the expected value.
 *
 * @return {!CloseToMatcher} A CloseToMatcher.
 */
CloseToMatcher.closeTo = function(
    value, range) {
 return new CloseToMatcher(value, range);
};
