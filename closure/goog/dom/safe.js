/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Type-safe wrappers for unsafe DOM APIs.
 *
 * This file provides type-safe wrappers for DOM APIs that can result in
 * cross-site scripting (XSS) vulnerabilities, if the API is supplied with
 * untrusted (attacker-controlled) input.  Instead of plain strings, the type
 * safe wrappers consume values of types from the goog.html package whose
 * contract promises that values are safe to use in the corresponding context.
 *
 * Hence, a program that exclusively uses the wrappers in this file (i.e., whose
 * only reference to security-sensitive raw DOM APIs are in this file) is
 * guaranteed to be free of XSS due to incorrect use of such DOM APIs (modulo
 * correctness of code that produces values of the respective goog.html types,
 * and absent code that violates type safety).
 *
 * For example, assigning to an element's .innerHTML property a string that is
 * derived (even partially) from untrusted input typically results in an XSS
 * vulnerability. The type-safe wrapper setInnerHtml consumes a
 * value of type SafeHtml, whose contract states that using its values
 * in a HTML context will not result in XSS. Hence a program that is free of
 * direct assignments to any element's innerHTML property (with the exception of
 * the assignment to .innerHTML in this file) is guaranteed to be free of XSS
 * due to assignment of untrusted strings to the innerHTML property.
 */

import * as asserts from '../asserts/asserts.js';

import dom from '../asserts/dom.js';
import * as domAsserts from './asserts.js';
import * as functions from '../functions/functions.js';
import { SafeHtml } from '../html/safehtml.js';
import { SafeScript } from '../html/safescript.js';
import { SafeStyle } from '../html/safestyle.js';
import { SafeUrl } from '../html/safeurl.js';
import { TrustedResourceUrl } from '../html/trustedresourceurl.js';
import * as uncheckedconversions from '../html/uncheckedconversions.js';
import { Const } from '../string/const.js';
import * as internal from '../string/internal.js';


/**
 * @enum {string}
 * @deprecated Use a plain string value instead.
 */
export var InsertAdjacentHtmlPosition = {
  AFTERBEGIN: 'afterbegin',
  AFTEREND: 'afterend',
  BEFOREBEGIN: 'beforebegin',
  BEFOREEND: 'beforeend'
};


/**
 * Inserts known-safe HTML into a Node, at the specified position.
 * @param {!Node} node The node on which to call insertAdjacentHTML.
 * @param {!InsertAdjacentHtmlPosition} position Position where
 *     to insert the HTML.
 * @param {!SafeHtml} html The known-safe HTML to insert.
 * @deprecated Use a `safevalues.dom.safeElement.insertAdjacentHtml` instead.
 */
export function insertAdjacentHtml(node, position, html) {
  node.insertAdjacentHTML(position, SafeHtml.unwrapTrustedHTML(html));
}


/**
 * Tags not allowed in setInnerHtml.
 * @private @const {!Object<string, boolean>}
 */
var SET_INNER_HTML_DISALLOWED_TAGS_ = {
  'MATH': true,
  'SCRIPT': true,
  'STYLE': true,
  'SVG': true,
  'TEMPLATE': true
};


/**
 * Whether assigning to innerHTML results in a non-spec-compliant clean-up. Used
 * to define unsafeSetInnerHtmlDoNotUseOrElse.
 *
 * <p>As mentioned in https://stackoverflow.com/questions/28741528, re-rendering
 * an element in IE by setting innerHTML causes IE to recursively disconnect all
 * parent/children connections that were in the previous contents of the
 * element. Unfortunately, this can unexpectedly result in confusing cases where
 * a function is run (typically asynchronously) on element that has since
 * disconnected from the DOM but assumes the presence of its children. A simple
 * workaround is to remove all children first. Testing on IE11 via
 * https://jsperf.com/innerhtml-vs-removechild/239, removeChild seems to be
 * ~10x faster than innerHTML='' for a large number of children (perhaps due
 * to the latter's recursive behavior), implying that this workaround would
 * not hurt performance and might actually improve it.
 * @return {boolean}
 * @private
 */
