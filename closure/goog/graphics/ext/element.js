/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A thicker wrapper around the DOM element returned from
 * the different draw methods of the graphics implementation, and
 * all interfaces that the various element types support.
 */

import { EventTarget } from '../../events/eventtarget.js';

import * as functions from '../../functions/functions.js';
import * as coordinates from './coordinates.js';
const { AbstractGraphics } = goog.requireType('goog.graphics.abstractgraphics');
const { Element:GraphicsElement } = goog.requireType('goog.graphics.element');
const { Graphics } = goog.requireType('goog.graphics.ext.graphics');
const { Group } = goog.requireType('goog.graphics.ext.group');



/**
 * Base class for a wrapper around the goog.graphics wrapper that enables
 * more advanced functionality.
 * @param {Group?} group Parent for this element.
 * @param {GraphicsElement} wrapper The thin wrapper to wrap.
 * @constructor
 * @extends {EventTarget}
 */
export function Element(group, wrapper) {
 EventTarget.call(this);
 this.wrapper_ = wrapper;
 this.graphics_ = group ? group.getGraphics() : this;

 this.xPosition_ = new Element.Position_(this, true);
 this.yPosition_ = new Element.Position_(this, false);

 // Handle parent / child relationships.
 if (group) {
   this.parent_ = group;
   this.parent_.addChild(this);
 }
}
goog.inherits(Element, EventTarget);


/**
 * The graphics object that contains this element.
 * @type {Graphics|Element}
 * @private
 */
Element.prototype.graphics_;


/**
 * The goog.graphics wrapper this class wraps.
 * @type {GraphicsElement}
 * @private
 */
Element.prototype.wrapper_;


/**
 * The group or surface containing this element.
 * @type {Group|undefined}
 * @private
 */
Element.prototype.parent_;


/**
 * Whether or not computation of this element's position or size depends on its
 * parent's size.
 * @type {boolean}
 * @private
 */
Element.prototype.parentDependent_ = false;


/**
 * Whether the element has pending transformations.
 * @type {boolean}
 * @private
 */
Element.prototype.needsTransform_ = false;


/**
 * The current angle of rotation, expressed in degrees.
 * @type {number}
 * @private
 */
Element.prototype.rotation_ = 0;


/**
 * Object representing the x position and size of the element.
 * @type {Element.Position_}
 * @private
 */
Element.prototype.xPosition_;


/**
 * Object representing the y position and size of the element.
 * @type {Element.Position_}
 * @private
 */
Element.prototype.yPosition_;


/** @return {GraphicsElement} The underlying thin wrapper. */
Element.prototype.getWrapper = function() {
 return this.wrapper_;
};


/**
 * @return {Element|Graphics} The graphics
 *     surface the element is a part of.
 */
Element.prototype.getGraphics = function() {
 return this.graphics_;
};


/**
 * Returns the graphics implementation.
 * @return {AbstractGraphics} The underlying graphics
 *     implementation drawing this element's wrapper.
 * @protected
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
Element.prototype.getGraphicsImplementation = function() {
 return this.graphics_.getImplementation();
};


/**
 * @return {Group|undefined} The parent of this element.
 */
Element.prototype.getParent = function() {
 return this.parent_;
};


// GENERAL POSITIONING


/**
 * Internal convenience method for setting position - either as a left/top,
 * center/middle, or right/bottom value.  Only one should be specified.
 * @param {Element.Position_} position The position object to
 *     set the value on.
 * @param {number|string} value The value of the coordinate.
 * @param {Element.PositionType_} type The type of the
 *     coordinate.
 * @param {boolean=} opt_chain Optional flag to specify this function is part
 *     of a chain of calls and therefore transformations should be set as
 *     pending but not yet performed.
 * @private
 */
Element.prototype.setPosition_ = function(
    position, value, type, opt_chain) {
 position.setPosition(value, type);
 this.computeIsParentDependent_(position);

 this.needsTransform_ = true;
 if (!opt_chain) {
   this.transform();
 }
};


