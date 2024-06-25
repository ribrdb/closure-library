/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview A thick wrapper around elements with stroke and fill.
 */


import { Element } from './element.js';

goog.requireType('goog.graphics.fill');
goog.requireType('goog.graphics.stroke');
goog.requireType('goog.graphics.strokeandfillelement');
goog.requireType('goog.graphics.ext.group');



/**
 * Interface for a graphics element that has a stroke and fill.
 * This is the base interface for ellipse, rectangle and other
 * shape interfaces.
 * You should not construct objects from this constructor. Use a subclass.
 * @param {goog.graphics.ext.Group} group Parent for this element.
 * @param {goog.graphics.StrokeAndFillElement} wrapper The thin wrapper to wrap.
 * @constructor
 * @extends {Element}
 */
export function StrokeAndFillElement(group, wrapper) {
 Element.call(this, group, wrapper);
}
goog.inherits(
    StrokeAndFillElement, Element);


/**
 * Sets the fill for this element.
 * @param {goog.graphics.Fill?} fill The fill object.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
StrokeAndFillElement.prototype.setFill = function(fill) {
 this.getWrapper().setFill(fill);
};


/**
 * Sets the stroke for this element.
 * @param {goog.graphics.Stroke?} stroke The stroke object.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
StrokeAndFillElement.prototype.setStroke = function(stroke) {
 this.getWrapper().setStroke(stroke);
};


/**
 * Redraw the rectangle.  Called when the coordinate system is changed.
 * @protected
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
StrokeAndFillElement.prototype.redraw = function() {
 this.getWrapper().reapplyStroke();
};
