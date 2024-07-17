/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Functions and objects for date representation and manipulation.
 * @suppress {checkPrototypalTypes}
 */

goog.declareModuleId('goog.date.date');

import * as asserts from '../asserts/asserts.js';
import { DateTimeSymbols } from '../i18n/datetimesymbols.js';
import * as googString from '../string/string.js';


/**
 * Constants for weekdays.
 * @enum {number}
 */
export var weekDay = {
  MON: 0,
  TUE: 1,
  WED: 2,
  THU: 3,
  FRI: 4,
  SAT: 5,
  SUN: 6
};


/**
 * Constants for months.
 * @enum {number}
 */
var month_ = {
  JAN: 0,
  FEB: 1,
  MAR: 2,
  APR: 3,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AUG: 7,
  SEP: 8,
  OCT: 9,
  NOV: 10,
  DEC: 11
};


export { month_ as month };


/**
 * Regular expression for splitting date parts from ISO 8601 styled string.
 * Examples: '20060210' or '2005-02-22' or '20050222' or '2005-08'
 * or '2005-W22' or '2005W22' or '2005-W22-4', etc.
 * For explanation and more examples, see:
 * {@link http://en.wikipedia.org/wiki/ISO_8601}
 *
 * @type {RegExp}
 * @private
 */
var splitDateStringRegex_ = new RegExp(
    '^((?:[-+]\\d*)?\\d{4})(?:(?:-?(\\d{2})(?:-?(\\d{2}))?)|' +
    '(?:-?(\\d{3}))|(?:-?W(\\d{2})(?:-?([1-7]))?))?$');


/**
 * Regular expression for splitting time parts from ISO 8601 styled string.
 * Examples: '18:46:39.994' or '184639.994'
 *
 * @type {RegExp}
 * @private
 */
var splitTimeStringRegex_ = /^(\d{2})(?::?(\d{2})(?::?(\d{2})(\.\d+)?)?)?$/;


/**
 * Regular expression for splitting timezone parts from ISO 8601 styled string.
 * Example: The part after the '+' in '18:46:39+07:00'.  Or '09:30Z' (UTC).
 *
 * @type {RegExp}
 * @private
 */
var splitTimezoneStringRegex_ = /Z|(?:([-+])(\d{2})(?::?(\d{2}))?)$/;


/**
 * Regular expression for splitting duration parts from ISO 8601 styled string.
 * Example: '-P1Y2M3DT4H5M6.7S'
 *
 * @type {RegExp}
 * @private
 */
var splitDurationRegex_ = new RegExp(
    '^(-)?P(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)D)?' +
    '(T(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+(?:\\.\\d+)?)S)?)?$');


/**
 * Number of milliseconds in a day.
 * @type {number}
 */
export var MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Number of milliseconds in an ordinary 400-year Gregorian calendar cycle.
 * It can be derived by running
 * `new Date(800, 0, 0).getTime() - new Date(400, 0, 0).getTime()`.
 * Since this number includes leap seconds, it is not evenly dividable by
 * the number of years (importantly, 146097 = 365.2425 * 400).
 * It should be used only for computing dates in the years 0-99 in UTC.
 * @type {number}
 * @private
 */
var MS_PER_GREGORIAN_CYCLE_ = 146097 * 24 * 60 * 60 * 1000;

/**
 * Returns whether the given year is a leap year.
 *
 * @param {number} year Year part of date.
 * @return {boolean} Whether the given year is a leap year.
 */
export function isLeapYear(year) {
  // Leap year logic; the 4-100-400 rule
  return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
}


/**
 * Returns whether the given year is a long ISO year.
 * See {@link http://www.phys.uu.nl/~vgent/calendar/isocalendar_text3.htm}.
 *
 * @param {number} year Full year part of date.
 * @return {boolean} Whether the given year is a long ISO year.
 */
export function isLongIsoYear(year) {
  var n = 5 * year + 12 - 4 * (Math.floor(year / 100) - Math.floor(year / 400));
  n += Math.floor((year - 100) / 400) - Math.floor((year - 102) / 400);
  n += Math.floor((year - 200) / 400) - Math.floor((year - 199) / 400);

  return n % 28 < 5;
}


/**
 * Returns the number of days for a given month.
 *
 * @param {number} year Year part of date.
 * @param {number} month Month part of date.
 * @return {number} The number of days for the given month.
 */
export function getNumberOfDaysInMonth(year, month) {
  switch (month) {
    case month_.FEB:
      return isLeapYear(year) ? 29 : 28;
    case month_.JUN:
    case month_.SEP:
    case month_.NOV:
    case month_.APR:
      return 30;
  }
  return 31;
}


/**
 * Returns true if the 2 dates are in the same day.
 * @param {DateLike} date The time to check.
 * @param {DateLike=} opt_now The current time.
 * @return {boolean} Whether the dates are on the same day.
 */
export function isSameDay(date, opt_now) {
  var now = opt_now || new Date(goog.now());
  return date.getDate() == now.getDate() && isSameMonth(date, now);
}


/**
 * Returns true if the 2 dates are in the same month.
 * @param {DateLike} date The time to check.
 * @param {DateLike=} opt_now The current time.
 * @return {boolean} Whether the dates are in the same calendar month.
 */
export function isSameMonth(date, opt_now) {
  var now = opt_now || new Date(goog.now());
  return date.getMonth() == now.getMonth() && isSameYear(date, now);
}


/**
 * Returns true if the 2 dates are in the same year.
 * @param {DateLike} date The time to check.
 * @param {DateLike=} opt_now The current time.
 * @return {boolean} Whether the dates are in the same calendar year.
 */
export function isSameYear(date, opt_now) {
  var now = opt_now || new Date(goog.now());
  return date.getFullYear() == now.getFullYear();
}


/**
 * Static function for the day of the same week that determines the week number
 * and year of week.
 *
 * @param {number} year Year part of date.
 * @param {number} month Month part of date (0-11).
 * @param {number} date Day part of date (1-31).
 * @param {number=} opt_weekDay Cut off weekday, defaults to Thursday.
 * @param {number=} opt_firstDayOfWeek First day of the week, defaults to
 *     Monday.
 *     Monday=0, Sunday=6.
 * @return {number} the cutoff day of the same week in millis since epoch.
 * @private
 */
function getCutOffSameWeek_(year, month, date, opt_weekDay, opt_firstDayOfWeek) {
  var d = new Date(year, month, date);

  // Default to Thursday for cut off as per ISO 8601.
  var cutoff =
      (opt_weekDay !== undefined) ? opt_weekDay : weekDay.THU;

  // Default to Monday for first day of the week as per ISO 8601.
  var firstday = opt_firstDayOfWeek || weekDay.MON;

  // The d.getDay() has to be converted first to ISO weekday (Monday=0).
  var isoday = (d.getDay() + 6) % 7;

  // Position of given day in the picker grid w.r.t. first day of week
  var daypos = (isoday - firstday + 7) % 7;

  // Position of cut off day in the picker grid w.r.t. first day of week
  var cutoffpos = (cutoff - firstday + 7) % 7;

  // Unix timestamp of the midnight of the cutoff day in the week of 'd'.
  // There might be +-1 hour shift in the result due to the daylight saving,
  // but it doesn't affect the year.
  return d.valueOf() + (cutoffpos - daypos) * MS_PER_DAY;
}


