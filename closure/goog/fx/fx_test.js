/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { Animation } from './animation.js';
import { MockClock } from '../testing/mockclock.js';
import { PropertyReplacer } from '../testing/propertyreplacer.js';
import * as fxAnim from './anim/anim.js';
import googObject from '../object/object.js';
import { testSuite } from '../testing/testsuite.js';

// TODO(arv): Add tests for the event dispatches.
// TODO(arv): Add tests for the calculation of the coordinates.

let anim2;
let anim;
let clock;
let replacer;

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

    if (anim && anim.dispose) {
      anim.dispose();
    }

    if (anim2 && anim2.dispose) {
      anim2.dispose();
    }
  },

  testAnimationConstructor() {
    assertThrows(
        'Should throw since first arg is not an array', /**
                                                           @suppress {checkTypes}
                                                           suppression added to
                                                           enable type checking
                                                         */
        () => {
          new Animation(1, [2], 3);
        });
    assertThrows(
        'Should throw since second arg is not an array', /**
                                                            @suppress {checkTypes}
                                                            suppression added to
                                                            enable type checking
                                                          */
        () => {
          new Animation([1], 2, 3);
        });
    assertThrows('Should throw since the length are different', () => {
      new Animation([0, 1], [2], 3);
    });
  },

  /** @suppress {visibility} suppression added to enable type checking */
  testPlayAndStopDoesNotLeaveAnyActiveAnimations() {
    anim = new Animation([0], [1], 1000);

    assertTrue(
        'There should be no active animations',
        googObject.isEmpty(fxAnim.activeAnimations_));

    anim.play();
    assertEquals(
        'There should be one active animations', 1,
        googObject.getCount(fxAnim.activeAnimations_));

    anim.stop();
    assertTrue(
        'There should be no active animations',
        googObject.isEmpty(fxAnim.activeAnimations_));

    anim.play();
    assertEquals(
        'There should be one active animations', 1,
        googObject.getCount(fxAnim.activeAnimations_));

    anim.pause();
    assertTrue(
        'There should be no active animations',
        googObject.isEmpty(fxAnim.activeAnimations_));
  },
});
