/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides test-only functions for setting the user agent.
 */

goog.setTestOnly();

import util from './util.js';
import { resetForTesting as browserResetForTesting } from './browser.js';
import { setUseClientHintsForTesting } from './useragent.js';
import platform from './platform.js';
const {version: platformVersion} = platform;

/**
 * Override the user agent with the given values.
 * @param {string} userAgent The userAgent override.
 * @param {?NavigatorUAData} userAgentData The userAgentData override. Pass
 *     `null` to specify the absence of userAgentData.
 */
function setUserAgent(userAgent, userAgentData) {
  util.setUserAgent(userAgent);
  util.setUserAgentData(userAgentData);
  setUseClientHintsForTesting(!!userAgentData);
}
export { setUserAgent };

/**
 * If the user agent string or user agent data object was overridden using
 * setUserAgent, reset it so that native browser values are used instead.
 */
function resetUserAgent() {
  util.setUserAgent(null);
  util.resetUserAgentData();
  platformVersion.resetForTesting();
  browserResetForTesting();
}
export { resetUserAgent };
