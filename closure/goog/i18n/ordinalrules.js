/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Ordinal rules.
 *
 *
 * File generated from CLDR ver. 43
 */

// clang-format off

import * as LocaleFeature from './localefeature.js';

/**
 * Ordinal pattern keyword
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
 * Ordinal selection function.
 *
 * The actual implementation is locale-dependent.
 *
 * @param {number} n The count of items.
 * @param {number=} precision optional, precision.
 * @return {!Keyword}
 */
export var select;

/**
 * Default Ordinal select rule.
 * @param {number} n The count of items.
 * @param {number=} precision optional, precision.
 * @return {!Keyword} Default value.
 * @private
 */
function defaultSelect_(n, precision) {
  return Keyword.OTHER;
}

/**
 * Ordinal select rules for cy locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific ordinal value.
 * @private
 */
export function cySelect_(n, precision) {
  if (n == 0 || n == 7 || n == 8 || n == 9) {
    return Keyword.ZERO;
  }
  if (n == 1) {
    return Keyword.ONE;
  }
  if (n == 2) {
    return Keyword.TWO;
  }
  if (n == 3 || n == 4) {
    return Keyword.FEW;
  }
  if (n == 5 || n == 6) {
    return Keyword.MANY;
  }
  return Keyword.OTHER;
}

/**
 * Ordinal select rules for en locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific ordinal value.
 * @private
 */
export function enSelect_(n, precision) {
  if (n % 10 == 1 && n % 100 != 11) {
    return Keyword.ONE;
  }
  if (n % 10 == 2 && n % 100 != 12) {
    return Keyword.TWO;
  }
  if (n % 10 == 3 && n % 100 != 13) {
    return Keyword.FEW;
  }
  return Keyword.OTHER;
}

/**
 * Ordinal select rules for uk locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific ordinal value.
 * @private
 */
function ukSelect_(n, precision) {
  if (n % 10 == 3 && n % 100 != 13) {
    return Keyword.FEW;
  }
  return Keyword.OTHER;
}

/**
 * Ordinal select rules for it locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific ordinal value.
 * @private
 */
function itSelect_(n, precision) {
  if (n == 11 || n == 8 || n == 80 || n == 800) {
    return Keyword.MANY;
  }
  return Keyword.OTHER;
}

/**
 * Ordinal select rules for ne locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific ordinal value.
 * @private
 */
export function neSelect_(n, precision) {
  if (n >= 1 && n <= 4) {
    return Keyword.ONE;
  }
  return Keyword.OTHER;
}

/**
 * Ordinal select rules for or locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific ordinal value.
 * @private
 */
function orSelect_(n, precision) {
  if (n == 1 || n == 5 || n >= 7 && n <= 9) {
    return Keyword.ONE;
  }
  if (n == 2 || n == 3) {
    return Keyword.TWO;
  }
  if (n == 4) {
    return Keyword.FEW;
  }
  if (n == 6) {
    return Keyword.MANY;
  }
  return Keyword.OTHER;
}

/**
 * Ordinal select rules for be locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific ordinal value.
 * @private
 */
function beSelect_(n, precision) {
  if ((n % 10 == 2 || n % 10 == 3) && n % 100 != 12 && n % 100 != 13) {
    return Keyword.FEW;
  }
  return Keyword.OTHER;
}

/**
 * Ordinal select rules for az locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific ordinal value.
 * @private
 */
function azSelect_(n, precision) {
  const i = n | 0;
  if ((i % 10 == 1 || i % 10 == 2 || i % 10 == 5 || i % 10 == 7 || i % 10 == 8) || (i % 100 == 20 || i % 100 == 50 || i % 100 == 70 || i % 100 == 80)) {
    return Keyword.ONE;
  }
  if ((i % 10 == 3 || i % 10 == 4) || (i % 1000 == 100 || i % 1000 == 200 || i % 1000 == 300 || i % 1000 == 400 || i % 1000 == 500 || i % 1000 == 600 || i % 1000 == 700 || i % 1000 == 800 || i % 1000 == 900)) {
    return Keyword.FEW;
  }
  if (i == 0 || i % 10 == 6 || (i % 100 == 40 || i % 100 == 60 || i % 100 == 90)) {
    return Keyword.MANY;
  }
  return Keyword.OTHER;
}

