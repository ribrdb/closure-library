/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A class representing menu items that open a submenu.
 * @see Menu
 *
 * @see ../demos/submenus.html
 * @see ../demos/submenus2.html
 */

goog.declareModuleId('goog.ui.submenu');

import { Timer } from '../timer/timer.js';
import * as asserts from '../asserts/asserts.js';
import * as dom from '../dom/dom.js';
import * as classlist from '../dom/classlist.js';
import { KeyCodes } from '../events/keycodes.js';
import { AnchoredViewportPosition } from '../positioning/anchoredviewportposition.js';
import { Corner } from '../positioning/positioning.js';
import * as style from '../style/style.js';
import { Component } from './component.js';
import { Menu } from './menu.js';
import { MenuItem } from './menuitem.js';
import { SubMenuRenderer } from './submenurenderer.js';
import * as registry from './registry.js';
const { BrowserEvent } = goog.requireType('goog.events.browserevent');
const {Event} = goog.requireType('goog.events.event');
const {KeyEvent} = goog.requireType('goog.events.keyevent');
const {ControlContent} = goog.requireType('goog.ui.controlcontent');
const {MenuHeader} = goog.requireType('goog.ui.menuheader');
const {MenuItemRenderer} = goog.requireType('goog.ui.menuitemrenderer');
const {MenuSeparator} = goog.requireType('goog.ui.menuseparator');



/**
 * Class representing a submenu that can be added as an item to other menus.
 *
 * @param {ControlContent} content Text caption or DOM structure to
 *     display as the content of the submenu (use to add icons or styling to
 *     menus).
 * @param {*=} opt_model Data/model associated with the menu item.
 * @param {dom.DomHelper=} opt_domHelper Optional dom helper used for dom
 *     interactions.
 * @param {MenuItemRenderer=} opt_renderer Renderer used to render or
 *     decorate the component; defaults to {@link SubMenuRenderer}.
 * @constructor
 * @extends {MenuItem}
 */
export function SubMenu(content, opt_model, opt_domHelper, opt_renderer) {
  MenuItem.call(
      this, content, opt_model, opt_domHelper,
      opt_renderer || SubMenuRenderer.getInstance());
}
goog.inherits(SubMenu, MenuItem);


/**
 * The delay before opening the sub menu in milliseconds.
 * @type {number}
 */
SubMenu.MENU_DELAY_MS = 218;


/**
 * Timer used to dismiss the submenu when the item becomes unhighlighted.
 * @type {?number}
 * @private
 */
SubMenu.prototype.dismissTimer_ = null;


/**
 * Timer used to show the submenu on mouseover.
 * @type {?number}
 * @private
 */
SubMenu.prototype.showTimer_ = null;


/**
 * Whether the submenu believes the menu is visible.
 * @type {boolean}
 * @private
 */
SubMenu.prototype.menuIsVisible_ = false;


/**
 * The lazily created sub menu.
 * @type {Menu?}
 * @private
 */
SubMenu.prototype.subMenu_ = null;


/**
 * Whether or not the sub-menu was set explicitly.
 * @type {boolean}
 * @private
 */
SubMenu.prototype.externalSubMenu_ = false;


/**
 * Whether or not to align the submenu at the end of the parent menu.
 * If true, the menu expands to the right in LTR languages and to the left
 * in RTL langauges.
 * @type {boolean}
 * @private
 */
SubMenu.prototype.alignToEnd_ = true;


/**
 * Whether the position of this submenu may be adjusted to fit
 * the visible area, as in {@link goog.ui.Popup.positionAtCoordinate}.
 * @type {boolean}
 * @private
 */
SubMenu.prototype.isPositionAdjustable_ = false;


/** @override */
SubMenu.prototype.enterDocument = function() {
  SubMenu.superClass_.enterDocument.call(this);

  this.getHandler().listen(
      this.getParent(), Component.ComponentEventType.HIDE, this.onParentHidden_);

  if (this.subMenu_) {
    this.setMenuListenersEnabled_(this.subMenu_, true);
  }
};


