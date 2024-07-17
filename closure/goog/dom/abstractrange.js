/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Interface definitions for working with ranges
 * in HTML documents.
 */


goog.declareModuleId('goog.dom.abstractrange');

import * as dom from './dom.js';
import { NodeType } from './nodetype.js';
import { TagIterator } from './tagiterator.js';
import * as userAgent from '../useragent/useragent.js';
const {AbstractSavedCaretRange, SavedRange} = goog.requireType('goog.dom.savedrange');
const {Coordinate} = goog.requireType('goog.math.coordinate');

/**
 * Types of ranges.
 * @enum {string}
 */
export var RangeType = {
  TEXT: 'text',
  CONTROL: 'control',
  MULTI: 'mutli'
};



/**
 * Creates a new selection with no properties.  Do not use this constructor -
 * use one of the dom.Range.from* methods instead.
 * @constructor
 * @abstract
 */
export function AbstractRange() {}


/**
 * Gets the browser native selection object from the given window.
 * @param {Window} win The window to get the selection object from.
 * @return {Object} The browser native selection object, or null if it could
 *     not be retrieved.
 * @deprecated use window#getSelection instead.
 */
AbstractRange.getBrowserSelectionForWindow = function(win) {
 return win.getSelection();
};


/**
 * Tests if the given Object is a controlRange.
 * @param {Object} range The range object to test.
 * @return {boolean} Whether the given Object is a controlRange.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
AbstractRange.isNativeControlRange = function(range) {
 // For now, tests for presence of a control range function.
 return !!range && !!range.addElement;
};


/**
 * @return {!AbstractRange} A clone of this range.
 */
AbstractRange.prototype.clone = goog.abstractMethod;


/**
 * @return {RangeType} The type of range represented by this object.
 */
AbstractRange.prototype.getType = goog.abstractMethod;


/**
 * @return {Range|TextRange} The native browser range object.
 */
AbstractRange.prototype.getBrowserRangeObject = goog.abstractMethod;


/**
 * Sets the native browser range object, overwriting any state this range was
 * storing.
 * @param {Range|TextRange} nativeRange The native browser range object.
 * @return {boolean} Whether the given range was accepted.  If not, the caller
 *     will need to call dom.Range.createFromBrowserRange to create a new
 *     range object.
 */
AbstractRange.prototype.setBrowserRangeObject = function(nativeRange) {
 return false;
};


/**
 * @return {number} The number of text ranges in this range.
 */
AbstractRange.prototype.getTextRangeCount = goog.abstractMethod;


/**
 * Get the i-th text range in this range.  The behavior is undefined if
 * i >= getTextRangeCount or i < 0.
 * @param {number} i The range number to retrieve.
 * @return {?AbstractRange} The i-th text range.
 */
AbstractRange.prototype.getTextRange = goog.abstractMethod;


/**
 * Gets an array of all text ranges this range is comprised of.  For non-multi
 * ranges, returns a single element array containing this.
 * @return {!Array<?AbstractRange>} Array of text ranges.
 */
AbstractRange.prototype.getTextRanges = function() {
 var output = [];
 for (var i = 0, len = this.getTextRangeCount(); i < len; i++) {
   output.push(this.getTextRange(i));
 }
 return output;
};


/**
 * @return {Node} The deepest node that contains the entire range.
 */
AbstractRange.prototype.getContainer = goog.abstractMethod;


/**
 * Returns the deepest element in the tree that contains the entire range.
 * @return {Element} The deepest element that contains the entire range.
 */
AbstractRange.prototype.getContainerElement = function() {
 var node = this.getContainer();
 return /** @type {Element} */ (node.nodeType == NodeType.ELEMENT ? node : node.parentNode);
};


/**
 * @return {Node} The element or text node the range starts in.  For text
 *     ranges, the range comprises all text between the start and end position.
 *     For other types of range, start and end give bounds of the range but
 *     do not imply all nodes in those bounds are selected.
 */
AbstractRange.prototype.getStartNode = goog.abstractMethod;


/**
 * @return {number} The offset into the node the range starts in.  For text
 *     nodes, this is an offset into the node value.  For elements, this is
 *     an offset into the childNodes array.
 */
AbstractRange.prototype.getStartOffset = goog.abstractMethod;


/**
 * @return {Coordinate} The coordinate of the selection start node
 *     and offset.
 */
AbstractRange.prototype.getStartPosition = goog.abstractMethod;


/**
 * @return {Node} The element or text node the range ends in.
 */
