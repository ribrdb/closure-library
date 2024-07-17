/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A customized MenuButton for selection of items among lists.
 * Menu contains 'select all' and 'select none' MenuItems for selecting all and
 * no items by default. Other MenuItems can be added by user.
 *
 * The checkbox content fires the action events associated with the 'select all'
 * and 'select none' menu items.
 *
 * @see ../demos/selectionmenubutton.html
 */

import { InputType } from '../dom/inputtype.js';

import { TagName } from '../dom/tagname.js';
import { EventType } from '../events/eventtype.js';
import * as style from '../style/style.js';
import { Component } from './component.js';
import { MenuButton } from './menubutton.js';
import { MenuItem } from './menuitem.js';
import * as registry from './registry.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { BrowserEvent } = goog.requireType('goog.events.browserevent');
const { Event } = goog.requireType('goog.events.event');
const { ButtonRenderer } = goog.requireType('goog.ui.buttonrenderer');
const { MenuItemRenderer } = goog.requireType('goog.ui.menuitemrenderer');



/**
 * A selection menu button control.  Extends {@link MenuButton}.
 * Menu contains 'select all' and 'select none' MenuItems for selecting all and
 * no items by default. Other MenuItems can be added by user.
 *
 * The checkbox content fires the action events associated with the 'select all'
 * and 'select none' menu items.
 *
 * @param {ButtonRenderer=} opt_renderer Renderer used to render or
 *     decorate the menu button; defaults to {@link MenuButtonRenderer}.
 * @param {MenuItemRenderer=} opt_itemRenderer Optional menu item
 *     renderer.
 * @param {DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {MenuButton}
 */
export function SelectionMenuButton(opt_renderer, opt_itemRenderer, opt_domHelper) {
  MenuButton.call(this, null, null, opt_renderer, opt_domHelper);
  this.initialItemRenderer_ = opt_itemRenderer || null;
}
goog.inherits(SelectionMenuButton, MenuButton);


/**
 * Constants for menu action types.
 * @enum {number}
 */
SelectionMenuButton.SelectionState = {
  ALL: 0,
  SOME: 1,
  NONE: 2
};


/**
 * Select button state
 * @type {SelectionMenuButton.SelectionState}
 * @protected
 */
SelectionMenuButton.prototype.selectionState =
    SelectionMenuButton.SelectionState.NONE;


/**
 * Item renderer used for the first 2 items, 'select all' and 'select none'.
 * @type {MenuItemRenderer}
 * @private
 */
SelectionMenuButton.prototype.initialItemRenderer_;


/**
 * Enables button and embedded checkbox.
 * @param {boolean} enable Whether to enable or disable the button.
 * @override
 */
SelectionMenuButton.prototype.setEnabled = function(enable) {
  SelectionMenuButton.base(this, 'setEnabled', enable);
  this.setCheckboxEnabled(enable);
};


/**
 * Enables the embedded checkbox.
 * @param {boolean} enable Whether to enable or disable the checkbox.
 * @protected
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
SelectionMenuButton.prototype.setCheckboxEnabled = function(enable) {
  this.getCheckboxElement().disabled = !enable;
};


/** @override */
SelectionMenuButton.prototype.handleMouseDown = function(e) {
  if (!this.getDomHelper().contains(
          this.getCheckboxElement(),
          /** @type {Element} */ (e.target))) {
    SelectionMenuButton.superClass_.handleMouseDown.call(this, e);
  }
};


/**
 * Gets the checkbox element. Needed because if decorating html, getContent()
 * may include and comment/text elements in addition to the input element.
 * @return {Element} Checkbox.
 * @protected
 */
SelectionMenuButton.prototype.getCheckboxElement = function() {
  var elements = this.getDomHelper().getElementsByTagNameAndClass(
      TagName.INPUT,
      goog.getCssName('goog-selectionmenubutton-checkbox'),
      this.getContentElement());
  return elements[0];
};


/**
 * Checkbox click handler.
 * @param {BrowserEvent} e Checkbox click event.
 * @protected
 */
SelectionMenuButton.prototype.handleCheckboxClick = function(e) {
  if (this.selectionState == SelectionMenuButton.SelectionState.NONE) {
    this.setSelectionState(SelectionMenuButton.SelectionState.ALL);
    if (this.getItemAt(0)) {
      this.getItemAt(0).dispatchEvent(  // 'All' item
          Component.ComponentEventType.ACTION);
    }
  } else {
    this.setSelectionState(SelectionMenuButton.SelectionState.NONE);
    if (this.getItemAt(1)) {
      this.getItemAt(1).dispatchEvent(  // 'None' item
          Component.ComponentEventType.ACTION);
    }
  }
};


