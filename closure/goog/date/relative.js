/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Functions for formatting relative dates.  Such as "3 days ago"
 * "3 hours ago", "14 minutes ago", "12 days ago", "Today", "Yesterday".
 *
 * Closure's I18N formatter for relative dates and times is by default to
 * format strings function. It provides plural forms and many locales
 * using standard data from the Common Data Locale Repository (CLDR).
 */

import { DateTimeFormat } from '../i18n/datetimeformat.js';

import { DateTimePatterns } from '../i18n/datetimepatterns.js';
import { RelativeDateTimeFormat } from '../i18n/relativedatetimeformat.js';
const {DateTime} = goog.requireType('goog.date.date');

/**
 * Number of milliseconds in a minute.
 * @type {number}
 * @private
 */
var MINUTE_MS_ = 60000;


/**
 * Number of milliseconds in a day.
 * @type {number}
 * @private
 */
var DAY_MS_ = 86400000;


/**
 * Limit on number of days in past or future for formatting.
 * Since the timestamp is in milliseconds, the difference in days
 * is limited (10^9 milliseconds = 11.6 days.)
 * @type {number}
 * @private
 */
var FORTNIGHT_ = 14;


/**
 * Unicode UTF-16 surrogate range minimum
 * @type {number}
 * @private
 */
var SURROGATE_LOW_ = 0xd800;


/**
 * Unicode UTF-16 surrogate range maximum
 * @type {number}
 * @private
 */
var SURROGATE_HIGH_ = 0xdfff;


/**
 * Enumeration used to identify time units internally.
 * @enum {number}
 */
export var Unit = {
  MINUTES: 0,
  HOURS: 1,
  DAYS: 2
};


/**
 * Full date formatter.
 * @type {?DateTimeFormat}
 * @private
 */
var fullDateFormatter_;


/**
 * Short time formatter.
 * @type {?DateTimeFormat}
 * @private
 */
var shortTimeFormatter_;


/**
 * Month-date formatter.
 * @type {?DateTimeFormat}
 * @private
 */
var monthDateFormatter_;

/** @private */
export function resetMonthDateFormatter_() {
  monthDateFormatter_ = null;
}


/**
 * Casing mode: default true for backward compatibility
 * True causes formatDay to capitalize first character of
 * the returned string.
 * If false, the string is not changed.
 * @type {boolean}
 * @private
 */
var casingMode_ = true;


/**
 * Handles formatting of time deltas.
 * @private {?TimeDeltaFormatter}
 */
var formatTimeDelta_;


/**
 * Caller-settable function for formatting time. Default is internal
 * formatting using RelativeDateTimeFormat
 * @typedef {function(number, boolean, !Unit): string}
 */
export var TimeDeltaFormatter;


/**
 * Sets a different formatting function for time deltas ("3 days ago").
 * While its visibility is public, this function is Closure-internal and should
 * not be used in application code.
 * @param {!TimeDeltaFormatter} formatter The function to use
 *     for formatting time deltas (i.e. relative times).
 */
export function setTimeDeltaFormatter(formatter) {
  formatTimeDelta_ = formatter;
}


/**
 * Sets casing mode to a boolean.
 * If true, the first letter of day formats ("today", "yesterday", "tommorow")
 * is capitalized using locale-aware toUpper.
 * If false, no casing is done on basic data.
 * @param {boolean} capitalizeMode
 */
export function setCasingMode(capitalizeMode) {
  casingMode_ = capitalizeMode;
}


/**
 * Converts first letter of a string to upper case.
 * @param {string} text
 * @return {string}
 * @package Visible for testing
 */
export function upcase(text) {
  // Note: Casing is harder than just handling the first character, so
  // this is an approximation.

  var codepointLength = 1;
  // Check for surrogate values.
  var codePoint0 = text.charCodeAt(0);
  if (codePoint0 >= SURROGATE_LOW_ &&
      codePoint0 <= SURROGATE_HIGH_) {
    // It's a surrogate.
    codepointLength = 2;
  }
  text = text.substring(0, codepointLength).toLocaleUpperCase() +
      text.substring(codepointLength);
  return text;
}


/**
 * Returns string with "sentence casing" for the input string, i.e.,
 * Finds Day unit in relative date time compatible values, if available.
 * then formats the result using that data.
 * If codepoints are surrogate code points, returns the string unchanged.
 * If no relative non-numeric data is available, returns null.
 *
 * @param {number} dayOffset Offset of day unit for lookup in rdtf symbols data.
 * @return {string|null}
 * @private
 */
function relativeCasedString_(dayOffset) {
  var rdtf_formatter =
      new RelativeDateTimeFormat(RelativeDateTimeFormat.NumericOption.AUTO);

  var result =
      rdtf_formatter.format(dayOffset, RelativeDateTimeFormat.Unit.DAY);

  // Check for a digit in expected Auto results, which implies a Numeric
  // result was actually returned.
  // Limitation: This checks only for ASCII, Arabic, ArabicExtended digits.
  if (!result || result.match(/[0-9\u0660-\u0669\u06f0-\u06f9]/g)) {
    return null;
  }

  if (casingMode_) {
    return upcase(result);
  }
  return result;
}


