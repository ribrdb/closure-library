/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */


/**
 * @fileoverview Contains the tag blacklist for use in the Html sanitizer.
 */

TagBlacklist = {
  'APPLET': true,
  'AUDIO': true,
  'BASE': true,
  'BGSOUND': true,
  'EMBED': true,
  // Blacklisted by default, can be allowed using allowFormTag.
  'FORM': true,
  // NOTE: can remove this for old browser behavior
  'IFRAME': true,
  // Can result in network requests
  'ISINDEX': true,
  // Unused and just unnecessarily increase attack surface
  'KEYGEN': true,
  'LAYER': true,
  'LINK': true,
  'META': true,
  'OBJECT': true,
  'SCRIPT': true,
  // Can result in an XSS in FF
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1205631
  'SVG': true,
  // Blacklisted by default, can be allowed using allowStyleTag.
  'STYLE': true,
  // Unsafe in most cases, and sanitizing its contents is not supported by the
  // underlying SafeDomTreeProcessor.
  'TEMPLATE': true,
  'VIDEO': true
};
export var TagBlacklist;
