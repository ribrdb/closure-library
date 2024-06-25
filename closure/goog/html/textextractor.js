/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview Contains utility methods to extract text content from HTML.
 * @supported IE 10+, Chrome 26+, Firefox 22+, Safari 7.1+, Opera 15+
 */

import { TagName } from '../dom/tagname.js';

import { HtmlSanitizer } from './sanitizer/htmlsanitizer.js';
import object from '../object/object.js';


/**
 * Safely extracts text from an untrusted HTML string using the HtmlSanitizer.
 * Compared to goog.html.utils.stripHtmlTags, it tries to be smarter about
 * printing newlines between blocks and leave out textual content that would not
 * be displayed to the user (such as SCRIPT and STYLE tags).
 * @param {string} html The untrusted HTML string.
 * @return {string}
 */
// TODO(pelizzi): consider an optional bool parameter to also extract the text
// content of alt attributes and such.
export function extractTextContent(html) {
  if (!isSupported()) {
    return '';
  }
  // Disable all attributes except style to protect against DOM clobbering.
  var sanitizer = new HtmlSanitizer.Builder()
                      .onlyAllowAttributes(['style'])
                      .allowCssStyles()
                      .build();
  // The default policy of the sanitizer strips the content of tags such as
  // SCRIPT and STYLE, whose non-textual content would otherwise end up in the
  // extracted text.
  var sanitizedNodes = sanitizer.sanitizeToDomNode(html);
  // textContent and innerText do not handle spacing between block elements
  // properly. We need to reimplement a similar algorithm ourselves and account
  // for spacing between block elements.
  return extractTextContentFromNode_(sanitizedNodes)
      .trim();
}


/**
 * Recursively extract text from the supplied DOM node and its descendants.
 * @param {!Node} node
 * @return {string}
 * @private
 */
function extractTextContentFromNode_(node) {
  switch (node.nodeType) {
    case Node.ELEMENT_NODE:
      var element = /** @type {!Element} */ (node);
      if (element.tagName == TagName.BR) {
        return '\n';
      }
      var result = Array.prototype.map
                       .call(
                           node.childNodes,
                           extractTextContentFromNode_)
                       .join('');
      if (isBlockElement_(element)) {
        result = '\n' + result + '\n';
      }
      return result;
    case Node.TEXT_NODE:
      return node.nodeValue.replace(/\s+/g, ' ').trim();
    default:
      return '';
  }
}


/**
 * A set of block elements.
 * @private @const {!Object<!TagName, boolean>}
 */
var BLOCK_ELEMENTS_ = object.createSet(
    TagName.ADDRESS, TagName.BLOCKQUOTE,
    TagName.CENTER, TagName.DIV, TagName.DL,
    TagName.FIELDSET, TagName.FORM, TagName.H1,
    TagName.H2, TagName.H3, TagName.H4,
    TagName.H5, TagName.H6, TagName.HR,
    TagName.OL, TagName.P, TagName.PRE,
    TagName.TABLE, TagName.UL);


/**
 * Returns true whether this is a block element, i.e. the browser would visually
 * separate the text content from the text content of the previous node.
 * @param {!Element} element
 * @return {boolean}
 * @private
 */
function isBlockElement_(element) {
  return element.style.display == 'block' ||
      BLOCK_ELEMENTS_.hasOwnProperty(element.tagName);
}


/**
 * Whether the browser supports the text extractor. The extractor depends on the
 * HTML Sanitizer, which only supports IE starting from version 10.
 * Visible for testing.
 * @return {boolean}
 * @package
 */
export function isSupported() {
  return true;
}
