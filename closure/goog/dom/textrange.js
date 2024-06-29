/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utilities for working with text ranges in HTML documents.
 */


import * as array from '../array/array.js';

import * as dom from './dom.js';
import { AbstractRange, RangeType } from './abstractrange.js';
import { SavedCaretRange } from './savedcaretrange.js';
import { SavedRange } from './savedrange.js';
import { TagName } from './tagname.js';
import { TextRangeIterator } from './textrangeiterator.js';
import * as browserrange from './browserrange/browserrange.js';
import * as userAgent from '../useragent/useragent.js';
import * as RangeUtils from './range.js';
const {AbstractRange: BrowserAbstractRange} = goog.requireType('goog.dom.browserrange.abstractrange');



/**
 * Create a new text selection with no properties.  Do not use this constructor:
 * use one of the dom.Range.createFrom* methods instead.
 * @constructor
 * @extends {AbstractRange}
 * @final
 */
function GoogTextRange() {
  /**
     * The browser specific range wrapper.  This can be null if one of the other
     * representations of the range is specified.
     * @private {BrowserAbstractRange?}
     */
  this.browserRangeWrapper_ = null;

  /**
   * The start node of the range.  This can be null if one of the other
   * representations of the range is specified.
   * @private {?Node}
   */
  this.startNode_ = null;

  /**
   * The start offset of the range.  This can be null if one of the other
   * representations of the range is specified.
   * @private {?number}
   */
  this.startOffset_ = null;

  /**
   * The end node of the range.  This can be null if one of the other
   * representations of the range is specified.
   * @private {?Node}
   */
  this.endNode_ = null;

  /**
   * The end offset of the range.  This can be null if one of the other
   * representations of the range is specified.
   * @private {?number}
   */
  this.endOffset_ = null;

  /**
   * Whether the focus node is before the anchor node.
   * @private {boolean}
   */
  this.isReversed_ = false;
}
goog.inherits(GoogTextRange, AbstractRange);
export { GoogTextRange as TextRange };


/**
 * Create a new range wrapper from the given browser range object.  Do not use
 * this method directly - please use dom.Range.createFrom* instead.
 * @param {Range|TextRange} range The browser range object.
 * @param {boolean=} opt_isReversed Whether the focus node is before the anchor
 *     node.
 * @return {!GoogTextRange} A range wrapper object.
 */
GoogTextRange.createFromBrowserRange = function(range, opt_isReversed) {
  return GoogTextRange.createFromBrowserRangeWrapper_(
      browserrange.createRange(range), opt_isReversed);
};


/**
 * Create a new range wrapper from the given browser range wrapper.
 * @param {BrowserAbstractRange} browserRange The browser range
 *     wrapper.
 * @param {boolean=} opt_isReversed Whether the focus node is before the anchor
 *     node.
 * @return {!GoogTextRange} A range wrapper object.
 * @private
 */
GoogTextRange.createFromBrowserRangeWrapper_ = function(
    browserRange, opt_isReversed) {
  var range = new GoogTextRange();

  // Initialize the range as a browser range wrapper type range.
  range.browserRangeWrapper_ = browserRange;
  range.isReversed_ = !!opt_isReversed;

  return range;
};


/**
 * Create a new range wrapper that selects the given node's text.  Do not use
 * this method directly - please use dom.Range.createFrom* instead.
 * @param {Node} node The node to select.
 * @param {boolean=} opt_isReversed Whether the focus node is before the anchor
 *     node.
 * @return {!GoogTextRange} A range wrapper object.
 */
GoogTextRange.createFromNodeContents = function(node, opt_isReversed) {
  return GoogTextRange.createFromBrowserRangeWrapper_(
      browserrange.createRangeFromNodeContents(node), opt_isReversed);
};


/**
 * Create a new range wrapper that selects the area between the given nodes,
 * accounting for the given offsets.  Do not use this method directly - please
 * use dom.Range.createFrom* instead.
 * @param {Node} anchorNode The node to start with.
 * @param {number} anchorOffset The offset within the node to start.
 * @param {Node} focusNode The node to end with.
 * @param {number} focusOffset The offset within the node to end.
 * @return {!GoogTextRange} A range wrapper object.
 */
