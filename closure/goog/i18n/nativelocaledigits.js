/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

// clang-format off

/**
 * @fileoverview Provides map of locales to script identifiers
 * where locales require specific digits other than ASCII.
 */

/**
 * Type of map from locale string to script codes
 * @typedef {!Object<string,string>}
 */
export let LocaleScriptMap;

/**
 * Native digit codes in ECMAScript Intl objects for locales
 * where native digits are prescribed and Intl data is generally available.
 * This is designed for classes that create locale-specific
 * numbers. Examples include number and date/time formatting.
 * @const {!LocaleScriptMap}
 */
export let FormatWithLocaleDigits = {
  'ar': 'latn',
  'ar-EG': 'arab',
  'bn': 'beng',
  'fa': 'arabext',
  'mr': 'deva',
  'my': 'mymr',
  'ne': 'deva'
};
