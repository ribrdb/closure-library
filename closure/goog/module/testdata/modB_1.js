/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview File #1 of module B.
 * @suppress {strictMissingProperties} Added to tighten compiler checks
 */

import { ModuleManager } from '../modulemanager.js';

import * as asserts from '../../testing/asserts.js';

ModuleManager.getInstance().beforeLoadModuleCode('modB');

function throwErrorInModuleB() {
  throw new Error();
}

if (window.modB1Loaded) {
  asserts.fail('modB_1 loaded twice');
}
window.modB1Loaded = true;

ModuleManager.getInstance().setLoaded();
