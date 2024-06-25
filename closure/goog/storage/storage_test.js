/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/** @fileoverview Unit tests for the storage interface. */

goog.setTestOnly();

import { ErrorCode } from './errorcode.js';
import { FakeMechanism } from '../testing/storage/fakemechanism.js';
import { Storage as StorageStorage } from './storage.js';
import * as asserts from '../testing/asserts.js';
import * as functions from '../functions/functions.js';
import * as storageTester from './storagetester.js';
import { testSuite } from '../testing/testsuite.js';

testSuite({
  testBasicOperations() {
    const mechanism = new FakeMechanism();
    const storage = new StorageStorage(mechanism);
    storageTester.runBasicTests(storage);
  },

  testMechanismCommunication() {
    const mechanism = new FakeMechanism();
    const storage = new StorageStorage(mechanism);

    // Invalid JSON.
    mechanism.set('first', '');
    assertEquals(ErrorCode.INVALID_VALUE, assertThrows(() => {
                   storage.get('first');
                 }));
    mechanism.set('second', '(');
    assertEquals(ErrorCode.INVALID_VALUE, assertThrows(() => {
                   storage.get('second');
                 }));

    // Cleaning up.
    storage.remove('first');
    storage.remove('second');
    assertUndefined(storage.get('first'));
    assertUndefined(storage.get('second'));
    assertNull(mechanism.get('first'));
    assertNull(mechanism.get('second'));
  },

  testMechanismFailsGracefullyOnInvalidValue() {
    const mechanism = {
      get: functions.error('Invalid value'),
    };
    /** @suppress {checkTypes} suppression added to enable type checking */
    const storage = new StorageStorage(mechanism);
    assertUndefined(storage.get('foobar'));
  },
});