var isInnerHtmlCleanupRecursive_ = functions.cacheReturnValue(function() {
  // `document` missing in some test frameworks.
  if (goog.DEBUG && typeof document === 'undefined') {
    return false;
  }
  // Create 3 nested <div>s without using innerHTML.
  // We're not chaining the appendChilds in one call,  as this breaks
  // in a DocumentFragment.
  var div = document.createElement('div');
  var childDiv = document.createElement('div');
  childDiv.appendChild(document.createElement('div'));
  div.appendChild(childDiv);
  // `firstChild` is null in Google Js Test.
  if (goog.DEBUG && !div.firstChild) {
    return false;
  }
  var innerChild = div.firstChild.firstChild;
  div.innerHTML =
      SafeHtml.unwrapTrustedHTML(SafeHtml.EMPTY);
  return !innerChild.parentElement;
});


/**
 * Assigns HTML to an element's innerHTML property. Helper to use only here and
 * in soy.js.
 * @param {?Element|?ShadowRoot} elem The element whose innerHTML is to be
 *     assigned to.
 * @param {!SafeHtml} html
 */
export function unsafeSetInnerHtmlDoNotUseOrElse(elem, html) {
  /* See comment above isInnerHtmlCleanupRecursive_.*/
  if (isInnerHtmlCleanupRecursive_()) {
    while (elem.lastChild) {
      elem.removeChild(elem.lastChild);
    }
  }
  elem.innerHTML = SafeHtml.unwrapTrustedHTML(html);
}


/**
 * Assigns known-safe HTML to an element's innerHTML property.
 * @param {!Element|!ShadowRoot} elem The element whose innerHTML is to be
 *     assigned to.
 * @param {!SafeHtml} html The known-safe HTML to assign.
 * @throws {Error} If called with one of these tags: math, script, style, svg,
 *     template.
 * @deprecated Use `safevalues.dom.safeElement.setInnerHtml` instead.
 */
export function setInnerHtml(elem, html) {
  if (asserts.ENABLE_ASSERTS && /** @type {?} */ (elem).tagName) {
    var tagName = /** @type {!Element} */ (elem).tagName.toUpperCase();
    if (SET_INNER_HTML_DISALLOWED_TAGS_[tagName]) {
      throw new Error(
          'goog.dom.safe.setInnerHtml cannot be used to set content of ' +
          /** @type {!Element} */ (elem).tagName + '.');
    }
  }

  unsafeSetInnerHtmlDoNotUseOrElse(elem, html);
}


/**
 * Assigns constant HTML to an element's innerHTML property.
 * @param {!Element} element The element whose innerHTML is to be assigned to.
 * @param {!Const} constHtml The known-safe HTML to assign.
 * @throws {!Error} If called with one of these tags: math, script, style, svg,
 *     template.
 */
export function setInnerHtmlFromConstant(element, constHtml) {
  setInnerHtml(
      element,
      uncheckedconversions
          .safeHtmlFromStringKnownToSatisfyTypeContract(
              Const.from('Constant HTML to be immediatelly used.'),
              Const.unwrap(constHtml)));
}


/**
 * Assigns known-safe HTML to an element's outerHTML property.
 * @param {!Element} elem The element whose outerHTML is to be assigned to.
 * @param {!SafeHtml} html The known-safe HTML to assign.
 * @deprecated Use `safevalues.dom.safeElement.setOuterHtml` instead.
 */
export function setOuterHtml(elem, html) {
  elem.outerHTML = SafeHtml.unwrapTrustedHTML(html);
}


/**
 * Safely assigns a URL a form element's action property.
 *
 * If url is of type SafeUrl, its value is unwrapped and assigned to
 * form's action property.  If url is of type string however, it is first
 * sanitized using SafeUrl.sanitize.
 *
 * Example usage:
 *   setFormElementAction(formEl, url);
 * which is a safe alternative to
 *   formEl.action = url;
 * The latter can result in XSS vulnerabilities if url is a
 * user-/attacker-controlled value.
 *
 * @param {!Element} form The form element whose action property
 *     is to be assigned to.
 * @param {string|!SafeUrl} url The URL to assign.
 * @return {void}
 * @see SafeUrl#sanitize
 * @deprecated Use `safevalues.dom.safeFormEl.setAction` instead.
 */
