/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Helpers for defining EventTypes.
 */


import BrowserFeature from './browserfeature.js';

import * as userAgent from '../useragent/useragent.js';


/**
 * Returns a prefixed event name for the current browser.
 * @param {string} eventName The name of the event.
 * @return {string} The prefixed event name.
 * @package
 */
export function getVendorPrefixedName(eventName) {
 return userAgent.WEBKIT ? 'webkit' + eventName : eventName.toLowerCase();
}


/**
 * Returns one of the given pointer fallback event names in order of preference:
 *   1. pointerEventName
 *   2. msPointerEventName
 *   3. fallbackEventName
 * @param {string} pointerEventName
 * @param {string} msPointerEventName
 * @param {string} fallbackEventName
 * @return {string} The supported pointer or fallback (mouse or touch) event
 *     name.
 * @package
 */
export function getPointerFallbackEventName(pointerEventName, msPointerEventName, fallbackEventName) {
 if (BrowserFeature.POINTER_EVENTS) {
   return pointerEventName;
 }
 if (BrowserFeature.MSPOINTER_EVENTS) {
   return msPointerEventName;
 }
 return fallbackEventName;
}
