/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview Contains helper functions for performing locale-sensitive
 *     collation.
 */


/**
 * Returns the comparator for a locale. If a locale is not explicitly specified,
 * a comparator for the user's locale will be returned. Note that if the browser
 * does not support locale-sensitive string comparisons, the comparator returned
 * will be a simple codepoint comparator.
 *
 * @param {string=} opt_locale the locale that the comparator is used for.
 * @param {{usage: (string|undefined), localeMatcher: (string|undefined),
 *     sensitivity: (string|undefined), ignorePunctuation: (boolean|undefined),
 *     numeric: (boolean|undefined), caseFirst: (string|undefined)}=}
 *         opt_options the optional set of options for use with the native
 *         collator.
 * @return {function(string, string): number} The locale-specific comparator.
 */
export function createComparator(opt_locale, opt_options) {
  // See http://code.google.com/p/v8-i18n.
  if (hasNativeComparator()) {
    const intl = goog.global.Intl;
    return new intl.Collator([opt_locale || goog.LOCALE], opt_options || {})
        .compare;
  } else {
    return function(arg1, arg2) {
      return arg1.localeCompare(arg2);
    };
  }
};


/**
 * Returns true if a locale-sensitive comparator is available for a locale. If
 * a locale is not explicitly specified, the user's locale is used instead.
 *
 * @return {boolean} Whether there is a locale-sensitive comparator available
 *     for the locale.
 */
export function hasNativeComparator() {
  if (goog.FEATURESET_YEAR >= 2019) return true;
  const intl = goog.global.Intl;
  return !!(intl && intl.Collator);
}