export function setFormElementAction(form, url) {
  /** @type {!SafeUrl} */
  var safeUrl;
  if (url instanceof SafeUrl) {
    safeUrl = url;
  } else {
    safeUrl = SafeUrl.sanitizeJavascriptUrlAssertUnchanged(url);
  }
  dom.assertIsHtmlFormElement(form).action =
      SafeUrl.unwrap(safeUrl);
}

/**
 * Safely assigns a URL to a button element's formaction property.
 *
 * If url is of type SafeUrl, its value is unwrapped and assigned to
 * button's formaction property.  If url is of type string however, it is first
 * sanitized using SafeUrl.sanitize.
 *
 * Example usage:
 *   setButtonFormAction(buttonEl, url);
 * which is a safe alternative to
 *   buttonEl.action = url;
 * The latter can result in XSS vulnerabilities if url is a
 * user-/attacker-controlled value.
 *
 * @param {!Element} button The button element whose action property
 *     is to be assigned to.
 * @param {string|!SafeUrl} url The URL to assign.
 * @return {void}
 * @see SafeUrl#sanitize
 * @deprecated Use `safevalues.dom.safeButtonEl.setFormaction` instead.
 */
export function setButtonFormAction(button, url) {
  /** @type {!SafeUrl} */
  var safeUrl;
  if (url instanceof SafeUrl) {
    safeUrl = url;
  } else {
    safeUrl = SafeUrl.sanitizeJavascriptUrlAssertUnchanged(url);
  }
  dom.assertIsHtmlButtonElement(button).formAction =
      SafeUrl.unwrap(safeUrl);
}
/**
 * Safely assigns a URL to an input element's formaction property.
 *
 * If url is of type SafeUrl, its value is unwrapped and assigned to
 * input's formaction property.  If url is of type string however, it is first
 * sanitized using SafeUrl.sanitize.
 *
 * Example usage:
 *   setInputFormAction(inputEl, url);
 * which is a safe alternative to
 *   inputEl.action = url;
 * The latter can result in XSS vulnerabilities if url is a
 * user-/attacker-controlled value.
 *
 * @param {!Element} input The input element whose action property
 *     is to be assigned to.
 * @param {string|!SafeUrl} url The URL to assign.
 * @return {void}
 * @see SafeUrl#sanitize
 * @deprecated Use `safevalues.dom.safeInputEl.setFormaction` instead.
 */
export function setInputFormAction(input, url) {
  /** @type {!SafeUrl} */
  var safeUrl;
  if (url instanceof SafeUrl) {
    safeUrl = url;
  } else {
    safeUrl = SafeUrl.sanitizeJavascriptUrlAssertUnchanged(url);
  }
  dom.assertIsHtmlInputElement(input).formAction =
      SafeUrl.unwrap(safeUrl);
}

/**
 * Sets the given element's style property to the contents of the provided
 * SafeStyle object.
 * @param {!Element} elem
 * @param {!SafeStyle} style
 * @return {void}
 */
export function setStyle(elem, style) {
  elem.style.cssText = SafeStyle.unwrap(style);
}


/**
 * Writes known-safe HTML to a document.
 * @param {!Document} doc The document to be written to.
 * @param {!SafeHtml} html The known-safe HTML to assign.
 * @return {void}
 * @deprecated Use `safevalues.dom.safeDocument.write` instead.
 */
export function documentWrite(doc, html) {
  doc.write(SafeHtml.unwrapTrustedHTML(html));
}


/**
 * Safely assigns a URL to an anchor element's href property.
 *
 * If url is of type SafeUrl, its value is unwrapped and assigned to
 * anchor's href property.  If url is of type string however, it is first
 * sanitized using SafeUrl.sanitize.
 *
 * Example usage:
 *   setAnchorHref(anchorEl, url);
 * which is a safe alternative to
 *   anchorEl.href = url;
 * The latter can result in XSS vulnerabilities if url is a
 * user-/attacker-controlled value.
 *
 * @param {!HTMLAnchorElement} anchor The anchor element whose href property
 *     is to be assigned to.
 * @param {string|!SafeUrl} url The URL to assign.
 * @return {void}
 * @see SafeUrl#sanitize
 * @deprecated Use `safevalues.dom.safeAnchorEl.setHref` instead.
 */
