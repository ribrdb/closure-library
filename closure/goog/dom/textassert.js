/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Utilities intended for refactoring legacy code; allows classifying strings
 * into plain text that does not contain HTML and HTML. Please do NOT use in new
 * code.
 */

import * as asserts from '../asserts/asserts.js';

import * as dom from './dom.js';
import { TagName } from './tagname.js';

/**
 * Assert that the string is plain text that does not have HTML, i.e. not
 * affected by HTML escaping. Otherwise, this raises an error if assertions are
 * enabled. It does NOT sanitize nor make any change to the input string. It
 * should only be used when the assertion failure is benign, such as printing
 * spurious tags. DO NOT count on this to remove unsafe HTML. It is only meant
 * for legacy refactoring. Please do NOT use in new code.
 * @param {string} text
 * @return {string}
 */
export function assertHtmlFree(text) {
 if (asserts.ENABLE_ASSERTS) {
   var elmt = dom.createElement(TagName.BODY);
   elmt.textContent = text;
   asserts.assert(
       elmt.innerHTML == elmt.textContent,
       'String has HTML original: %s, escaped: %s', text, elmt.innerHTML);
 }
 return text;
}
