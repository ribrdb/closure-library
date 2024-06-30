/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utilities for working with W3C multi-part ranges.
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
import { AbstractMultiRange } from './abstractmultirange.js';
import { AbstractRange, RangeIterator, RangeType } from './abstractrange.js';
import { SavedCaretRange } from './savedcaretrange.js';
import { SavedRange } from './savedrange.js';
import { TextRange } from './textrange.js';
import * as iter from '../iter/iter.js';
import * as log from '../log/log.js';
import { isReversed } from './range.js';



/**
 * Creates a new multi part range with no properties.  Do not use this
 * constructor: use one of the dom.Range.createFrom* methods instead.
 * @constructor
 * @extends {AbstractMultiRange}
 * @final
 */
export function MultiRange() {
  /**
     * Logging object.
     * @private {log.Logger}
     */
  this.logger_ = log.getLogger('goog.dom.MultiRange');

  /**
   * Array of browser sub-ranges comprising this multi-range.
   * @private {Array<Range>}
   */
  this.browserRanges_ = [];

  /**
     * Lazily initialized array of range objects comprising this multi-range.
     * @private {Array<TextRange>}
     */
  this.ranges_ = [];

  /**
     * Lazily computed sorted version of ranges_, sorted by start point.
     * @private {Array<?TextRange>?}
     */
  this.sortedRanges_ = null;

  /**
   * Lazily computed container node.
   * @private {?Node}
   */
  this.container_ = null;
}
goog.inherits(MultiRange, AbstractMultiRange);


/**
 * Creates a new range wrapper from the given browser selection object.  Do not
 * use this method directly - please use dom.Range.createFrom* instead.
 * @param {Selection} selection The browser selection object.
 * @return {!MultiRange} A range wrapper object.
 */
MultiRange.createFromBrowserSelection = function(selection) {
  var range = new MultiRange();
  for (var i = 0, len = selection.rangeCount; i < len; i++) {
    range.browserRanges_.push(selection.getRangeAt(i));
  }
  return range;
};


/**
 * Creates a new range wrapper from the given browser ranges.  Do not
 * use this method directly - please use dom.Range.createFrom* instead.
 * @param {Array<Range>} browserRanges The browser ranges.
 * @return {!MultiRange} A range wrapper object.
 */
MultiRange.createFromBrowserRanges = function(browserRanges) {
  var range = new MultiRange();
  range.browserRanges_ = array.clone(browserRanges);
  return range;
};


/**
 * Creates a new range wrapper from the given TextRange objects.  Do
 * not use this method directly - please use dom.Range.createFrom* instead.
 * @param {Array<TextRange>} textRanges The text range objects.
 * @return {!MultiRange} A range wrapper object.
 */
MultiRange.createFromTextRanges = function(textRanges) {
  var range = new MultiRange();
  range.ranges_ = textRanges;
  range.browserRanges_ = textRanges.map(function(range) {
    return range.getBrowserRangeObject();
  });
  return range;
};


// Method implementations


/**
 * Clears cached values.  Should be called whenever this.browserRanges_ is
 * modified.
 * @private
 */
MultiRange.prototype.clearCachedValues_ = function() {
  this.ranges_ = [];
  this.sortedRanges_ = null;
  this.container_ = null;
};


/**
 * @return {!MultiRange} A clone of this range.
 * @override
 */
MultiRange.prototype.clone = function() {
  return MultiRange.createFromBrowserRanges(this.browserRanges_);
};


/** @override */
MultiRange.prototype.getType = function() {
  return RangeType.MULTI;
};


/** @override */
MultiRange.prototype.getBrowserRangeObject = function() {
  // NOTE(robbyw): This method does not make sense for multi-ranges.
  if (this.browserRanges_.length > 1) {
    log.warning(
        this.logger_,
        'getBrowserRangeObject called on MultiRange with more than 1 range');
  }
  return this.browserRanges_[0];
};


/** @override */
MultiRange.prototype.setBrowserRangeObject = function(nativeRange) {
  // TODO(robbyw): Look in to adding setBrowserSelectionObject.
  return false;
};


/** @override */
MultiRange.prototype.getTextRangeCount = function() {
  return this.browserRanges_.length;
};


/** @override */
MultiRange.prototype.getTextRange = function(i) {
  if (!this.ranges_[i]) {
    this.ranges_[i] =
        TextRange.createFromBrowserRange(this.browserRanges_[i]);
  }
  return this.ranges_[i];
};


