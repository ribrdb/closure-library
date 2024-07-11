/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Information on flexible day periods from CLDR
 * needed for the enumerated patterns in a locale
 */

/**
 * Fields for each day period
 * formatNames 1-3 styles: wide (default), narrow, & abbreviated
 * standaloneNames 1-3 styles:  wide (default), narrow, & abbreviated
 * @typedef {{
 *    at: (string|undefined),
 *    from: (string|undefined),
 *    before: (string|undefined),
 *    periodName: (string),
 *    formatNames: (!Array<string>|undefined),
 *    standaloneNames: (!Array<string>|undefined)
 *  }}
 */
export let DayPeriodInfo;

/**
 * Information on periods of the day for a locale
 * @typedef {{
 *    midnight: (?DayPeriodInfo|undefined),
 *    noon: (?DayPeriodInfo|undefined),
 *    morning1: (?DayPeriodInfo|undefined),
 *    morning2: (?DayPeriodInfo|undefined),
 *    afternoon1: (?DayPeriodInfo|undefined),
 *    afternoon2: (?DayPeriodInfo|undefined),
 *    evening1: (?DayPeriodInfo|undefined),
 *    evening2: (?DayPeriodInfo|undefined),
 *    night1: (?DayPeriodInfo|undefined),
 *    night2: (?DayPeriodInfo|undefined)
 *  }}
 */
export let DayPeriods;

/**
 * Data for dayperiods by locale.
 * @type {!DayPeriods}
 */
export let DayPeriods_zh_Hant = {
  midnight: {at: '00:00', formatNames: ['午夜'], periodName: 'midnight'},
  night1: {
    from: '00:00',
    before: '05:00',
    formatNames: ['凌晨'],
    periodName: 'night1'
  },
  morning1: {
    from: '05:00',
    before: '08:00',
    formatNames: ['清晨'],
    periodName: 'morning1'
  },
  morning2: {
    from: '08:00',
    before: '12:00',
    formatNames: ['上午'],
    periodName: 'morning2'
  },
  afternoon1: {
    from: '12:00',
    before: '13:00',
    formatNames: ['中午'],
    periodName: 'afternoon1'
  },
  afternoon2: {
    from: '13:00',
    before: '19:00',
    formatNames: ['下午'],
    periodName: 'afternoon2'
  },
  evening1: {
    from: '19:00',
    before: '24:00',
    formatNames: ['晚上'],
    periodName: 'evening1'
  },
};

/**
 * DayPeriods information for the selected locale. This may be undefined or
 * null.
 * @type {?DayPeriods}
 */
let defaultDayPeriods;

/**
 * Returns the DayPeriod for the given locale. This may be undefined or null.
 * @return {?DayPeriods}
 */
export function getDayPeriods() {
  return defaultDayPeriods;
};

/**
 * Sets the default ListFormatSymbols
 * @param {?DayPeriods} newDayPeriods
 */
export function setDayPeriods(newDayPeriods) {
  defaultDayPeriods = newDayPeriods;
};

/**
 * Selected day period time information by locale.
 */
switch (goog.LOCALE) {
  case 'zh-Hant':
  case 'zh_Hant':
  case 'zh-Hant-TW':
  case 'zh_Hant_TW':
  case 'zh-TW':
  case 'zh_TW':
    defaultDayPeriods = DayPeriods_zh_Hant;
    break;
  default:
    // No day periods are required.
    defaultDayPeriods = null;
    break;
}
