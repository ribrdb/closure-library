/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utilties for working with ranges.
 */

import * as dom from '../dom/dom.js';

import { NodeType } from '../dom/nodetype.js';
import * as Range from '../dom/range.js';
import { RangeEndpoint } from '../dom/rangeendpoint.js';
import { SavedCaretRange } from '../dom/savedcaretrange.js';
import * as editorNode from './node.js';
import * as style from './style.js';
import * as iter from '../iter/iter.js';
import * as userAgent from '../useragent/useragent.js';
const { AbstractRange } = goog.requireType('goog.dom.abstractrange');
const { TagName } = goog.requireType('goog.dom.tagname');


/**
 * Given a range and an element, create a narrower range that is limited to the
 * boundaries of the element. If the range starts (or ends) outside the
 * element, the narrowed range's start point (or end point) will be the
 * leftmost (or rightmost) leaf of the element.
 * @param {AbstractRange} range The range.
 * @param {Element} el The element to limit the range to.
 * @return {AbstractRange} A new narrowed range, or null if the
 *     element does not contain any part of the given range.
 */
export function narrow(range, el) {
  var startContainer = range.getStartNode();
  var endContainer = range.getEndNode();

  if (startContainer && endContainer) {
    var isElement = function(node) {
      return node == el;
    };
    var hasStart = dom.getAncestor(startContainer, isElement, true);
    var hasEnd = dom.getAncestor(endContainer, isElement, true);

    if (hasStart && hasEnd) {
      // The range is contained entirely within this element.
      return range.clone();
    } else if (hasStart) {
      // The range starts inside the element, but ends outside it.
      var leaf = editorNode.getRightMostLeaf(el);
      return Range.createFromNodes(
          range.getStartNode(), range.getStartOffset(), leaf,
          editorNode.getLength(leaf));
    } else if (hasEnd) {
      // The range starts outside the element, but ends inside it.
      return Range.createFromNodes(
          editorNode.getLeftMostLeaf(el), 0, range.getEndNode(),
          range.getEndOffset());
    }
  }

  // The selection starts and ends outside the element.
  return null;
}


/**
 * Given a range, expand the range to include outer tags if the full contents of
 * those tags are entirely selected.  This essentially changes the dom position,
 * but not the visible position of the range.
 * Ex. <code><li>foo</li></code> if "foo" is selected, instead of returning
 * start and end nodes as the foo text node, return the li.
 * @param {AbstractRange} range The range.
 * @param {Node=} opt_stopNode Optional node to stop expanding past.
 * @return {!AbstractRange} The expanded range.
 */
export function expand(range, opt_stopNode) {
  // Expand the start out to the common container.
  var expandedRange = expandEndPointToContainer_(
      range, RangeEndpoint.START, opt_stopNode);
  // Expand the end out to the common container.
  expandedRange = expandEndPointToContainer_(
      expandedRange, RangeEndpoint.END, opt_stopNode);

  var startNode = expandedRange.getStartNode();
  var endNode = expandedRange.getEndNode();
  var startOffset = expandedRange.getStartOffset();
  var endOffset = expandedRange.getEndOffset();

  // If we have reached a common container, now expand out.
  if (startNode == endNode) {
    while (endNode != opt_stopNode && startOffset == 0 &&
           endOffset == editorNode.getLength(endNode)) {
      // Select the parent instead.
      var parentNode = endNode.parentNode;
      startOffset =
          Array.prototype.indexOf.call(parentNode.childNodes, endNode);
      endOffset = startOffset + 1;
      endNode = parentNode;
    }
    startNode = endNode;
  }

  return Range.createFromNodes(
      startNode, startOffset, endNode, endOffset);
}


/**
 * Given a range, expands the start or end points as far out towards the
 * range's common container (or stopNode, if provided) as possible, while
 * perserving the same visible position.
 *
 * @param {AbstractRange} range The range to expand.
 * @param {RangeEndpoint} endpoint The endpoint to expand.
 * @param {Node=} opt_stopNode Optional node to stop expanding past.
 * @return {!AbstractRange} The expanded range.
 * @private
 */
