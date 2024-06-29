/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview This event wrapper will dispatch an event when the user uses
 * the wheel on an element. The event provides details of the unit type (pixel /
 * line / page) and deltas in those units in up to 3 dimensions. Additionally,
 * simplified pixel deltas are provided for code that doesn't need to handle the
 * different units differently. This is not to be confused with the scroll
 * event, where an element in the dom can report that it was scrolled.
 *
 * This class aims to smooth out inconsistencies between browser platforms with
 * regards to wheel events, but we do not cover every possible software/hardware
 * combination out there, some of which occasionally produce very large deltas
 * in wheel events, especially when the device supports acceleration.
 *
 * Relevant standard:
 * http://www.w3.org/TR/2014/WD-DOM-Level-3-Events-20140925/#interface-WheelEvent
 *
 * Clients of this code should be aware that some input devices only fire a few
 * discrete events (such as a mouse wheel without acceleration) whereas some can
 * generate a large number of events for a single interaction (such as a
 * touchpad with acceleration). There is no signal in the events to reliably
 * distinguish between these.
 *
 * @see ../demos/wheelhandler.html
 */

import * as dom from '../dom/dom.js';

import * as events from './events.js';
import { EventTarget } from './eventtarget.js';
import { WheelEvent } from './wheelevent.js';
import * as style from '../style/style.js';
import * as userAgent from '../useragent/useragent.js';
import * as product from '../useragent/product.js';
const { BrowserEvent } = goog.requireType('goog.events.browserevent');



/**
 * This event handler allows you to catch wheel events in a consistent manner.
 * @param {!Element|!Document} element The element to listen to the wheel event
 *     on.
 * @param {boolean=} opt_capture Whether to handle the wheel event in capture
 *     phase.
 * @constructor
 * @extends {EventTarget}
 */
export function WheelHandler(element, opt_capture) {
  WheelHandler.base(this, 'constructor');

  /**
   * This is the element that we will listen to the real wheel events on.
   * @private {!Element|!Document}
   */
  this.element_ = element;

  var rtlElement = dom.isElement(this.element_) ?
      /** @type {!Element} */ (this.element_) :
                              /** @type {!Document} */ (this.element_).body;

  /**
   * True if the element exists and is RTL, false otherwise.
   * @private {boolean}
   */
  this.isRtl_ = !!rtlElement && style.isRightToLeft(rtlElement);

  /**
     * The key returned from the events.listen.
     * @private {events.Key}
     */
  this.listenKey_ = events.listen(
      this.element_, WheelHandler.getDomEventType(), this,
      opt_capture);
}
goog.inherits(WheelHandler, EventTarget);


/**
 * Returns the dom event type.
 * @return {string} The dom event type.
 */
WheelHandler.getDomEventType = function() {
  // Prefer to use wheel events whenever supported.
  if (userAgent.GECKO || userAgent.IE ||
      product.CHROME) {
    return 'wheel';
  }

  // Legacy events. Still the best we have on Opera and Safari.
  return userAgent.GECKO ? 'DOMMouseScroll' : 'mousewheel';
};


/**
 * Handles the events on the element.
 * @param {!BrowserEvent} e The underlying browser event.
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
WheelHandler.prototype.handleEvent = function(e) {
  var deltaMode = WheelEvent.DeltaMode.PIXEL;
  var deltaX = 0;
  var deltaY = 0;
  var deltaZ = 0;
  var be = e.getBrowserEvent();
  if (be.type == 'wheel') {
    deltaMode = be.deltaMode;
    deltaX = be.deltaX;
    deltaY = be.deltaY;
    deltaZ = be.deltaZ;
  } else if (be.type == 'mousewheel') {
    // Assume that these are still comparable to pixels. This may not be true
    // for all old browsers.
    if (be.wheelDeltaX !== undefined) {
      deltaX = -be.wheelDeltaX;
      deltaY = -be.wheelDeltaY;
    } else {
      deltaY = -be.wheelDelta;
    }
  } else {  // Historical Gecko
    // Gecko returns multiple of 3 (representing the number of lines)
    deltaMode = WheelEvent.DeltaMode.LINE;
    // Firefox 3.1 adds an axis field to the event to indicate axis.
    if (be.axis !== undefined && be.axis === be.HORIZONTAL_AXIS) {
      deltaX = be.detail;
    } else {
      deltaY = be.detail;
    }
  }
  // For horizontal deltas we need to flip the value for RTL grids.
  if (this.isRtl_) {
    deltaX = -deltaX;
  }
  var newEvent =
      new WheelEvent(be, deltaMode, deltaX, deltaY, deltaZ);
  this.dispatchEvent(newEvent);
};


/** @override */
WheelHandler.prototype.disposeInternal = function() {
  WheelHandler.superClass_.disposeInternal.call(this);
  events.unlistenByKey(this.listenKey_);
  this.listenKey_ = null;
};
