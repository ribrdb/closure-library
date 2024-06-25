/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import asyncStackTag from './asyncstacktag.js';
import { recordFunction } from '../testing/recordfunction.js';
import { testSuite } from '../testing/testsuite.js';

testSuite({
  testWrap() {
    if (!('createTask' in console)) return;
    const fn = () => {};
    const wrappedFn = asyncStackTag.wrap(fn);
    assertNotEquals(fn, wrappedFn);
    const secondWrappedFn = asyncStackTag.wrap(wrappedFn);
    assertEquals(wrappedFn, secondWrappedFn);
  },

  testWrap_Call() {
    const thisArg = {};
    const args = [1, 2, 3];
    const ret = 4;
    const fn = recordFunction(() => ret);
    const wrappedFn = asyncStackTag.wrap(fn);
    const actualRet = wrappedFn.call(thisArg, ...args);
    fn.assertCallCount(1);
    assertEquals(ret, actualRet);
    assertEquals(thisArg, fn.getLastCall().getThis());
    assertArrayEquals(args, fn.getLastCall().getArguments());
  },
});