function expandEndPointToContainer_(range, endpoint, opt_stopNode) {
  var expandStart = endpoint == RangeEndpoint.START;
  var node = expandStart ? range.getStartNode() : range.getEndNode();
  var offset = expandStart ? range.getStartOffset() : range.getEndOffset();
  var container = range.getContainerElement();

  // Expand the node out until we reach the container or the stop node.
  while (node != container && node != opt_stopNode) {
    // It is only valid to expand the start if we are at the start of a node
    // (offset 0) or expand the end if we are at the end of a node
    // (offset length).
    if (expandStart && offset != 0 ||
        !expandStart && offset != editorNode.getLength(node)) {
      break;
    }

    var parentNode = node.parentNode;
    var index = Array.prototype.indexOf.call(parentNode.childNodes, node);
    offset = expandStart ? index : index + 1;
    node = parentNode;
  }

  return Range.createFromNodes(
      expandStart ? node : range.getStartNode(),
      expandStart ? offset : range.getStartOffset(),
      expandStart ? range.getEndNode() : node,
      expandStart ? range.getEndOffset() : offset);
}


/**
 * Cause the window's selection to be the start of this node.
 * @param {Node} node The node to select the start of.
 */
export function selectNodeStart(node) {
  Range.createCaret(editorNode.getLeftMostLeaf(node), 0)
      .select();
}


/**
 * Position the cursor immediately to the left or right of "node".
 * In Firefox, the selection parent is outside of "node", so the cursor can
 * effectively be moved to the end of a link node, without being considered
 * inside of it.
 * Note: This does not always work in WebKit. In particular, if you try to
 * place a cursor to the right of a link, typing still puts you in the link.
 * Bug: http://bugs.webkit.org/show_bug.cgi?id=17697
 * @param {Node} node The node to position the cursor relative to.
 * @param {boolean} toLeft True to place it to the left, false to the right.
 * @return {!AbstractRange} The newly selected range.
 */
export function placeCursorNextTo(node, toLeft) {
  var parent = node.parentNode;
  var offset =
      Array.prototype.indexOf.call(parent.childNodes, node) + (toLeft ? 0 : 1);
  var point =
      Point.createDeepestPoint(parent, offset, toLeft, true);
  var range = Range.createCaret(point.node, point.offset);
  range.select();
  return range;
}


/**
 * Normalizes the node, preserving the selection of the document.
 *
 * May also normalize things outside the node, if it is more efficient to do so.
 *
 * @param {Node} node The node to normalize.
 */
export function selectionPreservingNormalize(node) {
  var doc = dom.getOwnerDocument(node);
  var selection = Range.createFromWindow(dom.getWindow(doc));
  var normalizedRange =
      rangePreservingNormalize(node, selection);
  if (normalizedRange) {
    normalizedRange.select();
  }
}


/**
 * Manually normalizes the node in IE, since native normalize in IE causes
 * transient problems.
 * @param {Node} node The node to normalize.
 * @private
 */
function normalizeNodeIe_(node) {
  var lastText = null;
  var child = node.firstChild;
  while (child) {
    var next = child.nextSibling;
    if (child.nodeType == NodeType.TEXT) {
      if (child.nodeValue == '') {
        node.removeChild(child);
      } else if (lastText) {
        lastText.nodeValue += child.nodeValue;
        node.removeChild(child);
      } else {
        lastText = child;
      }
    } else {
      normalizeNodeIe_(child);
      lastText = null;
    }
    child = next;
  }
}


/**
 * Normalizes the given node.
 * @param {Node} node The node to normalize.
 */
export function normalizeNode(node) {
  if (userAgent.IE) {
    normalizeNodeIe_(node);
  } else {
    node.normalize();
  }
}


