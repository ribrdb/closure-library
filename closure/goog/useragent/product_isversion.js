/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Functions for understanding the version of the browser.
 * This is pulled out of product.js to ensure that only builds that need
 * this functionality actually get it, without having to rely on the compiler
 * to strip out unneeded pieces.
 *
 * TODO(nnaze): Move to more appropriate filename/namespace.
 */


import platform from '../labs/useragent/platform.js';

import * as googString from '../string/string.js';
import * as userAgent from './useragent.js';
import * as product from './product.js';


/**
 * @return {string} The string that describes the version number of the user
 *     agent product.  This is a string rather than a number because it may
 *     contain 'b', 'a', and so on.
 * @private
 */
export function determineVersion_() {
  // All browsers have different ways to detect the version and they all have
  // different naming schemes.

  if (product.FIREFOX) {
    // Firefox/2.0.0.1 or Firefox/3.5.3
    return getFirstRegExpGroup_(/Firefox\/([0-9.]+)/);
  }

  if (product.IE || product.EDGE ||
      product.OPERA) {
    return userAgent.VERSION;
  }

  if (product.CHROME) {
    // CriOS is Chrome on iOS, but iPadOS 13+ spoofs macOS by default.
    // So it's possible that CriOS appears to be running on macOS.
    if (platform.isIos() ||
        platform.isMacintosh()) {
      // CriOS/56.0.2924.79
      const chromeIosVersion =
          getFirstRegExpGroup_(/CriOS\/([0-9.]+)/);
      if (chromeIosVersion) {
        return chromeIosVersion;
      }
    }
    // Chrome/4.0.223.1
    return getFirstRegExpGroup_(/Chrome\/([0-9.]+)/);
  }

  // This replicates legacy logic, which considered Safari and iOS to be
  // different products.
  if (product.SAFARI && !platform.isIos()) {
    // Version/5.0.3
    //
    // NOTE: Before version 3, Safari did not report a product version number.
    // The product version number for these browsers will be the empty string.
    // They may be differentiated by WebKit version number in goog.userAgent.
    return getFirstRegExpGroup_(/Version\/([0-9.]+)/);
  }

  if (product.IPHONE || product.IPAD) {
    // Mozilla/5.0 (iPod; U; CPU like Mac OS X; en) AppleWebKit/420.1
    // (KHTML, like Gecko) Version/3.0 Mobile/3A100a Safari/419.3
    // Version is the browser version, Mobile is the build number. We combine
    // the version string with the build number: 3.0.3A100a for the example.
    var arr =
        execRegExp_(/Version\/(\S+).*Mobile\/(\S+)/);
    if (arr) {
      return arr[1] + '.' + arr[2];
    }
  } else if (product.ANDROID) {
    // Mozilla/5.0 (Linux; U; Android 0.5; en-us) AppleWebKit/522+
    // (KHTML, like Gecko) Safari/419.3
    //
    // Mozilla/5.0 (Linux; U; Android 1.0; en-us; dream) AppleWebKit/525.10+
    // (KHTML, like Gecko) Version/3.0.4 Mobile Safari/523.12.2
    //
    // Prefer Version number if present, else make do with the OS number
    var version =
        getFirstRegExpGroup_(/Android\s+([0-9.]+)/);
    if (version) {
      return version;
    }

    return getFirstRegExpGroup_(/Version\/([0-9.]+)/);
  }

  return '';
};


/**
 * Return the first group of the given regex.
 * @param {!RegExp} re Regular expression with at least one group.
 * @return {string} Contents of the first group or an empty string if no match.
 * @private
 */
function getFirstRegExpGroup_(re) {
  var arr = execRegExp_(re);
  return arr ? arr[1] : '';
};


/**
 * Run regexp's exec() on the userAgent string.
 * @param {!RegExp} re Regular expression.
 * @return {?IArrayLike<string>} A result array, or null for no match.
 * @private
 */
function execRegExp_(re) {
  return re.exec(userAgent.getUserAgentString());
};


/**
 * The version of the user agent. This is a string because it might contain
 * 'b' (as in beta) as well as multiple dots.
 * @type {string}
 */
export var VERSION = determineVersion_();


/**
 * Whether the user agent product version is higher or the same as the given
 * version.
 *
 * @param {string|number} version The version to check.
 * @return {boolean} Whether the user agent product version is higher or the
 *     same as the given version.
 */
export function isVersion(version) {
  return googString.compareVersions(VERSION, version) >=
      0;
}
