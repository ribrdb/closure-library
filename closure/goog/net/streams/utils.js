/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Returns whether a character is whitespace in the context of parsing JSON
 * stream.
 *
 * TODO(user): 0xa0 for IE?
 *
 * @param {string} c The char to check
 * @return {boolean} true if a char is a whitespace
 */
export function isJsonWhitespace(c) {
  return c == '\r' || c == '\n' || c == ' ' || c == '\t';
};
