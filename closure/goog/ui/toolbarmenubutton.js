/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A toolbar menu button control.
 */

import { MenuButton } from './menubutton.js';

import { ToolbarMenuButtonRenderer } from './toolbarmenubuttonrenderer.js';
import * as registry from './registry.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { ButtonRenderer } = goog.requireType('goog.ui.buttonrenderer');
const { ControlContent } = goog.requireType('goog.ui.controlcontent');
const { Menu } = goog.requireType('goog.ui.menu');



/**
 * A menu button control for a toolbar.
 *
 * @param {ControlContent} content Text caption or existing DOM
 *     structure to display as the button's caption.
 * @param {Menu=} opt_menu Menu to render under the button when clicked.
 * @param {ButtonRenderer=} opt_renderer Optional renderer used to
 *     render or decorate the button; defaults to
 *     {@link ToolbarMenuButtonRenderer}.
 * @param {DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {MenuButton}
 */
export function ToolbarMenuButton(content, opt_menu, opt_renderer, opt_domHelper) {
 MenuButton.call(
     this, content, opt_menu,
     opt_renderer || ToolbarMenuButtonRenderer.getInstance(),
     opt_domHelper);
}
goog.inherits(ToolbarMenuButton, MenuButton);


// Registers a decorator factory function for toolbar menu buttons.
registry.setDecoratorByClassName(
    ToolbarMenuButtonRenderer.CSS_CLASS, function() {
 return new ToolbarMenuButton(null);
});
