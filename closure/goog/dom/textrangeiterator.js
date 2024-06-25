/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Iterator between two DOM text range positions.
 */


// TODO(user): We're trying to migrate all ES5 subclasses of Closure
// Library to ES6. In ES6 this cannot be referenced before super is called. This
// file has at least one this before a super call (in ES5) and cannot be
// automatically upgraded to ES6 as a result. Please fix this if you have a
// chance. Note: This can sometimes be caused by not calling the super
// constructor at all. You can run the conversion tool yourself to see what it
// does on this file: blaze run //javascript/refactoring/es6_classes:convert.

import * as array from '../array/array.js';

import * as dom from './dom.js';
import { NodeType } from './nodetype.js';
import { RangeIterator } from './abstractrange.js';
import { TagName } from './tagname.js';
import * as iter from '../iter/iter.js';



/**
 * Subclass of dom.TagIterator that iterates over a DOM range.  It
 * adds functions to determine the portion of each text node that is selected.
 *
 * @param {Node} startNode The starting node position.
 * @param {number} startOffset The offset in to startNode.  If startNode is
 *     an element, indicates an offset in to childNodes.  If startNode is a
 *     text node, indicates an offset in to nodeValue.
 * @param {Node} endNode The ending node position.
 * @param {number} endOffset The offset in to endNode.  If endNode is
 *     an element, indicates an offset in to childNodes.  If endNode is a
 *     text node, indicates an offset in to nodeValue.
 * @param {boolean=} opt_reverse Whether to traverse nodes in reverse.
 * @constructor
 * @extends {RangeIterator}
 * @final
 */
export function TextRangeIterator(startNode, startOffset, endNode, endOffset, opt_reverse) {
  /**
   * The first node in the selection.
   * @private {?Node}
   */
  this.startNode_ = null;

  /**
   * The last node in the selection.
   * @private {?Node}
   */
  this.endNode_ = null;

  /**
   * The offset within the first node in the selection.
   * @private {number}
   */
  this.startOffset_ = 0;

  /**
   * The offset within the last node in the selection.
   * @private {number}
   */
  this.endOffset_ = 0;

  /**
   * Whether the node iterator is moving in reverse.
   * @private {boolean}
   */
  this.isReversed_ = !!opt_reverse;

  var goNext;

  if (startNode) {
    this.startNode_ = startNode;
    this.startOffset_ = startOffset;
    this.endNode_ = endNode;
    this.endOffset_ = endOffset;

    // Skip to the offset nodes - being careful to special case BRs since these
    // have no children but still can appear as the startContainer of a range.
    if (startNode.nodeType == NodeType.ELEMENT &&
        /** @type {!Element} */ (startNode).tagName != TagName.BR) {
      var startChildren = startNode.childNodes;
      var candidate = startChildren[startOffset];
      if (candidate) {
        this.startNode_ = candidate;
        this.startOffset_ = 0;
      } else {
        if (startChildren.length) {
          this.startNode_ =
              /** @type {Node} */ (array.peek(startChildren));
        }
        goNext = true;
      }
    }

    if (endNode.nodeType == NodeType.ELEMENT) {
      this.endNode_ = endNode.childNodes[endOffset];
      if (this.endNode_) {
        this.endOffset_ = 0;
      } else {
        // The offset was past the last element.
        this.endNode_ = endNode;
      }
    }
  }

  TextRangeIterator.base(
      this, 'constructor', this.isReversed_ ? this.endNode_ : this.startNode_,
      this.isReversed_);

  if (goNext) {
    this.next();
  }
}
goog.inherits(TextRangeIterator, RangeIterator);

/** @private {boolean} */
TextRangeIterator.prototype.hasSkippedPastLast_ = false;

/** @override */
TextRangeIterator.prototype.getStartTextOffset = function() {
  // Offsets only apply to text nodes.  If our current node is the start node,
  // return the saved offset.  Otherwise, return 0.
  return this.node.nodeType != NodeType.TEXT ?
      -1 :
      this.node == this.startNode_ ? this.startOffset_ : 0;
};