/**
 * Sets the width/height of the element.
 * @param {Element.Position_} position The position object to
 *     set the value on.
 * @param {string|number} size The new width/height value.
 * @param {boolean=} opt_chain Optional flag to specify this function is part
 *     of a chain of calls and therefore transformations should be set as
 *     pending but not yet performed.
 * @private
 */
Element.prototype.setSize_ = function(
    position, size, opt_chain) {
 if (position.setSize(size)) {
   this.needsTransform_ = true;

   this.computeIsParentDependent_(position);

   if (!opt_chain) {
     this.reset();
   }
 } else if (!opt_chain && this.isPendingTransform()) {
   this.reset();
 }
};


/**
 * Sets the minimum width/height of the element.
 * @param {Element.Position_} position The position object to
 *     set the value on.
 * @param {string|number} minSize The minimum width/height of the element.
 * @private
 */
Element.prototype.setMinSize_ = function(position, minSize) {
 position.setMinSize(minSize);
 this.needsTransform_ = true;
 this.computeIsParentDependent_(position);
};


// HORIZONTAL POSITIONING


/**
 * @return {number} The distance from the left edge of this element to the left
 *     edge of its parent, specified in units of the parent's coordinate system.
 */
Element.prototype.getLeft = function() {
 return this.xPosition_.getStart();
};


/**
 * Sets the left coordinate of the element.  Overwrites any previous value of
 * left, center, or right for this element.
 * @param {string|number} left The left coordinate.
 * @param {boolean=} opt_chain Optional flag to specify this function is part
 *     of a chain of calls and therefore transformations should be set as
 *     pending but not yet performed.
 */
Element.prototype.setLeft = function(left, opt_chain) {
 this.setPosition_(
     this.xPosition_, left, Element.PositionType_.START,
     opt_chain);
};


/**
 * @return {number} The right coordinate of the element, in units of the
 *     parent's coordinate system.
 */
Element.prototype.getRight = function() {
 return this.xPosition_.getEnd();
};


/**
 * Sets the right coordinate of the element.  Overwrites any previous value of
 * left, center, or right for this element.
 * @param {string|number} right The right coordinate.
 * @param {boolean=} opt_chain Optional flag to specify this function is part
 *     of a chain of calls and therefore transformations should be set as
 *     pending but not yet performed.
 */
Element.prototype.setRight = function(right, opt_chain) {
 this.setPosition_(
     this.xPosition_, right, Element.PositionType_.END,
     opt_chain);
};


/**
 * @return {number} The center coordinate of the element, in units of the
 * parent's coordinate system.
 */
Element.prototype.getCenter = function() {
 return this.xPosition_.getMiddle();
};


/**
 * Sets the center coordinate of the element.  Overwrites any previous value of
 * left, center, or right for this element.
 * @param {string|number} center The center coordinate.
 * @param {boolean=} opt_chain Optional flag to specify this function is part
 *     of a chain of calls and therefore transformations should be set as
 *     pending but not yet performed.
 */
Element.prototype.setCenter = function(center, opt_chain) {
 this.setPosition_(
     this.xPosition_, center, Element.PositionType_.MIDDLE,
     opt_chain);
};


// VERTICAL POSITIONING


/**
 * @return {number} The distance from the top edge of this element to the top
 *     edge of its parent, specified in units of the parent's coordinate system.
 */
Element.prototype.getTop = function() {
 return this.yPosition_.getStart();
};


/**
 * Sets the top coordinate of the element.  Overwrites any previous value of
 * top, middle, or bottom for this element.
 * @param {string|number} top The top coordinate.
 * @param {boolean=} opt_chain Optional flag to specify this function is part
 *     of a chain of calls and therefore transformations should be set as
 *     pending but not yet performed.
 */
Element.prototype.setTop = function(top, opt_chain) {
 this.setPosition_(
     this.yPosition_, top, Element.PositionType_.START,
     opt_chain);
};


