/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.setTestOnly();

import { DebugWindow } from './debugwindow.js';
import { testSuite } from '../testing/testsuite.js';

testSuite({
  /** @suppress {visibility} suppression added to enable type checking */
  testGetCookieKey() {
    assertEquals(
        'keyNasty_Debug__Identifier_',
        DebugWindow.getCookieKey_('Nasty_Debug =Identifier;', 'key'));
  },
});
