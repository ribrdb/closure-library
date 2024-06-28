/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides test helpers for Soy tests.
 */

goog.setTestOnly('goog.soy.testHelper');

import * as dom from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import { Dir } from '../i18n/bidi.js';

import {
 SanitizedContent,
 SanitizedContentKind,
 SanitizedCss,
 SanitizedTrustedResourceUri,
} from './data.js';

import * as googString from '../string/string.js';
import * as asserts from '../testing/asserts.js';
import * as userAgent from '../useragent/useragent.js';



/**
 * Instantiable subclass of SanitizedContent.
 *
 * This is a spoof for sanitized content that isn't robust enough to get
 * through Soy's escaping functions but is good enough for the checks here.
 *
 * @constructor
 * @param {string} content The text.
 * @param {SanitizedContentKind} kind The kind of safe content.
 * @extends {SanitizedContent}
 */
function SanitizedContentSubclass(content, kind) {
  // IMPORTANT! No superclass chaining to avoid exception being thrown.
  this.content = content;
  this.contentKind = kind;
}
goog.inherits(SanitizedContentSubclass, SanitizedContent);


/**
 * Instantiable subclass of SanitizedCss.
 * @param {string} content
 * @constructor
 * @extends {SanitizedCss}
 */
function SanitizedCssSubclass(content) {
  // IMPORTANT! No superclass chaining to avoid exception being thrown.
  this.content = content;
  this.contentKind = SanitizedContentKind.CSS;
}
goog.inherits(SanitizedCssSubclass, SanitizedCss);


/**
 * @param {string} content The text.
 * @param {SanitizedContentKind|string} kind The kind of safe
 *     content.
 * @return {!SanitizedContentSubclass}
 */
function makeSanitizedContent(content, kind) {
  return new SanitizedContentSubclass(
      content,
      /** @type {SanitizedContentKind} */ (kind));
}



/**
 * Instantiable subclass of SanitizedTrustedResourceUri.
 *
 * This is a spoof for trusted resource URI that isn't robust enough to get
 * through Soy's escaping functions but is good enough for the checks here.
 *
 * @param {string} content The URI.
 * @constructor
 * @extends {SanitizedTrustedResourceUri}
 * @final
 */
function SanitizedTrustedResourceUriSubclass(content) {
  // IMPORTANT! No superclass chaining to avoid exception being thrown.
  this.content = content;
  this.contentKind = SanitizedContentKind.TRUSTED_RESOURCE_URI;
}
goog.inherits(
    SanitizedTrustedResourceUriSubclass,
    SanitizedTrustedResourceUri);



//
// Fake Soy-generated template functions.
//

const example = {};


/**
 * @param {{name: string}} data
 * @param {?Object<string, *>=} opt_injectedData
 * @return {!SanitizedContent}
 */
example.textNodeTemplate = function(data, opt_injectedData) {
 assertNotNull(data);
 assertNotUndefined(data);
 return makeSanitizedContent(
     googString.htmlEscape(data.name),
     SanitizedContentKind.HTML);
};


/**
 * @param {{name: string}} data
 * @param {?Object<string, *>=} opt_injectedData
 * @return {!SanitizedContent}
 */
example.singleRootTemplate = function(data, opt_injectedData) {
 assertNotNull(data);
 assertNotUndefined(data);
 return makeSanitizedContent(
     '<span>' + googString.htmlEscape(data.name) + '</span>',
     SanitizedContentKind.HTML);
};


/**
 * @param {{name: string}} data
 * @param {?Object<string, *>=} opt_injectedData
 * @return {!SanitizedContent}
 */
example.multiRootTemplate = function(data, opt_injectedData) {
 assertNotNull(data);
 assertNotUndefined(data);
 return makeSanitizedContent(
     '<div>Hello</div><div>' + googString.htmlEscape(data.name) + '</div>',
     SanitizedContentKind.HTML);
};


/**
 * @param {{name: string}} data
 * @param {?Object<string, *>=} opt_injectedData
 * @return {!SanitizedContent}
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
example.injectedDataTemplate = function(data, opt_injectedData) {
 assertNotNull(data);
 assertNotUndefined(data);
 return makeSanitizedContent(
     googString.htmlEscape(data.name) +
         googString.htmlEscape(opt_injectedData.name),
     SanitizedContentKind.HTML);
};


/**
 * @param {{name: string}} data
 * @param {Object<string, *>=} opt_injectedData
 * @return {!SanitizedContent}
 */
example.noDataTemplate = function(data, opt_injectedData) {
 assertNotNull(data);
 assertNotUndefined(data);
 return makeSanitizedContent(
     '<div>Hello</div>', SanitizedContentKind.HTML);
};


/**
 * @param {{name: string}} data
 * @param {Object<string, *>=} opt_injectedData
 * @return {!SanitizedContentSubclass}
 */
