/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { UndoRedoState } from './undoredostate.js';
import { testSuite } from '../../testing/testsuite.js';

let asyncState;
let syncState;

testSuite({
  setUp() {
    asyncState = new UndoRedoState(true);
    syncState = new UndoRedoState(false);
  },

  testIsAsynchronous() {
    assertTrue(
        'Must return true for asynchronous state', asyncState.isAsynchronous());
    assertFalse(
        'Must return false for synchronous state', syncState.isAsynchronous());
  },
});
