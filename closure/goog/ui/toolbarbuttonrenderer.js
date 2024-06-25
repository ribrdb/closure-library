/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Renderer for toolbar buttons.
 */

import { CustomButtonRenderer } from './custombuttonrenderer.js';



/**
 * Toolbar-specific renderer for {@link goog.ui.Button}s, based on {@link
 * CustomButtonRenderer}.
 * @constructor
 * @extends {CustomButtonRenderer}
 */
export function ToolbarButtonRenderer() {
 CustomButtonRenderer.call(this);
}
goog.inherits(ToolbarButtonRenderer, CustomButtonRenderer);
goog.addSingletonGetter(ToolbarButtonRenderer);


/**
 * Default CSS class to be applied to the root element of buttons rendered
 * by this renderer.
 * @type {string}
 */
ToolbarButtonRenderer.CSS_CLASS =
    goog.getCssName('goog-toolbar-button');


/**
 * Returns the CSS class to be applied to the root element of buttons rendered
 * using this renderer.
 * @return {string} Renderer-specific CSS class.
 * @override
 */
ToolbarButtonRenderer.prototype.getCssClass = function() {
 return ToolbarButtonRenderer.CSS_CLASS;
};