/**
 * Static function for week number calculation. ISO 8601 implementation.
 *
 * @param {number} year Year part of date.
 * @param {number} month Month part of date (0-11).
 * @param {number} date Day part of date (1-31).
 * @param {number=} opt_weekDay Cut off weekday, defaults to Thursday.
 * @param {number=} opt_firstDayOfWeek First day of the week, defaults to
 *     Monday.
 *     Monday=0, Sunday=6.
 * @return {number} The week number (1-53).
 */
export function getWeekNumber(year, month, date, opt_weekDay, opt_firstDayOfWeek) {
  var cutoffSameWeek = getCutOffSameWeek_(
      year, month, date, opt_weekDay, opt_firstDayOfWeek);

  // Unix timestamp of January 1 in the year of the week.
  var jan1 = new Date(new Date(cutoffSameWeek).getFullYear(), 0, 1).valueOf();

  // Number of week. The round() eliminates the effect of daylight saving.
  return Math.floor(
             Math.round((cutoffSameWeek - jan1) / MS_PER_DAY) / 7) +
      1;
}


/**
 * Static function for year of the week. ISO 8601 implementation.
 *
 * @param {number} year Year part of date.
 * @param {number} month Month part of date (0-11).
 * @param {number} date Day part of date (1-31).
 * @param {number=} opt_weekDay Cut off weekday, defaults to Thursday.
 * @param {number=} opt_firstDayOfWeek First day of the week, defaults to
 *     Monday.
 *     Monday=0, Sunday=6.
 * @return {number} The four digit year of date.
 */
export function getYearOfWeek(year, month, date, opt_weekDay, opt_firstDayOfWeek) {
  var cutoffSameWeek = getCutOffSameWeek_(
      year, month, date, opt_weekDay, opt_firstDayOfWeek);

  return new Date(cutoffSameWeek).getFullYear();
}


/**
 * @param {T} date1 A datelike object.
 * @param {S} date2 Another datelike object.
 * @return {T|S} The earlier of them in time.
 * @template T,S
 */
export function min(date1, date2) {
  return date1 < date2 ? date1 : date2;
}


/**
 * @param {T} date1 A datelike object.
 * @param {S} date2 Another datelike object.
 * @return {T|S} The later of them in time.
 * @template T,S
 */
export function max(date1, date2) {
  return date1 > date2 ? date1 : date2;
}


/**
 * Parses a datetime string expressed in ISO 8601 format. Overwrites the date
 * and optionally the time part of the given object with the parsed values.
 *
 * @param {!DateTime} dateTime Object whose fields will be set.
 * @param {string} formatted A date or datetime expressed in ISO 8601 format.
 * @return {boolean} Whether the parsing succeeded.
 */
export function setIso8601DateTime(dateTime, formatted) {
  formatted = googString.trim(formatted);
  var delim = formatted.indexOf('T') == -1 ? ' ' : 'T';
  var parts = formatted.split(delim);
  return setIso8601DateOnly_(dateTime, parts[0]) &&
      (parts.length < 2 || setIso8601TimeOnly_(dateTime, parts[1]));
}


/**
 * Sets date fields based on an ISO 8601 format string.
 *
 * @param {!Date_} d Object whose fields will be set.
 * @param {string} formatted A date expressed in ISO 8601 format.
 * @return {boolean} Whether the parsing succeeded.
 * @private
 */
function setIso8601DateOnly_(d, formatted) {
  // split the formatted ISO date string into its date fields
  var parts = formatted.match(splitDateStringRegex_);
  if (!parts) {
    return false;
  }

  var year = Number(parts[1]);
  var month = Number(parts[2]);
  var date = Number(parts[3]);
  var dayOfYear = Number(parts[4]);
  var week = Number(parts[5]);
  // ISO weekdays start with 1, native getDay() values start with 0
  var dayOfWeek = Number(parts[6]) || 1;

  d.setFullYear(year);

  if (dayOfYear) {
    d.setDate(1);
    d.setMonth(0);
    var offset = dayOfYear - 1;  // offset, so 1-indexed, i.e., skip day 1
    d.add(new Interval(Interval.DAYS, offset));
  } else if (week) {
    setDateFromIso8601Week_(d, week, dayOfWeek);
  } else {
    if (month) {
      d.setDate(1);
      d.setMonth(month - 1);
    }
    if (date) {
      d.setDate(date);
    }
  }

  return true;
}


/**
 * Sets date fields based on an ISO 8601 week string.
 * See {@link http://en.wikipedia.org/wiki/ISO_week_date}, "Relation with the
 * Gregorian Calendar".  The first week of a new ISO year is the week with the
 * majority of its days in the new Gregorian year.  I.e., ISO Week 1's Thursday
 * is in that year.  ISO weeks always start on Monday. So ISO Week 1 can
 * contain a few days from the previous Gregorian year.  And ISO weeks always
 * end on Sunday, so the last ISO week (Week 52 or 53) can have a few days from
 * the following Gregorian year.
 * Example: '1997-W01' lasts from 1996-12-30 to 1997-01-05.  January 1, 1997 is
 * a Wednesday. So W01's Monday is Dec.30, 1996, and Sunday is January 5, 1997.
 *
 * @param {!Date_} d Object whose fields will be set.
 * @param {number} week ISO week number.
 * @param {number} dayOfWeek ISO day of week.
 * @private
 */
function setDateFromIso8601Week_(d, week, dayOfWeek) {
  // calculate offset for first week
  d.setMonth(0);
  d.setDate(1);
  var jsDay = d.getDay();
  // switch Sunday (0) to index 7; ISO days are 1-indexed
  var jan1WeekDay = jsDay || 7;

  var THURSDAY = 4;
  if (jan1WeekDay <= THURSDAY) {
    // was extended back to Monday
    var startDelta = 1 - jan1WeekDay;  // e.g., Thu(4) ==> -3
  } else {
    // was extended forward to Monday
    startDelta = 8 - jan1WeekDay;  // e.g., Fri(5) ==> +3
  }

  // find the absolute number of days to offset from the start of year
  // to arrive close to the Gregorian equivalent (pending adjustments above)
  // Note: decrement week multiplier by one because 1st week is
  // represented by dayOfWeek value
  var absoluteDays = Number(dayOfWeek) + (7 * (Number(week) - 1));

  // convert from ISO weekday format to Gregorian calendar date
  // note: subtract 1 because 1-indexed; offset should not include 1st of month
  var delta = startDelta + absoluteDays - 1;
  var interval = new Interval(Interval.DAYS, delta);
  d.add(interval);
}


/**
 * Sets time fields based on an ISO 8601 format string.
 * Note: only time fields, not date fields.
 *
 * @param {!DateTime} d Object whose fields will be set.
 * @param {string} formatted A time expressed in ISO 8601 format.
 * @return {boolean} Whether the parsing succeeded.
 * @private
 */
