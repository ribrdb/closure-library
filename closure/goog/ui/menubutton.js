/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A menu button control.
 *
 * @see ../demos/menubutton.html
 */

goog.declareModuleId('goog.ui.menubutton');

import { Timer } from '../timer/timer.js';
import * as aria from '../a11y/aria/aria.js';
import { State } from '../a11y/aria/attributes.js';
import * as asserts from '../asserts/asserts.js';
import * as dom from '../dom/dom.js';
import { EventType } from '../events/eventtype.js';
import { KeyCodes } from '../events/keycodes.js';
import { KeyHandler } from '../events/keyhandler.js';
import { Box } from '../math/box.js';
import { Coordinate } from '../math/coordinate.js';
import { Rect } from '../math/rect.js';
import * as positioning from '../positioning/positioning.js';
import { Corner, Overflow } from '../positioning/positioning.js';
import { MenuAnchoredPosition } from '../positioning/menuanchoredposition.js';
import * as style from '../style/style.js';
import { Button } from './button.js';
import { Component } from './component.js';
import { IdGenerator } from './idgenerator.js';
import { Menu } from './menu.js';
import { MenuButtonRenderer } from './menubuttonrenderer.js';
import { MenuItem } from './menuitem.js';
import { MenuRenderer } from './menurenderer.js';
import { SubMenu } from './submenu.js';
import * as registry from './registry.js';
const { BrowserEvent } = goog.requireType('goog.events.browserevent');
const { Event } = goog.requireType('goog.events.event');
const { EventTarget } = goog.requireType('goog.events.eventtarget');
const {Size} = goog.requireType('goog.math.size');
const {AnchoredPosition} = goog.requireType('goog.positioning.anchoredposition');
const {ButtonRenderer} = goog.requireType('goog.ui.buttonrenderer');
const {Control} = goog.requireType('goog.ui.control');
const {ControlContent} = goog.requireType('goog.ui.controlcontent');
const {MenuSeparator} = goog.requireType('goog.ui.menuseparator');



/**
 * A menu button control.  Extends {@link Button} by composing a button
 * with a dropdown arrow and a popup menu.
 *
 * @param {ControlContent=} opt_content Text caption or existing DOM
 *     structure to display as the button's caption (if any).
 * @param {Menu=} opt_menu Menu to render under the button when clicked.
 * @param {ButtonRenderer=} opt_renderer Renderer used to render or
 *     decorate the menu button; defaults to {@link MenuButtonRenderer}.
 * @param {dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @param {!MenuRenderer=} opt_menuRenderer Renderer used to render or
 *     decorate the menu; defaults to {@link MenuRenderer}.
 * @constructor
 * @extends {Button}
 */
export function MenuButton(opt_content, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer) {
  Button.call(
      this, opt_content,
      opt_renderer || MenuButtonRenderer.getInstance(), opt_domHelper);

  // Menu buttons support the OPENED state.
  this.setSupportedState(Component.State.OPENED, true);

  /**
     * The menu position on this button.
     * @type {!AnchoredPosition}
     * @private
     */
  this.menuPosition_ = new MenuAnchoredPosition(
      null, Corner.BOTTOM_START);

  if (opt_menu) {
    this.setMenu(opt_menu);
  }
  this.menuMargin_ = null;
  this.timer_ = new Timer(500);  // 0.5 sec

  /**
   * Whether the enter or space key should close the menu, if it is already
   * open. This should be true for accessibility reasons, but is provided as an
   * option for backward compatibility.
   * @private {boolean}
   */
  this.closeOnEnterOrSpace_ = true;

  /** @private {!MenuRenderer} */
  this.menuRenderer_ = opt_menuRenderer || MenuRenderer.getInstance();
}
goog.inherits(MenuButton, Button);


/**
 * The menu.
 * @type {Menu|undefined}
 * @private
 */
MenuButton.prototype.menu_;


/**
 * The position element.  If set, use positionElement_ to position the
 * popup menu instead of the default which is to use the menu button element.
 * @type {Element|undefined}
 * @private
 */
MenuButton.prototype.positionElement_;


/**
 * The margin to apply to the menu's position when it is shown.  If null, no
 * margin will be applied.
 * @type {Box}
 * @private
 */
MenuButton.prototype.menuMargin_;


