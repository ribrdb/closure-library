/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Aliases `PluginImpl`.
 *
 * This is done to create a target for `PluginImpl` that also pulls
 * in `Field` without creating a cycle. Doing so allows downstream
 * targets to depend only on `Plugin` without js_library complaining
 * about unfullfilled forward declarations.
 */

import { Field } from './field.js';

import { PluginImpl } from './plugin_impl.js';

/**
 * @constructor
 * @extends {PluginImpl}
 */
export var Plugin = PluginImpl;
