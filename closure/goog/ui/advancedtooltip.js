/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Advanced tooltip widget implementation.
 *
 * @see ../demos/advancedtooltip.html
 */

import * as events from '../events/events.js';

import { EventType } from '../events/eventtype.js';
import { Box } from '../math/box.js';
import { Coordinate } from '../math/coordinate.js';
import * as style from '../style/style.js';
import { Tooltip } from './tooltip.js';
import * as userAgent from '../useragent/useragent.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { BrowserEvent } = goog.requireType('goog.events.browserevent');



/**
 * Advanced tooltip widget with cursor tracking abilities. Works like a regular
 * tooltip but can track the cursor position and direction to determine if the
 * tooltip should be dismissed or remain open.
 *
 * @param {Element|string=} opt_el Element to display tooltip for, either
 *     element reference or string id.
 * @param {?string=} opt_str Text message to display in tooltip.
 * @param {DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {Tooltip}
 */
export function AdvancedTooltip(opt_el, opt_str, opt_domHelper) {
  Tooltip.call(this, opt_el, opt_str, opt_domHelper);
}
goog.inherits(AdvancedTooltip, Tooltip);


/**
 * Whether to track the cursor and thereby close the tooltip if it moves away
 * from the tooltip and keep it open if it moves towards it.
 *
 * @type {boolean}
 * @private
 */
AdvancedTooltip.prototype.cursorTracking_ = false;


/**
 * Delay in milliseconds before tooltips are hidden if cursor tracking is
 * enabled and the cursor is moving away from the tooltip.
 *
 * @type {number}
 * @private
 */
AdvancedTooltip.prototype.cursorTrackingHideDelayMs_ = 100;


/**
 * Box object representing a margin around the tooltip where the cursor is
 * allowed without dismissing the tooltip.
 *
 * @type {Box}
 * @private
 */
AdvancedTooltip.prototype.hotSpotPadding_;


/**
 * Bounding box.
 *
 * @type {Box}
 * @private
 */
AdvancedTooltip.prototype.boundingBox_;


/**
 * Anchor bounding box.
 *
 * @type {Box}
 * @private
 */
AdvancedTooltip.prototype.anchorBox_;


/**
 * Whether the cursor tracking is active.
 *
 * @type {boolean}
 * @private
 */
AdvancedTooltip.prototype.tracking_ = false;


/**
 * Sets margin around the tooltip where the cursor is allowed without dismissing
 * the tooltip.
 *
 * @param {Box=} opt_box The margin around the tooltip.
 */
AdvancedTooltip.prototype.setHotSpotPadding = function(opt_box) {
  this.hotSpotPadding_ = opt_box || null;
};


/**
 * @return {Box} box The margin around the tooltip where the cursor is
 *     allowed without dismissing the tooltip.
 */
AdvancedTooltip.prototype.getHotSpotPadding = function() {
  return this.hotSpotPadding_;
};


/**
 * Sets whether to track the cursor and thereby close the tooltip if it moves
 * away from the tooltip and keep it open if it moves towards it.
 *
 * @param {boolean} b Whether to track the cursor.
 */
AdvancedTooltip.prototype.setCursorTracking = function(b) {
  this.cursorTracking_ = b;
};


/**
 * @return {boolean} Whether to track the cursor and thereby close the tooltip
 *     if it moves away from the tooltip and keep it open if it moves towards
 *     it.
 */
AdvancedTooltip.prototype.getCursorTracking = function() {
  return this.cursorTracking_;
};


/**
 * Sets delay in milliseconds before tooltips are hidden if cursor tracking is
 * enabled and the cursor is moving away from the tooltip.
 *
 * @param {number} delay The delay in milliseconds.
 */
AdvancedTooltip.prototype.setCursorTrackingHideDelayMs = function(
    delay) {
  this.cursorTrackingHideDelayMs_ = delay;
};


/**
 * @return {number} The delay in milliseconds before tooltips are hidden if
 *     cursor tracking is enabled and the cursor is moving away from the
 *     tooltip.
 */
AdvancedTooltip.prototype.getCursorTrackingHideDelayMs = function() {
  return this.cursorTrackingHideDelayMs_;
};


/**
 * Called after the popup is shown.
 * @protected
 * @override
 */
AdvancedTooltip.prototype.onShow = function() {
  AdvancedTooltip.superClass_.onShow.call(this);

  this.boundingBox_ = style.getBounds(this.getElement()).toBox();
  if (this.anchor) {
    this.anchorBox_ = style.getBounds(this.anchor).toBox();
  }

  this.tracking_ = this.cursorTracking_;
  events.listen(
      this.getDomHelper().getDocument(), EventType.MOUSEMOVE,
      this.handleMouseMove, false, this);
};


/**
 * Called after the popup is hidden.
 * @protected
 * @override
 */
AdvancedTooltip.prototype.onHide = function() {
  events.unlisten(
      this.getDomHelper().getDocument(), EventType.MOUSEMOVE,
      this.handleMouseMove, false, this);

  this.boundingBox_ = null;
  this.anchorBox_ = null;
  this.tracking_ = false;

  AdvancedTooltip.superClass_.onHide.call(this);
};


/**
 * Returns true if the mouse is in the tooltip.
 * @return {boolean} True if the mouse is in the tooltip.
 */