/**
 * Ordinal select rules for ka locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific ordinal value.
 * @private
 */
function kaSelect_(n, precision) {
  const i = n | 0;
  if (i == 1) {
    return Keyword.ONE;
  }
  if (i == 0 || (i % 100 >= 2 && i % 100 <= 20 || i % 100 == 40 || i % 100 == 60 || i % 100 == 80)) {
    return Keyword.MANY;
  }
  return Keyword.OTHER;
}

/**
 * Ordinal select rules for mr locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific ordinal value.
 * @private
 */
function mrSelect_(n, precision) {
  if (n == 1) {
    return Keyword.ONE;
  }
  if (n == 2 || n == 3) {
    return Keyword.TWO;
  }
  if (n == 4) {
    return Keyword.FEW;
  }
  return Keyword.OTHER;
}

/**
 * Ordinal select rules for sv locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific ordinal value.
 * @private
 */
function svSelect_(n, precision) {
  if ((n % 10 == 1 || n % 10 == 2) && n % 100 != 11 && n % 100 != 12) {
    return Keyword.ONE;
  }
  return Keyword.OTHER;
}

/**
 * Ordinal select rules for kk locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific ordinal value.
 * @private
 */
function kkSelect_(n, precision) {
  if (n % 10 == 6 || n % 10 == 9 || n % 10 == 0 && n != 0) {
    return Keyword.MANY;
  }
  return Keyword.OTHER;
}

/**
 * Ordinal select rules for mk locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific ordinal value.
 * @private
 */
function mkSelect_(n, precision) {
  const i = n | 0;
  if (i % 10 == 1 && i % 100 != 11) {
    return Keyword.ONE;
  }
  if (i % 10 == 2 && i % 100 != 12) {
    return Keyword.TWO;
  }
  if ((i % 10 == 7 || i % 10 == 8) && i % 100 != 17 && i % 100 != 18) {
    return Keyword.MANY;
  }
  return Keyword.OTHER;
}

/**
 * Ordinal select rules for hu locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific ordinal value.
 * @private
 */
function huSelect_(n, precision) {
  if (n == 1 || n == 5) {
    return Keyword.ONE;
  }
  return Keyword.OTHER;
}

/**
 * Ordinal select rules for fr locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific ordinal value.
 * @private
 */
function frSelect_(n, precision) {
  if (n == 1) {
    return Keyword.ONE;
  }
  return Keyword.OTHER;
}

/**
 * Ordinal select rules for sq locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific ordinal value.
 * @private
 */
function sqSelect_(n, precision) {
  if (n == 1) {
    return Keyword.ONE;
  }
  if (n % 10 == 4 && n % 100 != 14) {
    return Keyword.MANY;
  }
  return Keyword.OTHER;
}

/**
 * Ordinal select rules for ca locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific ordinal value.
 * @private
 */
function caSelect_(n, precision) {
  if (n == 1 || n == 3) {
    return Keyword.ONE;
  }
  if (n == 2) {
    return Keyword.TWO;
  }
  if (n == 4) {
    return Keyword.FEW;
  }
  return Keyword.OTHER;
}

/**
 * Ordinal select rules for gu locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific ordinal value.
 * @private
 */
function guSelect_(n, precision) {
  if (n == 1) {
    return Keyword.ONE;
  }
  if (n == 2 || n == 3) {
    return Keyword.TWO;
  }
  if (n == 4) {
    return Keyword.FEW;
  }
  if (n == 6) {
    return Keyword.MANY;
  }
  return Keyword.OTHER;
}

/**
 * Ordinal select rules for bn locale
 *
 * @param {number} n  The count of items.
 * @param {number=} precision Precision for number formatting, if not default.
 * @return {!Keyword} Locale-specific ordinal value.
 * @private
 */
