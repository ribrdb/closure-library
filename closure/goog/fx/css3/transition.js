/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview CSS3 transition base library.
 */

import { Timer } from '../../timer/timer.js';

import * as asserts from '../../asserts/asserts.js';
import { TransitionBase } from '../transitionbase.js';
import * as style from '../../style/style.js';
import * as transition from '../../style/transition.js';



/**
 * A class to handle targeted CSS3 transition. This class
 * handles common features required for targeted CSS3 transition.
 *
 * Browser that does not support CSS3 transition will still receive all
 * the events fired by the transition object, but will not have any transition
 * played. If the browser supports the final state as set in setFinalState
 * method, the element will ends in the final state.
 *
 * Transitioning multiple properties with the same setting is possible
 * by setting Css3Property's property to 'all'. Performing multiple
 * transitions can be done via setting multiple initialStyle,
 * finalStyle and transitions. Css3Property's delay can be used to
 * delay one of the transition. Here is an example for a transition
 * that expands on the width and then followed by the height:
 *
 * <pre>
 *   var animation = new Transition(
 *     element,
 *     duration,
 *     {width: 10px, height: 10px},
 *     {width: 100px, height: 100px},
 *     [
 *       {property: width, duration: 1, timing: 'ease-in', delay: 0},
 *       {property: height, duration: 1, timing: 'ease-in', delay: 1}
 *     ]
 *   );
 * </pre>
 *
 * @param {Element} element The element to be transitioned.
 * @param {number} duration The duration of the transition in seconds.
 *     This should be the longest of all transitions, including any delay.
 * @param {Object} initialStyle Initial style properties of the element before
 *     animating. Set using `style.setStyle`.
 * @param {Object} finalStyle Final style properties of the element after
 *     animating. Set using `style.setStyle`.
 * @param {transition.Css3Property|
 *     Array<transition.Css3Property>} transitions A single CSS3
 *     transition property or an array of it.
 * @extends {TransitionBase}
 * @constructor
 * @struct
 */
export function Transition(element, duration, initialStyle, finalStyle, transitions) {
 Transition.base(this, 'constructor');

 /**
  * Timer id to be used to cancel animation part-way.
  * @private {number}
  */
 this.timerId_;

 /**
  * @type {Element}
  * @private
  */
 this.element_ = element;

 /**
  * @type {number}
  * @private
  */
 this.duration_ = duration;

 /**
  * @type {Object}
  * @private
  */
 this.initialStyle_ = initialStyle;

 /**
  * @type {Object}
  * @private
  */
 this.finalStyle_ = finalStyle;

 /**
   * @type {Array<transition.Css3Property>}
   * @private
   */
 this.transitions_ = Array.isArray(transitions) ? transitions : [transitions];
}
goog.inherits(Transition, TransitionBase);


/** @override */
Transition.prototype.play = function() {
 if (this.isPlaying()) {
   return false;
 }

 this.onBegin();
 this.onPlay();

 this.startTime = goog.now();
 this.setStatePlaying();

 if (transition.isSupported()) {
   style.setStyle(this.element_, this.initialStyle_);
   // Allow element to get updated to its initial state before installing
   // CSS3 transition.
   this.timerId_ = Timer.callOnce(this.play_, undefined, this);
   return true;
 } else {
   this.stop_(false);
   return false;
 }
};


/**
 * Helper method for play method. This needs to be executed on a timer.
 * @private
 */
Transition.prototype.play_ = function() {
 // This measurement of the DOM element causes the browser to recalculate its
 // initial state before the transition starts.
 style.getSize(this.element_);
 transition.set(this.element_, this.transitions_);
 style.setStyle(this.element_, this.finalStyle_);
 this.timerId_ = Timer.callOnce(
     goog.bind(this.stop_, this, false), this.duration_ * 1000);
};


/** @override */
Transition.prototype.stop = function() {
 if (!this.isPlaying()) return;

 this.stop_(true);
};


/**
 * Helper method for stop method.
 * @param {boolean} stopped If the transition was stopped.
 * @private
 */
Transition.prototype.stop_ = function(stopped) {
 transition.removeAll(this.element_);

 // Clear the timer.
 Timer.clear(this.timerId_);

 // Make sure that we have reached the final style.
 style.setStyle(this.element_, this.finalStyle_);

 this.endTime = goog.now();
 this.setStateStopped();

 if (stopped) {
   this.onStop();
 } else {
   this.onFinish();
 }
 this.onEnd();
};


/** @override */
Transition.prototype.disposeInternal = function() {
 this.stop();
 Transition.base(this, 'disposeInternal');
};


/**
 * Pausing CSS3 Transitions in not supported.
 * @override
 */
Transition.prototype.pause = function() {
 asserts.assert(false, 'Css3 transitions does not support pause action.');
};
