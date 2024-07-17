/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utilties for working with DOM nodes related to rich text
 * editing.  Many of these are not general enough to go into googDom.
 */

import dom from '../asserts/dom.js';

import * as googDom from '../dom/dom.js';
import { NodeType } from '../dom/nodetype.js';
import { TagName } from '../dom/tagname.js';
import { ChildIterator, SiblingIterator } from '../dom/iter.js';
import * as safe from '../dom/safe.js';
import * as legacyconversions from '../html/legacyconversions.js';
import * as iter from '../iter/iter.js';
import object from '../object/object.js';
import * as googString from '../string/string.js';
import { Unicode } from '../string/string.js';
import * as userAgent from '../useragent/useragent.js';


/**
 * Names of all block-level tags
 * @type {Object}
 * @private
 */
var BLOCK_TAG_NAMES_ = object.createSet(
    TagName.ADDRESS, TagName.ARTICLE, TagName.ASIDE,
    TagName.BLOCKQUOTE, TagName.BODY,
    TagName.CAPTION, TagName.CENTER, TagName.COL,
    TagName.COLGROUP, TagName.DETAILS, TagName.DIR,
    TagName.DIV, TagName.DL, TagName.DD,
    TagName.DT, TagName.FIELDSET, TagName.FIGCAPTION,
    TagName.FIGURE, TagName.FOOTER, TagName.FORM,
    TagName.H1, TagName.H2, TagName.H3,
    TagName.H4, TagName.H5, TagName.H6,
    TagName.HEADER, TagName.HGROUP, TagName.HR,
    TagName.ISINDEX, TagName.OL, TagName.LI,
    TagName.MAIN, TagName.MAP, TagName.MENU,
    TagName.NAV, TagName.OPTGROUP, TagName.OPTION,
    TagName.P, TagName.PRE, TagName.SECTION,
    TagName.SUMMARY, TagName.TABLE, TagName.TBODY,
    TagName.TD, TagName.TFOOT, TagName.TH,
    TagName.THEAD, TagName.TR, TagName.UL);


/**
 * Names of tags that have intrinsic content.
 * TODO(robbyw): What about object, br, input, textarea, button, isindex,
 * hr, keygen, select, table, tr, td?
 * @type {Object}
 * @private
 */
var NON_EMPTY_TAGS_ = object.createSet(
    TagName.IMG, TagName.IFRAME, TagName.EMBED);


/**
 * Check if the node is in a standards mode document.
 * @param {Node} node The node to test.
 * @return {boolean} Whether the node is in a standards mode document.
 */
export function isStandardsMode(node) {
  return googDom.getDomHelper(node).isCss1CompatMode();
}


/**
 * Get the right-most non-ignorable leaf node of the given node.
 * @param {Node} parent The parent ndoe.
 * @return {Node} The right-most non-ignorable leaf node.
 */
export function getRightMostLeaf(parent) {
  var temp;
  while (temp = getLastChild(parent)) {
    parent = temp;
  }
  return parent;
}


/**
 * Get the left-most non-ignorable leaf node of the given node.
 * @param {Node} parent The parent ndoe.
 * @return {Node} The left-most non-ignorable leaf node.
 */
export function getLeftMostLeaf(parent) {
  var temp;
  while (temp = getFirstChild(parent)) {
    parent = temp;
  }
  return parent;
}


/**
 * Version of firstChild that skips nodes that are entirely
 * whitespace and comments.
 * @param {Node} parent The reference node.
 * @return {Node} The first child of sibling that is important according to
 *     isImportant, or null if no such node exists.
 */
export function getFirstChild(parent) {
  return getChildHelper_(parent, false);
}


/**
 * Version of lastChild that skips nodes that are entirely whitespace or
 * comments.  (Normally lastChild is a property of all DOM nodes that gives the
 * last of the nodes contained directly in the reference node.)
 * @param {Node} parent The reference node.
 * @return {Node} The last child of sibling that is important according to
 *     isImportant, or null if no such node exists.
 */
export function getLastChild(parent) {
  return getChildHelper_(parent, true);
}


/**
 * Version of previoussibling that skips nodes that are entirely
 * whitespace or comments.  (Normally previousSibling is a property
 * of all DOM nodes that gives the sibling node, the node that is
 * a child of the same parent, that occurs immediately before the
 * reference node.)
 * @param {Node} sibling The reference node.
 * @return {Node} The closest previous sibling to sibling that is
 *     important according to isImportant, or null if no such
 *     node exists.
 */
export function getPreviousSibling(sibling) {
  return /** @type {Node} */ (getFirstValue_(iter.filter(
          new SiblingIterator(sibling, false, true),
          isImportant)));
}