/**
 * Whether the attached popup menu is focusable or not (defaults to false).
 * Popup menus attached to menu buttons usually don't need to be focusable,
 * i.e. the button retains keyboard focus, and forwards key events to the
 * menu for processing.  However, menus like {@link goog.ui.FilteredMenu}
 * need to be focusable.
 * @type {boolean}
 * @private
 */
MenuButton.prototype.isFocusablePopupMenu_ = false;


/**
 * A Timer to correct menu position.
 * @type {Timer}
 * @private
 */
MenuButton.prototype.timer_;


/**
 * The bounding rectangle of the button element.
 * @type {Rect}
 * @private
 */
MenuButton.prototype.buttonRect_;


/**
 * The viewport rectangle.
 * @type {Box}
 * @private
 */
MenuButton.prototype.viewportBox_;


/**
 * The original size.
 * @type {Size|undefined}
 * @private
 */
MenuButton.prototype.originalSize_;


/**
 * Do we render the drop down menu as a sibling to the label, or at the end
 * of the current dom?
 * @type {boolean}
 * @private
 */
MenuButton.prototype.renderMenuAsSibling_ = false;


/**
 * Whether to select the first item in the menu when it is opened using
 * enter or space. By default, the first item is selected only when
 * opened by a key up or down event. When this is on, the first item will
 * be selected due to any of the four events.
 * @private
 */
MenuButton.prototype.selectFirstOnEnterOrSpace_ = false;


/**
 * Sets up event handlers specific to menu buttons.
 * @override
 */
MenuButton.prototype.enterDocument = function() {
  MenuButton.superClass_.enterDocument.call(this);
  this.attachKeyDownEventListener_(true);
  if (this.menu_) {
    this.attachMenuEventListeners_(this.menu_, true);
  }
  aria.setState(
      this.getElementStrict(), State.HASPOPUP, !!this.menu_);
};


/**
 * Removes event handlers specific to menu buttons, and ensures that the
 * attached menu also exits the document.
 * @override
 */
MenuButton.prototype.exitDocument = function() {
  MenuButton.superClass_.exitDocument.call(this);
  this.attachKeyDownEventListener_(false);
  if (this.menu_) {
    this.setOpen(false);
    this.menu_.exitDocument();
    this.attachMenuEventListeners_(this.menu_, false);

    var menuElement = this.menu_.getElement();
    if (menuElement) {
      dom.removeNode(menuElement);
    }
  }
};


/** @override */
MenuButton.prototype.disposeInternal = function() {
  MenuButton.superClass_.disposeInternal.call(this);
  if (this.menu_) {
    this.menu_.dispose();
    delete this.menu_;
  }
  delete this.positionElement_;
  this.timer_.dispose();
};


/**
 * Handles mousedown events.  Invokes the superclass implementation to dispatch
 * an ACTIVATE event and activate the button.  Also toggles the visibility of
 * the attached menu.
 * @param {Event} e Mouse event to handle.
 * @override
 * @protected
 */
MenuButton.prototype.handleMouseDown = function(e) {
  MenuButton.superClass_.handleMouseDown.call(this, e);
  if (this.isActive()) {
    // The component was allowed to activate; toggle menu visibility.
    this.setOpen(!this.isOpen(), e);
    if (this.menu_) {
      this.menu_.setMouseButtonPressed(this.isOpen());
    }
  }
};


/**
 * Handles mouseup events.  Invokes the superclass implementation to dispatch
 * an ACTION event and deactivate the button.
 * @param {Event} e Mouse event to handle.
 * @override
 * @protected
 */
MenuButton.prototype.handleMouseUp = function(e) {
  MenuButton.superClass_.handleMouseUp.call(this, e);
  if (this.menu_ && !this.isActive()) {
    this.menu_.setMouseButtonPressed(false);
  }
};


/**
 * Performs the appropriate action when the menu button is activated by the
 * user.  Overrides the superclass implementation by not dispatching an
 * `ACTION` event, because menu buttons exist only to reveal menus, not to
 * perform actions themselves.  Calls {@link #setActive} to deactivate the
 * button.
 * @param {Event} e Mouse or key event that triggered the action.
 * @return {boolean} Whether the action was allowed to proceed.
 * @override
 * @protected
 */
MenuButton.prototype.performActionInternal = function(e) {
  this.setActive(false);
  return true;
};


/**
 * Handles mousedown events over the document.  If the mousedown happens over
 * an element unrelated to the component, hides the menu.
 * TODO(attila): Reconcile this with goog.ui.Popup (and handle frames/windows).
 * @param {BrowserEvent} e Mouse event to handle.
 * @protected
 */
