/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Client positioning class.
 */

import * as asserts from '../asserts/asserts.js';

import * as dom from '../dom/dom.js';
import { Coordinate } from '../math/coordinate.js';
import * as positioning from './positioning.js';
import { AbstractPosition } from './abstractposition.js';
import * as style from '../style/style.js';
const { Box } = goog.requireType('goog.math.box');
const { Size } = goog.requireType('goog.math.size');



/**
 * Encapsulates a popup position where the popup is positioned relative to the
 * window (client) coordinates. This calculates the correct position to
 * use even if the element is relatively positioned to some other element. This
 * is for trying to position an element at the spot of the mouse cursor in
 * a MOUSEMOVE event. Just use the event.clientX and event.clientY as the
 * parameters.
 *
 * @param {number|Coordinate} arg1 Left position or coordinate.
 * @param {number=} opt_arg2 Top position.
 * @constructor
 * @extends {AbstractPosition}
 */
export function ClientPosition(arg1, opt_arg2) {
 /**
   * Coordinate to position popup at.
   * @type {!Coordinate}
   */
 this.coordinate = arg1 instanceof Coordinate ?
     arg1 :
     new Coordinate(/** @type {number} */ (arg1), opt_arg2);
}
goog.inherits(
    ClientPosition, AbstractPosition);


/**
 * Repositions the popup according to the current state
 *
 * @param {Element} movableElement The DOM element of the popup.
 * @param {positioning.Corner} movableElementCorner The corner of
 *     the popup element that that should be positioned adjacent to
 *     the anchorElement.  One of the positioning.Corner
 *     constants.
 * @param {Box=} opt_margin A margin specified in pixels.
 * @param {Size=} opt_preferredSize Preferred size of the element.
 * @override
 */
ClientPosition.prototype.reposition = function(
    movableElement, movableElementCorner, opt_margin, opt_preferredSize) {
 asserts.assert(movableElement);

 // Translates the coordinate to be relative to the page.
 var viewportOffset = style.getViewportPageOffset(
     dom.getOwnerDocument(movableElement));
 var x = this.coordinate.x + viewportOffset.x;
 var y = this.coordinate.y + viewportOffset.y;

 // Translates the coordinate to be relative to the offset parent.
 var movableParentTopLeft =
     positioning.getOffsetParentPageOffset(movableElement);
 x -= movableParentTopLeft.x;
 y -= movableParentTopLeft.y;

 positioning.positionAtCoordinate(
     new Coordinate(x, y), movableElement, movableElementCorner,
     opt_margin, null, null, opt_preferredSize);
};
