/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides various matcher methods.
 */

import * as decoratormatcher from './decoratormatcher.js';

import * as dictionarymatcher from './dictionarymatcher.js';
import * as logicmatcher from './logicmatcher.js';
import * as numbermatcher from './numbermatcher.js';
import * as objectmatcher from './objectmatcher.js';
import * as stringmatcher from './stringmatcher.js';

/**
 * @const
 */
export var AnythingMatcher = decoratormatcher.AnythingMatcher;

/**
 * @const
 */
export var HasEntriesMatcher = dictionarymatcher.HasEntriesMatcher;

/**
 * @const
 */
export var HasEntryMatcher = dictionarymatcher.HasEntryMatcher;

/**
 * @const
 */
export var HasKeyMatcher = dictionarymatcher.HasKeyMatcher;

/**
 * @const
 */
export var HasValueMatcher = dictionarymatcher.HasValueMatcher;

/**
 * @const
 */
export var AllOfMatcher = logicmatcher.AllOfMatcher;

/**
 * @const
 */
export var AnyOfMatcher = logicmatcher.AnyOfMatcher;

/**
 * @const
 */
export var IsNotMatcher = logicmatcher.IsNotMatcher;

/**
 * @const
 */
export var AnyNumberMatcher = numbermatcher.AnyNumberMatcher;

/**
 * @const
 */
export var CloseToMatcher = numbermatcher.CloseToMatcher;

/**
 * @const
 */
export var EqualToMatcher = numbermatcher.EqualToMatcher;

/**
 * @const
 */
export var GreaterThanEqualToMatcher = numbermatcher.GreaterThanEqualToMatcher;

/**
 * @const
 */
export var GreaterThanMatcher = numbermatcher.GreaterThanMatcher;

/**
 * @const
 */
export var LessThanEqualToMatcher = numbermatcher.LessThanEqualToMatcher;

/**
 * @const
 */
export var LessThanMatcher = numbermatcher.LessThanMatcher;

/**
 * @const
 */
export var AnyObjectMatcher = objectmatcher.AnyObjectMatcher;

/**
 * @const
 */
export var HasPropertyMatcher = objectmatcher.HasPropertyMatcher;

/**
 * @const
 */
export var InstanceOfMatcher = objectmatcher.InstanceOfMatcher;

/**
 * @const
 */
export var IsNullMatcher = objectmatcher.IsNullMatcher;

/**
 * @const
 */
export var IsNullOrUndefinedMatcher = objectmatcher.IsNullOrUndefinedMatcher;

/**
 * @const
 */
export var IsUndefinedMatcher = objectmatcher.IsUndefinedMatcher;

/**
 * @const
 */
export var ObjectEqualsMatcher = objectmatcher.ObjectEqualsMatcher;

/**
 * @const
 */
export var AnyStringMatcher = stringmatcher.AnyStringMatcher;

/**
 * @const
 */
export var ContainsStringMatcher = stringmatcher.ContainsStringMatcher;

/**
 * @const
 */
export var EndsWithMatcher = stringmatcher.EndsWithMatcher;

/**
 * @const
 */
export var EqualToIgnoringWhitespaceMatcher = stringmatcher.EqualToIgnoringWhitespaceMatcher;

/**
 * @const
 */
export var EqualsMatcher = stringmatcher.EqualsMatcher;

/**
 * @const
 */
export var RegexMatcher = stringmatcher.RegexMatcher;

/**
 * @const
 */
export var StartsWithMatcher = stringmatcher.StartsWithMatcher;

/**
 * @const
 */
export var StringContainsInOrderMatcher = stringmatcher.StringContainsInOrderMatcher;

// Globally-defined matchers

/**
 * @const
 */
var anything = decoratormatcher.AnythingMatcher.anything;

/**
 * @const
 */
var describedAs =
    decoratormatcher.AnythingMatcher.describedAs;

/**
 * @const
 */
var is = decoratormatcher.AnythingMatcher.is;

/**
 * @const
 */
var hasEntries =
    dictionarymatcher.HasEntriesMatcher.hasEntries;

/**
 * @const
 */
var hasEntry = dictionarymatcher.HasEntryMatcher.hasEntry;

/**
 * @const
 */
var hasKey = dictionarymatcher.HasKeyMatcher.hasKey;

/**
 * @const
 */
var hasValue = dictionarymatcher.HasValueMatcher.hasValue;

/**
 * @const
 */
var allOf = logicmatcher.AllOfMatcher.allOf;

/**
 * @const
 */
var anyOf = logicmatcher.AnyOfMatcher.anyOf;

/**
 * @const
 */
var isNot = logicmatcher.IsNotMatcher.isNot;

/**
 * @const
 */
var anyNumber = numbermatcher.AnyNumberMatcher.anyNumber;

/**
 * @const
 */
var closeTo = numbermatcher.CloseToMatcher.closeTo;

/**
 * @const
 */
var equalTo = numbermatcher.EqualToMatcher.equalTo;

/**
 * @const
 */
var greaterThanEqualTo = numbermatcher
                             .GreaterThanEqualToMatcher.greaterThanEqualTo;

/**
 * @const
 */
var greaterThan =
    numbermatcher.GreaterThanMatcher.greaterThan;

/**
 * @const
 */
var lessThanEqualTo =
    numbermatcher.LessThanEqualToMatcher.lessThanEqualTo;

/**
 * @const
 */
var lessThan = numbermatcher.LessThanMatcher.lessThan;

/**
 * @const
 */
var anyObject = objectmatcher.AnyObjectMatcher.anyObject;

/**
 * @const
 */
var hasProperty =
    objectmatcher.HasPropertyMatcher.hasProperty;

/**
 * @const
 */
var instanceOfClass =
    objectmatcher.InstanceOfMatcher.instanceOfClass;

/**
 * @const
 */
var isNull = objectmatcher.IsNullMatcher.isNull;

/**
 * @const
 */
var isNullOrUndefined =
    objectmatcher.IsNullOrUndefinedMatcher.isNullOrUndefined;

/**
 * @const
 */
var isUndefined =
    objectmatcher.IsUndefinedMatcher.isUndefined;

/**
 * @const
 */
var equalsObject =
    objectmatcher.ObjectEqualsMatcher.equalsObject;

/**
 * @const
 */
var anyString = stringmatcher.AnyStringMatcher.anyString;

/**
 * @const
 */
var containsString =
    stringmatcher.ContainsStringMatcher.containsString;

/**
 * @const
 */
var endsWith = stringmatcher.EndsWithMatcher.endsWith;

/**
 * @const
 */
var equalToIgnoringWhitespace =
    stringmatcher.EqualToIgnoringWhitespaceMatcher
        .equalToIgnoringWhitespace;

/**
 * @const
 */
var equals = stringmatcher.EqualsMatcher.equals;

/**
 * @const
 */
var matchesRegex = stringmatcher.RegexMatcher.matchesRegex;

/**
 * @const
 */
var startsWith = stringmatcher.StartsWithMatcher.startsWith;

/**
 * @const
 */
var stringContainsInOrder =
    stringmatcher.StringContainsInOrderMatcher
        .stringContainsInOrder;
