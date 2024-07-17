/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utilities for working with IE control ranges.
 *
 * @suppress {strictMissingProperties}
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
import { TagWalkType } from './tagiterator.js';
import { TextRange } from './textrange.js';
import * as iter from '../iter/iter.js';
import * as userAgent from '../useragent/useragent.js';



/**
 * Create a new control selection with no properties.  Do not use this
 * constructor: use one of the dom.Range.createFrom* methods instead.
 * @constructor
 * @extends {AbstractMultiRange}
 * @final
 */
export function ControlRange() {
  /**
   * The IE control range obejct.
   * @private {?Object}
   */
  this.range_ = null;

  /**
   * Cached list of elements.
   * @private {?Array<?Element>}
   */
  this.elements_ = null;

  /**
   * Cached sorted list of elements.
   * @private {?Array<?Element>}
   */
  this.sortedElements_ = null;
}
goog.inherits(ControlRange, AbstractMultiRange);


/**
 * Create a new range wrapper from the given browser range object.  Do not use
 * this method directly - please use dom.Range.createFrom* instead.
 * @param {Object} controlRange The browser range object.
 * @return {!ControlRange} A range wrapper object.
 */
ControlRange.createFromBrowserRange = function(controlRange) {
  var range = new ControlRange();
  range.range_ = controlRange;
  return range;
};


/**
 * Create a new range wrapper that selects the given element.  Do not use
 * this method directly - please use dom.Range.createFrom* instead.
 * @param {...Element} var_args The element(s) to select.
 * @return {!ControlRange} A range wrapper object.
 */
ControlRange.createFromElements = function(var_args) {
  var range = dom.getOwnerDocument(arguments[0]).body.createControlRange();
  for (var i = 0, len = arguments.length; i < len; i++) {
    range.addElement(arguments[i]);
  }
  return ControlRange.createFromBrowserRange(range);
};


// Method implementations


/**
 * Clear cached values.
 * @private
 */
ControlRange.prototype.clearCachedValues_ = function() {
  this.elements_ = null;
  this.sortedElements_ = null;
};


/** @override */
ControlRange.prototype.clone = function() {
  return ControlRange.createFromElements.apply(
      this, this.getElements());
};


/** @override */
ControlRange.prototype.getType = function() {
  return RangeType.CONTROL;
};


/** @override */
ControlRange.prototype.getBrowserRangeObject = function() {
  return this.range_ || document.body.createControlRange();
};


/** @override */
ControlRange.prototype.setBrowserRangeObject = function(nativeRange) {
  if (!AbstractRange.isNativeControlRange(nativeRange)) {
    return false;
  }
  this.range_ = nativeRange;
  return true;
};


/** @override */
ControlRange.prototype.getTextRangeCount = function() {
  return this.range_ ? this.range_.length : 0;
};


/** @override */
ControlRange.prototype.getTextRange = function(i) {
  return TextRange.createFromNodeContents(this.range_.item(i));
};


/** @override */
ControlRange.prototype.getContainer = function() {
  return dom.findCommonAncestor.apply(null, this.getElements());
};


/** @override */
ControlRange.prototype.getStartNode = function() {
  return this.getSortedElements()[0];
};


/** @override */
ControlRange.prototype.getStartOffset = function() {
  return 0;
};


/** @override */
ControlRange.prototype.getEndNode = function() {
  var sorted = this.getSortedElements();
  var startsLast = /** @type {Node} */ (array.peek(sorted));
  return /** @type {Node} */ (sorted.find(function(el) {
        return dom.contains(el, startsLast);
      }));
};


/** @override */
ControlRange.prototype.getEndOffset = function() {
  return this.getEndNode().childNodes.length;
};


// TODO(robbyw): Figure out how to unify getElements with TextRange API.
/**
 * @return {!Array<Element>} Array of elements in the control range.
 */
