/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Soy data primitives.
 *
 * The goal is to encompass data types used by Soy, especially to mark content
 * as known to be "safe".
 */

goog.declareModuleId('goog.soy.data');

import { Uri } from '../uri/uri.js';
import * as asserts from '../asserts/asserts.js';
import * as safe from '../dom/safe.js';
import { SafeHtml } from '../html/safehtml.js';
import { SafeScript } from '../html/safescript.js';
import { SafeStyle } from '../html/safestyle.js';
import { SafeStyleSheet } from '../html/safestylesheet.js';
import { SafeUrl } from '../html/safeurl.js';
import { TrustedResourceUrl } from '../html/trustedresourceurl.js';
import * as uncheckedconversions from '../html/uncheckedconversions.js';
import { Dir } from '../i18n/bidi.js';
import { Const } from '../string/const.js';

/**
 * A type of textual content.
 *
 * This is an enum of type Object so that these values are unforgeable.
 *
 * @enum {!Object}
 */
export var SanitizedContentKind = {

  /**
   * A snippet of HTML that does not start or end inside a tag, comment, entity,
   * or DOCTYPE; and that does not contain any executable code
   * (JS, {@code <object>}s, etc.) from a different trust domain.
   */
  HTML: goog.DEBUG ? {sanitizedContentKindHtml: true} : {},

  /**
   * Executable JavaScript code or expression, safe for insertion in a
   * script-tag or event handler context, known to be free of any
   * attacker-controlled scripts. This can either be side-effect-free
   * JavaScript (such as JSON) or JavaScript that's entirely under Google's
   * control.
   */
  JS: goog.DEBUG ? {sanitizedContentJsChars: true} : {},

  /** A properly encoded portion of a URI. */
  URI: goog.DEBUG ? {sanitizedContentUri: true} : {},

  /** A resource URI not under attacker control. */
  TRUSTED_RESOURCE_URI:
      goog.DEBUG ? {sanitizedContentTrustedResourceUri: true} : {},

  /**
   * Repeated attribute names and values. For example,
   * {@code dir="ltr" foo="bar" onclick="trustedFunction()" checked}.
   */
  ATTRIBUTES: goog.DEBUG ? {sanitizedContentHtmlAttribute: true} : {},

  // TODO: Consider separating rules, declarations, and values into
  // separate types, but for simplicity, we'll treat explicitly blessed
  // SanitizedContent as allowed in all of these contexts.
  /**
   * A CSS3 declaration, property, value or group of semicolon separated
   * declarations.
   */
  STYLE: goog.DEBUG ? {sanitizedContentStyle: true} : {},

  /** A CSS3 style sheet (list of rules). */
  CSS: goog.DEBUG ? {sanitizedContentCss: true} : {}

  // TEXT doesn't produce SanitizedContent anymore, use renderText.
};



/**
 * A string-like object that carries a content-type and a content direction.
 *
 * IMPORTANT! Do not create these directly, nor instantiate the subclasses.
 * Instead, use a trusted, centrally reviewed library as endorsed by your team
 * to generate these objects. Otherwise, you risk accidentally creating
 * SanitizedContent that is attacker-controlled and gets evaluated unescaped in
 * templates.
 *
 * @constructor
 */
export function SanitizedContent() {
 throw new Error('Do not instantiate directly');
}


/**
 * The context in which this content is safe from XSS attacks.
 * @type {SanitizedContentKind}
 */
SanitizedContent.prototype.contentKind;


/**
 * The content's direction; null if unknown and thus to be estimated when
 * necessary.
 * @type {?Dir}
 */
SanitizedContent.prototype.contentDir = null;


/**
 * The already-safe content.
 * @protected {string}
 */
SanitizedContent.prototype.content;


/**
 * Gets the already-safe content.
 * @return {string}
 */
SanitizedContent.prototype.getContent = function() {
 return this.content;
};


/** @override */
SanitizedContent.prototype.toString = function() {
 return this.content;
};


/**
 * Converts sanitized content of kind HTML into SafeHtml
 * @return {!SafeHtml}
 * @throws {!Error} when the content kind is not HTML.
 */
SanitizedContent.prototype.toSafeHtml = function() {
 if (this.contentKind !== SanitizedContentKind.HTML) {
   throw new Error('Sanitized content was not of kind HTML.');
 }
 return uncheckedconversions
     .safeHtmlFromStringKnownToSatisfyTypeContract(
         Const.from(
             'Soy SanitizedContent of kind HTML produces ' +
             'SafeHtml-contract-compliant value.'),
         this.toString());
};

/** @type {(function((!Element|!ShadowRoot)): void)|undefined} */
SanitizedContent.prototype.renderElement;

/** @type {(function(): !Element)|undefined} */
SanitizedContent.prototype.renderAsElement;

/**
 * Converts sanitized content of kind URI into SafeUrl without modification.
 * @return {!SafeUrl}
 * @throws {Error} when the content kind is not URI.
 */
