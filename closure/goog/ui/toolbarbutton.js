/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A toolbar button control.
 */

import { Button } from './button.js';

import { ToolbarButtonRenderer } from './toolbarbuttonrenderer.js';
import * as registry from './registry.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { ButtonRenderer } = goog.requireType('goog.ui.buttonrenderer');
const { ControlContent } = goog.requireType('goog.ui.controlcontent');



/**
 * A button control for a toolbar.
 *
 * @param {ControlContent} content Text caption or existing DOM
 *     structure to display as the button's caption.
 * @param {ButtonRenderer=} opt_renderer Optional renderer used to
 *     render or decorate the button; defaults to
 *     {@link ToolbarButtonRenderer}.
 * @param {DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {Button}
 */
export function ToolbarButton(content, opt_renderer, opt_domHelper) {
 Button.call(
     this, content,
     opt_renderer || ToolbarButtonRenderer.getInstance(),
     opt_domHelper);
}
goog.inherits(ToolbarButton, Button);


// Registers a decorator factory function for toolbar buttons.
registry.setDecoratorByClassName(
    ToolbarButtonRenderer.CSS_CLASS, function() {
 return new ToolbarButton(null);
});
