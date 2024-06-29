/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A button rendered via {@link CustomButtonRenderer}.
 */

import { Button } from './button.js';

import { CustomButtonRenderer } from './custombuttonrenderer.js';
import * as registry from './registry.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { ButtonRenderer } = goog.requireType('goog.ui.buttonrenderer');
const { ControlContent } = goog.requireType('goog.ui.controlcontent');



/**
 * A custom button control.  Identical to {@link Button}, except it
 * defaults its renderer to {@link CustomButtonRenderer}.  One could
 * just as easily pass `CustomButtonRenderer.getInstance()` to
 * the {@link Button} constructor and get the same result.  Provided
 * for convenience.
 *
 * @param {ControlContent} content Text caption or existing DOM
 *    structure to display as the button's caption.
 * @param {ButtonRenderer=} opt_renderer Optional renderer used to
 *    render or decorate the button; defaults to
 *    {@link CustomButtonRenderer}.
 * @param {DomHelper=} opt_domHelper Optional DOM helper, used for
 *    document interaction.
 * @constructor
 * @extends {Button}
 */
export function CustomButton(content, opt_renderer, opt_domHelper) {
 Button.call(
     this, content, opt_renderer || CustomButtonRenderer.getInstance(),
     opt_domHelper);
}
goog.inherits(CustomButton, Button);


/* Register a decorator factory function for CustomButtons.*/
registry.setDecoratorByClassName(
    CustomButtonRenderer.CSS_CLASS, function() {
 // CustomButton defaults to using CustomButtonRenderer.
 return new CustomButton(null);
});