/**
 * @return {number} The bottom coordinate of the element, in units of the
 *     parent's coordinate system.
 */
Element.prototype.getBottom = function() {
 return this.yPosition_.getEnd();
};


/**
 * Sets the bottom coordinate of the element.  Overwrites any previous value of
 * top, middle, or bottom for this element.
 * @param {string|number} bottom The bottom coordinate.
 * @param {boolean=} opt_chain Optional flag to specify this function is part
 *     of a chain of calls and therefore transformations should be set as
 *     pending but not yet performed.
 */
Element.prototype.setBottom = function(bottom, opt_chain) {
 this.setPosition_(
     this.yPosition_, bottom, Element.PositionType_.END,
     opt_chain);
};


/**
 * @return {number} The middle coordinate of the element, in units of the
 *     parent's coordinate system.
 */
Element.prototype.getMiddle = function() {
 return this.yPosition_.getMiddle();
};


/**
 * Sets the middle coordinate of the element.  Overwrites any previous value of
 * top, middle, or bottom for this element
 * @param {string|number} middle The middle coordinate.
 * @param {boolean=} opt_chain Optional flag to specify this function is part
 *     of a chain of calls and therefore transformations should be set as
 *     pending but not yet performed.
 */
Element.prototype.setMiddle = function(middle, opt_chain) {
 this.setPosition_(
     this.yPosition_, middle, Element.PositionType_.MIDDLE,
     opt_chain);
};


// DIMENSIONS


/**
 * @return {number} The width of the element, in units of the parent's
 *     coordinate system.
 */
Element.prototype.getWidth = function() {
 return this.xPosition_.getSize();
};


/**
 * Sets the width of the element.
 * @param {string|number} width The new width value.
 * @param {boolean=} opt_chain Optional flag to specify this function is part
 *     of a chain of calls and therefore transformations should be set as
 *     pending but not yet performed.
 */
Element.prototype.setWidth = function(width, opt_chain) {
 this.setSize_(this.xPosition_, width, opt_chain);
};


/**
 * @return {number} The minimum width of the element, in units of the parent's
 *     coordinate system.
 */
Element.prototype.getMinWidth = function() {
 return this.xPosition_.getMinSize();
};


/**
 * Sets the minimum width of the element.
 * @param {string|number} minWidth The minimum width of the element.
 */
Element.prototype.setMinWidth = function(minWidth) {
 this.setMinSize_(this.xPosition_, minWidth);
};


/**
 * @return {number} The height of the element, in units of the parent's
 *     coordinate system.
 */
Element.prototype.getHeight = function() {
 return this.yPosition_.getSize();
};


/**
 * Sets the height of the element.
 * @param {string|number} height The new height value.
 * @param {boolean=} opt_chain Optional flag to specify this function is part
 *     of a chain of calls and therefore transformations should be set as
 *     pending but not yet performed.
 */
Element.prototype.setHeight = function(height, opt_chain) {
 this.setSize_(this.yPosition_, height, opt_chain);
};


/**
 * @return {number} The minimum height of the element, in units of the parent's
 *     coordinate system.
 */
Element.prototype.getMinHeight = function() {
 return this.yPosition_.getMinSize();
};


/**
 * Sets the minimum height of the element.
 * @param {string|number} minHeight The minimum height of the element.
 */
Element.prototype.setMinHeight = function(minHeight) {
 this.setMinSize_(this.yPosition_, minHeight);
};


// BOUNDS SHORTCUTS


/**
 * Shortcut for setting the left and top position.
 * @param {string|number} left The left coordinate.
 * @param {string|number} top The top coordinate.
 * @param {boolean=} opt_chain Optional flag to specify this function is part
 *     of a chain of calls and therefore transformations should be set as
 *     pending but not yet performed.
 */
Element.prototype.setPosition = function(
    left, top, opt_chain) {
 this.setLeft(left, true);
 this.setTop(top, opt_chain);
};


