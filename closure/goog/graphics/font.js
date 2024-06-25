/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview Represents a font to be used with a Renderer.
 * @see ../demos/graphics/basicelements.html
 */


Font = function(size, family) {
 /**
  * Font size.
  * @type {number}
  */
 this.size = size;
 // TODO(arv): Is this in pixels or drawing units based on the coord size?

 /**
  * The name of the font family to use, can be a comma separated string.
  * @type {string}
  */
 this.family = family;
};


/**
 * Indication if text should be bolded
 * @type {boolean}
 */
Font.prototype.bold = false;


/**
 * Indication if text should be in italics
 * @type {boolean}
 */
Font.prototype.italic = false;
export var Font;
