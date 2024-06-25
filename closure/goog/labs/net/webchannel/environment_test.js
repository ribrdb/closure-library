/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Unit tests for goog.labs.net.webChannel.environment.
 */

goog.setTestOnly('goog.labs.net.webChannel.EnvironmentTest');

import * as environment from './environment.js';
import { testSuite } from '../../../testing/testsuite.js';
import * as userAgent from '../../../useragent/useragent.js';

testSuite({
  testPollingRequiredForEdge: /**
                                 @suppress {strictPrimitiveOperators}
                                 suppression added to enable type checking
                               */
      function() {
        if (!userAgent.EDGE) return;

        assertTrue(environment.isPollingRequired());

        // 100ms as the lower-bound, enforced in
        // tests
        assertTrue(environment.getPollingInterval() > 100);
      },
});
