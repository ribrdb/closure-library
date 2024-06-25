/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { CollectableStorage } from './collectablestorage.js';
import { FakeMechanism } from '../testing/storage/fakemechanism.js';
import { MockClock } from '../testing/mockclock.js';
import * as collectableStorageTester from './collectablestoragetester.js';
import * as storageTester from './storagetester.js';
import { testSuite } from '../testing/testsuite.js';

testSuite({
  testBasicOperations() {
    const mechanism = new FakeMechanism();
    const storage = new CollectableStorage(mechanism);
    storageTester.runBasicTests(storage);
  },

  testExpiredKeyCollection() {
    const mechanism = new FakeMechanism();
    const clock = new MockClock(true);
    const storage = new CollectableStorage(mechanism);

    collectableStorageTester.runBasicTests(mechanism, clock, storage);
  },
});
