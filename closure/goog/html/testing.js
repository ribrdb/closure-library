/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utilities to create arbitrary values of goog.html types for
 * testing purposes. These utility methods perform no validation, and the
 * resulting instances may violate type contracts.
 *
 * These methods are useful when types are constructed in a manner where using
 * the production API is too inconvenient. Please do use the production API
 * whenever possible; there is value in having tests reflect common usage and it
 * avoids, by design, non-contract complying instances from being created.
 */


goog.setTestOnly();

import { SafeHtml } from './safehtml.js';
import { SafeScript } from './safescript.js';
import { SafeStyle } from './safestyle.js';
import { SafeStyleSheet } from './safestylesheet.js';
import { SafeUrl } from './safeurl.js';
import { TrustedResourceUrl } from './trustedresourceurl.js';
import { ArgumentMatcher } from '../testing/mockmatchers.js';


/**
 * Creates a SafeHtml wrapping the given value. No validation is performed.
 *
 * This function is for use in tests only and must never be used in production
 * code.
 *
 * @param {string} html The string to wrap into a SafeHtml.
 * @return {!SafeHtml}
 */
export function newSafeHtmlForTest(html) {
  return SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(
      html);
}


/**
 * Creates a SafeScript wrapping the given value. No validation is performed.
 *
 * This function is for use in tests only and must never be used in production
 * code.
 *
 * @param {string} script The string to wrap into a SafeScript.
 * @return {!SafeScript}
 */
export function newSafeScriptForTest(script) {
  return SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(
      script);
}


/**
 * Creates a SafeStyle wrapping the given value. No validation is performed.
 *
 * This function is for use in tests only and must never be used in production
 * code.
 *
 * @param {string} style String to wrap into a SafeStyle.
 * @return {!SafeStyle}
 */
export function newSafeStyleForTest(style) {
  return SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(
      style);
}


/**
 * Creates a SafeStyleSheet wrapping the given value. No validation is
 * performed.
 *
 * This function is for use in tests only and must never be used in production
 * code.
 *
 * @param {string} styleSheet String to wrap into a SafeStyleSheet.
 * @return {!SafeStyleSheet}
 */
export function newSafeStyleSheetForTest(styleSheet) {
  return SafeStyleSheet
      .createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(styleSheet);
}


/**
 * Creates a SafeUrl wrapping the given value. No validation is performed.
 *
 * This function is for use in tests only and must never be used in production
 * code.
 *
 * @param {string} url String to wrap into a SafeUrl.
 * @return {!SafeUrl}
 */
export function newSafeUrlForTest(url) {
  return SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(url);
}


/**
 * Creates a TrustedResourceUrl wrapping the given value. No validation is
 * performed.
 *
 * This function is for use in tests only and must never be used in production
 * code.
 *
 * @param {string} url String to wrap into a TrustedResourceUrl.
 * @return {!TrustedResourceUrl}
 */
export function newTrustedResourceUrlForTest(url) {
  return TrustedResourceUrl
      .createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(url);
}


/**
 * Creates an argument matcher for SafeHtml.
 * @param {string|!SafeHtml} expected
 * @return {!ArgumentMatcher}
 */
export function matchSafeHtml(expected) {
  if (expected instanceof SafeHtml) {
    expected = SafeHtml.unwrap(expected);
  }
  return new ArgumentMatcher(function(actual) {
    return SafeHtml.unwrap(actual) == expected;
  });
}


/**
 * Creates an argument matcher for SafeScript.
 * @param {string|!SafeScript} expected
 * @return {!ArgumentMatcher}
 */
export function matchSafeScript(expected) {
  if (expected instanceof SafeScript) {
    expected = SafeScript.unwrap(expected);
  }
  return new ArgumentMatcher(function(actual) {
    return SafeScript.unwrap(actual) == expected;
  });
}


/**
 * Creates an argument matcher for SafeStyle.
 * @param {string|!SafeStyle} expected
 * @return {!ArgumentMatcher}
 */
export function matchSafeStyle(expected) {
  if (expected instanceof SafeStyle) {
    expected = SafeStyle.unwrap(expected);
  }
  return new ArgumentMatcher(function(actual) {
    return SafeStyle.unwrap(actual) == expected;
  });
}


/**
 * Creates an argument matcher for SafeStyleSheet.
 * @param {string|!SafeStyleSheet} expected
 * @return {!ArgumentMatcher}
 */
export function matchSafeStyleSheet(expected) {
  if (expected instanceof SafeStyleSheet) {
    expected = SafeStyleSheet.unwrap(expected);
  }
  return new ArgumentMatcher(function(actual) {
    return SafeStyleSheet.unwrap(actual) == expected;
  });
}


/**
 * Creates an argument matcher for SafeUrl.
 * @param {string|!SafeUrl} expected
 * @return {!ArgumentMatcher}
 */
export function matchSafeUrl(expected) {
  if (expected instanceof SafeUrl) {
    expected = SafeUrl.unwrap(expected);
  }
  return new ArgumentMatcher(function(actual) {
    return SafeUrl.unwrap(actual) == expected;
  });
}


/**
 * Creates an argument matcher for TrustedResourceUrl.
 * @param {string|!TrustedResourceUrl} expected
 * @return {!ArgumentMatcher}
 */
export function matchTrustedResourceUrl(expected) {
  if (expected instanceof TrustedResourceUrl) {
    expected = TrustedResourceUrl.unwrap(expected);
  }
  return new ArgumentMatcher(function(actual) {
    return TrustedResourceUrl.unwrap(actual) == expected;
  });
}


/**
 * Equality tester to be used in Jasmine tests. Example:
 *
 *     beforeEach(function() {
 *       jasmine.addCustomEqualityTester(
 *           checkTypedStringEquality);
 *     });
 *
 *     it('typed string value matches same string', function() {
 *       expect(f).toHaveBeenCalledWith('expected');
 *     });
 *
 *     it('typed string value matches same type and string', function() {
 *       expect(f).toHaveBeenCalledWith(goog.string.Const.from('expected'));
 *     });
 *
 * @param {*} actual Handles goog.string.TypedString.
 * @param {*} expected Handles goog.string.TypedString or string.
 * @return {boolean|undefined} Undefined if not called with
 *     goog.string.TypedString, true if typed strings equal, false if not.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
export function checkTypedStringEquality(actual, expected) {
  if (actual && actual.implementsGoogStringTypedString) {
    if (expected != null && expected.implementsGoogStringTypedString) {
      if (!(actual instanceof expected.constructor)) {
        return false;
      }
      /**
       * @suppress {strictMissingProperties} Added to tighten compiler checks
       */
      expected = expected.getTypedStringValue();
    }
    return actual.getTypedStringValue() == expected;
  }
}
