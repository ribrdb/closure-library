/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Activity Monitor.
 *
 * Fires throttled events when a user interacts with the specified document.
 * This class also exposes the amount of time since the last user event.
 *
 * If you would prefer to get BECOME_ACTIVE and BECOME_IDLE events when the
 * user changes states, then you should use the IdleTimer class instead.
 */

import * as array from '../array/array.js';

import * as asserts from '../asserts/asserts.js';
import * as dom from '../dom/dom.js';
import { EventHandler } from '../events/eventhandler.js';
import { EventTarget } from '../events/eventtarget.js';
import { EventType } from '../events/eventtype.js';
const { BrowserEvent } = goog.requireType('goog.events.browserevent');



/**
 * Once initialized with a document, the activity monitor can be queried for
 * the current idle time.
 *
 * @param {dom.DomHelper|Array<dom.DomHelper>=} opt_domHelper
 *     DomHelper which contains the document(s) to listen to.  If null, the
 *     default document is usedinstead.
 * @param {boolean=} opt_useBubble Whether to use the bubble phase to listen for
 *     events. By default listens on the capture phase so that it won't miss
 *     events that get stopPropagation/cancelBubble'd. However, this can cause
 *     problems in IE8 if the page loads multiple scripts that include the
 *     closure event handling code.
 *
 * @constructor
 * @extends {EventTarget}
 */
export function ActivityMonitor(opt_domHelper, opt_useBubble) {
 EventTarget.call(this);

 /**
  * Array of documents that are being listened to.
  * @type {Array<Document>}
  * @private
  */
 this.documents_ = [];

 /**
  * Whether to use the bubble phase to listen for events.
  * @type {boolean}
  * @private
  */
 this.useBubble_ = !!opt_useBubble;

 /**
     * The event handler.
     * @type {EventHandler<!ActivityMonitor>}
     * @private
     */
 this.eventHandler_ = new EventHandler(this);

 /**
   * Whether the current window is an iframe.
   * TODO(user): Move to dom.
   * @type {boolean}
   * @private
   */
 this.isIframe_ = window.parent != window;

 if (!opt_domHelper) {
   this.addDocument(dom.getDomHelper().getDocument());
 } else if (Array.isArray(opt_domHelper)) {
   for (var i = 0; i < opt_domHelper.length; i++) {
     this.addDocument(opt_domHelper[i].getDocument());
   }
 } else {
   this.addDocument(opt_domHelper.getDocument());
 }

 /**
  * The time (in milliseconds) of the last user event.
  * @type {number}
  * @private
  */
 this.lastEventTime_ = Date.now();
}
goog.inherits(ActivityMonitor, EventTarget);


/**
 * The last event type that was detected.
 * @type {string}
 * @private
 */
ActivityMonitor.prototype.lastEventType_ = '';


/**
 * The mouse x-position after the last user event.
 * @type {number}
 * @private
 */
ActivityMonitor.prototype.lastMouseX_;


/**
 * The mouse y-position after the last user event.
 * @type {number}
 * @private
 */
ActivityMonitor.prototype.lastMouseY_;


/**
 * The earliest time that another throttled ACTIVITY event will be dispatched
 * @type {number}
 * @private
 */
ActivityMonitor.prototype.minEventTime_ = 0;


/**
 * Minimum amount of time in ms between throttled ACTIVITY events
 * @type {number}
 */
ActivityMonitor.MIN_EVENT_SPACING = 3 * 1000;


/**
 * If a user executes one of these events, s/he is considered not idle.
 * @type {Array<EventType>}
 * @private
 */
ActivityMonitor.userEventTypesBody_ = [
  EventType.CLICK, EventType.DBLCLICK,
  EventType.MOUSEDOWN, EventType.MOUSEMOVE,
  EventType.MOUSEUP
];


/**
 * If a user executes one of these events, s/he is considered not idle.
 * Note: monitoring touch events within iframe cause problems in iOS.
 * @type {Array<EventType>}
 * @private
 */
ActivityMonitor.userTouchEventTypesBody_ = [
  EventType.TOUCHEND, EventType.TOUCHMOVE,
  EventType.TOUCHSTART
];


/**
 * If a user executes one of these events, s/he is considered not idle.
 * @type {Array<EventType>}
 * @private
 */
ActivityMonitor.userEventTypesDocuments_ =
    [EventType.KEYDOWN, EventType.KEYUP];


/**
 * Event constants for the activity monitor.
 * @enum {string}
 */
ActivityMonitor.Event = {
  /** Event fired when the user does something interactive */
  ACTIVITY: 'activity'
};


