/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview A thick wrapper around shapes with custom paths.
 */



// TODO(user): We're trying to migrate all ES5 subclasses of Closure
// Library to ES6. In ES6 this cannot be referenced before super is called. This
// file has at least one this before a super call (in ES5) and cannot be
// automatically upgraded to ES6 as a result. Please fix this if you have a
// chance. Note: This can sometimes be caused by not calling the super
// constructor at all. You can run the conversion tool yourself to see what it
// does on this file: blaze run //javascript/refactoring/es6_classes:convert.

import { StrokeAndFillElement } from './strokeandfillelement.js';

const { Path } = goog.requireType('goog.graphics.path');
const { Group } = goog.requireType('goog.graphics.ext.group');
const { Path: ExtPath } = goog.requireType('goog.graphics.ext.path');
const { Rect } = goog.requireType('goog.math.rect');



/**
 * Wrapper for a graphics shape element.
 * @param {Group} group Parent for this element.
 * @param {!ExtPath} path  The path to draw.
 * @param {boolean=} opt_autoSize Optional flag to specify the path should
 *     automatically resize to fit the element.  Defaults to false.
 * @constructor
 * @extends {StrokeAndFillElement}
 * @final
 */
export function Shape(group, path, opt_autoSize) {
 this.autoSize_ = !!opt_autoSize;

 const graphics = group.getGraphicsImplementation();
 const wrapper = graphics.drawPath(path, null, null, group.getWrapper());
 StrokeAndFillElement.call(this, group, wrapper);
 this.setPath(path);
}
goog.inherits(Shape, StrokeAndFillElement);


/**
 * Whether or not to automatically resize the shape's path when the element
 * itself is resized.
 * @type {boolean}
 * @private
 */
Shape.prototype.autoSize_ = false;


/**
 * The original path, specified by the caller.
 * @type {Path}
 * @private
 */
Shape.prototype.path_;


/**
 * The bounding box of the original path.
 * @type {Rect?}
 * @private
 */
Shape.prototype.boundingBox_ = null;


/**
 * The scaled path.
 * @type {Path}
 * @private
 */
Shape.prototype.scaledPath_;


/**
 * Get the path drawn by this shape.
 * @return {Path?} The path drawn by this shape.
 */
Shape.prototype.getPath = function() {
 return this.path_;
};


/**
 * Set the path to draw.
 * @param {ExtPath} path The path to draw.
 */
Shape.prototype.setPath = function(path) {
 this.path_ = path;

 if (this.autoSize_) {
   this.boundingBox_ = path.getBoundingBox();
 }

 this.scaleAndSetPath_();
};


/**
 * Scale the internal path to fit.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
Shape.prototype.scaleAndSetPath_ = function() {
 /** @suppress {strictMissingProperties} Added to tighten compiler checks */
 this.scaledPath_ = this.boundingBox_ ?
     this.path_.clone().modifyBounds(
         -this.boundingBox_.left, -this.boundingBox_.top,
         this.getWidth() / (this.boundingBox_.width || 1),
         this.getHeight() / (this.boundingBox_.height || 1)) :
     this.path_;

 const wrapper = this.getWrapper();
 if (wrapper) {
   wrapper.setPath(this.scaledPath_);
 }
};


/**
 * Redraw the ellipse.  Called when the coordinate system is changed.
 * @protected
 * @override
 */
Shape.prototype.redraw = function() {
 Shape.superClass_.redraw.call(this);
 if (this.autoSize_) {
   this.scaleAndSetPath_();
 }
};


/**
 * @return {boolean} Whether the shape is parent dependent.
 * @protected
 * @override
 */
Shape.prototype.checkParentDependent = function() {
 return this.autoSize_ ||
     Shape.superClass_.checkParentDependent.call(this);
};
