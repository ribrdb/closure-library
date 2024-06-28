/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Client positioning class.
 */

goog.declareModuleId('goog.positioning.anchoredposition');

import * as positioning from './positioning.js';
import { AbstractPosition } from './abstractposition.js';
const {Box} = goog.requireType('goog.math.box');
const {Size} = goog.requireType('goog.math.size');



/**
 * Encapsulates a popup position where the popup is anchored at a corner of
 * an element.
 *
 * When using AnchoredPosition, it is recommended that the popup element
 * specified in the Popup constructor or Popup.setElement be absolutely
 * positioned.
 *
 * @param {Element} anchorElement Element the movable element should be
 *     anchored against.
 * @param {positioning.Corner} corner Corner of anchored element the
 *     movable element should be positioned at.
 * @param {number=} opt_overflow Overflow handling mode. Defaults to IGNORE if
 *     not specified. Bitmap, {@see positioning.Overflow}.
 * @constructor
 * @extends {AbstractPosition}
 */
export function AnchoredPosition(anchorElement, corner, opt_overflow) {
 /**
  * Element the movable element should be anchored against.
  * @type {Element}
  */
 this.element = anchorElement;

 /**
   * Corner of anchored element the movable element should be positioned at.
   * @type {positioning.Corner}
   */
 this.corner = corner;

 /**
   * Overflow handling mode. Defaults to IGNORE if not specified.
   * Bitmap, {@see positioning.Overflow}.
   * @type {number|undefined}
   * @private
   */
 this.overflow_ = opt_overflow;
}
goog.inherits(
    AnchoredPosition, AbstractPosition);


/**
 * Repositions the movable element.
 *
 * @param {Element} movableElement Element to position.
 * @param {positioning.Corner} movableCorner Corner of the movable element
 *     that should be positioned adjacent to the anchored element.
 * @param {Box=} opt_margin A margin specifin pixels.
 * @param {Size=} opt_preferredSize PreferredSize of the
 *     movableElement (unused in this class).
 * @override
 */
AnchoredPosition.prototype.reposition = function(
    movableElement, movableCorner, opt_margin, opt_preferredSize) {
 positioning.positionAtAnchor(
     this.element, this.corner, movableElement, movableCorner, undefined,
     opt_margin, this.overflow_);
};
