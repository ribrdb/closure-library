/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { ErrorHandlingMechanism } from './errorhandlingmechanism.js';
import { recordFunction } from '../../testing/recordfunction.js';
import { testSuite } from '../../testing/testsuite.js';

const error = new Error();

const submechanism = {
  get: function() {
    throw error;
  },
  set: function() {
    throw error;
  },
  remove: function() {
    throw error;
  },
};

const handler = recordFunction(() => {});
let mechanism;

testSuite({
  setUp() {
    /** @suppress {checkTypes} suppression added to enable type checking */
    mechanism = new ErrorHandlingMechanism(submechanism, handler);
  },

  tearDown() {
    handler.reset();
  },

  testSet() {
    mechanism.set('foo', 'bar');
    assertEquals(1, handler.getCallCount());
    assertArrayEquals(
        [
          error,
          ErrorHandlingMechanism.Operation.SET,
          'foo',
          'bar',
        ],
        handler.getLastCall().getArguments());
  },

  testGet() {
    mechanism.get('foo');
    assertEquals(1, handler.getCallCount());
    assertArrayEquals(
        [
          error,
          ErrorHandlingMechanism.Operation.GET,
          'foo',
        ],
        handler.getLastCall().getArguments());
  },

  testRemove() {
    mechanism.remove('foo');
    assertEquals(1, handler.getCallCount());
    assertArrayEquals(
        [
          error,
          ErrorHandlingMechanism.Operation.REMOVE,
          'foo',
        ],
        handler.getLastCall().getArguments());
  },
});
