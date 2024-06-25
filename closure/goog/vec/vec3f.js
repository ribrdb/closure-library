/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


////////////////////////// NOTE ABOUT EDITING THIS FILE ///////////////////////
//                                                                           //
// Any edits to this file must be applied to vec3d.js by running:            //
//   swap_type.sh vec3f.js > vec3d.js                                        //
//                                                                           //
////////////////////////// NOTE ABOUT EDITING THIS FILE ///////////////////////


/**
 * @fileoverview Provides functions for operating on 3 element float (32bit)
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
 * Creates a vec3f with all elements initialized to zero.
 *
 * @return {!Type} The new vec3f.
 */
export function create() {
  return new Float32Array(3);
}


/**
 * Creates a new vec3f initialized with the value from the given array.
 *
 * @param {!Array<number>} vec The source 3 element array.
 * @return {!Type} The new vec3f.
 */
export function createFromArray(vec) {
  const newVec = create();
  setFromArray(newVec, vec);
  return newVec;
}


/**
 * Creates a new vec3f initialized with the supplied values.
 *
 * @param {number} v0 The value for element at index 0.
 * @param {number} v1 The value for element at index 1.
 * @param {number} v2 The value for element at index 2.
 * @return {!Type} The new vector.
 */
export function createFromValues(v0, v1, v2) {
  const vec = create();
  setFromValues(vec, v0, v1, v2);
  return vec;
}


/**
 * Creates a clone of the given vec3f.
 *
 * @param {!Type} vec The source vec3f.
 * @return {!Type} The new cloned vec3f.
 */
export function clone(vec) {
  const newVec = create();
  setFromVec3f(newVec, vec);
  return newVec;
}


/**
 * Initializes the vector with the given values.
 *
 * @param {!Type} vec The vector to receive the values.
 * @param {number} v0 The value for element at index 0.
 * @param {number} v1 The value for element at index 1.
 * @param {number} v2 The value for element at index 2.
 * @return {!Type} Return vec so that operations can be
 *     chained together.
 */
export function setFromValues(vec, v0, v1, v2) {
  vec[0] = v0;
  vec[1] = v1;
  vec[2] = v2;
  return vec;
}


/**
 * Initializes vec3f vec from vec3f src.
 *
 * @param {!Type} vec The destination vector.
 * @param {!Type} src The source vector.
 * @return {!Type} Return vec so that operations can be
 *     chained together.
 */
export function setFromVec3f(vec, src) {
  vec[0] = src[0];
  vec[1] = src[1];
  vec[2] = src[2];
  return vec;
}


/**
 * Initializes vec3f vec from vec3d src (typed as a Float64Array to
 * avoid circular goog.requires).
 *
 * @param {!Type} vec The destination vector.
 * @param {Float64Array} src The source vector.
 * @return {!Type} Return vec so that operations can be
 *     chained together.
 */
export function setFromVec3d(vec, src) {
  vec[0] = src[0];
  vec[1] = src[1];
  vec[2] = src[2];
  return vec;
}


/**
 * Initializes vec3f vec from Array src.
 *
 * @param {!Type} vec The destination vector.
 * @param {Array<number>} src The source vector.
 * @return {!Type} Return vec so that operations can be
 *     chained together.
 */
export function setFromArray(vec, src) {
  vec[0] = src[0];
  vec[1] = src[1];
  vec[2] = src[2];
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
  resultVec[2] = vec0[2] + vec1[2];
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
  resultVec[2] = vec0[2] - vec1[2];
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
  resultVec[2] = -vec0[2];
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
  resultVec[2] = Math.abs(vec0[2]);
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
  resultVec[2] = vec0[2] * scalar;
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
  const z = vec0[2];

  return x * x + y * y + z * z;
}


/**
 * Returns the magnitude of the given vector.
 *
 * @param {!Type} vec0 The vector.
 * @return {number} The magnitude of the vector.
 */
function magnitude_(vec0) {
  const x = vec0[0];
  const y = vec0[1];
  const z = vec0[2];

  return Math.sqrt(x * x + y * y + z * z);
}


export { magnitude_ as magnitude };


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
  const z = vec0[2];

  const ilen = 1 / Math.sqrt(x * x + y * y + z * z);
  resultVec[0] = x * ilen;
  resultVec[1] = y * ilen;
  resultVec[2] = z * ilen;
  return resultVec;
}


/**
 * Returns the scalar product of vectors v0 and v1.
 *
 * @param {!Type} v0 The first vector.
 * @param {!Type} v1 The second vector.
 * @return {number} The scalar product.
 */
export function dot(v0, v1) {
  return v0[0] * v1[0] + v0[1] * v1[1] + v0[2] * v1[2];
}


/**
 * Computes the vector (cross) product of v0 and v1 storing the result into
 * resultVec.
 *
 * @param {!Type} v0 The first vector.
 * @param {!Type} v1 The second vector.
 * @param {!Type} resultVec The vector to receive the
 *     results. May be either v0 or v1.
 * @return {!Type} Return resultVec so that operations can be
 *     chained together.
 */
export function cross(v0, v1, resultVec) {
  const x0 = v0[0];
  const y0 = v0[1];
  const z0 = v0[2];

  const x1 = v1[0];
  const y1 = v1[1];
  const z1 = v1[2];

  resultVec[0] = y0 * z1 - z0 * y1;
  resultVec[1] = z0 * x1 - x0 * z1;
  resultVec[2] = x0 * y1 - y0 * x1;
  return resultVec;
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
  const z = vec0[2] - vec1[2];
  return x * x + y * y + z * z;
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
  const z = vec1[2] - vec0[2];
  let d = Math.sqrt(x * x + y * y + z * z);
  if (d) {
    d = 1 / d;
    resultVec[0] = x * d;
    resultVec[1] = y * d;
    resultVec[2] = z * d;
  } else {
    resultVec[0] = resultVec[1] = resultVec[2] = 0;
  }
  return resultVec;
}


