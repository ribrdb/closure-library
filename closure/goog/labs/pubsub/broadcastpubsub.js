/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Disposable } from '../../disposable/disposable.js';

import { Timer } from '../../timer/timer.js';
import * as array from '../../array/array.js';
import { run } from '../../async/run.js';
import { EventHandler } from '../../events/eventhandler.js';
import { EventType } from '../../events/eventtype.js';
import * as log from '../../log/log.js';
import * as math from '../../math/math.js';
import { PubSub } from '../../pubsub/pubsub.js';
import { Storage } from '../../storage/storage.js';
import { HTML5LocalStorage } from '../../storage/mechanism/html5localstorage.js';
import * as googString from '../../string/string.js';
import * as userAgent from '../../useragent/useragent.js';
const { BrowserEvent } = goog.requireType('goog.events.browserevent');



/**
 * Topic-based publish/subscribe messaging implementation that provides
 * communication between browsing contexts that share the same origin.
 *
 * Wrapper around PubSub that utilizes localStorage to broadcast publications to
 * all browser windows with the same origin as the publishing context. This
 * allows for topic-based publish/subscribe implementation of strings shared by
 * all browser contexts that share the same origin.
 *
 * Delivery is guaranteed on all browsers except IE8 where topics expire after a
 * timeout. Publishing of a topic within a callback function provides no
 * guarantee on ordering in that there is a possibility that separate origin
 * contexts may see topics in a different order.
 *
 * This class is not secure and in certain cases (e.g., a browser crash) data
 * that is published can persist in localStorage indefinitely. Do not use this
 * class to communicate private or confidential information.
 *
 * On IE8, localStorage is shared by the http and https origins. An attacker
 * could possibly leverage this to publish to the secure origin.
 *
 * BroadcastPubSub wraps an instance of PubSub rather than
 * subclassing because the base PubSub class allows publishing of arbitrary
 * objects.
 *
 * Special handling is done for the IE8 browsers. See the IE8_EVENTS_KEY_
 * constant and the `publish` function for more information.
 *
 *
 * @constructor @struct @extends {Disposable}
 */
export function BroadcastPubSub() {
  BroadcastPubSub.base(this, 'constructor');
  BroadcastPubSub.instances_.push(this);

  /** @private @const */
  this.pubSub_ = new PubSub();
  this.registerDisposable(this.pubSub_);

  /** @private @const */
  this.handler_ = new EventHandler(this);
  this.registerDisposable(this.handler_);

  /** @private @const */
  this.logger_ = log.getLogger('goog.labs.pubsub.BroadcastPubSub');

  /** @private @const */
  this.mechanism_ = new HTML5LocalStorage();

  /** @private {?Storage} */
  this.storage_ = null;

  /** @private {?Object<string, number>} */
  this.ie8LastEventTimes_ = null;

  /** @private {number} */
  this.ie8StartupTimestamp_ = Date.now() - 1;

  if (this.mechanism_.isAvailable()) {
    this.storage_ = new Storage(this.mechanism_);

    let target = window;
    if (BroadcastPubSub.IS_IE8_) {
      this.ie8LastEventTimes_ = {};

      target = document;
    }
    this.handler_.listen(
        target, EventType.STORAGE, this.handleStorageEvent_);
  }
}
goog.inherits(BroadcastPubSub, Disposable);


/** @private @const {!Array<!BroadcastPubSub>} */
BroadcastPubSub.instances_ = [];


/**
 * SitePubSub namespace for localStorage.
 * @private @const
 */
BroadcastPubSub.STORAGE_KEY_ = '_closure_bps';


/**
 * Handle the storage event and possibly dispatch topics.
 * @param {!BrowserEvent} e Event object.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
BroadcastPubSub.prototype.handleStorageEvent_ = function(e) {
  if (BroadcastPubSub.IS_IE8_) {
    // Even though we have the event, IE8 doesn't update our localStorage until
    // after we handle the actual event.
    run(this.handleIe8StorageEvent_, this);
    return;
  }

  const browserEvent = e.getBrowserEvent();
  if (browserEvent.key != BroadcastPubSub.STORAGE_KEY_) {
    return;
  }

  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  const data = JSON.parse(browserEvent.newValue);
  const args = goog.isObject(data) && data['args'];
  if (Array.isArray(args) &&
      array.every(args, x => typeof x === 'string')) {
    this.dispatch_(args);
  } else {
    log.warning(this.logger_, 'storage event contained invalid arguments');
  }
};


/**
 * Dispatches args on the internal pubsub queue.
 * @param {!Array<string>} args The arguments to publish.
 * @private
 */
BroadcastPubSub.prototype.dispatch_ = function(args) {
  PubSub.prototype.publish.apply(this.pubSub_, args);
};


