/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { Animation } from '../animation.js';
import { AnimationDelay } from '../../async/animationdelay.js';
import { Delay } from '../../async/delay.js';
import { MockClock } from '../../testing/mockclock.js';
import { PropertyReplacer } from '../../testing/propertyreplacer.js';
import * as events from '../../events/events.js';
import * as functions from '../../functions/functions.js';
import * as fxAnim from './anim.js';
import googObject from '../../object/object.js';
import { recordFunction } from '../../testing/recordfunction.js';
import { testSuite } from '../../testing/testsuite.js';
import * as userAgent from '../../useragent/useragent.js';

let clock;
let replacer;

/**
 * @param {!Function} delayType The constructor for Delay or AnimationDelay.
 *     The methods will be mocked out.
 * @suppress {checkTypes,visibility} suppression added to enable type checking
 */
function registerAndUnregisterAnimationWithMocks(delayType) {
  let timerCount = 0;

  replacer.set(delayType.prototype, 'start', () => {
    timerCount++;
  });
  replacer.set(delayType.prototype, 'stop', () => {
    timerCount--;
  });
  replacer.set(delayType.prototype, 'isActive', () => timerCount > 0);

  const forbiddenDelayType =
      delayType == AnimationDelay ? Delay : AnimationDelay;
  replacer.set(forbiddenDelayType.prototype, 'start', functions.error());
  replacer.set(forbiddenDelayType.prototype, 'stop', functions.error());
  replacer.set(forbiddenDelayType.prototype, 'isActive', functions.error());

  const anim = new Animation([0], [1], 1000);
  const anim2 = new Animation([0], [1], 1000);

  fxAnim.registerAnimation(anim);

  assertTrue(
      'Should contain the animation',
      googObject.containsValue(fxAnim.activeAnimations_, anim));
  assertEquals('Should have called start once', 1, timerCount);

  fxAnim.registerAnimation(anim2);

  assertEquals('Should not have called start again', 1, timerCount);

  // Add anim again.
  fxAnim.registerAnimation(anim);
  assertTrue(
      'Should contain the animation',
      googObject.containsValue(fxAnim.activeAnimations_, anim));
  assertEquals('Should not have called start again', 1, timerCount);

  fxAnim.unregisterAnimation(anim);
  assertFalse(
      'Should not contain the animation',
      googObject.containsValue(fxAnim.activeAnimations_, anim));
  assertEquals('clearTimeout should not have been called', 1, timerCount);

  fxAnim.unregisterAnimation(anim2);
  assertEquals('There should be no remaining timers', 0, timerCount);

  // Make sure we don't trigger setTimeout or setInterval.
  clock.tick(1000);
  fxAnim.cycleAnimations_(Date.now());

  assertEquals('There should be no remaining timers', 0, timerCount);

  anim.dispose();
  anim2.dispose();
}

testSuite({
  setUpPage() {
    clock = new MockClock(true);
  },

  tearDownPage() {
    clock.dispose();
  },

  setUp() {
    replacer = new PropertyReplacer();
  },

  tearDown() {
    replacer.reset();
    fxAnim.tearDown();
  },

  testDelayWithMocks() {
    fxAnim.setAnimationWindow(null);
    registerAndUnregisterAnimationWithMocks(Delay);
  },

  testAnimationDelayWithMocks() {
    fxAnim.setAnimationWindow(window);
    registerAndUnregisterAnimationWithMocks(AnimationDelay);
  },

  /** @suppress {visibility} suppression added to enable type checking */
  testRegisterAndUnregisterAnimationWithRequestAnimationFrameGecko() {
    // Only FF4 onwards support requestAnimationFrame.
    if (!userAgent.GECKO || userAgent.isVersionOrHigher('17')) {
      return;
    }

    fxAnim.setAnimationWindow(window);

    const anim = new Animation([0], [1], 1000);
    const anim2 = new Animation([0], [1], 1000);

    fxAnim.registerAnimation(anim);

    assertTrue(
        'Should contain the animation',
        googObject.containsValue(fxAnim.activeAnimations_, anim));

    assertEquals(
        'Should have listen to MozBeforePaint once', 1,
        events.getListeners(window, 'MozBeforePaint', false).length);

    fxAnim.registerAnimation(anim2);

    assertEquals(
        'Should not add more listener for MozBeforePaint', 1,
        events.getListeners(window, 'MozBeforePaint', false).length);

    // Add anim again.
    fxAnim.registerAnimation(anim);
    assertTrue(
        'Should contain the animation',
        googObject.containsValue(fxAnim.activeAnimations_, anim));
    assertEquals(
        'Should not add more listener for MozBeforePaint', 1,
        events.getListeners(window, 'MozBeforePaint', false).length);

    fxAnim.unregisterAnimation(anim);
    assertFalse(
        'Should not contain the animation',
        googObject.containsValue(fxAnim.activeAnimations_, anim));
    assertEquals(
        'Should not clear listener for MozBeforePaint yet', 1,
        events.getListeners(window, 'MozBeforePaint', false).length);

    fxAnim.unregisterAnimation(anim2);
    assertEquals(
        'There should be no more listener for MozBeforePaint', 0,
        events.getListeners(window, 'MozBeforePaint', false).length);

    anim.dispose();
    anim2.dispose();

    fxAnim.setAnimationWindow(null);
  },

  /** @suppress {visibility} suppression added to enable type checking */
  testRegisterUnregisterAnimation() {
    const anim = new Animation([0], [1], 1000);

    fxAnim.registerAnimation(anim);

    assertTrue(
        'There should be an active timer',
        fxAnim.getAnimationDelay_() && fxAnim.getAnimationDelay_().isActive());
    assertEquals(
        'There should be an active animations', 1,
        googObject.getCount(fxAnim.activeAnimations_));

    fxAnim.unregisterAnimation(anim);

    assertTrue(
        'There should be no active animations',
        googObject.isEmpty(fxAnim.activeAnimations_));
    assertFalse(
        'There should be no active timer',
        fxAnim.getAnimationDelay_() && fxAnim.getAnimationDelay_().isActive());

    anim.dispose();
  },

  /** @suppress {missingProperties} suppression added to enable type checking */
  testCycleWithMockClock() {
    fxAnim.setAnimationWindow(null);
    const anim = new Animation([0], [1], 1000);
    anim.onAnimationFrame = recordFunction();

    fxAnim.registerAnimation(anim);
    clock.tick(fxAnim.TIMEOUT);

    assertEquals(1, anim.onAnimationFrame.getCallCount());
  },

  /** @suppress {missingProperties} suppression added to enable type checking */
  testCycleWithMockClockAndAnimationWindow() {
    fxAnim.setAnimationWindow(window);
    const anim = new Animation([0], [1], 1000);
    anim.onAnimationFrame = recordFunction();

    fxAnim.registerAnimation(anim);
    clock.tick(fxAnim.TIMEOUT);

    assertEquals(1, anim.onAnimationFrame.getCallCount());
  },
});
