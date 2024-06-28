/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Renderer for {@link MenuButton}s and
 * subclasses.
 */

import { Role } from '../../../a11y/aria/roles.js';

import * as array from '../../../array/array.js';
import * as googDom from '../../../dom/dom.js';
import { TagName } from '../../../dom/tagname.js';
import * as style from '../../../style/style.js';
import { Menu } from '../../menu.js';
import { MenuRenderer } from '../../menurenderer.js';
import { ButtonRenderer } from './buttonrenderer.js';
const {Control} = goog.requireType('goog.ui.control');
const {ControlContent} = goog.requireType('goog.ui.controlcontent');
const {MenuButton} = goog.requireType('goog.ui.menubutton');



/**
 * Renderer for {@link MenuButton}s.  This implementation
 * overrides {@link ButtonRenderer#createButton} to insert a
 * dropdown element into the content element after the specified content.
 * @constructor
 * @extends {ButtonRenderer}
 * @final
 */
export function MenuButtonRenderer() {
  ButtonRenderer.call(this);
}
goog.inherits(
    MenuButtonRenderer, ButtonRenderer);
goog.addSingletonGetter(MenuButtonRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
MenuButtonRenderer.CSS_CLASS =
    goog.getCssName('goog-menu-button');


/**
 * Array of arrays of CSS classes that we want composite classes added and
 * removed for in IE6 and lower as a workaround for lack of multi-class CSS
 * selector support.
 * @type {!Array<Array<string>>}
 */
MenuButtonRenderer.IE6_CLASS_COMBINATIONS = [
  [
    goog.getCssName('goog-button-base-rtl'), goog.getCssName('goog-menu-button')
  ],

  [
    goog.getCssName('goog-button-base-hover'),
    goog.getCssName('goog-menu-button')
  ],

  [
    goog.getCssName('goog-button-base-focused'),
    goog.getCssName('goog-menu-button')
  ],

  [
    goog.getCssName('goog-button-base-disabled'),
    goog.getCssName('goog-menu-button')
  ],

  [
    goog.getCssName('goog-button-base-active'),
    goog.getCssName('goog-menu-button')
  ],

  [
    goog.getCssName('goog-button-base-open'),
    goog.getCssName('goog-menu-button')
  ],

  [
    goog.getCssName('goog-button-base-active'),
    goog.getCssName('goog-button-base-open'),
    goog.getCssName('goog-menu-button')
  ]
];


/**
 * Returns the ARIA role to be applied to menu buttons, which
 * have a menu attached to them.
 * @return {Role} ARIA role.
 * @override
 */
MenuButtonRenderer.prototype.getAriaRole = function() {
  // If we apply the 'button' ARIA role to the menu button, the
  // screen reader keeps referring to menus as buttons, which
  // might be misleading for the users. Hence the ARIA role
  // 'menu' is assigned.
  return Role.MENU;
};


/**
 * Takes the button's root element and returns the parent element of the
 * button's contents.  Overrides the superclass implementation by taking
 * the nested DIV structure of menu buttons into account.
 * @param {Element} element Root element of the button whose content element
 *     is to be returned.
 * @return {Element} The button's content element.
 * @override
 */
MenuButtonRenderer.prototype.getContentElement = function(
    element) {
  return MenuButtonRenderer.superClass_.getContentElement
      .call(this, element);
};


/**
 * Takes an element, decorates it with the menu button control, and returns
 * the element.  Overrides {@link ButtonRenderer#decorate} by
 * looking for a child element that can be decorated by a menu, and if it
 * finds one, decorates it and attaches it to the menu button.
 * @param {Control} control MenuButton to decorate the element.
 * @param {Element} element Element to decorate.
 * @return {Element} Decorated element.
 * @override
 */
MenuButtonRenderer.prototype.decorate = function(
    control, element) {
  const button = /** @type {MenuButton} */ (control);
  // TODO(attila):  Add more robust support for subclasses of Menu.
  const menuElem = googDom.getElementsByTagNameAndClass(
      '*', MenuRenderer.CSS_CLASS, element)[0];
  if (menuElem) {
    // Move the menu element directly under the body (but hide it first to
    // prevent flicker; see bug 1089244).
    style.setElementShown(menuElem, false);
    googDom.appendChild(googDom.getOwnerDocument(menuElem).body, menuElem);

    // Decorate the menu and attach it to the button.
    const menu = new Menu();
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
 *    <div class="goog-inline-block goog-button-outer-box">
 *      <div class="goog-inline-block goog-button-inner-box">
 *        <div class="goog-button-pos">
 *          <div class="goog-button-top-shadow">&nbsp;</div>
 *          <div class="goog-button-content">
 *            Contents...
 *            <div class="goog-menu-button-dropdown"> </div>
 *          </div>
 *        </div>
 *      </div>
 *    </div>
 *
 * @param {ControlContent} content Text caption or DOM structure to wrap
 *     in a box.
 * @param {googDom.DomHelper} dom DOM helper, used for document interaction.
 * @return {!Element} Pseudo-rounded-corner box containing the content.
 * @override
 */
MenuButtonRenderer.prototype.createButton = function(
    content, dom) {
  const contentWithDropdown = this.createContentWithDropdown(content, dom);
  return MenuButtonRenderer.superClass_.createButton.call(
      this, contentWithDropdown, dom);
};


/** @override */
MenuButtonRenderer.prototype.setContent = function(
    element, content) {
  const dom = googDom.getDomHelper(this.getContentElement(element));
  MenuButtonRenderer.superClass_.setContent.call(
      this, element, this.createContentWithDropdown(content, dom));
};


/**
 * Inserts dropdown element as last child of existing content.
 * @param {ControlContent} content Text caption or DOM structure.
 * @param {googDom.DomHelper} dom DOM helper, used for document ineraction.
 * @return {!Array<Node>} DOM structure to be set as the button's content.
 */
MenuButtonRenderer.prototype.createContentWithDropdown =
    function(content, dom) {
      const caption = dom.createDom(
          TagName.DIV, null, content, this.createDropdown(dom));
      return array.toArray(caption.childNodes);
    };


/**
 * Returns an appropriately-styled DIV containing a dropdown arrow.
 * Creates the following DOM structure:
 *
 *    <div class="goog-menu-button-dropdown"> </div>
 *
 * @param {googDom.DomHelper} dom DOM helper, used for document interaction.
 * @return {!Element} Dropdown element.
 */
MenuButtonRenderer.prototype.createDropdown = function(dom) {
  return dom.createDom(
      TagName.DIV, goog.getCssName(this.getCssClass(), 'dropdown'));
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


/** @override */
MenuButtonRenderer.prototype.getIe6ClassCombinations =
    function() {
      return MenuButtonRenderer.IE6_CLASS_COMBINATIONS;
    };
