/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview Thin wrappers around the DOM element returned from
 * the different draw methods of the graphics. This is the SVG implementation.
 */

import * as dom from '../dom/dom.js';

import { EllipseElement } from './ellipseelement.js';
import { GroupElement } from './groupelement.js';
import { ImageElement } from './imageelement.js';
import { PathElement } from './pathelement.js';
import { RectElement } from './rectelement.js';
import { TextElement } from './textelement.js';
import { SvgGraphics } from './svggraphics.js';
const { Fill } = goog.requireType('goog.graphics.fill');
const { Path } = goog.requireType('goog.graphics.path');
const { Stroke } = goog.requireType('goog.graphics.stroke');


/**
 * Thin wrapper for SVG group elements.
 * You should not construct objects from this constructor. The graphics
 * will return the object for you.
 * @param {Element} element The DOM element to wrap.
 * @param {SvgGraphics} graphics The graphics creating
 *     this element.
 * @constructor
 * @extends {GroupElement}
 * @deprecated goog.graphics is deprecated. It existed to abstract over browser
 *     differences before the canvas tag was widely supported.  See
 *     http://en.wikipedia.org/wiki/Canvas_element for details.
 * @final
 */
export function SvgGroupElement(element, graphics) {
 GroupElement.call(this, element, graphics);
}
goog.inherits(SvgGroupElement, GroupElement);


/**
 * Remove all drawing elements from the group.
 * @override
 */
SvgGroupElement.prototype.clear = function() {
 dom.removeChildren(this.getElement());
};


/**
 * Set the size of the group element.
 * @param {number|string} width The width of the group element.
 * @param {number|string} height The height of the group element.
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
SvgGroupElement.prototype.setSize = function(width, height) {
 this.getGraphics().setElementAttributes(
     this.getElement(), {'width': width, 'height': height});
};



/**
 * Thin wrapper for SVG ellipse elements.
 * This is an implementation of the EllipseElement interface.
 * You should not construct objects from this constructor. The graphics
 * will return the object for you.
 * @param {Element} element The DOM element to wrap.
 * @param {SvgGraphics} graphics The graphics creating
 *     this element.
 * @param {Stroke?} stroke The stroke to use for this element.
 * @param {Fill?} fill The fill to use for this element.
 * @constructor
 * @extends {EllipseElement}
 * @final
 */
export function SvgEllipseElement(element, graphics, stroke, fill) {
 EllipseElement.call(this, element, graphics, stroke, fill);
}
goog.inherits(SvgEllipseElement, EllipseElement);


/**
 * Update the center point of the ellipse.
 * @param {number} cx Center X coordinate.
 * @param {number} cy Center Y coordinate.
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
SvgEllipseElement.prototype.setCenter = function(cx, cy) {
 this.getGraphics().setElementAttributes(
     this.getElement(), {'cx': cx, 'cy': cy});
};


/**
 * Update the radius of the ellipse.
 * @param {number} rx Radius length for the x-axis.
 * @param {number} ry Radius length for the y-axis.
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
SvgEllipseElement.prototype.setRadius = function(rx, ry) {
 this.getGraphics().setElementAttributes(
     this.getElement(), {'rx': rx, 'ry': ry});
};



/**
 * Thin wrapper for SVG rectangle elements.
 * This is an implementation of the RectElement interface.
 * You should not construct objects from this constructor. The graphics
 * will return the object for you.
 * @param {Element} element The DOM element to wrap.
 * @param {SvgGraphics} graphics The graphics creating
 *     this element.
 * @param {Stroke?} stroke The stroke to use for this element.
 * @param {Fill?} fill The fill to use for this element.
 * @constructor
 * @extends {RectElement}
 * @final
 */
export function SvgRectElement(element, graphics, stroke, fill) {
 RectElement.call(this, element, graphics, stroke, fill);
}
goog.inherits(SvgRectElement, RectElement);


