/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A class that supports single selection from a dropdown menu,
 * with semantics similar to the native HTML <code>&lt;select&gt;</code>
 * element.
 *
 * @see ../demos/select.html
 */

goog.declareModuleId('goog.ui.select');

import * as aria from '../a11y/aria/aria.js';
import { Role } from '../a11y/aria/roles.js';
import { State } from '../a11y/aria/attributes.js';
import { EventType } from '../events/eventtype.js';
import { Component } from './component.js';
import { IdGenerator } from './idgenerator.js';
import { MenuButton } from './menubutton.js';
import { MenuItem } from './menuitem.js';
import { MenuRenderer } from './menurenderer.js';
import { SelectionModel } from './selectionmodel.js';
import * as registry from './registry.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const {Event} = goog.requireType('goog.events.event');
const {ButtonRenderer} = goog.requireType('goog.ui.buttonrenderer');
const {Control} = goog.requireType('goog.ui.control');
const {ControlContent} = goog.requireType('goog.ui.controlcontent');
const {Menu} = goog.requireType('goog.ui.menu');
const {MenuSeparator} = goog.requireType('goog.ui.menuseparator');



/**
 * A selection control.  Extends {@link MenuButton} by composing a
 * menu with a selection model, and automatically updating the button's caption
 * based on the current selection.
 *
 * Select fires the following events:
 *   CHANGE - after selection changes.
 *
 * @param {ControlContent=} opt_caption Default caption or existing DOM
 *     structure to display as the button's caption when nothing is selected.
 *     Defaults to no caption.
 * @param {Menu=} opt_menu Menu containing selection options.
 * @param {ButtonRenderer=} opt_renderer Renderer used to render or
 *     decorate the control; defaults to {@link MenuButtonRenderer}.
 * @param {DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @param {!MenuRenderer=} opt_menuRenderer Renderer used to render or
 *     decorate the menu; defaults to {@link MenuRenderer}.
 * @constructor
 * @extends {MenuButton}
 */
export function Select(opt_caption, opt_menu, opt_renderer, opt_domHelper, opt_menuRenderer) {
  Select.base(
      this, 'constructor', opt_caption, opt_menu, opt_renderer, opt_domHelper,
      opt_menuRenderer ||
          new MenuRenderer(Role.LISTBOX));
  /**
   * Default caption to show when no option is selected.
   * @private {ControlContent}
   */
  this.defaultCaption_ = this.getContent();

  /**
   * The initial value of the aria label of the content element. This will be
   * null until the caption is first populated and will be non-null thereafter.
   * @private {?string}
   */
  this.initialAriaLabel_ = null;

  this.setPreferredAriaRole(Role.LISTBOX);
}
goog.inherits(Select, MenuButton);


/**
 * The selection model controlling the items in the menu.
 * @type {?SelectionModel}
 * @private
 */
Select.prototype.selectionModel_ = null;


/** @override */
Select.prototype.enterDocument = function() {
  Select.superClass_.enterDocument.call(this);
  this.updateCaption();
  this.listenToSelectionModelEvents_();
};


/**
 * Decorates the given element with this control.  Overrides the superclass
 * implementation by initializing the default caption on the select button.
 * @param {Element} element Element to decorate.
 * @override
 */
Select.prototype.decorateInternal = function(element) {
  Select.superClass_.decorateInternal.call(this, element);
  var caption = this.getCaption();
  if (caption) {
    // Initialize the default caption.
    this.setDefaultCaption(caption);
  } else if (!this.getSelectedItem()) {
    // If there is no default caption and no selected item, select the first
    // option (this is technically an arbitrary choice, but what most people
    // would expect to happen).
    this.setSelectedIndex(0);
  }
};


/** @override */
Select.prototype.disposeInternal = function() {
  Select.superClass_.disposeInternal.call(this);

  if (this.selectionModel_) {
    this.selectionModel_.dispose();
    this.selectionModel_ = null;
  }

  this.defaultCaption_ = null;
};