export function setIso8601TimeOnly_(d, formatted) {
  // first strip timezone info from the end
  var timezoneParts = formatted.match(splitTimezoneStringRegex_);

  var offsetMinutes;  // Offset from UTC if not local time
  var formattedTime;  // The time components of the input string; no timezone.

  if (timezoneParts) {
    // Trim off the timezone characters.
    formattedTime =
        formatted.substring(0, formatted.length - timezoneParts[0].length);

    // 'Z' indicates a UTC timestring.
    if (timezoneParts[0] === 'Z') {
      offsetMinutes = 0;
    } else {
      offsetMinutes = Number(timezoneParts[2]) * 60 + Number(timezoneParts[3]);
      offsetMinutes *= (timezoneParts[1] == '-') ? 1 : -1;
    }
  } else {
    formattedTime = formatted;
  }

  var timeParts = formattedTime.match(splitTimeStringRegex_);
  if (!timeParts) {
    return false;
  }

  // We have to branch on local vs non-local times because we can't always
  // calculate the correct UTC offset for the specified time. Specifically, the
  // offset for daylight-savings time depends on the date being set. Therefore,
  // when an offset is specified, we apply it verbatim.
  if (timezoneParts) {
    asserts.assertNumber(offsetMinutes);

    // Convert the date part into UTC. This is important because the local date
    // can differ from the UTC date, and the date part of an ISO 8601 string is
    // always set in terms of the local date.
    var year = d.getYear();
    var month = d.getMonth();
    var day = d.getDate();
    var hour = Number(timeParts[1]);
    var minute = Number(timeParts[2]) || 0;
    var second = Number(timeParts[3]) || 0;
    var millisecond = timeParts[4] ? Number(timeParts[4]) * 1000 : 0;

    // Date.UTC treats one- and two-digit years as if they were four-digit years
    // beginning in 1900 (for example, a year specified as 84 becomes 1984).
    // Since we use it in this code path, we need to account for this by
    // incrementing the input year by 400 (in order to bypass the two-digit year
    // behavior), and then compensate by deducting the number of milliseconds in
    // the 400-year Gregorian calendar cycle.
    const twoDigitYear = year >= 0 && year < 100;
    if (twoDigitYear) {
      year += 400;
    }
    let utc = Date.UTC(year, month, day, hour, minute, second, millisecond);
    if (twoDigitYear) {
      utc -= MS_PER_GREGORIAN_CYCLE_;
    }
    d.setTime(utc + offsetMinutes * 60000);
  } else {
    d.setHours(Number(timeParts[1]));
    d.setMinutes(Number(timeParts[2]) || 0);
    d.setSeconds(Number(timeParts[3]) || 0);
    d.setMilliseconds(timeParts[4] ? Number(timeParts[4]) * 1000 : 0);
  }

  return true;
}


/**
 * Pads the year to 4 unsigned digits, or 6 digits with a sign.
 * @param {number} year
 * @return {string}
 */
export function padYear_(year) {
  const sign = year < 0 ? '-' : year >= 10000 ? '+' : '';
  return sign + googString.padNumber(Math.abs(year), sign ? 6 : 4);
}


/**
 * Class representing a date/time interval. Used for date calculations.
 * <pre>
 * new Interval(0, 1) // One month
 * new Interval(0, 0, 3, 1) // Three days and one hour
 * new Interval(Interval.DAYS, 1) // One day
 * </pre>
 *
 * @param {number|string=} opt_years Years or string representing date part.
 * @param {number=} opt_months Months or number of whatever date part specified
 *     by first parameter.
 * @param {number=} opt_days Days.
 * @param {number=} opt_hours Hours.
 * @param {number=} opt_minutes Minutes.
 * @param {number=} opt_seconds Seconds.
 * @constructor
 * @struct
 * @final
 */
export function Interval(opt_years, opt_months, opt_days, opt_hours, opt_minutes, opt_seconds) {
  if (typeof opt_years === 'string') {
    var type = opt_years;
    var interval = /** @type {number} */ (opt_months);
    /** @type {number} */
    this.years = type == Interval.YEARS ? interval : 0;
    /** @type {number} */
    this.months = type == Interval.MONTHS ? interval : 0;
    /** @type {number} */
    this.days = type == Interval.DAYS ? interval : 0;
    /** @type {number} */
    this.hours = type == Interval.HOURS ? interval : 0;
    /** @type {number} */
    this.minutes = type == Interval.MINUTES ? interval : 0;
    /** @type {number} */
    this.seconds = type == Interval.SECONDS ? interval : 0;
  } else {
    this.years = /** @type {number} */ (opt_years) || 0;
    this.months = opt_months || 0;
    this.days = opt_days || 0;
    this.hours = opt_hours || 0;
    this.minutes = opt_minutes || 0;
    this.seconds = opt_seconds || 0;
  }
}


/**
 * Parses an XML Schema duration (ISO 8601 extended).
 * @see http://www.w3.org/TR/xmlschema-2/#duration
 *
 * @param  {string} duration An XML schema duration in textual format.
 *     Recurring durations and weeks are not supported.
 * @return {Interval} The duration as a Interval or null
 *     if the parse fails.
 */
Interval.fromIsoString = function(duration) {
  var parts = duration.match(splitDurationRegex_);
  if (!parts) {
    return null;
  }

  var timeEmpty = !(parts[6] || parts[7] || parts[8]);
  var dateTimeEmpty = timeEmpty && !(parts[2] || parts[3] || parts[4]);
  if (dateTimeEmpty || timeEmpty && parts[5]) {
    return null;
  }

  var negative = parts[1];
  var years = parseInt(parts[2], 10) || 0;
  var months = parseInt(parts[3], 10) || 0;
  var days = parseInt(parts[4], 10) || 0;
  var hours = parseInt(parts[6], 10) || 0;
  var minutes = parseInt(parts[7], 10) || 0;
  var seconds = parseFloat(parts[8]) || 0;
  return negative ?
      new Interval(
          -years, -months, -days, -hours, -minutes, -seconds) :
      new Interval(years, months, days, hours, minutes, seconds);
};


/**
 * Serializes Interval into XML Schema duration (ISO 8601 extended).
 * @see http://www.w3.org/TR/xmlschema-2/#duration
 *
 * @param {boolean=} opt_verbose Include zero fields in the duration string.
 * @return {?string} An XML schema duration in ISO 8601 extended format,
 *     or null if the interval contains both positive and negative fields.
 */
