/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Description of this file.
 */
goog.setTestOnly();

import { PropertyReplacer } from '../../testing/propertyreplacer.js';
import * as browser from './browser.js';
import extra from './extra.js';
import { testAgents } from './test_agents.js';
import { testSuite } from '../../testing/testsuite.js';
import util from './util.js';

const stubs = new PropertyReplacer();

/**
 * Replaces the navigator object on globalThis.
 * @param {?Object|undefined} navigatorObj The navigator object to set
 */
function setGlobalNavigator(navigatorObj) {
  const mockGlobal = {
    'navigator': navigatorObj,
  };
  stubs.set(goog, 'global', mockGlobal);
}

testSuite({
  tearDown: function() {
    stubs.reset();
  },
  testSafariDesktopOnMobile: function() {
    util.setUserAgent(testAgents.SAFARI_13);
    setGlobalNavigator({'maxTouchPoints': 5});
    assertTrue(browser.isSafari());
    assertFalse(browser.isChrome());
    assertTrue(extra.isSafariDesktopOnMobile());

    util.setUserAgent(testAgents.CHROME_IPAD_DESKTOP);
    setGlobalNavigator({'maxTouchPoints': 5});
    assertTrue(browser.isChrome());
    assertFalse(browser.isSafari());
    assertTrue(extra.isSafariDesktopOnMobile());

    setGlobalNavigator({'maxTouchPoints': 0});
    assertFalse(extra.isSafariDesktopOnMobile());

    setGlobalNavigator({});
    assertFalse(extra.isSafariDesktopOnMobile());

    util.setUserAgent(testAgents.IPAD_6);
    assertFalse(extra.isSafariDesktopOnMobile());
  },
});
