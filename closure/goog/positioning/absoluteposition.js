/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Client viewport positioning class.
 */

import { Coordinate } from '../math/coordinate.js';

import * as positioning from './positioning.js';
import { AbstractPosition } from './abstractposition.js';
const { Box } = goog.requireType('goog.math.box');
const { Size } = goog.requireType('goog.math.size');



/**
 * Encapsulates a popup position where the popup absolutely positioned by
 * setting the left/top style elements directly to the specified values.
 * The position is generally relative to the element's offsetParent. Normally,
 * this is the document body, but can be another element if the popup element
 * is scoped by an element with relative position.
 *
 * @param {number|!Coordinate} arg1 Left position or coordinate.
 * @param {number=} opt_arg2 Top position.
 * @constructor
 * @extends {AbstractPosition}
 */
export function AbsolutePosition(arg1, opt_arg2) {
 /**
   * Coordinate to position popup at.
   * @type {Coordinate}
   */
 this.coordinate = arg1 instanceof Coordinate ?
     arg1 :
     new Coordinate( (arg1), opt_arg2);
}
goog.inherits(
    AbsolutePosition, AbstractPosition);


/**
 * Repositions the popup according to the current state.
 *
 * @param {Element} movableElement The DOM element to position.
 * @param {positioning.Corner} movableCorner The corner of the movable
 *     element that should be positioned at the specified position.
 * @param {Box=} opt_margin A margin specified in pixels.
 * @param {Size=} opt_preferredSize Preferred size of the
 *     movableElement.
 * @override
 */
AbsolutePosition.prototype.reposition = function(
    movableElement, movableCorner, opt_margin, opt_preferredSize) {
 positioning.positionAtCoordinate(
     this.coordinate, movableElement, movableCorner, opt_margin, null, null,
     opt_preferredSize);
};