/** @override */
ActivityMonitor.prototype.disposeInternal = function() {
 ActivityMonitor.superClass_.disposeInternal.call(this);
 this.eventHandler_.dispose();
 this.eventHandler_ = null;
 delete this.documents_;
};


/**
 * Adds a document to those being monitored by this class.
 *
 * @param {Document} doc Document to monitor.
 */
ActivityMonitor.prototype.addDocument = function(doc) {
 if (array.contains(this.documents_, doc)) {
   return;
 }
 this.documents_.push(doc);
 var useCapture = !this.useBubble_;

 var eventsToListenTo = [].concat(
     ActivityMonitor.userEventTypesDocuments_,
     ActivityMonitor.userEventTypesBody_);

 if (!this.isIframe_) {
   // Monitoring touch events in iframe causes problems interacting with text
   // fields in iOS (input text, textarea, contenteditable, select/copy/paste),
   // so just ignore these events. This shouldn't matter much given that a
   // touchstart event followed by touchend event produces a click event,
   // which is being monitored correctly.
   array.extend(
       eventsToListenTo, ActivityMonitor.userTouchEventTypesBody_);
 }

 this.eventHandler_.listen(
     doc, eventsToListenTo, this.handleEvent_, useCapture);
};


/**
 * Removes a document from those being monitored by this class.
 *
 * @param {Document} doc Document to monitor.
 */
ActivityMonitor.prototype.removeDocument = function(doc) {
 if (this.isDisposed()) {
   return;
 }
 array.remove(this.documents_, doc);
 var useCapture = !this.useBubble_;

 var eventsToUnlistenTo = [].concat(
     ActivityMonitor.userEventTypesDocuments_,
     ActivityMonitor.userEventTypesBody_);

 if (!this.isIframe_) {
   // See note above about monitoring touch events in iframe.
   array.extend(
       eventsToUnlistenTo, ActivityMonitor.userTouchEventTypesBody_);
 }

 this.eventHandler_.unlisten(
     doc, eventsToUnlistenTo, this.handleEvent_, useCapture);
};


/**
 * Updates the last event time when a user action occurs.
 * @param {BrowserEvent} e Event object.
 * @private
 */
ActivityMonitor.prototype.handleEvent_ = function(e) {
 var update = false;
 switch (e.type) {
   case EventType.MOUSEMOVE:
     // In FF 1.5, we get spurious mouseover and mouseout events when the UI
     // redraws. We only want to update the idle time if the mouse has moved.
     if (typeof this.lastMouseX_ == 'number' &&
             this.lastMouseX_ != e.clientX ||
         typeof this.lastMouseY_ == 'number' &&
             this.lastMouseY_ != e.clientY) {
       update = true;
     }
     this.lastMouseX_ = e.clientX;
     this.lastMouseY_ = e.clientY;
     break;
   default:
     update = true;
 }

 if (update) {
   var type = asserts.assertString(e.type);
   this.updateIdleTime(Date.now(), type);
 }
};


/**
 * Updates the last event time to be the present time, useful for non-DOM
 * events that should update idle time.
 */
ActivityMonitor.prototype.resetTimer = function() {
 this.updateIdleTime(Date.now(), 'manual');
};


/**
 * Updates the idle time and fires an event if time has elapsed since
 * the last update.
 * @param {number} eventTime Time (in MS) of the event that cleared the idle
 *     timer.
 * @param {string} eventType Type of the event, used only for debugging.
 * @protected
 */
ActivityMonitor.prototype.updateIdleTime = function(
    eventTime, eventType) {
 // update internal state noting whether the user was idle
 this.lastEventTime_ = eventTime;
 this.lastEventType_ = eventType;

 // dispatch event
 if (eventTime > this.minEventTime_) {
   this.dispatchEvent(ActivityMonitor.Event.ACTIVITY);
   this.minEventTime_ = eventTime + ActivityMonitor.MIN_EVENT_SPACING;
 }
};


/**
 * Returns the amount of time the user has been idle.
 * @param {number=} opt_now The current time can optionally be passed in for the
 *     computation to avoid an extra Date allocation.
 * @return {number} The amount of time in ms that the user has been idle.
 */
ActivityMonitor.prototype.getIdleTime = function(opt_now) {
 var now = opt_now || Date.now();
 return now - this.lastEventTime_;
};


/**
 * Returns the type of the last user event.
 * @return {string} event type.
 */
ActivityMonitor.prototype.getLastEventType = function() {
 return this.lastEventType_;
};


/**
 * Returns the time of the last event
 * @return {number} last event time.
 */
ActivityMonitor.prototype.getLastEventTime = function() {
 return this.lastEventTime_;
};