Interval.prototype.toIsoString = function(opt_verbose) {
  var minField = Math.min(
      this.years, this.months, this.days, this.hours, this.minutes,
      this.seconds);
  var maxField = Math.max(
      this.years, this.months, this.days, this.hours, this.minutes,
      this.seconds);
  if (minField < 0 && maxField > 0) {
    return null;
  }

  // Return 0 seconds if all fields are zero.
  if (!opt_verbose && minField == 0 && maxField == 0) {
    return 'PT0S';
  }

  var res = [];

  // Add sign and 'P' prefix.
  if (minField < 0) {
    res.push('-');
  }
  res.push('P');

  // Add date.
  if (this.years || opt_verbose) {
    res.push(Math.abs(this.years) + 'Y');
  }
  if (this.months || opt_verbose) {
    res.push(Math.abs(this.months) + 'M');
  }
  if (this.days || opt_verbose) {
    res.push(Math.abs(this.days) + 'D');
  }

  // Add time.
  if (this.hours || this.minutes || this.seconds || opt_verbose) {
    res.push('T');
    if (this.hours || opt_verbose) {
      res.push(Math.abs(this.hours) + 'H');
    }
    if (this.minutes || opt_verbose) {
      res.push(Math.abs(this.minutes) + 'M');
    }
    if (this.seconds || opt_verbose) {
      res.push(Math.abs(this.seconds) + 'S');
    }
  }

  return res.join('');
};


/**
 * Tests whether the given interval is equal to this interval.
 * Note, this is a simple field-by-field comparison, it doesn't
 * account for comparisons like "12 months == 1 year".
 *
 * @param {Interval} other The interval to test.
 * @return {boolean} Whether the intervals are equal.
 */
Interval.prototype.equals = function(other) {
  return other.years == this.years && other.months == this.months &&
      other.days == this.days && other.hours == this.hours &&
      other.minutes == this.minutes && other.seconds == this.seconds;
};


/**
 * @return {!Interval} A clone of the interval object.
 */
Interval.prototype.clone = function() {
  return new Interval(
      this.years, this.months, this.days, this.hours, this.minutes,
      this.seconds);
};


/**
 * Years constant for the date parts.
 * @type {string}
 */
Interval.YEARS = 'y';


/**
 * Months constant for the date parts.
 * @type {string}
 */
Interval.MONTHS = 'm';


/**
 * Days constant for the date parts.
 * @type {string}
 */
Interval.DAYS = 'd';


/**
 * Hours constant for the date parts.
 * @type {string}
 */
Interval.HOURS = 'h';


/**
 * Minutes constant for the date parts.
 * @type {string}
 */
Interval.MINUTES = 'n';


/**
 * Seconds constant for the date parts.
 * @type {string}
 */
Interval.SECONDS = 's';


/**
 * @return {boolean} Whether all fields of the interval are zero.
 */
Interval.prototype.isZero = function() {
  return this.years == 0 && this.months == 0 && this.days == 0 &&
      this.hours == 0 && this.minutes == 0 && this.seconds == 0;
};


/**
 * @return {!Interval} Negative of this interval.
 */
Interval.prototype.getInverse = function() {
  return this.times(-1);
};


/**
 * Calculates n * (this interval) by memberwise multiplication.
 * @param {number} n An integer.
 * @return {!Interval} n * this.
 */
Interval.prototype.times = function(n) {
  return new Interval(
      this.years * n, this.months * n, this.days * n, this.hours * n,
      this.minutes * n, this.seconds * n);
};


/**
 * Gets the total number of seconds in the time interval. Assumes that months
 * and years are empty.
 * @return {number} Total number of seconds in the interval.
 */
Interval.prototype.getTotalSeconds = function() {
  asserts.assert(this.years == 0 && this.months == 0);
  return ((this.days * 24 + this.hours) * 60 + this.minutes) * 60 +
      this.seconds;
};


/**
 * Adds the Interval in the argument to this Interval field by field.
 *
 * @param {Interval} interval The Interval to add.
 */
Interval.prototype.add = function(interval) {
  this.years += interval.years;
  this.months += interval.months;
  this.days += interval.days;
  this.hours += interval.hours;
  this.minutes += interval.minutes;
  this.seconds += interval.seconds;
};


/**
 * @typedef {(?Date|?Date_)}
 */
export var DateLike;


/**
 * Class representing a date. Defaults to current date if none is specified.
 *
 * Implements most methods of the native js Date object (except the time related
 * ones, {@see DateTime}) and can be used interchangeably with it just
 * as if Date_ was a synonym of Date. To make this more transparent,
 * Closure APIs should accept DateLike instead of the real Date
 * object.
 *
 * @param {number|DateLike=} opt_year Four digit year or a date-like
 *     object. If not set, the created object will contain the date
 *     determined by goog.now().
 * @param {number=} opt_month Month, 0 = Jan, 11 = Dec.
 * @param {number=} opt_date Date of month, 1 - 31.
 * @constructor
 * @struct
 * @see DateTime
 */
function Date_(opt_year, opt_month, opt_date) {
  /** @protected {!Date} The wrapped date or datetime. */
  this.date;
  /* DateTime assumes that only this.date is added in this ctor.*/
  if (typeof opt_year === 'number') {
    this.date = this.buildDate_(opt_year, opt_month || 0, opt_date || 1);
    this.maybeFixDst_(opt_date || 1);
  } else if (goog.isObject(opt_year)) {
    this.date = this.buildDate_(
        opt_year.getFullYear(), opt_year.getMonth(), opt_year.getDate());
    this.maybeFixDst_(opt_year.getDate());
  } else {
    this.date = new Date(goog.now());
    var expectedDate = this.date.getDate();
    this.date.setHours(0);
    this.date.setMinutes(0);
    this.date.setSeconds(0);
    this.date.setMilliseconds(0);
    // In some time zones there is no "0" hour on certain days during DST.
    // Adjust here, if necessary. See:
    // https://github.com/google/closure-library/issues/34.
    this.maybeFixDst_(expectedDate);
  }
}


export { Date_ as Date };


/**
 * new Date(y, m, d) treats years in the interval [0, 100) as two digit years,
 * adding 1900 to them. This method ensures that calling the date constructor
 * as a copy constructor returns a value that is equal to the passed in
 * date value by explicitly setting the full year.
 * @private
 * @param {number} fullYear The full year (including century).
 * @param {number} month The month, from 0-11.
 * @param {number} date The day of the month.
 * @return {!Date} The constructed Date object.
 */
Date_.prototype.buildDate_ = function(fullYear, month, date) {
  var d = new Date(fullYear, month, date);
  if (fullYear >= 0 && fullYear < 100) {
    // Can't just setFullYear as new Date() can flip over for e.g. month = 13.
    d.setFullYear(d.getFullYear() - 1900);
  }
  return d;
};


/**
 * First day of week. 0 = Mon, 6 = Sun.
 * @type {number}
 * @private
 */
Date_.prototype.firstDayOfWeek_ =
    DateTimeSymbols.FIRSTDAYOFWEEK;


/**
 * The cut off weekday used for week number calculations. 0 = Mon, 6 = Sun.
 * @type {number}
 * @private
 */
Date_.prototype.firstWeekCutOffDay_ =
    DateTimeSymbols.FIRSTWEEKCUTOFFDAY;


/**
 * @return {!Date_} A clone of the date object.
 */
Date_.prototype.clone = function() {
  var date = new Date_(this.date);
  date.firstDayOfWeek_ = this.firstDayOfWeek_;
  date.firstWeekCutOffDay_ = this.firstWeekCutOffDay_;

  return date;
};


/**
 * @return {number} The four digit year of date.
 */
Date_.prototype.getFullYear = function() {
  return this.date.getFullYear();
};


