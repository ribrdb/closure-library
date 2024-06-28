/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A toolbar-style renderer for {@link ColorMenuButton}.
 */

import * as asserts from '../asserts/asserts.js';

import * as classlist from '../dom/classlist.js';
import { ColorMenuButtonRenderer } from './colormenubuttonrenderer.js';
import { MenuButtonRenderer } from './menubuttonrenderer.js';
import { ToolbarMenuButtonRenderer } from './toolbarmenubuttonrenderer.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { Control } = goog.requireType('goog.ui.control');
const { ControlContent } = goog.requireType('goog.ui.controlcontent');



/**
 * Toolbar-style renderer for {@link ColorMenuButton}s.
 * @constructor
 * @extends {ToolbarMenuButtonRenderer}
 * @final
 */
export function ToolbarColorMenuButtonRenderer() {
 ToolbarMenuButtonRenderer.call(this);
}
goog.inherits(
    ToolbarColorMenuButtonRenderer, ToolbarMenuButtonRenderer);
goog.addSingletonGetter(ToolbarColorMenuButtonRenderer);


/**
 * Overrides the superclass implementation by wrapping the caption text or DOM
 * structure in a color indicator element.  Creates the following DOM structure:
 *
 *    <div class="goog-inline-block goog-toolbar-menu-button-caption">
 *      <div class="goog-color-menu-button-indicator">
 *        Contents...
 *      </div>
 *    </div>
 *
 * @param {ControlContent} content Text caption or DOM structure.
 * @param {DomHelper} dom DOM helper, used for document interaction.
 * @return {!Element} Caption element.
 * @see ToolbarColorMenuButtonRenderer#createColorIndicator
 * @override
 */
ToolbarColorMenuButtonRenderer.prototype.createCaption = function(
    content, dom) {
 return MenuButtonRenderer.wrapCaption(
     ColorMenuButtonRenderer.wrapCaption(content, dom),
     this.getCssClass(), dom);
};


/**
 * Takes a color menu button control's root element and a value object
 * (which is assumed to be a color), and updates the button's DOM to reflect
 * the new color.  Overrides {@link ButtonRenderer#setValue}.
 * @param {Element} element The button control's root element (if rendered).
 * @param {*} value New value; assumed to be a color spec string.
 * @override
 */
ToolbarColorMenuButtonRenderer.prototype.setValue = function(
    element, value) {
 if (element) {
   ColorMenuButtonRenderer.setCaptionValue(
       this.getContentElement(element), value);
 }
};


/**
 * Initializes the button's DOM when it enters the document.  Overrides the
 * superclass implementation by making sure the button's color indicator is
 * initialized.
 * @param {Control} button ColorMenuButton whose DOM is to be
 *     initialized as it enters the document.
 * @override
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */
ToolbarColorMenuButtonRenderer.prototype.initializeDom = function(
    button) {
 this.setValue(button.getElement(), button.getValue());
 classlist.add(
     asserts.assert(button.getElement()),
     goog.getCssName('goog-toolbar-color-menu-button'));
 ToolbarColorMenuButtonRenderer.superClass_.initializeDom.call(
     this, button);
};
