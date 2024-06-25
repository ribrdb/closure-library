/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Date range data structure. Based loosely on
 * com.google.common.util.DateRange.
 */

import { Date, Interval } from './date.js';

import * as iter from '../iter/iter.js';
import { Iterator } from '../iter/iter.js';



/**
 * Constructs a date range.
 * @constructor
 * @struct
 * @param {Date} startDate The first date in the range.
 * @param {Date} endDate The last date in the range.
 * @final
 */
export function DateRange(startDate, endDate) {
  /**
     * The first date in the range.
     * @type {Date}
     * @private
     */
  this.startDate_ = startDate;

  /**
     * The last date in the range.
     * @type {Date}
     * @private
     */
  this.endDate_ = endDate;
}


/**
 * The first possible day, as far as this class is concerned.
 * @type {Date}
 */
DateRange.MINIMUM_DATE = new Date(0, 0, 1);


/**
 * The last possible day, as far as this class is concerned.
 * @type {Date}
 */
DateRange.MAXIMUM_DATE = new Date(9999, 11, 31);


/**
 * @return {Date} The first date in the range.
 */
DateRange.prototype.getStartDate = function() {
  return this.startDate_;
};


/**
 * @return {Date} The last date in the range.
 */
DateRange.prototype.getEndDate = function() {
  return this.endDate_;
};


/**
 * Tests if a date falls within this range.
 *
 * @param {Date} date The date to test.
 * @return {boolean} Whether the date is in the range.
 */
DateRange.prototype.contains = function(date) {
  return date.valueOf() >= this.startDate_.valueOf() &&
      date.valueOf() <= this.endDate_.valueOf();
};


/**
 * @return {!DateRange.Iterator} An iterator over the date range.
 */
DateRange.prototype.iterator = function() {
  return new DateRange.Iterator(this);
};


/**
 * Tests two {@link DateRange} objects for equality.
 * @param {DateRange} a A date range.
 * @param {DateRange} b A date range.
 * @return {boolean} Whether |a| is the same range as |b|.
 */
DateRange.equals = function(a, b) {
  // Test for same object reference; type conversion is irrelevant.
  if (a === b) {
    return true;
  }

  if (a == null || b == null) {
    return false;
  }

  return a.startDate_.equals(b.startDate_) && a.endDate_.equals(b.endDate_);
};


/**
 * Calculates a date that is a number of days after a date. Does not modify its
 * input.
 * @param {Date} date The input date.
 * @param {number} offset Number of days.
 * @return {!Date} The date that is |offset| days after |date|.
 * @private
 */
DateRange.offsetInDays_ = function(date, offset) {
  var newDate = date.clone();
  newDate.add(new Interval(Interval.DAYS, offset));
  return newDate;
};


/**
 * Calculates a date that is a number of months after the first day in the
 * month that contains its input. Does not modify its input.
 * @param {Date} date The input date.
 * @param {number} offset Number of months.
 * @return {!Date} The date that is |offset| months after the first
 *     day in the month that contains |date|.
 * @private
 */
DateRange.offsetInMonths_ = function(date, offset) {
  var newDate = date.clone();
  newDate.setDate(1);
  newDate.add(new Interval(Interval.MONTHS, offset));
  return newDate;
};


/**
 * Returns the range from yesterday to yesterday.
 * @param {Date=} opt_today The date to consider today.
 *     Defaults to today.
 * @return {!DateRange} The range that includes only yesterday.
 */
DateRange.yesterday = function(opt_today) {
  var today = DateRange.cloneOrCreate_(opt_today);
  var yesterday = DateRange.offsetInDays_(today, -1);
  return new DateRange(yesterday, yesterday.clone());
};


/**
 * Returns the range from today to today.
 * @param {Date=} opt_today The date to consider today.
 *     Defaults to today.
 * @return {!DateRange} The range that includes only today.
 */
DateRange.today = function(opt_today) {
  var today = DateRange.cloneOrCreate_(opt_today);
  return new DateRange(today, today.clone());
};