MenuButton.prototype.handleDocumentMouseDown = function(e) {
  if (this.menu_ && this.menu_.isVisible() &&
      !this.containsElement(/** @type {Element} */ (e.target))) {
    // User clicked somewhere else in the document while the menu was visible;
    // dismiss menu.
    this.setOpen(false);
  }
};


/**
 * Returns true if the given element is to be considered part of the component,
 * even if it isn't a DOM descendant of the component's root element.
 * @param {Element} element Element to test (if any).
 * @return {boolean} Whether the element is considered part of the component.
 * @protected
 */
MenuButton.prototype.containsElement = function(element) {
  return element && dom.contains(this.getElement(), element) ||
      this.menu_ && this.menu_.containsElement(element) || false;
};


/** @override */
MenuButton.prototype.handleKeyEventInternal = function(e) {
  // Handle SPACE on keyup and all other keys on keypress.
  if (e.keyCode == KeyCodes.SPACE) {
    // Prevent page scrolling in Chrome.
    e.preventDefault();
    if (e.type != EventType.KEYUP) {
      // Ignore events because KeyCodes.SPACE is handled further down.
      return true;
    }
  } else if (e.type != KeyHandler.EventType.KEY) {
    return false;
  }

  if (this.menu_ && this.menu_.isVisible()) {
    // Menu is open.
    const isEnterOrSpace = e.keyCode == KeyCodes.ENTER ||
        e.keyCode == KeyCodes.SPACE;
    const handledByMenu = this.menu_.handleKeyEvent(e);
    // If the submenu has handled the key event, then defer to it to close the
    // menu if necessary and do not close it here. This is needed because the
    // enter key should keep the submenu open, but should close other types of
    // menu items.
    // Check for this.menu_ again here because some widgets set this.dispose
    // after handleKeyEvent. Example: go/widget-dispose-ex
    const handledBySubMenu = handledByMenu && this.menu_ &&
        this.menu_.getOpenItem() instanceof SubMenu;
    if (!handledBySubMenu &&
        (e.keyCode == KeyCodes.ESC ||
         (isEnterOrSpace && this.closeOnEnterOrSpace_))) {
      // Dismiss the menu.
      this.setOpen(false);
      return true;
    }
    return handledByMenu;
  }

  if (e.keyCode == KeyCodes.DOWN ||
      e.keyCode == KeyCodes.UP ||
      e.keyCode == KeyCodes.SPACE ||
      e.keyCode == KeyCodes.ENTER) {
    // Menu is closed, and the user hit the down/up/space/enter key; open menu.
    this.setOpen(true, e);
    return true;
  }

  // Key event wasn't handled by the component.
  return false;
};


/**
 * Handles `ACTION` events dispatched by an activated menu item.
 * @param {Event} e Action event to handle.
 * @protected
 */
MenuButton.prototype.handleMenuAction = function(e) {
  // Close the menu on click.
  this.setOpen(false);
};


/**
 * Handles `BLUR` events dispatched by the popup menu by closing it.
 * Only registered if the menu is focusable.
 * @param {Event} e Blur event dispatched by a focusable menu.
 */
MenuButton.prototype.handleMenuBlur = function(e) {
  // Close the menu when it reports that it lost focus, unless the button is
  // pressed (active).
  if (!this.isActive()) {
    this.setOpen(false);
  }
};


/**
 * Handles blur events dispatched by the button's key event target when it
 * loses keyboard focus by closing the popup menu (unless it is focusable).
 * Only registered if the button is focusable.
 * @param {Event} e Blur event dispatched by the menu button.
 * @override
 * @protected
 */
MenuButton.prototype.handleBlur = function(e) {
  if (!this.isFocusablePopupMenu()) {
    this.setOpen(false);
  }
  MenuButton.superClass_.handleBlur.call(this, e);
};


/**
 * Returns the menu attached to the button.  If no menu is attached, creates a
 * new empty menu.
 * @return {Menu} Popup menu attached to the menu button.
 */
MenuButton.prototype.getMenu = function() {
  if (!this.menu_) {
    this.setMenu(new Menu(this.getDomHelper(), this.menuRenderer_));
  }
  return this.menu_ || null;
};


