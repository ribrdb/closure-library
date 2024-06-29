/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Disposable } from '../disposable/disposable.js';

import { PubSub } from './pubsub.js';
const { TopicId } = goog.requireType('goog.pubsub.topicid');



/**
 * This object is a temporary shim that provides TopicId support
 * for PubSub.  See b/12477087 for more info.
 * @param {boolean=} opt_async Enable asynchronous behavior.  Recommended for
 *     new code.  See notes on `PubSub.publish`.
 * @constructor
 * @extends {Disposable}
 */
export function TypedPubSub(opt_async) {
 TypedPubSub.base(this, 'constructor');

 this.pubSub_ = new PubSub(opt_async);
 this.registerDisposable(this.pubSub_);
}
goog.inherits(TypedPubSub, Disposable);


/**
 * See `PubSub.subscribe`.
 * @param {!TopicId<PAYLOAD>} topic Topic to subscribe to.
 * @param {function(this:CONTEXT, PAYLOAD)} fn Function to be invoked when a
 *     message is published to the given topic.
 * @param {CONTEXT=} opt_context Object in whose context the function is to be
 *     called (the global scope if none).
 * @return {number} Subscription key.
 * @template PAYLOAD, CONTEXT
 */
TypedPubSub.prototype.subscribe = function(topic, fn, opt_context) {
 return this.pubSub_.subscribe(topic.toString(), fn, opt_context);
};


/**
 * See `PubSub.subscribeOnce`.
 * @param {!TopicId<PAYLOAD>} topic Topic to subscribe to.
 * @param {function(this:CONTEXT, PAYLOAD)} fn Function to be invoked once and
 *     then unsubscribed when a message is published to the given topic.
 * @param {CONTEXT=} opt_context Object in whose context the function is to be
 *     called (the global scope if none).
 * @return {number} Subscription key.
 * @template PAYLOAD, CONTEXT
 */
TypedPubSub.prototype.subscribeOnce = function(
    topic, fn, opt_context) {
 return this.pubSub_.subscribeOnce(topic.toString(), fn, opt_context);
};


/**
 * See `PubSub.unsubscribe`.
 * @param {!TopicId<PAYLOAD>} topic Topic to unsubscribe from.
 * @param {function(this:CONTEXT, PAYLOAD)} fn Function to unsubscribe.
 * @param {CONTEXT=} opt_context Object in whose context the function was to be
 *     called (the global scope if none).
 * @return {boolean} Whether a matching subscription was removed.
 * @template PAYLOAD, CONTEXT
 */
TypedPubSub.prototype.unsubscribe = function(
    topic, fn, opt_context) {
 return this.pubSub_.unsubscribe(topic.toString(), fn, opt_context);
};


/**
 * See `PubSub.unsubscribeByKey`.
 * @param {number} key Subscription key.
 * @return {boolean} Whether a matching subscription was removed.
 */
TypedPubSub.prototype.unsubscribeByKey = function(key) {
 return this.pubSub_.unsubscribeByKey(key);
};


/**
 * See `PubSub.publish`.
 * @param {!TopicId<PAYLOAD>} topic Topic to publish to.
 * @param {PAYLOAD} payload Payload passed to each subscription function.
 * @return {boolean} Whether any subscriptions were called.
 * @template PAYLOAD
 */
TypedPubSub.prototype.publish = function(topic, payload) {
 return this.pubSub_.publish(topic.toString(), payload);
};


/**
 * See `PubSub.clear`.
 * @param {!TopicId<PAYLOAD>=} opt_topic Topic to clear (all topics
 *     if unspecified).
 * @template PAYLOAD
 */
TypedPubSub.prototype.clear = function(opt_topic) {
 this.pubSub_.clear(
     opt_topic !== undefined ? opt_topic.toString() : undefined);
};


/**
 * See `PubSub.getCount`.
 * @param {!TopicId<PAYLOAD>=} opt_topic The topic (all topics if
 *     unspecified).
 * @return {number} Number of subscriptions to the topic.
 * @template PAYLOAD
 */
TypedPubSub.prototype.getCount = function(opt_topic) {
 return this.pubSub_.getCount(
     opt_topic !== undefined ? opt_topic.toString() : undefined);
};
