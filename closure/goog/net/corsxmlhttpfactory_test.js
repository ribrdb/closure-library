/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { CorsXmlHttpFactory } from './corsxmlhttpfactory.js';
import { testSuite } from '../testing/testsuite.js';

testSuite({
  testBrowserSupport() {
    const requestFactory = new CorsXmlHttpFactory();
    assertTrue(requestFactory.createInstance() instanceof XMLHttpRequest);
  },
});
