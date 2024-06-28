/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Renderer for {@link MenuSeparator}s.
 */

import * as dom from '../dom/dom.js';

import { TagName } from '../dom/tagname.js';
import * as classlist from '../dom/classlist.js';
import { ControlRenderer } from './controlrenderer.js';
const {Control} = goog.requireType('goog.ui.control');
const {ControlContent} = goog.requireType('goog.ui.controlcontent');



/**
 * Renderer for menu separators.
 * @constructor
 * @extends {ControlRenderer}
 */
export function MenuSeparatorRenderer() {
 ControlRenderer.call(this);
}
goog.inherits(MenuSeparatorRenderer, ControlRenderer);
goog.addSingletonGetter(MenuSeparatorRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
MenuSeparatorRenderer.CSS_CLASS = goog.getCssName('goog-menuseparator');


/**
 * Returns an empty, styled menu separator DIV.  Overrides {@link
 * ControlRenderer#createDom}.
 * @param {Control} separator Separator to render.
 * @return {!Element} Root element for the separator.
 * @override
 */
MenuSeparatorRenderer.prototype.createDom = function(separator) {
 return separator.getDomHelper().createDom(
     TagName.DIV, this.getCssClass());
};


/**
 * Takes an existing element, and decorates it with the separator.  Overrides
 * {@link ControlRenderer#decorate}.
 * @param {Control} separator MenuSeparator to decorate the
 *     element.
 * @param {Element} element Element to decorate.
 * @return {!Element} Decorated element.
 * @override
 */
MenuSeparatorRenderer.prototype.decorate = function(
    separator, element) {
 // Normally handled in the superclass. But we don't call the superclass.
 if (element.id) {
   separator.setId(element.id);
 }

 if (element.tagName == TagName.HR) {
   // Replace HR with separator.
   var hr = element;
   element = this.createDom(separator);
   dom.insertSiblingBefore(element, hr);
   dom.removeNode(hr);
 } else {
   classlist.add(element, this.getCssClass());
 }
 return element;
};


/**
 * Overrides {@link ControlRenderer#setContent} to do nothing, since
 * separators are empty.
 * @param {Element} separator The separator's root element.
 * @param {ControlContent} content Text caption or DOM structure to be
 *    set as the separators's content (ignored).
 * @override
 */
MenuSeparatorRenderer.prototype.setContent = function(
    separator, content) {
  // Do nothing.  Separators are empty.
};


/**
 * Returns the CSS class to be applied to the root element of components
 * rendered using this renderer.
 * @return {string} Renderer-specific CSS class.
 * @override
 */
MenuSeparatorRenderer.prototype.getCssClass = function() {
 return MenuSeparatorRenderer.CSS_CLASS;
};