export function setAnchorHref(anchor, url) {
  dom.assertIsHtmlAnchorElement(anchor);
  /** @type {!SafeUrl} */
  var safeUrl;
  if (url instanceof SafeUrl) {
    safeUrl = url;
  } else {
    safeUrl = SafeUrl.sanitizeJavascriptUrlAssertUnchanged(url);
  }
  anchor.href = SafeUrl.unwrap(safeUrl);
}


/**
 * Safely assigns a URL to a audio element's src property.
 *
 * If url is of type SafeUrl, its value is unwrapped and assigned to
 * audio's src property.  If url is of type string however, it is first
 * sanitized using SafeUrl.sanitize.
 *
 * @param {!HTMLAudioElement} audioElement The audio element whose src property
 *     is to be assigned to.
 * @param {string|!SafeUrl} url The URL to assign.
 * @return {void}
 * @see SafeUrl#sanitize
 * @deprecated Use a plain property assignement `myAudioEl.src = x` instead.
 */
export function setAudioSrc(audioElement, url) {
  dom.assertIsHtmlAudioElement(audioElement);
  /** @type {!SafeUrl} */
  var safeUrl;
  if (url instanceof SafeUrl) {
    safeUrl = url;
  } else {
    safeUrl = SafeUrl.sanitizeJavascriptUrlAssertUnchanged(url);
  }
  audioElement.src = SafeUrl.unwrap(safeUrl);
}

/**
 * Safely assigns a URL to a video element's src property.
 *
 * If url is of type SafeUrl, its value is unwrapped and assigned to
 * video's src property.  If url is of type string however, it is first
 * sanitized using SafeUrl.sanitize.
 *
 * @param {!HTMLVideoElement} videoElement The video element whose src property
 *     is to be assigned to.
 * @param {string|!SafeUrl} url The URL to assign.
 * @return {void}
 * @see SafeUrl#sanitize
 * @deprecated Use a plain property assignement `myAudioEl.src = x` instead.
 */
export function setVideoSrc(videoElement, url) {
  dom.assertIsHtmlVideoElement(videoElement);
  /** @type {!SafeUrl} */
  var safeUrl;
  if (url instanceof SafeUrl) {
    safeUrl = url;
  } else {
    safeUrl = SafeUrl.sanitizeJavascriptUrlAssertUnchanged(url);
  }
  videoElement.src = SafeUrl.unwrap(safeUrl);
}

/**
 * Safely assigns a URL to an embed element's src property.
 *
 * Example usage:
 *   setEmbedSrc(embedEl, url);
 * which is a safe alternative to
 *   embedEl.src = url;
 * The latter can result in loading untrusted code unless it is ensured that
 * the URL refers to a trustworthy resource.
 *
 * @param {!HTMLEmbedElement} embed The embed element whose src property
 *     is to be assigned to.
 * @param {!TrustedResourceUrl} url The URL to assign.
 * @deprecated Use `safevalues.dom.safeEmbedEl.setSrc` instead.
 */
export function setEmbedSrc(embed, url) {
  dom.assertIsHtmlEmbedElement(embed);
  embed.src = TrustedResourceUrl.unwrapTrustedScriptURL(url);
}


/**
 * Safely assigns a URL to a frame element's src property.
 *
 * Example usage:
 *   setFrameSrc(frameEl, url);
 * which is a safe alternative to
 *   frameEl.src = url;
 * The latter can result in loading untrusted code unless it is ensured that
 * the URL refers to a trustworthy resource.
 * @deprecated Use safevalues.dom.safeIframeEl.setSrc instead.
 * @param {!HTMLFrameElement} frame The frame element whose src property
 *     is to be assigned to.
 * @param {!TrustedResourceUrl} url The URL to assign.
 * @return {void}
 */
export function setFrameSrc(frame, url) {
  dom.assertIsHtmlFrameElement(frame);
  frame.src = TrustedResourceUrl.unwrap(url);
}


