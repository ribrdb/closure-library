/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Extended date/time patterns.
 *
 * File generated from CLDR ver. 43
 *
 * To reduce the file size (which may cause issues in some JS
 * developing environments), this file will only contain locales
 * that are frequently used by web applications. This is defined as
 * proto/closure_locales_data.txt and will change (most likely addition)
 * over time.  Rest of the data can be found in another file named
 * "datetimepatternsext.js", which will be generated at
 * the same time together with this file.
 *
 * @suppress {const,useOfGoogProvide}
 */

// clang-format off

/**
 * Only locales that can be enumerated in ICU are supported. For the rest
 * of the locales, it will fallback to 'en'.
 * The code is designed to work with Closure compiler using
 * ADVANCED_OPTIMIZATIONS. We will continue to add popular date/time
 * patterns over time. There is no intention to cover all possible
 * usages. If simple pattern works fine, it won't be covered here either.
 * For example, pattern 'MMM' will work well to get short month name for
 * almost all locales thus won't be included here.
 */

const { DateTimePatternsType } = goog.requireType('goog.i18n.DateTimePatternsType');


/**
 * Extended set of localized date/time patterns for locale af.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_af = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM-y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'dd-MM',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale am.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_am = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'MMMM dd',
  MONTH_DAY_SHORT: 'M/d',
  MONTH_DAY_MEDIUM: 'MMMM d',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE፣ MMM d',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE፣ MMM d y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'MMM d h:mm a zzzz'
};


/**
 * Extended set of localized date/time patterns for locale ar.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_ar = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM‏/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'd‏/M',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE، d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE، d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM، h:mm a zzzz'
};


/**
 * Extended set of localized date/time patterns for locale ar_DZ.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_ar_DZ = DateTimePatterns_ar;


/**
 * Extended set of localized date/time patterns for locale ar_EG.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_ar_EG = DateTimePatterns_ar;


/**
 * Extended set of localized date/time patterns for locale az.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_az = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'G y',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM.y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'dd.MM',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'd MMM, EEE',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'd MMM y, EEE',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale be.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_be = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y \'г\'. G',
  YEAR_MONTH_ABBR: 'LLL y',
  YEAR_MONTH_FULL: 'LLLL y',
  YEAR_MONTH_SHORT: 'MM.y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'd.M',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale bg.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_bg = {
  YEAR_FULL: 'y \'г\'.',
  YEAR_FULL_WITH_ERA: 'y \'г\'. G',
  YEAR_MONTH_ABBR: 'MM.y \'г\'.',
  YEAR_MONTH_FULL: 'MMMM y \'г\'.',
  YEAR_MONTH_SHORT: 'MM.y \'г\'.',
  MONTH_DAY_ABBR: 'd.MM',
  MONTH_DAY_FULL: 'd MMMM',
  MONTH_DAY_SHORT: 'd.MM',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd.MM.y \'г\'.',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d.MM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d.MM.y \'г\'.',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd.MM, HH:mm \'ч\'. zzzz'
};


/**
 * Extended set of localized date/time patterns for locale bn.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_bn = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM-y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM, y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM, y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, h:mm a zzzz'
};


/**
 * Extended set of localized date/time patterns for locale br.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_br = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'dd/MM',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale bs.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_bs = {
  YEAR_FULL: 'y.',
  YEAR_FULL_WITH_ERA: 'y. G',
  YEAR_MONTH_ABBR: 'MMM y.',
  YEAR_MONTH_FULL: 'LLLL y.',
  YEAR_MONTH_SHORT: 'M/y',
  MONTH_DAY_ABBR: 'd. MMM',
  MONTH_DAY_FULL: 'dd. MMMM',
  MONTH_DAY_SHORT: 'd.M.',
  MONTH_DAY_MEDIUM: 'd. MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd. MMM y.',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d. MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d. MMM y.',
  DAY_ABBR: 'd.',
  MONTH_DAY_TIME_ZONE_SHORT: 'd. MMM HH:mm (zzzz)'
};


/**
 * Extended set of localized date/time patterns for locale ca.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_ca = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'LLL \'de\' y',
  YEAR_MONTH_FULL: 'LLLL \'de\' y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM \'de\' y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, H:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale chr.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_chr = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'MMMM dd',
  MONTH_DAY_SHORT: 'M/d',
  MONTH_DAY_MEDIUM: 'MMMM d',
  MONTH_DAY_YEAR_MEDIUM: 'MMM d, y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, MMM d',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, MMM d, y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'MMM d, h:mm a zzzz'
};


/**
 * Extended set of localized date/time patterns for locale cs.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_cs = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'LLLL y',
  YEAR_MONTH_FULL: 'LLLL y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd. M.',
  MONTH_DAY_FULL: 'dd. MMMM',
  MONTH_DAY_SHORT: 'd. M.',
  MONTH_DAY_MEDIUM: 'd. MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd. M. y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE d. M.',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE d. M. y',
  DAY_ABBR: 'd.',
  MONTH_DAY_TIME_ZONE_SHORT: 'd. M. H:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale cy.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_cy = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'MMMM dd',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'MMMM d',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale da.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_da = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM.y',
  MONTH_DAY_ABBR: 'd. MMM',
  MONTH_DAY_FULL: 'dd. MMMM',
  MONTH_DAY_SHORT: 'd.M',
  MONTH_DAY_MEDIUM: 'd. MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd. MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE d. MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE d. MMM y',
  DAY_ABBR: 'd.',
  MONTH_DAY_TIME_ZONE_SHORT: 'd. MMM HH.mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale de.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_de = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM.y',
  MONTH_DAY_ABBR: 'd. MMM',
  MONTH_DAY_FULL: 'dd. MMMM',
  MONTH_DAY_SHORT: 'd.M.',
  MONTH_DAY_MEDIUM: 'd. MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd. MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d. MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d. MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd. MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale de_AT.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_de_AT = DateTimePatterns_de;


/**
 * Extended set of localized date/time patterns for locale de_CH.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_de_CH = DateTimePatterns_de;


/**
 * Extended set of localized date/time patterns for locale el.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_el = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'LLLL y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, h:mm a zzzz'
};


/**
 * Extended set of localized date/time patterns for locale en.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_en = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'MMMM dd',
  MONTH_DAY_SHORT: 'M/d',
  MONTH_DAY_MEDIUM: 'MMMM d',
  MONTH_DAY_YEAR_MEDIUM: 'MMM d, y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, MMM d',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, MMM d, y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'MMM d, h:mm a zzzz'
};


/**
 * Extended set of localized date/time patterns for locale en_AU.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_en_AU = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, h:mm a zzzz'
};


/**
 * Extended set of localized date/time patterns for locale en_CA.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_en_CA = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'y-MM',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'MMMM dd',
  MONTH_DAY_SHORT: 'MM-dd',
  MONTH_DAY_MEDIUM: 'MMMM d',
  MONTH_DAY_YEAR_MEDIUM: 'MMM d, y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, MMM d',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, MMM d, y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'MMM d, h:mm a zzzz'
};


/**
 * Extended set of localized date/time patterns for locale en_GB.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_en_GB = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'dd/MM',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale en_IE.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_en_IE = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale en_IN.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_en_IN = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'dd/MM',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM, y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, h:mm a zzzz'
};


/**
 * Extended set of localized date/time patterns for locale en_SG.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_en_SG = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'dd/MM',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, h:mm a zzzz'
};


/**
 * Extended set of localized date/time patterns for locale en_US.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_en_US = DateTimePatterns_en;


/**
 * Extended set of localized date/time patterns for locale en_ZA.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_en_ZA = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'dd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'MM/dd',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'dd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, dd MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, dd MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'dd MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale es.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_es = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM \'de\' y',
  YEAR_MONTH_SHORT: 'M/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd \'de\' MMMM',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'd \'de\' MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, H:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale es_419.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_es_419 = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM \'de\' y',
  YEAR_MONTH_SHORT: 'M/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd \'de\' MMMM',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'd \'de\' MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale es_ES.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_es_ES = DateTimePatterns_es;


/**
 * Extended set of localized date/time patterns for locale es_MX.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_es_MX = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM \'de\' y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd \'de\' MMMM',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'd \'de\' MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE d \'de\' MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d \'de\' MMM \'de\' y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale es_US.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_es_US = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM \'de\' y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd \'de\' MMMM',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'd \'de\' MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d \'de\' MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d \'de\' MMM \'de\' y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, h:mm a zzzz'
};


/**
 * Extended set of localized date/time patterns for locale et.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_et = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM.y',
  MONTH_DAY_ABBR: 'd. MMM',
  MONTH_DAY_FULL: 'dd. MMMM',
  MONTH_DAY_SHORT: 'd.M',
  MONTH_DAY_MEDIUM: 'd. MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd. MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d. MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d. MMMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd. MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale eu.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_eu = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'G y',
  YEAR_MONTH_ABBR: 'y MMM',
  YEAR_MONTH_FULL: 'y(\'e\')\'ko\' MMMM',
  YEAR_MONTH_SHORT: 'y/MM',
  MONTH_DAY_ABBR: 'MMM d(\'a\')',
  MONTH_DAY_FULL: 'MMMM\'ren\' dd(\'a\')',
  MONTH_DAY_SHORT: 'M/d',
  MONTH_DAY_MEDIUM: 'MMMM\'ren\' d(\'a\')',
  MONTH_DAY_YEAR_MEDIUM: 'y MMM d(\'a\')',
  WEEKDAY_MONTH_DAY_MEDIUM: 'MMM d(\'a\'), EEE',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'y MMM d(\'a\'), EEE',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'MMM d(\'a\'), HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale fa.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_fa = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'y/MM',
  MONTH_DAY_ABBR: 'd LLL',
  MONTH_DAY_FULL: 'dd LLLL',
  MONTH_DAY_SHORT: 'M/d',
  MONTH_DAY_MEDIUM: 'd LLLL',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE d LLL',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd LLL، HH:mm (zzzz)'
};


/**
 * Extended set of localized date/time patterns for locale fi.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_fi = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'LLL y',
  YEAR_MONTH_FULL: 'LLLL y',
  YEAR_MONTH_SHORT: 'M.y',
  MONTH_DAY_ABBR: 'd. MMM',
  MONTH_DAY_FULL: 'dd. MMMM',
  MONTH_DAY_SHORT: 'd.M.',
  MONTH_DAY_MEDIUM: 'd. MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd. MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'ccc d. MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE d. MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd. MMM \'klo\' H.mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale fil.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_fil = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'MMMM dd',
  MONTH_DAY_SHORT: 'M/d',
  MONTH_DAY_MEDIUM: 'MMMM d',
  MONTH_DAY_YEAR_MEDIUM: 'MMM d, y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, MMM d',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, MMM d, y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'MMM d, h:mm a zzzz'
};


/**
 * Extended set of localized date/time patterns for locale fr.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_fr = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'dd/MM',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale fr_CA.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_fr_CA = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'y-MM',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'M-d',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, HH \'h\' mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale ga.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_ga = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'dd/MM',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale gl.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_gl = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM \'de\' y',
  YEAR_MONTH_FULL: 'MMMM \'de\' y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd \'de\' MMM',
  MONTH_DAY_FULL: 'dd \'de\' MMMM',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'd \'de\' MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd \'de\' MMM \'de\' y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d \'de\' MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d \'de\' MMM \'de\' y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd \'de\' MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale gsw.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_gsw = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'G y',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM.y',
  MONTH_DAY_ABBR: 'd. MMM',
  MONTH_DAY_FULL: 'dd. MMMM',
  MONTH_DAY_SHORT: 'd.M.',
  MONTH_DAY_MEDIUM: 'd. MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'y MMM d',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE d. MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d. MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd. MMM HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale gu.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_gu = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'G y',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM-y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM, y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM, y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM h:mm a zzzz'
};


/**
 * Extended set of localized date/time patterns for locale haw.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_haw = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'y MMMM',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'MMMM dd',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'MMMM d',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM h:mm a zzzz'
};


/**
 * Extended set of localized date/time patterns for locale he.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_he = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'M.y',
  MONTH_DAY_ABBR: 'd בMMM',
  MONTH_DAY_FULL: 'dd בMMMM',
  MONTH_DAY_SHORT: 'd.M',
  MONTH_DAY_MEDIUM: 'd בMMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd בMMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d בMMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d בMMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd בMMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale hi.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_hi = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, h:mm a zzzz'
};


/**
 * Extended set of localized date/time patterns for locale hr.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_hr = {
  YEAR_FULL: 'y.',
  YEAR_FULL_WITH_ERA: 'y. G',
  YEAR_MONTH_ABBR: 'LLL y.',
  YEAR_MONTH_FULL: 'LLLL y.',
  YEAR_MONTH_SHORT: 'MM. y.',
  MONTH_DAY_ABBR: 'd. MMM',
  MONTH_DAY_FULL: 'dd. MMMM',
  MONTH_DAY_SHORT: 'dd. MM.',
  MONTH_DAY_MEDIUM: 'd. MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd. MMM y.',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d. MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d. MMM y.',
  DAY_ABBR: 'd.',
  MONTH_DAY_TIME_ZONE_SHORT: 'd. MMM HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale hu.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_hu = {
  YEAR_FULL: 'y.',
  YEAR_FULL_WITH_ERA: 'G y.',
  YEAR_MONTH_ABBR: 'y. MMM',
  YEAR_MONTH_FULL: 'y. MMMM',
  YEAR_MONTH_SHORT: 'y. MM.',
  MONTH_DAY_ABBR: 'MMM d.',
  MONTH_DAY_FULL: 'MMMM dd.',
  MONTH_DAY_SHORT: 'M. d.',
  MONTH_DAY_MEDIUM: 'MMMM d.',
  MONTH_DAY_YEAR_MEDIUM: 'y. MMM d.',
  WEEKDAY_MONTH_DAY_MEDIUM: 'MMM d., EEE',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'y. MMM d., EEE',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'MMM d. HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale hy.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_hy = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'G y թ.',
  YEAR_MONTH_ABBR: 'y թ. LLL',
  YEAR_MONTH_FULL: 'y թ․ LLLL',
  YEAR_MONTH_SHORT: 'MM.y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'MMMM dd',
  MONTH_DAY_SHORT: 'dd.MM',
  MONTH_DAY_MEDIUM: 'MMMM d',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM, y թ.',
  WEEKDAY_MONTH_DAY_MEDIUM: 'd MMM, EEE',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'y թ. MMM d, EEE',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale id.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_id = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, HH.mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale in.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_in = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, HH.mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale is.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_is = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM. y',
  MONTH_DAY_ABBR: 'd. MMM',
  MONTH_DAY_FULL: 'dd. MMMM',
  MONTH_DAY_SHORT: 'd.M.',
  MONTH_DAY_MEDIUM: 'd. MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd. MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d. MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d. MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd. MMM, zzzz – HH:mm'
};


/**
 * Extended set of localized date/time patterns for locale it.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_it = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale iw.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_iw = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'M.y',
  MONTH_DAY_ABBR: 'd בMMM',
  MONTH_DAY_FULL: 'dd בMMMM',
  MONTH_DAY_SHORT: 'd.M',
  MONTH_DAY_MEDIUM: 'd בMMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd בMMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d בMMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d בMMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd בMMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale ja.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_ja = {
  YEAR_FULL: 'y年',
  YEAR_FULL_WITH_ERA: 'Gy年',
  YEAR_MONTH_ABBR: 'y年M月',
  YEAR_MONTH_FULL: 'y年M月',
  YEAR_MONTH_SHORT: 'y/MM',
  MONTH_DAY_ABBR: 'M月d日',
  MONTH_DAY_FULL: 'M月dd日',
  MONTH_DAY_SHORT: 'M/d',
  MONTH_DAY_MEDIUM: 'M月d日',
  MONTH_DAY_YEAR_MEDIUM: 'y年M月d日',
  WEEKDAY_MONTH_DAY_MEDIUM: 'M月d日(EEE)',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'y年M月d日(EEE)',
  DAY_ABBR: 'd日',
  MONTH_DAY_TIME_ZONE_SHORT: 'M月d日 H:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale ka.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_ka = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM. y',
  YEAR_MONTH_FULL: 'MMMM, y',
  YEAR_MONTH_SHORT: 'MM.y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'd.M',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM. y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM. y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale kk.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_kk = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'G y \'ж\'.',
  YEAR_MONTH_ABBR: 'y \'ж\'. MMM',
  YEAR_MONTH_FULL: 'y \'ж\'. MMMM',
  YEAR_MONTH_SHORT: 'MM.y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'dd.MM',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'y \'ж\'. d MMM',
  WEEKDAY_MONTH_DAY_MEDIUM: 'd MMM, EEE',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'y \'ж\'. d MMM, EEE',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale km.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_km = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'MMMM dd',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'MMMM d',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, h:mm a zzzz'
};


/**
 * Extended set of localized date/time patterns for locale kn.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_kn = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'G y',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM-y',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'MMM d,y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, MMM d, y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'MMM d, h:mm a zzzz'
};


/**
 * Extended set of localized date/time patterns for locale ko.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_ko = {
  YEAR_FULL: 'y년',
  YEAR_FULL_WITH_ERA: 'G y년',
  YEAR_MONTH_ABBR: 'y년 MMM',
  YEAR_MONTH_FULL: 'y년 MMMM',
  YEAR_MONTH_SHORT: 'y. M.',
  MONTH_DAY_ABBR: 'MMM d일',
  MONTH_DAY_FULL: 'MMMM dd일',
  MONTH_DAY_SHORT: 'M. d.',
  MONTH_DAY_MEDIUM: 'MMMM d일',
  MONTH_DAY_YEAR_MEDIUM: 'y년 MMM d일',
  WEEKDAY_MONTH_DAY_MEDIUM: 'MMM d일 (EEE)',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'y년 MMM d일 (EEE)',
  DAY_ABBR: 'd일',
  MONTH_DAY_TIME_ZONE_SHORT: 'MMM d일 a h:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale ky.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_ky = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'G y-\'ж\'.',
  YEAR_MONTH_ABBR: 'y-\'ж\'. MMM',
  YEAR_MONTH_FULL: 'y-\'ж\'., MMMM',
  YEAR_MONTH_SHORT: 'y-MM',
  MONTH_DAY_ABBR: 'd-MMM',
  MONTH_DAY_FULL: 'dd-MMMM',
  MONTH_DAY_SHORT: 'dd-MM',
  MONTH_DAY_MEDIUM: 'd-MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'y-\'ж\'. d-MMM',
  WEEKDAY_MONTH_DAY_MEDIUM: 'd-MMM, EEE',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'y-\'ж\'. d-MMM, EEE',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd-MMM HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale ln.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_ln = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'G y',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'y MMMM',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'MMMM dd',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'MMMM d',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale lo.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_lo = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'G y',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'MMMM dd',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'MMMM d',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale lt.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_lt = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y \'m\'. G',
  YEAR_MONTH_ABBR: 'y-MM',
  YEAR_MONTH_FULL: 'y \'m\'. LLLL',
  YEAR_MONTH_SHORT: 'y-MM',
  MONTH_DAY_ABBR: 'MM-dd',
  MONTH_DAY_FULL: 'MMMM dd \'d\'.',
  MONTH_DAY_SHORT: 'MM-d',
  MONTH_DAY_MEDIUM: 'MMMM d \'d\'.',
  MONTH_DAY_YEAR_MEDIUM: 'y-MM-dd',
  WEEKDAY_MONTH_DAY_MEDIUM: 'MM-dd, EEE',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'y-MM-dd, EEE',
  DAY_ABBR: 'dd',
  MONTH_DAY_TIME_ZONE_SHORT: 'MM-dd HH:mm; zzzz'
};


/**
 * Extended set of localized date/time patterns for locale lv.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_lv = {
  YEAR_FULL: 'y. \'g\'.',
  YEAR_FULL_WITH_ERA: 'G y. \'g\'.',
  YEAR_MONTH_ABBR: 'y. \'g\'. MMM',
  YEAR_MONTH_FULL: 'y. \'g\'. MMMM',
  YEAR_MONTH_SHORT: 'MM.y.',
  MONTH_DAY_ABBR: 'd. MMM',
  MONTH_DAY_FULL: 'dd. MMMM',
  MONTH_DAY_SHORT: 'dd.MM.',
  MONTH_DAY_MEDIUM: 'd. MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'y. \'g\'. d. MMM',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d. MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, y. \'g\'. d. MMM',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd. MMM HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale mk.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_mk = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y \'г\'.',
  YEAR_MONTH_FULL: 'MMMM y \'г\'.',
  YEAR_MONTH_SHORT: 'MM.y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'd.M',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y \'г\'.',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM y \'г\'.',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, \'во\' HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale ml.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_ml = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'G y',
  YEAR_MONTH_ABBR: 'y MMM',
  YEAR_MONTH_FULL: 'y MMMM',
  YEAR_MONTH_SHORT: 'y-MM',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'MMMM dd',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'MMMM d',
  MONTH_DAY_YEAR_MEDIUM: 'y MMM d',
  WEEKDAY_MONTH_DAY_MEDIUM: 'MMM d, EEE',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'y MMM d, EEE',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'MMM d h:mm a zzzz'
};


/**
 * Extended set of localized date/time patterns for locale mn.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_mn = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'G y',
  YEAR_MONTH_ABBR: 'y \'оны\' MMM',
  YEAR_MONTH_FULL: 'y \'оны\' MMMM',
  YEAR_MONTH_SHORT: 'y MMMMM',
  MONTH_DAY_ABBR: 'MMM\'ын\' d',
  MONTH_DAY_FULL: 'MMMM\'ын\' dd',
  MONTH_DAY_SHORT: 'MMMMM/dd',
  MONTH_DAY_MEDIUM: 'MMMM\'ын\' d',
  MONTH_DAY_YEAR_MEDIUM: 'y \'оны\' MMM\'ын\' d',
  WEEKDAY_MONTH_DAY_MEDIUM: 'MMM\'ын\' d. EEE',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'y \'оны\' MMM\'ын\' d. EEE',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'MMM\'ын\' d HH:mm (zzzz)'
};


/**
 * Extended set of localized date/time patterns for locale mo.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_mo = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM.y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'dd.MM',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale mr.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_mr = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'G y',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM-y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM, y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d, MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, h:mm a zzzz'
};


/**
 * Extended set of localized date/time patterns for locale ms.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_ms = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM-y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'd-M',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, h:mm a zzzz'
};


/**
 * Extended set of localized date/time patterns for locale mt.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_mt = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'G y',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'y-MM',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'dd \'ta\'’ MMMM',
  MONTH_DAY_SHORT: 'MM-dd',
  MONTH_DAY_MEDIUM: 'd \'ta\'’ MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd \'ta\'’ MMM, y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d \'ta\'’ MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d \'ta\'’ MMM, y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'MMM d HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale my.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_my = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'G y',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'y MMMM',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'MMMM dd',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'MMMM d',
  MONTH_DAY_YEAR_MEDIUM: 'y၊ MMM d',
  WEEKDAY_MONTH_DAY_MEDIUM: 'MMM d၊ EEE',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'y၊ MMM d၊ EEE',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM zzzz HH:mm'
};


/**
 * Extended set of localized date/time patterns for locale nb.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_nb = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM.y',
  MONTH_DAY_ABBR: 'd. MMM',
  MONTH_DAY_FULL: 'dd. MMMM',
  MONTH_DAY_SHORT: 'd.M.',
  MONTH_DAY_MEDIUM: 'd. MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd. MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE d. MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE d. MMM y',
  DAY_ABBR: 'd.',
  MONTH_DAY_TIME_ZONE_SHORT: 'd. MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale ne.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_ne = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'G y',
  YEAR_MONTH_ABBR: 'y MMM',
  YEAR_MONTH_FULL: 'y MMMM',
  YEAR_MONTH_SHORT: 'y-MM',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'MMMM dd',
  MONTH_DAY_SHORT: 'MM-dd',
  MONTH_DAY_MEDIUM: 'MMMM d',
  MONTH_DAY_YEAR_MEDIUM: 'y MMM d',
  WEEKDAY_MONTH_DAY_MEDIUM: 'MMM d, EEE',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'y MMM d, EEE',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'MMM d, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale nl.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_nl = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM-y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'd-M',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale no.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_no = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM.y',
  MONTH_DAY_ABBR: 'd. MMM',
  MONTH_DAY_FULL: 'dd. MMMM',
  MONTH_DAY_SHORT: 'd.M.',
  MONTH_DAY_MEDIUM: 'd. MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd. MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE d. MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE d. MMM y',
  DAY_ABBR: 'd.',
  MONTH_DAY_TIME_ZONE_SHORT: 'd. MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale no_NO.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_no_NO = DateTimePatterns_no;


/**
 * Extended set of localized date/time patterns for locale or.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_or = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM-y',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'MMMM dd',
  MONTH_DAY_SHORT: 'M/d',
  MONTH_DAY_MEDIUM: 'MMMM d',
  MONTH_DAY_YEAR_MEDIUM: 'MMM d, y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, MMM d',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, MMM d, y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'MMM d, h:mm a zzzz'
};


/**
 * Extended set of localized date/time patterns for locale pa.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_pa = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'G y',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'MMMM dd',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'MMMM d',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, h:mm a zzzz'
};


/**
 * Extended set of localized date/time patterns for locale pl.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_pl = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'LLL y',
  YEAR_MONTH_FULL: 'LLLL y',
  YEAR_MONTH_SHORT: 'MM.y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'd.MM',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale pt.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_pt = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM \'de\' y',
  YEAR_MONTH_FULL: 'MMMM \'de\' y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd \'de\' MMM',
  MONTH_DAY_FULL: 'dd \'de\' MMMM',
  MONTH_DAY_SHORT: 'dd/MM',
  MONTH_DAY_MEDIUM: 'd \'de\' MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd \'de\' MMM \'de\' y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d \'de\' MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d \'de\' MMM \'de\' y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd \'de\' MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale pt_BR.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_pt_BR = DateTimePatterns_pt;


/**
 * Extended set of localized date/time patterns for locale pt_PT.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_pt_PT = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MM/y',
  YEAR_MONTH_FULL: 'MMMM \'de\' y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd/MM',
  MONTH_DAY_FULL: 'dd \'de\' MMMM',
  MONTH_DAY_SHORT: 'dd/MM',
  MONTH_DAY_MEDIUM: 'd \'de\' MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd/MM/y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d/MM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d/MM/y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd/MM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale ro.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_ro = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM.y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'dd.MM',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale ru.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_ru = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y \'г\'. G',
  YEAR_MONTH_ABBR: 'LLL y \'г\'.',
  YEAR_MONTH_FULL: 'LLLL y \'г\'.',
  YEAR_MONTH_SHORT: 'MM.y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'dd.MM',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y \'г\'.',
  WEEKDAY_MONTH_DAY_MEDIUM: 'ccc, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM y \'г\'.',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale sh.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_sh = {
  YEAR_FULL: 'y.',
  YEAR_FULL_WITH_ERA: 'y. G',
  YEAR_MONTH_ABBR: 'MMM y.',
  YEAR_MONTH_FULL: 'MMMM y.',
  YEAR_MONTH_SHORT: 'MM.y.',
  MONTH_DAY_ABBR: 'd. MMM',
  MONTH_DAY_FULL: 'dd. MMMM',
  MONTH_DAY_SHORT: 'd. M.',
  MONTH_DAY_MEDIUM: 'd. MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd. MMM y.',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE d. MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d. MMM y.',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd. MMM HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale si.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_si = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'G y',
  YEAR_MONTH_ABBR: 'y MMM',
  YEAR_MONTH_FULL: 'y MMMM',
  YEAR_MONTH_SHORT: 'y-MM',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'MMMM dd',
  MONTH_DAY_SHORT: 'M-d',
  MONTH_DAY_MEDIUM: 'MMMM d',
  MONTH_DAY_YEAR_MEDIUM: 'y MMM d',
  WEEKDAY_MONTH_DAY_MEDIUM: 'MMM d EEE',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'y MMM d, EEE',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'MMM d, HH.mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale sk.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_sk = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'M/y',
  YEAR_MONTH_FULL: 'LLLL y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd. M.',
  MONTH_DAY_FULL: 'dd. MMMM',
  MONTH_DAY_SHORT: 'd. M.',
  MONTH_DAY_MEDIUM: 'd. MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd. M. y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE d. M.',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE d. M. y',
  DAY_ABBR: 'd.',
  MONTH_DAY_TIME_ZONE_SHORT: 'd. M., H:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale sl.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_sl = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd. MMM',
  MONTH_DAY_FULL: 'dd. MMMM',
  MONTH_DAY_SHORT: 'd. M.',
  MONTH_DAY_MEDIUM: 'd. MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd. MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d. MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d. MMM y',
  DAY_ABBR: 'd.',
  MONTH_DAY_TIME_ZONE_SHORT: 'd. MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale sq.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_sq = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM.y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'd.M',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, h:mm a, zzzz'
};


/**
 * Extended set of localized date/time patterns for locale sr.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_sr = {
  YEAR_FULL: 'y.',
  YEAR_FULL_WITH_ERA: 'y. G',
  YEAR_MONTH_ABBR: 'MMM y.',
  YEAR_MONTH_FULL: 'MMMM y.',
  YEAR_MONTH_SHORT: 'MM.y.',
  MONTH_DAY_ABBR: 'd. MMM',
  MONTH_DAY_FULL: 'dd. MMMM',
  MONTH_DAY_SHORT: 'd. M.',
  MONTH_DAY_MEDIUM: 'd. MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd. MMM y.',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE d. MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d. MMM y.',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd. MMM HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale sr_Latn.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_sr_Latn = DateTimePatterns_sr;


/**
 * Extended set of localized date/time patterns for locale sv.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_sv = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'y-MM',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale sw.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_sw = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale ta.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_ta = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'G y',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM-y',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM, y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'MMM d, EEE',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM, y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'MMM d, a h:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale te.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_te = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'G y',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM-y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd, MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'd MMM, EEE',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'd MMM, y, EEE',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM h:mm a zzzz'
};


/**
 * Extended set of localized date/time patterns for locale th.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_th = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'G y',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE d MMM y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale tl.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_tl = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'MMMM dd',
  MONTH_DAY_SHORT: 'M/d',
  MONTH_DAY_MEDIUM: 'MMMM d',
  MONTH_DAY_YEAR_MEDIUM: 'MMM d, y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, MMM d',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, MMM d, y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'MMM d, h:mm a zzzz'
};


/**
 * Extended set of localized date/time patterns for locale tr.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_tr = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'G y',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM.y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'd MMMM EEE',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'd MMM y EEE',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale uk.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_uk = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'LLL y \'р\'.',
  YEAR_MONTH_FULL: 'LLLL y \'р\'.',
  YEAR_MONTH_SHORT: 'MM.y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'dd.MM',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM y \'р\'.',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM y \'р\'.',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM, HH:mm zzzz'
};


/**
 * Extended set of localized date/time patterns for locale ur.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_ur = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM، y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE، d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE، d MMM، y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd MMM، h:mm a zzzz'
};


/**
 * Extended set of localized date/time patterns for locale uz.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_uz = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'G y',
  YEAR_MONTH_ABBR: 'MMM, y',
  YEAR_MONTH_FULL: 'MMMM, y',
  YEAR_MONTH_SHORT: 'MM.y',
  MONTH_DAY_ABBR: 'd-MMM',
  MONTH_DAY_FULL: 'dd-MMMM',
  MONTH_DAY_SHORT: 'dd/MM',
  MONTH_DAY_MEDIUM: 'd-MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd-MMM, y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d-MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d-MMM, y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'd-MMM, HH:mm (zzzz)'
};


/**
 * Extended set of localized date/time patterns for locale vi.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_vi = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM \'năm\' y',
  YEAR_MONTH_SHORT: '\'tháng\' MM, y',
  MONTH_DAY_ABBR: 'd MMM',
  MONTH_DAY_FULL: 'dd MMMM',
  MONTH_DAY_SHORT: 'dd/M',
  MONTH_DAY_MEDIUM: 'd MMMM',
  MONTH_DAY_YEAR_MEDIUM: 'd MMM, y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, d MMM',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, d MMM, y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'HH:mm zzzz d MMM'
};


/**
 * Extended set of localized date/time patterns for locale zh.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_zh = {
  YEAR_FULL: 'y年',
  YEAR_FULL_WITH_ERA: 'Gy年',
  YEAR_MONTH_ABBR: 'y年M月',
  YEAR_MONTH_FULL: 'y年M月',
  YEAR_MONTH_SHORT: 'y年M月',
  MONTH_DAY_ABBR: 'M月d日',
  MONTH_DAY_FULL: 'M月dd日',
  MONTH_DAY_SHORT: 'M/d',
  MONTH_DAY_MEDIUM: 'M月d日',
  MONTH_DAY_YEAR_MEDIUM: 'y年M月d日',
  WEEKDAY_MONTH_DAY_MEDIUM: 'M月d日EEE',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'y年M月d日EEE',
  DAY_ABBR: 'd日',
  MONTH_DAY_TIME_ZONE_SHORT: 'M月d日 zzzz HH:mm'
};


/**
 * Extended set of localized date/time patterns for locale zh_CN.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_zh_CN = DateTimePatterns_zh;


/**
 * Extended set of localized date/time patterns for locale zh_HK.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_zh_HK = {
  YEAR_FULL: 'y年',
  YEAR_FULL_WITH_ERA: 'Gy年',
  YEAR_MONTH_ABBR: 'y年M月',
  YEAR_MONTH_FULL: 'y年M月',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'M月d日',
  MONTH_DAY_FULL: 'M月dd日',
  MONTH_DAY_SHORT: 'd/M',
  MONTH_DAY_MEDIUM: 'M月d日',
  MONTH_DAY_YEAR_MEDIUM: 'y年M月d日',
  WEEKDAY_MONTH_DAY_MEDIUM: 'M月d日EEE',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'y年M月d日EEE',
  DAY_ABBR: 'd日',
  MONTH_DAY_TIME_ZONE_SHORT: 'M月d日 ah:mm [zzzz]'
};


/**
 * Extended set of localized date/time patterns for locale zh_TW.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_zh_TW = {
  YEAR_FULL: 'y年',
  YEAR_FULL_WITH_ERA: 'Gy年',
  YEAR_MONTH_ABBR: 'y年M月',
  YEAR_MONTH_FULL: 'y年M月',
  YEAR_MONTH_SHORT: 'y/MM',
  MONTH_DAY_ABBR: 'M月d日',
  MONTH_DAY_FULL: 'M月dd日',
  MONTH_DAY_SHORT: 'M/d',
  MONTH_DAY_MEDIUM: 'M月d日',
  MONTH_DAY_YEAR_MEDIUM: 'y年M月d日',
  WEEKDAY_MONTH_DAY_MEDIUM: 'M月d日 EEE',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'y年M月d日 EEE',
  DAY_ABBR: 'd日',
  MONTH_DAY_TIME_ZONE_SHORT: 'M月d日 Bh:mm [zzzz]'
};


/**
 * Extended set of localized date/time patterns for locale zu.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns_zu = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'G y',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'y-MM',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'MMMM dd',
  MONTH_DAY_SHORT: 'MM-dd',
  MONTH_DAY_MEDIUM: 'MMMM d',
  MONTH_DAY_YEAR_MEDIUM: 'MMM d, y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, MMM d',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, MMM d, y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'MMM d HH:mm zzzz'
};


/**
 * Select date/time pattern by locale.
 * @type {!DateTimePatternsType}
 */
