/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview This event handler allows you to catch focusin and focusout
 * events on  descendants. Unlike the "focus" and "blur" events which do not
 * propagate consistently, and therefore must be added to the element that is
 * focused, this allows you to attach one listener to an ancester and you will
 * be notified when the focus state changes of ony of its descendants.
 * @see ../demos/focushandler.html
 */

import * as events from './events.js';

import { BrowserEvent } from './browserevent.js';
import { EventTarget } from './eventtarget.js';
import * as userAgent from '../useragent/useragent.js';



/**
 * This event handler allows you to catch focus events when descendants gain or
 * loses focus.
 * @param {Element|Document} element  The node to listen on.
 * @constructor
 * @extends {EventTarget}
 * @final
 */
export function FocusHandler(element) {
 EventTarget.call(this);

 /**
  * This is the element that we will listen to the real focus events on.
  * @type {Element|Document}
  * @private
  */
 this.element_ = element;

 // In IE we use focusin/focusout and in other browsers we use a capturing
 // listner for focus/blur
 var typeIn = userAgent.IE ? 'focusin' : 'focus';
 var typeOut = userAgent.IE ? 'focusout' : 'blur';

 /**
   * Store the listen key so it easier to unlisten in dispose.
   * @private
   * @type {events.Key}
   */
 this.listenKeyIn_ =
     events.listen(this.element_, typeIn, this, !userAgent.IE);

 /**
   * Store the listen key so it easier to unlisten in dispose.
   * @private
   * @type {events.Key}
   */
 this.listenKeyOut_ =
     events.listen(this.element_, typeOut, this, !userAgent.IE);
}
goog.inherits(FocusHandler, EventTarget);


/**
 * Enum type for the events fired by the focus handler
 * @enum {string}
 */
FocusHandler.EventType = {
  FOCUSIN: 'focusin',
  FOCUSOUT: 'focusout'
};


/**
 * This handles the underlying events and dispatches a new event.
 * @param {BrowserEvent} e  The underlying browser event.
 */
FocusHandler.prototype.handleEvent = function(e) {
 var be = e.getBrowserEvent();
 var event = new BrowserEvent(be);
 event.type = e.type == 'focusin' || e.type == 'focus' ?
     FocusHandler.EventType.FOCUSIN :
     FocusHandler.EventType.FOCUSOUT;
 this.dispatchEvent(event);
};


/** @override */
FocusHandler.prototype.disposeInternal = function() {
 FocusHandler.superClass_.disposeInternal.call(this);
 events.unlistenByKey(this.listenKeyIn_);
 events.unlistenByKey(this.listenKeyOut_);
 delete this.element_;
};
