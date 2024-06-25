/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Class that can be used to determine when an iframe is loaded.
 */

import * as dom from '../dom/dom.js';

import * as events from '../events/events.js';
import { EventTarget } from '../events/eventtarget.js';
import { EventType } from '../events/eventtype.js';



/**
 * The correct way to determine whether a same-domain iframe has completed
 * loading is different in IE and Firefox.  This class abstracts above these
 * differences, providing a consistent interface for:
 * <ol>
 * <li> Determing if an iframe is currently loaded
 * <li> Listening for an iframe that is not currently loaded, to finish loading
 * </ol>
 *
 * @param {HTMLIFrameElement} iframe An iframe.
 * @param {boolean=} opt_hasContent Whether to wait for the loaded iframe to
 *     have content in its document body.
 * @extends {EventTarget}
 * @constructor
 * @final
 */
export function IframeLoadMonitor(iframe, opt_hasContent) {
 IframeLoadMonitor.base(this, 'constructor');

 /**
  * Iframe whose load state is monitored by this IframeLoadMonitor
  * @type {HTMLIFrameElement}
  * @private
  */
 this.iframe_ = iframe;

 /**
  * Whether to wait for the loaded iframe to have content in its document body.
  * @type {boolean}
  * @private
  */
 this.hasContent_ = !!opt_hasContent;

 /**
  * Whether or not the iframe is loaded.
  * @type {boolean}
  * @private
  */
 this.isLoaded_ = this.isLoadedHelper_();

 if (!this.isLoaded_) {
   const loadEvtType = EventType.LOAD;
   this.onloadListenerKey_ = events.listen(
       this.iframe_, loadEvtType, this.handleLoad_, false, this);

   // Sometimes we still don't get the event callback, so we'll poll just to
   // be safe.
   this.intervalId_ = window.setInterval(
       goog.bind(this.handleLoad_, this),
       IframeLoadMonitor.POLL_INTERVAL_MS_);
 }
}
goog.inherits(IframeLoadMonitor, EventTarget);


/**
 * Event type dispatched by a IframeLoadMonitor when it internal iframe
 * finishes loading for the first time after construction of the
 * IframeLoadMonitor
 * @type {string}
 */
IframeLoadMonitor.LOAD_EVENT = 'ifload';


/**
 * Poll interval for polling iframe load states in milliseconds.
 * @type {number}
 * @private
 */
IframeLoadMonitor.POLL_INTERVAL_MS_ = 100;


/**
 * Key for iframe load listener, or null if not currently listening on the
 * iframe for a load event.
 * @type {?events.Key}
 * @private
 */
IframeLoadMonitor.prototype.onloadListenerKey_ = null;


/**
 * Returns whether or not the iframe is loaded.
 * @return {boolean} whether or not the iframe is loaded.
 */
IframeLoadMonitor.prototype.isLoaded = function() {
 return this.isLoaded_;
};


/**
 * Stops the poll timer if this IframeLoadMonitor is currently polling.
 * @private
 */
IframeLoadMonitor.prototype.maybeStopTimer_ = function() {
 if (this.intervalId_) {
   window.clearInterval(this.intervalId_);
   this.intervalId_ = null;
 }
};


/**
 * Returns the iframe whose load state this IframeLoader monitors.
 * @return {HTMLIFrameElement} the iframe whose load state this IframeLoader
 *     monitors.
 */
IframeLoadMonitor.prototype.getIframe = function() {
 return this.iframe_;
};


/** @override */
IframeLoadMonitor.prototype.disposeInternal = function() {
 delete this.iframe_;
 this.maybeStopTimer_();
 events.unlistenByKey(this.onloadListenerKey_);
 IframeLoadMonitor.superClass_.disposeInternal.call(this);
};


/**
 * Returns whether or not the iframe is loaded.  Determines this by inspecting
 * browser dependent properties of the iframe.
 * @return {boolean} whether or not the iframe is loaded.
 * @private
 */
IframeLoadMonitor.prototype.isLoadedHelper_ = function() {
 let isLoaded = false;

 try {
   // For other browsers, check whether the document body exists to determine
   // whether the iframe has loaded. Older versions of Firefox may fire the
   // LOAD event early for an empty frame and then, a few hundred
   // milliseconds later, replace the contentDocument. If the hasContent
   // check is requested, the iframe is considered loaded only once there is
   // content in the body.
   const body = dom.getFrameContentDocument(this.iframe_).body;
   isLoaded = this.hasContent_ ? !!body && !!body.firstChild : !!body;
 } catch (e) {
   // Ignore these errors. This just means that the iframe is not loaded
   // IE will throw error reading readyState if the iframe is not appended
   // to the dom yet.
   // Firefox will throw error getting the iframe body if the iframe is not
   // fully loaded.
 }
 return isLoaded;
};


/**
 * Handles an event indicating that the loading status of the iframe has
 * changed.  In Firefox this is a EventType.LOAD event, in IE
 * this is a EventType.READYSTATECHANGED
 * @private
 */
IframeLoadMonitor.prototype.handleLoad_ = function() {
 // Only do the handler if the iframe is loaded.
 if (this.isLoadedHelper_()) {
   this.maybeStopTimer_();
   events.unlistenByKey(this.onloadListenerKey_);
   this.onloadListenerKey_ = null;
   this.isLoaded_ = true;
   this.dispatchEvent(IframeLoadMonitor.LOAD_EVENT);
 }
};
