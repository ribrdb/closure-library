/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview A thin wrapper around the DOM element for images.
 */


goog.declareModuleId('goog.graphics.imageelement');

import { Element as GraphicsElement } from './element.js';
const { AbstractGraphics } = goog.requireType('goog.graphics.abstractgraphics');



/**
 * Interface for a graphics image element.
 * You should not construct objects from this constructor. Instead,
 * you should use `goog.graphics.Graphics.drawImage` and it
 * will return an implementation of this interface for you.
 *
 * @param {Element} element The DOM element to wrap.
 * @param {AbstractGraphics} graphics The graphics creating
 *     this element.
 * @constructor
 * @extends {GraphicsElement}
 * @deprecated goog.graphics is deprecated. It existed to abstract over browser
 *     differences before the canvas tag was widely supported.  See
 *     http://en.wikipedia.org/wiki/Canvas_element for details.
 */
export function ImageElement(element, graphics) {
 GraphicsElement.call(this, element, graphics);
}
goog.inherits(ImageElement, GraphicsElement);


/**
 * Update the position of the image.
 *
 * @param {number} x X coordinate (left).
 * @param {number} y Y coordinate (top).
 */
ImageElement.prototype.setPosition = goog.abstractMethod;


/**
 * Update the size of the image.
 *
 * @param {number} width Width of image.
 * @param {number} height Height of image.
 */
ImageElement.prototype.setSize = goog.abstractMethod;


/**
 * Update the source of the image.
 * @param {string} src Source of the image.
 */
ImageElement.prototype.setSource = goog.abstractMethod;