/**
 * Normalizes the node, preserving a range of the document.
 *
 * May also normalize things outside the node, if it is more efficient to do so.
 *
 * @param {Node} node The node to normalize.
 * @param {AbstractRange?} range The range to normalize.
 * @return {AbstractRange?} The range, adjusted for normalization.
 */
export function rangePreservingNormalize(node, range) {
  if (range) {
    var rangeFactory = normalize(range);
    // WebKit has broken selection affinity, so carets tend to jump out of the
    // beginning of inline elements. This means that if we're doing the
    // normalize as the result of a range that will later become the selection,
    // we might not normalize something in the range after it is read back from
    // the selection. We can't just normalize the parentNode here because WebKit
    // can move the selection range out of multiple inline parents.
    var container = style.getContainer(range.getContainerElement());
  }

  if (container) {
    normalizeNode(
        dom.findCommonAncestor(container, node));
  } else if (node) {
    normalizeNode(node);
  }

  if (rangeFactory) {
    return rangeFactory();
  } else {
    return null;
  }
}


/**
 * Get the deepest point in the DOM that's equivalent to the endpoint of the
 * given range.
 *
 * @param {AbstractRange} range A range.
 * @param {boolean} atStart True for the start point, false for the end point.
 * @return {!Point} The end point, expressed as a node
 *    and an offset.
 */
export function getDeepEndPoint(range, atStart) {
  return atStart ? Point.createDeepestPoint(
                       range.getStartNode(), range.getStartOffset()) :
                   Point.createDeepestPoint(
                       range.getEndNode(), range.getEndOffset());
}


/**
 * Given a range in the current DOM, create a factory for a range that
 * represents the same selection in a normalized DOM. The factory function
 * should be invoked after the DOM is normalized.
 *
 * All browsers do a bad job preserving ranges across DOM normalization.
 * The issue is best described in this 5-year-old bug report:
 * https://bugzilla.mozilla.org/show_bug.cgi?id=191864
 * For most applications, this isn't a problem. The browsers do a good job
 * handling un-normalized text, so there's usually no reason to normalize.
 *
 * The exception to this rule is the rich text editing commands
 * execCommand and queryCommandValue, which will fail often if there are
 * un-normalized text nodes.
 *
 * The factory function creates new ranges so that we can normalize the DOM
 * without problems. It must be created before any normalization happens,
 * and invoked after normalization happens.
 *
 * @param {AbstractRange} range The range to normalize. It may
 *    become invalid after body.normalize() is called.
 * @return {function(): AbstractRange} A factory for a normalized
 *    range. Should be called after body.normalize() is called.
 */
export function normalize(range) {
  var isReversed = range.isReversed();
  var anchorPoint = normalizePoint_(
      getDeepEndPoint(range, !isReversed));
  var anchorParent = anchorPoint.getParentPoint();
  var anchorPreviousSibling = anchorPoint.node.previousSibling;
  if (anchorPoint.node.nodeType == NodeType.TEXT) {
    anchorPoint.node = null;
  }

  var focusPoint = normalizePoint_(
      getDeepEndPoint(range, isReversed));
  var focusParent = focusPoint.getParentPoint();
  var focusPreviousSibling = focusPoint.node.previousSibling;
  if (focusPoint.node.nodeType == NodeType.TEXT) {
    focusPoint.node = null;
  }

  return function() {
    if (!anchorPoint.node && anchorPreviousSibling) {
      // If anchorPoint.node was previously an empty text node with no siblings,
      // anchorPreviousSibling may not have a nextSibling since that node will
      // no longer exist.  Do our best and point to the end of the previous
      // element.
      anchorPoint.node = anchorPreviousSibling.nextSibling;
      if (!anchorPoint.node) {
        anchorPoint =
            Point.getPointAtEndOfNode(anchorPreviousSibling);
      }
    }

    if (!focusPoint.node && focusPreviousSibling) {
      // If focusPoint.node was previously an empty text node with no siblings,
      // focusPreviousSibling may not have a nextSibling since that node will no
      // longer exist.  Do our best and point to the end of the previous
      // element.
      focusPoint.node = focusPreviousSibling.nextSibling;
      if (!focusPoint.node) {
        focusPoint =
            Point.getPointAtEndOfNode(focusPreviousSibling);
      }
    }

    return Range.createFromNodes(
        anchorPoint.node || anchorParent.node.firstChild || anchorParent.node,
        anchorPoint.offset,
        focusPoint.node || focusParent.node.firstChild || focusParent.node,
        focusPoint.offset);
  };
}