/**
 * Update the position of the rectangle.
 * @param {number} x X coordinate (left).
 * @param {number} y Y coordinate (top).
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
SvgRectElement.prototype.setPosition = function(x, y) {
 this.getGraphics().setElementAttributes(this.getElement(), {'x': x, 'y': y});
};


/**
 * Update the size of the rectangle.
 * @param {number} width Width of rectangle.
 * @param {number} height Height of rectangle.
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
SvgRectElement.prototype.setSize = function(width, height) {
 this.getGraphics().setElementAttributes(
     this.getElement(), {'width': width, 'height': height});
};



/**
 * Thin wrapper for SVG path elements.
 * This is an implementation of the PathElement interface.
 * You should not construct objects from this constructor. The graphics
 * will return the object for you.
 * @param {Element} element The DOM element to wrap.
 * @param {SvgGraphics} graphics The graphics creating
 *     this element.
 * @param {Stroke?} stroke The stroke to use for this element.
 * @param {Fill?} fill The fill to use for this element.
 * @constructor
 * @extends {PathElement}
 * @final
 */
export function SvgPathElement(element, graphics, stroke, fill) {
 PathElement.call(this, element, graphics, stroke, fill);
}
goog.inherits(SvgPathElement, PathElement);


/**
 * Update the underlying path.
 * @param {!Path} path The path object to draw.
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 * @suppress {missingRequire} SvgGraphics
 */
SvgPathElement.prototype.setPath = function(path) {
 this.getGraphics().setElementAttributes(
     this.getElement(), {'d': SvgGraphics.getSvgPath(path)});
};



/**
 * Thin wrapper for SVG text elements.
 * This is an implementation of the TextElement interface.
 * You should not construct objects from this constructor. The graphics
 * will return the object for you.
 * @param {Element} element The DOM element to wrap.
 * @param {SvgGraphics} graphics The graphics creating
 *     this element.
 * @param {Stroke?} stroke The stroke to use for this element.
 * @param {Fill?} fill The fill to use for this element.
 * @constructor
 * @extends {TextElement}
 * @final
 */
export function SvgTextElement(element, graphics, stroke, fill) {
 TextElement.call(this, element, graphics, stroke, fill);
}
goog.inherits(SvgTextElement, TextElement);


/**
 * Update the displayed text of the element.
 * @param {string} text The text to draw.
 * @override
 */
SvgTextElement.prototype.setText = function(text) {
 // This is actually SVGTextElement but we don't have it in externs.
 /** @type {!Text} */ (this.getElement().firstChild).data = text;
};



/**
 * Thin wrapper for SVG image elements.
 * This is an implementation of the ImageElement interface.
 * You should not construct objects from this constructor. The graphics
 * will return the object for you.
 * @param {Element} element The DOM element to wrap.
 * @param {SvgGraphics} graphics The graphics creating
 *     this element.
 * @constructor
 * @extends {ImageElement}
 * @final
 */
export function SvgImageElement(element, graphics) {
 ImageElement.call(this, element, graphics);
}
goog.inherits(SvgImageElement, ImageElement);


/**
 * Update the position of the image.
 * @param {number} x X coordinate (left).
 * @param {number} y Y coordinate (top).
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
SvgImageElement.prototype.setPosition = function(x, y) {
 this.getGraphics().setElementAttributes(this.getElement(), {'x': x, 'y': y});
};


/**
 * Update the size of the image.
 * @param {number} width Width of image.
 * @param {number} height Height of image.
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
SvgImageElement.prototype.setSize = function(width, height) {
 this.getGraphics().setElementAttributes(
     this.getElement(), {'width': width, 'height': height});
};


/**
 * Update the source of the image.
 * @param {string} src Source of the image.
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
SvgImageElement.prototype.setSource = function(src) {
 this.getGraphics().setElementAttributes(
     this.getElement(), {'xlink:href': src});
};
