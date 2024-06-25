/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Closure user device detection (based on user agent).
 * @see http://en.wikipedia.org/wiki/User_agent
 * For more information on browser brand, platform, or engine see the other
 * sub-namespaces in userAgent (browser, platform, and engine).
 */

import * as userAgent from './useragent.js';

import util from './util.js';

/**
 * Currently we detect the iPhone, iPod and Android mobiles (devices that have
 * both Android and Mobile in the user agent string).
 *
 * @return {boolean} Whether the user is using a mobile device.
 */
export function isMobile() {
 if (util.ASSUME_CLIENT_HINTS_SUPPORT ||
     userAgent.useClientHints() &&
         util.getUserAgentData()) {
   return util.getUserAgentData().mobile;
 }
 return !isTablet() &&
     (util.matchUserAgent('iPod') ||
      util.matchUserAgent('iPhone') ||
      util.matchUserAgent('Android') ||
      util.matchUserAgent('IEMobile'));
}


/**
 * Currently we detect Kindle Fire, iPad, and Android tablets (devices that have
 * Android but not Mobile in the user agent string).
 *
 * @return {boolean} Whether the user is using a tablet.
 */
export function isTablet() {
 if (util.ASSUME_CLIENT_HINTS_SUPPORT ||
     (userAgent.useClientHints() &&
      util.getUserAgentData())) {
   return !util.getUserAgentData().mobile &&
       (util.matchUserAgent('iPad') ||
        util.matchUserAgent('Android') ||
        util.matchUserAgent('Silk'));
 }
 return util.matchUserAgent('iPad') ||
     (util.matchUserAgent('Android') &&
      !util.matchUserAgent('Mobile')) ||
     util.matchUserAgent('Silk');
}


/**
 * @return {boolean} Whether the user is using a desktop computer (which we
 *     assume to be the case if they are not using either a mobile or tablet
 *     device).
 */
export function isDesktop() {
 return !isMobile() &&
     !isTablet();
}