/**
 * Safely assigns a URL to an iframe element's src property.
 *
 * Example usage:
 *   setIframeSrc(iframeEl, url);
 * which is a safe alternative to
 *   iframeEl.src = url;
 * The latter can result in loading untrusted code unless it is ensured that
 * the URL refers to a trustworthy resource.
 *
 * @param {!HTMLIFrameElement} iframe The iframe element whose src property
 *     is to be assigned to.
 * @param {!TrustedResourceUrl} url The URL to assign.
 * @return {void}
 * @deprecated Use `safevalues.dom.safeIframeEl.setSrc` instead.
 */
export function setIframeSrc(iframe, url) {
  dom.assertIsHtmlIFrameElement(iframe);
  iframe.src = TrustedResourceUrl.unwrap(url);
}


/**
 * Safely assigns HTML to an iframe element's srcdoc property.
 *
 * Example usage:
 *   setIframeSrcdoc(iframeEl, safeHtml);
 * which is a safe alternative to
 *   iframeEl.srcdoc = html;
 * The latter can result in loading untrusted code.
 *
 * @param {!HTMLIFrameElement} iframe The iframe element whose srcdoc property
 *     is to be assigned to.
 * @param {!SafeHtml} html The HTML to assign.
 * @return {void}
 * @deprecated Use `safevalues.dom.safeIframeEl.setSrcdoc` instead.
 */
export function setIframeSrcdoc(iframe, html) {
  dom.assertIsHtmlIFrameElement(iframe);
  iframe.srcdoc = SafeHtml.unwrapTrustedHTML(html);
}


/**
 * Safely sets a link element's href and rel properties. Whether or not
 * the URL assigned to href has to be a TrustedResourceUrl
 * depends on the value of the rel property. If rel contains "stylesheet"
 * then a TrustedResourceUrl is required.
 *
 * Example usage:
 *   setLinkHrefAndRel(linkEl, url, 'stylesheet');
 * which is a safe alternative to
 *   linkEl.rel = 'stylesheet';
 *   linkEl.href = url;
 * The latter can result in loading untrusted code unless it is ensured that
 * the URL refers to a trustworthy resource.
 *
 * @param {!HTMLLinkElement} link The link element whose href property
 *     is to be assigned to.
 * @param {string|!SafeUrl|!TrustedResourceUrl} url The URL
 *     to assign to the href property. Must be a TrustedResourceUrl if the
 *     value assigned to rel contains "stylesheet". A string value is
 *     sanitized with SafeUrl.sanitize.
 * @param {string} rel The value to assign to the rel property.
 * @return {void}
 * @throws {Error} if rel contains "stylesheet" and url is not a
 *     TrustedResourceUrl
 * @see SafeUrl#sanitize
 * @deprecated Use `safevalues.dom.safeLinkEl.setHrefAndRel` instead.
 */
export function setLinkHrefAndRel(link, url, rel) {
  dom.assertIsHtmlLinkElement(link);
  link.rel = rel;
  if (internal.caseInsensitiveContains(rel, 'stylesheet')) {
    asserts.assert(
        url instanceof TrustedResourceUrl,
        'URL must be TrustedResourceUrl because "rel" contains "stylesheet"');
    link.href = TrustedResourceUrl.unwrap(url);
    const win = link.ownerDocument && link.ownerDocument.defaultView;
    const nonce = getStyleNonce(win);
    if (nonce) {
      link.setAttribute('nonce', nonce);
    }
  } else if (url instanceof TrustedResourceUrl) {
    link.href = TrustedResourceUrl.unwrap(url);
  } else if (url instanceof SafeUrl) {
    link.href = SafeUrl.unwrap(url);
  } else {  // string
    // SafeUrl.sanitize must return legitimate SafeUrl when passed a string.
    link.href = SafeUrl.unwrap(
        SafeUrl.sanitizeJavascriptUrlAssertUnchanged(url));
  }
}


/**
 * Safely assigns a URL to an object element's data property.
 *
 * Example usage:
 *   setObjectData(objectEl, url);
 * which is a safe alternative to
 *   objectEl.data = url;
 * The latter can result in loading untrusted code unless setit is ensured that
 * the URL refers to a trustworthy resource.
 * @deprecated
 *
 * @param {!HTMLObjectElement} object The object element whose data property
 *     is to be assigned to.
 * @param {!TrustedResourceUrl} url The URL to assign.
 * @return {void}
 */
