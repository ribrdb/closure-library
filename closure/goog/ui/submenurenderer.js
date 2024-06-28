/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Renderer for {@link SubMenu}s.
 */

import * as aria from '../a11y/aria/aria.js';

import { State } from '../a11y/aria/attributes.js';
import * as asserts from '../asserts/asserts.js';
import * as dom from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import * as classlist from '../dom/classlist.js';
import * as style from '../style/style.js';
import { Menu } from './menu.js';
import { MenuItemRenderer } from './menuitemrenderer.js';
const {Control} = goog.requireType('goog.ui.control');
const {ControlContent} = goog.requireType('goog.ui.controlcontent');
const {SubMenu} = goog.requireType('goog.ui.submenu');



/**
 * Default renderer for {@link SubMenu}s.  Each item has the following
 * structure:
 *
 *    <div class="goog-submenu">
 *      ...(menuitem content)...
 *      <div class="goog-menu">
 *        ... (submenu content) ...
 *      </div>
 *    </div>
 *
 * @constructor
 * @extends {MenuItemRenderer}
 */
export function SubMenuRenderer() {
 MenuItemRenderer.call(this);
}
goog.inherits(SubMenuRenderer, MenuItemRenderer);
goog.addSingletonGetter(SubMenuRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
SubMenuRenderer.CSS_CLASS = goog.getCssName('goog-submenu');


/**
 * The CSS class for submenus that displays the submenu arrow.
 * @type {string}
 * @private
 */
SubMenuRenderer.CSS_CLASS_SUBMENU_ =
    goog.getCssName('goog-submenu-arrow');


/**
 * Overrides {@link MenuItemRenderer#createDom} by adding
 * the additional class 'goog-submenu' to the created element,
 * and passes the element to {@link SubMenuItemRenderer#addArrow_}
 * to add an child element that can be styled to show an arrow.
 * @param {Control} control SubMenu to render.
 * @return {!Element} Root element for the item.
 * @override
 */
SubMenuRenderer.prototype.createDom = function(control) {
 var subMenu = /** @type {SubMenu} */ (control);
 var element =
     SubMenuRenderer.superClass_.createDom.call(this, subMenu);
 asserts.assert(element);
 classlist.add(element, SubMenuRenderer.CSS_CLASS);
 this.addArrow_(subMenu, element);
 return element;
};


/**
 * Overrides {@link MenuItemRenderer#decorate} by adding
 * the additional class 'goog-submenu' to the decorated element,
 * and passing the element to {@link SubMenuItemRenderer#addArrow_}
 * to add a child element that can be styled to show an arrow.
 * Also searches the element for a child with the class goog-menu. If a
 * matching child element is found, creates a Menu, uses it to
 * decorate the child element, and passes that menu to subMenu.setMenu.
 * @param {Control} control SubMenu to render.
 * @param {Element} element Element to decorate.
 * @return {!Element} Root element for the item.
 * @override
 */
SubMenuRenderer.prototype.decorate = function(control, element) {
 var subMenu = /** @type {SubMenu} */ (control);
 element =
     SubMenuRenderer.superClass_.decorate.call(this, subMenu, element);
 asserts.assert(element);
 classlist.add(element, SubMenuRenderer.CSS_CLASS);
 this.addArrow_(subMenu, element);

 // Search for a child menu and decorate it.
 var childMenuEls = dom.getElementsByTagNameAndClass(
     TagName.DIV, goog.getCssName('goog-menu'), element);
 if (childMenuEls.length) {
   var childMenu = new Menu(subMenu.getDomHelper());
   var childMenuEl = childMenuEls[0];
   // Hide the menu element before attaching it to the document body; see
   // bug 1089244.
   style.setElementShown(childMenuEl, false);
   subMenu.getDomHelper().getDocument().body.appendChild(childMenuEl);
   childMenu.decorate(childMenuEl);
   subMenu.setMenu(childMenu, true);
 }
 return element;
};


/**
 * Takes a menu item's root element, and sets its content to the given text
 * caption or DOM structure.  Overrides the superclass immplementation by
 * making sure that the submenu arrow structure is preserved.
 * @param {Element} element The item's root element.
 * @param {ControlContent} content Text caption or DOM structure to be
 *     set as the item's content.
 * @override
 */
SubMenuRenderer.prototype.setContent = function(element, content) {
 // Save the submenu arrow element, if present.
 var contentElement = this.getContentElement(element);
 var arrowElement = contentElement && contentElement.lastChild;
 SubMenuRenderer.superClass_.setContent.call(this, element, content);
 // If the arrowElement was there, is no longer there, and really was an arrow,
 // reappend it.
 if (arrowElement && contentElement.lastChild != arrowElement &&
     classlist.contains(
         /** @type {!Element} */ (arrowElement),
         SubMenuRenderer.CSS_CLASS_SUBMENU_)) {
   contentElement.appendChild(arrowElement);
 }
};


/**
 * Overrides {@link MenuItemRenderer#initializeDom} to tweak
 * the DOM structure for the span.goog-submenu-arrow element
 * depending on the text direction (LTR or RTL). When the SubMenu is RTL
 * the arrow will be given the additional class of goog-submenu-arrow-rtl,
 * and the arrow will be moved up to be the first child in the SubMenu's
 * element. Otherwise the arrow will have the class goog-submenu-arrow-ltr,
 * and be kept as the last child of the SubMenu's element.
 * @param {Control} control SubMenu whose DOM is to be
 *     initialized as it enters the document.
 * @override
 */
SubMenuRenderer.prototype.initializeDom = function(control) {
 var subMenu = /** @type {SubMenu} */ (control);
 SubMenuRenderer.superClass_.initializeDom.call(this, subMenu);
 var element = subMenu.getContentElement();
 var arrow = subMenu.getDomHelper().getElementsByTagNameAndClass(
     TagName.SPAN, SubMenuRenderer.CSS_CLASS_SUBMENU_,
     element)[0];
 SubMenuRenderer.setArrowTextContent_(subMenu, arrow);
 if (arrow != element.lastChild) {
   element.appendChild(arrow);
 }
 var subMenuElement = subMenu.getElement();
 asserts.assert(
     subMenuElement, 'The sub menu DOM element cannot be null.');
 aria.setState(
     subMenuElement, State.HASPOPUP, 'true');
};


/**
 * Appends a child node with the class goog.getCssName('goog-submenu-arrow') or
 * 'goog-submenu-arrow-rtl' which can be styled to show an arrow.
 * @param {SubMenu} subMenu SubMenu to render.
 * @param {Element} element Element to decorate.
 * @private
 */
SubMenuRenderer.prototype.addArrow_ = function(subMenu, element) {
 var arrow = subMenu.getDomHelper().createDom(TagName.SPAN);
 arrow.className = SubMenuRenderer.CSS_CLASS_SUBMENU_;
 SubMenuRenderer.setArrowTextContent_(subMenu, arrow);
 this.getContentElement(element).appendChild(arrow);
};


/**
 * The unicode char for a left arrow.
 * @type {string}
 * @private
 */
SubMenuRenderer.LEFT_ARROW_ = '\u25C4';


/**
 * The unicode char for a right arrow.
 * @type {string}
 * @private
 */
SubMenuRenderer.RIGHT_ARROW_ = '\u25BA';


/**
 * Set the text content of an arrow.
 * @param {SubMenu} subMenu The sub menu that owns the arrow.
 * @param {Element} arrow The arrow element.
 * @private
 */
SubMenuRenderer.setArrowTextContent_ = function(subMenu, arrow) {
 // Fix arrow rtl
 var leftArrow = SubMenuRenderer.LEFT_ARROW_;
 var rightArrow = SubMenuRenderer.RIGHT_ARROW_;

 asserts.assert(arrow);

 if (subMenu.isRightToLeft()) {
   classlist.add(arrow, goog.getCssName('goog-submenu-arrow-rtl'));
   // Unicode character - Black left-pointing pointer iff aligned to end.
   dom.setTextContent(
       arrow, subMenu.isAlignedToEnd() ? leftArrow : rightArrow);
 } else {
   classlist.remove(arrow, goog.getCssName('goog-submenu-arrow-rtl'));
   // Unicode character - Black right-pointing pointer iff aligned to end.
   dom.setTextContent(
       arrow, subMenu.isAlignedToEnd() ? rightArrow : leftArrow);
 }
};
