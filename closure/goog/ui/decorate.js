/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Provides a function that decorates an element based on its CSS
 * class name.
 */

import * as registry from './registry.js';

const { Component } = goog.requireType('goog.ui.component');


/**
 * Decorates the element with a suitable {@link Component} instance, if
 * a matching decorator is found.
 * @param {Element} element Element to decorate.
 * @return {Component?} New component instance, decorating the element.
 */
export function decorate(element) {
 var decorator = registry.getDecorator(element);
 if (decorator) {
   decorator.decorate(element);
 }
 return decorator;
}
