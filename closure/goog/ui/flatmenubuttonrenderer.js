/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Similar functionality of {@link MenuButtonRenderer},
 * but inherits from {@link FlatButtonRenderer} instead of
 * {@link goog.ui.CustomButtonRenderer}. This creates a simpler menu button
 * that will look more like a traditional <select> menu.
 */

import * as googDom from '../dom/dom.js';

import { TagName } from '../dom/tagname.js';
import * as style from '../style/style.js';
import { FlatButtonRenderer } from './flatbuttonrenderer.js';
import { INLINE_BLOCK_CLASSNAME } from './cssnames.js';
import { Menu } from './menu.js';
import { MenuButton } from './menubutton.js';
import { MenuRenderer } from './menurenderer.js';
import * as registry from './registry.js';
const { Button } = goog.requireType('goog.ui.button');
const { Control } = goog.requireType('goog.ui.control');
const { ControlContent } = goog.requireType('goog.ui.controlcontent');



/**
 * Flat Menu Button renderer. Creates a simpler version of
 * {@link MenuButton} that doesn't look like a button and
 * doesn't have rounded corners. Uses just a `<div>` and looks more like
 * a traditional `<select>` element.
 * @constructor
 * @extends {FlatButtonRenderer}
 */
export function FlatMenuButtonRenderer() {
    FlatButtonRenderer.call(this);
}
goog.inherits(FlatMenuButtonRenderer, FlatButtonRenderer);
goog.addSingletonGetter(FlatMenuButtonRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
FlatMenuButtonRenderer.CSS_CLASS =
    goog.getCssName('goog-flat-menu-button');


/**
 * Returns the button's contents wrapped in the following DOM structure:
 *
 *    <div class="goog-inline-block goog-flat-menu-button">
 *        <div class="goog-inline-block goog-flat-menu-button-caption">
 *          Contents...
 *        </div>
 *        <div class="goog-inline-block goog-flat-menu-button-dropdown">
 *          &nbsp;
 *        </div>
 *    </div>
 *
 * Overrides {@link FlatButtonRenderer#createDom}.
 * @param {Control} control Button to render.
 * @return {!Element} Root element for the button.
 * @override
 */
FlatMenuButtonRenderer.prototype.createDom = function(control) {
    var button = /** @type {Button} */ (control);
    var classNames = this.getClassNames(button);
    var element = button.getDomHelper().createDom(
        TagName.DIV,
        INLINE_BLOCK_CLASSNAME + ' ' + classNames.join(' '), [
          this.createCaption(button.getContent(), button.getDomHelper()),
          this.createDropdown(button.getDomHelper())
        ]);
    this.setTooltip(element, /** @type {string}*/ (button.getTooltip()));
    return element;
};


/**
 * Takes the button's root element and returns the parent element of the
 * button's contents.
 * @param {Element} element Root element of the button whose content
 * element is to be returned.
 * @return {Element} The button's content element (if any).
 * @override
 */
FlatMenuButtonRenderer.prototype.getContentElement = function(element) {
    return element && /** @type {Element} */ (element.firstChild);
};


/**
 * Takes an element, decorates it with the menu button control, and returns
 * the element.  Overrides {@link goog.ui.CustomButtonRenderer#decorate} by
 * looking for a child element that can be decorated by a menu, and if it
 * finds one, decorates it and attaches it to the menu button.
 * @param {Control} button Menu button to decorate the element.
 * @param {Element} element Element to decorate.
 * @return {Element} Decorated element.
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
FlatMenuButtonRenderer.prototype.decorate = function(button, element) {
    // TODO(user): MenuButtonRenderer uses the exact same code.
    // Refactor this block to its own module where both can use it.
    var menuElem = googDom.getElementsByTagNameAndClass(
        '*', MenuRenderer.CSS_CLASS, element)[0];
    if (menuElem) {
      // Move the menu element directly under the body, but hide it first; see
      // bug 1089244.
      style.setElementShown(menuElem, false);
      button.getDomHelper().getDocument().body.appendChild(menuElem);

      // Decorate the menu and attach it to the button.
      var menu = new Menu();
      menu.decorate(menuElem);
      button.setMenu(menu);
    }

    // Add the caption if it's not already there.
    var captionElem = googDom.getElementsByTagNameAndClass(
        '*', goog.getCssName(this.getCssClass(), 'caption'), element)[0];
    if (!captionElem) {
      element.appendChild(
          /** @type {!Node} */ (
              this.createCaption(element.childNodes, button.getDomHelper())));
    }

    // Add the dropdown icon if it's not already there.
    var dropdownElem = googDom.getElementsByTagNameAndClass(
        '*', goog.getCssName(this.getCssClass(), 'dropdown'), element)[0];
    if (!dropdownElem) {
      element.appendChild(this.createDropdown(button.getDomHelper()));
    }

    // Let the superclass do the rest.
    return FlatMenuButtonRenderer.superClass_.decorate.call(
        this, button, element);
};


/**
 * Takes a text caption or existing DOM structure, and returns it wrapped in
 * an appropriately-styled DIV.  Creates the following DOM structure:
 *
 *    <div class="goog-inline-block goog-flat-menu-button-caption">
 *      Contents...
 *    </div>
 *
 * @param {ControlContent} content Text caption or DOM structure to wrap
 *     in a box.
 * @param {googDom.DomHelper} dom DOM helper, used for document interaction.
 * @return {!Element} Caption element.
 */
FlatMenuButtonRenderer.prototype.createCaption = function(
    content, dom) {
    return dom.createDom(
        TagName.DIV,
        INLINE_BLOCK_CLASSNAME + ' ' +
            goog.getCssName(this.getCssClass(), 'caption'),
        content);
};


/**
 * Returns an appropriately-styled DIV containing a dropdown arrow element.
 * Creates the following DOM structure:
 *
 *    <div class="goog-inline-block goog-flat-menu-button-dropdown">
 *      &nbsp;
 *    </div>
 *
 * @param {googDom.DomHelper} dom DOM helper, used for document interaction.
 * @return {!Element} Dropdown element.
 */
FlatMenuButtonRenderer.prototype.createDropdown = function(dom) {
    // 00A0 is &nbsp;
    return dom.createDom(
        TagName.DIV, {
          'class': INLINE_BLOCK_CLASSNAME + ' ' +
              goog.getCssName(this.getCssClass(), 'dropdown'),
          'aria-hidden': true
        },
        '\u00A0');
};


/**
 * Returns the CSS class to be applied to the root element of components
 * rendered using this renderer.
 * @return {string} Renderer-specific CSS class.
 * @override
 */
FlatMenuButtonRenderer.prototype.getCssClass = function() {
    return FlatMenuButtonRenderer.CSS_CLASS;
};


// Register a decorator factory function for Flat Menu Buttons.
registry.setDecoratorByClassName(
    FlatMenuButtonRenderer.CSS_CLASS, function() {
    // Uses goog.ui.MenuButton, but with FlatMenuButtonRenderer.
    return new MenuButton(
        null, null, FlatMenuButtonRenderer.getInstance());
});
