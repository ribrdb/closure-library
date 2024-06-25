/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides the built-in object matchers like equalsObject,
 *     hasProperty, instanceOf, etc.
 */

import { Matcher } from './matcher.js';



/**
 * Matches any object value.
 *
 * @constructor @struct @implements {Matcher} @final
 */
export function AnyObjectMatcher() {}


/** @override */
AnyObjectMatcher.prototype.matches = function(
    actualValue) {
 return goog.isObject(actualValue);
};


/** @override */
AnyObjectMatcher.prototype.describe = function(
    actualValue) {
 return '<' + actualValue + '> is not an object';
};



/**
 * The Equals matcher.
 *
 * @param {!Object} expectedObject The expected object.
 *
 * @constructor
 * @struct
 * @implements {Matcher}
 * @final
 */
export function ObjectEqualsMatcher(expectedObject) {
 /**
  * @type {!Object}
  * @private
  */
 this.object_ = expectedObject;
}


/**
 * Determines if two objects are the same.
 *
 * @override
 */
ObjectEqualsMatcher.prototype.matches =
    function(actualObject) {
     return actualObject === this.object_;
    };


/**
 * @override
 */
ObjectEqualsMatcher.prototype.describe =
    function(actualObject) {
     return 'Input object is not the same as the expected object.';
    };



/**
 * The HasProperty matcher.
 *
 * @param {string} property Name of the property to test.
 *
 * @constructor
 * @struct
 * @implements {Matcher}
 * @final
 */
export function HasPropertyMatcher(property) {
 /**
  * @type {string}
  * @private
  */
 this.property_ = property;
}


/**
 * Determines if an object has a property.
 *
 * @override
 */
HasPropertyMatcher.prototype.matches = function(
    actualObject) {
 return this.property_ in actualObject;
};


/**
 * @override
 */
HasPropertyMatcher.prototype.describe =
    function(actualObject) {
     return 'Object does not have property: ' + this.property_;
    };



/**
 * The InstanceOf matcher.
 *
 * @param {!Object} object The expected class object.
 *
 * @constructor
 * @struct
 * @implements {Matcher}
 * @final
 */
export function InstanceOfMatcher(object) {
 /**
  * @type {!Object}
  * @private
  */
 this.object_ = object;
}


/**
 * Determines if an object is an instance of another object.
 *
 * @override
 */
InstanceOfMatcher.prototype.matches = function(
    actualObject) {
 return actualObject instanceof this.object_;
};


/**
 * @override
 */
InstanceOfMatcher.prototype.describe = function(
    actualObject) {
 return 'Input object is not an instance of the expected object';
};



/**
 * The IsNullOrUndefined matcher.
 *
 * @constructor
 * @struct
 * @implements {Matcher}
 * @final
 */
export function IsNullOrUndefinedMatcher() {}


/**
 * Determines if input value is null or undefined.
 *
 * @override
 */
IsNullOrUndefinedMatcher.prototype.matches =
    function(actualValue) {
     return actualValue == null;
    };


/**
 * @override
 */
IsNullOrUndefinedMatcher.prototype.describe =
    function(actualValue) {
     return actualValue + ' is not null or undefined.';
    };



/**
 * The IsNull matcher.
 *
 * @constructor
 * @struct
 * @implements {Matcher}
 * @final
 */
export function IsNullMatcher() {}


/**
 * Determines if input value is null.
 *
 * @override
 */
IsNullMatcher.prototype.matches = function(
    actualValue) {
 return actualValue === null;
};


/**
 * @override
 */
IsNullMatcher.prototype.describe = function(
    actualValue) {
 return actualValue + ' is not null.';
};



/**
 * The IsUndefined matcher.
 *
 * @constructor
 * @struct
 * @implements {Matcher}
 * @final
 */
export function IsUndefinedMatcher() {}


/**
 * Determines if input value is undefined.
 *
 * @override
 */
IsUndefinedMatcher.prototype.matches = function(
    actualValue) {
 return actualValue === undefined;
};


/**
 * @override
 */
IsUndefinedMatcher.prototype.describe =
    function(actualValue) {
     return actualValue + ' is not undefined.';
    };


/** @return {!AnyObjectMatcher} */
AnyObjectMatcher.anyObject = function() {
 return new AnyObjectMatcher();
};


/**
 * Returns a matcher that matches objects that are equal to the input object.
 * Equality in this case means the two objects are references to the same
 * object.
 *
 * @param {!Object} object The expected object.
 *
 * @return {!ObjectEqualsMatcher} A
 *     ObjectEqualsMatcher.
 */
ObjectEqualsMatcher.equalsObject = function(
    object) {
 return new ObjectEqualsMatcher(object);
};


/**
 * Returns a matcher that matches objects that contain the input property.
 *
 * @param {string} property The property name to check.
 *
 * @return {!HasPropertyMatcher} A
 *     HasPropertyMatcher.
 */
HasPropertyMatcher.hasProperty = function(
    property) {
 return new HasPropertyMatcher(property);
};


/**
 * Returns a matcher that matches instances of the input class.
 *
 * @param {!Object} object The class object.
 *
 * @return {!InstanceOfMatcher} A
 *     InstanceOfMatcher.
 */
InstanceOfMatcher.instanceOfClass = function(
    object) {
 return new InstanceOfMatcher(object);
};


/**
 * Returns a matcher that matches all null values.
 *
 * @return {!IsNullMatcher} A IsNullMatcher.
 */
IsNullMatcher.isNull = function() {
 return new IsNullMatcher();
};


/**
 * Returns a matcher that matches all null and undefined values.
 *
 * @return {!IsNullOrUndefinedMatcher} A
 *     IsNullOrUndefinedMatcher.
 */
IsNullOrUndefinedMatcher.isNullOrUndefined =
    function() {
     return new IsNullOrUndefinedMatcher();
    };


/**
 * Returns a matcher that matches undefined values.
 *
 * @return {!IsUndefinedMatcher} A
 *     IsUndefinedMatcher.
 */
IsUndefinedMatcher.isUndefined = function() {
 return new IsUndefinedMatcher();
};
