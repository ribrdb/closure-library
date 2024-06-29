/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Client viewport positioning class.
 */

import * as dom from '../dom/dom.js';

import { Coordinate } from '../math/coordinate.js';
import * as positioning from './positioning.js';
import { Overflow, OverflowStatus } from './positioning.js';
import { ClientPosition } from './clientposition.js';
import * as style from '../style/style.js';
const { Box } = goog.requireType('goog.math.box');
const { Size } = goog.requireType('goog.math.size');



/**
 * Encapsulates a popup position where the popup is positioned relative to the
 * window (client) coordinates, and made to stay within the viewport.
 *
 * @param {number|Coordinate} arg1 Left position or coordinate.
 * @param {number=} opt_arg2 Top position if arg1 is a number representing the
 *     left position, ignored otherwise.
 * @constructor
 * @extends {ClientPosition}
 */
export function ViewportClientPosition(arg1, opt_arg2) {
    ClientPosition.call(this, arg1, opt_arg2);
}
goog.inherits(
    ViewportClientPosition, ClientPosition);


/**
 * The last-resort overflow strategy, if the popup fails to fit.
 * @type {number}
 * @private
 */
ViewportClientPosition.prototype.lastResortOverflow_ = 0;


/**
 * Set the last-resort overflow strategy, if the popup fails to fit.
 * @param {number} overflow A bitmask of Overflow strategies.
 */
ViewportClientPosition.prototype.setLastResortOverflow =
    function(overflow) {
        this.lastResortOverflow_ = overflow;
    };


/**
 * Repositions the popup according to the current state.
 *
 * @param {Element} element The DOM element of the popup.
 * @param {positioning.Corner} popupCorner The corner of the popup
 *     element that that should be positioned adjacent to the anchorElement.
 *     One of the positioning.Corner constants.
 * @param {Box=} opt_margin A margin specified in pixels.
 * @param {Size=} opt_preferredSize Preferred size fo the element.
 * @override
 */
ViewportClientPosition.prototype.reposition = function(
    element, popupCorner, opt_margin, opt_preferredSize) {
    var viewportElt = style.getClientViewportElement(element);
    var viewport = style.getVisibleRectForElement(viewportElt);
    var scrollEl = dom.getDomHelper(element).getDocumentScrollElement();
    var clientPos = new Coordinate(
        this.coordinate.x + scrollEl.scrollLeft,
        this.coordinate.y + scrollEl.scrollTop);

    var failXY =
        Overflow.FAIL_X | Overflow.FAIL_Y;
    var corner = popupCorner;

    // Try the requested position.
    var status = positioning.positionAtCoordinate(
        clientPos, element, corner, opt_margin, viewport, failXY,
        opt_preferredSize);
    if ((status & OverflowStatus.FAILED) == 0) {
      return;
    }

    // Outside left or right edge of viewport, try try to flip it horizontally.
    if (status & OverflowStatus.FAILED_LEFT ||
        status & OverflowStatus.FAILED_RIGHT) {
      corner = positioning.flipCornerHorizontal(corner);
    }

    // Outside top or bottom edge of viewport, try try to flip it vertically.
    if (status & OverflowStatus.FAILED_TOP ||
        status & OverflowStatus.FAILED_BOTTOM) {
      corner = positioning.flipCornerVertical(corner);
    }

    // Try flipped position.
    status = positioning.positionAtCoordinate(
        clientPos, element, corner, opt_margin, viewport, failXY,
        opt_preferredSize);
    if ((status & OverflowStatus.FAILED) == 0) {
      return;
    }

    // If that failed, the viewport is simply too small to contain the popup.
    // Revert to the original position.
    positioning.positionAtCoordinate(
        clientPos, element, popupCorner, opt_margin, viewport,
        this.lastResortOverflow_, opt_preferredSize);
};