/**
 * Alias for getFullYear.
 *
 * @return {number} The four digit year of date.
 * @see #getFullYear
 */
Date_.prototype.getYear = function() {
  return this.getFullYear();
};


/**
 * @return {month_} The month of date, 0 = Jan, 11 = Dec.
 */
Date_.prototype.getMonth = function() {
  return /** @type {month_} */ (this.date.getMonth());
};


/**
 * @return {number} The date of month.
 */
Date_.prototype.getDate = function() {
  return this.date.getDate();
};


/**
 * Returns the number of milliseconds since 1 January 1970 00:00:00.
 *
 * @return {number} The number of milliseconds since 1 January 1970 00:00:00.
 */
Date_.prototype.getTime = function() {
  return this.date.getTime();
};


/**
 * @return {number} The day of week, US style. 0 = Sun, 6 = Sat.
 */
Date_.prototype.getDay = function() {
  return this.date.getDay();
};


/**
 * @return {weekDay} The day of week, ISO style. 0 = Mon, 6 = Sun.
 */
Date_.prototype.getIsoWeekday = function() {
  return /** @type {weekDay} */ ((this.getDay() + 6) % 7);
};


/**
 * @return {number} The day of week according to firstDayOfWeek setting.
 */
Date_.prototype.getWeekday = function() {
  return (this.getIsoWeekday() - this.firstDayOfWeek_ + 7) % 7;
};


/**
 * @return {number} The four digit year of date according to universal time.
 */
Date_.prototype.getUTCFullYear = function() {
  return this.date.getUTCFullYear();
};


/**
 * @return {month_} The month of date according to universal time,
 *     0 = Jan, 11 = Dec.
 */
Date_.prototype.getUTCMonth = function() {
  return /** @type {month_} */ (this.date.getUTCMonth());
};


/**
 * @return {number} The date of month according to universal time.
 */
Date_.prototype.getUTCDate = function() {
  return this.date.getUTCDate();
};


/**
 * @return {number} The day of week according to universal time, US style.
 *     0 = Sun, 1 = Mon, 6 = Sat.
 */
Date_.prototype.getUTCDay = function() {
  return this.date.getDay();
};


/**
 * @return {number} The hours value according to universal time.
 */
Date_.prototype.getUTCHours = function() {
  return this.date.getUTCHours();
};


/**
 * @return {number} The minutes value according to universal time.
 */
Date_.prototype.getUTCMinutes = function() {
  return this.date.getUTCMinutes();
};


/**
 * @return {weekDay} The day of week according to universal time, ISO
 *     style. 0 = Mon, 6 = Sun.
 */
Date_.prototype.getUTCIsoWeekday = function() {
  return /** @type {weekDay} */ ((this.date.getUTCDay() + 6) % 7);
};


/**
 * @return {number} The day of week according to universal time and
 *     firstDayOfWeek setting.
 */
Date_.prototype.getUTCWeekday = function() {
  return (this.getUTCIsoWeekday() - this.firstDayOfWeek_ + 7) % 7;
};


/**
 * @return {number} The first day of the week. 0 = Mon, 6 = Sun.
 */
Date_.prototype.getFirstDayOfWeek = function() {
  return this.firstDayOfWeek_;
};


/**
 * @return {number} The cut off weekday used for week number calculations.
 *     0 = Mon, 6 = Sun.
 */
Date_.prototype.getFirstWeekCutOffDay = function() {
  return this.firstWeekCutOffDay_;
};


/**
 * @return {number} The number of days for the selected month.
 */
Date_.prototype.getNumberOfDaysInMonth = function() {
  return getNumberOfDaysInMonth(this.getFullYear(), this.getMonth());
};


/**
 * @return {number} The week number.
 */
Date_.prototype.getWeekNumber = function() {
  return getWeekNumber(
      this.getFullYear(), this.getMonth(), this.getDate(),
      this.firstWeekCutOffDay_, this.firstDayOfWeek_);
};


/**
 * Returns year in “Week of Year” based calendars in which the year transition
 * occurs on a week boundary.
 * @return {number} The four digit year in "Week of Year"
 */
Date_.prototype.getYearOfWeek = function() {
  return getYearOfWeek(
      this.getFullYear(), this.getMonth(), this.getDate(),
      this.firstWeekCutOffDay_, this.firstDayOfWeek_);
};


/**
 * @return {number} The day of year.
 */
Date_.prototype.getDayOfYear = function() {
  var dayOfYear = this.getDate();
  var year = this.getFullYear();
  for (var m = this.getMonth() - 1; m >= 0; m--) {
    dayOfYear += getNumberOfDaysInMonth(year, m);
  }

  return dayOfYear;
};


/**
 * Returns timezone offset. The timezone offset is the delta in minutes between
 * UTC and your local time. E.g., UTC+10 returns -600. Daylight savings time
 * prevents this value from being constant.
 *
 * @return {number} The timezone offset.
 */
Date_.prototype.getTimezoneOffset = function() {
  return this.date.getTimezoneOffset();
};


/**
 * Returns timezone offset as a string. Returns offset in [+-]HH:mm format or Z
 * for UTC.
 *
 * @return {string} The timezone offset as a string.
 */
Date_.prototype.getTimezoneOffsetString = function() {
  var tz;
  var offset = this.getTimezoneOffset();

  if (offset == 0) {
    tz = 'Z';
  } else {
    var n = Math.abs(offset) / 60;
    var h = Math.floor(n);
    var m = (n - h) * 60;
    tz = (offset > 0 ? '-' : '+') + googString.padNumber(h, 2) + ':' +
        googString.padNumber(m, 2);
  }

  return tz;
};


/**
 * Sets the date.
 *
 * @param {Date_} date Date object to set date from.
 */
Date_.prototype.set = function(date) {
  this.date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
};


/**
 * Sets the year part of the date.
 *
 * @param {number} year Four digit year.
 */
Date_.prototype.setFullYear = function(year) {
  this.date.setFullYear(year);
};


/**
 * Alias for setFullYear.
 *
 * @param {number} year Four digit year.
 * @see #setFullYear
 */
Date_.prototype.setYear = function(year) {
  this.setFullYear(year);
};


/**
 * Sets the month part of the date.
 *
 * TODO(nnaze): Update type to month.
 *
 * @param {number} month The month, where 0 = Jan, 11 = Dec.
 */
Date_.prototype.setMonth = function(month) {
  this.date.setMonth(month);
};


/**
 * Sets the day part of the date.
 *
 * @param {number} date The day part.
 */
Date_.prototype.setDate = function(date) {
  this.date.setDate(date);
};


/**
 * Sets the value of the date object as expressed in the number of milliseconds
 * since 1 January 1970 00:00:00.
 *
 * @param {number} ms Number of milliseconds since 1 Jan 1970.
 */
Date_.prototype.setTime = function(ms) {
  this.date.setTime(ms);
};


/**
 * Sets the year part of the date according to universal time.
 *
 * @param {number} year Four digit year.
 */
Date_.prototype.setUTCFullYear = function(year) {
  this.date.setUTCFullYear(year);
};


