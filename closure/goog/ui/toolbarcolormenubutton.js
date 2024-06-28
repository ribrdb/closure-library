/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A toolbar color menu button control.
 */

goog.declareModuleId('goog.ui.toolbarcolormenubutton');

import { ColorMenuButton } from './colormenubutton.js';
import { ToolbarColorMenuButtonRenderer } from './toolbarcolormenubuttonrenderer.js';
import * as registry from './registry.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { ColorMenuButtonRenderer } = goog.requireType('goog.ui.colormenubuttonrenderer');
const { ControlContent } = goog.requireType('goog.ui.controlcontent');
const { Menu } = goog.requireType('goog.ui.menu');



/**
 * A color menu button control for a toolbar.
 *
 * @param {ControlContent} content Text caption or existing DOM
 *     structure to display as the button's caption.
 * @param {Menu=} opt_menu Menu to render under the button when clicked;
 *     should contain at least one {@link goog.ui.ColorPalette} if present.
 * @param {ColorMenuButtonRenderer=} opt_renderer Optional
 *     renderer used to render or decorate the button; defaults to
 *     {@link ToolbarColorMenuButtonRenderer}.
 * @param {DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {ColorMenuButton}
 */
export function ToolbarColorMenuButton(content, opt_menu, opt_renderer, opt_domHelper) {
 ColorMenuButton.call(
     this, content, opt_menu,
     opt_renderer || ToolbarColorMenuButtonRenderer.getInstance(),
     opt_domHelper);
}
goog.inherits(ToolbarColorMenuButton, ColorMenuButton);


// Registers a decorator factory function for toolbar color menu buttons.
registry.setDecoratorByClassName(
    goog.getCssName('goog-toolbar-color-menu-button'), function() {
 return new ToolbarColorMenuButton(null);
});