/**
 * Returns the range that includes the seven days that end yesterday.
 * @param {Date=} opt_today The date to consider today.
 *     Defaults to today.
 * @return {!DateRange} The range that includes the seven days that
 *     end yesterday.
 */
DateRange.last7Days = function(opt_today) {
  var today = DateRange.cloneOrCreate_(opt_today);
  var yesterday = DateRange.offsetInDays_(today, -1);
  return new DateRange(
      DateRange.offsetInDays_(today, -7), yesterday);
};


/**
 * Returns the range that starts the first of this month and ends the last day
 * of this month.
 * @param {Date=} opt_today The date to consider today.
 *     Defaults to today.
 * @return {!DateRange} The range that starts the first of this month
 *     and ends the last day of this month.
 */
DateRange.thisMonth = function(opt_today) {
  var today = DateRange.cloneOrCreate_(opt_today);
  return new DateRange(
      DateRange.offsetInMonths_(today, 0),
      DateRange.offsetInDays_(
          DateRange.offsetInMonths_(today, 1), -1));
};


/**
 * Returns the range that starts the first of last month and ends the last day
 * of last month.
 * @param {Date=} opt_today The date to consider today.
 *     Defaults to today.
 * @return {!DateRange} The range that starts the first of last month
 *     and ends the last day of last month.
 */
DateRange.lastMonth = function(opt_today) {
  var today = DateRange.cloneOrCreate_(opt_today);
  return new DateRange(
      DateRange.offsetInMonths_(today, -1),
      DateRange.offsetInDays_(
          DateRange.offsetInMonths_(today, 0), -1));
};


/**
 * Returns the seven-day range that starts on the first day of the week
 * (see {@link goog.i18n.DateTimeSymbols.FIRSTDAYOFWEEK}) on or before today.
 * @param {Date=} opt_today The date to consider today.
 *     Defaults to today.
 * @return {!DateRange} The range that starts the Monday on or before
 *     today and ends the Sunday on or after today.
 */
DateRange.thisWeek = function(opt_today) {
  var today = DateRange.cloneOrCreate_(opt_today);
  var iso = today.getIsoWeekday();
  var firstDay = today.getFirstDayOfWeek();
  var i18nFirstDay = (iso >= firstDay) ? iso - firstDay : iso + (7 - firstDay);
  var start = DateRange.offsetInDays_(today, -i18nFirstDay);
  var end = DateRange.offsetInDays_(start, 6);
  return new DateRange(start, end);
};


/**
 * Returns the seven-day range that ends the day before the first day of
 * the week (see {@link goog.i18n.DateTimeSymbols.FIRSTDAYOFWEEK}) that
 * contains today.
 * @param {Date=} opt_today The date to consider today.
 *     Defaults to today.
 * @return {!DateRange} The range that starts seven days before the
 *     Monday on or before today and ends the Sunday on or before yesterday.
 */
DateRange.lastWeek = function(opt_today) {
  var thisWeek = DateRange.thisWeek(opt_today);
  var start = DateRange.offsetInDays_(thisWeek.getStartDate(), -7);
  var end = DateRange.offsetInDays_(thisWeek.getEndDate(), -7);
  return new DateRange(start, end);
};


/**
 * Returns the range that starts seven days before the Monday on or before
 * today and ends the Friday before today.
 * @param {Date=} opt_today The date to consider today.
 *     Defaults to today.
 * @return {!DateRange} The range that starts seven days before the
 *     Monday on or before today and ends the Friday before today.
 */
DateRange.lastBusinessWeek = function(opt_today) {
  // TODO(user): should be i18nized.
  var today = DateRange.cloneOrCreate_(opt_today);
  var start =
      DateRange.offsetInDays_(today, -7 - today.getIsoWeekday());
  var end = DateRange.offsetInDays_(start, 4);
  return new DateRange(start, end);
};