GoogTextRange.createFromNodes = function(
    anchorNode, anchorOffset, focusNode, focusOffset) {
  var range = new GoogTextRange();
  range.isReversed_ =
      RangeUtils.isReversed(anchorNode, anchorOffset, focusNode, focusOffset);

  // Avoid selecting terminal elements directly
  if (dom.isElement(anchorNode) && !dom.canHaveChildren(anchorNode)) {
    var parent = anchorNode.parentNode;
    anchorOffset = Array.prototype.indexOf.call(parent.childNodes, anchorNode);
    anchorNode = parent;
  }

  if (dom.isElement(focusNode) && !dom.canHaveChildren(focusNode)) {
    var parent = focusNode.parentNode;
    focusOffset = Array.prototype.indexOf.call(parent.childNodes, focusNode);
    focusNode = parent;
  }

  // Initialize the range as a W3C style range.
  if (range.isReversed_) {
    range.startNode_ = focusNode;
    range.startOffset_ = focusOffset;
    range.endNode_ = anchorNode;
    range.endOffset_ = anchorOffset;
  } else {
    range.startNode_ = anchorNode;
    range.startOffset_ = anchorOffset;
    range.endNode_ = focusNode;
    range.endOffset_ = focusOffset;
  }

  return range;
};


// Method implementations


/**
 * @return {!GoogTextRange} A clone of this range.
 * @override
 */
GoogTextRange.prototype.clone = function() {
  var range = new GoogTextRange();
  range.browserRangeWrapper_ =
      this.browserRangeWrapper_ && this.browserRangeWrapper_.clone();
  range.startNode_ = this.startNode_;
  range.startOffset_ = this.startOffset_;
  range.endNode_ = this.endNode_;
  range.endOffset_ = this.endOffset_;
  range.isReversed_ = this.isReversed_;

  return range;
};


/** @override */
GoogTextRange.prototype.getType = function() {
  return RangeType.TEXT;
};


/** @override */
GoogTextRange.prototype.getBrowserRangeObject = function() {
  return this.getBrowserRangeWrapper_().getBrowserRange();
};


/** @override */
GoogTextRange.prototype.setBrowserRangeObject = function(nativeRange) {
  // Test if it's a control range by seeing if a control range only method
  // exists.
  if (AbstractRange.isNativeControlRange(nativeRange)) {
    return false;
  }
  this.browserRangeWrapper_ = browserrange.createRange(nativeRange);
  this.clearCachedValues_();
  return true;
};


/**
 * Clear all cached values.
 * @private
 */
GoogTextRange.prototype.clearCachedValues_ = function() {
  this.startNode_ = this.startOffset_ = this.endNode_ = this.endOffset_ = null;
};


/** @override */
GoogTextRange.prototype.getTextRangeCount = function() {
  return 1;
};


/** @override */
GoogTextRange.prototype.getTextRange = function(i) {
  return this;
};


/**
 * @return {!BrowserAbstractRange} The range wrapper object.
 * @private
 */
GoogTextRange.prototype.getBrowserRangeWrapper_ = function() {
  return this.browserRangeWrapper_ ||
      (this.browserRangeWrapper_ = browserrange.createRangeFromNodes(
           this.getStartNode(), this.getStartOffset(), this.getEndNode(),
           this.getEndOffset()));
};


/** @override */
GoogTextRange.prototype.getContainer = function() {
  return this.getBrowserRangeWrapper_().getContainer();
};


/** @override */
GoogTextRange.prototype.getStartNode = function() {
  return this.startNode_ ||
      (this.startNode_ = this.getBrowserRangeWrapper_().getStartNode());
};


/** @override */
GoogTextRange.prototype.getStartOffset = function() {
  return this.startOffset_ != null ?
      this.startOffset_ :
      (this.startOffset_ = this.getBrowserRangeWrapper_().getStartOffset());
};


/** @override */
GoogTextRange.prototype.getStartPosition = function() {
  return this.getBrowserRangeWrapper_().getStartPosition();
};


/** @override */
GoogTextRange.prototype.getEndNode = function() {
  return this.endNode_ ||
      (this.endNode_ = this.getBrowserRangeWrapper_().getEndNode());
};


/** @override */
GoogTextRange.prototype.getEndOffset = function() {
  return this.endOffset_ != null ?
      this.endOffset_ :
      (this.endOffset_ = this.getBrowserRangeWrapper_().getEndOffset());
};


/** @override */
GoogTextRange.prototype.getEndPosition = function() {
  return this.getBrowserRangeWrapper_().getEndPosition();
};