ControlRange.prototype.getElements = function() {
  if (!this.elements_) {
    this.elements_ = [];
    if (this.range_) {
      for (var i = 0; i < this.range_.length; i++) {
        this.elements_.push(this.range_.item(i));
      }
    }
  }

  return this.elements_;
};


/**
 * @return {!Array<Element>} Array of elements comprising the control range,
 *     sorted by document order.
 */
ControlRange.prototype.getSortedElements = function() {
  if (!this.sortedElements_) {
    this.sortedElements_ = this.getElements().concat();
    this.sortedElements_.sort(function(a, b) {
      return a.sourceIndex - b.sourceIndex;
    });
  }

  return this.sortedElements_;
};


/** @override */
ControlRange.prototype.isRangeInDocument = function() {
  var returnValue = false;

  try {
    returnValue = this.getElements().every(function(element) {
      // On IE, this throws an exception when the range is detached.
      return userAgent.IE ?
          !!element.parentNode :
          dom.contains(element.ownerDocument.body, element);
    });
  } catch (e) {
    // IE sometimes throws Invalid Argument errors for detached elements.
    // Note: trying to return a value from the above try block can cause IE
    // to crash.  It is necessary to use the local returnValue.
  }

  return returnValue;
};


/** @override */
ControlRange.prototype.isCollapsed = function() {
  return !this.range_ || !this.range_.length;
};


/** @override */
ControlRange.prototype.getText = function() {
  // TODO(robbyw): What about for table selections?  Should those have text?
  return '';
};


/** @override */
ControlRange.prototype.getHtmlFragment = function() {
  return this.getSortedElements().map(dom.getOuterHtml).join('');
};


/** @override */
ControlRange.prototype.getValidHtml = function() {
  return this.getHtmlFragment();
};


/** @override */
ControlRange.prototype.getPastableHtml =
    ControlRange.prototype.getValidHtml;


/**
 * @override
 * @param {boolean=} opt_keys Unused for this iterator.
 * @return {!RangeIterator} An iterator over tags in the range.
 */
ControlRange.prototype.__iterator__ = function(opt_keys) {
  return new ControlRangeIterator(this);
};


/**
 * Tests if this range contains the given node.
 * @param {Node} node The node to test for.
 * @param {boolean=} opt_allowPartial If not set or false, the node must be
 *     entirely contained in the selection for this function to return true.
 * @return {boolean} Whether this range contains the given node.
 * @override
 */
ControlRange.prototype.containsNode = function(
  node, opt_allowPartial) {
return this.containsRange(
    TextRange.createFromNodeContents(node), opt_allowPartial);
};

// RANGE ACTIONS


/** @override */
ControlRange.prototype.select = function() {
  if (this.range_) {
    this.range_.select();
  }
};


/** @override */
ControlRange.prototype.removeContents = function() {
  // TODO(robbyw): Test implementing with execCommand('Delete')
  if (this.range_) {
    var nodes = [];
    for (var i = 0, len = this.range_.length; i < len; i++) {
      nodes.push(this.range_.item(i));
    }
    nodes.forEach(dom.removeNode);

    this.collapse(false);
  }
};


/** @override */
ControlRange.prototype.replaceContentsWithNode = function(node) {
  // Control selections have to have the node inserted before removing the
  // selection contents because a collapsed control range doesn't have start or
  // end nodes.
  var result = this.insertNode(node, true);

  if (!this.isCollapsed()) {
    this.removeContents();
  }

  return result;
};


// SAVE/RESTORE


/** @override */
ControlRange.prototype.saveUsingDom = function() {
  return new DomSavedControlRange_(this);
};

/** @override */
ControlRange.prototype.saveUsingCarets = function() {
  return (this.getStartNode() && this.getEndNode()) ?
      new SavedCaretRange(this) :
      null;
};

// RANGE MODIFICATION