/** @override */
SubMenu.prototype.exitDocument = function() {
  this.getHandler().unlisten(
      this.getParent(), Component.ComponentEventType.HIDE, this.onParentHidden_);

  if (this.subMenu_) {
    this.setMenuListenersEnabled_(this.subMenu_, false);
    if (!this.externalSubMenu_) {
      this.subMenu_.exitDocument();
      dom.removeNode(this.subMenu_.getElement());
    }
  }

  SubMenu.superClass_.exitDocument.call(this);
};


/** @override */
SubMenu.prototype.disposeInternal = function() {
  if (this.subMenu_ && !this.externalSubMenu_) {
    this.subMenu_.dispose();
  }
  this.subMenu_ = null;
  SubMenu.superClass_.disposeInternal.call(this);
};


/**
 * @override
 * Dismisses the submenu on a delay, with the result that the user needs less
 * accuracy when moving to submenus.  Alternate implementations could use
 * geometry instead of a timer.
 * @param {boolean} highlight Whether item should be highlighted.
 * @param {boolean=} opt_btnPressed Whether the mouse button is held down.
 */
SubMenu.prototype.setHighlighted = function(highlight, opt_btnPressed) {
  SubMenu.superClass_.setHighlighted.call(this, highlight);

  if (opt_btnPressed) {
    this.getMenu().setMouseButtonPressed(true);
  }

  if (!highlight) {
    if (this.dismissTimer_) {
      Timer.clear(this.dismissTimer_);
    }
    this.dismissTimer_ =
        Timer.callOnce(this.dismissSubMenu, this.getMenuDelay(), this);
  }
};


/**
 * Show the submenu and ensure that all siblings are hidden.
 */
SubMenu.prototype.showSubMenu = function() {
  // Only show the menu if this item is still selected. This is called on a
  // timeout, so make sure our parent still exists.
  var parent = this.getParent();
  if (parent && parent.getHighlighted() == this) {
    this.setSubMenuVisible_(true);
    this.dismissSiblings_();
  }
};


/**
 * Dismisses the menu and all further submenus.
 */
SubMenu.prototype.dismissSubMenu = function() {
  // Because setHighlighted calls this function on a timeout, we need to make
  // sure that the sub menu hasn't been disposed when we come back.
  var subMenu = this.subMenu_;
  if (subMenu && subMenu.getParent() == this) {
    this.setSubMenuVisible_(false);
    subMenu.forEachChild(function(child) {
      if (typeof child.dismissSubMenu == 'function') {
        child.dismissSubMenu();
      }
    });
  }
};


/**
 * Clears the show and hide timers for the sub menu.
 */
SubMenu.prototype.clearTimers = function() {
  if (this.dismissTimer_) {
    Timer.clear(this.dismissTimer_);
  }
  if (this.showTimer_) {
    Timer.clear(this.showTimer_);
  }
};


/**
 * Sets the menu item to be visible or invisible.
 * @param {boolean} visible Whether to show or hide the component.
 * @param {boolean=} opt_force If true, doesn't check whether the component
 *     already has the requested visibility, and doesn't dispatch any events.
 * @return {boolean} Whether the visibility was changed.
 * @override
 */
SubMenu.prototype.setVisible = function(visible, opt_force) {
  var visibilityChanged =
      SubMenu.superClass_.setVisible.call(this, visible, opt_force);
  // For menus that allow menu items to be hidden (i.e. ComboBox) ensure that
  // the submenu is hidden.
  if (visibilityChanged && !this.isVisible()) {
    this.dismissSubMenu();
  }
  return visibilityChanged;
};


/**
 * Dismiss all the sub menus of sibling menu items.
 * @private
 */
SubMenu.prototype.dismissSiblings_ = function() {
  this.getParent().forEachChild(function(child) {
    if (child != this && typeof child.dismissSubMenu == 'function') {
      child.dismissSubMenu();
      child.clearTimers();
    }
  }, this);
};


/**
 * Handles a key event that is passed to the menu item from its parent because
 * it is highlighted.  If the arrow keys or enter key is pressed the sub menu
 * takes control and delegates further key events to its menu until it is
 * dismissed.
 * @param {KeyEvent} e A key event.
 * @return {boolean} Whether the event was handled.
 * @override
 */
