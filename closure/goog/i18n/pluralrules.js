/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Plural rules.
 *
 *
 * File generated from CLDR ver. 43
 */

// clang-format off

import * as LocaleFeature from './localefeature.js';

/**
 * Plural pattern keyword
 * @enum {string}
 */
export var Keyword = {
  ZERO: 'zero',
  ONE: 'one',
  TWO: 'two',
  FEW: 'few',
  MANY: 'many',
  OTHER: 'other'
};


/**
 * Plural selection function.
 *
 * The actual implementation is locale-dependent.
 *
 * @param {number} n The count of items.
 * @param {number=} precision optional, precision.
 * @return {!Keyword}
 */
export var select;

/**
 * Default Plural select rule.
 * @param {number} n The count of items.
 * @param {number=} precision optional, precision.
 * @return {!Keyword} Default value.
 * @private
 */
export function defaultSelect_(n, precision) {
  return Keyword.OTHER;
}
/**
 * Returns the fractional part of a number (3.1416 => 1416)
 * @param {number} n The count of items.
 * @return {number} The fractional part.
 * @private
 */
function decimals_(n) {
  const str = n + '';
  const result = str.indexOf('.');
  return (result === -1) ? 0 : str.length - result - 1;
}

/**
 * Calculates v and f as per CLDR plural rules.
 * The short names for parameters / return match the CLDR syntax and UTS #35
 *     (https://unicode.org/reports/tr35/tr35-numbers.html#Plural_rules_syntax)
 * @param {number} n The count of items.
 * @param {number=} precision optional, precision.
 * @return {{v:number, f:number}} The v and f.
 * @private
 */
function get_vf_(n, precision) {
  const DEFAULT_DIGITS = 3;

  let v;
  if (undefined === precision) {
    v = Math.min(decimals_(n), DEFAULT_DIGITS);
  } else {
    v = precision;
  }

  const base = Math.pow(10, v);
  const f = ((n * base) | 0) % base;

  return {v: v, f: f};
}

/**
 * Calculates w and t as per CLDR plural rules.
 * The short names for parameters / return match the CLDR syntax and UTS #35
 *     (https://unicode.org/reports/tr35/tr35-numbers.html#Plural_rules_syntax)
 * @param {number} v Calculated previously.
 * @param {number} f Calculated previously.
 * @return {{w:number, t:number}} The w and t.
 * @private
 */
function get_wt_(v, f) {
  if (f === 0) {
    return {w: 0, t: 0};
  }

  while ((f % 10) === 0) {
    f /= 10;
    v--;
  }

  return {w: v, t: f};
}

/**
 * Calculates exponent as per CLDR plural rules.
 * The short names for parameters / return match the CLDR syntax and UTS #35
 *     (https://unicode.org/reports/tr35/tr35-numbers.html#Plural_rules_syntax)
 * @param {number} n The count of items.
 * @return {number} The e (exponent)
 * @private
 */
function get_e_(n) {
  return 0;
}

