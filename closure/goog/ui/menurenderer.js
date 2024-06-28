/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Renderer for {@link Menu}s.
 */

goog.declareModuleId('goog.ui.menurenderer');

import * as aria from '../a11y/aria/aria.js';
import { Role } from '../a11y/aria/roles.js';
import { State } from '../a11y/aria/attributes.js';
import * as asserts from '../asserts/asserts.js';
import * as dom from '../dom/dom.js';
import { TagName } from '../dom/tagname.js';
import { ContainerRenderer } from './containerrenderer.js';
import { Separator } from './separator.js';
const {Control} = goog.requireType('goog.ui.control');
const {Menu} = goog.requireType('goog.ui.menu');



/**
 * Default renderer for {@link Menu}s, based on {@link
 * ContainerRenderer}.
 * @param {string=} opt_ariaRole Optional ARIA role used for the element.
 * @constructor
 * @extends {ContainerRenderer}
 */
export function MenuRenderer(opt_ariaRole) {
 ContainerRenderer.call(
     this, opt_ariaRole || Role.MENU);
}
goog.inherits(MenuRenderer, ContainerRenderer);
goog.addSingletonGetter(MenuRenderer);


/**
 * Default CSS class to be applied to the root element of toolbars rendered
 * by this renderer.
 * @type {string}
 */
MenuRenderer.CSS_CLASS = goog.getCssName('goog-menu');


/**
 * Returns whether the element is a UL or acceptable to our superclass.
 * @param {Element} element Element to decorate.
 * @return {boolean} Whether the renderer can decorate the element.
 * @override
 */
MenuRenderer.prototype.canDecorate = function(element) {
 return element.tagName == TagName.UL ||
     MenuRenderer.superClass_.canDecorate.call(this, element);
};


/**
 * Inspects the element, and creates an instance of {@link Control} or
 * an appropriate subclass best suited to decorate it.  Overrides the superclass
 * implementation by recognizing HR elements as separators.
 * @param {Element} element Element to decorate.
 * @return {Control?} A new control suitable to decorate the element
 *     (null if none).
 * @override
 */
MenuRenderer.prototype.getDecoratorForChild = function(element) {
 return element.tagName == TagName.HR ?
     new Separator() :
     MenuRenderer.superClass_.getDecoratorForChild.call(this, element);
};


/**
 * Returns whether the given element is contained in the menu's DOM.
 * @param {Menu} menu The menu to test.
 * @param {Element} element The element to test.
 * @return {boolean} Whether the given element is contained in the menu.
 */
MenuRenderer.prototype.containsElement = function(menu, element) {
 return dom.contains(menu.getElement(), element);
};


/**
 * Returns the CSS class to be applied to the root element of containers
 * rendered using this renderer.
 * @return {string} Renderer-specific CSS class.
 * @override
 */
MenuRenderer.prototype.getCssClass = function() {
 return MenuRenderer.CSS_CLASS;
};


/** @override */
MenuRenderer.prototype.initializeDom = function(container) {
 MenuRenderer.superClass_.initializeDom.call(this, container);

 var element = container.getElement();
 asserts.assert(element, 'The menu DOM element cannot be null.');
 aria.setState(element, State.HASPOPUP, 'true');
};