/**
 * Sets the month part of the date according to universal time.
 *
 * @param {number} month The month, where 0 = Jan, 11 = Dec.
 */
Date_.prototype.setUTCMonth = function(month) {
  this.date.setUTCMonth(month);
};


/**
 * Sets the day part of the date according to universal time.
 *
 * @param {number} date The UTC date.
 */
Date_.prototype.setUTCDate = function(date) {
  this.date.setUTCDate(date);
};


/**
 * Sets the first day of week.
 *
 * @param {number} day 0 = Mon, 6 = Sun.
 */
Date_.prototype.setFirstDayOfWeek = function(day) {
  this.firstDayOfWeek_ = day;
};


/**
 * Sets cut off weekday used for week number calculations. 0 = Mon, 6 = Sun.
 *
 * @param {number} day The cut off weekday.
 */
Date_.prototype.setFirstWeekCutOffDay = function(day) {
  this.firstWeekCutOffDay_ = day;
};


/**
 * Performs date calculation by adding the supplied interval to the date.
 *
 * @param {Interval} interval Date interval to add.
 */
Date_.prototype.add = function(interval) {
  if (interval.years || interval.months) {
    // As months have different number of days adding a month to Jan 31 by just
    // setting the month would result in a date in early March rather than Feb
    // 28 or 29. Doing it this way overcomes that problem.

    // adjust year and month, accounting for both directions
    var month = this.getMonth() + interval.months + interval.years * 12;
    var year = this.getYear() + Math.floor(month / 12);
    month %= 12;
    if (month < 0) {
      month += 12;
    }

    var daysInTargetMonth = getNumberOfDaysInMonth(year, month);
    var date = Math.min(daysInTargetMonth, this.getDate());

    // avoid inadvertently causing rollovers to adjacent months
    this.setDate(1);

    this.setFullYear(year);
    this.setMonth(month);
    this.setDate(date);
  }

  if (interval.days) {
    // Because Javascript Date objects are being used and the 'year' argument
    // to the constructor has special behavior for values 0-99 (inclusive),
    // enable correcting for those special values being interpreted as relative
    // to the year 1900 (rather than absolute year numbers as with all other
    // integer values for that argument).
    //
    // Since only the constructor taking a separate field for the 'year' of
    // a date behaves this way, the adjustment value depends only on the initial
    // date. This is because the interval-adjusted date value uses a Date
    // constructor that avoids the problematic, special behavior for years 0-99.
    const initialYear = this.getYear();
    const yearAdjustment = initialYear >= 0 && initialYear <= 99 ? -1900 : 0;

    // Convert the days to milliseconds and add it to the UNIX timestamp.
    // Taking noon helps to avoid 1 day error due to the daylight saving.
    const noon = new Date(initialYear, this.getMonth(), this.getDate(), 12);
    const result = new Date(noon.getTime() + interval.days * 86400000);

    // Set date to 1 to prevent rollover caused by setting the year or month.
    this.setDate(1);
    this.setFullYear(result.getFullYear() + yearAdjustment);
    this.setMonth(result.getMonth());
    this.setDate(result.getDate());

    this.maybeFixDst_(result.getDate());
  }
};


/**
 * Returns ISO 8601 string representation of date. Consistent with the
 * standard built-in Date#toISOString method, the year is either four digits
 * (YYYY) or six with a sign prefix (±YYYYYY), since ISO 8601 requires the
 * number of digits in the year to be agreed upon in advance.
 *
 * @param {boolean=} opt_verbose Whether the verbose format should be used
 *     instead of the default compact one.
 * @param {boolean=} opt_tz Whether the timezone offset should be included
 *     in the string.
 * @return {string} ISO 8601 string representation of date.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
 */
Date_.prototype.toIsoString = function(opt_verbose, opt_tz) {
  var str = [
    padYear_(this.getFullYear()),
    googString.padNumber(this.getMonth() + 1, 2),
    googString.padNumber(this.getDate(), 2)
  ];

  return str.join((opt_verbose) ? '-' : '') +
      (opt_tz ? this.getTimezoneOffsetString() : '');
};


/**
 * Returns ISO 8601 string representation of date according to universal time.
 *
 * @param {boolean=} opt_verbose Whether the verbose format should be used
 *     instead of the default compact one.
 * @param {boolean=} opt_tz Whether the timezone offset should be included in
 *     the string.
 * @return {string} ISO 8601 string representation of date according to
 *     universal time.
 */
Date_.prototype.toUTCIsoString = function(opt_verbose, opt_tz) {
  var str = [
    padYear_(this.getUTCFullYear()),
    googString.padNumber(this.getUTCMonth() + 1, 2),
    googString.padNumber(this.getUTCDate(), 2)
  ];

  return str.join((opt_verbose) ? '-' : '') + (opt_tz ? 'Z' : '');
};


/**
 * Tests whether given date is equal to this Date.
 * Note: This ignores units more precise than days (hours and below)
 * and also ignores timezone considerations.
 *
 * @param {Date_} other The date to compare.
 * @return {boolean} Whether the given date is equal to this one.
 */
Date_.prototype.equals = function(other) {
  return !!(
      other && this.getYear() == other.getYear() &&
      this.getMonth() == other.getMonth() && this.getDate() == other.getDate());
};


/**
 * Overloaded toString method for object.
 * @return {string} ISO 8601 string representation of date.
 * @override
 */
Date_.prototype.toString = function() {
  return this.toIsoString();
};


/**
 * Fixes date to account for daylight savings time in browsers that fail to do
 * so automatically.
 * @param {number} expected Expected date.
 * @private
 */
Date_.prototype.maybeFixDst_ = function(expected) {
  if (this.getDate() != expected) {
    var dir = this.getDate() < expected ? 1 : -1;
    this.date.setUTCHours(this.date.getUTCHours() + dir);
  }
};


/**
 * @return {number} Value of wrapped date.
 * @override
 */
Date_.prototype.valueOf = function() {
  return this.date.valueOf();
};


/**
 * Compares two dates.  May be used as a sorting function.
 * @see goog.array.sort
 * @param {!DateLike} date1 Date to compare.
 * @param {!DateLike} date2 Date to compare.
 * @return {number} Comparison result. 0 if dates are the same, less than 0 if
 *     date1 is earlier than date2, greater than 0 if date1 is later than date2.
 */
Date_.compare = function(date1, date2) {
  return date1.getTime() - date2.getTime();
};


/**
 * Parses an ISO 8601 string as a `Date`.
 * @param {string} formatted ISO 8601 string to parse.
 * @return {?Date_} Parsed date or null if parse fails.
 */
Date_.fromIsoString = function(formatted) {
  var ret = new Date_(2000);
  return setIso8601DateOnly_(ret, formatted) ? ret : null;
};