/**
 * Handles {@link Component.ComponentEventType.ACTION} events dispatched by
 * the menu item clicked by the user.  Updates the selection model, calls
 * the superclass implementation to hide the menu, stops the propagation of
 * the event, and dispatches an ACTION event on behalf of the select control
 * itself.  Overrides {@link MenuButton#handleMenuAction}.
 * @param {Event} e Action event to handle.
 * @override
 */
Select.prototype.handleMenuAction = function(e) {
  this.setSelectedItem(/** @type {MenuItem} */ (e.target));
  Select.base(this, 'handleMenuAction', e);

  // NOTE(chrishenry): We should not stop propagation and then fire
  // our own ACTION event. Fixing this without breaking anyone
  // relying on this event is hard though.
  e.stopPropagation();
  this.dispatchEvent(Component.ComponentEventType.ACTION);
};


/**
 * Handles {@link EventType.SELECT} events raised by the
 * selection model when the selection changes.  Updates the contents of the
 * select button.
 * @param {Event} e Selection event to handle.
 */
Select.prototype.handleSelectionChange = function(e) {
  var item = this.getSelectedItem();
  Select.superClass_.setValue.call(this, item && item.getValue());
  this.updateCaption();
};


/**
 * Replaces the menu currently attached to the control (if any) with the given
 * argument, and updates the selection model.  Does nothing if the new menu is
 * the same as the old one.  Overrides {@link MenuButton#setMenu}.
 * @param {Menu} menu New menu to be attached to the menu button.
 * @return {Menu|undefined} Previous menu (undefined if none).
 * @override
 */
Select.prototype.setMenu = function(menu) {
  // Call superclass implementation to replace the menu.
  var oldMenu = Select.superClass_.setMenu.call(this, menu);

  // Do nothing unless the new menu is different from the current one.
  if (menu != oldMenu) {
    // Clear the old selection model (if any).
    if (this.selectionModel_) {
      this.selectionModel_.clear();
    }

    // Initialize new selection model (unless the new menu is null).
    if (menu) {
      if (this.selectionModel_) {
        menu.forEachChild(function(child, index) {
          this.setCorrectAriaRole_(
              /** @type {MenuItem|MenuSeparator} */ (child));
          this.selectionModel_.addItem(child);
        }, this);
      } else {
        this.createSelectionModel_(menu);
      }
    }
  }

  return oldMenu;
};


/**
 * Returns the default caption to be shown when no option is selected.
 * @return {ControlContent} Default caption.
 */
Select.prototype.getDefaultCaption = function() {
  return this.defaultCaption_;
};


/**
 * Sets the default caption to the given string or DOM structure.
 * @param {ControlContent} caption Default caption to be shown
 *    when no option is selected.
 */
Select.prototype.setDefaultCaption = function(caption) {
  this.defaultCaption_ = caption;
  this.updateCaption();
};


/**
 * Adds a new menu item at the end of the menu.
 * @param {Control} item Menu item to add to the menu.
 * @override
 */
Select.prototype.addItem = function(item) {
  this.setCorrectAriaRole_(
      /** @type {MenuItem|MenuSeparator} */ (item));
  Select.superClass_.addItem.call(this, item);

  if (this.selectionModel_) {
    this.selectionModel_.addItem(item);
  } else {
    this.createSelectionModel_(this.getMenu());
  }
  this.updateAriaActiveDescendant_();
};


/**
 * Adds a new menu item at a specific index in the menu.
 * @param {MenuItem|MenuSeparator} item Menu item to add to the
 *     menu.
 * @param {number} index Index at which to insert the menu item.
 * @override
 */
Select.prototype.addItemAt = function(item, index) {
  this.setCorrectAriaRole_(
      /** @type {MenuItem|MenuSeparator} */ (item));
  Select.superClass_.addItemAt.call(this, item, index);

  if (this.selectionModel_) {
    this.selectionModel_.addItemAt(item, index);
  } else {
    this.createSelectionModel_(this.getMenu());
  }
};


/**
 * Removes an item from the menu and disposes it.
 * @param {MenuItem|MenuSeparator} item The menu item to remove.
 * @override
 */
Select.prototype.removeItem = function(item) {
  Select.superClass_.removeItem.call(this, item);
  if (this.selectionModel_) {
    this.selectionModel_.removeItem(item);
  }
};


