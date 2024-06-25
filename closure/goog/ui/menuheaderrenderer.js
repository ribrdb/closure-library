/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Renderer for {@link goog.ui.MenuHeader}s.
 */

import { ControlRenderer } from './controlrenderer.js';



/**
 * Renderer for menu headers.
 * @constructor
 * @extends {ControlRenderer}
 */
export function MenuHeaderRenderer() {
 ControlRenderer.call(this);
}
goog.inherits(MenuHeaderRenderer, ControlRenderer);
goog.addSingletonGetter(MenuHeaderRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
MenuHeaderRenderer.CSS_CLASS = goog.getCssName('goog-menuheader');


/**
 * Returns the CSS class to be applied to the root element of components
 * rendered using this renderer.
 * @return {string} Renderer-specific CSS class.
 * @override
 */
MenuHeaderRenderer.prototype.getCssClass = function() {
 return MenuHeaderRenderer.CSS_CLASS;
};
