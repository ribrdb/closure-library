/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Definition of the AttachableMenu class.
 */

import * as aria from '../a11y/aria/aria.js';

import { State } from '../a11y/aria/attributes.js';
import * as asserts from '../asserts/asserts.js';
import * as dom from '../dom/dom.js';
import * as classlist from '../dom/classlist.js';
import { Event } from '../events/event.js';
import { KeyCodes } from '../events/keycodes.js';
import * as googString from '../string/string.js';
import * as style from '../style/style.js';
import { ItemEvent } from './itemevent.js';
import { MenuBase } from './menubase.js';
import { PopupBase } from './popupbase.js';
import * as userAgent from '../useragent/useragent.js';
const { KeyEvent } = goog.requireType('goog.events.keyevent');



/**
 * An implementation of a menu that can attach itself to DOM element that
 * are annotated appropriately.
 *
 * The following attributes are used by the AttachableMenu
 *
 * menu-item - Should be set on DOM elements that function as items in the
 * menu that can be selected.
 * classNameSelected - A class that will be added to the element's class names
 * when the item is selected via keyboard or mouse.
 *
 * @param {Element=} opt_element A DOM element for the popup.
 * @constructor
 * @extends {MenuBase}
 * @deprecated Use goog.ui.PopupMenu.
 * @final
 */
export function AttachableMenu(opt_element) {
  MenuBase.call(this, opt_element);
}
goog.inherits(AttachableMenu, MenuBase);


/**
 * The currently selected element (mouse was moved over it or keyboard arrows)
 * @type {?HTMLElement}
 * @private
 */
AttachableMenu.prototype.selectedElement_ = null;


/**
 * Class name to append to a menu item's class when it's selected
 * @type {string}
 * @private
 */
AttachableMenu.prototype.itemClassName_ = 'menu-item';


/**
 * Class name to append to a menu item's class when it's selected
 * @type {string}
 * @private
 */
AttachableMenu.prototype.selectedItemClassName_ = 'menu-item-selected';


/**
 * Keep track of when the last key was pressed so that a keydown-scroll doesn't
 * trigger a mouseover event
 * @type {number}
 * @private
 */
AttachableMenu.prototype.lastKeyDown_ = Date.now();


/** @override */
AttachableMenu.prototype.disposeInternal = function() {
  AttachableMenu.superClass_.disposeInternal.call(this);
  this.selectedElement_ = null;
};


/**
 * Sets the class name to use for menu items
 *
 * @return {string} The class name to use for items.
 */
AttachableMenu.prototype.getItemClassName = function() {
  return this.itemClassName_;
};


/**
 * Sets the class name to use for menu items
 *
 * @param {string} name The class name to use for items.
 */
AttachableMenu.prototype.setItemClassName = function(name) {
  this.itemClassName_ = name;
};


/**
 * Sets the class name to use for selected menu items
 * todo(jonp) - reevaluate if we can simulate pseudo classes in IE
 *
 * @return {string} The class name to use for selected items.
 */
AttachableMenu.prototype.getSelectedItemClassName = function() {
  return this.selectedItemClassName_;
};


/**
 * Sets the class name to use for selected menu items
 * todo(jonp) - reevaluate if we can simulate pseudo classes in IE
 *
 * @param {string} name The class name to use for selected items.
 */
AttachableMenu.prototype.setSelectedItemClassName = function(name) {
  this.selectedItemClassName_ = name;
};


/**
 * Returns the selected item
 *
 * @return {Element} The item selected or null if no item is selected.
 * @override
 */
AttachableMenu.prototype.getSelectedItem = function() {
  return this.selectedElement_;
};