example.sanitizedHtmlTemplate = function(data, opt_injectedData) {
 // Test the SanitizedContent constructor.
 const sanitized = makeSanitizedContent(
     'Hello <b>World</b>', SanitizedContentKind.HTML);
 sanitized.contentDir = Dir.LTR;
 return sanitized;
};


/**
 * @param {{name: string}} data
 * @param {Object<string, *>=} opt_injectedData
 * @return {!SanitizedContentSubclass}
 */
example.sanitizedHtmlAttributesTemplate = function(data, opt_injectedData) {
 return makeSanitizedContent(
     'foo="bar"', SanitizedContentKind.ATTRIBUTES);
};


/**
 * @param {{name: string}} data
 * @param {?Object<string, *>=} opt_injectedData
 * @return {!SanitizedContentSubclass}
 */
example.sanitizedSmsUrlTemplate = function(data, opt_injectedData) {
 // Test the SanitizedContent constructor.
 const sanitized = makeSanitizedContent(
     'sms:123456789', SanitizedContentKind.URI);
 return sanitized;
};


/**
 * @param {{name: string}} data
 * @param {?Object<string, *>=} opt_injectedData
 * @return {!SanitizedContentSubclass}
 */
example.sanitizedHttpUrlTemplate = function(data, opt_injectedData) {
 // Test the SanitizedContent constructor.
 const sanitized = makeSanitizedContent(
     'https://google.com/foo?n=917', SanitizedContentKind.URI);
 return sanitized;
};


/**
 * @param {{name: string}} data
 * @param {?Object<string, *>=} opt_injectedData
 * @return {!SanitizedTrustedResourceUri}
 */
example.sanitizedTrustedResourceUriTemplate = function(data, opt_injectedData) {
 return new SanitizedTrustedResourceUriSubclass('https://google.com/a.js');
};


/**
 * @param {!Object<string, *>} data
 * @param {Object<string, *>=} opt_injectedData
 * @return {!SanitizedCss}
 */
example.sanitizedCssTemplate = function(data, opt_injectedData) {
 return new SanitizedCssSubclass('html{display:none}');
};


/**
 * @param {!Object<string, *>} data
 * @param {!Object<string, *>=} opt_injectedData
 * @return {!SanitizedCss}
 */
example.sanitizedStyleTemplate = function(data, opt_injectedData) {
 return new SanitizedCssSubclass('display:none;');
};


/**
 * @param {{name: string}} data
 * @param {Object<string, *>=} opt_injectedData
 * @return {string}
 */
example.stringTemplate = function(data, opt_injectedData) {
 return '<b>XSS</b>';
};


/**
 * @param {{name: string}} data
 * @param {?Object<string, *>=} opt_injectedData
 * @return {!SanitizedContentSubclass}
 */
example.sanitizedUriTemplate = function(data, opt_injectedData) {
 return makeSanitizedContent(
     'https://example.com', SanitizedContentKind.URI);
};


/**
 * @param {{name: string}} data
 * @param {Object<string, *>=} opt_injectedData
 * @return {!SanitizedContentSubclass}
 */
example.templateSpoofingSanitizedContentString = function(
    data, opt_injectedData) {
 return makeSanitizedContent(
     'Hello World',
     // This is to ensure we're using triple-equals against a unique JavaScript
     // object.  For example, in JavaScript, consider ({}) == '[Object object]'
     // is true.
     SanitizedContentKind.HTML.toString());
};


/**
 * @param {{name: string}} data
 * @param {Object<string, *>=} opt_injectedData
 * @return {!SanitizedContent}
 */
example.tableRowTemplate = function(data, opt_injectedData) {
 return makeSanitizedContent(
     '<tr><td></td></tr>', SanitizedContentKind.HTML);
};


/**
 * @param {{name: string}} data
 * @param {Object<string, *>=} opt_injectedData
 * @return {!SanitizedContent}
 */
example.colGroupTemplateCaps = function(data, opt_injectedData) {
 return makeSanitizedContent(
     '<COLGROUP></COLGROUP>', SanitizedContentKind.HTML);
};


//
// Test helper functions.
//


/**
 * Retrieves the content of document fragment as HTML.
 * @param {Node} fragment The document fragment.
 * @return {string} Content of the document fragment as HTML.
 */
function fragmentToHtml(fragment) {
  const testDiv = dom.createElement(TagName.DIV);
  testDiv.appendChild(fragment);
  return elementToInnerHtml(testDiv);
}


/**
 * Retrieves the content of an element as HTML.
 * @param {Element} elem The element.
 * @return {string} Content of the element as HTML.
 */
function elementToInnerHtml(elem) {
  let innerHtml = elem.innerHTML;
  if (userAgent.IE) {
    innerHtml = innerHtml.replace(/DIV/g, 'div').replace(/\s/g, '');
  }
  return innerHtml;
}

goog.exportSymbol('example', example);
goog.exportSymbol('elementToInnerHtml', elementToInnerHtml);
goog.exportSymbol('fragmentToHtml', fragmentToHtml);