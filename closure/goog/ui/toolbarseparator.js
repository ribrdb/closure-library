/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A toolbar separator control.
 */

import { Separator } from './separator.js';

import { ToolbarSeparatorRenderer } from './toolbarseparatorrenderer.js';
import * as registry from './registry.js';
const { DomHelper } = goog.requireType('goog.dom.dom');



/**
 * A separator control for a toolbar.
 *
 * @param {ToolbarSeparatorRenderer=} opt_renderer Renderer to render or
 *    decorate the separator; defaults to
 *     {@link ToolbarSeparatorRenderer}.
 * @param {DomHelper=} opt_domHelper Optional DOM helper, used for
 *    document interaction.
 * @constructor
 * @extends {Separator}
 * @final
 */
export function ToolbarSeparator(opt_renderer, opt_domHelper) {
 Separator.call(
     this, opt_renderer || ToolbarSeparatorRenderer.getInstance(),
     opt_domHelper);
}
goog.inherits(ToolbarSeparator, Separator);


// Registers a decorator factory function for toolbar separators.
registry.setDecoratorByClassName(
    ToolbarSeparatorRenderer.CSS_CLASS, function() {
 return new ToolbarSeparator();
});
