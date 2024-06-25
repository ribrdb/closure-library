/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utility methods to deal with CSS3 transitions
 * programmatically.
 */

import * as asserts from '../asserts/asserts.js';

import * as dom from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import * as safe from '../dom/safe.js';
import * as vendor from '../dom/vendor.js';
import * as functions from '../functions/functions.js';
import { SafeHtml } from '../html/safehtml.js';
import * as googStyle from './style.js';
import * as userAgent from '../useragent/useragent.js';


/**
 * A typedef to represent a CSS3 transition property. Duration and delay
 * are both in seconds. Timing is CSS3 timing function string, such as
 * 'easein', 'linear'.
 *
 * Alternatively, specifying string in the form of '[property] [duration]
 * [timing] [delay]' as specified in CSS3 transition is fine too.
 *
 * @typedef { {
 *   property: string,
 *   duration: number,
 *   timing: string,
 *   delay: number
 * } | string }
 */
export var Css3Property;


/**
 * Sets the element CSS3 transition to properties.
 * @param {Element} element The element to set transition on.
 * @param {Css3Property|
 *     Array<Css3Property>} properties A single CSS3
 *     transition property or array of properties.
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
export function set(element, properties) {
  if (!Array.isArray(properties)) {
    properties = [properties];
  }
  asserts.assert(
      properties.length > 0, 'At least one Css3Property should be specified.');

  var values = properties.map(function(p) {
    if (typeof p === 'string') {
      return p;
    } else {
      asserts.assertObject(p, 'Expected css3 property to be an object.');
      var propString =
          p.property + ' ' + p.duration + 's ' + p.timing + ' ' + p.delay + 's';
      asserts.assert(
          p.property && typeof p.duration === 'number' && p.timing &&
              typeof p.delay === 'number',
          'Unexpected css3 property value: %s', propString);
      return propString;
    }
  });
  setPropertyValue_(element, values.join(','));
}


/**
 * Removes any programmatically-added CSS3 transition in the given element.
 * @param {Element} element The element to remove transition from.
 */
export function removeAll(element) {
  setPropertyValue_(element, '');
}


/**
 * @return {boolean} Whether CSS3 transition is supported.
 */
export var isSupported = functions.cacheReturnValue(function() {
  // Since IE would allow any attribute, we need to explicitly check the
  // browser version here instead.
  if (userAgent.IE) {
    return true;
  }

  // We create a test element with style=-vendor-transition
  // We then detect whether those style properties are recognized and
  // available from js.
  var el = dom.createElement(TagName.DIV);
  var transition = 'opacity 1s linear';
  var vendorPrefix = vendor.getVendorPrefix();
  var style = {'transition': transition};
  if (vendorPrefix) {
    style[vendorPrefix + '-transition'] = transition;
  }
  safe.setInnerHtml(
      el, SafeHtml.create('div', {'style': style}));

  var testElement = /** @type {Element} */ (el.firstChild);
  asserts.assert(testElement.nodeType == Node.ELEMENT_NODE);

  return googStyle.getStyle(testElement, 'transition') != '';
});


/**
 * Sets CSS3 transition property value to the given value.
 * @param {Element} element The element to set transition on.
 * @param {string} transitionValue The CSS3 transition property value.
 * @private
 */
function setPropertyValue_(element, transitionValue) {
  googStyle.setStyle(element, 'transition', transitionValue);
}
