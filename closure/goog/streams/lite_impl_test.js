/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { testSuite } from '../testing/testsuite.js';
import liteTestCases from './lite_test_cases.js';
const {TestCases: LiteTestCases} = liteTestCases;
import liteImpl from './lite_impl.js';
const {newReadableStream} = liteImpl;

class TestCases extends LiteTestCases {
  constructor() {
    super(newReadableStream);
  }

  testNewReadableStream_InvalidAttributes() {
    assertThrows(() => {
      newReadableStream({});
    });
    assertThrows(() => {
      newReadableStream({
        start() {},
        pull() {},
      });
    });
    assertThrows(() => {
      newReadableStream({
        start() {},
        cancel() {},
      });
    });
    assertThrows(() => {
      newReadableStream({
        start() {},
        type: 'bytes',
      });
    });
    assertThrows(() => {
      newReadableStream({
        start() {},
        autoAllocateChunkSize: 1,
      });
    });
  }
}

testSuite(new TestCases());
