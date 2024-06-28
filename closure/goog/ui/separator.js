/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A class for representing a separator, with renderers for both
 * horizontal (menu) and vertical (toolbar) separators.
 */

import * as aria from '../a11y/aria/aria.js';

import * as asserts from '../asserts/asserts.js';
import { Component } from './component.js';
import { Control } from './control.js';
import { MenuSeparatorRenderer } from './menuseparatorrenderer.js';
import * as registry from './registry.js';
const { DomHelper } = goog.requireType('goog.dom.dom');



/**
 * Class representing a separator.  Although it extends {@link Control},
 * the Separator class doesn't allocate any event handlers, nor does it change
 * its appearance on mouseover, etc.
 * @param {MenuSeparatorRenderer=} opt_renderer Renderer to render or
 *    decorate the separator; defaults to {@link MenuSeparatorRenderer}.
 * @param {DomHelper=} opt_domHelper Optional DOM helper, used for
 *    document interaction.
 * @constructor
 * @extends {Control}
 */
export function Separator(opt_renderer, opt_domHelper) {
 Control.call(
     this, null, opt_renderer || MenuSeparatorRenderer.getInstance(),
     opt_domHelper);

 this.setSupportedState(Component.State.DISABLED, false);
 this.setSupportedState(Component.State.HOVER, false);
 this.setSupportedState(Component.State.ACTIVE, false);
 this.setSupportedState(Component.State.FOCUSED, false);

 // Separators are always considered disabled.
 this.setStateInternal(Component.State.DISABLED);
}
goog.inherits(Separator, Control);


/**
 * Configures the component after its DOM has been rendered.  Overrides
 * {@link Control#enterDocument} by making sure no event handler
 * is allocated.
 * @override
 */
Separator.prototype.enterDocument = function() {
 Separator.superClass_.enterDocument.call(this);
 var element = this.getElement();
 asserts.assert(
     element, 'The DOM element for the separator cannot be null.');
 aria.setRole(element, 'separator');
};


// Register a decorator factory function for goog.ui.MenuSeparators.
registry.setDecoratorByClassName(
    MenuSeparatorRenderer.CSS_CLASS, function() {
 // Separator defaults to using MenuSeparatorRenderer.
 return new Separator();
});
