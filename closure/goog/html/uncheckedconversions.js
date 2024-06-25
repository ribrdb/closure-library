/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Unchecked conversions to create values of goog.html types from
 * plain strings.  Use of these functions could potentially result in instances
 * of goog.html types that violate their type contracts, and hence result in
 * security vulnerabilties.
 *
 * Therefore, all uses of the methods herein must be carefully security
 * reviewed.  Avoid use of the methods in this file whenever possible; instead
 * prefer to create instances of goog.html types using inherently safe builders
 * or template systems.
 *
 *
 */


import * as asserts from '../asserts/asserts.js';

import { SafeHtml } from './safehtml.js';
import { SafeScript } from './safescript.js';
import { SafeStyle } from './safestyle.js';
import { SafeStyleSheet } from './safestylesheet.js';
import { SafeUrl } from './safeurl.js';
import { TrustedResourceUrl } from './trustedresourceurl.js';
import { Const } from '../string/const.js';
import * as internal from '../string/internal.js';


/**
 * Performs an "unchecked conversion" to SafeHtml from a plain string that is
 * known to satisfy the SafeHtml type contract.
 *
 * IMPORTANT: Uses of this method must be carefully security-reviewed to ensure
 * that the value of `html` satisfies the SafeHtml type contract in all
 * possible program states.
 *
 *
 * @param {!Const} justification A constant string explaining why
 *     this use of this method is safe. May include a security review ticket
 *     number.
 * @param {string} html A string that is claimed to adhere to the SafeHtml
 *     contract.
 * @return {!SafeHtml} The value of html, wrapped in a SafeHtml
 *     object.
 */
export function safeHtmlFromStringKnownToSatisfyTypeContract(justification, html) {
    // unwrap() called inside an assert so that justification can be optimized
    // away in production code.
    asserts.assertString(
        Const.unwrap(justification), 'must provide justification');
    asserts.assert(
        !internal.isEmptyOrWhitespace(
            Const.unwrap(justification)),
        'must provide non-empty justification');
    return SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(
        html);
}


/**
 * Performs an "unchecked conversion" to SafeScript from a plain string that is
 * known to satisfy the SafeScript type contract.
 *
 * IMPORTANT: Uses of this method must be carefully security-reviewed to ensure
 * that the value of `script` satisfies the SafeScript type contract in
 * all possible program states.
 *
 *
 * @param {!Const} justification A constant string explaining why
 *     this use of this method is safe. May include a security review ticket
 *     number.
 * @param {string} script The string to wrap as a SafeScript.
 * @return {!SafeScript} The value of `script`, wrapped in a
 *     SafeScript object.
 */
export function safeScriptFromStringKnownToSatisfyTypeContract(justification, script) {
    // unwrap() called inside an assert so that justification can be optimized
    // away in production code.
    asserts.assertString(
        Const.unwrap(justification), 'must provide justification');
    asserts.assert(
        !internal.isEmptyOrWhitespace(
            Const.unwrap(justification)),
        'must provide non-empty justification');
    return SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(
        script);
}


/**
 * Performs an "unchecked conversion" to SafeStyle from a plain string that is
 * known to satisfy the SafeStyle type contract.
 *
 * IMPORTANT: Uses of this method must be carefully security-reviewed to ensure
 * that the value of `style` satisfies the SafeStyle type contract in all
 * possible program states.
 *
 *
 * @param {!Const} justification A constant string explaining why
 *     this use of this method is safe. May include a security review ticket
 *     number.
 * @param {string} style The string to wrap as a SafeStyle.
 * @return {!SafeStyle} The value of `style`, wrapped in a
 *     SafeStyle object.
 */
export function safeStyleFromStringKnownToSatisfyTypeContract(justification, style) {
    // unwrap() called inside an assert so that justification can be optimized
    // away in production code.
    asserts.assertString(
        Const.unwrap(justification), 'must provide justification');
    asserts.assert(
        !internal.isEmptyOrWhitespace(
            Const.unwrap(justification)),
        'must provide non-empty justification');
    return SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(
        style);
}


/**
 * Performs an "unchecked conversion" to SafeStyleSheet from a plain string
 * that is known to satisfy the SafeStyleSheet type contract.
 *
 * IMPORTANT: Uses of this method must be carefully security-reviewed to ensure
 * that the value of `styleSheet` satisfies the SafeStyleSheet type
 * contract in all possible program states.
 *
 *
 * @param {!Const} justification A constant string explaining why
 *     this use of this method is safe. May include a security review ticket
 *     number.
 * @param {string} styleSheet The string to wrap as a SafeStyleSheet.
 * @return {!SafeStyleSheet} The value of `styleSheet`, wrapped
 *     in a SafeStyleSheet object.
 */
export function safeStyleSheetFromStringKnownToSatisfyTypeContract(justification, styleSheet) {
    // unwrap() called inside an assert so that justification can be optimized
    // away in production code.
    asserts.assertString(
        Const.unwrap(justification), 'must provide justification');
    asserts.assert(
        !internal.isEmptyOrWhitespace(
            Const.unwrap(justification)),
        'must provide non-empty justification');
    return SafeStyleSheet
        .createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(styleSheet);
}


/**
 * Performs an "unchecked conversion" to SafeUrl from a plain string that is
 * known to satisfy the SafeUrl type contract.
 *
 * IMPORTANT: Uses of this method must be carefully security-reviewed to ensure
 * that the value of `url` satisfies the SafeUrl type contract in all
 * possible program states.
 *
 *
 * @param {!Const} justification A constant string explaining why
 *     this use of this method is safe. May include a security review ticket
 *     number.
 * @param {string} url The string to wrap as a SafeUrl.
 * @return {!SafeUrl} The value of `url`, wrapped in a SafeUrl
 *     object.
 */
export function safeUrlFromStringKnownToSatisfyTypeContract(justification, url) {
    // unwrap() called inside an assert so that justification can be optimized
    // away in production code.
    asserts.assertString(
        Const.unwrap(justification), 'must provide justification');
    asserts.assert(
        !internal.isEmptyOrWhitespace(
            Const.unwrap(justification)),
        'must provide non-empty justification');
    return SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(url);
}


/**
 * Performs an "unchecked conversion" to TrustedResourceUrl from a plain string
 * that is known to satisfy the TrustedResourceUrl type contract.
 *
 * IMPORTANT: Uses of this method must be carefully security-reviewed to ensure
 * that the value of `url` satisfies the TrustedResourceUrl type contract
 * in all possible program states.
 *
 *
 * @param {!Const} justification A constant string explaining why
 *     this use of this method is safe. May include a security review ticket
 *     number.
 * @param {string} url The string to wrap as a TrustedResourceUrl.
 * @return {!TrustedResourceUrl} The value of `url`, wrapped in
 *     a TrustedResourceUrl object.
 */
export function trustedResourceUrlFromStringKnownToSatisfyTypeContract(justification, url) {
    // unwrap() called inside an assert so that justification can be optimized
    // away in production code.
    asserts.assertString(
        Const.unwrap(justification), 'must provide justification');
    asserts.assert(
        !internal.isEmptyOrWhitespace(
            Const.unwrap(justification)),
        'must provide non-empty justification');
    return TrustedResourceUrl
        .createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(url);
}
