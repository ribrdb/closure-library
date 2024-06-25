/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { Listenable } from './listenable.js';
import { testSuite } from '../testing/testsuite.js';

testSuite({
  testIsImplementedBy() {
    const ListenableClass = class {};
    Listenable.addImplementation(ListenableClass);

    const NonListenableClass = class {};

    assertTrue(Listenable.isImplementedBy(new ListenableClass()));
    assertFalse(Listenable.isImplementedBy(new NonListenableClass()));
  },
});