export function setObjectData(object, url) {
  dom.assertIsHtmlObjectElement(object);
  object.data = TrustedResourceUrl.unwrapTrustedScriptURL(url);
}


/**
 * Safely assigns a URL to a script element's src property.
 *
 * Example usage:
 *   setScriptSrc(scriptEl, url);
 * which is a safe alternative to
 *   scriptEl.src = url;
 * The latter can result in loading untrusted code unless it is ensured that
 * the URL refers to a trustworthy resource.
 *
 * @param {!HTMLScriptElement} script The script element whose src property
 *     is to be assigned to.
 * @param {!TrustedResourceUrl} url The URL to assign.
 * @return {void}
 * @deprecated Use `safevalues.dom.safeScriptEl.setSrc` instead.
 */
export function setScriptSrc(script, url) {
  dom.assertIsHtmlScriptElement(script);
  setNonceForScriptElement_(script);
  script.src = TrustedResourceUrl.unwrapTrustedScriptURL(url);
}


/**
 * Safely assigns a value to a script element's content.
 *
 * Example usage:
 *   setScriptContent(scriptEl, content);
 * which is a safe alternative to
 *   scriptEl.text = content;
 * The latter can result in executing untrusted code unless it is ensured that
 * the code is loaded from a trustworthy resource.
 *
 * @param {!HTMLScriptElement} script The script element whose content is being
 *     set.
 * @param {!SafeScript} content The content to assign.
 * @return {void}
 * @deprecated Use `safevalues.dom.safeScriptEl.setTextContent` instead.
 */
export function setScriptContent(script, content) {
  dom.assertIsHtmlScriptElement(script);
  setNonceForScriptElement_(script);
  script.textContent = SafeScript.unwrapTrustedScript(content);
}


/**
 * Set nonce-based CSPs to dynamically created scripts.
 * @param {!HTMLScriptElement} script The script element whose nonce value
 *     is to be calculated
 * @private
 */
function setNonceForScriptElement_(script) {
  var win = script.ownerDocument && script.ownerDocument.defaultView;
  const nonce = getScriptNonce(win);
  if (nonce) {
    script.setAttribute('nonce', nonce);
  }
}


/**
 * Safely assigns a URL to a Location object's href property.
 *
 * If url is of type SafeUrl, its value is unwrapped and assigned to
 * loc's href property.  If url is of type string however, it is first sanitized
 * using SafeUrl.sanitize.
 *
 * Example usage:
 *   setLocationHref(document.location, redirectUrl);
 * which is a safe alternative to
 *   document.location.href = redirectUrl;
 * The latter can result in XSS vulnerabilities if redirectUrl is a
 * user-/attacker-controlled value.
 *
 * @param {!Location} loc The Location object whose href property is to be
 *     assigned to.
 * @param {string|!SafeUrl} url The URL to assign.
 * @return {void}
 * @see SafeUrl#sanitize
 * @deprecated Use `safevalues.dom.safeLocation.setHref` instead.

 */
export function setLocationHref(loc, url) {
  domAsserts.assertIsLocation(loc);
  /** @type {!SafeUrl} */
  var safeUrl;
  if (url instanceof SafeUrl) {
    safeUrl = url;
  } else {
    safeUrl = SafeUrl.sanitizeJavascriptUrlAssertUnchanged(url);
  }
  loc.href = SafeUrl.unwrap(safeUrl);
}

/**
 * Safely assigns the URL of a Location object.
 *
 * If url is of type SafeUrl, its value is unwrapped and
 * passed to Location#assign. If url is of type string however, it is
 * first sanitized using SafeUrl.sanitize.
 *
 * Example usage:
 *   assignLocation(document.location, newUrl);
 * which is a safe alternative to
 *   document.location.assign(newUrl);
 * The latter can result in XSS vulnerabilities if newUrl is a
 * user-/attacker-controlled value.
 *
 * This has the same behaviour as setLocationHref, however some test
 * mock Location.assign instead of a property assignment.
 *
 * @param {!Location} loc The Location object which is to be assigned.
 * @param {string|!SafeUrl} url The URL to assign.
 * @return {void}
 * @see SafeUrl#sanitize
 * @deprecated Use `safevalues.dom.safeLocation.assign` instead.
 */