/**
 * Class representing a date and time. Defaults to current date and time if none
 * is specified.
 *
 * Implements most methods of the native js Date object and can be used
 * interchangeably with it just as if DateTime was a subclass of Date.
 *
 * @param {(number|{getTime:?}|null)=} opt_year Four digit year or a date-like
 *     object. If not set, the created object will contain the date determined
 *     by goog.now().
 * @param {number=} opt_month Month, 0 = Jan, 11 = Dec.
 * @param {number=} opt_date Date of month, 1 - 31.
 * @param {number=} opt_hours Hours, 0 - 23.
 * @param {number=} opt_minutes Minutes, 0 - 59.
 * @param {number=} opt_seconds Seconds, 0 - 61.
 * @param {number=} opt_milliseconds Milliseconds, 0 - 999.
 * @constructor
 * @struct
 * @extends {Date_}
 */
export function DateTime(
  opt_year,
  opt_month,
  opt_date,
  opt_hours,
  opt_minutes,
  opt_seconds,
  opt_milliseconds
) {
  if (typeof opt_year === 'number') {
    /** @override */
    this.date = new Date(
        opt_year, opt_month || 0, opt_date || 1, opt_hours || 0,
        opt_minutes || 0, opt_seconds || 0, opt_milliseconds || 0);
  } else {
    this.date = new Date(
        opt_year && opt_year.getTime ? opt_year.getTime() : goog.now());
  }
}
goog.inherits(DateTime, Date_);


/**
 * @param {number} timestamp Number of milliseconds since Epoch.
 * @return {!DateTime}
 */
DateTime.fromTimestamp = function(timestamp) {
  var date = new DateTime();
  date.setTime(timestamp);
  return date;
};


/**
 * Creates a DateTime from a datetime string expressed in RFC 822 format.
 *
 * @param {string} formatted A date or datetime expressed in RFC 822 format.
 * @return {DateTime} Parsed date or null if parse fails.
 */
DateTime.fromRfc822String = function(formatted) {
  var date = new Date(formatted);
  return !isNaN(date.getTime()) ? new DateTime(date) : null;
};


/**
 * Returns the hours part of the datetime.
 *
 * @return {number} An integer between 0 and 23, representing the hour.
 */
DateTime.prototype.getHours = function() {
  return this.date.getHours();
};


/**
 * Returns the minutes part of the datetime.
 *
 * @return {number} An integer between 0 and 59, representing the minutes.
 */
DateTime.prototype.getMinutes = function() {
  return this.date.getMinutes();
};


/**
 * Returns the seconds part of the datetime.
 *
 * @return {number} An integer between 0 and 59, representing the seconds.
 */
DateTime.prototype.getSeconds = function() {
  return this.date.getSeconds();
};


/**
 * Returns the milliseconds part of the datetime.
 *
 * @return {number} An integer between 0 and 999, representing the milliseconds.
 */
DateTime.prototype.getMilliseconds = function() {
  return this.date.getMilliseconds();
};


/**
 * Returns the day of week according to universal time, US style.
 *
 * @return {weekDay} Day of week, 0 = Sun, 1 = Mon, 6 = Sat.
 * @override
 */
DateTime.prototype.getUTCDay = function() {
  return /** @type {weekDay} */ (this.date.getUTCDay());
};


/**
 * Returns the hours part of the datetime according to universal time.
 *
 * @return {number} An integer between 0 and 23, representing the hour.
 * @override
 */
DateTime.prototype.getUTCHours = function() {
  return this.date.getUTCHours();
};


/**
 * Returns the minutes part of the datetime according to universal time.
 *
 * @return {number} An integer between 0 and 59, representing the minutes.
 * @override
 */
DateTime.prototype.getUTCMinutes = function() {
  return this.date.getUTCMinutes();
};


/**
 * Returns the seconds part of the datetime according to universal time.
 *
 * @return {number} An integer between 0 and 59, representing the seconds.
 */
DateTime.prototype.getUTCSeconds = function() {
  return this.date.getUTCSeconds();
};


/**
 * Returns the milliseconds part of the datetime according to universal time.
 *
 * @return {number} An integer between 0 and 999, representing the milliseconds.
 */
DateTime.prototype.getUTCMilliseconds = function() {
  return this.date.getUTCMilliseconds();
};


/**
 * Sets the hours part of the datetime.
 *
 * @param {number} hours An integer between 0 and 23, representing the hour.
 */
DateTime.prototype.setHours = function(hours) {
  this.date.setHours(hours);
};


/**
 * Sets the minutes part of the datetime.
 *
 * @param {number} minutes Integer between 0 and 59, representing the minutes.
 */
DateTime.prototype.setMinutes = function(minutes) {
  this.date.setMinutes(minutes);
};


/**
 * Sets the seconds part of the datetime.
 *
 * @param {number} seconds Integer between 0 and 59, representing the seconds.
 */
DateTime.prototype.setSeconds = function(seconds) {
  this.date.setSeconds(seconds);
};


/**
 * Sets the milliseconds part of the datetime.
 *
 * @param {number} ms Integer between 0 and 999, representing the milliseconds.
 */
DateTime.prototype.setMilliseconds = function(ms) {
  this.date.setMilliseconds(ms);
};


/**
 * Sets the hours part of the datetime according to universal time.
 *
 * @param {number} hours An integer between 0 and 23, representing the hour.
 */
DateTime.prototype.setUTCHours = function(hours) {
  this.date.setUTCHours(hours);
};


/**
 * Sets the minutes part of the datetime according to universal time.
 *
 * @param {number} minutes Integer between 0 and 59, representing the minutes.
 */
DateTime.prototype.setUTCMinutes = function(minutes) {
  this.date.setUTCMinutes(minutes);
};


/**
 * Sets the seconds part of the datetime according to universal time.
 *
 * @param {number} seconds Integer between 0 and 59, representing the seconds.
 */
DateTime.prototype.setUTCSeconds = function(seconds) {
  this.date.setUTCSeconds(seconds);
};


/**
 * Sets the seconds part of the datetime according to universal time.
 *
 * @param {number} ms Integer between 0 and 999, representing the milliseconds.
 */
DateTime.prototype.setUTCMilliseconds = function(ms) {
  this.date.setUTCMilliseconds(ms);
};


/**
 * @return {boolean} Whether the datetime is aligned to midnight.
 */
DateTime.prototype.isMidnight = function() {
  return this.getHours() == 0 && this.getMinutes() == 0 &&
      this.getSeconds() == 0 && this.getMilliseconds() == 0;
};


/**
 * Performs date calculation by adding the supplied interval to the date.
 *
 * @param {Interval} interval Date interval to add.
 * @override
 */
DateTime.prototype.add = function(interval) {
  Date_.prototype.add.call(this, interval);

  if (interval.hours) {
    this.setUTCHours(this.date.getUTCHours() + interval.hours);
  }
  if (interval.minutes) {
    this.setUTCMinutes(this.date.getUTCMinutes() + interval.minutes);
  }
  if (interval.seconds) {
    this.setUTCSeconds(this.date.getUTCSeconds() + interval.seconds);
  }
};


/**
 * Returns ISO 8601 string representation of date/time. Consistent with the
 * standard built-in Date#toISOString method, the year is either four digits
 * (YYYY) or six with a sign prefix (±YYYYYY), since ISO 8601 requires the
 * number of digits in the year to be agreed upon in advance.
 *
 * @param {boolean=} opt_verbose Whether the verbose format should be used
 *     instead of the default compact one.
 * @param {boolean=} opt_tz Whether the timezone offset should be included
 *     in the string.
 * @return {string} ISO 8601 string representation of date/time.
 * @override
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
 */
