/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Anchored viewport positioning class.
 */

import * as positioning from './positioning.js';

import { Overflow, OverflowStatus } from './positioning.js';
import { AnchoredPosition } from './anchoredposition.js';
const {Box} = goog.requireType('goog.math.box');
const {Size} = goog.requireType('goog.math.size');



/**
 * Encapsulates a popup position where the popup is anchored at a corner of
 * an element. The corners are swapped if dictated by the viewport. For instance
 * if a popup is anchored with its top left corner to the bottom left corner of
 * the anchor the popup is either displayed below the anchor (as specified) or
 * above it if there's not enough room to display it below.
 *
 * When using this positioning object it's recommended that the movable element
 * be absolutely positioned.
 *
 * @param {Element} anchorElement Element the movable element should be
 *     anchored against.
 * @param {positioning.Corner} corner Corner of anchored element the
 *     movable element should be positioned at.
 * @param {boolean=} opt_adjust Whether the positioning should be adjusted until
 *     the element fits inside the viewport even if that means that the anchored
 *     corners are ignored.
 * @param {Box=} opt_overflowConstraint Box object describing the
 *     dimensions in which the movable element could be shown.
 * @constructor
 * @extends {AnchoredPosition}
 */
export function AnchoredViewportPosition(anchorElement, corner, opt_adjust, opt_overflowConstraint) {
 AnchoredPosition.call(this, anchorElement, corner);

 /**
  * The last resort algorithm to use if the algorithm can't fit inside
  * the viewport.
  *
  * IGNORE = do nothing, just display at the preferred position.
  *
  * ADJUST_X | ADJUST_Y = Adjust until the element fits, even if that means
  * that the anchored corners are ignored.
  *
  * @type {number}
  * @private
  */
 this.lastResortOverflow_ = opt_adjust ? (Overflow.ADJUST_X |
                                          Overflow.ADJUST_Y) :
                                         Overflow.IGNORE;

 /**
  * The dimensions in which the movable element could be shown.
  * @type {Box|undefined}
  * @private
  */
 this.overflowConstraint_ = opt_overflowConstraint || undefined;
}
goog.inherits(
    AnchoredViewportPosition,
    AnchoredPosition);


/**
 * @return {Box|undefined} The box object describing the
 *     dimensions in which the movable element will be shown.
 */
AnchoredViewportPosition.prototype.getOverflowConstraint =
    function() {
     return this.overflowConstraint_;
    };


/**
 * @param {Box|undefined} overflowConstraint Box object describing the
 *     dimensions in which the movable element could be shown.
 */
AnchoredViewportPosition.prototype.setOverflowConstraint =
    function(overflowConstraint) {
     this.overflowConstraint_ = overflowConstraint;
    };


/**
 * @return {number} A bitmask for the "last resort" overflow.
 */
AnchoredViewportPosition.prototype.getLastResortOverflow =
    function() {
     return this.lastResortOverflow_;
    };


/**
 * @param {number} lastResortOverflow A bitmask for the "last resort" overflow,
 *     if we fail to fit the element on-screen.
 */
AnchoredViewportPosition.prototype.setLastResortOverflow =
    function(lastResortOverflow) {
     this.lastResortOverflow_ = lastResortOverflow;
    };


/**
 * Repositions the movable element.
 *
 * @param {Element} movableElement Element to position.
 * @param {positioning.Corner} movableCorner Corner of the movable element
 *     that should be positioned adjacent to the anchored element.
 * @param {Box=} opt_margin A margin specified in pixels.
 * @param {Size=} opt_preferredSize The preferred size of the
 *     movableElement.
 * @override
 */
AnchoredViewportPosition.prototype.reposition = function(
    movableElement, movableCorner, opt_margin, opt_preferredSize) {
 var status = positioning.positionAtAnchor(
     this.element, this.corner, movableElement, movableCorner, null,
     opt_margin,
     Overflow.FAIL_X | Overflow.FAIL_Y,
     opt_preferredSize, this.overflowConstraint_);

 // If the desired position is outside the viewport try mirroring the corners
 // horizontally or vertically.
 if (status & OverflowStatus.FAILED) {
   var cornerFallback = this.adjustCorner(status, this.corner);
   var movableCornerFallback = this.adjustCorner(status, movableCorner);

   status = positioning.positionAtAnchor(
       this.element, cornerFallback, movableElement, movableCornerFallback,
       null, opt_margin,
       Overflow.FAIL_X | Overflow.FAIL_Y,
       opt_preferredSize, this.overflowConstraint_);

   if (status & OverflowStatus.FAILED) {
     // If that also fails, pick the best corner from the two tries,
     // and adjust the position until it fits.
     cornerFallback = this.adjustCorner(status, cornerFallback);
     movableCornerFallback = this.adjustCorner(status, movableCornerFallback);

     positioning.positionAtAnchor(
         this.element, cornerFallback, movableElement, movableCornerFallback,
         null, opt_margin, this.getLastResortOverflow(), opt_preferredSize,
         this.overflowConstraint_);
   }
 }
};


/**
 * Adjusts the corner if X or Y positioning failed.
 * @param {number} status The status of the last positionAtAnchor call.
 * @param {positioning.Corner} corner The corner to adjust.
 * @return {positioning.Corner} The adjusted corner.
 * @protected
 */
AnchoredViewportPosition.prototype.adjustCorner = function(
    status, corner) {
 if (status & OverflowStatus.FAILED_HORIZONTAL) {
   corner = positioning.flipCornerHorizontal(corner);
 }

 if (status & OverflowStatus.FAILED_VERTICAL) {
   corner = positioning.flipCornerVertical(corner);
 }

 return corner;
};