export function assignLocation(loc, url) {
  domAsserts.assertIsLocation(loc);
  /** @type {!SafeUrl} */
  var safeUrl;
  if (url instanceof SafeUrl) {
    safeUrl = url;
  } else {
    safeUrl = SafeUrl.sanitizeJavascriptUrlAssertUnchanged(url);
  }
  loc.assign(SafeUrl.unwrap(safeUrl));
}


/**
 * Safely replaces the URL of a Location object.
 *
 * If url is of type SafeUrl, its value is unwrapped and
 * passed to Location#replace. If url is of type string however, it is
 * first sanitized using SafeUrl.sanitize.
 *
 * Example usage:
 *   replaceLocation(document.location, newUrl);
 * which is a safe alternative to
 *   document.location.replace(newUrl);
 * The latter can result in XSS vulnerabilities if newUrl is a
 * user-/attacker-controlled value.
 *
 * @param {!Location} loc The Location object which is to be replaced.
 * @param {string|!SafeUrl} url The URL to assign.
 * @return {void}
 * @see SafeUrl#sanitize
 * @deprecated Use `safevalues.dom.safeLocation.replace` instead.
 */
export function replaceLocation(loc, url) {
  /** @type {!SafeUrl} */
  var safeUrl;
  if (url instanceof SafeUrl) {
    safeUrl = url;
  } else {
    safeUrl = SafeUrl.sanitizeJavascriptUrlAssertUnchanged(url);
  }
  loc.replace(SafeUrl.unwrap(safeUrl));
}


/**
 * Safely opens a URL in a new window (via window.open).
 *
 * If url is of type SafeUrl, its value is unwrapped and passed in to
 * window.open.  If url is of type string however, it is first sanitized
 * using SafeUrl.sanitize.
 *
 * Note that this function does not prevent leakages via the referer that is
 * sent by window.open. It is advised to only use this to open 1st party URLs.
 *
 * Example usage:
 *   openInWindow(url);
 * which is a safe alternative to
 *   window.open(url);
 * The latter can result in XSS vulnerabilities if url is a
 * user-/attacker-controlled value.
 *
 * @param {string|!SafeUrl} url The URL to open.
 * @param {Window=} opt_openerWin Window of which to call the .open() method.
 *     Defaults to the global window.
 * @param {!Const|string=} opt_name Name of the window to open in.
 *     Can be _top, etc as allowed by window.open(). This accepts string for
 *     legacy reasons. Pass Const if possible.
 * @param {string=} opt_specs Comma-separated list of specifications, same as
 *     in window.open().
 * @return {Window} Window the url was opened in.
 * @deprecated Use `safevalues.dom.safeWindow.open` instead.
 */
export function openInWindow(url, opt_openerWin, opt_name, opt_specs) {
  /** @type {!SafeUrl} */
  var safeUrl;
  if (url instanceof SafeUrl) {
    safeUrl = url;
  } else {
    safeUrl = SafeUrl.sanitizeJavascriptUrlAssertUnchanged(url);
  }
  var win = opt_openerWin || goog.global;
  // If opt_name is undefined, simply passing that in to open() causes IE to
  // reuse the current window instead of opening a new one. Thus we pass '' in
  // instead, which according to spec opens a new window. See
  // https://html.spec.whatwg.org/multipage/browsers.html#dom-open .
  var name = opt_name instanceof Const ?
      Const.unwrap(opt_name) :
      opt_name || '';
  // Do not pass opt_specs to window.open unless it was provided by the caller.
  // IE11 will use it as a signal to open a new window rather than a new tab
  // (even if it is undefined).
  if (opt_specs !== undefined) {
    return win.open(SafeUrl.unwrap(safeUrl), name, opt_specs);
  } else {
    return win.open(SafeUrl.unwrap(safeUrl), name);
  }
}


/**
 * Parses the HTML as 'text/html'.
 * @param {!DOMParser} parser
 * @param {!SafeHtml} html The HTML to be parsed.
 * @return {!Document}
 * @deprecated Use `safevalues.dom.safeDomParser.parseHtml` instead.
 */
export function parseFromStringHtml(parser, html) {
  return parseFromString(parser, html, 'text/html');
}


