/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Abstract base class for positioning implementations.
 */

goog.declareModuleId('goog.positioning.abstractposition');

const {Box} = goog.requireType('goog.math.box');
const {Size} = goog.requireType('goog.math.size');
const positioning = goog.requireType('goog.positioning.positioning');



/**
 * Abstract position object. Encapsulates position and overflow handling.
 *
 * @constructor
 */
export function AbstractPosition() {}


/**
 * Repositions the element. Abstract method, should be overloaded.
 *
 * @param {Element} movableElement Element to position.
 * @param {positioning.Corner} corner Corner of the movable element that
 *     should be positioned adjacent to the anchored element.
 * @param {Box=} opt_margin A margin specified in pixels.
 * @param {Size=} opt_preferredSize PreferredSize of the
 *     movableElement.
 */
AbstractPosition.prototype.reposition = function(
    movableElement, corner, opt_margin, opt_preferredSize) {};
