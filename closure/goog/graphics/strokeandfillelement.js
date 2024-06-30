/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview A thin wrapper around the DOM element for elements with a
 * stroke and fill.
 */


goog.declareModuleId('goog.graphics.strokeandfillelement');

import { Element as GraphicsElement } from './element.js';
const { AbstractGraphics } = goog.requireType('goog.graphics.abstractgraphics');
const { Fill } = goog.requireType('goog.graphics.fill');
const { Stroke } = goog.requireType('goog.graphics.stroke');



/**
 * Interface for a graphics element with a stroke and fill.
 * This is the base interface for ellipse, rectangle and other
 * shape interfaces.
 * You should not construct objects from this constructor. The graphics
 * will return an implementation of this interface for you.
 *
 * @param {Element} element The DOM element to wrap.
 * @param {AbstractGraphics} graphics The graphics creating
 *     this element.
 * @param {Stroke?} stroke The stroke to use for this element.
 * @param {Fill?} fill The fill to use for this element.
 * @constructor
 * @extends {GraphicsElement}
 * @deprecated goog.graphics is deprecated. It existed to abstract over browser
 *     differences before the canvas tag was widely supported.  See
 *     http://en.wikipedia.org/wiki/Canvas_element for details.
 */
export function StrokeAndFillElement(element, graphics, stroke, fill) {
 GraphicsElement.call(this, element, graphics);
 this.setStroke(stroke);
 this.setFill(fill);
}
goog.inherits(StrokeAndFillElement, GraphicsElement);


/**
 * The latest fill applied to this element.
 * @type {Fill?}
 * @protected
 */
StrokeAndFillElement.prototype.fill = null;


/**
 * The latest stroke applied to this element.
 * @type {Stroke?}
 * @private
 */
StrokeAndFillElement.prototype.stroke_ = null;


/**
 * Sets the fill for this element.
 * @param {Fill?} fill The fill object.
 */
StrokeAndFillElement.prototype.setFill = function(fill) {
 this.fill = fill;
 this.getGraphics().setElementFill(this, fill);
};


/**
 * @return {Fill?} fill The fill object.
 */
StrokeAndFillElement.prototype.getFill = function() {
 return this.fill;
};


/**
 * Sets the stroke for this element.
 * @param {Stroke?} stroke The stroke object.
 */
StrokeAndFillElement.prototype.setStroke = function(stroke) {
 this.stroke_ = stroke;
 this.getGraphics().setElementStroke(this, stroke);
};


/**
 * @return {Stroke?} stroke The stroke object.
 */
StrokeAndFillElement.prototype.getStroke = function() {
 return this.stroke_;
};


/**
 * Re-strokes the element to react to coordinate size changes.
 */
StrokeAndFillElement.prototype.reapplyStroke = function() {
 if (this.stroke_) {
   this.setStroke(this.stroke_);
 }
};