/**
 * Version of nextSibling that skips nodes that are entirely whitespace or
 * comments.
 * @param {Node} sibling The reference node.
 * @return {Node} The closest next sibling to sibling that is important
 *     according to isImportant, or null if no
 *     such node exists.
 */
export function getNextSibling(sibling) {
  return /** @type {Node} */ (getFirstValue_(iter.filter(
          new SiblingIterator(sibling),
          isImportant)));
}


/**
 * Internal helper for lastChild/firstChild that skips nodes that are entirely
 * whitespace or comments.
 * @param {Node} parent The reference node.
 * @param {boolean} isReversed Whether children should be traversed forward
 *     or backward.
 * @return {Node} The first/last child of sibling that is important according
 *     to isImportant, or null if no such node exists.
 * @private
 */
function getChildHelper_(parent, isReversed) {
  return (!parent || parent.nodeType != NodeType.ELEMENT) ?
      null :
      /** @type {Node} */
      (getFirstValue_(iter.filter(
          new ChildIterator(/** @type {!Element} */ (parent), isReversed),
          isImportant)));
}


/**
 * Utility function that returns the first value from an iterator or null if
 * the iterator is empty.
 * @param {iter.Iterator} iterator The iterator to get a value from.
 * @return {*} The first value from the iterator.
 * @private
 */
function getFirstValue_(iterator) {
  const it = iterator.next();
  if (it.done) return null;
  return it.value;
}


/**
 * Determine if a node should be returned by the iterator functions.
 * @param {Node} node An object implementing the DOM1 Node interface.
 * @return {boolean} Whether the node is an element, or a text node that
 *     is not all whitespace.
 */
export function isImportant(node) {
  // Return true if the node is not either a TextNode or an ElementNode.
  return node.nodeType == NodeType.ELEMENT ||
      node.nodeType == NodeType.TEXT &&
      !isAllNonNbspWhiteSpace(node);
}


/**
 * Determine whether a node's text content is entirely whitespace.
 * @param {Node} textNode A node implementing the CharacterData interface (i.e.,
 *     a Text, Comment, or CDATASection node.
 * @return {boolean} Whether the text content of node is whitespace,
 *     otherwise false.
 */
export function isAllNonNbspWhiteSpace(textNode) {
  return googString.isBreakingWhitespace(textNode.nodeValue);
}


/**
 * Returns true if the node contains only whitespace and is not and does not
 * contain any images, iframes or embed tags.
 * @param {Node} node The node to check.
 * @param {boolean=} opt_prohibitSingleNbsp By default, this function treats a
 *     single nbsp as empty.  Set this to true to treat this case as non-empty.
 * @return {boolean} Whether the node contains only whitespace.
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
export function isEmpty(node, opt_prohibitSingleNbsp) {
  var nodeData = googDom.getRawTextContent(node);

  if (node.getElementsByTagName) {
    node = /** @type {!Element} */ (node);
    for (var tag in NON_EMPTY_TAGS_) {
      if (node.tagName == tag || node.getElementsByTagName(tag).length > 0) {
        return false;
      }
    }
  }
  return (!opt_prohibitSingleNbsp && nodeData == Unicode.NBSP) ||
      googString.isBreakingWhitespace(nodeData);
}


/**
 * Returns the length of the text in node if it is a text node, or the number
 * of children of the node, if it is an element. Useful for range-manipulation
 * code where you need to know the offset for the right side of the node.
 * @param {Node} node The node to get the length of.
 * @return {number} The length of the node.
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
export function getLength(node) {
  return node.length || node.childNodes.length;
}


/**
 * Search child nodes using a predicate function and return the first node that
 * satisfies the condition.
 * @param {Node} parent The parent node to search.
 * @param {function(Node):boolean} hasProperty A function that takes a child
 *    node as a parameter and returns true if it meets the criteria.
 * @return {?number} The index of the node found, or null if no node is found.
 */
export function findInChildren(parent, hasProperty) {
  for (var i = 0, len = parent.childNodes.length; i < len; i++) {
    if (hasProperty(parent.childNodes[i])) {
      return i;
    }
  }
  return null;
}


/**
 * Search ancestor nodes using a predicate function and returns the topmost
 * ancestor in the chain of consecutive ancestors that satisfies the condition.
 *
 * @param {Node} node The node whose ancestors have to be searched.
 * @param {function(Node): boolean} hasProperty A function that takes a parent
 *     node as a parameter and returns true if it meets the criteria.
 * @return {Node} The topmost ancestor or null if no ancestor satisfies the
 *     predicate function.
 */
export function findHighestMatchingAncestor(node, hasProperty) {
  var parent = node.parentNode;
  var ancestor = null;
  while (parent && hasProperty(parent)) {
    ancestor = parent;
    parent = parent.parentNode;
  }
  return ancestor;
}


/**
* Checks if node is a block-level html element. The <tt>display</tt> css
 * property is ignored.
 * @param {Node} node The node to test.
 * @return {boolean} Whether the node is a block-level node.
 */