/**
 * Publishes a message to a topic. Remote subscriptions in other tabs/windows
 * are dispatched via local storage events. Local subscriptions are called
 * asynchronously via Timer event in order to simulate remote behavior locally.
 * @param {string} topic Topic to publish to.
 * @param {...string} var_args String arguments that are applied to each
 *     subscription function.
 */
BroadcastPubSub.prototype.publish = function(topic, var_args) {
  const args = Array.prototype.slice.call(arguments);

  // Dispatch to localStorage.
  if (this.storage_) {
    // Update topics to use the optional prefix.
    let now = Date.now();
    const data = {'args': args, 'timestamp': now};

    if (!BroadcastPubSub.IS_IE8_) {
      // Generated events will contain all the data in modern browsers.
      this.storage_.set(BroadcastPubSub.STORAGE_KEY_, data);
      this.storage_.remove(BroadcastPubSub.STORAGE_KEY_);
    } else {
      // With IE8 we need to manage our own events queue.
      let events = null;

      try {
        events =
            this.storage_.get(BroadcastPubSub.IE8_EVENTS_KEY_);
      } catch (ex) {
        log.error(
            this.logger_, 'publish encountered invalid event queue at ' +
                BroadcastPubSub.IE8_EVENTS_KEY_);
      }
      if (!Array.isArray(events)) {
        events = [];
      }
      // Avoid a race condition where we're publishing in the same
      // millisecond that another event that may be getting
      // processed. In short, we try go guarantee that whatever event
      // we put on the event queue has a timestamp that is older than
      // any other timestamp in the queue.
      const lastEvent = events[events.length - 1];
      const lastTimestamp =
          lastEvent && lastEvent['timestamp'] || this.ie8StartupTimestamp_;
      if (lastTimestamp >= now) {
        now = lastTimestamp +
            BroadcastPubSub.IE8_TIMESTAMP_UNIQUE_OFFSET_MS_;
        data['timestamp'] = now;
      }
      events.push(data);
      this.storage_.set(
          BroadcastPubSub.IE8_EVENTS_KEY_, events);

      // Cleanup this event in IE8_EVENT_LIFETIME_MS_ milliseconds.
      Timer.callOnce(
          goog.bind(this.cleanupIe8StorageEvents_, this, now),
          BroadcastPubSub.IE8_EVENT_LIFETIME_MS_);
    }
  }

  // W3C spec is to not dispatch the storage event to the same window that
  // modified localStorage. For conforming browsers we have to manually dispatch
  // the publish event to subscriptions on instances of BroadcastPubSub in the
  // current window.
  if (!userAgent.IE) {
    // Dispatch the publish event to local instances asynchronously to fix some
    // quirks with timings. The result is that all subscriptions are dispatched
    // before any future publishes are processed. The effect is that
    // subscriptions in the same window are dispatched as if they are the result
    // of a publish from another tab.
    BroadcastPubSub.instances_.forEach(function(instance) {
      run(goog.bind(instance.dispatch_, instance, args));
    });
  }
};


/**
 * Unsubscribes a function from a topic. Only deletes the first match found.
 * Returns a Boolean indicating whether a subscription was removed.
 * @param {string} topic Topic to unsubscribe from.
 * @param {Function} fn Function to unsubscribe.
 * @param {Object=} opt_context Object in whose context the function was to be
 *     called (the global scope if none).
 * @return {boolean} Whether a matching subscription was removed.
 */
BroadcastPubSub.prototype.unsubscribe = function(
    topic, fn, opt_context) {
  return this.pubSub_.unsubscribe(topic, fn, opt_context);
};


/**
 * Removes a subscription based on the key returned by {@link #subscribe}. No-op
 * if no matching subscription is found. Returns a Boolean indicating whether a
 * subscription was removed.
 * @param {number} key Subscription key.
 * @return {boolean} Whether a matching subscription was removed.
 */
BroadcastPubSub.prototype.unsubscribeByKey = function(key) {
  return this.pubSub_.unsubscribeByKey(key);
};


/**
 * Subscribes a function to a topic. The function is invoked as a method on the
 * given `opt_context` object, or in the global scope if no context is
 * specified. Subscribing the same function to the same topic multiple times
 * will result in multiple function invocations while publishing. Returns a
 * subscription key that can be used to unsubscribe the function from the topic
 * via {@link #unsubscribeByKey}.
 * @param {string} topic Topic to subscribe to.
 * @param {Function} fn Function to be invoked when a message is published to
 *     the given topic.
 * @param {Object=} opt_context Object in whose context the function is to be
 *     called (the global scope if none).
 * @return {number} Subscription key.
 */