/**
 * Replaces the menu attached to the button with the argument, and returns the
 * previous menu (if any).
 * @param {Menu?} menu New menu to be attached to the menu button (null
 *     to remove the menu).
 * @return {Menu|undefined} Previous menu (undefined if none).
 */
MenuButton.prototype.setMenu = function(menu) {
  var oldMenu = this.menu_;

  // Do nothing unless the new menu is different from the current one.
  if (menu != oldMenu) {
    if (oldMenu) {
      this.setOpen(false);
      if (this.isInDocument()) {
        this.attachMenuEventListeners_(oldMenu, false);
      }
      delete this.menu_;
    }
    if (this.isInDocument()) {
      aria.setState(
          this.getElementStrict(), State.HASPOPUP, !!menu);
    }
    if (menu) {
      this.menu_ = menu;
      menu.setParent(this);
      menu.setVisible(false);
      menu.setAllowAutoFocus(this.isFocusablePopupMenu());
      if (this.isInDocument()) {
        this.attachMenuEventListeners_(menu, true);
      }
    }
  }

  return oldMenu;
};


/**
 * Specify which positioning algorithm to use.
 *
 * This method is preferred over the fine-grained positioning methods like
 * setPositionElement, setAlignMenuToStart, and setScrollOnOverflow. Calling
 * this method will override settings by those methods.
 *
 * @param {AnchoredPosition} position The position of the
 *     Menu the button. If the position has a null anchor, we will use the
 *     menubutton element as the anchor.
 */
MenuButton.prototype.setMenuPosition = function(position) {
  if (position) {
    this.menuPosition_ = position;
    this.positionElement_ = position.element;
  }
};


/**
 * Sets an element for anchoring the menu.
 * @param {Element} positionElement New element to use for
 *     positioning the dropdown menu.  Null to use the default behavior
 *     of positioning to this menu button.
 */
MenuButton.prototype.setPositionElement = function(positionElement) {
  this.positionElement_ = positionElement;
  this.positionMenu();
};


/**
 * Sets a margin that will be applied to the menu's position when it is shown.
 * If null, no margin will be applied.
 * @param {Box} margin Margin to apply.
 */
MenuButton.prototype.setMenuMargin = function(margin) {
  this.menuMargin_ = margin;
};

/**
 * Sets whether the enter or space key should close the menu, if it is already
 * open. By default, only the ESC key will close an open menu.
 * @param {boolean} close Whether pressing Enter or Space when the button has
 *     focus will close the menu if it is already open.
 */
MenuButton.prototype.setCloseOnEnterOrSpace = function(close) {
  this.closeOnEnterOrSpace_ = close;
};

/**
 * Sets whether to select the first item in the menu when it is opened using
 * enter or space. By default, the first item is selected only when
 * opened by a key up or down event. When this is on, the first item will
 * be selected due to any of the four events.
 * @param {boolean} select
 */
MenuButton.prototype.setSelectFirstOnEnterOrSpace = function(select) {
  this.selectFirstOnEnterOrSpace_ = select;
};


/**
 * Adds a new menu item at the end of the menu.
 * @param {MenuItem|MenuSeparator|Control} item Menu
 *     item to add to the menu.
 */
MenuButton.prototype.addItem = function(item) {
  this.getMenu().addChild(item, true);
};


/**
 * Adds a new menu item at the specific index in the menu.
 * @param {MenuItem|MenuSeparator} item Menu item to add to the
 *     menu.
 * @param {number} index Index at which to insert the menu item.
 */
MenuButton.prototype.addItemAt = function(item, index) {
  this.getMenu().addChildAt(item, index, true);
};


/**
 * Removes the item from the menu and disposes of it.
 * @param {MenuItem|MenuSeparator} item The menu item to remove.
 */
MenuButton.prototype.removeItem = function(item) {
  var child = this.getMenu().removeChild(item, true);
  if (child) {
    child.dispose();
  }
};


/**
 * Removes the menu item at a given index in the menu and disposes of it.
 * @param {number} index Index of item.
 */
MenuButton.prototype.removeItemAt = function(index) {
  var child = this.getMenu().removeChildAt(index, true);
  if (child) {
    child.dispose();
  }
};


/**
 * Returns the menu item at a given index.
 * @param {number} index Index of menu item.
 * @return {MenuItem?} Menu item (null if not found).
 */
MenuButton.prototype.getItemAt = function(index) {
  return this.menu_ ?
      /** @type {MenuItem} */ (this.menu_.getChildAt(index)) :
      null;
};


