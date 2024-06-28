/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utility class that monitors viewport size changes.
 *
 * @see ../demos/viewportsizemonitor.html
 */

goog.declareModuleId('goog.dom.viewportsizemonitor');

import { dispose } from '../disposable/dispose.js';
import * as dom from './dom.js';
import * as events from '../events/events.js';
import { EventTarget } from '../events/eventtarget.js';
import { EventType } from '../events/eventtype.js';
import { Size } from '../math/size.js';
const {Event} = goog.requireType('goog.events.event');



/**
 * This class can be used to monitor changes in the viewport size.  Instances
 * dispatch a {@link EventType.RESIZE} event when the viewport size
 * changes.  Handlers can call {@link ViewportSizeMonitor#getSize} to
 * get the new viewport size.
 *
 * Use this class if you want to execute resize/reflow logic each time the
 * user resizes the browser window.  This class is guaranteed to only dispatch
 * `RESIZE` events when the pixel dimensions of the viewport change.
 * (Internet Explorer fires resize events if any element on the page is resized,
 * even if the viewport dimensions are unchanged, which can lead to infinite
 * resize loops.)
 *
 * Example usage:
 *  <pre>
 *    var vsm = new ViewportSizeMonitor();
 *    events.listen(vsm, EventType.RESIZE, function(e) {
 *      alert('Viewport size changed to ' + vsm.getSize());
 *    });
 *  </pre>
 *
 * Manually verified on IE6, IE7, FF2, Opera 11, Safari 4 and Chrome.
 *
 * @param {Window=} opt_window The window to monitor; defaults to the window in
 *    which this code is executing.
 * @constructor
 * @extends {EventTarget}
 */
export function ViewportSizeMonitor(opt_window) {
 ViewportSizeMonitor.base(this, 'constructor');

 /**
  * The window to monitor. Defaults to the window in which the code is running.
  * @private {Window}
  */
 this.window_ = opt_window || window;

 /**
   * Event listener key for window the window resize handler, as returned by
   * {@link events.listen}.
   * @private {events.Key}
   */
 this.listenerKey_ = events.listen(
     this.window_, EventType.RESIZE, this.handleResize_, false,
     this);

 /**
   * The most recently recorded size of the viewport, in pixels.
   * @private {Size}
   */
 this.size_ = dom.getViewportSize(this.window_);
}
goog.inherits(ViewportSizeMonitor, EventTarget);


/**
 * Returns a viewport size monitor for the given window.  A new one is created
 * if it doesn't exist already.  This prevents the unnecessary creation of
 * multiple spooling monitors for a window.
 * @param {Window=} opt_window The window to monitor; defaults to the window in
 *     which this code is executing.
 * @return {!ViewportSizeMonitor} Monitor for the given window.
 */
ViewportSizeMonitor.getInstanceForWindow = function(opt_window) {
 var currentWindow = opt_window || window;
 var uid = goog.getUid(currentWindow);

 return ViewportSizeMonitor.windowInstanceMap_[uid] =
            ViewportSizeMonitor.windowInstanceMap_[uid] ||
     new ViewportSizeMonitor(currentWindow);
};


/**
 * Removes and disposes a viewport size monitor for the given window if one
 * exists.
 * @param {Window=} opt_window The window whose monitor should be removed;
 *     defaults to the window in which this code is executing.
 */
ViewportSizeMonitor.removeInstanceForWindow = function(opt_window) {
 var uid = goog.getUid(opt_window || window);

 dispose(ViewportSizeMonitor.windowInstanceMap_[uid]);
 delete ViewportSizeMonitor.windowInstanceMap_[uid];
};


/**
 * Map of window hash code to viewport size monitor for that window, if
 * created.
 * @type {Object<number,ViewportSizeMonitor>}
 * @private
 */
ViewportSizeMonitor.windowInstanceMap_ = {};


/**
 * Returns the most recently recorded size of the viewport, in pixels.  May
 * return null if no window resize event has been handled yet.
 * @return {Size} The viewport dimensions, in pixels.
 */
ViewportSizeMonitor.prototype.getSize = function() {
 // Return a clone instead of the original to preserve encapsulation.
 return this.size_ ? this.size_.clone() : null;
};


/** @override */
ViewportSizeMonitor.prototype.disposeInternal = function() {
 ViewportSizeMonitor.superClass_.disposeInternal.call(this);

 if (this.listenerKey_) {
   events.unlistenByKey(this.listenerKey_);
   this.listenerKey_ = null;
 }

 this.window_ = null;
 this.size_ = null;
};


/**
 * Handles window resize events by measuring the dimensions of the
 * viewport and dispatching a {@link EventType.RESIZE} event if the
 * current dimensions are different from the previous ones.
 * @param {Event} event The window resize event to handle.
 * @private
 */
ViewportSizeMonitor.prototype.handleResize_ = function(event) {
 var size = dom.getViewportSize(this.window_);
 if (!Size.equals(size, this.size_)) {
   this.size_ = size;
   this.dispatchEvent(EventType.RESIZE);
 }
};