/**
 * Removes a menu item at a given index in the menu and disposes it.
 * @param {number} index Index of item.
 * @override
 */
Select.prototype.removeItemAt = function(index) {
  Select.superClass_.removeItemAt.call(this, index);
  if (this.selectionModel_) {
    this.selectionModel_.removeItemAt(index);
  }
};


/**
 * Selects the specified option (assumed to be in the select menu), and
 * deselects the previously selected option, if any.  A null argument clears
 * the selection.
 * @param {MenuItem} item Option to be selected (null to clear
 *     the selection).
 */
Select.prototype.setSelectedItem = function(item) {
  if (this.selectionModel_) {
    var prevItem = this.getSelectedItem();
    this.selectionModel_.setSelectedItem(item);

    if (item != prevItem) {
      this.dispatchEvent(Component.ComponentEventType.CHANGE);
    }
  }
};


/**
 * Selects the option at the specified index, or clears the selection if the
 * index is out of bounds.
 * @param {number} index Index of the option to be selected.
 */
Select.prototype.setSelectedIndex = function(index) {
  if (this.selectionModel_) {
    this.setSelectedItem(/** @type {MenuItem} */
        (this.selectionModel_.getItemAt(index)));
  }
};


/**
 * Selects the first option found with an associated value equal to the
 * argument, or clears the selection if no such option is found.  A null
 * argument also clears the selection.  Overrides {@link
 * goog.ui.Button#setValue}.
 * @param {*} value Value of the option to be selected (null to clear
 *     the selection).
 * @override
 */
Select.prototype.setValue = function(value) {
  if (value != null && this.selectionModel_) {
    for (var i = 0, item; item = this.selectionModel_.getItemAt(i); i++) {
      if (item && typeof item.getValue == 'function' &&
          item.getValue() == value) {
        this.setSelectedItem(/** @type {!MenuItem} */ (item));
        return;
      }
    }
  }

  this.setSelectedItem(null);
};


/**
 * Gets the value associated with the currently selected option (null if none).
 *
 * Note that unlike {@link goog.ui.Button#getValue} which this method overrides,
 * the "value" of a Select instance is the value of its selected menu item, not
 * its own value. This makes a difference because the "value" of a Button is
 * reset to the value of the element it decorates when it's added to the DOM
 * (via ButtonRenderer), whereas the value of the selected item is unaffected.
 * So while setValue() has no effect on a Button before it is added to the DOM,
 * it will make a persistent change to a Select instance (which is consistent
 * with any changes made by {@link Select#setSelectedItem} and
 * {@link Select#setSelectedIndex}).
 *
 * @override
 */
Select.prototype.getValue = function() {
  var selectedItem = this.getSelectedItem();
  return selectedItem ? selectedItem.getValue() : null;
};


/**
 * Returns the currently selected option.
 * @return {MenuItem} The currently selected option (null if none).
 */
Select.prototype.getSelectedItem = function() {
  return this.selectionModel_ ?
      /** @type {MenuItem} */ (this.selectionModel_.getSelectedItem()) :
      null;
};


/**
 * Returns the index of the currently selected option.
 * @return {number} 0-based index of the currently selected option (-1 if none).
 */
Select.prototype.getSelectedIndex = function() {
  return this.selectionModel_ ? this.selectionModel_.getSelectedIndex() : -1;
};


/**
 * @return {SelectionModel} The selection model.
 * @protected
 */
Select.prototype.getSelectionModel = function() {
  return this.selectionModel_;
};


/**
 * Creates a new selection model and sets up an event listener to handle
 * {@link EventType.SELECT} events dispatched by it.
 * @param {Component=} opt_component If provided, will add the
 *     component's children as items to the selection model.
 * @private
 */
Select.prototype.createSelectionModel_ = function(opt_component) {
  this.selectionModel_ = new SelectionModel();
  if (opt_component) {
    opt_component.forEachChild(function(child, index) {
      this.setCorrectAriaRole_(
          /** @type {MenuItem|MenuSeparator} */ (child));
      this.selectionModel_.addItem(child);
    }, this);
  }
  this.listenToSelectionModelEvents_();
};


