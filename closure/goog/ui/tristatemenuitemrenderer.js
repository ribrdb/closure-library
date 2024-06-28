/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Renderer for {@link TriStateMenuItem}s.
 */

import * as asserts from '../asserts/asserts.js';
import * as classlist from '../dom/classlist.js';
import { MenuItemRenderer } from './menuitemrenderer.js';
import { TriStateMenuItem } from './tristatemenuitem.js';
const {Control} = goog.requireType('goog.ui.control');
const {ControlRenderer} = goog.requireType('goog.ui.controlrenderer');


/**
 * Default renderer for {@link TriStateMenuItemRenderer}s. Each item has
 * the following structure:
 *
 *    <div class="goog-tristatemenuitem">
 *        <div class="goog-tristatemenuitem-checkbox"></div>
 *        <div>...(content)...</div>
 *    </div>
 *
 * @constructor
 * @extends {MenuItemRenderer}
 * @final
 */
export function TriStateMenuItemRenderer() {
 MenuItemRenderer.call(this);
}
goog.inherits(TriStateMenuItemRenderer, MenuItemRenderer);
goog.addSingletonGetter(TriStateMenuItemRenderer);


/**
 * CSS class name the renderer applies to menu item elements.
 * @type {string}
 */
TriStateMenuItemRenderer.CSS_CLASS =
    goog.getCssName('goog-tristatemenuitem');


/**
 * Overrides {@link ControlRenderer#decorate} by initializing the
 * menu item to checkable based on whether the element to be decorated has
 * extra styling indicating that it should be.
 * @param {Control} item TriStateMenuItem to decorate
 *     the element.
 * @param {Element} element Element to decorate.
 * @return {!Element} Decorated element.
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 * @suppress {missingRequire} TODO(user): remove this
 */
TriStateMenuItemRenderer.prototype.decorate = function(item, element) {
 element = TriStateMenuItemRenderer.superClass_.decorate.call(
     this, item, element);
 this.setCheckable(item, element, true);

 asserts.assert(element);

 if (classlist.contains(
         element, goog.getCssName(this.getCssClass(), 'fully-checked'))) {
   item.setCheckedState(/** @suppress {missingRequire} */
       TriStateMenuItem.State.FULLY_CHECKED);
 } else if (
     classlist.contains(
         element, goog.getCssName(this.getCssClass(), 'partially-checked'))) {
   /** @suppress {missingRequire} */
   item.setCheckedState(TriStateMenuItem.State.PARTIALLY_CHECKED);
 } else {
   /** @suppress {missingRequire} */
   item.setCheckedState(TriStateMenuItem.State.NOT_CHECKED);
 }

 return element;
};


/** @override */
TriStateMenuItemRenderer.prototype.getCssClass = function() {
 return TriStateMenuItemRenderer.CSS_CLASS;
};
