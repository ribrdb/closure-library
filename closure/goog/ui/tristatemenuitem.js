/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A menu item class that supports three state checkbox semantics.
 */

goog.declareModuleId('goog.ui.tristatemenuitem');

import * as classlist from '../dom/classlist.js';
import { Component } from './component.js';
import { MenuItem } from './menuitem.js';
import { TriStateMenuItemRenderer } from './tristatemenuitemrenderer.js';
import * as registry from './registry.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { ControlContent } =goog.requireType('goog.ui.controlcontent');
const { MenuItemRenderer } = goog.requireType('goog.ui.menuitemrenderer');



/**
 * Class representing a three state checkbox menu item.
 *
 * @param {ControlContent} content Text caption or DOM structure
 *     to display as the content of the item (use to add icons or styling to
 *     menus).
 * @param {Object=} opt_model Data/model associated with the menu item.
 * @param {DomHelper=} opt_domHelper Optional DOM helper used for
 *     document interactions.
 * @param {MenuItemRenderer=} opt_renderer Optional renderer.
 * @param {boolean=} opt_alwaysAllowPartial  If true, always allow partial
 *     state.
 * @constructor
 * @extends {MenuItem}
 * TODO(attila): Figure out how to better integrate this into the
 * goog.ui.Control state management framework.
 * @final
 */
export function TriStateMenuItem(content, opt_model, opt_domHelper, opt_renderer, opt_alwaysAllowPartial) {
 MenuItem.call(
     this, content, opt_model, opt_domHelper,
     opt_renderer || new TriStateMenuItemRenderer());
 this.setCheckable(true);
 this.alwaysAllowPartial_ = opt_alwaysAllowPartial || false;
}
goog.inherits(TriStateMenuItem, MenuItem);


/**
 * Checked states for component.
 * @enum {number}
 */
TriStateMenuItem.State = {
  /**
   * Component is not checked.
   */
  NOT_CHECKED: 0,

  /**
   * Component is partially checked.
   */
  PARTIALLY_CHECKED: 1,

  /**
   * Component is fully checked.
   */
  FULLY_CHECKED: 2
};


/**
 * Menu item's checked state.
 * @type {TriStateMenuItem.State}
 * @private
 */
TriStateMenuItem.prototype.checkState_ =
    TriStateMenuItem.State.NOT_CHECKED;


/**
 * Whether the partial state can be toggled.
 * @type {boolean}
 * @private
 */
TriStateMenuItem.prototype.allowPartial_ = false;


/**
 * Used to override allowPartial_ to force the third state to always be
 * permitted.
 * @type {boolean}
 * @private
 */
TriStateMenuItem.prototype.alwaysAllowPartial_ = false;


/**
 * @return {TriStateMenuItem.State} The menu item's check state.
 */
TriStateMenuItem.prototype.getCheckedState = function() {
 return this.checkState_;
};


/**
 * Sets the checked state.
 * @param {TriStateMenuItem.State} state The checked state.
 */
TriStateMenuItem.prototype.setCheckedState = function(state) {
 this.setCheckedState_(state);
 this.allowPartial_ =
     state == TriStateMenuItem.State.PARTIALLY_CHECKED;
};


/**
 * Sets the checked state and updates the CSS styling. Dispatches a
 * `CHECK` or `UNCHECK` event prior to changing the component's
 * state, which may be caught and canceled to prevent the component from
 * changing state.
 * @param {TriStateMenuItem.State} state The checked state.
 * @private
 */
TriStateMenuItem.prototype.setCheckedState_ = function(state) {
 if (this.dispatchEvent(
         state != TriStateMenuItem.State.NOT_CHECKED ?
             Component.ComponentEventType.CHECK :
             Component.ComponentEventType.UNCHECK)) {
   this.setState(
       Component.State.CHECKED,
       state != TriStateMenuItem.State.NOT_CHECKED);
   this.checkState_ = state;
   this.updatedCheckedStateClassNames_();
 }
};


/** @override */
TriStateMenuItem.prototype.performActionInternal = function(e) {
 switch (this.getCheckedState()) {
   case TriStateMenuItem.State.NOT_CHECKED:
     this.setCheckedState_(
         this.alwaysAllowPartial_ || this.allowPartial_ ?
             TriStateMenuItem.State.PARTIALLY_CHECKED :
             TriStateMenuItem.State.FULLY_CHECKED);
     break;
   case TriStateMenuItem.State.PARTIALLY_CHECKED:
     this.setCheckedState_(TriStateMenuItem.State.FULLY_CHECKED);
     break;
   case TriStateMenuItem.State.FULLY_CHECKED:
     this.setCheckedState_(TriStateMenuItem.State.NOT_CHECKED);
     break;
 }

 var checkboxClass =
     goog.getCssName(this.getRenderer().getCssClass(), 'checkbox');
 var clickOnCheckbox = e.target &&
     classlist.contains(
         /** @type {!Element} */ (e.target), checkboxClass);

 return this.dispatchEvent(
     clickOnCheckbox || this.allowPartial_ ?
         Component.ComponentEventType.CHANGE :
         Component.ComponentEventType.ACTION);
};


/**
 * Updates the extra class names applied to the menu item element.
 * @private
 */
TriStateMenuItem.prototype.updatedCheckedStateClassNames_ = function() {
 var renderer = this.getRenderer();
 renderer.enableExtraClassName(
     this, goog.getCssName(renderer.getCssClass(), 'partially-checked'),
     this.getCheckedState() ==
         TriStateMenuItem.State.PARTIALLY_CHECKED);
 renderer.enableExtraClassName(
     this, goog.getCssName(renderer.getCssClass(), 'fully-checked'),
     this.getCheckedState() == TriStateMenuItem.State.FULLY_CHECKED);
};


/* Register a decorator factory function for TriStateMenuItemRenderer.*/
registry.setDecoratorByClassName(
    TriStateMenuItemRenderer.CSS_CLASS, function() {
 // TriStateMenuItem defaults to using TriStateMenuItemRenderer.
 return new TriStateMenuItem(null);
});
