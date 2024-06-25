/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utilities for HTML element tag names.
 */
import object from '../object/object.js';


/**
 * The void elements specified by
 * http://www.w3.org/TR/html-markup/syntax.html#void-elements.
 * @const @private {!Object<string, boolean>}
 */
var VOID_TAGS_ = object.createSet(
    'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input',
    'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr');


/**
 * Checks whether the tag is void (with no contents allowed and no legal end
 * tag), for example 'br'.
 * @param {string} tagName The tag name in lower case.
 * @return {boolean}
 */
export function isVoidTag(tagName) {
 return VOID_TAGS_[tagName] === true;
}
