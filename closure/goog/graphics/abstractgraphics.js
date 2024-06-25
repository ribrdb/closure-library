/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview Graphics utility functions and factory methods.
 */


goog.declareModuleId('goog.graphics.abstractgraphics');

import * as dom from '../dom/dom.js';
import { AffineTransform } from './affinetransform.js';
import { Element } from './element.js';
import { EllipseElement } from './ellipseelement.js';
import { Fill } from './fill.js';
import { Font } from './font.js';
import { GroupElement } from './groupelement.js';
import { Path } from './path.js';
import { PathElement } from './pathelement.js';
import { RectElement } from './rectelement.js';
import { Stroke } from './stroke.js';
import { StrokeAndFillElement } from './strokeandfillelement.js';
import { TextElement } from './textelement.js';
import { Coordinate } from '../math/coordinate.js';
import { Size } from '../math/size.js';
import * as style from '../style/style.js';
import { Component } from '../ui/component.js';



/**
 * Base class for the different graphics. You should never construct objects
 * of this class. Instead us goog.graphics.createGraphics
 * @param {number|string} width The width in pixels or percent.
 * @param {number|string} height The height in pixels or percent.
 * @param {?number=} opt_coordWidth Optional coordinate system width - if
 *     omitted or null, defaults to same as width.
 * @param {?number=} opt_coordHeight Optional coordinate system height - if
 *     omitted or null, defaults to same as height.
 * @param {dom.DomHelper=} opt_domHelper The DOM helper object for the
 *     document we want to render in.
 * @constructor
 * @extends {Component}
 */
export function AbstractGraphics(width, height, opt_coordWidth, opt_coordHeight, opt_domHelper) {
 Component.call(this, opt_domHelper);

 /**
  * Width of graphics in pixels or percentage points.
  * @type {number|string}
  * @protected
  */
 this.width = width;

 /**
  * Height of graphics in pixels or percentage points.
  * @type {number|string}
  * @protected
  */
 this.height = height;

 /**
  * Width of coordinate system in units.
  * @type {?number}
  * @protected
  */
 this.coordWidth = opt_coordWidth || null;

 /**
  * Height of coordinate system in units.
  * @type {?number}
  * @protected
  */
 this.coordHeight = opt_coordHeight || null;
}
goog.inherits(AbstractGraphics, Component);


/**
 * The root level group element.
 * @type {GroupElement?}
 * @protected
 */
AbstractGraphics.prototype.canvasElement = null;


/**
 * Left coordinate of the view box
 * @type {number}
 * @protected
 */
AbstractGraphics.prototype.coordLeft = 0;


/**
 * Top coordinate of the view box
 * @type {number}
 * @protected
 */
AbstractGraphics.prototype.coordTop = 0;


/**
 * @return {GroupElement} The root level canvas element.
 */
AbstractGraphics.prototype.getCanvasElement = function() {
 return this.canvasElement;
};


/**
 * Changes the coordinate size.
 * @param {number} coordWidth  The coordinate width.
 * @param {number} coordHeight  The coordinate height.
 */
AbstractGraphics.prototype.setCoordSize = function(
    coordWidth, coordHeight) {
 this.coordWidth = coordWidth;
 this.coordHeight = coordHeight;
};


/**
 * @return {Size} The coordinate size.
 */
AbstractGraphics.prototype.getCoordSize = function() {
 if (this.coordWidth) {
   return new Size(
       this.coordWidth,
       /** @type {number} */ (this.coordHeight));
 } else {
   return this.getPixelSize();
 }
};


/**
 * Changes the coordinate system position.
 * @param {number} left  The coordinate system left bound.
 * @param {number} top  The coordinate system top bound.
 */
AbstractGraphics.prototype.setCoordOrigin = goog.abstractMethod;


/**
 * @return {!Coordinate} The coordinate system position.
 */
AbstractGraphics.prototype.getCoordOrigin = function() {
 return new Coordinate(this.coordLeft, this.coordTop);
};


/**
 * Change the size of the canvas.
 * @param {number} pixelWidth  The width in pixels.
 * @param {number} pixelHeight  The height in pixels.
 */
AbstractGraphics.prototype.setSize = goog.abstractMethod;


/**
 * @return {Size} The size of canvas.
 * @deprecated Use getPixelSize.
 */
AbstractGraphics.prototype.getSize = function() {
 return this.getPixelSize();
};