/**
 * Returns the number of items in the menu (including separators).
 * @return {number} The number of items in the menu.
 */
MenuButton.prototype.getItemCount = function() {
  return this.menu_ ? this.menu_.getChildCount() : 0;
};


/**
 * Shows/hides the menu button based on the value of the argument.  Also hides
 * the popup menu if the button is being hidden.
 * @param {boolean} visible Whether to show or hide the button.
 * @param {boolean=} opt_force If true, doesn't check whether the component
 *     already has the requested visibility, and doesn't dispatch any events.
 * @return {boolean} Whether the visibility was changed.
 * @override
 */
MenuButton.prototype.setVisible = function(visible, opt_force) {
  var visibilityChanged =
      MenuButton.superClass_.setVisible.call(this, visible, opt_force);
  if (visibilityChanged && !this.isVisible()) {
    this.setOpen(false);
  }
  return visibilityChanged;
};


/**
 * Enables/disables the menu button based on the value of the argument, and
 * updates its CSS styling.  Also hides the popup menu if the button is being
 * disabled.
 * @param {boolean} enable Whether to enable or disable the button.
 * @override
 */
MenuButton.prototype.setEnabled = function(enable) {
  MenuButton.superClass_.setEnabled.call(this, enable);
  if (!this.isEnabled()) {
    this.setOpen(false);
  }
};


// TODO(nicksantos): AlignMenuToStart and ScrollOnOverflow and PositionElement
// should all be deprecated, in favor of people setting their own
// AnchoredPosition with the parameters they need. Right now, we try
// to be backwards-compatible as possible, but this is incomplete because
// the APIs are non-orthogonal.


/**
 * @return {boolean} Whether the menu is aligned to the start of the button
 *     (left if the render direction is left-to-right, right if the render
 *     direction is right-to-left).
 */
MenuButton.prototype.isAlignMenuToStart = function() {
  var corner = this.menuPosition_.corner;
  return corner == Corner.BOTTOM_START ||
      corner == Corner.TOP_START;
};


/**
 * Sets whether the menu is aligned to the start or the end of the button.
 * @param {boolean} alignToStart Whether the menu is to be aligned to the start
 *     of the button (left if the render direction is left-to-right, right if
 *     the render direction is right-to-left).
 */
MenuButton.prototype.setAlignMenuToStart = function(alignToStart) {
  this.menuPosition_.corner = alignToStart ?
      Corner.BOTTOM_START :
      Corner.BOTTOM_END;
};


/**
 * Sets whether the menu should scroll when it's too big to fix vertically on
 * the screen.  The css of the menu element should have overflow set to auto.
 * Note: Adding or removing items while the menu is open will not work correctly
 * if scrollOnOverflow is on.
 * @param {boolean} scrollOnOverflow Whether the menu should scroll when too big
 *     to fit on the screen.  If false, adjust logic will be used to try and
 *     reposition the menu to fit.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
MenuButton.prototype.setScrollOnOverflow = function(scrollOnOverflow) {
  if (this.menuPosition_.setLastResortOverflow) {
    var overflowX = Overflow.ADJUST_X;
    var overflowY = scrollOnOverflow ? Overflow.RESIZE_HEIGHT :
                                       Overflow.ADJUST_Y;
    this.menuPosition_.setLastResortOverflow(overflowX | overflowY);
  }
};


/**
 * @return {boolean} Whether the menu will scroll when it's to big to fit
 *     vertically on the screen.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
MenuButton.prototype.isScrollOnOverflow = function() {
  return this.menuPosition_.getLastResortOverflow &&
      !!(this.menuPosition_.getLastResortOverflow() &
         Overflow.RESIZE_HEIGHT);
};


/**
 * @return {boolean} Whether the attached menu is focusable.
 */
MenuButton.prototype.isFocusablePopupMenu = function() {
  return this.isFocusablePopupMenu_;
};


/**
 * Sets whether the attached popup menu is focusable.  If the popup menu is
 * focusable, it may steal keyboard focus from the menu button, so the button
 * will not hide the menu on blur.
 * @param {boolean} focusable Whether the attached menu is focusable.
 */
MenuButton.prototype.setFocusablePopupMenu = function(focusable) {
  // TODO(attila):  The menu itself should advertise whether it is focusable.
  this.isFocusablePopupMenu_ = focusable;
};


