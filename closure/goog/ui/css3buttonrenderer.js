/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview An alternative imageless button renderer that uses CSS3 rather
 * than voodoo to render custom buttons with rounded corners and dimensionality
 * (via a subtle flat shadow on the bottom half of the button) without the use
 * of images.
 *
 * Based on the Custom Buttons 3.1 visual specification, see
 * http://go/custombuttons
 *
 * Tested and verified to work in Gecko 1.9.2+ and WebKit 528+.
 *
 * @see ../demos/css3button.html
 */

import * as asserts from '../asserts/asserts.js';

import { TagName } from '../dom/tagname.js';
import * as classlist from '../dom/classlist.js';
import { Button } from './button.js';
import { ButtonRenderer } from './buttonrenderer.js';
import { Component } from './component.js';
import { INLINE_BLOCK_CLASSNAME } from './cssnames.js';
import * as registry from './registry.js';
const { Control } = goog.requireType('goog.ui.control');



/**
 * Custom renderer for {@link Button}s. Css3 buttons can contain
 * almost arbitrary HTML content, will flow like inline elements, but can be
 * styled like block-level elements.
 *
 * @constructor
 * @extends {ButtonRenderer}
 * @final
 */
export function Css3ButtonRenderer() {
  ButtonRenderer.call(this);
}
goog.inherits(Css3ButtonRenderer, ButtonRenderer);
goog.addSingletonGetter(Css3ButtonRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
Css3ButtonRenderer.CSS_CLASS = goog.getCssName('goog-css3-button');


/** @override */
Css3ButtonRenderer.prototype.getContentElement = function(element) {
  return /** @type {Element} */ (element);
};


/**
 * Returns the button's contents wrapped in the following DOM structure:
 *
 *    <div class="goog-inline-block goog-css3-button">
 *      Contents...
 *    </div>
 *
 * Overrides {@link ButtonRenderer#createDom}.
 * @param {Control} control Button to render.
 * @return {!Element} Root element for the button.
 * @override
 */
Css3ButtonRenderer.prototype.createDom = function(control) {
  var button = /** @type {Button} */ (control);
  var classNames = this.getClassNames(button);
  return button.getDomHelper().createDom(
      TagName.DIV, {
        'class': INLINE_BLOCK_CLASSNAME + ' ' + classNames.join(' '),
        'title': button.getTooltip() || ''
      },
      button.getContent());
};


/**
 * Returns true if this renderer can decorate the element.  Overrides
 * {@link ButtonRenderer#canDecorate} by returning true if the
 * element is a DIV, false otherwise.
 * @param {Element} element Element to decorate.
 * @return {boolean} Whether the renderer can decorate the element.
 * @override
 */
Css3ButtonRenderer.prototype.canDecorate = function(element) {
  return element.tagName == TagName.DIV;
};


/** @override */
Css3ButtonRenderer.prototype.decorate = function(button, element) {
  asserts.assert(element);
  classlist.addAll(
      element, [INLINE_BLOCK_CLASSNAME, this.getCssClass()]);
  return Css3ButtonRenderer.superClass_.decorate.call(
      this, button, element);
};


/**
 * Returns the CSS class to be applied to the root element of components
 * rendered using this renderer.
 * @return {string} Renderer-specific CSS class.
 * @override
 */
Css3ButtonRenderer.prototype.getCssClass = function() {
  return Css3ButtonRenderer.CSS_CLASS;
};


/* Register a decorator factory function for Css3ButtonRenderer.*/
registry.setDecoratorByClassName(
    Css3ButtonRenderer.CSS_CLASS, function() {
  return new Button(null, Css3ButtonRenderer.getInstance());
});


// Register a decorator factory function for toggle buttons using the
/* Css3ButtonRenderer.*/
registry.setDecoratorByClassName(
    goog.getCssName('goog-css3-toggle-button'), function() {
  var button =
      new Button(null, Css3ButtonRenderer.getInstance());
  button.setSupportedState(Component.State.CHECKED, true);
  return button;
});