/** @override */
TextRangeIterator.prototype.getEndTextOffset = function() {
  // Offsets only apply to text nodes.  If our current node is the end node,
  // return the saved offset.  Otherwise, return the length of the node.
  return this.node.nodeType != NodeType.TEXT ?
      -1 :
      this.node == this.endNode_ ? this.endOffset_ : this.node.nodeValue.length;
};


/** @override */
TextRangeIterator.prototype.getStartNode = function() {
  return this.startNode_;
};


/**
 * Change the start node of the iterator.
 * @param {Node} node The new start node.
 */
TextRangeIterator.prototype.setStartNode = function(node) {
  if (!this.isStarted()) {
    this.setPosition(node);
  }

  this.startNode_ = node;
  this.startOffset_ = 0;
};


/** @override */
TextRangeIterator.prototype.getEndNode = function() {
  return this.endNode_;
};


/**
 * Change the end node of the iterator.
 * @param {Node} node The new end node.
 */
TextRangeIterator.prototype.setEndNode = function(node) {
  this.endNode_ = node;
  this.endOffset_ = 0;
};

/** @override */
TextRangeIterator.prototype.isLast = function() {
  return this.isStarted() && this.isLastTag_();
};

/**
 * Returns true if the iterator is on the last step before iteration finishes,
 * false otherwise.
 * @return {boolean}
 * @private
 */
TextRangeIterator.prototype.isLastTag_ = function() {
  if (this.node != this.lastNode_()) {
    return false;
  }
  // For a reverse iterator, this function will return true if the end offset is
  // > 0 and the iterator is not currently on an end tag OR the end offset = 0
  // and the iterator is currently on a start tag.
  if (this.isReversed_) {
    return this.startOffset_ ? !this.isEndTag() : this.isStartTag();
  }
  // For a forward-iterating iterator, this function will return true if the end
  // offset is 0 or the iterator is not currently on a start tag.
  return !this.endOffset_ || !this.isStartTag();
};

/**
 * Move to the next position in the selection. Returns `{done: true}` when it
 * passes the end of the range.
 * @return {!IIterableResult<!Node>} The node at the next position.
 * @override
 */
TextRangeIterator.prototype.next = function() {
  if (this.isLast() || this.hasSkippedPastLast_) {
    return iter.ES6_ITERATOR_DONE;
  }

  // Call the super function.
  return TextRangeIterator.superClass_.next.call(this);
};


/**
 * Get the last node the iterator will hit.
 * @return {?Node} The last node the iterator will hit.
 * @private
 */
TextRangeIterator.prototype.lastNode_ = function() {
  return this.isReversed_ ? this.startNode_ : this.endNode_;
};

/** @override */
TextRangeIterator.prototype.skipTag = function() {
  TextRangeIterator.superClass_.skipTag.apply(this);

  // If the node we are skipping contains the end node, we just skipped past
  // the end, so we stop the iteration.
  if (dom.contains(this.node, this.lastNode_())) {
    this.hasSkippedPastLast_ = true;
  }
};


/**
 * @override
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
TextRangeIterator.prototype.copyFrom = function(other) {
  this.startNode_ = other.startNode_;
  this.endNode_ = other.endNode_;
  this.startOffset_ = other.startOffset_;
  this.endOffset_ = other.endOffset_;
  this.isReversed_ = other.isReversed_;

  TextRangeIterator.superClass_.copyFrom.call(this, other);
};


/**
 * @return {!TextRangeIterator} An identical iterator.
 * @override
 */
TextRangeIterator.prototype.clone = function() {
  var copy = new TextRangeIterator(
      this.startNode_, this.startOffset_, this.endNode_, this.endOffset_,
      this.isReversed_);
  copy.copyFrom(this);
  return copy;
};
