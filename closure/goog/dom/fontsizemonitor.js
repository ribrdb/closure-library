/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A class that can be used to listen to font size changes.
 */

import * as googDom from './dom.js';

import { TagName } from './tagname.js';
import * as events from '../events/events.js';
import { EventTarget } from '../events/eventtarget.js';
import { EventType } from '../events/eventtype.js';
import * as userAgent from '../useragent/useragent.js';
const { BrowserEvent } = goog.requireType('goog.events.browserevent');


// TODO(arv): Move this to goog.events instead.



/**
 * This class can be used to monitor changes in font size.  Instances will
 * dispatch a `FontSizeMonitor.EventType.CHANGE` event.
 * Example usage:
 * <pre>
 * var fms = new FontSizeMonitor();
 * events.listen(fms, FontSizeMonitor.EventType.CHANGE,
 *     function(e) {
 *       alert('Font size was changed');
 *     });
 * </pre>
 * @param {googDom.DomHelper=} opt_domHelper DOM helper object that is used to
 *     determine where to insert the DOM nodes used to determine when the font
 *     size changes.
 * @constructor
 * @extends {EventTarget}
 * @final
 */
export function FontSizeMonitor(opt_domHelper) {
 EventTarget.call(this);

 var dom = opt_domHelper || googDom.getDomHelper();

 /**
  * Offscreen iframe which we use to detect resize events.
  * @type {HTMLElement}
  * @private
  */
 this.sizeElement_ = /** @type {!HTMLElement} */ (
     dom.createDom(
         // The size of the iframe is expressed in em, which are font size
         // relative
         // which will cause the iframe to be resized when the font size
         // changes.
         // The actual values are not relevant as long as we can ensure that
         // the
         // iframe has a non zero size and is completely off screen.
         userAgent.IE ? TagName.DIV : TagName.IFRAME, {
           'style': 'position:absolute;width:9em;height:9em;top:-99em',
           'tabIndex': -1,
           'aria-hidden': 'true'
         }));
 var p = dom.getDocument().body;
 p.insertBefore(this.sizeElement_, p.firstChild);

 /**
  * The object that we listen to resize events on.
  * @type {Element|Window}
  * @private
  */
 var resizeTarget = this.resizeTarget_ = userAgent.IE ?
     this.sizeElement_ :
     googDom.getFrameContentWindow(
         /** @type {HTMLIFrameElement} */ (this.sizeElement_));

 // We need to open and close the document to get Firefox 2 to work.  We must
 // not do this for IE in case we are using HTTPS since accessing the document
 // on an about:blank iframe in IE using HTTPS raises a Permission Denied
 // error.
 if (userAgent.GECKO) {
   var doc = resizeTarget.document;
   doc.open();
   doc.close();
 }

 // Listen to resize event on the window inside the iframe.
 events.listen(
     resizeTarget, EventType.RESIZE, this.handleResize_, false,
     this);

 /**
  * Last measured width of the iframe element.
  * @type {number}
  * @private
  */
 this.lastWidth_ = this.sizeElement_.offsetWidth;
}
goog.inherits(FontSizeMonitor, EventTarget);


/**
 * The event types that the FontSizeMonitor fires.
 * @enum {string}
 */
FontSizeMonitor.EventType = {
  // TODO(arv): Change value to 'change' after updating the callers.
  CHANGE: 'fontsizechange'
};


/**
 * Constant for the change event.
 * @type {string}
 * @deprecated Use `FontSizeMonitor.EventType.CHANGE` instead.
 */
FontSizeMonitor.CHANGE_EVENT =
    FontSizeMonitor.EventType.CHANGE;


/** @override */
FontSizeMonitor.prototype.disposeInternal = function() {
 FontSizeMonitor.superClass_.disposeInternal.call(this);

 events.unlisten(
     this.resizeTarget_, EventType.RESIZE, this.handleResize_,
     false, this);
 this.resizeTarget_ = null;

 googDom.removeNode(this.sizeElement_);
 delete this.sizeElement_;
};


/**
 * Handles the onresize event of the iframe and dispatches a change event in
 * case its size really changed.
 * @param {BrowserEvent} e The event object.
 * @private
 */
FontSizeMonitor.prototype.handleResize_ = function(e) {
 // Only dispatch the event if the size really changed.  Some newer browsers do
 // not really change the font-size,  instead they zoom the whole page.  This
 // does trigger window resize events on the iframe but the logical pixel size
 // remains the same (the device pixel size changes but that is irrelevant).
 var currentWidth = this.sizeElement_.offsetWidth;
 if (this.lastWidth_ != currentWidth) {
   this.lastWidth_ = currentWidth;
   this.dispatchEvent(FontSizeMonitor.EventType.CHANGE);
 }
};
