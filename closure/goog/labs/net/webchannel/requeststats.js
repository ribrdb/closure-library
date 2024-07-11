/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Static utilities for collecting stats associated with
 * ChannelRequest.
 *
 */


import { Event as eventsEvent } from '../../../events/event.js';

import { EventTarget } from '../../../events/eventtarget.js';


/**
 * Events fired.
 * @const
 */
export var Event = {};


/**
 * Singleton event target for firing stat events
 * @type {?EventTarget}
 * @private
 */
var eventTarget_ = null;

/**
 * Singleton event target for firing stat events
 * @return {!EventTarget}
 * @private
 */
function getStatEventTarget_() {
 eventTarget_ =
     eventTarget_ || new EventTarget();
 return eventTarget_;
}

/**
 * The type of event that occurs every time some information about how reachable
 * the server is is discovered.
 */
Event.SERVER_REACHABILITY_EVENT = 'serverreachability';


/**
 * Types of events which reveal information about the reachability of the
 * server.
 * @enum {number}
 */
export var ServerReachability = {
  REQUEST_MADE: 1,
  REQUEST_SUCCEEDED: 2,
  REQUEST_FAILED: 3,
  BACK_CHANNEL_ACTIVITY: 4  // any response data received
};



/**
 * Event class for SERVER_REACHABILITY_EVENT.
 *
 * @param {EventTarget} target The stat event target for
       the channel.
 * @param {ServerReachability} reachabilityType
 *     The reachability event type.
 * @constructor
 * @extends {eventsEvent}
 */
export function ServerReachabilityEvent(target, reachabilityType) {
 eventsEvent.call(
     this, Event.SERVER_REACHABILITY_EVENT, target);

 /**
  * @type {ServerReachability}
  */
 this.reachabilityType = reachabilityType;
}
goog.inherits(ServerReachabilityEvent, eventsEvent);


/**
 * Notify the channel that a particular fine grained network event has occurred.
 * Should be considered package-private.
 * @param {ServerReachability} reachabilityType
 *     The reachability event type.
 */
export function notifyServerReachabilityEvent(reachabilityType) {
 const target = getStatEventTarget_();
 target.dispatchEvent(
     new ServerReachabilityEvent(target, reachabilityType));
}


/**
 * Stat Event that fires when things of interest happen that may be useful for
 * applications to know about for stats or debugging purposes.
 */
Event.STAT_EVENT = 'statevent';


/**
 * Enum that identifies events for statistics that are interesting to track.
 * @enum {number}
 */
export var Stat = {
  /** Event indicating a new connection attempt. */
  CONNECT_ATTEMPT: 0,

  /** Event indicating a connection error due to a general network problem. */
  ERROR_NETWORK: 1,

  /**
   * Event indicating a connection error that isn't due to a general network
   * problem.
   */
  ERROR_OTHER: 2,

  /** Event indicating the start of test stage one. */
  TEST_STAGE_ONE_START: 3,

  /** Event indicating the start of test stage two. */
  TEST_STAGE_TWO_START: 4,

  /** Event indicating the first piece of test data was received. */
  TEST_STAGE_TWO_DATA_ONE: 5,

  /**
   * Event indicating that the second piece of test data was received and it was
   * received separately from the first.
   */
  TEST_STAGE_TWO_DATA_TWO: 6,

  /** Event indicating both pieces of test data were received simultaneously. */
  TEST_STAGE_TWO_DATA_BOTH: 7,

  /** Event indicating stage one of the test request failed. */
  TEST_STAGE_ONE_FAILED: 8,

  /** Event indicating stage two of the test request failed. */
  TEST_STAGE_TWO_FAILED: 9,

  /**
   * Event indicating that a buffering proxy is likely between the client and
   * the server.
   */
  PROXY: 10,

  /**
   * Event indicating that no buffering proxy is likely between the client and
   * the server.
   */
  NOPROXY: 11,

  /** Event indicating an unknown SID error. */
  REQUEST_UNKNOWN_SESSION_ID: 12,

  /** Event indicating a bad status code was received. */
  REQUEST_BAD_STATUS: 13,

  /** Event indicating incomplete data was received */
  REQUEST_INCOMPLETE_DATA: 14,

  /** Event indicating bad data was received */
  REQUEST_BAD_DATA: 15,

  /** Event indicating no data was received when data was expected. */
  REQUEST_NO_DATA: 16,

  /** Event indicating a request timeout. */
  REQUEST_TIMEOUT: 17,

  /**
   * Event indicating that the server never received our hanging GET and so it
   * is being retried.
   */
  BACKCHANNEL_MISSING: 18,

  /**
   * Event indicating that we have determined that our hanging GET is not
   * receiving data when it should be. Thus it is dead dead and will be retried.
   */
  BACKCHANNEL_DEAD: 19,

  /**
   * The browser declared itself offline during the lifetime of a request, or
   * was offline when a request was initially made.
   */
  BROWSER_OFFLINE: 20
};



