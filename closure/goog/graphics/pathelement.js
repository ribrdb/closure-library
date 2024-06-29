/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview A thin wrapper around the DOM element for paths.
 */


goog.declareModuleId('goog.graphics.pathelement');

import { StrokeAndFillElement } from './strokeandfillelement.js';
const { AbstractGraphics } = goog.requireType('goog.graphics.abstractgraphics');
const { Fill } = goog.requireType('goog.graphics.fill');
const { Path } = goog.requireType('goog.graphics.path');
const { Stroke } = goog.requireType('goog.graphics.stroke');



/**
 * Interface for a graphics path element.
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
export function PathElement(element, graphics, stroke, fill) {
 StrokeAndFillElement.call(
     this, element, graphics, stroke, fill);
}
goog.inherits(PathElement, StrokeAndFillElement);


/**
 * Update the underlying path.
 * @param {!Path} path The path object to draw.
 */
PathElement.prototype.setPath = goog.abstractMethod;