/**
 * Parses the string.
 * @param {!DOMParser} parser
 * @param {!SafeHtml} content Note: We don't have a special type for
 *     XML or SVG supported by this function so we use SafeHtml.
 * @param {string} type
 * @return {!Document}
 * @deprecated Use `safevalues.dom.safeDomParser.parseFromString` instead.
 */
export function parseFromString(parser, content, type) {
  return parser.parseFromString(
      SafeHtml.unwrapTrustedHTML(content), type);
}


/**
 * Safely creates an HTMLImageElement from a Blob.
 *
 * Example usage:
 *     createImageFromBlob(blob);
 * which is a safe alternative to
 *     image.src = createObjectUrl(blob)
 * The latter can result in executing malicious same-origin scripts from a bad
 * Blob.
 * @param {!Blob} blob The blob to create the image from.
 * @return {!HTMLImageElement} The image element created from the blob.
 * @throws {!Error} If called with a Blob with a MIME type other than image/.*.
 * @deprecated Use `safevalues.objectUrlFromSafeSource` and assign it to the
 *     img.src.
 */
export function createImageFromBlob(blob) {
  // Any image/* MIME type is accepted as safe.
  if (!/^image\/.*/g.test(blob.type)) {
    throw new Error(
        'goog.dom.safe.createImageFromBlob only accepts MIME type image/.*.');
  }
  var objectUrl = goog.global.URL.createObjectURL(blob);
  var image = new goog.global.Image();
  image.onload = function() {
    goog.global.URL.revokeObjectURL(objectUrl);
  };
  image.src = objectUrl;
  return image;
}

/**
 * Creates a DocumentFragment by parsing html in the context of a Range.
 * @param {!Range} range The Range object starting from the context node to
 * create a fragment in.
 * @param {!SafeHtml} html HTML to create a fragment from.
 * @return {?DocumentFragment}
 * @deprecated Use `safevalues.dom.safeRange.createContextualFragment` instead.
 */
export function createContextualFragment(range, html) {
  return range.createContextualFragment(
      SafeHtml.unwrapTrustedHTML(html));
}

/**
 * Returns CSP script nonce, if set for any <script> tag.
 * @param {?Window=} opt_window The window context used to retrieve the nonce.
 *     Defaults to global context.
 * @return {string} CSP nonce or empty string if no nonce is present.
 * @deprecated Use `safevalues.dom.safeScriptEl.setSrc` or
 *     `safevalues.dom.safeScriptEl.setTextContent` which automatically set the
 *     script nonce.
 */
export function getScriptNonce(opt_window) {
  return getNonce_('script[nonce]', opt_window);
}

/**
 * Returns CSP style nonce, if set for any <style> or <link rel="stylesheet">
 * tag.
 * @param {?Window=} opt_window The window context used to retrieve the nonce.
 *     Defaults to global context.
 * @return {string} CSP nonce or empty string if no nonce is present.
 * @deprecated
 */
export function getStyleNonce(opt_window) {
  return getNonce_(
      'style[nonce],link[rel="stylesheet"][nonce]', opt_window);
}

/**
 * According to the CSP3 spec a nonce must be a valid base64 string.
 * @see https://www.w3.org/TR/CSP3/#grammardef-base64-value
 * @private @const
 */
var NONCE_PATTERN_ = /^[\w+/_-]+[=]{0,2}$/;

/**
 * Returns CSP nonce, if set for any tag of given type.
 * @param {string} selector Selector for locating the element with nonce.
 * @param {?Window=} win The window context used to retrieve the nonce.
 * @return {string} CSP nonce or empty string if no nonce is present.
 * @private
 */
function getNonce_(selector, win) {
  const doc = (win || goog.global).document;
  if (!doc.querySelector) {
    return '';
  }
  let el = doc.querySelector(selector);
  if (el) {
    // Try to get the nonce from the IDL property first, because browsers that
    // implement additional nonce protection features (currently only Chrome) to
    // prevent nonce stealing via CSS do not expose the nonce via attributes.
    // See https://github.com/whatwg/html/issues/2369
    const nonce = el['nonce'] || el.getAttribute('nonce');
    if (nonce && NONCE_PATTERN_.test(nonce)) {
      return nonce;
    }
  }
  return '';
}
