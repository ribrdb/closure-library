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
const { DomHelper } = goog.requireType('goog.dom.dom');
const { ControlContent } = goog.requireType('goog.ui.controlcontent');
const { Menu } = goog.requireType('goog.ui.menu');
const { MenuButtonRenderer } = goog.requireType('goog.ui.menubuttonrenderer');



/**
 * A select control for a toolbar.
 *
 * @param {ControlContent} caption Default caption or existing DOM
 *     structure to display as the button's caption when nothing is selected.
 * @param {Menu=} opt_menu Menu containing selection options.
 * @param {MenuButtonRenderer=} opt_renderer Renderer used to
 *     render or decorate the control; defaults to
 *     {@link ToolbarMenuButtonRenderer}.
 * @param {DomHelper=} opt_domHelper Optional DOM helper, used for
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
