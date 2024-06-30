/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Client positioning class.
 */

import { Coordinate } from '../math/coordinate.js';

import * as positioning from './positioning.js';
import { Corner } from './positioning.js';
import { AbstractPosition } from './abstractposition.js';
import * as style from '../style/style.js';
const { Box } = goog.requireType('goog.math.box');
const { Size } = goog.requireType('goog.math.size');



/**
 * Encapsulates a popup position where the popup is positioned according to
 * coordinates relative to the  element's viewport (page). This calculates the
 * correct position to use even if the element is relatively positioned to some
 * other element.
 *
 * @param {number|Coordinate} arg1 Left position or coordinate.
 * @param {number=} opt_arg2 Top position.
 * @constructor
 * @extends {AbstractPosition}
 */
export function ViewportPosition(arg1, opt_arg2) {
 this.coordinate = arg1 instanceof Coordinate ?
     arg1 :
     new Coordinate(/** @type {number} */ (arg1), opt_arg2);
}
goog.inherits(
    ViewportPosition, AbstractPosition);


/**
 * Repositions the popup according to the current state
 *
 * @param {Element} element The DOM element of the popup.
 * @param {Corner} popupCorner The corner of the popup
 *     element that that should be positioned adjacent to the anchorElement.
 * @param {Box=} opt_margin A margin specified in pixels.
 * @param {Size=} opt_preferredSize Preferred size of the element.
 * @override
 */
ViewportPosition.prototype.reposition = function(
    element, popupCorner, opt_margin, opt_preferredSize) {
 positioning.positionAtAnchor(
     style.getClientViewportElement(element),
     Corner.TOP_LEFT, element, popupCorner, this.coordinate,
     opt_margin, null, opt_preferredSize);
};
