/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview Represents a line in 2D space.
 */

import * as math from './math.js';

import { Coordinate } from './coordinate.js';



/**
 * Object representing a line.
 * @param {number} x0 X coordinate of the start point.
 * @param {number} y0 Y coordinate of the start point.
 * @param {number} x1 X coordinate of the end point.
 * @param {number} y1 Y coordinate of the end point.
 * @struct
 * @constructor
 * @final
 */
export function Line(x0, y0, x1, y1) {
 /**
  * X coordinate of the first point.
  * @type {number}
  */
 this.x0 = x0;

 /**
  * Y coordinate of the first point.
  * @type {number}
  */
 this.y0 = y0;

 /**
  * X coordinate of the first control point.
  * @type {number}
  */
 this.x1 = x1;

 /**
  * Y coordinate of the first control point.
  * @type {number}
  */
 this.y1 = y1;
}


/**
 * @return {!Line} A copy of this line.
 */
Line.prototype.clone = function() {
 return new Line(this.x0, this.y0, this.x1, this.y1);
};


/**
 * Tests whether the given line is exactly the same as this one.
 * @param {Line} other The other line.
 * @return {boolean} Whether the given line is the same as this one.
 */
Line.prototype.equals = function(other) {
 return this.x0 == other.x0 && this.y0 == other.y0 && this.x1 == other.x1 &&
     this.y1 == other.y1;
};


/**
 * @return {number} The squared length of the line segment used to define the
 *     line.
 */
Line.prototype.getSegmentLengthSquared = function() {
 var xdist = this.x1 - this.x0;
 var ydist = this.y1 - this.y0;
 return xdist * xdist + ydist * ydist;
};


/**
 * @return {number} The length of the line segment used to define the line.
 */
Line.prototype.getSegmentLength = function() {
 return Math.sqrt(this.getSegmentLengthSquared());
};


/**
 * Computes the interpolation parameter for the point on the line closest to
 * a given point.
 * @param {number|Coordinate} x The x coordinate of the point, or
 *     a coordinate object.
 * @param {number=} opt_y The y coordinate of the point - required if x is a
 *     number, ignored if x is a Coordinate.
 * @return {number} The interpolation parameter of the point on the line
 *     closest to the given point.
 * @private
 */
Line.prototype.getClosestLinearInterpolation_ = function(x, opt_y) {
 var y;
 if (x instanceof Coordinate) {
   y = x.y;
   x = x.x;
 } else {
   y = opt_y;
 }

 var x0 = this.x0;
 var y0 = this.y0;

 var xChange = this.x1 - x0;
 var yChange = this.y1 - y0;

 return ((Number(x) - x0) * xChange + (Number(y) - y0) * yChange) /
     this.getSegmentLengthSquared();
};


/**
 * Returns the point on the line segment proportional to t, where for t = 0 we
 * return the starting point and for t = 1 we return the end point.  For t < 0
 * or t > 1 we extrapolate along the line defined by the line segment.
 * @param {number} t The interpolation parameter along the line segment.
 * @return {!Coordinate} The point on the line segment at t.
 */
Line.prototype.getInterpolatedPoint = function(t) {
 return new Coordinate(
     math.lerp(this.x0, this.x1, t), math.lerp(this.y0, this.y1, t));
};


/**
 * Computes the point on the line closest to a given point.  Note that a line
 * in this case is defined as the infinite line going through the start and end
 * points.  To find the closest point on the line segment itself see
 * {@see #getClosestSegmentPoint}.
 * @param {number|Coordinate} x The x coordinate of the point, or
 *     a coordinate object.
 * @param {number=} opt_y The y coordinate of the point - required if x is a
 *     number, ignored if x is a Coordinate.
 * @return {!Coordinate} The point on the line closest to the given
 *     point.
 */
Line.prototype.getClosestPoint = function(x, opt_y) {
 return this.getInterpolatedPoint(
     this.getClosestLinearInterpolation_(x, opt_y));
};


/**
 * Computes the point on the line segment closest to a given point.
 * @param {number|Coordinate} x The x coordinate of the point, or
 *     a coordinate object.
 * @param {number=} opt_y The y coordinate of the point - required if x is a
 *     number, ignored if x is a Coordinate.
 * @return {!Coordinate} The point on the line segment closest to the
 *     given point.
 */
Line.prototype.getClosestSegmentPoint = function(x, opt_y) {
 return this.getInterpolatedPoint(
     math.clamp(this.getClosestLinearInterpolation_(x, opt_y), 0, 1));
};