/**
 * @return {Size?} Returns the number of pixels spanned by the
 *     surface, or null if the size could not be computed due to the size being
 *     specified in percentage points and the component not being in the
 *     document.
 */
AbstractGraphics.prototype.getPixelSize = function() {
 if (this.isInDocument()) {
   return style.getSize(this.getElement());
 }
 if (typeof this.width === 'number' && typeof this.height === 'number') {
   return new Size(this.width, this.height);
 }
 return null;
};


/**
 * @return {number} Returns the number of pixels per unit in the x direction.
 */
AbstractGraphics.prototype.getPixelScaleX = function() {
 var pixelSize = this.getPixelSize();
 return pixelSize ? pixelSize.width / this.getCoordSize().width : 0;
};


/**
 * @return {number} Returns the number of pixels per unit in the y direction.
 */
AbstractGraphics.prototype.getPixelScaleY = function() {
 var pixelSize = this.getPixelSize();
 return pixelSize ? pixelSize.height / this.getCoordSize().height : 0;
};


/**
 * Remove all drawing elements from the graphics.
 */
AbstractGraphics.prototype.clear = goog.abstractMethod;


/**
 * Remove a single drawing element from the surface.  The default implementation
 * assumes a DOM based drawing surface.
 * @param {Element} element The element to remove.
 */
AbstractGraphics.prototype.removeElement = function(element) {
 dom.removeNode(element.getElement());
};


/**
 * Sets the fill for the given element.
 * @param {StrokeAndFillElement} element The element wrapper.
 * @param {Fill?} fill The fill object.
 */
AbstractGraphics.prototype.setElementFill = goog.abstractMethod;


/**
 * Sets the stroke for the given element.
 * @param {StrokeAndFillElement} element The element wrapper.
 * @param {Stroke?} stroke The stroke object.
 */
AbstractGraphics.prototype.setElementStroke = goog.abstractMethod;


/**
 * Set the transformation of an element.
 *
 * If a more general affine transform is needed than this provides
 * (e.g. skew and scale) then use setElementAffineTransform.
 * @param {Element} element The element wrapper.
 * @param {number} x The x coordinate of the translation transform.
 * @param {number} y The y coordinate of the translation transform.
 * @param {number} angle The angle of the rotation transform.
 * @param {number} centerX The horizontal center of the rotation transform.
 * @param {number} centerY The vertical center of the rotation transform.
 */
AbstractGraphics.prototype.setElementTransform =
    goog.abstractMethod;


/**
 * Set the affine transform of an element.
 * @param {!Element} element The element wrapper.
 * @param {!AffineTransform} affineTransform The
 *     transformation applied to this element.
 */
AbstractGraphics.prototype.setElementAffineTransform =
    goog.abstractMethod;


/**
 * Draw a circle
 *
 * @param {number} cx Center X coordinate.
 * @param {number} cy Center Y coordinate.
 * @param {number} r Radius length.
 * @param {Stroke?} stroke Stroke object describing the
 *    stroke.
 * @param {Fill?} fill Fill object describing the fill.
 * @param {GroupElement=} opt_group The group wrapper element to
 *     append to. If not specified, appends to the main canvas.
 *
 * @return {EllipseElement} The newly created element.
 */
AbstractGraphics.prototype.drawCircle = function(
    cx, cy, r, stroke, fill, opt_group) {
 return this.drawEllipse(cx, cy, r, r, stroke, fill, opt_group);
};


/**
 * Draw an ellipse
 *
 * @param {number} cx Center X coordinate.
 * @param {number} cy Center Y coordinate.
 * @param {number} rx Radius length for the x-axis.
 * @param {number} ry Radius length for the y-axis.
 * @param {Stroke?} stroke Stroke object describing the
 *    stroke.
 * @param {Fill?} fill Fill object describing the fill.
 * @param {GroupElement=} opt_group The group wrapper element to
 *     append to. If not specified, appends to the main canvas.
 *
 * @return {EllipseElement} The newly created element.
 */
AbstractGraphics.prototype.drawEllipse = goog.abstractMethod;


/**
 * Draw a rectangle
 *
 * @param {number} x X coordinate (left).
 * @param {number} y Y coordinate (top).
 * @param {number} width Width of rectangle.
 * @param {number} height Height of rectangle.
 * @param {Stroke?} stroke Stroke object describing the
 *    stroke.
 * @param {Fill?} fill Fill object describing the fill.
 * @param {GroupElement=} opt_group The group wrapper element to
 *     append to. If not specified, appends to the main canvas.
 *
 * @return {RectElement} The newly created element.
 */
