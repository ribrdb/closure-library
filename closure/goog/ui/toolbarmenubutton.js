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
goog.requireType('goog.dom.dom');
goog.requireType('goog.ui.buttonrenderer');
goog.requireType('goog.ui.controlcontent');
goog.requireType('goog.ui.menu');



/**
 * A menu button control for a toolbar.
 *
 * @param {goog.ui.ControlContent} content Text caption or existing DOM
 *     structure to display as the button's caption.
 * @param {goog.ui.Menu=} opt_menu Menu to render under the button when clicked.
 * @param {goog.ui.ButtonRenderer=} opt_renderer Optional renderer used to
 *     render or decorate the button; defaults to
 *     {@link ToolbarMenuButtonRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
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
