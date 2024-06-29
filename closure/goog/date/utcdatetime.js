/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Locale independent date/time class.
 */

import * as googDate from './date.js';

import { Date as dateDate, DateTime, Interval, DateLike } from './date.js';



/**
 * Class representing a date/time in GMT+0 time zone, without daylight saving.
 * Defaults to current date and time if none is specified. The get... and the
 * getUTC... methods are equivalent.
 *
 * @param {number|DateLike=} opt_year Four digit UTC year or a
 *     date-like object.  If not set, the created object will contain the
 *     date determined by goog.now().
 * @param {number=} opt_month UTC month, 0 = Jan, 11 = Dec.
 * @param {number=} opt_date UTC date of month, 1 - 31.
 * @param {number=} opt_hours UTC hours, 0 - 23.
 * @param {number=} opt_minutes UTC minutes, 0 - 59.
 * @param {number=} opt_seconds UTC seconds, 0 - 59.
 * @param {number=} opt_milliseconds UTC milliseconds, 0 - 999.
 * @constructor
 * @struct
 * @extends {DateTime}
 */
export function UtcDateTime(
    opt_year,
    opt_month,
    opt_date,
    opt_hours,
    opt_minutes,
    opt_seconds,
    opt_milliseconds
) {
    var timestamp;
    if (typeof opt_year === 'number') {
      timestamp = Date.UTC(
          opt_year, opt_month || 0, opt_date || 1, opt_hours || 0,
          opt_minutes || 0, opt_seconds || 0, opt_milliseconds || 0);
    } else {
      timestamp = opt_year ? opt_year.getTime() : goog.now();
    }
    /** @override */
    this.date = new Date(timestamp);
}
goog.inherits(UtcDateTime, DateTime);


/**
 * @param {number} timestamp Number of milliseconds since Epoch.
 * @return {!UtcDateTime}
 */
UtcDateTime.fromTimestamp = function(timestamp) {
    var date = new UtcDateTime();
    date.setTime(timestamp);
    return date;
};


/**
 * Creates a DateTime from a UTC datetime string expressed in ISO 8601 format.
 *
 * @param {string} formatted A date or datetime expressed in ISO 8601 format.
 * @return {UtcDateTime} Parsed date or null if parse fails.
 */
UtcDateTime.fromIsoString = function(formatted) {
    var ret = new UtcDateTime(2000);
    return googDate.setIso8601DateTime(ret, formatted) ? ret : null;
};


/**
 * Clones the UtcDateTime object.
 *
 * @return {!UtcDateTime} A clone of the datetime object.
 * @override
 */
UtcDateTime.prototype.clone = function() {
    var date = new UtcDateTime(this.date);
    date.setFirstDayOfWeek(this.getFirstDayOfWeek());
    date.setFirstWeekCutOffDay(this.getFirstWeekCutOffDay());
    return date;
};


/** @override */
UtcDateTime.prototype.add = function(interval) {
    if (interval.years || interval.months) {
      var yearsMonths = new Interval(interval.years, interval.months);
      dateDate.prototype.add.call(this, yearsMonths);
    }
    var daysAndTimeMillis = 1000 *
        (interval.seconds +
         60 * (interval.minutes + 60 * (interval.hours + 24 * interval.days)));
    this.date = new Date(this.date.getTime() + daysAndTimeMillis);
};


/** @override */
UtcDateTime.prototype.getTimezoneOffset = function() {
    return 0;
};


/** @override */
UtcDateTime.prototype.getFullYear =
    DateTime.prototype.getUTCFullYear;


/** @override */
UtcDateTime.prototype.getMonth =
    DateTime.prototype.getUTCMonth;


/** @override */
UtcDateTime.prototype.getDate =
    DateTime.prototype.getUTCDate;


/** @override */
UtcDateTime.prototype.getHours =
    DateTime.prototype.getUTCHours;


/** @override */
UtcDateTime.prototype.getMinutes =
    DateTime.prototype.getUTCMinutes;


/** @override */
UtcDateTime.prototype.getSeconds =
    DateTime.prototype.getUTCSeconds;


/** @override */
UtcDateTime.prototype.getMilliseconds =
    DateTime.prototype.getUTCMilliseconds;


/** @override */
UtcDateTime.prototype.getDay = DateTime.prototype.getUTCDay;


/** @override */
UtcDateTime.prototype.setFullYear =
    DateTime.prototype.setUTCFullYear;


/** @override */
UtcDateTime.prototype.setMonth =
    DateTime.prototype.setUTCMonth;


/** @override */
UtcDateTime.prototype.setDate =
    DateTime.prototype.setUTCDate;


/** @override */
UtcDateTime.prototype.setHours =
    DateTime.prototype.setUTCHours;


/** @override */
UtcDateTime.prototype.setMinutes =
    DateTime.prototype.setUTCMinutes;


/** @override */
UtcDateTime.prototype.setSeconds =
    DateTime.prototype.setUTCSeconds;


/** @override */
UtcDateTime.prototype.setMilliseconds =
    DateTime.prototype.setUTCMilliseconds;