function bnSelect_(n, precision) {
  if (n == 1 || n == 5 || n == 7 || n == 8 || n == 9 || n == 10) {
    return Keyword.ONE;
  }
  if (n == 2 || n == 3) {
    return Keyword.TWO;
  }
  if (n == 4) {
    return Keyword.FEW;
  }
  if (n == 6) {
    return Keyword.MANY;
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
        pluralRulesObj = new Intl.PluralRules(locale, {type: 'ordinal'});
      } else {
        // Create object with desired precision
        pluralRulesObj =
          new Intl.PluralRules(
              locale, {type: 'ordinal', minimumFractionDigits: precision});
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
 * Selected Ordinal rules by locale.
 */
select = enSelect_;
if (LocaleFeature.USE_ECMASCRIPT_I18N_PLURALRULES) {
  // Native mode selected
   select = mapToNativeSelect_();
} else {
  if (goog.LOCALE === 'af') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'am') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'ar') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'ar_DZ' || goog.LOCALE === 'ar-DZ') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'ar_EG' || goog.LOCALE === 'ar-EG') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'az') {
    select = azSelect_;
  }
  if (goog.LOCALE === 'be') {
    select = beSelect_;
  }
  if (goog.LOCALE === 'bg') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'bn') {
    select = bnSelect_;
  }
  if (goog.LOCALE === 'br') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'bs') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'ca') {
    select = caSelect_;
  }
  if (goog.LOCALE === 'chr') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'cs') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'cy') {
    select = cySelect_;
  }
  if (goog.LOCALE === 'da') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'de') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'de_AT' || goog.LOCALE === 'de-AT') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'de_CH' || goog.LOCALE === 'de-CH') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'el') {
    select = defaultSelect_;
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
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'es_419' || goog.LOCALE === 'es-419') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'es_ES' || goog.LOCALE === 'es-ES') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'es_MX' || goog.LOCALE === 'es-MX') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'es_US' || goog.LOCALE === 'es-US') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'et') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'eu') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'fa') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'fi') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'fil') {
    select = frSelect_;
  }
  if (goog.LOCALE === 'fr') {
    select = frSelect_;
  }
  if (goog.LOCALE === 'fr_CA' || goog.LOCALE === 'fr-CA') {
    select = frSelect_;
  }
  if (goog.LOCALE === 'ga') {
    select = frSelect_;
  }
  if (goog.LOCALE === 'gl') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'gsw') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'gu') {
    select = guSelect_;
  }
  if (goog.LOCALE === 'haw') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'he') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'hi') {
    select = guSelect_;
  }
  if (goog.LOCALE === 'hr') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'hu') {
    select = huSelect_;
  }
  if (goog.LOCALE === 'hy') {
    select = frSelect_;
  }
  if (goog.LOCALE === 'id') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'in') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'is') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'it') {
    select = itSelect_;
  }
  if (goog.LOCALE === 'iw') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'ja') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'ka') {
    select = kaSelect_;
  }
  if (goog.LOCALE === 'kk') {
    select = kkSelect_;
  }
  if (goog.LOCALE === 'km') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'kn') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'ko') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'ky') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'ln') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'lo') {
    select = frSelect_;
  }
  if (goog.LOCALE === 'lt') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'lv') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'mk') {
    select = mkSelect_;
  }
  if (goog.LOCALE === 'ml') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'mn') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'mo') {
    select = frSelect_;
  }
  if (goog.LOCALE === 'mr') {
    select = mrSelect_;
  }
  if (goog.LOCALE === 'ms') {
    select = frSelect_;
  }
  if (goog.LOCALE === 'mt') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'my') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'nb') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'ne') {
    select = neSelect_;
  }
  if (goog.LOCALE === 'nl') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'no') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'no_NO' || goog.LOCALE === 'no-NO') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'or') {
    select = orSelect_;
  }
  if (goog.LOCALE === 'pa') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'pl') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'pt') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'pt_BR' || goog.LOCALE === 'pt-BR') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'pt_PT' || goog.LOCALE === 'pt-PT') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'ro') {
    select = frSelect_;
  }
  if (goog.LOCALE === 'ru') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'sh') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'si') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'sk') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'sl') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'sq') {
    select = sqSelect_;
  }
  if (goog.LOCALE === 'sr') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'sr_Latn' || goog.LOCALE === 'sr-Latn') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'sv') {
    select = svSelect_;
  }
  if (goog.LOCALE === 'sw') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'ta') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'te') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'th') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'tl') {
    select = frSelect_;
  }
  if (goog.LOCALE === 'tr') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'uk') {
    select = ukSelect_;
  }
  if (goog.LOCALE === 'ur') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'uz') {
    select = defaultSelect_;
  }
  if (goog.LOCALE === 'vi') {
    select = frSelect_;
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
    select = defaultSelect_;
  }
}  // End of polyfill selections.
