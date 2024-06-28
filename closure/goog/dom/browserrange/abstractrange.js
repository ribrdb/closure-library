/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Definition of the browser range interface.
 *
 * DO NOT USE THIS FILE DIRECTLY.  Use dom.Range instead.
 */


goog.declareModuleId('goog.dom.browserrange.abstractrange');

import * as array from '../../array/array.js';
import * as asserts from '../../asserts/asserts.js';
import * as dom from '../dom.js';
import { NodeType } from '../nodetype.js';
import { RangeEndpoint } from '../rangeendpoint.js';
import { TagName } from '../tagname.js';
import { TextRangeIterator } from '../textrangeiterator.js';
import * as iter from '../../iter/iter.js';
import { Coordinate } from '../../math/coordinate.js';
import * as googString from '../../string/string.js';
import { StringBuffer } from '../../string/stringbuffer.js';
import * as userAgent from '../../useragent/useragent.js';
const {RangeIterator} = goog.requireType('goog.dom.abstractrange');



/**
 * The constructor for abstract ranges.  Don't call this from subclasses.
 * @constructor
 */
export function AbstractRange() {}


/**
 * @return {AbstractRange} A clone of this range.
 */
AbstractRange.prototype.clone = goog.abstractMethod;


/**
 * Returns the browser native implementation of the range.  Please refrain from
 * using this function - if you find you need the range please add wrappers for
 * the functionality you need rather than just using the native range.
 * @return {Range|TextRange} The browser native range object.
 */
AbstractRange.prototype.getBrowserRange =
    goog.abstractMethod;


/**
 * Returns the deepest node in the tree that contains the entire range.
 * @return {Node} The deepest node that contains the entire range.
 */
AbstractRange.prototype.getContainer =
    goog.abstractMethod;


/**
 * Returns the node the range starts in.
 * @return {Node} The element or text node the range starts in.
 */
AbstractRange.prototype.getStartNode =
    goog.abstractMethod;


/**
 * Returns the offset into the node the range starts in.
 * @return {number} The offset into the node the range starts in.  For text
 *     nodes, this is an offset into the node value.  For elements, this is
 *     an offset into the childNodes array.
 */
AbstractRange.prototype.getStartOffset =
    goog.abstractMethod;


/**
 * @return {Coordinate} The coordinate of the selection start node
 *     and offset.
 */
AbstractRange.prototype.getStartPosition = function() {
 return this.getPosition_(true);
};


/**
 * Returns the node the range ends in.
 * @return {Node} The element or text node the range ends in.
 */
AbstractRange.prototype.getEndNode = goog.abstractMethod;


/**
 * Returns the offset into the node the range ends in.
 * @return {number} The offset into the node the range ends in.  For text
 *     nodes, this is an offset into the node value.  For elements, this is
 *     an offset into the childNodes array.
 */
AbstractRange.prototype.getEndOffset =
    goog.abstractMethod;


/**
 * @return {Coordinate} The coordinate of the selection end node
 *     and offset.
 */
AbstractRange.prototype.getEndPosition = function() {
 return this.getPosition_(false);
};


/**
 * @param {boolean} start Whether to get the position of the start or end.
 * @return {Coordinate} The coordinate of the selection point.
 * @private
 * @suppress {missingProperties} circular definitions
 */
AbstractRange.prototype.getPosition_ = function(start) {
 asserts.assert(
     this.range_.getClientRects,
     'Getting selection coordinates is not supported.');

 var rects = this.range_.getClientRects();
 if (rects.length) {
   var r = start ? rects[0] : array.peek(rects);
   return new Coordinate(
       start ? r.left : r.right, start ? r.top : r.bottom);
 }
 return null;
};


/**
 * Compares one endpoint of this range with the endpoint of another browser
 * native range object.
 * @param {Range|TextRange} range The browser native range to compare against.
 * @param {RangeEndpoint} thisEndpoint The endpoint of this range
 *     to compare with.
 * @param {RangeEndpoint} otherEndpoint The endpoint of the other
 *     range to compare with.
 * @return {number} 0 if the endpoints are equal, negative if this range
 *     endpoint comes before the other range endpoint, and positive otherwise.
 */
AbstractRange.prototype.compareBrowserRangeEndpoints =
    goog.abstractMethod;


/**
 * Tests if this range contains the given range.
 * @param {AbstractRange} abstractRange The range to test.
 * @param {boolean=} opt_allowPartial If not set or false, the range must be
 *     entirely contained in the selection for this function to return true.
 * @return {boolean} Whether this range contains the given range.
 */