/**
 * Plural select rules for fil locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
export function filSelect_(n, precision) {
  const i = n | 0;
  const vf = get_vf_(n, precision);
  if (vf.v == 0 && (i == 1 || i == 2 || i == 3) || vf.v == 0 && i % 10 != 4 && i % 10 != 6 && i % 10 != 9 || vf.v != 0 && vf.f % 10 != 4 && vf.f % 10 != 6 && vf.f % 10 != 9) {
    return Keyword.ONE;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for he locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
export function heSelect_(n, precision) {
  const i = n | 0;
  const vf = get_vf_(n, precision);
  if (i == 1 && vf.v == 0 || i == 0 && vf.v != 0) {
    return Keyword.ONE;
  }
  if (i == 2 && vf.v == 0) {
    return Keyword.TWO;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for br locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
function brSelect_(n, precision) {
  if (n % 10 == 1 && n % 100 != 11 && n % 100 != 71 && n % 100 != 91) {
    return Keyword.ONE;
  }
  if (n % 10 == 2 && n % 100 != 12 && n % 100 != 72 && n % 100 != 92) {
    return Keyword.TWO;
  }
  if ((n % 10 >= 3 && n % 10 <= 4 || n % 10 == 9) && (n % 100 < 10 || n % 100 > 19) && (n % 100 < 70 || n % 100 > 79) && (n % 100 < 90 || n % 100 > 99)) {
    return Keyword.FEW;
  }
  if (n != 0 && n % 1000000 == 0) {
    return Keyword.MANY;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for sr locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
export function srSelect_(n, precision) {
  const i = n | 0;
  const vf = get_vf_(n, precision);
  if (vf.v == 0 && i % 10 == 1 && i % 100 != 11 || vf.f % 10 == 1 && vf.f % 100 != 11) {
    return Keyword.ONE;
  }
  if (vf.v == 0 && i % 10 >= 2 && i % 10 <= 4 && (i % 100 < 12 || i % 100 > 14) || vf.f % 10 >= 2 && vf.f % 10 <= 4 && (vf.f % 100 < 12 || vf.f % 100 > 14)) {
    return Keyword.FEW;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for ro locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
export function roSelect_(n, precision) {
  const i = n | 0;
  const vf = get_vf_(n, precision);
  if (i == 1 && vf.v == 0) {
    return Keyword.ONE;
  }
  if (vf.v != 0 || n == 0 || n != 1 && n % 100 >= 1 && n % 100 <= 19) {
    return Keyword.FEW;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for hi locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
function hiSelect_(n, precision) {
  const i = n | 0;
  if (i == 0 || n == 1) {
    return Keyword.ONE;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for es locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
function esSelect_(n, precision) {
  const i = n | 0;
  const e = get_e_(n);
  const vf = get_vf_(n, precision);
  if (n == 1) {
    return Keyword.ONE;
  }
  if (e == 0 && i != 0 && i % 1000000 == 0 && vf.v == 0 || (e < 0 || e > 5)) {
    return Keyword.MANY;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for hy locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
function hySelect_(n, precision) {
  const i = n | 0;
  if (i == 0 || i == 1) {
    return Keyword.ONE;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for pt locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
function ptSelect_(n, precision) {
  const i = n | 0;
  const e = get_e_(n);
  const vf = get_vf_(n, precision);
  if (i >= 0 && i <= 1) {
    return Keyword.ONE;
  }
  if (e == 0 && i != 0 && i % 1000000 == 0 && vf.v == 0 || (e < 0 || e > 5)) {
    return Keyword.MANY;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for is locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
export function isSelect_(n, precision) {
  const i = n | 0;
  const vf = get_vf_(n, precision);
  const wt = get_wt_(vf.v, vf.f);
  if (wt.t == 0 && i % 10 == 1 && i % 100 != 11 || wt.t % 10 == 1 && wt.t % 100 != 11) {
    return Keyword.ONE;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for cs locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
function csSelect_(n, precision) {
  const i = n | 0;
  const vf = get_vf_(n, precision);
  if (i == 1 && vf.v == 0) {
    return Keyword.ONE;
  }
  if (i >= 2 && i <= 4 && vf.v == 0) {
    return Keyword.FEW;
  }
  if (vf.v != 0) {
    return Keyword.MANY;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for pl locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
function plSelect_(n, precision) {
  const i = n | 0;
  const vf = get_vf_(n, precision);
  if (i == 1 && vf.v == 0) {
    return Keyword.ONE;
  }
  if (vf.v == 0 && i % 10 >= 2 && i % 10 <= 4 && (i % 100 < 12 || i % 100 > 14)) {
    return Keyword.FEW;
  }
  if (vf.v == 0 && i != 1 && i % 10 >= 0 && i % 10 <= 1 || vf.v == 0 && i % 10 >= 5 && i % 10 <= 9 || vf.v == 0 && i % 100 >= 12 && i % 100 <= 14) {
    return Keyword.MANY;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for ca locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
function caSelect_(n, precision) {
  const i = n | 0;
  const e = get_e_(n);
  const vf = get_vf_(n, precision);
  if (i == 1 && vf.v == 0) {
    return Keyword.ONE;
  }
  if (e == 0 && i != 0 && i % 1000000 == 0 && vf.v == 0 || (e < 0 || e > 5)) {
    return Keyword.MANY;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for lv locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
function lvSelect_(n, precision) {
  const vf = get_vf_(n, precision);
  if (n % 10 == 0 || n % 100 >= 11 && n % 100 <= 19 || vf.v == 2 && vf.f % 100 >= 11 && vf.f % 100 <= 19) {
    return Keyword.ZERO;
  }
  if (n % 10 == 1 && n % 100 != 11 || vf.v == 2 && vf.f % 10 == 1 && vf.f % 100 != 11 || vf.v != 2 && vf.f % 10 == 1) {
    return Keyword.ONE;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for si locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
function siSelect_(n, precision) {
  const i = n | 0;
  const vf = get_vf_(n, precision);
  if ((n == 0 || n == 1) || i == 0 && vf.f == 1) {
    return Keyword.ONE;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for cy locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
function cySelect_(n, precision) {
  if (n == 0) {
    return Keyword.ZERO;
  }
  if (n == 1) {
    return Keyword.ONE;
  }
  if (n == 2) {
    return Keyword.TWO;
  }
  if (n == 3) {
    return Keyword.FEW;
  }
  if (n == 6) {
    return Keyword.MANY;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for da locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
function daSelect_(n, precision) {
  const i = n | 0;
  const vf = get_vf_(n, precision);
  const wt = get_wt_(vf.v, vf.f);
  if (n == 1 || wt.t != 0 && (i == 0 || i == 1)) {
    return Keyword.ONE;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for ru locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
function ruSelect_(n, precision) {
  const i = n | 0;
  const vf = get_vf_(n, precision);
  if (vf.v == 0 && i % 10 == 1 && i % 100 != 11) {
    return Keyword.ONE;
  }
  if (vf.v == 0 && i % 10 >= 2 && i % 10 <= 4 && (i % 100 < 12 || i % 100 > 14)) {
    return Keyword.FEW;
  }
  if (vf.v == 0 && i % 10 == 0 || vf.v == 0 && i % 10 >= 5 && i % 10 <= 9 || vf.v == 0 && i % 100 >= 11 && i % 100 <= 14) {
    return Keyword.MANY;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for be locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
export function beSelect_(n, precision) {
  if (n % 10 == 1 && n % 100 != 11) {
    return Keyword.ONE;
  }
  if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) {
    return Keyword.FEW;
  }
  if (n % 10 == 0 || n % 10 >= 5 && n % 10 <= 9 || n % 100 >= 11 && n % 100 <= 14) {
    return Keyword.MANY;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for fr locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
function frSelect_(n, precision) {
  const i = n | 0;
  const e = get_e_(n);
  const vf = get_vf_(n, precision);
  if (i == 0 || i == 1) {
    return Keyword.ONE;
  }
  if (e == 0 && i != 0 && i % 1000000 == 0 && vf.v == 0 || (e < 0 || e > 5)) {
    return Keyword.MANY;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for ga locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
function gaSelect_(n, precision) {
  if (n == 1) {
    return Keyword.ONE;
  }
  if (n == 2) {
    return Keyword.TWO;
  }
  if (n >= 3 && n <= 6) {
    return Keyword.FEW;
  }
  if (n >= 7 && n <= 10) {
    return Keyword.MANY;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for af locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
export function afSelect_(n, precision) {
  if (n == 1) {
    return Keyword.ONE;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for mk locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
function mkSelect_(n, precision) {
  const i = n | 0;
  const vf = get_vf_(n, precision);
  if (vf.v == 0 && i % 10 == 1 && i % 100 != 11 || vf.f % 10 == 1 && vf.f % 100 != 11) {
    return Keyword.ONE;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for ar locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
export function arSelect_(n, precision) {
  if (n == 0) {
    return Keyword.ZERO;
  }
  if (n == 1) {
    return Keyword.ONE;
  }
  if (n == 2) {
    return Keyword.TWO;
  }
  if (n % 100 >= 3 && n % 100 <= 10) {
    return Keyword.FEW;
  }
  if (n % 100 >= 11 && n % 100 <= 99) {
    return Keyword.MANY;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for sl locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
function slSelect_(n, precision) {
  const i = n | 0;
  const vf = get_vf_(n, precision);
  if (vf.v == 0 && i % 100 == 1) {
    return Keyword.ONE;
  }
  if (vf.v == 0 && i % 100 == 2) {
    return Keyword.TWO;
  }
  if (vf.v == 0 && i % 100 >= 3 && i % 100 <= 4 || vf.v != 0) {
    return Keyword.FEW;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for lt locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
function ltSelect_(n, precision) {
  const vf = get_vf_(n, precision);
  if (n % 10 == 1 && (n % 100 < 11 || n % 100 > 19)) {
    return Keyword.ONE;
  }
  if (n % 10 >= 2 && n % 10 <= 9 && (n % 100 < 11 || n % 100 > 19)) {
    return Keyword.FEW;
  }
  if (vf.f != 0) {
    return Keyword.MANY;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for mt locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
function mtSelect_(n, precision) {
  if (n == 1) {
    return Keyword.ONE;
  }
  if (n == 2) {
    return Keyword.TWO;
  }
  if (n == 0 || n % 100 >= 3 && n % 100 <= 10) {
    return Keyword.FEW;
  }
  if (n % 100 >= 11 && n % 100 <= 19) {
    return Keyword.MANY;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for en locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
export function enSelect_(n, precision) {
  const i = n | 0;
  const vf = get_vf_(n, precision);
  if (i == 1 && vf.v == 0) {
    return Keyword.ONE;
  }
  return Keyword.OTHER;
}

/**
 * Plural select rules for ln locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific plural value.
 * @private
 */
