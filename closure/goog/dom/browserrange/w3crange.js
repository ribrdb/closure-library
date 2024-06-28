/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Definition of the W3C spec following range wrapper.
 *
 * DO NOT USE THIS FILE DIRECTLY.  Use dom.Range instead.
 */


import * as dom from '../dom.js';

import { NodeType } from '../nodetype.js';
import { RangeEndpoint } from '../rangeendpoint.js';
import { TagName } from '../tagname.js';
import { AbstractRange } from './abstractrange.js';
import * as googString from '../../string/string.js';
import * as userAgent from '../../useragent/useragent.js';
import { createFromNodes, createFromWindow } from '../range.js';
import { canContainRangeEndpoint } from './browserrange.js';



/**
 * The constructor for W3C specific browser ranges.
 * @param {Range} range The range object.
 * @constructor
 * @extends {AbstractRange}
 */
export function W3cRange(range) {
  this.range_ = range;
}
goog.inherits(
    W3cRange, AbstractRange);


/**
 * Returns a browser range spanning the given node's contents.
 * @param {Node} node The node to select.
 * @return {!Range} A browser range spanning the node's contents.
 * @protected
 * @suppress {missingProperties} circular definitions
 */
W3cRange.getBrowserRangeForNode = function(node) {
  var nodeRange = dom.getOwnerDocument(node).createRange();

  if (node.nodeType == NodeType.TEXT) {
    nodeRange.setStart(node, 0);
    nodeRange.setEnd(node, node.length);
  } else {
    /** @suppress {missingRequire} */
    if (!canContainRangeEndpoint(node)) {
      var rangeParent = node.parentNode;
      var rangeStartOffset =
          Array.prototype.indexOf.call(rangeParent.childNodes, node);
      nodeRange.setStart(rangeParent, rangeStartOffset);
      nodeRange.setEnd(rangeParent, rangeStartOffset + 1);
    } else {
      var tempNode, leaf = node;
      while ((tempNode = leaf.firstChild) &&
             /** @suppress {missingRequire} */
             canContainRangeEndpoint(tempNode)) {
        leaf = tempNode;
      }
      nodeRange.setStart(leaf, 0);

      leaf = node;
      /** @suppress {missingRequire} Circular dep with browserrange */
      while ((tempNode = leaf.lastChild) &&
             canContainRangeEndpoint(tempNode)) {
        leaf = tempNode;
      }
      nodeRange.setEnd(
          leaf, leaf.nodeType == NodeType.ELEMENT ?
              leaf.childNodes.length :
              leaf.length);
    }
  }

  return nodeRange;
};


/**
 * Returns a browser range spanning the given nodes.
 * @param {Node} startNode The node to start with - should not be a BR.
 * @param {number} startOffset The offset within the start node.
 * @param {Node} endNode The node to end with - should not be a BR.
 * @param {number} endOffset The offset within the end node.
 * @return {!Range} A browser range spanning the node's contents.
 * @protected
 */
W3cRange.getBrowserRangeForNodes = function(
    startNode, startOffset, endNode, endOffset) {
  // Create and return the range.
  var nodeRange = dom.getOwnerDocument(startNode).createRange();
  nodeRange.setStart(startNode, startOffset);
  nodeRange.setEnd(endNode, endOffset);
  return nodeRange;
};


/**
 * Creates a range object that selects the given node's text.
 * @param {Node} node The node to select.
 * @return {!W3cRange} A Gecko range wrapper object.
 */
W3cRange.createFromNodeContents = function(node) {
  return new W3cRange(
      W3cRange.getBrowserRangeForNode(node));
};


/**
 * Creates a range object that selects between the given nodes.
 * @param {Node} startNode The node to start with.
 * @param {number} startOffset The offset within the start node.
 * @param {Node} endNode The node to end with.
 * @param {number} endOffset The offset within the end node.
 * @return {!W3cRange} A wrapper object.
 */
W3cRange.createFromNodes = function(
    startNode, startOffset, endNode, endOffset) {
  return new W3cRange(
      W3cRange.getBrowserRangeForNodes(
          startNode, startOffset, endNode, endOffset));
};


/**
 * @return {!W3cRange} A clone of this range.
 * @override
 */
W3cRange.prototype.clone = function() {
  return new this.constructor(this.range_.cloneRange());
};


/** @override */
W3cRange.prototype.getBrowserRange = function() {
  return this.range_;
};


/** @override */
W3cRange.prototype.getContainer = function() {
  return this.range_.commonAncestorContainer;
};


/** @override */
W3cRange.prototype.getStartNode = function() {
  return this.range_.startContainer;
};


/** @override */
W3cRange.prototype.getStartOffset = function() {
  return this.range_.startOffset;
};


/** @override */
W3cRange.prototype.getEndNode = function() {
  return this.range_.endContainer;
};


/** @override */
W3cRange.prototype.getEndOffset = function() {
  return this.range_.endOffset;
};


/** @override */
W3cRange.prototype.compareBrowserRangeEndpoints =
    function(range, thisEndpoint, otherEndpoint) {
      return this.range_.compareBoundaryPoints(
          otherEndpoint == RangeEndpoint.START ?
              (thisEndpoint == RangeEndpoint.START ?
                   goog.global['Range'].START_TO_START :
                   goog.global['Range'].START_TO_END) :
              (thisEndpoint == RangeEndpoint.START ?
                   goog.global['Range'].END_TO_START :
                   goog.global['Range'].END_TO_END),
          /** @type {Range} */ (range));
    };


/** @override */
W3cRange.prototype.isCollapsed = function() {
  return this.range_.collapsed;
};


/** @override */
W3cRange.prototype.getText = function() {
  return this.range_.toString();
};


