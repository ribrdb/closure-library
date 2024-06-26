/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { ErrorHandler } from './errorhandler.js';
import * as entryPointRegistry from './entrypointregistry.js';
import { testSuite } from '../testing/testsuite.js';

let lastError;
let errorHandler;
let errorFn;

testSuite({
  setUp() {
    lastError = null;
    errorFn = (message) => {
      throw {message: message};
    };
    errorHandler = new ErrorHandler((ex) => {
      lastError = ex;
    });
    /** @suppress {visibility} suppression added to enable type checking */
    entryPointRegistry.refList_.length = 0;
  },

  testMonitorAndUnmonitor() {
    entryPointRegistry.register((transformer) => {
      errorFn = transformer(errorFn);
    });
    entryPointRegistry.monitorAll(errorHandler);

    let e = assertThrows('expected error', goog.partial(errorFn, 'Hello!'));
    assertEquals('Error in protected function: Hello!', e.message);
    assertEquals('Hello!', lastError.message);

    entryPointRegistry.unmonitorAllIfPossible(errorHandler);

    e = assertThrows('expected error', goog.partial(errorFn, 'Goodbye!'));
    assertEquals('Goodbye!', e.message);
    assertEquals('Hello!', lastError.message);
  },

  testRegisterAfterMonitor() {
    entryPointRegistry.monitorAll(errorHandler);
    entryPointRegistry.register((transformer) => {
      errorFn = transformer(errorFn);
    });

    let e = assertThrows('expected error', goog.partial(errorFn, 'Hello!'));
    assertEquals('Error in protected function: Hello!', e.message);
    assertEquals('Hello!', lastError.message);

    entryPointRegistry.unmonitorAllIfPossible(errorHandler);

    e = assertThrows('expected error', goog.partial(errorFn, 'Goodbye!'));
    assertEquals('Goodbye!', e.message);
    assertEquals('Hello!', lastError.message);
  },

  testInvalidUnmonitor() {
    entryPointRegistry.monitorAll(errorHandler);
    /** @suppress {checkTypes} suppression added to enable type checking */
    const e = assertThrows(
        'expected error',
        goog.partial(
            entryPointRegistry.unmonitorAllIfPossible, new ErrorHandler()));
    assertEquals(
        'Assertion failed: Only the most recent monitor can be unwrapped.',
        e.message);
    entryPointRegistry.unmonitorAllIfPossible(errorHandler);
  },
});