/**
 * Linearly interpolate from vec0 to v1 according to f. The value of f should be
 * in the range [0..1] otherwise the results are undefined.
 *
 * @param {!Type} v0 The first vector.
 * @param {!Type} v1 The second vector.
 * @param {number} f The interpolation factor.
 * @param {!Type} resultVec The vector to receive the
 *     results (may be v0 or v1).
 * @return {!Type} Return resultVec so that operations can be
 *     chained together.
 */
export function lerp(v0, v1, f, resultVec) {
  const x = v0[0];
  const y = v0[1];
  const z = v0[2];

  resultVec[0] = (v1[0] - x) * f + x;
  resultVec[1] = (v1[1] - y) * f + y;
  resultVec[2] = (v1[2] - z) * f + z;
  return resultVec;
}


/**
 * Perform a spherical linear interpolation from v0 to v1 according to f. The
 * value of f should be in the range [0..1] otherwise the results are undefined.
 *
 * Slerp is normally used to interpolate quaternions, but there is a geometric
 * formula for interpolating vectors directly, see "Geometric Slerp" in:
 * https://en.wikipedia.org/wiki/Slerp.
 *
 * This interpolates the vectors' directions via slerp, but linearly
 * interpolates the vectors' magnitudes.
 *
 * Results are undefined if v0 or v1 are of zero magnitude.
 *
 * @param {!Type} v0 The first vector.
 * @param {!Type} v1 The second vector.
 * @param {number} f The interpolation factor.
 * @param {!Type} resultVec The vector to receive the
 *     results (may be v0 or v1).
 * @return {!Type} Return resultVec so that operations can be
 *     chained together.
 */
export function slerp(v0, v1, f, resultVec) {
  const v0Magnitude = magnitude_(v0);
  let v1Magnitude = magnitude_(v1);

  let cosAngle = dot(v0, v1) / (v0Magnitude * v1Magnitude);

  // If v0 and v1 are almost the same direction, fall back on a straight lerp.
  if (cosAngle > 1 - googVec.EPSILON) {
    return lerp(v0, v1, f, resultVec);
  }

  let angle = 0;
  let sinAngle = 0;

  // If v0 and v1 are opposite directions, pick an arbitrary 'mid' vector that
  // is perpendicular to both, and slerp from v0 -> mid -> v1.
  if (cosAngle < -1 + googVec.EPSILON) {
    const mid = create();
    let magnitudeFactor = (v0Magnitude + v1Magnitude) / 2;
    if (v0[0]) {  // v0 not parallel to [0,0,1].
      magnitudeFactor /= Math.sqrt(v0[0] * v0[0] + v0[1] + v0[1]);
      mid[0] = -v0[1] * magnitudeFactor;
      mid[1] = v0[0] * magnitudeFactor;
      mid[2] = 0;
    } else {  // v0 not parallel to [1,0,0].
      magnitudeFactor /= Math.sqrt(v0[2] * v0[2] + v0[1] + v0[1]);
      mid[0] = 0;
      mid[1] = -v0[2] * magnitudeFactor;
      mid[2] = v0[1] * magnitudeFactor;
    }

    // Depending on f, slerp between either v0 and mid, or mid and v1.
    if (f <= 0.5) {
      v1Magnitude = v0Magnitude;
      v1 = mid;
      f *= 2;
    } else {
      v0 = mid;
      f = 2 * f - 1;
    }

    angle = Math.PI / 2;
    cosAngle = 0;
    sinAngle = 1;
  } else {
    angle = Math.acos(cosAngle);
    sinAngle = Math.sqrt(1 - cosAngle * cosAngle);
  }

  const coeff0 = (Math.sin((1 - f) * angle) / sinAngle) / v0Magnitude;
  const coeff1 = (Math.sin(f * angle) / sinAngle) / v1Magnitude;
  const magnitude = (1 - f) * v0Magnitude + f * v1Magnitude;

  resultVec[0] = (v0[0] * coeff0 + v1[0] * coeff1) * magnitude;
  resultVec[1] = (v0[1] * coeff0 + v1[1] * coeff1) * magnitude;
  resultVec[2] = (v0[2] * coeff0 + v1[2] * coeff1) * magnitude;
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
    resultVec[2] = Math.max(vec0[2], limit);
  } else {
    resultVec[0] = Math.max(vec0[0], limit[0]);
    resultVec[1] = Math.max(vec0[1], limit[1]);
    resultVec[2] = Math.max(vec0[2], limit[2]);
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
    resultVec[2] = Math.min(vec0[2], limit);
  } else {
    resultVec[0] = Math.min(vec0[0], limit[0]);
    resultVec[1] = Math.min(vec0[1], limit[1]);
    resultVec[2] = Math.min(vec0[2], limit[2]);
  }
  return resultVec;
}


/**
 * Returns true if the components of v0 are equal to the components of v1.
 *
 * @param {!Type} v0 The first vector.
 * @param {!Type} v1 The second vector.
 * @return {boolean} True if the vectors are equal, false otherwise.
 */
export function equals(v0, v1) {
  return v0.length == v1.length && v0[0] == v1[0] && v0[1] == v1[1] &&
      v0[2] == v1[2];
}