AbstractRange.prototype.containsRange = function(
    abstractRange, opt_allowPartial) {
 // IE sometimes misreports the boundaries for collapsed ranges. So if the
 // other range is collapsed, make sure the whole range is contained. This is
 // logically equivalent, and works around IE's bug.
 var checkPartial = opt_allowPartial && !abstractRange.isCollapsed();

 var range = abstractRange.getBrowserRange();
 var start = RangeEndpoint.START, end = RangeEndpoint.END;

 try {
   if (checkPartial) {
     // There are two ways to not overlap.  Being before, and being after.
     // Before is represented by this.end before range.start: comparison < 0.
     // After is represented by this.start after range.end: comparison > 0.
     // The below is the negation of not overlapping.
     return this.compareBrowserRangeEndpoints(range, end, start) >= 0 &&
         this.compareBrowserRangeEndpoints(range, start, end) <= 0;

   } else {
     // Return true if this range bounds the parameter range from both sides.
     return this.compareBrowserRangeEndpoints(range, end, end) >= 0 &&
         this.compareBrowserRangeEndpoints(range, start, start) <= 0;
   }
 } catch (e) {
   if (!userAgent.IE) {
     throw e;
   }
   // IE sometimes throws exceptions when one range is invalid, i.e. points
   // to a node that has been removed from the document.  Return false in this
   // case.
   return false;
 }
};


/**
 * Tests if this range contains the given node.
 * @param {Node} node The node to test.
 * @param {boolean=} opt_allowPartial If not set or false, the node must be
 *     entirely contained in the selection for this function to return true.
 * @return {boolean} Whether this range contains the given node.
 * @suppress {missingRequire,missingProperties} Cannot depend on
 *     dom.browserrange because it creates a circular dependency.
 */
AbstractRange.prototype.containsNode = function(
    node, opt_allowPartial) {
 /** @suppress {missingRequire} Circular dep with browserrange */
 return this.containsRange(
     dom.browserrange.createRangeFromNodeContents(node),
     opt_allowPartial);
};


/**
 * Tests if the selection is collapsed - i.e. is just a caret.
 * @return {boolean} Whether the range is collapsed.
 */
AbstractRange.prototype.isCollapsed = goog.abstractMethod;


/**
 * @return {string} The text content of the range.
 */
AbstractRange.prototype.getText = goog.abstractMethod;


/**
 * Returns the HTML fragment this range selects.  This is slow on all browsers.
 * @return {string} HTML fragment of the range, does not include context
 *     containing elements.
 * @suppress {missingProperties}
 */
AbstractRange.prototype.getHtmlFragment = function() {
 var output = new StringBuffer();
 iter.forEach(this, function(node, ignore, it) {
  if (node.nodeType == NodeType.TEXT) {
    output.append(
        googString.htmlEscape(
            node.nodeValue.substring(
                it.getStartTextOffset(), it.getEndTextOffset())));
  } else if (node.nodeType == NodeType.ELEMENT) {
    if (it.isEndTag()) {
      if (dom.canHaveChildren(node)) {
        output.append('</' + node.tagName + '>');
      }
    } else {
      var shallow = node.cloneNode(false);
      var html = dom.getOuterHtml(shallow);
      if (userAgent.IE && node.tagName == TagName.LI) {
        // For an LI, IE just returns "<li>" with no closing tag
        output.append(html);
      } else {
        var index = html.lastIndexOf('<');
        // if index is -1, then this appends nothing.
        // if index is 0, then the entire HTML content should be added.
        // if the index is > 0, then only the portion of the html before the
        // last open tag is appended.
        if (index !== -1) {
          output.append(index > 0 ? html.slice(0, index) : html);
        }
      }
    }
  }
 }, this);

 return output.toString();
};


/**
 * Returns valid HTML for this range.  This is fast on IE, and semi-fast on
 * other browsers.
 * @return {string} Valid HTML of the range, including context containing
 *     elements.
 */
AbstractRange.prototype.getValidHtml =
    goog.abstractMethod;


/**
 * Returns a RangeIterator over the contents of the range.  Regardless of the
 * direction of the range, the iterator will move in document order.
 * @param {boolean=} opt_keys Unused for this iterator.
 * @return {!RangeIterator} An iterator over tags in the range.
 */
AbstractRange.prototype.__iterator__ = function(
    opt_keys) {
 return new TextRangeIterator(
     this.getStartNode(), this.getStartOffset(), this.getEndNode(),
     this.getEndOffset());
};


// SELECTION MODIFICATION


/**
 * Set this range as the selection in its window.
 * @param {boolean=} opt_reverse Whether to select the range in reverse,
 *     if possible.
 */
AbstractRange.prototype.select = goog.abstractMethod;


/**
 * Removes the contents of the range from the document.  As a side effect, the
 * selection will be collapsed.  The behavior of content removal is normalized
 * across browsers.  For instance, IE sometimes creates extra text nodes that
 * a W3C browser does not.  That behavior is corrected for.
 */
AbstractRange.prototype.removeContents =
    goog.abstractMethod;


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
AbstractRange.prototype.surroundContents =
    goog.abstractMethod;


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
 * Surrounds this range with the two given nodes.  The range may be disrupted
 * beyond recovery because of the way this splits nodes.
 * @param {Element} startNode The node to insert at the start.
 * @param {Element} endNode The node to insert at the end.
 */
AbstractRange.prototype.surroundWithNodes =
    goog.abstractMethod;


/**
 * Collapses the range to one of its boundary points.
 * @param {boolean} toStart Whether to collapse to the start of the range.
 */
AbstractRange.prototype.collapse = goog.abstractMethod;
