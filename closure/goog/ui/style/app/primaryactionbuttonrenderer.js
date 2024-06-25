/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Renderer for {@link Button}s in App style. This
 * type of button is typically used for an application's "primary action," eg
 * in Gmail, it's "Compose," in Calendar, it's "Create Event".
 */

import { Button } from '../../button.js';

import * as registry from '../../registry.js';
import { ButtonRenderer } from './buttonrenderer.js';



/**
 * Custom renderer for {@link Button}s. This renderer supports the
 * "primary action" style for buttons.
 *
 * @constructor
 * @extends {ButtonRenderer}
 * @final
 */
export function PrimaryActionButtonRenderer() {
 ButtonRenderer.call(this);
}
goog.inherits(
    PrimaryActionButtonRenderer,
    ButtonRenderer);
goog.addSingletonGetter(PrimaryActionButtonRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
PrimaryActionButtonRenderer.CSS_CLASS =
    'goog-primaryactionbutton';


/**
 * Array of arrays of CSS classes that we want composite classes added and
 * removed for in IE6 and lower as a workaround for lack of multi-class CSS
 * selector support.
 * @type {!Array<Array<string>>}
 */
PrimaryActionButtonRenderer.IE6_CLASS_COMBINATIONS = [
  ['goog-button-base-disabled', 'goog-primaryactionbutton'],
  ['goog-button-base-focused', 'goog-primaryactionbutton'],
  ['goog-button-base-hover', 'goog-primaryactionbutton']
];


/** @override */
PrimaryActionButtonRenderer.prototype.getCssClass =
    function() {
     return PrimaryActionButtonRenderer.CSS_CLASS;
    };


/** @override */
PrimaryActionButtonRenderer.prototype
    .getIe6ClassCombinations = function() {
 return PrimaryActionButtonRenderer.IE6_CLASS_COMBINATIONS;
};


// Register a decorator factory function for
/* PrimaryActionButtonRenderer.*/
registry.setDecoratorByClassName(
    PrimaryActionButtonRenderer.CSS_CLASS, function() {
 return new Button(
     null, PrimaryActionButtonRenderer.getInstance());
});
