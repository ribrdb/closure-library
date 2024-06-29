/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utilities for working with ranges in HTML documents.
 *
 * @suppress {strictMissingProperties}
 */

import * as dom from './dom.js';

import { AbstractRange } from './abstractrange.js';
import { ControlRange } from './controlrange.js';
import { MultiRange } from './multirange.js';
import { NodeType } from './nodetype.js';
import { TextRange as GoogTextRange } from './textrange.js';


/**
 * Create a new selection from the given browser window's current selection.
 * Note that this object does not auto-update if the user changes their
 * selection and should be used as a snapshot.
 * @param {Window=} opt_win The window to get the selection of.  Defaults to the
 *     window this class was defined in.
 * @return {AbstractRange?} A range wrapper object, or null if there
 *     was an error.
 */
export function createFromWindow(opt_win) {
  var sel =
      AbstractRange.getBrowserSelectionForWindow(opt_win || window);
  return sel && createFromBrowserSelection(sel);
}


/**
 * Create a new range wrapper from the given browser selection object.  Note
 * that this object does not auto-update if the user changes their selection and
 * should be used as a snapshot.
 * @param {!Object} selection The browser selection object.
 * @return {AbstractRange?} A range wrapper object or null if there
 *    was an error.
 */
export function createFromBrowserSelection(selection) {
  var range;
  var isReversed = false;
  if (selection.createRange) {

    try {
      range = selection.createRange();
    } catch (e) {
      // Access denied errors can be thrown here in IE if the selection was
      // a flash obj or if there are cross domain issues
      return null;
    }
  } else if (selection.rangeCount) {
    if (selection.rangeCount > 1) {
      return MultiRange.createFromBrowserSelection(
          /** @type {!Selection} */ (selection));
    } else {
      range = selection.getRangeAt(0);
      isReversed = isReversed_(
          selection.anchorNode, selection.anchorOffset, selection.focusNode,
          selection.focusOffset);
    }
  } else {
    return null;
  }

  return createFromBrowserRange(range, isReversed);
}


/**
 * Create a new range wrapper from the given browser range object.
 * @param {Range|TextRange} range The browser range object.
 * @param {boolean=} opt_isReversed Whether the focus node is before the anchor
 *     node.
 * @return {!AbstractRange} A range wrapper object.
 */
export function createFromBrowserRange(range, opt_isReversed) {
  // Create an IE control range when appropriate.
  return AbstractRange.isNativeControlRange(range) ?
      ControlRange.createFromBrowserRange(range) :
      GoogTextRange.createFromBrowserRange(range, opt_isReversed);
}


/**
 * Create a new range wrapper that selects the given node's text.
 * @param {Node} node The node to select.
 * @param {boolean=} opt_isReversed Whether the focus node is before the anchor
 *     node.
 * @return {!AbstractRange} A range wrapper object.
 */
export function createFromNodeContents(node, opt_isReversed) {
  return GoogTextRange.createFromNodeContents(node, opt_isReversed);
}


/**
 * Create a new range wrapper that represents a caret at the given node,
 * accounting for the given offset.  This always creates a TextRange, regardless
 * of whether node is an image node or other control range type node.
 * @param {Node} node The node to place a caret at.
 * @param {number} offset The offset within the node to place the caret at.
 * @return {!AbstractRange} A range wrapper object.
 */
export function createCaret(node, offset) {
  return GoogTextRange.createFromNodes(node, offset, node, offset);
}


/**
 * Create a new range wrapper that selects the area between the given nodes,
 * accounting for the given offsets.
 * @param {Node} anchorNode The node to anchor on.
 * @param {number} anchorOffset The offset within the node to anchor on.
 * @param {Node} focusNode The node to focus on.
 * @param {number} focusOffset The offset within the node to focus on.
 * @return {!AbstractRange} A range wrapper object.
 */
export function createFromNodes(anchorNode, anchorOffset, focusNode, focusOffset) {
  return GoogTextRange.createFromNodes(
      anchorNode, anchorOffset, focusNode, focusOffset);
}


/**
 * Clears the window's selection.
 * @param {Window=} opt_win The window to get the selection of.  Defaults to the
 *     window this class was defined in.
 */
export function clearSelection(opt_win) {
  var sel =
      AbstractRange.getBrowserSelectionForWindow(opt_win || window);
  if (!sel) {
    return;
  }
  if (sel.empty) {
    // We can't just check that the selection is empty, because IE
    // sometimes gets confused.
    try {
      sel.empty();
    } catch (e) {
      // Emptying an already empty selection throws an exception in IE
    }
  } else {
    try {
      sel.removeAllRanges();
    } catch (e) {
      // This throws in IE9 if the range has been invalidated; for example, if
      // the user clicked on an element which disappeared during the event
      // handler.
    }
  }
}


/**
 * Tests if the window has a selection.
 * @param {Window=} opt_win The window to check the selection of.  Defaults to
 *     the window this class was defined in.
 * @return {boolean} Whether the window has a selection.
 */
export function hasSelection(opt_win) {
  var sel =
      AbstractRange.getBrowserSelectionForWindow(opt_win || window);
  return !!(sel && sel.rangeCount);
}


/**
 * Returns whether the focus position occurs before the anchor position.
 * @param {Node} anchorNode The node to anchor on.
 * @param {number} anchorOffset The offset within the node to anchor on.
 * @param {Node} focusNode The node to focus on.
 * @param {number} focusOffset The offset within the node to focus on.
 * @return {boolean} Whether the focus position occurs before the anchor
 *     position.
 */
function isReversed_(anchorNode, anchorOffset, focusNode, focusOffset) {
  if (anchorNode == focusNode) {
    return focusOffset < anchorOffset;
  }
  var child;
  if (anchorNode.nodeType == NodeType.ELEMENT && anchorOffset) {
    child = anchorNode.childNodes[anchorOffset];
    if (child) {
      anchorNode = child;
      anchorOffset = 0;
    } else if (dom.contains(anchorNode, focusNode)) {
      // If focus node is contained in anchorNode, it must be before the
      // end of the node.  Hence we are reversed.
      return true;
    }
  }
  if (focusNode.nodeType == NodeType.ELEMENT && focusOffset) {
    child = focusNode.childNodes[focusOffset];
    if (child) {
      focusNode = child;
      focusOffset = 0;
    } else if (dom.contains(focusNode, anchorNode)) {
      // If anchor node is contained in focusNode, it must be before the
      // end of the node.  Hence we are not reversed.
      return false;
    }
  }
  return (dom.compareNodeOrder(anchorNode, focusNode) ||
          anchorOffset - focusOffset) > 0;
}
export { isReversed_ as isReversed };
