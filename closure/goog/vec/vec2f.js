/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


////////////////////////// NOTE ABOUT EDITING THIS FILE ///////////////////////
//                                                                           //
// Any edits to this file must be applied to vec2d.js by running:            //
//   swap_type.sh vec2f.js > vec2d.js                                        //
//                                                                           //
////////////////////////// NOTE ABOUT EDITING THIS FILE ///////////////////////


/**
 * @fileoverview Provides functions for operating on 2 element float (32bit)
 * vectors.
 *
 * The last parameter will typically be the output object and an object
 * can be both an input and output parameter to all methods except where
 * noted.
 *
 * See the README for notes about the design and structure of the API
 * (especially related to performance).
 */

import * as googVec from './vec.js';


/** @typedef {!googVec.Float32} */ export var Type;


/**
 * Creates a vec2f with all elements initialized to zero.
 *
 * @return {!Type} The new vec2f.
 */
export function create() {
  return new Float32Array(2);
}


/**
 * Creates a new vec2f initialized with the value from the given array.
 *
 * @param {!Array<number>} vec The source 2 element array.
 * @return {!Type} The new vec2f.
 */
export function createFromArray(vec) {
  const newVec = create();
  setFromArray(newVec, vec);
  return newVec;
}


/**
 * Creates a new vec2f initialized with the supplied values.
 *
 * @param {number} v0 The value for element at index 0.
 * @param {number} v1 The value for element at index 1.
 * @return {!Type} The new vector.
 */
export function createFromValues(v0, v1) {
  const vec = create();
  setFromValues(vec, v0, v1);
  return vec;
}


/**
 * Creates a clone of the given vec2f.
 *
 * @param {!Type} vec The source vec2f.
 * @return {!Type} The new cloned vec2f.
 */
export function clone(vec) {
  const newVec = create();
  setFromVec2f(newVec, vec);
  return newVec;
}


/**
 * Initializes the vector with the given values.
 *
 * @param {!Type} vec The vector to receive the values.
 * @param {number} v0 The value for element at index 0.
 * @param {number} v1 The value for element at index 1.
 * @return {!Type} Return vec so that operations can be
 *     chained together.
 */
export function setFromValues(vec, v0, v1) {
  vec[0] = v0;
  vec[1] = v1;
  return vec;
}


/**
 * Initializes vec2f vec from vec2f src.
 *
 * @param {!Type} vec The destination vector.
 * @param {!Type} src The source vector.
 * @return {!Type} Return vec so that operations can be
 *     chained together.
 */
export function setFromVec2f(vec, src) {
  vec[0] = src[0];
  vec[1] = src[1];
  return vec;
}


/**
 * Initializes vec2f vec from vec2d src (typed as a Float64Array to
 * avoid circular goog.requires).
 *
 * @param {!Type} vec The destination vector.
 * @param {Float64Array} src The source vector.
 * @return {!Type} Return vec so that operations can be
 *     chained together.
 */
export function setFromVec2d(vec, src) {
  vec[0] = src[0];
  vec[1] = src[1];
  return vec;
}


/**
 * Initializes vec2f vec from Array src.
 *
 * @param {!Type} vec The destination vector.
 * @param {Array<number>} src The source vector.
 * @return {!Type} Return vec so that operations can be
 *     chained together.
 */
export function setFromArray(vec, src) {
  vec[0] = src[0];
  vec[1] = src[1];
  return vec;
}


/**
 * Performs a component-wise addition of vec0 and vec1 together storing the
 * result into resultVec.
 *
 * @param {!Type} vec0 The first addend.
 * @param {!Type} vec1 The second addend.
 * @param {!Type} resultVec The vector to
 *     receive the result. May be vec0 or vec1.
 * @return {!Type} Return resultVec so that operations can be
 *     chained together.
 */
export function add(vec0, vec1, resultVec) {
  resultVec[0] = vec0[0] + vec1[0];
  resultVec[1] = vec0[1] + vec1[1];
  return resultVec;
}


/**
 * Performs a component-wise subtraction of vec1 from vec0 storing the
 * result into resultVec.
 *
 * @param {!Type} vec0 The minuend.
 * @param {!Type} vec1 The subtrahend.
 * @param {!Type} resultVec The vector to
 *     receive the result. May be vec0 or vec1.
 * @return {!Type} Return resultVec so that operations can be
 *     chained together.
 */