/**
 * Moves a TextRange to the provided nodes and offsets.
 * @param {Node} startNode The node to start with.
 * @param {number} startOffset The offset within the node to start.
 * @param {Node} endNode The node to end with.
 * @param {number} endOffset The offset within the node to end.
 * @param {boolean} isReversed Whether the range is reversed.
 */
GoogTextRange.prototype.moveToNodes = function(
    startNode, startOffset, endNode, endOffset, isReversed) {
  this.startNode_ = startNode;
  this.startOffset_ = startOffset;
  this.endNode_ = endNode;
  this.endOffset_ = endOffset;
  this.isReversed_ = isReversed;
  this.browserRangeWrapper_ = null;
};


/** @override */
GoogTextRange.prototype.isReversed = function() {
  return this.isReversed_;
};


/**
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
GoogTextRange.prototype.containsRange = function(
    otherRange, opt_allowPartial) {
  var otherRangeType = otherRange.getType();
  if (otherRangeType == RangeType.TEXT) {
    return this.getBrowserRangeWrapper_().containsRange(
        otherRange.getBrowserRangeWrapper_(), opt_allowPartial);
  } else if (otherRangeType == RangeType.CONTROL) {
    /** @suppress {strictMissingProperties} Added to tighten compiler checks */
    var elements = otherRange.getElements();
    var fn = opt_allowPartial ? array.some : array.every;
    return fn(
        elements,
        /**
                 * @this {GoogTextRange}
                 * @param {!Element} el
                 * @return {boolean}
                 */
        function(el) {
          return this.containsNode(el, opt_allowPartial);
        },
        this);
  }
  return false;
};


/** @override */
GoogTextRange.prototype.containsNode = function(node, opt_allowPartial) {
  return this.containsRange(
      GoogTextRange.createFromNodeContents(node), opt_allowPartial);
};



/**
 * Tests if the given node is in a document.
 * @param {Node} node The node to check.
 * @return {boolean} Whether the given node is in the given document.
 */
GoogTextRange.isAttachedNode = function(node) {
  if (userAgent.IE && !userAgent.isDocumentModeOrHigher(9)) {
    var returnValue = false;

    try {
      returnValue = node.parentNode;
    } catch (e) {
      // IE sometimes throws Invalid Argument errors when a node is detached.
      // Note: trying to return a value from the above try block can cause IE
      // to crash.  It is necessary to use the local returnValue
    }
    return !!returnValue;
  } else {
    return dom.contains(node.ownerDocument.body, node);
  }
};


/** @override */
GoogTextRange.prototype.isRangeInDocument = function() {
  // Ensure any cached nodes are in the document.
  return (!this.startNode_ ||
          GoogTextRange.isAttachedNode(this.startNode_)) &&
      (!this.endNode_ || GoogTextRange.isAttachedNode(this.endNode_));
};


/** @override */
GoogTextRange.prototype.isCollapsed = function() {
  return this.getBrowserRangeWrapper_().isCollapsed();
};


/** @override */
GoogTextRange.prototype.getText = function() {
  return this.getBrowserRangeWrapper_().getText();
};


/** @override */
GoogTextRange.prototype.getHtmlFragment = function() {
  // TODO(robbyw): Generalize the code in browserrange so it is static and
  // just takes an iterator.  This would mean we don't always have to create a
  // browser range.
  return this.getBrowserRangeWrapper_().getHtmlFragment();
};


/** @override */
GoogTextRange.prototype.getValidHtml = function() {
  return this.getBrowserRangeWrapper_().getValidHtml();
};


/**
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
GoogTextRange.prototype.getPastableHtml = function() {
  // TODO(robbyw): Get any attributes the table or tr has.

  var html = this.getValidHtml();

  if (html.match(/^\s*<td\b/i)) {
    // Match html starting with a TD.
    html = '<table><tbody><tr>' + html + '</tr></tbody></table>';
  } else if (html.match(/^\s*<tr\b/i)) {
    // Match html starting with a TR.
    html = '<table><tbody>' + html + '</tbody></table>';
  } else if (html.match(/^\s*<tbody\b/i)) {
    // Match html starting with a TBODY.
    html = '<table>' + html + '</table>';
  } else if (html.match(/^\s*<li\b/i)) {
    // Match html starting with an LI.
    var container = /** @type {!Element} */ (this.getContainer());
    var tagType = TagName.UL;
    while (container) {
      if (container.tagName == TagName.OL) {
        tagType = TagName.OL;
        break;
      } else if (container.tagName == TagName.UL) {
        break;
      }
      container = container.parentNode;
    }
    html = '<' + tagType + '>' + html + '</' + tagType + '>';
  }

  return html;
};


