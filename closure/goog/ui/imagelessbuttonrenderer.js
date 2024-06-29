/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview An alternative custom button renderer that uses even more CSS
 * voodoo than the default implementation to render custom buttons with fake
 * rounded corners and dimensionality (via a subtle flat shadow on the bottom
 * half of the button) without the use of images.
 *
 * Based on the Custom Buttons 3.1 visual specification, see
 * http://go/custombuttons
 *
 * @see ../demos/imagelessbutton.html
 */

import { TagName } from '../dom/tagname.js';

import * as classlist from '../dom/classlist.js';
import { Button } from './button.js';
import { Component } from './component.js';
import { CustomButtonRenderer } from './custombuttonrenderer.js';
import { INLINE_BLOCK_CLASSNAME } from './cssnames.js';
import * as registry from './registry.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { ControlContent } = goog.requireType('goog.ui.controlcontent');



/**
 * Custom renderer for {@link Button}s. Imageless buttons can contain
 * almost arbitrary HTML content, will flow like inline elements, but can be
 * styled like block-level elements.
 *
 * @deprecated These contain a lot of unnecessary DOM for modern user agents.
 *     Please use a simpler button renderer like css3buttonrenderer.
 * @constructor
 * @extends {CustomButtonRenderer}
 */
export function ImagelessButtonRenderer() {
  CustomButtonRenderer.call(this);
}
goog.inherits(ImagelessButtonRenderer, CustomButtonRenderer);
goog.addSingletonGetter(ImagelessButtonRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
ImagelessButtonRenderer.CSS_CLASS =
    goog.getCssName('goog-imageless-button');


/**
 * Returns the button's contents wrapped in the following DOM structure:
 *
 *    <div class="goog-inline-block goog-imageless-button">
 *      <div class="goog-inline-block goog-imageless-button-outer-box">
 *        <div class="goog-imageless-button-inner-box">
 *          <div class="goog-imageless-button-pos-box">
 *            <div class="goog-imageless-button-top-shadow">&nbsp;</div>
 *            <div class="goog-imageless-button-content">Contents...</div>
 *          </div>
 *        </div>
 *      </div>
 *    </div>
 * @override
 */
ImagelessButtonRenderer.prototype.createDom;


/** @override */
ImagelessButtonRenderer.prototype.getContentElement = function(
    element) {
  return /** @type {Element} */ (
      element && element.firstChild && element.firstChild.firstChild &&
      element.firstChild.firstChild.firstChild.lastChild);
};


/**
 * Takes a text caption or existing DOM structure, and returns the content
 * wrapped in a pseudo-rounded-corner box.  Creates the following DOM structure:
 *
 *    <div class="goog-inline-block goog-imageless-button-outer-box">
 *      <div class="goog-inline-block goog-imageless-button-inner-box">
 *        <div class="goog-imageless-button-pos">
 *          <div class="goog-imageless-button-top-shadow">&nbsp;</div>
 *          <div class="goog-imageless-button-content">Contents...</div>
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
ImagelessButtonRenderer.prototype.createButton = function(
    content, dom) {
  var baseClass = this.getCssClass();
  var inlineBlock = INLINE_BLOCK_CLASSNAME + ' ';
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
ImagelessButtonRenderer.prototype.hasBoxStructure = function(
    button, element) {
  var outer = button.getDomHelper().getFirstElementChild(element);
  var outerClassName = goog.getCssName(this.getCssClass(), 'outer-box');
  if (outer && classlist.contains(outer, outerClassName)) {
    var inner = button.getDomHelper().getFirstElementChild(outer);
    var innerClassName = goog.getCssName(this.getCssClass(), 'inner-box');
    if (inner && classlist.contains(inner, innerClassName)) {
      var pos = button.getDomHelper().getFirstElementChild(inner);
      var posClassName = goog.getCssName(this.getCssClass(), 'pos');
      if (pos && classlist.contains(pos, posClassName)) {
        var shadow = button.getDomHelper().getFirstElementChild(pos);
        var shadowClassName = goog.getCssName(this.getCssClass(), 'top-shadow');
        if (shadow && classlist.contains(shadow, shadowClassName)) {
          var content = button.getDomHelper().getNextElementSibling(shadow);
          var contentClassName = goog.getCssName(this.getCssClass(), 'content');
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


/**
 * Returns the CSS class to be applied to the root element of components
 * rendered using this renderer.
 * @return {string} Renderer-specific CSS class.
 * @override
 */
ImagelessButtonRenderer.prototype.getCssClass = function() {
  return ImagelessButtonRenderer.CSS_CLASS;
};


/* Register a decorator factory function for ImagelessButtonRenderer.*/
registry.setDecoratorByClassName(
    ImagelessButtonRenderer.CSS_CLASS, function() {
  return new Button(
      null, ImagelessButtonRenderer.getInstance());
});


// Register a decorator factory function for toggle buttons using the
/* ImagelessButtonRenderer.*/
registry.setDecoratorByClassName(
    goog.getCssName('goog-imageless-toggle-button'), function() {
  var button = new Button(
      null, ImagelessButtonRenderer.getInstance());
  button.setSupportedState(Component.State.CHECKED, true);
  return button;
});
