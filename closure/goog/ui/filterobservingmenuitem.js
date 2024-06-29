/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Menu item observing the filter text in a
 * {@link goog.ui.FilteredMenu}. The observer method is called when the filter
 * text changes and allows the menu item to update its content and state based
 * on the filter.
 */

import { FilterObservingMenuItemRenderer } from './filterobservingmenuitemrenderer.js';

import { MenuItem } from './menuitem.js';
import * as registry from './registry.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { ControlContent } = goog.requireType('goog.ui.controlcontent');
const { MenuItemRenderer } = goog.requireType('goog.ui.menuitemrenderer');



/**
 * Class representing a filter observing menu item.
 *
 * @param {ControlContent} content Text caption or DOM structure to
 *     display as the content of the item (use to add icons or styling to
 *     menus).
 * @param {*=} opt_model Data/model associated with the menu item.
 * @param {DomHelper=} opt_domHelper Optional DOM helper used for
 *     document interactions.
 * @param {MenuItemRenderer=} opt_renderer Optional renderer.
 * @constructor
 * @extends {MenuItem}
 */
export function FilterObservingMenuItem(content, opt_model, opt_domHelper, opt_renderer) {
 MenuItem.call(
     this, content, opt_model, opt_domHelper,
     opt_renderer || new FilterObservingMenuItemRenderer());
}
goog.inherits(FilterObservingMenuItem, MenuItem);


/**
 * Function called when the filter text changes.
 * @type {?Function} function(FilterObservingMenuItem, string)
 * @private
 */
FilterObservingMenuItem.prototype.observer_ = null;


/** @override */
FilterObservingMenuItem.prototype.enterDocument = function() {
 FilterObservingMenuItem.superClass_.enterDocument.call(this);
 this.callObserver();
};


/**
 * Sets the observer functions.
 * @param {Function} f function(FilterObservingMenuItem, string).
 */
FilterObservingMenuItem.prototype.setObserver = function(f) {
 this.observer_ = f;
 this.callObserver();
};


/**
 * Calls the observer function if one has been specified.
 * @param {?string=} opt_str Filter string.
 */
FilterObservingMenuItem.prototype.callObserver = function(opt_str) {
 if (this.observer_) {
   this.observer_(this, opt_str || '');
 }
};


// Register a decorator factory function for
/* FilterObservingMenuItemRenderer.*/
registry.setDecoratorByClassName(
    FilterObservingMenuItemRenderer.CSS_CLASS, function() {
 // FilterObservingMenuItem defaults to using
 // FilterObservingMenuItemRenderer.
 return new FilterObservingMenuItem(null);
});
