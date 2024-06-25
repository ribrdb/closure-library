/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Functions for detecting user's time zone.
 * This work is based on Charlie Luo and Hong Yan's time zone detection work
 * for CBG.
 */
import * as asserts from '../asserts/asserts.js';

import { TimeZoneFingerprint } from './timezonefingerprint.js';


/**
 * Whether to use the native API for time zone detection (if the runtime
 * supports it). You might turn this off if a downstream system can't handle a
 * user's timezone as reported by the browser.
 * @define {boolean}
 */
export var USE_NATIVE_TIMEZONE_DETECTION = goog.define(
    'goog.locale.timeZoneDetection.USE_NATIVE_TIMEZONE_DETECTION',
    goog.FEATURESET_YEAR >= 2021);


/**
 * Whether to include the fingerprint algorithm so it can be used as a fallback.
 * Without this, the code may be stripped for modern browsers that can be
 * assumed to support the native API.
 * @define {boolean}
 */
export var INCLUDE_FINGERPRINT_DETECTION = goog.define(
    'goog.locale.timeZoneDetection.INCLUDE_FINGERPRINT_DETECTION',
    !USE_NATIVE_TIMEZONE_DETECTION);


/** @private {boolean} */
var useNativeTimezoneDetection_ = USE_NATIVE_TIMEZONE_DETECTION;


/**
 * Allows disabling the use of native APIs so that the fingerprinting algorithm
 * can be tested.
 * @param {boolean} useNative
 */
export function useNativeTimezoneDetectionForTesting(useNative) {
  useNativeTimezoneDetection_ = useNative;
}


/**
 * Array of time instances for checking the time zone offset.
 * @type {Array<number>}
 * @private
 */
var TZ_POKE_POINTS_ = [
  1109635200, 1128902400, 1130657000, 1143333000, 1143806400, 1145000000,
  1146380000, 1152489600, 1159800000, 1159500000, 1162095000, 1162075000,
  1162105500
];


/**
 * Calculates time zone fingerprint by poking time zone offsets for 13
 * preselected time points.
 * See {@link TZ_POKE_POINTS_}
 * @param {Date} date Date for calculating the fingerprint.
 * @return {number} Fingerprint of user's time zone setting.
 */
export function getFingerprint(date) {
  var hash = 0;
  var stdOffset;
  var isComplex = false;
  for (var i = 0; i < TZ_POKE_POINTS_.length;
       i++) {
    date.setTime(TZ_POKE_POINTS_[i] * 1000);
    var offset = date.getTimezoneOffset() / 30 + 48;
    if (i == 0) {
      stdOffset = offset;
    } else if (stdOffset != offset) {
      isComplex = true;
    }
    hash = (hash << 2) ^ offset;
  }
  return isComplex ? hash : /** @type {number} */ (stdOffset);
}


/**
 * @return {string?} The local timezone, if the browser supports it and the
 * functionality is enabled.
 * @private
 */
function getNatively_() {
  if (!useNativeTimezoneDetection_) {
    return null;
  }
  if (typeof Intl == 'undefined' || typeof Intl.DateTimeFormat == 'undefined') {
    return null;
  }
  const dateTimeFormat = new Intl.DateTimeFormat();
  if (typeof dateTimeFormat.resolvedOptions == 'undefined') {
    return null;
  }
  return dateTimeFormat.resolvedOptions().timeZone || null;
}


/**
 * Detects browser's time zone setting. If user's country is known, a better
 * time zone choice could be guessed. Note that in many browsers this is
 * available natively as `new Intl.DateTimeFormat().resolvedOptions().timeZone`.
 * @param {string=} opt_country Two-letter ISO 3166 country code.
 * @param {Date=} opt_date Date for calculating the fingerprint. Defaults to the
 *     current date.
 * @return {string} Time zone ID of best guess.
 */
export function detectTimeZone(opt_country, opt_date) {
  asserts.assert(
      USE_NATIVE_TIMEZONE_DETECTION ||
          INCLUDE_FINGERPRINT_DETECTION,
      'At least one of USE_NATIVE_TIMEZONE_DETECTION or ' +
          'INCLUDE_FINGERPRINT_DETECTION must be true');
  const nativeResult = getNatively_();
  if (nativeResult != null) {
    return nativeResult;
  }
  if (!useNativeTimezoneDetection_ ||
      INCLUDE_FINGERPRINT_DETECTION) {
    var date = opt_date || new Date();
    var fingerprint = getFingerprint(date);
    var timeZoneList = TimeZoneFingerprint[fingerprint];
    // Timezones in goog.locale.TimeZoneDetection.TimeZoneMap are in the format
    // US-America/Los_Angeles. Country code needs to be stripped before a
    // timezone is returned.
    if (timeZoneList) {
      if (opt_country) {
        for (var i = 0; i < timeZoneList.length; ++i) {
          if (timeZoneList[i].indexOf(opt_country) == 0) {
            return timeZoneList[i].substring(3);
          }
        }
      }
      return timeZoneList[0].substring(3);
    }
  }
  return '';
}


/**
 * Returns an array of time zones that are consistent with user's platform
 * setting. If user's country is given, only the time zone for that country is
 * returned.
 * @param {string=} opt_country 2 letter ISO 3166 country code. Helps in making
 *     a better guess for user's time zone.
 * @param {Date=} opt_date Date for retrieving timezone list. Defaults to the
 *     current date.
 * @return {!Array<string>} Array of time zone IDs.
 */
export function getTimeZoneList(opt_country, opt_date) {
  var date = opt_date || new Date();
  var fingerprint = getFingerprint(date);
  var timeZoneList = TimeZoneFingerprint[fingerprint];
  if (!timeZoneList) {
    return [];
  }
  var chosenList = [];
  for (var i = 0; i < timeZoneList.length; i++) {
    if (!opt_country || timeZoneList[i].indexOf(opt_country) == 0) {
      chosenList.push(timeZoneList[i].substring(3));
    }
  }
  return chosenList;
}