/**
 * Shortcut for setting the width and height.
 * @param {string|number} width The new width value.
 * @param {string|number} height The new height value.
 * @param {boolean=} opt_chain Optional flag to specify this function is part
 *     of a chain of calls and therefore transformations should be set as
 *     pending but not yet performed.
 */
Element.prototype.setSize = function(
    width, height, opt_chain) {
 this.setWidth(width, true);
 this.setHeight(height, opt_chain);
};


/**
 * Shortcut for setting the left, top, width, and height.
 * @param {string|number} left The left coordinate.
 * @param {string|number} top The top coordinate.
 * @param {string|number} width The new width value.
 * @param {string|number} height The new height value.
 * @param {boolean=} opt_chain Optional flag to specify this function is part
 *     of a chain of calls and therefore transformations should be set as
 *     pending but not yet performed.
 */
Element.prototype.setBounds = function(
    left, top, width, height, opt_chain) {
 this.setLeft(left, true);
 this.setTop(top, true);
 this.setWidth(width, true);
 this.setHeight(height, opt_chain);
};


// MAXIMUM BOUNDS


/**
 * @return {number} An estimate of the maximum x extent this element would have
 *     in a parent of no width.
 */
Element.prototype.getMaxX = function() {
 return this.xPosition_.getMaxPosition();
};


/**
 * @return {number} An estimate of the maximum y extent this element would have
 *     in a parent of no height.
 */
Element.prototype.getMaxY = function() {
 return this.yPosition_.getMaxPosition();
};


// RESET


/**
 * Reset the element.  This is called when the element changes size, or when
 * the coordinate system changes in a way that would affect pixel based
 * rendering
 */
Element.prototype.reset = function() {
 this.xPosition_.resetCache();
 this.yPosition_.resetCache();

 this.redraw();

 this.needsTransform_ = true;
 this.transform();
};


/**
 * Overridable function for subclass specific reset.
 * @protected
 */
Element.prototype.redraw = function() {};


// PARENT DEPENDENCY


/**
 * Computes whether the element is still parent dependent.
 * @param {Element.Position_} position The recently changed
 *     position object.
 * @private
 */
Element.prototype.computeIsParentDependent_ = function(
    position) {
 this.parentDependent_ = position.isParentDependent() ||
     this.xPosition_.isParentDependent() ||
     this.yPosition_.isParentDependent() || this.checkParentDependent();
};


/**
 * Returns whether this element's bounds depend on its parents.
 *
 * This function should be treated as if it has package scope.
 * @return {boolean} Whether this element's bounds depend on its parents.
 */
Element.prototype.isParentDependent = function() {
 return this.parentDependent_;
};


/**
 * Overridable function for subclass specific parent dependency.
 * @return {boolean} Whether this shape's bounds depends on its parent's.
 * @protected
 */
Element.prototype.checkParentDependent = functions.FALSE;


// ROTATION


/**
 * Set the rotation of this element.
 * @param {number} angle The angle of rotation, in degrees.
 */
Element.prototype.setRotation = function(angle) {
 if (this.rotation_ != angle) {
   this.rotation_ = angle;

   this.needsTransform_ = true;
   this.transform();
 }
};


/**
 * @return {number} The angle of rotation of this element, in degrees.
 */
Element.prototype.getRotation = function() {
 return this.rotation_;
};


// TRANSFORMS


/**
 * Called by the parent when the parent has transformed.
 *
 * Should be treated as package scope.
 */
Element.prototype.parentTransform = function() {
 this.needsTransform_ = this.needsTransform_ || this.parentDependent_;
};


/**
 * @return {boolean} Whether this element has pending transforms.
 */
Element.prototype.isPendingTransform = function() {
 return this.needsTransform_;
};


/**
 * Performs a pending transform.
 * @protected
 */
