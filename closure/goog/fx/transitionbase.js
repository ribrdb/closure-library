/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview An abstract base class for transitions. This is a simple
 * interface that allows for playing, pausing and stopping an animation. It adds
 * a simple event model, and animation status.
 */
goog.declareModuleId('goog.fx.transitionbase');

import { EventTarget } from '../events/eventtarget.js';
import { Transition } from './transition.js';  // Unreferenced: interface



/**
 * Constructor for a transition object.
 *
 * @constructor
 * @struct
 * @implements {Transition}
 * @extends {EventTarget}
 */
export function TransitionBase() {
 TransitionBase.base(this, 'constructor');

 /**
    * The internal state of the animation.
    * @type {TransitionBase.State}
    * @private
    */
 this.state_ = TransitionBase.State.STOPPED;

 /**
  * Timestamp for when the animation was started.
  * @type {?number}
  * @protected
  */
 this.startTime = null;

 /**
  * Timestamp for when the animation finished or was stopped.
  * @type {?number}
  * @protected
  */
 this.endTime = null;
}
goog.inherits(TransitionBase, EventTarget);


/**
 * Enum for the possible states of an animation.
 * @enum {number}
 */
TransitionBase.State = {
  STOPPED: 0,
  PAUSED: -1,
  PLAYING: 1
};


/**
 * Plays the animation.
 *
 * @param {boolean=} opt_restart Optional parameter to restart the animation.
 * @return {boolean} True iff the animation was started.
 * @override
 */
TransitionBase.prototype.play = goog.abstractMethod;


/**
 * Stops the animation.
 *
 * @param {boolean=} opt_gotoEnd Optional boolean parameter to go the end of
 *     the animation.
 * @override
 */
TransitionBase.prototype.stop = goog.abstractMethod;


/**
 * Pauses the animation.
 */
TransitionBase.prototype.pause = goog.abstractMethod;


/**
 * Returns the current state of the animation.
 * @return {TransitionBase.State} State of the animation.
 */
TransitionBase.prototype.getStateInternal = function() {
 return this.state_;
};


/**
 * Sets the current state of the animation to playing.
 * @protected
 */
TransitionBase.prototype.setStatePlaying = function() {
 this.state_ = TransitionBase.State.PLAYING;
};


/**
 * Sets the current state of the animation to paused.
 * @protected
 */
TransitionBase.prototype.setStatePaused = function() {
 this.state_ = TransitionBase.State.PAUSED;
};


/**
 * Sets the current state of the animation to stopped.
 * @protected
 */
TransitionBase.prototype.setStateStopped = function() {
 this.state_ = TransitionBase.State.STOPPED;
};


/**
 * @return {boolean} True iff the current state of the animation is playing.
 */
TransitionBase.prototype.isPlaying = function() {
 return this.state_ == TransitionBase.State.PLAYING;
};


/**
 * @return {boolean} True iff the current state of the animation is paused.
 */
TransitionBase.prototype.isPaused = function() {
 return this.state_ == TransitionBase.State.PAUSED;
};


/**
 * @return {boolean} True iff the current state of the animation is stopped.
 */
TransitionBase.prototype.isStopped = function() {
 return this.state_ == TransitionBase.State.STOPPED;
};


/**
 * Dispatches the BEGIN event. Sub classes should override this instead
 * of listening to the event, and call this instead of dispatching the event.
 * @protected
 */
TransitionBase.prototype.onBegin = function() {
 this.dispatchAnimationEvent(Transition.EventType.BEGIN);
};


/**
 * Dispatches the END event. Sub classes should override this instead
 * of listening to the event, and call this instead of dispatching the event.
 * @protected
 */
TransitionBase.prototype.onEnd = function() {
 this.dispatchAnimationEvent(Transition.EventType.END);
};


/**
 * Dispatches the FINISH event. Sub classes should override this instead
 * of listening to the event, and call this instead of dispatching the event.
 * @protected
 */
TransitionBase.prototype.onFinish = function() {
 this.dispatchAnimationEvent(Transition.EventType.FINISH);
};


/**
 * Dispatches the PAUSE event. Sub classes should override this instead
 * of listening to the event, and call this instead of dispatching the event.
 * @protected
 */
TransitionBase.prototype.onPause = function() {
 this.dispatchAnimationEvent(Transition.EventType.PAUSE);
};


/**
 * Dispatches the PLAY event. Sub classes should override this instead
 * of listening to the event, and call this instead of dispatching the event.
 * @protected
 */
TransitionBase.prototype.onPlay = function() {
 this.dispatchAnimationEvent(Transition.EventType.PLAY);
};


/**
 * Dispatches the RESUME event. Sub classes should override this instead
 * of listening to the event, and call this instead of dispatching the event.
 * @protected
 */
TransitionBase.prototype.onResume = function() {
 this.dispatchAnimationEvent(Transition.EventType.RESUME);
};


/**
 * Dispatches the STOP event. Sub classes should override this instead
 * of listening to the event, and call this instead of dispatching the event.
 * @protected
 */
TransitionBase.prototype.onStop = function() {
 this.dispatchAnimationEvent(Transition.EventType.STOP);
};


/**
 * Dispatches an event object for the current animation.
 * @param {string} type Event type that will be dispatched.
 * @protected
 */
TransitionBase.prototype.dispatchAnimationEvent = function(type) {
 this.dispatchEvent(type);
};