SubMenu.prototype.handleKeyEvent = function(e) {
  var keyCode = e.keyCode;
  var arrowOpenKeyCode = this.isRightToLeft() ? KeyCodes.LEFT :
                                                KeyCodes.RIGHT;
  var closeKeyCode = this.isRightToLeft() ? KeyCodes.RIGHT :
                                            KeyCodes.LEFT;

  if (!this.menuIsVisible_) {
    // Menu item doesn't have keyboard control and the correct key was pressed.
    // So open take keyboard control and open the sub menu.
    if (this.isEnabled() &&
        (keyCode == arrowOpenKeyCode || keyCode == KeyCodes.ENTER ||
         keyCode == this.getMnemonic())) {
      this.showSubMenu();
      this.getMenu().highlightFirst();
      this.clearTimers();

      // The menu item doesn't currently care about the key events so let the
      // parent menu handle them accordingly .
    } else {
      return false;
    }

    // Menu item has control, so let its menu try to handle the keys (this may
    // in turn be handled by sub-sub menus).
  } else if (this.getMenu().handleKeyEvent(e)) {
    // Nothing to do

    // The menu has control and the key hasn't yet been handled, on left arrow
    // we turn off key control.
  } else if (keyCode == closeKeyCode) {
    this.dismissSubMenu();

  } else {
    // Submenu didn't handle the key so let the parent decide what to do.
    return false;
  }

  e.preventDefault();
  return true;
};


/**
 * Listens to the sub menus items and ensures that this menu item is selected
 * while dismissing the others.  This handles the case when the user mouses
 * over other items on their way to the sub menu.
 * @param {Event} e Enter event to handle.
 * @private
 */
SubMenu.prototype.onChildEnter_ = function(e) {
  if (this.subMenu_.getParent() == this) {
    this.clearTimers();
    this.getParentEventTarget().setHighlighted(this);
    this.dismissSiblings_();
  }
};


/**
 * Listens to the parent menu's hide event and ensures that all submenus are
 * hidden at the same time.
 * @param {Event} e The event.
 * @private
 */
SubMenu.prototype.onParentHidden_ = function(e) {
  // Ignore propagated events
  if (e.target == this.getParentEventTarget()) {
    // TODO(user): Using an event for this is expensive.  Consider having a
    // generalized interface that the parent menu calls on its children when
    // it is hidden.
    this.dismissSubMenu();
    this.clearTimers();
  }
};


/**
 * @override
 * Sets a timer to show the submenu and then dispatches an ENTER event to the
 * parent menu.
 * @param {BrowserEvent} e Mouse event to handle.
 */
SubMenu.prototype.handleMouseOver = function(e) {
  if (this.isEnabled()) {
    this.clearTimers();
    this.showTimer_ =
        Timer.callOnce(this.showSubMenu, this.getMenuDelay(), this);
  }
  SubMenu.superClass_.handleMouseOver.call(this, e);
};


/**
 * Returns the delay before opening or closing the menu in milliseconds.
 * @return {number}
 * @protected
 */
SubMenu.prototype.getMenuDelay = function() {
  return SubMenu.MENU_DELAY_MS;
};


/**
 * Overrides the default mouseup event handler, so that the ACTION isn't
 * dispatched for the submenu itself, instead the submenu is shown instantly.
 * @param {Event} e The browser event.
 * @return {boolean} True if the action was allowed to proceed, false otherwise.
 * @override
 */
SubMenu.prototype.performActionInternal = function(e) {
  this.clearTimers();
  var shouldHandleClick =
      this.isSupportedState(Component.State.SELECTED) ||
      this.isSupportedState(Component.State.CHECKED);
  if (shouldHandleClick) {
    return SubMenu.superClass_.performActionInternal.call(this, e);
  } else {
    this.showSubMenu();
    return true;
  }
};


/**
 * Sets the visiblility of the sub menu.
 * @param {boolean} visible Whether to show menu.
 * @private
 */
