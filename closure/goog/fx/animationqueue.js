/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A class which automatically plays through a queue of
 * animations.  AnimationParallelQueue and AnimationSerialQueue provide
 * specific implementations of the abstract class AnimationQueue.
 *
 * @see ../demos/animationqueue.html
 */

import * as array from '../array/array.js';

import * as asserts from '../asserts/asserts.js';
import * as events from '../events/events.js';
import { Animation } from './animation.js';
import { Transition } from './transition.js';
import { TransitionBase } from './transitionbase.js';
const {Event} = goog.requireType('goog.events.event');



/**
 * Constructor for AnimationQueue object.
 *
 * @constructor
 * @struct
 * @extends {TransitionBase}
 */
export function AnimationQueue() {
  AnimationQueue.base(this, 'constructor');

  /**
     * An array holding all animations in the queue.
     * @type {Array<TransitionBase>}
     * @protected
     */
  this.queue = [];
}
goog.inherits(AnimationQueue, TransitionBase);


/**
 * Pushes an Animation to the end of the queue.
 * @param {TransitionBase} animation The animation to add to the queue.
 */
AnimationQueue.prototype.add = function(animation) {
  asserts.assert(
      this.isStopped(),
      'Not allowed to add animations to a running animation queue.');

  if (array.contains(this.queue, animation)) {
    return;
  }

  this.queue.push(animation);
  events.listen(
      animation, Transition.EventType.FINISH, this.onAnimationFinish,
      false, this);
};


/**
 * Removes an Animation from the queue.
 * @param {Animation} animation The animation to remove.
 */
AnimationQueue.prototype.remove = function(animation) {
  asserts.assert(
      this.isStopped(),
      'Not allowed to remove animations from a running animation queue.');

  if (array.remove(this.queue, animation)) {
    events.unlisten(
        animation, Transition.EventType.FINISH, this.onAnimationFinish,
        false, this);
  }
};


/**
 * Handles the event that an animation has finished.
 * @param {Event} e The finishing event.
 * @protected
 */
AnimationQueue.prototype.onAnimationFinish = goog.abstractMethod;


/**
 * Disposes of the animations.
 * @override
 */
AnimationQueue.prototype.disposeInternal = function() {
  this.queue.forEach(function(animation) {
    animation.dispose();
  });
  this.queue.length = 0;

  AnimationQueue.base(this, 'disposeInternal');
};



/**
 * Constructor for AnimationParallelQueue object.
 * @constructor
 * @struct
 * @extends {AnimationQueue}
 */
export function AnimationParallelQueue() {
  AnimationParallelQueue.base(this, 'constructor');

  /**
   * Number of finished animations.
   * @type {number}
   * @private
   */
  this.finishedCounter_ = 0;
}
goog.inherits(AnimationParallelQueue, AnimationQueue);


/** @override */
AnimationParallelQueue.prototype.play = function(opt_restart) {
  if (this.queue.length == 0) {
    return false;
  }

  if (opt_restart || this.isStopped()) {
    this.finishedCounter_ = 0;
    this.onBegin();
  } else if (this.isPlaying()) {
    return false;
  }

  this.onPlay();
  if (this.isPaused()) {
    this.onResume();
  }
  var resuming = this.isPaused() && !opt_restart;

  this.startTime = goog.now();
  this.endTime = null;
  this.setStatePlaying();

  this.queue.forEach(function(anim) {
    if (!resuming || anim.isPaused()) {
      anim.play(opt_restart);
    }
  });

  return true;
};


/** @override */
AnimationParallelQueue.prototype.pause = function() {
  if (this.isPlaying()) {
    this.queue.forEach(function(anim) {
      if (anim.isPlaying()) {
        anim.pause();
      }
    });

    this.setStatePaused();
    this.onPause();
  }
};


/** @override */
AnimationParallelQueue.prototype.stop = function(opt_gotoEnd) {
  this.queue.forEach(function(anim) {
    if (!anim.isStopped()) {
      anim.stop(opt_gotoEnd);
    }
  });

  this.setStateStopped();
  this.endTime = goog.now();

  this.onStop();
  this.onEnd();
};


/** @override */
AnimationParallelQueue.prototype.onAnimationFinish = function(e) {
  this.finishedCounter_++;
  if (this.finishedCounter_ == this.queue.length) {
    this.endTime = goog.now();

    this.setStateStopped();

    this.onFinish();
    this.onEnd();
  }
};



/**
 * Constructor for AnimationSerialQueue object.
 * @constructor
 * @struct
 * @extends {AnimationQueue}
 */
export function AnimationSerialQueue() {
  AnimationSerialQueue.base(this, 'constructor');

  /**
   * Current animation in queue currently active.
   * @type {number}
   * @private
   */
  this.current_ = 0;
}
goog.inherits(AnimationSerialQueue, AnimationQueue);


/** @override */
AnimationSerialQueue.prototype.play = function(opt_restart) {
  if (this.queue.length == 0) {
    return false;
  }

  if (opt_restart || this.isStopped()) {
    if (this.current_ < this.queue.length &&
        !this.queue[this.current_].isStopped()) {
      this.queue[this.current_].stop(false);
    }

    this.current_ = 0;
    this.onBegin();
  } else if (this.isPlaying()) {
    return false;
  }

  this.onPlay();
  if (this.isPaused()) {
    this.onResume();
  }

  this.startTime = goog.now();
  this.endTime = null;
  this.setStatePlaying();

  this.queue[this.current_].play(opt_restart);

  return true;
};


/** @override */
AnimationSerialQueue.prototype.pause = function() {
  if (this.isPlaying()) {
    this.queue[this.current_].pause();
    this.setStatePaused();
    this.onPause();
  }
};


/** @override */
AnimationSerialQueue.prototype.stop = function(opt_gotoEnd) {
  this.setStateStopped();
  this.endTime = goog.now();

  if (opt_gotoEnd) {
    for (var i = this.current_; i < this.queue.length; ++i) {
      var anim = this.queue[i];
      // If the animation is stopped, start it to initiate rendering.  This
      // might be needed to make the next line work.
      if (anim.isStopped()) anim.play();
      // If the animation is not done, stop it and go to the end state of the
      // animation.
      if (!anim.isStopped()) anim.stop(true);
    }
  } else if (this.current_ < this.queue.length) {
    this.queue[this.current_].stop(false);
  }

  this.onStop();
  this.onEnd();
};


/** @override */
AnimationSerialQueue.prototype.onAnimationFinish = function(e) {
  if (this.isPlaying()) {
    this.current_++;
    if (this.current_ < this.queue.length) {
      this.queue[this.current_].play();
    } else {
      this.endTime = goog.now();
      this.setStateStopped();

      this.onFinish();
      this.onEnd();
    }
  }
};
