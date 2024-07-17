/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A base menu class that supports key and mouse events. The menu
 * can be bound to an existing HTML structure or can generate its own DOM.
 *
 * To decorate, the menu should be bound to an element containing children
 * with the classname 'goog-menuitem'.  HRs will be classed as separators.
 *
 * Decorate Example:
 * <div id="menu" class="goog-menu" tabIndex="0">
 *   <div class="goog-menuitem">Google</div>
 *   <div class="goog-menuitem">Yahoo</div>
 *   <div class="goog-menuitem">MSN</div>
 *   <hr>
 *   <div class="goog-menuitem">New...</div>
 * </div>
 * <script>
 *
 * var menu = new Menu();
 * menu.decorate(goog.dom.getElement('menu'));
 *
 * TESTED=FireFox 2.0, IE6, Opera 9, Chrome.
 * TODO(user): Key handling is flaky in Opera and Chrome
 * TODO(user): Rename all references of "item" to child since menu is
 * essentially very generic and could, in theory, host a date or color picker.
 *
 * @see ../demos/menu.html
 * @see ../demos/menus.html
 */

goog.declareModuleId('goog.ui.menu');

import { TagName } from '../dom/tagname.js';
import { Coordinate } from '../math/coordinate.js';
import * as googString from '../string/string.js';
import * as style from '../style/style.js';
import { Component, Component as uiComponent } from './component.js';
import { Container, Container as uiContainer } from './container.js';
import { MenuHeader } from './menuheader.js';
import { MenuItem } from './menuitem.js';
import { MenuRenderer } from './menurenderer.js';
import { MenuSeparator } from './menuseparator.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { Event } = goog.requireType('goog.events.event');

// The dependencies MenuHeader, MenuItem, and MenuSeparator are implicit.
// There are no references in the code, but we need to load these
/* classes before Menu.*/



// TODO(robbyw): Reverse constructor argument order for consistency.
/**
 * A basic menu class.
 * @param {DomHelper=} opt_domHelper Optional DOM helper.
 * @param {MenuRenderer=} opt_renderer Renderer used to render or
 *     decorate the container; defaults to {@link MenuRenderer}.
 * @constructor
 * @extends {Container}
 */
export function Menu(opt_domHelper, opt_renderer) {
  uiContainer.call(
      this, uiContainer.Orientation.VERTICAL,
      opt_renderer || MenuRenderer.getInstance(), opt_domHelper);

  // Unlike Containers, Menus aren't keyboard-accessible by default.  This line
  // preserves backwards compatibility with code that depends on menus not
  /* receiving focus - e.g. `MenuButton`.*/
  this.setFocusable(false);
}
goog.inherits(Menu, uiContainer);


// TODO(robbyw): Remove this and all references to it.
// Please ensure that BEFORE_SHOW behavior is not disrupted as a result.
/**
 * Event types dispatched by the menu.
 * @enum {string}
 * @deprecated Use Component.ComponentEventType.
 */
Menu.EventType = {
  /** Dispatched before the menu becomes visible */
  BEFORE_SHOW: uiComponent.ComponentEventType.BEFORE_SHOW,

  /** Dispatched when the menu is shown */
  SHOW: uiComponent.ComponentEventType.SHOW,

  /** Dispatched before the menu becomes hidden */
  BEFORE_HIDE: uiComponent.ComponentEventType.HIDE,

  /** Dispatched when the menu is hidden */
  HIDE: uiComponent.ComponentEventType.HIDE
};


// TODO(robbyw): Remove this and all references to it.
/**
 * CSS class for menus.
 * @type {string}
 * @deprecated Use MenuRenderer.CSS_CLASS.
 */
Menu.CSS_CLASS = MenuRenderer.CSS_CLASS;


/**
 * Coordinates of the mousedown event that caused this menu to be made visible.
 * Used to prevent the consequent mouseup event due to a simple click from
 * activating a menu item immediately. Considered protected; should only be used
 * within this package or by subclasses.
 * @type {Coordinate|undefined}
 */
Menu.prototype.openingCoords;


/**
 * Whether the menu can move the focus to its key event target when it is
 * shown.  Default = true
 * @type {boolean}
 * @private
 */
Menu.prototype.allowAutoFocus_ = true;


/**
 * Whether the menu should use windows style behavior and allow disabled menu
 * items to be highlighted (though not selectable).  Defaults to false
 * @type {boolean}
 * @private
 */
Menu.prototype.allowHighlightDisabled_ = false;


/**
 * Returns the CSS class applied to menu elements, also used as the prefix for
 * derived styles, if any.  Subclasses should override this method as needed.
 * Considered protected.
 * @return {string} The CSS class applied to menu elements.
 * @protected
 * @deprecated Use getRenderer().getCssClass().
 */
Menu.prototype.getCssClass = function() {
  return this.getRenderer().getCssClass();
};


