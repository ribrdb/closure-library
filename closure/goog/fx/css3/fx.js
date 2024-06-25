/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A collection of CSS3 targeted animation, based on
 * `Transition`.
 */

import { Transition } from './transition.js';


/**
 * Creates a transition to fade the element.
 * @param {Element} element The element to fade.
 * @param {number} duration Duration in seconds.
 * @param {string} timing The CSS3 timing function.
 * @param {number} startOpacity Starting opacity.
 * @param {number} endOpacity Ending opacity.
 * @return {!Transition} The transition object.
 */
export function fade(element, duration, timing, startOpacity, endOpacity) {
 return new Transition(
     element, duration, {'opacity': startOpacity}, {'opacity': endOpacity},
     {property: 'opacity', duration: duration, timing: timing, delay: 0});
}


/**
 * Creates a transition to fade in the element.
 * @param {Element} element The element to fade in.
 * @param {number} duration Duration in seconds.
 * @return {!Transition} The transition object.
 */
export function fadeIn(element, duration) {
 return fade(element, duration, 'ease-out', 0, 1);
}


/**
 * Creates a transition to fade out the element.
 * @param {Element} element The element to fade out.
 * @param {number} duration Duration in seconds.
 * @return {!Transition} The transition object.
 */
export function fadeOut(element, duration) {
 return fade(element, duration, 'ease-in', 1, 0);
}
