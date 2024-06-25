/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Class to encapsulate an editable field that blends into the
 * style of the page and never uses an iframe.  The field's height can be
 * controlled by CSS styles like min-height, max-height, and overflow.  This is
 * a Field, but overrides everything iframe related to use
 * contentEditable divs.  This is essentially a much lighter alternative to
 * goog.editor.SeamlessField, but only works in Firefox 3+, and only works
 * *well* in Firefox 12+ due to
 * https://bugzilla.mozilla.org/show_bug.cgi?id=669026.
 */


import * as asserts from '../asserts/asserts.js';

import { Field } from './field.js';
import * as log from '../log/log.js';



/**
 * This class encapsulates an editable field that is just a contentEditable
 * div.
 *
 * To see events fired by this object, please see the base class.
 *
 * @param {string} id An identifer for the field. This is used to find the
 *     field and the element associated with this field.
 * @param {Document=} opt_doc The document that the element with the given
 *     id can be found in.
 * @constructor
 * @extends {Field}
 */
export function ContentEditableField(id, opt_doc) {
 Field.call(this, id, opt_doc);
}
goog.inherits(ContentEditableField, Field);


/**
 * @override
 */
ContentEditableField.prototype.logger =
    log.getLogger('goog.editor.ContentEditableField');


/** @override */
ContentEditableField.prototype.usesIframe = function() {
 // Never uses an iframe in any browser.
 return false;
};


// Overridden to improve dead code elimination only.
/** @override */
ContentEditableField.prototype.turnOnDesignModeGecko =
    function() {};


/** @override */
ContentEditableField.prototype.installStyles = function() {
 asserts.assert(
     !this.cssStyles.getTypedStringValue(),
     'ContentEditableField does not support CSS styles; instead just write ' +
         'plain old CSS on the main page.');
};


/** @override */
ContentEditableField.prototype.makeEditableInternal = function(
    opt_iframeSrc) {
 var field = this.getOriginalElement();
 if (field) {
   this.setupFieldObject(field);
   // TODO(gboyer): Allow clients/plugins to override with 'plaintext-only'
   // for WebKit.
   field.contentEditable = true;

   this.injectContents(field.innerHTML, field);

   this.handleFieldLoad();
 }
};


/**
 * @override
 *
 * ContentEditableField does not make any changes to the DOM when it is made
 * editable other than setting contentEditable to true.
 */
ContentEditableField.prototype.restoreDom = function() {};
