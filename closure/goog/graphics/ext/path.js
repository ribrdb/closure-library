/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview A thick wrapper around paths.
 */


goog.declareModuleId('goog.graphics.ext.path');

import { AffineTransform } from '../affinetransform.js';
import { Path as graphicsPath } from '../path.js';
import { Rect } from '../../math/rect.js';



/**
 * Creates a path object
 * @constructor
 * @extends {graphicsPath}
 * @final
 */
export function Path() {
  graphicsPath.call(this);
}
goog.inherits(Path, graphicsPath);


/**
 * Optional cached or user specified bounding box.  A user may wish to
 * precompute a bounding box to save time and include more accurate
 * computations.
 * @type {Rect?}
 * @private
 */
Path.prototype.bounds_ = null;


/**
 * Clones the path.
 * @return {!Path} A clone of this path.
 * @override
 */
Path.prototype.clone = function() {
  const output = /** @type {Path} */
      (Path.superClass_.clone.call(this));
  output.bounds_ = this.bounds_ && this.bounds_.clone();
  return output;
};


/**
 * Transforms the path. Only simple paths are transformable. Attempting
 * to transform a non-simple path will throw an error.
 * @param {!AffineTransform} tx The transformation to perform.
 * @return {!Path} The path itself.
 * @override
 */
Path.prototype.transform = function(tx) {
  Path.superClass_.transform.call(this, tx);

  // Make sure the precomputed bounds are cleared when the path is transformed.
  this.bounds_ = null;

  return this;
};


/**
 * Modify the bounding box of the path.  This may cause the path to be
 * simplified (i.e. arcs converted to curves) as a side-effect.
 * @param {number} deltaX How far to translate the x coordinates.
 * @param {number} deltaY How far to translate the y coordinates.
 * @param {number} xFactor After translation, all x coordinates are multiplied
 *     by this number.
 * @param {number} yFactor After translation, all y coordinates are multiplied
 *     by this number.
 * @return {!Path} The path itself.
 */
Path.prototype.modifyBounds = function(
    deltaX, deltaY, xFactor, yFactor) {
  if (!this.isSimple()) {
    const simple = graphicsPath.createSimplifiedPath(this);
    this.clear();
    this.appendPath(simple);
  }

  return this.transform(
      AffineTransform.getScaleInstance(xFactor, yFactor)
          .translate(deltaX, deltaY));
};


/**
 * Set the precomputed bounds.
 * @param {Rect?} bounds The bounds to use, or set to null to clear
 *     and recompute on the next call to getBoundingBox.
 */
Path.prototype.useBoundingBox = function(bounds) {
  this.bounds_ = bounds && bounds.clone();
};


/**
 * @return {Rect?} The bounding box of the path, or null if the
 *     path is empty.
 */
Path.prototype.getBoundingBox = function() {
  if (!this.bounds_ && !this.isEmpty()) {
    let minY;
    let minX = minY = Number.POSITIVE_INFINITY;
    let maxY;
    let maxX = maxY = Number.NEGATIVE_INFINITY;

    const simplePath =
        this.isSimple() ? this : graphicsPath.createSimplifiedPath(this);
    simplePath.forEachSegment(function(type, points) {
      for (let i = 0, len = points.length; i < len; i += 2) {
        minX = Math.min(minX, points[i]);
        maxX = Math.max(maxX, points[i]);
        minY = Math.min(minY, points[i + 1]);
        maxY = Math.max(maxY, points[i + 1]);
      }
    });

    this.bounds_ = new Rect(minX, minY, maxX - minX, maxY - minY);
  }

  return this.bounds_;
};
