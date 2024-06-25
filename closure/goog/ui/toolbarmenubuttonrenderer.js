/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A toolbar menu button renderer.
 */

import { MenuButtonRenderer } from './menubuttonrenderer.js';



/**
 * Toolbar-specific renderer for {@link goog.ui.MenuButton}s, based on {@link
 * MenuButtonRenderer}.
 * @constructor
 * @extends {MenuButtonRenderer}
 */
export function ToolbarMenuButtonRenderer() {
 MenuButtonRenderer.call(this);
}
goog.inherits(ToolbarMenuButtonRenderer, MenuButtonRenderer);
goog.addSingletonGetter(ToolbarMenuButtonRenderer);


/**
 * Default CSS class to be applied to the root element of menu buttons rendered
 * by this renderer.
 * @type {string}
 */
ToolbarMenuButtonRenderer.CSS_CLASS =
    goog.getCssName('goog-toolbar-menu-button');


/**
 * Returns the CSS class to be applied to the root element of menu buttons
 * rendered using this renderer.
 * @return {string} Renderer-specific CSS class.
 * @override
 */
ToolbarMenuButtonRenderer.prototype.getCssClass = function() {
 return ToolbarMenuButtonRenderer.CSS_CLASS;
};