/**
 * Returns a date in month format, e.g. Mar 15.
 * @param {!Date} date The date object.
 * @return {string} The formatted string.
 * @private
 */
function formatMonth_(date) {
  if (!monthDateFormatter_) {
    monthDateFormatter_ =
        new DateTimeFormat(DateTimePatterns.MONTH_DAY_ABBR);
  }
  return monthDateFormatter_.format(date);
}


/**
 * Returns a date in short-time format, e.g. 2:50 PM.
 * @param {!Date|!DateTime} date The date object.
 * @return {string} The formatted string.
 * @private
 */
function formatShortTime_(date) {
  if (!shortTimeFormatter_) {
    shortTimeFormatter_ = new DateTimeFormat(
        DateTimeFormat.Format.SHORT_TIME);
  }
  return shortTimeFormatter_.format(date);
}


/**
 * Returns a date in full date format, e.g. Tuesday, March 24, 2009.
 * @param {!Date|!DateTime} date The date object.
 * @return {string} The formatted string.
 * @private
 */
function formatFullDate_(date) {
  if (!fullDateFormatter_) {
    fullDateFormatter_ =
        new DateTimeFormat(DateTimeFormat.Format.FULL_DATE);
  }
  return fullDateFormatter_.format(date);
}


/**
 * Formats quantity and relative unit using i18n.relativedatetimeformat.
 * Converts absolute quantity and unit to relative date time compatible values,
 * then formats the result using that data.
 *
 * @param {number} absQuantity
 * @param {boolean} futureFlag
 * @param {!Unit} relUnit
 * @return {string}
 * @private
 */
function rdtformat_(absQuantity, futureFlag, relUnit) {
  // Convert absolute value to negative for past, non-negative for future.
  var quantity = futureFlag ? absQuantity : -absQuantity;

  var rdtfFormatter = new RelativeDateTimeFormat();

  var rdtfUnit;
  switch (relUnit) {
    case Unit.MINUTES:
      rdtfUnit = RelativeDateTimeFormat.Unit.MINUTE;
      break;
    case Unit.HOURS:
      rdtfUnit = RelativeDateTimeFormat.Unit.HOUR;
      break;
    default:
    case Unit.DAYS:
      rdtfUnit = RelativeDateTimeFormat.Unit.DAY;
      break;
  }
  // Use locale-aware relatve date time formatter, compatible with ICU4C/ICU4J.
  return rdtfFormatter.format(quantity, rdtfUnit);
}


/**
 * Accepts a timestamp in milliseconds and outputs a relative time in the form
 * of "1 hour ago", "1 day ago", "in 1 hour", "in 2 days" etc.  If the date
 * delta is over 2 weeks, then the output string will be empty.
 * @param {number} dateMs Date in milliseconds.
 * @return {string} The formatted date.
 */
export function format(dateMs) {
  var now = goog.now();
  var delta = Math.floor((now - dateMs) / MINUTE_MS_);

  var future = false;

  if (delta < 0) {
    future = true;
    delta *= -1;
  }

  if (delta < 60) {  // Minutes.
    return formatTimeDelta_(
        delta, future, Unit.MINUTES);

  } else {
    delta = Math.floor(delta / 60);
    if (delta < 24) {  // Hours.
      return formatTimeDelta_(
          delta, future, Unit.HOURS);

    } else {
      // We can be more than 24 hours apart but still only 1 day apart, so we
      // compare the closest time from today against the target time to find
      // the number of days in the delta.
      var midnight = new Date(goog.now());
      midnight.setHours(0);
      midnight.setMinutes(0);
      midnight.setSeconds(0);
      midnight.setMilliseconds(0);

      // Convert to days ago.
      delta =
          Math.ceil((midnight.getTime() - dateMs) / DAY_MS_);

      if (future) {
        delta *= -1;
      }

      // Uses days for less than 2-weeks.
      if (delta < FORTNIGHT_) {
        return formatTimeDelta_(
            delta, future, Unit.DAYS);

      } else {
        // For messages older than 2 weeks do not show anything.  The client
        // should decide the date format to show.
        return '';
      }
    }
  }
}


/**
 * Accepts a timestamp in milliseconds and outputs a relative time in the form
 * of "1 hour ago", "1 day ago".  All future times will be returned as 0 minutes
 * ago.
 *
 * This is provided for compatibility with users of the previous incarnation of
 * the above {@see #format} method who relied on it protecting against
 * future dates.
 *
 * @param {number} dateMs Date in milliseconds.
 * @return {string} The formatted date.
 */
export function formatPast(dateMs) {
  var now = goog.now();
  if (now < dateMs) {
    dateMs = now;
  }
  return format(dateMs);
}


/**
 * Accepts a timestamp in milliseconds and outputs a relative day. i.e. "Today",
 * "Yesterday", "Tomorrow", or "Sept 15".
 *
 * @param {number} dateMs Date in milliseconds.
 * @param {function(!Date):string=} opt_formatter Formatter for the date.
 *     Defaults to form 'MMM dd'.
 * @return {string} The formatted date.
 */