export function isBlockTag(node) {
  return !!BLOCK_TAG_NAMES_[
      /** @type {!Element} */ (node).tagName];
}


/**
 * Skips siblings of a node that are empty text nodes.
 * @param {Node} node A node. May be null.
 * @return {Node} The node or the first sibling of the node that is not an
 *     empty text node. May be null.
 */
export function skipEmptyTextNodes(node) {
  while (node && node.nodeType == NodeType.TEXT && !node.nodeValue) {
    node = node.nextSibling;
  }
  return node;
}


/**
 * Checks if an element is a top-level editable container (meaning that
 * it itself is not editable, but all its child nodes are editable).
 * @param {Node} element The element to test.
 * @return {boolean} Whether the element is a top-level editable container.
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
export function isEditableContainer(element) {
  return element.getAttribute && element.getAttribute('g_editable') == 'true';
}


/**
 * Checks if a node is inside an editable container.
 * @param {Node} node The node to test.
 * @return {boolean} Whether the node is in an editable container.
 */
export function isEditable(node) {
  return !!googDom.getAncestor(node, isEditableContainer);
}


/**
 * Finds the top-most DOM node inside an editable field that is an ancestor
 * (or self) of a given DOM node and meets the specified criteria.
 * @param {Node} node The DOM node where the search starts.
 * @param {function(Node) : boolean} criteria A function that takes a DOM node
 *     as a parameter and returns a boolean to indicate whether the node meets
 *     the criteria or not.
 * @return {Node} The DOM node if found, or null.
 */
export function findTopMostEditableAncestor(node, criteria) {
  var targetNode = null;
  while (node && !isEditableContainer(node)) {
    if (criteria(node)) {
      targetNode = node;
    }
    node = node.parentNode;
  }
  return targetNode;
}


/**
 * Splits off a subtree.
 * @param {!Node} currentNode The starting splitting point.
 * @param {Node=} opt_secondHalf The initial leftmost leaf the new subtree.
 *     If null, siblings after currentNode will be placed in the subtree, but
 *     no additional node will be.
 * @param {Node=} opt_root The top of the tree where splitting stops at.
 * @return {!Node} The new subtree.
 */
export function splitDomTreeAt(currentNode, opt_secondHalf, opt_root) {
  var parent;
  while (currentNode != opt_root && (parent = currentNode.parentNode)) {
    opt_secondHalf = getSecondHalfOfNode_(
        parent, currentNode, opt_secondHalf);
    currentNode = parent;
  }
  return /** @type {!Node} */ (opt_secondHalf);
}


/**
 * Creates a clone of node, moving all children after startNode to it.
 * When firstChild is not null or undefined, it is also appended to the clone
 * as the first child.
 * @param {!Node} node The node to clone.
 * @param {!Node} startNode All siblings after this node will be moved to the
 *     clone.
 * @param {Node|undefined} firstChild The first child of the new cloned element.
 * @return {!Node} The cloned node that now contains the children after
 *     startNode.
 * @private
 */
function getSecondHalfOfNode_(node, startNode, firstChild) {
  var secondHalf = /** @type {!Node} */ (node.cloneNode(false));
  while (startNode.nextSibling) {
    googDom.appendChild(secondHalf, startNode.nextSibling);
  }
  if (firstChild) {
    secondHalf.insertBefore(firstChild, secondHalf.firstChild);
  }
  return secondHalf;
}


/**
 * Appends all of oldNode's children to newNode. This removes all children from
 * oldNode and appends them to newNode. oldNode is left with no children.
 * @param {!Node} newNode Node to transfer children to.
 * @param {Node} oldNode Node to transfer children from.
 * @deprecated Use googDom.append directly instead.
 */
export function transferChildren(newNode, oldNode) {
  googDom.append(newNode, oldNode.childNodes);
}


/**
 * Replaces the innerHTML of a node.
 *
 * IE has serious problems if you try to set innerHTML of an editable node with
 * any selection. Early versions of IE tear up the old internal tree storage, to
 * help avoid ref-counting loops. But this sometimes leaves the selection object
 * in a bad state and leads to segfaults.
 *
 * Removing the nodes first prevents IE from tearing them up. This is not
 * strictly necessary in nodes that do not have the selection. You should always
 * use this function when setting innerHTML inside of a field.
 * @param {Node} node A node.
 * @param {string} html The innerHTML to set on the node.
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
export function replaceInnerHtml(node, html) {
  // Only do this IE. On gecko, we use element change events, and don't
  // want to trigger spurious events.
  if (userAgent.IE) {
    googDom.removeChildren(node);
  }
  safe.setInnerHtml(
      dom.assertIsElement(node),
      legacyconversions.safeHtmlFromString(html));
}
