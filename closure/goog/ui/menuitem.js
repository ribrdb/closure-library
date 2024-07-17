/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A class for representing items in menus.
 * @see Menu
 * @see ../demos/menuitem.html
 */

goog.declareModuleId('goog.ui.menuitem');

import { Role } from '../a11y/aria/roles.js';
import * as array from '../array/array.js';
import * as googDom from '../dom/dom.js';
import * as classlist from '../dom/classlist.js';
import { Coordinate } from '../math/coordinate.js';
import * as googString from '../string/string.js';
import { Component } from './component.js';
import { Control } from './control.js';
import { MenuItemRenderer } from './menuitemrenderer.js';
import * as registry from './registry.js';
const {KeyCodes} = goog.requireType('goog.events.keycodes');
const {ControlContent} = goog.requireType('goog.ui.controlcontent');  // circular
const {Menu} = goog.requireType('goog.ui.menu');



/**
 * Class representing an item in a menu.
 *
 * @param {ControlContent} content Text caption or DOM structure to
 *     display as the content of the item (use to add icons or styling to
 *     menus).
 * @param {*=} opt_model Data/model associated with the menu item.
 * @param {googDom.DomHelper=} opt_domHelper Optional DOM helper used for
 *     document interactions.
 * @param {MenuItemRenderer=} opt_renderer Optional renderer.
 * @constructor
 * @extends {Control}
 */
export function MenuItem(content, opt_model, opt_domHelper, opt_renderer) {
  Control.call(
      this, content, opt_renderer || MenuItemRenderer.getInstance(),
      opt_domHelper);
  this.setValue(opt_model);
}
goog.inherits(MenuItem, Control);


/**
 * The access key for this menu item. This key allows the user to quickly
 * trigger this item's action with they keyboard. For example, setting the
 * mnenomic key to 70 (F), when the user opens the menu and hits "F," the
 * menu item is triggered.
 *
 * @type {KeyCodes}
 * @private
 */
MenuItem.prototype.mnemonicKey_;


/**
 * The class set on an element that contains a parenthetical mnemonic key hint.
 * Parenthetical hints are added to items in which the mnemonic key is not found
 * within the menu item's caption itself. For example, if you have a menu item
 * with the caption "Record," but its mnemonic key is "I", the caption displayed
 * in the menu will appear as "Record (I)".
 *
 * @type {string}
 * @private
 */
MenuItem.MNEMONIC_WRAPPER_CLASS_ =
    goog.getCssName('goog-menuitem-mnemonic-separator');


/**
 * The class set on an element that contains a keyboard accelerator hint.
 * @type {string}
 */
MenuItem.ACCELERATOR_CLASS = goog.getCssName('goog-menuitem-accel');


// goog.ui.Component and goog.ui.Control implementation.


/**
 * Returns the value associated with the menu item.  The default implementation
 * returns the model object associated with the item (if any), or its caption.
 * @return {*} Value associated with the menu item, if any, or its caption.
 */
MenuItem.prototype.getValue = function() {
  var model = this.getModel();
  return model != null ? model : this.getCaption();
};


/**
 * Sets the value associated with the menu item.  The default implementation
 * stores the value as the model of the menu item.
 * @param {*} value Value to be associated with the menu item.
 */
MenuItem.prototype.setValue = function(value) {
  this.setModel(value);
};


/** @override */
MenuItem.prototype.setSupportedState = function(state, support) {
  MenuItem.base(this, 'setSupportedState', state, support);
  switch (state) {
    case Component.State.SELECTED:
      this.setSelectableInternal_(support);
      break;
    case Component.State.CHECKED:
      this.setCheckableInternal_(support);
      break;
  }
};


/**
 * Sets the menu item to be selectable or not.  Set to true for menu items
 * that represent selectable options.
 * @param {boolean} selectable Whether the menu item is selectable.
 */
MenuItem.prototype.setSelectable = function(selectable) {
  this.setSupportedState(Component.State.SELECTED, selectable);
};


/**
 * Sets the menu item to be selectable or not.
 * @param {boolean} selectable  Whether the menu item is selectable.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
MenuItem.prototype.setSelectableInternal_ = function(selectable) {
  if (this.isChecked() && !selectable) {
    this.setChecked(false);
  }

  var element = this.getElement();
  if (element) {
    this.getRenderer().setSelectable(this, element, selectable);
  }
};


/**
 * Sets the menu item to be checkable or not.  Set to true for menu items
 * that represent checkable options.
 * @param {boolean} checkable Whether the menu item is checkable.
 */
MenuItem.prototype.setCheckable = function(checkable) {
  this.setSupportedState(Component.State.CHECKED, checkable);
};


