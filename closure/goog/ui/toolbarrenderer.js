/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Renderer for {@link goog.ui.Toolbar}s.
 */

import { Role } from '../a11y/aria/roles.js';

import { TagName } from '../dom/tagname.js';
import { Container } from './container.js';
import { ContainerRenderer } from './containerrenderer.js';
import { Separator } from './separator.js';
import { ToolbarSeparatorRenderer } from './toolbarseparatorrenderer.js';
const {Control} = goog.requireType('goog.ui.control');



/**
 * Default renderer for {@link goog.ui.Toolbar}s, based on {@link
 * ContainerRenderer}.
 * @constructor
 * @extends {ContainerRenderer}
 */
export function ToolbarRenderer() {
 ContainerRenderer.call(this, Role.TOOLBAR);
}
goog.inherits(ToolbarRenderer, ContainerRenderer);
goog.addSingletonGetter(ToolbarRenderer);


/**
 * Default CSS class to be applied to the root element of toolbars rendered
 * by this renderer.
 * @type {string}
 */
ToolbarRenderer.CSS_CLASS = goog.getCssName('goog-toolbar');


/**
 * Inspects the element, and creates an instance of {@link Control} or
 * an appropriate subclass best suited to decorate it.  Overrides the superclass
 * implementation by recognizing HR elements as separators.
 * @param {Element} element Element to decorate.
 * @return {Control?} A new control suitable to decorate the element
 *     (null if none).
 * @override
 */
ToolbarRenderer.prototype.getDecoratorForChild = function(element) {
 return element.tagName == TagName.HR ?
     new Separator(ToolbarSeparatorRenderer.getInstance()) :
     ToolbarRenderer.superClass_.getDecoratorForChild.call(
         this, element);
};


/**
 * Returns the CSS class to be applied to the root element of containers
 * rendered using this renderer.
 * @return {string} Renderer-specific CSS class.
 * @override
 */
ToolbarRenderer.prototype.getCssClass = function() {
 return ToolbarRenderer.CSS_CLASS;
};


/**
 * Returns the default orientation of containers rendered or decorated by this
 * renderer.  This implementation returns `HORIZONTAL`.
 * @return {Container.Orientation} Default orientation for containers
 *     created or decorated by this renderer.
 * @override
 */
ToolbarRenderer.prototype.getDefaultOrientation = function() {
 return Container.Orientation.HORIZONTAL;
};
