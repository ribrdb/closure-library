/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Definition of 2 element vectors.  This follows the same design
 * patterns as Vec3 and Vec4.
 */

import * as googVec from './vec.js';


/** @typedef {!googVec.Float32} */ export var Float32;
/** @typedef {!googVec.Float64} */ export var Float64;
/** @typedef {!googVec.Number} */ export var Number;
/** @typedef {!googVec.AnyType} */ export var AnyType;


/**
 * Creates a 2 element vector of Float32. The array is initialized to zero.
 *
 * @return {!Float32} The new 2 element array.
 */
export function createFloat32() {
  return new Float32Array(2);
}


/**
 * Creates a 2 element vector of Float64. The array is initialized to zero.
 *
 * @return {!Float64} The new 2 element array.
 */
export function createFloat64() {
  return new Float64Array(2);
}


/**
 * Creates a 2 element vector of Number. The array is initialized to zero.
 *
 * @return {!Number} The new 2 element array.
 */
export function createNumber() {
  var a = new Array(2);
  setFromValues(a, 0, 0);
  return a;
}


/**
 * Creates a new 2 element FLoat32 vector initialized with the value from the
 * given array.
 *
 * @param {AnyType} vec The source 2 element array.
 * @return {!Float32} The new 2 element array.
 */
export function createFloat32FromArray(vec) {
  var newVec = createFloat32();
  setFromArray(newVec, vec);
  return newVec;
}


/**
 * Creates a new 2 element Float32 vector initialized with the supplied values.
 *
 * @param {number} vec0 The value for element at index 0.
 * @param {number} vec1 The value for element at index 1.
 * @return {!Float32} The new vector.
 */
export function createFloat32FromValues(vec0, vec1) {
  var a = createFloat32();
  setFromValues(a, vec0, vec1);
  return a;
}


/**
 * Creates a clone of the given 2 element Float32 vector.
 *
 * @param {Float32} vec The source 2 element vector.
 * @return {!Float32} The new cloned vector.
 */
export var cloneFloat32 = createFloat32FromArray;


/**
 * Creates a new 2 element Float64 vector initialized with the value from the
 * given array.
 *
 * @param {AnyType} vec The source 2 element array.
 * @return {!Float64} The new 2 element array.
 */
export function createFloat64FromArray(vec) {
  var newVec = createFloat64();
  setFromArray(newVec, vec);
  return newVec;
}


/**
* Creates a new 2 element Float64 vector initialized with the supplied values.
*
* @param {number} vec0 The value for element at index 0.
* @param {number} vec1 The value for element at index 1.
* @return {!Float64} The new vector.
*/
export function createFloat64FromValues(vec0, vec1) {
  var vec = createFloat64();
  setFromValues(vec, vec0, vec1);
  return vec;
}


/**
 * Creates a clone of the given 2 element vector.
 *
 * @param {Float64} vec The source 2 element vector.
 * @return {!Float64} The new cloned vector.
 */
export var cloneFloat64 = createFloat64FromArray;


/**
 * Initializes the vector with the given values.
 *
 * @param {AnyType} vec The vector to receive the values.
 * @param {number} vec0 The value for element at index 0.
 * @param {number} vec1 The value for element at index 1.
 * @return {!AnyType} Return vec so that operations can be
 *     chained together.
 */
export function setFromValues(vec, vec0, vec1) {
  vec[0] = vec0;
  vec[1] = vec1;
  return vec;
}


/**
 * Initializes the vector with the given array of values.
 *
 * @param {AnyType} vec The vector to receive the
 *     values.
 * @param {AnyType} values The array of values.
 * @return {!AnyType} Return vec so that operations can be
 *     chained together.
 */
export function setFromArray(vec, values) {
  vec[0] = values[0];
  vec[1] = values[1];
  return vec;
}


/**
 * Performs a component-wise addition of vec0 and vec1 together storing the
 * result into resultVec.
 *
 * @param {AnyType} vec0 The first addend.
 * @param {AnyType} vec1 The second addend.
 * @param {AnyType} resultVec The vector to
 *     receive the result. May be vec0 or vec1.
 * @return {!AnyType} Return resultVec so that operations can be
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
 * @param {AnyType} vec0 The minuend.
 * @param {AnyType} vec1 The subtrahend.
 * @param {AnyType} resultVec The vector to
 *     receive the result. May be vec0 or vec1.
 * @return {!AnyType} Return resultVec so that operations can be
 *     chained together.
 */
export function subtract(vec0, vec1, resultVec) {
  resultVec[0] = vec0[0] - vec1[0];
  resultVec[1] = vec0[1] - vec1[1];
  return resultVec;
}