/** @override */
MultiRange.prototype.getContainer = function() {
  if (!this.container_) {
    var nodes = [];
    for (var i = 0, len = this.getTextRangeCount(); i < len; i++) {
      nodes.push(this.getTextRange(i).getContainer());
    }
    this.container_ = dom.findCommonAncestor.apply(null, nodes);
  }
  return this.container_;
};


/**
 * @return {!Array<TextRange>} An array of sub-ranges, sorted by start
 *     point.
 */
MultiRange.prototype.getSortedRanges = function() {
  if (!this.sortedRanges_) {
    this.sortedRanges_ = this.getTextRanges();
    this.sortedRanges_.sort(function(a, b) {
      var aStartNode = a.getStartNode();
      var aStartOffset = a.getStartOffset();
      var bStartNode = b.getStartNode();
      var bStartOffset = b.getStartOffset();

      if (aStartNode == bStartNode && aStartOffset == bStartOffset) {
        return 0;
      }

      /**
             * @suppress {missingRequire} Cannot depend on dom.Range because
             *     it creates a circular dependency.
             */
      const reversed = isReversed(
          aStartNode, aStartOffset, bStartNode, bStartOffset);
      return reversed ? 1 : -1;
    });
  }
  return this.sortedRanges_;
};


/** @override */
MultiRange.prototype.getStartNode = function() {
  return this.getSortedRanges()[0].getStartNode();
};


/** @override */
MultiRange.prototype.getStartOffset = function() {
  return this.getSortedRanges()[0].getStartOffset();
};


/** @override */
MultiRange.prototype.getEndNode = function() {
  // NOTE(robbyw): This may return the wrong node if any subranges overlap.
  return array.peek(this.getSortedRanges()).getEndNode();
};


/** @override */
MultiRange.prototype.getEndOffset = function() {
  // NOTE(robbyw): This may return the wrong value if any subranges overlap.
  return array.peek(this.getSortedRanges()).getEndOffset();
};


/** @override */
MultiRange.prototype.isRangeInDocument = function() {
  return this.getTextRanges().every(function(range) {
    return range.isRangeInDocument();
  });
};


/** @override */
MultiRange.prototype.isCollapsed = function() {
  return this.browserRanges_.length == 0 ||
      this.browserRanges_.length == 1 && this.getTextRange(0).isCollapsed();
};


/** @override */
MultiRange.prototype.getText = function() {
  return this.getTextRanges()
      .map(function(range) {
    return range.getText();
  })
      .join('');
};


/** @override */
MultiRange.prototype.getHtmlFragment = function() {
  return this.getValidHtml();
};


/** @override */
MultiRange.prototype.getValidHtml = function() {
  // NOTE(robbyw): This does not behave well if the sub-ranges overlap.
  return this.getTextRanges()
      .map(function(range) {
    return range.getValidHtml();
  })
      .join('');
};


/** @override */
MultiRange.prototype.getPastableHtml = function() {
  // TODO(robbyw): This should probably do something smart like group TR and TD
  // selections in to the same table.
  return this.getValidHtml();
};


/**
 * @override
 * @param {boolean=} opt_keys Unused for this iterator.
 * @return {!RangeIterator} An iterator over tags in the range.
 */
MultiRange.prototype.__iterator__ = function(opt_keys) {
  return new MultiRangeIterator(this);
};


// RANGE ACTIONS


/**
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
MultiRange.prototype.select = function() {
  var selection =
      AbstractRange.getBrowserSelectionForWindow(this.getWindow());
  selection.removeAllRanges();
  for (var i = 0, len = this.getTextRangeCount(); i < len; i++) {
    selection.addRange(this.getTextRange(i).getBrowserRangeObject());
  }
};


/** @override */
MultiRange.prototype.removeContents = function() {
  this.getTextRanges().forEach(function(range) {
    range.removeContents();
  });
};


// SAVE/RESTORE


/** @override */
MultiRange.prototype.saveUsingDom = function() {
  return new DomSavedMultiRange_(this);
};

/** @override */
MultiRange.prototype.saveUsingCarets = function() {
  return (this.getStartNode() && this.getEndNode()) ?
      new SavedCaretRange(this) :
      null;
};

// RANGE MODIFICATION


/**
 * Collapses this range to a single point, either the first or last point
 * depending on the parameter.  This will result in the number of ranges in this
 * multi range becoming 1.
 * @param {boolean} toAnchor Whether to collapse to the anchor.
 * @override
 */
