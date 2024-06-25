/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A toolbar select control.
 */

import { Select } from './select.js';

import { ToolbarMenuButtonRenderer } from './toolbarmenubuttonrenderer.js';
import * as registry from './registry.js';
goog.requireType('goog.dom.dom');
goog.requireType('goog.ui.controlcontent');
goog.requireType('goog.ui.menu');
goog.requireType('goog.ui.menubuttonrenderer');



/**
 * A select control for a toolbar.
 *
 * @param {goog.ui.ControlContent} caption Default caption or existing DOM
 *     structure to display as the button's caption when nothing is selected.
 * @param {goog.ui.Menu=} opt_menu Menu containing selection options.
 * @param {goog.ui.MenuButtonRenderer=} opt_renderer Renderer used to
 *     render or decorate the control; defaults to
 *     {@link ToolbarMenuButtonRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {Select}
 */
export function ToolbarSelect(caption, opt_menu, opt_renderer, opt_domHelper) {
 Select.call(
     this, caption, opt_menu,
     opt_renderer || ToolbarMenuButtonRenderer.getInstance(),
     opt_domHelper);
}
goog.inherits(ToolbarSelect, Select);


// Registers a decorator factory function for select controls used in toolbars.
registry.setDecoratorByClassName(
    goog.getCssName('goog-toolbar-select'), function() {
 return new ToolbarSelect(null);
});