/**
 * Negates vec0, storing the result into resultVec.
 *
 * @param {AnyType} vec0 The vector to negate.
 * @param {AnyType} resultVec The vector to
 *     receive the result. May be vec0.
 * @return {!AnyType} Return resultVec so that operations can be
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
 * @param {AnyType} vec0 The source vector.
 * @param {AnyType} resultVec The vector to receive the result.
 *     May be vec0.
 * @return {!AnyType} Return resultVec so that operations can be
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
 * @param {AnyType} vec0 The source vector.
 * @param {number} scalar The value to multiply with each component of vec0.
 * @param {AnyType} resultVec The vector to
 *     receive the result. May be vec0.
 * @return {!AnyType} Return resultVec so that operations can be
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
 * @param {AnyType} vec0 The vector.
 * @return {number} The magnitude of the vector.
 */
export function magnitudeSquared(vec0) {
  var x = vec0[0], y = vec0[1];
  return x * x + y * y;
}


/**
 * Returns the magnitude of the given vector.
 *
 * @param {AnyType} vec0 The vector.
 * @return {number} The magnitude of the vector.
 */
export function magnitude(vec0) {
  var x = vec0[0], y = vec0[1];
  return Math.hypot(x, y);
}


/**
 * Normalizes the given vector storing the result into resultVec.
 *
 * @param {AnyType} vec0 The vector to normalize.
 * @param {AnyType} resultVec The vector to
 *     receive the result. May be vec0.
 * @return {!AnyType} Return resultVec so that operations can be
 *     chained together.
 */
export function normalize(vec0, resultVec) {
  var ilen = 1 / magnitude(vec0);
  resultVec[0] = vec0[0] * ilen;
  resultVec[1] = vec0[1] * ilen;
  return resultVec;
}


/**
 * Returns the scalar product of vectors vec0 and vec1.
 *
 * @param {AnyType} vec0 The first vector.
 * @param {AnyType} vec1 The second vector.
 * @return {number} The scalar product.
 */
export function dot(vec0, vec1) {
  return vec0[0] * vec1[0] + vec0[1] * vec1[1];
}


/**
 * Returns the squared distance between two points.
 *
 * @param {AnyType} vec0 First point.
 * @param {AnyType} vec1 Second point.
 * @return {number} The squared distance between the points.
 */
export function distanceSquared(vec0, vec1) {
  var x = vec0[0] - vec1[0];
  var y = vec0[1] - vec1[1];
  return x * x + y * y;
}


/**
 * Returns the distance between two points.
 *
 * @param {AnyType} vec0 First point.
 * @param {AnyType} vec1 Second point.
 * @return {number} The distance between the points.
 */
export function distance(vec0, vec1) {
  return Math.sqrt(distanceSquared(vec0, vec1));
}


/**
 * Returns a unit vector pointing from one point to another.
 * If the input points are equal then the result will be all zeros.
 *
 * @param {AnyType} vec0 Origin point.
 * @param {AnyType} vec1 Target point.
 * @param {AnyType} resultVec The vector to receive the
 *     results (may be vec0 or vec1).
 * @return {!AnyType} Return resultVec so that operations can be
 *     chained together.
 */
export function direction(vec0, vec1, resultVec) {
  var x = vec1[0] - vec0[0];
  var y = vec1[1] - vec0[1];
  var d = Math.sqrt(x * x + y * y);
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
 * @param {AnyType} vec0 The first vector.
 * @param {AnyType} vec1 The second vector.
 * @param {number} f The interpolation factor.
 * @param {AnyType} resultVec The vector to receive the
 *     results (may be vec0 or vec1).
 * @return {!AnyType} Return resultVec so that operations can be
 *     chained together.
 */
export function lerp(vec0, vec1, f, resultVec) {
  var x = vec0[0], y = vec0[1];
  resultVec[0] = (vec1[0] - x) * f + x;
  resultVec[1] = (vec1[1] - y) * f + y;
  return resultVec;
}


/**
 * Compares the components of vec0 with the components of another vector or
 * scalar, storing the larger values in resultVec.
 *
 * @param {AnyType} vec0 The source vector.
 * @param {AnyType|number} limit The limit vector or scalar.
 * @param {AnyType} resultVec The vector to receive the
 *     results (may be vec0 or limit).
 * @return {!AnyType} Return resultVec so that operations can be
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
 * @param {AnyType} vec0 The source vector.
 * @param {AnyType|number} limit The limit vector or scalar.
 * @param {AnyType} resultVec The vector to receive the
 *     results (may be vec0 or limit).
 * @return {!AnyType} Return resultVec so that operations can be
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
 * @param {AnyType} vec0 The first vector.
 * @param {AnyType} vec1 The second vector.
 * @return {boolean} True if the vectors are equal, false otherwise.
 */
export function equals(vec0, vec1) {
  return vec0.length == vec1.length && vec0[0] == vec1[0] && vec0[1] == vec1[1];
}