/** @override */
W3cRange.prototype.getValidHtml = function() {
  var div = dom.getDomHelper(this.range_.startContainer)
                .createDom(TagName.DIV);
  div.appendChild(/** @type {!Node} */ (this.range_.cloneContents()));
  var result = div.innerHTML;

  if (googString.startsWith(result, '<') ||
      !this.isCollapsed() && !googString.contains(result, '<')) {
    // We attempt to mimic IE, which returns no containing element when a
    // only text nodes are selected, does return the containing element when
    // the selection is empty, and does return the element when multiple nodes
    // are selected.
    return result;
  }

  var container = this.getContainer();
  container = container.nodeType == NodeType.ELEMENT ?
      container :
      container.parentNode;

  var html = dom.getOuterHtml(
      /** @type {!Element} */ (container.cloneNode(false)));
  return html.replace('>', '>' + result);
};


// SELECTION MODIFICATION


/** @override */
W3cRange.prototype.select = function(reverse) {
  var win = dom.getWindow(dom.getOwnerDocument(this.getStartNode()));
  this.selectInternal(win.getSelection(), reverse);
};


/**
 * Select this range.
 * @param {Selection} selection Browser selection object.
 * @param {*} reverse Whether to select this range in reverse.
 * @protected
 */
W3cRange.prototype.selectInternal = function(
    selection, reverse) {
  // Browser-specific tricks are needed to create reversed selections
  // programatically. For this generic W3C codepath, ignore the reverse
  // parameter.
  selection.removeAllRanges();
  selection.addRange(this.range_);
};


/** @override */
W3cRange.prototype.removeContents = function() {
  var range = this.range_;
  range.extractContents();

  if (range.startContainer.hasChildNodes()) {
    // Remove any now empty nodes surrounding the extracted contents.
    var rangeStartContainer =
        range.startContainer.childNodes[range.startOffset];
    if (rangeStartContainer) {
      var rangePrevious = rangeStartContainer.previousSibling;

      if (dom.getRawTextContent(rangeStartContainer) == '') {
        dom.removeNode(rangeStartContainer);
      }

      if (rangePrevious && dom.getRawTextContent(rangePrevious) == '') {
        dom.removeNode(rangePrevious);
      }
    }
  }

  if (userAgent.EDGE_OR_IE) {
    // Unfortunately, when deleting a portion of a single text node, IE creates
    // an extra text node instead of modifying the nodeValue of the start node.
    // We normalize for that behavior here, similar to code in
    // goog.dom.browserrange.IeRange#removeContents
    // See https://connect.microsoft.com/IE/feedback/details/746591
    var startNode = this.getStartNode();
    var startOffset = this.getStartOffset();
    var endNode = this.getEndNode();
    var endOffset = this.getEndOffset();
    var sibling = startNode.nextSibling;
    if (startNode == endNode && startNode.parentNode &&
        startNode.nodeType == NodeType.TEXT && sibling &&
        sibling.nodeType == NodeType.TEXT) {
      startNode.nodeValue += sibling.nodeValue;
      dom.removeNode(sibling);

      // Modifying the node value clears the range offsets. Reselect the
      // position in the modified start node.
      range.setStart(startNode, startOffset);
      range.setEnd(endNode, endOffset);
    }
  }
};


/** @override */
W3cRange.prototype.surroundContents = function(element) {
  this.range_.surroundContents(element);
  return element;
};


/** @override */
W3cRange.prototype.insertNode = function(node, before) {
  var range = this.range_.cloneRange();
  range.collapse(before);
  range.insertNode(node);
  range.detach();

  return node;
};


/**
 * @override
 * @suppress {missingProperties} circular definitions
 */
W3cRange.prototype.surroundWithNodes = function(
    startNode, endNode) {
  var win = dom.getWindow(dom.getOwnerDocument(this.getStartNode()));
  /** @suppress {missingRequire,missingProperties} */
  var selectionRange = createFromWindow(win);
  if (selectionRange) {
    var sNode = selectionRange.getStartNode();
    var eNode = selectionRange.getEndNode();
    var sOffset = selectionRange.getStartOffset();
    var eOffset = selectionRange.getEndOffset();
  }

  var clone1 = this.range_.cloneRange();
  var clone2 = this.range_.cloneRange();

  clone1.collapse(false);
  clone2.collapse(true);

  clone1.insertNode(endNode);
  clone2.insertNode(startNode);

  clone1.detach();
  clone2.detach();

  if (selectionRange) {
    // There are 4 ways that surroundWithNodes can wreck the saved
    // selection object. All of them happen when an inserted node splits
    // a text node, and one of the end points of the selection was in the
    // latter half of that text node.
    //
    // Clients of this library should use saveUsingCarets to avoid this
    // problem. Unfortunately, saveUsingCarets uses this method, so that's
    // not really an option for us. :( We just recompute the offsets.
    var isInsertedNode = function(n) {
      return n == startNode || n == endNode;
    };
    if (sNode.nodeType == NodeType.TEXT) {
      while (sOffset > sNode.length) {
        sOffset -= sNode.length;
        do {
          sNode = sNode.nextSibling;
        } while (isInsertedNode(sNode));
      }
    }

    if (eNode.nodeType == NodeType.TEXT) {
      while (eOffset > eNode.length) {
        eOffset -= eNode.length;
        do {
          eNode = eNode.nextSibling;
        } while (isInsertedNode(eNode));
      }
    }

    /** @suppress {missingRequire} */
    createFromNodes(
            sNode, /** @type {number} */ (sOffset), eNode,
            /** @type {number} */ (eOffset))
        .select();
  }
};


/** @override */
W3cRange.prototype.collapse = function(toStart) {
  this.range_.collapse(toStart);
};