SubMenu.prototype.setSubMenuVisible_ = function(visible) {
  // Unhighlighting the menuitems if closing the menu so the event handlers can
  // determine the correct state.
  if (!visible && this.getMenu()) {
    this.getMenu().setHighlightedIndex(-1);
  }

  // Dispatch OPEN event before calling getMenu(), so we can create the menu
  // lazily on first access.
  this.dispatchEvent(
      Component.getStateTransitionEvent(
          Component.State.OPENED, visible));
  var subMenu = this.getMenu();
  if (visible != this.menuIsVisible_) {
    classlist.enable(
        asserts.assert(this.getElement()),
        goog.getCssName('goog-submenu-open'), visible);
  }
  if (visible != subMenu.isVisible()) {
    if (visible) {
      // Lazy-render menu when first shown, if needed.
      if (!subMenu.isInDocument()) {
        subMenu.render();
      }
      subMenu.setHighlightedIndex(-1);
    }
    subMenu.setVisible(visible);
    // We must position after the menu is visible, otherwise positioning logic
    // breaks in RTL.
    if (visible) {
      this.positionSubMenu();
    }
  }
  this.menuIsVisible_ = visible;
};


/**
 * Attaches or detaches menu event listeners to/from the given menu.  Called
 * each time a menu is attached to or detached from the submenu.
 * @param {Menu} menu Menu on which to listen for events.
 * @param {boolean} attach Whether to attach or detach event listeners.
 * @private
 */
SubMenu.prototype.setMenuListenersEnabled_ = function(menu, attach) {
  var handler = this.getHandler();
  var method = attach ? handler.listen : handler.unlisten;
  method.call(
      handler, menu, Component.ComponentEventType.ENTER, this.onChildEnter_);
};


/**
 * Sets whether the submenu is aligned at the end of the parent menu.
 * @param {boolean} alignToEnd True to align to end, false to align to start.
 */
SubMenu.prototype.setAlignToEnd = function(alignToEnd) {
  if (alignToEnd != this.alignToEnd_) {
    this.alignToEnd_ = alignToEnd;
    if (this.isInDocument()) {
      // Completely re-render the widget.
      var oldElement = this.getElement();
      this.exitDocument();

      if (oldElement.nextSibling) {
        this.renderBefore(/** @type {!Element} */ (oldElement.nextSibling));
      } else {
        this.render(/** @type {Element} */ (oldElement.parentNode));
      }
    }
  }
};


/**
 * Determines whether the submenu is aligned at the end of the parent menu.
 * @return {boolean} True if aligned to the end (the default), false if
 *     aligned to the start.
 */
SubMenu.prototype.isAlignedToEnd = function() {
  return this.alignToEnd_;
};


/**
 * Positions the submenu. This method should be called if the sub menu is
 * opened and the menu element's size changes (e.g., when adding/removing items
 * to an opened sub menu).
 */
SubMenu.prototype.positionSubMenu = function() {
  var position = new AnchoredViewportPosition(
      this.getElement(),
      this.isAlignedToEnd() ? Corner.TOP_END :
                              Corner.TOP_START,
      this.isPositionAdjustable_);

  // TODO(user): Clean up popup code and have this be a one line call
  var subMenu = this.getMenu();
  var el = subMenu.getElement();
  if (!subMenu.isVisible()) {
    el.style.visibility = 'hidden';
    style.setElementShown(el, true);
  }

  position.reposition(
      el, this.isAlignedToEnd() ? Corner.TOP_START :
                                  Corner.TOP_END);

  if (!subMenu.isVisible()) {
    style.setElementShown(el, false);
    el.style.visibility = 'visible';
  }
};


// Methods delegated to sub-menu but accessible here for convinience


/**
 * Adds a new menu item at the end of the menu.
 * @param {MenuHeader|MenuItem|MenuSeparator} item Menu
 *     item to add to the menu.
 */
SubMenu.prototype.addItem = function(item) {
  this.getMenu().addChild(item, true);
};


/**
 * Adds a new menu item at a specific index in the menu.
 * @param {MenuHeader|MenuItem|MenuSeparator} item Menu
 *     item to add to the menu.
 * @param {number} n Index at which to insert the menu item.
 */