export function subtract(vec0, vec1, resultVec) {
  resultVec[0] = vec0[0] - vec1[0];
  resultVec[1] = vec0[1] - vec1[1];
  return resultVec;
}


/**
 * Multiplies each component of vec0 with the matching element of vec0
 * storing the products into resultVec.
 *
 * @param {!Type} vec0 The first vector.
 * @param {!Type} vec1 The second vector.
 * @param {!Type} resultVec The vector to
 *     receive the result. May be vec0.
 * @return {!Type} Return resultVec so that operations can be
 *     chained together.
 */
export function componentMultiply(vec0, vec1, resultVec) {
  resultVec[0] = vec0[0] * vec1[0];
  resultVec[1] = vec0[1] * vec1[1];
  return resultVec;
}


/**
 * Divides each component of vec0 with the matching element of vec0
 * storing the divisor into resultVec.
 *
 * @param {!Type} vec0 The first vector.
 * @param {!Type} vec1 The second vector.
 * @param {!Type} resultVec The vector to
 *     receive the result. May be vec0.
 * @return {!Type} Return resultVec so that operations can be
 *     chained together.
 */
export function componentDivide(vec0, vec1, resultVec) {
  resultVec[0] = vec0[0] / vec1[0];
  resultVec[1] = vec0[1] / vec1[1];
  return resultVec;
}


/**
 * Negates vec0, storing the result into resultVec.
 *
 * @param {!Type} vec0 The vector to negate.
 * @param {!Type} resultVec The vector to
 *     receive the result. May be vec0.
 * @return {!Type} Return resultVec so that operations can be
 *     chained together.
 */
export function negate(vec0, resultVec) {
  resultVec[0] = -vec0[0];
  resultVec[1] = -vec0[1];
  return resultVec;
}


/**
 * Takes the absolute value of each component of vec0 storing the result in
 * resultVec.
 *
 * @param {!Type} vec0 The source vector.
 * @param {!Type} resultVec The vector to receive the result.
 *     May be vec0.
 * @return {!Type} Return resultVec so that operations can be
 *     chained together.
 */
export function abs(vec0, resultVec) {
  resultVec[0] = Math.abs(vec0[0]);
  resultVec[1] = Math.abs(vec0[1]);
  return resultVec;
}


/**
 * Multiplies each component of vec0 with scalar storing the product into
 * resultVec.
 *
 * @param {!Type} vec0 The source vector.
 * @param {number} scalar The value to multiply with each component of vec0.
 * @param {!Type} resultVec The vector to
 *     receive the result. May be vec0.
 * @return {!Type} Return resultVec so that operations can be
 *     chained together.
 */
export function scale(vec0, scalar, resultVec) {
  resultVec[0] = vec0[0] * scalar;
  resultVec[1] = vec0[1] * scalar;
  return resultVec;
}


/**
 * Returns the magnitudeSquared of the given vector.
 *
 * @param {!Type} vec0 The vector.
 * @return {number} The magnitude of the vector.
 */
export function magnitudeSquared(vec0) {
  const x = vec0[0];
  const y = vec0[1];

  return x * x + y * y;
}


/**
 * Returns the magnitude of the given vector.
 *
 * @param {!Type} vec0 The vector.
 * @return {number} The magnitude of the vector.
 */
export function magnitude(vec0) {
  const x = vec0[0];
  const y = vec0[1];

  return Math.sqrt(x * x + y * y);
}


/**
 * Normalizes the given vector storing the result into resultVec.
 *
 * @param {!Type} vec0 The vector to normalize.
 * @param {!Type} resultVec The vector to
 *     receive the result. May be vec0.
 * @return {!Type} Return resultVec so that operations can be
 *     chained together.
 */
export function normalize(vec0, resultVec) {
  const x = vec0[0];
  const y = vec0[1];

  const ilen = 1 / Math.sqrt(x * x + y * y);
  resultVec[0] = x * ilen;
  resultVec[1] = y * ilen;
  return resultVec;
}


/**
 * Returns the scalar product of vectors vec0 and vec1.
 *
 * @param {!Type} vec0 The first vector.
 * @param {!Type} vec1 The second vector.
 * @return {number} The scalar product.
 */