SanitizedContent.prototype.toSafeUrl = function() {
 if (this.contentKind !== SanitizedContentKind.URI) {
   throw new Error('Sanitized content was not of kind URI.');
 }
 return uncheckedconversions
     .safeUrlFromStringKnownToSatisfyTypeContract(
         Const.from(
             'Soy SanitizedContent of kind URI produces ' +
             'SafeHtml-contract-compliant value.'),
         this.toString());
};


/**
 * Content of type {@link SanitizedContentKind.HTML}.
 *
 * The content is a string of HTML that can safely be embedded in a PCDATA
 * context in your app.  If you would be surprised to find that an HTML
 * sanitizer produced `s` (e.g.  it runs code or fetches bad URLs) and
 * you wouldn't write a template that produces `s` on security or privacy
 * grounds, then don't pass `s` here. The default content direction is
 * unknown, i.e. to be estimated when necessary.
 *
 * @extends {SanitizedContent}
 * @constructor
 */
export function SanitizedHtml() {
 SanitizedHtml.base(this, 'constructor');
}
goog.inherits(SanitizedHtml, SanitizedContent);


/** @override */
SanitizedHtml.prototype.contentKind =
    SanitizedContentKind.HTML;


/**
 * Checks if the value could be used as the Soy type {html}.
 * @param {*} value
 * @return {boolean}
 */
SanitizedHtml.isCompatibleWith = function(value) {
 return typeof value === 'string' ||
     SanitizedHtml.isCompatibleWithStrict(value);
};


/**
 * Checks if the value could be used as the Soy type {html}.
 * Strict: disallows strings.
 * @param {*} value
 * @return {boolean}
 */
SanitizedHtml.isCompatibleWithStrict = function(value) {
 return value instanceof SanitizedHtml ||
     value instanceof SafeHtml;
};


/**
 * Content of type {@link SanitizedContentKind.JS}.
 *
 * The content is JavaScript source that when evaluated does not execute any
 * attacker-controlled scripts. The content direction is LTR.
 *
 * @extends {SanitizedContent}
 * @constructor
 */
export function SanitizedJs() {
 SanitizedJs.base(this, 'constructor');
}
goog.inherits(SanitizedJs, SanitizedContent);


/** @override */
SanitizedJs.prototype.contentKind =
    SanitizedContentKind.JS;


/** @override */
SanitizedJs.prototype.contentDir = Dir.LTR;


/**
 * Checks if the value could be used as the Soy type {js}.
 * @param {*} value
 * @return {boolean}
 */
SanitizedJs.isCompatibleWith = function(value) {
 return typeof value === 'string' ||
     SanitizedJs.isCompatibleWithStrict(value);
};

/**
 * Checks if the value could be used as the Soy type {js}.
 * Strict: disallows strings.
 * @param {*} value
 * @return {boolean}
 */
SanitizedJs.isCompatibleWithStrict = function(value) {
 return value instanceof SanitizedJs ||
     value instanceof SafeScript;
};


/**
 * Converts sanitized content of kind JS into SafeScript without modification.
 * @return {!SafeScript}
 */
SanitizedJs.prototype.toSafeScript = function() {
 return uncheckedconversions
     .safeScriptFromStringKnownToSatisfyTypeContract(
         Const.from(
             'Soy SanitizedContent of kind JS produces ' +
             'SafeScript-contract-compliant value.'),
         this.toString());
};



/**
 * Content of type {@link SanitizedContentKind.URI}.
 *
 * The content is a URI chunk that the caller knows is safe to emit in a
 * template. The content direction is LTR.
 *
 * @extends {SanitizedContent}
 * @constructor
 */
export function SanitizedUri() {
 SanitizedUri.base(this, 'constructor');
}
goog.inherits(SanitizedUri, SanitizedContent);

/** @override */
SanitizedUri.prototype.contentKind =
    SanitizedContentKind.URI;


/** @override */
SanitizedUri.prototype.contentDir = Dir.LTR;


/**
 * Checks if the value could be used as the Soy type {uri}.
 * @param {*} value
 * @return {boolean}
 */
SanitizedUri.isCompatibleWith = function(value) {
 return typeof value === 'string' ||
     SanitizedUri.isCompatibleWithStrict(value);
};


/**
 * Checks if the value could be used as the Soy type {uri}.
 * Strict: disallows strings.
 * @param {*} value
 * @return {boolean}
 */
SanitizedUri.isCompatibleWithStrict = function(value) {
 return value instanceof SanitizedUri ||
     value instanceof SafeUrl ||
     value instanceof TrustedResourceUrl ||
     value instanceof Uri;
};



/**
 * Content of type
 * {@link SanitizedContentKind.TRUSTED_RESOURCE_URI}.
 *
 * The content is a TrustedResourceUri chunk that is not under attacker control.
 * The content direction is LTR.
 *
 * @extends {SanitizedContent}
 * @constructor
 */
export function SanitizedTrustedResourceUri() {
 SanitizedTrustedResourceUri.base(this, 'constructor');
}
goog.inherits(
    SanitizedTrustedResourceUri, SanitizedContent);


/** @override */
SanitizedTrustedResourceUri.prototype.contentKind =
    SanitizedContentKind.TRUSTED_RESOURCE_URI;


