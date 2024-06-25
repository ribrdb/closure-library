/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview Defines a class for parsing JSON using the browser's built in
 * JSON library.
 */

import { Parser } from '../string/parser.js';

import { Stringifier } from '../string/stringifier.js';
import * as asserts from '../asserts/asserts.js';
import { Replacer, Reviver } from './types.js';



/**
 * A class that parses and stringifies JSON using the browser's built-in JSON
 * library.
 *

 * @implements {Parser}
 * @implements {Stringifier}
 * @final
 */
export default class {
  /**
   * @param {?Replacer=} opt_replacer An optional replacer to use during
   *     serialization.
   * @param {?=} opt_reviver An optional reviver to use during
   *     parsing.
   */
  constructor(opt_replacer, opt_reviver) {
    asserts.assert(goog.global['JSON'] !== undefined, 'JSON not defined');

    /**
     * @type {!Replacer|null|undefined}
     * @private
     */
    this.replacer_ = opt_replacer;

    /**
     * @type {!Reviver|null|undefined}
     * @private
     */
    this.reviver_ = opt_reviver;
  };

  /**
   * Serializes an object or a value to a string.
   * Agnostic to the particular format of object and string.
   *
   * @param {*} object The object to stringify.
   * @return {string} A string representation of the input.
   * @override
   */
  stringify(object) {
    return goog.global['JSON'].stringify(object, this.replacer_);
  }

  /**
   * Parses a string into an object and returns the result.
   * Agnostic to the format of string and object.
   *
   * @param {string} s The string to parse.
   * @return {*} The object generated from the string.
   * @override
   */
  parse(s) {
    return goog.global['JSON'].parse(s, this.reviver_);
  }
}
