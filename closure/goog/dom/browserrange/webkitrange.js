/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Definition of the WebKit specific range wrapper.  Inherits most
 * functionality from W3CRange, but adds exceptions as necessary.
 *
 * DO NOT USE THIS FILE DIRECTLY.  Use goog.dom.Range instead.
 */


import { W3cRange } from './w3crange.js';



/**
 * The constructor for WebKit specific browser ranges.
 * @param {Range} range The range object.
 * @constructor
 * @extends {W3cRange}
 * @final
 */
export function WebKitRange(range) {
    W3cRange.call(this, range);
}
goog.inherits(
    WebKitRange, W3cRange);


/**
 * Creates a range object that selects the given node's text.
 * @param {Node} node The node to select.
 * @return {!WebKitRange} A WebKit range wrapper object.
 */
WebKitRange.createFromNodeContents = function(node) {
    return new WebKitRange(
        W3cRange.getBrowserRangeForNode(node));
};


/**
 * Creates a range object that selects between the given nodes.
 * @param {Node} startNode The node to start with.
 * @param {number} startOffset The offset within the start node.
 * @param {Node} endNode The node to end with.
 * @param {number} endOffset The offset within the end node.
 * @return {!WebKitRange} A wrapper object.
 */
WebKitRange.createFromNodes = function(
    startNode, startOffset, endNode, endOffset) {
    return new WebKitRange(
        W3cRange.getBrowserRangeForNodes(
            startNode, startOffset, endNode, endOffset));
};


/** @override */
WebKitRange.prototype.compareBrowserRangeEndpoints =
    function(range, thisEndpoint, otherEndpoint) {
        return (WebKitRange.superClass_.compareBrowserRangeEndpoints
            .call(this, range, thisEndpoint, otherEndpoint));
    };


/** @override */
WebKitRange.prototype.selectInternal = function(
    selection, reversed) {
    if (reversed) {
      selection.setBaseAndExtent(
          this.getEndNode(), this.getEndOffset(), this.getStartNode(),
          this.getStartOffset());
    } else {
      selection.setBaseAndExtent(
          this.getStartNode(), this.getStartOffset(), this.getEndNode(),
          this.getEndOffset());
    }
};