Element.prototype.transform = function() {
 if (this.isPendingTransform()) {
   this.needsTransform_ = false;

   this.wrapper_.setTransformation(
       this.getLeft(), this.getTop(), this.rotation_,
       (this.getWidth() || 1) / 2, (this.getHeight() || 1) / 2);

   // TODO(robbyw): this._fireEvent('transform', [ this ]);
 }
};


// PIXEL SCALE


/**
 * @return {number} Returns the number of pixels per unit in the x direction.
 */
Element.prototype.getPixelScaleX = function() {
 return this.getGraphics().getPixelScaleX();
};


/**
 * @return {number} Returns the number of pixels per unit in the y direction.
 */
Element.prototype.getPixelScaleY = function() {
 return this.getGraphics().getPixelScaleY();
};


// EVENT HANDLING


/** @override */
Element.prototype.disposeInternal = function() {
 Element.superClass_.disposeInternal.call(this);
 this.wrapper_.dispose();
};


// INTERNAL POSITION OBJECT


/**
 * Position specification types.  Start corresponds to left/top, middle to
 * center/middle, and end to right/bottom.
 * @enum {number}
 * @private
 */
Element.PositionType_ = {
  START: 0,
  MIDDLE: 1,
  END: 2
};



/**
 * Manages a position and size, either horizontal or vertical.
 * @param {Element} element The element the position applies
 *     to.
 * @param {boolean} horizontal Whether the position is horizontal or vertical.
 * @constructor
 * @private
 */
Element.Position_ = function(element, horizontal) {
 this.element_ = element;
 this.horizontal_ = horizontal;
};


/**
 * @return {!Object} The coordinate value computation cache.
 * @private
 */
Element.Position_.prototype.getCoordinateCache_ = function() {
 return this.coordinateCache_ || (this.coordinateCache_ = {});
};


/**
 * @return {number} The size of the parent's coordinate space.
 * @private
 */
Element.Position_.prototype.getParentSize_ = function() {
 const parent = this.element_.getParent();
 return this.horizontal_ ? parent.getCoordinateWidth() :
                           parent.getCoordinateHeight();
};


/**
 * @return {number} The minimum width/height of the element.
 */
Element.Position_.prototype.getMinSize = function() {
 return this.getValue_(this.minSize_);
};


/**
 * Sets the minimum width/height of the element.
 * @param {string|number} minSize The minimum width/height of the element.
 */
Element.Position_.prototype.setMinSize = function(minSize) {
 this.minSize_ = minSize;
 this.resetCache();
};


/**
 * @return {number} The width/height of the element.
 */
Element.Position_.prototype.getSize = function() {
 return Math.max(this.getValue_(this.size_), this.getMinSize());
};


/**
 * Sets the width/height of the element.
 * @param {string|number} size The width/height of the element.
 * @return {boolean} Whether the value was changed.
 */
Element.Position_.prototype.setSize = function(size) {
 if (size != this.size_) {
   this.size_ = size;
   this.resetCache();
   return true;
 }
 return false;
};


/**
 * Converts the given x coordinate to a number value in units.
 * @param {string|number} v The coordinate to retrieve the value for.
 * @param {boolean=} opt_forMaximum Whether we are computing the largest value
 *     this coordinate would be in a parent of no size.
 * @return {number} The correct number of coordinate space units.
 * @private
 */
Element.Position_.prototype.getValue_ = function(
    v, opt_forMaximum) {
 if (!coordinates.isSpecial(v)) {
   return parseFloat(String(v));
 }

 const cache = this.getCoordinateCache_();
 const scale = this.horizontal_ ? this.element_.getPixelScaleX() :
                                  this.element_.getPixelScaleY();

 let containerSize;
 if (opt_forMaximum) {
   containerSize =
       coordinates.computeValue(this.size_ || 0, 0, scale);
 } else {
   const parent = this.element_.getParent();
   containerSize = this.horizontal_ ? parent.getWidth() : parent.getHeight();
 }

 return coordinates.getValue(
     v, opt_forMaximum, containerSize, scale, cache);
};