/**
 * Returns a TextRangeIterator over the contents of the range.  Regardless of
 * the direction of the range, the iterator will move in document order.
 * @param {boolean=} opt_keys Unused for this iterator.
 * @return {!TextRangeIterator} An iterator over tags in the range.
 * @override
 */
GoogTextRange.prototype.__iterator__ = function(opt_keys) {
  return new TextRangeIterator(
      this.getStartNode(), this.getStartOffset(), this.getEndNode(),
      this.getEndOffset());
};


// RANGE ACTIONS


/** @override */
GoogTextRange.prototype.select = function() {
  this.getBrowserRangeWrapper_().select(this.isReversed_);
};


/** @override */
GoogTextRange.prototype.removeContents = function() {
  this.getBrowserRangeWrapper_().removeContents();
  this.clearCachedValues_();
};


/**
 * Surrounds the text range with the specified element (on Mozilla) or with a
 * clone of the specified element (on IE).  Returns a reference to the
 * surrounding element if the operation was successful; returns null if the
 * operation failed.
 * @param {Element} element The element with which the selection is to be
 *    surrounded.
 * @return {Element} The surrounding element (same as the argument on Mozilla,
 *    but not on IE), or null if unsuccessful.
 */
GoogTextRange.prototype.surroundContents = function(element) {
  var output = this.getBrowserRangeWrapper_().surroundContents(element);
  this.clearCachedValues_();
  return output;
};


/** @override */
GoogTextRange.prototype.insertNode = function(node, before) {
  var output = this.getBrowserRangeWrapper_().insertNode(node, before);
  this.clearCachedValues_();
  return output;
};


/** @override */
GoogTextRange.prototype.surroundWithNodes = function(startNode, endNode) {
  this.getBrowserRangeWrapper_().surroundWithNodes(startNode, endNode);
  this.clearCachedValues_();
};


// SAVE/RESTORE


/** @override */
GoogTextRange.prototype.saveUsingDom = function() {
  return new DomSavedTextRange_(this);
};

/** @override */
GoogTextRange.prototype.saveUsingCarets = function() {
  return (this.getStartNode() && this.getEndNode()) ?
      new SavedCaretRange(this) :
      null;
};


// RANGE MODIFICATION


/** @override */
GoogTextRange.prototype.collapse = function(toAnchor) {
  var toStart = this.isReversed() ? !toAnchor : toAnchor;

  if (this.browserRangeWrapper_) {
    this.browserRangeWrapper_.collapse(toStart);
  }

  if (toStart) {
    this.endNode_ = this.startNode_;
    this.endOffset_ = this.startOffset_;
  } else {
    this.startNode_ = this.endNode_;
    this.startOffset_ = this.endOffset_;
  }

  // Collapsed ranges can't be reversed
  this.isReversed_ = false;
};


// SAVED RANGE OBJECTS



/**
 * A SavedRange implementation using DOM endpoints.
 * @param {AbstractRange} range The range to save.
 * @constructor
 * @extends {SavedRange}
 * @private
 */
function DomSavedTextRange_(range) {
  DomSavedTextRange_.base(this, 'constructor');

  /**
   * The anchor node.
   * @type {Node}
   * @private
   */
  this.anchorNode_ = range.getAnchorNode();

  /**
   * The anchor node offset.
   * @type {number}
   * @private
   */
  this.anchorOffset_ = range.getAnchorOffset();

  /**
   * The focus node.
   * @type {Node}
   * @private
   */
  this.focusNode_ = range.getFocusNode();

  /**
   * The focus node offset.
   * @type {number}
   * @private
   */
  this.focusOffset_ = range.getFocusOffset();
};
goog.inherits(DomSavedTextRange_, SavedRange);


/**
 * @return {!AbstractRange} The restored range.
 * @override
 */
DomSavedTextRange_.prototype.restoreInternal = function() {
  return RangeUtils.createFromNodes(
      this.anchorNode_, this.anchorOffset_, this.focusNode_, this.focusOffset_);
};


/** @override */
DomSavedTextRange_.prototype.disposeInternal = function() {
  DomSavedTextRange_.superClass_.disposeInternal.call(this);

  this.anchorNode_ = null;
  this.focusNode_ = null;
};
