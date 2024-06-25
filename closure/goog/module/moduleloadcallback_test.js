/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { ErrorHandler } from '../debug/errorhandler.js';
import { ModuleLoadCallback } from './moduleloadcallback.js';
import * as entryPointRegistry from '../debug/entrypointregistry.js';
import * as functions from '../functions/functions.js';
import { recordFunction } from '../testing/recordfunction.js';
import { testSuite } from '../testing/testsuite.js';

testSuite({
  testProtectEntryPoint() {
    // Test a callback created before the protect method is called.
    const callback1 = new ModuleLoadCallback(functions.error('callback1'));

    const errorFn = recordFunction();
    const errorHandler = new ErrorHandler(errorFn);
    entryPointRegistry.monitorAll(errorHandler);

    assertEquals(0, errorFn.getCallCount());
    assertThrows(goog.bind(callback1.execute, callback1));
    assertEquals(1, errorFn.getCallCount());
    assertContains(
        'callback1', errorFn.getLastCall().getArguments()[0].message);

    // Test a callback created after the protect method is called.
    const callback2 = new ModuleLoadCallback(functions.error('callback2'));
    assertThrows(goog.bind(callback1.execute, callback2));
    assertEquals(2, errorFn.getCallCount());
    assertContains(
        'callback2', errorFn.getLastCall().getArguments()[0].message);
  },
});