/**
 * @return {number} The distance from the left/top edge of this element to the
 *     left/top edge of its parent, specified in units of the parent's
 *     coordinate system.
 */
Element.Position_.prototype.getStart = function() {
 if (this.cachedValue_ == null) {
   const value = this.getValue_(this.distance_);
   if (this.distanceType_ == Element.PositionType_.START) {
     this.cachedValue_ = value;
   } else if (
       this.distanceType_ == Element.PositionType_.MIDDLE) {
     this.cachedValue_ = value + (this.getParentSize_() - this.getSize()) / 2;
   } else {
     this.cachedValue_ = this.getParentSize_() - value - this.getSize();
   }
 }

 return this.cachedValue_;
};


/**
 * @return {number} The middle coordinate of the element, in units of the
 *     parent's coordinate system.
 */
Element.Position_.prototype.getMiddle = function() {
 return this.distanceType_ == Element.PositionType_.MIDDLE ?
     this.getValue_(this.distance_) :
     (this.getParentSize_() - this.getSize()) / 2 - this.getStart();
};


/**
 * @return {number} The end coordinate of the element, in units of the
 *     parent's coordinate system.
 */
Element.Position_.prototype.getEnd = function() {
 return this.distanceType_ == Element.PositionType_.END ?
     this.getValue_(this.distance_) :
     this.getParentSize_() - this.getStart() - this.getSize();
};


/**
 * Sets the position, either as a left/top, center/middle, or right/bottom
 * value.
 * @param {number|string} value The value of the coordinate.
 * @param {Element.PositionType_} type The type of the
 *     coordinate.
 */
Element.Position_.prototype.setPosition = function(
    value, type) {
 this.distance_ = value;
 this.distanceType_ = type;

 // Clear cached value.
 this.cachedValue_ = null;
};


/**
 * @return {number} An estimate of the maximum x/y extent this element would
 *     have in a parent of no width/height.
 */
Element.Position_.prototype.getMaxPosition = function() {
 // TODO(robbyw): Handle transformed or rotated coordinates
 // TODO(robbyw): Handle pixel based sizes?

 return this.getValue_(this.distance_ || 0) +
     (coordinates.isSpecial(this.size_) ? 0 :
                                                            this.getSize());
};


/**
 * Resets the caches of position values and coordinate values.
 */
Element.Position_.prototype.resetCache = function() {
 this.coordinateCache_ = null;
 this.cachedValue_ = null;
};


/**
 * @return {boolean} Whether the size or position of this element depends on
 *     the size of the parent element.
 */
Element.Position_.prototype.isParentDependent = function() {
 return this.distanceType_ != Element.PositionType_.START ||
     coordinates.isSpecial(this.size_) ||
     coordinates.isSpecial(this.minSize_) ||
     coordinates.isSpecial(this.distance_);
};


/**
 * The lazy loaded distance from the parent's top/left edge to this element's
 * top/left edge expressed in the parent's coordinate system.  We cache this
 * because it is most freqeuently requested by the element and it is easy to
 * compute middle and end values from it.
 * @type {?number}
 * @private
 */
Element.Position_.prototype.cachedValue_ = null;


/**
 * A cache of computed x coordinates.
 * @type {?Object}
 * @private
 */
Element.Position_.prototype.coordinateCache_ = null;


/**
 * The minimum width/height of this element, as specified by the caller.
 * @type {string|number}
 * @private
 */
Element.Position_.prototype.minSize_ = 0;


/**
 * The width/height of this object, as specified by the caller.
 * @type {string|number}
 * @private
 */
Element.Position_.prototype.size_ = 0;


/**
 * The coordinate of this object, as specified by the caller.  The type of
 * coordinate is specified by distanceType_.
 * @type {string|number}
 * @private
 */
Element.Position_.prototype.distance_ = 0;


/**
 * The coordinate type specified by distance_.
 * @type {Element.PositionType_}
 * @private
 */
Element.Position_.prototype.distanceType_ =
    Element.PositionType_.START;