/**
 * Menu action handler to update checkbox checked state.
 * @param {Event} e Menu action event.
 * @private
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
SelectionMenuButton.prototype.handleMenuAction_ = function(e) {
  if (e.target.getModel() == SelectionMenuButton.SelectionState.ALL) {
    this.setSelectionState(SelectionMenuButton.SelectionState.ALL);
  } else {
    this.setSelectionState(SelectionMenuButton.SelectionState.NONE);
  }
};


/**
 * Set up events related to the menu items.
 * @private
 */
SelectionMenuButton.prototype.addMenuEvent_ = function() {
  if (this.getItemAt(0) && this.getItemAt(1)) {
    this.getHandler().listen(
        this.getMenu(), Component.ComponentEventType.ACTION,
        this.handleMenuAction_);
    this.getItemAt(0).setModel(SelectionMenuButton.SelectionState.ALL);
    this.getItemAt(1).setModel(SelectionMenuButton.SelectionState.NONE);
  }
};


/**
 * Set up events related to the checkbox.
 * @protected
 */
SelectionMenuButton.prototype.addCheckboxEvent = function() {
  this.getHandler().listen(
      this.getCheckboxElement(), EventType.CLICK,
      this.handleCheckboxClick);
};


/**
 * Adds the checkbox to the button, and adds 2 items to the menu corresponding
 * to 'select all' and 'select none'.
 * @override
 * @protected
 */
SelectionMenuButton.prototype.createDom = function() {
  SelectionMenuButton.superClass_.createDom.call(this);

  this.createCheckbox();

  /** @desc Text for 'All' button, used to select all items in a list. */
  var MSG_SELECTIONMENUITEM_ALL = goog.getMsg('All');
  /** @desc Text for 'None' button, used to unselect all items in a list. */
  var MSG_SELECTIONMENUITEM_NONE = goog.getMsg('None');

  var itemAll = new MenuItem(
      MSG_SELECTIONMENUITEM_ALL, null, this.getDomHelper(),
      this.initialItemRenderer_);
  var itemNone = new MenuItem(
      MSG_SELECTIONMENUITEM_NONE, null, this.getDomHelper(),
      this.initialItemRenderer_);
  this.addItem(itemAll);
  this.addItem(itemNone);

  this.addCheckboxEvent();
  this.addMenuEvent_();
};


/**
 * Creates and adds the checkbox to the button.
 * @protected
 */
SelectionMenuButton.prototype.createCheckbox = function() {
  var checkbox = this.getDomHelper().createElement(TagName.INPUT);
  checkbox.type = InputType.CHECKBOX;
  checkbox.className = goog.getCssName('goog-selectionmenubutton-checkbox');
  this.setContent(checkbox);
};


/** @override */
SelectionMenuButton.prototype.decorateInternal = function(element) {
  SelectionMenuButton.superClass_.decorateInternal.call(this, element);
  this.addCheckboxEvent();
  this.addMenuEvent_();
};


/** @override */
SelectionMenuButton.prototype.setMenu = function(menu) {
  SelectionMenuButton.superClass_.setMenu.call(this, menu);
  this.addMenuEvent_();
};


/**
 * Set selection state and update checkbox.
 * @param {SelectionMenuButton.SelectionState} state Selection state.
 * @suppress {strictMissingProperties} Part of the go/strict_warnings_migration
 */
SelectionMenuButton.prototype.setSelectionState = function(state) {
  if (this.selectionState != state) {
    var checkbox = this.getCheckboxElement();
    if (state == SelectionMenuButton.SelectionState.ALL) {
      checkbox.checked = true;
      style.setOpacity(checkbox, 1);
    } else if (state == SelectionMenuButton.SelectionState.SOME) {
      checkbox.checked = true;
      // TODO(user): Get UX help to style this
      style.setOpacity(checkbox, 0.5);
    } else {  // NONE
      checkbox.checked = false;
      style.setOpacity(checkbox, 1);
    }
    this.selectionState = state;
  }
};


/**
* Get selection state.
* @return {SelectionMenuButton.SelectionState} Selection state.
*/
SelectionMenuButton.prototype.getSelectionState = function() {
  return this.selectionState;
};


/* Register a decorator factory function for SelectionMenuButton.*/
registry.setDecoratorByClassName(
    goog.getCssName('goog-selectionmenubutton-button'), function() {
  return new SelectionMenuButton();
});