export function dot(vec0, vec1) {
  return vec0[0] * vec1[0] + vec0[1] * vec1[1];
}


/**
 * Returns the squared distance between two points.
 *
 * @param {!Type} vec0 First point.
 * @param {!Type} vec1 Second point.
 * @return {number} The squared distance between the points.
 */
export function distanceSquared(vec0, vec1) {
  const x = vec0[0] - vec1[0];
  const y = vec0[1] - vec1[1];
  return x * x + y * y;
}


/**
 * Returns the distance between two points.
 *
 * @param {!Type} vec0 First point.
 * @param {!Type} vec1 Second point.
 * @return {number} The distance between the points.
 */
export function distance(vec0, vec1) {
  return Math.sqrt(distanceSquared(vec0, vec1));
}


/**
 * Returns a unit vector pointing from one point to another.
 * If the input points are equal then the result will be all zeros.
 *
 * @param {!Type} vec0 Origin point.
 * @param {!Type} vec1 Target point.
 * @param {!Type} resultVec The vector to receive the
 *     results (may be vec0 or vec1).
 * @return {!Type} Return resultVec so that operations can be
 *     chained together.
 */
export function direction(vec0, vec1, resultVec) {
  const x = vec1[0] - vec0[0];
  const y = vec1[1] - vec0[1];
  let d = Math.sqrt(x * x + y * y);
  if (d) {
    d = 1 / d;
    resultVec[0] = x * d;
    resultVec[1] = y * d;
  } else {
    resultVec[0] = resultVec[1] = 0;
  }
  return resultVec;
}


/**
 * Linearly interpolate from vec0 to vec1 according to f. The value of f should
 * be in the range [0..1] otherwise the results are undefined.
 *
 * @param {!Type} vec0 The first vector.
 * @param {!Type} vec1 The second vector.
 * @param {number} f The interpolation factor.
 * @param {!Type} resultVec The vector to receive the
 *     results (may be vec0 or vec1).
 * @return {!Type} Return resultVec so that operations can be
 *     chained together.
 */
export function lerp(vec0, vec1, f, resultVec) {
  const x = vec0[0];
  const y = vec0[1];

  resultVec[0] = (vec1[0] - x) * f + x;
  resultVec[1] = (vec1[1] - y) * f + y;
  return resultVec;
}


/**
 * Compares the components of vec0 with the components of another vector or
 * scalar, storing the larger values in resultVec.
 *
 * @param {!Type} vec0 The source vector.
 * @param {!Type|number} limit The limit vector or scalar.
 * @param {!Type} resultVec The vector to receive the
 *     results (may be vec0 or limit).
 * @return {!Type} Return resultVec so that operations can be
 *     chained together.
 */
export function max(vec0, limit, resultVec) {
  if (typeof limit === 'number') {
    resultVec[0] = Math.max(vec0[0], limit);
    resultVec[1] = Math.max(vec0[1], limit);
  } else {
    resultVec[0] = Math.max(vec0[0], limit[0]);
    resultVec[1] = Math.max(vec0[1], limit[1]);
  }
  return resultVec;
}


/**
 * Compares the components of vec0 with the components of another vector or
 * scalar, storing the smaller values in resultVec.
 *
 * @param {!Type} vec0 The source vector.
 * @param {!Type|number} limit The limit vector or scalar.
 * @param {!Type} resultVec The vector to receive the
 *     results (may be vec0 or limit).
 * @return {!Type} Return resultVec so that operations can be
 *     chained together.
 */
export function min(vec0, limit, resultVec) {
  if (typeof limit === 'number') {
    resultVec[0] = Math.min(vec0[0], limit);
    resultVec[1] = Math.min(vec0[1], limit);
  } else {
    resultVec[0] = Math.min(vec0[0], limit[0]);
    resultVec[1] = Math.min(vec0[1], limit[1]);
  }
  return resultVec;
}


/**
 * Returns true if the components of vec0 are equal to the components of vec1.
 *
 * @param {!Type} vec0 The first vector.
 * @param {!Type} vec1 The second vector.
 * @return {boolean} True if the vectors are equal, false otherwise.
 */
export function equals(vec0, vec1) {
  return vec0.length == vec1.length && vec0[0] == vec1[0] && vec0[1] == vec1[1];
}
