/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Renderer for {@link Button}s in App style.
 *
 * Based on ImagelessButtonRender. Uses even more CSS voodoo than the default
 * implementation to render custom buttons with fake rounded corners and
 * dimensionality (via a subtle flat shadow on the bottom half of the button)
 * without the use of images.
 *
 * Based on the Custom Buttons 3.1 visual specification, see
 * http://go/custombuttons
 */

import { TagName } from '../../../dom/tagname.js';

import * as classlist from '../../../dom/classlist.js';
import { Button } from '../../button.js';
import { CustomButtonRenderer } from '../../custombuttonrenderer.js';
import { INLINE_BLOCK_CLASSNAME } from '../../cssnames.js';
import * as registry from '../../registry.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { ControlContent } = goog.requireType('goog.ui.controlcontent');



/**
 * Custom renderer for {@link Button}s. Imageless buttons can contain
 * almost arbitrary HTML content, will flow like inline elements, but can be
 * styled like block-level elements.
 *
 * @constructor
 * @extends {CustomButtonRenderer}
 */
export function ButtonRenderer() {
  CustomButtonRenderer.call(this);
}
goog.inherits(ButtonRenderer, CustomButtonRenderer);
goog.addSingletonGetter(ButtonRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
ButtonRenderer.CSS_CLASS = goog.getCssName('goog-button');


/**
 * Array of arrays of CSS classes that we want composite classes added and
 * removed for in IE6 and lower as a workaround for lack of multi-class CSS
 * selector support.
 * @type {!Array<Array<string>>}
 */
ButtonRenderer.IE6_CLASS_COMBINATIONS = [];


/**
 * Returns the button's contents wrapped in the following DOM structure:
 *
 *    <div class="goog-inline-block goog-button-base goog-button">
 *      <div class="goog-inline-block goog-button-base-outer-box">
 *        <div class="goog-button-base-inner-box">
 *          <div class="goog-button-base-pos">
 *            <div class="goog-button-base-top-shadow">&nbsp;</div>
 *            <div class="goog-button-base-content">Contents...</div>
 *          </div>
 *        </div>
 *      </div>
 *    </div>
 * @override
 */
ButtonRenderer.prototype.createDom;


/** @override */
ButtonRenderer.prototype.getContentElement = function(
    element) {
  return element && /** @type {Element} */
      (element.firstChild.firstChild.firstChild.lastChild);
};


/**
 * Takes a text caption or existing DOM structure, and returns the content
 * wrapped in a pseudo-rounded-corner box.  Creates the following DOM structure:
 *
 *    <div class="goog-inline-block goog-button-base-outer-box">
 *      <div class="goog-inline-block goog-button-base-inner-box">
 *        <div class="goog-button-base-pos">
 *          <div class="goog-button-base-top-shadow">&nbsp;</div>
 *          <div class="goog-button-base-content">Contents...</div>
 *        </div>
 *      </div>
 *    </div>
 *
 * Used by both {@link #createDom} and {@link #decorate}.  To be overridden
 * by subclasses.
 * @param {ControlContent} content Text caption or DOM structure to wrap
 *     in a box.
 * @param {DomHelper} dom DOM helper, used for document interaction.
 * @return {!Element} Pseudo-rounded-corner box containing the content.
 * @override
 */
ButtonRenderer.prototype.createButton = function(
    content, dom) {
  const baseClass = this.getStructuralCssClass();
  const inlineBlock = INLINE_BLOCK_CLASSNAME + ' ';
  return dom.createDom(
      TagName.DIV,
      inlineBlock + goog.getCssName(baseClass, 'outer-box'),
      dom.createDom(
          TagName.DIV,
          inlineBlock + goog.getCssName(baseClass, 'inner-box'),
          dom.createDom(
              TagName.DIV, goog.getCssName(baseClass, 'pos'),
              dom.createDom(
                  TagName.DIV,
                  goog.getCssName(baseClass, 'top-shadow'), '\u00A0'),
              dom.createDom(
                  TagName.DIV, goog.getCssName(baseClass, 'content'),
                  content))));
};


/**
 * Check if the button's element has a box structure.
 * @param {Button} button Button instance whose structure is being
 *     checked.
 * @param {Element} element Element of the button.
 * @return {boolean} Whether the element has a box structure.
 * @protected
 * @override
 */
ButtonRenderer.prototype.hasBoxStructure = function(
    button, element) {
  const baseClass = this.getStructuralCssClass();
  const outer = button.getDomHelper().getFirstElementChild(element);
  const outerClassName = goog.getCssName(baseClass, 'outer-box');
  if (outer && classlist.contains(outer, outerClassName)) {
    const inner = button.getDomHelper().getFirstElementChild(outer);
    const innerClassName = goog.getCssName(baseClass, 'inner-box');
    if (inner && classlist.contains(inner, innerClassName)) {
      const pos = button.getDomHelper().getFirstElementChild(inner);
      const posClassName = goog.getCssName(baseClass, 'pos');
      if (pos && classlist.contains(pos, posClassName)) {
        const shadow = button.getDomHelper().getFirstElementChild(pos);
        const shadowClassName = goog.getCssName(baseClass, 'top-shadow');
        if (shadow && classlist.contains(shadow, shadowClassName)) {
          const content = button.getDomHelper().getNextElementSibling(shadow);
          const contentClassName = goog.getCssName(baseClass, 'content');
          if (content &&
              classlist.contains(content, contentClassName)) {
            // We have a proper box structure.
            return true;
          }
        }
      }
    }
  }
  return false;
};


/** @override */
ButtonRenderer.prototype.getCssClass = function() {
  return ButtonRenderer.CSS_CLASS;
};


/** @override */
ButtonRenderer.prototype.getStructuralCssClass = function() {
  // TODO(user): extract to a constant.
  return goog.getCssName('goog-button-base');
};


/** @override */
ButtonRenderer.prototype.getIe6ClassCombinations =
    function() {
      return ButtonRenderer.IE6_CLASS_COMBINATIONS;
    };



/* Register a decorator factory function for ButtonRenderer.*/
registry.setDecoratorByClassName(
    ButtonRenderer.CSS_CLASS, function() {
  return new Button(
      null, ButtonRenderer.getInstance());
});
