/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utility class that monitors pixel density ratio changes.
 *
 * @see ../demos/pixeldensitymonitor.html
 */

import * as events from '../../events/events.js';

import { EventTarget } from '../../events/eventtarget.js';
const { DomHelper } = goog.requireType('goog.dom.dom');



/**
 * Monitors the window for changes to the ratio between device and screen
 * pixels, e.g. when the user moves the window from a high density screen to a
 * screen with normal density. Dispatches
 * PixelDensityMonitor.EventType.CHANGE events when the density
 * changes between the two predefined values NORMAL and HIGH.
 *
 * This class uses the window.devicePixelRatio value which is supported in
 * WebKit and FF18. If the value does not exist, it will always return a
 * NORMAL density. It requires support for MediaQueryList to detect changes to
 * the devicePixelRatio.
 *
 * @param {!DomHelper=} opt_domHelper The DomHelper which contains the
 *     document associated with the window to listen to. Defaults to the one in
 *     which this code is executing.
 * @constructor
 * @extends {EventTarget}
 * @final
 */
export function PixelDensityMonitor(opt_domHelper) {
 PixelDensityMonitor.base(this, 'constructor');

 /**
  * @type {!Window}
  * @private
  * @const
  */
 this.window_ = opt_domHelper ? opt_domHelper.getWindow() : window;

 /**
    * The last density that was reported so that changes can be detected.
    * @type {!PixelDensityMonitor.Density}
    * @private
    */
 this.lastDensity_ = this.getDensity();

 /**
  * @type {function ()}
  * @private
  * @const
  */
 this.listener_ = goog.bind(this.handleMediaQueryChange_, this);

 /**
  * Remove the internal event listener on mediaQueryList.
  * @type {?function ()}
  * @private
  */
 this.removeListener_ = null;

 /**
  * The media query list for a query that detects high density, if supported
  * by the browser. Because matchMedia returns a new object for every call, it
  * needs to be saved here so the listener can be removed when disposing.
  * @type {?MediaQueryList}
  * @private
  */
 this.mediaQueryList_ = this.window_.matchMedia ?
     this.window_.matchMedia(
         PixelDensityMonitor.HIGH_DENSITY_QUERY_) :
     null;

 /**
  * The Cobalt browser (https://cobalt.dev/) doesn't implement `addListener` or
  * `addEventListener`.
  */
 if (this.mediaQueryList_ &&
     typeof this.mediaQueryList_.addListener !== 'function' &&
     typeof this.mediaQueryList_.addEventListener !== 'function') {
   this.mediaQueryList_ = null;
 }
}
goog.inherits(PixelDensityMonitor, EventTarget);


/**
 * The two different pixel density modes on which the various ratios between
 * physical and device pixels are mapped.
 * @enum {number}
 */
PixelDensityMonitor.Density = {
  /**
   * Mode for older portable devices and desktop screens, defined as having a
   * device pixel ratio of less than 1.5.
   */
  NORMAL: 1,

  /**
   * Mode for newer portable devices with a high resolution screen, defined as
   * having a device pixel ratio of more than 1.5.
   */
  HIGH: 2
};


/**
 * The events fired by the PixelDensityMonitor.
 * @enum {string}
 * @const
 */
PixelDensityMonitor.EventType = {
  /**
   * Dispatched when density changes between NORMAL and HIGH.
   */
  CHANGE: events.getUniqueId('change')
};


/**
 * Minimum ratio between device and screen pixel needed for high density mode.
 * @type {number}
 * @private
 * @const
 */
PixelDensityMonitor.HIGH_DENSITY_RATIO_ = 1.5;


/**
 * Media query that matches for high density.
 * @type {string}
 * @private
 * @const
 */
PixelDensityMonitor.HIGH_DENSITY_QUERY_ =
    '(min-resolution: 1.5dppx), (-webkit-min-device-pixel-ratio: 1.5)';


/**
 * Starts monitoring for changes in pixel density.
 */
PixelDensityMonitor.prototype.start = function() {
 if (this.mediaQueryList_) {
   if (typeof this.mediaQueryList_.addEventListener === 'function') {
     this.mediaQueryList_.addEventListener('change', this.listener_);
     this.removeListener_ = () => {
       this.mediaQueryList_.removeEventListener('change', this.listener_);
     };
   } else {
     this.mediaQueryList_.addListener(this.listener_);
     this.removeListener_ = () => {
       this.mediaQueryList_.removeListener(this.listener_);
     };
   }
 }
};


/**
 * @return {!PixelDensityMonitor.Density} The density for the
 *     window.
 */
PixelDensityMonitor.prototype.getDensity = function() {
 if (this.window_.devicePixelRatio >=
     PixelDensityMonitor.HIGH_DENSITY_RATIO_) {
   return PixelDensityMonitor.Density.HIGH;
 } else {
   return PixelDensityMonitor.Density.NORMAL;
 }
};


/**
 * Handles a change to the media query and checks whether the density has
 * changed since the last call.
 * @private
 */
PixelDensityMonitor.prototype.handleMediaQueryChange_ =
    function() {
     const newDensity = this.getDensity();
     if (this.lastDensity_ != newDensity) {
       this.lastDensity_ = newDensity;
       this.dispatchEvent(PixelDensityMonitor.EventType.CHANGE);
     }
    };


/** @override */
PixelDensityMonitor.prototype.disposeInternal = function() {
 if (this.removeListener_) {
   this.removeListener_();
 }
 PixelDensityMonitor.base(this, 'disposeInternal');
};