/**
 * Sets the menu item to be checkable or not.
 * @param {boolean} checkable Whether the menu item is checkable.
 * @private
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
MenuItem.prototype.setCheckableInternal_ = function(checkable) {
  var element = this.getElement();
  if (element) {
    this.getRenderer().setCheckable(this, element, checkable);
  }
};


/**
 * Returns the text caption of the component while ignoring accelerators.
 * @override
 */
MenuItem.prototype.getCaption = function() {
  var content = this.getContent();
  if (Array.isArray(content)) {
    var acceleratorClass = MenuItem.ACCELERATOR_CLASS;
    var mnemonicWrapClass = MenuItem.MNEMONIC_WRAPPER_CLASS_;
    var caption =
        array
            .map(
                content,
                function(node) {
                  if (googDom.isElement(node) &&
                      (classlist.contains(
                           /** @type {!Element} */ (node), acceleratorClass) ||
                       classlist.contains(
                           /** @type {!Element} */ (node),
                           mnemonicWrapClass))) {
                    return '';
                  } else {
                    return googDom.getRawTextContent(node);
                  }
                })
            .join('');
    return googString.collapseBreakingSpaces(caption);
  }
  return MenuItem.superClass_.getCaption.call(this);
};


/**
 * @return {?string} The keyboard accelerator text, or null if the menu item
 *     doesn't have one.
 */
MenuItem.prototype.getAccelerator = function() {
  var dom = this.getDomHelper();
  var content = this.getContent();
  if (Array.isArray(content)) {
    var acceleratorEl = array.find(content, function(e) {
      return classlist.contains(
          /** @type {!Element} */ (e), MenuItem.ACCELERATOR_CLASS);
    });
    if (acceleratorEl) {
      return dom.getTextContent(acceleratorEl);
    }
  }
  return null;
};


/** @override */
MenuItem.prototype.handleMouseUp = function(e) {
  var parentMenu = /** @type {Menu} */ (this.getParent());

  if (parentMenu) {
    var oldCoords = parentMenu.openingCoords;
    // Clear out the saved opening coords immediately so they're not used twice.
    parentMenu.openingCoords = null;

    if (oldCoords && typeof e.clientX === 'number') {
      /**
       * @suppress {strictMissingProperties} Added to tighten compiler checks
       */
      var newCoords = new Coordinate(e.clientX, e.clientY);
      if (Coordinate.equals(oldCoords, newCoords)) {
        // This menu was opened by a mousedown and we're handling the consequent
        // mouseup. The coords haven't changed, meaning this was a simple click,
        // not a click and drag. Don't do the usual behavior because the menu
        // just popped up under the mouse and the user didn't mean to activate
        // this item.
        return;
      }
    }
  }

  MenuItem.base(this, 'handleMouseUp', e);
};


/** @override */
MenuItem.prototype.handleKeyEventInternal = function(e) {
  if (e.keyCode == this.getMnemonic() && this.performActionInternal(e)) {
    return true;
  } else {
    return MenuItem.base(this, 'handleKeyEventInternal', e);
  }
};


/**
 * Sets the mnemonic key code. The mnemonic is the key associated with this
 * action.
 * @param {KeyCodes} key The key code.
 */
MenuItem.prototype.setMnemonic = function(key) {
  this.mnemonicKey_ = key;
};


/**
 * Gets the mnemonic key code. The mnemonic is the key associated with this
 * action.
 * @return {KeyCodes} The key code of the mnemonic key.
 */
MenuItem.prototype.getMnemonic = function() {
  return this.mnemonicKey_;
};


/* Register a decorator factory function for MenuItems.*/
registry.setDecoratorByClassName(
    MenuItemRenderer.CSS_CLASS, function() {
  // MenuItem defaults to using MenuItemRenderer.
  return new MenuItem(null);
});


/**
 * @override
 */
MenuItem.prototype.getPreferredAriaRole = function() {
  if (this.isSupportedState(Component.State.CHECKED)) {
    return Role.MENU_ITEM_CHECKBOX;
  }
  if (this.isSupportedState(Component.State.SELECTED)) {
    return Role.MENU_ITEM_RADIO;
  }
  return MenuItem.base(this, 'getPreferredAriaRole');
};


/**
 * @override
 * @return {Menu}
 */
MenuItem.prototype.getParent = function() {
  return /** @type {Menu} */ (Control.prototype.getParent.call(this));
};


/**
 * @override
 * @return {Menu}
 */
MenuItem.prototype.getParentEventTarget = function() {
  return /** @type {Menu} */ (Control.prototype.getParentEventTarget.call(this));
};
