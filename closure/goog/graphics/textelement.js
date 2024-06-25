/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview A thin wrapper around the DOM element for text elements.
 */


goog.declareModuleId('goog.graphics.textelement');

import { StrokeAndFillElement } from './strokeandfillelement.js';
goog.requireType('goog.graphics.abstractgraphics');
goog.requireType('goog.graphics.fill');
goog.requireType('goog.graphics.stroke');



/**
 * Interface for a graphics text element.
 * You should not construct objects from this constructor. The graphics
 * will return an implementation of this interface for you.
 *
 * @param {Element} element The DOM element to wrap.
 * @param {goog.graphics.AbstractGraphics} graphics The graphics creating
 *     this element.
 * @param {goog.graphics.Stroke?} stroke The stroke to use for this element.
 * @param {goog.graphics.Fill?} fill The fill to use for this element.
 * @constructor
 * @extends {StrokeAndFillElement}
 * @deprecated goog.graphics is deprecated. It existed to abstract over browser
 *     differences before the canvas tag was widely supported.  See
 *     http://en.wikipedia.org/wiki/Canvas_element for details.
 */
export function TextElement(element, graphics, stroke, fill) {
 StrokeAndFillElement.call(
     this, element, graphics, stroke, fill);
}
goog.inherits(TextElement, StrokeAndFillElement);


/**
 * Update the displayed text of the element.
 * @param {string} text The text to draw.
 */
TextElement.prototype.setText = goog.abstractMethod;
