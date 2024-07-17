/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Utilties for working with the styles of DOM nodes, and
 * related to rich text editing.
 *
 * Many of these are not general enough to go into style, and use
 * constructs (like "isContainer") that only really make sense inside
 * of an HTML editor.
 *
 * The API has been optimized for iterating over large, irregular DOM
 * structures (with lots of text nodes), and so the API tends to be a bit
 * more permissive than the style API should be. For example,
 * style.getComputedStyle will throw an exception if you give it a
 * text node.
 */

import * as asserts from '../asserts/asserts.js';

import * as dom from '../dom/dom.js';
import { NodeType } from '../dom/nodetype.js';
import { TagName } from '../dom/tagname.js';
import { BrowserFeature } from './browserfeature.js';
import { EventHandler } from '../events/eventhandler.js';
import { EventType } from '../events/eventtype.js';
import object from '../object/object.js';
import * as style from '../style/style.js';
import * as userAgent from '../useragent/useragent.js';
const { Event } = goog.requireType('goog.events.event');


/**
 * Gets the computed or cascaded style.
 *
 * This is different than style.getStyle_ because it returns null
 * for text nodes (instead of throwing an exception), and never reads
 * inline style. These two functions may need to be reconciled.
 *
 * @param {!Node} node Node to get style of.
 * @param {string} stylePropertyName Property to get (must be camelCase,
 *     not css-style).
 * @return {?string} Style value, or null if this is not an element node.
 * @private
 */
function getComputedOrCascadedStyle_(node, stylePropertyName) {
  if (node.nodeType != NodeType.ELEMENT) {
    // Only element nodes have style.
    return null;
  }
  return userAgent.IE ?
      style.getCascadedStyle(
          /** @type {!Element} */ (node), stylePropertyName) :
      style.getComputedStyle(
          /** @type {!Element} */ (node), stylePropertyName);
}


/**
 * Checks whether the given element inherits display: block.
 * @param {!Node} node The Node to check.
 * @return {boolean} Whether the element inherits CSS display: block.
 */
export function isDisplayBlock(node) {
  return getComputedOrCascadedStyle_(node, 'display') ==
      'block';
}


/**
 * Returns true if the element is a container of other non-inline HTML
 * Note that span, strong and em tags, being inline can only contain
 * other inline elements and are thus, not containers. Containers are elements
 * that should not be broken up when wrapping selections with a node of an
 * inline block styling.
 * @param {Node} element The element to check.
 * @return {boolean} Whether the element is a container.
 */
export function isContainer(element) {
  var nodeName = element && element.nodeName;
  return !!(
      element &&
      (isDisplayBlock(element) ||
       nodeName == TagName.TD || nodeName == TagName.TABLE ||
       nodeName == TagName.LI));
}


/**
 * Return the first ancestor of this node that is a container, inclusive.
 * @see isContainer
 * @param {Node} node Node to find the container of.
 * @return {Element} The element which contains node.
 */
export function getContainer(node) {
  // We assume that every node must have a container.
  return /** @type {Element} */ (dom.getAncestor(node, isContainer, true));
}


/**
 * Set of input types that should be kept selectable even when their ancestors
 * are made unselectable.
 * @type {Object}
 * @private
 */
var SELECTABLE_INPUT_TYPES_ = object.createSet('text', 'file', 'url');


/**
 * Prevent the default action on mousedown events.
 * @param {Event} e The mouse down event.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
function cancelMouseDownHelper_(e) {
  var targetTagName = e.target.tagName;
  if (targetTagName != TagName.TEXTAREA &&
      targetTagName != TagName.INPUT) {
    e.preventDefault();
  }
}


/**
 * Makes the given element unselectable, as well as all of its children, except
 * for text areas, text, file and url inputs.
 * @param {Element} element The element to make unselectable.
 * @param {EventHandler} eventHandler An EventHandler to register
 *     the event with. Assumes when the node is destroyed, the eventHandler's
 *     listeners are destroyed as well.
 */
export function makeUnselectable(element, eventHandler) {
  if (BrowserFeature.HAS_UNSELECTABLE_STYLE) {
    // The mousing down on a node should not blur the focused node.
    // This is consistent with how IE works.
    // TODO: Consider using just the mousedown handler and not the css property.
    eventHandler.listen(
        element, EventType.MOUSEDOWN,
        cancelMouseDownHelper_, true);
  }

  style.setUnselectable(element, true);

  // Make inputs and text areas selectable.
  var inputs = dom.getElementsByTagName(
      TagName.INPUT, asserts.assert(element));
  for (var i = 0, len = inputs.length; i < len; i++) {
    var input = inputs[i];
    if (input.type in SELECTABLE_INPUT_TYPES_) {
      makeSelectable(input);
    }
  }
  Array.prototype.forEach.call(
      dom.getElementsByTagName(
          TagName.TEXTAREA, asserts.assert(element)),
      makeSelectable);
}


/**
 * Make the given element selectable.
 *
 * For IE this simply turns off the "unselectable" property.
 *
 * Under FF no descendant of an unselectable node can be selectable:
 *
 * https://bugzilla.mozilla.org/show_bug.cgi?id=203291
 *
 * So we make each ancestor of node selectable, while trying to preserve the
 * unselectability of other nodes along that path
 *
 * This may cause certain text nodes which should be unselectable, to become
 * selectable. For example:
 *
 *    <div id=div1 style="-moz-user-select: none">
 *      Text1
 *      <span id=span1>Text2</span>
 *    </div>
 *
 * If we call makeSelectable on span1, then it will cause "Text1" to become
 * selectable, since it had to make div1 selectable in order for span1 to be
 * selectable.
 *
 * If "Text1" were enclosed within a `<p>` or `<span>`, then this problem would
 * not arise.  Text nodes do not have styles, so its style can't be set to
 * unselectable.
 *
 * @param {!Element} element The element to make selectable.
 */
export function makeSelectable(element) {
  style.setUnselectable(element, false);
  if (BrowserFeature.HAS_UNSELECTABLE_STYLE) {
    // Go up ancestor chain, searching for nodes that are unselectable.
    // If such a node exists, mark it as selectable but mark its other children
    // as unselectable so the minimum set of nodes is changed.
    var child = element;
    var current = /** @type {Element} */ (element.parentNode);
    while (current && current.tagName != TagName.HTML) {
      if (style.isUnselectable(current)) {
        style.setUnselectable(current, false, true);

        for (var i = 0, len = current.childNodes.length; i < len; i++) {
          var node = current.childNodes[i];
          if (node != child && node.nodeType == NodeType.ELEMENT) {
            style.setUnselectable(
                /** @type {!Element} */ (current.childNodes[i]), true);
          }
        }
      }

      child = current;
      current = /** @type {Element} */ (current.parentNode);
    }
  }
}
