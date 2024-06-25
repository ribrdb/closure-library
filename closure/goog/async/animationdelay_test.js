/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly('goog.async.AnimationDelayTest');

import { AnimationDelay } from './animationdelay.js';
import { Promise } from '../promise/promise.js';
import { PropertyReplacer } from '../testing/propertyreplacer.js';
import { Timer } from '../timer/timer.js';
import { testSuite } from '../testing/testsuite.js';

const TEST_DELAY = 50;
const stubs = new PropertyReplacer();

testSuite({
  tearDown: function() {
    stubs.reset();
  },

  testStart: function() {
    let resolver = Promise.withResolver();
    const start = Date.now();
    const delay = new AnimationDelay(function(end) {
      assertNotNull(resolver);  // fail if called multiple times
      resolver.resolve();
      resolver = null;
    });

    delay.start();

    return resolver.promise;
  },

  testStop: function() {
    const resolver = Promise.withResolver();
    const start = Date.now();
    const delay = new AnimationDelay(function(end) {
      resolver.reject();
    });

    delay.start();
    delay.stop();

    return Timer.promise(TEST_DELAY).then(function() {
      resolver.resolve();
      return resolver.promise;
    });
  },

  testAlwaysUseGoogNowForHandlerTimestamp: function() {
    const resolver = Promise.withResolver();
    const expectedValue = 12345.1;
    stubs.set(Date, 'now', function() { return expectedValue; });

    const delay = new AnimationDelay(function(timestamp) {
      assertEquals(expectedValue, timestamp);
      resolver.resolve();
    });

    delay.start();

    return resolver.promise;
  },

  testStartIfActive: function() {
    const delay = new AnimationDelay(() => {});
    delay.start();

    let startWasCalled = false;
    stubs.set(AnimationDelay.prototype, 'start', function() {
      startWasCalled = true;
    });

    delay.startIfNotActive();
    assertEquals(startWasCalled, false);
    delay.stop();
    delay.startIfNotActive();
    assertEquals(startWasCalled, true);
  }
});