BroadcastPubSub.prototype.subscribe = function(
    topic, fn, opt_context) {
  return this.pubSub_.subscribe(topic, fn, opt_context);
};


/**
 * Subscribes a single-use function to a topic. The function is invoked as a
 * method on the given `opt_context` object, or in the global scope if no
 * context is specified, and is then unsubscribed. Returns a subscription key
 * that can be used to unsubscribe the function from the topic via {@link
 * #unsubscribeByKey}.
 * @param {string} topic Topic to subscribe to.
 * @param {Function} fn Function to be invoked once and then unsubscribed when
 *     a message is published to the given topic.
 * @param {Object=} opt_context Object in whose context the function is to be
 *     called (the global scope if none).
 * @return {number} Subscription key.
 */
BroadcastPubSub.prototype.subscribeOnce = function(
    topic, fn, opt_context) {
  return this.pubSub_.subscribeOnce(topic, fn, opt_context);
};


/**
 * Returns the number of subscriptions to the given topic (or all topics if
 * unspecified). This number will not change while publishing any messages.
 * @param {string=} opt_topic The topic (all topics if unspecified).
 * @return {number} Number of subscriptions to the topic.
 */
BroadcastPubSub.prototype.getCount = function(opt_topic) {
  return this.pubSub_.getCount(opt_topic);
};


/**
 * Clears the subscription list for a topic, or all topics if unspecified.
 * @param {string=} opt_topic Topic to clear (all topics if unspecified).
 */
BroadcastPubSub.prototype.clear = function(opt_topic) {
  this.pubSub_.clear(opt_topic);
};


/** @override */
BroadcastPubSub.prototype.disposeInternal = function() {
  array.remove(BroadcastPubSub.instances_, this);
  if (BroadcastPubSub.IS_IE8_ && this.storage_ != null &&
      BroadcastPubSub.instances_.length == 0) {
    this.storage_.remove(BroadcastPubSub.IE8_EVENTS_KEY_);
  }
  BroadcastPubSub.base(this, 'disposeInternal');
};


/**
 * Prefix for IE8 storage event queue keys.
 * @private @const
 */
BroadcastPubSub.IE8_EVENTS_KEY_PREFIX_ = '_closure_bps_ie8evt';


/**
 * Time (in milliseconds) that IE8 events should live. If they are not
 * processed by other windows in this time they will be removed.
 * @private @const
 */
BroadcastPubSub.IE8_EVENT_LIFETIME_MS_ = 1000 * 10;


/**
 * Time (in milliseconds) that the IE8 event queue should live.
 * @private @const
 */
BroadcastPubSub.IE8_QUEUE_LIFETIME_MS_ = 1000 * 30;


/**
 * Time delta that is used to distinguish between timestamps of events that
 * happen in the same millisecond.
 * @private @const
 */
BroadcastPubSub.IE8_TIMESTAMP_UNIQUE_OFFSET_MS_ = .01;


/**
 * Name for this window/tab's storage key that stores its IE8 event queue.
 *
 * The browsers storage events are supposed to track the key which was changed,
 * the previous value for that key, and the new value of that key. Our
 * implementation is dependent on this information but IE8 doesn't provide it.
 * We implement our own event queue using local storage to track this
 * information in IE8. Since all instances share the same localStorage context
 * in a particular tab, we share the events queue.
 *
 * This key is a static member shared by all instances of BroadcastPubSub in the
 * same Window context. To avoid read-update-write contention, this key is only
 * written in a single context in the cleanupIe8StorageEvents_ function. Since
 * instances in other contexts will read this key there is code in the
 * `publish` function to make sure timestamps are unique even within the same
 * millisecond.
 *
 * @private @const {string}
 */
BroadcastPubSub.IE8_EVENTS_KEY_ =
    BroadcastPubSub.IE8_EVENTS_KEY_PREFIX_ +
    math.randomInt(1e9);


/**
 * All instances of this object should access elements using strings and not
 * attributes. Since we are communicating across browser tabs we could be
 * dealing with different versions of javascript and thus may have different
 * obfuscation in each tab.
 * @private @typedef {{'timestamp': number, 'args': !Array<string>}}
 */
BroadcastPubSub.Ie8Event_;


/** @private @const */
BroadcastPubSub.IS_IE8_ =
    userAgent.IE && userAgent.DOCUMENT_MODE == 8;


/**
 * Validates an event object.
 * @param {!Object} obj The object to validate as an Event.
 * @return {?BroadcastPubSub.Ie8Event_} A valid
 *     event object or null if the object is invalid.
 * @private
 */
BroadcastPubSub.validateIe8Event_ = function(obj) {
  if (goog.isObject(obj) && typeof obj['timestamp'] === 'number' &&
      array.every(obj['args'], x => typeof x === 'string')) {
    return {'timestamp': obj['timestamp'], 'args': obj['args']};
  }
  return null;
};


