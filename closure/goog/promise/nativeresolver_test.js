/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { NativeResolver } from './nativeresolver.js';
import { testSuite } from '../testing/testsuite.js';

let resolver;

testSuite({
  setUp() {
    resolver = new NativeResolver();
  },

  testResolve() {
    resolver.resolve('test');
    return resolver.promise.then((val) => {
      assertEquals('test', val);
    }, fail);
  },

  testReject() {
    resolver.reject(new Error('test'));
    return resolver.promise.then(fail, (e) => {
      assertEquals('test', e.message);
    });
  }
});