/**
 * Returns whether the provided element is to be considered inside the menu for
 * purposes such as dismissing the menu on an event.  This is so submenus can
 * make use of elements outside their own DOM.
 * @param {Element} element The element to test for.
 * @return {boolean} Whether the provided element is to be considered inside
 *     the menu.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
Menu.prototype.containsElement = function(element) {
  if (this.getRenderer().containsElement(this, element)) {
    return true;
  }

  for (var i = 0, count = this.getChildCount(); i < count; i++) {
    var child = this.getChildAt(i);
    if (typeof child.containsElement == 'function' &&
        child.containsElement(element)) {
      return true;
    }
  }

  return false;
};


/**
 * Adds a new menu item at the end of the menu.
 * @param {MenuHeader|MenuItem|MenuSeparator} item Menu
 *     item to add to the menu.
 * @deprecated Use {@link #addChild} instead, with true for the second argument.
 */
Menu.prototype.addItem = function(item) {
  this.addChild(item, true);
};


/**
 * Adds a new menu item at a specific index in the menu.
 * @param {MenuHeader|MenuItem|MenuSeparator} item Menu
 *     item to add to the menu.
 * @param {number} n Index at which to insert the menu item.
 * @deprecated Use {@link #addChildAt} instead, with true for the third
 *     argument.
 */
Menu.prototype.addItemAt = function(item, n) {
  this.addChildAt(item, n, true);
};


/**
 * Removes an item from the menu and disposes of it.
 * @param {MenuHeader|MenuItem|MenuSeparator} item The
 *     menu item to remove.
 * @deprecated Use {@link #removeChild} instead.
 */
Menu.prototype.removeItem = function(item) {
  var removedChild = this.removeChild(item, true);
  if (removedChild) {
    removedChild.dispose();
  }
};


/**
 * Removes a menu item at a given index in the menu and disposes of it.
 * @param {number} n Index of item.
 * @deprecated Use {@link #removeChildAt} instead.
 */
Menu.prototype.removeItemAt = function(n) {
  var removedChild = this.removeChildAt(n, true);
  if (removedChild) {
    removedChild.dispose();
  }
};


/**
 * Returns a reference to the menu item at a given index.
 * @param {number} n Index of menu item.
 * @return {MenuHeader|MenuItem|MenuSeparator|null}
 *     Reference to the menu item.
 * @deprecated Use {@link #getChildAt} instead.
 */
Menu.prototype.getItemAt = function(n) {
  return /** @type {MenuItem?} */ (this.getChildAt(n));
};


/**
 * Returns the number of items in the menu (including separators).
 * @return {number} The number of items in the menu.
 * @deprecated Use {@link #getChildCount} instead.
 */
Menu.prototype.getItemCount = function() {
  return this.getChildCount();
};


/**
 * Returns an array containing the menu items contained in the menu.
 * @return {!Array<MenuItem>} An array of menu items.
 * @deprecated Use getChildAt, forEachChild, and getChildCount.
 */
Menu.prototype.getItems = function() {
  // TODO(user): Remove reference to getItems and instead use getChildAt,
  // forEachChild, and getChildCount
  var children = [];
  this.forEachChild(function(child) {
    children.push(child);
  });
  return children;
};


/**
 * Sets the position of the menu relative to the view port.
 * @param {number|Coordinate} x Left position or coordinate obj.
 * @param {number=} opt_y Top position.
 */
Menu.prototype.setPosition = function(x, opt_y) {
  // NOTE(user): It is necessary to temporarily set the display from none, so
  // that the position gets set correctly.
  var visible = this.isVisible();
  if (!visible) {
    style.setElementShown(this.getElement(), true);
  }
  style.setPageOffset(this.getElement(), x, opt_y);
  if (!visible) {
    style.setElementShown(this.getElement(), false);
  }
};


/**
 * Gets the page offset of the menu, or null if the menu isn't visible
 * @return {Coordinate?} Object holding the x-y coordinates of the
 *     menu or null if the menu is not visible.
 */
Menu.prototype.getPosition = function() {
  return this.isVisible() ? style.getPageOffset(this.getElement()) : null;
};


/**
 * Sets whether the menu can automatically move focus to its key event target
 * when it is set to visible.
 * @param {boolean} allow Whether the menu can automatically move focus to its
 *     key event target when it is set to visible.
 */
Menu.prototype.setAllowAutoFocus = function(allow) {
  this.allowAutoFocus_ = allow;
  if (allow) {
    this.setFocusable(true);
  }
};


/**
 * @return {boolean} Whether the menu can automatically move focus to its key
 *     event target when it is set to visible.
 */
Menu.prototype.getAllowAutoFocus = function() {
  return this.allowAutoFocus_;
};


/**
 * Sets whether the menu will highlight disabled menu items or skip to the next
 * active item.
 * @param {boolean} allow Whether the menu will highlight disabled menu items or
 *     skip to the next active item.
 */
