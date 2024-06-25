/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Functions for formatting duration values.  Such as "3 days"
 * "3 hours", "14 minutes", "2 hours 45 minutes".
 */

import { DateTimeFormat } from '../i18n/datetimeformat.js';

import { MessageFormat } from '../i18n/messageformat.js';


/**
 * Number of milliseconds in a minute.
 * @type {number}
 * @private
 */
var MINUTE_MS_ = 60000;


/**
 * Number of milliseconds in an hour.
 * @type {number}
 * @private
 */
var HOUR_MS_ = 3600000;


/**
 * Number of milliseconds in a day.
 * @type {number}
 * @private
 */
var DAY_MS_ = 86400000;


/**
 * Accepts a duration in milliseconds and outputs an absolute duration time in
 * form of "1 day", "2 hours", "20 minutes", "2 days 1 hour 15 minutes" etc.
 * @param {number} durationMs Duration in milliseconds.
 * @return {string} The formatted duration.
 */
export function format(durationMs) {
 var ms = Math.abs(durationMs);

 // Handle durations shorter than 1 minute.
 if (ms < MINUTE_MS_) {
   /**
    * @desc Duration time of zero minutes.
    */
   var MSG_ZERO_MINUTES = goog.getMsg('0 minutes');
   return MSG_ZERO_MINUTES;
 }

 var days = Math.floor(ms / DAY_MS_);
 ms %= DAY_MS_;

 var hours = Math.floor(ms / HOUR_MS_);
 ms %= HOUR_MS_;

 var minutes = Math.floor(ms / MINUTE_MS_);

 // Localized number representations.
 var daysText = DateTimeFormat.localizeNumbers(days);
 var hoursText = DateTimeFormat.localizeNumbers(hours);
 var minutesText = DateTimeFormat.localizeNumbers(minutes);

 // We need a space after the days if there are hours or minutes to come.
 var daysSeparator = days * (hours + minutes) ? ' ' : '';
 // We need a space after the hours if there are minutes to come.
 var hoursSeparator = hours * minutes ? ' ' : '';

 /**
  * @desc The days part of the duration message: 1 day, 5 days.
  */
 var MSG_DURATION_DAYS = goog.getMsg(
     '{COUNT, plural, ' +
     '=0 {}' +
     '=1 {{TEXT} day}' +
     'other {{TEXT} days}}');
 /**
  * @desc The hours part of the duration message: 1 hour, 5 hours.
  */
 var MSG_DURATION_HOURS = goog.getMsg(
     '{COUNT, plural, ' +
     '=0 {}' +
     '=1 {{TEXT} hour}' +
     'other {{TEXT} hours}}');
 /**
  * @desc The minutes part of the duration message: 1 minute, 5 minutes.
  */
 var MSG_DURATION_MINUTES = goog.getMsg(
     '{COUNT, plural, ' +
     '=0 {}' +
     '=1 {{TEXT} minute}' +
     'other {{TEXT} minutes}}');

 var daysPart = getDurationMessagePart_(
     MSG_DURATION_DAYS, days, daysText);
 var hoursPart = getDurationMessagePart_(
     MSG_DURATION_HOURS, hours, hoursText);
 var minutesPart = getDurationMessagePart_(
     MSG_DURATION_MINUTES, minutes, minutesText);

 /**
  * @desc Duration time text concatenated from the individual time unit message
  * parts. The separator will be a space (e.g. '1 day 2 hours 24 minutes') or
  * nothing in case one/two of the duration parts is empty (
  * e.g. '1 hour 30 minutes', '3 days 15 minutes', '2 hours').
  */
 var MSG_CONCATENATED_DURATION_TEXT = goog.getMsg(
     '{$daysPart}{$daysSeparator}{$hoursPart}{$hoursSeparator}{$minutesPart}',
     {
       'daysPart': daysPart,
       'daysSeparator': daysSeparator,
       'hoursPart': hoursPart,
       'hoursSeparator': hoursSeparator,
       'minutesPart': minutesPart
     });

 return MSG_CONCATENATED_DURATION_TEXT;
}


/**
 * Gets a duration message part for a time unit.
 * @param {string} pattern The pattern to apply.
 * @param {number} count The number of units.
 * @param {string} text The string to use for amount of units in the message.
 * @return {string} The formatted message part.
 * @private
 */
function getDurationMessagePart_(pattern, count, text) {
 var formatter = new MessageFormat(pattern);
 return formatter.format({'COUNT': count, 'TEXT': text});
}
