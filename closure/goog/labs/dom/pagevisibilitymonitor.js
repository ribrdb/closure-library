/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview This event monitor wraps the Page Visibility API.
 * @see http://www.w3.org/TR/page-visibility/
 */

import * as dom from '../../dom/dom.js';

import * as vendor from '../../dom/vendor.js';
import * as events from '../../events/events.js';
import { EventTarget } from '../../events/eventtarget.js';
import { EventType } from '../../events/eventtype.js';
import PageVisibilityEvent from './pagevisibilityevent.js';
import PageVisibilityState from './pagevisibilitystate.js';
import { memoize } from '../../memoize/memoize.js';
const { BrowserEvent } = goog.requireType('goog.events.browserevent');

/**
 * This event handler allows you to catch page visibility change events.
 * @param {!dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {EventTarget}
 * @final
 */
export function PageVisibilityMonitor(opt_domHelper) {
 PageVisibilityMonitor.base(this, 'constructor');

 /**
   * @private {!dom.DomHelper}
   */
 this.domHelper_ = opt_domHelper || dom.getDomHelper();

 /**
  * @private {?string}
  */
 this.eventType_ = this.getBrowserEventType_();

 // Some browsers do not support visibilityChange and therefore we don't bother
 // setting up events.
 if (this.eventType_) {
   /**
       * @private {events.Key}
       */
   this.eventKey_ = events.listen(
       this.domHelper_.getDocument(), this.eventType_,
       goog.bind(this.handleChange_, this));
 }
}
goog.inherits(PageVisibilityMonitor, EventTarget);


/**
 * @return {?string} The visibility change event type, or null if not supported.
 *     Memoized for performance.
 * @private
 */
PageVisibilityMonitor.prototype
    .getBrowserEventType_ = memoize(function() {
 var isSupported =
     /** @type {!PageVisibilityMonitor} */ (this).isSupported();
 var isPrefixed =
     /** @type {!PageVisibilityMonitor} */ (this).isPrefixed_();

 if (isSupported) {
   return isPrefixed ?
       vendor.getPrefixedEventType(
           EventType.VISIBILITYCHANGE) :
       EventType.VISIBILITYCHANGE;
 } else {
   return null;
 }
});


/**
 * @return {?string} The browser-specific document.hidden property.  Memoized
 *     for performance.
 * @private
 */
PageVisibilityMonitor.prototype.getHiddenPropertyName_ =
    memoize(function() {
     return vendor.getPrefixedPropertyName(
         'hidden',
         /** @type {!PageVisibilityMonitor} */
         (this).domHelper_.getDocument());
    });


/**
 * @return {boolean} Whether the visibility API is prefixed.
 * @private
 */
PageVisibilityMonitor.prototype.isPrefixed_ = function() {
 return this.getHiddenPropertyName_() != 'hidden';
};


/**
 * @return {?string} The browser-specific document.visibilityState property.
 *     Memoized for performance.
 * @private
 */
PageVisibilityMonitor.prototype.getVisibilityStatePropertyName_ =
    memoize(function() {
     return vendor.getPrefixedPropertyName(
         'visibilityState',
         /** @type {!PageVisibilityMonitor} */
         (this).domHelper_.getDocument());
    });


/**
 * @return {boolean} Whether the visibility API is supported.
 */
PageVisibilityMonitor.prototype.isSupported = function() {
 return !!this.getHiddenPropertyName_();
};


/**
 * @return {boolean} Whether the page is visible.
 */
PageVisibilityMonitor.prototype.isHidden = function() {
 return !!this.domHelper_.getDocument()[this.getHiddenPropertyName_()];
};


/**
 * @return {?PageVisibilityState} The page visibility state, or
 *     null if not supported.
 */
PageVisibilityMonitor.prototype.getVisibilityState = function() {
 if (!this.isSupported()) {
   return null;
 }
 return this.domHelper_.getDocument()[this.getVisibilityStatePropertyName_()];
};


/**
 * Handles the events on the element.
 * @param {BrowserEvent} e The underlying browser event.
 * @private
 */
PageVisibilityMonitor.prototype.handleChange_ = function(e) {
 var state = this.getVisibilityState();
 var visibilityEvent = new PageVisibilityEvent(
     this.isHidden(),
     /** @type {PageVisibilityState} */ (state));
 this.dispatchEvent(visibilityEvent);
};


/** @override */
PageVisibilityMonitor.prototype.disposeInternal = function() {
 events.unlistenByKey(this.eventKey_);
 PageVisibilityMonitor.base(this, 'disposeInternal');
};