AbstractRange.prototype.getEndNode = goog.abstractMethod;


/**
 * @return {number} The offset into the node the range ends in.  For text
 *     nodes, this is an offset into the node value.  For elements, this is
 *     an offset into the childNodes array.
 */
AbstractRange.prototype.getEndOffset = goog.abstractMethod;


/**
 * @return {Coordinate} The coordinate of the selection end
 *     node and offset.
 */
AbstractRange.prototype.getEndPosition = goog.abstractMethod;


/**
 * @return {Node} The element or text node the range is anchored at.
 */
AbstractRange.prototype.getAnchorNode = function() {
 return this.isReversed() ? this.getEndNode() : this.getStartNode();
};


/**
 * @return {number} The offset into the node the range is anchored at.  For
 *     text nodes, this is an offset into the node value.  For elements, this
 *     is an offset into the childNodes array.
 */
AbstractRange.prototype.getAnchorOffset = function() {
 return this.isReversed() ? this.getEndOffset() : this.getStartOffset();
};


/**
 * @return {Node} The element or text node the range is focused at - i.e. where
 *     the cursor is.
 */
AbstractRange.prototype.getFocusNode = function() {
 return this.isReversed() ? this.getStartNode() : this.getEndNode();
};


/**
 * @return {number} The offset into the node the range is focused at - i.e.
 *     where the cursor is.  For text nodes, this is an offset into the node
 *     value.  For elements, this is an offset into the childNodes array.
 */
AbstractRange.prototype.getFocusOffset = function() {
 return this.isReversed() ? this.getStartOffset() : this.getEndOffset();
};


/**
 * @return {boolean} Whether the selection is reversed.
 */
AbstractRange.prototype.isReversed = function() {
 return false;
};


/**
 * @return {!Document} The document this selection is a part of.
 */
AbstractRange.prototype.getDocument = function() {
 // Using start node in IE was crashing the browser in some cases so use
 // getContainer for that browser. It's also faster for IE, but still slower
 // than start node for other browsers so we continue to use getStartNode when
 // it is not problematic. See bug 1687309.
 return dom.getOwnerDocument(
     userAgent.IE ? this.getContainer() : this.getStartNode());
};


/**
 * @return {!Window} The window this selection is a part of.
 */
AbstractRange.prototype.getWindow = function() {
 return dom.getWindow(this.getDocument());
};


/**
 * Tests if this range contains the given range.
 * @param {AbstractRange} range The range to test.
 * @param {boolean=} opt_allowPartial If true, the range can be partially
 *     contained in the selection, otherwise the range must be entirely
 *     contained.
 * @return {boolean} Whether this range contains the given range.
 */
AbstractRange.prototype.containsRange = goog.abstractMethod;


/**
 * Tests if this range contains the given node.
 * @param {Node} node The node to test for.
 * @param {boolean=} opt_allowPartial If not set or false, the node must be
 *     entirely contained in the selection for this function to return true.
 * @return {boolean} Whether this range contains the given node.
 */
AbstractRange.prototype.containsNode = goog.abstractMethod;



/**
 * Tests whether this range is valid (i.e. whether its endpoints are still in
 * the document).  A range becomes invalid when, after this object was created,
 * either one or both of its endpoints are removed from the document.  Use of
 * an invalid range can lead to runtime errors, particularly in IE.
 * @return {boolean} Whether the range is valid.
 */
AbstractRange.prototype.isRangeInDocument = goog.abstractMethod;


/**
 * @return {boolean} Whether the range is collapsed.
 */
AbstractRange.prototype.isCollapsed = goog.abstractMethod;


/**
 * @return {string} The text content of the range.
 */
AbstractRange.prototype.getText = goog.abstractMethod;


/**
 * Returns the HTML fragment this range selects.  This is slow on all browsers.
 * The HTML fragment may not be valid HTML, for instance if the user selects
 * from a to b inclusively in the following html:
 *
 * &lt;div&gt;a&lt;/div&gt;b
 *
 * This method will return
 *
 * a&lt;/div&gt;b
 *
 * If you need valid HTML, use {@link #getValidHtml} instead.
 *
 * @return {string} HTML fragment of the range, does not include context
 *     containing elements.
 */
AbstractRange.prototype.getHtmlFragment = goog.abstractMethod;


/**
 * Returns valid HTML for this range.  This is fast on IE, and semi-fast on
 * other browsers.
 * @return {string} Valid HTML of the range, including context containing
 *     elements.
 */
AbstractRange.prototype.getValidHtml = goog.abstractMethod;