DateTime.prototype.toIsoString = function(opt_verbose, opt_tz) {
  var dateString = Date_.prototype.toIsoString.call(this, opt_verbose);

  if (opt_verbose) {
    return dateString + 'T' + googString.padNumber(this.getHours(), 2) + ':' +
        googString.padNumber(this.getMinutes(), 2) + ':' +
        googString.padNumber(this.getSeconds(), 2) +
        (opt_tz ? this.getTimezoneOffsetString() : '');
  }

  return dateString + 'T' + googString.padNumber(this.getHours(), 2) +
      googString.padNumber(this.getMinutes(), 2) +
      googString.padNumber(this.getSeconds(), 2) +
      (opt_tz ? this.getTimezoneOffsetString() : '');
};


/**
 * Returns XML Schema 2 string representation of date/time.
 * The return value is also ISO 8601 compliant.
 *
 * @param {boolean=} opt_timezone Should the timezone offset be included in the
 *     string?.
 * @return {string} XML Schema 2 string representation of date/time.
 */
DateTime.prototype.toXmlDateTime = function(opt_timezone) {
  return Date_.prototype.toIsoString.call(this, true) + 'T' +
      googString.padNumber(this.getHours(), 2) + ':' +
      googString.padNumber(this.getMinutes(), 2) + ':' +
      googString.padNumber(this.getSeconds(), 2) +
      (opt_timezone ? this.getTimezoneOffsetString() : '');
};


/**
 * Returns ISO 8601 string representation of date/time according to universal
 * time.
 *
 * @param {boolean=} opt_verbose Whether the opt_verbose format should be
 *     returned instead of the default compact one.
 * @param {boolean=} opt_tz Whether the timezone offset should be included in
 *     the string.
 * @return {string} ISO 8601 string representation of date/time according to
 *     universal time.
 * @override
 */
DateTime.prototype.toUTCIsoString = function(opt_verbose, opt_tz) {
  var dateStr = Date_.prototype.toUTCIsoString.call(this, opt_verbose);

  if (opt_verbose) {
    return dateStr + 'T' + googString.padNumber(this.getUTCHours(), 2) + ':' +
        googString.padNumber(this.getUTCMinutes(), 2) + ':' +
        googString.padNumber(this.getUTCSeconds(), 2) + (opt_tz ? 'Z' : '');
  }

  return dateStr + 'T' + googString.padNumber(this.getUTCHours(), 2) +
      googString.padNumber(this.getUTCMinutes(), 2) +
      googString.padNumber(this.getUTCSeconds(), 2) + (opt_tz ? 'Z' : '');
};


/**
 * Returns RFC 3339 string representation of datetime in UTC.
 *
 * @return {string} A UTC datetime expressed in RFC 3339 format.
 */
DateTime.prototype.toUTCRfc3339String = function() {
  var date = this.toUTCIsoString(true);
  var millis = this.getUTCMilliseconds();
  return (millis ? date + '.' + googString.padNumber(millis, 3) : date) + 'Z';
};


/**
 * Tests whether given datetime is exactly equal to this DateTime.
 *
 * @param {Date_} other The datetime to compare.
 * @return {boolean} Whether the given datetime is exactly equal to this one.
 * @override
 */
DateTime.prototype.equals = function(other) {
  return this.getTime() == other.getTime();
};


/**
 * Overloaded toString method for object.
 * @return {string} ISO 8601 string representation of date/time.
 * @override
 */
DateTime.prototype.toString = function() {
  return this.toIsoString();
};


/**
 * Generates time label for the datetime, e.g., '5:30 AM'.
 * By default this does not pad hours (e.g., to '05:30') and it does add
 * an am/pm suffix.
 * TODO(user): i18n -- hardcoding time format like this is bad.  E.g., in CJK
 *               locales, need Chinese characters for hour and minute units.
 * @param {boolean=} opt_padHours Whether to pad hours, e.g., '05:30' vs '5:30'.
 * @param {boolean=} opt_showAmPm Whether to show the 'am' and 'pm' suffix.
 * @param {boolean=} opt_omitZeroMinutes E.g., '5:00pm' becomes '5pm',
 *                                      but '5:01pm' remains '5:01pm'.
 * @return {string} The time label.
 * @deprecated Use goog.i18n.DateTimeFormat with
 *     goog.i18n.DateTimeFormat.Format.FULL_TIME or
 *     goog.i18n.DateTimeFormat.Format.LONG_TIME or
 *     goog.i18n.DateTimeFormat.Format.MEDIUM_TIME or
 *     goog.i18n.DateTimeFormat.Format.SHORT_TIME.
 */
DateTime.prototype.toUsTimeString = function(
    opt_padHours, opt_showAmPm, opt_omitZeroMinutes) {
  var hours = this.getHours();

  // show am/pm marker by default
  if (opt_showAmPm === undefined) {
    opt_showAmPm = true;
  }

  // 12pm
  var isPM = hours == 12;

  // change from 1-24 to 1-12 basis
  if (hours > 12) {
    hours -= 12;
    isPM = true;
  }

  // midnight is expressed as "12am", but if am/pm marker omitted, keep as '0'
  if (hours == 0 && opt_showAmPm) {
    hours = 12;
  }

  var label = opt_padHours ? googString.padNumber(hours, 2) : String(hours);
  var minutes = this.getMinutes();
  if (!opt_omitZeroMinutes || minutes > 0) {
    label += ':' + googString.padNumber(minutes, 2);
  }

  // by default, show am/pm suffix
  if (opt_showAmPm) {
    label += isPM ? ' PM' : ' AM';
  }
  return label;
};


/**
 * Generates time label for the datetime in standard ISO 24-hour time format.
 * E.g., '06:00:00' or '23:30:15'.
 * @param {boolean=} opt_showSeconds Whether to shows seconds. Defaults to TRUE.
 * @return {string} The time label.
 */
DateTime.prototype.toIsoTimeString = function(opt_showSeconds) {
  var hours = this.getHours();
  var label = googString.padNumber(hours, 2) + ':' +
      googString.padNumber(this.getMinutes(), 2);
  if (opt_showSeconds === undefined || opt_showSeconds) {
    label += ':' + googString.padNumber(this.getSeconds(), 2);
  }
  return label;
};


/**
 * @return {!DateTime} A clone of the datetime object.
 * @override
 */
DateTime.prototype.clone = function() {
  var date = new DateTime(this.date);
  date.setFirstDayOfWeek(this.getFirstDayOfWeek());
  date.setFirstWeekCutOffDay(this.getFirstWeekCutOffDay());
  return date;
};


/**
 * Parses an ISO 8601 string as a `DateTime`.
 * @param {string} formatted ISO 8601 string to parse.
 * @return {?DateTime} Parsed date or null if parse fails.
 * @override
 */
DateTime.fromIsoString = function(formatted) {
  var ret = new DateTime(2000);
  return setIso8601DateTime(ret, formatted) ? ret : null;
};
