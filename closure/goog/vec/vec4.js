/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview Supplies 4 element vectors that are compatible with WebGL.
 * Each element is a float32 since that is typically the desired size of a
 * 4-vector in the GPU.  The API is structured to avoid unnecessary memory
 * allocations.  The last parameter will typically be the output vector and
 * an object can be both an input and output parameter to all methods except
 * where noted.
 */
import * as googVec from './vec.js';

/** @typedef {!googVec.Float32} */ export var Float32;
/** @typedef {!googVec.Float64} */ export var Float64;
/** @typedef {!googVec.Number} */ export var Number;
/** @typedef {!googVec.AnyType} */ export var AnyType;

// The following two types are deprecated - use the above types instead.
/** @typedef {!Float32Array} */ export var Type;
/** @typedef {!googVec.ArrayType} */ export var Vec4Like;


/**
 * Creates a 4 element vector of Float32. The array is initialized to zero.
 *
 * @return {!Float32} The new 3 element array.
 */
export function createFloat32() {
 return new Float32Array(4);
}


/**
 * Creates a 4 element vector of Float64. The array is initialized to zero.
 *
 * @return {!Float64} The new 4 element array.
 */
export function createFloat64() {
 return new Float64Array(4);
}


/**
 * Creates a 4 element vector of Number. The array is initialized to zero.
 *
 * @return {!Number} The new 4 element array.
 */
export function createNumber() {
 const v = new Array(4);
 setFromValues(v, 0, 0, 0, 0);
 return v;
}


/**
 * Creates a 4 element vector of Float32Array. The array is initialized to zero.
 *
 * @deprecated Use createFloat32.
 * @return {!Type} The new 4 element array.
 */
export function create() {
 return new Float32Array(4);
}


/**
 * Creates a new 4 element vector initialized with the value from the given
 * array.
 *
 * @deprecated Use createFloat32FromArray.
 * @param {Vec4Like} vec The source 4 element array.
 * @return {!Type} The new 4 element array.
 */
export function createFromArray(vec) {
 const newVec = create();
 setFromArray(newVec, vec);
 return newVec;
}


/**
 * Creates a new 4 element FLoat32 vector initialized with the value from the
 * given array.
 *
 * @param {AnyType} vec The source 3 element array.
 * @return {!Float32} The new 3 element array.
 */
export function createFloat32FromArray(vec) {
 const newVec = createFloat32();
 setFromArray(newVec, vec);
 return newVec;
}


/**
 * Creates a new 4 element Float32 vector initialized with the supplied values.
 *
 * @param {number} v0 The value for element at index 0.
 * @param {number} v1 The value for element at index 1.
 * @param {number} v2 The value for element at index 2.
 * @param {number} v3 The value for element at index 3.
 * @return {!Float32} The new vector.
 */
export function createFloat32FromValues(v0, v1, v2, v3) {
 const vec = createFloat32();
 setFromValues(vec, v0, v1, v2, v3);
 return vec;
}


/**
 * Creates a clone of the given 4 element Float32 vector.
 *
 * @param {Float32} vec The source 3 element vector.
 * @return {!Float32} The new cloned vector.
 */
export var cloneFloat32 = createFloat32FromArray;


/**
 * Creates a new 4 element Float64 vector initialized with the value from the
 * given array.
 *
 * @param {AnyType} vec The source 4 element array.
 * @return {!Float64} The new 4 element array.
 */
export function createFloat64FromArray(vec) {
 const newVec = createFloat64();
 setFromArray(newVec, vec);
 return newVec;
}


/**
* Creates a new 4 element Float64 vector initialized with the supplied values.
*
* @param {number} v0 The value for element at index 0.
* @param {number} v1 The value for element at index 1.
* @param {number} v2 The value for element at index 2.
* @param {number} v3 The value for element at index 3.
* @return {!Float64} The new vector.
*/
export function createFloat64FromValues(v0, v1, v2, v3) {
 const vec = createFloat64();
 setFromValues(vec, v0, v1, v2, v3);
 return vec;
}


/**
 * Creates a clone of the given 4 element vector.
 *
 * @param {Float64} vec The source 4 element vector.
 * @return {!Float64} The new cloned vector.
 */
export var cloneFloat64 = createFloat64FromArray;


/**
 * Creates a new 4 element vector initialized with the supplied values.
 *
 * @deprecated Use createFloat32FromValues.
 * @param {number} v0 The value for element at index 0.
 * @param {number} v1 The value for element at index 1.
 * @param {number} v2 The value for element at index 2.
 * @param {number} v3 The value for element at index 3.
 * @return {!Type} The new vector.
 */
export function createFromValues(v0, v1, v2, v3) {
 const vec = create();
 setFromValues(vec, v0, v1, v2, v3);
 return vec;
}


/**
 * Creates a clone of the given 4 element vector.
 *
 * @deprecated Use cloneFloat32.
 * @param {Vec4Like} vec The source 4 element vector.
 * @return {!Type} The new cloned vector.
 */