/**
 * Returns pastable HTML for this range.  This guarantees that any child items
 * that must have specific ancestors will have them, for instance all TDs will
 * be contained in a TR in a TBODY in a TABLE and all LIs will be contained in
 * a UL or OL as appropriate.  This is semi-fast on all browsers.
 * @return {string} Pastable HTML of the range, including context containing
 *     elements.
 */
AbstractRange.prototype.getPastableHtml = goog.abstractMethod;


/**
 * Returns a RangeIterator over the contents of the range.  Regardless of the
 * direction of the range, the iterator will move in document order.
 * @param {boolean=} opt_keys Unused for this iterator.
 * @return {!RangeIterator} An iterator over tags in the range.
 */
AbstractRange.prototype.__iterator__ = goog.abstractMethod;


// RANGE ACTIONS


/**
 * Sets this range as the selection in its window.
 */
AbstractRange.prototype.select = goog.abstractMethod;


/**
 * Removes the contents of the range from the document.
 */
AbstractRange.prototype.removeContents = goog.abstractMethod;


/**
 * Inserts a node before (or after) the range.  The range may be disrupted
 * beyond recovery because of the way this splits nodes.
 * @param {Node} node The node to insert.
 * @param {boolean} before True to insert before, false to insert after.
 * @return {Node} The node added to the document.  This may be different
 *     than the node parameter because on IE we have to clone it.
 */
AbstractRange.prototype.insertNode = goog.abstractMethod;


/**
 * Replaces the range contents with (possibly a copy of) the given node.  The
 * range may be disrupted beyond recovery because of the way this splits nodes.
 * @param {Node} node The node to insert.
 * @return {Node} The node added to the document.  This may be different
 *     than the node parameter because on IE we have to clone it.
 */
AbstractRange.prototype.replaceContentsWithNode = function(node) {
 if (!this.isCollapsed()) {
   this.removeContents();
 }

 return this.insertNode(node, true);
};


/**
 * Surrounds this range with the two given nodes.  The range may be disrupted
 * beyond recovery because of the way this splits nodes.
 * @param {Element} startNode The node to insert at the start.
 * @param {Element} endNode The node to insert at the end.
 */
AbstractRange.prototype.surroundWithNodes = goog.abstractMethod;


// SAVE/RESTORE


/**
 * Saves the range so that if the start and end nodes are left alone, it can
 * be restored.
 * @return {!SavedRange} A range representation that can be restored
 *     as long as the endpoint nodes of the selection are not modified.
 */
AbstractRange.prototype.saveUsingDom = goog.abstractMethod;


/**
 * Saves the range using HTML carets. As long as the carets remained in the
 * HTML, the range can be restored...even when the HTML is copied across
 * documents.
 * @return {?AbstractSavedCaretRange} A range representation that can
 *     be restored as long as carets are not removed. Returns null if carets
 *     could not be created.
 * @abstract
 */
AbstractRange.prototype.saveUsingCarets = function() {};


// RANGE MODIFICATION


/**
 * Collapses the range to one of its boundary points.
 * @param {boolean} toAnchor Whether to collapse to the anchor of the range.
 */
AbstractRange.prototype.collapse = goog.abstractMethod;

// RANGE ITERATION



/**
 * Subclass of TagIterator that iterates over a DOM range.  It
 * adds functions to determine the portion of each text node that is selected.
 * @param {Node} node The node to start traversal at.  When null, creates an
 *     empty iterator.
 * @param {boolean=} opt_reverse Whether to traverse nodes in reverse.
 * @constructor
 * @extends {TagIterator}
 */
export function RangeIterator(node, opt_reverse) {
 TagIterator.call(this, node, opt_reverse, true);
}
goog.inherits(RangeIterator, TagIterator);


/**
 * @return {number} The offset into the current node, or -1 if the current node
 *     is not a text node.
 */
RangeIterator.prototype.getStartTextOffset = goog.abstractMethod;


/**
 * @return {number} The end offset into the current node, or -1 if the current
 *     node is not a text node.
 */
RangeIterator.prototype.getEndTextOffset = goog.abstractMethod;


/**
 * @return {Node} node The iterator's start node.
 */
RangeIterator.prototype.getStartNode = goog.abstractMethod;


/**
 * @return {Node} The iterator's end node.
 */
RangeIterator.prototype.getEndNode = goog.abstractMethod;


/**
 * @return {boolean} Whether a call to next will fail.
 */
RangeIterator.prototype.isLast = goog.abstractMethod;
