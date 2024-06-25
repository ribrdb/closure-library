/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { Box } from '../math/box.js';
import { CssSpriteAnimation } from './cssspriteanimation.js';
import { MockClock } from '../testing/mockclock.js';
import { Size } from '../math/size.js';
import { testSuite } from '../testing/testsuite.js';

let el;
let size;
let box;
const time = 1000;
let anim;
let clock;

function assertBackgroundPosition(x, y) {
  if (typeof el.style.backgroundPositionX != 'undefined') {
    assertEquals(`${x}px`, el.style.backgroundPositionX);
    assertEquals(`${y}px`, el.style.backgroundPositionY);
  } else {
    const bgPos = el.style.backgroundPosition;
    const message = `Expected <${x}px ${y}px>, found <${bgPos}>`;
    if (x == y) {
      // when x and y are the same the browser sometimes collapse the prop
      assertTrue(
          message,
          bgPos == x ||  // in case of 0 without a unit
              bgPos == `${x}px` || bgPos == `${x} ${y}` ||
              bgPos == `${x}px ${y}px`);
    } else {
      assertTrue(
          message,
          bgPos == `${x} ${y}` || bgPos == `${x}px ${y}` ||
              bgPos == `${x} ${y}px` || bgPos == `${x}px ${y}px`);
    }
  }
}

testSuite({
  setUpPage() {
    clock = new MockClock(true);
    el = document.getElementById('test');
    size = new Size(10, 10);
    box = new Box(0, 10, 100, 0);
  },

  tearDownPage() {
    clock.dispose();
  },

  tearDown() {
    anim.clearSpritePosition();
    anim.dispose();
  },

  testAnimation() {
    anim = new CssSpriteAnimation(el, size, box, time);
    anim.play();

    assertBackgroundPosition(0, 0);

    clock.tick(5);
    assertBackgroundPosition(0, 0);

    clock.tick(95);
    assertBackgroundPosition(0, -10);

    clock.tick(100);
    assertBackgroundPosition(0, -20);

    clock.tick(300);
    assertBackgroundPosition(0, -50);

    clock.tick(400);
    assertBackgroundPosition(0, -90);

    // loop around to starting position
    clock.tick(100);
    assertBackgroundPosition(0, 0);

    assertTrue(anim.isPlaying());
    assertFalse(anim.isStopped());

    clock.tick(100);
    assertBackgroundPosition(0, -10);
  },

  testAnimation_disableLoop() {
    anim = new CssSpriteAnimation(
        el, size, box, time, undefined, true /* opt_disableLoop */);
    anim.play();

    assertBackgroundPosition(0, 0);

    clock.tick(5);
    assertBackgroundPosition(0, 0);

    clock.tick(95);
    assertBackgroundPosition(0, -10);

    clock.tick(100);
    assertBackgroundPosition(0, -20);

    clock.tick(300);
    assertBackgroundPosition(0, -50);

    clock.tick(400);
    assertBackgroundPosition(0, -90);

    // loop around to starting position
    clock.tick(100);
    assertBackgroundPosition(0, -90);

    assertTrue(anim.isStopped());
    assertFalse(anim.isPlaying());

    clock.tick(100);
    assertBackgroundPosition(0, -90);
  },

  testClearSpritePosition() {
    anim = new CssSpriteAnimation(el, size, box, time);
    anim.play();

    assertBackgroundPosition(0, 0);

    clock.tick(100);
    assertBackgroundPosition(0, -10);
    anim.clearSpritePosition();

    if (typeof el.style.backgroundPositionX != 'undefined') {
      assertEquals('', el.style.backgroundPositionX);
      assertEquals('', el.style.backgroundPositionY);
    }

    assertEquals('', el.style.backgroundPosition);
  },
});