function lnSelect_(n, precision) {
  if (n >= 0 && n <= 1) {
    return Keyword.ONE;
  }
  return Keyword.OTHER;
}

/**
 * Creates a selection function for the Closure locale to implement an
 * Intl PluralRules object using optional minimumFractionDigits.
 * Caches multiple PluralRules objects by precision value for a given locale.
 * @return {function(number,number=) : !Keyword} Select function
 * @private
 */
export function mapToNativeSelect_() {
  const pluralLookup = {
    'zero':  Keyword.ZERO,
    'one':   Keyword.ONE,
    'two':   Keyword.TWO,
    'few':   Keyword.FEW,
    'many':  Keyword.MANY,
    'other': Keyword.OTHER
  };

  let pluralRulesObj = null;
  let pluralPrecisionCache = null;  // Indexed by precision value

/**
 * Plural Rules select function containing ECMAScript object
 * @param {number} itemCount  The count of items.
 * @param {number=} precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific pluralvalue.
 */
  const selectFn = function(itemCount, precision) {
    // Key used in cache. -1 indicates no precision specified
    const key = (precision === undefined) ? -1 : precision;

    if (pluralPrecisionCache === null) {
      pluralPrecisionCache = new Map();
    }
    // Do we have a plurals object with the requested precision?
    pluralRulesObj = pluralPrecisionCache.get(key);

    if (!pluralRulesObj) {
      // No existing plurals object. Make a new object and add to cache.
      // Intl locales use '-', not '_'
      let locale = '';  //goog.LOCALE may be undefined.
      if (goog.LOCALE) {
        locale = goog.LOCALE.replace('_', '-');
      }
      if (key === -1) {
        // Create object with no specified precision
        pluralRulesObj = new Intl.PluralRules(locale);
      } else {
        // Create object with desired precision
        pluralRulesObj =
          new Intl.PluralRules(
              locale, {minimumFractionDigits: precision});
      }
      // Add to set of plural objects cached by precision.
      pluralPrecisionCache.set(key, pluralRulesObj);
    }
    const resultString = pluralRulesObj.select(itemCount);
    return pluralLookup[resultString];
  };

  return selectFn;
}

