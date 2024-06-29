/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview A thick wrapper around rectangles.
 */


import { StrokeAndFillElement } from './strokeandfillelement.js';

const { Group } = goog.requireType('goog.graphics.ext.group');



/**
 * Wrapper for a graphics rectangle element.
 * @param {Group} group Parent for this element.
 * @constructor
 * @extends {StrokeAndFillElement}
 * @final
 */
export function Rectangle(group) {
 // Initialize with some stock values.
 const wrapper = group.getGraphicsImplementation().drawRect(
     0, 0, 1, 1, null, null, group.getWrapper());
 StrokeAndFillElement.call(this, group, wrapper);
}
goog.inherits(
    Rectangle, StrokeAndFillElement);


/**
 * Redraw the rectangle.  Called when the coordinate system is changed.
 * @protected
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
Rectangle.prototype.redraw = function() {
 Rectangle.superClass_.redraw.call(this);

 // Our position is already handled by transform_.
 this.getWrapper().setSize(this.getWidth(), this.getHeight());
};
