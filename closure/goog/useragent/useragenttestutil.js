/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Shared test function to reset the constants in
 * userAgent.*
 */

import * as browser from '../labs/useragent/browser.js';

import engine from '../labs/useragent/engine.js';
import platform from '../labs/useragent/platform.js';
import object from '../object/object.js';
import * as userAgent from './useragent.js';
import * as keyboard from './keyboard.js';
import * as userAgentPlatform from './platform.js';
import * as product from './product.js';
import * as productIsVersion from './product_isversion.js';
import { isVersion } from './product_isversion.js';

goog.setTestOnly('goog.userAgentTestUtil');


/**
 * Rerun the initialization code to set all of the userAgent constants.
 * @suppress {accessControls}
 */
export function reinitializeUserAgent() {
  // Unfortunately we can't isolate the useragent setting in a function
  // we can call, because things rely on it compiling to nothing when
  // one of the ASSUME flags is set, and the compiler isn't smart enough
  // to do that when the setting is done inside a function that's inlined.
  userAgent.$set('OPERA', browser.isOpera());
  userAgent.$set('IE', browser.isIE());
  userAgent.$set('EDGE', engine.isEdge());
  userAgent.$set('EDGE_OR_IE', userAgent.EDGE || userAgent.IE);
  userAgent.$set('GECKO', engine.isGecko());
  userAgent.$set('WEBKIT', engine.isWebKit());
  userAgent.$set('MOBILE', userAgent.isMobile_());
  userAgent.$set('SAFARI', userAgent.WEBKIT);

  // Platform in goog.userAgent.
  userAgent.$set('PLATFORM', userAgent.determinePlatform_());

  userAgent.$set('MAC', platform.isMacintosh());
  userAgent.$set('WINDOWS', platform.isWindows());
  userAgent.$set('LINUX', userAgent.isLegacyLinux_());
  userAgent.$set('ANDROID', platform.isAndroid());
  userAgent.$set('IPAD', platform.isIpad());
  userAgent.$set('IPHONE', platform.isIphone());
  userAgent.$set('IPOD', platform.isIpod());
  userAgent.$set('KAIOS', platform.isKaiOS());
  userAgent.$set('VERSION', userAgent.determineVersion_());

  // Platform in goog.userAgent.platform.
  userAgentPlatform.$set('VERSION', userAgentPlatform.determineVersion_());

  // Update goog.userAgent.product
  product.$set('ANDROID',
      browser.isAndroidBrowser());
  product.$set('CHROME', browser.isChrome());
  product.$set('EDGE', browser.isEdge());
  product.$set('FIREFOX', browser.isFirefox());
  product.$set('IE', browser.isIE());
  product.$set('IPAD', platform.isIpad());
  product.$set('IPHONE', product.isIphoneOrIpod_());
  product.$set('OPERA', browser.isOpera());
  product.$set('SAFARI', product.isSafariDesktop_());

  // Still uses its own implementation.
  productIsVersion.$set('VERSION', productIsVersion.determineVersion_());

  // goog.userAgent.keyboard
  keyboard.$set('MAC_KEYBOARD',
      keyboard.determineMacKeyboard_());

  // Reset cache so calls to isVersionOrHigher don't use cached version.
  object.clear(userAgent.isVersionOrHigherCache_);
};


/**
 * Browser definitions.
 * @enum {string}
 */
export var UserAgents = {
  GECKO: 'GECKO',
  IE: 'IE',
  OPERA: 'OPERA',
  WEBKIT: 'WEBKIT',
  EDGE: 'EDGE'
};


/**
 * Return whether a given user agent has been detected.
 * @param {string} agent Value in UserAgents.
 * @return {boolean} Whether the user agent has been detected.
 */
export function getUserAgentDetected(agent) {
  switch (agent) {
    case UserAgents.GECKO:
      return userAgent.GECKO;
    case UserAgents.IE:
      return userAgent.IE;
    case UserAgents.EDGE:
      return userAgent.EDGE;
    case UserAgents.OPERA:
      return userAgent.OPERA;
    case UserAgents.WEBKIT:
      return userAgent.WEBKIT;
  }

  throw new Error('Unrecognized user agent');
}
