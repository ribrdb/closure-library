/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A class for representing menu separators.
 * @see goog.ui.Menu
 */

goog.declareModuleId('goog.ui.menuseparator');

import { MenuSeparatorRenderer } from './menuseparatorrenderer.js';
import { Separator } from './separator.js';
import * as registry from './registry.js';
const { DomHelper } = goog.requireType('goog.dom.dom');



/**
 * Class representing a menu separator.  A menu separator extends {@link
 * Separator} by always setting its renderer to {@link
 * MenuSeparatorRenderer}.
 * @param {DomHelper=} opt_domHelper Optional DOM helper used for
 *     document interactions.
 * @constructor
 * @extends {Separator}
 */
export function MenuSeparator(opt_domHelper) {
 Separator.call(
     this, MenuSeparatorRenderer.getInstance(), opt_domHelper);
}
goog.inherits(MenuSeparator, Separator);


/* Register a decorator factory function for MenuSeparators.*/
registry.setDecoratorByClassName(
    MenuSeparatorRenderer.CSS_CLASS, function() {
 // Separator defaults to using MenuSeparatorRenderer.
 return new Separator();
});
