/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview File #2 of module A.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */

import { ModuleManager } from '../modulemanager.js';

import * as asserts from '../../testing/asserts.js';

ModuleManager.getInstance().beforeLoadModuleCode('modA');

if (window.modA2Loaded) {
  asserts.fail('modA_2 loaded twice');
}
window.modA2Loaded = true;

ModuleManager.getInstance().setLoaded();