/**
 * Event class for STAT_EVENT.
 *
 * @param {EventTarget} eventTarget The stat event target for
       the channel.
 * @param {Stat} stat The stat.
 * @constructor
 * @extends {eventsEvent}
 */
export function StatEvent(eventTarget, stat) {
 eventsEvent.call(this, Event.STAT_EVENT, eventTarget);

 /**
  * The stat
  * @type {Stat}
  */
 this.stat = stat;
}
goog.inherits(StatEvent, eventsEvent);


/**
 * Returns the singleton event target for stat events.
 * @return {!EventTarget} The event target for stat events.
 */
export function getStatEventTarget() {
 return getStatEventTarget_();
}


/**
 * Helper function to call the stat event callback.
 * @param {Stat} stat The stat.
 */
export function notifyStatEvent(stat) {
 const target = getStatEventTarget_();
 target.dispatchEvent(new StatEvent(target, stat));
}


/**
 * An event that fires when POST requests complete successfully, indicating
 * the size of the POST and the round trip time.
 */
Event.TIMING_EVENT = 'timingevent';



/**
 * Event class for requestStats.Event.TIMING_EVENT
 *
 * @param {EventTarget} target The stat event target for
       the channel.
 * @param {number} size The number of characters in the POST data.
 * @param {number} rtt The total round trip time from POST to response in MS.
 * @param {number} retries The number of times the POST had to be retried.
 * @constructor
 * @extends {eventsEvent}
 */
export function TimingEvent(target, size, rtt, retries) {
 eventsEvent.call(this, Event.TIMING_EVENT, target);

 /**
  * @type {number}
  */
 this.size = size;

 /**
  * @type {number}
  */
 this.rtt = rtt;

 /**
  * @type {number}
  */
 this.retries = retries;
}
goog.inherits(TimingEvent, eventsEvent);


/**
 * Helper function to notify listeners about POST request performance.
 *
 * @param {number} size Number of characters in the POST data.
 * @param {number} rtt The amount of time from POST start to response.
 * @param {number} retries The number of times the POST had to be retried.
 */
export function notifyTimingEvent(size, rtt, retries) {
 const target = getStatEventTarget_();
 target.dispatchEvent(
     new TimingEvent(target, size, rtt, retries));
}


/**
 * Allows the application to set an execution hooks for when a channel
 * starts processing requests. This is useful to track timing or logging
 * special information. The function takes no parameters and return void.
 * @param {Function} startHook  The function for the start hook.
 */
export function setStartThreadExecutionHook(startHook) {
 startExecutionHook_ = startHook;
}


/**
 * Allows the application to set an execution hooks for when a channel
 * stops processing requests. This is useful to track timing or logging
 * special information. The function takes no parameters and return void.
 * @param {Function} endHook  The function for the end hook.
 */
export function setEndThreadExecutionHook(endHook) {
 endExecutionHook_ = endHook;
}


/**
 * Application provided execution hook for the start hook.
 *
 * @type {Function}
 * @private
 */
var startExecutionHook_ = function() {}


/**
 * Application provided execution hook for the end hook.
 *
 * @type {Function}
 * @private
 */
var endExecutionHook_ = function() {}


/**
 * Helper function to call the start hook
 */
export function onStartExecution() {
 startExecutionHook_();
};


/**
 * Helper function to call the end hook
 */
export function onEndExecution() {
 endExecutionHook_();
};


/**
 * Wrapper around SafeTimeout which calls the start and end execution hooks
 * with a try...finally block.
 * @param {Function} fn The callback function.
 * @param {number} ms The time in MS for the timer.
 * @return {number} The ID of the timer.
 */
export function setTimeout(fn, ms) {
 if (typeof fn !== 'function') {
   throw new Error('Fn must not be null and must be a function');
 }
 return goog.global.setTimeout(function() {
  onStartExecution();
  try {
    fn();
  } finally {
    onEndExecution();
  }
 }, ms);
}
