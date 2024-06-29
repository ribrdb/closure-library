/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview A thick wrapper around images.
 */


import { Element } from './element.js';

const { Group } = goog.requireType('goog.graphics.ext.group');



/**
 * Wrapper for a graphics image element.
 * @param {Group} group Parent for this element.
 * @param {string} src The path to the image to display.
 * @constructor
 * @extends {Element}
 * @final
 */
export function Image(group, src) {
 // Initialize with some stock values.
 /** @suppress {strictMissingProperties} Added to tighten compiler checks */
 const wrapper = group.getGraphicsImplementation().drawImage(
     0, 0, 1, 1, src, group.getWrapper());
 Element.call(this, group, wrapper);
}
goog.inherits(Image, Element);


/**
 * Redraw the image.  Called when the coordinate system is changed.
 * @protected
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
Image.prototype.redraw = function() {
 Image.superClass_.redraw.call(this);

 // Our position is already handled bu transform_.
 this.getWrapper().setSize(this.getWidth(), this.getHeight());
};


/**
 * Update the source of the image.
 * @param {string} src  Source of the image.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
Image.prototype.setSource = function(src) {
 this.getWrapper().setSource(src);
};