/** @override */
AttachableMenu.prototype.setSelectedItem = function(obj) {
  var elt = /** @type {HTMLElement} */ (obj);
  if (this.selectedElement_) {
    classlist.remove(
        this.selectedElement_, this.selectedItemClassName_);
  }

  this.selectedElement_ = elt;

  var el = /** @type {HTMLElement} */ (this.getElement());
  asserts.assert(el, 'The attachable menu DOM element cannot be null.');
  if (this.selectedElement_) {
    classlist.add(this.selectedElement_, this.selectedItemClassName_);

    if (elt.id) {
      // Update activedescendant to reflect the new selection. ARIA roles for
      // menu and menuitem can be set statically (through Soy templates, for
      // example) whereas this needs to be updated as the selection changes.
      aria.setState(
          el, State.ACTIVEDESCENDANT, elt.id);
    }

    var top = this.selectedElement_.offsetTop;
    var height = this.selectedElement_.offsetHeight;
    var scrollTop = el.scrollTop;
    var scrollHeight = el.offsetHeight;

    // If the menu is scrollable this scrolls the selected item into view
    // (this has no effect when the menu doesn't scroll)
    if (top < scrollTop) {
      el.scrollTop = top;
    } else if (top + height > scrollTop + scrollHeight) {
      el.scrollTop = top + height - scrollHeight;
    }
  } else {
    // Clear off activedescendant to reflect no selection.
    aria.setState(el, State.ACTIVEDESCENDANT, '');
  }
};


/** @override */
AttachableMenu.prototype.showPopupElement = function() {
  // The scroll position cannot be set for hidden (display: none) elements in
  // gecko browsers.
  var el = /** @type {Element} */ (this.getElement());
  style.setElementShown(el, true);
  el.scrollTop = 0;
  el.style.visibility = 'visible';
};


/**
 * Called after the menu is shown.
 * @override
 * @protected
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
AttachableMenu.prototype.onShow = function() {
  AttachableMenu.superClass_.onShow.call(this);

  // In IE, focusing the menu causes weird scrolling to happen. Focusing the
  // first child makes the scroll behavior better, and the key handling still
  // works. In FF, focusing the first child causes us to lose key events, so we
  // still focus the menu.
  var el = this.getElement();
  userAgent.IE ? el.firstChild.focus() : el.focus();
};


/**
 * Returns the next or previous item. Used for up/down arrows.
 *
 * @param {boolean} prev True to go to the previous element instead of next.
 * @return {Element} The next or previous element.
 * @protected
 */
AttachableMenu.prototype.getNextPrevItem = function(prev) {
  // first find the index of the next element
  var elements = this.getElement().getElementsByTagName('*');
  var elementCount = elements.length;
  var index;
  // if there is a selected element, find its index and then inc/dec by one
  if (this.selectedElement_) {
    for (var i = 0; i < elementCount; i++) {
      if (elements[i] == this.selectedElement_) {
        index = prev ? i - 1 : i + 1;
        break;
      }
    }
  }

  // if no selected element, start from beginning or end
  if (index === undefined) {
    index = prev ? elementCount - 1 : 0;
  }

  // iterate forward or backwards through the elements finding the next
  // menu item
  for (var i = 0; i < elementCount; i++) {
    var multiplier = prev ? -1 : 1;
    var nextIndex = index + (multiplier * i) % elementCount;

    // if overflowed/underflowed, wrap around
    if (nextIndex < 0) {
      nextIndex += elementCount;
    } else if (nextIndex >= elementCount) {
      nextIndex -= elementCount;
    }

    if (this.isMenuItem_(elements[nextIndex])) {
      return elements[nextIndex];
    }
  }
  return null;
};


/**
 * Mouse over handler for the menu.
 * @param {Event} e The event object.
 * @protected
 * @override
 */
AttachableMenu.prototype.onMouseOver = function(e) {
  var eltItem = this.getAncestorMenuItem_(/** @type {Element} */ (e.target));
  if (eltItem == null) {
    return;
  }

  // Stop the keydown triggering a mouseover in FF.
  if (Date.now() - this.lastKeyDown_ > PopupBase.DEBOUNCE_DELAY_MS) {
    this.setSelectedItem(eltItem);
  }
};


/**
 * Mouse out handler for the menu.
 * @param {Event} e The event object.
 * @protected
 * @override
 */
AttachableMenu.prototype.onMouseOut = function(e) {
  var eltItem = this.getAncestorMenuItem_(/** @type {Element} */ (e.target));
  if (eltItem == null) {
    return;
  }

  // Stop the keydown triggering a mouseout in FF.
  if (Date.now() - this.lastKeyDown_ > PopupBase.DEBOUNCE_DELAY_MS) {
    this.setSelectedItem(null);
  }
};


/**
 * Mouse down handler for the menu. Prevents default to avoid text selection.
 * @param {!Event} e The event object.
 * @protected
 * @override
 */
AttachableMenu.prototype.onMouseDown = Event.preventDefault;


/**
 * Mouse up handler for the menu.
 * @param {Event} e The event object.
 * @protected
 * @override
 */
