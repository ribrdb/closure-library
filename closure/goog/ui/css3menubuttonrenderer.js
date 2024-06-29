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
 * @see ../demos/css3menubutton.html
 */

import * as googDom from '../dom/dom.js';

import { TagName } from '../dom/tagname.js';
import { INLINE_BLOCK_CLASSNAME } from './cssnames.js';
import { MenuButton } from './menubutton.js';
import { MenuButtonRenderer } from './menubuttonrenderer.js';
import * as registry from './registry.js';
const { ControlContent } = goog.requireType('goog.ui.controlcontent');



/**
 * Custom renderer for {@link MenuButton}s. Css3 buttons can contain
 * almost arbitrary HTML content, will flow like inline elements, but can be
 * styled like block-level elements.
 *
 * @constructor
 * @extends {MenuButtonRenderer}
 * @final
 */
export function Css3MenuButtonRenderer() {
  MenuButtonRenderer.call(this);
}
goog.inherits(Css3MenuButtonRenderer, MenuButtonRenderer);
goog.addSingletonGetter(Css3MenuButtonRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
Css3MenuButtonRenderer.CSS_CLASS = goog.getCssName('goog-css3-button');


/** @override */
Css3MenuButtonRenderer.prototype.getContentElement = function(element) {
  if (element) {
    var captionElem = googDom.getElementsByTagNameAndClass(
        '*', goog.getCssName(this.getCssClass(), 'caption'), element)[0];
    return captionElem;
  }
  return null;
};


/**
 * Returns true if this renderer can decorate the element.  Overrides
 * {@link MenuButtonRenderer#canDecorate} by returning true if the
 * element is a DIV, false otherwise.
 * @param {Element} element Element to decorate.
 * @return {boolean} Whether the renderer can decorate the element.
 * @override
 */
Css3MenuButtonRenderer.prototype.canDecorate = function(element) {
  return element.tagName == TagName.DIV;
};


/**
 * Takes a text caption or existing DOM structure, and returns the content
 * wrapped in a pseudo-rounded-corner box.  Creates the following DOM structure:
 *
 *    <div class="goog-inline-block goog-css3-button goog-css3-menu-button">
 *      <div class="goog-css3-button-caption">Contents...</div>
 *      <div class="goog-css3-button-dropdown"></div>
 *    </div>
 *
 * Used by both {@link #createDom} and {@link #decorate}.  To be overridden
 * by subclasses.
 * @param {ControlContent} content Text caption or DOM structure to wrap
 *     in a box.
 * @param {googDom.DomHelper} dom DOM helper, used for document interaction.
 * @return {!Element} Pseudo-rounded-corner box containing the content.
 * @override
 */
Css3MenuButtonRenderer.prototype.createButton = function(content, dom) {
  var baseClass = this.getCssClass();
  var inlineBlock = INLINE_BLOCK_CLASSNAME + ' ';
  return dom.createDom(
      TagName.DIV, inlineBlock,
      dom.createDom(
          TagName.DIV,
          [
            goog.getCssName(baseClass, 'caption'),
            goog.getCssName('goog-inline-block')
          ],
          content),
      dom.createDom(TagName.DIV, [
        goog.getCssName(baseClass, 'dropdown'),
        goog.getCssName('goog-inline-block')
      ]));
};


/**
 * Returns the CSS class to be applied to the root element of components
 * rendered using this renderer.
 * @return {string} Renderer-specific CSS class.
 * @override
 */
Css3MenuButtonRenderer.prototype.getCssClass = function() {
  return Css3MenuButtonRenderer.CSS_CLASS;
};


/* Register a decorator factory function for Css3MenuButtonRenderer.*/
// Since we're using goog-css3-button as the base class in order to get the
// same styling as goog.ui.Css3ButtonRenderer, we need to be explicit about
// giving goog-css3-menu-button here.
registry.setDecoratorByClassName(
    goog.getCssName('goog-css3-menu-button'), function() {
  return new MenuButton(
      null, null, Css3MenuButtonRenderer.getInstance());
});
