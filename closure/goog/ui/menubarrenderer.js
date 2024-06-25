/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Renderer for {@link goog.ui.menuBar}.
 */

import { Role } from '../a11y/aria/roles.js';

import { Container } from './container.js';
import { ContainerRenderer } from './containerrenderer.js';



/**
 * Default renderer for {@link goog.ui.menuBar}s, based on {@link
 * ContainerRenderer}.
 * @constructor
 * @extends {ContainerRenderer}
 * @final
 */
export function MenuBarRenderer() {
 MenuBarRenderer.base(
     this, 'constructor', Role.MENUBAR);
}
goog.inherits(MenuBarRenderer, ContainerRenderer);
goog.addSingletonGetter(MenuBarRenderer);


/**
 * Default CSS class to be applied to the root element of elements rendered
 * by this renderer.
 * @type {string}
 */
MenuBarRenderer.CSS_CLASS = goog.getCssName('goog-menubar');


/**
 * @override
 */
MenuBarRenderer.prototype.getCssClass = function() {
 return MenuBarRenderer.CSS_CLASS;
};


/**
 * Returns the default orientation of containers rendered or decorated by this
 * renderer.  This implementation returns `HORIZONTAL`.
 * @return {!Container.Orientation} Default orientation for containers
 *     created or decorated by this renderer.
 * @override
 */
MenuBarRenderer.prototype.getDefaultOrientation = function() {
 return Container.Orientation.HORIZONTAL;
};
