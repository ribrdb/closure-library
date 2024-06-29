/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A base menu bar factory. Can be bound to an existing
 * HTML structure or can generate its own DOM.
 *
 * To decorate, the menu bar should be bound to an element containing children
 * with the classname 'goog-menu-button'.  See menubar.html for example.
 *
 * @see ../demos/menubar.html
 */

import { Container } from './container.js';

import { MenuBarRenderer } from './menubarrenderer.js';
const { DomHelper } = goog.requireType('goog.dom.dom');
const { ContainerRenderer } = goog.requireType('goog.ui.containerrenderer');


/**
 * The menuBar factory creates a new menu bar.
 * @param {ContainerRenderer=} opt_renderer Renderer used to render or
 *     decorate the menu bar; defaults to {@link MenuBarRenderer}.
 * @param {DomHelper=} opt_domHelper DOM helper, used for document
 *     interaction.
 * @return {!Container} The created menu bar.
 */
export function create(opt_renderer, opt_domHelper) {
 return new Container(
     null, opt_renderer ? opt_renderer : MenuBarRenderer.getInstance(),
     opt_domHelper);
}