SubMenu.prototype.addItemAt = function(item, n) {
  this.getMenu().addChildAt(item, n, true);
};


/**
 * Removes an item from the menu and disposes it.
 * @param {MenuItem} item The menu item to remove.
 */
SubMenu.prototype.removeItem = function(item) {
  var child = this.getMenu().removeChild(item, true);
  if (child) {
    child.dispose();
  }
};


/**
 * Removes a menu item at a given index in the menu and disposes it.
 * @param {number} n Index of item.
 */
SubMenu.prototype.removeItemAt = function(n) {
  var child = this.getMenu().removeChildAt(n, true);
  if (child) {
    child.dispose();
  }
};


/**
 * Returns a reference to the menu item at a given index.
 * @param {number} n Index of menu item.
 * @return {Component} Reference to the menu item.
 */
SubMenu.prototype.getItemAt = function(n) {
  return this.getMenu().getChildAt(n);
};


/**
 * Returns the number of items in the sub menu (including separators).
 * @return {number} The number of items in the menu.
 */
SubMenu.prototype.getItemCount = function() {
  return this.getMenu().getChildCount();
};


/**
 * Returns the menu items contained in the sub menu.
 * @return {!Array<!MenuItem>} An array of menu items.
 * @deprecated Use getItemAt/getItemCount instead.
 */
SubMenu.prototype.getItems = function() {
  return this.getMenu().getItems();
};


/**
 * Gets a reference to the submenu's actual menu.
 * @return {!Menu} Reference to the object representing the sub menu.
 */
SubMenu.prototype.getMenu = function() {
  if (!this.subMenu_) {
    this.setMenu(
        new Menu(this.getDomHelper()), /* opt_internal */ true);
  } else if (this.externalSubMenu_ && this.subMenu_.getParent() != this) {
    // Since it is possible for the same popup menu to be attached to multiple
    // submenus, we need to ensure that it has the correct parent event target.
    this.subMenu_.setParent(this);
  }
  // Always create the menu DOM, for backward compatibility.
  if (!this.subMenu_.getElement()) {
    this.subMenu_.createDom();
  }
  return this.subMenu_;
};


/**
 * Sets the submenu to a specific menu.
 * @param {Menu} menu The menu to show when this item is selected.
 * @param {boolean=} opt_internal Whether this menu is an "internal" menu, and
 *     should be disposed of when this object is disposed of.
 */
SubMenu.prototype.setMenu = function(menu, opt_internal) {
  var oldMenu = this.subMenu_;
  if (menu != oldMenu) {
    if (oldMenu) {
      this.dismissSubMenu();
      if (this.isInDocument()) {
        this.setMenuListenersEnabled_(oldMenu, false);
      }
    }

    this.subMenu_ = menu;
    this.externalSubMenu_ = !opt_internal;

    if (menu) {
      menu.setParent(this);
      // There's no need to dispatch a HIDE event during submenu construction.
      menu.setVisible(false, /* opt_force */ true);
      menu.setAllowAutoFocus(false);
      menu.setFocusable(false);
      if (this.isInDocument()) {
        this.setMenuListenersEnabled_(menu, true);
      }
    }
  }
};


/**
 * Returns true if the provided element is to be considered inside the menu for
 * purposes such as dismissing the menu on an event.  This is so submenus can
 * make use of elements outside their own DOM.
 * @param {Element} element The element to test for.
 * @return {boolean} Whether or not the provided element is contained.
 */
SubMenu.prototype.containsElement = function(element) {
  return this.getMenu().containsElement(element);
};


/**
 * @param {boolean} isAdjustable Whether this submenu is adjustable.
 */
SubMenu.prototype.setPositionAdjustable = function(isAdjustable) {
  this.isPositionAdjustable_ = !!isAdjustable;
};


/**
 * @return {boolean} Whether this submenu is adjustable.
 */
SubMenu.prototype.isPositionAdjustable = function() {
  return this.isPositionAdjustable_;
};


/* Register a decorator factory function for SubMenus.*/
registry.setDecoratorByClassName(
    goog.getCssName('goog-submenu'), function() {
  return new SubMenu(null);
});
