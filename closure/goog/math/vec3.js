/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Defines a 3-element vector class that can be used for
 * coordinate math, useful for animation systems and point manipulation.
 *
 * Based heavily on code originally by:
 */


import * as math from './math.js';

import { Coordinate3 } from './coordinate3.js';



/**
 * Class for a three-dimensional vector object and assorted functions useful for
 * manipulation.
 *
 * Inherits from Coordinate3 so that a Vec3 may be passed in to any
 * function that requires a Coordinate.
 *
 * @param {number} x The x value for the vector.
 * @param {number} y The y value for the vector.
 * @param {number} z The z value for the vector.
 * @struct
 * @constructor
 * @extends {Coordinate3}
 */
export function Vec3(x, y, z) {
 /**
  * X-value
  * @type {number}
  */
 this.x = x;

 /**
  * Y-value
  * @type {number}
  */
 this.y = y;

 /**
  * Z-value
  * @type {number}
  */
 this.z = z;
}
goog.inherits(Vec3, Coordinate3);


/**
 * Generates a random unit vector.
 *
 * http://mathworld.wolfram.com/SpherePointPicking.html
 * Using (6), (7), and (8) to generate coordinates.
 * @return {!Vec3} A random unit-length vector.
 */
Vec3.randomUnit = function() {
 var theta = Math.random() * Math.PI * 2;
 var phi = Math.random() * Math.PI * 2;

 var z = Math.cos(phi);
 var x = Math.sqrt(1 - z * z) * Math.cos(theta);
 var y = Math.sqrt(1 - z * z) * Math.sin(theta);

 return new Vec3(x, y, z);
};


/**
 * Generates a random vector inside the unit sphere.
 *
 * @return {!Vec3} A random vector.
 */
Vec3.random = function() {
 return Vec3.randomUnit().scale(Math.random());
};


/**
 * Returns a new Vec3 object from a given coordinate.
 *
 * @param {Coordinate3} a The coordinate.
 * @return {!Vec3} A new vector object.
 */
Vec3.fromCoordinate3 = function(a) {
 return new Vec3(a.x, a.y, a.z);
};


/**
 * Creates a new copy of this Vec3.
 *
 * @return {!Vec3} A new vector with the same coordinates as this one.
 * @override
 */
Vec3.prototype.clone = function() {
 return new Vec3(this.x, this.y, this.z);
};


/**
 * Returns the magnitude of the vector measured from the origin.
 *
 * @return {number} The length of the vector.
 */
Vec3.prototype.magnitude = function() {
 return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};


/**
 * Returns the squared magnitude of the vector measured from the origin.
 * NOTE(brenneman): Leaving out the square root is not a significant
 * optimization in JavaScript.
 *
 * @return {number} The length of the vector, squared.
 */
Vec3.prototype.squaredMagnitude = function() {
 return this.x * this.x + this.y * this.y + this.z * this.z;
};


/**
 * Scales the current vector by a constant.
 *
 * @param {number} s The scale factor.
 * @return {!Vec3} This vector, scaled.
 */
Vec3.prototype.scale = function(s) {
 this.x *= s;
 this.y *= s;
 this.z *= s;
 return this;
};


/**
 * Reverses the sign of the vector. Equivalent to scaling the vector by -1.
 *
 * @return {!Vec3} This vector, inverted.
 */
Vec3.prototype.invert = function() {
 this.x = -this.x;
 this.y = -this.y;
 this.z = -this.z;
 return this;
};


/**
 * Normalizes the current vector to have a magnitude of 1.
 *
 * @return {!Vec3} This vector, normalized.
 */
Vec3.prototype.normalize = function() {
 return this.scale(1 / this.magnitude());
};


/**
 * Adds another vector to this vector in-place.
 *
 * @param {Vec3} b The vector to add.
 * @return {!Vec3} This vector with `b` added.
 */
Vec3.prototype.add = function(b) {
 this.x += b.x;
 this.y += b.y;
 this.z += b.z;
 return this;
};


/**
 * Subtracts another vector from this vector in-place.
 *
 * @param {Vec3} b The vector to subtract.
 * @return {!Vec3} This vector with `b` subtracted.
 */
Vec3.prototype.subtract = function(b) {
 this.x -= b.x;
 this.y -= b.y;
 this.z -= b.z;
 return this;
};


/**
 * Compares this vector with another for equality.
 *
 * @param {Vec3} b The other vector.
 * @return {boolean} True if this vector's x, y and z equal the given vector's
 *     x, y, and z, respectively.
 */
Vec3.prototype.equals = function(b) {
 return this == b || !!b && this.x == b.x && this.y == b.y && this.z == b.z;
};


/**
 * Returns the distance between two vectors.
 *
 * @param {Vec3} a The first vector.
 * @param {Vec3} b The second vector.
 * @return {number} The distance.
 */
Vec3.distance = Coordinate3.distance;


/**
 * Returns the squared distance between two vectors.
 *
 * @param {Vec3} a The first vector.
 * @param {Vec3} b The second vector.
 * @return {number} The squared distance.
 */
Vec3.squaredDistance = Coordinate3.squaredDistance;


/**
 * Compares vectors for equality.
 *
 * @param {Vec3} a The first vector.
 * @param {Vec3} b The second vector.
 * @return {boolean} True if the vectors have equal x, y, and z coordinates.
 */
Vec3.equals = Coordinate3.equals;


/**
 * Returns the sum of two vectors as a new Vec3.
 *
 * @param {Vec3} a The first vector.
 * @param {Vec3} b The second vector.
 * @return {!Vec3} The sum vector.
 */
Vec3.sum = function(a, b) {
 return new Vec3(a.x + b.x, a.y + b.y, a.z + b.z);
};


/**
 * Returns the difference of two vectors as a new Vec3.
 *
 * @param {Vec3} a The first vector.
 * @param {Vec3} b The second vector.
 * @return {!Vec3} The difference vector.
 */
Vec3.difference = function(a, b) {
 return new Vec3(a.x - b.x, a.y - b.y, a.z - b.z);
};


/**
 * Returns the dot-product of two vectors.
 *
 * @param {Vec3} a The first vector.
 * @param {Vec3} b The second vector.
 * @return {number} The dot-product of the two vectors.
 */
Vec3.dot = function(a, b) {
 return a.x * b.x + a.y * b.y + a.z * b.z;
};


/**
 * Returns the cross-product of two vectors.
 *
 * @param {Vec3} a The first vector.
 * @param {Vec3} b The second vector.
 * @return {!Vec3} The cross-product of the two vectors.
 */
Vec3.cross = function(a, b) {
 return new Vec3(
     a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
};


/**
 * Returns a new Vec3 that is the linear interpolant between vectors a and b at
 * scale-value x.
 *
 * @param {Vec3} a Vector a.
 * @param {Vec3} b Vector b.
 * @param {number} x The proportion between a and b.
 * @return {!Vec3} The interpolated vector.
 */
Vec3.lerp = function(a, b, x) {
 return new Vec3(
     math.lerp(a.x, b.x, x), math.lerp(a.y, b.y, x),
     math.lerp(a.z, b.z, x));
};


/**
 * Returns a new Vec3 that is a copy of the vector a, but rescaled by a factor s
 * in all dimensions.
 * @param {!Vec3} a Vector a.
 * @param {number} s Scale factor.
 * @return {!Vec3} A new rescaled vector.
 */
Vec3.rescaled = function(a, s) {
 return new Vec3(a.x * s, a.y * s, a.z * s);
};
