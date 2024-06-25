/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Similar to {@link FlatButtonRenderer},
 * but underlines text instead of adds borders.
 *
 * For accessibility reasons, it is best to use this with a Button
 * instead of an A element for links that perform actions in the page.  Links
 * that have an href and open a new page can and should remain as A elements.
 */

import { Button } from './button.js';

import { FlatButtonRenderer } from './flatbuttonrenderer.js';
import * as registry from './registry.js';



/**
 * Link renderer for {@link Button}s.  Link buttons can contain
 * almost arbitrary HTML content, will flow like inline elements, but can be
 * styled like block-level elements.
 * @constructor
 * @extends {FlatButtonRenderer}
 */
export function LinkButtonRenderer() {
 FlatButtonRenderer.call(this);
}
goog.inherits(LinkButtonRenderer, FlatButtonRenderer);
goog.addSingletonGetter(LinkButtonRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
LinkButtonRenderer.CSS_CLASS = goog.getCssName('goog-link-button');


/** @override */
LinkButtonRenderer.prototype.getCssClass = function() {
 return LinkButtonRenderer.CSS_CLASS;
};


// Register a decorator factory function for Link Buttons.
registry.setDecoratorByClassName(
    LinkButtonRenderer.CSS_CLASS, function() {
 // Uses goog.ui.Button, but with LinkButtonRenderer.
 return new Button(null, LinkButtonRenderer.getInstance());
});
