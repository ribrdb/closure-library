/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A toggle button control.  Extends {@link Button} by
 * providing checkbox-like semantics.
 */

import { Button } from './button.js';

import { Component } from './component.js';
import { CustomButtonRenderer } from './custombuttonrenderer.js';
import * as registry from './registry.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { ButtonRenderer } = goog.requireType('goog.ui.buttonrenderer');
const { ControlContent } = goog.requireType('goog.ui.controlcontent');



/**
 * A toggle button, with checkbox-like semantics.  Rendered using
 * {@link CustomButtonRenderer} by default, though any
 * {@link ButtonRenderer} would work.
 *
 * @param {ControlContent} content Text caption or existing DOM
 *     structure to display as the button's caption.
 * @param {ButtonRenderer=} opt_renderer Renderer used to render or
 *     decorate the button; defaults to {@link CustomButtonRenderer}.
 * @param {DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {Button}
 */
export function ToggleButton(content, opt_renderer, opt_domHelper) {
 Button.call(
     this, content, opt_renderer || CustomButtonRenderer.getInstance(),
     opt_domHelper);
 this.setSupportedState(Component.State.CHECKED, true);
}
goog.inherits(ToggleButton, Button);


/* Register a decorator factory function for ToggleButtons.*/
registry.setDecoratorByClassName(
    goog.getCssName('goog-toggle-button'), function() {
 // ToggleButton defaults to using CustomButtonRenderer.
 return new ToggleButton(null);
});
