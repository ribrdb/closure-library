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
goog.global['anything'] = decoratormatcher.AnythingMatcher.anything;

/**
 * @const
 */
goog.global['describedAs'] =
    decoratormatcher.AnythingMatcher.describedAs;

/**
 * @const
 */
goog.global['is'] = decoratormatcher.AnythingMatcher.is;

/**
 * @const
 */
goog.global['hasEntries'] =
    dictionarymatcher.HasEntriesMatcher.hasEntries;

/**
 * @const
 */
goog.global['hasEntry'] = dictionarymatcher.HasEntryMatcher.hasEntry;

/**
 * @const
 */
goog.global['hasKey'] = dictionarymatcher.HasKeyMatcher.hasKey;

/**
 * @const
 */
goog.global['hasValue'] = dictionarymatcher.HasValueMatcher.hasValue;

/**
 * @const
 */
goog.global['allOf'] = logicmatcher.AllOfMatcher.allOf;

/**
 * @const
 */
goog.global['anyOf'] = logicmatcher.AnyOfMatcher.anyOf;

/**
 * @const
 */
goog.global['isNot'] = logicmatcher.IsNotMatcher.isNot;

/**
 * @const
 */
goog.global['anyNumber'] = numbermatcher.AnyNumberMatcher.anyNumber;

/**
 * @const
 */
goog.global['closeTo'] = numbermatcher.CloseToMatcher.closeTo;

/**
 * @const
 */
goog.global['equalTo'] = numbermatcher.EqualToMatcher.equalTo;

/**
 * @const
 */
goog.global['greaterThanEqualTo'] = numbermatcher
                             .GreaterThanEqualToMatcher.greaterThanEqualTo;

/**
 * @const
 */
goog.global['greaterThan'] =
    numbermatcher.GreaterThanMatcher.greaterThan;

/**
 * @const
 */
goog.global['lessThanEqualTo'] =
    numbermatcher.LessThanEqualToMatcher.lessThanEqualTo;

/**
 * @const
 */
goog.global['lessThan'] = numbermatcher.LessThanMatcher.lessThan;

/**
 * @const
 */
goog.global['anyObject'] = objectmatcher.AnyObjectMatcher.anyObject;

/**
 * @const
 */
goog.global['hasProperty'] =
    objectmatcher.HasPropertyMatcher.hasProperty;

/**
 * @const
 */
goog.global['instanceOfClass'] =
    objectmatcher.InstanceOfMatcher.instanceOfClass;

/**
 * @const
 */
goog.global['isNull'] = objectmatcher.IsNullMatcher.isNull;

/**
 * @const
 */
goog.global['isNullOrUndefined'] =
    objectmatcher.IsNullOrUndefinedMatcher.isNullOrUndefined;

/**
 * @const
 */
goog.global['isUndefined'] =
    objectmatcher.IsUndefinedMatcher.isUndefined;

/**
 * @const
 */
goog.global['equalsObject'] =
    objectmatcher.ObjectEqualsMatcher.equalsObject;

/**
 * @const
 */
goog.global['anyString'] = stringmatcher.AnyStringMatcher.anyString;

/**
 * @const
 */
goog.global['containsString'] =
    stringmatcher.ContainsStringMatcher.containsString;

/**
 * @const
 */
goog.global['endsWith'] = stringmatcher.EndsWithMatcher.endsWith;

/**
 * @const
 */
goog.global['equalToIgnoringWhitespace'] =
    stringmatcher.EqualToIgnoringWhitespaceMatcher
        .equalToIgnoringWhitespace;

/**
 * @const
 */
goog.global['equals'] = stringmatcher.EqualsMatcher.equals;

/**
 * @const
 */
goog.global['matchesRegex'] = stringmatcher.RegexMatcher.matchesRegex;

/**
 * @const
 */
goog.global['startsWith'] = stringmatcher.StartsWithMatcher.startsWith;

/**
 * @const
 */
goog.global['stringContainsInOrder'] =
    stringmatcher.StringContainsInOrderMatcher
        .stringContainsInOrder;
