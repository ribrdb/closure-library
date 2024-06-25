/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview Defines an interface for parsing strings into objects.
 */

goog.declareModuleId('goog.string.parser');



/**
 * An interface for parsing strings into objects.
 * @interface
 */
export function Parser() {}


/**
 * Parses a string into an object and returns the result.
 * Agnostic to the format of string and object.
 *
 * @param {string} s The string to parse.
 * @return {*} The object generated from the string.
 */
Parser.prototype.parse;
