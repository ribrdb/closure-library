/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview A thin wrapper around the DOM element for ellipses.
 */


goog.declareModuleId('goog.graphics.ellipseelement');

import { StrokeAndFillElement } from './strokeandfillelement.js';
const { AbstractGraphics } = goog.requireType('goog.graphics.abstractgraphics');
const { Fill } = goog.requireType('goog.graphics.fill');
const { Stroke } = goog.requireType('goog.graphics.stroke');



/**
 * Interface for a graphics ellipse element.
 * You should not construct objects from this constructor. The graphics
 * will return an implementation of this interface for you.
 * @param {Element} element The DOM element to wrap.
 * @param {AbstractGraphics} graphics The graphics creating
 *     this element.
 * @param {Stroke?} stroke The stroke to use for this element.
 * @param {Fill?} fill The fill to use for this element.
 * @constructor
 * @extends {StrokeAndFillElement}
 * @deprecated goog.graphics is deprecated. It existed to abstract over browser
 *     differences before the canvas tag was widely supported.  See
 *     http://en.wikipedia.org/wiki/Canvas_element for details.
 */
export function EllipseElement(element, graphics, stroke, fill) {
 StrokeAndFillElement.call(
     this, element, graphics, stroke, fill);
}
goog.inherits(EllipseElement, StrokeAndFillElement);


/**
 * Update the center point of the ellipse.
 * @param {number} cx  Center X coordinate.
 * @param {number} cy  Center Y coordinate.
 */
EllipseElement.prototype.setCenter = goog.abstractMethod;


/**
 * Update the radius of the ellipse.
 * @param {number} rx  Radius length for the x-axis.
 * @param {number} ry  Radius length for the y-axis.
 */
EllipseElement.prototype.setRadius = goog.abstractMethod;