export var clone = createFromArray;


/**
 * Initializes the vector with the given values.
 *
 * @param {AnyType} vec The vector to receive the values.
 * @param {number} v0 The value for element at index 0.
 * @param {number} v1 The value for element at index 1.
 * @param {number} v2 The value for element at index 2.
 * @param {number} v3 The value for element at index 3.
 * @return {!AnyType} Return vec so that operations can be
 *     chained together.
 */
export function setFromValues(vec, v0, v1, v2, v3) {
 vec[0] = v0;
 vec[1] = v1;
 vec[2] = v2;
 vec[3] = v3;
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
 vec[2] = values[2];
 vec[3] = values[3];
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
 resultVec[2] = vec0[2] + vec1[2];
 resultVec[3] = vec0[3] + vec1[3];
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
 resultVec[2] = vec0[2] - vec1[2];
 resultVec[3] = vec0[3] - vec1[3];
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
 resultVec[2] = -vec0[2];
 resultVec[3] = -vec0[3];
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
 resultVec[2] = Math.abs(vec0[2]);
 resultVec[3] = Math.abs(vec0[3]);
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
 resultVec[2] = vec0[2] * scalar;
 resultVec[3] = vec0[3] * scalar;
 return resultVec;
}


/**
 * Returns the magnitudeSquared of the given vector.
 *
 * @param {AnyType} vec0 The vector.
 * @return {number} The magnitude of the vector.
 */
export function magnitudeSquared(vec0) {
 const w = vec0[3];
 const x = vec0[0];
 const y = vec0[1];
 const z = vec0[2];

 return x * x + y * y + z * z + w * w;
}


/**
 * Returns the magnitude of the given vector.
 *
 * @param {AnyType} vec0 The vector.
 * @return {number} The magnitude of the vector.
 */
export function magnitude(vec0) {
 const w = vec0[3];
 const x = vec0[0];
 const y = vec0[1];
 const z = vec0[2];

 return Math.sqrt(x * x + y * y + z * z + w * w);
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
 const ilen = 1 / magnitude(vec0);
 resultVec[0] = vec0[0] * ilen;
 resultVec[1] = vec0[1] * ilen;
 resultVec[2] = vec0[2] * ilen;
 resultVec[3] = vec0[3] * ilen;
 return resultVec;
}


/**
 * Returns the scalar product of vectors v0 and v1.
 *
 * @param {AnyType} v0 The first vector.
 * @param {AnyType} v1 The second vector.
 * @return {number} The scalar product.
 */
export function dot(v0, v1) {
 return v0[0] * v1[0] + v0[1] * v1[1] + v0[2] * v1[2] + v0[3] * v1[3];
}


/**
 * Linearly interpolate from v0 to v1 according to f. The value of f should be
 * in the range [0..1] otherwise the results are undefined.
 *
 * @param {AnyType} v0 The first vector.
 * @param {AnyType} v1 The second vector.
 * @param {number} f The interpolation factor.
 * @param {AnyType} resultVec The vector to receive the
 *     results (may be v0 or v1).
 * @return {!AnyType} Return resultVec so that operations can be
 *     chained together.
 */
export function lerp(v0, v1, f, resultVec) {
 const w = v0[3];
 const x = v0[0];
 const y = v0[1];
 const z = v0[2];

 resultVec[0] = (v1[0] - x) * f + x;
 resultVec[1] = (v1[1] - y) * f + y;
 resultVec[2] = (v1[2] - z) * f + z;
 resultVec[3] = (v1[3] - w) * f + w;
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
   resultVec[2] = Math.max(vec0[2], limit);
   resultVec[3] = Math.max(vec0[3], limit);
 } else {
   resultVec[0] = Math.max(vec0[0], limit[0]);
   resultVec[1] = Math.max(vec0[1], limit[1]);
   resultVec[2] = Math.max(vec0[2], limit[2]);
   resultVec[3] = Math.max(vec0[3], limit[3]);
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
   resultVec[2] = Math.min(vec0[2], limit);
   resultVec[3] = Math.min(vec0[3], limit);
 } else {
   resultVec[0] = Math.min(vec0[0], limit[0]);
   resultVec[1] = Math.min(vec0[1], limit[1]);
   resultVec[2] = Math.min(vec0[2], limit[2]);
   resultVec[3] = Math.min(vec0[3], limit[3]);
 }
 return resultVec;
}


/**
 * Returns true if the components of v0 are equal to the components of v1.
 *
 * @param {AnyType} v0 The first vector.
 * @param {AnyType} v1 The second vector.
 * @return {boolean} True if the vectors are equal, false otherwise.
 */
export function equals(v0, v1) {
 return v0.length == v1.length && v0[0] == v1[0] && v0[1] == v1[1] &&
     v0[2] == v1[2] && v0[3] == v1[3];
}
