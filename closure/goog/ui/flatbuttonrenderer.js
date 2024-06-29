/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Similar functionality of {@link ButtonRenderer},
 * but uses a <div> element instead of a <button> or <input> element.
 */

import { Role } from '../a11y/aria/roles.js';

import * as asserts from '../asserts/asserts.js';
import { TagName } from '../dom/tagname.js';
import * as classlist from '../dom/classlist.js';
import { Button } from './button.js';
import { ButtonRenderer } from './buttonrenderer.js';
import { INLINE_BLOCK_CLASSNAME } from './cssnames.js';
import * as registry from './registry.js';
const { Control } = goog.requireType('goog.ui.control');



/**
 * Flat renderer for {@link Button}s.  Flat buttons can contain
 * almost arbitrary HTML content, will flow like inline elements, but can be
 * styled like block-level elements.
 * @constructor
 * @extends {ButtonRenderer}
 */
export function FlatButtonRenderer() {
 ButtonRenderer.call(this);
}
goog.inherits(FlatButtonRenderer, ButtonRenderer);
goog.addSingletonGetter(FlatButtonRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
FlatButtonRenderer.CSS_CLASS = goog.getCssName('goog-flat-button');


/**
 * Returns the control's contents wrapped in a div element, with
 * the renderer's own CSS class and additional state-specific classes applied
 * to it, and the button's disabled attribute set or cleared as needed.
 * Overrides {@link ButtonRenderer#createDom}.
 * @param {Control} button Button to render.
 * @return {!Element} Root element for the button.
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
FlatButtonRenderer.prototype.createDom = function(button) {
 var classNames = this.getClassNames(button);
 var element = button.getDomHelper().createDom(
     TagName.DIV,
     INLINE_BLOCK_CLASSNAME + ' ' + classNames.join(' '),
     button.getContent());
 this.setTooltip(element, button.getTooltip());
 return element;
};


/**
 * Returns the ARIA role to be applied to flat buttons.
 * @return {Role|undefined} ARIA role.
 * @override
 */
FlatButtonRenderer.prototype.getAriaRole = function() {
 return Role.BUTTON;
};


/**
 * Returns true if this renderer can decorate the element.  Overrides
 * {@link ButtonRenderer#canDecorate} by returning true if the
 * element is a DIV, false otherwise.
 * @param {Element} element Element to decorate.
 * @return {boolean} Whether the renderer can decorate the element.
 * @override
 */
FlatButtonRenderer.prototype.canDecorate = function(element) {
 return element.tagName == TagName.DIV;
};


/**
 * Takes an existing element and decorates it with the flat button control.
 * Initializes the control's ID, content, tooltip, value, and state based
 * on the ID of the element, its child nodes, and its CSS classes, respectively.
 * Returns the element.  Overrides {@link ButtonRenderer#decorate}.
 * @param {Control} button Button instance to decorate the element.
 * @param {Element} element Element to decorate.
 * @return {Element} Decorated element.
 * @override
 */
FlatButtonRenderer.prototype.decorate = function(button, element) {
 asserts.assert(element);
 classlist.add(element, INLINE_BLOCK_CLASSNAME);
 return FlatButtonRenderer.superClass_.decorate.call(
     this, button, element);
};


/**
 * Flat buttons can't use the value attribute since they are div elements.
 * Overrides {@link ButtonRenderer#getValue} to prevent trying to
 * access the element's value.
 * @param {Element} element The button control's root element.
 * @return {string} Value not valid for flat buttons.
 * @override
 */
FlatButtonRenderer.prototype.getValue = function(element) {
 // Flat buttons don't store their value in the DOM.
 return '';
};


/**
 * Returns the CSS class to be applied to the root element of components
 * rendered using this renderer.
 * @return {string} Renderer-specific CSS class.
 * @override
 */
FlatButtonRenderer.prototype.getCssClass = function() {
 return FlatButtonRenderer.CSS_CLASS;
};


// Register a decorator factory function for Flat Buttons.
registry.setDecoratorByClassName(
    FlatButtonRenderer.CSS_CLASS, function() {
 // Uses goog.ui.Button, but with FlatButtonRenderer.
 return new Button(null, FlatButtonRenderer.getInstance());
});