/** @override */
SanitizedTrustedResourceUri.prototype.contentDir =
    Dir.LTR;


/**
 * Converts sanitized content into TrustedResourceUrl without modification.
 * @return {!TrustedResourceUrl}
 */
SanitizedTrustedResourceUri.prototype.toTrustedResourceUrl =
    function() {
     return uncheckedconversions
         .trustedResourceUrlFromStringKnownToSatisfyTypeContract(
             Const.from(
                 'Soy SanitizedContent of kind TRUSTED_RESOURCE_URI produces ' +
                 'TrustedResourceUrl-contract-compliant value.'),
             this.toString());
    };


/**
 * Checks if the value could be used as the Soy type {trusted_resource_uri}.
 * @param {*} value
 * @return {boolean}
 */
SanitizedTrustedResourceUri.isCompatibleWith = function(value) {
 return typeof value === 'string' ||
     SanitizedTrustedResourceUri.isCompatibleWithStrict(value);
};


/**
 * Checks if the value could be used as the Soy type {trusted_resource_uri}.
 * Strict: disallows strings.
 * @param {*} value
 * @return {boolean}
 */
SanitizedTrustedResourceUri.isCompatibleWithStrict = function(
    value) {
 return value instanceof SanitizedTrustedResourceUri ||
     value instanceof TrustedResourceUrl;
};



/**
 * Content of type {@link SanitizedContentKind.ATTRIBUTES}.
 *
 * The content should be safely embeddable within an open tag, such as a
 * key="value" pair. The content direction is LTR.
 *
 * @extends {SanitizedContent}
 * @constructor
 */
export function SanitizedHtmlAttribute() {
 SanitizedHtmlAttribute.base(this, 'constructor');
}
goog.inherits(
    SanitizedHtmlAttribute, SanitizedContent);


/** @override */
SanitizedHtmlAttribute.prototype.contentKind =
    SanitizedContentKind.ATTRIBUTES;


/** @override */
SanitizedHtmlAttribute.prototype.contentDir =
    Dir.LTR;


/**
 * Checks if the value could be used as the Soy type {attribute}.
 * @param {*} value
 * @return {boolean}
 */
SanitizedHtmlAttribute.isCompatibleWith = function(value) {
 return typeof value === 'string' ||
     SanitizedHtmlAttribute.isCompatibleWithStrict(value);
};


/**
 * Checks if the value could be used as the Soy type {attribute}.
 * Strict: disallows strings.
 * @param {*} value
 * @return {boolean}
 */
SanitizedHtmlAttribute.isCompatibleWithStrict = function(value) {
 return value instanceof SanitizedHtmlAttribute;
};



/**
 * Content of type {@link SanitizedContentKind.CSS}.
 *
 * The content is non-attacker-exploitable CSS, such as {@code @import url(x)}.
 * The content direction is LTR.
 *
 * @extends {SanitizedContent}
 * @constructor
 */
export function SanitizedCss() {
 SanitizedCss.base(this, 'constructor');
}
goog.inherits(SanitizedCss, SanitizedContent);


/** @override */
SanitizedCss.prototype.contentKind =
    SanitizedContentKind.CSS;


/** @override */
SanitizedCss.prototype.contentDir = Dir.LTR;


/**
 * Checks if the value could be used as the Soy type {css}.
 * @param {*} value
 * @return {boolean}
 */
SanitizedCss.isCompatibleWith = function(value) {
 return typeof value === 'string' ||
     SanitizedCss.isCompatibleWithStrict(value);
};


/**
 * Checks if the value could be used as the Soy type {css}.
 * Strict: disallows strings.
 * @param {*} value
 * @return {boolean}
 */
SanitizedCss.isCompatibleWithStrict = function(value) {
 return value instanceof SanitizedCss ||
     value instanceof SafeStyle ||
     value instanceof SafeStyleSheet;
};


/**
 * Converts SanitizedCss into SafeStyleSheet.
 * Note: SanitizedCss in Soy represents both SafeStyle and SafeStyleSheet in
 * Closure. It's about to be split so that SanitizedCss represents only
 * SafeStyleSheet.
 * @return {!SafeStyleSheet}
 */
SanitizedCss.prototype.toSafeStyleSheet = function() {
 var value = this.toString();
 asserts.assert(
     /[@{]|^\s*$/.test(value),
     'value doesn\'t look like style sheet: ' + value);
 return uncheckedconversions
     .safeStyleSheetFromStringKnownToSatisfyTypeContract(
         Const.from(
             'Soy SanitizedCss produces SafeStyleSheet-contract-compliant ' +
             'value.'),
         value);
};


/**
 * Converts SanitizedCss into SafeStyle.
 * @return {!SafeStyle}
 */
SanitizedCss.prototype.toSafeStyle = function() {
 const value = this.toString();
 asserts.assert(
     !/{/.test(value), 'value doesn\'t look like style: ' + value);
 return uncheckedconversions
     .safeStyleFromStringKnownToSatisfyTypeContract(
         Const.from(
             'Soy SanitizedCss produces SafeStyle-contract-compliant value.'),
         value);
};
