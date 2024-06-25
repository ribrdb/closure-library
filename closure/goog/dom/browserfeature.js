/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Browser capability checks for the dom package.
 */


import * as userAgent from '../useragent/useragent.js';


/**
 * @define {boolean} Whether we know at compile time that the browser doesn't
 * support OffscreenCanvas.
 */
export var ASSUME_NO_OFFSCREEN_CANVAS = goog.define('goog.dom.ASSUME_NO_OFFSCREEN_CANVAS', false);

/**
 * @define {boolean} Whether we know at compile time that the browser supports
 * all OffscreenCanvas contexts.
 */
// TODO(user): Eventually this should default to "FEATURESET_YEAR >= 202X".
export var ASSUME_OFFSCREEN_CANVAS = goog.define('goog.dom.ASSUME_OFFSCREEN_CANVAS', false);

/**
 * Detects if a particular OffscreenCanvas context is supported.
 * @param {string} contextName name of the context to test.
 * @return {boolean} Whether the browser supports this OffscreenCanvas context.
 * @private
 */
function detectOffscreenCanvas_(contextName) {
 // This code only gets removed because we forced @nosideeffects on
 // the functions. See: b/138802376
 try {
   return Boolean(new self.OffscreenCanvas(0, 0).getContext(contextName));
 } catch (ex) {
 }
 return false;
}

/**
 * Whether the browser supports OffscreenCanvas 2D context.
 * @const {boolean}
 */
export var OFFSCREEN_CANVAS_2D = !ASSUME_NO_OFFSCREEN_CANVAS &&
(ASSUME_OFFSCREEN_CANVAS ||
 detectOffscreenCanvas_('2d'));

/**
 * Whether attributes 'name' and 'type' can be added to an element after it's
 * created. False in Internet Explorer prior to version 9.
 * @const {boolean}
 */
export var CAN_ADD_NAME_OR_TYPE_ATTRIBUTES = true;

/**
 * Whether we can use element.children to access an element's Element
 * children. Available since Gecko 1.9.1, IE 9. (IE<9 also includes comment
 * nodes in the collection.)
 * @const {boolean}
 */
export var CAN_USE_CHILDREN_ATTRIBUTE = true;

/**
 * Opera, Safari 3, and Internet Explorer 9 all support innerText but they
 * include text nodes in script and style tags. Not document-mode-dependent.
 * @const {boolean}
 */
export var CAN_USE_INNER_TEXT = false;

/**
 * MSIE, Opera, and Safari>=4 support element.parentElement to access an
 * element's parent if it is an Element.
 * @const {boolean}
 */
export var CAN_USE_PARENT_ELEMENT_PROPERTY = userAgent.IE || userAgent.WEBKIT;

/**
 * Whether NoScope elements need a scoped element written before them in
 * innerHTML.
 * MSDN: http://msdn.microsoft.com/en-us/library/ms533897(VS.85).aspx#1
 * @const {boolean}
 */
export var INNER_HTML_NEEDS_SCOPED_ELEMENT = userAgent.IE;
