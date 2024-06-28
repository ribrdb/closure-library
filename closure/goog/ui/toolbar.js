/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A toolbar class that hosts {@link goog.ui.Control}s such as
 * buttons and menus, along with toolbar-specific renderers of those controls.
 *
 * @see ../demos/toolbar.html
 */

goog.declareModuleId('goog.ui.toolbar');

import { Container } from './container.js';
import { ToolbarRenderer } from './toolbarrenderer.js';
const { DomHelper } = goog.requireType('goog.dom.dom');



/**
 * A toolbar class, implemented as a {@link Container} that defaults to
 * having a horizontal orientation and {@link ToolbarRenderer} as its
 * renderer.
 * @param {ToolbarRenderer=} opt_renderer Renderer used to render or
 *     decorate the toolbar; defaults to {@link ToolbarRenderer}.
 * @param {?Container.Orientation=} opt_orientation Toolbar orientation;
 *     defaults to `HORIZONTAL`.
 * @param {DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {Container}
 */
export function Toolbar(opt_renderer, opt_orientation, opt_domHelper) {
 Container.call(
     this, opt_orientation,
     opt_renderer || ToolbarRenderer.getInstance(), opt_domHelper);
}
goog.inherits(Toolbar, Container);


/** @override */
Toolbar.prototype.handleFocus = function(e) {
 Toolbar.base(this, 'handleFocus', e);
 // Highlight the first highlightable item on focus via the keyboard for ARIA
 // spec compliance. Do not highlight the item if the mouse button is pressed,
 // since this method is also called from handleMouseDown when a toolbar button
 // is clicked.
 if (!this.isMouseButtonPressed()) {
   this.highlightFirst();
 }
};
