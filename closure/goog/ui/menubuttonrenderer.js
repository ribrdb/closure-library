/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Renderer for {@link MenuButton}s and subclasses.
 */

goog.declareModuleId('goog.ui.menubuttonrenderer');

import * as googDom from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import * as style from '../style/style.js';
import { CustomButtonRenderer } from './custombuttonrenderer.js';
import { INLINE_BLOCK_CLASSNAME } from './cssnames.js';
import { Menu } from './menu.js';
import { MenuRenderer } from './menurenderer.js';
const {Control} = goog.requireType('goog.ui.control');
const {ControlContent} = goog.requireType('goog.ui.controlcontent');
const {MenuButton} = goog.requireType('goog.ui.menubutton');



/**
 * Renderer for {@link MenuButton}s.  This implementation overrides
 * {@link CustomButtonRenderer#createButton} to create a separate
 * caption and dropdown element.
 * @constructor
 * @extends {CustomButtonRenderer}
 */
export function MenuButtonRenderer() {
 CustomButtonRenderer.call(this);
}
goog.inherits(MenuButtonRenderer, CustomButtonRenderer);
goog.addSingletonGetter(MenuButtonRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
MenuButtonRenderer.CSS_CLASS = goog.getCssName('goog-menu-button');


/**
 * Takes the button's root element and returns the parent element of the
 * button's contents.  Overrides the superclass implementation by taking
 * the nested DIV structure of menu buttons into account.
 * @param {Element} element Root element of the button whose content element
 *     is to be returned.
 * @return {Element} The button's content element.
 * @override
 */
MenuButtonRenderer.prototype.getContentElement = function(element) {
 return MenuButtonRenderer.superClass_.getContentElement.call(
     this,
     /** @type {Element} */ (element && element.firstChild));
};


/**
 * Takes an element, decorates it with the menu button control, and returns
 * the element.  Overrides {@link CustomButtonRenderer#decorate} by
 * looking for a child element that can be decorated by a menu, and if it
 * finds one, decorates it and attaches it to the menu button.
 * @param {Control} control MenuButton to decorate the element.
 * @param {Element} element Element to decorate.
 * @return {Element} Decorated element.
 * @override
 */
MenuButtonRenderer.prototype.decorate = function(control, element) {
 var button = /** @type {MenuButton} */ (control);
 // TODO(attila):  Add more robust support for subclasses of goog.ui.Menu.
 var menuElem = googDom.getElementsByTagNameAndClass(
     '*', MenuRenderer.CSS_CLASS, element)[0];
 if (menuElem) {
   // Move the menu element directly under the body (but hide it first to
   // prevent flicker; see bug 1089244).
   style.setElementShown(menuElem, false);
   googDom.appendChild(googDom.getOwnerDocument(menuElem).body, menuElem);

   // Decorate the menu and attach it to the button.
   var menu = new Menu();
   menu.decorate(menuElem);
   button.setMenu(menu);
 }

 // Let the superclass do the rest.
 return MenuButtonRenderer.superClass_.decorate.call(
     this, button, element);
};


/**
 * Takes a text caption or existing DOM structure, and returns the content and
 * a dropdown arrow element wrapped in a pseudo-rounded-corner box.  Creates
 * the following DOM structure:
 *
 *    <div class="goog-inline-block goog-menu-button-outer-box">
 *      <div class="goog-inline-block goog-menu-button-inner-box">
 *        <div class="goog-inline-block goog-menu-button-caption">
 *          Contents...
 *        </div>
 *        <div class="goog-inline-block goog-menu-button-dropdown">
 *          &nbsp;
 *        </div>
 *      </div>
 *    </div>
 *
 * @param {ControlContent} content Text caption or DOM structure
 *     to wrap in a box.
 * @param {googDom.DomHelper} dom DOM helper, used for document interaction.
 * @return {!Element} Pseudo-rounded-corner box containing the content.
 * @override
 */
MenuButtonRenderer.prototype.createButton = function(content, dom) {
 return MenuButtonRenderer.superClass_.createButton.call(
     this, [this.createCaption(content, dom), this.createDropdown(dom)], dom);
};


/**
 * Takes a text caption or existing DOM structure, and returns it wrapped in
 * an appropriately-styled DIV.  Creates the following DOM structure:
 *
 *    <div class="goog-inline-block goog-menu-button-caption">
 *      Contents...
 *    </div>
 *
 * @param {ControlContent} content Text caption or DOM structure
 *     to wrap in a box.
 * @param {googDom.DomHelper} dom DOM helper, used for document interaction.
 * @return {!Element} Caption element.
 */
MenuButtonRenderer.prototype.createCaption = function(content, dom) {
 return MenuButtonRenderer.wrapCaption(
     content, this.getCssClass(), dom);
};


/**
 * Takes a text caption or existing DOM structure, and returns it wrapped in
 * an appropriately-styled DIV.  Creates the following DOM structure:
 *
 *    <div class="goog-inline-block goog-menu-button-caption">
 *      Contents...
 *    </div>
 *
 * @param {ControlContent} content Text caption or DOM structure
 *     to wrap in a box.
 * @param {string} cssClass The CSS class for the renderer.
 * @param {googDom.DomHelper} dom DOM helper, used for document interaction.
 * @return {!Element} Caption element.
 */
MenuButtonRenderer.wrapCaption = function(content, cssClass, dom) {
 return dom.createDom(
     TagName.DIV,
     INLINE_BLOCK_CLASSNAME + ' ' +
         goog.getCssName(cssClass, 'caption'),
     content);
};


/**
 * Returns an appropriately-styled DIV containing a dropdown arrow element.
 * Creates the following DOM structure:
 *
 *    <div class="goog-inline-block goog-menu-button-dropdown">
 *      &nbsp;
 *    </div>
 *
 * @param {googDom.DomHelper} dom DOM helper, used for document interaction.
 * @return {!Element} Dropdown element.
 */
MenuButtonRenderer.prototype.createDropdown = function(dom) {
 // 00A0 is &nbsp;
 return dom.createDom(
     TagName.DIV, INLINE_BLOCK_CLASSNAME + ' ' +
         goog.getCssName(this.getCssClass(), 'dropdown'),
     '\u00A0');
};


/**
 * Returns the CSS class to be applied to the root element of components
 * rendered using this renderer.
 * @return {string} Renderer-specific CSS class.
 * @override
 */
MenuButtonRenderer.prototype.getCssClass = function() {
 return MenuButtonRenderer.CSS_CLASS;
};