export function formatDay(dateMs, opt_formatter) {
  var today = new Date(goog.now());
  console.log(today);
  const originalTimezoneOffset = today.getTimezoneOffset();

  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  // It is possible for the time zone to differ between 00:00 and HH:MM on a
  // given day if daylight saving time ended on that day some time before HH:MM.
  // In this case, the number of hours between 00:MM and HH:MM is not HH. It is
  // HH + 1. In most cases this doesn't matter, but if the current date-time is
  // 23:MM in PST on the day daylight saving time ended (e.g. Nov 7, 2021) and
  // `dateMs` is in that same hour, then without correction, the number of hours
  // between 00:00 and 23:MM would be calculated as 24+ hours, causing
  // date-times corresponding to 'Today' to be formatted as 'Tomorrow' (e.g.
  // b/205512072). Here we correct the offset by computing the difference
  // between today's original time zone and the time zone at 00:00.
  const timezoneOffsetCorrection =
      (today.getTimezoneOffset() - originalTimezoneOffset) *
      MINUTE_MS_;

  let dayOffset = (dateMs - today.getTime() + timezoneOffsetCorrection) /
      DAY_MS_;

  dayOffset = Math.floor(dayOffset);

  var relativeResult = relativeCasedString_(dayOffset);

  if (relativeResult) {
    // Return the non-numeric answer such as "ayer" or "tomorrow".
    return relativeResult;
  }

  // Use specialized formatting such as day and month when no
  // special form for the offset is available.
  var formatFunction = opt_formatter || formatMonth_;
  return formatFunction(new Date(dateMs));
}


/**
 * Formats a date, adding the relative date in parenthesis.  If the date is less
 * than 24 hours then the time will be printed, otherwise the full-date will be
 * used.  Examples:
 *   2:20 PM (1 minute ago)
 *   Monday, February 27, 2009 (4 days ago)
 *   Tuesday, March 20, 2005    // Too long ago for a relative date.
 *
 * @param {!Date|!DateTime} date A date object.
 * @param {string=} opt_shortTimeMsg An optional short time message can be
 *     provided if available, so that it's not recalculated in this function.
 * @param {string=} opt_fullDateMsg An optional date message can be
 *     provided if available, so that it's not recalculated in this function.
 * @return {string} The date string in the above form.
 */
export function getDateString(date, opt_shortTimeMsg, opt_fullDateMsg) {
  return getDateString_(
      date, format, opt_shortTimeMsg, opt_fullDateMsg);
}


/**
 * Formats a date, adding the relative date in parenthesis.   Functions the same
 * as #getDateString but ensures that the date is always seen to be in the past.
 * If the date is in the future, it will be shown as 0 minutes ago.
 *
 * This is provided for compatibility with users of the previous incarnation of
 * the above {@see #getDateString} method who relied on it protecting against
 * future dates.
 *
 * @param {Date|DateTime} date A date object.
 * @param {string=} opt_shortTimeMsg An optional short time message can be
 *     provided if available, so that it's not recalculated in this function.
 * @param {string=} opt_fullDateMsg An optional date message can be
 *     provided if available, so that it's not recalculated in this function.
 * @return {string} The date string in the above form.
 */
export function getPastDateString(date, opt_shortTimeMsg, opt_fullDateMsg) {
  return getDateString_(
      date, formatPast, opt_shortTimeMsg, opt_fullDateMsg);
}


/**
 * Formats a date, adding the relative date in parenthesis.  If the date is less
 * than 24 hours then the time will be printed, otherwise the full-date will be
 * used.  Examples:
 *   2:20 PM (1 minute ago)
 *   Monday, February 27, 2009 (4 days ago)
 *   Tuesday, March 20, 2005    // Too long ago for a relative date.
 *
 * @param {Date|DateTime} date A date object.
 * @param {function(number) : string} relativeFormatter Function to use when
 *     formatting the relative date.
 * @param {string=} opt_shortTimeMsg An optional short time message can be
 *     provided if available, so that it's not recalculated in this function.
 * @param {string=} opt_fullDateMsg An optional date message can be
 *     provided if available, so that it's not recalculated in this function.
 * @return {string} The date string in the above form.
 * @private
 */
function getDateString_(date, relativeFormatter, opt_shortTimeMsg, opt_fullDateMsg) {
  var dateMs = date.getTime();

  var relativeDate = relativeFormatter(dateMs);

  if (relativeDate) {
    relativeDate = ' (' + relativeDate + ')';
  }

  var delta = Math.floor((goog.now() - dateMs) / MINUTE_MS_);
  if (delta < 60 * 24) {
    // TODO(user): this call raises an exception if date is a goog.date.Date.
    return (opt_shortTimeMsg || formatShortTime_(date)) +
        relativeDate;
  } else {
    return (opt_fullDateMsg || formatFullDate_(date)) +
        relativeDate;
  }
}

// Set default formatter for date/time.
setTimeDeltaFormatter(rdtformat_);
