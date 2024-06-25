/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Definition of the Popup class.
 *
 * @see ../demos/popup.html
 */

import { Box } from '../math/box.js';

import { AbstractPosition } from '../positioning/abstractposition.js';
import { Corner } from '../positioning/positioning.js';
import * as style from '../style/style.js';
import { PopupBase } from './popupbase.js';



/**
 * The Popup class provides functionality for displaying an absolutely
 * positioned element at a particular location in the window. It's designed to
 * be used as the foundation for building controls like a menu or tooltip. The
 * Popup class includes functionality for displaying a Popup near adjacent to
 * an anchor element.
 *
 * This works cross browser and thus does not use IE's createPopup feature
 * which supports extending outside the edge of the brower window.
 *
 * @param {Element=} opt_element A DOM element for the popup.
 * @param {AbstractPosition=} opt_position A positioning helper
 *     object.
 * @constructor
 * @extends {PopupBase}
 */
export function Popup(opt_element, opt_position) {
  /**
     * Corner of the popup to used in the positioning algorithm.
     *
     * @type {Corner}
     * @private
     */
  this.popupCorner_ = Corner.TOP_START;

  /**
     * Positioning helper object.
     *
     * @private {AbstractPosition|undefined}
     */
  this.position_ = opt_position || undefined;
  PopupBase.call(this, opt_element);
}
goog.inherits(Popup, PopupBase);


/**
 * Margin for the popup used in positioning algorithms.
 *
 * @type {Box|undefined}
 * @private
 */
Popup.prototype.margin_;


/**
 * Returns the corner of the popup to used in the positioning algorithm.
 *
 * @return {Corner} The popup corner used for positioning.
 */
Popup.prototype.getPinnedCorner = function() {
  return this.popupCorner_;
};


/**
 * Sets the corner of the popup to used in the positioning algorithm.
 *
 * @param {Corner} corner The popup corner used for
 *     positioning.
 */
Popup.prototype.setPinnedCorner = function(corner) {
  this.popupCorner_ = corner;
  if (this.isVisible()) {
    this.reposition();
  }
};


/**
 * @return {AbstractPosition} The position helper object
 *     associated with the popup.
 */
Popup.prototype.getPosition = function() {
  return this.position_ || null;
};


/**
 * Sets the position helper object associated with the popup.
 *
 * @param {AbstractPosition} position A position helper object.
 */
Popup.prototype.setPosition = function(position) {
  this.position_ = position || undefined;
  if (this.isVisible()) {
    this.reposition();
  }
};


/**
 * Returns the margin to place around the popup.
 *
 * @return {Box?} The margin.
 */
Popup.prototype.getMargin = function() {
  return this.margin_ || null;
};


/**
 * Sets the margin to place around the popup.
 *
 * @param {Box|number|null} arg1 Top value or Box.
 * @param {number=} opt_arg2 Right value.
 * @param {number=} opt_arg3 Bottom value.
 * @param {number=} opt_arg4 Left value.
 */
Popup.prototype.setMargin = function(
    arg1, opt_arg2, opt_arg3, opt_arg4) {
  if (arg1 == null || arg1 instanceof Box) {
    this.margin_ = arg1;
  } else {
    this.margin_ = new Box(
        arg1,
        /** @type {number} */ (opt_arg2),
        /** @type {number} */ (opt_arg3),
        /** @type {number} */ (opt_arg4));
  }
  if (this.isVisible()) {
    this.reposition();
  }
};


/**
 * Repositions the popup according to the current state.
 * @override
 */
Popup.prototype.reposition = function() {
  if (!this.position_) {
    return;
  }

  var hideForPositioning = !this.isVisible() &&
      this.getType() != PopupBase.Type.MOVE_OFFSCREEN;
  var el = this.getElement();
  if (hideForPositioning) {
    el.style.visibility = 'hidden';
    style.setElementShown(el, true);
  }

  this.position_.reposition(el, this.popupCorner_, this.margin_);

  if (hideForPositioning) {
    // NOTE(eae): The visibility property is reset to 'visible' by the show_
    // method in PopupBase. Resetting it here causes flickering in some
    // situations, even if set to visible after the display property has been
    // set to none by the call below.
    style.setElementShown(el, false);
  }
};