/**
 * Sets whether to render the menu as a sibling element of the button.
 * Normally, the menu is a child of document.body.  This option is useful if
 * you need the menu to inherit styles from a common parent element, or if you
 * otherwise need it to share a parent element for desired event handling.  One
 * example of the latter is if the parent is in a goog.ui.Popup, to ensure that
 * clicks on the menu are considered being within the popup.
 * @param {boolean} renderMenuAsSibling Whether we render the menu at the end
 *     of the dom or as a sibling to the button/label that renders the drop
 *     down.
 */
MenuButton.prototype.setRenderMenuAsSibling = function(
    renderMenuAsSibling) {
  this.renderMenuAsSibling_ = renderMenuAsSibling;
};


/**
 * Reveals the menu and hooks up menu-specific event handling.
 * @deprecated Use {@link #setOpen} instead.
 */
MenuButton.prototype.showMenu = function() {
  this.setOpen(true);
};


/**
 * Hides the menu and cleans up menu-specific event handling.
 * @deprecated Use {@link #setOpen} instead.
 */
MenuButton.prototype.hideMenu = function() {
  this.setOpen(false);
};


/**
 * Opens or closes the attached popup menu.
 * @param {boolean} open Whether to open or close the menu.
 * @param {Event=} opt_e Event that caused the menu to be opened.
 * @override
 */
MenuButton.prototype.setOpen = function(open, opt_e) {
  MenuButton.superClass_.setOpen.call(this, open);
  if (this.menu_ && this.hasState(Component.State.OPENED) == open) {
    if (open) {
      if (!this.menu_.isInDocument()) {
        if (this.renderMenuAsSibling_) {
          // When we render the menu in the same parent as this button, we
          // prefer to add it immediately after the button. This way, the screen
          // readers will go to the menu on the very next element after the
          // button is read.
          var nextElementSibling =
              dom.getNextElementSibling(this.getElement());
          if (nextElementSibling) {
            this.menu_.renderBefore(nextElementSibling);
          } else {
            this.menu_.render(
                /** @type {Element} */ (this.getElement().parentNode));
          }
        } else {
          this.menu_.render();
        }
      }
      this.viewportBox_ =
          style.getVisibleRectForElement(this.getElement());
      this.buttonRect_ = style.getBounds(this.getElement());
      this.positionMenu();

      // As per aria spec, highlight the first element in the menu when
      // keyboarding up or down. Thus, the first menu item will be announced
      // for screen reader users. If selectFirstOnEnterOrSpace is set, do this
      // for enter or space as well.
      /**
       * @suppress {strictMissingProperties} Added to tighten compiler checks
       */
      var isEnterOrSpace = !!opt_e &&
          (opt_e.keyCode == KeyCodes.ENTER ||
           opt_e.keyCode == KeyCodes.SPACE);
      /**
       * @suppress {strictMissingProperties} Added to tighten compiler checks
       */
      var isUpOrDown = !!opt_e &&
          (opt_e.keyCode == KeyCodes.DOWN ||
           opt_e.keyCode == KeyCodes.UP);
      var focus =
          isUpOrDown || (isEnterOrSpace && this.selectFirstOnEnterOrSpace_);
      if (focus) {
        this.menu_.highlightFirst();
      } else {
        this.menu_.setHighlightedIndex(-1);
      }
    } else {
      this.setActive(false);
      this.menu_.setMouseButtonPressed(false);

      var element = this.getElement();
      // Clear any remaining a11y state.
      if (element) {
        aria.setState(
            element, State.ACTIVEDESCENDANT, '');
        aria.setState(element, State.OWNS, '');
      }

      // Clear any sizes that might have been stored.
      if (this.originalSize_ != null) {
        this.originalSize_ = undefined;
        var elem = this.menu_.getElement();
        if (elem) {
          style.setSize(elem, '', '');
        }
      }
    }
    this.menu_.setVisible(open, false, opt_e);
    // In Pivot Tables the menu button somehow gets disposed of during the
    // setVisible call, causing attachPopupListeners_ to fail.
    // TODO(user): Debug what happens.
    if (!this.isDisposed()) {
      this.attachPopupListeners_(open);
    }
  }
  if (this.menu_ && this.menu_.getElement()) {
    // Remove the aria-hidden state on the menu element so that it won't be
    // hidden to screen readers if it's inside a dialog (see b/17610491).
    aria.removeState(
        this.menu_.getElementStrict(), State.HIDDEN);
  }
};


