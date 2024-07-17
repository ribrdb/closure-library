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
  set(userAgent, 'OPERA', browser.isOpera());
  set(userAgent, 'IE', browser.isIE());
  set(userAgent, 'EDGE', engine.isEdge());
  set(userAgent, 'EDGE_OR_IE', userAgent.EDGE || userAgent.IE);
  set(userAgent, 'GECKO', engine.isGecko());
  set(userAgent, 'WEBKIT', engine.isWebKit());
  set(userAgent, 'MOBILE', userAgent.isMobile_());
  set(userAgent, 'SAFARI', userAgent.WEBKIT);

  // Platform in goog.userAgent.
  set(userAgent, 'PLATFORM', userAgent.determinePlatform_());

  set(userAgent, 'MAC', platform.isMacintosh());
  set(userAgent, 'WINDOWS', platform.isWindows());
  set(userAgent, 'LINUX', userAgent.isLegacyLinux_());
  set(userAgent, 'ANDROID', platform.isAndroid());
  set(userAgent, 'IPAD', platform.isIpad());
  set(userAgent, 'IPHONE', platform.isIphone());
  set(userAgent, 'IPOD', platform.isIpod());
  set(userAgent, 'KAIOS', platform.isKaiOS());
  set(userAgent, 'VERSION', userAgent.determineVersion_());

  // Platform in goog.userAgent.platform.
  set(userAgentPlatform, 'VERSION', userAgentPlatform.determineVersion_());

  // Update goog.userAgent.product
  set(product, 'ANDROID',
      browser.isAndroidBrowser());
  set(product, 'CHROME', browser.isChrome());
  set(product, 'EDGE', browser.isEdge());
  set(product, 'FIREFOX', browser.isFirefox());
  set(product, 'IE', browser.isIE());
  set(product, 'IPAD', platform.isIpad());
  set(product, 'IPHONE', product.isIphoneOrIpod_());
  set(product, 'OPERA', browser.isOpera());
  set(product, 'SAFARI', product.isSafariDesktop_());

  // Still uses its own implementation.
  set(productIsVersion, 'VERSION', productIsVersion.determineVersion_());

  // goog.userAgent.keyboard
  set(keyboard, 'MAC_KEYBOARD',
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

/**
 * 
 * @param {?} obj 
 * @param {string} key 
 * @param {*} value 
 */
function set(obj, key, value) {
  if (typeof obj['$set'] == 'function') {
    obj['$set'](key, value);
  } else {
    obj[key] = value;
  }
}