/**
 * Selected Plural rules by locale.
 */
select = enSelect_;
if (LocaleFeature.USE_ECMASCRIPT_I18N_PLURALRULES) {
  // Native mode selected
   select = mapToNativeSelect_();
} else {
  if (goog.LOCALE === 'af') {
    select = afSelect_;
  }
  if (goog.LOCALE === 'am') {
    select = hiSelect_;
  }
  if (goog.LOCALE === 'ar') {
    select = arSelect_;
  }
  if (goog.LOCALE === 'ar_DZ' || goog.LOCALE === 'ar-DZ') {
    select = arSelect_;
  }
  if (goog.LOCALE === 'ar_EG' || goog.LOCALE === 'ar-EG') {
    select = arSelect_;
  }
  if (goog.LOCALE === 'az') {
    select = afSelect_;
  }
  if (goog.LOCALE === 'be') {
    select = beSelect_;
  }
  if (goog.LOCALE === 'bg') {
    select = afSelect_;
  }
  if (goog.LOCALE === 'bn') {
    select = hiSelect_;
  }
  if (goog.LOCALE === 'br') {
    select = brSelect_;
  }
  if (goog.LOCALE === 'bs') {
    select = srSelect_;
  }
  if (goog.LOCALE === 'ca') {
    select = caSelect_;
  }
  if (goog.LOCALE === 'chr') {
    select = afSelect_;
  }
  if (goog.LOCALE === 'cs') {
    select = csSelect_;
  }
  if (goog.LOCALE === 'cy') {
    select = cySelect_;
  }
  if (goog.LOCALE === 'da') {
    select = daSelect_;
  }
  if (goog.LOCALE === 'de') {
    select = enSelect_;
  }
  if (goog.LOCALE === 'de_AT' || goog.LOCALE === 'de-AT') {
    select = enSelect_;
  }
  if (goog.LOCALE === 'de_CH' || goog.LOCALE === 'de-CH') {
    select = enSelect_;
  }
  if (goog.LOCALE === 'el') {
    select = afSelect_;
  }
  if (goog.LOCALE === 'en') {
    select = enSelect_;
  }
  if (goog.LOCALE === 'en_AU' || goog.LOCALE === 'en-AU') {
    select = enSelect_;
  }
  if (goog.LOCALE === 'en_CA' || goog.LOCALE === 'en-CA') {
    select = enSelect_;
  }
  if (goog.LOCALE === 'en_GB' || goog.LOCALE === 'en-GB') {
    select = enSelect_;
  }
  if (goog.LOCALE === 'en_IE' || goog.LOCALE === 'en-IE') {
    select = enSelect_;
  }
  if (goog.LOCALE === 'en_IN' || goog.LOCALE === 'en-IN') {
    select = enSelect_;
  }
  if (goog.LOCALE === 'en_SG' || goog.LOCALE === 'en-SG') {
    select = enSelect_;
  }
  if (goog.LOCALE === 'en_US' || goog.LOCALE === 'en-US') {
    select = enSelect_;
  }
  if (goog.LOCALE === 'en_ZA' || goog.LOCALE === 'en-ZA') {
    select = enSelect_;
  }
  if (goog.LOCALE === 'es') {
    select = esSelect_;
  }
  if (goog.LOCALE === 'es_419' || goog.LOCALE === 'es-419') {
    select = esSelect_;
  }
  if (goog.LOCALE === 'es_ES' || goog.LOCALE === 'es-ES') {
    select = esSelect_;
  }
  if (goog.LOCALE === 'es_MX' || goog.LOCALE === 'es-MX') {
    select = esSelect_;
  }
  if (goog.LOCALE === 'es_US' || goog.LOCALE === 'es-US') {
    select = esSelect_;
  }
  if (goog.LOCALE === 'et') {
    select = enSelect_;
  }
  if (goog.LOCALE === 'eu') {
    select = afSelect_;
  }
  if (goog.LOCALE === 'fa') {
    select = hiSelect_;
  }
  if (goog.LOCALE === 'fi') {
    select = enSelect_;
  }
  if (goog.LOCALE === 'fil') {
    select = filSelect_;
  }
  if (goog.LOCALE === 'fr') {
    select = frSelect_;
  }
  if (goog.LOCALE === 'fr_CA' || goog.LOCALE === 'fr-CA') {
    select = frSelect_;
  }
  if (goog.LOCALE === 'ga') {
    select = gaSelect_;
  }
  if (goog.LOCALE === 'gl') {
    select = enSelect_;
  }
  if (goog.LOCALE === 'gsw') {
    select = afSelect_;
  }
  if (goog.LOCALE === 'gu') {
    select = hiSelect_;
  }
  if (goog.LOCALE === 'haw') {
    select = afSelect_;
  }
  if (goog.LOCALE === 'he') {
    select = heSelect_;
  }
  if (goog.LOCALE === 'hi') {
    select = hiSelect_;
  }
  if (goog.LOCALE === 'hr') {
    select = srSelect_;
  }
  if (goog.LOCALE === 'hu') {
    select = afSelect_;
  }
  if (goog.LOCALE === 'hy') {
    select = hySelect_;
  }
  if (goog.LOCALE === 'id') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'in') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'is') {
    select = isSelect_;
  }
  if (goog.LOCALE === 'it') {
    select = caSelect_;
  }
  if (goog.LOCALE === 'iw') {
    select = heSelect_;
  }
  if (goog.LOCALE === 'ja') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'ka') {
    select = afSelect_;
  }
  if (goog.LOCALE === 'kk') {
    select = afSelect_;
  }
  if (goog.LOCALE === 'km') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'kn') {
    select = hiSelect_;
  }
  if (goog.LOCALE === 'ko') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'ky') {
    select = afSelect_;
  }
  if (goog.LOCALE === 'ln') {
    select = lnSelect_;
  }
  if (goog.LOCALE === 'lo') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'lt') {
    select = ltSelect_;
  }
  if (goog.LOCALE === 'lv') {
    select = lvSelect_;
  }
  if (goog.LOCALE === 'mk') {
    select = mkSelect_;
  }
  if (goog.LOCALE === 'ml') {
    select = afSelect_;
  }
  if (goog.LOCALE === 'mn') {
    select = afSelect_;
  }
  if (goog.LOCALE === 'mo') {
    select = roSelect_;
  }
  if (goog.LOCALE === 'mr') {
    select = afSelect_;
  }
  if (goog.LOCALE === 'ms') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'mt') {
    select = mtSelect_;
  }
  if (goog.LOCALE === 'my') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'nb') {
    select = afSelect_;
  }
  if (goog.LOCALE === 'ne') {
    select = afSelect_;
  }
  if (goog.LOCALE === 'nl') {
    select = enSelect_;
  }
  if (goog.LOCALE === 'no') {
    select = afSelect_;
  }
  if (goog.LOCALE === 'no_NO' || goog.LOCALE === 'no-NO') {
    select = afSelect_;
  }
  if (goog.LOCALE === 'or') {
    select = afSelect_;
  }
  if (goog.LOCALE === 'pa') {
    select = lnSelect_;
  }
  if (goog.LOCALE === 'pl') {
    select = plSelect_;
  }
  if (goog.LOCALE === 'pt') {
    select = ptSelect_;
  }
  if (goog.LOCALE === 'pt_BR' || goog.LOCALE === 'pt-BR') {
    select = ptSelect_;
  }
  if (goog.LOCALE === 'pt_PT' || goog.LOCALE === 'pt-PT') {
    select = caSelect_;
  }
  if (goog.LOCALE === 'ro') {
    select = roSelect_;
  }
  if (goog.LOCALE === 'ru') {
    select = ruSelect_;
  }
  if (goog.LOCALE === 'sh') {
    select = srSelect_;
  }
  if (goog.LOCALE === 'si') {
    select = siSelect_;
  }
  if (goog.LOCALE === 'sk') {
    select = csSelect_;
  }
  if (goog.LOCALE === 'sl') {
    select = slSelect_;
  }
  if (goog.LOCALE === 'sq') {
    select = afSelect_;
  }
  if (goog.LOCALE === 'sr') {
    select = srSelect_;
  }
  if (goog.LOCALE === 'sr_Latn' || goog.LOCALE === 'sr-Latn') {
    select = srSelect_;
  }
  if (goog.LOCALE === 'sv') {
    select = enSelect_;
  }
  if (goog.LOCALE === 'sw') {
    select = enSelect_;
  }
  if (goog.LOCALE === 'ta') {
    select = afSelect_;
  }
  if (goog.LOCALE === 'te') {
    select = afSelect_;
  }
  if (goog.LOCALE === 'th') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'tl') {
    select = filSelect_;
  }
  if (goog.LOCALE === 'tr') {
    select = afSelect_;
  }
  if (goog.LOCALE === 'uk') {
    select = ruSelect_;
  }
  if (goog.LOCALE === 'ur') {
    select = enSelect_;
  }
  if (goog.LOCALE === 'uz') {
    select = afSelect_;
  }
  if (goog.LOCALE === 'vi') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'zh') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'zh_CN' || goog.LOCALE === 'zh-CN') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'zh_HK' || goog.LOCALE === 'zh-HK') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'zh_TW' || goog.LOCALE === 'zh-TW') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'zu') {
    select = hiSelect_;
  }
}  // End of polyfill selections.
