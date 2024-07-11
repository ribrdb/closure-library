/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview Defines an interface for serializing objects into strings.
 */

/**
 * An interface for serializing objects into strings.
 * @interface
 */
export function Stringifier() {};


/**
 * Serializes an object or a value to a string.
 * Agnostic to the particular format of object and string.
 *
 * @param {*} object The object to stringify.
 * @return {string} A string representation of the input.
 */
Stringifier.prototype.stringify;