export var DateTimePatterns = DateTimePatterns_en;

switch (goog.LOCALE) {
  case 'af':
    DateTimePatterns = DateTimePatterns_af;
    break;
  case 'am':
    DateTimePatterns = DateTimePatterns_am;
    break;
  case 'ar':
    DateTimePatterns = DateTimePatterns_ar;
    break;
  case 'ar_DZ':
  case 'ar-DZ':
    DateTimePatterns = DateTimePatterns_ar_DZ;
    break;
  case 'ar_EG':
  case 'ar-EG':
    DateTimePatterns = DateTimePatterns_ar_EG;
    break;
  case 'az':
    DateTimePatterns = DateTimePatterns_az;
    break;
  case 'be':
    DateTimePatterns = DateTimePatterns_be;
    break;
  case 'bg':
    DateTimePatterns = DateTimePatterns_bg;
    break;
  case 'bn':
    DateTimePatterns = DateTimePatterns_bn;
    break;
  case 'br':
    DateTimePatterns = DateTimePatterns_br;
    break;
  case 'bs':
    DateTimePatterns = DateTimePatterns_bs;
    break;
  case 'ca':
    DateTimePatterns = DateTimePatterns_ca;
    break;
  case 'chr':
    DateTimePatterns = DateTimePatterns_chr;
    break;
  case 'cs':
    DateTimePatterns = DateTimePatterns_cs;
    break;
  case 'cy':
    DateTimePatterns = DateTimePatterns_cy;
    break;
  case 'da':
    DateTimePatterns = DateTimePatterns_da;
    break;
  case 'de':
    DateTimePatterns = DateTimePatterns_de;
    break;
  case 'de_AT':
  case 'de-AT':
    DateTimePatterns = DateTimePatterns_de_AT;
    break;
  case 'de_CH':
  case 'de-CH':
    DateTimePatterns = DateTimePatterns_de_CH;
    break;
  case 'el':
    DateTimePatterns = DateTimePatterns_el;
    break;
  case 'en':
    DateTimePatterns = DateTimePatterns_en;
    break;
  case 'en_AU':
  case 'en-AU':
    DateTimePatterns = DateTimePatterns_en_AU;
    break;
  case 'en_CA':
  case 'en-CA':
    DateTimePatterns = DateTimePatterns_en_CA;
    break;
  case 'en_GB':
  case 'en-GB':
    DateTimePatterns = DateTimePatterns_en_GB;
    break;
  case 'en_IE':
  case 'en-IE':
    DateTimePatterns = DateTimePatterns_en_IE;
    break;
  case 'en_IN':
  case 'en-IN':
    DateTimePatterns = DateTimePatterns_en_IN;
    break;
  case 'en_SG':
  case 'en-SG':
    DateTimePatterns = DateTimePatterns_en_SG;
    break;
  case 'en_US':
  case 'en-US':
    DateTimePatterns = DateTimePatterns_en_US;
    break;
  case 'en_ZA':
  case 'en-ZA':
    DateTimePatterns = DateTimePatterns_en_ZA;
    break;
  case 'es':
    DateTimePatterns = DateTimePatterns_es;
    break;
  case 'es_419':
  case 'es-419':
    DateTimePatterns = DateTimePatterns_es_419;
    break;
  case 'es_ES':
  case 'es-ES':
    DateTimePatterns = DateTimePatterns_es_ES;
    break;
  case 'es_MX':
  case 'es-MX':
    DateTimePatterns = DateTimePatterns_es_MX;
    break;
  case 'es_US':
  case 'es-US':
    DateTimePatterns = DateTimePatterns_es_US;
    break;
  case 'et':
    DateTimePatterns = DateTimePatterns_et;
    break;
  case 'eu':
    DateTimePatterns = DateTimePatterns_eu;
    break;
  case 'fa':
    DateTimePatterns = DateTimePatterns_fa;
    break;
  case 'fi':
    DateTimePatterns = DateTimePatterns_fi;
    break;
  case 'fil':
    DateTimePatterns = DateTimePatterns_fil;
    break;
  case 'fr':
    DateTimePatterns = DateTimePatterns_fr;
    break;
  case 'fr_CA':
  case 'fr-CA':
    DateTimePatterns = DateTimePatterns_fr_CA;
    break;
  case 'ga':
    DateTimePatterns = DateTimePatterns_ga;
    break;
  case 'gl':
    DateTimePatterns = DateTimePatterns_gl;
    break;
  case 'gsw':
    DateTimePatterns = DateTimePatterns_gsw;
    break;
  case 'gu':
    DateTimePatterns = DateTimePatterns_gu;
    break;
  case 'haw':
    DateTimePatterns = DateTimePatterns_haw;
    break;
  case 'he':
    DateTimePatterns = DateTimePatterns_he;
    break;
  case 'hi':
    DateTimePatterns = DateTimePatterns_hi;
    break;
  case 'hr':
    DateTimePatterns = DateTimePatterns_hr;
    break;
  case 'hu':
    DateTimePatterns = DateTimePatterns_hu;
    break;
  case 'hy':
    DateTimePatterns = DateTimePatterns_hy;
    break;
  case 'id':
    DateTimePatterns = DateTimePatterns_id;
    break;
  case 'in':
    DateTimePatterns = DateTimePatterns_in;
    break;
  case 'is':
    DateTimePatterns = DateTimePatterns_is;
    break;
  case 'it':
    DateTimePatterns = DateTimePatterns_it;
    break;
  case 'iw':
    DateTimePatterns = DateTimePatterns_iw;
    break;
  case 'ja':
    DateTimePatterns = DateTimePatterns_ja;
    break;
  case 'ka':
    DateTimePatterns = DateTimePatterns_ka;
    break;
  case 'kk':
    DateTimePatterns = DateTimePatterns_kk;
    break;
  case 'km':
    DateTimePatterns = DateTimePatterns_km;
    break;
  case 'kn':
    DateTimePatterns = DateTimePatterns_kn;
    break;
  case 'ko':
    DateTimePatterns = DateTimePatterns_ko;
    break;
  case 'ky':
    DateTimePatterns = DateTimePatterns_ky;
    break;
  case 'ln':
    DateTimePatterns = DateTimePatterns_ln;
    break;
  case 'lo':
    DateTimePatterns = DateTimePatterns_lo;
    break;
  case 'lt':
    DateTimePatterns = DateTimePatterns_lt;
    break;
  case 'lv':
    DateTimePatterns = DateTimePatterns_lv;
    break;
  case 'mk':
    DateTimePatterns = DateTimePatterns_mk;
    break;
  case 'ml':
    DateTimePatterns = DateTimePatterns_ml;
    break;
  case 'mn':
    DateTimePatterns = DateTimePatterns_mn;
    break;
  case 'mo':
    DateTimePatterns = DateTimePatterns_mo;
    break;
  case 'mr':
    DateTimePatterns = DateTimePatterns_mr;
    break;
  case 'ms':
    DateTimePatterns = DateTimePatterns_ms;
    break;
  case 'mt':
    DateTimePatterns = DateTimePatterns_mt;
    break;
  case 'my':
    DateTimePatterns = DateTimePatterns_my;
    break;
  case 'nb':
    DateTimePatterns = DateTimePatterns_nb;
    break;
  case 'ne':
    DateTimePatterns = DateTimePatterns_ne;
    break;
  case 'nl':
    DateTimePatterns = DateTimePatterns_nl;
    break;
  case 'no':
    DateTimePatterns = DateTimePatterns_no;
    break;
  case 'no_NO':
  case 'no-NO':
    DateTimePatterns = DateTimePatterns_no_NO;
    break;
  case 'or':
    DateTimePatterns = DateTimePatterns_or;
    break;
  case 'pa':
    DateTimePatterns = DateTimePatterns_pa;
    break;
  case 'pl':
    DateTimePatterns = DateTimePatterns_pl;
    break;
  case 'pt':
    DateTimePatterns = DateTimePatterns_pt;
    break;
  case 'pt_BR':
  case 'pt-BR':
    DateTimePatterns = DateTimePatterns_pt_BR;
    break;
  case 'pt_PT':
  case 'pt-PT':
    DateTimePatterns = DateTimePatterns_pt_PT;
    break;
  case 'ro':
    DateTimePatterns = DateTimePatterns_ro;
    break;
  case 'ru':
    DateTimePatterns = DateTimePatterns_ru;
    break;
  case 'sh':
    DateTimePatterns = DateTimePatterns_sh;
    break;
  case 'si':
    DateTimePatterns = DateTimePatterns_si;
    break;
  case 'sk':
    DateTimePatterns = DateTimePatterns_sk;
    break;
  case 'sl':
    DateTimePatterns = DateTimePatterns_sl;
    break;
  case 'sq':
    DateTimePatterns = DateTimePatterns_sq;
    break;
  case 'sr':
    DateTimePatterns = DateTimePatterns_sr;
    break;
  case 'sr_Latn':
  case 'sr-Latn':
    DateTimePatterns = DateTimePatterns_sr_Latn;
    break;
  case 'sv':
    DateTimePatterns = DateTimePatterns_sv;
    break;
  case 'sw':
    DateTimePatterns = DateTimePatterns_sw;
    break;
  case 'ta':
    DateTimePatterns = DateTimePatterns_ta;
    break;
  case 'te':
    DateTimePatterns = DateTimePatterns_te;
    break;
  case 'th':
    DateTimePatterns = DateTimePatterns_th;
    break;
  case 'tl':
    DateTimePatterns = DateTimePatterns_tl;
    break;
  case 'tr':
    DateTimePatterns = DateTimePatterns_tr;
    break;
  case 'uk':
    DateTimePatterns = DateTimePatterns_uk;
    break;
  case 'ur':
    DateTimePatterns = DateTimePatterns_ur;
    break;
  case 'uz':
    DateTimePatterns = DateTimePatterns_uz;
    break;
  case 'vi':
    DateTimePatterns = DateTimePatterns_vi;
    break;
  case 'zh':
    DateTimePatterns = DateTimePatterns_zh;
    break;
  case 'zh_CN':
  case 'zh-CN':
    DateTimePatterns = DateTimePatterns_zh_CN;
    break;
  case 'zh_HK':
  case 'zh-HK':
    DateTimePatterns = DateTimePatterns_zh_HK;
    break;
  case 'zh_TW':
  case 'zh-TW':
    DateTimePatterns = DateTimePatterns_zh_TW;
    break;
  case 'zu':
    DateTimePatterns = DateTimePatterns_zu;
    break;
}

/**
 * @param {!DateTimePatternsType} patterns 
 * @private
 */
export function internalSetDateTimePatterns_(patterns) {
  DateTimePatterns = patterns;
}