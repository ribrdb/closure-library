/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview Graphics utility functions and factory methods.
 * @see ../demos/graphics/advancedcoordinates.html
 * @see ../demos/graphics/advancedcoordinates2.html
 * @see ../demos/graphics/basicelements.html
 * @see ../demos/graphics/events.html
 * @see ../demos/graphics/modifyelements.html
 * @see ../demos/graphics/tiger.html
 */


import * as dom from '../dom/dom.js';

import { CanvasGraphics } from './canvasgraphics.js';
import { SvgGraphics } from './svggraphics.js';
import * as userAgent from '../useragent/useragent.js';
const { AbstractGraphics } = goog.requireType('goog.graphics.abstractgraphics');


/**
 * Returns an instance of AbstractGraphics that knows how to draw
 * for the current platform (A factory for the proper Graphics implementation)
 * @param {string|number} width The width in pixels.  Strings
 *     expressing percentages of parent with (e.g. '80%') are also accepted.
 * @param {string|number} height The height in pixels.  Strings
 *     expressing percentages of parent with (e.g. '80%') are also accepted.
 * @param {?number=} opt_coordWidth The optional coordinate width - if
 *     omitted or null, defaults to same as width.
 * @param {?number=} opt_coordHeight The optional coordinate height - if
 *     omitted or null, defaults to same as height.
 * @param {dom.DomHelper=} opt_domHelper The DOM helper object for the
 *     document we want to render in.
 * @return {!AbstractGraphics} The created instance.
 * @deprecated goog.graphics is deprecated. It existed to abstract over browser
 *     differences before the canvas tag was widely supported.  See
 *     http://en.wikipedia.org/wiki/Canvas_element for details.
 */
export function createGraphics(width, height, opt_coordWidth, opt_coordHeight, opt_domHelper) {
 var graphics;
 if (userAgent.WEBKIT && userAgent.MOBILE) {
   graphics = new CanvasGraphics(
       width, height, opt_coordWidth, opt_coordHeight, opt_domHelper);
 } else {
   graphics = new SvgGraphics(
       width, height, opt_coordWidth, opt_coordHeight, opt_domHelper);
 }

 // Create the dom now, because all drawing methods require that the
 // main dom element (the canvas) has been already created.
 graphics.createDom();

 return graphics;
}


/**
 * Returns an instance of AbstractGraphics that knows how to draw
 * for the current platform (A factory for the proper Graphics implementation)
 * @param {string|number} width The width in pixels.  Strings
 *     expressing percentages of parent with (e.g. '80%') are also accepted.
 * @param {string|number} height The height in pixels.   Strings
 *     expressing percentages of parent with (e.g. '80%') are also accepted.
 * @param {?number=} opt_coordWidth The optional coordinate width, defaults to
 *     same as width.
 * @param {?number=} opt_coordHeight The optional coordinate height, defaults to
 *     same as height.
 * @param {dom.DomHelper=} opt_domHelper The DOM helper object for the
 *     document we want to render in.
 * @return {!AbstractGraphics} The created instance.
 * @deprecated goog.graphics is deprecated. It existed to abstract over browser
 *     differences before the canvas tag was widely supported.  See
 *     http://en.wikipedia.org/wiki/Canvas_element for details.
 */
export function createSimpleGraphics(width, height, opt_coordWidth, opt_coordHeight, opt_domHelper) {
 // Otherwise, defer to normal graphics object creation.
 return createGraphics(
     width, height, opt_coordWidth, opt_coordHeight, opt_domHelper);
}


/**
 * Static function to check if the current browser has Graphics support.
 * @return {boolean} True if the current browser has Graphics support.
 * @deprecated goog.graphics is deprecated. It existed to abstract over browser
 *     differences before the canvas tag was widely supported.  See
 *     http://en.wikipedia.org/wiki/Canvas_element for details.
 */
export function isBrowserSupported() {
 return true;
}
