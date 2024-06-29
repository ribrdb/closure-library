/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A toolbar toggle button control.
 */

import { ToggleButton } from './togglebutton.js';

import { ToolbarButtonRenderer } from './toolbarbuttonrenderer.js';
import * as registry from './registry.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { ControlContent } = goog.requireType('goog.ui.controlcontent');



/**
 * A toggle button control for a toolbar.
 *
 * @param {ControlContent} content Text caption or existing DOM
 *     structure to display as the button's caption.
 * @param {ToolbarButtonRenderer=} opt_renderer Optional renderer used
 *     to render or decorate the button; defaults to
 *     {@link ToolbarButtonRenderer}.
 * @param {DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {ToggleButton}
 */
export function ToolbarToggleButton(content, opt_renderer, opt_domHelper) {
 ToggleButton.call(
     this, content,
     opt_renderer || ToolbarButtonRenderer.getInstance(),
     opt_domHelper);
}
goog.inherits(ToolbarToggleButton, ToggleButton);


// Registers a decorator factory function for toggle buttons in toolbars.
registry.setDecoratorByClassName(
    goog.getCssName('goog-toolbar-toggle-button'), function() {
 return new ToolbarToggleButton(null);
});
