import * as dom from './dom.js';
import { AbstractSavedCaretRange } from './savedrange.js';
import { TagName } from './tagname.js';
import * as googString from '../string/string.js';
import { TextRange } from './textrange.js';
/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview An API for saving and restoring ranges as HTML carets.
 */


goog.declareModuleId('goog.dom.savedcaretrange');

const {AbstractRange} = goog.requireType('goog.dom.abstractrange');


/**
 * A struct for holding context about saved selections.
 * This can be used to preserve the selection and restore while the DOM is
 * manipulated, or through an asynchronous call. Use dom.Range factory
 * methods to obtain an {@see dom.AbstractRange} instance, and use
 * {@see AbstractRange#saveUsingCarets} to obtain a SavedCaretRange.
 * For editor ranges under content-editable elements or design-mode iframes,
 * prefer using {@see goog.editor.range.saveUsingNormalizedCarets}.
 * @param {AbstractRange} range The range being saved.
 * @constructor
 * @extends {AbstractSavedCaretRange}
 */
export function SavedCaretRange(range) {
 AbstractSavedCaretRange.call(this);

 /**
  * The DOM id of the caret at the start of the range.
  * @type {string}
  * @private
  */
 this.startCaretId_ = googString.createUniqueString();

 /**
  * The DOM id of the caret at the end of the range.
  * @type {string}
  * @private
  */
 this.endCaretId_ = googString.createUniqueString();

 /**
  * Whether the range is reversed (anchor at the end).
  * @private {boolean}
  */
 this.reversed_ = range.isReversed();

 /**
   * A DOM helper for storing the current document context.
   * @type {dom.DomHelper}
   * @private
   */
 this.dom_ = dom.getDomHelper(range.getDocument());

 range.surroundWithNodes(this.createCaret_(true), this.createCaret_(false));
}
goog.inherits(SavedCaretRange, AbstractSavedCaretRange);


/**
 * Gets the range that this SavedCaretRage represents, without selecting it
 * or removing the carets from the DOM.
 * @return {AbstractRange?} An abstract range.
 * @override
 */
SavedCaretRange.prototype.toAbstractRange = function() {
 var range = null;
 var startCaret = this.getCaret(true);
 var endCaret = this.getCaret(false);
 if (startCaret && endCaret) {
  range = TextRange.createFromNodes(startCaret, 0, endCaret, 0);
 }
 return range;
};


/**
 * Gets carets.
 * @param {boolean} start If true, returns the start caret. Otherwise, get the
 *     end caret.
 * @return {Element} The start or end caret in the given document.
 * @override
 */
SavedCaretRange.prototype.getCaret = function(start) {
 return this.dom_.getElement(start ? this.startCaretId_ : this.endCaretId_);
};


/**
 * Removes the carets from the current restoration document.
 * @param {AbstractRange=} opt_range A range whose offsets have already
 *     been adjusted for caret removal; it will be adjusted if it is also
 *     affected by post-removal operations, such as text node normalization.
 * @return {AbstractRange|undefined} The adjusted range, if opt_range
 *     was provided.
 * @override
 */
SavedCaretRange.prototype.removeCarets = function(opt_range) {
 dom.removeNode(this.getCaret(true));
 dom.removeNode(this.getCaret(false));
 // This appears unused, but the range is sometimes adjusted in other
 // implementations of AbstractSavedCaretRange.
 return opt_range;
};


/**
 * Sets the document where the range will be restored.
 * @param {!Document} doc An HTML document.
 * @override
 */
SavedCaretRange.prototype.setRestorationDocument = function(doc) {
 this.dom_.setDocument(doc);
};


/**
 * Reconstruct the selection from the given saved range. Removes carets after
 * restoring the selection. If restore does not dispose this saved range, it may
 * only be restored a second time if innerHTML or some other mechanism is used
 * to restore the carets to the dom.
 * @return {AbstractRange?} Restored selection.
 * @override
 * @protected
 */
SavedCaretRange.prototype.restoreInternal = function() {
 var range = null;
 var anchorCaret = this.getCaret(!this.reversed_);
 var focusCaret = this.getCaret(this.reversed_);
 if (anchorCaret && focusCaret) {
  var anchorNode = anchorCaret.parentNode;
  var anchorOffset =
      Array.prototype.indexOf.call(anchorNode.childNodes, anchorCaret);
  var focusNode = focusCaret.parentNode;
  var focusOffset =
      Array.prototype.indexOf.call(focusNode.childNodes, focusCaret);
  if (focusNode == anchorNode) {
    // Compensate for the start caret being removed.
    if (this.reversed_) {
      anchorOffset--;
    } else {
      focusOffset--;
    }
  }

  range = TextRange.createFromNodes(
      anchorNode, anchorOffset, focusNode, focusOffset);
  range = this.removeCarets(range);
  range.select();
 } else {
   // If only one caret was found, remove it.
   this.removeCarets();
 }
 return range;
};


/**
 * Dispose the saved range and remove the carets from the DOM.
 * @override
 */
SavedCaretRange.prototype.disposeInternal = function() {
 this.removeCarets();
 this.dom_ = null;
};


/**
 * Creates a caret element.
 * @param {boolean} start If true, creates the start caret. Otherwise,
 *     creates the end caret.
 * @return {!Element} The new caret element.
 * @private
 */
SavedCaretRange.prototype.createCaret_ = function(start) {
 return this.dom_.createDom(
     TagName.SPAN,
     {'id': start ? this.startCaretId_ : this.endCaretId_});
};


/**
 * A regex that will match all saved range carets in a string.
 * @type {RegExp}
 */
SavedCaretRange.CARET_REGEX = /<span\s+id="?goog_\d+"?><\/span>/ig;


/**
 * Returns whether two strings of html are equal, ignoring any saved carets.
 * Thus two strings of html whose only difference is the id of their saved
 * carets will be considered equal, since they represent html with the
 * same selection.
 * @param {string} str1 The first string.
 * @param {string} str2 The second string.
 * @return {boolean} Whether two strings of html are equal, ignoring any
 *     saved carets.
 */
SavedCaretRange.htmlEqual = function(str1, str2) {
 return str1 == str2 ||
     str1.replace(SavedCaretRange.CARET_REGEX, '') ==
     str2.replace(SavedCaretRange.CARET_REGEX, '');
};
