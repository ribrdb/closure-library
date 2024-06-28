/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview Supplies global data types and constants for the vector math
 *     library.
 */
goog.declareModuleId('goog.vec.vec');


/**
 * On platforms that don't have native Float32Array or Float64Array support we
 * use a javascript implementation so that this math library can be used on all
 * platforms.
 */
import './float32array.js';
import './float64array.js';

// All vector and matrix operations are based upon arrays of numbers using
// either Float32Array, Float64Array, or a standard JavaScript Array of
// Numbers.


/** @typedef {!Float32Array} */
export var Float32;


/** @typedef {!Float64Array} */
export var Float64;


/** @typedef {!Array<number>} */
export var Number;


/** @typedef {!Float32|!Float64|!Number} */
export var AnyType;


/**
 * @deprecated Use AnyType.
 * @typedef {!Float32Array|!Array<number>}
 */
export var ArrayType;


/**
 * For graphics work, 6 decimal places of accuracy are typically all that is
 * required.
 *
 * @type {number}
 * @const
 */
export var EPSILON = 1e-6;