AdvancedTooltip.prototype.isMouseInTooltip = function() {
  return this.isCoordinateInTooltip(this.cursorPosition);
};


/**
 * Checks whether the supplied coordinate is inside the tooltip, including
 * padding if any.
 * @param {Coordinate} coord Coordinate being tested.
 * @return {boolean} Whether the coord is in the tooltip.
 * @override
 */
AdvancedTooltip.prototype.isCoordinateInTooltip = function(coord) {
  // Check if coord is inside the bounding box of the tooltip
  if (this.hotSpotPadding_) {
    var offset = style.getPageOffset(this.getElement());
    var size = style.getSize(this.getElement());
    return offset.x - this.hotSpotPadding_.left <= coord.x &&
        coord.x <= offset.x + size.width + this.hotSpotPadding_.right &&
        offset.y - this.hotSpotPadding_.top <= coord.y &&
        coord.y <= offset.y + size.height + this.hotSpotPadding_.bottom;
  }

  return AdvancedTooltip.superClass_.isCoordinateInTooltip.call(
      this, coord);
};


/**
 * Checks if supplied coordinate is in the tooltip, its triggering anchor, or
 * a tooltip that has been triggered by a child of this tooltip.
 * Called from handleMouseMove to determine if hide timer should be started,
 * and from maybeHide to determine if tooltip should be hidden.
 * @param {Coordinate} coord Coordinate being tested.
 * @return {boolean} Whether coordinate is in the anchor, the tooltip, or any
 *     tooltip whose anchor is a child of this tooltip.
 * @private
 */
AdvancedTooltip.prototype.isCoordinateActive_ = function(coord) {
  if ((this.anchorBox_ && this.anchorBox_.contains(coord)) ||
      this.isCoordinateInTooltip(coord)) {
    return true;
  }

  // Check if mouse might be in active child element.
  var childTooltip = this.getChildTooltip();
  return !!childTooltip && childTooltip.isCoordinateInTooltip(coord);
};


/**
 * Called by timer from mouse out handler. Hides tooltip if cursor is still
 * outside element and tooltip.
 * @param {?Element|undefined} el Anchor when hide timer was started.
 * @override
 */
AdvancedTooltip.prototype.maybeHide = function(el) {
  this.hideTimer = undefined;
  if (el == this.anchor) {
    // Check if cursor is inside the bounding box of the tooltip or the element
    // that triggered it, or if tooltip is active (possibly due to receiving
    // the focus), or if there is a nested tooltip being shown.
    if (!this.isCoordinateActive_(this.cursorPosition) &&
        !this.getActiveElement() && !this.hasActiveChild()) {
      // Under certain circumstances gecko fires ghost mouse events with the
      // coordinates 0, 0 regardless of the cursors position.
      if (userAgent.GECKO && this.cursorPosition.x == 0 &&
          this.cursorPosition.y == 0) {
        return;
      }
      this.setVisible(false);
    }
  }
};


/**
 * Handler for mouse move events.
 *
 * @param {BrowserEvent} event Event object.
 * @protected
 * @override
 */
AdvancedTooltip.prototype.handleMouseMove = function(event) {
  var startTimer = this.isVisible();
  if (this.boundingBox_) {
    var scroll = this.getDomHelper().getDocumentScroll();
    var c = new Coordinate(
        event.clientX + scroll.x, event.clientY + scroll.y);
    if (this.isCoordinateActive_(c)) {
      startTimer = false;
    } else if (this.tracking_) {
      var prevDist =
          Box.distance(this.boundingBox_, this.cursorPosition);
      var currDist = Box.distance(this.boundingBox_, c);
      startTimer = currDist >= prevDist;
    }
  }

  if (startTimer) {
    this.startHideTimer();

    // Even though the mouse coordinate is not on the tooltip (or nested child),
    // they may have an active element because of a focus event.  Don't let
    // that prevent us from taking down the tooltip(s) on this mouse move.
    this.setActiveElement(null);
    var childTooltip = this.getChildTooltip();
    if (childTooltip) {
      childTooltip.setActiveElement(null);
    }
  } else if (this.getState() == Tooltip.State.WAITING_TO_HIDE) {
    this.clearHideTimer();
  }

  AdvancedTooltip.superClass_.handleMouseMove.call(this, event);
};


/**
 * Handler for mouse over events for the tooltip element.
 *
 * @param {BrowserEvent} event Event object.
 * @protected
 * @override
 */
AdvancedTooltip.prototype.handleTooltipMouseOver = function(event) {
  if (this.getActiveElement() != this.getElement()) {
    this.tracking_ = false;
    this.setActiveElement(this.getElement());
  }
};


/**
 * Override hide delay with cursor tracking hide delay while tracking.
 * @return {number} Hide delay to use.
 * @override
 */
AdvancedTooltip.prototype.getHideDelayMs = function() {
  return this.tracking_ ? this.cursorTrackingHideDelayMs_ :
                          AdvancedTooltip.base(this, 'getHideDelayMs');
};


/**
 * Forces the recalculation of the hotspot on the next mouse over event.
 * @deprecated Not ever necessary to call this function. Hot spot is calculated
 *     as necessary.
 */
AdvancedTooltip.prototype.resetHotSpot = function() {};