/**
 * Resets the MenuButton's size.  This is useful for cases where items are added
 * or removed from the menu and scrollOnOverflow is on.  In those cases the
 * menu will not behave correctly and resize itself unless this is called
 * (usually followed by positionMenu()).
 */
MenuButton.prototype.invalidateMenuSize = function() {
  this.originalSize_ = undefined;
};


/**
 * Positions the menu under the button.  May be called directly in cases when
 * the menu size is known to change.
 */
MenuButton.prototype.positionMenu = function() {
  if (!this.menu_.isInDocument()) {
    return;
  }

  var positionElement = this.positionElement_ || this.getElement();
  var position = this.menuPosition_;
  this.menuPosition_.element = positionElement;

  var elem = this.menu_.getElement();
  if (!this.menu_.isVisible()) {
    elem.style.visibility = 'hidden';
    style.setElementShown(elem, true);
  }

  if (!this.originalSize_ && this.isScrollOnOverflow()) {
    this.originalSize_ = style.getSize(elem);
  }
  var popupCorner = positioning.flipCornerVertical(position.corner);
  position.reposition(elem, popupCorner, this.menuMargin_, this.originalSize_);

  if (!this.menu_.isVisible()) {
    style.setElementShown(elem, false);
    elem.style.visibility = 'visible';
  }
};


/**
 * Periodically repositions the menu while it is visible.
 *
 * @param {Event} e An event object.
 * @private
 */
MenuButton.prototype.onTick_ = function(e) {
  // Call positionMenu() only if the button position or size was
  // changed, or if the window's viewport was changed.
  var currentButtonRect = style.getBounds(this.getElement());
  var currentViewport = style.getVisibleRectForElement(this.getElement());
  if (Rect.equals(this.buttonRect_, currentButtonRect) &&
      Box.equals(this.viewportBox_, currentViewport)) {
    return;
  }

  // Reduction in the viewport width (e.g. due to increasing the zoom) can
  // cause the menu to get squashed against the right edge, distorting its
  // shape. When we move the menu back where it belongs, we risk using the
  // distorted size, causing mispositioning. To be safe, start by moving the
  // menu to the top left to let it reassume its true shape.
  if (this.menu_.isInDocument() && currentViewport && this.viewportBox_ &&
      (currentViewport.getWidth() < this.viewportBox_.getWidth())) {
    var elem = this.menu_.getElement();
    if (!this.menu_.isVisible()) {
      elem.style.visibility = 'hidden';
      style.setElementShown(elem, true);
    }

    style.setPosition(elem, new Coordinate(0, 0));
  }

  this.buttonRect_ = currentButtonRect;
  this.viewportBox_ = currentViewport;
  this.positionMenu();
};


/**
 * Attaches or detaches menu event listeners to/from the given menu.
 * Called each time a menu is attached to or detached from the button.
 * @param {Menu} menu Menu on which to listen for events.
 * @param {boolean} attach Whether to attach or detach event listeners.
 * @private
 */
MenuButton.prototype.attachMenuEventListeners_ = function(
    menu, attach) {
  var handler = this.getHandler();
  var method = attach ? handler.listen : handler.unlisten;

  // Handle events dispatched by menu items.
  method.call(
      handler, menu, Component.ComponentEventType.ACTION, this.handleMenuAction);
  method.call(
      handler, menu, Component.ComponentEventType.CLOSE, this.handleCloseItem);
  method.call(
      handler, menu, Component.ComponentEventType.HIGHLIGHT,
      this.handleHighlightItem);
  method.call(
      handler, menu, Component.ComponentEventType.UNHIGHLIGHT,
      this.handleUnHighlightItem);
};


/**
 * Attaches or detaches a keydown event listener to/from the given element.
 * Called each time the button enters or exits the document.
 * @param {boolean} attach Whether to attach or detach the event listener.
 * @private
 */
MenuButton.prototype.attachKeyDownEventListener_ = function(attach) {
  var handler = this.getHandler();
  var method = attach ? handler.listen : handler.unlisten;

  // Handle keydown events dispatched by the button.
  method.call(
      handler, this.getElement(), EventType.KEYDOWN,
      this.handleKeyDownEvent_);
};


/**
 * Handles `HIGHLIGHT` events dispatched by the attached menu.
 * @param {Event} e Highlight event to handle.
 */
