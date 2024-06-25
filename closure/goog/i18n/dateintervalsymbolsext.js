/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @fileoverview Date interval formatting symbols for all locales.
 *
 * File generated from CLDR ver. 43
 *
 * This file covers those locales that are not covered in
 * "dateintervalsymbols.js".
 */

// clang-format off

import * as dateIntervalSymbols from './dateintervalsymbols.js';

/** @type {!dateIntervalSymbols.DateIntervalSymbols} */
let defaultSymbols;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_af_NA = {
  FULL_DATE: {
    'G': 'EEEE d MMMM y G – EEEE d MMMM y G',
    'Md': 'EEEE d MMMM – EEEE d MMMM y',
    'y': 'EEEE d MMMM y – EEEE d MMMM y',
    '_': 'EEEE dd MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    'y': 'd MMMM y – d MMMM y',
    '_': 'dd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    'y': 'd MMM y – d MMM y',
    '_': 'dd MMM y'
  },
  SHORT_DATE: {
    'G': 'y-M-d GGGGG – y-M-d GGGGG',
    'Mdy': 'd/M/y – d/M/y',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'y-MM-dd h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'y-MM-dd h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'y-MM-dd h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'y-MM-dd h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE dd MMMM y \'om\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'dd MMMM y \'om\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd MMM y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'a': 'y-MM-dd h:mm a – h:mm a',
    'hm': 'y-MM-dd h:mm – h:mm a',
    '_': 'y-MM-dd h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_af_ZA = dateIntervalSymbols.DateIntervalSymbols_af;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_agq = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM, y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'd/M/y HH:mm–HH:mm',
    '_': 'd/M/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_agq_CM = DateIntervalSymbols_agq;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ak = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, y MMMM dd'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'y MMMM d'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Mdy': 'yy-MM-dd – yy-MM-dd',
    '_': 'yy/MM/dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'y/M/d h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'y/M/d h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'y/M/d h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'y/M/d h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, y MMMM dd h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'y MMMM d h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd h:mm a',
    'a': 'yy/MM/dd h:mm a – h:mm a',
    'hm': 'yy/MM/dd h:mm–h:mm a',
    '_': 'yy/MM/dd h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ak_GH = DateIntervalSymbols_ak;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_am_ET = dateIntervalSymbols.DateIntervalSymbols_am;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ar_001 = dateIntervalSymbols.DateIntervalSymbols_ar;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ar_AE = dateIntervalSymbols.DateIntervalSymbols_ar;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ar_BH = dateIntervalSymbols.DateIntervalSymbols_ar;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ar_DJ = dateIntervalSymbols.DateIntervalSymbols_ar;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ar_EH = dateIntervalSymbols.DateIntervalSymbols_ar;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ar_ER = dateIntervalSymbols.DateIntervalSymbols_ar;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ar_IL = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE، d MMMM – EEEE، d MMMM، y',
    'd': 'EEEE، d – EEEE، d MMMM، y',
    'y': 'EEEE، d MMMM، y – EEEE، d MMMM، y',
    '_': 'EEEE، d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM، y',
    'd': 'd–d MMMM، y',
    'y': 'd MMMM، y – d MMMM، y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'dd-MM-y GGGG – dd-MM-y GGGG',
    'Mdy': 'd‏/M‏/y – d‏/M‏/y',
    '_': 'dd‏/MM‏/y'
  },
  SHORT_DATE: {
    'G': 'dd-MM-y GGGG – dd-MM-y GGGG',
    '_': 'd‏/M‏/y'
  },
  FULL_TIME: {
    'G': 'dd-MM-y GGGGG، H:mm:ss zzzz',
    'Mdy': 'd‏/M‏/y، H:mm:ss zzzz',
    '_': 'H:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'dd-MM-y GGGGG، H:mm:ss z',
    'Mdy': 'd‏/M‏/y، H:mm:ss z',
    '_': 'H:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'dd-MM-y GGGGG، H:mm:ss',
    'Mdy': 'd‏/M‏/y، H:mm:ss',
    '_': 'H:mm:ss'
  },
  SHORT_TIME: {
    'G': 'dd-MM-y GGGGG، H:mm',
    'Mdy': 'd‏/M‏/y، H:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'H:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE، d MMMM y في H:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y في H:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd‏/MM‏/y، H:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd-MM-y GGGGG، H:mm',
    'ahm': 'd‏/M‏/y، HH:mm–HH:mm',
    '_': 'd‏/M‏/y، H:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ar_IQ = dateIntervalSymbols.DateIntervalSymbols_ar;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ar_JO = dateIntervalSymbols.DateIntervalSymbols_ar;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ar_KM = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE، d MMMM – EEEE، d MMMM، y',
    'd': 'EEEE، d – EEEE، d MMMM، y',
    'y': 'EEEE، d MMMM، y – EEEE، d MMMM، y',
    '_': 'EEEE، d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM، y',
    'd': 'd–d MMMM، y',
    'y': 'd MMMM، y – d MMMM، y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'dd-MM-y GGGG – dd-MM-y GGGG',
    'Mdy': 'd‏/M‏/y – d‏/M‏/y',
    '_': 'dd‏/MM‏/y'
  },
  SHORT_DATE: {
    'G': 'dd-MM-y GGGG – dd-MM-y GGGG',
    '_': 'd‏/M‏/y'
  },
  FULL_TIME: {
    'G': 'dd-MM-y GGGGG، HH:mm:ss zzzz',
    'Mdy': 'd‏/M‏/y، HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'dd-MM-y GGGGG، HH:mm:ss z',
    'Mdy': 'd‏/M‏/y، HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'dd-MM-y GGGGG، HH:mm:ss',
    'Mdy': 'd‏/M‏/y، HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'dd-MM-y GGGGG، HH:mm',
    'Mdy': 'd‏/M‏/y، HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE، d MMMM y في HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y في HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd‏/MM‏/y، HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd-MM-y GGGGG، HH:mm',
    'ahm': 'd‏/M‏/y، HH:mm–HH:mm',
    '_': 'd‏/M‏/y، HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ar_KW = dateIntervalSymbols.DateIntervalSymbols_ar;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ar_LB = dateIntervalSymbols.DateIntervalSymbols_ar;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ar_LY = dateIntervalSymbols.DateIntervalSymbols_ar;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ar_MA = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE، d MMMM – EEEE، d MMMM، y',
    'd': 'EEEE، d – EEEE، d MMMM، y',
    'y': 'EEEE، d MMMM، y – EEEE، d MMMM، y',
    '_': 'EEEE، d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM، y',
    'd': 'd–d MMMM، y',
    'y': 'd MMMM، y – d MMMM، y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'dd-MM-y GGGG – dd-MM-y GGGG',
    'Mdy': 'd‏/M‏/y – d‏/M‏/y',
    '_': 'dd‏/MM‏/y'
  },
  SHORT_DATE: {
    'G': 'dd-MM-y GGGG – dd-MM-y GGGG',
    '_': 'd‏/M‏/y'
  },
  FULL_TIME: {
    'G': 'dd-MM-y GGGGG، HH:mm:ss zzzz',
    'Mdy': 'd‏/M‏/y، HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'dd-MM-y GGGGG، HH:mm:ss z',
    'Mdy': 'd‏/M‏/y، HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'dd-MM-y GGGGG، HH:mm:ss',
    'Mdy': 'd‏/M‏/y، HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'dd-MM-y GGGGG، HH:mm',
    'Mdy': 'd‏/M‏/y، HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE، d MMMM y في HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y في HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd‏/MM‏/y، HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd-MM-y GGGGG، HH:mm',
    'ahm': 'd‏/M‏/y، HH:mm–HH:mm',
    '_': 'd‏/M‏/y، HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ar_MR = dateIntervalSymbols.DateIntervalSymbols_ar;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ar_OM = dateIntervalSymbols.DateIntervalSymbols_ar;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ar_PS = dateIntervalSymbols.DateIntervalSymbols_ar;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ar_QA = dateIntervalSymbols.DateIntervalSymbols_ar;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ar_SA = dateIntervalSymbols.DateIntervalSymbols_ar;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ar_SD = dateIntervalSymbols.DateIntervalSymbols_ar;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ar_SO = dateIntervalSymbols.DateIntervalSymbols_ar;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ar_SS = dateIntervalSymbols.DateIntervalSymbols_ar;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ar_SY = dateIntervalSymbols.DateIntervalSymbols_ar;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ar_TD = dateIntervalSymbols.DateIntervalSymbols_ar;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ar_TN = dateIntervalSymbols.DateIntervalSymbols_ar;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ar_XB = {
  FULL_DATE: {
    'G': 'EEEE, MMMM d, y G – EEEE, MMMM d, y G',
    'Md': 'EEEE, MMMM d – EEEE, MMMM d, y',
    '_': 'EEEE, MMMM d, y'
  },
  LONG_DATE: {
    'G': 'MMMM d, y G – MMMM d, y G',
    'M': 'MMMM d – MMMM d, y',
    'd': 'MMMM d – d, y',
    '_': 'MMMM d, y'
  },
  MEDIUM_DATE: {
    'G': 'MMM d, y G – MMM d, y G',
    'M': 'MMM d – MMM d, y',
    'd': 'MMM d – d, y',
    '_': 'MMM d, y'
  },
  SHORT_DATE: {
    'G': 'M/d/yy G – M/d/yy G',
    '_': 'M/d/yy'
  },
  FULL_TIME: {
    'G': 'M/d/y G, h:mm:ss a zzzz',
    'Mdy': 'M/d/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'M/d/y G, h:mm:ss a z',
    'Mdy': 'M/d/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'M/d/y G, h:mm:ss a',
    'Mdy': 'M/d/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'M/d/y G, [H:mm]',
    'Mdy': 'M/d/y, [H:mm]',
    'ahm': 'HH:mm – HH:mm',
    '_': '[H:mm]'
  },
  FULL_DATETIME: {
    '_': 'EEEE, MMMM d, y \'؜‮at‬؜\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'MMMM d, y \'؜‮at‬؜\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'MMM d, y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'M/d/yy G, [H:mm]',
    'ahm': 'M/d/yy, HH:mm – HH:mm',
    '_': 'M/d/yy, [H:mm]'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ar_YE = dateIntervalSymbols.DateIntervalSymbols_ar;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_as = {
  FULL_DATE: {
    'G': 'G EEEE, d MMMM, y – G EEEE, d MMMM, y',
    'Md': 'EEEE, d MMMM y – EEEE, d MMMM',
    'y': 'EEEE, d MMMM y – d MMMM y',
    '_': 'EEEE, d MMMM, y'
  },
  LONG_DATE: {
    'G': 'G d MMMM, y – G d MMMM, y',
    'M': 'd MMMM y – d MMMM',
    'd': 'd–d MMMM y',
    'y': 'd MMMM y – d MMMM y',
    '_': 'd MMMM, y'
  },
  MEDIUM_DATE: {
    'G': 'GGGGG d/M/y – GGGGG d/M/y',
    '_': 'dd-MM-y'
  },
  SHORT_DATE: {
    'G': 'GGGGG d/M/y – GGGGG d/M/y',
    'Mdy': 'dd-MM-y – dd-MM-y',
    '_': 'd-M-y'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, a h.mm.ss zzzz',
    'Mdy': 'dd-MM-y, a h.mm.ss zzzz',
    '_': 'a h.mm.ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, a h.mm.ss z',
    'Mdy': 'dd-MM-y, a h.mm.ss z',
    '_': 'a h.mm.ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, a h.mm.ss',
    'Mdy': 'dd-MM-y, a h.mm.ss',
    '_': 'a h.mm.ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, a h.mm',
    'Mdy': 'dd-MM-y, a h.mm',
    'a': 'a h:mm – a h:mm',
    'hm': 'a h:mm–h:mm',
    '_': 'a h.mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM, y \'at\' a h.mm.ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM, y \'at\' a h.mm.ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd-MM-y, a h.mm.ss'
  },
  SHORT_DATETIME: {
    'G': 'd/M/y GGGGG, a h.mm',
    'a': 'dd-MM-y a h:mm – a h:mm',
    'hm': 'dd-MM-y a h:mm–h:mm',
    '_': 'd-M-y, a h.mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_as_IN = DateIntervalSymbols_as;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_asa = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_asa_TZ = DateIntervalSymbols_asa;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ast = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'EEEE, d MMMM – EEEE, d MMMM \'de\' y',
    '_': 'EEEE, d MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'd MMMM – d MMMM \'de\' y',
    'd': 'd – d MMMM \'de\' y',
    '_': 'd MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'd MMM – d MMM \'de\' y',
    'd': 'd – d MMM \'de\' y',
    'y': 'd MMM \'de\' y – d MMM \'de\' y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM \'de\' y \'a\' \'les\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM \'de\' y \'a\' \'les\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd HH:mm',
    'ahm': 'd/M/yy, HH:mm – HH:mm',
    '_': 'd/M/yy HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ast_ES = DateIntervalSymbols_ast;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_az_Cyrl = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'd MMMM y, EEEE – d MMMM, EEEE',
    'y': 'd MMMM y, EEEE – d MMMM y, EEEE',
    '_': 'd MMMM y, EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'd MMMM y – d MMMM',
    'd': 'y MMMM d–d',
    'y': 'd MMMM y – d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'd MMM y – d MMM',
    'd': 'y MMM d–d',
    'y': 'd MMM y – d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Mdy': 'dd.MM.yy – dd.MM.yy',
    '_': 'dd.MM.yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'dd.MM.y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'dd.MM.y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'dd.MM.y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'dd.MM.y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'd MMMM y, EEEE HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd HH:mm',
    'ahm': 'dd.MM.yy HH:mm–HH:mm',
    '_': 'dd.MM.yy HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_az_Cyrl_AZ = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'd MMMM y, EEEE – d MMMM, EEEE',
    'y': 'd MMMM y, EEEE – d MMMM y, EEEE',
    '_': 'd MMMM y, EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'd MMMM y – d MMMM',
    'd': 'y MMMM d–d',
    'y': 'd MMMM y – d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'd MMM y – d MMM',
    'd': 'y MMM d–d',
    'y': 'd MMM y – d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Mdy': 'dd.MM.yy – dd.MM.yy',
    '_': 'dd.MM.yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'dd.MM.y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'dd.MM.y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'dd.MM.y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'dd.MM.y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'd MMMM y, EEEE HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd HH:mm',
    'ahm': 'dd.MM.yy HH:mm–HH:mm',
    '_': 'dd.MM.yy HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_az_Latn = dateIntervalSymbols.DateIntervalSymbols_az;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_az_Latn_AZ = dateIntervalSymbols.DateIntervalSymbols_az;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_bas = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM, y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'd/M/y HH:mm–HH:mm',
    '_': 'd/M/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_bas_CM = DateIntervalSymbols_bas;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_be_BY = dateIntervalSymbols.DateIntervalSymbols_be;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_bem = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'd/M/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'd/M/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'd/M/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'd/M/y h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'a': 'dd/MM/y h:mm a – h:mm a',
    'hm': 'dd/MM/y h:mm–h:mm a',
    '_': 'dd/MM/y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_bem_ZM = DateIntervalSymbols_bem;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_bez = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_bez_TZ = DateIntervalSymbols_bez;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_bg_BG = dateIntervalSymbols.DateIntervalSymbols_bg;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_bgc = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'y MMMM d, EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'y MMMM d'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'y-M-d h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'y-M-d h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'y-M-d h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'y-M-d h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'y MMMM d, EEEE h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'y MMMM d h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'a': 'y-MM-dd h:mm a – h:mm a',
    'hm': 'y-MM-dd h:mm–h:mm a',
    '_': 'y-MM-dd h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_bgc_IN = DateIntervalSymbols_bgc;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_bho = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    '_': 'y MMMM d, EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    '_': 'y MMMM d'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'y-MM-dd h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'y-MM-dd h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'y-MM-dd h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'y-MM-dd h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'y MMMM d, EEEE h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'y MMMM d h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'a': 'y-MM-dd h:mm a – h:mm a',
    'hm': 'y-MM-dd h:mm–h:mm a',
    '_': 'y-MM-dd h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_bho_IN = DateIntervalSymbols_bho;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_bm = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM, y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'd/M/y HH:mm–HH:mm',
    '_': 'd/M/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_bm_ML = DateIntervalSymbols_bm;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_bn_BD = dateIntervalSymbols.DateIntervalSymbols_bn;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_bn_IN = dateIntervalSymbols.DateIntervalSymbols_bn;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_bo = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'y MMMMའི་ཚེས་d, EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'སྤྱི་ལོ་y MMMMའི་ཚེས་d'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'y ལོའི་MMMཚེས་d'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'y-M-d HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'y-M-d HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'y-M-d HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'y-M-d HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'y MMMMའི་ཚེས་d, EEEE HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'སྤྱི་ལོ་y MMMMའི་ཚེས་d HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'y ལོའི་MMMཚེས་d HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'y-MM-dd HH:mm–HH:mm',
    '_': 'y-MM-dd HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_bo_CN = DateIntervalSymbols_bo;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_bo_IN = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'y MMMMའི་ཚེས་d, EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'སྤྱི་ལོ་y MMMMའི་ཚེས་d'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'y ལོའི་MMMཚེས་d'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'y-M-d h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'y-M-d h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'y-M-d h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'y-M-d h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'y MMMMའི་ཚེས་d, EEEE h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'སྤྱི་ལོ་y MMMMའི་ཚེས་d h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'y ལོའི་MMMཚེས་d h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'a': 'y-MM-dd h:mm a – h:mm a',
    'hm': 'y-MM-dd h:mm–h:mm a',
    '_': 'y-MM-dd h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_br_FR = dateIntervalSymbols.DateIntervalSymbols_br;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_brx = {
  FULL_DATE: {
    'G': 'G y, d MMMM, EEEE – G y, d MMMM, EEEE',
    'M': 'd MMMM, y, EEEE – d MMMM, y, EEEE',
    'd': 'y, d MMMM, EEEE– d MMMM, EEEE',
    'y': 'd MMMM, y, EEEE – d MMMM, y,EEEE',
    '_': 'd MMMM y, EEEE'
  },
  LONG_DATE: {
    'G': 'G y, MMMM d – G y, MMMM d',
    'M': 'y, d MMMM– d MMMM',
    'd': 'y, d–d MMMM',
    'y': 'y, MMMM d – y, MMMM d',
    '_': 'd MMMM, y'
  },
  MEDIUM_DATE: {
    'G': 'G y, MMM d – G y, MMM d',
    'M': 'y, d MMM– d MMM',
    'd': 'y, d–d MMM',
    'y': 'y, MMM d – y, MMM d',
    '_': 'd MMM, y'
  },
  SHORT_DATE: {
    'G': 'G d/M/y – G d/M/y',
    'Mdy': 'd/M/y–d/M/y',
    '_': 'dd-MM-y'
  },
  FULL_TIME: {
    'G': 'GGGGG dd-MM-y, a h:mm:ss zzzz',
    'Mdy': 'dd-MM-y, a h:mm:ss zzzz',
    '_': 'a h:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG dd-MM-y, a h:mm:ss z',
    'Mdy': 'dd-MM-y, a h:mm:ss z',
    '_': 'a h:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG dd-MM-y, a h:mm:ss',
    'Mdy': 'dd-MM-y, a h:mm:ss',
    '_': 'a h:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG dd-MM-y, a नि h:mm',
    'Mdy': 'dd-MM-y, a नि h:mm',
    'a': 'a h:mm – a h:mm',
    'h': 'a नि h:mm–h:mm',
    'm': 'a h:mm – h:mm',
    '_': 'a नि h:mm'
  },
  FULL_DATETIME: {
    '_': 'd MMMM y, EEEE नि a h:mm:ss zzzz याव'
  },
  LONG_DATETIME: {
    '_': 'd MMMM, y नि a h:mm:ss z याव'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM, y, a h:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG dd-MM-y, a नि h:mm',
    'a': 'dd-MM-y, a h:mm – a h:mm',
    'h': 'dd-MM-y, a नि h:mm–h:mm',
    'm': 'dd-MM-y, a h:mm – h:mm',
    '_': 'dd-MM-y, a नि h:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_brx_IN = DateIntervalSymbols_brx;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_bs_Cyrl = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'M': 'EEEE, dd. MMMM – EEEE, dd. MMMM y.',
    'd': 'EEEE, dd. – EEEE, dd. MMMM y.',
    'y': 'EEEE, dd. MMMM y. – EEEE, dd. MMMM y.',
    '_': 'EEEE, dd. MMMM y.'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'dd. MMMM – dd. MMMM y.',
    'd': 'dd.–dd. MMMM y.',
    'y': 'dd. MMMM y. – dd. MMMM y.',
    '_': 'dd. MMMM y.'
  },
  MEDIUM_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'd.M.y. – d.M.y.',
    '_': 'dd.MM.y.'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Mdy': 'd.M.yy. – d.M.yy.',
    '_': 'd.M.yy.'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'dd.MM.y. HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'dd.MM.y. HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'dd.MM.y. HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'dd.MM.y. HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, dd. MMMM y. HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'dd. MMMM y. HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd.MM.y. HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd HH:mm',
    'ahm': 'dd.MM.yy. HH:mm–HH:mm',
    '_': 'd.M.yy. HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_bs_Cyrl_BA = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'M': 'EEEE, dd. MMMM – EEEE, dd. MMMM y.',
    'd': 'EEEE, dd. – EEEE, dd. MMMM y.',
    'y': 'EEEE, dd. MMMM y. – EEEE, dd. MMMM y.',
    '_': 'EEEE, dd. MMMM y.'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'dd. MMMM – dd. MMMM y.',
    'd': 'dd.–dd. MMMM y.',
    'y': 'dd. MMMM y. – dd. MMMM y.',
    '_': 'dd. MMMM y.'
  },
  MEDIUM_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'd.M.y. – d.M.y.',
    '_': 'dd.MM.y.'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Mdy': 'd.M.yy. – d.M.yy.',
    '_': 'd.M.yy.'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'dd.MM.y. HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'dd.MM.y. HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'dd.MM.y. HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'dd.MM.y. HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, dd. MMMM y. HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'dd. MMMM y. HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd.MM.y. HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd HH:mm',
    'ahm': 'dd.MM.yy. HH:mm–HH:mm',
    '_': 'd.M.yy. HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_bs_Latn = dateIntervalSymbols.DateIntervalSymbols_bs;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_bs_Latn_BA = dateIntervalSymbols.DateIntervalSymbols_bs;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ca_AD = {
  FULL_DATE: {
    'M': 'EEEE, d MMMM – EEEE, d MMMM \'de\' y',
    'd': 'EEEE, d – EEEE, d MMMM \'de\' y',
    '_': 'EEEE, d MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM, y G – d MMMM, y G',
    'M': 'd MMMM – d MMMM \'de\' y',
    'd': 'd–d MMMM \'de\' y',
    '_': 'd MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM, y G – d MMM, y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd/M/yy GGGGG – d/M/yy GGGGG',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'dd-MM-y GGGGG H:mm:ss zzzz',
    'Mdy': 'd/M/y H:mm:ss zzzz',
    '_': 'H:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'dd-MM-y GGGGG H:mm:ss z',
    'Mdy': 'd/M/y H:mm:ss z',
    '_': 'H:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'dd-MM-y GGGGG H:mm:ss',
    'Mdy': 'd/M/y H:mm:ss',
    '_': 'H:mm:ss'
  },
  SHORT_TIME: {
    'G': 'dd-MM-y GGGGG H:mm',
    'Mdy': 'd/M/y H:mm',
    'ahm': 'H:mm–H:mm',
    '_': 'H:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM \'de\' y, \'a\' \'les\' H:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM \'de\' y, \'a\' \'les\' H:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, H:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd-MM-yy GGGGG H:mm',
    'ahm': 'd/M/yy, H:mm–H:mm',
    '_': 'd/M/yy H:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ca_ES = dateIntervalSymbols.DateIntervalSymbols_ca;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ca_FR = {
  FULL_DATE: {
    'M': 'EEEE, d MMMM – EEEE, d MMMM \'de\' y',
    'd': 'EEEE, d – EEEE, d MMMM \'de\' y',
    '_': 'EEEE, d MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM, y G – d MMMM, y G',
    'M': 'd MMMM – d MMMM \'de\' y',
    'd': 'd–d MMMM \'de\' y',
    '_': 'd MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM, y G – d MMM, y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd/M/yy GGGGG – d/M/yy GGGGG',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'dd-MM-y GGGGG H:mm:ss zzzz',
    'Mdy': 'd/M/y H:mm:ss zzzz',
    '_': 'H:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'dd-MM-y GGGGG H:mm:ss z',
    'Mdy': 'd/M/y H:mm:ss z',
    '_': 'H:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'dd-MM-y GGGGG H:mm:ss',
    'Mdy': 'd/M/y H:mm:ss',
    '_': 'H:mm:ss'
  },
  SHORT_TIME: {
    'G': 'dd-MM-y GGGGG H:mm',
    'Mdy': 'd/M/y H:mm',
    'ahm': 'H:mm–H:mm',
    '_': 'H:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM \'de\' y, \'a\' \'les\' H:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM \'de\' y, \'a\' \'les\' H:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, H:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd-MM-yy GGGGG H:mm',
    'ahm': 'd/M/yy, H:mm–H:mm',
    '_': 'd/M/yy H:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ca_IT = {
  FULL_DATE: {
    'M': 'EEEE, d MMMM – EEEE, d MMMM \'de\' y',
    'd': 'EEEE, d – EEEE, d MMMM \'de\' y',
    '_': 'EEEE, d MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM, y G – d MMMM, y G',
    'M': 'd MMMM – d MMMM \'de\' y',
    'd': 'd–d MMMM \'de\' y',
    '_': 'd MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM, y G – d MMM, y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd/M/yy GGGGG – d/M/yy GGGGG',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'dd-MM-y GGGGG H:mm:ss zzzz',
    'Mdy': 'd/M/y H:mm:ss zzzz',
    '_': 'H:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'dd-MM-y GGGGG H:mm:ss z',
    'Mdy': 'd/M/y H:mm:ss z',
    '_': 'H:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'dd-MM-y GGGGG H:mm:ss',
    'Mdy': 'd/M/y H:mm:ss',
    '_': 'H:mm:ss'
  },
  SHORT_TIME: {
    'G': 'dd-MM-y GGGGG H:mm',
    'Mdy': 'd/M/y H:mm',
    'ahm': 'H:mm–H:mm',
    '_': 'H:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM \'de\' y, \'a\' \'les\' H:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM \'de\' y, \'a\' \'les\' H:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, H:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd-MM-yy GGGGG H:mm',
    'ahm': 'd/M/yy, H:mm–H:mm',
    '_': 'd/M/yy H:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ccp = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'EEEE, d MMMM – EEEE, d MMMM, y',
    '_': 'EEEE, d MMMM, y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'd MMMM – d MMMM, y',
    'd': 'd–d MMMM, y',
    '_': 'd MMMM, y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'd MMM – d MMM, y',
    'd': 'd–d MMM, y',
    '_': 'd MMM, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'd/M/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'd/M/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'd/M/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'd/M/y h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM, y h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM, y h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM, y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd h:mm a',
    'a': 'd/M/yy h:mm a – h:mm a',
    'hm': 'd/M/yy h:mm–h:mm a',
    '_': 'd/M/yy h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ccp_BD = DateIntervalSymbols_ccp;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ccp_IN = DateIntervalSymbols_ccp;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ce = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'y MMMM d, EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'y MMMM d'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'y-M-d HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'y-M-d HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'y-M-d HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'y-M-d HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'y MMMM d, EEEE HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'y MMMM d HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'y-MM-dd HH:mm–HH:mm',
    '_': 'y-MM-dd HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ce_RU = DateIntervalSymbols_ce;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ceb = {
  FULL_DATE: {
    'G': 'EEEE, MMMM d, y G – EEEE, MMMM d, y G',
    'Md': 'EEEE, MMMM d – EEEE, MMMM d, y',
    '_': 'EEEE, MMMM d, y'
  },
  LONG_DATE: {
    'G': 'MMMM d, y G – MMMM d, y G',
    'M': 'MMMM d – MMMM d, y',
    'd': 'MMMM d – d, y',
    '_': 'MMMM d, y'
  },
  MEDIUM_DATE: {
    'G': 'MMM d, y G – MMM d, y G',
    'M': 'MMM d – MMM d, y',
    'd': 'MMM d – d, y',
    '_': 'MMM d, y'
  },
  SHORT_DATE: {
    'G': 'M/d/yy GGGGG – M/d/yy GGGGG',
    '_': 'M/d/yy'
  },
  FULL_TIME: {
    'G': 'M/d/y GGGGG, h:mm:ss a zzzz',
    'Mdy': 'M/d/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'M/d/y GGGGG, h:mm:ss a z',
    'Mdy': 'M/d/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'M/d/y GGGGG, h:mm:ss a',
    'Mdy': 'M/d/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'M/d/y GGGGG, h:mm a',
    'Mdy': 'M/d/y, h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, MMMM d, y \'sa\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'MMMM d, y \'sa\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'MMM d, y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'M/d/yy GGGGG, h:mm a',
    'a': 'M/d/yy, h:mm a – h:mm a',
    'hm': 'M/d/yy, h:mm – h:mm a',
    '_': 'M/d/yy, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ceb_PH = DateIntervalSymbols_ceb;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_cgg = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_cgg_UG = DateIntervalSymbols_cgg;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_chr_US = dateIntervalSymbols.DateIntervalSymbols_chr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ckb = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'y MMMM d, EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'dی MMMMی y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'd/M/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'd/M/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'd/M/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'd/M/y h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'y MMMM d, EEEE h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'dی MMMMی y h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'a': 'y-MM-dd h:mm a – h:mm a',
    'hm': 'y-MM-dd h:mm–h:mm a',
    '_': 'y-MM-dd h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ckb_Arab = DateIntervalSymbols_ckb;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ckb_Arab_IQ = DateIntervalSymbols_ckb;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ckb_Arab_IR = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'y MMMM d, EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'dی MMMMی y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'y MMMM d, EEEE HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'dی MMMMی y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'y-MM-dd HH:mm–HH:mm',
    '_': 'y-MM-dd HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ckb_IQ = DateIntervalSymbols_ckb;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ckb_IR = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'y MMMM d, EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'dی MMMMی y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'y MMMM d, EEEE HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'dی MMMMی y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'y-MM-dd HH:mm–HH:mm',
    '_': 'y-MM-dd HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_cs_CZ = dateIntervalSymbols.DateIntervalSymbols_cs;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_cv = {
  FULL_DATE: {
    'G': 'ccc, d MMMM y \'ҫ\'. G – ccc, d MMMM y \'ҫ\'. G',
    'M': 'ccc, d MMMM – ccc, d MMMM y \'ҫ\'.',
    'd': 'ccc, d – ccc, d MMMM y \'ҫ\'.',
    'y': 'ccc, d MMMM y \'ҫ\'. – ccc, d MMMM y \'ҫ\'.',
    '_': 'EEEE, d MMMM y \'ҫ\'.'
  },
  LONG_DATE: {
    'G': 'd MMMM y \'ҫ\'. G – d MMMM y \'ҫ\'. G',
    'M': 'd MMMM – d MMMM y \'ҫ\'.',
    'd': 'd–d MMMM y \'ҫ\'.',
    'y': 'd MMMM y \'ҫ\'. – d MMMM y \'ҫ\'.',
    '_': 'd MMMM y \'ҫ\'.'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y \'ҫ\'. G – d MMM y \'ҫ\'. G',
    'M': 'd MMM – d MMM y \'ҫ\'.',
    'd': 'd–d MMM y \'ҫ\'.',
    'y': 'd MMM y \'ҫ\'. – d MMM y \'ҫ\'.',
    '_': 'd MMM y \'ҫ\'.'
  },
  SHORT_DATE: {
    'G': 'dd.MM.y G – dd.MM.y G',
    '_': 'dd.MM.y'
  },
  FULL_TIME: {
    'G': 'dd.MM.y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'dd.MM.y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'dd.MM.y GGGGG, HH:mm:ss z',
    'Mdy': 'dd.MM.y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'dd.MM.y GGGGG, HH:mm:ss',
    'Mdy': 'dd.MM.y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'dd.MM.y GGGGG, HH:mm',
    'Mdy': 'dd.MM.y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'ҫ\'., HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'ҫ\'., HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y \'ҫ\'., HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd.MM.y GGGGG, HH:mm',
    'ahm': 'dd.MM.y, HH:mm–HH:mm',
    '_': 'dd.MM.y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_cv_RU = DateIntervalSymbols_cv;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_cy_GB = dateIntervalSymbols.DateIntervalSymbols_cy;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_da_DK = dateIntervalSymbols.DateIntervalSymbols_da;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_da_GL = dateIntervalSymbols.DateIntervalSymbols_da;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_dav = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_dav_KE = DateIntervalSymbols_dav;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_de_BE = dateIntervalSymbols.DateIntervalSymbols_de;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_de_DE = dateIntervalSymbols.DateIntervalSymbols_de;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_de_IT = dateIntervalSymbols.DateIntervalSymbols_de;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_de_LI = dateIntervalSymbols.DateIntervalSymbols_de;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_de_LU = dateIntervalSymbols.DateIntervalSymbols_de;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_dje = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM, y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'd/M/y HH:mm–HH:mm',
    '_': 'd/M/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_dje_NE = DateIntervalSymbols_dje;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_doi = {
  FULL_DATE: {
    'G': 'EEEE, MMMM d, y G – EEEE, MMMM d, y G',
    'Md': 'EEEE, MMMM d – EEEE, MMMM d, y',
    'y': 'EEEE, MMMM d, y – EEEE, MMMM d, y',
    '_': 'EEEE, d, MMMM y'
  },
  LONG_DATE: {
    'G': 'MMMM d, y G – MMMM d, y G',
    'M': 'MMMM d – MMMM d, y',
    'd': 'MMMM d – d, y',
    'y': 'MMMM d, y – MMMM d, y',
    '_': 'd, MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'MMM d, y G – MMM d, y G',
    'M': 'MMM d – MMM d, y',
    'd': 'MMM d – d, y',
    'y': 'MMM d, y – MMM d, y',
    '_': 'd, MMM y'
  },
  SHORT_DATE: {
    'G': 'M/d/yy GGGGG – M/d/yy GGGGG',
    'Mdy': 'M/d/yy – M/d/yy',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd, h:mm:ss a zzzz',
    'Mdy': 'd/M/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd, h:mm:ss a z',
    'Mdy': 'd/M/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd, h:mm:ss a',
    'Mdy': 'd/M/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd, h:mm a',
    'Mdy': 'd/M/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d, MMMM y गी h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd, MMMM y गी h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd, MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd, h:mm a',
    'a': 'd/M/yy, h:mm a – h:mm a',
    'hm': 'd/M/yy, h:mm – h:mm a',
    '_': 'd/M/yy, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_doi_IN = DateIntervalSymbols_doi;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_dsb = {
  FULL_DATE: {
    'G': 'EEEE, d. MMMM y G – EEEE, d. MMMM y G',
    'M': 'EEEE, d. MMMM – EEEE, d. MMMM y',
    'd': 'EEEE, d. – EEEE, d. MMMM y',
    '_': 'EEEE, d. MMMM y'
  },
  LONG_DATE: {
    'G': 'd. MMMM y G – d. MMMM y G',
    'M': 'd. MMMM – d. MMMM y',
    'd': 'd. – d. MMMM y',
    '_': 'd. MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'dd.MM.y G – dd.MM.y G',
    '_': 'd.M.y'
  },
  SHORT_DATE: {
    'G': 'dd.MM.yy G – dd.MM.yy G',
    '_': 'd.M.yy'
  },
  FULL_TIME: {
    'G': 'd.M.y GGGGG H:mm:ss zzzz',
    'Mdy': 'd.M.y H:mm:ss zzzz',
    '_': 'H:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd.M.y GGGGG H:mm:ss z',
    'Mdy': 'd.M.y H:mm:ss z',
    '_': 'H:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd.M.y GGGGG H:mm:ss',
    'Mdy': 'd.M.y H:mm:ss',
    '_': 'H:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd.M.y GGGGG H:mm',
    'Mdy': 'd.M.y H:mm',
    'ahm': '\'zeg\'. H:mm – H:mm',
    '_': 'H:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d. MMMM y \'zeger\' H:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd. MMMM y \'zeger\' H:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd.M.y H:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd.M.yy GGGGG H:mm',
    'ahm': 'd.M.yy \'zeg\'. H:mm – H:mm',
    '_': 'd.M.yy H:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_dsb_DE = DateIntervalSymbols_dsb;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_dua = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'd/M/y HH:mm–HH:mm',
    '_': 'd/M/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_dua_CM = DateIntervalSymbols_dua;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_dyo = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'd/M/y HH:mm–HH:mm',
    '_': 'd/M/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_dyo_SN = DateIntervalSymbols_dyo;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_dz = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Mdy': 'EEEE, y-MM-dd – EEEE, y-MM-dd',
    '_': 'EEEE, སྤྱི་ལོ་y MMMM ཚེས་dd'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y-MM-dd – MM-d',
    'd': 'y-MM-d – d',
    'y': 'y-MM-dd – y-MM-dd',
    '_': 'སྤྱི་ལོ་y MMMM ཚེས་ dd'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y-MM-dd – MM-d',
    'd': 'y-MM-d – d',
    'y': 'y-MM-dd – y-MM-dd',
    '_': 'སྤྱི་ལོ་y ཟླ་MMM ཚེས་dd'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'M': 'y-MM-dd – MM-dd',
    'd': 'y-MM-dd – dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd ཆུ་ཚོད་ h སྐར་མ་ mm:ss a zzzz',
    'Mdy': 'y-M-d ཆུ་ཚོད་ h སྐར་མ་ mm:ss a zzzz',
    '_': 'ཆུ་ཚོད་ h སྐར་མ་ mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd ཆུ་ཚོད་ h སྐར་མ་ mm:ss a z',
    'Mdy': 'y-M-d ཆུ་ཚོད་ h སྐར་མ་ mm:ss a z',
    '_': 'ཆུ་ཚོད་ h སྐར་མ་ mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd ཆུ་ཚོད་h:mm:ss a',
    'Mdy': 'y-M-d ཆུ་ཚོད་h:mm:ss a',
    '_': 'ཆུ་ཚོད་h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd ཆུ་ཚོད་ h སྐར་མ་ mm a',
    'Mdy': 'y-M-d ཆུ་ཚོད་ h སྐར་མ་ mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'ཆུ་ཚོད་ h སྐར་མ་ mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, སྤྱི་ལོ་y MMMM ཚེས་dd ཆུ་ཚོད་ h སྐར་མ་ mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'སྤྱི་ལོ་y MMMM ཚེས་ dd ཆུ་ཚོད་ h སྐར་མ་ mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'སྤྱི་ལོ་y ཟླ་MMM ཚེས་dd ཆུ་ཚོད་h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd ཆུ་ཚོད་ h སྐར་མ་ mm a',
    'a': 'y-MM-dd h:mm a – h:mm a',
    'hm': 'y-MM-dd h:mm–h:mm a',
    '_': 'y-MM-dd ཆུ་ཚོད་ h སྐར་མ་ mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_dz_BT = DateIntervalSymbols_dz;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ebu = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ebu_KE = DateIntervalSymbols_ebu;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ee = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'EEEE, MMMM d \'lia\' – EEEE, MMMM d \'lia\', y',
    'y': 'EEEE, MMMM d \'lia\', y – EEEE, MMMM d \'lia\', y',
    '_': 'EEEE, MMMM d \'lia\' y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'MMMM d \'lia\' – MMMM d \'lia\', y',
    'd': 'MMMM d \'lia\' – d \'lia\' , y',
    'y': 'MMMM d \'lia\' , y – MMMM d \'lia\', y',
    '_': 'MMMM d \'lia\' y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'MMM d \'lia\' – MMM d \'lia\', y',
    'd': 'MMM d \'lia\' – d \'lia\' , y',
    'y': 'MMM d \'lia\' , y – MMM d \'lia\', y',
    '_': 'MMM d \'lia\', y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    '_': 'M/d/yy'
  },
  FULL_TIME: {
    'G': 'a \'ga\' h:mm:ss zzzz GGGGG y-MM-dd',
    'Mdy': 'a \'ga\' h:mm:ss zzzz M/d/y',
    '_': 'a \'ga\' h:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'a \'ga\' h:mm:ss z GGGGG y-MM-dd',
    'Mdy': 'a \'ga\' h:mm:ss z M/d/y',
    '_': 'a \'ga\' h:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'a \'ga\' h:mm:ss GGGGG y-MM-dd',
    'Mdy': 'a \'ga\' h:mm:ss M/d/y',
    '_': 'a \'ga\' h:mm:ss'
  },
  SHORT_TIME: {
    'G': 'a \'ga\' h:mm GGGGG y-MM-dd',
    'Mdy': 'a \'ga\' h:mm M/d/y',
    'h': 'a \'ga\' h:mm - \'ga\' h:mm',
    'm': 'a \'ga\' h:mm – \'ga\' h:mm',
    '_': 'a \'ga\' h:mm'
  },
  FULL_DATETIME: {
    '_': 'a \'ga\' h:mm:ss zzzz EEEE, MMMM d \'lia\' y'
  },
  LONG_DATETIME: {
    '_': 'a \'ga\' h:mm:ss z MMMM d \'lia\' y'
  },
  MEDIUM_DATETIME: {
    '_': 'a \'ga\' h:mm:ss MMM d \'lia\', y'
  },
  SHORT_DATETIME: {
    'G': 'a \'ga\' h:mm GGGGG yy-MM-dd',
    'a': 'a \'ga\' h:mm – a \'ga\' h:mm M/d/yy',
    'h': 'a \'ga\' h:mm - \'ga\' h:mm M/d/yy',
    'm': 'a \'ga\' h:mm – \'ga\' h:mm M/d/yy',
    '_': 'a \'ga\' h:mm M/d/yy'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ee_GH = DateIntervalSymbols_ee;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ee_TG = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'EEEE, MMMM d \'lia\' – EEEE, MMMM d \'lia\', y',
    'y': 'EEEE, MMMM d \'lia\', y – EEEE, MMMM d \'lia\', y',
    '_': 'EEEE, MMMM d \'lia\' y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'MMMM d \'lia\' – MMMM d \'lia\', y',
    'd': 'MMMM d \'lia\' – d \'lia\' , y',
    'y': 'MMMM d \'lia\' , y – MMMM d \'lia\', y',
    '_': 'MMMM d \'lia\' y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'MMM d \'lia\' – MMM d \'lia\', y',
    'd': 'MMM d \'lia\' – d \'lia\' , y',
    'y': 'MMM d \'lia\' , y – MMM d \'lia\', y',
    '_': 'MMM d \'lia\', y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    '_': 'M/d/yy'
  },
  FULL_TIME: {
    'G': 'HH:mm:ss zzzz GGGGG y-MM-dd',
    'Mdy': 'HH:mm:ss zzzz M/d/y',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'HH:mm:ss z GGGGG y-MM-dd',
    'Mdy': 'HH:mm:ss z M/d/y',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'HH:mm:ss GGGGG y-MM-dd',
    'Mdy': 'HH:mm:ss M/d/y',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'HH:mm GGGGG y-MM-dd',
    'Mdy': 'HH:mm M/d/y',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'HH:mm:ss zzzz EEEE, MMMM d \'lia\' y'
  },
  LONG_DATETIME: {
    '_': 'HH:mm:ss z MMMM d \'lia\' y'
  },
  MEDIUM_DATETIME: {
    '_': 'HH:mm:ss MMM d \'lia\', y'
  },
  SHORT_DATETIME: {
    'G': 'HH:mm GGGGG yy-MM-dd',
    'ahm': 'HH:mm–HH:mm M/d/yy',
    '_': 'HH:mm M/d/yy'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_el_CY = dateIntervalSymbols.DateIntervalSymbols_el;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_el_GR = dateIntervalSymbols.DateIntervalSymbols_el;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_001 = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_150 = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_AE = {
  FULL_DATE: {
    'G': 'EEEE, MMMM d, y G – EEEE, MMMM d, y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'MMMM d, y G – MMMM d, y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd – d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'MMM d, y G – MMM d, y G',
    'M': 'd MMM – d MMM y',
    'd': 'd – d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'M/d/y G – M/d/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'M/d/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'M/d/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'M/d/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'M/d/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'MM/dd/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_AG = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_AI = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_AS = dateIntervalSymbols.DateIntervalSymbols_en;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_AT = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_BB = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_BE = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    'y': 'd MMM y – d MMM y',
    '_': 'dd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/yy G – dd/MM/yy G',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'd/M/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'd/M/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'd/M/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'd/M/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/yy G, HH:mm',
    'ahm': 'dd/MM/yy, HH:mm–HH:mm',
    '_': 'dd/MM/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_BI = {
  FULL_DATE: {
    'G': 'EEEE, MMMM d, y G – EEEE, MMMM d, y G',
    'Md': 'EEEE, MMMM d – EEEE, MMMM d, y',
    '_': 'EEEE, MMMM d, y'
  },
  LONG_DATE: {
    'G': 'MMMM d, y G – MMMM d, y G',
    'M': 'MMMM d – MMMM d, y',
    'd': 'MMMM d – d, y',
    '_': 'MMMM d, y'
  },
  MEDIUM_DATE: {
    'G': 'MMM d, y G – MMM d, y G',
    'M': 'MMM d – MMM d, y',
    'd': 'MMM d – d, y',
    '_': 'MMM d, y'
  },
  SHORT_DATE: {
    'G': 'M/d/yy G – M/d/yy G',
    '_': 'M/d/yy'
  },
  FULL_TIME: {
    'G': 'M/d/y G, HH:mm:ss zzzz',
    'Mdy': 'M/d/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'M/d/y G, HH:mm:ss z',
    'Mdy': 'M/d/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'M/d/y G, HH:mm:ss',
    'Mdy': 'M/d/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'M/d/y G, HH:mm',
    'Mdy': 'M/d/y, HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, MMMM d, y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'MMMM d, y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'MMM d, y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'M/d/yy G, HH:mm',
    'ahm': 'M/d/yy, HH:mm – HH:mm',
    '_': 'M/d/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_BM = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_BS = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_BW = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    'y': 'EEEE, d MMMM y – EEEE, d MMMM y',
    '_': 'EEEE, dd MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    'y': 'd MMMM y – d MMMM y',
    '_': 'dd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    'y': 'd MMM y – d MMM y',
    '_': 'dd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/yy G – dd/MM/yy G',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, dd MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'dd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/yy G, HH:mm',
    'ahm': 'dd/MM/yy, HH:mm–HH:mm',
    '_': 'dd/MM/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_BZ = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    'y': 'EEEE, d MMMM y – EEEE, d MMMM y',
    '_': 'EEEE, dd MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    'y': 'd MMMM y – d MMMM y',
    '_': 'dd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    'y': 'd MMM y – d MMM y',
    '_': 'dd-MMM-y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/yy G – dd/MM/yy G',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, dd MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'dd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd-MMM-y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/yy G, HH:mm',
    'ahm': 'dd/MM/yy, HH:mm–HH:mm',
    '_': 'dd/MM/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_CC = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_CH = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    'Mdy': 'dd/MM/y – dd/MM/y',
    '_': 'dd.MM.y'
  },
  FULL_TIME: {
    'G': 'd.M.y G, HH:mm:ss zzzz',
    'Mdy': 'dd.MM.y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd.M.y G, HH:mm:ss z',
    'Mdy': 'dd.MM.y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd.M.y G, HH:mm:ss',
    'Mdy': 'dd.MM.y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd.M.y G, HH:mm',
    'Mdy': 'dd.MM.y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd.MM.y G, HH:mm',
    'ahm': 'dd.MM.y, HH:mm–HH:mm',
    '_': 'dd.MM.y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_CK = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_CM = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_CX = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_CY = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_DE = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_DG = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_DK = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH.mm.ss zzzz',
    'Mdy': 'dd/MM/y, HH.mm.ss zzzz',
    '_': 'HH.mm.ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH.mm.ss z',
    'Mdy': 'dd/MM/y, HH.mm.ss z',
    '_': 'HH.mm.ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH.mm.ss',
    'Mdy': 'dd/MM/y, HH.mm.ss',
    '_': 'HH.mm.ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH.mm',
    'Mdy': 'dd/MM/y, HH.mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH.mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH.mm.ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH.mm.ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH.mm.ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH.mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH.mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_DM = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_ER = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_FI = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, H.mm.ss zzzz',
    'Mdy': 'dd/MM/y, H.mm.ss zzzz',
    '_': 'H.mm.ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, H.mm.ss z',
    'Mdy': 'dd/MM/y, H.mm.ss z',
    '_': 'H.mm.ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, H.mm.ss',
    'Mdy': 'dd/MM/y, H.mm.ss',
    '_': 'H.mm.ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, H.mm',
    'Mdy': 'dd/MM/y, H.mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'H.mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' H.mm.ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' H.mm.ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, H.mm.ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, H.mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, H.mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_FJ = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_FK = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_FM = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_GD = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_GG = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_GH = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_GI = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_GM = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_GU = dateIntervalSymbols.DateIntervalSymbols_en;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_GY = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_HK = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'd/M/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'd/M/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'd/M/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'd/M/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'd/M/y G, h:mm a',
    'a': 'd/M/y, h:mm a – h:mm a',
    'hm': 'd/M/y, h:mm – h:mm a',
    '_': 'd/M/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_IL = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, H:mm:ss zzzz',
    'Mdy': 'dd/MM/y, H:mm:ss zzzz',
    '_': 'H:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, H:mm:ss z',
    'Mdy': 'dd/MM/y, H:mm:ss z',
    '_': 'H:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, H:mm:ss',
    'Mdy': 'dd/MM/y, H:mm:ss',
    '_': 'H:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, H:mm',
    'Mdy': 'dd/MM/y, H:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'H:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' H:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' H:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, H:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, H:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, H:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_IM = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_IO = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_JE = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_JM = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_KE = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_KI = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_KN = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_KY = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_LC = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_LR = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_LS = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_MG = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_MH = dateIntervalSymbols.DateIntervalSymbols_en;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_MO = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_MP = dateIntervalSymbols.DateIntervalSymbols_en;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_MS = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_MT = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    'y': 'd MMMM y – d MMMM y',
    '_': 'dd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    'y': 'd MMM y – d MMM y',
    '_': 'dd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'dd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_MU = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_MV = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    'y': 'EEEE, d MMMM y – EEEE, d MMMM y',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    'Mdy': 'dd/MM/y – dd/MM/y',
    '_': 'dd-MM-y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/yy G – dd/MM/yy G',
    'Mdy': 'dd/MM/yy – dd/MM/yy',
    '_': 'd-M-yy'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd-MM-y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd/M/yy G, HH:mm',
    'ahm': 'dd/MM/yy HH:mm–HH:mm',
    '_': 'd-M-yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_MW = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_MY = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_NA = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_NF = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_NG = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_NL = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_NR = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_NU = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_NZ = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'd/MM/y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/yy G – dd/MM/yy G',
    '_': 'd/MM/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd/MM/y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'd/MM/yy G, h:mm a',
    'a': 'd/MM/yy, h:mm a – h:mm a',
    'hm': 'd/MM/yy, h:mm – h:mm a',
    '_': 'd/MM/yy, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_PG = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_PH = dateIntervalSymbols.DateIntervalSymbols_en;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_PK = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    'y': 'd MMM y – d MMM y',
    '_': 'dd-MMM-y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd-MMM-y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_PN = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_PR = dateIntervalSymbols.DateIntervalSymbols_en;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_PW = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_RW = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_SB = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_SC = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_SD = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_SE = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    'Mdy': 'dd/MM/y – dd/MM/y',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'y-MM-dd, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'y-MM-dd, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'y-MM-dd, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'y-MM-dd, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'y-MM-dd, HH:mm–HH:mm',
    '_': 'y-MM-dd, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_SH = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_SI = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_SL = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_SS = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_SX = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_SZ = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_TC = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_TK = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_TO = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_TT = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_TV = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_TZ = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_UG = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_UM = dateIntervalSymbols.DateIntervalSymbols_en;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_US_POSIX = dateIntervalSymbols.DateIntervalSymbols_en;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_VC = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_VG = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_VI = dateIntervalSymbols.DateIntervalSymbols_en;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_VU = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_WS = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_XA = {
  FULL_DATE: {
    'G': '[EEEE, MMMM d, y G – EEEE, MMMM d, y G \'one\' \'two\' \'three\' \'four\']',
    'Md': '[EEEE, MMMM d – EEEE, MMMM d, y \'one\' \'two\' \'three\']',
    'y': '[EEEE, MMMM d, y – EEEE, MMMM d, y \'one\' \'two\' \'three\']',
    '_': '[EEEE, MMMM d, y \'one\' \'two\' \'three\']'
  },
  LONG_DATE: {
    'G': '[MMMM d, y G – MMMM d, y G \'one\' \'two\' \'three\']',
    'M': '[MMMM d – MMMM d, y \'one\' \'two\' \'three\']',
    'd': '[MMMM d – d, y \'one\' \'two\']',
    'y': '[MMMM d, y – MMMM d, y \'one\' \'two\' \'three\']',
    '_': '[MMMM d, y \'one\' \'two\']'
  },
  MEDIUM_DATE: {
    'G': '[MMM d, y G – MMM d, y G \'one\' \'two\' \'three\']',
    'M': '[MMM d – MMM d, y \'one\' \'two\' \'three\']',
    'd': '[MMM d – d, y \'one\' \'two\']',
    'y': '[MMM d, y – MMM d, y \'one\' \'two\' \'three\']',
    '_': '[MMM d, y \'one\' \'two\']'
  },
  SHORT_DATE: {
    'G': '[M/d/yy G – M/d/yy G \'one\' \'two\' \'three\']',
    'Mdy': '[M/d/yy – M/d/yy \'one\' \'two\']',
    '_': '[M/d/yy \'one\']'
  },
  FULL_TIME: {
    'G': '[M/d/y G \'one\' \'two\'], [h:mm:ss a zzzz \'one\' \'two\']',
    'Mdy': '[M/d/y \'one\'], [h:mm:ss a zzzz \'one\' \'two\']',
    '_': '[h:mm:ss a zzzz \'one\' \'two\']'
  },
  LONG_TIME: {
    'G': '[M/d/y G \'one\' \'two\'], [h:mm:ss a z \'one\' \'two\']',
    'Mdy': '[M/d/y \'one\'], [h:mm:ss a z \'one\' \'two\']',
    '_': '[h:mm:ss a z \'one\' \'two\']'
  },
  MEDIUM_TIME: {
    'G': '[M/d/y G \'one\' \'two\'], [h:mm:ss a \'one\' \'two\']',
    'Mdy': '[M/d/y \'one\'], [h:mm:ss a \'one\' \'two\']',
    '_': '[h:mm:ss a \'one\' \'two\']'
  },
  SHORT_TIME: {
    'G': '[M/d/y G \'one\' \'two\'], [H:mm]',
    'Mdy': '[M/d/y \'one\'], [H:mm]',
    'ahm': '[HH:mm – HH:mm \'one\' \'two\']',
    '_': '[H:mm]'
  },
  FULL_DATETIME: {
    '_': '[[EEEE, MMMM d, y \'one\' \'two\' \'three\'] \'åţ\' [h:mm:ss a zzzz \'one\' \'two\'] \'one\' \'two\']'
  },
  LONG_DATETIME: {
    '_': '[[MMMM d, y \'one\' \'two\'] \'åţ\' [h:mm:ss a z \'one\' \'two\'] \'one\' \'two\']'
  },
  MEDIUM_DATETIME: {
    '_': '[MMM d, y \'one\' \'two\'], [h:mm:ss a \'one\' \'two\']'
  },
  SHORT_DATETIME: {
    'G': '[M/d/yy G \'one\' \'two\'], [H:mm]',
    'ahm': '[[M/d/yy \'one\'], [HH:mm – HH:mm \'one\' \'two\'] \'one\' \'two\']',
    '_': '[M/d/yy \'one\'], [H:mm]'
  },
  FALLBACK: '[{0} – {1} \'one\' \'two\']'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_ZM = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'at\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'at\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_en_ZW = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    'y': 'EEEE, d MMMM y – EEEE, d MMMM y',
    '_': 'EEEE, dd MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    'y': 'd MMMM y – d MMMM y',
    '_': 'dd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    'y': 'd MMM y – d MMM y',
    '_': 'dd MMM,y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    'Mdy': 'dd/MM/y – dd/MM/y',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'd/M/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'd/M/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'd/M/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'd/M/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, dd MMMM y \'at\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'dd MMMM y \'at\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd MMM,y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd/M/y G, HH:mm',
    'ahm': 'd/M/y, HH:mm–HH:mm',
    '_': 'd/M/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_eo = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d-\'a\' \'de\' MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'y-MMMM-dd'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'y-MMM-dd'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Mdy': 'yy-MM-dd – yy-MM-dd',
    '_': 'yy-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd H-\'a\' \'horo\' \'kaj\' m:ss zzzz',
    'Mdy': 'y-M-d H-\'a\' \'horo\' \'kaj\' m:ss zzzz',
    '_': 'H-\'a\' \'horo\' \'kaj\' m:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd H-\'a\' \'horo\' \'kaj\' m:ss z',
    'Mdy': 'y-M-d H-\'a\' \'horo\' \'kaj\' m:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'y-M-d HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'y-M-d HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d-\'a\' \'de\' MMMM y H-\'a\' \'horo\' \'kaj\' m:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'y-MMMM-dd HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'y-MMM-dd HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd HH:mm',
    'ahm': 'yy-MM-dd HH:mm–HH:mm',
    '_': 'yy-MM-dd HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_eo_001 = DateIntervalSymbols_eo;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_es_AR = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    'y': 'EEEE, d \'de\' MMMM \'de\' y – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM \'de\' y G – d MMMM \'de\' y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    'y': 'd \'de\' MMMM \'de\' y – d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM \'de\' y G – d MMM \'de\' y G',
    'M': 'd \'de\' MMM \'al\' d \'de\' MMM \'de\' y',
    'd': 'd – d \'de\' MMM \'de\' y',
    'y': 'd \'de\' MMM \'de\' y \'al\' d \'de\' MMM \'de\' y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/yy GGGGG – dd/MM/yy GGGGG',
    'Mdy': 'dd/MM/yy – dd/MM/yy',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'd/M/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss z',
    'Mdy': 'd/M/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss',
    'Mdy': 'd/M/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, HH:mm',
    'Mdy': 'd/M/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y, HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y, HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd/M/yy GGGGG, HH:mm',
    'ahm': 'd/M/yy HH:mm–HH:mm',
    '_': 'd/M/yy, HH:mm'
  },
  FALLBACK: '{0} a el {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_es_BO = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM \'de\' y G – d MMMM \'de\' y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM \'de\' y G – d MMM \'de\' y G',
    'M': 'd \'de\' MMM – d \'de\' MMM \'de\' y',
    'd': 'd – d \'de\' MMM \'de\' y',
    'y': 'd \'de\' MMM \'de\' y – d \'de\' MMM \'de\' y',
    '_': 'd MMM \'de\' y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/yy GGGGG – dd/MM/yy GGGGG',
    'Mdy': 'd/M/yy–d/M/yy',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'd/M/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss z',
    'Mdy': 'd/M/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss',
    'Mdy': 'd/M/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, HH:mm',
    'Mdy': 'd/M/y, HH:mm',
    'ahm': 'H:mm–H:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y, HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y, HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM \'de\' y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd/M/yy GGGGG, HH:mm',
    'ahm': 'd/M/yy H:mm–H:mm',
    '_': 'd/M/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_es_BR = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM \'de\' y G – d MMMM \'de\' y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM \'de\' y G – d MMM \'de\' y G',
    'M': 'd \'de\' MMM – d \'de\' MMM \'de\' y',
    'd': 'd – d \'de\' MMM \'de\' y',
    'y': 'd \'de\' MMM \'de\' y – d \'de\' MMM \'de\' y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/yy GGGGG – dd/MM/yy GGGGG',
    'Mdy': 'd/M/yy–d/M/yy',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'd/M/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss z',
    'Mdy': 'd/M/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss',
    'Mdy': 'd/M/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, HH:mm',
    'Mdy': 'd/M/y, HH:mm',
    'ahm': 'H:mm–H:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y, HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y, HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd/M/yy GGGGG, HH:mm',
    'ahm': 'd/M/yy H:mm–H:mm',
    '_': 'd/M/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_es_BZ = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM \'de\' y G – d MMMM \'de\' y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM \'de\' y G – d MMM \'de\' y G',
    'M': 'd \'de\' MMM – d \'de\' MMM \'de\' y',
    'd': 'd – d \'de\' MMM \'de\' y',
    'y': 'd \'de\' MMM \'de\' y – d \'de\' MMM \'de\' y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/yy GGGGG – dd/MM/yy GGGGG',
    'Mdy': 'd/M/yy–d/M/yy',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'd/M/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss z',
    'Mdy': 'd/M/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss',
    'Mdy': 'd/M/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, HH:mm',
    'Mdy': 'd/M/y, HH:mm',
    'ahm': 'H:mm–H:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y, HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y, HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd/M/yy GGGGG, HH:mm',
    'ahm': 'd/M/yy H:mm–H:mm',
    '_': 'd/M/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_es_CL = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    'y': 'EEEE, d \'de\' MMMM \'de\' y – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM \'de\' y G – d MMMM \'de\' y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    'y': 'd \'de\' MMMM \'de\' y – d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'dd/MM/y GGGGG – dd/MM/y GGGGG',
    'Mdy': 'dd-MM-y – dd-MM-y',
    '_': 'dd-MM-y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/yy GGGGG – dd/MM/yy GGGGG',
    'Mdy': 'dd-MM-yy – dd-MM-yy',
    '_': 'dd-MM-yy'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'dd-MM-y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss z',
    'Mdy': 'dd-MM-y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss',
    'Mdy': 'dd-MM-y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, HH:mm',
    'Mdy': 'dd-MM-y, HH:mm',
    'ahm': 'H:mm–H:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y, HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y, HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd-MM-y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/yy GGGGG, HH:mm',
    'ahm': 'dd-MM-yy H:mm–H:mm',
    '_': 'dd-MM-yy, HH:mm'
  },
  FALLBACK: '{0} a el {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_es_CO = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    'y': 'EEEE, d \'de\' MMMM \'de\' y – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM \'de\' y G – d MMMM \'de\' y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    'y': 'd \'de\' MMMM \'de\' y – d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'dd/MM/y GGGGG – dd/MM/y GGGGG',
    'My': 'd/MM/y \'al\' d/MM/y',
    'd': 'd/MM/y \'a\' d/MM/y',
    '_': 'd/MM/y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/yy GGGGG – dd/MM/yy GGGGG',
    'My': 'd/MM/yy \'al\' d/MM/yy',
    'd': 'd/MM/yy \'a\' d/MM/yy',
    '_': 'd/MM/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, h:mm:ss a zzzz',
    'Mdy': 'd/M/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, h:mm:ss a z',
    'Mdy': 'd/M/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, h:mm:ss a',
    'Mdy': 'd/M/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, h:mm a',
    'Mdy': 'd/M/y, h:mm a',
    'a': 'h:mm a \'a\' h:mm a',
    'hm': 'h:mm \'a\' h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y, h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y, h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd/MM/y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'd/MM/yy GGGGG, h:mm a',
    'a': 'd/MM/yy, h:mm a \'a\' h:mm a',
    'hm': 'd/MM/yy, h:mm \'a\' h:mm a',
    '_': 'd/MM/yy, h:mm a'
  },
  FALLBACK: '{0} ‘al’ {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_es_CR = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM \'de\' y G – d MMMM \'de\' y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM \'de\' y G – d MMM \'de\' y G',
    'M': 'd \'de\' MMM – d \'de\' MMM \'de\' y',
    'd': 'd – d \'de\' MMM \'de\' y',
    'y': 'd \'de\' MMM \'de\' y – d \'de\' MMM \'de\' y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/yy GGGGG – dd/MM/yy GGGGG',
    'Mdy': 'd/M/yy–d/M/yy',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'd/M/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss z',
    'Mdy': 'd/M/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss',
    'Mdy': 'd/M/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, HH:mm',
    'Mdy': 'd/M/y, HH:mm',
    'ahm': 'H:mm–H:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y, HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y, HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd/M/yy GGGGG, HH:mm',
    'ahm': 'd/M/yy H:mm–H:mm',
    '_': 'd/M/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_es_CU = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM \'de\' y G – d MMMM \'de\' y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM \'de\' y G – d MMM \'de\' y G',
    'M': 'd \'de\' MMM – d \'de\' MMM \'de\' y',
    'd': 'd – d \'de\' MMM \'de\' y',
    'y': 'd \'de\' MMM \'de\' y – d \'de\' MMM \'de\' y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/yy GGGGG – dd/MM/yy GGGGG',
    'Mdy': 'd/M/yy–d/M/yy',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'd/M/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss z',
    'Mdy': 'd/M/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss',
    'Mdy': 'd/M/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, HH:mm',
    'Mdy': 'd/M/y, HH:mm',
    'ahm': 'H:mm–H:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y, HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y, HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd/M/yy GGGGG, HH:mm',
    'ahm': 'd/M/yy H:mm–H:mm',
    '_': 'd/M/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_es_DO = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM \'de\' y G – d MMMM \'de\' y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM \'de\' y G – d MMM \'de\' y G',
    'M': 'd \'de\' MMM – d \'de\' MMM \'de\' y',
    'd': 'd – d \'de\' MMM \'de\' y',
    'y': 'd \'de\' MMM \'de\' y – d \'de\' MMM \'de\' y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/yy GGGGG – dd/MM/yy GGGGG',
    'Mdy': 'd/M/yy–d/M/yy',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, h:mm:ss a zzzz',
    'Mdy': 'd/M/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, h:mm:ss a z',
    'Mdy': 'd/M/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, h:mm:ss a',
    'Mdy': 'd/M/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, h:mm a',
    'Mdy': 'd/M/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y, h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y, h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'd/M/yy GGGGG, h:mm a',
    'a': 'd/M/yy h:mm a – h:mm a',
    'hm': 'd/M/yy h:mm – h:mm a',
    '_': 'd/M/yy, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_es_EA = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd/M/yy G – d/M/yy G',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, H:mm:ss zzzz',
    'Mdy': 'd/M/y, H:mm:ss zzzz',
    '_': 'H:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, H:mm:ss z',
    'Mdy': 'd/M/y, H:mm:ss z',
    '_': 'H:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, H:mm:ss',
    'Mdy': 'd/M/y, H:mm:ss',
    '_': 'H:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, H:mm',
    'Mdy': 'd/M/y, H:mm',
    'ahm': 'H:mm–H:mm',
    '_': 'H:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y, H:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y, H:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, H:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd/M/yy GGGGG, H:mm',
    'ahm': 'd/M/yy, H:mm–H:mm',
    '_': 'd/M/yy, H:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_es_EC = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM \'de\' y G – d MMMM \'de\' y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM \'de\' y G – d MMM \'de\' y G',
    'M': 'd \'de\' MMM – d \'de\' MMM \'de\' y',
    'd': 'd – d \'de\' MMM \'de\' y',
    'y': 'd \'de\' MMM \'de\' y – d \'de\' MMM \'de\' y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/yy GGGGG – dd/MM/yy GGGGG',
    'Mdy': 'd/M/yy–d/M/yy',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'd/M/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss z',
    'Mdy': 'd/M/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss',
    'Mdy': 'd/M/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, HH:mm',
    'Mdy': 'd/M/y, HH:mm',
    'ahm': 'H:mm–H:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y, HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y, HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd/M/yy GGGGG, HH:mm',
    'ahm': 'd/M/yy H:mm–H:mm',
    '_': 'd/M/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_es_GQ = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd/M/yy G – d/M/yy G',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, H:mm:ss zzzz',
    'Mdy': 'd/M/y, H:mm:ss zzzz',
    '_': 'H:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, H:mm:ss z',
    'Mdy': 'd/M/y, H:mm:ss z',
    '_': 'H:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, H:mm:ss',
    'Mdy': 'd/M/y, H:mm:ss',
    '_': 'H:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, H:mm',
    'Mdy': 'd/M/y, H:mm',
    'ahm': 'H:mm–H:mm',
    '_': 'H:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y, H:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y, H:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, H:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd/M/yy GGGGG, H:mm',
    'ahm': 'd/M/yy, H:mm–H:mm',
    '_': 'd/M/yy, H:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_es_GT = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM \'de\' y G – d MMMM \'de\' y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'dd/MM/y GGGGG – dd/MM/y GGGGG',
    '_': 'd/MM/y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/yy GGGGG – dd/MM/yy GGGGG',
    '_': 'd/MM/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'd/M/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss z',
    'Mdy': 'd/M/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss',
    'Mdy': 'd/M/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, HH:mm',
    'Mdy': 'd/M/y, HH:mm',
    'ahm': 'H:mm–H:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y, HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y, HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd/MM/y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd/MM/yy GGGGG, HH:mm',
    'ahm': 'd/MM/yy H:mm–H:mm',
    '_': 'd/MM/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_es_HN = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    'y': 'EEEE, d \'de\' MMMM \'de\' y – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE dd \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM \'de\' y G – d MMMM \'de\' y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    'y': 'd \'de\' MMMM \'de\' y – d \'de\' MMMM \'de\' y',
    '_': 'dd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM \'de\' y G – d MMM \'de\' y G',
    'M': 'd \'de\' MMM – d \'de\' MMM \'de\' y',
    'd': 'd – d \'de\' MMM \'de\' y',
    'y': 'd \'de\' MMM \'de\' y – d \'de\' MMM \'de\' y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/yy GGGGG – dd/MM/yy GGGGG',
    'Mdy': 'd/M/yy–d/M/yy',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'd/M/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss z',
    'Mdy': 'd/M/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss',
    'Mdy': 'd/M/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, HH:mm',
    'Mdy': 'd/M/y, HH:mm',
    'ahm': 'H:mm–H:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE dd \'de\' MMMM \'de\' y, HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'dd \'de\' MMMM \'de\' y, HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd/M/yy GGGGG, HH:mm',
    'ahm': 'd/M/yy H:mm–H:mm',
    '_': 'd/M/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_es_IC = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd/M/yy G – d/M/yy G',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, H:mm:ss zzzz',
    'Mdy': 'd/M/y, H:mm:ss zzzz',
    '_': 'H:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, H:mm:ss z',
    'Mdy': 'd/M/y, H:mm:ss z',
    '_': 'H:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, H:mm:ss',
    'Mdy': 'd/M/y, H:mm:ss',
    '_': 'H:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, H:mm',
    'Mdy': 'd/M/y, H:mm',
    'ahm': 'H:mm–H:mm',
    '_': 'H:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y, H:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y, H:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, H:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd/M/yy GGGGG, H:mm',
    'ahm': 'd/M/yy, H:mm–H:mm',
    '_': 'd/M/yy, H:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_es_NI = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM \'de\' y G – d MMMM \'de\' y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM \'de\' y G – d MMM \'de\' y G',
    'M': 'd \'de\' MMM – d \'de\' MMM \'de\' y',
    'd': 'd – d \'de\' MMM \'de\' y',
    'y': 'd \'de\' MMM \'de\' y – d \'de\' MMM \'de\' y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/yy GGGGG – dd/MM/yy GGGGG',
    'Mdy': 'd/M/yy–d/M/yy',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'd/M/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss z',
    'Mdy': 'd/M/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss',
    'Mdy': 'd/M/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, HH:mm',
    'Mdy': 'd/M/y, HH:mm',
    'ahm': 'H:mm–H:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y, HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y, HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd/M/yy GGGGG, HH:mm',
    'ahm': 'd/M/yy H:mm–H:mm',
    '_': 'd/M/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_es_PA = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM \'de\' y G – d MMMM \'de\' y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'dd/MM/y GGGGG – dd/MM/y GGGGG',
    'Mdy': 'd/M/y–d/M/y',
    '_': 'MM/dd/y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/yy GGGGG – dd/MM/yy GGGGG',
    'Mdy': 'd/M/yy–d/M/yy',
    '_': 'MM/dd/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, h:mm:ss a zzzz',
    'Mdy': 'MM/dd/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, h:mm:ss a z',
    'Mdy': 'MM/dd/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, h:mm:ss a',
    'Mdy': 'MM/dd/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, h:mm a',
    'Mdy': 'MM/dd/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y, h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y, h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'MM/dd/y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/yy GGGGG, h:mm a',
    'a': 'MM/dd/yy h:mm a – h:mm a',
    'hm': 'MM/dd/yy h:mm – h:mm a',
    '_': 'MM/dd/yy, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_es_PE = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM \'de\' y G – d MMMM \'de\' y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM \'de\' y G – d MMM \'de\' y G',
    'M': 'd \'de\' MMM – d \'de\' MMM \'de\' y',
    'd': 'd – d \'de\' MMM \'de\' y',
    'y': 'd \'de\' MMM \'de\' y – d \'de\' MMM \'de\' y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/yy GGGGG – dd/MM/yy GGGGG',
    'Mdy': 'd/M/yy–d/M/yy',
    '_': 'd/MM/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'd/M/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss z',
    'Mdy': 'd/M/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss',
    'Mdy': 'd/M/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, HH:mm',
    'Mdy': 'd/M/y, HH:mm',
    'ahm': 'H:mm–H:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y, HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y, HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd/MM/yy GGGGG, HH:mm',
    'ahm': 'd/MM/yy H:mm–H:mm',
    '_': 'd/MM/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_es_PH = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd/M/yy G – d/M/yy G',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, h:mm:ss a zzzz',
    'Mdy': 'd/M/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, h:mm:ss a z',
    'Mdy': 'd/M/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, h:mm:ss a',
    'Mdy': 'd/M/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, h:mm a',
    'Mdy': 'd/M/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y, h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y, h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'd/M/yy GGGGG, h:mm a',
    'a': 'd/M/yy, h:mm a – h:mm a',
    'hm': 'd/M/yy, h:mm – h:mm a',
    '_': 'd/M/yy, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_es_PR = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM \'de\' y G – d MMMM \'de\' y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'dd/MM/y GGGGG – dd/MM/y GGGGG',
    'Mdy': 'd/M/y–d/M/y',
    '_': 'MM/dd/y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/yy GGGGG – dd/MM/yy GGGGG',
    'Mdy': 'd/M/yy–d/M/yy',
    '_': 'MM/dd/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, h:mm:ss a zzzz',
    'Mdy': 'MM/dd/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, h:mm:ss a z',
    'Mdy': 'MM/dd/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, h:mm:ss a',
    'Mdy': 'MM/dd/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, h:mm a',
    'Mdy': 'MM/dd/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y, h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y, h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'MM/dd/y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/yy GGGGG, h:mm a',
    'a': 'MM/dd/yy h:mm a – h:mm a',
    'hm': 'MM/dd/yy h:mm – h:mm a',
    '_': 'MM/dd/yy, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_es_PY = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM \'de\' y G – d MMMM \'de\' y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM \'de\' y G – d MMM \'de\' y G',
    'M': 'd \'de\' MMM \'al\' d \'de\' MMM \'de\' y',
    'd': 'd – d \'de\' MMM \'de\' y',
    'y': 'd \'de\' MMM \'de\' y – d \'de\' MMM \'de\' y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/yy GGGGG – dd/MM/yy GGGGG',
    'Mdy': 'd/M/yy \'al\' d/M/yy',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'd/M/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss z',
    'Mdy': 'd/M/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss',
    'Mdy': 'd/M/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, HH:mm',
    'Mdy': 'd/M/y, HH:mm',
    'ahm': 'H:mm–H:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y, HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y, HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd/M/yy GGGGG, HH:mm',
    'ahm': 'd/M/yy H:mm–H:mm',
    '_': 'd/M/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_es_SV = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM \'de\' y G – d MMMM \'de\' y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM \'de\' y G – d MMM \'de\' y G',
    'M': 'd \'de\' MMM – d \'de\' MMM \'de\' y',
    'd': 'd – d \'de\' MMM \'de\' y',
    'y': 'd \'de\' MMM \'de\' y – d \'de\' MMM \'de\' y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/yy GGGGG – dd/MM/yy GGGGG',
    'Mdy': 'd/M/yy–d/M/yy',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'd/M/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss z',
    'Mdy': 'd/M/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss',
    'Mdy': 'd/M/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, HH:mm',
    'Mdy': 'd/M/y, HH:mm',
    'ahm': 'H:mm–H:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y, HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y, HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd/M/yy GGGGG, HH:mm',
    'ahm': 'd/M/yy H:mm–H:mm',
    '_': 'd/M/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_es_UY = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM \'de\' y G – d MMMM \'de\' y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM \'de\' y G – d MMM \'de\' y G',
    'M': 'd \'de\' MMM – d \'de\' MMM \'de\' y',
    'd': 'd – d \'de\' MMM \'de\' y',
    'y': 'd \'de\' MMM \'de\' y – d \'de\' MMM \'de\' y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/yy GGGGG – dd/MM/yy GGGGG',
    'Mdy': 'd/M/yy–d/M/yy',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'd/M/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss z',
    'Mdy': 'd/M/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss',
    'Mdy': 'd/M/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, HH:mm',
    'Mdy': 'd/M/y, HH:mm',
    'ahm': 'H:mm–H:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y, HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y, HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd/M/yy GGGGG, HH:mm',
    'ahm': 'd/M/yy H:mm–H:mm',
    '_': 'd/M/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_es_VE = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM \'de\' y G – d MMMM \'de\' y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM \'de\' y G – d MMM \'de\' y G',
    'M': 'd \'de\' MMM – d \'de\' MMM \'de\' y',
    'd': 'd – d \'de\' MMM \'de\' y',
    'y': 'd \'de\' MMM \'de\' y – d \'de\' MMM \'de\' y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/yy GGGGG – dd/MM/yy GGGGG',
    'Mdy': 'd/M/yy–d/M/yy',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, h:mm:ss a zzzz',
    'Mdy': 'd/M/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, h:mm:ss a z',
    'Mdy': 'd/M/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, h:mm:ss a',
    'Mdy': 'd/M/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, h:mm a',
    'Mdy': 'd/M/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y, h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y, h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'd/M/yy GGGGG, h:mm a',
    'a': 'd/M/yy h:mm a – h:mm a',
    'hm': 'd/M/yy h:mm – h:mm a',
    '_': 'd/M/yy, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_et_EE = dateIntervalSymbols.DateIntervalSymbols_et;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_eu_ES = dateIntervalSymbols.DateIntervalSymbols_eu;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ewo = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'd/M/y HH:mm–HH:mm',
    '_': 'd/M/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ewo_CM = DateIntervalSymbols_ewo;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fa_AF = {
  FULL_DATE: {
    'G': 'EEEE d MMMM y G تا EEEE d MMMM y G',
    'Md': 'EEEE d LLLL تا EEEE d MMMM y',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G تا d MMMM y G',
    'M': 'd LLLL تا d MMMM y',
    'd': 'd تا d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G تا d MMM y G',
    'M': 'd LLL تا d MMM y',
    'd': 'd تا d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'y/M/d GGGGG تا y/M/d GGGGG',
    '_': 'y/M/d'
  },
  FULL_TIME: {
    'G': 'y/M/d GGGGG, H:mm:ss zzzz',
    'Mdy': 'M/d/y, H:mm:ss zzzz',
    '_': 'H:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'y/M/d GGGGG, H:mm:ss z',
    'Mdy': 'M/d/y, H:mm:ss z',
    '_': 'H:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'y/M/d GGGGG, HH:mm:ss',
    'Mdy': 'M/d/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'y/M/d GGGGG, HH:mm',
    'Mdy': 'M/d/y, HH:mm',
    'ahm': 'H:mm تا H:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y ساعت H:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y ساعت H:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y، HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'y/M/d GGGGG, HH:mm',
    'ahm': 'M/d/y،‏ H:mm تا H:mm',
    '_': 'y/M/d, HH:mm'
  },
  FALLBACK: '{0} تا {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fa_IR = dateIntervalSymbols.DateIntervalSymbols_fa;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ff = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM, y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'd/M/y HH:mm–HH:mm',
    '_': 'd/M/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ff_Adlm = {
  FULL_DATE: {
    'G': 'EEEE d MMMM⹁ y G – EEEE d MMMM⹁ y G',
    'Md': 'EEEE d MMMM – EEEE d MMMM⹁ y',
    'y': 'EEEE d MMMM⹁ y – EEEE d MMMM⹁ y',
    '_': 'EEEE d MMMM⹁ y'
  },
  LONG_DATE: {
    'G': 'd MMMM⹁ y G – d MMMM⹁ y G',
    'M': 'd MMMM – d MMMM⹁ y',
    'd': 'd – d MMMM⹁ y',
    'y': 'd MMMM⹁ y – d MMMM⹁ y',
    '_': 'd MMMM⹁ y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM⹁ y G – d MMM⹁ y G',
    'M': 'd MMM – d MMM⹁ y',
    'd': 'd – d MMM⹁ y',
    'y': 'd MMM⹁ y – d MMM⹁ y',
    '_': 'd MMM⹁ y'
  },
  SHORT_DATE: {
    'G': 'd-M-y GGGGG – d-M-y GGGGG',
    'Mdy': 'd-M-y – d-M-y',
    '_': 'd-M-y'
  },
  FULL_TIME: {
    'G': 'd-M-y GGGGG HH:mm:ss zzzz',
    'Mdy': 'd-M-y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd-M-y GGGGG HH:mm:ss z',
    'Mdy': 'd-M-y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd-M-y GGGGG HH:mm:ss',
    'Mdy': 'd-M-y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd-M-y GGGGG HH:mm',
    'Mdy': 'd-M-y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM⹁ y 𞤉 HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM⹁ y 𞤉 HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM⹁ y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd-M-y GGGGG HH:mm',
    'ahm': 'd-M-y HH:mm–HH:mm',
    '_': 'd-M-y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ff_Adlm_BF = {
  FULL_DATE: {
    'G': 'EEEE d MMMM⹁ y G – EEEE d MMMM⹁ y G',
    'Md': 'EEEE d MMMM – EEEE d MMMM⹁ y',
    'y': 'EEEE d MMMM⹁ y – EEEE d MMMM⹁ y',
    '_': 'EEEE d MMMM⹁ y'
  },
  LONG_DATE: {
    'G': 'd MMMM⹁ y G – d MMMM⹁ y G',
    'M': 'd MMMM – d MMMM⹁ y',
    'd': 'd – d MMMM⹁ y',
    'y': 'd MMMM⹁ y – d MMMM⹁ y',
    '_': 'd MMMM⹁ y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM⹁ y G – d MMM⹁ y G',
    'M': 'd MMM – d MMM⹁ y',
    'd': 'd – d MMM⹁ y',
    'y': 'd MMM⹁ y – d MMM⹁ y',
    '_': 'd MMM⹁ y'
  },
  SHORT_DATE: {
    'G': 'd-M-y GGGGG – d-M-y GGGGG',
    'Mdy': 'd-M-y – d-M-y',
    '_': 'd-M-y'
  },
  FULL_TIME: {
    'G': 'd-M-y GGGGG HH:mm:ss zzzz',
    'Mdy': 'd-M-y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd-M-y GGGGG HH:mm:ss z',
    'Mdy': 'd-M-y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd-M-y GGGGG HH:mm:ss',
    'Mdy': 'd-M-y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd-M-y GGGGG HH:mm',
    'Mdy': 'd-M-y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM⹁ y 𞤉 HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM⹁ y 𞤉 HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM⹁ y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd-M-y GGGGG HH:mm',
    'ahm': 'd-M-y HH:mm–HH:mm',
    '_': 'd-M-y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ff_Adlm_CM = {
  FULL_DATE: {
    'G': 'EEEE d MMMM⹁ y G – EEEE d MMMM⹁ y G',
    'Md': 'EEEE d MMMM – EEEE d MMMM⹁ y',
    'y': 'EEEE d MMMM⹁ y – EEEE d MMMM⹁ y',
    '_': 'EEEE d MMMM⹁ y'
  },
  LONG_DATE: {
    'G': 'd MMMM⹁ y G – d MMMM⹁ y G',
    'M': 'd MMMM – d MMMM⹁ y',
    'd': 'd – d MMMM⹁ y',
    'y': 'd MMMM⹁ y – d MMMM⹁ y',
    '_': 'd MMMM⹁ y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM⹁ y G – d MMM⹁ y G',
    'M': 'd MMM – d MMM⹁ y',
    'd': 'd – d MMM⹁ y',
    'y': 'd MMM⹁ y – d MMM⹁ y',
    '_': 'd MMM⹁ y'
  },
  SHORT_DATE: {
    'G': 'd-M-y GGGGG – d-M-y GGGGG',
    'Mdy': 'd-M-y – d-M-y',
    '_': 'd-M-y'
  },
  FULL_TIME: {
    'G': 'd-M-y GGGGG HH:mm:ss zzzz',
    'Mdy': 'd-M-y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd-M-y GGGGG HH:mm:ss z',
    'Mdy': 'd-M-y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd-M-y GGGGG HH:mm:ss',
    'Mdy': 'd-M-y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd-M-y GGGGG HH:mm',
    'Mdy': 'd-M-y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM⹁ y 𞤉 HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM⹁ y 𞤉 HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM⹁ y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd-M-y GGGGG HH:mm',
    'ahm': 'd-M-y HH:mm–HH:mm',
    '_': 'd-M-y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ff_Adlm_GH = {
  FULL_DATE: {
    'G': 'EEEE d MMMM⹁ y G – EEEE d MMMM⹁ y G',
    'Md': 'EEEE d MMMM – EEEE d MMMM⹁ y',
    'y': 'EEEE d MMMM⹁ y – EEEE d MMMM⹁ y',
    '_': 'EEEE d MMMM⹁ y'
  },
  LONG_DATE: {
    'G': 'd MMMM⹁ y G – d MMMM⹁ y G',
    'M': 'd MMMM – d MMMM⹁ y',
    'd': 'd – d MMMM⹁ y',
    'y': 'd MMMM⹁ y – d MMMM⹁ y',
    '_': 'd MMMM⹁ y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM⹁ y G – d MMM⹁ y G',
    'M': 'd MMM – d MMM⹁ y',
    'd': 'd – d MMM⹁ y',
    'y': 'd MMM⹁ y – d MMM⹁ y',
    '_': 'd MMM⹁ y'
  },
  SHORT_DATE: {
    'G': 'd-M-y GGGGG – d-M-y GGGGG',
    'Mdy': 'd-M-y – d-M-y',
    '_': 'd-M-y'
  },
  FULL_TIME: {
    'G': 'd-M-y GGGGG h:mm:ss a zzzz',
    'Mdy': 'd-M-y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd-M-y GGGGG h:mm:ss a z',
    'Mdy': 'd-M-y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd-M-y GGGGG h:mm:ss a',
    'Mdy': 'd-M-y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd-M-y GGGGG h:mm a',
    'Mdy': 'd-M-y h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM⹁ y 𞤉 h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM⹁ y 𞤉 h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM⹁ y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'd-M-y GGGGG h:mm a',
    'a': 'd-M-y h:mm a – h:mm a',
    'hm': 'd-M-y h:mm–h:mm a',
    '_': 'd-M-y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ff_Adlm_GM = {
  FULL_DATE: {
    'G': 'EEEE d MMMM⹁ y G – EEEE d MMMM⹁ y G',
    'Md': 'EEEE d MMMM – EEEE d MMMM⹁ y',
    'y': 'EEEE d MMMM⹁ y – EEEE d MMMM⹁ y',
    '_': 'EEEE d MMMM⹁ y'
  },
  LONG_DATE: {
    'G': 'd MMMM⹁ y G – d MMMM⹁ y G',
    'M': 'd MMMM – d MMMM⹁ y',
    'd': 'd – d MMMM⹁ y',
    'y': 'd MMMM⹁ y – d MMMM⹁ y',
    '_': 'd MMMM⹁ y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM⹁ y G – d MMM⹁ y G',
    'M': 'd MMM – d MMM⹁ y',
    'd': 'd – d MMM⹁ y',
    'y': 'd MMM⹁ y – d MMM⹁ y',
    '_': 'd MMM⹁ y'
  },
  SHORT_DATE: {
    'G': 'd-M-y GGGGG – d-M-y GGGGG',
    'Mdy': 'd-M-y – d-M-y',
    '_': 'd-M-y'
  },
  FULL_TIME: {
    'G': 'd-M-y GGGGG h:mm:ss a zzzz',
    'Mdy': 'd-M-y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd-M-y GGGGG h:mm:ss a z',
    'Mdy': 'd-M-y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd-M-y GGGGG h:mm:ss a',
    'Mdy': 'd-M-y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd-M-y GGGGG h:mm a',
    'Mdy': 'd-M-y h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM⹁ y 𞤉 h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM⹁ y 𞤉 h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM⹁ y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'd-M-y GGGGG h:mm a',
    'a': 'd-M-y h:mm a – h:mm a',
    'hm': 'd-M-y h:mm–h:mm a',
    '_': 'd-M-y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ff_Adlm_GN = {
  FULL_DATE: {
    'G': 'EEEE d MMMM⹁ y G – EEEE d MMMM⹁ y G',
    'Md': 'EEEE d MMMM – EEEE d MMMM⹁ y',
    'y': 'EEEE d MMMM⹁ y – EEEE d MMMM⹁ y',
    '_': 'EEEE d MMMM⹁ y'
  },
  LONG_DATE: {
    'G': 'd MMMM⹁ y G – d MMMM⹁ y G',
    'M': 'd MMMM – d MMMM⹁ y',
    'd': 'd – d MMMM⹁ y',
    'y': 'd MMMM⹁ y – d MMMM⹁ y',
    '_': 'd MMMM⹁ y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM⹁ y G – d MMM⹁ y G',
    'M': 'd MMM – d MMM⹁ y',
    'd': 'd – d MMM⹁ y',
    'y': 'd MMM⹁ y – d MMM⹁ y',
    '_': 'd MMM⹁ y'
  },
  SHORT_DATE: {
    'G': 'd-M-y GGGGG – d-M-y GGGGG',
    'Mdy': 'd-M-y – d-M-y',
    '_': 'd-M-y'
  },
  FULL_TIME: {
    'G': 'd-M-y GGGGG HH:mm:ss zzzz',
    'Mdy': 'd-M-y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd-M-y GGGGG HH:mm:ss z',
    'Mdy': 'd-M-y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd-M-y GGGGG HH:mm:ss',
    'Mdy': 'd-M-y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd-M-y GGGGG HH:mm',
    'Mdy': 'd-M-y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM⹁ y 𞤉 HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM⹁ y 𞤉 HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM⹁ y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd-M-y GGGGG HH:mm',
    'ahm': 'd-M-y HH:mm–HH:mm',
    '_': 'd-M-y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ff_Adlm_GW = {
  FULL_DATE: {
    'G': 'EEEE d MMMM⹁ y G – EEEE d MMMM⹁ y G',
    'Md': 'EEEE d MMMM – EEEE d MMMM⹁ y',
    'y': 'EEEE d MMMM⹁ y – EEEE d MMMM⹁ y',
    '_': 'EEEE d MMMM⹁ y'
  },
  LONG_DATE: {
    'G': 'd MMMM⹁ y G – d MMMM⹁ y G',
    'M': 'd MMMM – d MMMM⹁ y',
    'd': 'd – d MMMM⹁ y',
    'y': 'd MMMM⹁ y – d MMMM⹁ y',
    '_': 'd MMMM⹁ y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM⹁ y G – d MMM⹁ y G',
    'M': 'd MMM – d MMM⹁ y',
    'd': 'd – d MMM⹁ y',
    'y': 'd MMM⹁ y – d MMM⹁ y',
    '_': 'd MMM⹁ y'
  },
  SHORT_DATE: {
    'G': 'd-M-y GGGGG – d-M-y GGGGG',
    'Mdy': 'd-M-y – d-M-y',
    '_': 'd-M-y'
  },
  FULL_TIME: {
    'G': 'd-M-y GGGGG HH:mm:ss zzzz',
    'Mdy': 'd-M-y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd-M-y GGGGG HH:mm:ss z',
    'Mdy': 'd-M-y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd-M-y GGGGG HH:mm:ss',
    'Mdy': 'd-M-y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd-M-y GGGGG HH:mm',
    'Mdy': 'd-M-y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM⹁ y 𞤉 HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM⹁ y 𞤉 HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM⹁ y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd-M-y GGGGG HH:mm',
    'ahm': 'd-M-y HH:mm–HH:mm',
    '_': 'd-M-y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ff_Adlm_LR = {
  FULL_DATE: {
    'G': 'EEEE d MMMM⹁ y G – EEEE d MMMM⹁ y G',
    'Md': 'EEEE d MMMM – EEEE d MMMM⹁ y',
    'y': 'EEEE d MMMM⹁ y – EEEE d MMMM⹁ y',
    '_': 'EEEE d MMMM⹁ y'
  },
  LONG_DATE: {
    'G': 'd MMMM⹁ y G – d MMMM⹁ y G',
    'M': 'd MMMM – d MMMM⹁ y',
    'd': 'd – d MMMM⹁ y',
    'y': 'd MMMM⹁ y – d MMMM⹁ y',
    '_': 'd MMMM⹁ y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM⹁ y G – d MMM⹁ y G',
    'M': 'd MMM – d MMM⹁ y',
    'd': 'd – d MMM⹁ y',
    'y': 'd MMM⹁ y – d MMM⹁ y',
    '_': 'd MMM⹁ y'
  },
  SHORT_DATE: {
    'G': 'd-M-y GGGGG – d-M-y GGGGG',
    'Mdy': 'd-M-y – d-M-y',
    '_': 'd-M-y'
  },
  FULL_TIME: {
    'G': 'd-M-y GGGGG h:mm:ss a zzzz',
    'Mdy': 'd-M-y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd-M-y GGGGG h:mm:ss a z',
    'Mdy': 'd-M-y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd-M-y GGGGG h:mm:ss a',
    'Mdy': 'd-M-y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd-M-y GGGGG h:mm a',
    'Mdy': 'd-M-y h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM⹁ y 𞤉 h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM⹁ y 𞤉 h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM⹁ y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'd-M-y GGGGG h:mm a',
    'a': 'd-M-y h:mm a – h:mm a',
    'hm': 'd-M-y h:mm–h:mm a',
    '_': 'd-M-y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ff_Adlm_MR = {
  FULL_DATE: {
    'G': 'EEEE d MMMM⹁ y G – EEEE d MMMM⹁ y G',
    'Md': 'EEEE d MMMM – EEEE d MMMM⹁ y',
    'y': 'EEEE d MMMM⹁ y – EEEE d MMMM⹁ y',
    '_': 'EEEE d MMMM⹁ y'
  },
  LONG_DATE: {
    'G': 'd MMMM⹁ y G – d MMMM⹁ y G',
    'M': 'd MMMM – d MMMM⹁ y',
    'd': 'd – d MMMM⹁ y',
    'y': 'd MMMM⹁ y – d MMMM⹁ y',
    '_': 'd MMMM⹁ y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM⹁ y G – d MMM⹁ y G',
    'M': 'd MMM – d MMM⹁ y',
    'd': 'd – d MMM⹁ y',
    'y': 'd MMM⹁ y – d MMM⹁ y',
    '_': 'd MMM⹁ y'
  },
  SHORT_DATE: {
    'G': 'd-M-y GGGGG – d-M-y GGGGG',
    'Mdy': 'd-M-y – d-M-y',
    '_': 'd-M-y'
  },
  FULL_TIME: {
    'G': 'd-M-y GGGGG h:mm:ss a zzzz',
    'Mdy': 'd-M-y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd-M-y GGGGG h:mm:ss a z',
    'Mdy': 'd-M-y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd-M-y GGGGG h:mm:ss a',
    'Mdy': 'd-M-y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd-M-y GGGGG h:mm a',
    'Mdy': 'd-M-y h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM⹁ y 𞤉 h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM⹁ y 𞤉 h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM⹁ y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'd-M-y GGGGG h:mm a',
    'a': 'd-M-y h:mm a – h:mm a',
    'hm': 'd-M-y h:mm–h:mm a',
    '_': 'd-M-y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ff_Adlm_NE = {
  FULL_DATE: {
    'G': 'EEEE d MMMM⹁ y G – EEEE d MMMM⹁ y G',
    'Md': 'EEEE d MMMM – EEEE d MMMM⹁ y',
    'y': 'EEEE d MMMM⹁ y – EEEE d MMMM⹁ y',
    '_': 'EEEE d MMMM⹁ y'
  },
  LONG_DATE: {
    'G': 'd MMMM⹁ y G – d MMMM⹁ y G',
    'M': 'd MMMM – d MMMM⹁ y',
    'd': 'd – d MMMM⹁ y',
    'y': 'd MMMM⹁ y – d MMMM⹁ y',
    '_': 'd MMMM⹁ y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM⹁ y G – d MMM⹁ y G',
    'M': 'd MMM – d MMM⹁ y',
    'd': 'd – d MMM⹁ y',
    'y': 'd MMM⹁ y – d MMM⹁ y',
    '_': 'd MMM⹁ y'
  },
  SHORT_DATE: {
    'G': 'd-M-y GGGGG – d-M-y GGGGG',
    'Mdy': 'd-M-y – d-M-y',
    '_': 'd-M-y'
  },
  FULL_TIME: {
    'G': 'd-M-y GGGGG HH:mm:ss zzzz',
    'Mdy': 'd-M-y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd-M-y GGGGG HH:mm:ss z',
    'Mdy': 'd-M-y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd-M-y GGGGG HH:mm:ss',
    'Mdy': 'd-M-y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd-M-y GGGGG HH:mm',
    'Mdy': 'd-M-y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM⹁ y 𞤉 HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM⹁ y 𞤉 HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM⹁ y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd-M-y GGGGG HH:mm',
    'ahm': 'd-M-y HH:mm–HH:mm',
    '_': 'd-M-y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ff_Adlm_NG = {
  FULL_DATE: {
    'G': 'EEEE d MMMM⹁ y G – EEEE d MMMM⹁ y G',
    'Md': 'EEEE d MMMM – EEEE d MMMM⹁ y',
    'y': 'EEEE d MMMM⹁ y – EEEE d MMMM⹁ y',
    '_': 'EEEE d MMMM⹁ y'
  },
  LONG_DATE: {
    'G': 'd MMMM⹁ y G – d MMMM⹁ y G',
    'M': 'd MMMM – d MMMM⹁ y',
    'd': 'd – d MMMM⹁ y',
    'y': 'd MMMM⹁ y – d MMMM⹁ y',
    '_': 'd MMMM⹁ y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM⹁ y G – d MMM⹁ y G',
    'M': 'd MMM – d MMM⹁ y',
    'd': 'd – d MMM⹁ y',
    'y': 'd MMM⹁ y – d MMM⹁ y',
    '_': 'd MMM⹁ y'
  },
  SHORT_DATE: {
    'G': 'd-M-y GGGGG – d-M-y GGGGG',
    'Mdy': 'd-M-y – d-M-y',
    '_': 'd-M-y'
  },
  FULL_TIME: {
    'G': 'd-M-y GGGGG HH:mm:ss zzzz',
    'Mdy': 'd-M-y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd-M-y GGGGG HH:mm:ss z',
    'Mdy': 'd-M-y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd-M-y GGGGG HH:mm:ss',
    'Mdy': 'd-M-y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd-M-y GGGGG HH:mm',
    'Mdy': 'd-M-y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM⹁ y 𞤉 HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM⹁ y 𞤉 HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM⹁ y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd-M-y GGGGG HH:mm',
    'ahm': 'd-M-y HH:mm–HH:mm',
    '_': 'd-M-y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ff_Adlm_SL = {
  FULL_DATE: {
    'G': 'EEEE d MMMM⹁ y G – EEEE d MMMM⹁ y G',
    'Md': 'EEEE d MMMM – EEEE d MMMM⹁ y',
    'y': 'EEEE d MMMM⹁ y – EEEE d MMMM⹁ y',
    '_': 'EEEE d MMMM⹁ y'
  },
  LONG_DATE: {
    'G': 'd MMMM⹁ y G – d MMMM⹁ y G',
    'M': 'd MMMM – d MMMM⹁ y',
    'd': 'd – d MMMM⹁ y',
    'y': 'd MMMM⹁ y – d MMMM⹁ y',
    '_': 'd MMMM⹁ y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM⹁ y G – d MMM⹁ y G',
    'M': 'd MMM – d MMM⹁ y',
    'd': 'd – d MMM⹁ y',
    'y': 'd MMM⹁ y – d MMM⹁ y',
    '_': 'd MMM⹁ y'
  },
  SHORT_DATE: {
    'G': 'd-M-y GGGGG – d-M-y GGGGG',
    'Mdy': 'd-M-y – d-M-y',
    '_': 'd-M-y'
  },
  FULL_TIME: {
    'G': 'd-M-y GGGGG h:mm:ss a zzzz',
    'Mdy': 'd-M-y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd-M-y GGGGG h:mm:ss a z',
    'Mdy': 'd-M-y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd-M-y GGGGG h:mm:ss a',
    'Mdy': 'd-M-y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd-M-y GGGGG h:mm a',
    'Mdy': 'd-M-y h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM⹁ y 𞤉 h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM⹁ y 𞤉 h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM⹁ y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'd-M-y GGGGG h:mm a',
    'a': 'd-M-y h:mm a – h:mm a',
    'hm': 'd-M-y h:mm–h:mm a',
    '_': 'd-M-y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ff_Adlm_SN = {
  FULL_DATE: {
    'G': 'EEEE d MMMM⹁ y G – EEEE d MMMM⹁ y G',
    'Md': 'EEEE d MMMM – EEEE d MMMM⹁ y',
    'y': 'EEEE d MMMM⹁ y – EEEE d MMMM⹁ y',
    '_': 'EEEE d MMMM⹁ y'
  },
  LONG_DATE: {
    'G': 'd MMMM⹁ y G – d MMMM⹁ y G',
    'M': 'd MMMM – d MMMM⹁ y',
    'd': 'd – d MMMM⹁ y',
    'y': 'd MMMM⹁ y – d MMMM⹁ y',
    '_': 'd MMMM⹁ y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM⹁ y G – d MMM⹁ y G',
    'M': 'd MMM – d MMM⹁ y',
    'd': 'd – d MMM⹁ y',
    'y': 'd MMM⹁ y – d MMM⹁ y',
    '_': 'd MMM⹁ y'
  },
  SHORT_DATE: {
    'G': 'd-M-y GGGGG – d-M-y GGGGG',
    'Mdy': 'd-M-y – d-M-y',
    '_': 'd-M-y'
  },
  FULL_TIME: {
    'G': 'd-M-y GGGGG HH:mm:ss zzzz',
    'Mdy': 'd-M-y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd-M-y GGGGG HH:mm:ss z',
    'Mdy': 'd-M-y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd-M-y GGGGG HH:mm:ss',
    'Mdy': 'd-M-y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd-M-y GGGGG HH:mm',
    'Mdy': 'd-M-y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM⹁ y 𞤉 HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM⹁ y 𞤉 HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM⹁ y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd-M-y GGGGG HH:mm',
    'ahm': 'd-M-y HH:mm–HH:mm',
    '_': 'd-M-y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ff_Latn = DateIntervalSymbols_ff;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ff_Latn_BF = DateIntervalSymbols_ff;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ff_Latn_CM = DateIntervalSymbols_ff;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ff_Latn_GH = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'd/M/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'd/M/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'd/M/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'd/M/y h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM, y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'a': 'd/M/y h:mm a – h:mm a',
    'hm': 'd/M/y h:mm–h:mm a',
    '_': 'd/M/y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ff_Latn_GM = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'd/M/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'd/M/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'd/M/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'd/M/y h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM, y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'a': 'd/M/y h:mm a – h:mm a',
    'hm': 'd/M/y h:mm–h:mm a',
    '_': 'd/M/y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ff_Latn_GN = DateIntervalSymbols_ff;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ff_Latn_GW = DateIntervalSymbols_ff;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ff_Latn_LR = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'd/M/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'd/M/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'd/M/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'd/M/y h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM, y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'a': 'd/M/y h:mm a – h:mm a',
    'hm': 'd/M/y h:mm–h:mm a',
    '_': 'd/M/y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ff_Latn_MR = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'd/M/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'd/M/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'd/M/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'd/M/y h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM, y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'a': 'd/M/y h:mm a – h:mm a',
    'hm': 'd/M/y h:mm–h:mm a',
    '_': 'd/M/y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ff_Latn_NE = DateIntervalSymbols_ff;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ff_Latn_NG = DateIntervalSymbols_ff;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ff_Latn_SL = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'd/M/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'd/M/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'd/M/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'd/M/y h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM, y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'a': 'd/M/y h:mm a – h:mm a',
    'hm': 'd/M/y h:mm–h:mm a',
    '_': 'd/M/y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ff_Latn_SN = DateIntervalSymbols_ff;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fi_FI = dateIntervalSymbols.DateIntervalSymbols_fi;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fil_PH = dateIntervalSymbols.DateIntervalSymbols_fil;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fo = {
  FULL_DATE: {
    'G': 'EEEE, d. MMMM y G – EEEE, d. MMMM y G',
    'Md': 'EEEE dd. MMMM–EEEE dd. MMMM y',
    'y': 'EEEE dd. MMMM y–EEEE dd. MMMM y',
    '_': 'EEEE, d. MMMM y'
  },
  LONG_DATE: {
    'G': 'd. MMMM y G – d. MMMM y G',
    'M': 'dd. MMMM–dd. MMMM y',
    'd': 'd.–d. MMMM y',
    'y': 'dd. MMMM y–dd. MMMM y',
    '_': 'd. MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'dd.MM.y GGGGG – dd.MM.y GGGGG',
    'Mdy': 'dd.MM.y–dd.MM.y',
    '_': 'dd.MM.y'
  },
  SHORT_DATE: {
    'G': 'dd.MM.yy GGGGG – dd.MM.yy GGGGG',
    'Mdy': 'dd.MM.yy–dd.MM.yy',
    '_': 'dd.MM.yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd, HH:mm:ss zzzz',
    'Mdy': 'dd.MM.y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd, HH:mm:ss z',
    'Mdy': 'dd.MM.y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd, HH:mm:ss',
    'Mdy': 'dd.MM.y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd, HH:mm',
    'Mdy': 'dd.MM.y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d. MMMM y \'kl\'. HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd. MMMM y \'kl\'. HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd.MM.y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd, HH:mm',
    'ahm': 'dd.MM.yy, HH:mm–HH:mm',
    '_': 'dd.MM.yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fo_DK = DateIntervalSymbols_fo;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fo_FO = DateIntervalSymbols_fo;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_BE = {
  FULL_DATE: {
    'G': 'EEEE d MMMM y G – EEEE d MMMM y G',
    'M': 'EEEE d MMMM – EEEE d MMMM y',
    'd': 'EEEE d – EEEE d MMMM y',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd/MM/yy G – d/MM/yy G',
    'Mdy': 'dd/MM/yy – dd/MM/yy',
    '_': 'd/MM/yy'
  },
  FULL_TIME: {
    'G': 'dd/MM/y GGGGG H \'h\' mm \'min\' ss \'s\' zzzz',
    'Mdy': 'dd/MM/y H \'h\' mm \'min\' ss \'s\' zzzz',
    '_': 'H \'h\' mm \'min\' ss \'s\' zzzz'
  },
  LONG_TIME: {
    'G': 'dd/MM/y GGGGG H \'h\' mm \'min\' ss \'s\' z',
    'Mdy': 'dd/MM/y H \'h\' mm \'min\' ss \'s\' z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'dd/MM/y GGGGG HH:mm:ss',
    'Mdy': 'dd/MM/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'dd/MM/y GGGGG HH:mm',
    'Mdy': 'dd/MM/y HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y \'à\' H \'h\' mm \'min\' ss \'s\' zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'à\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/yy GGGGG HH:mm',
    'ahm': 'd/MM/yy, HH:mm – HH:mm',
    '_': 'd/MM/yy HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_BF = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_BI = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_BJ = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_BL = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_CD = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_CF = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_CG = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_CH = {
  FULL_DATE: {
    'G': 'EEEE d MMMM y G – EEEE d MMMM y G',
    'M': 'EEEE d MMMM – EEEE d MMMM y',
    'd': 'EEEE d – EEEE d MMMM y',
    'y': 'EEEE d MMMM y – EEEE d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd/MM/yy G – d/MM/yy G',
    '_': 'dd.MM.yy'
  },
  FULL_TIME: {
    'G': 'dd/MM/y GGGGG HH.mm:ss \'h\' zzzz',
    'Mdy': 'dd.MM.y HH.mm:ss \'h\' zzzz',
    '_': 'HH.mm:ss \'h\' zzzz'
  },
  LONG_TIME: {
    'G': 'dd/MM/y GGGGG HH.mm:ss \'h\' z',
    'Mdy': 'dd.MM.y HH.mm:ss \'h\' z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'dd/MM/y GGGGG HH:mm:ss',
    'Mdy': 'dd.MM.y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'dd/MM/y GGGGG HH:mm',
    'Mdy': 'dd.MM.y HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'à\' HH.mm:ss \'h\' zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'à\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/yy GGGGG HH:mm',
    'ahm': 'dd.MM.yy, HH:mm – HH:mm',
    '_': 'dd.MM.yy HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_CI = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_CM = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_DJ = {
  FULL_DATE: {
    'G': 'EEEE d MMMM y G – EEEE d MMMM y G',
    'M': 'EEEE d MMMM – EEEE d MMMM y',
    'd': 'EEEE d – EEEE d MMMM y',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd/MM/y G – d/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'dd/MM/y GGGGG h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'dd/MM/y GGGGG h:mm:ss a z',
    'Mdy': 'dd/MM/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'dd/MM/y GGGGG h:mm:ss a',
    'Mdy': 'dd/MM/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'dd/MM/y GGGGG h:mm a',
    'Mdy': 'dd/MM/y h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y \'à\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'à\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y GGGGG h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_DZ = {
  FULL_DATE: {
    'G': 'EEEE d MMMM y G – EEEE d MMMM y G',
    'M': 'EEEE d MMMM – EEEE d MMMM y',
    'd': 'EEEE d – EEEE d MMMM y',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd/MM/y G – d/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'dd/MM/y GGGGG h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'dd/MM/y GGGGG h:mm:ss a z',
    'Mdy': 'dd/MM/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'dd/MM/y GGGGG h:mm:ss a',
    'Mdy': 'dd/MM/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'dd/MM/y GGGGG h:mm a',
    'Mdy': 'dd/MM/y h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y \'à\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'à\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y GGGGG h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_FR = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_GA = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_GF = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_GN = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_GP = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_GQ = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_HT = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_KM = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_LU = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_MA = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_MC = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_MF = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_MG = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_ML = {
  FULL_DATE: {
    'G': 'EEEE d MMMM y G – EEEE d MMMM y G',
    'M': 'EEEE d MMMM – EEEE d MMMM y',
    'd': 'EEEE d – EEEE d MMMM y',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd/MM/y G – d/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y \'à\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'à\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y GGGGG, HH:mm',
    'ahm': 'dd/MM/y, HH:mm – HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_MQ = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_MR = {
  FULL_DATE: {
    'G': 'EEEE d MMMM y G – EEEE d MMMM y G',
    'M': 'EEEE d MMMM – EEEE d MMMM y',
    'd': 'EEEE d – EEEE d MMMM y',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd/MM/y G – d/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'dd/MM/y GGGGG h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'dd/MM/y GGGGG h:mm:ss a z',
    'Mdy': 'dd/MM/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'dd/MM/y GGGGG h:mm:ss a',
    'Mdy': 'dd/MM/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'dd/MM/y GGGGG h:mm a',
    'Mdy': 'dd/MM/y h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y \'à\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'à\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y GGGGG h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_MU = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_NC = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_NE = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_PF = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_PM = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_RE = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_RW = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_SC = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_SN = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_SY = {
  FULL_DATE: {
    'G': 'EEEE d MMMM y G – EEEE d MMMM y G',
    'M': 'EEEE d MMMM – EEEE d MMMM y',
    'd': 'EEEE d – EEEE d MMMM y',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd/MM/y G – d/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'dd/MM/y GGGGG h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'dd/MM/y GGGGG h:mm:ss a z',
    'Mdy': 'dd/MM/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'dd/MM/y GGGGG h:mm:ss a',
    'Mdy': 'dd/MM/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'dd/MM/y GGGGG h:mm a',
    'Mdy': 'dd/MM/y h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y \'à\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'à\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y GGGGG h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_TD = {
  FULL_DATE: {
    'G': 'EEEE d MMMM y G – EEEE d MMMM y G',
    'M': 'EEEE d MMMM – EEEE d MMMM y',
    'd': 'EEEE d – EEEE d MMMM y',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd/MM/y G – d/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'dd/MM/y GGGGG h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'dd/MM/y GGGGG h:mm:ss a z',
    'Mdy': 'dd/MM/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'dd/MM/y GGGGG h:mm:ss a',
    'Mdy': 'dd/MM/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'dd/MM/y GGGGG h:mm a',
    'Mdy': 'dd/MM/y h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y \'à\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'à\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y GGGGG h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_TG = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_TN = {
  FULL_DATE: {
    'G': 'EEEE d MMMM y G – EEEE d MMMM y G',
    'M': 'EEEE d MMMM – EEEE d MMMM y',
    'd': 'EEEE d – EEEE d MMMM y',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd/MM/y G – d/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'dd/MM/y GGGGG h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'dd/MM/y GGGGG h:mm:ss a z',
    'Mdy': 'dd/MM/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'dd/MM/y GGGGG h:mm:ss a',
    'Mdy': 'dd/MM/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'dd/MM/y GGGGG h:mm a',
    'Mdy': 'dd/MM/y h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y \'à\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'à\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y GGGGG h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_VU = {
  FULL_DATE: {
    'G': 'EEEE d MMMM y G – EEEE d MMMM y G',
    'M': 'EEEE d MMMM – EEEE d MMMM y',
    'd': 'EEEE d – EEEE d MMMM y',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd/MM/y G – d/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'dd/MM/y GGGGG h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'dd/MM/y GGGGG h:mm:ss a z',
    'Mdy': 'dd/MM/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'dd/MM/y GGGGG h:mm:ss a',
    'Mdy': 'dd/MM/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'dd/MM/y GGGGG h:mm a',
    'Mdy': 'dd/MM/y h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y \'à\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'à\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y GGGGG h:mm a',
    'a': 'dd/MM/y, h:mm a – h:mm a',
    'hm': 'dd/MM/y, h:mm – h:mm a',
    '_': 'dd/MM/y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_WF = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fr_YT = dateIntervalSymbols.DateIntervalSymbols_fr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fur = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Mdy': 'EEEE dd/MM/y – EEEE dd/MM/y',
    '_': 'EEEE d \'di\' MMMM \'dal\' y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'dd/MM/y – d/MM',
    'd': 'd – d/MM/y',
    'y': 'dd/MM/y – dd/MM/y',
    '_': 'd \'di\' MMMM \'dal\' y'
  },
  MEDIUM_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    '_': 'dd/MM/y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d \'di\' MMMM \'dal\' y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'di\' MMMM \'dal\' y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd/MM/y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd HH:mm',
    'ahm': 'dd/MM/yy HH:mm–HH:mm',
    '_': 'dd/MM/yy HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fur_IT = DateIntervalSymbols_fur;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fy = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'M': 'EEEE d MMMM – EEEE d MMMM y',
    'd': 'EEEE d – EEEE d MMMM y',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    '_': 'dd-MM-yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd-M-y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd-M-y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd-M-y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd-M-y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y \'om\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'om\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd HH:mm',
    'ahm': 'dd-MM-yy HH:mm–HH:mm',
    '_': 'dd-MM-yy HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_fy_NL = DateIntervalSymbols_fy;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ga_GB = dateIntervalSymbols.DateIntervalSymbols_ga;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ga_IE = dateIntervalSymbols.DateIntervalSymbols_ga;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_gd = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    'y': 'EEEE, d MMMM y – EEEE, d MMMM y',
    '_': 'EEEE, d\'mh\' MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd – d MMMM y',
    'y': 'd MMMM y – d MMMM y',
    '_': 'd\'mh\' MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd – d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd/M/y GGGGG – d/M/y GGGGG',
    'Mdy': 'd/M/y – d/M/y',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'd/M/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'd/M/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'd/M/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'd/M/y, HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d\'mh\' MMMM y \'aig\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd\'mh\' MMMM y \'aig\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y HH:mm – HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_gd_GB = DateIntervalSymbols_gd;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_gl_ES = dateIntervalSymbols.DateIntervalSymbols_gl;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_gsw_CH = dateIntervalSymbols.DateIntervalSymbols_gsw;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_gsw_FR = dateIntervalSymbols.DateIntervalSymbols_gsw;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_gsw_LI = dateIntervalSymbols.DateIntervalSymbols_gsw;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_gu_IN = dateIntervalSymbols.DateIntervalSymbols_gu;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_guz = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_guz_KE = DateIntervalSymbols_guz;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_gv = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'y MMMM d, EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'y MMMM d'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'y-M-d HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'y-M-d HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'y-M-d HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'y-M-d HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'y MMMM d, EEEE HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'y MMMM d HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'y-MM-dd HH:mm–HH:mm',
    '_': 'y-MM-dd HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_gv_IM = DateIntervalSymbols_gv;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ha = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM, y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM, y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Md': 'dd/MM/yy – dd/MM/yy',
    'y': 'yy-MM-dd – yy-MM-dd',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd, HH:mm:ss zzzz',
    'Mdy': 'y-MM-dd, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd, HH:mm:ss z',
    'Mdy': 'y-MM-dd, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd, HH:mm:ss',
    'Mdy': 'y-MM-dd, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd, HH:mm',
    'Mdy': 'y-MM-dd, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM, y \'da\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM, y \'da\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM, y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd, HH:mm',
    'ahm': 'd/M/yy, HH:mm–HH:mm',
    '_': 'd/M/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ha_GH = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM, y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM, y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Md': 'dd/MM/yy – dd/MM/yy',
    'y': 'yy-MM-dd – yy-MM-dd',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd, h:mm:ss a zzzz',
    'Mdy': 'y-MM-dd, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd, h:mm:ss a z',
    'Mdy': 'y-MM-dd, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd, h:mm:ss a',
    'Mdy': 'y-MM-dd, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd, h:mm a',
    'Mdy': 'y-MM-dd, h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM, y \'da\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM, y \'da\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM, y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd, h:mm a',
    'a': 'd/M/yy, h:mm a – h:mm a',
    'hm': 'd/M/yy, h:mm–h:mm a',
    '_': 'd/M/yy, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ha_NE = DateIntervalSymbols_ha;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ha_NG = DateIntervalSymbols_ha;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_haw_US = dateIntervalSymbols.DateIntervalSymbols_haw;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_he_IL = dateIntervalSymbols.DateIntervalSymbols_he;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_hi_IN = dateIntervalSymbols.DateIntervalSymbols_hi;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_hi_Latn = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE –  G y MMMM d, EEEE',
    'M': 'EEEE, d MMMM – EEEE, d MMMM, y',
    'd': 'EEEE, d – EEEE, d MMMM, y',
    '_': 'EEEE, d MMMM, y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'd MMMM – d MMMM, y',
    'd': 'd–d MMMM, y',
    '_': 'd MMMM, y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'd MMM – d MMM, y',
    'd': 'd–d MMM, y',
    'y': 'd MMM, y – d MMM, y',
    '_': 'dd MMM, y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'd/M/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'd/M/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'd/M/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'd/M/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM, y, h:mm:ss a zzzz \'baje\''
  },
  LONG_DATETIME: {
    '_': 'd MMMM, y, h:mm:ss a z \'baje\''
  },
  MEDIUM_DATETIME: {
    '_': 'dd MMM, y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y h:mm a – h:mm a',
    'hm': 'dd/MM/y h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_hi_Latn_IN = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE –  G y MMMM d, EEEE',
    'M': 'EEEE, d MMMM – EEEE, d MMMM, y',
    'd': 'EEEE, d – EEEE, d MMMM, y',
    '_': 'EEEE, d MMMM, y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'd MMMM – d MMMM, y',
    'd': 'd–d MMMM, y',
    '_': 'd MMMM, y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'd MMM – d MMM, y',
    'd': 'd–d MMM, y',
    'y': 'd MMM, y – d MMM, y',
    '_': 'dd MMM, y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y G – dd/MM/y G',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, h:mm:ss a zzzz',
    'Mdy': 'd/M/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, h:mm:ss a z',
    'Mdy': 'd/M/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, h:mm:ss a',
    'Mdy': 'd/M/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, h:mm a',
    'Mdy': 'd/M/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM, y, h:mm:ss a zzzz \'baje\''
  },
  LONG_DATETIME: {
    '_': 'd MMMM, y, h:mm:ss a z \'baje\''
  },
  MEDIUM_DATETIME: {
    '_': 'dd MMM, y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, h:mm a',
    'a': 'dd/MM/y h:mm a – h:mm a',
    'hm': 'dd/MM/y h:mm – h:mm a',
    '_': 'dd/MM/y, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_hr_BA = {
  FULL_DATE: {
    'G': 'EEEE, dd. MMMM y. G – EEEE, dd. MMMM y. G',
    'M': 'EEEE, dd. MMMM – EEEE, dd. MMMM y.',
    'd': 'EEEE, dd. – EEEE, dd. MMMM y.',
    'y': 'EEEE, dd. MMMM y. – EEEE, dd. MMMM y.',
    '_': 'EEEE, d. MMMM y.'
  },
  LONG_DATE: {
    'G': 'dd. MMMM y. G – dd. MMMM y. G',
    'M': 'dd. MMMM – dd. MMMM y.',
    'd': 'dd. – dd. MMMM y.',
    'y': 'dd. MMMM y. – dd. MMMM y.',
    '_': 'd. MMMM y.'
  },
  MEDIUM_DATE: {
    'G': 'dd. MMM y. G – dd. MMM y. G',
    'M': 'dd. MMM – dd. MMM y.',
    'd': 'dd. – dd. MMM y.',
    'y': 'dd. MMM y. – dd. MMM y.',
    '_': 'd. MMM y.'
  },
  SHORT_DATE: {
    'G': 'dd. MM. yy. GGGGG – dd. MM. yy. GGGGG',
    'Mdy': 'dd. MM. yy. – dd. MM. yy.',
    '_': 'd. M. yy.'
  },
  FULL_TIME: {
    'G': 'd. M. y. GGGGG HH:mm:ss (zzzz)',
    'Mdy': 'dd. MM. y. HH:mm:ss (zzzz)',
    '_': 'HH:mm:ss (zzzz)'
  },
  LONG_TIME: {
    'G': 'd. M. y. GGGGG HH:mm:ss (z)',
    'Mdy': 'dd. MM. y. HH:mm:ss (z)',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd. M. y. GGGGG HH:mm:ss',
    'Mdy': 'dd. MM. y. HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd. M. y. GGGGG HH:mm',
    'Mdy': 'dd. MM. y. HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d. MMMM y. \'u\' HH:mm:ss (zzzz)'
  },
  LONG_DATETIME: {
    '_': 'd. MMMM y. \'u\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd. MMM y. HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd. M. yy. GGGGG HH:mm',
    'ahm': 'd. M. yy. HH:mm – HH:mm',
    '_': 'd. M. yy. HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_hr_HR = dateIntervalSymbols.DateIntervalSymbols_hr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_hsb = {
  FULL_DATE: {
    'G': 'EEEE, d. MMMM y G – EEEE, d. MMMM y G',
    'M': 'EEEE, d. MMMM – EEEE, d. MMMM y',
    'd': 'EEEE, d. – EEEE, d. MMMM y',
    '_': 'EEEE, d. MMMM y'
  },
  LONG_DATE: {
    'G': 'd. MMMM y G – d. MMMM y G',
    'M': 'd. MMMM – d. MMMM y',
    'd': 'd. – d. MMMM y',
    '_': 'd. MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'dd.MM.y G – dd.MM.y G',
    '_': 'd.M.y'
  },
  SHORT_DATE: {
    'G': 'dd.MM.yy G – dd.MM.yy G',
    '_': 'd.M.yy'
  },
  FULL_TIME: {
    'G': 'd.M.y GGGGG H:mm:ss zzzz',
    'Mdy': 'd.M.y H:mm:ss zzzz',
    '_': 'H:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd.M.y GGGGG H:mm:ss z',
    'Mdy': 'd.M.y H:mm:ss z',
    '_': 'H:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd.M.y GGGGG H:mm:ss',
    'Mdy': 'd.M.y H:mm:ss',
    '_': 'H:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd.M.y GGGGG H:mm \'hodź\'.',
    'Mdy': 'd.M.y H:mm \'hodź\'.',
    'ahm': 'H:mm – H:mm \'hodź\'.',
    '_': 'H:mm \'hodź\'.'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d. MMMM y \'w\' H:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd. MMMM y \'w\' H:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd.M.y H:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd.M.yy GGGGG H:mm \'hodź\'.',
    'ahm': 'd.M.yy H:mm – H:mm \'hodź\'.',
    '_': 'd.M.yy H:mm \'hodź\'.'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_hsb_DE = DateIntervalSymbols_hsb;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_hu_HU = dateIntervalSymbols.DateIntervalSymbols_hu;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_hy_AM = dateIntervalSymbols.DateIntervalSymbols_hy;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ia = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'EEEE d MMMM – EEEE d MMMM y',
    'y': 'EEEE d MMMM y – EEEE d MMMM y',
    '_': 'EEEE \'le\' d \'de\' MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'd MMMM – d MMMM y',
    'd': 'd – d MMMM y',
    'y': 'd MMMM y – d MMMM y',
    '_': 'd \'de\' MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'd MMM – d MMM y',
    'd': 'd – d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    '_': 'dd-MM-y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'dd-MM-y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'dd-MM-y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'dd-MM-y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'dd-MM-y HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE \'le\' d \'de\' MMMM y \'a\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM y \'a\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd-MM-y HH:mm – HH:mm',
    '_': 'dd-MM-y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ia_001 = DateIntervalSymbols_ia;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_id_ID = dateIntervalSymbols.DateIntervalSymbols_id;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ig = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Mdy': 'yy-MM-dd – yy-MM-dd',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd, HH:mm:ss zzzz',
    'Mdy': 'd/M/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd, HH:mm:ss z',
    'Mdy': 'd/M/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd, HH:mm:ss',
    'Mdy': 'd/M/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd, HH:mm',
    'Mdy': 'd/M/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'na\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'na\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd, HH:mm',
    'ahm': 'd/M/yy, HH:mm–HH:mm',
    '_': 'd/M/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ig_NG = DateIntervalSymbols_ig;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ii = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    '_': 'y MMMM d, EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    '_': 'y MMMM d'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'y-MM-dd HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'y-MM-dd HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'y-MM-dd HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'y-MM-dd HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'y MMMM d, EEEE HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'y MMMM d HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'y-MM-dd HH:mm–HH:mm',
    '_': 'y-MM-dd HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ii_CN = DateIntervalSymbols_ii;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_is_IS = dateIntervalSymbols.DateIntervalSymbols_is;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_it_CH = {
  FULL_DATE: {
    'G': 'EEEE d MMMM y G – EEEE d MMMM y G',
    'M': 'EEEE d MMMM – EEEE d MMMM y',
    'd': 'EEEE d – EEEE d MMMM y',
    'y': 'EEEE d MMMM y – EEEE d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'dd MMMM – dd MMMM y',
    'd': 'dd–dd MMMM y',
    'y': 'dd MMMM y – dd MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'dd MMM – dd MMM y',
    'd': 'dd–dd MMM y',
    'y': 'dd MMM y – dd MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd/M/yy GGGGG – d/M/yy GGGGG',
    'Mdy': 'dd/MM/yy – dd/MM/yy',
    '_': 'dd.MM.yy'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'd/M/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss z',
    'Mdy': 'd/M/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss',
    'Mdy': 'd/M/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, HH:mm',
    'Mdy': 'd/M/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'alle\' \'ore\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'alle\' \'ore\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/yy GGGGG, HH:mm',
    'ahm': 'dd.MM.yy, HH:mm–HH:mm',
    '_': 'dd.MM.yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_it_IT = dateIntervalSymbols.DateIntervalSymbols_it;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_it_SM = dateIntervalSymbols.DateIntervalSymbols_it;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_it_VA = dateIntervalSymbols.DateIntervalSymbols_it;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ja_JP = dateIntervalSymbols.DateIntervalSymbols_ja;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_jgo = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, y MMMM dd'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'y MMMM d'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'M.d.y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'M.d.y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'M.d.y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'M.d.y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, y MMMM dd HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'y MMMM d HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'y-MM-dd HH:mm–HH:mm',
    '_': 'y-MM-dd HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_jgo_CM = DateIntervalSymbols_jgo;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_jmc = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_jmc_TZ = DateIntervalSymbols_jmc;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_jv = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'Md': 'EEEE, d MMMM – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd – d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd – d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd/M/y GGGGG – d/M/y GGGGG',
    '_': 'dd-MM-y'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'dd-MM-y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss z',
    'Mdy': 'dd-MM-y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss',
    'Mdy': 'dd-MM-y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, HH:mm',
    'Mdy': 'dd-MM-y, HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'ing\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'ing\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y GGGGG, HH:mm',
    'ahm': 'dd-MM-y, HH:mm – HH:mm',
    '_': 'dd-MM-y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_jv_ID = DateIntervalSymbols_jv;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ka_GE = dateIntervalSymbols.DateIntervalSymbols_ka;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_kab = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'd/M/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'd/M/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'd/M/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'd/M/y h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM, y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'a': 'd/M/y h:mm a – h:mm a',
    'hm': 'd/M/y h:mm–h:mm a',
    '_': 'd/M/y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_kab_DZ = DateIntervalSymbols_kab;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_kam = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_kam_KE = DateIntervalSymbols_kam;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_kde = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_kde_TZ = DateIntervalSymbols_kde;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_kea = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'Md': 'EEEE, d MMMM – EEEE, d MMMM y',
    'y': 'EEEE, d MMMM y – EEEE, d MMMM y',
    '_': 'EEEE, d \'di\' MMMM \'di\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd – d MMMM y',
    'y': 'd MMMM y – d MMMM y',
    '_': 'd \'di\' MMMM \'di\' y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd – d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y GGGGG – dd/MM/y GGGGG',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'di\' MMMM \'di\' y, HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'di\' MMMM \'di\' y, HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y GGGGG, HH:mm',
    'ahm': 'dd/MM/y, HH:mm – HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_kea_CV = DateIntervalSymbols_kea;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_kgp = {
  FULL_DATE: {
    'G': 'G EEEE, d \'ne\' MMMM, y – G EEEE, d \'ne\' MMMM, y',
    'M': 'EEEE, d \'ne\' MMMM – EEEE, d \'ne\' MMMM, y',
    'd': 'EEEE, d – EEEE, d \'ne\' MMMM, y',
    '_': 'EEEE, d \'ne\' MMMM, y'
  },
  LONG_DATE: {
    'G': 'G d \'ne\' MMMM, y – G d \'ne\' MMMM, y',
    'M': 'd \'ne\' MMMM – d \'ne\' MMMM, y',
    'd': 'd – d \'ne\' MMMM, y',
    '_': 'd \'ne\' MMMM, y'
  },
  MEDIUM_DATE: {
    'G': 'G d \'ne\' MMM, y – G d \'ne\' MMM, y',
    'M': 'd \'ne\' MMM – d \'ne\' MMM, y',
    'd': 'd – d \'ne\' MMM, y',
    '_': 'd \'ne\' MMM, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG dd/MM/y – GGGGG dd/MM/y',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'dd/MM/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'dd/MM/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'dd/MM/y HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'ne\' MMMM, y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'ne\' MMMM, y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd \'ne\' MMM, y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm – HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_kgp_BR = DateIntervalSymbols_kgp;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_khq = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM, y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'd/M/y HH:mm–HH:mm',
    '_': 'd/M/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_khq_ML = DateIntervalSymbols_khq;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ki = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ki_KE = DateIntervalSymbols_ki;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_kk_KZ = dateIntervalSymbols.DateIntervalSymbols_kk;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_kkj = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE dd MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'dd/MM y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'dd/MM y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'dd/MM y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'dd/MM y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE dd MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM y HH:mm–HH:mm',
    '_': 'dd/MM y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_kkj_CM = DateIntervalSymbols_kkj;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_kl = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'y MMMM d, EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'y MMMM d'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH.mm.ss zzzz',
    'Mdy': 'y-M-d HH.mm.ss zzzz',
    '_': 'HH.mm.ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH.mm.ss z',
    'Mdy': 'y-M-d HH.mm.ss z',
    '_': 'HH.mm.ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH.mm.ss',
    'Mdy': 'y-M-d HH.mm.ss',
    '_': 'HH.mm.ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH.mm',
    'Mdy': 'y-M-d HH.mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH.mm'
  },
  FULL_DATETIME: {
    '_': 'y MMMM d, EEEE HH.mm.ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'y MMMM d HH.mm.ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d HH.mm.ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH.mm',
    'ahm': 'y-MM-dd HH:mm–HH:mm',
    '_': 'y-MM-dd HH.mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_kl_GL = DateIntervalSymbols_kl;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_kln = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_kln_KE = DateIntervalSymbols_kln;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_km_KH = dateIntervalSymbols.DateIntervalSymbols_km;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_kn_IN = dateIntervalSymbols.DateIntervalSymbols_kn;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ko_KP = {
  FULL_DATE: {
    'G': 'GGGGG y년 M월 d일 EEEE요일 ~ GGGGG y년 M월 d일 EEEE요일',
    'Mdy': 'y. M. d. (EEEE) ~ y. M. d. (EEEE)',
    '_': 'y년 M월 d일 EEEE'
  },
  LONG_DATE: {
    'G': 'GGGGG y년 M월 d일 ~ GGGGG y년 M월 d일',
    'Mdy': 'y. M. d. ~ y. M. d.',
    '_': 'y년 M월 d일'
  },
  MEDIUM_DATE: {
    'G': 'GGGGG y년 M월 d일 ~ GGGGG y년 M월 d일',
    '_': 'y. M. d.'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy년 M월 d일 ~ GGGGG yy년 M월 d일',
    '_': 'yy. M. d.'
  },
  FULL_TIME: {
    'G': 'GGGGG y/M/d a h:mm:ss zzzz',
    'Mdy': 'y. M. d. a h:mm:ss zzzz',
    '_': 'a h:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y/M/d a h:mm:ss z',
    'Mdy': 'y. M. d. a h:mm:ss z',
    '_': 'a h:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y/M/d a h:mm:ss',
    'Mdy': 'y. M. d. a h:mm:ss',
    '_': 'a h:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y/M/d a h:mm',
    'Mdy': 'y. M. d. a h:mm',
    'hm': 'a h:mm~h:mm',
    '_': 'a h:mm'
  },
  FULL_DATETIME: {
    '_': 'y년 M월 d일 EEEE a h:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'y년 M월 d일 a h:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'y. M. d. a h:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy/M/d a h:mm',
    'a': 'yy. M. d. a h:mm ~ a h:mm',
    'hm': 'yy. M. d. a h:mm~h:mm',
    '_': 'yy. M. d. a h:mm'
  },
  FALLBACK: '{0} ~ {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ko_KR = dateIntervalSymbols.DateIntervalSymbols_ko;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_kok = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d MMMM –EEEE, d MMMM y',
    'y': 'EEEE, d MMMM y – EEEE, d MMMM y',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    'y': 'd MMM y – d MMM y',
    '_': 'd-MMM-y'
  },
  SHORT_DATE: {
    'G': 'GGGGG d-M-yy – GGGGG d-M-yy',
    '_': 'd-M-yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd, h:mm:ss a zzzz',
    'Mdy': 'd-M-y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd, h:mm:ss a z',
    'Mdy': 'd-M-y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd, h:mm:ss a',
    'Mdy': 'd-M-y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd, h:mm a',
    'Mdy': 'd-M-y, h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y h:mm:ss a zzzz वरांचेर'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y h:mm:ss a z वरांचेर'
  },
  MEDIUM_DATETIME: {
    '_': 'd-MMM-y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd, h:mm a',
    'a': 'd-M-yy h:mm a – h:mm a',
    'hm': 'd-M-yy h:mm–h:mm a',
    '_': 'd-M-yy, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_kok_IN = DateIntervalSymbols_kok;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ks = {
  FULL_DATE: {
    'G': 'EEEE, MMMM d, y G – EEEE, MMMM d, y G',
    'Md': 'EEEE, MMMM d – EEEE, MMMM d, y',
    '_': 'EEEE, MMMM d, y'
  },
  LONG_DATE: {
    'G': 'MMMM d, y G – MMMM d, y G',
    'M': 'MMMM d – MMMM d, y',
    'd': 'MMMM d – d, y',
    '_': 'MMMM d, y'
  },
  MEDIUM_DATE: {
    'G': 'MMM d, y G – MMM d, y G',
    'M': 'MMM d – MMM d, y',
    'd': 'MMM d – d, y',
    '_': 'MMM d, y'
  },
  SHORT_DATE: {
    'G': 'M/d/yy G – M/d/yy G',
    '_': 'M/d/yy'
  },
  FULL_TIME: {
    'G': 'M/d/y GGGGG, h:mm:ss a zzzz',
    'Mdy': 'M/d/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'M/d/y GGGGG, h:mm:ss a z',
    'Mdy': 'M/d/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'M/d/y GGGGG, h:mm:ss a',
    'Mdy': 'M/d/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'M/d/y GGGGG, h:mm a',
    'Mdy': 'M/d/y, h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'h:mm:ss a zzzz پٮ۪ٹھۍ EEEE, MMMM d, y'
  },
  LONG_DATETIME: {
    '_': 'h:mm:ss a z پٮ۪ٹھۍ MMMM d, y'
  },
  MEDIUM_DATETIME: {
    '_': 'MMM d, y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'M/d/yy GGGGG, h:mm a',
    'a': 'M/d/yy, h:mm a – h:mm a',
    'hm': 'M/d/yy, h:mm–h:mm a',
    '_': 'M/d/yy, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ks_Arab = DateIntervalSymbols_ks;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ks_Arab_IN = DateIntervalSymbols_ks;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ks_Deva = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Mdy': 'yy-MM-dd – yy-MM-dd',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd, a h:mm:ss zzzz',
    'Mdy': 'M/d/y, a h:mm:ss zzzz',
    '_': 'a h:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd, a h:mm:ss z',
    'Mdy': 'M/d/y, a h:mm:ss z',
    '_': 'a h:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd, a h:mm:ss',
    'Mdy': 'M/d/y, a h:mm:ss',
    '_': 'a h:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd, a h:mm',
    'Mdy': 'M/d/y, a h:mm',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'a h:mm'
  },
  FULL_DATETIME: {
    '_': 'a h:mm:ss zzzz पेठ EEEE, d MMMM y'
  },
  LONG_DATETIME: {
    '_': 'a h:mm:ss z पेठ d MMMM y'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, a h:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd, a h:mm',
    'a': 'd/M/yy, h:mm a – h:mm a',
    'hm': 'd/M/yy, h:mm–h:mm a',
    '_': 'd/M/yy, a h:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ks_Deva_IN = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Mdy': 'yy-MM-dd – yy-MM-dd',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd, a h:mm:ss zzzz',
    'Mdy': 'M/d/y, a h:mm:ss zzzz',
    '_': 'a h:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd, a h:mm:ss z',
    'Mdy': 'M/d/y, a h:mm:ss z',
    '_': 'a h:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd, a h:mm:ss',
    'Mdy': 'M/d/y, a h:mm:ss',
    '_': 'a h:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd, a h:mm',
    'Mdy': 'M/d/y, a h:mm',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'a h:mm'
  },
  FULL_DATETIME: {
    '_': 'a h:mm:ss zzzz पेठ EEEE, d MMMM y'
  },
  LONG_DATETIME: {
    '_': 'a h:mm:ss z पेठ d MMMM y'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, a h:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd, a h:mm',
    'a': 'd/M/yy, h:mm a – h:mm a',
    'hm': 'd/M/yy, h:mm–h:mm a',
    '_': 'd/M/yy, a h:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ksb = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ksb_TZ = DateIntervalSymbols_ksb;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ksf = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'd/M/y HH:mm–HH:mm',
    '_': 'd/M/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ksf_CM = DateIntervalSymbols_ksf;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ksh = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Mdy': 'EEEE y-MM-dd – EEEE y-MM-dd',
    '_': 'EEEE, \'dä\' d. MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'd.–d. MMMM y',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd. MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'd.–d. MMMM y',
    'y': 'y MMM d – y MMM d',
    '_': 'd. MMM. y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd. M. y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'y-MM-dd HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'y-MM-dd HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'y-MM-dd HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'y-MM-dd HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, \'dä\' d. MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd. MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd. MMM. y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'y-MM-dd HH:mm–HH:mm',
    '_': 'd. M. y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ksh_DE = DateIntervalSymbols_ksh;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ku = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'y MMMM d, EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'y MMMM d'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'y-M-d HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'y-M-d HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'y-M-d HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'y-M-d HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'y MMMM d, EEEE HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'y MMMM d HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'y-MM-dd HH:mm–HH:mm',
    '_': 'y-MM-dd HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ku_TR = DateIntervalSymbols_ku;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_kw = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'y MMMM d, EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'y MMMM d'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'y-M-d HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'y-M-d HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'y-M-d HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'y-M-d HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'y MMMM d, EEEE HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'y MMMM d HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'y-MM-dd HH:mm–HH:mm',
    '_': 'y-MM-dd HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_kw_GB = DateIntervalSymbols_kw;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ky_KG = dateIntervalSymbols.DateIntervalSymbols_ky;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_lag = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_lag_TZ = DateIntervalSymbols_lag;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_lb = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'M': 'EEEE, d. MMMM – EEEE, d. MMMM y',
    'd': 'EEEE, d. – EEEE, d. MMMM y',
    '_': 'EEEE, d. MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'd. MMMM – d. MMMM y',
    'd': 'd.–d. MMMM y',
    '_': 'd. MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'd. MMM – d. MMM y',
    'd': 'd.–d. MMM y',
    '_': 'd. MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    '_': 'dd.MM.yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd.M.y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd.M.y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd.M.y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd.M.y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d. MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd. MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd. MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd HH:mm',
    'ahm': 'dd.MM.yy HH:mm–HH:mm',
    '_': 'dd.MM.yy HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_lb_LU = DateIntervalSymbols_lb;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_lg = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_lg_UG = DateIntervalSymbols_lg;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_lkt = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, MMMM d, y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'MMMM d, y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'MMM d, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Mdy': 'yy-MM-dd – yy-MM-dd',
    '_': 'M/d/yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'M/d/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'M/d/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'M/d/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'M/d/y h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, MMMM d, y h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'MMMM d, y h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'MMM d, y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd h:mm a',
    'a': 'M/d/yy h:mm a – h:mm a',
    'hm': 'M/d/yy h:mm–h:mm a',
    '_': 'M/d/yy h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_lkt_US = DateIntervalSymbols_lkt;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ln_AO = dateIntervalSymbols.DateIntervalSymbols_ln;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ln_CD = dateIntervalSymbols.DateIntervalSymbols_ln;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ln_CF = dateIntervalSymbols.DateIntervalSymbols_ln;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ln_CG = dateIntervalSymbols.DateIntervalSymbols_ln;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_lo_LA = dateIntervalSymbols.DateIntervalSymbols_lo;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_lrc = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    '_': 'y MMMM d, EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    '_': 'y MMMM d'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'y-M-d HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'y-M-d HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'y-M-d HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'y-M-d HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'y MMMM d, EEEE HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'y MMMM d HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'y-MM-dd HH:mm–HH:mm',
    '_': 'y-MM-dd HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_lrc_IQ = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    '_': 'y MMMM d, EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    '_': 'y MMMM d'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'y-M-d h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'y-M-d h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'y-M-d h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'y-M-d h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'y MMMM d, EEEE h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'y MMMM d h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'a': 'y-MM-dd h:mm a – h:mm a',
    'hm': 'y-MM-dd h:mm–h:mm a',
    '_': 'y-MM-dd h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_lrc_IR = DateIntervalSymbols_lrc;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_lt_LT = dateIntervalSymbols.DateIntervalSymbols_lt;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_lu = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'd/M/y HH:mm–HH:mm',
    '_': 'd/M/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_lu_CD = DateIntervalSymbols_lu;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_luo = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_luo_KE = DateIntervalSymbols_luo;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_luy = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_luy_KE = DateIntervalSymbols_luy;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_lv_LV = dateIntervalSymbols.DateIntervalSymbols_lv;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mai = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Mdy': 'yy-MM-dd – yy-MM-dd',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'dd-MM-y G, h:mm:ss a zzzz',
    'Mdy': 'd/M/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'dd-MM-y G, h:mm:ss a z',
    'Mdy': 'd/M/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'dd-MM-y G, h:mm:ss a',
    'Mdy': 'd/M/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'dd-MM-y G, h:mm a',
    'Mdy': 'd/M/y, h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y के h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y के h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd-MM-yy G, h:mm a',
    'a': 'd/M/yy, h:mm a – h:mm a',
    'hm': 'd/M/yy, h:mm–h:mm a',
    '_': 'd/M/yy, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mai_IN = DateIntervalSymbols_mai;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mas = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mas_KE = DateIntervalSymbols_mas;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mas_TZ = DateIntervalSymbols_mas;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mer = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mer_KE = DateIntervalSymbols_mer;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mfe = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM, y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'd/M/y HH:mm–HH:mm',
    '_': 'd/M/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mfe_MU = DateIntervalSymbols_mfe;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mg = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'y-MM-dd HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'y-MM-dd HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'y-MM-dd HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'y-MM-dd HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'y-MM-dd HH:mm–HH:mm',
    '_': 'y-MM-dd HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mg_MG = DateIntervalSymbols_mg;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mgh = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mgh_MZ = DateIntervalSymbols_mgh;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mgo = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, y MMMM dd'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'y MMMM d'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'y-M-d HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'y-M-d HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'y-M-d HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'y-M-d HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, y MMMM dd HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'y MMMM d HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'y-MM-dd HH:mm–HH:mm',
    '_': 'y-MM-dd HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mgo_CM = DateIntervalSymbols_mgo;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mi = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd-MM-y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'dd-MM-y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'dd-MM-y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'dd-MM-y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'dd-MM-y h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'a': 'dd-MM-y h:mm a – h:mm a',
    'hm': 'dd-MM-y h:mm–h:mm a',
    '_': 'dd-MM-y h:mm a'
  },
  FALLBACK: '{0} ki te {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mi_NZ = DateIntervalSymbols_mi;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mk_MK = dateIntervalSymbols.DateIntervalSymbols_mk;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ml_IN = dateIntervalSymbols.DateIntervalSymbols_ml;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mn_MN = dateIntervalSymbols.DateIntervalSymbols_mn;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mni = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'MMMM d, y, EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'MMMM d, y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'MMM d, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Mdy': 'yy-MM-dd – yy-MM-dd',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'GGGGG dd-MM-y, h:mm:ss a zzzz',
    'Mdy': 'd/M/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG dd-MM-y, h:mm:ss a z',
    'Mdy': 'd/M/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG dd-MM-y, h:mm:ss a',
    'Mdy': 'd/M/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG dd-MM-y, h:mm a',
    'Mdy': 'd/M/y, h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'MMMM d, y, EEEE গী h:mm:ss a zzzz দা'
  },
  LONG_DATETIME: {
    '_': 'MMMM d, y গী h:mm:ss a z দা'
  },
  MEDIUM_DATETIME: {
    '_': 'MMM d, y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG dd-MM-yy, h:mm a',
    'a': 'd/M/yy, h:mm a – h:mm a',
    'hm': 'd/M/yy, h:mm–h:mm a',
    '_': 'd/M/yy, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mni_Beng = DateIntervalSymbols_mni;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mni_Beng_IN = DateIntervalSymbols_mni;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mr_IN = dateIntervalSymbols.DateIntervalSymbols_mr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ms_BN = {
  FULL_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM, y',
    'd': 'd–d MMMM y',
    'y': 'd MMMM y – d MMMM y',
    '_': 'dd MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM, y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM, y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd/M/yy GGGGG – d/M/yy GGGGG',
    'Mdy': 'd/M/yy – d/M/yy',
    '_': 'd/MM/yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd, h:mm:ss a zzzz',
    'Mdy': 'd/M/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd, h:mm:ss a z',
    'Mdy': 'd/M/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd, h:mm:ss a',
    'Mdy': 'd/M/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd, h:mm a',
    'Mdy': 'd/M/y, h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'dd MMMM y \'pada\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'pada\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd, h:mm a',
    'a': 'd/MM/yy, h:mm a – h:mm a',
    'hm': 'd/MM/yy, h:mm–h:mm a',
    '_': 'd/MM/yy, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ms_ID = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'Md': 'EEEE, d MMMM – EEEE, d MMMM y',
    'y': 'EEEE, d MMMM y – EEEE, d MMMM y',
    '_': 'EEEE, dd MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM, y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM, y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd/M/yy GGGGG – d/M/yy GGGGG',
    'Mdy': 'd/M/yy – d/M/yy',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd, HH.mm.ss zzzz',
    'Mdy': 'd/M/y, HH.mm.ss zzzz',
    '_': 'HH.mm.ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd, HH.mm.ss z',
    'Mdy': 'd/M/y, HH.mm.ss z',
    '_': 'HH.mm.ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd, HH.mm.ss',
    'Mdy': 'd/M/y, HH.mm.ss',
    '_': 'HH.mm.ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd, HH.mm',
    'Mdy': 'd/M/y, HH.mm',
    'ahm': 'HH.mm–HH.mm',
    '_': 'HH.mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, dd MMMM y \'pada\' HH.mm.ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'pada\' HH.mm.ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH.mm.ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd, HH.mm',
    'ahm': 'dd/MM/yy, HH.mm–HH.mm',
    '_': 'dd/MM/yy, HH.mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ms_MY = dateIntervalSymbols.DateIntervalSymbols_ms;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ms_SG = dateIntervalSymbols.DateIntervalSymbols_ms;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mt_MT = dateIntervalSymbols.DateIntervalSymbols_mt;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mua = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'd/M/y HH:mm–HH:mm',
    '_': 'd/M/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mua_CM = DateIntervalSymbols_mua;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_my_MM = dateIntervalSymbols.DateIntervalSymbols_my;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mzn = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'y MMMM d, EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'y MMMM d'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'y-M-d HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'y-M-d HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'y-M-d HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'y-M-d HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'y MMMM d, EEEE HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'y MMMM d HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'y-MM-dd HH:mm–HH:mm',
    '_': 'y-MM-dd HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_mzn_IR = DateIntervalSymbols_mzn;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_naq = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'd/M/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'd/M/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'd/M/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'd/M/y h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'a': 'dd/MM/y h:mm a – h:mm a',
    'hm': 'dd/MM/y h:mm–h:mm a',
    '_': 'dd/MM/y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_naq_NA = DateIntervalSymbols_naq;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_nb_NO = dateIntervalSymbols.DateIntervalSymbols_nb;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_nb_SJ = dateIntervalSymbols.DateIntervalSymbols_nb;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_nd = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_nd_ZW = DateIntervalSymbols_nd;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ne_IN = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    '_': 'y MMMM d, EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    '_': 'y MMMM d'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Mdy': 'yy-MM-dd – yy-MM-dd',
    '_': 'yy/M/d'
  },
  FULL_TIME: {
    'G': 'M/d/y GGGGG, h:mm:ss a zzzz',
    'Mdy': 'y-MM-dd, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'M/d/y GGGGG, h:mm:ss a z',
    'Mdy': 'y-MM-dd, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'M/d/y GGGGG, h:mm:ss a',
    'Mdy': 'y-MM-dd, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'M/d/y GGGGG, h:mm a',
    'Mdy': 'y-MM-dd, h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'y MMMM d, EEEE: h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'y MMMM d: h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'M/d/yy GGGGG, h:mm a',
    'a': 'yy/M/d, h:mm a – h:mm a',
    'hm': 'yy/M/d, h:mm–h:mm a',
    '_': 'yy/M/d, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ne_NP = dateIntervalSymbols.DateIntervalSymbols_ne;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_nl_AW = dateIntervalSymbols.DateIntervalSymbols_nl;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_nl_BE = {
  FULL_DATE: {
    'G': 'EEEE d MMMM y G – EEEE d MMMM y G',
    'M': 'EEEE d MMMM – EEEE d MMMM y',
    'd': 'EEEE d – EEEE d MMMM y',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd-M-y GGGGG – d-M-y GGGGG',
    '_': 'd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y \'om\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'om\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd/MM/y GGGGG HH:mm',
    'ahm': 'd/MM/y HH:mm–HH:mm',
    '_': 'd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_nl_BQ = dateIntervalSymbols.DateIntervalSymbols_nl;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_nl_CW = dateIntervalSymbols.DateIntervalSymbols_nl;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_nl_NL = dateIntervalSymbols.DateIntervalSymbols_nl;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_nl_SR = dateIntervalSymbols.DateIntervalSymbols_nl;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_nl_SX = dateIntervalSymbols.DateIntervalSymbols_nl;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_nmg = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'd/M/y HH:mm–HH:mm',
    '_': 'd/M/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_nmg_CM = DateIntervalSymbols_nmg;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_nn = {
  FULL_DATE: {
    'G': 'EEEE d. MMMM y G–EEEE d. MMMM y G',
    'M': 'EEEE d. MMMM–EEEE d. MMMM y',
    'd': 'EEEE d.–EEEE d. MMMM y',
    '_': 'EEEE d. MMMM y'
  },
  LONG_DATE: {
    'G': 'd. MMMM y G–d. MMMM y G',
    'M': 'd. MMMM–d. MMMM y',
    'd': 'd.–d. MMMM y',
    '_': 'd. MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd. MMM y G–d. MMM y G',
    'M': 'd. MMM–d. MMM y',
    'd': 'd.–d. MMM y',
    '_': 'd. MMM y'
  },
  SHORT_DATE: {
    'G': 'dd.MM.y GGGGG–dd.MM.y GGGGG',
    '_': 'dd.MM.y'
  },
  FULL_TIME: {
    'G': 'dd.MM.y GGGGG, \'kl\'. HH:mm:ss zzzz',
    'Mdy': 'd.M.y, \'kl\'. HH:mm:ss zzzz',
    '_': '\'kl\'. HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'dd.MM.y GGGGG, \'kl\'. HH:mm:ss z',
    'Mdy': 'd.M.y, \'kl\'. HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'dd.MM.y GGGGG, HH:mm:ss',
    'Mdy': 'd.M.y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'dd.MM.y GGGGG, HH:mm',
    'Mdy': 'd.M.y, HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d. MMMM y \'kl\'. \'kl\'. HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd. MMMM y \'kl\'. HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd. MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd.MM.y GGGGG, HH:mm',
    'ahm': 'dd.MM.y, HH:mm–HH:mm',
    '_': 'dd.MM.y, HH:mm'
  },
  FALLBACK: '{0}–{1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_nn_NO = DateIntervalSymbols_nn;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_nnh = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE , \'lyɛ\'̌ʼ d \'na\' MMMM, y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': '\'lyɛ\'̌ʼ d \'na\' MMMM, y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Mdy': 'yy-MM-dd – yy-MM-dd',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE , \'lyɛ\'̌ʼ d \'na\' MMMM, y,HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': '\'lyɛ\'̌ʼ d \'na\' MMMM, y, HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM, y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd HH:mm',
    'ahm': 'dd/MM/yy HH:mm–HH:mm',
    '_': 'dd/MM/yy HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_nnh_CM = DateIntervalSymbols_nnh;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_nus = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd zzzz h:mm:ss a',
    'Mdy': 'd/M/y zzzz h:mm:ss a',
    '_': 'zzzz h:mm:ss a'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd z h:mm:ss a',
    'Mdy': 'd/M/y z h:mm:ss a',
    '_': 'z h:mm:ss a'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'd/M/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'd/M/y h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y zzzz h:mm:ss a'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y z h:mm:ss a'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'a': 'd/MM/y h:mm a – h:mm a',
    'hm': 'd/MM/y h:mm–h:mm a',
    '_': 'd/MM/y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_nus_SS = DateIntervalSymbols_nus;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_nyn = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_nyn_UG = DateIntervalSymbols_nyn;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_om = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, MMMM d, y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'dd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'dd-MMM-y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Mdy': 'yy-MM-dd – yy-MM-dd',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'y-MM-dd h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'y-MM-dd h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'y-MM-dd h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'y-MM-dd h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, MMMM d, y h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'dd MMMM y h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd-MMM-y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd h:mm a',
    'a': 'dd/MM/yy h:mm a – h:mm a',
    'hm': 'dd/MM/yy h:mm–h:mm a',
    '_': 'dd/MM/yy h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_om_ET = DateIntervalSymbols_om;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_om_KE = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, MMMM d, y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'dd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'dd-MMM-y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Mdy': 'yy-MM-dd – yy-MM-dd',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'y-MM-dd HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'y-MM-dd HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'y-MM-dd HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'y-MM-dd HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, MMMM d, y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'dd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd-MMM-y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd HH:mm',
    'ahm': 'dd/MM/yy HH:mm–HH:mm',
    '_': 'dd/MM/yy HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_or_IN = dateIntervalSymbols.DateIntervalSymbols_or;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_os = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM, y \'аз\''
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM, y \'аз\''
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'dd MMM y \'аз\''
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Mdy': 'yy-MM-dd – yy-MM-dd',
    '_': 'dd.MM.yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd, HH:mm:ss zzzz',
    'Mdy': 'd.M.y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd, HH:mm:ss z',
    'Mdy': 'd.M.y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd, HH:mm:ss',
    'Mdy': 'd.M.y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd, HH:mm',
    'Mdy': 'd.M.y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM, y \'аз\', HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM, y \'аз\', HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd MMM y \'аз\', HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd, HH:mm',
    'ahm': 'dd.MM.yy, HH:mm–HH:mm',
    '_': 'dd.MM.yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_os_GE = DateIntervalSymbols_os;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_os_RU = DateIntervalSymbols_os;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_pa_Arab = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, dd MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'd/M/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'd/M/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'd/M/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'd/M/y h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, dd MMMM y h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'a': 'dd/MM/y h:mm a – h:mm a',
    'hm': 'dd/MM/y h:mm–h:mm a',
    '_': 'dd/MM/y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_pa_Arab_PK = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, dd MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'd/M/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'd/M/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'd/M/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'd/M/y h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, dd MMMM y h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'a': 'dd/MM/y h:mm a – h:mm a',
    'hm': 'dd/MM/y h:mm–h:mm a',
    '_': 'dd/MM/y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_pa_Guru = dateIntervalSymbols.DateIntervalSymbols_pa;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_pa_Guru_IN = dateIntervalSymbols.DateIntervalSymbols_pa;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_pcm = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'd MMMM – d MMMM y',
    'd': 'd – d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'd MMM – d MMM y',
    'd': 'd – d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'H:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'fọ\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'fọ\' H:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_pcm_NG = DateIntervalSymbols_pcm;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_pl_PL = dateIntervalSymbols.DateIntervalSymbols_pl;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ps = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE د y د MMMM d'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'MMMM d, y – MMMM d, y',
    '_': 'د y د MMMM d'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'MMM d, y – MMM d, y',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'y/M/d'
  },
  FULL_TIME: {
    'G': 'M/d/y GGGGG H:mm:ss (zzzz)',
    'Mdy': 'y-MM-dd H:mm:ss (zzzz)',
    '_': 'H:mm:ss (zzzz)'
  },
  LONG_TIME: {
    'G': 'M/d/y GGGGG H:mm:ss (z)',
    'Mdy': 'y-MM-dd H:mm:ss (z)',
    '_': 'H:mm:ss (z)'
  },
  MEDIUM_TIME: {
    'G': 'M/d/y GGGGG H:mm:ss',
    'Mdy': 'y-MM-dd H:mm:ss',
    '_': 'H:mm:ss'
  },
  SHORT_TIME: {
    'G': 'M/d/y GGGGG H:mm',
    'Mdy': 'y-MM-dd H:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'H:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE د y د MMMM d H:mm:ss (zzzz)'
  },
  LONG_DATETIME: {
    '_': 'د y د MMMM d H:mm:ss (z)'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d H:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'M/d/y GGGGG H:mm',
    'ahm': 'y-MM-dd HH:mm–HH:mm',
    '_': 'y/M/d H:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ps_AF = DateIntervalSymbols_ps;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ps_PK = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE د y د MMMM d'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'MMMM d, y – MMMM d, y',
    '_': 'د y د MMMM d'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'MMM d, y – MMM d, y',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'y/M/d'
  },
  FULL_TIME: {
    'G': 'M/d/y GGGGG h:mm:ss a zzzz',
    'Mdy': 'y-MM-dd h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'M/d/y GGGGG h:mm:ss a z',
    'Mdy': 'y-MM-dd h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'M/d/y GGGGG h:mm:ss a',
    'Mdy': 'y-MM-dd h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'M/d/y GGGGG h:mm a',
    'Mdy': 'y-MM-dd h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE د y د MMMM d h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'د y د MMMM d h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'M/d/y GGGGG h:mm a',
    'a': 'y-MM-dd h:mm a – h:mm a',
    'hm': 'y-MM-dd h:mm–h:mm a',
    '_': 'y/M/d h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_pt_AO = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd/M/y GGGGG – d/M/y GGGGG',
    '_': 'dd/MM/y'
  },
  SHORT_DATE: {
    'G': 'd/M/yy GGGGG – d/M/yy GGGGG',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y \'às\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y \'às\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd/MM/y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/yy GGGGG, HH:mm',
    'ahm': 'dd/MM/yy, HH:mm – HH:mm',
    '_': 'dd/MM/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_pt_CH = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd/M/y GGGGG – d/M/y GGGGG',
    '_': 'dd/MM/y'
  },
  SHORT_DATE: {
    'G': 'd/M/yy GGGGG – d/M/yy GGGGG',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y \'às\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y \'às\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd/MM/y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/yy GGGGG, HH:mm',
    'ahm': 'dd/MM/yy, HH:mm – HH:mm',
    '_': 'dd/MM/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_pt_CV = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd/M/y GGGGG – d/M/y GGGGG',
    '_': 'dd/MM/y'
  },
  SHORT_DATE: {
    'G': 'd/M/yy GGGGG – d/M/yy GGGGG',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y \'às\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y \'às\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd/MM/y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/yy GGGGG, HH:mm',
    'ahm': 'dd/MM/yy, HH:mm – HH:mm',
    '_': 'dd/MM/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_pt_GQ = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd/M/y GGGGG – d/M/y GGGGG',
    '_': 'dd/MM/y'
  },
  SHORT_DATE: {
    'G': 'd/M/yy GGGGG – d/M/yy GGGGG',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y \'às\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y \'às\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd/MM/y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/yy GGGGG, HH:mm',
    'ahm': 'dd/MM/yy, HH:mm – HH:mm',
    '_': 'dd/MM/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_pt_GW = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd/M/y GGGGG – d/M/y GGGGG',
    '_': 'dd/MM/y'
  },
  SHORT_DATE: {
    'G': 'd/M/yy GGGGG – d/M/yy GGGGG',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y \'às\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y \'às\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd/MM/y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/yy GGGGG, HH:mm',
    'ahm': 'dd/MM/yy, HH:mm – HH:mm',
    '_': 'dd/MM/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_pt_LU = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd/M/y GGGGG – d/M/y GGGGG',
    '_': 'dd/MM/y'
  },
  SHORT_DATE: {
    'G': 'd/M/yy GGGGG – d/M/yy GGGGG',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y \'às\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y \'às\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd/MM/y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/yy GGGGG, HH:mm',
    'ahm': 'dd/MM/yy, HH:mm – HH:mm',
    '_': 'dd/MM/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_pt_MO = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd/M/y GGGGG – d/M/y GGGGG',
    '_': 'dd/MM/y'
  },
  SHORT_DATE: {
    'G': 'd/M/yy GGGGG – d/M/yy GGGGG',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'dd/MM/y GGGGG, h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'dd/MM/y GGGGG, h:mm:ss a z',
    'Mdy': 'dd/MM/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'dd/MM/y GGGGG, h:mm:ss a',
    'Mdy': 'dd/MM/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'dd/MM/y GGGGG, h:mm a',
    'Mdy': 'dd/MM/y, h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y \'às\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y \'às\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd/MM/y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/yy GGGGG, h:mm a',
    'a': 'dd/MM/yy, h:mm a – h:mm a',
    'hm': 'dd/MM/yy, h:mm – h:mm a',
    '_': 'dd/MM/yy, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_pt_MZ = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd/M/y GGGGG – d/M/y GGGGG',
    '_': 'dd/MM/y'
  },
  SHORT_DATE: {
    'G': 'd/M/yy GGGGG – d/M/yy GGGGG',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y \'às\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y \'às\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd/MM/y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/yy GGGGG, HH:mm',
    'ahm': 'dd/MM/yy, HH:mm – HH:mm',
    '_': 'dd/MM/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_pt_ST = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd/M/y GGGGG – d/M/y GGGGG',
    '_': 'dd/MM/y'
  },
  SHORT_DATE: {
    'G': 'd/M/yy GGGGG – d/M/yy GGGGG',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y \'às\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y \'às\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd/MM/y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/yy GGGGG, HH:mm',
    'ahm': 'dd/MM/yy, HH:mm – HH:mm',
    '_': 'dd/MM/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_pt_TL = {
  FULL_DATE: {
    'Md': 'EEEE, d \'de\' MMMM – EEEE, d \'de\' MMMM \'de\' y',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd \'de\' MMMM – d \'de\' MMMM \'de\' y',
    'd': 'd–d \'de\' MMMM \'de\' y',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'd/M/y GGGGG – d/M/y GGGGG',
    '_': 'dd/MM/y'
  },
  SHORT_DATE: {
    'G': 'd/M/yy GGGGG – d/M/yy GGGGG',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y \'às\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y \'às\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd/MM/y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/yy GGGGG, HH:mm',
    'ahm': 'dd/MM/yy, HH:mm – HH:mm',
    '_': 'dd/MM/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_qu = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'Md': 'EEEE, d MMMM – EEEE, d MMMM, y',
    '_': 'EEEE, d MMMM, y'
  },
  LONG_DATE: {
    'G': 'd, MMMM y G – d, MMMM y G',
    'M': 'd MMMM – d MMMM, y',
    'd': 'd – d MMMM, y',
    'y': 'd MMMM, y – d MMMM, y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd, MMM y G – d, MMM y G',
    'M': 'd MMM – d MMM, y',
    'd': 'd – d MMM, y',
    'y': 'd MMM, y – d MMM, y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'd/M/y – d/M/y',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'dd-MM-y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'dd-MM-y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'dd-MM-y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'dd-MM-y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM, y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_qu_BO = DateIntervalSymbols_qu;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_qu_EC = DateIntervalSymbols_qu;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_qu_PE = DateIntervalSymbols_qu;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_raj = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'y MMMM d, EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'y MMMM d'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'y-M-d h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'y-M-d h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'y-M-d h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'y-M-d h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'y MMMM d, EEEE h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'y MMMM d h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'a': 'y-MM-dd h:mm a – h:mm a',
    'hm': 'y-MM-dd h:mm–h:mm a',
    '_': 'y-MM-dd h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_raj_IN = DateIntervalSymbols_raj;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_rm = {
  FULL_DATE: {
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d. – EEEE, d MMMM y',
    'y': 'EEEE, d MMMM y – EEEE, d MMMM y',
    '_': 'EEEE, \'ils\' d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'd MMMM – d MMMM y',
    'd': 'd.–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    '_': 'dd-MM-y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    '_': 'dd-MM-yy'
  },
  FULL_TIME: {
    'G': 'dd-MM-y GGGGG HH:mm:ss zzzz',
    'Mdy': 'dd-MM-y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'dd-MM-y GGGGG HH:mm:ss z',
    'Mdy': 'dd-MM-y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'dd-MM-y GGGGG HH:mm:ss',
    'Mdy': 'dd-MM-y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'dd-MM-y GGGGG HH:mm',
    'Mdy': 'dd-MM-y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, \'ils\' d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd-MM-y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd-MM-yy GGGGG HH:mm',
    'ahm': 'dd-MM-yy HH:mm–HH:mm',
    '_': 'dd-MM-yy HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_rm_CH = DateIntervalSymbols_rm;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_rn = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'd/M/y HH:mm–HH:mm',
    '_': 'd/M/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_rn_BI = DateIntervalSymbols_rn;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ro_MD = dateIntervalSymbols.DateIntervalSymbols_ro;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ro_RO = dateIntervalSymbols.DateIntervalSymbols_ro;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_rof = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_rof_TZ = DateIntervalSymbols_rof;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ru_BY = dateIntervalSymbols.DateIntervalSymbols_ru;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ru_KG = dateIntervalSymbols.DateIntervalSymbols_ru;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ru_KZ = dateIntervalSymbols.DateIntervalSymbols_ru;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ru_MD = dateIntervalSymbols.DateIntervalSymbols_ru;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ru_RU = dateIntervalSymbols.DateIntervalSymbols_ru;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ru_UA = {
  FULL_DATE: {
    'G': 'ccc, d MMMM y \'г\'. G – ccc, d MMMM y \'г\'. G',
    'M': 'ccc, d MMMM – ccc, d MMMM y \'г\'.',
    'd': 'ccc, d – ccc, d MMMM y \'г\'.',
    'y': 'ccc, d MMMM y – ccc, d MMMM y',
    '_': 'EEEE, d MMMM y \'г\'.'
  },
  LONG_DATE: {
    'G': 'd MMMM y \'г\'. G – d MMMM y \'г\'. G',
    'M': 'd MMMM – d MMMM y \'г\'.',
    'd': 'd–d MMMM y \'г\'.',
    'y': 'd MMMM y – d MMMM y',
    '_': 'd MMMM y \'г\'.'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y \'г\'. G – d MMM y \'г\'. G',
    'M': 'd MMM – d MMM y \'г\'.',
    'd': 'd–d MMM y \'г\'.',
    'y': 'd MMM y – d MMM y',
    '_': 'd MMM y \'г\'.'
  },
  SHORT_DATE: {
    'G': 'dd.MM.y G – dd.MM.y G',
    '_': 'dd.MM.y'
  },
  FULL_TIME: {
    'G': 'dd.MM.y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'dd.MM.y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'dd.MM.y GGGGG, HH:mm:ss z',
    'Mdy': 'dd.MM.y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'dd.MM.y GGGGG, HH:mm:ss',
    'Mdy': 'dd.MM.y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'dd.MM.y GGGGG, HH:mm',
    'Mdy': 'dd.MM.y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'г\'. \'в\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'г\'. \'в\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y \'г\'., HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd.MM.y GGGGG, HH:mm',
    'ahm': 'dd.MM.y, HH:mm–HH:mm',
    '_': 'dd.MM.y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_rw = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    '_': 'y MMMM d, EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    '_': 'y MMMM d'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'y-MM-dd HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'y-MM-dd HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'y-MM-dd HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'y-MM-dd HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'y MMMM d, EEEE HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'y MMMM d HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'y-MM-dd HH:mm–HH:mm',
    '_': 'y-MM-dd HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_rw_RW = DateIntervalSymbols_rw;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_rwk = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_rwk_TZ = DateIntervalSymbols_rwk;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sa = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Mdy': 'yy-MM-dd – yy-MM-dd',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd, h:mm:ss a zzzz',
    'Mdy': 'd/M/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd, h:mm:ss a z',
    'Mdy': 'd/M/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd, h:mm:ss a',
    'Mdy': 'd/M/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd, h:mm a',
    'Mdy': 'd/M/y, h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y तदा h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y तदा h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd, h:mm a',
    'a': 'd/M/yy, h:mm a – h:mm a',
    'hm': 'd/M/yy, h:mm–h:mm a',
    '_': 'd/M/yy, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sa_IN = DateIntervalSymbols_sa;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sah = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'y \'сыл\' MMMM d \'күнэ\', EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'y, MMMM d'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'y, MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'My': 'yy-MM-dd – yy-MM-dd',
    'd': 'dd.MM.yy – dd.MM.yy',
    '_': 'yy/M/d'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'y-MM-dd HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'y-MM-dd HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'y-MM-dd HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'y-MM-dd HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'y \'сыл\' MMMM d \'күнэ\', EEEE HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'y, MMMM d HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'y, MMM d HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd HH:mm',
    'ahm': 'yy/M/d HH:mm–HH:mm',
    '_': 'yy/M/d HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sah_RU = DateIntervalSymbols_sah;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_saq = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_saq_KE = DateIntervalSymbols_saq;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sat = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Mdy': 'yy-MM-dd – yy-MM-dd',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'd/M/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'd/M/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'd/M/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'd/M/y h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd h:mm a',
    'a': 'd/M/yy h:mm a – h:mm a',
    'hm': 'd/M/yy h:mm–h:mm a',
    '_': 'd/M/yy h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sat_Olck = DateIntervalSymbols_sat;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sat_Olck_IN = DateIntervalSymbols_sat;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sbp = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'M/d/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'M/d/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'M/d/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'M/d/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sbp_TZ = DateIntervalSymbols_sbp;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sc = {
  FULL_DATE: {
    'G': 'EEEE d MMMM y G – EEEE d MMMM y G',
    'Md': 'EEEE d MMMM – EEEE d MMMM y',
    'y': 'EEEE d MMMM y – EEEE d MMMM y',
    '_': 'EEEE d \'de\' MMMM \'de\' \'su\' y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'dd MMMM – dd MMMM y',
    'd': 'dd–dd MMMM y',
    'y': 'dd MMMM y – dd MMMM y',
    '_': 'd \'de\' MMMM \'de\' \'su\' y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'dd MMM – dd MMM y',
    'd': 'dd–dd MMM y',
    'y': 'dd MMM y – dd MMM y',
    '_': 'd \'de\' MMM y'
  },
  SHORT_DATE: {
    'G': 'dd/MM/y GGGGG – dd/MM/y GGGGG',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss z',
    'Mdy': 'dd/MM/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm:ss',
    'Mdy': 'dd/MM/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'dd/MM/y GGGGG, HH:mm',
    'Mdy': 'dd/MM/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d \'de\' MMMM \'de\' \'su\' y \'a\' \'sas\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' \'su\' y \'a\' \'sas\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd \'de\' MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y GGGGG, HH:mm',
    'ahm': 'dd/MM/y, HH:mm–HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sc_IT = DateIntervalSymbols_sc;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sd = {
  FULL_DATE: {
    'G': 'EEEE, MMMM d, y G – EEEE, MMMM d, y G',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, MMMM d, y'
  },
  LONG_DATE: {
    'G': 'MMMM d, y G – MMMM d, y G',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    '_': 'y MMMM d'
  },
  MEDIUM_DATE: {
    'G': 'MMM d, y G – MMM d, y G',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'M/d/y GGGGG – M/d/y GGGGG',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'M/d/y GGGGG h:mm:ss a zzzz',
    'Mdy': 'y-MM-dd h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'M/d/y GGGGG h:mm:ss a z',
    'Mdy': 'y-MM-dd h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'M/d/y GGGGG h:mm:ss a',
    'Mdy': 'y-MM-dd h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'M/d/y GGGGG h:mm a',
    'Mdy': 'y-MM-dd h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, MMMM d, y h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'y MMMM d h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'MM/dd/y GGGGG h:mm a',
    'a': 'y-MM-dd h:mm a – h:mm a',
    'hm': 'y-MM-dd h:mm–h:mm a',
    '_': 'y-MM-dd h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sd_Arab = DateIntervalSymbols_sd;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sd_Arab_PK = DateIntervalSymbols_sd;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sd_Deva = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, MMMM d, y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'MMMM d, y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'MMM d, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Mdy': 'yy-MM-dd – yy-MM-dd',
    '_': 'M/d/yy'
  },
  FULL_TIME: {
    'G': 'M/d/y GGGGG, h:mm:ss a zzzz',
    'Mdy': 'M/d/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'M/d/y GGGGG, h:mm:ss a z',
    'Mdy': 'M/d/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'M/d/y GGGGG, h:mm:ss a',
    'Mdy': 'M/d/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'M/d/y GGGGG, h:mm a',
    'Mdy': 'M/d/y, h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, MMMM d, y ते h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'MMMM d, y ते h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'MMM d, y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'M/d/yy GGGGG, h:mm a',
    'a': 'M/d/yy, h:mm a – h:mm a',
    'hm': 'M/d/yy, h:mm–h:mm a',
    '_': 'M/d/yy, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sd_Deva_IN = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, MMMM d, y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'MMMM d, y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'MMM d, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Mdy': 'yy-MM-dd – yy-MM-dd',
    '_': 'M/d/yy'
  },
  FULL_TIME: {
    'G': 'M/d/y GGGGG, h:mm:ss a zzzz',
    'Mdy': 'M/d/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'M/d/y GGGGG, h:mm:ss a z',
    'Mdy': 'M/d/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'M/d/y GGGGG, h:mm:ss a',
    'Mdy': 'M/d/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'M/d/y GGGGG, h:mm a',
    'Mdy': 'M/d/y, h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, MMMM d, y ते h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'MMMM d, y ते h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'MMM d, y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'M/d/yy GGGGG, h:mm a',
    'a': 'M/d/yy, h:mm a – h:mm a',
    'hm': 'M/d/yy, h:mm–h:mm a',
    '_': 'M/d/yy, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_se = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    '_': 'y MMMM d, EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    '_': 'y MMMM d'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'y-MM-dd HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'y-MM-dd HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'y-MM-dd HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'y-MM-dd HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'y MMMM d, EEEE HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'y MMMM d HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'y-MM-dd HH:mm–HH:mm',
    '_': 'y-MM-dd HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_se_FI = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'EEEE d MMMM – EEEE d MMMM y',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'd.M.y – d.M.y',
    '_': 'dd.MM.y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'dd.MM.y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'dd.MM.y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'dd.MM.y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'dd.MM.y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd.MM.y HH:mm–HH:mm',
    '_': 'dd.MM.y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_se_NO = DateIntervalSymbols_se;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_se_SE = DateIntervalSymbols_se;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_seh = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d \'de\' MMMM \'de\' y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd \'de\' MMMM \'de\' y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd \'de\' MMM \'de\' y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d \'de\' MMMM \'de\' y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd \'de\' MMMM \'de\' y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd \'de\' MMM \'de\' y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'd/M/y HH:mm–HH:mm',
    '_': 'd/M/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_seh_MZ = DateIntervalSymbols_seh;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ses = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM, y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'd/M/y HH:mm–HH:mm',
    '_': 'd/M/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ses_ML = DateIntervalSymbols_ses;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sg = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM, y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'd/M/y HH:mm–HH:mm',
    '_': 'd/M/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sg_CF = DateIntervalSymbols_sg;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_shi = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM, y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'd/M/y HH:mm–HH:mm',
    '_': 'd/M/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_shi_Latn = DateIntervalSymbols_shi;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_shi_Latn_MA = DateIntervalSymbols_shi;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_shi_Tfng = DateIntervalSymbols_shi;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_shi_Tfng_MA = DateIntervalSymbols_shi;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_si_LK = dateIntervalSymbols.DateIntervalSymbols_si;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sk_SK = dateIntervalSymbols.DateIntervalSymbols_sk;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sl_SI = dateIntervalSymbols.DateIntervalSymbols_sl;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_smn = {
  FULL_DATE: {
    '_': 'cccc, MMMM d. y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'MMMM d. – MMMM d. y',
    'd': 'MMMM d.–d. y',
    'y': 'MMMM d. y – MMMM d. y',
    '_': 'MMMM d. y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'MMMM d. – MMMM d. y',
    'd': 'MMMM d.–d. y',
    'y': 'MMMM d. y – MMMM d. y',
    '_': 'MMM d. y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'M': 'd.M.–d.M.y',
    'd': 'd. – d.M.y',
    '_': 'd.M.y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd H.mm.ss zzzz',
    'Mdy': 'd.M.y H.mm.ss zzzz',
    '_': 'H.mm.ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd H.mm.ss z',
    'Mdy': 'd.M.y H.mm.ss z',
    '_': 'H.mm.ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd H.mm.ss',
    'Mdy': 'd.M.y H.mm.ss',
    '_': 'H.mm.ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd H.mm',
    'Mdy': 'd.M.y H.mm',
    '_': 'H.mm'
  },
  FULL_DATETIME: {
    '_': 'cccc, MMMM d. y \'tme\' H.mm.ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'MMMM d. y \'tme\' H.mm.ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'MMM d. y \'tme\' H.mm.ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd H.mm',
    'ahm': 'd.M.y H.mm–H.mm',
    '_': 'd.M.y H.mm'
  },
  FALLBACK: '{0}–{1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_smn_FI = DateIntervalSymbols_smn;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sn = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    '_': 'y MMMM d, EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    '_': 'y MMMM d'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'y-MM-dd HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'y-MM-dd HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'y-MM-dd HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'y-MM-dd HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'y MMMM d, EEEE HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'y MMMM d HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'y-MM-dd HH:mm–HH:mm',
    '_': 'y-MM-dd HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sn_ZW = DateIntervalSymbols_sn;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_so = {
  FULL_DATE: {
    'G': 'EEEE, MMMM d, y G – EEEE, MMMM d, y G',
    'Md': 'EEEE, MMMM dd – EEEE, MMMM dd, y',
    'y': 'EEEE, MMMM dd, y – EEEE, MMMM dd, y',
    '_': 'EEEE, MMMM d, y'
  },
  LONG_DATE: {
    'G': 'MMMM d, y G – MMMM d, y G',
    'M': 'dd MMMM – dd MMMM y',
    'd': 'dd–dd MMMM y',
    'y': 'dd MMMM y – dd MMMM y',
    '_': 'MMMM d, y'
  },
  MEDIUM_DATE: {
    'G': 'MMM d, y G – MMM d, y G',
    'M': 'dd MMM – dd MMM y',
    'd': 'dd–dd MMM y',
    'y': 'dd MMM y – dd MMM y',
    '_': 'dd-MMM-y'
  },
  SHORT_DATE: {
    'G': 'M/d/yy GGGGG – M/d/yy GGGGG',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'M/d/y GGGGG, h:mm:ss a zzzz',
    'Mdy': 'M/d/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'M/d/y GGGGG, h:mm:ss a z',
    'Mdy': 'M/d/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'M/d/y GGGGG, h:mm:ss a',
    'Mdy': 'M/d/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'M/d/y GGGGG, h:mm a',
    'Mdy': 'M/d/y, h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, MMMM d, y \'ee\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'MMMM d, y \'ee\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd-MMM-y \'ee\' h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'MM/dd/yy GGGGG, h:mm a',
    'a': 'dd/MM/yy h:mm a – h:mm a',
    'hm': 'dd/MM/yy h:mm–h:mm a',
    '_': 'dd/MM/yy, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_so_DJ = {
  FULL_DATE: {
    'G': 'EEEE, MMMM d, y G – EEEE, MMMM d, y G',
    'Md': 'EEEE, MMMM dd – EEEE, MMMM dd, y',
    'y': 'EEEE, MMMM dd, y – EEEE, MMMM dd, y',
    '_': 'EEEE, MMMM d, y'
  },
  LONG_DATE: {
    'G': 'MMMM d, y G – MMMM d, y G',
    'M': 'dd MMMM – dd MMMM y',
    'd': 'dd–dd MMMM y',
    'y': 'dd MMMM y – dd MMMM y',
    '_': 'MMMM d, y'
  },
  MEDIUM_DATE: {
    'G': 'MMM d, y G – MMM d, y G',
    'M': 'dd MMM – dd MMM y',
    'd': 'dd–dd MMM y',
    'y': 'dd MMM y – dd MMM y',
    '_': 'dd-MMM-y'
  },
  SHORT_DATE: {
    'G': 'M/d/yy GGGGG – M/d/yy GGGGG',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'M/d/y GGGGG, h:mm:ss a zzzz',
    'Mdy': 'M/d/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'M/d/y GGGGG, h:mm:ss a z',
    'Mdy': 'M/d/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'M/d/y GGGGG, h:mm:ss a',
    'Mdy': 'M/d/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'M/d/y GGGGG, h:mm a',
    'Mdy': 'M/d/y, h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, MMMM d, y \'ee\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'MMMM d, y \'ee\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd-MMM-y \'ee\' h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'MM/dd/yy GGGGG, h:mm a',
    'a': 'dd/MM/yy h:mm a – h:mm a',
    'hm': 'dd/MM/yy h:mm–h:mm a',
    '_': 'dd/MM/yy, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_so_ET = {
  FULL_DATE: {
    'G': 'EEEE, MMMM d, y G – EEEE, MMMM d, y G',
    'Md': 'EEEE, MMMM dd – EEEE, MMMM dd, y',
    'y': 'EEEE, MMMM dd, y – EEEE, MMMM dd, y',
    '_': 'EEEE, MMMM d, y'
  },
  LONG_DATE: {
    'G': 'MMMM d, y G – MMMM d, y G',
    'M': 'dd MMMM – dd MMMM y',
    'd': 'dd–dd MMMM y',
    'y': 'dd MMMM y – dd MMMM y',
    '_': 'MMMM d, y'
  },
  MEDIUM_DATE: {
    'G': 'MMM d, y G – MMM d, y G',
    'M': 'dd MMM – dd MMM y',
    'd': 'dd–dd MMM y',
    'y': 'dd MMM y – dd MMM y',
    '_': 'dd-MMM-y'
  },
  SHORT_DATE: {
    'G': 'M/d/yy GGGGG – M/d/yy GGGGG',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'M/d/y GGGGG, h:mm:ss a zzzz',
    'Mdy': 'M/d/y, h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'M/d/y GGGGG, h:mm:ss a z',
    'Mdy': 'M/d/y, h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'M/d/y GGGGG, h:mm:ss a',
    'Mdy': 'M/d/y, h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'M/d/y GGGGG, h:mm a',
    'Mdy': 'M/d/y, h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, MMMM d, y \'ee\' h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'MMMM d, y \'ee\' h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd-MMM-y \'ee\' h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'MM/dd/yy GGGGG, h:mm a',
    'a': 'dd/MM/yy h:mm a – h:mm a',
    'hm': 'dd/MM/yy h:mm–h:mm a',
    '_': 'dd/MM/yy, h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_so_KE = {
  FULL_DATE: {
    'G': 'EEEE, MMMM d, y G – EEEE, MMMM d, y G',
    'Md': 'EEEE, MMMM dd – EEEE, MMMM dd, y',
    'y': 'EEEE, MMMM dd, y – EEEE, MMMM dd, y',
    '_': 'EEEE, MMMM d, y'
  },
  LONG_DATE: {
    'G': 'MMMM d, y G – MMMM d, y G',
    'M': 'dd MMMM – dd MMMM y',
    'd': 'dd–dd MMMM y',
    'y': 'dd MMMM y – dd MMMM y',
    '_': 'MMMM d, y'
  },
  MEDIUM_DATE: {
    'G': 'MMM d, y G – MMM d, y G',
    'M': 'dd MMM – dd MMM y',
    'd': 'dd–dd MMM y',
    'y': 'dd MMM y – dd MMM y',
    '_': 'dd-MMM-y'
  },
  SHORT_DATE: {
    'G': 'M/d/yy GGGGG – M/d/yy GGGGG',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'M/d/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'M/d/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'M/d/y GGGGG, HH:mm:ss z',
    'Mdy': 'M/d/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'M/d/y GGGGG, HH:mm:ss',
    'Mdy': 'M/d/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'M/d/y GGGGG, HH:mm',
    'Mdy': 'M/d/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, MMMM d, y \'ee\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'MMMM d, y \'ee\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd-MMM-y \'ee\' HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'MM/dd/yy GGGGG, HH:mm',
    'ahm': 'dd/MM/yy HH:mm–HH:mm',
    '_': 'dd/MM/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_so_SO = DateIntervalSymbols_so;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sq_AL = dateIntervalSymbols.DateIntervalSymbols_sq;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sq_MK = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd – d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd – d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd.M.yy GGGGG – d.M.yy GGGGG',
    '_': 'd.M.yy'
  },
  FULL_TIME: {
    'G': 'd.M.y GGGG, HH:mm:ss zzzz',
    'Mdy': 'd.M.y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd.M.y GGGG, HH:mm:ss z',
    'Mdy': 'd.M.y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd.M.y GGGG, HH:mm:ss',
    'Mdy': 'd.M.y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd.M.y GGGG, HH:mm',
    'Mdy': 'd.M.y, HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'në\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'në\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd.M.yy GGGG, HH:mm',
    'ahm': 'd.M.yy, HH:mm – HH:mm',
    '_': 'd.M.yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sq_XK = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd – d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd – d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd.M.yy GGGGG – d.M.yy GGGGG',
    '_': 'd.M.yy'
  },
  FULL_TIME: {
    'G': 'd.M.y GGGG, HH:mm:ss zzzz',
    'Mdy': 'd.M.y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd.M.y GGGG, HH:mm:ss z',
    'Mdy': 'd.M.y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd.M.y GGGG, HH:mm:ss',
    'Mdy': 'd.M.y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd.M.y GGGG, HH:mm',
    'Mdy': 'd.M.y, HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'në\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'në\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd.M.yy GGGG, HH:mm',
    'ahm': 'd.M.yy, HH:mm – HH:mm',
    '_': 'd.M.yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sr_Cyrl = dateIntervalSymbols.DateIntervalSymbols_sr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sr_Cyrl_BA = dateIntervalSymbols.DateIntervalSymbols_sr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sr_Cyrl_ME = dateIntervalSymbols.DateIntervalSymbols_sr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sr_Cyrl_RS = dateIntervalSymbols.DateIntervalSymbols_sr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sr_Cyrl_XK = dateIntervalSymbols.DateIntervalSymbols_sr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sr_Latn_BA = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'M': 'EEEE, dd. MMMM – EEEE, dd. MMMM y.',
    'd': 'EEEE, dd. – EEEE, dd. MMMM y.',
    'y': 'EEEE, dd. MMMM y. – EEEE, dd. MMMM y.',
    '_': 'EEEE, d. MMMM y.'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'dd. MMMM – dd. MMMM y.',
    'd': 'dd.–dd. MMMM y.',
    'y': 'dd. MMMM y. – dd. MMMM y.',
    '_': 'd. MMMM y.'
  },
  MEDIUM_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    '_': 'd. M. y.'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Mdy': 'd. M. yy. – d. M. yy.',
    '_': 'd.M.yy.'
  },
  FULL_TIME: {
    'G': 'd.MM.y. GGGGG HH:mm:ss zzzz',
    'Mdy': 'd. M. y. HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd.MM.y. GGGGG HH:mm:ss z',
    'Mdy': 'd. M. y. HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd.MM.y. GGGGG HH:mm:ss',
    'Mdy': 'd. M. y. HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd.MM.y. GGGGG HH:mm',
    'Mdy': 'd. M. y. HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d. MMMM y. HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd. MMMM y. HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd. M. y. HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd.MM.yy. GGGGG HH:mm',
    'ahm': 'd. M. yy. HH:mm–HH:mm',
    '_': 'd.M.yy. HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sr_Latn_ME = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'M': 'EEEE, dd. MMMM – EEEE, dd. MMMM y.',
    'd': 'EEEE, dd. – EEEE, dd. MMMM y.',
    'y': 'EEEE, dd. MMMM y. – EEEE, dd. MMMM y.',
    '_': 'EEEE, d. MMMM y.'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'dd. MMMM – dd. MMMM y.',
    'd': 'dd.–dd. MMMM y.',
    'y': 'dd. MMMM y. – dd. MMMM y.',
    '_': 'd. MMMM y.'
  },
  MEDIUM_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    '_': 'd. M. y.'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Mdy': 'd. M. yy. – d. M. yy.',
    '_': 'd.M.yy.'
  },
  FULL_TIME: {
    'G': 'd.MM.y. GGGGG HH:mm:ss zzzz',
    'Mdy': 'd. M. y. HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd.MM.y. GGGGG HH:mm:ss z',
    'Mdy': 'd. M. y. HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd.MM.y. GGGGG HH:mm:ss',
    'Mdy': 'd. M. y. HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd.MM.y. GGGGG HH:mm',
    'Mdy': 'd. M. y. HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d. MMMM y. HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd. MMMM y. HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd. M. y. HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd.MM.yy. GGGGG HH:mm',
    'ahm': 'd. M. yy. HH:mm–HH:mm',
    '_': 'd.M.yy. HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sr_Latn_RS = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'M': 'EEEE, dd. MMMM – EEEE, dd. MMMM y.',
    'd': 'EEEE, dd. – EEEE, dd. MMMM y.',
    'y': 'EEEE, dd. MMMM y. – EEEE, dd. MMMM y.',
    '_': 'EEEE, d. MMMM y.'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'dd. MMMM – dd. MMMM y.',
    'd': 'dd.–dd. MMMM y.',
    'y': 'dd. MMMM y. – dd. MMMM y.',
    '_': 'd. MMMM y.'
  },
  MEDIUM_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    '_': 'd. M. y.'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Mdy': 'd. M. yy. – d. M. yy.',
    '_': 'd.M.yy.'
  },
  FULL_TIME: {
    'G': 'd.MM.y. GGGGG HH:mm:ss zzzz',
    'Mdy': 'd. M. y. HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd.MM.y. GGGGG HH:mm:ss z',
    'Mdy': 'd. M. y. HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd.MM.y. GGGGG HH:mm:ss',
    'Mdy': 'd. M. y. HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd.MM.y. GGGGG HH:mm',
    'Mdy': 'd. M. y. HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d. MMMM y. HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd. MMMM y. HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd. M. y. HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd.MM.yy. GGGGG HH:mm',
    'ahm': 'd. M. yy. HH:mm–HH:mm',
    '_': 'd.M.yy. HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sr_Latn_XK = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'M': 'EEEE, dd. MMMM – EEEE, dd. MMMM y.',
    'd': 'EEEE, dd. – EEEE, dd. MMMM y.',
    'y': 'EEEE, dd. MMMM y. – EEEE, dd. MMMM y.',
    '_': 'EEEE, d. MMMM y.'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'dd. MMMM – dd. MMMM y.',
    'd': 'dd.–dd. MMMM y.',
    'y': 'dd. MMMM y. – dd. MMMM y.',
    '_': 'd. MMMM y.'
  },
  MEDIUM_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    '_': 'd. M. y.'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Mdy': 'd. M. yy. – d. M. yy.',
    '_': 'd.M.yy.'
  },
  FULL_TIME: {
    'G': 'd.MM.y. GGGGG HH:mm:ss zzzz',
    'Mdy': 'd. M. y. HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd.MM.y. GGGGG HH:mm:ss z',
    'Mdy': 'd. M. y. HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd.MM.y. GGGGG HH:mm:ss',
    'Mdy': 'd. M. y. HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd.MM.y. GGGGG HH:mm',
    'Mdy': 'd. M. y. HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d. MMMM y. HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd. MMMM y. HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd. M. y. HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd.MM.yy. GGGGG HH:mm',
    'ahm': 'd. M. yy. HH:mm–HH:mm',
    '_': 'd.M.yy. HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_su = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'Mdy': 'yy-MM-dd – yy-MM-dd',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, H.mm.ss zzzz',
    'Mdy': 'd/M/y, H.mm.ss zzzz',
    '_': 'H.mm.ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, H.mm.ss z',
    'Mdy': 'd/M/y, H.mm.ss z',
    '_': 'H.mm.ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, H.mm.ss',
    'Mdy': 'd/M/y, H.mm.ss',
    '_': 'H.mm.ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, H.mm',
    'Mdy': 'd/M/y, H.mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'H.mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'jam\' H.mm.ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'jam\' H.mm.ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, H.mm.ss'
  },
  SHORT_DATETIME: {
    'G': 'd/M/yy GGGGG, H.mm',
    'ahm': 'd/M/yy, HH:mm–HH:mm',
    '_': 'd/M/yy, H.mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_su_Latn = DateIntervalSymbols_su;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_su_Latn_ID = DateIntervalSymbols_su;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sv_AX = dateIntervalSymbols.DateIntervalSymbols_sv;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sv_FI = {
  FULL_DATE: {
    'G': 'd MMMM y G, EEEE – d MMMM y G, EEEE',
    'Md': 'EEEE dd MMMM–EEEE dd MMMM y',
    'y': 'EEEE dd MMMM y–EEEE dd MMMM y',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM–d MMMM y',
    'd': 'd–d MMMM y',
    'y': 'd MMMM y–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM–d MMM y',
    'd': 'd–d MMM y',
    'y': 'd MMM y–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd/M/y GGGGG–d/M/y GGGGG',
    'M': 'y-MM-dd – MM-dd',
    'd': 'y-MM-dd – dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'y-MM-dd GGGGG HH.mm.ss zzzz',
    'Mdy': 'y-MM-dd HH.mm.ss zzzz',
    '_': 'HH.mm.ss zzzz'
  },
  LONG_TIME: {
    'G': 'y-MM-dd GGGGG HH.mm.ss z',
    'Mdy': 'y-MM-dd HH.mm.ss z',
    '_': 'HH.mm.ss z'
  },
  MEDIUM_TIME: {
    'G': 'y-MM-dd GGGGG HH.mm.ss',
    'Mdy': 'y-MM-dd HH.mm.ss',
    '_': 'HH.mm.ss'
  },
  SHORT_TIME: {
    'G': 'y-MM-dd GGGGG HH.mm',
    'Mdy': 'y-MM-dd HH.mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH.mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y \'kl\'. HH.mm.ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'kl\'. HH.mm.ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH.mm.ss'
  },
  SHORT_DATETIME: {
    'G': 'y-MM-dd GGGGG HH.mm',
    'ahm': 'y-MM-dd HH:mm–HH:mm',
    '_': 'y-MM-dd HH.mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sv_SE = dateIntervalSymbols.DateIntervalSymbols_sv;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sw_CD = dateIntervalSymbols.DateIntervalSymbols_sw;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sw_KE = {
  FULL_DATE: {
    'G': 'EEEE, d MMMM y G – EEEE, d MMMM y G',
    'Md': 'EEEE, d MMMM – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'Md': 'd – d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'Md': 'd – d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd/M/y GGGGG – d/M/y GGGGG',
    'Mdy': 'd/M/y – d/M/y',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'd/M/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'd/M/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'd/M/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'd/M/y, HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y \'saa\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'saa\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/y G, HH:mm',
    'ahm': 'dd/MM/y HH:mm – HH:mm',
    '_': 'dd/MM/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sw_TZ = dateIntervalSymbols.DateIntervalSymbols_sw;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_sw_UG = dateIntervalSymbols.DateIntervalSymbols_sw;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ta_IN = dateIntervalSymbols.DateIntervalSymbols_ta;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ta_LK = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'EEEE, d MMMM – EEEE, d MMMM, y',
    '_': 'EEEE, d MMMM, y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'd MMMM – d MMMM, y',
    'd': 'd – d MMMM, y',
    '_': 'd MMMM, y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'd MMM – d MMM, y',
    'd': 'd – d MMM, y',
    '_': 'd MMM, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y G, HH:mm:ss zzzz',
    'Mdy': 'd/M/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y G, HH:mm:ss z',
    'Mdy': 'd/M/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y G, HH:mm:ss',
    'Mdy': 'd/M/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y G, HH:mm',
    'Mdy': 'd/M/y, HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM, y அன்று HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM, y அன்று HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM, y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd/M/yy G, HH:mm',
    'ahm': 'd/M/yy, HH:mm – HH:mm',
    '_': 'd/M/yy, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ta_MY = dateIntervalSymbols.DateIntervalSymbols_ta;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ta_SG = dateIntervalSymbols.DateIntervalSymbols_ta;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_te_IN = dateIntervalSymbols.DateIntervalSymbols_te;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_teo = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_teo_KE = DateIntervalSymbols_teo;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_teo_UG = DateIntervalSymbols_teo;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_tg = {
  FULL_DATE: {
    'G': 'EEEE, MMMM d, y G – EEEE, MMMM d, y G',
    'Md': 'EEEE, MMMM d – EEEE, MMMM d, y',
    'y': 'EEEE, MMMM d, y – EEEE, MMMM d, y',
    '_': 'EEEE, dd MMMM y'
  },
  LONG_DATE: {
    'G': 'MMMM d, y G – MMMM d, y G',
    'M': 'MMMM d – MMMM d, y',
    'd': 'MMMM d – d, y',
    'y': 'MMMM d, y – MMMM d, y',
    '_': 'dd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'MMM d, y G – MMM d, y G',
    'M': 'MMM d – MMM d, y',
    'd': 'MMM d – d, y',
    'y': 'MMM d, y – MMM d, y',
    '_': 'dd MMM y'
  },
  SHORT_DATE: {
    'G': 'M/d/yy GGGGG – M/d/yy GGGGG',
    'Mdy': 'M/d/yy – M/d/yy',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, dd MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'dd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd HH:mm',
    'ahm': 'dd/MM/yy HH:mm – HH:mm',
    '_': 'dd/MM/yy HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_tg_TJ = DateIntervalSymbols_tg;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_th_TH = dateIntervalSymbols.DateIntervalSymbols_th;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ti = {
  FULL_DATE: {
    'G': 'EEEE፣ d MMMM y G – EEEE፣ d MMMM y G',
    'Md': 'EEEE፣ d MMMM – EEEE፣ d MMMM y',
    '_': 'EEEE፣ d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd/M/yy GGGGG – d/M/yy GGGGG',
    'Mdy': 'd/M/yy – d/M/yy',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG h:mm:ss a zzzz',
    'Mdy': 'd/M/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG h:mm:ss a z',
    'Mdy': 'd/M/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG h:mm:ss a',
    'Mdy': 'd/M/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG h:mm a',
    'Mdy': 'd/M/y h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE፣ d MMMM y ሰዓት h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y ሰዓት h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd/MM/yy GGGGG h:mm a',
    'a': 'dd/MM/yy h:mm a – h:mm a',
    'hm': 'dd/MM/yy h:mm – h:mm a',
    '_': 'dd/MM/yy h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ti_ER = DateIntervalSymbols_ti;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ti_ET = DateIntervalSymbols_ti;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_tk = {
  FULL_DATE: {
    'G': 'G d MMMM y, EEEE – G d MMMM y, EEEE',
    '_': 'd MMMM y EEEE'
  },
  LONG_DATE: {
    'G': 'G d MMMM y – G d MMMM y',
    'M': 'd MMMM – d MMMM y',
    'd': 'd – d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G d MMM y – G d MMM y',
    'M': 'd MMM – d MMM y',
    'd': 'd – d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG dd.MM.y – GGGGG dd.MM.y',
    '_': 'dd.MM.y'
  },
  FULL_TIME: {
    'G': 'GGGGG dd.MM.y, HH:mm:ss zzzz',
    'Mdy': 'dd.MM.y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG dd.MM.y, HH:mm:ss z',
    'Mdy': 'dd.MM.y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG dd.MM.y, HH:mm:ss',
    'Mdy': 'dd.MM.y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG dd.MM.y, HH:mm',
    'Mdy': 'dd.MM.y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'd MMMM y EEEE \'sagat\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y \'sagat\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG dd.MM.y, HH:mm',
    'ahm': 'dd.MM.y HH:mm–HH:mm',
    '_': 'dd.MM.y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_tk_TM = DateIntervalSymbols_tk;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_to = {
  FULL_DATE: {
    'G': 'EEEE d MMMM y G – EEEE d MMMM y G',
    'Md': 'EEEE d MMMM – EEEE d MMMM y',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'd MMMM y G – d MMMM y G',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd MMM y G – d MMM y G',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'd/M/yy GGGGG – d/M/yy GGGGG',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'dd MM y GGGGG h:mm:ss a zzzz',
    'Mdy': 'd/M/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'dd MM y GGGGG h:mm:ss a z',
    'Mdy': 'd/M/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'dd MM y GGGGG h:mm:ss a',
    'Mdy': 'd/M/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'dd MM y GGGGG h:mm a',
    'Mdy': 'd/M/y h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y, h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y, h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y, h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'dd MM yy GGGGG h:mm a',
    'a': 'd/M/yy, h:mm a – h:mm a',
    'hm': 'd/M/yy, h:mm – h:mm a',
    '_': 'd/M/yy h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_to_TO = DateIntervalSymbols_to;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_tr_CY = {
  FULL_DATE: {
    'G': 'G d MMMM y EEEE – G d MMMM y EEEE',
    '_': 'd MMMM y EEEE'
  },
  LONG_DATE: {
    'G': 'G d MMMM y – G d MMMM y',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G d MMM y – G d MMM y',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG dd.MM.y – GGGGG dd.MM.y',
    'Mdy': 'dd.MM.y – dd.MM.y',
    '_': 'd.MM.y'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG h:mm:ss a zzzz',
    'Mdy': 'dd.MM.y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG h:mm:ss a z',
    'Mdy': 'dd.MM.y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG h:mm:ss a',
    'Mdy': 'dd.MM.y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG h:mm a',
    'Mdy': 'dd.MM.y h:mm a',
    'a': 'a h:mm – a h:mm',
    'hm': 'a h:mm–h:mm',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'd MMMM y EEEE h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'd/MM/y GGGGG h:mm a',
    'a': 'd.MM.y a h:mm – a h:mm',
    'hm': 'd.MM.y a h:mm–h:mm',
    '_': 'd.MM.y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_tr_TR = dateIntervalSymbols.DateIntervalSymbols_tr;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_tt = {
  FULL_DATE: {
    'G': 'G y \'ел\', d MMMM, EEEE – G y \'ел\', d MMMM, EEEE',
    'Md': 'y \'ел\', d MMMM, EEEE – d MMMM, EEEE',
    'y': 'y \'ел\', d MMMM, EEEE – y \'ел\', d MMMM, EEEE',
    '_': 'd MMMM, y \'ел\', EEEE'
  },
  LONG_DATE: {
    'G': 'G y \'ел\', d MMMM – G y \'ел\', d MMMM',
    'M': 'y \'ел\', d MMMM – d MMMM',
    'd': 'y \'ел\', d–d MMMM',
    'y': 'y \'ел\', d MMMM – y \'ел\', d MMMM',
    '_': 'd MMMM, y \'ел\''
  },
  MEDIUM_DATE: {
    'G': 'G y \'ел\', d MMM – G y \'ел\', d MMM',
    'M': 'y \'ел\', d MMM – d MMM',
    'd': 'y \'ел\', d–d MMM',
    'y': 'y \'ел\', d MMM – y \'ел\', d MMM',
    '_': 'd MMM, y \'ел\''
  },
  SHORT_DATE: {
    'G': 'GGGGG dd.MM.y – GGGGG dd.MM.y',
    '_': 'dd.MM.y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd, H:mm:ss zzzz',
    'Mdy': 'dd.MM.y, H:mm:ss zzzz',
    '_': 'H:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd, H:mm:ss z',
    'Mdy': 'dd.MM.y, H:mm:ss z',
    '_': 'H:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd, H:mm:ss',
    'Mdy': 'dd.MM.y, H:mm:ss',
    '_': 'H:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd, H:mm',
    'Mdy': 'dd.MM.y, H:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'H:mm'
  },
  FULL_DATETIME: {
    '_': 'd MMMM, y \'ел\', EEEE, H:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM, y \'ел\', H:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM, y \'ел\', H:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd, H:mm',
    'ahm': 'dd.MM.y, HH:mm–HH:mm',
    '_': 'dd.MM.y, H:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_tt_RU = DateIntervalSymbols_tt;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_twq = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'd/M/y HH:mm–HH:mm',
    '_': 'd/M/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_twq_NE = DateIntervalSymbols_twq;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_tzm = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_tzm_MA = DateIntervalSymbols_tzm;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ug = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'EEEE، MMMM d – EEEE، MMMM d، y',
    'y': 'EEEE، MMMM d، y – EEEE، MMMM d، y',
    '_': 'y d-MMMM، EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'MMMM d – MMMM d، y',
    'd': 'MMMM d – d، y',
    'y': 'MMMM d، y – MMMM d، y',
    '_': 'd-MMMM، y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'MMM d – MMM d، y',
    'd': 'MMM d – d، y',
    'y': 'MMM d، y – MMM d، y',
    '_': 'd-MMM، y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'M/d/y – M/d/y',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd، HH:mm:ss zzzz',
    'Mdy': 'y-d-M، HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd، HH:mm:ss z',
    'Mdy': 'y-d-M، HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd، HH:mm:ss',
    'Mdy': 'y-d-M، HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd، HH:mm',
    'Mdy': 'y-d-M، HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'y d-MMMM، EEEE HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd-MMMM، y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd-MMM، y، HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd، HH:mm',
    'ahm': 'y-MM-dd، HH:mm – HH:mm',
    '_': 'y-MM-dd، HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ug_CN = DateIntervalSymbols_ug;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_uk_UA = dateIntervalSymbols.DateIntervalSymbols_uk;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ur_IN = dateIntervalSymbols.DateIntervalSymbols_ur;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_ur_PK = dateIntervalSymbols.DateIntervalSymbols_ur;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_uz_Arab = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'y MMMM d, EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'y MMMM d'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'y-M-d HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'y-M-d HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'y-M-d HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'y-M-d HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'y MMMM d, EEEE HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'y MMMM d HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'y-MM-dd HH:mm–HH:mm',
    '_': 'y-MM-dd HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_uz_Arab_AF = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'y MMMM d, EEEE'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'y MMMM d'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'y MMM d'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'y-M-d HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'y-M-d HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'y-M-d HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'y-M-d HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'y MMMM d, EEEE HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'y MMMM d HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'y MMM d HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'y-MM-dd HH:mm–HH:mm',
    '_': 'y-MM-dd HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_uz_Cyrl = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'EEEE, d MMMM – EEEE, d MMMM, y',
    'y': 'EEEE, d MMMM, y – EEEE, d MMMM, y',
    '_': 'EEEE, dd MMMM, y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'd MMMM – d MMMM, y',
    'd': 'd – d MMMM, y',
    '_': 'd MMMM, y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'd MMM – d MMM, y',
    'd': 'd – d MMM, y',
    '_': 'd MMM, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss (zzzz)',
    'Mdy': 'dd/MM/y HH:mm:ss (zzzz)',
    '_': 'HH:mm:ss (zzzz)'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss (z)',
    'Mdy': 'dd/MM/y HH:mm:ss (z)',
    '_': 'HH:mm:ss (z)'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'dd/MM/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'dd/MM/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, dd MMMM, y HH:mm:ss (zzzz)'
  },
  LONG_DATETIME: {
    '_': 'd MMMM, y HH:mm:ss (z)'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM, y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd HH:mm',
    'ahm': 'dd/MM/yy HH:mm–HH:mm',
    '_': 'dd/MM/yy HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_uz_Cyrl_UZ = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'EEEE, d MMMM – EEEE, d MMMM, y',
    'y': 'EEEE, d MMMM, y – EEEE, d MMMM, y',
    '_': 'EEEE, dd MMMM, y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'd MMMM – d MMMM, y',
    'd': 'd – d MMMM, y',
    '_': 'd MMMM, y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'd MMM – d MMM, y',
    'd': 'd – d MMM, y',
    '_': 'd MMM, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss (zzzz)',
    'Mdy': 'dd/MM/y HH:mm:ss (zzzz)',
    '_': 'HH:mm:ss (zzzz)'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss (z)',
    'Mdy': 'dd/MM/y HH:mm:ss (z)',
    '_': 'HH:mm:ss (z)'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'dd/MM/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'dd/MM/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, dd MMMM, y HH:mm:ss (zzzz)'
  },
  LONG_DATETIME: {
    '_': 'd MMMM, y HH:mm:ss (z)'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM, y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd HH:mm',
    'ahm': 'dd/MM/yy HH:mm–HH:mm',
    '_': 'dd/MM/yy HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_uz_Latn = dateIntervalSymbols.DateIntervalSymbols_uz;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_uz_Latn_UZ = dateIntervalSymbols.DateIntervalSymbols_uz;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_vai = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'd/M/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'd/M/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'd/M/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'd/M/y h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'a': 'dd/MM/y h:mm a – h:mm a',
    'hm': 'dd/MM/y h:mm–h:mm a',
    '_': 'dd/MM/y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_vai_Latn = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'M/d/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'M/d/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'M/d/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'M/d/y h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'a': 'dd/MM/y h:mm a – h:mm a',
    'hm': 'dd/MM/y h:mm–h:mm a',
    '_': 'dd/MM/y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_vai_Latn_LR = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'M/d/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'M/d/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'M/d/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'M/d/y h:mm a',
    'a': 'h:mm a – h:mm a',
    'hm': 'h:mm–h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'a': 'dd/MM/y h:mm a – h:mm a',
    'hm': 'dd/MM/y h:mm–h:mm a',
    '_': 'dd/MM/y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_vai_Vaii = DateIntervalSymbols_vai;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_vai_Vaii_LR = DateIntervalSymbols_vai;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_vi_VN = dateIntervalSymbols.DateIntervalSymbols_vi;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_vun = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_vun_TZ = DateIntervalSymbols_vun;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_wae = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'M': 'EEEE, d. MMMM – EEEE, d. MMMM y',
    'd': 'EEEE, d. – EEEE, d. MMMM y',
    '_': 'EEEE, d. MMMM y'
  },
  LONG_DATE: {
    'G': 'd. MMMM y G – d. MMMM y G',
    'M': 'd. MMMM – d. MMMM y',
    'd': 'd. – d. MMMM y',
    '_': 'd. MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'd. MMM y G – d. MMM y G',
    'M': 'd. MMM – d. MMM y',
    'd': 'd. – d. MMM y',
    '_': 'd. MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    '_': 'y-MM-dd'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'y-M-d HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'y-M-d HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'y-M-d HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'y-M-d HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d. MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd. MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd. MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'y-MM-dd HH:mm – HH:mm',
    '_': 'y-MM-dd HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_wae_CH = DateIntervalSymbols_wae;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_wo = {
  FULL_DATE: {
    'G': 'G y MMM d, EEEE – G y MMM d, EEEE',
    'Md': 'y MMM d, EEEE – MMM d, EEEE',
    'y': 'y MMM d, EEEE – y MMM d, EEEE',
    '_': 'EEEE, d MMM, y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM, y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd-MM-y'
  },
  FULL_TIME: {
    'G': 'dd-MM-y GGGGG - HH:mm:ss zzzz',
    'Mdy': 'dd-MM-y - HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'dd-MM-y GGGGG - HH:mm:ss z',
    'Mdy': 'dd-MM-y - HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'dd-MM-y GGGGG - HH:mm:ss',
    'Mdy': 'dd-MM-y - HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'dd-MM-y GGGGG - HH:mm',
    'Mdy': 'dd-MM-y - HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMM, y \'ci\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM, y \'ci\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM, y - HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'dd-MM-y GGGGG - HH:mm',
    'ahm': 'dd-MM-y - HH:mm–HH:mm',
    '_': 'dd-MM-y - HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_wo_SN = DateIntervalSymbols_wo;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_xh = {
  FULL_DATE: {
    'G': 'EEEE, MMMM d, y G – EEEE, MMMM d, y G',
    'Md': 'EEEE, MMMM d – EEEE, MMMM d, y',
    '_': 'EEEE, MMMM d, y'
  },
  LONG_DATE: {
    'G': 'MMMM d, y G – MMMM d, y G',
    'M': 'MMMM d – MMMM d, y',
    'd': 'MMMM d – d, y',
    '_': 'MMMM d, y'
  },
  MEDIUM_DATE: {
    'G': 'MMM d, y G – MMM d, y G',
    'M': 'MMM d – MMM d, y',
    'd': 'MMM d – d, y',
    '_': 'MMM d, y'
  },
  SHORT_DATE: {
    'G': 'M/d/yy G – M/d/yy G',
    '_': 'M/d/yy'
  },
  FULL_TIME: {
    'G': 'M/d/y G HH:mm:ss zzzz',
    'Mdy': 'M/d/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'M/d/y G HH:mm:ss z',
    'Mdy': 'M/d/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'M/d/y G HH:mm:ss',
    'Mdy': 'M/d/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'M/d/y G HH:mm',
    'Mdy': 'M/d/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, MMMM d, y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'MMMM d, y \'kwi\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'MMM d, y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'M/d/yy G HH:mm',
    'ahm': 'M/d/yy HH:mm–HH:mm',
    '_': 'M/d/yy HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_xh_ZA = DateIntervalSymbols_xh;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_xog = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm–HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_xog_UG = DateIntervalSymbols_xog;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_yav = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd/M/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd/M/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd/M/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd/M/y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'd/M/y HH:mm–HH:mm',
    '_': 'd/M/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_yav_CM = DateIntervalSymbols_yav;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_yi = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'EEEE d MMMM – EEEE d MMMM y',
    'y': 'EEEE d MMMM y – EEEE d MMMM y',
    '_': 'EEEE, dטן MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'd MMMM – d MMMM y',
    'd': 'd–d MMMM y',
    'y': 'd MMMM y – d MMMM y',
    '_': 'dטן MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'd MMM – d MMM y',
    'd': 'd–d MMM y',
    'y': 'd MMM y – d MMM y',
    '_': 'dטן MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG yy-MM-dd – GGGGG yy-MM-dd',
    'd': 'yy-MM-dd – yy-MM-dd',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'd-M-y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'd-M-y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'd-M-y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'd-M-y HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, dטן MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'dטן MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'dטן MMM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd HH:mm',
    'ahm': 'dd/MM/yy, HH:mm–HH:mm',
    '_': 'dd/MM/yy HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_yi_001 = DateIntervalSymbols_yi;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_yo = {
  FULL_DATE: {
    'G': 'EEEE, MMM d, y G – EEEE, MMM d, y G',
    'Md': 'MMM d, EEEE – MMM d, EEEE y',
    'y': 'y MMM d y, EEEE – MMM d, EEEE y',
    '_': 'EEEE, d MMM y'
  },
  LONG_DATE: {
    'G': 'MMM d, y G – MMM d, y G',
    'M': 'MMM d – MMM d y',
    'd': 'MMM d–d y',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  MEDIUM_DATE: {
    'G': 'M/d/y G – M/d/y G',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd MM y'
  },
  SHORT_DATE: {
    'G': 'M/d/y G – M/d/y G',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'd/M/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss z',
    'Mdy': 'd/M/y, HH:mm:ss z',
    '_': 'H:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss',
    'Mdy': 'd/M/y, HH:mm:ss',
    '_': 'H:m:s'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, HH:mm',
    'Mdy': 'd/M/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'H:m'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMM y \'ní\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMM y \'níti\' H:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MM y, H:m:s'
  },
  SHORT_DATETIME: {
    'G': 'd/M/y GGGGG, HH:mm',
    'ahm': 'd/M/y HH:mm–HH:mm',
    '_': 'd/M/y, H:m'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_yo_BJ = {
  FULL_DATE: {
    'G': 'EEEE, MMM d, y G – EEEE, MMM d, y G',
    'Md': 'MMM d, EEEE – MMM d, EEEE y',
    'y': 'y MMM d y, EEEE – MMM d, EEEE y',
    '_': 'EEEE, d MMM y'
  },
  LONG_DATE: {
    'G': 'MMM d, y G – MMM d, y G',
    'M': 'MMM d – MMM d y',
    'd': 'MMM d–d y',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM y'
  },
  MEDIUM_DATE: {
    'G': 'M/d/y G – M/d/y G',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd MM y'
  },
  SHORT_DATE: {
    'G': 'M/d/y G – M/d/y G',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss zzzz',
    'Mdy': 'd/M/y, HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss z',
    'Mdy': 'd/M/y, HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'd/M/y GGGGG, HH:mm:ss',
    'Mdy': 'd/M/y, HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'd/M/y GGGGG, HH:mm',
    'Mdy': 'd/M/y, HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMM y \'ní\' HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMM y \'níti\' HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MM y, HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'd/M/y GGGGG, HH:mm',
    'ahm': 'd/M/y HH:mm–HH:mm',
    '_': 'd/M/y, HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_yo_NG = DateIntervalSymbols_yo;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_yrl = {
  FULL_DATE: {
    'G': 'G EEEE, d MMMM y – G EEEE, d MMMM y',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G d MMMM y – G d MMMM y',
    'M': 'd MMMM – d MMMM y',
    'd': 'd – d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G d MMM y – G d MMM y',
    'M': 'd MMM – d MMM y',
    'd': 'd – d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG dd/MM/y – GGGGG dd/MM/y',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'dd/MM/y HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'dd/MM/y HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'dd/MM/y HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'dd/MM/y HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'dd/MM/y HH:mm – HH:mm',
    '_': 'dd/MM/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_yrl_BR = DateIntervalSymbols_yrl;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_yrl_CO = {
  FULL_DATE: {
    'G': 'G EEEE, d MMMM y – G EEEE, d MMMM y',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G d MMMM y – G d MMMM y',
    'M': 'd MMMM – d MMMM y',
    'd': 'd – d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G d MMM y – G d MMM y',
    'M': 'd MMM – d MMM y',
    'd': 'd – d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG dd/MM/y – GGGGG dd/MM/y',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'dd/MM/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'dd/MM/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'dd/MM/y h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'a': 'dd/MM/y h:mm a – h:mm a',
    'hm': 'dd/MM/y h:mm – h:mm a',
    '_': 'dd/MM/y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_yrl_VE = {
  FULL_DATE: {
    'G': 'G EEEE, d MMMM y – G EEEE, d MMMM y',
    'M': 'EEEE, d MMMM – EEEE, d MMMM y',
    'd': 'EEEE, d – EEEE, d MMMM y',
    '_': 'EEEE, d MMMM y'
  },
  LONG_DATE: {
    'G': 'G d MMMM y – G d MMMM y',
    'M': 'd MMMM – d MMMM y',
    'd': 'd – d MMMM y',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G d MMM y – G d MMM y',
    'M': 'd MMM – d MMM y',
    'd': 'd – d MMM y',
    '_': 'd MMM y'
  },
  SHORT_DATE: {
    'G': 'GGGGG dd/MM/y – GGGGG dd/MM/y',
    '_': 'dd/MM/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a zzzz',
    'Mdy': 'dd/MM/y h:mm:ss a zzzz',
    '_': 'h:mm:ss a zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a z',
    'Mdy': 'dd/MM/y h:mm:ss a z',
    '_': 'h:mm:ss a z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd h:mm:ss a',
    'Mdy': 'dd/MM/y h:mm:ss a',
    '_': 'h:mm:ss a'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'Mdy': 'dd/MM/y h:mm a',
    'hm': 'h:mm – h:mm a',
    '_': 'h:mm a'
  },
  FULL_DATETIME: {
    '_': 'EEEE, d MMMM y h:mm:ss a zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y h:mm:ss a z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM y h:mm:ss a'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd h:mm a',
    'a': 'dd/MM/y h:mm a – h:mm a',
    'hm': 'dd/MM/y h:mm – h:mm a',
    '_': 'dd/MM/y h:mm a'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_yue = {
  FULL_DATE: {
    'G': 'GGGGGy年M月dd日EEEE至GGGGGy年M月dd日EEEE',
    'Mdy': 'd/M/y (EEEE) 至 d/M/y (EEEE)',
    '_': 'y年M月d日 EEEE'
  },
  LONG_DATE: {
    'G': 'GGGGGy年M月dd日y年M月dd日',
    'Mdy': 'y/M/d至y/M/d',
    '_': 'y年M月d日'
  },
  MEDIUM_DATE: {
    'G': 'GGGGGy年M月dd日y年M月dd日',
    'Mdy': 'y/M/d至y/M/d',
    '_': 'y年M月d日'
  },
  SHORT_DATE: {
    'G': 'GGGGGy年M月dd日y年M月dd日',
    '_': 'y/M/d'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd ah:mm:ss [zzzz]',
    'Mdy': 'y/M/d ah:mm:ss [zzzz]',
    '_': 'ah:mm:ss [zzzz]'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd ah:mm:ss [z]',
    'Mdy': 'y/M/d ah:mm:ss [z]',
    '_': 'ah:mm:ss [z]'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd ah:mm:ss',
    'Mdy': 'y/M/d ah:mm:ss',
    '_': 'ah:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd ah:mm',
    'Mdy': 'y/M/d ah:mm',
    'hm': 'ah:mm至h:mm',
    '_': 'ah:mm'
  },
  FULL_DATETIME: {
    '_': 'y年M月d日 EEEEah:mm:ss [zzzz]'
  },
  LONG_DATETIME: {
    '_': 'y年M月d日ah:mm:ss [z]'
  },
  MEDIUM_DATETIME: {
    '_': 'y年M月d日ah:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd ah:mm',
    'a': 'y/M/d ah:mm至ah:mm',
    'hm': 'y/M/d ah:mm至h:mm',
    '_': 'y/M/d ah:mm'
  },
  FALLBACK: '{0}至{1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_yue_Hans = {
  FULL_DATE: {
    'G': 'GGGGGy年M月dd日EEEE至GGGGGy年M月dd日EEEE',
    'Mdy': 'y/M/dEEEE至y/M/dEEEE',
    '_': 'y年M月d日EEEE'
  },
  LONG_DATE: {
    'G': 'GGGGGy年M月dd日y年M月dd日',
    'Mdy': 'y/M/d – y/M/d',
    '_': 'y年M月d日'
  },
  MEDIUM_DATE: {
    'G': 'GGGGGy年M月dd日y年M月dd日',
    'Mdy': 'y/M/d – y/M/d',
    '_': 'y年M月d日'
  },
  SHORT_DATE: {
    'G': 'GGGGGy年M月dd日y年M月dd日',
    '_': 'y/M/d'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd zzzz HH:mm:ss',
    'Mdy': 'y/M/d zzzz HH:mm:ss',
    '_': 'zzzz HH:mm:ss'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd z HH:mm:ss',
    'Mdy': 'y/M/d z HH:mm:ss',
    '_': 'z HH:mm:ss'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'y/M/d HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'y/M/d HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'y年M月d日EEEEzzzz HH:mm:ss'
  },
  LONG_DATETIME: {
    '_': 'y年M月d日z HH:mm:ss'
  },
  MEDIUM_DATETIME: {
    '_': 'y年M月d日HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'y/M/d HH:mm–HH:mm',
    '_': 'y/M/d HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_yue_Hans_CN = {
  FULL_DATE: {
    'G': 'GGGGGy年M月dd日EEEE至GGGGGy年M月dd日EEEE',
    'Mdy': 'y/M/dEEEE至y/M/dEEEE',
    '_': 'y年M月d日EEEE'
  },
  LONG_DATE: {
    'G': 'GGGGGy年M月dd日y年M月dd日',
    'Mdy': 'y/M/d – y/M/d',
    '_': 'y年M月d日'
  },
  MEDIUM_DATE: {
    'G': 'GGGGGy年M月dd日y年M月dd日',
    'Mdy': 'y/M/d – y/M/d',
    '_': 'y年M月d日'
  },
  SHORT_DATE: {
    'G': 'GGGGGy年M月dd日y年M月dd日',
    '_': 'y/M/d'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd zzzz HH:mm:ss',
    'Mdy': 'y/M/d zzzz HH:mm:ss',
    '_': 'zzzz HH:mm:ss'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd z HH:mm:ss',
    'Mdy': 'y/M/d z HH:mm:ss',
    '_': 'z HH:mm:ss'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'y/M/d HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'y/M/d HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'y年M月d日EEEEzzzz HH:mm:ss'
  },
  LONG_DATETIME: {
    '_': 'y年M月d日z HH:mm:ss'
  },
  MEDIUM_DATETIME: {
    '_': 'y年M月d日HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'y/M/d HH:mm–HH:mm',
    '_': 'y/M/d HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_yue_Hant = DateIntervalSymbols_yue;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_yue_Hant_HK = DateIntervalSymbols_yue;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_zgh = {
  FULL_DATE: {
    'G': 'G y MMMM d, EEEE – G y MMMM d, EEEE',
    'Md': 'y MMMM d, EEEE – MMMM d, EEEE',
    'y': 'y MMMM d, EEEE – y MMMM d, EEEE',
    '_': 'EEEE d MMMM y'
  },
  LONG_DATE: {
    'G': 'G y MMMM d – G y MMMM d',
    'M': 'y MMMM d – MMMM d',
    'd': 'y MMMM d–d',
    'y': 'y MMMM d – y MMMM d',
    '_': 'd MMMM y'
  },
  MEDIUM_DATE: {
    'G': 'G y MMM d – G y MMM d',
    'M': 'y MMM d – MMM d',
    'd': 'y MMM d–d',
    'y': 'y MMM d – y MMM d',
    '_': 'd MMM, y'
  },
  SHORT_DATE: {
    'G': 'GGGGG y-MM-dd – GGGGG y-MM-dd',
    'Mdy': 'y-MM-dd – y-MM-dd',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss zzzz',
    'Mdy': 'y-MM-dd HH:mm:ss zzzz',
    '_': 'HH:mm:ss zzzz'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss z',
    'Mdy': 'y-MM-dd HH:mm:ss z',
    '_': 'HH:mm:ss z'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm:ss',
    'Mdy': 'y-MM-dd HH:mm:ss',
    '_': 'HH:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'Mdy': 'y-MM-dd HH:mm',
    'ahm': 'HH:mm–HH:mm',
    '_': 'HH:mm'
  },
  FULL_DATETIME: {
    '_': 'EEEE d MMMM y HH:mm:ss zzzz'
  },
  LONG_DATETIME: {
    '_': 'd MMMM y HH:mm:ss z'
  },
  MEDIUM_DATETIME: {
    '_': 'd MMM, y HH:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG y-MM-dd HH:mm',
    'ahm': 'y-MM-dd HH:mm–HH:mm',
    '_': 'd/M/y HH:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_zgh_MA = DateIntervalSymbols_zgh;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_zh_Hans = dateIntervalSymbols.DateIntervalSymbols_zh;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_zh_Hans_CN = dateIntervalSymbols.DateIntervalSymbols_zh;

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_zh_Hans_HK = {
  FULL_DATE: {
    'G': 'GGGGGy-MM-ddEEEE – GGGGGy-MM-ddEEEE',
    'Mdy': 'd/M/yEEEE至d/M/yEEEE',
    '_': 'y年M月d日EEEE'
  },
  LONG_DATE: {
    'G': 'GGGGGy-MM-dd – GGGGGy-MM-dd',
    'Mdy': 'd/M/y至d/M/y',
    '_': 'y年M月d日'
  },
  MEDIUM_DATE: {
    'G': 'GGGGGy-MM-dd – GGGGGy-MM-dd',
    'Mdy': 'd/M/y至d/M/y',
    '_': 'y年M月d日'
  },
  SHORT_DATE: {
    'G': 'GGGGGyy-MM-dd – GGGGGyy-MM-dd',
    'Mdy': 'd/M/yy至d/M/yy',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd zzzz ah:mm:ss',
    'Mdy': 'd/M/y zzzz ah:mm:ss',
    '_': 'zzzz ah:mm:ss'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd z ah:mm:ss',
    'Mdy': 'd/M/y z ah:mm:ss',
    '_': 'z ah:mm:ss'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd ah:mm:ss',
    'Mdy': 'd/M/y ah:mm:ss',
    '_': 'ah:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd ah:mm',
    'Mdy': 'd/M/y ah:mm',
    'a': 'ah:mm至ah:mm',
    'hm': 'ah:mm至h:mm',
    '_': 'ah:mm'
  },
  FULL_DATETIME: {
    '_': 'y年M月d日EEEE zzzz ah:mm:ss'
  },
  LONG_DATETIME: {
    '_': 'y年M月d日 z ah:mm:ss'
  },
  MEDIUM_DATETIME: {
    '_': 'y年M月d日 ah:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd ah:mm',
    'a': 'd/M/yy ah:mm至ah:mm',
    'hm': 'd/M/yy ah:mm至h:mm',
    '_': 'd/M/yy ah:mm'
  },
  FALLBACK: '{0}–{1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_zh_Hans_MO = {
  FULL_DATE: {
    'G': 'GGGGGy-MM-ddEEEE – GGGGGy-MM-ddEEEE',
    'Mdy': 'd/M/yEEEE至d/M/yEEEE',
    '_': 'y年M月d日EEEE'
  },
  LONG_DATE: {
    'G': 'GGGGGy-MM-dd – GGGGGy-MM-dd',
    'Mdy': 'd/M/y至d/M/y',
    '_': 'y年M月d日'
  },
  MEDIUM_DATE: {
    'G': 'GGGGGy-MM-dd – GGGGGy-MM-dd',
    'Mdy': 'd/M/y至d/M/y',
    '_': 'y年M月d日'
  },
  SHORT_DATE: {
    'G': 'GGGGGyy-MM-dd – GGGGGyy-MM-dd',
    'Mdy': 'd/M/yy至d/M/yy',
    '_': 'd/M/yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd zzzz ah:mm:ss',
    'Mdy': 'y年M月d日 zzzz ah:mm:ss',
    '_': 'zzzz ah:mm:ss'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd z ah:mm:ss',
    'Mdy': 'y年M月d日 z ah:mm:ss',
    '_': 'z ah:mm:ss'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd ah:mm:ss',
    'Mdy': 'y年M月d日 ah:mm:ss',
    '_': 'ah:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd ah:mm',
    'Mdy': 'y年M月d日 ah:mm',
    'a': 'ah:mm至ah:mm',
    'hm': 'ah:mm至h:mm',
    '_': 'ah:mm'
  },
  FULL_DATETIME: {
    '_': 'y年M月d日EEEE zzzz ah:mm:ss'
  },
  LONG_DATETIME: {
    '_': 'y年M月d日 z ah:mm:ss'
  },
  MEDIUM_DATETIME: {
    '_': 'y年M月d日 ah:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd ah:mm',
    'a': 'yy年M月d日 ah:mm至ah:mm',
    'hm': 'yy年M月d日 ah:mm至h:mm',
    '_': 'd/M/yy ah:mm'
  },
  FALLBACK: '{0}–{1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_zh_Hans_SG = {
  FULL_DATE: {
    'G': 'GGGGGy-MM-ddEEEE – GGGGGy-MM-ddEEEE',
    'Mdy': 'd/M/yEEEE至d/M/yEEEE',
    '_': 'y年M月d日EEEE'
  },
  LONG_DATE: {
    'G': 'GGGGGy-MM-dd – GGGGGy-MM-dd',
    'Mdy': 'd/M/y至d/M/y',
    '_': 'y年M月d日'
  },
  MEDIUM_DATE: {
    'G': 'GGGGGy-MM-dd – GGGGGy-MM-dd',
    'Mdy': 'd/M/y至d/M/y',
    '_': 'y年M月d日'
  },
  SHORT_DATE: {
    'G': 'GGGGGyy-MM-dd – GGGGGyy-MM-dd',
    'Mdy': 'd/M/yy至d/M/yy',
    '_': 'dd/MM/yy'
  },
  FULL_TIME: {
    'G': 'GGGGG y-MM-dd zzzz ah:mm:ss',
    'Mdy': 'y年M月d日 zzzz ah:mm:ss',
    '_': 'zzzz ah:mm:ss'
  },
  LONG_TIME: {
    'G': 'GGGGG y-MM-dd z ah:mm:ss',
    'Mdy': 'y年M月d日 z ah:mm:ss',
    '_': 'z ah:mm:ss'
  },
  MEDIUM_TIME: {
    'G': 'GGGGG y-MM-dd ah:mm:ss',
    'Mdy': 'y年M月d日 ah:mm:ss',
    '_': 'ah:mm:ss'
  },
  SHORT_TIME: {
    'G': 'GGGGG y-MM-dd ah:mm',
    'Mdy': 'y年M月d日 ah:mm',
    'hm': 'ah:mm至h:mm',
    '_': 'ah:mm'
  },
  FULL_DATETIME: {
    '_': 'y年M月d日EEEE zzzz ah:mm:ss'
  },
  LONG_DATETIME: {
    '_': 'y年M月d日 z ah:mm:ss'
  },
  MEDIUM_DATETIME: {
    '_': 'y年M月d日 ah:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'GGGGG yy-MM-dd ah:mm',
    'a': 'yy年MM月dd日 ah:mm至ah:mm',
    'hm': 'yy年MM月dd日 ah:mm至h:mm',
    '_': 'dd/MM/yy ah:mm'
  },
  FALLBACK: '{0}至{1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_zh_Hant = {
  FULL_DATE: {
    'G': 'GGGGGy-MM-dd, EEEE – GGGGGy-MM-dd, EEEE',
    'Mdy': 'y/M/dEEEE至y/M/dEEEE',
    '_': 'y年M月d日 EEEE'
  },
  LONG_DATE: {
    'G': 'GGGGGy-MM-dd – GGGGGy-MM-dd',
    'Mdy': 'y/M/d至y/M/d',
    '_': 'y年M月d日'
  },
  MEDIUM_DATE: {
    'G': 'GGGGGy-MM-dd – GGGGGy-MM-dd',
    'Mdy': 'y/M/d至y/M/d',
    '_': 'y年M月d日'
  },
  SHORT_DATE: {
    'G': 'GGGGGy-MM-dd – GGGGGy-MM-dd',
    'Mdy': 'y/M/d至y/M/d',
    '_': 'y/M/d'
  },
  FULL_TIME: {
    'G': 'G y/M/d Bh:mm:ss [zzzz]',
    'Mdy': 'y/M/d Bh:mm:ss [zzzz]',
    '_': 'Bh:mm:ss [zzzz]'
  },
  LONG_TIME: {
    'G': 'G y/M/d Bh:mm:ss [z]',
    'Mdy': 'y/M/d Bh:mm:ss [z]',
    '_': 'Bh:mm:ss [z]'
  },
  MEDIUM_TIME: {
    'G': 'G y/M/d Bh:mm:ss',
    'Mdy': 'y/M/d Bh:mm:ss',
    '_': 'Bh:mm:ss'
  },
  SHORT_TIME: {
    'G': 'G y/M/d Bh:mm',
    'Mdy': 'y/M/d Bh:mm',
    'a': 'Bh:mm – Bh:mm',
    'hm': 'Bh:mm–h:mm',
    '_': 'Bh:mm'
  },
  FULL_DATETIME: {
    '_': 'y年M月d日 EEEE Bh:mm:ss [zzzz]'
  },
  LONG_DATETIME: {
    '_': 'y年M月d日 Bh:mm:ss [z]'
  },
  MEDIUM_DATETIME: {
    '_': 'y年M月d日 Bh:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'G y/M/d Bh:mm',
    'a': 'y/M/d Bh:mm – Bh:mm',
    'hm': 'y/M/d Bh:mm–h:mm',
    '_': 'y/M/d Bh:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_zh_Hant_HK = {
  FULL_DATE: {
    'G': 'GGGGGy-MM-dd, EEEE – GGGGGy-MM-dd, EEEE',
    'Mdy': 'd/M/y（EEEE） 至 d/M/y（EEEE）',
    '_': 'y年M月d日EEEE'
  },
  LONG_DATE: {
    'G': 'GGGGGy-MM-dd – GGGGGy-MM-dd',
    'Mdy': 'd/M/y 至 d/M/y',
    '_': 'y年M月d日'
  },
  MEDIUM_DATE: {
    'G': 'GGGGGy-MM-dd – GGGGGy-MM-dd',
    'Mdy': 'd/M/y 至 d/M/y',
    '_': 'y年M月d日'
  },
  SHORT_DATE: {
    'G': 'GGGGGy-MM-dd – GGGGGy-MM-dd',
    'Mdy': 'd/M/y 至 d/M/y',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'G y/M/d ah:mm:ss [zzzz]',
    'Mdy': 'd/M/y ah:mm:ss [zzzz]',
    '_': 'ah:mm:ss [zzzz]'
  },
  LONG_TIME: {
    'G': 'G y/M/d ah:mm:ss [z]',
    'Mdy': 'd/M/y ah:mm:ss [z]',
    '_': 'ah:mm:ss [z]'
  },
  MEDIUM_TIME: {
    'G': 'G y/M/d ah:mm:ss',
    'Mdy': 'd/M/y ah:mm:ss',
    '_': 'ah:mm:ss'
  },
  SHORT_TIME: {
    'G': 'G y/M/d ah:mm',
    'Mdy': 'd/M/y ah:mm',
    'a': 'Bh:mm至Bh:mm',
    'hm': 'ah:mm至h:mm',
    '_': 'ah:mm'
  },
  FULL_DATETIME: {
    '_': 'y年M月d日EEEE ah:mm:ss [zzzz]'
  },
  LONG_DATETIME: {
    '_': 'y年M月d日 ah:mm:ss [z]'
  },
  MEDIUM_DATETIME: {
    '_': 'y年M月d日 ah:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'G y/M/d ah:mm',
    'a': 'd/M/y Bh:mm至Bh:mm',
    'hm': 'd/M/y ah:mm至h:mm',
    '_': 'd/M/y ah:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_zh_Hant_MO = {
  FULL_DATE: {
    'G': 'GGGGGy-MM-dd, EEEE – GGGGGy-MM-dd, EEEE',
    'Mdy': 'd/M/y（EEEE） 至 d/M/y（EEEE）',
    '_': 'y年M月d日EEEE'
  },
  LONG_DATE: {
    'G': 'GGGGGy-MM-dd – GGGGGy-MM-dd',
    'Mdy': 'd/M/y 至 d/M/y',
    '_': 'y年M月d日'
  },
  MEDIUM_DATE: {
    'G': 'GGGGGy-MM-dd – GGGGGy-MM-dd',
    'Mdy': 'd/M/y 至 d/M/y',
    '_': 'y年M月d日'
  },
  SHORT_DATE: {
    'G': 'GGGGGy-MM-dd – GGGGGy-MM-dd',
    'Mdy': 'd/M/y 至 d/M/y',
    '_': 'd/M/y'
  },
  FULL_TIME: {
    'G': 'G y/M/d ah:mm:ss [zzzz]',
    'Mdy': 'd/M/y ah:mm:ss [zzzz]',
    '_': 'ah:mm:ss [zzzz]'
  },
  LONG_TIME: {
    'G': 'G y/M/d ah:mm:ss [z]',
    'Mdy': 'd/M/y ah:mm:ss [z]',
    '_': 'ah:mm:ss [z]'
  },
  MEDIUM_TIME: {
    'G': 'G y/M/d ah:mm:ss',
    'Mdy': 'd/M/y ah:mm:ss',
    '_': 'ah:mm:ss'
  },
  SHORT_TIME: {
    'G': 'G y/M/d ah:mm',
    'Mdy': 'd/M/y ah:mm',
    'a': 'Bh:mm至Bh:mm',
    'hm': 'ah:mm至h:mm',
    '_': 'ah:mm'
  },
  FULL_DATETIME: {
    '_': 'y年M月d日EEEE ah:mm:ss [zzzz]'
  },
  LONG_DATETIME: {
    '_': 'y年M月d日 ah:mm:ss [z]'
  },
  MEDIUM_DATETIME: {
    '_': 'y年M月d日 ah:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'G y/M/d ah:mm',
    'a': 'd/M/y Bh:mm至Bh:mm',
    'hm': 'd/M/y ah:mm至h:mm',
    '_': 'd/M/y ah:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_zh_Hant_TW = {
  FULL_DATE: {
    'G': 'GGGGGy-MM-dd, EEEE – GGGGGy-MM-dd, EEEE',
    'Mdy': 'y/M/dEEEE至y/M/dEEEE',
    '_': 'y年M月d日 EEEE'
  },
  LONG_DATE: {
    'G': 'GGGGGy-MM-dd – GGGGGy-MM-dd',
    'Mdy': 'y/M/d至y/M/d',
    '_': 'y年M月d日'
  },
  MEDIUM_DATE: {
    'G': 'GGGGGy-MM-dd – GGGGGy-MM-dd',
    'Mdy': 'y/M/d至y/M/d',
    '_': 'y年M月d日'
  },
  SHORT_DATE: {
    'G': 'GGGGGy-MM-dd – GGGGGy-MM-dd',
    'Mdy': 'y/M/d至y/M/d',
    '_': 'y/M/d'
  },
  FULL_TIME: {
    'G': 'G y/M/d Bh:mm:ss [zzzz]',
    'Mdy': 'y/M/d Bh:mm:ss [zzzz]',
    '_': 'Bh:mm:ss [zzzz]'
  },
  LONG_TIME: {
    'G': 'G y/M/d Bh:mm:ss [z]',
    'Mdy': 'y/M/d Bh:mm:ss [z]',
    '_': 'Bh:mm:ss [z]'
  },
  MEDIUM_TIME: {
    'G': 'G y/M/d Bh:mm:ss',
    'Mdy': 'y/M/d Bh:mm:ss',
    '_': 'Bh:mm:ss'
  },
  SHORT_TIME: {
    'G': 'G y/M/d Bh:mm',
    'Mdy': 'y/M/d Bh:mm',
    'a': 'Bh:mm – Bh:mm',
    'hm': 'Bh:mm–h:mm',
    '_': 'Bh:mm'
  },
  FULL_DATETIME: {
    '_': 'y年M月d日 EEEE Bh:mm:ss [zzzz]'
  },
  LONG_DATETIME: {
    '_': 'y年M月d日 Bh:mm:ss [z]'
  },
  MEDIUM_DATETIME: {
    '_': 'y年M月d日 Bh:mm:ss'
  },
  SHORT_DATETIME: {
    'G': 'G y/M/d Bh:mm',
    'a': 'y/M/d Bh:mm – Bh:mm',
    'hm': 'y/M/d Bh:mm–h:mm',
    '_': 'y/M/d Bh:mm'
  },
  FALLBACK: '{0} – {1}'
};

/** @const {!dateIntervalSymbols.DateIntervalSymbols} */
export let DateIntervalSymbols_zu_ZA = dateIntervalSymbols.DateIntervalSymbols_zu;

switch (goog.LOCALE) {
  case 'af_NA':
  case 'af-NA':
    defaultSymbols = DateIntervalSymbols_af_NA;
    break;
  case 'af_ZA':
  case 'af-ZA':
    defaultSymbols = DateIntervalSymbols_af_ZA;
    break;
  case 'agq':
    defaultSymbols = DateIntervalSymbols_agq;
    break;
  case 'agq_CM':
  case 'agq-CM':
    defaultSymbols = DateIntervalSymbols_agq_CM;
    break;
  case 'ak':
    defaultSymbols = DateIntervalSymbols_ak;
    break;
  case 'ak_GH':
  case 'ak-GH':
    defaultSymbols = DateIntervalSymbols_ak_GH;
    break;
  case 'am_ET':
  case 'am-ET':
    defaultSymbols = DateIntervalSymbols_am_ET;
    break;
  case 'ar_001':
  case 'ar-001':
    defaultSymbols = DateIntervalSymbols_ar_001;
    break;
  case 'ar_AE':
  case 'ar-AE':
    defaultSymbols = DateIntervalSymbols_ar_AE;
    break;
  case 'ar_BH':
  case 'ar-BH':
    defaultSymbols = DateIntervalSymbols_ar_BH;
    break;
  case 'ar_DJ':
  case 'ar-DJ':
    defaultSymbols = DateIntervalSymbols_ar_DJ;
    break;
  case 'ar_EH':
  case 'ar-EH':
    defaultSymbols = DateIntervalSymbols_ar_EH;
    break;
  case 'ar_ER':
  case 'ar-ER':
    defaultSymbols = DateIntervalSymbols_ar_ER;
    break;
  case 'ar_IL':
  case 'ar-IL':
    defaultSymbols = DateIntervalSymbols_ar_IL;
    break;
  case 'ar_IQ':
  case 'ar-IQ':
    defaultSymbols = DateIntervalSymbols_ar_IQ;
    break;
  case 'ar_JO':
  case 'ar-JO':
    defaultSymbols = DateIntervalSymbols_ar_JO;
    break;
  case 'ar_KM':
  case 'ar-KM':
    defaultSymbols = DateIntervalSymbols_ar_KM;
    break;
  case 'ar_KW':
  case 'ar-KW':
    defaultSymbols = DateIntervalSymbols_ar_KW;
    break;
  case 'ar_LB':
  case 'ar-LB':
    defaultSymbols = DateIntervalSymbols_ar_LB;
    break;
  case 'ar_LY':
  case 'ar-LY':
    defaultSymbols = DateIntervalSymbols_ar_LY;
    break;
  case 'ar_MA':
  case 'ar-MA':
    defaultSymbols = DateIntervalSymbols_ar_MA;
    break;
  case 'ar_MR':
  case 'ar-MR':
    defaultSymbols = DateIntervalSymbols_ar_MR;
    break;
  case 'ar_OM':
  case 'ar-OM':
    defaultSymbols = DateIntervalSymbols_ar_OM;
    break;
  case 'ar_PS':
  case 'ar-PS':
    defaultSymbols = DateIntervalSymbols_ar_PS;
    break;
  case 'ar_QA':
  case 'ar-QA':
    defaultSymbols = DateIntervalSymbols_ar_QA;
    break;
  case 'ar_SA':
  case 'ar-SA':
    defaultSymbols = DateIntervalSymbols_ar_SA;
    break;
  case 'ar_SD':
  case 'ar-SD':
    defaultSymbols = DateIntervalSymbols_ar_SD;
    break;
  case 'ar_SO':
  case 'ar-SO':
    defaultSymbols = DateIntervalSymbols_ar_SO;
    break;
  case 'ar_SS':
  case 'ar-SS':
    defaultSymbols = DateIntervalSymbols_ar_SS;
    break;
  case 'ar_SY':
  case 'ar-SY':
    defaultSymbols = DateIntervalSymbols_ar_SY;
    break;
  case 'ar_TD':
  case 'ar-TD':
    defaultSymbols = DateIntervalSymbols_ar_TD;
    break;
  case 'ar_TN':
  case 'ar-TN':
    defaultSymbols = DateIntervalSymbols_ar_TN;
    break;
  case 'ar_XB':
  case 'ar-XB':
    defaultSymbols = DateIntervalSymbols_ar_XB;
    break;
  case 'ar_YE':
  case 'ar-YE':
    defaultSymbols = DateIntervalSymbols_ar_YE;
    break;
  case 'as':
    defaultSymbols = DateIntervalSymbols_as;
    break;
  case 'as_IN':
  case 'as-IN':
    defaultSymbols = DateIntervalSymbols_as_IN;
    break;
  case 'asa':
    defaultSymbols = DateIntervalSymbols_asa;
    break;
  case 'asa_TZ':
  case 'asa-TZ':
    defaultSymbols = DateIntervalSymbols_asa_TZ;
    break;
  case 'ast':
    defaultSymbols = DateIntervalSymbols_ast;
    break;
  case 'ast_ES':
  case 'ast-ES':
    defaultSymbols = DateIntervalSymbols_ast_ES;
    break;
  case 'az_Cyrl':
  case 'az-Cyrl':
    defaultSymbols = DateIntervalSymbols_az_Cyrl;
    break;
  case 'az_Cyrl_AZ':
  case 'az-Cyrl-AZ':
    defaultSymbols = DateIntervalSymbols_az_Cyrl_AZ;
    break;
  case 'az_Latn':
  case 'az-Latn':
    defaultSymbols = DateIntervalSymbols_az_Latn;
    break;
  case 'az_Latn_AZ':
  case 'az-Latn-AZ':
    defaultSymbols = DateIntervalSymbols_az_Latn_AZ;
    break;
  case 'bas':
    defaultSymbols = DateIntervalSymbols_bas;
    break;
  case 'bas_CM':
  case 'bas-CM':
    defaultSymbols = DateIntervalSymbols_bas_CM;
    break;
  case 'be_BY':
  case 'be-BY':
    defaultSymbols = DateIntervalSymbols_be_BY;
    break;
  case 'bem':
    defaultSymbols = DateIntervalSymbols_bem;
    break;
  case 'bem_ZM':
  case 'bem-ZM':
    defaultSymbols = DateIntervalSymbols_bem_ZM;
    break;
  case 'bez':
    defaultSymbols = DateIntervalSymbols_bez;
    break;
  case 'bez_TZ':
  case 'bez-TZ':
    defaultSymbols = DateIntervalSymbols_bez_TZ;
    break;
  case 'bg_BG':
  case 'bg-BG':
    defaultSymbols = DateIntervalSymbols_bg_BG;
    break;
  case 'bgc':
    defaultSymbols = DateIntervalSymbols_bgc;
    break;
  case 'bgc_IN':
  case 'bgc-IN':
    defaultSymbols = DateIntervalSymbols_bgc_IN;
    break;
  case 'bho':
    defaultSymbols = DateIntervalSymbols_bho;
    break;
  case 'bho_IN':
  case 'bho-IN':
    defaultSymbols = DateIntervalSymbols_bho_IN;
    break;
  case 'bm':
    defaultSymbols = DateIntervalSymbols_bm;
    break;
  case 'bm_ML':
  case 'bm-ML':
    defaultSymbols = DateIntervalSymbols_bm_ML;
    break;
  case 'bn_BD':
  case 'bn-BD':
    defaultSymbols = DateIntervalSymbols_bn_BD;
    break;
  case 'bn_IN':
  case 'bn-IN':
    defaultSymbols = DateIntervalSymbols_bn_IN;
    break;
  case 'bo':
    defaultSymbols = DateIntervalSymbols_bo;
    break;
  case 'bo_CN':
  case 'bo-CN':
    defaultSymbols = DateIntervalSymbols_bo_CN;
    break;
  case 'bo_IN':
  case 'bo-IN':
    defaultSymbols = DateIntervalSymbols_bo_IN;
    break;
  case 'br_FR':
  case 'br-FR':
    defaultSymbols = DateIntervalSymbols_br_FR;
    break;
  case 'brx':
    defaultSymbols = DateIntervalSymbols_brx;
    break;
  case 'brx_IN':
  case 'brx-IN':
    defaultSymbols = DateIntervalSymbols_brx_IN;
    break;
  case 'bs_Cyrl':
  case 'bs-Cyrl':
    defaultSymbols = DateIntervalSymbols_bs_Cyrl;
    break;
  case 'bs_Cyrl_BA':
  case 'bs-Cyrl-BA':
    defaultSymbols = DateIntervalSymbols_bs_Cyrl_BA;
    break;
  case 'bs_Latn':
  case 'bs-Latn':
    defaultSymbols = DateIntervalSymbols_bs_Latn;
    break;
  case 'bs_Latn_BA':
  case 'bs-Latn-BA':
    defaultSymbols = DateIntervalSymbols_bs_Latn_BA;
    break;
  case 'ca_AD':
  case 'ca-AD':
    defaultSymbols = DateIntervalSymbols_ca_AD;
    break;
  case 'ca_ES':
  case 'ca-ES':
    defaultSymbols = DateIntervalSymbols_ca_ES;
    break;
  case 'ca_FR':
  case 'ca-FR':
    defaultSymbols = DateIntervalSymbols_ca_FR;
    break;
  case 'ca_IT':
  case 'ca-IT':
    defaultSymbols = DateIntervalSymbols_ca_IT;
    break;
  case 'ccp':
    defaultSymbols = DateIntervalSymbols_ccp;
    break;
  case 'ccp_BD':
  case 'ccp-BD':
    defaultSymbols = DateIntervalSymbols_ccp_BD;
    break;
  case 'ccp_IN':
  case 'ccp-IN':
    defaultSymbols = DateIntervalSymbols_ccp_IN;
    break;
  case 'ce':
    defaultSymbols = DateIntervalSymbols_ce;
    break;
  case 'ce_RU':
  case 'ce-RU':
    defaultSymbols = DateIntervalSymbols_ce_RU;
    break;
  case 'ceb':
    defaultSymbols = DateIntervalSymbols_ceb;
    break;
  case 'ceb_PH':
  case 'ceb-PH':
    defaultSymbols = DateIntervalSymbols_ceb_PH;
    break;
  case 'cgg':
    defaultSymbols = DateIntervalSymbols_cgg;
    break;
  case 'cgg_UG':
  case 'cgg-UG':
    defaultSymbols = DateIntervalSymbols_cgg_UG;
    break;
  case 'chr_US':
  case 'chr-US':
    defaultSymbols = DateIntervalSymbols_chr_US;
    break;
  case 'ckb':
    defaultSymbols = DateIntervalSymbols_ckb;
    break;
  case 'ckb_Arab':
  case 'ckb-Arab':
    defaultSymbols = DateIntervalSymbols_ckb_Arab;
    break;
  case 'ckb_Arab_IQ':
  case 'ckb-Arab-IQ':
    defaultSymbols = DateIntervalSymbols_ckb_Arab_IQ;
    break;
  case 'ckb_Arab_IR':
  case 'ckb-Arab-IR':
    defaultSymbols = DateIntervalSymbols_ckb_Arab_IR;
    break;
  case 'ckb_IQ':
  case 'ckb-IQ':
    defaultSymbols = DateIntervalSymbols_ckb_IQ;
    break;
  case 'ckb_IR':
  case 'ckb-IR':
    defaultSymbols = DateIntervalSymbols_ckb_IR;
    break;
  case 'cs_CZ':
  case 'cs-CZ':
    defaultSymbols = DateIntervalSymbols_cs_CZ;
    break;
  case 'cv':
    defaultSymbols = DateIntervalSymbols_cv;
    break;
  case 'cv_RU':
  case 'cv-RU':
    defaultSymbols = DateIntervalSymbols_cv_RU;
    break;
  case 'cy_GB':
  case 'cy-GB':
    defaultSymbols = DateIntervalSymbols_cy_GB;
    break;
  case 'da_DK':
  case 'da-DK':
    defaultSymbols = DateIntervalSymbols_da_DK;
    break;
  case 'da_GL':
  case 'da-GL':
    defaultSymbols = DateIntervalSymbols_da_GL;
    break;
  case 'dav':
    defaultSymbols = DateIntervalSymbols_dav;
    break;
  case 'dav_KE':
  case 'dav-KE':
    defaultSymbols = DateIntervalSymbols_dav_KE;
    break;
  case 'de_BE':
  case 'de-BE':
    defaultSymbols = DateIntervalSymbols_de_BE;
    break;
  case 'de_DE':
  case 'de-DE':
    defaultSymbols = DateIntervalSymbols_de_DE;
    break;
  case 'de_IT':
  case 'de-IT':
    defaultSymbols = DateIntervalSymbols_de_IT;
    break;
  case 'de_LI':
  case 'de-LI':
    defaultSymbols = DateIntervalSymbols_de_LI;
    break;
  case 'de_LU':
  case 'de-LU':
    defaultSymbols = DateIntervalSymbols_de_LU;
    break;
  case 'dje':
    defaultSymbols = DateIntervalSymbols_dje;
    break;
  case 'dje_NE':
  case 'dje-NE':
    defaultSymbols = DateIntervalSymbols_dje_NE;
    break;
  case 'doi':
    defaultSymbols = DateIntervalSymbols_doi;
    break;
  case 'doi_IN':
  case 'doi-IN':
    defaultSymbols = DateIntervalSymbols_doi_IN;
    break;
  case 'dsb':
    defaultSymbols = DateIntervalSymbols_dsb;
    break;
  case 'dsb_DE':
  case 'dsb-DE':
    defaultSymbols = DateIntervalSymbols_dsb_DE;
    break;
  case 'dua':
    defaultSymbols = DateIntervalSymbols_dua;
    break;
  case 'dua_CM':
  case 'dua-CM':
    defaultSymbols = DateIntervalSymbols_dua_CM;
    break;
  case 'dyo':
    defaultSymbols = DateIntervalSymbols_dyo;
    break;
  case 'dyo_SN':
  case 'dyo-SN':
    defaultSymbols = DateIntervalSymbols_dyo_SN;
    break;
  case 'dz':
    defaultSymbols = DateIntervalSymbols_dz;
    break;
  case 'dz_BT':
  case 'dz-BT':
    defaultSymbols = DateIntervalSymbols_dz_BT;
    break;
  case 'ebu':
    defaultSymbols = DateIntervalSymbols_ebu;
    break;
  case 'ebu_KE':
  case 'ebu-KE':
    defaultSymbols = DateIntervalSymbols_ebu_KE;
    break;
  case 'ee':
    defaultSymbols = DateIntervalSymbols_ee;
    break;
  case 'ee_GH':
  case 'ee-GH':
    defaultSymbols = DateIntervalSymbols_ee_GH;
    break;
  case 'ee_TG':
  case 'ee-TG':
    defaultSymbols = DateIntervalSymbols_ee_TG;
    break;
  case 'el_CY':
  case 'el-CY':
    defaultSymbols = DateIntervalSymbols_el_CY;
    break;
  case 'el_GR':
  case 'el-GR':
    defaultSymbols = DateIntervalSymbols_el_GR;
    break;
  case 'en_001':
  case 'en-001':
    defaultSymbols = DateIntervalSymbols_en_001;
    break;
  case 'en_150':
  case 'en-150':
    defaultSymbols = DateIntervalSymbols_en_150;
    break;
  case 'en_AE':
  case 'en-AE':
    defaultSymbols = DateIntervalSymbols_en_AE;
    break;
  case 'en_AG':
  case 'en-AG':
    defaultSymbols = DateIntervalSymbols_en_AG;
    break;
  case 'en_AI':
  case 'en-AI':
    defaultSymbols = DateIntervalSymbols_en_AI;
    break;
  case 'en_AS':
  case 'en-AS':
    defaultSymbols = DateIntervalSymbols_en_AS;
    break;
  case 'en_AT':
  case 'en-AT':
    defaultSymbols = DateIntervalSymbols_en_AT;
    break;
  case 'en_BB':
  case 'en-BB':
    defaultSymbols = DateIntervalSymbols_en_BB;
    break;
  case 'en_BE':
  case 'en-BE':
    defaultSymbols = DateIntervalSymbols_en_BE;
    break;
  case 'en_BI':
  case 'en-BI':
    defaultSymbols = DateIntervalSymbols_en_BI;
    break;
  case 'en_BM':
  case 'en-BM':
    defaultSymbols = DateIntervalSymbols_en_BM;
    break;
  case 'en_BS':
  case 'en-BS':
    defaultSymbols = DateIntervalSymbols_en_BS;
    break;
  case 'en_BW':
  case 'en-BW':
    defaultSymbols = DateIntervalSymbols_en_BW;
    break;
  case 'en_BZ':
  case 'en-BZ':
    defaultSymbols = DateIntervalSymbols_en_BZ;
    break;
  case 'en_CC':
  case 'en-CC':
    defaultSymbols = DateIntervalSymbols_en_CC;
    break;
  case 'en_CH':
  case 'en-CH':
    defaultSymbols = DateIntervalSymbols_en_CH;
    break;
  case 'en_CK':
  case 'en-CK':
    defaultSymbols = DateIntervalSymbols_en_CK;
    break;
  case 'en_CM':
  case 'en-CM':
    defaultSymbols = DateIntervalSymbols_en_CM;
    break;
  case 'en_CX':
  case 'en-CX':
    defaultSymbols = DateIntervalSymbols_en_CX;
    break;
  case 'en_CY':
  case 'en-CY':
    defaultSymbols = DateIntervalSymbols_en_CY;
    break;
  case 'en_DE':
  case 'en-DE':
    defaultSymbols = DateIntervalSymbols_en_DE;
    break;
  case 'en_DG':
  case 'en-DG':
    defaultSymbols = DateIntervalSymbols_en_DG;
    break;
  case 'en_DK':
  case 'en-DK':
    defaultSymbols = DateIntervalSymbols_en_DK;
    break;
  case 'en_DM':
  case 'en-DM':
    defaultSymbols = DateIntervalSymbols_en_DM;
    break;
  case 'en_ER':
  case 'en-ER':
    defaultSymbols = DateIntervalSymbols_en_ER;
    break;
  case 'en_FI':
  case 'en-FI':
    defaultSymbols = DateIntervalSymbols_en_FI;
    break;
  case 'en_FJ':
  case 'en-FJ':
    defaultSymbols = DateIntervalSymbols_en_FJ;
    break;
  case 'en_FK':
  case 'en-FK':
    defaultSymbols = DateIntervalSymbols_en_FK;
    break;
  case 'en_FM':
  case 'en-FM':
    defaultSymbols = DateIntervalSymbols_en_FM;
    break;
  case 'en_GD':
  case 'en-GD':
    defaultSymbols = DateIntervalSymbols_en_GD;
    break;
  case 'en_GG':
  case 'en-GG':
    defaultSymbols = DateIntervalSymbols_en_GG;
    break;
  case 'en_GH':
  case 'en-GH':
    defaultSymbols = DateIntervalSymbols_en_GH;
    break;
  case 'en_GI':
  case 'en-GI':
    defaultSymbols = DateIntervalSymbols_en_GI;
    break;
  case 'en_GM':
  case 'en-GM':
    defaultSymbols = DateIntervalSymbols_en_GM;
    break;
  case 'en_GU':
  case 'en-GU':
    defaultSymbols = DateIntervalSymbols_en_GU;
    break;
  case 'en_GY':
  case 'en-GY':
    defaultSymbols = DateIntervalSymbols_en_GY;
    break;
  case 'en_HK':
  case 'en-HK':
    defaultSymbols = DateIntervalSymbols_en_HK;
    break;
  case 'en_IL':
  case 'en-IL':
    defaultSymbols = DateIntervalSymbols_en_IL;
    break;
  case 'en_IM':
  case 'en-IM':
    defaultSymbols = DateIntervalSymbols_en_IM;
    break;
  case 'en_IO':
  case 'en-IO':
    defaultSymbols = DateIntervalSymbols_en_IO;
    break;
  case 'en_JE':
  case 'en-JE':
    defaultSymbols = DateIntervalSymbols_en_JE;
    break;
  case 'en_JM':
  case 'en-JM':
    defaultSymbols = DateIntervalSymbols_en_JM;
    break;
  case 'en_KE':
  case 'en-KE':
    defaultSymbols = DateIntervalSymbols_en_KE;
    break;
  case 'en_KI':
  case 'en-KI':
    defaultSymbols = DateIntervalSymbols_en_KI;
    break;
  case 'en_KN':
  case 'en-KN':
    defaultSymbols = DateIntervalSymbols_en_KN;
    break;
  case 'en_KY':
  case 'en-KY':
    defaultSymbols = DateIntervalSymbols_en_KY;
    break;
  case 'en_LC':
  case 'en-LC':
    defaultSymbols = DateIntervalSymbols_en_LC;
    break;
  case 'en_LR':
  case 'en-LR':
    defaultSymbols = DateIntervalSymbols_en_LR;
    break;
  case 'en_LS':
  case 'en-LS':
    defaultSymbols = DateIntervalSymbols_en_LS;
    break;
  case 'en_MG':
  case 'en-MG':
    defaultSymbols = DateIntervalSymbols_en_MG;
    break;
  case 'en_MH':
  case 'en-MH':
    defaultSymbols = DateIntervalSymbols_en_MH;
    break;
  case 'en_MO':
  case 'en-MO':
    defaultSymbols = DateIntervalSymbols_en_MO;
    break;
  case 'en_MP':
  case 'en-MP':
    defaultSymbols = DateIntervalSymbols_en_MP;
    break;
  case 'en_MS':
  case 'en-MS':
    defaultSymbols = DateIntervalSymbols_en_MS;
    break;
  case 'en_MT':
  case 'en-MT':
    defaultSymbols = DateIntervalSymbols_en_MT;
    break;
  case 'en_MU':
  case 'en-MU':
    defaultSymbols = DateIntervalSymbols_en_MU;
    break;
  case 'en_MV':
  case 'en-MV':
    defaultSymbols = DateIntervalSymbols_en_MV;
    break;
  case 'en_MW':
  case 'en-MW':
    defaultSymbols = DateIntervalSymbols_en_MW;
    break;
  case 'en_MY':
  case 'en-MY':
    defaultSymbols = DateIntervalSymbols_en_MY;
    break;
  case 'en_NA':
  case 'en-NA':
    defaultSymbols = DateIntervalSymbols_en_NA;
    break;
  case 'en_NF':
  case 'en-NF':
    defaultSymbols = DateIntervalSymbols_en_NF;
    break;
  case 'en_NG':
  case 'en-NG':
    defaultSymbols = DateIntervalSymbols_en_NG;
    break;
  case 'en_NL':
  case 'en-NL':
    defaultSymbols = DateIntervalSymbols_en_NL;
    break;
  case 'en_NR':
  case 'en-NR':
    defaultSymbols = DateIntervalSymbols_en_NR;
    break;
  case 'en_NU':
  case 'en-NU':
    defaultSymbols = DateIntervalSymbols_en_NU;
    break;
  case 'en_NZ':
  case 'en-NZ':
    defaultSymbols = DateIntervalSymbols_en_NZ;
    break;
  case 'en_PG':
  case 'en-PG':
    defaultSymbols = DateIntervalSymbols_en_PG;
    break;
  case 'en_PH':
  case 'en-PH':
    defaultSymbols = DateIntervalSymbols_en_PH;
    break;
  case 'en_PK':
  case 'en-PK':
    defaultSymbols = DateIntervalSymbols_en_PK;
    break;
  case 'en_PN':
  case 'en-PN':
    defaultSymbols = DateIntervalSymbols_en_PN;
    break;
  case 'en_PR':
  case 'en-PR':
    defaultSymbols = DateIntervalSymbols_en_PR;
    break;
  case 'en_PW':
  case 'en-PW':
    defaultSymbols = DateIntervalSymbols_en_PW;
    break;
  case 'en_RW':
  case 'en-RW':
    defaultSymbols = DateIntervalSymbols_en_RW;
    break;
  case 'en_SB':
  case 'en-SB':
    defaultSymbols = DateIntervalSymbols_en_SB;
    break;
  case 'en_SC':
  case 'en-SC':
    defaultSymbols = DateIntervalSymbols_en_SC;
    break;
  case 'en_SD':
  case 'en-SD':
    defaultSymbols = DateIntervalSymbols_en_SD;
    break;
  case 'en_SE':
  case 'en-SE':
    defaultSymbols = DateIntervalSymbols_en_SE;
    break;
  case 'en_SH':
  case 'en-SH':
    defaultSymbols = DateIntervalSymbols_en_SH;
    break;
  case 'en_SI':
  case 'en-SI':
    defaultSymbols = DateIntervalSymbols_en_SI;
    break;
  case 'en_SL':
  case 'en-SL':
    defaultSymbols = DateIntervalSymbols_en_SL;
    break;
  case 'en_SS':
  case 'en-SS':
    defaultSymbols = DateIntervalSymbols_en_SS;
    break;
  case 'en_SX':
  case 'en-SX':
    defaultSymbols = DateIntervalSymbols_en_SX;
    break;
  case 'en_SZ':
  case 'en-SZ':
    defaultSymbols = DateIntervalSymbols_en_SZ;
    break;
  case 'en_TC':
  case 'en-TC':
    defaultSymbols = DateIntervalSymbols_en_TC;
    break;
  case 'en_TK':
  case 'en-TK':
    defaultSymbols = DateIntervalSymbols_en_TK;
    break;
  case 'en_TO':
  case 'en-TO':
    defaultSymbols = DateIntervalSymbols_en_TO;
    break;
  case 'en_TT':
  case 'en-TT':
    defaultSymbols = DateIntervalSymbols_en_TT;
    break;
  case 'en_TV':
  case 'en-TV':
    defaultSymbols = DateIntervalSymbols_en_TV;
    break;
  case 'en_TZ':
  case 'en-TZ':
    defaultSymbols = DateIntervalSymbols_en_TZ;
    break;
  case 'en_UG':
  case 'en-UG':
    defaultSymbols = DateIntervalSymbols_en_UG;
    break;
  case 'en_UM':
  case 'en-UM':
    defaultSymbols = DateIntervalSymbols_en_UM;
    break;
  case 'en_US_POSIX':
  case 'en-US-POSIX':
    defaultSymbols = DateIntervalSymbols_en_US_POSIX;
    break;
  case 'en_VC':
  case 'en-VC':
    defaultSymbols = DateIntervalSymbols_en_VC;
    break;
  case 'en_VG':
  case 'en-VG':
    defaultSymbols = DateIntervalSymbols_en_VG;
    break;
  case 'en_VI':
  case 'en-VI':
    defaultSymbols = DateIntervalSymbols_en_VI;
    break;
  case 'en_VU':
  case 'en-VU':
    defaultSymbols = DateIntervalSymbols_en_VU;
    break;
  case 'en_WS':
  case 'en-WS':
    defaultSymbols = DateIntervalSymbols_en_WS;
    break;
  case 'en_XA':
  case 'en-XA':
    defaultSymbols = DateIntervalSymbols_en_XA;
    break;
  case 'en_ZM':
  case 'en-ZM':
    defaultSymbols = DateIntervalSymbols_en_ZM;
    break;
  case 'en_ZW':
  case 'en-ZW':
    defaultSymbols = DateIntervalSymbols_en_ZW;
    break;
  case 'eo':
    defaultSymbols = DateIntervalSymbols_eo;
    break;
  case 'eo_001':
  case 'eo-001':
    defaultSymbols = DateIntervalSymbols_eo_001;
    break;
  case 'es_AR':
  case 'es-AR':
    defaultSymbols = DateIntervalSymbols_es_AR;
    break;
  case 'es_BO':
  case 'es-BO':
    defaultSymbols = DateIntervalSymbols_es_BO;
    break;
  case 'es_BR':
  case 'es-BR':
    defaultSymbols = DateIntervalSymbols_es_BR;
    break;
  case 'es_BZ':
  case 'es-BZ':
    defaultSymbols = DateIntervalSymbols_es_BZ;
    break;
  case 'es_CL':
  case 'es-CL':
    defaultSymbols = DateIntervalSymbols_es_CL;
    break;
  case 'es_CO':
  case 'es-CO':
    defaultSymbols = DateIntervalSymbols_es_CO;
    break;
  case 'es_CR':
  case 'es-CR':
    defaultSymbols = DateIntervalSymbols_es_CR;
    break;
  case 'es_CU':
  case 'es-CU':
    defaultSymbols = DateIntervalSymbols_es_CU;
    break;
  case 'es_DO':
  case 'es-DO':
    defaultSymbols = DateIntervalSymbols_es_DO;
    break;
  case 'es_EA':
  case 'es-EA':
    defaultSymbols = DateIntervalSymbols_es_EA;
    break;
  case 'es_EC':
  case 'es-EC':
    defaultSymbols = DateIntervalSymbols_es_EC;
    break;
  case 'es_GQ':
  case 'es-GQ':
    defaultSymbols = DateIntervalSymbols_es_GQ;
    break;
  case 'es_GT':
  case 'es-GT':
    defaultSymbols = DateIntervalSymbols_es_GT;
    break;
  case 'es_HN':
  case 'es-HN':
    defaultSymbols = DateIntervalSymbols_es_HN;
    break;
  case 'es_IC':
  case 'es-IC':
    defaultSymbols = DateIntervalSymbols_es_IC;
    break;
  case 'es_NI':
  case 'es-NI':
    defaultSymbols = DateIntervalSymbols_es_NI;
    break;
  case 'es_PA':
  case 'es-PA':
    defaultSymbols = DateIntervalSymbols_es_PA;
    break;
  case 'es_PE':
  case 'es-PE':
    defaultSymbols = DateIntervalSymbols_es_PE;
    break;
  case 'es_PH':
  case 'es-PH':
    defaultSymbols = DateIntervalSymbols_es_PH;
    break;
  case 'es_PR':
  case 'es-PR':
    defaultSymbols = DateIntervalSymbols_es_PR;
    break;
  case 'es_PY':
  case 'es-PY':
    defaultSymbols = DateIntervalSymbols_es_PY;
    break;
  case 'es_SV':
  case 'es-SV':
    defaultSymbols = DateIntervalSymbols_es_SV;
    break;
  case 'es_UY':
  case 'es-UY':
    defaultSymbols = DateIntervalSymbols_es_UY;
    break;
  case 'es_VE':
  case 'es-VE':
    defaultSymbols = DateIntervalSymbols_es_VE;
    break;
  case 'et_EE':
  case 'et-EE':
    defaultSymbols = DateIntervalSymbols_et_EE;
    break;
  case 'eu_ES':
  case 'eu-ES':
    defaultSymbols = DateIntervalSymbols_eu_ES;
    break;
  case 'ewo':
    defaultSymbols = DateIntervalSymbols_ewo;
    break;
  case 'ewo_CM':
  case 'ewo-CM':
    defaultSymbols = DateIntervalSymbols_ewo_CM;
    break;
  case 'fa_AF':
  case 'fa-AF':
    defaultSymbols = DateIntervalSymbols_fa_AF;
    break;
  case 'fa_IR':
  case 'fa-IR':
    defaultSymbols = DateIntervalSymbols_fa_IR;
    break;
  case 'ff':
    defaultSymbols = DateIntervalSymbols_ff;
    break;
  case 'ff_Adlm':
  case 'ff-Adlm':
    defaultSymbols = DateIntervalSymbols_ff_Adlm;
    break;
  case 'ff_Adlm_BF':
  case 'ff-Adlm-BF':
    defaultSymbols = DateIntervalSymbols_ff_Adlm_BF;
    break;
  case 'ff_Adlm_CM':
  case 'ff-Adlm-CM':
    defaultSymbols = DateIntervalSymbols_ff_Adlm_CM;
    break;
  case 'ff_Adlm_GH':
  case 'ff-Adlm-GH':
    defaultSymbols = DateIntervalSymbols_ff_Adlm_GH;
    break;
  case 'ff_Adlm_GM':
  case 'ff-Adlm-GM':
    defaultSymbols = DateIntervalSymbols_ff_Adlm_GM;
    break;
  case 'ff_Adlm_GN':
  case 'ff-Adlm-GN':
    defaultSymbols = DateIntervalSymbols_ff_Adlm_GN;
    break;
  case 'ff_Adlm_GW':
  case 'ff-Adlm-GW':
    defaultSymbols = DateIntervalSymbols_ff_Adlm_GW;
    break;
  case 'ff_Adlm_LR':
  case 'ff-Adlm-LR':
    defaultSymbols = DateIntervalSymbols_ff_Adlm_LR;
    break;
  case 'ff_Adlm_MR':
  case 'ff-Adlm-MR':
    defaultSymbols = DateIntervalSymbols_ff_Adlm_MR;
    break;
  case 'ff_Adlm_NE':
  case 'ff-Adlm-NE':
    defaultSymbols = DateIntervalSymbols_ff_Adlm_NE;
    break;
  case 'ff_Adlm_NG':
  case 'ff-Adlm-NG':
    defaultSymbols = DateIntervalSymbols_ff_Adlm_NG;
    break;
  case 'ff_Adlm_SL':
  case 'ff-Adlm-SL':
    defaultSymbols = DateIntervalSymbols_ff_Adlm_SL;
    break;
  case 'ff_Adlm_SN':
  case 'ff-Adlm-SN':
    defaultSymbols = DateIntervalSymbols_ff_Adlm_SN;
    break;
  case 'ff_Latn':
  case 'ff-Latn':
    defaultSymbols = DateIntervalSymbols_ff_Latn;
    break;
  case 'ff_Latn_BF':
  case 'ff-Latn-BF':
    defaultSymbols = DateIntervalSymbols_ff_Latn_BF;
    break;
  case 'ff_Latn_CM':
  case 'ff-Latn-CM':
    defaultSymbols = DateIntervalSymbols_ff_Latn_CM;
    break;
  case 'ff_Latn_GH':
  case 'ff-Latn-GH':
    defaultSymbols = DateIntervalSymbols_ff_Latn_GH;
    break;
  case 'ff_Latn_GM':
  case 'ff-Latn-GM':
    defaultSymbols = DateIntervalSymbols_ff_Latn_GM;
    break;
  case 'ff_Latn_GN':
  case 'ff-Latn-GN':
    defaultSymbols = DateIntervalSymbols_ff_Latn_GN;
    break;
  case 'ff_Latn_GW':
  case 'ff-Latn-GW':
    defaultSymbols = DateIntervalSymbols_ff_Latn_GW;
    break;
  case 'ff_Latn_LR':
  case 'ff-Latn-LR':
    defaultSymbols = DateIntervalSymbols_ff_Latn_LR;
    break;
  case 'ff_Latn_MR':
  case 'ff-Latn-MR':
    defaultSymbols = DateIntervalSymbols_ff_Latn_MR;
    break;
  case 'ff_Latn_NE':
  case 'ff-Latn-NE':
    defaultSymbols = DateIntervalSymbols_ff_Latn_NE;
    break;
  case 'ff_Latn_NG':
  case 'ff-Latn-NG':
    defaultSymbols = DateIntervalSymbols_ff_Latn_NG;
    break;
  case 'ff_Latn_SL':
  case 'ff-Latn-SL':
    defaultSymbols = DateIntervalSymbols_ff_Latn_SL;
    break;
  case 'ff_Latn_SN':
  case 'ff-Latn-SN':
    defaultSymbols = DateIntervalSymbols_ff_Latn_SN;
    break;
  case 'fi_FI':
  case 'fi-FI':
    defaultSymbols = DateIntervalSymbols_fi_FI;
    break;
  case 'fil_PH':
  case 'fil-PH':
    defaultSymbols = DateIntervalSymbols_fil_PH;
    break;
  case 'fo':
    defaultSymbols = DateIntervalSymbols_fo;
    break;
  case 'fo_DK':
  case 'fo-DK':
    defaultSymbols = DateIntervalSymbols_fo_DK;
    break;
  case 'fo_FO':
  case 'fo-FO':
    defaultSymbols = DateIntervalSymbols_fo_FO;
    break;
  case 'fr_BE':
  case 'fr-BE':
    defaultSymbols = DateIntervalSymbols_fr_BE;
    break;
  case 'fr_BF':
  case 'fr-BF':
    defaultSymbols = DateIntervalSymbols_fr_BF;
    break;
  case 'fr_BI':
  case 'fr-BI':
    defaultSymbols = DateIntervalSymbols_fr_BI;
    break;
  case 'fr_BJ':
  case 'fr-BJ':
    defaultSymbols = DateIntervalSymbols_fr_BJ;
    break;
  case 'fr_BL':
  case 'fr-BL':
    defaultSymbols = DateIntervalSymbols_fr_BL;
    break;
  case 'fr_CD':
  case 'fr-CD':
    defaultSymbols = DateIntervalSymbols_fr_CD;
    break;
  case 'fr_CF':
  case 'fr-CF':
    defaultSymbols = DateIntervalSymbols_fr_CF;
    break;
  case 'fr_CG':
  case 'fr-CG':
    defaultSymbols = DateIntervalSymbols_fr_CG;
    break;
  case 'fr_CH':
  case 'fr-CH':
    defaultSymbols = DateIntervalSymbols_fr_CH;
    break;
  case 'fr_CI':
  case 'fr-CI':
    defaultSymbols = DateIntervalSymbols_fr_CI;
    break;
  case 'fr_CM':
  case 'fr-CM':
    defaultSymbols = DateIntervalSymbols_fr_CM;
    break;
  case 'fr_DJ':
  case 'fr-DJ':
    defaultSymbols = DateIntervalSymbols_fr_DJ;
    break;
  case 'fr_DZ':
  case 'fr-DZ':
    defaultSymbols = DateIntervalSymbols_fr_DZ;
    break;
  case 'fr_FR':
  case 'fr-FR':
    defaultSymbols = DateIntervalSymbols_fr_FR;
    break;
  case 'fr_GA':
  case 'fr-GA':
    defaultSymbols = DateIntervalSymbols_fr_GA;
    break;
  case 'fr_GF':
  case 'fr-GF':
    defaultSymbols = DateIntervalSymbols_fr_GF;
    break;
  case 'fr_GN':
  case 'fr-GN':
    defaultSymbols = DateIntervalSymbols_fr_GN;
    break;
  case 'fr_GP':
  case 'fr-GP':
    defaultSymbols = DateIntervalSymbols_fr_GP;
    break;
  case 'fr_GQ':
  case 'fr-GQ':
    defaultSymbols = DateIntervalSymbols_fr_GQ;
    break;
  case 'fr_HT':
  case 'fr-HT':
    defaultSymbols = DateIntervalSymbols_fr_HT;
    break;
  case 'fr_KM':
  case 'fr-KM':
    defaultSymbols = DateIntervalSymbols_fr_KM;
    break;
  case 'fr_LU':
  case 'fr-LU':
    defaultSymbols = DateIntervalSymbols_fr_LU;
    break;
  case 'fr_MA':
  case 'fr-MA':
    defaultSymbols = DateIntervalSymbols_fr_MA;
    break;
  case 'fr_MC':
  case 'fr-MC':
    defaultSymbols = DateIntervalSymbols_fr_MC;
    break;
  case 'fr_MF':
  case 'fr-MF':
    defaultSymbols = DateIntervalSymbols_fr_MF;
    break;
  case 'fr_MG':
  case 'fr-MG':
    defaultSymbols = DateIntervalSymbols_fr_MG;
    break;
  case 'fr_ML':
  case 'fr-ML':
    defaultSymbols = DateIntervalSymbols_fr_ML;
    break;
  case 'fr_MQ':
  case 'fr-MQ':
    defaultSymbols = DateIntervalSymbols_fr_MQ;
    break;
  case 'fr_MR':
  case 'fr-MR':
    defaultSymbols = DateIntervalSymbols_fr_MR;
    break;
  case 'fr_MU':
  case 'fr-MU':
    defaultSymbols = DateIntervalSymbols_fr_MU;
    break;
  case 'fr_NC':
  case 'fr-NC':
    defaultSymbols = DateIntervalSymbols_fr_NC;
    break;
  case 'fr_NE':
  case 'fr-NE':
    defaultSymbols = DateIntervalSymbols_fr_NE;
    break;
  case 'fr_PF':
  case 'fr-PF':
    defaultSymbols = DateIntervalSymbols_fr_PF;
    break;
  case 'fr_PM':
  case 'fr-PM':
    defaultSymbols = DateIntervalSymbols_fr_PM;
    break;
  case 'fr_RE':
  case 'fr-RE':
    defaultSymbols = DateIntervalSymbols_fr_RE;
    break;
  case 'fr_RW':
  case 'fr-RW':
    defaultSymbols = DateIntervalSymbols_fr_RW;
    break;
  case 'fr_SC':
  case 'fr-SC':
    defaultSymbols = DateIntervalSymbols_fr_SC;
    break;
  case 'fr_SN':
  case 'fr-SN':
    defaultSymbols = DateIntervalSymbols_fr_SN;
    break;
  case 'fr_SY':
  case 'fr-SY':
    defaultSymbols = DateIntervalSymbols_fr_SY;
    break;
  case 'fr_TD':
  case 'fr-TD':
    defaultSymbols = DateIntervalSymbols_fr_TD;
    break;
  case 'fr_TG':
  case 'fr-TG':
    defaultSymbols = DateIntervalSymbols_fr_TG;
    break;
  case 'fr_TN':
  case 'fr-TN':
    defaultSymbols = DateIntervalSymbols_fr_TN;
    break;
  case 'fr_VU':
  case 'fr-VU':
    defaultSymbols = DateIntervalSymbols_fr_VU;
    break;
  case 'fr_WF':
  case 'fr-WF':
    defaultSymbols = DateIntervalSymbols_fr_WF;
    break;
  case 'fr_YT':
  case 'fr-YT':
    defaultSymbols = DateIntervalSymbols_fr_YT;
    break;
  case 'fur':
    defaultSymbols = DateIntervalSymbols_fur;
    break;
  case 'fur_IT':
  case 'fur-IT':
    defaultSymbols = DateIntervalSymbols_fur_IT;
    break;
  case 'fy':
    defaultSymbols = DateIntervalSymbols_fy;
    break;
  case 'fy_NL':
  case 'fy-NL':
    defaultSymbols = DateIntervalSymbols_fy_NL;
    break;
  case 'ga_GB':
  case 'ga-GB':
    defaultSymbols = DateIntervalSymbols_ga_GB;
    break;
  case 'ga_IE':
  case 'ga-IE':
    defaultSymbols = DateIntervalSymbols_ga_IE;
    break;
  case 'gd':
    defaultSymbols = DateIntervalSymbols_gd;
    break;
  case 'gd_GB':
  case 'gd-GB':
    defaultSymbols = DateIntervalSymbols_gd_GB;
    break;
  case 'gl_ES':
  case 'gl-ES':
    defaultSymbols = DateIntervalSymbols_gl_ES;
    break;
  case 'gsw_CH':
  case 'gsw-CH':
    defaultSymbols = DateIntervalSymbols_gsw_CH;
    break;
  case 'gsw_FR':
  case 'gsw-FR':
    defaultSymbols = DateIntervalSymbols_gsw_FR;
    break;
  case 'gsw_LI':
  case 'gsw-LI':
    defaultSymbols = DateIntervalSymbols_gsw_LI;
    break;
  case 'gu_IN':
  case 'gu-IN':
    defaultSymbols = DateIntervalSymbols_gu_IN;
    break;
  case 'guz':
    defaultSymbols = DateIntervalSymbols_guz;
    break;
  case 'guz_KE':
  case 'guz-KE':
    defaultSymbols = DateIntervalSymbols_guz_KE;
    break;
  case 'gv':
    defaultSymbols = DateIntervalSymbols_gv;
    break;
  case 'gv_IM':
  case 'gv-IM':
    defaultSymbols = DateIntervalSymbols_gv_IM;
    break;
  case 'ha':
    defaultSymbols = DateIntervalSymbols_ha;
    break;
  case 'ha_GH':
  case 'ha-GH':
    defaultSymbols = DateIntervalSymbols_ha_GH;
    break;
  case 'ha_NE':
  case 'ha-NE':
    defaultSymbols = DateIntervalSymbols_ha_NE;
    break;
  case 'ha_NG':
  case 'ha-NG':
    defaultSymbols = DateIntervalSymbols_ha_NG;
    break;
  case 'haw_US':
  case 'haw-US':
    defaultSymbols = DateIntervalSymbols_haw_US;
    break;
  case 'he_IL':
  case 'he-IL':
    defaultSymbols = DateIntervalSymbols_he_IL;
    break;
  case 'hi_IN':
  case 'hi-IN':
    defaultSymbols = DateIntervalSymbols_hi_IN;
    break;
  case 'hi_Latn':
  case 'hi-Latn':
    defaultSymbols = DateIntervalSymbols_hi_Latn;
    break;
  case 'hi_Latn_IN':
  case 'hi-Latn-IN':
    defaultSymbols = DateIntervalSymbols_hi_Latn_IN;
    break;
  case 'hr_BA':
  case 'hr-BA':
    defaultSymbols = DateIntervalSymbols_hr_BA;
    break;
  case 'hr_HR':
  case 'hr-HR':
    defaultSymbols = DateIntervalSymbols_hr_HR;
    break;
  case 'hsb':
    defaultSymbols = DateIntervalSymbols_hsb;
    break;
  case 'hsb_DE':
  case 'hsb-DE':
    defaultSymbols = DateIntervalSymbols_hsb_DE;
    break;
  case 'hu_HU':
  case 'hu-HU':
    defaultSymbols = DateIntervalSymbols_hu_HU;
    break;
  case 'hy_AM':
  case 'hy-AM':
    defaultSymbols = DateIntervalSymbols_hy_AM;
    break;
  case 'ia':
    defaultSymbols = DateIntervalSymbols_ia;
    break;
  case 'ia_001':
  case 'ia-001':
    defaultSymbols = DateIntervalSymbols_ia_001;
    break;
  case 'id_ID':
  case 'id-ID':
    defaultSymbols = DateIntervalSymbols_id_ID;
    break;
  case 'ig':
    defaultSymbols = DateIntervalSymbols_ig;
    break;
  case 'ig_NG':
  case 'ig-NG':
    defaultSymbols = DateIntervalSymbols_ig_NG;
    break;
  case 'ii':
    defaultSymbols = DateIntervalSymbols_ii;
    break;
  case 'ii_CN':
  case 'ii-CN':
    defaultSymbols = DateIntervalSymbols_ii_CN;
    break;
  case 'is_IS':
  case 'is-IS':
    defaultSymbols = DateIntervalSymbols_is_IS;
    break;
  case 'it_CH':
  case 'it-CH':
    defaultSymbols = DateIntervalSymbols_it_CH;
    break;
  case 'it_IT':
  case 'it-IT':
    defaultSymbols = DateIntervalSymbols_it_IT;
    break;
  case 'it_SM':
  case 'it-SM':
    defaultSymbols = DateIntervalSymbols_it_SM;
    break;
  case 'it_VA':
  case 'it-VA':
    defaultSymbols = DateIntervalSymbols_it_VA;
    break;
  case 'ja_JP':
  case 'ja-JP':
    defaultSymbols = DateIntervalSymbols_ja_JP;
    break;
  case 'jgo':
    defaultSymbols = DateIntervalSymbols_jgo;
    break;
  case 'jgo_CM':
  case 'jgo-CM':
    defaultSymbols = DateIntervalSymbols_jgo_CM;
    break;
  case 'jmc':
    defaultSymbols = DateIntervalSymbols_jmc;
    break;
  case 'jmc_TZ':
  case 'jmc-TZ':
    defaultSymbols = DateIntervalSymbols_jmc_TZ;
    break;
  case 'jv':
    defaultSymbols = DateIntervalSymbols_jv;
    break;
  case 'jv_ID':
  case 'jv-ID':
    defaultSymbols = DateIntervalSymbols_jv_ID;
    break;
  case 'ka_GE':
  case 'ka-GE':
    defaultSymbols = DateIntervalSymbols_ka_GE;
    break;
  case 'kab':
    defaultSymbols = DateIntervalSymbols_kab;
    break;
  case 'kab_DZ':
  case 'kab-DZ':
    defaultSymbols = DateIntervalSymbols_kab_DZ;
    break;
  case 'kam':
    defaultSymbols = DateIntervalSymbols_kam;
    break;
  case 'kam_KE':
  case 'kam-KE':
    defaultSymbols = DateIntervalSymbols_kam_KE;
    break;
  case 'kde':
    defaultSymbols = DateIntervalSymbols_kde;
    break;
  case 'kde_TZ':
  case 'kde-TZ':
    defaultSymbols = DateIntervalSymbols_kde_TZ;
    break;
  case 'kea':
    defaultSymbols = DateIntervalSymbols_kea;
    break;
  case 'kea_CV':
  case 'kea-CV':
    defaultSymbols = DateIntervalSymbols_kea_CV;
    break;
  case 'kgp':
    defaultSymbols = DateIntervalSymbols_kgp;
    break;
  case 'kgp_BR':
  case 'kgp-BR':
    defaultSymbols = DateIntervalSymbols_kgp_BR;
    break;
  case 'khq':
    defaultSymbols = DateIntervalSymbols_khq;
    break;
  case 'khq_ML':
  case 'khq-ML':
    defaultSymbols = DateIntervalSymbols_khq_ML;
    break;
  case 'ki':
    defaultSymbols = DateIntervalSymbols_ki;
    break;
  case 'ki_KE':
  case 'ki-KE':
    defaultSymbols = DateIntervalSymbols_ki_KE;
    break;
  case 'kk_KZ':
  case 'kk-KZ':
    defaultSymbols = DateIntervalSymbols_kk_KZ;
    break;
  case 'kkj':
    defaultSymbols = DateIntervalSymbols_kkj;
    break;
  case 'kkj_CM':
  case 'kkj-CM':
    defaultSymbols = DateIntervalSymbols_kkj_CM;
    break;
  case 'kl':
    defaultSymbols = DateIntervalSymbols_kl;
    break;
  case 'kl_GL':
  case 'kl-GL':
    defaultSymbols = DateIntervalSymbols_kl_GL;
    break;
  case 'kln':
    defaultSymbols = DateIntervalSymbols_kln;
    break;
  case 'kln_KE':
  case 'kln-KE':
    defaultSymbols = DateIntervalSymbols_kln_KE;
    break;
  case 'km_KH':
  case 'km-KH':
    defaultSymbols = DateIntervalSymbols_km_KH;
    break;
  case 'kn_IN':
  case 'kn-IN':
    defaultSymbols = DateIntervalSymbols_kn_IN;
    break;
  case 'ko_KP':
  case 'ko-KP':
    defaultSymbols = DateIntervalSymbols_ko_KP;
    break;
  case 'ko_KR':
  case 'ko-KR':
    defaultSymbols = DateIntervalSymbols_ko_KR;
    break;
  case 'kok':
    defaultSymbols = DateIntervalSymbols_kok;
    break;
  case 'kok_IN':
  case 'kok-IN':
    defaultSymbols = DateIntervalSymbols_kok_IN;
    break;
  case 'ks':
    defaultSymbols = DateIntervalSymbols_ks;
    break;
  case 'ks_Arab':
  case 'ks-Arab':
    defaultSymbols = DateIntervalSymbols_ks_Arab;
    break;
  case 'ks_Arab_IN':
  case 'ks-Arab-IN':
    defaultSymbols = DateIntervalSymbols_ks_Arab_IN;
    break;
  case 'ks_Deva':
  case 'ks-Deva':
    defaultSymbols = DateIntervalSymbols_ks_Deva;
    break;
  case 'ks_Deva_IN':
  case 'ks-Deva-IN':
    defaultSymbols = DateIntervalSymbols_ks_Deva_IN;
    break;
  case 'ksb':
    defaultSymbols = DateIntervalSymbols_ksb;
    break;
  case 'ksb_TZ':
  case 'ksb-TZ':
    defaultSymbols = DateIntervalSymbols_ksb_TZ;
    break;
  case 'ksf':
    defaultSymbols = DateIntervalSymbols_ksf;
    break;
  case 'ksf_CM':
  case 'ksf-CM':
    defaultSymbols = DateIntervalSymbols_ksf_CM;
    break;
  case 'ksh':
    defaultSymbols = DateIntervalSymbols_ksh;
    break;
  case 'ksh_DE':
  case 'ksh-DE':
    defaultSymbols = DateIntervalSymbols_ksh_DE;
    break;
  case 'ku':
    defaultSymbols = DateIntervalSymbols_ku;
    break;
  case 'ku_TR':
  case 'ku-TR':
    defaultSymbols = DateIntervalSymbols_ku_TR;
    break;
  case 'kw':
    defaultSymbols = DateIntervalSymbols_kw;
    break;
  case 'kw_GB':
  case 'kw-GB':
    defaultSymbols = DateIntervalSymbols_kw_GB;
    break;
  case 'ky_KG':
  case 'ky-KG':
    defaultSymbols = DateIntervalSymbols_ky_KG;
    break;
  case 'lag':
    defaultSymbols = DateIntervalSymbols_lag;
    break;
  case 'lag_TZ':
  case 'lag-TZ':
    defaultSymbols = DateIntervalSymbols_lag_TZ;
    break;
  case 'lb':
    defaultSymbols = DateIntervalSymbols_lb;
    break;
  case 'lb_LU':
  case 'lb-LU':
    defaultSymbols = DateIntervalSymbols_lb_LU;
    break;
  case 'lg':
    defaultSymbols = DateIntervalSymbols_lg;
    break;
  case 'lg_UG':
  case 'lg-UG':
    defaultSymbols = DateIntervalSymbols_lg_UG;
    break;
  case 'lkt':
    defaultSymbols = DateIntervalSymbols_lkt;
    break;
  case 'lkt_US':
  case 'lkt-US':
    defaultSymbols = DateIntervalSymbols_lkt_US;
    break;
  case 'ln_AO':
  case 'ln-AO':
    defaultSymbols = DateIntervalSymbols_ln_AO;
    break;
  case 'ln_CD':
  case 'ln-CD':
    defaultSymbols = DateIntervalSymbols_ln_CD;
    break;
  case 'ln_CF':
  case 'ln-CF':
    defaultSymbols = DateIntervalSymbols_ln_CF;
    break;
  case 'ln_CG':
  case 'ln-CG':
    defaultSymbols = DateIntervalSymbols_ln_CG;
    break;
  case 'lo_LA':
  case 'lo-LA':
    defaultSymbols = DateIntervalSymbols_lo_LA;
    break;
  case 'lrc':
    defaultSymbols = DateIntervalSymbols_lrc;
    break;
  case 'lrc_IQ':
  case 'lrc-IQ':
    defaultSymbols = DateIntervalSymbols_lrc_IQ;
    break;
  case 'lrc_IR':
  case 'lrc-IR':
    defaultSymbols = DateIntervalSymbols_lrc_IR;
    break;
  case 'lt_LT':
  case 'lt-LT':
    defaultSymbols = DateIntervalSymbols_lt_LT;
    break;
  case 'lu':
    defaultSymbols = DateIntervalSymbols_lu;
    break;
  case 'lu_CD':
  case 'lu-CD':
    defaultSymbols = DateIntervalSymbols_lu_CD;
    break;
  case 'luo':
    defaultSymbols = DateIntervalSymbols_luo;
    break;
  case 'luo_KE':
  case 'luo-KE':
    defaultSymbols = DateIntervalSymbols_luo_KE;
    break;
  case 'luy':
    defaultSymbols = DateIntervalSymbols_luy;
    break;
  case 'luy_KE':
  case 'luy-KE':
    defaultSymbols = DateIntervalSymbols_luy_KE;
    break;
  case 'lv_LV':
  case 'lv-LV':
    defaultSymbols = DateIntervalSymbols_lv_LV;
    break;
  case 'mai':
    defaultSymbols = DateIntervalSymbols_mai;
    break;
  case 'mai_IN':
  case 'mai-IN':
    defaultSymbols = DateIntervalSymbols_mai_IN;
    break;
  case 'mas':
    defaultSymbols = DateIntervalSymbols_mas;
    break;
  case 'mas_KE':
  case 'mas-KE':
    defaultSymbols = DateIntervalSymbols_mas_KE;
    break;
  case 'mas_TZ':
  case 'mas-TZ':
    defaultSymbols = DateIntervalSymbols_mas_TZ;
    break;
  case 'mer':
    defaultSymbols = DateIntervalSymbols_mer;
    break;
  case 'mer_KE':
  case 'mer-KE':
    defaultSymbols = DateIntervalSymbols_mer_KE;
    break;
  case 'mfe':
    defaultSymbols = DateIntervalSymbols_mfe;
    break;
  case 'mfe_MU':
  case 'mfe-MU':
    defaultSymbols = DateIntervalSymbols_mfe_MU;
    break;
  case 'mg':
    defaultSymbols = DateIntervalSymbols_mg;
    break;
  case 'mg_MG':
  case 'mg-MG':
    defaultSymbols = DateIntervalSymbols_mg_MG;
    break;
  case 'mgh':
    defaultSymbols = DateIntervalSymbols_mgh;
    break;
  case 'mgh_MZ':
  case 'mgh-MZ':
    defaultSymbols = DateIntervalSymbols_mgh_MZ;
    break;
  case 'mgo':
    defaultSymbols = DateIntervalSymbols_mgo;
    break;
  case 'mgo_CM':
  case 'mgo-CM':
    defaultSymbols = DateIntervalSymbols_mgo_CM;
    break;
  case 'mi':
    defaultSymbols = DateIntervalSymbols_mi;
    break;
  case 'mi_NZ':
  case 'mi-NZ':
    defaultSymbols = DateIntervalSymbols_mi_NZ;
    break;
  case 'mk_MK':
  case 'mk-MK':
    defaultSymbols = DateIntervalSymbols_mk_MK;
    break;
  case 'ml_IN':
  case 'ml-IN':
    defaultSymbols = DateIntervalSymbols_ml_IN;
    break;
  case 'mn_MN':
  case 'mn-MN':
    defaultSymbols = DateIntervalSymbols_mn_MN;
    break;
  case 'mni':
    defaultSymbols = DateIntervalSymbols_mni;
    break;
  case 'mni_Beng':
  case 'mni-Beng':
    defaultSymbols = DateIntervalSymbols_mni_Beng;
    break;
  case 'mni_Beng_IN':
  case 'mni-Beng-IN':
    defaultSymbols = DateIntervalSymbols_mni_Beng_IN;
    break;
  case 'mr_IN':
  case 'mr-IN':
    defaultSymbols = DateIntervalSymbols_mr_IN;
    break;
  case 'ms_BN':
  case 'ms-BN':
    defaultSymbols = DateIntervalSymbols_ms_BN;
    break;
  case 'ms_ID':
  case 'ms-ID':
    defaultSymbols = DateIntervalSymbols_ms_ID;
    break;
  case 'ms_MY':
  case 'ms-MY':
    defaultSymbols = DateIntervalSymbols_ms_MY;
    break;
  case 'ms_SG':
  case 'ms-SG':
    defaultSymbols = DateIntervalSymbols_ms_SG;
    break;
  case 'mt_MT':
  case 'mt-MT':
    defaultSymbols = DateIntervalSymbols_mt_MT;
    break;
  case 'mua':
    defaultSymbols = DateIntervalSymbols_mua;
    break;
  case 'mua_CM':
  case 'mua-CM':
    defaultSymbols = DateIntervalSymbols_mua_CM;
    break;
  case 'my_MM':
  case 'my-MM':
    defaultSymbols = DateIntervalSymbols_my_MM;
    break;
  case 'mzn':
    defaultSymbols = DateIntervalSymbols_mzn;
    break;
  case 'mzn_IR':
  case 'mzn-IR':
    defaultSymbols = DateIntervalSymbols_mzn_IR;
    break;
  case 'naq':
    defaultSymbols = DateIntervalSymbols_naq;
    break;
  case 'naq_NA':
  case 'naq-NA':
    defaultSymbols = DateIntervalSymbols_naq_NA;
    break;
  case 'nb_NO':
  case 'nb-NO':
    defaultSymbols = DateIntervalSymbols_nb_NO;
    break;
  case 'nb_SJ':
  case 'nb-SJ':
    defaultSymbols = DateIntervalSymbols_nb_SJ;
    break;
  case 'nd':
    defaultSymbols = DateIntervalSymbols_nd;
    break;
  case 'nd_ZW':
  case 'nd-ZW':
    defaultSymbols = DateIntervalSymbols_nd_ZW;
    break;
  case 'ne_IN':
  case 'ne-IN':
    defaultSymbols = DateIntervalSymbols_ne_IN;
    break;
  case 'ne_NP':
  case 'ne-NP':
    defaultSymbols = DateIntervalSymbols_ne_NP;
    break;
  case 'nl_AW':
  case 'nl-AW':
    defaultSymbols = DateIntervalSymbols_nl_AW;
    break;
  case 'nl_BE':
  case 'nl-BE':
    defaultSymbols = DateIntervalSymbols_nl_BE;
    break;
  case 'nl_BQ':
  case 'nl-BQ':
    defaultSymbols = DateIntervalSymbols_nl_BQ;
    break;
  case 'nl_CW':
  case 'nl-CW':
    defaultSymbols = DateIntervalSymbols_nl_CW;
    break;
  case 'nl_NL':
  case 'nl-NL':
    defaultSymbols = DateIntervalSymbols_nl_NL;
    break;
  case 'nl_SR':
  case 'nl-SR':
    defaultSymbols = DateIntervalSymbols_nl_SR;
    break;
  case 'nl_SX':
  case 'nl-SX':
    defaultSymbols = DateIntervalSymbols_nl_SX;
    break;
  case 'nmg':
    defaultSymbols = DateIntervalSymbols_nmg;
    break;
  case 'nmg_CM':
  case 'nmg-CM':
    defaultSymbols = DateIntervalSymbols_nmg_CM;
    break;
  case 'nn':
    defaultSymbols = DateIntervalSymbols_nn;
    break;
  case 'nn_NO':
  case 'nn-NO':
    defaultSymbols = DateIntervalSymbols_nn_NO;
    break;
  case 'nnh':
    defaultSymbols = DateIntervalSymbols_nnh;
    break;
  case 'nnh_CM':
  case 'nnh-CM':
    defaultSymbols = DateIntervalSymbols_nnh_CM;
    break;
  case 'nus':
    defaultSymbols = DateIntervalSymbols_nus;
    break;
  case 'nus_SS':
  case 'nus-SS':
    defaultSymbols = DateIntervalSymbols_nus_SS;
    break;
  case 'nyn':
    defaultSymbols = DateIntervalSymbols_nyn;
    break;
  case 'nyn_UG':
  case 'nyn-UG':
    defaultSymbols = DateIntervalSymbols_nyn_UG;
    break;
  case 'om':
    defaultSymbols = DateIntervalSymbols_om;
    break;
  case 'om_ET':
  case 'om-ET':
    defaultSymbols = DateIntervalSymbols_om_ET;
    break;
  case 'om_KE':
  case 'om-KE':
    defaultSymbols = DateIntervalSymbols_om_KE;
    break;
  case 'or_IN':
  case 'or-IN':
    defaultSymbols = DateIntervalSymbols_or_IN;
    break;
  case 'os':
    defaultSymbols = DateIntervalSymbols_os;
    break;
  case 'os_GE':
  case 'os-GE':
    defaultSymbols = DateIntervalSymbols_os_GE;
    break;
  case 'os_RU':
  case 'os-RU':
    defaultSymbols = DateIntervalSymbols_os_RU;
    break;
  case 'pa_Arab':
  case 'pa-Arab':
    defaultSymbols = DateIntervalSymbols_pa_Arab;
    break;
  case 'pa_Arab_PK':
  case 'pa-Arab-PK':
    defaultSymbols = DateIntervalSymbols_pa_Arab_PK;
    break;
  case 'pa_Guru':
  case 'pa-Guru':
    defaultSymbols = DateIntervalSymbols_pa_Guru;
    break;
  case 'pa_Guru_IN':
  case 'pa-Guru-IN':
    defaultSymbols = DateIntervalSymbols_pa_Guru_IN;
    break;
  case 'pcm':
    defaultSymbols = DateIntervalSymbols_pcm;
    break;
  case 'pcm_NG':
  case 'pcm-NG':
    defaultSymbols = DateIntervalSymbols_pcm_NG;
    break;
  case 'pl_PL':
  case 'pl-PL':
    defaultSymbols = DateIntervalSymbols_pl_PL;
    break;
  case 'ps':
    defaultSymbols = DateIntervalSymbols_ps;
    break;
  case 'ps_AF':
  case 'ps-AF':
    defaultSymbols = DateIntervalSymbols_ps_AF;
    break;
  case 'ps_PK':
  case 'ps-PK':
    defaultSymbols = DateIntervalSymbols_ps_PK;
    break;
  case 'pt_AO':
  case 'pt-AO':
    defaultSymbols = DateIntervalSymbols_pt_AO;
    break;
  case 'pt_CH':
  case 'pt-CH':
    defaultSymbols = DateIntervalSymbols_pt_CH;
    break;
  case 'pt_CV':
  case 'pt-CV':
    defaultSymbols = DateIntervalSymbols_pt_CV;
    break;
  case 'pt_GQ':
  case 'pt-GQ':
    defaultSymbols = DateIntervalSymbols_pt_GQ;
    break;
  case 'pt_GW':
  case 'pt-GW':
    defaultSymbols = DateIntervalSymbols_pt_GW;
    break;
  case 'pt_LU':
  case 'pt-LU':
    defaultSymbols = DateIntervalSymbols_pt_LU;
    break;
  case 'pt_MO':
  case 'pt-MO':
    defaultSymbols = DateIntervalSymbols_pt_MO;
    break;
  case 'pt_MZ':
  case 'pt-MZ':
    defaultSymbols = DateIntervalSymbols_pt_MZ;
    break;
  case 'pt_ST':
  case 'pt-ST':
    defaultSymbols = DateIntervalSymbols_pt_ST;
    break;
  case 'pt_TL':
  case 'pt-TL':
    defaultSymbols = DateIntervalSymbols_pt_TL;
    break;
  case 'qu':
    defaultSymbols = DateIntervalSymbols_qu;
    break;
  case 'qu_BO':
  case 'qu-BO':
    defaultSymbols = DateIntervalSymbols_qu_BO;
    break;
  case 'qu_EC':
  case 'qu-EC':
    defaultSymbols = DateIntervalSymbols_qu_EC;
    break;
  case 'qu_PE':
  case 'qu-PE':
    defaultSymbols = DateIntervalSymbols_qu_PE;
    break;
  case 'raj':
    defaultSymbols = DateIntervalSymbols_raj;
    break;
  case 'raj_IN':
  case 'raj-IN':
    defaultSymbols = DateIntervalSymbols_raj_IN;
    break;
  case 'rm':
    defaultSymbols = DateIntervalSymbols_rm;
    break;
  case 'rm_CH':
  case 'rm-CH':
    defaultSymbols = DateIntervalSymbols_rm_CH;
    break;
  case 'rn':
    defaultSymbols = DateIntervalSymbols_rn;
    break;
  case 'rn_BI':
  case 'rn-BI':
    defaultSymbols = DateIntervalSymbols_rn_BI;
    break;
  case 'ro_MD':
  case 'ro-MD':
    defaultSymbols = DateIntervalSymbols_ro_MD;
    break;
  case 'ro_RO':
  case 'ro-RO':
    defaultSymbols = DateIntervalSymbols_ro_RO;
    break;
  case 'rof':
    defaultSymbols = DateIntervalSymbols_rof;
    break;
  case 'rof_TZ':
  case 'rof-TZ':
    defaultSymbols = DateIntervalSymbols_rof_TZ;
    break;
  case 'ru_BY':
  case 'ru-BY':
    defaultSymbols = DateIntervalSymbols_ru_BY;
    break;
  case 'ru_KG':
  case 'ru-KG':
    defaultSymbols = DateIntervalSymbols_ru_KG;
    break;
  case 'ru_KZ':
  case 'ru-KZ':
    defaultSymbols = DateIntervalSymbols_ru_KZ;
    break;
  case 'ru_MD':
  case 'ru-MD':
    defaultSymbols = DateIntervalSymbols_ru_MD;
    break;
  case 'ru_RU':
  case 'ru-RU':
    defaultSymbols = DateIntervalSymbols_ru_RU;
    break;
  case 'ru_UA':
  case 'ru-UA':
    defaultSymbols = DateIntervalSymbols_ru_UA;
    break;
  case 'rw':
    defaultSymbols = DateIntervalSymbols_rw;
    break;
  case 'rw_RW':
  case 'rw-RW':
    defaultSymbols = DateIntervalSymbols_rw_RW;
    break;
  case 'rwk':
    defaultSymbols = DateIntervalSymbols_rwk;
    break;
  case 'rwk_TZ':
  case 'rwk-TZ':
    defaultSymbols = DateIntervalSymbols_rwk_TZ;
    break;
  case 'sa':
    defaultSymbols = DateIntervalSymbols_sa;
    break;
  case 'sa_IN':
  case 'sa-IN':
    defaultSymbols = DateIntervalSymbols_sa_IN;
    break;
  case 'sah':
    defaultSymbols = DateIntervalSymbols_sah;
    break;
  case 'sah_RU':
  case 'sah-RU':
    defaultSymbols = DateIntervalSymbols_sah_RU;
    break;
  case 'saq':
    defaultSymbols = DateIntervalSymbols_saq;
    break;
  case 'saq_KE':
  case 'saq-KE':
    defaultSymbols = DateIntervalSymbols_saq_KE;
    break;
  case 'sat':
    defaultSymbols = DateIntervalSymbols_sat;
    break;
  case 'sat_Olck':
  case 'sat-Olck':
    defaultSymbols = DateIntervalSymbols_sat_Olck;
    break;
  case 'sat_Olck_IN':
  case 'sat-Olck-IN':
    defaultSymbols = DateIntervalSymbols_sat_Olck_IN;
    break;
  case 'sbp':
    defaultSymbols = DateIntervalSymbols_sbp;
    break;
  case 'sbp_TZ':
  case 'sbp-TZ':
    defaultSymbols = DateIntervalSymbols_sbp_TZ;
    break;
  case 'sc':
    defaultSymbols = DateIntervalSymbols_sc;
    break;
  case 'sc_IT':
  case 'sc-IT':
    defaultSymbols = DateIntervalSymbols_sc_IT;
    break;
  case 'sd':
    defaultSymbols = DateIntervalSymbols_sd;
    break;
  case 'sd_Arab':
  case 'sd-Arab':
    defaultSymbols = DateIntervalSymbols_sd_Arab;
    break;
  case 'sd_Arab_PK':
  case 'sd-Arab-PK':
    defaultSymbols = DateIntervalSymbols_sd_Arab_PK;
    break;
  case 'sd_Deva':
  case 'sd-Deva':
    defaultSymbols = DateIntervalSymbols_sd_Deva;
    break;
  case 'sd_Deva_IN':
  case 'sd-Deva-IN':
    defaultSymbols = DateIntervalSymbols_sd_Deva_IN;
    break;
  case 'se':
    defaultSymbols = DateIntervalSymbols_se;
    break;
  case 'se_FI':
  case 'se-FI':
    defaultSymbols = DateIntervalSymbols_se_FI;
    break;
  case 'se_NO':
  case 'se-NO':
    defaultSymbols = DateIntervalSymbols_se_NO;
    break;
  case 'se_SE':
  case 'se-SE':
    defaultSymbols = DateIntervalSymbols_se_SE;
    break;
  case 'seh':
    defaultSymbols = DateIntervalSymbols_seh;
    break;
  case 'seh_MZ':
  case 'seh-MZ':
    defaultSymbols = DateIntervalSymbols_seh_MZ;
    break;
  case 'ses':
    defaultSymbols = DateIntervalSymbols_ses;
    break;
  case 'ses_ML':
  case 'ses-ML':
    defaultSymbols = DateIntervalSymbols_ses_ML;
    break;
  case 'sg':
    defaultSymbols = DateIntervalSymbols_sg;
    break;
  case 'sg_CF':
  case 'sg-CF':
    defaultSymbols = DateIntervalSymbols_sg_CF;
    break;
  case 'shi':
    defaultSymbols = DateIntervalSymbols_shi;
    break;
  case 'shi_Latn':
  case 'shi-Latn':
    defaultSymbols = DateIntervalSymbols_shi_Latn;
    break;
  case 'shi_Latn_MA':
  case 'shi-Latn-MA':
    defaultSymbols = DateIntervalSymbols_shi_Latn_MA;
    break;
  case 'shi_Tfng':
  case 'shi-Tfng':
    defaultSymbols = DateIntervalSymbols_shi_Tfng;
    break;
  case 'shi_Tfng_MA':
  case 'shi-Tfng-MA':
    defaultSymbols = DateIntervalSymbols_shi_Tfng_MA;
    break;
  case 'si_LK':
  case 'si-LK':
    defaultSymbols = DateIntervalSymbols_si_LK;
    break;
  case 'sk_SK':
  case 'sk-SK':
    defaultSymbols = DateIntervalSymbols_sk_SK;
    break;
  case 'sl_SI':
  case 'sl-SI':
    defaultSymbols = DateIntervalSymbols_sl_SI;
    break;
  case 'smn':
    defaultSymbols = DateIntervalSymbols_smn;
    break;
  case 'smn_FI':
  case 'smn-FI':
    defaultSymbols = DateIntervalSymbols_smn_FI;
    break;
  case 'sn':
    defaultSymbols = DateIntervalSymbols_sn;
    break;
  case 'sn_ZW':
  case 'sn-ZW':
    defaultSymbols = DateIntervalSymbols_sn_ZW;
    break;
  case 'so':
    defaultSymbols = DateIntervalSymbols_so;
    break;
  case 'so_DJ':
  case 'so-DJ':
    defaultSymbols = DateIntervalSymbols_so_DJ;
    break;
  case 'so_ET':
  case 'so-ET':
    defaultSymbols = DateIntervalSymbols_so_ET;
    break;
  case 'so_KE':
  case 'so-KE':
    defaultSymbols = DateIntervalSymbols_so_KE;
    break;
  case 'so_SO':
  case 'so-SO':
    defaultSymbols = DateIntervalSymbols_so_SO;
    break;
  case 'sq_AL':
  case 'sq-AL':
    defaultSymbols = DateIntervalSymbols_sq_AL;
    break;
  case 'sq_MK':
  case 'sq-MK':
    defaultSymbols = DateIntervalSymbols_sq_MK;
    break;
  case 'sq_XK':
  case 'sq-XK':
    defaultSymbols = DateIntervalSymbols_sq_XK;
    break;
  case 'sr_Cyrl':
  case 'sr-Cyrl':
    defaultSymbols = DateIntervalSymbols_sr_Cyrl;
    break;
  case 'sr_Cyrl_BA':
  case 'sr-Cyrl-BA':
    defaultSymbols = DateIntervalSymbols_sr_Cyrl_BA;
    break;
  case 'sr_Cyrl_ME':
  case 'sr-Cyrl-ME':
    defaultSymbols = DateIntervalSymbols_sr_Cyrl_ME;
    break;
  case 'sr_Cyrl_RS':
  case 'sr-Cyrl-RS':
    defaultSymbols = DateIntervalSymbols_sr_Cyrl_RS;
    break;
  case 'sr_Cyrl_XK':
  case 'sr-Cyrl-XK':
    defaultSymbols = DateIntervalSymbols_sr_Cyrl_XK;
    break;
  case 'sr_Latn_BA':
  case 'sr-Latn-BA':
    defaultSymbols = DateIntervalSymbols_sr_Latn_BA;
    break;
  case 'sr_Latn_ME':
  case 'sr-Latn-ME':
    defaultSymbols = DateIntervalSymbols_sr_Latn_ME;
    break;
  case 'sr_Latn_RS':
  case 'sr-Latn-RS':
    defaultSymbols = DateIntervalSymbols_sr_Latn_RS;
    break;
  case 'sr_Latn_XK':
  case 'sr-Latn-XK':
    defaultSymbols = DateIntervalSymbols_sr_Latn_XK;
    break;
  case 'su':
    defaultSymbols = DateIntervalSymbols_su;
    break;
  case 'su_Latn':
  case 'su-Latn':
    defaultSymbols = DateIntervalSymbols_su_Latn;
    break;
  case 'su_Latn_ID':
  case 'su-Latn-ID':
    defaultSymbols = DateIntervalSymbols_su_Latn_ID;
    break;
  case 'sv_AX':
  case 'sv-AX':
    defaultSymbols = DateIntervalSymbols_sv_AX;
    break;
  case 'sv_FI':
  case 'sv-FI':
    defaultSymbols = DateIntervalSymbols_sv_FI;
    break;
  case 'sv_SE':
  case 'sv-SE':
    defaultSymbols = DateIntervalSymbols_sv_SE;
    break;
  case 'sw_CD':
  case 'sw-CD':
    defaultSymbols = DateIntervalSymbols_sw_CD;
    break;
  case 'sw_KE':
  case 'sw-KE':
    defaultSymbols = DateIntervalSymbols_sw_KE;
    break;
  case 'sw_TZ':
  case 'sw-TZ':
    defaultSymbols = DateIntervalSymbols_sw_TZ;
    break;
  case 'sw_UG':
  case 'sw-UG':
    defaultSymbols = DateIntervalSymbols_sw_UG;
    break;
  case 'ta_IN':
  case 'ta-IN':
    defaultSymbols = DateIntervalSymbols_ta_IN;
    break;
  case 'ta_LK':
  case 'ta-LK':
    defaultSymbols = DateIntervalSymbols_ta_LK;
    break;
  case 'ta_MY':
  case 'ta-MY':
    defaultSymbols = DateIntervalSymbols_ta_MY;
    break;
  case 'ta_SG':
  case 'ta-SG':
    defaultSymbols = DateIntervalSymbols_ta_SG;
    break;
  case 'te_IN':
  case 'te-IN':
    defaultSymbols = DateIntervalSymbols_te_IN;
    break;
  case 'teo':
    defaultSymbols = DateIntervalSymbols_teo;
    break;
  case 'teo_KE':
  case 'teo-KE':
    defaultSymbols = DateIntervalSymbols_teo_KE;
    break;
  case 'teo_UG':
  case 'teo-UG':
    defaultSymbols = DateIntervalSymbols_teo_UG;
    break;
  case 'tg':
    defaultSymbols = DateIntervalSymbols_tg;
    break;
  case 'tg_TJ':
  case 'tg-TJ':
    defaultSymbols = DateIntervalSymbols_tg_TJ;
    break;
  case 'th_TH':
  case 'th-TH':
    defaultSymbols = DateIntervalSymbols_th_TH;
    break;
  case 'ti':
    defaultSymbols = DateIntervalSymbols_ti;
    break;
  case 'ti_ER':
  case 'ti-ER':
    defaultSymbols = DateIntervalSymbols_ti_ER;
    break;
  case 'ti_ET':
  case 'ti-ET':
    defaultSymbols = DateIntervalSymbols_ti_ET;
    break;
  case 'tk':
    defaultSymbols = DateIntervalSymbols_tk;
    break;
  case 'tk_TM':
  case 'tk-TM':
    defaultSymbols = DateIntervalSymbols_tk_TM;
    break;
  case 'to':
    defaultSymbols = DateIntervalSymbols_to;
    break;
  case 'to_TO':
  case 'to-TO':
    defaultSymbols = DateIntervalSymbols_to_TO;
    break;
  case 'tr_CY':
  case 'tr-CY':
    defaultSymbols = DateIntervalSymbols_tr_CY;
    break;
  case 'tr_TR':
  case 'tr-TR':
    defaultSymbols = DateIntervalSymbols_tr_TR;
    break;
  case 'tt':
    defaultSymbols = DateIntervalSymbols_tt;
    break;
  case 'tt_RU':
  case 'tt-RU':
    defaultSymbols = DateIntervalSymbols_tt_RU;
    break;
  case 'twq':
    defaultSymbols = DateIntervalSymbols_twq;
    break;
  case 'twq_NE':
  case 'twq-NE':
    defaultSymbols = DateIntervalSymbols_twq_NE;
    break;
  case 'tzm':
    defaultSymbols = DateIntervalSymbols_tzm;
    break;
  case 'tzm_MA':
  case 'tzm-MA':
    defaultSymbols = DateIntervalSymbols_tzm_MA;
    break;
  case 'ug':
    defaultSymbols = DateIntervalSymbols_ug;
    break;
  case 'ug_CN':
  case 'ug-CN':
    defaultSymbols = DateIntervalSymbols_ug_CN;
    break;
  case 'uk_UA':
  case 'uk-UA':
    defaultSymbols = DateIntervalSymbols_uk_UA;
    break;
  case 'ur_IN':
  case 'ur-IN':
    defaultSymbols = DateIntervalSymbols_ur_IN;
    break;
  case 'ur_PK':
  case 'ur-PK':
    defaultSymbols = DateIntervalSymbols_ur_PK;
    break;
  case 'uz_Arab':
  case 'uz-Arab':
    defaultSymbols = DateIntervalSymbols_uz_Arab;
    break;
  case 'uz_Arab_AF':
  case 'uz-Arab-AF':
    defaultSymbols = DateIntervalSymbols_uz_Arab_AF;
    break;
  case 'uz_Cyrl':
  case 'uz-Cyrl':
    defaultSymbols = DateIntervalSymbols_uz_Cyrl;
    break;
  case 'uz_Cyrl_UZ':
  case 'uz-Cyrl-UZ':
    defaultSymbols = DateIntervalSymbols_uz_Cyrl_UZ;
    break;
  case 'uz_Latn':
  case 'uz-Latn':
    defaultSymbols = DateIntervalSymbols_uz_Latn;
    break;
  case 'uz_Latn_UZ':
  case 'uz-Latn-UZ':
    defaultSymbols = DateIntervalSymbols_uz_Latn_UZ;
    break;
  case 'vai':
    defaultSymbols = DateIntervalSymbols_vai;
    break;
  case 'vai_Latn':
  case 'vai-Latn':
    defaultSymbols = DateIntervalSymbols_vai_Latn;
    break;
  case 'vai_Latn_LR':
  case 'vai-Latn-LR':
    defaultSymbols = DateIntervalSymbols_vai_Latn_LR;
    break;
  case 'vai_Vaii':
  case 'vai-Vaii':
    defaultSymbols = DateIntervalSymbols_vai_Vaii;
    break;
  case 'vai_Vaii_LR':
  case 'vai-Vaii-LR':
    defaultSymbols = DateIntervalSymbols_vai_Vaii_LR;
    break;
  case 'vi_VN':
  case 'vi-VN':
    defaultSymbols = DateIntervalSymbols_vi_VN;
    break;
  case 'vun':
    defaultSymbols = DateIntervalSymbols_vun;
    break;
  case 'vun_TZ':
  case 'vun-TZ':
    defaultSymbols = DateIntervalSymbols_vun_TZ;
    break;
  case 'wae':
    defaultSymbols = DateIntervalSymbols_wae;
    break;
  case 'wae_CH':
  case 'wae-CH':
    defaultSymbols = DateIntervalSymbols_wae_CH;
    break;
  case 'wo':
    defaultSymbols = DateIntervalSymbols_wo;
    break;
  case 'wo_SN':
  case 'wo-SN':
    defaultSymbols = DateIntervalSymbols_wo_SN;
    break;
  case 'xh':
    defaultSymbols = DateIntervalSymbols_xh;
    break;
  case 'xh_ZA':
  case 'xh-ZA':
    defaultSymbols = DateIntervalSymbols_xh_ZA;
    break;
  case 'xog':
    defaultSymbols = DateIntervalSymbols_xog;
    break;
  case 'xog_UG':
  case 'xog-UG':
    defaultSymbols = DateIntervalSymbols_xog_UG;
    break;
  case 'yav':
    defaultSymbols = DateIntervalSymbols_yav;
    break;
  case 'yav_CM':
  case 'yav-CM':
    defaultSymbols = DateIntervalSymbols_yav_CM;
    break;
  case 'yi':
    defaultSymbols = DateIntervalSymbols_yi;
    break;
  case 'yi_001':
  case 'yi-001':
    defaultSymbols = DateIntervalSymbols_yi_001;
    break;
  case 'yo':
    defaultSymbols = DateIntervalSymbols_yo;
    break;
  case 'yo_BJ':
  case 'yo-BJ':
    defaultSymbols = DateIntervalSymbols_yo_BJ;
    break;
  case 'yo_NG':
  case 'yo-NG':
    defaultSymbols = DateIntervalSymbols_yo_NG;
    break;
  case 'yrl':
    defaultSymbols = DateIntervalSymbols_yrl;
    break;
  case 'yrl_BR':
  case 'yrl-BR':
    defaultSymbols = DateIntervalSymbols_yrl_BR;
    break;
  case 'yrl_CO':
  case 'yrl-CO':
    defaultSymbols = DateIntervalSymbols_yrl_CO;
    break;
  case 'yrl_VE':
  case 'yrl-VE':
    defaultSymbols = DateIntervalSymbols_yrl_VE;
    break;
  case 'yue':
    defaultSymbols = DateIntervalSymbols_yue;
    break;
  case 'yue_Hans':
  case 'yue-Hans':
    defaultSymbols = DateIntervalSymbols_yue_Hans;
    break;
  case 'yue_Hans_CN':
  case 'yue-Hans-CN':
    defaultSymbols = DateIntervalSymbols_yue_Hans_CN;
    break;
  case 'yue_Hant':
  case 'yue-Hant':
    defaultSymbols = DateIntervalSymbols_yue_Hant;
    break;
  case 'yue_Hant_HK':
  case 'yue-Hant-HK':
    defaultSymbols = DateIntervalSymbols_yue_Hant_HK;
    break;
  case 'zgh':
    defaultSymbols = DateIntervalSymbols_zgh;
    break;
  case 'zgh_MA':
  case 'zgh-MA':
    defaultSymbols = DateIntervalSymbols_zgh_MA;
    break;
  case 'zh_Hans':
  case 'zh-Hans':
    defaultSymbols = DateIntervalSymbols_zh_Hans;
    break;
  case 'zh_Hans_CN':
  case 'zh-Hans-CN':
    defaultSymbols = DateIntervalSymbols_zh_Hans_CN;
    break;
  case 'zh_Hans_HK':
  case 'zh-Hans-HK':
    defaultSymbols = DateIntervalSymbols_zh_Hans_HK;
    break;
  case 'zh_Hans_MO':
  case 'zh-Hans-MO':
    defaultSymbols = DateIntervalSymbols_zh_Hans_MO;
    break;
  case 'zh_Hans_SG':
  case 'zh-Hans-SG':
    defaultSymbols = DateIntervalSymbols_zh_Hans_SG;
    break;
  case 'zh_Hant':
  case 'zh-Hant':
    defaultSymbols = DateIntervalSymbols_zh_Hant;
    break;
  case 'zh_Hant_HK':
  case 'zh-Hant-HK':
    defaultSymbols = DateIntervalSymbols_zh_Hant_HK;
    break;
  case 'zh_Hant_MO':
  case 'zh-Hant-MO':
    defaultSymbols = DateIntervalSymbols_zh_Hant_MO;
    break;
  case 'zh_Hant_TW':
  case 'zh-Hant-TW':
    defaultSymbols = DateIntervalSymbols_zh_Hant_TW;
    break;
  case 'zu_ZA':
  case 'zu-ZA':
    defaultSymbols = DateIntervalSymbols_zu_ZA;
    break;
}

if (defaultSymbols != null) {
  dateIntervalSymbols.setDateIntervalSymbols(defaultSymbols);
}