/**
 * Given a point in the current DOM, adjust it to represent the same point in
 * a normalized DOM.
 *
 * See the comments on normalize for more context.
 *
 * @param {Point} point A point in the document.
 * @return {!Point} The same point, for easy chaining.
 * @private
 */
function normalizePoint_(point) {
  var previous;
  if (point.node.nodeType == NodeType.TEXT) {
    // If the cursor position is in a text node,
    // look at all the previous text siblings of the text node,
    // and set the offset relative to the earliest text sibling.
    for (var current = point.node.previousSibling;
         current && current.nodeType == NodeType.TEXT;
         current = current.previousSibling) {
      point.offset += editorNode.getLength(current);
    }

    previous = current;
  } else {
    previous = point.node.previousSibling;
  }

  var parent = point.node.parentNode;
  point.node = previous ? previous.nextSibling : parent.firstChild;
  return point;
}


/**
 * Checks if a range is completely inside an editable region.
 * @param {AbstractRange} range The range to test.
 * @return {boolean} Whether the range is completely inside an editable region.
 */
export function isEditable(range) {
  var rangeContainer = range.getContainerElement();

  // Closure's implementation of getContainerElement() is a little too
  // smart in IE when exactly one element is contained in the range.
  // It assumes that there's a user whose intent was actually to select
  // all that element's children, so it returns the element itself as its
  // own containing element.
  // This little sanity check detects this condition so we can account for it.
  var rangeContainerIsOutsideRange =
      range.getStartNode() != rangeContainer.parentElement;

  return (rangeContainerIsOutsideRange &&
          editorNode.isEditableContainer(rangeContainer)) ||
      editorNode.isEditable(rangeContainer);
}


/**
 * Returns whether the given range intersects with any instance of the given
 * tag.
 * @param {AbstractRange} range The range to check.
 * @param {!TagName} tagName The name of the tag.
 * @return {boolean} Whether the given range intersects with any instance of
 *     the given tag.
 */
export function intersectsTag(range, tagName) {
  if (dom.getAncestorByTagNameAndClass(
          range.getContainerElement(), tagName)) {
    return true;
  }

  return iter.some(range, function(node) {
    return node.tagName == tagName;
  });
}



/**
 * One endpoint of a range, represented as a Node and and offset.
 * @param {Node} node The node containing the point.
 * @param {number} offset The offset of the point into the node.
 * @constructor
 * @final
 */
export function Point(node, offset) {
  /**
   * The node containing the point.
   * @type {Node}
   */
  this.node = node;

  /**
   * The offset of the point into the node.
   * @type {number}
   */
  this.offset = offset;
}


/**
 * Gets the point of this point's node in the DOM.
 * @return {!Point} The node's point.
 */
Point.prototype.getParentPoint = function() {
  var parent = this.node.parentNode;
  return new Point(
      parent, Array.prototype.indexOf.call(parent.childNodes, this.node));
};


/**
 * Construct the deepest possible point in the DOM that's equivalent
 * to the given point, expressed as a node and an offset.
 * @param {Node} node The node containing the point.
 * @param {number} offset The offset of the point from the node.
 * @param {boolean=} opt_trendLeft Notice that a (node, offset) pair may be
 *     equivalent to more than one descendant (node, offset) pair in the DOM.
 *     By default, we trend rightward. If this parameter is true, then we
 *     trend leftward. The tendency to fall rightward by default is for
 *     consistency with other range APIs (like placeCursorNextTo).
 * @param {boolean=} opt_stopOnChildlessElement If true, and we encounter
 *     a Node which is an Element that cannot have children, we return a Point
 *     based on its parent rather than that Node itself.
 * @return {!Point} A new point.
 */