AbstractGraphics.prototype.drawRect = goog.abstractMethod;


/**
 * Draw a text string within a rectangle (drawing is horizontal)
 *
 * @param {string} text The text to draw.
 * @param {number} x X coordinate (left).
 * @param {number} y Y coordinate (top).
 * @param {number} width Width of rectangle.
 * @param {number} height Height of rectangle.
 * @param {string} align Horizontal alignment: left (default), center, right.
 * @param {string} vAlign Vertical alignment: top (default), center, bottom.
 * @param {Font} font Font describing the font properties.
 * @param {Stroke?} stroke Stroke object describing the
 *    stroke.
 * @param {Fill?} fill  Fill object describing the fill.
 * @param {GroupElement=} opt_group The group wrapper element to
 *     append to. If not specified, appends to the main canvas.
 *
 * @return {TextElement} The newly created element.
 */
AbstractGraphics.prototype.drawText = function(
    text, x, y, width, height, align, vAlign, font, stroke, fill, opt_group) {
 var baseline = font.size / 2;  // Baseline is middle of line
 var textY;
 if (vAlign == 'bottom') {
   textY = y + height - baseline;
 } else if (vAlign == 'center') {
   textY = y + height / 2;
 } else {
   textY = y + baseline;
 }

 return this.drawTextOnLine(
     text, x, textY, x + width, textY, align, font, stroke, fill, opt_group);
};


/**
 * Draw a text string vertically centered on a given line.
 *
 * @param {string} text  The text to draw.
 * @param {number} x1 X coordinate of start of line.
 * @param {number} y1 Y coordinate of start of line.
 * @param {number} x2 X coordinate of end of line.
 * @param {number} y2 Y coordinate of end of line.
 * @param {string} align Horizontal alingnment: left (default), center, right.
 * @param {Font} font Font describing the font properties.
 * @param {Stroke?} stroke Stroke object describing the
 *    stroke.
 * @param {Fill?} fill Fill object describing the fill.
 * @param {GroupElement=} opt_group The group wrapper element to
 *     append to. If not specified, appends to the main canvas.
 *
 * @return {TextElement} The newly created element.
 */
AbstractGraphics.prototype.drawTextOnLine = goog.abstractMethod;


/**
 * Draw a path.
 *
 * @param {!Path} path The path object to draw.
 * @param {Stroke?} stroke Stroke object describing the
 *    stroke.
 * @param {Fill?} fill Fill object describing the fill.
 * @param {GroupElement=} opt_group The group wrapper element to
 *     append to. If not specified, appends to the main canvas.
 *
 * @return {PathElement} The newly created element.
 */
AbstractGraphics.prototype.drawPath = goog.abstractMethod;


/**
 * Create an empty group of drawing elements.
 *
 * @param {GroupElement=} opt_group The group wrapper element to
 *     append to. If not specified, appends to the main canvas.
 *
 * @return {GroupElement} The newly created group.
 */
AbstractGraphics.prototype.createGroup = goog.abstractMethod;


/**
 * Create an empty path.
 *
 * @return {!Path} The path.
 * @deprecated Use {@code new Path()}.
 */
AbstractGraphics.prototype.createPath = function() {
 return new Path();
};


/**
 * Measure and return the width (in pixels) of a given text string.
 * Text measurement is needed to make sure a text can fit in the allocated
 * area. The way text length is measured is by writing it into a div that is
 * after the visible area, measure the div width, and immediately erase the
 * written value.
 *
 * @param {string} text The text string to measure.
 * @param {Font} font The font object describing the font style.
 *
 * @return {number} The width in pixels of the text strings.
 */
AbstractGraphics.prototype.getTextWidth = goog.abstractMethod;


/**
 * @return {boolean} Whether the underlying element can be cloned resulting in
 *     an accurate reproduction of the graphics contents.
 */
AbstractGraphics.prototype.isDomClonable = function() {
 return false;
};


/**
 * Start preventing redraws - useful for chaining large numbers of changes
 * together.  Not guaranteed to do anything - i.e. only use this for
 * optimization of a single code path.
 */
AbstractGraphics.prototype.suspend = function() {};


/**
 * Stop preventing redraws.  If any redraws had been prevented, a redraw will
 * be done now.
 */
AbstractGraphics.prototype.resume = function() {};
