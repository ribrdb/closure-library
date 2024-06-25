/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Definition of MenuBarRenderer decorator, a static call into
 * the registry.
 *
 * @see ../demos/menubar.html
 */

import { MenuBarRenderer } from './menubarrenderer.js';

import * as menuBar from './menubar.js';
import * as registry from './registry.js';


/**
 * Register a decorator factory function. 'goog-menubar' defaults to
 * MenuBarRenderer.
 */
registry.setDecoratorByClassName(
    MenuBarRenderer.CSS_CLASS, menuBar.create);
