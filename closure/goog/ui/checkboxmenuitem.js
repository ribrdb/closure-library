/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A menu item class that supports checkbox semantics.
 */

import { MenuItem } from './menuitem.js';

import * as registry from './registry.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { ControlContent } = goog.requireType('goog.ui.controlcontent');



/**
 * Class representing a checkbox menu item.  This is just a convenience class
 * that extends {@link MenuItem} by making it checkable.
 *
 * @param {ControlContent} content Text caption or DOM structure to
 *     display as the content of the item (use to add icons or styling to
 *     menus).
 * @param {*=} opt_model Data/model associated with the menu item.
 * @param {DomHelper=} opt_domHelper Optional DOM helper used for
 *     document interactions.
 * @constructor
 * @extends {MenuItem}
 */
export function CheckBoxMenuItem(content, opt_model, opt_domHelper) {
 MenuItem.call(this, content, opt_model, opt_domHelper);
 this.setCheckable(true);
}
goog.inherits(CheckBoxMenuItem, MenuItem);


/* Register a decorator factory function for CheckBoxMenuItems.*/
registry.setDecoratorByClassName(
    goog.getCssName('goog-checkbox-menuitem'), function() {
 // CheckBoxMenuItem defaults to using MenuItemRenderer.
 return new CheckBoxMenuItem(null);
});
