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

import { MenuItemRenderer } from './menuitemrenderer.js';



/**
 * Default renderer for {@link goog.ui.FilterObservingMenuItem}s. Each item has
 * the following structure:
 *
 *    <div class="goog-filterobsmenuitem"><div>...(content)...</div></div>
 *
 * @constructor
 * @extends {MenuItemRenderer}
 * @final
 */
export function FilterObservingMenuItemRenderer() {
 MenuItemRenderer.call(this);
}
goog.inherits(
    FilterObservingMenuItemRenderer, MenuItemRenderer);
goog.addSingletonGetter(FilterObservingMenuItemRenderer);


/**
 * CSS class name the renderer applies to menu item elements.
 * @type {string}
 */
FilterObservingMenuItemRenderer.CSS_CLASS =
    goog.getCssName('goog-filterobsmenuitem');


/**
 * Returns the CSS class to be applied to menu items rendered using this
 * renderer.
 * @return {string} Renderer-specific CSS class.
 * @override
 */
FilterObservingMenuItemRenderer.prototype.getCssClass = function() {
 return FilterObservingMenuItemRenderer.CSS_CLASS;
};