Menu.prototype.setAllowHighlightDisabled = function(allow) {
  this.allowHighlightDisabled_ = allow;
};


/**
 * @return {boolean} Whether the menu will highlight disabled menu items or skip
 *     to the next active item.
 */
Menu.prototype.getAllowHighlightDisabled = function() {
  return this.allowHighlightDisabled_;
};


/**
 * @override
 * @param {boolean} show Whether to show or hide the menu.
 * @param {boolean=} opt_force If true, doesn't check whether the menu
 *     already has the requested visibility, and doesn't dispatch any events.
 * @param {Event=} opt_e Mousedown event that caused this menu to
 *     be made visible (ignored if show is false).
 */
Menu.prototype.setVisible = function(show, opt_force, opt_e) {
  var visibilityChanged =
      Menu.superClass_.setVisible.call(this, show, opt_force);
  if (visibilityChanged && show && this.isInDocument() &&
      this.allowAutoFocus_) {
    this.getKeyEventTarget().focus();
  }
  if (show && opt_e && typeof opt_e.clientX === 'number') {
    /** @suppress {strictMissingProperties} Added to tighten compiler checks */
    this.openingCoords = new Coordinate(opt_e.clientX, opt_e.clientY);
  } else {
    this.openingCoords = null;
  }
  return visibilityChanged;
};


/** @override */
Menu.prototype.handleEnterItem = function(e) {
  if (this.allowAutoFocus_) {
    this.getKeyEventTarget().focus();
  }

  return Menu.superClass_.handleEnterItem.call(this, e);
};


/**
 * Highlights the next item that begins with the specified string.  If no
 * (other) item begins with the given string, the selection is unchanged.
 * @param {string} charStr The prefix to match.
 * @return {boolean} Whether a matching prefix was found.
 */
Menu.prototype.highlightNextPrefix = function(charStr) {
  var re = new RegExp('^' + googString.regExpEscape(charStr), 'i');
  return this.highlightHelper(function(index, max) {
    // Index is >= -1 because it is set to -1 when nothing is selected.
    var start = index < 0 ? 0 : index;
    var wrapped = false;

    // We always start looking from one after the current, because we
    // keep the current selection only as a last resort. This makes the
    // loop a little awkward in the case where there is no current
    // selection, as we need to stop somewhere but can't just stop
    // when index == start, which is why we need the 'wrapped' flag.
    do {
      ++index;
      if (index == max) {
        index = 0;
        wrapped = true;
      }
      var name = this.getChildAt(index).getCaption();
      if (name && name.match(re)) {
        return index;
      }
    } while (!wrapped || index != start);
    return this.getHighlightedIndex();
  }, this.getHighlightedIndex());
};


/** @override */
Menu.prototype.canHighlightItem = function(item) {
  return (this.allowHighlightDisabled_ || item.isEnabled()) &&
      item.isVisible() && item.isSupportedState(uiComponent.State.HOVER);
};


/** @override */
Menu.prototype.decorateInternal = function(element) {
  this.decorateContent(element);
  Menu.superClass_.decorateInternal.call(this, element);
};


/** @override */
Menu.prototype.handleKeyEventInternal = function(e) {
  var handled = Menu.base(this, 'handleKeyEventInternal', e);
  if (!handled) {
    // Loop through all child components, and for each menu item call its
    // key event handler so that keyboard mnemonics can be handled.
    this.forEachChild(function(menuItem) {
      if (!handled && menuItem.getMnemonic &&
          menuItem.getMnemonic() == e.keyCode) {
        if (this.isEnabled()) {
          this.setHighlighted(menuItem);
        }
        // We still delegate to handleKeyEvent, so that it can handle
        // enabled/disabled state.
        handled = menuItem.handleKeyEvent(e);
      }
    }, this);
  }
  return handled;
};


/** @override */
Menu.prototype.setHighlightedIndex = function(index) {
  Menu.base(this, 'setHighlightedIndex', index);

  // Bring the highlighted item into view. This has no effect if the menu is not
  // scrollable.
  var child = this.getChildAt(index);
  if (child) {
    style.scrollIntoContainerView(child.getElement(), this.getElement());
  }
};


/**
 * Decorate menu items located in any descendant node which as been explicitly
 * marked as a 'content' node.
 * @param {Element} element Element to decorate.
 * @protected
 */
Menu.prototype.decorateContent = function(element) {
  var renderer = this.getRenderer();
  var contentElements = this.getDomHelper().getElementsByTagNameAndClass(
      TagName.DIV, goog.getCssName(renderer.getCssClass(), 'content'),
      element);

  // Some versions of IE do not like it when you access this nodeList
  // with invalid indices. See
  // http://code.google.com/p/closure-library/issues/detail?id=373
  var length = contentElements.length;
  for (var i = 0; i < length; i++) {
    renderer.decorateChildren(this, contentElements[i]);
  }
};
