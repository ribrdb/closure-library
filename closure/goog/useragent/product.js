/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Detects the specific browser and not just the rendering engine.
 */

import * as browser from '../labs/useragent/browser.js';

import platform from '../labs/useragent/platform.js';
import * as userAgent from './useragent.js';


/**
 * @define {boolean} Whether the code is running on the Firefox web browser.
 */
export var ASSUME_FIREFOX = goog.define('goog.userAgent.product.ASSUME_FIREFOX', false);


/**
 * @define {boolean} Whether we know at compile-time that the product is an
 *     iPhone.
 */
export var ASSUME_IPHONE = goog.define('goog.userAgent.product.ASSUME_IPHONE', false);


/**
 * @define {boolean} Whether we know at compile-time that the product is an
 *     iPad.
 */
export var ASSUME_IPAD = goog.define('goog.userAgent.product.ASSUME_IPAD', false);


/**
 * @define {boolean} Whether we know at compile-time that the product is an
 *     AOSP browser or WebView inside a pre KitKat Android phone or tablet.
 */
export var ASSUME_ANDROID = goog.define('goog.userAgent.product.ASSUME_ANDROID', false);


/**
 * @define {boolean} Whether the code is running on the Chrome web browser on
 * any platform or AOSP browser or WebView in a KitKat+ Android phone or tablet.
 */
export var ASSUME_CHROME = goog.define('goog.userAgent.product.ASSUME_CHROME', false);


/**
 * @define {boolean} Whether the code is running on the Safari web browser.
 */
export var ASSUME_SAFARI = goog.define('goog.userAgent.product.ASSUME_SAFARI', false);


/**
 * Whether we know the product type at compile-time.
 * @type {boolean}
 * @private
 */
var PRODUCT_KNOWN_ = userAgent.ASSUME_IE ||
    userAgent.ASSUME_EDGE || userAgent.ASSUME_OPERA ||
    ASSUME_FIREFOX ||
    ASSUME_IPHONE ||
    ASSUME_IPAD ||
    ASSUME_ANDROID ||
    ASSUME_CHROME ||
    ASSUME_SAFARI;


/**
 * Whether the code is running on the Opera web browser.
 * @type {boolean}
 */
export var OPERA = userAgent.OPERA;


/**
 * Whether the code is running on an IE web browser.
 * @type {boolean}
 */
export var IE = userAgent.IE;


/**
 * Whether the code is running on an Edge web browser (EdgeHTML based).
 * @type {boolean}
 */
export var EDGE = userAgent.EDGE;


/**
 * Whether the code is running on the Firefox web browser.
 * @type {boolean}
 */
export var FIREFOX = PRODUCT_KNOWN_ ?
    ASSUME_FIREFOX :
    browser.isFirefox();


/**
 * Whether the user agent is an iPhone or iPod (as in iPod touch).
 * @return {boolean}
 * @private
 */
export function isIphoneOrIpod_() {
 return platform.isIphone() ||
     platform.isIpod();
}


/**
 * Whether the code is running on an iPhone or iPod touch.
 *
 * iPod touch is considered an iPhone for legacy reasons.
 * @type {boolean}
 */
export var IPHONE = PRODUCT_KNOWN_ ?
    ASSUME_IPHONE :
    isIphoneOrIpod_();


/**
 * Whether the code is running on an iPad.
 * @type {boolean}
 */
export var IPAD = PRODUCT_KNOWN_ ?
    ASSUME_IPAD :
    platform.isIpad();


/**
 * Whether the code is running on AOSP browser or WebView inside
 * a pre KitKat Android phone or tablet.
 * @type {boolean}
 */
export var ANDROID = PRODUCT_KNOWN_ ?
    ASSUME_ANDROID :
    browser.isAndroidBrowser();


/**
 * Whether the code is running on any Chromium-based web browser on any platform
 * or AOSP browser or WebView in a KitKat+ Android phone or tablet.
 * @type {boolean}
 */
export var CHROME = PRODUCT_KNOWN_ ?
    ASSUME_CHROME :
    browser.isChrome();


/**
 * @return {boolean} Whether the browser is Safari on desktop.
 * @private
 */
export function isSafariDesktop_() {
 return browser.isSafari() &&
     !platform.isIos();
}


/**
 * Whether the code is running on the desktop Safari web browser.
 * Note: the legacy behavior here is only true for Safari not running
 * on iOS.
 * @type {boolean}
 */
export var SAFARI = PRODUCT_KNOWN_ ?
    ASSUME_SAFARI :
    isSafariDesktop_();