/**
 * Subscribes to events dispatched by the selection model.
 * @private
 */
Select.prototype.listenToSelectionModelEvents_ = function() {
  if (this.selectionModel_) {
    this.getHandler().listen(
        this.selectionModel_, EventType.SELECT,
        this.handleSelectionChange);
  }
};


/**
 * Updates the caption to be shown in the select button.  If no option is
 * selected and a default caption is set, sets the caption to the default
 * caption; otherwise to the empty string.
 * @protected
 */
Select.prototype.updateCaption = function() {
  var item = this.getSelectedItem();
  this.setContent(item ? item.getCaption() : this.defaultCaption_);

  var contentElement = this.getRenderer().getContentElement(this.getElement());
  // Despite the ControlRenderer interface indicating the return value is
  // {Element}, many renderers cast element.firstChild to {Element} when it is
  // really {Node}. Checking tagName verifies this is an {!Element}.
  if (contentElement && this.getDomHelper().isElement(contentElement)) {
    if (this.initialAriaLabel_ == null) {
      this.initialAriaLabel_ = aria.getLabel(contentElement);
    }
    var itemElement = item ? item.getElement() : null;
    aria.setLabel(
        contentElement, itemElement ? aria.getLabel(itemElement) :
                                      this.initialAriaLabel_);
    this.updateAriaActiveDescendant_();
  }
};


/**
 * Updates the aria active descendant attribute.
 * @private
 */
Select.prototype.updateAriaActiveDescendant_ = function() {
  var renderer = this.getRenderer();
  if (renderer) {
    var contentElement = renderer.getContentElement(this.getElement());
    if (contentElement) {
      var buttonElement = this.getElementStrict();
      if (!contentElement.id) {
        contentElement.id = IdGenerator.getInstance().getNextUniqueId();
      }
      aria.setRole(contentElement, Role.OPTION);
      // Set 'aria-selected' to true since the content element represents the
      // currently selected option.
      aria.setState(
          contentElement, State.SELECTED, true);
      aria.setState(
          buttonElement, State.ACTIVEDESCENDANT,
          contentElement.id);
      if (this.selectionModel_) {
        // We can't use selectionmodel's getItemCount here because we need to
        // skip separators.
        var items = this.selectionModel_.getItems();
        aria.setState(
            contentElement, State.SETSIZE,
            this.getNumMenuItems_(items));
        // Set a human-readable selection index, excluding menu separators.
        var index = this.selectionModel_.getSelectedIndex();
        aria.setState(
            contentElement, State.POSINSET,
            index >= 0 ? this.getNumMenuItems_(items.slice(0, index + 1)) : 0);
      }
    }
  }
};


/**
 * Gets the number of menu items in the array.
 * @param {!Array<?Object>} items The items.
 * @return {number}
 * @private
 */
Select.prototype.getNumMenuItems_ = function(items) {
  return items
      .filter(function(item) {
    return item instanceof MenuItem;
  })
      .length;
};


/**
 * Sets the correct ARIA role for the menu item or separator.
 * @param {MenuItem|MenuSeparator} item The item to set.
 * @private
 */
Select.prototype.setCorrectAriaRole_ = function(item) {
  item.setPreferredAriaRole(
      item instanceof MenuItem ? Role.OPTION :
                                         Role.SEPARATOR);
};


/**
 * Opens or closes the menu.  Overrides {@link MenuButton#setOpen} by
 * highlighting the currently selected option on open.
 * @param {boolean} open Whether to open or close the menu.
 * @param {Event=} opt_e Mousedown event that caused the menu to
 *     be opened.
 * @override
 */
Select.prototype.setOpen = function(open, opt_e) {
  Select.superClass_.setOpen.call(this, open, opt_e);

  if (this.isOpen()) {
    this.getMenu().setHighlightedIndex(this.getSelectedIndex());
  } else {
    this.updateAriaActiveDescendant_();
  }
};


/* Register a decorator factory function for Selects.*/
registry.setDecoratorByClassName(
    goog.getCssName('goog-select'), function() {
  // Select defaults to using MenuButtonRenderer, since it shares its L&F.
  return new Select(null);
});
