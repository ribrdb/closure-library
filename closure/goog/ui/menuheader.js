/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A class for representing menu headers.
 * @see goog.ui.Menu
 */

goog.declareModuleId('goog.ui.menuheader');

import { Component } from './component.js';
import { Control } from './control.js';
import { MenuHeaderRenderer } from './menuheaderrenderer.js';
import * as registry from './registry.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { ControlContent } = goog.requireType('goog.ui.controlcontent');



/**
 * Class representing a menu header.
 * @param {ControlContent} content Text caption or DOM structure to
 *     display as the content of the item (use to add icons or styling to
 *     menus).
 * @param {DomHelper=} opt_domHelper Optional DOM helper used for
 *     document interactions.
 * @param {MenuHeaderRenderer=} opt_renderer Optional renderer.
 * @constructor
 * @extends {Control}
 */
export function MenuHeader(content, opt_domHelper, opt_renderer) {
 Control.call(
     this, content, opt_renderer || MenuHeaderRenderer.getInstance(),
     opt_domHelper);

 this.setSupportedState(Component.State.DISABLED, false);
 this.setSupportedState(Component.State.HOVER, false);
 this.setSupportedState(Component.State.ACTIVE, false);
 this.setSupportedState(Component.State.FOCUSED, false);

 // Headers are always considered disabled.
 this.setStateInternal(Component.State.DISABLED);
}
goog.inherits(MenuHeader, Control);


/* Register a decorator factory function for MenuHeaders.*/
registry.setDecoratorByClassName(
    MenuHeaderRenderer.CSS_CLASS, function() {
 // MenuHeader defaults to using MenuHeaderRenderer.
 return new MenuHeader(null);
});
