/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview A thick wrapper around ellipses.
 */


import { StrokeAndFillElement } from './strokeandfillelement.js';

const { Group } = goog.requireType('goog.graphics.ext.group');



/**
 * Wrapper for a graphics ellipse element.
 * @param {Group} group Parent for this element.
 * @constructor
 * @extends {StrokeAndFillElement}
 * @final
 */
export function Ellipse(group) {
 // Initialize with some stock values.
 const wrapper = group.getGraphicsImplementation().drawEllipse(
     1, 1, 2, 2, null, null, group.getWrapper());
 StrokeAndFillElement.call(this, group, wrapper);
}
goog.inherits(
    Ellipse, StrokeAndFillElement);


/**
 * Redraw the ellipse.  Called when the coordinate system is changed.
 * @protected
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
Ellipse.prototype.redraw = function() {
 Ellipse.superClass_.redraw.call(this);

 // Our position is already transformed in transform_, but because this is an
 // ellipse we need to position the center.
 const xRadius = this.getWidth() / 2;
 const yRadius = this.getHeight() / 2;
 const wrapper = this.getWrapper();
 wrapper.setCenter(xRadius, yRadius);
 wrapper.setRadius(xRadius, yRadius);
};
