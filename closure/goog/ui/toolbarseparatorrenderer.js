/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Renderer for toolbar separators.
 */

import * as asserts from '../asserts/asserts.js';

import { TagName } from '../dom/tagname.js';
import * as classlist from '../dom/classlist.js';
import { INLINE_BLOCK_CLASSNAME } from './cssnames.js';
import { MenuSeparatorRenderer } from './menuseparatorrenderer.js';
const {Control} = goog.requireType('goog.ui.control');



/**
 * Renderer for toolbar separators.
 * @constructor
 * @extends {MenuSeparatorRenderer}
 */
export function ToolbarSeparatorRenderer() {
 MenuSeparatorRenderer.call(this);
}
goog.inherits(ToolbarSeparatorRenderer, MenuSeparatorRenderer);
goog.addSingletonGetter(ToolbarSeparatorRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
ToolbarSeparatorRenderer.CSS_CLASS =
    goog.getCssName('goog-toolbar-separator');


/**
 * Returns a styled toolbar separator implemented by the following DOM:
 *
 *    <div class="goog-toolbar-separator goog-inline-block">&nbsp;</div>
 *
 * Overrides {@link MenuSeparatorRenderer#createDom}.
 * @param {Control} separator Separator to render.
 * @return {!Element} Root element for the separator.
 * @override
 */
ToolbarSeparatorRenderer.prototype.createDom = function(separator) {
 // 00A0 is &nbsp;
 return separator.getDomHelper().createDom(
     TagName.DIV, this.getClassNames(separator).join(' ') + ' ' +
         INLINE_BLOCK_CLASSNAME,
     '\u00A0');
};


/**
 * Takes an existing element, and decorates it with the separator.  Overrides
 * {@link MenuSeparatorRenderer#decorate}.
 * @param {Control} separator Separator to decorate the element.
 * @param {Element} element Element to decorate.
 * @return {!Element} Decorated element.
 * @override
 */
ToolbarSeparatorRenderer.prototype.decorate = function(
    separator, element) {
 element = ToolbarSeparatorRenderer.superClass_.decorate.call(
     this, separator, element);
 asserts.assert(element);
 classlist.add(element, INLINE_BLOCK_CLASSNAME);
 return element;
};


/**
 * Returns the CSS class to be applied to the root element of components
 * rendered using this renderer.
 * @return {string} Renderer-specific CSS class.
 * @override
 */
ToolbarSeparatorRenderer.prototype.getCssClass = function() {
 return ToolbarSeparatorRenderer.CSS_CLASS;
};
