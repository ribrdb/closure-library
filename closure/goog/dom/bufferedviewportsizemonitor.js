/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A viewport size monitor that buffers RESIZE events until the
 * window size has stopped changing, within a specified period of time.  For
 * every RESIZE event dispatched, this will dispatch up to two *additional*
 * events:
 * - {@link #EventType.RESIZE_WIDTH} if the viewport's width has changed since
 *   the last buffered dispatch.
 * - {@link #EventType.RESIZE_HEIGHT} if the viewport's height has changed since
 *   the last buffered dispatch.
 * You likely only need to listen to one of the three events.  But if you need
 * more, just be cautious of duplicating effort.
 */

import * as asserts from '../asserts/asserts.js';

import { Delay } from '../async/delay.js';
import * as events from '../events/events.js';
import { EventTarget } from '../events/eventtarget.js';
import { EventType } from '../events/eventtype.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { ViewportSizeMonitor } = goog.requireType('goog.dom.viewportsizemonitor');
const {Size} = goog.requireType('goog.math.size');



/**
 * Creates a new BufferedViewportSizeMonitor.
 * @param {!ViewportSizeMonitor} viewportSizeMonitor The
 *     underlying viewport size monitor.
 * @param {number=} opt_bufferMs The buffer time, in ms. If not specified, this
 *     value defaults to {@link #RESIZE_EVENT_DELAY_MS_}.
 * @constructor
 * @extends {EventTarget}
 * @final
 */
export function BufferedViewportSizeMonitor(viewportSizeMonitor, opt_bufferMs) {
 BufferedViewportSizeMonitor.base(this, 'constructor');

 /**
   * Delay for the resize event.
   * @private {Delay}
   */
 this.resizeDelay_;

 /**
  * The underlying viewport size monitor.
  * @type {ViewportSizeMonitor}
  * @private
  */
 this.viewportSizeMonitor_ = viewportSizeMonitor;

 /**
  * The current size of the viewport.
  * @type {Size}
  * @private
  */
 this.currentSize_ = this.viewportSizeMonitor_.getSize();

 /**
  * The resize buffer time in ms.
  * @type {number}
  * @private
  */
 this.resizeBufferMs_ = opt_bufferMs ||
     BufferedViewportSizeMonitor.RESIZE_EVENT_DELAY_MS_;

 /**
   * Listener key for the viewport size monitor.
   * @type {events.Key}
   * @private
   */
 this.listenerKey_ = events.listen(
     viewportSizeMonitor, EventType.RESIZE, this.handleResize_,
     false, this);
}
goog.inherits(BufferedViewportSizeMonitor, EventTarget);


/**
 * Additional events to dispatch.
 * @enum {string}
 */
BufferedViewportSizeMonitor.EventType = {
  RESIZE_HEIGHT: events.getUniqueId('resizeheight'),
  RESIZE_WIDTH: events.getUniqueId('resizewidth')
};


/**
 * Default number of milliseconds to wait after a resize event to relayout the
 * page.
 * @type {number}
 * @const
 * @private
 */
BufferedViewportSizeMonitor.RESIZE_EVENT_DELAY_MS_ = 100;


/** @override */
BufferedViewportSizeMonitor.prototype.disposeInternal = function() {
 events.unlistenByKey(this.listenerKey_);
 BufferedViewportSizeMonitor.base(this, 'disposeInternal');
};


/**
 * Handles resize events on the underlying ViewportMonitor.
 * @private
 */
BufferedViewportSizeMonitor.prototype.handleResize_ = function() {
 // Lazily create when needed.
 if (!this.resizeDelay_) {
   this.resizeDelay_ =
       new Delay(this.onWindowResize_, this.resizeBufferMs_, this);
   this.registerDisposable(this.resizeDelay_);
 }
 this.resizeDelay_.start();
};


/**
 * Window resize callback that determines whether to reflow the view contents.
 * @private
 */
BufferedViewportSizeMonitor.prototype.onWindowResize_ = function() {
 if (this.viewportSizeMonitor_.isDisposed()) {
   return;
 }

 var previousSize = this.currentSize_;
 var currentSize = this.viewportSizeMonitor_.getSize();

 asserts.assert(currentSize, 'Viewport size should be set at this point');

 this.currentSize_ = currentSize;

 if (previousSize) {
   var resized = false;

   // Width has changed
   if (previousSize.width != currentSize.width) {
     this.dispatchEvent(
         BufferedViewportSizeMonitor.EventType.RESIZE_WIDTH);
     resized = true;
   }

   // Height has changed
   if (previousSize.height != currentSize.height) {
     this.dispatchEvent(
         BufferedViewportSizeMonitor.EventType.RESIZE_HEIGHT);
     resized = true;
   }

   // If either has changed, this is a resize event.
   if (resized) {
     this.dispatchEvent(EventType.RESIZE);
   }

 } else {
   // If we didn't have a previous size, we consider all events to have
   // changed.
   this.dispatchEvent(
       BufferedViewportSizeMonitor.EventType.RESIZE_HEIGHT);
   this.dispatchEvent(
       BufferedViewportSizeMonitor.EventType.RESIZE_WIDTH);
   this.dispatchEvent(EventType.RESIZE);
 }
};


/**
 * Returns the current size of the viewport.
 * @return {Size?} The current viewport size.
 */
BufferedViewportSizeMonitor.prototype.getSize = function() {
 return this.currentSize_ ? this.currentSize_.clone() : null;
};