MultiRange.prototype.collapse = function(toAnchor) {
  if (!this.isCollapsed()) {
    var range = toAnchor ? this.getTextRange(0) :
                           this.getTextRange(this.getTextRangeCount() - 1);

    this.clearCachedValues_();
    range.collapse(toAnchor);
    this.ranges_ = [range];
    this.sortedRanges_ = [range];
    this.browserRanges_ = [range.getBrowserRangeObject()];
  }
};


/**
 * Tests if this range contains the given node.
 * @param {Node} node The node to test for.
 * @param {boolean=} opt_allowPartial If not set or false, the node must be
 *     entirely contained in the selection for this function to return true.
 * @return {boolean} Whether this range contains the given node.
 * @override
 */
MultiRange.prototype.containsNode = function(
  node, opt_allowPartial) {
return this.containsRange(
    TextRange.createFromNodeContents(node), opt_allowPartial);
};


// SAVED RANGE OBJECTS



/**
 * A SavedRange implementation using DOM endpoints.
 * @param {MultiRange} range The range to save.
 * @constructor
 * @extends {SavedRange}
 * @private
 */
function DomSavedMultiRange_(range) {
  /**
     * Array of saved ranges.
     * @type {Array<SavedRange>}
     * @private
     */
  this.savedRanges_ = range.getTextRanges().map(function(range) {
    return range.saveUsingDom();
  });
};
goog.inherits(DomSavedMultiRange_, SavedRange);


/**
 * @return {!MultiRange} The restored range.
 * @override
 */
DomSavedMultiRange_.prototype.restoreInternal = function() {
  var ranges = this.savedRanges_.map(function(savedRange) {
    return savedRange.restore();
  });
  return MultiRange.createFromTextRanges(ranges);
};


/** @override */
DomSavedMultiRange_.prototype.disposeInternal = function() {
  DomSavedMultiRange_.superClass_.disposeInternal.call(this);

  this.savedRanges_.forEach(function(savedRange) {
    savedRange.dispose();
  });
  delete this.savedRanges_;
};


// RANGE ITERATION



/**
 * Subclass of dom.TagIterator that iterates over a DOM range.  It
 * adds functions to determine the portion of each text node that is selected.
 *
 * @param {MultiRange} range The range to traverse.
 * @constructor
 * @extends {RangeIterator}
 * @final
 */
export function MultiRangeIterator(range) {
  /**
     * The list of range iterators left to traverse.
     * @private {?Array<?RangeIterator>}
     */
  this.iterators_ = null;

  /**
   * The index of the current sub-iterator being traversed.
   * @private {number}
   */
  this.currentIdx_ = 0;

  if (range) {
    this.iterators_ = range.getSortedRanges().map(function(r) {
      return iter.toIterator(r);
    });
  }

  MultiRangeIterator.base(
      this, 'constructor', range ? this.getStartNode() : null, false);
}
goog.inherits(MultiRangeIterator, RangeIterator);


/** @override */
MultiRangeIterator.prototype.getStartTextOffset = function() {
  return this.iterators_[this.currentIdx_].getStartTextOffset();
};


/** @override */
MultiRangeIterator.prototype.getEndTextOffset = function() {
  return this.iterators_[this.currentIdx_].getEndTextOffset();
};


/** @override */
MultiRangeIterator.prototype.getStartNode = function() {
  return this.iterators_[0].getStartNode();
};


/** @override */
MultiRangeIterator.prototype.getEndNode = function() {
  return array.peek(this.iterators_).getEndNode();
};


/** @override */
MultiRangeIterator.prototype.isLast = function() {
  return this.iterators_[this.currentIdx_].isLast();
};


/**
 * @return {!IIterableResult<!Node>}
 * @override
 */
MultiRangeIterator.prototype.next = function() {
  while (this.currentIdx_ < this.iterators_.length) {
    const iterator = this.iterators_[this.currentIdx_];
    const it = iterator.next();
    if (it.done) {
      this.currentIdx_++;
      // Try again from the top, will move to return 'done' if no more iterators
      continue;
    }
    this.setPosition(iterator.node, iterator.tagType, iterator.depth);
    return it;
  }
  return iter.ES6_ITERATOR_DONE;
};


/** @override */
MultiRangeIterator.prototype.copyFrom = function(other) {
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  this.iterators_ = array.clone(other.iterators_);
  MultiRangeIterator.superClass_.copyFrom.call(this, other);
};


/**
 * @return {!MultiRangeIterator} An identical iterator.
 * @override
 */
MultiRangeIterator.prototype.clone = function() {
  var copy = new MultiRangeIterator(null);
  copy.copyFrom(this);
  return copy;
};
