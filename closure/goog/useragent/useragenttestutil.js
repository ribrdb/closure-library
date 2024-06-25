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

/** @suppress {extraRequire} */
import { isVersion } from './product_isversion.js';

goog.setTestOnly('goog.userAgentTestUtil');


/**
 * Rerun the initialization code to set all of the userAgent constants.
 * @suppress {accessControls}
 */
reinitializeUserAgent = function() {
  // Unfortunately we can't isolate the useragent setting in a function
  // we can call, because things rely on it compiling to nothing when
  // one of the ASSUME flags is set, and the compiler isn't smart enough
  // to do that when the setting is done inside a function that's inlined.
  userAgent.OPERA = browser.isOpera();
  userAgent.IE = browser.isIE();
  userAgent.EDGE = engine.isEdge();
  userAgent.EDGE_OR_IE = userAgent.EDGE || userAgent.IE;
  userAgent.GECKO = engine.isGecko();
  userAgent.WEBKIT = engine.isWebKit();
  userAgent.MOBILE = userAgent.isMobile_();
  userAgent.SAFARI = userAgent.WEBKIT;

  // Platform in goog.userAgent.
  userAgent.PLATFORM = userAgent.determinePlatform_();

  userAgent.MAC = platform.isMacintosh();
  userAgent.WINDOWS = platform.isWindows();
  userAgent.LINUX = userAgent.isLegacyLinux_();
  userAgent.ANDROID = platform.isAndroid();
  userAgent.IPAD = platform.isIpad();
  userAgent.IPHONE = platform.isIphone();
  userAgent.IPOD = platform.isIpod();
  userAgent.KAIOS = platform.isKaiOS();
  userAgent.VERSION = userAgent.determineVersion_();

  // Platform in goog.userAgent.platform.
  userAgentPlatform.VERSION = userAgentPlatform.determineVersion_();

  // Update goog.userAgent.product
  product.ANDROID =
      browser.isAndroidBrowser();
  product.CHROME = browser.isChrome();
  product.EDGE = browser.isEdge();
  product.FIREFOX = browser.isFirefox();
  product.IE = browser.isIE();
  product.IPAD = platform.isIpad();
  product.IPHONE = product.isIphoneOrIpod_();
  product.OPERA = browser.isOpera();
  product.SAFARI = product.isSafariDesktop_();

  // Still uses its own implementation.
  product.VERSION = product.determineVersion_();

  // goog.userAgent.keyboard
  keyboard.MAC_KEYBOARD =
      keyboard.determineMacKeyboard_();

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
export var reinitializeUserAgent;
