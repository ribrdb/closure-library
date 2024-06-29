/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Renderer for {@link goog.ui.ColorMenuButton}s.
 */

goog.declareModuleId('goog.ui.colormenubuttonrenderer');

import * as asserts from '../asserts/asserts.js';
import * as color from '../color/color.js';
import { TagName } from '../dom/tagname.js';
import * as classlist from '../dom/classlist.js';
import { MenuButtonRenderer } from './menubuttonrenderer.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { Control } = goog.requireType('goog.ui.control');
const { ControlContent } = goog.requireType('goog.ui.controlcontent');



/**
 * Renderer for {@link goog.ui.ColorMenuButton}s.
 * @constructor
 * @extends {MenuButtonRenderer}
 */
export function ColorMenuButtonRenderer() {
 MenuButtonRenderer.call(this);
}
goog.inherits(ColorMenuButtonRenderer, MenuButtonRenderer);
goog.addSingletonGetter(ColorMenuButtonRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
ColorMenuButtonRenderer.CSS_CLASS =
    goog.getCssName('goog-color-menu-button');


/**
 * Overrides the superclass implementation by wrapping the caption text or DOM
 * structure in a color indicator element.  Creates the following DOM structure:
 *
 *    <div class="goog-inline-block goog-menu-button-caption">
 *      <div class="goog-color-menu-button-indicator">
 *        Contents...
 *      </div>
 *    </div>
 *
 * The 'goog-color-menu-button-indicator' style should be defined to have a
 * bottom border of nonzero width and a default color that blends into its
 * background.
 * @param {ControlContent} content Text caption or DOM structure.
 * @param {DomHelper} dom DOM helper, used for document interaction.
 * @return {!Element} Caption element.
 * @override
 */
ColorMenuButtonRenderer.prototype.createCaption = function(
    content, dom) {
 return ColorMenuButtonRenderer.superClass_.createCaption.call(
     this, ColorMenuButtonRenderer.wrapCaption(content, dom), dom);
};


/**
 * Wrap a caption in a div with the color-menu-button-indicator CSS class.
 * @param {ControlContent} content Text caption or DOM structure.
 * @param {DomHelper} dom DOM helper, used for document interaction.
 * @return {!Element} Caption element.
 */
ColorMenuButtonRenderer.wrapCaption = function(content, dom) {
 return dom.createDom(
     TagName.DIV,
     goog.getCssName(ColorMenuButtonRenderer.CSS_CLASS, 'indicator'),
     content);
};


/**
 * Takes a color menu button control's root element and a value object
 * (which is assumed to be a color), and updates the button's DOM to reflect
 * the new color.  Overrides {@link goog.ui.ButtonRenderer#setValue}.
 * @param {Element} element The button control's root element (if rendered).
 * @param {*} value New value; assumed to be a color spec string.
 * @override
 */
ColorMenuButtonRenderer.prototype.setValue = function(element, value) {
 if (element) {
   ColorMenuButtonRenderer.setCaptionValue(
       this.getContentElement(element), value);
 }
};


/**
 * Takes a control's content element and a value object (which is assumed
 * to be a color), and updates its DOM to reflect the new color.
 * @param {Element} caption A content element of a control.
 * @param {*} value New value; assumed to be a color spec string.
 */
ColorMenuButtonRenderer.setCaptionValue = function(caption, value) {
 // Assume that the caption's first child is the indicator.
 if (caption && caption.firstChild) {
   // Normalize the value to a hex color spec or null (otherwise setting
   // borderBottomColor will cause a JS error on IE).
   var hexColor;

   var strValue = /** @type {string} */ (value);
   hexColor = strValue && color.isValidColor(strValue) ?
       color.parse(strValue).hex :
       null;

   /** @suppress {strictMissingProperties} Added to tighten compiler checks */
   caption.firstChild.style.borderBottomColor = hexColor || 'transparent';
 }
};


/**
 * Initializes the button's DOM when it enters the document.  Overrides the
 * superclass implementation by making sure the button's color indicator is
 * initialized.
 * @param {Control} button goog.ui.ColorMenuButton whose DOM is to be
 *     initialized as it enters the document.
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
ColorMenuButtonRenderer.prototype.initializeDom = function(button) {
 var buttonElement = button.getElement();
 asserts.assert(buttonElement);
 this.setValue(buttonElement, button.getValue());
 classlist.add(
     buttonElement, ColorMenuButtonRenderer.CSS_CLASS);
 ColorMenuButtonRenderer.superClass_.initializeDom.call(this, button);
};
