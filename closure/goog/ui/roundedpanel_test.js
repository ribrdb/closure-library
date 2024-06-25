/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import * as RoundedPanel from './roundedpanel.js';
import { CssRoundedPanel, GraphicsRoundedPanel } from './roundedpanel.js';
import { testSuite } from '../testing/testsuite.js';
import * as userAgent from '../useragent/useragent.js';

testSuite({
  /**
   * Tests RoundedPanel.create(), ensuring that the proper instance is
   * created based on user-agent
   */
  testRoundedPanelCreate() {
    const rcp = RoundedPanel.create(
        15, 5, '#cccccc', '#cccccc', RoundedPanel.Corner.ALL);
    if (userAgent.GECKO) {
      assertTrue(
          'For Firefox 3.0+ (uses Gecko 1.9+), an instance of ' +
              'goog.ui.CssRoundedPanel should be returned.',
          rcp instanceof CssRoundedPanel);
    } else if (userAgent.WEBKIT) {
      assertTrue(
          'For Safari 3.0+, an instance of goog.ui.CssRoundedPanel ' +
              'should be returned.',
          rcp instanceof CssRoundedPanel);
    } else if (userAgent.EDGE) {
      assertTrue(
          'For MS Edge, an instance of goog.ui.CssRoundedPanel ' +
              'should be returned.',
          rcp instanceof CssRoundedPanel);
    } else if (userAgent.IE) {
      assertTrue(
          'For Gecko 1.8- (ex. Firefox 2.0-, Camino 1.5-, etc.), ' +
              'IE, Opera, and Safari 2.0-, an instance of ' +
              'goog.ui.GraphicsRoundedPanel should be returned.',
          rcp instanceof GraphicsRoundedPanel);
    } else {
      assertNull('For non-supported user-agents, null is returned.', rcp);
    }
  },
});