AttachableMenu.prototype.onMouseUp = function(e) {
  var eltItem = this.getAncestorMenuItem_(/** @type {Element} */ (e.target));
  if (eltItem == null) {
    return;
  }
  this.setVisible(false);
  this.onItemSelected_(eltItem);
};


/**
 * Key down handler for the menu.
 * @param {KeyEvent} e The event object.
 * @protected
 * @override
 */
AttachableMenu.prototype.onKeyDown = function(e) {
  switch (e.keyCode) {
    case KeyCodes.DOWN:
      this.setSelectedItem(this.getNextPrevItem(false));
      this.lastKeyDown_ = Date.now();
      break;
    case KeyCodes.UP:
      this.setSelectedItem(this.getNextPrevItem(true));
      this.lastKeyDown_ = Date.now();
      break;
    case KeyCodes.ENTER:
      if (this.selectedElement_) {
        this.onItemSelected_();
        this.setVisible(false);
      }
      break;
    case KeyCodes.ESC:
      this.setVisible(false);
      break;
    default:
      if (e.charCode) {
        var charStr = String.fromCharCode(e.charCode);
        this.selectByName_(charStr, 1, true);
      }
      break;
  }
  // Prevent the browser's default keydown behaviour when the menu is open,
  // e.g. keyboard scrolling.
  e.preventDefault();

  // Stop propagation to prevent application level keyboard shortcuts from
  // firing.
  e.stopPropagation();

  this.dispatchEvent(e);
};


/**
 * Find an item that has the given prefix and select it.
 *
 * @param {string} prefix The entered prefix, so far.
 * @param {number=} opt_direction 1 to search forward from the selection
 *     (default), -1 to search backward (e.g. to go to the previous match).
 * @param {boolean=} opt_skip True if should skip the current selection,
 *     unless no other item has the given prefix.
 * @private
 */
AttachableMenu.prototype.selectByName_ = function(
    prefix, opt_direction, opt_skip) {
  var elements = this.getElement().getElementsByTagName('*');
  var elementCount = elements.length;
  var index;

  if (elementCount == 0) {
    return;
  }

  if (!this.selectedElement_ ||
      (index = Array.prototype.indexOf.call(elements, this.selectedElement_)) ==
          -1) {
    // no selection or selection isn't known => start at the beginning
    index = 0;
  }

  var start = index;
  var re = new RegExp('^' + googString.regExpEscape(prefix), 'i');
  var skip = opt_skip && this.selectedElement_;
  var dir = opt_direction || 1;

  do {
    if (elements[index] != skip && this.isMenuItem_(elements[index])) {
      var name = dom.getTextContent(elements[index]);
      if (name.match(re)) {
        break;
      }
    }
    index += dir;
    if (index == elementCount) {
      index = 0;
    } else if (index < 0) {
      index = elementCount - 1;
    }
  } while (index != start);

  if (this.selectedElement_ != elements[index]) {
    this.setSelectedItem(elements[index]);
  }
};


/**
 * Dispatch an ITEM_ACTION event when an item is selected
 * @param {Object=} opt_item Item selected.
 * @private
 */
AttachableMenu.prototype.onItemSelected_ = function(opt_item) {
  this.dispatchEvent(new ItemEvent(
      MenuBase.Events.ITEM_ACTION, this,
      opt_item || this.selectedElement_));
};


/**
 * Returns whether the specified element is a menu item.
 * @param {Element} elt The element to find a menu item ancestor of.
 * @return {boolean} Whether the specified element is a menu item.
 * @private
 */
AttachableMenu.prototype.isMenuItem_ = function(elt) {
  return !!elt && classlist.contains(elt, this.itemClassName_);
};


/**
 * Returns the menu-item scoping the specified element, or null if there is
 * none.
 * @param {Element|undefined} elt The element to find a menu item ancestor of.
 * @return {Element} The menu-item scoping the specified element, or null if
 *     there is none.
 * @private
 */
AttachableMenu.prototype.getAncestorMenuItem_ = function(elt) {
  if (elt) {
    var ownerDocumentBody = dom.getOwnerDocument(elt).body;
    while (elt != null && elt != ownerDocumentBody) {
      if (this.isMenuItem_(elt)) {
        return elt;
      }
      elt = /** @type {Element} */ (elt.parentNode);
    }
  }
  return null;
};
