/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Implements a 3D ray that are compatible with WebGL.
 * Each element is a float64 in case high precision is required.
 * The API is structured to avoid unnecessary memory allocations.
 * The last parameter will typically be the output vector and an
 * object can be both an input and output parameter to all methods
 * except where noted.
 *
 */
import * as Vec3 from './vec3.js';

const {AnyType} = goog.requireType('goog.vec.vec');



/**
 * Constructs a new ray with an optional origin and direction. If not specified,
 * the default is [0, 0, 0].
 * @param {Vec3.AnyType=} opt_origin The optional origin.
 * @param {Vec3.AnyType=} opt_dir The optional direction.
 * @constructor
 * @final
 */
export function Ray(opt_origin, opt_dir) {
 /**
   * @type {Vec3.Float64}
   */
 this.origin = Vec3.createFloat64();
 if (opt_origin) {
   Vec3.setFromArray(this.origin, opt_origin);
 }

 /**
   * @type {Vec3.Float64}
   */
 this.dir = Vec3.createFloat64();
 if (opt_dir) {
   Vec3.setFromArray(this.dir, opt_dir);
 }
}


/**
 * Sets the origin and direction of the ray.
 * @param {AnyType} origin The new origin.
 * @param {AnyType} dir The new direction.
 */
Ray.prototype.set = function(origin, dir) {
 Vec3.setFromArray(this.origin, origin);
 Vec3.setFromArray(this.dir, dir);
};


/**
 * Sets the origin of the ray.
 * @param {AnyType} origin the new origin.
 */
Ray.prototype.setOrigin = function(origin) {
 Vec3.setFromArray(this.origin, origin);
};


/**
 * Sets the direction of the ray.
 * @param {AnyType} dir The new direction.
 */
Ray.prototype.setDir = function(dir) {
 Vec3.setFromArray(this.dir, dir);
};


/**
 * Returns true if this ray is equal to the other ray.
 * @param {Ray} other The other ray.
 * @return {boolean} True if this ray is equal to the other ray.
 */
Ray.prototype.equals = function(other) {
 return other != null && Vec3.equals(this.origin, other.origin) &&
     Vec3.equals(this.dir, other.dir);
};
