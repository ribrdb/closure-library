/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview Represents a solid color fill goog.graphics.
 */


import { Fill } from './fill.js';



/**
 * Creates an immutable solid color fill object.
 *
 * @param {string} color The color of the background.
 * @param {number=} opt_opacity The opacity of the background fill. The value
 *    must be greater than or equal to zero (transparent) and less than or
 *    equal to 1 (opaque).
 * @constructor
 * @extends {Fill}
 * @deprecated goog.graphics is deprecated. It existed to abstract over browser
 *     differences before the canvas tag was widely supported.  See
 *     http://en.wikipedia.org/wiki/Canvas_element for details.
 */
export function SolidFill(color, opt_opacity) {
 /**
  * The color with which to fill.
  * @type {string}
  * @private
  */
 this.color_ = color;


 /**
  * The opacity of the fill.
  * @type {number}
  * @private
  */
 this.opacity_ = opt_opacity == null ? 1.0 : opt_opacity;
}
goog.inherits(SolidFill, Fill);


/**
 * @return {string} The color of this fill.
 */
SolidFill.prototype.getColor = function() {
 return this.color_;
};


/**
 * @return {number} The opacity of this fill.
 */
SolidFill.prototype.getOpacity = function() {
 return this.opacity_;
};
