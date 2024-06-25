/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Classes for doing animations and visual effects.
 *
 * (Based loosly on my animation code for 13thparallel.org, with extra
 * inspiration from the DojoToolkit's modifications to my code)
 */

goog.declareModuleId('goog.fx.animation');

import * as asserts from '../asserts/asserts.js';
import { Event } from '../events/event.js';
import { Transition } from './transition.js';
import { TransitionBase } from './transitionbase.js';
import * as fxAnim from './anim/anim.js';
import { Animated } from './anim/anim.js';



/**
 * Constructor for an animation object.
 * @param {Array<number>} start Array for start coordinates.
 * @param {Array<number>} end Array for end coordinates.
 * @param {number} duration Length of animation in milliseconds.
 * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
 * @constructor
 * @struct
 * @implements {Animated}
 * @implements {Transition}
 * @extends {TransitionBase}
 */
export function Animation(start, end, duration, opt_acc) {
 Animation.base(this, 'constructor');

 if (!Array.isArray(start) || !Array.isArray(end)) {
   throw new Error('Start and end parameters must be arrays');
 }

 if (start.length != end.length) {
   throw new Error('Start and end points must be the same length');
 }

 /**
  * Start point.
  * @type {Array<number>}
  * @protected
  */
 this.startPoint = start;

 /**
  * End point.
  * @type {Array<number>}
  * @protected
  */
 this.endPoint = end;

 /**
  * Duration of animation in milliseconds.
  * @type {number}
  * @protected
  */
 this.duration = duration;

 /**
  * Acceleration function, which must return a number between 0 and 1 for
  * inputs between 0 and 1.
  * @type {Function|undefined}
  * @private
  */
 this.accel_ = opt_acc;

 /**
  * Current coordinate for animation.
  * @type {Array<number>}
  * @protected
  */
 this.coords = [];

 /**
  * Whether the animation should use "right" rather than "left" to position
  * elements in RTL.  This is a temporary flag to allow clients to transition
  * to the new behavior at their convenience.  At some point it will be the
  * default.
  * @type {boolean}
  * @private
  */
 this.useRightPositioningForRtl_ = false;

 /**
  * Current frame rate.
  * @private {number}
  */
 this.fps_ = 0;

 /**
  * Percent of the way through the animation.
  * @protected {number}
  */
 this.progress = 0;

 /**
  * Timestamp for when last frame was run.
  * @protected {?number}
  */
 this.lastFrame = null;
}
goog.inherits(Animation, TransitionBase);


/**
 * @return {number} The duration of this animation in milliseconds.
 */
Animation.prototype.getDuration = function() {
 return this.duration;
};


/**
 * Sets whether the animation should use "right" rather than "left" to position
 * elements.  This is a temporary flag to allow clients to transition
 * to the new component at their convenience.  At some point "right" will be
 * used for RTL elements by default.
 * @param {boolean} useRightPositioningForRtl True if "right" should be used for
 *     positioning, false if "left" should be used for positioning.
 */
Animation.prototype.enableRightPositioningForRtl = function(
    useRightPositioningForRtl) {
 this.useRightPositioningForRtl_ = useRightPositioningForRtl;
};


/**
 * Whether the animation should use "right" rather than "left" to position
 * elements.  This is a temporary flag to allow clients to transition
 * to the new component at their convenience.  At some point "right" will be
 * used for RTL elements by default.
 * @return {boolean} True if "right" should be used for positioning, false if
 *     "left" should be used for positioning.
 */
Animation.prototype.isRightPositioningForRtlEnabled = function() {
 return this.useRightPositioningForRtl_;
};


/**
 * Events fired by the animation.
 * @enum {string}
 */
Animation.EventType = {
  /**
     * Dispatched when played for the first time OR when it is resumed.
     * @deprecated Use Transition.EventType.PLAY.
     */
  PLAY: Transition.EventType.PLAY,

  /**
     * Dispatched only when the animation starts from the beginning.
     * @deprecated Use Transition.EventType.BEGIN.
     */
  BEGIN: Transition.EventType.BEGIN,

  /**
     * Dispatched only when animation is restarted after a pause.
     * @deprecated Use Transition.EventType.RESUME.
     */
  RESUME: Transition.EventType.RESUME,

  /**
     * Dispatched when animation comes to the end of its duration OR stop
     * is called.
     * @deprecated Use Transition.EventType.END.
     */
  END: Transition.EventType.END,

  /**
     * Dispatched only when stop is called.
     * @deprecated Use Transition.EventType.STOP.
     */
  STOP: Transition.EventType.STOP,

  /**
     * Dispatched only when animation comes to its end naturally.
     * @deprecated Use Transition.EventType.FINISH.
     */
  FINISH: Transition.EventType.FINISH,

  /**
     * Dispatched when an animation is paused.
     * @deprecated Use Transition.EventType.PAUSE.
     */
  PAUSE: Transition.EventType.PAUSE,

  /**
   * Dispatched each frame of the animation.  This is where the actual animator
   * will listen.
   */
  ANIMATE: 'animate',

  /**
   * Dispatched when the animation is destroyed.
   */
  DESTROY: 'destroy'
};


/**
 * @deprecated Use fxAnim.TIMEOUT.
 */
Animation.TIMEOUT = fxAnim.TIMEOUT;


/**
 * Enum for the possible states of an animation.
 * @deprecated Use Transition.State instead.
 * @enum {number}
 */
Animation.State = TransitionBase.State;


/**
 * @deprecated Use fxAnim.setAnimationWindow.
 * @param {Window} animationWindow The window in which to animate elements.
 */
Animation.setAnimationWindow = function(animationWindow) {
 fxAnim.setAnimationWindow(animationWindow);
};


/**
 * Starts or resumes an animation.
 * @param {boolean=} opt_restart Whether to restart the
 *     animation from the beginning if it has been paused.
 * @return {boolean} Whether animation was started.
 * @override
 */
Animation.prototype.play = function(opt_restart) {
 if (opt_restart || this.isStopped()) {
   this.progress = 0;
   this.coords = this.startPoint;
 } else if (this.isPlaying()) {
   return false;
 }

 fxAnim.unregisterAnimation(this);

 var now = /** @type {number} */ (goog.now());

 this.startTime = now;
 if (this.isPaused()) {
   this.startTime -= this.duration * this.progress;
 }

 this.endTime = this.startTime + this.duration;
 this.lastFrame = this.startTime;

 if (!this.progress) {
   this.onBegin();
 }

 this.onPlay();

 if (this.isPaused()) {
   this.onResume();
 }

 this.setStatePlaying();

 fxAnim.registerAnimation(this);
 this.cycle(now);

 return true;
};


/**
 * Stops the animation.
 * @param {boolean=} opt_gotoEnd If true the animation will move to the
 *     end coords.
 * @override
 */
Animation.prototype.stop = function(opt_gotoEnd) {
 fxAnim.unregisterAnimation(this);
 this.setStateStopped();

 if (opt_gotoEnd) {
   this.progress = 1;
 }

 this.updateCoords_(this.progress);

 this.onStop();
 this.onEnd();
};


/**
 * Pauses the animation (iff it's playing).
 * @override
 */
Animation.prototype.pause = function() {
 if (this.isPlaying()) {
   fxAnim.unregisterAnimation(this);
   this.setStatePaused();
   this.onPause();
 }
};


/**
 * @return {number} The current progress of the animation, the number
 *     is between 0 and 1 inclusive.
 */
Animation.prototype.getProgress = function() {
 return this.progress;
};


/**
 * Sets the progress of the animation.
 * @param {number} progress The new progress of the animation.
 */
Animation.prototype.setProgress = function(progress) {
 this.progress = progress;
 if (this.isPlaying()) {
   var now = goog.now();
   // If the animation is already playing, we recompute startTime and endTime
   // such that the animation plays consistently, that is:
   // now = startTime + progress * duration.
   this.startTime = now - this.duration * this.progress;
   this.endTime = this.startTime + this.duration;
 }
};


/**
 * Disposes of the animation.  Stops an animation, fires a 'destroy' event and
 * then removes all the event handlers to clean up memory.
 * @override
 * @protected
 */
Animation.prototype.disposeInternal = function() {
 if (!this.isStopped()) {
   this.stop(false);
 }
 this.onDestroy();
 Animation.base(this, 'disposeInternal');
};


/**
 * Stops an animation, fires a 'destroy' event and then removes all the event
 * handlers to clean up memory.
 * @deprecated Use dispose() instead.
 */
Animation.prototype.destroy = function() {
 this.dispose();
};


/** @override */
Animation.prototype.onAnimationFrame = function(now) {
 this.cycle(now);
};


/**
 * Handles the actual iteration of the animation in a timeout
 * @param {number} now The current time.
 */
Animation.prototype.cycle = function(now) {
 asserts.assertNumber(this.startTime);
 asserts.assertNumber(this.endTime);
 asserts.assertNumber(this.lastFrame);
 // Happens in rare system clock reset.
 if (now < this.startTime) {
   this.endTime = now + this.endTime - this.startTime;
   this.startTime = now;
 }
 this.progress = (now - this.startTime) / (this.endTime - this.startTime);

 if (this.progress > 1) {
   this.progress = 1;
 }

 this.fps_ = 1000 / (now - this.lastFrame);
 this.lastFrame = now;

 this.updateCoords_(this.progress);

 // Animation has finished.
 if (this.progress == 1) {
   this.setStateStopped();
   fxAnim.unregisterAnimation(this);

   this.onFinish();
   this.onEnd();

   // Animation is still under way.
 } else if (this.isPlaying()) {
   this.onAnimate();
 }
};


/**
 * Calculates current coordinates, based on the current state.  Applies
 * the acceleration function if it exists.
 * @param {number} t Percentage of the way through the animation as a decimal.
 * @private
 */
Animation.prototype.updateCoords_ = function(t) {
 if (typeof this.accel_ === 'function') {
   t = this.accel_(t);
 }
 this.coords = new Array(this.startPoint.length);
 for (var i = 0; i < this.startPoint.length; i++) {
   this.coords[i] =
       (this.endPoint[i] - this.startPoint[i]) * t + this.startPoint[i];
 }
};


/**
 * Dispatches the ANIMATE event. Sub classes should override this instead
 * of listening to the event.
 * @protected
 */
Animation.prototype.onAnimate = function() {
 this.dispatchAnimationEvent(Animation.EventType.ANIMATE);
};


/**
 * Dispatches the DESTROY event. Sub classes should override this instead
 * of listening to the event.
 * @protected
 */
Animation.prototype.onDestroy = function() {
 this.dispatchAnimationEvent(Animation.EventType.DESTROY);
};


/** @override */
Animation.prototype.dispatchAnimationEvent = function(type) {
 this.dispatchEvent(new AnimationEvent(type, this));
};



/**
 * Class for an animation event object.
 * @param {string} type Event type.
 * @param {Animation} anim An animation object.
 * @constructor
 * @struct
 * @extends {Event}
 */
export function AnimationEvent(type, anim) {
 AnimationEvent.base(this, 'constructor', type);

 /**
  * The current coordinates.
  * @type {Array<number>}
  */
 this.coords = anim.coords;

 /**
  * The x coordinate.
  * @type {number}
  */
 this.x = anim.coords[0];

 /**
  * The y coordinate.
  * @type {number}
  */
 this.y = anim.coords[1];

 /**
  * The z coordinate.
  * @type {number}
  */
 this.z = anim.coords[2];

 /**
  * The current duration.
  * @type {number}
  */
 this.duration = anim.duration;

 /**
  * The current progress.
  * @type {number}
  */
 this.progress = anim.getProgress();

 /**
  * Frames per second so far.
  */
 this.fps = anim.fps_;

 /**
  * The state of the animation.
  * @type {number}
  */
 this.state = anim.getStateInternal();

 /**
    * The animation object.
    * @type {Animation}
    */
 // TODO(arv): This can be removed as this is the same as the target
 this.anim = anim;
}
goog.inherits(AnimationEvent, Event);


/**
 * Returns the coordinates as integers (rounded to nearest integer).
 * @return {!Array<number>} An array of the coordinates rounded to
 *     the nearest integer.
 */
AnimationEvent.prototype.coordsAsInts = function() {
 return this.coords.map(Math.round);
};