Point.createDeepestPoint = function(
    node, offset, opt_trendLeft, opt_stopOnChildlessElement) {
  while (node.nodeType == NodeType.ELEMENT) {
    var child = node.childNodes[offset];
    if (!child && !node.lastChild) {
      break;
    } else if (child) {
      var prevSibling = child.previousSibling;
      if (opt_trendLeft && prevSibling) {
        if (opt_stopOnChildlessElement &&
            Point.isTerminalElement_(prevSibling)) {
          break;
        }
        node = prevSibling;
        offset = editorNode.getLength(node);
      } else {
        if (opt_stopOnChildlessElement &&
            Point.isTerminalElement_(child)) {
          break;
        }
        node = child;
        offset = 0;
      }
    } else {
      if (opt_stopOnChildlessElement &&
          Point.isTerminalElement_(node.lastChild)) {
        break;
      }
      node = node.lastChild;
      offset = editorNode.getLength(node);
    }
  }

  return new Point(node, offset);
};


/**
 * Return true if the specified node is an Element that is not expected to have
 * children. The createDeepestPoint() method should not traverse into
 * such elements.
 * @param {Node} node .
 * @return {boolean} True if the node is an Element that does not contain
 *     child nodes (e.g. BR, IMG).
 * @private
 */
Point.isTerminalElement_ = function(node) {
  return (node.nodeType == NodeType.ELEMENT && !dom.canHaveChildren(node));
};


/**
 * Construct a point at the very end of the given node.
 * @param {Node} node The node to create a point for.
 * @return {!Point} A new point.
 */
Point.getPointAtEndOfNode = function(node) {
  return new Point(node, editorNode.getLength(node));
};


/**
 * Saves the range by inserting carets into the HTML.
 *
 * Unlike the regular saveUsingCarets, this SavedRange normalizes text nodes.
 * Browsers have other bugs where they don't handle split text nodes in
 * contentEditable regions right.
 *
 * @param {AbstractRange} range The abstract range object.
 * @return {!SavedCaretRange} A saved caret range that normalizes
 *     text nodes.
 */
export function saveUsingNormalizedCarets(range) {
  return new NormalizedCaretRange_(range);
}



/**
 * Saves the range using carets, but normalizes text nodes when carets
 * are removed.
 * @see saveUsingNormalizedCarets
 * @param {AbstractRange} range The range being saved.
 * @constructor
 * @extends {SavedCaretRange}
 * @private
 */
function NormalizedCaretRange_(range) {
  SavedCaretRange.call(this, range);
}
goog.inherits(
    NormalizedCaretRange_, SavedCaretRange);


/**
 * Normalizes text nodes whenever carets are removed from the document.
 * @param {AbstractRange=} opt_range A range whose offsets have already
 *     been adjusted for caret removal; it will be adjusted and returned if it
 *     is also affected by post-removal operations, such as text node
 *     normalization.
 * @return {AbstractRange|undefined} The adjusted range, if opt_range
 *     was provided.
 * @override
 */
NormalizedCaretRange_.prototype.removeCarets = function(
    opt_range) {
  var startCaret = this.getCaret(true);
  var endCaret = this.getCaret(false);
  var node = startCaret && endCaret ?
      dom.findCommonAncestor(startCaret, endCaret) :
      startCaret || endCaret;

  NormalizedCaretRange_.superClass_.removeCarets.call(this);

  if (opt_range) {
    return rangePreservingNormalize(node, opt_range);
  } else if (node) {
    selectionPreservingNormalize(node);
  }
};