MenuButton.prototype.handleHighlightItem = function(e) {
  /** @suppress {strictMissingProperties} Added to tighten compiler checks */
  var targetEl = e.target.getElement();
  if (targetEl) {
    this.setAriaActiveDescendant_(targetEl);
  }
};


/**
 * Handles `KEYDOWN` events dispatched by the button element. When the
 * button is focusable and the menu is present and visible, prevents the event
 * from propagating since the desired behavior is only to close the menu.
 * @param {Event} e KeyDown event to handle.
 * @private
 */
MenuButton.prototype.handleKeyDownEvent_ = function(e) {
  if (this.isSupportedState(Component.State.FOCUSED) &&
      this.getKeyEventTarget() && this.menu_ && this.menu_.isVisible()) {
    e.stopPropagation();
  }
};


/**
 * Handles UNHIGHLIGHT events dispatched by the associated menu.
 * @param {Event} e Unhighlight event to handle.
 */
MenuButton.prototype.handleUnHighlightItem = function(e) {
  if (!this.menu_.getHighlighted()) {
    var element = this.getElement();
    asserts.assert(element, 'The menu button DOM element cannot be null.');
    aria.setState(element, State.ACTIVEDESCENDANT, '');
    aria.setState(element, State.OWNS, '');
  }
};


/**
 * Handles `CLOSE` events dispatched by the associated menu.
 * @param {Event} e Close event to handle.
 */
MenuButton.prototype.handleCloseItem = function(e) {
  // When a submenu is closed by pressing left arrow, no highlight event is
  // dispatched because the newly focused item was already highlighted, so this
  // scenario is handled by listening for the submenu close event instead.
  if (this.isOpen() && e.target instanceof MenuItem) {
    var menuItem = /** @type {!MenuItem} */ (e.target);
    var menuItemEl = menuItem.getElement();
    if (menuItem.isVisible() && menuItem.isHighlighted() &&
        menuItemEl != null) {
      this.setAriaActiveDescendant_(menuItemEl);
    }
  }
};


/**
 * Updates the aria-activedescendant attribute to the given target element.
 * @param {!Element} targetEl The target element.
 * @private
 */
MenuButton.prototype.setAriaActiveDescendant_ = function(targetEl) {
  var element = this.getElement();
  asserts.assert(element, 'The menu button DOM element cannot be null.');

  // If target element has an activedescendant, then set this control's
  // activedescendant to that, otherwise set it to the target element. This is
  // a workaround for some screen readers which do not handle
  // aria-activedescendant redirection properly.
  var targetActiveDescendant = aria.getActiveDescendant(targetEl);
  var activeDescendant = targetActiveDescendant || targetEl;

  if (!activeDescendant.id) {
    // Create an id if there isn't one already.
    var idGenerator = IdGenerator.getInstance();
    activeDescendant.id = idGenerator.getNextUniqueId();
  }

  aria.setActiveDescendant(element, activeDescendant);
  aria.setState(
      element, State.OWNS, activeDescendant.id);
};


/**
 * Attaches or detaches event listeners depending on whether the popup menu
 * is being shown or hidden.  Starts listening for document mousedown events
 * and for menu blur events when the menu is shown, and stops listening for
 * these events when it is hidden.  Called from {@link #setOpen}.
 * @param {boolean} attach Whether to attach or detach event listeners.
 * @private
 */
MenuButton.prototype.attachPopupListeners_ = function(attach) {
  var handler = this.getHandler();
  var method = attach ? handler.listen : handler.unlisten;

  // Listen for document mousedown events in the capture phase, because
  // the target may stop propagation of the event in the bubble phase.
  method.call(
      handler, this.getDomHelper().getDocument(),
      EventType.MOUSEDOWN, this.handleDocumentMouseDown, true);

  // Only listen for blur events dispatched by the menu if it is focusable.
  if (this.isFocusablePopupMenu()) {
    method.call(
        handler, /** @type {!EventTarget} */ (this.menu_),
        Component.ComponentEventType.BLUR, this.handleMenuBlur);
  }

  method.call(handler, this.timer_, Timer.TICK, this.onTick_);
  if (attach) {
    this.timer_.start();
  } else {
    this.timer_.stop();
  }
};


/* Register a decorator factory function for MenuButtons.*/
registry.setDecoratorByClassName(
    MenuButtonRenderer.CSS_CLASS, function() {
  // MenuButton defaults to using MenuButtonRenderer.
  return new MenuButton(null);
});