/** @override */
ControlRange.prototype.collapse = function(toAnchor) {
  // TODO(robbyw): Should this return a text range?  If so, API needs to change.
  this.range_ = null;
  this.clearCachedValues_();
};


// SAVED RANGE OBJECTS



/**
 * A SavedRange implementation using DOM endpoints.
 * @param {ControlRange} range The range to save.
 * @constructor
 * @extends {SavedRange}
 * @private
 */
function DomSavedControlRange_(range) {
  /**
   * The element list.
   * @type {Array<Element>}
   * @private
   */
  this.elements_ = range.getElements();
};
goog.inherits(DomSavedControlRange_, SavedRange);


/** @override */
DomSavedControlRange_.prototype.restoreInternal = function() {
  var doc = this.elements_.length ?
      dom.getOwnerDocument(this.elements_[0]) :
      document;
  var controlRange = doc.body.createControlRange();
  for (var i = 0, len = this.elements_.length; i < len; i++) {
    controlRange.addElement(this.elements_[i]);
  }
  return ControlRange.createFromBrowserRange(controlRange);
};


/** @override */
DomSavedControlRange_.prototype.disposeInternal = function() {
  DomSavedControlRange_.superClass_.disposeInternal.call(this);
  delete this.elements_;
};


// RANGE ITERATION



/**
 * Subclass of dom.TagIterator that iterates over a DOM range.  It
 * adds functions to determine the portion of each text node that is selected.
 *
 * @param {ControlRange?} range The range to traverse.
 * @constructor
 * @extends {RangeIterator}
 * @final
 */
export function ControlRangeIterator(range) {
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
   * The list of elements left to traverse.
   * @private {Array<?Element>?}
   */
  this.elements_ = null;

  if (range) {
    this.elements_ = range.getSortedElements();
    this.startNode_ = this.elements_.shift();
    this.endNode_ = /** @type {Node} */ (array.peek(this.elements_)) ||
        this.startNode_;
  }

  ControlRangeIterator.base(
      this, 'constructor', this.startNode_, false);
}
goog.inherits(ControlRangeIterator, RangeIterator);


/** @override */
ControlRangeIterator.prototype.getStartTextOffset = function() {
  return 0;
};


/** @override */
ControlRangeIterator.prototype.getEndTextOffset = function() {
  return 0;
};


/** @override */
ControlRangeIterator.prototype.getStartNode = function() {
  return this.startNode_;
};


/** @override */
ControlRangeIterator.prototype.getEndNode = function() {
  return this.endNode_;
};


/** @override */
ControlRangeIterator.prototype.isLast = function() {
  return !this.depth && !this.elements_.length;
};


/**
 * Move to the next position in the selection.
 * Throws `iter.StopIteration` when it passes the end of the range.
 * @return {!IIterableResult<!Node>} The node at the next position.
 * @override
 */
ControlRangeIterator.prototype.next = function() {
  // Iterate over each element in the range, and all of its children.
  if (this.isLast()) {
    return iter.ES6_ITERATOR_DONE;
  } else if (!this.depth) {
    var el = this.elements_.shift();
    this.setPosition(
        el, TagWalkType.START_TAG, TagWalkType.START_TAG);
    return iter.createEs6IteratorYield(/** @type {!Node} */ (el));
  }

  // Call the super function.
  return ControlRangeIterator.superClass_.next.call(this);
};


/** @override */
ControlRangeIterator.prototype.copyFrom = function(other) {
  var that = /** @type {!ControlRangeIterator} */ (other);
  this.elements_ = that.elements_;
  this.startNode_ = that.startNode_;
  this.endNode_ = that.endNode_;

  ControlRangeIterator.superClass_.copyFrom.call(this, that);
};


/**
 * @return {!ControlRangeIterator} An identical iterator.
 * @override
 */
ControlRangeIterator.prototype.clone = function() {
  var copy = new ControlRangeIterator(null);
  copy.copyFrom(this);
  return copy;
};