/**
 * Returns an array of valid IE8 events.
 * @param {!Array<!Object>} events Possible IE8 events.
 * @return {!Array<!BroadcastPubSub.Ie8Event_>}
 *     Valid IE8 events.
 * @private
 */
BroadcastPubSub.filterValidIe8Events_ = function(events) {
  return array.filter(
      events.map(BroadcastPubSub.validateIe8Event_),
      x => x != null);
};


/**
 * Returns the IE8 events that have a timestamp later than the provided
 * timestamp.
 * @param {number} timestamp Expired timestamp.
 * @param {!Array<!BroadcastPubSub.Ie8Event_>} events
 *     Possible IE8 events.
 * @return {!Array<!BroadcastPubSub.Ie8Event_>}
 *     Unexpired IE8 events.
 * @private
 */
BroadcastPubSub.filterNewIe8Events_ = function(
    timestamp, events) {
  return events.filter(function(event) {
    return event['timestamp'] > timestamp;
  });
};


/**
 * Processes the events array for key if all elements are valid IE8 events.
 * @param {string} key The key in localStorage where the event queue is stored.
 * @param {!Array<!Object>} events Array of possible events stored at key.
 * @return {boolean} Return true if all elements in the array are valid
 *     events, false otherwise.
 * @private
 */
BroadcastPubSub.prototype.maybeProcessIe8Events_ = function(
    key, events) {
  if (!events.length) {
    return false;
  }

  let validEvents =
      BroadcastPubSub.filterValidIe8Events_(events);
  if (validEvents.length == events.length) {
    const lastTimestamp = array.peek(validEvents)['timestamp'];
    const previousTime =
        this.ie8LastEventTimes_[key] || this.ie8StartupTimestamp_;
    if (lastTimestamp > previousTime -
            BroadcastPubSub.IE8_QUEUE_LIFETIME_MS_) {
      this.ie8LastEventTimes_[key] = lastTimestamp;
      validEvents = BroadcastPubSub.filterNewIe8Events_(
          previousTime, validEvents);
      for (let i = 0, event; event = validEvents[i]; i++) {
        this.dispatch_(event['args']);
      }
      return true;
    }
  } else {
    log.warning(this.logger_, 'invalid events found in queue ' + key);
  }

  return false;
};


/**
 * Handle the storage event and possibly dispatch events. Looks through all keys
 * in localStorage for valid keys.
 * @private
 */
BroadcastPubSub.prototype.handleIe8StorageEvent_ = function() {
  const numKeys = this.mechanism_.getCount();
  for (let idx = 0; idx < numKeys; idx++) {
    const key = this.mechanism_.key(idx);
    // Don't process events we generated. The W3C standard says that storage
    // events should be queued by the browser for each window whose document's
    // storage object is affected by a change in localStorage. Chrome, Firefox,
    // and modern IE don't dispatch the event to the window which made the
    // change. This code simulates that behavior in IE8.
    if (!(typeof key === 'string' &&
          googString.startsWith(
              key, BroadcastPubSub.IE8_EVENTS_KEY_PREFIX_))) {
      continue;
    }

    let events = null;

    try {
      events = this.storage_.get(key);
    } catch (ex) {
      log.warning(this.logger_, 'invalid remote event queue ' + key);
    }

    if (!(Array.isArray(events) && this.maybeProcessIe8Events_(key, events))) {
      // Events is not an array, empty, contains invalid events, or expired.
      this.storage_.remove(key);
    }
  }
};


/**
 * Cleanup our IE8 event queue by removing any events that come at or before the
 * given timestamp.
 * @param {number} timestamp Maximum timestamp to remove from the queue.
 * @private
 */
BroadcastPubSub.prototype.cleanupIe8StorageEvents_ = function(
    timestamp) {
  let events = null;

  try {
    events =
        this.storage_.get(BroadcastPubSub.IE8_EVENTS_KEY_);
  } catch (ex) {
    log.error(
        this.logger_, 'cleanup encountered invalid event queue key ' +
            BroadcastPubSub.IE8_EVENTS_KEY_);
  }
  if (!Array.isArray(events)) {
    this.storage_.remove(BroadcastPubSub.IE8_EVENTS_KEY_);
    return;
  }

  events = BroadcastPubSub.filterNewIe8Events_(
      timestamp,
      BroadcastPubSub.filterValidIe8Events_(events));

  if (events.length > 0) {
    this.storage_.set(BroadcastPubSub.IE8_EVENTS_KEY_, events);
  } else {
    this.storage_.remove(BroadcastPubSub.IE8_EVENTS_KEY_);
  }
};
