/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A menu item class that supports selection state.
 */

import { Component } from './component.js';

import { MenuItem } from './menuitem.js';
import * as registry from './registry.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { Event } = goog.requireType('goog.events.event');
const { ControlContent } = goog.requireType('goog.ui.controlcontent');



/**
 * Class representing a menu option.  This is just a convenience class that
 * extends {@link MenuItem} by making it selectable.
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
export function Option(content, opt_model, opt_domHelper) {
 MenuItem.call(this, content, opt_model, opt_domHelper);
 this.setSelectable(true);
}
goog.inherits(Option, MenuItem);


/**
 * Performs the appropriate action when the option is activated by the user.
 * Overrides the superclass implementation by not changing the selection state
 * of the option and not dispatching any SELECTED events, for backwards
 * compatibility with existing uses of this class.
 * @param {Event} e Mouse or key event that triggered the action.
 * @return {boolean} True if the action was allowed to proceed, false otherwise.
 * @override
 */
Option.prototype.performActionInternal = function(e) {
 return this.dispatchEvent(Component.ComponentEventType.ACTION);
};


/* Register a decorator factory function for Options.*/
registry.setDecoratorByClassName(
    goog.getCssName('goog-option'), function() {
 // Option defaults to using MenuItemRenderer.
 return new Option(null);
});