/**
 * Returns the range that includes all days between January 1, 1900 and
 * December 31, 9999.
 * @param {Date=} opt_today The date to consider today.
 *     Defaults to today.
 * @return {!DateRange} The range that includes all days between
 *     January 1, 1900 and December 31, 9999.
 */
DateRange.allTime = function(opt_today) {
  return new DateRange(
      DateRange.MINIMUM_DATE, DateRange.MAXIMUM_DATE);
};


/**
 * Standard date range keys. Equivalent to the enum IDs in
 * DateRange.java http://go/datarange.java
 *
 * @enum {string}
 */
DateRange.StandardDateRangeKeys = {
  YESTERDAY: 'yesterday',
  TODAY: 'today',
  LAST_7_DAYS: 'last7days',
  THIS_MONTH: 'thismonth',
  LAST_MONTH: 'lastmonth',
  THIS_WEEK: 'thisweek',
  LAST_WEEK: 'lastweek',
  LAST_BUSINESS_WEEK: 'lastbusinessweek',
  ALL_TIME: 'alltime'
};


/**
 * @param {string} dateRangeKey A standard date range key.
 * @param {Date=} opt_today The date to consider today.
 *     Defaults to today.
 * @return {!DateRange} The date range that corresponds to that key.
 * @throws {Error} If no standard date range with that key exists.
 */
DateRange.standardDateRange = function(dateRangeKey, opt_today) {
  switch (dateRangeKey) {
    case DateRange.StandardDateRangeKeys.YESTERDAY:
      return DateRange.yesterday(opt_today);

    case DateRange.StandardDateRangeKeys.TODAY:
      return DateRange.today(opt_today);

    case DateRange.StandardDateRangeKeys.LAST_7_DAYS:
      return DateRange.last7Days(opt_today);

    case DateRange.StandardDateRangeKeys.THIS_MONTH:
      return DateRange.thisMonth(opt_today);

    case DateRange.StandardDateRangeKeys.LAST_MONTH:
      return DateRange.lastMonth(opt_today);

    case DateRange.StandardDateRangeKeys.THIS_WEEK:
      return DateRange.thisWeek(opt_today);

    case DateRange.StandardDateRangeKeys.LAST_WEEK:
      return DateRange.lastWeek(opt_today);

    case DateRange.StandardDateRangeKeys.LAST_BUSINESS_WEEK:
      return DateRange.lastBusinessWeek(opt_today);

    case DateRange.StandardDateRangeKeys.ALL_TIME:
      return DateRange.allTime(opt_today);

    default:
      throw new Error('no such date range key: ' + dateRangeKey);
  }
};


/**
 * Clones or creates new.
 * @param {Date=} opt_today The date to consider today.
 *     Defaults to today.
 * @return {!Date} cloned or new.
 * @private
 */
DateRange.cloneOrCreate_ = function(opt_today) {
  return opt_today ? opt_today.clone() : new Date();
};



/**
 * Creates an iterator over the dates in a {@link DateRange}.
 * @constructor
 * @struct
 * @extends {Iterator<Date>}
 * @param {DateRange} dateRange The date range to iterate.
 * @final
 */
DateRange.Iterator = function(dateRange) {
  /**
     * The next date.
     * @type {Date}
     * @private
     */
  this.nextDate_ = dateRange.getStartDate().clone();

  /**
   * The end date, expressed as an integer: YYYYMMDD.
   * @type {number}
   * @private
   */
  this.endDate_ = Number(dateRange.getEndDate().toIsoString());
};
goog.inherits(DateRange.Iterator, Iterator);


/**
 * @return {!IIterableResult<!Date>}
 * @override
 */
DateRange.Iterator.prototype.next = function() {
  if (Number(this.nextDate_.toIsoString()) > this.endDate_) {
    return iter.ES6_ITERATOR_DONE;
  }

  var rv = this.nextDate_.clone();
  this.nextDate_.add(new Interval(Interval.DAYS, 1));
  return iter.createEs6IteratorYield(rv);
};
